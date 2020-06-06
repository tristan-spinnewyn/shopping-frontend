class PreniumAPI extends BaseAPIService{
    constructor() {
        super("prenium");
    }

    insert(prenium,duree){
        this.headers.set("Content-Type",'application/json')
        return fetch(`${this.url}/${duree}`,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(prenium)
        })
    }

    get(){
        return fetchJSON(this.url,this.token)
    }
}