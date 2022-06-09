class ContactListController{
    #$containerElement = null;
    //контенер нашего приложения
    #view = null;
    //переменная с помощью которой мы делаем render
    #model = null;
    //переменная с помощью которой мы вызываем методы model
    #contactsMassive = null;
    constructor(element) {
        this.setKeys(element);
        //создаем все переменные и eventListeners
        this.#model
            .getAllContacts()
            .then(response => {
                this.#contactsMassive = response;
                this.#view
                    .renderContactList(response);
            })
        //рисуем все контакты
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
    onCreateContact = (contactObj) =>{
        this.#model
            .createContact(contactObj)
            .then(contact => this.#view
                .renderSingleContact(contact));
    }
    onDeleteContact = (id) =>{
        this.#model
            .deleteContact(id);
    }
    onUpdateContact = (id,contactObj) => {
        this.#model
            .updateContact(id,contactObj,this.#contactsMassive)
            .then(contact => this.#view
                .updateContactItemHTML(contact));
    }
}