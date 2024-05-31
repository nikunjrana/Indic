import React from 'react';
import AllIndia from '../CityView/AllIndia';
import CityList from '../CityView/CityList';
import NearMeContainer from '../CityView/NearMe/NearMeContainer';
import SelectedCity from '../CityView/SelectedCity';
import CitySuggester from './CitySuggester';

const LocationPopUp = (props) =>{
    let allIndiaLink = {pathname : props.cityData.allIndiaLINK ,search : props.page=="Search" ? '?s='+props.flName+'&cq=all' +(props.query.biz ?'&biz='+props.query.biz :'') : props.searchParam}   
    //Error Message
    let errorMessage = props.nearMeData.errorMsg ? <div className = 'filterErrMsg por' style={{color:"red",display:'block'}}>{props.nearMeData.errorMsg}</div>:'';
    //Near Me
    let nearMeView = (props.country_value == "IN" || props.country_value=="" || !props.country_value) ? <NearMeContainer onNearMeClick = {props.onNearMeClick} page={props.page} cta = {props.nearMeData.cta} detect={'मेरा शहर ढूंढें'} onBubbleClick ={props.onBubbleClick} cityName = {props.cityName ? (props.cityName).toLowerCase():''} />:""
    //AllIndia
    let allIndiaView = <AllIndia cityName = {props.cityName} page={props.page} allIndiaLink ={allIndiaLink} search ={props.searchParam} isLoading = {props.isLoading} onBubbleClick ={props.onBubbleClick} tracking={props.tracking} />
    //City Selected
    let citySelectedView = <SelectedCity cityName = {props.cityName} page={props.page} allIndiaLink ={allIndiaLink} isLoading = {props.isLoading} onBubbleClick ={props.onBubbleClick} tracking={props.tracking} type={props.type}/>;
    //cities
    let cityView = <CityList cityData={props.cityData} prefData={props.prefData} page={props.page} openCityFilterView = {props.openCityFilterView} allIndiaLink ={allIndiaLink} isLoading = {props.isLoading} onBubbleClick ={props.onBubbleClick} tracking={props.tracking} searchParam ={props.searchParam} query={props.query}/>;
    
    return(
        <div>
            <div className={props.page=="Mcat"?"mbg":"mbg2"} onClick={props.closePopup} style={{display:"block"}}></div>
            <div className={props.page=="Mcat"?"ListOuter margincity bgw poa":"filtersListOuter bgw poa tp70"}>
                <CitySuggester 
                flName = {props.flName} 
                bizName = {props.query.biz ? props.query.biz : ''}
                // getCityID={props.getCityID} 
                page={props.page}
                cityName={props.cityName} 
                mcatName = {props.mcatName} 
                getSearchCity={props.getSearchCity} 
                onBubbleClick ={props.onBubbleClick}/>
                <div className="pdl10">{nearMeView}</div>
                {errorMessage}
                <div className={props.page=="Mcat"?"pd10 ListInner":"pd10 filtersListInner"}>
                    {allIndiaView}
                    {citySelectedView}
                    {cityView}
                </div>
            </div>
        </div>   
    )
}

export default LocationPopUp;