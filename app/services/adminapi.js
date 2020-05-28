class AdminAPI extends BaseAPIService{
    constructor() {
        super("admin");
    }

    getAll(){
        return fetchJSON(`${this.url}/listUser`,this.token)
    }

    searchUser(loginSearch){
        return fetchJSON(`${this.url}/searchUser/${loginSearch}`,this.token)
    }

    activate(user_id){
        return fetch(`${this.url}/user/active/${user_id}`,{headers: this.headers})
    }
}