import React, { Component } from 'react';
import { getCookie } from '../../../Globals/CookieManager';
import HotProduct from './HotProduct';
import PopularProduct from './PopularProduct';
import PopularService from './PopularService';
// import Header from '../../Header/HeaderContainer';
// import CountryContainer from '../../Country/container/CountryContainer';
import '../css/mcatIndex.css';
import {gaTrack} from '../../../Globals/GaTracking';


class Controller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Footer: '',
            MiniBl: ''
        }
        this.imesh = getCookie('ImeshVisitor');
        this.fetchResources = this.fetchResources.bind(this);
        this.unmountServerDiv = this.unmountServerDiv.bind(this);
        this.mblProp={};
    }
    componentWillMount() {
        this.unmountServerDiv();
        let loader = document.getElementById('gblLoader');
        (loader) ? loader.style.display = 'none' : '';
        if (window.pagename) {
            window.pagename = "postbuy"
        }
    }
     unmountServerDiv() {
        let lcpDiv = document.getElementById("impcatLcpDiv");
        lcpDiv ? lcpDiv.parentNode.removeChild(lcpDiv) :"";
        let menuIcon = document.getElementById("menuIcon1");
        menuIcon ? menuIcon.parentNode.removeChild(menuIcon):"";
        let lcpSearchDiv = document.getElementById("headerSearch");
        lcpSearchDiv ? lcpSearchDiv.parentNode.removeChild(lcpSearchDiv) :"";
    }
    componentDidMount() {
        //Profile Icon handling


        gaTrack.trackPageView('/impcat/','mcat-static')
        window.addEventListener('scroll', this.fetchResources);
    }


    fetchResources() {
        // !this.state.MiniBl ? import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then(module => this.setState({ MiniBl: module.default })) : '';

        !this.state.Footer ? import(/* webpackChunkName:"Footer" */'../../App/components/Footer').then(module => this.setState({ Footer: module.default })) : '';

    }

    render() {
        this.mblProp={
            searchKey : '',
            showSuggestion : 'showSuggestion',
            queryText : 'impcat-index',
            miniBl : true,
            productName : document.getElementById('prd_name_enqmbl')?document.getElementById('prd_name_enqmbl').value:'',
            // productImage : '',
            // mcatId: '',
            page: 'static-mcat',
            affiliationId:"-140",
         }
        return (
            <div className='wrapper'>

                {/* <CountryContainer /> */}
              

                <HotProduct />
                <PopularProduct />
                <PopularService />

                {this.state.MiniBl ? <this.state.MiniBl prop={this.mblProp} /> : ''}
                {this.state.Footer ? <this.state.Footer pageStatus="good" pageName="impcat-index" desktopLink = {'https://dir.indiamart.com/impcat/'}  /> : ''}
            </div>
        )
    }
}
export default Controller;