const API_KEY = 'cebcd482eda57fa9a6714c1c2ba91885'


const elIconWeather = document.getElementById('icon-weather')
const elTemperature = document.getElementById('temperature')
const elLocal = document.getElementById('local')
const elHumidity = document.getElementById('humidity')
const elSpeedWind = document.getElementById('speed-wind')
const elCard = document.querySelector('.card')


function getData(local) {
    const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`
    return fetch(route).then(response => response.json())
}

function loadInformation() {
    getData(value).then(data => {
        console.log(data);
        if (data.cod === '404') {
            elCard.classList.remove('active')
            return
        }
        elCard.classList.add('active')

        elTemperature.innerHTML = Math.floor(data.main.temp) + '°C'
        elLocal.innerHTML = data.name
        elHumidity.innerHTML = data.main.humidity + '%'
        elSpeedWind.innerHTML = data.wind.speed + ' km/h'

        const icon = data.weather[0].main.toLocaleLowerCase()
        const src = `./IMG/meu-saco.com/${icon}.png`
        elIconWeather.setAttribute('src', src)

        fedeIn()

    })
}
function heandleSubmit(event) {
    event.preventDefault()

    fadeOut()

    const value = document.querySelector('[name="local"]').value


}
function fadeIn() {
    const timeLine = gsap.timeLine()
    const reset = { y: -50 }
    const animaEntrada = { y: 0, duration: 0.4, opacity: 0, ease: 'back' }


    timeLine.fromTo('footer', reset, animaEntrada)
    timeLine.fromTo('#local', reset, animaEntrada, 0.1)
    timeLine.fromTo('#temperature', reset, animaEntrada, 0.2)
    timeLine.fromTo('#icon-weather', reset, animaEntrada, 0.3)
}


function fadeOut() {
    const timeLine = gsap.timeLine({ onComplete: loadInformation })
    const animaSaida = { y: 50, duration: 0.4, opacity: 0, ease: 'slow' }

    timeLine.to('#icon-weather', animaSaida)
    timeLine.to('#temperature', animaSaida, 0.1)
    timeLine.to('#local', animaSaida, 0.2)
    timeLine.to('footer', animaSaida, 0.3)
}



document.querySelector('form').addEventListener('submit', heandleSubmit)


