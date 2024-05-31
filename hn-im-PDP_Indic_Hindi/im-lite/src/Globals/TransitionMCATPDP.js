import React, { useState, useEffect} from 'react';
import { CallBtn1 } from '../modules/CallNow/views/CallBtn1';
import { callNowActionDispatcher } from '../modules/CallNow/actions/callNowActionDispatcher';
import { A2HSApp } from '../Globals/GaTracking';
import {eventTracking} from '../Globals/GaTracking';
// import {getCookieValByKey} from '../Globals/CookieManager';
// import { checkUserStatus} from '../Globals/MainFunctions';
// import ChatWithSeller from '../modules/PDP/utility/ChatWithSeller/ChatWithSeller';

function TransitionMCATPDP(props)
{ 
    
    const [showEnqPopup, setShowEnqPopup] = useState(false);
    const [enqView, setEnqView] = useState(null);
    let divID = props.data?"pimage"+props.data.displayId:"";
    let imgID = props.data?"singleImg"+props.data.displayId:"";
    let pdpID = props.data?"pdp"+props.data.displayId:"";
    let view = "";
    
  
    let EnquiryFormData = {
        pdpModrefType:'3',
        isEnquiry : true,
        productName : props.data ? props.data.productName : '',
        page : 'PDP',
        receiverUserId : props.data ? props.data.glid : '',
        mcatId : props.data ? props.data.productMcatId : '',
        displayId : props.data ? props.data.displayId+"" : "",
        productImage:props.data ? props.data.imgUrl : 'https://m.imimg.com/gifs/img/prod-img.png',
        companyName : props.data ? props.data.companyName : '',
        ctaName : 'सर्वोत्तम मूल्य प्राप्त करें',
        affiliationId : "-1",
        showRevampEnq : false,
        nameCity : false,
        cityName : props.data? props.data.city: '',
        prdPricePDP :props.data ? props.data.price : '',
        modid : 'IMOB',
        queryText: 'IMOB_PDP_First_Fold' + '|' + 'IntermediatePDPScreen' + '|' +'LangEn' ,
        'query': props.data ? 'did=' + props.data.displayId + '&ss=&locality=&modreftype='+'3' : ''

    }
    // catid:catID,
    // 'CefProdType': (data.DATATYPE === 'product') ? 'P' : 'S',
 

    useEffect(()=>{
        // fixTheSection();
        eventTracking('Product-Page-Clicks','Intermediate_Screen',props.data.displayId);
        // loadTimeTrackingTo('LoaderPDP');
          
    },[])
    // useEffect(()=>{
    //     fixTheSection();
    // })

    function loadEnquiryContainer(){
   
            import(/* webpackChunkName:"EnqBlPWA" */'../modules/EnquiryBlForms/components/EnqBlMain').then((module) => {
                setEnqView(() => module.default);
            // window.removeEventListener("touchstart",this.loadEnquiryContainer);
            })
    
       
    }
    //     function isqLoop(arrayOfIsq)
    // {
    //     let noOfRows = [];

    //     for(var i=0;i<arrayOfIsq.length;i++)
    //     {
    //         noOfRows.push( <div class="prd-tble  ">
    //         <div class="row crb dflex">
    //             <div class="columnDescPDP cl75  fs15   lh22"> {arrayOfIsq[i].MASTER_DESC} </div>
    //             <div class="columnDescPDP cl56 fs15  lh22"> {arrayOfIsq[i].OPTIONS_DESC} </div>
    //             </div> </div>)
    //     }
    //    return (noOfRows);
    // }



    function callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack) {
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP' };
        callNowActionDispatcher(true, callProps);
    }



    function switchOnEnq()
    {   loadEnquiryContainer();
        setShowEnqPopup(!showEnqPopup);
        // window.clickedOnGetBestPrice=true;
        props.onClickGetBestPrice();
        eventTracking('Product-Page-Clicks', 'Get-Best-Price', "IntermediatePDPScreen", true);
    }
    // function fixTheSection() {
    //     let attachedID = document.getElementById('attachedN'),
    //         fixprodname = document.getElementById('fixProdName'),
    //         attachedHeight = fixprodname ? fixprodname.offsetHeight : '';
    //     if (attachedID)
    //         attachedID.style.height = attachedHeight + 'px';
    // }

    function switchOffEnq()
    {
        props.onClickBack();
        // window.clickedOnGetBestPrice=false;
        
    }

    function isImageVisible()
    {
        eventTracking('Product-Page-Clicks','Intermediate_Screen_Image_Visible',props.data.displayId)
    }


    function checkEnquirySentRelated(dispId) {
        let lsData=JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData="";
        }
        let e = lsData ? lsData['displayId'] : "undef";
        if (e) {
            let dispIds = e.split(",");
            return dispIds.includes(dispId+'');
        }
        else
            return false;
      }

    function constructEnquiryButton()
    {
        let disabled = checkEnquirySentRelated(props.data.displayId); 
        let enqbtn = '';
        let disableButtonStyle='background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;';

        enqbtn = ( <button id={props.data.displayId}
        disabled={disabled}
        style={disabled ? disableButtonStyle: ''}

        onClick={(event) => {
        switchOnEnq();
        }}
        
        className="fr pdb12 pdt12 w49 clrw fs14 fw bxsdw compBl bxrd20 tc">
        <i class="enqIcn dib vam mr2"></i>
        <span class="newBtn LISTING_BTN_8">{
        (disabled==true ? 'Enquiry Sent': 'सर्वोत्तम मूल्य प्राप्त करें')}</span>
        </button> )

        return enqbtn;
    }
    if(props.data)
    {

        let callProps ={
            CONTACT_NUMBER: props.data.companyContactNo,
            CONTACT_TYPE: props.data.companyContactVal=="PNS"?"PNS":"M",
            call_txt: props.translatedTxt ? props.translatedTxt.HEADER_BTN_1 : "कॉल करें",
            compname: props.data['companyName'] ? props.data['companyName'] : '',
            contact_no: "contact_no",
            glusrid: props.data["glid"],
            im_popup: "im_popup",
            itemId: props.data["displayId"],
            itemImage: props.data["imgUrl"]? props.data["imgUrl"]:"https://m.imimg.com/gifs/background_image.jpg",
            mbgn_askpopup: "mbgn_askpopup",
            mcatid: props.data["productMcatId"]? props.data["productMcatId"]:'',
            mcatname: props.data.catFlname,
            pagename: "product_detail_extended_PWA|" ,
            translatedText: props.translatedTxt ? props.translatedTxt : '',
            dbpagetrack: A2HSApp(true) ? 'IMOB_PDP_First_Fold|IntermediateScreen' + A2HSApp(true)+'-'+(document.getElementById("page_name") ? document.getElementById("page_name").value : '') : 'IMOB_PDP_First_Fold|IntermediateScreen', 
            widgetTrackCatg: 'Extended_PDP_PWA',
            widgetTrack: 'Main_CTA',
            widgetTrackPage: 'Call',
            callshowtext: props.translatedTxt ? props.translatedTxt.HEADER_BTN_1 : '',
            page: 'PDP',
            itemName:props.data.productName,
            tscode:props.data["tsCode"]?props.data["tsCode"]:'',
            eventAction:props.data.companyContactVal=="PNS"?'Clicked-PNS':"Clicked-NonPNS",        
            eventLabel: "IntermediatePDPScreen"
        }

         
        // let chatWithSellerFormData = {
        //     PC_ITEM_DISPLAY_ID : props.data.displayId+"",
        //     PC_ITEM_DISPLAY_NAME : props.data.productName,
        //     IS_PROD_SERV : '',
        //     GLUSR_USR_ID: props.data.glid,
        //     BRD_MCAT_ID : props.data.productMcatId,
        //     GLUSR_USR_FIRSTNAME : props.data.companyName,
        //     COMPANYNAME : props.data.companyName,
        //     CITY : props.data.city,
        //     PC_ITEM_IMG_SMALL : props.data.imgUrl,

        // }
        
        // props.data.companyContactVal=="PNS"?chatWithSellerFormData['MOBILE_PNS'] = props.data.companyContactNo:chatWithSellerFormData['MOBILE'] = props.data.companyContactNo
 
        
        let priceofProduct =  props.data.standardPrice?props.data.standardPrice.split('/'):'';
        // let isOneTap=(checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1));

        view = <div id="pdpFirstFold" className="fadeIn PDPContainer promptHandlingClass">
        <div className="bgw">
            <div>
                <div id={divID} className="bgw bxtlrd10 bxtrrd10 oh tc" style="height: 330px; display: flex; align-items: center;">
                    <img id={imgID} className="db ma" src={props.data.imgUrl?props.data.imgUrl:''} alt="1121 XXL White Raw Basmati Rice" onLoad={()=>{isImageVisible();}} style={{maxHeight:"inherit", width:"360px", maxWidth:"inherit", top :"0px", opacity:"0.8" }}/> 
                    {/* {imgD} */}
                    </div>
                    </div>
                    </div>
                <div id={pdpID}>
                    </div>
                    <section id="attachedN" className="por negativeMargin zIn100" style={{height:"133px"}}>
                        <div className="db pd10 bgw poa boxEffect" id="fixProdName">
                            <section className="bgw db crx t_tc prdNmTruncateOnZoom">
                                <h1 className="fw fs18 pdb5 wr">{props.data.productName?props.data.productName:''}</h1>
                                {/* <p className="fs13 pdb5">{props.data.productSecondaryName}</p> */}
                            </section>
                            <p class="clr33 tl fs16 pdb5 fw clrOnZoomView">{ priceofProduct[0]?'₹ ' +priceofProduct[0]:''} { priceofProduct[1]?' / ' + priceofProduct[1]:''}</p>
                            <p id="CmpnyId8432383130" className="fs13 pdb10 clr5a mt2">by: {props.data.companyName?props.data.companyName:''}, {props.data.cityOrigin?props.data.cityOrigin:''}</p>
                        <div className="tc crx">
                        <span onClick={()=>{window.clickedOnCallNow=true}}> <CallBtn1
                key={callProps.CONTACT_NUMBER}
                callText={callProps.call_txt}
                eventAction={callProps.eventAction}
                eventLabel={callProps.eventLabel}
                id={'PDPCall'+callProps.itemId}
                displayPopup={() => {
                callNowClick("कॉल करें",
                callProps.itemImage.replace(/^http:\/\//i, 'https://'),callProps.tscode, callProps.compname,
                    callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                    callProps.itemId, callProps.itemName,callProps.mcatid,callProps.mcatname,callProps.dbpagetrack)
                }} pageName={"PDP"} /></span> 
                <div>{constructEnquiryButton()}
                                       </div>
                                        

                                            </div></div></section>
                                    <div id="topCheckN"></div>

        
                                    {/* {props.data.prd_isq && props.data.prd_isq.length>0 ?  <section class="w100 mt3 por">
            <div id="blakbg" class="blakbg" style="display: none;">
            </div>
            <div id="pdpDetail" class="animated pdpDetails clrlft mb10  tl bgw bxsdw">
            <div id="crossPrd" class="poa tp0 rt0 pd15" style="display: none;">
            <i class="wh15 dib bgNorepeat closeArrowSvg"> </i>
            </div>
            <p class="db fs15 fwn clrb fw pd10 brdb ">Product Description</p>
            <div class="fs15 color7 ta_l B3" id="pdpDetail_box">
            <div id="prodDesc" class="  animated" style="height: 125px; overflow: hidden;">
            <div id="prod_desc1" class="fs15">
           {isqLoop(props.data.prd_isq)}     
      </div>
 
                  </div>
                  </div> 
                  </div>
            </section> : ''} */}
                            </div>
    }
    let EnquiryView = enqView;
    return(
        <>
        {view}
        {showEnqPopup ? <EnquiryView closePopup={switchOffEnq} prop={EnquiryFormData} />:""}
        </>
    );

}

export default TransitionMCATPDP;