import { getCookieValByKey } from './CookieManager';

export const clickToCall = (mobile, gluserId, PNS, MODID, pagetype, queryID = '', queryType = '') => {
    var userCity = getCookieValByKey("iploc","gctnm")
    userCity = userCity ? userCity : 'All India'
    if ((navigator && navigator.userAgent &&  navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator && window.navigator.standalone) || (window.matchMedia && window.matchMedia('(display-mode:standalone)').matches)) {
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
    xmlhttp.send("m=" + mobile + "&amp;Id=" + gluserId + "&amp;PNS=" + PNS + "&amp;MODID=" + MODID + "&amp;pageType=" + pagetype + "&amp;queryID=" + queryID + "&amp;queryType=" + queryType + "&amp;userCity=" + userCity);
}

/*select * from c2c_records where C2C_RECEIVER_GLUSR_ID='89618835' and c2c_caller_glusr_id =  '39174173'*/
