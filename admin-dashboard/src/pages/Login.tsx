import { useState, FormEvent, useEffect } from 'react'
import { useNavigate }                    from 'react-router-dom'
import { useAuth }                        from '../context/AuthContext'
import { LuEye, LuEyeOff, LuTriangleAlert, LuShieldOff } from 'react-icons/lu'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const { login, isLocked, failedAttempts } = useAuth()
  const navigate = useNavigate()

  // Redirect to locked page if already locked on mount
  useEffect(() => {
    if (isLocked) navigate('/locked', { replace: true })
  }, [isLocked, navigate])

  const attemptsLeft = Math.max(0, 2 - failedAttempts)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(username, password)

      switch (result) {
        case 'ok':
          navigate('/')
          break

        case 'setup_required':
          navigate('/setup')
          break

        case 'locked':
          navigate('/locked', { replace: true })
          break

        case 'invalid':
          setPassword('')        // clear password field on failure
          if (2 - failedAttempts <= 0) {
            navigate('/locked', { replace: true })
          } else {
            setError('Incorrect username or password.')
          }
          break
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Branding */}
        <div style={s.header}>
          <div style={s.logoWrap}>
            <h1 style={s.logoText}>Yvonne</h1>
            <span style={s.logoSub}>HOSPITALITY &amp; MANAGEMENT</span>
          </div>
          <p style={s.pageLabel}>Admin Dashboard</p>
        </div>

        {/* ── Warning bar: shown after 1 failed attempt ── */}
        {failedAttempts === 1 && (
          <div style={s.warningBox}>
            <LuTriangleAlert size={18} />
            <div>
              <strong>Warning — 1 attempt remaining!</strong>
              <br />
              <span style={{ fontSize: '13px' }}>
                One more failure will lock this admin panel and
                send an alert to the registered owner.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={s.form} noValidate>

          {/* Error message */}
          {error && (
            <div style={s.errorBox}>
              <LuShieldOff size={16} />
              {error}
              {attemptsLeft > 0 && (
                <span style={s.attemptsLeft}>
                  &nbsp;({attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} left)
                </span>
              )}
            </div>
          )}

          {/* Username */}
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={s.input}
              autoComplete="username"
              required
              autoFocus
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ ...s.input, paddingRight: '48px' }}
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
                aria-label={showPass ? 'Hide' : 'Show'}
              >
                {showPass ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
          </div>

          {/* Attempt indicator dots */}
          <div style={s.dotsRow}>
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...s.dot,
                  background: i <= failedAttempts ? '#DC2626' : '#D1D5DB',
                }}
              />
            ))}
            <span style={s.dotsLabel}>
              {failedAttempts === 0
                ? 'No failed attempts'
                : `${failedAttempts} failed attempt${failedAttempts > 1 ? 's' : ''}`}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Verifying…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '24px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '28px',
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: '10px',
  },
  logoText: {
    fontFamily: "'Georgia', serif",
    fontStyle: 'italic',
    fontSize: '32px',
    fontWeight: '700',
    color: '#B68A52',
    lineHeight: '1',
  },
  logoSub: {
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.2em',
    color: '#888',
    textTransform: 'uppercase' as const,
    marginTop: '4px',
  },
  pageLabel: {
    fontSize: '14px',
    color: '#888',
    fontWeight: '500',
    borderTop: '1px solid #ECECEC',
    paddingTop: '10px',
    marginTop: '10px',
  },
  warningBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: '#FFFBEB',
    border: '1.5px solid #F59E0B',
    borderRadius: '10px',
    padding: '14px 16px',
    marginBottom: '20px',
    color: '#92400E',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '18px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2D2D2D',
  },
  inputWrap: {
    position: 'relative' as const,
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid #ECECEC',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  },
  eyeBtn: {
    position: 'absolute' as const,
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    minWidth: 0,
    minHeight: 0,
  },
  dotsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    transition: 'background 0.3s',
  },
  dotsLabel: {
    fontSize: '12px',
    color: '#888',
  },
  btn: {
    padding: '15px',
    background: '#B68A52',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #8A6234',
    transition: 'all 0.15s',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#FEE2E2',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  attemptsLeft: {
    fontWeight: '700',
  },
}
