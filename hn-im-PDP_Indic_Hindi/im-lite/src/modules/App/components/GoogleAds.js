import React from "react";
import { getCookie, getCookieValByKey } from "../../../Globals/CookieManager";
class GoogleAds extends React.Component {
  constructor(props) {
    super(props);
    this.pageType = ((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)) ? 'imlite' : 'msite';
    this.createAdSlot = this.createAdSlot.bind(this);
    this.foreignuser=getCookie('iploc')?getCookieValByKey('iploc', 'gcniso'):'';
  }
  componentWillMount() { 
    if (!(window.googletag && window.googletag.pubads)) {
      if(!window.gpt){
      window.gpt=true;
      const script = document.createElement("script");
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.async = true;
      document.head.appendChild(script);

      }
    }
}

  componentDidMount() {
    window.googletag = window.googletag || { cmd: [] };
    this.createAdSlot();
  }
 


  createAdSlot() {
    let country_value = '';
    if (getCookie('iploc')) { country_value = getCookieValByKey('iploc', 'gcniso'); }
    if ((country_value == '' || country_value == 'IN') && getCookieValByKey('ImeshVisitor', 'iso') && getCookieValByKey('ImeshVisitor', 'iso') != 'IN') {
      country_value = getCookieValByKey('ImeshVisitor', 'iso') ? getCookieValByKey('ImeshVisitor', 'iso') : '';
    }
    if (country_value == '' || country_value == "IN") {
      country_value = 0;
    }
    else {
      country_value = 1;
    }

    let self = this;
    window.googletag.cmd.push(function () {
      window.googletag
      .pubads()
      window.googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 200,
        renderMarginPercent: 100,
        mobileScaling: 1.0,
      });
      window.googletag.pubads().setCentering(true);
      let slotDefined = window.googletag.defineSlot(self.props.data.name, self.props.data.res, self.props.data.id);
      slotDefined && slotDefined.setTargeting("pagetype", [self.pageType])
      .setTargeting('User_Indian_Foreign', country_value)
      .setCollapseEmptyDiv(true)
      .addService(window.googletag.pubads());
      window.googletag.enableServices();
      window.googletag.display(self.props.data.id);
    });
  }

  componentWillUnmount() {
    if (window.googletag && window.googletag.destroySlots)
      window.googletag.destroySlots();
  }

  render() {
    let adSlot;

     if(this.props.name === "stickyFooter") {
        adSlot = (
          <div  className="Adslots oh ht50px tc w100 btm0 z999 pf bgw df jcc aic btm590" >
            <div id={this.props.data.id} className="z1"></div>
            </div>
        );}
    else {
      adSlot = (
         (this.props.smalltopAds) ?
          <div id={this.props.data.id} ></div>
      :
        <div className='z1 Adslots tc ma pr w100 df ht280 jcc aic mt10 mb10'>
          <div className='tc oh mt10 mb10 w100 ht280 ma'>
              <div id={this.props.data.id} ></div>
          </div>
        </div>)
    }
    return adSlot;
  }
}
export default GoogleAds;
