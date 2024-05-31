import React from 'react'
import { eventTracking } from '../../../../Globals/GaTracking';
import { Link } from 'react-router';
import { imStore } from '../../../../store/imStore'; 
import { getCookieValByKey } from '../../../../Globals/CookieManager';
import { checkUserStatus } from '../../../../Globals/MainFunctions';

export default class InlineOneTap extends React.Component {
    constructor(props) {
        super(props);
        this.checkIntentSent = this.checkIntentSent.bind(this);
        this.constructButn = this.constructButn.bind(this);
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
        if(this.checkIntentSent(this.props.data.PC_ITEM_DISPLAY_ID)){
            refText = "OneTapEnqSent";
        }
        let chatBtn = '';
        if (refText == "OneTapEnqSent") {
            chatBtn = <div id={this.props.data.PC_ITEM_DISPLAY_ID}
                onClick={() => {
                    eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true);
                    eventTracking('Product-Page-Clicks', 'Chat_with_Seller|'+this.props.btnName,this.props.data.PC_ITEM_DISPLAY_ID , true),
                    eventTracking('Product-Page-Clicks', 'EnquirySentClick|'+this.props.btnName,this.props.data.PC_ITEM_DISPLAY_ID, true),
                    window.location.href = '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText;
                }}
                className={'bgBlu clrw fs18  pd10 por bxrd4 fw'} >
                <span className="Contact_Seller">Continue</span><span className="dib ml5 doubleArrow"></span>   
            </div>
        }
        else {
               chatBtn = <Link id={"link"} to={{
                pathname: '/messages/conversation/?sup_glid=' + btoa(pdpData.GLUSR_USR_ID) + '&ref=' + refText, state: {
                    contactglid: pdpData.GLUSR_USR_ID,
                    pdpUrl: location.pathname,
                    data: this.props.data, pageLang: this.props.pageLang, queryRef: this.props.queryRef,
                    pageName: this.props.pageName, isExtended: this.props.isExtended, cta_name: this.props.cta_name, btnName: this.props.btnName, A2HS: false
                }
            }}
                onClick={() => {
                    this.checkIntentSent(this.props.data.PC_ITEM_DISPLAY_ID) ? '' :'',
                    eventTracking('EnquiryCTA/'+"Full-Login","PDP/"+(this.props && this.props.btnName?this.props.btnName.toLowerCase().includes("getmorephotos")?"FF-GMP":this.props.btnName.toLowerCase().includes("first_fold")?"FF-GBP":this.props.btnName:"")+"/"+"messages","",true);
                    eventTracking('Product-Page-Clicks', 'Chat_with_Seller|'+this.props.btnName ,this.props.data.PC_ITEM_DISPLAY_ID, true)
                }}>
                <div id={this.props.data.PC_ITEM_DISPLAY_ID} className={'bgBlu clrw fs18  pd10 por bxrd4 fw'}
                ><span className="Contact_Seller">Continue</span> <span className="dib ml5 doubleArrow"></span>   
                </div>
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
