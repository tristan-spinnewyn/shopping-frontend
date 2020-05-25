class EditItemController extends BaseFormController{
    constructor() {
        super(true);
        if(itemIndexController.selectedItem){
            self.item = itemIndexController.selectedItem
            itemIndexController.selectedItem = null
            $("#editTitleItem").innerText = self.item.label
            $("#fieldLabelItem").value = self.item.label
            $("#fieldItemQuantity").value = self.item.quantity
        }
        this.list = itemIndexController.list
        this.model = new ItemModel()
    }

    async save(){
        let label = this.validateRequiredField("#fieldLabelItem","Nom de l'article")
        let quantity = this.validateRequiredField("#fieldItemQuantity","quantité")
        if(label != null && quantity != null){
            try{
                if(self.item){
                    self.item.label = label
                    self.item.quantity = quantity
                    if(await this.model.update(self.item) === 200){
                        this.toast("L'item a bien été modifié")
                        self.item = null
                        navigate('itemIndex')
                    }else{
                        this.displayServiceError()
                    }
                }else{
                    if(await this.model.insert(new Item(label,quantity,false,itemIndexController.list.id)) === 200){
                        this.toast("La liste a bien été inséré")
                        navigate('itemIndex')
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

window.editItemController = new EditItemController()