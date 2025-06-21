import { IFavorites, IFavoritesList, IFavoritesResponse } from "../../Models/interfaces/IFavorites";
import { SQL } from "../Context";
import { UsersSQL } from "../Query/Querys";


//guardar un libro en favoritos

export const SaveInFavorites = async (email:string , titleBook:string, pathPhoto:string) :Promise<IFavoritesResponse> => {
  try {
   
    const  savebook = await new Promise((resolve, reject)=> {
      SQL.run(UsersSQL.saveFavorite, [email, titleBook, pathPhoto], (error:Error| null) => {
        if (error) {
          console.error('Error al guardar el libro en favoritos:', error.message);
          return reject(error);
        }
        resolve(true)
      })
    })
    return { success: true, message: `${titleBook} guardado en favoritos.` };
  } catch (error) {
    console.error('Error al guardar el libro en favoritos:', error);
    return { success: false, message: 'Error al guardar el libro en favoritos.' };
  }
}

//leer libros en favoritos
export const getFavoritesByUser = async (email: string): Promise<IFavoritesList[] | {sucess:boolean, msj:string}> => {
  try {
    const userId = await getUserIdByEmail(email);
    if (userId === null) {
      return { sucess: false, msj: 'Usuario no encontrado.' };
    }else{
      const favoritesList = await new Promise<IFavoritesList[]>((resolve, reject) => {
        SQL.all(UsersSQL.getFavorites, [userId], (error: Error | null, rows: IFavoritesList[]) => {
          if (error) {
            console.error('Error al obtener los favoritos:', error.message);
            return reject(error);
          } else {
            resolve(rows);
          }
        });
      });
      return favoritesList;
    }
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    return { sucess: false, msj: 'Error interno del servidor' };
  }
}

//eliminar un libro de favoritos
export const deleteFavorite = async (email:string): Promise<{succes:boolean, msj:string}> => {
  try {
    const userID = await getUserIdByEmail(email);
    if (userID === null) {
      return { succes: false, msj: 'Usuario no encontrado.' };
    }else {
      const deleteBook = await new Promise((resolve, reject) => {
        SQL.run(UsersSQL.deleteFavorite, [userID], (error:Error | null)=> {
          if(error){
            console.error('Error al eliminar el libro de favoritos:', error.message);
            return reject(error);
          }else{
            resolve({ succes: true, msj: 'Libro eliminado de favoritos.' });
          }
        })
      })
      return deleteBook as {succes: boolean, msj: string}; 
    }
  } catch (error) {
    return { succes: false, msj: 'Error interno en el servidor el libro no fue eliminado de favoritos.' };
  }
}




//metodos para obtencion de datos del usuario 

const getUserIdByEmail = async (email: string): Promise<number | null> => {
  try {
   const userID = await new Promise<number | null>((resolve, reject) => {
      SQL.get(UsersSQL.getUserIdByMail, [email], (err, row:number) => {
        if (err) {
          console.error('Error al obtener el ID del usuario:', err.message);
          return reject(err);
        }
        else {
            resolve( row ? row : null);
        }
      });
    });
    return userID;
  } 
  catch (error) {
    console.error('Error al obtener el ID del usuario:', error);
    return -1;
  }
}

