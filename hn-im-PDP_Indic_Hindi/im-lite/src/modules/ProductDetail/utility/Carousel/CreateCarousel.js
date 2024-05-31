import React from 'react';
import { constructCarousel,getFirstImg,modifyImgSrc } from "./helper";
import "./carousel.css";
import CallEnquiryCTA from '../CTA/CallEnquiryCTA';
import { eventTracking } from '../../../../Globals/GaTracking';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import { yandexTrackingMultiLevel } from '../../../../Globals/yandexTracking';
import GetMorePhoto from '../GetMorePhoto/GetMorePhoto';
import { getCookie,getCookieValByKey } from '../../../../Globals/CookieManager';
import { removalTextNodes } from '../../../../Globals/translatorPreact/translatorPatch';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
import ChatWithSeller from '../ChatWithSeller/ChatWithSeller';
import CTA from '../NewCallEnqCTA';
import Buynow from '../../NewUtility/Buynow';
export default class CreateCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pdpImgZoom: this.props.photoGallery?true:false, startIndex: this.props.photoGallery?this.props.index:0, callProps: '', imgSrcVal: '', setMorePhotos:false,PinchZoom:''};
        this.getmorephoto= false; 
        this.singleImage = false;
        this.getImgSrc=this.getImgSrc.bind(this)
        this.openPopUp = this.openPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.onSlideChanged = this.onSlideChanged.bind(this);
        this.callNowClick = this.callNowClick.bind(this);
        this.catchImgPostn = this.catchImgPostn.bind(this);
        this.getMorePhotoCalling = this.getMorePhotoCalling.bind(this);
        this.callShareIcon = this.callShareIcon.bind(this);
        this.isEvenNumber = false;
        this.setPinchzoom=this.setPinchzoom.bind(this);
        this.Cta=this.Cta.bind(this);
        this.isOneTap= (checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn') && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && this.props.data;
        this.checkLanding = this.props.track? this.props.track:'';
        this.isVideoURL = false;
        this.videoType = this.props.data.ITEM_DOCS.pc_item_doc_type_id;
        this.hitVideoThumbnailTracking = this.hitVideoThumbnailTracking.bind(this);
    }
    Cta(){
        let isOutOfStock = this.props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.data.ECOM_CART_URL ? this.props.data.ECOM_CART_URL : this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
        let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
        return(
            E_COM_PROD && isEcomURL && !isOutOfStock ?<div id="Buynow1"><Buynow data={this.props.data}/></div>:<div id="ZoomCta" className='pd5'><CTA data={this.props.data} DisplayId={this.props.data.PC_ITEM_DISPLAY_ID} showModal={this.props.showModal} mcatId={this.props.data.BRD_MCAT_ID} Price={this.props.data.PRODUCT_PRICE?this.props.data.PRODUCT_PRICE:"लेटेस्ट रेट पाएं"} CompanyName={this.props.data.COMPANYNAME} GlusrId={this.props.data.GLUSR_USR_ID} ItemName={this.props.data.PC_ITEM_NAME}  imgurl={this.props.callProps?this.props.callProps.itemImage.replace(/^http:\/\//i, 'https://'):"https://m.imimg.com/gifs/background_image.jpg"} ctaName={"सर्वोत्तम मूल्य प्राप्त करें"} callProps={this.props.callProps} catId={this.props.data.CAT_ID}  transformedNo={this.props.transformedNo} isZoom={true} eventLabel={"PDP_Image_Zoom"} isOneTap={this.isOneTap} queryText={"productdetail|Image_Zoom|pdp_first_fold|"} mainPdp={true}dbtrack={"IMOB_PDP_Image_Zoom"} displayPopup={(dbpagetrack) => {
                this.props.callNowClick("कॉल करें",
                this.props.callProps.itemImage.replace(/^http:\/\//i, 'https://'),this.props.callProps.tscode, this.props.callProps.compname,
                    this.props.callProps.CONTACT_NUMBER, this.props.callProps.CONTACT_TYPE, this.props.callProps.glusrid,
                    this.props.callProps.itemId, this.props.callProps.itemName,this.props.callProps.mcatid,this.props.callProps.mcatname,dbpagetrack, this.props.callProps.PAID_TYPE)
                }}/></div>
        )
    }
    componentDidMount()
    {
        this.setState({ imgSrcVal: this.getImgSrc() });
        if(this.props.imageslen == 1 || this.props.imageslen == 2 || this.props.imageslen<=1 && this.isVideoURL) {
            this.setState({setMorePhotos : true})
         }
        // callNowActionDispatcher(false)
        if(this.props.photoGallery){
            window.addEventListener('popstate', this.props.setZoomfalse);
            document.body.classList.add("ohi")
        }else{
            this.singleImage = this.props.imageslen > 0 ? false:true;
            if(!window.clickedOnCallNow)
            {  
                callNowActionDispatcher(false);
            }
            window.gMPhotoenquiryClick && document.getElementsByName("FirstFoldGMPhoto") && document.getElementsByName("FirstFoldGMPhoto")[0]? document.getElementsByName("FirstFoldGMPhoto")[0].click() : '';  
        }
    }
    componentWillUnmount(){
        this.setState({ imgSrcVal: "" })
        if(!this.props.photoGallery){
            window.onpopstate = () => {} ;
            document.body.classList.remove("ohi");
            delete window.gMPhotoenquiryClick;
        }
    }
    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE='') {
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
        if(this.props && this.props.showRatingFeedback && typeof this.props.showRatingFeedback === "function" && checkUserStatus() == 2) {
            this.props.showRatingFeedback();
        }
        callNowActionDispatcher(true, callProps);
       
    }
    getImgSrc() {
        let imgSrc = getFirstImg(this.props.data);
        this.props.productImgcallback(imgSrc);
        return modifyImgSrc(imgSrc);
    }
    onSlideChanged(latestDot, prevDot, primeId, isVideoNeeded) {
        let isProductVideo=this.props.data.ITEM_DOCS && this.props.data.ITEM_DOCS.pc_item_doc_path ? this.props.data.ITEM_DOCS.pc_item_doc_path :'';
        let isCompanyVideo = this.props && this.props.data && this.props.data.GLUSR_PROFILE_MEDIA_URL && !isProductVideo? true:false; 
        if (isVideoNeeded && latestDot == 1) {
            isCompanyVideo ? eventTracking('Product-Page-Clicks', 'Company-Video', "Video-Played", true)
            : eventTracking('Product-Page-Clicks', 'Product-Video', "Video-Played", true)
        }
        let latestDt = `${latestDot}dot${primeId}`;
        let prevDt = `${prevDot}dot${primeId}`;
        if(latestDot && prevDot && latestDot>=2 && latestDot>prevDot) {
           yandexTrackingMultiLevel("Product-Page-Clicks","Image-Swipe-First-Fold",latestDot+1);
        }
        document.getElementById(latestDt).classList.add("active");
        document.getElementById(prevDt).classList.remove("active");
        this.setState({ startIndex: latestDot });
    }

    catchImgPostn(swipeIndex){
        this.setState({startIndex: swipeIndex})
    }

   setPinchzoom(){
    if(!this.state.PinchZoom){
        import(/* webpackChunkName:"Pinchzoom" */ 'react-responsive-pinch-zoom-pan').then(module=>{this.setState({PinchZoom:module.default})})
    }
   }
   
   hitVideoThumbnailTracking(){
    let isProductVideo=this.props.data.ITEM_DOCS && this.props.data.ITEM_DOCS.pc_item_doc_path ? this.props.data.ITEM_DOCS.pc_item_doc_path :'';
    let isCompanyVideo = this.props && this.props.data && this.props.data.GLUSR_PROFILE_MEDIA_URL && !isProductVideo ? true : false;
    isCompanyVideo ? eventTracking('Product-Page-Clicks', 'Company-Video', "Watch Video", true)
        : eventTracking('Product-Page-Clicks', 'Product-Video', "Watch Video", true)
    }

    openPopUp() { 
        window.refUrl ? window.refUrl.push("somePopUp") : "";
        history.pushState({ imG: 'carouselPopup' }, "", "");
        this.setState({ pdpImgZoom: true });
        if(!this.state.PinchZoom){
            import(/* webpackChunkName:"Pinchzoom" */ 'react-responsive-pinch-zoom-pan').then(module=>{this.setState({PinchZoom:module.default})})
        }
        document.body.classList.add("ohi");
        yandexTrackingMultiLevel("Product-Page-Clicks","Product-Image-Zoom","Open");
        this.props && this.props.isImageZoomed ? this.props.isImageZoomed(true):'';
    }

    closePopUp(intLand=false) {
        document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";
        intLand?( window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? history.back() : ''):"";
        this.setState({ pdpImgZoom: false });
        document.body.classList.remove("ohi");
        window.clickedOnCallNow?callNowActionDispatcher(false):"";
        document.getElementsByTagName("BODY") && document.getElementsByTagName("BODY")[0] ? document.getElementsByTagName("BODY")[0].style.removeProperty("overflow") : '';
        document.getElementsByTagName("BODY") && document.getElementsByTagName("BODY")[0] ? document.getElementsByTagName("BODY")[0].scrollIntoView(true) : '';
        yandexTrackingMultiLevel("Product-Page-Clicks","Product-Image-Zoom","Close");
        this.props && this.props.isImageZoomed? this.props.isImageZoomed(false):'';
    }

    componentDidUpdate(prevProps,prevState) {
        removalTextNodes();
        if(prevProps!=this.props)
        {
            this.setState({ imgSrcVal: this.getImgSrc() })

        }
        if(!this.props.photoGallery){
        let that = this;
        if (this.state.pdpImgZoom) {
            window.onpopstate = function (e) {
                e.preventDefault();
                that.closePopUp();
            }
        }
    }
    }

    callShareIcon(){
        let checkImgLength = this.props.imageslen >0  ?true:false;
        if(!this.state.setMorePhotos) {
            checkImgLength= this.props.imageslen ==0 ? true : false ;
        }
        if (this.state.pdpImgZoom) {
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
              let showShare ='';
              {navigator.share ? showShare= (
                <div id="shareSection" onClick={() => {
                        eventTracking('Product-Page-Clicks', this.props.photoGallery?'ImageZoom-ShareURL-Open|ABTest|Photo_Gallery':'ImageZoom-ShareURL-Open|ABTest', this.props.data.PC_ITEM_DISPLAY_ID, true)
                        share();
                }} className={`${checkImgLength ? 'shareContnrEven ':'shareContnr '} poa tp0 r0 createCarousel tc m5 bgw z1000 fadeInItem2s`}>
                    <span className="dib shareIconBlck bkgImgPstnRpt vam"></span>
                    {!checkImgLength ?<span class="dib ml5">Share</span>:''}
                </div>): ''}
                return showShare;
        }
    }
    
    getMorePhotoCalling(param=''){
        let finalKey = this.getmorephoto ? this.getmorephoto : this.singleImage ? this.singleImage : true;
        let checkCalling = param =='noZoom'? 'noZoom': 'isZoom';
        if(this.state.setMorePhotos) {
            if(((this.state.startIndex==0 && checkCalling=='noZoom' && this.isVideoURL) || this.state.startIndex==1 && this.isVideoURL && !this.props.photoGallery)) finalKey=false
            else finalKey = true;
        }
        let checkLanding = this.props.track? this.props.track:'';
        let dbTracking = param =='noZoom'? this.props.photoGallery?'IMOB_PDP_Image_Zoom_Get_Photos|'+(this.props.pdpServiceType?'Free_Quote|':'')+ 'pdp_below_the_fold'+checkLanding: 'IMOB_PDP_First_Fold_Get_Photos|'+(this.props.pdpServiceType?'Free_Quote|':'')+'pdp_first_fold'+ checkLanding :(this.props.photoGallery? 'IMOB_PDP_Image_Zoom|Photos_Of_This_Product':'IMOB_PDP_Image_Zoom_Get_Photos|'+(this.props.pdpServiceType?'Free_Quote|':'')+'pdp_first_fold')+checkLanding;
        const showGetMorePhoto = finalKey ? <GetMorePhoto data={this.props.data} 
            isPdpHeader={true}
            enqCtaDisabled={this.props.enqCtaDisabled}
            toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} 
            pageLang={this.props.pageLang}
            queryRef={dbTracking} 
            pageName={"PDP"} 
            isExtended={false} 
            cta_name={this.props.pdpServiceType ? "Get Free Quote" : 'Get More Photos'} 
            eventLabel={"PDP_Header"} 
            showModal={this.props.showModal} 
            pdpModrefType={'3'} 
            btnName={this.props.photoGallery?"":"First_Fold"}
            checkCall = {checkCalling}
            checkEnqInitiator={this.props.checkEnqInitiator} 
            translatedTxt={this.props.translatedTxt} 
            track={this.props.track}
            checkImgLength={finalKey}     
            setMorePhotos={this.state.setMorePhotos} 
            imgIndex={this.state.startIndex}  
            photoGallery={this.props.photoGallery? true: false}  
            pdpServiceType={this.props.pdpServiceType}
            />:'';
        return (showGetMorePhoto);
    }
    
    showProdName(){
        if(this.props.productName.props.prdNameOnZoom == 'prdNameOnZoom'){

                const zoomBottomHead = (<div className="zoomBottomHead ht50 pf w100 tp0 l0 z1000 bgw">

                    <div id="carClss" onClick={()=>{this.props.photoGallery?this.props.setZoomfalse():this.closePopUp(true)}}
                    className="bdrC bxrd8 l0 m5 pd10 poa tp0 bgw z1000 fadeInItem2s">
                    <span className="dib bckArwZmBlack vam"></span><span class="dib ml5">Back</span>
                    </div>
                    {this.props.imageslen !== 0 && !this.state.setMorePhotos? this.callShareIcon():''}
                </div>)

            return(zoomBottomHead )
        }
    }

    render() {
        let imgsView = '';
        let  isA2HS = false;
        let dbTracking = this.props.photoGallery? 'IMOB_PDP_Image_Zoom|Photos_Of_This_Product'+this.checkLanding : this.state.pdpImgZoom ? 'IMOB_PDP_First_Fold_Get_Photos|'+(this.props.pdpServiceType ?'Free_Quote|':'')+'pdp_first_fold'+ this.checkLanding : 'IMOB_PDP_Image_Zoom_Get_Photos|'+(this.props.pdpServiceType?'Free_Quote|':'')+'pdp_first_fold'+this.checkLanding;
        let checkEnqStatus = (this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.data.PC_ITEM_DISPLAY_ID)) ? true : false;
        let checkCalling = !this.state.pdpImgZoom ? 'noZoom': 'isZoom';
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        
        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
        let showEcom = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
        this.isVideoURL = this.props.data && this.props.data.ITEM_DOCS && this.props.data.ITEM_DOCS.pc_item_doc_path && this.props.data.ITEM_DOCS.pc_item_doc_type == "VIDEO" ? true : false;
        let compvideo=this.props.photoGallery ? "" : this.props.data.GLUSR_PROFILE_MEDIA_URL;
        compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
        this.isVideoURL = this.isVideoURL == false && compvideo ? true : this.isVideoURL;
        const ga=getCookie('_ga');
        let gaLastDigit= ga?(ga[ga.length-1]):'';
        if((gaLastDigit % 2) == 0){this.isEvenNumber= true;}

        if (this.state.pdpImgZoom) {
           
            imgsView = <>
                <div className="pdpZoomSctn">
                    <div className="pdp-modal-content oh"><div className="bgw bxtlrd10 poa bxtrrd10" style={{ height: 'auto', paddingRight: '10px', left: '10%', right: '10%', top: '100px' }}>
                        {constructCarousel(this.props.data, this.state.pdpImgZoom, this.state.startIndex, this.onSlideChanged, this.catchImgPostn, '',this.props.imageslen,this.props.isExtended,this.props.YouTubePlayer,this.videoType,this.state.PinchZoom,this.setPinchzoom,this.props.photoGallery,'')}
                    </div>
                    </div>
                </div>

            <div className={"tc pf bt0 w100 pd10 zIn999 bxdowGrn bgw"}>
            <div className='productName tl zoomBottomSubHead' style={this.props.imageslen==0  || this.state.setMorePhotos?'margin-right:35px':''}>
            {this.props.productName}{this.props.imageslen== 0||this.state.setMorePhotos? this.callShareIcon() : ''}</div>
            <div className='tl'>{this.props.productPrice}</div>
            {this.Cta()}
</div>
            </>
        }
        else {
            
            imgsView = <><div id={"imgView" + this.props.data.PC_ITEM_DISPLAY_ID} onClick={this.openPopUp} className="tc bgw">
                {constructCarousel(this.props.data, this.state.pdpImgZoom, this.state.startIndex, this.onSlideChanged,this.catchImgPostn,this.props.transImg,this.props.imageslen,this.props.isExtended,this.props.YouTubePlayer,this.videoType,this.state.PinchZoom,this.setPinchzoom,this.props.photoGallery, this.hitVideoThumbnailTracking,this.state.setMorePhotos)}
            </div></>
        }

        return (
            <>
                {this.state.pdpImgZoom? this.showProdName():''}
                {this.props.data.DATA_FETCHING_FROM_API === true ||  this.props.isExtended || (this.props.imageslen > 0 && !this.state.setMorePhotos) || (this.isVideoURL  && !this.state.setMorePhotos) || showEcom ? '':this.isOneTap && !checkEnqStatus?<ChatWithSeller prodName = {this.props.productName}  pageLang={this.props.pageLang} data={this.props.data} translatedTxt={this.props.translatedTxt} isZoom={true} isExtendedIndex={this.props.isExtendedIndex} isExtended={this.props.isExtended} queryRef={dbTracking} pageName={'PDP'}  cta_name={this.props.pdpServiceType ? "Get Free Quote" : 'Get More Photos'} btnName={(this.props.photoGallery?'':'|First_Fold')+(this.state.setMorePhotos? ("|GetMorePhotos"+(checkCalling=="isZoom"?"_Zoom|":"|")+(this.state.startIndex+1)) : "")} isABtst = {false}  track={this.props.track} checkEnqStatus={checkEnqStatus} checkCall = {checkCalling} setMorePhotos={this.state.setMorePhotos} isVideoURL={this.isVideoURL} startIndex={this.state.startIndex} photoGallery={this.props.photoGallery} pdpServiceType={this.props.pdpServiceType}/>:(this.state.pdpImgZoom?this.getMorePhotoCalling('isZoom'):this.getMorePhotoCalling('noZoom'))}

                {this.props.photoGallery?<>
                <div className="pdpZoomSctn">
                    <div className="pdp-modal-content oh">
                        <div className="bgw bxtlrd10 poa bxtrrd10 photoGallery" >
                            {constructCarousel(this.props.data, this.state.pdpImgZoom, this.state.startIndex, this.onSlideChanged, this.catchImgPostn, '',this.props.imageslen,"","","",this.state.PinchZoom,this.setPinchzoom,true)}
                        </div>
                    </div>
                </div>
                <CallEnquiryCTA  isPdpHeader={true} enqCtaDisabled={this.props.enqCtaDisabled} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} pageLang={this.props.pageLang} data={this.props.data} isExtended={this.props.isExtended} translatedTxt={this.props.translatedTxt} isZoom={true} isExtendedIndex={this.props.isExtendedIndex} queryRef={"productdetail|photo_gallery|"} pageName={"PDP"} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} callNowClick={this.callNowClick} eventLabel={this.props.label} showModal={this.props.showModal} pdpModrefType={this.props.pdpModrefType} btnName={"|Image_Zoom"} productName={this.props.productName} productPrice={this.props.productPrice}  track={this.props.track} showShare={this.callShareIcon} imageLength={this.props.imageslen} setMorePhotos={this.state.setMorePhotos} photoGallery={true}/>
                </>
                :imgsView}
            </>
        )
    }
}