import pool from "../../../../utils/db";

async function handler(req, res) {
  const id = req.body.id;
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      conn.query("SELECT * FROM orders WHERE id=?", [id], (error, results) => {
        res.send(JSON.stringify(results[0]));
      });
      pool.releaseConnection(conn);
      resolve();
    });
  });
}
export default handler;
