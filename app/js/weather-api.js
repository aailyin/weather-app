class WeatherAPI {
    constructor(url) {
        this.url = url;

        //TODO: mock
        if (!url) {
            this.data = { data: 'Cool weather!'};
        }
    }
    getData() {
        if(this.data) {
            return this.data;
        } else {
            //fetch this.url
        }
    }
}

//export default WeatherAPI