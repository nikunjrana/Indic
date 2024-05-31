//import gblFunc from '../Globals/GlobalFunctions';
import locationAPI from "./locationApi";
import { CC_JSON, COUNTRY_DROPDOWN_JSON, TOP5COUNTRIES } from '../constants/constants';
import { versionUp } from '../Globals/MainFunctions';
import { getCookie, getCookieValByKey, setCookie, deleteCookie } from '../Globals/CookieManager';
import { gaTrack, generateGAforPLT } from '../Globals/GaTracking';
import { checkUserStatus, resetCookies } from '../Globals/MainFunctions';
var glid;
let userAgentCheck=window.navigator&&window.navigator.userAgent&&window.navigator.userAgent.includes('IM-Android_Webview')?'ANDWEB':window.navigator.userAgent.includes('IM-IOS-WebView')?'IOSWEB':''

let imApi = {
    //MY ENQ MODULE
    fetchEnquiries(start, end, enqType, folderValue) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/enq/enqlist?start=' + start + '&end=' + end + '&ENQTYPE=' + enqType + '&folderValue=' + folderValue, data);
    }
    ,
    fetchEnquiryDetail(enqId, enqType, folder) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/enq/enqdetail?Q_TYPE=' + enqType + '&QUERY_ID=' + enqId + '&Folder=' + folder + '&buyer_response=1', data);
    },
    sendReply(subject, queryId, queryType, msg, sGlid, rGlid, sEmail, sName, rEmail, rName, rSequence, filename, folderValue) {
        var data = {},
            url = '';
        if (filename)
            url = '/ajaxrequest/enq/sendreply?subject=' + subject + '&queryId=' + queryId + '&queryType=' + queryType + '&msg=' + encodeURIComponent(msg) + '&sGlid=' + sGlid + '&rGlid=' + rGlid + '&sEmail=' + sEmail + '&sName=' + sName + '&rEmail=' + rEmail + '&rName=' + rName + '&rSequence=' + rSequence + '&filename=' + filename + '&folderValue=' + folderValue;
        else
            url = '/ajaxrequest/enq/sendreply?subject=' + subject + '&queryId=' + queryId + '&queryType=' + queryType + '&msg=' + encodeURIComponent(msg) + '&sGlid=' + sGlid + '&rGlid=' + rGlid + '&sEmail=' + sEmail + '&sName=' + sName + '&rEmail=' + rEmail + '&rName=' + rName + '&rSequence=' + rSequence + '&folderValue=' + folderValue;
        return makeRequest('GET', url);

    },
    sendReplyy(subject, queryId, queryType, msg, sGlid, rGlid, chkuser, attach1 = '', rfqid,contact_year,code,positionFlag) {

        var url = '/ajaxrequest/identified/messagecenter/sendreply_' + chkuser + '/'
        var data = {
            'subject': subject,
            'queryId': queryId,
            'queryType': queryType,
            'msg': msg,
            'sGlid': sGlid,
            'rGlid': rGlid,
            'attach1': attach1,
            'rfqid': rfqid,
            'contact_year': contact_year,
            'code':code,
            'suggestive_reply_position':positionFlag?positionFlag:'',
            'sender_ip':getCookieValByKey('iploc','gip'),
            "Mod_id":userAgentCheck?userAgentCheck:'IMOB',
        };
        return makeRequest('POST', url, data);

    },
    chatUser(userid) {
        var data = {
            userid: userid,
        }
        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/chatUser/', data);

    },
    fetchUserFolder() {
        var data = {};
        var dd = makeRequest('GET', '/ajaxrequest/enq/enqfolder', data);
        return dd;
    },

    forgotPassword(username, ciso) {
        var data = {
            "username": username,
            "ciso": ciso
        };
        var dd = makeRequest('POST', '/ajaxrequest/identified/common/forgotPassword', data);
        return dd;
    },

    saveQrfFeedback(qrfParams) {
        var data = {};
        var feedbackId = qrfParams.Feedback_Id || '';
        if (feedbackId == '')
            return makeRequest('GET', '/ajaxrequest/enq/qrffeedback?queryid=' + qrfParams.queryid + '&qtype=' + qrfParams.qtype + '&relevancyid=' + qrfParams.relevancyid + '&feedback_source=' + qrfParams.feedback_source, data);
        else
            return makeRequest('GET', '/ajaxrequest/enq/qrffeedback?queryid=' + qrfParams.queryid + '&qtype=' + qrfParams.qtype + '&relevancyid=' + qrfParams.relevancyid + '&feedback_source=' + qrfParams.feedback_source + '&Feedback_Id=' + qrfParams.Feedback_Id + '&reason_id=' + qrfParams.reason_id + '&other_text=' + qrfParams.other_text, data);
    },
    fileUpload(file) {
        return makeRequestFile('POST', '/ajaxrequest/enq/fileUpload', file);
    },
    moveToFolder(chk, folderValue, moveTo) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/enq/moveToFolder?chk=' + chk + '&folderValue=' + folderValue + '&moveTo=' + moveTo, data)
    },
    //MY PRODUCTS MODULE
    fetchMyProducts(dataList) {
        var data = {};
        var fobFilter = dataList.product_filter || '';
        return makeRequest('GET', '/ajaxrequest/identified/products/myprdlist?start=' + dataList.start + '&end=' + (dataList.start + 19) + '&product_filter=' + fobFilter, data);
    },

    addPriceMyProducts(item_name, item_id, display_id, price, unit, action, index, imageData) {
        var data = {
            item_name: item_name,
            item_id: item_id,
            display_id: display_id,
            price: price,
            unit: unit,
            action: action,
            imageData: imageData
        };
        return makeRequest('POST', '/ajaxrequest/identified/products/addEditProduct', data);
    },
    getProdDetail(display_id) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/products/getdetail?display_id=' + display_id, data)
    },
    getcatData() {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/products/getcatdata', data)
    },
    addEditDetail(action, price, unit, desc, moq, prodname, cat, item_id, display_id, imageData) {
        var data = {
            action: action,
            item_name: prodname,
            price: price,
            unit: unit,
            desc: desc,
            moq: moq,
            cat: cat,
            item_id: item_id ? item_id : '',
            display_id: display_id,
            imageData: imageData
        };
        return makeRequest('POST', '/ajaxrequest/identified/products/addEditProduct', data);
    },
    imageUpload(file) {
        return makeRequestFile('POST', '/ajaxrequest/identified/products/imageUpload1', file);
    },
    fetchSubGroup(start, end, grpname) {
        var data = {};
        if (!isNaN(start) || (!isNaN(end))) {
            return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/fetchGroups?start=' + start + '&end=' + end + '&GRP=' + grpname + '&modid=IMOB&token=imobile@15061981', data);
        }
    },
    //LATEST BUYLEADS
    fetchBuyleads(count, shortlist, inbox, offer_flag, iso, city, locpref, mcatid, pref_city_lead,order_value) {
        pref_city_lead == undefined || pref_city_lead == '' ? pref_city_lead = 0 : '';
        var token = 'imobile@15061981', url= {};
        var blend = count + 10;
        if (shortlist == "GET_SHORTLIST") {
            blend = count + 25;
        }
        locpref == '' || locpref == undefined ? locpref = 4 : '';
        pref_city_lead == '' || pref_city_lead == undefined ? pref_city_lead = '0' : '';
        glid = getCookieValByKey('ImeshVisitor', 'glid');
        var data = {
            start: Number(count + 1),
            end: Number(blend),
            buyer_response: '2',
            shortlist: shortlist,
            token: token,
            MOD_ID: 'IMOB',
            offer_type: offer_flag,
            attachment: '1',
            LocPref: locpref,
            inbox: (inbox || ''),
            city: (city || ''),
            iso: iso,
            mcatid: (mcatid || ''),
            pref_city_lead: pref_city_lead,
            order_value: order_value
        }

        if (!isNaN(count) && glid) {
            return makeRequest('POST','/ajaxrequest/identified/buyleads/bl/buyLeadlist', data);
        }
    },
    DefaultBuyleads(offerType) {
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/defaultDisplay?offerType=' + offerType, {});

    },

    fetchBuyleadsForOffer(offerid, shouldUpdate, blstart, blend) {
        var token, url = {};
        var glid = getCookieValByKey('ImeshVisitor', 'glid');
        var offer_type = 'B';
        var buyer_response = 1;
        var inbox = 'P'
        token = 'imobile@15061981';
        var data = {
            start: blstart,
            end: blend,
            buyer_response: buyer_response,
            token: token,
            MOD_ID: 'IMOB',
            offer_type: offer_type,
            offer: offerid
        }

        if (!isNaN(blstart) || (!isNaN(blend))) {
            return makeRequest('POST','/ajaxrequest/identified/buyleads/bl/buyLeadlist', data);
        }
    },
    standardProductDetail(displayId) {
        var data = {};

       return makeRequest('GET', '/ajaxrequest/identified/standardProductDetails?displayId=' + displayId,data,'',false);

    } ,

    fetchIndustryTenders(lastBlCount, groupId) {
        let token = 'imobile@15061981';
        let start = lastBlCount;
        let end = lastBlCount + 10;
        let url = '/ajaxrequest/identified/buyleads/bl/industryTenders?start=' + start + '&end=' + end + '&groupId=' + groupId + '&token=' + token + '&MOD_ID=IMOB';
        return makeRequest('GET', url);
    },

    getCurrentEtoOffer(offerId) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/offer?id=' + offerId, data);
    },
    getMsgCount() {
        var data = {
        };
        return makeRequest('POST', '/ajaxrequest/identified/messages/unreadMessage', data);
    },
    getUnreadList(params,start,end){
        var data ={
            "glusrid": params,
            "start": start,
            "end": end,
            "modid" : userAgentCheck?userAgentCheck:'IMOB'
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/unreadList',data);
    },
    markStar(glusrid,contact_glid,markLead,date){
        var data={
            "glusrid":glusrid,
            "contact_id":contact_glid,
            "markLead":markLead,
            "date":date,
            "modid":userAgentCheck?userAgentCheck:'IMOB'
        }
        return makeRequest('POST','/ajaxrequest/identified/messages/starMark',data);
    },
    updateRead(glid, contact_glid, modid,message_ref_modid,msg_ref_type) {
        var data = {
            "user_glid": glid,
            "contact_glid": contact_glid,
            "modid": userAgentCheck?userAgentCheck:'IMOB',
            "message_ref_modid":message_ref_modid,
            "msg_ref_type":msg_ref_type
        }
        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/readReceipt', data);
    },


    //LOGIN
    loggedinUser(logindata) {
        var data = {
            "use": logindata.use ? logindata.use : '',
            "pass": logindata.pass ? logindata.pass : '',
            "ciso": logindata.ciso ? logindata.ciso : '',
            'IP': getCookieValByKey('iploc', 'gip'),
            'IP_COUNTRY': getCookieValByKey('iploc', 'gcnnm'),
            'IPADDRESS': getCookieValByKey('iploc', 'gip'),
            'GEOIP_COUNTRY_ISO': getCookieValByKey('iploc', 'gcniso'),
            'originalreferer': window.location.href,
            'ph_code': CC_JSON[0][logindata.ciso],
            'glid': getCookieValByKey('ImeshVisitor', 'glid') ? getCookieValByKey('ImeshVisitor', 'glid') : '',
            'glusr_usr_ip': (getCookieValByKey('iploc', 'gip')) ? getCookieValByKey('iploc', 'gip') : '',
            'duplicateEmailCheck': logindata.duplicateEmailCheck ? logindata.duplicateEmailCheck : ''
        };
        return makeRequest('POST', '/ajaxrequest/identified/common/login', data);
    },
    otpVerf(otpdata) {
        let p = 1;
        let ciso = otpdata.ciso;
        if (ciso != "IN" && ciso != "US" && ciso != "AE" && ciso != "UK" && ciso != "AU") {
            p = 0;
        }
        let val = (p == 0) ? COUNTRY_DROPDOWN_JSON.find(function (item) { return item.cniso == ciso }) : TOP5COUNTRIES.find(function (item) { return item.cniso == ciso });
        let country_name = "";
        if (p == 0) {
            country_name =(val&&val.cnname)? val.cnname:"";
        } else {
            country_name = val.cname
        }
        let glusrid = otpdata.glusr_id;
        var data = {
            "user": otpdata.user,
            "screenName": (otpdata.screenName) ? otpdata.screenName : '',
            "type": otpdata.type,
            "authCode": otpdata.authCode,
            "glusr_id": (glusrid) ? glusrid : getCookieValByKey('ImeshVisitor', 'glid'),
            "ciso": ciso ? ciso : "IN",
            "email": otpdata.email ? otpdata.email : getCookieValByKey('ImeshVisitor', 'em'),
            "user_mobile_country_code": otpdata.ph ? otpdata.ph : getCookieValByKey('ImeshVisitor', 'phcc'),
            "user_country": country_name,
            "userIp": getCookieValByKey('iploc', 'gip'),
            "OTPResend": otpdata.OTPResend,
            "emailVerify": otpdata.emailVerify ? otpdata.emailVerify : '',
            "source": otpdata.source ? otpdata.source : '',
            "msg_key": otpdata.msg_key ? otpdata.msg_key : 0,
            "attribute_id" : otpdata.attribute_id ?  otpdata.attribute_id : '',
            "verifyUser" : otpdata.verifyUser ? true : false
        };
        return makeRequest('POST', '/ajaxrequest/identified/common/otpVerification', data);
    },
    detectCountry() {
        var data = {};
        //2 to return parameter in required format
        return locationAPI.geolocation_newservice(2);
    },
    packageData(offer='', tender='', isForeignLead) {
        var data = { "GLUSERID": getCookieValByKey('ImeshVisitor', 'glid'), "MOBILE": getCookieValByKey('ImeshVisitor', 'mb1'), "SOURCE": "M-MY", "OFFER_ID": offer, "TENDER_ID": tender, "REF_URL": "package.html" };
        if(isForeignLead == '1')
        data['isForeign'] = 1;
        return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/package', data);
    },
    frmsubmit_package(pay_id, offerid, tenderid, prev_url, gst,scheme) {
        var data = {
            'MOBILE': getCookieValByKey('ImeshVisitor', 'mb1'),
            'GLUSERID': getCookieValByKey('ImeshVisitor', 'glid'),
            'FLOW_STATUS': 'GETORDERID',
            'SOURCE': 'M-MY',
            'MODID': 'IMOB',
            'REF_URL': 'https://m.indiamart.com/bl/blpurchaseresponse/',
            'PLAN': pay_id,
            'OFFER_ID': offerid,
            'TENDER_ID': tenderid,
            'TOKEN': "c44e794a7318ba715530cf81297e2071",
            'PREV_URL': prev_url,
            'fromsite': "M-MY",
            'schemeId':scheme.schemeId,
        }
        if (gst) { data.gst = gst }
        return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/package/buynow/', data, 5000);
    },
    makeShortUrl(b) {
        data = {}
        return makeRequest('GET', '/shortUrl/?long_url=' + b, data);
    },




    getdata(q) {
        var data = {
            q: q
        }


        return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/getdata', data);
    },
    getSearchData(q) {
        var data = {}
        return $.ajax({
            url: 'https://suggest.imimg.com/suggest/suggest.php/?q=' + q + '&limit=8&type=product&fields=type_data%2Csort_order&match=fuzzy&showloc=0&p=36',
            cache: false,
            success: function (response) {
                return JSON.parse(response);
            },
            timeout: 3000
        });
    },
    getSearchCity(city = '', state = '', limit = 1) {
        var data = {}
        return new Promise(function (resolve, reject) {
            var res = $.ajax({
                url: (state) ? 'https://suggest.imimg.com/suggest/suggest.php?q=' + city + '&limit=' + limit + '&type=city&method=exact&fields=id,state,stateid,flname,alias&filters=state%3A' + state : 'https://suggest.imimg.com/suggest/suggest.php?q=' + city + '&limit=' + limit + '&type=city&method=exact&fields=id,state,stateid,flname,alias',
                cache: false,
                success: function (response) {
                    return JSON.parse(response);
                },
                timeout: 3000
            });
            resolve(res);
        });
    },
    getMiniPdpData(displayId) {
        var data = {}

        return makeRequest('GET', '/ajaxrequest/miniproddetail.php?displayId=' + displayId, data, 8000, false);
    },
    getRecentSearchData(vid) {
        var data = { vid: vid }
        return $.ajax({
            url: 'https://suggest.imimg.com/suggest/suggest_pdm.php/?storage=ims' + '&vid=v' + vid + '&gid=g' + getCookieValByKey('ImeshVisitor', 'glid'),
            cache: false,
            success: function (response) {
                return JSON.parse(response);
            },
            timeout: 3000
        });
    },
    getcitySearchData(q) {
        var data = {
            q: q
        }
        return makeRequest('POST', '/ajaxrequest/search/isearch.php/getcitydata/', data);
    },
    getTendersStateData() {
        var data = {}
        return makeRequest('GET', '/ajaxrequest/getTendersStateData', data);
    },
    getTendersStateAuthorityData(data) {
        return makeRequest('GET', '/ajaxrequest/getTendersStateAuthorityData', data);
    },
    getTendersStateIndustryData(data) {

        return makeRequest('GET', '/ajaxrequest/getTendersStateIndustryData', data);
    },
    getTendersStateIndustryNoticeData(grpid, stateid) {

        return makeRequest('GET', '/ajaxrequest/getTendersStateIndustryNoticeData?grpid=' + grpid + '&stateid=' + stateid, {});
    },
    saveSearchData(q, vid) {
        var data = {
            q: q,
            vid: vid
        }
        return $.ajax({
            url: 'https://suggest.imimg.com/suggest/suggest_pdm.php?searches=' + q + '&vid=v' + vid + '&gid=g' + getCookieValByKey('ImeshVisitor', 'glid') + '&type=recent&dName=m.indiamart.com&_=1522756616337',
            cache: false,
            success: function (response) {
                return JSON.parse(response);
            },
            timeout: 3000
        });

    },
    getUserDetVal(locpref = "") {
        this.getDetailOfUser(getCookieValByKey('ImeshVisitor', 'glid')).then(
            function (res) {
                locpref = locpref == "" ? res.glusr_usr_loc_pref : locpref;
                let str = "loc_pref=" + locpref + "|city=" + res.glusr_usr_city + "|state=" + res.glusr_usr_state;
                setCookie('userDet', str, 0.08, 'm.indiamart.com');
                if (document.getElementById(locpref)) {
                    document.getElementById(locpref).classList.remove("rectangleBorder")
                    document.getElementById(locpref).classList.add("selected");
                }
                return locpref;
            });

    },
    setBlLocation(glid, prefType, ip, ipCountry) {
        var data = {
            "VALIDATION_KEY": '3245abd21ccaf37b137062f7ccc81269',
            "UPDATEDBY": 'User',
            "UPDATEDUSING": 'IMOB',
            "USR_ID": glid,
            "LOC_PREF": prefType,
            "LOC_PREF_SET_BY": -1,
            "IP": ip,
            "IP_COUNTRY": ipCountry
        }
        return makeRequest('POST', '/ajaxrequest/widgets/setLocation', data, '', false)
    },
    getShortUrl(q) {
        var data = { longDynamicLink: q };


        return makeRequest('POST', 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDwH7xmkEqtPfWP_z5x056EG3GiPOOWg34', data, '', false);
    },
    getDecodedResponse(q) {
        var data = {};

        return makeRequest('GET', 'https://m.indiamart.com/decipher_pwa/?res=' + q, data);
    },
    buyLeadpurchase(ofr_id, type, bl_pos, bl_pos_url, purMode, mapped_mcat_id, grid_val,orderValueFlag='',primayMcatId='',blPageLoc='',topMcatID='',conLevel='', srchTxt) {
        var data = {}, lat = '', long = '', acc = '';
        var strg = "offer_id=" + ofr_id + "&pur_mode=" + purMode;
        strg = strg + "&bl_pos=" + bl_pos + "&bl_pos_url=" + bl_pos_url + "&type=" + type;
        if (getCookieValByKey('iploc', 'GeoLoc_lt')) {
            lat = getCookieValByKey('iploc', 'GeoLoc_lt');
            long = getCookieValByKey('iploc', 'lg');
            acc = getCookieValByKey('iploc', 'acc');
        }
        orderValueFlag && (null != orderValueFlag || orderValueFlag != "") && (strg = strg + "&orderValueFlag=" + orderValueFlag)
        primayMcatId && (null != primayMcatId || primayMcatId != "") && (strg = strg + "&primayMcatId=" + primayMcatId)
        mapped_mcat_id && (null != mapped_mcat_id || mapped_mcat_id != "") && (strg = strg + "&mapped_mcat_id=" + mapped_mcat_id)
        if(blPageLoc && (null != blPageLoc || blPageLoc != "")) {
            blPageLoc = blPageLoc.replace(/\=/g, '5');
            blPageLoc = blPageLoc.replace(/\#/g, '6');
            strg = strg + "&blPageLoc=" + blPageLoc
        }
        grid_val && (null != grid_val || grid_val != "") && (strg = strg + "&grid_val=" + encodeURIComponent(grid_val))
        if (lat && long && acc)
            strg = strg + "&lt=" + lat + "&lg=" + long + "&acc=" + acc;
        if (conLevel && topMcatID)
            strg = strg + "&search_top_mcat_id=" + conLevel + "&search_mcat_priority_level=" + topMcatID ;
        if (srchTxt){
            strg = strg + "&in_search_keyword=" + srchTxt;
        }
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/purchase?' + strg, data);
    },
    getcredits(glid = getCookieValByKey('ImeshVisitor', 'glid')) {
        var data = { 'glusrid': glid, 'token': 'imobile@15061981', 'modid': 'IMOB' };
        return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/getcredits/', data)
    },
    imsearch(qs, len, type, start, city, price, biz, src='', auth = '', catId='', mcatId='', skipContext=0, useML=1,cqid, countryiso,prdsrc=false, locationId='', addFilters="",ecom_only="") {
        // var GeoLocCookie = getCookie("GeoLoc");
        // var latLong = (GeoLocCookie) ? getCookieValByKey('GeoLoc', 'lt') + "," + getCookieValByKey('GeoLoc', 'lg') : "";
        // latLong = (latLong == "," || !GeoLocCookie) ? "" : '&latlong=' + latLong;
        var data = {};
        let authObject = {
            glusrid: '',
            ak: ''
        };

        let countrycode = countryiso ? "&countryiso=" + countryiso : '';

        let voiceLng = '';
        if (localStorage && localStorage.getItem('lang')) {
            voiceLng = JSON.parse(localStorage.getItem('lang'))[1].split('-')[0];
            voiceLng = '&voice=' + voiceLng;
        }
        var query;
        try {
            query = decodeURI(qs);
        }
        catch (error) {
            qs = encodeURI(unescape(unescape(qs)));
        }
        qs = qs.replace(/&/g, '%26');
        window.searchAPITime = Date.now();
        //to be synced with cookie val change ======
        let lang = getCookie("lang") == "1" ? "hi" : "en";
        //=================
        let authUrl = '';
        if (auth == 1) {
            authObject.glusrid = getCookieValByKey('ImeshVisitor', 'glid');
            authUrl = '&glusrid=' + authObject.glusrid;
        }
        let city_only = window.location.search.includes("city_only") ? '&city_only=true' : '';
        let city_source = window.location.search.includes("source") ? '&source=citysuggester' : '';
        let contextParams = (catId?('&catid=' + catId):'') + (mcatId ?'&mcatid=' + mcatId:'') + (catId ? '&skip_context=' + skipContext:'');
        let country_values = '';
        if( window.location.search.includes("country_code")){
            let countryValue = window.location.search.split('&');
            countryValue.forEach(element => {
                if(element.includes('country_name')){
                    country_values+='&country_name='+element.split('=')[1];
                }
                else if(element.includes('country_code')){
                    country_values+='&country_code='+element.split('=')[1];
                }
            });
        }
        let prdsrcArg='';
        if(prdsrc){
            prdsrcArg = '&prdsrc=1';
        }

        if(locationId){
            cqid = locationId;
        }
        else cqid = '';

        if(start <=14 && !qs.match(/near\s+me\s*$|near\s+to\s+me\s*/)){
            return makeRequest('GET', '/ajaxrequest/search/search?s=' + qs + '&start=' + start + '&citydata=' + city + '&cqid='+ cqid + '&only_price_products=' + price + '&useML=' + useML + '&biztype_data=' + biz + contextParams + '&src='+ src + '&preflang=' + lang +city_only + country_values+ voiceLng + authUrl + countrycode + prdsrcArg + city_source + addFilters + '&ecom_only=' + ecom_only, data, 8000, false);
        }
        else{
            return makeRequest('GET', '/ajaxrequest/identified/search?s=' + qs + '&start=' + start + '&citydata=' + city + '&cqid='+ cqid + '&only_price_products=' + price + '&useML=' + useML + '&biztype_data=' + biz + contextParams + '&src='+ src + '&preflang=' + lang +city_only + country_values + voiceLng + authUrl + countrycode + prdsrcArg + city_source + addFilters+ '&ecom_only=' + ecom_only, data, 8000, false);
        }
    },
    getEngagementData(displayIdArray) {
        displayIdArray = displayIdArray.join(",");
        return makeRequest('POST', '/ajaxrequest/identified/search/EngagementData', { data: displayIdArray });
    },

    findCityWithLatLong(lat, long) {

        var data = {
            'token': 'imartenquiryprovider',
            'S_lat': lat,
            'S_long': long,
            'GET_CITY': 'Y',
            'modid': 'IMOB',

        }

        return makeRequest('POST', '/ajaxrequest/identified/search/CityFromLatLong/', data);
    },
    getNIQuestions(mcatid,offerid,matchmakingMcat,primeMcat,blcity,blpage) {
        var data = {};
        let url='/ajaxrequest/identified/niQuestions?mcatid='+ mcatid+'&glid='+getCookieValByKey('ImeshVisitor', 'glid')+'&offerid='+offerid+'&matchmakingMcat='+matchmakingMcat+'&primeMcat='+primeMcat+'&blcity='+blcity+'&blpage='+blpage+'&ciso='+getCookieValByKey('ImeshVisitor', 'iso');
        return makeRequest('GET', url, data);
    },
    getNIUnits(mcatid) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/niQuestionsUnit?mcatid=' + mcatid, data, 10000, false);
    },
    blMarkfav(flag, OFR_ID, MCAT_ID, source, expiredStatus) {
        var data = {
            'OP_FLAG': flag,
            'S_USR_ID': glid,
            'OFR_ID': OFR_ID,
            'MCAT_ID': MCAT_ID,
            'MOD_ID': 'IMOB',
            'UPDATEDBY': glid,
            'UPDATED_USING': glid,
            'VALIDATION_KEY': 'e27d039e38ae7b3d439e8d1fe870fc68',
            'token': 'imobile1@15061981',
            'IS_EXPIRE': 0,
            'SOURCE': source,
            'STATUS': 1
        };
        if (expiredStatus && expiredStatus == 'E') {
            data['IS_EXPIRE'] = 1
        }

        return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/markfav', data);
    },

    getproducts(modid, mcats, count) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/widgets/products?modid=' + modid + '&mcats=' + mcats + '&count=' + count, data, 8000, false);
    },

    getrecentsearches(glid, logdate) {


        var data = {
            "glid": glid,
            "logdate": logdate,
        }
        return makeRequest('POST', '/ajaxrequest/identified/widgets/recentsearches/', data, 8000);
    },

    saveSearchFeedback(searchParams) {
        var disp_Id = document.querySelectorAll('[id^="dispid"]');
        var did = "";
        var tot_dispId = (disp_Id.length > 5) ? 5 : disp_Id.length;
        for (var i = 0; i < tot_dispId; i++) { did += disp_Id[i].id.replace("dispid", "") + ","; }
        did = did.slice(0, -1);
        var data = {
            "SEARCH_QUERY": searchParams.SEARCH_QUERY,
            "SEARCH_TOP_RESULTS": searchParams.SEARCH_TOP_RESULTS,
            "SEARCH_PAGE_NO": searchParams.SEARCH_PAGE_NO,
            "SEARCH_VAL": searchParams.SEARCH_VAL,
            "COOKIE": searchParams.COOKIE,
            "SEARCH_URL": searchParams.SEARCH_URL,
            "SEARCH_MOBILE": searchParams.SEARCH_MOBILE,
            "FEEDBACK_FLAG": 'IMSEARCH_FEEDBACK',
            "SEARCH_SOURCE": 'sm',
            "VALIDATION_KEY": '5cca91f15b8c8ddd91c0fc7abfebc0c7',
            "SEARCH_TOTAL_RESULTS": searchParams.SEARCH_TOTAL_RESULTS
        };
        var body = {};
        if ((data.SEARCH_VAL !== null) || (data.SEARCH_VAL !== undefined)) {
            return makeRequest('GET', 'https://m.indiamart.com/searchFeedback.php?ss=' + data.SEARCH_QUERY + '&val=' + data.SEARCH_VAL + '&mob=' + data.SEARCH_MOBILE + '&did=' + did + '&tot_res=' + data.SEARCH_TOTAL_RESULTS + '&pg=' + data.SEARCH_PAGE_NO + '&cookie=' + data.COOKIE, body);
        }
    },

    getDisplayInvoiceBanner(glid) {
        var data = {
            "privacy_settings": new Array({ 'flag': '2' }),
            "mod_id": 'IMOB',
            "token": 'imobile@15061981',
            "glusrid": glid
        }

        return makeRequest('POST', '/ajaxrequest/bl/home/invoiceBanner/', data, 3000);
    },
    updateUserProfile(info) {
        if (!getCookieValByKey('iploc', 'gip') || !getCookieValByKey('iploc', 'gcnnm')) {
            gaTrack.trackEvent(["Sell_on_Indiamart_Banner", "Iploc not created", "Iploc", 0, true]);
        }


        var data = {};

        data['USR_ID'] = getCookieValByKey('ImeshVisitor', 'glid');
        data['MOBILE_COUNTRY'] = '+91';
        //  data['VALIDATION_KEY'] = 'e27d039e38ae7b3d439e8d1fe870fc68'; // mapi validation key
        data['VALIDATION_KEY'] = 'c44e794a7318ba715530cf81297e2071'; // intermesh validation key
        data['MODID'] = 'IMOB';
        data['UPDATEDBY'] = 'User';
        data['UPDATEDUSING'] = 'Sell on Indiamart at Mobile Site';
        data['IP'] = getCookieValByKey('iploc', 'gip');
        data['IP_COUNTRY'] = getCookieValByKey('iploc', 'gcnnm');
        if (info.email) data['EMAIL'] = info.email;
        if (info.name) data['NAME'] = info.name;
        if (info.companyname) {
            var str = info.companyname;
            var res = str.replace(['"', ',', ';', '<', '>', '+'], " ");
            data['COMPANYNAME'] = res;
        }
        if (info.address) data['ADD1'] = info.address;
        if (info.type == "address") {
            data['TYPE'] = "address"
            data['ADD2'] = info.locality;
        }
        if (info.city) data['CITY'] = info.city;
        if (info.cityid) data['FK_GL_CITY_ID'] = info.cityid;
        if (info.state) {
            data['STATE'] = info.state;
            if (info.stateid) data['FK_GL_STATE_ID'] = info.stateid;
        }
        if (info.ZIP) data['zip'] = info.ZIP;

        if (info.doNotList) {
            data['ENABLE_MODIFY_STATUS'] = 1;
            data['MODIFYSTATUS'] = 'T';
            data['HIST_COMMENTS'] = 'The user had previously disabled his account with the reason: "user do not want to be listed". But the user logged into SellonIM recently, hence sending for gluser approval.';
        }

        return makeRequest('POST', `/ajaxrequest/identified/soi/seller/user/update${info.curr_screen?info.curr_screen:''}/`, data);
    },




    AddProduct(pname1) {
        var data = {};
        let ip = '';
        if (getCookie("iploc")) {ip = getCookieValByKey('iploc', 'gcniso');}
        data['gluserid'] = getCookieValByKey('ImeshVisitor', 'glid');
        data['ip'] = ip;
        data['product1'] = pname1;
        data['mobile_num']=getCookieValByKey('ImeshVisitor', 'mb1')
        data['auth_key']=getCookieValByKey('im_iss','t')

        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/product/add/', data);
    },
    userReautheticate() {
        let iso = '';
        let user_name = '';
        let countryiso = '';
        let ip = '';
        if (getCookie("iploc")) {
            let countryiso = getCookieValByKey('iploc', 'gcniso');
            //if (countryiso == 'IN') {
            let ip = getCookieValByKey('iploc', 'gip');
            // }
            // else {
            //     let ip = decodeURIComponent(gblFunc.getCookie("iploc")).split('|')[3].split("=")[1];
            // }
        }
        let cookiesImeshVisitor = checkUserStatus();
        if (getCookieValByKey('ImeshVisitor', 'iso') != '') {
            iso = getCookieValByKey('ImeshVisitor', 'iso');
        }
        else {
            iso = countryiso;
        }
        let cookie_ar = {};
        if (getCookieValByKey('ImeshVisitor', 'em') && iso != 'IN' && profile == NULL) {
            user_name = getCookieValByKey('ImeshVisitor', 'em');
        }
        if (cookiesImeshVisitor > 0 && user_name == '') {
            if (getCookieValByKey('ImeshVisitor', 'em') && iso != 'IN') {
                user_name = getCookieValByKey('ImeshVisitor', 'em');
            } else if (getCookieValByKey('ImeshVisitor', 'mb1')) {
                user_name = getCookieValByKey('ImeshVisitor', 'mb1');
            }
        }
        let im_iss_obj = {}
        if (getCookie('im_iss')) {
            let arr = getCookie('im_iss').split('=')
            im_iss_obj[arr[0]] = arr[1];
        }
        let datacookie = getCookie("ImeshVisitor", 'object');
        let logincookie = getCookie("v4iilex", 'object');

        let data = {
            "username": user_name,
            "modid": 'IMOB',
            "ip": ip,
            "format": 'JSON',
            "reauth": getCookieValByKey('ImeshVisitor', 'mb1') || getCookieValByKey('ImeshVisitor', 'em') == "" ? 0 : 1,
            "iso": iso,
            'glusr_usr_ip': (getCookieValByKey('iploc', 'gip')) ? getCookieValByKey('iploc', 'gip') : '',
            "cookie": {
                'DataCookie': datacookie,
                'LoginCookie': logincookie,
                'im_iss': im_iss_obj
            }

        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/user/reauthenticate', data);
    },
    getcitySellerData(q) {
        var data = {
            "q": q,
            "minStringLengthToFetchSuggestion": 1,
            "type": "city",
            "fields": "state,id,stateid",
            "minStringLengthToDisplaySuggestion": 1,
            "displaySeparator": " >> ",
            "displayFields": "value,state",
            "filters": "iso:IN",
            "recentData": "false",
            "updateCache": "false"
        };



        let url = 'https://suggest.imimg.com/suggest/suggest.php/?q=' + data.q + '&limit=20&type=city&minStringLengthToFetchSuggestion=' + data.minStringLengthToFetchSuggestion + '&updateCache=' + data.updateCache + '&fields=' + data.fields + '&minStringLengthToDisplaySuggestion=' + data.minStringLengthToDisplaySuggestion + '&display_fields=' + data.displayFields + '&displaySeparator=' + data.displaySeparator + '&recentData=' + data.recentData + '&filters=' + data.filters;
        return new Promise(function (resolve, reject) {
            var a =
                fetch(url, {
                    method: 'GET'
                }).then(
                    response => response.json() // if the response is a JSON object
                ).then(
                    success => {
                        return success;
                    } // Handle the success response object
                ).catch(
                    error => { return error; }// Handle the error response object
                );
            resolve(a)
        })





        // return makeRequest('POST', '/ajaxrequest/identified/soi/seller/getcitydata', data);
    },
    getDetailOfUser(glid, pageName='soi') {

        let data = {
            glid: getCookieValByKey('ImeshVisitor', 'glid')
        }
        return makeRequest('POST', `/ajaxrequest/identified/${pageName}/seller/info/`, data);
    },

    verificationBlocker(glid) {
        let data = {
            glid: getCookieValByKey('ImeshVisitor', 'glid'),
        }
        return makeRequest('POST', '/ajaxrequest/identified/verification/verificationBlocker', data);
    },

    hotLeads(name, companyname, email, mobile) {
        var data = {
            "name": name,
            "mobile": mobile,
            "companyname": companyname,
            "email": email,
            "USR_ID": getCookieValByKey('ImeshVisitor', 'glid'),
            "MOBILE_COUNTRY": '+91',
            "validation_key": '3245abd21ccaf37b137062f7ccc81269',
            "MODID": 'IMOB',
            "UPDATEDBY": 'User',
            "UPDATEDUSING": 'Sell on Indiamart at Mobile Site',
            'IP_COUNTRY': getCookieValByKey('iploc', 'gcnnm'),
            'IP': getCookieValByKey('iploc', 'gip'),
            'GEOIP_COUNTRY_ISO': getCookieValByKey('iploc', 'gcniso')
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/hotleads/', data);
    },

    fetchProductsCount() {
        var data = {};
        var fobFilter = '';
        return makeRequest('GET', '/ajaxrequest/identified/products/myprdlist?start=0&end=3' + '&product_filter=' + fobFilter, data);
    },
    addC2CtrackMsg(data){
        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/callC2C/', data);
    },

    fetchMessages(glusrid, start, end, count, chkuser,lastContactDate) {
        var data = {
            "glusrid": glusrid,
            "start": start,
            "lastContactDate": lastContactDate,
            "end": end,
            "count": count,
            "modid": userAgentCheck?userAgentCheck:'IMOB'
        }


        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/fetchMessages_' + chkuser + '/', data);
    },

    generateOrder(glusrid, receiver_glid, productId, productName, gip,mcatId) {
        let data = {
            "glusrid": glusrid,
            "receiver_glid": receiver_glid,
            "productId": productId,
            "productName": productName,
            "buyer_ip": gip,
            "mcat_id": mcatId?mcatId:''
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/generateOrder', data)
    },

    enrichOrder(glusrid, orderId, quantity, tAmount, unit, productPrice, order_currency, pay_mode, addressBuyer) {
        let data = {
            "glusrid": glusrid,
            "order_id": orderId, "order_quantity": quantity,
            "total_order_price": tAmount,
            "order_unit_type": unit,
            "order_unit_price": productPrice,
            "order_currency": order_currency,
            "pay_mode": pay_mode,
            "Address": addressBuyer
        }
     return makeRequest('POST', '/ajaxrequest/identified/messages/enrichOrder', data);
    },

    finishOrder(glusrid, orderId, addressBuyer, pay_mode) {
        let data = {
            "glusrid": glusrid,
            "orderId": orderId,
            "Address": addressBuyer,
            "pay_mode": pay_mode
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/finishOrder', data)
    },
    getOrderDetailsMBR(order_id,glusrid){
        var data={
            "order_id":order_id,
            "glusrid":glusrid
        }
        return makeRequest('POST','/ajaxrequest/identified/MBR/getOrderDetail',data);
    },
    getOrderDetails(order_id,glusrid){
        var data={
            "order_id":order_id,
            "glusrid":glusrid
        }
        return makeRequest('POST','/ajaxrequest/identified/messages/getOrderDetail',data);
    },
    getDispositionList(glusrid){
        var data={
            "glusrid":glusrid
        }
        return makeRequest('POST','/ajaxrequest/identified/messages/getDispositionList',data);
    },
    cancelOrder(orderId,glusrid,disId,can_reason){
        var data={
            "order_id":orderId,
            "glusrid":glusrid,
            "can_sub_disp_id":disId,
            "can_reason":can_reason
        }
        return makeRequest('POST','/ajaxrequest/identified/messages/cancelOrder',data);
    },
    fetchMsgProdDetail(displayID) {
        return makeRequest('GET', '/ajaxrequest/identified/messages/proddetail.php?displayId=' + displayID);
    },
    fetchMsgProdDetailMBR(displayID) {
        return makeRequest('GET', '/ajaxrequest/identified/MBR/proddetail.php?displayId=' + displayID);
    },
    fetchContactdetails(glusrid, contactglid, flag, chkuser,contact_year) {
        var data = {
            "glusrid": glusrid,
            "contactglid": contactglid,
            "flag": flag,
            "contact_year": contact_year,
            "modid":userAgentCheck?userAgentCheck:'IMOB'
        }
        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/fetchContDetails_' + chkuser + '/', data);
    },

fetchBuyerProfile(glid,key){

var data={

    "token":'imobile@15061981',
    "modid":userAgentCheck?userAgentCheck:'IMOB',
    "supplier_glusrid":glid,
    "key":key,
     //"K":"dWSKK4WefGVmZFM6Uf/T4PrwzhO3mOqxXech",  // random value TODO
   // "AK":
}
return makeRequest('POST','/ajaxrequest/identified/messagecenter/fetchBuyerProfile', data)

},
    callPay(buyer_glid,seller_glid,amount,desc){
        let data ={
            usr_glid : buyer_glid,
            contact_glid : seller_glid,
            amount : amount,
            desc : desc
        }
    return makeRequest('POST','/ajaxrequest/identified/messagecenter/payWithIM', data)
    },
    checkUserSetting(glid){
        let data ={
            contact_glid : glid,
            modid:userAgentCheck?userAgentCheck:'IMOB'

        }
    return makeRequest('POST','/ajaxrequest/identified/messagecenter/checkUserSetting', data)
    },
    fetchMsgdetail(user_glid, contact_glid, start, end, modid, morerows, chkuser) {

        var data = {
            "user_glid": user_glid,
            "contact_glid": contact_glid,
            "start": start,
            "end": end,
            "modid":userAgentCheck?userAgentCheck:'IMOB',
            "morerows": morerows
        }

        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/fetchMsgdetail_' + chkuser + '/', data);
    },
    fetchMBRlist(glusrId, glid) {
        let data = { "glusrId": glid };
        return makeRequest('POST', '/ajaxrequest/identified/mbr/fetchMBRlist/', data);
    },
    fetchMbrOrderList() {
        var data = {
            "glusrid": getCookieValByKey('ImeshVisitor', 'glid'),
        }
        return makeRequest('POST', '/ajaxrequest/identified/mbr/fetchOrderList/', data);
    },
    fetchDetailsMBR(inpdata) {
        let data = { "inpdata": inpdata }
        return makeRequest('POST', '/ajaxrequest/identified/mbr/fetchDetailsMBR/', data);
    },
    deleteMBR(inpdata) {
        let data = {
            "inpdata": inpdata, "fname": getCookieValByKey('ImeshVisitor', 'fn'), "glid": getCookieValByKey('ImeshVisitor', 'glid'), 'IP': getCookieValByKey('iploc', 'gip'),
            'IP_COUNTRYName': getCookieValByKey('iploc', 'gcnnm'), 'type': inpdata.type
        }
        return makeRequest('POST', '/ajaxrequest/identified/mbr/delete_offer/', data);
    },
    fetchSellerRatingMBR(seller_id, buyer_id) {
        if (buyer_id) {
            return makeRequest('GET', '/ajaxrequest/identified/mbr/fetchRatings?input_supplier_id=' + seller_id + '&input_buyer_id=' + buyer_id);
        } else {
            return makeRequest('GET', '/ajaxrequest/identified/mbr/fetchRatings?input_supplier_id=' + seller_id);
        }
    },
    fetchTransactionDetail(seller_id, buyer_id, pageName = 'mbr',modid) {
        return makeRequest('GET', `/ajaxrequest/identified/${pageName}/getTransactiondetails?contact_glid=${seller_id}&user_glid=${buyer_id}&modid=${modid}`);
    },
    getSoiDropOff(listingsource) {
        var data = {
            "glusrid": getCookieValByKey('ImeshVisitor', 'glid'),
            "mobile": getCookieValByKey('ImeshVisitor', 'mb1'),
            "modid": 'IMOB',
            "listing_source": listingsource,
            "validation_key": 'c44e794a7318ba715530cf81297e2071'
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/soidropoff/', data)
    },
    soiUserLogs(pageevent, flag, usertype) {
        var data = {
            "gluserid": getCookieValByKey('ImeshVisitor', 'glid'),
            "usertype": usertype,
            "pageevent": pageevent,
            "flag": flag
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/soiuserlogs/', data)
    },
    getGSTIN(glid = '') {
        if (glid == '') {
            glid = getCookieValByKey('ImeshVisitor', 'glid');
        }
        var data = {
            glusrid: glid,
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/getgst/', data);
    },
    addGST(gst) {
        var data = {
            type: 'CompRgst',
            VALIDATION_KEY: '3245abd21ccaf37b137062f7ccc81269',
            glusridval: getCookieValByKey('ImeshVisitor', 'glid'),
            GST: gst,
            updatedbyId: getCookieValByKey('ImeshVisitor', 'glid'),
            updatedby: getCookieValByKey('ImeshVisitor', 'fn') ? getCookieValByKey('ImeshVisitor', 'fn') : 'User',
            updatedbyScreen: "businessprofile-IMOB",
            userIp: getCookieValByKey('iploc', 'gip'),
            userIpCoun: getCookieValByKey('iploc', 'gcnnm')
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/addGST/', data);
    },
    addPAN(pan) {
        let data = {
            type: 'CompRgst',
            VALIDATION_KEY: '3245abd21ccaf37b137062f7ccc81269',
            glusridval: getCookieValByKey('ImeshVisitor', 'glid'),
            pan_no: pan,
            updatedbyId: getCookieValByKey('ImeshVisitor', 'glid'),
            updatedby: getCookieValByKey('ImeshVisitor', 'fn') ? getCookieValByKey('ImeshVisitor', 'fn') : 'User',
            updatedbyScreen: "businessprofile-IMOB",
            userIp: getCookieValByKey('iploc', 'gip'),
            userIpCoun: getCookieValByKey('iploc', 'gcnnm')
        }
       return makeRequest('POST', '/ajaxrequest/identified/soi/seller/addPAN/', data);
    },
    addCIN(cin) {
        let data = {
            type: 'CompRgst',
            VALIDATION_KEY: '3245abd21ccaf37b137062f7ccc81269',
            glusridval: getCookieValByKey('ImeshVisitor', 'glid'),
            cin_no: cin,
            updatedbyId: getCookieValByKey('ImeshVisitor', 'glid'),
            updatedby: getCookieValByKey('ImeshVisitor', 'fn') ? getCookieValByKey('ImeshVisitor', 'fn') : 'User',
            updatedbyScreen: "businessprofile-IMOB",
            userIp: getCookieValByKey('iploc', 'gip'),
            userIpCoun: getCookieValByKey('iploc', 'gcnnm'),
            ak:getCookieValByKey('im_iss','t')
        }
       return makeRequest('POST', '/ajaxrequest/identified/soi/seller/addCIN/', data);
    },
    fetchBlsforMcat(end, mcatname) {
        var data = {
            'start': end + 1,
            'end': end + 20,
            'flname': mcatname
        }
        return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/fetchMcatBls', data);

    },
    fetchSubGroupBuyleads(end, group_name, sub_group_name) {
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/fetchSubGroupBls?start=' + (end + 1) + '&end=' + (end + 10) + '&grpname=' + sub_group_name + '&parentgrpname=' + group_name);
    },

    fetchSubCategoryBuyleads(category_name) {
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/fetchchSubCatBls?category_name=' + category_name);
    },

    fetchBuyleadsforBlTender(searchKwd, start, end, blNearCity) {
        if (end) {
            return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/search?q=' + searchKwd + '&start=' + start + '&rows=' + (start + end) + '&src=tenderSearch&blNearCity=' + blNearCity);
        }
        else {
            return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/search?q=' + searchKwd + '&start=' + start + '&rows=' + (start + 10) + '&src=tenderSearch&blNearCity=' + blNearCity);
        }
    },
    fetchBuyleadsforBlTenderFilter(searchParam, end, blAuthority = '', blState = '', blCity = '', blCategory = '', searchSrc) {
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/tender?source=' + searchSrc + '&q=' + searchParam + '&start=' + (end) + '&rows=' + (end + 10) + '&blAuthority=' + blAuthority + '&blState=' + blState + '&blCity=' + blCity + '&blCategory=' + blCategory, '', 8000, true);
    },
    fetchBuyleadsforBlsearch(searchKwd, end, blCountry = '', blState = '', blCity = '', blNearCity = '', blCategory = '', LocPref = '', src = '',pref='',istender='') {
        src == '' ? src = 'BlSearch' : '';
        return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/search?q=' + searchKwd + '&start=' + end + '&rows=' + (end + 10) + '&blCountry=' + blCountry + '&blState=' + blState + '&blCity=' + blCity + '&blNearCity=' + blNearCity + '&blCategory=' + blCategory + '&LocPref=' + LocPref + '&src=' + src+ '&pref='+ pref+'&istender='+istender);
    },
    fetchBuyLeadRelatedMcats(mcat_id){
        let data = {
            mcat_id: mcat_id
        }
        return makeRequest('POST', "/ajaxrequest/identified/buyleads/bl/relatedmcat", data);
    },
    fetchBuyLeadMcatId(flname){
        let data = {
            flname: flname
        }
        return makeRequest('POST', "/ajaxrequest/identified/buyleads/bl/getmcatid", data);
    },
    fetchRelatedBuyleads(offer_id = '', mcat_id = '', bl_city_id = '', bl_state_id = '', bl_iso = '') {
        // let user_city_id = (getCookieValByKey('iploc', 'gctid')) ? getCookieValByKey('iploc', 'gctid') : '';
        // let user_iso = getCookieValByKey('iploc', 'gcniso');
        // return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso + '&user_city_id=' + user_city_id + '&user_iso=' + user_iso);
        var isBot = (/googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent));

        if (isBot) {
            return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso);

        }

        else {
            let promise = new Promise(function (resolve, reject) {
                let i = 0;
                let interval = setInterval(() => {
                    if (getCookieValByKey('iploc', 'gctid') && i < 10) {
                        let user_city_id = (getCookieValByKey('iploc', 'gctid')) ? getCookieValByKey('iploc', 'gctid') : '';
                        let user_iso = getCookieValByKey('iploc', 'gcniso');
                        clearInterval(interval);
                        resolve(makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso + '&user_city_id=' + user_city_id + '&user_iso=' + user_iso));
                    }
                    else if (i > 10) {
                        clearInterval(interval);
                        resolve(makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso));
                    }
                    i++;
                }, 250);
            });

            return promise;
        }


    },
    markNotInterested(offer, comment, reasonId, mcatid, srchTxt, offerType, blPageLoc, blpos, grid_val, bl_proforma_keyPresent,CITY_ID='')//to be handled..
    {
        let blposStr = blpos.toString();
        blposStr = Number(blposStr) + 1;
        blposStr = blposStr.toString();
        let str = "";
        var data = {};

        blPageLoc = blPageLoc.replace(/\=/g, '5');
        blPageLoc = blPageLoc.replace(/\#/g, '6');

        let status  = bl_proforma_keyPresent && bl_proforma_keyPresent == 1 ? "&status=2":""
        //if(unit || unit ==""){
        str = "/ajaxrequest/identified/buyleads/bl/notinterested?offer=" + offer + "&ni_type=" + offerType + "&ni_tender=" + "&reject_reason_offer=" + reasonId + "&reject_reason_tender=" + "&reject_comment=" + comment + '&mcatid=' + mcatid + '&searchTxt=' + srchTxt + '&blPageLoc=' + blPageLoc +"&CITY_ID="+CITY_ID+ status
        blposStr && (null != blposStr || blposStr != "") && (str = str + "&serial=" + blposStr)
        grid_val && (null != grid_val || grid_val != "") && (str = str + "&grid_val=" + encodeURIComponent(grid_val))
        //}else{
        //    str="/ajaxrequest/identified/buyleads/bl/notinterested?offer=" + offer + "&ni_type=" + offerType + "&ni_tender=" + "&reject_reason_offer=" + reasonId + "&QTY=" + comment +"&QTY_UNIT="+unit+'&mcatid='+mcatid + '&SRCH_TEXT='+srchTxt + '&blPageLoc='+blPageLoc
        // }
        return makeRequest('GET', str, data);
    },
    getpremium(glid, ga, mode) {
        var data = {
            "glusrid": glid,
            "ga": ga,
            "mode": mode
        };
        return makeRequest('POST', '/ajaxrequest/identified/widgets/premium/', data, 8000);
    },

    getrelatedmcat(MCAT_ID) {

        var data = {};
        return makeRequest('GET', '/ajaxrequest/widgets/relatedMcat?MCAT_ID=' + MCAT_ID, data, 8000, false);
    },
    addIec(iec) {
        var data = {
            type: 'CompRgst',
            VALIDATION_KEY: '3245abd21ccaf37b137062f7ccc81269',
            glusridval: getCookieValByKey('ImeshVisitor', 'glid'),
            IEC: iec,
            updatedbyId: getCookieValByKey('ImeshVisitor', 'glid'),
            updatedby: getCookieValByKey('ImeshVisitor', 'fn') ? getCookieValByKey('ImeshVisitor', 'fn') : 'User',
            updatedbyScreen: "Seller Foreign BuyLead Purchase",
            userIp: getCookieValByKey('iploc', 'gip'),
            userIpCoun: getCookieValByKey('iploc', 'gcnnm')
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/seller/addIec/', data);
    },

    //hsingh
    getrelatedproducts(mcatid, CITY_ID = "", prod,ecomflag="") {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/widgets/relatedproducts?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod + '&ecomflag='+ ecomflag, data, 8000, false);
    },

    getmorerelatedproducts(mcatid, CITY_ID = "", prod, edisplayID) {
        var data = {};
        
        return makeRequest('GET', '/ajaxrequest/widgets/moreproductsrelated?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod + '&edisplayID=' + edisplayID, data, 8000, false);
    },

    getMoreRelatedProductsMessages(prod, edisplayID){
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/messages/moreproductsrelated?prod_count=' + prod + '&edisplayID=' + edisplayID + '&modid=' + userAgentCheck?userAgentCheck:'IMOB', data, 8000, false);
    },

    getsellernearme(mcatid, CITY_ID = "", prod, edisplayID) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/widgets/sellernearme?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod + '&edisplayID=' + edisplayID, data, 8000, false);
    },
    getrecentrelatedmcats(mcats) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/widgets/recentrelatedmcat?mcats=' + mcats, data, 8000, false);
    },

    getrecentData(glusrid, gid) {
        var userModeN = checkUserStatus();
        if (userModeN == '0') {
            var data = {
                "gid": gid,
                "mode": '1'
            };
        } else if (userModeN == '1') {
            var data = {
                "gid": gid,
                "glid": glusrid,
                "mode": '2'
            };
        }
        else if (userModeN == '2') {
            var data = {
                "glid": glusrid,
                "mode": '3'
            };
        }
        return makeRequest('POST', '/ajaxrequest/identified/widgets/recentData/', data, 8000);
    },
    getcitymcats(glusrid, count) {
        var data = {
            "glusrid": glusrid,
            "count": count,
            "cid": (getCookieValByKey('iploc', 'gctid')) ? getCookieValByKey('iploc', 'gctid') : '',
        };
        return makeRequest('POST', '/ajaxrequest/identified/widgets/cityMcats/', data, 8000, false);
    },
    getrecommendedidentified(glid, logdate) {
        var data = {
            "glusrid": glid,
            "date": logdate
        }
        return makeRequest('POST', '/ajaxrequest/identified/widgets/recommendedmcatidentified/', data, 8000);
    },
    getrecommendedidentifiedSearch(glid, logdate) {
        var data = {
            "glusrid": glid,
            "date": logdate
        }
        return makeRequest('POST', '/ajaxrequest/identified/Search/recommendedmcatidentified/', data, 8000);
    },
    uploadImage(formData, imgType,name='') {
        var usr_name= getCookieValByKey('ImeshVisitor', 'fn');
        usr_name= usr_name ? usr_name : name ? name : "IMUser";
        if(usr_name.length>9){
            usr_name = usr_name.substring(0,8);
        }
        formData.append('MODID', 'IMOB');
        formData.append('IMAGE_TYPE', imgType);
        formData.append('USR_ID', getCookieValByKey('ImeshVisitor', 'glid'));
        formData.append('UPLOADED_BY', usr_name);
        formData.append('VALIDATION_KEY', getCookieValByKey('im_iss', 't'));
        let url;
        if (location.hostname == 'm.indiamart.com') {
            url = 'https://uploading.imimg.com/uploadimage';
        } else {
            url = 'https://stg-uploading.imimg.com/uploadimage';
        }

        return new Promise(function (resolve, reject) {
            var a =
                fetch(url, {
                    method: 'POST',
                    body: formData
                }).then(
                    response => response.json() // if the response is a JSON object
                ).then(
                    success => {
                        return success;
                    } // Handle the success response object
                ).catch(
                    error => { return error; }// Handle the error response object
                );
            resolve(a)
        })
    },
    getAddressDetails() {

        return makeRequest('GET', '/ajaxrequest/identified/soi/seller/user/address?lt=' + getCookieValByKey('iploc', 'GeoLoc_lt') + '&lg=' + getCookieValByKey('iploc', 'lg'), 3000);
    },
    verifyDetail(id) {
        var data = {
            id: id
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/verifyDetail/', data);
    },
    verifyEmailWithoutOtp(email) {
        var data = {
            "VALIDATION_KEY": "e02a3fab4c6c735015b9b4f4a1eb4e3c",
            "action_flag": "SP_VERIFY_ATTRIBUTE",
            "GLUSR_USR_ID": getCookieValByKey('ImeshVisitor', 'glid'),
            "ATTRIBUTE_ID": "109",
            "ATTRIBUTE_VALUE": email,
            "VERIFIED_BY_ID": "",
            "VERIFIED_BY_NAME": "",
            "VERIFIED_BY_AGENCY": "Mail_Google",
            "VERIFIED_BY_SCREEN": "IMOB_SOI_Personal_Details",
            "VERIFIED_URL": null,
            "VERIFIED_IP": getCookieValByKey('iploc', 'gip'),
            "VERIFIED_IP_COUNTRY": getCookieValByKey('iploc', 'gcnnm'),
            "VERIFIED_COMMENTS": "Following Data Has Been Verified Through google gmail Process",
            "VERIFIED_AUTHCODE": null
        }


        return makeRequest('POST', '/ajaxrequest/identified/soi/verifyEmailWithoutOtp/', data);

    },
    tncacceptance() {
        var data = {
            "USER_AGENT": navigator.userAgent,
            "IP": getCookieValByKey('iploc', 'gip'),
            "IP_COUNTRY": getCookieValByKey('iploc', 'gcnnm'),
            "IP_COUNTRY_ISO": getCookieValByKey('iploc', 'gcniso'),
            "USR_ID": getCookieValByKey('ImeshVisitor', 'glid')
        }


        return makeRequest('POST', '/ajaxrequest/identified/tncacceptance/', data, '', false);

    },

    addGSTDispositions(gstdata) {
        let data = {
            "GLID": getCookieValByKey('ImeshVisitor', 'glid'),
            "ATTRIBUTE_NAME": gstdata.GL_ATTRIBUTE_NAME,
            "DISPOSITION": gstdata.GL_DISPOSITION,
            "MASTER_ID": gstdata.gl_master_id
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/addGstDisposition/', data, '', false);
    },
    getGSTDispositionsList() {
        let data = {};
        return makeRequest('POST', '/ajaxrequest/identified/soi/getGstDispositionList/', data, '', false);
    },
    getGSTDispositions() {
        let data = {
            "glid": getCookieValByKey('ImeshVisitor', 'glid')
        }
        return makeRequest('POST', '/ajaxrequest/identified/soi/getGstDisposition/', data, '', false);
    },
    getstdproducts(mcatid, counter) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/widgets/stdproducts?MCAT_ID=' + mcatid + '&Counter=' + counter, data, 8000, false);
    },
    addDBTrackingSOI(dbdata) {
        let data = {
            LOG_ID: dbdata.LOG_ID ? dbdata.LOG_ID : '',
            GLID: dbdata.GLID ? dbdata.GLID : '',
            MOBILE: dbdata.MOBILE ? dbdata.MOBILE : '',
            FCP_STATUS: dbdata.FCP_STATUS ? dbdata.FCP_STATUS + '' : '0',
            CUSTTYPE_ID: dbdata.CUSTTYPE_ID ? dbdata.CUSTTYPE_ID : getCookieValByKey('ImeshVisitor', 'cmid') ? getCookieValByKey('ImeshVisitor', 'cmid') : '',
            JOURNEY_COMPLETED: dbdata.JOURNEY_COMPLETED ? dbdata.JOURNEY_COMPLETED : '',
            BEST_TIME_TO_CALL: dbdata.BEST_TIME_TO_CALL ? dbdata.BEST_TIME_TO_CALL : '',
            MODID: dbdata.MODID ? dbdata.MODID : 'IMOB',
        }
        if (dbdata.IS_USR_NAME)
            data['IS_USR_NAME'] = dbdata.IS_USR_NAME;
        if (dbdata.IS_COMPANYNAME)
            data['IS_COMPANYNAME'] = dbdata.IS_COMPANYNAME;
        if (dbdata.IS_EMAIL)
            data['IS_EMAIL'] = dbdata.IS_EMAIL;
        if (dbdata.PROD_CNT)
            data['PROD_CNT'] = dbdata.PROD_CNT;
        if (dbdata.IS_ADDRESS)
            data['IS_ADDRESS'] = dbdata.IS_ADDRESS;
        if (dbdata.IS_GST)
            data['IS_GST'] = dbdata.IS_GST;

        return makeRequest('POST', '/ajaxrequest/identified/soi/soiDbTracking/', data, '', false);
    },
    addC2Ctrack(inpdata) {
        let email = getCookieValByKey('ImeshVisitor', 'em');
        var data = {
            C2C_MODID: "IMOB",
            C2C_CALLER_GLUSR_ID: getCookieValByKey('ImeshVisitor', 'glid'),
            C2C_CALLER_EMAIL: getCookieValByKey('ImeshVisitor', 'em'),
            C2C_CALLER_NUMBER: !isNaN(getCookieValByKey('ImeshVisitor', 'mb1'))?getCookieValByKey('ImeshVisitor', 'mb1'):'',
            C2C_CALLER_IP: getCookieValByKey('iploc', 'gip'),
            C2C_CALLER_COUNTRY_ISO: getCookieValByKey('ImeshVisitor', 'iso'),
            C2C_RECEIVER_GLUSR_ID: inpdata.glusrid,
            C2C_RECEIVER_NUMBER: inpdata.CONTACT_NUMBER,
            C2C_NUMBER_TYPE: (inpdata.CONTACT_TYPE == 'PNS') ? 'P' : 'M',
            C2C_REFERER_URL: window.location.href,
            C2C_CALLER_USERAGENT: navigator.userAgent,
            C2C_PAGE_TYPE: inpdata.PageName+(window.whatsAppBl?window.whatsAppBl:""),
            C2C_SMARTPHONE: "1",
            MODREFID: inpdata && inpdata.modrefid ? inpdata.modrefid.toString():"",
            MODREFNAME: inpdata && inpdata.modrefname,
            MODREFTYP:inpdata && inpdata.modrefid==""?"6":"5",
            C2C_RECORD_TYPE: inpdata && inpdata.C2C_RECORD_TYPE ? inpdata.C2C_RECORD_TYPE : "",
            C2C_CLICK_AT: inpdata && inpdata.C2C_CLICK_AT ? inpdata.C2C_CLICK_AT : "",
        }
        return makeRequest('POST', '/ajaxrequest/identified/call/', data, '', false);
    },
    fetchSellerRating(seller_id, buyer_id) {
        if (buyer_id) {
            return makeRequest('GET', '/ajaxrequest/identified/messages/fetchRatings?input_supplier_id=' + seller_id + '&input_buyer_id=' + buyer_id);
        } else {
            return makeRequest('GET', '/ajaxrequest/identified/messages/fetchAvgRating?input_supplier_id=' + seller_id);
        }
    },
    getInfluParam(){
        return makeRequest('GET', '/ajaxrequest/identified/messages/influParam');
    },
    submitUserRating(buyer_id, seller_id, rating_val, rating_comments, influ_param, rating_type,ImgOption,bsType,modrefId,last_transaction_type,mcatId,mcatName,prodName) {
        let data = {
            'seller_id': seller_id,
            'buyer_id': buyer_id,
            'rating_val': rating_val,
            'IP': getCookieValByKey('iploc', 'gip'),
            'IP_COUNTRY': getCookieValByKey('iploc', 'gcnnm'),
            'rating_comments': rating_comments,
            'influ_param': influ_param,
            'rating_type': rating_type,
            'img_option' : ImgOption,
            'BS_RATING_TYPE' : bsType,
            'MODREF_ID' : modrefId,
            'MODREF_TYPE':last_transaction_type,
            'mcatId' : mcatId,
            'mcatName' : mcatName,
            'prodName' : prodName,
            "Mod_id": userAgentCheck?userAgentCheck:'IMOB',

        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/submitRating/', data);
    },
    fetchAvgRating(seller_id) {
        return makeRequest('GET', '/ajaxrequest/identified/messages/fetchAvgRating?input_supplier_id=' + seller_id);
    },
    getLastSeen(glid) {
        let data = {};
        return makeRequest('GET', '/ajaxrequest/identified/messages/userlastseen?glid=' + glid, data, '', false);
    },
    getlocality(pincode) {
        
        let data = {
           pincode: pincode,
        }
        return makeRequest('POST', '/ajaxrequest/locality', data);
    },
    getMiniDetails() {
        
        let glusrId=getCookieValByKey('ImeshVisitor','glid');
        let userData={
                         modid :'IMOB',
                         token : 'imobile@15061981',
                         glusrid : glusrId
         };
        return makeRequest('POST', '/ajaxrequest/soi/user/minidetail',userData);
    },
    addEditProduct(data) {
        let glid = getCookieValByKey('ImeshVisitor', 'glid');
        let proddata = {
            "item_id": data.item_id,
            "pcid": data.pcid,
            "HIST_COMMENTS": "",
            "GLUSR_USR_ID": glid,
            "approval_status": 0,
            "UPDATEDBY_ID": glid,
            "updated_by": glid,
            "remote_host": getCookieValByKey('iploc', 'gip'),
            "country_name": getCookieValByKey('iploc', 'gcnnm'),
            "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269",
            "modules": "Mobile Add product screen",
            "referral_url": data.referral_url,
            "script_url": data.script_url,
        }

        if (data.param_list) proddata["param_list"] = data.param_list;
        if (data.item_name) proddata["item_name"] = data.item_name;
        if (data.item_description) proddata["item_description"] = data.item_description;
        if (data.in_pc_item_fob_price) {
            proddata["in_pc_item_fob_price"] = data.in_pc_item_fob_price;
            proddata["in_pc_item_fob_price_currency"] = "INR";
        }
        if (data.in_pc_item_min_order_quantity) {
            proddata["in_pc_item_min_order_quantity"] = data.in_pc_item_min_order_quantity;
        }
        if (data.in_pc_item_moq_unit_type) {
            proddata["in_pc_item_moq_unit_type"] = data.in_pc_item_moq_unit_type;
        }
        if (data.cat_id) {
            proddata["cat_id"] = data.cat_id;
        }
        if (data.new_mcat_mapping) {
            proddata["old_mcat_mapping"] = data.old_mcat_mapping;
            proddata["new_mcat_mapping"] = data.new_mcat_mapping;
        }
        if (data.action_flag) {
            proddata["UPDATESCREEN"] = "Seller (Manage Product Screen)";
            proddata["IN_PC_ITEM_IMAGE_UPDATEDBY_ID"] = "";
            proddata["IP"] = getCookieValByKey('iploc', 'gip');
            proddata["IP_COUNTRY"] = getCookieValByKey('iploc', 'gcnnm');
            proddata["ACTION"] = data.ACTION;
            proddata["action_flag"] = "image";
            proddata["IN_PC_ITEM_IMAGE_ID"] = data.IN_PC_ITEM_IMAGE_ID;
            proddata["IN_PC_ITEM_IMAGE_ORIG_WIDTH"] = data.IN_PC_ITEM_IMAGE_ORIG_WIDTH;
            proddata["IN_PC_ITEM_IMAGE_ORIG_HEIGHT"] = data.IN_PC_ITEM_IMAGE_ORIG_HEIGHT;
            proddata["IN_PC_ITEM_IMAGE_125X125_WD"] = data.IN_PC_ITEM_IMAGE_125X125_WD;
            proddata["IN_PC_ITEM_IMAGE_125X125_HT"] = data.IN_PC_ITEM_IMAGE_125X125_HT;
            proddata["IN_PC_ITEM_IMAGE_250X250_WD"] = data.IN_PC_ITEM_IMAGE_250X250_WD;
            proddata["IN_PC_ITEM_IMAGE_250X250_HT"] = data.IN_PC_ITEM_IMAGE_250X250_HT;
            proddata["IN_PC_ITEM_IMAGE_500X500_WD"] = data.IN_PC_ITEM_IMAGE_500X500_WD;
            proddata["IN_PC_ITEM_IMAGE_500X500_HT"] = data.IN_PC_ITEM_IMAGE_500X500_HT;
            proddata["IN_PC_ITEM_IMAGE_ORIGINAL"] = data.IN_PC_ITEM_IMAGE_ORIGINAL;
            proddata["IN_PC_ITEM_IMAGE_125X125"] = data.IN_PC_ITEM_IMAGE_125X125;
            proddata["IN_PC_ITEM_IMAGE_250X250"] = data.IN_PC_ITEM_IMAGE_250X250;
            proddata["IN_PC_ITEM_IMAGE_500X500"] = data.IN_PC_ITEM_IMAGE_500X500;
        }
        if (data.item_img_original) {
            proddata["item_img_original"] = data.item_img_original,
                proddata["in_pc_item_img_original_wh"] = data.in_pc_item_img_original_wh,
                proddata["item_img_small"] = data.item_img_small,
                proddata["in_pc_item_img_small_wh"] = data.in_pc_item_img_small_wh,
                proddata["item_img_small_125x125"] = data.item_img_small_125x125,
                proddata["in_pc_img_small_125x125_wh"] = data.in_pc_img_small_125x125_wh,
                proddata["item_img_small_500x500"] = data.item_img_small_500x500,
                proddata["in_pc_img_small_500x500_wh"] = data.in_pc_img_small_500x500_wh
        }
        // let proddata  = data;
        return makeRequest('POST', '/ajaxrequest/identified/products/addEditProducts/', proddata, '', false);
    },
    deleteProduct(id) {
        let glid = getCookieValByKey('ImeshVisitor', 'glid');

        let proddata = {
            "GLUSR_USR_ID": glid,
            "item_id": id,
            "HISTORY": "",
            "debug_msg": "",
            "err_pos": "",
            "DELETED_BY_ID": "0",
            "DELETED_BY_NAME": "User",
            "UPDATESCREEN": "Mobile Add product screen",
            "IP": getCookieValByKey('iploc', 'gip'),
            "IP_COUNTRY": getCookieValByKey('iploc', 'gcnnm'),
            "action_flag": "del",
            "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269"
        }
        return makeRequest('POST', '/ajaxrequest/identified/products/prddelete/', proddata, '', false);
    },
    unitSuggestor(val) {
        return makeRequest('GET', '/ajaxrequest/identified/products/unitSugg?val=' + val, '', false);
    },
    getProductMcats(val) {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/products/mcat?val=' + val, data, '', false);
    },
    getNegativeaMcat() {
        var data = {};
        return makeRequest('GET', '/ajaxrequest/identified/products/negmcat?glid=' + getCookieValByKey('ImeshVisitor', 'glid'), data, '', false);
    },

    suggestedReplies(loginGlid,contactGlid) {
        let data = {
            "loggedin_glid":loginGlid,
            "contact_user_glid":contactGlid
        }
        return makeRequest('POST', '/ajaxrequest/identified/messagecenter/suggestiveReply/', data);
    },
    createTemplate(glusrid,modid,template_label,template_desc,template_order){  
        let data = {
            "glusrid": glusrid,
            "modid": userAgentCheck?userAgentCheck:'IMOB',
            "template_label": template_label,
            "template_desc": template_desc,
            "template_order": template_order,
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/createTemplate', data)
    },
    getTemplate(glusrid,modid,type){
        let data = {
            "glusrid": glusrid,
            "modid": userAgentCheck?userAgentCheck:'IMOB',
            "type":type,
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/getTemplate', data)
    },
    getResponseRate(glusrid) {
        let data = {
            "glusrid": glusrid,
            "modid":userAgentCheck?userAgentCheck:'IMOB'
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/getResponseRate', data)
    },
    blockUser(user_glid, blocked_glid, blocked_status) {
        let data = {
            "user_glid": user_glid,
            "blocked_glid": blocked_glid,
            "blocked_status": blocked_status,
            "user_ip" : getCookieValByKey('iploc', 'gip')
        }
        return makeRequest('POST', '/ajaxrequest/identified/messages/blockUser', data)
    },
    getMcatDetails(mcat_id) {
        let data={
            "mcatid": mcat_id
        };
        return makeRequest('POST', '/ajaxrequest/identified/messages/getMcatDetails', data);
    },
    getFullLoginData(token, glid, mob_no) {
        let data={
            "token": token,
            "glid":glid,
            "mob_no":mob_no
        };
        return makeRequest('POST', '/ajaxrequest/identified/messages/getFullLoginData', data);
    },
    AddProductGroup(grpname) {
        let glid = getCookieValByKey('ImeshVisitor', 'glid');
        let data = {
            "glusr_usr_id": glid,
            "grp_name": grpname,
            "in_last_modified_by": "M",
            "updatedby": "",
            "updatedby_id": "62836",
            "remote_host": getCookieValByKey('iploc', 'gip'),
            "country_name": getCookieValByKey('iploc', 'gcnnm'),
            "module": "IMOB",
            "force_grp_name_no_repeate": 1,
            "status": 0,
            "modifystatus": "T",
            "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269",
            "update_col_list": ",glusr_usr_id,grp_name,in_last_modified_by,modifystatus",
        }
        return makeRequest('POST', '/ajaxrequest/identified/products/addGroup/', data, '', false);
    },
    isEnterprize() {
        let data = {};
       return makeRequest('GET', `/ajaxrequest/identified/Buylead/isEnterprize?glid=${getCookieValByKey('ImeshVisitor', 'glid')}&AK=${getCookieValByKey('im_iss','t')}` ,data,'',false);
    } ,

};


function makeRequestFile(method, url, file) {
    if (typeof window) {
        glid = getCookieValByKey('ImeshVisitor', 'glid');
    }
    return new Promise(function (resolve, reject) {
        var fl = file;
        var fd = new FormData;
        var xhr = new XMLHttpRequest();
        fd.append("uploads[]", fl, fl.name);
        fd.append("glid", glid);
        xhr.open(method, url);
        xhr.timeout = 100000; // time in milliseconds

        xhr.onload = function () {
            if (this.status == 200 && this.readyState == 4) {
                return resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.ontimeout = function (e) {
            gaTrack.trackEvent('Image-Attachment-PWA', 'Image-Upload', 'ImageTimeOut', 0, true);
            reject();
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(fd);
    });
    //}
}

function makeRequest(method, url, body, timeout = 8000, glidAppend = true) {
    versionUp('XHR');
    if (typeof window) {
        glid = getCookieValByKey('ImeshVisitor', 'glid');
    }
    return new Promise(function (resolve, reject) {
        if (method === "GET") {
            if (glid) {
                if (url.indexOf("?") >= 0 && glidAppend) {
                    url += "&glid=" + glid;
                } else {
                    if (glid && glidAppend) {
                        url += "?glid=" + glid;
                    }
                }
            }
        }
        else {
            if (glidAppend) {
                body['glid'] = glid;
            }
            body = JSON.stringify(body);
        }

        let isMsgMod = false;
        if (url.indexOf('messagecenter') != -1) {
            isMsgMod = true;
        }

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.timeout = timeout;
        xhr.ontimeout = function () {

            if(url!=="/ajaxrequest/identified/timeout/")
            {
                let pagename = "";
                if(window.pagename) pagename = "_"+window.pagename;
                gaTrack.trackEvent(['Timeout', "PWA", url+pagename, 0, true]);
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    isMsgMod: isMsgMod,
                    requestStatus: "timeout"
                });
            }
        }
        xhr.onload = function () {
            if (this.status == 200 && this.readyState == 4) {
                if (url.indexOf('/ajaxrequest/search/search') != -1) {
                    if (!document.getElementById('searchListing')) {
                        generateGAforPLT('PWA', 'First_load_search', 'search_service', Date.now() - window.searchAPITime);
                    }
                    else if (url.indexOf('&start=0') != -1) {
                        generateGAforPLT('PWA', 'subsequent_load_search', 'search_service', Date.now() - window.searchAPITime);
                    } else {
                        generateGAforPLT('PWA', 'search_autofetch_search', 'search_service', Date.now() - window.searchAPITime);
                    }
                }

                var res = xhr.response ? xhr.response.includes("doctype")?"":JSON.parse(xhr.response) : '';
                if (res !== undefined && res.response_reauth !== undefined && (res.response_reauth == false || res.response_reauth == 4)) {
                    window.reauthApi = res;
                    resetCookies(res.response_reauth);
                }

                else {
                    return resolve(res);
                }
            }
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    isMsgMod: isMsgMod
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
                isMsgMod: isMsgMod
            });
        };
        xhr.send(body);
    });


}

export default imApi;

