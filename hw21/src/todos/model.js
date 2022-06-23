import Http from "../shared/http";
import axios from "axios";

export default class TodoModel{
    #http = null;
    #todos = null;
    constructor() {
        this.#http = new Http();
    }
    async getAllTodos(){
        this.#todos = await this.#http.getAll();
        return this.#todos;
    }
    deleteTodo(id){
        this.#http.delete(id);
    }
    editTodo(id,obj){
        return this.#http.edit(id,obj);
    }
    addTodo(obj){
        return this.#http.add({...obj,isComplete : false});
    }
}