import styles from './Navbar.module.scss'
import Link from "../Link/Link"

const Navbar = () => {
  return (
    <nav className={styles.wrapper}>
      <Link to="/" type="button" size="small">Home</Link>
      <Link to="/settings" type="button" size="small">Settings</Link>
    </nav>
  )
}

export default Navbar
