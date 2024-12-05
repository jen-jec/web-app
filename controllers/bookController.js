const bookModel = require("../models/bookModel");

// GET: Retrieve all books
exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.render("index", { books });
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
};

// GET: Render form to add a new book
exports.getAddBookForm = (req, res) => {
  res.render("add-edit-item", { book: null });
};

// POST: Add a new book
exports.addBook = async (req, res) => {
  const { title, author, review } = req.body;
  try {
    await bookModel.addBook({ title, author, review });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error adding book");
  }
};

// GET: Render form to edit a book
exports.getEditBookForm = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookModel.getBookById(id);
    res.render("add-edit-item", { book });
  } catch (error) {
    res.status(500).send("Error fetching book details");
  }
};

// POST: Update an existing book
exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, author, review } = req.body;
  try {
    await bookModel.updateBook(id, { title, author, review });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating book");
  }
};

// POST: Delete a book
exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    await bookModel.deleteBook(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
};
