class ShareModel{
    constructor() {
        this.api = new ShareAPI()
    }

    async getAllShare(){
        let shares = []
        let rows = await this.api.getAll()
        for(let share of rows.rows){
            shares.push(Object.assign(new Share(),share))
        }
        return shares
    }

    async get(user_id,list_id){
        try{
            const share = Object.assign(new Share(), await this.api.get(user_id,list_id))
            return share
        }catch (e) {
            if(e === 404) return null
            return undefined
        }
    }

    delete(user_id,list_id){
        return this.api.delete(user_id,list_id).then(res=>res.status)
    }

    insert(share){
        return this.api.insert(share).then(res=>res.status)
    }

    update(share){
        return this.api.update(share).then(res=>res.status)
    }
}