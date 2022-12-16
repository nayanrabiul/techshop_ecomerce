import pool from "../../../../utils/db";

async function handler(req, res) {
  return new Promise((resolve, reject) => {
    const id = req.body.id;
    pool.getConnection(function (err, conn) {
      conn.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
        res.send(result[0]);
      });
      pool.releaseConnection(conn);
      resolve();
      return;
    });
  });
}

export default handler;
