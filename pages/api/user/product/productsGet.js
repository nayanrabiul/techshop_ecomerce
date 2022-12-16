import pool from "../../../../utils/db";

export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      conn.query("SELECT * FROM products", (error, results) => {
         res.status(201).json(results);
      });
      pool.releaseConnection(conn);
      resolve();
    });
  });
}
