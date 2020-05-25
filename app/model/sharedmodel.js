class SharedModel{
    constructor() {
        this.api = new SharedAPI()
    }

    async getShare(list_id){
        try{
            const share = Object.assign(new Share(), await this.api.getShare(list_id))
            return share
        }catch (e) {
            if(e===404) return null
            return undefined
        }
    }

    async getAllList(){
        let lists = []
        for(let list of await this.api.getAll()){
            list.date = new Date(list.date)
            lists.push(Object.assign(new List(),list))
        }
        return lists
    }

    async getList(id){
        try{
            const list = Object.assign(new List(),await this.api.getList(id))
            list.date = new Date(list.date)
            return list
        }catch (e) {
            if(e===404) return null
            return undefined
        }
    }

    updateList(list){
        return this.api.update(list).then(res=>res.status)
    }

    //partit item

    async getAllItem(list_id){
        let items = []
        for(let item of await this.api.getAllItem(list_id)){
            items.push(Object.assign(new Item(), item))
        }
        return items
    }

    async getItem(id){
        try{
            const item = Object.assign(new Item(), await this.api.getItem(id))
            return item
        }catch (e) {
            if(e===404) return null
            return undefined
        }
    }

    deleteItem(id){
        return this.api.deleteItem(id).then(res=>res.status)
    }

    insertItem(item){
        return this.api.insertItem(item).then(res=>res.status)
    }

    updateItem(item){
        return this.api.updateItem(item).then(res => res.status)
    }
}
