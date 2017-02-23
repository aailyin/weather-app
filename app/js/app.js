const WeatherAPI = require('./js/weather-api.js');
const View = require('./js/view.js');
const {ipcRenderer, shell} = require('electron');

class App {
    constructor() {
        this.api = new WeatherAPI();
        this.view = new View();  
    }
    displayWeather(loc) {
        let self = this;
        this.view.loading(true);
        this.api.getData(loc, function (data, err) {
            self.view.loading(false);
            if (err) {
                self.view.displayError();
            } else {
                self.view.displayData(data);
            }
        });
    }
}

$(document).ready(()=>{
    const app = new App();
    let loc = $('#cities').val();
    app.displayWeather(loc);

    $('#btnClose').on('click', ()=>{
        ipcRenderer.send('close-main-window');
    });

    $('#cities').change(function (){
        app.displayWeather(this.value);
    });

    $('a').click((event) => {
        event.preventDefault();
        ipcRenderer.send('open-details', event.target.href);
   });
});
