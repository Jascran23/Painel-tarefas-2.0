const addTask = document.getElementById('btn-add-task');
const containerModal = document.querySelector('#container-modal');
const buttonModalEsc = document.querySelector('#modal-button-esc');
const buttonModalCancel = document.querySelector('#button-cancel-task');
const buttonModalSave = document.querySelector('#button-save-task');
const containerTasks = document.querySelector('#container-tasks');

addTask.addEventListener('click', callModalTask);
buttonModalEsc.addEventListener('click', escModalTask);
buttonModalCancel.addEventListener('click', escModalTask)
buttonModalSave.addEventListener('click', addTaskList);

function escModalTask(){  
    containerModal.classList.toggle('active');
}

function callModalTask(){
    
    containerModal.classList.toggle('active');
    
}




let listTasks = []
let listCategory = [
    {
        category: 'Pessoal',
        cor: null,
    },
    {
        category: 'Trabalho',
        cor: null,
    },
]

let containerAmountList = document.querySelector("#description-title");

function showAmountTask(){
        amount = listTasks.length;

    let p = `Você tem <span id="span-description-task"> <span id="value-tasks">${amount} </span>${amount !== 1 ? "tarefas" : "tarefa"}</span> ${amount !== 1 ? "listadas" : "listada"}`

    containerAmountList.innerHTML = p;

}


function renderListTask(){
    containerTasks.innerHTML = "";

    listTasks.forEach((list, index) => {
        const tr = document.createElement('tr')
        tr.classList.add('data-task')
        const task = `
                <td class="task-description">
                    <h4 id="title-task">${list.title}</h4>
                    <p id="details-task">${list.description}</p>
                </td>
                <td>
                    <p id="task-category">${list.category}</p>
                </td>
                <td><p id="task-date">${list.date ?? "Sem registro"}</p></td>
                <td class="task-icons">
                    <i id="task-check" class="task-icon fa-solid fa-circle-check"></i>
                    <i id="task-edit" class="task-icon fa-solid fa-pen"></i>
                    <i id="task-delete" class="task-icon fa-solid fa-trash" onClick="deleteItemTask(${index})"></i>
                </td>
                
        `;
        tr.innerHTML = task;

        containerTasks.appendChild(tr)
         
    })
    
    localStorage.setItem('tasks', JSON.stringify(listTasks));
    
}

function renderListTaskLocal(){
    let tasksLocalStorage = localStorage.getItem('tasks');
    if(tasksLocalStorage){
        listTasks = JSON.parse(tasksLocalStorage);
    }
    
    renderListTask();
    showAmountTask();
}

renderListTaskLocal();

function deleteItemTask(index){
    listTasks.splice(index,1);
    renderListTask();
}

const optionsCategories = document.querySelector('#modal-select-category');


function renderCategories(){
    optionsCategories.innerHTML = '';

    listCategory.forEach(data => {
        
        const li = document.createElement('li');
        li.classList.add('category-list');
        const categoria =  data.category;
        li.innerHTML = categoria;

        optionsCategories.appendChild(li)
    });

}

renderCategories()

const titleTask = document.querySelector('#title-task-modal');
const detailsTask = document.querySelector('#details-form');
const qtdTasks = document.querySelector('#value-tasks');


const selectCategory = document.querySelectorAll('.category-list');

let optionCategory = '';

function pegarValorDaCategoria(){    
    selectCategory.forEach(select => {  
        select.addEventListener('click', option => {
            optionCategory = select.innerText;
            
            selectCategory.forEach(e => {
                e.classList.remove('active');    
            })

            select.classList.add('active');       
        })
    })
}
pegarValorDaCategoria()
function clearForm(){
    optionCategory = '';

    selectCategory.forEach(e => {
        e.classList.remove('active');    
    })
    titleTask.value = '';
    detailsTask.value = '';
}

const textError = document.querySelectorAll('.error');
function mensageErrorForm(){
    textError.forEach(text => {
        text.innerText = 'Precisa preencher os campos'
        setTimeout(() => {
            text.innerText = ''    
        }, 2000);
        
    })
}

function addTaskList(e){
    e.preventDefault();
    let categoria = optionCategory;

    if(titleTask.value === '' || detailsTask.value === '' || categoria === ''){
        
        mensageErrorForm();
        return
    }

    const list = {
        title: titleTask.value,
        description: detailsTask.value,
        category: categoria,
        date: null,
    }

    listTasks.push(list);

    
    renderListTask();
    showAmountTask();
    callModalTask();
    clearForm();
}


