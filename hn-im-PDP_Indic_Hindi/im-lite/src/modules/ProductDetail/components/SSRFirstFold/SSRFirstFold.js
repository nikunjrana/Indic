import React, { PureComponent } from 'react';
import ProductDescription from '../../NewUtility/ProductDescription';
import CompanyInformation from '../../NewUtility/CompanyInformation';
import ProductPrice from '../../NewUtility/ProductPrice';
import CompanyName from '../../NewUtility/CompanyName';
import ProductName from '../../NewUtility/ProductName';
import CTA from '../../utility/NewCallEnqCTA';
import Buynow from '../../NewUtility/Buynow';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
import { getCookieValByKey } from '../../../../Globals/CookieManager';
import Messenger from '../../NewUtility/InlineMessenger/Messenger';
import { eventTracking } from '../../../../Globals/GaTracking';
import { impressionTrack } from '../../../../Globals/impressionTrack';
import { getVidId } from '../../utility/Carousel/helper';
import PdpImage from './PdpImage';
import PdpDetails from './PdpDetails';
import RelatedWidgets from './RelatedWidgets';
import Gallery from './Gallery';
class SSRFirstFold extends PureComponent {
    constructor(props){
        super(props);
        this.state={enqSentFrom: false}
        // this.Cta=this.Cta.bind(this);
        // this.FallbackImage=this.FallbackImage.bind(this);
        // this.checkEnquiryStatus=this.checkEnquiryStatus.bind(this);
        // this.callNowClick = this.callNowClick.bind(this);
        // this.getSoiBanner = this.getSoiBanner.bind(this);
        // this.viewSmlr=this.viewSmlr.bind(this);
        // this.showSimilar=this.showSimilar.bind(this);
        // this.checkEnqInitiator = this.checkEnqInitiator.bind(this);
        // let imgImp = this.props.data && (!this.props.data.GLCAT_MCAT_IMAGE_DISPLAY ||  this.props.data.GLCAT_MCAT_IMAGE_DISPLAY!="1") ? true :false;
        // this.pdpServiceType = this.props.data && this.props.data.IS_PROD_SERV === 'S' && !imgImp ? true : false;
    }
    // callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE='') {
    //     let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
    //     if(this.props && this.props.showRatingFeedback&&this.props.setRatingInfo&& typeof this.props.setRatingInfo=="function"&& typeof this.props.showRatingFeedback === "function" && checkUserStatus() == 2) {
    //         this.props.showRatingFeedback(glusrID);
    //         this.props.setRatingInfo(mcatId,mcatName,itemName,itemId,glusrID,name)
    //     }
    //     callNowActionDispatcher(true, callProps);
    // }
    // checkEnquiryStatus() {
    //     this.props.toggleEnqCTADisabled(this.props.data.PC_ITEM_DISPLAY_ID);
    // }
    // checkEnqInitiator(val){
    //     val? this.setState({enqSentFrom:true}):'';
    // }
    // getSoiBanner(){
    //     if((checkUserStatus() == '2' && getCookieValByKey('ImeshVisitor', 'utyp')=='N' && getCookieValByKey("soiBar", "v") != '100') || (checkUserStatus()=='1' && getCookieValByKey('ImeshVisitor', 'utyp')=='N')){
    //       import(
    //         /* webpackChunkName:"UtilityComponent" */'../../../../api/utilityApi'
    //       ).then((module) => {
    //           let utilityApi = module.default
    //           utilityApi.checkForSoiBanner(this);
    //       });
    //     }
      
    //     window.removeEventListener('scroll',this.getSoiBanner)
        
    //   }
    // FallbackImage(){
    //     let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
    //     isEcomURL= this.props.data.ECOM_CART_URL ? this.props.data.ECOM_CART_URL : this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
    //     isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
    //     let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
    //     let isVideoPresent = this.props.data.ITEM_DOCS != undefined && this.props.data.ITEM_DOCS.pc_item_doc_type == "VIDEO" && this.props.data.ITEM_DOCS.pc_item_doc_path ? true : false;
    //     let showGMP = this.props.data.ITEM_IMG.length == 0||this.props.data.ITEM_IMG.length == 1 || this.props.data.ITEM_IMG.length == 2 || (this.props.data.ITEM_IMG.length<=1 && isVideoPresent) ? true : false;
    //     let getMoreText = this.pdpServiceType ? "Get Free Quote": "Get More Photos";

    //     let productVideoURL = this.props.data.ITEM_DOCS && this.props.data.ITEM_DOCS.pc_item_doc_path;
    //     productVideoURL && (productVideoURL.includes("shorts/") ? productVideoURL = productVideoURL.replace("shorts/", "watch?v=") : "");
    //     let compvideo=this.props.data.GLUSR_PROFILE_MEDIA_URL;
    //     compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
    //     let iscompvideopresent=this.props.data.GLUSR_PROFILE_MEDIA_URL?true:false;

    //     let getVidURLinProdDes = '';
    //     let isempty_video_flag = '';
    //     let matchArr =  this.props.data && this.props.data.PC_ITEM_DESC_SMALL && this.props.data.PC_ITEM_DESC_SMALL.match(/"https:\/\/www\.youtube\.com\/embed\/([^"]*")/);
    //     if(matchArr && matchArr.length>0 && matchArr[0]) {
    //         isempty_video_flag=true;
    //         getVidURLinProdDes = getVidId(matchArr[0], isempty_video_flag);
    //     }

    //     let showVideoURL='';
    //     let ytbFistString = 'https://img.youtube.com/vi/';
    //     let ytbEndString = '/0.jpg';
    //     let prodVidThumbImg = isVideoPresent? ytbFistString + getVidId(productVideoURL) + ytbEndString :'';
    //     let compVidThumbImg = iscompvideopresent? ytbFistString + getVidId(compvideo) + ytbEndString :'';
    //     let VidURLinProdDes = isempty_video_flag? ytbFistString + getVidURLinProdDes + ytbEndString :'';
    //     showVideoURL = isVideoPresent? prodVidThumbImg : iscompvideopresent? compVidThumbImg : isempty_video_flag? VidURLinProdDes :'' ;  

        
    //     return(
    //         <div className="tc bgw por" id="lcpImage">
    //                 <div className="por ht330 oh tc">
    //                     <div >
    //                         <div >
    //                             <div className="react-swipeable-view-container" ><div className="ohy-axis" aria-hidden="false" data-swipeable="true" >
    //                                 <div className="centeralizeIt ht330 ">
    //                                     <img id="img" className="modal-content noZoom ht100" src={this.props.firstimage} alt={this.props.name} /></div>
    //                             </div>
    //                             </div></div>
    //                             </div></div>
            
                
    //             </div>
    //     )
    // }
    // showSimilar(){
    //     eventTracking("Product-Page-Clicks","ViewSimilar-Open",this.props.data.PC_ITEM_DISPLAY_ID,true);

    //         document.body.classList.add("oh");
    //         window.refUrl ? window.refUrl.push("somePopUp") : "";
    //         let shwSml = document.getElementById('vwSmlSection');
    //         shwSml? shwSml.style.display="block":'';
       
    // }
    // viewSmlr(){
    //     if(this.props.data.PC_ITEM_STATUS_APPROVAL === "9"){
    //         return( <div className="poa pdl10 pdr10 pdt5 pdb5 bxrd20 tc viewSmlrCta bgw bdr zIn100 fs12" 
    //         onClick={this.showSimilar}>VIEW SIMILAR</div>)
    //     }
    // }
    // Cta(){
    //     let isOutOfStock = this.props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
    //     let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
    //     isEcomURL= this.props.data.ECOM_CART_URL ? this.props.data.ECOM_CART_URL : this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
    //     isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
    //     let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
    //     return(
    //         E_COM_PROD && isEcomURL && !isOutOfStock ?<div id="Buynow1"><Buynow data={this.props.data}/></div>:<div id="Firstfoldcta" className='pd5'><CTA data={this.props.data} DisplayId={this.props.data.PC_ITEM_DISPLAY_ID} showModal={this.props.showModal} mcatId={this.props.data.BRD_MCAT_ID} Price={this.props.data.PRODUCT_PRICE?this.props.data.PRODUCT_PRICE:"लेटेस्ट रेट पाएं"} CompanyName={this.props.data.COMPANYNAME} GlusrId={this.props.data.GLUSR_USR_ID} ItemName={this.props.data.PC_ITEM_NAME}  imgurl={this.props.firstimage?this.props.firstimage:"https://m.imimg.com/gifs/background_image.jpg"} ctaName={"सर्वोत्तम मूल्य प्राप्त करें"} mainPdp={true} callProps={this.props.callProps} catId={this.props.data.CAT_ID}  transformedNo={this.props.transformedNo}  displayPopup={() => {
    //             this.callNowClick("कॉल करें",
    //             this.props.callProps.itemImage.replace(/^http:\/\//i, 'https://'),this.props.callProps.tscode, this.props.callProps.compname,
    //                 this.props.callProps.CONTACT_NUMBER, this.props.callProps.CONTACT_TYPE, this.props.callProps.glusrid,
    //                 this.props.callProps.itemId, this.props.callProps.itemName,this.props.callProps.mcatid,this.props.callProps.mcatname,this.props.callProps.dbpagetrack, this.props.callProps.PAID_TYPE)
    //             }}/></div>
    //     )
    // }
    // componentDidMount(){
    //     document.addEventListener("enquirySent",this.checkEnquiryStatus);
    //     window.addEventListener('scroll',this.getSoiBanner);
    //     checkUserStatus()==2?impressionTrack("MessengerPDP",'Product-Page-Clicks','Widget_Impression','Messenger_Widget','','',false):'';
    // }
    // componentDidUpdate(prevProps,prevState){
    //     if(this.props.data && prevProps.data && this.props.data!=prevProps.data)
    //     {
    //         checkUserStatus()==2?impressionTrack("MessengerPDP",'Product-Page-Clicks','Widget_Impression','Messenger_Widget','','',false):'';
    //     }
    // }
    render() {
       
    let name=this.props.data.pcItemName?this.props.data.pcItemName.replace(/ /g, "-"):'';
    let dspid=this.props.data.pcItemDisplayId?this.props.data.pcItemDisplayId:'';
    let pdp_url=`https://hindi.indiamart.com/proddetail/${name}-${dspid}.html`;

        return (
            <>
           <PdpImage url={this.props.data.pcImgSmall600x600?this.props.data.pcImgSmall600x600:this.props.data.pcItemImgSmall?this.props.data.pcItemImgSmall:''} itemname={this.props.data.pcItemName?this.props.data.pcItemName:''}/>
           <PdpDetails company={this.props.data.companyname?this.props.data.companyname:''}
           complogo={this.props.data.companyLogo?this.props.data.companyLogo:'https://m.imimg.com/gifs/img/cIcon.png'} disp_name={this.props.data.displayName} itemname= {this.props.data.pcItemName?this.props.data.pcItemName:''}
           price={this.props.data.productPrice?this.props.data.productPrice:''} city={this.props.data.city?this.props.data.city:''}
           locality={this.props.data.locality?this.props.data.locality:''} gstNo={this.props.data.gstNo?this.props.data.gstNo:''}
           glusrUsrState={this.props.data.glusrUsrState?this.props.data.glusrUsrState:''}
           mobilePns={this.props.data.mobilePns?this.props.data.mobilePns:''} pdp_url={pdp_url?pdp_url:''}  /> 
          {this.props.data.secondaryImageList.length>0? <Gallery gdata={this.props.data?this.props.data:''} pgitemname={this.props.data.pcItemName?this.props.data.pcItemName:''} scimg={this.props.data.secondaryImageList?this.props.data.secondaryImageList:''}/>:''}
          <RelatedWidgets expdata={this.props.data.recommendedMcatsAllIndiaList?this.props.data.recommendedMcatsAllIndiaList:''} sellerdata={this.props.data.recommendedProductsAllIndiaList?this.props.data.recommendedProductsAllIndiaList:''} pgitemname={this.props.data.pcItemName?this.props.data.pcItemName:''}  pdp_url={pdp_url?pdp_url:''} />
      
         </>
        )}
}
export default SSRFirstFold;