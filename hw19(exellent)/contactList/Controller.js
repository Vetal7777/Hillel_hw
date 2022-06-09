class ContactListController{
    #$containerElement = null;
    //контенер нашего приложения
    #view = null;
    //переменная с помощью которой мы делаем render
    #model = null;
    //переменная с помощью которой мы вызываем методы model
    constructor(element) {
        this.setKeys(element);
        this.getContacts();
        //создаем все переменные и eventListeners
    }
    setKeys(element){
        this.#$containerElement = element;
        //контенер нашего приложения
        this.#view = new ContactListView(this.#$containerElement,
            {
                onCreate : this.onCreateContact,
                onDelete : this.onDeleteContact,
                onUpdate : this.onUpdateContact,
            });
        //переменная с помощью которой мы делаем render
        this.#model = new ContactListModel();
        //переменная с помощью которой мы вызываем методы model
    }
    getContacts(){
        this.#model
            .getAllContacts()
            .then(contactList => {
                this.#model.setContactList(contactList);
                contactList
                    .forEach(contact => this.#view
                        .renderContact(contact));
            });
    }
    onCreateContact = (contactObj) =>{
        return this.#model
            .createContact(contactObj);
    }
    onDeleteContact = (id) =>{
        return this.#model
            .deleteContact(id);
    }
    onUpdateContact = (id,contactObj) => {
        return this.#model
            .updateContact(id,contactObj);
    }
}