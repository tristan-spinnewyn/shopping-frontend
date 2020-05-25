class BaseController {
    constructor(secured) {
        if (secured) { this.checkAuthentication() }
        M.AutoInit();
        this.setBackButtonView('index')
        this.model = new Model()
        let sidenavs = document.querySelectorAll('.sidenav')
        for (let i = 0; i < sidenavs.length; i++){
            M.Sidenav.init(sidenavs[i]);
        }
    }
    checkAuthentication(){
        if(sessionStorage.getItem('token') === null){
            window.location.replace("login.html")
        }
    }
    displayConfirmDelete(object, onclick) {
        if (object === undefined) {
            this.displayServiceError()
            return
        }
        if (object === null) {
            this.displayNotFoundError()
            return
        }
        $('#spanDeleteObject').innerText = object.toString()
        $('#btnDelete').onclick = onclick
        this.getModal('#modalConfirmDelete').open()
    }
    displayDeletedMessage(onUndo) {
        this.toast( `<span>Supression effectuée</span><button class="btn-flat toast-action" onclick="${onUndo}">Annuler</button>`)
    }
    displayUndoDone() {
        this.toast('Opération annulée')
    }
    displayNotFoundError() {
        this.toast('Entité inexistante')
    }
    toast(msg) {
        M.toast({html: msg, classes: 'rounded'})
    }
    displayServiceError() {
        this.toast('Service injoignable ou problème réseau')
    }
    getModal(selector) {
        return M.Modal.getInstance($(selector))
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    setActiveLink(active){
        $(`#enCours`).classList.remove('active')
        $(`#enCoursMobile`).classList.remove('active')
        $("#listShare").classList.remove('active')
        $("#listShareMobile").classList.remove('active')
        $("#listShared").classList.remove('active')
        $("#listSharedMobile").classList.remove('active')
        $("#account").classList.remove('active')
        $("#accountMobile").classList.remove('active')

        $(`#${active}`).classList.add('active')
        $(`#${active}Mobile`).classList.add('active')

    }

    setTitle(title){
        $('#titleSite').innerText = title
    }
}
