import { Request, response, Response, Router } from "express";
import { CreateUsers, SesionInit } from "../Database/DAL/User";
import { GetBooks } from "../Helper/ApiBook";
import { ResponseDto } from "../Models/ResponseDto";
import { SaveInFavorites } from "../Database/DAL/BooksFV";
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
        const result = books.results; 
        res.status(200).json(result); 
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


//favorites

const SaveFavoritesByUser = async (req:Request, res:Response)=> {
    try {
        const response = await SaveInFavorites(req.body['email'], req.body['titleBook'], req.body['pathPhoto']);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar el libro en favoritos",
            error: error,   
    })
}
}

routes.post('/initSesion', SesionInitController)
routes.post('/registerUser', CreteUserController) ;
routes.get('/books', GetBooksController) ;
//routes favorites 
routes.post('/get/favorites', SaveFavoritesByUser) ; 


export default routes ;