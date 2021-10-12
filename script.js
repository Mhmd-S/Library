let myLibrary = [];
let bName;
let aName;
let bStatus;
let pageNum;

// Book Object Constructor
function Book(bookName, bookAuthor, bookPages, bookStatus) {
  this.bookName = bookName
  this.bookAuthor = bookAuthor
  this.bookPages = bookPages
  this.bookStatus = bookStatus
}

// Adds the the book to the myLibrary Array.
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Function to bring the form to view.
function formView(){
  document.getElementById('book-form').classList.toggle('active');
  disableScroll();
  let cards = document.querySelectorAll('.book-card');
  cards.forEach(card => card.classList.toggle('disable'));
}

// A function for the Form Cancel button. Resets the form and removes it from view.
function cancelButton(){
  enableScroll();
  document.getElementById('book-form').classList.remove('active');
  document.getElementById('book-form').reset();
  let cards = document.querySelectorAll('.book-card');
  cards.forEach(card => card.classList.remove('disable'));
}

function createCard() {
  let div = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p')
  let pages = document.createElement('p');
  let statusB = document.createElement('button');
  let removeB = document.createElement('button');

  // Add the classes to each element.
  div.className = 'book-card';
  title.className = 'book-title';
  author.className = 'book-author';
  pages.className = 'book-page';
  if (bStatus == true) {
    statusB.className = 'book-status-read';
    statusB.innerText = 'Read'
  } else {
    statusB.className = 'book-status-not';
    statusB.innerText = 'Not Read'
  }
  removeB.className = 'remove-book';

  // Add eventListeners to the buttons of the form
  removeB.addEventListener('click', removeButton);
  statusB.addEventListener('click', toggleRead);

  // Add the text to each element.
  title.innerText = bName;
  author.innerText = aName;
  pages.innerText = pageNum;
  removeB.innerText = 'Remove';


  // Add the div to the card section and the the appropriate elements to the div.
  let mainBody = document.getElementById('main-body');
  mainBody.insertBefore(div, mainBody.lastElementChild)
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(pages);
  div.appendChild(statusB);
  div.appendChild(removeB);
}

function disableScroll() {
  // Get the current page scroll position
  scrollTop = 
    window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = 
    window.pageXOffset || document.documentElement.scrollLeft,

      // if any scroll is attempted,
      // set this to the previous value
      window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
}

function enableScroll() {
  window.onscroll = function() {};
}

// This function is connected to the create button. It takes the the value inside every input and adds it to values, then it resets the form and hides it from view.
function submitButton() {
  bName = document.getElementById('book-name').value;
  aName = document.getElementById('author-name').value;
  pageNum = document.getElementById('book-pages').value;

  // FORM VALIDATION START//
  if(bName.length == 0) {
    alert('Book Name cannot be blank');    
    return
  } else if(aName.length == 0){
    alert('Author Name cannot be blank')
    return
  } else if(pageNum.length == 0) {
    alert('Page Number cannot be empty')
    return
  }

  if (document.getElementById('yes').checked){
    bStatus = true;
  } else if (document.getElementById('no').checked){
    bStatus = false;
  } else {
    alert('Did you read the book section cannot be empty')
    return
  }
  // FORM VALIDATION END//

  // Creates an object called newBook.
  let newBook = new Book(bName, aName, pageNum, bStatus);

  // Add the object to library array
  addBookToLibrary(newBook);
  // Add the object to the local storage
  addToStorage(newBook);
  // Resets the form
  document.getElementById('book-form').reset();
  // Removes the form from view
  cancelButton();
  // Creates a card using the object above
  createCard();
}

// Remove Button function
function removeButton(){
  let title = this.parentElement.firstChild.innerText;
  localStorage.removeItem(title);
  myLibrary.pop(myLibrary.indexOf(title));
  this.parentElement.remove();
}

// Toggle between Read and not-read
function toggleRead(){
  let title = this.parentElement.firstChild.innerText
  let objStorage = JSON.parse(localStorage.getItem(title));
  if(this.className == 'book-status-read'){
    objStorage.bookStatus = false;
    localStorage.setItem(title, JSON.stringify(objStorage));
    console.log(this)
    this.innerText = 'Not Read';
    this.className = 'book-status-not';
  }else if(this.className == 'book-status-not'){
    objStorage.bookStatus = true;
    localStorage.setItem(title, JSON.stringify(objStorage));
    console.log(this)
    this.innerText = 'Read';
    this.className ='book-status-read';
  }else{};
}

// localstorage functions section
function addToStorage(book){
  localStorage.setItem(`${book.bookName}`, JSON.stringify(book));
}

function createCardArray(bkName, bkAuthor, bkPages, bkStatus) {
  let div = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p')
  let pages = document.createElement('p');
  let statusB = document.createElement('button');
  let removeB = document.createElement('button');

  // Add the classes to each element.
  div.className = 'book-card';
  title.className = 'book-title';
  author.className = 'book-author';
  pages.className = 'book-page';
  if (bkStatus == true) {
    statusB.className = 'book-status-read';
    statusB.innerText = 'Read'
  } else {
    statusB.className = 'book-status-not';
    statusB.innerText = 'Not Read'
  }
  removeB.className = 'remove-book';

  // Add eventListeners to the buttons of the form
  removeB.addEventListener('click', removeButton);
  statusB.addEventListener('click', toggleRead);

  // Add the text to each element.
  title.innerText = bkName;
  author.innerText = bkAuthor;
  pages.innerText = bkPages;
  removeB.innerText = 'Remove';


  // Add the div to the card section and the the appropriate elements to the div.
  let mainBody = document.getElementById('main-body');
  mainBody.insertBefore(div, mainBody.lastElementChild)
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(pages);
  div.appendChild(statusB);
  div.appendChild(removeB);
}


function displayStorage(){
    for (i in localStorage) {
      if(i === 'length'|| i ==='clear' || i ==='getItem' || i ==='key' || i ==='removeItem' || i ==='setItem'){
        break
      }else {
        let x = JSON.parse(localStorage.getItem(i));
        myLibrary.push(x);
      }
    }
    for (z in myLibrary){
      createCardArray(myLibrary[z].bookName, myLibrary[z].bookAuthor, myLibrary[z].bookPages, myLibrary[z].bookStatus);
    }
}

window.addEventListener('DOMContentLoaded', function(){
  displayStorage();
});