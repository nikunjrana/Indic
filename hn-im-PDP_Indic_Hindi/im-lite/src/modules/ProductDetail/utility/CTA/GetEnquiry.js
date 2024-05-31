import React from 'react';
import { openEnqForm, callEnqForm } from './helper';
import { eventTracking } from '../../../../Globals/GaTracking';
// import { attachCTALoader } from '../../../../Globals/CTALoader/enqBtnLoader';
import { getCookie, getCookieValByKey } from '../../../../Globals/CookieManager';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
var cookieChangeFn = '';


export default class GetEnquiry extends React.Component {
    constructor(props) {   
        super(props);
        this.state = { isLoading: false };
        this.toggleLoader = this.toggleLoader.bind(this);
        this.checkCookie = this.checkCookie.bind(this);

    } 
    

    checkCookie(props) {
        cookieChangeFn = setInterval(function () {
            if (props.enqCtaDisabled != props.data.PC_ITEM_DISPLAY_ID)
                props.toggleEnqCTADisabled(props.data.PC_ITEM_DISPLAY_ID);
        }, 50);
    }
    toggleLoader() {
        this.setState({ isLoading: !this.state.isLoading })
    }
    fireOnClicktracking(isZoom, isExtended, isExtendedIndex,isMinipdp='',pgName='',displayid='', cABTestPDP='') {
        let eventAction = this.props.data['LANDING_FROM_SPA']?'Get-Best-Price-IntermedScreen':'Get-Best-Price'+cABTestPDP;
        let standardEnqLable = '', identifyUserStatus = '';
        if(window.pageName && window.pageName == "PDP" ) {
            let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
            let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
            let status = checkUserStatus();
            eventAction+=(status>=0 && status<=2 ? loginModeArray[status] : "");
            isZoom ? eventAction+='|ImageZoom':'';
            identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
            standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;
        }
        isZoom && !isExtended && !isMinipdp ? eventTracking('Product-Page-Clicks', eventAction, "page"+ standardEnqLable, true) : "";
        isZoom && isExtended ? eventTracking('Extended-Product-Page-Clicks', eventAction, "page-extended-" + isExtendedIndex+standardEnqLable, true) : "";
        !isZoom && !isExtended ? eventTracking('Product-Page-Clicks', eventAction, "with-price-page-index"+ standardEnqLable, true) : "";


        !isZoom && isExtended ? eventTracking('Extended-Product-Page-Clicks', eventAction, "page-extended-" + isExtendedIndex+ standardEnqLable, true) : "";
        isZoom && isMinipdp ? eventTracking('Mini-PDP'+'-'+ pgName , eventAction, "ImageZoom|"+displayid, true) : "";

    }

    constructButn() {
    let enqBtn = '';
    let disableButtonStyle = '';
    let disabled = false;

    let ga = getCookie('_ga');
    let gaLastDigit = true;
    let cABTestPDP = '';
    let isABtst = '';
    if(gaLastDigit){
      isABtst = 1;
    }
    
    if(this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.data.PC_ITEM_DISPLAY_ID)){
        disabled=true;
        disableButtonStyle='background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;'}
        disableButtonStyle+=(this.props.isButtonDisabled?" display:none;":"")
        if (this.state.isLoading) {
            enqBtn = '';
        }
        else {
            document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";
          
            enqBtn = <button id={this.props.data.PC_ITEM_DISPLAY_ID}
            disabled={disabled}
            style={disableButtonStyle} name="FirstFoldEnq"

            onClick={(event) => {
            let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
            (sellerIntent && sellerIntent.Intent&&checkUserStatus()==2  )?eventTracking('Product-Page-Clicks', 'Get-Best-Price', "Company PAGE-SOI-Button", true):"";
            (this.props.isExtended&&this.props.toggleEnqCTADisabled && this.props.enqCtaDisabled != (this.props.data.PC_ITEM_DISPLAY_ID)) ? this.checkCookie(this.props) :'';
            
            this.props.showModal(callEnqForm(this.props.data, this.props.pageLang, this.props.queryRef, this.props.pageName, this.props.isExtended, this.props.isExtendedIndex, this.props.cta_name, this.props.pdpModrefType,this.props.isZoom,this.props.btnName,this.props.eventLabel,this.props.callProps,cABTestPDP,this.props.track));

            this.fireOnClicktracking(this.props.isZoom, this.props.isExtended, this.props.isExtendedIndex,this.props.isMinipdp,this.props.pgName,this.props.displayid,cABTestPDP);
            event.preventDefault();
        }}
            
            className={`${isABtst?'bdrmim bgmim bxrdNL ':'compBl bxrd20 '} fr pdb12 pdt12 ht42 w49 clrw fs14 fw bxsdw tc ${this.props.noNumFlag ? '' : ' hideBtn '  }`}>
            <i className={`${isABtst? 'enqIcnGreen ':'enqIcn ' } dib vam mr2`}></i>
            <span class="newBtn LISTING_BTN_8">{
            (this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.data.PC_ITEM_DISPLAY_ID)) ? (this.props.translatedTxt && this.props.translatedTxt.ENQ_LABEL? this.props.translatedTxt.ENQ_LABEL:'Enquiry Sent') : (this.props.translatedTxt && this.props.translatedTxt.LISTING_BTN_1 ?this.props.translatedTxt.LISTING_BTN_1:'सर्वोत्तम मूल्य प्राप्त करें')}</span>
            </button>
        
        }
        return enqBtn;
    }

    
    render() {       
        if (this.props.enqCtaDisabled && cookieChangeFn) { 
           clearInterval(cookieChangeFn);
        }
       
        return (
            <>
                {this.constructButn()}
            </>
        )
    }
}






