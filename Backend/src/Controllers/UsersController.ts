import { Request, response, Response, Router } from "express";
import { CreateUsers } from "../Database/DAL/User";

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


routes.post('/registerUser', CreteUserController) ;

export default routes ;