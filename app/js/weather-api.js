class WeatherAPI {
    constructor() {
        this.data = null;
    }
    getData(loc, callback) {
        $.simpleWeather({
            location: loc,
            woeid: '',
            unit: 'c',
            success: function (data){
                callback(data);
            },
            error: function (err) {
                callback(null, err);
            }
        });
    }
}

module.exports = WeatherAPI;