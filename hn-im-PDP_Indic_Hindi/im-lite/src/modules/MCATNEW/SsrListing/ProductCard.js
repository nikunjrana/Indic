import React, { PureComponent } from "react";
import PriceCta from "../utility/PriceCta";
import CtaComponent from "../utility/CtaComponent";

class ProductCard extends PureComponent {
  constructor(props) {
    // console.log(props, "Props in product cards");
    super(props);
    this.imgDiv = this.imgDiv.bind(this);
    this.productIsqDiv = this.productIsqDiv.bind(this);
  }
  imgDiv(urlType, redirectionURL, imgUrl_250, newdisplayName, display_name, index) {
    if (urlType == "MINIPDP") return <img id={`prod_${index}`} src={imgUrl_250} className="mxht150 mxw150 objctFitSclDown" alt={newdisplayName ? newdisplayName : display_name} />;
    else { return (<a href={redirectionURL}><img id={`prod_${index}`} src={imgUrl_250} className="mxht150 mxw150 objctFitSclDown" alt={newdisplayName ? newdisplayName : display_name} /></a>) }
  }
  productIsqDiv(productIsqData, redirectionURL) {
    let isqDiv = productIsqData.map((isq, index) => {
      if (index < 4) return <p id={`ISQ_${index}`} key={index} className="pd1_0 clr5e fwn fs13 lineClamp2"> <a href={redirectionURL} className="clr5e"><b>{isq.MASTER_DESC}</b>: {isq.OPTIONS_DESC}</a></p>
    })
    return isqDiv
  }
  render() {
    return (<>
      {/* {this.props.index==2?<div id={`autofetchcalling1`}></div>:""} */}
      <li id={`prod_${this.props.index}`} name={`list_1_${this.props.index}`} className="lsnone pdr5 pdt10 bgw mb1 bxsdw mcatUnique pdl5 pdb20">
        <div><a href={this.props.redirectionURL}><h2 className="fwn lh24 oh clrBl fs16 maxh80 lineClamp4 ellipse">{this.props.product.pcItemDisplayName ? this.props.product.pcItemDisplayName : this.props.display_name}</h2></a>{this.props.productSecondaryName ? <a className="wr oh lineClamp2 fs14 fw clgrey">{this.props.productSecondaryName} </a> : ''}</div>
        <div className="df w100 mt10"> <div className="ht150px w150p imgDiv flx tc centerItems mauto">{this.imgDiv(this.props.URLtype, this.props.redirectionURL, this.props.imgUrl_250, this.props.newdisplayName, this.props.display_name, this.props.index)}</div> <div className="w100 oh ml15">
          <PriceCta product={this.props.product} showModal={''} mcatId={this.props.mcatid} mcatName={this.props.mcatName} catId={this.props.catid} productIndex={this.props.index} listNumber={"1"} utmText={''} tracking={''} lastgadigit={''} usermode={''} vernacularData={''} checkUserStatus={''} isqTracking={''} />
          {this.productIsqDiv(this.props.prd_isq, this.props.redirectionURL)}
          <div className="clr33 fs13 por oh mt5 whNr pdb7 db" ><i className={`mcatIcon wh15 mr5 poa lft0 tp4 tseaIco`}></i><h3 className="fw fs14 truncateH notranslate pdl20">{this.props.companyName}</h3></div>
        {
          this.props.sellerlocation ? <span className="clr5a truncateH por oh pdb5 pdl20 db ctIco fs13"> {this.props.sellerlocation}</span> : ''
        }  
          </div></div>
        
        <CtaComponent pdpurl={this.props.redirectionURL} companyName={this.props.companyName ? this.props.companyName : ''} productname={this.props.display_name ? this.props.display_name : ''} product={this.props.product} showModal={''} mcatId={this.props.mcatid} mcatName={this.props.mcatName} catId={this.props.catid} productIndex={this.props.index} listNumber={"1"} utmText={''} tracking={''} lastgadigit={''} usermode={''} vernacularData={''} checkUserStatus={''} isqTracking={''} callNowClick={''} />
      </li></>
    )
  }
}

export default ProductCard