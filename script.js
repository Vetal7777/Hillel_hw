const todoContainerNameE = getE('list-container');
//Наш todo
const inpNameE = getE('inp-name');
//Нащ input name
const inpSurnameE = getE('inp-surname');
//Нащ input surname
const inpPhoneE = getE('inp-phone');
//Нащ input phone
const btnE = getE('btn');
//Наша кнопка
const SampleE = getE('sample')
//Наш шаблон

btnE.addEventListener('click',onAddTodo);
//При клике запуская функцию onAddTodo

function onAddTodo(){
    const name = inpNameE.value;
    //name - содержимое inpNameE
    const surname = inpSurnameE.value;
    //surname - содержимое inpSurnameE
    const phone = inpPhoneE.value;
    //phone - содержимое inpPhoneE
    if(
        !name.trim()
        || !surname.trim()
        || !phone.trim()
        || !Number(phone)
    ){
        alert('Please add some text to todo');
        clearValue(inpPhoneE);
        inpPhoneE.focus();
        return;
    }
    //Условие если пустой один из input
    const todoE = createToDoE(name,surname,phone);
    //Константа ...E - это теперь наш HTML который мы создали с
    //помощью функции
    addElement(todoE,todoContainerNameE);
    //Добавляем наш элемент в наш ul
    clearValue(inpNameE);
    clearValue(inpSurnameE);
    clearValue(inpPhoneE);
//    Чистим все
    inpNameE.focus();
}

function addElement(elem,container){
    container.innerHTML += elem;
}
function clearValue(inputE){
    inputE.value = '';
}

function getE(id){
    return document.getElementById(`${id}`);
}
//My func
//get element

function createToDoE(Name,Surname,Phone){
    const result = SampleE.innerHTML
        .replace(`{{Name}}`,Name)
        .replace(`{{Surname}}`,Surname)
        .replace(`{{Phone}}`,Phone);
    //ставит вместо элементов который мы указали - значения input
    return result;
}
//My func
//get HTML