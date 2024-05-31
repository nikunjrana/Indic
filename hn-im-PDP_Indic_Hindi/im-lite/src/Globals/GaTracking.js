import { trackAppVer, checkUserStatus, pdp_url } from './MainFunctions';
import { getCookie, getCookieValByKey } from './CookieManager';
import { userType } from './UserType';
import { connectionChecking } from './2gconnection';
import glidArr from '../../server/GlidsForIndic';

const loginModes = { 0: 'UnIdentified', 1: 'Identified', 2: 'LoggedIn', "null": 'UnIdentified' };
var pageTitle = "IndiaMART - Indian Manufacturers Suppliers Exporters Directory - PWA";

//For Indic Tracking 10% users
function IndicUsers(){
    let glid = getCookieValByKey('ImeshVisitor', 'glid') ? getCookieValByKey('ImeshVisitor', 'glid') : '';
    let gaid=getCookie("_ga")?getCookie('_ga'):'';
    let lastgadigit = gaid && gaid.length && gaid[gaid.length-1]?gaid[gaid.length-1]:'';
    let lastDigitArr = ["1","2","3","4","5"];
    var isGlid = (glid && glidArr && glidArr.includes(glid)) || (lastgadigit && lastDigitArr && lastDigitArr.includes(lastgadigit)) ? true : false;
    return isGlid
}

export const A2HSApp = (pipe = true) => {
    var A2HSAppend = '';
    if (( window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || ( window.navigator && window.navigator.standalone === true)) {
        if (pipe)
            A2HSAppend = '|' + 'A2HS';
        else
            A2HSAppend = 'A2HS';

    }
    return A2HSAppend;
}

export const fireIMLitePVTracking = (PV = 'NFPV') => {

    var userDetails = '';
    var a2hs;
   a2hs = A2HSApp() != '' ? 'Platform_IMLite' : 'Platform_Web';
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

// function previousPageURL(){
//     let previousPage = document.referrer;
//     if(window.pageURL){
//         previousPage = window.pageURL;
//     }
//     return previousPage;
// }

export const checkremktg = () => {
    var remktgval = '';
    if (getCookie("remktg")) {
        remktgval = '|remktg';
    }
    return remktgval;
}
export const checkimEqGl=()=>{
       let check = localStorage.getItem('imEqGl')? localStorage.getItem('imEqGl'):'';
       if(check)
        return ("|converted|");
        else
        return ("|Non-converted|");
}
export const trackPostBuy = (paramsPostBuy="") => {
    trackPV('/postbuy.php'+paramsPostBuy, 'Buy/ Purchase Requirement Form');
}
// export const prevurl=()=>{
//     if(localStorage&&localStorage.PDP404URL)
// 		  {
// 			 let pdp=JSON.parse(localStorage.PDP404URL).currentPageURL;
//              return  'PrevPageURL-'+pdp
// 		  }    
//           return ''
// }


export const viewcount=()=>{
    let multipurpose = localStorage && localStorage.multi_purpose ?  JSON.parse(localStorage.multi_purpose) : '';
    return multipurpose.userViewCount ?multipurpose.userViewCount:0;
}
export const prevname=()=>{
    let ls= localStorage;
    let pdp=ls&&ls.PDP404URL?JSON.parse(ls.PDP404URL):''; 
    let pdpcur=pdp?pdp.currentPageURL:'';
   if(pdpcur.includes('/messages/'))    
    {return 'PrevPageName-Messages'}
  else if(sessionStorage.isback){
    if(ls&&ls.relProds2){   //other pages prevpagetrack
    let addText=ls.relProds2?JSON.parse(ls.relProds2)?JSON.parse(JSON.parse(ls.relProds2))?JSON.parse(JSON.parse(ls.relProds2))[0]?JSON.parse(JSON.parse(ls.relProds2))[0].pagekey:'':'':'':'';
     addText=addText?addText.slice(1):'';
     return 'PrevPageName-'+addText} }
        else
   {return 'PrevPageName-Direct'}

}

export const trackPageViewforHome = () => {
      
    // clarity("set", "Page", window.pagename);
    let identified = getCookie('ImeshVisitor');
    let ls = localStorage;
    if (identified && (getCookieValByKey('ImeshVisitor', 'utyp') == 'P' || (getCookieValByKey('ImeshVisitor', 'utyp') == 'F'))) {
        if(checkUserStatus()===2)
        gaTrack.trackPageView('/pwa/home/Full-Login/seller/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
        else
        gaTrack.trackPageView('/pwa/home/identified/seller', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    else if (identified) {
        gaTrack.trackPageView('/pwa/home/identified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    else if (!ls.recentMcats && !ls.relCats && !ls.relProds2 && !ls.prodsViewed) {
        gaTrack.trackPageView('/pwa/home/unidentified/newuser/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    else {
        gaTrack.trackPageView('/pwa/home/unidentified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer','HomePage');
    }
    // window.pageURL = window.location.href;
}


//PV Track for Enq/Bl and Error Pages
export const trackPVEnqBL = (pageName, title = "") => {
    if(window.truecallerLogin && (pageName.includes('Enquiry') || (pageName && pageName.toLowerCase().includes('bl')))) {
        pageName = pageName+'/TruecallerLogin';
    }
    // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
    const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
    let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
    let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
    let callCount = multi_purpose && multi_purpose.ctcrecordid && (pageName.includes('Enter-Mob-Form') || pageName.includes('Enter-Email-Form')) ? '/CallConverted' : '';
    let vpv = "/vpv/pwa/";
    if(pageName.indexOf('nf')>-1){
        vpv = "/vpv/";
    }
    if (imgtm.length <= 1) {
        imgtm.push({
            "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
            "PV_Tracking": vpv + pageName + callCount,
            // "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),

        });
        (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    }
    else {
        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": vpv + pageName + callCount +(indicTrack?indicTrack:''),
            "virtualPageTitle": title,
            // "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
        });

    }
}
//PV Track For BL
export const trackPV = (pageName, title = "Latest BL") => {
    // let previousPage = previousPageURL();
    if (pageName.indexOf("/bl/") <= -1 && (pageName == "/dir/" || pageName.indexOf("/dir/") > -1 || pageName.indexOf("/suppliers/") > -1
        || pageName.indexOf("/proddetail/") > -1 || pageName.indexOf("/messages") > -1)
    ) {

        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv/pwa" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),   
                // "CD_Source" : previousPage,             
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv/pwa" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
                // "CD_Source" : previousPage,             

            });

        }
       

    }
    else if (pageName=='/postbuy.php') {
        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv/pwa" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),   
                // "CD_Source" : previousPage,             
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv/pwa" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
                // "CD_Source" : previousPage,             
    
            });
    
        }
    
    }
     else {
        let url = title.search('cityIndex') > -1 ? "/vpv"+ pageName:"/vpv/pwa/bl/" + pageName;

        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": url,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),
                // "CD_Source" : previousPage,             


            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }

        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": url,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
                // "CD_Source" : previousPage,             

            });
        }
        imgtm.push({
            "CD_Cust-Type-Weight": getCookieValByKey("ImeshVisitor", "cmid") ? getCookieValByKey("ImeshVisitor", "cmid") : ''
        });
       
    }
    // window.pageURL = window.location.href;
       

}
//Track in General
export const gaTrack = {
    trackPageView: function (pageName, title, CD_Miscellaneous='',brd_mcat_id='', prevPageURL='', curntPageURL='', compEcom='',glID = '',cABTestPDP='',cABTestComp = '',comp_status='',catFlg = '', whatsapp='') {
        // title = pageTitle;
        // let previousPage = previousPageURL();
        // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
        const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
        let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
        imgtm.push({
            "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + A2HSApp()
        });
        let pixelRatio='';
        if(window.devicePixelRatio){
            pixelRatio="|dpr=" + window.devicePixelRatio;
        }
        if (window.location.pathname.indexOf("messages") > -1 && (imgtm.length > 3) && (window.location.pathname.indexOf("isearch") === -1) && (window.location.pathname.indexOf("bl") === -1) && (window.location.pathname != '/')) {
            imgtm.push({
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),
                // "CD_Source" : previousPage,

            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else if (window.location.pathname.indexOf("seller") > -1 && imgtm.length === 0 && (window.location.pathname.indexOf("isearch") === -1) && (window.location.pathname.indexOf("bl") === -1) && (window.location.pathname != '/')) {
            imgtm.push({
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv" + pageName,
                "CD_Miscellaneous": window.location.pathname.indexOf("seller") > -1 ? trackAppVer('') + A2HSApp() + checkremktg() + fireIMLitePVTracking('FPV') + (window.SellTrigger ? '_Sell-Trigger':'') : trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),
                // "CD_Source" : previousPage,
           
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else if (pageName.indexOf('/pwa/home/') > -1 || pageName.indexOf('city-hub') > -1 || pageName == "/impcat/") {


            if (imgtm.length <= 1) {
                imgtm.push({
                    "CD_User-Mode": (checkUserStatus() === 1||checkUserStatus() === 2) ? "identified" : "unidentified",
                    "PV_Tracking": "/vpv" + pageName + (indicTrack?indicTrack:''),
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA":""+trackAppVer('')+"|CD_Viewcount="+viewcount() + A2HSApp() +checkimEqGl()+prevname(),
                    // "CD_Source" : previousPage,

                });
                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
            }

            
            
            else {
                imgtm.push({
                    "event": "VirtualPageview",
                    "virtualPageURL": "/vpv" + pageName,
                    "virtualPageTitle": title,
                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" :""+trackAppVer('')+"|CD_Viewcount="+viewcount() + A2HSApp() +checkimEqGl()+prevname(),
                    // "CD_Source" : previousPage,
              
                });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
              
            }


        }
        else if (pageName.indexOf('/my/profile/businessprofile/') > -1 ) {

            if (imgtm.length <= 1) {
                imgtm.push({
                    "CD_User-Mode": "|identified|" ,
                    "PV_Tracking": "/vpv" + pageName,
                    //"CD_Miscellaneous": "",
                    // "CD_Source" : previousPage,

                });
                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
            }
            
              
             }
        else if (pageName.indexOf('/my/editprofile/') > -1 ) {

            if (imgtm.length <= 1) {
                imgtm.push({
                    "CD_User-Mode": "|identified|" ,
                    "PV_Tracking": "/vpv" + pageName,
                    //"CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + fireIMLitePVTracking('FPV'),
                    // "CD_Source" : previousPage,

                });
                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
            }
            
              
             }
             else if (pageName.indexOf('/my/changepass/') > -1 ) {

                if (imgtm.length <= 1) {
                    imgtm.push({
                        "CD_User-Mode": "|identified|" ,
                        "PV_Tracking": "/vpv" + pageName,
                        //"CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + fireIMLitePVTracking('FPV'),
                        // "CD_Source" : previousPage,
    
                    });
                    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                }
                
                  
                 }
         


        else if (pageName.indexOf('/my/profile/businessprofile/') > -1 ) {

                if (imgtm.length <= 1) {
                    imgtm.push({
                        "CD_User-Mode": "|identified|" ,
                        "PV_Tracking": "/vpv" + pageName,
                        //"CD_Miscellaneous": "",
                        // "CD_Source" : previousPage,
    
                    });
                    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                }
            }
        else if (pageName.indexOf('/my/profile/addcin/') > -1 ) {

                    if (imgtm.length <= 1) {
                        imgtm.push({
                            "CD_User-Mode": "|identified|" ,
                            "PV_Tracking": "/vpv" + pageName,
                            "CD_Miscellaneous": "",
                            // "CD_Source" : previousPage,
        
                        });
                        (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                    }
                    
                      
                     }
        else if (pageName.indexOf('/my/') > -1 ) {

                        if (imgtm.length <= 1) {
                            imgtm.push({
                                "CD_User-Mode": "unidentified" ,
                                "PV_Tracking": "/vpv" + pageName,
                                // "CD_Miscellaneous": "",
                                // "CD_Source" : previousPage,
            
                            });
                            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                        }
                        
                          
                         }
                         else if (pageName.indexOf('/my/profile/') > -1 ) {

                            if (imgtm.length <= 1) {
                                imgtm.push({
                                    "CD_User-Mode": "|identified|" ,
                                    "PV_Tracking": "/vpv" + pageName,
                                    //"CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + fireIMLitePVTracking('FPV'),
                                    // "CD_Source" : previousPage,
                
                                });
                                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                            }
                            else {
                                imgtm.push({
                                    "event": "VirtualPageview",
                                    "virtualPageURL": "/vpv" + pageName,
                                    "CD_User-Mode": checkUserStatus() === 1 ? "|identified|" + checkimEqGl(): "unidentified",
                                    "virtualPageTitle": title,
                                    "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" :"" + A2HSApp() + fireIMLitePVTracking(),
                                    // "CD_Source" : previousPage,
                              
                                });
                            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                              
                            }
                        
                              
                             }
                    
                             else if (pageName.indexOf('/my/profile/DisableAccountPage/') > -1 ) {

                                if (imgtm.length <= 1) {
                                    imgtm.push({
                                        "CD_User-Mode": "|identified|" ,
                                        "PV_Tracking": "/vpv" + pageName,
                                        //"CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + fireIMLitePVTracking('FPV'),
                                        // "CD_Source" : previousPage,
                    
                                    });
                                    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                                }
                                else {
                                    imgtm.push({
                                        "event": "VirtualPageview",
                                        "virtualPageURL": "/vpv" + pageName,
                                        "CD_User-Mode": checkUserStatus() === 1 ? "|identified|" + checkimEqGl(): "unidentified",
                                        "virtualPageTitle": title,
                                        "CD_Miscellaneous": trackAppVer(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" :"" + A2HSApp() + fireIMLitePVTracking(),
                                        // "CD_Source" : previousPage,
                                  
                                    });
                                (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
                                  
                                }
                                
                                  
                                 }
                                
        

        else if(pageName.indexOf('/company') > -1) {

            let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
            let isEcom = compEcom?'|'+`${compEcom}`:"";
            let glid = compEcom && glID?'|'+`${glID}` :"";
            let compStatus = comp_status ? comp_status : '';
            let catFlag = catFlg ? catFlg :'';
            let ga = getCookie('_ga');
            let gaLastDigit = ga?ga[ga.length-1]:'';
            let prevPgs=localStorage&&localStorage.PDP404URL?JSON.parse(localStorage.PDP404URL):'';
            if (imgtm.length <= 1) {
                let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
                let soiButton=(sellerIntent && sellerIntent.Intent&&checkUserStatus()==2 )?"|SOI-Button":"";
                    if(prevPgs && prevPgs.previousPageURL && prevPgs.previousPageURL.includes("isearch")){
                        imgtm.push({
                            "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                            "PV_Tracking": "/vpv" + pageName + (indicTrack?indicTrack:''),
                            "CD_Miscellaneous":langSelection +'|CompanyPWA'+`${soiButton}` + A2HSApp() + fireIMLitePVTracking('FPV') + isEcom + glid+pixelRatio + cABTestComp + compStatus + catFlag + whatsapp,
                            "CD_MCAT" :brd_mcat_id,
                            "CD_Source" : prevPgs.previousPageURL,
            
                        });
                    }
                    else{
                        imgtm.push({
                            "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                            "PV_Tracking": "/vpv" + pageName + (indicTrack?indicTrack:''),
                            "CD_Miscellaneous":langSelection +'|CompanyPWA'+`${soiButton}` + A2HSApp() + fireIMLitePVTracking('FPV') + isEcom + glid+pixelRatio + cABTestComp + compStatus + catFlag + whatsapp,
                            "CD_MCAT" :brd_mcat_id,
                            // "CD_Source" : previousPage,
            
                        });
                    }            
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
         } else {
                if(prevPgs && prevPgs.previousPageURL && prevPgs.previousPageURL.includes("isearch")){
                    imgtm.push({
                        "event": "VirtualPageview",
                        "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                        "virtualPageURL": "/vpv" + pageName,
                        "CD_Miscellaneous":langSelection +'|CompanyPWA' + A2HSApp() + fireIMLitePVTracking()+ isEcom + glid +pixelRatio + cABTestComp+compStatus + catFlag + whatsapp,
                        "CD_MCAT" : brd_mcat_id,
                        "CD_Source" : prevPgs.previousPageURL,

                    });
                } else{
                    imgtm.push({
                        "event": "VirtualPageview",
                        "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                        "virtualPageURL": "/vpv" + pageName,
                        "CD_Miscellaneous":langSelection +'|CompanyPWA' + A2HSApp() + fireIMLitePVTracking()+ isEcom + glid +pixelRatio + cABTestComp+compStatus + catFlag + whatsapp,
                        "CD_MCAT" : brd_mcat_id,
                    // "CD_Source" : previousPage,

                    });
                }
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
              
            }
        }
        else if (pageName.indexOf('/pwa/dir/') > -1) {
            imgtm = [];
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
                // "CD_Source" : previousPage,

            });


            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else if(pageName.indexOf('/nf/proddetail') > -1) {
            let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
            let PrevPageURL = prevPageURL;
            let CurntPageURL = curntPageURL;
            PrevPageURL ? PrevPageURL = '|PrevPageURL|' + PrevPageURL : '';
            CurntPageURL ? CurntPageURL = '|CurntPageURL|' + CurntPageURL : '';

            if (imgtm.length <= 1) {
                imgtm.push({
                    "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                    "PV_Tracking": "/vpv" + pageName,
                    "CD_Miscellaneous": langSelection + '|PDP-PWA' + A2HSApp() + fireIMLitePVTracking() +PrevPageURL+ CurntPageURL +cABTestPDP,
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
         } 
         else {
                imgtm.push({
                    "event": "VirtualPageview",
                    "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                    "virtualPageURL": "/vpv" + pageName,
                    "CD_Miscellaneous": langSelection + '|PDP-PWA' + A2HSApp() + fireIMLitePVTracking() +PrevPageURL+ CurntPageURL +cABTestPDP,
                });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");   
            }
        }
        else if(pageName.indexOf('/items') > -1) {
            let CD_Miscellaneous1 = '';
            let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
            if(brd_mcat_id) {
                CD_Miscellaneous1 += (CD_Miscellaneous ? "multiple-image" : "single-image") + "|"+ langSelection;
            }
            if (imgtm.length <= 1) {
            let pvObj = {
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "PV_Tracking": (pageName.includes("nf") ? "" : "/vpv")+ pageName,
                "CD_Miscellaneous": CD_Miscellaneous1+ A2HSApp() + fireIMLitePVTracking('FPV'),
            }
            if(brd_mcat_id) {
                pvObj["CD_MCAT"] = brd_mcat_id;
            }
            imgtm.push(pvObj);
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
         } else {
            let pvObj = {
                "event": "VirtualPageview",
                "CD_User-Mode": loginModes[checkUserStatus()] === 1 ? "identified" : "unidentified",
                "virtualPageURL": (pageName.includes("nf") ? "" : "/vpv") + pageName,
                "CD_Miscellaneous": CD_Miscellaneous1 + A2HSApp() + fireIMLitePVTracking(),
            }
            if(brd_mcat_id) {
                pvObj["CD_MCAT"] = brd_mcat_id;
            }
            // if(title) {
            //     pvObj[ "virtualPageTitle"] = title
            // }
            imgtm.push(pvObj);
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
              
            }
        }
        else {
            let sellerGlid = glID? '|SELLER_GLID:'+ glID:'';
            imgtm.push({ 'CD_User-Mode': loginModes[checkUserStatus()] });
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking()+ sellerGlid + CD_Miscellaneous,
                // "CD_Source" : previousPage,

            });

            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");



        }

        imgtm.push({
            "CD_Cust-Type-Weight": getCookieValByKey("ImeshVisitor", "cmid") ? getCookieValByKey("ImeshVisitor", "cmid") : ''
        });
        // window.pageURL = window.location.href;

    },

    trackMessagesPageViewWithCustomDimension: function(pageName, title, CD_Source){

        if (imgtm.length <= 1) {
            imgtm.push({
                "CD_User-Mode": checkUserStatus() === 1 ? "identified" : "unidentified",
                "PV_Tracking": "/vpv/pwa" + pageName,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking('FPV'),
                "CD_Source": CD_Source
            });
            (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
        }
        else {
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": "/vpv/pwa" + pageName,
                "virtualPageTitle": title,
                "CD_Miscellaneous": trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
                "CD_Source": CD_Source
            });

        }
    },
    
    trackSearchPageViewWithCustomDimension: function (pageNameInital, pagenameSuffix, title = pageTitle, group_id, cat_id, top_mcat, CD_Miscellaneous, CD_List_Count) {
        // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
        const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
        let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
        let gaLastDigit= true;
        let ABTEST = '';
        if(gaLastDigit){
            gaLastDigit = true;
            ABTEST = ''; 
        }
        else{
            gaLastDigit = false;
        }
        // let dprLastDigit =  ga?ga[ga.length-1]:'';
        // let dprAbtest = dprLastDigit == 3 && window.devicePixelRatio && window.devicePixelRatio >= 2 && !connectionChecking() ? '|DPR_ABTEST' : '';
        let CDmiscellaneous = '';
        let CD_Source = '';
        if (localStorage && localStorage.PDP404URL){
            let lsData = JSON.parse(localStorage.PDP404URL)
            CD_Source = lsData.previousPageURL
        }
        if (imgtm.length <= 1) {
            CDmiscellaneous =  trackAppVer(CD_Miscellaneous) + A2HSApp() + fireIMLitePVTracking('FPV') + ABTEST ;      
            imgtm.push({
                "CD_User-Mode": checkUserStatus() != 0 ? "identified" : "unidentified",
                "PV_Tracking": pageNameInital + pagenameSuffix + (indicTrack?indicTrack:'')
            });
            imgtm.push({
                "CD_Group": group_id,
                "CD_Subcat": cat_id,
                "CD_MCAT": top_mcat,
                "CD_Miscellaneous": CDmiscellaneous,
                "CD_List-Count": CD_List_Count,
                "CD_Source": CD_Source
            });

        } else {
            CDmiscellaneous =  trackAppVer(CD_Miscellaneous) + A2HSApp() + fireIMLitePVTracking() + ABTEST;
            imgtm.push({
                "event": "VirtualPageview",
                "virtualPageURL": pageNameInital + pagenameSuffix  + ABTEST,
                "virtualPageTitle": title,
                "CD_Group": group_id,
                "CD_Subcat": cat_id,
                "CD_MCAT": top_mcat,
                "CD_Miscellaneous": CDmiscellaneous,
                "CD_List-Count": CD_List_Count,
                "CD_Source": CD_Source
            });
        }
        imgtm.push({
            "CD_Miscellaneous": CDmiscellaneous
        });
        imgtm.push({
            "CD_Cust-Type-Weight": getCookieValByKey("ImeshVisitor", "cmid") ? getCookieValByKey("ImeshVisitor", "cmid") : ''
        });

        (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    },

    trackEvent: function (evArr) {
        if(window.truecallerLogin && (evArr[0] == 'EnquiryForm' || evArr[0] == 'BlForm')) {
            evArr[2] = evArr[2]+'-TruecallerLogin';
        }
        if(evArr[0] && (evArr[0].toLowerCase().includes("enquiry") || evArr[0].toLowerCase().includes('blform') || evArr[0].toLowerCase().includes('minibl'))){
            // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
            const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
            let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
            evArr[0]=evArr[0]+indicTrack;
        }
        window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": userType() + A2HSApp()}) : '';
        window.location.pathname.indexOf("/seller/") > -1 && checkremktg().length > 0 ? imgtm.push({ "CD_Additional_Data": checkremktg() + A2HSApp()}) : '';
        window.location.pathname.indexOf("/messages/") > -1 && checkUserStatus()==2  ? evArr[5] ? imgtm.push({ "CD_Additional_Data": evArr[5]}) : imgtm.push({ "CD_Additional_Data": ''}) : '';
        imgtm.push({
            'event': (evArr[4] ? 'IMEvent' : 'IMEvent-NI'),
            'eventCategory':window.navigator.userAgent.includes('IM-Android_Webview')?"webview_" + evArr[0]:evArr[0],
            'eventAction': evArr[1],
            'eventLabel': evArr[2]+(window.whatsAppBl?window.whatsAppBl:""),
            'eventValue': evArr[3],


        });
    },
    trackMiniPDP: function (displayData, langSelection) {
        // let previousPage = previousPageURL();
        
        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": "/vpv/pwa/" + pdp_url(displayData.title, displayData.displayid),
            "CD_MCAT": displayData.mcatid[0],
            "CD_Subcat": displayData.catid[0],
            "CD_Miscellaneous": "single" + '|' + langSelection + A2HSApp() + fireIMLitePVTracking(),
            // "CD_Source" : previousPage,
        });

    },


}
export const eventTracking = (a, b, c, d) => {
    // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
    const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
    let indicLangTrack = googTrans? `|Indic|${googTrans}` : IndicUsers() && c && typeof c === 'string' && c.includes("Hamburger")? `|Indic|Menu-Click`:'';
    window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": userType() + A2HSApp() , "CD_Miscellaneous":trackAppVer('')+"|CD_Viewcount="+viewcount()+ A2HSApp() +checkimEqGl()}) : '';
    imgtm.push({
        'event': (d ? 'IMEvent' : 'IMEvent-NI'), 
        'eventCategory': window.navigator.userAgent.includes('IM-Android_Webview')? "webview_" +a:a+(window.whatsAppBl?window.whatsAppBl:""),
        'eventAction': b + (indicLangTrack?indicLangTrack:''),
        'eventLabel': c,
        'eventValue': 0
    })
}

export const eventTrackingMA = (a, b, c, d) => {
    window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": userType() + A2HSApp() , "CD_Miscellaneous":trackAppVer('')+"|CD_Viewcount="+viewcount()+ A2HSApp() +checkimEqGl()}) : '';
    imgtm.push({
        'event': (d ? 'IMEvent' : 'IMEvent-NI'), 
        'eventCategory': a,
        'eventAction': b,
        'eventLabel': c,
        'eventValue': 0
    })
}

export const generateGAforPLT = (category, variable, label, value) => {
    imgtm.push(
        {
            'event': 'IMUserTiming',
            'timingCategory': category,
            'timingVar': variable,
            'timingLabel': label,
            'timingValue': value
        }
    )

}

export const trackPVforFeedbackThankyou = (pagename) => {

    if (imgtm.length <= 1) {
        let userMode = loginModes[checkUserStatus()];
        imgtm.push({
            "CD_User-Mode": userMode,
            "PV_Tracking": "/vpv" + pagename,
        });
    } else {
        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": "/vpv" + pagename,
        });
    }

    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    // window.pageURL = window.location.href;
}

export const trackPVForMcat = (data,pmcat='',prevPgName='',prevUrlMcat='',isq) =>{
    let bizName = data.bizName ? `-${(data.bizName).toLowerCase()}`:'';
    const cityName = data.cityName || data.rehitCityName || '';
    let ecomName = window.location && window.location.search && window.location.search == "?shopnow=1" ? "-ecom" : "";
    // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
    const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
    let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
    const url = cityName ? `/vpv/dir/${data.groupFlName}/${data.subcatFlName}/${data.tracking.pageType}${bizName}${ecomName}/${cityName}/${data.flName}.html${indicTrack?indicTrack:''}` : `/vpv/dir/${data.groupFlName}/${data.subcatFlName}/${data.tracking.pageType}${isq?"-isq":""}${bizName}${ecomName}/${data.flName}.html${indicTrack?indicTrack:''}`;
    let glid=getCookieValByKey('ImeshVisitor','glid')?getCookieValByKey('ImeshVisitor','glid'):'';
    let glLastDigit= glid[glid.length-1]?glid[glid.length-1]:'';
    const ImeshVisitor = getCookie('ImeshVisitor','object')
    const mcatLoginModes = { 0: 'UnIdentified', 1: 'Identified', 2: 'Identified', "null": 'UnIdentified' };
    let userMode = mcatLoginModes[checkUserStatus()];
    let isHindi = data.cityName && data.vernacularCityName  ? `|isHindi` :''
    let isBrand = data.isBrand == '1'? `|Brand` :'';
    let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
    let soiButton=(sellerIntent && sellerIntent.Intent&&checkUserStatus()==2 )?"|SOI-Button":"";
    let pixelRatio='';
        if(window.devicePixelRatio){
            pixelRatio="|dpr=" + window.devicePixelRatio;
        }
    let CDmiscellaneous = `MIM-Mcat${soiButton}|Typ-${data.mcatProd}${isBrand}${isHindi}|${data.tracking.lang}|ImpcatPWA${A2HSApp()}`; 
    // Journey trackings in CD Miscellaneous
    let prevPageName = ''
    let splitPrevUrl = prevUrlMcat ? prevUrlMcat.split('/') : "";
    if(splitPrevUrl && splitPrevUrl.includes('www.google.com')){prevPageName='|PrevPageName-Direct'}
    else if(splitPrevUrl && splitPrevUrl.includes('proddetail')){prevPageName = '|PrevPageName-PDP'}
    else if(splitPrevUrl && splitPrevUrl.includes('impcat')){prevPageName = `|PrevPageName-${pmcat}AllIndia`}
    else if(splitPrevUrl && splitPrevUrl.includes('city')){prevPageName = `|PrevPageName-${pmcat}City`}
    else if(splitPrevUrl && splitPrevUrl.includes('items')){prevPageName = '|PrevPageName-SID'}
    else if(splitPrevUrl && splitPrevUrl[splitPrevUrl.length-1].includes('isearch')){prevPageName = '|PrevPageName-Search'}
    else if(prevPgName && prevPgName.includes('Company')){prevPageName = '|PrevPageName-Company'}
    else if(prevPgName && prevPgName.includes('home')){prevPageName = '|PrevPageName-Home'} 
    let PrevPageURL = prevUrlMcat;
    PrevPageURL ? PrevPageURL = '|PrevPageURL-' + PrevPageURL : "";
    let currPageName = "";
    if(data && data.currentUrl){
      const page = data.mcatgenric_flag == "1" ? "PMCAT" : "MCAT";
      let currURLSplit = data.currentUrl ?  data.currentUrl.split('/') : currURLSplit = '';
      if(currURLSplit && currURLSplit.includes('impcat')){currPageName = page + "AllIndia"}
      else if (currURLSplit && currURLSplit.includes('city')){currPageName = page + "City"}
    }
    CDmiscellaneous += `${prevPageName}|CurrPageName-${currPageName}${PrevPageURL}${userMode!="UnIdentified" ? glLastDigit && glLastDigit%2==0 ? "|Even":"|Odd":''}`;
    
    let tracking;

    // let previousPage = previousPageURL();
    if (imgtm.length <= 1) {
        CDmiscellaneous = `${CDmiscellaneous}${fireIMLitePVTracking('FPV')}`;
        tracking = { 
            "CD_User-Mode": userMode,
            "PV_Tracking": url,
            "CD_Miscellaneous": CDmiscellaneous+pixelRatio,
            "CD_MCAT" : data.mcatId,
            "CD_Subcat" : data.catId,
            // "CD_Source" : previousPage,
        }
    } else {
        CDmiscellaneous = `${CDmiscellaneous}${fireIMLitePVTracking()}`;
        tracking = { 
            "event": "VirtualPageview",
            "virtualPageURL": url,
            "CD_User-Mode": userMode,
            "CD_Miscellaneous": CDmiscellaneous+pixelRatio,
            "CD_MCAT" : data.mcatId,
            "CD_Subcat" : data.catId,
            // "CD_Source" : previousPage,
        }
    }


    if(ImeshVisitor){
        if(ImeshVisitor.glid)
        tracking['CD_Gl-User-ID'] = ImeshVisitor.glid;
        if(ImeshVisitor.cmid)
        tracking['CD_Cust-Type-Weight']=ImeshVisitor.cmid;
        if(ImeshVisitor.utyp)
        tracking['CD_User-Type'] = ImeshVisitor.utyp;

        let userDetails = '';
        
        let mverified = ImeshVisitor.uv ? 'Verified':'UnVerified';
        let name = ImeshVisitor.fn ? 'Name':'_';
        let email = ImeshVisitor.em ? 'Email' : '_';
        let city = ImeshVisitor.ctid ? 'City' : '_';
        let eVerified = ImeshVisitor.ev ? 'EV' :'_'; 
        let GeoLoc = getCookie('iploc') && getCookie('iploc').includes("GeoLoc_lt") ? 'GeoLoc' : '_';
        userDetails = `${mverified}|${name}|${email}|${city}|${eVerified}|${GeoLoc}`
        if(userDetails)
        tracking['CD_User-Details'] = userDetails;
        tracking['CD_Verification-Status'] = mverified;
    }

    // if(data.groupId){
    //     tracking['CD_Group'] = data.groupId;
    // }
    
    imgtm.push(tracking);

    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
// window.pageURL = window.location.href;
}


export const trackPVforMiniPDP = (pagename) => {
    // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
    const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
    let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
    if (imgtm.length <= 1) {
        let userMode=loginModes[checkUserStatus()];
        imgtm.push({
            "CD_Miscellaneous":  trackAppVer('') + A2HSApp() + fireIMLitePVTracking() ,
            "CD_User-Mode": userMode,
            "PV_Tracking": "/vpv" + pagename + (indicTrack?indicTrack:''),
            // "CD_Source":previousPage,
        });
    } else {
        imgtm.push({
            "CD_Miscellaneous":  trackAppVer('') + A2HSApp() + fireIMLitePVTracking(),
            "event": "VirtualPageview",
            "virtualPageURL": "/vpv" + pagename,
            // "CD_Source":previousPage,


        });
    }
    
    
    
    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    // window.pageURL = window.location.href;
}


export const trackPVForPDP = (url, mcatId, data, langSelection,  prevPageURL='', ABTestId='', prevPgName='', isImgEdge='', cABTestPDP='',getIsqVrntPVTrck='', imageParams='') => {
    prevPgName? prevPgName= prevPgName.toLowerCase():'';
    let glid=getCookieValByKey('ImeshVisitor','glid')
    // const googTrans = getCookie("googtrans") && getCookie("googtrans").split("/") && getCookie("googtrans").split("/")[2] ? getCookie("googtrans").split("/")[2] : '';
    const googTrans = localStorage.getItem("IndicLang") ? localStorage.getItem("IndicLang") : '';
    let indicTrack = IndicUsers()?`/Indic/${googTrans?googTrans:''}`:'';
    let chatOverLay=checkUserStatus()==2 && ((glid%10==0)||(glid%10==2)) ?"|ChatWithSellerOverlayScreen":'';
    let docTitle = data.ITEM_DOCS&&data.ITEM_DOCS.pc_item_doc_title? data.ITEM_DOCS.pc_item_doc_title:'';
    let itemImg = data.ITEM_IMG;
    let glUsrId = data? data.GLUSR_USR_ID?'|SELLER_GLID:'+data.GLUSR_USR_ID:'':'';
    let CDmiscellaneous='';
    let hindiNameVal='', isEcom='', isPrice='', isPrdtOrSrvc='', isPDF='', isUserMode='';
    if(data && data.PC_ITEM_HINDI_NAME !=''){hindiNameVal = '|hindi-name';}
    if(data && data.PC_ITEM_IS_ECOM == 1){isEcom = '_ECOM ';}
    if(data && data.PRODUCT_PRICE){isPrice = '|HasPrice';}
    if(data && data.DOC_PATH){isPDF = '|HasPDF';}
    if(data && data.IS_PROD_SERV){data.IS_PROD_SERV == 'P'? isPrdtOrSrvc='|IsProduct':isPrdtOrSrvc='|IsService';}
    let checkUsrState =checkUserStatus();
    if(checkUsrState == 0 ){isUserMode='|Mode-UNIDENTIFIED'}
    else if(checkUsrState == 1 ){isUserMode='|Mode-IDENTIFIED'}
    else if(checkUsrState == 2 ){isUserMode='|Mode-LOGGEDIN'}
    let imgImp = data && (!data.GLCAT_MCAT_IMAGE_DISPLAY || data.GLCAT_MCAT_IMAGE_DISPLAY!="1") ? "|IMG_DISPLAY:IMP" : "|IMG_DISPLAY:N_IMP";
    let CDsubcat = data.CAT_ID;
    let langSelected = '|'+langSelection;
    let selrCustWgt = data.GLUSR_USR_CUSTTYPE_WEIGHT?selrCustWgt= data.GLUSR_USR_CUSTTYPE_WEIGHT: selrCustWgt= '';
    let isRatingDetails = (data && data.RATING_DETAILS && data.RATING_DETAILS.length!=0)?'|HasRating':'';
    let buyrCustWgt = getCookieValByKey("ImeshVisitor", "cmid");
    if(buyrCustWgt && buyrCustWgt != undefined){buyrCustWgt= 'BUYER:'+buyrCustWgt+'|'}else{buyrCustWgt= 'BUYER:Null|'}
    
    let statusAprvl = data.PC_ITEM_STATUS_APPROVAL ? statusAprvl= '|STATUS:' + data.PC_ITEM_STATUS_APPROVAL :statusAprvl = '';
    let splitPrevUrl = prevPageURL? prevPageURL.split('/'):splitPrevUrl='';
    let prevPageName ='';
    if(splitPrevUrl && splitPrevUrl.includes('proddetail')){prevPageName = '|PrevPageName-PDP'}
    else if(splitPrevUrl && splitPrevUrl.includes('impcat')){prevPageName = '|PrevPageName-MCATAllIndia'}
    else if(splitPrevUrl && splitPrevUrl.includes('city')){prevPageName = '|PrevPageName-MCATCity'}
    else if(splitPrevUrl && splitPrevUrl.includes('items')){prevPageName = '|PrevPageName-SID'}
    else if(prevPgName && prevPgName.includes('search')){prevPageName = '|PrevPageName-Search'}
    else if(prevPgName && prevPgName.includes('company')){prevPageName = '|PrevPageName-Company'}
    else if(prevPgName && prevPgName.includes('home')){prevPageName = '|PrevPageName-Home'}
    
    let PrevPageURL = prevPageURL;
    PrevPageURL ? PrevPageURL = '|PrevPageURL-' + PrevPageURL : '';
    let CD_Source= prevPageName&&prevPageName=='|PrevPageName-Search'?prevPageURL:'';
    let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
    let soiButton=(sellerIntent && sellerIntent.Intent&&checkUserStatus()==2 )?"|SOI-Button":"";

    let isFromImgEdge= isImgEdge? '|E2EProcessed':'';
    if((docTitle != '') && ((docTitle == "Product Video")||(docTitle == "VIDEO")) && (itemImg&&itemImg.length != 0)){
        CDmiscellaneous= 'MutlipleImageWithVideo'+ hindiNameVal + langSelected;}
    else if(itemImg&&itemImg.length != 0){
        CDmiscellaneous= 'MutipleImage'+ hindiNameVal + langSelected;}
    else if(docTitle == "Product Video" || docTitle == 'VIDEO'){
        CDmiscellaneous= 'SingleImageWithVideo'+ hindiNameVal + langSelected;}
    else if(itemImg&&itemImg.length == 0){
        CDmiscellaneous= 'SingleImage'+ hindiNameVal + langSelected;}
    if(window.TestIdArr && window.TestIdArr.length>0) {
        CDmiscellaneous+="|"+window.TestIdArr.join("|")
    }
    CDmiscellaneous+="|"+imageParams+imgImp;
    let glcatMcatList = data["PC_ITEM_GLCAT_MCAT_ID_LIST"] ? data["PC_ITEM_GLCAT_MCAT_ID_LIST"].split(",") : [];
    let nonEmptyMcatList = glcatMcatList.filter(item => {
        if(item && (/\S/.test(item))) {
            return item;
        }
    });
    if(!data["BRD_MCAT_ID"] && !nonEmptyMcatList[0]) {
        CDmiscellaneous+="|NoMCATMapping"
    }
    let isWhatsapp = data && data.WHATSAPP_INFO && data.WHATSAPP_INFO.ENABLED=="1" && data.WHATSAPP_INFO.PHONE_NO ? "|HasWhatsapp": "";
        CDmiscellaneous+='|PDP'+ isEcom+ statusAprvl+`${soiButton}` + isRatingDetails+isPrice+isPDF+isPrdtOrSrvc+prevPageName+isUserMode +isFromImgEdge+chatOverLay+cABTestPDP +glUsrId+ getIsqVrntPVTrck+isWhatsapp+(window.whatsAppBl?window.whatsAppBl:"");
        let pixelRatio='';
        if(window.devicePixelRatio){
            pixelRatio="|dpr=" + window.devicePixelRatio;
        }
        CDmiscellaneous = CDmiscellaneous + "|" +  trackAppVer('')+ "|"  + A2HSApp() + PrevPageURL+(ABTestId? "|"+ABTestId : "")+pixelRatio;
        window.cd_miscellaneous = CDmiscellaneous;
    if (imgtm.length <= 1) {
        let userMode=loginModes[checkUserStatus()];
        imgtm.push({
            "CD_User-Mode": userMode,
            "PV_Tracking": "/vpv/pwa" + url +cABTestPDP + (indicTrack?indicTrack:''),
            "CD_Miscellaneous": CDmiscellaneous + fireIMLitePVTracking('FPV'),
            // "CD_Source":previousPage,
        });
    } else {
        imgtm.push({
            "event": "VirtualPageview",
            "virtualPageURL": "/vpv/pwa" + url +cABTestPDP ,
            "CD_Miscellaneous": CDmiscellaneous  + fireIMLitePVTracking(),
            // "CD_Source":previousPage,


        });
    }

    
    imgtm.push({
        "CD_MCAT": mcatId ? mcatId : '',
        "CD_Subcat": CDsubcat ? CDsubcat : '',
        "CD_Source":CD_Source?CD_Source:'',
        "CD_Cust-Type-Weight": selrCustWgt,
        "CD_Additional_Data": data.PC_ITEM_STATUS_APPROVAL ? data.PC_ITEM_STATUS_APPROVAL : ''
    });

    
    
    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    // window.pageURL = window.location.href;
}
export const eventTrackingCD = (a, b, c, d, e, f) => {
    window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": userType() + A2HSApp()}) : '';
    imgtm.push({
        'event': (e ? 'IMEvent' : 'IMEvent-NI'), 
        'eventCategory': a,
        'eventAction': b,
        'eventLabel': c,
        'eventValue': d,
        'CD_Miscellaneous': f
    })
}