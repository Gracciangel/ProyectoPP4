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
export const GetAllFavorites = async (email: string): Promise<IFavoritesList[] | {success:boolean, message:string}> => {
   try {
    if (!email) {
      return { success: false, message: 'Usuario no encontrado.' };
    }
    const favoritesList = await new Promise<IFavoritesList[]>((resolve, reject) => {
      SQL.all(
        UsersSQL.getFavorites,    // por ejemplo: "SELECT title, photo as pathPhoto FROM favorites WHERE emailUser = ?"
        [email],
        (error: Error | null, rows: IFavoritesList[]) => {
          if (error) {
            console.error('Error al obtener los favoritos:', error.message);
            return reject(error);
          }
          resolve(rows);
        }
      );
    });
    return favoritesList;
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    return { success: false, message: 'Error interno del servidor' };
  }
}

//eliminar un libro de favoritos
export const deleteFavorite = async (email:string, title:string): Promise<{succes:boolean, msj:string}> => {
  try {
    if (email === null) {
      return { succes: false, msj: 'Usuario no encontrado.' };
    }else {
      const deleteBook = await new Promise((resolve, reject) => {
        SQL.run(UsersSQL.deleteFavorite, [title,email], (error:Error | null)=> {
          if(error){
            console.error('Error al eliminar el libro de favoritos:', error.message);
            return reject(error);
          }else{
            resolve({ succes: true, msj: title + ', borrado con éxito' });
          }
        })
      })
      return deleteBook as {succes: boolean, msj: string}; 
    }
  } catch (error) {
    return { succes: false, msj: 'Error interno en el servidor el libro no fue eliminado de favoritos.' };
  }
}



