const express = require("express");
const employee = require("../model/emp-service.js");

const Router = express.Router();

Router.get("/employee", async (req, res) => {
  const { query } = req;
  const result = await employee.getEmployee(query.emp_no);
  res.status(200).send(result);
});

Router.get("/employees", async (req, res) => {
  const { query } = req;
  const result = await employee.getEmployees(query.limit);
  res.status(200).send(result);
});

Router.put("/employee", async (req, res) => {
  const { query, body } = req;
  const result = await employee.updateEmployee(query.emp_no, body);
  res.status(200).send(result);
});

Router.delete("/employee", async (req, res) => {
  const { query } = req;
  const result = await employee.deleteEmployee(query.emp_no);
  res.status(200).send(result);
});

Router.post("/employee", async (req, res) => {
  const { body } = req;
  const getLast = await employee.getEmployees();
  const { birth_date, first_name, last_name, gender, hire_date } = body;
  const result = await employee.createEmployee(
    getLast.emp_no + 1,
    birth_date,
    first_name,
    last_name,
    gender,
    hire_date
  );
  res.status(200).send(result);
});

module.exports = Router;
