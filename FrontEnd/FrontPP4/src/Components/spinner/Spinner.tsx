
import type { ISpinner } from '../../Interfaces/spinner/ISpinner'
import '../../Styles/spinner.css';
export const Spinner = ({size}:ISpinner) => {
  return (
    <div className={`spinner_${size}`}></div>
  )
}
