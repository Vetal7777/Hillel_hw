import './chat.sass';
export default class chatView{
    static  CLASSES = {
        chatContainer: 'chat__container',
    }
    #container = null;
    #chatContainer = null;
    constructor(container) {
        this.#container = container;
        setTimeout(() => this.init(), 0);
    }
    createChat(){
        return `
            <div class="${chatView.CLASSES.chatContainer}">Chat</div>
        `;
    }
    init(){
        this.#chatContainer = this.#container
            .querySelector(`.${chatView.CLASSES.chatContainer}`);
    }
}