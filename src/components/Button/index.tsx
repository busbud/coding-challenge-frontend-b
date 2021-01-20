import style from './Button.module.scss'
export const Button = ({ color }: { color: string }) => (
  <button className={style.btn}>{color}</button>
)
