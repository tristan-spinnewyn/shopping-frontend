class ListAPI extends BaseAPIService{
    constructor() {
        super("list");
    }
    getAll(){
        return fetchJSON(this.url,this.token)
    }
    get(id){
        return fetchJSON(`${this.url}/${id}`,this.token)
    }
    delete(id){
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${id}`,{method: 'DELETE',headers: this.headers})
    }
    insert(list){
        this.headers.set('Content-Type','Application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'POST',
            headers: this.headers,
            body:JSON.stringify(list)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err => reject(err)))

    }
    update(list){
        this.headers.set('Content-Type','application/json')
        return fetch(this.url,{
            method:'PUT',
            headers: this.headers,
            body:JSON.stringify(list)
        })
    }
}
