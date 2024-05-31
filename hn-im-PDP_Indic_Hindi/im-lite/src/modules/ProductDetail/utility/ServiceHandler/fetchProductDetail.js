import makeRequest from '../../../../Globals/RequestsHandler/makeRequest';

export default function fetchProductDetail(displayID) {
    let timeout = 8000;
    return makeRequest('GET', '/ajaxrequest/proddetail.php?displayId=' + displayID, {}, '', timeout);
}

export function getLastSeen(gluserid) {
    return makeRequest('GET', '/ajaxrequest/proddetail/userlastseen?glid=' + gluserid);
}

export function getrelatedproducts(mcatid, CITY_ID = "", prod ,ecomflag="") {
    let data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/relatedproducts?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod + '&ecomflag='+ ecomflag, data, 8000, false);
}

export function getCityWithLatLong(lat, long) {
    var data = {
        'token': 'imartenquiryprovider',
        'S_lat': lat,
        'S_long': long,
        'GET_CITY': 'Y',
        'modid': 'IMOB',

    }
    return makeRequest('POST', '/ajaxrequest/identified/search/CityFromLatLong/', data);
}

export function getCityName(cityId) {
    return new Promise(function (resolve, reject) {
        makeRequest("GET", `/ajaxrequest/getCityName?cityId=${cityId}`).then(data => {
            if (data.response.status === "Not Found" || data.status != 200) {
                reject('Not Found');
            }
            else {
                resolve(data.response['GL_CITY_NAME']);
            }
        }).catch(err => {
            console.log(err);
            reject('Not Found');
        })
    })
}


