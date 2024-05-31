
export function checkEnquirySent(dispId) {      
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
export function callObj(product,mcatId, mcatName, tracking, isqTracking, lastgadigit, productIndex, utmText) {
        let data ={};
        data.callTxt= "कॉल करें",
        data.image= product.imgUrl,
        data.tsCode= product.tsCode,
        data.companyName= product.companyName,
        data.contactNumber= product.companyContactNo,
        data.contactType= product.companyContactVal,
        data.glusrID=product.glid,
        data.modrefid= product.displayId,
        data.modrefname= product.extraPrdName,
        data.query_ref_id=mcatId,
        data.query_ref_type= mcatName,
        data.dbpagetrack= `${tracking.pageType}${isqTracking?"-ISQ":""}${lastgadigit%2==0?"|G-Ev":"|G-Od"}|pos-1-${productIndex}|L-${tracking.lang.split("Lang")[1]}${utmText?utmText:""}|`,
        data.eventLabel= "mcat",
        data.custTypeWeight=product.custTypeWeight,
        data.PAID_TYPE = product.custTypeWeight <= 699 ? "PAID" : "FREE"  
        return data
}
export function enqform(product,mcatId, catId, mcatName, tracking, isqTracking, lastgadigit, productIndex, utmText,showModal,ctaName) {
    let data ={};
        data.isEnquiry = true;
        data.mcatId = mcatId,
        data.catId = catId,
        data.receiverUserId= product.glid ? product.glid.toString():'',
        data.displayId ="" + product.displayId,
        data.productImage= product.imgUrl ? product.imgUrl : "https://m.imimg.com/gifs/img/prod-img.png",
        data.companyName= product.companyName,
        data.city= product.city,
        data.page = tracking.pageType + (isqTracking?"-ISQ":""),
        data.callTxt = "कॉल करें",
        data.tsCode= product.tsCode,
        data.contactNumber= product.companyContactNo,
        data.image = product.imgUrl ? product.imgUrl : "https://m.imimg.com/gifs/img/prod-img.png",
        data.productName= product.productName,
        data.contactType= product.companyContactVal,
        data.glusrID=product.glid,
        data.modrefid= product.displayId,
        data.modrefname= product.extraPrdName,
        data.query_ref_id=mcatId,
        data.query_ref_type= mcatName,
        data.dbpagetrack= `${tracking.pageType}${isqTracking?"-ISQ":""}${lastgadigit%2==0?"|G-Ev":"|G-Od"}|pos-1-${productIndex}|L-${tracking.lang.split("Lang")[1]}${utmText?utmText:""}|`,
        data.eventLabel= "mcat",
        data.custTypeWeight=product.custTypeWeight,
        data.PAID_TYPE = product.custTypeWeight <= 699 ? "PAID" : "FREE",
        data.ctaName= ctaName,
        data.widgetType="Listing",
        data.adultFlag = product.adultFlag,
        data.queryText= `${tracking.pageType}${isqTracking?"-ISQ":""}-product-overlay-GetBestPrice${lastgadigit%2==0?"|G-Ev":"|G-Od"}|pos-1-${productIndex}|L-${tracking.lang.split("Lang")[1]}${utmText?utmText:""}`,
       //whatsappLogin: window.location.href && window.location.href.includes('waId') && props.checkUserStatus == 0 ? true : false,
        showModal(data);
}