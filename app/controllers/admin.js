class AdminController extends BaseController {
    constructor() {
        super(true)
        this.svc = new AdminAPI()
        this.setActiveLink('isAdmin')
        this.setTitle('Administration')
    }
}
window.adminController = new AdminController()