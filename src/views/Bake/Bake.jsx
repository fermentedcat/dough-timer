import React, { useState } from 'react'

import styles from './Bake.module.scss'
import { Timer } from '../../components/Timer/Timer'
import recipes from '../../data/recipes.json'
import Button from '../../components/Button/Button'
import Steps from '../../components/Steps/Steps'

const Bake = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(true)
  const [hasUpdated, setHasUpdated] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [secondsToNext, setSecondsToNext] = useState(recipes[0].steps[currentStep].secondsToNext)

  function stopTimer() {
    setIsRunning(false)
    setIsFinished(true)
    setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
  }
  
  function skipTimer() {
    if (isRunning) {
      // make current step active
      // show digits for next timer
      setIsFinished(true)
      setIsRunning(false)
      setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
    } else {
      setSecondsToNext(recipes[0].steps[currentStep + 1].secondsToNext)
      setCurrentStep(currentStep + 1)
    }
    setHasUpdated(true)
  }
  
  function restartTimer() {
    if (!isFinished && !isRunning) {
      startTimer()
      return
    }
    setCurrentStep(currentStep - 1)
    
    // Stop and reset timer to current time
    setIsRunning(false)
    setHasUpdated(true)
  }
  
  function startTimer() {
    setCurrentStep(currentStep + 1)
    setHasUpdated(true)
    setIsRunning(true)
    setIsFinished(false)
    setHasUpdated(false)
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.timerWrapper}>
        <Timer 
          time={secondsToNext} 
          onFinish={stopTimer} 
          isRunning={isRunning}
          hasUpdated={hasUpdated}
        />
      </section>
        <div className={styles.btnWrapper}>
          <Button size="small" onClick={startTimer} disabled={isRunning}>Start timer</Button>
          <Button size="small" onClick={restartTimer} disabled={!isRunning}>Reset</Button>
          <Button size="small" onClick={skipTimer}>Skip</Button>
        </div>
      <Steps 
        steps={recipes[0].steps}
        activeIndex={!isRunning ? currentStep : false}
        nextUpIndex={currentStep}
      />
    </main>
  )
}

export default Bake