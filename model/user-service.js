const pool = require("../config/mysql-config.js");

exports.getUsers = async (limit) => {
  try {
    if (limit) {
      const [rows] = await pool.query(
        `SELECT * FROM Users ORDER BY UserId DESC LIMIT  ${limit}`
      );
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(`SELECT * FROM Users where UserId = ${id}`);
    return row[0];
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = async (user) => {
  const { first_name, last_name, age, user_name, birth_date } = user;
  //this question marks are similar with C language => printf('%d %d', x,y)
  const [result] = await pool.query(
    `INSERT INTO Users VALUES (?, ?, ?, ?, ? ,?)`,
    [null, first_name, last_name, age, user_name, birth_date]
  );
  return result;
};
exports.updateUser = async (Userid, updatedData) => {
  console.log(updatedData);
  let [result] = "";
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE Users SET ${Object.keys(updatedData)[i]} = '${
        Object.values(updatedData)[i]
      }' WHERE UserId = ${Userid}`
    );
  }
  return result;
};
exports.deleteUser = async (UserId) => {
  const [result] = await pool.query(
    `DELETE FROM Users WHERE UserId= ${UserId}`
  );
  return result;
};
