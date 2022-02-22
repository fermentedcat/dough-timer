import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import styles from './Step.module.scss'

const Step = ({
  step, 
  number,
  isNext = true,
  isDone = false,
  isActive = false
}) => {
  const ref = useRef()

  useEffect(() => {
    if (isActive && number > 1) {
      ref.current.scrollIntoView({block: 'start', behavior: 'smooth', inline: 'nearest'})
    }
  }, [isActive, number])

  return (
    <motion.section 
      className={`${styles.wrapper} ${isActive && styles.active} ${isNext && styles.next} ${isDone && styles.done}`}
      ref={ref}
      initial={{ scale: 1 }}
      animate={{scale: isActive ? [0.95, 1.02, 0.95, 1.02, 1] : 1}}
    >
      <div className={styles.innerWrapper}>
        <div className={styles.item}>
          <div className={styles.body}>
            <strong>{isActive ? 'Now:' : isNext ? 'Next up:' : isDone ? 'Previously:' : 'Upcoming:'}</strong>
            <p>{step.description.eng}</p>
          </div>
          <p className={styles.number}>{number}</p>
        </div>
      </div>
    </motion.section>
  )
}

export default Step