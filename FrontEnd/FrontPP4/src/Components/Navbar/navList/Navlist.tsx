import { useNavigate } from "react-router-dom";
import "../../../Styles/NavBar.css";
import { FiLogIn } from "react-icons/fi";
import login from "../../../assets/control-de-acceso 1.svg";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Button,
  Menu,
  MenuItem,
  Portal,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuArrowDown, LuLogOut } from "react-icons/lu";
import { MdDataUsage } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";

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

  const [colorSelected, setColorSelected] = useState<string>("orange"); 
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    photoUrl: string | null;
    rol: number;
  }>();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      setUserData(JSON.parse(user)[0])  ;
      
    }
  }, []);
  
  const navlist: INavList[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Libros",
      path: "/books",
    },

    ...(!user
      ? [
          {
            label: "Registrar",
            path: "/register",
          },
        ]
      : []),
    {
      label: "Contacto",
      path: "/contact",
    },
    {
      label: "Login",
      path: "/profile",
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
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(n.path)}
                />
              ) : (
              <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <AvatarRoot className="avatar">
            <AvatarImage
              src={userData?.photoUrl || ""}
              alt={userData?.name || "User Avatar"}
            />
            <AvatarFallback
              style={{
                backgroundColor: colorSelected,
                color: "#fff",
              }}
            >
             
            </AvatarFallback>
          </AvatarRoot>
          {userData?.name|| "Usuario"}  
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt-a">
             {
              userData?.rol === 1 && (
                <div onClick={() => navigate("/admin")} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <FaUserShield/>
                  <span style={{ marginLeft: "8px" }}>Administrador</span>
                </div>
              ) 
             }
            </Menu.Item>
            <Menu.Item value="new-file-a" onClick={() => navigate("/favoritos")  }>
              <HiHeart/>
             Favoritos
            </Menu.Item>
            <Menu.Item value="new-win-a">
              <LuArrowDown/>
             Mis Descargas
            </Menu.Item>
            <Menu.Item value="open-file-a">
              <MdDataUsage/>
            Mis Datos
            </Menu.Item>
            <Menu.Item value="Cerrar Sesión" onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("favorites");
              navigate("/");
            }}>
              <LuLogOut/>
             Cerrar Sesión
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
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
