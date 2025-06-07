import React, { useState } from 'react'
import type { ILoging } from '../Interfaces/PagesInterfaces/ILogin'
import '../Styles/Login.css'
import logo_candado from '../assets/candado.svg'; 
import { Button } from '../Components/Atmos/buttons/Button';
import { Inputs } from '../Components/Atmos/inputs/Inputs';
import { Spinner } from '../Components/spinner/Spinner';


export const Login = ({type} :ILoging) => {
    const [email, setEmail] = useState('')
    const [pass , setPass] = useState("") ;
    const [load, setLoad] = useState(false) ;
    const user = {
        mail: email ,
        password: pass
    }
    const getUser  = () => {
      
    }
  return (
    <div className={`login Login_${type}`}>
        <div>
        <div>
        <img src={logo_candado} alt="logo candado" />
        {
            load && (
            <Spinner size='lg'/>
            )
        }
        </div>
        <h1>Login</h1>
        <div >
        <Inputs type='text' placeholder='ingresa tu email' typeSize='lg' retunrValue={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
        <Inputs type='password' placeholder='ingresa tu contraseña' typeSize='lg' retunrValue={(e:React.ChangeEvent<HTMLInputElement>)=> setPass(e.target.value)}/>
        <Button label='Login' size='lg' action={getUser} type='success'/>
        </div>
        </div>
    </div>
  )
}
