//#region BUSCA DE TAGS NO HTML
const addTask = document.getElementById('btn-add-task');
const containerModal = document.querySelector('#container-modal');
const buttonModalEsc = document.querySelector('#modal-button-esc');
const buttonModalCancel = document.querySelector('#button-cancel-task');
const buttonModalSave = document.querySelector('#button-save-task');
const buttonModalEdit = document.querySelector('#button-edit-task');
const containerTasks = document.querySelector('#container-tasks');
const optionsCategories = document.querySelector('#modal-select-category');

//#endregion

//#region CHAMAR MODAL E FECHAR MODAL
addTask.addEventListener('click', callModalTask);
buttonModalEsc.addEventListener('click', escModalTask);
buttonModalCancel.addEventListener('click', escModalTask)

function escModalTask(){  
   containerModal.classList.toggle('active');
}
function callModalTask(){       
   containerModal.classList.toggle('active'); 
   
}
function trocarBotaoEditarPorSalvar(){
    const save = buttonModalSave.classList.value.includes('none');
    if(save){
        buttonModalSave.classList.remove('none');
        buttonModalEdit.classList.add('none');
    }
}
function trocarBotaoSalvarPorEditar(){
    const edit = buttonModalEdit.classList.value.includes('none');
    if(edit){
        buttonModalSave.classList.add('none');
        buttonModalEdit.classList.remove('none');
    }
}
//#endregion

//#region OBJETOS COM VALORES PARA RENDERIZAR
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

//#region ATUALIZAR QUANTIDADE DE TAREFAS PENDENTES

let containerAmountList = document.querySelector("#description-title");

function showAmountTask(){
    amount = listTasks.length;

    let p = `Você tem <span id="span-description-task"> <span id="value-tasks">${amount} </span>${amount !== 1 ? "tarefas" : "tarefa"}</span> ${amount !== 1 ? "listadas" : "listada"}`

    containerAmountList.innerHTML = p;

}
//#endregion

//#region RENDERIZAÇÃO

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
                    <i id="task-edit" onClick="editItemTask(${index})" class="task-icon fa-solid fa-pen"></i>
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
//#endregion

//#region CRUD
const titleTask = document.querySelector('#title-task-modal');
const detailsTask = document.querySelector('#details-form');
const qtdTasks = document.querySelector('#value-tasks');
const textError = document.querySelectorAll('.error');
const selectCategory = document.querySelectorAll('.category-list');

let optionCategory = '';

function mensageErrorForm(){
    textError.forEach(text => {
        text.innerText = 'Precisa preencher os campos'
        setTimeout(() => {
            text.innerText = ''    
        }, 2000);
        
    })
}
// CHAMA FUNÇÃO DE INSERIR TAREFAS
buttonModalSave.addEventListener('click', addTaskList);

// PEGAR VALOR DA CATEGORIA AO INSERIR NO FORM
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
// LIMPAR FORMULARIO
function clearForm(){
    optionCategory = '';

    selectCategory.forEach(e => {
        e.classList.remove('active');    
    })
    titleTask.value = '';
    detailsTask.value = '';
}
// ADICIONAR TAREFA
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
// DELETAR TAREFA
function deleteItemTask(index){
    listTasks.splice(index,1);
    renderListTask();
}
// EDITAR TAREFA
function editItemTask(index){
    // listTasks[index].title = title;
    // listTasks[index].description = detailsTask;
    // listTasks[index].category = categoria;
    // listTasks[index].date = null;
    
    listTasks[index].title = 'title';
    listTasks[index].description = 'detailsTask';
    listTasks[index].category = 'categoria';
    listTasks[index].date = null;
    renderListTask();
}
//#endregion

//#region CHAMAR FUNÇÕES DE INICIALIZAÇÃO
 renderListTaskLocal();
 renderCategories();
 pegarValorDaCategoria();
//#endregion