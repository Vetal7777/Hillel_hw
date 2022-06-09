class ContactListView{
    static componentClasses ={
        componentContactList: 'component__contact-list',
        addContainer: 'add-container',
        addContainerForm: 'add-container-form',
        contactPhotoAdd: 'contact-photo-add',
        inputNameAdd: 'input-name-add',
        inputSurnameAdd: 'input-surname-add',
        inputPhoneAdd: 'input-phone-add',
        buttonAdd: 'button-add',
        activateAddForm: 'activate-add-form',
        active: 'active',
        activateAddFormLine: 'activate-add-form__line',
        contactListWorkContainer: 'contact-list-work-container',
        contactListContainer: 'contact-list-container',
        editContainerForm: 'edit-container-form',
        contactPhotoEdit: 'contact-photo-edit',
        inputNameEdit: 'input-name-edit',
        inputSurnameEdit: 'input-surname-edit',
        inputPhoneEdit: 'input-phone-edit',
        buttonEdit: 'button-edit',
    };
    static componentIds = {
        nameAdd: 'nameAdd',
        lastNameAdd: 'lastNameAdd',
        phoneAdd: 'phoneAdd',
        nameEdit: 'nameEdit',
        lastNameEdit: 'lastNameEdit',
        phoneEdit: 'phoneEdit',
    }
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
    #options = null;
    //протоколы
    #root = null;
    //контейнер комнонента
    selectedContactElement = null;
    constructor(componentContainer,options) {
        this.#options = options;
        //протоколы
        this.#root = componentContainer
        this.renderComponent();
        this.setKeys();
        this.setAddEventsListeners();
    }
    setKeys(){
        this.componentContainer = [...this.#root][0]
            .querySelector(`.${ContactListView.componentClasses.componentContactList}`);
        //Нужен
        this.addContainerForm = this.componentContainer
            .querySelector(`.${ContactListView.componentClasses.addContainerForm}`);
        //Нужен
        this.activateAddForm = this.componentContainer
            .querySelector(`.${ContactListView.componentClasses.activateAddForm}`);
        //Нужен
        this.contactListContainer = this.componentContainer
            .querySelector(`.${ContactListView.componentClasses.contactListContainer}`);
        //Нужен
        this.editContainerForm = this.componentContainer
            .querySelector(`.${ContactListView.componentClasses.editContainerForm}`);
        //Нужен
    }
    setAddEventsListeners(){
        this.componentContainer
            .addEventListener('keyup',this.readFormName);
        this.componentContainer
            .addEventListener('click',this.onClick);
    }
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
    readContactClick(event){
        if(event.target.closest(`.${ContactListView.dynamicClasses.contactItemDelete}`)){
            this.#options
                .onDelete(this.readContactId(event));
            this.readContactElement(event)
                .remove();
        }
        if(event.target.closest(`.${ContactListView.dynamicClasses.contactItemEdit}`)){
            this.contactClickEdit(event);
        }
    }
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
    setSelectedContactElement(){
        this.selectedContactElement = [...this.contactListContainer.children]
            .find(contactElement => contactElement.id === this.editContainerForm.id);
    }
    setDefaultAppearanceContact(){
        const lastActiveContact = [...this.contactListContainer.children]
            .find(contact => [...contact.classList]
                .includes(ContactListView.componentClasses.active));
        //находим наш старый активный контакт (если он есть)
        if(lastActiveContact){
            this.toggleActiveStatus(lastActiveContact);
            this.toggleEditValue(lastActiveContact);
        }
        //Возвращаем старый контакт в стандартный внешний вид
    }
    setEditFormInputsValue(){
        const selectedContact = [...this.contactListContainer.children]
            .find(contact => contact.id === this.editContainerForm.id);
        this.getFormAllInputs(this.editContainerForm)
            .forEach(input => {
                input.value = selectedContact
                    .querySelector(`.contact-item__${input.id.replace('Edit','')}`)
                    .innerText;
            })
    }
    toggleActiveStatus(container){
        container.classList.toggle(ContactListView.componentClasses.active);
    }
    readContactId(event){
        return this.readContactElement(event).id;
    }
    readContactElement(event){
        this.selectedContactElement = event.target
            .closest(`.${ContactListView.dynamicClasses.contactItem}`);
        return this.selectedContactElement;
    }
    readActiveClick(event){
        if(event.target.closest(`.${ContactListView.componentClasses.activateAddForm}`)){
            this.toggleSwapContainersStatus(this.activateAddForm,this.addContainerForm);
        }
    }
    sendInquiryOnCLick = (event) =>{
        this.clickAddButton(event);
        this.clickEditButton(event);
    }
    clickAddButton(event){
        if(event.target
            .closest(`.${ContactListView.componentClasses.addContainerForm} button`)){
            //Если мы нажали на кнопку добавить
            const newContact = [...this.getFormAllInputs(this.addContainerForm)]
                .reduce((acc,input) => {
                    acc[input.id.replace('Add','')] = input.value;
                    return acc;
                },{})
            //Создали новый обьект с значениями который ввел наш пользователь ранее
            this.#options
                .onCreate(newContact)
                .then(contact => this.renderContact(contact));
            //Отправляем запрос POST и рисуем данный контакт
            this.toggleSwapContainersStatus(this.addContainerForm,this.activateAddForm);
            //прячем контейнер add
            this.cleanAllFormInputValue(this.addContainerForm);
            //Чистим все наши input
        }
    }
    clickEditButton(event){
        if(event.target
            .closest(`.${ContactListView.componentClasses.editContainerForm} button`)){
            //Ecли нажали копку изменить в форме
            const editContact = [...this.getFormAllInputs(this.editContainerForm)]
                //получаем все input в edit form
                .reduce((acc,input) => {
                    acc[input.id.replace('Edit','')] = input.value;
                    return acc;
                },{})
            //Меняем все данные которые мы захотели изменить
            this.#options
                .onUpdate(editContact,this.editContainerForm.id)
                .then(contact => this.editSelectedContactElement(contact));
            //Отправили запрос на изменения контакта
            this.toggleSwapContainersStatus(this.editContainerForm,this.selectedContactElement);
            //Прячем форму
        }
    }
    editSelectedContactElement = (contact) =>{
        this.selectedContactElement
            .querySelectorAll(`
                    .${ContactListView.dynamicClasses.contactItemName},
                    .${ContactListView.dynamicClasses.contactItemSurname},
                    .${ContactListView.dynamicClasses.contactItemPhone}`)
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
    toggleEditValue(contact){
        const contactItemEdit = contact
            .querySelector(`.${ContactListView.dynamicClasses.contactItemEdit}`);
        if(this.validateActiveClass(contact)){
            contactItemEdit.innerText = 'Edition';
        }else{
            contactItemEdit.innerText = 'Edit';
        }
    }
    validateActiveClass(container){
        return [...container.classList]
            .includes(ContactListView.componentClasses.active);
    }
    toggleSwapContainersStatus(firstContainer,secondContainer){
        this.toggleActiveStatus(firstContainer);
        this.toggleActiveStatus(secondContainer);
    }
    cleanAllFormInputValue(form){
        this.getFormAllInputs(form)
            .forEach(input => input.value = '');
    }
    readFormName = (event) =>{
        if(event.target.closest(`.${ContactListView.componentClasses.addContainerForm}`)){
            this.validateForm(this.addContainerForm);
        }
        if(event.target.closest(`.${ContactListView.componentClasses.editContainerForm}`)){
            this.validateForm(this.editContainerForm);
        }
    }
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
    getFormAllInputs(form){
        return form.querySelectorAll('input');
    }
    toggleButtonDisableStatus(button){
        if(button.disabled === true){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    }
    validateInput(input){
        if(!input.value.trim()){
            return false;
        }else{
            return true;
        }
    }
    renderComponent(){
        this.#root.append(this.createComponent());
    }
    renderContact(contact){
        this.contactListContainer.innerHTML += `
            <div class=${ContactListView.dynamicClasses.contactItem} id="${contact.id}">
                <div class=${ContactListView.dynamicClasses.contactItemContent}>
                    <span class=${ContactListView.dynamicClasses.contactItemPhoto}></span>
                    <div class=${ContactListView.dynamicClasses.contactFullNameContainer}>
                        <span class=${ContactListView.dynamicClasses.contactItemName}>${contact.name}</span>
                        <span class=${ContactListView.dynamicClasses.contactItemSurname}>${contact.lastName}</span>
                    </div>
                    <span class=${ContactListView.dynamicClasses.contactItemPhone}>${contact.phone}</span>
                </div>
                <div class=${ContactListView.dynamicClasses.contactItemControl}>
                    <div class=${ContactListView.dynamicClasses.contactItemDelete}>
                        <span class=${ContactListView.dynamicClasses.contactItemDeleteLine}></span>
                        <span class=${ContactListView.dynamicClasses.contactItemDeleteLine}></span>
                    </div>
                    <div class='${ContactListView.dynamicClasses.contactItemEdit}'>Edit</div>
                </div>
            </div>
        `;
    }
    createComponent(){
        return `
        <div class=${ContactListView.componentClasses.componentContactList}>
            <div class=${ContactListView.componentClasses.addContainer}>
                <div class=${ContactListView.componentClasses.addContainerForm}>
                    <span class=${ContactListView.componentClasses.contactPhotoAdd}></span>
                    <input type="text" placeholder="name" class=${ContactListView.componentClasses.inputNameAdd} id=${ContactListView.componentIds.nameAdd}>
                    <input type="text" placeholder="surname" class=${ContactListView.componentClasses.inputSurnameAdd} id=${ContactListView.componentIds.lastNameAdd}>
                    <input type="text" placeholder="phone" class=${ContactListView.componentClasses.inputPhoneAdd} id=${ContactListView.componentIds.phoneAdd}>
                    <button class=${ContactListView.componentClasses.buttonAdd} disabled>Ready</button>
                </div>
                <span class="${ContactListView.componentClasses.activateAddForm} ${ContactListView.componentClasses.active}">
                    <span class=${ContactListView.componentClasses.activateAddFormLine}></span>
                    <span class=${ContactListView.componentClasses.activateAddFormLine}></span>
                </span>
            </div>
            <div class=${ContactListView.componentClasses.contactListWorkContainer}>
                <div class=${ContactListView.componentClasses.contactListContainer}></div>
                <div class=${ContactListView.componentClasses.editContainerForm}>
                    <span class=${ContactListView.componentClasses.contactPhotoEdit}></span>
                    <input type="text" placeholder="name" class=${ContactListView.componentClasses.inputNameEdit} id=${ContactListView.componentIds.nameEdit}>
                    <input type="text" placeholder="surname" class=${ContactListView.componentClasses.inputSurnameEdit} id=${ContactListView.componentIds.lastNameEdit}>
                    <input type="text" placeholder="phone" class=${ContactListView.componentClasses.inputPhoneEdit} id=${ContactListView.componentIds.phoneEdit}>
                    <button class=${ContactListView.componentClasses.buttonEdit} >Edit</button>
                </div>
            </div>
        </div>
        `;
    }
    //html компнента
}