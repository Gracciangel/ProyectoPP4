import { Content } from "../Atmos/content/Content";
import '../../Styles/Home.css';


export const ContentHome = () => {


 
  return (
    <div className="home">
      <Content
        title="¡Bienvenido a Biblioteca Online PP4!"
        text="
         Sumérgete en un universo de conocimiento y entretenimiento sin salir de casa.
         Nuestra plataforma te ofrece
         acceso inmediato a miles de títulos, 
         desde clásicos de la literatura hasta novedades contemporáneas."
        size="lg"
        classStyle='Mint'
      />
    
    </div>
  );
};
