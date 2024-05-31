import React from 'react';
import getBreadCrumbsJSON from './helper';
import {eventTracking} from '../../../../Globals/GaTracking';
export default function Breadcrumbs(props) {

    let crumbsDispData = getBreadCrumbsJSON(props.data);

    if (crumbsDispData) {
        let cn = 1,
            crumbsView = [];
        let crumbsDispDataAr = Object.keys(crumbsDispData);
        //Home; Subcat; Pmcat; Mcat
        let breadCrumbItems = ["Home", "Subcat", "Pmcat", "Mcat"];
        let category = 'Product-Page-Clicks';
        
        if (props.isExtended){
            category ='Extended-Product-Page-Clicks';
        }

        for (let name of crumbsDispDataAr) {
            let breadCrumbItem = breadCrumbItems[cn-1];
            let label= breadCrumbItem;
            if (props.isExtended){
                label =breadCrumbItem + "-" + props.extendedId;
            }
            if (cn == 1) {
                crumbsView.push(<a onClick={(e) => { eventTracking(category, 'Breadcrumb' , label, true) }} className="clrBl dib" href={crumbsDispData[name]} ><i className="ico-nav homeIco mr3 fl" style="background-image: url(&quot;https://m.imimg.com/gifs/nav_sprite_v1.png&quot;); width: 20px; height: 17px; background-size: 100%; background-position: 1px -162px; margin-top: -1px;"></i>{name}</a>)
            }
            else {                
                crumbsView.push(<span><span> &gt; </span><a onClick={(e) => { eventTracking(category, 'Breadcrumb' , label, true) }} className="clrBl" href={crumbsDispData[name]} ><span>{name}</span></a></span>)

            }
            cn++;
        }

        return (
            <div className={props.isExtended ? "por fs13 clrBl mt10 bgw bxrd10" : "por fs13 clrBl mt10"}><span className="db pdb10 pdt15 pdl5 pr10 lh20 wsnw oa bxrd10">
                {crumbsView}
            </span>
            </div>
        );
    }
    else {
        return;
    }

}