import { NavLink } from "react-router-dom"
import styles from './Link.module.scss'

const Link = ({
  to,
  type = 'link',
  variant = 'primary',
  size = 'medium',
  children,
  ...rest
}) => {
  return (
    <NavLink
      to={to}
      className={`${styles[type]} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {children}
    </NavLink>
  )
}

export default Link