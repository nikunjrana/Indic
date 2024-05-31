
export const yandexTrackingMultiLevel = (val1, val2, val3,val4,val5) =>{
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
        [val1]: val3? ({[val2]:
            (val4?({[val3]:(val5?({[val4]:val5}):(val4))}):(val3))
        }):val2
    };
    ym(49148410, "params", window.yaParams || {});
}