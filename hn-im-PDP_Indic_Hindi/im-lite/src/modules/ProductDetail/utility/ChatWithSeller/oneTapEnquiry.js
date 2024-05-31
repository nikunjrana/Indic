
import getData from '../../../../Globals/RequestsHandler/makeRequest'
import { getCookieValByKey } from '../../../../Globals/CookieManager';
import {imStore} from '../../../../store/imStore';




export function oneTapEnquiry(data, pageLang, event, enqDivId, queryRef, pageName, isExtended, isExtendedIndex, ctaName, toggleLoader) {
    queryRef+="|ChatWithSeller";
    let query_text = '';
    if (pageName == "PDP") {
        if (isExtended == true) {
            query_text = queryRef + '|extended' + isExtendedIndex;

        } else {
            query_text = queryRef;
        }

    } else { query_text = 'product_detail_extended_PWA' }    
       
    
    let gip=getCookieValByKey('iploc','gip'),
            gcnm=getCookieValByKey('iploc','gcnnm'),
            glid=getCookieValByKey('ImeshVisitor','glid');
            let params={
                    rfq_mod_ref_type: '',
                    rfq_s_name: getCookieValByKey('ImeshVisitor','fn') ? getCookieValByKey('ImeshVisitor','fn') : '',
                    rfq_s_country_ip: gip,
                    rfq_sender_id: glid,
                    rfq_s_ip_country: gcnm,
                    rfq_S_referrer: window.location.href,
                    rfq_Send_mail_to_receiver: "defer",
                    rfq_mod_id: 'IMOB',
                    rfq_s_city: "",
                    rfq_s_state_id: "",
                    rfq_s_state: "",
                    gluser_id:  data.GLUSR_USR_ID,                    
                    rfq_s_city_id: "",
                    token: "imartenquiryprovider",
                    rfq_s_first_name: getCookieValByKey('ImeshVisitor','fn') ? getCookieValByKey('ImeshVisitor','fn') : '',
                    rfq_query_ref_text: "",
                    rfq_r_email: "m@indiamart.com",
                    rfq_s_country_iso: getCookieValByKey('ImeshVisitor','iso') ? getCookieValByKey('ImeshVisitor','iso') : '',
                    rfq_s_username: getCookieValByKey('ImeshVisitor','fn') ? getCookieValByKey('ImeshVisitor','fn') : '',
                    rfq_modref_id: data.PC_ITEM_DISPLAY_ID ,
                    rfq_desc: "",
                    rfq_application_usage: "",
                    rfq_quantity: "",
                    rfq_quantity_unit: "",
                    rfq_s_email: getCookieValByKey('ImeshVisitor','em') ? getCookieValByKey('ImeshVisitor','em') : '',
                    rfq_order_value: "",
                    rfq_mcat_id: data.BRD_MCAT_ID ? data.BRD_MCAT_ID : '',
                    rfq_modref_type: 2,
                    rfq_in_force_destination: "",
                    rfq_login_mode: 1,
                    rfq_ref_actual_url: (document.referrer).slice(0, 500),
               //     rfq_current_url: (window.location.href + inst1.adcampCookie).slice(0, 500),
                    rfq_ref_url: (window.location.href).slice(0, 500),
                    rfq_cat_id: data.CAT_ID ? data.CAT_ID : '',
                    rfq_s_latitude: getCookieValByKey('iploc', 'GeoLoc_lt')?getCookieValByKey('iploc', 'GeoLoc_lt'):'',
                    rfq_s_longitude: getCookieValByKey('iploc','lg')?getCookieValByKey('iploc','lg'):'',
                    LatLong_Accuracy: getCookieValByKey('iploc','acc')?getCookieValByKey('iploc','acc'):'',
                    rfq_query_ref_text: query_text + '|' + pageLang,
                    rfq_flag:  "",
                    rfq_image_orig:  '',
                    rfq_ofr_img_wh:  '',
                    rfq_image_large:  '',
                    rfq_ofr_limg_wh:  '',
                    rfq_image_medium:  '',
                    rfq_ofr_mimg_wh:'',
                    rfq_image_small: '',
                    rfq_ofr_simg_wh:  '',
                    rfq_searchKwd: '',
                    rfq_product_name: data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME
            }
            params.sender_hash={
                S_name: params.rfq_s_name? params.rfq_s_name: '', 
                S_mobile: params.rfq_s_mobile? params.rfq_s_mobile: '',
                S_city: params.rfq_s_city? params.rfq_s_city: '', 
                S_pin: params.rfq_s_zip? params.rfq_s_zip: '',
                S_glusr_id: params.rfq_sender_id? params.rfq_sender_id: '',
                S_last_name: params.rfq_s_last_name? params.rfq_s_last_name: '',
                S_ccode: params.rfq_s_ccode? params.rfq_s_ccode: '',
                S_website: params.rfq_S_website? params.rfq_S_website: '',
                S_organization: params.rfq_s_company? params.rfq_s_company: '',
                S_phone: params.rfq_s_phone? params.rfq_s_phone: '',
                S_email: params.rfq_s_email? params.rfq_s_email: '', 
                S_country_iso: params.rfq_s_country_iso? params.rfq_s_country_iso: '',
                S_fax: params.rfq_s_fax? params.rfq_s_fax: '',
                S_first_name: params.rfq_s_first_name? params.rfq_s_first_name: '', 
                S_designation: params.rfq_s_designation? params.rfq_s_designation: '',
                S_subject: params.rfq_subject? params.rfq_subject: '', 
                S_country: params.rfq_S_country? params.rfq_S_country: '',
                S_acode: params.rfq_S_acode? params.rfq_S_acode: '',
                S_username: params.rfq_s_username? params.rfq_s_username: '', 
                Send_mail_to_receiver: params.rfq_Send_mail_to_receiver? params.rfq_Send_mail_to_receiver: '', 
                Description: params.rfq_desc? params.rfq_desc: '', 
                S_state: params.rfq_s_state? params.rfq_s_state: '', 
                S_streetaddress: params.rfq_s_add1? params.rfq_s_add1: '',
                S_state_id: params.rfq_s_state_id? params.rfq_s_state_id: '',
                S_city_id: params.rfq_s_city_id ? params.rfq_s_city_id : '',
                S_referrer: params.rfq_S_referrer? params.rfq_S_referrer: '',
            }

            let genEnqResponse;
             getData('POST', '/ajaxrequest/enquirybl/generate/enquiry',params).then(
                (result) => {
                    
                    if (result.statusText == 'ok' && result.response)
                        {
                            console.log(result);
                            imStore.dispatch({ type: 'GENERATE_ENQUIRY_RESPONSE', payload: result });
                            imStore.dispatch({ type: 'SET_IMEQGL_MESSAGES', payload: data.PC_ITEM_DISPLAY_ID });

                            if( result.response && result.response.queryid && result.response.query_destination ){
                                genEnqResponse=result.response;
                            }
                        }

                }, (error) => {
                    console.log(error);
            });
         
    }

