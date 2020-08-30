const destinationForm = document.getElementById('destination-form')
const destinationsAdapter = new DestinationsAdapter
const destinationsContainer = document.getElementById('destinations-container')
const activitiesAdapter = new ActivitiesAdapter
const activitiesContainer = document.getElementById('activities-container')
const addDestinationButton = document.getElementById('add-destination-button');

//HIDE/SHOW ADD DESTINATION FORM
function handleAddDestinationButton(e){
    const destinationForm = document.getElementById('destination-form');
    if (e.target.value === "Add Destination") {
        destinationForm.style.display = "block";
        addDestinationButton.style.display = "none"
    } 
}

function cancelForm(e) {
    e.preventDefault()
    destinationForm.style.display = "none"
    addDestinationButton.style.display = "block"
    // destinationForm.parentElement.innerHTML += `<input type="button" id="add-destination-button" value="Add Destination" class="button">`
}



//HANDLES SUBMITTING NEW DESTINATION
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

//HANDLES UPDATE/SAVE FOR DESTINATIONS
//HIDE/SHOW ADD ACTIVITY FORM
function handleListClick(e){
    if ( e.target.className.includes('delete') ){
        destinationsAdapter.deleteDestination(e.target.dataset.id)
    } else if (e.target.className.includes('update')) {
        e.target.className = 'save button'
        e.target.innerText = "Save"
        updateDestinationFields(e.target.dataset.id);
    } else if (e.target.className.includes('save')){
        destinationsAdapter.sendPatchRequest(e.target.dataset.id)
        e.target.innerText = "Update"
        e.target.className = 'update button'

    } else if (e.target.className.includes('add-activity-button')) {
        let form = e.target.parentElement.parentElement.querySelector('.new-activity-form')
        if (form.style.display === 'none') {
            form.style.display = 'block'
            e.target.innerText = "Hide Form"
        } else {
            form.style.display = 'none'
            e.target.innerText = "Add Activity"
        }
    } else if (e.target.className.includes('show-activities-button')) {
        let activitiesTitle = document.getElementById('activities-title')
        let destination = Destination.findById(e.target.dataset.id)
        activitiesTitle.innerText = ''
        activitiesContainer.innerHTML = ''
        destination.displayActivities();
    } 

}

//HANDLES ACTIVITY CRUD CLICKS
function handleActivityClick(e){
    if (e.target.className === "delete-activity") {
        activitiesAdapter.deleteActivity(e.target.dataset.id)
    }
}

//CHANGES FIELDS IN DESTINATIONS TO BE UPDATEABLE
function updateDestinationFields(id){
    let destination = Destination.findById(id)

    let updateForm = `
    <div class="form-container">
        <div class="column">
            <label for="location">Location: </label>
            <input type="text" value="${destination.location}" name="location" id="update-location-${id}">
            <label for="locale">Locale: </label>
            <input type="text" name="locale" value="${destination.locale}" id="update-locale-${id}">
        </div>
        <div class="column">
            <label for="arrival">Arrival: </label>
            <input type="date" name="arrival" value="${destination.arrival}" id="update-arrival-${id}">
            <label for="departure">Departure: </label>
            <input type="date" name="departure" value="${destination.departure}" id="update-departure-${id}">
        </div>
    </div>
    `

    let formDiv = document.createElement('div')
    formDiv.id = `update-form-${id}`
    formDiv.innerHTML = updateForm
    destination.element.querySelector('.whole-form').innerHTML = ''
    destination.element.querySelector('.whole-form').append(formDiv)

}

//HANDLES SUBMITTING NEW ACTIVITY
function handleActivityFormSubmit(e){

    e.preventDefault();

    let name = e.target.querySelector('.destination-activity-name').value
    let description = e.target.querySelector('.destination-activity-description').value
    let cost = e.target.querySelector('.destination-activity-cost').value
    let destination_id = e.target.querySelector('.destination-id').value

    let newActivityObj = {
        name,
        description,
        cost,
        destination_id
    }
    e.target.reset();
    activitiesAdapter.createNewActivity(newActivityObj);
}

//INITIAL FETCHES AND EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    // addFormToDom();
    const addDestinationButton = document.getElementById('add-destination-button');
    const cancelButton = document.getElementById('cancel-form-button')
    destinationsAdapter.fetchDestinations();
    activitiesAdapter.fetchActivities();
    addDestinationButton.addEventListener('click', handleAddDestinationButton);
    destinationForm.addEventListener('submit', handleDestinationFormSubmit);
    destinationsContainer.addEventListener('click', handleListClick);
    destinationsContainer.addEventListener('submit', handleActivityFormSubmit);
    activitiesContainer.addEventListener('click', handleActivityClick)
    cancelButton.addEventListener('click', cancelForm)
});
