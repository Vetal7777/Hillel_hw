const btnE = document.querySelector('.toggle-form__work-frame button');

const inpE = document.querySelector('.toggle-form__work-frame input');

const containerE = document.querySelector('div.container');

function onClick(){
    const newE = document.createElement('span');
    newE.textContent = inpE.value;
    containerE.append(newE);
    inpE.value = null;
}

btnE.addEventListener('click',onClick);