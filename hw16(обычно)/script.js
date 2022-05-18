const btnE = document.getElementById('btn');
//Наша кнопка
const inpE = document.getElementById('inp');
//Наш input
const containerE = document.getElementById('container');
//Контейнер для нашего результата

inpE.value = 'vetal7777';
//стандартный логин для теста

btnE.addEventListener('click',doOnClick);
//Добавляем кнопке addEventListener при клике запуск функции
// - onGetTodo

function doOnClick(){
    const userUrl = setUrl();
    const userPromise = getGitPromise(userUrl);
    userPromise
        .then((resp) => {
        console.log(resp);
        return renderUser(resp);
    })
        .catch(error => containerE.innerHTML = `
            <div class="error">
                ${error}
            </div>`);
}

function setUrl(){
    return `https://api.github.com/users/${inpE.value}`
}

function getGitPromise(url){
    return fetch(url)
        .then((resp) => {
            if(resp.status === 404){
                throw new Error(`404`);
            }
            return resp.json();
        })
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

function renderError(){
    containerE.innerHTML = `<div class="user__error">Error</div>`;
}

