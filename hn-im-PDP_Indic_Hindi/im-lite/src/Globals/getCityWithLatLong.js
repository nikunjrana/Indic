import makeRequest from './RequestsHandler/makeRequest';
export default function getCityWithLatLong(lat, long) {
    var data = {
        'token': 'imartenquiryprovider',
        'S_lat': lat,
        'S_long': long,
        'GET_CITY': 'Y',
        'modid': 'IMOB',

    }
    return makeRequest('POST', '/ajaxrequest/identified/search/CityFromLatLong/', data);
}