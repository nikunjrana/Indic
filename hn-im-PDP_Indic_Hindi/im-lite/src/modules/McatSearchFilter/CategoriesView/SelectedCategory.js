import React from 'react';
import { eventTracking } from '../../../Globals/GaTracking';
const SelectedCategory = (props) => {
    let categorySelected = '';
    if (props.categoryName) {
        let name = props.selectedHead?props.selectedHead +": "+props.categoryName: props.categoryName;
        let linkparams =props.selectedHead? {pathname:props.AllIsqLink} : (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? {pathname:"",query:{"utm_source":"Adwords"}}: {pathname:props.categoryPath}

        categorySelected = (
            <div className="Schip">
                <a data-index="deselect" href = {linkparams.pathname} 
            onClick={ (e)=>{
                eventTracking(props.tracking.click,props.categoryTray?`Filter-${props.type}`:'ISQ-Filter',props.categoryTray?`Filter-${props.type}-Deselected`:'ISQ-Deselected',1);
                props.categoryTray?eventTracking(props.tracking.click,'All-India-Clicked-ISQ','Select-ISQ',1):""; props.onBubbleClick}}>
                {name} </a>
            </div>
        );
    }
    return categorySelected;
}

export default SelectedCategory;