import './users.sass';
export default class UsersView{
    static  CLASSES = {
        usersContainer: 'users__container',
    }
    #container = null;
    constructor() {
    }
    createComponent(){
        return `
            <div class="${UsersView.CLASSES.usersContainer}">Users</div>
        `;
    }
    init(){
        this.#container = document
            .querySelector(`.${UsersView.CLASSES.usersContainer}`);
    }
}