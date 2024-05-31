import React, { Component } from 'react';

class HeadSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HamburgerMenu: '',
            SearchAutoSuggest: ''
        }
        this.mountMenu = this.mountMenu.bind(this);
        this.handleAutoSugg = this.handleAutoSugg.bind(this);
    }
    removeElement(elem) {
        elem ? elem.parentNode.removeChild(elem) : '';
    }
    mountMenu() {
        document.getElementById('impcatMIcon') ? document.getElementById('impcatMIcon').removeEventListener('click', this.mountMenu) : '';
        import(/* webpackChunkName:"HamburgerMenu" */'../../Menu/Components/HamburgerMenu').then((module) => {
            this.removeElement(document.getElementById('impcatMIcon'));
            this.setState({ HamburgerMenu: module.default });
        });
    }
    handleMenuIcon() {
        let menuIcon = '';
        if (this.state.HamburgerMenu) {
            menuIcon = <this.state.HamburgerMenu ga="mcatindex" act="autoOpen" />
        }
        else {
            menuIcon = <div id="menu_icon" class="pr"><span><i id="impcatMIcon" class="Menu_icon tbSp clrw" style="top: 15px;"></i></span></div>;
        }
        return menuIcon;
    }
    handleAutoSugg() {
        document.getElementById('smlSrchIcon').removeEventListener('click', this.mountSrchAutoSugg);
        import(/* webpackChunkName:"Suggester" */'../../Search/components/SearchAutoSuggest').then((module) => {
            this.setState({ SearchAutoSuggest: module.default })
        })
    }
    componentDidMount() {
        //Menu Icon Handling
        document.getElementById('impcatMIcon').addEventListener('click', this.mountMenu);

        //Search-Autosuggest handling of pre-click
        document.getElementById('smlSrchIcon').addEventListener('click', this.handleAutoSugg);
    }
    componentWillUnmount() {
        let serverheaderSec = document.getElementById('impcatPwaHeader');
        if (serverheaderSec)
            this.removeElement(serverheaderSec);
    }
    headersec() {
        if (document.getElementById('impcatPwaHeader')) {
            return (
                <div>
                    {this.state.HamburgerMenu ? <this.state.HamburgerMenu ga="Home" act="autoOpen" /> : ''}
                    {this.state.SearchAutoSuggest ? <this.state.SearchAutoSuggest page="PDP" /> : ''}
                </div>
            )
        } else {
            //remove Existing Header and create custom header
            let imHeader = document.getElementById('im-header');
            document.getElementById('root').classList.remove('mt88');
            if (imHeader) {
                this.removeElement(imHeader);
            }
            return (
                <div id="impcatHeaderClient" className="headImpcat">
                    {this.state.HamburgerMenu ? <this.state.HamburgerMenu ga="Home" act="autoOpen" /> : ''}
                    {this.state.SearchAutoSuggest ? <this.state.SearchAutoSuggest page="PDP" /> : ''}
                    {!this.state.HamburgerMenu ? <a id="impcatMIcon" class="dib pd10 pa"><svg xmlns="https://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 459 459"><path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z" fill="#fff"></path></svg></a> : ''}

                    <a id="homeImpcatBanner" class="tbSp logoImpcat"></a>

                    <input type="hidden" id="page_name" value="postbuy"></input>

                    <div id="smlSrchIcon" class="pd10 dib fr smlSrchIcon"><svg height="21px" width="21px" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 65.06 64.41"><rect x="59.35" y="40.79" width="7.59" height="32.8" rx="1.91" ry="1.91" transform="translate(-33.52 55.13) rotate(-45)" style="fill: rgb(255, 255, 255);"></rect><circle cx="35.65" cy="30.34" r="23.08" transform="translate(-22.59 27.83) rotate(-45)" style="fill: none; stroke: rgb(255, 255, 255); stroke-miterlimit: 10; stroke-width: 2px;"></circle></svg></div>

                    <span id="svg" class="profileIcon"><a href="https://m.indiamart.com/my/?ref=/" class="fr tc dib"> <div class="ml5 dib pl10 dn" ><svg width="21px" height="21px" viewBox="0 0 47.2 43.1"><path fill="#fff" d="M23.6,3c4.9,0,8.8,4,8.8,8.8s-4,8.8-8.8,8.8s-8.8-4-8.8-8.8S18.8,3,23.6,3C23.6,3,23.6,3,23.6,3 M23.6,0c-6.5,0-11.8,5.3-11.8,11.8s5.3,11.8,11.8,11.8c6.5,0,11.8-5.3,11.8-11.8C35.5,5.3,30.2,0,23.6,0C23.6,0,23.6,0,23.6,0z" /><path fill="#fff" d="M23.6,28.4c5.2,0.2,19.4,2.2,20.5,9v2.7H3v-3l0,0C3.1,36.4,5,29.6,23.6,28.4 M23.6,25.5C0.3,26.9,0,36.9,0,36.9v6.2h47.2v-5.9C45.8,26.1,23.6,25.4,23.6,25.5L23.6,25.5z" /><circle fill="#fff" cx="23.6" cy="11.8" r="9.9" /><path fill="#fff" d="M41.9,42.1c2.4-1.4,3.8-3.2,3.8-5c0-5-9.8-9-22-9s-22,4-22,9c0,1.9,1.4,3.6,3.8,5" /></svg></div></a></span>
                </div>
            )
        }
    }
    render() {
        return (
            this.headersec()
        )
    }
}

export default HeadSection;