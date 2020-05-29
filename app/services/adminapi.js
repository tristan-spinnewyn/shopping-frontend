class AdminAPI extends BaseAPIService{
    constructor() {
        super("admin");
    }

    getAll(){
        return fetchJSON(`${this.url}/listUser`,this.token)
    }

    getAllRole(){
        return fetchJSON(`${this.url}/role`,this.token)
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

    getUserRole(user_id){
        return fetchJSON(`${this.url}/user/${user_id}/getRole`,this.token)
    }

    updateRole(user_role){
        this.headers.set('Content-Type','application/json')
        return fetch(`${this.url}/roleUpdate`,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(user_role)
        })
    }
}