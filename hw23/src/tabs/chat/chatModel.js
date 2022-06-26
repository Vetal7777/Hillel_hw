import Http from "../../shared/http";
import { io } from 'socket.io-client';
import axios from "axios";

export default class ChatModel{
    #API_url = null;
    #currentUser = null;
    #http = null;
    #socket = null;
    #messages = null;
    #options = null;
    constructor(options) {
        this.#http = new Http;
        this.#options = options;
        this.#currentUser = null;
        this.setAPI();
        this.#socket = io(this.#API_url);
        this.readNewMessages();
        this.readTyping();
        //не можешь проверить потому что не можешь отправить
    }
    getCurrentUser(){
        this.setCurrentUser();
        this.#socket.emit('join',this.#currentUser);
        // this.#socket.on('join',(r) => console.log(r))
        return this.#currentUser;
    }
    async getMessages(){
        this.#messages = await axios(this.#API_url + 'getMessages')
            .then(response => response.data);
        return this.#messages
    }
    readNewMessages(){
        this.#socket.on('message',(message) => {
            this.#messages.push(message);
            this.#options.addMessage(message);
            console.log(message)
        });
    }
    readTyping = () => this.#socket.on('typing',(response) => this.#options.renderTyping(response.isTyping));
    setAPI(){
        this.#API_url = this.#http.getUrl();
    }
    setCurrentUser(){
        this.#currentUser = prompt('Enter name please','Vitalii');
        // this.#currentUser = 'Vitalii';
    }
    sendMessage(message){
        this.#socket.emit('createMessage',{
            name: this.#currentUser,
            message,
        });
    }
    sendTyping = (value) => this.#socket.emit('typing',{isTyping: value,});
}