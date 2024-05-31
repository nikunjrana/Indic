import React, { useState,useEffect } from 'react';
import { modifyImgSrc,getMobileNum, generateUniqueKey } from '../utility/helper';
import CallCta from './CallCta';
import { getLastSeen } from '../utility/ServiceHandler/fetchProductDetail';
import { eventTracking } from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';

function CompanyInformation(props) {
    let [isFullyloggedin, setisFullyloggedin] = useState(0);
    let [lastSeenStatus,setLastSeenStatus]=useState('')
    let companyLogo=props.data.GLUSR_USR_LOGO_IMG ? modifyImgSrc(props.data.GLUSR_USR_LOGO_IMG) : 'https://m.imimg.com/gifs/img/cIcon.png';
    let CompanyName=props.data.COMPANYNAME?props.data.COMPANYNAME:'';
    let locationArray =[props.data.LOCALITY, props.data.CITY, props.data.GLUSR_USR_DISTRICT , props.data.GLUSR_USR_STATE];
    locationArray = locationArray.filter(function(item, pos) {return (item && locationArray.indexOf(item) == pos);})
    let SELLER_LOCALITY= locationArray.join(', ');
    let GST_NO = props.data["Statutory_Profile"] && props.data["Statutory_Profile"].length>0 ? getGST(props.data["Statutory_Profile"]) : "";
    let SELLER_RATING = props.data.SELLER_RATING  && props.data.SELLER_RATING > 0 ? props.data.SELLER_RATING : "";
    let PNS_RATIO = props.data['PNS_RATIO'] ? Math.round(props.data['PNS_RATIO']) : '';
    let video_link = props.data['GLUSR_PROFILE_MEDIA_URL'] ? props.data['GLUSR_PROFILE_MEDIA_URL'] : '';
    let YT_ICON = video_link && getVidId(video_link) ? true : false;
    let CONTACT = getMobileNum(props.data);
    let CONTACT_NUMBER = CONTACT && CONTACT.num ? CONTACT.num : '';
    let compFLName = props.data.companylink;
    // let TRANSFORMED_NO = TransformContactNumber(CONTACT_NUMBER);
    let isOutOfStock = props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
    let isEcom= props.data.PC_ITEM_IS_ECOM? props.data.PC_ITEM_IS_ECOM:'',
    isEcomURL= props.data.ECOM_CART_URL ? props.data.ECOM_CART_URL : props.data.ECOM_ITEM_LANDING_URL? props.data.ECOM_ITEM_LANDING_URL:'',
    isEcomStoreFlag= props.data.ECOM_STORE_ENABLE_FLAG? props.data.ECOM_STORE_ENABLE_FLAG:'';
    let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));

    useEffect(() => {
        getOnlinePresence(props.data.GLUSR_USR_ID)
        setisFullyloggedin(checkUserStatus()==2)
    },[])


        function getOnlinePresence(gluserid) {
        if(gluserid && sessionStorage && sessionStorage.getItem("LastSeenData") && sessionStorage.getItem("gluserid")==gluserid)
        {
           let result = JSON.parse(sessionStorage.getItem("LastSeenData"));
           if (result.Response && (result.Response.Code == "200" || result.Response.Code == "204") && result.Response.Data && result.Response.Data["latest_activity_data"].length>0){
            setLastSeenStatus(result.Response.Data["latest_activity_data"][0]);
            if(result.Response.Data["latest_activity_data"][0]["LastSeen"] === "Online") {
                eventTracking("Product-Page-Clicks","Seller Online",gluserid,false);
            }
            
        }
        }
        else if(gluserid) {
            getLastSeen(gluserid).then((res) => {
                if(res.response) {
                    let result = res.response;
                    sessionStorage && (sessionStorage.setItem("LastSeenData",JSON.stringify(result)) , sessionStorage.setItem("gluserid",gluserid));
                    if (result.Response && (result.Response.Code == "200" || result.Response.Code == "204") && result.Response.Data && result.Response.Data["latest_activity_data"].length>0){
                        setLastSeenStatus(result.Response.Data["latest_activity_data"][0]);
                        if(result.Response.Data["latest_activity_data"][0]["LastSeen"] === "Online") {
                            eventTracking("Product-Page-Clicks","Seller Online",gluserid,false);
                        }
                    }
                }
            }, 
            (error) => {
                //error block reached
            });
        }
    }
    function getVidId(mediaUrl){
        let videoId = '',
            video_link = mediaUrl;
        if (/watch\?v\=/.test(video_link)) {
            videoId = video_link.substr(video_link.indexOf('=') + 1, 11);
        }
        else if (/time_continue\=/.test(video_link)) {
            videoId = video_link.substr(video_link.indexOf('=',video_link.indexOf('=') + 1 ) + 1, 11);
        }
        else if (/\/\/youtu.be/.test(video_link)) {
            videoId = video_link.substr(video_link.indexOf('/') + 11)
        } 
        else {
            if (/embed\//.test(video_link)) {
                videoId = video_link.substr(video_link.indexOf('/') + 1, 11)
            }
           
        } return videoId;
    }
    // function TransformContactNumber (contactNo) {
    //     let updatedNo = mobileNumber(contactNo);
    //     if(updatedNo){
    //         updatedNo = updatedNo.indexOf(',') > -1 ? updatedNo.split(',')[0] : updatedNo;
    //         updatedNo = "+91-" + updatedNo
    //         return updatedNo;
    //     }
    //     return "";
    // }
    // function mobileNumber (no) {
    //     if(no && Array.isArray(no)){
    //         return updateNo(no[0])
    //     }
    //     else if(no){
    //        return updateNo(no)
    //     }
    // }
    // function updateNo (no) {
    //     let updatedNo ="";
    //     let no1 =false;
    //     if(no.includes("+91")) {
    //         no1 = true;
    //     } 
    //     no=no.replace(/[+]/g, '');
    //         if (no.length == 12) {
    //             updatedNo = no.slice(2, 13);
    //         } else if (no.indexOf(' ') > -1) {
    //             updatedNo = no.split(" ")[1];
    //         } else if(no.indexOf('-')>-1){
    //             updatedNo = no.split("-")[1];
    //         }
    //         else if(no1 && no.includes(",")){
    //             updatedNo = no.slice(2, no.length);
    //         }
    //         else {
    //             updatedNo = no;
    //         }
    //         return updatedNo;
    // }
    function getGST(statData){
        let gst =  statData.filter((item)=>{
            if(item.TITLE==='GST No.' && item.DATA != '')
            return item;
        });
        return gst.length>0 &&  gst[0] && gst[0].DATA ? gst[0].DATA : "";
    }
    function companyDivInner(name, class1, class2) {
        if(name) {
            return(
                <div className={`${class1}`}><i className={`${class2}`}></i>{name}</div>
        )
        }
        return ``
    }
    function catToTop() {
        eventTracking("Product-Page-Clicks", "Company-Card", "Company-Name", true)
        let catgryPC_CLNT_FLNAME = props.data.PC_CLNT_FLNAME;
        if (props.data.companylink != '' && catgryPC_CLNT_FLNAME && catgryPC_CLNT_FLNAME != 'new-items.html' && catgryPC_CLNT_FLNAME != 'other-services.html' && catgryPC_CLNT_FLNAME != 'other-products.html') {
            let catparams = {};
            catparams.conditional_flag = 'fortopcat';
            catparams.brd_mcat_id = props.data.BRD_MCAT_ID;
            catparams.category = props.data.PC_CLNT_FLNAME;
            catparams.displayid = props.data.PC_ITEM_DISPLAY_ID;
            catparams.company = props.data.companylink;
            catparams.cat_name = props.data.PCAT_NAME;
            let catData = "conditional_flag=" + catparams.conditional_flag + "|" + "brd_mcat_id=" + catparams.brd_mcat_id + "|" + "category=" + catparams.category + "|" + "displayid=" + catparams.displayid + "|" + "company=" + catparams.company
                + "|" + "cat_name=" + catparams.cat_name;
            localStorage.setItem("cattoBrowsed", catData);
        }
    }
    function ratingDiv(sellerRating) {
        if(sellerRating) {
            return(
            <div className="fs12 fw">
            <i className="wh15 dib mr5 fl bgNorepeat starSvg"></i>
            <b>{sellerRating}</b><span className="fwn"> /5</span>
            </div>)
        }
        return ``
    }
    function getVerificationSealItem(custtypeWeight, etoOfferCode){
        let sellerbadge = [];
        if (etoOfferCode) {
            sellerbadge.push(<div key={generateUniqueKey()} className="w35 fw fs12 clr5a lh18  mt5 mb5 mr5 "><span className="wh15 dib mr5 fl trustSealSvg bgNorepeat"></span>Trustseal Verified</div>);
        }
        if (custtypeWeight && custtypeWeight >= 200 && custtypeWeight <= 699 && etoOfferCode == '') {
            sellerbadge.push(<div key={generateUniqueKey()} className="fs12 fw w35 clr5a lh18 mt5 mb5 mr5 "><span className="wh15 dib mr5 fl verifiedSvg bgNorepeat"></span>Verified Plus Supplier</div>);
        }
        if (custtypeWeight && custtypeWeight > 699 && custtypeWeight <= 1400 && custtypeWeight != 750 && etoOfferCode == '') {
            sellerbadge.push(<div key={generateUniqueKey()} className="fs12 fw w35 clr5a lh18 mt5 mb5 mr5 "><span className="wh15 dib mr5 fl verifiedSvgGr bgNorepeat"></span>Verified Supplier</div>);
        }
        return sellerbadge;
    }
    function clickHandler(){
        document.getElementById('isAbtSeller')? document.getElementById('isAbtSeller').scrollIntoView({behavior: 'smooth'}):''
    }
    function pnsDiv(pnsRatio) {
        if(pnsRatio) {
            return(<div className="clr5a fw mt7 mb5 fs12 ">
            <i className="wh15 dib mr5 fl bgNorepeat callIconSvg"></i>
            <span className="fw">
            {pnsRatio}%</span> Response rate 
        </div>)
        }
        return ``
    }
    return(
        <section id="Companyinfo" className="w100 mt3 por">
            <div className="bgw">
                <div>
                    <p className="db fs15 clrb pd10 fw  ">कंपनी की जानकारी</p>
                    <div className="db">
                        <div>
                            <div className="fs15">
                                <section className="w100">
                                    <div className="pdl10 pdr10 pdt5 ">
                                        <div className="por mt5 mb5">
                                            <div className="poa ml10 mt53 dib">
                                            
                                            </div>
                                        <div className="bdrC poa oh hw50 bxrd10">
                                            <img src={companyLogo} alt={CompanyName} className="mxhw imgCnt poa" />
                                        </div>
                                        <div className="pdp">
                                            <div>
                                            {props.isCSR&&props.linkTag?<props.linkTag onClick={catToTop} to={'https://m.indiamart.com/' + compFLName}className="fs15 clrBl por vam fw di">{CompanyName}</props.linkTag>:<a onClick={catToTop} href={'https://m.indiamart.com/' + compFLName}className="fs15 clrBl por vam fw di">{CompanyName}</a>}</div>
                                            {companyDivInner(SELLER_LOCALITY, "clr33 mt5 mb5 fs13 mlm2", "wh13 dib mr2 fl bgNorepeat locationSvg")}
                                            {GST_NO ? companyDivInner('GST-' + GST_NO, "fs13 mb5  mt5 clr33", "wh13 dib mr2 fl bgNorepeat gstIcon") : ""}
                                            <p className='mxht1000 blankULSen1'>{lastSeenStatus && lastSeenStatus["LastSeen"] ? <div class="fs13 mt5 clr33"><span class={"dib vam "+(lastSeenStatus["LastSeen"]=="Online" ? "onlineDot":"offlineDot")}>&#8226;</span> {lastSeenStatus["LastSeen"]}</div>: ''}</p>
                                        </div>
                                        { E_COM_PROD && isEcomURL && !isOutOfStock ?"":<div id='companyCardCall'><CallCta data={props.data} transformedNo={props.transformedNo} displayPopup={props.displayPopup} callProps={props.callProps} eventLabel={"PDP_Company_Info"}/></div>}

                                    </div>
                            </div>
                            <div className="algnCenter bglghtBlue crb dflex jcse pdb5 pdl10 pdt5">
                            {getVerificationSealItem(props.data.GLUSR_USR_CUSTTYPE_WEIGHT, props.data.ETO_OFR_COMPANY_TSCODE)}
                                {ratingDiv(SELLER_RATING)}
                                {pnsDiv(PNS_RATIO)}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
)
}

export default CompanyInformation;