import React from "react";
import { getCookie, getCookieValByKey } from "../../../Globals/CookieManager";

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.pageType=((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches))?'imlite':'msite';
    this.createAdSlot = this.createAdSlot.bind(this);
  }

  componentWillMount() {
    if (!(window.googletag && window.googletag.pubads)) {
      if(!window.gpt){
        window.gpt=true;
      let script1 = document.createElement("script");
      script1.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script1.async = true;
      document.body.appendChild(script1);
      }
    }
}

  componentDidMount() { 
    window.googletag = window.googletag || { cmd: [] };
    this.createAdSlot();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps.data.id==this.props.data.id && nextProps.uniqueId==this.props.uniqueId)
  //   {
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }

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
    let userConverted = 0;
    if (sessionStorage.getItem("forAds") && sessionStorage.getItem("forAds") == 'converted') {
      userConverted = 1;
    }

    let self = this;

    window.googletag.cmd.push(function () {
      let mcatId = self.props.data.mcatId ? self.props.data.mcatId : "";
      let catId = self.props.data.catId ? self.props.data.catId : "";
      let mcatKey = { 0: 'mcatid', 1: 'mcatid2' }
      window.googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 400,
        renderMarginPercent: 300,
        mobileScaling: 1.0,
      });
      window.googletag.pubads().setCentering(true);
      let slotDefined = window.googletag.defineSlot(self.props.data.name, self.props.data.res, self.props.data.id);
      slotDefined && slotDefined.setTargeting(mcatKey[mcatId % 2], [mcatId])
        .setTargeting('catid', [catId])
        .setTargeting("pagetype", [self.pageType])
        .setTargeting('user-mode', userConverted)
        .setTargeting('User_Indian_Foreign', country_value)
        .setCollapseEmptyDiv(true)
        .addService(window.googletag.pubads())

      window.googletag.enableServices();
      window.googletag.display(self.props.data.id);
    }
    );
  }

  componentWillUnmount() {
    if (window.googletag && window.googletag.destroySlots)
      window.googletag.destroySlots();
  }

  render() {
    return <div className="tc oh mt10 mb10 w100 ma">
            <div data-placeholder='Ad' className="ads df jc ht250px oh " style="height:250px !important">
              <div id={this.props.data.id} ></div>
             </div> 
           </div>
  }
}
export default Ads;
