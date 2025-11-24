import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faCamera,
  faSave,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCertificate,
  faCalendar,
  faLock,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/Perfil.module.css'

export default function Perfil() {
  const router = useRouter()

  // Estado do perfil
  const [profileData, setProfileData] = useState({
    name: 'Personal Trainer',
    email: 'personal@fitei.com',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP',
    cref: '123456-G/SP',
    birthDate: '1990-01-15',
    bio: 'Personal Trainer especializado em hipertrofia e emagrecimento com mais de 5 anos de experiência.'
  })

  const [profileImage, setProfileImage] = useState(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // Em produção, salvaria no backend
    alert('Perfil atualizado com sucesso!')
  }

  const handleChangePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      alert('Preencha todos os campos!')
      return
    }

    if (passwordData.new !== passwordData.confirm) {
      alert('As senhas não coincidem!')
      return
    }

    if (passwordData.new.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!')
      return
    }

    // Em produção, mudaria a senha no backend
    alert('Senha alterada com sucesso!')
    setShowPasswordModal(false)
    setPasswordData({ current: '', new: '', confirm: '' })
  }

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronDown} rotation={90} />
            Voltar
          </button>
          <div className={styles.headerInfo}>
            <h1>Meu Perfil</h1>
            <p>Gerencie suas informações pessoais e configurações</p>
          </div>
          <button className={styles.saveButton} onClick={handleSaveProfile}>
            <FontAwesomeIcon icon={faSave} />
            Salvar Alterações
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.mainPanel}>
            {/* Foto do Perfil */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Foto do Perfil</h3>
              <div className={styles.photoSection}>
                <div className={styles.photoContainer}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className={styles.profilePhoto} />
                  ) : (
                    <div className={styles.profilePhotoPlaceholder}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  )}
                  <label className={styles.changePhotoButton}>
                    <FontAwesomeIcon icon={faCamera} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <div className={styles.photoInfo}>
                  <h4>Alterar foto do perfil</h4>
                  <p>Escolha uma imagem com no mínimo 200x200 pixels</p>
                  <p className={styles.photoFormats}>Formatos aceitos: JPG, PNG, GIF</p>
                </div>
              </div>
            </div>

            {/* Informações Pessoais */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Informações Pessoais</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    <FontAwesomeIcon icon={faUser} />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FontAwesomeIcon icon={faCalendar} />
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    className={styles.input}
                    value={profileData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FontAwesomeIcon icon={faEnvelope} />
                    E-mail
                  </label>
                  <input
                    type="email"
                    className={styles.input}
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FontAwesomeIcon icon={faPhone} />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    Localização
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Cidade, Estado"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FontAwesomeIcon icon={faCertificate} />
                    CREF
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={profileData.cref}
                    onChange={(e) => handleInputChange('cref', e.target.value)}
                    placeholder="000000-G/XX"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faUser} />
                  Biografia
                </label>
                <textarea
                  className={styles.textarea}
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Conte um pouco sobre você e sua experiência..."
                  rows={4}
                />
              </div>
            </div>

            {/* Segurança */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Segurança</h3>
              <div className={styles.securitySection}>
                <div className={styles.securityInfo}>
                  <FontAwesomeIcon icon={faLock} className={styles.securityIcon} />
                  <div>
                    <h4>Alterar Senha</h4>
                    <p>Mantenha sua conta segura com uma senha forte</p>
                  </div>
                </div>
                <button
                  className={styles.changePasswordButton}
                  onClick={() => setShowPasswordModal(true)}
                >
                  <FontAwesomeIcon icon={faLock} />
                  Alterar Senha
                </button>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3>Dicas de Perfil</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faUser} />
                  Mantenha suas informações sempre atualizadas
                </li>
                <li>
                  <FontAwesomeIcon icon={faCamera} />
                  Use uma foto profissional para passar mais credibilidade
                </li>
                <li>
                  <FontAwesomeIcon icon={faCertificate} />
                  Mantenha seu CREF válido e atualizado
                </li>
                <li>
                  <FontAwesomeIcon icon={faLock} />
                  Altere sua senha regularmente
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal de Alterar Senha */}
        {showPasswordModal && (
          <div className={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Alterar Senha</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowPasswordModal(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.formGroup}>
                  <label>Senha Atual</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nova Senha</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirmar Nova Senha</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    placeholder="Confirme a nova senha"
                  />
                </div>
                <div className={styles.modalActions}>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancelar
                  </button>
                  <button className={styles.btnPrimary} onClick={handleChangePassword}>
                    <FontAwesomeIcon icon={faSave} />
                    Salvar Senha
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
