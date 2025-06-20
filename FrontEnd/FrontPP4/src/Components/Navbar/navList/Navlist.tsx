import { useNavigate } from 'react-router-dom';
import '../../../Styles/NavBar.css';
import { FiLogIn } from 'react-icons/fi';
import login from '../../../assets/control-de-acceso 1.svg';
import { AvatarFallback, AvatarRoot } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface INavList {
  label?: string;
  path: string;
  icon?: {
    isIcon: boolean;
    pathIcon: string;
  };
}

export const Navlist = () => {
  const navigate = useNavigate();
 const [userData, setUserData] = useState<{
    email: string, 
    name:string
 }>()
  const user = localStorage.getItem('user');
 useEffect(()=> {
     if(user){
    setUserData(JSON.parse(user)); 
  }
 }, [])
  const navlist: INavList[] = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Libros',  
      path: '/books',
    },
    // Registrar solo se muestra si NO hay usuario en localStorage
    ...(!user
      ? [
          {
            label: 'Registrar',
            path: '/register',
          },
        ]
      : []),
    {
      label: 'Contacto',
      path: '/contact',
    },
    {
      label: 'Login',
      path: '/profile',
      icon: {
        isIcon: true,
        pathIcon: login,
      },
    },
  ];

  return (
    <>
      {navlist.map((n, i) => (
        <div key={i}>
          <ul className="ul">
            {n.icon?.isIcon ? (
                !user ? (
                     <FiLogIn
                size={30}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(n.path)}
              />
                ):
                (
                    <AvatarRoot onClick={()=> alert(user)} style={{ cursor: 'pointer' }}>
                        <AvatarFallback>{userData?.name}</AvatarFallback>
                    </AvatarRoot>
                )
            ) : (
              <li onClick={() => navigate(n.path)}>{n.label}</li>
            )}
          </ul>
        </div>
      ))}
    </>
  );
};
