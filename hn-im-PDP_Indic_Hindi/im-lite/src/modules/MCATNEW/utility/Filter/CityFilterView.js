import React from 'react';
import { Link } from 'react-router';
import NearMeView from '../NearMe/NearMeView';



const CityFilterView = (props) =>{
    //Error Message
    let errorMessage = props.nearMeData.errorMsg ? <div className = 'err fs13 ml5 mr5 pdt10'>{props.nearMeData.errorMsg}</div>:'';
    let nearMeView = <NearMeView
            onNearMeClick = {props.onNearMeClick}
            cta = {props.nearMeData.cta}
            type = 'FILTER'
            cityName = {props.cityName ? (props.cityName).toLowerCase():''}
            countryIso ={this.props.countryIso}
        />
    //AllIndia
    let allIndiaClass = 'fltrSlcted filterPd';
    if(props.cityName) allIndiaClass = 'filterUnsel filterPd brd_gry';
    let linkParams = {pathname : props.cityData.allIndiaLINK ,search : props.searchParam}
    if(props.bizNameSelected){
        linkParams["state"] = {ref: 'CITY'}
    }
    let allIndiaName = "All India";

    if(props.isLoadingCity.flag && props.isLoadingCity.id && props.isLoadingCity.id == "allIndia"){
        allIndiaName = props.isLoadingCity.text;
    }
    let allIndiaView = props.cityName ? <li className = {allIndiaClass} onClick = {(e)=>{
        props.eventTracking(props.tracking.click,'All-India-Clicked','Select-City',1);
        props.onBubbleClick(e,'CITY')}}><Link to = {linkParams} data-index = "allIndia" >{allIndiaName}</Link>
        </li> : <li className = {allIndiaClass}><Link to = {linkParams} data-index = "allIndia" >{allIndiaName}</Link></li>;

    //City Selected
    let citySelectedView = '';
    if(props.cityName){
        let name = props.cityName;
        if(props.isLoadingCity.flag && props.isLoadingCity.id && props.isLoadingCity.id == "deselect"){
            name = props.isLoadingCity.text;
        }
        citySelectedView = <li className = 'fltrSlcted filterPd'  onClick = {(e)=>{
            props.eventTracking(props.tracking.click,'Location-Filter','Top-City-Deselected',1);
            props.eventTracking(props.tracking.click,'All-India-Clicked','Select-City',1);
            props.onBubbleClick(e,'CITY',true)
        }}><Link data-index="deselect" to = {linkParams} >{name}<i className = 'dSelect'></i></Link></li>
    }
    //cities
    let cityView = '';
    if(props.cityData.cities.length>0){       
        cityView = props.cityData.cities.map(
                        (item,index)=>{
                            let linkParams = {pathname : item.LINK ,search : props.searchParam}
                            if(props.bizNameSelected){
                                linkParams["state"] = {ref: 'CITY'}
                            }
                            let name = item.NAME;
                            if(props.isLoadingCity.flag && props.isLoadingCity.id && props.isLoadingCity.id == index){
                                name = props.isLoadingCity.text;
                            }
                            return  <li className = 'filterUnsel filterPd brd_gry' onClick = {(e)=>{
                                props.eventTracking(props.tracking.click,'Location-Filter',`Top-City${index+1}-Clicked`,1);
                                props.onBubbleClick(e,'CITY')}}>
                                        <Link data-index = {index} to= {linkParams} title = {item.TITLE}>{name}</Link>
                                        
                                    </li>
                        }
                    )}
    let displayClass = 'dn';
    if(props.showView) displayClass = 'bgw wnr oAuto pd10 bopt mtb0' ;
    return(
        <ul className = {displayClass}>
                {nearMeView}
                {allIndiaView}
                {citySelectedView}
                {cityView}
            {errorMessage}
        </ul>
       
    )
}
export default CityFilterView;