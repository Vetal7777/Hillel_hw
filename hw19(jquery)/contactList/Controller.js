class ContactListController{
    #$containerElement = null;
    #view = null;
    #model = null;
    constructor(element) {
        this.setKeys(element);
        this.getContacts();
    }
    setKeys(element){
        this.#$containerElement = element;
        this.#view = new ContactListView(this.#$containerElement,
            {
                onCreate : this.onCreateContact,
                onDelete : this.onDeleteContact,
                onUpdate : this.onUpdateContact,
            });
        this.#model = new ContactListModel();
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