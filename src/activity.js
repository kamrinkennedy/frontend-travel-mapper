class Activity {

    static all = [];
    static findById = function(id) {
        Activity.findById( e => e.id == id)
    }

    constructor({name, description, cost, id, destination_id}) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.id = id;
        this.destination_id = destination_id;

        this.container = document.getElementById(`activities-container`)
        this.element = document.createElement('div')
        this.element.className = 'activity-card'
        this.element.id = `activity-${this.id}`

        Activity.all.push(this)
    }

    attachToDom(){
        this.container.append(this.fullRender())
    }

    fullRender(){
        this.element.innerHTML =
        `<h4><strong><span class="name">${this.name}</span></strong></h4>
        <p><span class="description">${this.description}</span> <br>Cost: <span class="cost">${this.cost}</span></p>
        <button class="delete-activity" data-id="${this.id}">Delete</button> | <button class="update-activity" data-id="${this.id}">Update</button>
        `
        return this.element
    }


}