class AdminModel{
    constructor() {
        this.api = new AdminAPI()
    }

    async getAllUsers(){
        let users = []
        for(let user of await this.api.getAll()){
            users.push(Object.assign(new User(),user))
        }
        return users
    }

    async searchUser(loginSearch){
        let users = []
        for(let user of await this.api.searchUser(loginSearch)){
            users.push(Object.assign(new User(),user))
        }
        return users
    }
}