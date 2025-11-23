import Layout from '../../components/Layout'
import styles from '../../styles/Chat.module.css'

export default function AlunoChat() {
  return (
    <Layout userType="aluno">
      <div className={styles.container}>
        <h1 className={styles.title}>Chat com Personal</h1>
        <div className={styles.comingSoon}>
          <div className={styles.icon}>💬</div>
          <h2>Em breve!</h2>
          <p>Sistema de mensagens integrado com WhatsApp</p>
        </div>
      </div>
    </Layout>
  )
}
