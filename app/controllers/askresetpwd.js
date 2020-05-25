class AskResetPwd extends  BaseFormController{
    constructor() {
        super(false);
        this.svc = new UserAPI()
    }
    sendEmail(){
        let login = this.validateRequiredField("#fieldLogin",'Adresse e-mail')
        if(login != null){
            this.svc.resetEmail(login)
                .then(res =>{
                    if(res.status === 200){
                        this.toast("Un email vient de vous etre envoyé !")
                    }else if(res.status === 403){
                        this.toast("Ce compte a déjà été activé ou est inexistant")
                    } else{
                        this.displayServiceError()
                    }
                })
                .catch(err =>{
                    console.log(err)

                })
        }
    }

    async changePwd(){
        const url = window.location.search
        const searchParams = new URLSearchParams(url)
        const user_id = searchParams.get('user_id')
        const token = searchParams.get('token')
        let password = this.validateRequiredField("#fieldPassword",'Mot de passe')
        let confirmPassword = this.validateRequiredField("#fieldPasswordConfirm","Confirmer votre mot de passe")
        if(password !== confirmPassword){
            this.toast("Les mots de passe doivent etre identique")
            return
        }
        if(password != null){
            await this.svc.updateMdp(user_id,password,token).then(res =>{
                if(res.status===200){
                    this.toast("Le mot de passe a bien été modifié")
                }else if(res.status === 401){
                    this.toast("le lien a expiré.")
                }else{
                    this.displayServiceError()
                }
            })
        }
    }
}

window.askResetPwdController = new AskResetPwd()