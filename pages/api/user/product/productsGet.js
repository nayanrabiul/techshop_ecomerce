
import Connection from "../../../../utils/db";

async function handler(req, res) {
  const result = Connection.query("SELECT * FROM products");
  res.status(201).send(result);
}

export default handler;
