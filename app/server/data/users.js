const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('users.db');


db.serialize(() => {
  
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naam TEXT,
    email TEXT
  )`);

  
  const insertQuery = `INSERT INTO users (naam, email) VALUES (?, ?)`;
  db.run(insertQuery, [ , , ], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Data inserted successfully.');
    }
  });

  // Select data from the table
  const selectQuery = `SELECT * FROM users`;
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Selected data:');
      rows.forEach((row) => {
        console.log(row.naam,  row.email);
      });
    }
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});
