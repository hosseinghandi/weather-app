import {weatherCodes} from './WeatherCodes.js'
// import worldCities from "./worldCities.js";
// import { buildCityIndex, getCitySuggestions } from "./citySuggester.js";


//main excecustive block 
// getting start with once the page is loaded
initilizingPage()
// helper 
const get = el => document.getElementById(el)
const mainEl = get("main")
const imageselector= (weathercodes, dayOrNight ) => {
        return ((weatherCodedesc[weathercodes])[dayOrNight].category)
    }
// save latitude and longitude of the user by trying the vital api requests
// user based data
let lat, lon;
let locationIsAsked = false;
let askedLocationIs ;


// let savedLocation = JSON.parse(localStorage.getItem("savedCityList"));

// function updateLocalStorage(askedLocationIs) {
//     localStorage.setItem("savedCityList", JSON.stringify(askedLocationIs));
// }


// foundamental data source 

let weatherStorge = {};
let locationDataStorage = {};

// categorizing data source 
const exactTime = {
    day : now()[0],
    time : now()[1]}
let current 
let hourly 
let daily 
let weatherCodedesc = weatherCodes


// html const  
const videobackgroundEl = get("video-background-wrapper")
// baner section
const locationEl = get("location");
const mainTempEl = get("main-temp");
const highTempEl =get("high-tem");
const lowTempEl =get("low-tem");
const generalWeatherState = get("general-temp-state");

// hourly weather condition section
let dailyWeatherList = get("hourly-weather-wrapper");

// details section
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

// daily weather condition section
let weeklyWeatherList = get("Weekly-weather-wrapper");



// user interaction 
const searchBtnEl = get("searchInput")
// const searchBarWrapper = get("search-bar")
// const searchClick= get("search-icon")

document.addEventListener("click", (e) => { 
    // if (e.target.id === "search-icon-clicked") handelSerchBar() 
    if (e.target.id ===" city-input") {
        handelCitySearch(searchBtnEl.value) 
    }
})

document.addEventListener("keydown", (e) => { 
    if (e.key === "Enter") {
        handelCitySearch(searchBtnEl.value) 
    }
})


function handelSerchBar() {
    if (window.getComputedStyle(searchBarWrapper).display === "block") {
        searchBarWrapper.style.display = "none"
    } else {
        searchBarWrapper.style.display = "block"
    }


}

function handelCitySearch(city) {
    // updateLocalStorage(city)
    // handelSerchBar()

    locationIsAsked = true;
    askedLocationIs = city;
    searchBtnEl.value = ""
    fetchDataByCity(city)  
    }
    
// main block of the code

async function gettingLocationData (locationIsAsked) {

    const endpoint  = locationIsAsked ?`search?format=json&q=${askedLocationIs}&limit=1` : 
    `reverse?format=jsonv2&lat=${lat}&lon=${lon}`

    const responde = await fetch(`https://nominatim.openstreetmap.org/${endpoint}`)
    const data = await responde.json()
    const dataCorrection = locationIsAsked ? data[0]: data
    return dataCorrection
}




async function initilizingPage() {
    try {
            const pos = await getLocation();
            lat = (pos.latitude).toFixed(2);
            lon = (pos.longitude).toFixed(2);
            if (lat && lon ) {
                // once you get the latitude and longitude callback the functions to start rendering the page
                weatherStorge =  await getWeatherData (lat,lon);
                locationDataStorage = await gettingLocationData(locationIsAsked);
                // gettingMap(lat, lon);
    
                current = weatherStorge.current;
                hourly = weatherStorge.hourly;
                daily = weatherStorge.daily;
        
                if (weatherStorge && locationDataStorage) {
                    renderDataProvision();
                    mainEl.style.display ="block"}
                else { throw new Error ("Something goes wrong during checking the coordination of the user")};
            }
        }
    catch (err) {
        console.error(err);
    }    
    
}

async function fetchDataByCity() {
    try {
        locationDataStorage = await gettingLocationData(locationIsAsked);
        lat = locationDataStorage.lat;
        lon = locationDataStorage.lon;
        if (!(lat &&lon)) { throw new Error("Getting the location went wrong")};
        // getting new data  
        weatherStorge =  await getWeatherData (lat,lon);
        
        current = weatherStorge.current;
        hourly = weatherStorge.hourly;
        daily = weatherStorge.daily;
    
        if (weatherStorge && locationDataStorage) {
            console.log(locationDataStorage)
            renderDataProvision();
            // gettingMap(lat, lon);
        }
        else { throw new Error ("Something goes wrong during checking the coordination of the user")};
    
    } catch(err) {
        // if soemthing went wrong try to render the user location weather
        const pos = await getLocation();
        lat = (pos.latitude).toFixed(2);
        lon = (pos.longitude).toFixed(2);
        if (lat && lon ) {
        // once you get the latitude and longitude callback the functions to start rendering the page    
        // gettingMap(lat, lon);
    }    
    }   
    }    
    


function renderDataProvision() {
    const locationName =    locationDataStorage.name ||
                            locationDataStorage.display_name.split(",")[0];

    const weathercodeOfcurrentTimedesc = (weatherCodedesc[current.weather_code])[current.is_day].description;
    
    const  videoselector = () => {
        const weathercodeOfcurrentTimedcatgory = (weatherCodedesc[current.weather_code])[current.is_day].category;
        const deviceWidth = screen.width;
        let device ;
        if (deviceWidth > 400 && deviceWidth < 889) {
            device = "mobile"
        }
        else if (deviceWidth > 900 && deviceWidth < 1100) {
            device = "tablet"
        }
        else {
            device = "desktop"
        }

        return `${weathercodeOfcurrentTimedcatgory}-${device}`
    }


    videobackgroundEl.innerHTML = ""
    locationEl.innerHTML = ""
    mainTempEl.innerHTML = ""
    videobackgroundEl.innerHTML = 
    `
     <video autoplay muted loop playsinline preload="metadata" id="backVideo">
        <source 
            id="videoSource"
            loading="lazy"
            aria-hidden="true"
            src="videos/clear-mobile.mp4" 
            type="video/mp4">
    </video>
    `
    
    locationEl.innerHTML = `<img 
                class="loc-icon-s"
                src="icons/detailed/loc-b.png" 
                alt=" a location icon">
                <span   class="location" 
                        id="location">${locationName}</span>`


    mainTempEl.innerHTML = `${(current.apparent_temperature).toFixed(0)}<span class="degree">°</span>`                    
    highTempEl.innerHTML = `H:<span id="feelslike_temp">${(daily.temperature_2m_max[0].toFixed(0))}°</span>`
    lowTempEl.innerHTML = `L:<span id="feelslike_temp">${(daily.temperature_2m_min[0].toFixed(0))}°</span>`
    generalWeatherState.innerText = weathercodeOfcurrentTimedesc
    dailyWeatherList.innerHTML = hourlyWeatherRender(hourly)


    uvIndexEl.innerHTML = `<strong class="detail-value">${daily.uv_index_max[0]}</strong>`
    uvIndicator.style.left = daily.uv_index_max[0]*10 

    humidity.innerHTML = `<strong class="detail-value">${daily.relative_humidity_2m_mean[0]}%</strong>`
    
    visibilityEl.innerHTML = `<strong class="detail-value">${((daily.visibility_mean[0])/1000).toFixed()}</strong> km`
    pressureEl.innerHTML = `<strong class="detail-value">${daily.pressure_msl_mean[0]}</strong> hPa`

    rainIndicator.style.left = `${daily.precipitation_probability_mean[0]}%`
    rainEl.innerHTML = `<strong class="detail-value">${daily.precipitation_probability_mean[0]}</strong>%`

    windRender()

    sunRiseShine()

    weeklyWeatherList.innerHTML = dailyWeatherRender(daily)
    
}    


   

function windRender() {
    windArrow.style.setProperty("--angle",`${current.wind_direction_10m}deg`)   
    windVelocity.innerHTML = 
    ` <div class="wind-flex">
        <span class="detail-title">Wind</span>
        <span><strong class="detail-value">${current.wind_speed_10m}</strong></span>
    </div>
    `
    windGusts.innerHTML = 
    ` <div class="wind-flex">
        <span class="detail-title">Gusts</span>
        <span><strong class="detail-value">${current.wind_gusts_10m}</strong></span>
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
        <span class="detail-title">Direction</span>
        <span>
        <strong class="detail-value">${
            current.wind_direction_10m + "°" +
            " " +compass.points[compass.fromDegreetoPoint(current.wind_direction_10m)]
            }</strong>
            </span>
    </div>
    `
}

function sunRiseShine() {
    const sunRise = (daily.sunrise[0]).split("T")[1]
    const sunShine = (daily.sunset[0]).split("T")[1]
    
    const sunimageselector  = (sunShine, sunRise) => {
        const sunShineNum = Number(sunShine.split(":")[0])
        const sunRiseNum =  Number(sunRise.split(":")[0])
        let normlizedTime
        if(exactTime.time > sunRiseNum  && exactTime.time < sunShineNum) {
            normlizedTime = (exactTime.time - sunRiseNum) /(sunShineNum - sunRiseNum)          
        } else {
            normlizedTime = 1
        } 
        const imageidx = Math.floor(normlizedTime * 4)
        return imageidx
}

    sunWrapperEl.innerHTML =
    `
    <span id="sunrise">${sunRise} </span>
    <span id="sunshine">${sunShine}</span>
    `
    
    sunEl.src = `./icons/sunrise-shine/${sunimageselector(sunShine, sunRise)}.png`
}


function hourlyWeatherRender(hourly) {
    const take24hValues = data => { return data.slice(exactTime.time,exactTime.time + 24)}
    

    const tempDatatime =  take24hValues(hourly.time)
    const tempDatacel =  take24hValues(hourly.temperature_2m)
    const weathercodes_h = take24hValues(hourly.weather_code) 
    const dayOrNight = take24hValues(hourly.is_day)
    const actualhourList = tempDatatime.map( t => t.split("T")[1].split(":")[0])
    const correctedTime = actualhourList.length <= 25 ? filterTime(actualhourList) : 
    console.error("the actual hours list returns unexpected list length!")
    
    let htmlhourly = ""
    for(let i = 0 ; i < correctedTime.length ; i++){
    
        htmlhourly +=
        `
        <div class="weather-item-wrapper">
        <p >${correctedTime[i]}</p>
        
        <img    
        id="weather-icon"
        src="icons/weather-cond/${imageselector(weathercodes_h[i], dayOrNight[i])}.png" 
        alt="an icon weather condition">
        
            <p class="fontb-small-weather-list">${tempDatacel[i].toFixed()}<span id="temp"></span>°</p>
        </div>
        `
    }
    
    return htmlhourly
}


function dailyWeatherRender(daily) {

    const days = [ 
        "Monday", "Tuesday", 
        "Wednesday", "Thursday", 
        "Friday", "Saturday","Sunday"];
        const todayindx = days.indexOf(exactTime.day)
        const makeListOfDays = ((days.slice(todayindx + 1,7)) + `,${(days.slice(0, todayindx +1))}`).split(",")
        const dailyweatherlist = daily.temperature_2m_max
        const WeatherCodes_d = daily.weather_code
        let htmldaily= ""
        for(let i = 0 ; i < makeListOfDays.length - 1; i++){
            
            htmldaily +=
            `
            <div class="weather-item-wrapper">
            <p >${makeListOfDays[i].slice(0,3)}</p>

            <img    
            id="weather-icon"
            src="icons/weather-cond/${imageselector(WeatherCodes_d[i], 1)}.png" 
            alt="an icon weather condition">
            
            <p class="fontb-small-weather-list" >${dailyweatherlist[i].toFixed()}<span></span>°</p>
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
        "&hourly=weather_code,temperature_2m,is_day",
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


// function gettingMap(lat, lon) {
//     let map
//     // https://leafletjs.com/examples/quick-start/
//     L.map('map').remove()
//     map = L.map('map').setView([lat, lon], 13);
    
//     try {
//         if (!map) {
//             throw new Error("The map is not found")
//         }
//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         }).addTo(map);
    
//         var marker = L.marker([lat, lon]).addTo(map);
//         marker.bindPopup(`Your location : ${lat}, ${lon}`).openPopup();
    
        
//         map.on('click', (e)=> {
//             if (marker) map.removeLayer(marker);
//             marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//             marker.bindPopup(`You clicked on: ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`).openPopup();
//         })
//         return map;
//     }
    
//     catch(err) {
//         console.error("Error:" ,err.message, "\nStack:" , err.stack)
//         document.getElementById("map").innerHTML =
//         `<svg class="error-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C333.3 200 344 210.7 344 224L344 336C344 349.3 333.3 360 320 360C306.7 360 296 349.3 296 336L296 224C296 210.7 306.7 200 320 200zM293.3 416C292.7 406.1 297.6 396.7 306.1 391.5C314.6 386.4 325.3 386.4 333.8 391.5C342.3 396.7 347.2 406.1 346.6 416C347.2 425.9 342.3 435.3 333.8 440.5C325.3 445.6 314.6 445.6 306.1 440.5C297.6 435.3 292.7 425.9 293.3 416z"/></svg>
//         <p id="error-map">Opss! Something went wrong!</p>`
//     }
    
// }    

