export function  validationCheck(inlISQ, qtyUnit, errorQty, otherPop, errorQtyMcat, selOpt){
    let qty =  inlISQ ? inlISQ.value : "";
    let qtyUnt = qtyUnit ? (qtyUnit.value != '' ? qtyUnit.value : selOpt && selOpt.getAttribute('optionsdesc')) : '';
    let qtyOther = otherPop && otherPop.style.display == 'block' ? otherPop.value : '';
    let errQty='';
    if ((qty !== "") && (qtyUnt === "")) {
        errQty = "Please select a unit";
        errorQty.innerHTML = errQty;
    } 
    else if((qty !== "") && (qtyUnt == "Other" && otherPop && otherPop.value == "")) {
        errQty = "Please enter a unit";
        errorQty.innerHTML = errQty;
    }
    else if ((qtyUnt == "Other") && (qty === "")) {
        errQty = "Please enter quantity";
        errorQtyMcat.innerHTML = errQty;
        if((qtyUnt == "Other" && otherPop && otherPop.value == "")){
            errQty = "Please enter a unit";
            errorQty.innerHTML = errQty;
        }
    }
    else {
        if (qty != "") {
            let pattern = /^\d+$/;
            let validUnit = /^[a-zA-Z]+[' -]*[a-zA-Z.' ]*(\([a-zA-Z .]+\))*$/;
            if (!pattern.test(qty)) {
                errQty = "Enter numeric value only";
            }
            if (!qtyOther.match(validUnit) && (qtyUnt == "Other")) {
                errQty = "Enter a valid quantity unit";
            }
            if(parseInt(qty) === parseInt("0")){
                errQty= "Quantity cannot be zero";
            }
            errorQtyMcat.innerHTML = errQty;
        }
    }
    return errQty;
}

export function handleQntChange(event, pbrCount) {
    document.getElementById("errQtyInlMcat"+pbrCount) ? document.getElementById("errQtyInlMcat"+pbrCount).innerHTML = '' : '';
    document.getElementById("errQtyUnitInlMcat"+pbrCount) ? document.getElementById("errQtyUnitInlMcat"+pbrCount).innerHTML = '' : '';
}
export function handleChange(event, errorQty, otherPop) {
    errorQty ?  errorQty.innerHTML = '' : '';
    let param = event;
    let ele1 = otherPop;
    if(param == "other" || param == "Other"){
        if(ele1 && ele1.style.display == "none"){
            ele1.style.display = "block";
        }
    }
    else if(ele1 && ele1.style.display != "none"){
        ele1.style.display = "none";
    }
}