import Http from "../../shared/http";

export default class TodoModel{
    #http = null;
    #todos = null;
    constructor() {
        this.#http = new Http();
    }
    getAllTodos(){
        return this.#http.getAll()
            .then(r => this.#todos = r);
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