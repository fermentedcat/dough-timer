import styles from './Button.module.scss';

const Button = ({
  onClick = () => {},
  variant = 'primary',
  size = 'medium',
  children,
  ...rest
}) => {

  return (
    <button 
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button