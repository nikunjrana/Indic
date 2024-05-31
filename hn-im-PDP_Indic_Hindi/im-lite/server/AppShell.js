function shellCSS() {
  return `<style>
  body .VIpgJd-ZVi9od-ORHb-OEVmcd{display:none;}.srchIcn {margin-top: 8px;position: absolute;left: 11px;background-image: url(https://m.imimg.com/gifs/img/searchIcon.svg);background-repeat: no-repeat;height: 18px;width: 18px;}.Menu_icon {background-repeat: no-repeat;height: 21px;left: 5px;top: 15px;width: 23px;}#goog-gt-tt{display: none !important;}body{top: 0px !important;}.pdl75{padding-left:75px}body{font-family:Arial,Helvetica,sans-serif;margin:0 auto;color:#333;font-size:14px;-webkit-text-size-adjust:none;text-size-adjust:none;vertical-align:middle}a,a:active,a:focus,a:hover{text-decoration:none}table{border-spacing:0;border-collapse:collapse;}.w100{width:100%}.ht50{height:50px}.bgmim{background-color:#00a699}.pdl7{padding-left:7px}.pdr7{padding-right:7px}.pdt10{padding-top:10px}.pd15{padding:15px}.l0{left:0}.r0{right:0}.b0{bottom:0}.t0{top:0}.poa{position:absolute}.pf{position:fixed}.dn{display:none}.dib{display:inline-block}.dtc{display:table-cell}.ma{margin:auto}.tc{text-align:center}.googleDiv{top: 102px;left: 47px;z-index: 9999999}.fw{font-weight:700}.fs12{font-size:12px;}.crb{clear:both}.bgw{background-color:#fff}.clr7B{color:#000}.brdR7b{border-right:1px solid #7b7b7b}.vam{vertical-align:middle}.tbSp{background-image:url(https://m.imimg.com/gifs/img/pwa-HS2.png);background-repeat:no-repeat}.IMlogo{width:130px;height:26px;background-size: 100%;background-position:0 -16px;margin:auto;top:7px}.mSpinnerP{width:70px;height:70px;display:inline-block;overflow:hidden;background:transparent}.centerAlign{position:fixed;z-index:9999;top:0;bottom:0;left:0;right:0;bottom:0;margin:auto}@keyframes mSpinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.mSpinner div{box-sizing:border-box!important}.mSpinner>div{position:absolute;width:68px;height:68px;top:16px;left:16px;border-radius:50%;border:4px solid #000;border-color:#ededed transparent #ededed transparent;animation:mSpinner 1s linear infinite}.mSpinner>div:nth-child(2),.mSpinner>div:nth-child(4){width:58px;height:58px;top:21px;left:21px;animation:mSpinner 1s linear infinite reverse}.mSpinner>div:nth-child(2){border-color:transparent #009688 transparent #009688}.mSpinner{width:100%;height:100%;position:relative;transform:translateZ(0) scale(.7);backface-visibility:hidden;transform-origin:0 0}.mSpinner div{box-sizing:content-box}.offlinepop{box-sizing:border-box;box-shadow:0 2px 4px 0 #000;bottom:45px;left:0;width:100%;font-size:14px;padding:0 10px;transform:translateY(100%);z-index:1000;background:#323232;color:#f1f1f1}.slownetpop{box-sizing:border-box;box-shadow:0 2px 4px 0 #000;bottom:45px;left:0;width:100%;font-size:14px;padding:0 10px;transform:translateY(100%);z-index:1000;background:#323232;color:#f1f1f1}.brdL7b {border-left: 1px solid #7b7b7b;}@media only screen and (min-width: 1024px) {body{max-width:500px;margin:0 auto;position:relative;}}.Tcontainer{background-color: #eee;padding: 5px;border-radius: 5px;width: 150px;text-align: center;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;z-index: 9999;position: fixed;top: 88%;left: 30%;font-size: 16px;font-weight: bold;}.Tdot {display: inline-block;width: 8px;height: 8px;border-radius: 50%;background-color: #00a699;margin-left: 5px}.Tcontainer .Tdot:nth-last-child(1) {animation: jumpingAnimation 1.2s 0.4s linear infinite;}.Tcontainer .Tdot:nth-last-child(2) {animation: jumpingAnimation 1.2s 0.2s linear infinite;}.Tcontainer .Tdot:nth-last-child(3) {animation: jumpingAnimation 1.2s 0s linear infinite;}
  .wh30 {width: 30px;height: 30px;}.fbIco {background-position: -79px -51px;}.twIco {background-image: url(https://m.imimg.com/gifs/img/X_logo.svg);background-size: contain;background-repeat: no-repeat;}.gpIco {background-position: 0 -51px;}.mb60{margin-bottom: 60px;}.linkInIco{background-position: -2px -188px;}
}
</style>`;
}

function shellJS(state) {
return `${state ? 'window.__INITIAL_STATE__ = ' + JSON.stringify(state) + ';' : ''}
function scriptsLoader(){ handleMainJS();removeOldLS(); }
window.addEventListener('load',(event)=>{ scriptsLoader();});`}
function shellHeader() {
 return (`<header id="imPWAHeader" class="w100 bgmim ht50" ><div id="menuIcon"></div>
 <a href="/" aria-label="indiamartlogo" id="logoIMart" class="tbSp IMlogo l0 r0 poa"></a>
 </header>`);}
function shellFooter() {
  return (`<div><div id="footerIM" class="crb tc fs12 bgw pd10 mb60 "><div></div><div class='footerdesk'><a href="https://corporate.indiamart.com/about-us/" class="dib clr7B brdR7b pdl7 pdr7" id="about_url"> IndiaMART के बारे में </a><a href="https://help.indiamart.com" class="dib clr7B pdl7 pdr7" id="cc_url">ग्राहक सेवा</a><a class="dib clr7B brdL7b pdl7 pdr7" rel="nofollow" id="homepage" href="https://hindi.indiamart.com/">होम पेज</a><div class="pdt10 tc"><a aria-label="facebook" href="https://www.facebook.com/IndiaMART" target="_blank" rel="noreferrer" class="ml10 dib"><i class="dib fbIco wh30" style="background-image: url(&quot;https://m.imimg.com/gifs/img/HFsprite_v010.webp&quot;); background-repeat: no-repeat;"></i></a><a aria-label="Twitter" href="https://twitter.com/IndiaMART" rel="noreferrer" target="_blank" class="dib"><i class="dib twIco wh30"></i></a><a aria-label="LinkedIn" href="https://www.linkedin.com/company/indiamart-intermesh-limited/" rel="noreferrer" target="_blank" class="dib"><i class="dib linkInIco wh30" style="background-image: url(&quot;https://m.imimg.com/gifs/img/HFsprite_v010.webp&quot;); background-repeat: no-repeat;"></i></a></div></div><div class="pdt10 fs12 tc"><p class="copirightText clr7B cp-rt dib ml286"><span>©</span>1996-2024 IndiaMART.com</p></div></div></div>`);
}
function shellLoader() {
  return (
    `<div id="gblLoader"style="display:block" class="mSpinnerP centerAlign">  <div class="mSpinner"> <div></div><div></div></div></div>`
  )
}

function appJSRequestHandler() {
  var versionData = require("./JSVersionManager/handler").getVersions();
  return `function removeOldLS(){
  if(localStorage && localStorage.getItem('allVersions'))
  {localStorage.removeItem('allVersions');}}
function setVersionLS()
{
  if(localStorage)
  {
    let time = new Date().getTime();
    let verData = ${JSON.stringify(versionData)};
    localStorage.setItem('versionsTime',time);
    localStorage.setItem('appJSVersions',JSON.stringify(verData));
  }
}
function handleMainJS()
{
  window._MAIN_JS_VERSION = '';
  window._NEW_ROUTE_VERSION = ${versionData['newRouteVersion']};
  if(localStorage && localStorage.getItem('appJSVersions'))
  {
    window._MAIN_JS_VERSION = JSON.parse(localStorage.getItem('appJSVersions'))['appUrl']
    window._MAIN_JS_NUMBER = Number(window._MAIN_JS_VERSION.split('/')[2].split('_')[1].split('.')[0]);
    if(window._NEW_ROUTE_VERSION>window._MAIN_JS_NUMBER)//update LS
    {
      window._MAIN_JS_VERSION = "${versionData['appUrl']}";
      attachAppJS();
      setVersionLS();
    }
    else if(window._NEW_ROUTE_VERSION<window._MAIN_JS_NUMBER){
      window._MAIN_JS_VERSION = "https://hindi.indiamart.com/pwagifs/main-min_" + window._NEW_ROUTE_VERSION + ".js";
      attachAppJS();
    }
    else
    {
    attachAppJS();
    }
  }
  else
  {
    window._MAIN_JS_VERSION = "${versionData['appUrl']}";
    attachAppJS();
    setVersionLS();
  }
}
function attachAppJS() {
  let main_min = document.createElement('script');
  main_min.src = window._MAIN_JS_VERSION;
  document.body.appendChild(main_min);
}
window._NEED_UPDATE = false
`
}
function shell(APP_SHELL_STRUCTURE) {
let ssrChecks = (APP_SHELL_STRUCTURE.IS_PDP_LCP ||APP_SHELL_STRUCTURE.IMPCAT_LCP || APP_SHELL_STRUCTURE.CITYINDEX_LCP );
return `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html">
    <meta name="referrer" content="always" />
    <link rel="preload" as="image" href="https://m.imimg.com/gifs/img/pwa-HS2.png">
    <link href="https://m.imimg.com/gifs/im2-192.png" rel="icon" sizes="192x192">
   ${process.env.NODE_ENV_M ? require('./GblComFunc').shellToken[process.env.NODE_ENV_M] : ''}
    ${APP_SHELL_STRUCTURE.PRE_CONNECTS}
    ${APP_SHELL_STRUCTURE.TITLE}
    ${APP_SHELL_STRUCTURE.META}
      ${APP_SHELL_STRUCTURE.CANONICAL_LINKS}
      ${APP_SHELL_STRUCTURE.METAOGTAGS}
     ${APP_SHELL_STRUCTURE.HEAD_SCRIPTS}
    <meta name="theme-color" content="#00a699">
     ${shellCSS()}
     ${APP_SHELL_STRUCTURE.CSS}
      </head>
      <body>
${(APP_SHELL_STRUCTURE.Is_Web_App && (APP_SHELL_STRUCTURE.Is_Web_App.includes('IM-Android_Webview') || APP_SHELL_STRUCTURE.Is_Web_App.includes('IM-IOS-WebView'))) ? '' : shellHeader()}
${APP_SHELL_STRUCTURE.updatePDPHeader ? APP_SHELL_STRUCTURE.updatePDPHeader : ''}
${APP_SHELL_STRUCTURE.searchHeader ? APP_SHELL_STRUCTURE.searchHeader : ''}
<input type="hidden" id="page_name" value="">
<div id="root">${(APP_SHELL_STRUCTURE.IS_PDP_LCP_NEW || APP_SHELL_STRUCTURE.IS_SHIPPING_POLICY_LCP || APP_SHELL_STRUCTURE.IS_REFUND_CANCELLATION_POLICY_LCP || APP_SHELL_STRUCTURE.IS_PRIVACY_POLICY_LCP || APP_SHELL_STRUCTURE.IS_TERMS_ANS_CONDITIONS_LCP) && APP_SHELL_STRUCTURE.displayLcpDiv ? APP_SHELL_STRUCTURE.displayLcpDiv : APP_SHELL_STRUCTURE.IS_MCAT_LCP_NEW ? APP_SHELL_STRUCTURE.IS_MCAT_LCP_NEW : ""}
</div>
${APP_SHELL_STRUCTURE.IS_MCAT_LCP ? APP_SHELL_STRUCTURE.IS_MCAT_LCP : ""}
${ssrChecks || (APP_SHELL_STRUCTURE.Is_Web_App && (APP_SHELL_STRUCTURE.Is_Web_App.includes('IM-Android_Webview') || APP_SHELL_STRUCTURE.Is_Web_App.includes('IM-IOS-WebView'))) && APP_SHELL_STRUCTURE.displayLcpDiv ? APP_SHELL_STRUCTURE.displayLcpDiv : APP_SHELL_STRUCTURE.IS_PDP_LCP_NEW ? "" : (APP_SHELL_STRUCTURE.IS_MCAT_LCP_NEW || APP_SHELL_STRUCTURE.IS_SHIPPING_POLICY_LCP || APP_SHELL_STRUCTURE.IS_REFUND_CANCELLATION_POLICY_LCP || APP_SHELL_STRUCTURE.IS_PRIVACY_POLICY_LCP || APP_SHELL_STRUCTURE.IS_TERMS_ANS_CONDITIONS_LCP) ? "" : shellLoader()}
${shellFooter()}
  <script>
  ${appJSRequestHandler()}
  ${APP_SHELL_STRUCTURE.BODY_SCRIPTS}
  ${shellJS(APP_SHELL_STRUCTURE.STATE)}   
  </script>
  ${APP_SHELL_STRUCTURE.ORG_SCHEMA}
  </body>
  </html>`

}
function pageResponse(res, appShell) {
  res.status(appShell.STATUS).send(shell(appShell));
}

module.exports = pageResponse;
