import React from 'react';
import { eventTracking } from '../../../../Globals/GaTracking';
import { checkUserStatus} from '../../../../Globals/MainFunctions';
import { getCookieValByKey, getCookie } from '../../../../Globals/CookieManager';
import { callEnqForm } from '../CTA/helper';
import { getMobileNum } from '../CTA/helper';
import {checkEnquirySentRelated} from '../ProductPrice/helper';
var cookieChangeFnForPrice = '';

export default class ProductPrice extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ga=getCookie('_ga');
        this.isOddNumber = false;
        this.checkCookieForDplyID = this.checkCookieForDplyID.bind(this);
    }

    checkCookieForDplyID(props) {
        cookieChangeFnForPrice = setInterval(function () {
            if ((typeof (props.enqCtaDisabled) !=='undefined' && props.enqCtaDisabled) != props.data.PC_ITEM_DISPLAY_ID)
                props.toggleEnqCTADisabled(props.data.PC_ITEM_DISPLAY_ID);
        }, 50);
    }

    render() {
        let numObj = getMobileNum(this.props.data);
        let curntPageLang = this.props.pageLang? this.props.pageLang:''
        let callNowCalledFrom= this.props.data['LANDING_FROM_SPA'] ? 'IMOB_PDP_First_Fold|IntermediateScreen':'IMOB_PDP_First_Fold|';
        let dbTrackText =this.props.isExtended ? 'IMOB_PDP_First_Fold_Extended|' + curntPageLang : callNowCalledFrom + curntPageLang;
        let  displayId= this.props.data?this.props.data.PC_ITEM_DISPLAY_ID? this.props.data.PC_ITEM_DISPLAY_ID:'':'';
        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'';
        let checkFullLogin = (checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1));              
        let callProps = {
            im_popup: 'im_popup',
            CONTACT_NUMBER: numObj.num,
            CONTACT_TYPE: numObj.type,
            glusrid: this.props.data.GLUSR_USR_ID,
            mbgn_askpopup: 'mbgn_askpopup',
            call_txt:"कॉल करें",
            contact_no: 'contact_no',
            itemId: this.props.data.PC_ITEM_DISPLAY_ID,
            itemImage:this.props.data["PC_IMG_SMALL_100X100"]?this.props.data["PC_IMG_SMALL_100X100"]:"https://m.imimg.com/gifs/background_image.jpg",
            mcatid:this.props.data.BRD_MCAT_ID,
            mcatname: this.props.data.BRD_MCAT_NAME,
            translatedText:this.props.translatedTxt?this.props.translatedTxt:'',
            compname:this.props.data.COMPANYNAME,
            pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '',
            dbpagetrack: dbTrackText, 
            widgetTrackCatg: 'Extended_PDP_PWA',
            widgetTrack: 'Main_CTA',
            widgetTrackPage: 'Call',
            callshowtext: this.props.translatedTxt ? this.props.translatedTxt.HEADER_BTN_1 : '',
            page: 'PDP',
            itemName: this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
            eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",  
            eventLabel: this.props.data['LANDING_FROM_SPA'] ?'IntermediatePDPScreen':this.props.eventLabel,       
            tscode:this.props.data["ETO_OFR_COMPANY_TSCODE"]?this.props.data["ETO_OFR_COMPANY_TSCODE"]:'',
            PAID_TYPE : this.props.data['URL_TYPE'] ? this.props.data['URL_TYPE'] : ''
        };
        
        let loginModeArray = ["Unidentified", "Identified", "FullyIdentified"];
        let status = checkUserStatus();
        let gaLastDigit=this.ga?(this.ga[this.ga.length-1]):'';
        if(!(gaLastDigit % 2) == 0){this.isOddNumber= true;}
       
        if (this.props.enqCtaDisabled && cookieChangeFnForPrice) {clearInterval(cookieChangeFnForPrice);}
        
        const showPrice = (
            <p className= {`${!this.props.data.PRODUCT_PRICE?`${(checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID))?" c77 ":" clrBl "}`:" clrBl "} clrOnZoomView fs18 fw mxht1000 pdb5 tl`} 
            onClick={!isEcom?() => {
                eventTracking("Product-Page-Clicks",`${this.props.data.PRODUCT_PRICE?"Price-Clicked":"Price-On-Request-Clicked"}`, displayId+"|EnquiryCTA|PDP|"+loginModeArray[status], true)}:''}>
                    <span onClick={!isEcom?()=> {
                        if(!checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID))
                        {
                            this.props.showModal(callEnqForm(this.props.data, this.props.pageLang,`IMOB_PDP_First_Fold|${this.props.data.PRODUCT_PRICE?'Product_Price':'Price_On_Request'}`,'PDP',this.props.isExtended,this.props.isExtendedIndex?this.props.isExtendedIndex:0,this.props.data.PRODUCT_PRICE?'सर्वोत्तम मूल्य प्राप्त करें':'लेटेस्ट रेट पाएं','3',false,'First_Fold','',callProps,'',this.props.track));

                            (this.props.isExtended&&this.props.toggleEnqCTADisabled && this.props.enqCtaDisabled != (this.props.data.PC_ITEM_DISPLAY_ID)) ? this.checkCookieForDplyID(this.props) :'';
                        }
                       }:''}>
                    { this.props.data.PRODUCT_PRICE? this.props.data.PRODUCT_PRICE 
                        :(checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID))?"Price Requested":"Get Latest Price"}
                    </span>
                </p> 
        )
        
        return (<>{showPrice}</>);
    }
}