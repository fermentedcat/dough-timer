import Routes from './Routes';
import styles from './App.module.scss'
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App;
