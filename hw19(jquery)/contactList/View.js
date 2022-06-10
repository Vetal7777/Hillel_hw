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
    #root = null;
    selectedContactElement = null;
    constructor(componentContainer,options) {
        this.#options = options;
        this.#root = componentContainer
        this.renderComponent();
        this.setKeys();
        this.setAddEventsListeners();
    }
    setKeys(){
        this.componentContainer = this.#root
            .find(`.${ContactListView.componentClasses.componentContactList}`);
        this.addContainerForm = this.componentContainer
            .find(`.${ContactListView.componentClasses.addContainerForm}`);
        this.activateAddForm = this.componentContainer
            .find(`.${ContactListView.componentClasses.activateAddForm}`);
        this.contactListContainer = this.componentContainer
            .find(`.${ContactListView.componentClasses.contactListContainer}`);
        this.editContainerForm = this.componentContainer
            .find(`.${ContactListView.componentClasses.editContainerForm}`);
    }
    setAddEventsListeners(){
        this.componentContainer
            .on('keyup',this.readFormName);
        this.componentContainer
            .on('click',this.onClick);
    }
    onClick = (event) => {
        this.sendInquiryOnCLick(event);
        this.readActiveClick(event);
        this.readContactClick(event);
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
        this.editContainerForm.id = this.readContactId(event);
        this.setSelectedContactElement();
        this.setEditFormInputsValue();
        this.setDefaultAppearanceContact();
        this.readContactElement(event)
            .classList
            .toggle(ContactListView.componentClasses.active);
        this.toggleEditValue(this.readContactElement(event));
    }
    setSelectedContactElement(){
        this.selectedContactElement = [...this.contactListContainer.children()]
            .find(contactElement => contactElement.id === this.editContainerForm.id);
    }
    setDefaultAppearanceContact(){
        const lastActiveContact = [...this.contactListContainer.children()]
            .find(contact => [...contact.classList]
                .includes(ContactListView.componentClasses.active));
        if(lastActiveContact){
            this.toggleActiveStatus(lastActiveContact);
            this.toggleEditValue(lastActiveContact);
        }
    }
    setEditFormInputsValue(){
        const selectedContact = [...this.contactListContainer.children()]
            .find(contact => contact.id === this.editContainerForm.id);
        this.getFormAllInputs([...this.editContainerForm])
            .forEach(input => {
                input.value = selectedContact
                    .querySelector(`.contact-item__${input.id.replace('Edit','')}`)
                    .innerText;
            })
    }
    toggleActiveStatus(container){
        container.toggleClass(ContactListView.componentClasses.active);
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
            const newContact = [...this.getFormAllInputs(this.addContainerForm)]
                .reduce((acc,input) => {
                    acc[input.id.replace('Add','')] = input.value;
                    return acc;
                },{})
            this.#options
                .onCreate(newContact)
                .then(contact => this.renderContact(contact));
            this.toggleSwapContainersStatus(this.addContainerForm,this.activateAddForm);
            this.cleanAllFormInputValue(this.addContainerForm);
        }
    }
    clickEditButton(event){
        if(event.target
            .closest(`.${ContactListView.componentClasses.editContainerForm} button`)){
            const editContact = [...this.getFormAllInputs(this.editContainerForm)]
                .reduce((acc,input) => {
                    acc[input.id.replace('Edit','')] = input.value;
                    return acc;
                },{})
            this.#options
                .onUpdate(editContact,this.editContainerForm.id)
                .then(contact => this.editSelectedContactElement(contact));
            this.selectedContactElement.classList.toggle(ContactListView.componentClasses.active);
            this.editContainerForm.toggleClass(ContactListView.componentClasses.active)
        }
    }
    editSelectedContactElement = (contact) =>{
        this.selectedContactElement
            .querySelectorAll(`
                    .${ContactListView.dynamicClasses.contactItemName},
                    .${ContactListView.dynamicClasses.contactItemSurname},
                    .${ContactListView.dynamicClasses.contactItemPhone}`)
            .forEach(element => {
                element.innerText = contact[element.classList[0]
                    .replace('contact-item__','')];
            });
        this.toggleEditValue(this.selectedContactElement);
    }
    toggleEditValue(contact){
        const contactItemEdit = contact
            .querySelector(`.${ContactListView.dynamicClasses.contactItemEdit}`);
        if([...contact.classList].includes(ContactListView.componentClasses.active)){
            contactItemEdit.innerText = 'Edition';
        }else{
            contactItemEdit.innerText = 'Edit';
        }
    }
    validateActiveClass(container){
        return container.attr('class')
            .includes(ContactListView.componentClasses.active);
    }
    toggleSwapContainersStatus(firstContainer,secondContainer){
        this.toggleActiveStatus(firstContainer);
        this.toggleActiveStatus(secondContainer);
    }
    cleanAllFormInputValue(form){
        [...this.getFormAllInputs(form)]
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
        const button = form.find('button');
        [...this.getFormAllInputs(form)]
            .forEach(input => {
                validate *= this.validateInput(input);
                if(!validate && !button[0].disabled){
                    this.toggleButtonDisableStatus(button);
                }
                if(validate && button[0].disabled){
                    this.toggleButtonDisableStatus(button);
                }
            });
    }
    getFormAllInputs(form){
        return [...form][0].querySelectorAll('input');
    }
    toggleButtonDisableStatus(button){
        if(button[0].disabled === true){
            button.prop('disabled',false)
        }else{
            button.prop('disabled',true)
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
        this.contactListContainer.append( `
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
        `);
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
                <div class='${ContactListView.componentClasses.editContainerForm}'>
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
}