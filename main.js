const addTask = document.getElementById('btn-add-task');
const containerModal = document.querySelector('#container-modal');
const buttonModalEsc = document.querySelector('#modal-button-esc');
const buttonModalCancel = document.querySelector('#button-cancel-task');
const buttonModalSave = document.querySelector('#button-cancel-task');

addTask.addEventListener('click', callModalTask);
buttonModalEsc.addEventListener('click', callModalTask);
buttonModalCancel.addEventListener('click', callModalTask);
buttonModalSave.addEventListener('click', callModalTask);

function callModalTask(){
    containerModal.classList.toggle('active');
}