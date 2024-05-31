import React from 'react';
import styles from "../../../Globals/imageCss";
import { eventTracking, A2HSApp,prevname } from '../../../Globals/GaTracking';
import { getPriceWithoutCurrency } from '../../../Globals/priceModification';
import { pns_prefix } from '../../../Globals/pnsModification';
import { service_link,checkUserMode,checkUserStatus } from '../../../Globals/MainFunctions';
import { Link } from 'react-router';
import { getCookie,getCookieValByKey,setCookie } from '../../../Globals/CookieManager';
import { goToRoute } from '../../../Globals/routingFunction';
import { CallBtn1 } from '../../CallNow/views/CallBtn1';
import { callNowActionDispatcher } from '../../CallNow/actions/callNowActionDispatcher';
import {removalTextNodes} from '../../../Globals/translatorPreact/translatorPatch';
import { modifyImgSrc } from '../../ProductDetail/utility/Carousel/helper';
const loginModes = {
    0: "Unidentified",
    1: "Identified",
    2: "Full-Login",
    3: "Unidentified-Existing",
  };
class RelatedProductsWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { viewMoreClicked: false, showEnqPopup: false, CallNowView:'', Ads: ''}
        this.checkEnquirySent = this.checkEnquirySent.bind(this);
        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.showModal = this.showModal.bind(this);
        this.addslashes = this.addslashes.bind(this);
        this.callEnq = this.callEnq.bind(this);
        this.callNowClick = this.callNowClick.bind(this);
        this.callPropsNew=this.callPropsNew.bind(this);
        this.prop = {};
        this.isOnetimeBulw=true;
        this.buwl='';
        this.identifier = props.page == 'Home' ? props.identifier : "";
        this.disableAds = ((location.search.indexOf('noads') > -1) ? true : false);
        this.show_ads = (localStorage.recentMcats) ? true : false;
        this.ls=localStorage;
        this.prevname = prevname();
        this.lsData = [];
        this.count='';
        this.rawdata=this.props.rel;
        let glid=getCookieValByKey('ImeshVisitor', 'glid');
        let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
        this.CSRCheck = (glid == '54140442' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? true : false;
    }
    
    componentDidMount() {
      
        this.loadEnquiryContainer();
        callNowActionDispatcher(false);
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.callNowController!="" && prevProps.callNowController==""){
            let buttonvalue=window.gbpcallclick?document.getElementById(window.gbpcallclick):''
            buttonvalue?buttonvalue.click():'';
            delete window.gbpcallclick;

            document.getElementById("blackCallBg") ? document.getElementById("blackCallBg").style.display = 'none':'';
           }

           let EnquiryDiv = document.getElementById("gbpenquirydiv");
           let lsrelprods2=localStorage&&localStorage.relProds2?JSON.parse(localStorage.relProds2)?JSON.parse(localStorage.relProds2):'':''

            if(this.props.enqView!="" && prevState.view=="") { 

       
                window.gbpenqclick=='gbp1'&& document.getElementById("dispid"+JSON.parse(lsrelprods2)[0].DISPLAY_ID) ? document.getElementById("dispid"+JSON.parse(lsrelprods2)[0].DISPLAY_ID).click() : '';
                window.gbpenqclick=='gbp2'&& document.getElementById("dispid"+JSON.parse(lsrelprods2)[1].DISPLAY_ID) ? document.getElementById("dispid"+JSON.parse(lsrelprods2)[0].DISPLAY_ID).click() : '';
                window.gbpenqclick=='gbp3'&&document.getElementById("dispid"+JSON.parse(lsrelprods2)[2].DISPLAY_ID) ? document.getElementById("dispid"+JSON.parse(lsrelprods2)[0].DISPLAY_ID).click() : '';
                EnquiryDiv ? EnquiryDiv.parentNode.removeChild(EnquiryDiv) : "";
                delete window.gbpenqclick;
                document.getElementById("enqLoader") ? document.getElementById("enqLoader").style.display = 'none':'';
                
            }  
        removalTextNodes();
      
    }


    loadEnquiryContainer(){
        if(!this.state.CallNowView && this.props.page=='error-general'){
            import(/* webpackChunkName:"CallNowController" */'../../CallNow/container/CallNowContainer').then((module) => {
            this.setState({ CallNowView: module.default });
        })
        }
    }


    showModal(prop) {
                this.prop = prop;
        this.setState({ showEnqPopup: !this.state.showEnqPopup });
    }
    callEnq(mcatid, eDISPLAY_ID, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, IMG_URL,price_f,SDA_GLUSR_USR_LOCALITY,CITY_NAME,text='',price2,callProps) {
        let modreftype = 2;
        let query = "did=" + DISPLAY_ID + "&ctg=&ss=&locality=&modreftype=" + modreftype;
        let query_text= text? text + (this.props.cABTest?this.props.cABTest:''): `${this.props.page}-related-products|PWA` +(this.props.cABTest?this.props.cABTest:'');
        let data = {}
        data.isEnquiry = true;
        data.mcatId = mcatid;
        data.productImage = IMG_URL ? IMG_URL : 'https://m.imimg.com/gifs/img/prod-img.png';
        data.query = query;
        data.ctaName = 'सर्वोत्तम मूल्य प्राप्त करें';
        data.companyNameHome = COMPANYNAME;
        data.displayId = eDISPLAY_ID + '';
        data.queryText = query_text;
        data.receiverUserId = GLUSR_ID;
        data.page = this.props.page ? this.props.page : '';
        data.productName = ITEM_NAME;
        data.modid = 'IMOB';
        data.prdPricePDP = price_f ? price_f : price2;
        data.locality = SDA_GLUSR_USR_LOCALITY ?  SDA_GLUSR_USR_LOCALITY+", "+ CITY_NAME : CITY_NAME;
        data.image=callProps.image,
        data.companyName=callProps.companyName,
        data.contactNumber=callProps.contactNumber,
        data.contactType= callProps.contactType,
        data.glusrID=callProps.glusrID,
        data.dbpagetrack=callProps.dbpagetrack,
        data.tsCode=callProps.tsCode,
        data.callTxt=callProps.callTxt,
        data.query_ref_id=callProps.query_ref_id,
        data.query_ref_type=callProps.query_ref_type;
        data.query_ref_id=callProps.query_ref_id,
        data.modrefid=callProps.modrefid,
        data.productPrice=callProps.productPrice,
        data.modrefname=callProps.modrefname,   
        data.eventLabel=callProps.eventLabel,
        data.custtypeWeight=callProps.custtypeWeight,
        data.companyLocation=callProps.companyLocation,
        this.showModal(data);

    }

    callPropsNew(items,price2){
        let callProps = { callTxt:"कॉल करें",
        image: items.IMAGE_125X125, 
        tsCode: items.COMPANYNAME, 
        companyName: items.COMPANYNAME,
        contactNumber: items.CONTACT_NUMBER,
        contactType: items.CONTACT_TYPE, 
        glusrID:  items.GLUSR_ID, 
        modrefid: items.DISPLAY_ID, 
        modrefname:  items.ITEM_NAME, 
        query_ref_id: items.mcatid, 
        query_ref_type: items.GLCAT_MCAT_NAME, 
        dbpagetrack: A2HSApp(true) ? `${this.props.page}-related-products` + A2HSApp(true) + '-' + this.props.page + (this.props.cABTest?this.props.cABTest:''): `${this.props.page}-related-products` + (this.props.cABTest?this.props.cABTest:''), eventLabel: 'More-sellers-near-you-1', 
        companyLocation: items.CITY_NAME,
        productPrice: items.price_f ? items.price_f: price2 ,
        custtypeWeight:''}
        return callProps
    }

    addslashes(str) {
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '\\"');
        str = str.replace(/\0/g, '\\0');
        return str;
    }

    imgData(img) {
        let imgurl = (img) ? img : "https://m.imimg.com/gifs/background_image.jpg";
        imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
        imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
        imgurl = imgurl.replace('http://', 'https://');
        return imgurl;
    }
    callNowClick(dbpagetrack, price2 ,items) {
        dbpagetrack = A2HSApp(true) ? dbpagetrack + A2HSApp(true) + '-' + this.props.page: dbpagetrack;
        let callProps = this.callPropsNew(items,price2) ;
        callNowActionDispatcher(true, callProps);
    }
    
    listItems(data, start,flag) {
        
        let mcatName = '';
        let mcatUrl = '';
        let listing = data.map((items, index) => {
            index += parseInt(start) + 1;

            if (index == 1) {
                mcatName = items.GLCAT_MCAT_NAME;
                let mcatFlName = items.GLCAT_MCAT_FLNAME;
                if (mcatFlName)
                    mcatUrl = '/impcat/' + mcatFlName + ".html";
            }

            let contactNumber = (items.CONTACT_NUMBER && items.CONTACT_NUMBER.indexOf("+91") > -1) ? items.CONTACT_NUMBER : pns_prefix(items.CONTACT_NUMBER);
            let compLink = items.COMPANY_URL;
            if (items.COMPANY_LINK && items.COMPANY_LINK.includes('company')) {
            compLink = items.COMPANY_LINK.replace('http://', 'https://');
        }
            else if (items.COMPANY_LINK) {
                compLink = items.COMPANY_LINK.split('/')[3];
            }
            let locality = items.SDA_GLUSR_USR_LOCALITY ? items.SDA_GLUSR_USR_LOCALITY.replace("\n", "").substr(0, 70) + ', ' : '';

            // let productUrl = items.COMPANY == 'true' ? items.COMPANY_LINK != '' ? items.COMPANY_LINK : service_link(items.ITEM_NAME, items.DISPLAY_ID) : service_link(items.ITEM_NAME, items.DISPLAY_ID);
            let productUrl =items.COMPANY == 'true' ? items.COMPANY_LINK != '' ? items.COMPANY_LINK : (items.PDP_URL ?items.PDP_URL :service_link(items.ITEM_NAME, items.DISPLAY_ID) ) : (items.PDP_URL ?items.PDP_URL :service_link(items.ITEM_NAME, items.DISPLAY_ID) ) ;
            let boolCompany = items.COMPANY == 'true' ? true : false;
            let ecom_landing_url=items.ECOM_ITEM_LANDING_URL?items.ECOM_ITEM_LANDING_URL:'';
            let ecom_flag=items.FK_ECOM_STORE_MASTER_ID?items.FK_ECOM_STORE_MASTER_ID:'';
            let imgurl = this.imgData(items.IMAGE_125X125); 
            let price2 = items.PRICE ? <><i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i> {getPriceWithoutCurrency(parseFloat(items.PRICE)) + ((items.PRD_SEARCH_MOQ_UNIT_TYPE && items.PRD_SEARCH_MOQ_UNIT_TYPE.trim() != '') ? (' / ' + items.PRD_SEARCH_MOQ_UNIT_TYPE) : '')} </> : '';
            return <div><div className="por bgw mb5 crx  pd10 mb10 tl w100 por crb">
                {flag?this.productImageDiv(items, index, productUrl, imgurl, boolCompany):this.productImageDiv(items,items.RNM,items.PDP_URL,items.IMAGE_125X125,items.FLAG)}
                {flag?this.productDataDiv(items, index, productUrl, compLink, locality, boolCompany):this.productDataDiv(items,items.RNM,items.PDP_URL,compLink,loc,items.FLAG)}

                <div className="por w100 btm0 tc mt10 df gapc10">
                    {/* <CallNow  {...callProps}/> */}
                    {ecom_flag && ecom_landing_url && this.props.page=="Home"?'':<CallBtn1 
                        id={"call"+index}
                       applikectahome={this.props.applikectahome}
                        key={items.CONTACT_NUMBER}
                        callText="कॉल करें"
                        isABtst = {this.props.isABtst}
                        disablebutton={flag?this.checkEnquirySent(items.DISPLAY_ID):''}
                        page={this.props.page ? this.props.page : ''}
                        eventAction={items.CONTACT_TYPE == "PNS" ? "Clicked-PNS"  : "Clicked-NonPNS" }
                        eventLabel={this.props.page ? this.props.page : ''}
                        displayPopup={() => {
                            this.callNowClick(`${this.props.page}-related-products`,
                             price2,items
                            );
                            eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'click-to-call-'+index+this.identifier+'|'+this.prevname, true)  
                        }}  />}
                    {this.getBestPriceDiv(items, index, imgurl,ecom_flag,ecom_landing_url)}
                </div>
                </div>
                {flag && index==4 && this.props.page && this.props.page == 'Home'?(<
                >
                 {(this.show_ads && !this.disableAds && this.props.Ads)?
                    <div> 
                    { <this.props.Ads key='UnIdentified7' secondAds={true}  type={'home'} data={{ name: '/3047175/Msite_home_PWA_Between_MSNY', id:'div-gpt-ad-1663049238615-0', res:[[336, 280], [320, 150], [320, 200], [300, 150], [300, 100], [320, 250], [300, 200], [300, 250], [320, 100]]}} />}
                    </div>
                    :""}
                    </>):""}
            </div>

        });
        return { listing, mcatName, mcatUrl }
    }



    getHeading(mcatName, mcatUrl) {
        if(this.ls.relCats && !mcatUrl){
            let mcatFl_Name=this.ls.relCats?JSON.parse(this.ls.relCats)?JSON.parse(JSON.parse(this.ls.relCats))?JSON.parse(JSON.parse(this.ls.relCats))[0]?JSON.parse(JSON.parse(this.ls.relCats))[0].GLCAT_MCAT_FL_NAME:'':'':'':'';
            mcatFl_Name=mcatFl_Name?mcatFl_Name:'';
            if (mcatFl_Name)
                mcatUrl = '/impcat/' + mcatFl_Name + ".html";
            }
            let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
            let glid=getCookieValByKey('ImeshVisitor', 'glid');  
        return <div class="fs17 fw clr11 pdt15 pdb15 pdl15 por bgw bdrBR">
        More Sellers Near You For {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link class="tun fw clr11 " to={mcatUrl} onClick={() => { eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'View-All'+this.identifier+'|'+this.prevname+'|NextPageName=Mcat', true); setTimeout(function () { scrollTo(0, 0) }, 0) }} dangerouslySetInnerHTML={{ __html: mcatName }}></Link> : <a class="tun fw clr11" href={mcatUrl} onClick={(event) => {window.location.href=(mcatUrl); eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'View-All'+this.identifier+'|'+this.prevname+'|NextPageName=Mcat', true); event.preventDefault()}} dangerouslySetInnerHTML={{ __html: mcatName }}></a> }
        </div>
    }
    viewMoreHandler() {
        this.setState({ viewMoreClicked: true });
    }

    viewSimilarDiv(mcatUrl) {
        let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
        let glid=getCookieValByKey('ImeshVisitor', 'glid');

        if (!this.state.viewMoreClicked)
        return <div className="bxshdw04 pd10 clrBl tc fs15 " onClick={() => { this.viewMoreHandler(); eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'View-More'+this.identifier+'|'+this.prevname, true) }}>
        View More
                </div>
        if (mcatUrl)
        return <div>{(SSR && (SSR["userViewCount"] == 5)) || glid == '5414044002' || (localStorage.getItem("truecallerimpression") && (glid == undefined)) ? <Link className="bxshdw04 pd10 clrBl db tc fs15 " to={mcatUrl} onClick={() => { eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'View-All'+this.identifier+'|'+this.prevname+'|NextPageName=Mcat', true); setTimeout(function () { scrollTo(0, 0) }, 0) }}>
        View all similar products &gt;
            </Link> : <a className="bxshdw04 pd10 clrBl db tc fs15 " href={mcatUrl} onClick={() => { eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'View-All'+this.identifier+'|'+this.prevname+'|NextPageName=Mcat', true);}}>
        View all similar products &gt;
            </a>}</div>
    }

    checkEnquirySent(dispId) {
        let lsData = JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData = "";
        }
        var e = lsData ? lsData['displayId'] : "undef";
        if (e) {
            //e = decodeURIComponent(e);
            var dispIds = e.split(",");
            return dispIds.includes(dispId + '');
        }
        else
            return false;
    }
    getBestPriceDiv(items, index, imgurl,ecom_flag,ecom_landing_url) {
        let price2 = items.PRICE ? <><i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i> {getPriceWithoutCurrency(parseFloat(items.PRICE)) + ((items.PRD_SEARCH_MOQ_UNIT_TYPE && items.PRD_SEARCH_MOQ_UNIT_TYPE.trim() != '') ? (' / ' + items.PRD_SEARCH_MOQ_UNIT_TYPE) : '')} </> : '';
        let callProps = this.callPropsNew(items,price2) ;
        let abctatrack=this.props.cABTest?this.props.cABTest:''
        return<>
            {ecom_flag && ecom_landing_url && this.props.page=="Home"?<div className={'minusMrgb6 w100'} id={"dispid" + items.display_id}><a href={ecom_landing_url} onClick={() => {eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1'+abctatrack, 'Get-Best-Price-' +index+this.identifier+"|"+this.prevname+"|NextPageName-Enquiry"+"cta_button_buynow", true);}} target="_blank"><button className={`bgmim tc bxrd20 fs14 clrw pdt10 pdb10 w100 fw`}><i className="lockIcon"></i>Buy Now</button></a><p className="msg3rdParty tc pdt15 mb10">You will be redirected to a 3rd party webstore</p></div>
            :this.checkEnquirySent(items.DISPLAY_ID) ?'':
            <span id={"dispid" + items.DISPLAY_ID} className=" pdb12 pdt12 w47 clrw  fs14 fw bdrmim bgmim bxrdNL" onClick={(e) => {
                    if (e.target.innerHTML !== "Enquiry Sent") {
                        this.callEnq(items.mcatid, items.DISPLAY_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl, items.price_f, items.SDA_GLUSR_USR_LOCALITY, items.CITY_NAME,'',price2,callProps);
                    };eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1'+abctatrack, 'Get-Best-Price-' +index+this.identifier+"|"+this.prevname+"|NextPageName-Enquiry"+(this.props.page=="Home"?'|EnquiryCTA|Homepage|'+checkUserMode():""), true)
                    eventTracking("EnquiryCTA/"+loginModes[checkUserStatus()],this.props.page+"/"+"MSNY/","",true);
                }}><i class="enqIcn vam dib mr5"></i>सर्वोत्तम मूल्य प्राप्त करें</span>
            } </> 
    }
    
    priceDiv(items,index) { 
        let text='Home-related-products-price-click|PWA';
        let price2 = items.PRICE ? <><i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i> {getPriceWithoutCurrency(parseFloat(items.PRICE)) + ((items.PRD_SEARCH_MOQ_UNIT_TYPE && items.PRD_SEARCH_MOQ_UNIT_TYPE.trim() != '') ? (' / ' + items.PRD_SEARCH_MOQ_UNIT_TYPE) : '')} </> : '';
        let callProps = this.callPropsNew(items,price2) ;
        if (items.price_f || items.PRICE){
            return <p className="pdt10 pdb10 fs16 fw dib clr33 notranslate"> <span id={"dispid" + items.DISPLAY_ID}  onClick={(!this.checkEnquirySent(items.DISPLAY_ID)) ? (e) => {
                if (!e.target.getAttribute('data-priceClicked')) {
                this.callEnq(items.mcatid, items.DISPLAY_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, items.IMAGE_125X125, items.price_f, items.SDA_GLUSR_USR_LOCALITY, items.CITY_NAME,text,price2,callProps);}
             
                eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Price-Click-' + index+this.identifier+"|"+this.prevname+"|NextPageName-Enquiry", true);
                }:''} > {items.PRICE_SEO?items.PRICE_SEO:items.PRICE?  <>₹&nbsp;{(items.PRICE) + ((items.PRD_SEARCH_MOQ_UNIT_TYPE && items.PRD_SEARCH_MOQ_UNIT_TYPE.trim() != '') ? (' / ' + items.PRD_SEARCH_MOQ_UNIT_TYPE) : '')} </>:items.price_f}            
                </span></p>
            }
        else{
            return<div>
           {this.checkEnquirySent(items.DISPLAY_ID) ? <span class="c77 fs16 fw dib">Price Requested</span>:
           <span class="clrBl fs16 fw dib por pdb5" onClick={()=>{
             eventTracking(`${this.props.page}-Page-Clicks-PWA`,'More-sellers-near-you-1',"Price-On-Request-" + index+this.identifier+"|"+this.prevname+"|NextPageName-Enquiry"+(this.props.page=="Home"?'|EnquiryCTA|Homepage|'+checkUserMode():""),true);
            this.callEnq(items.mcatid, items.DISPLAY_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, items.IMAGE_125X125, items.price_f, items.SDA_GLUSR_USR_LOCALITY, items.CITY_NAME,text,price2,callProps);
          }}>लेटेस्ट रेट पाएं</span>}
           </div>
        }
    }
    transitionPDPdata=(items)=>{
        let TransitionPDP = {
            displayId : items.DISPLAY_ID,
            productName :items.ITEM_NAME,
            glid :items.GLUSR_ID,
            productMcatId :items.mcatid,
            imgUrl : items.IMAGE_125X125,
            companyName : items.COMPANYNAME,
            city :items.CITY_NAME,
            price :items.PRICE,
            companyContactNo : items.CONTACT_NUMBER,
            companyContactVal :  'PNS',
            catFlname : items.GLCAT_MCAT_FLNAME,
            unit :items.MOQ_PER_UNIT,
            cityOrigin : items.CITY_NAME,
            standardPrice : items.price_f?items.price_f.replace(/₹/g, ""):'',
            extraPrdName : items.ITEM_NAME,
            prd_isq : [],
            pagetype:'homepage'
        }
        return TransitionPDP
    }
    productImageDiv(items, index, productUrl, imgurl, boolCompany) {
        let bgimg= imgurl&&imgurl.includes(".png")?"":styles.imageCss().bgimg;
        let TransitionPDP=this.transitionPDPdata(items);
        return <div className="db fl tc ht125px w125p oh bxrd10  bdr ">
            {(this.CSRCheck) ? <Link to={productUrl} onClick={() => {
                window.__TransitionData__ = TransitionPDP;
                eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Product-Image-' + index + this.identifier + "|" + this.prevname + "|NextPageName-Pdp", true); setTimeout(function () { scrollTo(0, 0) }, 0);
            }}  className=" ht125px w125p  flx centerItems  ">
                
                <img style={bgimg} src={imgurl} alt={items.ITEM_NAME} loading={index > 2 ? 'lazy' : ""} />
            </Link> : <a onClick={(event) => {
                        window.location.href=(productUrl); 
                {boolCompany == false ?setCookie("ImageData",modifyImgSrc(TransitionPDP.imgUrl)):''};
                eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Product-Image-' + index + this.identifier + "|" + this.prevname + "|NextPageName-Pdp", true);
                event.preventDefault();
            }} className=" ht125px w125p flx centerItems   ">

                <img style={bgimg} src={imgurl} alt={items.ITEM_NAME} loading={index > 2 ? 'lazy' : ""} />
            </a> 

            }
        </div>
    }

    productDataDiv(items, index, productUrl, compLink, locality, boolCompany,imgurl) {
     let TransitionPDP=this.transitionPDPdata(items);
     let cData = {
        //   COMPANY_LOGO: props.data.product.company_logo,
          // CATAGORY_ID: pdpData.CAT_ID,
          CONTACTNO: items.CONTACT_NUMBER,
          CONTACTTYPE: items.CONTACT_TYPE,
          CONTACTORG: items.CONTACT_NUMBER,
          // CATNAME: pdpData.BRD_CAT_NAME,
          // CITYID: pdpData.CITY_ID,
          GLUSR_USR_LOCALITY : items.SDA_GLUSR_USR_LOCALITY,
          DIR_SEARCH_CITY: items.CITY_NAME,
          DIR_SEARCH_COMPANY: items.COMPANYNAME,
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
          SLASH_DIR_SEARCH_COMPANY: items.COMPANYNAME,
          gluserid: items.GLUSR_ID,
        //   URL_TYPE: pdpData.URL_TYPE,
          BREADCRUMB_MCAT_ID: items.mcatid,
          PRDSERV: [],
        //   STATUSOFSELLER: getVerificationSealItem(c.CustTypeWt,c.tscode,true)
        };
        let ccData = {
          companyData: cData,
          companyUrl: items.COMPANY_URL,
          callDbTracking: "company-home-Card-",
          enqDbTracking: "company-homepage-" + "-cheader-overlay-js",
          tracking: "Company-IntermedScreen",
          trackingg: "Home-IntermedScreen",
          // lastSeen: data.lastSeenStatus ? data.lastSeenStatus : ''
    
    
          // image :   PC_IMG_SMALL_100X100
        }
        return <div className="vat pdl130 crx"><div className="mnht99 tl pdl5">
                <p className="fs16  por oh lh">
                {(this.CSRCheck) ? <Link to={productUrl} onClick={() => {
                         window.__TransitionData__ = TransitionPDP;
                    eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Product-Name-' + index + this.identifier + "|" + this.prevname + "|NextPageName-Pdp", true);setTimeout(function () { scrollTo(0, 0) }, 0);
                    }} className="pTitle wr maxh40 oh toellipsis wlineclamp2">{items.ITEM_NAME}</Link> : <a onClick={(event) => {
                        window.location.href=(productUrl); 
                    {boolCompany == false ? setCookie("ImageData",modifyImgSrc(TransitionPDP.imgUrl)):'';}
                    eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Product-Name-' + index + this.identifier + "|" + this.prevname + "|NextPageName-Pdp", true);
                    event.preventDefault();
                }} className="pTitle wr maxh40 oh toellipsis wlineclamp2">{items.ITEM_NAME}</a> }
                </p>
                {this.priceDiv(items, index)}
                <p className="por oh fs14 pdb5">
                    {compLink && compLink.includes('company') ? <a onClick={() => {
                     window.__TransitionData__ = TransitionPDP;
                        eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Company-Name-' + index+this.identifier+"|"+this.prevname+"|NextPageName-Company", true)
                    }} href={compLink} className="clr33 fs14 notranslate toellipsis wlineclamp1">
                    {items.COMPANYNAME}</a>
                        : <span onClick={() => {
                            window.companyTransition = ccData;
                            eventTracking(`${this.props.page}-Page-Clicks-PWA`, 'More-sellers-near-you-1', 'Company-Name-' + index+this.identifier+"|"+this.prevname+"|NextPageName-Company", true);
                            (this.CSRCheck) ? goToRoute("/" + compLink + "/") : window.location.href=("/" + compLink + "/");

                        }} className="clr33 fs14 notranslate toellipsis wlineclamp1">
                        {items.COMPANYNAME}</span>}
                </p>
                <p className="por oh fs14">
                   <span className="clr5a toellipsis wlineclamp1 fl">
                   <i className="locationIcn dib"></i>
                        {locality + items.CITY_NAME}
                    </span>
                </p>
                
                
            </div>
        </div>
    }
    
    render() {
        removalTextNodes();
        let mcatUrl = '', mcatName = '';
        let listing ,widget;

        try {
            if (localStorage.relProds2) {
                this.lsData = JSON.parse(JSON.parse(localStorage.relProds2));
                let lsLength = this.lsData.length;
                widget= this.lsData && this.lsData.length > 0 && Object.entries(this.lsData[0]).length > 0 ? true:false;
                if (widget) {
                    this.count = this.props.count ? (lsLength < this.props.count ? lsLength : this.props.count) : lsLength;
                    ({ listing, mcatName, mcatUrl } = this.listItems(this.lsData.slice(0, this.count), 0,1));

                }
            }
            else{ if(this.rawdata)
                ({listing,mcatName, mcatUrl } = this.listItems(this.rawdata.slice(0,5),0,0))}
        } catch (e) {
            console.log(e)
        }
            return (
               

                <div id="relatedProducts" className="pdb10 pdt5">
                    {this.state.CallNowView ? <this.state.CallNowView />:''}
                    {this.state.showEnqPopup && this.props.enqView!=''?<this.props.enqView closePopup={this.showModal} prop={this.prop}/>:''}
                    <div>{widget ?this.getHeading(mcatName, mcatUrl):''}</div>
                    {listing}
                    {this.state.viewMoreClicked ? (this.lsData && this.lsData.length > 0 && Object.entries(this.lsData[0]).length > 0 && listing && listing.length) ? this.listItems(this.lsData.slice(this.count, 10), this.count,1).listing :this.rawdata&&this.props.mcatId ?this.listItems(this.rawdata.slice(6, 11), 6,0).listing :'' : ''}
                    {widget ?this.viewSimilarDiv(mcatUrl):''}
                </div>
            )
          
          
    }
}
export default RelatedProductsWidget;