import React, { Component } from "react";
import "../css/homePbr.css";
import { eventTracking,prevname } from "../../../Globals/GaTracking";
// import EnqBlMain from "../../EnquiryBlForms/components/EnqBlMain";
import { connectionChecking } from '../../../Globals/2gconnection';
import { checkUserMode } from "../../../Globals/MainFunctions";
class PBRContent extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.unmountLcpDiv=this.unmountLcpDiv.bind(this);
    this.callBl = this.callBl.bind(this);
    this.showModal = this.showModal.bind(this);
    this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
    this.state = {
      show: false,
      view: ''
    };
 
  }

  unmountLcpDiv() {
		window.loginClick && document.getElementById("login1") ? document.getElementById("login1").click() : '';
    window.soiBannerClick && document.getElementById("HomeSoiBtn") ? document.getElementById("HomeSoiBtn").click() : '';
    let lcpDiv = document.getElementById("homeLcpDiv");
    let lcpdivf = document.getElementById("lcpfooter");

    window.postClick && document.getElementById("reqFooterDiv") ? document.getElementById("reqFooterDiv").click() : '';
  document.getElementById("enqLoader")? document.getElementById("enqLoader").style.display="none":'';
    window.enquiryClick && document.getElementById("getVerifiedSeller") ? document.getElementById("getVerifiedSeller").click() : '';
    window.searchLoaderDiv && document.getElementById("srchInp") ? document.getElementById("srchInp").click() : '';  
    lcpDiv ? lcpDiv.parentNode.removeChild(lcpDiv) :"";
    lcpdivf ? lcpdivf.parentNode.removeChild(lcpdivf) :"";  
}
loadEnquiryContainer() {
  // if (!this.state.view) {
  //     import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module) => {
  //         this.setState({ view: module.default });
  //     })
  // }
  window.removeEventListener('click', this.loadEnquiryContainer);
  window.removeEventListener('touchstart', this.loadEnquiryContainer);
  window.removeEventListener('scroll', this.loadEnquiryContainer);
}

  componentWillUnmount(){
    let enqDiv = document.getElementById("homeenquirydiv");
    enqDiv ? enqDiv.parentNode.removeChild(enqDiv):"";
    document.getElementById("homeLoginLoader")?document.getElementById("homeLoginLoader").style='display:none':""
    document.getElementById("homeSoiLoader")?document.getElementById("homeSoiLoader").style='display:none':""
    delete window.soiBannerClick;
  }
  componentDidMount(){

    if(!connectionChecking()){ window.addEventListener('click', this.loadEnquiryContainer, { passive: true });
    window.addEventListener('touchstart', this.loadEnquiryContainer, { passive: true });
    window.addEventListener('scroll', this.loadEnquiryContainer, { passive: true });
  }else{
    this.loadEnquiryContainer();
  }
         this.unmountLcpDiv();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props == nextProps && this.state == nextState) {
      return false;
    }
    return true;
  }


  clickHandler = (e) => {
    this.callBl();
    eventTracking("Home-Page-Clicks-PWA", "Top-PBR", "Post-Buy-Requirement|"+ prevname() +'|NextPageName-BuyLead|BuyLeadCTA|Homepage|'+checkUserMode(), true);
  };

  showModal(prop) {
    this.prop = prop;
    this.setState({ show: !this.state.show });
  }

  callBl() {
    let obj = {};
    obj.affiliationId = -44;
    obj.productName = "";
    obj.mcatId = "";
    obj.query = "";
    obj.queryText = "home-page|PWA";
    obj.modid = "IMOB";
    obj.productImage = 'https://m.imimg.com/gifs/img/prod-img.png';
    obj.isEnquiry = false;
    obj.page = "home";
    obj.ctaName = "Get Verified Seller";
    obj.nameCity=true;
    this.showModal(obj);
  };

  render() {
    return (
      <>
        {this.state.show && this.state.view != '' ? (
          <this.state.view closePopup={this.showModal} prop={this.prop} />
        ) : (
          ""
        )}
        <div id= 'buyR' className='df flxDirColumn aic mr15'><div className='buyRbtm df centerItems flxDirColumn' onClick={(e) => this.clickHandler(e)}><div className="clrblck fw fs12 mt15">Discover Verified Sellers</div><div className="clrGry fs10">Share Your product needs with us</div><div id="getVerifiedSeller" className="buyRbtn clrGrn">Post Requirement</div></div>
        </div>
      </>
    );
  }
}
export default PBRContent;