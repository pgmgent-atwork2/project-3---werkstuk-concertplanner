const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('usermeta.db');


db.serialize(() => {
  
  db.run(`CREATE TABLE IF NOT EXISTS usermeta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone INTEGER,
  )`);

  
  const insertQuery = `INSERT INTO usermeta (phone) VALUES (?)`;
  db.run(insertQuery, [ , , ], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Data inserted successfully.');
    }
  });

  // Select data from the table
  const selectQuery = `SELECT * FROM usermeta`;
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Selected data:');
      rows.forEach((row) => {
        console.log(row.telefoonnummer);
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
