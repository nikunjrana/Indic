import React, { Component } from 'react';
import EnqBlComponent from './EnqBlComponent';
import styles from "../../../Globals/imageCss";
import { getCookieValByKey, deleteCookie} from '../../../Globals/CookieManager';
import {gaTrack} from '../../../Globals/GaTracking';
import {showSOI} from '../../../Globals/GlobalFunc';
import {checkUserStatus} from '../../../Globals/MainFunctions';
import {countUnreadMessages} from '../../../Globals/BuyerUtility';
// import { checkisAppCookie } from '../../CentralizePopUp/utility/App/helper';

const loginModes = {0:'UnIdentified',1:'Identified',2:'LoggedIn',"null":'UnIdentified'};


export default class Menu extends Component{
	constructor(props) {
        super(props);
        this.sellerTools = this.sellerTools.bind(this);
        this.buyerTools = this.buyerTools.bind(this);
        this.aboutCustomerTools = this.aboutCustomerTools.bind(this);
        this.unidentifiedUser = this.unidentifiedUser.bind(this);
        this.callBl = this.callBl.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.state = {'paidImUrl':false,'noImURl':false,'FreeImUrl':false,'showSeller':true,impressTrack:false}
    }
    componentWillMount(){
        // checkisAppCookie();
    	this.checkUser();
    }
    componentDidMount(){
        countUnreadMessages(true);
        if(typeof(bannerImpressTrackAdd)=="function" && !this.state.impressTrack){
            if (document.getElementsByClassName('menuInner').length>0) {
                var menu_name = document.getElementsByClassName('menuInner')[0];
                if (menu_name!=undefined){
                    if (menu_name.scrollHeight > menu_name.clientHeight) {
                        bannerImpressTrackAdd("MenuBanner","menu_banner","id");
                    }
                    else {
                        bannerImpressionGA("MenuBanner_");
                    }
                }
            }
        }
    }


    checkUser(){
		let usrStatus = checkUserStatus();
		let uType = getCookieValByKey('ImeshVisitor', 'utyp');
        if (usrStatus != 0 && uType == "P" )
            this.setState({ 'paidImUrl': true })
        if (usrStatus != 0 && uType == "F" )
            this.setState({ 'FreeImUrl': true })
        if (usrStatus != 0 && uType == "N")
            this.setState({ 'noImURl': true })    
    }
    linktoM(redirectUrl,listName){
        gaTrack.trackEvent(["Menu","PWA-"+listName,'Item-click',0,true]);
    	document.body.className = document.body.className.replace("oh", "");
    	window.location = redirectUrl;
    }
    checkSameRoute(actualPath,tracName){
        let path = window.location.pathname;
        let routeName = path.match(/enq|products|messages|bl\/[a-zA-z0-9]+|bl/ig);
        if(routeName) if(actualPath == routeName[0]) this.props.toggleMenu();
        gaTrack.trackEvent(["Menu","PWA-"+tracName,'Item-click',0,true]);
    }
    sellerTools(){
        let uType = getCookieValByKey('ImeshVisitor', 'utyp');
        let userMode = checkUserStatus();
        var st = <div>
                    <span className="pdt10 pdb5 clr33 fs15 db bdrBed pl10 pr10" onClick={() => {
                        this.setState({'showSeller':false}); localStorage.setItem('visibleSeller',true);
                    }}>SELLER TOOLS</span>
                    <p className={this.state.FreeImUrl && localStorage.getItem('visibleSeller') == null ? "lh23 dn" : "lh23 db"}>
                       {/* <Link to={'/bl/'} className="navPd pr db fw lh23 clr33" onClick={()=> this.checkSameRoute('bl','Latest-BL')}><i className="navBg icoNav pa lblIco"></i>Latest Buy Leads</Link>
                       {(uType == "P" && imUrl !== "")?
                       <Link to={'/messages/'} onClick={()=> {this.checkSameRoute('messages','My-Messages')}} className="navPd pr db fw lh23 clr33"><i className="navBg icoNav pa myeqIco"></i>Messages</Link>:""}
                       <Link to={'/products/'} className="navPd pr db fw lh23 clr33" onClick={()=> this.checkSameRoute('products','My-Products')}><i className="navBg icoNav pa mypIco"></i>My Products</Link>
                       <Link to={'/bl/package.html'} className="navPd pr db fw lh23 clr33" onClick={()=> this.checkSameRoute('bl/package','Get-Credits')}><i className="navBg icoNav pa crIco"></i>Subscription Packages</Link>
                       <Link to={'/products/add'} onClick={()=>gaTrack.trackEvent(["Menu-PWA","Add-Product-btn-click",loginModes[gblFunc.checkUserStatus()],0,true])} className="navPd pr db fw lh23 clr33"><i className="navBg icoNav pa addpIco"></i>Add Product</Link>                    */}

                       <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("/bl/","Latest-BL")}>
                           <i style={styles.imageCss().navSpri} className="icoNav pa lblIco"></i>Latest Buy Leads
                      </div>
                      {(uType == "P" )?
                       <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("/messages/","My-Messages")}>
                       <i style={styles.imageCss().navSpri} className="icoNav pa myeqIco"></i>Messages 
                       <span class="cntmsg menuCntMsg poa tc clrw bxrd10 lh20" id="menuCntMsg"></span> 
                   </div>
                      :""}
                      <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("/products/","My-Products")}>
                           <i style={styles.imageCss().navSpri} className="icoNav pa mypIco"></i>My Products
                      </div>
                      <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("/bl/package.html","Get-Credits")}>
                           <i style={styles.imageCss().navSpri} className="icoNav pa crIco"></i>Subscription Packages
                      </div>
                       
                   </p>
                 </div>
         return st;
    }
    buyerTools(){
        let uType = getCookieValByKey('ImeshVisitor', 'utyp');
        let userMode = checkUserStatus();
        
        var bt =  <div>
                    <span className="pdt10 pdb5 fs15 clr33  db bdrBed pl10 pr10">BUYER</span>
                    <div className="lh23">
                      <div className="navPd pr db fw lh23 clr33" onClick={()=> {
                          gaTrack.trackEvent(["Menu","PWA-Post-Buy-Requirement","Item-click",0,true]);
                           this.callBl();
                            }}>
                           <i style={styles.imageCss().navSpri} className="icoNav pa pyrIco"></i>Get Verified Sellers
                      </div>
                      <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("https://m.indiamart.com/search.html","Search")}>
                          <i style={styles.imageCss().navSpri} className="icoNav pa srchIco"></i>Search
                      </div>
                      <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("https://m.indiamart.com/dir/","Business-Directory")}>
                          <i style={styles.imageCss().navSpri} className="icoNav pa bdIco"></i>Explore All Industries
                      </div>

                      {(!userMode || uType == "N" || uType == "F")?
                       <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("/messages/","My-Messages")}>
                       <i style={styles.imageCss().navSpri} className="icoNav pa myeqIco"></i>Messages
                       <span class="cntmsg menuCntMsg poa tc clrw bxrd10 lh20" id="menuCntMsg"></span> 
                   </div>
                    //   <Link to={'/messages/'} onClick={()=> {this.checkSameRoute('messages','My-Messages')}} className="navPd pr db fw lh23 clr33"><i className="navBg icoNav pa myeqIco"></i>Messages</Link>
                      :""}
                      <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("https://m.indiamart.com/buyer/managebl/","Manage-Requirements")}>
                          <i style={styles.imageCss().navSpri} className="icoNav pa mrIco"></i>Manage Requirements
                      </div>
                     { showSOI()  && <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("https://paywith.indiamart.com/msite_pwim","Pay-With-IndiaMART")}>
                          <i style={styles.imageCss().navSpri} className="icoNav pa payxIco"></i>Pay With IndiaMART
                      </div>}

                {( showSOI()  && uType == "N"  && getCookieValByKey("soiBar", "glid") && getCookieValByKey("ImeshVisitor", "glid") == getCookieValByKey("soiBar", "glid")) ?  <div className="navPd pr db lh20 mb20   clr33 bgd5" onClick={() =>{(getCookieValByKey("soiBar", "v") == 100? this.linktoM("/seller/soi-thank-you/", "Sell-on-IM"): this.linktoM("/seller/", "Sell-on-IM"));getCookieValByKey("soiBar", "v") == 100 ?gaTrack.trackEvent(["Menu","PWA-Sell-On-IM",'Item-click',0,true]):'' }}>
                   <span className="cl2e fw">Sell on IndiaMART</span>
                   <div>
                    <span id="soiBar" className=" w40 mt5 bgw oh dib mr10">
                         <span className={getCookieValByKey("soiBar", "v") == 20? "w20 bgred dib fl":getCookieValByKey("soiBar", "v") == 40 ? "w40 bgylw dib fl" :getCookieValByKey("soiBar", "v") == 60 ? "w60 bgorn dib fl" :getCookieValByKey("soiBar", "v") == 80 ? "w80 bggrn2 dib fl" : getCookieValByKey("soiBar", "v") == 100 ? "w100 bggrn dib fl":'' }></span> 
                    </span>
                     <span className="fs12 clr5a fw" >{getCookieValByKey("soiBar", "v")}% completed</span>
                     <div className="fs12 clr75">

                     </div>
                    </div>
                </div> : deleteCookie('soiBar')}
                    </div>
                  </div>
        return bt;
    }

    aboutCustomerTools(){
        var data = <div>
        <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("https://corporate.indiamart.com/about-us/","About-Us")}>
            <i className="fl mr10 mt3 aboutMenu icoNav pa"></i>About IndiaMART
        </div>
        <div className="navPd pr db fw lh23 clr33" onClick={() => this.linktoM("https://help.indiamart.com","Customer-Care")}>
            <i className="fl mr10 mt3 custumercareMenu icoNav pa "></i>Help & Support
        </div>
    </div>

    return data;
    }
    
    unidentifiedUser(userMode){
    	var ui = 
        <p id="username_span" className="pdt10 pdb10 pl10 pr35 bgmim pr"><a className="clrw fw fs15 lh23" onClick={()=>gaTrack.trackEvent(["Menu","PWA-Login","Item-click",0,true])}  href="https://m.indiamart.com/my/?ref=/"><i style={styles.imageCss().navSpri} className="dib icoNav mr5 suIco vam"></i>Sign In</a>
        <span onClick={()=>gaTrack.trackEvent(["Menu","PWA-Cross-icon","Item-click",0,true])}className="pa clrw fs20 tc mCros">&#x2715;</span></p>		
					
		return ui;
    }
    identifiedUser(user, userMode){
    	var idntfied = <p id="username_span" className="pdt10 pdb10 pl10 pr35 bgmim pr"><div onClick={() => this.linktoM("https://m.indiamart.com/my/profile/","Profile")}><span className="clrw fw fs15 lh23">Hi {user}</span><i style={styles.imageCss().navSpri} className="ico-nav editIco dib wh25 ml5"></i></div><span onClick={()=>gaTrack.trackEvent(["Menu","PWA-Cross-btn-click",loginModes[userMode],0,true])}className="pa clrw fs20 tc mCros">&#x2715;</span></p>
		return idntfied;
    }
    callBl()
    {
if(typeof showEnquiryForm != 'undefined' && typeof iso_pw_enq != 'undefined'){
var obj={};
obj.affiliation_id=-43;
obj.query='';
obj.query_text="menu|pWA";
obj.modid='IMOB';
window.showEnquiryForm(obj);
return;
}
else{
window.location.href="/postbuy.php";
}
}

      
	render(){
		document.getElementById("gblLoader").style.display = "none";
		let user = getCookieValByKey('ImeshVisitor', 'fn') || 'User';
        let userMode = checkUserStatus();
        let uType = getCookieValByKey('ImeshVisitor', 'utyp');
        var filesInc = {};
//provide files which are not required on this page
filesInc.EnqHtml = 0 ;
filesInc.centralizeEnqBl = 0 ;
filesInc.common = 0 ;
filesInc.miniBl = 0 ;
filesInc.EnqBlCommon = 0 ; 
filesInc.chatbl = 0 ;
filesInc.PopUpHtml = 0 ;
		return(<div className="blanketNI pf w100 h100vh z99999" id="blcklyr" onClick={(e)=> { e.target.className.indexOf('blanketNI') > -1 || e.target.className.indexOf('mCros') > -1 ? this.props.toggleMenu() : ''}}><nav className="menuInner bgw pdb10 ht100 pf over-y"> 
			 <EnqBlComponent filesInc={filesInc} />
             {!userMode && this.unidentifiedUser(userMode)}
             {userMode!=0 && this.identifiedUser(user, userMode)}
			 <div className="navPd pr db mt10 fw lh23 clr33" onClick={() => this.linktoM("https://m.indiamart.com","Home")}>
			 			<i style={styles.imageCss().navSpri} className="icoNav pa homeIco"></i>Home
		     </div>
		     	{this.state.paidImUrl ? this.sellerTools() : this.buyerTools()}
		     	{this.state.paidImUrl && this.buyerTools() || this.state.FreeImUrl && this.sellerTools()}
                {this.aboutCustomerTools()}
               {(showSOI() &&( ((this.state.noImURl || userMode == 0 || userMode == null ) &&  (!getCookieValByKey("soiBar", "glid") || (getCookieValByKey("soiBar", "glid") && getCookieValByKey('soiBar', 'glid')=='') || (getCookieValByKey("soiBar", "v") && getCookieValByKey("soiBar", "v")=='') )))) && <div onClick={() => this.linktoM("https://m.indiamart.com/seller/","Sell-on-IM")} className="fs16 fw mt10 mb10 ma bxrd30 tc w70 pd10 cl2e br2e bxrd30 "><i style={styles.imageCss().navSpri} class="sellbtn menuIcon_btn vam dib"></i>Sell on IndiaMART</div>}
              <div id="menu_banner" onClick={() =>{bannerDeepLinking("MobileMenu","", window.location.href);gaTrack.trackEvent(["Menu","PWA-App-Banner","Item-click",0,true]);}} className="clrw fs16 fw mt10 mb10 ma bxrd30 tc w70 pd10 bgli2e br2e bxrd30 "><i style={styles.imageCss().navSpri} class="dwbtn menuIcon_btn vam dib"></i>Open in App</div>
    		</nav>
                                          

             
            </div>)
	};
}