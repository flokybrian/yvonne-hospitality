import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { LuPlus, LuTrash2, LuEdit } from 'react-icons/lu'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
}

export default function GalleryManager() {
  // Mock data - replace with API call
  const [items, setItems] = useState<GalleryItem[]>([
    { id: 1, title: 'Gourmet Experience', category: 'Food', image: '/images/gallery/food1.jpg' },
    { id: 2, title: 'Culinary Arts', category: 'Food', image: '/images/gallery/food2.jpg' },
    { id: 3, title: 'Hospitality Professional', category: 'Portfolio', image: '/images/hero/hero.jpg' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setCurrentItem(item)
    setShowModal(true)
  }

  const handleAdd = () => {
    setCurrentItem(null)
    setShowModal(true)
  }

  return (
    <DashboardLayout title="Gallery Management">
      <div style={styles.header}>
        <p style={styles.subtitle}>{items.length} items in gallery</p>
        <button onClick={handleAdd} style={styles.addBtn}>
          <LuPlus /> Add New Image
        </button>
      </div>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardCategory}>{item.category}</p>
              <div style={styles.cardActions}>
                <button onClick={() => handleEdit(item)} style={styles.editBtn}>
                  <LuEdit /> Edit
                </button>
                <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>
                  <LuTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{currentItem ? 'Edit Item' : 'Add New Item'}</h2>
            <p style={{ marginTop: '20px', color: '#666' }}>
              File upload integration coming soon. Use Cloudinary dashboard for now.
            </p>
            <button onClick={() => setShowModal(false)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#B68A52',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '20px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  cardCategory: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    flex: 1,
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#DC2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    flex: 1,
  },
  modal: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '32px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
  },
  closeBtn: {
    marginTop: '20px',
    padding: '10px 24px',
    background: '#E5E7EB',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
  },
}
