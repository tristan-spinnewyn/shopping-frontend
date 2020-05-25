class List{
    constructor(shop,date,archived) {
        this.shop = shop
        this.date = date
        this.archived = archived
    }
}

class Item{
    constructor(label,quantity,checked,list_id) {
        this.label = label
        this.quantity = quantity
        this.checked = checked
        this.list_id = list_id
    }
}

class Share{
    constructor(user_id,list_id,rule) {
        this.user_id = user_id
        this.list_id = list_id
        this.rule = rule
    }
}

class User{
    constructor(login) {
        this.login = login
    }
}
