const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

// Initialize database with books table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      review TEXT NOT NULL,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Get all books
exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Get a book by ID
exports.getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Add a new book
exports.addBook = ({ title, author, review }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO books (title, author, review) VALUES (?, ?, ?)",
      [title, author, review],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

// Update a book by ID
exports.updateBook = (id, { title, author, review }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE books SET title = ?, author = ?, review = ? WHERE id = ?",
      [title, author, review, id],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// Delete a book by ID
exports.deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
