import React from 'react'
import { motion } from 'framer-motion'
import styles from './Timer.module.scss'


export const Timer = () => {
  return (
    <motion.div
      className={styles.result}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }} 
    >
      Hej

    </motion.div>
  )
}
