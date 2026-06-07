async function getWeather() {

    let city = document.getElementById("city").value;

    let apiKey = "96c82f2f85e24e6887fdf7878672a9aa";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        let response = await fetch(url);
        let data = await response.json();

        if (data.cod == "404") {

            document.getElementById("weatherResult").innerHTML =
                "<p>City not found!</p>";

            return;
        }

        if (data.cod == "401") {

            document.getElementById("weatherResult").innerHTML =
                "<p>Invalid API Key!</p>";

            return;
        }

        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡️ Temperature: ${data.main.temp} °C</p>
            <p>☁️ Weather: ${data.weather[0].main}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {

        document.getElementById("weatherResult").innerHTML =
            "<p>Error fetching weather data.</p>";

        console.log(error);
    }
}