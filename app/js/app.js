//import WeatherAPI from 'weather-api';

class App {
    constructor() {
        this.api = new WeatherAPI();
    }
    displayWeather() {
        var weatherData = this.api.getData();
        $('#data').text(weatherData.data);
    }
}

const app = new App();

$(document).ready(()=>{
    app.displayWeather();
});

