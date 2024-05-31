import React , { Component } from 'react';
//import gblFunc from '../../../Globals/GlobalFunctions';

import {modifylang, voicesearch} from '../../../Globals/VoiceAndLang';
import {setCookie} from '../../../Globals/CookieManager';
import {eventTracking, gaTrack} from '../../../Globals/GaTracking';


class Langchooser extends Component{
	constructor(props){
        super(props);
        let lang_array_lc;
        let q = this.props.lang
        if(q){
            lang_array_lc = this.props.lang;
        }
        this.modifylang = this.modifylang.bind(this);
        this.toggleLang = this.toggleLang.bind(this);
        this.state = {
            lang : lang_array_lc
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.lang!=nextProps.lang){
            this.setState({
            lang : nextProps.lang
            })
        }
    }

    modifylang(lang){
            let updatedlang = modifylang(lang, true);
            this.setState({
                lang : updatedlang,
            })
        }
    toggleLang(){
     let p = document.getElementById('LangChoice');
     let q = document.getElementById('change_lang');
     if(p.className.indexOf('dn')=='-1'){
        p.classList.add('dn');
        q.classList.remove('chLangDiv2')
     }else{
        p.classList.remove('dn');
        q.classList.add('chLangDiv2');
    }
    }

	render(){
        let label = '';
        let self_lc = this;
        if(window.location.href.indexOf('messages')>0){
            label = "_Messages";
        }
        else{
            label = '' ;
        }
        let suggester = this.state.lang.map(function(query,key){
          if(key==0)
            return <span class="lgactive dib txtElip mr5 pl10 pr10 pdt5 pdb5 bxrd20 tc bdrA0 vam fb fs14" onClick={()=>{voicesearch(query[1],self_lc.props.eventCategory,'','',self_lc.props.page);self_lc.modifylang(query[1]); gaTrack.trackEvent([self_lc.props.eventCategory?self_lc.props.eventCategory :('Voice-Search-PWA'+label),'Change_Language_Page',query[1], 0, true]);}}>{query[2]}</span>
          return <span class="colAf dib txtElip mr5 pl10 pr10 pdt5 pdb5 bxrd20 tc bdrA0 vam fb fs14" onClick={()=>{
              voicesearch(query[1],self_lc.props.eventCategory,'','',self_lc.props.page);
              self_lc.modifylang(query[1]);
              eventTracking('Voice-Search-PWA'+label,'Change_Language_Page',query[1], false);
            }}>{query[2]}</span>
        });
        return(
                <div>
                    <div class="fs16 clr33 pd10 change_lang pf w100 b80">
                        <span id="change_lang" class="dib por">Change Language</span>
                    </div>
                    <div class="oh h45 pf w100 b25 notranslate">
                        <div id="LangChoice" class="tl scWrap pdb15 pt3 ht65 pl10">{suggester}</div>
                    </div>
                </div>                   
        )

	}
}


export default Langchooser