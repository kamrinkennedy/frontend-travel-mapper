class Destination {

    static all = [];

    static findById = function(id){
        return Destination.all.find( e => e.id == id)
    }

    get activities(){
        return Activity.all.filter( act => act.destination_id == this.id)
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

    displayActivities = () => {
        let div = document.getElementById('activities-title')
        let container = document.getElementById('activities-container')
        div.innerHTML = `<h1>${this.location} Activities</h1>`
        container.innerHTML = ''

        this.activities.forEach( activity => {
            activity.attachToDom();
        })
    }


    fullRender(){
        // debugger;
        this.element.innerHTML =
        `<span class="whole-form">
        <h3><strong><span class="location">${this.location}</span> - <span class="locale">${this.locale}</span></strong></h3>
        <p>Arrival: <span class="arrival">${ new DateParser(this.arrival).fullDate }</span> | 
        Departure: <span class="departure">${ new DateParser(this.departure).fullDate }</span></p>
        </span>
        <p class="destination-buttons"><button class="delete button" data-id="${this.id}">Delete</button>  
        <button class="update button" data-id="${this.id}">Update</button></p>

        <p class="destination-buttons"><button class="add-activity-button button">Add Activity</button>  
        <button class="show-activities-button button" data-id="${this.id}">Show Activities</button></p>

        <form class="new-activity-form" method="POST">
        <label for="name">Name:</label><br>
        <input type="text" name="name" class="destination-activity-name"><br>
        <label for="description">Description:</label><br>
        <input type="text" name="description" class="destination-activity-description"><br>
        <label for="cost">Cost:</label><br>
        <input type="text" name="cost" class="destination-activity-cost"><br>
        <input type="hidden" class="destination-id" name="destination_id" value="${this.id}">
        <input type="submit" value="Submit" id="activity-submit-button" class="button">
        </form>
        `


        let form = this.element.querySelector(".new-activity-form")
        form.style.display = "none"
        return this.element;
    }
}



