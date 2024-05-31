const GblComFunc = require("../../GblComFunc");
const utilities = require("./utilities");
const urls = require("../../ajaxRequests/ServiceUrls");
const chunkVersion = require('../../version.json');
import { renderToString } from "react-dom/server";
import React from 'react';
import FirstFoldMcat from "../../../src/modules/MCATNEW/components/FirstFoldMcat";
import ProductCard from "../../../src/modules/MCATNEW/SsrListing/ProductCard";
import { getCDNHost } from "../../GblComFunc";
import SsrWidgets from "../../../src/modules/MCATNEW/SsrListing/SsrWidgets";
const requestIp = require('@supercharge/request-ip')

function locationApiCallMcatShell(req, res, shellCallBck, pageRedirect, rehit) {
  let userCountry = "";
  if (req.cookies && req.cookies.iploc && req.cookies.iploc.split("|")[0] && req.cookies.iploc.split("|")[0].split("=")[1] == "IN") {
    userCountry = "IN";
    mcatShell(req, res, shellCallBck, pageRedirect, rehit, userCountry);
  }
  else if (req.cookies && req.cookies.iploc && req.cookies.iploc.split("|")[0] && req.cookies.iploc.split("|")[0].split("=")[1] && req.cookies.iploc.split("|")[0].split("=")[1] != "IN") {
    userCountry = "Foreign";
    mcatShell(req, res, shellCallBck, pageRedirect, rehit, userCountry);
  }
  else {
    const locationApiHit = {
      method: "POST",
      url: 'https://geoip.imimg.com/api/location',
      form: {
        modid: 'IMOB',
        token: 'imobile@15061981',
        iplist: requestIp.getClientIp(req),
        source_file: 'MCAT_shell'
      },
    };
    GblComFunc.makegRPCImpcatRequest(req, res, locationApiHit, false, true)
      .then((data) => {
        let parsedData = data.toObject();
        let userCountryData = parsedData.Response.Data;

        if (userCountryData) {
          let iplocCookieValue = `gcniso=${userCountryData.geoip_countryiso ? userCountryData.geoip_countryiso : ""}|gcnnm=${userCountryData.geoip_countryname ? userCountryData.geoip_countryname : ""}|gctnm=${userCountryData.geoip_cityname ? userCountryData.geoip_cityname : ""}|gctid=${userCountryData.geoip_cityid ? userCountryData.geoip_cityid : ""}|gacrcy=${userCountryData.geoip_accuracy ? userCountryData.geoip_accuracy : ""}|gip=${userCountryData.geoip_ipaddress ? userCountryData.geoip_ipaddress : ""}`;
          res.cookie(`iploc`, iplocCookieValue, { maxAge: 10368000, domain: '.indiamart.com' })
          mcatShell(req, res, shellCallBck, pageRedirect, rehit, userCountryData.geoip_countryiso);
        }
        else {
          mcatShell(req, res, shellCallBck, pageRedirect, rehit);
        }
      })
      .catch((error) => {
        mcatShell(req, res, shellCallBck, pageRedirect, rehit);
      });
  }
}

function mcatShell(req, res, shellCallBck, pageRedirect, rehit, userCountry) {
  rehit = rehit ? rehit : false;
  let errorMsg = "";
  const mcatObj = {
    flName: utilities.getFlname(req.path),
    cityId: "",
    cityName: "",
    language: 'en'
  };

  //If biz present and incorrect - 404
  let isCorrectBiz = req.query && req.query.biz ? bizCheck(req.query.biz) : true;
  let isCorrectEcom = req.query && req.query.shopnow ? req.query.shopnow == 1 ? true : false : true;
  //handling of 4xx cases for old/New ISQ urls
  let Newisq = req.path && req.path.split("/") && req.path.split("/")[3] ? req.path.split("/")[3].split("-q") && req.path.split("/")[3].split("-q")[1] ? Number(req.path.split("/")[3].split("-q")[1]) : "" : ""
  const regex = /^[0-9]+$/;
  // let NewIsqID = req.path.includes("/city/") ? true : (req.path.match(/\//g) || []).length > 2 ? regex.test(Newisq) ? true : false : true
  let key = req.query ? Object.keys(req.query) : '';
  let keysplit = key && key[0] && key[0].split("-") ? key[0].split("-") : '';
  let isq4xxCheck = keysplit && keysplit[1] ? regex.test(keysplit[1]) ? true : false : true;
  if (!(isCorrectBiz && isCorrectEcom && isq4xxCheck)) {
    errorMsg = "Incorrect Biz/Isq value";
    shellCallBck(res, generateErrorShell("404", errorMsg));
  } else if (mcatObj.flName) {
    const url = urls.IMPCAT_URL;
    let dirUrl = req.originalUrl;
    /*
    if (req.path.split("/")[1] !== "impcat") {
      //set only cityid in rehit case for userlocName cookie creation
      let cityName = utilities.getCityFlname(req.path);
      cityName = cityName && !cityName.endsWith("%20") && cityName.includes('%20') ? cityName.replace('%20', '-') : cityName;
      while (cityName && cityName.includes('%20')) {
        cityName = cityName.replace('%20', '')
      }
      cityName = cityName.toLowerCase();
      if (/[A-Z]/.test(cityName)) {
        let redirectUrl = `/city/${cityName}/${mcatObj.flName}.html`;
        pageRedirect(res, { status: 301, url: redirectUrl });
      }
      mcatObj.cityName = !rehit ? cityName : "";
      mcatObj.cityId = utilities.getCityId(cityName);
      let dirArr = dirUrl.split('/city');
      dirUrl = dirArr[1];
      if (mcatObj.cityId == "") {
        errorMsg = "City does not exist";
      }
    }
    */
    //wrong city
    if (errorMsg) {
      shellCallBck(res, generateErrorShell("404", errorMsg));
    } else {
      const languageArr = ["en", "hi"];
      mcatObj.language = req.cookies.lang ? languageArr[req.cookies.lang] : mcatObj.language;
      const userIp = requestIp.getClientIp(req);
      let actualIP = '';
      userIp != undefined ? actualIP = userIp : actualIP = '';
      let isqKey = Object.keys(req.query)[0];
      let isqFilter = isqKey && isqKey != 'biz' ? isqKey.split('-')[1] : "";
      let isqUrl = req.path && req.path.split("/") && req.path.split("/")[3] ? req.path.split("/")[3] : ""
      let isqId = isqUrl && isqUrl.split("-q") && isqUrl.split("-q")[1] ? Number(isqUrl.split("-q")[1]) : ""
      let specID = req.originalUrl.includes("?q-") ? isqFilter : isqId
      let glidVal = "";
      if (req.cookies && req.cookies.ImeshVisitor)
        glidVal = req.cookies.ImeshVisitor.split("|glid=")[1] ? req.cookies.ImeshVisitor.split("|glid=")[1].split("|")[0] : "";
      let randomValue = Math.floor(Math.random() * (900)) + 100; //generating three digit number
      let in_country_iso = 0;
      //handling of price query param
      let price_flag = Object.keys(req.query) && Object.keys(req.query).includes("price") ? 1 : 0;
      if (userCountry && userCountry != "IN" && (typeof (in_country_iso) == "number"))
        in_country_iso = 1;

      const options = {
        method: "POST",
        url: url,
        page: 'MCAT',
        form: {
          rltdprod: 30,
          flname: mcatObj.flName,
          cityid: req.query.shopnow == 1 ? "" : rehit ? "" : mcatObj.cityId,
          start: 1,
          end: 28,
          token: "imobile@15061981",
          modid: "IMOB",
          pck_name_param: "pck_sellers_mcat_listing",
          supplier_listing_generic: 1,
          language: mcatObj.language,
          biz_filter: req.query.biz ? req.query.biz : "",
          ecom_filter: req.query.shopnow ? req.query.shopnow : '',
          price_filter: price_flag,
          user_request_ip: actualIP,
          in_isq_option: specID && !isNaN(specID) ? specID : "",
          glusrid: glidVal,
          in_country_iso: in_country_iso,
          randomizer: randomValue
        },
        timeout: 8000,
      };

      let cbService = urls.IMPCAT_URL;
      GblComFunc.makegRPCImpcatRequest(req, res, options, false, true, cbService)
        .then((dataString) => {
          try {
            // const data = JSON.parse(dataString);
            const data = dataString.toObject();
            // console.log(data, "Data")
            //301 Redirection to alternate Mcat
            // (data["index"] == "1") ? res.set("indxtyp", "1") : res.set("indxtyp", "0");
            // if(req.query && req.query["utm_source"]){
            //   req.query["utm_source"] = typeof(req.query["utm_source"]) != 'undefined' ? typeof(req.query["utm_source"]) == 'object'?req.query["utm_source"][req.query["utm_source"].length-1] :"":"";
            // }
            // if (data["header_status"] === "301" && data["alternate_mcat_name"]) {
            //   let redirectStatus = 301;
            //   let page = mcatObj.cityName ? `city/${mcatObj.cityName}` : "impcat";
            //   let redirectUrl = `/${page}/${data["alternate_mcat_name"]}.html`;
            //   pageRedirect(res, { status: redirectStatus, url: redirectUrl });
            // }
            // else if(req.originalUrl.includes("?q-")){
            //   if(data["header_status"] && data["header_status"] === "301" && data["Reason"] == "NO DATA FOR FILTER"){
            //     let reqPath = req.path && req.path.split('/') ? req.path.split('/') : [];
            //     let page = reqPath.length >2 && reqPath[2] ? reqPath[2] : "";
            //     let redirectUrl = `/impcat/${page}`;
            //     pageRedirect(res, { status: 301, url: redirectUrl });
            //   }
            //   if(data["header_status"] && data["header_status"] === "200"){
            //     let text = Object.values(req.query) && Object.values(req.query)[0] ? Object.values(req.query)[0]:""
            //     let startpath = req.path? req.path.replace(".html",""):""
            //     let ques = keysplit && keysplit.length>=3 ? keysplit.slice(2, keysplit.length).join('-') : keysplit[2];
            //     let path = `${startpath}/${ques}-${text}-q${keysplit[1]}/`
            //     pageRedirect(res, { status: 301, url: path });
            //   }
            // }
            // else if((data["header_status"] && data["header_status"] === "301" && data["Reason"] == "BANNED_CITY")){
            //   let redirectStatus = 301;
            //   let reqPath = req.path && req.path.split('/') ? req.path.split('/') : [];
            //   let page = reqPath.length >3 && reqPath[3] ? reqPath[3] : "";
            //   let redirectUrl = `/impcat/${page}`;
            //   pageRedirect(res, { status: redirectStatus, url: redirectUrl });
            // }
            // else if(data["header_status"] && data["header_status"] === "301" && data["Reason"] == "NO DATA FOR FILTER"){
            //   let reqPath = req.path && req.path.split('/') ? req.path.split('/') : [];
            //   let page = reqPath.length >2 && reqPath[2] ? reqPath[2] : "";
            //   let redirectUrl = `/impcat/${page}`;
            //   if(isqId){
            //     redirectUrl = redirectUrl && redirectUrl.includes(".html") ? redirectUrl : redirectUrl+".html"
            //   }
            //   pageRedirect(res, { status: 301, url: redirectUrl });
            // }

            //If status 404 / Service Data Empty / status 200 but data key empty / City Page Data not present
            // else if (
            //   data["header_status"] === "404" ||
            //   (data["mcatname"] && data["data"].length == 0)
            // ) {
            //   //rehit all india service
            //   if (mcatObj.cityName && data["header_status"] == "404") {
            //     mcatShell(req, res, shellCallBck, pageRedirect, true);
            //   } else
            //     shellCallBck(res, generateErrorShell("404", "Page not found"));
            // }

            //If status not 200
            // else if (data["header_status"] !== "200") {
            //   throw { data: data };
            // } else {
            // data["rehit"] = rehit ? true : false;
            // data["cityid"] = mcatObj.cityId ? mcatObj.cityId : "";
            shellCallBck(res, generateShell200(req, data, mcatObj, rehit, dirUrl));
            // }
          } catch (error) {
            if (error.data && error.data["Message"] && error.data["Message"] == 'Invalid Flname') {
              shellCallBck(res, generateErrorShell("404", error));
            } else
              shellCallBck(res, generateErrorShell("5XX", error));
          }
        })
        .catch((error) => {
          shellCallBck(res, generateErrorShell("5XX", error));
        });
    }
  } else {
    //null mcat urls
    errorMsg = "Null FLNAME";
    shellCallBck(res, generateErrorShell("404", errorMsg));
  }
}

function bizCheck(biz) {
  const bizarray = ["10", "20", "30", "40"];
  if (biz && bizarray.includes(biz)) {
    return true;
  }
  return false;
}
const mnMinbase = getCDNHost();

function preloadedChunks(dataRec, req = "") {
  let preChunks = preloadedConnects();
  let i; let imgArray = []; let preloadImgArr = [];
  for (i = 0; i <= 1; i++) {
    let firstProd = dataRec && dataRec[i] && dataRec[i][0] ? dataRec[i][0] : "";
    if (typeof firstProd.imgUrl_250 != "undefined" && firstProd.imgUrl_250 != 'no_image' && firstProd.imgUrl_250 != '' && !firstProd.imgUrl_250.includes("add-image.gif")) { imgArray[i] = firstProd.imgUrl_250; }
    if (imgArray[i])
      preloadImgArr[i] = `<link rel="preload" fetchpriority="high" href="${imgArray[i]}" as="image">`;
  }
  let a = `
    <link rel="preload" href="${mnMinbase + 'main-min_' + chunkVersion["main_min"] + '.js'}" as="script" >
    ${preloadImgArr[0] ? preloadImgArr[0] : ""}
    ${preloadImgArr[1] ? preloadImgArr[1] : ""}
    ${preloadImgArr[2] ? preloadImgArr[2] : ""}
    <link rel="preload" href="${mnMinbase + 'mcatPageNew.pwa' + chunkVersion["jsChunks"] + '.js'}" as="script" >
   
    `
  let c = `
    `
  return preChunks + a + c;
}
function getCanonicalLinks(path, isq) {
  let text = path && path.split("?") && path.split("?")[1] ? path.split("?")[1] : '';
  let updatePath = text.includes("shopnow=") || text.includes("utm_source=") || text.includes("biz=") || text.includes("q-") ? path : path && path.split("?") && path.split("?")[0] ? path.split("?")[0] : '';
  let newUpdatePath = updatePath;
  let cityName = path && path.includes('/city/') && path.split("/") && path.split("/")[2] ? path.split("/")[2] : '';
  let mcatName = path && path.includes('/city/') && path.split('/') && path.split("/")[3] ? path.split("/")[3] : '';
  cityName = cityName.toLowerCase();
  cityName = cityName && !cityName.endsWith("%20") && cityName.includes('%20') ? cityName.replace('%20', '-') : cityName;
  while (cityName && cityName.includes('%20')) {
    cityName = cityName.replace('%20', '')
  }
  newUpdatePath = `/city/${cityName}/${mcatName}`
  updatePath = path.includes("/impcat/") ? updatePath : newUpdatePath;
  if (isq && isq.CurrentID && isq.CurrentArray && isq.CurrentArray.Path) {
    return isq.CurrentArray.Path
  }
  return updatePath
}
function preloadedConnects() {
  return (`
  <link rel="preconnect" href="https://m.imimg.com/" crossorigin >
  <link rel="dns-prefetch" href="https://m.imimg.com/"  >  
  <link rel="preconnect" href="https://utils.imimg.com/" crossorigin > 
  <link rel="dns-prefetch" href="https://utils.imimg.com/" crossorigin > 
  <link rel="preconnect" href="https://1.imimg.com/" crossorigin > 
  <link rel="dns-prefetch" href="https://1.imimg.com/" > 
  <link rel="preconnect" href="https://2.imimg.com/" crossorigin >
  <link rel="dns-prefetch" href="https://2.imimg.com/"  >
  <link rel="preconnect" href="https://3.imimg.com/" crossorigin > 
  <link rel="dns-prefetch" href="https://3.imimg.com/"  > 
  <link rel="preconnect" href="https://4.imimg.com/" crossorigin >
  <link rel="dns-prefetch" href="https://4.imimg.com/" >
  <link rel="preconnect" href="https://5.imimg.com/" crossorigin > 
  <link rel="dns-prefetch" href="https://5.imimg.com/"  > 
  <link rel="preconnect" href="https://ajax.googleapis.com/" crossorigin >   
  <link rel="dns-prefetch" href="https://ajax.googleapis.com/"  >   
  <link rel="preconnect" href="https://www.googletagmanager.com/" crossorigin >
  <link rel="dns-prefetch" href="https://www.googletagmanager.com/"  >
  <link rel="preconnect" href="https://suggest.imimg.com/" crossorigin >
  <link rel="dns-prefetch" href="https://suggest.imimg.com/"  >
  <link rel="preconnect" href="https://mc.yandex.ru" crossorigin >
  <link rel="dns-prefetch" href="https://mc.yandex.ru"  >
  <link rel="preconnect" href="https://recommended.imutils.com" crossorigin >
  <link rel="dns-prefetch" href="https://recommended.imutils.com"  >
  <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossorigin >
  <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net"  >
  <link rel="preconnect" href="https://www.google-analytics.com" crossorigin >
  <link rel="dns-prefetch" href="https://www.google-analytics.com"  >
  <link rel="preconnect" href="https://adservice.google.co.in" crossorigin >
  <link rel="dns-prefetch" href="https://adservice.google.co.in"  >
 `);
}
function generateShell200(req, data, mcatObj, rehit, dirUrl) {
  let isFirefox = req && req.headers['user-agent'] && req.headers['user-agent'].includes('Firefox') ? true : false;
  // data = parser(req,data,mcatObj,rehit);
  // const schema = require("./generateSchema")(
  //   data.breadcrumb,
  // );
  let canonicalUrls = getCanonicalLinks(req.originalUrl,data.isq_filter)
  const meta = require("./generateMeta")(
    data. mcatmetadata,
    req.hostname,
    req.originalUrl,
    data.mcatImg250 ? data.mcatImg250.replace('http:','https:') : "",
    '',
    rehit? 0:data.index ,
  );
  const title = data.mcatmetadata.title;
  // data.path = decodeURIComponent(data.path);
  let mcatShell = GblComFunc.APP_SHELL_STRUCTURE();
  // let glidValue = req && req.cookies && req.cookies.ImeshVisitor && req.cookies.ImeshVisitor.match(/glid=([^|]+)/i) ? req.cookies.ImeshVisitor.match(/glid=([^|]+)/i)[1] : '';
  // mcatShell.NEW_HEADER = true;
  // mcatShell.GLID = glidValue;
  // mcatShell.STATUS = 200;
  mcatShell.TITLE = `<title>${title}</title>`;
  mcatShell.META = meta;
  mcatShell.ORG_SCHEMA = '';
  mcatShell.PRE_CONNECTS = '';
  // console.log(mcatShell, "McatShell");
  // mcatShell.HEAD_SCRIPTS = `<script type='application/ld+json'>${JSON.stringify(
  //   schema
  // )}</script>` + preloadedChunks(data.firstListData, req);
  mcatShell.BODY_SCRIPTS = `window.__MCATSTATE__ = ${JSON.stringify(
    data
  )}; 
   window.__ISMCAT__=true`;
  // mcatShell.SEARCHBAR = "MCAT";
  // if (data.path.includes('impcat') || data.path.includes('/city/')) {
    //   let detailsArr = [];
    //   let i; 
    //   let mcatidsNewBB = ["246", "53301","106200","65358","142267","142265","155378","29849","142266","77610","180851","184469","56246","155377","166885","191959","41711","52852","155376","179439","99722","145461","167614","52841","146633","188730","120829","88399","29858","221397","222945","167620","166957","120873","160851","52842","167626","52854","150502","37447","52840","167623","167631","154242","160473","167632","155375","6777","226830","167621","6778","29857","161587","160786","39148","167619","151487","209201","191128","107078","53823","11585","32354","111921","167629","39145","120866","53825","87392","24228", "41125", "158504", "118095", "148845", "185629", "146949", "140216", "39194", "176452", "181022", "192243", "150506", "187341", "154512", "182971", "180855", "111460", "39599", "52845", "110006", "181023", "180705", "181401", "159416", "141923", "31229", "27591", "33838", "191137", "158523", "26017", "138047", "184538", "36984", "140213", "106937", "118093", "184539", "140220", "186259", "167723", "162105", "73191", "85942", "117502", "107291", "159556", "140217", "150124", "115985", "84522", "110010", "49819", "191799", "42980", "148784", "42108", "26122", "190027", "183620", "187981", "53407", "171524", "138566", "4557", "130029", "159123", "42117", "164798", "141648", "1503", "164455", "156484", "1413", "155144", "80867", "120980", "191087", "138563", "35796", "159641", "146509", "65902", "6036", "178582", "80503", "16496", "84687", "182529", "186762", "55099", "143882", "159389", "164511", "55082", "138431", "37535", "8289", "84146", "145603", "192076", "187422", "36612", "84147", "65900", "192075", "33002", "142297", "42116", "55895", "179061", "183164", "187593", "188350", "122163", "187025", "13727", "81164", "84383", "34039", "133110", "40360", "45727", "87774", "154409", "114505", "132703", "44692", "84375", "147288", "3476", "84380", "145451", "40740", "84386", "84378", "26573", "1414"]
    //   let catidsNewBB = ["589","151", "170", "360", "502", "782", "565", "458", "653", "850","209","455","202","465","810","135","147"]
    //   let catIdEkta = ["601","788"]
    //   let bbBoard = (mcatidsNewBB.includes(data.mcatId) || catidsNewBB.includes(data.catId)) ? true : false;
    //   let ektabbb = catIdEkta.includes(data.catId) ? true : false;
    //   let cardlen = data.firstListData && data.firstListData.length && data.firstListData.length < 29 ? data.firstListData.length : 29;
    //   let youtubedatamcat = data.youTubedata && data.youTubedata[0] && data.youTubedata[0].length && data.youTubedata[0].length < 11 ? data.youTubedata.length : 11;
    //   let catid = data && data.catId ? data.catId : "";
    //   let mcatid = data && data.mcatId ? data.mcatId : "";
    //   let mcatImg125 = data.mcatImg125 ? data.mcatImg125 : "";
    //   for (i = 0; i < cardlen; i++) {
    //     let detailsInnerObj={};
    //     let firstProd = data.firstListData && data.firstListData[i] && data.firstListData[i][0] ? data.firstListData[i][0] : "";
    //     detailsInnerObj["imgUrl_250"] = typeof firstProd.imgUrl_250 != "undefined" && firstProd.imgUrl_250 != 'no_image' && firstProd.imgUrl_250 != '' && !firstProd.imgUrl_250.includes("add-image.gif") && firstProd["imgUrl_250"] ? firstProd["imgUrl_250"] :typeof firstProd.imgUrl_250 != "undefined" && firstProd.imgUrl_250 != 'no_image' && firstProd.imgUrl_250 != '' && !firstProd.imgUrl_250.includes("add-image.gif") && firstProd["imgUrl_250"]? firstProd["imgUrl_250"] : "https://m.imimg.com/gifs/bgIM50.webp";
    //     detailsInnerObj["display_name"] = firstProd['productName'] ? firstProd['productName'] :firstProd['extraPrdName'] ? firstProd['extraPrdName']:"";
    //     detailsInnerObj["productSecondaryName"] = firstProd['productSecondaryName'] ? firstProd['productSecondaryName'] : "";
    //     detailsInnerObj["productUrl"] = firstProd['productUrl'] ? firstProd['productUrl'] : "";
    //     detailsInnerObj["sellerlocation"] = firstProd['sellerlocation'] ? firstProd['sellerlocation'] : "";
    //     detailsInnerObj["companyName"] = firstProd['companyName'] ? firstProd['companyName'] : "";
    //     detailsInnerObj["companyUrl"] = firstProd['companyUrl'] ? firstProd['companyUrl'] : "";
    //     detailsInnerObj["catFlname"] = firstProd['catFlname'] ? firstProd['catFlname']:"",
    //     detailsInnerObj["iilDisplayFlag"] = firstProd['iilDisplayFlag'] ? firstProd['iilDisplayFlag'] : "";
    //     detailsInnerObj["URLtype"] = firstProd['iilDisplayFlag']==0 && firstProd['imgUrl_250'] ?"MINIPDP" : firstProd['iilDisplayFlag']==0 && !firstProd['imgUrl_250']? "COMPANY" : "PDP";
    //     detailsInnerObj["companyContactNo"] = firstProd['companyContactNo'] ? firstProd['companyContactNo'] : "";
    //     detailsInnerObj["companyContactVal"] = firstProd['companyContactVal'] ? firstProd['companyContactVal'] : "";
    //     detailsInnerObj["standardPrice"] = firstProd['standardPrice'] ? firstProd['standardPrice'] : "";
    //     detailsInnerObj["ecom_store_name"] = firstProd['ecom_store_name'] ? firstProd['ecom_store_name'] : "";
    //     detailsInnerObj["ecom_landing_url"] = firstProd['ecom_landing_url'] ? firstProd['ecom_landing_url'] : "";
    //     detailsInnerObj["tsCode"] =  firstProd['tsCode'] ? firstProd['tsCode'] : "";
    //     detailsInnerObj["custTypeWeight"] =  firstProd['custTypeWeight'] ? firstProd['custTypeWeight'] : "";
    //     detailsInnerObj["displayId"] = firstProd['displayId'] ? firstProd['displayId'] : "";
    //     detailsInnerObj["prd_isq"] = firstProd['prd_isq'] ? firstProd['prd_isq'] : "" ;
    //     detailsArr[i] = detailsInnerObj; }
    //   let mcatName =  data.mcatName ?  data.mcatName : "";
    //   let mcatDisplayName = data.mcat_display_name ? data.mcat_display_name : data.mcatName;
    //   let iplockey = req && req.cookies && req.cookies.iploc && req.cookies.iploc.split("|")[0] && req.cookies.iploc.split("|")[0].split("=")[1]!="IN"  ? false : true;
    //   let gaCookie=req && req.cookies && req.cookies._ga?req.cookies._ga:'';
    //   let gaLastDigit= gaCookie&&gaCookie.length>1?(gaCookie[gaCookie.length-1]):'';
    //   let VideoYoutubeData = [];
    // if(youtubedatamcat > 0){
    //   for(let y = 0; y < youtubedatamcat; y++){
    //     let youTubeObj = {};
    //     let videoData = data.youTubedata && data.youTubedata[0] && data.youTubedata[0][y] ? data.youTubedata[0][y] : "";
    //     youTubeObj["LINK"] = videoData.youTubeLink ? videoData.youTubeLink :'';
    //     youTubeObj["NAME"] = videoData.youTubeTitle ? videoData.youTubeTitle :'';
    //     VideoYoutubeData[y] = youTubeObj;
    //   }
    // }
    // let citiesData=[];
    // let j;
    // if(data.cityData.cities && data.cityData.cities.length>0){
    //   let len =  data.cityData.cities.length < 10 ? data.cityData.cities.length: data.path && data.path.includes("/impcat/") ? 10 : 9;
    //   for (j = 0; j < len; j++) {
    //     let citiesInnerObj = {};
    //     let cities = data.cityData && data.cityData.cities && data.cityData.cities[j] ? data.cityData.cities[j] : "";
    //     citiesInnerObj["NAME"] = cities.NAME ? cities.NAME :'';
    //     citiesInnerObj["LINK"] = cities.LINK ? cities.LINK :'';
    //     citiesInnerObj["TITLE"] = cities.TITLE ? cities.TITLE :'';
    //     citiesData[j] = citiesInnerObj; }}
    //   let catData=[];
    //   let k;
    // if(data.categoriesData.length>0){
    //   for (k = 0; k < data.categoriesData.length; k++) {
    //     let catInnerObj ={};
    //     let categoryData = data.categoriesData && data.categoriesData[k] ? data.categoriesData[k] : "";
    //     catInnerObj["NAME"] = categoryData.NAME ? categoryData.NAME :'';
    //     catInnerObj["LINK"] = categoryData.LINK ? categoryData.LINK :'';
    //     catInnerObj["IMAGE"] = categoryData.IMAGE ? categoryData.IMAGE :'';
    //     catData[k] = catInnerObj; }}
    //   let brandsdata=[];
    // if (data.brandsData.length > 0) {
    //   for (k = 0; k < data.brandsData.length; k++) {
    //     let brandInnerObj = {};
    //     let brndData = data.brandsData && data.brandsData[k] ? data.brandsData[k] : "";
    //     brandInnerObj["NAME"] = brndData.NAME ? brndData.NAME : '';
    //     brandInnerObj["LINK"] = brndData.LINK ? brndData.LINK : '';
    //     brandInnerObj["IMAGE"] = brndData.IMAGE ? brndData.IMAGE : '';
    //     brandsdata[k] = brandInnerObj;
    //   }
    // }
    // let bizData = data.bizData;
    // let bizSelected = data.bizName == "" ? "All" : data.bizName;
    // let isqCheck = data.isq_filter && data.isq_filter.data && data.isq_filter.data.length > 0 ? true : false;
    // let isqText = "";
    // let isqHead = '';
    // let isqData = [];
    // if (isqCheck) {
    //   isqText = data.isq_filter && data.isq_filter.CurrentArray && data.isq_filter.CurrentArray.Text ? data.isq_filter.CurrentArray.Text : '';
    //   isqHead = data.isq_filter && data.isq_filter.CurrentArray && data.isq_filter.CurrentArray.Head ? data.isq_filter.CurrentArray.Head : '';
    //   isqData = data.isq_filter && data.isq_filter.data ? data.isq_filter.data : []
    // }
    // let cityNameSelected = data.path.includes('/city/') ? data.path.split("city/")[1].split("/")[0] : '';
    // cityNameSelected = utilities.convertToTitleCase(cityNameSelected)
    // let searchBarText = data && data.vernacularNames && data.vernacularNames[0] && data.vernacularCityName ? '(' + data.vernacularNames[0]['glcat_mcat_altmcat_name'] + ", " + data.vernacularCityName + ')' : '';
    // let mcatNewName = data.path.includes('impcat') ? isqText ? isqText + " " + mcatDisplayName : mcatDisplayName : data.path.includes('/city/') ? `${mcatName} in ${cityNameSelected} ${searchBarText}` : '';

    // mcatShell.Search_String = mcatNewName;
    // let allIndiaLINK = data && data.cityData ? data.cityData.allIndiaLINK : '';
    // mcatShell.IS_MCAT_LCP_NEW = detailsArr.length > 0 ? mcatFirstFold(data, mcatName, citiesData, catData, bbBoard, ektabbb, catid, mcatid, iplockey, data.path, allIndiaLINK, isqText, isqData, isqHead, bizData, bizSelected, brandsdata, VideoYoutubeData, cityNameSelected, mcatShell.NEW_HEADER, gaLastDigit, mcatImg125, isFirefox) : false;
    // console.log(data, "Data is");
    mcatShell.IS_MCAT_LCP_NEW = data.dataList.length > 0 ? mcatFirstFold(data) : false;
  // }
  mcatShell.Is_Mcat = true;
  mcatShell.CANONICAL_LINKS = "";
  mcatShell.STATUS = 200;
  return mcatShell;
}
// function mcatFirstFold(mcatCardsData, mcatName, citiesData, catData, bbBoard, ektabbb, catid, mcatid, iplockey, path, allIndiaLINK, isqText, isqData, isqHead, bizData, bizSelected, brandsdata, VideoYoutubeData, cityNameSelected, glidValue, gaLastDigit, mcatImg125, isFirefox) {

function mcatFirstFold(serviceData,iplockey) {

  return (
    `<style>
  * {margin: 0;padding: 0;box-sizing: border-box;outline: 0;border: none} .pd1_0{padding: 2px 0 1px 0;}.clrb{color: black} .bgw {background-color: #fff}.oh {overflow: hidden}.tc {text-align: center}.pd10{padding: 10px}.pd4008{padding : 4px 0px 0px 8px}.crx:after {content: "";visibility: hidden;display: block;height: 0;clear: both} .t_tc {text-transform: capitalize}.fw{font-weight: 700}.fs18 {font-size: 18px} .pdb5{padding-bottom: 5px} .pdb20{padding-bottom:20px} .fs13{font-size: 13px} .clr33{color: #333}.tl {text-align: left}.fs16 {font-size: 16px}.pdb10 {padding-bottom: 10px}.clr5a {color: #5a5a5b}.truncateH{white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .mt2 {margin-top: 2px}.fs15 {font-size: 15px}.fs12{font-size:12px;}.bxrd20{border-radius: 20px}.bxsdw{box-shadow: 0 1px 2px rgb(0 0 0 / 20%)}.por {position: relative}.w48 {width: 48%;}.w47{width: 47%;}.pdt12{padding-top: 12px;}.pdb12 {padding-bottom: 12px;}.pdb14 {padding-bottom : 14px;} .pdt14 {padding-top : 14px;} .Menu_icon {background-position: 0 2px;cursor: pointer;height: 21px;left: 15px;top: 12px;width: 23px;z-index: 100;}.poa {position: absolute;} .tseaIco{background-image: url(https://m.imimg.com/gifs/img/ver-icon.svg) !important; background-position: inherit !important;}.verifiedSvg{background-image: url(https://m.imimg.com/gifs/img/verifiedSvg.svg) !important;}.verifiedSvgGr{background-image: url(https://m.imimg.com/gifs/img/verifiedSvg-gray.svg) !important;} .tseaIco,.verifiedSvg,.verifiedSvgGr{background-repeat: no-repeat; background-position: inherit !important;}@media only screen and (min-width: 1024px) {body {  max-width: 500px;  margin: 0 auto;}}.ht78{height: 78px;}.pdl6{padding-left:6px;}.mb8{margin-bottom:8px;} .aic{align-items: center}.newFilter{border: 1px solid #247F79; background-color: #F7FFFE; border-radius: 10px; margin: 5px 2px;} .clrg{color: #096259}.tai{text-align: initial;}.htauto{height:auto;}.fillbtn{background-color: #2e3192!important; border: 1px solid #2e3192!important;}
  .fl {float: left}.dib {display: inline-block;}.w100 {width: 100%;}.ctIco:before,.wh15 {height: 15px;width: 15px}.ctIco:before {content: "";position: absolute;top: 0;left: 0;background-image: url(https://m.imimg.com/gifs/img/mcat_sprite_v5.png);background-repeat: no-repeat;background-position: -111px -9px;margin: 0 5px 0 0}.mb10 {margin-bottom: 10px}.mb1{margin-bottom : 1px}.mcatIcon {background-image: url(https://m.imimg.com/gifs/img/mcat_sprite_v5.png);background-repeat: no-repeat}.loc_icon{background-position:-110px -10px}.cmpIco{background-position:-91px -42px}.mcatLocationIco {background-position: -55px -7px;background-size: 187px;width: 15px;height: 20px;transform: scale(.7);margin-top: -3px;margin-left: -8px}.db {display: block}.dt {display: table}.mauto {margin: auto;}.vam {vertical-align: middle}.dtc {display: table-cell}.clrBl {color: #2e3192}.clrw {color: #fff !important;}.Schip a, .Uchip a ,.InUchip a,.InSchip a {color: #000;text-transform: capitalize;}.Schip{ background-color: #9acfca; border-color: #9acfca; color: #000;margin-right:6px;position: relative; vertical-align: middle; border-radius: 5px; display: inline-block; padding: 5px 8px; } .Uchip{ background-color: #dadbdc; border-color: #dadbdc; color: #000;margin-right:6px;position: relative; vertical-align: middle; border-radius: 5px; display: inline-block; padding: 5px 8px; }.marginIcon{margin-left:7px;margin-right: 7px;margin-top: 8px}.nearmeCss {border: 1px solid #2e3192; display: inline-block;position: relative;vertical-align: middle;border-radius: 5px;padding: 5px 8px}
  .oAuto{overflow: auto}.oAuto::-webkit-scrollbar{display:none}.wnr{white-space: nowrap}.ml15{margin-left: 15px}.mb5{margin-bottom: 5px}.pdb7 {  padding-bottom: 7px}.pdl15{padding-left: 15px}.pdl10{padding-left: 10px;}.df{display: flex;}.jc{  justify-content: center;}.clr5e{color:#5e5e5e}.clgrey{color: #595959;}.fwn{font-weight: 400}.brd25 {border-radius: 25px}.mt10 {  margin-top: 10px}.nenqM {left: 0; top: 0; z-index: 9999; height: 100%}.enqfrm{position: fixed; margin-bottom: 5px}.pf {position: fixed}.z10000 {z-index: 10000 !important}.ovfy {overflow-y: scroll}.ht100{height: 100%}.enqMain {padding: 52px 0 20%}.ht52{height: 52px}.z9 {z-index: 9} .t0 {top: 0}.r0 {right: 0}.pdlr8 {padding: 5px 12px}.mr10{margin-right: 10px}.scWrap{overflow-x:scroll;overflow-y:hidden;white-space:nowrap}.InSchip{ background-color: #9acfca; border-color: #565353; color: #000;margin-right:6px;position: relative; vertical-align: middle; border-radius: 5px; display: inline-block; padding: 5px 8px; } .InUchip{ border: 1px solid #247f79; background-color: #fff; box-shadow: 1px 1px 8px 0 #e3e3ee; color: #000;margin-right:6px;position: relative; vertical-align: middle; border-radius: 5px; display: inline-block; padding: 5px 8px; }
  .scWrap::-webkit-scrollbar{display:none}.ml5 {margin-left: 5px}.pdt16 {padding-top: 16px}.pdb17 {padding-bottom: 17px} btmBodr {border-bottom: 1px solid rgba(204, 204, 204, .5)} .txtElip {text-overflow: ellipsis; overflow: hidden;  white-space: nowrap} .fs20 {font-size: 20px}.mb20 {margin-bottom: 20px} .nspac {justify-content: center; display: flex; align-items: center; margin: 0 15px}.prdImg {width: 50px; height: 50px; flex-shrink: 0}.prdImg img {max-height: 50px; max-width: 50px; position: absolute; top: 50%;  left: 50%; transform: translate(-50%, -50%)}.handleNext1 {color: #fff; background: #d3d3d3;}.mrla {margin-left: auto; margin-right: auto;}.w70 {width: 70%;}.tuc{text-transform: uppercase;}.enqmim2 {background: #d3d3d3 !important;}.mbg {background-color: rgba(51, 51, 51, .7); height: 100%; left: 0; top: 0; width: 100%; z-index: 112 !important; min-height: 100vh; display:none; position: fixed}.mt15p {margin-top: 15%}.w90 {width: 90%}.bxrd4 {border-radius: 4px}.z9999 {z-index: 9999}.malr {margin-left: auto; margin-right: auto}.lr0 {  left: 0; right: 0}.bge5 {background-color: #e5f7f5}.pdt15 {padding-top: 15px}.pdt18 {padding-top: 18px}.tp-40 {top: -40px} .prd_img {width: 50px} .m5 {margin: 5px}.mml14 {margin-left: -14px}.wh13 {width: 13px; height: 13px} .bgNorepeat {background-position: 50%; background-repeat: no-repeat}.bxgr {box-shadow: 0 1px 10px 0 rgb(0 0 0 / 30%); border-radius: 20px 20px 6px 6px;}.compCl{background-color: #0AA699; background-image: linear-gradient(90deg, #00a699, #0AA699)} .fs14 {font-size: 14px}.mr5 {margin-right: 5px}.enqIcnGreen {background-image: url("https://m.imimg.com/gifs/img/green-btn.svg");background-repeat: no-repeat;background-position: 0 0;width: 17px;height: 12px;}.aligCen { display: flex; flex-direction: column; justify-content: center;}.wb {word-break: break-word;}.lineClamp3,.lineClamp4 {display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;}.mnht99{min-height:99px;}.pdrl15{padding: 10px 20px;}.enqIcn{ background-image: url("https://m.imimg.com/gifs/img/enqIcn.svg"); background-repeat: no-repeat; background-position: 0 0; width: 17px; height: 12px; }
  .pdt20{padding-top: 20px;}.enqBx{border-radius: 6px; box-shadow: 0 2px 4px 0 rgb(212 212 212 / 50%);  border: solid .5px #e3e3e3; padding-bottom: 20px; position: relative}.m7{margin: 7px}.blanket{position: fixed; overflow: hidden; height: 100%; width: 100%} .ml10{margin-left: 10px} .mt5{margin-top: 5px} .eCon{width: 65px; border-right: 1px solid #8e8e8e; padding: 0 0 0; background-color: #f1f1f1; left: 2px; font-weight: 400; font-size: 20px; position: absolute; top: 2px; border-radius: 4px 0 0 4px; line-height: 40px}.cmcode {font-size: 20px; width: 64px; border-right: 1px solid #8e8e8e; background-color: #f1f1f1}.ht48{height: 48px}.br8e {border: 1px solid #8e8e8e}.flx {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex}.lh1_3em{line-height:1.3em}.pdt8 {padding-top: 8px}
  .relatedimg70{width:70px;height:70px}.widgetBorder{border:1px solid #247F79;box-shadow:1px 1px 8px 0 #e3e3ee;width:85px;border-radius:6px;padding:4px 4px 0}
.ht120{height:120px}.mr8{margin-right:8px}.vat{vertical-align:top}.pdb15 {padding-bottom: 15px;}.ht178{height:178px}.pdt10 {padding-top: 10px}.pdt5 {padding-top: 5px}.ht42{height: 42px;}.dn{display: none}.maxh80{max-height: 80px;} .pdl7{padding-left: 7px}.lh20 {line-height: 20px;} .bg6d {background-color: #6d6d6d}.clr7B {color: #7b7b7b}.mobileInput::placeholder {font-size: 14px; font-weight: normal;} .lFocused label {transform: translate(15px, -12px); font-size: 13px; color: #2e3192; background-color: #fff;}.txtLabel1 {pointer-events: none;  transform: translate3d(72px, 15px, 0) scale(1);  transform-origin: left top; transition: 100ms; font-size: 16px; color: #a0a0a0;  z-index: 1; position: absolute;}.lFocused .txtLabel1 {font-size: 13px; color: #2e3192; background-color: #fff;  padding: 1px 5px;  transform: translate3d(72px, -8px, 0) scale(1);}.clrmim{color: #00a699;}
.lFocused input {border-color: #2e3192; border-width: 2px; padding-right: 40px}.inp-head::before {content: " "; height: 16px; width: 100%; top: 3px; position: absolute; z-index: 1;background-color: #00a699}.inp-bx {background: #ffff;height: 35px; border-radius: 18px;  box-shadow: 0 1px 5px 0 #a1a1a1; border: solid 1.2px #0aa69a; outline-width: thick; background-color: #fff; padding: 0 10px; width: 90%; z-index: 2} .srchIcn{margin-top: 8px; position: absolute; left: 11px}.srchIp{font-size: 15px !important; font-weight: 400 !important; width: 85%; padding: 9px 0 0 25px; background: 0 0}.srchIcn::placeholder {color: #a0a0a0}.voiceIcon{top: 0; right: 0;  height: 36px; width: 44px; text-align: center; line-height: 48px}.lft0 {left: 0}.ht35{height: 35px}.top-2{top: -2px}.pdl28{padding-left: 28px;}.bdrmim{border: 1px solid #00a699}.clrmimmcat{color: #008073;}.ellipse{text-overflow: ellipsis;}.mtauto{margin-top:auto;}.bxrdNR{border-radius:20px 0 0 20px}.mb0{margin-bottom: 0!important;}.viewsIcon {background-position: -85px -64px;  transform: scale(0.5); width: 33px; height: 22px; margin-top: 0px;}.enquiryIcon{background-position: -43px -63px; transform: scale(0.5); width: 36px; height: 31px;}.mxht150 {max-height: 150px}.mt3{margin-top: 3px}.mxw150 {max-width: 150px}.imgDiv{flex-shrink: 0}.w150p{width: 150px}.ht150px{height: 150px}.lineClamp2{display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;  overflow: hidden} .lineClamp4{display: -webkit-box; -webkit-line-clamp: 1;}.ellipsis:after {content: ""; position: absolute; top: 0; right: 0; width: 20px; height: 28px; background: -webkit-linear-gradient(left, hsla(0, 0%, 100%, 0) -100%, hsla(0, 0%, 100%, .69) 87%); background: -o-linear-gradient(left, hsla(0, 0%, 100%, 0) -100%, hsla(0, 0%, 100%, .69) 87%);background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) -100%, hsla(0, 0%, 100%, .69) 87%)}.ellipsis{text-overflow: inherit; overflow: hidden; white-space: nowrap}.bgef {background-color: #efefef}#gblLoader {display: none}.mSpinnerP {width: 70px; height: 70px; display: inline-block; overflow: hidden; background: transparent; visibility: hidden;}.centerAlign{position: fixed;z-index: 9999;top: 0;bottom: 0;left: 0;right: 0;bottom: 0; margin: auto}@keyframes mSpinner {0% {transform: rotate(0)} 100% {transform: rotate(360deg)}}
.mSpinner div {box-sizing: border-box !important}.mSpinner>div {position: absolute; width: 68px; height: 68px; top: 16px; left: 16px;  border-radius: 50%; border: 4px solid #000; border-color: #ededed transparent #ededed transparent; animation: mSpinner 1s linear infinite}.mSpinner>div:nth-child(2),.mSpinner>div:nth-child(4) {width: 58px;  height: 58px;  top: 21px;  left: 21px;  animation: mSpinner 1s linear infinite reverse}.mSpinner>div:nth-child(2) {border-color: transparent #009688 transparent #009688}.mSpinner {  width: 100%; height: 100%; position: relative; transform: translateZ(0) scale(.7); backface-visibility: hidden; transform-origin: 0 0}.mSpinner div {box-sizing: content-box}@keyframes spin1 {to {-webkit-transform: rotate(360deg);}}@-webkit-keyframes spin1{to {-webkit-transform: rotate(360deg);}} .lcldr1{border: 4px solid #f3f3f3; border-radius: 50%; border-top: 4px solid #2e3192; width: 40px; height: 40px; -webkit-animation: spin1 1s linear infinite; animation: spin1 1s linear infinite}.Blackbg {background: rgba(51, 51, 51, 0.7); width: 100%; height: 100%; z-index: 112; position: fixed; top: 0; bottom: 0; display: none;}.pos40{position: relative; top: 40%; left: 40%;}.pos45 {position: relative; top: 10%; left: 45%;}.pd5{padding: 5px;}.objctFitSclDown{object-fit: scale-down}.centerItems{justify-content: center; align-items: center}.Eloader{background: white; width: 100%; height: 100%; z-index: 112; position: fixed; top: 0; display: none;}.pd7{padding-left: 7px;}.pd6_0{padding: 6px 0;}.fw600{font-weight: 600;}.pd40{padding: 4px 0;}
ol,ul{list-style: none}.pdt4{padding-top: 4px}.pdt6{padding-top: 6px}.pdb4{padding-bottom: 4px}.lineClamp{ display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden}.whNr{white-space: normal}.fs11{font-size: 11px}.bAd{width: 100%; background: #e3e3e3;position: relative;}.bAd:after{content: "Ad"; position: absolute; transform: translate(-50%, -50%); left: 50%; top: 50%; border: 1px solid #6c7275; font-size: 10px; padding: 2px 8px; border-radius: 4px;}.buyicn {background-image: url("https://m.imimg.com/gifs/img/buyicn.svg")}.pdr14{ padding-right: 14px}.pdl5 {padding-left: 5px;}.pdr5{ padding-right: 5px}.pdl20{padding-left: 20px}.mt11{margin-top: 11px;}.adCss{height: 270px}.bbAd{height: 280px; margin-bottom: 8px; }
.callIcnN{background-image: url("https://m.imimg.com/gifs/img/green-call.svg"); background-repeat: no-repeat; background-position: 0 0; width: 16px; height: 16px;}.appLikeCtaG{ background-color: rgb(10, 166, 153); border: 2px solid rgb(10, 166, 153); background-image: linear-gradient(90deg, rgb(10, 166, 153), rgb(10, 166, 153)); } .appLikeCtaGBrd{border-radius: 0 20px 20px 0;}.inputFieldAB {display: flex;height: 48px;border: 2px solid #a9a9a9;padding-right: 5px;}.bxrd25 {border-radius: 25px;}.mobimgAB{background-color: rgba(226, 222, 222, 0.29);border-right: 1px solid #8e8e8e;width: 65px;border-radius: 25px 0px 0px 25px;}.mt20{margin-top: 20px;}.trgABi{transform: translate3d(83px,15px,0) scale(1) !important;}.lFocused .trglABi{transform: translate3d(36px, -8px, 0) scale(1) !important;background-color: white !important;}.br32ABi{border-radius:32px 0px 0px 32px !important;}.bwABi{background-color: white !important;}.ht44{height:44px;}.bxrd32{border-radius:32px !important;} .mt35{margin-top:35px;} .ht44{height:44px;}.pl10{padding-left: 10px;}.ht210px{height: 210px}.brdb{border-bottom: 1px solid #cbcbcb}.w280{width: 280px;}.mcatVideo:after{width: 40px; height: 28px; background: #f61c0d; border-radius: 8px; top: 77px }.mcatVideo:before { width: 0; height: 0; border-top: 8px solid transparent; border-bottom: 10px solid transparent; border-left: 14px solid #fff; z-index: 2; transform: scale(.7); top: 82px}.mcatVideo:after,.mcatVideo:before{cursor: pointer; position: absolute; content: ""; right: 0; left: 0; margin: auto}.bggre {background-color: rgba(0,0,0,.5);}.bt0 {bottom: 0;}.ht40{height: 40px}.w100px{width: 100px;}.ht75{height : 75px}.pdr10{padding-right:10px}
.scWrap {overflow-x: scroll; overflow-y: hidden; white-space: nowrap;}
.lh24 {line-height: 24px;} .tp4{top: 4px;}
.whatsAppIcn {
  background: linear-gradient(90deg, #49c557, #28b13d);
  width: 19px;
  height: 21px;
  position: relative;
  border-radius: 100%;
}
.whatsAppIcnpos {
  left: -1px;
  top: -1px;
}
@media only screen and (min-width: 980px) {

  body{
      max-width:100%
  }
  ul#articles_1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
}
// #dispdesktop{
//   display:inline-block;
// }
// #dispmobile{
//   display:none;
// }
}
</style>

    <div id="LcpDivMcat" class="bgef">
    
      ${renderToString(<FirstFoldMcat serviceData={serviceData}  />)}

      <ul id="articles_1">
      ${(serviceData.dataList).map((data, index) => {
      let companyUrl = CompanyUrl(data.companylink);
      let redirectionURL = data.searchUrl? data.searchUrl: data.URLtype == "COMPANY" ? `/${companyUrl}` : "";
      let verifiedIcon = ""; 
      if (data.custtypeWeight1 <= 699) { verifiedIcon = "verifiedSvg " } else if (data.custtypeWeight1 > 699 && data.custtypeWeight1 < 1400) { verifiedIcon = "verifiedSvgGr " } else { verifiedIcon = "cmpIco " }
      let icon = ""; if (data.custtypeWeight1 == 149 || data.custtypeWeight1 == 179 || data.tsCode) { icon = "tseaIco"; } else if (data.custtypeWeight1 != 750) { icon = verifiedIcon; } else { icon = ""; }
      let newdisplayName = '';
      if (data.prdName.includes(">")) newdisplayName = data.prdName.replace(">", "");
      // let usrloc =data.sdaGlusrUsrLocality ? data.sdaGlusrUsrLocality + ', ':''
      let loc= (data.city ? data.city:'')
      return `


        ${renderToString(<ProductCard path={''} redirectionURL={data.pcItemUrlName} display_name={data.prdName} productSecondaryName={data.pcItemSecondaryName} companyUrl={companyUrl} icon={icon} companyName={data.company} sellerlocation={loc} prd_isq={data.prdIsqList} standardPrice={data.standardprice} imgUrl_250={data.photo250} displayId={data.dispId} newdisplayName={newdisplayName} URLtype={''} tsCode={data.tscode} companyContactNo={data.compContct} index={index + 1} ecom_store_name={''} ecom_landing_url={''} companyContactVal={data.compContctVal} product={data} showModal={''} mcatId={''} mcatName={''} catId={''} productIndex={index + 1} listNumber={"1"} utmText={''} tracking={''} lastgadigit={''} usermode={''} vernacularData={''} checkUserStatus={''} isqTracking={''} callNowClick={''} />)}

        `}).join("")}
      </ul>

</div>
<div id="loaderDiv"><div id="blackCallBg" class="Blackbg"><div  class="lcldr1 pos40"></div></div><div id="enqLoader" class="Eloader" ><div  class="lcldr1 pos45"></div></div></div>
<div id="pdpcalldiv" style="display:none">
<div><div class="mbg" style="display: block; z-index: 1007 !important;"></div><div class="mt15p w90 bxrd4 pf z9999 malr tc lr0 bge5 pdt15 tp-40"><div id="callNowDiv"><div class="callImgBox"><img class="prd_img callPrdImg" src="" alt="Company Name" id="lcpCallImg" /></div><h2 class="db m5 fs16 callPrdCompName"></span><span id="lcpCallCompName">Company Name</span></h2><div class="por fs15 dib mb10 callPrdNumber"><span class="callIcnN wh13 bgNorepeat poa mml14 mt2"></span><span id="lcpCallCompNo">+91 - XXXXXXXXXX</span></div></div><div>
<div class="mauto bgw pd10 bxgr"><div class="pd10"><span class="db m5 fs16 fw">Enter your Mobile Number to call this Seller</span></div><div class="inputFieldAB bxrd25"><dl class="mobimgAB fs20 pd10 fw">+91</dl><input id="mobNo1" class="w100 pdl7 mauto bxrd4 fw fs20 mobileInput" placeholder="Enter 10 digit Mobile Number" maxlength="10" type="tel" autocomplete="tel"/></div><div class="tc mb10"></div><div id="CallNowLoginErr" class="tc mb10"></div><input type="button" value="Submit" id="submitBtnLCP" disabled class="tc db clrw fs18 fw pd10 pdl15 bxrd25 w100 ht48 bxsdw mt20 mb20 bg6d" /><span id="closeBtn" class="fs13 pdb5 clr7B mt10">Close and Continue Browsing</span></div></div></div></div>
</div>
${iplockey ? callABEnquiry(gaLastDigit) : ""}
</div>
    <script>
    window.isMcatLcpNew = true;
    document.getElementById("closeBtn").onclick = function closeCallPopUp() {
      window.callClick = false;
      document.getElementById("pdpcalldiv") ? document.getElementById("pdpcalldiv").style.display == 'block' ? document.getElementById("pdpcalldiv").style.display = 'none' : '' : '';
  }
  function loader(){
    document.getElementById("mcatloader") ? document.getElementById("mcatloader").style.visibility == 'hidden' ? document.getElementById("mcatloader").style.visibility = 'visible' : '' : ''; }
  function getImCookie(e) {
      e.name;
      var n, t = !1,
          o = new Array;
      o = document.cookie.split(";");
      for (var a = 0; a < o.length; a++) {
          var i = o[a];
          if(i.length>0){
             i = i.trim(); }
          if (i.replace(/^\s+|\s+$/g, "").split("=")[0] == e.name) {
              var c = (i = unescape(i)).indexOf(e.name + "=");
              switch (n = c > -1 ? i.substring(e.name.length + 1) : "", e.flag) {
                  case 0:
                      c > -1 && (t = !0);
                      break;
                  case 1:
                      t = -1 != c && splitWithPipe(n);
                      break;
                  case 2:
                      t = e.keyValue ? splitWithPipe(n)[e.keyValue] : splitWithPipe(n);
                      break;
                  default:
                      t = splitWithPipe(n)
              } } }
      return t
  }
  function splitWithPipe(e) {
      var a = new Array;
      a = e.replace(new RegExp("\\\\+", "g"), " ").split("|");
      var g = {};
      for (i = 0; i < a.length; i++) {
          if (1 == a.length) {
              return a[0] }
          var h = a[i];
          g[h.split("=")[0]] = h.split("=")[1] }
      return g
  }
  let imesh = getImCookie({	
      name: 'ImeshVisitor',	
      flag: 2,	
      keyValue: ''  });
  let iploc = getImCookie({	
      name: 'iploc',	
      flag: 2,	
      keyValue: 'gcniso' });
  let identifiedUser = imesh ? true : false;
  if(window.location.href && window.location.href.includes('waId') && !identifiedUser && document.getElementById("enqLoader")) {
    document.getElementById("enqLoader").style.display = 'block';
    var timerId = setTimeout(function() { document.getElementById("enqLoader") ? document.getElementById("enqLoader").style.display = 'none' : ''; (typeof timerId != 'undefined') ? clearTimeout(timerId) : ''; }, 5000);
  }
  function checkimEqGl(){
     let check = localStorage.getItem('imEqGl')? localStorage.getItem('imEqGl'):'';
     if(check)
      return ("converted");
    else
       return ("Non-converted"); }
  let usertype = checkimEqGl();
  
  document.getElementById("ektabbbuser") ?  document.getElementById("ektabbbuser").style.display = 'block' : document.getElementById("bbUsers") ?  document.getElementById("bbUsers").style.display = 'block' : '';

  function invokeEnquiry(imgUrl_250, display_name, index) {
      window.enquiryClick = true;
      window.mcatCardIndex = index;
      identifiedUser || iploc != "IN" ? (document.getElementById("enqLoader") ? document.getElementById("enqLoader").style.display = 'block' : ''):"";
      document.getElementById("pdpenquirydiv") && !identifiedUser ?(document.getElementById("pdpenquirydiv").style.display = 'block',document.getElementById("lcpEnqImg").src=imgUrl_250, document.getElementById("lcpEnqProdName").innerHTML=display_name):"";
    };
  function handleCallBtn (imgUrl_250,tsCode, companyContactNo, companyName, index, companyContactVal) {
      window.callClick = true;
      window.mcatCardIndex = index;
      window.callClick ? document.body.style.overflow =  "hidden" :'' ;
      identifiedUser || iploc != "IN" || companyContactVal == 'PNS' ?  (document.getElementById("blackCallBg") ? document.getElementById("blackCallBg").style.display = 'block' : '') : document.getElementById("pdpcalldiv") ? document.getElementById("pdpcalldiv").style.display == 'none' ? (document.getElementById("pdpcalldiv").style.display = 'block',document.getElementById("lcpCallImg").src=imgUrl_250, document.getElementById("lcpCallCompName").innerHTML=companyName, document.getElementById("lcpCallCompNo").innerHTML=companyContactNo): '' : ''; }
  function handleUI(e) {
      let elemName = "label-code";
      let element = document.getElementById(elemName);
      if(document.getElementById(elemName) &&  document.getElementById(elemName).classList){
          document.getElementById(elemName).classList.toggle('lFocused', (e.type === 'focus' || e.target.value.length > 0));   
      }}
    document.getElementById("username1") ? document.getElementById("username1").onfocus = function setUI(e) {
      handleUI(e); } :''
    document.getElementById("username1") ? document.getElementById("username1").onblur = function setUI(e) {
      handleUI(e); } :''
   window.onpopstate = function () {
       window.callClick = false;
       window.enquiryClick = false;
       document.getElementById("pdpcalldiv") ? document.getElementById("pdpcalldiv").style.display = 'none' : '';
       document.getElementById("pdpenquirydiv") ? document.getElementById("pdpenquirydiv").style.display = 'none' : ''; }
    </script>`
  )
}
function callABEnquiry(gaLastDigit) {
  return (
    `<style>
.sellerfont{font-family: Arial; font-size: 12px; font-weight: 700; letter-spacing: 0.15000000596046448px;} .pdt59{padding-top: 59px;}
.submitTop1{width: 30px; height: 30px; border-radius: 50px; background-color: white; border: 1px solid gray;}.prImg { width: 74px; height: 92px; overflow: hidden; flex-shrink: 0; } .prImg img { max-width: 100%; max-height: 100%; width: 74px; height: 92px; position: absolute; top: 46px; left: 35px; border-radius: 8px; transform: translate(-50%, -50%); } .prdnm { height: 92px; display: flex; align-items: center; font-family: Arial; font-size: 14px; font-weight: 700; line-height: 21px; letter-spacing: 0.15000000596046448px; text-align: left;} .containerbg { background: #EBFBFA; } .centered-text { text-align: center; line-height: 1.5; width: 100%; max-width: 300px; margin: 0 auto; margin-top: 12px; margin-bottom: 10px; } .bxrd8 { border-radius: 8px; } .brdgreen { border: 1px solid #4AA399; } btmBodr {border-bottom: 1px solid rgba(204, 204, 204, .5)} .handleNext2{ color: #fff; background: #d3d3d3; }
</style>
<div id="pdpenquirydiv" style="display:none">
       <div class="ovfy ht100 enQMain"><div><div><div class="bgw pf w100 enqfrm nenqM z10000"style="overflow-y:scroll;overflow:hidden;height:108%"><div class="ht100 enQMain ovfy"><div>
       <div class=" ht52 crx  bgw w100 pf z9 t0"><span class="poa r0  bxrd20 pdlr8 mt10 mr10 fs16 submitTop1"><i class="dib vam "><svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13"><path fill="gray" fill-rule="nonzero" d="M6.748 7.144l-5.28 5.59a.826.826 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.827.827 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643a.936.936 0 0 1-.252.644z"></path></svg></i></span><p class="fs15 tl ht52 pdt16 pdb17 fw btmBodr"><span class="db txtElip fs20 pdl10 tl btmBodr">सर्वोत्तम मूल्य प्राप्त करें</span></p></div>
       <div class="ht100 enqMain"><div class="bgw pdt20 mb20"><div class="nspac"><div class="por prImg"><img id="lcpEnqImg" src=""/></div><div id="lcpEnqProdName" class="prdnm pdl10">Product Name</div></div></div>
       <div class="enqBx m7 containerbg"><div><div class="blanket dn" id="blanket"></div><div class="centered-text">Submit your  number to get<br><b>BEST PRICE</b> from seller</div><div id="num_div"><div id="label-code" class="por ml10 mr10 mt5"><label for="username" class="trgABi trglABi txtLabel1" id="txtMob" style="">Enter Your Mobile Number<span class="cr">*</span></label><label for="username" id="txtEmail" class="txtLabel1" style="display: none;">Enter Email Id<span class="cr">*</span></label><div id="input_code" class="poa t1l2"><dl class="tc cmcode eCon br32ABi bwABi" id="cm_code" style="">+91<div class="dib ml5 pr20 z9 bdrb33" id="loginFlagbl"><span class="arrow_login"></span></div></dl><dl class="tc for_usr eCnfl etl cmcode poa" id="em_code" style="display: none;"></dl></div><input id="username1" name="username" type="tel" class="ht44 w100 fs18 bxrd8 brdgreen" autocomplete="tel" maxlength="10" style="padding-left: 72px;"><div style="height: 5px;"><input type="tel" id="numHidden" name="tel" autocomplete="tel" style="height: 0px; opacity: 0; width: 0px; padding: 0px; overflow: hidden;"><input type="text" id="emailHidden" name="email" autocomplete="email" style="height: 0px; opacity: 0; width: 0px; padding: 0px; overflow: hidden;"><input type="text" id="nameHidden" name="name" autocomplete="name" style="height: 0px; opacity: 0; width: 0px; padding: 0px; overflow: hidden;"><input type="tel" id="pinHidden" name="postal-code" autocomplete="postal-code" style="height: 0px; opacity: 0; width: 0px; padding: 0px; overflow: hidden;"><input type="text" id="cityHidden" name="city" autocomplete="address-level2" style="height: 0px; opacity: 0; width: 0px; padding: 0px; overflow: hidden;"></div><div id="err" class="error_msg mt10"></div><div id="truecallerErr" class="error_msg mt10 dn tc">Could not fetch your details through truecaller, please try login by entering mobile number.</div></div></div></div><div class="clrw fs18 tc fw pdt12 pdb12 mrla  w70 handleNext2" id="identify" style="border-radius: 25px;">Submit</div>
      ${gaLastDigit == '0' ? `<div class="db ml10 mr10 mt11 tc sellerfont" id="no_text"><span>Don’t worry! You won't receive spam calls</span></div>` : gaLastDigit == '1' ? `<div class="db ml10 mr10 mt11 tc sellerfont por" id="no_text"><span>We offer a completely spam-free experience.We will </span><span>never contact you unless you request us to do so. </span></div>` : `<div class="db ml10 mr10 mt11 tc sellerfont" id="no_text">Seller will share product details on this number</div>`}
      <div class="lcldr ma dn mt10" id="lcldr"></div></div>
      <div></div></div></div></div></div></div></div></div>
        </div>`)
}

function CompanyUrl(url) {
  let companyUrl = url;
  let res = [];
  if (url.includes("indiamart.com")) {
    res = url.split("/");
    res.pop();
    companyUrl = res[res.length - 1] + '/';
  }
  if (url.match(/\.html/)) {
    res = url.split("/");
    res.pop();
    companyUrl = res.join("/") + "/";
  }
  return companyUrl;
}
function generateErrorShell(code, errorMsg) {
  let errorObj = {
    header_status: code === "404" ? 404 : 503,
    msg: errorMsg,
  };
  let mcatShell = GblComFunc.APP_SHELL_STRUCTURE();
  mcatShell.STATUS = errorObj.header_status;
  mcatShell.META = "";
  mcatShell.ORG_SCHEMA = "";
  mcatShell.CANONICAL_LINKS = "";
  mcatShell.TITLE =
    code === "404"
      ? `<title>Page not found</title>`
      : `<title>IndiaMART:Service unavailable</title>`;
  mcatShell.BODY_SCRIPTS = `window.__MCATSTATE__ = ${JSON.stringify(
    errorObj
  )}; window.__ISMCAT__=true`;
  return mcatShell;
}

function parser(req, data, mcatObj, rehit) {
  let mcatData = {};
  mcatData["index"] = data.index ? data.index : '';
  mcatData["header_status"] = data.header_status ? data.header_status : '';
  mcatData["uniqueId"] = data.unique_id ? data.unique_id : '';
  mcatData['rehit'] = rehit ? rehit : '';
  mcatData["mcatImg125"] = utilities.modifyImgSrc(data.mcat_img_125) ? utilities.modifyImgSrc(data.mcat_img_125) : '';
  mcatData["mcatImg250"] = utilities.modifyImgSrc(data.mcat_img_250) ? utilities.modifyImgSrc(data.mcat_img_250) : '';
  mcatData["flName"] = mcatObj.flName ? mcatObj.flName : '';
  mcatData["mcatName"] = data.mcatname ? data.mcatname : '';
  mcatData["mcat_display_name"] = data.mcat_display_name ? data.mcat_display_name : '';
  mcatData["cityName"] = data.gl_city_eng_names ? data.gl_city_eng_names : '';
  mcatData["catName"] = data.catname ? data.catname : '';
  mcatData["mcatId"] = data.mcatid ? data.mcatid : '';
  mcatData['grpName'] = data.grpname ? data.grpname : '';
  mcatData["catId"] = data.catid ? data.catid : '';
  mcatData["rehit"] = rehit ? true : false;
  mcatData["cityid"] = mcatObj.cityId ? mcatObj.cityId : "";
  mcatData["path"] = req.originalUrl ? req.originalUrl : '';
  mcatData["mcatProd"] = data.mcatprod ? data.mcatprod : '';
  mcatData["isBrand"] = data.is_brand ? data.is_brand : '';
  mcatData["isq_filter"] = data.isq_filter ? utilities.isqfilter(data.isq_filter, req.path, mcatObj.flName) : "";
  mcatData["bus_type"] = data.is_business_type ? data.is_business_type : ''
  mcatData["firstListData"] = utilities.createCard(data, req.originalUrl) ? utilities.createCard(data, req.originalUrl) : '';
  mcatData["youTubedata"] = utilities.youTubeVideosDataMcat(data) ? utilities.youTubeVideosDataMcat(data) : '';
  mcatData['categoriesData'] = utilities.getCategoriesData(mcatObj.language, data.mcatdata, mcatObj.cityName, req.originalUrl) ? utilities.getCategoriesData(mcatObj.language, data.mcatdata, mcatObj.cityName, req.originalUrl) : '';
  mcatData["cityData"] = utilities.getCityData(
    mcatObj.language,
    data.city_bar,
    mcatObj.cityName,
    mcatObj.flName,
    data.mcatname,
    req.cookies
  ) ? utilities.getCityData(
    mcatObj.language,
    data.city_bar,
    mcatObj.cityName,
    mcatObj.flName,
    data.mcatname,
    req.cookies
  ) : '';
  mcatData["brandsData"] = utilities.getBrandsData(
    mcatObj.language,
    data.generic_brands,
    data.mcatdata,
    mcatObj.cityName,
  ) ? utilities.getBrandsData(
    mcatObj.language,
    data.generic_brands,
    data.mcatdata,
    mcatObj.cityName,
  ) : '';
  mcatData["ecom"] = data.ecom_filter ? data.ecom_filter : '';
  mcatData["ecomData"] = data.ecom_filter ? utilities.getEcomData(mcatData["ecom"], mcatObj.cityName, mcatObj.flName) : "";
  mcatData["bizData"] = utilities.getBizData(
    data.biz_wise_count,
    mcatObj.cityName,
    mcatObj.flName,
    data.mcatprod,
    mcatData["ecomData"],
    mcatData["ecom"]
  ) ? utilities.getBizData(
    data.biz_wise_count,
    mcatObj.cityName,
    mcatObj.flName,
    data.mcatprod,
    mcatData["ecomData"],
    mcatData["ecom"]
  ) : '';
  mcatData["biz"] = req.query.biz || "";
  let bizName = mcatData["biz"]
    ? utilities.setBizName(mcatData["biz"])
    : mcatData["ecomData"] && mcatData["ecom"] && mcatData["path"].includes("?shopnow=1") ? "Ecom Retailer" : "";
  mcatData["bizName"] = bizName ? bizName : '';
  mcatData["showAds"] = data.adult_flag == "2" ? false : true;
  // mcatData['title'] = data.McatMetaData.title?data.McatMetaData.title:''
  mcatData["mcatgenric_flag"] = data.mcatgenric_flag ? data.mcatgenric_flag : '';

  mcatData["districtFlag"] = data.is_district ? data.is_district : '';
  mcatData["brandBillboardAdShow"] = (mcatData["catId"] || mcatData["mcatId"]) ? utilities.isBrandBillboardExists(mcatData["mcatId"], mcatData["catId"]) : "";
  mcatData["totalProductCount"] = data.out_total_unq_count ? data.out_total_unq_count : '';
  mcatData["vernacularCityName"] = data.gl_city_hindi_names ? data.gl_city_hindi_names : "";
  mcatData["vernacularNames"] = data.vernacular_names ? data.vernacular_names : '';
  mcatData["groupFlName"] = data.grp_link ? data.grp_link : '';
  mcatData["subcatFlName"] = data.subcat_flanme ? data.subcat_flanme : '';

  // mcatData["breadcrumb"] = utilities.getBreadcrumb(
  //   data.breadcrumb_info,
  //   data.catname,
  //   data.mcatname,
  //   mcatObj.flName,
  //   mcatObj.cityName,
  //   mcatData["isq_filter"]
  // )?utilities.getBreadcrumb(
  //   data.breadcrumb_info,
  //   data.catname,
  //   data.mcatname,
  //   mcatObj.flName,
  //   mcatObj.cityName,
  //   mcatData["isq_filter"]
  // ):'';

  // mcatData["MetaData"] = data.McatMetaData?data.McatMetaData:'';
  mcatData["foreignCampaignMiniBl"] = req.query && req.query.utm_source && req.query.utm_source.toLowerCase() === ("adwords") ? true : false;
  return mcatData;
}
module.exports = locationApiCallMcatShell;
