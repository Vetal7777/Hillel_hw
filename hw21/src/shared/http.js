import axios from "axios";

export default class Http{
    #URL = 'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/todos/';
    getAll(){
        return axios(this.#URL)
            .then(r => r.data);
    }
    edit(id,obj){
        return axios.put(this.#URL + id,obj)
            .then(r => r.data);
    }
    add(obj){
        console.log(obj)
        return axios.post(this.#URL,obj)
            .then(r => r.data);
    }
    delete(id){
        return axios.delete(this.#URL + id)
            .then(r => r.data);
    }
}