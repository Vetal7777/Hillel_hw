class ContactListView{
    //отрисовка
    //addEventListeners
    static contactItemClasses = {
        contactItemStartClass: 'contact-item__',
        contactItemContainer : 'contact-item__container',
        contactItemContent: 'contact-item__content',
        contactItemName: 'contact-item__name',
        contactItemLastName: 'contact-item__lastName',
        contactItemPhone: 'contact-item__phone',
        contactItemControl: 'contact-item__control',
        contactItemDelete: 'contact-item__delete',
        contactItemEdit: 'contact-item__edit',
    };
    static componentClasses = {
        contactListComponentContainer: 'contact-list__component-container',
        contactListAddForm: 'contact-list__add-form',
        contactListContainer: 'contact-list__container',
        contactListEditForm: 'contact-list__edit-form',
        buttonAdd: 'button-add',
        buttonEdit: 'button-edit',
        form: 'form',
        active: 'active',
    };
    static componentIds = {
        inputNameAdd: 'name-add',
        inputLastNameAdd: 'lastName-add',
        inputPhoneAdd: 'phone-add',
        inputNameEdit: 'name-edit',
        inputLastNameEdit: 'lastName-edit',
        inputPhoneEdit: 'phone-edit',
    }
    #options = null;
    //протоколы
    #componentContainer = null;
    //контейнер комнонента
    #selectedForm = null;
    //форма с который мы работаем
    constructor(componentContainer,options) {
        this.setKeys(componentContainer,options)
        //cоздаем все переменные
        this.renderComponent(this.#componentContainer);
        //рисуем компонент
        this.setEventListeners();
        //добовляем все нужные eventListeners
    }
    setKeys(componentContainer,options){
        this.#options = options;
        //протоколы
        this.#componentContainer = componentContainer;
        //контейнер комнонента
    }
    //создаем переменные:
    // - this.#options
    // - this.#componentContainer
    setEventListeners(){
        this.#componentContainer
            .on('click',this.onClick)
    }
    //добовляем все eventListeners
    onClick = (event) => {
        this.createNewContact(event);
        this.deleteContact(event);
        this.updateContact(event);
        this.selectContact(event);
    }
    //при клике на контакт
    renderContactList(contactsMassive){
        contactsMassive
            .forEach(contact => {
                this.renderSingleContact(contact);
            })
    }
    //рисуем список контактов
    renderSingleContact(contact){
        $(`.${ContactListView.componentClasses.contactListContainer}`)
            .append(this.createContact(contact));
    }
    //рисуем один контакт
    renderComponent(componentContainer){
        componentContainer
            .append(this.createComponent());
    }
    //рисуем компоенент
    updateContactItemHTML(contact){
       [...$(`#${contact.id} .name`)][0].innerText = contact.name;
       [...$(`#${contact.id} .lastName`)][0].innerText = contact.lastName;
       [...$(`#${contact.id} .phone`)][0].innerText = contact.phone;
        this.setStandartStatusLastContact();
    }
    //обновляем контакт html
    setStandartStatusLastContact(){
        const lastActiveContact = this.#componentContainer[0].querySelector(`.${ContactListView.componentClasses.active}`);
        if(lastActiveContact){
            this.toggleActiveStatus(lastActiveContact);
        }
    }
    //делаем стадартный вид старому контакту
    createComponent(){
        return `
            <div class=${ContactListView.componentClasses.contactListComponentContainer}>
                <div class='${ContactListView.componentClasses.contactListAddForm} ${ContactListView.componentClasses.form}'>
                    <input type="text" id=${ContactListView.componentIds.inputNameAdd} placeholder="Name">
                    <input type="text" id=${ContactListView.componentIds.inputLastNameAdd} placeholder="Last name">
                    <input type="text" id=${ContactListView.componentIds.inputPhoneAdd} placeholder="Phone">
                    <button class='${ContactListView.componentClasses.buttonAdd}'>Add contact</button>
                </div>
                <div class=${ContactListView.componentClasses.contactListContainer}></div>
                <div class='${ContactListView.componentClasses.contactListEditForm} ${ContactListView.componentClasses.form}'>
                    <input type="text" id=${ContactListView.componentIds.inputNameEdit} placeholder="Name">
                    <input type="text" id=${ContactListView.componentIds.inputLastNameEdit} placeholder="Last name">
                    <input type="text" id=${ContactListView.componentIds.inputPhoneEdit} placeholder="Phone">
                    <button class='${ContactListView.componentClasses.buttonEdit} '>Edit Contact</button>
                </div>
            </div>
        `;
    }
    //возвращает и создает компонент html
    createContact(contact){
        return `
            <div class=${ContactListView.contactItemClasses.contactItemContainer} id="${contact.id}">
                <div class=${ContactListView.contactItemClasses.contactItemContent}>
                    <span class='${ContactListView.contactItemClasses.contactItemName} name'>${contact.name}</span>
                    <span class='${ContactListView.contactItemClasses.contactItemLastName} lastName'>${contact.lastName}</span>
                    <span class='${ContactListView.contactItemClasses.contactItemPhone} phone'>${contact.phone}</span>
                </div>
                <div class=${ContactListView.contactItemClasses.contactItemControl}>
                    <span class='${ContactListView.contactItemClasses.contactItemDelete}'>Delete</span>
                    <span class='${ContactListView.contactItemClasses.contactItemEdit} '>Edit</span>
                </div>
            </div>
        `;
    }
    //возвращает и создает один контакт html
    getSelectedForm(event){
        this.#selectedForm = event.target.closest(`.${ContactListView.componentClasses.form}`);
    }
    //получить форму с которой мы работаем
    getFormInputs(event){
        this.getSelectedForm(event);
        return [...this.#selectedForm.querySelectorAll('input')];
    }
    //получаем все инпуты формы с которой мы работаем
    getSelectedContact(event){
        return event.target.closest(`.${ContactListView.contactItemClasses.contactItemContainer}`);
    }
    //получаем выбранный контакт
    setEditFormId(event){
        const editForm = [...$(`.${ContactListView.componentClasses.contactListEditForm}`)][0];
        editForm.id = this.getSelectedContact(event).id;
    }
    //добовляем форме edit , id контакта
    setInputsValueEditForm(event){
        $(`.${ContactListView.componentClasses.contactListEditForm}`)[0]
            .querySelectorAll('input')
            .forEach(inputEdit => {
                inputEdit.value = this.getSelectedContact(event)
                    .querySelector(`.${inputEdit.id.replace('-edit','')}`)
                    .innerText;
            })
    }
    //заполняем все поля формы edit
    toggleActiveStatus(container){
        container
            .classList
            .toggle(ContactListView.componentClasses.active);
    }
    //добовляем актив статус контейнеру
    addActiveStatusEditForm(){
        const editForm = $(`.${ContactListView.componentClasses.contactListEditForm}`)[0];
        if(![...editForm.classList].includes(ContactListView.componentClasses.active)){
            this.toggleActiveStatus(editForm);
        }
    }
    //добовляем актив статус edit form если он не активен
    removeContact(contact){
        contact.remove();
    }
    //удаляем html контакта
    cleanInputsValue(contacts){
        contacts
            .forEach(input => input.value ='');
    }
    //чистим все input
    createContactObj(endClass,event){
        const newContactObj = this.getFormInputs(event)
            .reduce((newContactObj,input) => {
                newContactObj[input
                    .id
                    .replace(endClass,'')] = input.value;
                return newContactObj;
            },{});
        return newContactObj;
    }
    //создаем новый обьект контакта
    createNewContact(event){
        if(event.target.closest(`.${ContactListView.componentClasses.buttonAdd}`)){
            this.#options.onCreate(this.createContactObj('-add',event));
            this.cleanInputsValue(this.getFormInputs(event));
        }
    }
    //create
    deleteContact(event){
        if(event.target.closest(`.${ContactListView.contactItemClasses.contactItemDelete}`)){
            this.#options.onDelete(this.getSelectedContact(event).id);
            this.removeContact(this.getSelectedContact(event));
        }
    }
    //delete
    updateContact(event){
        if(event.target.closest(`.${ContactListView.componentClasses.buttonEdit}`)){
            this.#options.onUpdate(this.createContactObj('-edit',event),this.#selectedForm.id);
            this.toggleActiveStatus(this.#selectedForm);
            this.#selectedForm.id = '';
        }
    }
    //update
    selectContact(event){
        if(event.target.closest(`.${ContactListView.contactItemClasses.contactItemEdit}`)){
            this.setStandartStatusLastContact();
            this.toggleActiveStatus(this.getSelectedContact(event));
            this.setEditFormId(event);
            this.addActiveStatusEditForm();
            this.setInputsValueEditForm(event);
        }
    }
    //select
}