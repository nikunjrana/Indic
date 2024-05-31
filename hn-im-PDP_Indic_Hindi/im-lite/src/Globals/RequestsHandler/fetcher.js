import { resetCookies } from '../MainFunctions';
import { gaTrack } from '../GaTracking';

let reqObj = {
    method: 'GET',
    url: '',
    body: {},
    timeout: 8000,
    headers: { "Content-type": "application/json" },
}
// function ontimeout() {
//     trackTimeout(reqObj.url);
//     gaTrack.trackEvent(['Timeout', "PWA", reqObj.url, 0, true]);
//     return ({
//         statusText: "service-timeout"
//     });
// }
function onload(xhr) {
    let data = '';
    if (100 <= xhr.status && xhr.status <= 199) {
        data = ({
            status: xhr.status,
            statusText: 'info'
        });
    }
    else if (xhr.status == 200) {
        let res = JSON.parse(xhr.response);
        if (res !== undefined && res.response_reauth !== undefined && (res.response_reauth == false || res.response_reauth == 4)) {
            window.reauthFetcher = res;
            resetCookies(res.response_reauth);
            data = ({
                status: xhr.status,
                statusText: 'Reauth',
                response: 'Cookies Removed'
            });
        }
        else {
            data = ({
                status: xhr.status,
                statusText: 'ok',
                response: res
            });
        }
    }
    else if (201 <= xhr.status && xhr.status <= 299) {
        let res = JSON.parse(xhr.response);
        data = ({
            status: xhr.status,
            statusText: 'success',
            response: res
        });
    }
    else if (400 <= xhr.status && xhr.status <= 499) {
        data = ({
            status: xhr.status,
            statusText: 'client-error'
        });
    }
    else {
        data = ({
            status: xhr.status,
            statusText: 'server-error'
        });
    }
    return (data);
}
function onerror(xhr) {
    return ({
        status: xhr.status,
        statusText: xhr.statusText
    });
}
function getXHRObj() {
    let xhr = '';
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
}
function fetchReq(resolve, reject) {
    let xhr = getXHRObj();
    if (xhr) {
        xhr.open(reqObj.method, reqObj.url);
        for (let key in reqObj.headers) {
            xhr.setRequestHeader(key, reqObj.headers[key])
        }
        xhr.timeout = reqObj.timeout;
        xhr.ontimeout = function () {
            trackTimeout(reqObj.url);
            reject({
            statusText: "service-timeout"
            });
        }
        xhr.onload = function () {
            resolve(onload(xhr))
        }
        xhr.onerror = function () {
            reject(onerror(xhr))
        }
        xhr.send(JSON.stringify(reqObj.body));
    }
    else {
        reject("XHR Failed")
    }
}
function trackTimeout(url) {
    if(url!='/ajaxrequest/identified/timeout/'){
        let pagename = "";
        if(window.pagename) pagename = "_"+window.pagename;
        gaTrack.trackEvent(['Timeout', "PWA", url+pagename, 0, true]);
    }
}
export default function controller(reqInputs = {}) {
        return new Promise((resolve, reject) => {
            let reqData = {
                method: reqInputs.method ? reqInputs.method : 'GET',
                url: reqInputs.url ? reqInputs.url :'',
                body: reqInputs.body ? reqInputs.body :{},
                timeout: reqInputs.timeout ? reqInputs.timeout : 8000,
                headers: reqInputs.headers ? reqInputs.headers : { "Content-type": "application/json" },
            }
            let xhr = getXHRObj();
            if (xhr) {
                xhr.open(reqData.method, reqData.url);
                for (let key in reqData.headers) {
                    xhr.setRequestHeader(key, reqData.headers[key])
                }
                xhr.timeout = reqData.timeout;
                xhr.ontimeout = function () {
                    trackTimeout(reqData.url);
                    reject({
                        statusText: "service-timeout"
                    });
                }
                xhr.onload = function () {
                    resolve(onload(xhr))
                }
                xhr.onerror = function () {
                    reject(onerror(xhr))
                }
                xhr.send(JSON.stringify(reqData.body));
            }
            else {
                reject("XHR Failed")
            }
        });
    // else{
    //     reqObj = { ...reqObj, ...reqInputs };
    //     let dataReq = new Promise(fetchReq);
    //     return dataReq;
    // }
}

