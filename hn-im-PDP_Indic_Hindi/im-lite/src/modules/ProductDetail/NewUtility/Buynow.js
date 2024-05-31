import React from 'react';
import { eventTracking } from '../../../Globals/GaTracking';

function Buynow(props) {
        let Data= props.data?props.data:'',
        Ecom_store_name= props.data && props.data.ECOM_STORE_NAME? props.data.ECOM_STORE_NAME:'',
        isEcomURL= Data&&Data.ECOM_CART_URL? Data.ECOM_CART_URL : Data && Data.ECOM_ITEM_LANDING_URL? Data.ECOM_ITEM_LANDING_URL:'',
        displayId= Data?Data.PC_ITEM_DISPLAY_ID? Data.PC_ITEM_DISPLAY_ID:'':'';
        let gl_id =Data.GLUSR_USR_ID?Data.GLUSR_USR_ID:"";

        function handleClick(ECOM_STORE_NAME,GLUSR_USR_ID){
            let eventAction =  this.props.eventAction ? this.props.eventAction :'Buy-Now';
            if (typeof window !== 'undefined') {
                eventTracking(`Product-Page-Clicks|Ecom_${ECOM_STORE_NAME}`, eventAction, GLUSR_USR_ID, true);
              } 
          };

    return (
        <div className="tc crx"><div id=""><a onClick={()=>handleClick(Ecom_store_name,gl_id)} href={isEcomURL} target="_blank"><button className="bgmim   tc bxrd20 fs14 clrw pdt10 pdb10 w100 fw"><i className="lockIcon"></i>Buy Now</button></a><p className="msg3rdParty tc pdt10">You will be redirected to a 3rd party webstore</p></div></div>
    );
}

export default Buynow;