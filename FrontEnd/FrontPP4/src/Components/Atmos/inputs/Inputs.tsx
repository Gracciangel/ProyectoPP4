
import type { IInputs } from '../../../Interfaces/inputs/IInputs'
import '../../Styles/Components.css' ;
export const Inputs = ({type , placeholder, retunrValue, typeSize, focus}: IInputs) => {
  return (
    <input type={type}  placeholder={placeholder} className={`${focus ? 'input_focus_' + typeSize : 'input_' + typeSize}`} 
    onChange={retunrValue }/>
  )
}
