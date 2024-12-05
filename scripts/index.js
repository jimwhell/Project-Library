//Library Array
const myLibrary = [];

class Book {
    constructor(title, author, noOfPages, readStatus) {
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.readStatus = readStatus;
    }

    info() {
        return `${this.title}, by ${this.author}, ${this.noOfPages} pages, ${this.readStatus}`;
    }
}

//Book Constructor
// function Book(title, author, noOfPages, readStatus) 
// {
//     this.title = title;
//     this.author = author;
//     this.noOfPages = noOfPages;
//     this.readStatus = readStatus;
//     this.info = function() {
//         return `${this.title}, by ${this.author}, ${this.noOfPages} pages, ${this.readStatus}`;
//     }
// }


//Function to create a book object and push it into the library array
function addBookToLibrary(title, author, noOfPages, readStatus) 
{
    const newBook = new Book(title, author, noOfPages, readStatus);
    myLibrary.push(newBook);
}



//Function to display all book inside the library array
function retrieveAllBooks(myLibrary)
{
    const tableCaption = document.querySelector('caption');
    const tableBodyElement = document.querySelector('.books-container');
    tableBodyElement.innerHTML = '';
    console.log(`My Library length: ${myLibrary.length}`);
    if (myLibrary.length === 0)
    {
        tableCaption.innerText = 'No books found inside the library.';
    }
    else
    {
        tableCaption.innerText = 'All books inside the library.';

        myLibrary.forEach((book, index) => {
            const bookRow = document.createElement('tr');
            bookRow.setAttribute('data-book-id', index);
            bookRow.innerHTML = `
            <th class="title-container">${book.title}</th>
            <td class="author-container">${book.author}</td>
            <td class="pages-container">${book.noOfPages}</td>
            <td class="status-container">${book.readStatus}</td>
            <td><button class="deleteBtn">Delete Book</button></td>
            <td><button class="toggleBtn">Toggle Read Status</button></td>
            `
            const deleteBtn = bookRow.querySelector('.deleteBtn');
            deleteBtn.addEventListener('click', () => {
                myLibrary.splice(index, 1);
                retrieveAllBooks(myLibrary);
            })
    
            const toggleBtn = bookRow.querySelector('.toggleBtn');
            toggleBtn.addEventListener('click', toggleReadStatus);
            tableBodyElement.appendChild(bookRow);
        })
    }
   
}

function initializeModalButtons()
{
    const showButton = document.querySelector('#showDialog');
    const bookDialog = document.querySelector('#bookDialog');

    showButton.addEventListener('click', () => {
        bookDialog.showModal();
    });

    const closeButton = document.querySelector('button[value="cancel"]');

    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        resetForm();
        bookDialog.close();

        
    })

}

//function to toggle book read status
function toggleReadStatus(event)
{
    const clickedBtn = event.target;
    const rowToUpdate = clickedBtn.closest('tr');
    const bookId = rowToUpdate.dataset.bookId;
    console.log(`Book Fucking ID! ${bookId}`);

    myLibrary.forEach((book, index) => {
        console.log(`Index ${index}`);
        if (index == bookId)
        {
            book.readStatus === 'Read' ? book.readStatus = 'Not Read' : book.readStatus = 'Read';
            console.log(book);
            retrieveAllBooks(myLibrary);
        }
    })

}


//function to initialize the form for adding new books to the library
function initializeForm()
{
    const addBookForm = document.querySelector('#addBookForm');

    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.querySelector('#title').value;
        const authorInput = document.querySelector('#author').value;
        const noOfPages = document.querySelector('#noOfPages').value;
        const selectedStatus = document.querySelector("input[name='status-radio']:checked").value;
        console.log(`Title input ${titleInput}`);
        console.log(`Author input ${authorInput}`);
        console.log(`Pages input ${noOfPages}`);
        console.log(`Status input ${selectedStatus}`);

        addBookToLibrary(titleInput, authorInput, noOfPages, selectedStatus);
        console.log(`Length of Library array prior to display: ${myLibrary.length}`)
        retrieveAllBooks(myLibrary);
        bookDialog.close();
        resetForm();

    });

}

//function to reset form inputs
function resetForm() {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const noOfPagesInput = document.querySelector('#noOfPages');
    const statusRadios = document.querySelectorAll("input[name='status-radio']");

    titleInput.value = '';
    authorInput.value = '';
    noOfPagesInput.value = '';

    statusRadios.forEach(radio => {
        radio.checked = false; 
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeModalButtons();
    initializeForm();
    retrieveAllBooks(myLibrary);
    
})





