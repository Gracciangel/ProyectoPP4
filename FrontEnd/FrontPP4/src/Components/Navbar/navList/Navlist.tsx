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
        label: 'Perfil' ,
        path: '/profile',
        
    },
    {
        label:'Contacto',
        path:'/contact',
     
    },
    {
        label: 'Login',
        path: '/login',
        icon:{
            isIcon: true ,
            pathIcon: login
        }
    },
]


export const Navlist = () => {
  return (
    
 <>
 
        {
            navlist.map((n, i) => (
                <div key={i}>
                    <ul className='ul'>
                        {
                            n.icon?.isIcon ? 
                            (<a 
                            onClick={()=>  console.log('redirigiendo al path '+n.path)}>
                                <img src={n.icon.pathIcon} alt="icono de inicio de sesion" className='imgNavlist'/>
                            </a>)
                            : 
                            (
                                <li
                                onClick={()=>{
                                    console.log('redirigiendo al path '+n.path)
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
