import React from 'react';

function SellerReview(props) {
    let ratingresponseValue = [];
    let monthArr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let monthName ="";
    let dateArr=props.element.GLUSR_RATING_DATE.split("-");
    for(let i=0;i<12;i++){
        if(dateArr[1]==(i+1)){
            monthName=monthArr[i];
            break;
        }
    }
    let fullDate = dateArr[0]+"-"+ monthName+"-"+ dateArr[2];

    let buyerDtl = (props.element.BUYER_NAME? <div class="fdfx pdt10"><div class="wh32 br100 fs15 fw mr15 tc">{props.element.BUYER_NAME.charAt(0)}</div>
        <div class="fs12 clrGry">
            <p> <b>{props.element.BUYER_NAME}</b>  </p>
            <p className="fs12 pdt2 clrGry">  {fullDate} </p>
        </div>
    </div>:'')

    let ratingsResponse =(heading,rating="Good")=>{
        if(rating == 'Good'){
            return (<div className="r_bx mr10 bxrd4 fs12 flx-gap">
                                {heading}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 10.5H9C9.415 10.5 9.77 10.25 9.92 9.89L11.43 6.365C11.475 6.25 11.5 6.13 11.5 6V5C11.5 4.45 11.05 4 10.5 4H7.345L7.82 1.715L7.835 1.555C7.835 1.35 7.75 1.16 7.615 1.025L7.085 0.5L3.79 3.795C3.61 3.975 3.5 4.225 3.5 4.5V9.5C3.5 10.05 3.95 10.5 4.5 10.5ZM4.5 4.5L6.67 2.33L6 5H10.5V6L9 9.5H4.5V4.5ZM0.5 4.5H2.5V10.5H0.5V4.5Z" fill="#0AA699" />
                                    <path d="M4.5 4.5L6.67 2.33L6 5H10.5V6L9 9.5H4.5V4.5Z" fill="#0AA699" />
                                </svg></div>);
        }
        else{
            return (<div className="r_bx mr10 bxrd4 fs12 flx-gap">
                                    {heading}
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 1.5H3C2.585 1.5 2.23 1.75 2.08 2.11L0.57 5.635C0.525 5.75 0.5 5.87 0.5 6V7C0.5 7.55 0.95 8 1.5 8H4.655L4.18 10.285L4.165 10.445C4.165 10.65 4.25 10.84 4.385 10.975L4.915 11.5L8.21 8.205C8.39 8.025 8.5 7.775 8.5 7.5V2.5C8.5 1.95 8.05 1.5 7.5 1.5ZM7.5 7.5L5.33 9.67L6 7H1.5V6L3 2.5H7.5V7.5ZM11.5 7.5H9.5V1.5H11.5V7.5Z" fill="#D34B3F" />
                                        <path d="M7.5 7.5L5.33 9.67L6 7H1.5V6L3 2.5H7.5V7.5Z" fill="#D34B3F" />
                                    </svg>
                                </div>);
        }
    }
    
    //Check Response, Quality and Delivery Condition
    if(props.element.RATING_INFLU_PARAMS_NAME && props.element.RATING_INFLU_PARAMS_NAME[1]){
        let params_1 = props.element.RATING_INFLU_PARAMS_NAME[1].split(',');
        let goodRating=[];
        params_1.forEach(element1=>{
            if(element1 =="Response"|| element1=="Quality"|| element1=="Delivery"){
                goodRating.push(element1);
            }
        });
        goodRating.sort();
        goodRating.reverse();
        let removeGoodDuplicate = [...new Set(goodRating)];
        ratingresponseValue.push(removeGoodDuplicate.map((r) => {
           return (ratingsResponse(r,"Good"))
        }));
    }
    
    if(props.element.RATING_INFLU_PARAMS_NAME && props.element.RATING_INFLU_PARAMS_NAME[0]){
        let params = props.element.RATING_INFLU_PARAMS_NAME[0].split(',');
        let badRating=[];
        params.forEach(element1=>{
            if(element1 =="Response"|| element1=="Quality"|| element1=="Delivery"){
                badRating.push(element1);
            }
        });
        badRating.sort();
        badRating.reverse();
        let removeBadDuplicate = [...new Set(badRating)];
        ratingresponseValue.push(removeBadDuplicate.map((r) => {
            return (ratingsResponse(r,"Bad"))
         }));
    }


    let buyerComment =(props.element.GLUSR_RATING_COMMENTS? <div className="pdt15 fs16 lh20 mnWd200x">{props.element.GLUSR_RATING_COMMENTS}</div>:'')

    return ( <div className="rtbdr pdb15 pdl10">
                <div className="fdfx pdt15">
                <div className={`${props.element.GLUSR_RATING_VALUE == 1 ? "clrR" : props.element.GLUSR_RATING_VALUE > 1 && props.element.GLUSR_RATING_VALUE < 4 ? "clrO" : "clrG"} fs12 bxrd8 flx-gap`}> <span> {props.element.GLUSR_RATING_VALUE}</span>
 
                <svg class="pdt2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12.181L12.944 15.153L11.636 9.547L16 5.777L10.247 5.285L8 0L5.753 5.285L0 5.777L4.364 9.547L3.056 15.153L8 12.181Z" fill="white"/>
                    </svg></div> 
                {ratingresponseValue}
                </div>

                {buyerComment}
                {buyerDtl}


        
        </div> );
}

export default SellerReview;