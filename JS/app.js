// global variable 
const headerMessage=document.getElementById('header-message');
headerMessage.innerText='';

// loading spinner 
const spinner=visibility=>{
    document.getElementById('mySpinner').style.display=visibility;
}
// hide previous results 
const previousResults = visibility =>{
    document.getElementById('search-result').style.display=visibility;
}

// load books
const loadBook=()=>{
    spinner('block');
    previousResults('none');
    const searchInputField=document.getElementById('search-book');
    const searchInput=searchInputField.value;
    if(searchInput.length===0){
        headerMessage.innerText='Please enter a book name to start searching';
        spinner('none');
    }
    else{
        headerMessage.innerText='';
        const url=`https://openlibrary.org/search.json?q=${searchInput}`;
        fetch(url)
        .then(res=> res.json())
        .then(data=> showData(data, data.docs));
        searchInputField.value='';
    } 
}

// display books 

const showData=(bookInfo, bookList)=>{
    const searchResultDiv=document.getElementById('search-result');
    searchResultDiv.textContent='';
    if(bookInfo.num_found===0){
        headerMessage.innerText='No results Found!';
        spinner('none');
    }
    else{
        headerMessage.innerHTML=`Number of relavent Documents found : ${bookInfo.num_found}`;
    }
    bookList.forEach(book => {
           const div=document.createElement('div');
           div.classList.add('col');
           div.innerHTML=`
            <div class="card h-75">
                <img class="img-thumbnail h-75" src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top" alt="Book Cover Image">
                <div class="card-body">
                    <h3 class="card-title">${book?.title}</h3>
                    <h5 class="card-text">Author: ${book?.author_name}</h5>
                    <p class="card-text">Publisher: ${book?.publisher}</p>
                </div>
                 <div class="card-footer">
                     <small class="text-muted">First Published in: ${book?.first_publish_year}</small>
                </div>
            </div>
           `;
        searchResultDiv.appendChild(div);
        spinner('none');
        previousResults('flex');
    });
}