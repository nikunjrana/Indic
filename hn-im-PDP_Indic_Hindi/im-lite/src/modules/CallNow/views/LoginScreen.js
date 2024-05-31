import React, { Component } from 'react';
import '../css/loginScreen.css';
import { checkUserLoc, checkUserLocIso } from '../utility/loginHelper';
import { COUNTRY_DROPDOWN_JSON, TOP5COUNTRIES } from '../../../constants/constants';
import { validate_mobile, validate_email } from '../../../Globals/validationMobileEmail';
import { eventTracking } from '../../../Globals/GaTracking';
import { CompanyInfoContainer } from './CompanyInfoContainer';
import { Loader } from './Loader';
import { getCookie, getCookieValByKey } from "../../../Globals/CookieManager";
// import TruecallerCallNow  from "./TruecallerCallNow";
// import {nextBtn} from '../../EnquiryBlForms/utility/Helper';
// import SetAutofill from '../../EnquiryBlForms/utility/SetAutofill';
import { updateTemp, readTemp } from '../actions/addC2Ctrack';
import { pnsVerification } from '../utility/pnsVerification';
// import LoginWithGoogle from '../../EnquiryBlForms/screens/Login/LoginWithGoogle';
import { removalTextNodes } from '../../../Globals/translatorPreact/translatorPatch';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            showLoginScreen: true,
            displayStyle: "tp30",
            selectedCountry: '',
            showCountryList: false,
            showMoreListing: false,
            defaultChecked: false,
            showUsrErr: false,
            errMsg: '',
            showtick: false,
            serviceCall:false,
            autofill:false,
            value:"", 
            defValue : window.callClick && document.getElementById("mobNo1") ? document.getElementById("mobNo1").value : "",
            showCnfPopup:false,
            focusCss:false,
            TruecallerCallNow:'',
            LoginWithGoogle:''
        };
        this.mobileorEmail = this.props.translatedText ? this.props.translatedText.CALL_LABEL_10 : "Mobile Number";
        this.showtnc = false;
        this.btnColor = "bg6d";
        this.disableBtn = true;
        this.ciso = "IN";
        this.cncode = "91";
        this.eventAction = this.props.callProps.contactType == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS";
        this.imeshVisitor = getCookie("ImeshVisitor");
        this.gaCookie = getCookie("_ga");
        this.shiftPopup = this.shiftPopup.bind(this);
        this.unShiftPopup = this.unShiftPopup.bind(this);
        this.showDropDown = this.showDropDown.bind(this);
        this.top5countryList = this.top5countryList.bind(this);
        this.showMore = this.showMore.bind(this);
        this.countryList = this.countryList.bind(this);
        this.changeCountry = this.changeCountry.bind(this);
        this.checkNoLength = this.checkNoLength.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.tnchandler = this.tnchandler.bind(this);
        this.identifyUser = this.identifyUser.bind(this);
        this.closeLoginform = this.closeLoginform.bind(this);
        this.toggleScroll = this.toggleScroll.bind(this);
        this.cnfCancell = this.cnfCancell.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.loginWithGoogle_First = this.loginWithGoogle_First.bind(this);
        this.yandextracking = this.yandextracking.bind(this);
        this.TCLoginhandler = this.TCLoginhandler.bind(this);
        this.callBUWLFABTest = this.props.callProps.eventLabel && this.props.callProps.eventLabel.includes("More-sellers-near-you-1") ? "|ABTest" : "";
        this.verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
        this.filledMobNo = window.callClick ? true : false;
        this.CWILogin= this.props.prop && this.props.prop.prop && this.props.prop.prop.CWILogin &&this.props.prop.prop.CWIAction ? this.props.prop.prop.CWILogin:'';
        this.CWIData = JSON.parse(localStorage.getItem("CWIData"));
        this.nonPns = this.props.callProps.contactType != "PNS" ? true : false;
        let multi_purpose = localStorage.multi_purpose ? JSON.parse(localStorage.getItem("multi_purpose")):'';
        this.callCount = multi_purpose && multi_purpose.ctcrecordid && multi_purpose.ctcrecordid ? multi_purpose.ctcrecordid:'';
        window.addEventListener('focus', this.setAutoFocus, {passive: true});
    }

    setAutoFocus = () => {
        document.getElementById("mobNo") ? document.getElementById("mobNo").focus() : "";

        window.removeEventListener('focus', this.setAutoFocus, {passive: true});
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
    componentWillMount() {
        let eventLabel = this.props.callProps.eventLabel=="More-sellers-near-you-1" ?"BUWLF":this.props.callProps.eventLabel;
        this.CWILogin && this.props.prop.CWITrack ?this.eventTracking(this.props.prop.CWITrack.eventCategory, 'Impression-LoginScreen'+ `${this.props.prop.callProps && this.props.prop.callProps.eventLabel && this.props.prop.callProps.eventLabel.includes("CallNowReturnEnqBanner")? "|"+this.props.prop.callProps.eventLabel:''}`, this.props.prop.CWITrack.eventLabel, 0) : this.eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Impression-LoginScreen', `${eventLabel}|${this.props.userStatus}|${this.verfStatus}`, 0);
        let self = this;
        if (this.props.callScreenType == "foreignUser") {
            self.mobileorEmail = this.props.translatedText ? this.props.translatedText.CALL_LABEL_9 : "Email";
            self.ciso = checkUserLocIso();
            self.cncode = "";
        }
        this.setState({ selectedCountry: checkUserLoc() });


    }

    componentWillUnmount() {
        console.log("unmount");
        let lcpCallDiv = document.getElementById("pdpcalldiv");
        lcpCallDiv ? lcpCallDiv.parentNode.removeChild(lcpCallDiv) : "";
        this.setState({ showLoginScreen: false })
    }
    shiftPopup(){
        this.setState({displayStyle: "tp-40"})
    }

    unShiftPopup(){
        this.setState({displayStyle: "tp30"});
    }
    cnfCancell(){
        this.props.callProps.contactType=="PNS" ? 
        eventTracking(this.props.prop.CWITrack.eventCategory, 'Edit-Clicked', this.props.prop.CWITrack.eventLabel, true):
        eventTracking("Click-To-Call", 'Edit-Clicked', `${this.props.callProps.eventLabel}|${this.props.userStatus}|${this.verfStatus}`, true);
        this.disableBtn = true;
        this.btnColor = "bg6d";
        this.setState({showCnfPopup: false,user:''},()=>{document.getElementById("mobNo")?document.getElementById("mobNo").focus():'';});
        localStorage.setItem("CWIData", JSON.stringify(this.CWIData));
    }
    componentDidUpdate() {
        removalTextNodes();
    }
    componentDidMount() {
        let is_chrome = ((window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) &&(window.navigator.vendor.toLowerCase().indexOf("google") > -1) && window.navigator.userAgent.toLowerCase().indexOf('opr')<0);
        let isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
        if (!this.state.TruecallerCallNow && this.ciso && this.ciso=="IN" && /(android)/i.test(navigator.userAgent) && (!this.imeshVisitor) && this.gaCookie && !this.props.blockedUser && !(is_chrome && this.CWILogin) && !isFirefox) {
            // import(/* webpackChunkName:"TruCaller" */'../../Truecaller/container/TruecallerContainer').then((module) => {
            //   this.setState({ TruecallerCallNow: module.default });
            // })
            document.getElementById("mobNo") ? document.getElementById("mobNo").setAttribute("readonly", "true") : "";
        }
        if(!this.state.LoginWithGoogle && (this.state.selectedCountry !="India" || this.ciso != "IN")){
            // import(/* webpackChunkName:"LoginWithGoogle" */'../../EnquiryBlForms/screens/Login/LoginWithGoogle').then((module) => {
            //     this.setState({ LoginWithGoogle: module.default });
            //   })
        }
        removalTextNodes();
        if(window.callClick && document.getElementById("mobNo")) {
            this.shiftPopup();
            let event = new Event("mobileNoOnChange");
            this.state.defValue != '' ? this.checkNoLength(event) : '';
        }
        document.getElementById("mobNo")?document.getElementById("mobNo").focus():'';
        let self = this;
        if(this.CWIData && this.ciso=="IN" && this.props.callProps.contactType == "PNS"){
            readTemp().then((probNo)=>{
                    let errorMsg = validate_mobile(probNo);
                    if (errorMsg=='') {
                        self.props.callProps.contactType == "PNS" ? 
                        self.eventTracking(self.props.prop.CWITrack.eventCategory, `Impression-Number-Prefilled|${self.props.callProps.eventLabel}`, this.props.prop.CWITrack.eventLabel, 0):
                        self.eventTracking("Click-To-Call", `Impression-Number-Prefilled|${self.props.callProps.eventLabel}`, `${this.props.callProps.eventLabel}|${this.props.userStatus}|${this.verfStatus}`, 0);
                        self.disableBtn = false;
                        self.btnColor = "bg0a";
                        self.setState({showCnfPopup:true, user:probNo, errMsg: '', showUsrErr: false, displayStyle: "tp30"});
                    }
            });
    }
    }

    showEmailorMobile() {
        let self = this;
        let inputField = '';
        let placeholderText = this.props.translatedText ? this.props.translatedText.CALL_LABEL_7 : "Enter 10 digit Mobile Number";
        if (self.state.selectedCountry == "India") {
            self.mobileorEmail = this.props.translatedText ? this.props.translatedText.CALL_LABEL_10 : "Mobile Number";
            self.showtnc = false;
            if(this.state.showCnfPopup){
                inputField = <><div class={"inputFieldAB bxrd25"}>
                <dl class={"fs20 pd10 mobimgAB fw"}>+91</dl>
                <input id="mobNo" class="w100 ma pdl7 bxrd4 fw fs20 mobileInput" onFocus={this.shiftPopup} placeholder={placeholderText} maxlength="10" type="tel" value={this.state.user} disabled/>
                <img className="CallEditIcon" src="https://m.imimg.com/gifs/Asset_2.png" alt="" onClick={this.cnfCancell}/>
            </div>
             {this.state.showUsrErr ? <div id="truecallErr" className={"error_msg dn mb10"}>{this.state.errMsg}</div>: ""}</>
            }
            else{
                inputField = <><div class={`inputFieldAB bxrd25 por ${this.state.focusCss?'user-b':''}`}>
                {this.state.focusCss ? <label for="mobNo" className="txtLabel2 poa fs12 label-usrname lhn" >Enter Your Mobile Number</label> : ""}
                <dl class={"fs20 pd10 mobimgAB fw"}>+91</dl>
                <input id="mobNo" class="w100 ma pdl7 bxrd4 fw fs20 mobileInput" onFocus={()=>{this.shiftPopup(); this.setState({focusCss:true})}} onBlur={()=>{this.setState({focusCss:false})}}  onChange={(e)=>{this.checkNoLength(e)}} placeholder={!this.state.focusCss?placeholderText:''} maxlength="10" type="tel" value={this.state.defValue ?this.state.defValue : this.state.user} onKeyDown={(e) =>{}} autocomplete="tel"/>
                {this.state.showtick ? <div className={`tickk_callLogin ${this.props.callProps.contactType!="PNS"?"mt5":''}`}></div> : ''}
            </div>
            <div id="truecallErr" className={"error_msg dn mb10"}>Could not fetch your details through truecaller, please try login by entering mobile number.</div></>
            }
        }
        else {
            self.mobileorEmail = this.props.translatedText ? this.props.translatedText.CALL_LABEL_9 : "Email";
            self.showtnc = true;
            inputField =
            <div className='df mt5'>
                <div class="inputFieldAB bxrd25" onClick={()=>{this.state.showCountryList? this.setState({ showCountryList: false }):''}}>
                    <label class="emailimgAB por"></label>
                    <input id="email" type="email" onFocus={this.shiftPopup} onChange={this.checkEmail} value={this.state.user} class="w100 ma bxrd4 " placeholder="E-mail Address" autocomplete="email"/>
                </div>
                <div id='customButnCallNowAB' className='googleLogin ml10'
                onClick={()=>{eventTracking("Login-CallNow", "Unidentified", "login_with_Google_Button_Click", true);}}>
                    <div>Or login using</div>
                    <div className='df aic mt5 clref pd69 bxrd4'>
                        <span className='dib googleIcon'></span>
                        <span className='ml5 fs14 clr2F3394 fw'>Google</span>
                    </div>
                </div>
                {this.loginWithGoogle()}
            </div>
        }
        return inputField
    }

    showDropDown() {
        this.state.showCountryList ? this.setState({ showCountryList: false }) : this.setState({ showCountryList: true });
    }

    top5countryList() {
        return (
            TOP5COUNTRIES.map((top5C) => {
                return (
                    <li onClick={() => { this.changeCountry(top5C.cname, top5C.cniso, top5C.cncode), eventTracking("Click-To-Call"+this.callBUWLFABTest, top5C.cname == "India" ? "countrySelect_Indian" : "countrySelect_Foreign", this.props.callProps.eventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true) }} className="country" key={"cc" + top5C.cniso}>
                        {top5C.cname}{" +" + top5C.cncode}
                    </li>);
            })
        );
    }

    showMore() {
        this.setState({ showMoreListing: true, showCountryList: false });
    }

    countryList() {
        return (
            COUNTRY_DROPDOWN_JSON.map((dropdownJson) => {
                return (
                    <li onClick={() => { this.changeCountry(dropdownJson.cnname, dropdownJson.cniso, dropdownJson.cncode) }} className="country" key={"cc" + dropdownJson.cniso}>
                        {dropdownJson.cnname}{" +" + dropdownJson.cncode}
                    </li>);
            })
        );
    }

    changeCountry(cname, cniso, cncode) {
        document.getElementById("CallNowLoginErr")?document.getElementById("CallNowLoginErr").innerHTML='':'';
        this.ciso = cniso;
        this.cncode = cncode;
        this.disableBtn = true;
        this.btnColor = "bg6d";
        this.setState({ selectedCountry: cname, user: '', errMsg: '', showUsrErr: false, showtick: false });
    }


    checkNoLength(event) {
        document.getElementById("truecallErr") ? document.getElementById("truecallErr").innerHTML == 'Could not fetch your details through truecaller, please try login by entering mobile number.' ? document.getElementById("truecallErr").style.display = "none" : '' : '';
        this.state.defValue ? this.setState({user: this.state.defValue}) : '';
        let self = this;
        window.callClick && document.getElementById("mobNo") ? self.filledMobNo = false : '';
        let usrname = event.target ? event.target.value.replace(/[^0-9]+/ig, "") : (this.state.defValue ? this.state.defValue : '');
        let errorMsg = validate_mobile(usrname);
        if (errorMsg !== '') {
            self.disableBtn = true;
            self.btnColor = "bg6d";
            self.setState({ showUsrErr: true, errMsg: errorMsg, user: usrname, showtick: false, defValue : "" })
        }
        else if (usrname.length == 10) {
            self.disableBtn = false;
            self.btnColor = "bg0a";
            self.setState({ user: usrname, errMsg: '', showUsrErr: false, showtick: true,displayStyle: "tp30"});
            document.activeElement.blur();
        }
    }

    checkEmail() {
        let self = this;
        let usrname = event.target.value;
        let errorMsg = validate_email(usrname);
        if (errorMsg !== '') {
            self.disableBtn = true;
            self.btnColor = "bg6d";
            self.setState({ user: usrname, showUsrErr: true, errMsg: errorMsg});
        }
        else {
            if (this.state.defaultChecked) {
                self.disableBtn = false;
                self.btnColor = "bg0a";
            }
            self.setState({ user: usrname, errMsg: '', showUsrErr: false })
        }
    }

    tnchandler() {
        let self = this;
        if (!self.state.defaultChecked && !validate_email(self.state.user)) {
            self.disableBtn = false;
            self.btnColor = "bg0a";
            self.setState({ defaultChecked: true });
        }
        else if(!self.state.defaultChecked){
            self.setState({ defaultChecked: true });
        }
        else {
            self.disableBtn = true;
            self.btnColor = "bg6d";
            self.setState({ defaultChecked: false });
        }
    }

    yandextracking = (isLoginSuccess)=>{
        import(/* webpackChunkName:"Yandex"*/"../../../Globals/yandexTracking").then(module => {
            const paramlValue = getCookieValByKey('iploc', 'gcniso') == 'IN'? 'Number-Submission':'Email-Submission';
            const check = isLoginSuccess ? 'Success':'Failure'
            module.yandexTrackingMultiLevel('Call', paramlValue, check)
        });
    }

    identifyUser() {
        this.setState({serviceCall:true,autofill:true});
        let self = this;
        let usrname = this.state.user;
        let loginData = {
            "use": usrname,
            "ciso": self.ciso,
            "cncode": self.cncode
        }
        let userStatus=this.props.userStatus;
        
        self.props.loginUser(loginData).then((data) => {
            userStatus=="Unidentified" && data.response.msg!="New User created via User creation service"?(userStatus="Unidentified-Existing"):''
            this.verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
            let eventLabel = self.state.showCnfPopup ? 'Prefilled-Number-Submitted' : 'New-Number-Submitted';
            this.CWILogin && this.props.prop.CWITrack ?eventTracking(this.props.prop.CWITrack.eventCategory, `Accepted${this.callCount?'|Call'+this.callCount:''}`, eventLabel+"|"+self.props.callProps.eventLabel, true) : eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Accepted', this.props.callProps.eventLabel+`|${userStatus}|${this.verfStatus}`, true);
            if(self.CWIData){
                updateTemp(userStatus)
                pnsVerification(self.props.prop.prop);
            }
            //self.toggleScroll();
            self.props.checkScreenType();
            if(this.props.err!="" || (document.getElementById("CallNowLoginErr")&&document.getElementById("CallNowLoginErr").innerHTML!="")){
                this.btnColor = "bg6d";
                this.disableBtn = true;
                this.setState({user:'',showtick: false});
                self.yandextracking(false);
            }
            else{
                document.body.style.overflow =  "unset";
                self.setState({showLoginScreen:false});
                self.yandextracking(true);
            }
            this.setState({serviceCall:false})
        });
    }

    loginWithGoogle = () => {
        let formType = "Login-CallNow-AB"
        let self=this;
        return (
            self.state.LoginWithGoogle?
            <self.state.LoginWithGoogle 
            screenName="IMOB कॉल करें"
            fireLogin={self.loginWithGoogle_First}
            formType={formType}
            loginModes="Unidentified" /> :''
        )
    }

    loginWithGoogle_First = (gmail,gname,idtoken) => {
        this.setState({ user: gmail });
        let loginData = {
            userName: gmail,
            id_token: idtoken,
            ciso: this.ciso,
            screenName: "IMOB कॉल करें",
            ccode: this.cncode,
        };
        this.props.prop.prop.loginWithGoogle_First(loginData);
    }

    closeLoginform() {
        this.CWILogin && this.props.prop.CWITrack ?eventTracking(this.props.prop.CWITrack.eventCategory, 'Close-Button-Clicked-IDE', this.props.prop.CWITrack.eventLabel, true) : eventTracking('Click-To-Call'+this.callBUWLFABTest, 'Close-Button-Clicked-IDE', this.props.callProps.eventLabel+`|${this.props.userStatus}|${this.verfStatus}`, true);
        this.setState({ showLoginScreen: false });
        this.toggleScroll();
        this.CWILogin?this.props.prop.prop.CWIAction(false):'';
        this.props.closeCallNowPopup();
        document.body.style.overflow =  "unset";
    }

    toggleScroll() {
        document.body.style.overflow = this.state.showLoginScreen ? "hidden" : "unset";
    }

    userContactHtml(){
        let text = (this.props.translatedText ? this.props.translatedText.CALL_LABEL_11 : "Enter your ") + this.mobileorEmail + (this.props.translatedText ? this.props.translatedText.CALL_LABEL_12 : " to call this seller");
        this.CWILogin ? (text=`${this.state.showCnfPopup?"Confirm":"Provide"} your ` + this.mobileorEmail + " to get a response from the seller"):'';
        return(
            <span class="db m5 fs16 fw">{text}</span>
        )
    }

    submitBtnHtml(){
        let value=this.state.showCnfPopup?"Continue":"Submit";
        return(
            <input type="button" value={value} id="submitBtn" className={`tc db clrw fs18 fw pd10 pdl15 bxrd25 w100 ht48 bxsdw mt20 ma mb20 ${this.btnColor}`} onClick={this.identifyUser} disabled={this.disableBtn} />
        )
    }

    closenBrowseHtml(){
        let text = this.props.translatedText ? this.props.translatedText.CALL_LABEL_8 : "Close and Continue Browsing";
        return(<p className="fs13 pdb5 clr7B mt10" onClick={() => { 
            history.state=="call_now"?history.back():"",
            // window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
             this.closeLoginform() }}>{text}</p>
        )
    }

    errorHtml(){
        document.getElementById("CallNowLoginErr")?document.getElementById("CallNowLoginErr").innerHTML='':'';
        return(
            <div className="error_msg mb10"> {this.props.err || this.state.errMsg} </div>
        )
    }

    tnc(){
        return(
            <div class="tl m10">
            <input className="tncCheckbox" type="checkbox" onChange={this.tnchandler} defaultChecked={this.state.defaultChecked} /> I agree to <a className="txtdecor" href="https://m.indiamart.com/terms-of-use.html" target="_blank">terms</a> and <a className="txtdecor" href="https://m.indiamart.com/privacy-policy.html" target="_blank">privacy policy</a>
        </div>
        )
    }

    showMoreHtml(){
        return(
            <li>
                <p className="show_more" onClick={() => { this.showMore() }}>Show More </p>
            </li>
        )
    }

    countryDropdownHtml() {
        return (
            <dd>
                {this.state.showCountryList ?
                    <ul className="countrylist poa z9999">
                        {this.top5countryList()}
                        {!this.state.showMoreListing ? this.showMoreHtml() : ''}
                        {this.state.showMoreListing ? <div>{this.countryList()}</div> : ''}
                    </ul>
                    : ''}
            </dd>
        )
    }

    selectedCountryHtml(){
        return(
            <dt>
            <a>
                <span className="m3 txtdecor clr0c">{this.state.selectedCountry}</span>
                <div className="droparrow dib "></div>
            </a>
        </dt>
        )
    }

    userDetailsHtml(){
        return(
            <div className="pd10">
            {this.userContactHtml()}
            {getCookieValByKey('iploc', 'gcniso') != 'IN' ?<div className="mt10" >
            <i class="dib glicon mr5"></i>Your Country is <dl class="por dib" onClick={() => { this.showDropDown() }}>
                {this.selectedCountryHtml()}
                {this.countryDropdownHtml()}
            </dl>
            </div>:''}
            
        </div>
        )
    }

    userDetailsHtmlABTest() {
        let text = (this.props.translatedText ? this.props.translatedText.CALL_LABEL_11 : "Enter your ") + this.mobileorEmail + (this.props.translatedText ? this.props.translatedText.CALL_LABEL_12 : " to call this seller");
        let text2 = (this.props.translatedText ? this.props.translatedText.CALL_LABEL_11 : "Enter your ") + this.mobileorEmail + (this.props.translatedText ? this.props.translatedText.CALL_LABEL_12 : " to call");
        this.CWILogin ? (text=`${this.state.showCnfPopup?"Confirm":"Provide"} your ` + this.mobileorEmail + " to get a response from the seller",text2=text):'';
        return (
            <>
            <div className="callUserDiv pd10">
                <span class="db m5 fs16 fw">{text}</span>
                <span class="dn m5 fs16 fw txt2">{text2}
                <span className="db m5 fs16 callPrdCompName">
                    {this.props.callProps.companyName}
                </span>
                </span>
                {getCookieValByKey('iploc', 'gcniso') != 'IN' ? <div className="mt10">
                <i class="dib glicon mr5"></i>Your Country is <dl class="por dib" onClick={() => { this.showDropDown() }}>
                    {this.selectedCountryHtml()}
                    {this.countryDropdownHtml()}
                </dl>
            </div> : ''}
            </div>
            </>
        )
    }
    lowerHtml() {
        return (
            <div>
            <div className="ma bgw pd10 bxgr">
            {this.props && this.props.callProps && this.props.callProps && this.props.callProps.eventLabel == 'More-sellers-near-you-1' ? this.userDetailsHtmlABTest() : this.userDetailsHtml()}
            {/* {this.state.selectedCountry != "India" && !this.nonPns ? <div className='mt-10'>{this.loginWithGoogle()}</div> :''} */}
                {this.showEmailorMobile()}
                {/* <SetAutofill id={this.showtnc?"email":"mobNo"} autofill={this.state.autofill} ciso={this.ciso} formType={'Click-To-Call'} userStatus={this.eventAction}/> */}
                {(this.state.showUsrErr || this.props.err != '') ? this.errorHtml() : ''}
                <div id="CallNowLoginErr" class="error_msg tc mb10"></div>
                {this.showtnc ? this.tnc(): ''}
                {this.submitBtnHtml()}
                {this.closenBrowseHtml()}
            </div>
        </div>
        )
    }

    upperHtml() {
        let props = {
            image: this.props.callProps.image ? this.props.callProps.image : '',
            companyName: this.props.callProps.companyName ? this.props.callProps.companyName : '',
            tsCode: this.props.callProps.tsCode ? this.props.callProps.tsCode : '',
            custtypeWeight: this.props.callProps.custtypeWeight ? this.props.callProps.custtypeWeight : '',
            contactNumber: this.props.callProps.contactNumber ? this.props.callProps.contactNumber : '',
            productName: this.props.callProps.modrefname ? this.props.callProps.modrefname : '',
            companyLocation: this.props.callProps.companyLocation ? this.props.callProps.companyLocation : '',
            productPrice: this.props.callProps.productPrice ? this.props.callProps.productPrice : '',
            eventLabel: this.props.callProps.eventLabel ? this.props.callProps.eventLabel : '',
        }
        return (
            CompanyInfoContainer(props)
        )
    }

    updateErrorMsg = (msg) => {
        this.setState({ showUsrErr: true, errMsg: msg});
    }
    TCLoginhandler = () =>{
        document.body.style.overflow =  "unset";
}

    loginScreenHtml() {
       // document.getElementById("gblLoader").style.display="block";
        return (
            <div>
                <div className="mbg" style="display:block;z-index:1007 !important;" ></div>
                <div className={this.props && this.props.callProps && this.props.callProps.eventLabel == 'More-sellers-near-you-1' ? "callBuwlF mt15p w90 bxrd4 pf z9999 ma tc lr0 bge5 pdt15 " + this.state.displayStyle : "mt15p w90 bxrd4 pf z9999 ma tc lr0 bge5 pdt15 " + this.state.displayStyle}>
                    {this.upperHtml()}
                    {this.lowerHtml()}
                    {this.toggleScroll()}
                    {this.state.serviceCall?Loader():''}
                </div>
                <div className="popupBlur" style=""></div>
            </div>
        )
    }

    render() {
        this.props.truecallerLogin == true ? this.props.fetchDialer() : '';
        return (
            <div>
                {this.state.TruecallerCallNow ?
                (<this.state.TruecallerCallNow
                    screenName="Verification via Truecaller through कॉल करें login IMOB" 
                    closeCallNowPopup={this.props.closeCallNowPopup}
                    callNow={true} 
                    callProps={this.props.callProps} 
                    updateErrorMsg={this.updateErrorMsg} 
                    userStatus= {this.props.userStatus} 
                    pageName={this.props.callProps.eventLabel}
                    loginSuccessHandler={this.TCLoginhandler} 
                    inpId="mobNo"
                    popUpType = {`CallNow|${this.props.callProps.contactType == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS"}`}/>) : '' }
                {this.state.showLoginScreen ? this.loginScreenHtml() : ""}
            </div>
        )
    }
}

export default LoginScreen;