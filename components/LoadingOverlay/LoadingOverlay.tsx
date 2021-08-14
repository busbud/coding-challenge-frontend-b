import Clock from '../icons/Clock'
import styles from './LoadingOverlay.module.css'

export default function LoadingOverlay() {
  return (
    <div className={styles.loading}>
        <Clock large />
    </div>
  )
}
