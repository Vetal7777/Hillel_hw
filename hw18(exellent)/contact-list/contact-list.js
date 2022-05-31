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
        contactItemSurname: 'contact-item__surname',
        contactItemPhone: 'contact-item__phone',
        contactItemControl: 'contact-item__control',
        contactItemEdit: 'contact-item__edit',
        contactItemDelete: 'contact-item__delete',
        contactItemDeleteLine: 'contact-item__delete-line',
        //Классы нашего динамичного html
    }
    //классы динимические
    contactList = [];
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
        const inputs = [...form
            .querySelectorAll('input')];
        inputs
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
    cleanInputValue(input){
        input.value = '';
    }
    //Чистим input
    cleanAllFormInputValue(form){
        [...form
            .querySelectorAll('input')]
            .forEach(input => this.cleanInputValue(input));
    }
    //Чистим все input в форме
    readFormName = (event) =>{
        if(event.target.closest(`.${ContactList.staticClasses.addContainerForm}`)){
            this.validateForm(this.addContainerForm);
        }
        if(event.target.closest(`.${ContactList.staticClasses.editContainerForm}`)){
            this.validateForm(this.editContainerForm);
        }
    }
    //определяем класс формы
    onClickAddButton(event){
        if(event.target
            .closest(`.${ContactList.staticClasses.addContainerForm} button`)){
            //Если мы нажали на кнопку добавить
            const [inputName, inputSurname, inputPhone] = [...this.addContainerForm
                .querySelectorAll('input')];
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
    }
    //если нажимаем на добавить контакт button
    onClickEditButton(event){
        if(event.target
            .closest(`.${ContactList.staticClasses.editContainerForm} button`)){
            //Ecли нажали копку изменить в форме
            const contactObj = this.contactList
                    .find(contact => contact.id === this.editContainerForm.id);
            //Получаем обьект нашего контакта
            const [inputName, inputSurname, inputPhone] = [...this.editContainerForm
                .querySelectorAll('input')];
            //Получаем наши все input формы
            contactObj.name = inputName.value;
            contactObj.lastName = inputSurname.value;
            contactObj.phone = inputPhone.value;
            //Меняем все данные которые мы захотели изменить
            this.editContact(contactObj.id,contactObj);
            //Отправили запрос на изменения контакта
            [...this.contactListContainer.children]
                .find(contact => contact.id === this.editContainerForm.id)
                .remove();
            //Находим наш контакт в html коллекции и удаляем его (там уже не актуальные данные)
            this.renderContact(contactObj);
            //Рисуем контакт с новыми данными
            this.toggleActiveStatus(this.editContainerForm);
            //Прячем форму
            this.editContainerForm
                .removeAttribute('id');
            //Удаляем id формы
            this.cleanAllFormInputValue(this.editContainerForm);
            //Чистим все input формы
        }
    }
    //что делаем при клике на edit button
    sendInquiryOnCLick = (event) =>{
        this.onClickAddButton(event);
        this.onClickEditButton(event);
    }
    //отправляем запрос по клику
    readActiveClick(event){
        if(event.target.closest(`.${ContactList.staticClasses.activateAddForm}`)){
            this.toggleActiveStatus(this.activateAddForm);
            this.toggleActiveStatus(this.addContainerForm);
        }
    }
    //Выясняем на какую кнопку актив юзер нажал
    toggleActiveStatus(container){
        container.classList.toggle(ContactList.staticClasses.activeStatus);
    }
    //Убираем или добавляем актив статус контейнера
    readContactId(event){
        return this.readContactElement(event).id;
    }
    //узнаем id контакта
    readContactElement(event){
        return event.target
            .closest(`.${ContactList.dynamicClasses.contactItem}`);
    }
    //Узнаем элемент на который был клик
    validateActiveClass(container){
        return [...container.classList]
            .includes(ContactList.staticClasses.activeStatus);
    }
    //проверяем активный статус у контейнера true - active ,false - default
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
    readContactClick(event){
        if(event.target.closest(`.${ContactList.dynamicClasses.contactItemDelete}`)){
            this.deleteContact(this.readContactId(event));
            this.readContactElement(event).remove();
        }
        if(event.target.closest(`.${ContactList.dynamicClasses.contactItemEdit}`)){
            this.onContactClickEdit(event);
        }
    }
    //Читаем на какую кнопку нажал юзер на контакте
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
        const [name,lastName, phone] = this.editContainerForm
            .querySelectorAll('input');
        const selectedContact = this.contactList
            .find(contact => contact.id === this.editContainerForm.id);
        name.value = selectedContact.name;
        lastName.value = selectedContact.lastName;
        phone.value = selectedContact.phone;
    }
    //Меняем все input value у edit form
    onContactClickEdit(event){
        if(!this.validateActiveClass(this.editContainerForm)){
            this.toggleActiveStatus(this.editContainerForm);
        }
        //отображаем edit контейнер если он спрятан
        this.editContainerForm.id = this.readContactId(event);
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
    setAddEventsListeners(){
        this.componentContainer
            .addEventListener('keyup',this.readFormName);
        this.componentContainer
            .addEventListener('click',this.onClick);
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