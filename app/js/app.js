const WeatherAPI = require('./js/weather-api.js');
const {ipcRenderer, shell} = require('electron');

class App {
    constructor() {
        this.api = new WeatherAPI();
        this.$wind = $('#wind');
        this.$body = $('body');
        this.$tempature = $('#tempature');
        this.$pressure = $('#pressure');
        this.$humidity = $('#humidity');  
        this.$status = $('.image-status span');
        this.$image = $('.image-status img');
        this.$details = $('a');      
    }
    displayWeather(loc) {
        let self = this;
        this.$body.addClass('loading');
        this.api.getData(loc, function (data, err) {
            self.$body.removeClass('loading');
            if(err) {
                self.handleError(err);
            } else {
                self.bindData(data);
            }
        });
    }
    bindData(data) {
        this.$wind.text(`${data.wind.direction}/${data.wind.speed} m/s`);
        this.$tempature.text(`${data.temp} C`);
        this.$pressure.text(data.pressure);
        this.$humidity.text(data.humidity);  
        this.$status.text(data.text);
        this.$image.attr('src', data.image);     
        this.$details.attr('href', data.link);               
    }
    handleError(err) {
        console.log(err);
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
        shell.openExternal(event.target.href);
   });
});

