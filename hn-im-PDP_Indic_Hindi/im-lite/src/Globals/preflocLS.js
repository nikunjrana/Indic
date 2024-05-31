import { getIpLocCity } from "../modules/Widgets/LocationFilter/dispatchFilterLocations";

export function createPreflocCookie(cityName,ImeshCity){
    let d = new Date();
    let date = "" + d.getFullYear() + (((d.getMonth() + 1).toString().length < 2) ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString()) + ((d.getDate().toString().length < 2) ? '0' + d.getDate().toString() : d.getDate().toString()) + ((d.getHours().toString().length < 2) ? '0' + d.getHours().toString() : d.getHours().toString()) + ((d.getMinutes().toString().length < 2) ? '0' + d.getMinutes().toString() : d.getMinutes().toString()) + ((d.getSeconds().toString().length < 2) ? '0' + d.getSeconds().toString() : d.getSeconds().toString());
    let iplocCity = getIpLocCity();
    let prefLoc = {
        DT : date,
        cityName : cityName ? cityName : ImeshCity ? ImeshCity : (iplocCity&&iplocCity.cityname) ? iplocCity.cityname : '',
        tag : cityName ? "session" : ImeshCity ? "imesh" : (iplocCity && iplocCity.cityname) ? "iploc": '',
    }
    return prefLoc
}