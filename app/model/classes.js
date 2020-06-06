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
    constructor(login,validate,active) {
        this.login = login
        this.validate = validate
        this.active = active
    }
}

class Role{
    construction(name){
        this.name = name
    }
}

class User_Role{
    constructor(user_id,role_id) {
        this.user_id = user_id
        this.role_id = role_id
    }
}

class Prenium{
    constructor(nom,prenom) {
        this.nom = nom
        this.prenom = prenom
    }
}
