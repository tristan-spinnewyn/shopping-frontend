class IndexController extends BaseController {
    constructor() {
        super(true)
        this.setActiveLink('enCours')
        this.setTitle('Listes de course')
        this.tableAllLists = $("#tableAllLists")
        this.tableBodyAllLists = $("#tableBodyAllLists")
        this.model = new ListModel()
        this.modelItem = new ItemModel()
        this.displayAllList()
    }

    async displayAllList() {
        let content = ""
        this.tableAllLists.style.display = "none"
        try {
            for (const list of await this.model.getAllList()) {
                const date = list.date.toLocaleDateString()
                let terminer = "";
                if (list.archived) {
                    terminer = "checked"
                }
                content += `<tr><td>${list.shop}</td>
                            <td>${date}</td>
                            <td><div class="switch">
                                <label>
                                  Non
                                  <input type="checkbox" ${terminer} onchange="indexController.archiveList(${list.id})" id="archiveListForm-${list.id}">
                                  <span class="lever"></span>
                                  Oui
                                </label>
                              </div>
                            </td>
                            <td class="icon">
                            <button class="btn" onclick="indexController.seeItem(${list.id})">Voir les articles</button>
                            <button class="btn" onclick="indexController.displayConfirmDelete(${list.id})"><i class="material-icons">delete</i></button>
                            <button class="btn" onclick="indexController.edit(${list.id})"><i class="material-icons">edit</i></button>
                            <button class="btn" onclick="indexController.share(${list.id})"><i class="material-icons">share</i></button>
                            </td></tr>`
            }
            this.tableBodyAllLists.innerHTML = content
            this.tableAllLists.style.display = "block"
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async edit(id) {
        try {
            const object = await this.model.getList(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedList = object
            navigate("editList")
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async undoDelete() {
        if (this.deletedList) {
            let id = await this.model.insert(this.deletedList)
            let list = await this.model.getList(id.id)
            if(list === undefined || list === null){
                this.displayServiceError()
                return
            }
            this.deletedList = null
            this.displayUndoDone()
            this.displayAllList()
            for (const item of this.deletedListItem) {
                item.list_id = list.id
                await this.modelItem.insert(item)
            }

        }
    }

    async share(id) {
        try {
            const object = await this.model.getList(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedList = object
            navigate("editShare")
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async displayConfirmDelete(id) {
        try {
            const list = await this.model.getList(id)
            const items = await this.modelItem.getAllItems(list)
            super.displayConfirmDelete(list.shop, async () => {
                switch (await this.model.delete(id)) {
                    case 200:
                        this.deletedList = list
                        this.deletedListItem = items
                        this.displayDeletedMessage("indexController.undoDelete()")
                        break
                    case 404:
                        this.displayNotFoundError()
                        break
                    default:
                        this.displayServiceError()
                }
                this.displayAllList()
            })
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async archiveList(id) {
        const list = await this.model.getList(id);
        if ($(`#archiveListForm-${id}`).checked === true) {
            list.archived = true
        } else {
            list.archived = false
        }
        try {
            if (await this.model.update(list) === 200) {
                this.toast("La liste a bien été modifié.")
            } else {
                this.displayServiceError()
            }
        } catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async seeItem(id) {
        try {
            const object = await this.model.getList(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedList = object
            navigate("itemIndex")
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.indexController = new IndexController()
