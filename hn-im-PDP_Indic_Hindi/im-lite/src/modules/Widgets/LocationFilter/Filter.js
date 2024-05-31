import React from 'react'
import { setCookie } from '../../../Globals/CookieManager';
import getCityWithLatLong from '../../../Globals/getCityWithLatLong';
import { detectUserLocation } from './helper'
import { eventTracking } from '../../../Globals/GaTracking';
import './filterIndex.css';
import { getIpLocCity,getUserCity} from './dispatchFilterLocations';
import { checkAndSetLS } from '../../../Globals/LsData';
import { createPreflocCookie } from '../../../Globals/preflocLS';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { geoLocState: '', sameDetectLocCitySelected: false, };
        this.constructFilter = this.constructFilter.bind(this);
        this.geoLocCallBck = this.geoLocCallBck.bind(this);
    }

    applyFilter(cityname, cityid) {
        if (this.props.handleCitySelect == '' || (this.props.handleCitySelect == cityname && this.state.sameDetectLocCitySelected == true) || this.props.handleCitySelect != cityname) {
            this.props.updateHandleCitySelect(cityname)
            this.setState({ sameDetectLocCitySelected: false })
            let userlocString = cityname + "||" + cityid;
            (this.state.geoLocState == 'Unable to detect Location') ? this.setState({ geoLocState: '' }) : '';

            if (cityid !== "allindia")
                setCookie('userlocName', userlocString, 180);

            if (!this.props.selectedCityInFilter || this.props.selectedCityInFilter.cityname !== cityname) {
                let cityData = this.props.cityListInFilter;
                cityData.delete(cityid);
                let updatedCity = new Map([...[[cityid, cityname]], ...cityData]);
                this.props.updateCityList(updatedCity, { cityname: cityname, cityid: cityid });
            }
        }
        else {
            this.props.updateHandleCitySelect('')
            let cityData = this.props.cityListInFilter;
            let updatedCity = new Map([...[['allindia', 'All India']], ...cityData]);
            this.props.updateCityList(updatedCity, { cityname: 'All India', cityid: 'allindia' });
        }
    }
    geoLocCallBck(lat, long, geoErr) {
        this.setState({ geoLocState: 'Loading' });
        let err = () => {
            this.setState({ geoLocState: 'Unable to detect Location' });
            this.props.updateToggleState(false);
        },
            succ = (cityname, cityid) => {
                this.props.updateToggleState(true);
                this.applyFilter(cityname, cityid);
            }

        if (geoErr) {
            err();
        }
        else {
            getCityWithLatLong(lat, long).then(data => {
                if (data.response.CODE == 200) {
                    this.setState({ geoLocState: '' });
                    this.props.updateToggleState(true);
                    succ(data.response.cityname.toLowerCase(),
                        data.response.cityid);
                }
                else {
                    err();
                }
            }, error => {
                console.log(error);
                err();
            })
        }
    }

    cityBubble(cityname) {
if(cityname){
    
        if (this.props.selectedCityInFilter && this.props.selectedCityInFilter.cityname
            && this.props.selectedCityInFilter.cityname == cityname)//some city selected by user and matches
        {
            
            sessionStorage.setItem("selectedCity",cityname);
            if (cityname != "All India"){
            this.props.updateHandleCitySelect(cityname);
                return (
                    <span className="bubbleBtn citySelected icnCross">{cityname}</span>
                )
        }
            else{
                return (
                    <span className="bubbleBtn citySelected">{cityname}</span>
                )

            }
                
        }
        else {
            return (
                <span className="bubbleBtn">{cityname}</span>
            )
        }
    }}
    componentDidUpdate(prevProps)
    {
        if(this.props.selectedCityInFilter && prevProps.selectedCityInFilter && this.props.selectedCityInFilter!=prevProps.selectedCityInFilter)
        {
            window._Related_STORE = null;
        }
        let selectedCity = this.props.selectedCityInFilter ? this.props.selectedCityInFilter : '';
        if(!this.state.cityObj){
            getUserCity().then((res)=>{this.setState({cityObj : res ? res : ''})})
        }
    let prefLoc = createPreflocCookie(((selectedCity&&selectedCity.cityname) ? selectedCity.cityname : ''),(this.state.cityObj?this.state.cityObj.cityname:''));
    prefLoc && prefLoc.cityName ? checkAndSetLS("prefLoc",prefLoc) : '';
    }
    constructFilter() {
        let filter = [];
        var near_me = <li onClick={() => {
            this.setState({ sameDetectLocCitySelected: true })
            eventTracking(this.props.eventCategory, this.props.eventAction, 'Near-me', true);
            detectUserLocation(this.geoLocCallBck, this.props.eventCategory);
        }} className="dib mr10"><span className="bubbleBtn nearMe"><i className="dib vam mr5" style={{ width: '16px', height: '16px' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"><path className="grnlocF" d="M27,0V54" /><path className="grnlocF" d="M0,27H54" /><circle className="grnlocF" cx="27.38" cy="26.63" r="16.88" /><circle className="grnloc-2F" cx="27.38" cy="26.63" r="8.25" /></svg></i><span >{this.state.geoLocState == 'Loading' ? (this.props.translatedText ? this.props.translatedText.LOC_LABEL7 :"Detecting...") : (this.props.translatedText ? this.props.translatedText.LOC_LABEL17 : "मेरा शहर ढूंढें")}</span></span></li>

        this.props.toggleState == true ? filter.splice(0, 1) : filter.splice(0, 0, near_me);

        filter.push(
            <li className="dib mr10 t_tc" onClick={() => {
                this.props.updateToggleState(false);
                this.applyFilter("All India", "allindia"); eventTracking(this.props.eventCategory, this.props.eventAction, "All-India", true);
            }} key="allindia">{this.cityBubble("All India")}</li>
        )
        let cityIndex = 1;
        this.props.cityListInFilter.forEach((cityname, cityid) => {
            if (cityid !== "allindia") {
                let eventLabel = "city_selected-" + cityIndex + "-" + cityname;
                filter.push(<li className="dib mr10 t_tc" onClick={() => {
                    this.props.updateToggleState(false);
                    this.applyFilter(cityname, cityid); eventTracking(this.props.eventCategory, this.props.eventAction, eventLabel, true);
                }} key={cityid}>{this.cityBubble(cityname)}</li>)
                cityIndex++;
            }
        });
        return filter;
    }
    
    render() {
        let showLocWidget =  (!this.props.country_value || this.props.country_value == "" || this.props.country_value == "IN") ? true : false;
        return (
            showLocWidget == true ?
                <div className="mt10 pdl5">
                    {
                        this.props.cityListInFilter ?
                            <ul className={this.props.pageType == "PDP" ? "filtr cityFilterRecomMcat" : "filtr cityFilterRecomMcat ht52"}>
                                {this.constructFilter()}
                            </ul> : ''
                    }
                    {this.state.geoLocState == 'Unable to detect Location' ? <div class="err fs13 ml5" style="margin-top: -2px;">Unable to detect your location. Select City.</div> : ''}
                </div>
                : ""
        )
    }
}
