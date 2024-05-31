import { getLocationPageName } from '../api/locationHelper';
import {getCookieValByKey,getCookie,setCookie} from './CookieManager';
import {gaTrack} from './GaTracking';
import { mergeGeolocIplocFunc } from './GlobalFunc';
export const geolocationHandler=()=>{
    window.page = {}; 
    let cookiedata = getCookie("iploc");
    let cookieDataState=getCookie("gstate");
    let bot_request = (/googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent));
    if((!cookiedata || !cookieDataState) && !bot_request){ 
        let extractPageLocation = window.pageName?window.pageName :(window.pagename ?window.pagename: getLocationPageName());
        var data = `modid=IMOB&token=imobile@15061981&source_file=${extractPageLocation}`;
    return makeRequestLocation('POST','https://geoip.imimg.com/api/location',data,1)
   }
   else
   {if(bot_request){
           return new Promise(function(resolve, reject) {
           window.page.country = 'United States Of America';
           window.page.countryCode = 'US';
           window.page.country_ip = '0.0.0.0';
           return resolve({ 'country': 'United States Of America', 'country_iso' : 'US', 'country_ip': '0.0.0.0' })
           });
       }else{
     return new Promise(function(resolve, reject) {
       let c_iso=getCookieValByKey('iploc','gcniso');
       if(c_iso == 'GB' || c_iso == 'EU')
       {
           c_iso = 'UK';
       }
       else if(c_iso == 'A1' || c_iso == 'A2' || c_iso == 'O1' || c_iso == 'AP')
       {
           c_iso = '';
       }
       
       window.page.country = getCookieValByKey('iploc','gcnnm');
           window.page.countryCode = getCookieValByKey('iploc','gcniso');
           window.page.country_ip = getCookieValByKey('iploc','gip');
     return resolve({ 'country': getCookieValByKey('iploc','gcnnm'), 'country_iso' : c_iso, 'country_ip': getCookieValByKey('iploc','gip') })
     });
   }
}
}

function makeRequestLocation(method, url, body,service){
return new Promise(function(resolve, reject) {
var xhr = new XMLHttpRequest();
xhr.open(method, url);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.timeout = 10000;
xhr.ontimeout = function () { 
gaTrack.trackEvent(['Timeout',"PWA", url, 0, true]) }
xhr.onload = function() {
if (this.status == 200 && this.readyState == 4 ){
   let p = JSON.parse(xhr.response);
   let cookieString = '';
   let cookieString1='';
   if(p.Response.Code==200){
       if(p.Response.Data.geoip_countryiso == 'IN'){
          cookieString = "gcniso="+p.Response.Data.geoip_countryiso +"|gcnnm="+p.Response.Data.geoip_countryname+"|gctnm="+p.Response.Data.geoip_cityname+"|gctid="+p.Response.Data.geoip_cityid+"|gacrcy="+p.Response.Data.geoip_accuracy+"|gip="+p.Response.Data.geoip_ipaddress+"|gstate="+p.Response.Data.geoip_statename;
          cookieString1="state="+p.Response.Data.geoip_statename;
        }
       else
           {cookieString = "gcniso="+p.Response.Data.geoip_countryiso +"|gcnnm="+p.Response.Data.geoip_countryname+"|gacrcy="+p.Response.Data.geoip_accuracy+"|gip="+p.Response.Data.geoip_ipaddress;
           cookieString1="state="+"";
        }
           setCookie('gstate',cookieString1)
           setCookie('iploc',cookieString,0.12);

       mergeGeolocIplocFunc(cookieString);

       window.page.country = p.Response.Data.geoip_countryname;
       window.page.countryCode = p.Response.Data.geoip_countryiso;
       window.page.country_ip = p.Response.Data.geoip_ipaddress;
       if(service==2){
         return resolve({ 'country': p.Response.Data.geoip_countryiso})
       }
       return resolve({ 'country': p.Response.Data.geoip_countryname, 'country_iso' : p.Response.Data.geoip_countryiso, 'country_ip': p.Response.Data.geoip_ipaddress })
   }else
   {
         return resolve({ 'country': 'IN'});
   }
} 
else {
reject({
   status: this.status,
   statusText: xhr.statusText
});
}
};
xhr.onerror = function() {
reject({
status: this.status,
statusText: xhr.statusText
});
};
xhr.send(body);
});
}