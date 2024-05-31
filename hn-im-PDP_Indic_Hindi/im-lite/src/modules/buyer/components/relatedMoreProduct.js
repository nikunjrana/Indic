import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import { setCookie, getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
import { Link } from 'react-router';
import { service_link } from '../../../Globals/MainFunctions';
import "../css/relatedMoreProductCss.css";
import { CallBtn4 } from '../../CallNow/views/CallBtn4';
import { CallNowBtn } from '../../CallNow/views/CallBtn7';
import { formatINRPrice } from '../../../Globals/priceModification';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { pns_prefix } from '../../../Globals/pnsModification';
class RelatedMoreProducts extends Component {

  constructor(props) {
    super(props);
    var self = this;
    this.glid = getCookieValByKey('ImeshVisitor', 'glid');
    this.callApi = this.callApi.bind(this);
    this.callUntillDefined = this.callUntillDefined.bind(this);
    this.callEnqForm = this.callEnqForm.bind(this);
    this.firePDPTracking = this.firePDPTracking.bind(this);
    this.addslashes = this.addslashes.bind(this);
    this.isFullLogin=checkUserStatus()==2?true:false;
    this.refText=window && window.pageName && window.pageName=="PDP"?"OneTapPDP":"OneTapCompany"
    this.checkForNameAndCity=getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn') && (getCookieValByKey('ImeshVisitor', 'usts') != 1)
  }

  componentDidMount() {
    this.props.updatestate();
    this.callApi();
  }
  callApi() {
    let DISPLAY_ID = this.props.id;
    let MCAT_ID = this.props.mcatId;
    let CITY_ID = this.props.cityId;
    let COUNT = '6';
    if(MCAT_ID && !isNaN(MCAT_ID)) {
    this
      .props
      .getmorerelatedproducts(MCAT_ID, CITY_ID, COUNT, DISPLAY_ID);
    }
  }
  
  modifyImgSrc(image) {
    if (typeof image != "undefined" && image != 'no_image' && image != '') {
        image = image.replace(/^http:\/\//i, 'https://');
        image = image.replace('imghost.indiamart.com', '1.imimg.com');
        image = image.replace('imghost1.indiamart.com', '2.imimg.com');
        return image;
    }
  }

  callUntillDefined(mcatid, eDISPLAY_ID, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, prcReq) {
    var enqDivId = prcReq ? 'dispid' + eDISPLAY_ID + 'pr' : 'dispid' + eDISPLAY_ID;
    var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    var disableBtn = prcReq ? disableEnqBtn2 : disableEnqBtn;
    let IS_PROD_SERV = this.props.isProdServ;
    let modreftype = 2;
    let query = "did=" + DISPLAY_ID + "&ctg=&ss=&locality=&modreftype=" + modreftype;
    let query_text = 'product_detail_more_prod_from_same_PWA|' + IS_PROD_SERV + '|' + langSelection;

    callUntillDefined('showEnquiryForm', 0, 50, [
      {
        'enq_mcat_id': mcatid,
        'enquiryDivId': enqDivId,
        'enq_sent_color': disableBtn,
        'enq_item_price': PRICE,
        'query': query,
        'query_text': query_text,
        'company': COMPANYNAME,
        'formType': 'overlay',
        'R_glusr_id': GLUSR_ID,
        'R_custtype_weight': '',
        'R_title': ITEM_NAME,
        'enqConv': 'on',
        'int_rec': '1',
        'modid': 'IMOB',
        'displayId': DISPLAY_ID,
        'traffic_source': ''
      }
    ]);
  }

  callEnqForm(mcatid, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, imgurl, ctaName, cat_ID, callProps) {
    let modreftype = '3';
    let query = "did=" + DISPLAY_ID + "&ctg=&ss=&locality=&modreftype=" + modreftype;
    let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    let query_text = (this.props.pageName) == "PDP" ? "IMOB_PDP_More-Products-from-this-seller|" + langSelection + this.props.track :'';

    let data = {};
    data.isEnquiry = true;
    data.productName = ITEM_NAME;
    data.page = window.pageName ? window.pageName : "";
    data.receiverUserId = GLUSR_ID;
    data.mcatId = mcatid;
    data.queryText = query_text;
    data.displayId = DISPLAY_ID + '';
    data.productImage = imgurl ? imgurl : 'https=//m.imimg.com/gifs/img/prod-img.png';
    data.companyName = COMPANYNAME;
    data.ctaName = ctaName;
    data.affiliationId = "-1";
    data.catid = cat_ID;
    data.modid = 'IMOB';
    data.query = query;
    data.enq_item_price = PRICE ? PRICE : '';
    data.eventLabel = callProps.eventLabel;
    data.contactNumber = callProps.CONTACT_NUMBER;
    data.contactType = callProps.CONTACT_TYPE;
    data.glusrID = callProps.glusrid;
    data.itemId = callProps.itemId;
    data.itemName = callProps.itemName;
    data.mcatname = callProps.mcatname;
    data.dbpagetrack = callProps.dbpagetrack;
    data.custtypeWeight = callProps.custtypeWeight;
    data.tsCode = callProps.tscode;
    data.callTxt = callProps.call_txt;
    data.query_ref_id = callProps.query_ref_id;
    data.query_ref_type = callProps.query_ref_type;
    data.query_ref_id = callProps.query_ref_id;
    data.modrefid = callProps.modrefid;
    data.internaltrack = this.props.track;
    data.modrefname = callProps.modrefname;
    data.widgetType = "Listing";
    data.pdpModrefType = modreftype;
    this.props.showModal(data);
  }
  firePDPTracking(category, action, label) {
    if (window.pageName && window.pageName == "PDP") {
      let loginModeArray1 = ["Unidentified", "Identified", "FullyIdentified"]
      let loginModeArray2=["Unidentified","Identified","Full-Login"]
      let status = checkUserStatus();
      action += '|'+ loginModeArray1[status];
      label += '|EnquiryCTA|PDP|' + loginModeArray1[status]
      eventTracking("EnquiryCTA/"+loginModeArray2[status],"PDP/"+"More-Products/","",true);
    }
    eventTracking(category, action, label, true);
  }
  checkEnquirySentRelated(dispId) {
    let lsData = JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
      localStorage.removeItem("imEqGl");
      lsData = "";
    }
    var e = lsData ? lsData['displayId'] : "undef";
    if (e) {
      var dispIds = e.split(",");
      return dispIds.includes(dispId + '');
    }
    else
      return false;
  }
  addslashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
  }


  render() {
    let eventCategory=this.props.eventCategory && this.props.eventCategory?this.props.eventCategory:"PWA_Product_Detail";
    let listitems = '';
    let listitemsData = '';
    var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    let host_link = 'https://m.indiamart.com/proddetail.php?i=';
    let viewAllProducts = '';
    let relatedProductList = '';
    let res = this.props.get_more_relatedproducts;
    let IS_PROD_SERV = this.props.isProdServ;

    let GLUSR_ID = this.props.glusrid
      ? this.props.glusrid
      : ' ';
    let num = this.props.num
      ? this.props.num
      : ' ';
    let numtype = this.props.numtype;
    let response_data = '';
    let COMPANYNAME = this.props.companyname
      ? this.props.companyname
      : ' ';
    let Companylink = this.props.companylink
      ? this.props.companylink
      : ' ';

      let callGBPCTA = '';
      let callNowBtn = '';

    // Loogic starts here
    if ((res != undefined) && this.props.get_more_relatedproducts.hasOwnProperty(['Data'])) {
      listitemsData = this.props.get_more_relatedproducts['Data']['0'];
      // console.log(listitemsData.RELATED_PRODUCTS,'=========listitemsData.RELATED_PRODUCTS=======')

      if (listitemsData && listitemsData != undefined) {
        listitems = this.props.get_more_relatedproducts['Data']['0']['RELATED_PRODUCTS'];

        if (listitems && listitems != undefined) {
          let head = this.props.translatedText ? this.props.translatedText.WID_RECOM_HEADING8 : "Also deals in";
          let headHtml = this.props.notShowHead?<p id="isAbt" class="  pd10 fw fs17 mxht1000  mt10 ">से अधिक उत्पाद {this.props.companyname?this.props.companyname:'this seller'}</p>:<p className="fs22 fwn clrb pl10 pr5 pdb5">{head}</p>;
          listitems = listitems.map((items, index) => { //Loop starts here for view

            let price = items.FOB_PRICE ? items.PRICE_SEO ? items.PRICE_SEO : '₹ '  + formatINRPrice(items.FOB_PRICE)  + (items.PC_ITEM_MOQ_UNIT_TYPE? ' / ' + items.PC_ITEM_MOQ_UNIT_TYPE:'') :'';
            let mcatname = items.PC_ITEM_NAME;
            let itemId = (items.PC_ITEM_DISPLAY_ID)
              ? items.PC_ITEM_DISPLAY_ID
              : items.PC_ITEM_ID;
            let host_link = service_link(mcatname, itemId);        
            if (price && price != '') {  
             var PRICEshow = <Link
                onClick={() => {
                  window.__TransitionData__ = null;
                  window.clickedFromRelatedProduct = true;
                  eventTracking(eventCategory,'More_product_from_same_seller', 'Price_clicked' + index, true);
                }}
                to={host_link}
                className="db pdl5 pdr5 wr fw ht35 whNr clrBl notranslate">
                 {price}
              </Link>;
              
            } else {
              var PRICEshow = '';
              if (this.props.pageName == "PDP") {
                PRICEshow = <i className="db pdl5 pdr5 wr ht35 whNr clr99">Get Latest Price</i>
              } else {
                PRICEshow = <i
                  onClick={(e) => {
                    if (e.target.innerHTML !== "Enquiry Sent") {
                      this.callUntillDefined(items.BRD_MCAT_ID, itemId, items.FOB_PRICE, COMPANYNAME, GLUSR_ID, mcatname, itemId, 1);
                    };
                    eventTracking(eventCategory, 'More_product_from_same_seller', 'Price_on_request' + index, true);
                  }}
                  className="db pdl5 pdr5 wr ht35 whNr clrBl">
                  लेटेस्ट रेट पाएं
                </i>;
              }
            }


            let imgurl = (items.PC_ITEM_IMG_SMALL)
              ? items.PC_ITEM_IMG_SMALL
              : (items.image)
                ? items.image
                : "https://m.imimg.com/gifs/background_image.jpg";
            imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
            imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
            imgurl = imgurl.replace('http://', 'https://');
            
            let evntAction='';
            let glid = getCookieValByKey("ImeshVisitor","glid");
            let multi_purpose = localStorage.getItem("multi_purpose") ? JSON.parse(localStorage.getItem("multi_purpose")) : "";
            (this.props.pageName =='PDP')? evntAction= 'Also-Deals-In': evntAction='More-products-from-this-seller'; 

            
            //Call / Enq CTA code starts
            let ctaName = '';
            let callProps = '';
            let cat_ID = items && items.CAT_ID ? items.CAT_ID : this.props.cat_ID ? this.props.cat_ID : '';
            let isItemName = items && items.PC_ITEM_DISPLAY_NAME ? items.PC_ITEM_DISPLAY_NAME : items.PC_ITEM_NAME ? items.PC_ITEM_NAME : this.props.callProps.itemName;

            if(this.props.callProps)
            {

              callProps = {
                CONTACT_NUMBER: this.props.callProps.CONTACT_NUMBER,
                glusrid: this.props.callProps.GLUSR_ID,
                CONTACT_TYPE: this.props.callProps.CONTACT_TYPE,
                call_txt: this.props.callProps.call_txt,
                itemId: itemId,
                mcatid: items.BRD_MCAT_ID,
                mcatname: mcatname,
                translatedText: this.props.translatedText,
                compname: COMPANYNAME,
                pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '',
                widgetTrackCatg: 'Product-Page-Clicks',
                widgetTrack: 'IMOB_PDP_More-Products-from-this-seller',
                widgetTrackPage: 'Call-Now-' + (index + 1),
                dbpagetrack: 'IMOB_PDP_More-Products-from-this-seller',
                itemName: isItemName,
                eventAction: this.props.callProps.CONTACT_TYPE == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS",
                query_ref_id: items.BRD_MCAT_ID,
                query_ref_type: mcatname,
                modrefid: itemId,
                modrefname: isItemName,
                eventLabel: 'IMOB_PDP_More-Products-from-this-seller_' + (index + 1),
                tscode: this.props.callProps.tscode ? this.props.callProps.tscode : "",
              };
            }
            

            if (this.props.pageName == 'PDP') {
              callNowBtn = this.props.callProps && this.checkEnquirySentRelated(itemId) ? <CallNowBtn
                key={this.props.callProps.CONTACT_NUMBER}
                callText={this.props.callProps.call_txt}
                callclick={this.props.callProps.callclick}
                eventAction={this.props.callProps.eventAction}
                eventLabel={"PDP_AlsoDealsIn"}
                displayPopup={() => {
                  this.props.callNowClick("कॉल करें",
                    this.props.callProps.itemImage.replace(/^http:\/\//i, 'https://'), this.props.callProps.tscode, this.props.callProps.compname,
                    this.props.callProps.CONTACT_NUMBER, this.props.callProps.CONTACT_TYPE, this.props.callProps.glusrid,
                    this.props.callProps.itemId, this.props.callProps.itemName, this.props.callProps.mcatid, this.props.callProps.mcatname, dbpagetrack, this.props.callProps.PAID_TYPE,this.props.showRatingFeedback,this.props.setRatingInfo);
                }}
                companyContactNo={this.props.callProps.CONTACT_NUMBER}
              /> : ""
            }

            if (this.props.pageName == 'PDP') {
              ctaName = this.props.cta_name;
              callGBPCTA = this.props.pdpdata && this.props.showEcom ? "" :
                this.checkEnquirySentRelated(itemId) ? "" :
                  <span
                    id={"dispid" + itemId}
                    className="bdrmim bgmim pd10 db clrw fs14 bxsdw bxrd20 mt10 mr5 ml5 fw"
                    onClick={(e) => {
                      if (e.target.innerHTML !== "Enquiry Sent") {
                        requestAnimationFrame(() => setTimeout(() => {
                          this.checkEnquirySentRelated(itemId);
                          this.callEnqForm(items.BRD_MCAT_ID, items.PRICE_F, this.props.callProps.compname, this.props.callProps.glusrid, this.addslashes(isItemName), items.PC_ITEM_DISPLAY_ID, imgurl, ctaName, cat_ID, callProps);
                        }, 0));
                      };
                      this.firePDPTracking('Product-Page-Clicks', 'More-Products-from-this-seller', 'Get-Best-Price-' + (index + 1))
                    }}>
                    <i className="enqIcnGreen dib vam mr5"></i>
                    {this.props.translatedText != undefined ? this.props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}
                  </span>
            }
            //Call / Enq CTA code ends

            response_data = <div className="pdb10 pdt10">
               {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link
                onClick={() => {
                  window.__TransitionData__ = null;
                  window.clickedFromRelatedProduct = true;
                  eventTracking('Product-Page-Clicks', evntAction , 'image-' + index, true);
                }}
                to={host_link}
                index={index}
                className="dib ht125px w125p ma oh">
                <div className="dtc w125p ht125px vam">
                  <img className="favImg" loading="lazy" src={imgurl} alt={mcatname} />
                </div>
              </Link> :   <a
                onClick={(event) => {
                  window.location.href=(host_link);
                  setCookie("ImageData",this.modifyImgSrc(imgurl));
                  window.__TransitionData__ = null;
                  window.clickedFromRelatedProduct = true;
                  eventTracking('Product-Page-Clicks', evntAction , 'image-' + index, true);
                  event.preventDefault();
                }}
                href={host_link}
                index={index}
                className="dib ht125px w125p ma oh">
                <div className="dtc w125p ht125px vam">
                  <img className="favImg" loading="lazy" src={imgurl} alt={mcatname} />
                </div>
              </a>}
              
              {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link
                onClick={() => {
                  window.__TransitionData__ = null;
                  window.clickedFromRelatedProduct = true;
                  eventTracking(eventCategory, 'More_product_from_same_seller', 'Product_name_clicked' + index, true)
                }}
                to={host_link}
                className="db clrb pdl5 pdr5 mt10 mb10 wr ht35 whNr lh18 oh fadElip por">
               {mcatname}
              </Link> :
              <a
                onClick={(event) => {
                  window.location.href=(host_link);
                  setCookie("ImageData",this.modifyImgSrc(imgurl));
                  window.__TransitionData__ = null;
                  window.clickedFromRelatedProduct = true;
                  eventTracking(eventCategory, 'More_product_from_same_seller', 'Product_name_clicked' + index, true)
                  event.preventDefault();
                }}
                href={host_link}
                className="db clrb pdl5 pdr5 mt10 mb10 wr ht35 whNr lh18 oh fadElip por">
               {mcatname}
              </a>}
              {PRICEshow}

              {callNowBtn} {callGBPCTA}
            </div>;


             if(this.props.pageName !='PDP'){ 
            viewAllProducts = <li className="tc crx vam" style="width:40%">
              <Link
                onClick={() => {
                  eventTracking(eventCategory, 'More_product_from_same_seller', 'View_more', true);
                }}
                to={Companylink}
                className="dtc vam">
                <div
                  className="bgw bxrd100 por bxsh15 vam"
                  style="width:56px;height:56px;margin:0 auto;">
                  <span className="poa cntr" style="width:24px;height:24px;">
                    <svg fill="#4285f4" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                    </svg>
                  </span>
                </div>
                <div className="mt10 clr5a CM_LABEL12"><span className="CM_LABEL12">{this.props.translatedText ? this.props.translatedText.CM_LABEL12 : "View All"}</span></div>
              </Link>
            </li>;
             }

            return (
              <li className="tc crx  mr10 bgw mt5" >
                {response_data}
              </li>
            )
          });
          //Loop ends up here
          let dbpagetrack =  "IMOB_PDP_Catalog_Info|AlsoDealsIn";
          dbpagetrack+=(this.props.track ? this.props.track : "")
          relatedProductList = <section className="w100 mt10 por btmtop "> <div className='dflex jstyfyCenter algnCenter mt5'>
            {headHtml} 
            {this.props.callProps ? <CallBtn4 
                    key={this.props.callProps.CONTACT_NUMBER}
                    abtest={true}
                    callText={this.props.callProps.call_txt}
                    callclick={this.props.callProps.callclick}
                    eventAction={this.props.callProps.eventAction}
                    callVerticallyAlign={true}
                    eventLabel={"PDP_AlsoDealsIn"}
                    displayPopup={() => {
                         this.props.callNowClick("कॉल करें",
                            this.props.callProps.itemImage.replace(/^http:\/\//i, 'https://'), this.props.callProps.tscode, this.props.callProps.compname,
                            this.props.callProps.CONTACT_NUMBER, this.props.callProps.CONTACT_TYPE, this.props.callProps.glusrid,
                            this.props.callProps.itemId, this.props.callProps.itemName, this.props.callProps.mcatid, this.props.callProps.mcatname, dbpagetrack, this.props.callProps.PAID_TYPE,this.props.showRatingFeedback,this.props.setRatingInfo);
                    }}
                    isAnimated={true}
                    isButtonDisabled={true}
                    companyContactNo={this.props.callProps.CONTACT_NUMBER}
                />:""}</div>
            <div id='also_deals'  className="top_indus1 pl10 pr10 pdt5 pdb5 scrbrH">
              <ul>
                {listitems}
                {/* {this.props.pageName != 'PDP' ? viewAllProducts : ''} */}
              </ul>
            </div>
          </section>;
        }
      }
    }

    return (
      <div>
        {relatedProductList}
      </div>
    )
  }

}
export default RelatedMoreProducts;