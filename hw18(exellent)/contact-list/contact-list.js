class ContactList{
    static endpoint = `http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/contacts`;
    static staticClasses = {
        contactListContainer: 'contact-list-container',
        //Контейнер всех контактов
        addContainerForm: 'add-container-form',
        //Форма добавления
        editContainerForm: 'edit-container-form',
        //Форма изменений
        activateAddForm: 'activate-add-form',
        //Кнопка показать форму добавления контакта
        activeStatus: 'active',
        //статус активный
    }
    //классы статичные с которыми мы работаем
    static dynamicClasses = {
        contactItem: 'contact-item',
        contactItemContent: 'contact-item__content',
        contactItemPhoto: 'contact-item__photo',
        contactFullNameContainer: 'contact__full-name-container',
        contactItemName: 'contact-item__name',
        contactItemSurname: 'contact-item__lastName',
        contactItemPhone: 'contact-item__phone',
        contactItemControl: 'contact-item__control',
        contactItemEdit: 'contact-item__edit',
        contactItemDelete: 'contact-item__delete',
        contactItemDeleteLine: 'contact-item__delete-line',
        //Классы нашего динамичного html
    }
    //классы динимические
    contactList = [];
    selectedContactElement = null;
    //Массив наших контактов
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
            .querySelector(`.${ContactList.staticClasses.addContainerForm}`);
        //Нужен
        this.activateAddForm = this.componentContainer
            .querySelector(`.${ContactList.staticClasses.activateAddForm}`);
        //Нужен
        this.contactListContainer = this.componentContainer
            .querySelector(`.${ContactList.staticClasses.contactListContainer}`);
        //Нужен
        this.editContainerForm = this.componentContainer
            .querySelector(`.${ContactList.staticClasses.editContainerForm}`);
        //Нужен
    }
    //сохраняем все наши элементы
    setAddEventsListeners(){
        this.componentContainer
            .addEventListener('keyup',this.readFormName);
        this.componentContainer
            .addEventListener('click',this.onClick);
    }
    //Добавляем все addEventListener
    setDefaultAppearanceContact(){
        const lastActiveContact = [...this.contactListContainer.children]
            .find(contact => [...contact.classList].includes(ContactList.staticClasses.activeStatus));
        //находим наш старый активный контакт (если он есть)
        if(lastActiveContact){
            this.toggleActiveStatus(lastActiveContact);
            this.toggleEditValue(lastActiveContact);
        }
        //Возвращаем старый контакт в стандартный внешний вид
    }
    //Возвращаем старый контакт в стандартный внешний вид(Если он есть)
    setEditFormInputsValue(){
        const selectedContact = this.contactList
            .find(contact => contact.id === this.editContainerForm.id);
        this.getFormAllInputs(this.editContainerForm)
            .forEach(input => {
                input.value = selectedContact[input.id.replace('Edit','')]
            })
    }
    //Меняем все input value у edit form
    setSelectedContactElement(){
        this.selectedContactElement = [...this.contactListContainer.children]
            .find(contactElement => contactElement.id === this.editContainerForm.id);
    }
    //получаем контакт элемент который мы обрабатываем
    toggleButtonDisableStatus(button){
        if(button.disabled === true){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    }
    //добавляем или удаляем disabled статус у кнопки
    toggleActiveStatus(container){
        container.classList.toggle(ContactList.staticClasses.activeStatus);
    }
    //Убираем или добавляем актив статус контейнера
    toggleSwapContainersStatus(firstContainer,secondContainer){
        this.toggleActiveStatus(firstContainer);
        this.toggleActiveStatus(secondContainer);
    }
    //Убираем или добавляем актив статус контейнера add
    toggleEditValue(contact){
        const contactItemEdit = contact
            .querySelector(`.${ContactList.dynamicClasses.contactItemEdit}`);
        if(this.validateActiveClass(contact)){
            contactItemEdit.innerText = 'Edition';
        }else{
            contactItemEdit.innerText = 'Edit';
        }
    }
    //меняем innerText контейнера в зависимости от статуса контакта
    renderContact(contact){
        this.contactListContainer.innerHTML += `
            <div class=${ContactList.dynamicClasses.contactItem} id="${contact.id}">
                <div class=${ContactList.dynamicClasses.contactItemContent}>
                    <span class=${ContactList.dynamicClasses.contactItemPhoto}></span>
                    <div class=${ContactList.dynamicClasses.contactFullNameContainer}>
                        <span class=${ContactList.dynamicClasses.contactItemName}>${contact.name}</span>
                        <span class=${ContactList.dynamicClasses.contactItemSurname}>${contact.lastName}</span>
                    </div>
                    <span class=${ContactList.dynamicClasses.contactItemPhone}>${contact.phone}</span>
                </div>
                <div class=${ContactList.dynamicClasses.contactItemControl}>
                    <div class=${ContactList.dynamicClasses.contactItemDelete}>
                        <span class=${ContactList.dynamicClasses.contactItemDeleteLine}></span>
                        <span class=${ContactList.dynamicClasses.contactItemDeleteLine}></span>
                    </div>
                    <div class='${ContactList.dynamicClasses.contactItemEdit}'>Edit</div>
                </div>
            </div>
        `;
    }
    //Рисуем один контакт
    renderContactList(){
        this.getContacts()
            .then(contactList => {
                this.contactList = contactList;
                contactList
                    .forEach(contact => this.renderContact(contact))
            });
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
        let validate = 1;
        const button = form.querySelector('button');
        [...this.getFormAllInputs(form)]
            .forEach(input => {
                validate *= this.validateInput(input);
                if(!validate && !button.disabled){
                    this.toggleButtonDisableStatus(button);
                }
                if(validate && button.disabled){
                    this.toggleButtonDisableStatus(button);
                }
            });
    }
    //проверяем правильность набора формы перед отправкой запроса
    validateActiveClass(container){
        return [...container.classList]
            .includes(ContactList.staticClasses.activeStatus);
    }
    //проверяем активный статус у контейнера true - active ,false - default
    readActiveClick(event){
        if(event.target.closest(`.${ContactList.staticClasses.activateAddForm}`)){
            this.toggleSwapContainersStatus(this.activateAddForm,this.addContainerForm);
        }
    }
    //Выясняем на какую кнопку актив юзер нажал
    readContactId(event){
        return this.readContactElement(event).id;
    }
    //узнаем id контакта
    readContactElement(event){
        this.selectedContactElement = event.target
            .closest(`.${ContactList.dynamicClasses.contactItem}`);
        return this.selectedContactElement;
    }
    //Узнаем элемент на который был клик
    readContactClick(event){
        if(event.target.closest(`.${ContactList.dynamicClasses.contactItemDelete}`)){
            this.deleteContact(this.readContactId(event));
            this.readContactElement(event).remove();
        }
        if(event.target.closest(`.${ContactList.dynamicClasses.contactItemEdit}`)){
            this.contactClickEdit(event);
        }
    }
    //Читаем на какую кнопку нажал юзер на контакте
    readFormName = (event) =>{
        if(event.target.closest(`.${ContactList.staticClasses.addContainerForm}`)){
            this.validateForm(this.addContainerForm);
        }
        if(event.target.closest(`.${ContactList.staticClasses.editContainerForm}`)){
            this.validateForm(this.editContainerForm);
        }
    }
    //определяем класс формы
    clickAddButton(event){
        if(event.target
            .closest(`.${ContactList.staticClasses.addContainerForm} button`)){
            //Если мы нажали на кнопку добавить
            const newContact = [...this.getFormAllInputs(this.addContainerForm)]
                .reduce((acc,input) => {
                    acc[input.id.replace('Add','')] = input.value;
                    return acc;
                },{})
            //Создали новый обьект с значениями который ввел наш пользователь ранее
            this.addContact(newContact)
                .then(response => response
                    .json())
                .then(contact => this.renderContact(contact));
            //Отправляем запрос POST и рисуем данный контакт
            this.toggleSwapContainersStatus(this.addContainerForm,this.activateAddForm);
            //прячем контейнер add
            this.cleanAllFormInputValue(this.addContainerForm);
            //Чистим все наши input
        }
    }
    //если нажимаем на добавить контакт button
    clickEditButton(event){
        if(event.target
            .closest(`.${ContactList.staticClasses.editContainerForm} button`)){
            //Ecли нажали копку изменить в форме
            const editContact = [...this.getFormAllInputs(this.editContainerForm)]
                //получаем все input в edit form
                .reduce((acc,input) => {
                    acc = this.contactList
                        .find(contact => contact.id === this.editContainerForm.id);
                    //получаем обьект контакта которого мы обрабатывем
                    acc[input.id.replace('Edit','')] = input.value;
                    return acc;
                },)
            //Меняем все данные которые мы захотели изменить
            this.editContact(editContact.id,editContact)
                .then(response => response.json())
                .then(contact => this.editSelectedContactElement(contact));
            //Отправили запрос на изменения контакта
            this.toggleSwapContainersStatus(this.editContainerForm,this.selectedContactElement);
            //Прячем форму
        }
    }
    //что делаем при клике на edit button
    getFormAllInputs(form){
        return form.querySelectorAll('input');
    }
    //получим все input формы
    cleanAllFormInputValue(form){
        this.getFormAllInputs(form)
            .forEach(input => input.value = '');
    }
    //Чистим все input в форме
    editSelectedContactElement = (contact) =>{
        this.selectedContactElement
            .querySelectorAll(`
                    .${ContactList.dynamicClasses.contactItemName},
                    .${ContactList.dynamicClasses.contactItemSurname},
                    .${ContactList.dynamicClasses.contactItemPhone}`)
            //получаем массив из данных контакта (имя,фамилия, телефон)
            .forEach(element => {
                element.innerText = contact[element.classList[0]
                    .replace('contact-item__','')];
                //меняем их на то что указано в обьекте
            });

        this.editContainerForm
            .removeAttribute('id');
        //удаляем id editForm контейнера
        this.toggleEditValue(this.selectedContactElement);
    }
    //Изменяем внешний вид html контакта
    sendInquiryOnCLick = (event) =>{
        this.clickAddButton(event);
        this.clickEditButton(event);
    }
    //отправляем запрос по клику
    contactClickEdit(event){
        if(!this.validateActiveClass(this.editContainerForm)){
            this.toggleActiveStatus(this.editContainerForm);
        }
        //отображаем edit контейнер если он спрятан
        this.editContainerForm.id = this.readContactId(event);
        this.setSelectedContactElement();
        this.setEditFormInputsValue();
        this.setDefaultAppearanceContact();
        this.toggleActiveStatus(this.readContactElement(event));
        this.toggleEditValue(this.readContactElement(event));
    }
    //что мы делаем когда нажимаем на кнопку edit
    onClick = (event) => {
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