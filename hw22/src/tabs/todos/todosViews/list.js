export default class TodoList{
    static listClasses = {
        startClasses: 'todo-item__',
        todoComponentList: 'todo-component__list',
        todoItemContainer: 'todo-item__container',
        todoItemContent: 'todo-item__content',
        todoItemControl: 'todo-item__control',
        todoItemTitle: 'todo-item__title',
        todoItemBody: 'todo-item__body',
        todoItemIsComplete: 'todo-item__is-complete',
        todoItemDelete: 'todo-item__delete',
        completed: 'completed',
        edition: 'edition',
    };
    #listContainer = null;
    #mainContainer = null;
    #selectedTodo = null;
    constructor(container) {
        this.init(container);
    }
    addNewTodoElement(todo){
        todo.then(r => this.#listContainer.insertAdjacentHTML('afterbegin',this.createTodo(r)))
    }
    cancelEditionTodo(todo){
        todo.classList.remove(TodoList.listClasses.edition);
    }
    createTodos = (todos) =>{
        this.#listContainer =this.#mainContainer.querySelector(`.${TodoList.listClasses.todoComponentList}`);
        todos.then(r => this.#listContainer.innerHTML = r.map(this.createTodo).join(''));
    }
    createTodo(todo){
        return `
            <div class="${TodoList.listClasses.todoItemContainer} ${(todo.isComplete) ? TodoList.listClasses.completed : ''}" id="${todo.id}">
                <div class="${TodoList.listClasses.todoItemContent}">
                    <span class="${TodoList.listClasses.todoItemTitle}">${todo.title}</span>
                    <span class="${TodoList.listClasses.todoItemBody}">${todo.body}</span>
                </div>
                <div class="${TodoList.listClasses.todoItemControl}">
                    <button class="${TodoList.listClasses.todoItemIsComplete}">Complete</button>
                    <button class="${TodoList.listClasses.todoItemDelete}">Delete</button>
                </div>
            </div>
        `;
    }
    deleteTodo(event){
        if(event.target.closest(`.${TodoList.listClasses.todoItemDelete}`)){
            this.getSelectedTodo(event);
            this.deleteTodoElement(this.#selectedTodo);
            return this.#selectedTodo.id;
        }
    }
    deleteTodoElement(todoElement){
        todoElement.remove();
    }
    editTodoElement(editedTodo){
        const todoElement = this.#mainContainer
            .querySelector(`.${TodoList.listClasses.edition}`);
        editedTodo.then(r => Object.keys(r)
            .forEach(key => {
                const contentClass = TodoList.listClasses.startClasses + key;
                if(Object.values(TodoList.listClasses).includes(contentClass)){
                    todoElement
                        .querySelector(`.${contentClass}`)
                        .innerHTML = r[key];
                    this.cancelEditionTodo(todoElement);
                }
            }))
    }
    searchLastEditSelectTodo(){
        return this.#mainContainer
            .querySelector(`.${TodoList.listClasses.edition}`);
    }
    setComplete(event){
        if(event.target.closest(`.${TodoList.listClasses.todoItemIsComplete}`)){
            this.getSelectedTodo(event);
            return this.#selectedTodo;
        }
    }
    setCompletedTodoElement(id){
        [...this.#listContainer.children]
            .find(todoElement => todoElement.id === id)
            .classList
            .add(TodoList.listClasses.completed);
    }
    setDefaultAppearance(todo){
        if(todo) todo.classList.remove(TodoList.listClasses.edition);
    }
    setEditionTodo(todoElement){
        todoElement.classList.add(TodoList.listClasses.edition);
    }
    startEditTodo(event){
        if(event.target.closest(`.${TodoList.listClasses.todoItemContent}`)){
            this.getSelectedTodo(event);
            this.setDefaultAppearance(this.searchLastEditSelectTodo());
            this.setEditionTodo(this.#selectedTodo);
            return this.#selectedTodo.id;
        }
    }
    getSelectedTodo(event){
        this.#selectedTodo = event.target.closest(`.${TodoList.listClasses.todoItemContainer}`);
    }
    init(container){
        this.#mainContainer = container;
    }
}