import { PiPassword } from 'react-icons/pi';
import '../../Styles/Modal.css';
import { ButtonCustom } from '../Atmos/buttons/Button'
import { Inputs } from '../Atmos/inputs/Inputs';
import { FaUser } from 'react-icons/fa';


interface IModalProps{
    close:()=> void 
    acept:()=> void
}


export const ModalChangePassword = ({close, acept}:IModalProps) => {
    
  return (
      <div className="modalOverlay">
          <div className="containerModal">
           
            <h1>Cambiar Contraseña</h1>
            <p style={{
                marginBottom:'16px'
            }}>completa los campos</p>

            <div style={{
                display:'flex',
                flexDirection:"column",
                justifyContent:"center",
                alignItems:'center',
                gap:'8px'
            }}>
                <label htmlFor="" style={{
                    borderBottom:'1px solid green'
                }}>Contraseá Actual</label>
                  <Inputs
                        
                        required
                        type="text"
                        placeholder="Ingresá una contraseña"
                        onChange={(e) =>
                            alert(e.target.value)
                        }
                        
                      />
                        <label htmlFor=""style={{
                    borderBottom:'1px solid green'
                }} >Nueva contraseña</label>
                  <Inputs
                        image={<PiPassword />}
                        required
                        type="password"
                        placeholder="Ingresá una contraseña"
                        onChange={(e) =>
                            alert(e.target.value)
                        }
                        showText
                      />
                        <label htmlFor=""
                        style={{
                    borderBottom:'1px solid green'
                }}>Reingresá la contraseña</label>
                  <Inputs
                        image={<PiPassword />}
                        required
                        type="password"
                        placeholder="Ingresá una contraseña"
                        onChange={(e) =>
                          alert(e.target.value)
                        }
                        showText
                      />
            </div>
            <div className="modalButtons">
                <ButtonCustom action={close} label="Cancelar" size='md' type='error' styleButton={{
                variant: 'outline',
                colorPalette: 'red'
                }} />
                <ButtonCustom action={acept} label="Aceptar" size="md" type='success' styleButton={{
                variant: 'outline',
                colorPalette: 'green'
                }}/>
             
            </div>
          </div>
        </div>
  )
}
