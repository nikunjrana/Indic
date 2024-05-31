import React,{Component} from 'react';
import LocationPopUp from './FilterViewOptions/LocationPopUp';
import CatBrndFilterPopUp from './FilterViewOptions/CatBrndFilterPopUp';
import FilterViewOptions from './FilterViewOptions/FilterViewOptions';
import BizFilterPopUp from './FilterViewOptions/BizFilterPopUp';
import { goToRoute } from '../../Globals/routingFunction';
import { removalTextNodes } from '../../Globals/translatorPreact/translatorPatch';
class FilterView extends Component{
    constructor(props){
        super(props);
        this.state = {
            openCategoriesFilterView : false,
            openBrandFilterView : false,
            openBizFilterView : false,
            openCityFilterView : false,
            openIsqFilterView : false,
            citySuggester : '',
        }
        this.createLocationPopUpView = this.createLocationPopUpView.bind(this)
        this.createCategoriesFilter = this.createCategoriesFilter.bind(this);
        this.createIsqFilter = this.createIsqFilter.bind(this);
        this.createBrandFilter = this.createBrandFilter.bind(this);
        this.createBizFilter = this.createBizFilter.bind(this);
        this.onSelectFilterClick = this.onSelectFilterClick.bind(this);
        this.onBubbleClick = this.onBubbleClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.toggleFilter =  this.toggleFilter.bind(this);
        this.backHandle = this.backHandle.bind(this);
        this.loadCitySuggester = this.loadCitySuggester.bind(this);
    }
    componentDidUpdate(){
        removalTextNodes();
    }
    onBubbleClick(link){
        this.setState({openCategoriesFilterView:false,openCityFilterView:false,openBrandFilterView:false,openBizFilterView:false,openIsqFilterView:false})
        // window.history.back();
        // goToRoute(link)       
        this.props.showLoader()
        window.removeEventListener("popstate",this.backHandle)
    }
    closePopup(){
        this.setState({openCategoriesFilterView:false,openCityFilterView:false,openBrandFilterView:false,openBizFilterView:false,openIsqFilterView:false})     
        window.history.back()
        document.body.style.overflow = '';
        window.removeEventListener("popstate",this.backHandle);
        document.getElementById('srchLocation') ? document.getElementById('srchLocation').style.marginRight = '-35px' :'';
}
    loadCitySuggester(){
        import( /* webpackChunkName:"citySuggester" */'./FilterViewOptions/CitySuggester' ).then(module=>{
            this.setState({citySuggester: module.default})
        })
    }

    backHandle(){
        window.removeEventListener("popstate",this.backHandle);
        document.body.style.overflow = '';
        this.setState({openCategoriesFilterView:false,openCityFilterView:false,openBrandFilterView:false,openBizFilterView:false,openIsqFilterView:false})
    }

    onSelectFilterClick(filter){
        history.state == "popUp" ? window.history.replaceState("popUp", null,null) : window.history.pushState("popUp", null,null)
        window.refUrl.push("somePopUp");
        window.addEventListener("popstate",this.backHandle, {passive:true});
        document.body.style.overflow = 'hidden';
        this.toggleFilter(filter);
        document.getElementById('srchLocation') ? document.getElementById('srchLocation').style.marginRight = '-5px' :'';
    }

    toggleFilter(type){

        switch(type){
            case 'Categories':
                this.setState({
                     openCategoriesFilterView : true,
                })
                break;
            case 'Brands':
                this.setState({
                    openBrandFilterView : true,
                })
                break;
            case 'Biz':
                this.setState({
                    openBizFilterView : true,
                })
                break;
            case 'Location' :
                this.setState({
                    openCityFilterView : true                     
                })
                if(this.state.citySuggester == ''){
                    this.loadCitySuggester();
                }
                document.getElementById("gblLoader") ? document.getElementById("gblLoader").style.display = "none" : "";
                break;
            case 'ISQ':
                this.setState({
                    openIsqFilterView : true,
                })
                break;
            default:
        }
    }

    createLocationPopUpView(){
        let locationPopUpView = '';
        if(this.state.openCityFilterView){
            locationPopUpView = <LocationPopUp 
            type="Location"
            tracking = {this.props.tracking} 
            searchParam = {this.props.location.search} 
            query ={this.props.location.query}
            page={this.props.page}
            onBubbleClick = {this.onBubbleClick} 
            closePopup = {this.closePopup}
            toggleFilter= {this.toggleFilter } 
            selectedCity={this.state.selectedCity}
            nearMeData = {this.props.nearMeData} 
            onNearMeClick = {this.props.onNearMeClick} 
            flName = {this.props.flName} 
            cityData = {this.props.cityData}  
            cityName = {this.props.cityName} 
            mcatName = {this.props.mcatName}
            country_value={this.props.country_value?this.props.country_value:""}
            getSearchCity={this.props.getSearchCity}
            openCityFilterView = {this.state.openCityFilterView}
            getCityID = {this.props.getCityID} />;
        }
        return locationPopUpView;
    }

    createCategoriesFilter(){    
        let categories='';
        if (this.state.openCategoriesFilterView) {
            if (this.props.categoriesData.length) {
                categories = <CatBrndFilterPopUp
                    tracking={this.props.tracking}
                    type='Categories'
                    isBrand={false}
                    page={this.props.page}
                    selected={this.props.mcatName}
                    onBubbleClick={this.onBubbleClick}
                    closePopup={this.closePopup}
                    data={this.props.categoriesData}
                />
            }
        }
        return categories;
    }

    createBrandFilter(){
        let brandsFilter='';
        if (this.state.openBrandFilterView) {
            if (this.props.brandsData.length) {
                brandsFilter = <CatBrndFilterPopUp
                    tracking={this.props.tracking}
                    type='Brands'
                    page={this.props.page}
                    isBrand={true}
                    onBubbleClick={this.onBubbleClick}
                    closePopup={this.closePopup}
                    selected={this.props.selectedBrnd ? this.props.selectedBrnd : ""}
                    data={this.props.brandsData}
                />
            }
        }
        return brandsFilter;
    }

    createIsqFilter(){    
        let isqFilter='';
        if (this.state.openIsqFilterView) {
            if (this.props.isqData && this.props.isqData.length>0) {
                isqFilter = <CatBrndFilterPopUp
                    tracking={this.props.tracking}
                    type='ISQ'
                    isISQ={true}
                    isBrand ={false}
                    page={this.props.page}
                    selected ={this.props.selectedISQ}
                    selectedHead = {this.props.selectedISQHeading}
                    onBubbleClick={this.onBubbleClick}
                    closePopup={this.closePopup}
                    data={this.props.isqData}
                />
            }
        }
        return isqFilter;
    }

    createBizFilter(){
        let bizPriceFilter='';
        if (this.state.openBizFilterView) {
            if (this.props.bizData.length) {
                bizPriceFilter = <BizFilterPopUp
                    tracking={this.props.tracking}
                    searchParam={this.props.location.search}
                    bizNameSelected={this.props.bizNameSelected ? this.props.bizNameSelected : "All"}
                    bizData={this.props.bizData}
                    ecomData = {this.props.ecomData}
                    ecomValue = {this.props.ecomValue}
                    page={this.props.page}
                    onBubbleClick={this.onBubbleClick}
                    closePopup={this.closePopup}
                    location={this.props.location}
                />
            }
        }
        return bizPriceFilter;
    }

    render(){
        removalTextNodes();
        let categoriesView = this.createCategoriesFilter();
        let bizView = this.createBizFilter();
        let brandsView = this.createBrandFilter();
        // let locationPopUpView = (!this.props.country_value || this.props.country_value == "" || this.props.country_value == "IN")? this.createLocationPopUpView():"";
        let locationPopUpView = this.createLocationPopUpView();
        let isqview = this.createIsqFilter();
        return(
            <div>
                <FilterViewOptions 
                    tracking = {this.props.tracking}
                    location = {this.props.location}
                    categoriesData ={this.props.categoriesData} 
                    brandsData = {this.props.brandsData} 
                    ecomData = {this.props.ecomData}
                    ecomValue = {this.props.ecomValue}
                    cityData = {this.props.cityData}
                    isqData = {this.props.isqData}
                    isqPresent = {this.props.isqPresent}
                    filterIcon = {this.props.filterIcon}
                    bizData = {this.props.bizData}
                    mcatName={this.props.mcatName}
                    cityName = {this.props.cityName}
                    // getCityID = {this.props.getCityID}
                    bizNameSelected = {this.props.bizNameSelected}
                    selectedBrnd={this.props.selectedBrnd ? this.props.selectedBrnd : "" } 
                    selectedISQ = {this.props.selectedISQ}
                    toggleFilter = {this.toggleFilter}
                    onSelectFilterClick = {this.onSelectFilterClick}
                    openCategoriesFilterView = {this.state.openCategoriesFilterView}
                    openBrandFilterView = {this.state.openBrandFilterView}
                    openCityFilterView = {this.state.openCityFilterView}
                    openBizFilterView = {this.state.openBizFilterView}
                    openIsqFilterView = {this.state.openIsqFilterView}
                    country_value = {this.props.country_value}
                    page={this.props.page ? this.props.page : ''}
                    closePopup = {this.closePopup}
                />
                {locationPopUpView}
                {isqview}
                {categoriesView}
                {brandsView}
                {bizView}
            </div>   
        )
    }
}

export default FilterView;


        