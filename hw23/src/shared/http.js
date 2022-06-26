import axios from "axios";

export default class Http{
    #URL = 'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/';
    getAll(endpoint){
        return axios(this.#URL + endpoint)
            .then(r => r.data);
    }
    getUrl = () => this.#URL;
    edit(id,obj,endpoint){
        return axios.put(this.#URL + endpoint + id,obj)
            .then(r => r.data);
    }
    add(obj,endpoint){
        return axios.post(this.#URL + endpoint,obj)
            .then(r => r.data);
    }
    delete(id,endpoint){
        return axios.delete(this.#URL + endpoint + id)
            .then(r => r.data);
    }
}