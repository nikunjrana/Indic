
import {gaTrack} from './GaTracking';

export const connectionChecking=()=> {
    if (navigator && navigator.connection && navigator.connection.effectiveType) {
      const connectionType = navigator.onLine
        ? navigator.connection.effectiveType
        : 'offline';
      if (/\slow-2g|2g/.test(connectionType)) {
        return true;
      }
      return false;
    }
    return false;
  }

  export const a2hsInstall=(a2hsins,showA2hsIcon,pos)=> {
    if (showA2hsIcon) {
      window.a2hsAddTouchPoint = pos + ' | ' + window.pageName;
      gaTrack.trackEvent(['Custom_A2HS','A2HS_clicked', window.a2hsAddTouchPoint ,0,'IMEvent']);
      deferredPromptA2hs.prompt();
      deferredPromptA2hs.userChoice
          .then(function (choiceResult) {
              if (choiceResult.outcome === 'accepted') {
                  gaTrack.trackEvent(['Custom_A2HS','A2HS_add', window.a2hsAddTouchPoint ,0,'IMEvent']);
              } else {
                  gaTrack.trackEvent(['Custom_A2HS','A2HS_cancel', window.a2hsAddTouchPoint ,0,'IMEvent']);
              }
          })
  }
  else {
    a2hsins(true);
  }
    
}
export const connectionChecking4g=()=> {
  if (navigator && navigator.connection && navigator.connection.effectiveType) {
      const connectionType = navigator.onLine
          ? navigator.connection.effectiveType
          : 'offline';
      //    console.log(connectionType);
      if (/\slow-2g|2g|slow-3g|3g/.test(connectionType)) {
          return true;
      }
      return false;
  }
  return false;
}
