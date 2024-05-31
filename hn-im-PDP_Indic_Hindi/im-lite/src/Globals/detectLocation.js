import {eventTracking} from './GaTracking';
import {getCookie, setCookie} from './CookieManager';
export const detectLocation = (geoLocState, source = 'search',interaction = true) => {

    if (navigator && navigator.geolocation) {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state == 'granted') {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log('Geolocation permissions granted');
                        console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                        eventTracking('GEOLOCATION', 'Geolocation Allow', source, interaction)

                        let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) +"|createdate="+ new Date().getTime()
                        // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) +"|createdate="+ new Date().getTime(), 3)
                        let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                        if(iplocCookie.includes("|GeoLoc_"))
                        iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                        setCookie('iploc', iplocCookie + geolocParams, 0.125);

                        geoLocState(result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                    }, function (error) {
                        console.log('Geolocation Error-' + error.message)
                        eventTracking('GEOLOCATION', 'Geolocation Block', source, interaction)
                        eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                        setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                        geoLocState("denied");
                    }
                    );
                }
                else if (result.state == 'denied') {
                    console.log("Unable to detect location");
                    eventTracking('GEOLOCATION', 'Geolocation Block', source, interaction);
                    geoLocState(result.state);
                }
                else if (result.state == 'prompt') {
                    console.log('Geolocation permissions asked again');
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log('Geolocation permissions granted');
                        console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                        eventTracking('GEOLOCATION', 'Geolocation Allow', source, interaction)
        
                        let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                        // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 1)
                        let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                        if(iplocCookie.includes("|GeoLoc_"))
                        iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                        setCookie('iploc', iplocCookie + geolocParams, 0.125);
        
                        geoLocState("granted", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                    }
                        , function (error) {
                            console.log('Geolocation Error-' + error.message)
                            console.log('Phone location settings disabled. Please allow.');
                            eventTracking('GEOLOCATION', 'Geolocation Block', source, interaction);
                            geoLocState("denied-phone");
                        }
                    );
                    result.onchange = function () {
                        if (this.state == 'granted') {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                console.log('Geolocation permissions granted');
                                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                                eventTracking('GEOLOCATION', 'Geolocation Allow', source, interaction);
                                
                                let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                                // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3)
                                let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                                if(iplocCookie.includes("|GeoLoc_"))
                                iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                                setCookie('iploc', iplocCookie + geolocParams, 0.125);

                                geoLocState("prompt-" + result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                            }, function (error) {
                                console.log('Geolocation Error-' + error.message)
                                eventTracking('GEOLOCATION', 'Geolocation Block', source, interaction)
                                eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                                setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                                geoLocState("denied");
                            }
                            );
                        } else if (this.state == 'denied') {
                            geoLocState("prompt-" + result.state);
                        }
                    }
                }
            });
        }
        else {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('Geolocation permissions granted');
                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                eventTracking('GEOLOCATION', 'Geolocation Allow', source, interaction)

                let geolocParams = "|GeoLoc_lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime()
                // setCookie('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 1)
                let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
                if(iplocCookie.includes("|GeoLoc_"))
                iplocCookie = iplocCookie.split("|GeoLoc_")[0];
                setCookie('iploc', iplocCookie + geolocParams, 0.125);

                geoLocState("granted", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
            }, function (error) {
                console.log('Geolocation Error-' + error.message)
                eventTracking('GEOLOCATION', 'Geolocation Block', source, interaction)
                eventTracking('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true)
                setCookie('GeoLoc', "lt=|lg=|acc=|createdate=", 3)
                geoLocState("denied");
            }
            );
        }

    }
}