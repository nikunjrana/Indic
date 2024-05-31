import React, { Component } from 'react';
import Voicehtml from '../../buyer/components/Voicehtml';
// import { lang_input_for_voice } from '../../../Globals/VoiceAndLang';
import { eventTracking,prevname } from '../../../Globals/GaTracking';
import { yandexTrackingMultiLevel} from '../../../Globals/yandexTracking';
import { goToRoute } from '../../../Globals/routingFunction';
import '../css/searchAutoSuggest.css';
import attachSuggester from '../../../Globals/attachSuggester';
import {getCookie, getCookieValByKey, setCookie} from '../../../Globals/CookieManager';
import { Link } from "react-router";
import { loadTimeTracking } from '../../../Globals/MainFunctions';
// import { srchRouteHandling } from '../../SearchList/components/searchMain/utility/searchRedirectionTracking';

class SearchAutoSuggest extends Component {
    constructor(props) {
        super(props);
        this.hideRoot = this.hideRoot.bind(this);
        // this.srchLCP = this.srchLCP.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleShowRemove = this.handleShowRemove.bind(this);
        this.selecttext = this.selecttext.bind(this);
        this.removeDiv = this.removeDiv.bind(this);
        this.srchInpClick = this.srchInpClick.bind(this);
        this.searchTermHandling = this.searchTermHandling.bind(this);
        this.routeHandling = this.routeHandling.bind(this);
        this.urlHandling = this.urlHandling.bind(this);
        this.getRecents = this.getRecents.bind(this);
        this.jqac = {};
        this.fixAutocomplete= this.fixAutocomplete.bind(this);
        this.loadComponentOnTouch= this.loadComponentOnTouch.bind(this);
        this.backButtonClicked= this.backButtonClicked.bind(this);
        this.stickySearchBar = '';
        this.buyleadsHandleShow=true;
        this.orgPos = 0;
        this.state = { searchTerm: window.location && window.location.href && window.location.href.includes('isearch.php') && this.props.placeholder &&this.props.placeholder.toLowerCase()!='search indiamart'? this.props.placeholder : "", currUrl: "", prevUrl: window.location.search}
        window.addEventListener("pointerdown", this.loadComponentOnTouch, { passive: true });
        window.addEventListener("scroll", this.loadComponentOnTouch, { passive: true });
        this.gaCookie = getCookie("_ga");
        this.gridGaLastDigit=this.gaCookie&&this.gaCookie.length>1?this.gaCookie[this.gaCookie.length-1]:'';
    }
    // srchLCP(searchTerm){
    //     if(searchTerm.toLowerCase() == 'anaxit' || searchTerm.toLowerCase() == 'anbond' || searchTerm.toLowerCase() == 'amul' || searchTerm.toLowerCase() == 'amchur' || searchTerm.toLowerCase() == 'amazonite' || searchTerm.toLowerCase() == 'curd' || searchTerm.toLowerCase() == 'milk' || searchTerm.toLowerCase() == 'torch' || searchTerm.toLowerCase() == 'apple' || searchTerm.toLowerCase() == 'spinach'){
    //         return true;
    //     }
    //     else return false;
    // }
    hideRoot(searchTerm){
        this.removeAllDiv();
        document.getElementById('srchInp') && searchTerm ?document.getElementById('srchInp').innerHTML=searchTerm:'';
        document.getElementById('root')?document.getElementById('root').style.display='none':'';
        document.getElementById('autosug_div') ? document.getElementById('autosug_div').style.display = "none":"";
        let loader = document.getElementById("gblLoader");
        if (loader && loader.style.display == 'none'){
            loader.style.display = "block";
            loader.style.visibility = "visible";
            let spinner = document.getElementsByClassName('mSpinner') ? document.getElementsByClassName('mSpinner'):"";
            let header = document.getElementById("imPWAHeader");
            if (spinner[0] && header) {
                loader.style = "background-color: white;width:100%;height:100%;margin:auto;display: flex;align-items:center;justify-content:center;";
                spinner[0].style = 'width:0% !important;height:0% !important; padding: 0 15% 20% 0 !important';
                header.style = 'z-index: 999999 !important;position:relative !important'
            }
        }
    }
    fixAutocomplete(){
        if(document.getElementById("search_hme")){
            document.getElementById("search_hme").setAttribute("autocomplete","off");
          }
    }
    removeSearchTxt(){
        // document.getElementById('search_hme') ? document.getElementById('search_hme').value = '' : '';
    }
    componentWillUnmount() {
        if (window.searchautoSuggTermhandling) { delete window.searchautoSuggTermhandling };
        this.removeAllDiv();
        (document.getElementById('srchInp')) ? document.getElementById('srchInp').removeEventListener('click', this.srchInpClick) : '';
    }
    removeAllDiv = () => {
        let auto_ul = document.getElementsByClassName("showhidesugg");
        if(auto_ul && auto_ul.length){
            for(let i=0;i<auto_ul.length;i++){
              auto_ul[i].style.display = "none";
            }
        }
    }
    removeDiv() {
        let auto_ul = document.getElementsByClassName("showhidesugg")[0]?document.getElementsByClassName("showhidesugg")[0]:'';
        if (auto_ul)
            auto_ul.style.display = "none";
    }
    handleShow() {
        this.fixAutocomplete();
        let that = this;
        document.getElementById('closeicn').onclick = function () {
            document.getElementById('search_hme').value = '';
            that.setState({searchTerm: ''});
            document.getElementById('search_hme').focus()
        }
        document.getElementById('search_hme').addEventListener('blur', function (e){
            that.fixAutocomplete();
        });
        document.getElementById('search_hme').addEventListener('keyup', function (e){
            that.fixAutocomplete();
        });
        document.getElementById('search_hme').addEventListener('keyup', function (e) {
            that.fixAutocomplete();
            if (e.keyCode === 13 && document.getElementById('search_hme') && document.getElementById('search_hme').value) {
                that.removeAllDiv();
                let searchTerm =that.searchTermHandling();
                if (searchTerm){
                    if (that.props.pageName == "MiniPDP"){
                        eventTracking(window.searchautoSuggTermhandling?'Trac-AutoSuggest':'Trac-searchItems', window.searchautoSuggTermhandling?'Search-Top|Side-Arrow-Edited':'Search-Top', searchTerm, false);
                        let route =window.searchautoSuggTermhandling?that.urlHandling(window.searchautoSuggTermhandling,searchTerm):that.urlHandling('',searchTerm);
                        if(window.searchautoSuggTermhandling){delete window.searchautoSuggTermhandling};
                        that.setState({currUrl: '?s=' + searchTerm + '&prdsrc=1'})
                        that.routeHandling(true,route)
                        that.props.closeMiniPDP();
                    }
                    if (that.props.page && that.props.page == 'buyleads'){
                        eventTracking('Trac-blsearchItems', 'Search-Top', searchTerm, false);
                        that.hideRoot(document.getElementById('search_hme').value);
                        history.replaceState("","",'/bl/search.php?s=' + searchTerm);
                        that.setState({currUrl: '?s=' + searchTerm + '&prdsrc=1'})
                        location.reload();
                    }
                    if (that.props.page == 'Home' || that.props.page == 'DIR' || that.props.page == 'GROUP-PAGE' || that.props.page == 'subcat') {
                        let route =window.searchautoSuggTermhandling?that.urlHandling(window.searchautoSuggTermhandling,searchTerm):that.urlHandling('',searchTerm);
                        eventTracking(window.searchautoSuggTermhandling?'Trac-AutoSuggest':'Trac-searchItems', window.searchautoSuggTermhandling?'Search-Top|Side-Arrow-Edited':'Search-Top', searchTerm, false);
                        if(window.searchautoSuggTermhandling){delete window.searchautoSuggTermhandling};
                        that.setState({currUrl: '?s=' + searchTerm + '&prdsrc=1'})
                        that.routeHandling(false,route)
                        
                    }
                }
                

            }
        }, {passive:true});

        if (that.props.pageName == "MiniPDP") {
            document.getElementById('backArrow').onclick = function () {
                document.getElementById('autosug_div').classList.add("dn");
                document.getElementById('autosug_div').style.display = "none"
                document.getElementById("imPWAHeader").style.display= "block";
                that.removeDiv();
            }
            
            document.querySelector("#search_hme").focus();
            document.querySelector("#search_hme").click();

            that.handleShowRemove();
        }
        
        else {
            (document.getElementById('srchInp')) ? document.getElementById('srchInp').addEventListener('click',()=> requestAnimationFrame(()=>setTimeout(()=> this.srchInpClick(),0)), {passive:true}) : '';
            (document.getElementById('srchIcn')) ? document.getElementById('srchIcn').addEventListener('click',()=> requestAnimationFrame(()=>setTimeout(()=> this.srchInpClick(),0)), {passive:true}) : '';
            
        }
    }

    backButtonClicked(){
            if (typeof this.orgPos === 'number') {
                window.scrollTo(0, this.orgPos);
            }
            document&&document.body&&document.body.style?document.body.style.overflow = "unset":'';
            document.getElementById('search_hme')?document.getElementById('search_hme').blur():'';
            if(this.props.page && this.props.page.search('MCAT')>-1)
            document.getElementById('srchInp')?document.getElementById('srchInp').placeholder = this.props.placeholder:'';
            else
            document.getElementById('srchInp')?document.getElementById('srchInp').placeholder = this.props.page == 'buyleads'? "Search Buy Leads / Tender": 'Search for a product/service':''
            document.getElementById('autosug_div')&&document.getElementById('autosug_div').style?document.getElementById('autosug_div').style.display = 'none':'';
            document.getElementById("imPWAHeader")&&document.getElementById("imPWAHeader").style?document.getElementById("imPWAHeader").style.display= "block":'';
            this.removeDiv();
            this.removeAllDiv();
    }
    searchTermHandling(){
        
        let searchTerm = this.state.searchTerm;
                        searchTerm = searchTerm.replace(/&/g, '%26');
                        document.getElementById('search_hme').blur();
        searchTerm = searchTerm.replace(/^\s+/g, "");
        searchTerm = encodeURIComponent(searchTerm);

                        return searchTerm
    }
    routeHandling(isHandledElse=false,route){
        window.location && window.location.href ? setCookie('SearchReferer', window.location.href) : '';
        if(isHandledElse){
            history.replaceState("","",route);
            this.setState({currUrl: route})
            location.reload();
        }
        else{
            document.getElementById('search_hme')&&document.getElementById('search_hme').value?this.hideRoot(document.getElementById('search_hme').value):'';
            history.replaceState("","",route);
            location.reload();
        }
    
    }
    urlHandling(src='',searchTerm){
        let url = window.location.href;
        url = new URL(url);
        let cq = url.searchParams.get("cq");
        let route = '/isearch.php?s=' + searchTerm + src + '&prdsrc=1';
        if (cq != "all" && cq != null) {
            route = route + '&cq=' + cq;
        }
        if (this.props.catId || this.props.mcatId){
            route += this.props.mcatId ? `&mcatid=${this.props.mcatId}`:'';
            route += this.props.catId ? `&catid=${this.props.catId}`:'';
            route += '&skip_context=0'
        } 
        if (getCookieValByKey('iploc', 'gcniso') && getCookieValByKey('iploc', 'gcniso') != "IN"){
                route += '&countryiso='+getCookieValByKey('iploc', 'gcniso');
            }
        return route;

        
    }
    srchInpClick() {
        let self=this
        if(history.state!=="srchAutoSuggPop")history.pushState("srchAutoSuggPop", "", "")
        window.onpopstate = function () {
            self.backButtonClicked();
        };
        document.getElementById("autosugres")?document.getElementById("autosugres").classList.add("tp0"):'';
        let page= window.pageName?window.pageName=='Search-PWA'||window.pageName=='home':''
        if((window.pageYOffset>30||document.documentElement.scrollTop>30)&&page)
            this.stickySearchBar = '|sticky-search-bar'
        else
            this.stickySearchBar = '';
        this.orgPos = window.pageYOffset;
        this.fixAutocomplete();
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
        attachSuggester();
        
        let that = this;
        let gridTracking = this.props && this.props.srchGridView ? "|GRIDVIEW_ABTEST":"";
        let pg_name = (that.props.page) ? that.props.page : 'Search';
        yandexTrackingMultiLevel('Header', 'Searchbar', pg_name);
        if (document.getElementById('search_hme')) {
            document.getElementById('search_hme').value = window.location && window.location.href && window.location.href.includes('isearch.php') && (document.getElementById('srchInp') && document.getElementById('srchInp').firstChild && document.getElementById('srchInp').firstChild.data &&document.getElementById('srchInp').firstChild.data.toLowerCase()!='search indiamart') ? document.getElementById('srchInp').firstChild.data : '';
            this.setState({searchTerm: document.getElementById('search_hme').value});
        }
        if(pg_name && pg_name.includes('PMCAT-Page-Clicks') || pg_name.includes('MCAT-Page-Clicks') || pg_name.includes('PMCAT-City-Page-Clicks') || pg_name.includes('MCAT-City-Page-Clicks')){
            eventTracking(pg_name,'Searchbar','Header-Clicks',true);
        }
        else{
        pg_name=='Home'||window.pagename=='home'?
        eventTracking('Header-Clicks|Home-Page-Clicks-PWA','Searchbar|Header-Clicks',pg_name+that.stickySearchBar +'|Searchbar|'+ prevname(),true):window.pagename=='PDP'||pg_name&&pg_name.includes('PDP')?pg_name=='HindiPDP'?eventTracking('Header-Clicks_HindiPDP_Page_Clicks_PWA','click_Searchbar','IMOB_HindiPDP',true):eventTracking('Product-Page-Clicks','Searchbar',pg_name+that.stickySearchBar+gridTracking+"|Header-Clicks",true):eventTracking(pg_name+that.stickySearchBar,'Searchbar','Header-Clicks',true);}
        document.getElementById('autosug_div')?document.getElementById('autosug_div').style.display = "block":'';
        
        document.getElementById('backArrow') ? document.getElementById('backArrow').onclick = function () {
            that.backButtonClicked()
        }:'';
        if (that.props.page !== 'Home' && that.props.page !== 'buyleads') {
            document.getElementById('search_hme').addEventListener('keyup', function (e) {
                that.fixAutocomplete();
                if (e.keyCode === 13 && document.getElementById('search_hme') && document.getElementById('search_hme').value) {
                    loadTimeTracking ? loadTimeTracking('searchAutoSuggest'):'';
                    that.removeAllDiv();
                    let searchTerm =that.searchTermHandling();
                    if (searchTerm){
                        let route =window.searchautoSuggTermhandling?that.urlHandling(window.searchautoSuggTermhandling,searchTerm):that.urlHandling('',searchTerm);
                        eventTracking(window.searchautoSuggTermhandling?'Trac-AutoSuggest':'Trac-searchItems', window.searchautoSuggTermhandling?'Search-Top|Side-Arrow-Edited':'Search-Top', searchTerm, false);
                        if(window.searchautoSuggTermhandling){delete window.searchautoSuggTermhandling};
                        that.setState({currUrl: '?s=' + searchTerm + '&prdsrc=1'})
                        that.routeHandling(false,route)
                    }
                }
            }, {passive:true});
        }
        document.querySelector("#search_hme").focus();
        document.querySelector("#search_hme").click();
        that.handleShowRemove();
        let localAutSugDiv = document.getElementById('AutoLocal0');
        let sugDiv = document.getElementsByClassName('ui-autocomplete');
        // if(localAutSugDiv){
        //     eventTracking('Trac-AutoSuggest-Impression-Local', 'display_impression', `IMOB_Search`, false);
        // }
        // if(sugDiv && sugDiv.length > 0 && sugDiv[1] && sugDiv[1].style && sugDiv[1].style.display == ''){
        //     eventTracking('Trac-AutoSuggest-Impression', 'display_impression', `IMOB_Search`, false)
        // }
        if(!(localAutSugDiv || (sugDiv && sugDiv.length > 0 && sugDiv[1] && sugDiv[1].style && sugDiv[1].style.display == ''))){
            eventTracking('Trac-AutoSuggest-No_Impression', 'display_impression', `IMOB_Search`, false)

        }
    }
    selecttext(i, d) {
        if (i.srcElement && i.srcElement.className == "rIcon copyIcn") {
            document.getElementById('search_hme').value = d.item.label;
            this.setState({searchTerm: d.item.label});
            document.getElementById('localAutoSugg') && document.getElementById('localAutoSugg').style ? document.getElementById('localAutoSugg').style.display = 'none' : '';
            document.getElementById('search_hme').focus()
            document.querySelector("#search_hme").click();
            eventTracking('Autosuggest-Select','Search-Select-AutoSugg',"Side-Arrow-Clicks",true);
            d&&d.item&&d.item.trackid?window.searchautoSuggTermhandling='&src=' + encodeURIComponent(d.item.trackid,d.item.label):''
            return;
        } 
        this.removeAllDiv();
        let searchTerm = document.getElementById('search_hme').value;
        document.body.style.overflow = "unset";

        document.getElementById('autosug_div')?document.getElementById('autosug_div').style.display = "none":'';
        document.getElementById("imPWAHeader")?document.getElementById("imPWAHeader").style.display= "block":'';
        this.removeDiv();
        eventTracking('Trac-AutoSuggest', 'Search-Top', (d.item && d.item.trackid ? d.item.trackid.split(':')[0]:'')+'|pos='+(d.item && d.item.pos ? d.item.pos : '')+'|searchTerm='+searchTerm, false);
        let route =this.urlHandling('&src=' + encodeURIComponent(d.item.trackid),searchTerm);
        // location.href = (route)
        this.setState({currUrl: '?s=' + searchTerm + '&prdsrc=1'})
        this.routeHandling(false,route)
        this.jqac.finish && this.jqac.finish != undefined ? this.jqac.finish() : '';
        if (this.props.pageName == "MiniPDP") { this.props.closeMiniPDP }
    }
    handleBlSearch(i, d) {
        let searchTerm = document.getElementById('search_hme').value;
        document.getElementById('autosug_div')?document.getElementById('autosug_div').style.display = "none":'';
        document.getElementById("imPWAHeader")? document.getElementById("imPWAHeader").style.display= "block":'';
        this.removeDiv();
        location.href = ('/bl/search.php?s=' + searchTerm + '&src=' + encodeURIComponent(d.item.trackid));
        document.getElementById('autosug_div')?document.getElementById('autosug_div').style.display = "none":'';
        document.getElementById("imPWAHeader")?document.getElementById("imPWAHeader").style.display= "block":'';
        this.jqac.finish && this.jqac.finish != undefined ? this.jqac.finish() : '';
    }
    handleShowRemove() {
        document.getElementById('srchInp').removeEventListener('click', this.handleShow);
    }
    loadComponentOnTouch(){
        attachSuggester();
        window.removeEventListener("pointerdown", this.loadComponentOnTouch, { passive: true });
        window.removeEventListener("scroll", this.loadComponentOnTouch, { passive: true });
    }

    getSuggObj(){
        if (this.props.mcatId) {
            return {
                cats: this.props.catId ? this.props.catId : "",
                mcats: this.props.mcatId ? this.props.mcatId : ""
            }
        } else {
            return this.props.suggObj ? this.props.suggObj : ""
        }
    }

    componentDidMount() {
        let suggObj = '';
        if (this.props.suggObj && !this.props.suggObj.length){
            let lsData = JSON.parse(localStorage.getItem('recentMcats'))
            if (lsData && lsData[0] && lsData[0].catid && lsData[0].mcatid)
                suggObj = {"cats":lsData[0].catid,"mcats":lsData[0].mcatid,"mcatnames":""}
        }
        this.removeDiv();
        this.removeAllDiv();
        // if (this.props.page && this.props.page == 'Home')
        //     document.getElementById('srchInp').value = '';
        this.props.blSrchVal ? document.getElementById('search_hme').value = this.props.blSrchVal : '';
        let that = this;
        let globalSuggObj = this.getSuggObj();
        globalSuggObj.length == 0 ? globalSuggObj = suggObj : "";
        let jqacthis = this;
        this.handleShow();
        function g() {
            let sugObj = {
                element: "search_hme",
                fields: "type_data,sort_order",
                highlight: "normal",
                onSelect: that.selecttext,
                placeholder: "Search for a Product / Service",
                classPlaceholder: "ui-placeholder-input",
                module: "IM-HEADER",
                dispstyle: 2,
                autocompleteClass: "showhidesugg",
                rowsToDisplay: 15
            };
            if (that.props.page && that.props.page == 'buyleads') {
                sugObj['pagetyp'] = 'bl';
                sugObj['placeholder'] = "Search Buy Leads / Tender";
                sugObj['onSelect'] = (i, d) => { that.handleBlSearch(i, d) };
            }
            if (typeof (Suggester) != "undefined") {

                jqacthis.jqac = new Suggester(sugObj);
                globalSuggObj = that.getSuggObj();
                $("#btnSearch").click(function () {
                    jqacthis.jqac.onEnd()
                });
                setTimeout(function () {
                    if (globalSuggObj !== "") {
                        jqacthis.jqac.recent(globalSuggObj)
                    }
                }, 200)
            } else {
                setTimeout(function () {
                    g()
                }, 50)
            }
        }
        g();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.page == 'buyleads' && this.buyleadsHandleShow) {
            this.handleShow();
            this.buyleadsHandleShow = false;
        }
        let that = this;
        that.removeDiv();
        that.removeAllDiv();
        that.jqac.recent && that.jqac.recent != undefined ? (nextProps.suggObj != undefined ? that.jqac.recent(nextProps.suggObj) : '') : ''
    }

    getRecents (lsName, type)   {
        let arr = [];
        let resArr = []
        if(localStorage.getItem(lsName))
            arr = type == "cats" ? JSON.parse(JSON.parse(localStorage.getItem(lsName))) : JSON.parse(localStorage.getItem(lsName));
   
        arr = arr.slice(0, 15)
        arr = [...new Set(arr.map(val => val.displaykeyword.toLowerCase()))];
        arr.map((item, key) => {
            if (item) {
                item=item.replace(/\+/g, ' ')
                    resArr.push(
                        <li id ={`AutoLocal${key}`} className='rltSrchItem'>
                            <a onClick={() => {
                                loadTimeTracking ? loadTimeTracking('searchAutoSuggest') : '';
                                eventTracking('Trac-AutoSuggest-No-Result', 'Search-Top', `|as-rcnt|pos=${key}|searchTerm=` + item, false);
                            }} href={`${window.location.origin}/isearch.php?s=${item}`} className='pd5 fw clr33 ti5'>
                                <i class="menuIcoSrch copyIco" onclick={(event) => {
                                    event.preventDefault(); event.stopPropagation();
                                    eventTracking('Autosuggest-Select','Search-Select-LocalStorage',"Side-Arrow-Clicks",true);
                                    document.getElementById('search_hme') ? (document.getElementById('search_hme').value = item,
                                        document.getElementById('search_hme').focus()) : '';
                                        document.getElementById('localAutoSugg') && document.getElementById('localAutoSugg').style ? document.getElementById('localAutoSugg').style.display = 'none' : '';
                                        this.setState({searchTerm: item});
                                }}>
                                </i>
                                <i class="hstryIco dib menuIcoSrch"></i>
                                <p className='oh'>{item}</p>
                            </a>
                        </li>
                    )

            }
        }


            )
       
        return (
            <div id='localAutoSugg' className='boxShadow -mt1'>
                <ul>
                    {resArr}
                </ul>
            </div>
        );
    }
    render() {
        
        if (this.state.currUrl != this.state.prevUrl && this.state.currUrl !== "")
            return <></>
        let recentSearches = this.getRecents("recentSearches", "searches");
        var autosuggest = <div id='autosugres' class='cls' style='padding:0px'>
            {/* <div class='cls'> */}
                {/* <div style='padding:0px'> */}
                    <div class='searchInputBlk bxsdw bgw dt w100'>
                        <i class='dtc w45px tc vam ht52 pdtb16 bgw pdl5' id='backArrow'>
                            <svg width='19' height='16' style="margin-right=60px;" viewBox='0 0 19 16' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M17.556 7.847h-16.556m6.45-6.847l-6.45 6.877 6.45 6.817' stroke='#717171' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'></path>
                            </svg>
                        </i>
                        <input type="search"  autocomplete="off" maxLength="100" aria-haspopup="true"
                            aria-autocomplete="list" placeholder="Search for a Product / Service"
                            name="s" accessKey="1" value={this.state.searchTerm} id="search_hme"
                            className="srcInpt ui-autocomplete-input newautosugginput w100 vam ht52 pdtb16 nobdr bgw fs20 ui-autocomplete-loading"
                            role="textbox" onClick={() =>{this.fixAutocomplete();this.removeSearchTxt()}} onChange={e => this.setState({searchTerm: e.target.value})}/>
                        <i class='dtc w45px tc vam ht52 pdtb16 bgw pdl5' id='closeicn' style='display: table-cell;' >
                            {this.props.page && this.props.page == 'buyleads' ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="23px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#6e6e6e" d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8l-1.4 1.4z"/></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" style="margin-right:60px;" width="23px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#6e6e6e" d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8l-1.4 1.4z"/></svg>
                            }


                        </i>
                    </div>
                    {'webkitSpeechRecognition' in window && this.props.page != 'buyleads' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.88 21.17" class="poa" style="top: 14px;right: 10px;width: 20px;height: 20px" id="vSrIco1" onClick={() => { 
                    eventTracking('Trac-AutoSuggest', 'Voice_icon_clicked_PWA', '', false) }}><path fill="#7a7a7a" d="M6.44,15.08A3.85,3.85,0,0,1,3.61,13.9a3.81,3.81,0,0,1-1.17-2.82V4A3.81,3.81,0,0,1,3.61,1.18,3.81,3.81,0,0,1,6.44,0,3.78,3.78,0,0,1,9.26,1.18,3.81,3.81,0,0,1,10.44,4v7.08A3.81,3.81,0,0,1,9.26,13.9,3.81,3.81,0,0,1,6.44,15.08Z" /><path fill="#7a7a7a" d="M2.66,21.17A.34.34,0,0,1,2.39,21a.35.35,0,0,1-.12-.29.39.39,0,0,1,.12-.3.33.33,0,0,1,.27-.12H6.05V17.91l-.33,0a6.12,6.12,0,0,1-4.07-2.25A7,7,0,0,1,0,11V9.37a.42.42,0,0,1,.12-.3A.36.36,0,0,1,.39,9a.38.38,0,0,1,.28.12.42.42,0,0,1,.12.3V11a6.11,6.11,0,0,0,1.66,4.29,5.28,5.28,0,0,0,4,1.78,5.28,5.28,0,0,0,4-1.78A6.11,6.11,0,0,0,12.09,11V9.37a.42.42,0,0,1,.12-.3A.37.37,0,0,1,12.48,9a.38.38,0,0,1,.28.12.42.42,0,0,1,.12.3V11a7,7,0,0,1-1.65,4.62,6.17,6.17,0,0,1-4.07,2.25l-.33,0v2.42h3.39a.33.33,0,0,1,.27.12.42.42,0,0,1,.12.3.38.38,0,0,1-.12.29.34.34,0,0,1-.27.13Z" /></svg>}
                    <div id="autoSugg" className='mt10'>
                     {window&&window.location&&window.location.href&&window.location.href.indexOf('/bl/')==-1 ? recentSearches: ""}
                    </div>
                {/* </div> */}
            {/* </div> */}
        </div>;
        return (<><div class='pf w100 ht100 bgw z9999 dCover tp45 pd10 autosugfix dn' id="autosug_div">{autosuggest}</div>< Voicehtml /></>);
    }
}
export default SearchAutoSuggest; 