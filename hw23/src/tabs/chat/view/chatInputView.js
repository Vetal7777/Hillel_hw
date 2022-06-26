export default class ChatInputView{
    static  CLASSES = {
        chatInputContainer: 'chat__input-container',
    }
    #container = null;
    #options = null;
    #input = null;
    #button = null;
    constructor(options) {
        this.#options = options;
    }
    createComponent(){
        return `
            <div class="${ChatInputView.CLASSES.chatInputContainer}">
                <input type="text" placeholder="message">
                <button disabled>Send</button>    
            </div>
        `;
    }
    init(){
        this.#container = document
            .querySelector(`.${ChatInputView.CLASSES.chatInputContainer}`);
        this.#input = this.#container.querySelector('input');
        this.#button = this.#container.querySelector('button');
        this.#container.addEventListener('keyup',this.validateForm);
        this.setEventListeners();
    }
    onClick = () => {
        this.#options.sendMessage(this.#input.value);
        this.#input.value = '';
        this.#button.disabled = true;
    }
    onTyping = () => {
        this.#options.sendTyping(true);
        setTimeout(() => this.#options.sendTyping(false),5000);
    }
    setEventListeners(){
        this.#button
            .addEventListener('click',this.onClick);
        this.#input
            .addEventListener('keyup',this.onTyping);
    }
    validateForm = () => {
        (this.#input.value.trim())
            ? this.#button.disabled = false
            : this.#button.disabled = true
    }
}