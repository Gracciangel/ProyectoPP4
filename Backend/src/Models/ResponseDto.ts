export class ResponseDto {
    success: boolean; 
    msj?: string ;
    error: string | null;
    result: {}[] | null  ; 

constructor (suc:boolean, ms:string, err:string | null, res:{}[]| null){
    this.success = suc , 
    this.msj = ms ,
    this.error = err, 
    this.result = res
}

}