// import mongoose from "mongoose";

// const Connection = {};

// async function connect() {
//   if (Connection.isConnected) {
//     console.log("already connected");
//     return;
//   }
//   if (mongoose.Connections.length > 0) {
//     Connection.isConnected = mongoose.Connections[0].readyState;
//     if (Connection.isConnected === 1) {
//       console.log("use previous Connection");
//       return;
//     }
//     await mongoose.disconnect();
//   }
//   const db = await mongoose.connect(process.env.MONGODB_URI);
//   console.log("new Connection");
//   Connection.isConnected = db.Connections[0].readyState;
// }

// async function disconnect() {
//   if (Connection.isConnected) {
//     if (process.env.NODE_ENV === "production") {
//       await mongoose.disconnect();
//       Connection.isConnected = false;
//     } else {
//       console.log("not disconnected");
//     }
//   }
// }

// // function convertDocToObj(doc) {
// //   if (doc.id) doc.id = doc.id.toString();
// //   if (doc.name) doc.name = doc.name.toString();
// //   if (doc.__v) doc.__v = doc.__v.toString();
// //   if (doc.createdAt) doc.createdAt = doc.createdAt.toString();
// //   if (doc.updatedAt) doc.updatedAt = doc.updatedAt.toString();
// //   return doc;
// // }

// const db = { connect, disconnect, convertDocToObj };
// export default db;

import MySql from "sync-mysql";

var Connection = new MySql({
  host: "localhost",
  user: "imnayanx_ecomerce",
  password: "14125114.ecomerce",
  database: "imnayanx_ecomerce",
});

// Connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected!");
// });

export default Connection;
