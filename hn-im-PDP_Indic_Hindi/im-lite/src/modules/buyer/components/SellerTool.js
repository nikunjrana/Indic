import React , { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import styles from "../../../Globals/imageCss";

import {eventTracking} from '../../../Globals/GaTracking';

class SellerTool extends Component{
	constructor(props){
        super(props);
        
		
    }

	render(){
        return(
            <div>
               
            <div class="pd5 crx mt10 mb10 bgw bxdw2 tc fs15 lh20 fw">
        <div class="fs18 clr33 pd10 mrlr15">Expand Your Business</div>
        <a class="clrBl" href="/bl/" onClick={()=>{eventTracking('Home-Page-Clicks-PWA','Seller-Tools','Latest-BL',true);}} >
            <div class="fl w50">
                <div class="ht125px mb10 mt10">
                        <div class="dib pdt10 bxrd100 ht60p w60p bxdw2 mb10">
                            <i style={styles.imageCss().navSpri} class="ico-nav blIco_lg bs90 w40p ht40 dib"></i>
                        </div>
                    <p>Latest<br/>Buy Leads</p> 
                </div></div>
        </a>
        <a class="clrBl" href="/messages/" onClick={()=>{eventTracking('Home-Page-Clicks-PWA','Seller-Tools','Lead-Manager',true);}}>
            <div class="fl w50">
                <div class="ht125px mb10 mt10">
                        <div class="dib pdt10 bxrd100 ht60p w60p bxdw2 mb10">
                            <i style={styles.imageCss().navSpri} class="ico-nav myeqIco_lg bs90 w40p ht40 dib"></i>
                        </div>
                    <p>Lead<br/>Manager</p>
                </div></div>
        </a>
      
    </div>
   
    </div>
        )

	}
}


export default SellerTool