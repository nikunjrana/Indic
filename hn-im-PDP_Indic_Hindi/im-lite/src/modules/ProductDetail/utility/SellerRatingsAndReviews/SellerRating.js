import React, {useState} from 'react'
import './SellerRatingsReviews.css';
import { goToRoute } from '../../../../Globals/GlobalFunc';
import { getCookie } from '../../../../Globals/CookieManager';
import SellerReview from './SellerReview';
import { eventTracking } from '../../../../Globals/GaTracking';
import { checkUserStatus } from '../../../../Globals/MainFunctions';

export default function SellerRating (props) {
        
        let pdpData =  this.props? this.props.data? this.props.data.serviceData? this.props.data.serviceData:'':'':'';
        let PDPdata =  pdpData? pdpData:'';
        let slrRating =  PDPdata? PDPdata.SELLER_RATING? PDPdata.SELLER_RATING:'':'';
        let suplrRating =  PDPdata? PDPdata.SUPPLIER_RATING? PDPdata.SUPPLIER_RATING:'':'';
        let overAllRating =  suplrRating? suplrRating.OVERALL_RATING? suplrRating.OVERALL_RATING:slrRating?slrRating:'':'';
        let totalRating =  suplrRating? suplrRating.TOTAL_RATINGS_COUNT? suplrRating.TOTAL_RATINGS_COUNT:'':'';
        let rtDtls =  PDPdata? PDPdata.RATING_DETAILS? PDPdata.RATING_DETAILS:'':'';
        let rtInfluParam =  PDPdata? PDPdata.RATING_INFLU_PARAM? PDPdata.RATING_INFLU_PARAM:'':'';
        let rtDtlsLength =  rtDtls? rtDtls.length:'';
        let rtInfluParamLength =  rtInfluParam? rtInfluParam.length:'';
        let slrGlUserId=  PDPdata? PDPdata.GLUSR_USR_ID? PDPdata.GLUSR_USR_ID:'':'';
        let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
        let Imesh = getCookie('ImeshVisitor');
        let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
        let status = checkUserStatus();
        let identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");


        //console.log('PDPdata', PDPdata)

        let ratingChartDivv = [];
        let ratingChartt = (starcount, totalcount, starvalue) => {
        let linelengthh = (starcount / totalcount) * 100;
            ratingChartDivv.push(
                    <div className="fdfx falg pdb10">
                        <div className="side fs12">
                            {starvalue}
                        </div>
                        <span className="outer_bar">
                        <span className="barG" style={`width:${linelengthh}%`}>
                        </span>
                        </span>
                        <div className="side fs12">
                            {starcount}
                        </div>
                    </div>
                );
        }
        if (pdpData) {
            { ratingChartt(suplrRating.NO_OF_5_STARS, totalRating, "5 star") }
            { ratingChartt(suplrRating.NO_OF_4_STARS, totalRating, "4 star") }
            { ratingChartt(suplrRating.NO_OF_3_STARS, totalRating, "3 star") }
            { ratingChartt(suplrRating.NO_OF_2_STARS, totalRating, "2 star") }
            { ratingChartt(suplrRating.NO_OF_1_STARS, totalRating, "1 star") }
        }

        let RatingHead = slrRating > 0 ? (<div className="rtbdr pdt15 pdb10 pdl10 pdr10">
                    <div className=" fdfx falg mb15">
                        <span ><span className="fw fs25">{overAllRating}</span><span>/5 </span></span>
                        <span className=" ml15 str f20 por">
                            <span className="dskstr " style={`width: ${overAllRating*20}%`}>★★★★★</span>
                            <span className="FM_emsRt">★★★★★</span>
                        </span>
                        <span className=" fs12 c3 mla"> Reviewed by {totalRating} Users</span>
                    </div>
                    {ratingChartDivv}
                </div>):'';

        // Complete User Satisfation Starts
        let userSatisfactionDivv = [];
        let count =0;
        if(rtInfluParam && rtInfluParam.Delivery){count+=1;}
        if(rtInfluParam && rtInfluParam.Quality){count+=1;}
        if(rtInfluParam && rtInfluParam.Response){count+=1;}
        let userSatisfactionChartt = (userperc, uservalue) => {
            let circledeg = userperc < 50 ? "" : " over50";
            let perRotation = userperc*3.6;
            if (userperc > 0) {
                userSatisfactionDivv.push(
                    <div class="w33 tc ">
                        <div class={`pgss-cirl ${circledeg}`} >
                            <span>{userperc}%</span>
                            <div class="lft-clip">
                                <div class="f50-bar"></div>
                                <div class="v-bar" style={`transform: rotate(${perRotation}deg);`}></div>
                            </div>
                        </div>
                        <p class="fs14"> {uservalue}</p>
                    </div>
                );
            }
            if((count-1)>0){
                userSatisfactionDivv.push(
                    <div className="slrbdr"></div>
                );
                count = count-1;
            }
        }
        if (pdpData) {
            rtInfluParam && rtInfluParam.Response ? userSatisfactionChartt(rtInfluParam.Response.split(',')[0], "Response") : '';
            rtInfluParam && rtInfluParam.Quality ? userSatisfactionChartt(rtInfluParam.Quality.split(',')[0], "Quality") : '';
            rtInfluParam && rtInfluParam.Delivery ? userSatisfactionChartt(rtInfluParam.Delivery.split(',')[0], "Delivery") : '';
        }
        let userSatisfactionSection = (<div class="rtbdr pdb15 pdt15 pdl10 pdr10">
            <div class="fs18 fw">User Satisfaction</div>
            <div class="fdfx pdt15">
                {userSatisfactionDivv}
            </div>
        </div>);
        // Complete User Satisfation Ends


        const[Listlimit]= useState(3);
        let ratingDisplay = [];
        if(rtDtls && rtDtlsLength!=0){
            rtDtls.forEach((element, index) => {
                if (index < Listlimit) {
                    ratingDisplay.push(<SellerReview element={element}  page={props.page}/>);
                }
            });
        }
        

        return (<div className="m5 oh"> 
            {RatingHead}
            {/* {rtInfluParam && rtInfluParamLength !=0 ? userSatisfactionSection:''} */}

            <div class="fs18 pdt15 pdl10 fw containerlr">
  <span>Customer Reviews ({totalRating})</span>
  <a href={"/" + pdpData.companylink}  class="fs14 pdl10 pdr10 "  onClick={(e)=>{e.preventDefault();eventTracking("Product-Page-Clicks","Rating&Review|PDPe","PDP_View_All_Review|"+identifyUserStatus,true);goToRoute("/" + PDPdata.companylink)}}>View More</a>
</div>            {ratingDisplay}
            {/* {(rtDtlsLength>3)?
            (multi_purpose && multi_purpose.userViewCount==5 && !Imesh) ? 
            (<a href={"/" + PDPdata.companylink+ "testimonial.html"} onClick={(e)=>{ e.preventDefault(); eventTracking("Product-Page-Clicks","Ratings-View-More",slrGlUserId,true); goToRoute("/" + PDPdata.companylink+ "testimonial.html")}}  className={(Listlimit < rtDtlsLength) ? "mt10 ma tc pdb5 pdt5 fs12 mb10 db" : "dn"}><button className="bgw c212 bdr212 bxrd4 pd10 w150">More reviews</button></a>) :
                (<a href={"/" + PDPdata.companylink+ "testimonial.html"} onClick={()=>{eventTracking("Product-Page-Clicks","Ratings-View-More",slrGlUserId,true)}}  className={(Listlimit < rtDtlsLength) ? "mt10 ma tc pdb5 pdt5 fs12 mb10 db" : "dn"}><button className="bgw c212 bdr212 bxrd4 pd10 w150">More reviews</button></a> 
                ):''} */}
        </div>);

}
 
