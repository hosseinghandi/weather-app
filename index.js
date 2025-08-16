import {weatherCodes} from './WeatherCodes.js'
//main excecustive block 
// getting start with once the page is loaded

// helper 
const get = el => document.getElementById(el)
const mainEl = get("main")
// save latitude and longitude of the user by trying the vital api requests
let lat, lon;
let locationIsAsked = false;
let askedLocationIs = "berlin";

let weatherStorge = {};
let locationDataStorage = {};

const exactTime = now()
let current 
let hourly 
let daily 
let isDay 
let weatherCodedesc 


// html const  
// const videoSourceEl = get("videoSource")
const locationEl = get("location");
const mainTempEl = get("main-temp");
const highTempEl =get("high-tem");
const lowTempEl =get("low-tem");
const generalWeatherState = get("general-temp-state");

const uvIndexEl = get("uv-index")
const uvIndicator = get("uv-indicator")

const humidity = get("humidity")

const windArrow     = get("wind-compass-arrow");
const windVelocity  = get("wind-velocity");
const windGusts     = get("wind-gusts");
const windDirection = get("wind-direction");

const visibilityEl = get("visibility")
const pressureEl = get("pressure")
const rainEl = get("rain-chance")
const rainIndicator = get("rain-indicator")

const sunEl = get("sun-diagram")
const sunWrapperEl = get("sunTime-wrapper")


// html let
function uvRender() {
    uvIndexEl.innerHTML = `<strong class="detail-value">${daily.uv_index_max[0]}</strong>`
    uvIndicator.style.left = daily.uv_index_max[0]*10
}

function humidityRender() {
    humidity.innerHTML = `<strong class="detail-value">${daily.relative_humidity_2m_mean[0]}%</strong>`
}

function windRender() {
    windArrow.style.setProperty("--angle",`${current.wind_direction_10m}deg`)   
    windVelocity.innerHTML = 
    ` <div class="wind-flex">
        <span>Wind</span>
        <span>${current.wind_speed_10m}</span>
    </div>
    `
    windGusts.innerHTML = 
    ` <div class="wind-flex">
        <span>Gusts</span>
        <span>${current.wind_gusts_10m}</span>
    </div>
    `

    const compass = {
        points : ["N","NE","E","SE","S","SW","W","NW"], 
        fromDegreetoPoint(deg) {
            const normalized = (deg % 360 +360 )% 360
            const idx = Math.round(normalized / 45) % 8
            return idx
        }
    }

    windDirection.innerHTML = 
    ` <div class="wind-flex">
        <span>Direction:</span>
        <span>${
            compass.points[compass.fromDegreetoPoint(current.wind_direction_10m)]
            }</span>
    </div>
    `
}

function visibility() {
    visibilityEl.innerHTML = `<strong class="detail-value">${((daily.visibility_mean[0])/1000).toFixed()}</strong> km`
}

function pressure() {
    pressureEl.innerHTML = `<strong class="detail-value">${daily.pressure_msl_mean[0]}</strong>hPa`
}

function rainChance() {
    rainIndicator.style.left = daily.precipitation_probability_mean[0]/100
    rainEl.innerHTML = `<strong class="detail-value">${daily.precipitation_probability_mean[0]}</strong>%`
}

function sunRiseShine() {
    const sunRise = (daily.sunrise[0]).split("T")[1]
    const sunShine = (daily.sunset[0]).split("T")[1]
    
    sunWrapperEl.innerHTML =
    `
    <span id="sunrise">${sunRise} </span>
    <span id="sunshine">${sunShine}</span>
    `
    
    sunEl.src = `./icons/sunrise-shine/${imageselector(sunShine, sunRise)}.png`
}

function imageselector (sunShine, sunRise) {
        const sunShineNum = Number(sunShine.split(":")[0])
        const sunRiseNum =  Number(sunRise.split(":")[0])
        let normlizedTime
        if(exactTime[1] > sunRiseNum  && exactTime[1] < sunShineNum) {
            normlizedTime = (exactTime[1] - sunRiseNum) /(sunShineNum - sunRiseNum)          
        } else {
            normlizedTime = 1
        } 
        const imageidx = Math.floor(normlizedTime * 4)
        return imageidx
    }

let dailyWeatherList = get("hourly-weather-wrapper");
let weeklyWeatherList = get("Weekly-weather-wrapper");

console.log(weeklyWeatherList)
// main block of the code

try {
    if (!locationIsAsked) {
        const pos = await getLocation();
        lat = (pos.latitude).toFixed(2);
        lon = (pos.longitude).toFixed(2);
        if (lat && lon ) {
            // once you get the latitude and longitude callback the functions to start rendering the page
            weatherStorge =  await getWeatherData (lat,lon);
            locationDataStorage = await gettingLocationData(locationIsAsked);
            gettingMap(lat, lon);

            current = weatherStorge.current;
            hourly = weatherStorge.hourly;
            daily = weatherStorge.daily;
            isDay = current.is_day ? "day" : "night";
            weatherCodedesc = weatherCodes[weatherStorge.current.weather_code];
    
            if (weatherStorge && locationDataStorage) {
                renderDataProvision();
                mainEl.style.display ="block"}
            else { throw new Error ("Something goes wrong during checking the coordination of the user")};
        }    
    }    
    
    else {
        locationDataStorage = await gettingLocationData(locationIsAsked);
        lat = locationDataStorage[0].lat;
        lon = locationDataStorage[0].lon;
        if (!(lat &&lon)) { throw new Error("Getting the location went wrong")};
        // getting new data  
        weatherStorge =  await getWeatherData (lat,lon);
        gettingMap(lat, lon);
        
        
        // if soemthing went wrong try to render the user location weather
        const pos = await getLocation();
        lat = (pos.latitude).toFixed(2);
        lon = (pos.longitude).toFixed(2);
        if (lat && lon ) {
        // once you get the latitude and longitude callback the functions to start rendering the page    
            weatherStorge =  await getWeatherData (lat,lon);
            locationDataStorage = await gettingLocationData(locationIsAsked);
            gettingMap(lat, lon);
                current = weatherStorge.current;
                hourly = weatherStorge.hourly;
                daily = weatherStorge.daily;
                isDay = current.is_day ? "day" : "night";
                weatherCodedesc = weatherCodes[weatherStorge.current.weather_code];
            mainEl.style.display ="block"
            }            
    } 
}    
catch (err) {
    console.error(err);
}    


function renderDataProvision() {

    locationEl.innerHTML = `<img 
                class="loc-icon-s"
                src="icons/detailed/loc-b.png" 
                alt=" a location icon">
                <span   class="location" 
                        id="location">${locationDataStorage.address.residential}</span>`

    
    mainTempEl.innerHTML = `${(current.apparent_temperature).toFixed(0)}<span class="degree">°</span>`                    
    highTempEl.innerHTML = `H:<span id="feelslike_temp">${(daily.temperature_2m_max[0].toFixed(0))}°</span>`
    lowTempEl.innerHTML = `H:<span id="feelslike_temp">${(daily.temperature_2m_min[0].toFixed(0))}°</span>`
    generalWeatherState.innerText = weatherCodedesc[isDay].description 

    dailyWeatherList.innerHTML = hourlyWeatherRender(hourly)

    uvRender()
    humidityRender() 
    windRender()
    visibility ()
    rainChance()
    pressure()
    sunRiseShine()

    
    weeklyWeatherList.innerHTML = dailyWeatherRender(daily)
}    




function hourlyWeatherRender(hourly) {
    const tempDatatime =  hourly.time.slice(exactTime[1],exactTime[1] + 25)
    const tempDatacel = hourly.temperature_2m.slice(exactTime[1],exactTime[1] + 25)
    const actualhourList = tempDatatime.map( t => t.split("T")[1].split(":")[0])
    const correctedTime = actualhourList.length <= 25 ? filterTime(actualhourList) : 
    console.log("the actual hours list returns unexpected list length!")
    
    let htmlhourly = ""
    for(let i = 0 ; i < correctedTime.length ; i++){
    
        htmlhourly +=
        `
        <div class="hourly-item-wrapper">
        <p>${correctedTime[i]}</p>
        
        <img    
        id="monday-weather-icon"
        src="icons/weather-cond/cloudy-sunny-2.png" 
        alt="an icon weather condition">
        
            <p>${tempDatacel[i].toFixed()}<span id="temp" class="temp-small"></span>°</p>
        </div>
        `
    }
    
    return htmlhourly
}


function dailyWeatherRender(daily) {

    const days = ["Sunday", 
        "Monday", "Tuesday", 
        "Wednesday", "Thursday", 
        "Friday", "Saturday"];
        const dailyxx = daily
        
        let htmldaily= ""
        for(let i = 0 ; i < 7; i++){
            
            htmldaily +=
            `
            <div class="weekly-item-wrapper">
            <p>x</p>

            <img    
            id="monday-weather-icon"
            src="icons/weather-cond/cloudy-sunny-2.png" 
            alt="an icon weather condition">
            
            <p>x<span id="temp" class="temp-small"></span>°</p>
            </div>
            `
        }
        
        return htmldaily
}

function filterTime(timelist) {
    const correctedTime = []
    timelist.forEach(t => {
        if (t == "00"){
            correctedTime.push("24")
        }
        else if (t <= 9) {
            correctedTime.push(t.split("0")[1])
            // console.log(t.split("0")[1])
        } 
        else {
            correctedTime.push(t)
        }
    });
    correctedTime[0] ="now"
    return correctedTime
}





function getLocation() {
    // creating a promise for this part to handel the result
    return new Promise((resolve, reject) => {
        
        if (!navigator.geolocation) return reject(new Error("Geolocation not supported"));
        
        navigator.geolocation.getCurrentPosition(
            p => resolve({ latitude: p.coords.latitude, longitude: p.coords.longitude}),
            reject
        );
    });
}






async function getWeatherData (lat, lon) {
    // needed information for rendering the page 
    //making it easier to red the rquest
    const endpoint = [
        "&daily=visibility_min,pressure_msl_mean,visibility_mean,precipitation_probability_mean,relative_humidity_2m_mean,weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum",
        "snowfall_sum,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant",
        "shortwave_radiation_sum",
        "&hourly=weather_code,temperature_2m",
        "&minutely_15,visibility",
        "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_direction_10m,wind_speed_10m"
    ].join(",");
    
    const locationQuery = `latitude=${lat}&longitude=${lon}`
    
    const responde = await fetch(`https://api.open-meteo.com/v1/forecast?${locationQuery}${endpoint}`)
    const data = await (responde.json())
    // wait until we have it
    return data
}

// this is to remove the current time from list of week 

function now(){
    var now = new Date()
    const days = ["Sunday", 
        "Monday", "Tuesday", 
        "Wednesday", "Thursday", 
        "Friday", "Saturday"];
    const today = days[now.getDay()]
    const time = now.getHours()
    return [today, time]
}

function gettingMap(lat, lon) {

    // https://leafletjs.com/examples/quick-start/

    var map = L.map('map').setView([lat, lon], 13);
    try {
        if (!map) {
            throw new Error("The map is not found")
        }
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`Your location : ${lat}, ${lon}`).openPopup();
    
        
        map.on('click', (e)=> {
            if (marker) marker.remove();
            marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            marker.bindPopup(`You clicked on: ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`).openPopup();
        })
    }
    catch(err) {
        console.error("Error:" ,err.message, "\nStack:" , err.stack)
        document.getElementById("map").innerHTML =
        `<svg class="error-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C333.3 200 344 210.7 344 224L344 336C344 349.3 333.3 360 320 360C306.7 360 296 349.3 296 336L296 224C296 210.7 306.7 200 320 200zM293.3 416C292.7 406.1 297.6 396.7 306.1 391.5C314.6 386.4 325.3 386.4 333.8 391.5C342.3 396.7 347.2 406.1 346.6 416C347.2 425.9 342.3 435.3 333.8 440.5C325.3 445.6 314.6 445.6 306.1 440.5C297.6 435.3 292.7 425.9 293.3 416z"/></svg>
        <p id="error-map">Opss! Something went wrong!</p>`
    }
    
}    

async function gettingLocationData (locationIsAsked) {

    const endpoint  = locationIsAsked ?`search?format=json&q=${askedLocationIs}&limit=1` : 
    `reverse?format=jsonv2&lat=${lat}&lon=${lon}`

    const responde = await fetch(`https://nominatim.openstreetmap.org/${endpoint}`)
    const data = await responde.json()

    return data
}
