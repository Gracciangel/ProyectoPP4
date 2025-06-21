import type { IBook } from "../Interfaces/book/IBook";

const apiUrl = 'http://localhost:3000/api'; // --> migrar a una variable de entorno 


export const getBooks = async (): Promise<IBook[]> => {
  const res = await fetch(`${apiUrl}/books`);
 
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  // console.log(await res.json())
  return res.json();
};

//favorites
export const saveInFavorites = async (email: string, titleBook: string, pathPhoto: string): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${apiUrl}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, titleBook, pathPhoto }),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

//leer libros en favoritos
export const getFavoritesByUser = async (email: string) => {

  
  const res = await fetch(`${apiUrl}/get/myfavorites`, {
    method: 'POST',
       headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

//quitar libro de favoritos 
export const deleteBook = async (title:string, email:string)=> {
  try {
    const response = await fetch(`${apiUrl}/delete/favorite`,{
      method:'DELETE',
      headers:{
          'Content-Type': 'application/json'
      },
       body: JSON.stringify({title, email }),
    })
    return response.json()
  } catch (error) {
    return error
  }
}