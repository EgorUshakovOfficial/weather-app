const city = document.getElementById('city'); 

const country = document.getElementById('country'); 

const tempMag = document.getElementById('temp-number'); 

const tempUnit = document.getElementById('temp-unit'); 

const weatherImg = document.getElementById('weather-icon'); 

const weatherDescription = document.getElementById('weather-description')

let getLocation = () => {
	try{
		navigator.geolocation.getCurrentPosition(async position => {
			let url = ` https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`; 
			// Fetch API data
			await fetch(url)
				  .then(response => response.json())
				  .then(data => createWeatherApp(data)); 
		})
	}

	catch(err){
		console.log(err);
	}
}

// Creates weather app 
let createWeatherApp = (data) => {
	const {weather, sys, main, name} = data;

	// Update city 
	city.innerHTML = name; 

	// Update country 
	country.innerHTML = sys.country; 

	// Update temperature(scale)
	tempMag.innerHTML = Math.floor(main.temp); 

	// Update temperature unit 
	tempUnit.innerHTML = 'C'; 

	// Update weather image 
	weatherImg.src = weather[0].icon; 

	// Update weather description 
	weatherDescription.innerHTML = weather[0].description; 
	
}

tempUnit.addEventListener('click', ()=> {
	let scale = Number(tempMag.textContent);
	let unit = tempUnit.textContent;
	updateTemp(scale, unit);  
})

// Update temperature 
let updateTemp = (scale, unit) => {
	 let newScale, newUnit;  
	 if (unit === 'F'){
	 	newScale = (scale-32)*(5/9);
	 	newUnit = 'C'; 
	 }
	 else{
	 	newScale = scale*(9/5) + 32;
	 	newUnit = 'F'; 
	 }
	
	 // Update temeperature scale
	 tempMag.innerHTML = Math.round(newScale);

	 // Update temperature unit 
	 tempUnit.innerHTML = newUnit; 
}

getLocation();