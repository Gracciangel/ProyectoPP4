export const UsersSQL = {
  verifyByEmail: `SELECT * FROM USERS WHERE email = ?;`,

  verifByPassword: `SELECT * FROM USERS WHERE password = ?;`,

  insert: `INSERT INTO USERS (name, password, email, rol_id) VALUES (?, ?, ?, ?);`,

  updateRolUser: `UPDATE USERS SET rol = ? WHERE email = ?;`,

  deleteUserByEmail: `DELETE FROM USERS WHERE email = ?;`,

  getUserIdByMail: `SELECT id FROM USERS WHERE email = ?;`,

  sesionInit: `SELECT name, email, photoUrl, rol_id as rol FROM users ;`,

  selectPwdToHash: `SELECT password FROM USERS WHERE email = ? ; ` ,

  saveFavorite: `INSERT INTO FV (emailUser, title, pathPhoto) VALUES (?, ?, ?);`, 

  deleteFavorite: `DELETE FROM FV WHERE title = ? AND emailUser = ?;`,

  getFavorites: `SELECT f.title, f.pathPhoto FROM FV f JOIN USERS u ON f.emailUser = u.email where u.email = ? ;`, 
};

