class Http{
    #endpoint = `http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/contacts/`;
    getAll(){
        return axios(this.#endpoint)
            .then(response => response.data);
    }
    create(contactObj){
        return axios.post(this.#endpoint,contactObj)
            .then(response => response.data);
    }
    update(id,contactObj){
        return axios.put(this.#endpoint + id, contactObj)
            .then(response => response.data);
    }
    delete(id){
        return axios.delete(this.#endpoint + id)
            .then(response => response.data);
    }
}