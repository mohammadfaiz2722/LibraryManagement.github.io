console.log("This is index.js")
let local1=localStorage.getItem('name')
let local2=localStorage.getItem('author')
let local3=localStorage.getItem('type')
if(local1!=null)
{
    nameObj=[]
    authorObj=[]
    typeObj=[]
    nameObj=JSON.parse(local1)
    authorObj=JSON.parse(local2)
    typeObj=JSON.parse(local3)
    let uiString=[]
    let tablebody = document.getElementById('tableBody');
    nameObj.forEach((element,index)=>
    {
         uiString+= `<tr>
        <td>${element}</td>
        <td>${authorObj[index]}</td>
        <td>${typeObj[index]}</td>
        <td><button type="button" class="btn btn-outline-dark">Delete It</button></td></tr>`;

    })
        tablebody.innerHTML = uiString
            
    
}
// shownotes();
//Constructor
function Book(name, author, type) {
    this.name = name
    this.author = author
    this.type = type
}
//Display Constructor
function Display() {

}
Display.prototype.add = function (book) {
    shownotes(book);
    
    
}
function shownotes(book)
{
    let bookName=localStorage.getItem('name')
    let authrname=localStorage.getItem('author')
    let typename=localStorage.getItem('type')
    if(bookName==null)
    {
        nameObj=[]
        authorObj=[]
        typeObj=[]
    }
    else{
        nameObj=JSON.parse(bookName)
        authorObj=JSON.parse(authrname)
        typeObj=JSON.parse(typename)
    }
    nameObj.push(book.name)
    authorObj.push(book.author)
    typeObj.push(book.type)
    localStorage.setItem('name',JSON.stringify(nameObj))
    localStorage.setItem('author',JSON.stringify(authorObj))
    localStorage.setItem('type',JSON.stringify(typeObj))
    let tablebody = document.getElementById('tableBody');
    let uiString=[]
    nameObj.forEach((element,index)=>
    {
         uiString+= `<tr>
        <td>${element}</td>
        <td>${authorObj[index]}</td>
        <td>${typeObj[index]}</td></tr>`;

    })
    tablebody.innerHTML = uiString
        


}


Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryForm');
    libraryform.reset();
}



Display.prototype.validate = function (book) {
    if (book.name.length >2 || book.author.length > 2) {
        return true;
    }
    else {
        return false
    }
}

Display.prototype.show = function (type,message) {
    let error_success = document.getElementById('message')
    error_success.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
 
    <strong>Message!</strong>${message}
  </div>>`
    setTimeout(()=>
    {
        error_success.innerHTML=''

    },1000)
  }

//Add method to display prototype;





//Add submit event listner to library forms
let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    e.preventDefault();
    console.log("You have submitted library form")
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;


    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success','Your book has been added successfully');
    }
    else {
        // Show error to the user
        display.show('danger','Sorry You can not add this book');
    }
}
