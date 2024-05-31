import React, {Component} from 'react';
import { getCookie } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
import { updateTemp } from '../actions/addC2Ctrack';

export default class TruecallerCallNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err : '',
            show : false
        };
        this.callBUWLFABTest = this.props.callProps.eventLabel && this.props.callProps.eventLabel.includes("More-sellers-near-you-1") ? "|ABTest" : "";
        this.eventCategory = this.props.callNow ? "Click-To-Call"+this.callBUWLFABTest : "";
        this.eventAction = this.props.callProps.contactType == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS";
        this.loginWithTruecaller = this.loginWithTruecaller.bind(this);
        this.RandomkeyGen = this.RandomkeyGen.bind(this);
        this.imeshVisitor = getCookie("ImeshVisitor");
        this.page = this.props.callProps.eventLabel ? this.props.callProps.eventLabel : "";
        this.timeOutTruecaller;
    }

    loginWithTruecaller() {
        this.setState({ show : true });
        var deepLink = "";
        let pollingTCInterval = 0;
        let pollingServiceLimit = 4;
        switch (window.location.host) {
            case "dev-m.indiamart.com":
                deepLink = '&partnerKey=QNEgmef584c330d5647f48cc5e572c8d65268&partnerName=Dev&lang=en&title=SingUp';
                break;
            case "stg-m.indiamart.com":
                deepLink = "&partnerKey=0RCsB0fd26e90fdc9458c83bcf8230ec513e6&partnerName=stg&lang=en&title=SingUp";
                break;
            case "m.indiamart.com":
                deepLink = "&partnerKey=PPRCW293489264204435caf20917d21e1c089&partnerName=IndiaMART&lang=en&title=SingUp";
                break;
            default:
                deepLink = '&partnerKey=QNEgmef584c330d5647f48cc5e572c8d65268&partnerName=Dev&lang=en&title=SingUp';
                break;
        }
        let randomKeyValue = this.RandomkeyGen();
        window.location = this.props.callProps.contactType == "PNS"? 'truecallersdk://truesdk/web_verify?type=btmsheet&requestNonce='+ randomKeyValue +"&partnerKey=PPRCW293489264204435caf20917d21e1c089&partnerName=IndiaMART&lang=en&title=SingUp&loginPrefix=getstarted&loginSuffix=verifymobile&ctaPrefix=continuewith&skipOption=manualdetails"
        :'truecallersdk://truesdk/web_verify?type=btmsheet&requestNonce='+ randomKeyValue +"&partnerKey=PPRCW293489264204435caf20917d21e1c089&partnerName=IndiaMART&lang=en&title=SingUp&loginPrefix=continue&loginSuffix=verifymobile&ctaPrefix=use&skipOption=manualdetails";
        let pollingData = {
              "screenName" : this.props.screenName ? this.props.screenName : "",
              "randomKeyVal" : randomKeyValue,
              trackingData:{eventCategory:this.eventCategory, eventAction:this.eventAction, eventLabel:'truecallerLogin_'+this.page}
        }   
        let that = this;
        const PollingFuntion = () => {
            if (pollingServiceLimit >= 0 && pollingServiceLimit <= 4) {
                if (document.hasFocus() == true) { document.getElementById("truecallerLoader") ? document.getElementById("truecallerLoader").style.display = "none" : '' ; }
                pollingServiceLimit --;                     
                if(this.props.truecallerLogin == true) {
                    // eventTracking(this.eventCategory, this.eventAction, 'truecallerLogin_'+this.page, true);
                    clearInterval(pollingTCInterval);
                    document.body.style.overflow =  "unset";
                }
                else if (this.props.rejLogin) {
                    eventTracking(this.eventCategory, this.eventAction, 'skip-truecaller-popup', true);
                    document.getElementById("truecallerLoader")?document.getElementById("truecallerLoader").style.display="none":'';
                    this.props.resetGlobalValue(); 
                    clearInterval(pollingTCInterval);
                }
                else if (getCookie("ImeshVisitor")) {
                    // eventTracking(this.eventCategory, this.eventAction, 'truecallerLogin_'+this.page, true);
                    updateTemp();
                    clearInterval(pollingTCInterval);
                    document.body.style.overflow =  "unset";
                }
                else {
                    window.truecallerLogin || window.truecallerRej ? "" : that.props.truecallerPolling(pollingData);
                }
                if (document.hasFocus() == false) { document.getElementById("truecallerLoader") ? document.getElementById("truecallerLoader").style.display = "block" : '' ; }
            }
            else {
                document.getElementById("truecallErr") ? document.getElementById("truecallErr").style.display = "block" : '';
                document.getElementById(that.props.elementId) ? document.getElementById(that.props.elementId).focus() : '';
                document.getElementById("truecallerLoader") ? document.getElementById("truecallerLoader").style.display = "none" : '';
                eventTracking(this.eventCategory, this.eventAction, 'truecaller-timeout', true);
                clearInterval(pollingTCInterval);
            }
        }
        const documentFocus = () => {
            window.removeEventListener('focus', documentFocus, {passive: true});
            that.timeOutTruecaller ? clearTimeout(that.timeOutTruecaller):'';
            pollingTCInterval = setInterval(() => {
                PollingFuntion();
            }, 3000);
            PollingFuntion(); 
        }   

        setTimeout(function () {
            if (that.props.elementId && document.getElementById(that.props.elementId)){
                document.getElementById(that.props.elementId).removeAttribute("readonly")
                document.getElementById(that.props.elementId).blur();
            }
            if (document.hasFocus()) {
                if (pollingTCInterval && !(navigator.userAgent.indexOf("Firefox") > -1)) {
                    // clearInterval(pollingTCInterval);
                }
                document.getElementById(that.props.elementId) ? document.getElementById(that.props.elementId).focus() : '';
            } else {
                window.addEventListener('focus', documentFocus, {passive: true});
                that.timeOutTruecaller = setTimeout(function () {
                    window.removeEventListener('focus', documentFocus, { passive: true });
                    document.getElementById("truecallerErr")?document.getElementById("truecallerErr").style.display="block":'';
                    document.getElementById("truecallerLoader")?document.getElementById("truecallerLoader").style.display="none":'';
                    // gaTrack.trackEvent([that.props.userStatus,that.type,"truecaller-timeout_", 0, true]);
                    that.props.updateErrorMsg ? that.props.updateErrorMsg("Could not fetch your details through truecaller, please try login by entering mobile number."):'';
                  }, 30000);
                (that.props.popUp && that.props.popUp == "IdentificationPopUp") || (that.props.pageName && that.props.pageName == 'Login-Icon') ?
                (localStorage.setItem("truecallerimpression", true),
                gaTrack.trackEvent([that.props.userStatus,that.type,"truecaller_impression_"+that.props.pageName, 0, false])):'';
                let gaCookie=getCookie('_ga');
                eventTracking(that.eventCategory, 'Impression-truecallerCallNow|'+that.eventAction, gaCookie, 0);
                document.getElementById(that.props.elementId) ? document.getElementById(that.props.elementId).blur() : '';
                
            }
        }, 600);
    }

    RandomkeyGen() {
        try {
            let rndmstng = '';
            let gaCklastElm = getCookie('_ga').split(".")
            let last5digits = (gaCklastElm[gaCklastElm.length-1]).substring(0, 5);
            if(isNaN(last5digits)) {
               last5digits = Math.floor(Math.random()*90000) + 10000;
            }
            rndmstng = (last5digits + (+ new Date).toString());
            if(typeof rndmstng !='undefined'){
                return rndmstng;
            }
            else{
                return Math.floor(Math.random()*10000000) + 10000000;
            }
           
        }
        catch(err) { console.log(err) }
    }

    render() {
        if ( !this.state.show ) {
            this.loginWithTruecaller()
        }
        return ( 
            <div>
                {this.state.err != ''? <div className="error_msg mt10"> {this.state.err} </div> :''}
                <div id="truecallerLoader" className="mbg dn">
                    <div className="poa sCntrl lcldr"></div>
                </div>
            </div>
        );
    }

}

