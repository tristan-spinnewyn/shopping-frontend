class ItemSharedIndexController extends BaseController{
    constructor() {
        super(true);
        this.setActiveLink('listShared')
        this.setTitle('Autres listes: Items')
        this.tableAllItems = $("#tableAllItems")
        this.tableBodyAllItem = $("#tableBodyAllItem")
        this.model = new SharedModel()

        if(sharedIndex.selectedList){
            this.list = sharedIndex.selectedList
            sharedIndex.selectedList = null
        }else if(editSharedItem.list){
            this.list = editSharedItem.list
            editSharedItem.list = null
        }
        this.displayAllItems()
    }

    async displayAllItems(){
        let content = "";
        this.tableAllItems.style.display = "none"
        try{
            const share = await this.model.getShare(this.list.id)
            for(const item of await this.model.getAllItem(this.list.id)){
                let checked = ""
                let editContent = ""
                if(item.checked){
                    checked = "checked"
                }
                if(share.rule === 2){
                    editContent = `<td><div class="switch">
                                    <label>
                                      Non
                                      <input type="checkbox" ${checked} onchange="itemSharedIndexController.check(${item.id})" id="checkItemForm-${item.id}">
                                      <span class="lever"></span>
                                      Oui
                                    </label>
                                </div></td>
                                <td>
                                    <button class="btn" onclick="itemSharedIndexController.displayConfirmDelete(${item.id})"><i class="material-icons">delete</i></button>
                                    <button class="btn" onclick="itemSharedIndexController.edit(${item.id})"><i class="material-icons">edit</i></button>
                                </td>`
                }else{
                    if(item.checked){
                        editContent = `<td>Oui</td>`
                    }else{
                        editContent = `<td>Non</td>`
                    }
                    $("#addItemShare").style.display = 'none'
                }
                content += `<tr>
                        <td>${item.label}</td>
                        <td>${item.quantity}</td>
                        ${editContent}
                    </tr>`
            }
            this.tableBodyAllItem.innerHTML = content
            this.tableAllItems.style.display = 'block'
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async edit(id){
        try{
            const object = await this.model.getItem(id)
            if(object === undefined){
                this.displayServiceError()
                return
            }
            if(object === null){
                this.displayNotFoundError()
                return
            }
            this.selectedItem = object
            navigate("editSharedItem")
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async check(id){
        const item = await this.model.getItem(id)
        if($(`#checkItemForm-${id}`).checked === true){
            item.checked = true
        }else{
            item.checked = false
        }

        try{
            if(await this.model.updateItem(item) === 200){
                if(item.checked)
                    this.toast("L'item a bien été validé")
                else
                    this.toast("Annulation de l'item fait")
            }else{
                this.displayServiceError()
            }
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    undoDelete(){
        if(this.deletedItem){
            this.model.insertItem(this.deletedItem).then(status => {
                if(status == 200){
                    this.deletedItem = null
                    this.displayUndoDone()
                    this.displayAllItems()
                }
            }).catch(_ =>{
                this.displayServiceError()
            })
        }
    }

    async displayConfirmDelete(id){
        try{
            const item = await this.model.getItem(id)
            super.displayConfirmDelete(item.label, async()=>{
                switch(await this.model.deleteItem(id)){
                    case 200:
                        this.deletedItem = item
                        this.displayDeletedMessage("itemSharedIndexController.undoDelete()")
                        break
                    case 404:
                        this.displayNotFoundError()
                        break
                    default:
                        this.displayServiceError()
                }
                this.displayAllItems()
            })
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}
window.itemSharedIndexController = new ItemSharedIndexController()