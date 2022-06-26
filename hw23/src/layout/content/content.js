import './content.sass';
import UsersView from "../../tabs/users/usersView";
import ChatMainView from "../../tabs/chat/view/chatMainView";
import TodoMainView from "../../tabs/todos/views/mainView";
export default class MainContentView{
    static  CLASSES = {
        mainContent: 'main__content',
    }
    #LINKS = {};
    #container = null;
    #chatView = null;
    #todosView = null;
    #usersView = null;
    constructor(links) {
        this.#LINKS = links;
    }
    createComponent(){
        return `
            <div class="${MainContentView.CLASSES.mainContent}"></div>
        `;
    }
    init(){
        this.setContainer();
        this.#usersView = new UsersView();
        this.#chatView = new ChatMainView();
        this.#todosView = new TodoMainView();
        this.#LINKS.chat = this.#chatView;
        this.#LINKS.users = this.#usersView;
        this.#LINKS.todos = this.#todosView;
    }
    renderSelectedComponent(selectedComponentName){
        this.#container.innerHTML = this.#LINKS[selectedComponentName].createComponent();
        this.#LINKS[selectedComponentName].init();
    }
    setContainer(){
        this.#container = document
            .querySelector(`.${MainContentView.CLASSES.mainContent}`);
    }
}