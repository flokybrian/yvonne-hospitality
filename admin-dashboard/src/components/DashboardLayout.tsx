import { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LuHouse, LuImage, LuVideo, LuBriefcase, LuStar, LuLogOut } from 'react-icons/lu'

interface Props {
  children: ReactNode
  title: string
}

export default function DashboardLayout({ children, title }: Props) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { path: '/', icon: <LuHouse />, label: 'Dashboard' },
    { path: '/gallery', icon: <LuImage />, label: 'Gallery' },
    { path: '/videos', icon: <LuVideo />, label: 'Videos' },
    { path: '/portfolio', icon: <LuBriefcase />, label: 'Portfolio' },
    { path: '/testimonials', icon: <LuStar />, label: 'Testimonials' },
  ]

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <h2 style={styles.brandTitle}>Yvonne</h2>
          <p style={styles.brandSub}>Admin Panel</p>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {}),
              })}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={styles.userSection}>
          <p style={styles.userName}>{user?.username}</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LuLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
        </header>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  )
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '260px',
    background: '#1F2937',
    color: '#D1D5DB',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '24px',
    position: 'fixed' as const,
    height: '100vh',
    overflowY: 'auto' as const,
  },
  brand: {
    marginBottom: '40px',
  },
  brandTitle: {
    color: '#B68A52',
    fontSize: '24px',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  brandSub: {
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginTop: '4px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: '#D1D5DB',
    fontSize: '15px',
    transition: '0.2s',
    textDecoration: 'none',
  },
  navLinkActive: {
    background: '#374151',
    color: '#B68A52',
  },
  userSection: {
    borderTop: '1px solid #374151',
    paddingTop: '20px',
    marginTop: '20px',
  },
  userName: {
    fontSize: '14px',
    marginBottom: '12px',
    fontWeight: '600',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    background: 'transparent',
    border: '1px solid #374151',
    borderRadius: '6px',
    color: '#D1D5DB',
    width: '100%',
    fontSize: '14px',
    transition: '0.2s',
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    background: '#F9FAFB',
  },
  header: {
    background: 'white',
    padding: '24px 32px',
    borderBottom: '1px solid #E5E7EB',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111',
  },
  content: {
    padding: '32px',
  },
}
