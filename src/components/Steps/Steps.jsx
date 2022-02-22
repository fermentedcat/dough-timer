import { motion } from "framer-motion"
import styles from './Steps.module.scss'
import Step from "../Step/Step"

const Steps = ({steps, nextUpIndex, activeIndex}) => {

  const variants = {
    hide: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }}
  }

  const stepVariants = {
    hide: {
      y: 300,
    },
    show: {
      y: 0,
      transition: { type: 'linear' }
    }
  }

  return (
    <motion.ul 
      className={styles.wrapper}
      variants={variants}
      initial="hide"
      animate="show"
    >
      {steps.map((step, index) => {
        return (
          <motion.li 
            key={index}
            variants={stepVariants}
          >
            <Step 
              step={step} 
              number={index + 1}
              isActive={activeIndex === index}
              isNext={nextUpIndex === index}
              isDone={nextUpIndex > index}
              />
            </motion.li>
        )
      })}
    </motion.ul>
  )
}

export default Steps