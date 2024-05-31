import getPDPUrl from "../../../src/modules/PDP/utility/ExtendedPDP/getPDPUrl";
var shell = require('./shell');

function handleRedirect(req, res, shellCallBck, pageRedirect) {

    if (req.query.i && !isNaN(req.query.i)) {
        require('./serviceManager')(req.query.i,res).then((pdpData) => {
            let data = JSON.parse(pdpData);
            if(data["Status"] && data["Status"] >= 400 && data["Status"] < 500){
                shellCallBck(res, shell.pdp404());
            }
            else{
                let pdpUrl = getPDPUrl(data[0]['PC_ITEM_NAME'], req.query.i);
                pageRedirect(res, { status: 301, url: pdpUrl });
            }
            
        }, (error) => {
            if (error === 'Page Not Found') {
                shellCallBck(res, shell.pdp404());
            }
            else {
                shellCallBck(res, shell.pdp5XX());
            }
        });
    }
    else {
        shellCallBck(res, shell.pdp404());
    }
}
module.exports = handleRedirect;