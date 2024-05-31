import React, { Component } from 'react';
import '../styles/A2hsAdBanner.css';

class AppAdBanner extends Component {

    constructor(props) {
        super(props);
        this.bannerClick = this.bannerClick.bind(this);
        this.impressionTrkingApp=this.impressionTrkingApp.bind(this);
        this.fireTracking=this.fireTracking.bind(this);
        this.dynamicYandex = this.dynamicYandex.bind(this);

    }

    bannerClick(){
        try{
            ym(idYandex, "params", {
                'app_banner_clicks': `${this.props.slotName.split('/')[2]}_clicks`
            });            
        } catch(e){
            console.log('Yandex tracking failed', e);
        }
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.impressionTrkingApp,false);
    }
    dynamicYandex(){
          try{
                    ym(idYandex,'params', {
                        'app_banner_impressions': `${this.props.slotName.split('/')[2]}_impression`
                    });                    
        } catch(e){
            console.log('Yandex tracking failed', e);
        }
          window.removeEventListener("touchstart", this.dynamicYandex);
          window.removeEventListener('scroll', this.dynamicYandex);
          window.removeEventListener('click', this.dynamicYandex);
    }
    fireTracking(){
        try{
            ym(idYandex, "params", {
                'Banner Impressions': {
                    'Native App': {
                        [this.props.slotName.split('/')[2]]: this.props.page
                    }
                }
            });            
        } catch(e){
            console.log('Yandex tracking failed', e);
        }
         window.removeEventListener('scroll',this.impressionTrkingApp,false);
    }
    impressionTrkingApp(){
        if(document.getElementsByClassName("appBnnr")[1]){
            if(window.scrollY+window.innerHeight>(document.getElementsByClassName("appBnnr")[1].getBoundingClientRect().top+window.scrollY)){
                this.fireTracking();
            }
        }
        if(document.getElementsByClassName("appBnnr")[0] && !document.getElementsByClassName("appBnnr")[1]){
            if(window.scrollY+window.innerHeight>(document.getElementsByClassName("appBnnr")[0].getBoundingClientRect().top+window.scrollY)){
                this.fireTracking();
            }
        }
          
    }

componentDidMount(){
window.addEventListener("scroll",this.impressionTrkingApp,{passive:true});
 window.addEventListener("touchstart", this.dynamicYandex,{ passive: true });
window.addEventListener('scroll', this.dynamicYandex,{ passive: true });
window.addEventListener('click', this.dynamicYandex,{ passive: true });
}

    render(){
        return(
            (!document.referrer.includes("twa") ?
            <div className={`pd15 tl w80 ma bgw bxrd6 ${(this.props.page&&this.props.page=='home') ? "" : "mt20"}`} id="getAppBlNHm"><div className="dflx "><i className="App_bnr imicon dib mr5 ml5 vat"></i> <p className="fs16 mb10 lh20 ml5">Contact Sellers on the go with IndiaMART app  <span className="db"><i className="app_bnr1 dib stars"></i></span></p>  </div>
            
            <a href='https://imart.page.link/eMWcv'  target="_blank" onClick={this.bannerClick}>
            <div className=" bxdw tc  por "><i className="dib aPnIcon mr10 vam"></i>  <strong>Open in App</strong><div className="dib poa rt0 tp0 w100p"><div className="arrow arrow-first"></div><div className="arrow arrow-second"></div></div></div>
            </a> 
            </div> :"")
          )
    }


}

export default AppAdBanner;