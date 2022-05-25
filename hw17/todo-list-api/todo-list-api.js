class TodoListApi{
    static endpoint = 'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/todos';
    static CLASSES = {
        workContainer: 'work-container',
        workTodosContainer: 'work-todos-container',
        workTodoContainer: 'work-todo-container',
        todosContainer: 'todos-container',
        inputTitleAdd : 'inp-title-add',
        inputBodyAdd : 'inp-body-add',
        buttonAdd : 'button-add',
        inputTitleChange: 'input-title-change',
        inputBodyChange: 'input-body-change',
        buttonChange : 'button-change',
        isCompleted: 'completed',
        workTodoContainerActive: 'active',
        changingTodo : 'change',
    };
    constructor(element) {
        this.setElements(element);
        //создаем все неужные элементы
        this.setClasses();
        //добовляем всем классы
        this.renderTodos();
        //GET все тудушки
        this.setDisabledButtonStatus(this.buttonAdd);
        this.setDisabledButtonStatus(this.buttonChange);
        //заблочили все кнопки
        this.buttonAdd.addEventListener('click',this.doOnClickButtonAdd);
        //добавили buttonAdd addEventListener
        this.todoListApiContainer.addEventListener('keyup',this.validateSelectedWorkContainer)
        this.todosContainer.addEventListener('click',this.doOnClickTodo);
        //добавили todosContainer addEventListener
        this.buttonChange.addEventListener('click',this.saveChanges);
        //добавили buttonChange addEventListener
    };
    setElements(element){
        this.todoListApiContainer = element;
        //общий контейнер
        const [workContainer, workTodosContainer] = this.todoListApiContainer.children;
        // дочки контейнера
        this.workContainer = workContainer;
        //рабочий контенер
        const [inputTitleAdd, inputBodyAdd, buttonAdd] = this.workContainer.children;
        //дочки рабочего контейнера
        this.inputTitleAdd = inputTitleAdd;
        //input titleAdd
        this.inputBodyAdd = inputBodyAdd;
        //input bodyAdd
        this.buttonAdd = buttonAdd;
        //button
        this.workTodosContainer = workTodosContainer;
        //рабочий контейнер с тудушками
        const [todosContainer,workTodoContainer] = this.workTodosContainer.children;
        //дочки рабочего контейнера с тудушками
        this.todosContainer = todosContainer;
        //контейнер с тудушками
        this.workTodoContainer = workTodoContainer;
        //контейнер работы с тудушкой
        const [inputTitleChange,inputBodyChange,buttonChange] = this.workTodoContainer.children;
        //дочки рабочего контейнера
        this.inputTitleChange = inputTitleChange;
        //input title change
        this.inputBodyChange = inputBodyChange;
        //input body change
        this.buttonChange = buttonChange;
        //button change
    }
    //создаем все нужные элементы
    setClasses(){
        this.setClass(this.workContainer,TodoListApi.CLASSES.workContainer);
        //добавляем класс рабочему контейнеру
        this.setClass(this.workTodosContainer,TodoListApi.CLASSES.workTodosContainer);
        //добавляем класс рабочему контейнеру с тудушками
        this.setClass(this.todosContainer,TodoListApi.CLASSES.todosContainer);
        //добовляем класс контйнеру с тудушками
        this.setClass(this.inputTitleAdd,TodoListApi.CLASSES.inputTitleAdd);
        //добовляем класс input titleAdd
        this.setClass(this.inputBodyAdd,TodoListApi.CLASSES.inputBodyAdd);
        //добовляем класс input bodyAdd
        this.setClass(this.buttonAdd,TodoListApi.CLASSES.buttonAdd);
        //добовляем класс buttonAdd
        this.setClass(this.inputTitleChange,TodoListApi.CLASSES.inputTitleChange);
        //добовляем класс input title change
        this.setClass(this.inputBodyChange,TodoListApi.CLASSES.inputBodyChange);
        //добовляем класс input body change
        this.setClass(this.buttonChange,TodoListApi.CLASSES.buttonChange);
        //добовляем класс button change
        this.setClass(this.workTodoContainer,TodoListApi.CLASSES.workTodoContainer);
        //добовляем класс контейнера работы с тудушками
    };
    //set all classes on start
    setClass(element,className){
        element.classList.add(className);
        //добовляем класс className элементу element
    };
    //set class
    setClassAndFunc = (event,className,func) => {
        if (event.target.closest(`.${className}`)){
            func(event);
        }
    }
    cleanDisableButtonStatus(button,inputTitle,inputBody){
        if(this.validateInput(inputTitle) && this.validateInput(inputBody)){
            button.disabled = false;
        }
    }
    //убираем блок кнопки если все инпуты не пусты
    setDisabledButtonStatus(button){
        button.disabled = true;
    }
    //блочим кнопку
    validateSelectedWorkContainer = (event) =>{
        this.cleanDisableButtonStatus(this.buttonAdd,this.inputTitleAdd,this.inputBodyAdd);
        this.cleanDisableButtonStatus(this.buttonChange,this.inputTitleChange,this.inputBodyChange);
    }
    //если в input есть текст то кнопки расблочаться
    validateInput(input){
        if(input.value.trim()){
            return true;
        }
    }
    //проверяем чтобы input не был пустой
    doOnClickTodo = (event) =>{
        this.setClassAndFunc(event,'todo-exit',this.deleteTodo);
        this.setClassAndFunc(event,'todo-end',this.setIsCompleteTodo);
        this.setClassAndFunc(event,'todo-title',this.doOnClickTodoContent)
        this.setClassAndFunc(event,'todo-body',this.doOnClickTodoContent)
    }
    //что делаем во время клика на тудушку
    doOnClickButtonAdd = () =>{
        this.addTodo().then(cb => cb.json()).then(todo => this.renderTodo(todo));
        this.setDisabledButtonStatus(this.buttonAdd);
        this.clearInputValue(this.inputTitleAdd);
        this.clearInputValue(this.inputBodyAdd);
    }
    //действия при клике button add
    doOnClickTodoContent = (event) => {
        if(!this.validateTodoForCompleted(event) && !this.validateChangeTodoContainerForActive()){
            this.showWorkTodoContainer();
        }
        if(this.validateTodoForCompleted(event) && this.validateChangeTodoContainerForActive()){
            this.hideWorkTodoContainer();
            this.deleteWorkTodoContainerId();
        }
        if(!this.validateTodoForCompleted(event)){
            this.getWorkTodoContainerId(event);
        }
        this.toggleSelectedClassTodo(event);
    }
    //что мы делаем по клику не контент тудушки
    toggleSelectedClassTodo = (event) => {
        const todos = this.todosContainer.children;
        [...todos].forEach(todo => {
            todo.classList.remove(TodoListApi.CLASSES.changingTodo);
        });
        if(!this.validateTodoForCompleted(event)){
            this.getSelectedTodo(event).classList.add(TodoListApi.CLASSES.changingTodo);
        }
    }
    //добовляем класс changing тудушке
    getWorkTodoContainerId = (event) => {
        if(this.getSelectedTodo(event).id !== this.workTodoContainer.id){
            this.workTodoContainer.id = this.getSelectedTodo(event).id;
        }
    }
    //присваивае id todo рабочему контейнеру
    deleteWorkTodoContainerId = () => {
        this.workTodoContainer.removeAttribute('id');
    }
    //удаляем id workContainer
    clearInputValue(input){
        input.value ='';
    }
    //обнуляем input в work контейнере
    setFormatDate(todoDate){
        const date = new Date(Date.parse(todoDate));
        const dd = date.getDate();
        const mm = date.getMonth();
        const yyyy = date.getFullYear();
        return `${dd}.${mm}.${yyyy}`
    }
    //редактируем формат даты
    setIsCompleteTodo = (event) =>{
        const id = this.getSelectedTodo(event).id;
        //id тудушки которая будет завершена
        fetch(TodoListApi.endpoint)
            .then(r => r
                .json())
            .then(todos => todos
                .forEach(todo => {
                    if(todo.id === id){
                        todo.isComplete = true;
                        this.putTodo(todo,id)
                            .then(cb => cb.json())
                            .then(todo => {
                                [...this.todosContainer.children]
                                    .find(todoE => todoE.id === todo.id)
                                    .remove();
                                this.renderTodo(todo);
                            });
                    }
                }));
    }
    //set isComplete todo's to true
    showWorkTodoContainer = () => {
        this.workTodoContainer.classList.add(TodoListApi.CLASSES.workTodoContainerActive);
    }
    //показываем контейнер для работы с тудушкой
    hideWorkTodoContainer = () => {
        this.workTodoContainer.classList.remove(TodoListApi.CLASSES.workTodoContainerActive);
    }
    //закрываем рабочий с тудушками контейнер
    validateChangeTodoContainerForActive = () => {
        if([...this.workTodoContainer.classList].includes(TodoListApi.CLASSES.workTodoContainerActive)){
            return true;
        }else {
            return false;
        }
    }
    //проверяем что рабочий с тудушками контейнер активный
    validateTodoForCompleted = (event) =>{
        if([...this.getSelectedTodo(event).classList].includes(TodoListApi.CLASSES.isCompleted)){
            return true;
        }else{
            return false;
        }
    }
    //Проверяем Тудушку на завершенность
    getSelectedTodo(event){
        return event.target.closest('.todo');
    }
    //получаем выбраную туду
    saveChanges = (event) => {
        const todos = this.todosContainer.children;
        [...todos].forEach(todo => {
            if(event.target.closest(`.${TodoListApi.CLASSES.workTodoContainer}`).id === todo.id){
                const selectedTodo = this.promice.find(e => e.id === todo.id);
                selectedTodo.title = this.inputTitleChange.value;
                selectedTodo.body = this.inputBodyChange.value;
                this.putTodo(selectedTodo,todo.id)
                    .then(cb => cb.json())
                    .then(todo => {
                        [...this.todosContainer.children]
                            .find(todoE => todoE.id === todo.id)
                            .remove();
                        this.renderTodo(todo);
                    });
            }
        });
        this.setDisabledButtonStatus(this.buttonChange);
        this.clearInputValue(this.inputBodyChange);
        this.clearInputValue(this.inputTitleChange);
        this.hideWorkTodoContainer();
    }
    //Сохранить изменения
    renderTodo(todo){
        this.todosContainer.innerHTML += `
                        <div class="todo" id='${todo.id}'>
                            <div class="todo-content">
                                <span class="todo-title">TITLE: ${todo.title}</span>
                                <span class="todo-body">BODY: ${todo.body}</span>
                                <span class="todo-date">CREATE AT: ${this.setFormatDate(todo.createDate)}</span>
                            </div>
                            <div class="todo-control">
                                <div class="todo-exit">
                                    <span class="todo-exit__line"></span>
                                    <span class="todo-exit__line"></span>
                                </div>
                                <button class="todo-end">Завершить</button>
                            </div>
                        </div>`;
        if(todo.isComplete === true){
            [...this.todosContainer.children]
                .forEach(todoElem => {
                    if(todoElem.id === todo.id){
                        todoElem.classList
                            .add(TodoListApi.CLASSES.isCompleted);
                    }
                });
        }
    }
    //рендерим одну тудушку
    renderTodos(){
        this.todosContainer.innerHTML = '';
        fetch(TodoListApi.endpoint).then(r => r.json())
            .then(todos => {
                this.promice = todos;
                //сохранили наш promise
                todos.forEach(todo => {
                    this.renderTodo(todo);
                })});
    }
    //GET
    addTodo = () => {
        const todo = {
            title: this.inputTitleAdd.value,
            body: this.inputBodyAdd.value,
            isComplete: false,
        };
        return fetch(TodoListApi.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        });
        //создали новую тудушку
    };
    //ADD
    deleteTodo = (event) =>{
        const id = this.getSelectedTodo(event).id;
        fetch(`${TodoListApi.endpoint}/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(r => r.json());
        [...this.todosContainer.children]
            .find(todo => todo.id === id)
            .remove();
    }
    //DELETE
    putTodo(todo,id){
        return fetch(`${TodoListApi.endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        });
    }
    //PUT
}