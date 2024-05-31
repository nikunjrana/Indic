import React, {Component} from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";

import {setCookie} from '../../../Globals/CookieManager';
import {gaTrack} from '../../../Globals/GaTracking';
class AppBanner extends Component {
    constructor(props){
        super(props);
        this.bannerDeepLinking=this.bannerDeepLinking.bind(this);
        this.checkAppForUser=this.checkAppForUser.bind(this);
        this.readCookie=this.readCookie.bind(this);
        this.bannerRedirection=this.bannerRedirection.bind(this);
    }

   readCookie(e){var offset,end;var t=e+"=";return document.cookie.length>0&&(offset=document.cookie.indexOf(t),-1!=offset)?(offset+=t.length,end=document.cookie.indexOf(";",offset),-1==end&&(end=document.cookie.length),unescape(document.cookie.substring(offset,end)).replace(new RegExp("\\+","g")," ")):""}
    div_hide(div) {
        if (document.querySelector("#" + div)) 
            document.querySelector("#" + div).style.cssText = "display:none";
        }
   checkAppForUser(g,e,k) {
    
    var b;
    var prev_ref=this;
    if (window.XMLHttpRequest) {
        b = new XMLHttpRequest()
    } else {
        b = new ActiveXObject("Microsoft.XMLHTTP")
    }
    b.onreadystatechange = function() {
        if (b.readyState == 4 && b.status == 200) {
            if (b.responseText != null && b.responseText != "") {
                var a = JSON.parse(b.responseText);
                if (a.app_install_status == 1 || a.app_install_status == "1") {
                    document.cookie = "isApp=1;path=/"
                } else {
                    document.cookie = "isApp=0;path=/"
                }
        

                prev_ref.bannerRedirection(g,e,k);
            }
        }
    }
    ;
    b.open("POST", "/checkuser/");
    b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    b.send()
}
bannerDeepLinking(g, e, k) {
    this.checkAppForUser(g,e,k);
}
bannerRedirection(g,e,k){
    var j = this.readCookie("isApp");
    var isIphone = navigator.userAgent.indexOf("iPhone") != -1 ;
    var iPod = navigator.userAgent.indexOf("iPod") != -1 ;
    var isIpad = navigator.userAgent.indexOf("iPad") != -1 ;
    if (isIphone ||iPod ||isIpad) {
        if (j == 1) {
            var link = k.replace(/^.*\/\/[^\/]+/, "");
            var h = "IndiaMART:/" + link;
            window.location.href = h;
          
    }
    else{
        window.location.href="https://m.indiamart.com/app.php?source=footer_link&subsource=&modid=";
     }
 } else {
    if (j == 1) {
        var i = k.split("//");
        var f = i[1];
        if (i[1].includes("&")) {
            i[1] = i[1] + "&utm_source=mobilesite&utm_medium=banner&utm_campaign=Pwa_Seller"
        } else {
            if (i[1].includes("?")) {
                i[1] = i[1] + "&utm_source=mobilesite&utm_medium=banner&utm_campaign=Pwa_Seller"
            } else {
                i[1] = i[1] + "?utm_source=mobilesite&utm_medium=banner&utm_campaign=Pwa_Seller"
            }
        }
        var h = "intent://" + i[1] + "#Intent;scheme=https;package=com.indiamart.m;S.browser_fallback_url=market://details?id=com.indiamart.m&referrer=utm_source%3Dmobilesite%26utm_medium%3Dbanner%26utm_campaign%3DPwa_Seller%26utm_content%3D" + f + ";end";
        window.location.href=h;
    }
    else{
       window.location.href="https://m.indiamart.com/app.php?source=footer_link&subsource=&modid=";
    }
}
}
    
    render() {
        var source = this.props.source
            ? this.props.source
            : "";
        var subsource = this.props.subsource
            ? this.props.source
            : "";
        var modid = this.props.modid
            ? this.props.modid
            : "";
        if(this.readCookie("APPB")=="closed"){
            return(<div></div>);
        }
        else{
        return (
            (!document.referrer.includes("twa") ?
               <div onClick={() => this.div_hide("banner")} id="banner" className="pf w100 zIn apBt">
               <div id="floating_banner" className="opApp clrw fs13 tc ma por">
               <div onClick={() => {var url=window.location.href.replace("stg-m","m");gaTrack.trackEvent(['App-Banner-Clicks', 'Click', this.props.tracking]);this.bannerDeepLinking('Floating_Footer', '', url);}}>Open in App</div>
               <div onClick={() => { gaTrack.trackEvent(['App-Banner-Clicks', 'Cancel', this.props.tracking]);this.div_hide("floating_banner");setCookie('APPB', "closed",0.02);}} id="appClose">
               <span id="xclose" className="opBtCr clrw tl poa" >✕</span>
               </div>
               </div>
               </div>:"")
        )
    }
    }

}
export default AppBanner;
