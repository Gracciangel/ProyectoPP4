import { UsersSQL } from "../querys/Querys";
import { Users } from "../../Models/Users";
import { SQL } from "../Context";
import { CreateUserResponse, EmailResponse, TableResponse } from "../Types/Types";

// 1) Crear la tabla si no existe → devuelve { success, message }
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
        // en caso de error de DB, lo tratamos como “no existe” pero devolvemos mensaje
        if (err) {
          console.error('Error al verificar el email:', err.message);
          // devolvemos exist=false para no bloquear el flujo de inserción por un error de consulta
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
    // Nunca debería llegar aquí, pero en caso de excepción inesperada:
    return { exist: false, message: 'Error inesperado al verificar email' };
  }
};



// (Ya tienes CreateTableNotExist que devuelve TableResponse)

export const CreateUsers = async ({
  name,
  password,
  email,
  rol
}: Users): Promise<CreateUserResponse> => {
  // 1) Verificar / crear tabla
  const tableResp = await CreateTableNotExist();
  if (!tableResp.success) {
    // No seguimos: devolvemos el error de tabla
    return {
      success: false,
      message: tableResp.message
    };
  }

  // 2) Verificar email
  const emailResp = await verifyEmailExist(email);
  if (emailResp.exist) {
    // Email duplicado: devolvemos inmediatamente
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
