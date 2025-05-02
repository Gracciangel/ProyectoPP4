import { Request, response, Response, Router } from "express";
import { CreateUsers, SesionInit } from "../Database/DAL/User";
import { GetBooks } from "../Helper/ApiBook";
import { ResponseDto } from "../Models/ResponseDto";
const routes = Router() ; 

const CreteUserController = async (req: Request , res:Response) => {
    try {
        const InsertUser = await CreateUsers(req.body) ; 
        if(InsertUser.success ){
            res.status(200).json({
                result: new ResponseDto(false, `${req.body['name']} agregado correctamente`, InsertUser.message , [req.body])
            })
        }else{
            res.status(200).json({
                
                result: new ResponseDto(false, `${req.body['name']} no pudo ser agregado`, InsertUser.message, null)
            })
        }

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

const SesionInitController = async (req:Request , res:Response) => {
    try {
        const response = await SesionInit(req.body['email'], req.body['password']);
        res.status(200).json(response) ;
    } catch (err) {
        res.status(500).json({
            error: err ,
            msj: "error en el servidor"
        })
    }
}


routes.post('/registerUser', CreteUserController) ;
routes.get('/books', GetBooksController) ;
routes.get('/initSesion', SesionInitController)

export default routes ;