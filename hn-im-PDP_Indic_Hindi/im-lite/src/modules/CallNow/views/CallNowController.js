import { placeCall } from '../views/Dialer';
import { checkUnVerifiedUser, checkIdentifiedForeignUser, checkUserLocIso } from "../utility/loginHelper";
import React from "react";
import CallLoginOtpController from './CallLoginOtpController';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { pnsVerification } from '../utility/pnsVerification';
import { getCookie} from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
import { addTemp } from '../actions/addC2Ctrack';
// import { loadScript } from '../../CentralizePopUp/utility/helper';
const loginModes={
    0: "Unidentified",
    1: "Identified",
    2: "Full-Login",
    3: "Unidentified-Existing",
  };
class CallNowController extends React.Component {
    constructor(props) {
        super(props);
        this.fetchCallLoginOtpController = this.fetchCallLoginOtpController.bind(this);
        this.fetchDialer = this.fetchDialer.bind(this);
        this.showScreen = this.showScreen.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.userStatus = loginModes[checkUserStatus()];
        this.CWIDataUpdate = this.CWIDataUpdate.bind(this);
        this.CWITrack={}; 
        this.enqProps={};// CWI: call without identification
        const urlSearchParams = window.location && window.location.search ? new URLSearchParams(window.location.search) : '';
        this.params = {};
        if (urlSearchParams) {
            urlSearchParams.forEach((value, key) => {
            this.params[key] = value;
        });
       }
    }

    componentDidUpdate() {
        if (this.props.displayCallNow) {
            this.handleBack();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(!(this.props && nextProps && this.props.callProps==nextProps.callProps)){
            this.userStatus = loginModes[checkUserStatus()];
        }
    }
    handleBack() {
        let self = this;
        window.onpopstate = function (e) {
            let multi_purpose = localStorage.multi_purpose ? JSON.parse(localStorage.getItem("multi_purpose")):'';
            let callCount = multi_purpose && multi_purpose.ctcrecordid ? multi_purpose.ctcrecordid:'';
            self.props.callProps.contactType && self.props.callProps.contactType=="PNS" ? eventTracking(`Click-To-Call${self.props.CWILogin?"|CWI":''}`, `Back-button-clicked|${self.props.callProps.contactType=="PNS"? "PNS" : "NonPNS"}|Call${callCount}`, self.props.callProps.eventLabel, true) :'';
            self.props.CWILogin?self.props.CWIAction(false):'';
             self.props.closeCallNowPopup();
            document.body.style.overflow = "unset";
        }
    }
    CWIDataUpdate(CWIcallProps,param){
        if(checkUserLocIso() == 'IN'){
            let CWIData = localStorage.CWIData?JSON.parse(localStorage.getItem("CWIData")):[[],[]];
            if(!Array.isArray(CWIData)){
                localStorage.removeItem("CWIData");
                CWIData = [[],[]];
            }
            CWIData[0]&&CWIData[0].length>=5 ? CWIData[0].shift():'';
            CWIData[0].push({
                callProps:CWIcallProps
            });
            localStorage.setItem("CWIData", JSON.stringify(CWIData));
        }
         addTemp(param);
        }
    componentWillUnmount() {
        this.props.closeCallNowPopup();
        document.body.style.overflow = "unset";
    }

    componentDidMount() {
        if((this.params && this.params.utm_medium=="cpc") && !window.gtag){
        //     loadScript("https://www.googletagmanager.com/gtag/js?id=AW-11323352026",()=>{
        //       window.dataLayer = window.dataLayer || []
        //        window.gtag=(function (){ dataLayer.push(arguments)})
        //        window.gtag('js', new Date());
        //        window.gtag('config', 'AW-11323352026');
        //   })
        }
        let srchlcpCallDiv = document.getElementById('srchcalldiv');
        srchlcpCallDiv && !window.callClick ? srchlcpCallDiv.parentNode.removeChild(srchlcpCallDiv) : (srchlcpCallDiv ? srchlcpCallDiv.style.display="none" : '') ;
        let srchcallLoader = document.getElementById("blackcallbgSrch");
        srchcallLoader ? srchcallLoader.parentNode.removeChild(srchcallLoader) : "";
        let lcpCallDiv = document.getElementById("pdpcalldiv");
        lcpCallDiv && !window.callClick ? lcpCallDiv.parentNode.removeChild(lcpCallDiv) : (lcpCallDiv ? lcpCallDiv.style.display="none" : '') ;
        let callLoader = document.getElementById("blackCallBg");
        callLoader ? callLoader.parentNode.removeChild(callLoader) : "";
    }
    render() {
        if(this.props.existing=='3' && this.userStatus=="Unidentified"){
            this.userStatus = loginModes[this.props.existing];
        }
        if (this.props.displayCallNow) {
            return (this.showScreen())
        }
        
    }

    fetchDialer() {
        if(this.props.CWILogin){
            this.props.CWIAction(false);
            this.props.closeCallNowPopup();
        }
        else{
        placeCall(this.props, this);
        this.props.closeCallNowPopup();
        }
        this.params && this.params.utm_medium=="cpc" && window.gtag?window.gtag('event','conversion',{'send_to':'AW-11323352026/KFelCOu00uIYENrHspcq'}):"";
        document.body.style.overflow = "unset";
    }

    fetchCallLoginOtpController() {
        document.getElementById("navbar")?document.getElementById("navbar").style.bottom = "-112px":'';
        document.getElementsByClassName("btm590")&&document.getElementsByClassName("btm590")[0]?document.getElementsByClassName("btm590")[0].style.bottom="-1px":'';
        if(history.state!="call_now"){
            history.pushState("call_now", null);
        }
      return <CallLoginOtpController
                callProps={this.props.callProps}
                closeCallNowPopup={this.props.closeCallNowPopup}
                fetchDialer={this.fetchDialer}
                translatedText={this.props.translatedText}
                blockedUser={this.props.blockedUser}
                prop={this.props}
                userStatus={this.userStatus}
                CWITrack = {this.CWITrack}
                callBackEnq={this.callBackEnq}
                />
    }
    showScreen() {
        let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
        if (!checkUnVerifiedUser() || checkIdentifiedForeignUser()) {
            if(!checkIdentifiedForeignUser() && checkUserStatus()!=2 && !this.props.CWILogin){
                pnsVerification(this.props);
            }
            //Show Dialer
            this.fetchDialer();
        }
        else if(this.props.callProps.contactType=='PNS' && !getCookie("ImeshVisitor") && !this.props.CWILogin){
            let pageName = this.props.callProps.dbpagetrack;
            let SellerGlusrID = this.props.callProps.glusrID;
            let SellerNumber = this.props.callProps.contactNumber;
            let ModrefId = this.props.callProps.modrefid ? `|${this.props.callProps.modrefid}` :'';
            let buyerGaCookie = getCookie("_ga");
            let CallTime = new Date().toString().slice(4,16) + new Date().toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true });
            this.CWITrack.eventCategory = "Click-To-Call|CWI"; this.CWITrack.eventLabel = `${buyerGaCookie}|${SellerGlusrID}|${SellerNumber}|${CallTime}|${ModrefId}`;
            this.props.callProps.PAID_TYPE ? eventTracking('Click-To-Call|CWI', `Clicked-PNS|${pageName}|${this.props.callProps.PAID_TYPE}`, `${buyerGaCookie}|${SellerGlusrID}|${SellerNumber}|${CallTime}${ModrefId}`, true):
            eventTracking('Click-To-Call|CWI', `Clicked-PNS|${pageName}`, `${buyerGaCookie}|${SellerGlusrID}|${SellerNumber}|${CallTime}${ModrefId}`, true);
            
            let CWIcallProps={
                callTxt:this.props.callProps.callTxt,
                contactNumber:this.props.callProps.contactNumber,
                glusrID:this.props.callProps.glusrID,
                contactType:this.props.callProps.contactType,
                modrefid:this.props.callProps.modrefid,
                modrefname:this.props.callProps.modrefname,
                query_ref_id:this.props.callProps.query_ref_id,
                query_ref_type:this.props.callProps.query_ref_type,
                dbpagetrack:this.props.callProps.dbpagetrack
            };
            let  param = { 
                callTxt: this.props.callProps.callTxt,
                contactNumber: this.props.callProps.contactNumber, 
                glusrID: this.props.callProps.glusrID, 
                contactType: this.props.callProps.contactType,
                modrefid: this.props.callProps.modrefid,
                modrefname: this.props.callProps.modrefname,
                query_ref_id: this.props.callProps.query_ref_id,
                query_ref_type: this.props.callProps.query_ref_type,
                pageType: this.props.callProps.dbpagetrack, 
                userMode: this.userStatus,
                INSERT_INTO: "PI",
                BUYER_GA_COOKIE: getCookie("_ga"),
                startTime: new Date(new Date().getTime() - (new Date().getTimezoneOffset()*60*1000)).toISOString().replace("T"," ").replace("Z","")
             };
            if(buyerGaCookie){
                this.CWIDataUpdate(CWIcallProps,param);
            }
            else{
                let self = this;
                setTimeout(function () {
                    if(getCookie("_ga")){
                        param.BUYER_GA_COOKIE = getCookie("_ga");
                        self.CWIDataUpdate(CWIcallProps,param);
                    }
                  }, 3000)
            }
            this.fetchDialer();
        }
        else {
            return this.fetchCallLoginOtpController();
        }
    }


}

export default CallNowController;