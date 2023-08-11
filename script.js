let myLibrary = [];
let addedBooks = new Set();
let currentId = 1;

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = currentId++;
  this.info = function () {
    return `${this.title} by ${this.author}, 
      ${this.pages} pages, ${this.read}`;
  }
}

// Prototypes
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}
Book.prototype.toggleRead = function() {
  this.read = this.read === "Yes" ? "No" : "Yes";
}

// Add book to myLibrary array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Add book details to card

// Create & add book using button
function addNewBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  const bookCard = createBookCard(newBook);
  bookContainer.appendChild(bookCard);
}

// Create card container
function createBookCard(book) {
  const randNo = Math.floor((Math.random() * 100000) + 1);
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('book-card');
  cardDiv.dataset.bookId = book.id;

  cardDiv.style.backgroundColor = book.read === 'Yes' ? "#6FCF97" : "#F39C12";

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('book-image');

  const image = document.createElement('img');
  image.src = `https://picsum.photos/300/200?${randNo}`;
  image.alt = "Book Image";

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('book-buttons')

  imageDiv.appendChild(image);
  cardDiv.appendChild(imageDiv);
  cardDiv.appendChild(createBookDetails(book));
  buttonDiv.appendChild(createRemoveButton());
  buttonDiv.appendChild(createToggleReadButton());
  cardDiv.appendChild(buttonDiv);

  return cardDiv
}

// Create book details
function createBookDetails(book) {
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('book-info');
  const title = book.title;
  const author = book.author;
  const pages = book.pages;
  const read = book.read;
  
  const titleDisplay = document.createElement('p');
  titleDisplay.innerHTML = `<strong>Book: </strong>${title}`;
  const authorDisplay = document.createElement('p');
  authorDisplay.innerHTML = `<strong>Author: </strong>${author}`;
  const pagesDisplay = document.createElement('p');
  pagesDisplay.innerHTML = `<strong>Pages: </strong>${pages}`;
  const readDisplay = document.createElement('p');
  readDisplay.innerHTML = `<strong>Read: </strong>${read}`;

  infoDiv.appendChild(titleDisplay);
  infoDiv.appendChild(authorDisplay);
  infoDiv.appendChild(pagesDisplay);
  infoDiv.appendChild(readDisplay);

  return infoDiv;

}

// Create remove button inside container
function createRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-book");
  removeButton.textContent = "Remove Book";
  // Add event listener to removeButton
  return removeButton;
}

// Create toggle read button inside container
function createToggleReadButton() {
  const toggleReadButton = document.createElement("button");
  toggleReadButton.classList.add("toggle-book-read");
  toggleReadButton.textContent = "Toggle Read";
  // Add event listener to toggleReadButton
  return toggleReadButton;
}


// Display Book
const bookContainer = document.querySelector('.book-container');

// Remove book from display
bookContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-book')) {
    const bookCard = event.target.closest('.book-card');
    if (bookCard) {
      bookCard.parentNode.removeChild(bookCard);
    }
  }
});

// Remove book from array
bookContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-book')) {
    const bookCard = event.target.closest('.book-card');
    const bookId = bookCard.dataset.bookId;
    const bookIndex = myLibrary.findIndex(book => book.id === Number(bookId));
    myLibrary.splice(bookIndex, 1);

  }
})

// Toggle read status and update card appearance
bookContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('toggle-book-read')) {
    const bookCard = event.target.closest('.book-card');
    const bookId = bookCard.dataset.bookId;
    const bookIndex = myLibrary.findIndex(book => book.id === Number(bookId));
    const bookInfo = bookCard.querySelector('.book-info');
    const readOrNot = bookInfo.lastElementChild;

    myLibrary[bookIndex].toggleRead();

    if (myLibrary[bookIndex].read === 'Yes') {
      bookCard.style.backgroundColor = "#6FCF97";
      bookCard.style.color = "#333333";
      readOrNot.innerHTML = '<strong>Read:</strong> Yes';
    } else {
      bookCard.style.backgroundColor = "#F39C12";
      bookCard.style.color = "#333333";
      readOrNot.innerHTML = '<strong>Read:</strong> No';
    }
  }
});



// Fetch Details from Form
const form = document.forms["add-book-form"];
const checkbox = document.querySelector('#read')
form.addEventListener('submit', getValues);
function getValues(event) {
  event.preventDefault();
  const title = this.book_title.value;
  const author = this.book_author.value;
  const pages = this.book_pages.value;
  const read = checkbox.checked ? "Yes" : "No";
  addNewBook(title, author, pages, read);
  this.reset();
  modalContainer.style.display = "none";

}

// Modal 
const modalContainer = document.querySelector('.modal-container');
const openModalButton = document.querySelector('.add-book-container');
const closeModalButton = document.querySelector('#closeModal');

// Open Modal 
openModalButton.onclick = function() {
  modalContainer.style.display = "flex";
}
// Close Modal 
closeModalButton.onclick = function() {
  modalContainer.style.display = "none";
}

// Close Modal if user clicks anywhere outside of it
window.onclick = function(event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
}

