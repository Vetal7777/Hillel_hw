import TodoModel from "./model";

export default class TodoController{
    #container = null;
    #options = null;
    #view = null;
    #model = null;
    #todos = null;
    constructor(container,view) {
        this.#container = container;
        this.#options = {
            onDelete: this.deleteTodo,
            onComplete: this.completeTodo,
            onAdd: this.onAddTodo,
            onGetTodo: this.getTodo,
            onEditTodo: this.editTodo,
            onGetTodos: this.init
        };
        this.#view = view;
        this.#model = new TodoModel();
        this.init();
    }
    completeTodo = (id) => {
        const obj = this.#todos
            .find(todo => todo.id === id);
        obj.isComplete = true;
        this.#model
            .editTodo(id,obj);
        this.#view
            .setCompletedTodoElement(obj.id);
    }
    deleteTodo = (id) =>{
        this.#model
            .deleteTodo(id);
    }
    editTodo = (fixesObj) => {
        let editionTodo = this.getTodo(fixesObj.id);
        delete fixesObj.id;
        editionTodo = this.convertEditionTodo(editionTodo,fixesObj);
        const editedTodo = this.#model
            .editTodo(editionTodo.id,editionTodo);
        this.#view
            .editTodoElement(editedTodo);

    }
    convertEditionTodo(todo,fixesObj){
        Object.keys(fixesObj)
            .forEach(key => {
                todo[key] = fixesObj[key];
            })
        return todo;
    }
    getOptions(){
        return this.#options;
    }
    getTodo = (id) =>{
        return this.#todos
            .find(todo => todo.id === id);
    }
    init = () =>{
        return this.#model
            .getAllTodos()
            .then(r => this.#todos = r);
    }
    onAddTodo = (obj) =>{
        const addedTodo = this.#model
            .addTodo(obj);
        this.#view
            .addNewTodoElement(addedTodo);
    }
}