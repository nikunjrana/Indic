import React from 'react';
import { eventTracking, A2HSApp } from '../../../../Globals/GaTracking';
import { getMobileNum } from '../CTA/helper';
import { CallBtn4 } from '../../../CallNow/views/CallBtn4';
import SellerRating from '../SellerRatingsAndReviews/SellerRating';
import { Link } from "react-router";
import getData from '../../../../Globals/RequestsHandler/makeRequest';
import {getCookieValByKey, setCookie} from '../../../../Globals/CookieManager'; 
import { checkUserStatus } from '../../../../Globals/MainFunctions';
import { imStore } from '../../../../store/imStore';
import Shopify from '../Shopify/Shopify';
import GetLatestPriceEnquiry from '../GetLatestPriceEnquiry/GetLatestPriceEnquiryHTML';
import InlineChatWithSeller from '../ChatWithSeller/InlineChatWithSeller';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';

export const setSellerDescriptionTitle = (title, translatedTxt) => {

    let SellerDescriptionTitle = '';
    if (title === 'S') {
        SellerDescriptionTitle = translatedTxt.PDP_LABEL4;
    } else {
        SellerDescriptionTitle = translatedTxt.PDP_LABEL3;
    }
    return SellerDescriptionTitle;

}


export const getSellerDescription = (data) => {


    let yearOfEstablishment = data['GLUSR_USR_YEAR_OF_ESTB'] ? data['GLUSR_USR_YEAR_OF_ESTB'] : '';
    let legalStatus = data['GL_LEGAL_STATUS_VAL'] ? data['GL_LEGAL_STATUS_VAL'] : '';
    let bizType = data['GLUSR_USR_BIZ_TYPE'] ? data['GLUSR_USR_BIZ_TYPE'] : '';
    let numberOfEmp = data['GLUSR_NOOF_EMP_VAL'] ? data['GLUSR_NOOF_EMP_VAL'] : '';
    let turnOver = data['GL_TURNOVER_VAL'] ? data['GL_TURNOVER_VAL'] : '';
    let imMemeberSince = data['GLUSR_USR_MEMBERSINCE'] ? data['GLUSR_USR_MEMBERSINCE'] : '';
    let tradeMembership = data['GLUSR_USR_TRADEMEMBERSHIP'] ? data['GLUSR_USR_TRADEMEMBERSHIP'] : '';
    let glusrFirstName = data['GLUSR_USR_FIRSTNAME'] ? data['GLUSR_USR_FIRSTNAME'] : '';
    let glusrLastName = data['GLUSR_USR_LASTNAME'] ? data['GLUSR_USR_LASTNAME'] : '';
    let deliveryLocation = data['GLUSR_USR_LOC_PREF'] ? data['GLUSR_USR_LOC_PREF'] : '';
    let sellerTitle = data['COMPANYNAME'] ? data['COMPANYNAME'] : '';
    let logoImg = data['GLUSR_USR_LOGO_IMG'] ? data['GLUSR_USR_LOGO_IMG'] : 'https://m.imimg.com/gifs/img/cIcon.png';
    let securedlogoImg = logoImg.replace("http:", "https:");
    let logoUrl = securedlogoImg != '' ? securedlogoImg : '';
    let companyUrl = data['companylink'];
    let video_link = data['GLUSR_PROFILE_MEDIA_URL'] ? data['GLUSR_PROFILE_MEDIA_URL'] : '';
    let pcItemName = data['PC_ITEM_NAME'] ? data['PC_ITEM_NAME'] : '';
    let isProdServ = data['IS_PROD_SERV'] ? data['IS_PROD_SERV'] : '';
    let GLUSR_USR_ID = data['GLUSR_USR_ID'] ? data['GLUSR_USR_ID'] : '';
    let BRD_MCAT_ID = data['BRD_MCAT_ID'] ? data['BRD_MCAT_ID'] : '';
    let PC_ITEM_DISPLAY_ID = data['PC_ITEM_DISPLAY_ID'] ? data['PC_ITEM_DISPLAY_ID'] : '';
    let FOB_PRICE = data['FOB_PRICE'] ? data['FOB_PRICE'] : '';
    let CAT_ID = data['CAT_ID'] ? data['CAT_ID'] : '';
    let DATATYPE = data['CAT_ID'] ? data['DATATYPE'] : '';
    let SELLER_RATING = data['SELLER_RATING'] ? data['SELLER_RATING'] : '';
    turnOver = turnOver.replace(/<br>/gi, "\n");
    turnOver = turnOver.replace(/<(?:.|\s)*?>/g, "");

    return {
        yearOfEstablishment: yearOfEstablishment,
        legalStatus: legalStatus,
        bizType: bizType,
        numberOfEmp: numberOfEmp,
        turnOver: turnOver,
        imMemeberSince: imMemeberSince,
        tradeMembership: tradeMembership,
        glusrFirstName: glusrFirstName,
        glusrLastName: glusrLastName,
        deliveryLocation: deliveryLocation,
        sellerTitle: sellerTitle,
        logoImg: logoUrl,
        companyUrl: companyUrl,
        video_link: video_link,
        pcItemName: pcItemName,
        isProdServ: isProdServ,
        GLUSR_USR_ID: GLUSR_USR_ID,
        BRD_MCAT_ID: BRD_MCAT_ID,
        PC_ITEM_DISPLAY_ID: PC_ITEM_DISPLAY_ID,
        FOB_PRICE: FOB_PRICE,
        CAT_ID: CAT_ID,
        DATATYPE: DATATYPE,
        SELLER_RATING: SELLER_RATING
    }

}

export function checkEnquirySentRelated(dispId) {
    let lsData=JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
        localStorage.removeItem("imEqGl");
        lsData="";
    }
    var e = lsData ? lsData['displayId'] : "undef";
    if (e) {
        var dispIds = e.split(",");
        return dispIds.includes(dispId+'');
    }
    else
        return false;
}
export function callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack,PAID_TYPE='',showRatingFeedback='',setRatingInfo='') {
    let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
    if(showRatingFeedback&&setRatingInfo&&typeof setRatingInfo === "function" && typeof showRatingFeedback === "function" && checkUserStatus() == 2) {
        showRatingFeedback(glusrID);
        setRatingInfo(mcatId,mcatName,itemName,itemId,glusrID,name);
    }
    callNowActionDispatcher(true, callProps);

}
export function isqShowme(data,showCompanyVideo,toggleEnqCTADisabled,pageLang,translatedTxt,showModal,track,isOneTap,enqCtaDisabled,showEcom,props,showRatingFeedback="",setRatingInfo='')
{
    let isButtonDisabled = checkEnquirySentRelated(props.data.PC_ITEM_DISPLAY_ID);
    let pdpData=props.data;
    let eventLabel=isExtended?"PDP_Extended_Company_Info":"PDP_Company_Info";
    let numObj = getMobileNum(pdpData),
    isExtended=props.isExtended,
    mcatname = pdpData["BRD_MCAT_NAME"] ? pdpData["BRD_MCAT_NAME"] : pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
    displayName = pdpData.PC_ITEM_DISPLAY_NAME ? pdpData.PC_ITEM_DISPLAY_NAME : pdpData.PC_ITEM_NAME,
    dbTrackText=isExtended ? ('IMOB_PDP_Catalog_Info_Extended|' + props.pageLang ): ('IMOB_PDP_Catalog_Info'+ (data.lastSeenStatus && data.lastSeenStatus["LastSeen"]==="Online" ? "Online":"")+'|' + props.pageLang);
    dbTrackText+=(window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
    dbTrackText+=props.track;
    let callProps =
    {
        type:"OnAboutTheSeller",
        CONTACT_NUMBER: numObj.num,
        CONTACT_TYPE: numObj.type,
        call_txt: "कॉल करें",
        compname: pdpData['COMPANYNAME'] ? pdpData['COMPANYNAME'] : '',
        contact_no: "contact_no",
        glusrid: pdpData["GLUSR_USR_ID"],
        im_popup: "im_popup",
        itemId: pdpData["PC_ITEM_DISPLAY_ID"],
        itemImage: pdpData["PC_IMG_SMALL_100X100"] ? pdpData["PC_IMG_SMALL_100X100"] : "https://m.imimg.com/gifs/background_image.jpg",
        mbgn_askpopup: "mbgn_askpopup",
        mcatid: pdpData["BRD_MCAT_ID"] ? pdpData["BRD_MCAT_ID"] : '',
        mcatname: mcatname,
        pagename: "product_detail_extended_PWA|" + props.pageLang,
        dbpagetrack:A2HSApp(true) ? dbTrackText + A2HSApp(true)+ '-'+ (document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbTrackText+props.cABTestPDP,
        widgetTrackCatg: 'Extended_PDP_PWA',
        page: 'PDP',
        itemName: displayName,
        tscode: pdpData["ETO_OFR_COMPANY_TSCODE"] ? pdpData["ETO_OFR_COMPANY_TSCODE"] : '',
        eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",        
        eventLabel: eventLabel,
        PAID_TYPE : pdpData['URL_TYPE'] ? pdpData['URL_TYPE'] : '',
    };
    let reviewData = <>
    <p id="isAbt" class="pd10 dflex fw fs17 mxht1000 btmtop mt10 pdt20">Seller Ratings & Reviews</p>
    
<SellerRating data={data} page={'PDP'}/>
</>
let queryRef = 'IMOB_PDP_Catalog_Info' + (window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
    return('');    
// return(<div className='mb10'>
    //     <div className = {isExtended ? 'por' : 'por dflex jstyfyCenter algnCenter btmtop mt15 pdt20'}>
    //     <p id="isAbtSeller" class=" pd10 fw fs17 mxht1000   pdr10">More Details of {data.sellerTitle}</p>
    //     {showEcom?'':<CallBtn4
    //                 key={callProps.CONTACT_NUMBER}
    //                 abtest={true}
    //                 callText={callProps.call_txt}
    //                 callclick={callProps.callclick}
    //                 eventAction={callProps.eventAction+props.cABTestPDP}
    //                 eventLabel={callProps.eventLabel}
    //                 displayPopup={() => {
    //                      callNowClick("कॉल करें",
    //                         callProps.itemImage.replace(/^http:\/\//i, 'https://'), callProps.tscode, callProps.compname,
    //                         callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
    //                         callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack, callProps.PAID_TYPE,showRatingFeedback,setRatingInfo);
    //                 }}
    //                 isAnimated={true}
    //                 callVerticallyAlign={isExtended ? false : true}
    //                 isButtonDisabled={true}
    //                 companyContactNo={callProps.CONTACT_NUMBER}
    //             />}
    //     </div>
    //     <div id={"showme"+ data['PC_ITEM_DISPLAY_ID']} className={`showme`}>
    //     <div id="viewdetail1" class="fs15 pdt5">
    //     {/* {data.deliveryLocation !== '' || undefined ? <div class="row crb prd-tble  dflex  "><p class="column cl75 fs15">Delivery Locations </p><p class="column fs15">{data.deliveryLocation}</p></div> : ''} */}
    //         {data.glusrFirstName !== '' || undefined ? <div class="row crb prd-tble  dflex  "><p class="column cl75 fs15">Seller Name </p><p class="column fs15">{data.glusrFirstName} {data.glusrLastName}</p></div> : ''}
    //         {data.bizType !== '' || undefined ? <div class="row crb prd-tble  dflex  "><p class="column cl75 fs15">Nature of Business</p><p class="column fs15">{data.bizType} {data.exportsTo ?<span>[Exports to {data.exportsTo}]</span>:''}</p></div>: ''}
    //         {data.imMemeberSince !== '' || undefined ?
    //             <div class="row crb prd-tble  dflex "> <p class="column cl75 fs15">IndiaMART Member Since </p><p class="column fs15">{getIMMemeberSinceData(data.imMemeberSince)}</p></div> : ''}
    //         {data.yearOfEstablishment !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Year of Establishment </p><p class="column fs15">{data.yearOfEstablishment}</p></div> : ''}
    //         {data.legalStatus !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Legal Status of Firm </p><p class="column fs15">{data.legalStatus}</p></div> : ''}
    //         {data.numberOfEmp !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Number of Employees </p><p class="column fs15">{data.numberOfEmp}</p></div> : ''}
    //         {data.turnOver !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Annual Turnover </p><p class="column fs15 ">{data.turnOver}</p></div> : ''}

    //         {getStatuatorySellerProfile(data.serviceData['Statutory_Profile'])}

    //         {getBasicSellerProfile(data.serviceData['Basic_Information'])}
    //         {data.countryNames ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Top Export Countries </p><p class="column fs15 ">{data.countryNames}</p></div> : ''}
    //     </div>
    // </div>

    // {
    //                                             data.serviceData.PC_ITEM_IS_ECOM&&showEcom&& data.serviceData.ECOM_ITEM_LANDING_URL? ''
    //                                             :
    //                                             isOneTap && !checkEnquirySentRelated(data.serviceData.PC_ITEM_DISPLAY_ID)? 
                
    //                                             <InlineChatWithSeller
                                                
    //                                                 toggleEnqCTADisabled = {toggleEnqCTADisabled}
    //                                                 enqCtaDisabled = {enqCtaDisabled}
    //                                                 label="Request-Call-Back-MoreSellerDetails" data={data.serviceData} pageLang={pageLang} formId={"latestPriceEnqAbtSelr" + data.serviceData['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_MoreSellerDetails"+track}  pageName={"PDP"} translatedText={translatedTxt} showModal={showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}
    //                                                 btnName={"MoreSellerDetails"} isABtst={true} companyInfoFlag={true}/> 
    //                                                 :
    //                                                 <GetLatestPriceEnquiry
                                                    
    //                                                 toggleEnqCTADisabled = {toggleEnqCTADisabled}
    //                                                 enqCtaDisabled = {enqCtaDisabled}
    //                                                 pdpcompany={true}
    //                                                 callIconforPDPnewCTA={true}
    //                                                 evntAction="GetBestPrice"                                     
    //                                                 label="MoreSellerDetails" data={data.serviceData} pageLang={pageLang} formId={"latestPriceEnqAbtSelr" + data.serviceData['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_MoreSellerDetails|pdp_first_fold"}  pageName={"PDP"} translatedText={translatedTxt} showModal={showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}  eventAction={"PDP_MoreSellerDetails_Enquiry_Sent"} PcItemName={data.serviceData.PC_ITEM_NAME} isCompInfoVisible={true} companyCall={true}  track={track} companyInfoFlag={true} showRatingFeedback={showRatingFeedback} setRatingInfo={setRatingInfo}/>
    //                                             }
    // {showCompanyVideo}

    // { showCompanyVideo ? 
    //                                             data.serviceData.PC_ITEM_IS_ECOM&&showEcom&& data.serviceData.ECOM_ITEM_LANDING_URL? ''
    //                                             :
    //                                             isOneTap && !checkEnquirySentRelated(data.serviceData.PC_ITEM_DISPLAY_ID)? 
                
    //                                             <InlineChatWithSeller
                                                
    //                                                 toggleEnqCTADisabled = {toggleEnqCTADisabled}
    //                                                 enqCtaDisabled = {enqCtaDisabled}
    //                                                 label="Request-Call-Back-CompanyVideo" data={data.serviceData} pageLang={pageLang} formId={"latestPriceEnqAbtSelr" + data.serviceData['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_CompanyVideo"+track}  pageName={"PDP"} translatedText={translatedTxt} showModal={showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}
    //                                                 btnName={"CompanyVideo"} isABtst={true} companyInfoFlag={true}/> 
    //                                                 :
    //                                                 <GetLatestPriceEnquiry
                                                    
    //                                                 toggleEnqCTADisabled = {toggleEnqCTADisabled}
    //                                                 enqCtaDisabled = {enqCtaDisabled}
    //                                                 pdpcompany={true}
    //                                                 callIconforPDPnewCTA={true}
    //                                                 evntAction="GetBestPrice"                                     
    //                                                 label="CompanyVideo" data={data.serviceData} pageLang={pageLang} formId={"latestPriceEnqAbtSelr" + data.serviceData['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_CompanyVideo|pdp_first_fold"}  pageName={"PDP"} translatedText={translatedTxt} showModal={showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}  eventAction={"PDP_CompanyVideo_Enquiry_Sent"} PcItemName={data.serviceData.PC_ITEM_NAME} isCompInfoVisible={true} companyCall={true}  track={track} companyInfoFlag={true} showRatingFeedback={showRatingFeedback} setRatingInfo={setRatingInfo}/>
    //                                             :""}
    // {/* <RelatedMoreProductContainer callProps={callProps} callNowClick={callNowClick} pageName="PDP" id={data.serviceData['PC_ITEM_DISPLAY_ID']} glusrid={data.serviceData.GLUSR_USR_ID} companylink={data.serviceData.companylink} companyname={data.serviceData.COMPANYNAME} num={''} numtype={''} mcatId={data.serviceData.BRD_MCAT_ID} cityId={data.serviceData.CITY_ID} isProdServ={data.serviceData.IS_PROD_SERV} translatedText={data.translatedTxt} eventCategory={"Product-Page-Clicks"} notShowHead= {true}/> */}
    
    // {data && (data.serviceData) && (data.serviceData.RATING_DETAILS) && (data.serviceData.RATING_DETAILS.length!=0)?reviewData:''}
    // {/* {data && (data.serviceData) && (data.serviceData.RATING_DETAILS) && (data.serviceData.RATING_DETAILS.length!=0)?
    //                                             data.serviceData.PC_ITEM_IS_ECOM&&showEcom&& data.serviceData.ECOM_ITEM_LANDING_URL? <Shopify pdpData={data.serviceData} calledFrom={true} ClickedFrom={'CompanyInfo'} /> 
    //                                             :
    //                                             isOneTap && !checkEnquirySentRelated(data.serviceData.PC_ITEM_DISPLAY_ID)? 
                
    //                                             <InlineChatWithSeller
                                                
    //                                                 toggleEnqCTADisabled = {toggleEnqCTADisabled}
    //                                                 enqCtaDisabled = {enqCtaDisabled}
    //                                                 label="Request-Call-Back-Ratings&Review" data={data.serviceData} pageLang={pageLang} formId={"latestPriceEnqAbtSelr" + data.serviceData['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={queryRef+track}  pageName={"PDP"} translatedText={translatedTxt} showModal={showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}
    //                                                 btnName={"Ratings&Review"} isABtst={true} companyInfoFlag={true}/> 
    //                                                 :
    //                                                 <GetLatestPriceEnquiry
                                                    
    //                                                 toggleEnqCTADisabled = {toggleEnqCTADisabled}
    //                                                 enqCtaDisabled = {enqCtaDisabled}
    //                                                 pdpcompany={true}
    //                                                 callIconforPDPnewCTA={true}
    //                                                 evntAction="GetBestPrice"                                     
    //                                                 label="Ratings&Review" data={data.serviceData} pageLang={pageLang} formId={"latestPriceEnqAbtSelr" + data.serviceData['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_Ratings&Review|pdp_first_fold"}  pageName={"PDP"} translatedText={translatedTxt} showModal={showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}  eventAction={"PDP_Ratings&Review_Enquiry_Sent"} PcItemName={data.serviceData.PC_ITEM_NAME} isCompInfoVisible={true} companyCall={true}  track={track} companyInfoFlag={true}/>
    //                                             :""} */}
    // </div>
    //)
}
export const setSellerDeliveryLocation = (data) => {

    let deliveryLocation = data['GLUSR_USR_LOC_PREF'] ? data['GLUSR_USR_LOC_PREF'] : '';
    deliveryLocation = deliveryLocation.toLowerCase();
    if (deliveryLocation !== '') {
        if (deliveryLocation == 'local' && data['CITY'] != '') {
            deliveryLocation = data['CITY'] + " and surrounding areas";
        } else if (deliveryLocation == 'india') {
            deliveryLocation = "All Over India";
        } else if (deliveryLocation == 'foreign') {
            deliveryLocation = "Deals only in Export";
        } else if (deliveryLocation == 'Global') {
            deliveryLocation = "Deals in India as well as Global";
        } else {
            deliveryLocation = "Deals in India as well as Global"
        }
    }
    deliveryLocation = deliveryLocation.replace(/[.,]/gi, "");
    return deliveryLocation;
}





export const getStatuatorySellerProfile = (profileData) => {
    let statprofile = profileData.map(function (query, key) {
        if (query.DATA != '' && query.TITLE !== "GST No.") {
            if (query.TITLE === '/Central Sales Tax No/') {
                query.TITLE = 'Central Sales Tax Number (CST)';
            }

            if (query.TITLE === "CIN No.") {
                query.TITLE = 'Company Identification Number (CIN)';
            }

            if (query.TITLE === "Tan No.") {
                query.TITLE = 'Tax Deduction and Collection Account Number (TAN)';
            }


            if (query.TITLE === "Value Added Tax Registration No") {
                query.TITLE = 'Value Added Tax Registration Number (VAT)';
            }

            if (query.TITLE === "Service Tax Registration No") {
                query.TITLE = 'Service Tax Number';
            }

            if (query.TITLE === "PAN No.") {
                query.TITLE = 'Permanent Account Number (PAN)';
            }

            if (query.TITLE === "Service Tax Registration No") {
                query.TITLE = 'Service Tax Number';
            }

            return (<div class="row crb prd-tble  dflex"><p class="column cl75 fs15">{query.TITLE}</p>
                <p class="column fs15">{query.DATA}</p>
            </div>
            );
        }
    });
    return statprofile;
}




export const getLocalityOfSeller = (locationData, city,district,state) => {
    let locationArray =[locationData, city,district,state];
    let SellerDist = district != ''? district : city;
    sessionStorage.setItem("sellerDist",SellerDist);
    //Removing duplicate items from array
    locationArray = locationArray.filter(function(item, pos) {
        return (item && locationArray.indexOf(item) == pos);
    })
    let locationString= locationArray.join(', ');
    return locationString;

}




export const getBasicSellerProfile = (profileData) => {

    let basicProfileData = profileData.map(function (query, key) {
        if (query.DATA != '' && (query.TITLE === 'Key customers' || query.TITLE === 'Industry' || query.TITLE === 'Standards & Quality Certifications')) {
            return (<div class="row crb prd-tble  dflex"><p class="column cl75 fs15">{query.TITLE}</p>
                <p class="column fs15">{query.DATA}</p>
            </div>
            );
        }
    });
    return basicProfileData;

}

export const getVerificationSealItem = (custtypeWeight, etoOfferCode, getStatusofSeller = false) => {
    let sellerbadge = [];
    let statusOfSeller = '';
    if (etoOfferCode !== '') {
        statusOfSeller = "Trustseal Verified";
        sellerbadge.push(<div class="fs12 clr5a lh18 fw700  mt5 mb5 mr5 flexGrow1"><span class="wh12 dib mr5 fl trustSealSvg bgNorepeat mt2"></span>Trustseal Verified</div>);
    }
    if (custtypeWeight != '' && custtypeWeight >= 200 && custtypeWeight <= 699 && etoOfferCode == '') {
        statusOfSeller = "Verified Plus Supplier";
        sellerbadge.push(<div class="fs12 clr5a lh18 fw700 mt5 mb5 mr5 flexGrow1"><span class="wh12 dib mr5 fl verifiedSvg bgNorepeat mt2"></span>Verified Plus Supplier</div>);
    }
    if (custtypeWeight != '' && custtypeWeight > 699 && custtypeWeight <= 1400 && custtypeWeight != 750 && etoOfferCode == '') {
        statusOfSeller = "Verified Supplier";
        sellerbadge.push(<div class="fs12 clr5a lh18 fw700 mt5 mb5 mr5 flexGrow1"><span class="wh12 dib mr5 fl verifiedSvgGr bgNorepeat mt2"></span>Verified Supplier</div>);
    }

    if(getStatusofSeller==true)
    {
        return statusOfSeller;
    }
    return sellerbadge;

}


export const getIMMemeberSinceData = (IMMemeberSinceData) => {
    var startDate = IMMemeberSinceData.split('-');
    var startYr = startDate[0];
    var startMonth = startDate[1];
    let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
    return monthShortNames[startMonth-1]+' '+ startYr
}


export const modifyImgSrc = (image) => {
    if (typeof image != "undefined" && image != 'no_image' && image != '') {
        image = image.replace(/^http:\/\//i, 'https://');
        image = image.replace('imghost.indiamart.com', '1.imimg.com');
        image = image.replace('imghost1.indiamart.com', '2.imimg.com');
        return image;
    }

}


export const getVidId = (mediaUrl) => {
    let videoId = '',
        video_link = mediaUrl;
    if (/watch\?v\=/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('=') + 1, 11);
    }
    else if (/time_continue\=/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('=',video_link.indexOf('=') + 1 ) + 1, 11);
    }
    else if (/\/\/youtu.be/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('/') + 11)
    } 
    else {
        if (/embed\//.test(video_link)) {
            videoId = video_link.substr(video_link.indexOf('/') + 1, 11)
        }
       
    } return videoId;
}



export const viewMoreAndLessOfAbtTheSeller = (boxId, theDispId, translatedTxt, extendedId, clickedFrom, callback,callback_,companyInfoFlag) => {
    console.log(extendedId)
    if(extendedId || extendedId===0){
if(typeof callback_ === 'function'){callback_(clickedFrom)}
    let sellerDescId = 'sellerDesc' + theDispId, about_box = "about_box" + theDispId, aboutDetail = "aboutDetail" + theDispId, blakbg = "blak" + theDispId, hiddenSectionOfSeller = 'hiddenSectionOfSeller'+ theDispId, crossIcon = "crossAbout" + theDispId, isToggleId = "isToggleAbtSlrId" + theDispId, isAbtTSlr = "isAbtTSlr" + theDispId;
    let aboutbox = document.getElementById(about_box);
    let rect =document.body.getBoundingClientRect();  
    let isIphone = navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0;
    // if (document.getElementById(sellerDescId).style.height !== "0px") {
    if(companyInfoFlag){
        //popup closing handling
        if(typeof callback === 'function'){callback(false)}
        // window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop(): '';
        document.body.style.overflow = '';
        document.body.classList.remove('oh');
    let scrollY = document.body.style.top;
    isIphone?document.body.style.top="":"";
    isIphone?window.scrollTo(0, parseInt(scrollY || '0') * -1):"";

        if (extendedId) {
            eventTracking('Extended-Product-Page-Clicks', 'View-More-Seller-Details', "View-Less-" + extendedId, true)
        } else {
            if (clickedFrom && clickedFrom === "clickedFromLable") {
                eventTracking('Product-Page-Clicks', 'Label-Seller-Details', "View-Less", true);
            } else {
                eventTracking('Product-Page-Clicks', 'View-More-Seller-Details', "View-Less", true);
            }
        }

    } else {
        //popup opening handling
        if(typeof callback === 'function'){callback(true)}
        history.pushState({ type: "somePopUP" }, location.pathname, "");
        window.refUrl ? window.refUrl.push("somePopUp") : "";
        document.body.style.overflow = 'hidden';
        isIphone?"":document.body.classList.add('oh');
        isIphone?document.body.style.top = rect.top+"px":"";
        if (extendedId) {
            eventTracking('Extended-Product-Page-Clicks', 'View-More-Seller-Details', "View-More-" + extendedId, true)
        } else {
            if (clickedFrom && clickedFrom === "clickedFromLable") {
                eventTracking('Product-Page-Clicks', 'Label-Seller-Details', "View-More", true);
            } else {
                eventTracking('Product-Page-Clicks', 'View-More-Seller-Details', "View-More", true)
            }
        }
    }}
    else{
        document.getElementById('isAbtSeller')? document.getElementById('isAbtSeller').scrollIntoView({behavior: 'smooth'}):'';
        if (clickedFrom && clickedFrom === "clickedFromLable") {
            eventTracking('Product-Page-Clicks', 'Label-Seller-Details', "View-More", true);
        } else {
            eventTracking('Product-Page-Clicks', 'View-More-Seller-Details', "View-More", true)
        }
    }
}
export const generateIntent=(intentGenData)=> {
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
        interest_modid: 'IMOB',
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
    
   
   
        getData('POST', '/ajaxrequest/enquirybl/generate/intent',params).then(
            (result) => {
                
                
                if (result.statusText == 'ok' && result.response)
                    {imStore.dispatch({ type: 'ENQBL_INTENT_SENT_SUCCESS', success: true, result: result.response });}
                else
                imStore.dispatch({ type: 'ENQBL_INTENT_SENT_FAIL', success: false })
            }, (error) => {
                imStore.dispatch({ type: 'ENQBL_INTENT_SENT_ERR', success: false })
            });
}

function CompanyCardTracking(extendedId,isIphone,scrollY) {
    

    if (extendedId) {
        eventTracking("Extended-Product-Page-Clicks", "Company-Card-" + extendedId, "Company-Name-" + extendedId, true)
    }
    else {
        eventTracking("Product-Page-Clicks", "Company-Card", "Company-Name", true)
    }
}

export const setAboutTheSellerDescription = (data, isExtended, showVideoPopup, pdpData, extendedId, pageLang, catToTop,callNowClick, showEcom="",cABTestPDP='', callRatingTab, isButtonDisabled='',callclick,onviewmore,companyInfoFlag,setsellerTabClick,sellerTabClick,track) => {
    let numObj = getMobileNum(pdpData),
     isIphone = navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0,
     scrollY = document.body.style.top,
    displayName = pdpData.PC_ITEM_DISPLAY_NAME ? pdpData.PC_ITEM_DISPLAY_NAME : pdpData.PC_ITEM_NAME,
     mcatname = pdpData["BRD_MCAT_NAME"] ? pdpData["BRD_MCAT_NAME"] : pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
     dbTrackText=isExtended ? ('IMOB_PDP_Catalog_Info_Extended|' + pageLang ): ('IMOB_PDP_Catalog_Info'+ (data.lastSeenStatus && data.lastSeenStatus["LastSeen"]==="Online" ? "Online":"")+'|' + pageLang);
    dbTrackText+=(window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
    dbTrackText+=track;
    let userMode = checkUserStatus();
    let loginModeArray = ["Unidentified", "Identified", "FullyIdentified"];
    let intentObj={
        isEnquiry: false,
        productName:  displayName,
        pagename: "PDP",
        mcatId: pdpData["BRD_MCAT_ID"] ? pdpData["BRD_MCAT_ID"] : '',
        queryText:"PDP",
        displayId: "",
        productImage: pdpData["PC_IMG_SMALL_100X100"] ? pdpData["PC_IMG_SMALL_100X100"] : "https://m.imimg.com/gifs/background_image.jpg",
        companyName: pdpData['COMPANYNAME'] ? pdpData['COMPANYNAME'] : '',
        ctaName: "videoIntent",
        affiliationId: "-97",
        userMode: userMode,
        intentType:"16",
        userStatus: loginModeArray[userMode]
      };
    let eventLabel=isExtended?"PDP_Extended_Company_Info":"PDP_Company_Info",
    callProps =
    {
        type:"OnAboutTheSeller",
        CONTACT_NUMBER: numObj.num,
        CONTACT_TYPE: numObj.type,
        call_txt: "कॉल करें",
        compname: pdpData['COMPANYNAME'] ? pdpData['COMPANYNAME'] : '',
        contact_no: "contact_no",
        glusrid: pdpData["GLUSR_USR_ID"],
        im_popup: "im_popup",
        itemId: pdpData["PC_ITEM_DISPLAY_ID"],
        itemImage: pdpData["PC_IMG_SMALL_100X100"] ? pdpData["PC_IMG_SMALL_100X100"] : "https://m.imimg.com/gifs/background_image.jpg",
        mbgn_askpopup: "mbgn_askpopup",
        mcatid: pdpData["BRD_MCAT_ID"] ? pdpData["BRD_MCAT_ID"] : '',
        mcatname: mcatname,
        pagename: "product_detail_extended_PWA|" + pageLang,
        dbpagetrack:A2HSApp(true) ? dbTrackText + A2HSApp(true)+ '-'+ (document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbTrackText+cABTestPDP,
        widgetTrackCatg: 'Extended_PDP_PWA',
        page: 'PDP',
        itemName: displayName,
        tscode: pdpData["ETO_OFR_COMPANY_TSCODE"] ? pdpData["ETO_OFR_COMPANY_TSCODE"] : '',
        eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",        
        eventLabel: eventLabel,
        PAID_TYPE : pdpData['URL_TYPE'] ? pdpData['URL_TYPE'] : '',
        callclick:callclick
    },
    gst = getGST(data.serviceData["Statutory_Profile"]) ,
    ratingDtl = (data.serviceData["RATING_DETAILS"]) ;



    function showContent(id, displayIdd,setsellerTabClick){
        if(id){
            if(id=='aboutUsTab'){
                if(typeof setsellerTabClick === 'function'){setsellerTabClick(id)}
                // document.getElementById('sellerRating'+displayIdd)? document.getElementById('sellerRating'+displayIdd).style.display="none":'';
                // document.getElementById('showme'+displayIdd)? document.getElementById('showme'+displayIdd).style.display="block":'';
                // document.getElementById('midSection'+displayIdd)? document.getElementById('midSection'+displayIdd).style.display="block":'';
                // document.getElementById('hiddenSectionOfSeller'+displayIdd)? document.getElementById('hiddenSectionOfSeller'+displayIdd).style.marginBottom="101px":'';
                // document.getElementById('ratingTab'+displayIdd)? document.getElementById('ratingTab'+displayIdd).classList.remove("activeTb"):'';
            }else{
                if(typeof setsellerTabClick === 'function'){setsellerTabClick(id)}
                // document.getElementById('showme'+displayIdd)? document.getElementById('showme'+displayIdd).style.display="none":'';
                // document.getElementById('sellerRating'+displayIdd)? document.getElementById('sellerRating'+displayIdd).style.display="block":'';
                // document.getElementById('midSection'+displayIdd)? document.getElementById('midSection'+displayIdd).style.display="none":'';
                // document.getElementById('hiddenSectionOfSeller'+displayIdd)? document.getElementById('hiddenSectionOfSeller'+displayIdd).style.marginBottom="101px":'';
                // document.getElementById('aboutUsTab'+displayIdd)? document.getElementById('aboutUsTab'+displayIdd).classList.remove("activeTb"):'';
            }
            // document.getElementById(id + displayIdd)? document.getElementById(id + displayIdd).classList.add("activeTb"):'';
        }
    }
                

    let showRatingTab = data && (data.SELLER_RATING > 0) && (data.serviceData) && (data.serviceData.RATING_DETAILS) && (data.serviceData.RATING_DETAILS.length!=0)? (<div id="ShowTab" className="showTab dflex tc fs15 bxsdw pdt5">
        <div id={"aboutUsTab"+ data['PC_ITEM_DISPLAY_ID']} className={`w50 pd10 ratingTb ${sellerTabClick=='aboutUsTab' || sellerTabClick==''?'activeTb':''}`} onClick={()=>{eventTracking("Product-Page-Clicks","Company-Card","AboutUS-Tab-Clicked",true); showContent('aboutUsTab', data['PC_ITEM_DISPLAY_ID'],setsellerTabClick)}}>ABOUT US</div>
        <div id={"ratingTab"+ data['PC_ITEM_DISPLAY_ID']} className={`w50 pd10 ratingTb ${sellerTabClick=='ratingTab'?'activeTb':''}`} onClick={()=>{eventTracking("Product-Page-Clicks","Company-Card","Ratings-Tab-Clicked",true); showContent('ratingTab', data['PC_ITEM_DISPLAY_ID'],setsellerTabClick)}}>REVIEWS</div>
    </div>):'';
      let IntFlg = ((pdpData.companylink != '' && pdpData.PC_CLNT_FLNAME && pdpData.PC_CLNT_FLNAME != 'new-items.html' && pdpData.PC_CLNT_FLNAME != 'other-services.html' && pdpData.PC_CLNT_FLNAME != 'other-products.html')) ? pdpData.PC_CLNT_FLNAME : '';
      let glid = getCookieValByKey("ImeshVisitor","glid");
      let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
    return (
        <section class="w100">
            <div class="pdl10 pdr10 pdt5 ">
                <div class="por mnht50 mt5 mb5">
                    <div class="bdrC poa oh hw50 bxrd10">

                        {data.modifiedImgSrc != '' ? <img src={data.modifiedImgSrc} alt={data.sellerTitle} class="mxhw imgCnt poa" /> :
                            <picture>
                                <source srcset="https://m.imimg.com/gifs/img/cIcon.webp" type="image/webp" alt={data.sellerTitle} class="mxhw imgCnt poa" />
                                <source srcset="https://m.imimg.com/gifs/img/cIcon.png" type="image/png" alt={data.sellerTitle} class="mxhw imgCnt poa" />
                                <img src="https://m.imimg.com/gifs/img/cIcon.png" alt={data.sellerTitle} class="mxhw imgCnt poa" />
                            </picture>
                        }
                    </div>
                    <div className='mt53 ml10 dib poa'>
                    {!isExtended && data.video_link !== '' && data.video_link != undefined && getVidId(data.video_link) != '' ? <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 461.001 461.001" height="22px" width="22px" style="margin-left: 5px;" className="vam" onClick={() => { eventTracking("Product-Page-Clicks", "About-Seller", "Video-Icon", true);
       userMode!=0?generateIntent(intentObj):''; showVideoPopup(); }}>
                                <path style="fill:#F61C0D;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z">
                                </path>
                            </svg> : ''}
                    </div>
                    <div class={`${onviewmore?' pdl50 ':' pdp '}`}>
                        <p className='mxht1000' >{(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link  onClick={() => {
                            if(data && numObj && pdpData)
                            {
                            let urlType = pdpData && pdpData.URL_TYPE ? pdpData.URL_TYPE.toLowerCase() : '';
                            let cData = {
                                COMPANY_LOGO : pdpData.GLUSR_USR_LOGO_IMG,
                                CATAGORY_ID : pdpData.CAT_ID,
                                CONTACTNO : numObj ? numObj.num : '',
                                CONTACTTYPE : numObj ? numObj.type : '',
                                CONTACTORG : numObj ? numObj.num : '',
                                CATNAME : pdpData.BRD_CAT_NAME,
                                CITYID : pdpData.CITY_ID,
                                DIR_SEARCH_CITY : pdpData.CITY,
                                DIR_SEARCH_COMPANY : pdpData.COMPANYNAME,
                                FCP_FLAG : pdpData.FCP_FLAG,
                                FREESHOWROOM_ALIAS : pdpData.FREESHOWROOM_ALIAS_IM,
                                GLUSR_USR_ADULT_FLAG : pdpData.GLUSR_USR_ADULT_FLAG,
                                GLUSR_USR_LOCALITY : pdpData.LOCALITY,
                                GRP_ID : pdpData.BRD_GRP_ID ,
                                GST : gst[0] ? gst[0].DATA: '',
                                MOBILEVERIFIED : pdpData.MOBILE_VERIFIED,
                                OVERALL_RATING : pdpData.SELLER_RATING && pdpData.SELLER_RATING>=3 ? pdpData.SELLER_RATING : '',
                                PNS_RATIO : data.pnsRatio,
                                PROSERVE : pdpData.BRD_CAT_PRODSERV,
                                SLASH_DIR_SEARCH_COMPANY : pdpData.COMPANYNAME,
                                gluserid : pdpData.GLUSR_USR_ID,
                                URL_TYPE : pdpData.URL_TYPE,
                                BREADCRUMB_MCAT_ID : pdpData.PARENT_MCAT && pdpData.PARENT_MCAT.GLCAT_MCAT_ID ? pdpData.PARENT_MCAT.GLCAT_MCAT_ID : '',
                                PRDSERV : [],
                                STATUSOFSELLER : getVerificationSealItem(data.serviceData['GLUSR_USR_CUSTTYPE_WEIGHT'], data.serviceData['ETO_OFR_COMPANY_TSCODE'],true)             
                            };
                            let ccData = {
                                companyData : cData,
                                companyUrl : data.companylink,   
                                callDbTracking : "company-home-Card-" + urlType,
                                enqDbTracking : "company-homepage-" + urlType + "-cheader-overlay-js",
                                tracking : "Company-IntermedScreen",
                                trackingg : "Home-IntermedScreen",
                                lastSeen : data.lastSeenStatus ? data.lastSeenStatus : '',
                                from : "PDP"


                                // image :   PC_IMG_SMALL_100X100
                            }
                            window.companyTransition =ccData;
                        }
                            CompanyCardTracking(extendedId,isIphone,scrollY);
                            catToTop ? catToTop() : '' ;

                        }} to={"/" + data.companyUrl} ><h2 class="fs15 clrBl por vam fw di notranslate">{data.sellerTitle}</h2></Link> : <a  onClick={()=>{
                            setCookie('intCat',IntFlg , 0.08);
                            window.location.href=("/" + data.companyUrl);
                            CompanyCardTracking(extendedId,isIphone,scrollY);
                            catToTop ? catToTop() : '' ;
                        }} href={"/" + data.companyUrl } ><h2 class="fs15 clrBl por vam fw di notranslate">{data.sellerTitle}</h2></a>} 
                        </p>
                        <div class="clr33 mt5 mb5 fs13 mlm2"><i className="wh13 dib mr2 fl bgNorepeat locationSvg"></i><p className='mxht1000'>
                        {getLocalityOfSeller(data.serviceData['LOCALITY'], data.serviceData['CITY'],data.serviceData['GLUSR_USR_DISTRICT'],data.serviceData['GLUSR_USR_STATE'])} </p>
                        { gst.length>0 ? <div class="fs13 mb5  mt5 clr33"><i class="wh13 dib mr2 fl bgNorepeat gstIcon"></i><p className='mxht1000'>GST-{gst[0].DATA}</p></div> : ''}
                        <p className='mxht1000 blankULSen1'>{data.lastSeenStatus && data.lastSeenStatus["LastSeen"] ? <div class="fs13 mt5 clr33"><span class={"dib vam "+(data.lastSeenStatus["LastSeen"]=="Online" ? "onlineDot":"offlineDot")}>&#8226;</span> {data.lastSeenStatus["LastSeen"]}</div>: ''}</p>
                        </div>  </div>



                    {/* call icon */}
                    {onviewmore?"":showEcom?'':<CallBtn4
                    key={callProps.CONTACT_NUMBER}
                    callText={callProps.call_txt}
                    callclick={callProps.callclick}
                    eventAction={callProps.eventAction+cABTestPDP}
                    eventLabel={callProps.eventLabel}
                    displayPopup={() => {
                         callNowClick("कॉल करें",
                            callProps.itemImage.replace(/^http:\/\//i, 'https://'), callProps.tscode, callProps.compname,
                            callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                            callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack, callProps.PAID_TYPE);
                    }}
                    isAnimated={true}
                    isButtonDisabled={isButtonDisabled}
                    companyContactNo={callProps.CONTACT_NUMBER}

                />}
                </div>
            </div>


            <div className="row crb prd-tble dflex  pdt5 pdb5  jcse bglghtBlue alnItemsCenter">
                {(data.serviceData['ETO_OFR_COMPANY_TSCODE']!='') || (data.serviceData['ETO_OFR_COMPANY_TSCODE']==''&&data.serviceData['GLUSR_USR_CUSTTYPE_WEIGHT']&&data.serviceData['GLUSR_USR_CUSTTYPE_WEIGHT']<=1400) ? 
                    <div className='vam' onClick={()=>callRatingTab(showContent, 'companyStrip')}>
                        {getVerificationSealItem(data.serviceData['GLUSR_USR_CUSTTYPE_WEIGHT'], data.serviceData['ETO_OFR_COMPANY_TSCODE'])}
                    </div>
                :''}
                {(data.SELLER_RATING  && data.SELLER_RATING > 0 ) ? 
                <div className="fs12 mt1 vam" onClick={()=>callRatingTab(showContent)}>
                    <i class="wh12 dib mr5 fl bgNorepeat starSvg"></i>
                    <b>{data.SELLER_RATING}</b><span class="clrb9 fwn ">/5</span>
                </div> : ''}

                {data.pnsRatio? 
                <div className='clr5a mt7 mb5 fs12'  onClick={()=>callRatingTab(showContent, 'companyStrip')}>
                    <i class="wh12 dib mr5 fl bgNorepeat callIconSvg vam"></i>
                    <span class="fw">
                    {data.pnsRatio}%</span> Response Rate 
                </div> : ''}
            </div>

            {isExtended?<div className={`fs15 ppp ${companyInfoFlag?'os htato':'oh ht0'}`} id={"sellerDesc" + data['PC_ITEM_DISPLAY_ID']}>
                {showRatingTab}
            <div id={"showme"+ data['PC_ITEM_DISPLAY_ID']} className={`showme ${sellerTabClick=='aboutUsTab'||sellerTabClick==''?'db':'dn'}`}>
                <div id="viewdetail1" class="fs15 pdt5">
                {/* {data.deliveryLocation !== '' || undefined ? <div class="row crb prd-tble  dflex  "><p class="column cl75 fs15">Delivery Locations </p><p class="column fs15">{data.deliveryLocation}</p></div> : ''} */}
                    {data.glusrFirstName !== '' || undefined ? <div class="row crb prd-tble  dflex  "><p class="column cl75 fs15">Seller Name </p><p class="column fs15">{data.glusrFirstName} {data.glusrLastName}</p></div> : ''}
                    {data.bizType !== '' || undefined ? <div class="row crb prd-tble  dflex  "><p class="column cl75 fs15">Nature of Business</p><p class="column fs15">{data.bizType} {data.exportsTo ?<span>[Exports to {data.exportsTo}]</span>:''}</p></div>: ''}
                    {data.imMemeberSince !== '' || undefined ?
                        <div class="row crb prd-tble  dflex "> <p class="column cl75 fs15">IndiaMART Member Since </p><p class="column fs15">{getIMMemeberSinceData(data.imMemeberSince)}</p></div> : ''}
                    {data.yearOfEstablishment !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Year of Establishment </p><p class="column fs15">{data.yearOfEstablishment}</p></div> : ''}
                    {data.legalStatus !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Legal Status of Firm </p><p class="column fs15">{data.legalStatus}</p></div> : ''}
                    {data.numberOfEmp !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Number of Employees </p><p class="column fs15">{data.numberOfEmp}</p></div> : ''}
                    {data.turnOver !== '' || undefined ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Annual Turnover </p><p class="column fs15 ">{data.turnOver}</p></div> : ''}

                    {getStatuatorySellerProfile(data.serviceData['Statutory_Profile'])}

                    {getBasicSellerProfile(data.serviceData['Basic_Information'])}
                    {data.countryNames ? <div class="row crb prd-tble  dflex "><p class="column cl75 fs15">Top Export Countries </p><p class="column fs15 ">{data.countryNames}</p></div> : ''}
                </div>
            </div>
            <div id={"sellerRating"+ data['PC_ITEM_DISPLAY_ID']} className={`${sellerTabClick=='ratingTab'?'db':'dn'}`}>
            {data && (data.serviceData) && (data.serviceData.RATING_DETAILS) && (data.serviceData.RATING_DETAILS.length!=0) ?<SellerRating data={data} page={'PDP'}/>:''}
            </div>

            </div>:''}
            <p className="crx"></p>
        </section>
    );

}

export const getGST = (statData) => {
    let gst =  statData.filter((item)=>{
        if(item.TITLE==='GST No.' && item.DATA != '')
        return item;
    });
    return gst;
}