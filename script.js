const todoContainerE = getE('list-container');
//Наша Todo phone поле с результатом
const reminderElements = document.querySelectorAll('#reminder-one');
const inpE = getE('inp');
//Нащ input name
const btnE = getE('btn');
//Наша кнопка
const SampleE = (reminder) =>
    `<div id="reminder-one">
        ${reminder}
        <span id="exit">x</span>
    </div>`;
//Наш шаблон

btnE.addEventListener('click',onAddTodo);
//При клике запуская функцию onAddTodo
todoContainerE.addEventListener("click", onClickDo);
//При клике на крестик запускается функция onClickDeleteReminder

function onAddTodo(){
    const inp = inpE.value;
    //name - содержимое inpNameE
    validate(inpE);
    //Условие если пустой один из input
    const resultE = SampleE(inp);
    //Константа ...E - это теперь наш HTML который мы создали с
    //помощью функции
    addElement(resultE,todoContainerE);
    //Добавляем наш элемент в наш ul
    clearValue(inpE);
//    Чистим все
    inpE.focus();
}

function addElement(elem,container){
    container.innerHTML += elem;
}
//Добовляем новый элемент в контейнер

function clearValue(inputE){
    inputE.value = '';
}
//Чистит элемент

function getE(id){
    return document.getElementById(`${id}`);
}
//My func
//get element

function validate(input){
    if(!(input.value).trim()){
        alert('Please add some text to todo');
        input.focus();
    }
    //Условие если пустой один из input
}
//Валидация input

function onClickDo(event) {
    if (event.target.id === "exit") {
        //если id обьекта на который мы нажали = exit то происходит следующее
        const item = event.target.closest("#reminder-one");
        //переменная item = все html элемента до родителя с классом .table-items-wrapper
        item.remove();
        //Удаляем данную переменную
    }else if (event.target.id === 'reminder-one'){
        //если id обьекта на который мы нажали = list-containe то происходит следующее
        const item = event.target.closest("#reminder-one");
        item.classList.toggle('yellow');
    }
}