import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import Category from "../../../models/Category";
import db from "../../../utils/db";
import Connection from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  const existingUser = Connection.query("SELECT * FROM users where email=?", [
    email,
  ]);
  console.log(existingUser);

  if (existingUser.length > 0) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const h_password = bcryptjs.hashSync(password);
  console.log(name, email, h_password);

  const result = Connection.query(
    "INSERT INTO users(name,email,password,isAdmin) VALUES (?,?,?,?)",
    [name, email, h_password, "false"]
  );
  Connection.release;

  res.status(201).send({
    message: "Created user!",
  });
}

export default handler;
