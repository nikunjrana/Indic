export const getCookie = (name, type='') =>{
    //Returns decoded cookie value
    let decodedVal = getDecodedCookie(name);
    if(type == '' || decodedVal == "" || decodedVal == undefined){
        return decodedVal;
    }
    else{
    let cookieDataArr = [], cookieDataObj = {};
    let splitter = (decodedVal.indexOf('||')>-1)?'||':'|';
    decodedVal.split(splitter).map((val) => {
        let keys = val.split('=');
        let temp = {};
        if(keys[0] && keys[1]){
            temp[keys[0]] = keys[1];
            cookieDataArr.push(temp);
        }
    });

    cookieDataArr.map((val, key) => {
        let keyArr = Object.keys(val);
        cookieDataObj[keyArr] = val[keyArr[0]];
    });
    if(type == 'array'){
        return cookieDataArr;
    }
    if(type == 'object'){
        return cookieDataObj;
    }    
    }
}

export const getDecodedCookie=(name)=> {

    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return decodeURIComponent(parts.pop().split(";").shift());
}

export const getCookieValByKey = (name = 'ImeshVisitor', key) =>{
    let c = document.cookie; let imeshArr = ''; let imesh_obj = {};
    let cookieArr = ''; let cookie_obj = {};
    if (name != 'ImeshVisitor') {
        if (c.length > 0 && -1 != c.indexOf(name)) {
            let sArr = c.split(';');
            for (var k = 0; k < sArr.length; k++) {
                var temp = sArr[k];
                if (temp.replace(/^\s+|\s+$/g, "").split("=")[0] == name) {
                    temp = decodeURIComponent(temp);
                    cookieArr = temp.trim().substring(name.length + 1);
                    break;
                }
            }
            cookieArr.split('|').map((val) => {
                let imeshKey = val.split("=");
                if (typeof imeshKey != "undefined") cookie_obj[imeshKey[0]] = imeshKey[1] || "";
            });
            if (key) {
                return cookie_obj[key];
            }
            else {
                return cookie_obj
            }

        }
    } else {
        if (c.length > 0 && -1 != c.indexOf('ImeshVisitor')) {
            let sArr = c.split(';');
            for (var k = 0; k < sArr.length; k++) {
                var temp = sArr[k];
                if (temp.replace(/^\s+|\s+$/g, "").split("=")[0] == 'ImeshVisitor') {
                    temp = decodeURIComponent(temp);
                    imeshArr = temp.trim().substring(13);
                    break;
                } 
            }
            imeshArr.split('|').map((imeshObj) => {
                let imeshKey = imeshObj.split("=");
                if (typeof imeshKey != "undefined") imesh_obj[imeshKey[0]] = imeshKey[1] || "";
            });
        }        
        if (key) {
            return imesh_obj[key];
        }
        else {
            return imesh_obj
        }

    }
}


export const setCookie=(name, value, days, domain = '.indiamart.com')=> {
    if (days) {
        var date = new Date();
        if(name=='GeoLoc')
        {
            days=7;
        }
        if(name=='ImeshVisitor' &&days!=(-1)){
            days=180;
        }
        // if (name == 'sellertool') {
        //     date.setTime(date.getTime() + (days * 30 * 60 * 1000));
        // }
        // else {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        // }
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    let samesite = '';
    if( name =='ImeshVisitor' || name == 'v4iilex' || name == 'im_iss'){
        samesite = ';SameSite=Lax';
    }

    if (document.domain === 'localhost')
        document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/"+samesite;
    else
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; domain=" + domain + ";path=/"+samesite;
}

export const deleteCookie = (name) =>{
    setCookie(name, '', -1);
}

