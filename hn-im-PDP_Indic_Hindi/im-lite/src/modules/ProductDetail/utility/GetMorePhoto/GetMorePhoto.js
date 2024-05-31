import React from 'react';
import "./GetMorePhoto.css";
import { callEnqForm } from '../CTA/helper';
import { eventTracking } from '../../../../Globals/GaTracking';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
import { getMobileNum } from '../CTA/helper';
import { A2HSApp } from '../../../../Globals/GaTracking';

export default function GetMorePhoto(props) {
    let ABTestVal = (window.pagename && window.pagename == "PDP" && window.TestIdArr && window.TestIdArr.length > 0 ? "|" + window.TestIdArr.join("|") : ""); let cABTestPDP = ''; let numObj = getMobileNum(this.props.data),
        displayName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
        mcatname = this.props.data["BRD_MCAT_NAME"] ? this.props.data["BRD_MCAT_NAME"] : this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
        callNowCalledFrom = this.props.isZoom ? 'IMOB_PDP_Image_Zoom|' + this.props.track + "|" : this.props.showVideoPopup ? 'IMOB_PDP_Catalog_Info_Video_PopUp|pdp_first_fold|' : this.props.data['LANDING_FROM_SPA'] ? 'IMOB_PDP_First_Fold|IntermediateScreen' : 'IMOB_PDP_First_Fold|' + this.props.track + "|",
        curntPageLang = this.props.pageLang ? this.props.pageLang : '',
        dbTrackText = this.props.isExtended ? (this.props.type == 'OnAboutTheSeller' ? 'IMOB_PDP_Catalog_Info_Extended|' + curntPageLang
            : this.props.isZoom ? 'IMOB_PDP_Image_Zoom_Extended|' + this.props.track + "|" + curntPageLang : 'IMOB_PDP_First_Fold_Extended|' + this.props.track + "|" + curntPageLang) : (this.props.type == 'OnAboutTheSeller' ? 'IMOB_PDP_Catalog_Info|pdp_first_fold|' + curntPageLang : callNowCalledFrom + curntPageLang);
    dbTrackText += ABTestVal + cABTestPDP;

    let callProps =
    {
        CONTACT_NUMBER: numObj.num,
        CONTACT_TYPE: numObj.type,
        call_txt: this.props.translatedTxt ? this.props.translatedTxt.HEADER_BTN_1 : "कॉल करें",
        compname: this.props.data['COMPANYNAME'] ? this.props.data['COMPANYNAME'] : '',
        contact_no: "contact_no",
        glusrid: this.props.data["GLUSR_USR_ID"],
        im_popup: "im_popup",
        itemId: this.props.data["PC_ITEM_DISPLAY_ID"],
        itemImage: this.props.data["PC_IMG_SMALL_100X100"] ? this.props.data["PC_IMG_SMALL_100X100"] : "https://m.imimg.com/gifs/background_image.jpg",
        mbgn_askpopup: "mbgn_askpopup",
        mcatid: this.props.data["BRD_MCAT_ID"] ? this.props.data["BRD_MCAT_ID"] : '',
        mcatname: mcatname,
        pagename: "product_detail_extended_PWA|" + this.props.pageLang,
        translatedText: this.props.translatedTxt,
        dbpagetrack: A2HSApp(true) ? dbTrackText + A2HSApp(true) + '-' + (document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbTrackText,
        widgetTrackCatg: 'Extended_PDP_PWA',
        widgetTrack: 'Main_CTA',
        widgetTrackPage: 'Call',
        callshowtext: this.props.translatedTxt ? this.props.translatedTxt.HEADER_BTN_1 : '',
        page: 'PDP',
        itemName: displayName,
        tscode: this.props.data["ETO_OFR_COMPANY_TSCODE"] ? this.props.data["ETO_OFR_COMPANY_TSCODE"] : '',
        eventAction: numObj.type == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS",
        eventLabel: this.props.data['LANDING_FROM_SPA'] ? 'IntermediatePDPScreen' : this.props.eventLabel,
        PAID_TYPE: this.props.data['URL_TYPE'] ? this.props.data['URL_TYPE'] : ''
    };


    let checkEnqStatus = (this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.data.PC_ITEM_DISPLAY_ID)) ? true : false;
    let textType = this.props.pdpServiceType ? "Quote" : 'Photos'
    let gMPhotoText = this.props.checkEnqStatus ? (textType+ ' Requested') : (this.props.pdpServiceType ? 'Get Free Quote' : "Get More Photos");
    let serviceType=this.props.pdpServiceType?"|FreeQuote":'';
    let ctaDisabledClr = { color: '#777', border: '1px solid #777', opacity: '0.8' }
    let setMsgForGMPhoto = this.props.pdpServiceType ? 'Please send me free quote of ' + displayName : 'Please send me the latest photos of ' + displayName;    let isZoomcheck = props.checkCall == 'isZoom' ? true : false;
    let showCtaGMP = (<button id="getmorephotoss" style={checkEnqStatus ? ctaDisabledClr : ''} disabled={checkEnqStatus} className={`${props.checkCall == 'noZoom' ? 'ctaAlignCSR zIn100 fs12 poa' : 'ctaAlignZoom z1000 fadeInItem2s fs14 pf'} tc bdrmim clrmim fw getPhotoCTa`}
        name="FirstFoldGMPhoto"
        onClick={() => {

            this.props.checkEnqInitiator ? this.props.checkEnqInitiator(true) : '';
            hitGetMorePhotoTracking(isZoomcheck,serviceType);
            requestAnimationFrame(()=>setTimeout(()=>{this.props.showModal(callEnqForm(this.props.data, this.props.pageLang, this.props.queryRef, this.props.pageName, this.props.isExtended, this.props.isExtendedIndex, this.props.cta_name, this.props.pdpModrefType, this.props.isZoom, this.props.btnName, this.props.eventLabel, callProps, cABTestPDP, this.props.track, setMsgForGMPhoto));}))
        }}>
        <i className={`${checkEnqStatus ? 'gmPhotoIconGrey ' : 'gmPhotoIcon '} vam mr2 dib lnHt8`}></i>
        <span className='dib vam'>{gMPhotoText}</span>
    </button>)
    return (!checkEnqStatus ? showCtaGMP : '')
}

function hitGetMorePhotoTracking(callingFrom,serviceType) {
    let isZoomCalled = callingFrom ? '_Zoom' : '';
    let evntLabel = '';
    let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
    let status = checkUserStatus();
    evntLabel = (status >= 0 && status <= 2 ? isLoginMode[status] : "");
    eventTracking('Product-Page-Clicks', 'GetMorePhotos'+(serviceType) + isZoomCalled, 'EnquiryCTA|PDP|' + evntLabel, true);
}