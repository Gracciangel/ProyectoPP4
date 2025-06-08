import { useState } from 'react';
import '../../../Styles/Card.css';
import { Modal } from '../../Molecules/Modal';

interface ICardProps {
  title: string;
  port: string;
  languages: string[];
  download?: string;  // URL del ZIP
}

export const Card = ({ title, port, languages, download }: ICardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(f => !f);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // sólo abre el modal
    setModalOpen(true);
  };

  const handleAccept = () => {
    if (download) {
      // crea un enlace invisible y dispara la descarga
      const link = document.createElement('a');
      link.href = download;
      link.download = `${title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <Modal
          close={() => setModalOpen(false)}
          acept={handleAccept}
          title={`¿Descargar ${title}?`}
          msj="Se descargará un recurso en formato .zip"
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

          {/* Lado trasero */}
          <div className="card-face card-back">
            <img src={port} alt={`Portada de ${title}`} />
            <h3>{title}</h3>
            <ul className="book-languages">
              {languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
            <button
              className="book-download"
              onClick={handleDownloadClick}
            >
              Descargar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
