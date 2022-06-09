class ContactListModel{
    //работа с данными
    // - логика
    #http = null;
    //класс http
    constructor() {
        this.#http = new Http();
        //передаем класс чтобы использовать его методы
    }
    getAllContacts(){
        return this.http
            .getAll();
    }
    //GET
    updateContact(contactObj,id,contactsMassive){
        const updatedContact = contactsMassive
            .find(contact => contact.id = id);
        Object.keys(contactObj)
            .forEach(key => {
                updatedContact[key] = contactObj[key];
            })
        return this.http
            .update(id,updatedContact);
    }
    //PUT
    createContact(contactObj){
        return this.http
            .create(contactObj);
    }
    //POST
    deleteContact(id){
        return this.http
            .delete(id);
    }
    //DELETE
    get http(){
        return this.#http;
    }
}