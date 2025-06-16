import { useState } from 'react'
import { LuUser } from 'react-icons/lu';
import { LuLock } from 'react-icons/lu';
import '../Styles/Login.css'
import { Inputs } from '../Components/Atmos/inputs/Inputs'
import { ButtonCustom } from '../Components/Atmos/buttons/Button'
import { authUser } from '../Helpers/user'
import type { IUser } from '../Interfaces/user/IUser'
import { SpinnerCustom } from '../Components/spinner/Spinner'; 
import { Alert, AlertDescription, AlertIndicator, AlertRoot } from '@chakra-ui/react';
import { TfiEmail } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';


export const Auth = () => {
    const navigate = useNavigate() ;
    const [userValue, setUserValue] = useState<IUser>({
      email: '',
      password: ''
    })
    const [load, setLoad] = useState(false) ;
    const [err, setErr] = useState<string>(''); 
    const [errDescripcion, setErrDescription] = useState<string>(''); 

    const handleLogin = async () => {
      if(err !== ''){
        setErr('')
      }
      const res = await authUser(false, userValue, undefined); 
      try {
        setLoad(true); 
        if(res.success){
          setLoad(false)
          localStorage.setItem('user', JSON.stringify(res.result)); 
          navigate('/perfil')
        }else{
          console.log(res)
          setLoad(false); 
          setErrDescription(res.msj)
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
          <SpinnerCustom/>
        )
      }
    <div className='Login'>
        <h1>Inicia Sesión</h1>
      <Inputs placeholder='Ingresa tu email' type='text' typeSize='md' required={
        true
      } 
      image={<TfiEmail/>}
      onChange={(e) => setUserValue({ ...userValue, email: e.target.value })} />
      <Inputs placeholder='Ingresa una contraseña' type='password' typeSize='md' required={true} onChange={(e) => setUserValue({
        ...userValue, 
        password: e.target.value
      })}
      image={<LuLock/>}
      showText={true}
      />
      
      <ButtonCustom label='Iniciar Sesion' type='success' action={handleLogin} size='md'
      styleButton={<LuUser/>}
      />
      {
        err !== "" && (
        <div style={{
          display:'flex'
        }}> 
            <AlertRoot status={'error'}>
            <AlertIndicator/>
            <Alert.Content>
            <Alert.Title>
              {err}
            </Alert.Title>
            <AlertDescription>
              {errDescripcion}
            </AlertDescription>
          </Alert.Content>
          </AlertRoot>
        </div>
        )
      }
    </div>
    </div>
  )
}
