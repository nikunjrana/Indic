import React from 'react';
import { getCookie, getCookieValByKey } from '../../../../Globals/CookieManager';
import { setDescriptionTitle, setISQ,getMOQ, decodeEntityCode, viewMoreAndLess, offerMoreDetail,callBL, observer} from "./helper";
import { checkUserStatus,checkUserMode} from '../../../../Globals/MainFunctions';
import "./ProdDesc.css";
import { eventTracking } from '../../../../Globals/GaTracking';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import {removalTextNodes} from '../../../../Globals/translatorPreact/translatorPatch';
import CallEnquiryCTA from "../CTA/CallEnquiryCTA";
import GetLatestPriceEnquiry from '../GetLatestPriceEnquiry/GetLatestPriceEnquiryHTML';

export default class ProdDescAdditionInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isProdDescVisible: false,ShowPdf:false,pdfviewer:null,callclick:false,ProdDecsClick:''}
        this.setProdDescVisible = this.setProdDescVisible.bind(this);
        this.setIsProdView = this.setIsProdView.bind(this);
        this.setShowPdf=this.setShowPdf.bind(this);
        this.closePdf=this.closePdf.bind(this);
        this.constructPDF=this.constructPDF.bind(this);
        this.checkEnquirySentRelated = this.checkEnquirySentRelated.bind(this);
        window.addEventListener('popstate', this.setProdDescVisible);
        this.callNowClick=this.callNowClick.bind(this);
        this.callClick=this.callClick.bind(this);
        this.setProdDecsClick = this.setProdDecsClick.bind(this);
        this.isInViewport = this.isInViewport.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

    }

    setProdDescVisible() {
        window.refUrl && window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        this.closePdf();
        let productId = this.props.data['PC_ITEM_DISPLAY_ID'];
        let translatedText = this.props.translatedTxt;
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let isISQPresent = this.props.data.ISQ.length > 0 ? true : false;
        let prodDescFlag = this.state.ProdDecsClick==='clickedFromViewMore' || (this.state.ProdDecsClick==='clickedFromLable' && this.state.isProdDescVisible) ? true : true

        if (this.state.isProdDescVisible) {
            viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId, isISQPresent, 'clickedFromOnLoad', this.setIsProdView,this.setProdDecsClick,prodDescFlag);
        }

    }
    setShowPdf() {
        this.setState({ ShowPdf: true })
        window.refUrl ? window.refUrl.push("somePopUp") : "";
    }
    closePdf() {
        this.setState({ ShowPdf: false })
        window.refUrl && window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        document.body.style.overflow="unset";
    }
    setIsProdView(isProdDescVisible) {
        this.setState({ isProdDescVisible })
    }
    setProdDecsClick(clickedFrom){
        this.setState({ProdDecsClick:clickedFrom})
    }
    constructPDF(docPath){
        docPath=docPath.replace(/^http:\/\//i, 'https://');
       let PDF = <div id={"prodbrochure" + this.props.data['PC_ITEM_DISPLAY_ID']} class="prd-tble"> <div className="row crb dflex">
               <p className="columnDescPDP cl75  fs15 lh22">Product Brochure</p>
                   <a className="columnDescPDP cl56 fs15  lh22 dflex" onClick={() => {eventTracking("Product-Page-Clicks","Click_ViewPDF",'Pdf_viewnow',true);this.setShowPdf(); import(/*webpackChunkName:"Pdfviewer"*/'./pdf').then((module) => {
            this.setState({ pdfviewer: module.default })
        })}} target="_blank">
                       <img class="vam" border="0" width="20" height="20" alt="download pdf" src="https://m.imimg.com/gifs/pdf.png" />
                       <span className="dib vam pdl5 fcb">  View Now </span>
                   </a>
          </div> </div>;
           return(
               <section>
                     {PDF}
               </section>
           )
   }
   callClick(){
    this.setState({callclick: true})
   }
    componentDidUpdate(prevProps,prevState){
        removalTextNodes();
        this.props.isExtended?this.props.toggleEnqCTADisabled(this.props.data.PC_ITEM_DISPLAY_ID):'';
        this.state.isProdDescVisible && this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?
        '':'';
        let isIphone= navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0;
        isIphone?this.state.isProdDescVisible ?scrollTo(0,0):'':'';
        this.state.ShowPdf?document.body.style.overflow="hidden":'';
        this.state.isProdDescVisible &&this.state.callclick?document.body.style.overflow="hidden":'';    }
    componentWillUnmount() {
        window.removeEventListener('popstate', this.setProdDescVisible);
        
    }
    componentDidMount(){
        let targetid="prodbrochure" + this.props.data['PC_ITEM_DISPLAY_ID']
        observer(targetid);
    }
    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack,PAID_TYPE='') {

        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
        callNowActionDispatcher(true, callProps);

    }

    checkEnquirySentRelated(dispId) {
        let lsData=JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData="";
        }
        var e = lsData ? lsData['displayId'] : "undef";
        if (e) {
            var dispIds = e.split(",");
            return dispIds.includes(dispId+'');
        }
        else
            return false;
    }
    
   
    isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
    }
    handleScroll() {
        let scroldBody = window.pageYOffset;
        let catchCTA = document.getElementById('stickyCTAFixed');
        let fixTheHead = document.getElementById('stickyCTA');
        let isAvailable = fixTheHead ? this.isInViewport(fixTheHead) : '';
        if (fixTheHead) {
            let catchPosition = (fixTheHead.offsetTop-100);
            if ((scroldBody < catchPosition) && !isAvailable) {
                catchCTA ? catchCTA.classList.replace('poa', 'pf') : '';
                catchCTA ? catchCTA.classList.add('ctaShadow') : '';
            }
            else {
                catchCTA ? catchCTA.classList.replace('pf', 'poa') : '';
                catchCTA ? catchCTA.classList.remove('ctaShadow') : '';
            }
        }
    }

    render() {
        let that = this;
        let offerMoreDetailShow = offerMoreDetail(that);
        let pdfSection = that.props.data.DOC_PATH?this.constructPDF(that.props.data.DOC_PATH):'';
        let isISQPresent = this.props.data.ISQ.length > 0 ? true : false;
        let descriptionTitle = setDescriptionTitle(this.props.data.IS_PROD_SERV, this.props.translatedTxt, 'AdditionalInfoRemove');
        let setISQs = setISQ(this.props.data['ISQ']);
        let MOQ = this.props.data && this.props.data.PC_ITEM_MIN_ORDER_QUANTITY? getMOQ(this.props.data.PC_ITEM_MIN_ORDER_QUANTITY,this.props.data.PC_ITEM_MOQ_UNIT_TYPE):"";
        let productDetails = this.props.data.PC_ITEM_DESC_SMALL;
        let prodDetailSection= '';
        
        if(productDetails){
        prodDetailSection = productDetails.replace(/&nbsp;/gi, "");
        prodDetailSection = productDetails.replace(/&rdquo;/gi, '"');
        prodDetailSection = productDetails.replace(/&ldquo;/gi, '"');
        prodDetailSection = productDetails.replace(/&rsquo;/gi, "'");
        prodDetailSection = decodeEntityCode(prodDetailSection);
        }
        let prodDesc = prodDetailSection?
         <>
            <div className='proSubHeading fw por fs15'>{this.props.data.IS_PROD_SERV === 'S' ? 'Service Description' : 'Product Description'}</div><div className="fs15 lh22 clr33 pd10 prodContainer" dangerouslySetInnerHTML={{ __html: prodDetailSection }} /></>:'';
        let details = [];
        details.push(setISQs);
        details.push(MOQ);
        details.push(<p className="crx"></p>);
        details.push(pdfSection);
        details.push(offerMoreDetailShow);
        details.push(prodDesc);

        let productId = this.props.data['PC_ITEM_DISPLAY_ID'];

        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let translatedText = this.props.translatedTxt;
    
        let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        let isButtonDisabled = this.checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID);
        let isOneTap=(checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && this.props.data;
        
        let isOOS=this.props.data.PC_ITEM_STATUS_APPROVAL && this.props.data.PC_ITEM_STATUS_APPROVAL === "9";
        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
        let showEcom = (isEcomURL && (isEcom && isEcomStoreFlag  == 1)&&!isOOS);
        let ABTestVal = (window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
        let eventaction="Get_Quotes"
        let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
        let status = checkUserStatus();
        eventaction+=(status>=0 && status<=2 ? loginModeArray[status]+"|Proddetails" : "");
        let PAID_TYPE =this.props.data.URL_TYPE ? "|"+this.props.data.URL_TYPE :''; 
        let callProps =
        {
            type: "OnProductDescription",
            CONTACT_NUMBER: this.props.num,
            CONTACT_TYPE: this.props.numType,
            call_txt: "कॉल करें",
            compname: this.props.data.COMPANYNAME?this.props.data.COMPANYNAME:'',
            contact_no: "contact_no",
            glusrid: this.props.data.GLUSR_USR_ID? this.props.data.GLUSR_USR_ID:'',
            im_popup: "im_popup",
            itemId: this.props.data.PC_ITEM_DISPLAY_ID?this.props.data.PC_ITEM_DISPLAY_ID:'',
            itemImage: this.props.data.PC_IMG_SMALL_100X100 ?this.props.data.PC_IMG_SMALL_100X100  : "https://m.imimg.com/gifs/background_image.jpg",
            mbgn_askpopup: "mbgn_askpopup",
            mcatid: this.props.data.BRD_MCAT_ID ? this.props.data.BRD_MCAT_ID: '',
            mcatname:this.props.data.BRD_MCAT_NAME,
            pagename: "PDP" + this.props.pageLang,
            dbpagetrack:'IMOB_PDP_Prod_Description'+'|title|'+this.props.pageLang+PAID_TYPE+this.props.track,
            page: 'PDP',
            itemName: this.props.data.PC_ITEM_DISPLAY_NAME,
            tscode: this.props.data.ETO_OFR_COMPANY_TSCODE ? this.props.data.ETO_OFR_COMPANY_TSCODE : '',
            eventAction: "Clicked-"+this.props.numType+PAID_TYPE,
            eventLabel: 'PDP_Product_Info',
            
        }

        if(isISQPresent || prodDetailSection)
        { 
            let prodDescFlag = true;
            return ( 
              
                <section class="w100 mt3 por" id="additionalProdDesc">
                    {this.state.ShowPdf?
                    this.state.pdfviewer?<div><this.state.pdfviewer data={this.props} pdf={this.state.ShowPdf} close={this.closePdf} isProdDescVisible={this.state.isProdDescVisible} isButtonDisabled={isButtonDisabled}/>
</div>: <div><div className='t0 w100 pof ht53 z1003 bgmim '><i className="Wh32 dib bgNorepeat CloseArrowSvg poa l0 t10 z1003" onClick={()=>{this.closePdf(); eventTracking("Product-Page-Clicks",'Crossbtn-product_description-Pdf',"Close-Pdf",true)}}></i>
                    <i className='IMlogo z1003 tbSp l21 poa t15'></i>
                    <GetLatestPriceEnquiry 
                                toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
                                 enqCtaDisabled = {this.props.enqCtaDisabled}
                                 label={this.props.data['PC_ITEM_DISPLAY_ID']} evntAction={"ProductDescription-GetBestPrice-PDF"} 
                                 data={this.props.data} pageLang={this.props.pageLang}
                                    formId={"latestPriceEnqPrdDesc" + this.props.data['PC_ITEM_DISPLAY_ID']} queryRef={"IMOB_PDP_PDF|pdp_first_fold"} pageName={"PDP"} isExtendedIndex={this.props.extendedId} isExtended={this.props.isExtended} cta_name={this.props.cta_name} translatedText={this.props.translatedTxt} showModal={this.props.showModal} pdpModrefType={this.props.pdpModrefType} eventAction={"PDP_ProductDesc"} showCallEnqCTA={!isButtonDisabled} isProdDescVisible={this.state.isProdDescVisible}ispdf={this.state.ShowPdf}/></div>
                        <div className='bgW z1003 pof t53 ht100 w100 tc'>
                            <i className='por dib loader '></i>
                            <p>Please wait Pdf is loading..</p>
                            </div></div>:''}
                            
                    <div id={"pdpDetail" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`pdpDetails clrlft tl bgw bxsdw mt0 ${prodDescFlag?'':''}`}>                                    
                    
                        {isISQPresent ? 
                        <p id={"isDescp" + this.props.data['PC_ITEM_DISPLAY_ID']} 
                        className=" db fs15 mxht1000 clrb pd10 fw brdb " 
                        onClick={() => { viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId,isISQPresent, 'clickedFromLable', this.setIsProdView,this.setProdDecsClick,prodDescFlag) }}>{descriptionTitle}</p>
                        :''}
                      
                      <div id={"isToggleId" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`${prodDescFlag?'db':''}`}>
                        <div id={"pdpDetail_box" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`fs15 color7 ta_l B3 ${prodDescFlag?' htato oh':'htato oh'}`}> 
                            {  (isISQPresent || pdfSection || MOQ) ? (<div id={"prodDesc" + this.props.data['PC_ITEM_DISPLAY_ID']}
                                className={`animated ${prodDescFlag?'mb0':'mb10'}`}>
                                <div className={`${prodDescFlag?'':''}`}>
                                    <div id="prod_desc1" className={`${prodDescFlag?'':''} fs15`}>{details}</div>
                                </div>

                            </div>)
    
                                : prodDetailSection != "" ? <div id={"prodDesc" + this.props.data['PC_ITEM_DISPLAY_ID']}
                                className={`animated ${prodDescFlag?'mb0':'ht55px oh mb0'}`}>                                
                                    <div className={`${prodDescFlag?'':''}`}>
                                        <div id="prod_desc1" className={`${prodDescFlag?'':''} fs15`}>{prodDesc}</div>
                                    </div>
                                    </div> : ""}

                                    {!this.props.showProdDetails ?  
                                    <div id="stickyCTA" className={`${isEcomStoreFlag==1 ? 'ht72':'ht52'} mb10 mt10 por`}>
                                    <div id="stickyCTAFixed" className='bgw btm0 pd10 poa w100 z1'>
                                    <CallEnquiryCTA
                                    isPdpHeader={true}
                                    enqCtaDisabled={this.props.enqCtaDisabled}
                                    toggleEnqCTADisabled={this.props.toggleEnqCTADisabled}
                                    pageLang={this.props.pageLang} 
                                    data={this.props.data} 
                                    translatedTxt={this.props.translatedTxt} 
                                    queryRef={"productdetail-product-header-overlay-js"} 
                                    pageName={"PDP"} 
                                    isExtended={false} 
                                    cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} 
                                    callNowClick={this.props.callNowClick} 
                                    eventLabel={"PDP_Header"} 
                                    showModal={this.props.showModal} 
                                    pdpModrefType={'3'} 
                                    btnName={"First_Fold"} 
                                    isIntermediateScreenVisible={this.props.isIntermediateScreenVisible} 
                                    track={this.props.track} /></div> </div>: ''}

                                    
                                    </div> 
                        </div> </div>
                  
    
                </section>
            );
        }
        else
        return

    }
}