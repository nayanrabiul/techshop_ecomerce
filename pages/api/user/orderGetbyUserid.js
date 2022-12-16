import pool from "../../../utils/db";

async function handler(req, res) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      const id = req.body.id;

      conn.query(
        "SELECT * FROM orders WHERE user_id=?",
        [id],
        (err, result) => {
          res.send(result);
        }
      );
      pool.releaseConnection(conn);
      resolve();
    });
  });
}

export default handler;
