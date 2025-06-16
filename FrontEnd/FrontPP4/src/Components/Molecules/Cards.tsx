import { useEffect, useState } from "react";
import type { IBook } from "../../Interfaces/book/IBook";
import { getBooks } from "../../Helpers/Books";
import '../../Styles/Card.css'
import { SpinnerCustom } from "../spinner/Spinner";
import { Card } from "../Atmos/card/Card";

export const Cards = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false) ;
  useEffect(() => {
    (async () => {
      try {
        setLoad(true)
        const lst = await getBooks();
        if(lst){
            setBooks(lst);
            setLoad(false)
        }
      } catch (e) {
        console.error(e);
        setError("Error al cargar los libros");
      }finally{
        setLoad(false)
      }
    })();
  }, []);



  return (
    <div className="cards-grid">
      {
        error && (
          <p>{error}</p>
        )
      }
        {
            load && (
                <SpinnerCustom size='lg' label="Cargando Libros..."/>
            )
        }
      {books.map((b, i) => {
        const coverUrl = b.formats["image/jpeg"] ?? "";
        return (
       <div key={i}>
         <Card title={b.title} port={coverUrl} languages={b.languages} 
         download={b.formats['application/octet-stream']}/>
       </div>
        );
      })}
    </div>
  );
};
