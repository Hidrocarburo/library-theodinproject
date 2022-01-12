"use strict";

let myLibrary = [];
let bookForRemoval = null;

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype = {
    constructor: Book,
    readBook: function(){
        if(this.read){
            this.read = false;
        }else{
            this.read = true;
        }
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    showBooks();
}

let testbook1 = new Book("Title", "Author", 100, false);
let testbook2 = new Book("Título", "Autor", 200, false);
let marimba = new Book("Marimba", "Merequetengue", 69, true);

function showBooks(){
    myLibrary.forEach(function(item, index){

        if(item == null || item == "" || item == undefined){
            return;
        }
        let book = document.querySelector(`[data-book-number="${index}"]`);
        if(book != null){
            book.remove();
        }
    });

    if (bookForRemoval != null){
        myLibrary.splice(bookForRemoval[1],1);
        bookForRemoval[0].remove();
        bookForRemoval = null;
    }

    // Se descartó lógica de filas debido a ser innecesaria.

    // let i=0;
    // while(true){
    //     let row = document.querySelector(`.row-number-${i}`);

    //     if(row == null){
    //         break;
    //     }
    //     row.remove();
    //     i++;
    // }

    myLibrary.forEach(function(item, index){
        if(item == null || item == "" || item == undefined){
            return;
        }

        // Se descartó lógica de filas debido a ser innecesaria.

        // if((index % 3 == 0) && (document.querySelector(`.row-number-${index / 3}`) == null)){
        //     var row = document.createElement("div");
        //     row.className = "row justify-content-center book-row row-number-".concat(index / 3);
        //     document.getElementById("books-container").appendChild(row);
        // }else{
        //     var row = document.getElementsByClassName("row-number-".concat(Math.trunc(index / 3)))[0];
        // }

        var row = document.querySelector(".book-row");

        let bookCard = {
            card: (function(){
                let card = document.createElement("div");
                card.className = "card col-md-4 col-sm-12";
                card.dataset.bookNumber = index;
                return card;
            })(),

            body: (function(){
                let body = document.createElement("div");
                body.className = "card-body";
                return body;
            })(),

            title: (function(bookTitle){
                let title = document.createElement("h5");
                title.className = "card-title";
                title.innerHTML = bookTitle;
                return title;
            })(item.title),

            author: (function(bookAuthor){
                let author = document.createElement("h6");
                author.className = "card-subtitle mb-2 text-muted";
                author.innerHTML = bookAuthor;
                return author;
            })(item.author),

            pages: (function(bookPages){
                let pages = document.createElement("p");
                pages.className = "card-text";
                pages.innerHTML = `${bookPages} pages`;
                return pages;
            })(item.pages),

            read: (function(bookRead){
                let read = document.createElement("a");
                read.className = "card-link";
                read.href = "#";
                read.innerHTML = bookRead ? "already read" : "not read yet";
                read.addEventListener("click", changeReadStatus);
                return read;
            })(item.read),

            deleteBtn: (function(){
                let wrapper = document.createElement("p");
                wrapper.className = "m-0";
                let deleteBtn = document.createElement("btn");
                deleteBtn.dataset.bookNumber = index;
                deleteBtn.className =  "btn btn-secondary mt-3"
                deleteBtn.innerHTML = "Remove book";
                deleteBtn.addEventListener("click", removeBook);
                wrapper.appendChild(deleteBtn)
                return wrapper
            })()
        };

        row.appendChild(bookCard.card);
        bookCard.card.appendChild(bookCard.body);
        bookCard.body.appendChild(bookCard.title);
        bookCard.body.appendChild(bookCard.author);
        bookCard.body.appendChild(bookCard.pages);
        bookCard.body.appendChild(bookCard.read);
        bookCard.body.appendChild(bookCard.deleteBtn);
    });
}

function removeBook(event){
    bookForRemoval = [document.querySelector(`[data-book-number="${event.path[0].dataset.bookNumber}"]`), event.path[0].dataset.bookNumber,1];
    showBooks();
}

function changeReadStatus(event){
    let book = document.querySelector(`[data-book-number="${event.path[2].dataset.bookNumber}"]`);
    myLibrary[book.dataset.bookNumber].readBook();
    showBooks();
}

function createBook(event){
    var emptyInput = false;
    let newBook = new Book(
        event.path[2].childNodes[3].childNodes[1].childNodes[3].childNodes[1].value,
        event.path[2].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[1].value,
        event.path[2].childNodes[3].childNodes[1].childNodes[5].childNodes[3].childNodes[1].value,
        event.path[2].childNodes[3].childNodes[1].childNodes[7].childNodes[1].checked
    )

    // Evento de clic para cerrar el modal.

    let clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    Object.keys(newBook).map(function(objectKey){
        if (!newBook[objectKey] && objectKey !== "read"){
            emptyInput = true;
        }
    }); 
    if(emptyInput){
        event.path[2].childNodes[3].childNodes[1].childNodes[1].className = "d-block text-danger";
        return;
    }else{
        event.path[2].childNodes[3].childNodes[1].childNodes[1].className = "d-none";
    }

    event.path[2].childNodes[3].childNodes[1].childNodes[3].childNodes[1].value = ""
    event.path[2].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[1].value = ""
    event.path[2].childNodes[3].childNodes[1].childNodes[5].childNodes[3].childNodes[1].value = ""
    event.path[2].childNodes[3].childNodes[1].childNodes[7].childNodes[1].checked = false;

    addBookToLibrary(newBook);

    event.path[1].childNodes[1].dispatchEvent(clickEvent);
}

addBookToLibrary(testbook1);
addBookToLibrary(testbook2);
addBookToLibrary(marimba);

showBooks();




