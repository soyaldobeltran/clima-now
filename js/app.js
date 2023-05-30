let temperature = document.getElementById('temperature');
let cityName = document.getElementById('city-name');
let descriptionWeather = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon')
const kelvin = 273.15;
const colorCard = document.getElementById('card')
window.addEventListener("load",()=> {
    randomWallpaper();
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const apiId = "cef6a0c4d345f79f398fef8e93a62018"
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}&lang=es`

            fetch(url)
            .then((response)=>{
                return response.json();
            
            })

            .then((data)=>{
                console.log("Esta es la data");
                console.log(data);
                const dataWeather = data.weather[0];
                temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
                cityName.textContent = data.name +" "+(data.sys.country);
                descriptionWeather.textContent = dataWeather.description;
                const icon = dataWeather.icon; 
                weatherIcon.innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${dataWeather.description}" width="100" height="auto">
                `;
                })
            })   
    }

})

function randomWallpaper(){
    const wallpaper = document.querySelector('.wallpaper');
    const wallpaperInfo = document.getElementById('wallpaper_info')
    const clientID = "BHuS-hU-E3J7z8mllOf42H70rgvmUNy3-penuHpsX0A";
    let endPoint = `https://api.unsplash.com/photos/random?query=wallpaper-nature&orientation=landscape&client_id=${clientID}`
    let params = {
        query: "landscape",
        orientation: "landscape"
    };

    fetch(endPoint)
        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData)
            wallpaper.style.backgroundImage = `url(${jsonData.urls.regular}`; 
            let userName = jsonData.user.first_name;
            let userLik = jsonData.user.portfolio_url;
            let unsplashLink = jsonData.links.html;
            wallpaperInfo.innerHTML = `</p>Foto de <a href="${userLik}" target="_blank">${userName}</a> en <a href="${unsplashLink}" target="_blank">Unsplash</a></p>`;
            

        })
        .catch(error => {
            console.log(error);
        });
}