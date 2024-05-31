export const trackpv=(pagename)=>{
    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    imgtm.push({
    "CD_User-Mode": "unidentified",
    "PV_Tracking": "/vpv/" +pagename,
    "CD_Miscellaneous":pagename,
});
}
export const eventTracking = (a, b, c, d) => {
    (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
    window.location.pathname == "/" ? imgtm.push({ "CD_Additional_Data": '', "CD_Miscellaneous":''}) : '';
    imgtm.push({
        'event': (d ? 'IMEvent' : 'IMEvent-NI'), 
        'eventCategory': a,
        'eventAction': b,
        'eventLabel': c,
        'eventValue': 0
    })

}