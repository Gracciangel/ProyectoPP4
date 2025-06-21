import type { ReactNode } from "react";

export interface IButtons{
    type: 'error' | 'success' ; 
    action: (() => void) | ((e: React.MouseEvent) => void); 
    label:string ;
    IconButton?:ReactNode;
    styleButton:{
        variant: 'solid' | 'outline';
        colorPalette:string;
    }
    size:'md'|'lg'|'sm';
    load?:{
        loading:boolean 
        isLoad: boolean
    }
    disabled?: boolean;
}