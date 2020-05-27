class LoginController extends BaseFormController {
    constructor() {
        super(false)
        this.svc = new UserAPI()
    }
    async authenticate() {
        let login = this.validateRequiredField('#fieldLogin', 'Adresse e-mail')
        let password = this.validateRequiredField('#fieldPassword', 'Mot de passe')
        if ((login != null) && (password != null)) {
            this.svc.authenticate(login, password)
                .then(res => {
                    sessionStorage.setItem("token", res.token)
                    sessionStorage.setItem("isAdmin", res.isAdmin)
                    window.location.replace("index.html")
                })
                .catch(err => {
                    console.log(err)
                    if (err == 401) {
                        this.toast("Adresse e-mail ou mot de passe incorrect (veuillez vérifier que vous avez bien activé votre compte)")
                    } else {
                        this.displayServiceError()
                    }
                })
        }
    }
}

window.loginController = new LoginController()
