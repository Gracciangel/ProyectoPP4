import type { ReactNode } from "react";

export interface IButtons{
    type: 'error' | 'success' ; 
    action: (() => void) | ((e: React.MouseEvent) => void); 
    label:string ;
    styleButton?:ReactNode;
    size:'md'|'lg'|'sm';
    load?:{
        loading:boolean 
        isLoad: boolean
    }
}