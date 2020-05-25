class ShareAPI extends BaseAPIService{
    constructor() {
        super("share");
    }

    getAll(){
        return fetchJSON(this.url,this.token)
    }
    get(user_id,list_id){
        return fetchJSON(`${this.url}/${user_id}/${list_id}`,this.token)
    }
    delete(user_id,list_id){
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${user_id}/${list_id}`,{method:'DELETE',headers: this.headers})
    }
    insert(share){
        this.headers.set('Content-Type','application/json')
        return fetch(this.url,{
            method:'POST',
            headers: this.headers,
            body: JSON.stringify(share)
        })
    }
    update(share){
        this.headers.set('Content-Type','application/json')
        return fetch(this.url,{
            method:'PUT',
            headers: this.headers,
            body: JSON.stringify(share)
        })
    }
}