const apiKey = "086dc6d514714db2a7f72247252209";

const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');

// Event listener for button click
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if(location === "") {
        alert("Please enter a city name");
        return;
    }
    getWeather(location);
});

// Optional: Fetch weather on Enter key
locationInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        searchBtn.click();
    }
});

async function getWeather(location) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`);
        if(!response.ok) {
            throw new Error("Location not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, country, localtime } = data.location;
    const { temp_c, condition, humidity, wind_kph } = data.current;

    // Split localtime into date and time
    const [date, time] = localtime.split(" ");

    weatherResult.innerHTML = `
        <h2>${name}, ${country}</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <div class="temp">${temp_c}°C</div>
        <p><strong>Condition:</strong> ${condition.text}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind:</strong> ${wind_kph} kph</p>
        <img src="https:${condition.icon}" alt="${condition.text}">
    `;
}
