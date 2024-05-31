import React, { Component } from "react";
import Listing from "../utility/Listing";
import AfterListing from "../utility/AfterListing";
import mcatApi from "../../../api/impcatApi";
import { getCookieValByKey, getCookie } from "../../../Globals/CookieManager";
import { eventTracking } from "../../../Globals/GaTracking";
import { LANG_COOKIE } from "../../../constants/constants";

class AutoFetch extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialize();
    this.code200 = 200;
    this.code404 = 404;
    this.code5xx = 503;
    this.IntersectNumber = 1;

    this.autofetchListner = this.autofetchListner.bind(this);
    this.autofetchData = this.autofetchData.bind(this);
    this.setObserver = this.setObserver.bind(this);
    this.clickViewMoreHandler = this.clickViewMoreHandler.bind(this);
    this.fullLoginHandler = this.fullLoginHandler.bind(this);
    this.observer = null;
    this.afterListingRef = React.createRef();
    this.detectOnScroll = this.detectOnScroll.bind(this);
    this.setLoginStatus = this.setLoginStatus.bind(this);
    this.loadSignInToViewMore = this.loadSignInToViewMore.bind(this);
  }

  initialize() {
    let autofetchNumber = 2;
    let start = this.props.batchSize * autofetchNumber + 1;
    let end = start - 1 + this.props.batchSize;
    let loginStatus = this.getLoginStatus();
    let afterListingState = this.getAfterListingState(
      loginStatus,
      start,
      end,
      []
    );
    let firstAttach =
      afterListingState == "LOGIN" || afterListingState == "NOMORE"
        ? false
        : true;
    return {
      listData: [],
      autofetchNumber: autofetchNumber,
      afterListingState: afterListingState,
      start: start,
      end: end,

      afterLogin: false,
      viewMoreClick: false,

      loginStatus: loginStatus,

      firstAttach: firstAttach,
      Login : '',
      // isObserverCompatible: true,
      isObserverCompatible : typeof window != 'undefined' && window.IntersectionObserver? true : false
    };
  }

  getAfterListingState(loginStatus, start, end, listData) {
    //No More Results
    if (
      start > this.props.totalProductCount ||
      (listData &&
        listData.length > 0 &&
        listData.length != this.props.batchSize)
    ) {
      return "NOMORE";
    } else if (start > 56) {
      //Empty for sign and verify screen
      if (end < 71) {
        return loginStatus == 2 ? "LOADER" : "LOGIN";
      } else {
        return "VIEWMORE";
      }
    } else {
      return "LOADER";
    }
  }

  componentDidMount() {
    if (this.state.firstAttach) {
      this.autofetchListner();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.uniqueId != this.props.uniqueId) {
      this.observer ?this.observer.disconnect():"";
      this.IntersectNumber = 1;
      // this.afterListingRef = React.createRef();
      this.setState(this.initialize());
    }
    if(this.state.firstAttach) {
      this.autofetchListner();
    }

    if (
      this.state.loginStatus == 2 &&
      (this.state.afterLogin || this.state.viewMoreClick)
    ) {
      this.autofetchData();
    }
  }

  setLoginStatus(status) {
    this.setState({
      loginStatus: status,
    });
  }

  autofetchListner() {

    if (this.state.isObserverCompatible) {
      let options = {
        root: null,
        //rootMargin: "2000px 0px",
        //threshold: 1,
      };
      let that = this;
      this.observer = new IntersectionObserver((entries, observer) => {
        // console.log(entries);
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(that.afterListingRef.current);
              document.getElementById("autofetchcalling"+that.IntersectNumber) ? observer.unobserve((document.getElementById("autofetchcalling"+that.IntersectNumber))) : '';
              that.IntersectNumber+=1
              if(that.state.start > 56){
              that.loadSignInToViewMore();
            }
            else
              that.autofetchData();
          }
        }, options);
      });

      document.getElementById("autofetchcalling"+that.IntersectNumber) ? this.observer.observe((document.getElementById("autofetchcalling"+this.IntersectNumber))) : '';
      this.observer.observe(this.afterListingRef.current);
    } else {
      window.addEventListener("scroll", this.detectOnScroll, {passive : true});
    }
    this.setState({
      firstAttach : false
    })
  }
  loadSignInToViewMore(){
    let loginStatus = this.getLoginStatus();
      if(loginStatus == 0 || loginStatus == 1){
      let afLState = this.getAfterListingState(
        loginStatus,
        this.state.start,
        this.state.end,
        [],
      );
        this.setState({afterListingState : afLState})
    }
      else{
      this.autofetchData();
    }

  }

  detectOnScroll() {
    let bound = this.afterListingRef && this.afterListingRef.current ? this.afterListingRef.current.getBoundingClientRect() : "";


    let margin = 1000;
    let that = this;
    if (bound.top < window.innerHeight + margin) {
      window.removeEventListener("scroll", this.detectOnScroll);
      if(that.state.start > 56){
        this.loadSignInToViewMore();
      }
      else
        this.autofetchData();
    }
  }

  getLoginStatus() {
    if (!getCookie("ImeshVisitor") && !getCookie("im_iss")) {
      return 0;
    } else if (getCookie("ImeshVisitor") && !getCookie("im_iss")) {
      return 1;
    } else if (getCookie("ImeshVisitor") && getCookie("im_iss")) {
      return 2;
    } else {
      return -1;
    }
  }

  autofetchData() {

    let start = this.state.start;
    let end = this.state.end;
    let bizValue = this.props.mcatData.biz;
    let ecomValue = this.props.location && this.props.location.query && this.props.location.query.shopnow ? this.props.location.query.shopnow : ''
    let isqFilter = this.props.mcatData && this.props.mcatData.isq_filter && this.props.mcatData.isq_filter.CurrentID ? this.props.mcatData.isq_filter.CurrentID : ''
    // handling of price query param
    let price_flag = this.props.location && this.props.location.query && this.props.location.query.price ? 1 : 0;
    let glid = start >= 56 ? getCookieValByKey("ImeshVisitor", "glid") : "";
    let lang = getCookie(LANG_COOKIE) === "1" ? "hi" : "en";
    let that = this;
   if(start <= this.props.totalProductCount){
    mcatApi
      .getMcatData(
        that.props.mcatData.flName,
        that.props.mcatData.cityName,
        start,
        end,
        lang,
        bizValue,
        ecomValue,
        isqFilter,
        price_flag,
        glid
      )
      .then((res) => {

        let response = res.response ? res.response : '';
        if(response == ''){
          throw(res)
        }

        if (response.header_status == that.code200) {
          let list = response.data
          let listData = that.state.listData;
          listData.push(list);
          let start = that.state.end + 1;
          let end = start - 1 + that.props.batchSize;
          let loginStatus = that.getLoginStatus();
          let afterListingState = that.getAfterListingState(
            loginStatus,
            start,
            end,
            list,
            false
          );
          if(afterListingState == 'LOGIN' && this.state.Login == ''){
            import(/* webpackChunkName:"SignInToViewMore"*/"../utility/Login").then(module=>{
              this.setState({Login : module.default})
            })
          }
          that.setState({
            listData: listData,
            afterListingState: afterListingState,
            autofetchNumber: that.state.autofetchNumber + 1,
            start: start,
            end: end,
            afterLogin: false,
            viewMoreClick: false,
            loginStatus: loginStatus,
            firstAttach: false,
          }, () => {
            afterListingState != "NOMORE" &&
              afterListingState != "LOGIN" &&
              afterListingState != "VIEWMORE"
              ? that.setObserver()
              : "";
          });

          window.autofetch = window.autofetch + 1;
          window.optimizeEvent = true;
        } else if (response.header_status == that.code404) {
          that.setState({
            afterListingState: "NOMORE",
            afterLogin: false,
            viewMoreClick: false,
            firstAttach : false
          });
        }
      })
      .catch((error) => {
        //Error
        let afLS = 'EMPTY'
        if(error && error.status && error.status == that.code404){
          afLS = 'NOMORE';
        }
        that.setState({
          afterListingState: afLS,
          afterLogin: false,
          viewMoreClick: false,
          firstAttach :false
        });
      });
  }
}

  setObserver() {
    let IntersectElement = document.getElementById("autofetchcalling"+this.IntersectNumber);
    if (this.state.isObserverCompatible) {
      this.observer.observe(this.afterListingRef.current);
      IntersectElement ? this.observer.observe(IntersectElement) : '';
    } else {
      window.addEventListener("scroll", this.detectOnScroll, {passive : true});
    }
  }

  clickViewMoreHandler() {
    eventTracking(
      this.props.mcatData.tracking.click,
      "Show-More-Result-Full-Login",
      `page${this.state.autofetchNumber}`,
      1
    );
    this.setState({ afterListingState: "LOADER", viewMoreClick: true });
  }

  fullLoginHandler() {
    this.setState({
      afterListingState: "LOADER",
      afterLogin: true,
      loginStatus: 2,
    });
  }

  createListView() {
    let view = this.state.listData.map((item, index) => {
      return (
        <Listing
          showEnqPopup = {this.props.showEnqPopup}
          showAds = {this.props.mcatData.showAds}
          showModal={this.props.showModal}
          openMiniPDP={this.props.openMiniPDP}
          listing = {item}
          mcatImg125={this.props.mcatData["mcatImg125"]}
          mcatProd={this.props.mcatData["mcatProd"]}
          cityName={this.props.mcatData.cityName}
          flName = {this.props.mcatData.flName}
          mcatId={this.props.mcatData.mcatId}
          catId = {this.props.mcatData.catId}
          mcatName={this.props.mcatData.mcatName}
          setCityLatLong={this.props.setCityLatLong}
          uniqueId={this.props.mcatData.uniqueId}
          showNearMe={this.props.showNearMe}
          cityData={this.props.mcatData.cityData}
          vernacularData={this.props.vernacularData}
          listNumber={index + 2}
          showFaq = {""}
          tracking={this.props.mcatData.tracking}
          searchBarText = {this.props.searchBarText}
          mcatCityCombinedName = {this.props.mcatData["mcatCityCombinedName"]}
          callNowClick={this.props.callNowClick}
          isqPresent = {this.props.isqPresent}
          AdsComponent={this.props.AdsComponent}
          country_value={this.props.country_value}
          adsnameidForMcat = {this.props.adsnameidForMcat}
          adsnameidForGeneric = {this.props.adsnameidForGeneric}
          adsnameidForCity = {this.props.adsnameidForCity}
          viewType = {this.props.viewType}
          categoriesData={this.props.categoriesData}
          adsResolutions={this.props.adsResolutions}
          mcatImg250={this.props.mcatData["mcatImg250"]}
          bus_type= {this.props.mcatData.bus_type}
          checkUserStatus = {this.props.checkUserStatus}
          getCookieValByKey = {this.props.getCookieValByKey}
          glLastDigit={this.props.glLastDigit}
        />
      );
    });
    return view;
  }

  render() {
    let listView = this.createListView();
    return (
      <React.Fragment>
        {listView}
        <AfterListing
          afterListingState={this.state.afterListingState}
          afterListingRef={this.afterListingRef}
          clickViewMoreHandler={this.clickViewMoreHandler}
          vernacularData={this.props.vernacularData}
        />
        {this.state.afterListingState == "LOGIN" && this.state.Login ? (

          <this.state.Login
            uniqueId={this.props.uniqueId}
            fullLoginHandler={this.fullLoginHandler}
            setLoginStatus={this.setLoginStatus}
            vernacularData={this.props.vernacularData}
            tracking={this.props.mcatData.tracking}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default AutoFetch;
