import Connection from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    const results = Connection.query("SELECT * FROM subcategory");
    res.status(201).send(
      results
    );
  }

  if (req.method === "POST") {
    const { name,cat_id } = req.body;


    if (!name) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }

    const results = Connection.query(
      "INSERT INTO subcategory(subcategory,category_id) VALUES (?,?)",
      [name,cat_id]
    );
    res.status(201).send(
      results
    );
  }

  if (req.method === "PUT") {
    
    const { name,newName } = req.body;
    
    if (!name) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }

    const results = Connection.query(
      "UPDATE `subcategory` SET `subcategory` = ? WHERE `subcategory` = ?;",
      [newName,name]
    );
    res.status(201).send(
      results
    );
  }
  if (req.method === "DELETE") {
    
    const { name } = req.body;
    console.log(name);
    if (!name) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }

    const results = Connection.query(
      "DELETE FROM `subcategory` WHERE `subcategory` = ?",
      [name]
    );
    res.status(201).send(
      results
    );
  }
}

export default handler;
