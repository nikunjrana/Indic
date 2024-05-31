import request from './RequestsHandler/makeRequest';

export default function getCityName(cityId) {
    return new Promise(function (resolve, reject) {
        request("GET", `/ajaxrequest/getCityName?cityId=${cityId}`).then(data => {
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