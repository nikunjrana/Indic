import { modifyImgSrc } from "../../utility/helper";
import getData from "../../../../Globals/RequestsHandler/makeRequest";
import { imStore } from "../../../../store/imStore";
import { getCookieValByKey } from "../../../../Globals/CookieManager";

export function  validationCheck(){
    let company = window.pagename=='Company'?'Comp':'';
    let qty =  document.getElementById("qntInpInl"+company) ? document.getElementById("qntInpInl"+company).value : "";
    let qtyUnt = document.getElementById("qntUnitInpInl"+company) ? (document.getElementById("qntUnitInpInl"+company).value != '' ? document.getElementById("qntUnitInpInl"+company).value : document.getElementById("selectedOptInl"+company) && document.getElementById("selectedOptInl"+company).getAttribute('optionsdesc')) : '';
    let qtyOther = document.getElementById("otherPopupInl"+company) && document.getElementById("otherPopupInl"+company).style.display == 'block' ? document.getElementById("otherPopupInl"+company).value : '';
    let errQty='';
    if ((qty !== "") && (qtyUnt === "")) {
        errQty = "Please select a unit";
        document.getElementById("errQtyUnitInl"+company).innerHTML = errQty;
    } 
    else if((qty !== "") && (qtyUnt == "Other" && document.getElementById("otherPopupInl"+company) && document.getElementById("otherPopupInl"+company).value == "")) {
        errQty = "Please enter a unit";
        document.getElementById("errQtyUnitInl"+company).innerHTML = errQty;
    }
    else if ((qtyUnt == "Other") && (qty === "")) {
        errQty = "Please enter quantity";
        document.getElementById("errQtyInl"+company).innerHTML = errQty;
    }
    else {
        if (qty != "") {
            let pattern = /^\d+$/;
            let validUnit = /^[a-zA-Z]+[' -]*[a-zA-Z.']*(\([a-zA-Z .]+\))*$/;
            if (!pattern.test(qty)) {
                errQty = "Enter numeric value only";
            }
            if (!qtyOther.match(validUnit) && (qtyUnt == "Other")) {
                errQty = "Enter a valid quantity unit";
            }
            if(parseInt(qty) === parseInt("0")){
                errQty= "Quantity cannot be zero";
            }
            document.getElementById("errQtyInl"+company).innerHTML = errQty;
        }
    }
    return errQty;
}

export function handleQntChange(event) {
    let company = window.pagename && window.pagename=='Company'?'Comp':'';
    document.getElementById("errQtyInl"+company) ? document.getElementById("errQtyInl"+company).innerHTML = '' : '';
    document.getElementById("errQtyUnitInl"+company) ? document.getElementById("errQtyUnitInl"+company).innerHTML = '' : '';
}
export function handleChange(event) {
    let company = window.pagename && window.pagename=='Company'?'Comp':'';
    document.getElementById("errQtyUnitInl"+company) ? document.getElementById("errQtyUnitInl"+company).innerHTML = '' : '';
    let param = event;
    let ele1 = document.getElementById("otherPopupInl"+company);
    if(param == "other" || param == "Other"){
        if(ele1 && ele1.style.display == "none"){
            ele1.style.display = "block";
        }
    }
    else if(ele1 && ele1.style.display != "none"){
        ele1.style.display = "none";
    }
}

 export function getFirstImg(data) {
    let firstImg = '';
    if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') { firstImg = data.PC_IMG_SMALL_600X600 }
    else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { firstImg = data.PC_ITEM_IMG_SMALL }
    else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { firstImg = data.PC_IMG_SMALL_100X100 }
    else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { firstImg = data.GLUSR_USR_LOGO_IMG }
    else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';

    return modifyImgSrc(firstImg)
}

export function hitGetISQ(getISQData) {
    let lspref=localStorage.getItem("lspref")?JSON.parse(localStorage.getItem("lspref")):[];
        let getIsqISO=getCookieValByKey("ImeshVisitor",'iso'),productName ='',screen="";	
        if(getISQData.productName){	
            productName = getISQData.productName.replace("&",'and');	
        }	
        else{	
        productName=getISQData.productName;	
        }	
        let params={	
            mcatid:getISQData.enqMcatId,	
            product_name:productName,	
        }	
        	
        let serviceUrl='';	
        if(getISQData.enqMcatId){	
            serviceUrl='/ajaxrequest/enquirybl/getISQ?modid=IMOB&token=imobile@15061981&cat_type=3&isq_format=1&fixed_attr=1&encode=1&generic_flag=1&mcatid='+getISQData.enqMcatId+'&country_iso='+getIsqISO	
        }	
        else{	
            serviceUrl='/ajaxrequest/enquirybl/getISQ?modid=IMOB&token=imobile@15061981&cat_type=3&isq_format=1&fixed_attr=1&encode=1&generic_flag=1&prod_name='+params.product_name+'&country_iso='+getIsqISO	
        } 	
        return(	
            getData('GET', serviceUrl,params).then(	
                (result) => {	
                    if (result.statusText == 'ok' && result.response )	
                        {	
                            if(result.response.status=="empty" || result.response.status=="failed"){	
                                imStore.dispatch({type:'GET_ISQ_MBL',screen:"StaticISQ",quest:result.response});
                            }	
                            else {	
                                screen="ISQScreen";	
                                    for (var i = 0; i < lspref.length; i++) {	
                                        if (lspref[i].mcat == getISQData.enqMcatId) {	
                                            screen="ReqScreen";	
                                        }	
                                    }
                                    imStore.dispatch({type:'GET_ISQ_MBL',screen:screen,quest:result.response});	
                                }
                                // console.log("hihihi");	
                            return 	result.response;	
                        }	
                        else if(result && (result.status=='empty' || result.status=="failed" || result.status=='503' || result.statusText=='server-error')){	
                            imStore.dispatch({type:'GET_ISQ_MBL',screen:"StaticISQ",quest:''});	
                        }	
                }, (error) => {	
                    imStore.dispatch({ type: 'GET_ISQ_MBL', screen:"StaticISQ",quest:'',success: false })	
                })
        )	
}
