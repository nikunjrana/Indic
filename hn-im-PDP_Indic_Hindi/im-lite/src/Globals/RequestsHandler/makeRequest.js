import fetcher from './fetcher';
import { getCookieValByKey } from '../CookieManager';


function attachGlid(method, url, body, glidAppend) {
    let requestInfo = { method: method, url: url, body: body };
    if (glidAppend) {
        let glid = getCookieValByKey('ImeshVisitor', 'glid');
        if (glid) {
            if (method == 'GET') {
                if (requestInfo.url.indexOf("?") >= 0) {
                    requestInfo.url += "&glid=" + glid;
                } else {
                    requestInfo.url += "?glid=" + glid;
                }
            }
            else //method:POST
            {
                requestInfo['body']['glid'] = glid;
            }
        }
    }
    return requestInfo;
}
/*

method:GET/POST
headers:object eg.{  "Content-type" :  "application/json"  }
glidAppend:true/false ---default false
*/

export default function makeRequest(method, url, body = {}, headers, timeout, glidAppend) {
    let requestInfo = attachGlid(method, url, body, glidAppend);
    if (headers)
        requestInfo['headers'] = headers;
    if (timeout)
        requestInfo['timeout'] = timeout;

    return fetcher(requestInfo);
}
