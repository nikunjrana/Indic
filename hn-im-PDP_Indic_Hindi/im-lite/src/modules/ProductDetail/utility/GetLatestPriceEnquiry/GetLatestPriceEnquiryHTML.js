import React from 'react';
import "./getLatestPriceEnquiry.css";
import { callEnqForm } from '../CTA/helper';
import { eventTracking } from '../../../../Globals/GaTracking';
import { CallBtn2 } from '../../../CallNow/views/CallBtn2';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import { getMobileNum } from '../CTA/helper';
import { getCookie,getCookieValByKey } from '../../../../Globals/CookieManager';
import { checkUserStatus } from '../../../../Globals/MainFunctions';

var cookieChangeFn = '';
function trackEnquiryEvent(isExtended, evntAction, label, cABTestPDP='') {
    let standardEnqLable = '', identifyUserStatus = '';
    let loginModeArray1 = ["Unidentified", "Identified", "Full-Login"];
    if(window.pageName && window.pageName == "PDP" ) {
        let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
        let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
        let status = checkUserStatus();
        evntAction+=(status>=0 && status<=2 ? loginModeArray[status] : "");
        identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
        standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;
    }
    if (isExtended){
        eventTracking("EnquiryCTA/"+loginModeArray1[checkUserStatus()],"PDP/ExtendedPDP","",true);
        eventTracking("Extended-Product-Page-Clicks", evntAction+cABTestPDP, label+ standardEnqLable, true);
    }
    else {
        let label1=label && label.includes("PhotoGallery")?"Photo-Gallery":"More-Details"
        eventTracking("EnquiryCTA/"+loginModeArray1[checkUserStatus()],"PDP/"+label1,"",true);
        eventTracking("Product-Page-Clicks", evntAction+cABTestPDP, label+ standardEnqLable, true);
    }
}
function callNowClick(callTxt,image,tsCode,name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE='',showRatingFeedback='',setRatingInfo='') {
    let callProps = { callTxt: callTxt,image: image, tsCode: tsCode,companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
    if(showRatingFeedback&&setRatingInfo&&typeof setRatingInfo === "function" && typeof showRatingFeedback === "function" && checkUserStatus() == 2) {
        showRatingFeedback(glusrID);
        setRatingInfo(mcatId,mcatName,itemName,itemId,glusrID,name);
    }
    callNowActionDispatcher(true, callProps);
};

function checkCookie(props) {
    cookieChangeFn = setInterval(function () {
        if (props.enqCtaDisabled != props.data.PC_ITEM_DISPLAY_ID)
        props.toggleEnqCTADisabled(props.data.PC_ITEM_DISPLAY_ID);
    }, 50);
}

export default function InlineEnquiryHTML(props) {
    let ga = getCookie('_ga');
    let gaLastDigit = true;
    let cABTestPDP = '';
    let isABtst = '';
    let isPageNamePDP = window.pagename && window.pagename=="PDP"? true:'';
    if(gaLastDigit && isPageNamePDP){
     isABtst = 1;
    }
    
    let enqDivId = 'CallBkRequest' + props.data.PC_ITEM_DISPLAY_ID;
     if (props.enqCtaDisabled && cookieChangeFn) {
        clearInterval(cookieChangeFn);
     }
    let glUserId = props.data.GLUSR_USR_ID;
    let mcatid = props.data.BRD_MCAT_ID;
    let mcatname = props.data.BRD_MCAT_NAME;
    let GetPdpImg =props.data.PC_ITEM_IMG_SMALL;
    let cmpName = props.data.COMPANYNAME;
    let tscode=props.data.ETO_OFR_COMPANY_TSCODE;
    let pcItemDsplId = props.data.PC_ITEM_DISPLAY_ID;
    let PcItemName = props.data.PC_ITEM_NAME;
    let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    let numObj = getMobileNum(props.data);
    let callProps = {
        im_popup: 'im_popup',tscode:tscode, CONTACT_NUMBER: numObj.num, glusrid: glUserId, CONTACT_TYPE: numObj.type, mbgn_askpopup: 'mbgn_askpopup', call_txt: this.props.translatedText ? this.props.translatedText.HEADER_BTN_1 : "कॉल करें", contact_no: 'contact_no', itemId: pcItemDsplId, mcatid: mcatid, mcatname: mcatname, translatedText: this.props.translatedText,cmpName:cmpName,image:GetPdpImg,
        dbpagetrack: (props.eventAction == "PDP_Company_Info_Enquiry_Sent" ? "IMOB_PDP_Catalog_Info_EnquirySent" :`${props.ispdf?"IMOB_PDP_Prod_Description|Pdf":"IMOB_PDP_Prod_Description"}`) + "|" + langSelection + ""+(window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):""),
        itemName: PcItemName, eventAction: numObj.type == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS", PAID_TYPE: props.data['URL_TYPE'] ? props.data['URL_TYPE'] : ""
    };
    let enquiryCta = (props.enqCtaDisabled && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID)) ?
        <CallBtn2
           ispdf={props.ispdf}
           companyCall={props.companyCall}
            key={callProps.CONTACT_NUMBER}
            callText={callProps.call_txt}
            eventAction={callProps.eventAction+ cABTestPDP}
            eventLabel={props.eventAction}
            filledCallCta={'callonly'}
            callIconforPDPnewCTA={props.callIconforPDPnewCTA}
            pageName={this.props.pageName}
            ShowCallNowAfterEnquiry={true}
            displayPopup={() => {
                callNowClick("कॉल करें",callProps.image,callProps.tscode,callProps.cmpName,
                    callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                    callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack+cABTestPDP+props.track, callProps.PAID_TYPE,props.showRatingFeedback,props.setRatingInfo)
            }}
            isABtst={isABtst} />
        : <span className='LISTING_BTN_1'><i class="enqIcnGreen  dib vam mr2"></i>{this.props.translatedText.LISTING_BTN_1}</span>;

        let enquiryCta_1 = (props.enqCtaDisabled && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID)) ?
        <CallBtn2
        ispdf={props.ispdf}
        ClickedFrom={'ProdDesc'}
            key={callProps.CONTACT_NUMBER}
            callText={callProps.call_txt}
            filledCallCta={'callonly'}
            eventAction={callProps.eventAction+ cABTestPDP}
            eventLabel={props.eventAction}
            pageName={this.props.pageName}
            callIconforPDPnewCTA={props.callIconforPDPnewCTA}
            ShowCallNowAfterEnquiry={true}
            displayPopup={() => {
                callNowClick("कॉल करें",callProps.image,callProps.tscode,callProps.cmpName,
                    callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                    callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack+cABTestPDP+props.track, callProps.PAID_TYPE,props.showRatingFeedback,props.setRatingInfo)
            }}
            isABtst={isABtst} />
        : <span className='LISTING_BTN_1'><i class={`${props.ClickedFrom=='ProdDesc'?"enqIcnAB":`${props.ispdf?"enqIcnAB":"enqIcn"}`} dib vam mr2`}></i>{props.ClickedFrom=='ProdDesc'?"Ask More Details":this.props.translatedText.LISTING_BTN_1}</span>;

    return (
       <button 
        disabled={(props.enqCtaDisabled   && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID))? true:false}   
        className={`${props.ClickedFrom=='ProdDesc'?" bgW pd5b10 bt30":`${props.ispdf?'':"b0"}`} dflex ${props.ispdf?" bxrd20  ifr  poa t7px r5px ":`${props.prodDescAddition?'prodAdditional' : props.prodDescFlag || props.companyInfoFlag?props.isExtended?'pf':`${props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID) ?"mt15p":''}`:'dn'} w100 bgw r0 ma l0 btn_enq`} `} >
            <button id={enqDivId}  
            disabled={ (props.enqCtaDisabled   && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID) ? true : false)}
               onClick={(event) => {
                    (props.toggleEnqCTADisabled && props.enqCtaDisabled != (props.data.PC_ITEM_DISPLAY_ID)) ? checkCookie(props) :'';
            this.props.showModal(
            callEnqForm(props.data, props.pageLang,props.ClickedFrom=='ProdDesc'? "IMOB_PDP_Product_Details|AskMoreDetails|pdp_first_fold":props.queryRef, props.pageName, props.isExtended, props.isExtendedIndex,props.ClickedFrom=='ProdDesc'?'Ask More Details':this.props.cta_name, this.props.pdpModrefType,false,'First_Fold',callProps.CONTACT_TYPE,callProps,cABTestPDP,props.track));
            trackEnquiryEvent(props.isExtended,props.ClickedFrom=='ProdDesc'?"ProductDescription|AskMoreDetails":props.evntAction, props.label, cABTestPDP) }}
            className={props.enqCtaDisabled && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID) ? "w100 por clrw " 
            : ` ${isABtst? `bdrmim ${props.ClickedFrom=='ProdDesc'?"":`${props.ispdf?'bxrd20 ':'bgmim'}`  } `: 'compBl '} ${props.ClickedFrom=='ProdDesc'?" bxrdNR w49 clrmim mr10 fw bgW ":"  "}  ${props.ispdf?"bxrd20 bgW clr57b fs13 pdl5 pdr5": `${props.pdpcompany? "clrw w95 fs15 ma bxrd4":" "} ${props.ClickedFrom=='ProdDesc'?"":" clrw fs15 w100  "}`} pdt12   pdb12   fw por `}>
                {enquiryCta_1}
            </button>
            <button id={enqDivId}  
            disabled={ (props.enqCtaDisabled   && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID) ? true : false)}
               
                onClick={(event) => {
                    (props.toggleEnqCTADisabled && props.enqCtaDisabled != (props.data.PC_ITEM_DISPLAY_ID)) ? checkCookie(props) :'';

            this.props.showModal(
            callEnqForm(props.data, props.pageLang, props.queryRef, props.pageName, props.isExtended, props.isExtendedIndex, props.cta_name, this.props.pdpModrefType,false,'First_Fold',callProps.CONTACT_TYPE,callProps,cABTestPDP,props.track));
            
            trackEnquiryEvent(props.isExtended, props.evntAction, props.label, cABTestPDP) }}
             className={props.enqCtaDisabled && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID) ? "w100 por clrw " 
             : ` ${isABtst? 'bdrmim bgmim ' : 'compBl '} ${props.ClickedFrom=='ProdDesc'?" bxrdNL w49 ":" dn "}  pdt12  pdb12 fs15 fw por clrw ma `}>
                {enquiryCta}
            </button>
            </button> 
         
    )
}