class ContactList{
    static endpoint = `http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/contacts`;
    static CLASSES = {
        contactItem: 'contact-item',
        contactItemContent: 'contact-item__content',
        contactItemPhoto: 'contact-item__photo',
        contactFullNameContainer: 'contact__full-name-container',
        contactItemName: 'contact-item__name',
        contactItemSurname: 'contact-item__surname',
        contactItemPhone: 'contact-item__phone',
        contactItemControl: 'contact-item__control',
        contactItemEdit: 'contact-item__edit',
        contactItemDelete: 'contact-item__delete',
        contactItemDeleteLine: 'contact-item__delete-line',
        //Классы нашего динамичного html
        contactListContainer: 'contact-list-container',
        //Контейнер всех контактов
        addContainerForm: 'add-container-form',
        //Форма добавления
        editContainerForm: 'edit-container-form',
        //Форма изменений
        buttonAdd: 'button-add',
        //Кнопка добавить контакт
        buttonEdit: 'button-edit',
        //Кнопка изменить контакт
        activateAddForm: 'activate-add-form',
        //Кнопка показать форму добавления контакта
        activeStatus: 'active',
        //статус активный
    }
    constructor(componentContainer) {
        this.setElements(componentContainer);
        //сохраняем все наши элементы
        this.renderContactList();
        //рисуем контакт лист
        this.setAddEventsListeners();
        //Добавляем все addEventListener
    }
    setElements(componentContainer){
        this.componentContainer = componentContainer;
        //Нужен
        this.addContainerForm = this.componentContainer
            .querySelector(`.${ContactList.CLASSES.addContainerForm}`);
        //Нужен
        this.activateAddForm = this.componentContainer
            .querySelector(`.${ContactList.CLASSES.activateAddForm}`);
        //Нужен
        this.contactListContainer = this.componentContainer
            .querySelector(`.${ContactList.CLASSES.contactListContainer}`);
        //Нужен
        this.editContainerForm = this.componentContainer
            .querySelector(`.${ContactList.CLASSES.editContainerForm}`);
        //Нужен
    }
    //сохраняем все наши элементы
    toggleButtonDisableStatus(button){
        if(button.disabled === true){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    }
    //добавляем или удаляем disabled статус у кнопки
    renderContact(contact){
        this.contactListContainer.innerHTML += `
            <div class=${ContactList.CLASSES.contactItem} id="${contact.id}">
                <div class=${ContactList.CLASSES.contactItemContent}>
                    <span class=${ContactList.CLASSES.contactItemPhoto}></span>
                    <div class=${ContactList.CLASSES.contactFullNameContainer}>
                        <span class=${ContactList.CLASSES.contactItemName}>${contact.name}</span>
                        <span class=${ContactList.CLASSES.contactItemSurname}>${contact.lastName}</span>
                    </div>
                    <span class=${ContactList.CLASSES.contactItemPhone}>${contact.phone}</span>
                </div>
                <div class=${ContactList.CLASSES.contactItemControl}>
                    <div class=${ContactList.CLASSES.contactItemDelete}>
                        <span class=${ContactList.CLASSES.contactItemDeleteLine}></span>
                        <span class=${ContactList.CLASSES.contactItemDeleteLine}></span>
                    </div>
                    <div class='${ContactList.CLASSES.contactItemEdit}'>Edit</div>
                </div>
            </div>
        `;
    }
    //Рисуем один контакт
    renderContactList(){
        this.promice = this.getContacts();
        this.promice
            .then(contactList => contactList
                .forEach(contact => this.renderContact(contact)));
    }
    //Рисуем все контакты
    validateInput(input){
        if(!input.value.trim()){
           return false;
        }else{
            return true;
        }
    }
    //Проверяем заполненный ли input или нет, возвращает нам value
    validateForm(form){
        const [,inputTitle,inputSurname,inputPhone,button] = form.children;
        if(this.validateInput(inputTitle)
            && this.validateInput(inputSurname)
            && this.validateInput(inputPhone)
            && button.disabled){
            this.toggleButtonDisableStatus(button);
        }
        if((!this.validateInput(inputTitle)
                || !this.validateInput(inputSurname)
                || !this.validateInput(inputPhone))
            && !button.disabled){
            this.toggleButtonDisableStatus(button);
        }
    }
    //проверяем правильность набора формы перед отправкой запроса
    cleanInputValue(input){
        input.value = '';
    }
    //Чистим input
    cleanAllFormInputValue(form){
        const [,inputName,inputSurname,inputPhone,] = form.children;
        this.cleanInputValue(inputName);
        this.cleanInputValue(inputSurname);
        this.cleanInputValue(inputPhone);
    }
    //Чистим все input в форме
    readFormName = (event) =>{
        if(event.target.closest(`.${ContactList.CLASSES.addContainerForm}`)){
            this.validateForm(this.addContainerForm);
        }
        if(event.target.closest(`.${ContactList.CLASSES.editContainerForm}`)){
            this.validateForm(this.editContainerForm);
        }
    }
    //определяем класс формы
    sendInquiryOnCLick = (event) =>{
        if(event.target.closest(`.${ContactList.CLASSES.buttonAdd}`)){
            //Если мы нажали на кнопку добавить
            const [,inputName, inputSurname, inputPhone,] = this.addContainerForm.children;
            //ищем input у в нашей форме
            const newContact = {
              name: inputName.value,
              lastName: inputSurname.value,
              phone: inputPhone.value,
            };
            //Создали новый обьект с значениями который ввел наш пользователь ранее
            this.addContact(newContact)
                .then(response => response
                    .json())
                .then(contact => this.renderContact(contact));
            //Отправляем запрос POST и рисуем данный контакт
            this.toggleActiveStatus(this.addContainerForm);
            //Форму прячем
            this.toggleActiveStatus(this.activateAddForm);
            //Кнопку показываем
            this.cleanAllFormInputValue(this.addContainerForm);
            //Чистим все наши input
        }

        if(event.target.closest(`.${ContactList.CLASSES.buttonEdit}`)){
            //Ecли нажали копку изменить в форме
            const contactObj = this.promice
                .then(contacts => contacts
                    .find(contact => contact.id === this.editContainerForm.id));
            //Получаем обьект нашего контакта
            const [,inputName, inputSurname, inputPhone,] = this.editContainerForm.children;
            //Получаем наши все input формы
            contactObj.name = inputName.value;
            contactObj.lastName = inputSurname.value;
            contactObj.phone = inputPhone.value;
            //Меняем все данные которые мы захотели изменить
            this.editContact(this.editContainerForm.id,contactObj);
            //Отправили запрос на изменения контакта
            [...this.contactListContainer.children]
                .find(contact => contact.id === this.editContainerForm.id)
                .remove();
            //Находим наш контакт в html коллекции и удаляем его (там уже не актуальные данные)
            this.renderContact(contactObj);
            //Рисуем контакт с новыми данными
            this.toggleActiveStatus(this.editContainerForm);
            //Прячем форму
            this.editContainerForm.removeAttribute('id');
            //Удаляем id формы
            this.cleanAllFormInputValue(this.editContainerForm);
            //Чистим все input формы
        }
    }
    //отправляем запрос по клику
    readActiveClick(event){
        if(event.target.closest(`.${ContactList.CLASSES.activateAddForm}`)){
            this.toggleActiveStatus(this.activateAddForm);
            this.toggleActiveStatus(this.addContainerForm);
        }
    }
    //Выясняем на какую кнопку актив юзер нажал
    toggleActiveStatus(container){
        container.classList.toggle(ContactList.CLASSES.activeStatus);
    }
    //Убираем или добавляем актив статус контейнера
    readContactId(event){
        return this.readContactElement(event).id;
    }
    //узнаем id контакта
    readContactElement(event){
        return event.target.closest(`.${ContactList.CLASSES.contactItem}`);
    }
    //Узнаем элемент на который был клик
    validateActiveClass(container){
        return [...container.classList]
            .includes(ContactList.CLASSES.activeStatus);
    }
    //проверяем активный статус у контейнера true - active ,false - default
    toggleEditValue(contact){
        const contactItemEdit = contact
            .querySelector(`.${ContactList.CLASSES.contactItemEdit}`);
        if(this.validateActiveClass(contact)){
            contactItemEdit.innerText = 'Edition';
        }else{
            contactItemEdit.innerText = 'Edit';
        }
    }
    //меняем innerText контейнера в зависимости от статуса контакта
    readContactClick(event){
        if(event.target.closest(`.${ContactList.CLASSES.contactItemDelete}`)){
            this.deleteContact(this.readContactId(event));
            this.readContactElement(event).remove();
        }
        if(event.target.closest(`.${ContactList.CLASSES.contactItemEdit}`)){
            this.doOnClickEdit(event);
        }
    }
    //Читаем на какую кнопку нажал юзер на контакте
    doOnClickEdit(event){
        if(!this.validateActiveClass(this.editContainerForm)){
            this.toggleActiveStatus(this.editContainerForm);
        }
        //отображаем edit контейнер если он спрятан
        this.editContainerForm.id = this.readContactId(event);
        const lastActiveContact = [...this.contactListContainer.children]
            .find(contact => [...contact.classList].includes(ContactList.CLASSES.activeStatus));
        //находим наш старый активный контакт (если он есть)
        if(lastActiveContact){
            this.toggleActiveStatus(lastActiveContact);
            this.toggleEditValue(lastActiveContact);
        }
        //Возвращаем старый контакт в стандартный внешний вид
        this.toggleActiveStatus(this.readContactElement(event));
        this.toggleEditValue(this.readContactElement(event));
    }
    //что мы делаем когда нажимаем на кнопку edit
    doOnClick = (event) => {
        this.sendInquiryOnCLick(event);
        //отправляет запрос по клику
        //отправляет запрос если мы нажали на buttonAdd || buttonEdit
        this.readActiveClick(event);
        //открывает контейнер создания контакта если мы нажали на соответсвующую кнопку
        this.readContactClick(event);
        //запускаются функции при клике на соответсвующую элементы в контакте
        // - при кнопке удаления удаляет
        // - при кнопке edit открывает контейнер edit
        // - и добовляет ему id контакта
    }
    //что мы делаем при клике
    setAddEventsListeners(){
        this.componentContainer.addEventListener('keyup',this.readFormName);
        this.componentContainer.addEventListener('click',this.doOnClick);
    }
    //Добавляем все addEventListener
    getContacts(){
        return fetch(ContactList.endpoint).then(r => r.json());
    }
    //GET
    deleteContact(id){
        return fetch(`${ContactList.endpoint}/${id}`,{
            method: 'DELETE',// GET, POST, PUT, DELETE, etc.
            headers:{
                'Content-Type': 'application/json'
                //'Content-Type' : application/x-ww-form-urlencoded
            },
        }).then(r => r.json());
    }
    //DELETE
    addContact(contact){
        return fetch(ContactList.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact),
        });
    }
    //POST
    editContact(id,contact){
        return fetch(`${ContactList.endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact),
        });
    }
    //PUT
}