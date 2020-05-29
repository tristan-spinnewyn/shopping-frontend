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

    async getAllRole(){
        let roles= []
        for(let role of await this.api.getAllRole()){
            roles.push(Object.assign(new Role(),role))
        }
        return roles
    }

    async getUserRole(user_id){
        let userRoles =[]
        for(let userRole of await this.api.getUserRole(user_id)){
            userRoles.push(userRole)
        }
        return userRoles
    }

    async searchUser(loginSearch){
        let users = []
        for(let user of await this.api.searchUser(loginSearch)){
            users.push(Object.assign(new User(),user))
        }
        return users
    }

    async activate(user_id){
        return await this.api.activate(user_id)
    }

    async getUser(user_id){
        try{
            const user = Object.assign(new User(), await this.api.getById(user_id))
            return user
        }catch (e) {
            if(e === 404) return null
            return undefined
        }
    }

    async updateUser(user){
        return this.api.updateUser(user).then(res => res.status)
    }

    async sendTokenPwd(user_id){
        return await this.api.sendTokenPwd(user_id)
    }

    async updateRole(user_role){
        return await this.api.updateRole(user_role)
    }
}