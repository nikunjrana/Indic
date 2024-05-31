import React from 'react'
import '../css/callNowBanner.css'
import { CallBtn1 } from './CallBtn1';
import { callNowActionDispatcher } from '../actions/callNowActionDispatcher';
import { eventTracking } from '../../../Globals/GaTracking';

export default class CallNowBanner extends React.Component {
  constructor(props) {
    super(props);
    this.callNowClick = this.callNowClick.bind(this);
    this.closeBanner = this.closeBanner.bind(this);
    this.backButtonHandling=this.backButtonHandling.bind(this);
  }
  backButtonHandling(){
    eventTracking("Click-To-Call", 'Closed-CallNowReturnEnqBanner', this.props.callProps.eventLabel, 1);
    this.closeBanner();
  }
  componentDidMount(){
    eventTracking("Click-To-Call", 'Impression-CallNowReturnEnqBanner', this.props.callProps.eventLabel, 0)
    document.body.style.overflow="hidden";
    window.refUrl && window.refUrl[window.refUrl.length - 1] != "somePopUp" ? window.refUrl.push("somePopUp") : "";
    history.state!="callNowBanner"?history.pushState("callNowBanner",null):'';
    sessionStorage.setItem("CallNowBanner", true);
    window.addEventListener("popstate", this.backButtonHandling);
  }
  componentWillUnmount(){
    document.body.style.overflow = 'unset';
    window.removeEventListener("popstate", this.backButtonHandling)
  }
  callNowClick() {
    let modifiedCallProps = {...this.props.callProps,dbpagetrack:this.props.callProps.dbpagetrack + "|CallNowReturnEnqBanner"}
    callNowActionDispatcher(true, modifiedCallProps);
    this.closeBanner();
  }
  closeBanner() {
    this.props.closePopup({});
  }

  render() {
    return (
      <div className='bkggrey ht100 w100 pf lft0 tp0 z9999' onclick={()=>{window.history.back()}}>
        <div id='callNowBanner' className='w100 pf btm0 bgw bxrdTR10' onClick={(e)=>{e.stopPropagation()}}>
          <div className='por pd10'>
            {/* <div className='df closeIcon mb10' onClick={this.closeBanner}>
              <i class="m-img aMClose z999"></i>
            </div> */}
            <div className='df aic'>
              <img className='ht110' src={this.props.callProps.image} />
              <div className='ml10'>
                <div className='fs16 mb20'>Looking for <span className='fw'>{this.props.callProps.modrefname}</span></div>
                <div>Connect instantly with the seller <span className='ttc fw'>{`${this.props.callProps.companyName}${this.props.callProps.city ? ", "+this.props.callProps.city:''}`}</span></div>
              </div>
            </div>
            {this.props.callProps.contactNumber ?
              <div className='df mt20 mb10'>
                <CallBtn1
                  key={this.props.callProps.contactNumber}
                  isButtonDisabledMcat={true}
                  pageName="CallNowBanner"
                  callText={window.pageName && window.pageName.includes("Search") ? "कॉल करें with 1-Click" : "कॉल करें"}
                  eventAction={this.props.callProps.contactType == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS"}
                  eventLabel={this.props.callProps.eventLabel}
                  id={'CallNowBanner' + this.props.callProps.modrefid}
                  displayPopup={() => {
                    this.callNowClick()
                  }}
                />
              </div>
              : ""}
          </div>
        </div>
      </div>
    )
  }
}
