class UserModel{
    constructor() {
        this.api = new UserAPI()
    }

    async getByLogin(login){
        try{
            const user = Object.assign(new User(),await this.api.getByLogin(login))
            return user
        }catch (e) {
            if(e === 404) return null
            return undefined
        }
    }

    async getById(id){
        try{
            const user = Object.assign(new User(),await this.api.getById(id))
            return user
        }catch (e) {
            if(e === 404) return null
            return undefined
        }
    }

    async getUser(){
        try{
            const user = Object.assign(new User, await this.api.get())
            return user
        }catch (e) {
            if(e === 404) return null
            return undefined
        }
    }

    update(login,pwd,oldPwd){
        return this.api.update(login,pwd,oldPwd).then(res=>res.status)
    }
}