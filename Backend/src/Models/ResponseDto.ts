import { IUsers } from "./interfaces/IUsers";

export class ResponseDto {
    success: boolean; 
    msj?: string ;
    error: string | null;
    result: {}[] | null | unknown |IUsers[] ; 

constructor (suc:boolean, ms:string, err:string | null, res:{}[]| null | unknown | IUsers[]){
    this.success = suc , 
    this.msj = ms ,
    this.error = err, 
    this.result = res
}

}