import styles from './IconButton.module.scss'

const IconButton = ({ children, title, onClick, size = 'medium', ...props }) => {
  return (
    <button 
      onClick={onClick} 
      className={`${styles.button} ${styles[size]}`}
      aria-label={title}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton