class RegisterController extends BaseFormController{
    constructor() {
        super('false');
        this.svc = new UserAPI()
    }

    async register(){
        let login = this.validateRequiredField("#fieldLogin",'adresse mail')
        let password = this.validateRequiredField("#fieldPassword",'Mot de passe')
        let confirmPassword = this.validateRequiredField("#fieldPasswordConfirm","Confirmer votre mot de passe")
        if(password !== confirmPassword){
            this.toast("Les mots de passe doivent etre identique")
            return
        }
        if((login != null) && (password != null)){
            await this.svc.register(login, password).then(res =>{
                if(res.status === 200){
                    this.toast("Un mail va vous etre envoyé pour confirmer votre compte.")
                }else if(res.status === 403){
                    this.toast("Un compte avec cette email existe déjà.")
                }else{
                    this.displayServiceError()
                }
            })
        }
    }

}
window.registerController = new RegisterController()