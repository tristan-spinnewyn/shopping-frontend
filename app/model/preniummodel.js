class PreniumModel{
    constructor() {
        this.api = new PreniumAPI()
    }

    insert(prenium,duree){
        return this.api.insert(prenium,duree).then(res => res.status)
    }

    async get(){
        try{
            let prenium = await this.api.get()
            return prenium
        }catch (e) {
            if(e === 404) return null
            return undefined
        }
    }
}