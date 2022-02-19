import React, { useEffect, useState } from 'react'

import styles from './Bake.module.scss'
import Link from '../../components/Link/Link'
import { Timer } from '../../components/Timer/Timer'
import Step from '../../components/Step/Step'
import recipes from '../../data/recipes.json'

const Bake = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(true)
  const [hasUpdated, setHasUpdated] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [secondsToNext, setSecondsToNext] = useState(0)

  function stopTimer() {
    setIsRunning(false)
    setIsFinished(true)
    setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
  }
  
  function skipTimer() {
    // make current step active
    // show digits for next timer
    setIsFinished(true)
    setIsRunning(false)
    setHasUpdated(true)
    setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
  }
  
  function restartTimer() {
    if (!isFinished && !isRunning) {
      startTimer()
      return
    }
    // Stop and reset timer to current time
    setIsRunning(false)
    setHasUpdated(true)
  }
  
  function startTimer() {
    setIsFinished(false)
    setIsRunning(true)
    setHasUpdated(false)
  }
  
  function handleStepDone() {
    setCurrentStep(currentStep + 1)
    setHasUpdated(true)
  }

  useEffect(() => {
    if (currentStep > 0) {
      // timer should start if currentStep has increased
      setSecondsToNext(recipes[0].steps[currentStep - 1].secondsToNext)
      startTimer()
      return
    }
    // default show first timer digits
    setSecondsToNext(recipes[0].steps[currentStep].secondsToNext)
  }, [currentStep])

  return (
    <>
      <nav>
        <Link to="/" type="button">Home</Link>
        <Link to="/settings" type="button">Settings</Link>
      </nav>
      <main className={styles.wrapper}>
        <h1>Start baking?</h1>
        <section className={styles.timerWrapper}>
          <Timer 
            time={secondsToNext} 
            onFinish={stopTimer} 
            isRunning={isRunning}
            hasUpdated={hasUpdated}
          />
          {/* <Button onClick={stopTimer}>Avbryt</Button> */}
        </section>
        <Step 
          step={recipes[0].steps[currentStep]} 
          onDone={handleStepDone}
          onRestart={restartTimer}
          onSkip={skipTimer}
          active={isFinished}
          isStopped={!isFinished && !isRunning}
        />
      </main>
    </>
  )
}

export default Bake