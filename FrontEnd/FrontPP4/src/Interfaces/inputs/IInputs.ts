export interface IInputs{
    type: 'text' | 'password' | 'number' | 'date'| 'file'; 
    placeholder: string ; 
    typeSize: 'md' | 'lg' | 'sm' ;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void ;
    focus?:boolean ;
    showText?: boolean ;
    required:boolean ;
}