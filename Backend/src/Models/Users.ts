export class Users {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: 'admin' | 'user';      

    constructor(id: number, nombre: string, email: string, password: string, rol: 'admin' | 'user') {
        this.id = id;
        this.name = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}