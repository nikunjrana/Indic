import {getCLS,getFCP,getFID,getLCP,onINP, onTTFB} from 'web-vitals';
import { eventTracking } from './Globals/GaTracking';

export function PerformaceTracker() {
    let path=location.pathname;
    let pageUrl=window.location.href?window.location.href:'';
    let splitPageUrl = pageUrl? pageUrl.split('/'):'';
    let displayId = splitPageUrl && splitPageUrl.includes('proddetail') ? parseDisplayID(path) :'';
    let connectionType;
    if (navigator.connection && navigator.connection.effectiveType) {
        connectionType = navigator.onLine ? navigator.connection.effectiveType : 'offline';
    }

    function webvitals(entry){
       eventTracking('Real_User_monitoring',entry.name+'|'+'PDP'+'|'+displayId+'|'+connectionType,(Math.floor(entry.value)),false)
        import(/* webpackChunkName:"Yandex"*/"./Globals/yandexTracking").then(module=>{
            const paramlValue=(Math.floor(entry.value)).toString();
            module.yandexTrackingMultiLevel('Real_User_monitor',entry.name+'|'+'PDP'+'|'+displayId,paramlValue)});
      }
      function parseDisplayID(path) {
        path = path.split('/')[2].split('.html')[0].split('-');
        let dispID = path[path.length - 1];
        if (Number(dispID)) {
            return dispID;
        }
        else //Invalid URL
        {
            return false
        }
    }
    function ttfbTracking(entry) {
        import(/* webpackChunkName:"Yandex"*/"./Globals/yandexTracking").then(module => {
            const paramlValue = (Math.floor(entry.value)).toString();
            module.yandexTrackingMultiLevel('Real_User_monitor_TTFB', entry.name + '|' + 'PDP' + '|' + displayId, paramlValue)
        });
    }
      
    if(splitPageUrl && splitPageUrl.includes('proddetail') && displayId && displayId % 10 == 2)
        {
        getLCP(webvitals);
        getFCP(webvitals);
        getCLS(webvitals);
        getFID(webvitals);
        onINP(webvitals);
        }
    
}
