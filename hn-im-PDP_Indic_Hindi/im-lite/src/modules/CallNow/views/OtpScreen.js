import React, { Component } from 'react';
import '../css/otpScreen.css';
import { eventTracking } from '../../../Globals/GaTracking';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { CompanyInfoContainer } from './CompanyInfoContainer';
import {checkCounterValue} from '../utility/loginHelper';
import { Loader } from './Loader';
import { removalTextNodes } from '../../../Globals/translatorPreact/translatorPatch';
class OtpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {displayStyle: "tp30", otp: '', showOtpScreen: true, showResendOtp: true, showTimer: false, timer: 30, showError: false,err: '',borderClass:'borderGrey', verifyCallText:'Submit OTP' , serviceCall:false };
        this.disableBtn = true;
        this.btnColor = "bg6d";
        this.otpEventLabel = "";
        this.usrname=getCookieValByKey('ImeshVisitor', 'mb1');
        this.shiftPopup = this.shiftPopup.bind(this);
        this.unshiftPopup = this.unshiftPopup.bind(this);
        this.checkotpLength = this.checkotpLength.bind(this);
        this.resendOTP = this.resendOTP.bind(this);
        this.otpVerify = this.otpVerify.bind(this);
        this.getSkipnCall = this.getSkipnCall.bind(this);
        this.closeOTPform = this.closeOTPform.bind(this);
        this.toggleScroll = this.toggleScroll.bind(this);
        this.lowerHtml = this.lowerHtml.bind(this);
        this.otpScreenHtml = this.otpScreenHtml.bind(this);
        this.pendingOtpHtml = this.pendingOtpHtml.bind(this);
        this.webOTP = this.webOTP.bind(this);
        this.webOtpTrack = 0;
        this.callBUWLFABTest = this.props.callProps.eventLabel && this.props.callProps.eventLabel.includes("More-sellers-near-you-1") ? "|ABTest" : "";
        this.verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
        this.CWILogin= this.props.prop && this.props.prop.prop && this.props.prop.prop.CWILogin &&this.props.prop.prop.CWIAction ? this.props.prop.prop.CWILogin:'';
    }

    webOTP(){
        this.webOtpTrack = 0;
        if ('OTPCredential' in window) {
            const input = document.querySelector('input[autocomplete="one-time-code"]');
            if (!input) return;
            navigator.credentials.get({
              otp: { transport:['sms'] }
            }).then(otp => {
              input.value = otp.code;
              this.webOtpTrack = 1;
              this.disableBtn = false;
              this.btnClr = "bg0a";
              eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Web-Otp', 'Otp-Received'+`|${this.props.userStatus}|${this.verfStatus}`, true);
              this.setState({ otp: input.value, err: '', showErr: false});
              let callInterval= setInterval(() => {
                if(this.state.otp){
                  this.otpVerify();
                  clearInterval(callInterval);
                }
              },500)
            }).catch(err => {
              console.log(err);
            });        
        }
    }
    eventTracking(a,b,c,d,e){
        imgtm.push({
            'event': (d ? 'IMEvent' : 'IMEvent-NI'), 
            'eventCategory': a,
            'eventAction': b,
            'eventLabel': c,
            'eventValue': d,
        })
    }
    componentDidUpdate() {
        removalTextNodes();
    }
    componentDidMount() {
        removalTextNodes();
        this.eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Impression-OTPScreen', this.props.callProps.eventLabel+`|${this.props.userStatus}|${this.verfStatus}`, 0);
         this.otpEventLabel = checkCounterValue() ? 'Non-Verified' : 'Instant Verification'
        // eventTracking('Click-To-Call'+this.callBUWLFABTest, 'OTP-Screen-Visible', this.otpEventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true)
        let otpdata={ type: "OTPGEN" , mobileNumber:this.props.mobileNumber,
        
    };
        if('OTPCredential' in window){
            otpdata.msg_key = 1;
        }
        this.props.otpVerification(otpdata).then(() =>{
            this.props.otpSuccess ?   eventTracking('Click-To-Call'+this.callBUWLFABTest, 'OTP-Send',"Success"+`|${this.props.userStatus}|${this.verfStatus}`, true) : eventTracking('Click-To-Call'+this.callBUWLFABTest, 'OTP-Send',"Failure"+`|${this.props.userStatus}|${this.verfStatus}`, true);
            this.setState({showError:true})
        });
        this.webOTP();
    }

    componentWillReceiveProps() {
        this.setState({
            showOtpScreen: true
        });
    }

    componentWillUnmount() {
        this.setState({ showOtpScreen: false })
    }

    shiftPopup(){
        this.setState({displayStyle: "tp-40", borderClass:'borderBlue'})
    }

    unshiftPopup(){
        this.setState({displayStyle:'tp30',borderClass:'borderGrey'})
    }

    checkotpLength(event) {
        let Otp = event.target && event.target.value.replace(/[^0-9]+/ig, "");
        if (Otp.length == 4) {
            this.disableBtn = false;
            this.btnColor = "bg0a";
            this.setState({ otp: Otp,err: '',showError:false,displayStyle: "tp30"});
            document.activeElement.blur();
        }
        else {
            this.disableBtn = true;
            this.btnColor = "bg6d";
            this.setState({ otp: Otp});
        }
    }

    resendOTP() {
        this.webOTP();
        let otpdata = {
            type: "OTPGEN",
            otpresent: 1,
            mobileNumber:this.props.mobileNumber,
            otpGlid:this.props.otpGlid,
        };
        if('OTPCredential' in window){
            otpdata.msg_key = 1;
        }
        this.props.otpVerification(otpdata);
        this.CWILogin && this.props.prop.CWITrack ?eventTracking(this.props.prop.CWITrack.eventCategory, 'OTP-Resend', this.props.prop.CWITrack.eventLabel, true) : eventTracking('Click-To-Call'+this.callBUWLFABTest, 'OTP-Resend', this.otpEventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true);
        this.setState({ showResendOtp: false, showTimer: true, otp: '',showError:false });
        let timer = 29;
        let t = setInterval(() => {
            if (timer == 0) {
                clearInterval(t);
                this.setState({ showTimer: false, showResendOtp: true, timer: 30 });
            }
            else {
                this.setState({ timer: timer });
                timer--;
            }

        }, 1000);
    }

    otpVerify() {
        let self = this;
        self.disableBtn = true;
        self.setState({serviceCall:true,verifyCallText:'Verifying'});
        let otpdata = {
            type: "OTPVER",
            authCode: this.state.otp,
            otpGlid:this.props.otpGlid,
            mobileNumber:this.props.mobileNumber,
        }
        this.state.otp ? (self.props.otpVerification(otpdata).then((data) => {
            self.props.checkScreenType();
            if ((self.props.pendingOtpMsg != '' || self.props.errMsg != '' || self.props.alreadySentMsg != '') && !(data && data.response && data.response.Response && data.response.Response.Message=='Mobile Number Verified')){
                this.CWILogin && this.props.prop.CWITrack ?eventTracking(this.props.prop.CWITrack.eventCategory, 'Submit-Invalid', this.props.prop.CWITrack.eventLabel, true) : self.webOtpTrack == 0 ?  eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Submit-Invalid', self.otpEventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true) : eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Submit-Invalid', 'Web-Otp'+`|${this.props.userStatus}|${this.verfStatus}`, false) ;
                this.btnColor = "bg6d";
                self.setState({otp:'',showError:true,verifyCallText:'Submit OTP'});
            }
            else{
                document.body.style.overflow = "unset";
                self.setState({verifyCallText:'Submit OTP',showOtpScreen:false});
                this.CWILogin && this.props.prop.CWITrack ?eventTracking(this.props.prop.CWITrack.eventCategory, 'Submit-Valid', this.props.prop.CWITrack.eventLabel, true) : self.webOtpTrack == 0 ?  eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Submit-Valid', self.otpEventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true) : eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Submit-Valid', 'Web-Otp'+`|${this.props.userStatus}|${this.verfStatus}`, false) ;
            }
            self.setState({serviceCall:false});
        })) : '';

    }

    getSkipnCall() {
        if (this.props.callScreenType == "skipToCall")
        {
            let text = this.props.translatedText ? this.props.translatedText.CALL_LABEL_2 : "Skip and Call";
            return <span className="fs13 pdb5 clr7B mt10" onClick={() => { eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Skip-Call', this.props.callProps.eventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true);this.skipnCall("skipToCall") }}>{text}</span>
        }
        else{
            let text = this.props.translatedText ? this.props.translatedText.CALL_LABEL_3 : "Skip and Continue Browsing";
            return <span className="fs13 pdb5 clr7B mt10" onClick={() => {
            this.CWILogin && this.props.prop.CWITrack ?eventTracking(this.props.prop.CWITrack.eventCategory, 'Close-Button-Clicked-Ver', this.props.prop.CWITrack.eventLabel, true):eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Close-Button-Clicked-Ver', this.props.callProps.eventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true);
            this.closeOTPform("skipToBrowse") }}>{text}</span>
        }
    }

    skipnCall(){
        history.state=="call_now"?history.back():"";
        let self = this;
        this.setState({ showOtpScreen: false });
        document.body.style.overflow = "unset";
        self.props.goToDialer();
    }

    closeOTPform() {
        history.state=="call_now"?history.back():"";
        this.setState({ showOtpScreen: false });
        document.body.style.overflow = "unset";
        this.CWILogin ?this.props.prop.prop.CWIAction(false):'';
        this.props.closeCallNowPopup();
    }

    toggleScroll(){
        document.body.style.overflow = this.state.showOtpScreen ? "hidden" : "unset";
    }

    verifyMobileNumberHtml(){
        let text = this.props.translatedText ? this.props.translatedText.CALL_LABEL_4 : "Verify your Mobile Number";
        return (
            <span class="db mt10 pdt15 fs16 fw">{text}</span>
        )
    }

    enterOtpHtml(){
    let text = <div>{this.props.translatedText ? this.props.translatedText.CALL_LABEL_5 : "Enter the 4 digit One Time Password(OTP) sent to your Mobile Number"} {this.usrname ? ("+91-"+ this.usrname) :this.props.mobileNumber?("+91-"+ this.props.mobileNumber):''} {this.props.translatedText ? this.props.translatedText.CALL_LABEL_13 : "via SMS"}</div>
        return (
            <span class="db clr7B mb10 mt5 fs12 pdl10 pdr10">{text}</span>
        )
    }

    submitBtnHtml(){
        return(
            <div className="por mt15">
            <span class="callimgIco2 poa"></span>
            <input type="button" value={this.state.verifyCallText} className={"tc db clrw fs18 fw pd10 pdl15 bxrd20 bxsdw w70 mt10 ma mb20 " + this.btnColor} onClick={this.otpVerify} disabled={this.disableBtn} />
        </div>
        )
    }

    otpInputHtml(){
        return (
            <div className="pd5 mt20">
            <div className="por dib w70">
                <input id="otpInputDiv" class={"dib h50px bdrA0 bxrd4 fs18 otptxtbox " + this.state.borderClass} autocomplete="one-time-code"
                 onChange={this.checkotpLength} onFocus={this.shiftPopup} maxlength="4" type="tel" placeholder="●●●●" value={this.state.otp} />
                {this.state.showResendOtp ? <span onClick={() => { this.resendOTP()}} class="dib fs14 clr5a poa resndBtn pdl20 w30">{this.props.translatedText ? this.props.translatedText.CALL_LABEL_6 : "Resend OTP"}</span> : ''}
            </div>
        </div>
        )
    }

    timerHtml(){
        return(
            <span class="clr5a dib mt5">Resend OTP in 00:{this.state.timer}</span>
        )
    }

    pendingOtpHtml(){
        return(
            <div className="error_msg tc mb10 mt15"> {this.state.err ? this.state.err : (this.props.pendingOtpMsg || this.props.errMsg || this.props.alreadySentMsg)} </div>
        )
    }

    lowerHtml(){
        return (
            <div>
            <div className="ma bgw pdb10 bxgr">
               {this.verifyMobileNumberHtml()}
               {this.enterOtpHtml()}
               {this.otpInputHtml()}
                {this.state.showTimer ? this.timerHtml() : ""}
                {this.state.showError ? this.pendingOtpHtml() : ''}
                {this.submitBtnHtml()}    
                {this.getSkipnCall()}
            </div>
        </div>
        )
    }

    upperHtml(){
        let props = {
            image:this.props.callProps.image ? this.props.callProps.image : '',
            companyName: this.props.callProps.companyName ? this.props.callProps.companyName : '',
            tsCode: this.props.callProps.tsCode ? this.props.callProps.tsCode : '',
            custtypeWeight: this.props.callProps.custtypeWeight ? this.props.callProps.custtypeWeight : '',
            contactNumber:this.props.callProps.contactNumber ? this.props.callProps.contactNumber : '',
            productName: this.props.callProps.modrefname ? this.props.callProps.modrefname : '',
            companyLocation: this.props.callProps.companyLocation ? this.props.callProps.companyLocation : '',
            productPrice: this.props.callProps.productPrice ? this.props.callProps.productPrice : '',
            eventLabel: this.props.callProps.eventLabel ? this.props.callProps.eventLabel : ''
        }
        return(
            CompanyInfoContainer(props)
        )
    }

    otpScreenHtml() {
        return (
            <div>
                <div className="mbg" style={this.props.callProps.eventLabel.toLowerCase().includes("enquiry-thankyou-") || this.props.callProps.dbpagetrack == "thank-you-rcv" ? "display:block;z-index:99999 !important;" :this.props.callProps.eventLabel.includes("PDP")?"display:block;z-index:1002 !important;":"display:block;"}></div>
                <div className={this.props.callProps.eventLabel.toLowerCase().includes("enquiry-thankyou-") ? "mt15p w90 bxrd4 pf z99999 ma tc lr0 bge5 pdt15 " + this.state.displayStyle : this.props && this.props.callProps && this.props.callProps.eventLabel == 'More-sellers-near-you-1' ? "callBuwlF mt15p w90 bxrd4 pf z9999 ma tc lr0 bge5 pdt15 " + this.state.displayStyle : "mt15p w90 bxrd4 pf z9999 ma tc lr0 bge5 pdt15 " + this.state.displayStyle}>
                    {this.upperHtml()}
                    {this.lowerHtml()}
                    {this.toggleScroll()}
                    {this.state.serviceCall? Loader():''}
                </div>
            </div>
        )

    }

    render() {
        return (
            this.state.showOtpScreen ?
                this.otpScreenHtml() : ''
        )
    }
}

export default OtpScreen;



