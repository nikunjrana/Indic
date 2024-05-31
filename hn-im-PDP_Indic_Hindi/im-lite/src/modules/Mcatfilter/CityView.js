import React from 'react'
import { eventTracking } from '../../Globals/GaTracking';
import { Link } from 'react-router';

const CityView = (props) =>{
    let allIndiaLink = {pathname : props.cityData.allIndiaLINK ,search : props.searchParam}  
    if((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")){
        allIndiaLink.query={"utm_source":"Adwords"}
    } 
    let allIndiaClass = props.cityName ? `Unsel` : `Slcted`;
    let allIndiaName = "All India";
    let allIndiaView = props.cityName ? <div className={`txtclr ${allIndiaClass}`} onClick={(e) => { eventTracking(props.tracking.click, 'All-India-Clicked', 'Select-City', 1) }}>{(props.SSR && ((props.SSR["userViewCount"] == 5 && (props.glid==undefined)))) ? <Link to={allIndiaLink} data-index="allIndia" onClick={props.onBubbleClick}>{allIndiaName}</Link> : <a href={allIndiaLink.pathname} data-index="allIndia" onClick={(event) => { window.location.href = (allIndiaLink.pathname); props.onBubbleClick; event.preventDefault(); }}>{allIndiaName}</a>}</div> : <div className={allIndiaClass}>{allIndiaName}</div>;

    let citySelectedView = props.cityName ?<div className ="Slcted"><a data-index="deselect" href= {allIndiaLink.pathname+allIndiaLink.search} onClick={ (e)=>{eventTracking(props.tracking.click,`${props.catFilter?"":"Location-"}Filter-PopUp`,'City-Deselected',1);props.onBubbleClick}}>{props.cityName} </a></div>:""
    
    let View = props.cityData && props.cityData.cities && props.cityData.cities.length>0 ? props.cityData.cities.map((item,index)=>{
        let linkParams = {pathname:item.LINK + (props.searchParam && props.searchParam.includes("?q-")?"":props.searchParam )}
        if((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")){
            linkParams.query={"utm_source":"Adwords"}
        }
        return(<div className ="Unsel" onClick={(e)=>{eventTracking(props.tracking.click,'Location-Filter',`Top-City-${index+1}-Clicked-Ins`,1);}}>
        {(props.SSR && ((props.SSR["userViewCount"] == 5 && (props.glid==undefined)))) ? <Link  data-index={index} to={linkParams} onClick={props.onBubbleClick}>{item.NAME}</Link> : <a data-index={index} href={linkParams.pathname} onClick={(event) => { window.location.href = (linkParams.pathname); props.onBubbleClick; event.preventDefault(); }}>{item.NAME}</a>}</div>)})
        
        : props.prefData ? props.prefData.map((item,index)=>{if((props.cityName && props.cityName.toLowerCase())!= item.NAME.toLowerCase()){
        return(<div className="Unsel" onClick={(e) => {eventTracking(props.tracking.click,"City-PopUp-Chip-Select-prefLocCity",`City-PopUp-Chip-Clicked`,1);}}><span role="button" data-index={index} onClick={(event) => { window.location.href = (item.LINK); event.preventDefault(); }}>{item.NAME}</span></div>)}}):"";
    return (
      <div className={props.catFilter ?"":"pd10"}>
        {allIndiaView}
        {citySelectedView}
        {View}
      </div>
    )
  
}

export default CityView;