import React from "react";
import { eventTracking } from "../../../../../Globals/GaTracking";
import styles from "../../../../../Globals/imageCss";
import { Link } from "react-router";
import { CallBtn2 } from "../../../../CallNow/views/CallBtn2";
import { setCookie, getCookieValByKey } from "../../../../../Globals/CookieManager";
import { checkUserMode,checkUserStatus } from "../../../../../Globals/MainFunctions";
import { removalTextNodes } from "../../../../../Globals/translatorPreact/translatorPatch";
import { convertIndianNumericFormatToNumeric, getPrice } from '../../../../../Globals/priceModification';
const loginModes = {
  0: "Unidentified",
  1: "Identified",
  2: "Full-Login",
  3: "Unidentified-Existing",
};
export default class RPMcatCompanyView extends React.Component {
  constructor(props) {
    super(props);
    this.viewMoreHandler = this.viewMoreHandler.bind(this);
    this.mcatClickHandler = this.mcatClickHandler.bind(this);
    this.listmcats = this.listmcats.bind(this);
    this.state = {
      viewMoreClicked: false,
      mcatClicked:-1
    };
    this.checkEnquirySent=this.checkEnquirySent.bind(this);  
    this.ctaTracking=this.ctaTracking.bind(this);
    this.cABTest = '';
    this.isFilterAbTest = ((!getCookieValByKey('googtrans'))&&(this.props.page&&this.props.page.toLowerCase().includes("search")))? true : false;
    this.page=this.props.page&&this.props.page.toLowerCase().includes("search")?"SEARCH":this.props.page.toLowerCase().includes("generic-impcat")?"IMPCAT":this.props.page;
    this.isFullLogin = checkUserStatus() === 2;
  }
  componentDidUpdate() {
    removalTextNodes();}
  checkEnquirySent(dispId) {
    let lsData=JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
        localStorage.removeItem("imEqGl");
        lsData="";
    }
    var e = lsData ? lsData['displayId'] : "undef";
    e += "";
    if (e) {
        //e = decodeURIComponent(e);
        var dispIds = e.split(",");
        return dispIds.includes(dispId+'');
    }
    else
        return false;
}
ctaTracking(){
  let page1=this.props && this.props.page?this.props.page=='product-detail'?'PDP':this.props.page.toLowerCase().includes("impcat")?"Mcat":this.props.page.toLowerCase().includes("mini-pdp")?"Mini-PDP":this.props.page:"";
  eventTracking("EnquiryCTA/"+loginModes[checkUserStatus()],page1+"/"+"Recommended-Products/","",true)
}
modifyImgSrc(image) {
  if (typeof image != "undefined" && image != 'no_image' && image != '') {
      image = image.replace(/^http:\/\//i, 'https://');
      image = image.replace('imghost.indiamart.com', '1.imimg.com');
      image = image.replace('imghost1.indiamart.com', '2.imimg.com');
      return image;
  }
}
  listItems(props, mcatClicked = -1, start = 0, length = 10) {
    
    let data = props.data.slice(start, length + start);
    data = mcatClicked == -1 ? data : data.filter(item => item.mcatid==mcatClicked);
    data = data.length > 10 ? data.slice(0,10) : (data.length%2 == 0 || data.length == 1) ? data : data.slice(0, -1);
    let enqSent = false;
    return data.map((items, index) => {
      let TransitionPDP = {
        displayId : items.display_id,
        productName :items.name,
        glid :items.R_glusr_id,
        productMcatId :items.mcatid,
        imgUrl : items.image,
        companyName :items.company_name,
        city :items.city_name,
        price :items.price,
        price_seo:items.price_seo,
        companyContactNo : items.contactnumber,
        companyContactVal :  'PNS',
        catFlname : items.mcatName,
        unit :items.unit,
        cityOrigin : items.city_name,
        standardPrice : items.price_f?items.price_f.replace(/₹/g, ""):'',
        prd_isq : [],
        extraPrdName : items.name
       }
       const oneTapData = {
        GLUSR_USR_ID:items.R_glusr_id,
        MOBILE_PNS:items.contactnumber_type?items.contactnumber_type == 'PNS'? items.contactnumber:'':'',
        MOBILE:items.contactnumber_type?items.contactnumber_type == 'MOBILE'?items.contactnumber:'':'',
        PHONE:items.contactnumber_type?items.contactnumber_type == 'PHONE'?items.contactnumber_type:'':'',
        PC_ITEM_DISPLAY_ID:items.display_id?items.display_id + '':'',
        PC_ITEM_IMG_SMALL:items.image?items.image:items.IMAGE_250X250?items.IMAGE_250X250:'',
        COMPANYNAME:items.company_name?items.company_name:'',
        CITY:items.city_name?items.city_name:'',
        PC_ITEM_DISPLAY_NAME:items.name?items.name:'',
        GLUSR_USR_FIRSTNAME:getCookieValByKey('ImeshVisitor', 'fn'),
        BRD_MCAT_ID:items.mcatid?items.mcatid:'',
        MOBILE_VERIFIED: 1,
        isCompany:true
      }
      index += start + 1; 
      let prodPosition = "|pos_" + index;
      let imageUrl = items.image_250x250?items.image_250x250:items.image;
      this.checkEnquirySent(items.display_id)? enqSent = true:enqSent = false;
      const postEnqCta = enqSent  ? 'callonly' : '';
      let glid=getCookieValByKey('ImeshVisitor', 'glid');
      let oddGlid = glid % 2 == 1;
      let glLastDigit= glid && glid[glid.length-1]?glid[glid.length-1]:'';
      let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
      return (
        <li className=" w50 bdrBA   ">
            <div className={`por  tc  bgw pdl5 pdr5   pdb5 pdt8 `}>
            {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link className=" vam oh flx centerItems h160px" alt={items.name} to={items.url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} onClick={() => {
              window.__TransitionData__ = TransitionPDP;
              eventTracking(`${this.props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + "cta_click_prdimage", "IMOB_" + props.page + prodPosition, true);
            }
            }>
              {this.props.page && this.props.page.includes("mini-pdp") ?
                <img loading="lazy" className=" objctFitSclDown w160px h160px" alt={items.name} src={imageUrl}></img>
                :
                <div className="oh flx centerItems bgimg">
                  <img loading="lazy" className=" objctFitSclDown w160px h160px" alt={items.name} src={imageUrl}></img>
                </div>}
            </Link> :
              <a className=" vam oh flx centerItems h160px" alt={items.name} href={items.url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} onClick={(event) => {
                window.location.href=(items.url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : ""))
                window.__TransitionData__ = TransitionPDP;
                setCookie("ImageData",this.modifyImgSrc(window.__TransitionData__.imgUrl));
                eventTracking(`${this.props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + "cta_click_prdimage", "IMOB_" + props.page + prodPosition, true);
                event.preventDefault();
              }
              }>
                {this.props.page && this.props.page.includes("mini-pdp") ?
                  <img loading="lazy" className=" objctFitSclDown w160px h160px" alt={items.name} src={imageUrl}></img>
                  :
                  <div className="oh flx centerItems bgimg">
                    <img loading="lazy" className=" objctFitSclDown w160px h160px" alt={items.name} src={imageUrl}></img>
                  </div>}
              </a>}
            {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link to={items.url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} alt={items.name} onClick={() => {
              window.__TransitionData__ = TransitionPDP;
              eventTracking(`${this.props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + "cta_click_prdname", "IMOB_" + props.page + prodPosition, true);
            }}
              className="tc clrBl db fs15 pdt7 mb7 txtElip">
              {items.name}
            </Link> : <a href={items.url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} alt={items.name} onClick={(event) => {
              window.location.href=(items.url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : ""))
              window.__TransitionData__ = TransitionPDP;
              setCookie("ImageData",this.modifyImgSrc(window.__TransitionData__.imgUrl));
              eventTracking(`${this.props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + "cta_click_prdname", "IMOB_" + props.page + prodPosition, true);
              event.preventDefault();
            }}
              className="tc clrBl db fs15 pdt7 mb7 txtElip">
              {items.name}
            </a>}
            {this.priceData(props, items, index,enqSent)}
            <p className="tc fs12 pdt5 clr7B  mt4 mb5">
              {/* Sold by
              <br /> */}
              {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link to={items.website_url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate " onClick={() => {
                eventTracking(`${this.props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + "cta_click_cmpny_nme", "IMOB_" + props.page + prodPosition, true);
              }}>
                {items.company_name}
              </Link> : <a href={items.website_url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate " onClick={(event) => {
                window.location.href=(items.website_url + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : ""));
                eventTracking(`${this.props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + "cta_click_cmpny_nme", "IMOB_" + props.page + prodPosition, true);
                event.preventDefault();
              }}>
                {items.company_name}
              </a>}
            </p>
            <span className={"clr7B por tc tc fs12  clr7B txtElip db"}>
                    <i  className={this.props.page && this.props.page.toLowerCase().includes("company")? "locIconPer wh13_13 dib clr7B mr5": this.props.page && this.props.page.toLowerCase().includes("impcat")? "mr3 locIconPer wh13_12 dib clr7B": "cLocIn wh13_12 dib clr7B"}></i>{items.city_name}
                </span>
            <div className="  tc w100  mt10">
            {items.ecom_flag && items.ecom_landing_url?'':<CallBtn2
              showBoldCta={true}
              filledCallCta = {postEnqCta}
                key={items.contactnumber}
                isABtst={this.props.page ? (this.props.page.toLowerCase().includes("search") ? true : this.props.isABtst) : ''}
                callText={
                  props.translatedText
                    ? props.translatedText.HEADER_BTN_1
                    : "कॉल करें"
                }
                eventAction={
                  items.contactnumber_type == "PNS"
                    ? "Clicked-PNS"+this.cABTest
                    : "Clicked-NonPNS" + this.cABTest
                }
                eventLabel={props.page}
                niHit={props.niHit}
                displayPopup={() => {
                  props.callNowClick(
                    "कॉल करें",
                    items.image,
                    items.tsCode,
                    items.company_name,
                    items.contactnumber,
                    items.contactnumber_type,
                    items.R_glusr_id,
                    items.display_id,
                    items.name,
                    items.mcatid,
                    items.mcatName,
                    props.callTxt +this.cABTest,
                    items.custtypeWeight,
                    "",
                    items.city_name
                  );
                }}
                companyContactNo={items.contactnumber}
              />}
               {
               postEnqCta=='callonly'? <div>{props.translatedText?props.translatedText.ENQ_LABEL:'Enquiry Sent'}</div>
                :items.ecom_flag && items.ecom_landing_url ?  
                <div className={'pdl10 pdr10 minusMrgb6'} id={"dispid" + items.display_id}><a href={items.ecom_landing_url} onClick={() => {(eventTracking(`${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + 'cta_button_buynow' + this.cABTest, 'IMOB_' + props.page+prodPosition, true))}} target="_blank"><button className={`bxrd20 clrw fs14 pdb10 pdt10 bgmim tc w90`}><i className="lockIcon"></i>Buy Now</button></a>{<p className="msg3rdParty tc pdt25">You will be redirected to a 3rd party webstore</p>}</div>: !(this.props.page.toLowerCase().includes("company") && this.isFullLogin) ? <div id={"dispid" + items.display_id} className={`fw dib bxsdw bxrd20 clrw pdt10 pdb10 fs14 w80 ${(this.props.isABtst)|| (this.props.page && this.props.page.toLowerCase().includes("search"))?'bdrmim bgmim ': "appLikeCtaG"}`}
                  onClick={(e) => {
                        if (e.target.innerHTML !== "Enquiry Sent") {
                          {
                          this.ctaTracking()
                          props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, '', items.image, items.tsCode,
                          items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
                           eventTracking(`${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + `cta_button_getquotes|EnquiryCTA|${this.page}|${checkUserMode()}${this.props.unidentified ? this.props.page == "impcat" && glLastDigit%2==0?"|Even":"|Odd":""}` + this.cABTest, 'IMOB_' + props.page+prodPosition, true);
                        }}
                        }}>
                     <i className={`${this.props.isABtst?'enqIcnGreen ':'enqIcn '} dib vam mr2`}></i>
                      {props.translatedText ? props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}
                  </div>
                  :
                  <Link id={"dispid" + items.display_id} className={`fw dib bxsdw bxrd20 clrw pdt10 pdb10 fs14 w80 ${(this.props.isABtst)|| (this.props.page && this.props.page.toLowerCase().includes("search"))?'bdrmim bgmim ': "appLikeCtaG"}`}
                  to={{
                        pathname: '/messages/conversation/?sup_glid=' + btoa(items.R_glusr_id.toString()) + '&ref=' + "OneTapCOMPANY", state: {
                            contactglid: items.R_glusr_id.toString(),
                            pdpUrl: location.pathname,
                            data: oneTapData, pageLang: "", queryRef: "",
                            pageName: this.props.page, isExtended: false, cta_name: "सर्वोत्तम मूल्य प्राप्त करें", btnName: "सर्वोत्तम मूल्य प्राप्त करें", A2HS: false,
                            qDesc:""
                        }
                      }}
                  onClick={(e) => {
                        if (e.target.innerHTML !== "Enquiry Sent") {
                          {
                          this.ctaTracking()
                           eventTracking(`${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + `cta_button_getquotes|EnquiryCTA|${this.page}|${checkUserMode()}${this.props.unidentified ? this.props.page == "impcat" && glLastDigit%2==0?"|Even":"|Odd":""}` + this.cABTest, 'IMOB_' + props.page+prodPosition, true);
                        }}
                        }}>
                     <i className={`${this.props.isABtst?'enqIcnGreen ':'enqIcn '} dib vam mr2`}></i>
                      {props.translatedText ? props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}
                  </Link>
               }
            </div>
          </div>
        </li>
      );
    });
  }

  priceData(props, items, index,enqSent) {
    return (items.price_f || items.price_seo || (items.price && items.currency)) ? (
      <p
        id={"pp" + items.display_id}
        className="clr33 tc fs16 fw txtElip notranslate"
        onClick={(e) => {
          if (!e.target.getAttribute("data-priceClicked") && !enqSent && !items.ecom_flag && !items.ecom_landing_url) {
            eventTracking(
              `${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`,
              props.trck_param + "cta_click_price",
              "IMOB_" + props.page+"|EnquiryCTA|"+this.page+"|"+checkUserMode(),
              true
            );
            props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_CLICKED', items.image, items.tsCode, items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
          }
        }}
      >
        {items.price_seo? items.price_seo:items.price_f? '₹ ' + convertIndianNumericFormatToNumeric(items.price_f):<> <i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>
        {getPrice(parseFloat(items.price), "", items.unit)} </>  }
      </p>
    ) : (
      enqSent?<p className="clrBlack tc fs16 fw txtElip">Price Requested</p>:<p
        id={"prcid" + items.display_id + "pr"}
        className="clrBl tc fs16 fw txtElip"
        onClick={(e) => {
          if (e.target.innerHTML !== "Price Requested" && !items.ecom_flag && !items.ecom_landing_url) {
            eventTracking(
              `${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`,
              props.trck_param + `cta_click_price_request|EnquiryCTA|${this.page}|${checkUserMode()}`,
              "IMOB_" + props.page,
              true
            );
            props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_REQUESTED', items.image,items.tsCode, items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
          }
        }}
      >
        लेटेस्ट रेट पाएं
      </p>
    );
  }
  viewMoreHandler(props) {
    eventTracking(
      `${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`,
      props.trck_param + "View-More",
      "IMOB_" + props.page,
      true
    );

    this.setState({ viewMoreClicked: true });
  }
  mcatClickHandler(props,mcatid,index) {
    this.setState({ mcatClicked: mcatid,
                    viewMoreClicked: false
                   });
    eventTracking(`${this.props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + `${mcatid==-1?`cta_click_chip | All`:`cta_click_chip | ${index}`}`, 'IMOB_' + props.page, true);
   
}
  listmcats(data) {
  return data.map((it,ix) => {
      return(
              <li className= {`bxrd20 dib fs14 fw lht35 ml4 mr5 pdl10 pdr10 ${this.state.mcatClicked==it.mcatid?'bgmim clrw':'bgclrw bdrg'}`} onClick={() =>this.mcatClickHandler(this.props,it.mcatid,ix)}>{it.name}</li>
       )
      }
  )
}

  render() {
    removalTextNodes();
    let lenEveOdd = this.props.data.length % 2 == 0 ? this.props.data.length-10 : this.props.data.length-11;
    return (
      <div id="prodsViewedSection" className={`oh mt10 `}>
        <div className={`fs17 fw clr11 pdt15 pdb15 pdl15 por bgw   `}>{this.props.head}</div>
        {this.isFilterAbTest && this.props.mcatData && this.props.mcatData.length > 1? 
            <ul className='scWrap pl5 pdt7 pdb10'>
            {<li className={`w15 bxrd20 dib fs14 fw lht35 ml4 mr5 pdl5 pdr5 tc ${this.state.mcatClicked==-1?'bgmim clrw':'bgclrw bdrg'}`} onClick={() =>this.mcatClickHandler(this.props,-1)}>All</li>}
            {this.listmcats(this.props.mcatData)}
            </ul>
            :''}
        <ul className="flx flwr ">
          {this.isFilterAbTest  ? this.state.mcatClicked==-1 ? this.listItems(this.props) : this.listItems(this.props,this.state.mcatClicked,0,this.props.lslength + this.props.data.length) : this.listItems(this.props)}
          {this.state.viewMoreClicked ? this.listItems(this.props,this.state.mcatClicked, 10, lenEveOdd) : ""}
        </ul>
        {this.state.mcatClicked==-1 && !this.state.viewMoreClicked &&
        this.props.data &&
        this.props.data.length > 10 ? (
          <div class={'bxshdw04 pd10 clrBl tc fs15 bgw  '} id="viewmore_pv" onClick={() => this.viewMoreHandler(this.props)}>                
            <span class="CM_LABEL16">View More आपके लिए प्रोडक्ट्स</span>
            {/* <span class="fr fs16 mr10 vam fw clr5a">&gt;</span> */}
        </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
