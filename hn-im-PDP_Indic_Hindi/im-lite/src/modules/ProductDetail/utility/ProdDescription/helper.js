import React, { Component } from 'react';
import { eventTracking } from '../../../../Globals/GaTracking';
import { getCookie } from '../../../../Globals/CookieManager';
import { modifyImgSrc } from '../Carousel/helper';

export const decodeEntityCode = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
export const setDescriptionTitle = (title, translatedTxt, additionalInfo='') => {

    let prodDescTitle = '';

    if (title === 'P') {
        additionalInfo == 'AdditionalInfo' ? prodDescTitle = translatedTxt.LABEL14PDP : prodDescTitle = 'Product Specifications';
    } else if (title === 'S') {
        additionalInfo == 'AdditionalInfo' ? prodDescTitle = translatedTxt.PDP_LABEL1_Detail :prodDescTitle = 'Service Specifications';
    } else {
        prodDescTitle = 'Product Specifications';
    }
    return prodDescTitle


}
export const imgsgriddiv=(data)=>{

    return(<>
    <h3 className='pd10 fw fs15 mxht1000 bgef'>Product Photos</h3>
    <div className='gridcontainer'>{imagesgrid(data)}</div>
    </>
    )
}
export  const imagesgrid=(data)=>{
    let images=data.ITEM_IMG;
    let imgs=[];
    let firstImg='';
    if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { 
        firstImg = data.PC_ITEM_IMG_SMALL }
    else if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') { 
            firstImg = data.PC_IMG_SMALL_600X600 }
    else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { 
        firstImg = data.PC_IMG_SMALL_100X100 }
    else if (data.PC_ITEM_IMG_ORIGINAL && data.PC_ITEM_IMG_ORIGINAL != '') { 
        firstImg = data.PC_ITEM_IMG_ORIGINAL }
    else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { 
        firstImg = data.GLUSR_USR_LOGO_IMG }
    else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
    firstImg?firstImg = modifyImgSrc(firstImg):'';
    imgs.push(firstImg)
    for (let index in images) {
        if (images.hasOwnProperty(index)) {
            let im = images[index],
                imageFinal = '';
                 if (im.IMAGE_250x250 && im.IMAGE_250x250 != '') { imageFinal = im.IMAGE_250x250 }
                else if (im.IMAGE_125x125 && im.IMAGE_125x125 != '') { imageFinal = im.IMAGE_125x125 }
                else if (im.IMAGE_500X500 && im.IMAGE_500X500 != '') { imageFinal = im.IMAGE_500X500 }
                else if (im.IMAGE_ORIGINAL && im.IMAGE_ORIGINAL != '') { imageFinal = im.IMAGE_ORIGINAL }

            imageFinal?imageFinal = modifyImgSrc(imageFinal):'';
            imgs.push(imageFinal)
        }
    }

    return imgs.map((imgs, index) => {
        return(
            <div className='gridimg'>
            <img alt={data.PC_ITEM_DISPLAY_NAME?data.PC_ITEM_DISPLAY_NAME:data.PC_ITEM_NAME?data.PC_ITEM_NAME:''} src={imgs} loading='lazy'/>
            </div>
        )
    })

}
export const callBL=(mcatid, mcatname, imgurl,pageName,showModal,track)=> {
    let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    let query_text = "Need_More_Variants-clicks|" + langSelection +track;
    query_text+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"");
    let obj = {};
    obj.prNtFndName = '';
    obj.CEF_form_type = '';
    obj.CefProdType = '';
    obj.R_custtype_weight = "";
    obj.affiliationId  ='-1111';
    obj.mcatId  = mcatid;
    obj.productName = mcatname;
    obj.query = '';
    obj.queryText = query_text;
    obj.modid = 'IMOB';
    obj.productImage=imgurl;
    obj.isEnquiry=false;
    obj.internaltrack=track
    obj.ctaName='Need More Variants';
    obj.page=pageName;
      showModal(obj);
  }
export const offerMoreDetail = (that) => {
    let PC_ITEM_CODE = that.props.data.PC_ITEM_CODE ?
    <div class="prd-tble"><div className="row crb  flex">
    <p className="columnDescPDP cl75  fs15 mb5 lh22">Item code</p>
    <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.PC_ITEM_CODE}</p>
    </div></div>: '';
    let ETO_OFR_SUPPLY_TERM = that.props.data.ETO_OFR_SUPPLY_TERM ?
    <div class="prd-tble"><div className="row crb flex">
            <p className="columnDescPDP cl75  fs15 mb5 lh22">Delivery Terms</p>
            <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.ETO_OFR_SUPPLY_TERM}</p>
        </div></div> : '';
    let ETO_OFR_PAY_TERM = that.props.data.ETO_OFR_PAY_TERM ?
    <div class="prd-tble"><div className="row crb  flex">
            <p className="columnDescPDP cl75  fs15 mb5 lh22">Payment Terms</p>
            <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.ETO_OFR_PAY_TERM}</p>
        </div> </div>: '';
    let PORT_OF_DISPATCH = that.props.data.PORT_OF_DISPATCH ?
    <div class="prd-tble"> <div className="row crb flex">
            <p className="columnDescPDP cl75  fs15 mb5 lh22">Port Of Dispatch</p>
            <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.PORT_OF_DISPATCH}</p>
        </div> </div> : '';
    let PRODUCTION_CAPACITY = that.props.data.PRODUCTION_CAPACITY ?
    <div class="prd-tble"> <div className="row crb  flex">
            <p className="columnDescPDP cl75  fs15 mb5 lh22">Production Capacity</p>
            <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.PRODUCTION_CAPACITY}</p>
        </div> </div> : '';
    let DELIVERY_TIME = that.props.data.DELIVERY_TIME ?
    <div class="prd-tble"><div className="row crb flex">
            <p className="columnDescPDP cl75  fs15 mb5 lh22">Delivery Time</p>
            <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.DELIVERY_TIME}</p>
        </div> </div>: '';
    let PACKAGING_DETAILS = that.props.data.PACKAGING_DETAILS ?
    <div class="prd-tble"> <div className="row crb flex">
            <p className="columnDescPDP cl75  fs15 mb5 lh22">Packaging Details</p>
            <p className="columnDescPDP cl56 fs15 mb5 lh22"> {that.props.data.PACKAGING_DETAILS}</p>
        </div> </div> : '';

    return (
       <section> 
            {ETO_OFR_SUPPLY_TERM}
            {ETO_OFR_PAY_TERM}
            {PORT_OF_DISPATCH}
            {PRODUCTION_CAPACITY}
            {DELIVERY_TIME}
            {PACKAGING_DETAILS}
            </section> 
    )
}


export const setISQ = (isq) => {

    
    isq && isq.sort((a, b) => (a.IM_CAT_SPEC_TYPE > b.IM_CAT_SPEC_TYPE) ? 1 : (a.IM_CAT_SPEC_TYPE === b.IM_CAT_SPEC_TYPE) 
    ? isq.reverse((a,b) => (Number(a.IM_CAT_SPEC_PRIORITY)  > Number(b.IM_CAT_SPEC_PRIORITY)) ? 1 : -1) : -1 )
    
    
    let ISQContainer = isq.map(function (query) {
        return (<div class="prd-tble  "><div className="row crb dflex">
            <div className="columnDescPDP cl75  fs15   lh22"> {query.FK_IM_SPEC_MASTER_DESC} </div>
            <div className="columnDescPDP cl56 fs15  lh22" style='font-weight:500'> {query.SUPPLIER_RESPONSE_DETAIL} </div>
        
        </div> </div>
        );
    });
    return ISQContainer


}
export const getMOQ = (quantity,type) => {

    let MOQContainer  =
       <div class="prd-tble  "><div className="row crb dflex">
            <div className="columnDescPDP cl75  fs15   lh22"> Minimum Order Quantity </div>
            <div className="columnDescPDP cl56 fs15  lh22" style='font-weight:500'> {quantity + " " + type} </div>
        </div> </div>
    return MOQContainer;
}

export const viewMoreAndLess = (isProdDescClick, boxId, theDispId, translatedTxt, langSelection, extendedId, isISQPresent, clickedFrom, callback, callback_,prodDescFlag) => {
    if(extendedId || extendedId===0){
            if(typeof callback_ === 'function'){callback_(clickedFrom)}
            let prodDescId = "prodDesc" + theDispId, sellerDescId = 'sellerDesc' + theDispId, prodbox = "pdpDetail_box" + theDispId, blakbg1 = "blakbg" + theDispId, pdpDetail = "pdpDetail" + theDispId, crossIcon = "crossPrd" + theDispId, isToggleId = "isToggleId" + theDispId, isDescp = "isDescp" + theDispId;
            // let prod_box = document.getElementById(prodbox);
            let rect =document.body.getBoundingClientRect();
            let isIphone= navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0;
            // if (document.getElementById(prodDescId)){
            // if (document.getElementById(prodDescId).style.height !== "125px" && document.getElementById(prodDescId).style.height !== "55px") {
            if(prodDescFlag){
                //popup closing handling
                if(typeof callback === 'function'){callback(false)}
                window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? history.back() : '';
                
                document.body.style.overflow = '';
            let scrollY = document.body.style.top;
            isIphone?document.body.style.top="":"";
            isIphone?document.body.classList.remove('oh'):"";
            isIphone?window.scrollTo(0, parseInt(scrollY || '0') * -1):"";
                // if (isISQPresent) {
                //     document.getElementById(prodDescId).style.height = "125px";
                // }
                // else {
                //     document.getElementById(prodDescId).style.height = "55px";
                // }
        
                // document.getElementById(prodDescId).style.overflow = "hidden";
                // document.getElementById(prodDescId).style.marginBottom = "0px";
                // document.getElementById(prodbox).setAttribute("style", "height: auto; overflow: hidden; ");
                // document.getElementById(isToggleId).removeAttribute("style");
                // prod_box.querySelector(".btn_enq")?prod_box.querySelector(".btn_enq").classList.remove("pf"):'';
                // prod_box.querySelector(".btn_enq")?prod_box.querySelector(".btn_enq").classList.add("dn"):'';
                // document.getElementById(boxId).classList.remove('dn');
                // document.getElementById(blakbg1).style.display = "none";
                // document.getElementById(crossIcon).style.display = "none";
                // document.getElementById(pdpDetail).classList.remove("dt_pos1", "animate__slideInUpShare");
        
                
                if (extendedId)//on Extended
                {
                    eventTracking('Extended-Product-Page-Clicks', 'View-More-Product-Details', "View-Less", true)
                }
                else //on First Fold
                {
                    if (clickedFrom && clickedFrom === "clickedFromLable") {
                        eventTracking('Product-Page-Clicks', 'Label-Product-Details', "View-Less", true);
                    } else {
                        eventTracking('Product-Page-Clicks', 'View-More-Product-Details', "View-Less", true);
                    }
                }

                
            } else {
                
        //popup opening handling      
                
                if(typeof callback === 'function'){callback(true)}
                history.pushState({ type: "somePopUP" }, location.pathname, "");
                window.refUrl ? window.refUrl.push("somePopUp") : "";

                if (extendedId)//on Extended
                {
                    eventTracking('Extended-Product-Page-Clicks', 'View-More-Product-Details', "View-More", true)
                } else //on First Fold
                {
                    if (clickedFrom && clickedFrom === "clickedFromLable") {
                        eventTracking('Product-Page-Clicks', 'Label-Product-Details', "View-More", true);
                    } else {
                        eventTracking('Product-Page-Clicks', 'View-More-Product-Details', "View-More", true);
                    }
                }
            isIphone?document.body.style.top = rect.top+"px":"";
            isIphone?document.body.classList.add('oh'):"";
                document.body.style.overflow = 'hidden'; 
                // document.getElementById(prodDescId).style.height = "auto";
                // document.getElementById(prodDescId).style.overflow = "scroll";
                // document.getElementById(pdpDetail).classList.add("dt_pos1", "animate__slideInUpShare");
                // document.getElementById(blakbg1).style.display = "block";
                // prod_box.querySelector(".btn_enq")?prod_box.querySelector(".btn_enq").classList.remove("dn"):'';
                // prod_box.querySelector(".btn_enq")?prod_box.querySelector(".btn_enq").classList.add("pf"):'';
                // document.getElementById(boxId).classList.add('dn');
                // document.getElementById(crossIcon).style.display = "block";
                // document.getElementById(prodbox).setAttribute("style", "height: 340px;overflow-y: auto; ");
                // document.getElementById(isToggleId).setAttribute("style", "display:block");
                // document.getElementById(prodDescId).style.marginBottom = "40px";

            }
        }else{
            let isAddProd = document.getElementById('additionalProdDesc');
            isAddProd? isAddProd.scrollIntoView({behavior: 'smooth'}):'';
            if (clickedFrom && clickedFrom === "clickedFromLable") {
                eventTracking('Product-Page-Clicks', 'Label-Product-Details', "View-More", true);
            } else {
                eventTracking('Product-Page-Clicks', 'View-More-Product-Details', "View-More", true);
            }
        }
    }
export const observer = (targetid) => {
    let target = document.getElementById(targetid);
    if(target){
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }
      let observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(target);
      function handleIntersect(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
                eventTracking( 'Product-Page-Clicks',"Impression_ViewPDF","view-pdf",false);
          }
        });
      }
    }
       
}











