function getCityName(cityId) {
    try {
        let cityJSON = '';
        try {
            if (process.env.NODE_ENV) {
                cityJSON = require(`/home3/indiamart/public_html/${process.env.NODE_ENV}-m-indiamart/common/cityIDtoflname.json`)
            }
            else {
                cityJSON = require('./cityIDtoflname.json')
            }
        }
        catch (err) {
            console.log(err);
            cityJSON = require('./cityIDtoflname.json')
        }
        if (cityJSON[cityId]) {
            return cityJSON[cityId];
        }
        else {
            return "NOT_FOUND";
        }
    }
    catch (err) {
        console.log(err);
        return "PARSING_FAILED"
    }
}
module.exports = getCityName;