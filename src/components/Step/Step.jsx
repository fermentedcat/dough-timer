import Button from '../Button/Button'
import styles from './Step.module.scss'

const Step = ({
  step, 
  active = true,
  isStopped = false,
  onDone = () => {}, 
  onRestart = () => {}, 
  onSkip = () => {}, 
}) => {

  return (
    <section className={styles.wrapper}>
      <h2>{active ? 'Now:' : 'Next up:'}</h2>
      <p>{step.description.eng}</p>
      <Button onClick={onDone} disabled={!active}>Start timer</Button>
      <Button onClick={onRestart} disabled={active}>{isStopped ? 'Restart' : 'Reset'}</Button>
      <Button onClick={onSkip} disabled={active}>Skip</Button>
    </section>
  )
}

export default Step