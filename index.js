let lat, lon;
try {
const pos = await getLocation();  // wait until we have it
lat = (pos.latitude).toFixed(2);
lon = (pos.longitude).toFixed(2);
if (lat && lon ) {
    getWeatherData (lat,lon )
}
} catch (e) {
console.error(e);
}


function getLocation() {
    return new Promise((resolve, reject) => {
        
        if (!navigator.geolocation) return reject(new Error("Geolocation not supported"));
        
        navigator.geolocation.getCurrentPosition(
            p => resolve({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
            reject
        );
    });
}

async function getWeatherData (lat, lon) {
    const endpoints = "&daily=temperature_2m_max,temperature_2m_min,weather_code"
    const locationQuery = `latitude=${lat}&longitude=${lon}`
    const responde = await fetch(`https://api.open-meteo.com/v1/forecast?${locationQuery}${endpoints}`)
    const data = await (responde.json())
    console.log(data)
}


// this is to remove the current time from list of week 

function now(){
    
    var now = new Date()
    const days = ["Sunday", 
        "Monday", "Tuesday", 
        "Wednesday", "Thursday", 
        "Friday", "Saturday"];
    const today = days[now.getDay()]
    return today
}





