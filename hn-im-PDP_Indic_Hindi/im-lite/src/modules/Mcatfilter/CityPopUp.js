import React from 'react';
import { eventTracking } from '../../Globals/GaTracking';
import { getCookieValByKey } from '../../Globals/CookieManager';
import NearMeContainer from '../McatSearchFilter/CityView/NearMe/NearMeContainer';
import CitySuggester from '../McatSearchFilter/FilterViewOptions/CitySuggester';
import CityView from './CityView';

const CityPopUp = (props) =>{
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    let screen = window.screen && window.screen.width && window.screen.width<300 ? 'w90': 'w300'
    //Error Message
    let errorMessage = props.nearMeData.errorMsg ? <div className = 'filterErrMsg por' style={{color:"red",display:'block'}}>{props.nearMeData.errorMsg}</div>:'';
    //Near Me
    let nearMeView = (props.country_value == "IN" || props.country_value=="" || !props.country_value) ? <NearMeContainer onNearMeClick = {props.onNearMeClick} page={props.page} cta = {props.nearMeData.cta} detect={'मेरा शहर ढूंढें'} onBubbleClick ={props.onBubbleClick} cityName = {props.cityName ? (props.cityName).toLowerCase():''} />:""
    
    return(
        <div>
        <div className="mbg1" style={{display:"block"}} onClick={props.closePopup}></div>
            {/* <div className='popup'> */}
            <div className={`Overlaypopup ${screen}`}>
                <h2 className='filterTitle'>Explore More Cities<i className='closeMcat' onClick={e=>{eventTracking(props.tracking.click,'Filter-PopUp','PopUp-Cross-Button',1); props.closePopup()}}></i></h2>
                <div className="InnerList h90">
                    <CitySuggester 
                        flName = {props.flName} 
                        bizName = {props.query.biz ? props.query.biz : ''}
                        // getCityID={props.getCityID} 
                        page={props.page}
                        cityName={props.cityName} 
                        mcatName = {props.mcatName}
                        getSearchCity={props.getSearchCity} 
                        onBubbleClick ={props.onBubbleClick}/>
                    <div className="pdl10 pdr16">{nearMeView}</div>
                    {errorMessage}
                    <CityView
                        cityData = {props.cityData}
                        cityName={props.cityName}
                        prefData = {props.prefData}
                        tracking = {props.tracking}
                        SSR = {SSR}
                        glid = {glid}
                        onBubbleClick = {props.onBubbleClick}
                        searchParam = {props.searchParam}
                    />  
                </div> 
            </div>
            </div>  
    )
}

export default CityPopUp;