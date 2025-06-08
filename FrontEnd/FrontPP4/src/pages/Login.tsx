import { useState } from 'react'
import type { ILoging } from '../Interfaces/PagesInterfaces/ILogin'
import '../Styles/Login.css'


export const Login = ({type} :ILoging) => {
    const [, setEmail] = useState('')
    const [pass , setPass] = useState("") ;
    const [load, setLoad] = useState(false) ;
  return (
    <div className={`login Login_${type}`}>
        
    </div>
  )
}
