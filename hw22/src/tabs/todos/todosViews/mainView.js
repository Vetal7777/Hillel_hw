import TodoAddForm from "./addForm";
import TodoEditForm from "./editForm";
import TodoList from "./list";
import './../todo.sass';
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
    #controller = null;
    #list = null;
    #editForm = null;
    #addForm = null;
    #options = null;
    constructor(container) {
        this.#container = container;
        this.#controller = new TodoController(container,this);
        this.#options = this.#controller.getOptions();
        this.init();
    }
    addNewTodoElement(todo){
        this.#list
            .addNewTodoElement(todo);
    }
    createComponent = () =>{
        setTimeout(() => this.setContainers(),0);
        setTimeout(() => this.#list.createTodos(this.#options.onGetTodos()),0);
        return `
            <div class="${TodoMainView.mainClasses.todoComponentContainer}">
                <div class="${TodoMainView.mainClasses.todoComponentAddForm} ${TodoMainView.mainClasses.form}">
                    ${this.#addForm.createAddForm()}
                </div>
                <div class="${TodoMainView.mainClasses.todoComponentList}"></div>
                <div class="${TodoMainView.mainClasses.todoComponentEditForm} ${TodoMainView.mainClasses.form} hide">
                    ${this.#editForm.createEditForm()}
                </div>
            </div>
        `;
    }
    editTodoElement(editedTodo){
        this.#list
            .editTodoElement(editedTodo);
        this.#editForm
            .hideForm();
    }
    getAllInputsForm(event){
        return [...this.getTargetForm(event)
            .querySelectorAll('input')];
    }
    getButtonForm(event){
        return this.getTargetForm(event)
            .querySelector('button');
    }
    getTargetForm(event){
        return event.target.closest('.form');
    }
    init(){
        this.setViews();
        this.setEventListeners();

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
    setCompletedTodoElement(id){
        this.#list
            .setCompletedTodoElement(id);
    }
    setContainers(){
        this.#addForm.setContainer();
        this.#list.setContainer();
        this.#editForm.setContainer();
    }
    setEventListeners(){
        this.#container.addEventListener('click',this.onClick);
        this.#container.addEventListener('keyup',this.validateForm);
    }
    setViews(){
        this.#addForm = new TodoAddForm(this.#container);
        this.#editForm = new TodoEditForm(this.#container);
        this.#list = new TodoList(this.#container);
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