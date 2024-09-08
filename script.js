let books = [];
let history = [];

document.getElementById('add-book-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const category = document.getElementById('book-category').value;
    
    const book = {
        title,
        author,
        category,
        id: Date.now()
    };

    books.push(book);
    addToBookList(book);
    document.getElementById('add-book-form').reset();
});

function addToBookList(book) {
    const bookList = document.getElementById('book-list');
    const li = document.createElement('li');

    li.innerHTML = `
        <strong>${book.title}</strong> by ${book.author} | ${book.category}
        <button onclick="borrowBook(${book.id})">Borrow</button>
    `;
    
    bookList.appendChild(li);
}

function borrowBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        history.push(book);
        updateHistoryList();
    }
}

function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} | ${book.category}`;
        historyList.appendChild(li);
    });
}

document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) || 
        book.category.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

function displayBooks(filteredBooks) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    filteredBooks.forEach(book => addToBookList(book));
}