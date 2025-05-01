import { SQL } from "../Database/Context";
import { UsersSQL } from "../Database/querys/Querys";
import { emailRegex, EmailResponse, PasswordResponse } from "../Database/Types/Types"


//verificar el email 
export const VerifyByEmail = async (email: string): Promise<EmailResponse> => {
    try {
      const regexEmail = emailRegex.test(email); 
      if (regexEmail) {
        const resultEmail = await new Promise<EmailResponse>((resolve, reject) => {
          SQL.get(UsersSQL.verifyByEmail, [email], (err, row) => {
            if (err || !row) {
              return resolve({
                exist: false,
                message: 'El email no se encuentra registrado'
              });
            } else {
              return resolve({
                exist: true,
                message: email
              });
            }
          });
        });
        return resultEmail; 
      } else {
        return {
          exist: false,
          message: `El email ${email} no cumple con los requerimientos`
        };
      }
    } catch (error) {
      console.log(error);
      return {
        exist: false,
        message: 'Error en la validación de email'
      };
    }
  };
  


// verifciar el passoword 
export const VerifyByPassword = async (password: string): Promise<PasswordResponse> => {
    try {
      const responsePassword = await new Promise<PasswordResponse>((resolve, reject) => {
        SQL.get(UsersSQL.verifByPassword, [password], (err, row) => {
          if (err || !row) {
            return resolve({
              succes: false,
              message: 'Contraseña incorrecta'
            });
          } else {
            return resolve({
              succes: true,
              message: ''
            });
          }
        });
      });
      return responsePassword;
    } catch (error) {
      console.log(error);
      return {
        succes: false,
        message: 'Error en la validación de la contraseña'
      };
    }
  };
  