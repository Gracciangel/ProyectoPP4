import { Content } from "../Atmos/content/Content";
import '../../Styles/Home.css';
import { Cards } from "./Cards";

export const ContentHome = () => {


 
  return (
    <div className="home">
      <Content
        text="
         Sumérgete en un universo de conocimiento y entretenimiento sin salir de casa.
         Nuestra plataforma te ofrece
         acceso inmediato a miles de títulos, 
         desde clásicos de la literatura hasta novedades contemporáneas."
        title="¡Bienvenido a Biblioteca Online PP4!"
        size="lg"
        classStyle='Mint'
      />
      <Cards/>
    </div>
  );
};
