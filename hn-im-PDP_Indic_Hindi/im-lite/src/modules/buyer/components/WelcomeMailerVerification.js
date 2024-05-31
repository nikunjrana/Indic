import React, {Component} from 'react';
import '../css/loginwidget.css';
import {eventTracking} from '../../../Globals/GaTracking';
import {getCookieValByKey} from '../../../Globals/CookieManager';

class WelcomeMailerVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {err: '', ciso: "IN",resendMsg:false, otpSuccessflag:false}; 
        this.checkInput=this.checkInput.bind(this);
        this.checkInputVal=this.checkInputVal.bind(this);
        this.otpGenerate=this.otpGenerate.bind(this);
        this.otpVerify=this.otpVerify.bind(this);
        this.otp_movenext=this.otp_movenext.bind(this);
        this.resendOTP=this.resendOTP.bind(this);
        this.closeOTPform=this.closeOTPform.bind(this);
        this.clearIconOnFocus=this.clearIconOnFocus.bind(this);
        this.clearIconFocusout=this.clearIconFocusout.bind(this);
        this.OTPvalue ='';
        this.setOTPflag=0;
        this.showText=0;
    }
    componentWillMount() {
       this.otpGenerate();
    }

    componentDidMount() {     
       eventTracking('Welcome_Mail', 'OTP-Screen-Visible', '', false)
    }

    shouldComponentUpdate(nextprops, nextstate) {
        if(document.getElementById('inpOTP1')!=null && document.getElementById('inpOTP2')!=null && document.getElementById('inpOTP3') !=null && document.getElementById('inpOTP4')!=null ) {          
            let otp_val = (document.getElementById('inpOTP1').value+ document.getElementById('inpOTP2').value+ document.getElementById('inpOTP3').value + document.getElementById   ('inpOTP4').value) || '';
            if(nextprops.err!='' && nextprops.authenticated==false  )  {
                document.getElementById('inpOTP1').value='';
                document.getElementById('inpOTP2').value='';
                document.getElementById('inpOTP3').value='';
                document.getElementById('inpOTP4').value='';
                document.getElementById("verifyOtpBtn").removeAttribute('disabled');
                this.showText=0;
            } 
            if( (nextprops.authenticated==true)  ) {
                this.setState({otpSuccessflag: true});		
                this.setOTPflag=1;
            } 
        } 
        if( (this.state!=nextstate) && nextstate.chatIconVisible ==true ) {
           return false;
        }
    }
   


    otpGenerate(typ, e){
        let glusrid = getCookieValByKey('ImeshVisitor', 'glid');
        let ciso = getCookieValByKey('ImeshVisitor', 'iso');
        let usrname=getCookieValByKey('ImeshVisitor', 'mb1');
        let email = "";
        setTimeout(function(){
            if(document.getElementById('rsndMsg')) document.getElementById('rsndMsg').innerHTML = "";
        }, 6000);
        if(ciso!='IN'){
            email = getCookieValByKey('ImeshVisitor', 'em');
            usrname=getCookieValByKey('ImeshVisitor', 'em');
        }
        let otpData={
            "user" : usrname,
            "type" : 'OTPGEN',
            "authCode" : "",
            "ciso" :  ciso,
            "email" :email,
            "OTPResend":this.state.otpresent,
            "glusr_id" :glusrid,
            "screenName":'IMOB WELCOME MAILER'
        }  
        this.props.otpVerification(otpData);
    }

    resendOTP() {
       this.setState({resendMsg:true, otpresent:1}); 
       if(document.getElementById('rsndMsg')) document.getElementById('rsndMsg').innerHTML = "OTP has been sent";
       
        this.otpGenerate();
    }
    checkInput() {
        let num = (document.getElementById('inpOTP1').value+ document.getElementById('inpOTP2').value+ document.getElementById('inpOTP3').value + document.getElementById   ('inpOTP4').value) || '';
        let errmsg = !isNaN(num) ?true : false
        return errmsg;
    }

    otp_movenext(inputid,event) {
        if (event.which !== 8){
          event.target.value.length >= event.target.maxLength && document.getElementById(inputid).focus()
        } 
    }
    removeOTP(indx, event) {
        if (event.which == 8) {
            event.preventDefault();
            document.getElementById(event.target.id).value='';
            //document.getElementById(inputid).previousSibling.focus(); 
            let ty =document.getElementById('divOTPinput').childNodes;
            ty[indx-1].childNodes[1].focus()
        }
    }
    closeOTPform(popid,e) {
        var pophtml = document.getElementById(popid) ;  
        if(pophtml!=null && pophtml!=undefined ) {
            eventTracking('Welcome_Mail', 'Close', '', false);
            pophtml.remove()
        }
    }
    clearIconOnFocus(popid, e, typ) {
        let OTPvalue = (document.getElementById('inpOTP1').value+ document.getElementById('inpOTP2').value+ document.getElementById('inpOTP3').value + document.getElementById   ('inpOTP4').value) || '';
        var pophtml = document.getElementById(popid) ;  
            if( (pophtml!=null && pophtml!=undefined)) {
                document.getElementById(popid).previousSibling.setAttribute('class','dn')
            }
    }
    clearIconFocusout(popid, e ) {
        let OTPvalue = document.getElementById(popid).value;
        var pophtml = document.getElementById(popid) ;  
            if( (pophtml!=null && pophtml!=undefined)) {
                if(OTPvalue!=''){
                    document.getElementById(popid).previousSibling.setAttribute('class','dn')
                } else {
                    document.getElementById(popid).previousSibling.setAttribute('class','plcholderIcon poa')
                }
            }
    }
    checkInputVal(e) {
        let num = (document.getElementById('inpOTP1').value+ document.getElementById('inpOTP2').value+ document.getElementById('inpOTP3').value + document.getElementById('inpOTP4').value) || '';
        let errmsg = !isNaN(num) ?true : false
        if(errmsg==true && num.length==4) {
            document.getElementById("verifyOtpBtn").removeAttribute('disabled');
        } else {
            document.getElementById("verifyOtpBtn").setAttribute('disabled', true);
        }
    }
    otpVerify(){    
        (document.getElementById("succLoader")!=null) ? document.getElementById("succLoader").setAttribute('class', 'mbg1 uxMbg dblk'):'';    
        let usrname=getCookieValByKey('ImeshVisitor', 'mb1');
        let glusrid = getCookieValByKey('ImeshVisitor', 'glid');
        let otp = (document.getElementById('inpOTP1').value+ document.getElementById('inpOTP2').value+ document.getElementById('inpOTP3').value + document.getElementById   ('inpOTP4').value) || '';
        let ciso = getCookieValByKey('ImeshVisitor', 'iso');
        let email = ""
        if(ciso!='IN'){
            email = getCookieValByKey('ImeshVisitor', 'em');
            usrname=getCookieValByKey('ImeshVisitor', 'em');
        }
        if(otp == ''){
            this.setState({err:"OTP cannot be blank"});
        
        } else if(usrname != '' && typeof usrname != "undefined" && otp != ''){
            let haserr=this.checkInput();
            if(haserr==true) {
                this.setState({err:"", resendMsg:false});
                eventTracking('Welcome_Mail', 'OTP_accepted', '', false);
                this.showText=1;
                document.getElementById("verifyOtpBtn").setAttribute('disabled', true);
                document.getElementById("verifyOtpBtn").setAttribute('value', 'Verifying..')
                let otpData ={
                    "user" : usrname,
                    "type" : 'OTPVER',
                    "authCode" :otp,
                    "ciso" :  ciso,
                    "email" :email,
                    "OTPResend":0,
                    "glusr_id" :glusrid,
                    "screenName":'IMOB WELCOME MAILER'
                }
                this.props.otpVerification(otpData);
                (document.getElementById("succLoader")!=null) ? document.getElementById("succLoader").setAttribute('class', 'mbg1 uxMbg dblk'):'';  
            }else {
                eventTracking('Welcome_Mail', 'OTP_incorrect', '', false);
                this.setState({err:"Please enter correct OTP"});
            }
        }
    }
    
    render() {
        let usrmob=getCookieValByKey('ImeshVisitor', 'mb1');
        let usrname=getCookieValByKey('ImeshVisitor', 'fn');
        var formhtml='';
        formhtml = <div className="m10 bgw bxrd6 bxshdw04" id="welcomeverify_screen">
                    <div className="db clr33 pdlr15 fs16 brdD fw bgdark bg-br tc pd15 bxsdw bxrd6 por h43">  
                    <div className="mobileclr">
                        <svg width="48px" height="43px" viewBox="0 0 48 43" version="1.1" xmlns="http://www.w3.org/2000/svg" >  
                        <title>symbil 3</title>
                        <desc>Created with Sketch.</desc>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="symbil-3" fill="#0E3192">
                                <g id="symbil-2">
                                    <g id="symbil">
                                        <g id="Group-4" transform="translate(13.000000, 5.000000)" fill-rule="nonzero">
                                            <path d="M21.847279,0 L5.15197381,0 C2.83560947,0 1,1.81354051 1,4.00665927 L1,33.9933407 C1,36.2286349 2.87931446,38 5.15197381,38 L21.847279,38 C24.1636434,38 25.9992528,36.1864595 25.9992528,33.9933407 C25.9992528,29.1729959 25.9992528,25.5577373 25.9992528,23.1475649 C25.9992528,18.9034026 25.9992528,12.5371592 25.9992528,4.04883463 C26.0429578,1.81354051 24.1636434,0 21.847279,0 Z M24,34.1970803 C24,35.729927 22.7490196,37 21.2392157,37 L4.76078431,37 C3.25098039,37 2,35.729927 2,34.1970803 L2,31 L24,31 L24,34.1970803 Z M24,30 L2,30 L2,7 L24,7 L24,30 Z M24,5 L2,5 L2,3.66666667 C2,2.20833333 3.25098039,1 4.76078431,1 L21.2392157,1 C22.7490196,1 24,2.20833333 24,3.66666667 L24,5 Z" id="Shape"></path>
                                            <path d="M21.6811702,0 L4.31805276,0 C1.90903385,0 0,1.81354051 0,4.00665927 L0,33.9933407 C0,36.2286349 1.95448704,38 4.31805276,38 L21.6811702,38 C24.0901891,38 25.9992229,36.1864595 25.9992229,33.9933407 C25.9992229,29.1729959 25.9992229,25.5577373 25.9992229,23.1475649 C25.9992229,18.9034026 25.9992229,12.5371592 25.9992229,4.04883463 C26.0446761,1.81354051 24.0901891,0 21.6811702,0 Z M23.8333333,34.1970803 C23.8333333,35.729927 22.5397059,37 20.9784314,37 L3.93823529,37 C2.37696078,37 1.08333333,35.729927 1.08333333,34.1970803 L1.08333333,31 L23.8333333,31 L23.8333333,34.1970803 Z M23.8333333,30 L1.08333333,30 L1.08333333,7 L23.8333333,7 L23.8333333,30 Z M23.8333333,5 L1.08333333,5 L1.08333333,3.66666667 C1.08333333,2.20833333 2.37696078,1 3.93823529,1 L20.9784314,1 C22.5397059,1 23.8333333,2.20833333 23.8333333,3.66666667 L23.8333333,5 Z" id="Shape"></path>
                                        </g>
                                        <circle id="Oval" fill-rule="nonzero" cx="25.5" cy="39.5" r="1.5"></circle>
                                        <circle id="Oval" fill-rule="nonzero" cx="18" cy="23" r="1"></circle>
                                        <circle id="Oval" fill-rule="nonzero" cx="23" cy="23" r="1"></circle>
                                        <circle id="Oval" fill-rule="nonzero" cx="28" cy="23" r="1"></circle>
                                        <circle id="Oval" fill-rule="nonzero" cx="33" cy="23" r="1"></circle>
                                        <path d="M3.14815556,14.1133489 L3.7801567,16.1714343 L5.84363001,16.169106 C5.92951557,16.169106 6,16.2407017 6,16.3307784 C6,16.3838931 5.97363771,16.4323511 5.93617552,16.4624737 L5.93617552,16.4624737 L4.26466778,17.7305326 L4.90554885,19.7884724 C4.93191114,19.8738925 4.88792774,19.9639692 4.80648215,19.9917635 C4.75361883,20.0102445 4.69631554,19.9964201 4.65677211,19.9617864 L3.00052675,18.6935821 L1.33345898,19.9686259 C1.26297455,20.0217406 1.16612783,20.0055879 1.11770447,19.9339922 C1.08690222,19.8900452 1.08024227,19.8346022 1.0956434,19.7884724 L1.09342342,19.7884724 L1.73652447,17.7305326 L0.0650167321,16.4623282 C-0.00546769802,16.4092135 -0.0208688235,16.3076407 0.0297745171,16.2358995 C0.0627967501,16.1874415 0.113440091,16.1643038 0.166303413,16.1689605 L2.21881557,16.1712888 L2.85303669,14.1132034 C2.87939898,14.0277833 2.96528453,13.981508 3.04686887,14.006974 C3.09751222,14.0256005 3.13261568,14.0647453 3.14815556,14.1133489 L3.14815556,14.1133489 Z" id="Shape" fill-rule="nonzero"></path>
                                        <g id="star" transform="translate(39.000000, 0.000000)" fill-rule="nonzero">
                                            <path d="M2.09877037,0.0755659281 L2.52010446,1.44762286 L3.89575334,1.44607065 C3.95301038,1.44607065 4,1.49380112 4,1.55385226 C4,1.58926205 3.98242514,1.62156743 3.95745034,1.64164915 L3.95745034,1.64164915 L2.84311185,2.48702171 L3.2703659,3.85898163 C3.28794076,3.91592835 3.25861849,3.97597949 3.20432143,3.994509 C3.16907922,4.00682967 3.13087703,3.99761342 3.10451474,3.97452429 L2.00035117,3.12905472 L0.888972652,3.97908391 C0.841983031,4.0144937 0.777418553,4.00372525 0.745136314,3.95599478 C0.72460148,3.92669681 0.720161516,3.8897348 0.730428933,3.85898163 L0.728948945,3.85898163 L1.15768298,2.48702171 L0.0433444881,1.64155214 C-0.00364513201,1.60614234 -0.013912549,1.53842716 0.019849678,1.49059968 C0.0418645001,1.45829431 0.0756267271,1.44286922 0.110868942,1.44597364 L1.47921038,1.44752585 L1.90202446,0.075468915 C1.91959932,0.018522198 1.97685636,-0.0123279826 2.03124592,0.00464931801 C2.06500814,0.0170670008 2.08841045,0.0431635372 2.09877037,0.0755659281 L2.09877037,0.0755659281 Z" id="Shape"></path>
                                        </g>
                                        <text id="+" font-family="ArialMT, Arial" font-size="10" font-weight="normal">
                                            <tspan x="42.0800781" y="33">+</tspan>
                                        </text>
                                    </g>
                                </g>
                            </g>
                        </g>
                        </svg>
                    </div>
                    <div className="checkmob poa"></div>
                    <div className="otpCross poa"  onClick={()=>{this.closeOTPform('welcomeverify_screen',''); eventTracking('Welcome_Mail', 'Close', '', true);}}>x</div>
                </div>

            { (this.setOTPflag==0)  ? <div className="bgR pd10 mt43">
                    <span className="tc w100 db fs16 clr000 fwb ">Welcome {usrname}!</span>
                    <span className="tc w100 db fontweight lineht clr203 fs14 fwb">Just one more step to verfiy your mobile number</span>
                    <span className="tc w100 db fs12 clr949"> OTP has been sent on your mobile Number <span class="fw clr33"> +91-{usrmob}</span> </span>
                    <span className="tc w100 db fs12 clr949">Please enter below</span>
                    <div className="pd5 tc">
                        <span id="divOTPinput" className="dib w70">
                            <span className="pr"> 
                                <span className="plcholderIcon poa" ></span> 
                                <input id="inpOTP1" onFocus={this.clearIconOnFocus.bind(this, 'inpOTP1')} onFocusOut={this.clearIconFocusout.bind(this, 'inpOTP1')}  onKeyUp={this.otp_movenext.bind(this,'inpOTP2')}  onChange={this.checkInputVal.bind(this)} className=" otp_border fs16" maxlength="1" type="tel" autocomplete="off" />
                            </span>
                            <span className="pr"> 
                                <span className="plcholderIcon poa"></span> 
                                <input id="inpOTP2" onFocus={this.clearIconOnFocus.bind(this, 'inpOTP2')} onFocusOut={this.clearIconFocusout.bind(this, 'inpOTP2')} onKeyUp={this.otp_movenext.bind(this,'inpOTP3')} onKeyDown={this.removeOTP.bind(this, 1)}  onChange={this.checkInputVal.bind(this)} className="otp_border fs16" maxlength="1" type="tel" autocomplete="off" />
                            </span>
                            <span className="pr"> 
                                <span className="plcholderIcon poa"></span>     
                                <input id="inpOTP3" onFocus={this.clearIconOnFocus.bind(this, 'inpOTP3')} onFocusOut={this.clearIconFocusout.bind(this, 'inpOTP3')}  onKeyUp={this.otp_movenext.bind(this,'inpOTP4')} onKeyDown={this.removeOTP.bind(this, 2)}  onChange={this.checkInputVal.bind(this)} class="otp_border fs16" maxlength="1" type="tel" autocomplete="off" />
                            </span>
                            <span className="pr"> 
                                <span className="plcholderIcon poa"></span>     
                                <input id="inpOTP4" onFocus={this.clearIconOnFocus.bind(this, 'inpOTP4')} onFocusOut={this.clearIconFocusout.bind(this, 'inpOTP4')}  onChange={this.checkInputVal.bind(this)} onKeyDown={this.removeOTP.bind(this, 3)} class="otp_border fs16" maxlength="1" type="tel" autocomplete="off" />
                            </span>
                        </span>
                    </div>
                    {( (this.state.resendMsg==false) && (this.props.pendingOtpMsg!='' || this.props.err != '' ||this.state.err!='' |this.state.alreadySentMsg!='' ) )? <div className="error_msg tc mt20"> {(this.props.pendingOtpMsg || this.state.err || this.props.err)} </div> : ''} 
                    <div className="rsndMsg tc mt20" id="rsndMsg"></div>
                    
                    <input id="verifyOtpBtn" name="mobc2cVerifyBtn" type="button" onClick={this.otpVerify.bind(this)} value={(this.showText==1) ? "Veryfying..." :"Submit"} className="bgdark tc db pd10 bxrd20 fs14 fwb mt10 ma mb8 wd40 clrfff" disabled />
                    <div class="tc w100 db   ">
                        <span class="dib fs12 clr000 tc">Didn't receive OTP? </span><span className="rsndbtn fs12 clr699 mrl4" id="resendBtn" onClick={this.resendOTP}>Resend OTP</span>
                    </div>
                </div>  
                : <div class="bgR pd10 mt43"><span class="tc w100 db"><p class="fs14 lineht fwb clr203" >Your Mobile Number successfully verified!</p>
                    <p class="fs12">Thank You ;)</p></span>
                </div>
            }

            </div>;
           
           return (       
                // (this.props.authenticated==false) ? formhtml : ''
                formhtml
            )
                    
    }
}
export default WelcomeMailerVerification

