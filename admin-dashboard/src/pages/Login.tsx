import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LuEye, LuEyeOff } from 'react-icons/lu'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const { login }               = useAuth()
  const navigate                = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(username, password)

      if (result === 'ok') {
        navigate('/')
      } else if (result === 'setup_required') {
        // Default creds matched → force credential setup
        navigate('/setup')
      } else {
        setError('Incorrect username or password.')
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

        <form onSubmit={handleSubmit} style={s.form} noValidate>
          {error && <div style={s.errorBox}>{error}</div>}

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
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in…' : 'Login'}
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
    textAlign: 'center',
    marginBottom: '36px',
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
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
    textTransform: 'uppercase',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2D2D2D',
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '13px 16px',
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
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
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
    marginTop: '8px',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  errorBox: {
    background: '#FEE2E2',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
}
