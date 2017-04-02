const btn = document.getElementById('weather')
window.onload = function (e){
	document.getElementById('type_city').value =""
	document.getElementById('type_country').value = ""
}
const w_url = 'http://api.openweathermap.org/data/2.5/forecast?'
const w_apiKey = 'bb855184fa7a6149018085d5169671fc'
const l_url = 'http://locationiq.org/v1/search.php?key='
const l_apiKey = '1eb155b7032df0d3ecd4'
let lon,lat,w_data,icon

btn.addEventListener('submit', e => {
	e.preventDefault()
	const city = document.getElementById('type_city').value
	const country = document.getElementById('type_country').value
	const myDIV = document.getElementById('display')
	while (myDIV.hasChildNodes()) {
		myDIV.removeChild(myDIV.lastChild)
	}

	fetch(`${l_url}${l_apiKey}&format=json&city=${city}&country=${country}`)
	.then((res) => res.json())
	.then((data) => {
		lon = data[0].lon
		lat = data[0].lat
		get_weather(lon,lat)   
	})
	.catch((e) => console.log(e, "what's happening dave?"))
})

function get_weather(lon,lat)
{
	let i = 0
	fetch(`${w_url}lat=${lat}&lon=${lon}&APPID=${w_apiKey} `)
	.then((res) => res.json())
	.then((data) => {
		for(i=0;i<data.list.length;i=i+8)
		{
			w_data = data.list[i].weather[0].description
			icon = data.list[i].weather[0].icon
			display_images(data.list[i].dt_txt,w_data,icon,data.list[i].main.temp)
		}
	})
	.catch((e) => console.log(e, "what's happening dave?"))

}

function display_images(date,w_data,icon,temperature)
{
	const myDIV = document.getElementById('display')
	let my_date = document.createElement('h2')
	let my_desc_h3 = document.createElement('h3')
	let my_temp_h3 = document.createElement('h3')
	let myIMG = document.createElement('img')
	let my_span = document.createElement('span')
	let url = `icons/${icon}.png`
	let temp = Math.round(temperature - 273.15)
	date = date.substr(0,date.indexOf(' '))
	myIMG.setAttribute('src',url)
	my_date.textContent = date
	my_desc_h3.textContent = w_data
	my_temp_h3.textContent =  `${temp} `
	my_span.innerHTML = '&#176'
	my_temp_h3.appendChild(my_span)
	my_temp_h3.textContent = my_temp_h3.textContent + 'C'
	myDIV.appendChild(my_date)
	myDIV.appendChild(my_desc_h3)
	myDIV.appendChild(my_temp_h3)
	myDIV.appendChild(myIMG)
}


