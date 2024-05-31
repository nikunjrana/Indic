import { eventTracking } from '../../../../Globals/GaTracking';
import getData from '../../../../Globals/RequestsHandler/makeRequest'
import { getCookieValByKey } from '../../../../Globals/CookieManager';
import {imStore} from '../../../../store/imStore';


function showOfflineInfo() {
    eventTracking('PWA PDP-Offline', 'Get-Best-Price-Explicit-Offline', 'datatype_preference', true)

    document.getElementById("offline_span").innerHTML = "It seems you are offline. Tap कॉल करें to call this seller for the best price";

    document.getElementById("offline_pop").style.bottom = "60px";
    document.getElementById("offline_pop").style.display = "block";

    eventTracking('PWA_Search_Offline', 'Offline_Message_Viewed', 'Enq_Offline_Clicks', true);

    setTimeout(function () {
        document.getElementById("offline_pop").style.display = "none";
        document.getElementById("offline_pop").style.bottom = "45px";
    }, 6000)
}

export default function oneTapEnquiry(data, pageLang, enqDivId, queryRef, pageName, isExtended, isExtendedIndex, ctaName, toggleLoader,btnName,cABTestPDP='') {
    var isA2HS = false;
    if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
        isA2HS = true;
    }
    let isLite = isA2HS ? "|A2HS" : '';
    let intentAction = data.isCompany?'Intent-Sent_'+pageName+'|Messages':data.isMcat?'Intent-Sent_MCAT-Messages':data.isSearch?'Intent-Sent_SEARCH-Messages':'Intent-Sent_PDP-Messages';
    if (window.navigator.onLine == false) {
        showOfflineInfo();
    }
    else if (window.navigator.onLine == true) {
        let displayName = data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME;

        let catID = data.CAT_ID ? data.CAT_ID : '';
        queryRef+="|ChatWithSeller";
        let query_text = '';
        if (pageName == "PDP") {
            if (isExtended == true) {
                query_text = queryRef + '|extended' + isExtendedIndex + cABTestPDP;

            } else {
                query_text = queryRef + cABTestPDP;
            }

        }
        else if(data.isCompany){
            query_text=data.queryRef+"|Full-Login|OneTapConversation"
        }
        else if(data.isMcat){
            query_text=data.queryRef+"|Full-Login|ChatInCategory|MCAT"
        }
        else if(data.isSearch){
            query_text=data.queryRef+"|Full-Login|ChatInSearch|SEARCH"
        }
        else { query_text = 'product_detail_extended_PWA' }

        let gip=getCookieValByKey('iploc','gip'),
        gcnm=getCookieValByKey('iploc','gcnnm'),
        gcniso=getCookieValByKey('iploc','gcniso'),
        glid=getCookieValByKey('ImeshVisitor','glid');
        var prodType =data.isCompany||data.isMcat||data.isSearch?'':'|'+data.IS_PROD_SERV;
        var params = {
            interest_current_url: (window.location.href).slice(0, 500),
            interest_modreftype:"3",
            interest_modrefid: data.PC_ITEM_DISPLAY_ID?data.PC_ITEM_DISPLAY_ID:'',
            interest_sender_ip: gip,
            interest_mail_send: "",
            interest_sender_glusr_id: glid,
            interest_sender_ip_country: gcnm,
            interest_sender_ip_country_iso: gcniso,
            interest_modid: 'IMOB',
            interest_rcv_glusr_id: data.GLUSR_USR_ID?data.GLUSR_USR_ID:'',
            interest_product_name: displayName,
            interest_sender_first_name: getCookieValByKey('ImeshVisitor','fn') ? getCookieValByKey('ImeshVisitor','fn') : '',
            interest_cat_id: catID,
            interest_mcat_id: data.BRD_MCAT_ID ? data.BRD_MCAT_ID : '',
            interest_usr_login_mode: "1",
            interest_s_long: getCookieValByKey('iploc','lg')?getCookieValByKey('iploc','lg'):'',
            interest_s_lat: getCookieValByKey('iploc', 'GeoLoc_lt')?getCookieValByKey('iploc', 'GeoLoc_lt'):'',
            interest_latlong_accuracy: getCookieValByKey('iploc','acc')?getCookieValByKey('iploc','acc'):'',
            interest_query_ref_url: (window.location.href+"##"+query_text),
            interest_query_actual_url: (document.referrer).slice(0, 500),
            interest_type: "12"
        };
        params.interest_query_ref_text = query_text + prodType;
        var adCookie = getCookieValByKey('adcamp', 'settime');
        var emailCookie = getCookieValByKey('emktg_mail','settime');
        var remktgCookie = getCookieValByKey('remktg');

        if((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)){
            params.interest_query_ref_text +='|A2HS-PDP';
        }
        
    else{
        if((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)){
            params.interest_query_ref_url +='|A2HS-PDP';
        }
    }
        params.interest_query_ref_text += '|' + btnName; 
        var b = adCookie;
        var c = emailCookie;
        if (b) {
            b = b
        } else {
            b = 0
        }
        if (c) {
            c = c
        } else {
            c = 0
        }
        if ((adCookie) || (emailCookie)) {
            var m = Math.max(b, c);
            if (m == b) {
                params.interest_query_ref_text = query_text + "|" + prodType + "|adcmps=" + adCookie.adcmps + "|adcmpm=" + adCookie.adcmpm + "|adcmp=" + adCookie.adcmp
            } else {
                params.interest_query_ref_text = query_text + "|" + prodType + "|" + emailCookie.val
            }
        }
        if(remktgCookie){
            params.interest_query_ref_text += '|remktg';
            intentGenData.queryText=query_text;
        }
       
        
       
      
           return getData('POST', '/ajaxrequest/enquirybl/generate/intent',params).then(
                (result) => {
                    
                    
                    if (result.statusText == 'ok' && result.response)
                        {imStore.dispatch({ type: 'ENQBL_INTENT_SENT_SUCCESS', success: true, result: result.response });}
                    else
                    imStore.dispatch({ type: 'ENQBL_INTENT_SENT_FAIL', success: false })
                    eventTracking('EnquiryForm', 'Full-Login|'+btnName, intentAction + isLite, true);
                }, (error) => {
                    imStore.dispatch({ type: 'ENQBL_INTENT_SENT_ERR', success: false })
                });
}
}
