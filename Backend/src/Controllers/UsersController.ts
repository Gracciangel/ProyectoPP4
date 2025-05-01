import { Request, response, Response, Router } from "express";
import { CreateUsers } from "../Database/DAL/User";
import { GetBooks } from "../Helper/ApiBook";
const routes = Router() ; 

const CreteUserController = async (req: Request , res:Response) => {
    try {
        const InsertUser = await CreateUsers(req.body) ; 
        res.status(200).json({
            message:`${req.body['name']} agregado exitosamente` 
        })
    } catch (error) {
        console.log(`error en el servidor ${error}`);
        res.status(500).json({
        msj: error 
    });
    }
}

const GetBooksController = async (_req: Request, res: Response) => {
    try {
        const books = await GetBooks();
        res.status(200).json(books); 
    } catch (error) {
        console.log("Error en GetBooksController", error);
        res.status(500).json({ error: "Error al obtener los libros" });
    }
};


routes.post('/registerUser', CreteUserController) ;
routes.get('/books', GetBooksController)
export default routes ;