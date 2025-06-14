import { useNavigate } from 'react-router-dom';
import '../../../Styles/NavBar.css' ;

import logo from '../../../assets/candado.svg' ;
import login from '../../../assets/control-de-acceso 1.svg'; 
interface INavList {
    label?: string,
    path: string, 
    icon?: {
        isIcon: boolean,
        pathIcon:string
    }
}

export const navlist :INavList[]= [
    {
        label:'Home',   
        path:'/',
        
    },
    {
        label: 'Registrar',
        path: '/register',
        
    },
    {
        label:'Contacto',
        path:'/contact',
     
    },
    {
        label: 'Login',
        path: '/profile',
        icon:{
            isIcon: true ,
            pathIcon: login
        }
    },
]


export const Navlist = () => {
    const navigate = useNavigate() ; 
  return (
    
 <>
 
        {
            navlist.map((n, i) => (
                <div key={i}>
                    <ul className='ul'>
                        {
                            n.icon?.isIcon ? 
                            (<a 
                            onClick={()=> navigate(n.path)}>
                                <img src={n.icon.pathIcon} alt="icono de inicio de sesion" className='imgNavlist'/>
                            </a>)
                            : 
                            (
                                <li
                                onClick={()=>{
                                    navigate(n.path)
                                }}
                                >{n.label}</li>
                            )
                        }
                    </ul>
                </div>
            ))
        }</>
    
  )
}
