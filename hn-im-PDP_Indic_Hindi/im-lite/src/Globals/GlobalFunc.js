import { browserHistory } from 'react-router';
import {eventTracking, A2HSApp} from './GaTracking';
import {getCookie, getCookieValByKey, setCookie, deleteCookie} from './CookieManager';
import {checkUserStatus, trackAppVer} from './MainFunctions';
// import { setCityLatLong } from '../modules/McatSearchFilter/CityView/NearMe/setLatLong';

export const goToRoute = (pathTo, gaArr) => {
    browserHistory.push(pathTo);
}
export const showToIndianUser = () => {
    if ((!checkUserStatus() && getCookie("iploc") && getCookie("iploc") != '' && getCookieValByKey('iploc', 'gcniso') == "IN") || (getCookieValByKey('ImeshVisitor', 'glid') != '' && getCookieValByKey('ImeshVisitor', 'iso') == "IN")) {
        return true;
    }
    else {
        return false;
    }
}
export const showSOI = () => {
    if ((!checkUserStatus() && getCookie("iploc") && getCookie("iploc") != '' && getCookieValByKey('iploc', 'gcniso') == "IN") || (getCookieValByKey('ImeshVisitor', 'glid') != '' && getCookieValByKey('ImeshVisitor', 'iso') == "IN")) {
        return true;
    }
    else {
        return false;
    }
}
export const detectLocation = (geoLocState) => {
    if (navigator && navigator.geolocation) {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state == 'granted') {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log('Geolocation permissions granted');
                        console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                        eventTracking('GEOLOCATION', 'Geolocation Allow', 'search', true)

                        let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) +"|createdate="+ new Date().getTime()
                        // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) +"|createdate="+ new Date().getTime(), 3)
                        let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                        if(iplocCookie.includes("|GeoLoc_"))
                        iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                        setCookie('iploc', iplocCookie + geolocParams, 0.125);
                        geoLocState(result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                    }, function (error) {
                        console.log('Geolocation Error-' + error.message)
                        eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                        eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                        setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                        geoLocState("denied");
                    }
                    );
                }
                else if (result.state == 'denied') {
                    console.log("Unable to detect location");
                    geoLocState(result.state);
                }
                else if (result.state == 'prompt') {
                    console.log('Geolocation permissions asked again');
                    navigator.geolocation.getCurrentPosition(function (position) {
                    }
                        , function (error) {
                            console.log('Geolocation Error-' + error.message)
                            console.log('Phone location settings disabled. Please allow.');
                            geoLocState("denied-phone");
                        }
                    );
                    result.onchange = function () {
                        if (this.state == 'granted') {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                console.log('Geolocation permissions granted');
                                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);

                                let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                                // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3)
                                let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                                if(iplocCookie.includes("|GeoLoc_"))
                                iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                                setCookie('iploc', iplocCookie + geolocParams, 0.125);
                                geoLocState("prompt-" + result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                            }, function (error) {
                                console.log('Geolocation Error-' + error.message)
                                eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                                eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                                setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                                geoLocState("denied");
                            }
                            );
                        } else if (this.state == 'denied') {
                            geoLocState("prompt-" + result.state);
                        }
                    }
                }
            });
        }
        else {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('Geolocation permissions granted');
                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                eventTracking('GEOLOCATION', 'Geolocation Allow', 'search', true)
                
                let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 1)
                let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                if(iplocCookie.includes("|GeoLoc_"))
                iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                setCookie('iploc', iplocCookie + geolocParams, 0.125);
                geoLocState("granted", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
            }, function (error) {
                console.log('Geolocation Error-' + error.message)
                eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                geoLocState("denied");
            }
            );
        }

    }
}
export const validate_mobile = (mobNo) => {
    var error = '',
        mobrRegex = /^[0-9-+()./ ]*$/,
        filter = /^(?:(?:\+|0{0,2})(91|910)(\s*[\-]\s*)?|[0]?)?[16789]\d{9}$/;
    if (mobNo == '' || mobNo.length == 0) {
        error = "Please enter mobile number";
        return error;
    } else if(isNaN(mobNo)) {
        error = "Please enter correct mobile number";
        return error;
    }
    else if (mobrRegex.test(mobNo)) {
        if (mobNo.length > 10 || mobNo.length < 10) {
            mobNo = mobNo.replace(/^((91){0,1}0{0,})/g, '');
            if (mobNo.length != 10) {
                error = "Please enter 10 digit mobile number";
                return error;
            }
            else {
                return error;
            }
        }
        if (!filter.test(mobNo)) {
            error = "Please enter correct mobile number";
            return error;
        }
        else {
            return error;
        }
    }
    else {
        return error;
    }

}
export const validate_email = (email) => {
    var error = '',
        emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (email == '' || email.length == 0) {
        error = "Email cannot be blank";
        return error;
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email))) {
        error = "Please enter a valid email";
        return error;
    }
    else {
        return error
    }
}
export const resetCookies = (access) => {
    if (access == 4) {
        deleteCookie('v4iilex');
        deleteCookie('im_iss');
        window.location.reload();
    }
    else {
        deleteCookie('ImeshVisitor');
        deleteCookie('v4iilex');
        deleteCookie('im_iss');
        deleteCookie('userDet');
        window.location.href = "https://m.indiamart.com?src=reauth_pwa";
    }
}
export const timeSince = (date) => {
    var secs = Math.abs(Math.floor(((new Date).getTime() - date) / 1000));
    var minutes = secs / 60;
    if (minutes < 1) {
        return secs + (secs > 1 ? ' secs ago' : ' sec ago');
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + (minutes > 1 ? ' mins ago' : ' min ago');
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + (hours > 1 ? ' hrs ago' : ' hr ago');
    }
    var weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
        return days + (days > 1 ? ' days ago' : ' day ago');
    }
    var months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
        return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
    }
    var years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
        return months + (months > 1 ? ' months ago' : ' month ago');
    }
    years = Math.floor(years);
    return years + (years > 1 ? ' yrs ago' : ' yr ago');
}
export const clickToCall = (mobile, gluserId, PNS, MODID, pagetype) => {
    if ((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)) {
        pagetype += '|A2HS';
    }
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", "https://m.indiamart.com/ctc_track.php", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("m=" + mobile + "&amp;Id=" + gluserId + "&amp;PNS=" + PNS + "&amp;MODID=" + MODID + "&amp;pageType=" + pagetype);
}
// export const numTostring = (data) => {
//     var new_data = [];
//     data.map((val, key) => {
//         const Entities = require('he');
//         var decode = Entities.decode(val);
//         new_data.push(decode);
//     });
//     return new_data;
// }
// export const doxssHandling = (post_data) => {
//     var post_data = numTostring(post_data);
//     var xsslist = getXSSList();
//     var datauriregex = /(data:)([a-z]+\/[a-z0-9\-\+\.]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%]*\s*/i;
//     for (var i = 0; i < post_data.length; i++) {
//         post_data[i] = post_data[i].replace(/\s/gi, "");
//         if (xsslist.test(post_data[i]) || datauriregex.test(post_data[i])) {
//             var data = { 'code': '206', 'message': 'Invalid Input!' };
//             return data;
//         }
//     }
//     var data = { 'code': '200', 'message': 'Success' };
//     return data;
// }
// export const getXSSList = () => {
//     var list = /(javascript:|&lt;script|<script|&lt;\/script|<\/script|script&gt;|script>|&lt;\/xml|<\/xml|xml&gt;|xml>|&lt;object|<object|&lt;\/object|<\/object|object&gt;|object>|vbscript:|livescript:|&lt;javascript|javascript:|alert\(|&lt;iframe|<iframe|@import|&lt;META|<META|FSCommand|onAbort|onActivate|onAfterPrint|onAfterUpdate|onBeforeActivate|onBeforeCopy|onBeforeCut|onBeforeDeactivate|onBeforeEditFocus|onBeforePaste|onBeforePrint|onBeforeUnload|onBeforeUpdate|onBegin|onBlur|onBounce|onCellChange|onChange|onClick|onContextMenu|onControlSelect|onCopy|onCut|onDataAvailable|onDataSetChanged|onDataSetComplete|onDblClick|onDeactivate|onDrag|onDragEnd|onDragLeave|onDragEnter|onDragOver|onDragDrop|onDragStart|onDrop|onEnd|onError|onErrorUpdate|onFilterChange|onFinish|onFocus|onFocusIn|onFocusOut|onHashChange|onHelp|onInput|onKeyDown|onKeyPress|onKeyUp|onLayoutComplete|onLoad|onLoseCapture|onMediaComplete|onMediaError|onMessage|onMouseDown|onMouseEnter|onMouseLeave|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onMouseWheel|onMove|onMoveEnd|onMoveStart|onOffline|onOnline|onOutOfSync|onPaste|onPause|onPopState|onProgress|onPropertyChange|onReadyStateChange|onRedo|onRepeat|onReset|onResize|onResizeEnd|onResizeStart|onResume|onReverse|onRowsEnter|onRowExit|onRowDelete|onRowInserted|onScroll|onSeek|onSelect|onSelectionChange|onSelectStart|onStart|onStop|onStorage|onSyncRestored|onSubmit|onTimeError|onTrackChange|onUndo|onUnload|onURLFlip|seekSegmentTime)/i;
//     return list;
// }

export const mergeGeolocIplocFunc = (cookieString = '') => {

    if (navigator && navigator.geolocation) {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state == 'granted') {
                            navigator.geolocation.getCurrentPosition(function (position) {
                            let geoLocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime();
                            setCookie('iploc', cookieString+geoLocParams, 0.12);
                        }, function (error) {
                            console.log("Error:",error);
                        }
                        );
                    }
                });
        }
    }
}
