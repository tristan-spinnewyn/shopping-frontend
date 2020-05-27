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
        let content=""
        this.tableAllUsers.style.display = "none"
        try{
            for(const user of await this.model.getAllUsers()){
                let valid = ""
                if(user.validate){
                    valid = "checked"
                }
                content += `<tr><td>${user.login}</td>
                            <td></td>
                            <td><div class="switch">
                                <label>
                                  Non
                                  <input type="checkbox" ${valid} onchange="" id="validUser-${user.id}">
                                  <span class="lever"></span>
                                  Oui
                                </label>
                              </div>
                            </td>
                            </tr>`
            }
            this.tableBodyAllUsers.innerHTML = content
            this.tableAllUsers.style.display = "block"
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}
window.adminUserController = new AdminUserController()