import pool from "../../../utils/db";

async function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "GET") {
      return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
          conn.query("SELECT * FROM subcategory", (err, result) => {
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
          const { name, cat_id } = req.body;
          if (!name) {
            res.status(422).send({
              message: "Validation error",
            });
            resolve();
          }

          conn.query(
            "INSERT INTO subcategory(subcategory,category_id) VALUES (?,?)",
            [name, cat_id],
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

          if (!name && !newName) {
            res.status(422).send({
              message: "Validation error",
            });
            resolve();
          }
          conn.query(
            "UPDATE `subcategory` SET `subcategory` = ? WHERE `subcategory` = ?;",
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
            "DELETE FROM `subcategory` WHERE `subcategory` = ?",
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
