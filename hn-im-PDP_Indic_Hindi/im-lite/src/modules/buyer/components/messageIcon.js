import "../css/msgIcon.css";
import { getCookie } from '../../../Globals/CookieManager';
import { gaTrack } from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';

export const showUnreadCount = () => {
    var localst = JSON.parse(localStorage.getItem("multi_purpose"));    
    if (localst && typeof (localst['count']) !== "" && typeof (localst['count']) !== "undefined" && localst['count'] > 0) {
        localst['count'] > 99 ? localst['count'] = "99+" : localst['count'];
        (document.getElementById('cntmsg')) ? document.getElementById('cntmsg').innerHTML = localst['count'] : '';
        (document.getElementById('menuCntMsg')) ? document.getElementById('menuCntMsg').innerHTML = localst['count'] : '';
        (document.getElementById('msgListCnt')) ? document.getElementById('msgListCnt').innerHTML = ' ('+localst['count']+')' : '';
    }
}

export const handleHeaderIcons = (page) => {
    if ((!document.getElementById('hmIcnWrp') && getCookie("ImeshVisitor")) || (checkUserStatus() != 0 && !document.getElementById('cntmsg'))) {
        
        var mydiv =   page == "Product-Page-Clicks" ? document.getElementsByClassName("headPDP")[0] : document.getElementById("im-header");

        var msgIcon = document.createElement("div");
        msgIcon.innerHTML = '<a href="https://m.indiamart.com/messages/" id="hmIcnWrp" class="poa mr10 dib tp13p rt52p"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 98 70"><g fill="#FFF" fill-rule="nonzero"><path d="M49 48.962L36.876 38.358 2.212 68.05a7.099 7.099 0 0 0 4.837 1.895h83.902a7.046 7.046 0 0 0 4.816-1.895L61.124 38.358 49 48.962z"></path><path d="M95.788 1.896A7.053 7.053 0 0 0 90.951 0H7.049a7.024 7.024 0 0 0-4.823 1.91L49 41.967 95.788 1.896zM0 6.141v58.11l33.831-28.726zM64.169 35.525L98 64.252V6.12z"></path></g></svg><span class="cntmsg genMsgCnt fw poa tc clrw bxrd10 lh20" id="cntmsg"></a>';
       
        let insertBeforeElem =  page == "Product-Page-Clicks"   ? document.getElementById('smlSrchIcon')  : document.getElementById('srchBx');
         mydiv.insertBefore(msgIcon,insertBeforeElem);

    }

    let getContainer =  (page == "Product-Page-Clicks") ?  document.getElementsByClassName("headPDP")[0]  : document.getElementById('hmIcnWrp');
    getContainer.onclick = function () {
        gaTrack.trackEvent(['Messages', 'Go-to-messages', page, 0, false]);
    }
    showUnreadCount();
}


