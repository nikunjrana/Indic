import React from 'react'
import { eventTracking } from '../../../../Globals/GaTracking';
import { Link } from 'react-router';
import { oneTapEnquiry } from './helper';
import { imStore } from '../../../../store/imStore';
import { getCookieValByKey } from '../../../../Globals/CookieManager';
export default class InlineChatWithSeller extends React.Component {
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
        let cABTestPDP ='';
    let enqDivId = 'CallBkRequest' + this.props.data.PC_ITEM_DISPLAY_ID;
    let enquiryCta = <span className='LISTING_BTN_1'><i class="enqIcn dib vam mr2"></i>{this.props.translatedText.LISTING_BTN_1}</span>;
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
        if (refText == "OneTapEnqSent") {
            chatBtn =
                <button onClick={() => {
                    eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true);
                        eventTracking('Product-Page-Clicks', 'Chat_with_Seller|'+this.props.btnName,isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID , true),
                        eventTracking('Product-Page-Clicks', 'EnquirySentClick|'+this.props.btnName,isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID , true),
                        window.location.href = '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText;
                }}
                    className={`w100 r0 l0 b0 btn_enq dflex bgw ${this.props.prodDescAddition? 'prodAdditional' : this.props.prodDescFlag || this.props.companyInfoFlag?this.props.isExtended?'pf':'':'dn'}`} style={this.props.isProdDescVisible==false?"display:none": " box-shadow: -1px 0px 5px rgba(0, 0, 0, 0.7);"}  >
                    <button id={enqDivId}
                        className=" pdt12 w90 ma pdb12  fs15 por compBl clrw bxrd10">
                        {enquiryCta}
                    </button>
                </button>
        }
        else {
                chatBtn = 
                <Link id={"link"} to={{
                        pathname: '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText, state: {
                        contactglid: pdpData.GLUSR_USR_ID,
                        pdpUrl: location.pathname,
                        data: this.props.data, pageLang: this.props.pageLang, queryRef: this.props.queryRef,
                        pageName: this.props.pageName, isExtended: this.props.isExtended, cta_name: this.props.cta_name, btnName: this.props.btnName, A2HS: isA2HS
                    }
                }}
                    onClick={() => {
                        this.checkIntentSent(this.props.data.PC_ITEM_DISPLAY_ID) ? '' :'',
                        eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true);
                        eventTracking('Product-Page-Clicks', 'Chat_with_Seller|'+this.props.btnName+ cABTestPDP,isA2HS ? this.props.data.PC_ITEM_DISPLAY_ID + '|A2HS': this.props.data.PC_ITEM_DISPLAY_ID , true)
                    }}>
                        <button className={`w100 r0 l0  btn_enq dflex bgw ${this.props.prodDescAddition? 'prodAdditional' : this.props.prodDescFlag || this.props.companyInfoFlag?this.props.isExtended?'pf':'':'dn'} ${this.props.isProdDescVisible==true&&this.props.proddesc?'pd10 bgW bt5':'b0'} `} style={this.props.prodDescAddition? '': this.props.isProdDescVisible==false ?"display:none":" "}  >
                        <button id={enqDivId}
                        className={`${this.props.isABtst? 'bdrmim  ' : 'compBl '} ${this.props.prodDescAddition? '' : this.props.isProdDescVisible==true&&this.props.proddesc?'':' dn '}  bgW clrmim pdt12 w49 bxrdNR mr10 pdb12  fs15 por clrw`}>
                        <span className='fw clrmim'><i class="enqIcnAB dib vam mr2"></i>{"Ask more details"}</span>
                    </button> 
                            <button id={enqDivId} className={`${this.props.isABtst? 'bdrmim bgmim ' : 'compBl '}  pdt12 ${this.props.prodDescAddition||this.props.isProdDescVisible==true&&this.props.proddesc?'  w49 bxrdNL ': 'w95 ma bxrd4'}  pdb12  fs15 por clrw`}>
                            {enquiryCta}
                            </button>
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
