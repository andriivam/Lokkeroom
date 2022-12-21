import client from "../../src/database/client.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const signupUser = (req, res) => {
  const { username, password, email } = req.body;
  if (!(username && password && email)) {
    res.status(400).send("All inputs are required");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  client.query(
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
    [username, hashPassword, email],
    (err, results) => {
      if (!err) {
        res.send(`New user was register with id: ${results.rows[0].id}`);
      } else {
        console.log(err.message);
      }
    }
  );
};

export const logUser = (req, res) => {
  const { password, email } = req.body;
  if (!(password && email)) {
    res.status(400).send("All inputs are required");
  }

  client.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email],
    (err, results) => {
      if (err) {
        console.log(err.message);
      }
      if (results.rows[0] === undefined) {
        res.send("Invalid email address");
      } else {
        const validPassword = bcrypt.compareSync(
          password,
          results.rows[0].password
        );
        if (validPassword) {
          const token = jwt.sign({ user_id: 1 }, process.env.jtwSecretKey, {
            algorithm: "HS512",
            expiresIn: "1h",
          });
          console.log(token)
          return res
          .cookie("access_token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .send(`You are logged with email ${email}`)
        } else {
          res.send("Invalid password");
        }
      }
    }
  );
};

export const logOut = (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "You are offline!" });
};

export const createLobby = (req, res) => {
  const { name } = req.body;
  const admin_id = req.userId;
  client.query(
    "INSERT INTO lobbys (name, admin_id) VALUES ($1, $2) RETURNING *",
    [name, admin],
    (err, results) => {
      if (err) {
        console.log(err.message);
      }
      client.query(
        "INSERT INTO admin_per-user (user_id, lobby_id) VALUES ($1, $2) RETURNING *",
        [admin_id, results.rows[0].id],
        (err, results) => {
          if (err) {
            console.log(err.message);
          }
        }
      );
      res.send(`Lobby created with ID: ${results.rows[0].id} and name ${name}`);
    }
  );
};
