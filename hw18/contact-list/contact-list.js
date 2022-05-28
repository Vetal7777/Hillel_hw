class ContactList{
    static endpoint = `http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/contacts`;
    static CLASSES = {
        postContainer: 'post-container',
        postContainerForm: 'post-container-form',
        contactPhotoPost: 'contact-photo-post',
        inputNamePost: 'input-name-post',
        inputSurnamePost: 'input-surname-post',
        inputPhonePost: 'input-phone-post',
        buttonPost: 'button-post',
        contactListWorkContainer: 'contact-list-work-container',
        contactListContainer: 'contact-list-container',
        editContainer: 'edit-container',
        contactPhotoPut: 'contact-photo-put',
        inputNamePut: 'input-name-put',
        inputSurnamePut: 'input-surname-put',
        inputPhonePut: 'input-phone-put',
        buttonPut: 'button-put',
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
        activatePostForm: 'activate-post-form',
        activatePostFormLine: 'activate-post-form__line',
        activeStatus: 'active',
    }
    constructor(componentContainer) {
        this.setElements(componentContainer);
        //сохраняем все наши элементы
        this.setClassesOnStart();
        //добавляем всем элементам нашего компонента заранее прописанные классы
        this.toggleButtonDisableStatus(this.buttonPut);
        this.toggleButtonDisableStatus(this.buttonPost);
        //Блокируем все кнопки
        this.renderContactList();
        //рисуем контакт лист
        this.setAddEventsListeners();
        //Добавляем все addEventListener
    }
    setElements(componentContainer){
        this.componentContainer = componentContainer;
        const [postContainer, contactListWorkContainer] = this.componentContainer.children;
        this.postContainer = postContainer;
        const [postContainerForm, activatePostForm] = this.postContainer.children;
        this.postContainerForm = postContainerForm;
        const [contactPhotoPost,inputNamePost,inputSurnamePost,inputPhonePost,buttonPost] = this.postContainerForm.children;
        this.contactPhotoPost = contactPhotoPost;
        this.inputNamePost = inputNamePost;
        this.inputSurnamePost = inputSurnamePost;
        this.inputPhonePost = inputPhonePost;
        this.buttonPost = buttonPost;
        this.activatePostForm = activatePostForm;
        this.contactListWorkContainer = contactListWorkContainer;
        const [contactListContainer, editContainer] = this.contactListWorkContainer.children;
        this.contactListContainer = contactListContainer;
        this.editContainer = editContainer;
        const [contactPhotoPut,inputNamePut,inputSurnamePut,inputPhonePut,buttonPut] = this.editContainer.children;
        this.contactPhotoPut = contactPhotoPut;
        this.inputNamePut = inputNamePut;
        this.inputSurnamePut = inputSurnamePut;
        this.inputPhonePut = inputPhonePut;
        this.buttonPut = buttonPut;
    }
    //сохраняем все наши элементы
    toggleClass(element,className){
        element.classList.toggle(className);
    }
    //добавляем или удаляем класс className элементу element
    setClassesOnStart(){
        this.toggleClass(this.postContainer,ContactList.CLASSES.postContainer);
        this.toggleClass(this.postContainerForm,ContactList.CLASSES.postContainerForm);
        this.toggleClass(this.contactPhotoPost,ContactList.CLASSES.contactPhotoPost);
        this.toggleClass(this.inputNamePost,ContactList.CLASSES.inputNamePost);
        this.toggleClass(this.inputSurnamePost,ContactList.CLASSES.inputSurnamePost);
        this.toggleClass(this.inputPhonePost,ContactList.CLASSES.inputPhonePost);
        this.toggleClass(this.buttonPost,ContactList.CLASSES.buttonPost);
        this.toggleClass(this.activatePostForm,ContactList.CLASSES.activatePostForm);
        this.toggleClass(this.activatePostForm,ContactList.CLASSES.activeStatus);
        this.toggleClass(this.contactListWorkContainer,ContactList.CLASSES.contactListWorkContainer);
        this.toggleClass(this.contactListContainer,ContactList.CLASSES.contactListContainer);
        this.toggleClass(this.editContainer,ContactList.CLASSES.editContainer);
        this.toggleClass(this.contactPhotoPut,ContactList.CLASSES.contactPhotoPut);
        this.toggleClass(this.inputNamePut,ContactList.CLASSES.inputNamePut);
        this.toggleClass(this.inputSurnamePut,ContactList.CLASSES.inputSurnamePut);
        this.toggleClass(this.inputPhonePut,ContactList.CLASSES.inputPhonePut);
        this.toggleClass(this.buttonPut,ContactList.CLASSES.buttonPut);
        [...this.activatePostForm.children]
            .forEach(line => this.toggleClass(line,ContactList.CLASSES.activatePostFormLine));
    }
    //добавляем всем элементам нашего компонента заранее прописанные классы
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
        this.promice = this.getContact();
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
        const [photo,inputTitle,inputSurname,inputPhone,button] = form.children;
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
        const [photo,inputName,inputSurname,inputPhone,button] = form.children;
        this.cleanInputValue(inputName);
        this.cleanInputValue(inputSurname);
        this.cleanInputValue(inputPhone);
    }
    //Чистим все input в форме
    readFormName = (event) =>{
        if(event.target.closest(`.${ContactList.CLASSES.postContainer}`)){
            this.validateForm(this.postContainerForm);
        }
        if(event.target.closest(`.${ContactList.CLASSES.editContainer}`)){
            this.validateForm(this.editContainer);
        }
    }
    //определяем класс формы
    sendInquiryOnCLick = (event) =>{
        if(event.target.closest(`.${ContactList.CLASSES.buttonPost}`)){
            const newContact = {
              name: this.inputNamePost.value,
              lastName: this.inputSurnamePost.value,
              phone: this.inputPhonePost.value,
            };
            this.postContact(newContact)
                .then(response => response
                    .json())
                .then(contact => this.renderContact(contact));
            this.toggleActiveStatus(this.postContainerForm);
            this.toggleActiveStatus(this.activatePostForm);
            this.cleanAllFormInputValue(this.postContainerForm);
        }
        if(event.target.closest(`.${ContactList.CLASSES.buttonPut}`)){
            const contactObj = this.promice
                .then(contacts => contacts
                    .find(contact => contact.id === this.editContainer.id));
            //Получаем обьект нашего контакта
            contactObj.name = this.inputNamePut.value;
            contactObj.lastName = this.inputSurnamePut.value;
            contactObj.phone = this.inputPhonePut.value;
            //Меняем все данные которые мы захотели изменить
            this.putContact(this.editContainer.id,contactObj);
            [...this.contactListContainer.children]
                .find(contact => contact.id === this.editContainer.id)
                .remove();
            this.renderContact(contactObj);
            this.toggleActiveStatus(this.editContainer);
            this.editContainer.removeAttribute('id');
            this.cleanAllFormInputValue(this.editContainer);
        }
    }
    //отправляем запрос по клику
    readActiveClick(event){
        if(event.target.closest(`.${ContactList.CLASSES.activatePostForm}`)){
            this.toggleActiveStatus(this.activatePostForm);
            this.toggleActiveStatus(this.postContainerForm);
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
        return [...container.classList].includes(ContactList.CLASSES.activeStatus);
    }
    //проверяем активный статус у контейнера true - active ,false - default
    toggleEditValue(contact){
        const [contentContainer,controlContainer] = contact.children;
        const [deleteContainer,editContainer] = controlContainer.children;
        if(this.validateActiveClass(contact)){
            editContainer.innerText = 'Edition';
        }else{
            editContainer.innerText = 'Edit';
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
        if(!this.validateActiveClass(this.editContainer)){
            this.toggleActiveStatus(this.editContainer);
        }
        //отображаем edit контейнер если он спрятан
        this.editContainer.id = this.readContactId(event);
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
        //отправляет запрос если мы нажали на buttonPost || buttonPut
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
    getContact(){
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
    postContact(contact){
        return fetch(ContactList.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact),
        });
    }
    //POST
    putContact(id,contact){
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