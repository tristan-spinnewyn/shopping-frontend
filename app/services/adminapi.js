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

    getById(id){
        return fetchJSON(`${this.url}/user/${id}`,this.token)
    }

    updateUser(user){
        this.headers.set('Content-Type','application/json')
        return fetch(`${this.url}/user`,{
            method:'PUT',
            headers: this.headers,
            body:JSON.stringify(user)
        })
    }

    sendTokenPwd(user_id){
        return fetch(`${this.url}/user/${user_id}/resetPwd`,{headers: this.headers})
    }
}