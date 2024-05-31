import React, { PureComponent } from 'react';
import { callEnqForm, checkEnquirySentRelated, checkUserStatusFromCookie, getCookieNameKey } from '../../utility/helper';
import { checkDNCUser } from '../../utility/helper';
import { getFirstImg, validationCheck } from './helper';
import { eventTracking } from '../../../../Globals/GaTracking';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
import { getCookie,getCookieValByKey } from '../../../../Globals/CookieManager';

class InlineEnquiry extends PureComponent {
    constructor(props){
        super(props);
        this.state={inlineOneTap:'', isqContainer: '', enqsent:'', isqResponseVal:''};
        this.fetchResources = this.fetchResources.bind(this);
        this.checkDNCUser = checkDNCUser(this.props.cookie);
        this.inlineDiv = this.inlineDiv.bind(this);
        this.inlineDivSkeleton = this.inlineDivSkeleton.bind(this);
        this.invokeEnquiry = this.invokeEnquiry.bind(this);
        this.checkEnquiryStatus = this.checkEnquiryStatus.bind(this);
        this.setIsqResponse = this.setIsqResponse.bind(this);
        this.inlineCTA = this.inlineCTA.bind(this);
        this.imgSrc = getFirstImg(this.props.data);
        this.invokeCall = this.invokeCall.bind(this);
        this.altName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME;
        this.isOneTap = checkUserStatusFromCookie(this.props.cookie)==2 && getCookieNameKey('ImeshVisitor', 'ctid', this.props.cookie) && getCookieNameKey('ImeshVisitor', 'fn', this.props.cookie)  && getCookieNameKey('ImeshVisitor', 'usts',  this.props.cookie) != 1;
    }
    componentDidMount() {
        this.fetchResources();
        if(this.checkDNCUser && checkUserStatusFromCookie(this.props.cookie)==1) {
            if(!this.state.isqContainer) {
                import(
                    /* webpackChunkName:"InlineDNC" */ "./InlineDNC"
                  ).then((module) => {
                    this.setState({ isqContainer: module.default });
                  });
            }
        }
        document.addEventListener("enquirySent",this.checkEnquiryStatus)
    }
    componentDidUpdate(prevProps,prevState){
        //use some condition
        this.checkEnquiryStatus();
    }
    fetchResources() {
        if(!this.state.inlineOneTap && this.isOneTap) {
                import(
                  /* webpackChunkName:"inlineOneTap" */ "./InlineOneTap"
                ).then((module) => {
                  this.setState({ inlineOneTap: module.default });
                });
        }
    }
    setIsqResponse(val) {
        this.setState({isqResponseVal:val})
    }
    invokeEnquiry(obj={}) {
        let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
        let usermode = loginModes[checkUserStatus()];
        eventTracking("EnquiryCTA/"+loginModes[usermode],"PDP/"+"Inline-Enquiry/","",true);
        eventTracking("Product-Page-Clicks", ("Inline-Enquiry-"+usermode), obj && obj.eventLabel, true)
        let inlineEnqObj={
            widgetType:"First-Fold-Inline-Enquiry"
        }
        let query_text =  ("productdetail-product-inline-enquiry-form-js|") + (obj && obj.eventLabel=="Contact-This-Seller-Clicks" ?"|Contact-The-Seller-Clicked|": "")
        if(this.checkDNCUser) {
            let isIsqError = this.checkDNCUser ? validationCheck():'';

            let passIsqVal = {
                userFilledIsqData: {
                bResponse: [document.getElementById("qntInpInl") ? document.getElementById("qntInpInl").value ? document.getElementById("qntInpInl").value : '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").value && document.getElementById("qntUnitInpInl").value != "Other" ? document.getElementById("qntUnitInpInl").value : (document.getElementById("otherPopupInl") && document.getElementById("otherPopupInl").style.display == "block" && document.getElementById("otherPopupInl").value && (document.getElementById("qntUnitInpInl") && document.getElementById("qntUnitInpInl").value == 'Other' ||  document.getElementById("qntUnitInpInl").value == 'other') ? document.getElementById("otherPopupInl").value : document.getElementById("selectedOptInl") && document.getElementById("selectedOptInl").getAttribute('optionsdesc')) : ''],
                
                qDesc: ["Quantity", "Quantity Unit"],
                
                qId: [document.getElementById('qntInpInl') ? document.getElementById('qntInpInl').getAttribute('qid') ? document.getElementById('qntInpInl').getAttribute('qid'): '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('qid') : ''],
                
                isqPriority: [document.getElementById('qntInpInl') ? document.getElementById('qntInpInl').getAttribute('priority') ? document.getElementById('qntInpInl').getAttribute('priority') : '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('isqpriority') : ''],
               
                bId: [document.getElementById('qntInpInl') ? document.getElementById('qntInpInl').getAttribute('bid') ? document.getElementById('qntInpInl').getAttribute('bid') : '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('optionsid') : '']
            },
            callSetIsq: document.getElementById("qntInpInl") && document.getElementById("qntInpInl").value && document.getElementById("qntUnitInpInl") && (document.getElementById("qntUnitInpInl").value ? document.getElementById("qntUnitInpInl").value : document.getElementById("selectedOptInl") && document.getElementById("selectedOptInl").getAttribute('optionsdesc')) && document.getElementById('qntInpInl').getAttribute('qid') != undefined && document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('qid') != null ? true : false,
            quantityShown: this.checkDNCUser && this.state.isqResponseVal ? true : false
        }
            inlineEnqObj.inlineISQ=this.checkDNCUser;
            inlineEnqObj.DNCuser= this.checkDNCUser;
            inlineEnqObj.userFilledIsqData= isIsqError=='' && this.checkDNCUser && passIsqVal.userFilledIsqData ? passIsqVal.userFilledIsqData:'';
            inlineEnqObj.callSetIsq= isIsqError=='' &&  this.checkDNCUser && passIsqVal.callSetIsq? passIsqVal.callSetIsq:'';
            inlineEnqObj.quantityShown=isIsqError=='' &&  this.checkDNCUser && passIsqVal.quantityShown ? passIsqVal.quantityShown:'';
            inlineEnqObj.isIsqError=isIsqError==''
        }
        this.props.data && callEnqForm(this.props.data.BRD_MCAT_ID, 
            this.props.data.FOB_PRICE, 
            this.props.data.COMPANYNAME, 
            this.props.data.GLUSR_USR_ID, 
            this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
            this.props.data.PC_ITEM_DISPLAY_ID,
            this.imgSrc,
            obj&&obj.cta_name?obj.cta_name:"Contact Seller",
            this.props.data.CAT_ID,
            this.props.callProps,
            this.props.showModal,
            '',
            inlineEnqObj,
           query_text, 
           this.props.data,
           "3"
             )
    }

    invokeCall() {
        let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
        let usermode = loginModes[checkUserStatus()];
        console.log(usermode);
        eventTracking("Click-To-Call",this.props.callProps.eventAction,`Call-Icon-${usermode}`,true);
        if(this.props.callProps && typeof this.props.callNowClick == "function") {
            let dbTrackingInline = "IMOB_PDP_Enquiry_Sent"
            let tsCode = this.props.callProps.tscode , 
            name = this.props.data.COMPANYNAME, 
            number = this.props.callProps.CONTACT_NUMBER,
            type = this.props.callProps.CONTACT_TYPE,
            glusrID = this.props.callProps.glusrid, 
            itemId = this.props.callProps.itemId, 
            itemName = this.props.callProps.itemName, 
            mcatId = this.props.callProps.mcatid, 
            mcatName = this.props.callProps.mcatname, 
            dbpagetrack = dbTrackingInline, 
            PAID_TYPE = this.props.callProps.PAID_TYPE;
            this.props.callNowClick("कॉल करें", this.imgSrc, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE)
        }
    }

    checkEnquiryStatus() {
        let val = checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID)
        this.setState({enqsent:val});
    }

    inlineDiv() {
        //case 1 dnc
        if(this.checkDNCUser && checkUserStatusFromCookie(this.props.cookie)==1) {
            let getISQData = {
                productName : (this.props.data && this.props.data.PC_ITEM_NAME),
                mcatid : (this.props.data &&this.props.data.BRD_MCAT_ID),
                page : "newPDP"
            }
            return(
                <div className="boxMidl-1">
                    <div className="tl">
                    <div className="clr33 fw  fs14">
                        <p className="mxht1000">{this.props.data && this.props.data.PC_ITEM_NAME}</p></div>
                        <div className="fs12 clr69 cDtl"><p className="mxht1000">by:<span className='notranslate'>{this.props.data && this.props.data.COMPANYNAME}</span>
                        {this.props.data && this.props.data.CITY? (<span>, {this.props.data.CITY}</span>):""}
                        </p>
                        </div>
                    </div>
                {this.state.isqContainer ? <this.state.isqContainer getISQData={getISQData} data={this.props.data} isqResponseVal={this.state.isqResponseVal} setIsqResponse={this.setIsqResponse}/> : (<div className="tl mt5 mb5" style={{height:"55.67px"}}></div>)}
                </div>
            )
        }
        else {
            return (
                <div className="boxMidl">
                <p className="clrBl fw tl mb12 fs17" onClick={()=>{this.invokeEnquiry({eventLabel:"Contact-This-Seller-Clicks",cta_name:"Ask More Variants"})}}>
                <span className="ENQ_LABEL2">अधिक प्रकार पूछें</span></p>
                <div className="tl"><div className="clr33 fs14"><p className="mxht1000">{this.props.data && this.props.data.PC_ITEM_NAME}</p></div>
                <div className="fs12 clr69 cDtl"><p className="mxht1000">by:{this.props.data && this.props.data.COMPANYNAME}
                {this.props.data && this.props.data.CITY? (<span>, {this.props.data.CITY}</span>):""}
                </p>
                </div></div></div>
        )
        }
    }

    inlineDivSkeleton() {
        let userType = 0;
        if(this.checkDNCUser && checkUserStatusFromCookie(this.props.cookie)==1) userType=1;
        return(<section className="promptHandlingClass mt10 mb10 btmtop">
            <div className={"bxsdw fs15 crb tc mt10 mb10 pdr10 pdl10 pdb10 bgw"+ (userType==1? " pdt8 " : " pdt5 ")}>
            <div className="boxMain flx">
                <div className="wd135pxl flxShrnk0">
                    <div className={"fs14 tc mr5 mb2 ht125px"+(userType==1? " bdrLtGry " : " ")}>
                        <img src={this.imgSrc} alt={this.altName} width="125" height="125" className="dib vam mr5 imgCntnr mhw125"/></div>
                </div>
                {this.inlineDiv()}
            </div>
            {this.inlineCTA()}
            </div>
        </section>)
    }

    inlineCTA() {
        if(this.isOneTap && this.state.inlineOneTap) {
            return(<div className="mt5"><this.state.inlineOneTap 
            data={this.props.data} 
            pageName={"PDP"} 
            showModal={this.props.showModal} 
            cta_name={'Contact Seller'} 
            btnName={"Inline_Enquiry"}
            isAbtstWithBluCTA={true}
            /></div>)
        }
        else{
            return(
            <div className="mt5">
            <div id="ContinueBtn" className="bgBlu clrw fs18  pd10 por bxrd4 fw" buttontype={"enquiry|Contact Seller|ContinueBtn"} data-image={this.imgSrc} data-name={this.altName} data-display-id={this.props.data.PC_ITEM_DISPLAY_ID} onClick={()=>{requestAnimationFrame(()=>setTimeout(()=>{this.invokeEnquiry({eventLabel:"continue-clicks",cta_name:"Continue"})}))}}>
                <span className="Contact_Seller dib" buttontype={"enquiry|Contact Seller"} data-image={this.imgSrc} data-name={this.altName} data-display-id={this.props.data.PC_ITEM_DISPLAY_ID}>जारी रखें&nbsp;</span>
                <span className="dib ml5 doubleArrow"></span></div>
        </div>)
        }
    }

    postEnquiryDiv() {
        return(
            <section>
                <div className="bxsdw fs15 crb tc mt10 mb10 pdr10 pdl10 pdt10 lh21 bgw btmtop">
                    <div className="boxMain flx"><div className="wd135pxl flxShrnk0">
                        <div className="br1 tc mr5 mb5 ht125px">
                            <img src={this.imgSrc} alt={this.altName} width="125" height="125" className="dib vam mr5 imgCntnr mhw125"/>
                        </div>
                    </div>
                    <div className="boxMidl tl ml5">
                        <div className="ENQ_LABEL6 fs16 fw por"><span className="tickIcon"></span>Enquiry Sent</div>
                        <span className="fs14 pdt7">to {this.props.data && this.props.data.COMPANYNAME}{this.props.data.CITY && <span>, {this.props.data.CITY}</span> } </span>
                        <span className="ENQ_LABEL7 pdl5">​</span>
                    </div></div>
                    <div className="fs15 crb tc mt5 pdb5 callBtnCntnrPDP por" onClick={()=>{this.invokeCall()}}><span className="  bgmim dib  fw bxrd4 fs18 clrw por callBtnPDP pd10 w100"><i className=" callIconM  bkgImgPstnRpt mr5 dib vam objctFitSclDown" width="14" height="14"></i><span>कॉल करें</span></span></div>
                </div>
            </section>
        )
    }

    render() {
        return(
            <React.Fragment>
            {this.state.enqsent ? this.postEnquiryDiv() :this.inlineDivSkeleton()}
            </React.Fragment>)
    }
}
export default InlineEnquiry;