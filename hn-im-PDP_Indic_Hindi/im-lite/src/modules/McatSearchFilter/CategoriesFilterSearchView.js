import React, { useState } from 'react';
import SelectedCategory from './CategoriesView/SelectedCategory';
import CategoriesList from './CategoriesView/CategoriesList';
import "../Mcat/utility/Filter/Filter.css";
import { eventTracking } from '../../Globals/GaTracking';
import BizFilterPopUp from './FilterViewOptions/BizFilterPopUp';

const CategoriesFilterSearchView = (props) =>{
    const [showRelatedMcatSearch, setShowRelatedMcatSearch] = useState(true);
    const [openBizFilterView, setOpenBizFilterView] = useState(false);
    let bizNameSelected = props.bizName ? props.bizName : '';
    let bizData = props.bizData ? props.bizData : [];
    let isForeign =  (!props.country_value || props.country_value == "" || props.country_value == "IN") ? false : true;
    let srchTerm = window.location.href.includes("/isearch.php") ? window.location.href.split("=")[1].split("&")[0].replace(/\+/g, ' ') : ""; 
    srchTerm = srchTerm ? srchTerm.replace(/(%2B|%20|\s|\+\+)+/g, ' ') : '';
    srchTerm = srchTerm ? srchTerm.replace(/\s+$/, '') : '';
    let isFilterIcn = props.categoriesData ? (props.categoriesData.length && props.categoriesData.length > 1) ? true : props.categoriesData.length == 1 ? (srchTerm.toLowerCase() != props.categoriesData[0].NAME.toLowerCase()) ? true : false : false : false ;
    let categoriesSelectedView = (
        <SelectedCategory
            categoryName={props.categoryName}
            // isLoading={props.isLoading}
            onBubbleClick={props.onBubbleClick}
            tracking={props.tracking}
        />
    );
    const backHandle = () => {
        document.body.style.overflow = '';
        setOpenBizFilterView(false);
        window.removeEventListener("popstate",backHandle);
    }
    const onBubbleClick = (link) => {
        setOpenBizFilterView(false);      
        props.onBubbleClick()
        window.removeEventListener("popstate",backHandle)
    }
    const closePopup = () => {
        setOpenBizFilterView(false);    
        window.history.back()
        document.body.style.overflow = '';
        window.removeEventListener("popstate",backHandle)
    }
    const createBizFilter = () => {
        let bizPriceFilter='';
        if (openBizFilterView) {
            if (bizData.length) {
                bizPriceFilter = <BizFilterPopUp
                    tracking={props.tracking}
                    searchParam={props.location.search}
                    bizNameSelected={bizNameSelected ? bizNameSelected : "All"}
                    bizData={props.bizData}
                    page={props.page}
                    onBubbleClick={onBubbleClick}
                    closePopup={closePopup}
                    location={props.location}
                    isEcomShow = {props.isEcomShow}
                    ecomName = {props.ecomName}
                />
            }
        }
        return bizPriceFilter;
    }
    const onSelectFilterClick = (filter) => {
        history.state == "popUp" ? window.history.replaceState("popUp", null,null) : window.history.pushState("popUp", null,null)
        window.refUrl.push("somePopUp");
        window.addEventListener("popstate",backHandle, {passive:true});
        document.body.style.overflow = 'hidden';
        toggleFilter(filter);
    }
    const toggleFilter = (type) => {

        switch(type){
            case 'Biz':
                setOpenBizFilterView(true);
                break;
            default:
        }
    }
    //Categories
    let categoriesView = (
        <CategoriesList
            categoriesData={props.categoriesData}
            // isLoading={props.isLoading}
            onBubbleClick={props.onBubbleClick}
            tracking={props.tracking}
            cityName = {props.cityName}
            page={props.page}
            setShowRelatedMcatSearch={setShowRelatedMcatSearch}
            searchTermval={props.searchTermval}
        />
    ); 
    let bizView = createBizFilter();
     if(showRelatedMcatSearch)return(<div className={`${isForeign ? 'pdt8' : ''} df`}>
                    {isFilterIcn ? openBizFilterView ? <li onClick={(e)=>{closePopup()}} className = "dtc vam por pd05 tc z9999"><div className='por clrw tc popHeading'><img class="por objctFitSclDown" alt="Other Filter Options" width="20" height="24" src="https://m.imimg.com/gifs/img/selected_filter.svg" /></div>
                    </li>:<div><ul className="pdl6 mr7"><li id="FilterIcon" onClick = {e=>{eventTracking(props.tracking.click,'Filter-Icon',`Clicked`,1);onSelectFilterClick('Biz')}}><img class="objctFitSclDown" alt="Other Filter Options" width="20" height="24" src="https://m.imimg.com/gifs/img/mi_filter.svg"/></li></ul></div> : ''}
                    {isFilterIcn ? <div id="cityFilterId1"  className = "bgw wnr oAuto catView promptHandlingClass pdb5 fs12 scrbfltr">
                    {bizView}
                    {categoriesSelectedView}
                    {categoriesView}
                    </div> : ''}
                </div> 
    )
    else return( <></>)
}

export default CategoriesFilterSearchView;

