const btnE = document.getElementById('btn');
//Наша кнопка
const inpE = document.getElementById('inp');
//Наш input
const containerE = document.getElementById('container');
//Контейнер для нашего результата
inpE.focus();
inpE.value = 'vetal7777';
//стандартный логин для теста

const user = new GitHubUser();
//Наш новый юзер

btnE.addEventListener('click',doOnClick);
//Добавляем кнопке addEventListener при клике запуск функции
// - onGetTodo

function doOnClick(){
    user.userName = inpE.value;
    console.log(user);
    user.userPromise
        .then(resp => renderUser(resp))
        .catch(error => renderError(error));
}

function renderUser(userObj){
    containerE.innerHTML = `<div class="user">
        <div class="user__avatar">
            <img src="${userObj.avatar_url}" alt="user-avatar">
        </div>
        <div class="user__info">
            <span>Repositories : ${userObj.public_repos}</span>
            <span>Followers : ${userObj.followers}</span>
            <span>Following : ${userObj.following}</span>
        </div>
    </div>`;
}

function renderError(error){
    containerE.innerHTML = `
            <div class="user__error">
                ${error}
            </div>`;
}