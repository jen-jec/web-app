const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// GET: Display all books
router.get("/", bookController.getBooks);

// GET: Add book form
router.get("/add", bookController.getAddBookForm);

// POST: Add a new book
router.post("/add", bookController.addBook);

// GET: Edit book form
router.get("/edit/:id", bookController.getEditBookForm);

// POST: Update a book
router.post("/edit/:id", bookController.updateBook);

// POST: Delete a book
router.post("/delete/:id", bookController.deleteBook);

module.exports = router;
