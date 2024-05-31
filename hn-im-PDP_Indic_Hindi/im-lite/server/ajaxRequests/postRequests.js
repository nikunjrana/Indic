var request = require("request");
const url = require('url');
const fs = require('fs');
const Service = require('./ServiceUrls'); 
const ERROR = 'SERVICE CONNECT FAILED';
var ServiceParser = require("../ServiceParser");

var GblComFunc = require('../GblComFunc');

module.exports = (req, res) => {
    var env = '';
    var hostName = "http://" + env;
    var userIP = GblComFunc.cookieValExtracter(req.cookies.iploc, 'gip');
    var mode = GblComFunc.checkUserStatus(req);
    switch (req.path) {
        case '/ajaxrequest/identified/timeout/':
            {
                try {
                    var date = new Date().toISOString().slice(0, 10);
                    var logfile_timeout = fs.createWriteStream('/tmp/clienttimeout-log-' + date + '.txt', { flags: 'a' });
                    logfile_timeout.write('{ url:' + req.body.url + ',timeout:' + req.body.timeout + ',timestamp:' + new Date().toLocaleString() + '}' + '\n');
                }
                catch (error) { }
                res.status(200).send();

                break;
            }
            case '/ajaxrequest/identified/common/login':
                {
                    const requestIp = require('@supercharge/request-ip');
                    let clientUserIp = requestIp ? requestIp.getClientIp(req) : '';
                    let cbService = '';
                    let im_iss_obj = {}
                    if (req.cookies.im_iss) {
                        let arr = req.cookies.im_iss.split('=')
                        im_iss_obj[arr[0]] = arr[1];
                    }
                    if (req.body.pass) {
                        var using = "mobile";
                        if (req.body.ciso != "IN") {
                            using = "email";
                        }
                        var options = {
                            method: 'POST',
                            url: Service.USER_AUTH_URL,
                            form: JSON.stringify({
                                username: req.body.use,
                                glusr_usr_countryname: req.body.IP_COUNTRY,
                                password: req.body.pass,
                                modid: "IMOB",
                                iso: req.body.ciso,
                                format: "JSON",
                                login_using: using,
                                originalreferer: req.body.originalreferer,
                                ph_country: req.body.ph_code,
                                ip: req.body.glusr_usr_ip,
                            })
                        };
                        cbService = Service.USER_AUTH_URL;
                    } else {
                        var email = "";
                        if (req.body.ciso != "IN") {
                            email = req.body.use
                        }
                        var options = {
                            method: 'POST',
                            url: Service.USER_IDENTIFY_URL,
                            form: JSON.stringify({
                                username: req.body.use,
                                create_user: req.body.duplicateEmailCheck ? 0 : 1,
                                modid: "IMOB",
                                iso: req.body.ciso,
                                format: "JSON",
                                IP: req.body.IP || clientUserIp,
                                ip: req.body.IP || clientUserIp,
                                IP_COUNTRY: req.body.IP_COUNTRY,
                                IPADDRESS: req.body.IPADDRESS,
                                GEOIP_COUNTRY_ISO: req.body.GEOIP_COUNTRY_ISO,
                                screen_name: 'Login Form on IMOB',
                                originalreferer: req.body.originalreferer,
                                glusr_usr_countryname: req.body.IP_COUNTRY,
                                ph_country: req.body.ph_code,
                                loginusing: "",
                                email: email,
                                glusr_usr_ip: "",
                                referer: "",
                                refurl: "",
    
                            }),
                        };
                        cbService = Service.USER_IDENTIFY_URL;
                    }
                    GblComFunc.makeRequest(req, res, options, false, false,cbService);
    
                    break;
                }
        case '/ajaxrequest/identified/common/otpVerification':
            {
                const requestIp = require('@supercharge/request-ip');
                let clientUserIp = requestIp ? requestIp.getClientIp(req) : '';
                if (req.body.ciso == 'IN') {
                    if (req.body.emailVerify == "") {
                        var options = {
                            method: 'POST',
                            url: Service.OTP_VERIFICATION_URL,
                            form: {
                                mobile_num: req.body.user,
                                user_mobile_country_code: '91',
                                token: 'imobile@15061981',
                                modid: 'IMOB'
                            }
                        };
                    }
                    else {
                        if (req.body.type == 'OTPGEN') {
                            var options = {
                                method: 'POST',
                                url: Service.OTP_VERIFICATION_URL,
                                form: {
                                    modid: 'IMOB',
                                    glusrid: req.body.glusr_id,
                                    process: 'OTP_EDIT_PROFILE_IMOB',
                                    email: req.body.email,
                                    attribute_id: req.body.attribute_id ? req.body.attribute_id : '109',
                                    token: 'imobile@15061981',
                                    user_mobile_country_code: req.body.user_mobile_country_code,
                                    flag: 'OTPGen',
                                    user_ip: userIP || clientUserIp,
                                    user_country: req.body.user_country,
                                    user_updatedusing: req.body.screenName ? req.body.screenName : 'IMOB VERIFICATION THROUGH OTP'
                                }
                            }
                        }
                        if (req.body.type == 'OTPVER') {
                            var options = {
                                method: 'POST',
                                url: Service.OTP_VERIFICATION_URL,
                                form: {
                                    modid: 'IMOB',
                                    'auth_key': req.body.authCode,
                                    'glusrid': req.body.glusr_id,
                                    'verify_screen': (req.body.screenName != '' && req.body.screenName != undefined) ? req.body.screenName : 'IMOB VERIFICATION THROUGH OTP',
                                    'verify_process': 'ONLINE',
                                    'email': req.body.email,
                                    'attribute_id': req.body.attribute_id ? req.body.attribute_id : '109',
                                    'token': 'imobile@15061981',
                                    'flag': 'OTPVer',
                                    user_mobile_country_code: '91',
                                }
                            };

                        }

                    }
                }
                if (req.body.ciso != 'IN') {
                    if (req.body.type == 'OTPGEN') {
                        var options = {
                            method: 'POST',
                            url: Service.OTP_VERIFICATION_URL,
                            form: {
                                modid: 'IMOB',
                                glusrid: req.body.glusr_id,
                                process: 'OTP_EDIT_PROFILE_IMOB',
                                email: req.body.email,
                                attribute_id: req.body.attribute_id ? req.body.attribute_id : '109',
                                token: 'imobile@15061981',
                                user_mobile_country_code: req.body.user_mobile_country_code,
                                flag: 'OTPGen',
                                user_ip: userIP || clientUserIp,
                                user_country: req.body.user_country,
                                user_updatedusing: req.body.screenName ? req.body.screenName : 'IMOB VERIFICATION THROUGH OTP'
                            }
                        };

                    }
                    if (req.body.type == 'OTPVER') {
                        var options = {
                            method: 'POST',
                            url: Service.OTP_VERIFICATION_URL,
                            form: {
                                modid: 'IMOB',
                                'auth_key': req.body.authCode,
                                'glusrid': req.body.glusr_id,
                                'verify_screen': (req.body.screenName != '' && req.body.screenName != undefined) ? req.body.screenName : 'IMOB VERIFICATION THROUGH OTP',
                                'verify_process': 'ONLINE',
                                'email': req.body.email,
                                'attribute_id': req.body.attribute_id ? req.body.attribute_id : '109',
                                'token': 'imobile@15061981',
                                'user_mobile_country_code': req.body.user_mobile_country_code,
                                'flag': 'OTPVer',
                                'user_ip': userIP,
                                'user_country': req.body.user_country,
                                'process': "OTP_JoinFreeForm_IMOB"
                            }
                        };
                    }
                }
                if (req.body.type == "OTPGEN" && req.body.OTPResend) {
                    options.form.OTPResend = 1;
                }
                if (req.body.ciso == 'IN') {
                    if(req.body.verifyUser){
                        options.form.email = req.body.email ? req.body.email : '',
                        options.form.glusrid =  req.body.glusr_id,
                        options.form.attribute_id = req.body.attribute_id ? req.body.attribute_id : ''
                    }
                    if (req.body.type == "OTPGEN") {
                        options.form.flag = "OTPGen";
                        options.form.user_ip = req.body.userIp || clientUserIp;
                        options.form.user_country = 'IN';
                        options.form.process = "OTP_JoinFreeForm_IMOB";
                        options.form.user_updatedusing = req.body.screenName ? req.body.screenName : 'SIGNUP_IMOB';
                        options.form.msg_key = req.body.msg_key;
                        options.form.mobile_num = req.body.user;
                    } else if (req.body.type == "OTPVER") {
                        options.form.flag = "OTPVer";
                        options.form.glusrid = req.body.glusr_id;
                        options.form.auth_key = req.body.authCode;
                        options.form.verify_screen = req.body.screenName;
                        options.form.verify_process = "Online";
                        options.form.user_ip = req.body.userIp || clientUserIp;
                    }
                }
                let cbService = Service.OTP_VERIFICATION_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
        
            }


        case '/ajaxrequest/identified/common/forgotPassword':
            {
                var options = {
                    method: 'POST',
                    url: Service.SLR_FRGT_PSSWD_URL,
                    form: {
                        email: req.body.username,
                        country_iso: req.body.ciso,
                        token: 'imobile@15061981',
                        modid: 'IMOB',
                    },
                };
                let cbService = Service.SLR_FRGT_PSSWD_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);

                break;
            }

        case '/ajaxrequest/identified/buyleads/bl/fetchMcatBls': {
            var options = {
                method: 'POST',
                url: Service.BL_MCAT_URL,
                headers: {
                    'content-type': 'application/json'
                },
                form: {
                    'start': req.body.start,
                    'end': req.body.end,
                    'token': 'imobile1@15061981',
                    'modid': 'IMOB',
                    'flname': req.body.flname
                }

            };
            let cbService=Service.BL_MCAT_URL;
            GblComFunc.makeRequest(req, res, options, false, true,cbService).then((body) => {
                try {
                    if (body == undefined) {
                        res.status(200).send({ 'message': 'No data found' });
                    }
                    else {
                        //Handling the Store
                        let mcatData = JSON.parse(body).Response;
                        let list = mcatData["Data"][0]["out_cur_ofr_bl_det"];
                        let bls = [];
                        for (var i in list) {
                            bls[i] = {};
                            bls[i]['ETO_OFR_ID'] = list[i].eto_ofr_display_id;
                            bls[i]['ETO_OFR_TITLE'] = list[i].eto_ofr_title;
                            bls[i]['ETO_OFR_DESC'] = list[i].eto_ofr_desc;
                            bls[i]['GLUSR_CITY'] = list[i].glusr_usr_city;
                            bls[i]['GLUSR_STATE'] = list[i].glusr_usr_state;
                            bls[i]['GLUSR_COUNTRY'] = list[i].glusr_usr_countryname;
                            bls[i]['ENRICHMENTINFO'] = list[i]['enrichment_info'];
                            bls[i]['ADDITIONALINFO'] = list[i].additional_info;
                            bls[i]['ETO_OFR_BUYER_LEADS_CNT'] = list[i].eto_ofr_buyer_leads_cnt;
                            bls[i]['ETO_OFR_BUYER_PRIME_MCATS'] = list[i].eto_ofr_buyer_prime_mcats;
                            bls[i]['ETO_OFR_BUYER_SELL_MCATS'] = list[i].eto_ofr_buyer_sell_mcats;
                            bls[i]['ETO_OFR_BUYER_PAST_SEARCH_MCAT'] = list[i].eto_ofr_buyer_past_search_mcat;
                            bls[i]['GLUSR_USR_MEMBERSINCE'] = list[i].glusr_usr_membersince;
                            bls[i]['ETO_OFR_MODREF_TYPE'] = list[i].eto_ofr_modref_type;
                            bls[i]['ETO_OFR_SMALL_IMAGE'] = list[i].eto_ofr_small_image;
                            bls[i]['DAY_DIFF'] = list[i].day_diff;
                            bls[i]['HOUR_DIFF'] = list[i].hr_diff;
                            bls[i]['MIN_DIFF'] = list[i].min_diff;
                            bls[i]['FK_GL_COUNTRY_ISO'] = list[i].fk_gl_country_iso;
                            bls[i]['GL_COUNTRY_FLAG'] = list[i].gl_country_flag;
                            bls[i]['BY_LEAD_TYPE'] = list[i].is_mobile == 1 ? list[i].is_email == 1 ? 3 : 1 : list[i].is_email == 1 ? 2 : 0;
                            bls[i]['OFFER_FLAG'] = 'B';
                            bls[i]['ETO_ENQ_TYP'] = list[i].is_big_buyer;
                            bls[i]["ETO_OFR_BUYER_IS_MOB_VERF"] = list[i].eto_ofr_buyer_is_mob_verf;
                            bls[i]["ETO_OFR_EMAIL_VERIFIED"] = list[i].eto_ofr_email_verified;
                            bls[i]["ETO_OFR_BUYER_IS_GST_VERF"] = list[i].eto_ofr_buyer_is_gst_verf;
                            bls[i]["GLUSR_COMPANY"] = list[i].glusr_usr_companyname ? 1 : 0;
                            bls[i]["GLUSR_ADDRESS"] = list[i].is_address;
                        };

                        let hasMoreBuyleads = parseInt(req.body.end) < mcatData["Data"][0]["live_lead_cnt"] ? true : false;
                        var blsList = { 'DisplayList': bls, 'hasMoreBuyleads': hasMoreBuyleads };
                        res.send(blsList);
                    }
                }
                catch{
                    res.status(200).send({ 'message': 'Error Occured' })
                }
            },
                (error) => {
                    res.status(200).send({ 'message': 'Error Occured' });
                });

        break;
        } 

        case '/ajaxrequest/identified/buyleads/bl/getdata':
            {
                var options = {
                    method: 'GET',
                    url: Service.GET_SUGGESTION_URL + '?q=' + req.body.q + '&limit=10&type=product',
                    headers: {
                        'content-type': 'application/json'
                    },

                };

                GblComFunc.makeRequest(req, res, options, false, true).then((data) => {
                    res.send(data);
                },
                    (error) => { res.status(200).send({ 'message': 'No data found' }); });

                break;
            }
        case '/ajaxrequest/isearch.php/getAutoSuggestData':
            {
                var options = {
                    method: 'GET',
                    url: Service.GET_SUGGESTION_URL + '?q=' + req.body.q + '&limit=8&type=product&fields=type_data%2Csort_order&match=fuzzy&showloc=0&p=36',
                    headers: {

                        'content-type': 'application/json'
                    },

                };

                GblComFunc.makeRequest(req, res, options, false, true).then(function (data) {

                    let response = JSON.parse(data);

                }, function (error) {
                    try {

                    }
                    catch (error) {
                    }

                })

                request(options, function (error, response, body) {
                    if (error) {
                        try {
                            var date = new Date().toISOString().slice(0, 10);
                            var autosuggest_service_error = fs.createWriteStream('/tmp/AutoSuggestError-log-' + date + '.txt', { flags: 'a' });
                            autosuggest_service_error.write('{ AutoSuggestServiceStatus:' + response.status + ',responseBody:' + response.body + ',timestamp:' + new Date().toLocaleString() + ',error:' + error + '}' + '\n');
                        }
                        catch (error) {
                        }
                        res.status(200).send('{}');

                    }
                    else {



                        if (response.statusCode == 200) {

                            res.send(body);
                        } else {
                            try {
                                var date = new Date().toISOString().slice(0, 10);
                                var autosuggest_service_error = fs.createWriteStream('/tmp/AutoSuggestError-log-' + date + '.txt', { flags: 'a' });
                                autosuggest_service_error.write('{ AutoSuggestServiceStatus:' + response.status + ',responseBody:' + response.body + ',timestamp:' + new Date().toLocaleString() + '}' + '\n');
                            }
                            catch (error) {
                                console.log("autosuggest-error", error);
                            }
                            res.status(200).send('{}');
                        }
                    }

                });
                break;
            }
        case '/ajaxrequest/isearch.php/saveSearchData':
            {
                var options = {
                    method: 'GET',
                    url: Service.GET_SUGGEST_PDM_URL + '?searches=' + req.body.q + '&vid=v' + req.body.vid + '&gid=g' + req.body.glid + '&type=recent&dName=m.indiamart.com&_=1522756616337',
                    headers: {

                        'content-type': 'application/json'
                    },

                };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    res.send(body);
                });
                break;
            }
        case '/ajaxrequest/isearch.php/getRecentAutoSuggestData':
            {
                var options = {
                    method: 'GET',
                    url: Service.GET_SUGGEST_PDM_URL + '?storage=ims' + '&vid=v' + req.body.vid + '&gid=g' + req.body.glid,
                    headers: {

                        'content-type': 'application/json'
                    },

                };

                request(options, function (error, response, body) {
                    if (error) {
                        try {
                            var date = new Date().toISOString().slice(0, 10);
                            var autosuggest_service_error = fs.createWriteStream('/tmp/AutoSuggestError-log-' + date + '.txt', { flags: 'a' });
                            autosuggest_service_error.write('{ AutoSuggestServiceStatus:' + response.status + ',responseBody:' + response.body + ',timestamp:' + new Date().toLocaleString() + ',error:' + error + '}' + '\n');
                        }
                        catch (error) {
                            console.log("autosuggest-error", error);
                        }
                        res.status(200).send('{}');

                    }
                    else {



                        if (response.statusCode == 200) {

                            res.send(body);
                        } else {
                            try {
                                var date = new Date().toISOString().slice(0, 10);
                                var autosuggest_service_error = fs.createWriteStream('/tmp/AutoSuggestError-log-' + date + '.txt', { flags: 'a' });
                                autosuggest_service_error.write('{ AutoSuggestServiceStatus:' + response.status + ',responseBody:' + response.body + ',timestamp:' + new Date().toLocaleString() + '}' + '\n');
                            }
                            catch (error) {
                                console.log("autosuggest-error", error);
                            }
                            res.status(200).send('{}');
                        }
                    }
                });
                break;
            }
        case '/ajaxrequest/search/isearch.php/getcitydata':
            {
                var options = {
                    method: 'GET',
                    url: Service.GET_SUGGESTION_URL + '?q=' + req.body.q + '&limit=10&type=city&fields=state',
                    headers: {

                        'content-type': 'application/json'
                    },

                };

                request(options, function (error, response, body) {
                    if (error) { res.status(503).send(); }
                    else {



                        if (response.statusCode == 200) {

                            res.send(body);
                        } else {
                            res.status(response.statusCode).send(body);
                        }
                    }
                });
                break;
            }
        case '/ajaxrequest/search/feedback':
            {
                var options = {
                    method: 'POST',
                    url: Service.SRCH_FEEDBACK_URL,
                    form: {
                        "FEEDBACK_FLAG": "IMSEARCH_FEEDBACK",
                        "SEARCH_QUERY": req.body.srch_query,
                        "VALIDATION_KEY": "c1561b120842fabe1310417083827590",
                        "IP": req.body.ip,
                        "RATING": req.body.rating,
                        "SEARCH_URL":req.body.srch_url,
                        "SEARCH_TOTAL_RESULTS":req.body.total_results,
                        "SEARCH_CATEGORY": req.body.feedback,
                        "SEARCH_MOBILE": req.body.phNum,
                        "SEARCH_SOURCE": 'sm',
                        "COOKIE":req.body.cookie,
                    },
                    headers: {
                        "Content-Type": "application/dime"
                    }
                }
                options.form = JSON.stringify(options.form)
                let cbService=Service.SRCH_FEEDBACK_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService)
                break;
            }
        case '/ajaxrequest/enq/fileUpload':
            {
                var headers = {
                    'Content-Type': 'multipart/form-data'
                };
                var form = new formidable.IncomingForm(),
                    tempPath, filePath, data = {};

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/Attachmentuploads');

                // every time a field has been uploaded successfully,
                form.on('field', function (name, value) {
                    if (name = "glid") {
                        data.gluserid = value;
                    }
                });

                // every time a file has been uploaded successfully,
                form.on('file', function (field, file) {
                    filePath = file.path;
                    tempPath = file.path;
                    tempPath = path.join(form.uploadDir, (file.name).replace(/[^\w\.\-\_]+/ig, ''));
                });

                // log any errors that occur
                form.on('error', function (err) {
                });

                // once all the files have been uploaded, send a response to the client
                form.on('end', function () {
                    fs.rename(filePath, tempPath, function (err) {
                        if (err) throw err;
                        var rstraem = fs.createReadStream(tempPath);
                        data.imgpath = tempPath;
                        rstraem.on('data', (chunk) => {
                            data.image = rstraem;
                        });
                        rstraem.on('end', function () {
                            var im = fs.createReadStream(data.imgpath);
                            var data1 = {
                                'image': im
                            };
                            data1.gluserid = data.gluserid, //req.query.glid,
                                data1.modid = 'IMOB',
                                data1.token = 'addandroidproduct@02021980',
                                data1.enqatth = 1;
                            var requestOptions = {
                                url: Service.MAPI_PROD_UPLOAD_URL,
                                headers: headers,
                                formData: data1
                            };
                            request.post(requestOptions, function (error, response, body) {
                                fs.unlink(tempPath, function (err) {
                                    if (err) throw err;
                                });
                                res.send(body);
                            });
                        });
                    });

                });
                // parse the incoming request containing the form data
                form.parse(req);
                break;
            }
        case '/ajaxrequest/identified/products/addEditProduct':
            {
                var url, options, imageData = {},
                    data = {};
                if (req.body.action == 'edit_product') url = Service.MAPI_PROD_UPDATE_URL;
                else if (req.body.action == 'add_product') url = Service.MAPI_PROD_ADD_URL;
                if (req.body.imageData) {
                    imageData = JSON.parse(req.body.imageData);
                    data.item_img_small = imageData.item_img_small;
                    data.item_img_small_125x125 = imageData.item_img_small_125x125;
                    data.item_img_original = imageData.item_img_original;
                    data.item_img_original_wh = imageData.item_img_original_wh;
                    data.item_img_small_125x125_wh = imageData.item_img_original_wh;
                    data.item_img_small_wh = imageData.item_img_small_wh;
                    if (imageData.hasOwnProperty('item_img_large')) {
                        data.item_img_large = imageData.item_img_large;
                        data.item_img_large_wh = imageData.item_img_large_wh;
                    }
                }
                data.gluserid = req.body.glid;
                data.action = req.body.action;
                data.price = req.body.price;
                data.unit = req.body.unit;
                data.item_name = req.body.item_name;
                data.pcid = req.body.item_id;
                data.item_description = req.body.desc;
                data.quantity = req.body.moq;
                data.parent_cat_id = req.body.cat;
                data.updated_by = 'user';
                data.updated_screen = '';
                data.modid = 'IMOB';
                data.ip_country = 'IN';
                data.ip = '11.2 ';
                data.updated_url = '';
                data.currency = 'INR';
                data.app_version_no = 10.4;
                data.token = 'addandroidproduct@02021980';
                data.item_id = req.body.item_id;
                options = {
                    method: 'POST',
                    url: url,
                    headers: {},
                    form: data
                };
                GblComFunc.makeRequest(req, res, options, false);
                break;
            }
        case '/ajaxrequest/identified/products/imageUpload1':
            {
                var headers = {
                    'Content-Type': 'multipart/form-data'
                };
                var form = new formidable.IncomingForm(),
                    tempPath, filePath, data = {};

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/Imageuploads');

                // every time a field has been uploaded successfully,
                form.on('field', function (name, value) {
                    if (name = "glid") {
                        data.gluserid = value;
                    }
                });

                // every time a file has been uploaded successfully,
                form.on('file', function (field, file) {
                    filePath = file.path;
                    tempPath = file.path;
                    tempPath = path.join(form.uploadDir, file.name);
                });

                // log any errors that occur
                form.on('error', function (err) {
                });

                // once all the files have been uploaded, send a response to the client
                form.on('end', function () {
                    fs.rename(filePath, tempPath, function (err) {
                        if (err) throw err;
                        var rstraem = fs.createReadStream(tempPath);
                        data.imgpath = tempPath;
                        rstraem.on('data', (chunk) => {
                            data.image = rstraem;
                        });
                        rstraem.on('end', function () {
                            var im = fs.createReadStream(data.imgpath);
                            var data1 = {
                                'image': im
                            };
                            data1.gluserid = data.gluserid, //req.query.glid,
                                data1.pcid = '',
                                data1.modid = 'IMOB',
                                data1.token = 'addandroidproduct@02021980',
                                data1.forcefullcheck = 'Y',
                                data1.type = 'json',
                                data1.filenme_final = (path.basename(tempPath)).replace(/[^\w\.\-\_]+/ig, ''),
                                data1.imgvalue = 0,
                                data1.name = (path.basename(data.imgpath)).replace(/[^\w\.\-\_]+/ig, ''),
                                data1.add_image = 'Continue Next',
                                data1['success-url'] = '//dev-m.indiamart.com/products/addproduct/',
                                data1.refurl = '//dev-m.indiamart.com/products/addproduct/',
                                data1.imagename = (path.basename(data.imgpath)).replace(/[^\w\.\-\_]+/ig, '')
                            var requestOptions = {
                                url: Service.MAPI_PROD_UPLOAD_URL,
                                headers: headers,
                                formData: data1
                            };
                            request.post(requestOptions, function (error, response, body) {
                                fs.unlink(tempPath, function (err) {
                                    if (err) throw err;
                                });
                                res.send(body);
                            });
                        });
                    });

                });
                // parse the incoming request containing the form data
                form.parse(req);
                break;
            }
        case '/ajaxrequest/identified/products/imageUpload':
            {
                var form = new formidable.IncomingForm(),
                    tempPath, filePath, data = {};

                //form.multiples = true;

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/Imageuploads');

                // every time a file has been uploaded successfully,
                form.on('file', function (field, file) {
                    filePath = file.path;
                    tempPath = file.path;
                    tempPath = path.join(form.uploadDir, file.name);
                });

                // log any errors that occur
                form.on('error', function (err) {
                });

                // once all the files have been uploaded, send a response to the client
                form.on('end', function () {
                    fs.rename(filePath, tempPath, function (err) {
                        if (err) throw err;
                        var rstraem = fs.createReadStream(tempPath);
                        rstraem.on('data', (chunk) => {
                            data.image = rstraem;
                        });
                        rstraem.on('end', function () {
                            data.gluserid = 28515946, //req.query.glid,
                                data.pcid = '', //req.query.item_id,
                                data.modid = 'IMOB',
                                data.token = 'addandroidproduct@02021980',
                                data.forcefullcheck = 'Y',
                                data.type = 'json',
                                data.filenme_final = path.basename(tempPath),
                                data.imgvalue = 0,
                                data.name = path.basename(tempPath),
                                data.add_image = 'Continue Next',
                                data['success-url'] = '//dev-m.indiamart.com/products/addproduct/',
                                data.refurl = '//dev-m.indiamart.com/products/addproduct/',
                                data.imagename = path.basename(tempPath)
                            request.post({
                                url: Service.MAPI_PROD_UPLOAD_URL,
                                formData: data
                            }, function (error, response, body) { });
                        });
                    });

                });
                form.parse(req);
                break;
            }
        case '/ajaxrequest/identified/buyleads/bl/markfav':
            {
                var options = {
                    method: 'POST',
                    url: Service.BL_MARKFAV_URL,
                    form: req.body
                }
                let cbService=Service.BL_MARKFAV_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/buyleads/bl/package':
            {
                var options = {
                    method: 'POST',
                    form: {
                        'GLUSERID': req.body.GLUSERID,
                        'MOBILE': req.body.MOBILE,
                        'SOURCE': req.body.SOURCE,
                        'OFFER_ID': req.body.OFFER_ID,
                        'TENDER_ID': req.body.TENDER_ID,

                    },
                }//https://pay.indiamart.com/index.php?r=payments/Pay/selectResponse&gateway=hdfc_fss
                options.url = Service.PAY_INDEX_URL + '?r=payments/APP/getPackageDetails/';
                let cbService = Service.PAY_INDEX_URL;
                if(req.body.isForeign == 1)
                options.form['foreign_leads'] = 1;

                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/buyleads/bl/package/buynow/':
            {
                var options = {
                    method: 'POST',
                    url: Service.PAY_INDEX_URL + '?r=payments/Pay/generateOrderID/',
                    form: {
                        'PLAN': req.body.PLAN,
                        'OFFER_ID': req.body.OFFER_ID,
                        'TENDER_ID': req.body.TENDER_ID,
                        'REF_URL': req.body.REF_URL,
                        'MOBILE': req.body.MOBILE,
                        'GLUSERID': req.body.GLUSERID,
                        'PREV_URL': req.body.PREV_URL,
                        'FLOW_STATUS': 'GETORDERID',
                        'SOURCE': req.body.SOURCE,
                        'TOKEN': req.body.TOKEN,
                        'MODID': req.body.MODID,
                        'fromsite': req.body.fromsite
                    }
                };
                if(req.body.schemeId=='6'){
                        options.form['purchase_flag']=1;
                        options.form['redirect_url']=req.body.PREV_URL;
                                            }
                if (typeof (req.body.gst) !== "undefined" && req.body.gst.length !== 0) {
                    options.form.GST = req.body.gst;
                }
                let cbService = Service.PAY_INDEX_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;

            }
        case '/ajaxrequest/identified/buyleads/bl/getcredits/':
            {
                var options = {
                    method: 'POST',
                    url: Service.BL_CREDIT_URL,
                    form: req.body
                };
                let cbService=Service.BL_CREDIT_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);

                break;
            }//saloni

        case "/ajaxrequest/identified/buyleads/bl/getmcatid":{
            var options = {
                method: 'POST',
                url: Service.IMPCAT_URL,
                form: {
                    modid: 'IMOB',
                    token: 'imobile@15061981',
                    flname: req.body.flname,
                    start: '1',
                    end: '1'
                }
            }
            let cbService = Service.IMPCAT_URL;
            GblComFunc.makeRequest(req, res, options, false, true, cbService).then((data) => {
                try{
                    if (data == undefined) {
                        res.status(200).send({ 'message': 'No data found' });
                    }
                    else{
                        let body = JSON.parse(data);
                        let mcatid = { mcatid: body && body['mcatid'] ? body['mcatid'] : ''}
                        res.send(mcatid);
                    }
                }
                catch(error){
                    res.status(200).send({ 'message': 'Error Occured' })
                }
            },
            (error) => {
                res.status(200).send({ 'message': 'Error Occured' });
            });
            break;
        }

        case "/ajaxrequest/identified/buyleads/bl/relatedmcat": {
            var options = {
                method: 'POST',
                url: Service.BL_RELATED_MCAT_URL,
                form: {
                    mcatid: req.body.mcat_id,
                    modid: 'IMOB',
                    token: 'imobile@15061981',
                }
            };
            let cbService=Service.BL_RELATED_MCAT_URL;
            GblComFunc.makeRequest(req, res, options, false, true, cbService).then((data) => {
                try{
                    if (data == undefined) {
                        res.status(200).send({ 'message': 'No data found' });
                    }
                    else{
                        res.send(data);
                    }
                }
                catch(error){
                    res.status(200).send({ 'message': 'Error Occured' })
                }
            },
            (error) => {
                res.status(200).send({ 'message': 'Error Occured' });
            });
            break;
        }

        case "/ajaxrequest/identified/buyleads/bl/buyLeadlist": {
            let tempPrefCityLead = null;
            if (
                req.body.pref_city_lead == "" ||
                req.body.pref_city_lead == undefined
            ) {
                tempPrefCityLead = "0";
            } else {
                tempPrefCityLead=req.body&&(req.body.city)?'1':(req.body.LocPref==1||req.body.LocPref==4)?req.body.pref_city_lead:'1';
            }
            let mcatId = req.body.mcatId || '';
            let order_value = req.body.order_value || '';
            let city = req.body.city || '';
            let mlSeller = false;
            
            if(req.body.inbox == 'P' && tempPrefCityLead == "0" && mcatId == '' && order_value == '' && city == ''){
                try{
                const sellersIDJSON = require('../mlSellersJSON/mlSeller.json');
                if(sellersIDJSON.Glids.includes(req.body.glid)){mlSeller = true;}
                }
                catch(e){
                console.log("Buylead ML Display service error",e);
                }
            }
        
            var options = {
                method: "POST",
                url:  Service.BL_DISPLAY_CDS_URL,
                headers: {
                "content-type": "application/json",
                },
                form: {
                    start: req.body.start,
                    end: req.body.end,
                    buyer_response: req.body.buyer_response,
                    shortlist: req.body.shortlist,
                    token: req.body.token,
                    modid: req.body.MOD_ID,
                    offer_type: req.body.offer_type,
                    glusrid: req.body.glid,
                    attachment: req.body.attachment,
                    inbox: req.body.inbox,
                    LocPref: req.body.LocPref,
                    city: req.body.city,
                    iso: req.body.iso,
                    mcatid: req.body.mcatid,
                    pref_city_lead: tempPrefCityLead,
                    order_value:req.body.order_value,
                },
            };
        
            if (req.body.iso) {
                options.form.LocPref = 1;
            }
            !req.body.city ? delete options.form["city"] : ""; //delete if not present
            !req.body.mcatid ? delete options.form["mcatid"] : "";
            !req.body.iso ? delete options.form["iso"] : "";
            !req.body.order_value ? delete options.form["order_value"] : "";
            let cbService=Service.BL_DISPLAY_CDS_URL;
            if (req.body.shortlist) {
                options.url = Service.BL_SHORTLISTED_URL;
                let cbService=Service.BL_SHORTLISTED_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
            } else {
                GblComFunc.makeRequest(req, res, options, false, true,cbService).then(
                (data) => {
                    ServiceParser.forBuyleadList(req, res, data, false, mlSeller);
                },
                (error) => {
                    res.status(200).send({ status: error,url:options})
                }
                );
            }
            break;
            }    
        case '/ajaxrequest/widgets/setLocation':
            {
                var options = {
                    method: 'POST',
                    url: Service.SELLER_USER_UPDATE_URL,
                    form: JSON.stringify(req.body)
                };
                GblComFunc.makeRequest(req, res, options, true);
                break;
            }
        case '/ajaxrequest/identified/search/EngagementData':
            {
                var options = {
                    method: 'POST',
                    url: Service.USER_IMUTILS_GET_ENGAGEMENT_DATA,
                    form: {
                        display_id: req.body.data,
                        token: 'imobile@15061981',
                        modid: 'IMOB'
                    }
                }
                GblComFunc.makeRequest(req, res, options, true);
                break;
            }
        //saloni
        case '/ajaxrequest/identified/search/CityFromLatLong/':
            {
                var options = {
                    method: 'POST',
                    url: Service.LEADS_GET_USER_LOC_URL,
                    form: req.body
                };
                let cbService=Service.LEADS_GET_USER_LOC_URL;
                GblComFunc.makeRequest(req, res, options, false, true,cbService).then(function (data) {

                    res.status(200).send(data);

                }, function (error) {
                    if (error == ERROR) {
                        res.status(503).send();
                    } else {
                        res.status(error).send('{}');
                    }
                });

                break;
            }
        case '/ajaxrequest/identified/mcat/CityFromLatLong/':
            {
                var options = {
                    method: 'POST',
                    url: Service.LEADS_GET_USER_LOC_URL,
                    form: req.body
                };
                let cbService=Service.LEADS_GET_USER_LOC_URL;
                GblComFunc.makeRequest(req,res,options,false,true,cbService).then(function(data){
                    // data = '{"lat":"28.49860920","long":"77.39990540","cityname":"Noida","cityid":"70751","countryiso":"IN","Method":"LatLong","multiple":[],"CODE":"200","Status":"Successful","MSG":"Success"}';
                    res.status(200).send(data);
    
                },function (error){
                    if (error == ERROR) {
                        res.status(503).send();
                    } else {
                        res.status(error).send('{}');
                    }
                });
                // let data = '{"lat":"28.49860920","long":"77.39990540","cityname":"Noida","cityid":"70751","countryiso":"IN","Method":"LatLong","multiple":[],"CODE":"200","Status":"Successful","MSG":"Success"}';
                // res.status(200).send(data);
    
                break;
            }
        case '/ajaxrequest/bl/fileUpload':
            {
                var headers = {
                    'Content-Type': 'multipart/form-data'
                };
                var form = new formidable.IncomingForm(),
                    tempPath, filePath, data = {};

                // store all uploads in the /uploads directory
                form.uploadDir = path.join(__dirname, '/Attachmentuploads');

                // every time a field has been uploaded successfully,
                form.on('field', function (name, value) {
                    if (name = "glid") {
                        data.gluserid = value;
                    }
                });

                // every time a file has been uploaded successfully,
                form.on('file', function (field, file) {
                    filePath = file.path;
                    tempPath = file.path;
                    tempPath = path.join(form.uploadDir, (file.name).replace(/[^\w\.\-\_]+/ig, ''));
                });

                // log any errors that occur
                form.on('error', function (err) {
                });

                // once all the files have been uploaded, send a response to the client
                form.on('end', function () {
                    fs.rename(filePath, tempPath, function (err) {
                        if (err) throw err;
                        var rstraem = fs.createReadStream(tempPath);
                        data.imgpath = tempPath;
                        rstraem.on('data', (chunk) => {
                            data.image = rstraem;
                        });
                        rstraem.on('end', function () {
                            var im = fs.createReadStream(data.imgpath);
                            var data1 = {
                                'image': im
                            };
                            data1.gluserid = data.gluserid, //req.query.glid,
                                data1.modid = 'IMOB',
                                data1.token = 'addandroidproduct@02021980',
                                data1.enqatth = 1;
                            data1.AK = req.cookies.im_iss
                            var requestOptions = {
                                url: Service.MAPI_PROD_UPLOAD_URL,
                                headers: headers,
                                formData: data1
                            };
                            request.post(requestOptions, function (error, response, body) {
                                fs.unlink(tempPath, function (err) {
                                    if (err) throw err;
                                });
                                res.send(body);
                            });
                        });
                    });

                });
                // parse the incoming request containing the form data
                form.parse(req);
                break;
            }
        case '/ajaxrequest/identified/widgets/recentsearches/':
            {
                var options = {
                    method: 'POST',
                    url: Service.RECOMMENDED_GET_BUYERDATA_URL,
                    form: { 'glusrId': req.body.glid, 'logtime': req.body.logdate, 'modid': 'IMOB', 'type': 2, 'mode': 3 }

                };
                let cbService = Service.RECOMMENDED_GET_BUYERDATA_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/mbr/fetchMBRlist/':
            {
                var options = {
                    method: 'POST',
                    url: Service.MBR_LIST_URL,
                    form: { 'glusrid': req.body.glid, 'token': 'imobile1@15061981', 'modid': 'IMOB', 'latest_lead': 50, 'supplier_info': 'YES', 'quotation': 1, 'reply_count': 1, 'sorting_order': 2 }
                };
                let cbService=Service.MBR_LIST_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/mbr/fetchDetailsMBR/':
            {
                var options = {
                    method: 'POST',
                    url: Service.BL_DETAIL_URL,
                    form: {
                        offerid: req.body.inpdata.offerId,
                        token: 'imobile@15061981', offer_type: 'B', buyer_response: 1, additionalinfo_format: 'JSON', modid: 'IMOB', 'glusrid': req.body.inpdata.glid, im_iss: req.cookies.im_iss,
                        type: 'Q', reply_count: 1, supplier_info: 'YES', additionalinfo: 'YES'
                    }
                };
                let cbService=Service.BL_DETAIL_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
            case '/ajaxrequest/identified/mbr/fetchOrderList/':
            {
                var options = {
                    method: 'POST',
                    url: Service.GET_ORDER_LIST_URL,
                    form: JSON.stringify({
                        "glusrid": req.body.glusrid,
                        "order_filter_flag": 1,
                        "modid": "IMOB",
                        "page_num": 1,
                        "rows_per_page": 20,
                    }),
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }
        case '/ajaxrequest/identified/mbr/delete_offer/':
            {
                let histcomments = ''; let url = '';
                if (req.body.type == 'D') {
                    histcomments = 'Expired by User from Manage Your Offers';
                    url = Service.MBR_DELETE_URL;
                   // let cbService=Service.MBR_DELETE_URL;
                } else {
                    histcomments = 'Push to Top';
                    url = Service.MBR_PUSHTOPOP_URL;
                   // let cbService=Service.MBR_PUSHTOPOP_URL;
                }
                let userID = req.body.glid;
                let histby = req.body.fname;
                let contry_name = req.body.IP_COUNTRYName;
                let histip = req.body.IP;
                var options = {
                    method: 'POST',
                    url: url,
                    form: {
                        offerid: req.body.inpdata.offerId, modid: "IMOB", glusrid: userID, token: "imobile1@15061981", histby: histby, histusing: 'IMOB', histipcountry: contry_name, histip: histip, histcomments: histcomments, histmodid: 'IMOB', histusrid: userID, USER_ID: userID
                    }
                };
                GblComFunc.makeRequest(req, res, options, false, false);
                break;
            }
        case '/ajaxrequest/identified/messagecenter/fetchMessages_Buyer/':
        case '/ajaxrequest/identified/messagecenter/fetchMessages_Seller/':
            {
                var options = {
                    method: 'POST',
                    url: Service.MSG_CONTACT_LIST_URL,
                    form: JSON.stringify({
                        'glusrid': req.body.glusrid,
                        'start': req.body.start,
                        'end': req.body.end,
                        'count': req.body.count,
                        'last_contact_date': req.body.lastContactDate,
                        'modid': req.body.modid,
                    }),
                };
                let cbService = Service.MSG_CONTACT_LIST_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/messagecenter/fetchMsgdetail_Buyer/':
        case '/ajaxrequest/identified/messagecenter/fetchMsgdetail_Seller/':
            {
                var options = {
                    method: 'POST',
                    url: Service.MSG_CONVER_LIST_URL,

                    form: JSON.stringify({
                        'user_glid': req.body.user_glid,
                        'contact_glid': req.body.contact_glid,
                        'from': req.body.start,
                        'to': req.body.end,
                        'modid': req.body.modid,
                    }),
                };
                let cbService = Service.MSG_CONVER_LIST_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }

        case '/ajaxrequest/identified/messagecenter/fetchContDetails_Buyer/':
        case '/ajaxrequest/identified/messagecenter/fetchContDetails_Seller/':
            {
                var options = {
                    method: 'POST',
                    url: Service.MSG_CONTACT_DETAIL_URL,

                    form: JSON.stringify({
                        'glusrid': req.body.glusrid,
                        'contactglid': req.body.contactglid,
                        'flag': req.body.flag,
                        'contact_year': req.body.contact_year,
                        'modid': req.body.modid,
                    })
                }
                let cbService = Service.MSG_CONTACT_DETAIL_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }

        case '/ajaxrequest/identified/messagecenter/fetchBuyerProfile':
        
                {
                var options = {
                    method: 'POST',
                    url: Service.BUYER_PROFILE_URL,
                    form: {
                        
                        token: req.body.token,
                        modid: req.body.modid,
                        supplier_glusrid: req.body.glid,
                        K : req.body.key,
                    }
                    
                }
                    let cbService=Service.BUYER_PROFILE_URL;
                    GblComFunc.makeRequest(req, res, options, false, false,cbService);
                    break;
                }
        
        case '/ajaxrequest/identified/messages/generateOrder':
            {
                let options = {
                    method: 'POST',
                    url: Service.MSG_GENERATEORDER,
                    form: JSON.stringify({
                        "glusrid": req.body.glusrid,
                        "receiver_glid": req.body.receiver_glid,
                        "modid": "IMOB",
                        "product_id": req.body.productId,
                        "product_name": req.body.productName,
                        "mcat_id":req.body.mcat_id,
                        "modrefid": 5,
                        "buyer_ip": req.body.buyer_ip
                    })
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }

        case '/ajaxrequest/identified/messages/enrichOrder':
            {
                let options = {
                    method: 'POST',
                    url: Service.MSG_ENRICHORDER,
                    form: JSON.stringify({
                        "glusrid": req.body.glusrid,
                        "modid": "IMOB",
                        "order_id": req.body.order_id,
                        "order_quantity": req.body.order_quantity,
                        "total_order_price": req.body.total_order_price,
                        "order_unit_type": req.body.order_unit_type,
                        "order_unit_price": req.body.order_unit_price,
                        "order_currency": req.body.order_currency,
                        "pay_mode": req.body.pay_mode,
                        "address": req.body.Address
                    })
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }

        case '/ajaxrequest/identified/messages/finishOrder':
            {
                let options = {
                    method: 'POST',
                    url: Service.MSG_FINISHORDER,
                    form: JSON.stringify({
                        "order_id": req.body.orderId,
                        "glusrid": req.body.glusrid,
                        "modid": "IMOB",
                        "address": req.body.Address,
                        "pay_mode": req.body.pay_mode
                    })
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }           
              
        case '/ajaxrequest/identified/messages/getOrderDetail':
        case '/ajaxrequest/identified/MBR/getOrderDetail':
                    {
                        var options={
                            method: 'POST',
                            url:Service.MSG_GET_ORDER_DETAIL,
                            form: JSON.stringify({
                                'order_id':req.body.order_id,
                                'glusrid':req.body.glusrid,
                                'modid':"IMOB"
                            }),
                        };
                        GblComFunc.makeRequest(req, res, options, true, false);
                        break;
                    } 
        case '/ajaxrequest/identified/messages/getDispositionList':
                    {
                        var options={
                            method: 'POST',
                            url:Service.MSG_GET_DISPOSITION_LIST,
                            form: JSON.stringify({
                                'glusrid':req.body.glusrid,
                                'modid':"IMOB"
                            }),
                        };
                        GblComFunc.makeRequest(req, res, options, true, false);
                        break;
                    }       
        case '/ajaxrequest/identified/messages/cancelOrder':
                    {
                        var options={
                            method: 'POST',
                            url:Service.MSG_CANCEL_ORDER,
                            form: JSON.stringify({
                                "order_id":req.body.order_id,
                                "glusrid":req.body.glusrid,
                                "modid":"IMOB",
                                "cancel_by":"b",
                                "can_sub_disp_id":req.body.can_sub_disp_id,
                                "can_reason":req.body.can_reason
                            }),
                        };
                        GblComFunc.makeRequest(req, res, options, true, false);
                        break;
                    }          
                                 

        case '/ajaxrequest/identified/messagecenter/payWithIM':
            {
                var options = {
                    method: 'POST',
                    form: JSON.stringify({
                        'BS_BUYER_GLID': req.body.usr_glid,
                        'BS_SUPPLIER_GLID': req.body.contact_glid,
                        'BS_PRODUCT_DETAIL': req.body.desc,
                        'BS_PAYMENT_AMOUNT': req.body.amount,
                        'BS_MODID': 'IMOB',
                        'TOKEN' : 'oms@2402201615022017',                     
                    }),
                }
                options.url = Service.PAY_INDEX_MESSAGES_URL + '?r=invoice/Oms/createinvoice';
                let cbService = Service.PAY_INDEX_MESSAGES_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
             }
             case '/ajaxrequest/identified/messagecenter/checkUserSetting':
                {
                    var options = {
                        method: 'POST',
                        form: JSON.stringify({
                            'privacy_settings': [{"flag":"2"}],
                            'token': 'imobile@15061981',
                            'mod_id': req.body.modid,
                            'glusrid': req.body.contact_glid,                  
                        }),
                    }
                    options.url = Service.USER_SETTING_DETAILS_URL;
                    GblComFunc.makeRequest(req, res, options, true, false);
                    break;
                 }
        case '/ajaxrequest/identified/messagecenter/sendreply_Buyer/':
        case '/ajaxrequest/identified/messagecenter/sendreply_Seller/':
            {
                var post_data = Object.keys(req.body).map(function (key) {
                    return req.body[key];
                });
                var final_response = GblComFunc.doxssHandling(post_data);
                if (false) {
                    res.status(503).send(final_response);
                } else {
                    if (req.body.attach1) {
                        var options = {
                            method: 'POST',
                            url: Service.MSG_INSTANT_RPLY_URL,
                            headers: {

                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                'SUBJECT': req.body.subject,
                                'QUERY_ID': req.body.queryId,
                                'Query_Type': req.body.queryType,
                                'Mod_id': req.body.Mod_id,
                                'S_GLUSR_ID': req.body.sGlid,
                                'RECV_GLUSR_ID': req.body.rGlid,
                                'IIL_RFQ_SOURCE_ID': req.body.rfqid,
                                'ENQ_MSG': 'Please find the attachment',
                                'DIR_QUERY_REPLY_ATTACHMENT': [req.body.attach1],
                                'DIR_QUERY_REPLY_ATTACHMENT1': req.body.attach1,
                                'contact_year' : req.body.contact_year,
                                'Reply_Template_Flag' : req.body.code,
                                'suggestive_reply_position':req.body.suggestive_reply_position,
                                'sender_ip': req.body.sender_ip                             
                            })
                        };
                    }
                    else {
                        var options = {
                            method: 'POST',
                            url: Service.MSG_INSTANT_RPLY_URL,
                            headers: {
                                
                                'content-type': 'application/json'
                            },
                            encodeURI: false,
                            body: JSON.stringify({
                                'SUBJECT': req.body.subject,
                                'QUERY_ID': req.body.queryId,
                                'Query_Type': req.body.queryType,
                                'Mod_id': req.body.Mod_id,
                                'S_GLUSR_ID': req.body.sGlid,
                                'RECV_GLUSR_ID': req.body.rGlid,
                                'IIL_RFQ_SOURCE_ID': req.body.rfqid,
                                'ENQ_MSG': req.body.msg,
                                'contact_year' : req.body.contact_year,
                                'Reply_Template_Flag' : req.body.code,
                                'suggestive_reply_position':req.body.suggestive_reply_position,
                                'sender_ip': req.body.sender_ip                               
                            })
                        };
                    }
                    let cbService = Service.MSG_INSTANT_RPLY_URL;
                    GblComFunc.makeRequest(req, res, options, true, false,cbService);
                }
                break;
            }
        case '/ajaxrequest/identified/messages/identifiedSendReply/':
            {
                var options = {
                    method: 'POST',
                    url: Service.MSG_IDENTIFIED_REPLY,
                    headers: {

                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "S_GLUSR_ID": req.body.sGlid,
                        "RECV_GLUSR_ID": req.body.rGlid,
                        "Mod_id": "IMOB",
                        "ENQ_MSG": req.body.msg,
                    })
                };
                let cbService = Service.MSG_IDENTIFIED_REPLY;
                GblComFunc.makeRequest(req, res, options, true, false, cbService);
                break;
            }    
        case '/ajaxrequest/identified/soi/seller/user/reauthenticate':
            {
                var options = {
                    method: 'POST',
                    url: Service.USER_REAUTH_URL,
                    form: JSON.stringify(req.body)
                };
                GblComFunc.makeRequest(req, res, options, true, true).then((data) => {
                    res.status(200).send(data);
                }, (error) => {
                    res.status(503).send();
                });
                break;
            }
            case '/ajaxrequest/identified/soi/seller/user/update/':
            case '/ajaxrequest/identified/soi/seller/user/updateName/':
            case '/ajaxrequest/identified/soi/seller/user/updateCompany/':
            case '/ajaxrequest/identified/soi/seller/user/updateAddress/':
            {
                var post_data = Object.values(req.body)
                var final_response = GblComFunc.doxssHandling(post_data);
                if (final_response.code != 200) {
                    res.status(503).send(final_response);
                } else {
                    var formdata = {};
                    let url = "";

                    formdata.USR_ID = req.body.USR_ID;
                    formdata.MOBILE_COUNTRY = req.body.MOBILE_COUNTRY;
                    formdata.VALIDATION_KEY = req.body.VALIDATION_KEY;
                    formdata.MODID = req.body.MODID;
                    formdata.UPDATEDBY = req.body.UPDATEDBY;
                    formdata.UPDATEDUSING = req.body.UPDATEDUSING;
                    formdata.IP = req.body.IP;
                    formdata.IP_COUNTRY = req.body.IP_COUNTRY;
                    formdata.VALIDATION_KEY = req.body.VALIDATION_KEY;
                    formdata.MODIFYSTATUS = 'T';
                    if (req.body.EMAIL) formdata.EMAIL = req.body.EMAIL;
                    if (req.body.FIRSTNAME) formdata.FIRSTNAME = req.body.FIRSTNAME;
                    if (req.body.NAME) {
                        let splitnames = req.body.NAME.split(" ");
                        formdata.FIRSTNAME = splitnames[0];
                        formdata.LASTNAME = splitnames[1] ? splitnames[1] : '';
                    }
                    if (req.body.COMPANYNAME) formdata.COMPANYNAME = req.body.COMPANYNAME;
                    if (req.body.ADD1) formdata.ADD1 = req.body.ADD1;
                    if (req.body.TYPE == "address") {
                        formdata.ADD2 = req.body.ADD2;
                    }
                    if (req.body.CITY) formdata.CITY = req.body.CITY;
                    if (req.body.FK_GL_CITY_ID) formdata.FK_GL_CITY_ID = req.body.FK_GL_CITY_ID;
                    if (req.body.STATE) {
                        formdata.STATE = req.body.STATE;
                        if (req.body.FK_GL_STATE_ID) formdata.FK_GL_STATE_ID = req.body.FK_GL_STATE_ID;
                    }
                    if (req.body.zip) formdata.ZIP = req.body.zip;

                    if (req.body.ENABLE_MODIFY_STATUS) formdata.ENABLE_MODIFY_STATUS = req.body.ENABLE_MODIFY_STATUS;
                    if (req.body.HIST_COMMENTS) formdata.HIST_COMMENTS = req.body.HIST_COMMENTS;

                    url = Service.SELLER_USER_UPDATE_URL;
                    var options = {
                        method: 'POST',
                        url: url,
                        form: JSON.stringify(formdata)
                    };

                    GblComFunc.makeRequest(req, res, options, true, false);

                }
                break;
            }

        case '/ajaxrequest/identified/soi/seller/product/add/':
            {
                var post_data = Object.values(req.body)
                var final_response = GblComFunc.doxssHandling(post_data);
                if (final_response.code != 200) {
                    res.status(503).send(final_response);
                } else {
                    var options = {
                        method: 'POST',
                        url: Service.PROD_API_URL,
                        form: JSON.stringify({
                            "item_img_small_500x500": req.body.image_500x500,
                            "in_pc_img_small_500x500_wh": req.body.image_500x500_wh,
                            "item_img_small_1000x1000": req.body.image_1000x1000,
                            "in_pc_img_small_1000x1000_wh": req.body.image_1000x1000_wh,
                            "VALIDATION_KEY": "c44e794a7318ba715530cf81297e2071",
                            "GLUSR_USR_ID": req.body.gluserid,
                            "pcid": "",
                            "cat_id": "",
                            "item_id": "",
                            "item_name":req.body.product1,
                            "item_description": "",
                            "item_img_small": req.body.image_250x250,
                            "item_img_small_125x125": req.body.image_125x125,
                            "item_img_original": req.body.image_Original,
                            "in_pc_item_img_small_wh": req.body.image_250x250_wh,
                            "in_pc_img_small_125x125_wh": req.body.image_125x125_wh,
                            "in_pc_item_img_original_wh": req.body.image_Original_wh,
                            "updated_by": "USER",
                            "last_accessed": "0",
                            "modules": "R-API Product Add\/Edit(NSDMERP)",
                            "MOD_ID": "IMOB",
                            "remote_host":  req.body.ip,
                            "country_name": "India",
                            "param_list": "item_name,in_pc_item_code,item_description,hotnew,item_img_original,item_img_small,item_img_small_125x125,item_img_small_500x500,item_img_small_1000x1000,in_pc_item_img_original_wh,in_pc_item_img_small_wh,in_pc_img_small_125x125_wh,in_pc_img_small_500x500_wh,in_pc_img_small_1000x1000_wh,pcid,last_accessed,referral_url,script_url,in_pc_item_fob_price,in_pc_item_fob_price_currency,in_pc_item_min_order_quantity,in_pc_item_moq_unit_type",
                            "old_mcat_mapping": "",
                            "new_mcat_mapping": "",
                            "hotnew": "D",
                            "script_url": "",
                            "in_pc_item_fob_price": "",
                            "in_pc_item_fob_price_currency": "",
                            "in_pc_item_min_order_quantity": "",
                            "in_pc_item_moq_unit_type": "",
                            "image": "N",
                            "UPDATEDBY_ID": req.body.mobile_num,
                                "AK":req.body.auth_key
                        })
                    };
                    let cbService=Service.PROD_API_URL;
                    GblComFunc.makeRequest(req, res, options, false, false,cbService);
                }
                break;
            }
        case '/ajaxrequest/identified/soi/seller/product/addSecondaryImage/':
            {
                var post_data = Object.values(req.body)
                var final_response = GblComFunc.doxssHandling(post_data);
                if (final_response.code != 200) {
                    res.status(503).send(final_response);
                } else {
                    let body = ''
                    body = {
                        "VALIDATION_KEY": "c44e794a7318ba715530cf81297e2071",
                        "GLUSR_USR_ID": req.body.gluserid,
                        "action_flag": "image",
                        "IN_PC_ITEM_IMAGE_ID": req.body.image_id,
                        "item_id": req.body.item_id,
                        "AK":req.body.auth_key,
                        "updated_by": "USER",
                        "UPDATESCREEN": "Seller Add Product Screen",
                        "ACTION": "I",
                        "IP": req.body.ip,
                        "IP_COUNTRY": req.body.ipCountry,
                        "IN_PC_ITEM_IMAGE_ACCESSED_BY": '',
                        "IN_PC_ITEM_IMAGE_UPDATEDBY_ID": req.body.mobile_num,
                        "IN_PC_ITEM_IMAGE_125X125": req.body.image_125x125,
                        "IN_PC_ITEM_IMAGE_250X250":req.body.image_250x250,
                        "IN_PC_ITEM_IMAGE_500X500": req.body.image_500x500,
                        "IN_PC_ITEM_IMAGE_1000X1000": req.body.image_1000x1000,
                        "IN_PC_ITEM_IMAGE_ORIGINAL": req.body.image_Original,
                        "IN_PC_ITEM_IMAGE_125X125_WD": req.body.image_125x125_width,
                        "IN_PC_ITEM_IMAGE_125X125_HT": req.body.image_125x125_height,
                        "IN_PC_ITEM_IMAGE_250X250_WD": req.body.image_250x250_width,
                        "IN_PC_ITEM_IMAGE_250X250_HT": req.body.image_250x250_height,
                        "IN_PC_ITEM_IMAGE_500X500_WD": req.body.image_500x500_width,
                        "IN_PC_ITEM_IMAGE_500X500_HT": req.body.image_500x500_height,
                        "IN_PC_ITEM_IMAGE_1000X1000_WD": req.body.image_1000x1000_width,
                        "IN_PC_ITEM_IMAGE_1000X1000_HT": req.body.image_1000x1000_height,
                        "IN_PC_ITEM_IMAGE_ORIG_WIDTH": req.body.image_original_width,
                        "IN_PC_ITEM_IMAGE_ORIG_HEIGHT": req.body.image_original_height,
                    }
                    var options = {
                        method: 'POST',
                        url: Service.PROD_API_URL,
                        form: JSON.stringify(body)
                    };
                    let cbService=Service.PROD_API_URL;
                    GblComFunc.makeRequest(req, res, options, false, false,cbService);
                }
                break;
            }
        case '/ajaxrequest/identified/soi/seller/hotleads/':
            {
                var options = {
                    method: 'POST',
                    url: Service.USER_IMUTILS_HOTLEADS_URL,
                    form: {
                        "user_name": req.body.name,
                        "mobile_num": req.body.mobile,
                        "user_company": req.body.companyname,
                        "email": req.body.email,
                        "USR_ID": req.body.USR_ID,
                        "country_iso": 'IN',
                        "user_mobile_country_code": '+91',
                        "token": 'imobile@15061981',
                        "modid": 'IMOB',
                        "UPDATEDBY": 'User',
                        "update_using": 'Sell on Indiamart at Mobile Site',
                        "IP": req.body.IP,
                        "IP_COUNTRY": req.body.IP_COUNTRY,
                        "GEOIP_COUNTRY_ISO": req.body.GEOIP_COUNTRY_ISO

                    }
                };
                let cbService=Service.USER_IMUTILS_HOTLEADS_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/soi/seller/getcitydata':
            {
                var options = {
                    method: 'GET',
                    url: Service.GET_SUGGESTION_URL + '?q=' + req.body.q + '&limit=20&type=city&minStringLengthToFetchSuggestion=' + req.body.minStringLengthToFetchSuggestion + '&updateCache=' + req.body.updateCache + '&fields=' + req.body.fields + '&minStringLengthToDisplaySuggestion=' + req.body.minStringLengthToDisplaySuggestion + '&displayFields=' + req.body.displayFields + '&displaySeparator=' + req.body.displaySeparator + '&recentData=' + req.body.recentData + '&filters=' + req.body.filters,
                    headers: {

                        'content-type': 'application/json'
                    },

                };
                GblComFunc.makeRequest(req, res, options, false, true).then((data) => {
                    res.status(200).send(data);
                }, (error) => {
                    res.status(503).send();
                });
                break;
            }
        case '/ajaxrequest/identified/soi/seller/info/':
        case '/ajaxrequest/identified/messages/seller/info/':
            {
                var options = {
                    method: 'POST',
                    url: Service.SLR_USR_DTL_URL,
                    form: {
                        'glusrid': req.body.glid,
                        'token': 'imobile@15061981',
                        'logo': 1,
                        'modid': 'IMOB',
                        'others': 'ALL'
                    },
                };
                let cbService = Service.SLR_USR_DTL_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/soi/seller/soidropoff/':
            {
                var formdata = {};
                let url = "";
                url = Service.SELLER_ACTIVITY_URL
                var options = {
                    method: 'POST',
                    url: url,
                    form: JSON.stringify({
                        'glusrid': req.body.glid,
                        'mobile': req.body.mobile,
                        'listing_source': req.body.listing_source,
                        'modid': 'IMOB',
                        'VALIDATION_KEY': req.body.validation_key
                    })

                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }
        case '/ajaxrequest/identified/soi/seller/soiuserlogs/':
            {
                try {
                    var date = new Date().toISOString().slice(0, 10);
                    var logfile_timeout = fs.createWriteStream('/tmp/Sell0nIndiamart-log-' + date + '.txt', { flags: 'a' });
                    logfile_timeout.write('{ gluserid:' + req.body.gluserid + ' ,usertype: ' + req.body.usertype + ' ,page_event:' + req.body.pageevent + ' ,flag:' + req.body.flag + ' ,timestamp:' + new Date().toLocaleString() + '}' + '\n');
                }
                catch (error) { }
                res.status(200).send({ 'status': 'success' });
                break;
            }
        case '/ajaxrequest/identified/soi/seller/getgst/':
            {
                var options = {
                    method: 'POST',
                    url: Service.SLR_OTR_DTL_URL,
                    form: {
                        'glusrid': req.body.glid,
                        modid: 'IMOB',
                        token: 'imobile@15061981',
                        type: 'CompRgst',
                    },
                };
                let cbService = Service.SLR_OTR_DTL_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/soi/seller/addGST/':
            {
                var post_data = Object.values(req.body)
                var final_response = GblComFunc.doxssHandling(post_data);
                if (final_response.code != 200) {
                    res.status(503).send(final_response);
                } else {
                    let url = "";
                    url = Service.SELLER_DETAILS_URL;
                    var options = {
                        method: 'POST',
                        url: url,
                        form: JSON.stringify({
                            type: req.body.type,
                            VALIDATION_KEY: req.body.VALIDATION_KEY,
                            glusridval: req.body.glusridval,
                            GST: req.body.GST,
                            updatedbyId: req.body.updatedbyId,
                            updatedby: req.body.updatedby,
                            updatedbyScreen: req.body.updatedbyScreen,
                            userIp: req.body.userIp,
                            userIpCoun: req.body.userIpCoun
                        })
                    };
                   
                    GblComFunc.makeRequest(req, res, options, true, false);
                }
                break;
            }
            case '/ajaxrequest/identified/soi/seller/addPAN/':
            case '/ajaxrequest/editprofile/addPAN/':
            {
                var post_data = Object.values(req.body)
                var final_response = GblComFunc.doxssHandling(post_data);
                if (final_response.code != 200) {
                    res.status(503).send(final_response);
                } else {
                    let url = "";
                    url = Service.SELLER_DETAILS_URL;
                    var options = {
                        method: 'POST',
                        url: url,
                        form: JSON.stringify({
                            type: req.body.type,
                            VALIDATION_KEY: req.body.VALIDATION_KEY,
                            glusridval: req.body.glusridval,
                            pan_no: req.body.pan_no,
                            updatedbyId: req.body.updatedbyId,
                            updatedby: req.body.updatedby,
                            updatedbyScreen: req.body.updatedbyScreen,
                            userIp: req.body.userIp,
                            userIpCoun: req.body.userIpCoun
                        })
                    };
                   
                    GblComFunc.makeRequest(req, res, options, true, false);
                }
                break;
            }
        case '/ajaxrequest/identified/soi/seller/addIec/':
            {
                var post_data = Object.values(req.body)
                var final_response = GblComFunc.doxssHandling(post_data);
                if (final_response.code != 200) {
                    res.status(503).send(final_response);
                } else {
                    let url = "";
                    url = Service.SELLER_DETAILS_URL;
                    var options = {
                        method: 'POST',
                        url: url,
                        form: JSON.stringify({
                            type: req.body.type,
                            VALIDATION_KEY: req.body.VALIDATION_KEY,
                            glusridval: req.body.glusridval,
                            iec_code: req.body.IEC,
                            updatedbyId: req.body.updatedbyId,
                            updatedby: req.body.updatedby,
                            updatedbyScreen: req.body.updatedbyScreen,
                            userIp: req.body.userIp,
                            userIpCoun: req.body.userIpCoun
                        })
                    };

                    GblComFunc.makeRequest(req, res, options, true, false);
                }
                break;
            }

        /*-----------Edit Profile------------------- */
        case '/ajaxrequest/editprofile/profilesubmit':
            {
              

               var options = {
                   method: 'POST',
                   url: Service.SELLER_USER_UPDATE_URL,
                   form: JSON.stringify(req.body)
               };
                console.log(options.url);
               request(options, function (error, response, body) {
                   if (error) {
                       res.status(200).send({});
                   }
                   else {
                       res.status(200).send(body);
                   }
               });
              
               break;

            } 
         case '/ajaxrequest/editprofile/checkExistingUser':
             {
               var options = {
                   method: 'POST',
                   url: Service.USER_IDENTIFY_URL,
                   form: JSON.stringify(req.body)
               };
               request(options, function (error, response, body) {
                   if (error) {
                       res.status(200).send({});
                   }
                   else {
                       res.status(200).send(body);
                   }
               });
               
               break;

             }

             case '/ajaxrequest/editprofile/verifyDetail/':
               {
                   var options = {
                       method: 'POST',
                       url: Service.SLR_VRFY_DTL_URL,
                       form: {
                           'glusrid': req.body.glid,
                           'token': 'imobile@15061981',
                           'attribute_id': req.body.id,
                           'modid': 'IMOB',
                           'userverified': 1
                       }
                   };
                   let cbService = Service.SLR_VRFY_DTL_URL;
                   GblComFunc.makeRequest(req, res, options, false, false,cbService);
                   break;
               }
             case '/ajaxrequest/editprofile/addGST/':
           {
               var post_data = Object.values(req.body)
               var final_response = GblComFunc.doxssHandling(post_data);
               if (final_response.code != 200) {
                   res.status(503).send(final_response);
               } else {
                   let url = "";
                   url =Service.SELLER_DETAILS_URL;
                   var options = {
                       method: 'POST',
                       url: url,
                       form: JSON.stringify({
                           type: req.body.type,
                           VALIDATION_KEY: req.body.VALIDATION_KEY,
                           glusridval: req.body.glusridval,
                           GST: req.body.GST,
                           updatedbyId: req.body.updatedbyId,
                           updatedby: req.body.updatedby,
                           updatedbyScreen: req.body.updatedbyScreen,
                           userIp: req.body.userIp,
                           userIpCoun: req.body.userIpCoun,
                           AK:req.body.ak
                       })
                   };

                   GblComFunc.makeRequest(req, res, options, true, false);
               }
               break;
           }
            case '/ajaxrequest/editprofile/addCIN/':
            case '/ajaxrequest/identified/soi/seller/addCIN':
               {
                   var post_data = Object.values(req.body)
                   var final_response = GblComFunc.doxssHandling(post_data);
                   if (final_response.code != 200) {
                       res.status(503).send(final_response);
                   } else {
                       let url = "";
                       url = Service.SELLER_DETAILS_URL;
                       var options = {
                           method: 'POST',
                           url: url,
                           form: JSON.stringify({
                               type: req.body.type,
                               VALIDATION_KEY: req.body.VALIDATION_KEY,
                               glusridval: req.body.glusridval,
                               cin_no: req.body.cin_no,
                               updatedbyId: req.body.updatedbyId,
                               updatedby: req.body.updatedby,
                               updatedbyScreen: req.body.updatedbyScreen,
                               userIp: req.body.userIp,
                               userIpCoun: req.body.userIpCoun,
                               AK:req.body.ak
                           })
                       };
   
                       GblComFunc.makeRequest(req, res, options, true, false);
                   }
                   break;
               }
               case '/ajaxrequest/editprofile/otpGen':
                   {   
                       const requestIp = require('@supercharge/request-ip');
                       var data=req.body;
                       let UserIp = requestIp ? requestIp.getClientIp(req) : '';
                       data.user_ip=data.user_ip || UserIp;
                       var options = {
                           method:'POST',
                           url: Service.OTP_VERIFICATION_URL,
                           form:data
                       };
                       let cbService = Service.OTP_VERIFICATION_URL;
                       GblComFunc.makeRequest(req, res, options, true,false,cbService);
                       break;
                   }
                   case '/ajaxrequest/editprofile/otpVer':
                   {
                       var options = {
                           method:'POST',
                           url: Service.OTP_VERIFICATION_URL,
                           form:req.body
                       };
                       let cbService = Service.OTP_VERIFICATION_URL;
                       GblComFunc.makeRequest(req, res, options, true,false,cbService);
                       break;
                   }

                   case '/ajaxrequest/editprofile/otpVerification':
           {
               const requestIp = require('@supercharge/request-ip');
               let clientUserIp = requestIp ? requestIp.getClientIp(req) : '';
               if (req.body.ciso == 'IN') {
                   if (req.body.emailVerify == "") {
                       var options = {
                           method: 'POST',
                           url: Service.OTP_VERIFICATION_URL,
                           form: {
                               mobile_num: req.body.user,
                               user_mobile_country_code: '91',
                               token: 'imobile@15061981',
                               modid: 'IMOB'
                           }
                       };
                   }
               if (req.body.type == "OTPGEN" && req.body.OTPResend) {
                   options.form.OTPResend = 1;
               }
               if (req.body.ciso == 'IN') {
                   if (req.body.type == "OTPGEN") {
                       options.form.flag = "OTPGen";
                       options.form.user_ip = req.body.userIp || clientUserIp;
                       options.form.user_country = 'IN';
                       options.form.process = req.body.source?req.body.source:"OTP_JoinFreeForm_IMOB";
                       options.form.user_updatedusing = req.body.screenName ? req.body.screenName : 'SIGNUP_IMOB';
                       options.form.msg_key = req.body.msg_key;
                       options.form.mobile_num = req.body.user;
                       options.form.attribute_id = req.body.attribute_id;
                       options.form.verify_screen = "IMOB EDIT PROFILE";
                       options.form.verify_process = "mobile"; 
                       options.form.glusrid = req.body.glusr_id;
               
                   } else if (req.body.type == "OTPVER") {
                       options.form.flag = "OTPVer";
                       options.form.glusrid = req.body.glusr_id;
                       options.form.auth_key = req.body.authCode;
                       options.form.attribute_id = req.body.attribute_id;
                       options.form.verify_screen = "IMOB EDIT PROFILE";
                       options.form.verify_process = "mobile";
                       options.form.user_ip = req.body.userIp || clientUserIp;
                   }
                     else if (req.body.type == "OTPCHECK")
                     {
                       options.form.flag = "OTPCheck";
                       options.form.glusrid = req.body.glusr_id;
                       options.form.auth_key = req.body.authCode;
                       options.form.attribute_id = req.body.attribute_id;
                       options.form.verify_screen = "IMOB EDIT PROFILE";
                       options.form.verify_process = "mobile";
                       options.form.user_ip = req.body.userIp || clientUserIp;
                     }
               }
               let cbService = Service.OTP_VERIFICATION_URL;
               GblComFunc.makeRequest(req, res, options, false, false,cbService);
               break;
       
           }
       }
       
                   case '/ajaxrequest/changepass':
                       {
                           var post_data = Object.values(req.body)
                           var final_response = GblComFunc.doxssHandling(post_data);
                           if (final_response.code != 200) {
                               res.status(503).send(final_response);
                           } else {
                               let url = "";
                               url = Service.USER_CHANGE_PASSWORD;
                               //"https://login.indiamart.com/user/changepassword";
                               var options = {
                                   method: 'POST',
                                   url: url,
                                   form: JSON.stringify({
                                       glusrid: req.body.glusrid,
                                       modid: "IMOB",
                                       att_id: req.body.att_id, 
                                       pass: req.body.pass,
                                       auth_key : req.body.auth_key,
                                       new_pass_reenter : req.body.new_pass_reenter,
                                       iso : req.body.iso,
                                       user_ip : req.body.user_ip,
                                       process : "Mobile_ForgetPassword",
                                       verify_screen : "Mobile Change Password Page"
                                   })
                               };
           
                               GblComFunc.makeRequest(req, res, options, true, false);
                           }
                           break;
                       } 

        case '/ajaxrequest/LogOut':
        {
            var options = {
                method: 'POST',
                url: Service.LOGOUT,
                form: req.body
            };
            GblComFunc.makeRequest(req, res, options, false, false,"", 1);
            break;
        }
       /*-------------------EditProfileEnd--------------------------*/
        case '/ajaxrequest/identified/verification/verificationBlocker':
            {
                var options = {
                    method: 'POST',
                    url: Service.SLR_USR_DTL_URL,
                    form: {
                        'glusrid': req.body.glid,
                        'token': 'imobile@15061981',
                        'logo': 1,
                        'modid': 'IMOB',
                        'others': 'glusr_biz_type,gl_turnover_val'
                    }

                };
                GblComFunc.makeRequest(req, res, options, false, false,"", 1);
                break;
            }
        case '/ajaxrequest/identified/widgets/premium/':
            {
                if (mode && mode == '1') {
                    var options = {
                        method: 'POST',
                        url: Service.RECOMMENDED_GET_BIGBRAND_URL,
                        form: {
                            glusrId: req.body.glusrid,
                            gid: req.body.ga,
                            mode: '2',
                            modid: 'IMOB',
                            count: '10',
                        }
                    };

                } else if (mode && mode == '2') {
                    {
                        var options = {
                            method: 'POST',
                            url: Service.RECOMMENDED_GET_BIGBRAND_URL,
                            form: {
                                glusrId: req.body.glusrid,
                                mode: '3',
                                modid: 'IMOB',
                                count: '10',
                            }

                        };
                    }

                }
                let cbService = Service.RECOMMENDED_GET_BIGBRAND_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;

            }
        case '/ajaxrequest/identified/widgets/recentData/':
            {
                if (mode == 0) {
                    var options = {
                        method: 'POST',
                        url: Service.RECOMMENDED_GET_ATTRIBUTES_URL,
                        form: {
                            modid: 'IMOB',
                            mode: '1',
                            gid: req.body.gid
                        }

                    };
                } else if (mode == 1) {
                    var options = {
                        method: 'POST',
                        url: Service.RECOMMENDED_GET_ATTRIBUTES_URL,
                        form: {
                            modid: 'IMOB',
                            mode: '2',
                            gid: req.body.gid,
                            glusrId: req.body.glid
                        }
                    };
                } else if (mode == 2) {
                    {
                        var options = {
                            method: 'POST',
                            url: Service.RECOMMENDED_GET_ATTRIBUTES_URL,
                            form: {
                                glusrId: req.body.glid,
                                mode: '3',
                                modid: 'IMOB',
                                count: '10',
                            }

                        };

                    }

                }
                let cbService = Service.RECOMMENDED_GET_ATTRIBUTES_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }

        //Not In Use
        case '/ajaxrequest/identified/widgets/cityMcats/':
            {
                var options = {
                    method: 'GET',
                    url: Service.RECOMMENDED_GET_CITYRECOMMENDATION_URL + req.body.glusrid + "/cid/" + req.body.cid + "/count/" + req.body.count + "/modid/IMOB",

                    headers: {

                        'content-type': 'application/json'
                    },
                };
                let cbService = Service.RECOMMENDED_GET_CITYRECOMMENDATION_URL;
                request(options, function (error, response, body) {
                    if (error) { res.status(503).send(); }
                    else {
                        res.send(body);
                    }
                });
                break;
            }
        case '/ajaxrequest/identified/widgets/recommendedmcatidentified/':
        case '/ajaxrequest/identified/Search/recommendedmcatidentified/':
            {
                var options = {
                    method: 'POST',
                    url: Service.RECOMMENDED_GET_RECOMMENDDATA_URL,
                    form: {
                        glusrId: req.body.glusrid,
                        mode: '3',
                        modid: 'IMOB',
                        count: '10',
                        type: '1'
                    }

                };
                let cbService = Service.RECOMMENDED_GET_RECOMMENDDATA_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;

            }
        case '/ajaxrequest/identified/soi/verifyDetail/':
            {
                var options = {
                    method: 'POST',
                    url: Service.SLR_VRFY_DTL_URL,
                    form: {
                        'glusrid': req.body.glid,
                        'token': 'imobile@15061981',
                        'attribute_id': req.body.id,
                        'modid': 'IMOB',
                        'userverified': 1
                    }
                };
                let cbService = Service.SLR_VRFY_DTL_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/soi/verifyEmailWithoutOtp/':
            {
                let url = '';
                url = Service.SELLER_USER_VERIFICATION_URL;
                var options = {
                    method: 'POST',
                    url: url,
                    form: JSON.stringify(
                        {
                            "VALIDATION_KEY": "c44e794a7318ba715530cf81297e2071",
                            "action_flag": "SP_VERIFY_ATTRIBUTE",
                            "GLUSR_USR_ID": req.body.GLUSR_USR_ID,
                            "ATTRIBUTE_ID": "109",
                            "ATTRIBUTE_VALUE": req.body.ATTRIBUTE_VALUE,
                            "VERIFIED_BY_ID": "",
                            "VERIFIED_BY_NAME": "",
                            "VERIFIED_BY_AGENCY": "Mail_Google",
                            "VERIFIED_BY_SCREEN": "IMOB_SOI_Personal_Details",
                            "VERIFIED_URL": null,
                            "VERIFIED_IP": req.body.VERIFIED_IP,
                            "VERIFIED_IP_COUNTRY": req.body.VERIFIED_IP_COUNTRY,
                            "VERIFIED_COMMENTS": "Following Data Has Been Verified Through google gmail Process",
                            "VERIFIED_AUTHCODE": null,
                            "MODID": "IMOB"
                        }
                    )
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }
        case '/ajaxrequest/identified/soi/addGstDisposition/': {
            let url = '';
            url = Service.SELLER_GST_DISPOSITION_URL;
            var options = {
                method: 'POST',
                url: url,
                form: JSON.stringify({
                    "GLID": req.body.GLID,
                    "ATTRIBUTE_NAME": req.body.ATTRIBUTE_NAME,
                    "DISPOSITION": req.body.DISPOSITION,
                    "MASTER_ID": req.body.MASTER_ID,
                    "VALIDATION_KEY": "764191e1d408f0397cb9009520e1b861"
                })

            };
            GblComFunc.makeRequest(req, res, options, true, false);
            break;
        }
        case '/ajaxrequest/identified/soi/getGstDisposition/': {
            let url = '';
            url = Service.SLR_GST_READ_DISPOSITION_URL;
            var options = {
                method: 'POST',
                url: url,
                form: {

                    "token": "imobile@15061981",
                    "modid": "IMOB",
                    "glid": req.body.glid,
                    "attribute_name": "GST",
                    "all": "1"
                },
            };
            let cbService = Service.SLR_GST_READ_DISPOSITION_URL;
            GblComFunc.makeRequest(req, res, options, false, false,cbService);
            break;
        }
        case '/ajaxrequest/identified/soi/soiDbTracking/': {
            let url = '';
            let formdata = {};
            if (req.body.LOG_ID) formdata.LOG_ID = req.body.LOG_ID;
            if (req.body.GLID) formdata.GLID = req.body.GLID;
            if (req.body.MOBILE) formdata.MOBILE = req.body.MOBILE;
            if (req.body.FCP_STATUS) formdata.FCP_STATUS = req.body.FCP_STATUS;
            if (req.body.CUSTTYPE_ID) formdata.CUSTTYPE_ID = req.body.CUSTTYPE_ID;
            if (req.body.JOURNEY_COMPLETED) formdata.JOURNEY_COMPLETED = req.body.JOURNEY_COMPLETED;
            if (req.body.BEST_TIME_TO_CALL) formdata.BEST_TIME_TO_CALL = req.body.BEST_TIME_TO_CALL;
            if (req.body.IS_USR_NAME != '') formdata.IS_USR_NAME = req.body.IS_USR_NAME;
            if (req.body.IS_COMPANYNAME != '') formdata.IS_COMPANYNAME = req.body.IS_COMPANYNAME;
            if (req.body.IS_EMAIL != '') formdata.IS_EMAIL = req.body.IS_EMAIL;
            if (req.body.PROD_CNT != '') formdata.PROD_CNT = req.body.PROD_CNT;
            if (req.body.IS_ADDRESS != '') formdata.IS_ADDRESS = req.body.IS_ADDRESS;
            if (req.body.IS_GST != '') formdata.IS_GST = req.body.IS_GST;

            formdata.MODID = req.body.MODID;
            formdata.VALIDATION_KEY = "c44e794a7318ba715530cf81297e2071";
            url = Service.SELLER_DB_TRACKING_URL;
            var options = {
                method: 'POST',
                url: url,
                form: JSON.stringify(formdata)

            };
            GblComFunc.makeRequest(req, res, options, false, false);
            break;
        }
        case '/ajaxrequest/identified/tncacceptance/':
            {
                var options = {
                    method: 'POST',
                    url: Service.FOREIGN_TNCACCEPTANCE_URL,
                    form: JSON.stringify({
                        "MODID": "IMOB",
                        "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269",
                        "USER_AGENT": req.body.USER_AGENT,
                        "IP": req.body.IP,
                        "IP_COUNTRY": req.body.IP_COUNTRY,
                        "IP_COUNTRY_ISO": req.body.IP_COUNTRY_ISO,
                        "USR_ID": req.body.USR_ID
                    })

                };
                GblComFunc.makeRequest(req, res, options, false, false);
                break;
            }
        case '/ajaxrequest/identified/messages/unreadMessage':
            {
                var options = {
                    method: 'POST',
                    url: Service.MSG_UNREAD_COUNT_URL,
                    form: JSON.stringify({
                        "modid": "IMOB",
                        "glusrid": req.body.glid
                    })

                };
                let cbService = Service.MSG_UNREAD_COUNT_URL;
                GblComFunc.makeRequest(req, res, options, false, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/messages/unreadList':
                {
                var options = {
                    method: 'POST',
                    url: Service.MSG_UNREAD_LIST_URL,
                    form: JSON.stringify({
                        "modid": req.body.modid,
                        "glusrid": req.body.glusrid,
                        "start": req.body.start,
                        "end" : req.body.end 
                        })
                };
                let cbService = Service.MSG_UNREAD_LIST_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }
            case '/ajaxrequest/identified/messages/starMark':
                {
                    var options = {
                        method: 'POST',
                        url: Service.STAR_LIST_URL,
                        form: JSON.stringify({
                            "glusrid": req.body.glusrid,
                            "contact_glid": req.body.contact_id,
                            "modid": req.body.modid,
                            "markLead": req.body.markLead,
                            "last_contact_date":req.body.date

                        })
                    };
                    GblComFunc.makeRequest(req, res, options, true, false);
                    break;
                }    
        case '/ajaxrequest/identified/messagecenter/readReceipt':
            {
                var options = {
                    method: 'POST',
                    url: Service.MSG_READ_URL,
                    form: JSON.stringify({
                        'user_glid': req.body.user_glid,
                        'contact_glid': req.body.contact_glid,
                        'modid': req.body.modid,
                        "message_ref_modid":req.body.message_ref_modid,
                        "msg_ref_type":req.body.msg_ref_type
                    })
                };
                let cbService = Service.MSG_READ_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }
        case '/ajaxrequest/identified/soi/getGstDispositionList/':
            {
                var options = {
                    method: 'POST',
                    url: Service.SLR_GST_DISPOSITIONS_LIST_URL,
                    form: {
                        "token": "imobile@15061981",
                        "detail_from": "Disposition",
                        "modid": "IMOB"
                    }
                };
                let cbService = Service.SLR_GST_DISPOSITIONS_LIST_URL;
                GblComFunc.makeRequest(req, res, options, false,false,cbService);
                break;
            }
        case '/ajaxrequest/identified/messagecenter/callC2C/':
        case '/ajaxrequest/identified/call/':
            {
                
                var options = {
                    method: 'POST',
                    url: Service.C2CTRACK_URL,
                    body: JSON.stringify(req.body)
                 
                };
  
                GblComFunc.makeRequest(req, res, options, false, true).then(
                (data) => {
                    res.set("Supplier_GLID",req && req.body && req.body.C2C_RECEIVER_GLUSR_ID?req.body.C2C_RECEIVER_GLUSR_ID:"");
                    res.status(200).send(data);
                },
                (error) => {
                    res.status(200).send({});
                }
                );

                break;
            }

        case '/ajaxrequest/identified/messages/submitRating/':
            {
                const requestIp = require('@supercharge/request-ip');
                var userIp = requestIp ? requestIp.getClientIp(req) : '';
                var options = {
                    method: 'POST',
                    url: Service.SUPPLIER_RATING_URL,
                    body: JSON.stringify({
                        "SUPPLIER_ID": req.body.seller_id,
                        "BUYER_ID": req.body.buyer_id,
                        "RATING_VAL": req.body.rating_val,
                        "RATING_COMMENTS": req.body.rating_comments,
                        "RATING_INFLU_PARAMS": req.body.influ_param,
                        "RATING_IMGS": req.body.img_option,
                        "BS_RATING_TYPE" : req.body.BS_RATING_TYPE,
                        "RATING_MODID": req.body.Mod_id,
                        "UPDATEDBY": "USER",
                        "UPDATEDUSING": "MOBILE",
                        "RATING_TYPE": req.body.rating_type,
                        "RATING_SOURCE": -111,
                        "RATING_PARAMETER": "",
                        "MODREF_ID": req.body.MODREF_ID,
                        "MODREF_TYPE":req.body.MODREF_TYPE,
                        "DISPLAY_STATUS": 0,
                        "VALIDATION_KEY": "5cca91f15b8c8ddd91c0fc7abfebc0c7",
                        "IP": req.body.IP,
                        "IP_COUNTRY": req.body.IP_COUNTRY,
                        "RATING_IP": userIp ? userIp : req.body.IP,
                        "RATING_MCAT_ID": req.body.mcatId,
                        "RATING_MCAT_NAME": req.body.mcatName,
                        "RATING_MODREF_NAME": req.body.prodName
                    })

                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }
        case '/ajaxrequest/identified/messagecenter/chatUser/':
            {
                var options = {
                    method: 'POST',
                    url: Service.CHAT_CREATE_USER_URL,
                    form: JSON.stringify({ 'userid': req.body.userid, 'modid': 'IMOB' })
                };
                let cbService = Service.CHAT_CREATE_USER_URL;
                GblComFunc.makeRequest(req, res, options, true, false,cbService);
                break;
            }
            case '/ajaxrequest/company/whatsapp/':
            case '/ajaxrequest/productdetail/whatsapp/':
        {
                let formparams=req.body;
                var options = {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: 'POST',
                    url:"http://lms.imutils.com/whatsapp/captureWhatsappAttempt/",
                    timeout: 5000,
                    form: JSON.stringify({
                        "sender_glid":formparams.sender_glid?formparams.sender_glid:'',
                        "sender_account_mobile":formparams.sender_number?formparams.sender_number:'',
                        "receiver_glid":formparams.rec_glid?formparams.rec_glid:'',
                        "receiver_account_mobile":formparams.rec_contact?formparams.rec_contact:'',
                        "modid":'IMOB',
                        "modrefid":formparams.modrefid?formparams.modrefid:'',
                        "reference_url":'',
                        "reference_text":'WhatsApp',
                        "reference_actual_url":'',
                        "reference_current_url":'',
                        "sender_ip":formparams.sender_ip?formparams.sender_ip:'',
                        "sender_country":formparams.sender_country?formparams.sender_country:'',
                        "catid":formparams.catid?formparams.catid:'',
                        "mcatid":formparams.mcat_id?formparams.mcat_id:'',
                        "modref_type":'',
                        "modref_name":formparams.modrefname?formparams.modrefname:'',
                        "login_mode":formparams.loginModes?formparams.loginModes:'',
                        "receiver_account_number_type":formparams.numbertype?formparams.numbertype:'',
                        "click_useragent":formparams.sender_user_agent?formparams.sender_user_agent:'',
                        "page_type":formparams.pagetype?formparams.pagetype:'',
                        "click_at":"WhatsApp",
                    })
                }
                let cbService = "http://lms.imutils.com/whatsapp/captureWhatsappAttempt/";
                GblComFunc.makeRequest(req, res, options, true, false,cbService,true);
                break;
        }
        case '/ajaxrequest/company/formSubmit':
            {
                try {
                    let formParams = req.body;
                    const { S_glusr_id, S_email, S_name, S_phone, S_organization, Description, S_current_url, IP, IP_COUNTRY } = formParams;

                    var options = {
                        headers: {
                            "Content-type": "application/json",
                        },
                        method: 'POST',
                        url: Service.COMPANY_SAVE_ENQUIRY,
                        timeout: 5000,
                        form: JSON.stringify({
                            "sender_id": '',
                            "remote_host": '',
                            "country_name": IP_COUNTRY,
                            "comp_id": '',
                            "recipient": 'qcsite@indiamart.com',
                            "gluser_id": S_glusr_id,
                            "sender_hash":
                            {
                                "S_glusr_id": S_glusr_id,
                                "S_email": S_email ? S_email : '',
                                "S_name": S_name ? S_name : '',
                                "S_phone": S_phone ? S_phone : '',
                                "S_mobile": S_phone ? S_phone : '',
                                "S_organization": S_organization ? S_organization : '',
                                "S_fax": '',
                                "S_city": '',
                                "S_state": '',
                                "S_pin": '',
                                "Description": Description ? Description : '',
                                "S_referer": '',
                                "S_subject": '',
                                "S_current_url": S_current_url ? S_current_url : '',
                                "S_actual_ref_url": '',
                                "S_reference_text": '#franchisee',
                                "Send_mail_to_receiver": 'Yes'
                            },
                            "user_hash": {
                                "S_phone_area_code": '',
                                "S_email": S_email ? S_email : '',
                                "S_phone": S_phone ? S_phone : '',
                                "S_mobile": S_phone ? S_phone : '',
                                "S_lname": S_name ? S_name : '',
                                "S_city": '',
                                "S_state": '',
                                "S_pin": '',
                                "S_name": S_name ? S_name : '',
                                "S_organization": S_organization ? S_organization : '',
                                "S_phone_country_code": '',
                                "S_mobile_country_code": '',
                                "Website": '',
                                "S_streetaddress": '',
                                "S_referrer": '',
                                "country_iso": '',
                                "S_salute": '',
                                "S_Query_Modid": 'MDC',
                                "S_Remote_Host": '',
                                "S_IP_Country": IP
                            },
                            "query": {
                                "modid": 'MDC',
                                "modrefid": S_glusr_id,
                                "modreftype": 1,
                                "query_ref_url": '',
                                "query_ref_text": '#franchisee',
                                "query_actual_url": '',
                                "query_ref_cur_url": S_current_url ? S_current_url : '',
                                "other": "",
                                "CGI": '',
                                "manage_user": 'Yes'
                            }
                        }),
                    };
                    let cbService = Service.COMPANY_SAVE_ENQUIRY;
                    GblComFunc.makeRequest(req, res, options, true, false,cbService);
                }
                catch (e) {
                    console.log(e);
                    res.send({ 'status': 'failed' })
                }

                break;
            }

        case '/ajaxrequest/identified/messagecenter/suggestiveReply/':
            {
                var options = {
                    headers: {
                        "Content-type": "application/json",
                        "username": "2uOHcJu0A89LvuOrB5MqKgxVvHCmSIuj"
                    },
                    method: 'POST',
                    url: Service.SUGGESTIVE_REPLY_URL,
                    timeout: 5000,
                    form: JSON.stringify({
                        "modid": "IMOB",
                        "loggedin_glid":req.body.loggedin_glid,
                        "contact_user_glid":req.body.contact_user_glid,
                    }),
                };
                let cbService=Service.SUGGESTIVE_REPLY_URL;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }

        case '/ajaxrequest/identified/messagecenter/suggestiveReply/': 	
        {	
            let mlData = JSON.parse(req.body.mlData);            
            var options = {	
                headers: {
                    "Content-type": "application/json",
                    "username": "2uOHcJu0A89LvuOrB5MqKgxVvHCmSIuj"
                  },
                method:'POST',	
                url: Service.SUGGESTIVE_REPLY_URL,	
                timeout:5000,
                form:JSON.stringify({ 
                    "enquiry_id": mlData.enquiry_id,      
                    "product_id": mlData.product_id,
                    "enquiry": mlData.enquiry,
                    "initiated_by": mlData.initiated_by,               
                    "modid":"IMOB",                               
                    "messages":mlData.messages
                }),                	
            };
            GblComFunc.makeRequest(req, res, options, true);                     
            break;	
        }

        case '/ajaxrequest/identified/messages/getResponseRate':
            {
                let options = {
                    method: 'POST',
                    url: Service.MSG_GET_RESPONSE_RATE,
                    form: JSON.stringify({
                        "glusrid": req.body.glusrid,
                        "modid": req.body.modid,
                    })
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }

        case '/ajaxrequest/identified/messages/blockUser':
            {
                let options = {
                    method: 'POST',
                    url: Service.BLOCK_USER_URL,
                    form: JSON.stringify({
                        "user_glid": req.body.user_glid,
                        "blocked_glid": req.body.blocked_glid,
                        "blocked_status": req.body.blocked_status,
                        "modid": 'IMOB',
                        "user_ip" : req.body.user_ip,
                        "VALIDATION_KEY" : "416c1d2f1c6918e6af41c2f3f1a53f97"
                    })
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }

        case "/ajaxrequest/identified/messages/getMcatDetails":
            {
                let options = {
                    method: 'POST',
                    url: Service.USER_NI_UNIT_URL + '?modid=IMOB&token=immenu@7851&mcatid=' + req.body.mcatid
                };
                GblComFunc.makeRequest(req, res, options, false, false);
                break;
            }
            
        case '/ajaxrequest/identified/messages/createTemplate':
            {
                let options = {
                    method: 'POST',
                    url: Service.CREATE_TEMPLATE,
                    form: JSON.stringify({
                        "glusrid": req.body.glusrid,
                        "modid": req.body.modid,
                        "template_label": req.body.template_label ,
                        "template_desc": req.body.template_desc,
                        "template_order": "0",
                    })
                };
                GblComFunc.makeRequest(req, res, options, true, false);
                break;
            }

            case '/ajaxrequest/identified/messages/getTemplate':
                {
                    let options = {
                        method: 'POST',
                        url: Service.GET_TEMPLATE,
                        form: JSON.stringify({
                            "glusrid": req.body.glusrid,
                            "modid": req.body.modid,
                            "type" :"0",
                        })
                    };
                    GblComFunc.makeRequest(req, res, options, true, false);
                    break;
                }
                case '/ajaxrequest/identified/messages/ratingUsefulness':
                {
                    let options = {
                        method: 'POST',
                        url: Service.RATING_USEFULNES_URL,
                        form: JSON.stringify({
                            "GLUSR_ID": req.body.GLUSR_ID,
                            "RATING_ID": req.body.RATING_ID,
                            "IS_HELPFUL":1,
                            "SOURCE_ID":41,
                            "IP":req.body.IP,
                            "IP_COUNTRY":req.body.IP_COUNTRY,
                            "VALIDATION_KEY": "764191e1d408f0397cb9009520e1b861",
                        })
                    };
                    GblComFunc.makeRequest(req, res, options, true, false);
                    break;
                }   

        /*************************************************************************************************/            
        /*                                  ENQUIRY BL START           
        /*************************************************************************************************/
        
        
        case '/ajaxrequest/enquirybl/user/login':
        case   '/ajaxrequest/callnow/identify':
        case '/ajaxrequest/truecaller/user/login':
        {
            var options = {
                method:'POST',
                url: Service.ENQUIRYBL_USER_IDENTIFY_URL,
                form:req.body
            };
            let cbService = Service.ENQUIRYBL_USER_IDENTIFY_URL;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/enquirybl/truecaller/polling':
        case '/ajaxrequest/identified/messages/truecaller/polling':
        case '/ajaxrequest/identified/callnow/truecaller/polling':
        case '/ajaxrequest/identified/centralisepopup/truecaller/polling':
            {
                const requestIp = require('@supercharge/request-ip');
                var data = req.body;
                let UserIp = requestIp ? requestIp.getClientIp(req) : '';
                data.ip = data.ip || UserIp;
                data.modid = "IMOB";
                data.isFullLogin = "True";
                var options = {
                    method:'POST',
                    url: Service.ENQUIRYBL_TRUECALLER_POLL,
                    form:data
                };
                let cbService = Service.ENQUIRYBL_TRUECALLER_POLL;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
        }
        case '/ajaxrequest/identified/truecaller/polling':
            {
                var options = {
                    method:'POST',
                    url: Service.ENQUIRYBL_TRUECALLER_POLL,
                    form:req.body
                };
                let cbService = Service.ENQUIRYBL_TRUECALLER_POLL;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
        }
        case '/ajaxrequest/enquirybl/user/loginwithgoogle_first/': {
            var options = {
                method:'POST',
                url: Service.ENQUIRYBL_LOGIN_WITH_GOOGLE,
                form:req.body
            };
            let cbService = Service.ENQUIRYBL_LOGIN_WITH_GOOGLE;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/identified/messages/loginwithgoogle':
        {
            var options = {
                method:'POST',
                url: Service.ENQUIRYBL_LOGIN_WITH_GOOGLE,
                form:req.body
            };
            let cbService = Service.ENQUIRYBL_LOGIN_WITH_GOOGLE
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/identified/messages/getFullLoginData':
            {
                var options = {
                    method:'POST',
                    url: Service.LOGIN_WITH_SMS,
                    form:req.body
                };
                let cbService = Service.LOGIN_WITH_SMS
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }
        case '/ajaxrequest/enquirybl/setISQ':
        {
            var options = {
                method:'POST',
                url: Service.SET_ISQ,
                form:req.body
            };
            let cbService=Service.SET_ISQ;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }

        case '/ajaxrequest/enquirybl/otpGen':
        {   
            const requestIp = require('@supercharge/request-ip');
            var data=req.body;
            let UserIp = requestIp ? requestIp.getClientIp(req) : '';
            data.user_ip=data.user_ip || UserIp;
            var options = {
                method:'POST',
                url: Service.OTP_VERIFICATION_URL,
                form:data
            };
            let cbService = Service.OTP_VERIFICATION_URL;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/enquirybl/otpVer':
        {
            var options = {
                method:'POST',
                url: Service.OTP_VERIFICATION_URL,
                form:req.body
            };
            let cbService = Service.OTP_VERIFICATION_URL;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/enquirybl/generate/bl':
        {
            var options = {
                method:'POST',
                url: Service.GENERATE_BL ,
                form:req.body
            }; 
            let cbService=Service.GENERATE_BL;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        } 

        case '/ajaxrequest/enquirybl/generate/enquiry':
        {
            var options = {
                method:'POST',
                url: Service.GENERATE_ENQ, 
                form:JSON.stringify(req.body)
            };
            let cbService = Service.GENERATE_ENQ;
           //decodeURIComponent(options.form);
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }

        case '/ajaxrequest/messages/update/enquiry':
        case '/ajaxrequest/enquirybl/update/enquiry':
        {
            var options = {
                method:'POST',
                url: Service.UPDATE_ENQ, 
                form:JSON.stringify(req.body)
            };
           let cbService = Service.UPDATE_ENQ;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }

        case '/ajaxrequest/enquirybl/generate/intent':
        {
            var options = {
                method:'POST',
                url: Service.GENERATE_INTENT, 
                form:JSON.stringify(req.body)
            };
            let cbService = Service.GENERATE_INTENT;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            res.set("Supplier_GLID", req && req.body && req.body.interest_rcv_glusr_id?req.body.interest_rcv_glusr_id:"");
            break;
        }

        case '/ajaxrequest/enquirybl/tnc':
        {
            let data=req.body;
            data.VALIDATION_KEY='3245abd21ccaf37b137062f7ccc81269';
            data.MODID='IMOB';
            var options = {
                method:'POST',
                url: Service.FOREIGN_TNCACCEPTANCE_URL,
                form:JSON.stringify(data)
            };
            GblComFunc.makeRequest(req, res, options, true,false);
            break;
        }

        case '/ajaxrequest/enquirybl/finishEnquiry':
        {
            var options = {
                method:'POST',
                url: Service.FINISH_ENQ,
                form:JSON.stringify(req.body)
            }; 
            let cbService = Service.FINISH_ENQ;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/soi/user/minidetail':
        case '/ajaxrequest/enquirybl/user/minidetail':
        {
                var options = {
                    method:'POST',
                    url: Service.USER_MINI_DETAIL,
                    form:req.body
                }; 
                let cbService=Service.USER_MINI_DETAIL;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
        }
        case '/ajaxrequest/enquirybl/bl/delete/reasons':
        {
            var options = {
                method:'POST',
                url: Service.DEL_QUES_TEMPLATE,
                form:req.body
            };
            let cbService=Service.DEL_QUES_TEMPLATE;
            GblComFunc.makeRequest(req, res, options, true,false,cbService);
            break;
        }
        case '/ajaxrequest/enquirybl/bl/delete':
        {
            var options={
                method: 'POST',
                url: Service.DEL_REQ,
                form:req.body
            }
            let cbService=Service.DEL_REQ;
            GblComFunc.makeRequest(req, res, options, false, true,cbService).then(function (data) {

                res.status(200).send(data);

            }, function (error) {
                if (error == ERROR) {
                    res.status(503).send();
                } else {
                    res.status(error).send('{}');
                }
            });
            break;
        }
        case '/ajaxrequest/enquirybl/verify/user/email':
        {  
            let url='';
            url=Service.SELLER_USER_VERIFICATION_URL;
            var options = {
                method:'POST',
                url: url,
                form: JSON.stringify(
                    {
                        "VALIDATION_KEY": "c44e794a7318ba715530cf81297e2071",
                        "VERIFIED_BY_ID": "",
                        "ATTRIBUTE_ID": "109",
                        "action_flag":"SP_VERIFY_ATTRIBUTE",
                        "VERIFIED_BY_NAME": "",
                        "GLUSR_USR_ID": req.body.GLUSR_USR_ID,
                        "ATTRIBUTE_VALUE": req.body.ATTRIBUTE_VALUE,
                        "VERIFIED_BY_AGENCY": "ONLINE",
                        "VERIFIED_URL": null,
                        "VERIFIED_BY_SCREEN": req.body.VERIFIED_BY_SCREEN,
                        "VERIFIED_IP": req.body.VERIFIED_IP,
                        "VERIFIED_IP_COUNTRY": req.body.VERIFIED_IP_COUNTRY,
                        "VERIFIED_COMMENTS":"Following Data Has Been Verified Through google gmail Process",
                        "VERIFIED_AUTHCODE": null,
                         "MODID": "IMOB"
                    }
                )            
                
            };
    
            GblComFunc.makeRequest(req, res, options, true, false);
            break;
        }
        case '/ajaxrequest/identified/enquirybl/user/update':
        case '/ajaxrequest/identified/truecaller/city/update':
        {
            let data=req.body;
            data.VALIDATION_KEY='764191e1d408f0397cb9009520e1b861';
            data.UPDATEDBY='User';
            data.MODID='IMOB';
            var options = {
                method:'POST',
                url: Service.ENQUIRYBL_USER_UPDATE,
                form:JSON.stringify(data)
            };
            GblComFunc.makeRequest(req, res, options, true,false);
            break;
        }
        case '/ajaxrequest/enquirybl/pincode/locality':
            {
                var options = {
                    method:'POST',
                    url: Service.PINCODE_LOCALITY,
                    form:req.body
                };
                let cbService=Service.PINCODE_LOCALITY;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }
        case '/ajaxrequest/enquirybl/loginWithWhatsapp':
            {
                var options = {
                    method:'POST',
                    url: Service.ENQUIRYBL_LOGIN_WITH_WHATSAPP,
                    form:req.body
                };
                let cbService=Service.ENQUIRYBL_LOGIN_WITH_WHATSAPP;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }   

        case '/ajaxrequest/identified/apps/checkuser':
            {
                    var options = {
                                    method: 'POST',
                                    form: {
                                             
                                             'gluserid': req.body.glid,
                                             'token': 'imobile@15061981'
                                             
                                                            
                                         },
                                     }
                                     options.url = Service.CHECK_APP_URL;
                                     
                                     GblComFunc.makeRequest(req, res, options, true, true).then((data) => {
                                         res.status(200).send(data);
                                     }, (error) => {
                                         res.status(503).send();
                                     });
                                     break;
            }  
            
            case '/ajaxrequest/callnow/addTemp':
            {
                let serverDateTime = new Date(new Date().getTime() + 19800000).toISOString().replace("T", " ").replace("Z", "")
                if (req.body.INSERT_INTO == 'PI') {
                    req.body.C2C_CALL_TIME = serverDateTime;
                }
                req.body.INTEREST_PDATE = serverDateTime;
                var options = {
                    method:'POST',
                    url: Service.ADD_TEMP,
                    body:JSON.stringify(req.body)
                };
                let cbService=Service.ADD_TEMP;
                if (req.body.INSERT_INTO == 'PI') {
                    GblComFunc.makeRequest(req, res, options, true, true, cbService).then((data) => {
                        let parsedData = JSON.parse(data);
                        parsedData.serverDateTime = serverDateTime;
                        res.set("Supplier_GLID",req && req.body && req.body.C2C_RECEIVER_GLUSR_ID?req.body.C2C_RECEIVER_GLUSR_ID:"");
                        res.send(JSON.stringify(parsedData));
                    },
                        (error) => {
                            res.status(503).send();
                        }
                    );
                }
                else {
                    GblComFunc.makeRequest(req, res, options, true, false, cbService);
                }
                break;
            }

            case '/ajaxrequest/callnow/readTemp':
            {
                var options = {
                    method:'POST',
                    url: Service.READ_TEMP,
                    form:JSON.stringify(req.body)
                };
                let cbService=Service.READ_TEMP;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }

            case '/ajaxrequest/callnow/getToken':
            {
                var options = {
                    method:'POST',
                    url: Service.USER_TOKEN,
                    form:req.body
                };
                let cbService=Service.USER_TOKEN;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }

            case '/ajaxrequest/callnow/getFullLoginData':
            {
                var options = {
                    method:'POST',
                    url: Service.USER_PNSVERIFICATION,
                    form:req.body
                };
                let cbService=Service.USER_PNSVERIFICATION;
                GblComFunc.makeRequest(req, res, options, true,false,cbService);
                break;
            }

        

        /*************************************************************************************************/            
        /*                                  ENQUIRY BL END           
        /*************************************************************************************************/
        case '/ajaxrequest/identified/myTicket/feedback/': 	
        {	         
            var options = {	
                method:'POST',	
                headers: {},
                url: Service.FEEDBACK_URL,
                form: req.body,    	
            };
            let cbService=Service.FEEDBACK_URL;
            GblComFunc.makeRequest(req, res, options, false,false,cbService);                     
            break;	
            
        }
        
        case '/ajaxrequest/identified/widgets/uploadImage/': 	
        case '/ajaxrequest/identified/products/addGroup/': 	
        {	         
            var options = {	
                method:'POST',	
                headers: {},
                url: Service.ADD_PROD_GRP_URL,	
                form: JSON.stringify(req.body)          	
            };
            GblComFunc.makeRequest(req, res, options, true,false);                     
            break;	
            
        }
            case '/ajaxrequest/locality':
            {
                var options = {
                    method: 'GET',
                    timeout: 5000,
                    url: Service.PINCODE_LOCALITY + '?modid=IMOB&token=immenu@7851&pincode=' + req.body.pincode + '&locality=y',
                    headers: {
                        'content-type': 'application/json'
                    },

                };
                GblComFunc.makeRequest(req, res, options, false, true).then((data) => {
                    res.send(data);
                },(error) => { res.status(200).send({}); });
                break;
            }
        default:
            {
                res.status(404).send({ "DATA": "NOT FOUND" });
            }
    }
}