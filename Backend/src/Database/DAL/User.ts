import { UsersSQL } from "../querys/Querys";
import { Users } from "../../Models/Users";
import { SQL } from "../Context";
import { CreateUserResponse, emailRegex, EmailResponse, TableResponse } from "../Types/Types";
import { ResponseDto } from "../../Models/ResponseDto";
import { VerifyByEmail, VerifyByPassword } from "../../Helper/VerificarDatauser";




const CreateTableNotExist = async (): Promise<TableResponse> => {
  return new Promise(resolve => {
    SQL.run(UsersSQL.createTable, (err: Error | null) => {
      if (err) {
        console.error('Error al crear la tabla usuarios:', err.message);
        resolve({ success: false, message: `Error al crear la tabla usuarios: ${err.message}` });
      } else {
        resolve({ success: true, message: 'Tabla de usuarios verificada/creada correctamente' });
      }
    });
  });
};


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
  rol
}: Users): Promise<CreateUserResponse> => {
  
  const tableResp = await CreateTableNotExist();
  if (!tableResp.success) {
    
    return {
      success: false,
      message: tableResp.message
    };
  }

  // 2) Verificar email
  const emailResp = await verifyEmailExist(email);
  if (emailResp.exist) {
    
    return {
      success: false,
      message: emailResp.message
    };
  }

  // 3) Insertar usuario
  const insertResp: CreateUserResponse = await new Promise(resolve => {
    SQL.run(
      UsersSQL.insert,
      [name, password, email, rol],
      (err: Error | null) => {
        if (err) {
          console.error('Error al crear el usuario:', err.message);
          return resolve({
            success: false,
            message: `Error al crear el usuario: ${err.message}`
          });
        }
        resolve({
          success: true,
          message: `El usuario ${name} fue agregado exitosamente`
        });
      }
    );
  });

  return insertResp;
};


export const SesionInit = async (email: string, password: string) => {
  try {
    const verifyEmail = await VerifyByEmail(email);
    const verifyPass = await VerifyByPassword(password); 

    if (verifyEmail.exist && verifyPass.succes) {
      const userData = await new Promise<ResponseDto>((resolve, _reject) => {
        SQL.get(UsersSQL.sesionInit,  (err, row: Users | undefined) => {
          if (err || !row) {
            resolve(new ResponseDto(false, 'Credenciales inválidas', err?.message ?? null, null));
          } else {
            resolve(new ResponseDto(true, `Te damos la bienvenida ${row.name}`, null, [row]));
          }
        });
      });
      return userData;
    } else {
      return new ResponseDto(false, 'Error al iniciar sesión', verifyEmail.message || verifyPass.message, null);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
