import React, { useEffect, useState } from 'react'
import styles from './Timer.module.scss'


export const Timer = ({ time = 5, onFinish = () => {}, isStarted = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(time)

  useEffect(() => {
    let timer
    if (isStarted && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, 1000)
    }
    return () => {
      timer && clearTimeout(timer)
    }
  }, [isStarted, secondsLeft])

  useEffect(() => {
    if (secondsLeft === 0) {
      onFinish()
      return
    }
  }, [secondsLeft, onFinish])

  return (
    <div className={`${styles.wrapper} ${isStarted && styles.started}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.countDown}>
          <circle 
            className={styles.timeElapsed} 
            cx="50" 
            cy="50" 
            r="45"
            style={{ transition: `${time}s linear all` }}
          ></circle>
          <path
            id="base-timer-path-remaining"
            className={styles.timeLeft}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
            style={{ transition: `${time}s linear all` }}
          ></path>
        </g>
      </svg>
      <div className={styles.label}>
        <p className={styles.description}>Time left:</p>
        <p className={styles.time}>{secondsLeft}</p>
      </div>
    </div>
  )
}
