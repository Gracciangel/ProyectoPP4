export class Users {
    id: number;
    name: string;
    email: string;
    password: string;
    rol_id: 1 | 2 ;      

    constructor(id: number, nombre: string, email: string, password: string, rol: 1|2) {
        this.id = id;
        this.name = nombre;
        this.email = email;
        this.password = password;
        this.rol_id = rol;
    }
}