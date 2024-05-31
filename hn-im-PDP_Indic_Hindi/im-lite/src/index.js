
import React from 'react';
import {hydrate, render } from 'react-dom'
import { getRoutes } from './router/routes';
import Provider from 'react-redux/lib/components/Provider';
import { imStore } from './store/imStore';
import { updateMainJS } from './Globals/versionHandler';
import { isBot } from './Globals/MainFunctions';
import helper from './modules/Header/helper'; // Pls don't remove, it's imp line
import {getCookie,deleteCookie,getCookieValByKey} from '../src/Globals/CookieManager';
// import 'react-app-polyfill/stable';
// import {PerformaceTracker} from './performance';
import glidArr from '../server/GlidsForIndic';
// import {getscript} from './modules/Menu/Components/GoogleTranslate';


let local = JSON.parse(localStorage.getItem("webPSupport"));
let webPCookie = getCookie('webPSupport');
if(webPCookie) deleteCookie('webPSupport');
function checkWebPSupport(){
      var webp = new Image();
      webp.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';  
      
      webp.onerror = function(){
          webPHandling(false);        
      };
      webp.onload = function(){
          webPHandling(true);
      }; 
      window.addEventListener('appinstalled', function () {
        let now = new Date();
        localStorage.a2hsInstallTime = now.getTime();
        let pageName = window.pageName;
        imgtm.push({
            'event': 'IMEvent',
            'eventCategory': 'Custom_A2HS',
            'eventAction': 'A2HS_installed',
            'eventLabel': window.a2hsAddTouchPoint ? window.a2hsAddTouchPoint : ('mini-info-bar/settings' + (typeof pageName != "undefined" ? ' | ' + pageName : ""))
        });
    })
    }
    function webPHandling(val){
      local['val'] = val;
      localStorage.setItem("webPSupport", JSON.stringify(local));
    }

    if (!(local == null || local == 'undefined')) {
          localStorage.removeItem("webPSupport");
    }
    local={};
    checkWebPSupport();

if (!window._NEW_ROUTE_VERSION || window._NEW_ROUTE_VERSION <= 800) {
  window.location.reload(true);
}

// if (process.NODE_ENV && !isBot() && (navigator.userAgent.indexOf(' UCBrowser/') == -1) && 'serviceWorker' in navigator) {

//   navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
//     navigator.serviceWorker.addEventListener('message', function (event) {
//       try {
//         var crntAppUrl = event.data.main_min;
//         if (crntAppUrl !== window._MAIN_JS_VERSION && !window._NEED_UPDATE) {
//           updateMainJS(crntAppUrl);
//         }
//       } catch (error) { }
//     });
//   }).catch(function (error) {
//   });
// }
let glid = getCookieValByKey('ImeshVisitor', 'glid') ? getCookieValByKey('ImeshVisitor', 'glid') : '';
let gaid=getCookie("_ga")?getCookie('_ga'):'';
let lastgadigit= gaid && gaid.length && gaid[gaid.length-1]?gaid[gaid.length-1]:'';
let lastDigitArr = ["1","2","3","4","5"];
var isGlid = (glid && glidArr && glidArr.includes(glid)) || (lastgadigit && lastDigitArr && lastDigitArr.includes(lastgadigit)) ? true : false;

if(isGlid) {
  getCookieValByKey('googtrans') ? "":window.googleTranslateElementInit ? "":''}

// PerformaceTracker();
// try{
// const Sentry=require('@sentry/react')
// const Tracing=require('@sentry/tracing')

//   Sentry.init({
//   dsn: "https://6f63ae70acca4086bda3518de25a6793@o4504914283397120.ingest.sentry.io/4504914286018560",
//   integrations: [new Tracing.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });
// } catch(error)
// {
//   console.log("Sentry")
// }
//myUndefinedFunction();
if(window.pdpLcpNew) {
  import(/* webpackChunkName: "productDetailPage2" */ "../src/modules/ProductDetail/components/Views").then((module) =>{
    window.PDPdiv=module.default;
    hydrate(<Provider store={imStore}>{getRoutes()}</Provider>, document.getElementById("root"))
  })
}
else if(window.isMcatLcpNew) {
  import(/* webpackChunkName: "mcatPageNew" */ "./modules/MCATNEW/Page").then((module)=>{
    window.MCATdiv=module.default;
    hydrate(<Provider store={imStore}>{getRoutes()}</Provider>, document.getElementById("root"))
  })
}
else {
  render(
    <Provider store={imStore}>
      {getRoutes()}
    </Provider>,
    document.getElementById("root")
  ); 
}
