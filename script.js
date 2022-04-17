const todoContainerNameE = getE('name-list');
//Наша Todo name поле с результатом
const todoContainerSurnameE = getE('surname-list');
//Наша Todo surname поле с результатом
const todoContainerPhoneE = getE('phone-list');
//Наша Todo phone поле с результатом
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
    ){
        alert('Please add some text to todo');
        return;
    }
    //Условие если пустой один из input
    const NameE = createToDoE(name);
    const SurnameE = createToDoE(surname);
    const PhoneE = createToDoE(phone);
    //Константа ...E - это теперь наш HTML который мы создали с
    //помощью функции
    addElement(NameE,todoContainerNameE);
    addElement(SurnameE,todoContainerSurnameE);
    addElement(PhoneE,todoContainerPhoneE);
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

function createToDoE(elem){
    const result = SampleE.innerHTML.replace(`{{sample}}`,elem);
    //ставит вместо элементов который мы указали - значения input
    return result;
}
//My func
//get HTML