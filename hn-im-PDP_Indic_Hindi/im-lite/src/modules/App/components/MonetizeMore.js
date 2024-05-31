// import React from "react";
// class MonetizeMore extends React.Component {
//   constructor(props) {
//     super(props);
//     this.pageType = ((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)) ? 'imlite' : 'msite';
//     this.createAdSlot = this.createAdSlot.bind(this);
//     this.hideAd = this.hideAd.bind(this);
//     this.showMinibl =this.showMinibl.bind(this);
//     this.showAppBanner =this.showAppBanner.bind(this);
//     this.showStickyfooterAd = this.showStickyfooterAd.bind(this);
//     this.showAllads =this.showAllads.bind(this);
//     this.state = {
//       isShowingFirstAd: true,
//       showad:true,
//       miniBl:'',
//       appBanner:'',
//     }
//   }

//   componentWillMount(){
//     if(!window.pgdata){
//       window.pgdata=true;
//     let src = "https://c.pubguru.net/pg.indiamart.home.mob.js";
//     let Mmoresrc = document.createElement('script');
//     Mmoresrc.setAttribute('src', src);
//     Mmoresrc.async = true;
//     Mmoresrc.crossOrigin = 'anonymous';
//     document.head.appendChild(Mmoresrc);
//     }
//   }

//   componentDidMount() {
//     window.googletag = window.googletag || { cmd: [] };
//     this.createAdSlot();
//   }

//   hideAd(event, eventType){
//     let self = this;
//     if (eventType === "slotRenderEnded" && self.props.key1 == 'firstHomeAd' && event.slot.getAdUnitPath().includes('_top') && this.props.isUnAds  && event.sourceAgnosticCreativeId==null && event.sourceAgnosticLineItemId==null &&  self.state.isShowingFirstAd  && event.isEmpty) {
//         !self.state.miniBl? import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module) => {
//           self.setState({ miniBl: module.default});	
//         }):""
//         self.setState({ isShowingFirstAd: false });
//     }
//     if (eventType === "slotRenderEnded" && this.props.secondAds && event.slot.getAdUnitPath().includes('_msny') && event.sourceAgnosticCreativeId === null && event.sourceAgnosticLineItemId===null && self.state.isShowingFirstAd && event.isEmpty) {
//         !this.state.appBanner ? import(/* webpackChunkName:"AppBanner" */"./AppAdBanner").then(module => {self.setState({appBanner: module.default}) }) : '';  }

//     if (eventType === "slotRenderEnded" && event.sourceAgnosticCreativeId === null && event.sourceAgnosticLineItemId===null && (event.slot.getAdUnitPath().includes('_rp')) && self.state.showad && event.isEmpty) { 
//       self.setState({showad: false });  }
//   }
//   createAdSlot() {
//     let self = this;
//     window.googletag.cmd.push(function () {
//       window.googletag
//       .pubads()
//       .addEventListener("slotRenderEnded", (event) => {
//         self.hideAd(event, "slotRenderEnded");
// });
//     });
//   }
//   showMinibl() {
//     return (
//       <div className="ht280min">
//         <this.state.miniBl prop={this.props.mblProp} checkforMiniBl={true} type="MiniBl" />
//       </div>
//     )
//   }
//   showAppBanner() {
//     return (
//       <div className="z1 Adslots tc ma pr w100 df ht280 jcc aic mt10 mb10">
//         <div className="tc oh mt10 mb10 w100 ma">
//           <this.state.appBanner
//             page={this.props.type}
//             slotName={this.props.data.name}
//           />
//         </div>
//       </div>
//     )
//   }
//   showStickyfooterAd() {
//     return (
//       <div className={this.props.iscls?'Adslots oh ht50px tc w100 btm62 z999 pf bgw df jcc aic btm590':"Adslots oh ht50px tc w100 btm0 z999 pf bgw df jcc aic btm590"} >
//         <div id={this.props.data.id} className="z1 pg-lazy" ></div>
//       </div>
//     )
//   }

//   showAllads() {
//     return (
//       (this.props.smalltopAds) ?
//         <>
//           {/* <span className="brd9e pd210 bxrd4 fs10 poa">Ad</span> */}
//           <pubguru data-pg-ad={this.props.data.id} ></pubguru>
//         </>
//         :
//         !this.state.showad && this.props.data.id.includes('_rp') ? "" :
//           <div className="z1 Adslots tc ma pr w100 df ht280 jcc aic mt10 mb10">
//             <div className="tc oh mt10 mb10 w100 ma ht280main">
//               <pubguru data-pg-ad={this.props.data.id} ></pubguru>
//             </div>
//           </div>
//         )
//     }
    
//   render() {   
//     let adSlot; 
//     if(!this.state.isShowingFirstAd && this.state.miniBl && this.props.mblProp){
//       adSlot =  this.showMinibl();
//       }
//     else if(this.state.appBanner){
//         adSlot = this.showAppBanner();
//       }
//     else if(this.props.name === "stickyFooter") {
//         adSlot = this.showStickyfooterAd();
//       }
//     else {   
//       adSlot = this.showAllads();
//     }
//     return adSlot;
//   }
// }

// export default MonetizeMore;
