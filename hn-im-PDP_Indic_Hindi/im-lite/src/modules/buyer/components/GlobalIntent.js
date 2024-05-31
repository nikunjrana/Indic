import getData from '../../../Globals/RequestsHandler/makeRequest';
import { getCookie,getCookieValByKey } from '../../../Globals/CookieManager';

let globalIntentAndBl={
     generateIntent(intentGenData) {
    let gip=getCookieValByKey('iploc','gip'),
    gcnm=getCookieValByKey('iploc','gcnnm'),
    gcniso=getCookieValByKey('iploc','gcniso'),
    glid=getCookieValByKey('ImeshVisitor','glid');
    var prodType = intentGenData.CefProdType ? intentGenData.CefProdType : "P";
    var params = {
        interest_current_url: (window.location.href).slice(0, 500),
        interest_modreftype: intentGenData.modRefType?intentGenData.modRefType:'',
        interest_modrefid: intentGenData.displayId?intentGenData.displayId:'',
        interest_sender_ip: gip,
        interest_mail_send: "",
        interest_sender_glusr_id: glid?glid.toString():'',
        interest_sender_ip_country: gcnm,
        interest_sender_ip_country_iso: gcniso,
        interest_modid: 'EMKTG',
        interest_rcv_glusr_id: intentGenData.receiverUserId?intentGenData.receiverUserId.toString():'',
        interest_product_name: intentGenData.productName?intentGenData.productName:'',
        interest_sender_first_name: getCookieValByKey('ImeshVisitor','fn') ? getCookieValByKey('ImeshVisitor','fn') : '',
        interest_cat_id: intentGenData.catId?intentGenData.catId:'',
        interest_mcat_id: intentGenData.mcatId?intentGenData.mcatId.toString():'',
        interest_usr_login_mode: intentGenData.userMode!=undefined?intentGenData.userMode.toString():'',
        interest_s_long: getCookieValByKey('iploc','lg')?getCookieValByKey('iploc','lg'):'',
        interest_s_lat: getCookieValByKey('iploc', 'GeoLoc_lt')?getCookieValByKey('iploc', 'GeoLoc_lt'):'',
        interest_latlong_accuracy: getCookieValByKey('iploc','acc')?getCookieValByKey('iploc','acc'):'',
        interest_query_ref_url: (window.location.href+"##"+intentGenData.queryText+ "|" + intentGenData.userStatus), 
        interest_query_actual_url: (document.referrer).slice(0, 500),
        interest_type: intentGenData.intentType?intentGenData.intentType:''
    };
    params.interest_query_ref_text = intentGenData.queryText + "|" + prodType + "|" + intentGenData.userStatus;
    var adCookie = getCookieValByKey('adcamp', 'settime');
    var emailCookie = getCookieValByKey('emktg_mail','settime');
    var remktgCookie = getCookieValByKey('remktg');
    if(intentGenData.isEnquiry){
    if((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)){
        params.interest_query_ref_text +='|A2HS-'+intentGenData.pagename;
    }
}
else{
    if((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)){
        params.interest_query_ref_url +='|A2HS-'+intentGenData.pagename;
    }
}
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
            params.interest_query_ref_text = intentGenData.queryText + "|" + prodType + "|adcmps=" + adCookie.adcmps + "|adcmpm=" + adCookie.adcmpm + "|adcmp=" + adCookie.adcmp
        } else {
            params.interest_query_ref_text = intentGenData.queryText + "|" + prodType + "|" + emailCookie.val
        }
    }
    if(remktgCookie){
        params.interest_query_ref_text += '|remktg';
        intentGenData.queryText=param.interest_query_ref_text;
    }
    if (!intentGenData.isEnquiry) {
            params.interest_query_ref_url = window.location.href + "##" + intentGenData.queryText + "|" + intentGenData.userStatus;
        
    }
    
   
    return (dispatch) => {
        getData('POST', '/ajaxrequest/enquirybl/generate/intent',params).then(
            (result) => {
                
                
                if (result.statusText == 'ok' && result.response)
                    {dispatch({ type: 'ENQBL_INTENT_SENT_SUCCESS', success: true, result: result.response });}
                else
                    dispatch({ type: 'ENQBL_INTENT_SENT_FAIL', success: false })
            }, (error) => {
                dispatch({ type: 'ENQBL_INTENT_SENT_ERR', success: false })
            });
    }
},
 generateBl(enqGenData,imgPath="",imgWidth_Height="") {
    let gip=getCookieValByKey('iploc','gip'),
    gcnm=getCookieValByKey('iploc','gcnnm'),
    gcniso=getCookieValByKey('iploc','gcniso'),
    glid=getCookieValByKey('ImeshVisitor','glid');
    let productType= enqGenData.productType?enqGenData.productType:'P'
    let params = {
        rfq_mod_ref_type :'',
        rfq_s_name:  getCookieValByKey('ImeshVisitor','fn') ? (getCookieValByKey('ImeshVisitor','fn') +  (getCookieValByKey('ImeshVisitor','ln')? " "+getCookieValByKey('ImeshVisitor','ln'):"")): enqGenData.truecallerName?enqGenData.truecallerName:'',
        rfq_s_country_ip: gip,
        rfq_sender_id: glid ? glid.toString() : '',
        rfq_s_ip_country: gcnm,
        rfq_S_referrer: window.location.href,
        rfq_Send_mail_to_receiver: "defer",
        rfq_mod_id: 'EMKTG',
        rfq_s_city: enqGenData.city?enqGenData.city:!getCookieValByKey('ImeshVisitor','ctid')?window.cityEnq?window.cityEnq:"":"",
        rfq_s_state_id: enqGenData.stateId?enqGenData.stateId:'',
        rfq_s_state: enqGenData.state?enqGenData.state:!getCookieValByKey('ImeshVisitor','ctid') ?getCookie('gstate')?getCookieValByKey('gstate','state')?getCookieValByKey('gstate','state'):"":"":"",
        rfq_r_glusr_usr_id: enqGenData.receiverUserId?enqGenData.receiverUserId.toString():'',
        rfq_s_city_id: getCookieValByKey('ImeshVisitor','ctid') ? getCookieValByKey('ImeshVisitor','ctid') : window.cityId?window.cityId:"",
        rfq_s_first_name: getCookieValByKey('ImeshVisitor','fn') ? getCookieValByKey('ImeshVisitor','fn') : enqGenData.truecallerName?enqGenData.truecallerName:'',
        rfq_r_email: "m@indiamart.com",
        rfq_s_country_iso: getCookieValByKey('ImeshVisitor','iso') ? getCookieValByKey('ImeshVisitor','iso') : '',
        rfq_s_username: getCookieValByKey('ImeshVisitor','fn') ? (getCookieValByKey('ImeshVisitor','fn') +  (getCookieValByKey('ImeshVisitor','ln')? " "+getCookieValByKey('ImeshVisitor','ln'):"")): enqGenData.truecallerName?enqGenData.truecallerName:'',
        rfq_s_email:getCookieValByKey('ImeshVisitor','em') ? getCookieValByKey('ImeshVisitor','em') : '',
        rfq_modref_id: enqGenData.displayId?enqGenData.displayId:'',
        rfq_desc: enqGenData.description?enqGenData.description:'',
        rfq_application_usage: enqGenData.usage?enqGenData.usage:'',
        rfq_quantity: enqGenData.quantity?enqGenData.quantity:'',
        rfq_quantity_unit:enqGenData.quantityUnit?enqGenData.quantityUnit:'',
        rfq_order_value: enqGenData.totalOrderValue?enqGenData.totalOrderValue:'',
        rfq_mcat_id: enqGenData.mcatId?enqGenData.mcatId.toString():'',
        rfq_modref_type: enqGenData.modRefType?enqGenData.modRefType:'',
        rfq_in_force_destination: "",
        rfq_login_mode: enqGenData.userMode!=undefined?enqGenData.userMode.toString():'',
        rfq_ref_actual_url: (document.referrer).slice(0, 500),
        rfq_current_url: (window.location.href).slice(0, 500),
        rfq_ref_url: document.referrer + "|" + enqGenData.queryText + "|" + productType + "|" + enqGenData.userStatus,
        rfq_cat_id: enqGenData.catId?enqGenData.catId:'-1',
        rfq_s_latitude: getCookieValByKey('iploc', 'GeoLoc_lt')?getCookieValByKey('iploc', 'GeoLoc_lt'):'',
        rfq_s_longitude: getCookieValByKey('iploc','lg')?getCookieValByKey('iploc','lg'):'',
        LatLong_Accuracy: getCookieValByKey('iploc','acc')?getCookieValByKey('iploc','acc'):'',
        rfq_query_ref_text: enqGenData.queryText + "|" + productType + "|" + enqGenData.userStatus,
        rfq_image_orig:imgPath?"https://documents.imimg.com/"+imgPath:enqGenData.imageOrig?enqGenData.imageOrig:'',
        rfq_ofr_img_wh:imgWidth_Height?imgWidth_Height:enqGenData.imageOrigWH?enqGenData.imageOrigWH:'',
        rfq_image_large:imgPath?"https://documents.imimg.com/"+imgPath:enqGenData.imageLarge?enqGenData.imageLarge:'',
        rfq_ofr_limg_wh:imgWidth_Height?imgWidth_Height:enqGenData.largeImgWH?enqGenData.largeImgWH:'',
        rfq_image_medium:imgPath?"https://documents.imimg.com/"+imgPath:enqGenData.imageMedium?enqGenData.imageMedium:'',
        rfq_ofr_mimg_wh:imgWidth_Height?imgWidth_Height:enqGenData.mediumImgWH?enqGenData.mediumImgWH:'',
        rfq_image_small:imgPath?"https://documents.imimg.com/"+imgPath:enqGenData.imageSmall?enqGenData.imageSmall:'',
        rfq_ofr_simg_wh:imgWidth_Height?imgWidth_Height:enqGenData.smallImgWH?enqGenData.smallImgWH:'',
        rfq_product_name: enqGenData.productName?enqGenData.productName:'',
        rfq_ref_url: window.location.href + "##" + enqGenData.queryText + "|" + enqGenData.userStatus,
        token: "imartblprovider",
        rfq_flag: enqGenData.flag?enqGenData.flag:'I',
        rfq_subject: enqGenData.productName?enqGenData.productName:'',
        rfq_status: "W",
        rfq_type: "B",
        rfq_prod_serv: productType,
        rfq_comp_param: "OFR_TITLE,OFR_DESC",
        rfq_s_continent_id: 1,
        rfq_ref_url: window.location.href + "##" + enqGenData.queryText + "|" + enqGenData.userStatus,
        rfq_s_phone_country_code: "91",
        rfq_affiliation_id: enqGenData.affiliationId?enqGenData.affiliationId:'-43',
        rfq_s_ofr_id:enqGenData.offerId?enqGenData.offerId:'',
        rfq_searchKwd:enqGenData.searchKwd?enqGenData.searchKwd:''
    };
   

    if((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)){
        params.rfq_ref_url? params.rfq_ref_url+='|A2HS-'+enqGenData.pagename :'';
        params.rfq_query_ref_text ? params.rfq_query_ref_text+='|A2HS-'+enqGenData.pagename :'';
    }
    
    return (dispatch) => {
        getData('POST', '/ajaxrequest/enquirybl/generate/bl',params).then(
            (result) => {
                if (result.statusText == 'ok' && result.response)
                    {
                        dispatch({ type: 'ENQBL_BL_SENT_SUCCESS', success: true, result: result.response }); 
                        let glid=(getCookieValByKey('ImeshVisitor','glid'));
                        if(window.pageName && window.pageName=="Standard-Product" && enqGenData) {
                            glid="BL"+glid;
                        }
                        dispatch({type:'SET_IMEQGL', success:true, result:glid});
                        let mblData= {	
                            mcatId:enqGenData.mcatId,	
                            offerId:result.response.ofr,	
                        }	
                        enqGenData.mBl && enqGenData.mcatId ? dispatch({type:'SET_MBL', success:true, result:mblData}) :'';
                    }
                else
                    dispatch({ type: 'ENQBL_BL_SENT_FAIL', success: false })
            }, (error) => {
               
                dispatch({ type: 'ENQBL_BL_SENT_ERR', success: false })
            });
    }
}
}
export default globalIntentAndBl;