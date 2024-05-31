// recent seller dashboard
import React, {Component} from 'react';
import {Link} from 'react-router';
import SellerTool from '../../buyer/components/SellerTool';
import styles from "../../../Globals/imageCss";
import {eventTracking} from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { gaTrack } from '../../../Globals/GaTracking';
import { yandexTrackingMultiLevel } from '../../../Globals/yandexTracking';
import "../../home/css/MsgWidget.css";
import {callNowActionDispatcher} from '../../CallNow/actions/callNowActionDispatcher';
class recentSellersDashboard extends Component{
	constructor(props){
		super(props);
		  var self = this;
      this.glid='';
      this.lastMsgText='';
      this.callNowClick=this.callNowClick.bind(this);
      this.state={countHome:''};
      
      this.callUpdate=this.callUpdate.bind(this);
      this.getFlag = this.getFlag.bind(this);
      this.flag=0;
    }
    

callUpdate(param){
  this.setState({countHome:param})
}

    
 componentDidUpdate(){
  if(!this.state.countHome&&this.props.unreadCount&&this.flag==0){
    this.setState({countHome:this.props.unreadCount});
    this.flag=1;
  }
 }
componentDidMount(){
  var userModeN = checkUserStatus();
  if(getCookieValByKey('ImeshVisitor', 'utyp')=='P'){
    this.props.fetchBuyleads(0,'','P','BT','','',1,'');
  }
  if(userModeN == 2){
    this.props.fetchMessages(getCookieValByKey('ImeshVisitor', 'glid'), 0, 3, 1, this.checkBuyerSeller());	
    this.glid = getCookieValByKey("ImeshVisitor","glid");
    this.name=getCookieValByKey('ImeshVisitor', 'fn');
  }
  this.props.blankMessages();
  this.setState({countHome:this.props.unreadCount})
}

callNowClick (number, type, glusrID){
  let callProps = { callTxt:'Call-MSG-LIST-HOMEPAGE', image: '', tsCode: '', companyName: '', contactNumber: number, contactType: type, glusrID: glusrID, modrefid: '', modrefname: '', query_ref_id: '', query_ref_type: '', dbpagetrack: 'MSG-LIST-HOMEPAGE', eventLabel: 'MSG-LIST-HOMEPAGE', custtypeWeight:'',pageType:'MSG-LIST-HOMEPAGE'};
  callNowActionDispatcher(true, callProps);
}


timeSince(date){
  var secs = Math.abs(Math.floor(((new Date).getTime() - date) / 1000));
  var minutes = secs / 60;
  if (minutes < 1) {
      return secs + (secs > 1 ? ' secs ago' : ' sec ago');
  }
  var hours = minutes / 60;
  minutes = Math.floor(minutes % 60);
  if (hours < 1) {
      return minutes + (minutes > 1 ? ' mins ago' : ' min ago');
  }
  var days = hours / 24;
  hours = Math.floor(hours % 24);
  if (days < 1) {
      return hours + (hours > 1 ? ' hrs ago' : ' hr ago');
  }
  var weeks = days / 7;
  days = Math.floor(days % 7);
  if (weeks < 1) {
      return days + (days > 1 ? ' days ago' : ' day ago');
  }
  var months = weeks / 4.35;
  weeks = Math.floor(weeks % 4.35);
  if (months < 1) {
      return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
  }
  var years = months / 12;
  months = Math.floor(months % 12);
  if (years < 1) {
      return months + (months > 1 ? ' months ago' : ' month ago');
  }
  years = Math.floor(years);
  return years + (years > 1 ? ' yrs ago' : ' yr ago');
}

checkUser() {
  let usrStatus = checkUserStatus();
  let uType = getCookieValByKey('ImeshVisitor', 'utyp');    
  let user;
  if (usrStatus != 0 && uType == "P" )
    user = "Seller-Paid";
  if (usrStatus != 0 && uType == "F" )
    user = "Seller-Free";
  if (usrStatus != 0 && uType == "N")
    user = "Buyer";

  return user;
}

checkBuyerSeller() {
  var user;
  if(this.checkUser() == 'Buyer')
   user = 'Buyer';
   else
   user = 'Seller'

   return user;
}
timeformatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var am_pm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours.toString().padStart(2, "0") + ':' + minutes + ' ' + am_pm;
    return strTime;
  }
  dateformatslash(date) {
    return (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + (date.getYear() + 1900);
  }
  Dialer(mob,type='') {
    window.location.href = "tel:" + mob;

    gaTrack.trackEvent(['Home-Page-Clicks-PWA','Message-Listing-Dashboard','Call_Listing', 0, true]);
    eventTracking("Click-To-Call","Clicked-"+type,"Home",true);
  }
  readUnread(key) {
    (document.getElementById('unread' + key))?document.getElementById('unread' + key).className = 'fs14 truncate clr777' : '';
    (document.getElementById('company' + key))?document.getElementById('company' + key).className = 'fs14  truncate fw':'';
  }
  getDate(data) {
    var date;
    if(data && data.hasOwnProperty('BLDATETIME') && (data.BLDATETIME != "" || data.BLDATETIME != null)){
      date = data.BLDATETIME.replace(/[()]/g,'');
    }
    else if (data && data.hasOwnProperty('HOUR_DIFF') && data.HOUR_DIFF && data.hasOwnProperty('MIN_DIFF') && data.MIN_DIFF && data.hasOwnProperty('DAY_DIFF') && data.DAY_DIFF) {
      date = data.DAY_DIFF>1?data.DAY_DIFF+' days ago':data.DAY_DIFF==1?data.DAY_DIFF+' day ago':data.HOUR_DIFF>1?data.HOUR_DIFF+' hours ago':data.HOUR_DIFF==1?data.HOUR_DIFF+' hour ago':data.MIN_DIFF>1?data.MIN_DIFF+' minutes ago':data.MIN_DIFF+' minute ago';
    }
    else if ( data && data.hasOwnProperty('DATE_TIME') && data.DATE_TIME) {
        date = new Date(data.DATE_TIME.replace(/T([^T]*)$/, ' ' + '$1').replace('Z', ' '));
        if (date != 'Invalid Date') {
            date = this.timeSince(date); 
        } else {
            date = data.DATE_TIME.replace(/T([^T]*)$/, ' ' + '$1').replace('Z', ' ')
            var dateA = date.split(' ')[0] ? (date.split(' ')[0]).split('-') : '';
            var dateB = date.split(' ')[1] ? (date.split(' ')[1]).split(':') : '';
            date = dateA.concat(dateB);
            date = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
            date = this.timeSince(date)
        }
    }
    else if (data && data.hasOwnProperty('OFFER_DATE') && data.OFFER_DATE) { 
        date = this.timeSince(new Date(data.OFFER_DATE ));
    }
    return date;
}
  getFlag(data) {
    let check_flag, flagHtml,flg;
    if (data.hasOwnProperty('GL_COUNTRY_FLAG') && data.GL_COUNTRY_FLAG) {
        check_flag = (data.GL_COUNTRY_FLAG).substring((data.GL_COUNTRY_FLAG).indexOf('/') + 1);
        if (check_flag == 'in_flag_s.png' || data.GLUSR_COUNTRY == 'India') {
            flagHtml = <span style={styles.imageCss().spM} className="mr5 dib bl_ic in_flag"></span>;
        } else {
            flg = (data['GL_COUNTRY_FLAG']).replace('http://imghost.indiamart.com', "https://1.imimg.com")
            flg = (data['GL_COUNTRY_FLAG']).replace('https://imghost.indiamart.com', "https://1.imimg.com")
            flagHtml = <img alt={data.FK_GL_COUNTRY_ISO} className="mr5 vam" src={flg} height="16" width="22" />;
        }
    }
    else{
        if (data.GLUSR_COUNTRY == 'India') {
            flagHtml = <span style={styles.imageCss().spM} className="mr5 dib bl_ic in_flag"></span>;
        } 
    }
    return flagHtml;
  }

  render(){
    
    let webPSupport = JSON.parse(localStorage.getItem("webPSupport")); // for optimisation
    if (!webPSupport) {
      webPSupport = {};
    }
    let userType=this.checkBuyerSeller();
    let imgSrc = (webPSupport['val'] == true) ? "https://m.imimg.com/gifs/img/msg-icon-new.webp" : "https://m.imimg.com/gifs/img/msg-icon.png";
    //Buyleads
    let listitems = '';
    let locitems = '';
    if (typeof this.props.buyleads != 'undefined' || typeof this.props.enquiries != 'undefined') {
      if (this.props.buyleads.length >= 3) {
        let blData = this.props.buyleads;
        listitems = blData.map((items, index) => {
          let date = this.getDate(items);
          let flag = this.getFlag(items);
          if (index <= 2) {
            if (items.GLUSR_CITY != "" && items.GLUSR_STATE != "" && items.GLUSR_CITY != null && items.GLUSR_STATE != null) {
              locitems = `${items.GLUSR_CITY}, ${items.GLUSR_STATE}`
            }
            else if (items.GLUSR_STATE != "" && items.GLUSR_COUNTRY != "" && items.GLUSR_STATE != null && items.GLUSR_COUNTRY != null) {
              locitems = `${items.GLUSR_STATE}, ${items.GLUSR_COUNTRY}`
            } else if (items.GLUSR_COUNTRY != "" && items.GLUSR_COUNTRY != null) {
              locitems = `${items.GLUSR_COUNTRY}`;
            }
            let linkhref = '/bl/' + items.ETO_OFR_ID;
            return (
              <a class={"db pd10 clrb lh18 pdb10 ml10 mr10 " + ((index < 2) ? 'bdrBc0' : '')} href={linkhref} onClick={() => gaTrack.trackEvent(['Home-Page-Clicks-PWA', 'Seller-Dashboard', "Req-" + (index + 1), 0, true])}>
                <div className='fs15 fw' rel="f_pk">{items.ETO_OFR_TITLE}
                  {items.ETO_OFR_TITLE != '' && (items.ETO_OFR_VERIFIED == 1 || items.ETO_OFR_VERIFIED == 2 || items.ETO_OFR_VERIFIED == 3) ? <img src="https://m.imimg.com/gifs/z.gif" width="32" height="20" alt="Verified" style={styles.imageCss().hSlrIcon} class="verfIco vam" /> : ''}
                </div>
                <div className={locitems ? "col63 fs13 pdt10 lh22" : "col63 fs13 lh22"}>
                  {locitems && <span className="dib vam">
                    {flag}
                    {locitems}
                  </span>}
                  <span className="dib pdl10" id={"clock" + index}>
                    {date && < i style={styles.imageCss().spM} className="dib bl_ic clok_ico " > </i>}
                    {date ? date : ''}
                  </span>
                </div>
                {items.ETO_OFR_QTY && items.ETO_OFR_QTY.trim() != '' && items.ETO_OFR_QTY.length.trim() > 0 ? <li> Quantity:  {items.ETO_OFR_QTY}</li> : ''}
              </a>
            )
          }
        });
      }
    }
    var finalBLlist =  (typeof this.props.buyleads != 'undefined' && this.props.buyleads.length >= 3 )  ?
      <div class="bgw ml10 mr10 mb20 brd5 bxdw2"> 
        <div className="bdrG">
          <span class="dib mt5 mb5 pdl20 w100"><i class="lBls fl dib"></i>
            <span className="fs16 fw dib tl pdl20 colorDash pdt20"> Latest Buyleads </span>
          </span>
        </div>
        <div id="buy_leads_list_container">
          {listitems}
          <li class="db bgCce tc brdr10b">
            <a href="/bl/" onClick={() => eventTracking('Home-Page-Clicks-PWA', 'Seller-Dashboard', 'View All', true)} class="fs15 clrmim fw pd10 db col545">View All
              <svg xmlns="http://www.w3.org/2000/svg" fill="#545f6c" width="14.237" height="10.011" viewBox="0 0 14.237 10.011">
                <path d="M9.587 4.825a.5.5 0 0 0-.717.71l3.638 3.638H.5a.5.5 0 0 0-.5.5.505.505 0 0 0 .5.51h12.008l-3.639 3.633a.515.515 0 0 0 0 .717.5.5 0 0 0 .717 0l4.5-4.5a.494.494 0 0 0 0-.71z" transform="translate(0 -4.674)"></path>
              </svg>
            </a>
          </li>
        </div>
      </div>
    : '';


//Messages
var localThis=this; 
var userModeN = checkUserStatus();
if(this.props && this.props.messageListing)
{
    var DashboardList = this.props.messageListing.map(function (query, key) {
    var date_time;
    var current_datetime = new Date();
    var current_time = localThis.timeformatAMPM(current_datetime);
    var current_date = localThis.dateformatslash(current_datetime);
    
    var temp =query.last_contact_date.split(" ");
    var contact_datetime = new Date(temp[0].split("-")[1] + "/" + temp[0].split("-")[2] + "/" + temp[0].split("-")[0] + " " + temp[1].split(":")[0] + ":" + temp[1].split(":")[1] + ":" + ((temp[1].split(":")[2].length == 2)? (temp[1].split(":")[2]) : (temp[1].split(":")[2].substr(0, 2))));
    var contact_time = localThis.timeformatAMPM(contact_datetime);
    var contact_date = localThis.dateformatslash(contact_datetime);
    if ((current_date == contact_date) && (current_time == contact_time)) {
      date_time = 'Just Now';
    }
    else if (current_date == contact_date) {
      date_time = contact_time;
    }
    else if (((current_datetime.getTime() - contact_datetime.getTime()) / (1000 * 3600 * 24)) == 1) {
      date_time = 'Yesterday';
    }
    else {
      date_time = contact_date;
    }

    let Utype=(getCookieValByKey('ImeshVisitor', 'utyp')=='N') ? "Buyer":"Seller";
    var user_name = (query.contacts_name == "" || !query.contacts_name) ? "Indiamart User" : query.contacts_name;
    var last_msg = (query.last_message)?query.last_message.replace('&copy;','�').replace('&amp;','&').replace('%21', '!').replace(/&nbsp;/g,' '):(query.last_message);
    var user_img_color = 'circleBx' + (Math.floor(Math.random() * (6) + 1));
    var user_img = (user_name == "Indiamart User") ?
      <div style={styles.imageCss().bgMsc} className={" bxrd100 CrlMain clrw tc fs20  CiRcleBxD flx-s mr10"}></div>
      :
      <div className={" bxrd100 CrlMain clrw tc fs20 flx-s mr10 " + user_img_color}>{user_name[0]} </div>
        // new UI *deeksha* (Quick reply task)
      
    return (
       <li className={userModeN==2?"bgw  pdt10 pdb10 bdrB por ":"bgw flx ml5  bdrB por "+((key<2)?'bdrBc0':'')} id={key + 1}>
        <div className=" tc  pdt5 wd55 r0 poa "><span className="fs11 colr72 db">{localThis.props.replySentCom&&localThis.props.replySentCom.includes(key+1)?"Just Now":date_time}</span> 
            {query.contacts_mobile1?(<i className="db mt5 clin por mla " onClick={() => { query.contacts_mobile1 != '' && localThis.Dialer(query.contacts_mobile1,query.contact_number_type); localThis.callNowClick(query.contacts_mobile1,query.contact_number_type,query.contacts_glid != getCookieValByKey('ImeshVisitor', 'glid') ? query.contacts_glid : query.fk_glusr_usr_id) }}>
              {query.contacts_mobile1 && <input type="button" value="" style={styles.imageCss().bgMsc} className="msLiCl poa CLiCl" />}
            </i>):''}
          </div>
          <a href={'/messages/conversation/?sup_glid='+btoa(query.contacts_glid)} onClick={() => {  localThis.readUnread(key + 1), gaTrack.trackEvent(['Home-Page-Clicks-PWA','Message-Listing-Dashboard',"Req-"+(key+1), 0, true]) }} className={userModeN==2?"por  db minH56   wd_105 ":"por db pd10 h90 wd_85 minH56 "}>
          <div className='flx flx-s'>
            {user_img}
            <div className={userModeN==2?" lh20 clr33  w100 flx-s "+((key+1)>2?'': ""):" lh20 clr33"} id={"data" + (key + 1)} >
              <p id={"company" + (key + 1)} className={`${(query.unread_message_cnt != null && query.unread_message_cnt > 0)?"fs15 truncate fw":"fs15 truncate fw"} notranslate`}>{query.contacts_company?query.contacts_company : user_name}</p>
              {query.contacts_company?<p className="fs14 truncate"><svg class="vam dib mr2"  xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="15px" fill="#5a5a5b"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></svg>{(query.contact_city) ? user_name + ', ' + query.contact_city : (query.country_name) ? user_name + ', ' + query.country_name : user_name }</p> 
              :(query.contact_city||query.country_name)?<p className='fs13 truncate'><svg class="mr5" viewBox="0 0 8 11" height="11" width="11" xmlns="http://www.w3.org/2000/svg"><path fill="#757575" fill-rule="nonzero" d="M4 0C1.794 0 0 1.817 0 4.05c0 .582.118 1.138.35 1.653 1 2.215 2.917 4.555 3.481 5.219a.222.222 0 0 0 .338 0c.563-.664 2.48-3.003 3.481-5.22A3.99 3.99 0 0 0 8 4.05C8 1.817 6.205 0 4 0zm0 6.153c-1.146 0-2.078-.943-2.078-2.103 0-1.16.932-2.104 2.078-2.104 1.145 0 2.078.944 2.078 2.104 0 1.16-.932 2.103-2.078 2.103z"></path></svg>{ query.contact_city?query.contact_city:(query.country_name?query.country_name:'')}</p>:''}
               {(query.msg_read_status!== undefined && query.msg_read_status !== null && query.msg_read_status == "1") ? <i className="fl pdt2 pdr5 "><span className="dib"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
<path fill="#2980B9" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z">
</path>
</svg></span></i> : ''}
              
 {(last_msg != null && last_msg != "" && query.unread_message_cnt != null && query.unread_message_cnt > 0)?<div className='flx'><p className=" fs13 truncate lastreply" id ={"unread" + (key + 1)}>{localThis.props.bubbleLoader===key+1?<div class="dLoad tc"> <div class="b1 bgmim"></div><div class="b2 bgmim"></div><div class="b3 bgmim"></div></div>:localThis.props.replyText&&localThis.props.replyText[key+1]?localThis.props.replyText[key+1]:last_msg}</p> {(!(localThis.props.replyText&&localThis.props.replyText[key+1]))?<span class="brdr50 dib bgmim por ml5 Nmbr tc flx-s" >{query.unread_message_cnt}</span>:''} </div>:<p className="fs14 truncate clr777">{localThis.state.lastMsgText?localThis.state.lastMsgText:last_msg}</p>} 
         </div>  </div> 
          </a>

         {(query.unread_message_cnt != null && query.unread_message_cnt > 0 )&&(!localThis.props.replySentCom||!localThis.props.replySentCom.includes(key+1))? <div className='flx mt5 ml50'> <button id ="buttonOne" className='fs13 fw bgw bdr1e6 bxrd20 pd5 mr10 clrmim' onClick={()=>{gaTrack.trackEvent(['Home-Page-Clicks-PWA','Message-Listing-Dashboard',"Ask for Details|QuickReply", 0, true]),gaTrack.trackEvent(['Messages','Reply-Template-Selected-Listing-HomePage',"More Details_"+Utype, 0, true]),localThis.lastMsgText='Can you share more details about this requirement?',localThis.props.sendReplyy("",1,"C",'Can you share more details about this requirement?',localThis.glid,query.contacts_glid,userType,'',400,localThis.name,getCookieValByKey('ImeshVisitor', 'mb1'),'',41,key+1,localThis.props.replySentCom,localThis.lastMsgText,localThis.props.replyText,localThis.state.countHome-parseInt(query.unread_message_cnt),localThis.callUpdate)}} >Ask for Details <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m.667 6 7-3-7-3v2.333l5 .667-5 .667V6z" fill="#0AA699"/>
</svg> </button>  
{query.is_txn_initiator == 1&&(!localThis.props.replySentCom||!localThis.props.replySentCom.includes(key+1)) ? <button id ="buttonTwo" className='fs13 fw bgw bdr1e6 bxrd20 pd5 clrmim' onClick={()=>{gaTrack.trackEvent(['Home-Page-Clicks-PWA','Message-Listing-Dashboard',"Request Call Back|QuickReply", 0, true]),gaTrack.trackEvent(['Messages','Reply-Template-Selected-Listing-HomePage',"Request Call Back_"+Utype, 0, true]),localThis.lastMsgText='Can you please call to discuss this?',localThis.props.sendReplyy("",1,"C",'Can you please call to discuss this?',localThis.glid,query.contacts_glid,userType,'',400,localThis.name,getCookieValByKey('ImeshVisitor', 'mb1'),'',41,key+1,localThis.props.replySentCom,localThis.lastMsgText,localThis.props.replyText,localThis.state.countHome-parseInt(query.unread_message_cnt),localThis.callUpdate)}}>Request Call Back <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m.667 6 7-3-7-3v2.333l5 .667-5 .667V6z" fill="#0AA699"/>
</svg> </button> : ''}</div>:'' }
        
         {localThis.props.failFlag&&localThis.props.failFlag==key+1?<div className="red_txt dib pdb10 ml60 mt5 fs13">Some error occured please try again.</div>:''}
        </li>
      
    )
 });
 }
var userModeN = checkUserStatus();
//if(localThis.checkGlid){
if(DashboardList){var finalMSGlist =   <div class="bgw ml10 mr10 brd5 bxdw2"><Link to={{pathname:"/messages/", query:{ref:'hometop'}}} onClick={() => yandexTrackingMultiLevel('Home',' Messages-Dashboard-Top',(userModeN==2 ? 'Full-Login':'Identified'))}>
{userModeN==2?
<div class="mt10 pdt10 pdl20 flxCntr por df w100  bgcfe bxrd10_t">
<div className="mr10">
<img src={imgSrc} alt="msg-icon" onClick={() => eventTracking('Home-Page-Clicks-PWA','Message-Listing-Dashboard','Iconclick', true)} width={30}/></div>
<span className=" fw tl  colorDash mb10 w100p pdb2 fs18 mt5"
 onClick={() => eventTracking('Home-Page-Clicks-PWA','Message-Listing-Dashboard','Headingclick', true)}>Messages</span>
<Link to={{pathname:"/messages/"}} onClick={() => eventTracking('Home-Page-Clicks-PWA','Message-Listing-Dashboard','View All', true)} class="fs14 htmn30 bgw bdr1e6 clrmim fw db tc w100px  mr10 mb10 bxrd20 lh30 mla" >View All
</Link>
                                                               
</div>:''
/* <span class="dib mt10 mb10 pdl20 w100"><i class="msDash fl dib"></i>
<span className="fs16 fw dib tl pdl20 colorDash pdt10">View recently connected <br/> {(getCookieValByKey('ImeshVisitor', 'utyp')=='P') ? "Buyers":"Sellers"}</span>
</span> */
}
</Link>
<ul className="Mcntr pdl10 pdr10"
>
{DashboardList}
</ul>
</div>} 

  if(getCookieValByKey('ImeshVisitor', 'utyp')=='P'){
     if(userModeN == 2 && this.props && (this.props.messageListing) || this.props.buyleads && this.props.buyleads!='' ){
       
      return(
        <div className="mt10 mb10">
        {finalBLlist}{finalMSGlist}
        </div>
      );

    }
    else{
      if(userModeN == 1){
      return(
      <SellerTool/>
      );
    }
    }
  }
  else{
    
    if(userModeN == 2 && this.props && this.props.messageListing && this.props.messageListing.length>0){
      return(
        <div className="mt10 mb10">
        {finalMSGlist}
        </div>
      );
    }
    if(userModeN == 1){
      
      return(
        
       
{/* <div className="m10 bgw bxrd10"><Link to={{pathname:"/messages/", query:{ref:'hometop'}}} className="pd10 clrw fs14 db bxrd4 crx"  onClick={() => yandexTrackingMultiLevel('Home',' Messages-Dashboard-Top',(userModeN==2 ? 'Full-Login':'Identified'))} ><i class="msDash fl ml15 mr15" onClick={()=>eventTracking('Home-Page-Clicks','Message-Listing-Dashboard','Icon-click', true)}></i><p className="fs16 fw clrb pdmsg tc"  style="color: #545f6c;"><span class="dib tl" onClick={()=>eventTracking('Home-Page-Clicks','Message-Listing-Dashboard','Heading-click', true)}>View recently connected <br/> Sellers</span></p>
</Link><Link class="db clr33 pdlr15 fs16 brdD fw bgCce tc pd15 bxsdw" to={{pathname:"/messages/"}} onClick={() => eventTracking('Home-Page-Clicks','Message-Listing-Dashboard','View-All', true)} > View all <svg class="mr15" xmlns="http://www.w3.org/2000/svg" fill="#545f6c" width="20" height="15" viewBox="0 0 14.237 10.011"><path d="M9.587 4.825a.5.5 0 0 0-.717.71l3.638 3.638H.5a.5.5 0 0 0-.5.5.505.505 0 0 0 .5.51h12.008l-3.639 3.633a.515.515 0 0 0 0 .717.5.5 0 0 0 .717 0l4.5-4.5a.494.494 0 0 0 0-.71z" transform="translate(0 -4.674)"></path></svg></Link></div> */}


        
        
      );
    }

  }


  }
}

export default recentSellersDashboard;