class ContactListModel{
    //работа с данными
    // - логика
    #http = null;
    //класс http
    contactList = [];
    constructor() {
        this.#http = new Http();
        //передаем класс чтобы использовать его методы
    }
    setContactList(contactList){
        this.contactList = contactList;
    }
    getAllContacts(){
        return this.#http
            .getAll();
    }
    //GET
    updateContact(contactObj,id){
        const updatedContact = this.contactList
            .find(contact => contact.id === id)
        Object.keys(contactObj)
            .forEach(key => {
                updatedContact[key] = contactObj[key];
            })
        return this.#http
            .update(id,updatedContact);
    }
    //PUT
    createContact(contactObj){
        return this.#http
            .create(contactObj);
    }
    //POST
    deleteContact(id){
        return this.#http
            .delete(id);
    }
}