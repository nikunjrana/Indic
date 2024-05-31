let reqObj = {
    method: 'GET',
    url: '',
    body: {},
    timeout: 8000,
    headers: { "Content-type": "application/json" },
    ontimeout: function (xhr) {
        return ({
            status: "SERVICE-TIME-OUT"
        });
    },
    onload: function (xhr) {
        let data = '';
        if (100 <= xhr.status && xhr.status <= 199) {
            data = ({
                status: xhr.status,
                statusText: 'info'
            });
        }
        else if (200 <= xhr.status && xhr.status <= 299) {
            let res = JSON.parse(xhr.response);
            data = ({
                status: xhr.status,
                statusText: 'success',
                response: res
            });
        }
        else if (400 <= xhr.status && xhr.status <= 499) {
            data = ({
                status: xhr.status,
                statusText: 'client-error'
            });
        }
        else {
            data = ({
                status: xhr.status,
                statusText: 'server-error'
            });
        }
        return (data);
    },
    onerror: function (xhr) {
        return ({
            status: xhr.status,
            statusText: xhr.statusText
        });
    }
}

function fetchReq(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(reqObj.method, reqObj.url);
    for (let key in reqObj.headers) {
        xhr.setRequestHeader(key, reqObj.headers[key])
    }
    xhr.timeout = reqObj.timeout;
    xhr.ontimeout = function () {
        resolve(reqObj.ontimeout(xhr));
    }
    xhr.onload = function () {
        resolve(reqObj.onload(xhr))
    }
    xhr.onerror = function () {
        reject(reqObj.onerror(xhr))
    }
    xhr.send(reqObj.body);
}
function controller(reqInputs = {}) {
    reqObj = { ...reqObj, ...reqInputs };
    let dataReq = new Promise(fetchReq);
    return dataReq;
}

module.exports = controller