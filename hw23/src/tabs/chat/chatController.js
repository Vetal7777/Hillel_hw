import ChatModel from "./chatModel";

export default class ChatController{
    #view = null;
    #model = null;
    #currentUser = null;
    constructor(view) {
        this.#view = view;
        this.#model = new ChatModel({
            addMessage: this.renderNewMessage,
            renderTyping: this.renderTyping,
        });
        this.getCurrentUser();
        this.getMessages();
    }
    getCurrentUser(){
        this.#currentUser = this.#model.getCurrentUser();
        return this.#currentUser;
    }
    getCurrentUserName(){
        return this.#currentUser;
    }
    async getMessages(){
        const messages = await this.#model.getMessages();
        this.#view.renderMessages(messages);
    }
    renderNewMessage = (message) => this.#view.renderNewMessage(message);
    renderTyping = (value) => this.#view.renderTyping(value)
    sendMessage(message) {
        this.#model.sendMessage(message);
    };
    sendTyping = (value) => this.#model.sendTyping(value);
    setOptions  = () => {
        return  {sendMessage: this.sendMessage.bind(this),}
    };

}