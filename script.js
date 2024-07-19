document.getElementById('searchButton').addEventListener('click', searchCity);

async function searchCity() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'f70330fa3f4c082bd712e2dc4307bcce';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const weatherData = data.list[i * 8];
        const dayElement = document.createElement('div');
        const tempFahrenheit = (weatherData.main.temp - 273.15) * 9/5 + 32;
        dayElement.innerHTML = `
            <h3>${new Date(weatherData.dt_txt).toLocaleDateString()}</h3>
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="${weatherData.weather[0].description}">
            <p>${weatherData.weather[0].description}</p>
            <p>Temperature: ${tempFahrenheit.toFixed(2)}°F</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Wind Speed: ${weatherData.wind.speed} mph</p>
        `;
        forecastContainer.appendChild(dayElement);
    }
}
