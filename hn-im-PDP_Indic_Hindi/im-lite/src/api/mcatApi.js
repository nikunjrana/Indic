import {getCookieValByKey,getCookie} from '../Globals/CookieManager';
import { gaTrack } from '../Globals/GaTracking';
import makeREQUEST from '../Globals/RequestsHandler/makeRequest';

function makeRequest(method, url, body={}, timeout = 80000) {

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.timeout = timeout;
        xhr.ontimeout = function () {
            if(url!='/ajaxrequest/identified/timeout/'){
                let pagename = "";
                if(window.pagename) pagename = "_"+window.pagename;
                gaTrack.trackEvent(['Timeout',"PWA", url+pagename, 0, true])
            }
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
        xhr.onload = function () {
            if (this.status == 200 && this.readyState == 4) {
                var res = JSON.parse(xhr.response);
                return resolve(JSON.parse(xhr.response));
                
            }
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        xhr.send(JSON.stringify(body));

    });


}

const mcatApi = {

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
            'ph_code': logindata.cncode,
            'glid': getCookieValByKey('ImeshVisitor', 'glid') ? getCookieValByKey('ImeshVisitor', 'glid') : '',
            'glusr_usr_ip': (getCookieValByKey('iploc', 'gip')) ? getCookieValByKey('iploc', 'gip') : '',
            'duplicateEmailCheck': logindata.duplicateEmailCheck ? logindata.duplicateEmailCheck : ''
        };
        return makeRequest('POST', '/ajaxrequest/identified/common/login', data);
    },
    otpVerf(otpdata) {
        let data = {
            "user": otpdata.user,
            "screenName": (otpdata.screenName) ? otpdata.screenName : '',
            "type": otpdata.type,
            "authCode": otpdata.authCode,
            "glusr_id": getCookieValByKey('ImeshVisitor', 'glid'),
            "ciso": otpdata.ciso,
            "email": otpdata.email,
            "user_mobile_country_code": getCookieValByKey('ImeshVisitor', 'phcc'),
            "user_country": otpdata.countryName,
            "userIp": getCookieValByKey('iploc', 'gip'),
            "OTPResend": otpdata.OTPResend,
            "emailVerify": otpdata.emailVerify ? otpdata.emailVerify : '',
            "source": otpdata.source ? otpdata.source : '',
            "msg_key": otpdata.msg_key ? otpdata.msg_key : 0,
        };
        return makeRequest('POST', '/ajaxrequest/identified/common/otpVerification', data);
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
            "reauth": 0,
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
    getSearchCity(city = '') {
        var data = {}
        return new Promise(function (resolve) {
            var res = $.ajax({
                url:  `https://suggest.imimg.com/suggest/suggest.php?q=${city}&limit=1&type=city&method=exact&fields=id,state,stateid,flname,alias`,
                cache: false,
                success: function (response) {
                    return JSON.parse(response);
                },
                timeout: 3000
            });
            resolve(res);
        });
    }
    ,
    getCityIndexData(cityName){
       
        let url = '/ajaxrequest/unidentified/cityIndex?cityFlName=' + cityName;
        const method = 'GET';

        return makeREQUEST(method,url);
    }
}

export default mcatApi;

