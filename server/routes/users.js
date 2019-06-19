const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// GET all Users
router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An User
router.get("/:iduser", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM users WHERE iduser = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

// DELETE An User
router.delete("/:iduser", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM Usere WHERE iduser = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "User Deleted" });
      } else {
        console.log(err);
      }
    }
  );
});

// INSERT A User
router.post("/", (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  const query = `
    SET @name = ?;
    SET @email = ?;
    CALL UserAddOrEdit(@name, @email);
  `;
  mysqlConnection.query(query, [name, email], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "User Saved" });
    } else {
      console.log(err);
    }
  });
});

router.put("/:id", (req, res) => {
  const { name, email } = req.body;
  const query = `
    SET @name = ?;
    SET @email = ?;
    CALL UserAddOrEdit(@name, @email);
  `;
  mysqlConnection.query(query, [name, email], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "User Updated" });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
