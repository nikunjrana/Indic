var request = require("request");
var fs = require("fs");
const url = require('url');
const ON_PAGE = "";
const ERROR = 'SERVICE CONNECT FAILED';
const circuitBreaker = require('./CircuitBreaker/circuitBreaker');
const { PDPClient } = require('../server/grpcCalls/proto/pdpResponse_grpc_pb');
const { PDPRequest } = require('../server/grpcCalls/proto/pdpResponse_pb');
const { ImpcatClient } = require('../server/grpcCalls/proto/impcat_grpc_pb');
const { ImpcatRequest } = require('../server/grpcCalls/proto/impcat_pb')
const grpc = require('@grpc/grpc-js');
//Winston Logger
var winston = require("winston");
var date = new Date().toJSON().slice(0, 19).split("T")[0];
var year = date.slice(0, 4);
var month = date.slice(5, 7);
var day = date.slice(8, 10);
var fullDate = year + '-' + month + '-' + day;
const { combine, label, simple, printf } = winston.format;
const myFormat = printf(({ message }) => {
    return `${message}`;
});
const logger = winston.createLogger({
    format: combine(
        myFormat
    ),
    transports: [
        new winston.transports.File({
            filename: '/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log',
            // json: false,
            // timestamp: false,
            showLevel: false
        })]
});
const APP_SHELL_STRUCTURE = () => {
    return ({
        TITLE: '<title>IndiaMART Mobile Site</title>',
        META: '<meta name="robots" content="noindex,nofollow" />',
        ORG_SCHEMA: `<script type="application/ld+json">
        {"@context": "https://schema.org","@type": "Organization","name": "IndiaMART","url": "https://m.indiamart.com/","logo": "https://m.imimg.com/gifs/indiamartlogo.jpg","contactPoint": [{ "@type": "ContactPoint", "telephone": "+91-96-9696-9696", "contactType": "customer service" }],"sameAs": ["https://www.facebook.com/IndiaMART","https://twitter.com/IndiaMART","https://www.linkedin.com/company/indiamart-intermesh-limited/","https://www.youtube.com/user/indiamart","https://en.wikipedia.org/wiki/IndiaMART","https://www.instagram.com/indiamartofficial/"]}
        </script>`,
        PRE_CONNECTS: `	
        <link rel="manifest" href="/manifest.json" crossorigin="use-credentials">
    <link rel="preconnect" href="https://m.imimg.com/" crossorigin >
    <link rel="dns-prefetch" href="https://m.imimg.com/"  >  
    <link rel="preconnect" href="https://utils.imimg.com/" crossorigin > 
    <link rel="dns-prefetch" href="https://utils.imimg.com/" crossorigin > 
    <link rel="preconnect" href="https://1.imimg.com/" crossorigin > 
    <link rel="dns-prefetch" href="https://1.imimg.com/" > 
    <link rel="preconnect" href="https://2.imimg.com/" crossorigin >
    <link rel="dns-prefetch" href="https://2.imimg.com/"  >
    <link rel="preconnect" href="https://3.imimg.com/" crossorigin > 
    <link rel="dns-prefetch" href="https://3.imimg.com/"  > 
    <link rel="preconnect" href="https://4.imimg.com/" crossorigin >
    <link rel="dns-prefetch" href="https://4.imimg.com/" >
    <link rel="preconnect" href="https://5.imimg.com/" crossorigin > 
    <link rel="dns-prefetch" href="https://5.imimg.com/"  > 
    <link rel="preconnect" href="https://ajax.googleapis.com/" crossorigin >   
    <link rel="dns-prefetch" href="https://ajax.googleapis.com/"  >   
    <link rel="preconnect" href="https://www.googletagmanager.com/" crossorigin >
    <link rel="dns-prefetch" href="https://www.googletagmanager.com/"  >
    <link rel="preconnect" href="https://suggest.imimg.com/" crossorigin >
    <link rel="dns-prefetch" href="https://suggest.imimg.com/"  >
    <link rel="preconnect" href="https://mc.yandex.ru" crossorigin >
    <link rel="dns-prefetch" href="https://mc.yandex.ru"  >
    <link rel="preconnect" href="https://recommended.imutils.com" crossorigin >
    <link rel="dns-prefetch" href="https://recommended.imutils.com"  >
    <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossorigin >
    <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net"  >
    <link rel="preconnect" href="https://www.google-analytics.com" crossorigin >
    <link rel="dns-prefetch" href="https://www.google-analytics.com"  >
    <link rel="preconnect" href="https://adservice.google.co.in" crossorigin >
    <link rel="dns-prefetch" href="https://adservice.google.co.in"  >`,
        HEAD_SCRIPTS: ``,
        STATE: '',
        SEARCHBAR: 'DEFAULT',
        LOADER: 'DEFAULT',
        CSS: '',
        CANONICAL_LINKS: '',
        METAOGTAGS: '',
        BODY_SCRIPTS: '',
        FOOTER: 'DEFAULT',
        FOOTER_LINK: '',
        ROOT_MT: 'DEFAULT',
        STATUS: 200
    })
}
const shellToken = {
    "dev": `<meta http-equiv="origin-trial" content="AjYLkv+23dlMvBHCKTyemTTpqa2bNmDprLClt49tisd1DD1NsruKgW6qXGBEud25RUTjMRKdrdF0YbKSNySs7gQAAABYeyJvcmlnaW4iOiJodHRwczovL2Rldi1tLmluZGlhbWFydC5jb206NDQzIiwiZmVhdHVyZSI6IlNtc1JlY2VpdmVyIiwiZXhwaXJ5IjoxNTgzODg0Nzk5fQ=="></meta>`,
    "stg": `<meta http-equiv="origin-trial" content="AjpUbQ6fRwAJUOJMqojbU3tftR7p33derazGbawFhmwGYm2Hi6K8cw/KEUYLVzSmWVHzwtFob07aMhI4CEzqKA8AAABYeyJvcmlnaW4iOiJodHRwczovL3N0Zy1tLmluZGlhbWFydC5jb206NDQzIiwiZmVhdHVyZSI6IlNtc1JlY2VpdmVyIiwiZXhwaXJ5IjoxNTgzODg0Nzk5fQ=="></meta>`,
    "prod": `<meta http-equiv="origin-trial" content="AuEJOV0e0beLDLxsXNbKHpNlqPKDK5q9Rw/E57nV2cnynJSLjoweufGAu5+Q8LcFSdduTqhIau61fGqfbbYF5AAAAABUeyJvcmlnaW4iOiJodHRwczovL20uaW5kaWFtYXJ0LmNvbTo0NDMiLCJmZWF0dXJlIjoiU21zUmVjZWl2ZXIiLCJleHBpcnkiOjE1ODM4ODQ3OTl9"></meta>`
};
const securePayUrls = [
    "r=payments/APP/getPackageDetails/",
    "r=payments/Pay/generateOrderID/",
    "r=invoice/Oms/createinvoice"
];
const securearray = [
    "/addressbook/listContactUnread",
    "/addressbook/conversationList",
    "/addressbook/detailContact/",
    "/addressbook/listContact",
    "/enquiry/findEnquiry/",
    "/enquiry/findMail/",
    "/wservce/products/listing/",
    "/enquiry/InsertSendReply/",
    "/wservce/buyleads/Purchase/",
    "/wservce/leads/markfav/",
    "/wservce/leads/notinterested/",
    "/wservce/rfq/display/",
    "/wservce/products/add/",
    "/wservce/products/uploadimage/",
    "/wservce/users/detail/",
    "/wservce/users/forgotpassword/",
    "/wservce/users/seller/",
    "/wservce/users/verifiedDetail/",
    "/wservce/users/credit/",
    "/wservce/products/userlisting/",
    "/seller_activity",
    "/user/update",
    "/details/",
    "/wservce/users/edit/",
    "/wservce/users/setting/",
    "/index.php",
    "/users/otherdetail/",
    "/details",
    "/wservce/buyleads/shortlisted/",
    //   "/user/verification",
    "/wservce/users/attrdispositions/",
    "/user/dispositon",
    "/Buyerattributes/GetBuyerData/",
    "/Buyerattributes/GetBigBrand/",
    "/Buyerattributes/GetMcatRecomendation/",
    "/UserAttributes/GetAttributes/",
    "/wservce/users/supplierrating/",
    "/supplierrating",
    "/enquiry/chatCreateUser",
    "/wservce/buyleads/detail/",
    "/wservce/buyleads/delete/",
    "/wservce/buyleads/pushtotop/",
    "/search/",
    "/addressbook/readReceipt",
    "/wservce/users/buyerprofile/",
    "/addressbook/markLeadAsStarred",
    "/orders/getOrderList/",
    "/orders/getOrderDetail",
    "/orders/getDispositionList/",
    "/orders/cancelOrder/",
    "/orders/generateOrder",
    "/orders/enrichOrder",
    "/orders/finishOrder",
    "/addressbook/latestTransactionDetail/",
    "/enquiry/getTemplateList/",
    "/enquiry/createTemplate/",
    "/wservce/Products/StandardProductHomePage/",
    "/wservce/buyleads/display/",
    "/rating_usefulness",
    "/index.php/Custfeedback/helpfeedback",
    "/index.php/Tickets/TicketIssue",
    "/index.php/tickets/viewtickets/",
    "/",
    "/user/logout/",
    "/search/ims",
    "/user/user_block_unblock"
];
const secureDomains = [
    "impcat.imutils.com",
    "enq2.intermesh.net",
    "leads.imutils.com",
    "mapi.indiamart.com",
    "seller.imutils.com",
    "service.intermesh.net",
    "enqphp.intermesh.net",
    "dev-leads.imutils.com",
    "stg-leads.imutils.com",
    "35.232.184.46:8093",
    "162.217.96.117:8093",
    "dev-mapi.indiamart.com",
    "stg-mapi.indiamart.com",
    "dev-seller.imutils.com",
    "stg-seller.imutils.com",
    "dev-service.intermesh.net",
    "stg-service.intermesh.net",
    "pay.indiamart.com",
    "dev-pay.indiamart.com",
    "fts-master.intermesh.net",
    "users.imutils.com",
    "stg-users.imutils.com",
    "imsearch.indiamart.com",
    "recommend.imutils.com",
    "lms.imutils.com",
    "dev-lms.imutils.com",
    "stg-lms.imutils.com",
    "paywith.indiamart.com",
    "dev-paywith.indiamart.com",
    "cds.imutils.com",
    "merp.intermesh.net",
    "suggestive.imutils.com",
    "34.93.121.162",
    "login.indiamart.com",
    'imsearch.indiamart.com:8983',
];

function checkUserStatus(req) {
    if (req.cookies && req.cookies.ImeshVisitor && req.cookies.im_iss) {
        return 2;
    }
    else if (req.cookies && req.cookies.ImeshVisitor) {
        return 1;
    }
    else {
        return 0;
    }
}
function objIsEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
function isSecureUrl(service_url, mode) {
    var service_hostname = url.parse(service_url).hostname;
    var service_path = url.parse(service_url).pathname;
    var service_query = url.parse(service_url).query;
    if (service_hostname.indexOf("pay") > -1) {
        if (secureDomains.includes(service_hostname)) {
            if (securearray.includes(service_path)) {
                if (securePayUrls.includes(service_query)) {

                    return true;

                }
                else {

                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    } else if (service_hostname.indexOf("recommend") > -1) {
        if (secureDomains.includes(service_hostname)) {
            if (securearray.includes(service_path) && mode == '3') {
                return true
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }


    } else {
        if (secureDomains.includes(service_hostname)) {
            if (securearray.includes(service_path)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
function securecookie(req, res) {
    var v4iilex = {};
    var imesh = {};
    var im_iss = {};
    var im_iss_obj = {};
    var iploc = {};
    if (req.cookies.ImeshVisitor !== undefined) {
        req.cookies.ImeshVisitor.split('|').forEach(function (x) {
            var arr = x.split('=');
            if (arr[1] == "") { imesh[arr[0]] = "" }
            arr[1] && (imesh[arr[0]] = arr[1]);
        });
    }
    if (req.cookies.v4iilex !== undefined) {
        req.cookies.v4iilex.split('|').forEach(function (x) {
            var arr = x.split('=');
            if (arr[1] == "") { v4iilex[arr[0]] = "" }
            arr[1] && (v4iilex[arr[0]] = arr[1]);
        });
    }
    if (req.cookies.iploc !== undefined) {
        req.cookies.iploc.split('|').forEach(function (x) {
            var arr = x.split('=');
            if (arr[1] == "") { iploc[arr[0]] = "" }
            arr[1] && (iploc[arr[0]] = arr[1]);
        });
    }
    if (req.cookies.im_iss !== undefined) {
        im_iss = req.cookies.im_iss;
        let arr = req.cookies.im_iss.split('=')
        im_iss_obj[arr[0]] = arr[1];
    }
    if (imesh.glid !== undefined && v4iilex.id !== undefined && (v4iilex.id == imesh.glid)) {
        var options = {
            method: 'POST',
            url: require("./ajaxRequests/ServiceUrls").USER_REAUTH_URL,
            form: JSON.stringify({
                username: (imesh.mb1 !== undefined && imesh.mb1 !== '' && imesh.iso == "IN") ? imesh.mb1 : imesh.em,
                modid: "IMOB",
                country_iso: imesh.iso,
                format: "JSON",
                IP: req.body.ip,
                glusr_usr_ip: (iploc.gip) ? iploc.gip : '',
                reauth: 1,
                iso: imesh.iso,
                "cookie": {
                    'DataCookie': imesh,
                    'LoginCookie': v4iilex,
                    'im_iss': im_iss_obj
                }
            })
        };
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) { return reject(error); }
                else {
                    body = JSON.parse(body);
                    var response_reauth = '';
                    if ((body.access) && (body.access == 1 || body.access == 2)) {
                        if ((body.LoginCookie.au == v4iilex.au) && (body.DataCookie.glid == imesh.glid)) {
                            response_reauth = true;
                            var updated_imesh = setImCookie(body.DataCookie);
                            var updated_v4iilex = setImCookie(body.LoginCookie);
                            var updated_im_iss = setImCookie(body.im_iss);
                            req.cookies.ImeshVisitor = updated_imesh;
                            req.cookies.v4iilex = updated_v4iilex;
                            req.cookies.im_iss = updated_im_iss;
                            res.cookie("ImeshVisitor", updated_imesh, { maxAge: 15552000000, domain: '.indiamart.com', sameSite: 'Lax' });
                            res.cookie("v4iilex", updated_v4iilex, { maxAge: 2592000000, domain: '.indiamart.com', sameSite: 'Lax' });
                            res.cookie("im_iss", updated_im_iss, { maxAge: 2592000000, domain: '.indiamart.com', sameSite: 'Lax' });
                            resolve(response_reauth);
                        }
                        else {
                            response_reauth = false;
                            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            res.header('Expires', '-1');
                            res.header('Pragma', 'no-cache');
                            res.send({ response_reauth: false });
                            resolve(response_reauth);
                        }
                    }

                    else if ((body.access) && (body.access == 4)) {
                        if ((body.DataCookie.glid == imesh.glid)) {
                            response_reauth = 4;
                            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            res.header('Expires', '-1');
                            res.header('Pragma', 'no-cache');
                            res.send({ response_reauth: 4 });
                            resolve(response_reauth);
                        }
                        else {
                            response_reauth = false;
                            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                            res.header('Expires', '-1');
                            res.header('Pragma', 'no-cache');
                            res.send({ response_reauth: false });
                            resolve(response_reauth);
                        }
                    }
                    else {
                        response_reauth = false;
                        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                        res.header('Expires', '-1');
                        res.header('Pragma', 'no-cache');
                        res.send({ response_reauth: false });
                        resolve(response_reauth);
                    }
                }
            })
        });
    }
    else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.send({ response_reauth: false });
        return new Promise(function (resolve, reject) { resolve(false) });
    }
}
function getServiceName(url) {
    if ((url.indexOf('enq2.intermesh.net') > -1) || (url.indexOf('enqphp.intermesh.net') > -1)) {
        return 'enq2';
    }
    else if (url.indexOf('seller.imutils.com') > -1) {
        return 'seller';
    }
    else if (url.indexOf('service.intermesh.net') > -1) {
        return 'service';
    }
    else if (url.indexOf('mapi.indiamart.com') > -1) {
        return 'mapi';
    }
    else if (url.indexOf('leads.imutils.com') > -1) {
        return 'leads';
    }
    else if (url.indexOf('pay.indiamart.com') > -1) {
        return 'pay';
    } else if (url.indexOf('recommend.imutils.com') > -1) {
        return 'recomm';
    }

}
function fetchData(options) {
    var d_fetcher = new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                // reject(new Error('SERVICE CONNECT FAILED'));
                //res.status(503).send();
            }
            else if (response.statusCode == 200) {
                resolve(body);
            }
            else {
                resolve(response.statusCode);
            }
        })
    })
    // .catch(error => {
    //     return error;
    // });
    return d_fetcher;
}
function setImCookie(e) {
    var i = e;
    i = separateInPipeFormat(e);
    return i;
}
function separateInPipeFormat(e) {
    var i = new Array;
    for (var a in e)
        i.push(a + "=" + e[a]);
    return i.join("|")
}
function handleResponse(req, res, service_options, error, response, body, isString, cbService, hit) {
    var fs = require("fs");
    let date = new Date().toJSON().slice(0, 19).split("T")[0];
    let time = new Date().toLocaleTimeString().slice(0, 8);
    let glid = '';
    date = date + " " + time;
    if (checkUserStatus(req) != 0) {
        if (req.cookies && req.cookies.ImeshVisitor) {
            // glid = req.cookies.ImeshVisitor.split('glid=')[1].split('|')[0];
            glid = cookieValExtracter(req.cookies.ImeshVisitor, "glid");
        }
    }
    else glid = ' ';
    let scriptUri = req.url;
    if (!service_options.timeout) {
        service_options.timeout = 3000
    }
    var code = getResponseCode(service_options.url, body);
    if (hit != 2) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    if (error) {
        if (((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") || (response && response.statusCode >= 500))) {
            circuitBreaker.update5XXCount(cbService);
            if ((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT")) {
                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + service_options.url + '\t' + service_options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                logger.info(log);
            }
        }
        res.status(503).send();
    }
    else if (code == 402 || code == 400 || code == 412) {
        var reauthObj = require('./reauthHandler')(req, res, service_options, isString);
    }
    else if (code == 403 || code == 401) {
        var date_string = new Date().toISOString().slice(0, 10);
        var reauthserviceLog = fs.createWriteStream('/tmp/reAuthPwaLog-' + date_string + '.log', { flags: 'a' });
        reauthserviceLog.write(new Date().toJSON().slice(0, 19).split("T")[0] + "\t" + req.cookies.ImeshVisitor + "\t" + service_options.url + "\t" + code + "\t" + body + "\t" + "is_pwa");
        res.send({ response_reauth: false });
    }
    else {

        if (hit && (hit == 1)) {
            let attributes = [];
            let parseRes = JSON.parse(body);
            let fraudUser = ['Conflict temporary disable', 'Multiple bs conflicts', 'Payment protection Non-compliance', 'Fraud Suspect Disabled', 'Suspicious Activity', 'Fraud complaint', 'Blacklisted User'];
            let user_country = req.cookies && req.cookies.iploc ? cookieValExtracter(req.cookies.iploc, 'gcnnm') : '';
            user_country = user_country ? user_country : 'India';
            if (fraudUser.indexOf(parseRes.glusr_disabled_reason) > -1) {
                res.send(body);
            }
            else {
                if (parseRes.glusr_usr_ph_mobile != "" && parseRes.glusr_usr_ph_mobile != null && user_country == 'India') {
                    attributes[0] = '121'
                }
                if (parseRes.glusr_usr_ph_mobile_alt != "" && parseRes.glusr_usr_ph_mobile_alt != null && user_country == 'India') {
                    attributes[0] ? attributes[1] = ',48' : attributes[0] = '48';
                }
                if (parseRes.email2 != "" && parseRes.email2 != null) {
                    attributes[1] ? (attributes[2] = ',157') : attributes[0] ? attributes[1] = ',157' : attributes[0] = '157';
                }
                if (parseRes.email1 != "" && parseRes.email1 != null) {
                    attributes[2] ? (attributes[3] = ',109') : attributes[1] ? attributes[2] = ',109' : attributes[0] ? attributes[1] = ',109' : attributes[0] = '109';
                }
                let stringAtt = attributes[0] ? attributes[0] : ''
                stringAtt += attributes[1] ? attributes[1] : ''
                stringAtt += attributes[2] ? attributes[2] : ''
                stringAtt += attributes[3] ? attributes[3] : ''
                var options = {
                    method: 'POST',
                    url: require("./ajaxRequests/ServiceUrls").SLR_VRFY_DTL_URL,
                    form: {
                        'glusrid': parseRes.glid,
                        'token': 'imobile@15061981',
                        'attribute_id': stringAtt,
                        'modid': 'IMOB',
                        'userverified': 1
                    }
                };
                let cbService = require("./ajaxRequests/ServiceUrls").SLR_VRFY_DTL_URL;
                makeRequest(req, res, options, false, false, cbService, 2);
            }
        }
        else {

            if (service_options && service_options.page && service_options.page == 'MCAT') {
                require('./SSRSections/Mcat/parser').authAutofetchData(res, req, body, error, service_options);
            }
            else if (url.parse(service_options.url).pathname.indexOf("/wservce/buyleads/shortlisted/") > -1) {
                require('./ServiceParser').forBuyleadList(req, res, body, error)
            }
            else {
                res.send(body);
            }
        }

    }
}
function getResponseCode(url, body) {
    var service_name = getServiceName(url);
    var service_response_code;
    switch (service_name) {
        case 'enq2':
            if (body && body !== undefined) {
                service_response_code = JSON.parse(body).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'seller':
        case 'mapi':
            if (body && body !== undefined) {
                service_response_code = JSON.parse(body).CODE;
            } service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'service':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'leads':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'pay':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;
        case 'recomm':
            if (body && body !== undefined) {
                service_response_code = (JSON.parse(body)).CODE;
            }
            service_response_code == undefined ? service_response_code = 200 : '';
            return service_response_code;
            break;


    }

}
var makeRequest = (req, res, options, isString, sendResponseBack, cbService = "", hit = 0, checkcompany = false) => {
    let date = new Date().toJSON().slice(0, 19).split("T")[0];
    let time = new Date().toLocaleTimeString().slice(0, 8);
    let glid = '';
    date = date + " " + time;
    // let year = date.slice(0, 4);
    // let month = date.slice(5, 7);
    // let day = date.slice(8, 10);
    // let fullDate = year + '-' + month + '-' + day, glid;
    if (checkUserStatus(req) != 0) {
        if (req.cookies && req.cookies.ImeshVisitor) {
            // glid = req.cookies.ImeshVisitor.split('glid=')[1].split('|')[0];
            glid = cookieValExtracter(req.cookies.ImeshVisitor, "glid");
        }
    }
    else glid = ' ';
    let scriptUri = req.url;
    options.timeout = 8000;

    if (!options.timeout) {
        options.timeout = 3000
    }
    let mode = -1;
    appendUniqueId(options, req);
    //sendResponseBack set to false
    if (!sendResponseBack) {
        if (options.form && options.form.mode) mode = options.form.mode;
        if (isSecureUrl(options.url, mode) && !checkcompany) {

            var cookie_secure = securecookie(req, res);
            cookie_secure.then((response) => {
                if (response == true) {
                    var service_options = null
                    if (options.form) {
                        service_options = isString ? JSON.parse(options.form) : options.form;
                    }
                    else if (options.body) {
                        service_options = isString ? JSON.parse(options.body) : options.body;
                    }

                    req.cookies.im_iss !== undefined ? service_options.AK = (req.cookies.im_iss.split("t=")[1] == undefined ? (req.cookies.im_iss == '' ? ' ' : req.cookies.im_iss) : req.cookies.im_iss.split("t=")[1]) : '';
                    if (options.form) {
                        options.form = isString ? JSON.stringify(service_options) : service_options;
                    }
                    else if (options.body) {
                        options.body = isString ? JSON.stringify(service_options) : service_options;
                    }

                    if (circuitBreaker.isCircuitBroken(cbService)) {
                        let error_code = "Circuit Breaker triggered - Service : " + cbService;
                        let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                        logger.info(log);
                        res.status(503).send();
                    }
                    else {
                        request(options, function (error, response, body) {
                            //test
                            handleResponse(req, res, options, error, response, body, isString, cbService, hit);
                        });
                    }
                }
            }, (error) => {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');
                res.send({ response_reauth: false });
            });
        }
        else {
            if (circuitBreaker.isCircuitBroken(cbService) && process.env.NODE_ENV_M) {
                let error_code = "Circuit Breaker triggered - Service : " + cbService;
                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                logger.info(log);
                res.status(503).send();
            }
            else {
                request(options, function (error, response, body) {
                    if (error) {
                        if (((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") || (response && response.statusCode >= 500)) && process.env.NODE_ENV_M) {
                            circuitBreaker.update5XXCount(cbService);
                            if ((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") && process.env.NODE_ENV_M) {
                                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                                logger.info(log);
                            }
                        }
                        res.status(503).send();
                    }
                    else {
                        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                        res.header('Expires', '-1');
                        res.header('Pragma', 'no-cache');
                        res.send(body);
                    }
                });
            }
        }
    }
    //Send Response back
    else {
        var dFetcher = new Promise(function (resolve, reject) {
            if (circuitBreaker.isCircuitBroken(cbService) && process.env.NODE_ENV_M) {
                let error_code = "Circuit Breaker triggered - Service : " + cbService;
                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                logger.info(log);
                reject(ERROR);
            }
            else {
                /////////3000milliseconds
                request(options, function (error, response, body) {
                    //Either Timeout or response is 5xx
                    if ((response && response.statusCode >= 500) || (error && (error['code'] == "ESOCKETTIMEDOUT" || error['code'] == "ETIMEDOUT")) && process.env.NODE_ENV_M) {
                        circuitBreaker.update5XXCount(cbService);
                        if (error) {
                            if (error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") {
                                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                                // fs.appendFile('/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log', log, function (err) {
                                //     if (err) throw err;
                                // });
                                logger.info(log);
                            }
                        }
                        reject(ERROR);
                    }
                    else if (error) {
                        reject(ERROR);
                    }
                    else if (response.statusCode == 200) {
                        resolve(body);
                    }
                    else {
                        reject(response.statusCode);
                    }
                })
            }
        })

        return dFetcher;
    }
}

// function makegRPCRequest() {
//     const insecureCredentials = grpc.credentials.createInsecure();
//     const client = new PDPClient('34.93.213.35:3000', insecureCredentials);
//     const request = new PDPRequest();
//     request.setDisplayid(12345678);
//     let PDPStore = {}; // Define PDPStore outside
//     client.getProductDetails(request, (error, response) => {
//         if (error) {
//             console.error(error);
//         } else {
//             // console.log(response);
//             // Update pdpData with response here
//         }
//     });
// }

var makegRPCRequest = (req, res, options, isString, sendResponseBack, cbService = "",displayID, hit = 0, checkcompany = false) => {
    // let date = new Date().toJSON().slice(0, 19).split("T")[0];
    // let time = new Date().toLocaleTimeString().slice(0,8);
    // let glid='';
    // date = date +" "+ time;
    // let year = date.slice(0, 4);
    // let month = date.slice(5, 7);
    // let day = date.slice(8, 10);
    // let fullDate = year + '-' + month + '-' + day, glid;
    // if(checkUserStatus(req)!=0){
    //     if(req.cookies && req.cookies.ImeshVisitor)
    //     {
    //         // glid = req.cookies.ImeshVisitor.split('glid=')[1].split('|')[0];
    //         glid = cookieValExtracter(req.cookies.ImeshVisitor,"glid");
    //     }
    // }
    // else glid=' ';
    // let scriptUri = req.url;
    // options.timeout = 8000;

    // if (!options.timeout) {
    //     options.timeout = 3000
    // }
    // let mode = -1;
    // appendUniqueId(options, req);
    //sendResponseBack set to false
    /*
    if (!sendResponseBack) {
        if (options.form && options.form.mode) mode = options.form.mode;
        if (isSecureUrl(options.url, mode) && !checkcompany) {

            var cookie_secure = securecookie(req, res);
            cookie_secure.then((response) => {
                if (response == true) {
                    var service_options = null
                    if (options.form) {
                        service_options = isString ? JSON.parse(options.form) : options.form;
                    }
                    else if (options.body) {
                        service_options = isString ? JSON.parse(options.body) : options.body;
                    }

                    req.cookies.im_iss !== undefined ? service_options.AK = (req.cookies.im_iss.split("t=")[1] == undefined ? (req.cookies.im_iss == '' ? ' ' : req.cookies.im_iss) : req.cookies.im_iss.split("t=")[1]) : '';
                    if (options.form) {
                        options.form = isString ? JSON.stringify(service_options) : service_options;
                    }
                    else if (options.body) {
                        options.body = isString ? JSON.stringify(service_options) : service_options;
                    }

                    if (circuitBreaker.isCircuitBroken(cbService)) {
                        let error_code = "Circuit Breaker triggered - Service : " + cbService;
                        let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                        logger.info(log);
                        res.status(503).send();
                    }
                    else {
                        request(options, function (error, response, body) {
                            //test
                            handleResponse(req, res, options, error, response, body, isString, cbService, hit);
                        });
                    }
                }
            }, (error) => {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');
                res.send({ response_reauth: false });
            });
        }
        else {
            if (circuitBreaker.isCircuitBroken(cbService) && process.env.NODE_ENV_M) {
                let error_code = "Circuit Breaker triggered - Service : " + cbService;
                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                logger.info(log);
                res.status(503).send();
            }
            else {
                request(options, function (error, response, body) {
                    if (error) {
                        if (((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") || (response && response.statusCode >= 500)) && process.env.NODE_ENV_M) {
                            circuitBreaker.update5XXCount(cbService);
                            if ((error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") && process.env.NODE_ENV_M) {
                                let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
                                logger.info(log);
                            }
                        }
                        res.status(503).send();
                    }
                    else {
                        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                        res.header('Expires', '-1');
                        res.header('Pragma', 'no-cache');
                        res.send(body);
                    }
                });
            }
        }
    } */
    //Send Response back
    // else {
    var dFetcher = new Promise(function (resolve, reject) {
        // if (circuitBreaker.isCircuitBroken(cbService) && process.env.NODE_ENV_M) {
        //     let error_code = "Circuit Breaker triggered - Service : " + cbService;
        //     let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error_code + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
        //     logger.info(log);
        //     reject(ERROR);
        // }
        // else {/
        /////////3000milliseconds
        // request(options, function (error, response, body) {
        //     //Either Timeout or response is 5xx
        //     if ((response && response.statusCode >= 500) || (error && (error['code'] == "ESOCKETTIMEDOUT" || error['code'] == "ETIMEDOUT")) && process.env.NODE_ENV_M) {
        //         circuitBreaker.update5XXCount(cbService);
        //         if (error) {
        //             if (error['code'] == "ETIMEDOUT" || error['code'] == "ESOCKETTIMEDOUT") {
        //                 let log = date + '\t' + scriptUri + '\t' + "999" + '\t' + error['code'] + '\t' + glid + '\t' + options.url + '\t' + options.timeout + '\t' + "0" + '\t' + "0" + '\t' + req.headers.referer + '\t' + "0" + "\n";
        //                 // fs.appendFile('/home3/indiamart/statlogs/nodelogs/curlTimeOut-' + fullDate + '.log', log, function (err) {
        //                 //     if (err) throw err;
        //                 // });
        //                 logger.info(log);
        //             }
        //         }
        //         reject(ERROR);
        //     }
        //     else if (error) {
        //         reject(ERROR);
        //     }
        //     else if (response) {
        //         resolve(body);
        //     }
        //     else {
        //         reject(response.statusCode);
        //     }
        // })

        // }
        const insecureCredentials = grpc.credentials.createInsecure();
        const client = new PDPClient('pdpindic.imutils.com:80', insecureCredentials);
        const request = new PDPRequest();
        request.setDisplayid(displayID);
        request.setLanguageId(2);
        // Call the GetProductDetails method on the client, not PDPResponse
        client.getProductDetails(request, (error, response, body) => {
            if (error) {
                reject(ERROR);
                // return error;
            } else if (response) {
                // console.log(response);
                resolve(response);
                // return response;
            }
        });
    })

    return dFetcher;
    // }
}
var makegRPCImpcatRequest = (req, res, options, isString, sendResponseBack, cbService = "", hit = 0, checkcompany = false) => {
    let url_slug = req.originalUrl;
    if(url_slug.match('/city/')) {
        let cityFlname = decodeURIComponent(url_slug.split("/")[2]);
        let citiesJSON = require("./citiesJSON/hindiCityFlname.json");
        if (citiesJSON.hasOwnProperty(cityFlname)) {
            var cityId = citiesJSON[cityFlname].gl_city_id;
            // console.log("Flname: ", cityFlname, " CityID: ", cityId)
        }
    }
    let flname = '';
    const match = url_slug.match(/([^\/]+)\.html/);
    if (match && match[1]) {
        flname = match[1];
        flname = decodeURIComponent(flname);
    }
    var dFetcher = new Promise(function (resolve, reject) {
        const insecureCredentials = grpc.credentials.createInsecure();
        const client = new ImpcatClient('impcatindic.imutils.com:80', insecureCredentials);
        const request = new ImpcatRequest();
        if(typeof cityId !== 'undefined') {
            request.setCityid(cityId);
        } else {
            request.setCityid(0);
        }
        request.setLanguageId(2);
        // request.setMcatid(105933);
        request.setFlname(flname);
        request.setModid("imob_h");
        // Call the impcatService method on the client
        client.impcatService(request, (error, response, body) => {
            if (error) {
                reject(ERROR);
                // return error;
            } else if (response) {
                // console.log(response);
                resolve(response);
                // return response;
            }
        });
    })

    return dFetcher;
    // }
}

function appendUniqueId(options, req) {
    if (options.url && options.url.indexOf('leads.imutils.com') > -1 && req && req.headers && req.headers.hasOwnProperty('uniqueid')) {
        var uniqueid = req.headers.uniqueid;
        if (options.hasOwnProperty('headers')) {
            options.headers['Http-uniqueid'] = uniqueid
        }
        else {
            options['headers'] = {},
                options.headers['Http-uniqueid'] = uniqueid
        }
        if (options.method == 'GET') {
            if (options.url.indexOf('?') > -1) options.url = options.url + '&unique_id=' + uniqueid;
            else options.url = options.url + 'unique_id/' + uniqueid + '/';
        }
        else {
            if (options.hasOwnProperty('form')) {
                options.form.unique_id = uniqueid
            }
            else {
                options['form'] = {},
                    options.form['Http-uniqueid'] = uniqueid
            }
        }
    }
    else if (options.url && options.url.indexOf('lms.imutils.com') > -1 && req && req.headers && req.headers.hasOwnProperty('uniqueid')) {
        var uniqueid = req.headers.uniqueid;
        if (options.hasOwnProperty('headers')) {
            options.headers['Http-uniqueid'] = uniqueid
        }
        else {
            options['headers'] = {},
                options.headers['Http-uniqueid'] = uniqueid
        }
        if (options.method == 'GET') {
            if (options.url.indexOf('?') > -1) options.url = options.url + '&unique_id=' + uniqueid;
            else options.url = options.url + 'unique_id/' + uniqueid + '/';
        }
        else {
            if (options.hasOwnProperty('form')) {
                options.form = JSON.parse(options.form);
                options.form.unique_id = uniqueid
                options.form = JSON.stringify(options.form);
            }
            else {
                options['form'] = {},
                    options.form['Http-uniqueid'] = uniqueid
            }
        }
    }
}

function getEnvType() {
    let eType = '';
    if (process.env.NODE_ENV_M == 'prod') {
        eType = 'prod';
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        eType = 'stg';
    }
    else if (process.env.NODE_ENV_M == 'dev') {
        eType = 'dev';
    }
    else {
        eType = 'local';
    }
    return eType;
}
let getSrvcUrl = (servcType, srvcUrl, forLocal = '') => {
    let compUrl = '';
    let envType = getEnvType();
    if (envType == 'prod' || (envType == 'local' && forLocal == '')) {
        compUrl = servcType.DOMAIN + srvcUrl;
    }
    else {
        if (envType == 'local' && forLocal != '') {
            if (forLocal == 'dev') {
                compUrl = servcType.DEV_DOMAIN + srvcUrl;
            }
            else if (forLocal == 'stg') {
                compUrl = servcType.STG_DOMAIN + srvcUrl;
            }
            else {
                compUrl = servcType.DOMAIN + srvcUrl;
            }
        }
        else if (envType == 'dev') {
            compUrl = servcType.DEV_DOMAIN + srvcUrl;
        }
        else {
            compUrl = servcType.STG_DOMAIN + srvcUrl;
        }
    }
    return compUrl;
}
var cookieValExtracter = (cookieData, val) => {
    let reqVal = '';
    try {
        if (cookieData) {
            let cData = cookieData.split('|')
            for (let i = 0; i < cData.length; i++) {
                let splits = cData[i].split('=');
                if (splits[0] == val) {
                    reqVal = splits[1];
                    break;
                }
            }
            return reqVal;
        }
    }
    catch (e) {
        return '';
    }
}
function numTostring(data) {
    var new_data = [];
    data.map((val, key) => {
        const Entities = require('he');
        var decode = Entities.decode(val.toString());
        new_data.push(decode);
    });
    return new_data;
}

function getXSSList() {
    var list = /(javascript:|&lt;script|<script|&lt;\/script|<\/script|script&gt;|script>|&lt;\/xml|<\/xml|xml&gt;|xml>|&lt;object|<object|&lt;\/object|<\/object|object&gt;|object>|vbscript:|livescript:|&lt;javascript|javascript:|alert\(|&lt;iframe|<iframe|@import|&lt;META|<META|FSCommand|onAbort|onActivate|onAfterPrint|onAfterUpdate|onBeforeActivate|onBeforeCopy|onBeforeCut|onBeforeDeactivate|onBeforeEditFocus|onBeforePaste|onBeforePrint|onBeforeUnload|onBeforeUpdate|onBegin|onBlur|onBounce|onCellChange|onChange|onClick|onContextMenu|onControlSelect|onCopy|onCut|onDataAvailable|onDataSetChanged|onDataSetComplete|onDblClick|onDeactivate|onDrag|onDragEnd|onDragLeave|onDragEnter|onDragOver|onDragDrop|onDragStart|onDrop|onEnd|onError|onErrorUpdate|onFilterChange|onFinish|onFocus|onFocusIn|onFocusOut|onHashChange|onHelp|onInput|onKeyDown|onKeyPress|onKeyUp|onLayoutComplete|onLoad|onLoseCapture|onMediaComplete|onMediaError|onMessage|onMouseDown|onMouseEnter|onMouseLeave|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onMouseWheel|onMove|onMoveEnd|onMoveStart|onOffline|onOnline|onOutOfSync|onPaste|onPause|onPopState|onProgress|onPropertyChange|onReadyStateChange|onRedo|onRepeat|onReset|onResize|onResizeEnd|onResizeStart|onResume|onReverse|onRowsEnter|onRowExit|onRowDelete|onRowInserted|onScroll|onSeek|onSelect|onSelectionChange|onSelectStart|onStart|onStop|onStorage|onSyncRestored|onSubmit|onTimeError|onTrackChange|onUndo|onUnload|onURLFlip|seekSegmentTime)/i;
    return list;
}
function getCDNHost() {
    let cdnUrl = '';
    cdnUrl = '/pwagifs/';
    return cdnUrl;
}
var doxssHandling = (post_data) => {
    var post_data = numTostring(post_data);
    var xsslist = getXSSList();
    var datauriregex = /(data:)([a-z]+\/[a-z0-9\-\+\.]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%]*\s*/i;
    for (var i = 0; i < post_data.length; i++) {
        post_data[i] = post_data[i].replace(/\s/gi, "");
        if (xsslist.test(post_data[i]) || datauriregex.test(post_data[i])) {
            var data = { 'code': '206', 'message': 'Invalid Input!' };
            return data;
        }
    }
    var data = { 'code': '200', 'message': 'Success' };
    return data;
}

const constructPDPUrl = (productName, id, type = "pdp") => {
    let name = productName;
    if (name && name != null) {
        name = name.replace(/^\s+/, "");
        name = name.replace(/\s+$/, "");
        name = name.replace(/\s+/g, "-");
        name = name.toLowerCase();
        name = name.replace(/\&amp;/g, "&");
        name = name.replace(/\&lt;/g, "<");
        name = name.replace(/\&gt;/g, ">");
        name = name.replace(/\&nbsp;/g, " ");
        name = name.replace(
            /[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g,
            "-"
        );
        name = name.replace(/^(-)+/, "");
        name = name.replace(/-+$/, "");
    }
    else {
        name = '';
    }
    if (type == "pdp") {
        return "/proddetail/" + name + "-" + id + ".html";
    } else {
        return "/proddetail/" + name + "-s" + id + ".html";
    }
};
module.exports = {
    makeRequest: makeRequest,
    makegRPCRequest: makegRPCRequest,
    makegRPCImpcatRequest: makegRPCImpcatRequest,
    checkUserStatus: checkUserStatus,
    getSrvcUrl: getSrvcUrl,
    cookieValExtracter: cookieValExtracter,
    objIsEmpty: objIsEmpty,
    APP_SHELL_STRUCTURE: APP_SHELL_STRUCTURE,
    ON_PAGE: ON_PAGE,
    fetchData: fetchData,
    doxssHandling: doxssHandling,
    getXSSList: getXSSList,
    getCDNHost: getCDNHost,
    ERROR: ERROR,
    shellToken: shellToken,
    appendUniqueId: appendUniqueId,
    constructPDPUrl: constructPDPUrl,
    securecookie: securecookie,
};