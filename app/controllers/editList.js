class EditListController extends BaseFormController{
    constructor() {
        super(true);
        if(indexController.selectedList){
            self.list = indexController.selectedList
            indexController.selectedList = null
            $("#editTitleList").innerText = self.list.shop
            $("#fieldShopList").value= self.list.shop
        }
        this.model = new ListModel()
    }

    async save(){
        let shop = this.validateRequiredField('#fieldShopList','Nom de la liste')
        if(shop != null){
            try{
                if(self.list){
                    self.list.shop = shop
                    if(await this.model.update(self.list) === 200){
                        this.toast("la liste a bien été modifié")
                        self.list = null
                        navigate('index')
                    }else{
                        this.displayServiceError()
                    }
                }else{
                    if(await this.model.insert(new List(shop))===200){
                        this.toast("La liste a bien été inséré")
                        navigate('index')
                    }else{
                        this.displayServiceError()
                    }
                }
            }catch (e) {
                console.log(e)
                this.displayServiceError()
            }
        }
    }
}

window.editListController = new EditListController()