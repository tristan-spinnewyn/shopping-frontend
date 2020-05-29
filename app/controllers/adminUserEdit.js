class AdminUserEditController extends BaseFormController {
    constructor() {
        super(true);
        if (adminUserController.selectedUser) {
            self.user = adminUserController.selectedUser
            adminUserController.selectedUser = null
            $("#fieldEmail").value = self.user.login
        }
        this.model = new AdminModel()
        this.tableAllRoles = $("#tableAllRoles")
        this.tableBodyAllRoles = $("#tableBodyAllRoles")
        this.displayAllRole()
    }

    async displayAllRole() {
        this.tableAllRoles.style.display = "none"
        try {
            let content = ""
            for (const role of await this.model.getAllRole()) {
                content += `<tr><td>${role.name}</td>
<td><div class="switch">
        <label>
        Non
        <input type="checkbox" onchange="adminUserEditController.updateRole(${self.user.id},${role.id})" id="role-${role.id}">
        <span class="lever"></span>
        Oui
        </label>
    </div></td>
</tr>`
            }
            this.tableBodyAllRoles.innerHTML = content

            for(const userRole of await this.model.getUserRole(self.user.id)){
                $(`#role-${userRole.role_id}`).checked = true
            }

            this.tableAllRoles.style.display = "block"
        } catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async save() {
        let login = this.validateRequiredField("#fieldEmail", "Adresse email")
        if (login != null) {
            try {
                self.user.login = login
                if (await this.model.updateUser(self.user) === 200) {
                    this.toast("la liste a bien été modifié")
                    self.user = null
                    navigate('adminuser')
                } else {
                    this.displayServiceError()
                }
            } catch (e) {
                console.log(e)
                this.displayServiceError()
            }
        }
    }

    async sendTokenPwd() {
        if (confirm(`Etes vous sur de vouloir envoyer un lien de réintialisation de mot de passe à ${self.user.login}`)) {
            this.model.sendTokenPwd(self.user.id)
                .then(res => {
                    if (res.status === 200) {
                        this.toast("Un mail de réintialisation a bien été envoyé")
                    } else {
                        this.toast("Une erreur est survenue.")
                    }
                })
        }
    }

    async updateRole(user_id,role_id){
        const user_role = new User_Role(user_id, role_id)
        if(confirm(`Etes vous sur de vouloir modifier se role de l'utilisateur ${self.user.login}?`)){
            this.model.updateRole(user_role)
                .then(res=>{
                    if(res.status === 200){
                        this.toast("Le role à bien été modifier")
                    }else{
                        this.toast("Une erreur est survenu.")
                    }
                })
        }
    }
}

window.adminUserEditController = new AdminUserEditController()