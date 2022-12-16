import pool from "../../utils/db";

async function handler(req, res) {
  
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, conn) {
      conn.query("select * from users", (err, result) => {
        res.send(result);
      });
      pool.releaseConnection(conn);
      resolve();
    });
  });
}

export default handler;
