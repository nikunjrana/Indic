import React from 'react';
import './Error404.css'
import Footer from '../../../App/container/FooterContainer';
import Header from '../../../Header/HeaderContainer';
import { getCookieValByKey} from '../../../../Globals/CookieManager';
import { eventTracking, trackPVEnqBL } from '../../../../Globals/GaTracking';
import { personalisationActionDispatcher } from '../../../Widgets/Personalisation/personalisationActionDispatcher';
import RecommendedProductsContainer from '../../../Widgets/Personalisation/RecommendedProducts/RecommendedProductsContainer';
import FeaturedCategoriesContainer from '../../../Widgets/Personalisation/FeaturedCategories/FeaturedCategoriesContainer';
import RelatedProductsWidget from '../../../Widgets/RelatedProducts/RelatedProductsWidget';
import Ads from '../../../App/components/GoogleDFP';
import CallNow from '../../../CallNow/container/CallNowContainer';

export default class Error404 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          mblView:''
      }
        this.mblProp={};
        this.loadMblContainer = this.loadMblContainer.bind(this);
        this.eventType = 'pointerdown';
        if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
            this.eventType = 'click';
        }
    }
    loadMblContainer(){
      if(!this.state.mblView){
      //     // import(/* webpackChunkName:"EnqBlPWA" */'../../../EnquiryBlForms/components/EnqBlMain').then((module) => {
      //     // this.setState({mblView: module.default });
      //     // window.removeEventListener(this.eventType,this.loadMblContainer);
      //     // window.removeEventListener('scroll', this.loadMblContainer);
      // })
  }
  }
    componentDidMount(){
        let pageTypeTracking = this.props.pageName == 'mcat'? "error-mcat" : "error-city-hub";
        document.getElementById("page_name").value = pageTypeTracking;
        window.pageName = pageTypeTracking;
        personalisationActionDispatcher();
        if(this.props.pageName == "mcat")
            trackPVEnqBL(`nf${this.props.location.pathname}`,'Page Not Found')
        else trackPVEnqBL(`nf/city-hub${this.props.location.pathname}`,'Page Not Found')
        window.addEventListener(this.eventType,this.loadMblContainer, {passive : true});
        window.addEventListener('scroll', this.loadMblContainer, {passive : true});
    }
    render() {
        let currURL = "";
        let prevURL = "";
        let ls =localStorage
        if(ls&&ls.PDP404URL){
            currURL=JSON.parse(ls.PDP404URL).currentPageURL;
            prevURL=JSON.parse(ls.PDP404URL).previousPageURL;     
          }
        let unidentified = getCookieValByKey("ImeshVisitor","glid") ? false : true;
        let loginMode = (!unidentified)? `Identified GLid- ${getCookieValByKey("ImeshVisitor","glid")}`: "unidentified";
        let pageTypeTracking = this.props.pageName == 'mcat'? "error-mcat" : "error-city-hub";
        this.mblProp={searchKey:'' ,productName:'',productImage:'',miniBl:true,mcatId: '',affiliationId:"-140", queryText:'error_MCAT|PWA|P', page:'error_MCAT',EnqBlForm:this.props.showEnqPopup }
        eventTracking(`Current Url-${currURL}----PrevUrl-${prevURL}`,'Not-Found-Page-Tracking', `Login Mode-${loginMode}`, 1);
       // let lang = getCookie(LANG_COOKIE) == VERNACULAR_ARR['hi'] ? 'langHi' :'langEn';
        return (
            <>
              <div className="mb10 mptop-10"><div className="fl vam mt5"><p className="err_txt_1">Oops!</p><p className="err_txt_2 fs14 nf_txt">क्षमा करें, आप जिस पेज को खोज रहे हैं, वह अभी उपलब्ध नहीं है।<span className="sp_menu errSmiley" /></p></div><p className="crb" /></div>
            <img class="tc  vam mr10" src="https://m.imimg.com/gifs/notfound.png" alt="Not found" width="125" height="125" style="
    margin: 0 auto;
    /* text-align: center; */
    display: block;
"></img>
            <a href="https://hindi.indiamart.com" class="db fs15 clrBl bdrBlu bxrd4 pd6 mt10 lh18 bxsdw"><strong style="display: block; text-align:center">होम पेज पर जाएं |</strong></a>
          
            
            </>
        )
    }
}