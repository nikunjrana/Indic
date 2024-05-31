import React from 'react';
import { eventTracking } from '../../../../Globals/GaTracking';
const FilterOptionsView = (props) =>{
    const bizPrice = (props.bizData.length > 0) || props.bizNameSelected? true:false;
    let iconFlag = false;
    let cityClass ='';
    let catClass = '';
    let brandClass ='';
    let filterClass = '';
   
    if(props.categoriesData.length>0 && props.brandsData.length> 0 && bizPrice){
        iconFlag = true;
        cityClass = props.openCityFilterView ?'w30 brdbgreen' : 'w30 brdb';
        catClass = props.openCategoriesFilterView ?'w33 brdbgreen':'w33 brdb';
        brandClass = props.openBrandFilterView ? 'w25 brdbgreen':'w25 brdb';
        filterClass = props.openBizPriceFilterView ?'w11 brdbgreen':'w11 brdb';

    }
    //Biz/Price filter not present
    else if(props.categoriesData.length>0 && props.brandsData.length> 0){
        cityClass = props.openCityFilterView ?'w33 brdbgreen':'w33 brdb';
        catClass =  props.openCategoriesFilterView?'w33 brdbgreen':'w33 brdb';
        brandClass = props.openBrandFilterView ?'w33 brdbgreen':'w33 brdb';
    }
    //brands not present
    else if(props.categoriesData.length > 0 && bizPrice){
        cityClass = props.openCityFilterView ?'w33 brdbgreen':'w33 brdb';
        catClass = props.openCategoriesFilterView?'w33 brdbgreen':'w33 brdb';
        filterClass =  props.openBizPriceFilterView ?'w33 brdbgreen':'w33 brdb';
    }
    //categories not present
    else if(props.brandsData.length>0 && bizPrice ){
        cityClass = props.openCityFilterView ?'w33 brdbgreen':'w33 brdb';
        brandClass = props.openBrandFilterView?'w33 brdbgreen':'w33 brdb';
        filterClass = props.openBizPriceFilterView ?'w33 brdbgreen':'w33 brdb';
    }

    else if(props.categoriesData.length>0){
        cityClass = props.openCityFilterView ? 'w50 brdbgreen' : 'w50 brdb';
        catClass = props.openCategoriesFilterView ? 'w50 brdbgreen' : 'w50 brdb';
    }
    else if(props.brandsData.length > 0){
        cityClass = props.openCityFilterView ? 'w50 brdbgreen' : 'w50 brdb';
        brandClass = props.openBrandFilterView ? 'w50 brdbgreen' : 'w50 brdb';
    }
    else if(bizPrice){
        cityClass = props.openCityFilterView ? 'w50 brdbgreen' : 'w50  brdb';
        filterClass = props.openBizPriceFilterView ? 'w50 brdbgreen' : 'w50 brdb';
    }
    else {
        cityClass = 'w100';
    }

    let defaultClass = 'dtc tc vam por lh45';
    cityClass = defaultClass + cityClass;
    brandClass =defaultClass + brandClass;
    catClass = defaultClass + catClass;
    filterClass = defaultClass + filterClass;

    //City
    let textClass = props.openCityFilterView ? 'dib vam wr fw' : '';
    let selectCityView = <li className = {cityClass} onclick= {e=>{eventTracking(props.tracking.click,'Location-Filter',`Clicked`,1);props.onSelectCityClick()}}><span className = {textClass}>Select City</span></li>

    //Categories
    let categoriesView = '';
    if(props.categoriesData.length > 0){
        textClass = props.openCategoriesFilterView ? 'dib vam wr fw' : '';
        categoriesView = <li className = {catClass} onclick = {
            e=>{
            eventTracking(props.tracking.click,'Category-Filter',`Clicked`,1)
            props.toggleFilter('CATEGORIES')}}><span className = {textClass}>Categories</span></li>
    }
    //Brands
    let brandsView = '';
    if(props.brandsData.length > 0){
        textClass = props.openBrandFilterView ? 'dib vam wr fw' : '';
        brandsView = <li className = {brandClass} onclick = {
            e=>{eventTracking(props.tracking.click,'Brand-Filter',`Clicked`,1);props.toggleFilter('BRANDS')}}><span className = {textClass}>Brands</span></li>
    }

    //Biz/Price
    let bizPriceView = '';
    if(bizPrice){
        let view = '';
        let textClass = '';
        if(props.location.query && (props.location.query.biz)){
            textClass = 'filterCircle ';
        }
        if(iconFlag){
            view = <i className ={'dib vam fltrIcn tc '+ textClass}></i>;
        }
        else{
            textClass = props.openBizPriceFilterView ? textClass + 'dib vam wr fw' : textClass;
            view = <span className = {textClass}>Filters</span>;

        }
        bizPriceView = <li className = {filterClass}  onclick = {e=>{eventTracking(props.tracking.click,'Price-Biz-Filter',`Clicked`,1);props.toggleFilter('BIZPRICE')}}>{view}</li>
        
    }

    return(
        <ul className = 'bgw por dt w100 mauto pdl0 filters'>
        
        {selectCityView}
        {categoriesView}
        {brandsView}
        {bizPriceView}
        
        </ul>
    )
}

export default FilterOptionsView;