import React,{PureComponent} from "react";

class InlineFilters extends PureComponent{
    constructor(props){
        super(props);
    }
render(){
 let nearme = this.props.iplockey ? <div id="nearMeDiv" className="nearmeCss filter"><span className="clrBl fw wnr pd7">Near Me</span></div>:""
  return (
    <li id="newInline" className="newFilter">
      {this.props.catData && this.props.catData.length>0?<section id="catInline" className="pdl5 por h205 pdt8 mb8">
          <p className="fs14 clrg fw600 pd40 mb5">Categories</p>
         <div className="pdb15 scWrap ht120">
            {this.props.catData.map((item,index) => {
              return (<a key={index} href={item.LINK} className="dib tc vat mr8 por ht120 bgw widgetBorder" >
              <div className="flx centerItems"><img src={item.IMAGE} alt={item.NAME} className="relatedimg70 vam objctFitSclDown" width="70" height="70" /></div>
              <div className="clr33 tc pdt4 fs12 lineClamp whNr lh1_3em">{item.NAME}</div></a>)})}
          </div>
      </section> : ""}
      {this.props.brandsdata && this.props.brandsdata.length>0 && this.props.cityNameSelected == ""?<section id="brandInline" className="h205 pdl5 por mb8">
        <p className="fs14 clrg fw600 pd40 mb5">Brands</p>
        <div className="scWrap ht120 pdb15">
            {this.props.brandsdata.map((item,index) => {
              return (<a key={index} href={item.LINK} className="dib tc vat mr8 por ht120 bgw widgetBorder" >
              <div className="flx centerItems"><img src={item.IMAGE} alt={item.NAME} className="relatedimg vam objctFitSclDown" width="70" height="70" /></div>
              <div className="clr33 tc pdt4 fs12 lineClamp whNr lh1_3em">{item.NAME}</div></a>)})}
        </div>
      </section> : ""}
      {this.props.bizData && this.props.bizData.length>1 ?<section id="bizwidget" className="pdl5 mb8">
          <p className="fs14 clrg fw600 pd40 mb5">Seller Type</p>
          <div className="scWrap wnr">
            {this.props.bizData.map((item, index) => {
              let url = item.LINK +(item.QUERY ?item.QUERY : "")
              let bizclassName = (item.NAME==this.props.bizSelected) ? "InSchip":"InUchip";
              return (<div key={index} className={bizclassName} ><a href={url}>{item.NAME}</a></div>)})}
          </div>
      </section> : ""}
      {this.props.isqData && this.props.isqData.length>0 ?<section id = "isqWidget" className="pdl5 mb8">
                <p className="fs14 clrg fw600 pd40 mb5">Specifications</p>
              <div className="scWrap wnr">
                {this.props.isqData.map((item, index) => {
                  let IsqclassName = (item.FK_ISQ_OPTION_TEXT == this.props.isqText) ? "InSchip":"InUchip";
                  return (<div key={index} className={IsqclassName} ><a href={item.ISQ_URL}>{item.FK_ISQ_OPTION_TEXT}</a></div>)})}
              </div>
      </section>: ""}
      {!this.props.path.includes("shopnow") && this.props.citiesData && this.props.citiesData.length>0 ?  
      <section id = "Citywidget" className="pdl5 mb8">
                <p className="fs14 clrg fw600 pd40 mb5">Find Sellers Near You!</p>
              <div className="oAuto wnr">
                {nearme}
                <div className={this.props.cityNameSelected ? "InUchip":"InSchip"} ><a href={this.props.allIndiaLINK}>All India</a></div>
                {this.props.cityNameSelected?<div className="InSchip"><a href={this.props.allIndiaLINK}>{this.props.cityNameSelected}</a></div>:""} 
                {this.props.citiesData.map((item, index) => {
                  let CityclassName = (item.NAME == this.props.cityNameSelected) ? "InSchip":"InUchip";
                  return (<div key={index} className={CityclassName} ><a href={item.LINK}>{item.NAME}</a></div>)})}
              </div>
      </section> : ""}
    </li>
  )
}
}

export default InlineFilters;