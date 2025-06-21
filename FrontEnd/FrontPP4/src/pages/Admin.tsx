import { useState } from "react"
import { Content } from "../Components/Atmos/content/Content"
import { ButtonCustom } from "../Components/Atmos/buttons/Button"
import { Box, List, ListItem, Text, Badge, VStack, HStack, AvatarRoot, AvatarFallback, AvatarImage, TableRoot, TableHeader, TableColumnHeader } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import '../Styles/Components.css'
import { getAllUsersForAdmin } from "../Helpers/Administrator"

export const Admin = () => {
  const [userList, setUserList] = useState<{ Rol: string; email: string; name: string; photoUrl: string }[]>([])
  const [listGet, setListGet] = useState<boolean>(false) ;
  const handleShowUser = async () => {
    try {
      const res = await getAllUsersForAdmin()
      if (res.success && Array.isArray(res.data)) {
        setUserList(res.data)
      } else {
        setUserList([])
      }
    } catch {
      setUserList([])
    }
  }
console.log(userList);

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
          styleButton={{ variant: 'outline', colorPalette: 'teal' }}
          action={handleShowUser}
        />
      </div>

      {/* Si hay usuarios, los muestro; si no, un mensaje */}
      {userList.length > 0 ? (
        <TableRoot size={'sm'} width={'70%'} margin={'auto'}>
          <TableHeader>
            <TableColumnHeader>Nombre</TableColumnHeader>
            <TableColumnHeader>Email</TableColumnHeader>
            <TableColumnHeader>Rol</TableColumnHeader>
            <TableColumnHeader>Imagen de Perfil</TableColumnHeader>
          </TableHeader>
        </TableRoot>
      ) : (
        <Text mt={6} color="gray.500" textAlign="center">
          {userList.length === 0 && listGet ? 'No hay usuarios que mostrar.' : !listGet?  'Puedes ver los usuarios activos': ''}
        </Text>
      )}
    </>
  )
}
