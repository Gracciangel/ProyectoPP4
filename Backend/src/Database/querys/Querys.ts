export const UsersSQL = {
    createTable: `CREATE TABLE IF NOT EXISTS users (
        ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,  -- Corrige la doble declaración NOT NULL
        rol TEXT NOT NULL
    );`,

    verifyByEmail: `SELECT * FROM USERS WHERE email = ?;`,

    insert: `INSERT INTO USERS (name, password, email, rol) VALUES (?, ?, ?, ?);`,

    updateRolUser: `UPDATE USERS SET rol = ? WHERE email = ?;`, 
    
    deleteUserByEmail: `DELETE FROM USERS WHERE email = ?;`  
};
