const mysql = require('mysql2');

const pool = mysql.createPool({

  host: "51.79.231.18",
  user: "imnayanx_ecomerce",
  password: "Ue#;Y#kZQy@4",
  database: "imnayanx_ecomerce",
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0
});


export default pool;
