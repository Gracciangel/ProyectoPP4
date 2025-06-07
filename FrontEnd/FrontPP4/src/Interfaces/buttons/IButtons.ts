export interface IButtons{
    type: 'error' | 'success' ; 
    action: () => void; 
    label:string ;
    size:'md'|'lg'|'sm'
}