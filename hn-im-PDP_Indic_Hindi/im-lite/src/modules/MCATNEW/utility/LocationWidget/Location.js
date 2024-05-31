import React, {Component} from 'react';
import './Location.css';
import {detectLocation} from '../../../../Globals/detectLocation';
import { eventTracking } from '../../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../../Globals/CookieManager';
import NearMeView from '../NearMe/NearMeView';
import { goToRoute } from '../../../../Globals/routingFunction';
import {setCityLatLong} from '../NearMe/helper';
import { removalTextNodes } from '../../../../Globals/translatorPreact/translatorPatch';
import { Link } from 'react-router';

export default class Location extends Component {
    constructor(props){
        super(props);
        this.state ={
            nearMe : { cta : 'Near Me',errorMsg : '' }
        }
        this.inlineCityView = this.inlineCityView.bind(this);
        this.geoLocState =this.geoLocState.bind(this);
        this.onNearMeClick = this.onNearMeClick.bind(this);    
        this.isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
    }

    componentDidUpdate(){
        removalTextNodes();
    }
    
    geoLocState(result, lat, long, acc) {
        let nearMeData = this.state.nearMe;
        
        if (result == 'granted' || result == 'prompt-granted') {   
            nearMeData['cta'] = 'Detecting..';
            //direct to detected city page
            setCityLatLong(lat,long,this.props.flName).then(res=>{
                eventTracking(this.props.tracking.click, 'Location-Section',`Near-Me-City-Detected-Pg-${this.props.pageNumber}-${this.props.ea}`, 1);
                this.setState({ nearMe: { cta: 'Near Me', errorMsg: '' } })
                {((this.SSR && (this.SSR["userViewCount"] == 5)) || this.glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (this.glid==undefined)))? goToRoute(res) : window.location.href=(res) }
            })
            .catch(error =>{
                let nearMeData = { cta : 'Near Me'};
                nearMeData['errorMsg'] = 'Some error occured';
                eventTracking(this.props.tracking.click, 'Location-Section',`Near-Me-City-Not-Detected-Pg-${this.props.pageNumber}-${this.props.ea}`, 1);
                this.setState({
                    nearMe : nearMeData
                }); 
            })

        }
        else if (result == 'denied'|| result == 'prompt-denied') {

            nearMeData['errorMsg'] = 'Unable to detect your location. Select City.';
            eventTracking(this.props.tracking.click, 'Location-Section',`Near-Me-City-Not-Detected-Pg-${this.props.pageNumber}-${this.props.ea}`, 1);

        }
        else if (result == 'denied-phone') {
            nearMeData['errorMsg'] = 'Phone location settings disabled. Please allow.';
            eventTracking(this.props.tracking.click, 'Location-Section',`Near-Me-City-Not-Detected-Pg-${this.props.pageNumber}-${this.props.ea}`, 1);

        }     
        this.setState({
            nearMe : nearMeData
        });  
        
    }
    onNearMeClick(){
        //change the source
        detectLocation(this.geoLocState,this.props.tracking.pageType,0);
      
       
    }

 createNearMeView(){
        let nearMeView = <NearMeView
            onNearMeClick = {this.onNearMeClick}
            cta = {this.state.nearMe.cta}
            cityName = {this.props.cityName}
            countryIso ={this.props.countryIso}
            inline = {this.props.inline}
        />
        return nearMeView;
    }

    inlineCityView(){
        let newcss = (this.props.topfilter)? "Uchip" :"InUchip";
        let nearMe =  (this.props.countryIso == "IN")? this.createNearMeView():"";
        let AllIndia = this.props.cityName ? <div className={newcss} onClick={(e) => {eventTracking(this.props.tracking.click,"City-Chip",`All-India-Deselect`,1);}}><a href={this.props.cityData.allIndiaLINK + (this.props.searchParam ? this.props.searchParam :"")} style="color: #000">All India</a></div> : <div className={this.props.topfilter? "Schip" :"InSchip"}><a href={this.props.cityData.allIndiaLINK} style="color: #000">All India</a></div>
        let CitySel = this.props.cityName ?<div className={this.props.topfilter? "Schip" :"InSchip"} onClick={(e) => {eventTracking(this.props.tracking.click,"City-Deselect",`City-Chip-1`,1);}}><a href={this.props.cityData.allIndiaLINK} style="color: #000">{this.props.cityName}</a></div>:"";
        
        let data = this.props.cityData.cities;
        let citiesCount = this.props.cityData && this.props.cityData.cities && this.props.cityData.cities.length < 10 ? this.props.cityData.cities.length : window.location.href && window.location.href.includes("/impcat/") ? 10 : 9;
        let view = this.props.cityData && this.props.cityData.cities && this.props.cityData.cities.length>0 ? data.map((item,index)=>{
            if(index < citiesCount){
                let citylink = item.LINK + (this.props.searchParam && this.props.searchParam.includes("?q-") ? "":this.props.searchParam)
            return( 
            <div className={newcss} onClick={(e) => {eventTracking(this.props.tracking.click,
                 "City-Chip-Select",`City-Chip-${CitySel?index + 2:index+1}-Clicked`,1);}}>
                {(this.SSR && ((this.SSR["userViewCount"] == 5 && (this.glid==undefined))))?
                <Link data-index={index} to={citylink}>{item.NAME}</Link>
                :
                <a data-index={index} style="color: #000" href={citylink} onClick={(event) => { window.location.href = (citylink); event.preventDefault(); }}>{item.NAME}</a>}
            </div>)
        } else return null;}): this.props.prefData ? this.props.prefData.map((item,index)=>{
            if((this.props.cityName && this.props.cityName.toLowerCase())!= item.NAME.toLowerCase()){
            return(
            <div className={newcss} onClick={(e) => {eventTracking(this.props.tracking.click,
                "City-Chip-Select-prefLocCity",`City-Chip-Clicked`,1);}}>
                <span role="button" data-index={index} onClick={(event) => { window.location.href = (item.LINK); event.preventDefault(); }}>{item.NAME}</span>
           </div>)}
        }):""
        let iconfilter = this.props.topfilter ?<div id="cityFilterIcon" className="dib marginIcon" onClick= {e=>requestAnimationFrame(()=>setTimeout(()=>{eventTracking(this.props.tracking.click,'Location-Filter',`Clicked`,1);this.props.onSelectFilterClick('Location')},0))}><img class="por objctFitSclDown" alt={this.isFirefox ?'':"City Filter Options"} width="20" height="24" src="https://m.imimg.com/gifs/img/loc_icon.png" /></div>:"" 

          if(this.props.topfilter){
            return(
                <div id="CityDiv" className='df oAuto bgw'>
                        {iconfilter}
                    <div id = "cityFilterId" className='wnr oAuto pdt8'>
                        {AllIndia}
                        {CitySel}
                        {view}
                        <div className="pd3 clrr">{this.state.nearMe.errorMsg}</div>
                    </div>
                </div>)
            
          }
        return (
            <section id = "Citywidget" className="pdl5 mb8">
                    <p className="fs14 clrg fw600 pd40 mb5">Find Sellers Near You!</p>
                <div className="scWrap wnr">
                    {nearMe}
                    {AllIndia}
                    {CitySel}
                    {view}
                </div>
                <div className="pd3 clrr">{this.state.nearMe.errorMsg}</div>
            </section>
          )
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.uniqueId !== this.props.uniqueId){
            this.setState({
                nearMe : { cta : 'Near Me',errorMsg : ''}
            })
        }
        
    }
    render(){
        this.props.ea = this.props.ea == 0? this.props.ea + 1 : this.props.ea;
        this.SSR = JSON.parse(localStorage.getItem("multi_purpose"));
        this.glid=getCookieValByKey('ImeshVisitor', 'glid');
        let cityView = this.inlineCityView()
        return(cityView)
    }
}