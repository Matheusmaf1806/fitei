import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/personal/dashboard')
  }, [router])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background-secondary)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--primary)' }}>
          <FontAwesomeIcon icon={faDumbbell} />
        </div>
        <h1 style={{ color: 'var(--primary)' }}>Fitei</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </div>
    </div>
  )
}
