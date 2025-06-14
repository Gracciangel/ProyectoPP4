import bcrypt from 'bcrypt'; 
import { SQL } from '../../Database/Context';
import { UsersSQL } from '../../Database/Query/Querys';

const SALT_ROUNDS = 10 ; 

export const hashPassword = async (plainPwd: string ): Promise<string>  => {
    const hash = await bcrypt.hash(plainPwd, SALT_ROUNDS) ;
    return hash ; 
} ;


export const hashCompare = async (email: string, pwd: string): Promise<boolean> => {
  try {
    
    const hashPass: string = await new Promise((resolve, reject) => {
      SQL.get(
        UsersSQL.selectPwdToHash,      
        [email],                       
        (err, row: { password: string } | undefined) => {
          if (err) return reject(err);
          if (!row) return resolve(''); 
          resolve(row.password);
        }
      );
    });

    if (!hashPass) {
      return false;
    }

    return await bcrypt.compare(pwd, hashPass);
  } catch (error) {
    console.error('Error en hashCompare:', error);
    return false;
  }
};