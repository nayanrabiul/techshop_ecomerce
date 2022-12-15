import Connection from "../../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    const results = Connection.query("SELECT * FROM orders");
    res.status(201).send(results);
  }
  if (req.method === "POST") {
    const { cartItems, shippingAddress, extrainformation, user_id } = req.body;

    const c = JSON.stringify(cartItems);
    const s = JSON.stringify(shippingAddress);
    const e = JSON.stringify(extrainformation);
    const u = parseInt(user_id);

    Connection.query(
      "INSERT INTO `orders` (`id`, `productdetails`, `extra_information`, `date`, `status`, `delivery_location`, `user_id`) VALUES (NULL, ?, ?, current_timestamp(), 'pending', ?, ?)",
      [c, e, s, u]
    );
    res.status(201).send("ok");
  }
  if (req.method === "PUT") {
    const { order_id } = req.body;


    Connection.query(
      "UPDATE `orders` SET `status` = 'confirmed' WHERE `orders`.`id` = ?",
      [order_id]
    );
    res.status(201).send("ok");
  }
  

}

export default handler;
