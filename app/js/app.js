const WeatherAPI = require('./js/weather-api.js');
const {ipcRenderer} = require('electron');

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

    $('#btnClose').on('click', ()=>{
        ipcRenderer.send('close-main-window');
    });
});

