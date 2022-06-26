import Http from "../../shared/http";

export default class TodoModel{
    #endpoint = 'todos/'
    #http = null;
    #todos = null;
    constructor() {
        this.#http = new Http();
    }
    async getAllTodos(){
        this.#todos = await this.#http.getAll(this.#endpoint);
        return this.#todos;
    }
    deleteTodo(id){
        this.#http.delete(id,this.#endpoint);
    }
    editTodo(id,obj){
        return this.#http.edit(id,obj,this.#endpoint);
    }
    addTodo(obj){
        return this.#http.add({...obj,isComplete : false},this.#endpoint);
    }
}