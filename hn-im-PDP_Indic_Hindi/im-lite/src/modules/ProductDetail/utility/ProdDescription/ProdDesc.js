import React from 'react';
import { getCookie, getCookieValByKey } from '../../../../Globals/CookieManager';
import { setDescriptionTitle, setISQ,getMOQ, decodeEntityCode, viewMoreAndLess, offerMoreDetail,callBL, observer} from "./helper";
import { checkUserStatus,checkUserMode} from '../../../../Globals/MainFunctions';
import InlineChatWithSeller from '../ChatWithSeller/InlineChatWithSeller';
import GetLatestPriceEnquiry from '../GetLatestPriceEnquiry/GetLatestPriceEnquiryHTML';
import "./ProdDesc.css";
import Shopify from '../Shopify/Shopify';
import { eventTracking } from '../../../../Globals/GaTracking';
import { CallBtn4 } from '../../../CallNow/views/CallBtn4';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import {removalTextNodes} from '../../../../Globals/translatorPreact/translatorPatch';


export default class ProdDesc extends React.Component {
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
    }

    setProdDescVisible() {
        window.refUrl && window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        this.closePdf();
        let productId = this.props.data['PC_ITEM_DISPLAY_ID'];
        let translatedText = this.props.translatedTxt;
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let isISQPresent = this.props.data.ISQ.length > 0 ? true : false;
        let prodDescFlag = this.state.ProdDecsClick==='clickedFromViewMore' || (this.state.ProdDecsClick==='clickedFromLable' && this.state.isProdDescVisible) ? true : false

        if (this.state.isProdDescVisible) {
            viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId, isISQPresent, 'clickedFromOnLoad', this.setIsProdView,this.setProdDecsClick,prodDescFlag);
        }

    }
    setShowPdf(){
        this.setState({ShowPdf:true})
    }
    closePdf(){
        this.setState({ShowPdf:false})
    }
    setIsProdView(isProdDescVisible) {
        this.setState({ isProdDescVisible })
    }
    setProdDecsClick(clickedFrom){
        this.setState({ProdDecsClick:clickedFrom})
    }
    constructPDF(docPath){
        docPath=docPath.replace(/^http:\/\//i, 'https://');
       let PDF = <div id={"prodbrochure1" + this.props.data['PC_ITEM_DISPLAY_ID']} class="prd-tble"> <div className="row crb dflex">
               <p className="columnDescPDP cl75  fs15 lh22">Product Brochure</p>
                   <a className="columnDescPDP cl56 fs15  lh22 dflex" onClick={() => {eventTracking("Product-Page-Clicks","Click_ViewPDF",'Pdf_viewnow',true);this.setShowPdf(); import(/*webpackChunkName:"Pdfviewer"*/'./Pdfviewer').then((module) => {
            this.setState({ pdfviewer: module.default })
        })}} target="_blank">
                       <img class="vam" border="0" width="24" alt="download pdf" src="https://m.imimg.com/gifs/pdf.png" />
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
        if(this.state.isProdDescVisible&&!prevState.isProdDescVisible&&!this.props.data.DOC_PATH==''){
            let targetid="prodbrochure" + this.props.data['PC_ITEM_DISPLAY_ID']
            observer(targetid);
        }
        this.state.isProdDescVisible && this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?
        document.body.style.overflow="hidden":'';
        let isIphone= navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0;
        isIphone?this.state.isProdDescVisible ?scrollTo(0,0):'':'';
        this.state.isProdDescVisible &&this.state.callclick?document.body.style.overflow="hidden":'';    }
    componentWillUnmount() {
        window.removeEventListener('popstate', this.setProdDescVisible);
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



    render() {
        let that = this;
        let offerMoreDetailShow = offerMoreDetail(that);
        let pdfSection = that.props.data.DOC_PATH?this.constructPDF(that.props.data.DOC_PATH):'';
        let isISQPresent = this.props.data.ISQ.length > 0 ? true : false;
        let descriptionTitle = setDescriptionTitle(this.props.data.IS_PROD_SERV, this.props.translatedTxt);
   
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
        let prodDesc = prodDetailSection? <div className="fs15 lh22 clr33 pd10" dangerouslySetInnerHTML={{ __html: prodDetailSection }} />:'';
        let details = [];
        details.push(setISQs);
        details.push(MOQ);
        details.push(<p className="crx"></p>);
        details.push(prodDesc);
        details.push(pdfSection);
        details.push(offerMoreDetailShow);

        let productId = this.props.data['PC_ITEM_DISPLAY_ID'];

        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let translatedText = this.props.translatedTxt;
    
        let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        let isButtonDisabled = this.checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID);
        let isOneTap=(checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && this.props.data;
        
      
        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
        let showEcom = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
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
            let prodDescFlag = this.state.ProdDecsClick==='clickedFromViewMore' || (this.state.ProdDecsClick==='clickedFromLable' && this.state.isProdDescVisible) ? true : false
            return ( 
              
                <section class="w100 mt3 por">
                    {this.state.ShowPdf&&this.state.isProdDescVisible && this.props.isExtended?
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
                    {this.props.isExtended ? 
                    <div id={"blakbg" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`blakbg ${prodDescFlag?'bd':'dn'} `}  onClick={() => {this.state.ShowPdf?'':
                                viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId,isISQPresent, 'clickedFromBlackBG', this.setIsProdView,this.setProdDecsClick,prodDescFlag)
                            }}></div> :''}
                            
                    <div id={"pdpDetail" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`animated pdpDetails clrlft mb10 tl bgw bxsdw mt10 ${prodDescFlag?'dt_pos1 animate__slideInUpShare':''}`}>                                    
                    {this.props.isExtended ? 
                    <div id={"crossPrd" + this.props.data['PC_ITEM_DISPLAY_ID']} 
                        className={`poa  pd15 ${this.state.isProdDescVisible&&!isEcom?' l0 t5 ':'tp0 rt0'} ${prodDescFlag?'db':'dn'}`}
                        onClick={() => {
                                viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId,isISQPresent, 'clickedFromCross', this.setIsProdView,this.setProdDecsClick,prodDescFlag)
                    }}><i class={`wh15 dib bgNorepeat  ${this.state.isProdDescVisible&&!isEcom?'closearrowSvg':'closeArrowSvg'}`}></i></div> :''}

                        <p id={"isDescp" + this.props.data['PC_ITEM_DISPLAY_ID']} 
                        className={`db fs15 mxht1000 clrb fw brdb ${this.state.isProdDescVisible&&!isEcom?'pd20 tc':'pd10'}`} 
                        onClick={() => { viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId,isISQPresent, 'clickedFromLable', this.setIsProdView,this.setProdDecsClick,prodDescFlag) }}>{descriptionTitle}</p>
                      
                      <div id={"isToggleId" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`${prodDescFlag?'db':''}`}>
                        <div id={"pdpDetail_box" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`fs15 color7 ta_l B3 ${prodDescFlag?' ovyato':'htato oh'}`}> 
                        {this.state.isProdDescVisible && this.props.isExtended ?<p  className='fs15  clr92 fw lr0 b0 tc poa pd5' onClick={() => {callBL(this.props.data.BRD_MCAT_ID,this.props.data.BRD_MCAT_NAME,this.props.data.PC_ITEM_IMG_SMALL,"PDP",this.props.showModal,this.props.track);eventTracking("Product-Page-Clicks",eventaction,"Need more variants|BuyleadCTA|PDP|"+checkUserMode(),true)}} >Need More Variants ?</p>:""}
                        {this.state.isProdDescVisible&&!isEcom && this.props.isExtended ?
                    <CallBtn4
                        key={callProps.CONTACT_NUMBER}
                        callText={callProps.call_txt}
                        callclick={this.callClick}
                        eventAction={callProps.eventAction}
                        eventLabel={callProps.eventLabel}
                        eventCategory={''}
                        abtest={true}
                        isButtonDisabled={true}
                        isAnimated={true}
                        displayPopup={() => {
                            this.callNowClick("कॉल करें",
                                callProps.itemImage.replace(/^http:\/\//i, 'https://'), callProps.tscode, callProps.compname,
                                callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                                callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack);
                        }}
                    />:''}
                            {  (isISQPresent || pdfSection || MOQ) ? (<div id={"prodDesc" + this.props.data['PC_ITEM_DISPLAY_ID']}
                                className={`animated ${prodDescFlag?'htato os mb40px':'ht125px oh mb0'}`}>
                                <div className={`${prodDescFlag?'containerPD':''}`}>
                                    <div id="prod_desc1" className={`${prodDescFlag?'wrapperPD':''} fs15`}>{details}</div>
                                </div>

                                {
                                 showEcom && this.props.isExtended ? <Shopify pdpData={this.props.data} calledFrom={true} ClickedFrom={'ProdDesc'} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} prodDescFlag={prodDescFlag}/> 
                                : 
                                isOneTap && !isButtonDisabled && !this.props.data['LANDING_FROM_SPA'] && this.props.isExtended ? 
                                <InlineChatWithSeller
                                prodDescFlag = {prodDescFlag}
                                    toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
                                    enqCtaDisabled = {this.props.enqCtaDisabled}
                                    label="Request-Call-Back-Company" data={this.props.data} pageLang={this.props.pageLang} formId={"latestPriceEnqAbtSelr" + this.props.data['PC_ITEM_DISPLAY_ID']} isExtended={this.props.isExtended} queryRef={this.props.queryRef+ABTestVal} extendedId={this.props.extendedId} pageName={"PDP"} translatedText={this.props.translatedTxt} showModal={this.props.showModal} cta_name={this.props.cta_name} pdpModrefType={this.props.pdpModrefType} btnName={this.props.isExtended?'Product_Description_Extended':"Product_Description"} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} isProdDescVisible={this.state.isProdDescVisible}
                                    proddesc={true}  track={this.props.track}/> 
                                :
                                this.props.isExtended ?  <GetLatestPriceEnquiry 
                                prodDescFlag = {prodDescFlag}
                                toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
                                 enqCtaDisabled = {this.props.enqCtaDisabled}
                                 label={this.props.data['PC_ITEM_DISPLAY_ID']} evntAction={"ProductDescription-GetBestPrice"} 
                                 data={this.props.data} pageLang={this.props.pageLang}
                                    formId={"latestPriceEnqPrdDesc" + this.props.data['PC_ITEM_DISPLAY_ID']} queryRef={"IMOB_PDP_Product_Details|pdp_first_fold|"} pageName={"PDP"} isExtendedIndex={this.props.extendedId} isExtended={this.props.isExtended} cta_name={this.props.cta_name} translatedText={this.props.translatedTxt} showModal={this.props.showModal} pdpModrefType={this.props.pdpModrefType} eventAction={"PDP_ProductDesc"} showCallEnqCTA={!isButtonDisabled} isProdDescVisible={this.state.isProdDescVisible} ClickedFrom={'ProdDesc'}  track={this.props.track}/> :''}
                            </div>)
    
                                : prodDetailSection != "" ? <div id={"prodDesc" + this.props.data['PC_ITEM_DISPLAY_ID']}
                                className={`animated ${prodDescFlag?'htato os mb40px':'ht55px oh mb0'}`}>                                
                                    <div className={`${prodDescFlag?'containerPD':''}`}>
                                        <div id="prod_desc1" className={`${prodDescFlag?'wrapperPD':''} fs15`}>{prodDesc}</div>
                                    </div>
                                    {
                                    showEcom && this.props.isExtended  ? <Shopify pdpData={this.props.data} calledFrom={'ProdDesc'} ClickedFrom={'ProdDesc'} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} prodDescFlag={prodDescFlag}/>
                                    : 
                                    isOneTap && !isButtonDisabled  && !this.props.data['LANDING_FROM_SPA'] && this.props.isExtended ? 
                                        <InlineChatWithSeller
                                        prodDescFlag={prodDescFlag}
                                        toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
                                        enqCtaDisabled = {this.props.enqCtaDisabled}
                                        label="Request-Call-Back-Company" 
                                        proddesc={true}
                                        data={this.props.data} 
                                        pageLang={this.props.pageLang} 
                                        formId={"latestPriceEnqAbtSelr" + this.props.data['PC_ITEM_DISPLAY_ID']} 
                                        isExtended={this.props.isExtended} 
                                        queryRef={this.props.queryRef+ABTestVal} 
                                        extendedId={this.props.extendedId} 
                                        pageName={"PDP"} 
                                        translatedText={this.props.translatedTxt} 
                                        showModal={this.props.showModal} 
                                        cta_name={this.props.cta_name} 
                                        pdpModrefType={this.props.pdpModrefType}
                                        btnName={this.props.isExtended?'Product_Description_Extended':"Product_Description"} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} isProdDescVisible={this.state.isProdDescVisible}  track={this.props.track}/> 
                                    :
                                    this.props.isExtended ? <GetLatestPriceEnquiry 
                                        prodDescFlag = {prodDescFlag}
                                        toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled} 
                                        label={this.props.data['PC_ITEM_DISPLAY_ID']} evntAction={"ProductDescription-GetBestPrice"}
                                        data={this.props.data} pageLang={this.props.pageLang}
                                        enqCtaDisabled = {this.props.enqCtaDisabled}
                                        formId={"latestPriceEnqPrdDesc" + this.props.data['PC_ITEM_DISPLAY_ID']} queryRef={"productdetail-product-header-description-callback-js|pdp_first_fold|"+ABTestVal} pageName={"PDP"} isExtendedIndex={this.props.extendedId} isExtended={this.props.isExtended} cta_name={this.props.cta_name} translatedText={this.props.translatedTxt} showModal={this.props.showModal} pdpModrefType={this.props.pdpModrefType} showCallEnqCTA={!isButtonDisabled} isProdDescVisible={this.state.isProdDescVisible} ClickedFrom={'ProdDesc'}  track={this.props.track}/> :''}
                                    </div> : ""}
    
                                    <div className={`pd10 clrBl tc fs15 bxsdw666  ${prodDescFlag?'dn':''}`} id={"v_more1" + productId} onClick={() => {
                                viewMoreAndLess(true, "v_more1" + productId, productId, translatedText, langSelection, this.props.extendedId,isISQPresent, 'clickedFromViewMore', this.setIsProdView,this.setProdDecsClick,prodDescFlag)
                            }}> 
                                <p className='mxht1000'>{translatedText.CM_LABEL16}</p>
                                                      
                                    </div> 
                                    </div> 
                        </div> </div>
                  
    
                </section>
            );
        }
        else
        return

    }
}