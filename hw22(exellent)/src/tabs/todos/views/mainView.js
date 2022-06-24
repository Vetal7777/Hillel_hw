import TodoAddForm from "./addForm";
import TodoEditForm from "./editForm";
import TodoList from "./list";
import '../todo.sass';
import TodoController from "../controller";

export default class TodoMainView{
    static mainClasses = {
        todoComponentContainer: 'todo-component__container',
        todoComponentAddForm: 'todo-component__add-form',
        todoComponentList: 'todo-component__list',
        todoComponentEditForm: 'todo-component__edit-form',
        todoComponentInputTitleEdit: 'todo-component__input-title-edit',
        todoComponentInputBodyEdit: 'todo-component__input-body-edit',
        todoComponentButtonEdit: 'todo-component__button-edit',
        form: 'form',
    };
    #container = null;
    #listElement = null;
    #editFormElement = null;
    #addFormElement = null;
    #list = null;
    #editForm = null;
    #addForm = null;
    #options = null;
    constructor() {
        //нужно скачать options
    }
    addNewTodoElement(todo){
        this.#list
            .addNewTodoElement(todo);
    }
    createComponent(){
        return `
            <div class="${TodoMainView.mainClasses.todoComponentContainer}">
                <div class="${TodoMainView.mainClasses.todoComponentAddForm} ${TodoMainView.mainClasses.form}">
                    
                </div>
                <div class="${TodoMainView.mainClasses.todoComponentList}"></div>
                <div class="${TodoMainView.mainClasses.todoComponentEditForm} ${TodoMainView.mainClasses.form}"></div>
            </div>
        `;
    }
    editTodoElement(editedTodo){
        this.#list
            .editTodoElement(editedTodo);
        this.#editForm
            .hideForm();
    }
    getButtonForm(event){
        return this.getTargetForm(event)
            .querySelector('button');
    }
    getAllInputsForm(event){
        return [...this.getTargetForm(event)
            .querySelectorAll('input')];
    }
    getTargetForm(event){
        return event.target.closest('.form');
    }
    init(){
        this.setElements();
        this.setViews();
        this.setEventListeners();
        new TodoController(this.#container,this);
    }
    onClick = (event) =>{
        if(this.#list.deleteTodo(event)){
            const deletingTodo = this.#list.deleteTodo(event);
            this.#options
                .onDelete(deletingTodo);
        }
        if(this.#list.setComplete(event)){
            const todoId = this.#list.setComplete(event).id;
            this.#options
                .onComplete(todoId);
        }
        if(this.#addForm.addTodo(event)){
            const newTodo = this.#addForm.addTodo(event);
            this.#options
                .onAdd(newTodo)
            this.#addForm.clearInputsValue();
        }
        if(this.#list.startEditTodo(event)){
            const editionTodoId = this.#list.startEditTodo(event);
            const editionTodo = this.#options
                .onGetTodo(editionTodoId);
            this.#editForm
                .startWorkForm(editionTodoId,editionTodo);
        }
        if(this.#editForm.editTodo(event)){
            const fixesObj = this.#editForm.editTodo(event);
            this.#options
                .onEditTodo(fixesObj);
        }
    }
    renderList(todos){
       this.#list
           .renderTodos(todos);
    }
    setElements(){
        this.#container = document.querySelector(`.${TodoMainView.mainClasses.todoComponentContainer}`);
        this.#addFormElement = this.#container
            .querySelector(`.${TodoMainView.mainClasses.todoComponentAddForm}`);
        this.#listElement = this.#container
            .querySelector(`.${TodoMainView.mainClasses.todoComponentList}`);
        this.#editFormElement = this.#container
            .querySelector(`.${TodoMainView.mainClasses.todoComponentEditForm}`);
    }
    setEventListeners(){
        this.#container.addEventListener('click',this.onClick);
        this.#container.addEventListener('keyup',this.validateForm);
    }
    setCompletedTodoElement(id){
        this.#list
            .setCompletedTodoElement(id);
    }
    setOptions(options){
        this.#options = options;
    }
    setViews(){
        this.#addForm = new TodoAddForm(this.#addFormElement);
        this.#editForm = new TodoEditForm(this.#editFormElement);
        this.#list = new TodoList(this.#listElement);
    }
    validateForm = (event) =>{
        let validate = 1;
        if(this.getTargetForm(event)){
            this.getAllInputsForm(event)
                .forEach(input => {
                    validate *= this.validateInput(input);
                    (validate) ? this.getButtonForm(event).disabled = false : this.getButtonForm(event).disabled = true;
                });
        }
    }
    validateInput(input){
        if(input.value.trim()){
            return true;
        }else {
            return false
        }
    }
}