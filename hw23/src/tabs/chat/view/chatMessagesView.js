export default class ChatMessagesView{
    static  CLASSES = {
        chatMessages: 'chat__messages',
        chatMessageItem: 'chat__message-item',
        chatMessagesFrom: 'chat__message-from',
        chatMessagesContent: 'chat__message-content',
        currentUser: 'current-user',
        chatTypingStatus: 'chat__typing',
    }
    #container = null;
    createComponent(){
        return `
            <div class="${ChatMessagesView.CLASSES.chatMessages}"></div>
            <div class="${ChatMessagesView.CLASSES.chatTypingStatus}"></div>
        `;
    }
    createMessage(message,currentUser){
        return `
            <div class="${ChatMessagesView.CLASSES.chatMessageItem} ${message.name === currentUser ? ChatMessagesView.CLASSES.currentUser : ''}">
                <span class="${ChatMessagesView.CLASSES.chatMessagesFrom}">${message.name}</span>
                <span class="${ChatMessagesView.CLASSES.chatMessagesContent}">${message.message}</span>
            </div>
        `;
    }
    init(){
        this.#container = document
            .querySelector(`.${ChatMessagesView.CLASSES.chatMessages}`);
    }
    async renderMessages(messages,currentUser){
        this.#container.innerHTML = messages.map(message => this.createMessage(message,currentUser)).join('');
        this.scrollToBottom();
    }
    renderNewMessage(message,currentUserName){
        this.#container.innerHTML += this.createMessage(message,currentUserName);
        this.scrollToBottom();
    }
    renderTyping(value){
        document
            .querySelector(`.${ChatMessagesView.CLASSES.chatTypingStatus}`)
            .innerHTML = value ? 'is typing...' : '';
    }
    scrollToBottom(){
        this.#container.scrollTop = this.#container.scrollHeight;
    }
}