import {mobileNumber} from '../utility/updateMobileNumber';
import {updateLocalStorage,callDurationSessionStorage} from '../utility/updateLocalStorage';
import {addC2Ctrack} from '../actions/addC2Ctrack';
import { getCookie,getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
// import { userConverted } from '../actions/callNowActionDispatcher';

export const placeCall = (props, that) => {
    if(props){
        let callProps = props.callProps;
        let userStatus = that.userStatus?that.userStatus:'';
        let  data = { 
            callTxt: callProps.callTxt,
            contactNumber: callProps.contactNumber, 
            glusrID: callProps.glusrID, 
            contactType: callProps.contactType, 
            startTime: new Date(),
            modrefid: callProps.modrefid,
            modrefname: callProps.modrefname,
            query_ref_id: callProps.query_ref_id,
            query_ref_type: callProps.query_ref_type,
            pageType: callProps.dbpagetrack, 
            userMode:userStatus };
            
            if(callProps.contactNumber && callProps.contactType){
            let PDP404URL = localStorage && localStorage.PDP404URL ?  JSON.parse(localStorage.PDP404URL) : '';
        let previousPageURL=PDP404URL&&PDP404URL.previousPageURL&&PDP404URL.previousPageURL.includes("proddetail")?'P':PDP404URL.previousPageURL.includes("/city/")?'MC':PDP404URL.previousPageURL.includes("impcat")?'M':PDP404URL.previousPageURL.includes("isearch")?'S':PDP404URL.previousPageURL=='https://m.indiamart.com/'?"H":PDP404URL.previousPageURL.includes("/messages/")?"MSG":PDP404URL.previousPageURL==''?"G":"C"
        let currentPageURL=PDP404URL&&PDP404URL.currentPageURL.includes("proddetail")?'P':''
        let track=previousPageURL&&currentPageURL&&currentPageURL=="P"?'|'+previousPageURL+'_'+currentPageURL:'';
                let gaCookie = getCookie("_ga");
                let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
                let callCount = multi_purpose && multi_purpose.ctcrecordid ? multi_purpose.ctcrecordid+1 : 1;
                let eventAction = 'Dialer|Call' + callCount;
                let eventLabel = callProps.eventLabel+`|${userStatus}`
                 +`${window.pagename=='PDP'?track:''}`;
                callProps.PAID_TYPE ? eventAction = eventAction + "|" +callProps.PAID_TYPE :'';
                gaCookie ? eventLabel = eventLabel + "|" + gaCookie :'';
                showdialer(callProps.contactNumber.replace(/-/g,""),callProps.contactType,callProps.callBackClick,callProps.eventLabel);
                eventTracking('Click-To-Call', eventAction, eventLabel, true);
                if(getCookie('ImeshVisitor') && getCookieValByKey('ImeshVisitor', 'uv') != 'V' && getCookieValByKey('ImeshVisitor', 'iso') == 'IN' && callProps.contactType=='PNS'){
                    multi_purpose.VFPending=true;
                    localStorage.setItem("multi_purpose", JSON.stringify(multi_purpose));
                }
            }
            getCookie('ImeshVisitor')? addC2Ctrack(data) : ''; 
            updateLocalStorage(that);
			callDurationSessionStorage(callProps.glusrID, data, that,props);
    }
  
}

export const showdialer = (contactNumber,contactType,callBackClick='',eventLabel) => {
    if(typeof callBackClick === 'function') {
    callBackClick(); }
    if(sessionStorage.getItem("forAds") && sessionStorage.getItem("forAds") == 'notconverted'){
        sessionStorage.setItem("forAds", "converted");
    }    
    // userConverted();

    if(contactType == 'L'){
        document.location.href = "tel:" + contactNumber;
    }
    else{
        let callNum=mobileNumber(contactNumber,eventLabel);
        document.location.href = "tel:" + "+91" + callNum;
    }
}