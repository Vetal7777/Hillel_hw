class GitHubUser{
    static startLink = `https://api.github.com/users/`;
    #userName = undefined;
    #userLink = undefined;
    #userPromise = null;
    get userLink(){
        return this.#userLink;
    }
    set userName(login){
        this.#userName = login;
        this.setUserLink(this.userName);
        this.setUserPromise(this.userLink);
    }
    get userName(){
        return this.#userName;
    }
    get userPromise(){
        return this.#userPromise;
    }
    setUserPromise(url){
        this.#userPromise = fetch(url)
            .then((resp) => {
                if(resp.status === 404){
                    throw new Error(`404`);
                }
                return resp.json();
            })
    }
    setUserLink(login){
        this.#userLink = GitHubUser.startLink + login;
    }
}