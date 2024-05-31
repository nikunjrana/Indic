export const  getPriceWithoutCurrency = (fobprice) => {
    fobprice = fobprice.toFixed(2);
    if (fobprice > 100000) {
        fobprice = fobprice / 100000;
        fobprice = fobprice.toFixed(2);
        fobprice = fobprice.toString() + " Lakh";
    }
    else {
        let newprice = fobprice.toString().split('.');
        let num = 0;
        let dec = 0;
        if (newprice[0])
            num = parseInt(newprice[0]);
        if (newprice[1]) {
            dec = parseInt(newprice[1]);
        }
        if (num > 1000 && num % 1000 == 0)
            fobprice = Math.floor((num / 1000)).toString() + ',' + '000';
        else if (num > 1000)
            fobprice = Math.floor((num / 1000)).toString() + ',' + (num % 1000).toString().padStart(3, "0");
        else
            fobprice = num.toString();
        if (dec != 0)
            fobprice = fobprice + '.' + dec.toString();

    }
    return fobprice;
}
export const checkEnquirySentRelated=(dispId) =>{
        
    let lsData=JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
        localStorage.removeItem("imEqGl");
        lsData="";
    }
    var e = lsData ? lsData['displayId'] : "undef";
    if (e) {
        var dispIds = e.split(",");
        return dispIds.includes(dispId+'');
    }
    else
        return false;
}