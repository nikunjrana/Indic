import React from 'react';
import './Error404.css'
//import EnqBlComponent from '../../../App/components/EnqBlComponent';
import Footer from '../../../App/container/FooterContainer';
// import(/* webpackChunkName:"Index" */ "../../../App/styles/index.css");
// import MiniBl from '../../../CentralizePbr/container/MiniBlContainer';
import RecommendedProductsContainer from '../../../Widgets/Personalisation/RecommendedProducts/RecommendedProductsContainer';
// import RecentRelatedMcatsContainer from '../../../buyer/container/RecentRelatedMcatsContainer';
import RelatedProductsWidget from '../../../Widgets/RelatedProducts/RelatedProductsWidget';
import { personalisationActionDispatcher } from '../../../Widgets/Personalisation/personalisationActionDispatcher';
import FeaturedCategoriesContainer from '../../../Widgets/Personalisation/FeaturedCategories/FeaturedCategoriesContainer';
import { getCookieValByKey } from '../../../../Globals/CookieManager';
import { gaTrack } from '../../../../Globals/GaTracking';
import RelatedProductContainer from '../../../buyer/container/RelatedProductContainer';
export default class Error404 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mblView:''
        }
        this.mblProp={};
        this.loadMblContainer = this.loadMblContainer.bind(this);
    }
    loadMblContainer(){
        if(!this.state.mblView){
        //     import(/* webpackChunkName:"EnqBlPWA" */'../../../EnquiryBlForms/components/EnqBlMain').then((module) => {
        //     this.setState({mblView: module.default });
        //     window.removeEventListener(this.props.eventType,this.loadMblContainer);
        //     window.removeEventListener('scroll', this.loadMblContainer);
        // })
    }
    }
    render() {
        let unidentified = getCookieValByKey("ImeshVisitor", "glid") ? false : true;
        this.mblProp={searchKey:'' ,productName:'',productImage:'',miniBl:true,affiliationId:"-140", queryText:'error_PDP|PWA|P' + this.props.cABTestPDP, page:'error-PDP',EnqBlForm:this.props.showEnqPopup }

        let pdp404ViewData = this.props.pdp404ViewData? this.props.pdp404ViewData:'';

        let brdMcatIdView404 = pdp404ViewData.BRD_MCAT_ID? pdp404ViewData.BRD_MCAT_ID:'';
        let CatIdView404 = pdp404ViewData.CAT_ID? pdp404ViewData.CAT_ID:'';
        let cityIdView404 = pdp404ViewData.CITY_ID? pdp404ViewData.CITY_ID:'';
        let dsplayIdView404 = pdp404ViewData.DISPLAY_ID? pdp404ViewData.DISPLAY_ID:'';
        let glUsrIdView404 = pdp404ViewData.GLUSR_USR_ID? pdp404ViewData.GLUSR_USR_ID:'';
        let isRelProd2=false;
        if(localStorage.getItem('relProds2')){isRelProd2=true}else{isRelProd2=false}
       

        return (
            <>
                <div className="mb10 pdt20"><img className="fl vam mr10" src="https://m.imimg.com/gifs/notfound.png" alt="Not found" width={57} height={49} /><div className="fl vam mt5"><p className="err_txt_1">Oops!</p><p className="err_txt_2 fs14 nf_txt">It seems page is unavailable.<span className="sp_menu errSmiley" /></p></div><p className="crb" /></div>
                
                {!isRelProd2?
                    <RelatedProductContainer 
                        location={this.props.location} 
                        geoLocLabel="Similar-Product-PDP-Clicks"
                        mcatId={brdMcatIdView404} 
                        cityId={cityIdView404} 
                        type='' page='Error404PDP' 
                        pageLang={this.props.pageLang} 
                        widgetCalled='fullPDP' 
                        cta_name={'सर्वोत्तम मूल्य प्राप्त करें'}
                        eventAction={"Location-Widget-Similar-Product"+ this.props.cABTestPDP}
                        eventCategory="Product-Page-Clicks"
                        pageType={"PDP"} 
                        cat_ID={CatIdView404}
                        showModal={this.props.showModal}  
                        enqCtaDisabled={this.props.enqCtaDisabled}
                        showEnqPopup={this.props.showEnqPopup}
                        isRecommendedData={"isRecommendedData"}
                        isABtst={this.props.isABtst} cABTest={this.props.cABTestPDP}
                    />:''}

                {<RelatedProductsWidget page='error-PDP' count="5" isABtst={this.props.isABtst} cABTest={this.props.cABTestPDP}/>}

                {/* Based On Your Browsing History,You May Also Be Interested In */}
                {<RecommendedProductsContainer view="RPDefaultView" count="10" page="error-PDP" trck_param='u_' queryText={'error-PDP|PWA|P' + this.props.cABTestPDP} enqLabel={"Send Enquiry"} head={'आपके लिए प्रोडक्ट्स'} callTxt={"error-PDP-recently-viewed"} gaLastDigit={this.props.isABtst} ABTEST={''} />}
                {/* <EnqBlComponent /> */}
                {/* <MiniBl queryText="error_PDP|PWA|P"/> */}
                {/* MiniBlPWA */}
                {(this.state.mblView!='') ? <this.state.mblView prop={this.mblProp}/>:''} 
                {/* <RecentRelatedMcatsContainer page="error-PDP"/> */}
                <FeaturedCategoriesContainer page="error-pdp" count="10" trck_param={unidentified ? "u_" : ""} queryText={"error-pdp" + this.props.cABTestPDP} cABTest={this.props.cABTestPDP} />
                <Footer pageStatus="bad" />
            </>
        )
    }
    componentDidMount() {
        let prevURLofPDP = '', curntURLofPDP = '', checkLocalItem = '';
        let isStatus= this.props.statusCode== true?'404':'200';
        let cABTestPDP=this.props.cABTestPDP;

        if (localStorage.getItem('PDP404URL')) {
            checkLocalItem = JSON.parse(localStorage.getItem('PDP404URL'))
            prevURLofPDP = checkLocalItem.previousPageURL;
            curntURLofPDP = checkLocalItem.currentPageURL;
        }

        document.title = "Product Not Found";
        personalisationActionDispatcher();
        window.addEventListener(this.props.eventType,this.loadMblContainer);
        window.addEventListener('scroll', this.loadMblContainer);
        gaTrack.trackPageView('/nf'+window.location.pathname , '', '', '', prevURLofPDP, curntURLofPDP,'','',cABTestPDP);
        gaTrack.trackPageView('/not-found-pdp-'+ isStatus +window.location.pathname , '', '', '', prevURLofPDP, curntURLofPDP,'','',cABTestPDP);

    }
}