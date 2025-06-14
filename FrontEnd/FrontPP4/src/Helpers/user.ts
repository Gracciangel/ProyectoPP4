import type { IRegisterUser, IResponse, IUser } from "../Interfaces/user/IUser";

export const authUser = async (regsiter: boolean, user?: IUser, registerValue?:IRegisterUser): Promise<IResponse> => {
    const url = `http://localhost:3000/api/${regsiter ? 'registerUser': 'initSesion'}` ;
    console.log(url)
    const userLogin = JSON.stringify(user); 
    const userRegister= JSON.stringify(registerValue) ;
    try {
        const response = await fetch(url, {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: regsiter ? userRegister : userLogin
        })
        return await response.json(); 

    } catch (error) {
        console.log(error)
        return {
            success: false,
            msj: "Error en la autenticación",
            error: error,
            result: null
        } as unknown as IResponse;
    }
}
