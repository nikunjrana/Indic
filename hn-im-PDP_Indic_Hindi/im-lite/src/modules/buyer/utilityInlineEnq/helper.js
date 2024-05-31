export function  validationCheck(){
    let company = window.pagename && window.pagename=='Company'?'Comp':'';
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