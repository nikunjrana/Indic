import React,{useState} from 'react';
import { Link } from 'react-router';
import './LocationPopUp.css';
import CitySuggester from './CitySuggester';
import { eventTracking } from '../../../../Globals/GaTracking';
function showLoader(){
    document.getElementById('gblLoader').style.display = "block";
}

const LocationPopUpView = (props) =>{

    const [circleSelected,setCircleSelected] = useState(props.cityName?'city':'allIndia');

    let locationCircle = <span className = 'locationCircle locationCirUnSel'></span>;
    let locationCirclesel = <span className = 'locationCircle locationCirSel'></span>;
    let unSelectedClass = 'fs16 db clr33';
    let selectedClass = 'fs16 db clrmim';
    //Back Button 
    let backButton = <div className = 'bgmim fw fs16 pd15' onClick = {()=>{
        window.history.back();}}>
                        <i className="bckIcon fl"></i>
                        <span className = 'clw'>{props.vernacularData != undefined ? props.vernacularData.LOC_LABEL5 : "Select your location"}</span>
                    </div>
    
    //Error Message

    let errorMessage = props.nearMeData.errorMsg?<div className = 'err mt10'>{props.nearMeData.errorMsg}</div> : '';
    

    //Near Me
    let nearMeView = '';
    if(props.nearMeData.show){
        
        nearMeView = 
        <li className = 'brdb' onClick = {props.onNearMeClick}> 
            <div className = {unSelectedClass}> 
            <i class="dib vam w18 h18" >
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 54 54">
                    <path class="grnlocF" d="M27,0V54"></path>
                    <path class="grnlocF" d="M0,27H54"></path>
                    <circle class="grnlocF" cx="27.38" cy="26.63" r="16.88"></circle>
                    <circle class="grnloc-2F" cx="27.38" cy="26.63" r="8.25"></circle>
                </svg>
            </i>
            <span class="dib vam ml10" >{props.nearMeData.cta}</span> 
            {locationCircle}
            </div>
        {errorMessage}
        </li>
    }

    //AllIndia
   
    let indiaIcon = props.cityName ? <i class="disindIcon dib indBg vam mr10"></i>:<i class="indIcon dib indBg vam mr10"></i>
    let linkParams = {pathname :  props.cityData.allIndiaLINK}
    let allIndiaView =  props.cityName ? <li className = 'brdb' onClick = {e=>{setCircleSelected("allIndia");eventTracking(props.tracking.click,'All-India-Clicked','Select-City',1);showLoader();}}><Link className = {unSelectedClass} to = {linkParams}>{indiaIcon}{props.vernacularData != undefined ? props.vernacularData.LOC_LABEL3 : "All Over India"} </Link> {circleSelected == "allIndia"?locationCirclesel:locationCircle}</li>
    : <li className = {'brdb ' + selectedClass}> {indiaIcon} {props.vernacularData != undefined ? props.vernacularData.LOC_LABEL3 : "All Over India"}  {locationCirclesel}</li>
//City Selected
    let citySelectedView = '';
    if(props.cityName){
        citySelectedView = <li className = 'brdb'><span  className = {selectedClass} >
        <i class="ico-hf dib mr5 vam lIcon"></i>
        {props.cityName}</span> {circleSelected == "city" ? locationCirclesel : locationCircle}</li>
    }
    //cities
    let cityView = '';
    if(props.cityData.cities.length>0){       
        cityView =
                
                    props.cityData.cities.map(
                        (item,index)=>{
                            let linkParams = {pathname : item.LINK}
                            return <li className = 'brdb' onClick = {e=>{
                            setCircleSelected(index);
                            eventTracking(props.tracking.click,`Top-City${index+1}-Clicked`,'Select-City',1);showLoader()}}>
                            <Link className = {unSelectedClass} to= {linkParams} title = {item.TITLE}>{item.NAME}</Link>    
                            {circleSelected == index ?locationCirclesel:locationCircle}</li>
                        }
                    )
                

            
    }
    
    return(
       
        <div className = 'LocationPop bgw w100 pf bxrd4 z999 pdb10'>
            {backButton}
            {/* {cityAutoSuggestView} */}
            <CitySuggester flName = {props.flName} vernacularData = {props.vernacularData} cityName={props.cityName} mcatName = {props.mcatName}/>
            <ul className = 'locationUl pd0'>
            {nearMeView}   
            {allIndiaView}
            {citySelectedView}
            {cityView? <li><a className = 'fw fs16'>{props.vernacularData != undefined ? props.vernacularData.LOC_LABEL2 : 'Top Cities'}</a></li>:''}
            {cityView}
            </ul>
            
            
        </div>
    )
}

export default LocationPopUpView;