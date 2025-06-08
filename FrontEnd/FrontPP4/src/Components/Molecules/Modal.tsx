import { Button } from "../Atmos/buttons/Button"
import '../../Styles/Modal.css';
interface IModalProps{
    title: string
    msj:string
    icon?: string
    close:()=> void 
    acept:()=> void
}

export const Modal = ({title, msj, icon, close, acept}:IModalProps) => {
  return (
    <div className="modalOverlay">
      <div className="containerModal">
          {
            icon && 
            (
                <img src={icon} alt="icono del popup" />
            )
        }
        <h1>{title}</h1>
        <p>{msj}</p>
        <div className="modalButtons">
            <Button action={close} label="Cancelar" size='md' type='error' />
            <Button action={acept} label="Aceptar" size="md" type='success'/>
         
        </div>
      </div>
    </div>
  )
}
