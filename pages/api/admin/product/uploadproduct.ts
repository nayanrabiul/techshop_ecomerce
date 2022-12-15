import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import Connection from "../../../../utils/db";

export const config = {
  api: {
    bodyParser: false,
  },
};
type Field = {
  [key: string]: any; 
  
};

var field: Field = {

};

var file = [];

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/uploaded_images");
    options.filename = (name, ext, path, form) => {
      const n = Date.now().toString() + "_" + path.originalFilename;
      file.push(n);
      return n;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      field = fields;
      resolve({ fields, files });
    });
  });
};
const handler: NextApiHandler = async (req, res) => {
  await readFile(req, true);
  if (req.method == "POST") {
    //field contais field data and file contain name of the file.push it to database.
    if (
      !field.title &&
      !field.stock &&
      !field.price &&
      !field.descriptions &&
      !file.toString()
    ) {
      res.json({ ok: "error" });
      return;
    }
    Connection.query(
      "INSERT INTO products(title,stock,price,descriptions,images,subcategory_id) VALUES (?,?,?,?,?,?)",
      [
        field.title,
        field.stock,
        field.price,
        field.descriptions,
        file.toString(),
        field.subcategory_id,
      ]
    );

    res.json({ ok: "ok" });
  }
  if (req.method == "PUT") {
    // await readFile(req, true);
    // //field contais field data and file contain name of the file.push it to database.
    // if (
    //   !field.title &&
    //   !field.stock &&
    //   !field.price &&
    //   !field.descriptions

    // ) {
    //   res.json({ ok: "error" });
    //   return;
    // }
    console.log(field.descriptions);

    Connection.query(
      "UPDATE products SET title = ?, stock=?, price = ?, descriptions = ?,subcategory_id = ? WHERE products.id = ?",
      [
        String(field.title),
        String(field.stock),
        String(field.price),
        String(field.descriptions),
        String(field.subcategory_id),
        String(field.product_id),
      ]
    );

    res.json({ ok: "ok" });
  }
};

export default handler;
