import pool from "../../../utils/db";

async function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "GET") {
      return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
          conn.query("SELECT * FROM category", (err, result) => {
            res.send(result);
          });
          pool.releaseConnection(conn);
          resolve();
        });
      });
    }

    if (req.method === "POST") {
      return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
          const { name } = req.body;

          if (!name) {
            res.status(422).send({
              message: "Validation error",
            });
            resolve();
          }

          conn.query(
            "INSERT INTO category(category) VALUES (?)",
            [name],
            (err, result) => {
              res.send("ok");
            }
          );

          pool.releaseConnection(conn);
          resolve();
        });
      });
    }
    if (req.method === "PUT") {
      return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
          const { name, newName } = req.body;
          console.log(name, newName);

          if (!name && !newName) {
            res.status(422).send({
              message: "Validation error",
            });
            resolve();
          }
          conn.query(
            "UPDATE category SET category=? WHERE category=?",
            [newName, name],
            (err, result) => {
              res.send(result);
            }
          );
          pool.releaseConnection(conn);
          resolve();
        });
      });
    }
    if (req.method === "DELETE") {
      return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
          const { name } = req.body;
          console.log(name);

          if (!name) {
            res.status(422).json({
              message: "Validation error",
            });
            return;
          }

          conn.query(
            "DELETE FROM `category` WHERE `category` = ?",
            [name],
            (err, result) => {
              res.send(result);
            }
          );
          pool.releaseConnection(conn);
          resolve();
        });
      });
    }
  });
}

export default handler;
