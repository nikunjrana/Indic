import callNowApi from './callNowApi';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { checkip, checkImeshIso } from '../utility/loginHelper';
import { validate_mobile } from '../../../Globals/validationMobileEmail';
import { imStore } from '../../../store/imStore';
import { checkUserLocIso } from '../utility/loginHelper';

export const addC2Ctrack = (inpdata) => {
    let params = new URLSearchParams(window.location.search);
    let utm_campaign = params.get('utm_campaign');
    let catalogTracking = utm_campaign?utm_campaign.includes("CatalogShare") ? "-callback": '':'';
    let [city, identifyBy] = getCookie("userlocName") ? [decodeURIComponent(getCookie("userlocName")).split('||')[0], "userlocName"] : getCookieValByKey('iploc', 'gctnm') ? [getCookieValByKey('iploc', 'gctnm'), "iploc"] : ["", ""];
    let glid = getCookieValByKey('ImeshVisitor', 'glid');
    let data = {
        C2C_RECORD_ID: inpdata.callRecordID ? inpdata.callRecordID : '',
        C2C_MODID: "IMOB",
        C2C_CALLER_GLUSR_ID: glid ? glid.toString() : '',
        C2C_CALLER_EMAIL: getCookieValByKey('ImeshVisitor', 'em'),
        C2C_CALLER_NUMBER: !isNaN(getCookieValByKey('ImeshVisitor', 'mb1'))?getCookieValByKey('ImeshVisitor', 'mb1'):'',
        C2C_CALLER_IP: checkip(),
        C2C_CALLER_COUNTRY_ISO: checkImeshIso(),
        C2C_CALLER_CITY: city,
        C2C_CALLER_LOC_IDENTIFY_BY: identifyBy,
        C2C_RECEIVER_GLUSR_ID: inpdata.glusrID ? inpdata.glusrID.toString() : '',
        C2C_RECEIVER_NUMBER: inpdata.contactNumber,
        C2C_NUMBER_TYPE: (inpdata.contactType == 'PNS') ? 'P' : (inpdata.contactType == 'Landline') ? 'L' : 'M',
        C2C_REFERER_URL: window.location.href,
        C2C_CALL_TIME: inpdata.startTime,
        C2C_CALLER_USERAGENT: navigator.userAgent,
        C2C_PAGE_TYPE: inpdata.pageType+'|'+inpdata.userMode + catalogTracking+(window.whatsAppBl?window.whatsAppBl:""),
        C2C_CLICK_AT: inpdata.callTxt,
        C2C_SMARTPHONE: "1",
        MODREFTYP:inpdata && inpdata.modrefid==""?"6":"5",
        MODREFID: inpdata && inpdata.modrefid ? inpdata.modrefid.toString():"",
        MODREFNAME: inpdata.modrefname,
        // FENQ_ID:"",
        INTEREST_PDATE: inpdata.startTime,
        CALL_DURATION:inpdata && inpdata.callDuration ? inpdata.callDuration.toString() : '',
        C2C_QUERY_REF_ID: inpdata.query_ref_id,
        C2C_QUERY_REF_TYPE: inpdata.query_ref_type,
        // fk_c2c_link_source_type:''
        C2C_RECORD_TYPE: inpdata.pageType.includes("MSG-CONVERSATION-PAGE-Enquiry-Thankyou") ? "2" : "1",   
    
    }
    return (
         callNowApi.addC2Ctrack(data).then(
        (result) => {
            if(result.response && result.response.code == 200 && result.response.c2c_record_id){
                imStore.dispatch({type:'SET_USER_CALLER_ID', c2cId : result.response.c2c_record_id})
            }
            else {
                imStore.dispatch({type:'RESET_USER_CALLER_ID'})
            }
        },
        (error) => dispatch({type:'RESET_USER_CALLER_ID'})
    )
    );
}

export const addTemp= (inpdata) =>{
    let TempCWIData = JSON.parse(localStorage.getItem("CWIData"));
    let [city, identifyBy] = getCookie("userlocName") ? [decodeURIComponent(getCookie("userlocName")).split('||')[0], "userlocName"] : getCookieValByKey('iploc', 'gctnm') ? [getCookieValByKey('iploc', 'gctnm'), "iploc"] : ["", ""];
    let data = {
        C2C_RECORD_UNIDENTIFIED_ID: inpdata.C2C_RECORD_UNIDENTIFIED_ID ? inpdata.C2C_RECORD_UNIDENTIFIED_ID : '', //Compulsory for update case
        C2C_MODID: "IMOB", //Compulsory
        C2C_CALLER_GLUSR_ID: getCookieValByKey('ImeshVisitor', 'glid') ? getCookieValByKey('ImeshVisitor', 'glid').toString() : '',
        C2C_CALLER_EMAIL: getCookieValByKey('ImeshVisitor', 'em')?getCookieValByKey('ImeshVisitor', 'em'):'',
        C2C_CALLER_NUMBER: !isNaN(getCookieValByKey('ImeshVisitor', 'mb1'))?getCookieValByKey('ImeshVisitor', 'mb1'):'',
        C2C_CALLER_IP: checkip(),
        C2C_CALLER_COUNTRY_ISO: checkUserLocIso(),
        C2C_CALLER_CITY: city,
        C2C_CALLER_LOC_IDENTIFY_BY: identifyBy,
        C2C_RECEIVER_GLUSR_ID: inpdata.glusrID ? inpdata.glusrID.toString() : '', //Compulsory for insert case
        C2C_RECEIVER_NUMBER: inpdata.contactNumber,
        C2C_NUMBER_TYPE: (inpdata.contactType == 'PNS') ? 'P' : (inpdata.contactType == 'Landline') ? 'L' : 'M',
        C2C_REFERER_URL: window.location.href,
        C2C_CALL_TIME: inpdata.INSERT_INTO == 'PI' ?'':TempCWIData && TempCWIData.callTime ? TempCWIData.callTime : inpdata.startTime, //Compulsory
        C2C_CALLER_USERAGENT: navigator.userAgent,
        C2C_PAGE_TYPE: inpdata.pageType+'|'+inpdata.userMode+(window.whatsAppBl?window.whatsAppBl:""),
        C2C_CLICK_AT: inpdata.callTxt,
        C2C_SMARTPHONE: "1",
        MODREFTYP:inpdata && inpdata.modrefid==""?"6":"5",
        MODREFID: inpdata && inpdata.modrefid ? inpdata.modrefid.toString():"",
        MODREFNAME: inpdata.modrefname,
        INTEREST_PDATE: '',
        CALL_DURATION:inpdata && inpdata.callDuration ? inpdata.callDuration.toString() : '',
        C2C_QUERY_REF_ID: inpdata.query_ref_id,
        C2C_QUERY_REF_TYPE: inpdata.query_ref_type,
        C2C_RECORD_TYPE: "1",
        C2C_BUYER_GA_COOKIE: inpdata.BUYER_GA_COOKIE, //Compulsory for insert case
        INSERT_INTO: inpdata.INSERT_INTO, //Compulsory
    }
    // inpdata.INSERT_INTO=='PU'?localStorage.removeItem("CWIData"):'';
    if(inpdata.INSERT_INTO=='PU' && !inpdata.C2C_RECORD_UNIDENTIFIED_ID){
        return;
    }
    return (
        callNowApi.addTemp(data).then(
       (result) => {
           let CWIData = JSON.parse(localStorage.getItem("CWIData"));
           if(result.response && result.response.code == 200 && result.response.c2c_record_unidentified_id){
            if(CWIData && inpdata.INSERT_INTO=='PI'){
                CWIData[0][CWIData[0].length-1].c2c_record_unidentified_id=result.response.c2c_record_unidentified_id;
                CWIData[0][CWIData[0].length-1].callTime = result.response.serverDateTime;
                localStorage.setItem("CWIData", JSON.stringify(CWIData));
            }
           }
           else if(CWIData && inpdata.INSERT_INTO=='PI'){
            localStorage.removeItem("CWIData");
           }
       },
       (error) => {}
   )
   );
}

export const readTemp = (inpdata) => {
    let data = {
        c2c_buyer_ga_cookie: getCookie("_ga"),
        c2c_modid: "IMOB"
    }
    return new Promise((resolve, reject) => {
        let no = '';
        callNowApi.readTemp(data).then(
            (result) => {
                if (result.response && result.response.code == 200 && result.response.response) {
                    for (let i = 0; i < Object.keys(result.response.response).length; i++) {
                        if (result.response.response[i].c2c_buyer_probable_number) {
                            no = result.response.response[i].c2c_buyer_probable_number;
                            no = no.replace(/[+]/g, '');
                            if (no.length == 12) {
                                no = no.slice(2, 13);
                            }
                            else if (no.length != 10) {
                                no = '';
                            }

                            let errorMsg = validate_mobile(no);
                            let CWIData = JSON.parse(localStorage.getItem("CWIData"));
                            if (CWIData && no && errorMsg=='') {
                                CWIData[1][0] ? CWIData[1][0].buyer_probable_number=no : CWIData[1].push({buyer_probable_number:no});
                                localStorage.setItem("CWIData", JSON.stringify(CWIData));
                            }
                            break;
                        }
                    }
                }
                resolve(no);
            },
            (error) => { }
        )
    });
}

export const updateTemp = (userStatus) =>{
    let CWIData = JSON.parse(localStorage.getItem("CWIData"));
    if(CWIData && CWIData[0] && getCookie('ImeshVisitor') && checkImeshIso()=="IN"){
        let addTempInterval = setInterval(()=>{
            let CWIData = JSON.parse(localStorage.getItem("CWIData"));
            if(CWIData&&CWIData[0]&&CWIData[0].length>=1 && CWIData[0][CWIData[0].length-1]){
                let  data = { 
                    callTxt: CWIData[0][CWIData[0].length-1].callProps.callTxt,
                    contactNumber: CWIData[0][CWIData[0].length-1].callProps.contactNumber, 
                    glusrID: CWIData[0][CWIData[0].length-1].callProps.glusrID, 
                    contactType: CWIData[0][CWIData[0].length-1].callProps.contactType, 
                    startTime: CWIData[0][CWIData[0].length-1].callTime,
                    modrefid: CWIData[0][CWIData[0].length-1].callProps.modrefid,
                    modrefname: CWIData[0][CWIData[0].length-1].callProps.modrefname,
                    query_ref_id: CWIData[0][CWIData[0].length-1].callProps.query_ref_id,
                    query_ref_type: CWIData[0][CWIData[0].length-1].callProps.query_ref_type,
                    pageType: CWIData[0][CWIData[0].length-1].callProps.dbpagetrack, 
                    userMode:userStatus?userStatus:"Unidentified",
                    INSERT_INTO:"PU",
                    BUYER_GA_COOKIE:getCookie("_ga"),
                    C2C_RECORD_UNIDENTIFIED_ID:CWIData[0][CWIData[0].length-1].c2c_record_unidentified_id
                };
                CWIData[0].pop();
                localStorage.setItem("CWIData", JSON.stringify(CWIData));
                addTemp(data);
            }
            else{
                localStorage.removeItem("CWIData");
                clearInterval(addTempInterval);
            }
        },500)
    }
}