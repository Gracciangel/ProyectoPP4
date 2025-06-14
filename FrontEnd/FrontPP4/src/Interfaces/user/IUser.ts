export interface IUser {
    email: string ; 
    password: string; 
}
export interface IResponse {
    success:boolean; 
    msj:string ;
    error:string; 
    result:{}[] ;
    
}
export interface IRegisterUser {
    name: string; 
    email:string; 
    password:string;
    rol_id:number
}