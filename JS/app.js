// load books

const loadBook=()=>{
    const searchInput=document.getElementById('search-book').value;
    const url=`https://openlibrary.org/search.json?q=${searchInput}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=> showData(data.docs));
}

// display books 

const showData=bookList=>{
    bookList.forEach(book => {
        console.log(book.title);    
    });
}