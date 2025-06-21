
import { Navlist } from './navList/Navlist' ;
import '../../Styles/NavBar.css';
import logo from '../../assets/logo.png'
export const NavBar = () => {
  return (
    <div className='container'>
      <img src={logo} alt="" style={{width:'80px'}} />
       <Navlist/>
    </div>
  )
}
