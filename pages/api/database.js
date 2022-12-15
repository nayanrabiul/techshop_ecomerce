import Connection from "../../utils/db";

async function handler(req, res) {


  const result = Connection.query("SELECT * FROM users");
  
  const data = JSON.stringify(result);
  res.send(data);
}

export default handler;
