//add Item modal
var modal = document.getElementById('simpleModal');
var modalBtn = document.getElementById('addItem');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click',openModal);
closeBtn.addEventListener('click',closeModal);


//add category Modal
var categoryModal = document.getElementById('categoryModal');
var categoryB = document.getElementById('addCategory');
var closeCategory = document.getElementsByClassName('closeBtn')[0];

categoryB.addEventListener('click',openCatgy);
closeCategory.addEventListener('click',closeCategory);
// var catModal = document.getElementById('categoryModal');
// var catBtn = document.getElementById('addCategory');
// var closecat = document.getElementsByClassName('closeBtn')[0];

// catBtn.addEventListener('click',openCatgy);
// closecat.addEventListener('click',closeCatgy);

//edit item modal
var editItem = document.getElementById('editItemModal');
var editBtn = document.getElementById('editItem');
var closeEdit = document.getElementsByClassName('editItemClose')[0];

editBtn.addEventListener('click',openEditItem);
closeEdit.addEventListener('click',closeEditItem);

//delete item Modal
var deleteModal = document.getElementById('deleteModal');
var deleteItem = document.getElementById('deleteItem');
var closeDeleteItem = document.getElementsByClassName('deleteItemClose');

deleteItem.addEventListener('click',openDeleteItem);
closeDeleteItem.addEventListener('click',closeDeleteItem);

//edit category modal
// var editCatgy = document.getElementById('editCategoryMdl');
// var editCatgyBtn = document.getElementById('editCategoryN');
// var closeEditCatgy = document.getElementsByClassName('EcatClose')[0];

// editCatgyBtn.addEventListener('click',openEditCatgy);
// closeEditCatgy.addEventListener('click',closeEditCatgy);

window.addEventListener('click', outsideClick);
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
    if(e.target == categoryModal){
        categoryModal.style.display = "none";
    }
    if(e.target == editItem){
        editItem.style.display ='none';
    }
    if(e.target == deleteModal){
       deleteModal.style.display = "none";
}

//function to category modal
function openCatgy(){
    categoryModal.style.display = "block";
}

function closeCatgy(){
    categoryModal.style.display = "none";
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
//function to delete item modal
function openDeleteItem(){
    deleteModal.style.display = 'block';
}

function closeDeleteItem(){
    deleteModal.style.display = 'none';
}
