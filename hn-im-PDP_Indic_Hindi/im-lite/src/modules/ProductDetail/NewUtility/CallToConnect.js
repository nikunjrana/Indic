import React from "react";
import { getMobileNum } from "../utility/helper";
import { eventTracking } from "../../../Globals/GaTracking";

export const CallToConnect=(props) =>{
    let numObj = getMobileNum(props.data);
    let curntPageLang = props.pageLang? props.pageLang:''
    let dbTrackText ='IMOB_PDP_Message_Widget|'+curntPageLang+`${props.track?props.track:""}`;              
    let callProps = {
        im_popup: 'im_popup',
        CONTACT_NUMBER: numObj.num,
        CONTACT_TYPE: numObj.type,
        glusrid: props.data.GLUSR_USR_ID,
        mbgn_askpopup: 'mbgn_askpopup',
        call_txt:"कॉल करें",
        contact_no: 'contact_no',
        itemId: props.data.PC_ITEM_DISPLAY_ID,
        itemImage:props.data["PC_IMG_SMALL_100X100"]?props.data["PC_IMG_SMALL_100X100"]:"https://m.imimg.com/gifs/background_image.jpg",
        mcatid:props.data.BRD_MCAT_ID,
        mcatname: props.data.BRD_MCAT_NAME,
        translatedText:props.translatedTxt?props.translatedTxt:'',
        compname:props.data.COMPANYNAME,
        pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '',
        dbpagetrack: dbTrackText, 
        widgetTrackCatg: 'PDP_PWA',
        widgetTrack: 'Messenger_CTA',
        widgetTrackPage: 'Call',
        callshowtext: props.translatedTxt ? props.translatedTxt.HEADER_BTN_1 : '',
        page: 'PDP',
        itemName: props.data.PC_ITEM_DISPLAY_NAME ? props.data.PC_ITEM_DISPLAY_NAME : props.data.PC_ITEM_NAME,
        eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",  
        eventLabel:"Message_Widget|PDP",    
        tscode:props.data["ETO_OFR_COMPANY_TSCODE"]?props.data["ETO_OFR_COMPANY_TSCODE"]:'',
        PAID_TYPE : props.data['URL_TYPE'] ? props.data['URL_TYPE'] : ''};

        return(
          <div className='dflex algnCenter jcsb pdl10  ma mt10'>
          <span className='por w50 mr10 tl fs14 fw'>You can also Connect with seller instantly</span>
          <div className='por w50'>
            <span onClick={()=>{{props.callNowClick("कॉल करें",
                    callProps.itemImage.replace(/^http:\/\//i, 'https://'),callProps.tscode, callProps.compname,
                        callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                        callProps.itemId, callProps.itemName,callProps.mcatid,callProps.mcatname,callProps.dbpagetrack, callProps.PAID_TYPE)
                    };eventTracking("Click-To-Call",callProps.eventAction,callProps.eventLabel, true)}} className='algnCenter tl pd10 bdrmim bxrd20 bgw fs14 dflex jstyfyCenter clrmim fw'><i className='callIcnBig1 mr5'></i><p>Call to Connect</p></span>
            </div>
          </div>
        )
  }