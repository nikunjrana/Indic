import '../../StandardProductPage/css/items.css';
import React from "react";

export const CallBtn6 = (props) =>{
 

    return(
        <div id={props.id} style={{display:"inline"}}  onClick={() =>{props.displayPopup()}}>
            <div className={"pdb10 pdt10 dib w45 tc fw" + (props.isABtst?' bdrmim bxrdNR clrmim':' compCl clrw bxrd4 ')}>
           <i className={props.page && props.page.includes("standardProd") ? "dib mr5 spriteSid callIcoSid vam" :"mim_bg btnset callIco strictIcon mr5 dib vam" + (props.isABtst? ' grnCalPst':'')}></i><span class="HEADER_BTN_1">{props.translatedText && props.translatedText.HEADER_BTN_1 ? props.translatedText.HEADER_BTN_1 : "कॉल करें"}</span>
           </div>
        </div>
    );
}