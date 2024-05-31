import React from 'react'
import Views from './Views';
import fetchProductDetail from '../utility/ServiceHandler/fetchProductDetail';
import { getCookie } from '../../../Globals/CookieManager';
import vernacularData from '../utility/VernacularData';
import { geolocationHandler } from '../../../Globals/geoLocation';
import { imStore } from '../../../store/imStore';
// import Header from '../../Header/HeaderContainer';
// import ErrorContainer from '../../Errors/ErrorContainer'; 
import { eventTracking, gaTrack } from '../../../Globals/GaTracking';
// // import CallNowController from '../../CallNow/container/CallNowContainer';
import { connectionChecking4g } from '../../../Globals/2gconnection';
// import { update_variables } from '../../CentralizePopUp/utility/helper';

export default class ProductDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.suggObj = [];
        this.state = { pageLang: '', translatedTxt: '', firstViewData: '', pdp5XX: false, pdp404: false, showLoader: true, country_ip: '', country_iso: '', country_name: '', Footer: '', pdp404ViewData:'' ,Header:'', Error5XX:''};
        this.updatePDPdata = this.updatePDPdata.bind(this);
        this.onLangChange = this.onLangChange.bind(this);
        this.loadHeader=this.loadHeader.bind(this);
        window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        window.refUrl = [document.referrer];
        this.viewKey = 1;
        setTimeout(() => {
            geolocationHandler().then((data) => {
                this.setState({
                    country_ip: data.country_ip,
                    country_iso: data.country_iso,
                    country_name: data.country
                })
            });      
          },0)
          this.eventType = 'pointerdown';
          if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
              this.eventType = 'click';
          }
              
    }

    getSuggobj(mcatId,catId) {
        let obj =  {
                "cats": catId ? catId : "",
                "mcats": mcatId? mcatId: "",
                "mcatnames": ""
            };
        return obj;
    }
    loadHeader() {
        // if(!this.state.Header) {
        //     import(/* webpackChunkName:"Header" */ '../../Header/HeaderContainer').then((module) => {
        //         this.setState({ Header: module.default });
        //     })
        // }
        if(window._PDP_STORE && window._PDP_STORE.pdp5XX==true && !this.state.Error5XX) {
            import(/* webpackChunkName:"Error5XX" */ '../../Errors/ErrorContainer').then((module) => {
                this.setState({ Error5XX: module.default });
            })
        }
        let rumTrackingLabel = '_NewPdp';
        // import(/* webpackChunkName:"RUMTracking"*/"../../CentralizePopUp/utility/App/TTFBtracking").then(module=>{module.TTFBtracking(`PDP${rumTrackingLabel}`)});
        window.removeEventListener(this.eventType, this.loadHeader, { passive: true });
            window.removeEventListener('scroll', this.loadHeader, { passive: false });       
            window.removeEventListener('click', this.loadHeader, { passive: false });
    }  
    parseDisplayID(path) {
        try {
            path = path.split('/')[2].split('.html')[0].split('-');
            let dispID = path[path.length - 1];
            if (Number(dispID)) {
                return dispID;
            }
            else //Invalid URL
            {
                return false
            }
        }
        catch (error) {
            return false;
        }
    }
    onLangChange(lngType) {
        let pageLang = lngType == 1 ? "LangHi" : "LangEn";
        this.setState({ pageLang: pageLang, translatedTxt: vernacularData.getVernacularData()[lngType] });
    }
    updatePDPdata(pdpData, is404 = false, is5XX = false, pdp404Data = false) {
        let lngType = getCookie('lang'),
            pageLang = lngType == "1" ? "LangHi" : "LangEn";
        lngType = lngType ? lngType : 0;
        //video indexing handling 
        if(pdpData && pdpData.PC_ITEM_DESC_SMALL && pdpData.GLUSR_PROFILE_MEDIA_URL==="") {
            let check= pdpData.ITEM_DOCS ? pdpData.ITEM_DOCS.pc_item_doc_type_id : ""
            let isVideoNeeded = pdpData.ITEM_DOCS != undefined && pdpData.ITEM_DOCS.pc_item_doc_type == "VIDEO" && check && check >= 1 && check <= 6 ? true : false;
            if(!isVideoNeeded && (/\<iframe.*src\=\"https:\/\/www\.youtube\.com\/embed/).test(pdpData.PC_ITEM_DESC_SMALL)) {
                let matchArr =  pdpData.PC_ITEM_DESC_SMALL.match(/"https:\/\/www\.youtube\.com\/embed\/([^"]*")/)
                if(matchArr && matchArr.length>0 && matchArr[0]) {
                    pdpData.GLUSR_PROFILE_MEDIA_URL = matchArr[0];
                    pdpData.empty_video_flag = true;
                }
            }
        }
        this.suggObj = pdpData? this.getSuggobj(pdpData.BRD_MCAT_ID,pdpData.CAT_ID): pdp404Data? this.getSuggobj(pdp404Data.BRD_MCAT_ID,pdp404Data.CAT_ID):'';
        
        this.setState({ pageLang: pageLang, translatedTxt: vernacularData.getVernacularData()[lngType], firstViewData: pdpData, pdp5XX: is5XX, pdp404: is404, pdp404ViewData: pdp404Data, showLoader:false });
    }
    requestInitialPDPData() {
        let dispID = this.parseDisplayID(location.pathname);
        if (dispID) {

            fetchProductDetail(dispID).then((data) => {
                if (data.response && data.statusText == 'ok') //status-OK
                {
                    if(data.response.Msg && data.response.Msg=="No Data Found" && data.response.Status && data.response.Status==400) {
                        this.updatePDPdata('', true, false);
                    }
                    else {
                    this.updatePDPdata({...data.response[0], 'DATA_FETCHING_FROM_API':false});
                    }
                }
                else if (data.statusText == 'client-error') {
                    this.updatePDPdata('', true, false);
                }
                else if (data.statusText === "service-timeout") {
                    this.setState({ showLoader: false });
                    imStore.dispatch({ type: 'SET_PAGE_ERROR', payload: { pageError: 'timeout' } })
                }
                else //Server error or time out
                {
                    this.setState({ showLoader: false });
                    imStore.dispatch({ type: 'SET_PAGE_ERROR', payload: { pageError: 'siteDown' } })
                }
            }, (error) => {
                this.setState({ showLoader: false });
                imStore.dispatch({ type: 'SET_PAGE_ERROR', payload: { pageError: 'siteDown' } })
            })
        }
        else//Invalid Display ID
        {
            this.updatePDPdata('', true, false);
        }
    }

    handleFirstViewPDPdata() {
        if (window._PDP_STORE && window._PDP_STORE['pdpFirstFold']) {//Data already available
            if(window._PDP_STORE['pdp5XX']){
            this.setState({ showLoader: false });
            imStore.dispatch({ type: 'SET_PAGE_ERROR', payload: { pageError: 'siteDown' } });
            }else{
                this.updatePDPdata(window._PDP_STORE['pdpData'], window._PDP_STORE['pdp404'], window._PDP_STORE['pdp5XX'], window._PDP_STORE['pdp404Data']);
            }
        }
        else {//fetch PDP data through XHR
                this.requestInitialPDPData();
        }
    }
    componentWillUnmount() {
        if (window._PDP_STORE)
            window._PDP_STORE["pdpFirstFold"] = false;
        window.removeEventListener('popstate', this.onPopHistory);
        window.removeEventListener('popstate', this.onPopHistoryPHP);
        window.refUrl = [location.href];
        let belowHeader = document.getElementById("belowHeader");
        belowHeader ? belowHeader.parentNode.removeChild(belowHeader) : ""; 
        delete window.pdpLcpNew;  
        delete window.enquiryClick;
        delete window.callClick;
        delete window.PDPdiv;
    }

    onPopHistoryPHP(event) {
            if (window.refUrl[window.refUrl.length - 1] == "somePopUp") {
              window.refUrl.pop();
          
            }
            else if(window.refUrl[window.refUrl.length-1] == "extendedPDP") {
                window.refUrl.pop();
                setTimeout(()=>{
                    document.getElementById('imPWAHeader').scrollIntoView({behavior:'smooth'}) 
                }, 0)
            }
            else {    history.replaceState("", "", "/");
              window.location.reload();
          }
            
    }
    componentDidMount() {
        window.onerror = (msg, url, lineNo, columnNo, error) => {
            eventTracking('PDP_Page',msg, `${url} | ${lineNo} | ${columnNo}`,true);
            return true;
        }
        document.getElementById('page_name').value = "PDP";
        window.pagename = "PDP";
        window.pageName = "PDP";
        this.handleFirstViewPDPdata();
        // update_variables();
        let multi_purposeVal = localStorage.getItem("multi_purpose") ? JSON.parse(localStorage.getItem("multi_purpose")) : "";
        let viewCount = multi_purposeVal ? multi_purposeVal["userViewCount"] : "";
        if(viewCount>1 || connectionChecking4g()) {
            this.loadHeader();
        } else {
            window.addEventListener(this.eventType, this.loadHeader, { passive: true });
            window.addEventListener('scroll', this.loadHeader, { passive: false });       
            window.addEventListener('click', this.loadHeader, { passive: false });       
        }
        if (history.state && history.state.type == "modifyBack") {//back from some php page
            window.addEventListener('popstate', this.onPopHistoryPHP);
        }
        else if (window.refUrl.length == 1 && navigator.userAgent.indexOf('CriOS') ==-1&& (window.refUrl[0] == '' || window.refUrl[0].indexOf('indiamart.com') === -1)) {
            history.pushState({ type: "modifyBack" }, location.pathname, "")
            window.addEventListener('popstate', this.onPopHistory);

        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.viewKey = this.viewKey+ 1;
            window.scrollTo(0, 0);
            // update_variables();
            if (window._PDP_STORE)
                window._PDP_STORE["pdpFirstFold"] = false;

            this.setState({ pageLang: '', translatedTxt: '', firstViewData: '', pdp5XX: false, pdp404: false, showLoader: true, country_ip: '', country_iso: '', country_name: '', Footer: '' });

            if (window.refUrl[window.refUrl.length - 1] !== this.props.location.pathname) {
                window.refUrl[window.refUrl.length - 1] == "extendedPDP" ? window.refUrl.pop() : ""
                window.refUrl.push(prevProps.location.pathname)
            }
            this.handleFirstViewPDPdata();
            document.body.removeAttribute("style");
        }
        if (this.state.firstViewData || this.state.pdp404 || this.state.pdp5XX) {
            document.getElementById('gblLoader').style.display = "none";
            this.state.pdp404 ? this.loadHeader() : "";
        }    
    }
    onPopHistory(event) {
        if(window.refUrl[window.refUrl.length - 1] == "extendedPDP") {
            window.refUrl.pop();
            setTimeout(()=>{
                document.getElementById('imPWAHeader').scrollIntoView({behavior:'smooth'}) 
            }, 0)
        }
        else if (window.refUrl[window.refUrl.length - 1] != "somePopUp" && window.refUrl.length == 1 && (window.refUrl[0] == '' || window.refUrl[0].indexOf('indiamart.com') === -1)) {
            history.replaceState("", "", "/");
            window.location.reload();
        }
        else {
            window.refUrl.pop();
        }
    }
    
    render() {
       
        let view = '';

        if (!this.state.showLoader) {
            view = 
            <>
            <Views eventType={this.eventType} key={this.viewKey} location={this.props.location}  Footer={this.state.Footer} pageLang={this.state.pageLang} translatedTxt={this.state.translatedTxt} firstViewData={this.state.firstViewData} pdp5XX={this.state.pdp5XX} pdp404={this.state.pdp404}  pdp404ViewData= {this.state.pdp404ViewData} prevPgName={this.pgNamePrv} parseDisplayID={this.parseDisplayID} country_iso={this.state.country_iso}/>
            </>
        }
        else {
            document.getElementById('gblLoader') ? document.getElementById('gblLoader').style.display = "none": "";
        }
        return (<>
            <div id="pdpLcpDiv" className="promptHandlingClass w100">
            {this.state.Header?<this.state.Header {...{
                addToHomeScreen: { mode: [0], tracking: 'PDP' },
                userLogin: { mode: [0], tracking: 'PDP' },
                msgIcon: { mode: [1, 2], tracking: 'PDP' },
                searchAutoSuggest: this.state.pdp404? "PDP_Error":"PDP",
                hamburgerMenu: "PDP",
                background: 'bgwH',
                setTranslatedTxt: this.onLangChange.bind(this),
                catId: this.state.firstViewData?this.state.firstViewData.CAT_ID:'',
                mcatId: this.state.firstViewData?this.state.firstViewData.BRD_MCAT_ID:'',
                suggesterObj: this.suggObj,
                pageName: 'PDP',
                New_Header: window && window.newheader  ? true : false,

            }} />:''}
            {this.state.Error5XX ? <this.state.Error5XX pageType="PDP"/> : ""}
            {view}
            </div></>)
    }
}