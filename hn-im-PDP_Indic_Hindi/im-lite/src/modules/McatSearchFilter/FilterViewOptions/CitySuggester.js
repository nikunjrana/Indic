import React, { Component } from "react";
import { goToRoute } from "../../../Globals/routingFunction";
import loadMsuggest from "../../../Globals/attachSuggester";

class CitySuggester extends Component {
  constructor(props) {
    super(props);
    this.state = { firstTime: false }
    this.citySelected = this.citySelected.bind(this);
    this.enterHanding = this.enterHanding.bind(this);
    this.getSearchCity = this.getSearchCity.bind(this);
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
          type: "location",
          classNamePlaceholder: "",
          onSelect: that.citySelected,
          module: "IM-HEADER",
          displayFields: "value,state",
          // displayField: "value,=state,state_id,location_id",
          placeholder: "Search for a City",
          minStringLengthToDisplaySuggestion: 1,
          rowsToDisplay: 3,
          displaySeparator: ", ",
          fields: "state,stateid,flname,alias,location_id",
          recentData: "false",
          autocompleteClass: "citySugg",
          showloc: 1,
          filters: "typ:1"
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

  componentWillUnmount() {
    let suggDiv = document.getElementsByClassName('ui-autocomplete');
    for (let el of suggDiv) {
      if (el.style.display == "block") el.style.display = "none"
    }
  }

  citySelected(i, suggestData) {
    if (suggestData.item && suggestData.item.data && suggestData.item.data.flname && suggestData.item.data.flname != this.props.cityName.toLowerCase()) {
      document.getElementById('srchLocation') ? document.getElementById('srchLocation').style.marginRight = '-35px' :'';
      this.props.onBubbleClick();
      // const params = new URLSearchParams(window.location.search)

      if (!window.location.href.includes(suggestData.item.data.location_id)) {
        // document.getElementById('gblLoader').style.display = "block";
        if(this.props.bizName){
          window.location.href=(`/isearch.php?s=${this.props.mcatName ? this.props.mcatName : this.props.flName}&biz=${this.props.bizName}&cq=${suggestData.item.value.toLowerCase()}&cqid=${suggestData.item.data.location_id}&source=locationsuggester`);
        }
        else {
        window.location.href=(`/isearch.php?s=${this.props.mcatName ? this.props.mcatName : this.props.flName}&cq=${suggestData.item.value.toLowerCase()}&cqid=${suggestData.item.data.location_id}&source=locationsuggester`);
        }
      }
      else {
        document.getElementById("gblLoader")&&document.getElementById("gblLoader").style&&document.getElementById("gblLoader").style.display&&document.getElementById("gblLoader").style.display=='block'?document.getElementById("gblLoader").style.display = "none":'';
      }
    }
    else {
      window.history.back()
    }
  }

  getSearchCity(city = '', state = '', limit = 1) {
    return new Promise(function (resolve, reject) {
      var res = $.ajax({
        url: (state) ? 'https://suggest.imimg.com/suggest/suggest.php?q=' + city + '&limit=' + limit + '&type=location&method=exact&fields=state,stateid,flname,alias,location_id&display_fields=value&filters=type:1,state%3A' + state : 'https://suggest.imimg.com/suggest/suggest.php?q=' + city + '&limit=' + limit + '&type=location&method=exact&fields=state,stateid,flname,alias,location_id&display_fields=value&filters=type:1',
        cache: false,
        success: function (response) {
          return JSON.parse(response);
        },
        timeout: 3000
      });
      resolve(res);
    });
  }

  enterHanding(event) {
    if (!this.state.firstTime) {
      this.setState({ firstTime: true })
    }
    if (event.keyCode == 13||event.which == 13) {
      let city = (event.target.value).toLowerCase();
      if (city != this.props.cityName.toLowerCase()) {
        document.getElementById('srchLocation') ? document.getElementById('srchLocation').style.marginRight = '-35px' :'';
        this.getSearchCity(city)
          .then(res => JSON.parse(res))
          .then(res => res.location)
          .then(res => {
            if (res.length) {
              let cqid = res[0].data.location_id;
              city = res[0].value.toLowerCase();
              // const params = new URLSearchParams(window.location.search)

              this.props.onBubbleClick()

              if (!window.location.href.includes(cqid)) {
                // document.getElementById('gblLoader').style.display = "block";
                if(this.props.bizName){
                  window.location.href=(`/isearch.php?s=${this.props.mcatName ? this.props.mcatName : this.props.flName}&biz=${this.props.bizName}&cq=${city}&cqid=${cqid}&source=locationsuggester`);
                }
                else {
                  window.location.href=(`/isearch.php?s=${this.props.mcatName ? this.props.mcatName : this.props.flName}&cq=${city}&cqid=${cqid}&source=locationsuggester`);
                }
              }
              else {
                document.getElementById("gblLoader")&&document.getElementById("gblLoader").style&&document.getElementById("gblLoader").style.display&&document.getElementById("gblLoader").style.display=='block'?document.getElementById("gblLoader").style.display = "none":'';
                window.location && window.location.href && window.location.href.includes("isearch.php") ? window.location.reload() : '';
              }
            }
            else {
              // this.setState({ error: 'No Such City Exist' })
              this.props.onBubbleClick();
              window.location.href=(`/isearch.php?s=${this.props.mcatName ? this.props.mcatName : this.props.flName} ${city}&source=locationsuggester`);
            }
          })
          .catch((error) => {
            //Error
            window.history.back();
            this.setState({ error: 'Some error occurred' })
          })
      }
      else {
        window.history.back()
      }
    }
  }

  render() {
    let srchBarCss = this.state.firstTime ? `${this.props.page=="Mcat"?"search":"srch"}TxtSel` : `${this.props.page=="Mcat"?"search":"srch"}TxtUnsel`;
    srchBarCss = srchBarCss + ` w100 ${this.props.page=="Mcat"?"CitySuggestBox":"innerCitySuggesterBox"} fs14`
    return (
      <>
        <div className = {this.props.page=="Mcat"?"por searchbar":"por citySuggester"}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class={this.props.page=="Mcat"?"searchLens":"srchLens"}><path fill="#A0A0A0" d="M17.415 16.385l-4.282-4.453c1.1-1.308 1.704-2.955 1.704-4.669C14.837 3.258 11.58 0 7.574 0S.31 3.258.31 7.263s3.258 7.263 7.263 7.263c1.503 0 2.936-.453 4.161-1.314l4.314 4.487c.18.187.423.29.683.29.246 0 .48-.094.656-.264.377-.362.389-.963.027-1.34zM7.574 1.895c2.96 0 5.368 2.408 5.368 5.368 0 2.96-2.408 5.369-5.368 5.369-2.96 0-5.369-2.409-5.369-5.369s2.409-5.368 5.369-5.368z"></path></svg>
          <input
            type="search"
            data-field="placeholder"
            id="city_sugg"
            onKeyDown={(event) => {
              this.enterHanding(event);
            }}
            name="city_suggest"
            placeholder="Search for a City"
            className={srchBarCss}
            autocomplete="off"
            role="textbox"
          />
        </div>
        {this.state.error ? <div id="cityErr" className="err mt5 ml10 fs12">
          {this.state.error}
        </div> : null}
      </>
    );
  }
}
export default CitySuggester;
