import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Timer.module.scss'


export const Timer = ({ time = 0, onFinish = () => {}, isRunning = false, hasUpdated = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(time)

  function getTime() {
    if (secondsLeft < 3600) {
      const date = new Date(secondsLeft * 1000)
      return date.toISOString().slice(14, 19)
    }
    const date = new Date(secondsLeft * 1000)
    return date.toISOString().slice(11, 19)
  }

  useEffect(() => {
    setSecondsLeft(time)
  }, [time])

  useEffect(() => {
    if (hasUpdated) {
      setSecondsLeft(time)
    } 
  }, [hasUpdated, time])
  
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
      stroke: '#ffb5b5',
      transition: { duration: time, ease: 'linear' }
    },
    reset: { 
      stroke: '#dddddd',
      transition: { duration: 0 }
    }
  }
  
  const timeLeftVariants = {
    initial: {
      strokeDasharray: '283 283',
      stroke: '#ffb5b5',
    },
    start: {
      strokeDasharray: '0 283',
      stroke: ['#ffb5b5', '#9399b4', '#dddddd',],
      transition: { duration: time, ease: 'linear' }
    },
    reset: { 
      strokeDasharray: '0 283',
      stroke: '#ffb5b5',
      transition: { duration: 0.5 }
    },
    something: { 
      strokeDasharray: '283 283',
      stroke: '#ffb5b5',
      transition: { duration: 0 }
    }
  }

  return (
    <div 
      className={`${styles.wrapper} ${isRunning && styles.started} ${hasUpdated && styles.restarted}`}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.countDown}>
          <motion.circle 
            className={styles.timeElapsed} 
            cx="50" 
            cy="50" 
            r="45"
            variants={elapsedTimeVariants}
            initial="initial"
            animate={isRunning ? 'start' : 'initial'}
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
            animate={isRunning ? 'start' : 'initial'}
          ></motion.path>
        </g>
      </svg>
      <div className={styles.label}>
        <p className={styles.description}>Time until next step:</p>
        <p className={styles.time}>{getTime()}</p>
      </div>
    </div>
  )
}
