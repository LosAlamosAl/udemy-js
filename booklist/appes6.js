// Disable some ESLint checks
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// @ts-nocheck

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Global game state
const books = [];

// UI components
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

//  Listen for submit on form
bookForm.addEventListener('submit', newBook);

function newBook(e) {
  e.preventDefault();
  const nb = new Book(title.value, author.value, isbn.value);
  books.push(nb);
  addToList(nb);
  clearForm();
}

function addToList(book) {
  const row = bookList.insertRow(-1);
  let cell;
  cell = row.insertCell(-1);
  cell.innerText = book.title;
  cell = row.insertCell(-1);
  cell.innerText = book.author;
  cell = row.insertCell(-1);
  cell.innerText = book.isbn;
  cell = row.insertCell(-1);
  cell.innerText = 'X';
  cell.addEventListener('click', deleteBook);
}

function deleteBook(e) {
  books.forEach((b, i) => {
    if (b.isbn === e.target.parentElement.cells[2].innerText) {
      books.splice(i, 1);
    }
  });
  e.target.parentElement.remove();
}

function clearForm() {
  title.value = '';
  author.value = '';
  isbn.value = '';
}
