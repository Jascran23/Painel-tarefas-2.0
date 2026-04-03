//#region BUSCA DE TAGS NO HTML
const addTask = document.getElementById('btn-add-task');
const containerModal = document.querySelector('#container-modal');
const buttonModalEsc = document.querySelector('#modal-button-esc');
const buttonModalCancel = document.querySelector('#button-cancel-task');
const buttonModalSave = document.querySelector('#button-save-task');
const buttonModalEdit = document.querySelector('#button-edit-task');
const containerTasks = document.querySelector('#container-tasks');
const textTitleModal = document.querySelector('#text-title-modal');
//#endregion

//#region CHAMAR MODAL E FECHAR MODAL
addTask.addEventListener('click', callModalTask);
buttonModalEsc.addEventListener('click', escModalTask);
buttonModalCancel.addEventListener('click', escModalTask)
//#endregion


buttonModalSave.addEventListener('click', addTaskList);


//#region CHAMAR E FECHAR MODAL
function escModalTask(){  
   containerModal.classList.toggle('active');
}
function callModalTask(){   
   containerModal.classList.toggle('active'); 
   trocarBotaoEditarPorSalvar();
}
function trocarBotaoEditarPorSalvar(){
    const save = buttonModalSave.classList.value.includes('none');
    if(save){
        buttonModalSave.classList.remove('none');
        buttonModalEdit.classList.add('none');
        textTitleModal.textContent = 'Inserir Tarefas'
    }
}
function trocarBotaoSalvarPorEditar(){
    const edit = buttonModalEdit.classList.value.includes('none');
    if(edit){
        buttonModalSave.classList.add('none');
        buttonModalEdit.classList.remove('none');
        textTitleModal.textContent = 'Editar Tarefas'
    }
}
//#endregion

//#region LISTAS DE TAREFAS
let listasksDone = [];
let listTasks = [];
let listCategory = [
    {
        category: 'Pessoal',
        cor: null,
    },
    {
        category: 'Trabalho',
        cor: null,
    },
];
//#endregion

// ATUALIZAR QUANTIDADE DE TAREFAS PENDENTES

let containerAmountList = document.querySelector("#description-title");
const optionsCategories = document.querySelector('#modal-select-category');

function showAmountTask(){
    amount = listTasks.length;

    let p = `Você tem <span id="span-description-task"> <span id="value-tasks">${amount} </span>${amount !== 1 ? "tarefas" : "tarefa"}</span> ${amount !== 1 ? "listadas" : "listada"}`

    containerAmountList.innerHTML = p;

}

// RENDERIZAÇÃO

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
                    <i onClick="deleteItemTask(${index})" id="task-check" class="task-icon fa-solid fa-circle-check"></i>
                    <i id="task-edit" onClick="callModalItemTask(${index})" class="task-icon fa-solid fa-pen"></i>
                    <i id="task-delete" class="task-icon fa-solid fa-trash" onClick="deleteItemTask(${index})"></i>
                </td>
                
        `;
        tr.innerHTML = task;

        containerTasks.appendChild(tr)
         
    })
    
    localStorage.setItem('tasks', JSON.stringify(listTasks));
    
    showAmountTask();
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


const textError = document.querySelectorAll('.error');
function mensageErrorForm(){
    textError.forEach(text => {
        text.innerText = 'Precisa preencher os campos'
        setTimeout(() => {
            text.innerText = ''    
        }, 2000);
        
    })
}




// CRUD

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
pegarValorDaCategoria();

function clearForm(){
    optionCategory = '';

    selectCategory.forEach(e => {
        e.classList.remove('active');    
    })
    titleTask.value = '';
    detailsTask.value = '';
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

function deleteItemTask(index){
    const boxTask = document.querySelectorAll('.data-task');

    boxTask[index].classList.add('animate__flipOutX')
    
    setTimeout(() => {      
     listTasks.splice(index,1);
     renderListTask();
    }, 700)
    
}

function callModalItemTask(index){

    containerModal.classList.toggle('active');
    trocarBotaoSalvarPorEditar();

    // COLOCAR OS VALORES DA TAREFA SELECIONADA
    console.log(listTasks[index]);
    titleTask.value = listTasks[index].title
    detailsTask.value = listTasks[index].description
    optionCategory = listTasks[index].category
    selectCategory.forEach(item => {
        console.log(item.innerText)
        if(listTasks[index].category === item.innerText){
            item.classList.add('active')
        }
    })

    buttonModalEdit.addEventListener('click', () => {
        editItemTask(index);
    });
    
}

function editItemTask(index){
      // listTasks[index].title = title;
    // listTasks[index].description = detailsTask;
    // listTasks[index].category = categoria;
    // listTasks[index].date = null;

    listTasks[index].title = titleTask.value;
    listTasks[index].description = detailsTask.value;
    console.log(optionCategory)
    listTasks[index].category = optionCategory;

    optionCategory = '';
    console.log(optionCategory)

    listTasks[index].date = null;
    renderListTask();
}

