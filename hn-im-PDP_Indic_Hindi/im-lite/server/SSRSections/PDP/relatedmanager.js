var request = require('request');
var makeRequest = require("../../GblComFunc").makeRequest;

function getRelatedData(MCAT_ID,city,prod_count,edisplayID,ecomflag,req,res)
{

  let options = {
    method: 'GET',
    url: require('../../ajaxRequests/ServiceUrls').RECOMM_PROD_URL + "token/imobile@15061981/MCAT_ID1/" +
    MCAT_ID +
    "/CITY_ID/" +
    city +
    "/modid/IMOB/buyerid//count/" +
    prod_count +
    "/ecomflag/" +
    ecomflag +
    "/source/" +
    "product_detail_page" +
    "/rel_prd_flag/1/displayid/" +
    edisplayID +
    "/",
    timeout: 3000
};
// console.log('serviceManager.js-PDP',options.url)
let cbService = require("../../ajaxRequests/ServiceUrls").RECOMM_PROD_URL;
return new Promise(function (resolve, reject) {
  if(isNaN(MCAT_ID)) {
    reject("Page Not Found")
  }
  else {
  makeRequest(req,res, options, false, true,cbService).then(
      (pdpData) => {
      resolve(pdpData);
    },
    (error) => {
      reject('Server Error');
    }
  );
}
});

}

module.exports = getRelatedData;