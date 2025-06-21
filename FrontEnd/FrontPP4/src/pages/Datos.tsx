import { ModalChangePassword } from '../Components/Molecules/ModalChangePassword'
import { ButtonCustom } from '../Components/Atmos/buttons/Button'
import { useEffect, useState } from 'react'

type User = {
  email: string
  name: string
  photoUrl: string
  rol: number
}

export const Datos = () => {
    
  const [user, setUser] = useState<User | null>(null)
  const [changePassword, setChangePassword] = useState<boolean>(false);
  useEffect(() => {
    
    const raw = localStorage.getItem('user')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setUser(parsed[0])
      } catch {
        console.error('El valor de localStorage no es JSON válido')
      }
    }
  }, [])

  return (
    <div
      style={{
        margin:'auto',
        marginTop:'6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
      }}
    >
        
      {user ? (
        <>
        {
            changePassword && (
                <ModalChangePassword close={()=> setChangePassword(false)} acept={()=> alert('acept')}/>
            )
        }
        <label htmlFor="">Nombre</label>
        <input type="text" disabled={true} value={user.name.toUpperCase()} />
        <label htmlFor="">Email</label>
        <input type="text" disabled={true} value={user.email} />
        <label htmlFor="">Rol</label>
        <input type="text" disabled={true} value={user.rol} />
        <label htmlFor="">Imagen</label>
        {
            user.photoUrl ?(
                <img src={user.photoUrl} alt="" />
            )
            :
            (
                
                <input type="text" disabled={true} value="No hay imagen de perfil" />
            )
        }
        </>
      ) : (
        <p>Cargando datos de usuario…</p>
      )}
      <ButtonCustom
      type='success'
      size='sm'
      action={()=> setChangePassword(true)}
      label='Cambiar Contraseña'
      styleButton={{
        variant:'outline',
        colorPalette:"teal"
        
      }}
      margin={{
        top:'2rem',
        bottom:'0px'
      }}
      />
    </div>
  )
}
