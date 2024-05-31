import React from "react";
import CategoriesList from "./CategoriesView/CategoriesList";
import SelectedCategory from "./CategoriesView/SelectedCategory";
import { eventTracking } from "../../Globals/GaTracking";

const CategoriesFilterView = (props) => {
    //Category Selected
    let categoriesSelectedView = props.type == "Biz"?"":(
        <SelectedCategory
            categoryName={props.categoryName}
            selectedHead={props.selectedHead?props.selectedHead:""}
            // isLoading={props.isLoading}
            AllIsqLink = {props.AllIsqLink}
            categoryTray = {props.categoryTray}
            onBubbleClick={props.onBubbleClick}
            tracking={props.tracking}
            type = {props.type}
            categoryPath = {props.categoryPath}
        />
    );
    //Categories
    let categoriesView = (
        <CategoriesList
            categoriesData={props.categoriesData}
            // isLoading={props.isLoading}
            categoryName={props.categoryName}
            selectedHead={props.selectedHead?props.selectedHead:""}
            onBubbleClick={props.onBubbleClick}
            tracking={props.tracking}
            type = {props.type}
            categoryTray = {props.categoryTray}
        />
    );
    let isFirefox = navigator.userAgent.indexOf("FireFox") > -1;
    let EcomTrue = window.location && window.location.search && window.location.search == "?shopnow=1" ? true:false;
    return (
        props.categoryTray ? <div id="CatDiv" className={`bgw df pdl6 por ${EcomTrue?"pdt6":"pdt4"} oAuto${props.filtericon?"":" pdb4"}`}>
            <div id = "Filtertray" className="wnr oAuto">
                {categoriesSelectedView}
                {categoriesView}
            </div>
        </div>
        :
        <div id = "IsqFilterTray" className={`bgw wnr ${props.categoriesData.length ==0 ? "": "oAuto"} pd4008 pdb4`}>     
                    {categoriesSelectedView}
                    {categoriesView}
                </div>
        );
};

export default CategoriesFilterView;
