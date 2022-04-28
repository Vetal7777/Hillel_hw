const todoContainerE = getE('list-container');
//Наша Todo phone поле с результатом
const reminderElements = document
    .querySelectorAll('#reminder-one');
const inpE = getE('inp');
//Нащ input name
const btnE = getE('btn');
//Наша кнопка
const errorE = document
    .querySelector('.error');
//контейнер ошибки
const SampleE = (reminder) =>
    `<div id="reminder-one">
        <span class="condition">
            <span></span>
        </span>
        <p>${reminder}</p>
        <span id="exit">
            <span></span>
            <span></span>
        </span>
    </div>`;
//Наш шаблон

btnE.disabled = true;
//Поумолчанию кнопка не активна
inpE.addEventListener('keyup',forInput);
//При отпускании клавиши запускается функция validateTodo
btnE.addEventListener('click',onAddTodo);
//При клике запуская функцию onAddTodo
todoContainerE.addEventListener("click", onClickDo);
//При клике на крестик запускается функция onClickDeleteReminder
inpE.focus();
//Фокус ставим на input

function onAddTodo(){
    const inp = inpE.value;
    //name - содержимое inpNameE
    if(!(inpE.value).trim()){
        alert('Please add some text to todo');
        inpE.focus();
        return;
    }
    //Условие если пустой один из input
    const resultE = SampleE(inp);
    //Константа ...E - это теперь наш HTML который мы создали с
    //помощью функции
    addElement(resultE,todoContainerE);
    //Добавляем наш элемент в наш ul
    clearValue(inpE);
//    Чистим все
    inpE.focus();
//    Фокус ставим на input
    btnE.disabled = true;
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

function onClickDo(event) {
    if (event.target.id === "exit") {
        //если id обьекта на который мы нажали = exit то происходит следующее
        const item = event.target.closest("#reminder-one");
        //переменная item = все html элемента до родителя с классом .table-items-wrapper
        item.remove();
        //Удаляем данную переменную
    }
    const item = event.target.closest("#reminder-one");
    item.classList.toggle('yellow');
}
//Удаление при клике на соответвующую кнопку

function validateTodo(e){
    if(!e.target.value.trim()){
        //если элемент пустой или одни пробелы
        errorE.innerText = '';
        //то текст внутри errorE пустой
        btnE.disabled = true;
        //Кнопка не активна
        if([...errorE.classList].includes('active')){
            errorE.classList.toggle('active');
        }
        //Если у элемента errorE есть класс active
        //то мы его удаляем
        return;
        //Выходим из функции
    }
    if(e.target.value.trim().length <= 3){
        //Если текст меньше или равен трем символам
        errorE.innerText = 'Error , lenght should be > 3';
        //То выскакивает ошибка
        btnE.disabled = true;
        //Кнопка не активна
        if(![...errorE.classList].includes('active')){
            errorE.classList.toggle('active');
        }
        //Если у элемента errorE нету класса active
        //то мы его добавляем
        return;
        //Выходим
    }
    if([...errorE.classList].includes('active')){
        errorE.classList.toggle('active');
    }
    //Если у элемента errorE есть класс active
    //то мы его удаляем
    errorE.innerText = '';
    //В других случиях поле ошибки пустое
    btn.disabled = false;
    //Кнопка активна
}
//Валидация Todo

function enterInput(e){
    if(btnE.disabled === false
        && e.keyCode === 13){
        onAddTodo();
    }
}
//При нажатии Enter запускается функция onAddTodo

function shiftBackspaceInput(e){
    if(e.keyCode === 8 && e.shiftKey === true){
       inpE.value = '';
    }
}
//Удаляет при сочетании клавиш shift + backspace

function forInput(e){
    shiftBackspaceInput(e);
    enterInput(e);
    validateTodo(e);
}
//Функции для input