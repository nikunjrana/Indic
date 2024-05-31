//import { loginModes } from '../constants/constants';
import { browserHistory } from 'react-router';
import { GET_EUROPEAN_COUNTRIES } from "../constants/constants";
import { VOICE_LANGUAGES } from "../constants/voiceLanguages";
import imApi from "../api/imApi";
import { trackAppVer } from "./MainFunctions";

const loginModes = { 0: 'UnIdentified', 1: 'Identified', 2: 'LoggedIn', "null": 'UnIdentified' };

var pageTitle = "IndiaMART - Indian Manufacturers Suppliers Exporters Directory - PWA";
var gVoice = '';
if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    gVoice = new webkitSpeechRecognition();
}
var isStart = false;
var isAbort = false;

if (typeof window !== "undefined") window.visitDesktop = function (source) {
    // if(localStorage.getItem('ImeshVisitor')) gblFunc.setCookie('ImeshVisitor',localStorage.getItem('ImeshVisitor'),730);
    // if(localStorage.getItem('v4iilex')) gblFunc.setCookie('v4iilex',localStorage.getItem('v4iilex'),182);
    if (source == "Desktop") gblFunc.gaTrack.trackEvent(["Footer-PWA", "DesktopLink-btn-click", "", 0, true]);
    if (source == "Mobile") gblFunc.gaTrack.trackEvent(["Footer-PWA", "ImHome-Icon-click", "", 0, true]);
};
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
let gblFunc = {
    pns_prefix(mob, type) {
        if (typeof mob == 'object') {
            mob = mob[0];
        }
        switch (type) {
            case 'MOBILE':
            case 'PNS':
                {
                    if (mob.length == 10)//requires +91
                    {
                        mob = '+91' + mob;
                    }
                    else {
                        if (mob.indexOf('+91') == -1) {
                            mob = '+' + mob;
                        }
                    }
                    break;
                }
            case 'PHONE':
                {
                    if (mob.indexOf('+91') == -1 && mob.indexOf('91') != 0) {
                        mob = '+91' + mob;
                    }
                    else if (mob.indexOf('91') == 0) {
                        mob = '+' + mob;
                    }
                    break;

                }
        }
        if (type == 'MOBILE' || type == 'PHONE') {
            let arr = [];
            arr[0] = mob;
            return arr;
        }
        else {
            return mob;
        }
    },
    getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            var j = hashes[i].indexOf('=');
            hash = [hashes[i].slice(0, j), hashes[i].slice(j + 1)];
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getCookie(name) {

        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    },
    hasHindiCharacters(str) {
        if (str.split("%").length > 8) { str = decodeURI(str); }
        return str.split("").filter(function (char) {
            var charCode = char.charCodeAt(); return charCode >= 2309 && charCode <= 2361;
        }).length > 0;
    },
    validate_input(input, l, t) {
        var maxLength = l,
            error = '',
            input = input,
            reg = /(<.*?>)/,
            digits = /^\d+$/g,
            regex = /^[^a-zA-Z0-9]+$/,
            digitAndSpecial = /^[^a-zA-Z]+$/,
            indexofDot = input.indexOf("."),
            dotParts = input.split("."),
            type = t;
        if ((type == "Price" || type == "MOQ") && input.length > maxLength) error = "Please check that " + type + " can not have more than " + maxLength + " numbers.";
        else if (reg.test(input)) error = "Please check that " + type + " can not hava any HTML tag.";

        if (type == 'Price' || type == 'MOQ') {
            if (input < 0) error = "Please Enter a valid " + type + ".";
            else if (input.search(/^(\d+)\.?\d{0,2}$/) == -1) {

                if (dotParts.length > 2)
                    error = "You may specify only a single decimal point in  " + type + ".";

                else if (isNaN(input) || input.indexOf("+") >= 0)
                    error = "Only numbers are allowed in " + type + ".";

                else if (input.length - indexofDot > 3)
                    error = "You may specify only 2 digits after decimal point in  " + type + ".";
            }
        } else if (type == 'Unit Type') {
            if ((digits.test(input))) error = 'Please check that Unit Type can not have only numbers';
            else if (input.match(regex) != null) error = 'Please check that Unit Type can not have only Special characters'
            else if ((digitAndSpecial.test(input))) error = 'Please check that Unit Type can not have only Numbers and Special characters'
        }

        return error;
    },
    validate_mobile(mobNo) {
        var error = '',
            mobrRegex = /^[0-9-+()./ ]*$/,
            filter = /^(?:(?:\+|0{0,2})(91|910)(\s*[\-]\s*)?|[0]?)?[16789]\d{9}$/;
        if (mobNo == '' || mobNo.length == 0) {
            error = "Please enter mobile number";
            return error;
        } else if (isNaN(mobNo)) {
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

    },
    removeEnqStyletags() {
        var p = document.getElementsByClassName("pdtb4 lh26 bdrm018 bgm018 clrw bxrdEnq w36 ml10 dib");
        for (var i = 0; i < p.length; i++) {
            p[i].style = "";
        }
    },
    removeEnqStyletagspdp() {
        var p = document.getElementsByClassName("fr pdb12 pdt12 w45 clrw mr10 fs14 fw ripple bxsdw compBl bxrd20");
        for (var i = 0; i < p.length; i++) {
            p[i].style = "";
        }
        var q = document.getElementsByClassName("pdt12 pdb12 fs15 mt10 bxrd4 por bgff c2e pl35 pr25");
        for (var i = 0; i < q.length; i++) {
            q[i].style = "";
        }
    },
    getHeight(element) {
        var e = element !== null ? element.cloneNode(true) : false;
        if (e) {
            e.style.visibility = "hidden";
            document.body.appendChild(e);
            var height = e.offsetHeight + 0;
            document.body.removeChild(e);
            e.style.visibility = "visible";
            return height;
        }
    },

    validate_email(email) {
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
    },

    showHide(id) {
        let el = document.getElementById(id);
        if (el)
            el.style.display = el.style.display == 'block' || el.className.indexOf('dn') < 0 ? 'none' : 'block';
    },

    setCookie(name, value, days, domain = '.indiamart.com') {
        if (days) {
            var date = new Date();
            if (name == 'sellertool') {
                date.setTime(date.getTime() + (days * 30 * 60 * 1000));
            }
            else {
                if(name=='ImeshVisitor'&&days!=(-1)){
                    days=180;
                }
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            }
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";

        let samesite = '';
        if( name =='ImeshVisitor' || name == 'v4iilex' || name == 'im_iss'){
            samesite = ';SameSite=Lax';
        }

        if (document.domain === 'localhost')
            document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/"+samesite;
        else
            document.cookie = name + "=" + encodeURIComponent(value) + expires + "; domain=" + domain + ";path=/"+samesite;
    },

    timeSince(date) {
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
    },
    toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1) });
    },

    checkremktg() {
        var remktgval = '';
        if (gblFunc.getCookie("remktg")) {
            remktgval = '|remktg';
        }
        return remktgval;
    },

    gaTrack: {//function to track page views as virtual and event also@ Jatin Chitkara


        trackPageView: function (pageName, title = pageTitle, CD_Miscellaneous) {
            if (typeof (CD_Miscellaneous) != 'undefined') {
                imgtm.push({
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + gblFunc.A2HSApp()
                });
            }
            if (window.location.pathname.indexOf("messages") > -1 && (imgtm.length === 1 || imgtm.length === 0) && (window.location.pathname.indexOf("isearch") === -1) && (window.location.pathname.indexOf("bl") === -1) && (window.location.pathname != '/')) {
                imgtm.push({
                    "CD_User-Mode": loginModes[gblFunc.checkUserStatus()] === 1 ? "identified" : "unidentified",
                    "PV_Tracking": "/vpv" + pageName,
                    "CD_Miscellaneous": trackAppVer('') + gblFunc.A2HSApp(),
                });
                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
            }
            else if (window.location.pathname.indexOf("seller") > -1 && imgtm.length === 0 && (window.location.pathname.indexOf("isearch") === -1) && (window.location.pathname.indexOf("bl") === -1) && (window.location.pathname != '/')) {
                imgtm.push({
                    "CD_User-Mode": loginModes[gblFunc.checkUserStatus()] === 1 ? "identified" : "unidentified",
                    "PV_Tracking": "/vpv" + pageName,
                    "CD_Miscellaneous": window.location.pathname.indexOf("seller") > -1 ? trackAppVer('') + gblFunc.A2HSApp() + gblFunc.checkremktg() : trackAppVer('') + gblFunc.A2HSApp(),
                });
                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
            }
            else if (pageName.indexOf('/pwa/home/') > -1) {
                if (track_page_view != 1) {
                    imgtm.push({
                        "event": "VirtualPageview",
                        "virtualPageURL": "/vpv" + pageName,
                        "virtualPageTitle": title,
                        "CD_Miscellaneous": trackAppVer('') + gblFunc.A2HSApp(),
                    });
                }
                track_page_view = 2
            }
            else {
                imgtm.push({ 'CD_User-Mode': loginModes[gblFunc.checkUserStatus()] });
                imgtm.push({
                    "event": "VirtualPageview",
                    "virtualPageURL": "/vpv" + pageName,
                    "virtualPageTitle": title,
                    "CD_Miscellaneous": trackAppVer('') + gblFunc.A2HSApp() + gblFunc.fireIMLitePVTracking(),
                });
            }
            imgtm.push({
                "CD_Cust-Type-Weight": gblFunc.getCookieVal("cmid") ? gblFunc.getCookieVal("cmid") : ''
            });

        },

        trackSearchPageViewWithCustomDimension: function (pageNameInital, pagenameSuffix, title = pageTitle, group_id, cat_id, top_mcat, CD_Miscellaneous, CD_List_Count) {
            if (imgtm.length <= 1) {
                imgtm.push({
                    "CD_User-Mode": loginModes[gblFunc.checkUserStatus()] === 1 ? "identified" : "unidentified",
                    "PV_Tracking": pageNameInital + pagenameSuffix
                });
                imgtm.push({
                    "CD_Group": group_id,
                    "CD_Subcat": cat_id,
                    "CD_MCAT": top_mcat,
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + gblFunc.A2HSApp(),
                    "CD_List-Count": CD_List_Count,
                    "CD_Source": "IMOB"
                });

            } else {
                imgtm.push({
                    "event": "VirtualPageview",
                    "virtualPageURL": pageNameInital + pagenameSuffix,
                    "virtualPageTitle": title,
                    "CD_Group": group_id,
                    "CD_Subcat": cat_id,
                    "CD_MCAT": top_mcat,
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + gblFunc.A2HSApp(),
                    "CD_List-Count": CD_List_Count,
                    "CD_Source": "IMOB"
                });
            }
            imgtm.push({
                "CD_Cust-Type-Weight": gblFunc.getCookieVal("ImeshVisitor", "cmid") ? gblFunc.getCookieVal("ImeshVisitor", "cmid") : ''
            });

            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        },

        trackEvent: function (evArr) {
            window.location.pathname.indexOf("/seller/") > -1 && gblFunc.checkremktg().length > 0 ? imgtm.push({ "CD_Additional_Data": gblFunc.checkremktg() + gblFunc.A2HSApp() }) : '';
            imgtm.push({
                'event': (evArr[4] ? 'IMEvent' : 'IMEvent-NI'),
                'eventCategory': evArr[0],
                'eventAction': evArr[1],
                'eventLabel': evArr[2],
                'eventValue': evArr[3],


            });
        },
        trackMiniPDP: function (displayData, langSelection) {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv/pwa/" + gblFunc.pdp_url(displayData.title, displayData.displayid),
                "CD_MCAT": displayData.mcatid[0],
                "CD_Subcat": displayData.catid[0],
                "CD_Miscellaneous": "single" + '|' + langSelection + gblFunc.A2HSApp(),
            });

        }
    },


    eventTracking(a, b, c, d) {
        imgtm.push({
            'event': (d ? 'IMEvent' : 'IMEvent-NI'),
            'eventCategory': a,
            'eventAction': b,
            'eventLabel': c,
            'eventValue': 0
        })

    },
    eventTrackCD(a, b, c, d, ad = '') {
        imgtm.push({
            'event': (d ? 'IMEvent' : 'IMEvent-NI'),
            'eventCategory': a,
            'eventAction': b,
            'eventLabel': c,
            'eventValue': 0,
            'CD_Additional_Data': ad + gblFunc.A2HSApp()
        })

    },

    sendUserTiming(timingvariable, timingLabel, timingValue) {
        imgtm.push(
            {
                'event': 'IMUserTiming',
                'timingCategory': 'PWA',
                'timingVar': timingvariable,
                'timingLabel': timingLabel + '_' + gblFunc.getCookie('_ga'),
                'timingValue': timingValue
            }
        )


    },
    generateGAforPLT(category, variable, label, value) {
        imgtm.push(
            {
                'event': 'IMUserTiming',
                'timingCategory': category,
                'timingVar': variable,
                'timingLabel': label,
                'timingValue': value
            }
        )

    },
    unitSuggester(e) {
        var search,
            value = e.target.value,
            i,
            sugUnits = [];
        try {
            search = new RegExp('^' + value, 'i');
            if (value) {
                for (i = 0; i < UNIT_ARRAY.length; i++) {
                    if (search.test(UNIT_ARRAY[i])) {
                        sugUnits.push(UNIT_ARRAY[i]);
                    }
                }
            }
        } catch (e) {
            return false;
        }
        return sugUnits;
    },
    clickToCall(mobile, gluserId, PNS, MODID, pagetype, queryID = '', queryType = '') {
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
        xmlhttp.send("m=" + mobile + "&amp;Id=" + gluserId + "&amp;PNS=" + PNS + "&amp;MODID=" + MODID + "&amp;pageType=" + pagetype + "&amp;queryID=" + queryID + "&amp;queryType=" + queryType);
    },
    goToRoute: function (pathTo, gaArr) {
        browserHistory.push(pathTo);
    },
    strip_html_tags(str) {
        if ((str === null) || (str === ''))
            return false;
        else {
            str = str.toString().replace(/&nbsp;/g, ' ').replace(/<(?!br\s*\/?)[^>]+>/g, '');
            return str;
        }
    },
    setDesktopLink() {
        var dLink = document.getElementById('dskLink');
        var pathname = location.pathname;
        var desktopLink = ''
        if (pathname.indexOf('enq') > -1 && /enq/.test(pathname)) {
            desktopLink = 'https://seller.indiamart.com/enquiry/inbox/';
        }
        else if (pathname.indexOf('products') > -1 && /products/.test(pathname)) {
            desktopLink = 'https://seller.indiamart.com/product/manageproduct/';
        }
        else if (pathname.indexOf('bl') > -1 && /bl/.test(pathname)) {
            if (arguments[0] == "Home") desktopLink = 'https://trade.indiamart.com/';
            else if (arguments[0] == "Group") desktopLink = 'https://trade.indiamart.com/offer/' + arguments[1];
            else if (arguments[0] == "Subcat") desktopLink = 'https://trade.indiamart.com/offer/' + arguments[1] + arguments[2] + '/';
            else if (arguments[0] == "Detail") desktopLink = 'https://trade.indiamart.com/details.mp?offer=' + arguments[1];
            else if (arguments[0] == "Search") desktopLink = 'https://trade.indiamart.com/buyersearch.mp?ss=' + arguments[1];
            else if (arguments[0] == "Tender") desktopLink = 'https://seller.indiamart.com/tenders/tender/';
            else if (arguments[0] == 'Wishlist') desktopLink = 'https://seller.indiamart.com/bltxn/myWishList/';
            else if (arguments[0] == 'Locpref') desktopLink = 'https://seller.indiamart.com/blproduct/locationPref/';
        }
        if (dLink) dLink.setAttribute('href', desktopLink);
    },

    checkUserStatus() {
        let status = 0;
        if (document.cookie) {
            var c = document.cookie;
            if (c.length > 0 && -1 != c.indexOf('ImeshVisitor') && -1 != c.indexOf('im_iss') && this.getCookie('ImeshVisitor') !== '' && this.getCookie('im_iss') !== '') status = 2;
            else if (c.length > 0 && -1 != c.indexOf('ImeshVisitor') && this.getCookie('ImeshVisitor') !== '') status = 1;
        }
        return status;
    },
    checkAppleDevice() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        return iOS;
    },
    a2hsButtonDisplay() {
        let userState = gblFunc.checkUserStatus();
        var is_chrome = ((window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (window.navigator.vendor.toLowerCase().indexOf("google") > -1));
        if (is_chrome && !gblFunc.checkAppleDevice()) {
            if (document.getElementById("a2hsbt") && userState == 0) {
                document.getElementById("a2hsbt").style.display == "block" ? window.matchMedia('(display-mode: standalone)').matches ? (document.getElementById("a2hsbt").style.display = "none") : (document.getElementById("a2hsbt").style.display = "block") : (document.getElementById("a2hsbt").style.display = "block");
            }
        } else {
            (document.getElementById("a2hsbt") && (document.getElementById("a2hsbt").style.display = "none"));
        }
    },
    ucBrowserCheck() {
        if ((navigator.userAgent.indexOf(' UCBrowser/') >= 0) || (navigator.userAgent.indexOf('Opera Mini') >= 0)) {
            return true;
        }
        return false;
    },
    objIsEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    },
    getCookieVal(key, name = 'ImeshVisitor') {
        let c = document.cookie; let imeshArr = ''; let imesh_obj = {};
        let cookieArr = ''; let cookie_obj = {};
        if (name != 'ImeshVisitor') {
            if (c.length > 0 && -1 != c.indexOf(name)) {
                let sArr = c.split(';');
                for (var k = 0; k < sArr.length; k++) {
                    var temp = sArr[k];
                    if (temp.replace(/^\s+|\s+$/g, "").split("=")[0] == name) {
                        temp = decodeURIComponent(temp);
                        cookieArr = temp.trim().substring(name.length + 1);
                        break;
                    }
                }
                cookieArr.split('|').map((val) => {
                    let imeshKey = val.split("=");
                    if (typeof imeshKey != "undefined") cookie_obj[imeshKey[0]] = imeshKey[1] || "";
                });
                if (key) {
                    return cookie_obj[key];
                }
                else {
                    return cookie_obj
                }

            }
        } else {
            if (c.length > 0 && -1 != c.indexOf('ImeshVisitor')) {
                let sArr = c.split(';');
                for (var k = 0; k < sArr.length; k++) {
                    var temp = sArr[k];
                    if (temp.replace(/^\s+|\s+$/g, "").split("=")[0] == 'ImeshVisitor') {
                        temp = decodeURIComponent(temp);
                        imeshArr = temp.trim().substring(13);
                        break;
                    }
                }
                imeshArr.split('|').map((imeshObj) => {
                    let imeshKey = imeshObj.split("=");
                    if (typeof imeshKey != "undefined") imesh_obj[imeshKey[0]] = imeshKey[1] || "";
                });
            }
            if (key) {
                return imesh_obj[key];
            }
            else {
                return imesh_obj
            }

        }
    },
    getPadding(n) {
        return ((n < 10) ? ('0' + n) : n.toString());
    },
    getPrice(fobprice, currency, quantity) {
        fobprice = fobprice.toFixed(2);
        if (fobprice > 100000) {
            fobprice = fobprice / 100000;
            fobprice = fobprice.toFixed(2);
            fobprice = fobprice.toString() + "Lakh";
        }
        else {
            let newprice = fobprice.toString().split('.');
            let num = 0;
            let dec = 0;
            let dec_val = 0;
            if (newprice[0])
                num = parseInt(newprice[0]);
            if (newprice[1]) {
                dec = parseInt(newprice[1]);
                if (dec > 0) {
                    dec_val = dec.toString().substring(0, 2);
                }
            }
            if (dec_val > 0) {
                fobprice = num + "." + parseInt(dec_val);
            } else {
                fobprice = num;
            }
            // if(num > 1000 && num%1000==0)
            //     fobprice = Math.floor((num/1000)).toString() +','+'000';
            // else if (num > 1000)
            //     fobprice = Math.floor((num/1000)).toString() +','+(num%1000).toString();
            // else
            //     fobprice = num.toString();
            // if(dec != 0)
            //     fobprice = fobprice+'.'+dec.toString();
            if (Math.floor(fobprice / 1000) != 0) {
                fobprice = new Intl.NumberFormat('en-IN').format(fobprice);
                fobprice = fobprice.trim();
            }
        }
        return currency + ' ' + fobprice + (quantity ? ' / ' + quantity : '');
    },

    getPriceWithoutCurrency(fobprice) {
        fobprice = fobprice.toFixed(2);
        if (fobprice > 100000) {
            fobprice = fobprice / 100000;
            fobprice = fobprice.toFixed(2);
            fobprice = fobprice.toString() + " Lakh";
        }
        else {
            let newprice = fobprice.toString().split('.');
            let num = 0;
            let dec = 0;
            if (newprice[0])
                num = parseInt(newprice[0]);
            if (newprice[1]) {
                dec = parseInt(newprice[1]);
            }
            if (num > 1000 && num % 1000 == 0)
                fobprice = Math.floor((num / 1000)).toString() + ',' + '000';
            else if (num > 1000)
                fobprice = Math.floor((num / 1000)).toString() + ',' + (num % 1000).toString().padStart(3, "0");
            else
                fobprice = num.toString();
            if (dec != 0)
                fobprice = fobprice + '.' + dec.toString();

        }
        return fobprice;


    },
    detectLocation(geoLocState) {

        if (navigator && navigator.geolocation) {

            if (navigator.permissions) {
                navigator.permissions.query({ name: 'geolocation' }).then(function (result) {

                    if (result.state == 'granted') {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            console.log('Geolocation permissions granted');
                            console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                            gblFunc.eventTracking('GEOLOCATION', 'Geolocation Allow', 'search', true)

                            let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                            // gblFunc.setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3)
                            let iplocCookie = gblFunc.getCookie("iploc") ? decodeURIComponent(gblFunc.getCookie("iploc")) : "";
                            if (iplocCookie.includes("|GeoLoc_"))
                                iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                            gblFunc.setCookie('iploc', iplocCookie + geolocParams, 0.125);

                            geoLocState(result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                        }, function (error) {
                            console.log('Geolocation Error-' + error.message)
                            gblFunc.eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                            gblFunc.eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                            gblFunc.setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
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
                                    // gblFunc.setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3)
                                    let iplocCookie = gblFunc.getCookie("iploc") ? decodeURIComponent(gblFunc.getCookie("iploc")) : "";
                                    if(iplocCookie.includes("|GeoLoc_"))
                                    iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                                    gblFunc.setCookie('iploc', iplocCookie + geolocParams, 0.125);

                                    geoLocState("prompt-" + result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                                }, function (error) {
                                    console.log('Geolocation Error-' + error.message)
                                    gblFunc.eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                                    gblFunc.eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                                    gblFunc.setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
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
                    gblFunc.eventTracking('GEOLOCATION', 'Geolocation Allow', 'search', true)
                    
                    let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                    // gblFunc.setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 1)                   
                    let iplocCookie = gblFunc.getCookie("iploc") ? decodeURIComponent(gblFunc.getCookie("iploc")) : "";
                    if(iplocCookie.includes("|GeoLoc_"))
                    iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                    gblFunc.setCookie('iploc', iplocCookie + geolocParams, 0.125);

                    geoLocState("granted", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                }, function (error) {
                    console.log('Geolocation Error-' + error.message)
                    gblFunc.eventTracking('GEOLOCATION', 'Geolocation Block', 'search', true)
                    gblFunc.eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                    gblFunc.setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                    geoLocState("denied");
                }
                );
            }

        }
    },
    getv4iilexCookie(type) {
        let c = document.cookie; let imeshArr = ''; let imesh_obj = {};
        let cookie_arr = [];
        let v4iilexobj = {};
        let name = 'v4iilex';
        let data = this.getCookie('v4iilex');
        if (data != 'undefined' || data != '') {
            data = decodeURIComponent(data);
            data.split('|').map((val) => {
                let imeshKey = val.split("=");
                let iilexArr = {};
                if (imeshKey[0] && imeshKey[1]) {
                    iilexArr[imeshKey[0]] = imeshKey[1];
                    cookie_arr.push(iilexArr);
                }
            });
        }
        if (type == 'array') {
            return cookie_arr;
        }
        else {
            cookie_arr.map((val, key) => {
                let data = Object.keys(val);
                v4iilexobj[data] = val[data[0]];
            });
            return v4iilexobj;
        }
    },
    user_login(param) {
        let data = '';
        data = this.getCookie('v4iilex');
        let tempReturn = {};
        let returnValue = {};
        let dispName = '';
        if (data != null && data != '' && data != 'undefined') {
            if (data.length > 10) {
                let loginValArray = ['mail', 'name', 'id', 'admln', 'mob', 'vcd'];
                let getv4iilexData = this.getv4iilexCookie('array');
                getv4iilexData.map((val, key) => {
                    let data = Object.keys(val);
                    if (loginValArray.includes(data[0])) {
                        tempReturn[data] = val[data[0]];
                    }
                });
                if (tempReturn['id'] != "") {
                    returnValue['email'] = tempReturn['mail'];
                    returnValue['name'] = tempReturn['name'];
                    returnValue['glid'] = tempReturn['id'];
                    returnValue['admln'] = tempReturn['admln'];
                    returnValue['vcd'] = tempReturn['vcd'];
                    if (tempReturn['name']) {
                        let dispNameFld = tempReturn['name'].trim().split(" ");
                        if (dispNameFld[0] != "")
                            dispName = dispNameFld[0];
                        returnValue['displayname'] = dispName;
                    }
                    returnValue['status'] = 'Success';
                }

                else
                    returnValue['status'] = 'Success';
            }
        } else
            returnValue['status'] = 'Error';
        if (param != '') {
            return returnValue[param];
        } else {
            return returnValue;
        }
    },
    expire_cookie() {
        if (gblFunc.getCookie('ImeshVisitor'))
            gblFunc.setCookie('ImeshVisitor', '', -1);
        if (gblFunc.getCookie('v4iilex'))
            gblFunc.setCookie('v4iilex', '', -1);


    },
    deleteCookie() {
        this.getCookieVal('cd');
        this.user_login('vcd');
        let cciso = '';

        if (this.getCookie('iploc')) {
            cciso = decodeURIComponent(this.getCookie("iploc")).split('|')[0].split("=")[1];
        }
        else {
            cciso = 'IN';
        }

        for (let i = 0; i < GET_EUROPEAN_COUNTRIES.length; i++) {
            if (GET_EUROPEAN_COUNTRIES[i] === cciso) {
                let thresholdVal = new Date('2018', '04', '24').getTime();
                let imeshVal = this.getCookieVal('cd') ? new Date(new Date(this.getCookieVal('cd')).toString()).getTime() : '';
                let v4iilexVal = this.user_login('vcd') ? new Date(new Date(this.user_login('vcd')).toString()).getTime() : '';
                if (imeshVal <= thresholdVal) {
                    this.expire_cookie();
                }


            }

        }
    },
    voicesearch(lang) {
        //In order to close the lang popup divs
        document.getElementById('selectLang').style.display = 'none';
        if ("webkitSpeechRecognition" in window) {

            if (isStart) { gVoice.abort(); isAbort = true; }
            document.body.style.overflow = "";
            //This sets language on voice search popup
            gblFunc.getLang(lang, true)
            document.getElementById("retry_new")? document.getElementById("retry_new").style.display = "none":'';
            var waves = document.getElementById("waves");
            gVoice.continuous = false;
            gVoice.interimResults = true;
            gVoice.lang = lang;
            gVoice.maxAlternatives = 1;
            if (!isStart) { try { gVoice.start(); } catch (e) { } }
            var e = "";
            var i = false;
            var pageLabel = "";
            if (window.location.href.indexOf('messages') > 0) {
                pageLabel = "_Messages";
            }
            else {
                pageLabel = "";
            }
            gVoice.onresult = function (b) {
                e = b.results[0][0].transcript;
                if (document.getElementById("catch_text"))
                    document.getElementById("catch_text").innerHTML = e;
                isStart = false;
            };
            gVoice.onstart = function (b) {
                if (!isAbort) {
                    isStart = true;
                    gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Microphone_allowed' + pageLabel, '', 0, true]);
                    waves.classList.add('waveAni');
                    document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "none":'';
                    document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "block":'';
                    if (document.getElementById("vSrhMain").style.display != 'block')
                        gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Voice_Input_Page' + pageLabel, 'Open', 0, true]);
                    $("#vCls").click(function () {
                        $("#vSrhMain").css("display", "none");
                        gVoice.stop();
                        isStart = false;
                        gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Voice_Input_Page' + pageLabel, 'Closed', 0, true]);
                    });
                    $("#vSrhMain").css("display", "block");
                }
                ;
                gVoice.onend = function (b) {
                    if (isAbort) {
                        isAbort = false; gVoice.start();
                    }
                    else {
                        if (e && document.getElementById("vSrhMain").style.display == "block") {
                            gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Voice-input' + pageLabel, e, 0, true]);
                            $("#vSrhMain").css("display", "none");

                            if (window.location.href.indexOf('messages') > 0) {
                                document.getElementById('replybox').value = e;
                                if (document.getElementById('callIcon') && document.getElementById('sbmtbtn')) {
                                    document.getElementById('sbmtbtn').classList.remove("dn");
                                    document.getElementById('callIcon').classList.add("dn");
                                }
                                gblFunc.gaTrack.trackEvent(['Messages', 'Voice_Input', document.getElementById('replybox').value, 0, true])
                                return;
                            }
                            if (document.getElementById('autosug_div') && document.getElementById('autosug_div').style.display === 'block') { document.getElementById('autosug_div').style.display = 'none'; };
                            var c = "/isearch.php?s=" + e + "&src=vs";
                            gblFunc.goToRoute(c);
                        } else {
                            document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "block":'';
                            document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "none":'';
                        }
                        gVoice.stop(); isStart = false;
                        waves.classList.remove('waveAni');
                        if (e) {
                            gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Voice-input' + pageLabel, e, 0, true]);
                            var c = "/isearch.php?s=" + e + "&src=vs";
                            $("#vSrhMain").css("display", "none");

                            if (window.location.href.indexOf('messages') > 0) {
                                document.getElementById('replybox').value = e;
                                gblFunc.gaTrack.trackEvent(['Messages', 'Voice_Input', document.getElementById('replybox').value, 0, true])
                                return;
                            }
                            if (document.getElementById('autosug_div') && document.getElementById('autosug_div').style.display === 'block') { document.getElementById('autosug_div').style.display = 'none'; };
                            gblFunc.goToRoute(c);
                        } else {
                            if (!i) {
                                gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Listening-timeout' + pageLabel, '', 0, true]);
                            }
                            document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "block":'';
                            document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "none":'';
                        }
                    }
                }
                    ;
                gVoice.onerror = function (b) {
                    i = true;
                    if (b.error == "not-allowed") {
                        gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Microphone_blocked' + pageLabel, '', 0, true]);
                        document.getElementById('offline_span').innerHTML = 'Please allow access to microphone from settings';
                        document.getElementById('offline_pop').style.display = 'block';
                        setTimeout(function () {
                            document.getElementById('offline_pop').style.display = 'none';
                            document.getElementById('offline_span').innerHTML = 'You seem to be \'Offline\'';
                        }, 4000);
                    }
                    if (b.error == "no-speech") {
                        gblFunc.gaTrack.trackEvent(['Voice-Search-PWA', 'Listening-timeout' + pageLabel, '', 0, true]);
                    }
                    if (!isAbort) {
                        isStart = false;
                        gVoice.stop();
                        waves.classList.add('waveAni');
                        document.getElementById("retry_new")?document.getElementById("retry_new").style.display = "block":'';
                        document.getElementById("catch_text")?document.getElementById("catch_text").style.display = "none":'';

                    }
                }
            }
        }
    },
    setlang() {
        var langpref_1 = VOICE_LANGUAGES;
        if (!localStorage.getItem('langpref_1'))
            localStorage.setItem('langpref_1', JSON.stringify(langpref_1));
    },
    getLang(lang, default_call) {
        if (!localStorage.getItem('langpref_1'))
            gblFunc.setlang();
        var language = JSON.parse(localStorage.getItem('langpref_1'));
        for (var i = 0; i < language.length; i++) {
            if (language[i][1] == lang) {
                break;
            }
        }
        if (typeof default_call != "undefined" && default_call != false) {
            localStorage.setItem('lang', JSON.stringify(language[i]));
            document.getElementById('lang_text').innerHTML = language[i][3];
            document.getElementById('retry_text_val').innerHTML = language[i][4];
            document.getElementById('catch_text').innerHTML = language[i][5];
        } else {
            return [language[i], i];
        }
    },
    customComparator(a, b) {
        if (a[0] > b[0])
            return 1;
        else if (a[0] < b[0])
            return -1;
        return 0;
    },
    modifylang(lang, val = false) {
        if (!localStorage.getItem('langpref_1'))
            gblFunc.setlang();
        var language = JSON.parse(localStorage.getItem('langpref_1'))
        var get_selected_lang = gblFunc.getLang(lang);
        var preference = get_selected_lang[0];
        var i = get_selected_lang[1];
        document.getElementById('lang_text').innerHTML = preference[3];
        document.getElementById('retry_text_val').innerHTML = preference[4];
        document.getElementById('catch_text').innerHTML = preference[5];
        language.splice(i, 1);
        // var new_lang = language.sort(gblFunc.customComparator)
        let new_lang = language;
        new_lang.unshift(preference);
        localStorage.setItem('langpref_1', JSON.stringify(new_lang));
        //To Manipulate State in Lang chooser, we need to return new_lang
        if (val)
            return new_lang

    },
    lang_input_for_voice() {
        var Iploc = getImCookie({
            name: "iploc",
            flag: 1
        });
        var p = document;
        var pageLabel = "";
        if (window.location.href.indexOf('messages') > 0) {
            pageLabel = "_Messages";
        }
        else {
            pageLabel = "";
        }
        if (localStorage.getItem('lang')) {
            var voice_lang = JSON.parse(localStorage.getItem('lang'));
            gblFunc.voicesearch(voice_lang[1]);
        } else if (Iploc && Iploc.gcnnm == "India") {
            document.body.style.overflow = "hidden";
            gblFunc.eventTracking('Voice-Search-PWA', 'Select_Language_Page' + pageLabel, 'Open', false)
            p.getElementById('selectLang').style.display = "block";
            p.getElementById('close_langPopup').onclick = function () {
                document.body.style.overflow = "";
                p.getElementById('selectLang').style.display = 'none';
                gblFunc.eventTracking('Voice-Search-PWA', 'Select_Language_Page' + pageLabel, 'Closed', false)
            }
        } else {
            gblFunc.voicesearch("en-IN");
        }
    }
    ,
    finalPLTCalculation(searchServiceResponseTime, pageLoadTime) {
        var u, s = {};

        if (imgtm !== null) {
            for (var r = 0; r < imgtm.length; r++) {
                if (imgtm[r].PV_Tracking !== undefined) {
                    u = imgtm[r].PV_Tracking
                }
            }
        }
        var m = new Date();
        var v = m.getDate();
        var j = m.getMonth() + 1;
        var w = m.getFullYear();
        var c = m.getHours();
        var f = m.getMinutes();
        var e = m.getSeconds();
        if (v < 10) {
            v = "0" + v
        }
        if (c < 10) {
            c = "0" + c
        }
        if (f < 10) {
            f = "0" + f
        }
        if (e < 10) {
            e = "0" + e
        }
        if (j < 10) {
            j = "0" + j
        }
        s.latency = '';
        s.DOMLoadTime = '';
        s.actualLoadTime = pageLoadTime;
        s.loadTime = '';
        s.FP = '';
        s.FCP = '';
        s.url = 'vpv/pwa' + window.location.pathname + window.location.search;
        s.timestamp = new Number(w + "" + j + "" + v + "" + c + "" + f + "" + e).valueOf();
        s.ServiceResponseTime = searchServiceResponseTime;
        s.userAgent = window.navigator.userAgent ? window.navigator.userAgent : 'Navigator not working';
        s.gaCookie = gblFunc.getCookie('_ga');
        var b;
        window.setTimeout(function () {
            b = s;
            $.ajax({
                type: "POST",
                url: "/phpajax/finalPLT/",
                data: JSON.stringify(b),
                datatype: "json",
                contentType: "application/json;charset=utf-8",
            })
        }, 1)
    },
    getUserType() {
        let usertype = gblFunc.checkUserStatus() ? (gblFunc.getCookieVal('utyp') == 'P' ? 'Paid seller' : gblFunc.getCookieVal('utyp') == 'F' ? 'Free seller' : 'Buyer') : 'No imesh';
        return usertype;
    },
    resetCookies(access) {
        if (access == 4) {
            gblFunc.setCookie('v4iilex', '', -1);
            gblFunc.setCookie('im_iss', '', -1);
            window.location.reload();
        }
        else {
            gblFunc.setCookie('ImeshVisitor', '', -1);
            gblFunc.setCookie('v4iilex', '', -1);
            gblFunc.setCookie('im_iss', '', -1);
            gblFunc.setCookie('userDet', '', -1);
            window.location.href = "https://m.indiamart.com?src=reauth_pwa";
        }
    },
    syncDataCheck() {
        return new Promise(function (resolve, reject) {
            var c = JSON.parse(localStorage.getItem("prodsViewed")), u = 0;
            var t = JSON.parse(localStorage.getItem("recentMcats")), g = 0;
            if (c) {
                for (var r = 0; r < c.length; r++) {
                    if ((c[r].img_125 != undefined) || (c[r].d_flag == undefined)) { u++ }
                }
            }
            if (t) {
                for (var r = 0; r < t.length; r++) {
                    if (t[r].img_125 != undefined) { g++ }
                }
            }
            if (u != 0) {
                localStorage.removeItem("prodsViewed"); localStorage.removeItem("meta_data")
            }
            if (g != 0) {
                localStorage.removeItem("recentMcats"); localStorage.removeItem("meta_data")
            }
            if (typeof (localStorage) != "undefined" && localStorage != "") {
                var w = "";
                w = JSON.parse(localStorage.getItem("meta_data"));
                if (w != null && w != "" && typeof w != "undefined") {
                    var b = w[0].m_time; var v = w[0].p_gid || "na"; var B = w[0].p_vid || "";
                    if (v == "na") {
                        var w = [{
                            m_time: b,
                            p_gid: v,
                            p_vid: B
                        }];
                        localStorage.setItem("meta_data", JSON.stringify(w))
                    }
                    var h = "na"; var s = ""; var e = new Date().getTime();
                    if (document.cookie.indexOf("ImeshVisitor") > -1 && document.cookie.indexOf("glid%3D") > -1) {
                        h = gblFunc.getCookieVal('glid');
                    }
                    if (v != "na" && h != "na" && v != h) {
                        localStorage.removeItem("prodsViewed")
                    }
                    s = gblFunc.getCookie('_ga');
                    if (((e - b) > 600000) || (v != h)) {
                        v = h; B = s;
                        var w = [{
                            m_time: new Date().getTime(),
                            p_gid: v,
                            p_vid: B
                        }];
                        localStorage.setItem("meta_data", JSON.stringify(w));
                        if ((v != "na" && typeof (v) != "undefined") || (B != "" && v == "na" && typeof (B) != "undefined")) {
                            var new_var2 = gblFunc.updateDataTime(v, B);
                            (new_var2).then(function (result) {
                                resolve(result);
                                return result;
                            });
                        }
                    }
                } else {
                    var v = "na"; var B = "";
                    if (document.cookie.indexOf(" ImeshVisitor") > -1 && document.cookie.indexOf("glid%3D") > -1) {
                        v = gblFunc.getCookieVal('glid');
                    }
                    B = gblFunc.getCookie('_ga');
                    var w = [{
                        m_time: new Date().getTime(),
                        p_gid: v,
                        p_vid: B
                    }];
                    localStorage.setItem("meta_data", JSON.stringify(w));
                    if ((v != "na" && typeof (v) != "undefined") || (B != "" && v == "na" && typeof (B) != "undefined")) {
                        var new_var2 = gblFunc.updateDataTime(v, B);
                        (new_var2).then(function (result) {
                            resolve(result);
                            return result;
                        });
                    }
                }
            }
        });
    },
    updateDataTime(k, c) {
        return new Promise(function (resolve, reject) {
            var e = ""; var b;
            if (k != "na" && typeof (k) != "undefined") {
                e = "http://recommend.imutils.com/UserAttributes/GetAttributes/?uid=" + k + "&modid=IMOB&type=1"
                var gid_glid = k;
                var type = "1";
            } else {
                if (c != "" && k == "na" && typeof (c) != "undefined") {
                    e = "http://recommend.imutils.com/UserAttributes/GetAttributes/?uid=" + c + "&modid=IMOB&type=2"
                    var gid_glid = c;
                    var type = "2";
                }
            }
            var new_var = new Promise(function (resolve, reject) {
                imApi.getrecentData(gid_glid, type).then(function (response) {
                    var Q = response; var j = Q.code;
                    if (j == 200) {
                        var o = JSON.parse(localStorage.getItem("recentMcats"));
                        var y = JSON.parse(localStorage.getItem("prodsViewed"));
                        var s = JSON.parse(localStorage.getItem("recentSearches"));
                        b = Q.categories; var N = Q.product; var S = Q.searches;
                        var x = [{
                            m_time: new Date().getTime(),
                            p_gid: k,
                            p_vid: c
                        }];
                        if ((o == null || typeof o == "undefined") && (typeof b != "undefined" && b != "")) {
                            if (b.length > 25) {
                                b = b.splice(0, 25)
                            }
                            var h = [];
                            for (var u = 0; u < b.length; u++) {
                                var t = {
                                    DT: b[u].DT,
                                    city: b[u].city,
                                    fl_name: b[u].fl_name,
                                    image: b[u].img_125,
                                    mcatid: b[u].id.toString(),
                                    name: b[u].name
                                };
                                h.push(t)
                            }
                            h[0]["type_update"] = "s";
                            localStorage.setItem("meta_data", JSON.stringify(x));
                            localStorage.setItem("recentMcats", JSON.stringify(h))
                        } else {
                            if ((typeof b == "undefined" || b == "") && (o != null && typeof o != "undefined")) { } else {
                                if ((o != null && typeof o != "undefined") && (b != "" && typeof b != "undefined")) {
                                    var w;
                                    var h = [];
                                    var all_mcat_l;
                                    for (var u = 0; u < b.length; u++) {
                                        var t = {
                                            DT: b[u].DT,
                                            city: b[u].city,
                                            fl_name: b[u].fl_name,
                                            image: b[u].img_125,
                                            mcatid: b[u].id.toString(),
                                            name: b[u].name
                                        };
                                        h.push(t)
                                    }
                                    w = o.concat(h);
                                    w.sort(function (B, z) {
                                        var A = B.DT, C = z.DT;
                                        if (A > C) {
                                            return -1
                                        }
                                        if (A < C) {
                                            return 1
                                        }
                                        return 0
                                    });
                                    w = w.reduce(function (B, A) {
                                        var z = B.filter(function (C) {
                                            return A.mcatid == C.mcatid
                                        });
                                        if (z.length == 0) {
                                            B.push(A)
                                        }
                                        return B
                                    }, []);
                                    all_mcat_l = w.length;
                                    if (all_mcat_l > 25) {
                                        w = w.splice(0, 25)
                                    }
                                    w[0]["type_update"] = "s";
                                    localStorage.setItem("meta_data", JSON.stringify(x));
                                    localStorage.setItem("recentMcats", JSON.stringify(w))
                                }
                            }
                        }
                        if ((y == null || typeof y == "undefined") && (N != "" && typeof N != "undefined")) {
                            if (N.length > 25) {
                                N = N.splice(0, 25)
                            }
                            var p = [];
                            for (var u = 0; u < N.length; u++) {
                                var r = "", q = "";
                                if (location.href.indexOf("dev-m.indiamart.com") > -1) {
                                    r = "https://dev-m.indiamart.com/"
                                } else {
                                    if (location.href.indexOf("stg-m.indiamart.com") > -1) {
                                        r = "https://stg-m.indiamart.com/"
                                    } else {
                                        r = "https://m.indiamart.com/"
                                    }
                                }
                                if (N[u].d_flag == 1 && N[u].fl_name && N[u].id && N[u].fl_name.indexOf(N[u].id) !== -1) {
                                    q = r + "proddetail/" + N[u].fl_name + ".html"
                                } else {
                                    q = r + "isearch.php?s=" + N[u].name
                                }
                                var v = N[u].c_url;
                                if (v != "" && v.match(/www.indiamart.com/i) == null) {
                                    v = "/company/" + N[u].s_id + "/"
                                } else {
                                    if (v != "" && v.match(/www.indiamart.com/i) != null) {
                                        v = v.split("www.indiamart.com")[1]
                                    }
                                }
                                var g = (N[u].contact_type == "PNS") ? ("91" + N[u].c_number) : N[u].c_number;
                                var t = {
                                    DT: N[u].DT,
                                    R_glusr_id: N[u].s_id,
                                    city_name:N[u].city,
                                    company_name: N[u].c_name,
                                    contactnumber: g,
                                    contactnumber_type: N[u].contact_type,
                                    currency: N[u].currency,
                                    d_flag: N[u].d_flag,
                                    display_id: N[u].id,
                                    filter_contact_no: g,
                                    image: N[u].img_125,
                                    mcatid: N[u].mcatid.toString(),
                                    name: N[u].name,
                                    price: N[u].price,
                                    unit: N[u].unit,
                                    url: q,
                                    website_url: v,
                                    price_f: N[u].price_f
                                };
                                p.push(t)
                            }
                            p[0]["type_update"] = "s";
                            localStorage.setItem("meta_data", JSON.stringify(x));
                            localStorage.setItem("prodsViewed", JSON.stringify(p))
                        } else {
                            if ((N == "" || typeof N == "undefined") && (y != null && typeof y != "undefined")) { } else {
                                if ((y != null && typeof y != "undefined") && (N != "" && typeof N != "undefined")) {
                                    var n;
                                    var p = [];
                                    var J = [];
                                    for (var D = 0; D < y.length; D++) {
                                        var dateCurr = new Date();
                                        var dateCurrSec = dateCurr.getTime();
                                        var dtProd = y[D].DT;
                                        var dateProd = new Date(dtProd.substr(0, 4), dtProd.substr(4, 2) - 1, dtProd.substr(6, 2), dtProd.substr(8, 2), dtProd.substr(10, 2), dtProd.substr(12, 2));
                                        var dateProdSec = dateProd.getTime();
                                        var E = {
                                            DT: y[D].DT,
                                            R_glusr_id: y[D].R_glusr_id,
                                            company_name: y[D].company_name,
                                            contactnumber: y[D].contactnumber,
                                            contactnumber_type: y[D].contactnumber_type,
                                            currency: y[D].currency,
                                            d_flag: y[D].d_flag,
                                            display_id: y[D].display_id,
                                            filter_contact_no: y[D].filter_contact_no,
                                            image: y[D].image,
                                            mcatid: y[D].mcatid.toString(),
                                            name: y[D].name,
                                            price: y[D].price,
                                            unit: y[D].unit,
                                            url: y[D].url,
                                            website_url: y[D].website_url,
                                            price_f:y[D].price_f
                                        };
                                        if (!(dateCurrSec - dateProdSec) > 600000) {
                                            J.push(E)
                                        }
                                    }
                                    for (var u = 0; u < N.length; u++) {
                                        var r = "", q = "";
                                        if (location.href.indexOf("dev-m.indiamart.com") > -1) {
                                            r = "https://dev-m.indiamart.com/"
                                        } else {
                                            if (location.href.indexOf("stg-m.indiamart.com") > -1) {
                                                r = "https://stg-m.indiamart.com/"
                                            } else {
                                                r = "https://m.indiamart.com/"
                                            }
                                        }
                                        if (N[u].d_flag == 1 && N[u].fl_name && N[u].id && N[u].fl_name.indexOf(N[u].id) !== -1) {
                                            q = r + "proddetail/" + N[u].fl_name + ".html"
                                        } else {
                                            q = r + "isearch.php?s=" + N[u].name
                                        }
                                        var v = N[u].c_url;
                                        if (v != "" && v.match(/www.indiamart.com/i) == null) {
                                            v = "/company/" + N[u].s_id + "/"
                                        } else {
                                            if (v != "" && v.match(/www.indiamart.com/i) != null) {
                                                v = v.split("www.indiamart.com")[1]
                                            }
                                        }
                                        var g = (N[u].contact_type == "PNS") ? ("91" + N[u].c_number) : N[u].c_number;
                                        var t = {
                                            DT: N[u].DT,
                                            R_glusr_id: N[u].s_id,
                                            city_name:N[u].city,
                                            company_name: N[u].c_name,
                                            contactnumber: g,
                                            contactnumber_type: N[u].contact_type,
                                            currency: N[u].currency,
                                            d_flag: N[u].d_flag,
                                            display_id: N[u].id,
                                            filter_contact_no: g,
                                            image: N[u].img_125,
                                            mcatid: N[u].mcatid.toString(),
                                            name: N[u].name,
                                            price: N[u].price,
                                            unit: N[u].unit,
                                            url: q,
                                            website_url: v,
                                            price_f:N[u].price_f
                                        };
                                        p.push(t)
                                    }
                                    n = J.concat(p);
                                    n.sort(function (B, z) {
                                        var A = B.DT, C = z.DT;
                                        if (A > C) {
                                            return -1
                                        }
                                        if (A < C) {
                                            return 1
                                        }
                                        return 0
                                    });
                                    n = n.reduce(function (B, A) {
                                        var z = B.filter(function (C) {
                                            return ((A.mcatid == C.mcatid) && (A.d_flag == C.d_flag))
                                        });
                                        if (z.length == 0) {
                                            B.push(A)
                                        }
                                        return B
                                    }, []);
                                    for (var j = 0; j < (n.length - 1); j++) {
                                        if ((n[j].mcatid == n[j + 1].mcatid) && (n[j].d_flag !== n[j + 1].d_flag)) {
                                            n.splice(j, 1)
                                        }
                                    }
                                    var all_prod_l = n.length;
                                    if (all_prod_l > 25) {
                                        n = n.splice(0, 25)
                                    }
                                    n[0]["type_update"] = "s";
                                    localStorage.setItem("meta_data", JSON.stringify(x));
                                    localStorage.setItem("prodsViewed", JSON.stringify(n))
                                }
                            }
                        }
                        if ((s == null || typeof s == "undefined") && (S != "" && typeof S != "undefined")) {
                            S[0]["type_update"] = "s";
                            if (S.length > 25) {
                                S = S.splice(0, 25)
                            }
                            var i = [];
                            for (var u = 0; u < S.length; u++) {
                                var t = {
                                    DT: S[u].DT,
                                    displaykeyword: S[u].id,
                                    mcatid: S[u].mcatid.toString(),
                                    searchkeyword: "",
                                    searchurl: "",
                                };
                                i.push(t)
                            }
                            i[0]["type_update"] = "s";
                            localStorage.setItem("meta_data", JSON.stringify(x));
                            localStorage.setItem("recentSearches", JSON.stringify(i))
                        } else {
                            if ((S == "" || typeof S == "undefined") && (s != null && s != "undefined")) { }
                        }
                        if ((s != null && typeof s != "undefined") && (S != "" && typeof S != "undefined")) {
                            var m;
                            var i = [];
                            for (var u = 0; u < S.length; u++) {
                                var t = {
                                    DT: S[u].DT,
                                    displaykeyword: S[u].id,
                                    mcatid: S[u].mcatid.toString(),
                                    searchkeyword: "",
                                    searchurl: "",
                                };
                                i.push(t)
                            }
                            m = s.concat(i);
                            m.sort(function (B, z) {
                                var A = B.DT, C = z.DT;
                                if (A > C) {
                                    return -1
                                }
                                if (A < C) {
                                    return 1
                                }
                                return 0
                            });
                            m = m.reduce(function (B, A) {
                                var z = B.filter(function (C) {
                                    return A.mcatid == C.mcatid
                                });
                                if (z.length == 0) {
                                    B.push(A)
                                }
                                return B
                            }, []);
                            var all_keyw_l = m.length;
                            if (all_keyw_l > 25) {
                                m = m.splice(0, 25)
                            }
                            m[0]["type_update"] = "s";
                            localStorage.setItem("meta_data", JSON.stringify(x));
                            localStorage.setItem("recentSearches", JSON.stringify(m))
                        }
                    }
                    resolve(true);
                })
            }).then(function (result) {
                return result;
            });
            resolve(new_var);
        }).then(function (result) {
            return result;
        });
    },
    removeLoader() {
        let home_loader = document.getElementById('gblLoader_un');
        if (home_loader) {
            home_loader.style.display = 'none';
            document.getElementById('main').style.display = 'block';

        }
    },
    UniqueRandomNumbersWithinRange(min, max, quantity) {
        let numbers = gblFunc.range(min, max);
        gblFunc.shuffle(numbers);
        return numbers.slice(0, quantity);
    },
    shuffle(arra1) {
        var ctr = arra1.length, temp, index;
        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    },
    range(start, edge, step) {
        if (arguments.length == 1) {
            edge = start;
            start = 0;
        }
        edge = edge || 0;
        step = step || 1;
        for (var ret = []; (edge - start) * step > 0; start += step) {
            ret.push(start);
        }
        return ret;
    },
    getCityNameId(nameId) {
        let reference = this;
        return new Promise(function (resolve, reject) {
            let cookiefromuserloc = reference.getCookie('userlocName');
            if (reference.getCookieVal('GeoLoc_lt','iploc')) {
                ;
                let lat = reference.getCookieVal('GeoLoc_lt','iploc');
                let long = reference.getCookieVal('lg', 'iploc');
                resolve(imApi.findCityWithLatLong(lat, long).then(function (response) {
                    if (response.CODE == 200)
                        if (nameId == 'name') { return response.cityname; }
                        else { return response.cityid; }
                    reject();
                }));
            } else if (reference.getCookie('iploc')) {
                if (nameId == 'name') { var citygeoloc = reference.getCookieVal('gctnm', 'iploc'); }
                else { var citygeoloc = reference.getCookieVal('gctid', 'iploc'); }
                resolve(citygeoloc);
            } else if (cookiefromuserloc) {
                if (nameId == 'name') { cookiefromuserloc = decodeURIComponent(cookiefromuserloc).split('||')[0]; }
                else { cookiefromuserloc = decodeURIComponent(cookiefromuserloc).split('||')[1]; }
                resolve(cookiefromuserloc);
            }
            else {
                reject();
            }
        })
    },

    addslashes: function (str) {
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '\\"');
        str = str.replace(/\0/g, '\\0');
        return str;
    },
    trackPageViewforHome() {
        let identified = gblFunc.getCookie('ImeshVisitor');
        if (gblFunc.getCookieVal('utyp') == 'P' || (gblFunc.getCookieVal('utyp') == 'F' && gblFunc.getCookie('sellertool'))) {
            gblFunc.gaTrack.trackPageView('/pwa/home/seller/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer');
        }
        else if (identified) {
            gblFunc.gaTrack.trackPageView('/pwa/home/identified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer');
        }
        else {
            gblFunc.gaTrack.trackPageView('/pwa/home/unidentified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer');
        }
    },
    numTostring(data) {
        var new_data = [];
        data.map((val, key) => {
            const Entities = require('he');
            var decode = Entities.decode(val);
            new_data.push(decode);
        });
        return new_data;
    },
    doxssHandling(post_data) {
        var post_data = gblFunc.numTostring(post_data);
        var xsslist = gblFunc.getXSSList();
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
    },
    getXSSList() {
        var list = /(javascript:|&lt;script|<script|&lt;\/script|<\/script|script&gt;|script>|&lt;\/xml|<\/xml|xml&gt;|xml>|&lt;object|<object|&lt;\/object|<\/object|object&gt;|object>|vbscript:|livescript:|&lt;javascript|javascript:|alert\(|&lt;iframe|<iframe|@import|&lt;META|<META|FSCommand|onAbort|onActivate|onAfterPrint|onAfterUpdate|onBeforeActivate|onBeforeCopy|onBeforeCut|onBeforeDeactivate|onBeforeEditFocus|onBeforePaste|onBeforePrint|onBeforeUnload|onBeforeUpdate|onBegin|onBlur|onBounce|onCellChange|onChange|onClick|onContextMenu|onControlSelect|onCopy|onCut|onDataAvailable|onDataSetChanged|onDataSetComplete|onDblClick|onDeactivate|onDrag|onDragEnd|onDragLeave|onDragEnter|onDragOver|onDragDrop|onDragStart|onDrop|onEnd|onError|onErrorUpdate|onFilterChange|onFinish|onFocus|onFocusIn|onFocusOut|onHashChange|onHelp|onInput|onKeyDown|onKeyPress|onKeyUp|onLayoutComplete|onLoad|onLoseCapture|onMediaComplete|onMediaError|onMessage|onMouseDown|onMouseEnter|onMouseLeave|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onMouseWheel|onMove|onMoveEnd|onMoveStart|onOffline|onOnline|onOutOfSync|onPaste|onPause|onPopState|onProgress|onPropertyChange|onReadyStateChange|onRedo|onRepeat|onReset|onResize|onResizeEnd|onResizeStart|onResume|onReverse|onRowsEnter|onRowExit|onRowDelete|onRowInserted|onScroll|onSeek|onSelect|onSelectionChange|onSelectStart|onStart|onStop|onStorage|onSyncRestored|onSubmit|onTimeError|onTrackChange|onUndo|onUnload|onURLFlip|seekSegmentTime)/i;
        return list;
    },

    getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    },
    showSOI() {
        if ((!gblFunc.checkUserStatus() && gblFunc.getCookie("iploc") && gblFunc.getCookie("iploc") != '' && gblFunc.getCookieVal("gcniso", "iploc") == "IN") || (gblFunc.getCookieVal("glid") != '' && gblFunc.getCookieVal("iso") == "IN")) {
            return true;
        }
        else {
            return false;
        }
    },
    parseJson(data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            localStorage.removeItem("seenProdList");
        }
    },
    setPrdArr(prdid) {
        var data = [];
        data[0] = new Date().getTime();
        data[1] = [prdid];
        data = JSON.stringify(data);
        localStorage.setItem('seenProdList', data);
    },
    updatePrdArr(prdid) {
        var data = [];
        var seenProdList = localStorage.getItem("seenProdList");
        if (seenProdList !== "" && seenProdList !== null) {
            seenProdList = gblFunc.parseJson(seenProdList);
            if (typeof (seenProdList) !== 'undefined') {
                data[0] = seenProdList[0];
                seenProdList = seenProdList[1];
                var index = seenProdList.indexOf(prdid);
                /* Check if item already present in array*/
                if (index > -1) {
                    seenProdList.splice(index, 1);
                }
                /*Remove oldest item from array */
                if (seenProdList.length > 15) {
                    seenProdList.shift();
                }
                seenProdList.push(prdid);
            } else {
                gblFunc.setPrdArr(prdid);
                return;
            }
        } else {
            gblFunc.setPrdArr(prdid);
            return;
        }
        data[1] = seenProdList
        data = JSON.stringify(data);
        localStorage.setItem('seenProdList', data);
    },
    showSeenProd() {
        var seenProdList = localStorage.getItem("seenProdList");
        let i = 0;
        if (seenProdList !== "" && seenProdList !== null) {
            seenProdList = gblFunc.parseJson(seenProdList);
            if (typeof (seenProdList) !== 'undefined') {
                seenProdList = seenProdList[1];
                if (seenProdList.length > 0) {
                    for (i = 0; i < seenProdList.length; i++) {
                        if (document.getElementById('seen' + seenProdList[i])) {
                            document.getElementById('seen' + seenProdList[i]).classList.remove("dn");
                        }
                    }
                }
            }
        }
    },
    getDateTime() {
        var seenProdList = localStorage.getItem("seenProdList");
        if (seenProdList !== "" && seenProdList !== null) {
            seenProdList = gblFunc.parseJson(seenProdList);
            if (typeof (seenProdList) !== 'undefined') {
                var timeDiff = Math.abs(new Date().getTime() - seenProdList[0]);
                var diffHour = Math.ceil(timeDiff / (60 * 60 * 1000));
                if (diffHour >= 24) {
                    localStorage.removeItem("seenProdList");
                }
            }
        }
    },

    service_link(title, id) {
        let name = title;
        name = name.replace(/^\s+/, '');
        name = name.replace(/\s+$/, '');
        name = name.replace(/\s+/g, "-");
        name = name.toLowerCase();
        name = name.replace(/\&amp;/g, "&");
        name = name.replace(/\&lt;/g, "<");
        name = name.replace(/\&gt;/g, ">");
        name = name.replace(/\&nbsp;/g, " ");
        name = name.replace(/[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g, "-");
        name = name.replace(/^(-)+/, "");
        name = name.replace(/-+$/, "");
        if (location.hostname !== "localhost") {
            return "https://" + location.hostname + "/proddetail/" + name + '-' + id + '.html';
        }
        return location.hostname + ":8083/proddetail/" + name + '-' + id + '.html';
    },
    pdp_url(title, id) {
        let url = gblFunc.service_link(title, id)
        let posn = url.indexOf('proddetail')
        url = url.substring(posn)
        return url;
    },
    checksum(g) {
        let a = 65, b = 55, c = 36, p = '';
        return Array['from'](g).reduce((i, j, k, g) => {
            p = (p = (j.charCodeAt(0) < a ? parseInt(j) : j.charCodeAt(0) - b) * (k % 2 + 1)) > c ? 1 + (p - c) : p;
            return k < 14 ? i + p : j == ((c = (c - (i % c))) < 10 ? c : String.fromCharCode(c + b));
        }, 0);
    },
    gstRegexCheck(gstvalue) {
        let gsttestchecksum = gblFunc.checksum(gstvalue);
        let gstregextest = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstvalue);
        if (gsttestchecksum && gstregextest) {
            return true;
        }
        else {
            return false;
        }

    },
    gtmHandle() {

        var req_url = window.location.pathname;
        try {
            decodeURI(req_url);
        }
        catch (error) {
            req_url = encodeURI(unescape(unescape(req_url)));
        }
        if ((req_url.indexOf("/messages/conversation") > -1) && (req_url.indexOf("/messages/conversation/") == -1)) {
            req_url = req_url.split("/messages/conversation").join("/messages/conversation/");

        }
        if (req_url.indexOf("isearch") > 0) {
            req_url = req_url.split("=")[0] + "=" + req_url.split("=")[1];
        }

        let pathname = req_url;
        pathname = pathname.split("/").splice(1, 2).join("");

        if (pathname.indexOf('seller') > -1) {
            pathname = 'seller';
        }

        var userMode = this.getCookie('ImeshVisitor') ? 'Identified' : 'UnIdentified';


        if (req_url.indexOf('isearch') > 0) {
            pathname = 'isearch';

        } else if (req_url.indexOf('bl') > 0) {
            pathname = 'bl';

        }
        else if (req_url == '/') {
            pathname = 'home';
            let str_for_pv = '/home/';
            if (this.getCookie('ImeshVisitor') && ((this.getCookieVal('utyp') == 'P') || (this.getCookie('sellertool')) && (this.getCookieVal('utyp') == 'F')))
                str_for_pv += 'seller'
            else if (this.getCookie('ImeshVisitor'))
                str_for_pv += 'identified'
            else
                str_for_pv += 'unidentified'
            req_url = str_for_pv

        }

        //imgtm=[];
        (pathname != 'isearch' && pathname != 'messages' && pathname !== 'messagesconversation' && pathname != 'seller' && pathname != 'bl') ? imgtm.push({ "CD_User-Mode": userMode, "PV_Tracking": "/vpv/pwa" + req_url, "CD_Miscellaneous": trackAppVer('') + gblFunc.A2HSApp() }) : '';
        (pathname != 'isearch' && pathname != 'messages' && pathname !== 'messagesconversation' && pathname != 'seller' && pathname != 'bl') ? (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G") : '';



    },
    updateUnreadMsg(count, time, glid) {
        var localst = JSON.parse(localStorage.getItem("multi_purpose"));
        if (localst == null || localst == 'undefined') {
            localst = {};
        }
        localst['count'] = count;
        localst['time'] = time;
        localst['glid'] = glid;
        localStorage.setItem("multi_purpose", JSON.stringify(localst));
        if (count != "" && count > 0) {
            count > 99 ? count = "99+" : count;
            (document.getElementById('cntmsg')) ? document.getElementById('cntmsg').innerHTML = count : '';
            (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = count : '';
            (document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' (' + count + ')' : '';
        }
    },
    countUnreadMessages(isMenu = false) {
        var glid = getImCookie({ name: "ImeshVisitor", flag: 1 }).glid;
        if (glid) {
            var localst = JSON.parse(localStorage.getItem("multi_purpose"));
            var self = this;
            var localGlid = glid
                , localTime = 0
                , c = 0
                , curTime = new Date
                , localCount = "";
            if (localst !== "" && localst !== null) {
                if (typeof (localst['count']) !== "" && typeof (localst['count']) !== "undefined") {
                    localCount = localst['count'];
                    localTime = localst['time'];
                    var s = curTime.getTime() - new Date(localTime).getTime();
                    c = Math.floor(s / 1e3 / 60 / 60);
                    localGlid = localst['glid'];
                }
            }
            let hitService = (!isMenu && (/(^\/messages\/$)|(^\/$)/g).test(location.pathname));
            if ((glid && (0 == localTime || c >= 4) || glid != localGlid) || hitService) {
                imApi.getMsgCount().then(function (response) {
                    if (null != response && "200" == response.code) {
                        var count = response.count;
                        if (null == count) {
                            count = 0;
                        }
                        self.updateUnreadMsg(count, curTime, glid);
                    }
                });
            } else {
                if (localCount !== "" && localCount > 0) {
                    localCount > 99 ? localCount = "99+" : localCount;
                    (document.getElementById('cntmsg')) ? document.getElementById('cntmsg').innerHTML = localCount : '';
                    (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = localCount : '';
                    (document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' (' + localCount + ')' : '';
                }
            }
        }
    },
    checkGSTDispositionDisplay() {
        // Check for localstorage for GST Dispositions
        if (localStorage.getItem('GST_Dispositions') && localStorage.getItem('GST_Dispositions') != "undefined") {
            let gst_disposition = JSON.parse(localStorage.getItem('GST_Dispositions'));
            let gst_disposition_value = gst_disposition[0].Disp_name;
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var diffDays = Math.round(Math.abs((new Date().getTime() - new Date(parseInt(gst_disposition[0].time)).getTime()) / (oneDay)));
            if (diffDays >= 14 && gst_disposition_value.includes("have")) {
                return true;
            }
            else if (diffDays >= 5 && gst_disposition_value.includes("remember")) {
                return true;
            }
            else {
                return false;
            }

        }
        else {
            return true;
        }
    },
    bannerImpressTracking(name, value, type) {
        let element_track = '';
        let offsettopvalue = "";
        if (type == "class") {
            element_track = document.getElementsByClassName(value);
        }
        else {
            element_track = document.getElementById(value);
        }
        if (element_track) {

            if (type == "class") {
                offsettopvalue = document.getElementsByClassName(value)[0].offsetTop;
            }
            else {
                offsettopvalue = document.getElementById(value).offsetTop;
            }
            if (window.scrollY + window.innerHeight == offsettopvalue) {
                bannerImpressionGA(name + "_");
            }
            else {
                bannerImpressTrackAdd(name, value, type);
            }
        }
    },
    decodeStr(str) {
        return str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    },
    A2HSApp(pipe = true) {
        var A2HSAppend = '';
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true || (location.search.indexOf('IMliteicon') > -1)) {
            if (pipe)
                A2HSAppend = '|' + 'A2HS';
            else
                A2HSAppend = 'A2HS';

        }
        return A2HSAppend;
    },
    fireIMLitePVTracking(PV = 'NFPV'){
    
        var userDetails = '';
        var a2hs;
        a2hs = gblFunc.A2HSApp() != '' ? 'Platform_IMLite' : 'Platform_Web';
        if(a2hs === 'Platform_IMLite'){
            userDetails = `|IMLite_installed|${a2hs}`
        }
        else if(PV === 'FPV')
        {
            userDetails = ""
        }
        else
        {
            userDetails = `|${a2hs}`
        }
        return userDetails;
    }

}

export default gblFunc;
