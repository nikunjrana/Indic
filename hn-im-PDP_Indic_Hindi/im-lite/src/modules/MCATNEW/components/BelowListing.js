import React from 'react';
import RecommendedProductsContainer from "../../Widgets/Personalisation/RecommendedProducts/RecommendedProductsContainer";

const BelowListing = React.memo((props) =>{
    let pageTypeTracking = props.data.tracking.pageType;
    let unidentified = props.getCookieValByKey("ImeshVisitor", "glid") ? true : false;
    return(
        <div>
         <RecommendedProductsContainer
                  view="RPMcatCompanyView"
                  count="20"
                  translatedText={props.vernacularData}
                  trck_param={unidentified ? "u_" : ""}
                  enqLabel={props.vernacularData != undefined ? props.vernacularData.HEADER_BTN_4 : "Send Enquiry"}
                  head={props.vernacularData != undefined ? props.vernacularData.WID_RECENT_HEADING1 : "आपके लिए प्रोडक्ट्स"}
                  niHit ={true}
                  page={pageTypeTracking}
                  queryText={`${pageTypeTracking}-rcv-${unidentified ? "U" : "I"}|P|${props.data.tracking.lang}`}
                  callTxt={`${pageTypeTracking}-recently-viewed|${props.data.tracking.lang}`}
                  glLastDigit={props.glLastDigit}
                  unidentified={unidentified}/>
          </div>)})

export default BelowListing;