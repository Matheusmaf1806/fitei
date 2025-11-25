import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationTriangle, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Toast.module.css'

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: faCheck,
    error: faExclamationTriangle,
    warning: faExclamationTriangle,
    info: faInfo
  }

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastIcon}>
        <FontAwesomeIcon icon={icons[type]} />
      </div>
      <div className={styles.toastMessage}>{message}</div>
      <button
        className={styles.toastClose}
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
}
