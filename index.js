require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4545;
const pool = require("./src/connection/config");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/getPatient", (request, response) => {
  pool.query("SELECT * FROM patientsRecords", (error, result) => {
    if (error) throw error;

    response.send(result);
  });
});

app.post("/registerPatient", (request, response) => {
  pool.query(
    "INSERT INTO patientsRecords SET ?",
    request.body,
    (error, result) => {
      if (error) throw error;

      response.status(201).send(`Patient added with ID: ${result.insertId}`);
    }
  );
});

app.put("/updatePatient/:id", (request, response) => {
  const id = request.params.id;

  pool.query(
    "UPDATE patientsRecords SET ? WHERE id = ?",
    [request.body, id],
    (error, result) => {
      if (error) throw error;

      response.send("User updated successfully.");
    }
  );
});

app.delete("/deletePatient/:id", (request, response) => {
  const id = request.params.id;

  pool.query(
    "DELETE FROM patientsRecords WHERE id = ?",
    id,
    (error, result) => {
      if (error) throw error;

      response.send("User deleted.");
    }
  );
});

app.listen(port, () => {
  console.log("listening at port 3000.....");
});
