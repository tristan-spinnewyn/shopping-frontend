class AdminUserController extends BaseController {
    constructor() {
        super(true)
        this.model = new AdminModel()
        this.setActiveLink('isAdmin')
        this.setTitle('Administration')
        this.tableAllUsers = $("#tableAllUsers")
        this.tableBodyAllUsers = $("#tableBodyAllUsers")
        this.displayAllUsers()
    }

    async displayAllUsers(){
        let search = $("#search-user").value
        let content=""
        this.tableAllUsers.style.display = "none"
        try{
            if(search == ""){
                for(const user of await this.model.getAllUsers()){
                    let valid = ""
                    if(user.active){
                        valid = "checked"
                    }
                    content += `<tr><td>${user.login}</td>
                            <td><button class="waves-effect waves-light btn" onclick="adminUserController.updateUser(${user.id})">Modifier</button></td>
                            <td><div class="switch">
                                <label>
                                  Non
                                  <input type="checkbox" ${valid} onchange="adminUserController.activate(${user.id})" id="validUser-${user.id}">
                                  <span class="lever"></span>
                                  Oui
                                </label>
                              </div>
                            </td>
                            </tr>`
                }
            }else{
                for(const user of await this.model.searchUser(search)){
                    let valid = ""
                    if(user.validate){
                        valid = "checked"
                    }
                    content += `<tr><td>${user.login}</td>
                            <td><button class="waves-effect waves-light btn" onclick="adminUserController.updateUser(${user.id})">Modifier</button></td>
                            <td><div class="switch">
                                <label>
                                  Non
                                  <input type="checkbox" ${valid} onchange="adminUserController.activate(${user.id})" id="validUser-${user.id}">
                                  <span class="lever"></span>
                                  Oui
                                </label>
                              </div>
                            </td>
                            </tr>`
                }
            }

            this.tableBodyAllUsers.innerHTML = content
            this.tableAllUsers.style.display = "block"
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async activate(user_id){
        this.model.activate(user_id)
            .then(res =>{
                if(res.status === 200)
                    this.toast("Le statut du compte a bien été modifier")
                else
                    this.toast("Une erreur est survenue.")
            })
    }

    async updateUser(user_id){
        try{
            const object = await this.model.getUser(user_id)
            if(object === undefined){
                this.displayServiceError()
                return
            }
            if(object === null){
                this.displayNotFoundError()
                return
            }
            this.selectedUser= object
            navigate("adminUserEdit")
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}
window.adminUserController = new AdminUserController()