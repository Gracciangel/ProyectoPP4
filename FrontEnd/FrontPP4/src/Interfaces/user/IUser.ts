export interface IUser {
    email: string ; 
    password: string; 
}
export interface IResponse {
    success:boolean; 
    msj:string ;
    error:string; 
    result:object[] ;
    
}
export interface IRegisterUser {
    name: string; 
    email:string; 
    password:string;
    rol_id:number
}
export interface IColorAvatar {
    color: string;
    codeColor: string;  
}

export const colorsAvatar: IColorAvatar[] = [
    { color: 'blue', codeColor: '#0000FF' },  
    { color: 'red', codeColor: '#FF0000' },
    { color: 'green', codeColor: '#008000' },
    { color: 'yellow', codeColor: '#FFFF00' },
    { color: 'purple', codeColor: '#800080' },
    { color: 'orange', codeColor: '#FFA500' },
    { color: 'pink', codeColor: '#FFC0CB' },
    { color: 'black', codeColor: '#000000' }
];