class AdminAPI extends BaseAPIService{
    constructor() {
        super("admin");
    }

    getAll(){
        return fetchJSON(`${this.url}/listUser`,this.token)
    }
}