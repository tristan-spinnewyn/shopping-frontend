class UserAPI extends BaseAPIService{
    constructor() {
        super("user");
    }
    authenticate(login,password){
        this.headers.set('Content-Type','application/x-www-form-urlencoded')
        return new Promise((resolve,reject)=> fetch(`${this.url}/authenticate`,{
            method:'POST',
            headers: this.headers,
            body: `login=${login}&password=${password}`
        }).then(res =>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }
    register(login,password){
        this.headers.set('Content-Type','application/x-www-form-urlencoded')
        return fetch(`${this.url}/register`,{
            method:'POST',
            headers: this.headers,
            body: `login=${login}&password=${password}`
        })
    }
    getByLogin(login){
        return fetchJSON(`${this.url}/${login}`,this.token)
    }
    getById(id){
        return fetchJSON(`${this.url}/getById/${id}`,this.token)
    }
    confirmAccount(id,token){
        return fetch(`${this.url}/confirmAccount/${id}/${token}`)
    }
    resendEmail(login){
        this.headers.set('Content-Type','application/x-www-form-urlencoded')
        return fetch(`${this.url}/resendActive`,{
            method:'POST',
            headers: this.headers,
            body: `login=${login}`
        })
    }
    resetEmail(login){
        this.headers.set('Content-Type','application/x-www-form-urlencoded')
        return fetch(`${this.url}/askResetPassword`,{
            method:'POST',
            headers: this.headers,
            body: `login=${login}`
        })
    }
    updateMdp(user_id,mdp,token){
        this.headers.set('Content-Type','application/x-www-form-urlencoded')
        return fetch(`${this.url}/resetPassword`,{
            method:'POST',
            headers: this.headers,
            body: `user_id=${user_id}&mdp=${mdp}&token=${token}`
        })
    }
    get(){
        return fetchJSON(`${this.url}`,this.token)
    }
    update(login,pwd,oldPwd){
        this.headers.set('Content-Type','application/x-www-form-urlencoded')
        return fetch(this.url,{
            method:'put',
            headers:this.headers,
            body:`login=${login}&password=${pwd}&oldPassword=${oldPwd}`
        })
    }
}