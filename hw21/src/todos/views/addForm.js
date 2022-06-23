export default class TodoAddForm{
    static addFormClasses = {
        startClasses: 'todo-component__input-',
        endClasses: '-add',
        todoComponentInputTitleAdd: 'todo-component__input-title-add',
        todoComponentInputBodyAdd: 'todo-component__input-body-add',
        todoComponentButtonAdd: 'todo-component__button-add',
    };
    #container = null;
    constructor(container) {
        this.init(container);
    }
    addTodo(event){
        if(event.target.closest(`.${TodoAddForm.addFormClasses.todoComponentButtonAdd}`)){
            return this.getAllInputs()
                .reduce((newTodo,input) => {
                    newTodo[input.classList[0]
                        .replace(`${TodoAddForm.addFormClasses.startClasses}`,'')
                        .replace(`${TodoAddForm.addFormClasses.endClasses}`,'')]
                    = input.value;
                    return newTodo;
                },{});
        }
    }
    createAddForm(){
        return `
            <input type="text" placeholder="title" class="${TodoAddForm.addFormClasses.todoComponentInputTitleAdd}">
            <input type="text" placeholder="body" class="${TodoAddForm.addFormClasses.todoComponentInputBodyAdd}">
            <button disabled class="${TodoAddForm.addFormClasses.todoComponentButtonAdd}">Add Todo</button>
        `;
    }
    clearInputsValue(){
        this.getAllInputs()
            .forEach(input => input.value = '');
    }
    getAllInputs(){
        return [...this.#container
            .querySelectorAll('input')];
    }
    init(container){
        this.#container = container;
        this.renderAddForm();
    }
    renderAddForm(){
        this.#container.innerHTML = this.createAddForm();
    }
}