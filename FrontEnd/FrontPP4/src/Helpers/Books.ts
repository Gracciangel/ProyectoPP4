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
