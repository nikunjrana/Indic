import { eventTracking } from '../../../Globals/GaTracking';
import { getCookie, setCookie } from '../../../Globals/CookieManager';

export function detectUserLocation(geoLocCallBck, source = 'search') {
    const locSuccess = (position) => {
        let lat = position.coords.latitude,
            lng = position.coords.longitude,
            acc = position.coords.accuracy;
        let geolocParams = "|GeoLoc_lt=" + lat.toFixed(5) + "|lg=" + lng.toFixed(5) + "|acc=" + acc.toFixed(5) + "|createdate=" + new Date().getTime()
        // setCookie('GeoLoc', "lt=" + lat.toFixed(5) + "|lg=" + lng.toFixed(5) + "|acc=" + acc.toFixed(5) + "|createdate=" + new Date().getTime(), 3);
        let iplocCookie = getCookie("iploc") ? decodeURIComponent(getCookie("iploc")) : "";
        if (iplocCookie.includes("|GeoLoc_"))
            iplocCookie = iplocCookie.split("|GeoLoc_")[0];
        setCookie('iploc', iplocCookie + geolocParams, 0.125);

        eventTracking('GEOLOCATION', 'Geolocation Allow', source, true)
        geoLocCallBck(lat, lng);
    }
    const locError = (error) => {
        eventTracking('GEOLOCATION', 'Geolocation Block', source, true);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                geoLocCallBck('', '', "User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                geoLocCallBck('', '', "Location information is unavailable.")
                break;
            case error.TIMEOUT:
                geoLocCallBck('', '', "The request to get user location timed out.")
                break;
            case error.NOT_SUPPORTED:
                geoLocCallBck('', '', error.NOT_SUPPORTED);
                break;
            case error.UNKNOWN_ERROR:
                geoLocCallBck('', '', "An unknown error occurred.")
                break;
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locSuccess, locError);
    }
    else {
        locError({ NOT_SUPPORTED: 'Geolocation is not supported by this browser.' })
    }
    
}
