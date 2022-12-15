import Connection from "../../../utils/db";

async function handler(req, res) {
  const id = req.body.id;

  const result = Connection.query("SELECT * FROM orders WHERE user_id=?", [id]);
  
  const data = JSON.stringify(result);
  res.send(data);
}

export default handler;
