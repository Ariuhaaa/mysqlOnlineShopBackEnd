const mysql = require("mysql2");

const pool = require("../config/mysql-config");

// simple query
// pool.query(
//   "SELECT * FROM `employees` limit 10",
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// console.log(promisePool.promisePool);
exports.getEmployees = async (limit) => {
  if (limit) {
    // const [rows] = await pool.query(
    //   `SELECT emp_no FROM employees limit ${limit}`
    // );

    const [rows] = await pool.query(
      `SELECT emp_no FROM employees limit ${limit}`
    );

    return rows;
  } else {
    const [rows] = await pool.query(
      `SELECT emp_no FROM employees ORDER BY emp_no DESC LIMIT 1`
    );
    return rows[0];
  }
};
exports.getEmployee = async (id) => {
  const [row] = await pool.query(`SELECT * FROM employees where emp_no=${id}`);
  return row[0];
};
exports.createEmployee = async (
  emp_no,
  birth_date,
  first_name,
  last_name,
  gender,
  hire_date
) => {
  //this question marks are similar with C language => printf('%d %d', x,y)
  const [result] = await pool.query(
    `INSERT INTO employees VALUES (?, ?, ?, ?, ?, ?)`,
    [emp_no, birth_date, first_name, last_name, gender, hire_date]
  );
  return result;
};
exports.updateEmployee = async (emp_no, updatedData) => {
  let [result] = "";
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE employees SET ${Object.keys(updatedData)[i]} ='${
        Object.values(updatedData)[i]
      }'  WHERE emp_no = ${emp_no}`
    );
  }
  return result;
};
exports.deleteEmployee = async (emp_no) => {
  const [result] = await pool.query(
    `DELETE FROM employees WHERE emp_no='${emp_no}';`
  );
  return result;
};
