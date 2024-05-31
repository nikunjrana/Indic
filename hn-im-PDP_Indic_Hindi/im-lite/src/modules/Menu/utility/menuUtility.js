
import {getCookie, getCookieValByKey} from '../../../Globals/CookieManager';
import {checkUserStatus} from '../../../Globals/MainFunctions';
export const showToIndianUser = () => {
    if ((!checkUserStatus() && getCookie("iploc") != '' && getCookieValByKey('iploc', 'gcniso') == "IN") || (getCookieValByKey('ImeshVisitor', 'glid') != '' && getCookieValByKey('ImeshVisitor', 'iso') == "IN")) {
        return true;
    }
    else {
        return false;
    }
}