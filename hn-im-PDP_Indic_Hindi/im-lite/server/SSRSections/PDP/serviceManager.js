//file to manage PDP Service Hits
var request = require('request');
var makeRequest = require("../../GblComFunc").makeRequest;
var makegRPCRequest = require("../../GblComFunc").makegRPCRequest;
const requestIp = require('@supercharge/request-ip');

function getPDPdata(displayID, req, res) {
  let glidVal = "";
  let glidparam = '';
  if (req.cookies && req.cookies.ImeshVisitor) {
    glidVal = req.cookies.ImeshVisitor.split("|glid=")[1] ? req.cookies.ImeshVisitor.split("|glid=")[1].split("|")[0] : "";
  }
  if (glidVal) { glidparam = "USER_GLUSR_ID/" + glidVal + '/'; }

  let userIp = requestIp.getClientIp(req);
  if (userIp != undefined && userIp.substr(0, 7) == "::ffff:") { userIp = userIp.substr(7) }

  let isUserIP = true;
  if (userIp == '10.128.0.3' || userIp == '10.128.0.4' || userIp == '10.128.0.7' || userIp == '10.128.0.9' || userIp == '10.128.0.10' || userIp == '10.128.0.11' || userIp == '10.128.0.16') { isUserIP = false; }

  let actualIP = '';
  userIp != undefined && isUserIP ? actualIP = 'user_request_ip/' + userIp + '/' : actualIP = '';

  let options = {
    method: 'GET',
    url: require('../../ajaxRequests/ServiceUrls').PDP_PROD_DETAIL_URL + 'token/imobile@15061981/displayid/' + displayID + '/modid/IMOB/product_page/PRD_DETAIL/' + actualIP + glidparam,
    timeout: 3000
  };
  // console.log('serviceManager.js-PDP',options.url)
  let cbService = require("../../ajaxRequests/ServiceUrls").PDP_PROD_DETAIL_URL;
  // return new Promise(function (resolve, reject) {
  //     request(options, function (error, response, body) {
  //         if (error || response.statusCode !== 200) {
  //             reject('Service Failed');
  //         }
  //         else {
  //             let pdpData = JSON.parse(body);
  //             if (pdpData instanceof Array) {
  //                 resolve(body);
  //             }
  //             else if (pdpData["Status"] && pdpData["Status"] >= 400 && pdpData["Status"] < 500) {
  //                 //Invalid display id/Not Found
  //                 reject('Page Not Found');
  //             }
  //             else {
  //                 //Server Error
  //                 reject('Server Error');
  //             }
  //         }
  //     });
  // });
  return new Promise(function (resolve, reject) {
    if (isNaN(displayID)) {
      reject("Page Not Found")
    }
    else {
      makegRPCRequest(req, res, options, false, true, cbService,displayID).then(
        (pdpData) => {
          // console.log("PDP GRPC Data: ", pdpData);
          // let pdpDataNew = JSON.parse(pdpData);
          // if (pdpDataNew instanceof Array) {
          //   resolve(pdpData);
          // }
          // else if (pdpDataNew["Status"] && pdpDataNew["Status"] >= 400 && pdpDataNew["Status"] < 500) {
          //   resolve(pdpData);
          // } else {
          resolve(pdpData);
          // console.log("PDP GRPC DATA1: ", pdpData)
          // }
        },
        (error) => {
          reject('Server Error');
        }
      );
    }
  });
}

module.exports = getPDPdata;
