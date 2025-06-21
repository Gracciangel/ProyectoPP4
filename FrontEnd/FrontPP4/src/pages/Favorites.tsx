import { useEffect, useState } from 'react';
import '../Styles/Favorites.css';
import { List, ListIndicator } from '@chakra-ui/react';
import { deleteBook, getFavoritesByUser } from '../Helpers/Books';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Content } from '../Components/Atmos/content/Content';
import { SpinnerCustom } from '../Components/spinner/Spinner';
type FavoriteBook = {
  pathPhoto: string;
  title: string;
};

export const Favorites = () => {
  const [favoritos, setFavoritos] = useState<FavoriteBook[]>([]);
  const [userValue , setUserValue] = useState<{email:string, name:string}>() ;
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [laoding, setLoading] = useState<boolean>(false);

  useEffect(() => {
  const user = localStorage.getItem('user');
  if (user) {
    setUserValue(JSON.parse(user)[0]);
  }
}, []);

const handleDelete = async (title: string) => {
  if (!userValue?.email) return;
  setLoading(true);
  try {
    const response = await deleteBook(title, userValue.email);
    if (response) {
      setDeleteItem(true);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);  // Siempre ocultamos el spinner al final
  }
};
useEffect(() => {
  const fetchFavorites = async () => {
    if (userValue?.email) {
      const favorties = await getFavoritesByUser(userValue.email);
      if (favorties.success) {
        const fav: FavoriteBook[] = favorties.favorites.map((book: any) => ({
          title: book.title,
          pathPhoto: book.pathPhoto,
        }));
        const filtered = fav.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b.title === book.title)
        );
        setFavoritos(filtered);
        setDeleteItem(false); 
      } else {
        console.error(favorties.message);
      }
    }
  };

  fetchFavorites();
}, [userValue, deleteItem]);

  
  

  return (
    <div className="table-container">
        {
            favoritos.length < 1 && (
                <Content
                size='lg'
                title='No hay Favoritos para mostrar'
                text='Puedes agregar favoritos en el apartado de libros'
                />
            )
        }
       <List.Root gap="4" variant="plain" >
        {
            favoritos.map((book) => (
                <List.Item key={book.title} className="list-item"  >
                   <ListIndicator asChild color={'red.500'} cursor={'pointer'} style={{width: '20px', height: '20px'}}>
                    <RiDeleteBin6Line className="check-icon" onClick={()=>handleDelete(book.title)} />
                   </ListIndicator>
                   {book.title}
                </List.Item>
            ))
        }
    </List.Root>
    {
        laoding && (
            <SpinnerCustom/>
        )
    }
    </div>
  );
};
