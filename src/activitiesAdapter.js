class ActivitiesAdapter {
    constructor(){
        this.baseUrl = 'http://localhost:3000/activities'
    }

    //GET
    fetchActivities(){
        fetch(this.baseUrl)
            .then(response => response.json())
            .then(json => {
                json.forEach( act => {
                    let activity = new Activity(act)
                    // activity.attachToDom()
                })
            })
    }

    //CREATE
    createNewActivity(newActivityObj) {
        
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({activity: newActivityObj})
        }

        fetch(this.baseUrl, configObj)
            .then(response => response.json())
            .then(json => {
                let activity = new Activity(json);
            })
    }

    //DELETE
    deleteActivity(id) {
        let activity = document.getElementById(`activity-${id}`);
        activity.remove();

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(this.baseUrl + `/${id}`, configObj)
            .then(response => response.json())
            .then(json => {
                alert(json.message)
            })
    }

}