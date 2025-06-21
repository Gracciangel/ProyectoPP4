import { useState, useEffect } from 'react'
import { PiPassword } from 'react-icons/pi'
import '../../Styles/Modal.css'
import { ButtonCustom } from '../Atmos/buttons/Button'
import { Inputs } from '../Atmos/inputs/Inputs'

interface IModalProps {
  close: () => void
  acept: (current: string, next: string) => void
}

export const ModalChangePassword = ({ close, acept }: IModalProps) => {
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      setError('Todos los campos son obligatorios')
      setIsValid(false)
    } else if (newPwd !== confirmPwd) {
      setError('La nueva contraseña y la confirmación no coinciden')
      setIsValid(false)
    } else {
      setError('')
      setIsValid(true)
    }
  }, [currentPwd, newPwd, confirmPwd])

  const handleAccept = () => {
    if (isValid) {
      acept(currentPwd, newPwd)
    }
  }

  return (
    <div className="modalOverlay">
      <div className="containerModal">
        <h1>Cambiar Contraseña</h1>
        <p style={{ marginBottom: '16px' }}>Completa los campos</p>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="current" style={{ borderBottom: '1px solid green' }}>Contraseña Actual</label>
          <Inputs
            required
            type="text"
            placeholder="Ingresá tu contraseña actual"
            
            onChange={(e) => setCurrentPwd(e.target.value)}
          />

          <label htmlFor="new" style={{ borderBottom: '1px solid green' }}>Nueva Contraseña</label>
          <Inputs
            required
            type="password"
            placeholder="Ingresá tu nueva contraseña"
            image={<PiPassword />}
            showText
            onChange={(e) => setNewPwd(e.target.value)}
          />

          <label htmlFor="confirm" style={{ borderBottom: '1px solid green' }}>Reingresá la Contraseña</label>
          <Inputs
            required
            type="password"
            placeholder="Confirmá tu nueva contraseña"
            image={<PiPassword />}
            showText
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}

        <div className="modalButtons">
          <ButtonCustom
            action={close}
            label="Cancelar"
            size="md"
            type="error"
            styleButton={{ variant: 'outline', colorPalette: 'red' }}
            disabled={false}
          />
          <ButtonCustom
            action={handleAccept}
            label="Aceptar"
            size="md"
            type="success"
            styleButton={{ variant: 'outline', colorPalette: 'green' }}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  )
}
