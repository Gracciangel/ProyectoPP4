import { Request, RequestHandler, response, Response, Router } from "express";
import { CreateUsers, SesionInit, updatePassword } from "../Database/DAL/User";
import { GetBooks } from "../Helper/ApiBook";
import { ResponseDto } from "../Models/ResponseDto";
import { deleteFavorite, GetAllFavorites, SaveInFavorites } from "../Database/DAL/BooksFV";
import { json } from "stream/consumers";
import { userList } from "../Database/DAL/Admin";
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

// Controlador
const GetFavoritesByUser :any = async (req: Request, res: Response) => {
  try {
   const response = await GetAllFavorites(req.body['email']);
    if (Array.isArray(response)) {
      return res.status(200).json({
        success: true,
        message: 'Favoritos obtenidos correctamente',
        favorites: response,
      });
    }
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los favoritos',
      error,
    });
  }
};
//eliminar de favoritos
const DeleteFavoriteItem:any = async (req: Request, res: Response) => {
  try {
    const responseDelete = await deleteFavorite(req.body["email"],req.body['title']);
    return res.status(200).json(responseDelete);
  } catch (error) {
    return res.status(500).json({
      succes: false,
      msj: 'Error interno al eliminar el libro',
      error
    });
  }
};


//update passowrd 

const updatePasswordController:any = async (req:Request, res:Response) => {
  try {
    const passwordUpdated = await updatePassword(req.body['email'], req.body['password'], req.body['newPassword'], req.body['newPassword2']) ;
    return res.status(200).json(passwordUpdated); 

  } catch (error) {
    return res.status(500).json({
      succes: false, 
      msj: 'Error interno del servidor',
      err: error 
    })
  }
}

//administrador



export const getUsersController:any = async (req: Request, res: Response) => {
  try {
    const listUsers = await userList();

    // ✅ Validamos el éxito del DTO y que `result` sea un arreglo
    if (listUsers.success && Array.isArray(listUsers.result)) {
      return res.status(200).json({
        success: true,
        msj: 'Usuarios obtenidos',
        data: listUsers.result
      });
    } else {
      return res.status(404).json({
        success: false,
        msj: 'No se pudieron obtener usuarios',
        error: listUsers.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msj: 'Error interno del servidor',
      err: error
    });
  }
};

routes.post('/initSesion', SesionInitController)
routes.post('/registerUser', CreteUserController) ;
routes.get('/books', GetBooksController) ;
//routes favorites 
routes.post('/favorites', SaveFavoritesByUser) ; 
routes.post('/get/myfavorites', GetFavoritesByUser);
routes.delete('/delete/favorite', DeleteFavoriteItem)

//utilidades usuario
//actulizar roles de usuario
routes.post('/updatePasword', updatePasswordController)
//obtener todos los usuarios
routes.get('/allUsers', getUsersController)
export default routes ;