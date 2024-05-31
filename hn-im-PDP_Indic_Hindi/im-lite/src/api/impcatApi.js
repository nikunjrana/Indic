import {getCookie} from '../Globals/CookieManager';
import makeREQUEST from '../Globals/RequestsHandler/makeRequest';
const impcatApi = 
    { 
        getMcatData(flName, cityFlName, start=1, end=14, lang='en', bizValue,ecomValue,isqFilter,price_flag,glid) {
        let url = "/ajaxrequest/unidentified/mcat";
        const method = 'GET';

        let iploc = getCookie('iploc','object');
        let countryIso = iploc && iploc.gcniso != 'IN'? 1 : 0;
        let timeout = 8000;
        const params = new URLSearchParams(window.location.search)
		let searchRedirectKeyword = params.get('redirectkwd')?params.get('redirectkwd'):"";
        let utmSourceAdwords = (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?"Adwords":"";

        let paramsObj = {
            flName: flName,
            cityFlName: cityFlName,
            start: start,
            end: end,
            bizValue : bizValue || '',
            ecomValue : ecomValue || '',
            price : price_flag,
            in_country_iso: countryIso,
            language: lang,
            glusrid: glid || '',
            isqFilter : isqFilter
        }
        
        const requestParams = (searchRedirectKeyword != "" && start == 1) ? (utmSourceAdwords ?
            {
                ...paramsObj,
                redirectkwd: searchRedirectKeyword,
                utm_source: "Adwords"
            }
            : { ...paramsObj, redirectkwd: searchRedirectKeyword })
                : (utmSourceAdwords ? { ...paramsObj, utm_source: "Adwords" }
                    : { ...paramsObj })

        url += '?';
        for(let key in requestParams) {
            url += `${key}=${requestParams[key]}&`;
        }
        url = url.slice(0, -1);

        return makeREQUEST(method, url,'','', timeout);

    },
    getCityLatLongValue(lat,long){
        let data = {
            'token': 'imartenquiryprovider',
            'S_lat': lat,
            'S_long': long,
            'GET_CITY': 'Y',
            'modid': 'IMOB',

        }
        let url = '/ajaxrequest/identified/mcat/CityFromLatLong/'
        const method = 'POST';
        return makeREQUEST(method,url,data);
    }
}

export default impcatApi;