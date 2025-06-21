import { useState } from 'react';
import '../../../Styles/Card.css';
import { Modal } from '../../Molecules/Modal';
import { FaDownload } from 'react-icons/fa';
import { ButtonCustom } from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi2';
import { saveInFavorites } from '../../../Helpers/Books'; 

interface ICardProps {
  title: string;
  port: string;
  languages: string[];
  download?: string;  
}

export const Card = ({ title, port, languages, download }: ICardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [NotSaveFavorite, setNotSaveFavorite] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(f => !f);
  };


 const handleSaveFavorite = async () => {
  
  const user = localStorage.getItem('user');
  if (!user) {  
    setModalOpen(true);
    setNotSaveFavorite(true);
  }
  else {
    
    const userData = JSON.parse(user)[0];
    console.log('Usuario autenticado:', userData);
    
    const favoriteBook = {
      email:    userData.email,
      titleBook: title,
      pathPhoto: port,
    };
    
    const saveBook = await saveInFavorites(
      favoriteBook.email,
      favoriteBook.titleBook,
      favoriteBook.pathPhoto
  );
  
  if (saveBook.success) {
    console.log('Libro guardado en favoritos:', favoriteBook);
  } else {
    console.log(
      'Error al guardar en favoritos:',
      saveBook.message
    );
  }
}
  
};

  const handleDownloadClick = (e: React.MouseEvent) => {
    const user = localStorage.getItem('user'); 
    setModalOpen(true);
    if(user){
      e.stopPropagation();
      setUserActive(true);
      
    }else{
      e.stopPropagation();
      setUserActive(false) ;
    }
  };

  const handleAccept = () => {
    if (download && userActive) {
      
      const link = document.createElement('a');
      link.href = download;
      link.download = `${title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else if (!NotSaveFavorite && userActive) {
      setModalOpen(false);
      handleSaveFavorite() ;
    }
    else{
      navigate('/login'); 
      setModalOpen(false);

    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          close={() => setModalOpen(false)}
          acept={handleAccept}
          title={`${userActive ? `¿Deseas d escargar ${title}?` : 'Inicia sesión para descargar el libro'}`}
          msj={`${userActive ? 'Se descargará el libro '+title+ ' en formato zip': 'Inicia sesión para descargar el libro '}`}
        />
      )}
      {NotSaveFavorite && modalOpen && (
        <Modal
          close={() => setModalOpen(false)}
          acept={handleAccept}
          title="Inicia sesión"
          msj="Para guardar un libro en favoritos debes iniciar sesión."
        />
      )}

      <div
      
        className={`card-container${flipped ? ' flipped' : ''}`}
        onClick={handleToggle}
      >
        <div className="card-inner">
          {/* Lado frontal */}
          <div className="card-face card-front">
            <img src={port} alt={`Portada de ${title}`} />
            <h3>{title}</h3>
          </div>

          <div className="card-face card-back">
            <img src={port} alt={`Portada de ${title}`} />
            <h3>{title}</h3>
            <ul className="book-languages">
              {languages.map((lang, i) => (
               <div className='containerLanguages' key={i} >
                <p>Lenguaje disponible</p>
                 <li>{lang}</li>
               </div>
              ))}
            </ul>

            <div className='buttonsCard'>
                <ButtonCustom label='Favorito' action={ handleSaveFavorite} 
              IconButton={<HiHeart/>} size='md' type='success'
              styleButton={{
                variant: 'outline',
                colorPalette: 'red',
              }}
              />
                <ButtonCustom label='Descargar' action={ handleDownloadClick} 
              IconButton={<FaDownload/>} size='md' type='success'
              styleButton={{
                variant: 'outline',
                colorPalette: 'green',
              }}
              
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
