import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LuShieldCheck, LuEye, LuEyeOff, LuCircleCheck, LuCircleX } from 'react-icons/lu'

interface Rule {
  label: string
  test: (v: string) => boolean
}

const PASSWORD_RULES: Rule[] = [
  { label: 'At least 8 characters',          test: (v) => v.length >= 8 },
  { label: 'At least one uppercase letter',  test: (v) => /[A-Z]/.test(v) },
  { label: 'At least one number',            test: (v) => /[0-9]/.test(v) },
  { label: 'At least one special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

export default function SetupCredentials() {
  const { completeSetup } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername]       = useState('')
  const [password, setPassword]       = useState('')
  const [confirm,  setConfirm]        = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [showConf, setShowConf]       = useState(false)
  const [error,    setError]          = useState('')
  const [saving,   setSaving]         = useState(false)

  const rulesPass = PASSWORD_RULES.every((r) => r.test(password))
  const passwordsMatch = password === confirm && confirm.length > 0

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.')
      return
    }
    if (!rulesPass) {
      setError('Password does not meet the requirements below.')
      return
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.')
      return
    }

    setSaving(true)
    // Small artificial delay so user sees feedback
    await new Promise((r) => setTimeout(r, 600))
    completeSetup(username.trim(), password)
    navigate('/')
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.iconRow}>
          <div style={s.iconBubble}>
            <LuShieldCheck size={32} color="#B68A52" />
          </div>
        </div>

        <h1 style={s.title}>Set Up Your Admin Credentials</h1>
        <p style={s.subtitle}>
          You logged in with the <strong>default credentials</strong>.
          <br />
          Create your own username and password now.
          <br />
          <span style={s.warning}>
            The default login will be permanently disabled after this step.
          </span>
        </p>

        <form onSubmit={handleSubmit} style={s.form} noValidate>
          {/* Error */}
          {error && (
            <div style={s.errorBox}>
              <LuCircleX size={16} />
              {error}
            </div>
          )}

          {/* New username */}
          <div style={s.field}>
            <label style={s.label}>New Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. yvonne_admin"
              style={s.input}
              required
              autoFocus
            />
          </div>

          {/* New password */}
          <div style={s.field}>
            <label style={s.label}>New Password</label>
            <div style={s.inputWrapper}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                style={{ ...s.input, paddingRight: '48px' }}
                required
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>

            {/* Strength checklist */}
            {password.length > 0 && (
              <ul style={s.rules}>
                {PASSWORD_RULES.map((rule) => {
                  const ok = rule.test(password)
                  return (
                    <li key={rule.label} style={{ ...s.rule, color: ok ? '#16A34A' : '#DC2626' }}>
                      {ok
                        ? <LuCircleCheck size={14} />
                        : <LuCircleX size={14} />
                      }
                      {rule.label}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Confirm password */}
          <div style={s.field}>
            <label style={s.label}>Confirm Password</label>
            <div style={s.inputWrapper}>
              <input
                type={showConf ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                style={{
                  ...s.input,
                  paddingRight: '48px',
                  borderColor:
                    confirm.length > 0
                      ? passwordsMatch ? '#16A34A' : '#DC2626'
                      : '#ECECEC',
                }}
                required
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowConf(!showConf)}
                tabIndex={-1}
                aria-label={showConf ? 'Hide password' : 'Show password'}
              >
                {showConf ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {confirm.length > 0 && (
              <p style={{ fontSize: '13px', color: passwordsMatch ? '#16A34A' : '#DC2626', marginTop: '6px' }}>
                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving || !rulesPass || !passwordsMatch || username.trim().length < 3}
            style={{
              ...s.btn,
              opacity: (saving || !rulesPass || !passwordsMatch || username.trim().length < 3) ? 0.5 : 1,
            }}
          >
            {saving ? 'Saving...' : '✓ Save & Continue to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Styles ────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
  },
  iconRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  iconBubble: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: '#FEF3C7',
    border: '2px solid #B68A52',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
    lineHeight: '1.7',
    marginBottom: '28px',
  },
  warning: {
    display: 'inline-block',
    marginTop: '8px',
    color: '#B45309',
    fontWeight: '600',
    fontSize: '13px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2D2D2D',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #ECECEC',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
  },
  rules: {
    marginTop: '10px',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '12px 16px',
    background: '#F9FAFB',
    borderRadius: '8px',
  },
  rule: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '500',
  },
  btn: {
    padding: '15px',
    background: '#B68A52',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #8A6234',
    transition: 'all 0.2s',
    marginTop: '4px',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '8px',
    background: '#FEE2E2',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500' as const,
  },
}
