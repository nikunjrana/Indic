import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../Globals/GaTracking';
const SelectedCity = (props) =>{
    let citySelected = '';
    if(props.cityName){
        let name = props.cityName;
        let pathname = props.allIndiaLink.pathname+props.allIndiaLink.search;
        
        if ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")) {
            pathname.query = { "utm_source": "Adwords" }
        }
        citySelected = window.location && window.location.pathname && window.location.pathname.includes('isearch.php') && window.srchFltrNew? <a className = { props.openfilter ? 'fltrSlcted filterSltd textDeco fwb t_tc' : "fltrSlcted filter textDeco fwb t_tc"} data-index="deselect" href= {pathname} onClick={ (e)=>{
                eventTracking(props.tracking.click,'Location-Filter','Top-City-Deselected',1);
                eventTracking(props.tracking.click,'All-India-Clicked','Select-City',1); props.onBubbleClick}}>
                {name}{props.openfilter?<i className='crossicon'></i>:""} </a>:
        <a className ='Slcted filter sttc' data-index="deselect" to = {pathname} onClick={ (e)=>{
            eventTracking(props.tracking.click,'Location-Filter','Top-City-Deselected',1);
            eventTracking(props.tracking.click,'All-India-Clicked','Select-City',1); props.onBubbleClick}}>
            {name} </a>
    }
    return citySelected
}

export default SelectedCity;