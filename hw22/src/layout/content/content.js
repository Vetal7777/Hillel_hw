import './content.sass';
import chatView from "../../tabs/chat/chat";
import usersView from "../../tabs/users/users";
import TodoMainView from "../../tabs/todos/todosViews/mainView";
export default class MainContentView{
    static  CLASSES = {
        mainContent: 'main__content',
    }
    #chatView = null;
    #contentContainer = null;
    #LINKS = null;
    #mainContainer = null;
    #selectedLink = 'todos';
    #todosView = null;
    #usersView = null;
    constructor(mainContainer,links) {
        this.#mainContainer = mainContainer;
        this.#LINKS = links;
        setTimeout(() => this.init(), 0);
    }
    createMainContent(){
        return `
            <div class="${MainContentView.CLASSES.mainContent}"></div>
        `;
    }
    init(){
        this.#contentContainer = this.#mainContainer
            .querySelector(`.${MainContentView.CLASSES.mainContent}`)
        this.#chatView = new chatView(this.#contentContainer);
        this.#usersView = new usersView(this.#contentContainer);
        this.#todosView = new TodoMainView(this.#contentContainer);
        this.#LINKS.chat = this.#chatView.createChat;
        this.#LINKS.users = this.#usersView.createUsers;
        this.#LINKS.todos = this.#todosView.createComponent;
        this.switchContent(this.#selectedLink);
    }
    switchContent(link){
        this.#contentContainer.innerHTML = this.#LINKS[link]();
    }
}