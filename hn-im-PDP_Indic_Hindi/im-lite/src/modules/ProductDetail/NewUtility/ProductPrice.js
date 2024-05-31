import React, { PureComponent } from 'react';
import { callEnqForm,getMobileNum, modifyImgSrc} from '../utility/helper';
import { formatINRPrice } from '../../../Globals/priceModification';
import { eventTracking } from '../../../Globals/GaTracking';
import { getCookie,getCookieValByKey } from '../../../Globals/CookieManager';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import Shopify from '../utility/Shopify/Shopify';
class ProductPrice extends PureComponent {
    constructor(props){
        super(props);
        this.state = {enqsent:props.enqSent};
        this.getprice=this.getprice.bind(this);
        this.CallClickhandler=this.CallClickhandler.bind(this);
        this.checkEnquiryStatus = this.checkEnquiryStatus.bind(this);
        this.FireGatrack=this.FireGatrack.bind(this);
        this.isOutOfStock = props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
        this.isEcom= props.data.PC_ITEM_IS_ECOM? props.data.PC_ITEM_IS_ECOM:'';
    let isEcomURL= props.data.ECOM_CART_URL ? props.data.ECOM_CART_URL : props.data.ECOM_ITEM_LANDING_URL? props.data.ECOM_ITEM_LANDING_URL:'';
    let isEcomStoreFlag= props.data.ECOM_STORE_ENABLE_FLAG? props.data.ECOM_STORE_ENABLE_FLAG:'';
    this.E_COM_PROD = (isEcomURL && (this.isEcom && isEcomStoreFlag  == 1))&&!this.isOutOfStock;
    }
    FireGatrack(){
        let loginModeArray = ["Unidentified", "Identified", "FullyIdentified"];
        let status = checkUserStatus();
        eventTracking("Product-Page-Clicks",`${this.props.isZoom?this.props.photoGallery?"Photo_Gallery|PDP":"Zoom_First_Fold|PDP":"First_Fold|PDP"}`, `${this.props.isZoom?this.props.photoGallery?"PDP_Photo_Gallery_Zoom_Price|":"PDP_Image_Zoom_Price|":"PDP_Price|"+`${this.props.data.FOB_PRICE?"":"Price_On_Request|"}`+this.props.data.PC_ITEM_DISPLAY_ID+"|EnquiryCTA|"+loginModeArray[status]}`, true)
    }
    checkEnquiryStatus() {
        let enqSent=this.props.enqSent;
        this.setState({enqsent:enqSent});

    }
    getprice(){
    let numObj = getMobileNum(this.props.data);
    let curntPageLang = this.props.pageLang? this.props.pageLang:''
    let callNowCalledFrom= this.props.data['LANDING_FROM_SPA'] ? 'IMOB_PDP_First_Fold|IntermediateScreen':'IMOB_PDP_First_Fold|';
    let dbTrackText =this.props.isExtended ? 'IMOB_PDP_First_Fold_Extended|' + curntPageLang : callNowCalledFrom + curntPageLang;
    let callProps = {
        im_popup: 'im_popup',
        CONTACT_NUMBER: numObj.num,
        CONTACT_TYPE: numObj.type,
        glusrid: this.props.data.GLUSR_USR_ID,
        mbgn_askpopup: 'mbgn_askpopup',
        call_txt:"कॉल करें",
        contact_no: 'contact_no',
        itemId: this.props.data.PC_ITEM_DISPLAY_ID,
        itemImage:this.props.data["PC_IMG_SMALL_100X100"]?modifyImgSrc(this.props.data["PC_IMG_SMALL_100X100"]):"https://m.imimg.com/gifs/background_image.jpg",
        mcatid:this.props.data.BRD_MCAT_ID,
        mcatname: this.props.data.BRD_MCAT_NAME,
        translatedText:this.props.translatedTxt?this.props.translatedTxt:'',
        compname:this.props.data.COMPANYNAME,
        pagename:"PDP",
        dbpagetrack: dbTrackText, 
        widgetTrackCatg: 'Extended_PDP_PWA',
        widgetTrack: 'Main_CTA',
        widgetTrackPage: 'Call',
        callshowtext: this.props.translatedTxt ? this.props.translatedTxt.HEADER_BTN_1 : '',
        page: 'PDP',
        itemName: this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
        eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",  
        eventLabel: this.props.data['LANDING_FROM_SPA'] ?'IntermediatePDPScreen':this.props.eventLabel,       
        tscode:this.props.data["ETO_OFR_COMPANY_TSCODE"]?this.props.data["ETO_OFR_COMPANY_TSCODE"]:'',
        PAID_TYPE : this.props.data['URL_TYPE'] ? this.props.data['URL_TYPE'] : ''}
        let queryText="IMOB_PDP_First_Fold|Price|"
    
        return(
            <div className='por dflex'>
            <p onClick={()=> {this.state.enqsent||this.E_COM_PROD?"":
                requestAnimationFrame(()=>setTimeout(()=>{callEnqForm(callProps.mcatid,this.props.data.PRODUCT_PRICE,callProps.compname,callProps.glusrid,callProps.itemName,this.props.data.PC_ITEM_DISPLAY_ID,callProps.itemImage,this.props.data.FOB_PRICE?"सर्वोत्तम मूल्य प्राप्त करें":"Get Latest Price",this.props.data.CAT_ID,callProps,this.props.showModal,'','',queryText)}));this.FireGatrack()
           }} id="Price" className={`${!this.props.data.FOB_PRICE&&this.props.enqSent?"c77":"clrBl"}  tl fs16 pdr10 mxht1000 fw pdt5 ${this.props.isZoom?"":"pdb12"}  `}>{this.props.data.FOB_PRICE? this.props.data.PRICE_SEO? this.props.data.PRICE_SEO : '₹ ' + formatINRPrice(this.props.data.FOB_PRICE) + (this.props.data.PC_ITEM_MOQ_UNIT_TYPE?" / " + this.props.data.PC_ITEM_MOQ_UNIT_TYPE:""):this.props.enqSent?"Price Requested":"Get Latest Price"}</p>
           {this.E_COM_PROD?<Shopify pdpData={this.props.data} cta={"ShopNow"}/>:''}</div>
        )
    }
    CallClickhandler(){
        this.props.displayPopup("IMOB_PDP_First_Fold|Specification|title|");
        let numObj = getMobileNum(this.props.data);
        let eventAction=numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS";  
        let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
        let usermode = loginModes[checkUserStatus()];
        let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
        eventTracking("Click-To-Call",eventAction,"PDP_Specification-Identified"+`|${usermode}|${verfStatus}`,true)
    }
    componentDidMount(){
        
    }
    componentDidUpdate(prevProps,prevState){
        this.checkEnquiryStatus();
    }
    render() {
        return (
            <div className='por'>
            {this.getprice()}
        </div>

        )
    }
}

export default ProductPrice;