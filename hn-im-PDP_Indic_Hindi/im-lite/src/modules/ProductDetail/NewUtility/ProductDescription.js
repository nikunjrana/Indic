import React, { useState,useEffect } from 'react';
import { generateUniqueKey } from '../utility/helper';
import CTA from '../utility/NewCallEnqCTA';
import { getMobileNum } from '../utility/helper';
import Pdf from './Pdf';
import Buynow from './Buynow';
import { LetsTalk } from './LetsTalk';


function ProductDescription(props){

    let isProdServK = props.data.IS_PROD_SERV;
    let isOutOfStock = props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
    let isEcom= props.data.PC_ITEM_IS_ECOM? props.data.PC_ITEM_IS_ECOM:'',
    isEcomURL= props.data.ECOM_CART_URL ? props.data.ECOM_CART_URL : props.data.ECOM_ITEM_LANDING_URL? props.data.ECOM_ITEM_LANDING_URL:'',
    isEcomStoreFlag= props.data.ECOM_STORE_ENABLE_FLAG? props.data.ECOM_STORE_ENABLE_FLAG:'';
    let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
    let addProdData = getaddProdData(props.data);
    let isOtherISQ = props.data && (props.data.PC_ITEM_MIN_ORDER_QUANTITY || props.data.ETO_OFR_SUPPLY_TERM || props.data.ETO_OFR_PAY_TERM || props.data.PORT_OF_DISPATCH || props.data.PRODUCTION_CAPACITY || props.data.DELIVERY_TIME || props.data.PACKAGING_DETAILS || props.data.DOC_PATH) ? true:false;
    let isqLength = props.data && props.data.ISQ && props.data.ISQ.length;
    let allOtherIsq = [props.data.PC_ITEM_MIN_ORDER_QUANTITY , props.data.ETO_OFR_SUPPLY_TERM , props.data.ETO_OFR_PAY_TERM , props.data.PORT_OF_DISPATCH , props.data.PRODUCTION_CAPACITY , props.data.DELIVERY_TIME , props.data.PACKAGING_DETAILS, props.data.DOC_PATH]
    allOtherIsq = allOtherIsq? allOtherIsq.filter(item => item):'';
    let DescLength=props.data.PC_ITEM_DESC_SMALL?props.data.PC_ITEM_DESC_SMALL.length:0;
    let totalIsqLength = ((isqLength + allOtherIsq.length) >=6)&&DescLength>900 ? true:false;
    let numObj = getMobileNum(props.data);
    let IsPns=numObj.type == 'PNS'?"PNS":"NonPNS";

    useEffect(() => {

}, [])
    function getaddProdData(pdpData){	
        let isqData = pdpData.ISQ && pdpData.ISQ.length>=1 ? pdpData.ISQ : '';	
        let prodDesc = pdpData.PC_ITEM_DESC_SMALL ? pdpData.PC_ITEM_DESC_SMALL: '';	
        let moqData = pdpData.PC_ITEM_MIN_ORDER_QUANTITY?[{FK_IM_SPEC_MASTER_DESC : "Minimum Order Quantity", SUPPLIER_RESPONSE_DETAIL: pdpData.PC_ITEM_MIN_ORDER_QUANTITY+" "+pdpData.PC_ITEM_MOQ_UNIT_TYPE}]:'';	
        let PdfData = pdpData.DOC_PATH&&/.pdf$/.test(pdpData.DOC_PATH)? true: false;	
        let delTerm = pdpData.ETO_OFR_SUPPLY_TERM ? {FK_IM_SPEC_MASTER_DESC:'Delivery Terms',SUPPLIER_RESPONSE_DETAIL:pdpData.ETO_OFR_SUPPLY_TERM}:'';	
        let payTerm = pdpData.ETO_OFR_PAY_TERM ? {FK_IM_SPEC_MASTER_DESC:'Payment Terms',SUPPLIER_RESPONSE_DETAIL:pdpData.ETO_OFR_PAY_TERM}:'';	
        let portDel = pdpData.PORT_OF_DISPATCH ? {FK_IM_SPEC_MASTER_DESC:'Port Of Dispatch',SUPPLIER_RESPONSE_DETAIL:pdpData.PORT_OF_DISPATCH}:'';	
        let procCap = pdpData.PRODUCTION_CAPACITY ? {FK_IM_SPEC_MASTER_DESC:'Product Capacity',SUPPLIER_RESPONSE_DETAIL:pdpData.PRODUCTION_CAPACITY}:'';
        let delTime = pdpData.DELIVERY_TIME ? {FK_IM_SPEC_MASTER_DESC:'Delivery Time',SUPPLIER_RESPONSE_DETAIL:pdpData.DELIVERY_TIME}:'';
        let pkgDtl = pdpData.PACKAGING_DETAILS ? {FK_IM_SPEC_MASTER_DESC:'Packaging Details',SUPPLIER_RESPONSE_DETAIL:pdpData.PACKAGING_DETAILS}:'';
        let prodMoreData = [delTerm,payTerm,portDel,procCap,delTime,pkgDtl];
        let prdname=pdpData.PC_ITEM_NAME?pdpData.PC_ITEM_NAME:pdpData.PC_ITEM_DISPLAY_NAME?pdpData.PC_ITEM_DISPLAY_NAME:'';
        return {	
            isqData:isqData,prodDesc:prodDesc,moqData:moqData,PdfData:PdfData, prodMoreData,prdname:prdname
        }
    }
    function Cta(){
        let isOutOfStock = props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
        let isEcom= props.data.PC_ITEM_IS_ECOM? props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= props.data.ECOM_CART_URL ? props.data.ECOM_CART_URL : props.data.ECOM_ITEM_LANDING_URL? props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= props.data.ECOM_STORE_ENABLE_FLAG? props.data.ECOM_STORE_ENABLE_FLAG:'';
        let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));
        return(
           ''
        )
    }
    function pdfDiv(flag){	
        if(flag){	
            return(	
            <div className="prd-tble">	
            <div className="crb dflex">	
              <div className="columnDescPDP cl75 fs15 lh22">Product Brochure</div>	
              	<Pdf data={props.data} callProps={props.callProps} showModal={props.showModal} callNowClick={props.callNowClick} enqCtaDisabled={props.enqCtaDisabled} transformedNo={props.transformedNo}/>
              </div>
            </div>	
            )	
        }	
        else{	
            return ''	
        }	
    }
    function isqDiv(isq) {
        if(isq && isq.length>=1) {
          let isqD = isq.map(isqVal=> {
            if(isqVal.FK_IM_SPEC_MASTER_DESC && isqVal.SUPPLIER_RESPONSE_DETAIL) 
            {
            let responseDetail =!props.IsSSR&&navigator&&navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0?
            isqVal.SUPPLIER_RESPONSE_DETAIL.replace(/\d/g, "$&\u200C"):isqVal.SUPPLIER_RESPONSE_DETAIL;
            return(
            <div key={generateUniqueKey()}  className="prd-tble">
            <div className="crb dflex">
              <div className="columnDescPDP cl75 fs15 lh22">{isqVal.FK_IM_SPEC_MASTER_DESC}</div>
              <div className="columnDescPDP cl56 fs15 lh22 fw500">{responseDetail}</div>
            </div>
            </div>)}
          });
          return isqD;
          }
          return ""
    }

    if(addProdData && (addProdData.isqData || addProdData.prodDesc)) {
        let onlybrtsgs=/^<br\s*\/?>*$/.test(addProdData.prodDesc)
        return(
        <section id="addProdDesc" className="w100 por mt3">	
        <div className="clrlft mb10 tl bgw bxsdw">	
            {/* <p className="db fs14 mxht1000 clrb fw pl10 pdb5 pdt5">
            {addProdData.isqData || isOtherISQ ? isProdServK==='S'? 'Service Specifications':'Product Specifications':''}</p> */}
            {/* <div id="pdpDetail_box2851108727212" className="fs15 color7 ta_l B3  htato oh db">

            <div className="db">	
                <div className="fs15">	
                        <div className="fs15">
                            {isqDiv(addProdData.isqData)}	
                            {isqDiv(addProdData.moqData)}	
                            {pdfDiv(addProdData.PdfData)}	
                            {isqDiv(addProdData.prodMoreData)}
                            {totalIsqLength?<LetsTalk key={props.callProps.CONTACT_NUMBER}
            callText={props.callProps.call_txt}
            eventAction={props.callProps.eventAction+"|ISQ&Description|"+`${props.callProps.PAID_TYPE}`}
            eventLabel={"PDP_Description"}
            eventCategory={'Clicked-PNS'}
            companyContactNo={props.callProps.CONTACT_NUMBER}
            track={props.track}
            id='LetsTalkPDPcsr'
            CompanyName={props.data.COMPANYNAME}
            transformedNo={props.transformedNo}
            IsPns={IsPns}
            imgurl={props.firstimage?props.firstimage:"https://m.imimg.com/gifs/background_image.jpg"}
            displayPopup={() => {
                props.callNowClick("कॉल करें",
                    props.callProps.itemImage.replace(/^http:\/\//i, 'https://'), props.callProps.tscode, props.callProps.compname,
                    props.callProps.CONTACT_NUMBER, props.callProps.CONTACT_TYPE, props.callProps.glusrid,
                    props.callProps.itemId, props.callProps.itemName, props.callProps.mcatid, props.callProps.mcatname, props.callProps.dbpagetrack);
            }}/>:""}
                            <p className="crx"></p>	
                            {addProdData.prodDesc&&!onlybrtsgs?<p className="db fs14 mxht1000 clrb fw pl10 pdb5 pdt5">
                               {isProdServK==='S'?"Service Description":"Product Description"} </p>:''}
                            {addProdData.prodDesc&&!onlybrtsgs?<div id="lcp_Desc" className="fs14 lh22 clr33 pdlrb10 crx"dangerouslySetInnerHTML={{ __html: addProdData.prodDesc }}></div>:''}
                            <p id="Reference" className='crx'></p>
                        </div>	
                        
                </div>
            </div>	</div> */}
            <div className='ht60p pos b0'>{Cta()}</div>
            
        </div>	
    </section>)	
    }	
    return ``	
}
export default ProductDescription;