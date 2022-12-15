import Connection from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    const results = Connection.query("SELECT * FROM category");
    res.status(201).send(results);
  }

  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }

    const results = Connection.query(
      "INSERT INTO category(category) VALUES (?)",
      [name]
    );
    res.status(201).send(results);
  }
  if (req.method === "PUT") {
    const { name, newName } = req.body;
    console.log(name, newName);

    if (!name && !newName) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }
    // UPDATE category SET category='Smartphone' WHERE category='smartphone';
    const results = Connection.query(
      "UPDATE category SET category=? WHERE category=?;",
      [newName, name]
    );
    res.status(201).send(results);
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
      "DELETE FROM `category` WHERE `category` = ?",
      [name]
    );
    res.status(201).send(results);
  }
}

export default handler;
