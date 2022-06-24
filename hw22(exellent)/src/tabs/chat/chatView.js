import './chat.sass';
export default class ChatView{
    static  CLASSES = {
        chatContainer: 'chat__container',
    }
    #container = null;
    constructor() {
    }
    createComponent(){
        return `
            <div class="${ChatView.CLASSES.chatContainer}">Chat</div>
        `;
    }
    init(){
        this.#container = document
            .querySelector(`.${ChatView.CLASSES.chatContainer}`);
    }
}