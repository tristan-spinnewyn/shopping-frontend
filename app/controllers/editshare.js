class EditShareController extends BaseFormController{
    constructor() {
        super(true);
        this.list = indexController.selectedList
        this.model = new ShareModel()
        this.userModel = new UserModel()
        this.listModel = new ListModel()
    }

    async save(){
        let userLogin = this.validateRequiredField("#fieldUserShare")
        let rule = 1
        let user = await this.userModel.getByLogin(userLogin)
        if($("#checkedModifList").checked === true){
            rule = 2
        }
        if(user === null){
            this.displayNotFoundError()
            return
        }
        let list = await this.listModel.getList(this.list.id)
        if(list === undefined){
            this.displayNotFoundError()
            return
        }
        if(await this.model.insert(new Share(user.id,list.id,rule)) === 200){
            this.toast("La liste a bien été partagé")
            navigate('index')
        }else{
            this.displayServiceError()
        }
    }
}

window.editShareController = new EditShareController()