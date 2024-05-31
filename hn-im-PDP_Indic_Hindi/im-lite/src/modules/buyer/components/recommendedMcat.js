import React, { Component } from "react";
import "../css/recommendedMcat.css";
import styles from "../../../Globals/imageCss";
import { getCookie , getCookieValByKey } from "../../../Globals/CookieManager";
import { eventTracking, gaTrack} from "../../../Globals/GaTracking";
import FilterContainer from "../../Widgets/LocationFilter/FilterContainer";
import { Link } from "react-router";
import { checkUserMode, checkUserStatus } from '../../../Globals/MainFunctions';
import {removalTextNodes} from '../../../Globals/translatorPreact/translatorPatch';

class RecommendedMcat extends Component {
  constructor(props) {
    super(props);
    this.callApi = this.callApi.bind(this);
    this.callBL = this.callBL.bind(this);
    (props.page == "product-detail" || props.page =="Mini-PDP" ) ? (window.requireChatBl = true) : "";
    this.state = {isOnetimeState: true}
    this.mcatArray= [69543,42703,84153,168563,170577,108469,174817,42705,169034,175594,68310,172377,171931,173525,32057,171747,168019,170602,171255,175819,168751,168851,173477,41692,168850,170187,174689,127555,147220,172721,173133,171918];
    this.getBlDiv=this.getBlDiv.bind(this);
    this.firePDPTracking = this.firePDPTracking.bind(this);
    this.foreignCheck = getCookieValByKey("iploc","gcniso") !="IN";
    this.selectedCity ="You" ;
    this.sellerDist ="You" ;
    this.page1=this.props && this.props.page?this.props.page=="product-detail"?"PDP":this.props.page:"";
    // this.sendImage =false;
    this.cABTest = this.props.isABtst && (window.pageName && window.pageName.toLowerCase().includes('company') ||  window.pagename && window.pagename=="PDP" )? this.props.cABTest:'';
  }


  componentWillUnmount() {
    window.requireChatBl = false;
  }

  componentDidMount() {
    //this.props.updatestate();
    if (this.props.checkforPostBuy || (this.props.selectedCityInFilter && this.props.selectedCityInFilter.cityname && (this.props.page == "Mini-PDP" || (this.props.page && this.props.page.includes("company"))))) {
      this.callApi(this.props.checkforPostBuy?getCookie("iploc")?getCookieValByKey("iploc","gctid")?getCookieValByKey("iploc","gctid"):"":"":this.props.selectedCityInFilter.cityid);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let belowtfold = document.getElementById("belowtfold");

    if(this.props.page=="product-detail"&&this.props.get_sellernearme!=undefined){
      belowtfold ? belowtfold.parentNode.removeChild(belowtfold) : "";
      this.props.setloadall?this.props.setloadall():'';
      this.props.Loadall?
      belowtfold ? belowtfold.parentNode.removeChild(belowtfold) : "":"";
    }
    if(this.props.page=="product-detail"&&this.props.mcatId==undefined&&this.props.get_sellernearme==undefined){
      belowtfold ? belowtfold.parentNode.removeChild(belowtfold) : "";
      this.props.setloadall?this.props.setloadall():'';
      this.props.Loadall?
      belowtfold ? belowtfold.parentNode.removeChild(belowtfold) : "":"";
    }
      
    removalTextNodes();
    
    if (this.state.listUL != "") {
      let that = this;
      window.setTimeout(() => {
        that.setState({ listUL: "" });
      }, 500);
    }
    if(this.props.selectedCityInFilter!=prevProps.selectedCityInFilter && this.props.page=="Mini-PDP")
    {
      this.callApi(this.props.selectedCityInFilter.cityid);
    }
    if (
      this.props.page &&
      ( this.props.page == "Mini-PDP" ||(this.props.page && this.props.page.includes("company"))) &&
      this.props.RecomMcatStatus == "loading"
    ) {
      if (
        this.props.get_sellernearme != undefined &&
        this.props.get_sellernearme.hasOwnProperty(["RECOMMENDED MCAT DATA"])
      ) {
        this.props.updateStatus("Recomm", "Done");
      } else {
        this.props.updateStatus("Recomm", "Failed");
      }
    }

    if(this.props.get_sellernearme && this.props.get_sellernearme.hasOwnProperty(["RECOMMENDED MCAT DATA"])){
      let mcatImageVal = this.props.get_sellernearme["RECOMMENDED MCAT DATA"] && this.props.get_sellernearme["RECOMMENDED MCAT DATA"][this.props.get_sellernearme["RECOMMENDED MCAT DATA"].length-1] ? this.props.get_sellernearme["RECOMMENDED MCAT DATA"][this.props.get_sellernearme["RECOMMENDED MCAT DATA"].length-1].GLCAT_MCAT_IMG1_250X250 :'';
      this.props.getRecentMcatImage? this.props.getRecentMcatImage(mcatImageVal):'';
      // this.sendImage = true;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.selectedCityInFilter && typeof(this.props.selectedCityInFilter.cityname) != "undefined" && 
        this.props.selectedCityInFilter.cityname !==
          nextProps.selectedCityInFilter.cityname && this.props.pageName!="PDP") ||
      (this.props.selectedCityInFilter &&
        this.props.mcatId !== nextProps.mcatId && this.props.pageName!="PDP")
    ) { 
      this.callApi(nextProps.selectedCityInFilter.cityid);
    }
  }

  callApi(cityid = "") {
    let DISPLAY_ID = this.props.id;
    let MCAT_ID = this.props.mcatId;
    let CITY_ID = cityid ? cityid : this.props.cityId;
    if (CITY_ID === "allindia") CITY_ID = "";
    let COUNT = "6";
    if(MCAT_ID && !isNaN(MCAT_ID)) {
    this.props.getsellernearme(MCAT_ID, CITY_ID, COUNT, DISPLAY_ID);
    }
  }


  callBL(mcatid, mcatname, imgurl) {
    var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    let query_text = '';
    if(this.props.page && this.props.page.includes('company')){
       query_text = "More-sellers-nearyou-"+ this.props.page+"-Click|" + langSelection + this.cABTest;
    }
    else{
     query_text = "More-sellers-nearyou-product-Click|" + langSelection + this.cABTest;
    }
    var getPdpImg = "",
      ctaName = "";
    if (this.props.pageName == "PDP" || this.props.page =="Mini-PDP") {
      ctaName = this.props.ctaName;
      query_text+=this.props.track
    }
    getPdpImg = imgurl;
    let aflid="";
    if (this.props.page == "Mini-PDP") {
      if (this.props.pageName == "Search") {
        aflid="-297"
      }
      else if (this.props.pageName == "Mcat") {
        aflid="-296"
      }
      else{
       aflid="-298"
      }
    }
    query_text+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"");

    let obj = {};
    obj.prNtFndName = '';
    obj.CEF_form_type = '';
    obj.CefProdType = '';
    obj.R_custtype_weight = "";
    obj.affiliationId  = aflid ? aflid:'-116';
    obj.mcatId  = mcatid;
    obj.productName = mcatname;
    obj.query = '';
    obj.queryText = query_text;
    obj.modid = 'IMOB';
    obj.productImage=getPdpImg;
    obj.isEnquiry=false;
    obj.ctaName='कोटेशन प्राप्त करें';
    obj.internaltrack=this.props.track
    obj.page= this.props.pageName;
      this.props.showModal(obj);
  }

  getBlDiv(Mctid,mcatname,imgurl,eventCategory,eventAction, eventLabel) {
     return (<a class={this.props.pageType == "PDP" ? 'dib  clrw bgmim fs15 fw bxrd20 w90 ':'dib bxsdw clrw bgmim fs14 bxrd20 w80'}  style="padding: 8px 10px;"onClick={() => {this.firePDPTracking(eventCategory,eventAction,eventLabel); this.callBL(Mctid,mcatname,imgurl);}}><span class="ENQ_LABEL1">{this.props.checkforPostBuy?"कोटेशन प्राप्त करें":this.props.translatedText.ENQ_LABEL1}</span></a>);}


  firePDPTracking(category, action, label) {
    let loginModeArray=["-Unidentified", "-Identified", "-FullyIdentified"];
    let status = checkUserStatus();
    let loginModeArray1=["Unidentified", "Identified", "Full-Login"]
    if(window.pageName && window.pageName == "PDP" ) {
      action+=(status>=0 && status<=2 ? loginModeArray[status] : "");
      action+=this.cABTest;
    }
    eventTracking("BLCTA/"+loginModeArray1[status],this.page1+"/"+"Explore-Similar/","",true)
    eventTracking(category,action,label,true)
  }

  render() {
    removalTextNodes();
    let listitems = "";
    let listitemsData = "";
    let relatedProductList = "";
    let res = this.props.get_sellernearme;
    let response_data = "";
    let LiList = [];
    let SetAdRef = this.props.SetAdRef? '-AdVisible':'';
    let checkConnection = this.props && this.props.connectionType? !this.props.connectionType()? 'fastNetwork':'slowNetwork':'';
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    this.selectedCity =sessionStorage.getItem("selectedCity")!=''? sessionStorage.getItem("selectedCity") : "You" ;
    this.sellerDist =sessionStorage.getItem("sellerDist")!=''? sessionStorage.getItem("sellerDist") : "You";
    // Loogic starts here
    if (
      res != undefined &&
      this.props.get_sellernearme.hasOwnProperty(["RECOMMENDED MCAT DATA"])
    ) {
      listitemsData = this.props.get_sellernearme["RECOMMENDED MCAT DATA"];

      if (listitemsData && listitemsData != undefined) {
        listitems = this.props.get_sellernearme["RECOMMENDED MCAT DATA"];
        
        if(this.props.checkforPostBuy){
          let lisitems1=listitems;
          listitems=""
          listitems=lisitems1.filter((data)=>{
            if(data && ((data.GLCAT_MCAT_NAME && !(data.GLCAT_MCAT_NAME.toLowerCase().includes("injection") || data.GLCAT_MCAT_NAME.toLowerCase().includes("medicine") || data.GLCAT_MCAT_NAME.toLowerCase().includes("injections") || data.GLCAT_MCAT_NAME.toLowerCase().includes("medicines") || data.GLCAT_MCAT_NAME.toLowerCase().includes("tablet") || data.GLCAT_MCAT_NAME.toLowerCase().includes("tablets") || data.GLCAT_MCAT_NAME.toLowerCase().includes("capsule") || data.GLCAT_MCAT_NAME.toLowerCase().includes("capsules"))) || (data.IIL_DIR_REL_MCAT_NAME && !(data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("injection") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("medicine") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("injections") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("medicines") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("tablet") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("tablets") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("capsule") || data.IIL_DIR_REL_MCAT_NAME.toLowerCase().includes("capsules"))))){
              return data;
            }
          })
        }
        let rcmndedMcatDataLastItem = listitems;
        let rcmndedMcatDataLastItemValue = rcmndedMcatDataLastItem[rcmndedMcatDataLastItem.length - 1];
        let samePrdGlCityName = listitems.length > 0 ?(rcmndedMcatDataLastItemValue.GL_CITY_NAME)? rcmndedMcatDataLastItemValue.GL_CITY_NAME: this.props.city_name:'';
        let samePrdGlMcatName = listitems.length > 0 ?(rcmndedMcatDataLastItemValue.GLCAT_MCAT_NAME)? rcmndedMcatDataLastItemValue.GLCAT_MCAT_NAME: this.props.brdMcatName:'';
        let samePrdGlMcatFlName = listitems.length > 0 ?(rcmndedMcatDataLastItemValue.GLCAT_MCAT_FLNAME)? rcmndedMcatDataLastItemValue.GLCAT_MCAT_FLNAME: this.props.brdMcatFLName :'';

        if (this.props.page && (this.props.page == 'product-detail' || this.props.page == "Mini-PDP") && this.props.isRecommendedMcat == 'isRecommendedMcat' && listitems.length == 0 && this.state.isOnetimeState) {

          let dsplyId = this.props.PC_ITEM_DISPLAY_ID;
          dsplyId ? dsplyId = '-' + dsplyId : dsplyId = '';
          let mCatID = this.props.mcatId;
          mCatID ? mCatID = '-' + mCatID : mCatID = '';
          let updatedCity = this.props.selectedCityInFilter.cityname == "All India" ? 'allindia' : this.props.selectedCityInFilter.cityid;
          let updatedCityShow = updatedCity ? updatedCity = '-' + updatedCity : updatedCity = '';

          
        }


        let dat = listitems;
        let relcat = {};
        let relCats = [];
        if (dat.length > 0) {
          for (let i = 0; i < dat.length; i++) {
            //relCat
            relcat = {
              GLCAT_MCAT_ID: dat[i]["IIL_DIR_REL_MCAT_ID"]
                ? dat[i]["IIL_DIR_REL_MCAT_ID"]
                : dat[i]["GLCAT_MCAT_ID"],
              GLCAT_MCAT_NAME: dat[i]["IIL_DIR_REL_MCAT_NAME"]
                ? dat[i]["IIL_DIR_REL_MCAT_NAME"]
                : dat[i]["GLCAT_MCAT_NAME"],
              GLCAT_MCAT_FLNAME: dat[i]["IIL_DIR_REL_MCAT_FLNAME"]
                ? dat[i]["IIL_DIR_REL_MCAT_FLNAME"]
                : dat[i]["GLCAT_MCAT_FLNAME"],
              GLCAT_MCAT_IMG1_125X125: dat[i]["GLCAT_MCAT_IMG1_125X125"],
              Pagekey:'|PDP'
            };
            relCats.push(relcat);
          }
          localStorage.setItem(
            "relCats",
            JSON.stringify([JSON.stringify(relCats)])
          );
        }

        if (this.props.pageType == "PDP" || this.props.pageType == "Mini-PDP") {
          var cityName1 = "",
            cityName1L = "",
            cityURLsProduct = "",
            cityURLsProductUpdated = "",
            samePrdCityName = "";
            

          cityURLsProduct = this.props.CityUrl.split("/");
       
          if (this.props.selectedCityInFilter.cityname == "All India") {
              //cityname coming from filter
            samePrdCityName = "All India";
            cityURLsProduct.splice(3, 1); // removed city string from array
            cityURLsProduct[3] = 'impcat';
            cityURLsProduct[4] = samePrdGlMcatFlName+'.html';
          }else{  // default case to show city name with city url
            samePrdCityName = samePrdGlCityName;
            cityURLsProduct[4] = samePrdGlCityName;
            cityURLsProduct[5] = samePrdGlMcatFlName+'.html';
          }
          
          if (this.state.geLocCity != "" && this.state.userLCity == "") {
            // checked for NearMe city (True)
            cityName1 = this.state.geLocCity;
            cityURLsProduct[4] = this.state.geLocCity.toLowerCase();
            samePrdCityName = cityName1;
          }
          if (this.state.geLocCity == "" && this.state.userLCity != "") {
            // checked for UserLoc city (True)
            cityName1L = this.state.userLCity;
            cityName1 =
            cityName1L.charAt(0).toUpperCase() + cityName1L.slice(1);
            samePrdCityName = cityName1;
            
            cityURLsProduct[4] = cityName1.toLowerCase();
            cityURLsProductUpdated = cityURLsProduct;
          }
          if (this.state.geLocCity == "" && this.state.userLCity == "") {
            // checked for Default props city (True)
            cityName1 = this.props.city_name ? this.props.city_name : "you!";
            cityURLsProductUpdated = this.props.CityUrl;
            samePrdCityName = this.props.city_name;
          }

          cityURLsProductUpdated = cityURLsProduct.join("/");
          cityURLsProductUpdated = cityURLsProductUpdated.toLowerCase();
          cityURLsProductUpdated = cityURLsProductUpdated.replace(/\s+/g, "-");
        }
      
        if (listitems && listitems != undefined) {
          let headTxt = (this.props.pageType == "PDP") ? this.foreignCheck ?`Explore Similar Products Near ${this.sellerDist? this.sellerDist : this.props.city_name}` : this.selectedCity == 'All India' ? `Explore Similar Products!` : `Explore Similar Products Near ${this.selectedCity? this.selectedCity : this.props.city_name}`:(this.props.page=="Mini-PDP") ?(this.props.translatedText)? this.props.translatedText.PDP_LABEL12:"Explore Similar Products":this.props.checkforPostBuy?"":this.props.translatedText.PDP_LABEL8
          let head = <p className={(this.props.pageType == "PDP"|| this.props.pageType == "Mini-PDP")? "fs17 mxht1000 bgw fw pdt5": "fs20 bxrd10_t bgw fw pdt5"}>
          {window.pageName && window.pageName.includes("Company") && !(this.props.country_value == "" || this.props.country_value == "IN")?
          <span class="pd5 pdl10 pdt10 db">Similar Categories</span>
          : <span class="pd5 pdl10 pdt10 db PDP_LABEL8 t_tc" dangerouslySetInnerHTML={{ __html: headTxt }}></span>}
          </p>;   


          for (let index = 0; index < listitems.length; index++) {
            let items = listitems[index];
            let glCityID = items.GL_CITY_ID;

            if (glCityID && glCityID != null) {

              let Mctid = (index !== ((listitems.length)-1))? items.IIL_DIR_REL_MCAT_ID : listitems[(listitems.length)-1].GLCAT_MCAT_ID;
              let showSWIM = Mctid ? this.mcatArray.includes(parseInt(Mctid)) : false;
              let mcatname = items.IIL_DIR_REL_MCAT_NAME?items.IIL_DIR_REL_MCAT_NAME:items.GLCAT_MCAT_NAME;
              let urlLink = (items.URL);
              let showCityName = (items.GL_CITY_NAME);
              let url = urlLink.replace('dir', 'm');
              // if(!url.includes("impcat")){
              //   url = url.replace('.com','.com/city');
              // };
              if(!url.includes("impcat")){
                url = url.replace('https://m.indiamart.com','/city');
              };

              let imgurl =this.props && this.props.pageName == 'PDP'? (items.GLCAT_MCAT_IMG1_125X125) 
              ?(items.GLCAT_MCAT_IMG1_125X125):(items.GLCAT_MCAT_IMG1_250X250)
                : (items.GLCAT_MCAT_IMG1_250X250)
                ? items.GLCAT_MCAT_IMG1_250X250
                : items.image
                ? items.image
                : "https://m.imimg.com/gifs/background_image.jpg";
              imgurl = imgurl.replace("imghost.indiamart.com", "1.imimg.com");
              imgurl = imgurl.replace("imghost1.indiamart.com", "2.imimg.com");
              imgurl = imgurl.replace("http://", "https://");
              let swimDiv1 = (<a target="_blank" href=" https://shipwith.indiamart.com/book?utm_source=msite&utm_medium=im_pdp&utm_campaign=Get+Quotes&afl_id=-902" class={this.props.pageType == "PDP" ? 'dib  clrw bgmim fs15 fw bxrd20 w90 ':'dib bxsdw clrw bgmim fs14 bxrd20 w80'} style="padding: 8px 10px;" onClick={() => {this.firePDPTracking("Product-Page-Clicks","SWIM",Mctid);}}><span class="ENQ_LABEL1">{this.props.checkforPostBuy?"":this.props.translatedText.ENQ_LABEL1}</span></a>);
              let exlrSmlrGetquotes= (this.props.pageName=='PDP'?(showSWIM? swimDiv1 : this.getBlDiv(Mctid,mcatname,imgurl, "Product-Page-Clicks", "कोटेशन प्राप्त करें", Mctid+"|BuyleadCTA|PDP|"+checkUserMode()+`${this.props.track?this.props.track:""}`)) :(this.getBlDiv(items.IIL_DIR_REL_MCAT_ID, mcatname, imgurl,this.props.eventCategory,"sellers-nearyou" + this.cABTest, "get-quotes-" + (index + 1)+"|BuyleadCTA|"+this.props.pageName+"|"+checkUserMode())));                 
              response_data = (
                <div  class={this.props.pageType == "PDP" ? '':'pdt10 pdb10'}>
                  {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link
                    onClick={() => {
                      eventTracking(
                        "Product-Page-Clicks",
                        "City-Mcat-Listing" + SetAdRef,
                        index + 1,
                        true
                      );

                    }}
                    index={index}
                    to={url}
                    className={`${this.props.pageType == "PDP" ? 'hw115 ' : 'hw100 '} dib ma oh`}
                  >
                    {this.props.page && this.props.page==="Mini-PDP" ? <img className="mxhw100 objctFitSclDown" width="100" height="100" src={imgurl} alt={mcatname} /> :       
                    <div className={`${this.props.pageType == "PDP"?'hw115 ':'hw100 '} dtc vam ${imgurl && imgurl.includes(".png")?"":"bgimg"}`}>
                      {this.props.pageType == "PDP"?<img className="mxhw115 objctFitSclDown" loading="lazy" width="115" height="115" src={imgurl} alt={mcatname} />
                      :<img className="mxhw100 objctFitSclDown" loading="lazy" width="100" height="100" src={imgurl} alt={mcatname} />}
                    </div> 
                    }
                  </Link> : <a
                    onClick={(event) => {
                      window.location.href=(url)
                      eventTracking(
                        "Product-Page-Clicks",
                        "City-Mcat-Listing" + SetAdRef,
                        index + 1,
                        true
                      );
                      event.preventDefault();
                    }}
                    index={index}
                    href={url}
                    className={`${this.props.pageType == "PDP" ? 'hw115 ' : 'hw100 '} dib ma oh`}
                  >
                    {this.props.page && this.props.page === "Mini-PDP" ? <img className="mxhw100 objctFitSclDown" width="100" height="100" src={imgurl} alt={mcatname} /> :
                      <div className={`${this.props.pageType == "PDP" ? 'hw115 ' : 'hw100 '} dtc vam ${imgurl && imgurl.includes(".png") ? "" : "bgimg"}`}>
                        {this.props.pageType == "PDP" ? <img className="mxhw115 objctFitSclDown" loading="lazy" width="115" height="115" src={imgurl} alt={mcatname} />
                          : <img className="mxhw100 objctFitSclDown" loading="lazy" width="100" height="100" src={imgurl} alt={mcatname} />}
                      </div>
                    }
                  </a>
                  }
                  {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link
                    onClick={() => {
                      eventTracking(
                        this.props.eventCategory,
                        "City-Mcat-Listing" + SetAdRef,
                        index + 1,
                        true
                      );
                    }}
                    to={url}
                    className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20"
                  >
                    {mcatname}
                  </Link> : <a
                    onClick={(event) => {
                      window.location.href=(url);
                      eventTracking(
                        this.props.eventCategory,
                        "City-Mcat-Listing" + SetAdRef,
                        index + 1,
                        true
                      );
                      event.preventDefault();
                    }}
                    href={url}
                    className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20"
                  >
                    {mcatname}
                  </a>
                  }
                  
                  
                  {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link to={url}>

                    <span className="db fs13 clr33 pdt5 pdb10">
                      <i
                        style={this.props.page && (this.props.page.toLowerCase().includes("company") || this.props.page.includes("product-detail")) ? "" : styles.imageCss().mim_bg}
                        className={this.props.page && this.props.page.toLowerCase().includes("company") ? "comp_img comp_cLocIco wh15 mr3 dib" : (this.props.page && this.props.page.toLowerCase().includes("product-detail")) ? "locationIcn mrr3 dib" : "cLocIco wh15 mr3 dib"}
                      ></i>
                      {showCityName}
                    </span>
                  </Link> : <a href={url} onClick={(event) => { window.location.href=(url); event.preventDefault();}}>

                    <span className="db fs13 clr33 pdt5 pdb10">
                      <i
                        style={this.props.page && (this.props.page.toLowerCase().includes("company") || this.props.page.includes("product-detail")) ? "" : styles.imageCss().mim_bg}
                        className={this.props.page && this.props.page.toLowerCase().includes("company") ? "comp_img comp_cLocIco wh15 mr3 dib" : (this.props.page && this.props.page.toLowerCase().includes("product-detail")) ? "locationIcn mrr3 dib" : "cLocIco wh15 mr3 dib"}
                      ></i>
                      <span dangerouslySetInnerHTML={{__html:showCityName}}></span>
                    </span>
                  </a>
                  }    

          {exlrSmlrGetquotes}
                </div>
              );

              LiList.push(
                <li className={`${this.props.pageType == "PDP"?'mnW135 mnH125 w36 br1  ':this.props.checkforPostBuy?"w33 bxrd10 bxdw2 mr10 brDPostBuy":"w33 bxrd10 bxdw2 mr10 "}  tc  crx   bgw oh`}>
                  {response_data}
                </li>
              );
            }
          }

          let cityFltr = (
            <div  class={this.props.pageType == "PDP" ? ' pdt5 oh':'pdl10 pdt5 oh'} >
              <FilterContainer
                eventCategory={this.props.eventCategory}
                eventAction={this.props.eventAction}
                translatedText={this.props.translatedText}
                cityname={this.props.city_name}
                cityid={this.props.cityId}
                pageType={this.props.pageType}
                country_value={this.props.country_value}
              />
            </div>
          );
        
          let showSWIM0 = this.props.mcatId ?this.mcatArray.includes(parseInt(this.props.mcatId)):false;
          let swimDiv0 = (<a target="_blank" href=" https://shipwith.indiamart.com/book?utm_source=msite&utm_medium=im_pdp&utm_campaign=Get+Quotes&afl_id=-902" class={this.props.pageType == "PDP" ? 'dib  clrw bgmim fs15 fw bxrd20 w90 whwp  ':'dib bxsdw clrw bgmim fs14 bxrd20 w80'} style="padding: 8px 10px;" onClick={() => {this.firePDPTracking("Product-Page-Clicks","SWIM",this.props.mcatId);}}><span class="ENQ_LABEL1">{this.props.checkforPostBuy?"":this.props.translatedText.ENQ_LABEL1}</span></a>);
          let exlrSmlrGetquote= (this.props.pageName=='PDP'?(showSWIM0 ? swimDiv0 :this.getBlDiv(this.props.mcatId,this.props.pcItemName, this.props.getPdpImg,"Product-Page-Clicks", "कोटेशन प्राप्त करें", this.props.mcatId+"|BuyleadCTA|PDP|"+checkUserMode()+`${this.props.track?this.props.track:''}`)):this.getBlDiv(this.props.mcatId,this.props.pcItemName,this.props.getPdpImg,"Product-Page-Clicks","sellers-nearyou", "get-quotes-0"+"|BuyleadCTA|"+this.props.pageName+"|"+checkUserMode()));
          if(this.props.pageName=='PDP'){
            let url = cityURLsProductUpdated;
            let pattern = /\/city\/([^/]+)/;
            let match = url&&url.match(pattern);
            let city_name = match&&match[1];
            if(city_name==null){
              cityURLsProductUpdated=samePrdGlMcatFlName?'https://m.indiamart.com/impcat/'+samePrdGlMcatFlName+'.html':'https://m.indiamart.com/impcat'
           }
            if(!samePrdCityName){
              samePrdCityName='All India'
            }
          }
          let sameProducCityMcat =
            this.props.selectedCityInFilter && (this.props.pageType == "PDP" || this.props.pageType == "Mini-PDP") ? (
              <li
                className={`${this.props.pageType?'mnW135 mnH125 w36 br1':this.props.checkforPostBuy?"w33 bxdw2 bxrd10 mr10 brDPostBuy":'w33 bxdw2 bxrd10 mr10'} tc  crx  bgw`}
                id={this.props.PC_ITEM_DISPLAY_ID}
              >
                <div  class={this.props.pageType == "PDP" ? '':'pdt10 pdb10'}>
                
                  {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link
                    to={cityURLsProductUpdated}

                    onClick={() => {
                      eventTracking(
                        "Product-Page-Clicks",
                        "City-Mcat-Listing" + SetAdRef,
                        0,
                        true
                      );


                    }}
                    index={"0"}
                    className="db"
                  >
                    <div className={`${this.props.pageType == "PDP" ? 'hw115 ' : 'hw100 '} flx jstyfyCenter algnCenter ma oh vam ${this.props.getPdpImg && (this.props.getPdpImg.includes(".png") || this.props.getPdpImg.includes(".gif")) ? "" : "bgimg"}`}>
                      {this.props.pageType == "PDP" ? <img className="mxhw115 objctFitSclDown" src={this.props.getPdpImg} alt={this.props.brdMcatName} width="115" height="115" />
                        : <img className="mxhw100 objctFitSclDown" src={this.props.getPdpImg} alt={this.props.brdMcatName} width="100" height="100" />}

                    </div>
                  </Link> : <a
                    href={cityURLsProductUpdated}

                    onClick={(event) => {
                      window.location.href=(cityURLsProductUpdated)
                      eventTracking(
                        "Product-Page-Clicks",
                        "City-Mcat-Listing" + SetAdRef,
                        0,
                        true
                      );
      
                      event.preventDefault();
                    }}
                    index={"0"}
                    className="hw115  dib ma oh"
                  >
                    <div className={`${this.props.pageType == "PDP" ? 'hw115 ' : 'hw100 '} flx jstyfyCenter algnCenter ma oh vam ${this.props.getPdpImg && (this.props.getPdpImg.includes(".png") || this.props.getPdpImg.includes(".gif")) ? "" : "bgimg"}`}>
                      {this.props.pageType == "PDP" ? <img className="mxhw115 objctFitSclDown" src={this.props.getPdpImg} alt={this.props.brdMcatName} width="115" height="115" />
                        : <img className="mxhw100 objctFitSclDown" src={this.props.getPdpImg} alt={this.props.brdMcatName} width="100" height="100" />}

                    </div>
                  </a>}

                  {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link

                    to={cityURLsProductUpdated}
                    onClick={() => {
                      eventTracking(
                        "Product-Page-Clicks",
                        "City-Mcat-Listing" + SetAdRef,
                        0,
                        true
                      );

                    }}
                    className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20"
                  >
                    {(this.props.pageType == "PDP" || this.props.pageType == "Mini-PDP") ? samePrdGlMcatName ? samePrdGlMcatName : this.props.brdMcatName : this.props.brdMcatName}
                  </Link> : <a

                    href={cityURLsProductUpdated}
                    onClick={(event) => {
                      window.location.href=(cityURLsProductUpdated);
                      eventTracking(
                        "Product-Page-Clicks",
                        "City-Mcat-Listing" + SetAdRef,
                        0,
                        true
                      );
                      event.preventDefault();
                    }}
                    className="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20"
                  >
                    {(this.props.pageType == "PDP" || this.props.pageType == "Mini-PDP") ? samePrdGlMcatName ? samePrdGlMcatName : this.props.brdMcatName : this.props.brdMcatName}
                  </a>}
                  
                  
                  {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link className="db"
                    to={cityURLsProductUpdated}
                  >
                    <span className="db fs13 clr33 pdt5 pdb10 t_tc">
                      <i
                        style={this.props.page && (this.props.page.toLowerCase().includes("company") || this.props.page.includes("product-detail")) ? "" : styles.imageCss().mim_bg}
                        className={this.props.page && this.props.page.toLowerCase().includes("company") ? "comp_img comp_cLocIco wh15 mr3 dib" : (this.props.page && this.props.page.toLowerCase().includes("product-detail")) ? "locationIcn mrr3 dib" : "cLocIco wh15 mr3 dib"}
                      ></i>
                      {samePrdCityName}
                    </span>
                  </Link> : <a className="db"
                    href={cityURLsProductUpdated}
                    onClick={(event) => { window.location.href=(cityURLsProductUpdated); event.preventDefault();}}
                  >
                    <span className="db fs13 clr33 pdt5 pdb10 t_tc">
                      <i
                        style={this.props.page && (this.props.page.toLowerCase().includes("company") || this.props.page.includes("product-detail")) ? "" : styles.imageCss().mim_bg}
                        className={this.props.page && this.props.page.toLowerCase().includes("company") ? "comp_img comp_cLocIco wh15 mr3 dib" : (this.props.page && this.props.page.toLowerCase().includes("product-detail")) ? "locationIcn mrr3 dib" : "cLocIco wh15 mr3 dib"}
                      ></i>
                      <span dangerouslySetInnerHTML={{__html:samePrdCityName}}></span>
                    </span>
                  </a>
                  }

                    {exlrSmlrGetquote}
                </div>
              </li>
            ) : (
              ""
            );

          relatedProductList = (
            <section id="SlrNearMe" className={this.props.pageType == "miniPDP" ? "w100 mb20" : this.props.pageType == "PDP" ? "w100 mb5" : "w100 mb10 bxsdw "}> 
              
              {this.props.checkforPostBuy?"":head }
              <div className="bgw oh">
                {cityFltr}

                <div  class={this.props.pageType == "PDP" ? 'relatedMoreCat   mt5 mb5':'relatedMoreCat pdt5 pdb10'} >
                  <ul id="listUL">
                    {this.props.pageType == "PDP" || this.props.pageType == "Mini-PDP" ? samePrdGlMcatFlName? sameProducCityMcat:'' : ""}
                    {LiList}
                  </ul>
                </div>
              </div>
            </section>
          );
        }
      }
    }
    return (
      <div>
        {relatedProductList && LiList.length > 0 ? relatedProductList : ""}
      </div>
    );
  }
}
export default RecommendedMcat;