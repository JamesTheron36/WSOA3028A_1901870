
const hero = document.querySelector('.hero');
const headline = document.querySelector('.headline');

const tl = new TimelineMax();

tl.fromTo(hero, 1, {height: "0%"}, {height: "80%", ease: Power2.easInOut}).fromTo(hero, 1.2, {width: "100%"}, {width: "95%", ease: Power2.easInOut});

const NavSlider = () =>{
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active')

		navLinks.forEach((link, index) => {
		if(link.style.animation){
			link.style.animation = '';
		}
		else{
			link.style.animation = `NavLinkFade 0.5s ease forwards ${index/7 + 0.8}s`
		}
		
	});

		//burger anim
		burger.classList.toggle('toggle');
	});


} 


const app = () =>{
	NavSlider();
}



var x = document.getElementsByTagName("A");
var links = Array.from(x)
var click = new Audio();
click.src = "Sounds/ButtonClick.mp3";
console.log(links[0])


links.forEach(addSound);

function addSound(item) {
  item.addEventListener('click', event => {
    clcik.currentTime = 0;
    click.play();
    console.log("clicked");
  })
}



const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?id=993800&units=metric&appid=53217561e22fa44ddb8df2b800ca3a59";
const timeUrl = "https://worldtimeapi.org/api/timezone/Africa/Johannesburg"
const NYtimes = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=dozZiEtt7m3tik6iY73Uh56DlHCKNysP"

const currTime = document.getElementById('time');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');
const currTemp = document.getElementById('temp');
const humidity = document.getElementById('hum');
const description = document.getElementById('desc');
const icon = document.getElementById('weatherIcon');
const weatherCard = document.getElementById('weatherCard');

const titles = Array.from(document.getElementsByClassName('articleTitle'));
const authors = Array.from(document.getElementsByClassName('articleAuthor'));
const abstracts = Array.from(document.getElementsByClassName('articleAbstract'));
const articleLinks = Array.from(document.getElementsByClassName('articleLink'));


let sunrise = 0;
let sunset = 0;
let hum = 0;
let temp = 0;
let tempMin = 0;
let tempMax = 0;
let desc = "";
let time = 0;
let cond = "";
let strTime = ""


function FetchNYTimesData(){
	fetch(NYtimes).then(res => {
		if(res.ok){
			return res.json();
		}
		else{
			console.log("failure");
		}
	}).then(data => {
		for(var loop = 0; loop < 10; loop++){
			authors[loop].innerHTML = data.results[loop].byline;
			titles[loop].innerHTML = data.results[loop].title;
			abstracts[loop].innerHTML = data.results[loop].abstract;
			var link = data.results[loop].url;
			articleLinks[loop].setAttribute("href", link);
		}
	})
}

function FetchWeatherData(){
	fetch(weatherUrl).then(res => {
		if(res.ok){
			return res.json();
		}
		else{
			console.log("failure");
		}
	}).then(data =>{
	//currTemp.innerHTML = Math.round(data.main.temp).toString() + "&deg;";
	temp = Math.round(data.main.temp);
	desc = data.weather[0].description;
	cond = data.weather[0].main;
	tempMin = Math.round(data.main.temp_min)
	tempMax = Math.round(data.main.temp_max)
	hum = Math.round(data.main.humidity)
	//console.log(temp);
	sunrise = data.sys.sunrise;
	sunset = data.sys.sunset;
	console.log(strTime + " time");
	UpdateWeatherModule();
	SetIcon(cond);
	})
			
	
		
}

function FetchTimeData(){
	fetch(timeUrl).then(res => {
		if(res.ok){
			return res.json();
		}
		else{
			console.log("failure");
		}
	}).then(data =>{
	timeData = data;
	time = data.unixtime;
	strTime = ConvertTime(data.unixtime);
	
	
	FetchWeatherData();
	//UpdateTimeModule(time);
	//SetIcon(cond);
	})
}


function ConvertTimeMins(unix){
	var date = new Date(unix*1000);
	var mins = 0 + date.getMinutes();
	return mins;
}

function ConvertTimeSeconds(unix){
	var date = new Date(unix*1000);
	var mins = 0 + date.getSeconds();
	return mins;
}

function ConvertTimeHours(unix){
	var date = new Date(unix*1000);
	var hours = 0 + date.getHours();
	return hours;
}
function ConvertTime(unix){
	var date = new Date(unix*1000);
	var hours = date.getHours();
	var mins = date.getMinutes();
	if(mins > 9){
		var str = hours.toString() + ":" + mins.toString();
		return str;
	}
	else{
		var str = hours.toString() + ":0" + mins.toString();
	return str;
	}
	
}

function UpdateWeatherModule(){
	console.log(temp);
	currTemp.innerHTML = temp.toString() + "&deg;";
	description.innerHTML = desc;
	maxTemp.innerHTML = tempMax.toString() + "&deg;";
	minTemp.innerHTML = tempMin.toString() + "&deg;";
	humidity.innerHTML = hum.toString() + "%";
	currTime.innerHTML = strTime;
}

function SetIcon(condition){
	
	var night = false;
	if(time > sunrise & time < sunset){
		night = false;
		weatherCard.style.background = "var(--background-grad-day)";
	}
	else if(time >= sunset){
		night = true;
		weatherCard.style.background = "var(--background-grad-night)";
	}

	switch(condition){
		case "Thunderstorm":
			if(night == true){
				icon.src = "Icons/storm_night.png";
				console.log(icon.src);
			}
			else{
				icon.src = "Icons/storm_day.png";
				console.log(icon.src);
			}
			break;
		case "Drizzle":
			if(night == true){
				icon.src = "Icons/drizzle_night.png";
				console.log(icon.src);
			}
			else{
				icon.src = "Icons/drizzle_day.png";
				console.log(icon.src);
			}
			break;
		case "Clouds":
			if(night == true){
				icon.src = "Icons/night_cloudy.png";
				console.log(icon.src);
			}
			else{
				icon.src = "Icons/day_cloudy.png";
				console.log(icon.src);
			}
			break;
		case "Clear":
			if(night == true){
				icon.src = "Icons/night.png";
				console.log(icon.src);
			}
			else{
				icon.src = "Icons/sun.png";
				console.log(icon.src);
			}
			break;
		case "Rain": 
			icon.src = "Icons/rainy.png";
			console.log(icon.src);
			break;
		default:
			if(night == true){
				icon.src = "Icons/night.png";
				console.log(icon.src);
			}
			else{
				icon.src = "Icons/sun.png";
				console.log(icon.src);
			}
			break;
	}

	

}

function UpdateTimeModule(str){
	currTime.innerHTML = str;

}




app();
FetchNYTimesData();
FetchTimeData();
setInterval(function(){ FetchTimeData(); }, 63000);

//UpdateWeatherModule();