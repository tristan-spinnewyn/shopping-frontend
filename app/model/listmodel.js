class ListModel{
    constructor() {
        this.api = new ListAPI()
    }

    async getAllList(){
        let lists = []
        for(let list of await this.api.getAll()){
            list.date = new Date(list.date)
            lists.push(Object.assign(new List(), list))
        }
        return lists
    }

    async getList(id){
        try{
            const list = Object.assign(new List(), await this.api.get(id))
            list.date = new Date(list.date)
            return list
        }catch(e){
            if(e === 404) return null
            return undefined
        }
    }

    delete(id){
        return this.api.delete(id).then(res => res.status)
    }

    insert(list){
        return this.api.insert(list)
    }

    update(list){
        return this.api.update(list).then(res => res.status)
    }
}