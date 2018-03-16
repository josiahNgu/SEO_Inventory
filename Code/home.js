//add Item modal
var modal = document.getElementById('simpleModal');
var modalBtn = document.getElementById('addItem');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click',openModal);
closeBtn.addEventListener('click',closeModal);
window.addEventListener('click', outsideClick);

//edit item modal
var editItem = document.getElementById('editItemModal');
var editBtn = document.getElementById('editItem');
var closeEdit = document.getElementsByClassName('editItemClose')[0];

editBtn.addEventListener('click',openEditItem);
closeEdit.addEventListener('click',closeEditItem);

//category Item Modal
var catModal = document.getElementById('categoryModal');
var catBtn = document.getElementById('catgyBtn');
var closecat = document.getElementsByClassName('catClose')[0];

catBtn.addEventListener('click',openCatgy);
closecat.addEventListener('click',closeCatgy);

//edit category modal
var editCatgy = document.getElementById('editCategoryMdl');
var editCatgyBtn = document.getElementById('editCategoryN');
var closeEditCatgy = document.getElementsByClassName('EcatClose')[0];

editCatgyBtn.addEventListener('click',openEditCatgy);
closeEditCatgy.addEventListener('click',closeEditCatgy);


//fuction to  addItem modal
function openModal(){
     modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}

function outsideClick(e){
    if(e.target == modal){
    modal.style.display ='none';
    }
    if(e.target == catModal){
        catModal.style.display = "none";
    }
    if(e.target == editCatgy){
        editCatgy.style.display = 'none';
    }
    if(e.target == editItem){
        editItem.style.display ='none';
    }
}

//function to category modal
function openCatgy(){
    catModal.style.display ="block";
}

function closeCatgy(){
    catModal.style.display = 'none';
}

//function to edit category modal
function openEditCatgy(){
    editCatgy.style.display = 'block';
}

function closeEditCatgy(){
    editCatgy.style.display = 'none';
}

//function to edit item
function openEditItem(){
    editItem.style.display = 'block';
}

function closeEditItem(){
    editItem.style.display = 'none';
}
