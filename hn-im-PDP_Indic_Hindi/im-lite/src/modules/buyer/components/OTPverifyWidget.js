import React, {Component} from 'react';
import '../css/loginwidget.css';
import {eventTracking} from '../../../Globals/GaTracking';
import {getCookieValByKey} from '../../../Globals/CookieManager';

class OTPverifyWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {err: '', ciso: "IN", ccode: "+91", displayflag:true,resendMsg:false,otpresent:0,otp1:'',otp2:'',otp3:'',otp4:''}; 
        this.checkInput=this.checkInput.bind(this);
        this.checkInputVal=this.checkInputVal.bind(this);
        this.otpGenerate=this.otpGenerate.bind(this);
        this.otpVerify=this.otpVerify.bind(this);
        this.movenext=this.movenext.bind(this);
        this.getnoskip=this.getnoskip.bind(this);
        this.closeOTPform=this.closeOTPform.bind(this);
        this.clr_movetoNext=this.clr_movetoNext.bind(this);
        this.resendOTP=this.resendOTP.bind(this);
        this.showText=0;
        this.smsReceiver=this.smsReceiver.bind(this);
        this.newMsg = 0;
        this.bySms=false;
    }
    componentWillMount() {
       this.otpGenerate();
    }

    componentDidMount() {
        let getnoskip=this.getnoskip();
        if(getnoskip==true){
            eventTracking('Click-To-Call', 'OTP-Screen-Visible', 'Non-Verified', false)
        }else {
            eventTracking('Click-To-Call', 'OTP-Screen-Visible', 'Instant verification', false)
        }
    }

    shouldComponentUpdate(nextprops, nextstate) {
       
        if(nextprops.authenticated==true){
            (document.getElementById("succLoader")!=null) ? document.getElementById("succLoader").setAttribute('class', 'mbg1 uxMbg dblk'):''; 
            if(document.getElementById("succLoader")!=null) {
                document.getElementById("succLoader").style.display="none";  
            }   
          let getnoskip=this.getnoskip();
          if(getnoskip==true){
            eventTracking('Click-To-Call', 'Submit-Valid', 'Instant verification', false)
            
          }else {
            eventTracking('Click-To-Call', 'Submit-Valid', 'Instant verification', false)
          }
          this.closeOTPform('pophtml_otp','')
        }
        if(document.getElementById('otpTxt1')!=null && document.getElementById('otpTxt2')!=null && document.getElementById('otpTxt3') !=null && document.getElementById('otpTxt4')!=null ) {
           
            let otp_val = (document.getElementById('otpTxt1').value+ document.getElementById('otpTxt2').value+ document.getElementById('otpTxt3').value + document.getElementById   ('otpTxt4').value) || '';
            if(otp_val!='' && nextprops.authenticated==false  )  {
                //return false;
                document.getElementById("doneBtn").removeAttribute('disabled');
                this.showText=0;
               
            } 
            if( nextprops.err!='') {
                document.getElementById("succLoader").removeAttribute('class', 'mbg1 uxMbg dblk');
                document.getElementById("succLoader").style.display="none";
            }
            if( (otp_val!='' && nextprops.authenticated==true)  ) {
                this.closeOTPform('pophtml','')
                return false;
            } 
        } 
        if( (this.state!=nextstate) && nextstate.chatIconVisible ==true ) {
           return false;
        }
    }
   
    componentDidUpdate() { 
        if(this.bySms && this.state.otp1!='' && this.state.otp2!='' && this.state.otp3!='' && this.state.otp4!='') {
            this.otpVerify();
            this.bySms = false;
          }
        if(this.props.authenticated==true ) {
            this.props.clickToCall2('otpVer');
        } 
    }
   

    otpGenerate(typ, e){
        let glusrid = getCookieValByKey('ImeshVisitor', 'glid');
        let ciso = getCookieValByKey('ImeshVisitor', 'iso');
        let usrname=getCookieValByKey('ImeshVisitor', 'mb1');
        let email = ""
        if(ciso!='IN'){
            email = getCookieValByKey('ImeshVisitor', 'em');
            usrname=getCookieValByKey('ImeshVisitor', 'em');
        }
        if (navigator.sms){
            this.newMsg=1;
        }
        let otpData={
            "user" : usrname,
            "type" : 'OTPGEN',
            "authCode" : "",
            "ciso" :  ciso,
            "email" :email,
            "OTPResend":this.state.otpresent,
            "glusr_id" :glusrid,
            "screenName":'IMOB कॉल करें',
            "msg_key":this.newMsg
        }  
        this.props.otpVerification(otpData);
        if(this.newMsg === 1){
            this.smsReceiver();
        }
    }

    resendOTP() {
        var ele = document.getElementById('resendBtn');
        ele.setAttribute("disabled", "disabled");ele.style.opacity = "0.4";
       this.setState({resendMsg:true,otpresent:1,otp1:'',otp2:'',otp3:'',otp4:''}); 
       setTimeout(function(){
        ele.removeAttribute("disabled");ele.style.opacity = "1";
        if(document.getElementById('rsndMsg')) document.getElementById('rsndMsg').innerHTML = "";
        }, 20000);
        this.otpGenerate();
    }
    smsReceiver(){
        navigator.sms.receive()
        .then(
        (msg) => {
                  let code =msg.content.match(/^[\s\S]*otp=([0-9]{4})[\s\S]*$/m)[1];
                  if (code) {
                    let output = [];
                    output= [...code+''].map(n=>+n);
                    this.setState({otp1:output[0],otp2:output[1],otp3:output[2],otp4:output[3]});
                    this.bySms=true;
                    eventTracking("Sms AutoRead","Call-Now","",false);
                  }
                }
            )
            .catch(
              error => { console.log(error); }
          );
      }
    otpVerify(){    
        (document.getElementById("succLoader")!=null) ? document.getElementById("succLoader").setAttribute('class', 'mbg1 uxMbg dblk'):'';    
        let usrname=getCookieValByKey('ImeshVisitor', 'mb1');
        let glusrid = getCookieValByKey('ImeshVisitor', 'glid');
        let otp = (document.getElementById('otpTxt1').value+ document.getElementById('otpTxt2').value+ document.getElementById('otpTxt3').value + document.getElementById   ('otpTxt4').value) || '';
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
                eventTracking('Click-To-Call', 'Submit-Valid', 'Instant verification', false);
                this.showText=1;
                document.getElementById("doneBtn").setAttribute('disabled', true);
                document.getElementById("doneBtn").setAttribute('value', 'Verifying..')
                let otpData ={
                    "user" : usrname,
                    "type" : 'OTPVER',
                    "authCode" :otp,
                    "ciso" :  ciso,
                    "email" :email,
                    "OTPResend":0,
                    "glusr_id" :glusrid,
                    "screenName":'IMOB कॉल करें'
                }
                this.props.otpVerification(otpData);
                (document.getElementById("succLoader")!=null) ? document.getElementById("succLoader").setAttribute('class', 'mbg1 uxMbg dblk'):'';  
            }else {
                this.setState({err:"Please enter correct OTP"});
            }
        }
    }
    
    checkInputVal(e) {
        let num = (document.getElementById('otpTxt1').value+ document.getElementById('otpTxt2').value+ document.getElementById('otpTxt3').value + document.getElementById('otpTxt4').value) || '';
        let errmsg = !isNaN(num) ?true : false
        if(errmsg==true && num.length==4) {
            document.getElementById("doneBtn").removeAttribute('disabled');
            document.getElementById("doneBtn").setAttribute('class', 'bgmim tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20')
        } else {
            document.getElementById("doneBtn").setAttribute('disabled', true);
            document.getElementById("doneBtn").setAttribute('class', 'dgray tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20')
        }
    }
   
    checkInput() {
        let num = (document.getElementById('otpTxt1').value+ document.getElementById('otpTxt2').value+ document.getElementById('otpTxt3').value + document.getElementById   ('otpTxt4').value) || '';
        let errmsg = !isNaN(num) ?true : false
        return errmsg;
    }

    movenext(b,a){
      if(a.target.value) {
          document.getElementById(b).focus()
      }
    }

    getnoskip() { 
        
        var showskip = false;
        var multipurpsStg = JSON.parse(localStorage.getItem("multi_purpose"));
        if (multipurpsStg && multipurpsStg.call_now) {
            var showcount = multipurpsStg.call_now.split(";");
            if (showcount[0] > 1) {
              showskip = true
            } 
        }
        return showskip;
    }

    closeOTPform(popid,e) {
        var pophtml = document.getElementById(popid) ;  
        if(pophtml!=null && pophtml!=undefined ) {
          pophtml.remove()
        }
       
    }

    clr_movetoNext(inputid,event) {
        if (event.which !== 8){
          event.target.value.length >= event.target.maxLength && document.getElementById(inputid).focus()
        } 
    }

    removeOTP(inputid,event) {
        if (event.which == 8) {
            event.preventDefault();
            document.getElementById(inputid).value='';
            document.getElementById(inputid).previousSibling.focus(); 
        }
    }


    render() {
        let usrname=getCookieValByKey('ImeshVisitor', 'mb1');
        var showspan='';
        let eventLabl='';
        let getnoskip=this.getnoskip();
        if(getnoskip==true){
          eventLabl='Non-Verified';
         
          showspan=<span className="fs13 db pdb5 gryclr mgt"  onClick={()=>{document.body.classList.remove('oh');this.closeOTPform('pophtml_otp',''); eventTracking('Click-To-Call', 'Skip', 'Non-Verified', true);}} >Skip and continue browsing</span>
        }  else {
          eventLabl='Instant verification';
         
          showspan=<span className="fs13 db pdb5 gryclr mgt"  onClick={()=>{document.body.classList.remove('oh');this.closeOTPform('pophtml_otp',''); this.props.clickToCall2('skipncall');eventTracking('Click-To-Call', 'Skip', 'Instant verification', true);}}>Skip and Call</span>
        }
        var verhtml = (!(this.state.authenticated)) ?  
          <div id="pophtml_otp">
              <div className="mbg dblk" style="display:block;" ></div>
              <div className="w90 bxrd4 pf z9999 ma tc tp30 blunew pdt15 headSectn lr0" id="asknumber">
              
                <i className="popups db ma ht70 mt15"></i>
                <h2 id="f1" className="db bxrd4_t pd10 fw clrw fs21">To call this seller, verify Your Mobile Number</h2>
                <div id="FBform1_im_popup">
                    <div id="f1" className="bxrd4_b frm ma bgw pdb10 tc">
                      <span className="otpmsg db clr7B mt10 pdt15 fs15">Enter the 4 digit One Time Password</span>
                      <span className="otpmsg db clr7B mb10 fw fs15">(OTP) sent to {usrname}</span>      
                      <div className="pd5 tc">    
                          <span id="divOTPinput" className="dib w70">
                            <input id="otpTxt1" onKeyUp={this.clr_movetoNext.bind(this,'otpTxt2')}  onChange={this.checkInputVal.bind(this)} className="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" value={this.state.otp1} />
                            <input id="otpTxt2" onkeyUp={this.clr_movetoNext.bind(this, 'otpTxt3')} onKeyDown={this.removeOTP.bind(this,'otpTxt2')} onChange={this.checkInputVal.bind(this)} className="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" value={this.state.otp2} />
                            <input id="otpTxt3" onKeyUp={this.clr_movetoNext.bind(this,'otpTxt4')}  onKeyDown={this.removeOTP.bind(this,'otpTxt3')} onChange={this.checkInputVal.bind(this)} class="OTPinput fs16" maxlength="1" type="tel" autocomplete="off" value={this.state.otp3} />
                            <input id="otpTxt4" className="OTPinput fs16"  onChange={this.checkInputVal.bind(this)} onKeyDown={this.removeOTP.bind(this,'otpTxt4')} maxlength="1" type="tel" autocomplete="off" value={this.state.otp4} />
                          </span>
                          
                          <button onClick={()=>{this.resendOTP();  eventTracking('Click-To-Call', 'OTP-Resend', eventLabl, true);}} id="resendBtn" class="dib fs14 clr5a rsndbtn bgw">Resend OTP</button>
                      </div>     
                      
                      {( (this.state.resendMsg==false) && (this.props.pendingOtpMsg!='' || this.props.err != '' ||this.state.err!='' |this.state.alreadySentMsg!='' ) )? <div className="error_msg tc mt20"> {(this.props.pendingOtpMsg || this.state.err || this.props.err)} </div> : ''} 
                      
                      { this.state.resendMsg && <span id="rsndMsg" className="mt20 tc">OTP has been sent</span>}
                      <span id="otpTimer" className="dib fs14 clr5a db clra0" ></span>
                      <div id="otpErr" className="err tc pl10"></div>
                      <input id="doneBtn" name="mobc2cVerifyBtn" onClick={this.otpVerify} value={(this.showText==1) ? "Veryfying..." :"Submit"} type="button" className="tc db dgray clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20" disabled /> 
                      {showspan}
                    </div>
                </div>

                


                <div class="mbg1 uxMbg dn" id="succLoader" ><div class="poa sCntr pd15"><div class="loader"></div></div></div>

              </div>
          </div> :'';


            return (       
                (this.props.authenticated==false) ? verhtml : ''
            )
                    
    }


}
export default OTPverifyWidget

