class Destination {

    static all = [];

    static findById = function(id){
        return Destination.all.find( e => e.id == id)
    }

    constructor({location, locale, arrival, departure, id}) {
        this.location = location;
        this.locale = locale;
        this.arrival = arrival;
        this.departure = departure;
        this.id = id;

        this.element = document.createElement('div')
        this.element.className = 'card'
        this.element.id = `destination-${this.id}`
        this.container = document.getElementById('destinations-container')


        Destination.all.push(this);
    
    }
    
    attachToDom(){
        // debugger;
        this.container.append(this.fullRender())
    }

    updateDestinationOnDom({location, locale, arrival, departure}){
        this.location = location;
        this.locale = locale;
        this.arrival = arrival;
        this.departure = departure;
        this.fullRender()
    }

    fullRender(){
        this.element.innerHTML =
        `<span class="whole-form"
        <h3><span class="location">${this.location}</span> - <span class="locale">${this.locale}</span></h3>
        <p>Arrival: <span class="arrival">${this.arrival}</span> Departure: <span class="departure">${this.departure}</span></p>
        <p><button class="delete" data-id="${this.id}">Delete</button> | 
        <button class="update" data-id="${this.id}">Update</button></p>
        </span>
        `
        
        return this.element;
    }
}



