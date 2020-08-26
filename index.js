const destinationsContainer = document.querySelector('.destinations-container')
const destinationForm = document.getElementById('destination-form')

// const addDestinationsDiv = document.getElementById('add-destination-div')



function addFormToDom(){
    destinationForm.innerHTML +=
        `<label for="location">Location:</label><br>
        <input type="text" name="location" id="destination-location"><br><br>
        <label for="locale">Locale:</label><br>
        <input type="text" name="locale" id="destination-locale" placeholder="Beach, City, Woods, Etc."><br><br>
        <label for="arrival">Arrival Date: </label>
        <input type="date" name="arrival" id="destination-arrival"><br>
        <label for="departure">Departure Date: </label>
        <input type="date" name="departure" id="destination-departure"><br><br>
        <input type="submit" id="destination-subit"><br><br>`
}

function fetchDestinations(){
fetch('http://localhost:3000/destinations')
    .then(response => response.json())
    .then(addDestinationsToDom)
}

function addDestinationsToDom(response){
    response.forEach( destination => addDestinationToDom(destination) )
}

function addDestinationToDom(destination) {
    destinationsContainer.innerHTML += 
    `<div data-id='${destination.id}' class="card">
        <h3>${destination.location} - ${destination.locale}</h3>
        <p>Arrival: ${destination.arrival} Departure: ${destination.departure}</p>
    </div>`
}


function handleAddDestinationButton(e){
    const destinationForm = document.getElementById('destination-form');
    if (destinationForm.style.display === "none") {
        destinationForm.style.display = "block";
        e.target.value = "Hide Form"
    } else {
        destinationForm.style.display = "none";
        e.target.value = "Add Destination"
    }
}

function handleDestinationFormSubmit(e){
    e.preventDefault()

    const destinationLocation = document.getElementById('destination-location')
    const destinationLocale = document.getElementById('destination-locale')
    const destinationArrival = document.getElementById('destination-arrival')
    const destinationDeparture = document.getElementById('destination-departure')
    
    let newDestinationObj = {
        location: destinationLocation.value,
        locale: destinationLocale.value,
        arrival: destinationArrival.value,
        departure: destinationDeparture.value
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({destination: newDestinationObj})
    }

    fetch('http://localhost:3000/destinations', configObj)
        .then(response => response.json())
        .then(json => {
            addDestinationToDom(json)
        })
}


document.addEventListener('DOMContentLoaded', () => {
    addFormToDom();
    const addDestinationButton = document.getElementById('add-destination-button');
    addDestinationButton.addEventListener('click', handleAddDestinationButton)
    fetchDestinations();
    // debugger;
    destinationForm.addEventListener('submit', handleDestinationFormSubmit)
})
