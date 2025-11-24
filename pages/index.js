import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
        <img
          src="https://image-xi-inky.vercel.app/public/tofitilogohorizontal.png"
          alt="ToFiti Logo"
          style={{ height: '80px', width: 'auto', marginBottom: '16px' }}
        />
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      </div>
    </div>
  )
}
