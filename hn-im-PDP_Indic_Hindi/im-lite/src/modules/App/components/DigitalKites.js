import { getCookie,getCookieValByKey} from '../../../Globals/CookieManager';
import makeRequest from '../../../Globals/RequestsHandler/makeRequest';

export const digitalKites = (mcat,subcat,grp) =>{
    if(!window.audiencePlay){
        let scr = "https://sdk.audienceplay.com/audienceplay.js";
        let cscript = document.createElement("script");
        cscript.type = "text/javascript";
        cscript.async = true;cscript.defer = true;
        cscript.src = scr;
        document.head.appendChild(cscript);
        cscript.onload = function() {
            digitalK(mcat,subcat,grp)
        }
    }
    else{
        digitalK(mcat,subcat,grp)
    }
} 
const digitalK = (mcat,subcat,grp) =>{
    audiencePlay.set("acp15ghuzyz6kf3l8vsn"); //Generated API-Key 
    audiencePlay.start(grp); // Group name 
    audiencePlay.add("string",subcat,mcat); //(Data Type, Subcat Name, Mcat Name) 
    let city ="";
    if (getCookieValByKey('iploc', 'GeoLoc_lt')){
        let lt = getCookieValByKey('iploc', 'GeoLoc_lt');
        let lg = getCookieValByKey('iploc','lg');
        let data ={
            'token': 'imartenquiryprovider',
            'S_lat': lt,
            'S_long': lg,
            'GET_CITY': 'Y',
            'modid': 'IMOB',
        };
        makeRequest('POST', '/ajaxrequest/identified/search/CityFromLatLong/',data).then((resp)=>{
            if (resp.response && resp.response.CODE == 200 ) {
                    if(resp.response.cityname){
                        city = resp.response.cityname;
                        audiencePlay.add("u_city","City",city);
                        if(resp.response.statename){
                            audiencePlay.add("u_state","State",resp.response.statename)
                        }
                    }
            }
        }
        )}
    else if(getCookie('userlocName')) {
        let userlocArr = getCookie('userlocName').split("||");
        let userlocName = userlocArr[0];
        city = userlocName[0].toUpperCase() + userlocName.slice(1);
        audiencePlay.add("u_city","City",city);
    }
    else if(getCookie('iploc')){
        city = getCookieValByKey('iploc', 'gctnm' );
        audiencePlay.add("u_city","City",city);
    }
    if (getCookie('ImeshVisitor')){
        let email = getCookieValByKey('ImeshVisitor','em');
        let mobno = getCookieValByKey('ImeshVisitor','mb1' );
        if(email) audiencePlay.add("HashedEmail","HashedEmail",audiencePlay.sha256(email));//Converting to Sha256 Format by using hash() function ]
        audiencePlay.add("HashedMobile","HashedMobile", audiencePlay.sha256(mobno)); //Sha256 Format 
    }
    audiencePlay.end(); 
    audiencePlay.send();
}
