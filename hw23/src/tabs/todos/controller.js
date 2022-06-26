import TodoMainView from "./views/mainView";
import TodoModel from "./model";

export default class TodoController{
    #container = null;
    #view = null;
    #model = null;
    #todos = null;
    constructor(container,view) {
        this.#container = container;
        this.#view = view;
        this.#view.setOptions(
            {
            onDelete: this.deleteTodo,
            onComplete: this.completeTodo,
            onAdd: this.onAddTodo,
            onGetTodo: this.getTodo,
            onEditTodo: this.editTodo,
        });
        this.#model = new TodoModel();
        this.init();
    }
    completeTodo = async (id) => {
        const obj = this.#todos
            .find(todo => todo.id === id);
        obj.isComplete = true;
        const editedTodo = await this.#model
            .editTodo(id,obj);
        this.#view
            .setCompletedTodoElement(editedTodo.id);
    }
    deleteTodo = (id) =>{
        this.#model
            .deleteTodo(id);
    }
    editTodo = async(fixesObj) => {
        let editionTodo = this.getTodo(fixesObj.id);
        delete fixesObj.id;
        editionTodo = this.convertEditionTodo(editionTodo,fixesObj);
        const editedTodo = await this.#model
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
    getTodo = (id) =>{
        return this.#todos
            .find(todo => todo.id === id);
    }
    async init(){
        this.#todos = await this.#model
            .getAllTodos();
        this.#view
            .renderList(this.#todos);
    }
    onAddTodo = async (obj) =>{
        const addedTodo = await this.#model
            .addTodo(obj);
        this.#view
            .addNewTodoElement(addedTodo);
    }
}