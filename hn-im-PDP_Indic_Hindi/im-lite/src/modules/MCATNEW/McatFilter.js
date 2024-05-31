import React, { PureComponent } from "react";

class McatFilter extends PureComponent {
  constructor(props) {
    super(props);
    // console.log(props.mcatFlName, "Props in mcatfilter file");
  }
  render() {
    let filterData =
      this.props.catData && this.props.catData.length > 0
        ? this.props.catData
        : this.props.bizData && this.props.bizData.length > 1
        ? this.props.bizData
        : this.props.isqData && this.props.isqData.length > 0
        ? this.props.isqData
        : this.props.brandsdata && this.props.brandsdata.length > 0
        ? this.props.brandsdata
        : "";
    let selectedCellMcatname = this.props.mcatName
      ? this.props.mcatName.replace(/ /g, "-")
      : "";
      let selectedCellMcatFlname = this.props.mcatFlName
      ? this.props.mcatFlName
      : "";
    let iconCheck =
      (this.props.bizData && this.props.bizData.length > 1) ||
      (this.props.isqData && this.props.isqData.length > 0) ||
      (this.props.brandsdata && this.props.brandsdata.length > 0)
        ? true
        : false;
    let citysel = this.props.cityNameSelected ? (
      <div className="Schip">
        <a href={"/impcat/" + selectedCellMcatFlname + ".html"}>{this.props.cityNameSelected}</a>
      </div>
    ) : (
      ""
    );
    let iconfilter = (
      <div id="cityFilterIcon" className="dib marginIcon">
        <img
          className="por objctFitSclDown"
          alt={this.props.isFirefox ? "" : "City Filter Options"}
          width="20"
          height="24"
          src="https://m.imimg.com/gifs/img/loc_icon.png"
        />
      </div>
    );
    let Selcell = (
      <div className="Schip">
        <a href={"/impcat/" + selectedCellMcatFlname + ".html"}>
          {this.props.mcatName}
        </a>
      </div>
    );
    let css = iconCheck
      ? "bgw df pdl6 por pdt4 oAuto"
      : "bgw df pdl6 por pdt4 pdb4 oAuto";
    let cssisq =
      this.props.isqData.length == 1
        ? "bgw wnr pd4008 pdb4"
        : "bgw wnr oAuto pd4008 pdb4";
    return (
      <div id="mcatFilterDiv" className="fs12 bxsdw bgw mb1 pdb5">
        {
          <div id="CityDiv" className="df oAuto bgw">
            {iconfilter}
            <div id="cityFilterId" className="wnr oAuto pdt8">
              <div className={citysel ? 'Uchip':"Schip"}>
                <a href={'/impcat/'+selectedCellMcatFlname+'.html'}>भारत</a>
              </div>
              {citysel}
              {this.props.citiesData.map((citiesData, index) => {
                return (
                  <div
                    key={index}
                    className="Uchip"
                  >
                    <a href={'/city/'+citiesData.glCityFlname+'/'+selectedCellMcatFlname+'.html'}>{citiesData.prdSearchCity}</a>
                  </div>
                );
              })}
            </div>
          </div>
        }

        {filterData ? (
          <div id="CatDiv" className={css}>
            <div id="Filtertray" className="wnr oAuto">
              {Selcell}
              {filterData.map((Data, index) => {
                // Data.LINK = Data.QUERY ? Data.LINK + Data.QUERY : Data.LINK
                return (
                  <div key={index} className={"Uchip"}>
                    <a href={citysel ? '/city/'+this.props.cityNameSelected+'/'+Data.glcatMcatFlname + ".html":"/impcat/" + Data.glcatMcatFlname + ".html"}>
                      {Data.glcatMcatName}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        {/*      
                {this.props.isqText && this.props.isqData && this.props.isqHead?
                    <div id="IsqFilterTray" className={cssisq}>
                    <div className="Schip"><a href={this.props.allIndiaLINK}>{this.props.isqHead}: {this.props.isqText}</a></div>
                    {this.props.isqData.map((item, index) => {
                        if(this.props.isqHead === item.FK_ISQ_QUESTION_TEXT && this.props.isqText != item.FK_ISQ_OPTION_TEXT){
                        return (<div key={index} className="Uchip"><a href={item.ISQ_URL}>{item.FK_ISQ_OPTION_TEXT}</a></div>)}})}
                    </div>:""} */}
      </div>
    );
  }
}
export default McatFilter;
