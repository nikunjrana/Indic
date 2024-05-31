import React, { Component } from 'react';
import { detectLocation } from '../../Globals/detectLocation';
import { goToRoute } from '../../Globals/routingFunction';
import { eventTracking } from '../../Globals/GaTracking';
import FilterView from './FilterView';
import CityFilterView from './CityFilterView';
import { setCityLatLong } from './CityView/NearMe/setLatLong';
import "../Mcat/utility/Filter/Filter.css";
import CategoriesFilterView from './CategoriesFilterView';
import {getIpLocCity, getUserCity} from '../Widgets/LocationFilter/dispatchFilterLocations';
import {getCookieValByKey} from '../../Globals/CookieManager';
import { checkAndSetLS } from '../../Globals/LsData';
import { createPreflocCookie } from '../../Globals/preflocLS';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nearMe: { cta: 'Near Me', errorMsg: '' },
            selectedCity: '',
            cityObj : '',
            isLoading: { flag: false, id: '', text: '' },
            cityData: this.props.cityData,
            isSearch : window.pagename && (window.pagename == "Search-PWA")?true:false,
        }
        this.createCityFilter = this.createCityFilter.bind(this);
        this.createCategoriesFilter = this.createCategoriesFilter.bind(this);
        this.createISQTray = this.createISQTray.bind(this)
        this.onNearMeClick = this.onNearMeClick.bind(this);
        this.geoLocState = this.geoLocState.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.setCity = this.setCity.bind(this);
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
    }
    componentDidMount() {
        if (!sessionStorage.getItem("userCity"))
            this.setCity();
        else this.appendToList({cityname: sessionStorage.getItem("userCity")},false);
        window.checkNearmeIconisClicked&&document.getElementById("NearMeSrchICON")?document.getElementById("NearMeSrchICON").click():'';
        window.checkNearmeTopisClicked&&document.getElementById("NearMeSrch")?document.getElementById("NearMeSrch").click():'';
      }

      componentDidUpdate(prevProps) {
        document.getElementById('srchLocation') ? document.getElementById('srchLocation').style.marginRight = '-35px' :'';
        if(!this.state.cityObj){
            getUserCity().then((res)=>{this.setState({cityObj : res ? res : ''})})
        }
        let prefLoc = createPreflocCookie(this.props.cityName?this.props.cityName:'' ,((this.state.cityObj&&this.state.cityObj.cityname)?this.state.cityObj.cityname:''));
        prefLoc && prefLoc.cityName ? checkAndSetLS("prefLoc",prefLoc) : '';
        let prevQry = prevProps.flName ? prevProps.flName : "";
        let currQry = this.props && this.props.flName ? this.props.flName : "";
        if (prevQry != currQry) {
            if (sessionStorage.getItem("userCity"))
                this.appendToList({cityname: sessionStorage.getItem("userCity")});
            else {
                this.setCity();
            }
        } 
      }
    
    
      setCity = () => {
        if (this.state.isSearch){
            if (getCookieValByKey("ImeshVisitor", "ctid")) {
            let promise = getUserCity();
            promise.then((res) => {
                this.appendToList(res);
            });
            } else {
            let res = getIpLocCity();
            if (res && res != "Not Found") this.appendToList(res);
            }
        }}
    
      appendToList = (res,setcityFlag=true) => {
        let qry = this.props && this.props.flName ? this.props.flName : "";
        let city = res.cityname ? res.cityname.toLowerCase() : "";
        setcityFlag?sessionStorage.setItem("userCity",city):'';
        let cities = this.props.cityData.cities;
        
        if (window.pagename && window.pagename == "Search-PWA" && !(window.location.href.includes("/impcat/")||window.location.href.includes("/city/"))) {
          let cityObj = {
            NAME: city,
            LINK: "/isearch.php",
            QUERY: `?s=${qry}&cq=${city}`,
          };
    
          cities.unshift(cityObj);
    
          var lst = [...new Set(cities.map(JSON.stringify))].map(JSON.parse);
          if (this.props.cityData && this.props.cityData.cities) {
            this.setState((prevState) => ({
              cityData: {
                ...prevState.cityData,
                cities: [...lst],
              },
            }));
          }
        }
      }

    geoLocState(result, lat, long, acc) {
        if (result == 'granted' || result == 'prompt-granted') {
            //direct to detected city page
            setCityLatLong(lat, long, this.props.flName, this.props.page).then(res => {
                //  eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Detected', 1);
                if(!window.location.href.includes(res)){
                    this.showLoader()
                }
                window.location && window.location.href && window.location.href.includes("/isearch.php")?this.setState({ nearMe: { cta: 'Detecting...', errorMsg: '' } }):this.setState({ nearMe: { cta: 'Near Me', errorMsg: '' } })
                this.hideLoader();
                if (window.location && window.location.href && window.location.href.includes("/isearch.php")) { history.replaceState("", "", res); location.reload(); } else { goToRoute(res) };
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
        if (loader && loader.style.display == 'none' &&  window.pagename!='Search-PWA')
            loader.style.display = "block";
        document.body.style.overflow = '';
        this.state.nearMe = { cta: 'Near Me', errorMsg: '' }
    }
    hideLoader() {
        let loader = document.getElementById("gblLoader");
        if (loader && loader.style.display == 'block')
            loader.style.display = "none";
    }

    createCityFilter(cityName) {
        let cityFilter = this.props.page && (this.props.page == "Search") && window.srchFltrNew || (this.props.isqPresent && window.location.search != "?shopnow=1" ) ?
    <div style="display: flex; overflow:auto;font-size: 12px"> 
       <div id='srchLocation' style="margin-right: -35px"><FilterView
               tracking={this.props.tracking}
               location={this.props.location}
               uniqueId=''
               categoriesData=''
               brandsData=''
               cityData={this.props.cityData}
               bizData=''
               bizNameSelected=''
               flName={this.props.flName}
               selectedBrnd=''
               mcatName=''
               cityName={cityName}
               nearMeData={this.state.nearMe}
               onNearMeClick={this.onNearMeClick}
               showLoader={this.showLoader}
               getSearchCity={this.props.getSearchCity}
               page={this.props.page}
               country_value={this.props.country_value}
               filterIcon = {this.props.isqPresent}
           />

           </div>
           <div style="overflow:auto;">
               <CityFilterView
                   tracking={this.props.tracking}
                   searchParam={this.props.location.search}
                   query={this.props.location.query}
                   page={this.props.page}
                   isLoading={this.state.isLoading}
                   nearMeData={this.state.nearMe}
                   onNearMeClick={this.onNearMeClick}
                   flName={this.props.flName}
                   cityData={this.props.cityData}
                   cityName={cityName}
                   onBubbleClick={this.showLoader}
                   location={this.props.location}
                   showLoader={this.showLoader}
                   getSearchCity={this.props.getSearchCity}
                   country_value={this.props.country_value}
               />
           </div>
      </div> :
          <CityFilterView
            tracking={this.props.tracking}
            searchParam={this.props.location.search}
            query={this.props.location.query}
            page={this.props.page}
            isLoading={this.state.isLoading}
            nearMeData={this.state.nearMe}
            onNearMeClick={this.onNearMeClick}
            flName={this.props.flName}
            cityData={this.props.cityData}
            cityName={cityName}
            country_value={this.props.country_value}
            onBubbleClick={this.showLoader}
        />
        return cityFilter;
    }

    createCategoriesFilter(categoryName) {
        let categoriesFilter = <CategoriesFilterView
            categoriesData={this.props.categoriesData}
            categoryName={categoryName}
            tracking={this.props.tracking}
            onBubbleClick={this.showLoader}
        />
        return categoriesFilter;
    }
    createISQTray(selected,selectedHead) {
        let data = this.props.isqData && this.props.isqData.filter((item,index)=>{
            if(selectedHead === item.FK_ISQ_QUESTION_TEXT && selected != item.FK_ISQ_OPTION_TEXT)
                return item
        })
        let isqFilterTray = <CategoriesFilterView
            categoriesData={data ? data : this.props.isqData}
            categoryName={selected}
            selectedHead = {selectedHead}
            tracking={this.props.tracking}
            onBubbleClick={this.showLoader}
        />
        return isqFilterTray;
    }


    render() {
        let bizData = [], brandsData = [];
        let bizNameSelected = '', selectedBrnd = '';
        let rehitError = "";
        let cityView;
        let cityName = this.props.cityName ? this.props.cityName.charAt(0).toUpperCase() + this.props.cityName.slice(1) : '';
        cityName = cityName!='' && cityName.includes("-")?cityName.replace(/-/g, ' '):cityName;
        let categoryView;
        let ISQTray;
        let categoryName = "";   
        let ecomData = []; 
        //Remove Cities/Location Filter for Foreign User
        if (!this.props.country_value || this.props.country_value == "" || this.props.country_value == "IN") {
            rehitError = this.props.rehit ?
                <div className='tc' style={{ color: "red" }}>
                    <span>{this.props.vernacularData ? this.props.vernacularData["LOC_LABEL18_1"] : 'No results present for'} </span>
                    {this.props.getModifiedCityName ? this.props.getModifiedCityName(this.props.rehitCityName) : ""}
                    <span>{this.props.vernacularData ? this.props.vernacularData["LOC_LABEL18_3"] : '&#8203'}</span>
                    <span>{this.props.vernacularData ? this.props.vernacularData["LOC_LABEL18_2"] : ', showing results for All India'}</span>
                </div> : '';
            cityName = this.props.cityName ? this.props.cityName.charAt(0).toUpperCase() + this.props.cityName.slice(1) : '';
            cityName = cityName!='' && cityName.includes("-")?cityName.replace(/-/g, ' '):cityName;
            cityView = this.createCityFilter(cityName);
            ISQTray = this.props.page=="Mcat" && this.props.selectedISQ ? this.createISQTray(this.props.selectedISQ,this.props.selectedISQHeading) : "";
            bizData = this.props.bizData ? this.props.bizData : [];
            brandsData = this.props.brandsData ? this.props.brandsData : [];
            bizNameSelected = this.props.bizName ? this.props.bizName : '';
            selectedBrnd = this.props.selectedBrnd ? this.props.selectedBrnd : '';
            ecomData = this.props.ecomData ? this.props.ecomData : [];
        }
        else if(window&&window.location&&window.location.href&&window.location.href.includes("/isearch.php") ){
            categoryView = window.srchFltrNew && window.location.href.includes("/isearch.php") ? '' : this.createCategoriesFilter(categoryName);
            ISQTray = this.props.selectedISQ ? this.createISQTray(this.props.selectedISQ,this.props.selectedISQHeading) : "";
            bizData = this.props.bizData ? this.props.bizData : [];
            brandsData = this.props.brandsData ? this.props.brandsData : [];
            bizNameSelected = this.props.bizName ? this.props.bizName : '';
            ecomData = this.props.ecomData ? this.props.ecomData : [];
            selectedBrnd = this.props.selectedBrnd ? this.props.selectedBrnd : '';
        }
        else {
            categoryName = this.props.mcatName ? this.props.mcatName.charAt(0).toUpperCase() + this.props.mcatName.slice(1) : '';
            // categoryView = window.srchFltrNew && window.location.href.includes("/isearch.php") ? '' : this.createCategoriesFilter(categoryName);
            cityView = this.createCityFilter(cityName);
            ISQTray = this.props.page=="Mcat" && this.props.selectedISQ ? this.createISQTray(this.props.selectedISQ,this.props.selectedISQHeading) : "";
            bizData = this.props.bizData ? this.props.bizData : [];
            brandsData = this.props.brandsData ? this.props.brandsData : [];
            bizNameSelected = this.props.bizName ? this.props.bizName : '';
            ecomData = this.props.ecomData ? this.props.ecomData : [];
            selectedBrnd = this.props.selectedBrnd ? this.props.selectedBrnd : '';
        }

        return (
                <div className={`${this.props.page && this.props.page == "Search" ? (window && window.newheader  ? '':'mt52') : "bxsdw mt25"}`}>
                    {this.props.page && (this.props.page == "Search") && window.srchFltrNew ? '' : <FilterView
                    tracking={this.props.tracking}
                    location={this.props.location}
                    uniqueId={this.props.uniqueId}
                    categoriesData={this.props.categoriesData ? this.props.categoriesData : []}
                    brandsData={brandsData}
                    ecomData = {ecomData}
                    ecomValue = {this.props.ecomValue}
                    cityData={this.props.cityData }
                    bizData={bizData}
                    bizNameSelected={bizNameSelected}
                    flName={this.props.flName}
                    isqData = {this.props.isqData}
                    selectedISQ = {this.props.selectedISQ}
                    selectedISQHeading = {this.props.selectedISQHeading}
                    isqPresent = {this.props.isqPresent}
                    filterIcon = {false}
                    selectedBrnd={selectedBrnd}
                    mcatName={this.props.mcatName}
                    cityName={cityName}
                    nearMeData={this.state.nearMe}
                    onNearMeClick={this.onNearMeClick}
                    showLoader={this.showLoader}
                    getSearchCity={this.props.getSearchCity}
                    page={this.props.page}
                    country_value={this.props.country_value}
                            />}
                    {cityView}
                    {this.props.isqPresent?ISQTray:""}
                    {rehitError}
                    {categoryView}
                </div>
        );
    }
}