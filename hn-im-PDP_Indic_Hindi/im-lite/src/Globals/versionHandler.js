import makeRequest from '../Globals/fetcher';

function getFileVersions(resolve, reject) {

    if (!window._FETCHING_VERSIONS) {
        let dataRequest = makeRequest({ 'method': 'GET', 'url': '/ajaxrequest/identified/allVersions' });
        window._FETCHING_VERSIONS = true;
        dataRequest.then((data) => {
            if (data.response) {
                let lsData = localStorage.getItem('appJSVersions');
                if (JSON.stringify(data.response) !== lsData) {
                    let verData = data.response;
                    localStorage.setItem('versionsTime', new Date().getTime());
                    localStorage.setItem('appJSVersions', JSON.stringify(verData));
                    window._NEED_UPDATE = true;
                    resolve('VERSION_UPDATED');
                }
                else {
                    localStorage.setItem('versionsTime', new Date().getTime());
                    window._NEED_UPDATE = false;
                    reject('NOTHING_TO_UPDATE');
                }
                window._FETCHING_VERSIONS = false;
            }
        }, (error) => {
            reject('REQUEST_FAILED');
            window._FETCHING_VERSIONS = false;
        })
    }
}
export function checkVersionUpdate() {
    return new Promise(function (resolve, reject) {
        if (window._NEED_UPDATE) {
            reject('NOTHING_TO_UPDATE');
        }
        else {
            let storedTime = localStorage.getItem('versionsTime'),
                timeNow = new Date().getTime();
            if ((timeNow - Number(storedTime)) >= (3600000)) {
                getFileVersions(resolve, reject);
            }
            else {
                window._NEED_UPDATE = false;
                reject('NOTHING_TO_UPDATE');
            }
        }
    })
}

export function updateMainJS(mainMin) {
    let verData = JSON.parse(localStorage.getItem('appJSVersions'));
    verData['appUrl'] = mainMin;
    localStorage.setItem('versionsTime', new Date().getTime());
    localStorage.setItem('appJSVersions', JSON.stringify(verData));
    window._NEED_UPDATE = true;
}
