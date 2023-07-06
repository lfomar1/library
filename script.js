"use strict";
const myLibrary = [];
class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}
function addToLibrary() {
  let title = document.querySelector(".title-book").value;
  let author = document.querySelector(".author-book").value;
  let pages = document.querySelector(".pages-book").value;
  let isRead = document.querySelector(".isread-book").value;
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}
//Open and close modal
const modalOpenButton = document.querySelector(".add-book");
const modal = document.querySelector(".modal");

modalOpenButton.addEventListener("click", () => {
  modal.show();
});
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 27) {
    modal.close();
  }
});

// Remove the book
function handleClick(index) {
  myLibrary.splice(index, 1);
  render();
}
let isReadBtn = document.createElement("button");
let isReadCheck = document.getElementById("isRead");
function changed() {
  if (isReadCheck.checked == true) {
    isReadBtn.style.backgroundColor = "lightgreen";
  }
}
isReadCheck.addEventListener("change", changed);
//Render book to html
function render() {
  let bookGrid = document.querySelector(".books-grid");
  bookGrid.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    if (book.title === "" || book.author === "" || book.pages === "") {
      return;
    } else {
      let bookEl = document.createElement("div");
      let buttonRemove = document.createElement("button");
      let isReadBtn = document.createElement("button");
      let isReadCheck = document.getElementById("isRead");
      buttonRemove.innerText = "Remove";

      isReadBtn.addEventListener("click", function () {
        if (isReadCheck.checked) {
          isReadCheck.checked = false;
          isReadBtn.innerText = "Not Read";
          isReadBtn.style.backgroundColor = "";
        } else {
          isReadCheck.checked = true;
          isReadBtn.innerText = "Read";
          isReadBtn.style.backgroundColor = "lightgreen";
        }
      });
      buttonRemove.setAttribute("data-index", i);
      buttonRemove.addEventListener("click", function (event) {
        let index = parseInt(event.target.getAttribute("data-index"));
        handleClick(index);
      });
      buttonRemove.classList.add("remove-btn");
      isReadBtn.classList.add("isReadBtn");
      bookEl.classList.add("books");
      bookEl.innerHTML = `<h3> "${book.title}" </h3>
      <h3> ${book.author} </h3>
      <h3> ${book.pages} </h3>`;
      bookGrid.appendChild(bookEl);
      bookEl.appendChild(buttonRemove);
      bookEl.appendChild(isReadBtn);
      console.log(myLibrary);
      changed();
    }
  }
}

isReadCheck.addEventListener("change", changed); // Add event listener to the checkbox

function changed() {
  let isReadBtns = document.getElementsByClassName("isReadBtn");
  for (let i = 0; i < isReadBtns.length; i++) {
    let isReadBtn = isReadBtns[i];
    if (isReadCheck.checked) {
      isReadBtn.style.backgroundColor = "lightgreen";
      isReadBtn.innerText = "Read";
    } else {
      isReadBtn.style.backgroundColor = "";
      isReadBtn.innerText = "Not Read";
    }
  }
}

//Form values
const form = document.querySelector(".add-book-form");
const submitButton = document
  .getElementById("submit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    addToLibrary();
    render();
    form.reset();
    modal.close();
  });
