import Connection from "../../../../utils/db";

async function handler(req, res) {
  const id = req.body.id;

  const result = Connection.query("SELECT * FROM products WHERE id=?", [id]);
  
  const data = JSON.stringify(result[0]);
  res.send(data);
}

export default handler;
