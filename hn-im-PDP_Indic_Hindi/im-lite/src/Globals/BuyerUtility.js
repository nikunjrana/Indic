import {getCookie, getCookieValByKey} from './CookieManager';
import imApi from "../api/imApi";
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}
export const getPrice = (fobprice, currency, quantity) => {
    fobprice = fobprice.toFixed(2);
    if(fobprice>100000){
        fobprice = fobprice/100000;
        fobprice = fobprice.toFixed(2);
        fobprice = fobprice.toString()+"Lakh";
    }
    else
    {
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        let dec_val=0;
        if(newprice[0])
            num = parseInt(newprice[0]); 
        if(newprice[1])
        {   
            dec = parseInt(newprice[1]);                   
            if(dec>0){ 
               dec_val= dec.toString().substring(0,2);
            }
        }
        if(dec_val>0) { 
            fobprice = num+"."+parseInt(dec_val);
        } else {
            fobprice = num;
        }
        // if(num > 1000 && num%1000==0)
        //     fobprice = Math.floor((num/1000)).toString() +','+'000';
        // else if (num > 1000)
        //     fobprice = Math.floor((num/1000)).toString() +','+(num%1000).toString();
        // else
        //     fobprice = num.toString();
        // if(dec != 0)
        //     fobprice = fobprice+'.'+dec.toString();
        if(Math.floor(fobprice/1000)!=0) {
           fobprice= new Intl.NumberFormat('en-IN').format(fobprice);
           fobprice=fobprice.trim();
        }
    }
    return currency +' '+ fobprice + (quantity ? ' / ' + quantity : '');
}

export const getPriceWithoutCurrency = (fobprice) => {
    fobprice = fobprice.toFixed(2);
    if (fobprice > 100000) {
        fobprice = fobprice / 100000;
        fobprice = fobprice.toFixed(2);
        fobprice = fobprice.toString() + " Lakh";
    }
    else {
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        if (newprice[0])
            num = parseInt(newprice[0]);
        if (newprice[1]) {
            dec = parseInt(newprice[1]);
        }
        if (num > 1000 && num % 1000 == 0)
            fobprice = Math.floor((num / 1000)).toString() + ',' + '000';
        else if (num > 1000)
            fobprice = Math.floor((num / 1000)).toString() + ',' + (num % 1000).toString().padStart(3, "0");
        else
            fobprice = num.toString();
        if (dec != 0)
            fobprice = fobprice + '.' + dec.toString();

    }
    return fobprice;
}
export const updateUnreadMsg = (count, time, glid) => {
    var localst = JSON.parse(localStorage.getItem("multi_purpose"));
    if (localst == null || localst == 'undefined') {
        localst = {};
    }
    localst['count'] = count;
    localst['time'] = time;
    localst['glid'] = glid;
    localStorage.setItem("multi_purpose", JSON.stringify(localst));
    if (count != "" && count > 0) {
        count > 99 ? count = "99+" : count;
        (document.getElementById('cntmsg')) ? document.getElementById('cntmsg').innerHTML = count : '';
        (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = count : '';
	(document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' ('+count+')' : '';
    }
}
export const countUnreadMessages = (isMenu=false) => {
    var glid = getCookieValByKey('ImeshVisitor', 'glid'); 
    if (glid){ 
    var localst = JSON.parse(localStorage.getItem("multi_purpose")); 
        var self = this; 
        var localGlid = glid
            , localTime = 0
            , c = 0
            , curTime = new Date
            , localCount = "";
        if (localst !== "" && localst !== null) {                
            if (typeof (localst['count']) !== "" && typeof (localst['count']) !== "undefined") 	   {
                localCount = localst['count'];
                localTime = localst['time'];
                var s = curTime.getTime() - new Date(localTime).getTime();
                c = Math.floor(s / 1e3 / 60 / 60);
                localGlid = localst['glid'];
            }
        }
	let hitService = (!isMenu && (/(^\/messages\/$)|(^\/$)/g).test(location.pathname));
        if ((glid && (0 == localTime || c >= 4) || glid != localGlid) || hitService) {
            imApi.getMsgCount().then(function (response) {
                if (null != response && "200" == response.code) {
                    var count = response.count;
                    if (null == count) {
                        count = 0;
                    }
                    updateUnreadMsg(count, curTime, glid);
                }
            });
        } else {
            if (localCount !== "" && localCount > 0) {
                localCount > 99 ? localCount = "99+" : localCount;
                (document.getElementById('cntmsg')) ? document.getElementById('cntmsg').innerHTML = localCount : '';
                (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = localCount : '';
		(document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' ('+localCount+')' : '';
            }
        }
    }
}
export const service_link = (title, id) => {
    let name = title;
    name = name.replace(/^\s+/, '');
    name = name.replace(/\s+$/, '');
    name = name.replace(/\s+/g, "-");
    name = name.toLowerCase();
    name = name.replace(/\&amp;/g, "&");
    name = name.replace(/\&lt;/g, "<");
    name = name.replace(/\&gt;/g, ">");
    name = name.replace(/\&nbsp;/g, " ");
    name = name.replace(/[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g, "-");
    name = name.replace(/^(-)+/, "");
    name = name.replace(/-+$/, "");
    if (location.hostname !== "localhost") {
        return "https://" + location.hostname + "/proddetail/" + name + '-' + id + '.html';
    }
    return location.hostname + ":8083/proddetail/" + name + '-' + id + '.html';
}
export const pdp_url = (title, id) => {
    let url = service_link(title, id)
    let posn = url.indexOf('proddetail')
    url = url.substring(posn)
    return url;
}
export const pns_prefix = (mob, type) => {
    if (typeof mob == 'object') {
        mob = mob[0];
    }
    switch (type) {
        case 'MOBILE':
        case 'PNS':
            {
                if (mob.length == 10)//requires +91
                {
                    mob = '+91' + mob;
                }
                else {
                    if (mob.indexOf('+91') == -1) {
                        mob = '+' + mob;
                    }
                }
                break;
            }
        case 'PHONE':
            {
                if (mob.indexOf('+91') == -1 && mob.indexOf('91') != 0) {
                    mob = '+91' + mob;
                }
                else if (mob.indexOf('91') == 0) {
                    mob = '+' + mob;
                }
                break;

            }
    }
    if (type == 'MOBILE' || type == 'PHONE') {
        let arr = [];
        arr[0] = mob;
        return arr;
    }
    else {
        return mob;
    }
}
export const getPadding = (n) => {
    return ((n < 10) ? ('0' + n) : n.toString());
}
export const getHeight = (element) => {
    var e = element !== null ? element.cloneNode(true) : false;
    if (e) {
        e.style.visibility = "hidden";
        document.body.appendChild(e);
        var height = e.offsetHeight + 0;
        document.body.removeChild(e);
        e.style.visibility = "visible";
        return height;
    }
}
export const addslashes = (str) => {
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '\\"');
        str = str.replace(/\0/g, '\\0');
        return str;
}
export const getCityNameId = (nameId) => {
        let reference = this;
        return new Promise(function (resolve, reject) {
            let cookiefromuserloc = reference.getCookie('userlocName');
            if (reference.getCookie('GeoLoc')) {
                ;
                let lat = reference.getCookieVal('lt', 'GeoLoc');
                let long = reference.getCookieVal('lg', 'GeoLoc');
                resolve(imApi.findCityWithLatLong(lat, long).then(function (response) {
                    if (response.CODE == 200)
                        if (nameId == 'name') { return response.cityname; }
                        else { return response.cityid; }
                    reject();
                }));
            } else if (reference.getCookie('iploc')) {
                if (nameId == 'name') { var citygeoloc = reference.getCookieVal('gctnm', 'iploc'); }
                else { var citygeoloc = reference.getCookieVal('gctid', 'iploc'); }
                resolve(citygeoloc);
            } else if (cookiefromuserloc) {
                if (nameId == 'name') { cookiefromuserloc = decodeURIComponent(cookiefromuserloc).split('||')[0]; }
                else { cookiefromuserloc = decodeURIComponent(cookiefromuserloc).split('||')[1]; }
                resolve(cookiefromuserloc);
            }
            else {
                reject();
            }
        })
    }