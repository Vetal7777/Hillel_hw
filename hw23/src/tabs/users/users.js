import './users.sass';
export default class usersView{
    static  CLASSES = {
        usersContainer: 'users__container',
    }
    #container = null;
    #usersContainer = null;
    constructor(container) {
        this.#container = container;
        setTimeout(() => this.init(), 0);
    }
    createUsers(){
        return `
            <div class="${usersView.CLASSES.usersContainer}">Users</div>
        `;
    }
    init(){
        this.#usersContainer = this.#container
            .querySelector(`.${usersView.CLASSES.usersContainer}`);
    }
}