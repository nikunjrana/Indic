import React, { Component } from "react";
import { goToRoute } from "../../../../Globals/routingFunction";
import loadMsuggest from "../../../../Globals/attachSuggester";
import mcatApi from '../../../../api/mcatApi';

class CitySuggester extends Component {
  constructor(props) {
    super(props);
    this.citySelected = this.citySelected.bind(this);
    this.enterHanding = this.enterHanding.bind(this);
    loadMsuggest();
  }

  componentDidMount() {
    let that = this;
    function g() {
      let globalSuggObj = "";
      let j;
      if (typeof Suggester != "undefined") {
        j = new Suggester({
          element: "city_sugg",
          type: "city",
          classNamePlaceholder: "ui-placeholder-input",
          onSelect: that.citySelected,
          module: "IM-HEADER",
          displayFields: "value,state",
          placeholder: "Search for a City",
          minStringLengthToDisplaySuggestion: 1,
          rowsToDisplay: 3,
          displaySeparator: ", ",
          fields: "state,id,stateid,flname,alias",
          showloc: 1,
        });

        setTimeout(function () {
          if (globalSuggObj !== "") {
            j.recent(globalSuggObj);
          }
        }, 200);
      } else {
        setTimeout(function () {
          g();
        }, 50);
      }
    }
    g();
  }

  componentWillUnmount(){
    let suggDiv = document.getElementsByClassName('ui-autocomplete');
    for (let el of suggDiv) {
      if(el.style.display == "block") el.style.display = "none"
    }
  }

  citySelected(i, suggestData) {
    if(suggestData.item.data.flname != this.props.cityName.toLowerCase()){
      document.getElementById('gblLoader').style.display = "block";
      goToRoute(`/isearch.php?s=${this.props.mcatName}&cq=${suggestData.item.data.flname}`);
    }
    else{
        window.history.back()
    }
    //goToRoute({ pathname: `/${suggestData.item.value.toLowerCase()}/${this.props.flName}.html`, search: urlAppend, state: { isMcat: true } })
    
  }

  enterHanding(event) {
    if (event.keyCode === 13) {
      let city = (event.target.value).toLowerCase();
      mcatApi.getSearchCity(city)
      .then(res=>JSON.parse(res))
      .then(res=>res.city)
      .then(res=>{
          if(res.length){
              city = res[0].data.flname;
              document.getElementById('gblLoader').style.display = "block";
             goToRoute(`/isearch.php?s=${this.props.mcatName}&cq=${city}`);
          }
          else{
          this.setState({error : 'No Such City Exist'})
          }
      })
      .catch((error)=>{
          //Error
          console.log("error",error)
          this.setState({error : 'Some error occurred'})
      })
      //document.getElementById('gblLoader').style.display = "block";
      //goToMcat(`/${city}/${this.props.flName}.html`);
      //goToRoute({ pathname: `/${city}/${this.props.flName}.html`, search: urlAppend, state: { isMcat: true } })
    }
  }

  render() {
    return (
      <>
        <div className="por">
          <i className="srchIcon poa"></i>
          <input
            type="text"
            data-field="placeholder"
            id="city_sugg"
            onKeyUp={(event) => {
              this.enterHanding(event);
            }}
            name="city_suggest"
            placeholder="Search for a City"
            className="sdwSrchBar w100 cityInput fs20"
            autocomplete="off"
            role="textbox"
          />
          <span id="citySearch" className="dn scArr poa"></span>
        </div>

        {this.state.error ? <div id="cityErr" className="err mt5 ml10 fs12">
          {this.state.error}
        </div> : null}
      </>
    );
  }
}
export default CitySuggester;
