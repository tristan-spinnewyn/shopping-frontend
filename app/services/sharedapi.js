class SharedAPI extends BaseAPIService{
    constructor() {
        super("shared");
    }
    getAll(){
        return fetchJSON(this.url,this.token)
    }
    getList(id){
        return fetchJSON(`${this.url}/list/${id}`,this.token)
    }
    updateList(list){
        this.headers.set('Content-Type','application/json')
        return fetch(`${this.url}/list`,{
            method:'POST',
            headers: this.headers,
            body: JSON.stringify(list)
        })
    }
    //item
    getAllItem(list_id){
        return fetchJSON(`${this.url}/item/list/${list_id}`,this.token)
    }
    getItem(item_id){
        return fetchJSON(`${this.url}/item/${item_id}`,this.token)
    }
    insertItem(item){
        this.headers.set('Content-Type','application/json')
        return fetch(`${this.url}/item`,{
            method:'POST',
            headers: this.headers,
            body:JSON.stringify(item)
        })
    }
    deleteItem(id){
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/item/${id}`,{
            method:'DELETE',
            headers: this.headers
        })
    }
    updateItem(item){
        this.headers.set('Content-Type','application/json')
        return fetch(`${this.url}/item`,{
            method:'PUT',
            headers:this.headers,
            body: JSON.stringify(item)
        })
    }
    //get share
    getShare(list_id){
        return fetchJSON(`${this.url}/getShare/${list_id}`,this.token)
    }
}