import React from 'react';
export default class FirstFold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showProdDetails: false , showOneTap : false,prodMsgData : '',oneTapData: '', enqSentFrom: false, isProdDesIsqValue:false, PopUp:''}
        this.catToTop = this.catToTop.bind(this);
        this.mimBannerCalling = this.mimBannerCalling.bind(this);
        this.loadPopUp = this.loadPopUp.bind(this);
        if ( document.querySelector("link[rel='canonical']")) {
            document.querySelector("link[rel='canonical']").href="https://www.indiamart.com"+this.props.desktopLink; 
        } else {
            let link = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', "https://www.indiamart.com"+this.props.desktopLink);
            document.head.appendChild(link);
        }
       
    }
    loadPopUp() {
        if(!this.state.PopUp) {
            // import(/* webpackChunkName:"PopUp" */ '../../CentralizePopUp/container/PopUpContainer').then((module) => {
            //     this.setState({ PopUp: module.default });
            // })
        }
    }

    jquery() {
        if (!window.jQuery) {
          let src = "https://m.imimg.com/gifs/jquery.js";
          var s = document.createElement('script');
          s.setAttribute('src', src);
          s.async = true;
          document.body.appendChild(s);
        }
        window.removeEventListener(this.props.eventType, this.jquery);
        window.removeEventListener("click", this.jquery);
    }
    mimBannerCalling() {
        let appJSVersionslocal = localStorage.getItem('appJSVersions') ? JSON.parse(localStorage.getItem('appJSVersions')) : '';
        let mimBanner = document.createElement('script');
        mimBanner.async = true;
        mimBanner.src = (appJSVersionslocal &&
          appJSVersionslocal['MimBanner']) ? appJSVersionslocal['MimBanner'] :
          'https://m.imimg.com/gifs/js/MimBanner_16.min.js';
        document.head.appendChild(mimBanner);
        window.removeEventListener("scroll", this.mimBannerCalling);
    }

    catToTop() {
        var catgryPC_CLNT_FLNAME = this.props.firstViewData.PC_CLNT_FLNAME;
        if (this.props.firstViewData.companylink != '' && catgryPC_CLNT_FLNAME && catgryPC_CLNT_FLNAME != 'new-items.html' && catgryPC_CLNT_FLNAME != 'other-services.html' && catgryPC_CLNT_FLNAME != 'other-products.html') {
            let catparams = {};
            catparams.conditional_flag = 'fortopcat';
            catparams.brd_mcat_id = this.props.firstViewData.BRD_MCAT_ID;
            catparams.category = this.props.firstViewData.PC_CLNT_FLNAME;
            catparams.displayid = this.props.firstViewData.PC_ITEM_DISPLAY_ID;
            catparams.company = this.props.firstViewData.companylink;
            catparams.cat_name = this.props.firstViewData.PCAT_NAME;
            let catData = "conditional_flag=" + catparams.conditional_flag + "|" + "brd_mcat_id=" + catparams.brd_mcat_id + "|" + "category=" + catparams.category + "|" + "displayid=" + catparams.displayid + "|" + "company=" + catparams.company
                + "|" + "cat_name=" + catparams.cat_name;
            localStorage.setItem("cattoBrowsed", catData);
        }
    }

    componentDidMount() {
        // this.props.toggleEnqCTADisabled( this.props.firstViewData.PC_ITEM_DISPLAY_ID);
        let multi_purposeVal = localStorage.getItem("multi_purpose") ? JSON.parse(localStorage.getItem("multi_purpose")) : "";
        let viewCount = multi_purposeVal ? multi_purposeVal["userViewCount"] : "";
        if(viewCount>1) {
            this.loadPopUp();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.firstViewData && prevProps.firstViewData && this.props.firstViewData!=prevProps.firstViewData)
        {
            this.props.handleProdsViewWidget();
        }
    }

    render() {
        return (
        <>
        {this.props.firstViewData && this.props.firstViewData.PC_ITEM_IMG_SMALL && !this.props.firstViewData.LANDING_FROM_SPA && this.state.PopUp ?<this.state.PopUp pageUrl={window.location.href+"|"+this.props.firstViewData.PC_ITEM_STATUS_APPROVAL} pageName={"PDP"} pdpData={this.props.firstViewData} checkEnquirySent={(this.props.enqCtaDisabled == this.props.firstViewData.PC_ITEM_DISPLAY_ID) ? true:false} /> :''}
        </>
        );
    }
}