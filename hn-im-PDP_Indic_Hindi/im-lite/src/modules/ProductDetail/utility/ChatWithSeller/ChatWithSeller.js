import React from 'react'
import { eventTracking } from '../../../../Globals/GaTracking';
import { Link } from 'react-router';
import { imStore } from '../../../../store/imStore';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
// import { getCookieValByKey } from '../../../../Globals/CookieManager';
export default class ChatWithSeller extends React.Component {
    constructor(props) {
        super(props);
        this.checkIntentSent = this.checkIntentSent.bind(this);
        this.constructButn = this.constructButn.bind(this);
        // this.user_glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.state = {showOneTap : false}
    }
    componentDidMount(props)
    {
        if(self.props){
            imStore.dispatch({ type: 'REQUEST_ONETAP', payload: { message_OneTap : [], qDestination:'',setIsqHit:'',finishEnq:'',ofr_id:'' } });
        }
    } 
    constructButn() {
        let pdpData = this.props.data;
        let refText = "OneTapPDP";
        let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        if(this.checkIntentSent(this.props.data.PC_ITEM_DISPLAY_ID)){
            refText = "OneTapEnqSent";
        }
        let chatBtn = '';
        let cABTestPDP = '';
        let standardEnqLable = '', identifyUserStatus = '';
        let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
        let status = checkUserStatus();
        identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
        standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;

        if (refText == "OneTapEnqSent") {

            chatBtn = <button id={"ctId" + this.props.data.PC_ITEM_DISPLAY_ID} type="button" name="FirstFoldEnq"
            onClick={() => {
                eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true);
                eventTracking('Product-Page-Clicks', 'Chat_with_Seller|' + this.props.btnName + cABTestPDP, isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID +standardEnqLable, true),
                eventTracking('Product-Page-Clicks', 'EnquirySentClick|' + this.props.btnName, isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID, true),
                    window.location.href = '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText;
                }}
                className={`${this.props.isABtst?'bdrmim bgmim bxrdNL ':'compBl bxrd20 '} fr pdb12 pdt12 clrw fs14 fw bxsdw ${this.props.isWhatsappCta ? "w34" : "w49"}`} >
                <i className={`${this.props.isABtst? 'enqIcnGreen ':'enqIcn ' } dib vam mr2`}></i>
                <span class="LISTING_BTN_8">{this.props.isWhatsappCta ? "Get Price" : this.props.translatedTxt.LISTING_BTN_1?this.props.translatedTxt.LISTING_BTN_1:'सर्वोत्तम मूल्य प्राप्त करें'}</span>
            </button>
        }
        else if (this.props.cta_name == 'Get More Photos' || this.props.cta_name == "Get Free Quote") {
            if(!(this.props.startIndex==0 && this.props.checkCall=='noZoom' && this.props.isVideoURL) && !(this.props.startIndex==1 && this.props.isVideoURL)) {
            let textType = this.props.pdpServiceType ? "Quote" : 'Photos'
            let gMPhotoText = this.props.checkEnqStatus ? (textType+ ' Requested') : (this.props.pdpServiceType ? 'Get Free Quote' : "Get More Photos");
            let ctaDisabledClr = { color: '#777', border: '1px solid #777', opacity: '0.8' };
            let displayName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME;
            let setMsgForGMPhoto = this.props.pdpServiceType ? 'Please send me the free Quotation for'+ displayName:'Please send me the latest photos of ' + displayName;
            chatBtn = <Link id={"link"} name="FirstFoldEnq" to={{
                pathname: '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText, state: {
                    contactglid: pdpData.GLUSR_USR_ID,
                    pdpUrl: location.pathname,
                    data: this.props.data, pageLang: this.props.pageLang, queryRef: this.props.queryRef,
                    pageName: this.props.pageName, isExtended: this.props.isExtended, cta_name: this.props.cta_name, btnName: this.props.btnName, A2HS: isA2HS,
                    qDesc:setMsgForGMPhoto
                }
            }}
                onClick={() => {
                    let sellerIntent = (localStorage.getItem("sellerIntent")) ? JSON.parse(localStorage.getItem("sellerIntent")) : "";
                    (sellerIntent && sellerIntent.Intent && checkUserStatus() == 2) ? eventTracking('Product-Page-Clicks', 'Get-Best-Price' + cABTestPDP, "PAGE-SOI-Button", true) : "";
                    (eventTracking('Product-Page-Clicks', 'Chat_with_Seller|' + this.props.btnName + cABTestPDP, isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS' : this.props.data.PC_ITEM_DISPLAY_ID + standardEnqLable, true),eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true))
                }}>
                <button id="getmorephotoss" style={this.props.checkEnqStatus ? ctaDisabledClr : ''} disabled={this.props.checkEnqStatus} className={`${this.props.checkCall == 'noZoom' ? 'ctaAlignCSR zIn100 fs12 poa' : 'ctaAlignZoom z1000 fadeInItem2s fs14 pf'} tc bdrmim clrmim fw getPhotoCTa`}
                    name="FirstFoldGMPhoto">
                    <i className={`${this.props.checkEnqStatus ? 'gmPhotoIconGrey ' : 'gmPhotoIcon '} vam mr2 dib lnHt8`}></i>
                    <span className='dib vam'>{gMPhotoText}</span>
                </button>
            </Link>
            }
        }
        else {
                chatBtn = <Link id={"link"}  name="FirstFoldEnq" to={{
                    pathname: '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText, state: {
                        contactglid: pdpData.GLUSR_USR_ID,
                        pdpUrl: location.pathname,
                        data: this.props.data, pageLang: this.props.pageLang, queryRef: this.props.queryRef,
                        pageName: this.props.pageName, isExtended: this.props.isExtended, cta_name: this.props.cta_name, btnName: this.props.btnName, A2HS: isA2HS,
                        qdesc:''
                    }
                }}
                    onClick={() => {
                        let sellerIntent = (localStorage.getItem("sellerIntent")) ? JSON.parse(localStorage.getItem("sellerIntent")) : "";
                        (sellerIntent && sellerIntent.Intent && checkUserStatus() == 2) ? eventTracking('Product-Page-Clicks', 'Get-Best-Price' + cABTestPDP, "PAGE-SOI-Button", true) : "";
                            (eventTracking('Product-Page-Clicks', 'Chat_with_Seller|' + this.props.btnName+ cABTestPDP, isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS' : this.props.data.PC_ITEM_DISPLAY_ID +standardEnqLable, true),eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true))
                    }}>
                    <button id={"ctId" + this.props.data.PC_ITEM_DISPLAY_ID} type="button"
                        className={`${this.props.isABtst?'bdrmim bgmim bxrdNL ':'compBl bxrd20 '}  fr pdb12 pdt12  clrw fs14 fw bxsdw ${this.props.isWhatsappCta ? "w34" : "w49"}`} >
                        <i className={`${this.props.isABtst? 'enqIcnGreen ':'enqIcn ' } dib vam mr2`}></i>
                        <span class="LISTING_BTN_8">{this.props.isWhatsappCta ? "Get Price" :this.props.translatedTxt.LISTING_BTN_1?this.props.translatedTxt.LISTING_BTN_1:"सर्वोत्तम मूल्य प्राप्त करें"}</span>
                    </button>
                </Link>
            }

        return chatBtn;
    }
    checkIntentSent(dispId) {
        let lsData=JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData="";
        }
        var e = lsData ? lsData['displayId'] : "undef";

        if (e) {
            e = decodeURIComponent(e);
            var dispIds = e.split(",");
            return dispIds.includes(dispId);
        }
        else
            return false;
    }
    render() {


        return (
            <>
                {this.constructButn()}
            </>
        )
    }
}
