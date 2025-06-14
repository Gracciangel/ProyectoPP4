
import { useState } from 'react';
import type { IInputs } from '../../../Interfaces/inputs/IInputs' ;
import '../../../Styles/Login.css' ; 
import notShow from '../../../assets/ojo-oculto.png'; 
import show from '../../../assets/ojo.png'; 

export const Inputs = ({type , placeholder, onChange: retunrValue, typeSize, focus, required, showText}: IInputs) => {

  const [overrideType, setOverrideType] = useState<IInputs['type']>(type); 
  
  const changeTypeProperty  = () =>{
     setOverrideType((prev) => (prev === 'password' ? 'text' : 'password'));
  }
  return (
   <div>
     <input type={showText ? overrideType : type }  placeholder={placeholder} className={`${focus ? 'input_focus_' + typeSize : 'input_' + typeSize}`} 
    onChange={retunrValue } required={required}/>
    {
      showText && (
        <img src={
          overrideType === 'password' ? 
          notShow :
          show 
        } 
        style={{
          cursor:'pointer',
          width:'20px'
        }}
        onClick={changeTypeProperty}
        alt="" />
      )
    }
   </div>
  )
}
