import { useState } from 'react'
// import type { ILoging } from '../Interfaces/PagesInterfaces/ILogin'
import '../Styles/Login.css'
import { Inputs } from '../Components/Atmos/inputs/Inputs'
import { Button } from '../Components/Atmos/buttons/Button'
import { authUser } from '../Helpers/user'
import type { IUser } from '../Interfaces/user/IUser'
import { Spinner } from 'react-bootstrap'


export const Auth = () => {
    const [userValue, setUserValue] = useState<IUser>({
      email: '',
      password: ''
    })
    const [load, setLoad] = useState(false) ;
    const [err, setErr] = useState<string>(''); 


    const handleLogin = async () => {
      if(err !== ''){
        setErr('')
      }
      const res = await authUser(false, userValue, undefined); 
      try {
        setLoad(true); 
        if(res.success){
          setLoad(false)
          console.log(res) ;
        }else{
          setLoad(false); 
          setErr(res.error) ;
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
      {
        load && (
          <Spinner size={'sm'}/>
        )
      }
      <h1>Inicia Sesión</h1>
      <Inputs placeholder='Ingresa tu email' type='text' typeSize='md' required={
        true
      } onChange={(e) => setUserValue({ ...userValue, email: e.target.value })} />
      <Inputs placeholder='Ingresa una contraseña' type='password' typeSize='md' required={true} onChange={(e) => setUserValue({
        ...userValue, 
        password: e.target.value
      })}
      showText={true}
      />
      <Button label='Iniciar Sesion' type='success' action={handleLogin} size='md'/>
      {
        err !== "" && (
          <h3>{err}</h3>
        )
      }
    </div>
  )
}
