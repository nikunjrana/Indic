/*

uses global state:cityListInFilter
supports sellerLoc as {cityname:'',cityid:''} for showing a default selection

*/

import { imStore } from '../../../store/imStore';
import { getCookieValByKey, getCookie } from '../../../Globals/CookieManager';
import getCityName from '../../../Globals/getCityName';
import getCityWithLatLong from '../../../Globals/getCityWithLatLong';
export function getIpLocCity() {
    try {
        let cityname = getCookieValByKey('iploc', 'gctnm'),
            cityid = getCookieValByKey('iploc', 'gctid');
        if (cityname && window.pagename == "Search-PWA"){
            return ({
                cityname: cityname.toLowerCase().split('+').join(' '),
                cityid: cityid ? cityid : ""
            })
        }
        else if (cityname && cityid) {
            return ({
                cityname: cityname.toLowerCase().split('+').join(' '),
                cityid: cityid
            })
        }
        else {
            return 'Not Found';
        }
    }
    catch (err) {
        console.log(err);
        return 'Not Found';
    }
}
export function getUserCity() {
    return new Promise(function (resolve, reject) {
        let userCityId = getCookieValByKey('ImeshVisitor', 'ctid');
        let userCountry = getCookieValByKey('ImeshVisitor', 'iso');
        if (userCityId && userCountry == 'IN') {
            getCityName(userCityId).then(data => {
                resolve({
                    cityname: data ? data.toLowerCase().split('+').join(' ').trim() : '',
                    cityid: userCityId
                })
            }, error => {
                resolve('Not Found');
                console.log(error);
            })
        }
        else {
            resolve('Not Found');
        }
    })
}
function getUserLocCity() {
    try {
        let userloc = getCookie("userlocName");
        if (userloc) {
            userloc = decodeURIComponent(userloc);
            let cityname = userloc.split('||')[0],
                cityid = userloc.split('||')[1];
            return ({
                cityname: cityname.toLowerCase().split('+').join(' ').trim(),
                cityid: cityid
            });
        }
        else {
            return ('Not Found');
        }
    }
    catch (err) {
        console.log(err);
        return ('Not Found');
    }
}
function getGeoLocCity() {
    return new Promise(function (resolve, reject) {
        let lat = getCookieValByKey('iploc', 'GeoLoc_lt');
        let long = getCookieValByKey('iploc', 'lg');
        if (lat && long) {
            // let geoParse = geoloc.split('|');
            // let lat = geoParse[0].split('=')[1];
            // let long = geoParse[1].split('=')[1];
            getCityWithLatLong(lat, long).then(data => {
                if (data.response.CODE == 200) {
                    resolve({
                        cityname: data.response.cityname.toLowerCase().split('+').join(' ').trim(),
                        cityid: data.response.cityid
                    });
                }
                else {
                    resolve('Not Found');
                }
            }, error => {
                console.log(error);
                resolve('Not Found');
            })
        }
        else {
            resolve('Not Found');
        }
    })
}
function constructCityData(sellerLoc) {
    return new Promise(function (resolve) {
        let cityData = new Map();
        getGeoLocCity().then(geoLoc => {
            if (window.pagename === "PDP" && sellerLoc.cityname && sellerLoc.cityid) {
                cityData.set(sellerLoc.cityid, sellerLoc.cityname.toLowerCase());
            }
            if (geoLoc !== 'Not Found' && !cityData.has(geoLoc.cityid)) {
                cityData.set(geoLoc.cityid, geoLoc.cityname);
            }

            let userloc = getUserLocCity();

            if (userloc !== 'Not Found' && !cityData.has(userloc.cityid)) {
                cityData.set(userloc.cityid, userloc.cityname);
            }

            getUserCity().then(userCity => {
                if (userCity !== 'Not Found' && !cityData.has(userCity.cityid)) {
                    cityData.set(userCity.cityid, userCity.cityname);
                }
                let iploc = getIpLocCity();

                if (iploc !== 'Not Found' && !cityData.has(iploc.cityid)) {
                    cityData.set(iploc.cityid, iploc.cityname);
                }
                if (window.pagename !== "PDP" && sellerLoc.cityname && sellerLoc.cityid && !cityData.has(sellerLoc.cityid)) {
                    cityData.set(sellerLoc.cityid, sellerLoc.cityname.toLowerCase());
                }
                resolve(cityData);
            })
        })
    })
}

export default function dispatchFilterLocations(sellerLoc = { cityname: '', cityid: '' }) {
    constructCityData(sellerLoc).then(data => {
        let selCity;
            selCity = { cityname: data.values().next().value, cityid: data.keys().next().value };//selecting the top most city by default..
        console.log(selCity);
        imStore.dispatch({ type: 'SET_LOCATIONS_FILTER_WIDGET', cityList: data, selCity: selCity });
    });
}