import React from 'react';
import {eventTracking} from '../../../Globals/GaTracking'
const FilterViewOptions =(props) =>{
    const biz = (props.bizData.length > 1) || props.bizNameSelected? true:false;
    const ecom = props.ecomData && props.ecomValue==1 ? true : false;
    let isecom = false;
    let isBrand = false;
    if(window.location.search && window.location.search == "?shopnow=1"){ isecom = true};
    let iconFlag = false;
    let cityClass ='';
    let catClass = '';
    let brandClass ='';
    let bizClass = '';
    let ecomClass = '';
    let arwIcn ='poa tp39 r15';
    if(props.categoriesData.length && props.brandsData.length && (biz || ecom) ){
        iconFlag = true;
        cityClass =`w33 ${props.cityName  ? "pdl28" : "pdl15"}`;
        catClass = `${isecom ? 'w50 tc' : 'w33'} pdl10`;
        brandClass =`w25 pdl10`;
        bizClass = `tc ${isecom ? 'w50' : 'contentInherit w11'}`;
        ecomClass = `${isecom ? '':'contentInherit w11'} tc`
    }
    //Biz filter not present
    else if(props.categoriesData.length && props.brandsData.length){
        cityClass = `w33 ${props.cityName  ? "pdl28" : "pdl15"}`;
        catClass = 'w33 pdl10';
        brandClass = 'w33 pdl10';
    }
    //brands not present
    else if(props.categoriesData.length  && biz){
        cityClass = `w33 ${props.cityName  ? "pdl28" : "pdl15"}`;
        catClass = `${isecom ? 'w50 tc' : 'w33'} pdl10`;
        bizClass = `${isecom ? 'w50 tc' : 'w33'}`;
    }
    //categories not present
    else if(props.brandsData.length && biz ){
        cityClass = `w33 ${props.cityName  ? "pdl28" : "pdl15"}`;
        brandClass = 'w33 pdl10';
        bizClass = 'w33';
    }
    //brands and biz not present
    else if(props.categoriesData.length){
        cityClass = `w33 ${ecom ? 'pdl15' : 'tc'}`;
        catClass = `w33 ${isecom ? "tc": ecom ? "pdl10" : 'tc'}`;
        ecomClass = `w33 ${isecom ? 'tc' : ''}`;
    }
    //categories and biz not present
    else if(props.brandsData.length ){
        cityClass = 'w33 tc';
        brandClass = 'w33 tc';
    }
    //categories and brands not present
    else if(biz){
        cityClass = 'w33 tc';
        bizClass = 'w33 tc';
    }
    //categories,brands and biz not present
    else {
        cityClass = 'w50 tc';
        ecomClass = 'w50 tc'
        arwIcn = 'poa tp39'
    }
    let defaultClass = 'dtc vam por pd05 ';
    cityClass = defaultClass + cityClass;
    brandClass =defaultClass + brandClass;
    catClass = defaultClass + catClass;
    bizClass = defaultClass + bizClass;
    ecomClass = defaultClass + ecomClass;
    //City or either isq 
    let cityFilterName = props.page == 'Search' && window.srchFltrNew?
            (!props.country_value || props.country_value == "" || props.country_value == "IN")? (props.openCityFilterView ?
                <li className = {cityClass}>
                    <div className='por clrw tc filterHeading z9999' onClick={e=>{e.preventDefault();e.stopPropagation();props.closePopup()}}><img class="por tp5 objctFitSclDown" width="25" height="30" src="https://m.imimg.com/gifs/img/loc_icon.png" /></div>
                </li> 
                :<li id="cityFilter" className = {cityClass} onClick= {e=>{e.preventDefault();eventTracking(props.tracking.click,'Location-Filter',`Clicked`,1);props.onSelectFilterClick('Location')}}>
                    <div className="dib bgw por z9 w42" style = "margin-left: -20px">
                            <div className="dib" style="padding-right: 6px; margin-top:5px;"><img id={window.pageName=="Search-PWA"?'NearMeSrchICON':''}  class="por tp5 objctFitSclDown" width="20" height="24" src="https://m.imimg.com/gifs/img/loc_icon.png" /></div>
                        <div className="cl02a selectedTxt df"></div>
                    </div>
                </li>)
                :"" 
                :
            props.filterIcon? (props.openCityFilterView ?
                <li className = {cityClass}>
                    <div className='por clrw tc filterHeading'><img class="por tp5 objctFitSclDown" width="25" height="30" src="https://m.imimg.com/gifs/img/loc_icon.png" /></div>
                    <div className="toolTip l40"></div>
                </li> 
                :<li id="cityFilter" className = {cityClass} onClick= {e=>{eventTracking(props.tracking.click,'Location-Filter',`Clicked`,1);props.onSelectFilterClick('Location')}}>
                    <div className="dib bgw por z9 w42" style = "margin-left: -20px">
                            <div className="dib" style="padding-right: 6px; margin-top:5px;"><img id={window.pageName=="Search-PWA"?'NearMeSrchICON':''}  class="por tp5 objctFitSclDown" width="20" height="24" src="https://m.imimg.com/gifs/img/loc_icon.png" /></div>
                        <div className="cl02a selectedTxt df"></div>
                    </div>
                </li>) :
            // (!props.country_value || props.country_value == "" || props.country_value == "IN")? 
            (isecom ? "" :
            props.isqPresent  ? 
                (props.openIsqFilterView ?
                    <li className = {cityClass}>
                        <div className='por clrw tc filterHeading'>Filters</div>
                        <div className="toolTip l40"></div>
                    </li> 
                    :<li id="IsqFilter" className = {cityClass} onClick= {e=>{eventTracking(props.tracking.click,'ISQ-Filter',`Clicked`,1);props.onSelectFilterClick('ISQ')}}>
                        <div className="dib">
                            <div className="df">
                                <div className="dib">{"Filters"}</div>
                            </div>
                            <div className="cl02a selectedTxt df">{props.selectedISQ}</div>
                        </div>
                    </li>
                    )
                            :
            (props.openCityFilterView ?
                                    <li className = {cityClass}>
                                        <div className='por clrw tc filterHeading'>Select City</div>
                                        <div className="toolTip l40"></div>
                                    </li> 
                                    :<li id="cityFilter" className = {cityClass} onClick= {e=>{eventTracking(props.tracking.click,'Location-Filter',`Clicked`,1);props.onSelectFilterClick('Location')}}>
                                        <div className="dib">
                                            <div className="df">
                                                {props.page && props.page == "Search" && window.srchFltrNew? '' : <div className="mcatIcon mcatLocationIco"></div>}
                                                <div className="dib">{props.cityName  ? "City" :"Select City"}</div>
                                            </div>
                                            <div className="cl02a selectedTxt df">{props.cityName}</div>
                                        </div>
                                    </li>))
                                    // :"";
    let categoriesFilterName = '';
    if(props.categoriesData.length){
        categoriesFilterName =  props.openCategoriesFilterView ?
                                    <li className = {catClass}>
                                        <div className='por clrw tc filterHeading'>Categories</div>
                                        <div className="toolTip l40"></div>
                                    </li>
                                    :<li id="catFilter" className = {catClass} onClick = {e=>{eventTracking(props.tracking.click,'Category-Filter',`Clicked`,1);props.onSelectFilterClick('Categories')}}>
                                        <div className="dib">
                                            <>Categories</>
                                            <div className="cl02a selectedTxt">{props.mcatName}</div>
                                        </div>
                                    </li>
    }
    let brandsFilterName = '';
    if(props.brandsData.length){
        brandsFilterName =  isecom ? isBrand=true : props.openBrandFilterView ? 
                                <li className = {brandClass}>
                                    <div className='por clrw tc filterHeading'>Brands</div>
                                    <div className="toolTip l40"></div>
                                </li>
                                :<li id="brandFilter" className = {brandClass} onClick = {e=>{eventTracking(props.tracking.click,'Brand-Filter',`Clicked`,1);props.onSelectFilterClick('Brands')}}>
                                    <div className="dib">
                                        <>Brands</>
                                        <div className="cl02a selectedTxt" style={{width:"62px"}}>{props.selectedBrnd}</div>
                                    </div>
                                </li>
    }
    let bizFilterName = '';
    if(biz){
        let view = '';
        let textClass='';
        if(props.bizNameSelected && (props.bizNameSelected)){
            textClass = 'filterCircle ';
        }
        let selectedBizCss = '';
        if(iconFlag){
            view =  isecom ? <div className="dib pdl10"><div>Seller Type</div>
            <div className="cl02a selectedTxt">{props.ecomData.NAME}</div></div> : <i className ={'dib vam fltrIcn tc ' + textClass}></i>;
            selectedBizCss = 'por clrw  tc filterHeading';
        }
        else{
            view = <><div className="dib pdl10"><div>Seller Type</div>
            <div className="cl02a selectedTxt">{isecom ? props.ecomData.NAME : props.bizNameSelected}</div></div></>;
            selectedBizCss = 'por clrw tc filterHeading'
            }
        bizFilterName = props.openBizFilterView ? 
                            <li className = {bizClass}><div className={selectedBizCss}>Seller Type</div><div className="toolTip l40"></div></li>
                            :<li id = "bizFilter" className = {bizClass} onClick = {e=>{eventTracking(props.tracking.click,'Price-Biz-Filter',`Clicked`,1);props.onSelectFilterClick('Biz')}}>{view}</li>
    }
    let ecomFilterName = '';
    if((ecom && !biz)){
        ecomFilterName = <li id = "ecomFilter" className = {ecomClass} onClick = {e=>{eventTracking(props.tracking.click,'Ecom-Filter',`Clicked`,1);props.onSelectFilterClick('Biz')}}>
            {props.categoriesData.length >0 && isBrand && iconFlag ? <div className="dib pdl10">Seller Type
        <div className='cl02a selectedTxt'>{isecom ? props.ecomData.NAME : ''}</div></div> : iconFlag ? <i className ={'dib vam fltrIcn tc '}></i> : <div className="dib pdl10">Seller Type
        <div className='cl02a selectedTxt'>{isecom ? props.ecomData.NAME : ''}</div></div>}
            </li>
    }
    return(
           <ul className ={props.page == 'Search' && window.srchFltrNew ?'' : `bgw ${props.filterIcon?"pdr7":"brdc"} dt w100 mauto pdl0 filters arrow_dropdown por`}>
                    {cityFilterName}
                    {categoriesFilterName}
                    {brandsFilterName}
                    {bizFilterName}
                    {ecomFilterName}
            </ul>
        )
}
export default FilterViewOptions;