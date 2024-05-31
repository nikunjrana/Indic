import React, { Component } from 'react';
import {getCookieValByKey,getCookie} from '../../../Globals/CookieManager';
import {eventTracking,prevname} from '../../../Globals/GaTracking';
import { checkUserMode,checkUserStatus } from '../../../Globals/MainFunctions';
import { Link } from 'react-router';
import { impressionTrack } from '../../../Globals/impressionTrack';
import { removalTextNodes } from '../../../Globals/translatorPreact/translatorPatch';
const loginModeArray1=["Unidentified", "Identified", "Full-Login"]
class Relatedmcat extends Component {
    constructor(props) {
        super(props);
        this.state={
            enqBlComp:'',
            show:false,
            deleteToast:'',

        }
        this.ls = localStorage;
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        let ga=getCookie("_ga")?getCookie('_ga'):'';
        this.gaLastDigit= ga[ga.length-1]?ga[ga.length-1]:'';
        var self = this;
        this.impressionTracker = '';
        // this.scrollWinright = this.scrollWinright.bind(this);
        // this.scrollWinleft = this.scrollWinleft.bind(this);
        // this.carouselRecentMcat = this.carouselRecentMcat.bind(this);
        this.callBl = this.callBl.bind(this);
        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.showModal=this.showModal.bind(this);
        if(this.ls&&this.ls.PDP404URL)
        {
         let pdp=JSON.parse(this.ls.PDP404URL);
         this.pdpprev=pdp?pdp.previousPageURL:'';
        } 
        this.isPdp=this.pdpprev?this.pdpprev.includes('proddetail'):'';
    }

    loadEnquiryContainer(){
        // if(!this.state.enqBlComp){
        //     import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module)=>{
        //         this.setState({enqBlComp:module.default});
               
        //     });
        // }
      
        // if (!this.state.deleteToast) {
        //     import(
        //       /* webpackChunkName:"DeleteEnqBlPWA" */ "../../EnquiryBlForms/screens/ThankYou/DeleteToastContainer"
        //     ).then((module) => {
        //       this.setState({ deleteToast: module.default });
        //      window.removeEventListener("touchstart", this.loadEnquiryContainer);
        //     });
        //   }
    }
    showModal(props){
        this.prop=props;
        this.setState({show:!this.state.show});
      }
      callBl(name, imgurl) {  let obj = {};
      obj.productName = name;
      obj.R_custtype_weight = "";
      obj.affiliationId  = '-43';
      obj.query = '';
      obj.queryText = 'home-page|PWA';
      obj.modid = 'IMOB';
      obj.enqconv = 'on';
      obj.int_rec = '1';
      obj.productImage=imgurl;
      obj.ctaName='कोटेशन प्राप्त करें';
      obj.EnqBlForm=this.state.show;
      obj.isEnquiry=false;
      obj.page='home';
      this.showModal(obj);
      }
    // scrollWinright() { var sCroll = document.getElementById("carouselArrw"); sCroll.scrollBy(((window.screen.width * 3) / 4) + 15, 0); }
    // scrollWinleft() { var sCroll = document.getElementById("carouselArrw"); sCroll.scrollBy(-(((window.screen.width * 3) / 4) + 15), 0) }
    // carouselRecentMcat() {
    //     let carouselArrwPresent=document.getElementById('carouselArrw');
    //     let carouselArrwLeft=document.getElementById("leftarrowCarousel");
    //     let carouselArrwRight=document.getElementById("rightarrowCarousel");
    //     const carouselArrowFunction=()=> {   
    //         (carouselArrwPresent.scrollLeft||carouselArrwPresent.scrollLeft==0)&&(carouselArrwPresent.scrollLeft<20) && carouselArrwLeft?document.getElementById("leftarrowCarousel").style.display="none":document.getElementById("leftarrowCarousel").style.display="block";
    //         (Math.round(carouselArrwPresent.scrollLeft+0.1)+window.innerWidth>=carouselArrwPresent.scrollWidth)&& carouselArrwRight?document.getElementById("rightarrowCarousel").style.display="none":document.getElementById("rightarrowCarousel").style.display="block";
    //     }
    //     carouselArrwPresent?carouselArrwPresent.addEventListener("scroll",carouselArrowFunction ):"";
    // }
    componentDidUpdate(prevProps, prevState){
        
        if(this.state.enqBlComp!="" && prevState.enqBlComp==""){
            let getQuoteDiv = document.getElementById("getquotesdiv");
            getQuoteDiv ? getQuoteDiv.parentNode.removeChild(getQuoteDiv) : "";
            let buttonvalue=window.getvar1?document.getElementById(window.getvar1):''
            buttonvalue?buttonvalue.click():'';
            delete window.getvar1;
            
            document.getElementById("enqLoader") ? document.getElementById("enqLoader").style.display = 'none':'';
        }
         
        removalTextNodes();
    }
    
    componentDidMount() {
        this.loadEnquiryContainer();
        // this.carouselRecentMcat();
        try {
            let local_data_for_back = localStorage.getItem('relCats');
            if (this.props.mail && this.props.mail.query && this.props.mail.query.mcatid) {
                this.recentMcats = [{ "mcatid": this.props.mail.query.mcatid }]
                this.props.getrelatedmcat(this.props.mail.query.mcatid);
            }
            else if (!local_data_for_back && this.props.mcatid) {
                this.props.getrelatedmcat(this.props.mcatid);

            }
            else if (localStorage.getItem("recentMcats") && !localStorage.getItem('relCats')) {
                this.recentMcats = localStorage.getItem("recentMcats");
                this.recentMcats = JSON.parse(this.recentMcats)[0]["mcatid"];
                this.props.getrelatedmcat(this.recentMcats);
                
            }
        } catch (err) {

        }
      if(this.isPdp && (this.gaLastDigit%2==0))
      eventTracking("COYI_pdp-home", 'display_impression', 'IMOB_' + this.props.page , false);
    }                       

    render() {
        try {
            let pageName = 'Home'
            var listitems = '';
            var blistitems = '';
            var head = 'Recommended Categories For You';
            var bhead = 'Categories of Your Interest';
            var aff_id = '-62';
            let classBack = 'dn';
            let classRegular = 'dn';
            let ls_data = {};
            var count_blistitems = '';
            ls_data['RECOMMENDED MCAT DATA'] = (JSON.parse(JSON.parse(localStorage.getItem("relCats"))));
            var res = (ls_data['RECOMMENDED MCAT DATA'] && !(this.props.mail && this.props.mail.query && this.props.mail.query.mcatid)) ? ls_data : this.props.get_relatedmcat;
            if (res != undefined && res['RECOMMENDED MCAT DATA']) {
                blistitems = res['RECOMMENDED MCAT DATA'];
                count_blistitems = blistitems.length;

                let dataArr = blistitems.map(item=>{ return [item.GLCAT_MCAT_NAME,item] }); 
                let maparr = new Map(dataArr);
                let filteredData = [...maparr.values()];

                blistitems = filteredData.map((items, index) => {
                    if (items.GLCAT_MCAT_NAME && items.GLCAT_MCAT_IMG1_125X125 && items.GLCAT_MCAT_NAME != 'null' && items.GLCAT_MCAT_IMG1_125X125 != 'null') {
                        classBack = "";
                        const itemname = (items.GLCAT_MCAT_NAME) ? items.GLCAT_MCAT_NAME : '';
                        let mcat_flname = (items.GLCAT_MCAT_FLNAME) ? items.GLCAT_MCAT_FLNAME : (items.GLCAT_MCAT_FL_NAME) ? items.GLCAT_MCAT_FL_NAME : '';
                        let mcat_link = (ls_data && ls_data['RECOMMENDED MCAT DATA'] && mcat_flname && mcat_flname.indexOf('.html') > -1) ? mcat_flname : '/impcat/' + mcat_flname + '.html';
                        let imgurl = (items.GLCAT_MCAT_IMG1_125X125) ? items.GLCAT_MCAT_IMG1_125X125 : (items.image) ? items.image : "https://m.imimg.com/gifs/background_image.jpg";
                        imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                        imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                        imgurl = imgurl.replace('http://', 'https://');
                        var firstClass = (index == 0) ? 'firstClass' : '';
                        var lastClass = (index == (count_blistitems - 1)) ? 'lastClass' : '';
                        let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
                        return (

                            ((SSR && (SSR["userViewCount"] == 5)) || this.glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (this.glid==undefined))) ? <li key={index}  className={"listingWd flxGrw1 ml15 tc flxShrnk0  " + firstClass + lastClass}>
                                <Link to={mcat_link} onClick={() => { eventTracking('' + pageName + '-Page-Clicks-PWA', 'Categories-to-explore', 'MCAT-Name-' + (index + 1) + this.props.identifier + '|' + prevname() + '|NextPageName-Mcat', true) }} className="pdt5 pdb5  db">
                                            <div class="oh tc df jcc vam bxrd10 bdr">
                                                <img className=" ma ht125px w125p db jc " alt={itemname} src={imgurl} loading={index > 2 ? 'lazy' : ""} />
                                            </div>
                                    <div class="oh">
                                        <div class="clr33 whNr dt w100">
                                            <div class=" tc clr33 dib pdt7 w150 txtElip fwb pdt15">
                                                {itemname}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    </Link>
                                    <div className=" clrw  fs15 mt5   bxrd20 dib bgcol  getQ fw mr10 whwp"  onClick={() => {this.callBl(itemname,imgurl);eventTracking('Categories-to-explore_Home_Page_Clicks_PWA', ' u_cta_button_getquotes|Categories-to-explore', 'IMOB_Home|pos_'+(index+1)+'|Get-Quotes-'+(index+1)+'|'+prevname()+'|NextPageName-BuyLead'+'|BuyLeadCTA|Homepage|'+checkUserMode(),true)}} >कोटेशन प्राप्त करें</div>
                                
                            </li> :
                                <li key={index} className={"listingWd flxGrw1 ml15 tc flxShrnk0  " + firstClass + lastClass}>
                                    <a href={mcat_link} onClick={(event) => { window.location.href=(mcat_link) ;eventTracking('' + pageName + '-Page-Clicks-PWA', 'Categories-to-explore', 'MCAT-Name-' + (index + 1) + this.props.identifier + '|' + prevname() + '|NextPageName-Mcat', true); event.preventDefault() }} className="pdt5 pdb5  db">
                                     
                                            <div class="oh  tc df jcc vam bxrd10 bdr">
                                                <img className=" ma ht125px w125p db jc " alt={itemname} src={imgurl} loading={index > 2 ? 'lazy' : ""} />
                                            </div>
                                        
                                        <div class="oh ">
                                            <div class="clr33 whNr dt w100">
                                                <div class=" tc clr33 dib pdt7 txtElip w150 fwb pdt15">
                                                    {itemname}
                                                </div>
                                            </div>
                                        </div>

                                    </a>
                                    <div id={'getquotes'+index} className=" clrw  fs15 mt5  whwp  bxrd20 dib bgcol  getQ fw mr10"  onClick={() => {this.callBl(itemname,imgurl);eventTracking("BLCTA/"+loginModeArray1[checkUserStatus()],"Home/"+"COYI/","",true);eventTracking('Categories-to-explore_Home_Page_Clicks_PWA', ' u_cta_button_getquotes|Categories-to-explore', 'IMOB_Home|pos_'+(index+1)+'|Get-Quotes-'+(index+1)+'|'+prevname()+'|NextPageName-BuyLead'+'|BuyLeadCTA|Homepage|'+checkUserMode(),true)}} >कोटेशन प्राप्त करें</div>

                                </li>
                        )
                    }
                });
            }
            if (this.props.type == 'back' && blistitems.length > 0) {
                // let intBl=this.props.intBl?this.props.intBl:''; //intutiveBLForm
                return (
                    <div className={classBack}>
                        {this.state.show && this.state.enqBlComp!=''?<this.state.enqBlComp closePopup={this.showModal} prop={this.prop}/>:''}
                        {this.state.deleteToast ? <this.state.deleteToast /> : ""}
                        <section className="crx fs15 bgw por">
                           <div className="fs17 clrb pdt10 fw mb10 pdl10">{bhead}</div>                           
                           {/* <span class="db pl10 pdb5 clr5a lh20">Browse Related Categories</span> */}
                            <div >
                            <ul id="carouselArrw" className="relatedMoreCat scWrapx df mnH225 pdr6 scrbrH" >{blistitems}</ul>


                                {/* {blistitems.length > 3 ?
                                    <div>
                                        <div class=" arrowCarouselCate-rt z3 poa rt0 fs20 bgw top62" id="rightarrowCarousel" onClick={() => { this.scrollWinright() }}> &#x276F;</div>
                                        <div class="arrowCarouselCate-lft  z3 poa lft0 fs20 bgw dn top62" id="leftarrowCarousel" onClick={() => { this.scrollWinleft() }}> &#x276E;</div>
                                    </div>
                                    :
                                    ""

                                } */}

                            </div>
                        </section>
                    </div>
                    
                );
            }
        } catch (err) {

        }
    }
}

export default Relatedmcat;
