import React from 'react';
import Footer from '../App/components/Footer';
import "./css/errors.css";
import {errorJSON} from './helper';
export default class TimeoutView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLoader: true };
    }
    componentWillUnmount() {
        delete window.clickedFromRelatedProduct;
    }
    render() {
        if (!this.state.showLoader && this.props.pageError) {
            document.getElementById("gblLoader")&&document.getElementById("gblLoader").style&&document.getElementById("gblLoader").style.display?document.getElementById("gblLoader").style.display = "none":'';

        }
        else
        {
            document.getElementById("gblLoader")&&document.getElementById("gblLoader").style&&document.getElementById("gblLoader").style.display?document.getElementById("gblLoader").style.display = "block":'';

        }
        let lsURLdata = localStorage.getItem("PDP404URL") ? JSON.parse(localStorage.getItem("PDP404URL")) : "";
        let prevPage = lsURLdata ? lsURLdata.previousPageURL : "";
        let currPage = lsURLdata ? lsURLdata.currentPageURL : "";
        let prevPagePDP = prevPage && currPage && prevPage.includes("proddetail") && currPage.includes("proddetail") && prevPage!=currPage && !window.clickedFromRelatedProduct? true : false;
        this.props.pageType=="PDP" && (this.props.isIntermediateScreenVisible || prevPagePDP || window.clickedFromRelatedProduct)  ?  "" :document.getElementById('root').classList.remove("bgef");
        if (this.props.pageError) {
            let data = errorJSON[this.props.pageError];
            let errorFlag = false;
            let styleVal = {height:window.innerHeight-295+"px"};
            if(this.props.pageType=="PDP" && (this.props.isIntermediateScreenVisible || prevPagePDP)) {
                errorFlag = true;
                styleVal.display = "none";
                document.getElementById("pdpSpinner") ? document.getElementById("pdpSpinner").style.display="none" : ""
            }
            return (<>
                <div style={styleVal} className={this.state.showLoader?"vh":"bgw tempFtrHndlng mt30 tc pr"}>
                    <div className="verticalCenter">
                    <picture className={this.props.pageError=="timeout"?"mr50":""}>
                        <source srcset={data.imgUrl.webp} type="image/webp" />
                        <img onError={() => { this.setState({ showLoader: false }) }} onLoad={() => { this.setState({ showLoader: false }) }} src={data.imgUrl.jpg} />
                    </picture>
                    <div className="tc fw fs20"> {data.heading} </div>
                    <p className="maEr w80 tc subHeading pdt13"> {data.subHeading} </p>
                    <a onClick={data.onAction} className="w100  pdb100 bgw pr db" ><button className="clrw tp24 w80 maEr fw poa l0 r0 w60 tryAgnBtn"> {data.buttonText} </button></a>
                    </div>
                </div>

              {!this.state.showLoader && !errorFlag ?<Footer pageStatus="bad" />:''}  
                {(this.props.isIntermediateScreenVisible || prevPagePDP) && errorFlag ? <span class="pf dtc vam slownetpop pd15">An error occurred. Please refresh the page.</span> : ""} 


            </>)

        }
        else {
            return (<></>)
        }
    }
    componentWillUnmount() {
        this.props.resetErrorState();
    }
}