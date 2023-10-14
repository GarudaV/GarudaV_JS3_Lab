//Information about server and public key
const api = {
    key: "962e1a9efdc07f3d5470265f86842efa",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  //add keypress event on serach-box
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  //Event handler-- Keypress -- Enter key
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  //Fetch weather data from openweather site
  
  function getResults (query) {
   // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(weather => {
  
        //weather object contains info in string format which we require to convert json
        return weather.json();
      }).then((response)=>{
        console.log(response)
        
        //function to display all info on html page
        displayResults(response)});
  }
  
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }