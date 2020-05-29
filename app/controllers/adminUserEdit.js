class AdminUserEditController extends BaseFormController{
    constructor() {
        super(true);
        if (adminUserController.selectedUser) {
            self.user = adminUserController.selectedUser
            adminUserController.selectedUser = null
            $("#fieldEmail").value = self.user.login
        }
        this.model = new AdminModel()
    }

    async save(){
        let login = this.validateRequiredField("#fieldEmail","Adresse email")
        if(login != null){
            try{
                self.user.login = login
                if(await this.model.updateUser(self.user) === 200){
                    this.toast("la liste a bien été modifié")
                    self.user = null
                    navigate('adminuser')
                }else{
                    this.displayServiceError()
                }
            }catch (e) {
                console.log(e)
                this.displayServiceError()
            }
        }
    }

    async sendTokenPwd(){
        if(confirm(`Etes vous sur de vouloir envoyer un lien de réintialisation de mot de passe à ${self.user.login}`)){
            this.model.sendTokenPwd(self.user.id)
                .then(res=>{
                    if(res.status ===200){
                        this.toast("Un mail de réintialisation a bien été envoyé")
                    }else{
                        this.toast("Une erreur est survenue.")
                    }
                })
        }
    }
}

window.adminUserEditController = new AdminUserEditController()