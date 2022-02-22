import React, { useCallback, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './Timer.module.scss'


export const Timer = ({ time = 0, onFinish, isRunning, hasUpdated }) => {
  const [secondsLeft, setSecondsLeft] = useState(time)
  const animation = useAnimation()

  function getTime() {
    if (secondsLeft < 3600) {
      const date = new Date(secondsLeft * 1000)
      return date.toISOString().slice(14, 19)
    }
    const date = new Date(secondsLeft * 1000)
    return date.toISOString().slice(11, 19)
  }

  const startAnimation = useCallback(async () => {
      await animation.start({ transform: 'scaleX(-1) rotate(90deg)', transition: { duration: 0 } })
      await animation.start({ strokeDasharray: '283 283', stroke: '#ffb5b5', transition: { duration: 0.5 } })
      await animation.start({ transform: 'scaleX(1) rotate(90deg)', transition: { duration: 0 } })
      await animation.start({ strokeDasharray: '282 283', transition: { duration: time / 900 }, ease: 'easeOut' })
      animation.start({ strokeDasharray: '0 283', transition: { duration: time - (time / 900), ease: 'linear' } })
    }
  , [time, animation]) 

  useEffect(() => {
    setSecondsLeft(time)
  }, [time])

  useEffect(() => {
    if (hasUpdated) {
      setSecondsLeft(time)
    } 
  }, [hasUpdated, time])

  useEffect(() => {
    isRunning && startAnimation()
  }, [isRunning, startAnimation])
  
  useEffect(() => {
    let timer
    if (isRunning && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, 1000)
    }
    return () => {
      timer && clearTimeout(timer)
    }
  }, [isRunning, secondsLeft, time])

  useEffect(() => {
    if (secondsLeft === 0 && time > 0) {
      onFinish()
      return
    }
  }, [secondsLeft, onFinish, time])

  const elapsedTimeVariants = {
    initial: {
      stroke: '#dddddd',
    },
    start: {
      stroke: '#dbd0d0',
      transition: { duration: time, ease: 'linear' }
    },
    reset: { 
      stroke: '#dddddd',
      transition: { duration: .8 }
    }
  }
  
  const timeLeftVariants = {
    initial: {
      strokeDasharray: '0 283',
    },
    reset: () => {
      animation.stop()
      animation.start({ strokeDasharray: '0 283', transition: { duration: 0.8, ease: 'linear' } })
    }
  }

  return (
    <div className={styles.square}>
      <div className={`${styles.wrapper} ${isRunning && styles.started} ${hasUpdated && styles.restarted}`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className={styles.countDown}>
            <motion.circle 
              className={styles.timeElapsed} 
              cx="50" 
              cy="50" 
              r="45"
              variants={elapsedTimeVariants}
              initial="initial"
              animate={isRunning ? 'start' : hasUpdated ? 'reset' : 'initial'}
            ></motion.circle>
            <motion.path
              id="base-timer-path-remaining"
              className={styles.timeLeft}
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
              variants={timeLeftVariants}
              initial="initial"
              animate={isRunning ? animation : hasUpdated ? 'reset' : 'initial'}
            ></motion.path>
          </g>
        </svg>
        <div className={styles.label}>
          <p className={styles.description}>Time until next step:</p>
          <p className={styles.time}>{getTime()}</p>
        </div>
      </div>
    </div>
  )
}
