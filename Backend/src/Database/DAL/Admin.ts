import { VerifyByEmail } from "../../Helper/VerificarDatauser"
import { IUsers } from "../../Models/interfaces/IUsers";
import { ResponseDto } from "../../Models/ResponseDto";
import { SQL } from "../Context";
import { TypeUserSql, UsersSQL } from "../Query/Querys";
import { verifyEmailExist } from "./User";


//listar todos los usuarios (solo para admin)
export const userList = async (): Promise<ResponseDto> => {
  try {
    // 1) Promise que resuelve un IUsers[]
    const rows: IUsers[] = await new Promise((resolve, reject) => {
      SQL.all(UsersSQL.getAllUsers, (err, rows: IUsers[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    // 2) Una vez que tengo el array, lo envuelvo en el ResponseDto
    return new ResponseDto(
      true,
      "Lista de usuarios obtenida.",
      null,
      rows
    );
  } catch (error) {
    return new ResponseDto(
      false,
      "Error interno del servidor",
      "Hubo un error interno",
      error
    );
  }
};



//gestionar usuarios con privilegios de administrador
export const updateRol = async (email:string, rol:number) =>{
    try {
        const verifyEmailExist = await  VerifyByEmail(email) ;
        if(!verifyEmailExist){
            return new ResponseDto(false, 'el usuario no existe en el sistema', 'Revisar las credenciales', verifyEmailExist);
        }
        const updateRol = SQL.run(TypeUserSql.updateRol, [rol, email], (err:Error, row:any) => {
            if(err && !row){
                return new ResponseDto(false, "no se actulizó el rol del usuario "+email , 'Error al actualizar los datos', err ); 
            }else{
                return new ResponseDto(true, 'el usuario '+ email+ ' fue actualizado al rol '+rol, null, row) ;
            }
        })
    } catch (error) {
        return new ResponseDto(false, 'Error interno del servidor', 'hubo un error interno', error) ;
    }
}

//delete usuario 

export const DeleteUserforAdmin = async (email:string) => {
    try {
        const emailExit =await verifyEmailExist(email) ; 
        if(!email) {
            return new ResponseDto(false, 'el usuario no existe en el sistema', 'Revisar las credenciales', verifyEmailExist);
        }
        const deleteUser = await SQL.run(UsersSQL.deleteUserByEmail, [email], (err:Error, row: any) => {
            if(err && !row){
                return new ResponseDto(false, 'el usuario '+email+' no pudo se eliminado.', 'Error al eliminar los datos', err ); 
            }
            else{
                return new ResponseDto(true, 'el usuario '+email+' fue eliminado correctamente.', null, row) ;
            }
        })
    } catch (error) {
        return new ResponseDto(false, 'Error interno del servidor', 'hubo un error interno', error) ;
    }
}