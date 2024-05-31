import React from "react";
import LoginScreenContainer from '../container/LoginScreenContainer';
import OtpScreenContainer from '../container/OtpScreenContainer';
import {callNowJourneyTracker} from '../utility/callNowJourneyHelper';
import { getCookie, getCookieValByKey } from "../../../Globals/CookieManager";
import {pnsVerification} from '../utility/pnsVerification';
import { removalTextNodes } from "../../../Globals/translatorPreact/translatorPatch";
class CallLoginOtpController extends React.Component{
constructor(props){
    super(props);
    this.state={
        callComponent:'', 
        skipToDialer:false
    }
    this.checkScreenType = this.checkScreenType.bind(this);
    this.goToDialer = this.goToDialer.bind(this);
    window.refUrl ? window.refUrl.push("somePopUp") : "";
    this.callBUWLFABTest = this.props.callProps.eventLabel && this.props.callProps.eventLabel.includes("More-sellers-near-you-1") ? "|ABTest" : "";
}

render(){
    return(this.showScreen());
}

componentWillMount(){
    this.checkScreenType();
}
componentDidUpdate() {
    removalTextNodes();
}
componentDidMount() {
    removalTextNodes();
}
goToDialer(){
    this.setState({skipToDialer:true})
}

checkScreenType(){
    callNowJourneyTracker().then((res)=>{
        this.setState({callComponent: res});
    })
}

loginScreen(){
    return (<LoginScreenContainer 
        callProps={this.props.callProps}
        callScreenType={this.state.callComponent}
        checkScreenType = {this.checkScreenType}
        translatedText={this.props.translatedText}
        fetchDialer={this.props.fetchDialer}
        closeCallNowPopup={this.props.closeCallNowPopup}
        userStatus={this.props.userStatus}
        prop={this.props}
        />)
}

otpScreen(){
    return(<OtpScreenContainer 
        callProps={this.props.callProps}
        callScreenType={this.state.callComponent}
        checkScreenType = {this.checkScreenType}
        goToDialer = {this.goToDialer}
        translatedText={this.props.translatedText}
        closeCallNowPopup={this.props.closeCallNowPopup}
        userStatus={this.props.userStatus}
        prop={this.props}
        />)
}

dialer(){
    if(this.props.prop && this.props.prop.CWILogin){
        this.props.prop.CWIAction(false);
        return this.props.closeCallNowPopup();
    }
    return (this.props.fetchDialer());
}


showScreen(){
    let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
    let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
    if(this.state.callComponent!=''){
        if((this.state.callComponent == "foreignUser" || this.state.callComponent == "indianUser") && !this.props.blockedUser){
            if(document.getElementById("identification_Popup")) {
                document.getElementById("identification_Popup").style.display = "none";
                document.body.style.overflow = "unset";
                document.body.classList.remove('oh');
            }
            return(this.loginScreen());    
        }
        else if((this.state.callComponent == "skipToCall" && !this.state.skipToDialer) || this.state.callComponent  =="skipToBrowse" || (this.props.blockedUser && this.state.callComponent != "showDialer"))
            {
                if(this.props.callProps.contactType == "PNS" &&!this.props.blockedUser){
                    let pageName = window.pagename?window.pagename:this.props.callProps.dbpagetrack
                    return(<>{this.dialer()};{this.props.prop && this.props.prop.CWILogin ? '': pnsVerification(this.props.prop)}</>)
                }
            return (this.otpScreen());
        }
        else if(this.state.callComponent == "showDialer" || (this.state.skipToDialer || this.state.callComponent == "skipToCall")){
           return(this.dialer());
        }

    }
}
}

export default CallLoginOtpController;