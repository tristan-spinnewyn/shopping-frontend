class PreniumController extends BaseFormController {
    constructor() {
        super(true);
        this.setActiveLink('prenium')
        this.setTitle('Prenium')
        this.model = new PreniumModel()
        this.displayPrenium()
    }

    async displayPrenium() {
        const options = {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
        let prenium = await this.model.get()
        if (prenium.max === null || prenium.max === undefined) {
            $("#currentPrenium").innerHTML = "Vous n'etes actuellement pas abonné"
        } else {
            let date = new Date(prenium.max)
            $("#currentPrenium").innerText = `Vous êtes actuellement abonnée jusqu'au ${date.toLocaleDateString('fr-FR', options)}. Chaque abonnement supplémentaire compte comme un renouvellement et repousse la date de fin.`
        }
    }

    async save() {
        let name = this.validateRequiredField("#fieldName", 'Nom')
        let prenom = this.validateRequiredField("#fieldLastName", 'Prenom')
        let duree = $("#fieldDuree").value
        let prenium = new Prenium(name, prenom)
        if (name != null && prenom != null) {
            if (await this.model.insert(prenium, duree) === 200) {
                this.toast("Votre abonnement prenium est bien pris en compte.")
                navigate('prenium')
            } else {
                this.displayServiceError()
            }
        }

    }
}

window.preniumController = new PreniumController()