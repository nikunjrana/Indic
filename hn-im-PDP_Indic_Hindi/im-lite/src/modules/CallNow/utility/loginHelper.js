import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';

export const checkUserLoc = () =>{
    let iplocGcnnm = getCookieValByKey('iploc','gcnnm');
    return  iplocGcnnm ? iplocGcnnm : "India";  
}

export const checkUserLocIso = () => {
    let iplocGcnso = getCookieValByKey('iploc','gcniso');
    return iplocGcnso ?  iplocGcnso : "IN"; 
}
export const checkip =() =>{
    let iplocGip = getCookieValByKey('iploc', 'gip');
    return  iplocGip ? iplocGip : "";
}

export const checkImeshExists = () =>{
    return getCookie('ImeshVisitor') ? true : false;
}

export const checkUnVerifiedUser = () =>{
    return getCookieValByKey('ImeshVisitor', 'uv') != 'V' ? true : false;
}

export const checkImeshIso = () =>{
    let imeshIso = getCookieValByKey('ImeshVisitor', 'iso');
    return  imeshIso ? imeshIso : "IN";
}

export const checkIdentifiedForeignUser = () =>{
    let imeshIso = getCookieValByKey('ImeshVisitor', 'iso');
    return  imeshIso ? imeshIso != "IN" ? true : false : "";
}

export const checkCounterValue = () =>{
    let showskip = false;
    let multiPurpsLS= JSON.parse(localStorage.getItem("multi_purpose"));
    if (multiPurpsLS && multiPurpsLS.ctcrecordid) {
        let showcount = multiPurpsLS.ctcrecordid;
        if (showcount >= 1) {
          showskip = true
        } 
    }
    return showskip;
}

