import React , { Component } from 'react';
import Langchooser from './Langchooser'
import { VOICE_LANGUAGES } from '../../../constants/voiceLanguages';

import {lang_input_for_voice, modifylang, voicesearch, setlang} from '../../../Globals/VoiceAndLang';
import {eventTracking, gaTrack,prevname} from '../../../Globals/GaTracking';
import {yandexTrackingMultiLevel} from '../../../Globals/yandexTracking';

import {getCookie, setCookie} from '../../../Globals/CookieManager';

import attachSuggester from '../../../Globals/attachSuggester';
import '../css/voice.css';
class Voicehtml extends Component{
	constructor(props){
        super(props);
        this.trackvoice = this.trackvoice.bind(this);
        let q = JSON.parse(localStorage.getItem('langpref_1'));
        let lang_array;
        this.label = '';
        if(q){
            lang_array = q;
        }else{
            lang_array = VOICE_LANGUAGES;
            localStorage.setItem('langpref_1', JSON.stringify(lang_array));
        }
        this.updateLang = this.updateLang.bind(this);
        this.type=this.props.type?this.props.type:"";
        //listen in hindi incase cookie is set
        //gblFunc.getCookie('lang')==1?lang_array=gblFunc.modifylang('hi-IN',true):'';
        this.state = {
            langugage_props : lang_array,
            voiceClicked:false,
            showModal:true,
            selLang: q? q[0]: ""
        }
        if(window.location.href.indexOf('messages')>0){
            this.label = "_Messages";
        }
        else{
            this.label = '' ;
        }
    }
     componentDidUpdate(){
    document.getElementById("imPWAHeader") && document.getElementById("imPWAHeader").style.display == "none" ? document.getElementById("imPWAHeader").style.display= "block":"";
     if(this.state.voiceClicked)
       if(this.props.voiceEnqState) {
     if(this.props.voiceEnqState == true) {
        lang_input_for_voice(this.props.eventCategory,this.props.form,this.props.type,this.props.page,this.props.EnqBlTrack) }
       } else {
        lang_input_for_voice(this.props.eventCategory,this.props.form,this.props.type,this.props.page,this.props.EnqBlTrack)

       }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.form=="Enq"){
            if(nextProps.type) {
           let  p = document.getElementById(`vSrIcoBL_enq${nextProps.type}`)

                setlang();
                if(p && 'webkitSpeechRecognition' in window){
                p.addEventListener('click',
                    this.trackvoice
                    
                , false);
                }                
            }
        let p = document.getElementById('vSrIcoBL_enq');
        setlang();
        if(p && 'webkitSpeechRecognition' in window){
        p.addEventListener('click',
            this.trackvoice
            
        , false);
        }
        }
        
    }

    trackvoice(){
        if(!window.jQuery  || !(typeof (Suggester) == "undefined"))
        attachSuggester();
        this.setState({voiceClicked:true})
        let pg_name = 'search-PWA';
        let cat_clicks = 'Header-Clicks-PWA';
        if(window.location.pathname == '/'){
            pg_name = 'Search-voice-icon|'+ prevname();
            cat_clicks = 'Header-Clicks'
            gaTrack.trackEvent(['Home-Page-Clicks-PWA','Header-Clicks',pg_name,0,true]);
        }
        if(window.location.href.indexOf('messages')>0){
            pg_name = 'Messages';
            cat_clicks = 'Messages';
        }
        let action = this.props.action ? this.props.action : '';
        if(action == 'FAQ'){
            eventTracking(this.props.eventCategory,'Voice_icon_clicked','Faq',true);
        }
        else
        yandexTrackingMultiLevel('Header','Voice_icon_clicked',pg_name);
        //listen in hindi in case cookie is set
        getCookie('lang') && getCookie('lang')==1
        ?this.updateLang('hi-IN')
        :'';
        if(this.state.voiceClicked)
{ 
    if(this.props.voiceEnqState) {
        if(this.props.voiceEnqState == true) {
           lang_input_for_voice(this.props.eventCategory,this.props.form,this.props.type,this.props.page,this.props.EnqBlTrack) }
          } else {
           lang_input_for_voice(this.props.eventCategory,this.props.form,this.props.type,this.props.page,this.props.EnqBlTrack)
   
          }
    } 
}
 componentDidMount(){
    document.getElementById("imPWAHeader") && document.getElementById("imPWAHeader").style.display == "none" ? document.getElementById("imPWAHeader").style.display= "block":"";
    if(this.props.action == 'FAQ'){
        let r = document.getElementById('qaVoice');
        if(r && 'webkitSpeechRecognition' in window){
            r.addEventListener('click',
                this.trackvoice
            , false);
            } 
        }
        else if(this.props.form=="Enq"){
            if(this.props.type) {
                let id = "vSrIcoBL_enq"+ this.props.type;
                var k = document.getElementById(id);
                setlang();
                if(k && 'webkitSpeechRecognition' in window){
                    k.addEventListener('click',
                    this.trackvoice
                    
                , false);
                }                
            }
        let p = document.getElementById('vSrIcoBL_enq');
        setlang();
        if(p && 'webkitSpeechRecognition' in window){
        p.addEventListener('click',
            this.trackvoice
            
        , false);
        }
        }
    else{
        let p = document.getElementById('vSrIco');
        let q = document.getElementById('vSrIco1');
        let r = document.getElementById('vSrIco2')
       
        setlang();
        if(p && 'webkitSpeechRecognition' in window){
        p.style.display = 'block';
        p.addEventListener('click',
            this.trackvoice
            
        , false);
        }
        if(q && 'webkitSpeechRecognition' in window){
            q.style.display = 'block';
            q.addEventListener('click',
                this.trackvoice
                
            , false);
            }
        if(r && 'webkitSpeechRecognition' in window){
                r.style.display = 'block';
                r.addEventListener('click',
                    this.trackvoice
                    
                , false);
            }    
        if(this.props.page=='homeNewUser' || this.props.page=='dir'|| this.props.page=='grp'||this.props.page=='subcat' || this.props.page=='Message' || this.props.page=='InMessage' )
            {
                this.trackvoice();
            }
    }
       
    }
updateLang(lang){
    let new_state = modifylang(lang, true);
    this.setState({
        langugage_props : new_state,
        selLang: lang
    })
}

shouldComponentUpdate(nextProps,nextState)
{
    if(this.state.selLang !=nextState.selLang ){
        return true;
    }
    if(!this.state.voiceClicked)
    return true
    else
    return false
}
    
selectPageTracking(action,label){
    gaTrack.trackEvent([this.props.eventCategory ? this.props.eventCategory :'Voice-Search-PWA','Select_Language_Page'+action,label, 0 ,true])
}
	render(){
        var selectedLang = JSON.parse(localStorage.getItem('lang'))
 if(this.state.voiceClicked || this.props.searchAutoSuggestVoice)
 return(
            <>
                <div class="mbg" id="vSrhMain">
    <div class="pf bgw w100 ht100 tc">
        <div id="waves" class="bg1e por mn30vh clrw">
            <div class="fs22 poa sCntr w100" id="lang_text">{selectedLang && selectedLang[3]}</div>
            <span id="vCls" class="poa vSrCrs" onClick={()=>{this.props.voiceHtmlnil?this.props.voiceHtmlnil():'';if(this.props.closeVoiceOT){this.props.closeVoiceOT(false); document.getElementById("tempht")?document.getElementById("tempht").style.display = "block":'';document.body.style.overflow = "hidden";}if(this.props.closePopup){this.props.closePopup();}}}><svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h15v15H0z" fill="none"></path></svg></span>
            <svg viewBox="0 0 120 28" class="poa w100 waveSvg">
                <defs> 
                   <path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
                </defs>
                 <use id="wave3" class="wave" xlinkHref="#wave" x="0" y="-2" ></use> 
                 <use id="wave2" class="wave" xlinkHref="#wave" x="0" y="0" ></use>
                <use id="wave1" class="wave" xlinkHref="#wave" x="0" y="1" ></use>
              </svg>
        </div>
            <div class="pd10 colBlu ht52 poa w100 alignY">
                <span id="catch_text" class="fs20">{selectedLang && selectedLang[5]}</span>
                <p class="fs18 dn" id="retry_new" onClick={()=>{lang_input_for_voice(this.props.eventCategory,this.props.form,this.props.type,this.props.page,this.props.EnqBlTrack);gaTrack.trackEvent([this.props.eventCategory?this.props.eventCategory:'Voice-Search-PWA','Retry_clicked'+this.label,'English', 0, true]);document.getElementById('retry_new').style.display = 'none';}}><span id="retry_text_val" class="db">{selectedLang && selectedLang[4]}</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="vam" viewBox="0 0 16 16"><path fill="#048F9C" d="M8 0c-3 0-5.6 1.6-6.9 4.1l-1.1-1.1v4h4l-1.5-1.5c1-2 3.1-3.5 5.5-3.5 3.3 0 6 2.7 6 6s-2.7 6-6 6c-1.8 0-3.4-0.8-4.5-2.1l-1.5 1.3c1.4 1.7 3.6 2.8 6 2.8 4.4 0 8-3.6 8-8s-3.6-8-8-8z"/></svg></p>
            </div>
            <Langchooser lang={this.state.langugage_props} action = {this.props.action} eventCategory = {this.props.eventCategory} page={this.props.page}/></div></div>
            
            <div id={"selectLang"+this.type} class="mbg notranslate">
            <section class="voice_lang bxsdw bgw pf bxrd4" id={"inline_enquiry" + this.type}>
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg" class="fr" id="close_langPopup" onClick={()=> { if(this.props.closePopup) {  this.setState({voiceClicked : false}); this.props.closePopup();  }
              if(this.props.closeVoiceOT){this.props.closeVoiceOT(false)}
              document.getElementById("selectLang"+this.type)?document.getElementById("selectLang"+this.type).style.display = "none":'';} }>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                <path d="M0 0h15v15H0z" fill="none"/>
                </svg>
                <div class="fs18 fwn pdt10 tc crb">Select Language</div>
                <div class="mb5 lang_choc">
                <ul class="cl87 lh18">
                    <li class="pd10" onClick={()=>{voicesearch('en-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'English');this.updateLang('en-IN');}}><p class="fb clr33">English(India)</p>English(India)</li>
                    <li class="pd10" onClick={()=>{voicesearch('hi-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'hindi');this.updateLang('hi-IN');}}><p class="fb clr33">हिंदी(भारत)</p>Hindi(India)</li>
                    <li class="pd10" onClick={()=>{voicesearch('mr-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'marathi');this.updateLang('mr-IN');}}><p class="fb clr33">मराठी</p>Marathi</li>
                    <li class="pd10" onClick={()=>{voicesearch('ta-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'tamil');this.updateLang('ta-IN');}}><p class="fb clr33">தமிழ்</p>Tamil</li>
                    <li class="pd10" onClick={()=>{voicesearch('kn-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'kannada');this.updateLang('kn-IN');}}><p class="fb clr33">ಕನ್ನಡ</p>Kannada</li>
                    <li class="pd10" onClick={()=>{voicesearch('te-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'telugu');this.updateLang('te-IN');}}><p class="fb clr33">తెలుగు</p>Telugu</li>
                    <li class="pd10" onClick={()=>{voicesearch('gu-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'gujarati');this.updateLang('gu-IN');}}><p class="fb clr33">ગુજરાતી</p>Gujarati</li>
                    <li class="pd10" onClick={()=>{voicesearch('bn-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'bangle');this.updateLang('bn-IN');}}><p class="fb clr33">বাংলা</p>Bangla</li>
                    <li class="pd10" onClick={()=>{voicesearch('ml-IN',this.props.eventCategory,this.props.form,this.props.type,this.props.page);this.selectPageTracking(this.label,'malayali');this.updateLang('ml-IN');}}><p class="fb clr33">മലയാളം</p>Malayali</li>
                    </ul></div></section></div>
                
                    </>
           
        )
       

	}
}


export default Voicehtml
