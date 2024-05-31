import React, {Component} from 'react';
import gblFunc from "../../../Globals/GlobalFunctions";

class cityRecommendedMcats extends Component {
    constructor(props){
    super(props);
    this.glid = gblFunc.getCookieVal('glid');
    this.scrollWinrightB = this.scrollWinrightB.bind(this);
    this.scrollWinleftB = this.scrollWinleftB.bind(this);
    this.scrollWinrightR = this.scrollWinrightR.bind(this);
    this.scrollWinleftR = this.scrollWinleftR.bind(this);
    this.hideBuyerMcatsCarouselArrows = this.hideBuyerMcatsCarouselArrows.bind(this);
    this.hideRecomMcatsCarouselArrows = this.hideRecomMcatsCarouselArrows.bind(this);
    this.trackImpCityBuyer = this.trackImpCityBuyer.bind(this);
    this.trackImpCityRecom = this.trackImpCityRecom.bind(this);
    self=this;
    } 

    componentDidMount() {
        this.trackImpCityBuyer();
        this.trackImpCityRecom();
        window.addEventListener("scroll", this.trackImpCityBuyer, {passive:true});
        window.addEventListener("scroll", this.trackImpCityRecom, {passive:true});
        var count = 10;
        this.props.getcitymcats(this.glid,count);
        (document.getElementById('buyer-carousel'))?document.getElementById('buyer-carousel').addEventListener("scroll", this.hideBuyerMcatsCarouselArrows):'';
        (document.getElementById('recom-carousel'))?document.getElementById('recom-carousel').addEventListener("scroll", this.hideRecomMcatsCarouselArrows):'';
    }
   
    componentWillUnmount(){
        window.removeEventListener('scroll', this.trackImpCityBuyer, false);
        window.removeEventListener('scroll', this.trackImpCityRecom, false);
    }
    componentDidUpdate(){
        (document.getElementById('buyer-carousel'))?document.getElementById('buyer-carousel').addEventListener("scroll", this.hideBuyerMcatsCarouselArrows):'';
        (document.getElementById('recom-carousel'))?document.getElementById('recom-carousel').addEventListener("scroll", this.hideRecomMcatsCarouselArrows):'';

    }
    hideBuyerMcatsCarouselArrows(){
        this.divOnScreen($(".itemFirstB"))?$("#leftarrowCarouselB").hide():$("#leftarrowCarouselB").show();
        this.divOnScreen($(".itemLastB"))?$("#rightarrowCarouselB").hide():$("#rightarrowCarouselB").show();
       }
   
    hideRecomMcatsCarouselArrows(){
       this.divOnScreen($(".itemFirstR"))?$("#leftarrowCarouselR").hide():$("#leftarrowCarouselR").show();
       this.divOnScreen($(".itemLastR"))?$("#rightarrowCarouselR").hide():$("#rightarrowCarouselR").show();
      }

    scrollWinrightB(){var sCroll=document.getElementById("buyer-carousel");sCroll.scrollBy(((window.screen.width*3)/4)+15,0);}
    scrollWinleftB(){var sCroll=document.getElementById("buyer-carousel");sCroll.scrollBy(-(((window.screen.width*3)/4)+15),0);}
    scrollWinrightR(){var sCroll=document.getElementById("recom-carousel");sCroll.scrollBy(((window.screen.width*3)/4)+15,0);}
    scrollWinleftR(){var sCroll=document.getElementById("recom-carousel");sCroll.scrollBy(-(((window.screen.width*3)/4)+15),0);}

    divOnScreen(b) {
        var a = $(window);
        var c = $(b);
        var o = {
            top: a.scrollTop(),
            left: a.scrollLeft()
        };
        o.right = o.left + a.width();
        o.bottom = o.top + a.height();
        var f = (b)?$(b).offset():'';
        return (f && f!='') && !(!f.top || !f.left) && (f.right = f.left + c.outerWidth(),
        f.bottom = f.top + c.outerHeight(),
        !(o.right < f.left || o.left > f.right || o.bottom < f.top || o.top > f.bottom))
    }
    trackImpCityBuyer(){
        
        var int = document.getElementById("buyer_mcats");
            if (int && window.scrollY + window.innerHeight > (int.offsetTop) && int.offsetTop!=0) {
                gblFunc.gaTrack.trackEvent(['w6_buyercity_recom','display_impression','IMOB_'+this.props.page, 0, false]);
                window.removeEventListener('scroll', this.trackImpCityBuyer, false);
            }
    }
    trackImpCityRecom(){
        
        var int = document.getElementById("recom_mcats");
            if (int && window.scrollY + window.innerHeight > (int.offsetTop) && int.offsetTop!=0) {
                gblFunc.gaTrack.trackEvent(['w7_topcity_recom','display_impression','IMOB_'+this.props.page, 0, false]);
                window.removeEventListener('scroll', this.trackImpCityRecom, false);
            }
    }
    
    render(){
        var page = this.props.page;
        var trck_param='';
       
        var buyercity_mcats='';
        var recomcity_mcats='';
        

        var res = this.props.service_response;
        if(res!=undefined && res.code == 200){
            buyercity_mcats = res['buyercity'];
            recomcity_mcats = res['recomcity'];
            if(buyercity_mcats){
             buyercity_mcats = buyercity_mcats.mcat.map((items,index) =>{
                var aff_id = '-74';
                const itemname=items.name;
                const rel_mcat_id  =items.id;
                let mcat_flname=items.fl_name;
                
                let mcat_link ='https://'+location.hostname+(items.city_url ? items.city_url : '/impcat/'+mcat_flname+'.html');  
                 let imgurl = (items.image)?items.image:(items.image_250)?items.image_250:"https://m.imimg.com/gifs/background_image.jpg";
                    imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                    imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                    imgurl = imgurl.replace('http://', 'https://');
                    return(
                        <li className={"dib w40 bgw bxrd4 mt5 mb5 fs15 mr10 bxsh15 vam "+(index == 0 ? 'itemFirstB' : (index == buyercity_mcats.mcat.length -1 ? 'itemLastB':''))} style=" height: 195px; ">
                            <a href={mcat_link} className="pd5 h135 db">
                                <figure class="ma hw85 oh">
                                    <div class="hw85 tc dtc vam"  onClick={() => gblFunc.eventTracking('w6_buyercity_recom',trck_param+'cta_click_prdimg','IMOB_'+page, true)}> 
                                        <img className="mxhw85" alt={mcat_flname} src={imgurl}/>
                                    </div>
                                </figure>
                                <div class="h40 oh">
                                    <div class="clr33 whNr dt w100">
                                        <div class="h40 tc dtc vam lh18 pdt10" onClick={() => gblFunc.eventTracking('w6_buyercity_recom',trck_param+'cta_click_prdname','IMOB_'+page, true)}>
                                            {itemname}
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="tc">
                            <span className="dib clrw pdtb105 fs14 w70 fw bxsdw bxrd20 compCl mt10" onClick={()=>{callUntillDefined('showEnquiryForm', 0, 50, [{'CefProdType': '', 'query': '', 'company': '', 'enquiryDivId': '', 'formType': '', 'query_text': page+'-page|PWA', 'R_glusr_id': '', 'R_custtype_weight': '', 'R_title': '', 'enqConv': 'on', 'int_rec': '1', 'modid': 'IMOB', 'enq_item_price': '', 'displayId': '', 'enq_mcat_id': rel_mcat_id,'product_name': gblFunc.addslashes(itemname), 'affiliation_id': aff_id}]);gblFunc.eventTracking('w6_buyercity_recom',trck_param+'cta_button_getquotes','IMOB_'+page, true)}}>कोटेशन प्राप्त करें</span>
                            </div>
                        </li>
                    )
            });
        }
        if(recomcity_mcats){
            recomcity_mcats = recomcity_mcats.mcat.map((items,index) =>{
                var aff_id = '-75';
                const itemname=items.name;
                const rel_mcat_id  =items.id;
                let mcat_flname=items.fl_name;
                let mcat_link ='https://'+location.hostname+(items.city_url ? items.city_url : '/impcat/'+mcat_flname+'.html');  
                let imgurl = (items.image)?items.image:(items.image_250)?items.image_250:"https://m.imimg.com/gifs/background_image.jpg";
                    imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                    imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                    imgurl = imgurl.replace('http://', 'https://');
                    return(
                        <li className={"dib w40 bgw bxrd4 mt5 mb5 fs15 mr10 bxsh15 vam "+(index == 0 ? 'itemFirstR' : (index == recomcity_mcats.mcat.length -1 ? 'itemLastR':''))} style=" height: 195px; ">
                            <a href={mcat_link} className="pd5 h135 db">
                                <figure class="ma hw85 oh">
                                    <div class="hw85 tc dtc vam" onClick={() => gblFunc.eventTracking('w7_topcity_recom',trck_param+'cta_click_prdimg','IMOB_'+page, true)}> 
                                        <img className="mxhw85" alt={mcat_flname} src={imgurl}/>
                                    </div>
                                </figure>
                                <div class="h40 oh">
                                    <div class="clr33 whNr dt w100">
                                        <div class="h40 tc dtc vam lh18 pdt10" onClick={() => gblFunc.eventTracking('w7_topcity_recom',trck_param+'cta_click_prdname','IMOB_'+page, true)}>
                                            {itemname}
                                        </div>
                                    </div>
                                </div>
                            </a>

                            
                            <div className="tc">
                            <span className="dib clrw pdtb105 fs14 w70 fw bxsdw bxrd20 compCl mt10" onClick={()=>{callUntillDefined('showEnquiryForm', 0, 50, [{'CefProdType': '', 'query': '', 'company': '', 'enquiryDivId': '', 'formType': '', 'query_text': page+'-page|PWA', 'R_glusr_id': '', 'R_custtype_weight': '', 'R_title': '', 'enqConv': 'on', 'int_rec': '1', 'modid': 'IMOB', 'enq_item_price': '', 'displayId': '', 'enq_mcat_id': rel_mcat_id,'product_name': gblFunc.addslashes(itemname), 'affiliation_id': aff_id}]);gblFunc.eventTracking('w7_topcity_recom',trck_param+'cta_button_getquotes','IMOB_'+page, true)}}>कोटेशन प्राप्त करें</span>
                            </div>
                        </li>
                    )
            });
        }
        

var buyerDiv =    (res['buyercity'])?     <section id="buyer_mcats" className="crx mb10 fs13 pdb10">
<h3  className="pl10 pdt10 pdb10 fs18">Recommendations from { res['buyercity'].city_name }</h3>
<div className="por">
    <ul id="buyer-carousel" className="scWrap pl10" style="padding-left:10px!important">{buyercity_mcats}</ul>
  
{(buyercity_mcats && buyercity_mcats.length>2 )? <div class="arrowCarousel-rt z3 poa rt0 fs20 bt0 arTop0 arrCarous bgw arrows" id="rightarrowCarouselB" onclick={()=>{this.scrollWinrightB();}} ><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="14" height="14">
<g>
<path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" style="fill: white"/>
</g>
</svg></div>:''}
               <div class="arrowCarousel-lft z3 poa lft0 fs20 bt0 arTop0 dn arrCarous arrows" id="leftarrowCarouselB" onclick={()=>{this.scrollWinleftB();}} ><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xmlSpace="preserve" width="14" height="14">
<g>
<path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" style="fill: white"/>
</g>
</svg></div> 
</div>
</section> :'';

var recomDiv = (res['recomcity'])?       <section id="recom_mcats" className="crx mb10 fs13 pdb10">
<h3  className="pl10 pdb10 fs18">Recommendations from { res['recomcity'].city_name }</h3>
<div className="por">
        <ul id="recom-carousel" className="scWrap pl10" style="padding-left:10px!important">{recomcity_mcats}</ul>
        
        {(recomcity_mcats && recomcity_mcats.length>2 )?<div class="arrowCarousel-rt z3 poa rt0 fs20 bt0 arTop0 arrCarous bgw arrows" id="rightarrowCarouselR" onclick={()=>{this.scrollWinrightR();}} ><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="14" height="14">
<g>
<path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" style="fill: white"/>
</g>
</svg></div>:''}
        <div class="arrowCarousel-lft z3 poa lft0 fs20 bt0 arTop0 dn arrCarous arrows" id="leftarrowCarouselR" onclick={()=>{this.scrollWinleftR();}} ><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xmlSpace="preserve" width="14" height="14">
<g>
<path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" style="fill: white"/>
</g>
</svg></div> 
    </div>
</section>:'';







        return(<div>
   {buyerDiv}{recomDiv}
 
        </div>) 
        }
       
        
    }
}


export default cityRecommendedMcats;


