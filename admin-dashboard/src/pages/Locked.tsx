/**
 * Locked.tsx
 * Full-screen lockout page shown after 2 failed login attempts.
 * Cannot be navigated away from — user must contact admin.
 */

import { LuShieldOff, LuMail, LuPhone } from 'react-icons/lu'

export default function Locked() {
  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Icon */}
        <div style={s.iconRing}>
          <LuShieldOff size={40} color="#DC2626" />
        </div>

        {/* Heading */}
        <h1 style={s.title}>Access Blocked</h1>
        <p style={s.subtitle}>
          This admin panel has been locked due to{' '}
          <strong>2 consecutive failed login attempts</strong>.
        </p>

        {/* Alert sent info */}
        <div style={s.alertBox}>
          <div style={s.alertRow}>
            <LuMail size={18} color="#DC2626" />
            <span>Alert sent to <strong>bernadkarina75@gmail.com</strong></span>
          </div>
          <div style={s.alertRow}>
            <LuPhone size={18} color="#DC2626" />
            <span>SMS sent to <strong>+254 783 479 432</strong></span>
          </div>
        </div>

        {/* Unlock instructions */}
        <div style={s.instructions}>
          <p style={s.instructionsTitle}>How to unlock:</p>
          <ol style={s.steps}>
            <li>Check your email or SMS for the security alert.</li>
            <li>If it was you, open browser DevTools (F12).</li>
            <li>
              Go to <strong>Application → Local Storage</strong> and remove:
              <ul style={s.codeList}>
                <li><code>admin_locked</code></li>
                <li><code>admin_failed_attempts</code></li>
              </ul>
            </li>
            <li>Refresh the page and log in with your credentials.</li>
          </ol>
        </div>

        {/* Timestamp */}
        <p style={s.ts}>
          Locked at: {new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })} (EAT)
        </p>

      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0F172A',
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
    maxWidth: '500px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
    textAlign: 'center' as const,
  },
  iconRing: {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    background: '#FEE2E2',
    border: '3px solid #DC2626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    animation: 'pulse 2s infinite',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#111',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.7',
    marginBottom: '28px',
  },
  alertBox: {
    background: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '10px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    marginBottom: '28px',
  },
  alertRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#991B1B',
  },
  instructions: {
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '20px 24px',
    textAlign: 'left' as const,
    marginBottom: '20px',
  },
  instructionsTitle: {
    fontWeight: '700',
    color: '#111',
    marginBottom: '12px',
    fontSize: '14px',
  },
  steps: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    fontSize: '13px',
    color: '#444',
    lineHeight: '1.6',
  },
  codeList: {
    marginTop: '6px',
    marginLeft: '16px',
    listStyle: 'disc',
  },
  ts: {
    fontSize: '12px',
    color: '#AAA',
    marginTop: '8px',
  },
}
