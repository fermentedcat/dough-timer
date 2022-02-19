import React, { useState } from 'react'

import styles from './Bake.module.scss'
import Button from '../../components/Button/Button'
import Link from '../../components/Link/Link'
import { Timer } from '../../components/Timer/Timer'

const Bake = () => {
  const [isStarted, setIsStarted] = useState(false)

  function handleStartTimer() {
    setIsStarted(true)
  }
  return (
    <>
      <nav>
        <Link to="/" type="button">Home</Link>
        <Link to="/settings" type="button">Settings</Link>
      </nav>
      <main>
        <h1>Start baking?</h1>
        <section className={styles.timerWrapper}>
          <Timer 
            time={2700} 
            onFinish={() => console.log('yay')} 
            isStarted={isStarted}
          />
          <Button
            onClick={handleStartTimer}
          >
            Start timer
          </Button>
        </section>
      </main>
    </>
  )
}

export default Bake