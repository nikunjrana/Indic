import match from 'react-router/lib/match';
import routes from '../src/router/routes';
import { imStore } from '../src/store/imStore';
import Helmet from 'react-helmet';
const fs = require('fs');
var request = require('request');
var request = require('request');
var version = require('./version.json');

var url = require('url');
var queryString = require('query-string');
var path = '';
var query = '';
//var path = '/enq';
var cdnEnv = 'm.imimg.com/pwagifs';
var fetchVerUrl = '';
var mnMinbase = 'https://m.imimg.com';

var forceUp = '';
typeof (process.env.NODE_ENV_M) == 'undefined' ? mnMinbase = 'local' : process.env.NODE_ENV_M == 'dev' ? mnMinbase = 'https://dev-m.imimg.com' : process.env.NODE_ENV_M == 'stg' ? mnMinbase = 'https://stg-m.imimg.com' : mnMinbase = 'https://m.imimg.com';

typeof (process.env.NODE_ENV_M) == 'undefined' ? fetchVerUrl = 'local' : process.env.NODE_ENV_M == 'dev' ? fetchVerUrl = 'https://dev-m.indiamart.com/phpajax/version/' : process.env.NODE_ENV_M == 'stg' ? fetchVerUrl = 'https://stg-m.indiamart.com/phpajax/version/' : fetchVerUrl = 'https://m.indiamart.com/phpajax/version/';
typeof (process.env.NODE_ENV_M) == 'undefined' || process.env.NODE_ENV_M == 'dev' ? path = '/pwagifs' : (process.env.NODE_ENV_M == 'prod' ? path = 'https://' + cdnEnv : (process.env.NODE_ENV_M == 'stg' ? path = 'https://stg-' + cdnEnv : ''))
var service = 'leads.imutils.com';
typeof (process.env.NODE_ENV_M) == 'undefined' || process.env.NODE_ENV_M == 'dev' || process.env.NODE_ENV_M == 'stg' ? service = 'mapi.indiamart.com' : service = 'leads.imutils.com';
var enq_service = 'enq2.intermesh.net';
let signup_url = '';
if (typeof (process.env.NODE_ENV_M) == 'undefined')
    signup_url = '';
else if (process.env.NODE_ENV_M == 'dev') {
    signup_url = 'dev-';
}
else if (process.env.NODE_ENV_M == 'stg') {
    signup_url = 'stg-';
}
typeof (process.env.NODE_ENV_M) == 'undefined' || process.env.NODE_ENV_M == 'dev' || process.env.NODE_ENV_M == 'stg' ? enq_service = 'enqphp.intermesh.net' : enq_service = 'enq2.intermesh.net';
function hasHindiCharacters(str) {
    if (str.split("%").length > 8) { str = decodeURI(str); }
    return str.split("").filter(function (char) {
        var charCode = char.charCodeAt(); return charCode >= 2309 && charCode <= 2361;
    }).length > 0;
}
function static_blkeywords() {
    return ' Buyers, Sell online, Buying Requirements, Buying Leads, Business Offers, Purchase Requirements, Purchase Inquiries';
}
function blOfferExpiredNotFound(expBlDate, initialState, res, html, headInfo, head, pageTitle, metatags, link) {
    let expParts, expDay, expMonth, expYear, now, expDate;
    expParts = expBlDate.split('-');
    expDay = expParts[0];
    expMonth = getMonthIndex(expParts[1]);
    expYear = '20' + expParts[2];
    now = new Date();
    expDate = new Date(parseInt(expYear), parseInt(expMonth), parseInt(expDay));
    expDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    expDate.setDate(expDate.getDate() + 90);
    //check for 90 days exceeded after expiry
    if ((parseInt(expDate.getTime()) - parseInt(now.getTime())) < 0) {
        initialState.buyleads = [];
        initialState.hasMoreBuyleads = true;
        initialState.isFetchingBuyleads = false;
        initialState.listing_val = {};
        initialState.errorBL = false;
        initialState.blCatError = false;
        initialState.expired = false;
        pageTitle = '<title>Page Not Found</title>';
        metatags = '';
        headInfo.link = "";
        initialState.blOfferError = true;
        res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
    }
    else {
        return;
    }
}
function validBlGroup(grpname) {
    let cat_array = ['plant-machinery', 'electronic-goods', 'industrial-supplies', 'builders-hardware', 'apparel-garments', 'agro-farm', 'medical-pharma', 'packaging-material', 'chemicals-fertilizers', 'mechanical-components', 'scientific-instruments', 'furniture', 'agro-poultry-dairy', 'automobiles-spares', 'home-supplies', 'ores-metals', 'hand-tools', 'handicrafts-gifts', 'kitchen-utensils-cookware', 'textiles-yarn', 'printing-publishing', 'cosmetics-toiletries', 'home-furnishings', 'fabrication', 'gems-jewellery', 'computer-hardware', 'fashion-accessories', 'ayurvedic-herbal', 'security-device', 'sports-goods', 'telecom-products', 'paper', 'bags-belts-wallets', 'media-advertising', 'stones-marble', 'trade-promotion', 'it-services', 'rental-services', 'packers-movers', 'business-facilitation', 'finance-law', 'education-training', 'travel-tourism', 'callcenter-bpo', 'bicycles-rickshaws', 'research-development', 'architectural-designing', 'human-resource', 'transportation', 'facility-management', 'leather', 'small-businesses'];
    if (cat_array.includes(grpname)) {
        return true;
    }
    return false;
}
function validStateName(stateName) {
    let state_array = ["jharkhand", "maharashtra", "mizoram", "tamil-nadu", "tripura", "uttarakhand", "arunachal-pradesh", "bihar", "chhattisgarh", "dadra-and-nagar-haveli", "gujarat", "karnataka", "kerala", "lakshadweep", "manipur", "nagaland", "pondicherry", "sikkim", "madhya-pradesh", "himachal-pradesh", "meghalaya", "jammu-kashmir", "delhi", "chandigarh", "andaman-and-nicobar", "daman-and-diu", "orissa", "punjab", "rajasthan", "uttar-pradesh", "west-bengal", "andhra-pradesh", "assam", "goa", "haryana", "telangana"];
    if (state_array.includes(stateName)) {
        return true;
    }
    return false;
}
function validAuthorityName(authorityName) {
    let authority_array = ["bsnl", "bhel", "central-railway", "aai", "cpwd", "south-eastern-railway", "aiims", "bccl", "clw", "bescl", "chfcau", "bro", "ner", "crpf", "bcd", "bsf", "secr", "chandigarh-administration", "chennai-port-trust", "cgwd", "balangir-municipality", "west-central-railway", "andhra-pradesh-foods", "avvnl", "bhakra", "air-force-station", "bwssb", "southern-railway", "central-agricultural-university", "bank-of-india", "south-western-railway", "central-coalfields-limited", "andaman-pwd", "achalpur-nagar-parishad", "bvfcl", "ankita-enterprises", "cotton-corporation", "assam-rifles", "cwc", "aruppukottai-municipality", "bhubaneswar-development-authority", "belgaumcity-corporation", "nf-railway", "container-corporation-limited", "central-ordnance-depot", "alan-power-systems", "bmtc", "bie", "arcil", "bank-of-baroda", "bharat-aluminium", "bsedcl", "apswc", "bsecl", "brahm-prakash-ayurved", "cada", "chennai-petroleum-corporation", "allahabad-bank", "ahmedabad-municipal-corporation", "north-central-railway", "east-coast-railway", "eastern-railway", "north-western-railway", "water-resources-department", "mplaghu-udyognigam", "east-central-railway", "northern-railway", "south-central-railway", "western-railway", "municipal-corporation", "military-engineer-services", "public-works-department", "ntpc", "ongcindia", "secl", "phed", "nrccitrus", "posts-department", "northern-coalfields-limited", "ordnance-factory-board", "western-coalfields-limited", "government-of-india", "powergridindia", "hindustan-copper-limited", "defence-ministry", "mahawssd", "municipal-council", "maharashtra-governement", "rail-coach-factory", "himachal-pradesh-government", "hindustan-insecticides", "diesellocoworks", "nlcindia", "khsrdp", "rural-development-board", "irrigation-department", "sail", "integral-coach-factory", "atomic-energy-department", "hpseb", "wbagrimarketingboard", "mcl", "oil-india", "nac", "ruralengineering", "civilaviation", "tniel", "rvunl", "gujarat-government", "pspcl", "rural-development", "karnatakapower", "scclmines", "navodaya-vidyalaya", "rdpr", "nitnagpur", "jharkhand-government", "bseb", "hal-india", "gsecl", "noida-authority", "jseb", "food-corporation", "mandiboard-punjab", "dieselloco-modernisation", "msrtc", "iit", "mprdc", "getcogujarat", "cescoorissa", "municipaladmn", "knnlindia", "haryana-irrigation-department", "pcmcindia", "madrasfert", "iiim", "rogi-kalyan-samiti", "goashipyard", "upcl", "mgvcl", "easterncoal", "sbhyd", "hppwd", "vmmc-sjh", "hpiph", "punjab-health", "rural-works-department", "nagpur-municipal-corporation", "nccindia", "karnataka-pwd", "iist", "municipal-corporation-jalandhar", "west-bengal-government", "dda", "tamilnadu-housing-board", "mprrda"];
    if (authority_array.includes(authorityName)) {
        return true;
    }
    return false;
}

function rc4(str) //used in BLmailer response decryption
{
    var key = '1996c39iil';
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
function get_month_name(i) {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[i]
}
function getMonthIndex(str) {

    let monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    for (let m = 0; m < monthNames.length; m++) {
        if (monthNames[m].indexOf(str) > -1) {
            return m;
        }
    }
}
function handleRender(req, res) {
    res.header('Cache-Control', 'no-cache, no-store');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    var parsedUrl = url.parse(req.url);
    var parsed = queryString.parse(req.url);
    if (parsedUrl.pathname.indexOf('enq/messages/') > -1) {
        var url_parts = url.parse(req.url, true);
        var suplier_id = url_parts.query.sup_glid;
        res.redirect(301, "https://m.indiamart.com/messages/conversation/?sup_glid=" + suplier_id);
    }
    else if (parsedUrl.pathname.indexOf('enq') > -1) {
        let query_Id = '';
        let query_Type = '';
        let mail_qtype = '';
        let mail_queryid = '';
        if (parsed.qtype && parsed.queryid) {
            mail_qtype = parsed.qtype;
            mail_queryid = parsed.queryid;
        }
        else {
            if (req.url) {
                if (req.url.split("/").length > 1) {
                    query_Id = req.url.split("/")[2] ? req.url.split("/")[2].substr(2) : '';
                    query_Type = req.url.split("/")[2] ? req.url.split("/")[2].substr(0, 2) : '';
                }
            }
        }
        if (query_Type || query_Id || mail_qtype || mail_queryid) {
            let imesh = {};
            let im_iss = "";
            let param = "";
            let qtype;
            if (req.cookies.ImeshVisitor !== undefined && req.cookies.im_iss !== undefined) {
                req.cookies.ImeshVisitor.split('|').forEach(function (x) {
                    var arr = x.split('=');
                    if (arr[1] == "") { imesh[arr[0]] = "" }
                    arr[1] && (imesh[arr[0]] = arr[1]);
                });
                im_iss = (req.cookies.im_iss.split("t=")[1] == undefined ? (req.cookies.im_iss == '' ? ' ' : req.cookies.im_iss) : req.cookies.im_iss.split("t=")[1]);
            }
            else {
                res.redirect(301, "https://m.indiamart.com/messages/");
            }
            if (imesh.glid !== undefined && im_iss !== "" && im_iss !== " ") {
                let glid = imesh.glid;
                if (req.url.indexOf('enq/' + query_Type + query_Id) > -1) {
                    query_Type = req.url.split("/")[2].substr(0, 2);
                    query_Id = req.url.split("/")[2].substr(2);


                    if (query_Type == '01' || query_Type == '09' || query_Type == '10') {
                        qtype = 'W';

                    }
                    if (query_Type == '04') {
                        qtype = 'B';
                    }
                    if (query_Type == '03') {
                        qtype = 'P'
                    }
                }
                else if (mail_qtype && mail_queryid) {
                    qtype = mail_qtype;
                    query_Id = mail_queryid;
                }
                else {
                    res.redirect(301, "https://m.indiamart.com/messages/");
                }
                var options = {
                    method: 'POST',

                    url: 'http://' + enq_service + '/enquiry/findMail',
                    headers: {
                        'cache-control': 'no-cache',
                        'content-type': 'application/json'
                    },
                    form: JSON.stringify({
                        Q_TYPE: qtype,
                        GL_ID: glid,
                        QUERY_ID: query_Id,
                        Folder: 1,
                        mod_id: 'IMOB',
                        AK: im_iss
                    })
                };
                request(options, function (error, response, body) {
                    if (error) { res.status(503).send(); }
                    else {
                        let bodydata = JSON.parse(body);
                        let queryType = query_Type;
                        if (bodydata['0']) {
                            if ((queryType == '01' || queryType == '09' || queryType == '10')) {
                                param = bodydata['0']['FK_GLUSR_USR_ID'] != glid ? bodydata['0']['FK_GLUSR_USR_ID'] : bodydata['0']['RCV_GLUSR_USR_ID'] != glid ? bodydata['0']['RCV_GLUSR_USR_ID'] : '';
                            }
                            if (queryType == '04') {
                                param = bodydata['0']['FK_GLUSR_USR_ID'] != glid ? bodydata['0']['FK_GLUSR_USR_ID'] : bodydata['0']['R_GLUSR_USR_ID'] != glid ? bodydata['0']['R_GLUSR_USR_ID'] : '';
                            }
                            if (queryType == '03') {
                                param = bodydata['0']['PNS_CALL_CALLER_GLUSR_ID'] != glid ? bodydata['0']['PNS_CALL_CALLER_GLUSR_ID'] : bodydata['0']['PNS_CALL_RECEIVER_GLUSR_ID'] != glid ? bodydata['0']['PNS_CALL_RECEIVER_GLUSR_ID'] : '';
                            }
                            try {
                                res.redirect(301, "https://m.indiamart.com/messages/conversation/?sup_glid=" + Buffer.from(param).toString('base64'));
                            } catch (error) {
                                res.redirect(301, "https://m.indiamart.com/messages/");
                            }
                        }
                        else {
                            res.redirect(301, "https://m.indiamart.com/messages/");
                        }
                    }
                });


            }
        }
        else {
            res.redirect(301, "https://m.indiamart.com/messages/");
        }
    }
    else {
        try {
            decodeURI(req.url);
        }
        catch (error) {
            req.url = encodeURI(unescape(unescape(req.url)));
        }
        if ((req.url.indexOf("/messages/conversation") > -1) && (req.url.indexOf("/messages/conversation/") == -1)) {
            req.url = req.url.split("/messages/conversation").join("/messages/conversation/");
            res.redirect(301, req.url);
        }
        //manipulated url for messages/contactdetail/
        const msgContactDetails = '/messages/contactdetail/';
        if (parsedUrl.pathname.indexOf(msgContactDetails) > -1 && msgContactDetails.localeCompare(parsedUrl.pathname) !== 0) {
            res.redirect(301, '/messages/');
        }
        if (req.url.indexOf("isearch") > 0) {

            var parsedUrl = url.parse(req.url);
            var parsed = queryString.parse(req.url);
            var stringified = queryString.stringify(parsed);

            req.url = req.url.split("=")[0] + "=" + stringified.split("=")[1];
        }
        // Step 1: Get initial state
        const initialState = imStore.getState();
        initialState.ImeshVisitor = req.cookies.ImeshVisitor;
        initialState.v4iilex = req.cookies.v4iilex;
        initialState.Iploc = req.cookies.Iploc;
        // Step 2: Define routes on the server
        const routesMap = {
            routes,
            location: req.url
        }
        let pathname = req.url,
            headerTitle, desktopLink;
        pathname = pathname.split("/").splice(1, 2).join("");
        if (pathname.indexOf('enq') > -1 && /\d/.test(pathname)) {
            pathname = 'enqdetail';
            if (pathname.indexOf('mail') > -1 && req.query.modid == 'ASTBUY') {
                let enqId = req.query.mail;
                enqId = enqId.trim().replace(/\s+/, '%2B');
                enqId = new Buffer(enqId.trim().replace(/\s+/, '%2B'), 'base64').toString();
                enqId = enqId.split(':')[1];
                if (/^\d/.test(enqId)) enqId = '01' + enqId;
                else pathname = 'enq';
            }
        }

        if (pathname.indexOf('seller') > -1) {
            pathname = 'seller';
        }

        if (pathname.indexOf('bl') > -1 && /blsearch.php/.test(pathname)) pathname = 'blsearch';
        if (pathname == 'bl?ref=recent') pathname = 'recentbl';
        switch (pathname) {
            case 'products':
                headerTitle = 'My products';
                break;
            case 'productsedit':
                headerTitle = 'Edit Product';
                break;
            case 'productsadd':
                headerTitle = 'Add Product';
                break;
            case 'bl':
                headerTitle = 'Relevant Buy Leads';
                break;
            case 'recentbl':
                headerTitle = 'Recent Buy Leads';
                break;
            case 'blpackage.html':
                headerTitle = 'Buy Leads';
                break;
            case 'blsearch':
                headerTitle = 'Buy Leads';
                break;
            case 'blwishlist':
                headerTitle = 'Shortlisted Buy Leads';
                break;
            case 'enq':
                headerTitle = 'My Enquiries';
                break;
            case 'enqdetail':
                headerTitle = 'Enquiry Detail';
                break;
            case 'seller':
                headerTitle = 'Sell on IndiaMART';
                break;
            case 'messages':
                headerTitle = 'Messages';
                break;
            case 'messagesconversation':
                headerTitle = 'Messages';
                break;


            default:
                headerTitle = "Indiamart";
        }
        if (pathname.indexOf('enq') > -1 && /enq/.test(pathname)) {
            desktopLink = 'https://seller.indiamart.com/enquiry/inbox/';
        } else if (pathname.indexOf('products') > -1 && /products/.test(pathname)) {
            desktopLink = 'https://seller.indiamart.com/product/manageproduct/';
        }
        let userMode = req.cookies.ImeshVisitor ? 'Identified' : 'UnIdentified';
        let headInfo;
        headInfo = {
            'title': headerTitle,
            'link': desktopLink,
            'pathname': pathname,
            'userMode': userMode,
            'reqUrl': req.url,
            'script': ''
        }
        if (req.url.indexOf('isearch') > 0) {
            if (typeof req.query.s == "object") {
                if (req.query.s.length > 1) {
                    req.query.s = req.query.s[0] + req.query.s[1];
                }
            }

            headInfo.srchBx = '<div id="vernacularContainer" style="right:48px;display:flex;" class="poa mt10"><img id="langimg" class="db vam pdr5" src="https://m.imimg.com/gifs/langicon.png"></div><div id="slctContent" class="dn"><div class="bxrd4 clrb pf w80 z9999 tp30 bxrd5_b ma bgw tc pd10" style="left:0;right:0; top:30%"><label class="lang_slct crb tl por db" data-item="0"><span class="dib">English</span><input class="fr" type="radio" name="lang_slct" value="0"></label><label class="lang_slct por tl db" data-item="1"><span class="dib">हिंदी</span><input class="fr" type="radio" name="lang_slct" value="1"></label></div></div><div class="mbg" id="lang_popup" style="display:none"></div><div id="srchBx"><div class="crb"></div><div class="crx pd10 pr pwNsh"><input class="srchIp" name="s" style="font-size:15px;font-weight:bold;" id="srchInp" placeholder="Search for a product / service" autocomplete="off" value="' + (req.query.s ? req.query.s.replace(/%26/g, '&') : '') + '"><span class="tbSp pwSrch" id="btnSearch"></span><svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 10 16.44" width="20" height="20" id="vSrIco" class="poa vSrhIcon dn align"><path class="vSh1" d="M5,11.71a2.94,2.94,0,0,1-2.19-.92A2.93,2.93,0,0,1,1.9,8.6V3.11A3,3,0,0,1,2.81.91,3,3,0,0,1,5,0,3,3,0,0,1,7.19.91a3,3,0,0,1,.91,2.2V8.6a2.93,2.93,0,0,1-.91,2.19A2.94,2.94,0,0,1,5,11.71Z"/><path class="vSh2" d="M2.07,16.44a.28.28,0,0,1-.22-.1.34.34,0,0,1,0-.46.28.28,0,0,1,.22-.1H4.69V13.91l-.25,0a4.77,4.77,0,0,1-3.16-1.75A5.45,5.45,0,0,1,0,8.54V7.28a.32.32,0,0,1,.09-.23A.28.28,0,0,1,.31,7a.26.26,0,0,1,.21.1.32.32,0,0,1,.09.23V8.54A4.72,4.72,0,0,0,1.9,11.87a4.15,4.15,0,0,0,6.2,0A4.72,4.72,0,0,0,9.39,8.54V7.28a.32.32,0,0,1,.09-.23A.26.26,0,0,1,9.69,7a.28.28,0,0,1,.22.1.32.32,0,0,1,.09.23V8.54a5.45,5.45,0,0,1-1.28,3.59,4.77,4.77,0,0,1-3.16,1.75l-.25,0v1.87H7.93a.28.28,0,0,1,.22.1.34.34,0,0,1,0,.46.28.28,0,0,1-.22.1Z"/></svg></div></div>';
            headInfo.ht = 'ht88';
            headInfo.mt = 'mt88';
            headInfo.loader = "<div class='ldWrp'><div class='ldLsm'><p class='ldAni ldLs'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div></div><div class='ldcr'> <span class='ldAni ldBt ldBt1'></span> <span class='ldAni ldBt ldBt2'></span></div></div><div class='ldWrp'><div class='ldLsm'><p class='ldAni ldLs'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div></div><div class='ldcr'> <span class='ldAni ldBt ldBt1'></span> <span class='ldAni ldBt ldBt2'></span></div></div><div class='ldWrp'><div class='ldLsm'><p class='ldAni ldLs'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div></div><div class='ldcr'> <span class='ldAni ldBt ldBt1'></span> <span class='ldAni ldBt ldBt2'></span></div></div><div class='ldWrp'><div class='ldLsm'><p class='ldAni ldLs'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div></div><div class='ldcr'> <span class='ldAni ldBt ldBt1'></span> <span class='ldAni ldBt ldBt2'></span></div></div><div class='ldWrp'><div class='ldLsm'><p class='ldAni ldLs'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div></div><div class='ldcr'> <span class='ldAni ldBt ldBt1'></span> <span class='ldAni ldBt ldBt2'></span></div></div>";
            headInfo.pathname = 'isearch';
            headInfo.link = 'https://dir.indiamart.com/search.mp?ss=' + req.query.s;
            headInfo.svg = (userMode == 'Identified') ? '<i onClick=bannerDeepLinking("Header","",window.location.href); class="ico21_30 tc dib fr mt3"><svg height="19px" version="1.1" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#fff" id="Core" transform="translate(-383.000000, -213.000000)"><g id="file-download" transform="translate(383.000000, 213.500000)"><path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/></g></g></g></svg></i>' : ''
            //headInfo.svg = (userMode == 'Identified') ?  ('<i onClick=bannerDeepLinking("Header","",window.location.href); class="ico21_30 tc dib fr mt3"><svg height="19px" version="1.1" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#fff" id="Core" transform="translate(-383.000000, -213.000000)"><g id="file-download" transform="translate(383.000000, 213.500000)"><path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/></g></g></g></svg></i>') : ('<a href="https://m.indiamart.com/my/?ref=' + req.originalUrl +
            // '" class="fr tc dib"> <div class="ml5 dib pl10" ><svg width="21px" height="21px" viewBox="0 0 47.2 43.1"><path fill="#fff" d="M23.6,3c4.9,0,8.8,4,8.8,8.8s-4,8.8-8.8,8.8s-8.8-4-8.8-8.8S18.8,3,23.6,3C23.6,3,23.6,3,23.6,3 M23.6,0c-6.5,0-11.8,5.3-11.8,11.8s5.3,11.8,11.8,11.8c6.5,0,11.8-5.3,11.8-11.8C35.5,5.3,30.2,0,23.6,0C23.6,0,23.6,0,23.6,0z"/><path fill="#fff" d="M23.6,28.4c5.2,0.2,19.4,2.2,20.5,9v2.7H3v-3l0,0C3.1,36.4,5,29.6,23.6,28.4 M23.6,25.5C0.3,26.9,0,36.9,0,36.9v6.2h47.2v-5.9C45.8,26.1,23.6,25.4,23.6,25.5L23.6,25.5z"/><circle fill="#fff" cx="23.6" cy="11.8" r="9.9"/><path fill="#fff" d="M41.9,42.1c2.4-1.4,3.8-3.2,3.8-5c0-5-9.8-9-22-9s-22,4-22,9c0,1.9,1.4,3.6,3.8,5"/></svg></div></a>')

        } else if (req.url.indexOf('bl') > 0) {
            headInfo.pathname = 'bl';
            headInfo.srchBx = '<div id="srchBx"><div class="crb"></div><div class="crx pd10 pr"><div class="searchF" id="searchF"><input class="srchIp" name="s" id="srchIp" type="text" placeholder="Search Buy Leads / Tender" autocomplete="off" value="' + (req.query.s ? req.query.s : '') + '"><span class="tbSp pwSrch" id="btnSearch"></span></div></div></div>';
            headInfo.ht = 'ht88';
            headInfo.mt = 'mt88';

            let request_parts = req.url.split('/');
            if ((request_parts[2] && request_parts[3] && (request_parts[2] == "tender-notice")) || (request_parts[3] && !request_parts[4] && (request_parts[3] == "state" || request_parts[3] == "authority")) || ((request_parts.length == 2 && request_parts[1] == 'bl') || (request_parts.length == 3 && request_parts[1] == 'bl' && request_parts[2] == '') && !req.cookies.ImeshVisitor && !req.cookies.v4iilex) || request_parts[2] == 'package.html' || request_parts[2] == 'dir' || (validBlGroup(request_parts[2]) && ((request_parts.length == 4 && request_parts[3] == '') || (request_parts.length == 3)))) // /bl/
            {
                headInfo.loader = "<div class='dt w100 mh400'><div class='vam dtc tc'><div class='loader ma'></div>";
            }
            else {
                headInfo.loader = '<div id="blFrame" class="bgef" style="padding-top:5px;padding-bottom:5px"><div class="bl_card bgw"><svg viewBox="0 0 412 400" preserveAspectRatio="xMidYMid meet"><rect clip-path="url(#sst246byuo)" x="0" y="0" width="412" height="400" style="fill: url(&quot;#wtgqzt98o3c&quot;);"></rect><defs><clipPath id="sst246byuo"><rect x="15.63" y="18.61" rx="12" ry="12" width="237.98" height="20"></rect><rect x="15.63" y="55.61" rx="6" ry="6" width="107.98" height="13"></rect><rect x="0" y="95.61" rx="5" ry="5" width="412" height="1"></rect><circle cx="385.63" cy="95.61" r="13"></circle><circle cx="350.63" cy="95.61" r="13"></circle><rect x="15.63" y="130.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="130.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="15.63" y="160.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="160.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="15.63" y="190.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="190.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="0" y="230.61" rx="5" ry="5" width="412" height="1"></rect><rect x="15.63" y="250.61" rx="5" ry="5" width="357.98" height="11"></rect><rect x="15.63" y="275.61" rx="5" ry="5" width="198" height="11"></rect><rect x="56" y="320.61" rx="20" ry="20" width="300" height="40"></rect></clipPath><linearGradient id="wtgqzt98o3c"><stop offset="0.695168" stop-color="#f3f3f3" stop-opacity="1"><animate attributeName="offset" values="-3; 1" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="1.69517" stop-color="#ecebeb" stop-opacity="1"><animate attributeName="offset" values="-2; 2" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="2.69517" stop-color="#f3f3f3" stop-opacity="1"><animate attributeName="offset" values="-1; 3" dur="2s" repeatCount="indefinite"></animate></stop></linearGradient></defs></svg></div><div class="bl_card bgw"> <svg viewBox="0 0 412 400" preserveAspectRatio="xMidYMid meet"><rect clip-path="url(#sst246byuo)" x="0" y="0" width="412" height="400" style="fill: url(&quot;#wtgqzt98o3c&quot;);"></rect><defs><clipPath id="sst246byuo"><rect x="15.63" y="18.61" rx="12" ry="12" width="237.98" height="20"></rect><rect x="15.63" y="55.61" rx="6" ry="6" width="107.98" height="13"></rect><rect x="0" y="95.61" rx="5" ry="5" width="412" height="1"></rect><circle cx="385.63" cy="95.61" r="13"></circle><circle cx="350.63" cy="95.61" r="13"></circle><rect x="15.63" y="130.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="130.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="15.63" y="160.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="160.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="15.63" y="190.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="190.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="0" y="230.61" rx="5" ry="5" width="412" height="1"></rect><rect x="15.63" y="250.61" rx="5" ry="5" width="357.98" height="11"></rect><rect x="15.63" y="275.61" rx="5" ry="5" width="198" height="11"></rect><rect x="56" y="320.61" rx="20" ry="20" width="300" height="40"></rect></clipPath><linearGradient id="wtgqzt98o3c"><stop offset="0.695168" stop-color="#f3f3f3" stop-opacity="1"><animate attributeName="offset" values="-3; 1" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="1.69517" stop-color="#ecebeb" stop-opacity="1"><animate attributeName="offset" values="-2; 2" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="2.69517" stop-color="#f3f3f3" stop-opacity="1"><animate attributeName="offset" values="-1; 3" dur="2s" repeatCount="indefinite"></animate></stop></linearGradient></defs></svg></div><div class="bl_card bgw"> <svg viewBox="0 0 412 400" preserveAspectRatio="xMidYMid meet"><rect clip-path="url(#sst246byuo)" x="0" y="0" width="412" height="400" style="fill: url(&quot;#wtgqzt98o3c&quot;);"></rect><defs><clipPath id="sst246byuo"><rect x="15.63" y="18.61" rx="12" ry="12" width="237.98" height="20"></rect><rect x="15.63" y="55.61" rx="6" ry="6" width="107.98" height="13"></rect><rect x="0" y="95.61" rx="5" ry="5" width="412" height="1"></rect><circle cx="385.63" cy="95.61" r="13"></circle><circle cx="350.63" cy="95.61" r="13"></circle><rect x="15.63" y="130.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="130.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="15.63" y="160.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="160.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="15.63" y="190.61" rx="5" ry="5" width="107.98" height="11"></rect><rect x="165.63" y="190.61" rx="5" ry="5" width="57.98" height="11"></rect><rect x="0" y="230.61" rx="5" ry="5" width="412" height="1"></rect><rect x="15.63" y="250.61" rx="5" ry="5" width="357.98" height="11"></rect><rect x="15.63" y="275.61" rx="5" ry="5" width="198" height="11"></rect><rect x="56" y="320.61" rx="20" ry="20" width="300" height="40"></rect></clipPath><linearGradient id="wtgqzt98o3c"><stop offset="0.695168" stop-color="#f3f3f3" stop-opacity="1"><animate attributeName="offset" values="-3; 1" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="1.69517" stop-color="#ecebeb" stop-opacity="1"><animate attributeName="offset" values="-2; 2" dur="2s" repeatCount="indefinite"></animate></stop><stop offset="2.69517" stop-color="#f3f3f3" stop-opacity="1"><animate attributeName="offset" values="-1; 3" dur="2s" repeatCount="indefinite"></animate></stop></linearGradient></defs></svg></div></div>';
            }
        }
        else if (req.url == '/messages/') {
            headInfo.srchBx = '';
            headInfo.ht = 'ht47';
            headInfo.mt = 'mt47';
            headInfo.loader = "<div class='ldWrp'><div class='ldmsgb'><p class='ldAni ldmsg'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div><div class='ldmsgCta'><p class='ldAni ldStp ldmsgw50'></p><p class='ldAni ldMsgP'></p></div></div></div><div class='ldWrp'><div class='ldmsgb'><p class='ldAni ldmsg'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div><div class='ldmsgCta'><p class='ldAni ldStp ldmsgw50'></p><p class='ldAni ldMsgP'></p></div></div></div><div class='ldWrp'><div class='ldmsgb'><p class='ldAni ldmsg'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div><div class='ldmsgCta'><p class='ldAni ldStp ldmsgw50'></p><p class='ldAni ldMsgP'></p></div></div></div><div class='ldWrp'><div class='ldmsgb'><p class='ldAni ldmsg'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div><div class='ldmsgCta'><p class='ldAni ldStp ldmsgw50'></p><p class='ldAni ldMsgP'></p></div></div></div><div class='ldWrp'><div class='ldmsgb'><p class='ldAni ldmsg'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div><div class='ldmsgCta'><p class='ldAni ldStp ldmsgw50'></p><p class='ldAni ldMsgP'></p></div></div></div><div class='ldWrp'><div class='ldmsgb'><p class='ldAni ldmsg'></p><div><p class='ldAni ldStp lds1'></p><p class='ldAni ldStp'></p><p class='ldAni ldStp'></p></div><div class='ldmsgCta'><p class='ldAni ldStp ldmsgw50'></p><p class='ldAni ldMsgP'></p></div></div></div>";

        } else if (parsedUrl.pathname == '/') {
            headInfo.srchBx = '<div id="srchBx"><div class="crb"></div><div class="crx pd10 pr pwNsh"><input class="srchIp" name="s" style="font-size:15px;" id="srchInp" placeholder="Search for a product / service" autocomplete="off" value="' + (req.query.s ? req.query.s : '') + '"><span class="tbSp pwSrch" id="btnSearch"></span><svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 10 16.44" width="20" height="20" id="vSrIco" class="poa vSrhIcon dn align"><path class="vSh1" d="M5,11.71a2.94,2.94,0,0,1-2.19-.92A2.93,2.93,0,0,1,1.9,8.6V3.11A3,3,0,0,1,2.81.91,3,3,0,0,1,5,0,3,3,0,0,1,7.19.91a3,3,0,0,1,.91,2.2V8.6a2.93,2.93,0,0,1-.91,2.19A2.94,2.94,0,0,1,5,11.71Z"/><path class="vSh2" d="M2.07,16.44a.28.28,0,0,1-.22-.1.34.34,0,0,1,0-.46.28.28,0,0,1,.22-.1H4.69V13.91l-.25,0a4.77,4.77,0,0,1-3.16-1.75A5.45,5.45,0,0,1,0,8.54V7.28a.32.32,0,0,1,.09-.23A.28.28,0,0,1,.31,7a.26.26,0,0,1,.21.1.32.32,0,0,1,.09.23V8.54A4.72,4.72,0,0,0,1.9,11.87a4.15,4.15,0,0,0,6.2,0A4.72,4.72,0,0,0,9.39,8.54V7.28a.32.32,0,0,1,.09-.23A.26.26,0,0,1,9.69,7a.28.28,0,0,1,.22.1.32.32,0,0,1,.09.23V8.54a5.45,5.45,0,0,1-1.28,3.59,4.77,4.77,0,0,1-3.16,1.75l-.25,0v1.87H7.93a.28.28,0,0,1,.22.1.34.34,0,0,1,0,.46.28.28,0,0,1-.22.1Z"/></svg></div></div>';
            headInfo.ht = 'ht88';
            headInfo.mt = '';
            headInfo.loader = "<div class='dt w100 mh400'><div class='vam dtc tc'><div class='loader1 w100'> <div class='dot'></div><div class='dot'></div><div class='dot'></div><div class='dot'></div><div class='dot'></div><div class='fs18 fw clrDrkB pd10 mt10'>Welcome to India's Largest marketplace connecting Buyers and Suppliers</div></div></div>";
            headInfo.pathname = 'home';
            headInfo.link = 'https://www.indiamart.com';
            headInfo.svg = (userMode == 'Identified') ? '<i onClick=bannerDeepLinking("Header","",window.location.href); class="ico21_30 tc dib fr mt3 dn"><svg height="19px" version="1.1" viewBox="0 0 14 19" width="14px" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#fff" id="Core" transform="translate(-383.000000, -213.000000)"><g id="file-download" transform="translate(383.000000, 213.500000)"><path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/></g></g></g></svg></i>' : '<a onclick="gaTrck_pwa(\'Header-Clicks\', \'Logo-Icon\',\'Home\')" href="https://' + signup_url + 'm.indiamart.com/my/?ref=' + req.originalUrl +
                '" class="fr tc dib"> <div class="ml5 dib pl10 dn" ><svg width="21px" height="21px" viewBox="0 0 47.2 43.1"><path fill="#fff" d="M23.6,3c4.9,0,8.8,4,8.8,8.8s-4,8.8-8.8,8.8s-8.8-4-8.8-8.8S18.8,3,23.6,3C23.6,3,23.6,3,23.6,3 M23.6,0c-6.5,0-11.8,5.3-11.8,11.8s5.3,11.8,11.8,11.8c6.5,0,11.8-5.3,11.8-11.8C35.5,5.3,30.2,0,23.6,0C23.6,0,23.6,0,23.6,0z"/><path fill="#fff" d="M23.6,28.4c5.2,0.2,19.4,2.2,20.5,9v2.7H3v-3l0,0C3.1,36.4,5,29.6,23.6,28.4 M23.6,25.5C0.3,26.9,0,36.9,0,36.9v6.2h47.2v-5.9C45.8,26.1,23.6,25.4,23.6,25.5L23.6,25.5z"/><circle fill="#fff" cx="23.6" cy="11.8" r="9.9"/><path fill="#fff" d="M41.9,42.1c2.4-1.4,3.8-3.2,3.8-5c0-5-9.8-9-22-9s-22,4-22,9c0,1.9,1.4,3.6,3.8,5"/></svg></div></a>'
            headInfo.homedata = '';
            let str_for_pv = '/home/';
            if (req.cookies.ImeshVisitor && ((req.cookies.ImeshVisitor.indexOf('utyp=P') > -1) || (req.cookies.sellertool) && (req.cookies.ImeshVisitor.indexOf('utyp=F') > -1)))
                str_for_pv += 'seller'
            else if (req.cookies.ImeshVisitor)
                str_for_pv += 'identified'
            else
                str_for_pv += 'unidentified'
            headInfo.reqUrl = str_for_pv

        }

        else {
            headInfo.srchBx = '';
            headInfo.ht = 'ht47';
            headInfo.mt = 'mt47';
            headInfo.loader = "<div class='dt w100 mh400'><div class='vam dtc tc'><div class='loader ma'></div>";
        }
        //   // Step 8: Define routes on the server
        match(routesMap, function (error, redirectLocation, routeContext) {
            var reqUrl = '',
                meta_desc = '',
                meta_keywords = '',
                metatags = '',
                pageTitle = '',
                link = '';
            if (error) {
                res.status(500).send("Could not fulfill this request. Please try again later.")
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            }
            if (req.url.charAt(req.url.length - 1) != '/' && (Object.keys(req.query).length === 0 && req.query.constructor === Object) && req.url.indexOf('.') == -1) {
                //redirect with '/'
                res.redirect(301, req.url + '/');
            }
            else {
                let request_parts = (req.path).split('/');
                const html = '';
                //const html = renderToString(<Provider store={imStore}><App/></Provider>);
                let head = Helmet.rewind();
                //BL component
                if (req.url.indexOf('bl') > 0) {
                    let servicebl = 'leads.imutils.com';
                    process.env.NODE_ENV_M == 'dev' ? servicebl = 'stg-leads.imutils.com' : process.env.NODE_ENV_M == 'stg' ? servicebl = 'stg-leads.imutils.com' : servicebl;
                    //all-BL Pages that need **SEO
                    if ((req.path.match(/\/bl\/[A-Za-z0-9-]+\//) || req.path.match(/\/bl\/[A-Za-z0-9-]+/)) && !req.path.match(/search.php/) && !req.path.match(/dir/) && !req.path.match(/package.html/) && !req.path.match(/blpurchaseresponse/) && !req.path.match(/tenders\/state/) && !req.path.match(/tenders\/authority/) && !req.path.match(/tenders\/industry/) && !req.path.match(/tender-notice/)) {
                        let srchFrErr = (req.cookies.ImeshVisitor && req.cookies.v4iilex) ? 2 : 0;
                        srchFrErr = srchFrErr == 0 ? false : true
                        let request_options = {};
                        let request_parts = req.path.split('/');
                        let tenderDetail = false;
                        if (request_parts[2] == "tenders") {
                            if (request_parts[3] && request_parts[3].match(/\d/)) {
                                tenderDetail = true;
                            }
                            else {
                                initialState.buyleads = [];
                                initialState.hasMoreBuyleads = true;
                                initialState.isFetchingBuyleads = false;
                                initialState.listing_val = {};
                                initialState.errorBL = false;
                                initialState.blCatError = false;
                                initialState.blOfferError = false;
                                initialState.expired = false;
                                metatags = '<META NAME="DESCRIPTION" CONTENT="Latest Indian Tenders - Find Indian Government Tenders, Private Tenders, Bank Tenders, Tenders by City &amp; State, Online Tenders." /><meta name="keywords" content="Tenders from India, Online Tenders, Indian Tenders Online, national tenders, e tenders india, Tenders India, Government tender, Corporate tender, Public tender, Procurement notices, Indian tender notifications, Industry tenders, Tender India, Tenders notification service, best tender sites, Indian government tenders, Domestic India tenders, Online tender, Tender invitation notice, Business tender notices, online tenders and bidding, Tender procurement notices, Indian tenders portal.">';
                                link = '<link rel="canonical" href="https://tenders.indiamart.com/" ><link rel="alternate" id="desktop" href="https://tenders.indiamart.com/"  media="only screen" ><link rel="alternate"  media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/tenders/">';
                                pageTitle = '<TITLE>Latest Indian Tenders - Government Tenders, e-Tenders, Online Tenders Information | IndiaMART Tenders</TITLE>';
                                headInfo.link = "https://tenders.indiamart.com/";
                                res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200));
                            }
                        }
                        if ((request_parts[2].match(/\d/) && (request_parts[3] == '' || Object.keys(req.query).length > 0)) || tenderDetail)//offer-id or tenders/offerid page
                        {
                            let imesh = {}, glid;
                            if (req.cookies.ImeshVisitor !== undefined && req.cookies.im_iss !== undefined && req.cookies.v4iilex) {
                                req.cookies.ImeshVisitor.split('|').forEach(function (x) {
                                    var arr = x.split('=');
                                    if (arr[1] == "") { imesh[arr[0]] = "" }
                                    arr[1] && (imesh[arr[0]] = arr[1]);
                                });
                                glid = imesh.glid;
                            }

                            headInfo.srchBx = '<div id="srchBx"><div class="crb"></div><div class="crx pd10 pr"><form class="searchF" id="searchF" action="/bl/search.php?s=" method="get"><input class="srchIp" name="s" id="srchIp" type="text" placeholder="Search Buy Leads / Tender" autocomplete="off" value=""><span class="tbSp pwSrch" id="btnSearch"></span></form></div></div>';
                            request_options = {
                                method: 'POST',
                                url: 'http://' + servicebl + '/wservce/buyleads/detail/',
                                headers: {},
                                form: {
                                    glusrid: glid,
                                    offer: request_parts[2],
                                    token: 'imobile@15061981',
                                    offer_type: 'B',
                                    buyer_response: 1,
                                    additionalinfo_format: 'JSON',
                                    modid: 'IMOB',
                                    breadcrumb: 1
                                }
                            };
                            if (tenderDetail) {
                                request_options.form.offer_type = "T";
                                request_options.form.offer = request_parts[3];
                            }
                            let bls_for_offer = service_Data_Fetcher(request_options);

                            bls_for_offer.then(function (val) {
                                if (typeof val == "number") {
                                    if (val == 410) {
                                        val = 404;
                                    }
                                    pageTitle = '<title>Page Not Found</title>';
                                    metatags = '';
                                    headInfo.link = "";
                                    initialState.blOfferError = true;
                                    res.status(val).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                                }
                                else {
                                    let all_bl_data = JSON.parse(val);
                                    if (all_bl_data['RESPONSE']['CODE'] != 200) {
                                        initialState.buyleads = [];
                                        initialState.hasMoreBuyleads = true;
                                        initialState.isFetchingBuyleads = false;
                                        initialState.listing_val = {};
                                        initialState.errorBL = false;
                                        initialState.blCatError = false;
                                        initialState.expired = false;
                                        pageTitle = '<title>Page Not Found</title>';
                                        metatags = '';
                                        headInfo.link = "";
                                        if (all_bl_data['RESPONSE']['CODE'] == 410) {
                                            all_bl_data['RESPONSE']['CODE'] = 404;
                                        }
                                        initialState.blOfferError = true;
                                        res.status(all_bl_data['RESPONSE']['CODE']).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                                    }
                                    else {
                                        //Handle Meta...
                                        if (!tenderDetail) {
                                            blOfferExpiredNotFound(all_bl_data['RESPONSE']['DATA']['ETO_OFR_EXP_DATE'], initialState, res, html, headInfo, head, pageTitle, metatags, link);
                                            let bot_bl_date, bl_date_data, titl_val = '', desc_val = '', kwrd_val = '', gogobot = '', whyuneedthis = '', effectiveDate, expDay, expMonth, expYear;
                                            all_bl_data['RESPONSE']['DATA']['OFR_DATE'] && (bl_date_data = {
                                                y: all_bl_data['RESPONSE']['DATA']['OFR_DATE'].substring(0, 4),
                                                m: all_bl_data['RESPONSE']['DATA']['OFR_DATE'].substring(4, 6),
                                                d: all_bl_data['RESPONSE']['DATA']['OFR_DATE'].substring(6, 8)
                                            });
                                            if (bl_date_data) {
                                                bot_bl_date = new Date(parseInt(bl_date_data.y), parseInt(bl_date_data.m) + 2, parseInt(bl_date_data.d));

                                                bot_bl_date = bot_bl_date.getDate() + '-' + get_month_name(bot_bl_date.getMonth()) + '-' + bot_bl_date.getFullYear() + ' 00:00:00 EST';
                                            }

                                            if (all_bl_data['RESPONSE']['DATA']["ENRICHMENTINFO"]) {
                                                let ac = JSON.parse(all_bl_data['RESPONSE']['DATA']["ENRICHMENTINFO"]);
                                                whyuneedthis = ac["Why do you need this"] ? ac["Why do you need this"] : '';
                                            }
                                            if (whyuneedthis != '') {
                                                whyuneedthis = ' ' + whyuneedthis + ' ';
                                            }
                                            if (all_bl_data['RESPONSE']['DATA']['FK_GL_COUNTRY_ISO'] != 'IN') {
                                                titl_val = all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"] + ' buyer and buylead in ' + all_bl_data['RESPONSE']['DATA']["GLUSR_COUNTRY"] + ' | ID:' + request_parts[2];
                                                gogobot = 'unavailable after: ' + bot_bl_date;
                                                desc_val = 'Buyer is looking for ' + all_bl_data['RESPONSE']['DATA']['ETO_OFR_TITLE'] + ' in ' + all_bl_data['RESPONSE']['DATA']["GLUSR_COUNTRY"] + whyuneedthis + '.Find buyers, buyleads, buying requirement and RFQs.';
                                                kwrd_val = all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"] + static_blkeywords();
                                            }
                                            else {
                                                if (all_bl_data['RESPONSE']['DATA']['ETO_OFR_GLCAT_MCAT_NAME'].localeCompare(all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"]) == 0) {
                                                    titl_val = all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"] + ' buyer and buylead in ' + all_bl_data['RESPONSE']['DATA']["GLUSR_CITY"] + ', ' + all_bl_data['RESPONSE']['DATA']["GLUSR_STATE"] + ' | ID:' + request_parts[2];
                                                    desc_val = 'Buyer is looking for ' + all_bl_data['RESPONSE']['DATA']['ETO_OFR_TITLE'] + ' in ' + all_bl_data['RESPONSE']['DATA']["GLUSR_CITY"] + ', ' + all_bl_data['RESPONSE']['DATA']["GLUSR_STATE"] + whyuneedthis + '.Find buyers, buyleads, buying requirement and RFQs from India and abroad.';
                                                    kwrd_val = all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"] + static_blkeywords();

                                                }
                                                else {
                                                    titl_val = all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"] + ' buyer and buylead in ' + all_bl_data['RESPONSE']['DATA']["GLUSR_CITY"] + ', ' + all_bl_data['RESPONSE']['DATA']["GLUSR_STATE"] + ' | ID:' + request_parts[2];
                                                    desc_val = 'Buyer is looking for ' + all_bl_data['RESPONSE']['DATA']['ETO_OFR_TITLE'] + ' in ' + all_bl_data['RESPONSE']['DATA']["GLUSR_CITY"] + ', ' + all_bl_data['RESPONSE']['DATA']["GLUSR_STATE"] + whyuneedthis + '.Find buyers, buyleads, buying requirement and RFQs for ' + all_bl_data['RESPONSE']['DATA']['ETO_OFR_GLCAT_MCAT_NAME'] + ' from India and abroad.';
                                                    // desc_val = 'View verified details of '+all_bl_data['RESPONSE']['DATA']["ETO_OFR_GLCAT_MCAT_NAME"]+' and '+all_bl_data['RESPONSE']['DATA']['ETO_OFR_TITLE']+' Buyers from '+all_bl_data['RESPONSE']['DATA']['GLUSR_CITY']+','+all_bl_data['RESPONSE']['DATA']['GLUSR_STATE']+','+all_bl_data['RESPONSE']['DATA']['GLUSR_COUNTRY']+'. Contact '+all_bl_data['RESPONSE']['DATA']['ETO_OFR_TITLE']+' Buyers and grow your business.';
                                                    kwrd_val = all_bl_data['RESPONSE']['DATA']["ETO_OFR_TITLE"] + ',' + all_bl_data['RESPONSE']['DATA']["ETO_OFR_GLCAT_MCAT_NAME"] + static_blkeywords();
                                                }
                                                gogobot = 'unavailable after: ' + bot_bl_date;
                                            }
                                            res.header('X-Robots-Tag', 'noarchive');
                                            res.header('X-Robots-Tag', gogobot);

                                            metatags = '<meta name="description" content="' + desc_val + '"><meta name="keywords" content="' + kwrd_val + '"><meta name="GOOGLEBOT" content="unavailable_after:' + bot_bl_date + '">';
                                            link = '<link rel="canonical" href="https://trade.indiamart.com/details.mp?offer=' + request_parts[2] + '"><link rel="alternate"  media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/' + request_parts[2] + '/" >';
                                            pageTitle = '<title>' + titl_val + '</title>';
                                            headInfo.link = "https://trade.indiamart.com/details.mp?offer=" + request_parts[2];
                                            let id = "https://m.indiamart.com/bl/" + all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_GRP_ETOFNME'] + "/";
                                            let id2 = "https://m.indiamart.com/bl/" + all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_GRP_ETOFNME'] + "/" + all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_ETOFNME'] + "/";
                                            let id3 = "https://m.indiamart.com/bl/" + request_parts[2] + "/";
                                            let crumbsObj =
                                            {
                                                "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
                                                    {
                                                        "@type": "ListItem", "position": 1, "item":
                                                            { "@id": "https://m.indiamart.com/bl/", "name": "Buyleads" }
                                                    },
                                                    {
                                                        "@type": "ListItem", "position": 2, "item":
                                                            { "@id": id, "name": all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_GRP_ETOSNME'] }
                                                    },
                                                    {
                                                        "@type": "ListItem", "position": 3, "item":
                                                            { "@id": id2, "name": all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_DEFSHORTNAME'] }
                                                    },
                                                    {
                                                        "@type": "ListItem", "position": 4, "item":
                                                            { "@id": id3, "name": all_bl_data['RESPONSE']['DATA']['ETO_OFR_TITLE'] }
                                                    }
                                                ]
                                            };
                                            headInfo.script = "<script type='application/ld+json'>" + JSON.stringify(crumbsObj) + "</script>"
                                        }
                                        else //meta for tender/id page
                                        {
                                            let titl_val = '', desc_val = '', kwrd_val = '', gogobot = '',
                                                tState = all_bl_data['RESPONSE']['DATA']['ETO_TDR_PROJECT_STATE'] ? all_bl_data['RESPONSE']['DATA']['ETO_TDR_PROJECT_STATE'] : '',
                                                tCity = all_bl_data['RESPONSE']['DATA']['ETO_TDR_PROJECT_CITY'] ? all_bl_data['RESPONSE']['DATA']['ETO_TDR_PROJECT_CITY'] + ',' : '';

                                            titl_val = all_bl_data['RESPONSE']['DATA']["ETO_TDR_TITLE"] + ' | Tenders in ' + tCity + ' ' + tState + ' | ID:' + request_parts[3];
                                            desc_val = tState + ' Tender - ' + all_bl_data['RESPONSE']['DATA']["ETO_TDR_TITLE"] + ' | ID:' + request_parts[3];
                                            kwrd_val = '';

                                            metatags = '<meta name="description" content="' + desc_val + '"><meta name="keywords" content="' + kwrd_val + '">';
                                            link = '<link rel="canonical" href="https://tenders.indiamart.com/details/' + request_parts[3] + '/"><link rel="alternate"  href="https://m.indiamart.com/bl/tenders/' + request_parts[3] + '/" media="only screen and (max-device-width: 640px)" >';
                                            pageTitle = '<title>' + titl_val + '</title>';
                                            headInfo.link = 'https://tenders.indiamart.com/details/' + request_parts[3] + '/';

                                            res.header('X-Robots-Tag', 'noarchive');

                                        }
                                        //Handle the Store
                                        initialState.listing_val = {};
                                        all_bl_data['RESPONSE']['DATA']['status'] = 'valid';
                                        let list = all_bl_data['RESPONSE']['DATA'];
                                        var bls = [];
                                        bls = {};
                                        let msg = all_bl_data['RESPONSE']['MESSAGE'];
                                        bls['message'] = false;
                                        bls['message'] = (("THE OFFER HAS ALREADY BEEN PURCHASED").localeCompare(msg) == 0);
                                        if (list.ETO_REJECTION_REASON) {
                                            if (list.PURCHASE_STATUS == 'OPEN' && all_bl_data['RESPONSE']['STATUS'] == 5 && (list.ETO_REJECTION_REASON == "Direct Enquiry - LEAP" || list.ETO_REJECTION_REASON == "Lead has been introduced via AST_BUY"))
                                                bls['message'] = true;
                                        }
                                        bls['ETO_OFR_ID'] = list.ETO_OFR_DISPLAY_ID;
                                        bls['ETO_OFR_TITLE'] = list.ETO_OFR_TITLE;
                                        bls['ETO_OFR_DESC'] = list.ETO_OFR_DESC;
                                        bls['GLUSR_CITY'] = list.GLUSR_CITY;
                                        bls['GLUSR_STATE'] = list.GLUSR_STATE;
                                        bls['GLUSR_COUNTRY'] = list.GLUSR_COUNTRY;
                                        bls['ENRICHMENTINFO'] = list['ENRICHMENTINFO'];
                                        bls['ADDITIONALINFO'] = list.ADDITIONALINFO;
                                        bls['GL_COUNTRY_FLAG'] = list.GL_COUNTRY_FLAG_SMALL;
                                        bls['BY_LEAD_TYPE'] = list.BY_LEAD_TYPE;
                                        bls['ETO_ENQ_TYP'] = list.ETO_ENQ_TYP; //ETO_ENQ_TYP for search
                                        bls['FK_GLCAT_MCAT_ID'] = list.FK_GLCAT_MCAT_ID;
                                        bls['DAY_DIFF'] = list.DAY_DIFF ? list.DAY_DIFF : 0;
                                        bls['HOUR_DIFF'] = list.HR_DIFF ? list.HR_DIFF : 0;
                                        bls['MIN_DIFF'] = list.MIN_DIFF ? list.MIN_DIFF : 0;
                                        bls['REJECT'] = list.REJECT;
                                        bls['ETO_OFR_GLCAT_MCAT_NAME'] = list.ETO_OFR_GLCAT_MCAT_NAME;
                                        bls['OFFER_FLAG'] = (tenderDetail) ? 'T' : 'B';
                                        if (tenderDetail) {
                                            bls['ETO_OFR_DESC'] = list.ETO_TDR_DESC;
                                            bls['GLUSR_CITY'] = list.ETO_TDR_PROJECT_CITY;
                                            bls['GLUSR_STATE'] = list.ETO_TDR_PROJECT_STATE;
                                            bls['ETO_OFR_TITLE'] = list.ETO_TDR_TITLE;
                                            bls['ETO_OFR_ID'] = list.ETO_TDR_ID;
                                            bls['ETO_TDR_PUBLISH_DATE'] = list.ETO_TDR_PUBLISH_DATE;
                                            bls['ETO_OFR_QTY'] = (list.ETO_TDR_QUANTITY && list.ETO_TDR_QTY_UNIT) && list.ETO_TDR_QUANTITY + " " + list.ETO_TDR_QTY_UNIT;
                                            bls['ETO_TDR_EARNEST'] = list.ETO_TDR_EARNEST;
                                            bls['ETO_TDR_DOCFEES'] = list.ETO_TDR_DOCFEES;
                                            bls['ETO_TDR_DOC_SALE_STARTDATE'] = list.ETO_TDR_DOC_SALE_STARTDATE;
                                            bls['ETO_TDR_DOC_SALE_LASTDATE'] = list.ETO_TDR_DOC_SALE_LASTDATE;
                                            bls['ETO_TDR_DOC_SUBMIT_BEFOREDATE'] = list.ETO_TDR_DOC_SUBMIT_BEFOREDATE;
                                            bls['ETO_TDR_OPEN_DATE'] = list.ETO_TDR_OPEN_DATE;
                                            bls['ETO_TDR_COMP_WEBSITE'] = list.ETO_TDR_COMP_WEBSITE;
                                            bls['ETO_OFR_GLCAT_MCAT_NAME'] = list.PRIME_MCAT_NAME;

                                        }
                                        initialState.buyleads = [bls];
                                        initialState.errorBL = false;
                                        initialState.blOfferError = false;
                                        initialState.blCatError = false;
                                        if (!tenderDetail)
                                            initialState.crumbData = { Gname: all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_GRP_ETOSNME'], SGname: all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_DEFSHORTNAME'], Gid: all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_GRP_ETOFNME'], SGid: all_bl_data['RESPONSE']['DATA']['GLCAT_ALLCAT_ETOFNME'] };

                                        res.status(all_bl_data['RESPONSE']['CODE']).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));

                                    }
                                }

                            });

                            bls_for_offer.catch(function (error) {
                                headInfo.link = "";
                                pageTitle = '<title>Page Not Found</title>';
                                metatags = '';
                                res.status(503).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 503));
                            });

                        }
                        else {
                            // page is either-
                            // 1./bl/grp_name - valid
                            // 2./bl/sub_grp_name -valid but needs redirection
                            // 3./bl/grp_name/sub_grp_name - valid
                            // 4./bl/..something_invalid.....

                            if (validBlGroup(request_parts[2])) {
                                if (request_parts.length > 4 && request_parts[3] != '')//  3
                                {


                                    request_options = {
                                        method: 'POST',
                                        url: 'http://' + servicebl + '/wservce/buyleads/group/',
                                        headers: {
                                            'cache-control': 'no-cache',
                                            'content-type': 'application/json'
                                        },
                                        form: {
                                            start: 1,
                                            end: 10,
                                            grpname: request_parts[3],
                                            parentgrpname: request_parts[2],
                                            trade_flag: 1,
                                            modid: 'IMOB',
                                            token: 'imobile@15061981'
                                        }
                                    };
                                    let subcat_data_list = service_Data_Fetcher(request_options);
                                    subcat_data_list.then(function (subcat_data_val) {
                                        if (typeof subcat_data_val == "number") {
                                            headInfo.link = "";
                                            pageTitle = '<title>Page Not Found</title>';
                                            metatags = '';
                                            initialState.blCatError = true;
                                            res.status(subcat_data_val).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                        }
                                        else {
                                            let SubcatBLs = JSON.parse(subcat_data_val);
                                            if (SubcatBLs.data == undefined) {
                                                initialState.buyleads = [];
                                                initialState.hasMoreBuyleads = true;
                                                initialState.isFetchingBuyleads = false;
                                                initialState.listing_val = {};
                                                initialState.errorBL = false;
                                                initialState.blOfferError = false;
                                                //404 -meta's need to be set
                                                headInfo.link = "";
                                                pageTitle = '<title>Page Not Found</title>';
                                                metatags = '';
                                                initialState.blCatError = true;
                                                res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                            }
                                            else {
                                                //Handling the Meta
                                                let get_meta_data = SubcatBLs;
                                                let meta_group_name = get_meta_data['flname'];
                                                let meta_sub_cat_name = get_meta_data['CATALOG_LINKS']['GLCAT_ALLCAT_ETOFNME'];
                                                get_meta_data = get_meta_data['META_DETAILS'];
                                                let desc_val = -1, kwrd_val = -1, titl_val = -1;
                                                for (let i = 0; i < get_meta_data.length; i++) //get the correct index from service data..for meta
                                                {
                                                    if (get_meta_data[i]['FK_GLMETA_TYP_ID'] == 'DESC') { desc_val = i; }
                                                    else if (get_meta_data[i]['FK_GLMETA_TYP_ID'] == 'KWRD') { kwrd_val = i; }
                                                    else if (get_meta_data[i]['FK_GLMETA_TYP_ID'] == 'TITL') { titl_val = i; }
                                                }
                                                desc_val = desc_val == -1 ? '' : get_meta_data[desc_val]['GLMETA_DISTINCT_VAL'];
                                                kwrd_val = kwrd_val == -1 ? '' : get_meta_data[kwrd_val]['GLMETA_DISTINCT_VAL'];
                                                titl_val = titl_val == -1 ? '' : get_meta_data[titl_val]['GLMETA_DISTINCT_VAL'];

                                                metatags = '<meta name="description" content="' + desc_val + '"><meta name="keywords" content="' + kwrd_val + '">';
                                                link = '<link rel="canonical" href="https://trade.indiamart.com/offer/' + meta_group_name + '/' + meta_sub_cat_name + '/"><link rel="alternate"  media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/' + meta_group_name + "/" + meta_sub_cat_name + '/">';
                                                pageTitle = '<title>' + titl_val + '</title>';
                                                headInfo.link = 'https://trade.indiamart.com/offer/' + meta_group_name + '/' + meta_sub_cat_name + '/';
                                                let id = "https://m.indiamart.com/bl/" + meta_group_name + "/";
                                                let id2 = "https://m.indiamart.com/bl/" + meta_group_name + "/" + meta_sub_cat_name + "/";
                                                let crumbsObj =
                                                {
                                                    "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
                                                        {
                                                            "@type": "ListItem", "position": 1, "item":
                                                                { "@id": "https://m.indiamart.com/bl/", "name": "Buyleads" }
                                                        },
                                                        {
                                                            "@type": "ListItem", "position": 2, "item":
                                                                { "@id": id, "name": SubcatBLs['CATALOG_LINKS']['GLCAT_ALLCAT_GRP_CTLSNME'] }
                                                        },
                                                        {
                                                            "@type": "ListItem", "position": 3, "item":
                                                                { "@id": id2, "name": SubcatBLs['CATALOG_LINKS']['GLCAT_ALLCAT_DEFSHORTNAME'] }
                                                        }
                                                    ]
                                                };
                                                headInfo.script = "<script type='application/ld+json'>" + JSON.stringify(crumbsObj) + "</script>"

                                                //Handling the Store
                                                let list = SubcatBLs.data;
                                                let bls = [];
                                                for (var i in list) {
                                                    bls[i] = {};
                                                    bls[i]['ETO_OFR_ID'] = list[i].DISPLAYID;
                                                    bls[i]['ETO_OFR_TITLE'] = list[i].TITLE;
                                                    bls[i]['ETO_OFR_DESC'] = list[i].SMALLDESC;
                                                    bls[i]['OFFER_DATE'] = list[i].ETOOFRVERIFIEDDATE;
                                                    bls[i]['GLUSR_CITY'] = list[i].CITY;
                                                    bls[i]['GLUSR_STATE'] = list[i].STATE;
                                                    bls[i]['GLUSR_COUNTRY'] = list[i].COUNTRYNAME;
                                                    bls[i]['ENRICHMENTINFO'] = list[i]['ENRICHMENTINFO'];
                                                    bls[i]['ADDITIONALINFO'] = list[i].ADDITIONALINFO;
                                                    bls[i]['BLDATETIME'] = list[i]['BLDATETIME'];
                                                    bls[i]['DATE_TIME'] = list[i].LASTACTIONDATE + 'T' + list[i].LASTACTIONTIME;
                                                    bls[i]['GL_COUNTRY_FLAG'] = list[i].GL_COUNTRY_FLAG_SMALL;
                                                    bls[i]['BY_LEAD_TYPE'] = list[i].ETOOFRVERFIED;
                                                    bls[i]['ENRICHMENTINFO'] = list[i].ENRICHMENTINFO; // new ENRICHMENTINFO parameter
                                                    bls[i]['OFFER_FLAG'] = 'B';
                                                    bls[i]['ETO_ENQ_TYP'] = list[i].ETO_ENQ_TYP; //ETO_ENQ_TYP for search
                                                };
                                                if (bls.length == 0) {//rare case
                                                    initialState.buyleads = [];
                                                    initialState.hasMoreBuyleads = true;
                                                    initialState.isFetchingBuyleads = false;
                                                    initialState.listing_val = {};
                                                    initialState.errorBL = false;
                                                    initialState.blOfferError = false;
                                                    headInfo.link = "";
                                                    pageTitle = '<title>Page Not Found</title>';
                                                    metatags = '';
                                                    initialState.blCatError = true;
                                                    res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                                }
                                                else {
                                                    initialState.listing_val = [];
                                                    initialState.buyleads = bls;
                                                    initialState.isFetchingBuyleads = false;
                                                    initialState.hasMoreBuyleads = true;
                                                    initialState.errorBL = false;
                                                    initialState.blCatError = false;
                                                    initialState.blOfferError = false;
                                                    initialState.blstart = 11;
                                                    initialState.blend = 20;
                                                    initialState.crumbData = { Gname: SubcatBLs['CATALOG_LINKS']['GLCAT_ALLCAT_GRP_CTLSNME'], SGname: SubcatBLs['CATALOG_LINKS']['GLCAT_ALLCAT_DEFSHORTNAME'] };
                                                    res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                                                }
                                            }
                                        }
                                    });
                                    subcat_data_list.catch(function (error) {
                                        headInfo.link = "";
                                        pageTitle = '<title>Page Not Found</title>';
                                        metatags = '';
                                        initialState.blCatError = true;
                                        res.status(503).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                    });

                                }
                                else //Page 1
                                {
                                    request_options = {
                                        method: 'POST',
                                        url: 'http://' + servicebl + '/wservce/buyleads/category/',
                                        headers:
                                        {
                                            'cache-control': 'no-cache',
                                            'content-type': 'application/json'
                                        },
                                        form:
                                        {
                                            start: '1',
                                            end: '100',
                                            GRP: request_parts[2],
                                            modid: 'IMOB',
                                            token: 'imobile@15061981',
                                            trade_flag: 1
                                        }
                                    };
                                    let fetch_subcat_list = service_Data_Fetcher(request_options);
                                    //CHANGE META FOR NOT FOUND
                                    metatags = '<META NAME="DESCRIPTION" CONTENT="Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad"><META NAME="KEYWORDS" CONTENT="Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad">';
                                    link = '<link rel="canonical" href="https://trade.indiamart.com/"><link rel="alternate" media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/">';
                                    pageTitle = '<TITLE>Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad</TITLE>';
                                    headInfo.link = "https://trade.indiamart.com/";


                                    fetch_subcat_list.then(function (val) {
                                        if (typeof val == "number") {
                                            pageTitle = '<title>Page Not Found</title>';
                                            headInfo.link = "";
                                            metatags = '';
                                            initialState.blCatError = true;
                                            res.status(val).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                        }
                                        else {
                                            //Handling the Meta
                                            let groupData = JSON.parse(val);
                                            let get_meta_data = groupData;
                                            let meta_group_name = get_meta_data['TRADE_DETAILS']['PAGE_TITLE'][0]['GLMETA_DISTINCT_VAL'];
                                            get_meta_data = get_meta_data['TRADE_DETAILS']['META_DETAILS'];
                                            let desc_val = -1, kwrd_val = -1, titl_val = -1;
                                            for (let i = 0; i < get_meta_data.length; i++) //get the correct index from service data..for meta
                                            {
                                                if (get_meta_data[i]['FK_GLMETA_TYP_ID'] == 'DESC') { desc_val = i; }
                                                else if (get_meta_data[i]['FK_GLMETA_TYP_ID'] == 'KWRD') { kwrd_val = i; }
                                                else if (get_meta_data[i]['FK_GLMETA_TYP_ID'] == 'TITL') { titl_val = i; }
                                            }
                                            desc_val = desc_val == -1 ? '' : get_meta_data[desc_val]['GLMETA_DISTINCT_VAL'];
                                            kwrd_val = kwrd_val == -1 ? '' : get_meta_data[kwrd_val]['GLMETA_DISTINCT_VAL'];
                                            titl_val = titl_val == -1 ? '' : get_meta_data[titl_val]['GLMETA_DISTINCT_VAL'];

                                            metatags = '<meta name="description" content="' + desc_val + '"><meta name="keywords" content="' + kwrd_val + '">';
                                            link = '<link rel="canonical" href="https://trade.indiamart.com/offer/' + meta_group_name + '/"/><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/' + meta_group_name + '/">';
                                            pageTitle = '<title>' + titl_val + '</title>';
                                            headInfo.link = "https://trade.indiamart.com/offer/" + meta_group_name + "/";

                                            let id = "https://m.indiamart.com/bl/" + request_parts[2] + "/";
                                            let crumbsObj =
                                            {
                                                "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
                                                    {
                                                        "@type": "ListItem", "position": 1, "item":
                                                            { "@id": "https://m.indiamart.com/bl/", "name": "Buyleads" }
                                                    },
                                                    {
                                                        "@type": "ListItem", "position": 2, "item":
                                                            { "@id": id, "name": groupData['GROUP_NAME'] }
                                                    }]
                                            };
                                            headInfo.script = "<script type='application/ld+json'>" + JSON.stringify(crumbsObj) + "</script>"

                                            //-----Handling the Store
                                            initialState.buyleads = [];
                                            initialState.listing_val = JSON.parse(val);
                                            initialState.isFetchingBuyleads = false;
                                            initialState.hasMoreBuyleads = false;
                                            initialState.errorBL = false;
                                            initialState.blCatError = false;
                                            initialState.blOfferError = false;
                                            initialState.blstart = 10;

                                            res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                                        }
                                    });

                                    fetch_subcat_list.catch(function (error) {
                                        pageTitle = '<title>Page Not Found</title>';
                                        headInfo.link = "";
                                        metatags = '';
                                        initialState.blCatError = true;
                                        res.status(503).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                    });

                                }

                            }
                            else // Page 2 or Page 4
                            {
                                let the_parent_name = undefined;
                                request_options = {
                                    method: 'POST',
                                    url: 'http://' + servicebl + '/wservce/buyleads/group/',
                                    headers: {
                                        'cache-control': 'no-cache',
                                        'content-type': 'application/json'
                                    },
                                    form: {
                                        start: 1,
                                        end: 1,
                                        grpname: request_parts[2],
                                        modid: 'IMOB',
                                        token: 'imobile@15061981'
                                    }
                                };
                                let group_name_promise = service_Data_Fetcher(request_options);
                                group_name_promise.then(function (val) {
                                    if (typeof val == "number") {
                                        if (val == 410) {
                                            val = 404;
                                        }
                                        pageTitle = '<title>Page Not Found</title>';
                                        headInfo.link = "";
                                        metatags = '';
                                        initialState.blCatError = true;
                                        res.status(val).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                    }
                                    else //valid sub_grp_name needs redirection
                                    {
                                        val = JSON.parse(val);
                                        if (val['flname']) {
                                            the_parent_name = val['flname'];
                                            request_options = {
                                                method: 'POST',
                                                url: 'http://' + servicebl + '/wservce/buyleads/group/',
                                                headers: {
                                                    'cache-control': 'no-cache',
                                                    'content-type': 'application/json'
                                                },
                                                form: {
                                                    start: 1,
                                                    end: 10,
                                                    grpname: request_parts[2],
                                                    parentgrpname: the_parent_name,
                                                    trade_flag: 1,
                                                    modid: 'IMOB',
                                                    token: 'imobile@15061981'
                                                }
                                            };
                                            let subcat_data_list = service_Data_Fetcher(request_options);
                                            subcat_data_list.then(function (subcat_data_val) {
                                                if (typeof subcat_data_val == "number") // service failed to fetch data
                                                {
                                                    headInfo.link = "";
                                                    pageTitle = '<title>Page Not Found</title>';
                                                    metatags = '';
                                                    initialState.blCatError = true;
                                                    res.status(subcat_data_val).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                                }
                                                else {
                                                    let SubcatBLs = JSON.parse(subcat_data_val);
                                                    if (SubcatBLs.data == undefined)//service failed for some reason
                                                    {
                                                        initialState.buyleads = [];
                                                        initialState.hasMoreBuyleads = true;
                                                        initialState.isFetchingBuyleads = false;
                                                        initialState.listing_val = {};
                                                        initialState.errorBL = false;
                                                        initialState.blOfferError = false;
                                                        //404 -meta's need to be set
                                                        headInfo.link = "";
                                                        pageTitle = '<title>Page Not Found</title>';
                                                        metatags = '';
                                                        initialState.blCatError = true;
                                                        res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                                    }
                                                    else {
                                                        let meta_group_name = SubcatBLs['flname'];
                                                        let meta_sub_cat_name = SubcatBLs['CATALOG_LINKS']['GLCAT_ALLCAT_ETOFNME'];
                                                        let base_url = process.env.NODE_ENV_M != 'prod' ? 'https://' + process.env.NODE_ENV_M + '-m.indiamart.com' : 'https://m.indiamart.com';
                                                        res.redirect(301, base_url + '/bl/' + meta_group_name + '/' + meta_sub_cat_name + '/');
                                                    }
                                                }
                                            });
                                            subcat_data_list.catch(function (error) {
                                                headInfo.link = "";
                                                pageTitle = '<title>Page Not Found</title>';
                                                metatags = '';
                                                initialState.blCatError = true;
                                                res.status(503).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                            });
                                        }
                                        else //parent group name not found
                                        {
                                            initialState.buyleads = [];
                                            initialState.hasMoreBuyleads = true;
                                            initialState.isFetchingBuyleads = false;
                                            initialState.listing_val = {};
                                            initialState.errorBL = false;
                                            initialState.blOfferError = false;
                                            //404 -metas need to be set
                                            headInfo.link = "";
                                            pageTitle = '<title>Page Not Found</title>';
                                            metatags = '';
                                            initialState.blCatError = true;
                                            res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                        }
                                    }
                                });
                                group_name_promise.catch(function (error) {
                                    headInfo.link = "";
                                    pageTitle = '<title>Page Not Found</title>';
                                    metatags = '';
                                    initialState.blCatError = true;
                                    res.status(503).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, srchFrErr));
                                });
                            }
                        }
                        //  }
                    }
                    else if (req.path == '/bl/' || req.path == '/bl') {

                        if (req.query.msgreturn == 'Success' && (req.query.m_no || req.query.m_alt) && req.query.buyer_id && req.query.offerpopup)//bl mail purchase
                        {
                            var atob = require('atob');
                            let mailPurBLData = {
                                email: req.query.em ? req.query.em : '',
                                alt_email: req.query.em_alt ? req.query.em_alt : '',
                                mobNo: req.query.m_no ? req.query.m_no : '',
                                altMobNo: req.query.m_alt ? req.query.m_alt : '',
                                buyerId: req.query.buyer_id ? req.query.buyer_id : '',
                                cCode: req.query.c_code ? req.query.c_code : '',

                            }

                            for (let key in mailPurBLData) {
                                if (mailPurBLData[key] != '') {
                                    mailPurBLData[key] = atob(mailPurBLData[key]);
                                    mailPurBLData[key] = rc4(mailPurBLData[key]);
                                }
                            }
                            mailPurBLData['offerId'] = req.query.offerpopup;
                            initialState.mailPurBLData = mailPurBLData;
                        }
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;

                        metatags = '<META NAME="DESCRIPTION" CONTENT="Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad"><META NAME="KEYWORDS" CONTENT="Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad">';
                        link = '<link rel="canonical" href="https://trade.indiamart.com/"><link rel="alternate"  media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/">';
                        pageTitle = '<TITLE>Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad</TITLE>';
                        headInfo.link = "https://trade.indiamart.com/";
                        if (!req.cookies.ImeshVisitor && !req.cookies.v4iilex)
                            res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200, false));
                        else
                            res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                    }
                    else if (req.path == '/bl/search.php') {
                        // bl search
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;
                        metatags = '<META NAME="ROBOTS" CONTENT="NOINDEX, FOLLOW">';
                        link = '<link rel="canonical" href="https://trade.indiamart.com/buyersearch.mp?ss=' + req.query.s + '" /><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/search.php?s=' + req.query.s + '">';
                        pageTitle = '<title>' + req.query.s + ' buyers and buy requirement</title>';
                        headInfo.link = "https://trade.indiamart.com/buyersearch.mp?ss=" + req.query.s;
                        res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                    }
                    else if (req.path == '/bl/dir/' || req.path == '/bl/dir') {
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;
                        metatags = '<META NAME="DESCRIPTION" CONTENT="Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad"><META NAME="KEYWORDS" CONTENT="Buy Leads, Purchase Requirements & Buying Leads from Buyers in India and abroad">';
                        link = '<link rel="canonical" href="https://trade.indiamart.com/" /><link rel="alternate" media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/dir/">';
                        pageTitle = '<TITLE>BuyLeads Directory </TITLE>';
                        headInfo.link = "https://trade.indiamart.com/";
                        res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                    }
                    else if (req.path == '/bl/package.html/' || req.path == '/bl/package.html') {
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;
                        metatags = ''
                        link = ''
                        pageTitle = '<TITLE>IndiaMART Mobile Site - Buyleads</TITLE>';
                        headInfo.link = "https://trade.indiamart.com/";
                        res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                    }
                    else if (request_parts[3] && request_parts[3] == "state" && request_parts[4]) {
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;
                        let statelowercase = (request_parts[4]).toLowerCase();
                        if (!validStateName(statelowercase)) {
                            pageTitle = '<title>Page Not Found</title>';
                            metatags = '';
                            headInfo.link = "";
                            initialState.blOfferError = true;
                            res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                        }
                        else {
                            initialState.buyleads = [];
                            initialState.hasMoreBuyleads = true;
                            initialState.isFetchingBuyleads = false;
                            initialState.listing_val = {};
                            initialState.errorBL = false;
                            initialState.blCatError = false;
                            initialState.blOfferError = false;
                            initialState.expired = false;
                            let rawdata = JSON.parse(fs.readFileSync(getPath("statesMetadata.json"), 'utf8'));
                            metatags = '<META NAME="DESCRIPTION" CONTENT="' + rawdata[statelowercase].desc + '" /><meta name="keywords" content="' + rawdata[statelowercase].keyword + '"/><meta name="robots" content="index,follow" />';
                            link = '<link rel="canonical" href="https://tenders.indiamart.com/' + statelowercase + '/"><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/tenders/state/' + statelowercase + '/">';
                            pageTitle = '<TITLE>' + rawdata[statelowercase].title + '</TITLE>';
                            headInfo.link = "https://tenders.indiamart.com/" + statelowercase + "/";
                            res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200));
                        }
                    }
                    //authority
                    else if (request_parts[3] && request_parts[3] == "authority" && request_parts[4]) {
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;
                        let authoritylowercase = (request_parts[4]).toLowerCase();
                        if (!validAuthorityName(authoritylowercase)) {
                            pageTitle = '<title>Page Not Found</title>';
                            metatags = '';
                            headInfo.link = "";
                            initialState.blOfferError = true;
                            res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                        }
                        else {
                            initialState.buyleads = [];
                            initialState.hasMoreBuyleads = true;
                            initialState.isFetchingBuyleads = false;
                            initialState.listing_val = {};
                            initialState.errorBL = false;
                            initialState.blCatError = false;
                            initialState.blOfferError = false;
                            initialState.expired = false;
                            let rawdata = JSON.parse(fs.readFileSync(getPath("authorityMetadata.json"), 'utf8'));
                            metatags = '<META NAME="DESCRIPTION" CONTENT="' + rawdata[authoritylowercase].meta_desc + '" /><meta name="keywords" content="' + rawdata[authoritylowercase].meta_keyword + '"/><meta name="robots" content="index,follow" />';
                            link = '<link rel="canonical" href="https://tenders.indiamart.com/' + authoritylowercase + '/"><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/tenders/authority/' + authoritylowercase + '/">';
                            pageTitle = '<TITLE>' + rawdata[authoritylowercase].meta_title + '</TITLE>';
                            headInfo.link = "https://tenders.indiamart.com/" + authoritylowercase + "/";
                            res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200));
                        }
                    } // tender-notice
                    else if (request_parts[2] && request_parts[2] == "tender-notice" && request_parts[3]) {
                        var list;
                        let industryGrpId = { "gems-jewellery": 18, "handicrafts-gifts": 19, "leather": 22, "hand-tools": 25, "stones-marble": 26, "medical-pharma": 27, "furniture": 93, "commercial-office": 9, "computer-hardware": 10, "cosmetics-toiletries": 11, "electronic-goods": 13, "industrial-supplies": 14, "agro-farm": 16, "ores-metals": 29, "packaging-material": 30, "printing-publishing": 32, "plant-machinery": 34, "sports-goods": 36, "telecom-products": 37, "embassies-consulates": 66, "human-resource": 68, "hotels-resorts": 72, "travel-agents": 73, "home-supplies": 74, "merchant-exporters": 75, "musical-instruments": 76, "paper": 77, "packers-movers": 80, "fabrication": 81, "miscellaneous": 82, "astrology-service": 83, "facility-management": 85, "media-advertising": 49, "travel-tourism": 50, "research-development": 53, "business-facilitation": 55, "architectural-designing": 56, "property-real": 58, "education-training": 61, "medical-services": 94, "it-services": 95, "callcenter-bpo": 96, "rental-services": 97, "small-businesses": 98, "finance-law": 99, "fashion-accessories": 100, "home-garden": 101, "mechanical-components": 102, "apparel-garments": 3, "automobiles-spares": 5, "bicycles-rickshaws": 6, "builders-hardware": 7, "chemicals-fertilizers": 8, "ayurvedic-herbal": 84, "trade-promotion": 63, "textiles-yarn": 38, "scientific-instruments": 40, "rubber": 41, "plastic": 42, "transportation": 45, "home-furnishings": 46 };
                        let grpid = industryGrpId[request_parts[3]];
                        if (grpid > 0) {

                            let url = 'http://' + servicebl + '/wservce/tenders/group/?token=imobile1@15061981&modid=TDR&group_id=' + grpid;
                            //    let url='http://leads.imutils.com/wservce/tenders/group/?token=imobile1@15061981&modid=TDR&group_id='+grpid;
                            var options = {
                                method: 'GET',
                                url: url
                            };

                            request(options, function (error, response, body) {

                                if (error) {
                                    //  response.status(200).send({status:'failed'});    
                                    pageTitle = '<title>Page Not Found </title>';
                                    metatags = '';

                                    headInfo.link = "";
                                    initialState.blOfferError = true;
                                    res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                                } else {

                                    list = JSON.parse(body);
                                    //  if (response.CODE == 200) {
                                    // if (list.hasOwnProperty('DATA') && list.DATA.length) {
                                    var title = list.DATA.GrpMetaDetails[0]['glcat_grp_meta_title'];
                                    var kwrd = list.DATA.GrpMetaDetails[0]['glcat_grp_meta_kwrd'];
                                    var desc = list.DATA.GrpMetaDetails[0]['glcat_grp_meta_desc'];

                                    var authoritylowercase = request_parts[2] + "/" + request_parts[3];
                                    metatags = '<META NAME="DESCRIPTION" CONTENT="' + desc + '" /><meta name="keywords" content="' + kwrd + '"/><meta name="robots" content="index,follow" />';
                                    link = '<link rel="canonical" href="https://tenders.indiamart.com/' + authoritylowercase + '.html"><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/' + authoritylowercase + '/">';
                                    pageTitle = '<TITLE>' + title + '</TITLE>';
                                    headInfo.link = "https://tenders.indiamart.com/" + authoritylowercase + ".html";
                                    var bls = [];
                                    var stateList = {};
                                    list['DATA']['StateList'].map(function (item, i) {
                                        if (item && i < 11) {
                                            var stnm = item['tdr_subind_loc_state'];
                                            var stid = item['tdr_subind_loc_state_id'];
                                            stnm = stnm.replace(/ /ig, '-');
                                            stateList[stnm] = stid;
                                        }
                                    });


                                    if (list.DATA.hasOwnProperty('TenderList') && list['DATA']['TenderList'].length > 0) {
                                        list['DATA']['TenderList'].map(function (item, i) {
                                            // tenderdetail page
                                            if (item) {
                                                bls[i] = {};
                                                bls[i]['ETO_OFR_ID'] = item['tdr_subind_subtdr_id'];
                                                bls[i]['ETO_OFR_TITLE'] = item['tdr_subind_subtdr_short'];
                                                bls[i]['ETO_OFR_DESC'] = item['tdr_subind_details_new'];
                                                // bls[i]['ETO_OFR_TITLE'] =item['glcat_grp_meta_title']; 
                                                // bls[i]['ETO_OFR_DESC'] = item['glcat_grp_meta_desc'];
                                                bls[i]['BLDATETIME'] = item['BLDATETIME'];
                                                bls[i]['DATE_TIME'] = item['tdr_subind_im_arrival_date'];
                                                bls[i]['GLUSR_CITY'] = item['tdr_subind_loc_city'];
                                                bls[i]['ETO_OFR_QTY'] = item['tdr_subind_subtdr_qty'];// tdr_subind_subtdr_unit //tdr_subind_subtdr_unit
                                                bls[i]['GLUSR_STATE'] = item['tdr_subind_loc_state'];
                                                bls[i]['GLUSR_COUNTRY'] = item['tdr_subind_loc_country'];
                                                //  bls[i]['ISQDETAILS'] = item['isqdetails'];
                                                // bls[i]['GL_COUNTRY_FLAG'] = item['countryflag'];
                                                // bls[i]['BY_LEAD_TYPE'] = item['buyleadtype'];
                                                // bls[i]['TYPE'] = 'tender'; //item['datatype'];
                                                // bls[i]['ETO_ENQ_TYP'] = item['inquirytype'] //ETO_ENQ_TYP for search
                                                //  bls[i]['SHORTLISTED'] = item['SHORTLISTED'];
                                                //  bls[i]['SHORTLIST_STATUS'] = item['SHORTLIST_STATUS'];BLDATETIME
                                                //bls[i]['ETO_TDR_PUBLISH_DApensTE'] = item['tdr_subind_im_arrival_date'];

                                                //   bls[i]['ENRICHMENTINFO'] = '';
                                                bls[i]['FK_GLCAT_MCAT_ID'] = item['mcatid'] ? item['mcatid'][0] : '';

                                                //TENDER SPECIFIC
                                                bls[i]['OFFER_FLAG'] = 'T';
                                                bls[i]['tdrmcatnametext'] = item['tdr_subind_mcat_name'];
                                                bls[i]['tendervalue'] = item['tdr_subind_subtdr_tendervalue'];
                                                bls[i]['earnestmoney'] = item['tdr_subind_subtdr_earnest'];
                                                bls[i]['docfees'] = item['tdr_subind_subtdr_docfees'];
                                                bls[i]['salestartdate'] = item['tdr_subind_tdr_lastdate'];
                                                bls[i]['saleenddate'] = item['tdr_subind_appl_lastdate'];
                                                bls[i]['docsubmitlastdate'] = item['tdr_subind_appl_beforedate'];
                                                bls[i]['expirydate'] = item['tdr_subind_subtdr_open_date'];
                                                bls[i]['DATE_TIME'] = item['tdr_subind_subtdr_open_date'];
                                            }

                                        });
                                        initialState.buyleads = bls;
                                        initialState.blfilterSuggestions = { states: stateList, grpid: grpid };
                                        initialState.hasMoreBuyleads = false;
                                        initialState.success = 0;
                                        initialState.errorBL = false;
                                        initialState.blCatError = false;
                                        initialState.blOfferError = false;
                                        initialState.expired = false;

                                        res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', '', 200));



                                    }




                                    // }
                                    //  }  
                                }
                            });

                        } else {
                            pageTitle = '<title>Page Not Found </title>';
                            metatags = '';

                            headInfo.link = "";
                            initialState.blOfferError = true;
                            res.status(404).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''));
                        }



                    }



                    else if (request_parts[3] && (request_parts[3] == "state" || request_parts[3] == "authority" || request_parts[3] == "industry")) {
                        initialState.buyleads = [];
                        initialState.hasMoreBuyleads = true;
                        initialState.isFetchingBuyleads = false;
                        initialState.listing_val = {};
                        initialState.errorBL = false;
                        initialState.blCatError = false;
                        initialState.blOfferError = false;
                        initialState.expired = false;
                        if (request_parts[3] == "state") {
                            headInfo.link = "https://tenders.indiamart.com/states.html";
                            pageTitle = '<title>State Tenders, Indian State Tenders, State Government Tenders</title>';
                            metatags = '<meta name="description" CONTENT="Find out the latest Indian State Tenders List, State Government Tenders and State Development Tenders. Indiamart tenders provide information on Statewise Tenders, Multistate Tenders, and all State Tenders Notification in India."><meta name="keywords" content="State Tenders, Indian State Tenders, State Government Tenders, Statewise Tenders, Multistate Tenders, State Tenders Notice, Indian State Tenders Notification, State Development Tenders">';
                            link = '<link rel="canonical" href="https://tenders.indiamart.com/states.html"><link rel="alternate" media="only screen and (max-device-width: 640px)" href="https://m.indiamart.com/bl/tenders/state/">';
                        } else if (request_parts[3] == "authority") {
                            headInfo.link = "https://tenders.indiamart.com/authority.html";
                            pageTitle = '<title>Indian Companies Tenders, Authority Tenders, Company Tenders, Government Companies Tender</title>';
                            metatags = '<meta name="description" CONTENT="Get access of latest tenders for all Indian companies, government authority, private company and government companies at Tenders.Indiamart.com. Grab all private and government authorities tenders online."><meta name="keywords" content="Indian Companies Tenders, Authority Tenders, Company Tenders, Government Companies Tender, Authority Tenders, Private Companies Tenders, Government Authority Tenders">';
                            link = '<link rel="canonical" href="https://tenders.indiamart.com/authority.html" /><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/tenders/authority/">';
                        } else if (request_parts[3] == "industry") {
                            headInfo.link = "https://tenders.indiamart.com/industry.html";
                            pageTitle = '<title>Industry Tenders, Latest Industry Tenders, Tender Services, Indian Industrial Tenders Procurements</title>';
                            metatags = '<meta name="description" CONTENT="Get access to all tender services, latest industry tenders from India. Can also ask for free email alert services for all live industrial tenders, government industry, private industry and other industrial tender notices and procurements."><meta name="keywords" content="industrial tenders, tender services, indian industrial tenders, industry tenders, government industry tenders, industrial tenders, tenders from industries, online industry tenders, latest industry tenders, industrial tender notices, industrial procurements, latest industrial tenders, private industry tenders">';
                            link = '<link rel="canonical" href="https://tenders.indiamart.com/industry.html" /><link rel="alternate" media="only screen and (max-device-width: 640px)"  href="https://m.indiamart.com/bl/tenders/industry/">';
                        }
                        metatags += '<meta name="robots" content="index,follow" />';
                        res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''))
                    }

                    else {//saloni
                        pageTitle = '<title>IndiaMART Mobile Site</title> ';
                        metatags = '<meta name="robots" content="noindex,nofollow" />';
                        res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''))
                    }
                }
                else if (parsedUrl.pathname == '/') {
                    pageTitle = '<title>IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer</title>';
                    metatags = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="language" content="en"/><meta property="og:title" content="IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer" /><meta property="og:type" content="website" /><meta property="og:url" content="https://m.indiamart.com" /><meta property="og:site_name" content="IndiaMART" /><meta property="og:image" content="https://m.imimg.com/gifs/iml300.png" /><meta property="og:image:url" content="https://m.imimg.com/gifs/iml300.png" /><meta property="og:image:width" content="300" /><meta property="og:image:height" content="300" /><meta property="og:description" content="IndiaMART.com is India&#039;s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable &amp; transparent platform. Largest free online business directory &amp; yellow page with listing of 1,945,000 Indian &amp; International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters &amp; international buyers." ><meta name="description" content="IndiaMART.com is India\'s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable & transparent platform. Largest free online business directory & yellow page with listing of 1,945,000 Indian & International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters & international buyers.">';
                    link = '<link rel="canonical" href="https://www.indiamart.com/"><link rel="alternate" href="https://m.indiamart.com/" media="only screen and (max-width:640px)"><link rel="alternate" href="android-app://com.indiamart.m/https/m.indiamart.com/"><link rel="icon" sizes="192x192" href="https://m.imimg.com/gifs/im2-192.png"><link rel="apple-touch-icon" href="https://m.imimg.com/apple-touch-icon.png"><link rel="apple-touch-icon-precomposed" href="https://m.imimg.com/apple-touch-icon-precomposed.png">'
                    res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''))

                }
                else {

                    pageTitle = '<title>IndiaMART Mobile Site</title> ';
                    metatags = '<meta name="robots" content="noindex,nofollow" />';
                    res.status(200).send(renderFullPage(html, initialState, headInfo, head, pageTitle, metatags, link, '', '', ''))
                }
            }
        });
    }
}
function getPath(fileName = "version.json") {
    let env = ''
    if (process.env.NODE_ENV_M == 'dev') {
        env = 'dev'
    } else
        if (process.env.NODE_ENV_M == 'stg') {
            env = 'stg'
        } else {
            env = 'prod'
        }
    if (process.env.NODE_ENV_M != undefined)
        return `/home3/indiamart/public_html/${env}-mobile-im-pw/im-lite/server/` + fileName;
    else
        return __dirname + '/' + fileName;
}

function service_Data_Fetcher(options) {
    var b_fetcher = new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) { reject('SERVICE CONNECT FAILED'); }
            else if (response.statusCode == 200) {
                resolve(body);
            }
            else {
                resolve(response.statusCode);
            }
        })
    });
    return b_fetcher;
}
function renderFullPage(component, initialState, headInfo, head, pageTitle, metatags, link, meta_desc, meta_keywords, stateData, SSCode = 200, showBlSearch = true) {
    if (!showBlSearch) {
        headInfo.ht = "ht40";
        headInfo.mt = '';
        headInfo.srchBx = '';
    }
    return `<!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  ${pageTitle ? pageTitle : ''}
  ${metatags ? metatags : ''}
  ${link ? link : ''}
  ${meta_desc ? meta_desc : ''}
  ${meta_keywords ? meta_keywords : ''}
  ${process.env.NODE_ENV_M ? '<link rel="manifest" href="/manifest.json">' : ''}
  <link rel="preconnect" href="https://m.imimg.com/" crossorigin > 
  <link rel="preconnect" href="https://utils.imimg.com/" crossorigin > 
  <link rel="preconnect" href="https://1.imimg.com/" crossorigin > 
  <link rel="preconnect" href="https://2.imimg.com/" crossorigin >
  <link rel="preconnect" href="https://3.imimg.com/" crossorigin > 
  <link rel="preconnect" href="https://4.imimg.com/" crossorigin >
  <link rel="preconnect" href="https://5.imimg.com/" crossorigin > 
  <link rel="preconnect" href="https://ajax.googleapis.com/" crossorigin >   
  <link rel="preconnect" href="https://www.googletagmanager.com/" crossorigin >
  <link rel="preconnect" href="https://suggest.imimg.com/" crossorigin >
  <link rel="preconnect" href="https://mc.yandex.ru" crossorigin >
  <link rel="preconnect" href="https://recommended.imutils.com" crossorigin >
  <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossorigin >
  <link rel="preconnect" href="https://www.google-analytics.com" crossorigin >
  <link rel="preconnect" href="https://adservice.google.co.in" crossorigin >
  ${headInfo.script ? headInfo.script : ''}
  <script>
  var loader_diff = '';
  if(${headInfo.pathname == 'home'}) {
    loader_diff = 'home';
  }
  if(${headInfo.pathname == 'isearch'}) {
    function in_time(){
      window.searchInitialLoad=Date.now();
      }
      in_time();
}

  var deferredPromptA2hs;
  (function(){   
    window.addEventListener('beforeinstallprompt', function(event) {               
        event.preventDefault();
        var now = new Date();
        var timeout = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
        if(localStorage.a2hsInstallTime){
            if(now.getTime() - localStorage.a2hsInstallTime >= timeout){
              deferredPromptA2hs = event;
              a2Prompt = event;
              if(document.getElementById("a2hsbt")){document.getElementById("a2hsbt").style.display="inline-block";} 
            }
        } else {
          localStorage.a2hsInstallTime = now.getTime() - timeout;  
          deferredPromptA2hs = event;
          a2Prompt = event;
          if(document.getElementById("a2hsbt")){document.getElementById("a2hsbt").style.display="inline-block";}
        }
      });
  })();
  </script>
  <meta name="theme-color" content="#00a699">
    <style>
     .dn{display:none}.clr33{color:#333}
     .bl_card{margin:10px 12px;border-radius: 6px;box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);}
     .pf{position:fixed}
    .offlinepop{box-sizing: border-box;box-shadow: 0 2px 4px 0 #000;bottom: 45px;left: 0px;width: 100%;font-size: 14px;padding: 0 10px;transform: translateY(100%);z-index: 1000;background: #323232;color: #f1f1f1;}
    .slownetpop{box-sizing: border-box;box-shadow: 0 2px 4px 0 #000;bottom: 45px;left: 0px;width: 100%;font-size: 14px;padding: 0 10px;transform: translateY(100%);z-index: 1000;background: #323232;color: #f1f1f1;}      
    .pd15{padding:15px}
    .dtc{display:table-cell}
    .vim{vertical-align:middle}
    .ldWrp{padding: 20px 15px;border-bottom: 1px solid #f6f6f6;}
    .pwNsh .srchIp{padding: 10px 36px 10px 45px}.pwNsh .pwSrch{left:15px;}

  @-webkit-keyframes ldAn { 0% { background-position: -468px 0 } to { background-position: 468px 0 }}
  @keyframes ldAn { 0% { background-position: -468px 0 } to { background-position: 468px 0 }}
  .ldAni {height: 100%;-webkit-animation: ldAn 1.5s linear infinite forwards;animation: ldAn 1.5s linear infinite forwards;background: no-repeat #f1f1f1;background-image: -webkit-linear-gradient(left, #f1f1f1 0, #e1e1e1 20%, #f1f1f1 40%, #f1f1f1 100%);background-size: 800px 104px}.ldLsm{position: relative;padding: 18px 0 0 120px}.ldLs{width:90px;height:70px;position: absolute;top: 0; left: 0;}.ldStp{height: 7px;margin-bottom: 15px;width: 100%}.lds1{width: 100px}.ldcr{text-align: center;padding-top: 10px;}.ldcr:after{content:"";visibility:hidden;display:block;height:0;clear:both}.ldBt{height: 25px;display: inline-block;width: 40%}.ldBt1{border-radius: 20px 0 0px 20px;margin-right: 5px}.ldBt2{border-radius:0 20px 20px 0;margin-left: 5px}*{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}
  #logoSrch.logoSrch{display: block}
  #langDrpdwn { height: 20px;background: #00a699;color: white;-webkit-appearance: none;appearance: none;}
  .switch input{display:none}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;-webkit-transition:.4s;transition:.4s}.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider{background-color:#2196F3}input:focus+.slider{box-shadow:0 0 1px #2196F3}input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}
   body{font-family:Arial,Helvetica,sans-serif;color:#333;font-size:14px;-webkit-text-size-adjust:none;text-size-adjust:none;vertical-align:middle}a,a:focus,a:active,a:hover{text-decoration:none}.header_my{background:#00a699;color:#fff;height:47px;width:100%;z-index:99;top:0;left:0}.pf{position:fixed}.mt88{margin-top:88px;}.mt47{margin-top: 47px;}.ht88{height:88px;}.ht47{height: 47px;}.logoSpan{background-position:-253px 5px;display:inline-block;float:left;height:37px;margin-left:50px!important;width:32px}.fleft {float: left;min-width: 10px;  max-width: 65%;clear: right;}.mt140{margin-top : 140px}.pro-heading-my{display:inline-block;font-size:14px;padding:14px 10px 0;text-align:left}.logo{width:160px;height:47px;background-repeat:no-repeat;display:block}.homepage .logo{background-position:-25px -1px;display:inline-block;height:25px;position:relative;width:31px;margin-top: 8px;text-indent:-9999px;background-size:auto;}.Menu_icon{background-position:0 2px;cursor:pointer;display:block;height:21px;left:15px;position:fixed;top:12px;width:23px;z-index: 100}.Menu_icon_home{background-position:0 2px;cursor:pointer;display:block;height:21px;left:15px;position:absolute;top:12px;width:23px;z-index: 100}.mt47{margin-top: 47px}.srchIp{width: 100%;height: 34px;padding:10px 35px 10px 10px;box-sizing: border-box;border:none;border-radius: 4px}.pd10{padding:10px}.crx:after{content:"";visibility:hidden;display:block;height:0;clear:both}.pwSrch{background-color:transparent;background-position: -73px -2px;height: 25px;top: 15px;width: 31px;right: 12px;font-size:0px;position:absolute;border:0}.m3{margin-left:3px;}.db{display:block;}.pdt10{padding-top:10px}.pdb10{padding-bottom:10px}.tc{text-align:center}.dib{display:inline-block}.clr7B{color:#7b7b7b}.brdR7b{border-right:1px solid #7b7b7b}.pdl7{padding-left:7px}.pdr7{padding-right:7px}.mt10{margin-top:10px}.ml10{margin-left:10px}.mr10{margin-right:10px}.bxrd4{border-radius:4px}.bgBlue{background-color: #2e3192}.fs15{font-size:15px}.clrff{color:#fff}.fw{font-weight:700}.pd10{padding:10px}.vam{vertical-align:middle}.ico21_30{width:30px;height:21px} i.apdIco{width: 22px;height: 30px;background-position: -56px 0px;margin-right:5px}.ffA{font-family: Arial}.ma {margin-left:auto;margin-right:auto}.loader{border:4px solid #f3f3f3;border-radius:50%;border-top:4px solid #00a699;width:40px;height:40px;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.mh400{min-height:400px}.h400{height:400px}.dtc{display:table-cell}.dt{display:table}.ma{margin-left:auto;margin-right:auto}.w100{width:100%}.brT{border-top:1px solid #ccc}.pr{position:relative}.crb{clear:both}.logoSrch{width:108px;height:22px;background-size:100%;background-position:0 0;margin:10px 0 5px 50px;float:left;display:none;}.w42 {width: 42%;}.ldmsg{width: 50px;height: 50px;position: absolute;top: 0;left: 0;border-radius: 100%;}.ldmsgb{position: relative;padding: 2px 80px 0 70px;}.ldmsgCta{right: -2px;top: 0px;position: absolute}.ldmsgw50{width: 50px}.ldMsgP{width: 35px;height: 35px;margin-left: 7px;}.align{right : 16px; top : 17px}.vSh1{fill:#00a699;opacity:0.81;}.vSh2{fill:#d71920;}


  .bgw{background-color:#fff}
  .bgef{background-color:#eeeeef}.w20{width:20%;}.w40{width:40%;}.w50{width:50%;}.w60{width:60%;}.fr{float:right;}.fl{float:left}.crx:after{content:"";visibility:hidden;display:block;height:0;clear:both}.ma{margin-left:auto;margin-right:auto;}
  .linearRect1{height: 14px;border-radius: 14px;background-color: #f5f5f5;}.linearRect2{height:14px;border-radius:14px}.ffold1{background-color:#fff;margin-bottom:15px;padding-left:10px;padding-top:11px;padding-bottom:15px}.linearRect1{background-color:#f5f5f5}.linearRect2{background-color:#f5f5f5;margin-top:5px}.horizontal1,.horizontal2{height:136px;background-color:#f5f5f5}.horizontal1{border-radius:10px}.horizontal2{border-radius:10px 0 0 10px}.w14{width:14%}.ffold2{height:168px;background-color:#fff}.linearRect4,.linearRect5{height:14px;border-radius:14px}.linearRect4,.linearRect5,.linearRect6,.linearRect9{background-color:#f5f5f5}.linearRect4{margin:20px 57px 9px 58px}.linearRect6{margin-Top:40px;height:38px;border-radius:25px}.lFold,.linearRect7,.linearRect8{background-color:#fff;border-radius:14px}.m3lr{margin-left:3%;margin-right:3%}.linearRect7{width:90%;height:14px}.listingloader{margin-top:32px;margin-bottom:14px;margin-right:14px}.linearRect8{height:14px;margin-top:5px}.linearRect10,.linearRect9{margin-top:23px}.lFold{height:207px}.linearRect9{height:102px;margin-left:11px}.linearRect10,.linearRect11{height:14px;border-radius:14px;background-color:#f5f5f5}.w70{width:70%}.mt14{margin-top:14px}.mt11{margin-top:11px}.mt21{margin-top:21px}.btn1_layout{height:39px;border-radius:26px;background-color:#f5f5f5;margin-left:11px}.mt32{margin-top:32px}.ldAni_home{-webkit-animation:ldAn 1.5s linear infinite forwards;animation:ldAn 1.5s linear infinite forwards;background:no-repeat #f1f1f1;background-image:-webkit-linear-gradient(left,#f1f1f1 0,#e1e1e1 20%,#f1f1f1 40%,#f1f1f1 100%);background-size:800px 134px}.bxrd10{border-radius:10px}.bdrG{border-bottom:1px solid #63c7ba}.bggrey{background-color:#f5f5f5}.ml15{margin-left:15px}
  .loader1{position:absolute;top:50%;left:40%;margin-left:10%;transform:translate3d(-50%,-50%,0)}.dot{width:10px;height:10px;background:#3ac;border-radius:100%;display:inline-block;animation:slide 1s infinite}
  .dot:nth-child(1){animation-delay:.1s;background:#00a699}.dot:nth-child(2){animation-delay:.2s;background:#009589}.dot:nth-child(3){animation-delay:.3s;background:#00847a}.dot:nth-child(4){animation-delay:.4s;background:#19aea3}.dot:nth-child(5){animation-delay:.5s;background:#32b7ad}@-moz-keyframes slide{0%,100%{transform:scale(1)}50%{opacity:.3;transform:scale(2)}}@-webkit-keyframes slide{0%,100%{transform:scale(1)}50%{opacity:.3;transform:scale(2)}}@-o-keyframes slide{0%,100%{transform:scale(1)}50%{opacity:.3;transform:scale(2)}}@keyframes slide{0%,100%{transform:scale(1)}50%{opacity:.3;transform:scale(2)}}
  .bgw{background-color:#fff} .dn{display:none;}
  .bgef{background-color:#eeeeef}.pwaHome{background:url("https://m.imimg.com/gifs/img/pwaHome.png") no-repeat center center;width:139px;height:84px}
  .clrDrkB { color: #0e3192;}
  .fs18{font-size:18px;} .rt0{right:0} .bt0{bottom:0} .tp0{top:0} .lft0{left:0} .mAuto{margin:auto} .ht250{height:250px} .poa{position:absolute} .por{position:relative}
  .loaderHome{border: 4px solid #f3f3f3;border-radius: 50%;border-top: 4px solid #00a699;width: 100px;height: 100px;
    animation: spin 1s linear infinite;-moz-animation: spin 1s linear infinite;-ms-animation: spin 1s linear infinite;-webkit-animation: spin 1s linear infinite;animation: spin 1s linear infinite;margin-right: -125px;margin-bottom: 25px;}
    
    

      #menu_icon .Menu_icon.tbSp{background-image:url("https://m.imimg.com/gifs/img/white-menu.svg");background-position: center center;height: 16px;}
      .condn-col1 path{fill: #2e3192;}
    </style>
  
    </head>
<body>
<div class="App">
</div>
     <div id="offline_pop" class=" dn pf offlinepop"><table width="100%"><tbody><tr><td class="pd15"><span id="offline_span" class="dtc vam">You seem to be 'Offline'</span></td></tr></tbody></table></div>
     <div id="slow_net_pop" class=" dn pf slownetpop"><table width="100%"><tbody><tr><td class="pd15"><span id="slow_net_span" class="dtc vam">It seems you are on a Slow Network</span></td></tr></tbody></table></div>     
     <input type="hidden" name="iso_code" id="iso_code" value="91"></input>
     <input type="hidden" id="country" value="India"></input>
      <div id="im-header" class="header_my crx pf homepage ${headInfo.ht}">
      <input type="hidden" id="page_name" value="search">
        ${(headInfo.pathname == 'isearch') ?
            '<a href="https://m.indiamart.com/" class="ico-hf logoSrch" id="logoSrch"></a><span class="logoSpan fleft dn" id="imLogo"><a class="logo tbSp" href="/" onClick=visitDesktop("Mobile");>IndiaMART</a></span><span id="head-title" class="pro-heading-my dn">' + headInfo.title + '</span>' :

            ((headInfo.pathname.indexOf('messagescontactdetail') > -1) || (headInfo.pathname.indexOf('messagesconversation') > -1)) ?
                '<span class="logoSpan fleft dn" id="imLogo"><a class="logo tbSp" href="/" onClick=visitDesktop("Mobile");>IndiaMART</a></span><span id="head-title" class="pro-heading-my dn">' + headInfo.title + '</span>' :

                (headInfo.pathname.indexOf('messages') > -1) ?
                    '<span class="logoSpan fleft" id="imLogo"><a class="logo tbSp" href="/" onClick=visitDesktop("Mobile");>IndiaMART</a></span><span id="head-title" class="pro-heading-my">' + headInfo.title + '</span>' :

                    (headInfo.pathname.indexOf('product') > -1) ?
                        '<span class="logoSpan fleft" id="imLogo"><a class="logo tbSp" href="/" onClick=visitDesktop("Mobile");>IndiaMART</a></span><span id="head-title" class="pro-heading-my">' + headInfo.title + '</span>' :



                        (headInfo.pathname.indexOf('messagescontactdetail') < 0) && (headInfo.pathname.indexOf('messagesconversation') < 0) && (headInfo.pathname.indexOf('messages') < 0) && headInfo.pathname !== "isearch" ?
                            '<a href="/" onClick=visitDesktop("Mobile") class="ico-hf logoSrch" id="logoSrch"></a>' : ''} 
                        ${headInfo.svg ? ('<span id="svg" class="profileIcon">' + headInfo.svg + '</span>') : ''}              
      ${headInfo.srchBx}
    </div>
     ${showBlSearch ? '<div id="root" class=' + headInfo.mt + '></div>' : '<div id="root" style="margin-top:40px"></div>'}
    <div id="gblLoader">${headInfo.loader}</div>
   
</div></div>     
${headInfo.pathname != 'enqdetail' && headInfo.pathname != 'isearch' && headInfo.pathname != 'home' && (headInfo.pathname.indexOf('messages') < 0) && headInfo.pathname != 'seller' && headInfo.pathname != 'bl' ?
            '<div id="imFooter" class="db pdb10 pdt10 tc brT"><a href="https://m.indiamart.com/" id="dskTop" onClick=visitDesktop("Mobile");  class="dib clr7B brdR7b pdl7 pdr7">Home</a> <a id="dskLink" href="' + headInfo.link + '" class="dib clr7B pdl7 pdr7" onClick=visitDesktop("Desktop");>Desktop Site</a>  <div class="mt10 ml10 mr10"><a class="bxrd4 bgBlue db footerbanner" onClick=bannerDeepLinking("Footer-Banner-New","",window.location.href)><span class="fs15 clrff fw pd10 dib ffA"><i class="tbSp dib vam ico21_30 apdIco"></i>Open in App</span></a>  </div></div>'
            : headInfo.pathname == 'isearch' ?

                '<footer id="imFooter" class="crb tc fs12 bgw pd10 mt10 "><div class="bgBlu clrw fs15 fw tc pd6 bxrd4 bxsdw footerbanner" onClick=bannerDeepLinking("Footer-Banner-New","",window.location.href)><i class="tbSp dib vam ico21_30 apdIco"></i>Open in App</div><div id="payxfooter" class="db"><a href="https://paywith.indiamart.com?bannerid=Mfooter" class="db fs15 clrBl bdrBlu bxrd4 pd6 mt10 lh18 bxsdw" onclick="gaTrck_pwa(\'Footer-Clicks\', \'Pay-With-IndiaMART-Link\',\'' + headInfo.pathname + '\')"><svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 27 33" width="24" height="24"><path fill="#5360bc" d="M26.47,8.74c0-.86,0-1.68,0-2.47a1.11,1.11,0,0,0-1.09-1.12A14.69,14.69,0,0,1,14.25.82a1,1,0,0,0-1.51,0A14.65,14.65,0,0,1,1.65,5.15,1.11,1.11,0,0,0,.56,6.27c0,.79,0,1.61,0,2.47-.14,8-.35,19,12.61,23.7a1.13,1.13,0,0,0,.36.06,1,1,0,0,0,.35-.06c13-4.65,12.76-15.66,12.62-23.7Zm-13,21.45C2.38,26,2.55,16.87,2.7,8.78c0-.48,0-.95,0-1.41A16.38,16.38,0,0,0,13.5,3.14,16.38,16.38,0,0,0,24.28,7.37c0,.46,0,.93,0,1.41.15,8.08.32,17.23-10.8,21.41Zm0,0"></path><path fill="#5360bc" d="M17.23,12.61,12,18l-2.23-2.3a1.05,1.05,0,0,0-1.53,0,1.15,1.15,0,0,0,0,1.58l3,3.1a1,1,0,0,0,.76.33,1.06,1.06,0,0,0,.77-.33l6-6.2a1.15,1.15,0,0,0,0-1.58,1.05,1.05,0,0,0-1.53,0Zm0,0"></path></svg><strong style="display: inline-block;position: relative;top: -6px;"> Pay With IndiaMART</strong></a></div><br><a class="dib clr7B brdR7b pdl7 pdr7 dn" href="https://m.indiamart.com" id="home_url" >Home</a><a href="https://corporate.indiamart.com/about-us/" onclick="gaTrck_pwa(\'Footer-Clicks\', \'About-Us\',\'' + headInfo.pathname + '\')" class="dib clr7B brdR7b pdl7 pdr7" id="about_url"> About Us </a><a href="https://help.indiamart.com"  onclick="gaTrck_pwa(\'Footer-Clicks\', \'Customer-Care\',\'' + headInfo.pathname + '\')" class="dib clr7B pdl7 pdr7" id="cc_url">Customer Care</a><a class="dib clr7B brdL7b pdl7 pdr7" href="' + headInfo.link + '" rel="nofollow" onclick="gaTrck_pwa(\'Footer-Clicks\', \'Desktop-Site\',\'' + headInfo.pathname + '\')" id="desktop_url" >Desktop Site</a><div class="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank"  class="ml10 dib" onclick="gaTrck_pwa(\'Footer-Clicks\', \'Facebook\',\'' + headInfo.pathname + '\')"><i class="ico-hf dib fbIco"></i></a><a href="https://twitter.com/IndiaMART" target="_blank"  class="dib" onclick="gaTrck_pwa(\'Footer-Clicks\', \'Twitter\',\'' + headInfo.pathname + '\')"><i class="ico-hf dib twIco"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" target="_blank" onclick="gaTrck_pwa(\'Footer-Clicks\', \'Linkedin\',\'' + headInfo.pathname + '\')" class="dib"><i class="ico-hf dib linkInIco"></i></a></div><div class="pdt10 fs12 tc"><div class="dib tc"><div class="dib fw clrBl_ios" onClick="onclick="gaTrck_pwa(\'Footer-Clicks\', \'Call\',\'' + headInfo.pathname + '\')";window.location=' + "'tel:9696969696'" + '"><span class="ico-hf hw15 dib phIco"></span><span class="tun dib">096-9696-9696</span></div></div><p class="copirightText clr7B cp-rt dib ml286">&#169;1996-' + (new Date).getFullYear() + ' IndiaMART.com</p></div></footer>' :

                headInfo.pathname == 'home' ?
                    `<footer class="dn">
            <a href="https://corporate.indiamart.com"> About Us </a>
            <a href="https://help.indiamart.com">Customer Care</a>
            <a id="dskTop" href="/desktopredirect/?url=https://www.indiamart.com">Desktop Site</a>
            <div ><a href="https://www.facebook.com/IndiaMART" target="_blank" rel="noopener" ></a>
            <a href="https://twitter.com/IndiaMART" target="_blank" rel="noopener" ></a>
            <a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" target="_blank" rel="noopener"></a>
            </div>
            <div>
            <div>
            <div onClick="window.location='tel:9696969696'"><span></span><span>096-9696-9696</span></div>
            </div>
            <p>&#169;1996-2019 IndiaMART.com</p>
            </div>
            </footer>`:
                    headInfo.pathname == 'bl' && headInfo.link && headInfo.link != '' ?
                        '<footer id="blFooter" class="crb tc fs12 bgw mt10 "><footer class="crb tc fs12 bgw "><a href="https://corporate.indiamart.com"  class="dib clr7B brdR7b pdl7 pdr7"> About Us </a><a href="https://help.indiamart.com"  class="dib clr7B pdl7 pdr7">Customer Care</a><a class="dib clr7B brdL7b pdl7 pdr7" id="dskTop" href="/desktopredirect/?url=' + headInfo.link + '">Desktop Site</a><div class="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank"  class="ml10 dib"><i class="ico-hf dib fbIco"></i></a><a href="https://twitter.com/IndiaMART" target="_blank"  class="dib"><i class="ico-hf dib twIco"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" target="_blank"  class="dib"><i class="ico-hf dib linkInIco"></i></a></div><div class="pdt10 fs12 tc"><div class="dib tc"><div class="dib fw" onClick="window.location=' + "'tel:9696969696'" + '"><svg id="phoneSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="11px" height="11px" class="condn-col1" viewBox="0 0 348.077 348.077" style="enable-background:new 0 0 348.077 348.077;" xml:space="preserve"><path d="M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257 c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02 C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029 C350.631,303.527,350.95,285.795,340.273,275.083z"/></svg><span class="tun ml5 mr5" id="phoneDig">096-9696-9696</span></div></div><p class="copirightText clr7B cp-rt dib ml286">&#169;1996-' + (new Date).getFullYear() + ' IndiaMART.com</p></div></footer>'
                        :
                        headInfo.pathname.indexOf('seller') > -1 || headInfo.pathname.indexOf('messages') > -1 ? '' :
                            '<footer id="blFooter" class="crb tc fs12 bgw mt10 "><footer class="crb tc fs12 bgw "><a href="https://corporate.indiamart.com"  class="dib clr7B brdR7b pdl7 pdr7"> About Us </a><a href="https://help.indiamart.com"  class="dib clr7B pdl7 pdr7">Customer Care</a><div class="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank"  class="ml10 dib"><i class="ico-hf dib fbIco"></i></a><a href="https://twitter.com/IndiaMART" target="_blank"  class="dib"><i class="ico-hf dib twIco"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" target="_blank"  class="dib"><i class="ico-hf dib linkInIco"></i></a></div><div class="pdt10 fs12 tc"><div class="dib tc"><div class="dib fw" onClick="window.location=' + "'tel:9696969696'" + '"><svg id="phoneSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="11px" height="11px" class="condn-col1" viewBox="0 0 348.077 348.077" style="enable-background:new 0 0 348.077 348.077;" xml:space="preserve"><path d="M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257 c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02 C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029 C350.631,303.527,350.95,285.795,340.273,275.083z"/></svg><span class="tun ml5 mr5" id="phoneDig">096-9696-9696</span></div></div><p class="copirightText clr7B cp-rt dib ml286">&#169;1996-' + (new Date).getFullYear() + ' IndiaMART.com</p></div></footer>'
        }
 </div>
<div class="mbg bdZ" id="mbgn_askpopup" onclick="ctc_pbr_overlay('im_popup', 'mbgn_popup');" style="display:none;">
          <div id="im_popup" style="width: 363px; top: 2226.67px; position: absolute; left: 0px; right: 0px; z-index: 999; margin: 0px auto;"></div>
          <div id="askno_popup" style="width: 335px; position: absolute; left: 0px; right: 0px; z-index: 900; margin: 0px auto;"></div>
</div>
<script>
     window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
function attachAppJS(url)
{
  rngAppVrsn = url;
  var main_min = document.createElement('script');
  main_min.async = true;
  main_min.src = url;
  document.getElementsByTagName('body')[0].appendChild(main_min);
}
function handleAppJS() {
    if (localStorage && localStorage.getItem('allVersions')) {
        var vrsnData = JSON.parse(localStorage.getItem('allVersions'));
        if (vrsnData.forceUp && vrsnData.forceUp < Number(${process.env.forceUp})) {
            localStorage.removeItem('allVersions')
        }
    }
    setAppJS()
}
function setAppJS()
{
    var baseMnMin = ('${mnMinbase}'=='local')?'':'${mnMinbase}';
    var appVerUrl = baseMnMin+'/pwagifs/main-min_${version.main_min}.js';
    if(localStorage && !localStorage.getItem('allVersions'))
    {
        attachAppJS(appVerUrl);
        var defJsObj = {'main_min':appVerUrl,'forceUp':${version.forceUp}};
        localStorage.setItem('allVersions',JSON.stringify(defJsObj));
    }
    else if(localStorage && localStorage.getItem('allVersions'))
    {
        attachAppJS(JSON.parse(localStorage.getItem('allVersions'))['main_min']);
    }
    else
    {
        attachAppJS(appVerUrl)
    }
    (baseMnMin=='' || !localStorage)?'':versionUpdater();


}
function versionUpdater()
{
    if(Object.keys(JSON.parse(localStorage.getItem('allVersions'))).length==1 && JSON.parse(localStorage.getItem('allVersions'))['main_min'])
    {
        updateVersion();
    }
    else
    { 
        var curTime = Math.floor(new Date().getTime()/1000);
        var verData = JSON.parse(localStorage.getItem('allVersions'))
        strdTime = verData['strdTime'],
        timeDiff = Number(verData['reloadTime']);
        if((curTime-strdTime)>=timeDiff)//exceeds reload time
        {
        updateVersion();
        }
    }
 }

function updateVersion()
{
    var getTheVersion = new XMLHttpRequest();
    getTheVersion.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
    var ver = JSON.parse(this.response);
    var sec = Math.floor(new Date().getTime()/1000);
    ver['strdTime']=sec;
    localStorage.setItem('allVersions',JSON.stringify(ver));
    }
  };
  getTheVersion.open("GET","${fetchVerUrl}", true);
  getTheVersion.send();
}



function appendImgSprite()
{	    
    var sheet = document.styleSheets[0];
    sheet.insertRule(".ico-hf{background-image:url(https://m.imimg.com/gifs/img/HFsprite_v010.png);background-repeat:no-repeat}");
    sheet.insertRule(".tbSp{background-image:url(https://m.imimg.com/im-lite/pwa-HS.png);background-repeat:no-repeat}");
  
}
function SWListen()
{
    var isBot = (/googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent));
    if ('serviceWorker' in navigator && !isBot) {
       navigator.serviceWorker.addEventListener('message', function(event){
           try
           {
               var crntAppVer=event.data.main_min;
               if(localStorage && localStorage.getItem('allVersions'))
               {
               var verUrls='',lsVerUrl='';
               verUrls = JSON.parse(localStorage.getItem('allVersions'));
               lsVerUrl = verUrls['main_min'];
               if(crntAppVer.localeCompare(lsVerUrl)!=0)
               {
               verUrls['main_min'] = crntAppVer;
               localStorage.setItem('allVersions',JSON.stringify(verUrls));
               }
               }
           }
           catch(error)
           {}
         });
      }
}

   if(document.cookie && document.cookie.indexOf('adminiil') > -1 ){
                 var data = '';
                  var d = new Date();
                  d=d-3600;
                  document.cookie = "v4iilex=;expires=" +d+";path=/";
                  document.cookie = "adminiil=;expires=" +d +";path=/";
                  document.cookie = "ImeshVisitor=;expires=" +d +";path=/";
                  document.cookie.split(";").forEach(function(c) {document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;domain=.indiamart.com"); });
          }
          function getImCookie(o) {
              
o.name;
var l, p = !1, e = new Array;
e = document.cookie.split(";");
for (var m = 0; m < e.length; m++) {
    var n = e[m];
    if (n.replace(/^\s+|\s+$/g, "").split("=")[0].trim() == o.name) {
        var a = (n = unescape(n)).indexOf(o.name + "=");
        
        switch (l = a > -1 ? n.substring(o.name.length + 1 + 1) : "",
        o.flag) {
        case 0:
            a > -1 && (p = !0);
            break;
        case 1:
            p = -1 != a && splitWithPipe(l);
            break;
        case 2:
            p = o.keyValue ? splitWithPipe(l)[o.keyValue] : splitWithPipe(l);
            break;
        default:
            p = splitWithPipe(l)
        }
    }
}
return p
}
function splitWithPipe(e) {
  var a = new Array;
  a = e.replace(new RegExp("\\\\+","g"), " ").split("|");
  var g = {};
  for (i = 0; i < a.length; i++) {
      if (1 == a.length) {
          return a[0]
      }
      var h = a[i];
      g[h.split("=")[0]] = h.split("=")[1]
  }
  return g
  }
function gaTrck_pwa(c, d, b) {
      imgtm.push({
          event: "IMEvent-NI",
          eventCategory: c,
          eventAction: d,
          eventLabel: b,
          eventValue: 0
      })
}
function new_script(src) {
return new Promise(function(resolve, reject){
  var script = document.createElement('script');
  script.src = src;
  script.crossorigin = "anonymous";
  script.addEventListener('load', function () {
    resolve();
  });
  script.addEventListener('error', function (e) {
    reject(e);
  });
  document.body.appendChild(script);
})
};
window.addEventListener('load',function(){
handleAppJS();
appendImgSprite();
imgtm=[];
SWListen();
if (navigator.connection){
    navigator.connection.addEventListener('change', connectionCheck);
    connectionCheck();
}
});
function connectionCheck() {
    if (navigator.connection && navigator.connection.effectiveType) {
        const connectionType = navigator.onLine 
            ? navigator.connection.effectiveType
            : 'offline';
            var isSlowConnection='';
            if (/\slow-2g|2g/.test(connectionType)) {
                isSlowConnection = true;
              } 
            var slowNetDiv = document.getElementById('slow_net_pop');
            if(slowNetDiv)
            {
                if(isSlowConnection) {slowNetDiv.classList.remove('dn'); var timerId = setTimeout(function(){ slowNetDiv.classList.add('dn');(typeof timerId != 'undefined')?clearTimeout(timerId):'';}, 6000);}
                else {(typeof timerId != 'undefined')?clearTimeout(timerId):''; slowNetDiv.classList.add('dn')}
            }
    }        
}

function ipp_handling(){
  var iploc_val = getImCookie({name : 'iploc',flag : 2,keyValue : 'gcniso'});
  var Imesh_val = getImCookie({name : 'ImeshVisitor',flag : 2, keyValue : 'utyp'})
  if(document.getElementById('payxfooter') || document.getElementById('payx')){
    if((iploc_val) || (Imesh_val)){
      document.getElementById('payxfooter').style.display = 'none';
      document.getElementById('payxfooter').style.display = 'none';
    }
  }
}
var track_page_view = 1;
var event_login = new Event('logged_in');
var event_iploc = new Event('iploc_created');
window.addEventListener('iploc_created',ipp_handling);
window.addEventListener('logged_in',ipp_handling);
</script> 
</body>
</html>`
}
module.exports = handleRender;
