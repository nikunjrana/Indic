import React, {Component} from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import {Link} from 'react-router';

import {getCookieValByKey, getCookie} from '../../../Globals/CookieManager';
import {eventTracking} from '../../../Globals/GaTracking';

class recentsearches extends Component{
	constructor(props){
		super(props);
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.AK='';		
        if(getCookie('im_iss','') !='' && getCookie('im_iss', '')!=undefined) {		
            var AK_cookie=getCookie('im_iss', '');	
            var cookie_arr=AK_cookie.split("=");
            if(cookie_arr[1]!=undefined) {
                this.AK=cookie_arr[1];
            }

        }
        var self = this;
	}

	componentDidMount(){
		if(this.glid && this.AK!=''){
    
	   	this.props.getrecentsearches(this.glid);
	   }
	}
    componentWillReceiveProps(nextProps){
        if(this.props.updateprops != nextProps.updateprops)
        {
            if(this.glid && this.AK!=''){
       this.props.getrecentsearches(this.glid);
       }
        }

    }

	render(){

		var listitems='';
		var head = this.props.translatedText?this.props.translatedText.WID_RECENT_HEADING1 :'';
        var classes= 'dn';
        var li_class = this.props.type ? 'm5 ml0 dib bgff tc pdl16 pdr16  bxrd8 h35':'mb5 mr5 dib fw bgf1 clr7B tc pdl5 pdr5 bxrd20';
        var lidiv_class = this.props.type ? 'mt5 mb5 fs14 lh25 bgff clrb':'mt5 mb5 fs13 lh21 clr7B clrb';
        var gatrck = this.props.type ? 'Product-Page-Clicks':'Search-Page-Clicks';
        var index_val = this.props.type ? 5 : 8;
        var cq = this.props.location?this.props.location.query.cq:'';
        var pr = this.props.location?this.props.location.query.pr:'';
        var biz = this.props.location?this.props.location.query.biz:'';


        var ga_data_recent_searches = this.props.ga_data?this.props.ga_data:'';
        if(this.props.get_recentsearches.hasOwnProperty('details') && this.props.get_recentsearches['details']['searches'].length > 0 && this.glid){
            var res = this.props.get_recentsearches['details']['searches'];
            classes="db tc bgf1";
            



            listitems = res.map((items,index) =>{
                if(index<index_val)
                {
                    const name= items.search;
                    const enuri=encodeURI(name);
                    var urlAppend = "s=" + enuri + (cq ? "&cq=" + cq : "") + (pr ? "&pr=1" : "") + (biz ? "&biz=" + biz : "");
                    return (<li class={li_class}>

                        <div class={lidiv_class}>

                            <Link  to={'/isearch.php?'+urlAppend}  className="clr7B pd10" onClick={() => {eventTracking(gatrck,'Recent_Searches_I',index , true);
                                this.props.page=='Product-Detail'?'':window.scrollTo(0,0);this.props.up_date() }} >
                                {name}</Link>

                        </div>
                    </li>)
                }

            });

        }
        else if((!this.glid) && localStorage.getItem("recentSearches"))
        {
            classes="db tc bgf1";   
            var recentSearches1 = localStorage.getItem("recentSearches");
            var recentsearches = JSON.parse(recentSearches1);
            listitems = recentsearches.map((items,index) =>{
                            const name= items.displaykeyword;
                            const enuri=encodeURI(name);
                            
                           
                var urlAppend = "s=" + enuri + (cq ? "&cq=" + cq : "") + (pr ? "&pr=1" : "") + (biz ? "&biz=" + biz : "");

                return (<li class={li_class}>

                    <div class={lidiv_class}>
                        <Link  to={'/isearch.php?'+urlAppend}  className="clr7B pd10" onClick={() => {eventTracking(gatrck,this.props.page=='Product-Detail'?'Recent-Search-Section':'Recent_Searches_U',(this.props.page=='Product-Detail'?'Suggestion-':'')+index , true);
                           this.props.page=='Product-Detail'?'':window.scrollTo(0,0); this.props.up_date()}}  >
                            {name}</Link>
                            </div>
                            </li>)


            });

        }
        if (listitems =='' && this.props.type && localStorage.getItem("relCats"))
        {
            classes="db tc bgf1";
            var recentSearches1 = localStorage.getItem("relCats");
            var recentsearches = JSON.parse(JSON.parse(recentSearches1));
            listitems = recentsearches.map((items,index) =>{
                if(index<index_val)
                {
                const name= items.GLCAT_MCAT_NAME;
                const enuri=encodeURI(name);

                var urlAppend = "s=" + enuri + (cq ? "&cq=" + cq : "") + (pr ? "&pr=1" : "") + (biz ? "&biz=" + biz : "");

                return (<li class={li_class}>

                    <div class={lidiv_class}>
                        <Link  to={'/isearch.php?'+urlAppend}  className="clr7B pd10" onClick={() => {eventTracking(gatrck,'Related_Cats',index , true);
                            this.props.page=='Product-Detail'?'':window.scrollTo(0,0); this.props.up_date()}}  >
                            {name}</Link>
                    </div>
                </li>)
                }

            });


        }

        return (
            (listitems != '' && this.props.type) ? 
                <div>
                <div className="mt20 ml10 mb10 mr10 pdt10 bxrd10 bgw"> 
                    <span className="mt10 fw fs18 dib pl10 ml5">Looking for something else ? </span>
                { this.props.type ? <section  id="recentSearchSection" className="db tc" >
                <div className="bgw w100 cb dib mb10">
                <div className="tl pl10 pr10 pdb5 scWrap">
                                <ul className="d_ib" id='recentSearch'>
                                {listitems}     
                </ul>
                        </div>
                    </div>
                </section>
                :  <section className={classes}>
                        <div className="bgw w100 cb dib mt10 mb10">
                            <section id="recentSearchSection" className="db tc" style="display: block;">
                                <div className="bgw w100 cb dib mt10 mb10">
                                    <h3 className="db sh fs15 ml10 mr10 fw mb10 tc clrb" style="margin-bottom:10!important">{head}</h3>
                                    <div className="tl pd10">
                                    <ul className="d_ib" id="recentSearch">{listitems}</ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                }
                </div><p style={ this.props.page=='Product-Detail'?"":"pagepadding: 8px;"}></p></div>
            :''
            
)






	}
}
export default recentsearches;