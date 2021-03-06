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
                    let id = await this.model.insert(new List(shop))
                    let list = await this.model.getList(id.id)
                    if(list !== undefined || list !== null){
                        this.toast("La liste a bien été inséré")
                        navigate('index')
                    }
                }
            }catch (e) {
                if(e === 401){
                    this.toast("Vous ne pouvez pas ajouter de liste tant que l'ancienne n'est pas archivé. Si vous voulez avoir plusieurs liste active vous pouvez devenir membre prenium!")
                }else{
                    this.displayServiceError()
                }
                console.log(e)
            }
        }
    }
}

window.editListController = new EditListController()