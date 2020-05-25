class AccountController extends BaseFormController{
    constructor() {
        super(true);
        this.setActiveLink("account")
        this.setTitle("Mon compte")
        this.model = new UserModel()
        this.displayCurrentAccount()
    }
    async displayCurrentAccount(){
        try{
            const user = await this.model.getUser()
            $("#fieldLogin").value = user.login
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async save(){
        let login = this.validateRequiredField("#fieldLogin",'adresse mail')
        let password = $("#fieldPassword").value.trim()
        let confirmPassword = $("#fieldPassword").value.trim()
        let oldPassword = this.validateRequiredField("#fieldOldPassword",'Ancien mot de passe')
        if(password !== confirmPassword){
            this.toast("Les mots de passe doivent etre identique")
            return
        }
        if(login != null && oldPassword != null){
            const res = await this.model.update(login,password,oldPassword)
            if(res === 200){
                this.toast("Votre compte a bien été mise à jour, veuillez vous reconnecter")
                sessionStorage.removeItem("token")
                navigate('index')
            }else if(res === 403){
                this.toast("Un compte avec cette adresse mail existe déjà")
            }else if(res === 401){
                this.toast("Le mot de passe est incorrect !")
            } else{
                this.displayServiceError()
            }
        }
    }
}

window.accountController = new AccountController()