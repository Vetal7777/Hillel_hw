export default class TodoEditForm{
    static editFormClasses = {
        todoComponentEditForm: 'todo-component__edit-form',
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
    #editFormContainer = null;
    #mainContainer = null;
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
                },{id : this.#editFormContainer.id.replace(TodoEditForm.editFormIds.startIds,''),});
        }
    }
    getAllInputsForm(){
        return [...this.#editFormContainer
            .querySelectorAll('input')];
    }
    hideForm(){
        this.#editFormContainer.classList.add(TodoEditForm.editFormClasses.hide);
    }
    init(container){
        this.#mainContainer = container;
    }
    setContainer(){
        this.#editFormContainer = this.#mainContainer.querySelector(`.${TodoEditForm.editFormClasses.todoComponentEditForm}`);
    }
    setFormId(id){
        this.#editFormContainer.id = TodoEditForm.editFormIds.startIds + id;
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
        this.#editFormContainer.classList.remove(TodoEditForm.editFormClasses.hide);
    }
    startWorkForm(id,editionTodo){
        if(this.validateHiddenStatusForm()) this.showForm();
        this.setFormId(id);
        this.setFormInputsValue(editionTodo)
    }
    validateHiddenStatusForm(){
        return [...this.#editFormContainer.classList]
            .includes(TodoEditForm.editFormClasses.hide);
    }
}