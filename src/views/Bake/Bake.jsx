import React, { useState } from 'react'

import styles from './Bake.module.scss'
import { Timer } from '../../components/Timer/Timer'
import recipes from '../../data/recipes.json'
import Steps from '../../components/Steps/Steps'
import Play from '../../components/Icons/Play'
import Reset from '../../components/Icons/Reset'
import FastForward from '../../components/Icons/FastForward'
import IconButton from '../../components/IconButton/IconButton'

const Bake = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isRestarted, setIsRestarted] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [secondsToNext, setSecondsToNext] = useState(recipes[0].steps[currentStep].secondsToNext)

  function stopTimer() {
    setIsRunning(false)
    setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
  }
  
  function skipTimer() {
    if (isRunning) {
      // make current step active
      // show digits for next timer
      setIsRunning(false)
      setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
    } else {
      setSecondsToNext(recipes[0].steps[currentStep + 1].secondsToNext)
      setCurrentStep(currentStep + 1)
    }
    setHasUpdated(true)
    setIsRestarted(false)
  }
  
  function restartTimer() {
    if (!isRunning) return
    
    setIsRestarted(true)
    setCurrentStep(currentStep - 1)
    // Stop and reset timer to current time
    setIsRunning(false)
    setHasUpdated(true)
  }
  
  function startTimer() {
    if (isRunning) return

    setCurrentStep(currentStep + 1)
    setIsRestarted(false)
    setHasUpdated(true)
    setIsRunning(true)
    setHasUpdated(false)
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.timerWrapper}>
        <Timer 
          time={secondsToNext} 
          onFinish={stopTimer} 
          isRunning={isRunning}
          isRestarted={isRestarted}
          hasUpdated={hasUpdated}
        />
      </section>
      <div className={styles.btnWrapper}>
        <IconButton title="Start timer" onClick={startTimer} disabled={isRunning}><Play /></IconButton>
        <IconButton title="Reset timer" onClick={restartTimer} disabled={!isRunning}><Reset /></IconButton>
        <IconButton title="Skip to next step" onClick={skipTimer}><FastForward /></IconButton>
      </div>
      <section className={styles.stepsWrapper}>
        <Steps 
          steps={recipes[0].steps}
          activeIndex={!isRunning ? currentStep : false}
          nextUpIndex={currentStep}
        />
      </section>
    </main>
  )
}

export default Bake