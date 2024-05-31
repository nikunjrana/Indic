import React, { useRef } from 'react';
import AllIndia from './CityView/AllIndia';
import SelectedCity from './CityView/SelectedCity';
import CityList from './CityView/CityList';
import NearMeContainer from './CityView/NearMe/NearMeContainer';

const CityFilterView = (props) =>{
    // console.log(props)
    let allIndiaLink = {pathname : props.cityData.allIndiaLINK ,search : props.page=="Search" ? '?s='+props.flName+'&cq=all' +(props.query.biz ?'&biz='+props.query.biz :'') : props.searchParam}
    // console.log(allIndiaLink)
    //Error Message
    let errorMessage = props.nearMeData.errorMsg ? <div className = 'filterErrMsg por'>{props.nearMeData.errorMsg}</div>:'';
    //Near Me
    let nearMeView = (props.country_value == "IN" || props.country_value=="" || !props.country_value)? <NearMeContainer onNearMeClick = {props.onNearMeClick} cta = {props.nearMeData.cta} cityName = {props.cityName ? (props.cityName).toLowerCase():''} onBubbleClick ={props.onBubbleClick}/>:""
    //AllIndia
    let allIndiaView = <AllIndia cityName = {props.cityName} allIndiaLink ={allIndiaLink} search ={props.searchParam} isLoading = {props.isLoading} onBubbleClick ={props.onBubbleClick} tracking={props.tracking} />
    //City Selected
    let citySelectedView = <SelectedCity cityName = {props.cityName} allIndiaLink ={allIndiaLink} isLoading = {props.isLoading} onBubbleClick ={props.onBubbleClick} openfilter={true} tracking={props.tracking}/>;
    //cities
    let cityFilterIdElement = useRef();
    let scrollLeftOnClick=()=>{
        let ScrollWidth=window&&window.screen&&window.screen.width?window.screen.width*-100:-1000;
        cityFilterIdElement&&cityFilterIdElement.current?cityFilterIdElement.current.scrollBy({left: ScrollWidth,behavior: 'smooth'}):'';
    }
    let cityView = <CityList flName={props.flName} cityData={props.cityData} allIndiaLink ={allIndiaLink} isLoading = {props.isLoading} onBubbleClick ={props.onBubbleClick} tracking={props.tracking} searchParam ={props.searchParam} query={props.query}scrollLeftOnClick={scrollLeftOnClick}/>;
   
    return(     props.page=="Search" && window.srchFltrNew  ?   
                    <div>
                        <div id="cityFilterId" className = {`bgw wnr oAuto pd8 cityView promptHandlingClass scrbfltr`} ref={cityFilterIdElement}>
                            {citySelectedView}
                            {nearMeView}
                            {allIndiaView}
                            {cityView}
                        </div>
                        {errorMessage}
                    </div> 
                    :window.location.search && window.location.search == "?shopnow=1" ? "" : <div>
                        <div id="cityFilterId" className = 'bgw wnr oAuto pd10 cityView promptHandlingClass mb5 scrbfltr' ref={cityFilterIdElement}>
                            {nearMeView}
                            {allIndiaView}
                            {citySelectedView}
                            {cityView}
                        </div>
                        {errorMessage}
                    </div> 
    )
}

export default CityFilterView;

