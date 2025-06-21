import { useState } from "react";
import { Content } from "../Components/Atmos/content/Content";
import { ButtonCustom } from "../Components/Atmos/buttons/Button";
import {
  Text,
  AvatarRoot,
  AvatarFallback,
  AvatarImage,
  TableRoot,
  TableHeader,
  TableColumnHeader,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@chakra-ui/react";

import "../Styles/Components.css";
import { getAllUsersForAdmin } from "../Helpers/Administrator";

export const Admin = () => {
  const [userList, setUserList] = useState<
    { Rol: string; email: string; name: string; photoUrl: string }[]
  >([]);
  const [listGet, setListGet] = useState<boolean>(false);
  const [selected, setSelected] = useState<{ email: string; name: string }[]>(
    []
  );
  const handleShowUser = async () => {
    try {
      const res = await getAllUsersForAdmin();
      if (res.success && Array.isArray(res.data)) {
        setUserList(res.data);
      } else {
        setUserList([]);
      }
    } catch {
      setUserList([]);
    }
  };

  const handleCheckList = ({ e, n }: { e: string; n: string }) => {
    setSelected((prev) => {
      const exists = prev.some((u) => u.email === e);
      if (exists) {

        return prev.filter((u) => u.email !== e);
      } else {

        return [...prev, { email: e, name: n }];
      }
    });
  };



  return (
    <>
      <div className="usuarioPanel">
        <Content
          size="lg"
          title="Panel de Administración"
          text="Aquí puedes gestionar los libros, usuarios y otras configuraciones del sistema."
        />
        <ButtonCustom
          size="lg"
          type="success"
          label="Ver Usuarios"
          styleButton={{ variant: "outline", colorPalette: "teal" }}
          action={handleShowUser}
        />
      </div>

      {/* Si hay usuarios, los muestro; si no, un mensaje */}
      {userList.length > 0 ? (
        <TableRoot size={"sm"} width={"70%"} margin={"6rem auto"} >
          <TableHeader>
            <TableColumnHeader textAlign="center">Seleccion</TableColumnHeader>
            <TableColumnHeader textAlign="center">Nombre</TableColumnHeader>
            <TableColumnHeader textAlign="center">Email</TableColumnHeader>
            <TableColumnHeader textAlign="center">Rol</TableColumnHeader>
            <TableColumnHeader textAlign="center">
              Imagen de Perfil
            </TableColumnHeader>
          </TableHeader>
          <TableBody>
            {userList.map((u, i) => (
              <TableRow key={i}>
                <TableCell textAlign="center">
                  <Checkbox.Root
                    onCheckedChange={() =>
                      handleCheckList({ e: u.email, n: u.name })
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Root>
                </TableCell>
                <TableCell textAlign="center">{u.name}</TableCell>
                <TableCell textAlign="center">{u.email}</TableCell>
                <TableCell textAlign="center">{u.Rol}</TableCell>
                <TableCell textAlign="center">
                  <AvatarRoot>
                    <AvatarFallback name={u.name}>
                      {
                        u.photoUrl && (
                          <AvatarImage>
                            {u.photoUrl}
                          </AvatarImage>
                        )
                      }
                    </AvatarFallback>
                  </AvatarRoot>
                  
                </TableCell>
              </TableRow>
            ))}
             <div style={{
              width:'300%',
              display:'flex',
              justifyContent:'space-around',
              alignItems:'center'
            }}>
                <ButtonCustom
          
          type="success"
          label="Eliminar"
          styleButton={{
            variant:"outline",
            colorPalette:'red'
            
          }}
          margin={{top:'3rem', bottom:'3rem'}}
          size="lg"
          action={()=>console.log(selected)}
          />
          <ButtonCustom
          
          type="success"
          label="Modificar Rol"
          styleButton={{
            variant:"outline",
            colorPalette:'teal'
            
          }}
          margin={{top:'3rem', bottom:'3rem'}}
          size="lg"
          action={()=>console.log(selected)}
          />
            </div>
          </TableBody>
           
        </TableRoot>
      ) : (
        <Text mt={6} color="gray.500" textAlign="center">
          {userList.length === 0 && listGet
            ? "No hay usuarios que mostrar."
            : !listGet
            ? "Puedes ver los usuarios activos"
            : ""}
        </Text>
      )}
    </>
  );
};
