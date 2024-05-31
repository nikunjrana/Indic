import React, { Component } from "react";
import YouTubePlayer from "react-player/lib/players/YouTube";
import { eventTracking } from "../../../../../Globals/GaTracking";
// import { checkDNCUser } from "../../../../CentralizePopUp/utility/helper";
import {validationCheck, handleQntChange, handleChange } from "../../InlineUtility/helper";
import InstagramVideoComponent from "./Instagram";

export default class VideoOverlay extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      media : false
    };
    this.DNCuser = '';
    this.optionList = [];
    this.callBl = this.callBl.bind(this);
    this.getIsqforMCAT = this.getIsqforMCAT.bind(this);
    this.videoPlayers = this.videoPlayers.bind(this);
    this.faceBookPlayer = this.faceBookPlayer.bind(this);
  }
  faceBookPlayer(videoURL){
    return <div className="instacrossMr">
      <div id="facebookDiv" class="fb-video" data-href={`${videoURL}`} data-width="100%" data-show-captions="false" data-allowfullscreen={false} data-height={"320px"} data-autoplay="true"></div>
    </div>
  }
  videoPlayers(){
    let videoType = this.props.videoType;
    if(videoType == "1" || videoType == "2"){
      return <YouTubePlayer
      height={Math.round((window.innerWidth * 360) / 640) + "px"}
      width="100%"
      url={this.props.playVideoURL}
      playing={true}
      controls={true}
      muted={this.state.media}
    />
    }
    else if(videoType == "3" || videoType == "4"){
      const fbscript = document.createElement("script");
      fbscript.type = 'text/javascript';
      fbscript.async = true;
      fbscript.defer = true;
      fbscript.crossOrigin = "anonymous";
      fbscript.id = "fbScript"
      fbscript.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v16.0';
      document.head.appendChild(fbscript);
      return this.faceBookPlayer(this.props.playVideoURL);
    }
    else if(videoType == "5" || videoType == "6"){
      window.FB && !window.FB.__buffer ? window.FB.__buffer = true : '';
      return <>
      <InstagramVideoComponent url={this.props.playVideoURL} videoType={videoType} />
      </>
    }
  }
  componentDidMount(){
      window.FB && window.FB.XFBML &&  window.FB.XFBML.parse ? window.FB.XFBML.parse(): ''
  }
  callBl(props) {
    let inlISQ = document.getElementById("qntInpVidMcat"+this.props.listNumber)?document.getElementById("qntInpVidMcat"+this.props.listNumber):"";
    let qtyUnit = document.getElementById("qntUnitInpVidMcat"+this.props.listNumber)?document.getElementById("qntUnitInpVidMcat"+this.props.listNumber):"";
    let otherPop = document.getElementById("otherPopupVidMcat"+this.props.listNumber)?document.getElementById("otherPopupVidMcat"+this.props.listNumber):"";
    let errorQty = document.getElementById("errQtyUnitVidMcat"+this.props.listNumber)?document.getElementById("errQtyUnitVidMcat"+this.props.listNumber):"";
    let selOpt = document.getElementById("selectedOptVidMcat"+this.props.listNumber)?document.getElementById("selectedOptVidMcat"+this.props.listNumber):"";
    let errorQtyMcat = document.getElementById("errQtyVidMcat"+this.props.listNumber)?document.getElementById("errQtyVidMcat"+this.props.listNumber):"";
    let passIsqVal, isIsqError = this.DNCuser ? validationCheck(inlISQ, qtyUnit, errorQty, otherPop, errorQtyMcat, selOpt):'';
    if((isIsqError == '' && this.DNCuser && this.props.mblIsqData && this.props.mblIsqData!='' && this.props.mblIsqData.status=="success" && this.props.mcatId!="" && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc && this.props.mblIsqData.data[0][0].qDesc=='Quantity')){
        passIsqVal = {
            userFilledIsqData: {
            bResponse: [inlISQ ? inlISQ.value ? inlISQ.value : '' : '', 
            qtyUnit ? qtyUnit.value && qtyUnit.value != "Other" ? qtyUnit.value : (otherPop && otherPop.style.display == "block" && otherPop.value && (qtyUnit && qtyUnit.value == 'Other' ||  qtyUnit.value == 'other') ? otherPop.value : selOpt && selOpt.getAttribute('optionsdesc')) : ''],
            
            qDesc: ["Quantity", "Quantity Unit"],
            
            qId: [inlISQ ? inlISQ.getAttribute('qid') ? inlISQ.getAttribute('qid'): '' : '', qtyUnit ? qtyUnit.options[qtyUnit.selectedIndex].getAttribute('qid') : ''],
            
            isqPriority: [inlISQ ? inlISQ.getAttribute('priority') ? inlISQ.getAttribute('priority') : '' : '', qtyUnit ? qtyUnit.options[qtyUnit.selectedIndex].getAttribute('isqpriority') : ''],
           
            bId: [inlISQ ? inlISQ.getAttribute('bid') ? inlISQ.getAttribute('bid') : '' : '', qtyUnit ? qtyUnit.options[qtyUnit.selectedIndex].getAttribute('optionsid') : '']
        },
        callSetIsq: inlISQ && inlISQ.value && qtyUnit && (qtyUnit.value ? qtyUnit.value : selOpt && selOpt.getAttribute('optionsdesc')) && inlISQ.getAttribute('qid') != undefined && qtyUnit.options[qtyUnit.selectedIndex].getAttribute('qid') != null ? true : false,
   
        quantityShown: this.DNCuser && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc == "Quantity" ? true : false,}
    }
    if((isIsqError == '' && this.DNCuser && this.props.mblIsqData && this.props.mblIsqData!='' && this.props.mblIsqData.status=="success" && this.props.mcatId!="" && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc && this.props.mblIsqData.data[0][0].qDesc=='Quantity') || !this.DNCuser || !(this.props.mblIsqData && this.props.mblIsqData!='' && this.props.mblIsqData.status=="success" && this.props.mcatId!="" && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc && this.props.mblIsqData.data[0][0].qDesc=='Quantity')){
    var obj = {};
    obj.affiliationId = "-97";
    obj.productName = props.translated_name ? props.translated_name : props.searchKey;
    obj.mcatId = props.mcatId;
    obj.catid = props.catId;
    obj.query = '';
    obj.queryText = props.query_text;
    obj.ctaName = "Get Verified Seller";
    obj.modid = 'IMOB';
    obj.isEnquiry = false;
    obj.productImage = props.mcatImg125 ? props.mcatImg125 : 'https://m.imimg.com/gifs/img/prod-img.png';
    obj.EnqBlForm = props.showEnqPopup;
    obj.CEF_form_type = props.type;
    obj.CefProdType = props.prodType;
    obj.R_custtype_weight = "";
    obj.page = props.page;
    obj.inlineISQ = this.DNCuser ?true:false,
    obj.DNCuser = this.DNCuser ? this.DNCuser : '',
    obj.userFilledIsqData = isIsqError=='' && this.DNCuser ? passIsqVal? passIsqVal.userFilledIsqData:'':'',
    obj.callSetIsq = isIsqError=='' &&  this.DNCuser ? passIsqVal? passIsqVal.callSetIsq:'':'',
    obj.quantityShown = isIsqError=='' &&  this.DNCuser ? passIsqVal? passIsqVal.quantityShown:'':'',
    obj.widgetType="Listing"
    props.showModal(obj);
    if(inlISQ && inlISQ.value) inlISQ.value="";
    if(otherPop && otherPop.value) otherPop.value="";
    if(otherPop && otherPop.style.display) otherPop.style.display="none";
    if(errorQty && errorQty.style.display) errorQty.style.display="none";
    }
}
  getIsqforMCAT(){
    let errorQtyMcat = document.getElementById("errQtyVidMcat"+this.props.listNumber);
    let errorQty = document.getElementById("errQtyUnitVidMcat"+this.props.listNumber);
            if(this.props && this.props.isqType == 'ISQ' && this.DNCuser) {
                let data = this.props && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc == 'Quantity' ? this.props.mblIsqData.data[0][1].qOptions : '';
                let quantityUnits = [];
                data ? quantityUnits = [...data] : '';
                    if(quantityUnits.length != 0) {
                        let optionValue=1;
                        let unit0 = quantityUnits[0];
                        quantityUnits.shift();
                        if (this.optionList.length == 0){
                            this.optionList.push(<>
                                <option id={"selectedOptVidMcat"+this.props.listNumber} selected qid={this.props.mblIsqData.data[0][1].qId} optionsdesc={unit0.optionsDesc} optionsid={unit0.optionsId} isqpriority={unit0.isqPriority} className="ttc" style="display:block;"> {unit0.optionsDesc}</option></>
                            );
                        }
                        if (optionValue >= this.optionList.length){
                        for (let n = 0; n < quantityUnits.length; n++) {
                            this.optionList.push(<>
                                <option value={quantityUnits[n].optionsDesc} optionsdesc={quantityUnits[n].optionsDesc} optionsid={quantityUnits[n].optionsId} qid={this.props.mblIsqData.data[0][1].qId} isqpriority={quantityUnits[n].isqPriority} className="ttc"> {quantityUnits[n].optionsDesc}</option></>
                            );
                        }
                    }
                    }
            }
            if(this.DNCuser && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0]){
                return(
                <div className='tl mt5 mb5'>
                    <div className="df mb10">
                            <div className="w60">
                                <input id={"qntInpVidMcat"+this.props.listNumber} type="tel" maxLength="10" placeholder="Enter Quantity" className="brd008b80P fs16 br150015 tc w100 ht42" qdesc={this.props.mblIsqData.data[0][0].qDesc} qid={this.props.mblIsqData.data[0][0].qId} priority={this.props.mblIsqData.data[0][0].priority} qtype={this.props.mblIsqData.data[0][0].qType} bid={this.props.mblIsqData.data[0][0].qOptions[0].optionsId} onChange={(event) => handleQntChange(event.target.value, errorQtyMcat, errorQty)}/>
                                <div id={"errQtyVidMcat"+this.props.listNumber} className="eqerrmsg fs15 mt2"></div>
                            </div>
                            <div className="w40 fl">
                            <div className="por">
                                <input id={"otherPopupVidMcat"+this.props.listNumber} className="fs16 mt10 poa entrUnitMcat" style="display: none;" placeholder="Enter Unit" type="text" onChange={(event) => handleQntChange(event.target.value, errorQtyMcat, errorQty)}/>

                                <select id={"qntUnitInpVidMcat"+this.props.listNumber} value='' optionsdesc='' optionsid='' qid='' isqpriority='' bid='' className="bgw brd008b80P bxrd4 fs16 tc ttc w100 ht42" style="border-radius: 0px 15px 15px 0px; border-left: none;" 
                                onChange={(event) => handleChange(event.target.value, errorQty, document.getElementById("otherPopupVidMcat"+this.props.listNumber))} >
                                {this.optionList}
                                </select>
                              </div>
                              <div id={"errQtyUnitVidMcat"+this.props.listNumber} className="eqerrmsg fs12 mt2"></div>
                            </div>
                    </div>
                </div>
                )
            }
  }
  render(){
    let crossCss = (this.props.videoType == "3" || this.props.videoType == "4") ? "fbcrossMr" : (this.props.videoType == "5" || this.props.videoType == "6") ? "instacrossMr" : '';
    return (
      <>
        <section className="z999 pf lft0 tp0 video-bl ht100">
          <div class="video-bl-backdrop poa" onClick={this.props.closeMedia}></div>
          <div className="por video-bl-iframe-container">
            <div className={`close-video-bl poa ${crossCss}`} onClick={()=>requestAnimationFrame(()=>setTimeout(()=>this.props.closeMedia(),0))}>
              &#10005;
            </div>
            {this.videoPlayers()}
          </div>
          <div className="bgw video-bl-container whNr">
                  <div className="aligCen ml9 df aic jc">
                  <h3 className="fs22 mt3 lineClamp3 wb oh fcb">
                    Looking for <span className="fw">{this.props.mcatName}?</span></h3>
                    <p className="lh23 fs16 mt3 fc75">{this.props.labelText.LABEL22}</p>
                    {this.DNCuser ? this.getIsqforMCAT() :''}
                  </div>
            <button className="fillbtn bgmim clrw pd10 bdrmim bxrd4 bxsdw fs17 w100"
                  onClick={() => {
                    eventTracking( 
                      this.props.clickTracking,
                      `PBR-Mcat-Video${this.props.index}|${this.props.glLastDigit && this.props.glLastDigit%2==0 ? "Even":"Odd"}`,  
                      `${this.props.translated_name ? this.props.translated_name : this.props.searchKey}|BuyleadCTA|IMPCAT|${this.props.usermode}`,
                      true
                    );
                    this.setState({media : true})
                    this.callBl(this.props);
                  }}>
                  Get Verified Sellers 
                  <div className="dib por vam mcatanimateArrow">
                      <div className="mcatarrowSpec mcatarrowSpec-first"></div>
                      <div className="mcatarrowSpec mcatarrowSpec-second"></div>
                  </div>
              </button>
          </div>
        </section>
      </>
    );
  }
};