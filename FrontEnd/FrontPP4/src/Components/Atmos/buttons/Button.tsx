
import type { IButtons } from '../../../Interfaces/buttons/IButtons'
import '../../Styles/Components.css' ;

export const Button = ({type, action, label, size}: IButtons) => {
  return (
    <button onClick={action} className={type+size} >
        {label}
    </button>
  )
}
