import '../css/callBtnCommon1.css'
import { eventTracking } from '../../../Globals/GaTracking';
import React from "react";
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { getMobileNum } from '../../ProductDetail/utility/CTA/helper';

export const CallBtn4 = (props) =>{
    
    let isButtonDisabled =  props.isButtonDisabled? props.isButtonDisabled:'';

    return(
        <div id={props.id} className={props.callVerticallyAlign ? 'mr10 mla': ''} >
            <span  data-click={props.dataClick ? props.dataClick :""} className={props.callVerticallyAlign ? " db bdrmim  oh hw50  bxrd10 bgmim por ": `bdrmim  oh ${props.callEnquiry?"hw40 mr10 mt5":(props.eventLabel=="IMOB_PDP_6PVPopUp" || props.eventLabel=="IMOB_Company-Category_6PVPopUp") ? "hw45 db":"hw50"}  bxrd10  poa mr3  bgmim ${props.abtest?' rt10 t5':'tp0 rt0 '}`}
            onClick={() =>{props.displayPopup();
            props.callclick?props.callclick():'';
            let eventLabel = props.eventLabel;
            if(window.pageName && window.pageName == "PDP" ) {
                let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                let status = checkUserStatus();
                eventLabel+=(status>=0 && status<=2 ? loginModeArray[status] : "");
                eventLabel+=props.abtest?'|title|':''
            }
            let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
            let usermode = loginModes[checkUserStatus()];
            let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
            eventTracking("Click-To-Call",props.eventAction,eventLabel+`|${usermode}|${verfStatus}`,true)}}>
                {(checkUserStatus()!=0) &&isButtonDisabled||props.isButtonDisabled&& props.isAnimated?
                <>
                <span className='phone'>
                <span class="mxhw imgCnt poa wCallIcon"></span>
                </span>
                {props.companyContactNo ? <span id="pns1" class="dn">{props.companyContactNo}</span>:""}
                </>
                :<><span className="mxhw imgCnt poa wCallIcon">
                </span>
                {props.companyContactNo ? <span id="pns1" class="dn">{props.companyContactNo}</span>:""}
                </>
                
                
                }
            </span>
        </div>
    );
}

export const CallBtnOnText = (props) => {
    let isButtonDisabled = props.isButtonDisabled ? props.isButtonDisabled : '';

    return (
            <span id={props.id} 
                className={`bdrmim bgw bxrd10 clrmim fs12 fw pdb7 pdl5 pdt7 pr10 tc z1 mt2 notranslate ${props.eventLabel=="IMOB_PDP_6PVPopUp" || props.eventLabel=="IMOB_Company-Category_6PVPopUp" ? 'wfc' :'poa rt0 tp0'}`}
                onClick={() => {
                    props.displayPopup();
                    props.callclick ? props.callclick() : '';
                    let eventLabel = props.eventLabel;
                    if (window.pageName && window.pageName == "PDP") {
                        let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                        let status = checkUserStatus();
                        eventLabel += (status >= 0 && status <= 2 ? loginModeArray[status] : "");
                        
                    }
                    let loginModes = { 0: 'Unidentified', 1: 'Identified', 2: 'Full-Login', 3: 'Unidentified-Existing' };
                    let usermode = loginModes[checkUserStatus()];
                    let verfStatus = getCookie("ImeshVisitor") && getCookieValByKey('ImeshVisitor', 'uv') == 'V' ? "Verified" : "Non-Verified";
                    eventTracking("Click-To-Call", props.eventAction, eventLabel + `|${usermode}|${verfStatus}`, true)
                }}>

                {(checkUserStatus() != 0) && isButtonDisabled || props.isButtonDisabled && props.isAnimated ?
                    <>
                        <span className='phoneIconGreen mr2 dib vam'></span>
                        <span className="dib vam">{`${props.eventLabel=="IMOB_PDP_6PVPopUp" || props.eventLabel=="IMOB_Company-Category_6PVPopUp" && props.callText ? props.callText :"Call for Best Deal"}`}</span>
                        {props.companyContactNo ? <span id="pns1" className="dn">{props.companyContactNo}</span> : ""}
                    </>
                    : ''}
            </span>
    );
}

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