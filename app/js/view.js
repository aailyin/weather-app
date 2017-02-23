class View {
    constructor() {
        this.$wind = $('#wind');
        this.$body = $('body');
        this.$tempature = $('#tempature');
        this.$pressure = $('#pressure');
        this.$humidity = $('#humidity');  
        this.$status = $('.image-status span');
        this.$image = $('.image-status img');
        this.$details = $('a');    
    }
    loading(isLoading) {
        if (isLoading) {
            this.$body.addClass('loading');
        } else {
            this.$body.removeClass('loading');
        }
    }
    displayData(data) {
        this.$wind.text(`${data.wind.direction}/${data.wind.speed} m/s`);
        this.$tempature.text(`${data.temp} C`);
        this.$pressure.text(data.pressure);
        this.$humidity.text(data.humidity);  
        this.$status.text(data.text);
        this.$image.attr('src', data.image);     
        this.$details.attr('href', data.link);  
    }
    displayError(err) {
        // too lazy to implement
        console.error(err);
    }
}

module.exports = View;