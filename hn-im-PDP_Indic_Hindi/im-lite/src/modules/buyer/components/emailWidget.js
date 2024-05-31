import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import styles from "../../../Globals/imageCss";
import "../css/fcpWidget.css";

import {getQueryStringValue} from "../../../Globals/MainFunctions";
import{getCookieValByKey} from "../../../Globals/CookieManager";
import {gaTrack} from '../../../Globals/GaTracking';

class EmailWidget extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:{
                email:'',
                ciso:'',
                otp:''
            },
            resendMsg: false,
            err: '',
            verifyClick:false
        }
        this.showEmailVerifyPopUp = this.showEmailVerifyPopUp.bind(this);
        this.resendOtp = this.resendOtp.bind(this);
        this.otpInput = this.otpInput.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.trackImpEmail = this.trackImpEmail.bind(this);
        this.userEmail = '';
        this.ciso ='';
    }

    componentDidMount(){
        this.trackImpEmail();
        window.addEventListener("scroll", this.trackImpEmail, {passive:true});
        let valueObj = this.state.value;
        valueObj['email'] = getCookieValByKey('ImeshVisitor', 'em');
        valueObj['ciso'] = (getQueryStringValue('ISO') && getQueryStringValue('autoidentify')) ? getQueryStringValue('ISO') :this.props.ciso || getCookieValByKey('ImeshVisitor', 'iso');
        this.setState({value:valueObj});

    }
    trackImpEmail(){
        var int = document.getElementById("verStripEmail");
        if (int && (int.offsetTop==0 || (window.scrollY + window.innerHeight > (int.offsetTop) && int.offsetTop!=0))) {
            if(getCookieValByKey('ImeshVisitor', 'cmid')=="36"){
                gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "display_impression_seller", 0, true]);
            }
            else{
                gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "display_impression", 0, true]);
            }
            window.removeEventListener('scroll', this.trackImpEmail, false);
        }
        
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.trackImpEmail, false);
    }


    showEmailVerifyPopUp(type){
       let otpData={
        "user" : '',
        "type" : 'OTPGEN',
        "authCode" : '',
        "ciso" :  this.state.value.ciso,
        "email" : this.state.value.userEmail,
        "OTPResend":0,
        "glusr_id" :'',
        "emailVerify":'verify_email'
       }
        this.props.otpVerification(otpData);
        if(document.getElementById("emailVerifyPopUp")){
            if(type=="close"){
                document.getElementById("emailVerifyPopUp").style.display="none";
            }
            else{
                document.getElementById("emailVerifyPopUp").style.display="block";
                gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "otp_popup", 0, true]);
            }
        }
    }
    otpInput(e){
        var num = parseInt(event.target.id.slice(-1))

        if (event.keyCode === 8 && num>1) {
            document.getElementById('otpTxt'+(num-1)).focus();
            document.getElementById('otpTxt'+(num-1)).select();
        } else if(event.keyCode !== 8 && num<4) {
            document.getElementById('otpTxt'+(num+1)).focus();
            document.getElementById('otpTxt'+(num+1)).select();
        }
    
        if(document.getElementById('otpTxt1').value!='' && document.getElementById('otpTxt2').value!='' && document.getElementById('otpTxt3').value!='' && document.getElementById('otpTxt4').value!='') {
            document.getElementById("doneBtn").removeAttribute("disabled");
            let valueObj = this.state.value;
            let otp = document.getElementById('otpTxt1').value+document.getElementById('otpTxt2').value+document.getElementById('otpTxt3').value+document.getElementById('otpTxt4').value;
            if(isNaN(otp)){
                this.setState({err:"Only numbers are allowed"});
            }
            else{
                valueObj['otp'] = document.getElementById('otpTxt1').value+document.getElementById('otpTxt2').value+document.getElementById('otpTxt3').value+document.getElementById('otpTxt4').value
                this.setState({value:valueObj,err:''});
                document.getElementById("doneBtn").setAttribute("class", "tc db clrw fs15 pd10 bxrd20 bxsdw w50 mt10 ma mb20 bgBlu");
            }
        } else {
            document.getElementById("doneBtn").setAttribute("disabled", true);
            document.getElementById("doneBtn").setAttribute("class", "tc db clrw fs15 pd10 bxrd20 bxsdw w50 mt10 ma mb20 dgray");
        }
      }


      resendOtp(){
          let selfstate = this;
          this.setState({resendMsg:true,err:''});
          if(document.getElementById('otpTxt1'))document.getElementById('otpTxt1').value='';
          if(document.getElementById('otpTxt2'))document.getElementById('otpTxt2').value='';
          if(document.getElementById('otpTxt3'))document.getElementById('otpTxt3').value='';
          if(document.getElementById('otpTxt4'))document.getElementById('otpTxt4').value='';

        var ele = document.getElementById('resend_otp');
        ele.setAttribute("disabled", "disabled"); ele.style.cursor = "default"; ele.style.opacity = "0.4";
        if (document.getElementById('rsndMsg')) document.getElementById('rsndMsg').innerHTML = "OTP has been sent";
        gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "otp-resent", 0, true]);
        if(document.getElementById("doneBtn")){
            document.getElementById("doneBtn").setAttribute("disabled", true);
            document.getElementById("doneBtn").setAttribute("class", "tc db clrw fs15 pd10 bxrd20 bxsdw w50 mt10 ma mb20 dgray");
        }
        setTimeout(function () {
          ele.removeAttribute("disabled"); ele.style.cursor = "pointer"; ele.style.opacity = "1";
          if (document.getElementById('rsndMsg')) document.getElementById('rsndMsg').innerHTML = '';
          selfstate.setState({resendMsg:false,err:''});
        }, 10000);  
        let otpData={
            "user" : '',
            "type" : 'OTPGEN',
            "authCode" : '',
            "ciso" :  this.state.value.ciso,
            "email" : this.state.value.userEmail,
            "OTPResend":1,
            "glusr_id" :'',
            "emailVerify":'verify_email'
           }
        this.props.otpVerification(otpData);
      }
      componentWillReceiveProps(nextProps){

            if (nextProps.authenticated && this.state.verifyClick){
                gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "otp_verified", 0, true]);
                if(document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display="none";
                if(document.getElementById("emailVerifyPopUp"))document.getElementById("emailVerifyPopUp").style.display="none";
                if(document.getElementById("verStripEmail"))document.getElementById("verStripEmail").style.display="none";
                if(document.getElementById("verifyEmailThankMsg"))document.getElementById("verifyEmailThankMsg").style.display="block";
                setTimeout(function () {
                    if(document.getElementById("verifyEmailThankMsg"))document.getElementById("verifyEmailThankMsg").style.display="none";
                },2000);
            }
            if (nextProps.pendingOtpMsg!='' || nextProps.err != '' || nextProps.alreadySentMsg){
                this.setState({verifyClick:false});
                if(document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display="none";
            }
       }

       verifyOtp(){
        gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "verify_click", 0, true]);   
        this.setState({verifyClick:true});
        let otp =this.state.value.otp.trim();   
        let errMsg ='';
        if(otp.length<4){
            errMsg="Please enter 4 digit otp"
        }
        else if(isNaN(otp)){
            errMsg="Only numbers are allowed";
        }
        if(errMsg!=""){
            if(document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display="none";
            this.setState({err:errMsg});
        }
        else{
            if(document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display="block";
            let otpData={
                "user" : '',
                "type" : 'OTPVER',
                "authCode" : this.state.value.otp,
                "ciso" :  this.state.value.ciso,
                "email" : this.state.value.userEmail,
                "OTPResend":0,
                "glusr_id" :'',
                "emailVerify":'verify_email',
                "screenName": "IMOB VERIFICATION STRIP"
            }
            this.props.otpVerification(otpData);
        }
       }


    render() {
        
        return (

            <div className="por">
                <div id="verStripEmail" className="db">
                    <div className="pd5 verStrips mt20 mb20" >
                        <p className="fs14 mt5 mb5">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAABHNCSVQICAgIfAhkiAAAATtJREFUKJGdkD0vQ2EUgJ9zeq+rBBHpx0CiEYPJZJMYiESlsZNokNhIZxa/wo/o2qb8CoPNYrUJ2lL9uMdw06a9/VDO9J6v57x5hBFRKSVyAitTNK4l/foxbE6HNb6LC2vAtsFyhUh21LGBELtB6+petnNBd98LsdU/QcobiYxgi901x9GLsSFvxbl5EY6CL1kel6vgSap6l0yPBXHUOxOIAqjfevJrny/tnm92bCVmR0ICmbLVzsVVz2HC6+QwXbXYyVCI5Yl0ywyW1FNpej0bojthyR1IZSZ+EJbZajEpOL0Q+iUrBDIxPQwP+8heQyOZcN2MVPU+ud8DUY2eC9Z3UdU3w57DdQDft2xbslYK8XXFNgcNgjy6fv1hYAeiVRKnAFIuJW8FWxoM+T0cr5ZTsOZ/AQZfrYY79wMQcGE3PbIf2wAAAABJRU5ErkJggg==" />
                            <span> Your email <b>{this.state.value.email}</b> is not verified with IndiaMART. To verify </span>
                            <span className="clrBl fw " id="verStripEnqBt" style=" text-decoration: underline;" onClick={()=>this.showEmailVerifyPopUp("open")}>
                                Click here
                            </span>
                        </p>
                    </div>
                </div>

                <div id="verifyEmailThankMsg" className="crx pd10 ml10 mr10 mt20 mb20 bgCce  brd10  bgCce por fs16 fw dn">
                    Email Successfully Verified! 
                </div>


                <div className="emailpopup" id="emailVerifyPopUp">
                    <div className="w90 bxrd4 pf z9999 ma tc tp30 blunew pdt15" style="left:0;right:0" id="asknumber">
                    <div id="fullLoader" className="poa dn fullsoiloader brd4 " >
                        <div className="loader  poa ">
                        </div>
                    </div>
                        <i style={styles.imageCss().emailwidpopup} className="db ma ht70 mt15"></i>
                        <input type="hidden" value={this.state.value.otp} id="vrfVal"/>
                        <div id="f1" className="db bxrd4_t pd10 fw clrw fs21">Verify your Email</div>
                        <div id="FBform1_im_popup">
                            <div id="f1" className="bxrd4_b frm ma bgw pdb10 tc">
                                <span className="otpmsg db clr7B mt10 pdt15 fs15">Enter the 4 digit One Time Password</span>
                                <span className="otpmsg db clr7B mb10 fw fs15">(OTP) sent to {this.state.value.email}</span>
                                <div className="pd5 tc">    
                                    <span id="divOTPinput" className="dib w70">
                                        <input id="otpTxt1" onKeyUp={(e)=>this.otpInput(e)} className="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" autoFocus/>
                                        <input id="otpTxt2" onKeyUp={(e)=>this.otpInput(e)} className="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" />
                                        <input id="otpTxt3" onKeyUp={(e)=>this.otpInput(e)} className="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" />
                                        <input id="otpTxt4" onKeyUp={(e)=>this.otpInput(e)} className="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" />
                                    </span>
                                    <span id="resend_otp" style="text-decoration:underline;height:fit-content" className="dib fs14 clr5a" onClick={()=>this.resendOtp()}>Resend OTP</span>
                                </div>
                                {this.state.resendMsg && <div id="rsndMsg" className="mt10">OTP has been sent</div>}
                                {!this.state.resendMsg && ( this.props.pendingOtpMsg!='' || this.state.err != '' || this.props.err != '' || this.props.alreadySentMsg!='' ) && <div className="err tc pd10"> {(this.props.pendingOtpMsg || this.state.err || this.props.err || this.props.alreadySentMsg )} </div>}
                                
                                <button id="doneBtn" type="button"  className="tc db clrw fs15 pd10 bxrd20 bxsdw w50 mt10 ma mb20 dgray" style="border-radius:28px;" onClick={()=>this.verifyOtp()}>Submit</button>
                                <span  className="fs13" style="color:#8e8e8e" id="skipBtn" onClick={()=>{this.showEmailVerifyPopUp("close");gaTrack.trackEvent(["Email_Verification", "Email_Verify_Home", "skip", 0, true]);}}>Skip and continue browsing</span>
                            </div>
                        </div>
                    </div>
                </div>



           </div>
        )
    }
}

export default EmailWidget;