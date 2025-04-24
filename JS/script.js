const API_KEY = 'cebcd482eda57fa9a6714c1c2ba91885';

const elIconWeather = document.getElementById('icon-weather');
const elTemperature = document.getElementById('temperature');
const elLocal = document.getElementById('local');
const elHumidity = document.getElementById('humidity');
const elSpeedWind = document.getElementById('speed-wind');
const elCard = document.querySelector('.card');

function getData(local) {
    const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${API_KEY}&units=metric`; 
    console.log(`URL da API: ${route}`);  // Verificando se a URL está certa
    return fetch(route)
        .then(response => response.json())
        .then(data => {
            console.log("Resposta da API:", data); // Exibe a resposta para ver o que está chegando
            return data;
        });
}

function loadInformation(value) {
    getData(value).then(data => {
        if (!data || data.cod === 404) {
            console.log("Cidade não encontrada ou resposta inválida!");  // Erro de cidade não encontrada
            elCard.classList.remove('active');
            return;
        }
        
        console.log("Cidade encontrada:", data.name);  // Confirmando cidade encontrada
        elCard.classList.add('active');  // Adiciona a classe "active" à card

        // Atualiza os dados de clima
        elTemperature.innerHTML = Math.floor(data.main.temp) + '°C';
        elLocal.innerHTML = data.name;
        elHumidity.innerHTML = data.main.humidity + '%';
        elSpeedWind.innerHTML = data.wind.speed + ' km/h';

        // Ajustando o ícone do clima
        const icon = data.weather[0].main.toLocaleLowerCase();
        const src = `./IMG/meu-saco.com/${icon}.png`;
        elIconWeather.setAttribute('src', src);
        
        // Removendo animação por enquanto para simplificar
        fadeIn();  // Se necessário, depois podemos adicionar animação novamente
    }).catch(error => {
        console.log("Erro ao chamar a API:", error);  // Em caso de erro de rede ou outro erro
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const value = document.querySelector('input[type="text"]').value;

    // Verificando se o campo de entrada está vazio
    if (!value) {
        console.log("Campo de cidade vazio!");  // Se o campo estiver vazio, retorna
        return;
    }

    fadeOut(value);  // Passa o valor para fadeOut para carregar as informações
}

function fadeIn() {
    // Removendo animações complexas por enquanto
    elCard.style.opacity = 1;
    elCard.style.transition = 'opacity 0.4s ease-in-out';
}

function fadeOut(value) {
    // Removendo animações complexas por enquanto
    elCard.style.opacity = 0;
    elCard.style.transition = 'opacity 0.4s ease-in-out';
    
    // Quando a animação acabar (esconde a card), carrega as novas informações
    setTimeout(() => loadInformation(value), 400);  // Espera a animação terminar para carregar as informações
}

// Lida com o envio do formulário
document.querySelector('form').addEventListener('submit', handleSubmit);
