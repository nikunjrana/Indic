function cityHandler(path) {
    try {
        let cityOrcompany = path.split('/')[1];
        cityOrcompany = cityOrcompany.toLowerCase();
        let cityJSON = '';
        try {
            if (process.env.NODE_ENV) {
                cityJSON = require(`/home3/indiamart/public_html/${process.env.NODE_ENV}-m-indiamart/common/cityflname.json`)
            }
            else {
                cityJSON = require('./cityflname.json')
            }
        }
        catch (err) {
            console.log(err);
            cityJSON = require('./cityflname.json')
        }
        if (cityJSON[cityOrcompany]) {
            return "IMPCAT";
        }
        else {
            return "COMPANY";
        }
    }
    catch (err) {
        console.log(err);
        return "PARSING_FAILED"
    }
}
module.exports = cityHandler;