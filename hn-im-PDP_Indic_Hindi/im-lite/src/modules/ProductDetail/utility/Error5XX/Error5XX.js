import React from 'react'
import Footer from '../../../App/container/FooterContainer';
// import '../../../App/styles/index.css'
import  "../Error404/Error404.css"  ;
export default function Error5XX(props) {
    return (
        <div class="bgw">
            <div className="tc pd10 fw bxrd4" id="page_5xx"><div className="fs16 clr33 fwn">Site is under maintenance, please check after sometime.</div></div>
            {/* <Footer pageStatus="bad" /> */}
        </div>
    )
}