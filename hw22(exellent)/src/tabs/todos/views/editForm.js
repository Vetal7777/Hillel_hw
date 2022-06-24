export default class TodoEditForm{
    static editFormClasses = {
        startClasses : 'todo-component__input-',
        endClasses: '-edit',
        todoComponentInputTitleEdit: 'todo-component__input-title-edit',
        todoComponentInputBodyEdit: 'todo-component__input-body-edit',
        todoComponentButtonEdit: 'todo-component__button-edit',
        hide: 'hide',
    };
    static editFormIds = {
      startIds:'edition__',
    };
    #container = null;
    constructor(container) {
        this.init(container);
    }
    createEditForm(){
        return `
            <input type="text" placeholder="title" class="${TodoEditForm.editFormClasses.todoComponentInputTitleEdit}">
            <input type="text" placeholder="body" class="${TodoEditForm.editFormClasses.todoComponentInputBodyEdit}">
            <button class="${TodoEditForm.editFormClasses.todoComponentButtonEdit}">Edit Todo</button>
        `;
    }
    editTodo(event){
        if(event.target.closest(`.${TodoEditForm.editFormClasses.todoComponentButtonEdit}`)){
            return this.getAllInputsForm()
                .reduce((fixesObj,input) => {
                    fixesObj[input.classList[0]
                        .replace(TodoEditForm.editFormClasses.startClasses,'')
                        .replace(TodoEditForm.editFormClasses.endClasses,'')] = input.value;
                    return fixesObj;
                },{id : this.#container.id.replace(TodoEditForm.editFormIds.startIds,''),});
        }
    }
    getAllInputsForm(){
        return [...this.#container
            .querySelectorAll('input')];
    }
    hideForm(){
        this.#container.classList.add(TodoEditForm.editFormClasses.hide);
    }
    init(container){
        this.#container = container;
        this.renderEditForm();
        this.hideForm();
    }
    renderEditForm(){
        this.#container.innerHTML = this.createEditForm();
    }
    setFormId(id){
        this.#container.id = TodoEditForm.editFormIds.startIds + id;
    }
    setFormInputsValue(editionTodo){
        this.getAllInputsForm()
            .forEach(input => {
                input.value = editionTodo[input.classList[0]
                    .replace(TodoEditForm.editFormClasses.startClasses,'')
                    .replace(TodoEditForm.editFormClasses.endClasses,'')];
            })
    }
    showForm(){
        this.#container.classList.remove(TodoEditForm.editFormClasses.hide);
    }
    startWorkForm(id,editionTodo){
        if(this.validateHiddenStatusForm()) this.showForm();
        this.setFormId(id);
        this.setFormInputsValue(editionTodo)
    }
    validateHiddenStatusForm(){
        return [...this.#container.classList]
            .includes(TodoEditForm.editFormClasses.hide);
    }
}