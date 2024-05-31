import {gaTrack} from "./GaTracking";
import { yandexTrackingMultiLevel } from "./yandexTracking";
export const impressionTrack = (div_id, category, action, label, time,isReturn,isyandex=false) => {
    let remove = false;
    if (typeof (time) == 'undefined'|| time == '') {
        time = 3000;
    }
    let tracker = function (event) {
        let item = document.getElementById(div_id);
        let margin = 200;
        if (item) {
            let bound = item.getBoundingClientRect();
            if (bound.top < (window.innerHeight - margin) && bound.top > (-1 * (bound.height - margin))) {
                setTimeout(function () {
                    bound = item.getBoundingClientRect();
                    if (bound.top < (window.innerHeight - margin) && bound.top > (-1 * (bound.height - margin)) && !remove) {
                        removed(); remove = true;
                        if(isyandex){
                            // ym(idYandex, "params", {
                            //     category: "Total Views"
                            // }); 
                            yandexTrackingMultiLevel([category], [label])
                        }
                        else {
                            gaTrack.trackEvent([category, action, label, 0, false]);
                        }
                    }
                }, time)
            }
        }
    };
    window.addEventListener("scroll", tracker, {passive:true});
    function removed() {
        window.removeEventListener('scroll', tracker, false)
    }
    if(isReturn){
        return tracker;
    }

}