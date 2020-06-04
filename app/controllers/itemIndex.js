class ItemIndexController extends BaseController {
    constructor() {
        super(true);
        this.setActiveLink('enCours')
        this.setTitle('Items')
        this.tableAllItems = $("#tableAllItems")
        this.tableBodyAllItem = $("#tableBodyAllItem")
        this.model = new ItemModel()
        if(indexController.selectedList) {
            this.list = indexController.selectedList
            indexController.selectedList = null
        }else if(editItemController.list){
            this.list = editItemController.list
            editItemController.list = null
        }
        this.displayAllItems()
    }

    async displayAllItems() {
        let content = ""
        this.tableAllItems.style.display = "none"
        try {
            for (const item of await this.model.getAllItems(this.list)) {
                console.log(item)
                let checked = "";
                if (item.checked) {
                    checked = "checked"
                }
                let editContent = ""
                if(!this.list.archived){
                    editContent += `<td><div class="switch">
                                    <label>
                                      Non
                                      <input type="checkbox" ${checked} onchange="itemIndexController.check(${item.id})" id="checkItemForm-${item.id}">
                                      <span class="lever"></span>
                                      Oui
                                    </label>
                                </div></td>
                                <td>
                                    <button class="btn" onclick="itemIndexController.displayConfirmDelete(${item.id})"><i class="material-icons">delete</i></button>
                                    <button class="btn" onclick="itemIndexController.edit(${item.id})"><i class="material-icons">edit</i></button>
                                </td>
                            `
                }else{
                    if(item.checked){
                        editContent = `<td>Oui</td>`
                    }else{
                        editContent = `<td>Non</td>`
                    }

                }
                content += `<tr>
                        <td>${item.label}</td>
                        <td>${item.quantity}</td>
                        ${editContent}
                    </tr>`
            }
            if(this.list.archived){
                $("#addItem").style.display = 'none'
            }
            this.tableBodyAllItem.innerHTML = content
            this.tableAllItems.style.display = 'block'
        } catch (e) {
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
            navigate("editItem")
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
            let status = await this.model.update(item)
            if(status === 200){
                if(item.checked)
                    this.toast("L'item a bien été validé")
                else
                    this.toast("Annulation de l'item fait")
            }else if(status === 401) {
                this.toast("Cette liste a été archivé il n'est donc pas possible de modifier les items")
                this.displayAllItems()
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
            this.model.insert(this.deletedItem).then(status =>{
                if(status ==200){
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
                switch(await this.model.delete(id)){
                    case 200:
                        this.deletedItem = item
                        this.displayDeletedMessage("itemIndexController.undoDelete()")
                        break
                    case 401:
                        this.toast("Cette liste a été archivé, il n'est donc pas possible de la modifier les items")
                        break;
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

window.itemIndexController = new ItemIndexController()