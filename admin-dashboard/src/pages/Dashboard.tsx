import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { LuImage, LuVideo, LuBriefcase, LuStar } from 'react-icons/lu'

export default function Dashboard() {
  const cards = [
    { title: 'Gallery Items', count: '12', icon: <LuImage size={32} />, link: '/gallery', color: '#3B82F6' },
    { title: 'Videos', count: '3', icon: <LuVideo size={32} />, link: '/videos', color: '#8B5CF6' },
    { title: 'Portfolio', count: '8', icon: <LuBriefcase size={32} />, link: '/portfolio', color: '#10B981' },
    { title: 'Testimonials', count: '1', icon: <LuStar size={32} />, link: '/testimonials', color: '#F59E0B' },
  ]

  return (
    <DashboardLayout title="Dashboard">
      <div style={styles.welcome}>
        <h2 style={styles.welcomeTitle}>Welcome back, Yvonne! 👋</h2>
        <p style={styles.welcomeText}>Manage your hospitality website content from here.</p>
      </div>

      <div style={styles.grid}>
        {cards.map((card) => (
          <Link key={card.title} to={card.link} style={{ ...styles.card, borderTopColor: card.color }}>
            <div style={{ ...styles.cardIcon, background: card.color }}>{card.icon}</div>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardCount}>{card.count}</p>
          </Link>
        ))}
      </div>

      <div style={styles.info}>
        <h3 style={styles.infoTitle}>Quick Tips</h3>
        <ul style={styles.infoList}>
          <li>✓ Click on any card above to manage that content type</li>
          <li>✓ You can add, edit, or delete items</li>
          <li>✓ Changes appear on the public website instantly</li>
          <li>✓ Images are stored in Cloudinary CDN for fast delivery</li>
        </ul>
      </div>
    </DashboardLayout>
  )
}

const styles = {
  welcome: {
    marginBottom: '32px',
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  welcomeText: {
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    background: 'white',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    borderTop: '4px solid',
    textDecoration: 'none',
    transition: '0.2s',
    cursor: 'pointer',
  },
  cardIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '8px',
  },
  cardCount: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#B68A52',
  },
  info: {
    background: 'white',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  infoList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    color: '#666',
  },
}
