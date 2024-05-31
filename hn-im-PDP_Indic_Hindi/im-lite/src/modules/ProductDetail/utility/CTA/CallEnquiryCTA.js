import React from 'react';
import GetEnquiry from '../CTA/GetEnquiry';
import ChatWithSeller from '../ChatWithSeller/ChatWithSeller'
import { getMobileNum } from './helper';
import { CallBtn1 } from '../../../CallNow/views/CallBtn1';
import { A2HSApp, eventTracking } from '../../../../Globals/GaTracking';
import { checkUserStatus} from '../../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../../Globals/CookieManager';
import Shopify from '../Shopify/Shopify';

export default function CallEnquiryCTA(props) {
    let ga = getCookie('_ga');
    let isEvenNumber = false;
    let gaCokyLastDigit= ga?(ga[ga.length-1]):'';
    if((gaCokyLastDigit % 2) == 0){isEvenNumber= true;}

    let gaLastDigit = true;
    let cABTestPDP = '';
    let isABtst = '';
    let isPageNamePDP = window.pagename && window.pagename=="PDP"? true:'';
    if(gaLastDigit && isPageNamePDP){
      isABtst = 1;
    }
    let ABTestVal = (window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
    let numObj = getMobileNum(this.props.data),
    displayName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
    mcatname = this.props.data["BRD_MCAT_NAME"] ? this.props.data["BRD_MCAT_NAME"] : this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
    callNowCalledFrom= this.props.isZoom? this.props.photoGallery ? 'IMOB_PDP_Image_Zoom|Photos_Of_This_Product'+this.props.track+"|": 'IMOB_PDP_Image_Zoom|'+this.props.track+"|": this.props.showVideoPopup? 'IMOB_PDP_Catalog_Info_Video_PopUp|pdp_first_fold|' : this.props.data['LANDING_FROM_SPA'] ? 'IMOB_PDP_First_Fold|IntermediateScreen':'IMOB_PDP_First_Fold|'+this.props.track+"|",
    curntPageLang = this.props.pageLang? this.props.pageLang:'',
    dbTrackText =
    this.props.isExtended ? 
        (this.props.type == 'OnAboutTheSeller' ?
                'IMOB_PDP_Catalog_Info_Extended|' + curntPageLang 
             : this.props.isZoom? 'IMOB_PDP_Image_Zoom_Extended|'+this.props.track+"|"+ curntPageLang :'IMOB_PDP_First_Fold_Extended|'+this.props.track+"|"+ curntPageLang) 
            : (this.props.type == 'OnAboutTheSeller' ? 
                'IMOB_PDP_Catalog_Info|pdp_first_fold|' + curntPageLang : callNowCalledFrom + curntPageLang);
    dbTrackText+=ABTestVal+cABTestPDP;
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
        itemImage:this.props.data["PC_IMG_SMALL_100X100"]?this.props.data["PC_IMG_SMALL_100X100"]:"https://m.imimg.com/gifs/background_image.jpg",
        mbgn_askpopup: "mbgn_askpopup",
        mcatid:this.props.data["BRD_MCAT_ID"]?this.props.data["BRD_MCAT_ID"]:'',
        mcatname: mcatname,
        pagename: "product_detail_extended_PWA|" + this.props.pageLang,
        translatedText: this.props.translatedTxt,
        dbpagetrack: A2HSApp(true) ? dbTrackText + A2HSApp(true)+'-'+(document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbTrackText, 
        widgetTrackCatg: 'Extended_PDP_PWA',
        widgetTrack: 'Main_CTA',
        widgetTrackPage: 'Call',
        callshowtext: this.props.translatedTxt ? this.props.translatedTxt.HEADER_BTN_1 : '',
        page: 'PDP',
        itemName:displayName,
        tscode:this.props.data["ETO_OFR_COMPANY_TSCODE"]?this.props.data["ETO_OFR_COMPANY_TSCODE"]:'',
        eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",        
        eventLabel: this.props.data['LANDING_FROM_SPA'] ?'IntermediatePDPScreen':this.props.eventLabel, 
        PAID_TYPE : this.props.data['URL_TYPE'] ? this.props.data['URL_TYPE'] : ''
    };

    function checkEnquirySentRelated(dispId) {
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

      let isButtonDisabled = checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID);
      let isOneTap= (checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn') && props.isPdpHeader && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && props.data;
      let isOOS=this.props.data.PC_ITEM_STATUS_APPROVAL && this.props.data.PC_ITEM_STATUS_APPROVAL === "9";
    let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
    let showEcom = (isEcomURL && (isEcom && isEcomStoreFlag  == 1))&&!isOOS;

  
  

    return (
        <div className={props.isZoom?"tc pf bt0 w100 pd10 zIn999 bxdowGrn bgw":"tc crx"}>
            {props.isZoom?<><div className='productName tl zoomBottomSubHead' style={this.props.imageLength==0  || this.props.setMorePhotos?'margin-right:35px':''}>
            {props.productName}{this.props.imageLength==0  || this.props.setMorePhotos? props.showShare(isEvenNumber) : ''}</div>
            <div className='tl pdb5'>{props.productPrice}</div></>:''}

        { showEcom ? this.props.HideShopify ? '' : <Shopify pdpData={this.props.data} ClickedFrom={this.props.data['LANDING_FROM_SPA']?'IntermediatePDPScreen':''} isZoom={props.isZoom} isABtst={isABtst} cABTestPDP={cABTestPDP}/> 
        :   <>
        {this.props.calledCTAsFrom =='bottomLayer' && !isButtonDisabled ? '':
                <CallBtn1
                    key={callProps.CONTACT_NUMBER}
                    callText={callProps.call_txt}
                    eventAction={callProps.eventAction+cABTestPDP}
                    eventLabel={callProps.eventLabel}
                    id={'PDPCall'+callProps.itemId}
                    displayPopup={() => {
                    props.callNowClick("कॉल करें",
                    callProps.itemImage.replace(/^http:\/\//i, 'https://'),callProps.tscode, callProps.compname,
                        callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                        callProps.itemId, callProps.itemName,callProps.mcatid,callProps.mcatname,callProps.dbpagetrack, callProps.PAID_TYPE)
                    }} pageName={props.pageName} 
                    onClick={window.clickedOnCallNow=true}
                    isABtst = {isABtst}
                    isButtonDisabled={isButtonDisabled}
                    track={props.track}
                    companyContactNo = {callProps.CONTACT_NUMBER}
                    calledCTAsFrom={this.props.calledCTAsFrom}
                />}
            {isOneTap && !isButtonDisabled ? <ChatWithSeller prodName = {props.prodName}  pageLang={props.pageLang} data={props.data} translatedTxt={props.translatedTxt} isZoom={props.isZoom} isExtendedIndex={props.isExtendedIndex} isExtended={props.isExtended} queryRef={this.props.data['LANDING_FROM_SPA'] ? 'IMOB_PDP_First_Fold | IntermediatePDPScreen' : this.props.photoGallery? props.queryRef+"|Photos_Of_This_Product" : props.queryRef+"|pdp_first_fold"} pageName={props.pageName} cta_name={props.cta_name} btnName={this.props.data['LANDING_FROM_SPA'] ? '|First_Fold|IntermediatePDPScreen' : props.btnName} isABtst = {isABtst}  track={props.track} calledCTAsFrom={this.props.calledCTAsFrom} photoGallery={this.props.photoGallery} />
            : <GetEnquiry toggleEnqCTADisabled = {props.toggleEnqCTADisabled} enqCtaDisabled = {props.enqCtaDisabled} pageLang={props.pageLang} data={props.data} translatedTxt={props.translatedTxt} isZoom={props.isZoom} isExtendedIndex={props.isExtendedIndex} isExtended={props.isExtended} queryRef={this.props.data['LANDING_FROM_SPA'] ? 'IMOB_PDP_First_Fold | IntermediatePDPScreen':props.queryRef? props.queryRef :'IMOB_PDP_First_Fold|pdp_first_fold'} pageName={props.pageName} cta_name={props.cta_name} showModal={props.showModal} pdpModrefType={this.props.pdpModrefType} btnName={props.btnName} eventLabel={callProps.eventLabel} callProps={callProps} isIntermediateScreenVisible={this.props.isIntermediateScreenVisible} isABtst = {isABtst} isButtonDisabled={isButtonDisabled}  track={props.track} calledCTAsFrom={this.props.calledCTAsFrom} photoGallery={this.props.photoGallery}/>}            
            </>
        }  
        </div>
    )
}