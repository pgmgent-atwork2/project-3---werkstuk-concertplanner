const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('instrumenten.db');


db.serialize(() => {
  
  db.run(`CREATE TABLE IF NOT EXISTS instrumenten (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    amount INTEGER
  )`);


  const selectQuery = `SELECT * FROM instrumenten`;
  db.all(selectQuery, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Selected data:');
      rows.forEach((row) => {
        console.log(row.id, row.name, row.amount);
      });
    }
  });

  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});
