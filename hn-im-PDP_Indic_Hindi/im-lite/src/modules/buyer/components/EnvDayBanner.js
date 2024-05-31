import React from 'react';
import { memo } from 'preact/compat';

const BannerContent = () =>{
    return <div className="tc w100 ht180"  onClick={clickHandler}>
        <img src="https://m.imimg.com/gifs/img/worldEnvDayBanner.jpg" className="w100 ht180" />
        </div>
}
export const EnvDayBanner = memo(BannerContent);

const clickHandler = () => {
    yandexTracking();
    setTimeout(()=>{
        location.href = "http://wccb.gov.in/?utm_source=IndiaMART&utm_medium=banner&utm_campaign=World_Environment_Day_2020";
    },400) 

}

const yandexTracking = () =>{
    if (typeof ym != 'function') {
        (function (b, o, j, n, h, g, f) {
            b[h] = b[h] || function () {
                (b[h].a = b[h].a || []).push(arguments)
            }
            ;
            b[h].l = 1 * new Date();
            g = o.createElement(j),
                    f = o.getElementsByTagName(j)[0],
                    g.async = 1,
                    g.src = n,
                    f.parentNode.insertBefore(g, f)
        }
        )(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(49148410, "init", {
            id: 49148410,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        });
    }
    window.yaParams = {
        wildlife_banner_home: 'wildlife_banner_clicks'
    };
    ym(49148410, "params", window.yaParams || {});
}