class EditSharedItemController extends BaseFormController{
    constructor() {
        super(true);
        if(itemSharedIndexController.selectedItem){
            self.item = itemSharedIndexController.selectedItem
            itemSharedIndexController.selectedItem = null
            $("#editTitleItem").innerText = self.item.label
            $("#fieldLabelItem").value = self.item.label
            $("#fieldItemQuantity").value = self.item.quantity
        }
        this.list = itemSharedIndexController.list
        this.model = new SharedModel()
    }

    async save(){
        let label = this.validateRequiredField("#fieldLabelItem","Nom de l'article")
        let quantity = this.validateRequiredField("#fieldItemQuantity","quantité")
        if(label != null && quantity != null){
            try{
                if(self.item){
                    self.item.label = label
                    self.item.quantity = quantity
                    if(await this.model.updateItem(self.item) === 200){
                        this.toast("L'item a bien été modifié")
                        self.item = null
                        navigate('itemSharedIndex')
                    }else{
                        this.displayServiceError()
                    }
                }else{
                    if(await this.model.insertItem(new Item(label,quantity,false,itemSharedIndexController.list.id)) === 200){
                        this.toast("La liste a bien été inséré")
                        navigate('itemSharedIndex')
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
window.editSharedItem = new EditSharedItemController()