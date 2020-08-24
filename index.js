const destinationsContainer = document.querySelector('.destinations-container')

fetch('http://localhost:3000/destinations')
    .then(response => response.json())
    .then(json => {
        json.forEach( destination => {
            destinationsContainer.innerHTML +=
            `<div data-id='${destination.id}' class="card">
                <h3>${destination.location} - ${destination.locale}</h3>
                <p>Arrival: ${destination.arrival} Departure: ${destination.departure}</p>
            </div>`
        })
    })