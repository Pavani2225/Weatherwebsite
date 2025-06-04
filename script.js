const weatherApi = {
    key: "3ee0a57f29d3e3ec05706a643e32ddde", // Replace with your actual OpenWeatherMap API key
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

const inputBox = document.getElementById('input-box');

inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getWeatherReport(inputBox.value);
    }
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            showWeatherReport(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            swal("Oops!", "City not found. Please try again.", "error");
        });
}

function showWeatherReport(weather) {
    if (!weather || !weather.sys) {
        return;
    }

    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const weatherCondition = weather.weather[0].main.toLowerCase();
    let bgImageUrl = '';

    if (weatherCondition.includes('clear')) {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img7.png)'; // clear sky
    } else if (weatherCondition.includes('cloud')) {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img1.png)'; // cloudy
    } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img2.png)'; // rainy
    } else if (weatherCondition.includes('thunderstorm')) {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img3.png)'; // thunderstorm
    } else if (weatherCondition.includes('snow')) {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img4.png)'; // snow
    } else if (weatherCondition.includes('mist') || weatherCondition.includes('fog') || weatherCondition.includes('haze')) {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img5.png)'; // mist/fog
    } else {
        bgImageUrl = 'url(C:/Users/addal/Downloads/Weather_webApp-main/Weather_webApp-main/img/img6.png)'; // default background
    }

    document.body.style.backgroundImage = bgImageUrl;

    let output = `
        <div class="location-details">
            <h2>${weather.name}, ${weather.sys.country}</h2>
            <p>${dateTime}</p>
        </div>
        <div class="weather-status">
            <h1>${weather.main.temp}°C</h1>
            <p>${weather.weather[0].main}</p>
        </div>
        <div class="other-details">
            <p>Humidity: ${weather.main.humidity}%</p>
            <p>Wind: ${weather.wind.speed} m/s</p>
        </div>
    `;

    const weatherBody = document.getElementById('weather-body');
    weatherBody.innerHTML = output;
    weatherBody.style.display = "block";
}