import React, { Component } from 'react';
import attachSuggester from '../../../Globals/attachSuggester';

function new_script(src, id='',reload=true) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        if(id){
            if(document.getElementById(id)){
                if(reload){
                    var element = document.getElementById(id);
                    element.parentNode.removeChild(element);
                    script.id = id;
                }
                else{
                    return;
                }
            }
            else{
                script.id = id;
            }
        }
        document.body.appendChild(script);
    })
};


class EnqBlComponent extends Component {
    constructor(props) {
        super(props);
        this.url = '';
        this.appJSVersions = localStorage.getItem('appJSVersions') ? JSON.parse(localStorage.getItem('appJSVersions')) : '';
        if (window.location.hostname.substring(0, 3) == 'dev') {
            this.url = 'dev';
        }
        else if (window.location.hostname.substring(0, 3) == 'stg') {
            this.url = 'stg';
        }
        else {
            this.url = '';
        }
    }
    componentDidMount() {
        if (document.getElementById('footbanner')) {
            document.getElementById('footbanner').style.display = "block";
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.isAdsVisible !== nextProps.isAdsVisible) {
            return true;
        } else {
            return false;
        }
    }
    do_load() {
        var self = this;
        
        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.EnqBlCommon !== 0 || this.props.filesInc.EnqBlCommon == undefined)))
            var enqCountry = new_script('https://m.imimg.com/enqBl/commonJs/EnqBlCommon_0.3.js','EnqBlCommon',false);

        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.EnqHtml !== 0 || this.props.filesInc.EnqHtml == undefined)))
            var enqHtml = (self.appJSVersions && self.appJSVersions['central_enq_html']) ? new_script(self.appJSVersions['central_enq_html'],'central_enq_html',false) : new_script('https://m.imimg.com/enqBl/commonJs/EnqHtml_0.7.9.js','central_enq_html',false);

        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.centralizeEnqBl !== 0 || this.props.filesInc.centralizeEnqBl == undefined)))
            var enqBlscript = (self.appJSVersions && self.appJSVersions['central_enq']) ? new_script(self.appJSVersions['central_enq'],'central_enq',false) : new_script('https://m.imimg.com/enqBl/centralizeEnqBl_3_4_8.min.js','central_enq',false);
            
        {!window.location.pathname.match(/\/bl\/\d+/) ? attachSuggester() : ''};

        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.chatbl !== 0 || this.props.filesInc.chatbl == undefined)))
            var chatLikeBl = (self.appJSVersions && self.appJSVersions['cental_chatbljs']) ? new_script(self.appJSVersions['cental_chatbljs'],'cental_chatbljs',false) : new_script("https://m.imimg.com/enqBl/chatlikebl/chatbl_0_5_1.min.js",'cental_chatbljs',false);

        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.common !== 0 || this.props.filesInc.common == undefined)))
            var commonApiEnqBl = (self.appJSVersions && self.appJSVersions['cental_common']) ? new_script(self.appJSVersions['cental_common'],'cental_common',false) : new_script('https://m.imimg.com/enqBl/api/common_0_1_6.min.js','cental_common',false);

        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.miniBl !== 0 || this.props.filesInc.miniBl == undefined)))
            var miniBl = (self.appJSVersions && self.appJSVersions['miniBlJs']) ? new_script(self.appJSVersions['miniBlJs'],'miniBlJs',false) : new_script('https://m.imimg.com/enqBl/miniBl/js/miniBl_0.5.8.min.js','miniBlJs',false);



        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.centralizeEnqBl !== 0 || this.props.filesInc.centralizeEnqBl == undefined)))
            enqBlscript.then(function () {
                var element = document.getElementById("mim_main_pwa");
                element ? element.parentNode.removeChild(element):'';
                var main_pwa = document.createElement('script');
                main_pwa.async = true;
                //main_pwa.src = (self.appJSVersions && self.appJSVersions['mim_main_pwa']) ? self.appJSVersions['mim_main_pwa'] : 'https://m.imimg.com/gifs/mim_main_pwa_v52.min.js';
                main_pwa.src = 'https://m.imimg.com/gifs/mim_main_pwa_v54.min.js';
                main_pwa.id = "mim_main_pwa"
                document.getElementsByTagName('body')[0].appendChild(main_pwa);
            }).catch(function () {
            })
        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.PopUpHtml !== 0 || this.props.filesInc.PopUpHtml == undefined)))
            var PopUpHtml = (self.appJSVersions && self.appJSVersions['popUpHtml']) ? new_script(self.appJSVersions['popUpHtml'],'popUpHtml',false) : new_script('https://m.imimg.com/gifs/js/PopUpHtml_12.js','popUpHtml',false);

        if(this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.CentralPopUpFlow !== 0 || this.props.filesInc.CentralPopUpFlow == undefined)))
            var loadPopUpFlow = true;
        if (this.props.filesInc == undefined || (this.props.filesInc && (this.props.filesInc.PopUpHtml !== 0 || this.props.filesInc.PopUpHtml == undefined)))
            PopUpHtml.then(function () {

                var PopUpLogic = (self.appJSVersions && self.appJSVersions['popUpLogic']) ? new_script(self.appJSVersions['popUpLogic']) : new_script('https://m.imimg.com/gifs/js/PopUpLogic_78.min.js');

                PopUpLogic.then(function () {
                    var element = document.getElementById("CentralPopUpJS");
                    element ? element.parentNode.removeChild(element):'';
                    var central_popup_flow = document.createElement('script');
                    central_popup_flow.async = true;
                    central_popup_flow.id = 'CentralPopUpJS';
                    central_popup_flow.src = (self.appJSVersions && self.appJSVersions['popUpFlow']) ? self.appJSVersions['popUpFlow'] : 'https://m.imimg.com/gifs/js/CentralPopUpFlow_25.min.js';
                    loadPopUpFlow ? document.getElementsByTagName('body')[0].appendChild(central_popup_flow) : '';
                }).catch(function () {
                })

            }).catch(function () {
            })

    }

    render() {
        var self = this;
        self.do_load();

        if (this.props.isAdsVisible || window.location.pathname == '/' || window.location.pathname.indexOf('/bl') > -1 || window.location.pathname.indexOf('/messages') > -1 || window.location.pathname.indexOf('/soi-thank-you/') > -1) {
            return (<div><div id="enquirycomponent"></div>
                {(self.props.filesInc == undefined || (self.props.filesInc && (self.props.filesInc.MimBanner !== 0 || self.props.filesInc.MimBanner == undefined))) ? <script src={(self.appJSVersions && self.appJSVersions['MimBanner']) ? self.appJSVersions['MimBanner'] : 'https://m.imimg.com/gifs/js/MimBanner_16.min.js'}></script> : ''}
                
                {(!window.location.pathname.includes('isearch.php') && !window.location.pathname.includes('proddetail') && !window.location.pathname.match(/\/bl\/\d+/))?<script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>:''}
                <script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async></script>
                
                {(!window.location.pathname.includes('isearch.php') && !window.location.pathname.includes('proddetail') && !window.location.pathname.match(/\/bl\/\d+/))?<script src="https://www.google.com/adsense/search/ads.js"></script>:''}
            </div>)
        } else {
            return (<div><div id="enquirycomponent"></div>
                {(self.props.filesInc == undefined || (self.props.filesInc && (self.props.filesInc.MimBanner !== 0 || self.props.filesInc.MimBanner == undefined))) ? <script src={(self.appJSVersions && self.appJSVersions['MimBanner']) ? self.appJSVersions['MimBanner'] : 'https://m.imimg.com/gifs/js/MimBanner_16.min.js'}></script> : ''}
                <script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async></script>
            </div>)
        }
        ;

    }
}
export default EnqBlComponent;