class ResendActivationController extends BaseFormController{
    constructor() {
        super(false);
        this.svc = new UserAPI()
    }

    sendEmail(){
        let login = this.validateRequiredField("#fieldLogin",'Adresse e-mail')
        if(login != null){
            this.svc.resendEmail(login)
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
}

window.resendActivationController = new ResendActivationController()