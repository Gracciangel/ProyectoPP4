import { UsersSQL } from "../Query/Querys";
import { Users } from "../../Models/Users";
import { SQL } from "../Context";
import { CreateUserResponse, emailRegex, EmailResponse, pwdRegex, TableResponse } from "../Types/Types";
import { ResponseDto } from "../../Models/ResponseDto";
import { VerifyByEmail, VerifyByPassword } from "../../Helper/VerificarDatauser";
import { promisify } from 'util';
import { hashCompare, hashPassword } from "../../Helper/Hashing/Bcrypt";

// Define getAsync as a promisified version of SQL.get
const getAsync = promisify(SQL.get.bind(SQL));



export const verifyEmailExist = async (email: string): Promise<EmailResponse> => {
  try {
    const row = await new Promise<any>((resolve, _reject) => {
      SQL.get(UsersSQL.verifyByEmail, [email], (err, row) => {
        
        if (err) {
          console.error('Error al verificar el email:', err.message);
          
          return resolve({ error: true, row: null });
        }
        resolve({ error: false, row });
      });
    });

    if (row.error) {
      return {
        exist: false,
        message: `Error al verificar el email: consulta fallida`
      };
    }

    if (row.row) {
      return {
        exist: true,
        message: `Ya existe un usuario con el email: ${email}`
      };
    }

    return { exist: false, message: '' };
  } catch {
    
    return { exist: false, message: 'Error inesperado al verificar email' };
  }
};


export const CreateUsers = async ({
  name,
  password,
  email,
  rol_id
}: Users): Promise<CreateUserResponse> => {1
  
  //controles del formulario de registro
if(!name || name === ''){
  return{
    success: false, 
    message: 'Es necesario ingresar un nombre de usuario'
  }
}
if(!emailRegex.test(email)){
  return {
    success: false,
    message:`el email ${email} no cumple con los requerimientos permitidos. Por favor revisa que esté escrito correctamente.`
  }
}

  const emailResp = await verifyEmailExist(email);
  if (emailResp.exist) {
    
    return {
      success: false, 
      message: emailResp.message
    };
  }
//controles de la contraseña 
if(!pwdRegex.test(password)){
  return {
    success: false, 
    message: 'La contraseña debe contener al menos 8 caracteres una mayúscula y un número, por vafor inténtalo nuevamente'
  }
}

  // 3) Insertar usuario
  //hasheo de password 
  const pwdHash = await hashPassword(password) ;
  const insertResp: CreateUserResponse = await new Promise(resolve => {

    SQL.run(
      UsersSQL.insert,
      [name, pwdHash, email, rol_id],
      (err: Error | null) => {
        if (err) {
          
          console.error('Error al crear el usuario:', err.message);
          return resolve({
            success: false,
            message: `Error al crear el usuario: ${err.message}`
          });
        }else{
          resolve({
            success: true,
            message: `El usuario ${name} fue agregado exitosamente`
          });

        }
      }
    );
  });

  return insertResp;
};


export const SesionInit = async (email: string, password: string) => {
  try {
    const verifyEmail = await VerifyByEmail(email);
    const verifyPass = await hashCompare(email , password) ;  

    if (verifyEmail.exist && verifyPass) {
      const userData = await new Promise<ResponseDto>((resolve, _reject) => {
        SQL.get(UsersSQL.sesionInit, [email], (err, row: Users | undefined) => {
          if (err || !row) {
            resolve(new ResponseDto(false, 'Credenciales inválidas', err?.message ?? null, null));
          } else {
            resolve(new ResponseDto(true, `Te damos la bienvenida ${row.name}`, null, [row]));
          }
        });
      });
      return userData;
    } else {
      if(!verifyEmail.exist){
        return new ResponseDto(false, 'Error al iniciar sesión', `El email ${email} no está registrado`, null);
        
      }
      else if(!verifyPass){

        return new ResponseDto(false, 'Error al iniciar sesión', `la constraseña proporcionada es inválda`, null);
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//actualizacion de password

export const updatePassword = async (email:string, password:string, newPassword:string, newPassword2:string) => {
  try {
    const verifiyBetweenPasswords = newPassword === newPassword2 ;
    if(!verifiyBetweenPasswords){
      return new ResponseDto(false, 'las contraseñas no coinciden', 'Error, verificar los valores enviados', null) ;
    };
    const verifByPassword = await VerifyByPassword(newPassword) ; 
    if(!verifByPassword){
      return new ResponseDto(false , 'error al verificar la contrseña', 'error', verifByPassword ) ;
    }
   const emailExit = await verifyEmailExist(email) ;
   const oldPassword = await hashCompare(email, password) ;
  if(oldPassword && emailExit){
    const pwdHashed = await hashPassword(newPassword) ;
    const update = await new Promise<ResponseDto>((resolve, _reject)=> {
     SQL.run(UsersSQL.updatePassword, [pwdHashed, email], (err:Error, row: any) => {
      if(err && !row){
        return new ResponseDto(false, 'error', 'el pasword no pudo ser actualizado.', null)
      }else{
        return new ResponseDto(true, 'OK', 'el pasword fue Actiualizado correctamente.', null)
      }
     })
    })

  }
  } catch (error) {
    return new ResponseDto(false, 'Error en el servidor', 'error 500', error) ;
  }
}