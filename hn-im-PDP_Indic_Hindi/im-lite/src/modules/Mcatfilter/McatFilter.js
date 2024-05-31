import React, { Component } from 'react';
import CategoriesFilterView from '../McatSearchFilter/CategoriesFilterView';
import Location from '../MCATNEW/utility/LocationWidget/Location';
import { eventTracking } from '../../Globals/GaTracking';
import { detectLocation } from '../../Globals/detectLocation';
import { setCityLatLong } from '../McatSearchFilter/CityView/NearMe/setLatLong';
import { goToRoute } from '../../Globals/routingFunction';
import "../Mcatfilter/McatFilter.css"
import { removalTextNodes } from '../../Globals/translatorPreact/translatorPatch';
import {getCookieValByKey} from '../../Globals/CookieManager';
import CityPopUp from './CityPopUp';
import CatPopUp from './CatPopUp';


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nearMe: { cta: 'Near Me', errorMsg: '' },
            isLoading: { flag: false, id: '', text: '' },
            openCategoriesFilterView : false,
            openCityFilterView : false,
        }
        this.createCityFilter = this.createCityFilter.bind(this);
        this.createCategoriesFilter = this.createCategoriesFilter.bind(this);
        this.createFilterPopUpview = this.createFilterPopUpview.bind(this);
        this.createLocationPopUpView =this.createLocationPopUpView.bind(this);
        this.toggleFilterpop =  this.toggleFilterpop.bind(this);
        this.onSelectFilterClick = this.onSelectFilterClick.bind(this)
        this.closePopup = this.closePopup.bind(this);
        this.createISQTray = this.createISQTray.bind(this);
        this.onNearMeClick = this.onNearMeClick.bind(this);
        this.geoLocState = this.geoLocState.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.loadCitySuggester = this.loadCitySuggester.bind(this);
        this.onBubbleClick = this.onBubbleClick.bind(this);
        this.backHandle = this.backHandle.bind(this)
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.preflocCities = this.preflocCities.bind(this);
    }
    componentDidUpdate(){
        removalTextNodes();
    }
    
    geoLocState(result, lat, long, acc) {
        if (result == 'granted' || result == 'prompt-granted') {
            //direct to detected city page
            setCityLatLong(lat, long, this.props.flName, this.props.page).then(res => {
                //  eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Detected', 1);
                if(!window.location.href.includes(res)){
                    this.showLoader()
                }
                this.setState({ nearMe: { cta: 'Near Me', errorMsg: '' } })
                this.hideLoader();
                goToRoute(res);
            })
                .catch(error => {
                    //  eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Not-Detected', 1);
                    this.setState({
                        nearMe: { cta: 'Near Me', errorMsg: 'Some error occured' }
                    });
                    this.hideLoader();
                })

        }
        else if (result == 'denied' || result == 'prompt-denied' || result == 'denied-phone') {
            // eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Not-Detected', 1);
            this.setState({
                nearMe: { cta: 'Near Me', errorMsg: 'Your location access is blocked. Please change your location setting in the browser' }
            });
            this.hideLoader();
        }
    }
    onNearMeClick() {
        //change the source
        eventTracking(this.props.tracking.click, 'Location-Filter', 'Near-Me', 1);

        this.setState({ nearMe: { cta: 'Detecting...', errorMsg: '' } })
        detectLocation(this.geoLocState, this.props.tracking.pageType, 0);
    }
    showLoader() {
        let loader = document.getElementById("gblLoader");
        if (loader && loader.style.display == 'none')
            loader.style.display = "block";
        document.body.style.overflow = '';
        this.state.nearMe = { cta: 'Near Me', errorMsg: '' }
    }
    hideLoader() {
        let loader = document.getElementById("gblLoader");
        if (loader && loader.style.display == 'block')
            loader.style.display = "none";
    }
    onSelectFilterClick(filter){
        history.state == "popUp" ? window.history.replaceState("popUp", null,null) : window.history.pushState("popUp", null,null)
        window.refUrl.push("somePopUp");
        window.addEventListener("popstate",this.backHandle, {passive:true});
        document.body.style.overflow = 'hidden';
        this.toggleFilterpop(filter);
    }
    backHandle(){
        window.removeEventListener("popstate",this.backHandle);
        document.body.style.overflow = '';
        this.setState({openCategoriesFilterView:false,openCityFilterView:false})
    }
    onBubbleClick(link){
        this.setState({openCategoriesFilterView:false,openCityFilterView:false})
        // window.history.back();
        // goToRoute(link)       
        this.showLoader()
        window.removeEventListener("popstate",this.backHandle)
    }

    toggleFilterpop(type){

        switch(type){
            case 'Categories':
                this.setState({
                     openCategoriesFilterView : true,
                })
                break;
            case 'Location' :
                this.setState({
                    openCityFilterView : true                     
                })
                if(this.state.citySuggester == ''){
                    this.loadCitySuggester();
                }
                break;
            default:
        }
    }
    createLocationPopUpView(prefloc){
        let locationPopUpView = '';
        if(this.state.openCityFilterView){
            locationPopUpView = <CityPopUp
            type="Location"
            tracking = {this.props.tracking} 
            searchParam = {this.props.location.search} 
            query ={this.props.location.query}
            page={this.props.page}
            onBubbleClick = {this.onBubbleClick} 
            closePopup = {this.closePopup}
            nearMeData={this.state.nearMe} 
            onNearMeClick = {this.onNearMeClick} 
            flName = {this.props.flName} 
            cityData = {this.props.cityData} 
            prefData = {prefloc ? prefloc : [] } 
            cityName = {this.props.cityName} 
            mcatName = {this.props.mcatName}
            country_value={this.props.country_value?this.props.country_value:""}
            openCityFilterView = {this.state.openCityFilterView} />
        }
        return locationPopUpView;
    }
    createFilterPopUpview(ecomCheck,prefloc){    
        let categories='';
        if (this.state.openCategoriesFilterView) {
            if ((this.props.bizData && this.props.bizData.length >1 )|| (this.props.isqData && this.props.isqData.data && this.props.isqData.data.length) || (this.props.brandsData && this.props.brandsData.length)) {
                categories = <CatPopUp
                    tracking={this.props.tracking}
                    type='Categories'
                    isBrand={false}
                    page={this.props.page}
                    onBubbleClick={this.onBubbleClick}
                    closePopup={this.closePopup}
                    data={this.props.categoriesData}
                    mcatName={this.props.mcatName}
                    bizData = {this.props.bizData}
                    bizName = {this.props.bizName}
                    isqData = {this.props.isqData}
                    isqPresent = {this.props.isqPresent}
                    selectedISQ = {this.props.selectedISQ}
                    selectedHead = {this.props.selectedISQHeading}
                    brandsData = {this.props.brandsData}
                    ecomCheck = {ecomCheck}
                    cityData = {this.props.cityData} 
                    prefData = {prefloc ? prefloc : [] } 
                    cityName = {this.props.cityName}
                    searchParam = {this.props.location.search}
                    categoryPath = {this.props.categoryPath}
                />
            }
        }
        return categories;
    }
    loadCitySuggester(){
        import( /* webpackChunkName:"citySuggester" */ '../McatSearchFilter/FilterViewOptions/CitySuggester' ).then(module=>{
            this.setState({citySuggester: module.default})
        })
    }
    closePopup(){
        this.setState({openCategoriesFilterView:false,openCityFilterView:false})     
        window.history.back()
        document.body.style.overflow = '';
        window.removeEventListener("popstate",this.backHandle)
    }

    createCityFilter(cityName,prefloc) {
        let cityFilter = 
          <Location
            tracking={this.props.tracking}
            searchParam={this.props.location.search}
            query={this.props.location.query}
            page={this.props.page}
            isLoading={this.state.isLoading}
            nearMeData={this.state.nearMe}
            onNearMeClick={this.onNearMeClick}
            closePopup = {this.closePopup}
            flName={this.props.flName}
            cityData={this.props.cityData}
            prefData = {prefloc ? prefloc : [] }
            cityName={cityName}
            openCityFilterView = {this.state.openCityFilterView}
            onSelectFilterClick = {this.onSelectFilterClick}
            countryIso={(this.props.country_value == "IN" || this.props.country_value=="" || !this.props.country_value) ? "IN": "F"}
            onBubbleClick={this.onBubbleClick}
            topfilter = {true}
        />
        return cityFilter;
    }
    preflocCities(){
        let prefData = (localStorage && localStorage.getItem("prefLoc")) ? JSON.parse(localStorage.getItem("prefLoc")):""
        let flname = this.props.flName;
        flname = flname && flname.replace(/-/g, '+');
        let cities = prefData ? prefData.map((data,index)=>{
            let obj = {}
            if(data && data.cityName){
                obj.NAME = data.cityName,
                obj.LINK = `/isearch.php?s=${flname}&cq=${data.cityName}&stype=attr%3D1%7CattrS&res=RC4`
                return obj
            }
        }):'';
        return cities
    }

    createCategoriesFilter(categoryName) {
        let data = this.props.categoriesData && this.props.categoriesData.length>0?this.props.categoriesData:this.props.bizData && this.props.bizData.length>1?this.props.bizData:this.props.isqData && this.props.isqData.length>0?this.props.isqData:this.props.brandsData && this.props.brandsData.length>0?this.props.brandsData:""
        let selectedName = this.props.categoriesData && this.props.categoriesData.length>0?categoryName:this.props.bizData && this.props.bizData.length>1?this.props.bizName?this.props.bizName:"All":this.props.isqData && this.props.isqData.length>0?this.props.selectedISQ:""
        let type = this.props.categoriesData && this.props.categoriesData.length>0?"Category":this.props.bizData && this.props.bizData.length>1?"Biz":this.props.isqData && this.props.isqData.length>0?"Isq":""
        let filtericon = (this.props.bizData && this.props.bizData.length >1 )|| (this.props.isqData && this.props.isqData.data && this.props.isqData.data.length) || (this.props.brandsData && this.props.brandsData.length) ?true:false;
        let categoriesFilter = data?<CategoriesFilterView
            categoriesData={data}
            categoryName={selectedName}
            tracking={this.props.tracking}
            onBubbleClick={this.onBubbleClick}
            categoryTray = {true}
            type = {type}
            isqP = {window.location && window.location.search && window.location.search.includes("?q-")>0?true:false}
            closePopup = {this.closePopup}
            filtericon = {filtericon}
            onSelectFilterClick = {this.onSelectFilterClick}
            openCategoriesFilterView = {this.state.openCategoriesFilterView}
            categoryPath = {this.props.categoryPath}
        />:""
        return categoriesFilter;
    }
    createISQTray(selected,selectedHead) {
        let isqFilterTray = <CategoriesFilterView
            categoriesData={this.props.isqData && this.props.isqData.CurrentHeadData ?this.props.isqData.CurrentHeadData: this.props.isqData && this.props.isqData.data ?this.props.isqData.data:"" }
            categoryName={selected}
            AllIsqLink = {this.props.isqData.allIndiaLINK}
            selectedHead = {selectedHead}
            tracking={this.props.tracking}
            onBubbleClick={this.onBubbleClick}
            categoryTray = {false}
        />
        return isqFilterTray;
    }


    render() {
        let ecomCheck = window.location && window.location.search && window.location.search == "?shopnow=1" ? true:false;
        let prefloc = this.preflocCities() 
        let categoriesView = this.createFilterPopUpview(ecomCheck,prefloc);
        let locationPopUpView = ecomCheck?"":this.createLocationPopUpView(prefloc);
        let rehitError = "";
        let cityView;
        let cityName = this.props.cityName ? this.props.cityName.charAt(0).toUpperCase() + this.props.cityName.slice(1) : '';
        cityName = cityName!='' && cityName.includes("-")?cityName.replace(/-/g, ' '):cityName;
        let categoryView;
        let ISQTray;
        let categoryName = this.props.mcatName ? this.props.mcatName.charAt(0).toUpperCase() + this.props.mcatName.slice(1) : '';    
        //Remove Cities/Location Filter for Foreign User
        rehitError = this.props.rehit && !ecomCheck ?
                <div className='tc' style={{ color: "red" }}>
                    <span>{this.props.vernacularData ? this.props.vernacularData["LOC_LABEL18_1"] : 'No results present for'} </span>
                    {this.props.getModifiedCityName ? this.props.getModifiedCityName(this.props.rehitCityName) : ""}
                    <span>{this.props.vernacularData ? this.props.vernacularData["LOC_LABEL18_3"] : '&#8203'}</span>
                    <span>{this.props.vernacularData ? this.props.vernacularData["LOC_LABEL18_2"] : ', showing results for All India'}</span>
                </div> : '';
        cityView = ecomCheck?"":this.createCityFilter(cityName,prefloc);
        ISQTray = this.props.selectedISQ ? this.createISQTray(this.props.selectedISQ,this.props.selectedISQHeading) : "";
        categoryView = this.createCategoriesFilter(categoryName);

        return (
                <div id="mcatFilterDiv" className={`fs12 bxsdw bgw mb1 pdb5${window && window.newheader  ? '' : ' mt22'}`}>
                        {locationPopUpView}
                        {cityView}
                        {categoriesView}
                        {categoryView}
                        {this.props.isqPresent?ISQTray:""}
                        {rehitError}
                </div>
        );
    }
}