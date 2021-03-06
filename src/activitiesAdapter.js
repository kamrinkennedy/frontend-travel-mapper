class ActivitiesAdapter {
    constructor(){
        this.baseUrl = 'https://limitless-caverns-63496.herokuapp.com/activities'
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
                if (json.error) {
                    alert(json.error)
                } else {
                let activity = new Activity(json);
                activity.destination.displayActivities();
                }
            })
    }

    //DELETE
    deleteActivity(id) {
        let activity = document.getElementById(`activity-${id}`);
        activity.remove();
        let activityIndex = Activity.all.findIndex( e => e.id == id)
        Activity.all.splice(activityIndex, 1)

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(this.baseUrl + `/${id}`, configObj)
            .then(response => response.json())
            .then(json => alert(json.message))
    }

}