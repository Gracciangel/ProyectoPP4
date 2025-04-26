export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: 'admin' | 'user';      

    constructor(id: number, nombre: string, apellido: string, email: string, password: string, rol: 'admin' | 'user') {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}