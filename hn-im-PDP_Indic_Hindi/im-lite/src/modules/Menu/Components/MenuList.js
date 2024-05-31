import React, { Component } from 'react';
import '../css/Menu.css';
import { gaTrack,prevname } from '../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../Globals/CookieManager';
import { goToRoute } from '../../../Globals/routingFunction';
import { checkUserStatus } from '../../../Globals/MainFunctions';
// import { yandexTrackingMultiLevel } from '../../../Globals/yandexTracking';
// import { checkisAppCookie, yandexTrackingAppinstall } from '../../CentralizePopUp/utility/App/helper';
// import bannerDeepLinking from '../../CentralizePopUp/components/deepLinking';
//import GoogleTranslate from './GoogleTranslate';
class MenuList extends Component {
    constructor(props) {
        super(props);
        //this.state = { translatedtxt: [] }
        //this.callBl = this.callBl.bind(this);
        this.gaAndBodyOverflow = this.gaAndBodyOverflow.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.pwaInstall = this.pwaInstall.bind(this);
        this.homecheck=window.pageName?window.pageName=='home':''
    }
    componentDidMount() {
        // checkisAppCookie();
        if (deferredPromptA2hs && this.props.name == "PwaAppInstall") {
            try{
                ym(idYandex, "params", {
                    'Imlite': {
                        'A2HS_before_install_prompt': {
                            'menu' : window.pagename
                        }
                    }
                });         
            } catch(e){
                console.log('Yandex tracking failed', e);
            }

        }
        if(this.props.name=="AppInstall"){
            // yandexTrackingAppinstall(`Mobile_Menu_Banner`);
        }
    }
    // callBl() {
    //     if (typeof showEnquiryForm != 'undefined' && !window.location.pathname.includes('/bl')) {
    //         var obj = {};
    //         obj.affiliation_id = -43;
    //         obj.query = '';
    //         obj.query_text = "menu|PWA";
    //         obj.modid = 'IMOB';
    //         window.showEnquiryForm(obj);

    //         return;
    //     }
    //     else {
    //         window.location.href = "/postbuy.php";
    //     }
    // }
    closeMenu() {       
       document.body.className = document.body.className.replace("oh", "");
        if (this.props.toggleMenu && !this.props.showEnqPopup) {
            this.props.toggleMenu("close");
        }
        document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";
    }

    gaAndBodyOverflow(ga) {
        if(this.homecheck){
            if(this.props.name== "Post Your Requirement")
            gaTrack.trackEvent(['Home-Page-Clicks-PWA','Menu-Clicks',this.props.name+'|'+prevname()+'|NextPageName=Buylead',0,true]);
            else if(checkUserStatus()==2 && this.props.name== 'Messages')
            gaTrack.trackEvent(['Home-Page-Clicks-PWA','Menu-Clicks',this.props.name+'|'+prevname()+'|NextPageName=Messages',0,true]);
            else
            gaTrack.trackEvent(['Home-Page-Clicks-PWA','Menu-Clicks',this.props.name+'|'+prevname(),0,true]);

        }
        else
            {gaTrack.trackEvent(["Menu", ga, 'Item-click', 0, true]);}
        if (ga != "Choose-Language" && ga != "Add-GST") {
            let that = this;
            setTimeout(function() { that.closeMenu()}, 1000);
        }
    }

    pwaInstall() {
        window.a2hsAddTouchPoint = 'menu' + ' | ' + window.pagename;
        gaTrack.trackEvent(['Custom_A2HS', 'A2HS_clicked', window.a2hsAddTouchPoint, 0, 'IMEvent']);
        deferredPromptA2hs.prompt();
        deferredPromptA2hs.userChoice
            .then(function (choiceResult) {
                if (choiceResult.outcome === 'accepted') {
                    gaTrack.trackEvent(['Custom_A2HS', 'A2HS_add', window.a2hsAddTouchPoint, 0, 'IMEvent']);
                } else {
                    gaTrack.trackEvent(['Custom_A2HS', 'A2HS_cancel', window.a2hsAddTouchPoint, 0, 'IMEvent']);
                }
            })
    }

    render() {
        let noTranslate = this.props.name=="Home" || this.props.name=="Ship With IndiaMART"?"notranslate":''
        let clickHandler;
        if(this.props.name == "Post Your Requirement") 
            clickHandler= ()=>this.props.callBl();        
        else if(this.props.name == "View All Categories")
        clickHandler = ()=>goToRoute(this.props.link);
        else if(this.props.name == "Language")
        clickHandler = ()=>this.props.langBox("open");
        else if(this.props.name == "Add/View GST Number")
        clickHandler = ()=>this.props.gstBox("open");
        else if(this.props.name === "Home")
        clickHandler = ()=>goToRoute('/');
        return (
            <li className="fs14 fs_c db crx">
                {this.props.name === "Home"||this.props.name == "Post Your Requirement"||this.props.name == "View All Categories"||this.props.name == "Language"||this.props.name == "Add/View GST Number" ?
                    <a onClick={(e) => { this.gaAndBodyOverflow(this.props.ga, this.props.link); this.props.isGlid ? "" : clickHandler() }}>    
                       <i className={this.props.icoClass + " dib menuIco"}></i>  
                        <span className={`menutitle ${noTranslate}`}>{this.props.isGlid ?'': this.props.name == "Language"?"Change Language / भाषा चुनें":this.props.name}</span>
                    </a>
                           : this.props.name == "AppInstall" ?
                                <a className="lhi" onClick={(e) => { this.gaAndBodyOverflow(this.props.ga) }}>
                                    <i className="appIcon dib menuIco"></i>
                                    <div className="fs14 w48 dib fw whwp  " >10 गुना तेज़ अनुभव 
 </div>
                                    <span class="fr fs13 tc dib fw w30 bg264 clrw whwp" style="width: 35%;padding: 6px 5px;border-radius: 16px;">Open in App</span>
                                </a>
                                : this.props.name == "PwaAppInstall" ?
                                    <a className="lhi" onClick={(e) => { this.pwaInstall() }}>
                                        <i className=" dib pwaMenuIco"></i>
                                        <div className="fs14 w48 dib fw" style="padding-top: 6px;" >Get the Lighter App </div>
                                        <span class="fr fs13 tc dib fw w30  clrw" style="width: 35%;padding: 6px 5px;border-radius: 16px; background-color:#00a699">Add Shortcut</span>
                                    </a>
                                    :   
                                            <span href={this.props.link} onClick={(e) => {

                                                if (this.props.linktype == "href") {
                                                    location.href = this.props.link;
                                                }
                                                else {
                                                    goToRoute(this.props.link)
                                                }
                                                this.gaAndBodyOverflow(this.props.ga)
                                            }}>
                                                <i className={this.props.icoClass +( this.props.name!=="Call Customer Support"?" dib menuIco":" dib")}></i>
                                                <span className={this.props.name === "Sell On IndiaMART" ? "menutitle fw lh23 whwp ": this.props.name === "More Apps" ? "menutitle fw lh27" :this.props.name === "Shopping"? 'menutitle fw':`menutitle ${noTranslate}`} >{this.props.name}</span>
                                                {this.props.name == "Messages" ? <span class="cntmsg menuCntMsg poa tc clrw bxrd10 lh20 bgclroranff" id="menuCntMsg"></span> : ''}
                                                {this.props.menutag ? <span className={`${this.props.name === 'Shopping'?'bg264 ':'bgclroranff '}por dib fs11 clrw tc bxrd4 menutag pdt3`} >{this.props.menutag}</span> : ''}
                                                {this.props.menusubheading ? <div className="fs14 clr68 pdl40">{this.props.menusubheading}</div> : ''}
                                                {this.props.progressbar ? <div className=" pr db lh20">
                                                    <div className="pdl40">
                                                        <span id="soiBar" className=" w40 mt10 bgw oh dib mr10">
                                                            <span className={getCookieValByKey("soiBar", "v") == 20 ? "w20 bgred dib fl" : getCookieValByKey("soiBar", "v") == 40 ? "w40 bgylw dib fl" : getCookieValByKey("soiBar", "v") == 60 ? "w60 bgorn dib fl" : getCookieValByKey("soiBar", "v") == 80 ? "w80 bggrn2 dib fl" : getCookieValByKey("soiBar", "v") == 100 ? "w100 bggrn dib fl" : ''}></span>
                                                        </span>
                                                        <span className="fs13 clr5a" >{getCookieValByKey("soiBar", "v")}% completed</span>
                                                    </div>
                                                </div> : ''}
                                            </span>
                }
            </li>
        )
    }
}
export default MenuList;


