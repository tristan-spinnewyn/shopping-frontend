class ConfirmController extends BaseController{
    constructor() {
        super(false)
        this.svc = new UserAPI()
        this.confirmAccount()
    }

    confirmAccount(){
        const url = window.location.search
        const searchParams = new URLSearchParams(url)
        const user_id = searchParams.get('user_id')
        const token = searchParams.get('token')
        console.log(searchParams.has("user_id"))
        this.svc.confirmAccount(user_id,token)
            .then(res =>{
                if(res.status === 200)
                    $("#message").innerText = "Votre compte a bien été activé, vous pouvez vous connecter !"
                if(res.status === 401)
                    $("#message").innerText = "Le lien d'activation a expiré."
                if(res.status === 403)
                    $("#message").innerText = "Votre compte a déjà été activé!"
            })

    }
}

window.confirmController = new ConfirmController()