// Listen for submit

document.querySelector('#zipform').addEventListener('submit', getLocationInfo);

function getLocationInfo(e){
    // Get zip value from input 
    const zip = document.querySelector('.zip').value;

    // Make request
    fetch(`http://api.zippopotam.us/NL/${zip}`)
    .then(response => {
        if(response.status != 200){
            showIcon('remove');
            document.querySelector('#output').innerHTML =
            `
            <article class = "message is-danger"><div class="message-body">Please try again, invalid zip code</div></article>
            `;
            throw Error(response.statusText);
        } else {
            showIcon('check');
            return response.json();
        }
    })
    .then(data => {
        //Show location information
        let output = '';
        data.places.forEach(place => {
            output += `
            <article class="message is-primary">
            
            <div class="message-header">
            
            <p>
            Location Info
            </p>

            <button class="delete"></button>
            </div>

            <div class="message-body">
            <ul>
            <li<strong>City: </strong>${place['place name']}</li>
            <li<strong>State: </strong>${place['state']}</li>
            <li<strong>Longitude: </strong>${place['longitude']}</li>
            <li<strong>Latitude: </strong>${place['latitude']}</li>
            </ul>
            
            </div>


            </article>
            `;
        });
        console.log(data);
        document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.log(err));


e.preventDefault();
}

function showIcon (icon) {
    // Clear icons 
    document.querySelector('.icon-remove').style.display = '';
    document.querySelector('.icon-check').style.display = '';
    // Show correct icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}