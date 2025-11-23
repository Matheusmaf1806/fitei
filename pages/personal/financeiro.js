import Layout from '../../components/Layout'
import styles from '../../styles/Chat.module.css'

export default function PersonalFinanceiro() {
  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <h1 className={styles.title}>Financeiro</h1>
        <div className={styles.comingSoon}>
          <div className={styles.icon}>💰</div>
          <h2>Em breve!</h2>
          <p>Controle financeiro, planos e receitas</p>
        </div>
      </div>
    </Layout>
  )
}
