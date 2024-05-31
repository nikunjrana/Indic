
import { gaTrack } from './GaTracking';
import { resetCookies } from './MainFunctions';

export default function getData(method, url, body = {}, timeout = 8000) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.timeout = timeout;
        xhr.ontimeout = function () {
            trackTimeout(url);
            reject({
                status: this.status,
                response: '',
            });
        }
        xhr.onload = function () {
            if (this.status == 200 && this.readyState == 4) {
                var res = JSON.parse(xhr.response);
                if (res !== undefined && res.response_reauth !== undefined && (res.response_reauth == false || res.response_reauth == 4)) {
                    window.reauthMake = res;
                    resetCookies(res.response_reauth);
                }
                else {
                    return resolve({ status: this.status, response: res });
                }
            }
            else {
                reject({
                    status: this.status,
                    response: ''
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                response: ''
            });
        };
        xhr.send(body);
    });

}
function trackTimeout(url) {
    if(url!=='/ajaxrequest/identified/timeout/'){
        let pagename = "";
        if(window.pagename) pagename = "_"+window.pagename;
        gaTrack.trackEvent(['Timeout', "PWA", url+pagename, 0, true])
    }
}
