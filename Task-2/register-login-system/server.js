const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/register", async (req, res) => {

  const { fullName, email, mobile, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(full_name,email,mobile,password) VALUES (?,?,?,?)";

    db.query(
      sql,
      [fullName, email, mobile, hashedPassword],
      (err, result) => {

        if (err) {
          return res.status(400).json({
            message: "User already exists"
          });
        }

        res.json({
          message: "Registration Successful"
        });
      }
    );

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});


app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (result.length === 0) {

      return res.status(400).json({
        message: "Invalid Credentials"
      });

    }

    const user = result[0];

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (match) {

      res.json({
        message: "Login Success"
      });

    } else {

      res.status(400).json({
        message: "Invalid Credentials"
      });

    }

  });

});


app.listen(process.env.PORT, () => {
  console.log("Server Running");
});