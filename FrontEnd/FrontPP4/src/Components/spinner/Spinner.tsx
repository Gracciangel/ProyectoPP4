
import type { ISpinner } from '../../Interfaces/spinner/ISpinner'
import '../../Styles/spinner.css';
export const Spinner = ({size, label}:ISpinner) => {
  return (
    <div className='spinnerContainer'>
      <div className={`spinner_${size}`}></div>
      <p>{label}</p>
    </div>
  )
}
