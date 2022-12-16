import pool from "../../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, conn) {
        conn.query("SELECT * FROM orders", (error, results) => {
          res.send(results);
        });
        pool.releaseConnection(conn);
        resolve();
      });
    });
  }
  if (req.method === "POST") {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, conn) {
        const { cartItems, shippingAddress, extrainformation, user_id } =
          req.body;

        const c = JSON.stringify(cartItems);
        const s = JSON.stringify(shippingAddress);
        const e = JSON.stringify(extrainformation);
        const u = parseInt(user_id);

        conn.query(
          "INSERT INTO `orders` (`id`, `productdetails`, `extra_information`, `date`, `status`, `delivery_location`, `user_id`) VALUES (NULL, ?, ?, current_timestamp(), 'pending', ?, ?)",
          [c, e, s, u],
          (error, results) => {
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
        const { order_id } = req.body;

        conn.query(
          "UPDATE `orders` SET `status` = 'confirmed' WHERE `orders`.`id` = ?",
          [order_id],
          (error, results) => {
            res.status(201).send("ok");
          }
        );
        pool.releaseConnection(conn);
        resolve();
      });
    });
  }
}

export default handler;
