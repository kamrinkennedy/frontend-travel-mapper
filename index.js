const destinationForm = document.getElementById('destination-form')
const destinationsAdapter = new DestinationsAdapter
const destinationsContainer = document.getElementById('destinations-container')


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

    const location = document.getElementById('destination-location').value
    const locale = document.getElementById('destination-locale').value
    const arrival = document.getElementById('destination-arrival').value
    const departure = document.getElementById('destination-departure').value
    
    let newDestinationObj = {
        location,
        locale,
        arrival,
        departure
    }
    destinationsAdapter.createNewDestination(newDestinationObj)        
}

function handleListClick(e){
    if ( e.target.className === 'delete' ){
        destinationsAdapter.deleteDestination(e.target.dataset.id)
    } else if (e.target.className === 'update') {
        e.target.innerText = "Save"
        e.target.className = 'save'
        updateDestinationFields(e.target.dataset.id);
    } else if (e.target.className === 'save'){
        e.target.innerText = "Update"
        e.target.className = 'update'
        destinationsAdapter.sendPatchRequest(e.target.dataset.id)
    }
}

function updateDestinationFields(id){
    let destination = Destination.findById(id)
    // debugger;

    let updateForm = `
    <input type="text" value="${destination.location}" name="location" id="update-location-${id}">
    <input type="text" name="locale" value="${destination.locale}" id="update-locale-${id}">
    <input type="date" name="arrival" value="${destination.arrival}" id="update-arrival-${id}">
    <input type="date" name="departure" value="${destination.departure}" id="update-departure-${id}">
    `

    let formDiv = document.createElement('div')
    formDiv.id = `update-form-${id}`
    formDiv.innerHTML = updateForm
    destination.element.querySelector('.whole-form').append(formDiv)
}

document.addEventListener('DOMContentLoaded', () => {
    addFormToDom();
    const addDestinationButton = document.getElementById('add-destination-button');
    addDestinationButton.addEventListener('click', handleAddDestinationButton)
    destinationsAdapter.fetchDestinations();
    // debugger;
    destinationForm.addEventListener('submit', handleDestinationFormSubmit)
    destinationsContainer.addEventListener('click', handleListClick)
})
