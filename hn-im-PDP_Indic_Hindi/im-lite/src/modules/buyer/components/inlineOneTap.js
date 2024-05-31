import React from 'react'
import { eventTracking } from '../../../Globals/GaTracking';
import { Link } from 'react-router';
import { oneTapEnquiry } from '../../PDP/utility/ChatWithSeller/helper';
import { imStore } from '../../../store/imStore'; 
import { getCookieValByKey } from '../../../Globals/CookieManager';
import { checkUserStatus } from '../../../Globals/MainFunctions';
export default class InlineOneTap extends React.Component {
    constructor(props) {
        super(props);
        this.checkIntentSent = this.checkIntentSent.bind(this);
        this.constructButn = this.constructButn.bind(this);
        this.user_glid = getCookieValByKey('ImeshVisitor', 'glid');
    }
    componentDidMount(props)
    {
        if(self.props){
            imStore.dispatch({ type: 'REQUEST_ONETAP', payload: { message_OneTap : [], qDestination:'',setIsqHit:'',finishEnq:'',ofr_id:'' } });
        }
    } 
    constructButn() {
        // let enqDivId = 'CallBkRequest' + this.props.data.PC_ITEM_DISPLAY_ID;
        // let enquiryCta = <span className='LISTING_BTN_1'><i class="enqIcn dib vam mr2"></i>{this.props.translatedText.LISTING_BTN_1}</span>;
        
        const ctaNamePDP = <span className='t_tc'>{this.props.translatedText? this.props.translatedText.Continue : 'Continue'}
        <span className='dib ml5 doubleArrow'></span></span>

        let ctaTextPDP = <span className="Contact_Seller">{this.props.pageName == "PDP"? ctaNamePDP : this.props.pageType=="miniPDP" ? this.props.translatedText ? this.props.translatedText.ENQ_LABEL3 : "Continue":"Continue"}</span>;
        let pdpData = this.props.data;
        let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        let refText = "OneTapPDP";
        if(this.checkIntentSent(this.props.data.PC_ITEM_DISPLAY_ID)){
            refText = "OneTapEnqSent";
        }
        let chatBtn = '';
        let cABTestPDP ='';
        let standardEnqLable = '', identifyUserStatus = '';
        let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
        let status = checkUserStatus();
        identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
        standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;

        if (refText == "OneTapEnqSent") {
            chatBtn = <div id={this.props.data.PC_ITEM_DISPLAY_ID}
                
                onClick={() => {
                    eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true)
                    eventTracking('Product-Page-Clicks', 'Chat_with_Seller|'+this.props.btnName,isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID , true),
                    eventTracking('Product-Page-Clicks', 'EnquirySentClick|'+this.props.btnName,isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID +standardEnqLable, true),
                        window.location.href = '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText;
                }}
                className="bgBlu clrw bxsdw fs18  pd10 por bxrd4 fw" >
                {ctaTextPDP}
                
            </div>
        }
        else {
               chatBtn = <Link id={"link"} to={{
                pathname: '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText, state: {
                    contactglid: pdpData.GLUSR_USR_ID,
                    pdpUrl: location.pathname,
                    data: this.props.data, pageLang: this.props.pageLang, queryRef: this.props.queryRef,
                    pageName: this.props.pageName, isExtended: this.props.isExtended, cta_name: this.props.cta_name, btnName: this.props.btnName, A2HS: isA2HS
                }
            }}
                onClick={() => {
                    this.checkIntentSent(this.props.data.PC_ITEM_DISPLAY_ID) ? '' :'',
                    eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true)
                    eventTracking('Product-Page-Clicks', 'Chat_with_Seller|'+this.props.btnName +cABTestPDP,isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID +standardEnqLable, true)
                }}>
                <div id={this.props.data.PC_ITEM_DISPLAY_ID} className="bgBlu clrw bxsdw fs18  pd10 por bxrd4 fw">
                {ctaTextPDP}</div>
            </Link>}
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
            <div>
                {this.constructButn()}
            </div>
        )
    }
}
