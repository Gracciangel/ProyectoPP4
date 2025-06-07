export interface IInputs{
    type: 'text' | 'password' | 'number' | 'date'| 'file'; 
    placeholder: string ; 
    typeSize: 'md' | 'lg' | 'sm' ;
    retunrValue?: (e: React.ChangeEvent<HTMLInputElement>) => void ;
    focus?:boolean
}