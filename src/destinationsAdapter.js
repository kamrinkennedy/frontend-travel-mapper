class DestinationsAdapter {
    constructor(){
        this.baseUrl = "http://localhost:3000/destinations"
    }

    //GET 
    fetchDestinations(){
        fetch(this.baseUrl)
            .then(response => response.json())
            .then(json => {
                json.forEach( dest => {
                    // debugger
                    let destination = new Destination(dest)
                    destination.attachToDom()
                })
            })
    }

    //CREATE   
    createNewDestination(newDestinationObj){
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({destination: newDestinationObj})
        }
    
        fetch(this.baseUrl, configObj)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    alert(json.error)
                } else {
                let destination = new Destination(json)
                destinationForm.reset();
                destination.attachToDom();
                }
            })    
    }

    //DELETE
    deleteDestination(id) {
        //remove destination from DOM
        let dest = document.getElementById(`destination-${id}`)
        let title = document.getElementById('activities-title')
        let container = document.getElementById('activities-container')
        dest.remove();
        let destinationIndex = Destination.all.findIndex( e => e.id == id )
        
        //if activities are being displayed, clear them from dom
        // debugger;
        if (title.innerText != '') {
            if (title.innerText.replace(' Activities', '') === Destination.findById(id).location) {
                title.innerText = ''
                container.innerHTML = ''
            }
        }
        Destination.all.splice(destinationIndex, 1)
        
        //config object for delete request specs
        let configObj = {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            }
        }
        
        //remove destination from the database via delete request
        //also removes associated activities
        fetch(this.baseUrl + `/${id}`, configObj)
            .then(response => response.json())
            .then(json => {
                alert(json.message)
            })
    }

    //UPDATE
    sendPatchRequest(id){
        const location = document.getElementById(`update-location-${id}`).value
        const locale = document.getElementById(`update-locale-${id}`).value
        const arrival = document.getElementById(`update-arrival-${id}`).value
        const departure = document.getElementById(`update-departure-${id}`).value
        // debugger;

        let newDestinationObj = {
            location,
            locale,
            arrival,
            departure
        }

        let configObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(newDestinationObj)
        }

        fetch(this.baseUrl + `/${id}`, configObj)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    alert(json.error)
                } else {
                let destination = Destination.findById(id)
                destination.updateDestinationOnDom(json)
                }
            })
    }
}