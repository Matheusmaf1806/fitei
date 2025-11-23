import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/Chat.module.css'

export default function PersonalMensagens() {
  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <h1 className={styles.title}>Mensagens</h1>
        <div className={styles.comingSoon}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faComments} />
          </div>
          <h2>Em breve!</h2>
          <p>Sistema de mensagens e notificações automáticas via WhatsApp</p>
        </div>
      </div>
    </Layout>
  )
}
