import React, { PureComponent } from 'react';
import { setCookie, getCookie, getCookieValByKey} from "../../../Globals/CookieManager";
// import { eventTracking, gaTrack} from "../../../Globals/GaTracking";
import { getrelatedproducts, getCityWithLatLong } from './ServiceHandler/fetchProductDetail';
import { filterCities, modifyImgSrc,checkUserStatusFromCookie, callEnqForm } from './helper';
import CTA from './NewCallEnqCTA';
import { pns_prefix } from '../../../Globals/pnsModification';
import { eventTracking } from '../../../Globals/GaTracking';
import { formatINRPrice } from '../../../Globals/priceModification';
import Buynow from '../NewUtility/Buynow';
import { TransformContactNumber } from '../components/SSRFirstFold/helper';
import AlsoDealsIn from '../NewUtility/AlsoDealsIn';
import { removalTextNodes } from '../../../Globals/translatorPreact/translatorPatch';

class RecommendedWidgets extends PureComponent {
    constructor(props) {
        super(props);
        let cityInitObj = {}
        if(this.props.pdpCity && this.props.pdpCityId) {
            cityInitObj.city_id = this.props.pdpCityId;
            cityInitObj.city = this.props.pdpCity
        }
        this.state = {
            recommendedMcatData:[],
            recommendedData:[],
            selectedCity: cityInitObj,
            cityList : cityInitObj.city_id ? [cityInitObj] : [],
            geoLocState : '',
            detectLocation:'',
            geolocClicked : false,
            hasLoaded:false,
            GoogleAds : ''
        }
        this.callApi = this.callApi.bind(this);
        this.callBL = this.callBL.bind(this);
        this.exploreSimilarDiv = this.exploreSimilarDiv.bind(this);
        this.findPopularDiv = this.findPopularDiv.bind(this)
        this.constructFilter = this.constructFilter.bind(this);
        this.filterBubble = this.filterBubble.bind(this);
        this.exCardsList = this.exCardsList.bind(this);
        this.PopularCardList = this.PopularCardList.bind(this);
        this.cityClick = this.cityClick.bind(this);
        this.populateCityBubbles = this.populateCityBubbles.bind(this);
        this.geoLocCallBck = this.geoLocCallBck.bind(this);
        this.moveToTop = this.moveToTop.bind(this);
        this.loadAds = this.loadAds.bind(this);
        this.cookieVal = this.props.cookie;
        this.initialCityList=[]
        if(this.props.pdpCityId && this.props.pdpCity) {
            this.initialCityList.push({
                city_id : this.props.pdpCityId,
                city : this.props.pdpCity
            })
        }
        this.mcatSWIMArray= [69543,42703,84153,168563,170577,108469,174817,42705,169034,175594,68310,172377,171931,173525,32057,171747,168019,170602,171255,175819,168751,168851,173477,41692,168850,170187,174689,127555,147220,172721,173133,171918];
        this.dataForWidgetAlsoDealsIn = this.props.relatedMCATData && this.props.relatedMCATData.Data && this.props.relatedMCATData.Data[0] && this.props.relatedMCATData.Data[0].RELATED_PRODUCTS;
    }

    populateCityBubbles() {
        filterCities({ cityname: this.props.pdpCity, cityid: this.props.pdpCityId }, this.cookieVal ).then((data)=>{
            let res = []
            data.forEach(function(val, key) {
                if(val && key)
                res.unshift({ city_id: key, city: val });
            });
            this.setState({cityList : res});
        });
    }

    loadAds() {
        if(!this.state.GoogleAds) {
            import(
                /* webpackChunkName:"GoogleDFP" */ "../../App/components/GoogleDFP"
              ).then((module) => {
                this.setState({ GoogleAds: module.default });
              });
        }
        window.removeEventListener("scroll", this.loadAds)
    }

    geoLocCallBck(lat, long, geoErr) {
        this.setState({ geoLocState: 'Loading' });
        let err = () => {
            this.setState({ geoLocState: 'Unable to detect Location' });
        },
        succ = (cityname, cityid) => {
            // console.log(cityname, cityid, this.state.cityList);
            //check if geo loc city is already there in the list
            if(this.state.cityList.length>0) {
                let isCityFound = this.state.cityList.map((cityVal)=>{
                   return cityVal.city_id
                }).indexOf(cityid)
                if(isCityFound<0) {
                    let currentCityList = [...this.state.cityList, {
                        city_id : cityid,
                        city : cityname
                    }];
                    this.setState({cityList : currentCityList })
                }
            }
            this.setState({geolocClicked : true});
            this.cityClick(cityname, cityid)
        }
        if (geoErr) {
            err();
        }
        else {
try {
            getCityWithLatLong(lat, long).then(data => {
                if (data && data.response && data.response.CODE == 200) {
                    this.setState({ geoLocState: '' });
                    succ(data.response.cityname.toLowerCase(),
                        data.response.cityid);
                }
                else {
                    err();
                }
            }, error => {
                // console.log(error);
                err();
            })
        }
            catch (error) {
                // console.log(error)
            }
        }
    }
    callApi(mcat_id, city_id = "", prod_count = "6", ecom_flag = "", city="") {
        if (mcat_id && !isNaN(mcat_id)) {
            let city_id1=city_id
            if(city_id1=="allindia") city_id1="";
            try {
            getrelatedproducts(mcat_id, city_id1, prod_count, ecom_flag).then((data)=>{
                if(data && data.status =="200" && data.statusText =="ok" && data.response && data.response.Status==200 && data.response.Msg=="Success")

                this.setState({
                    recommendedMcatData : data.response['RECOMMENDED MCAT DATA'] ? data.response['RECOMMENDED MCAT DATA'] : [],
                    recommendedData : data.response['RECOMMENDED DATA']? data.response['RECOMMENDED DATA'] : [],
                    // selectedCity:
                    // {
                    //     city_id : city_id,
                    //     city : city
                    // }
                })
            });
        } catch (error) {
            // console.log(error);
        }
        }
    }

    moveToTop(city, cityId) {
        this.setState({
            selectedCity:{
                city: city,
                city_id : cityId
            }
        })

        if(this.state.cityList.length>0) {
            let cityIndex = this.state.cityList.map((cityVal) => {
                return cityVal.city_id
            }).indexOf(cityId);
            let arr = this.state.cityList
            if (cityIndex !== -1) {
                arr.splice(cityIndex, 1);
                arr.unshift({
                    city: city,
                    city_id : cityId
                });
                this.setState({cityList: arr})
            }
            else if(cityId!=="allindia"){
                //new city found
                arr.unshift({
                    city: city,
                    city_id : cityId
                });
                this.setState({cityList: arr})
            }
            } 
      }

    cityClick(city, cityId, index) {
        this.moveToTop(city, cityId);
        let eventLabel = cityId=="allindia" ? "All-India" : `city_selected-${index+1}-${city.toLowerCase().replace(/\s+/g, '-')}`
        eventTracking("Product-Page-Clicks", "Location-Widget", eventLabel, true)
        //if same city is selected, then move to All India
        if(this.state.selectedCity.city_id && this.state.selectedCity.city_id == cityId && this.state.selectedCity.city_id!="allindia") {
            this.setState({
                selectedCity:{
                    city: "All India",
                    city_id : "allindia"
                }
            })
            this.callApi(this.props.mcat_id, "allindia", "10", this.props.ecom_flag, city )
        }
        else if(cityId=="allindia" && this.state.selectedCity.city_id && this.state.selectedCity.city_id == cityId && this.state.selectedCity.city_id=="allindia") {
            //don't hit API
           
        }
        else if(cityId && this.props.pdpCityId==cityId) {
            if(window._Related_STORE && window._Related_STORE.relatedData) {
                this.setState({
                    recommendedMcatData : window._Related_STORE.relatedData['RECOMMENDED MCAT DATA'],
                    recommendedData : window._Related_STORE.relatedData['RECOMMENDED DATA'],
                })
            }
            else  {
                this.callApi(this.props.mcat_id, cityId, "10", this.props.ecom_flag, city )
            }
        }
        //if different city then hit api
        else if(cityId && this.props.pdpCityId!=cityId) {
            this.callApi(this.props.mcat_id, cityId, "10", this.props.ecom_flag, city )
        }
    }

    componentDidMount() {
        //if user clicked on any city on server side
        //no interaction on server
        if(window._Related_STORE && window._Related_STORE.relatedData) {
        let cityInitObj = {}
        if(this.props.pdpCity && this.props.pdpCityId) {
            cityInitObj.city_id = this.props.pdpCityId;
            cityInitObj.city = this.props.pdpCity
        }
            this.setState({
                recommendedMcatData : window._Related_STORE.relatedData['RECOMMENDED MCAT DATA'],
                recommendedData : window._Related_STORE.relatedData['RECOMMENDED DATA'],
                selectedCity: cityInitObj
            })
        }
        else{
            //hit API
            this.callApi(this.props.mcat_id, this.props.pdpCityId, "10", this.props.ecom_flag, this.props.pdpCity )
        }
        this.populateCityBubbles();
        this.setState({hasLoaded:true})
        window.addEventListener("scroll", this.loadAds, {passive: true})
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.cityList.length>0 && this.state.cityList.length > prevState.cityList.length){
            this.props.pdpCity ? this.moveToTop(this.props.pdpCity, this.props.pdpCityId) : this.state.cityList[0] && this.state.cityList[0].city ? this.moveToTop(this.state.cityList[0].city, this.state.cityList[0].city_id) : "";
        }
        removalTextNodes();
    }

    callBL(mcatid, mcatname, imgurl) {
        let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login'};
        let usermode = loginModes[checkUserStatusFromCookie(this.props.cookie)];
        eventTracking("Product-Page-Clicks", "कोटेशन प्राप्त करें"+"-"+usermode, mcatid+"|BuyleadCTA|PDP|"+usermode)
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let obj = {};
        obj.prNtFndName = '';
        obj.CEF_form_type = '';
        obj.CefProdType = '';
        obj.R_custtype_weight = "";
        obj.affiliationId  ='-116';
        obj.mcatId  = mcatid;
        obj.productName = mcatname;
        obj.query = '';
        obj.queryText = "More-sellers-nearyou-product-Click|" + langSelection;
        obj.modid = 'IMOB';
        obj.productImage=imgurl;
        obj.isEnquiry=false;
        obj.ctaName='कोटेशन प्राप्त करें';
        obj.page= "PDP";
        obj.internaltrack=''
        this.props.showModal(obj);
    }
    filterBubble(city, cityId, index) {
        let citySelectedCSS = ""
        if(this.state.selectedCity && this.state.selectedCity.city_id && this.state.selectedCity.city_id==cityId){
            citySelectedCSS+=(" citySelected "+ (cityId!="allindia" ? "icnCross": ""))
        }
        if(city == "मेरा शहर ढूंढें") {
            if(this.state.geolocClicked) {
                return ''
            }
            return (<li key={Math.floor(Math.random() * 100)}
            onClick={() => {
                if (!this.state.detectLocation) {
                    import(
                      /* webpackChunkName:"detectLocation" */ "../../Widgets/LocationFilter/helper"
                    ).then((module) => {
                      this.setState({ detectLocation: module.detectUserLocation });
                      module.detectUserLocation(this.geoLocCallBck, this.props.eventCategory)
                    });
                }
                eventTracking("Product-Page-Clicks", "Location-Widget", "Near-me", true);
                this.state.detectLocation ? this.state.detectLocation(this.geoLocCallBck, this.props.eventCategory) : "";
            }} className="dib mr10"><span className="bubbleBtn nearMe"><i className="dib vam mr5" style={{ width: '16px', height: '16px' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"><path className="grnlocF" d="M27,0V54" /><path className="grnlocF" d="M0,27H54" /><circle className="grnlocF" cx="27.38" cy="26.63" r="16.88" /><circle className="grnloc-2F" cx="27.38" cy="26.63" r="8.25" /></svg></i><span >{this.state.geoLocState == 'Loading' ? "Detecting...":"मेरा शहर ढूंढें"}</span></span></li>)
        }
        else if(city) {
        return (
            <li key={Math.floor(Math.random() * 100)} onClick={()=> {this.cityClick(city, cityId, index)}}className=" dib mr10 t_tc"><span className={"bubbleBtn"+ citySelectedCSS}>{city}</span></li>
        )
        }
        return ''
    }
    constructFilter(cityList) {
        return (
            <div className="pdt5 oh ">
                        <div className="mt10 pdl5">
                            <ul className="filtr cityFilterRecomMcat scrbrH">
                                {this.filterBubble("मेरा शहर ढूंढें", '-1')}
                                {this.filterBubble("All India", 'allindia')}
                                {cityList.length>0 && cityList.map((cityname, index) => {
                                    return this.filterBubble(cityname.city, cityname.city_id, index)
                                })}
                            </ul>
                            {this.state.geoLocState == 'Unable to detect Location' ? <div class="err fs13 ml5" style="margin-top: -2px;">Unable to detect your location. Select City.</div> : ''}
                        </div>
                    </div>
        )
    }

    setRelProds(datProds) {
        let relProdLSData =localStorage.getItem('relProds2')? JSON.parse(JSON.parse(localStorage.getItem('relProds2'))):[];
        let relProd = {};
        let relProds = [];
        if (datProds && datProds.length > 0) {
            for (let i = 0; i < datProds.length; i++) {
                //relProds2
                relProd = { 'ITEM_NAME': datProds[i]['ITEM_NAME'], 'CONTACT_TYPE': datProds[i]['CONTACT_TYPE'], 'COMPANYNAME': datProds[i]['COMPANYNAME'], 'CONTACT_NUMBER': datProds[i]['CONTACT_NUMBER'], 'COMPANY_LINK': datProds[i]['COMPANY_LINK'], 'COMPANY_URL': datProds[i]['COMPANY_URL'], 'SDA_GLUSR_USR_LOCALITY': datProds[i]['SDA_GLUSR_USR_LOCALITY'], 'CITY_NAME': datProds[i]['CITY_NAME'], 'PRICE': datProds[i]['PRICE'], 'MOQ_PER_UNIT': datProds[i]['MOQ_PER_UNIT'], 'ITEM_ID': datProds[i]['ITEM_ID'], 'IMAGE_125X125': datProds[i]['IMAGE_125X125'],'IMAGE_250X250': datProds[i]['IMAGE_250X250'],'IMAGE_500X500': datProds[i]['IMAGE_500X500'], 'DISPLAY_ID': datProds[i]['DISPLAY_ID'], 'GLCAT_MCAT_FLNAME': datProds[i]['GLCAT_MCAT_FLNAME'], 'GLCAT_MCAT_NAME': datProds[i]['GLCAT_MCAT_NAME'], 'PRD_SEARCH_MOQ_UNIT_TYPE': datProds[i]['PRD_SEARCH_MOQ_UNIT_TYPE'], 'GLUSR_ID': datProds[i]['GLUSR_ID'], 'mcatid': datProds[i]['MCAT_ID'], 'price_f': datProds[i]['PRICE_F'],'PRICE_SEO': datProds[i]['PRICE_SEO'],'pagekey':"|PDP" ,PDP_URL:datProds[i]['PDP_URL'],'ECOM_ITEM_LANDING_URL':datProds[i]['ECOM_ITEM_LANDING_URL'],'ECOM_CART_URL':datProds[i]['ECOM_CART_URL'],'FK_ECOM_STORE_MASTER_ID':datProds[i]['FK_ECOM_STORE_MASTER_ID']};
                relProds.push(relProd);
            }
            let finalData = [...relProds,...relProdLSData];
            let uniqueArray = Array.from(new Set(finalData.map(obj => obj.DISPLAY_ID))).map(DISPLAY_ID => finalData.find(obj => obj.DISPLAY_ID === DISPLAY_ID));
            uniqueArray=uniqueArray?uniqueArray.slice(0,10):''; 
            localStorage.setItem('relProds2', JSON.stringify([JSON.stringify(uniqueArray)]));
        
        }
    }

    PopularCardList(relatedData) {

        let showEcomProducts = this.props.data.ECOM_ITEM_LANDING_URL && this.props.data.PC_ITEM_IS_ECOM && this.props.data.ECOM_STORE_ENABLE_FLAG && this.props.data.ECOM_STORE_ENABLE_FLAG==1 ? true : false

        //set relProds2
        this.props.showModal=="" ? "" : this.setRelProds(relatedData);

        let Plist = [];
        let indexLen = relatedData && relatedData.length >= 7 ? 6 : relatedData.length;
        for (let index = 0; index < indexLen; index++) {
            if(relatedData[index].DISPLAY_ID != this.props.data.PC_ITEM_DISPLAY_ID && relatedData[index].ITEM_NAME) {
            let imageSrc = relatedData[index].IMAGE_250X250 ? relatedData[index].IMAGE_250X250 : relatedData[index].IMAGE_125X125 ? relatedData[index].IMAGE_125X125 : relatedData[index].IMAGE_500X500 ? relatedData[index].IMAGE_500X500 : 'https://m.imimg.com/gifs/bgIM50.webp';
            imageSrc = modifyImgSrc(imageSrc);
            let productUrl = relatedData[index].PDP_URL;
            let productName = relatedData[index].ITEM_NAME ? relatedData[index].ITEM_NAME : relatedData[index].PC_ITEM_DISPLAY_NAME;
            let companyUrl = relatedData[index].PLA_TRACKING_URL? relatedData[index].PLA_TRACKING_URL : relatedData[index].COMPANY_LINK ? relatedData[index].COMPANY_LINK : relatedData[index].COMPANY_URL;
            companyUrl = companyUrl.replace('http://', 'https://');
            let locality = relatedData[index].SDA_GLUSR_USR_LOCALITY ? relatedData[index].SDA_GLUSR_USR_LOCALITY.replace("\n", "") : "" ;
            let localitySubstr = locality.substr(0, 70);
            locality = locality ? (localitySubstr + (relatedData[index].CITY_NAME&&localitySubstr&&relatedData[index].CITY_NAME===localitySubstr?'':', ')) : "";
            let address = locality + ((relatedData[index].CITY_NAME&&localitySubstr&&relatedData[index].CITY_NAME===localitySubstr?'':relatedData[index].CITY_NAME))
            let price = relatedData[index].PRICE ? relatedData[index].PRICE_SEO ? relatedData[index].PRICE_SEO  : ('₹' + formatINRPrice(relatedData[index].PRICE)  + (relatedData[index].PRD_SEARCH_MOQ_UNIT_TYPE? ' / ' + relatedData[index].PRD_SEARCH_MOQ_UNIT_TYPE:'')) : "";
            let isEnquirySent = false;
            let contactnumber = (relatedData[index].CONTACT_NUMBER.indexOf("+91") > -1) ? relatedData[index].CONTACT_NUMBER : pns_prefix(relatedData[index].CONTACT_NUMBER);
            let transformedNo =  TransformContactNumber(contactnumber);
            let callProps =
            {
                CONTACT_NUMBER:contactnumber,
                CONTACT_TYPE: relatedData[index].CONTACT_TYPE,
                compname: relatedData[index].COMPANYNAME?relatedData[index].COMPANYNAME:'',
                glusrid: relatedData[index].GLUSR_ID,
                itemId: (relatedData[index].DISPLAY_ID) ? relatedData[index].DISPLAY_ID : relatedData[index].ITEM_ID,
                itemImage: imageSrc,
                mcatid: relatedData[index].MCAT_ID,
                mcatname: relatedData[index].ITEM_NAME,
                dbpagetrack: 'IMOB_PDP_Sellers_Near_You|'+this.props.pageLang,
                page: 'PDP',
                itemName: productName,
                tscode: relatedData[index].ETO_OFR_COMPANY_TSCODE?relatedData[index].ETO_OFR_COMPANY_TSCODE:'',
                eventLabel:('PDP_Find_Nearby_Seller_Prod_')+(index+1),
                eventAction: relatedData[index].CONTACT_TYPE == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS",
                custtypeWeight: relatedData[index].CUSTTYPE_WEIGHT,
                call_txt : "कॉल करें",
                query_ref_id: relatedData[index].MCAT_ID,
                query_ref_type:relatedData[index].ITEM_NAME,
                modrefid: relatedData[index].DISPLAY_ID ? relatedData[index].DISPLAY_ID : relatedData[index].ITEM_ID, 
                modrefname: relatedData[index].ITEM_NAME
            };
            Plist.push(
                <div key={index} className="por bgw mb5 crx pd10 w100" id={relatedData[index].ITEM_ID}>
                    <div className="tl w100 por crb">
                        <div className="fl tc ht150px w150p oh">
                            {this.props.isCSR && this.props.linkTag ?
                            <this.props.linkTag to={productUrl} className="dtc ht150px w150p vam"><div className="tc"><div className="bgimg"><img className="lazy2 objctFitSclDown mnW150" loading="lazy" src={imageSrc} alt={productName} width="150" height="150" /></div></div></this.props.linkTag>
                            :
                            <a href={productUrl} onClick={()=>{
                                setCookie("ImageData",modifyImgSrc(imageSrc));
                            }} className="dtc ht150px w150p vam"><div className="tc"><div className="bgimg"><img className="lazy2 objctFitSclDown mnW150" loading="lazy" src={imageSrc} alt={productName} width="150" height="150" /></div></div></a>}
                        </div>
                        <div className="pdl155 crx">
                        <div className="db mnht99 tl pdl5">
                        <p className="fs17 por pTitle oh lh18 mr20">
                            {this.props.isCSR && this.props.linkTag ?
                            <this.props.linkTag className="wr pTitle maxh60 oh dib lh20" to={productUrl}onClick={()=>{
                                eventTracking("Product-Page-Clicks", "Related-Products", `Product-Name-${index+1}|Gl_id:${relatedData[index].GLUSR_ID}`)
                            }}>{productName}</this.props.linkTag>
                            : 
                            <a className="wr pTitle maxh60 oh dib lh20" href={productUrl}onClick={()=>{
                                setCookie("ImageData",modifyImgSrc(imageSrc));
                            eventTracking("Product-Page-Clicks", "Related-Products", `Product-Name-${index+1}|Gl_id:${relatedData[index].GLUSR_ID}`)
                        }}>{productName}</a>}
                        </p>
                        <p className="pdt5 pdb5 fs16 fw notranslate">
                            {price ? 
                            this.props.isCSR && this.props.linkTag ?
                            <this.props.linkTag className='clr33' to = {productUrl} onClick={()=>{
                                eventTracking("Product-Page-Clicks", "Related-Products", `Product-Price-${index+1}`)
                            }}>{price}</this.props.linkTag>
                            : 
                            <a className='clr33' href = {productUrl} onClick={()=>{
                            eventTracking("Product-Page-Clicks", "Related-Products", `Product-Price-${index+1}`)
                        }}>{price}</a>
                            : 
                            isEnquirySent ? 
                            <span className='clr33'>Price Requested</span>
                             : <span className='clrBl' onClick={
                                ()=>{
                                callEnqForm(relatedData[index].MCAT_ID, relatedData[index].PRICE, relatedData[index].COMPANYNAME, relatedData[index].GLUSR_ID, relatedData[index].ITEM_NAME, relatedData[index].DISPLAY_ID, imageSrc, 'Get Latest Price', this.props.data.CAT_ID, callProps,this.props.showModal,'','','',{},"2")
                                }
                             }>Get Latest Price</span>
                            }
                        </p>
                        <div onClick={()=>{
                            requestAnimationFrame(()=>setTimeout(()=>{eventTracking("Product-Page-Clicks", "Related-Products", `Company-Name-${index+1}|Gl_id:${relatedData[index].GLUSR_ID}`)}))
                        }}>
                        <p className="por oh fs14 pdt5 pdb5">
                            {this.props.isCSR && this.props.linkTag ? 
                            <this.props.linkTag to={companyUrl} className="clr33 fls14 elipsis dib notranslate">{relatedData[index].COMPANYNAME}</this.props.linkTag> : 
                            <a href={companyUrl} className="clr33 fls14 elipsis dib notranslate">{relatedData[index].COMPANYNAME}</a>}
                        </p>
                        <p className="por oh fs14 pdb5" ><span className="clr5a ellipsis fl"><i className="fl mml5 locationIcn"></i>{address}</span></p></div>
                        </div></div>
                    </div>
                    <div className='por w100 btm0 tc mt10 dib'>
                    {showEcomProducts ? <Buynow data={{ECOM_CART_URL:relatedData[index].ECOM_CART_URL,ECOM_ITEM_LANDING_URL:relatedData[index].ECOM_ITEM_LANDING_URL,ECOM_STORE_NAME:this.props.data.ECOM_STORE_NAME,GLUSR_ID:relatedData[index].GLUSR_ID,PC_ITEM_DISPLAY_ID:relatedData[index].DISPLAY_ID, eventAction: "Related-Products"}}/> :
                    <CTA data={this.props.data} showModal={this.props.showModal} mcatId={relatedData[index].MCAT_ID} Price={relatedData[index].PRICE} CompanyName={relatedData[index].COMPANYNAME} GlusrId={relatedData[index].GLUSR_ID} ItemName={relatedData[index].ITEM_NAME} DisplayId={relatedData[index].DISPLAY_ID} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} enqCtaDisabled={this.props.enqCtaDisabled} imgurl={imageSrc} ctaName={"सर्वोत्तम मूल्य प्राप्त करें"} catId={this.props.data.CAT_ID} callProps={callProps} pdpModrefType={"2"} displayPopup={() => {
                    this.props.callNowClick("कॉल करें",
                    imageSrc,callProps.tscode, callProps.compname,
                        callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                        callProps.itemId, callProps.itemName,callProps.mcatid,callProps.mcatname,callProps.dbpagetrack)
                    }} calledCTAsFrom="relatedProducts" eventLabel={callProps.eventLabel} index={index} transformedNo={transformedNo}/>
                }</div>
                 {relatedData.length>4 && index==2 && this.state.GoogleAds && this.props.data.GLUSR_USR_ADULT_FLAG === 0
                 ? <this.state.GoogleAds pdpdata={this.props.data} 
                 type={'product detail'} 
                 data={{ name: '/3047175/Msite_PDP_Between_Similar_Products', id: 'div-gpt-ad-1580806668794-0', res: [[320, 100], [300, 100], [320, 150], [320, 250], [300, 150], [300, 250], [336, 280], [400, 300]] }} />
                 : ""}
                </div>
                )
        }
        }
        if(Plist.length>0) {
        let cityName = this.state.selectedCity && this.state.selectedCity.city ?  this.state.selectedCity.city.toLowerCase().replace(/\s+/g, '-') : '';
        cityName = cityName && cityName !=="all-india" ? `city/${cityName}` :  "impcat";
        let viewallurl = `https://m.indiamart.com/${cityName}/${this.props.data.BRD_MCAT_FLNAME}.html`;
        Plist.push(<div  onClick={()=>{
            eventTracking("Product-Page-Clicks", "Related-Products", "View-All-Mcat")
        }} key={"ViewAll"}>
        {/* {this.props.isCSR && this.props.linkTag ?
        <this.props.linkTag className="db clr33 pdt15 pdlr15 pdb15 fs16 m10 bxrd20 fw bdrmim mb5 mxht1000" to={viewallurl}><span className="dib w90 vat">View all products in {this.props.data.BRD_MCAT_NAME}</span><span className="fr">&gt;</span></this.props.linkTag> : 
        <a className="db clr33 pdt15 pdlr15 pdb15 fs16 m10 bxrd20 fw bdrmim mb5 mxht1000" href={viewallurl}><span className="dib w90 vat">View all products in {this.props.data.BRD_MCAT_NAME}</span><span className="fr">&gt;</span></a>} */}
        </div>)
        }

        return (Plist);
    }

    exCardsList(relatedMcatData, pdpCity) {
        let relatedData = relatedMcatData;
        let LiList = []; 
        for (let index = 0; index < relatedData.length; index++) {
            if(relatedData[index].GL_CITY_ID) {
            let Mctid = (index !== ((relatedData.length)-1))? relatedData[index].IIL_DIR_REL_MCAT_ID : relatedData[(relatedData.length)-1].GLCAT_MCAT_ID;
            let isSWIMUrl = Mctid ? this.mcatSWIMArray.includes(parseInt(Mctid)) : false;
            let MctName = relatedData[index].IIL_DIR_REL_MCAT_NAME?relatedData[index].IIL_DIR_REL_MCAT_NAME:relatedData[index].GLCAT_MCAT_NAME;
            let mcatUrl = relatedData[index].URL;
            mcatUrl = mcatUrl ? mcatUrl.replace('dir.indiamart', 'm.indiamart') : "";
            mcatUrl = mcatUrl && !mcatUrl.includes('impcat') ? mcatUrl.replace('https://m.indiamart.com', 'https://m.indiamart.com/city') : "";
            let imageSrc = relatedData[index].GLCAT_MCAT_IMG1_125X125 ? relatedData[index].GLCAT_MCAT_IMG1_125X125 : relatedData[index].GLCAT_MCAT_IMG1_250X250 ? relatedData[index].GLCAT_MCAT_IMG1_250X250 : relatedData[index].GLCAT_MCAT_AUTOIMAGE ? relatedData[index].GLCAT_MCAT_AUTOIMAGE : 'https://m.imimg.com/gifs/bgIM50.webp';
            imageSrc = modifyImgSrc(imageSrc);
            LiList.push(<li key={index} className="mnW135 mnH125 w36 br1 tc crx bgw">
                <div className="pdt10 pdb10">
                    {this.props.isCSR && this.props.linkTag ? 
                    <this.props.linkTag className="db" to={mcatUrl} onClick={()=>{
                        requestAnimationFrame(()=>setTimeout(()=>{eventTracking("Product-Page-Clicks","City-Mcat-Listing",index + 1,true);}))
                    }}>
                        <div className="hw115  flx jstyfyCenter algnCenter ma oh vam bgimg">
                            <img className="mxhw115 objctFitSclDown" src={imageSrc} alt={MctName} width="115" height="115" loading='lazy'/>
                        </div>
                    </this.props.linkTag>
                    :
                    <a className="db" href={mcatUrl} onClick={()=>{
                        requestAnimationFrame(()=>setTimeout(()=>{eventTracking("Product-Page-Clicks","City-Mcat-Listing",index + 1,true);}))
                    }}>
                        <div className="hw115  flx jstyfyCenter algnCenter ma oh vam bgimg">
                            <img className="mxhw115 objctFitSclDown" src={imageSrc} alt={MctName} width="115" height="115" loading='lazy'/>
                        </div>
                    </a>}
                    {this.props.isCSR && this.props.linkTag ? 
                    <this.props.linkTag className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20" to={mcatUrl} onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",index + 1,true);
                    }}>{MctName}</this.props.linkTag>
                    :
                    <a className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20" href={mcatUrl} onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",index + 1,true);
                    }}>{MctName}</a>}
                    {this.props.isCSR && this.props.linkTag ? 
                    <this.props.linkTag to={mcatUrl} className="db"><span className="db fs13 clr33 pdt5 pdb10 t_tc" onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",index + 1,true);
                    }}>
                        <i className="locationIcn mrr3 dib" ></i>{relatedData[index].GL_CITY_NAME}</span></this.props.linkTag>
                    :
                    <a href={mcatUrl} className="db"><span className="db fs13 clr33 pdt5 pdb10 t_tc" onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",index + 1,true);
                    }}>
                        <i className="locationIcn mrr3 dib" ></i>{relatedData[index].GL_CITY_NAME}</span></a>}
                    {isSWIMUrl 
                    ? <span className="dib clrw bgmim fs15 fw bxrd20 w90 pd810"><a target="_blank" href=" https://shipwith.indiamart.com/book?utm_source=msite&utm_medium=im_pdp&utm_campaign=Get+Quotes&afl_id=-902"><span className="ENQ_LABEL1 clrw">कोटेशन प्राप्त करें</span></a></span>
                    :<span onClick={(event)=>{this.callBL(Mctid,MctName,imageSrc);}}className="dib clrw bgmim fs15 fw bxrd20 w90 pd810" id={`Get_Quotes${index}`} buttontype={`enquiry|कोटेशन प्राप्त करें|Get_Quotes${index}`} data-image={imageSrc} data-name={MctName} data-display-id={this.props.data.PC_ITEM_DISPLAY_ID}>
                        <span className="ENQ_LABEL1">कोटेशन प्राप्त करें</span></span>}</div>
            </li>)
            }
        }
       
        if(LiList.length>0) {
             //pdp first card of same MCAT
        //same city product card logic
        let sameProductCity = relatedMcatData.length>0 &&  relatedMcatData[relatedMcatData.length-1] && relatedMcatData[relatedMcatData.length-1].GL_CITY_NAME ? relatedMcatData[relatedMcatData.length-1].GL_CITY_NAME : this.props.pdpCity;
        let brdMcatFlName = (this.props.data.BRD_MCAT_FLNAME ? this.props.data.BRD_MCAT_FLNAME : this.props.data.PARENT_MCAT.GLCAT_MCAT_FLNAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_FLNAME : "");
        let brdMcatName = (this.props.data.BRD_MCAT_NAME ? this.props.data.BRD_MCAT_NAME : this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME : "");
        let sameCityMcat = relatedMcatData.length>0 &&  relatedMcatData[relatedMcatData.length-1] && relatedMcatData[relatedMcatData.length-1].GLCAT_MCAT_NAME ? relatedMcatData[relatedMcatData.length-1].GLCAT_MCAT_NAME : brdMcatName;
        let sameCityFlName = relatedMcatData.length>0 &&  relatedMcatData[relatedMcatData.length-1] && relatedMcatData[relatedMcatData.length-1].GLCAT_MCAT_FLNAME ? relatedMcatData[relatedMcatData.length-1].GLCAT_MCAT_FLNAME : brdMcatFlName;
        let cityName = this.props.data.CITY ? this.props.data.CITY.toLowerCase() : "";
        let brdMcatFlNameUrl = '/' + brdMcatFlName + '.html';
        let cityUrl = 'https://m.indiamart.com/city/' + cityName + brdMcatFlNameUrl;
        let cityUrlsArr = cityUrl.split("/");
        let firstCardCityName = "";

        if(this.state.selectedCity && this.state.selectedCity.city == "All India") {
            firstCardCityName = "All India";
            cityUrlsArr.splice(3, 1); 
            cityUrlsArr[3] = 'impcat';
            cityUrlsArr[4] = sameCityFlName+'.html';
        }
        else {
            firstCardCityName = sameProductCity;
            cityUrlsArr[4] = sameProductCity;
            cityUrlsArr[5] = sameCityFlName+'.html';
        }
        let cityURLsProductUpdated = cityUrlsArr.join("/");
        cityURLsProductUpdated = cityURLsProductUpdated.toLowerCase();
        cityURLsProductUpdated = cityURLsProductUpdated.replace(/\s+/g, "-"); 

        let url = cityURLsProductUpdated;
        let pattern = /\/city\/([^/]+)/;
        let match = url&&url.match(pattern);
        let city_name = match&&match[1];
        if(city_name==null){
            cityURLsProductUpdated=sameCityFlName?'https://m.indiamart.com/impcat/'+sameCityFlName+'.html':'https://m.indiamart.com/impcat'
        }
        if(!firstCardCityName){
            firstCardCityName='All India'
        }
            let isSWIMUrl = this.props.mcat_id ? this.mcatSWIMArray.includes(parseInt(this.props.mcat_id)) : false;
            LiList.unshift(
                <li key={0} className="mnW135 mnH125 w36 br1 tc crx bgw">
                <div className="pdt10 pdb10">
                    {this.props.isCSR && this.props.linkTag ?
                    <this.props.linkTag className="db" to={cityURLsProductUpdated} onClick={()=>{
                        requestAnimationFrame(()=>setTimeout(()=>{eventTracking("Product-Page-Clicks","City-Mcat-Listing",0,true);}))
                    }}>
                        <div className="hw115  flx jstyfyCenter algnCenter ma oh vam bgimg">
                            <img className="mxhw115 objctFitSclDown" src={this.props.firstimage} alt={sameCityMcat} width="115" height="115" loading='lazy'/>
                        </div>
                    </this.props.linkTag>
                    :
                    <a className="db" href={cityURLsProductUpdated} onClick={()=>{
                        requestAnimationFrame(()=>setTimeout(()=>{eventTracking("Product-Page-Clicks","City-Mcat-Listing",0,true);}))
                    }}>
                        <div className="hw115  flx jstyfyCenter algnCenter ma oh vam bgimg">
                            <img className="mxhw115 objctFitSclDown" src={this.props.firstimage} alt={sameCityMcat} width="115" height="115" loading='lazy'/>
                        </div>
                    </a>}
                    {this.props.isCSR && this.props.linkTag ? 
                    <this.props.linkTag className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20" to={cityURLsProductUpdated} onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",0,true);
                    }}>{sameCityMcat}</this.props.linkTag>
                    :
                    <a className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20" href={cityURLsProductUpdated} onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",0,true);
                    }}>{sameCityMcat}</a>}
                    {this.props.isCSR && this.props.linkTag ?
                    < this.props.linkTag href={cityURLsProductUpdated} onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",0,true);
                    }} className="db"><span className="db fs13 clr33 pdt5 pdb10 t_tc">
                        <i className="locationIcn mrr3 dib" ></i>{firstCardCityName}</span></ this.props.linkTag>
                    :
                    <a href={cityURLsProductUpdated} onClick={()=>{
                        eventTracking("Product-Page-Clicks","City-Mcat-Listing",0,true);
                    }} className="db"><span className="db fs13 clr33 pdt5 pdb10 t_tc">
                        <i className="locationIcn mrr3 dib" ></i>{firstCardCityName}</span></a>}
                    {isSWIMUrl 
                    ? <span className="dib clrw bgmim fs15 fw bxrd20 w90 pd810" onClick={()=>eventTracking("Product-Page-Clicks","SWIM",this.props.mcat_id)}><a target="_blank" href=" https://shipwith.indiamart.com/book?utm_source=msite&utm_medium=im_pdp&utm_campaign=Get+Quotes&afl_id=-902"><span className="ENQ_LABEL1 clrw">कोटेशन प्राप्त करें</span></a></span>
                    :<span onClick={(event)=>{this.callBL(this.props.mcat_id,sameCityMcat,this.props.firstimage);}}className="dib clrw bgmim fs15 fw bxrd20 w90 pd810" id={`Get_Quotes0`} buttontype={`enquiry|कोटेशन प्राप्त करें|Get_Quotes0`} data-image={this.props.firstimage} data-name={sameCityMcat} data-display-id={this.props.data.PC_ITEM_DISPLAY_ID}>
                        <span className="ENQ_LABEL1">कोटेशन प्राप्त करें</span></span>}</div>
            </li>
            )
        }

        return (LiList);
    }

    setRelCats(relatedMCATData) {
        let relcat = {};
        let relCats = [];
        if (relatedMCATData.length > 0) {
            for (let i = 0; i < relatedMCATData.length; i++) {
              relcat = {
                GLCAT_MCAT_ID: relatedMCATData[i]["IIL_DIR_REL_MCAT_ID"]
                  ? relatedMCATData[i]["IIL_DIR_REL_MCAT_ID"]
                  : relatedMCATData[i]["GLCAT_MCAT_ID"],
                GLCAT_MCAT_NAME: relatedMCATData[i]["IIL_DIR_REL_MCAT_NAME"]
                  ? relatedMCATData[i]["IIL_DIR_REL_MCAT_NAME"]
                  : relatedMCATData[i]["GLCAT_MCAT_NAME"],
                GLCAT_MCAT_FLNAME: relatedMCATData[i]["IIL_DIR_REL_MCAT_FLNAME"]
                  ? relatedMCATData[i]["IIL_DIR_REL_MCAT_FLNAME"]
                  : relatedMCATData[i]["GLCAT_MCAT_FLNAME"],
                GLCAT_MCAT_IMG1_125X125: relatedMCATData[i]["GLCAT_MCAT_IMG1_125X125"],
                Pagekey:'|PDP'
              };
              relCats.push(relcat);
            }
            localStorage.setItem("relCats",JSON.stringify([JSON.stringify(relCats)]));
          }
    }

    exploreSimilarDiv(relatedMCATData, city, city_id, cityListData) {
        this.props.showModal=="" ? "" : this.setRelCats(relatedMCATData);
        
        return (
            <section id="SlrNearMe" className="w100">
                <p className="fs17 bgw fw pdt5 mxht1000">
                    <span className="pd5 pdl10 pdt10 db t_tc">समान उत्पाद खोजें <span className='ttc'>{city && city!="All India" ? ("Near "+city) : "!"}</span></span>
                </p>
                <div className="bgw oh">
                    {this.constructFilter(cityListData)}
                    <div className="relatedMoreCat pdt5 scrbrH">
                        <ul id="listUL">
                            {this.exCardsList(relatedMCATData, city)}
                        </ul>
                    </div>
                </div>
            </section>
        )
    }

    findPopularDiv(data, city, city_id, cityListData) {
        return(
            <div id="recentMcat" className="rlprod bgw btmtop db oh">
                    <div className=" pdb5 pl5">
                        <div className="fs18">
                            <p className="db pdt10 ml10 mr10 mxht1000 clrb fs17 fw mt5 t_tc" id="pdpRelatedWidget">
                            लोकप्रिय विक्रेता खोजें <span className='ttc'> {city && city!="All India" ? ("Near " + city) : "!"}</span>
                            </p>

                            {/* <div className="mt10"> */}
                                <ul className="filtr cityFilterRecomMcat scrbrH">
                                    {this.constructFilter(cityListData)}
                                </ul>
                            {/* </div> */}
                        </div>
                    </div>
                    {this.PopularCardList(data)}
                </div>
        );
    }

    render() {
        let data=[], mcatData=[], city="", city_id="", cityListData=[];
        if(!this.state.hasLoaded)
        {
            data = this.props.relatedMCATData && this.props.relatedMCATData["RECOMMENDED DATA"] && this.props.relatedMCATData["RECOMMENDED DATA"].length>0 ?  this.props.relatedMCATData["RECOMMENDED DATA"] : []
            mcatData = this.props.relatedMCATData && this.props.relatedMCATData["RECOMMENDED MCAT DATA"] && this.props.relatedMCATData["RECOMMENDED MCAT DATA"].length ? this.props.relatedMCATData["RECOMMENDED MCAT DATA"] : []
            city = this.props.pdpCity
            city_id = this.props.pdpCityId;
            cityListData = this.initialCityList
        } 
        else{
            data = this.state.recommendedData;
            mcatData = this.state.recommendedMcatData;
            city = this.state.selectedCity.city
            city_id = this.state.selectedCity.city_id
            cityListData = this.state.cityList
        }
        // console.log(data, mcatData, city, city_id);
        return (
            <React.Fragment>
             {mcatData.length>0 && !this.props.isEcom? this.exploreSimilarDiv(mcatData, city, city_id, cityListData) : ""}
             {data.length>0 ? this.findPopularDiv(data, city, city_id, cityListData) : ""}
            {mcatData.length>0 && this.props.isEcom ? this.exploreSimilarDiv(mcatData, city, city_id, cityListData) : ""}
            </React.Fragment>
        );
    }
}

export default RecommendedWidgets;