import { useState } from 'react';
import '../../../Styles/Card.css';
import { Modal } from '../../Molecules/Modal';
import { FaDownload } from 'react-icons/fa';
import { ButtonCustom } from '../buttons/Button';
import { useNavigate } from 'react-router-dom';

interface ICardProps {
  title: string;
  port: string;
  languages: string[];
  download?: string;  // URL del ZIP
}

export const Card = ({ title, port, languages, download }: ICardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(f => !f);
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
      // crea un enlace invisible y dispara la descarga
      const link = document.createElement('a');
      link.href = download;
      link.download = `${title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }else{
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
    </>
  );
};
