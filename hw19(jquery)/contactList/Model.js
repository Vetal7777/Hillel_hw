class ContactListModel{
    #http = null;
    contactList = [];
    constructor() {
        this.#http = new Http();
    }
    setContactList(contactList){
        this.contactList = contactList;
    }
    getAllContacts(){
        return this.#http
            .getAll();
    }
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
    createContact(contactObj){
        return this.#http
            .create(contactObj);
    }
    deleteContact(id){
        return this.#http
            .delete(id);
    }
}