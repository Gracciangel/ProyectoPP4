export const UsersSQL = {


  verifyByEmail: `SELECT * FROM USERS WHERE email = ?;`,

  verifByPassword: `SELECT * FROM USERS WHERE password = ?;`,

  insert: `INSERT INTO USERS (name, password, email, rol_id) VALUES (?, ?, ?, ?);`,

  updateRolUser: `UPDATE USERS SET rol = ? WHERE email = ?;`,

  deleteUserByEmail: `DELETE FROM USERS WHERE email = ?;`,

  sesionInit: `SELECT name, email, photoUrl, rol_id as rol FROM users ;`,
};

