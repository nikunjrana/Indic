import React, { PureComponent } from 'react';
import { callEnqForm,checkEnquirySentRelated,fireOnClicktracking} from './helper';
import { getCookieValByKey,getCookie } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
// import { callEnqForm } from './CTA/helper';
import { checkUserStatus } from '../../../Globals/MainFunctions';


class CTA extends PureComponent {
    constructor(props){
        super(props);
        this.state = {enqsent:false,ChatWithSeller:""};
        this.checkEnquiryStatus = this.checkEnquiryStatus.bind(this);
        this.LoadOnetap=this.LoadOnetap.bind(this);
        this.showWhatsAppIcon=this.showWhatsAppIcon.bind(this);
        this.EnqClickhandler=this.EnqClickhandler.bind(this);
        this.isWhatsappCta =  this.props.data && this.props.data.WHATSAPP_INFO && this.props.data.WHATSAPP_INFO.ENABLED=="1" && this.props.data.WHATSAPP_INFO.PHONE_NO && !this.props.isZoom && this.props.calledCTAsFrom!=="relatedProducts"? true : false;
        this.style = `.ht45{height: 45px;}.ml4 {margin-left: 4px;}.w30 {
            width: 30%;
        }.w34 {
            width: 34%;
        }.whatsAppIcn {
            background: linear-gradient(90deg,#49c557,#28b13d);
            width: 19px;
            height: 19px;
            position: relative;
            border-radius: 100%;
        }.whatsAppIcnpos {
            left: -1px;
            top: -1px;
        }`
    }
    LoadOnetap(){
        if(!this.state.ChatWithSeller){
            import(/* webpackChunkName:"Onetap" */'./ChatWithSeller/ChatWithSeller').then((module) => {
                this.setState({ ChatWithSeller: module.default });
                })
        }
       
    }
    checkEnquiryStatus() {
        this.setState({enqsent:checkEnquirySentRelated(this.props.DisplayId)});

    }
    CallClickhandler(){
        let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
        let usermode = loginModes[checkUserStatus()];
        let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
        eventTracking("Click-To-Call",this.props.callProps.eventAction,this.props.eventLabel+`|${usermode}|${verfStatus}`,true)
    }
    EnqClickhandler(){
        let pdpModrefType=this.props.calledCTAsFrom=="relatedProducts"?this.props.pdpModrefType:'3';
        callEnqForm(this.props.mcatId,this.props.Price,this.props.CompanyName,this.props.GlusrId,this.props.ItemName, this.props.DisplayId, this.props.imgurl, this.props.ctaName,this.props.data.CAT_ID,this.props.callProps,this.props.showModal,'','',this.props.queryText,this.props.data,pdpModrefType)
        let index= this.props.calledCTAsFrom=="relatedProducts" ? (this.props.index +1) :0;
        fireOnClicktracking(this.props.isZoom, false,index,false,"PDP" ,this.props.DisplayId ,'', this.props.calledCTAsFrom)
    }
    componentDidMount(){
        this.isOneTap= (this.props.data&&checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn') && (getCookieValByKey('ImeshVisitor', 'usts') != 1));
        this.isOneTap = this.props.calledCTAsFrom=="relatedProducts"? false : this.isOneTap;
        this.isOneTap?this.LoadOnetap():'';
        document.addEventListener("enquirySent",this.checkEnquiryStatus);
    }
    componentDidUpdate(prevProps,prevState){ 
        this.checkEnquiryStatus();
    }

    showWhatsAppIcon() {
        if(this.props.data) {
            let whatsappInfo = {
                whatsapp_type : "",
                whatsapp_number : this.props.data.WHATSAPP_INFO && this.props.data.WHATSAPP_INFO.PHONE_NO 
            };
            let pageType = 'PDP';
            let pdpName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME
            let whatsapp_text = encodeURIComponent(`Hello ${this.props.data.COMPANYNAME}, I am interested in ${pdpName}.`) 
            return(<>
            <style>{this.style}</style>
            <div className="tc"  onClick={() => {
                whatsApp(this.props.data, pageType, whatsappInfo);
                eventTracking("Product-Page-Clicks", "WhatsApp-CTA-click", this.props.data.PC_ITEM_DISPLAY_ID, true)
            }}><a id="whatsappCTA" href={`https://api.whatsapp.com/send/?phone=${whatsappInfo.whatsapp_number ? whatsappInfo.whatsapp_number : ""}&text=${whatsapp_text}&type=phone_number&app_absent=0`} target="_blank" className={("bdrmim clrmim fl fs14 fw pdb10 pdt12  ml5 ")+(this.state.enqsent ? "w49 bxrdNL" : "w30")}><div className="whatsAppIcn dib vam">
            <img src="https://m.imimg.com/gifs/img/whatsapp-icon.svg" className="poa whatsAppIcnpos"/></div><span className='pdl5'>WhatsApp</span></a></div></>)
        }
        return ''
    }

    render() {
        return (
            <div id="newcta">
            <span id={"pdpcallnow"+this.props.DisplayId} buttontype={`Call|${this.props.IsPns}|${this.props.DisplayId}`} data-image={this.props.imgurl} data-compname={this.props.CompanyName} data-contact={this.props.transformedNo} onClick={(event)=>{this.props.displayPopup(this.props.dbtrack);this.CallClickhandler()}} className={`${this.state.enqsent?"bdrmim bxrd20 fl fs14 fw pdb12 pdt12 tc tst ":"bdrmim clrmim bxrdNR fl tc fs14 tst pdt12 pdb12  fw "}${this.isWhatsappCta ? (this.state.enqsent ? "w49 bgmim bxrdNR" : "w34 bgmim") : (this.state.enqsent ? "w100 bgmim" : "w49 bgw")}`}>
                <i id={'callicn'+this.props.DisplayId} buttontype={`Call|${this.props.IsPns}|${this.props.DisplayId}`} data-image={this.props.imgurl} data-compname={this.props.CompanyName} data-contact={this.props.transformedNo} className={`mr5 dib vam bkgImgPstnRpt ${this.state.enqsent || this.isWhatsappCta?"callIcnNAB":"callIcnN"} `}></i>
                <span buttontype={`Call|${this.props.IsPns}|${this.props.DisplayId}`} data-image={this.props.imgurl} data-compname={this.props.CompanyName} data-contact={this.props.transformedNo} id={'calltxt'+this.props.DisplayId} className={`${this.state.enqsent || this.isWhatsappCta?"clrw":''}`}>कॉल करें</span>
                <span id="pns1" className="dn notranslate">{this.props.transformedNo?this.props.transformedNo:''}</span>
                </span>
                {this.isWhatsappCta? this.showWhatsAppIcon() : ""}
            <div>
                {this.isOneTap&&this.props.mainPdp&&this.state.ChatWithSeller&&!this.state.enqsent&&this.props.calledCTAsFrom!=="relatedProducts"?
                <this.state.ChatWithSeller prodName = {this.props.ItemName}  pageLang={''} data={this.props.data} translatedTxt={""} isZoom={this.props.isZoom} isExtendedIndex={this.props.isExtendedIndex} isExtended={false} queryRef={ 'IMOB_PDP_First_Fold'} pageName={"PDP"} cta_name={"सर्वोत्तम मूल्य प्राप्त करें"} btnName={ 'First_Fold'} isABtst = {true}  track={''} calledCTAsFrom={''} isWhatsappCta={this.isWhatsappCta}/>
                :<button id={this.props.DisplayId}  buttontype={`enquiry|${this.props.ctaName}|${this.props.DisplayId}`} data-image={this.props.imgurl} data-name={this.props.ItemName} data-display-id={this.props.DisplayId} onClick={(event) => {this.EnqClickhandler()} }className={`bdrmim bgmim bxrdNL  fr pdb12 pdt12  clrw fs14 fw bxsdw tc ${this.state.enqsent?" dn ":''}${this.isWhatsappCta? "w34" : "w49"}`}>
                    <i buttontype={`enquiry|${this.props.ctaName}|${this.props.DisplayId}`} data-image={this.props.imgurl} data-name={this.props.ItemName} className="enqIcnGreen dib vam mr2" data-display-id={this.props.DisplayId} ></i>
                    <span buttontype={`enquiry|${this.props.ctaName}|${this.props.DisplayId}`} data-image={this.props.imgurl} data-name={this.props.ItemName} data-display-id={this.props.DisplayId}>{this.isWhatsappCta?"Get Price":this.props.ctaName}</span>
                    </button>}
            </div>
                    <p className="crx"></p>
        </div>
        )
    }
}

export default CTA;