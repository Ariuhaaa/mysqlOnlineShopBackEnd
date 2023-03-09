const port = 6600;
const express = require("express");
const cors = require("cors");
const app = express();

const employeeRouter = require("./routes/employee.routes");

app.use(cors());
app.use(express.json());

app.use("/api", employeeRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome Rest API" });
});

app.listen(port, () => console.log("server is running on " + port));
