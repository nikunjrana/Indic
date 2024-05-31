import React from 'react';
import { modifyImgSrc, getFirstImg } from "./helpers";
import CallEnquiryCTA from '../CTA/CallEnquiryCTA';
import { eventTracking } from '../../../../Globals/GaTracking';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
// import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import { yandexTrackingMultiLevel } from '../../../../Globals/yandexTracking';
export default class CreateSingleImage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { pdpImgZoom: false, callProps: '', imgSrcVal: '', pinchZoom:'' }
        this.imgDetails=[];
        this.openPopUp = this.openPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.callNowClick = this.callNowClick.bind(this);
        this.loadPinchContainer = this.loadPinchContainer.bind(this);
        this.getFirstImgDetails = this.getFirstImgDetails.bind(this);
        this.eventType = 'pointerdown';
        if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
            this.eventType = 'click';
        }
    }
    componentDidMount() {
        this.setState({ imgSrcVal: this.getImgSrc() });
        this.imgDetails = this.getFirstImgDetails(this.props.data)
        if (this.state.pdpImgZoom) {
            this.imageEde(this.props.data.PC_ITEM_DISPLAY_ID, 'zoom');
        }
        else {
            this.imageEde(this.props.data.PC_ITEM_DISPLAY_ID);
        }
        // window.__TransitionData__=null;
        // callNowActionDispatcher(false);
        if(!window.clickedOnCallNow)
        {  
            callNowActionDispatcher(false);
        }  
        document.getElementById("lcpImage") ? document.getElementById("lcpImage").onclick = this.openPopUp  : "";
        window.addEventListener(this.eventType, this.loadPinchContainer, {passive:true})
        window.addEventListener("scroll", this.loadPinchContainer, {passive:false})
        window.addEventListener("click", this.loadPinchContainer, {passive:false})
    }

    getFirstImgDetails(data){
        let wh='';
        if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_500X500_WH) { wh=data.PC_IMG_SMALL_500X500_WH }
        else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL_WH) { wh = data.PC_ITEM_IMG_SMALL_WH }
        else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_125X125_WH) { wh = data.PC_IMG_SMALL_125X125_WH }
        else wh = "-1,-1";
        let whArr = wh.split(",");
        return ([whArr[0],whArr[1]]);
    }
    loadPinchContainer() {
        if(!this.state.pinchZoom){
            import('react-responsive-pinch-zoom-pan').then((module) => {
               this.setState({pinchZoom:module.default})
            });
          }
        window.removeEventListener(this.eventType,this.loadPinchContainer)
        window.removeEventListener('click',this.loadPinchContainer)
        window.removeEventListener('scroll',this.loadPinchContainer)
    }
    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE='') {
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE:PAID_TYPE };
        callNowActionDispatcher(true, callProps);
      
    }
    getImgSrc() {
        let imgSrc = getFirstImg(this.props.data).firstImg;
        this.props.productImgcallback(imgSrc);
        return modifyImgSrc(imgSrc);
    }
    openPopUp() {
        window.refUrl ? window.refUrl.push("somePopUp") : "";
        history.pushState({ imG: 'carouselPopup' }, "", "");
        this.setState({ pdpImgZoom: true });
        document.body.classList.add("ohi");
        yandexTrackingMultiLevel("Product-Page-Clicks","Product-Image-Zoom","Open");
    }

    closePopUp(intLand=false) {
        document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";
        intLand?( window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? history.back() : ''):"";
        this.setState({ pdpImgZoom: false });
        document.body.classList.remove("ohi");
        window.clickedOnCallNow?callNowActionDispatcher(false):"";
        document.getElementsByTagName("BODY") && document.getElementsByTagName("BODY")[0] ? document.getElementsByTagName("BODY")[0].style.removeProperty("overflow") : '';
        yandexTrackingMultiLevel("Product-Page-Clicks","Product-Image-Zoom","Close");
    }
    
    componentDidUpdate(prevProps) {
        let that = this;
        if (this.state.pdpImgZoom) {
            window.onpopstate = function (e) {
                e.preventDefault();
                that.closePopUp();
            }
            this.imageEde(this.props.data.PC_ITEM_DISPLAY_ID, 'zoom');
        } 
        // else { 
        //     this.imageEde(this.props.data.PC_ITEM_DISPLAY_ID); 
        // }
        
        if(prevProps!=this.props)
        {
            this.setState({ imgSrcVal: this.getImgSrc() })

        }
    }

 

    imageEde(displayid, zoom) {
        if (document.querySelector("#pimage" + displayid)) {
            var neww = screen.width, newh = '', h = '', w = '',
                newimg = document.querySelector("#pimage" + displayid).getElementsByTagName("img");
            if (neww <= 780) {
                var zoomImg = document.getElementById('attachedN');
                var zoomImght = zoomImg.clientHeight;
                h = getFirstImg(this.props.data).h;
                w = getFirstImg(this.props.data).w;
                newh = (h / w) * neww;
                if (w >= 250 && h >= 250) {
                    newimg[0].style.width = neww + "px";
                    newimg[0].style.maxHeight = "inherit";
                    newimg[0].style.maxWidth = "inherit";
                    newimg[0].style.top = "0";
                    if (newh >= 500) {
                        if (zoom == 'zoom') { newimg[0].style.width = "auto"; }
                        document.querySelector('#pimage' + displayid).style.height = "425px";
                        newimg[0].style.setProperty('width', 'initial');
                    }
                    else {
                        document.querySelector("#pimage" + displayid).style.height = "330px";
                    }

                }

            }
        }
        this.props.isImageEdgeToEdge? this.props.isImageEdgeToEdge(true): ''; 
    }

    componentWillUnmount() {
        this.setState({ imgSrcVal: "" })
        window.onpopstate = () => {} ;
        document.body.classList.remove("ohi");
    }

    showProdName(){
        if(this.props.productName.props.prdNameOnZoom == 'prdNameOnZoom'){

            const share = () => {
                if (navigator.share) {
                    let url = (document.querySelector("link[rel='canonical']").href?document.querySelector("link[rel='canonical']").href:'') + "?utm_campaign=imob_pdp_share&utm_medium=social&utm_source=social";
                    
                    let isProdServ =this.props.data.IS_PROD_SERV;
                    let title = this.props.data.PC_ITEM_DISPLAY_NAME?this.props.data.PC_ITEM_DISPLAY_NAME: this.props.data.PC_ITEM_NAME;
                    let titleWithLable = isProdServ=="P" ?'Product Name: '+title :'Service Name: '+title;
                    
                    let prdPrice = this.props.data.PRODUCT_PRICE? '\n\n' + 'Price: '+ this.props.data.PRODUCT_PRICE  :'';
                    let description = this.props.data.METADESC? '\n\n'+'Sold by: '+ this.props.data.METADESC:'';

                    let formatedContent = titleWithLable+  prdPrice  + description;

                    navigator.share({
                    title: title,
                    text: formatedContent,
                    url: url,
                  });
                }
              };
         
         const zoomBottomHead = (
                <div className="zoomBottomHead ht50 pf w100 tp0 l0 z1000">
                    <div id="carClss" onClick={()=>{let intLand =true;this.closePopUp(intLand)}} className="bdrC bxrd8 l0 m5 pd10 poa tp0 bgw fadeInItem2s">
                    <span className="dib bckArwZmBlack vam"></span><span class="dib ml5">Back</span>
                    </div>
                    {navigator.share && (
                    <div id="shareSection" onClick={() => {
                            eventTracking('Product-Page-Clicks', 'ImageZoom-ShareURL-Open|ABTest', this.props.data.PC_ITEM_DISPLAY_ID, true)
                            share();
                    }} className="poa tp0 r0 createCarousel shareContnr tc m5 bgw fadeInItem2s">
                        <span className="dib shareIconBlck bkgImgPstnRpt vam"></span>
                        <span class="dib ml5">Share</span>
                    </div>)}

                </div>)

            return(zoomBottomHead)
        }
    }

    render() {
        let imgSrc = this.state.imgSrcVal,
        imgView = '';
        let prdName = this.props.data.PC_ITEM_NAME? this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME:'';
        let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        if (this.state.pdpImgZoom) {


            imgView =
                <div className="pdpZoomSctn">
                    
                    <div className="pdp-modal-content por ht100" style="position:relative;height:100%">
                        <div className="dt ht100 w100" style="height:80%">
                            {this.state.pinchZoom ? <this.state.pinchZoom zoomButtons={false} maxScale={3} doubleTapBehavior={'zoom'} position={'center'} initialScale={'auto'}>
                            <div id={"pimage" + this.props.data.PC_ITEM_DISPLAY_ID}
                                className="dtc vam tc">
                                
                                    <div style={"width:" + window.innerWidth + "px;height:" + (window.innerHeight-100)+ "px;position: relative;"}>
                                        
                                        <img className="win fadeInItem1s" style="position: absolute;left: 0;right: 0;margin: auto;top: 0;bottom: 0;" src={imgSrc} alt={prdName}/> 
                                    </div>
                                
                            </div>
                                </this.state.pinchZoom> : ""}
                        </div>
                    </div>
                    
                    <CallEnquiryCTA  isPdpHeader={true} pageLang={this.props.pageLang} data={this.props.data} translatedTxt={this.props.translatedTxt} isExtended={this.props.isExtended} isZoom={true} isExtendedIndex={this.props.isExtendedIndex} queryRef={"productdetail-product-header-overlay-js"} pageName={"PDP"} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'}
                    enqCtaDisabled={this.props.enqCtaDisabled} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} callNowClick={this.callNowClick}  eventLabel={this.props.label} showModal={this.props.showModal} pdpModrefType={this.props.pdpModrefType} btnName={"Image_Zoom"} productName={this.props.productName} productPrice={this.props.productPrice} fromPdp={this.props.fromPdp}/>

                </div>

        }
        else {

            let styleClass = "";
            if(this.imgDetails && this.imgDetails.length>1 && this.imgDetails[1]>0 && this.imgDetails[1]<=200) {
                if(this.imgDetails[1]>=150 && this.imgDetails[1]<=200 && this.imgDetails[0]>=250) styleClass += " transform:scale(1.5) ";
                else styleClass += " transform:scale(2) ";
            }   
            else {
                styleClass+="height:100%"
            } 
            imgView = <div onClick={this.openPopUp} id={"pimage" + this.props.data.PC_ITEM_DISPLAY_ID}
            className={`bgw bxtlrd10 bxtrrd10 oh tc ${imgSrc &&(imgSrc.includes(".png")||imgSrc.includes(".gif")) ?"":"bgimg"}`} style="height:330px;display:flex;align-items:center">             
                <img id={"singleImg" + this.props.data.PC_ITEM_DISPLAY_ID}
                    className="db ma modal-content" style={styleClass}
                    src={imgSrc} alt={prdName} /> </div>

        }

        return (
            <>
                {this.state.pdpImgZoom? this.showProdName():''}
                {this.state.imgSrcVal ? imgView : ""}
            </>
        );
    }
}