import '../chat.sass';
import ChatController from "../chatController";
import ChatMessagesView from "./chatMessagesView";
import ChatInputView from "./chatInputView";
export default class ChatMainView {
    static  CLASSES = {
        chatContainer: 'chat__container',
        chatWorkContainer: 'chat__work-container',
    }
    #container = null;
    #controller = null;
    #input = null;
    #messages = null;
    #options = null;
    constructor(options) {
        this.#options = options;
        this.setViews();
    }
    createComponent(){
        return `
            <div class="${ChatMainView.CLASSES.chatContainer}">
                <div class="${ChatMainView.CLASSES.chatWorkContainer}">
                    ${this.createInner([this.#messages,this.#input])}
                </div>
            </div>
        `;
    }
    createInner(views){
        return views.map(view => view.createComponent()).join('')
    }
    getCurrentUserName(){
        return this.#controller.getCurrentUserName();
    }
    init(){
        this.#container = document
            .querySelector(`.${ChatMainView.CLASSES.chatContainer}`);
        this.#controller = new ChatController(this);
        this.#options = this.#controller.setOptions()
        this.initInnerViews([this.#input,this.#messages]);
    }
    initInnerViews(views){
        views.forEach(view => view.init())
    }
    renderMessages(messages){
        this.#messages.renderMessages(messages,this.getCurrentUserName());
    }
    renderNewMessage = (message) => this.#messages.renderNewMessage(message,this.getCurrentUserName());
    renderTyping = (value) => this.#messages.renderTyping(value);
    sendMessage = (message) =>{
        this.#options.sendMessage(message);
    }
    sendTyping = (value) => this.#controller.sendTyping(value);
    setViews(){
        this.#input = new ChatInputView({
            sendMessage: this.sendMessage.bind(this),
            sendTyping : this.sendTyping.bind(this),
        });
        this.#messages = new ChatMessagesView;
    }
}