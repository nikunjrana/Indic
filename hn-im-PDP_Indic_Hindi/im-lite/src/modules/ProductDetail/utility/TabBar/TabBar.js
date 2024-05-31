import React from 'react';
import "../TabBar/TabBar.css";
import { eventTracking } from "../../../../Globals/GaTracking";
export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToElement = this.scrollToElement.bind(this);
    }


    scrollToElement(props) {
        eventTracking("Product-Page-Clicks", "MCATStrip_AnchorTab", 'AB_Test', true);

        const element = document.getElementById(props);
        const offset = 45;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element?element.getBoundingClientRect().top:"";
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }



    tabList() {

        return (<>
            <li id="detailsTab"><p className="tabBtn tabActive" onClick={() => { eventTracking("Product-Page-Clicks", "Anchor-tabs", 'Details', true); this.scrollToElement('attachedN') }}>Details</p></li>
            <li id="nearBySellersTab"><p className="tabBtn" onClick={() => { eventTracking("Product-Page-Clicks", "Anchor-tabs", 'More-sellers', true); this.scrollToElement('showMcatStrip') }}>Nearby Sellers</p></li>
            <li id="recommendedTab"><p className="tabBtn" onClick={() => { eventTracking("Product-Page-Clicks", "Anchor-tabs", 'Recommended', true); this.scrollToElement('prodsViewedSection') }}>Recommended</p></li>
        </>
        )
    }


    render() {
        return (
            <div id="stickyTabBarStrip" className="stickyTab">
                <ul className="tabNav">
                    {this.tabList()}
                </ul>
            </div>
        )
    }
}