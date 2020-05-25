class ShareIndexController extends BaseController{
    constructor() {
        super("true");
        this.setActiveLink('listShare')
        this.setTitle('Liste partagé')
        this.model = new ShareModel()
        this.modelUser = new UserModel()
        this.modelList = new ListModel()
        this.tableAllShare = $("#tableAllShare")
        this.tableBodyAllShare= $("#tableBodyAllShare")
        this.displayAllShare()
    }

    async displayAllShare(){
        let content = ""
        this.tableAllShare.style.display = "none"
        try{
            for(const share of await this.model.getAllShare()){
                let user = await this.modelUser.getById(share.user_id)
                let list = await this.modelList.getList(share.list_id)
                let checked = ""
                if(share.rule === 2){
                    checked = "checked"
                }
                content += `<tr>
                    <td>${list.shop}</td>
                    <td>${user.login}</td>
                    <td>
                        <div class="switch">
                            <label>
                                non
                                <input type="checkbox" ${checked} onclick="shareIndex.updateRule(${share.user_id},${share.list_id})" id="ruleShare-${share.user_id}-${share.list_id}">
                                <span class="lever"></span>
                                Oui
                            </label>
                        </div>
                    </td>
                    <td>
                        <button class="btn" onclick="shareIndex.displayConfirmDelete(${share.user_id},${share.list_id})"><i class="material-icons">delete</i></button>
                    </td>
                </tr>`
            }
            this.tableBodyAllShare.innerHTML = content
            this.tableAllShare.style.display = "block"
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async updateRule(user_id,list_id){
        const share= await this.model.get(user_id,list_id)
        if($(`#ruleShare-${user_id}-${list_id}`).checked === true){
            share.rule = 2
        }else{
            share.rule = 1
        }
        try{
            if(await this.model.update(share) === 200){
                this.toast("Les droits ont bien été modifié !")
            }else{
                this.displayServiceError()
            }
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    undoDelete(){
        if(this.deletedShare){
            this.model.insert(this.deletedShare).then(status=>{
                if(status==200){
                    this.deletedShare = null
                    this.displayUndoDone()
                    this.displayAllShare()
                }
            }).catch(_ =>{
                this.displayServiceError()
            })
        }
    }

    async displayConfirmDelete(user_id,list_id){
        try{
            const share = await this.model.get(user_id,list_id)
            super.displayConfirmDelete(share.list_id,async()=>{
                switch(await this.model.delete(user_id,list_id)){
                    case 200:
                        this.deletedShare = share
                        this.displayDeletedMessage("shareIndex.undoDelete()")
                        break
                    case 404:
                        this.displayNotFoundError()
                        break
                    default:
                        this.displayServiceError()
                }
                this.displayAllShare()
            })
        }catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}
window.shareIndex = new ShareIndexController()