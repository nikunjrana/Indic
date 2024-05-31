import React from 'react';
import { eventTracking } from '../../../../../Globals/GaTracking';
import styles from "../../../../../Globals/imageCss";
import { Link } from 'react-router';
import { CallBtn2 } from '../../../../CallNow/views/CallBtn2';
import {setCookie,getCookieValByKey} from '../../../../../Globals/CookieManager';
import { prevname } from '../../../../../Globals/GaTracking';
import '../../css/diffView.css'
import { checkUserMode,checkUserStatus } from '../../../../../Globals/MainFunctions';
import {removalTextNodes} from '../../../../../Globals/translatorPreact/translatorPatch';
import { modifyImgSrc } from '../../../../ProductDetail/utility/Carousel/helper';
import { convertIndianNumericFormatToNumeric, getPrice } from '../../../../../Globals/priceModification';
const loginModes = {
    0: "Unidentified",
    1: "Identified",
    2: "Full-Login",
    3: "Unidentified-Existing",
  };
export default class RPHomeView extends React.Component {
    constructor(props) {
        super(props);
        this.viewMoreHandler = this.viewMoreHandler.bind(this);
        this.checkEnquirySent = this.checkEnquirySent.bind(this);
        this.mcatClickHandler = this.mcatClickHandler.bind(this);
        this.listmcats = this.listmcats.bind(this);
        this.lastgadigit = this.props.gaLastDigit1;
        this.state = {
            viewMoreClicked: false,
            mcatClicked:-1
        }
        //this.startTime=performance.now();
        this.startTime=new Date().getTime();
        this.isFilterAbTest = getCookieValByKey('googtrans')? false : true;
        this.glid=getCookieValByKey('ImeshVisitor', 'glid');

    }

    checkEnquirySent(dispId) {
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



        
    listItems(props, mcatClicked = -1,  start = 0, length = 10) {
    

         let data = props.data.slice(start, length + start);
         data = mcatClicked == -1 ? data : data.filter(item => item.mcatid==mcatClicked);
         data = data.length > 10 ? data.slice(0,10) : (data.length%2 == 0 || data.length == 1) ? data : data.slice(0, -1);
         let enqSent = false;
        return data.map((items, index) => {
            let TransitionPDP = {
                displayId :  items.display_id,
                productName : items.name,
                glid : items.R_glusr_id,
                productMcatId :items.mcatid,
                imgUrl : items.image_250x250,
                companyName : items.company_name,
                city : items.city_name,
                price :items.price,
                price_seo:items.price_seo,
                companyContactNo : items.contactnumber,
                companyContactVal :  'PNS',
                catFlname : items.GLCAT_MCAT_FLNAME,
                unit :items.unit,
                 cityOrigin : items.city_name,
                 standardPrice : items.price_f?items.price_f.replace(/₹/g, ""):'',
                 extraPrdName : items.name,
                 ecom_landing_url:items.ecom_landing_url,
                 ecom_store_name:'SHOPIFY'
                
            }
    // let urlType = pdpData && pdpData.URL_TYPE ? pdpData.URL_TYPE.toLowerCase() : '';
    let cData = {
    //   COMPANY_LOGO: props.data.product.company_logo,
      // CATAGORY_ID: pdpData.CAT_ID,
      CONTACTNO: items.contactnumber,
      CONTACTTYPE: items.contactnumber_type,
      CONTACTORG: items.contactnumber,
      // CATNAME: pdpData.BRD_CAT_NAME,
      // CITYID: pdpData.CITY_ID,
      DIR_SEARCH_CITY: items.city_name,
      DIR_SEARCH_COMPANY: items.company_name,
      // FCP_FLAG: pdpData.FCP_FLAG,
    //   FREESHOWROOM_ALIAS: c.companyalias,
      // GLUSR_USR_ADULT_FLAG: pdpData.GLUSR_USR_ADULT_FLAG,
    //   GLUSR_USR_LOCALITY: c.locality,
      // GRP_ID: pdpData.BRD_GRP_ID,
      // GST: gst[0] ? gst[0].DATA : '',
      // MOBILEVERIFIED: pdpData.MOBILE_VERIFIED,
      // OVERALL_RATING: pdpData.SELLER_RATING && pdpData.SELLER_RATING >= 3 ? pdpData.SELLER_RATING : '',
    //   PNS_RATIO: c.pnsRatio,
      // PROSERVE: pdpData.BRD_CAT_PRODSERV,
      SLASH_DIR_SEARCH_COMPANY: items.company_name,
      gluserid: items.R_glusr_id,
    //   URL_TYPE: pdpData.URL_TYPE,
      BREADCRUMB_MCAT_ID: items.mcatid,
      PRDSERV: [],
    //   STATUSOFSELLER: getVerificationSealItem(c.CustTypeWt,c.tscode,true)
    };
    let ccData = {
      companyData: cData,
    //   companyUrl: items.companyUrl,
      callDbTracking: "company-home-Card-",
      enqDbTracking: "company-homepage-" + "-cheader-overlay-js",
      tracking: "Company-IntermedScreen",
      trackingg: "Home-IntermedScreen",
      // lastSeen: data.lastSeenStatus ? data.lastSeenStatus : ''


      // image :   PC_IMG_SMALL_100X100
    }
    
  

            index += start + 1;
            let prodPosition = '|pos_' + index;
            let image250URL=items.image_250x250?items.image_250x250:items.image;
            this.checkEnquirySent(items.display_id)? enqSent = true:enqSent = false;
            const postEnqCta = enqSent ? 'callonly' : '';
            let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
                return (<li className=" w50 bdrBA   ">
                    {/*grid view*/}
                <div className="por tc  bgw pdl5 pdr5   pdb5 pdt8">
                <div className={this.props.thankYouEnq ? 'oh por brdt10' : ' vam  flx centerItems h160px'} >
                            {(this.glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (this.glid == undefined)) || (localStorage.getItem("truecallerimpression") && (this.glid == undefined))) ? <Link to={items.url} alt={items.name} onClick={() => {
                         window.__TransitionData__ = TransitionPDP;
                                eventTracking((this.lastgadigit % 2 == 0) ? 'w3_recently_viewed_even|Home-Page-Clicks-PWA' : 'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdimage|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page + prodPosition + "|gridview" + '|Product-Image-' + index + "|" + prevname() + '|NextPageName=Pdp', true);
                            }}>
     {this.props.thankYouEnq ? <figure class="ma h100 w100px  oh bxrd100  bdr ">
                                        <div class="h100 oh w100px  tc dtc vam">
                                            <img className=" mxhw100 ht175px w175px" loading='lazy' alt={items.name} src={image250URL} />
                                        </div>
                                </figure> : <img className=' imgcntr brdt10 w150 ht155px' alt={items.name} src={image250URL}
                                    loading='lazy'
                                    ></img>}
                            </Link> : <a alt={items.name} onClick={(event) => {
                        window.location.href=(items.url); 
                                setCookie("ImageData",modifyImgSrc(TransitionPDP.imgUrl));
                                eventTracking((this.lastgadigit % 2 == 0) ? 'w3_recently_viewed_even|Home-Page-Clicks-PWA' : 'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdimage|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page + prodPosition + "|gridview" + '|Product-Image-' + index + "|" + prevname() + '|NextPageName=Pdp', true);
                                event.preventDefault();
                            }}>
                                {this.props.thankYouEnq ? <figure class="ma h100 w100px  oh bxrd100  bdr ">
                                    <div class="h100 oh w100px  tc dtc vam">
                                        <img className=" mxhw100 w150 ht155px" loading='lazy' alt={items.name} src={image250URL} />
                    </div>
                                </figure> : <img className=' imgcntr brdt10 w150 ht155px' alt={items.name} src={image250URL}
                                    loading='lazy'
                                ></img>}
                            </a>}
                    </div>
                        {(this.glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (this.glid == undefined)) || (localStorage.getItem("truecallerimpression") && (this.glid == undefined))) ? <Link to={items.url} alt={items.name} onClick={() => {
                            window.__TransitionData__ = TransitionPDP;
                            eventTracking((this.lastgadigit % 2 == 0) ? 'w3_recently_viewed_even|Home-Page-Clicks-PWA' : 'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdname|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page + prodPosition + "|gridview" + '|Product-Name-' + index + "|" + prevname() + '|NextPageName=Pdp', true);
                        }} className="tc clrBl db fs15 pdt7 mb7 txtElip">{items.name}</Link> : <a alt={items.name} onClick={(event) => {
                            window.location.href=(items.url); 
                            setCookie("ImageData",modifyImgSrc(TransitionPDP.imgUrl));
                            eventTracking((this.lastgadigit % 2 == 0) ? 'w3_recently_viewed_even|Home-Page-Clicks-PWA' : 'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdname|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page + prodPosition + "|gridview" + '|Product-Name-' + index + "|" + prevname() + '|NextPageName=Pdp', true);
                            event.preventDefault();
                        }} className="tc clrBl db fs15 pdt7 mb7 txtElip">{items.name}</a>}
                    {this.priceData(props, items, index,"|gridview",enqSent)}
                    
                    {!this.props.thankYouEnq ? <p className="tc fs12 pdt5 clr7B mb5">
                        {items.website_url.includes('company') ? <a
                            href={items.website_url}
                            className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate"
                            onClick={() => {
                                eventTracking(
                                    (this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA',
                                    props.trck_param + "cta_click_cmpny_nme|आपके लिए प्रोडक्ट्स",
                                    "IMOB_" + props.page + prodPosition+"|gridview"+'|Company-Name-'+index+"|"+prevname()+'|NextPageName=Company',
                                    true
                                );
                            }}
                        >
                            {items.company_name}
                        </a> : (this.glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (this.glid == undefined)) || (localStorage.getItem("truecallerimpression") && (this.glid == undefined))) ? <Link
                to={items.website_url} alt={items.name} 
                className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate"
                onClick={() => {
                    window.companyTransition = ccData;;
                    eventTracking(
                        (this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA',
                        props.trck_param + "cta_click_cmpny_nme|आपके लिए प्रोडक्ट्स",
                        "IMOB_" + props.page + prodPosition+"|gridview"+'|Company-Name-'+index+"|"+prevname()+'|NextPageName=Company',
                        true
                    );
                }}
              >
                {items.company_name}
              </Link> : <a
                href={items.website_url} alt={items.name} 
                className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate"
                onClick={(event) => {
                    window.location.href=(items.website_url);
                    window.companyTransition = ccData;;
                    eventTracking(
                        (this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA',
                        props.trck_param + "cta_click_cmpny_nme|आपके लिए प्रोडक्ट्स",
                        "IMOB_" + props.page + prodPosition+"|gridview"+'|Company-Name-'+index+"|"+prevname()+'|NextPageName=Company',
                        true
                    );
                    event.preventDefault();
                }}
              >
                {items.company_name}
              </a>}

                    </p> : ''}
                    <p className="clr7B por tc fs12  clr7B">
                        <span className="clr7B  tc txtElip db">
                            <i  className="locIconPer mr4 wh13_12 dib clr7B"></i>{items.city_name}
                        </span>
                    </p>
                    
                    <div className={window.pageName.toLowerCase().includes('home')?"  tc w100  mt10":this.props.thankYouEnq ? "m7 tc" : " tc w100 mt10 "}>
                    {items.ecom_flag && items.ecom_landing_url?'':<CallBtn2
                           showBoldCta={true}
                           CallBtnonly={true}
                           filledCallCta = {postEnqCta}
                           key={items.contactnumber}
                           isABtst = {props.gaLastDigit}
                           callText={props.translatedText ? props.translatedText.HEADER_BTN_1 : "कॉल करें"}
                            eventAction={items.contactnumber_type == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS"}
                            eventLabel={props.page}
                            displayPopup={() => {
                                props.callNowClick("Call",
                                    items.image, items.tsCode, items.company_name,
                                    items.contactnumber, items.contactnumber_type, items.R_glusr_id,
                                    items.display_id, items.name, items.mcatid, items.mcatName, props.callTxt, items.custtypeWeight,index)
                            }}
                            companyContactNo={items.contactnumber}
                        />}

                        {!this.props.thankYouEnq ?
                            (!(items.ecom_flag && items.ecom_landing_url) && enqSent ?
                            <div>{props.translatedText?props.translatedText.ENQ_LABEL:'Enquiry Sent'}</div> 
                                : 
                                items.ecom_flag && items.ecom_landing_url ? 
                                 <div className={'pdl10 pdr10 minusMrgb6'} id={"dispid" + items.display_id}><a href={items.ecom_landing_url} onClick={() => {eventTracking((this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_button_buynow|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page + prodPosition+"|gridview"+'|Get-Best-Price-'+index+"|"+prevname(), true);}} target="_blank"><button className={`bxrd20 clrw fs14 pdb10 pdt10 bgmim tc w90`}><i className="lockIcon"></i>Buy Now</button></a><p className="msg3rdParty tc pdt15 mb10">You will be redirected to a 3rd party webstore</p></div>:
                                 <div id={"dispid" + items.display_id} className={window.pageName.toLowerCase().includes('home')? "dib bxsdw bxrd20 clrw pdt10 pdb10 fs14 w80 appLikeCtaG fw":"dib bxsdw bxrd10 clrw  compBl fs12 fw w68 ht40 ml4 lht40 "}
                                    onClick={(e) => {
                                        if (e.target.innerHTML !== "Enquiry Sent") {
                                            props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, '', items.image, items.tsCode,
                                            items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight);
                                            eventTracking("EnquiryCTA/"+loginModes[checkUserStatus()],"Home/"+"Recommended/","",true);
                                                eventTracking((this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_button_getquotes|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page + prodPosition+"|gridview"+'|Get-Best-Price-'+index+"|"+prevname()+'|NextPageName=Enquiry|EnquiryCTA|Homepage|'+checkUserMode(), true);
                                        }
                                    }}>
                                 
                                 <i className={`${props.gaLastDigit?'enqIcnGreen ':'enqIcnGreen '} dib vam mr2`}></i>
                            {props.translatedText ? props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}

                                </div>)
                            : ''

                        }
                    </div>
                </div>
            </li>)
        });
    }
    
            // else if(this.gaLastDigit==1&&this.props.page=="Home"){
            //     return (<li className="w50 fl">
            //         {/* // image 125X 125 */}
            //     <div className="por mnH345 mt10 mr10 tc bdrBed bxdw2 brd10 bgw">
            //             <Link className=" oh por ht155px db pdt5" to={items.url} onClick={() => { 
            //                  window.__TransitionData__ = TransitionPDP;
            //                 eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_prdimage', 'IMOB_' + props.page + prodPosition+"|125image_resize", true); }}>
                           
            //                     <img  className=' imgcntr  Icntr ' alt={items.name} src={items.image} onLoad={() => this.ImagesetSize("|125image_resize",index)}></img>
                           
            //             </Link>
            //         <Link to={items.url} onClick={() => { window.__TransitionData__ = TransitionPDP;
            //              eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page + prodPosition+"|125image_resize", true); }} className="tc clrBl db fs15 pdt7 mb7 txtElip pdl10 pdr10">{items.name}</Link>
            //         {this.priceData(props, items, index,"|125image_resize")}
            //         <p className="tc fs12 pdt5 clr7B pdl10  pdr10 ">
            //             <a
            //                 href={items.website_url}
            //                 className="fs13 clrBl w100 db  txtElip"
            //                 onClick={() => {
            //                     eventTracking(
            //                         "w3_recently_viewed",
            //                         props.trck_param + "cta_click_cmpny_nme",
            //                         "IMOB_" + props.page + prodPosition+"|125image_resize",
            //                         true
            //                     );
            //                 }}
            //             >
            //                 {items.company_name}
            //             </a>

            //         </p>
            //         <p className="tc fs12  pdt5 clr7B  pdl10  pdr10">
            //             <span className="clr7B  tc">
            //                 <i style={styles.imageCss().mim_bg} className="cLocIn wh13_12 dib clr7B"></i>{items.city_name}
            //             </span>
            //         </p>
            //         <div className="poa tc w100 bt10 lft0">
            //             <CallBtn2
            //                 key={items.contactnumber}
            //                 callText={props.translatedText ? props.translatedText.HEADER_BTN_1 : "कॉल करें"}
            //                 eventAction={items.contactnumber_type == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS"}
            //                 eventLabel={props.page}
            //                 displayPopup={() => {
            //                     props.callNowClick("कॉल करें",
            //                         items.image, items.tsCode, items.company_name,
            //                         items.contactnumber, items.contactnumber_type, items.R_glusr_id,
            //                         items.display_id, items.name, items.mcatid, items.mcatName, props.callTxt, items.custtypeWeight)
            //                 }}
            //             />

            //             {
            //                 this.checkEnquirySent(items.display_id) ?
            //                     <div id={"dispid" + items.display_id} style="background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;" className="dib bxsdw bxrd20 clrw pdt10 pdb10  fs14 w80">
            //                         Enquiy Sent
            //                     </div>
            //                     : <div id={"dispid" + items.display_id} className="dib bxsdw bxrd20 clrw pdt10 pdb10 compBl fs14 w80"
            //                         onClick={(e) => {
            //                             if (e.target.innerHTML !== "Enquiry Sent") {
            //                                 props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, '', items.image, items.tsCode,
            //                                 items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight);
            //                                                                             eventTracking('w3_recently_viewed', props.trck_param + 'cta_button_getquotes', 'IMOB_' + props.page + prodPosition+"|125image_resize", true);
            //                             }
            //                         }}>
            //                         <i className="enqIcn dib vam mr2"></i>
            //                         {props.translatedText ? props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}

            //                     </div>

            //             }
            //         </div>
            //     </div>
            // </li>)
            // }
            // else{
            // return (
            //     <li className="w50 fl">
            //         <div className="pdtrb_10 por mnH335 mt10 mr10 tc bdrBed bxdw2 brd10 bgw">
            //             <div className="ht125px dib oh">
            //                 <Link className="dtc vam ht125px" to={items.url} onClick={() => {
            //                     window.__TransitionData__ = TransitionPDP;
            //                     eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_prdimage', 'IMOB_' + props.page + prodPosition, true); }}>
            //                     <LazyLoad throttle={10} offsetVertical={300}>
            //                         <img className="favImg lazy " alt={items.name} src={items.image} onLoad={()=>this.onLoadTime('',index)}></img>
            //                     </LazyLoad>
            //                 </Link>
            //             </div>
            //             <Link to={items.url} onClick={() => {
                           
            //                     window.__TransitionData__ = TransitionPDP;
            //                 eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page + prodPosition, true); }} className="tc clrBl db fs15 pdt7 mb7 txtElip">{items.name}</Link>
            //             {this.priceData(props, items, index,'')}
            //             <p className="tc fs12 pdt5 clr7B">
            //                 <a
            //                     href={items.website_url}
            //                     className="fs13 clrBl db pdl5 w100 pdr5 txtElip"
            //                     onClick={() => {
            //                         eventTracking(
            //                             "w3_recently_viewed",
            //                             props.trck_param + "cta_click_cmpny_nme",
            //                             "IMOB_" + props.page + prodPosition,
            //                             true
            //                         );
            //                     }}
            //                 >
            //                     {items.company_name}
            //                 </a>

            //             </p>
            //             <p className="tc fs12  pdt5 clr7B">
            //                 <span className="clr7B  tc">
            //                     <i style={styles.imageCss().mim_bg} className="cLocIn wh13_12 dib clr7B"></i>{items.city_name}
            //                 </span>
            //             </p>
            //             <div className="poa tc w100 bt10 lft0">
            //                 <CallBtn2
            //                     key={items.contactnumber}
            //                     callText={props.translatedText ? props.translatedText.HEADER_BTN_1 : "कॉल करें"}
            //                     eventAction={items.contactnumber_type == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS"}
            //                     eventLabel={props.page}
            //                     displayPopup={() => {
            //                         props.callNowClick("कॉल करें",
            //                             items.image, items.tsCode, items.company_name,
            //                             items.contactnumber, items.contactnumber_type, items.R_glusr_id,
            //                             items.display_id, items.name, items.mcatid, items.mcatName, props.callTxt, items.custtypeWeight)
            //                     }}
            //                 />

            //                 {
            //                     this.checkEnquirySent(items.display_id) ?
            //                         <div id={"dispid" + items.display_id} style="background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;" className="dib bxsdw bxrd20 clrw pdt10 pdb10  fs14 w80">
            //                             Enquiy Sent
            //                         </div>
            //                         : <div id={"dispid" + items.display_id} className="dib bxsdw bxrd20 clrw pdt10 pdb10 compBl fs14 w80"
            //                             onClick={(e) => {
            //                                 if (e.target.innerHTML !== "Enquiry Sent") {
            //                                     props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, '', items.image, items.tsCode,
            //                                     items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight);
            //                                                                                     eventTracking('w3_recently_viewed', props.trck_param + 'cta_button_getquotes', 'IMOB_' + props.page + prodPosition, true);
            //                                 }
            //                             }}>
            //                             <i className="enqIcn dib vam mr2"></i>
            //                             {props.translatedText ? props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}

            //                         </div>

            //                 }
            //             </div>
            //         </div>
            //     </li>
            // )
    
    priceData(props, items, index,param,enqSent) {
        
        return ((items.price_f || items.price_seo|| (items.price && items.currency)) ?
            <p id={"pp" + items.display_id} className={props.thankYouEnq ? "clr33 tl fs14 fw txtElip pdl6 pdr6" : "clr33 tc fs16 fw txtElip notranslate"  }
                onClick={(!props.thankYouEnq && !enqSent && !items.ecom_flag && !items.ecom_landing_ur) ? (e) => {
                    if (!e.target.getAttribute('data-priceClicked')) {
                        eventTracking((this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_price|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page+param+'|Price-Click-'+index+"|"+prevname()+'|NextPageName=Enquiry', true);
                        props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_CLICKED', items.image,items.tsCode,
                        items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
                    }
                } : ''}>
                 {items.price_seo ? items.price_seo : items.price_f ? '₹ ' + convertIndianNumericFormatToNumeric(items.price_f) : <> <i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>
                    {getPrice(parseFloat(items.price), "", items.unit)}</>}

            </p>
            :
            enqSent?<p   className="clrBlack fs16 fw txtElip pdl10">Price Requested</p>:<p    id={"prcid" + items.display_id + "pr"} className= {props.thankYouEnq ? " fs16 txtElip pdl6" : "clrBl fs16 fw txtElip pdl6"  }
                onClick={!props.thankYouEnq ? (e) => {
                    if (e.target.innerHTML !== "Price Requested" && !items.ecom_flag && !items.ecom_landing_url) {
                        eventTracking((this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_price_request|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page+param+'|Price-Click-'+index+"|"+prevname()+'|NextPageName=Enquiry', true);
                        props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_REQUESTED', items.image,items.tsCode,
                        items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
                    }
                } : ''}>
                लेटेस्ट रेट पाएं
            </p>);
        
    }
    viewMoreHandler(props) {
        // let identifier=this.gaLastDigit==0?"|gridview":this.gaLastDigit==1?"|125image_resize":"";
        eventTracking((this.lastgadigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + 'View-More|आपके लिए प्रोडक्ट्स', 'IMOB_' + props.page+"|"+prevname(), true);

        this.setState({ viewMoreClicked: true });
    }
    mcatClickHandler(props,mcatid,index=-1) {
        this.setState({ mcatClicked: mcatid,
                        viewMoreClicked: false
                       });
        eventTracking((this.props.gaLastDigit1%2==0) ? 'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA', props.trck_param + `${mcatid==-1?`cta_click_chip | All`:`cta_click_chip | ${index}`}`, 'IMOB_' + props.page, true);
       
    }
    listmcats(data) {
      return data.map((it,ix) => {
          return(
                  <li className = {`bxrd20 dib fs14 fw lht35 ml4 mr5 pdl10 pdr10 ${this.state.mcatClicked==it.mcatid?'bdrmim clrmim':'bgclrw bdrg'}`} onClick={() =>this.mcatClickHandler(this.props,it.mcatid,ix)}>{it.name}</li>
           )
          }
      )
    }
    componentDidUpdate() {
        removalTextNodes();}

    render() {
        return <div id="prodsViewedSection"  className= { this.props.thankYouEnq ? "relatedMoreCat" : `oh mt10 pdb10 ${(this.props.page&&this.props.page=="Home")?"":"mb10"}`} >
           <div className= { "fs17 fw clr11 pdt15 pdb15 pdl15 por bgw   "}>{this.props.head}</div>
           {this.isFilterAbTest && this.props.mcatData && this.props.mcatData.length > 1? 
            <ul className='scWrap pl5  pdb10'>
            {<li className={`w15 bxrd20 dib fs14 fw lht35 ml4 mr5 pdl5 pdr5 tc ${this.state.mcatClicked==-1?'bdrmim clrmim ':' bdrg'}`} onClick={() =>this.mcatClickHandler(this.props,-1)}>All</li>}
            {this.listmcats(this.props.mcatData)}
            </ul>
            :''}
            <ul  className= {this.props.thankYouEnq ? "flwr pd1Al ovfx" : "flx flwr  "}>
                {this.isFilterAbTest ? this.state.mcatClicked==-1 ? this.listItems(this.props) : this.listItems(this.props,this.state.mcatClicked,0,this.props.lslength + this.props.data.length) : this.listItems(this.props)}
                {this.state.viewMoreClicked ? this.listItems(this.props,this.state.mcatClicked, 10, 4) : ''}
            </ul>
            {(this.state.mcatClicked==-1 && !this.state.viewMoreClicked && this.props.data && this.props.data.length > 10) ? <div class={`bxshdw04 pd10 clrBl tc fs15  ${(this.props.page=="Home") ? "" : "mt10"}`} onClick={() => this.viewMoreHandler(this.props)}>View More</div> : ""}
            {/* <CallNowController /> */}
        </div>
      }
    
}