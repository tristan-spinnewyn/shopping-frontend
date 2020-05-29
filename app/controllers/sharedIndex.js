class SharedIndexController extends BaseController{
    constructor() {
        super(true);
        this.setActiveLink('listShared')
        this.setTitle('Autres listes')
        this.model = new SharedModel()
        this.shareModel = new ShareModel()
        this.tableAllSharedLists = $("#tableAllSharedLists")
        this.tableBodyAllSharedLists = $("#tableBodyAllSharedLists")
        this.displayAllList()
    }

    async displayAllList(){
        let content=""
        this.tableAllSharedLists.style.display = "none"
        try{
            for(const list of await this.model.getAllList()){
                const date = list.date.toLocaleDateString()
                content += `<tr><td>${list.shop}</td>
                            <td>${date}</td>
                            <td class="icon">
                            <button class="btn" onclick="sharedIndex.seeItem(${list.id})">Voir les articles</button>
                            </td></tr>`
            }
            this.tableBodyAllSharedLists.innerHTML = content
            this.tableAllSharedLists.style.display = "block"
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async seeItem(id){
        try{
            const object = await this.model.getList(id)
            if(object === undefined){
                this.displayServiceError()
                return
            }
            if(object === null){
                this.displayNotFoundError()
                return
            }
            this.selectedList = object
            navigate("itemSharedIndex")
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}
window.sharedIndex = new SharedIndexController()