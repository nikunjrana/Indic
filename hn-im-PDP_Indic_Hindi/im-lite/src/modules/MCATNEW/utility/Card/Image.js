import React, { Component } from "react";
import { goToRoute } from "../../../../Globals/GlobalFunc";
import "../../CSS/image.css";
import mcatHelper from "../../utility/helper";
import { setCookie} from '../../../../Globals/CookieManager'; 
class Image extends Component {
  constructor(props) {
    super(props);
    this.imagePreloadedCheck = this.props.eventLabel && this.props.eventLabel.split("|")[0];
    this.imagePreloadedCheck = (this.imagePreloadedCheck == "Pg-1-1-1" || this.imagePreloadedCheck == "Pg-1-2-1" ||  this.imagePreloadedCheck == "Pg-1-3-1") ? true : false;
    this.imageClass = `ht150px w150p tc imgDiv flx centerItems mauto ${this.props.srcList?"":"bgimg"}`
  }
  createImage(){
    return <>{this.props.srcList && !this.props.srcList.includes("null") ?
           this.imagePreloadedCheck ? <img id={this.props.id} 
           className="mxht150 mxw150 objctFitSclDown" width="150" height="150" src={this.props.srcList} alt={this.props.name}/>
           :
            <img id={this.props.id} className="mxht150 mxw150 objctFitSclDown" width="150" height="150" src={this.props.srcList} alt={this.props.name} loading='lazy'/>
            :
            <span class="db ht150px w150p bgimg"></span>}</>
  }
  render() {
    let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
    let Imesh = this.props.getCookie('ImeshVisitor');
      return (
        this.props.urlType=="MINIPDP" ? <div className={this.imageClass} style={{ margin: "auto" }} onClick={()=>{this.props.openMiniPDP(this.props.data, this.props.id, this.props.eventLabel);
          this.props.eventTracking(this.props.tracking.click, "Product-Listing-Clicks-Product-Image", this.props.eventLabel, 1);}}>
          {this.createImage()}
          </div>
        :
        <div className={this.imageClass}
          style={{ margin: "auto" }}
          onClick={() => {
              window.__TransitionData__=this.props.data.product;
              window.__TransitionData__ ? window.__TransitionData__.imgUrl = this.props.srcList : '';
              window.__TransitionData__ ? window.__TransitionData__.prodType = this.props.prodType : '';
            this.props.eventTracking(this.props.tracking.click, "Product-Listing-Clicks-Product-Image", this.props.eventLabel, 1);
          }}
        > 
         {(multi_purpose && multi_purpose.userViewCount==5 && !Imesh) ?
         <a href={`/${this.props.url}`}  onClick={(e)=> {e.preventDefault(); goToRoute(`/${this.props.url}`)}}>
        {this.createImage()}
        </a>
        :
        <a href={`/${this.props.url}`}  onClick={(e)=> { setCookie("ImageData",mcatHelper.modifyImgSrc(this.props.srcList)); window.location.href = `/${this.props.url}`; e.preventDefault(); }}>
        {this.createImage()}
        </a>}
        </div>
      );
  }
}

export default Image;