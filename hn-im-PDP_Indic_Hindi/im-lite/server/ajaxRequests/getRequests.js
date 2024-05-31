var request = require("request");
const url = require("url");
const queryString = require("query-string");
var ServiceParser = require("../ServiceParser");
const fs = require("fs");
const Service = require("./ServiceUrls");
const ERROR = "SERVICE CONNECT FAILED";
var GblComFunc = require("../GblComFunc");
var Cache = require("../Cache");
const requestIp = require('@supercharge/request-ip')

module.exports = (req, res) => {
  var env = "";
  var hostName = "http://" + env;
  var pnsFail = "",
    pnsDown = "";
  if (process.env.SNTK != "undefined" && process.env.SNTK == 0) {
    pnsFail += "SNTK|";
  }
  if (process.env.KNOW != "undefined" && process.env.KNOW == 0) {
    pnsFail += "KNOW|";
  }
  if (process.env.one97 != "undefined" && process.env.one97 == 0) {
    pnsFail += "one97|";
  }
  switch (req.path) {
    case "/ajaxrequest/search/search":
    case "/ajaxrequest/identified/search": {
      if (req.query.q) {
        //old request handling..
        req.query.s = req.query.q;
      }
      require("../SSRSections/Search/searchServiceManager")(req, res, true).then(
        function (data) {
          // console.log("wwwwwwww",res.)
          if (typeof data == "number") {
            //bad-response-code or unexpected-data
            res.status(data).send({ status: data });
            //ajax did not connect
          } else if (data == "SERVICE CONNECT FAILED") {
            res.status(503).send({ status: 503 });
          } else if (
            data === "Bad-Response" ||
            data === "No-Data" ||
            data === "EMPTY SEARCH"
          ) {
            res.status(200).send({ status: "404" });
          } else if (data === "MCAT NOT FOUND") {
            res.status(200).send({ status: "404", searchkwdmcat: true });
          } else if (data && data.total_results == 0 && data.query_type && (data.query_type == "PartialBannedKeyword" || data.query_type == "BannedKeyword")) {
            res.status(200).send({ status: "404", ...data })
          } else if (data && data.status && data.status == "No-Data") {
            res.status(200).send({ ...data, status: "404" })
          }
          else if (data) {
            res.status(200).send(data);
          }
        }
      );
      break;
    }
    case "/ajaxrequest/identified/products/myprdlist": {
      let cbService = Service.SLR_USR_LIST_URL;
      if (req.query.product_filter == "WFOBP") {
        var options = {
          method: "POST",
          url: Service.SLR_USR_LIST_URL,
          form: {
            gluserid: req.query.glid,
            from: req.query.start,
            to: req.query.end,
            product_filter: req.query.product_filter,
            token: "imobile@15061981",
            modid: "IMOB",
          },
        };
      } else {
        var options = {
          method: "POST",
          url: Service.SLR_USR_LIST_URL,
          form: {
            gluserid: req.query.glid,
            from: req.query.start,
            to: req.query.end,
            token: "imobile@15061981",
            modid: "IMOB",
          },
        };
      }
      GblComFunc.makeRequest(req, res, options, false, false, cbService);
      break;
    }
    case "/ajaxrequest/editprofile/profiledetails":
      {
        var options = {
          method: "GET",
          url: Service.USER_DETAIL_SERVICE + '?token=imobile@15061981&modid=IMOB&logo=1&' + 'glusrid=' + req.query.glid + '&AK=' + req.query.ak,
          headers: {},
          form: {
          },
          //console.log(Service.DOMAIN);
          //console.log(Service.SLR_USR_DTL);           

          //console.log(req.body.glid) ;
          //console.log(req.body.ak);   
        };
        // console.log(options.url); 
        // console.log(req.query.glid); 
        // console.log(req.query.ak);      
        let lookup = Cache.getCache(options.url);
        if (lookup != undefined) {
          var data = lookup;
          res.send(data);
        } else {
          GblComFunc.makeRequest(req, res, options, false, true).then(
            (data) => {
              //Cache.setCache(options.url, data, 86400);
              res.status(200).send(data);
            },
            (error) => {
              if (error == ERROR) {
                res.status(503).send();
              } else {
                res.status(error).send();
              }
            }
          );
        }
        break;

      }

    case "/ajaxrequest/identified/products/getdetail": {
      var options = {
        method: "POST",
        url: Service.SLR_PROD_DETAIL_URL,
        headers: {},
        form: {
          displayid: req.query.display_id,
          modid: "IMOB",
          token: "imobile@15061981",
          flag: 1,
          extra_detail: "MULTI_IMG",
        },
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(503).send();
        } else {
          if (response.statusCode == 200) {
            var r = JSON.parse(body);
            if (Array.isArray(r)) {
              res.send(body);
            } else {
              res.status(404).send(body);
            }
          } else {
            res.status(response.statusCode).send(body);
          }
        }
      });
      break;
    }
    case "/ajaxrequest/identified/products/getcatdata": {
      var options = {
        method: "POST",
        url: Service.SLR_CAT_DATA_URL,
        headers: {},
        form: {
          glusrid: req.query.glid,
          modid: "IMOB",
          token: "addandroidproduct@02021980",
        },
      };
      GblComFunc.makeRequest(req, res, options, false);
      break;
    }
    case "/ajaxrequest/identified/products/prddelete": {
      var options = {
        method: "POST",
        url: Service.MAPI_PROD_DELETE_URL,
        headers: {
          "content-type": "application/json",
        },
        form: {
          glusrid: req.query.glid,
          item_id: req.query.item_id,
          ip_add: "117.55.247.186",
          country_iso: "IN",
          modid: "IMOB",
          token: "addandroidproduct@02021980",
        },
      };
      GblComFunc.makeRequest(req, res, options, false);
      break;
    }
    case "/ajaxrequest/identified/buyleads/bl/relatedbl": {
      let tempUrl =
        Service.BL_RELATED_URL +
        "?token=imobile1@15061981&modid=IMOB&offer_id=" +
        req.query.offer_id +
        "&mcat_id=" +
        req.query.mcat_id +
        "&bl_city_id=" +
        req.query.bl_city_id +
        "&bl_state_id=" +
        req.query.bl_state_id +
        "&bl_iso=" +
        req.query.bl_iso;

      if (req.query.user_city_id && req.query.user_iso) {
        tempUrl +=
          "&user_city_id=" +
          req.query.user_city_id +
          "&user_iso=" +
          req.query.user_iso;
      }

      var options = {
        method: "GET",
        url: tempUrl,
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.BL_RELATED_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          try {
            var list = JSON.parse(data).Response;
            if (list && list.Code == 200) {
              var bls = [];
              let relatedBLHeadSplit = {};
              let totalBlCount = 0;
              let blCount = 0;
              if (list.hasOwnProperty("Data") && list.Data.length) {
                list["Data"].map(function (item, i) {
                  if (Object.keys(item) && Object.keys(item).length > 0 && Object.keys(item)[0] != "related_mcats") {
                    item[Object.keys(item)[0]].map(function (property) {
                      let tempBL = {};
                      blCount += 1;
                      totalBlCount += 1;
                      if (Object.keys(item)[0] && Object.keys(item)[0] != "tenders_same_mcat") {
                        tempBL["ETO_OFR_ID"] = property.eto_ofr_display_id;
                        tempBL["ETO_OFR_TITLE"] = property.eto_ofr_title;
                        tempBL["ETO_OFR_DESC"] = property.eto_ofr_desc;
                        tempBL["DATE_TIME"] = property.eto_ofr_date;
                        tempBL["GLUSR_CITY"] = property.gl_city_name;
                        tempBL["GLUSR_COUNTRY"] =
                          property.eto_ofr_gl_country_name;
                        tempBL["GL_COUNTRY_FLAG"] =
                          property.eto_ofr_gl_country_flag;
                        tempBL["GLUSR_COUNTRY_ISO"] = property.fk_gl_country_iso;
                        tempBL["GLUSR_STATE"] = property.eto_ofr_s_state;
                        tempBL["ENRICHMENTINFO"] = property.enrichment_info;
                        tempBL["ADDITIONALINFO"] = property.additional_details;
                        tempBL["OFFER_FLAG"] = "B";
                        tempBL["TYPE"] = "lead";
                        tempBL['ETO_OFR_BUYER_LEADS_CNT'] = property.eto_ofr_buyer_leads_cnt;
                        tempBL['ETO_OFR_BUYER_PRIME_MCATS'] = property.eto_ofr_buyer_prime_mcats;
                        tempBL['ETO_OFR_BUYER_SELL_MCATS'] = property.eto_ofr_buyer_sell_mcats;
                        tempBL['ETO_OFR_BUYER_PAST_SEARCH_MCAT'] = property.eto_ofr_buyer_past_search_mcat;
                        tempBL['GLUSR_USR_MEMBERSINCE'] = property.glusr_usr_membersince;
                        tempBL['BY_LEAD_TYPE'] = property.is_gl_mob_avail == 1 ? property.is_gl_email_avail == 1 ? 3 : 1 : property.is_gl_email_avail == 1 ? 2 : 0;
                        tempBL["ETO_OFR_BUYER_IS_MOB_VERF"] = property.eto_ofr_buyer_is_mob_verf;
                        tempBL["ETO_OFR_EMAIL_VERIFIED"] = property.eto_ofr_email_verified;
                        tempBL["ETO_OFR_BUYER_IS_GST_VERF"] = property.eto_ofr_buyer_is_gst_verf;
                        tempBL["GLUSR_ADDRESS"] = property.is_gl_add_avail;
                        bls.push(tempBL);
                      }
                      else if (Object.keys(item)[0] && Object.keys(item)[0] == "tenders_same_mcat") {
                        tempBL["ETO_OFR_ID"] = property.tdr_id;
                        tempBL["ETO_OFR_TITLE"] = property.title;
                        tempBL["ETO_OFR_DESC"] = property.description;
                        tempBL["DATE_TIME"] = property.posting_date;
                        tempBL["GLUSR_CITY"] = property.tdr_subind_loc_city;
                        tempBL["GLUSR_STATE"] = property.tdr_subind_loc_state;
                        tempBL["OFFER_FLAG"] = "T";
                        tempBL["TYPE"] = "tender";
                        bls.push(tempBL);
                      }

                    });
                    switch (Object.keys(item)[0]) {
                      case 'bl_city_wise':
                        relatedBLHeadSplit[totalBlCount - blCount + 1] = 'City';
                        break;
                      case 'bl_state_wise':
                        relatedBLHeadSplit[totalBlCount - blCount + 1] = 'State';
                        break;
                      case 'bl_same_mcat_foreign':
                        relatedBLHeadSplit[totalBlCount - blCount + 1] = 'Abroad';
                        break;
                      case 'tenders_same_mcat':
                        relatedBLHeadSplit[totalBlCount - blCount + 1] = 'Tender';
                        break;
                      case 'bl_same_mcat_inside_india':
                        relatedBLHeadSplit[totalBlCount - blCount + 1] = 'Country';
                        break;
                    }
                    if (['bl_city_wise', 'bl_state_wise', 'bl_same_mcat_inside_india', 'bl_same_mcat_foreign', 'tenders_same_mcat'].includes(Object.keys(item)[0])) {
                      blCount = 0
                    }
                  }
                });

                var blsList = { DisplayList: bls, relatedBLHeadSplit: relatedBLHeadSplit };
                res.send(blsList);
              }
            } else {
              res.status(200).send({ status: "failed" });
            }
          } catch (error) {
            res.status(200).send({ status: "failed" });
          }
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    case "/ajaxrequest/identified/buyleads/bl/fetchSubGroupBls": {
      try {
        var options = {
          method: "POST",
          url: Service.BL_GROUP_URL,
          headers: {
            "content-type": "application/json",
          },
          form: {
            start: Number(req.query.start),
            end: Number(req.query.end),
            grpname: req.query.grpname,
            parentgrpname: req.query.parentgrpname,
            trade_flag: 1,
            modid: "IMOB",
            token: "imobile@15061981",
          },
        };
        let cbService = Service.BL_GROUP_URL;
        var bls = [];
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            var SubcatBLs = JSON.parse(data);
            let list = SubcatBLs.data;
            let bls = [];
            if (list.length > 0) {
              for (var i in list) {
                bls[i] = {};
                bls[i]["ETO_OFR_ID"] = list[i].DISPLAYID;
                bls[i]["ETO_OFR_TITLE"] = list[i].TITLE;
                bls[i]["ETO_OFR_DESC"] = list[i].SMALLDESC;
                bls[i]["GLUSR_CITY"] = list[i].CITY;
                bls[i]["GLUSR_STATE"] = list[i].STATE;
                bls[i]["GLUSR_COUNTRY"] = list[i].COUNTRYNAME;
                bls[i]["ADDITIONALINFO"] = list[i].ADDITIONALINFO;
                bls[i]['ETO_OFR_PROD_SERV'] = list[i].ETO_OFR_PROD_SERV;
                bls[i]["GL_COUNTRY_FLAG"] = list[i].GL_COUNTRY_FLAG_SMALL;
                bls[i]["BY_LEAD_TYPE"] = list[i].ETOOFRVERFIED;
                bls[i]["ENRICHMENTINFO"] = list[i].ENRICHMENTINFO; // new ENRICHMENTINFO parameter
                bls[i]["OFFER_FLAG"] = "B";
                bls[i]["ETO_ENQ_TYP"] = list[i].ETO_ENQ_TYP; //ETO_ENQ_TYP for search
                bls[i]['ETO_OFR_BUYER_LEADS_CNT'] = list[i].ETO_OFR_BUYER_LEADS_CNT;
                bls[i]['ETO_OFR_BUYER_PRIME_MCATS'] = list[i].ETO_OFR_BUYER_PRIME_MCATS;
                bls[i]['ETO_OFR_BUYER_SELL_MCATS'] = list[i].ETO_OFR_BUYER_SELL_MCATS;
                bls[i]['ETO_OFR_BUYER_PAST_SEARCH_MCAT'] = list[i].ETO_OFR_BUYER_PAST_SEARCH_MCAT;
                bls[i]['GLUSR_USR_MEMBERSINCE'] = list[i].GLUSR_USR_MEMBERSINCE;
                bls[i]["ETO_OFR_BUYER_IS_MOB_VERF"] = list[i].ETO_OFR_BUYER_IS_MOB_VERF;
                bls[i]["ETO_OFR_EMAIL_VERIFIED"] = list[i].eto_ofr_email_verified;
                bls[i]["ETO_OFR_BUYER_IS_GST_VERF"] = list[i].ETO_OFR_BUYER_IS_GST_VERF;
                bls[i]["GLUSR_COMPANY"] = list[i].COMPANYNAME ? 1 : 0;
                bls[i]["GLUSR_ADDRESS"] = list[i].IS_GL_ADD_AVAIL;
                bls[i]["ETO_OFR_MODREF_TYPE"] = list[i].ETO_OFR_MODREF_TYPE;
                bls[i]["ETO_OFR_SMALL_IMAGE"] = list[i].ETO_OFR_SMALL_IMAGE;
                bls[i]["FK_GL_COUNTRY_ISO"] = list[i].FK_GL_COUNTRY_ISO;
                bls[i]["DAY_DIFF"] = list[i].DAY_DIFF;
                bls[i]["HOUR_DIFF"] = list[i].HR_DIFF;
                bls[i]["MIN_DIFF"] = list[i].MIN_DIFF;
              }
              res.send(bls);
            } else {
              res.status(200).send({ status: "empty" });
            }
          },
          (error) => {
            res.status(200).send({ status: "failed" });
          }
        );
        break;
      } catch (error) {
        res.status(200).send({ status: "failed" });
      }
    } //saloni,


    case '/ajaxrequest/twitter/posts': {
      let newDate = Date.now() + -3 * 24 * 3600 * 1000; // date 3 days ago in milliseconds UTC
      const token = 'AAAAAAAAAAAAAAAAAAAAABaZPAEAAAAAnLBLAF5%2BSTaAPd9PUaKl90zKCpE%3DBMCisFA01f9omJtuC9bGX7oBecdFYV8DEHgEK1m2lLYyF9ZcOy';
      const city = req.query.city;
      const resource = req.query.resource;
      const time = new Date(newDate).toISOString();
      const query = encodeURIComponent(city + ' ' + resource + ' -need -needed -unverified -needs -required -requires -requirement -requirements -is:retweet');
      const options = {
        method: "GET",
        url: Service.TWITTER_URL + "?query=" + query + '&tweet.fields=created_at,conversation_id,referenced_tweets,possibly_sensitive,withheld&user.fields=username,profile_image_url,protected&media.fields=duration_ms,height,media_key,preview_image_url,type,url,width&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&max_results=50&start_time=' + time,
        auth: {
          bearer: token,
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        json: true,
      }
      GblComFunc.makeRequest(req, res, options, false, true).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found", error: error });
        }
      );
      break;
    }



    case "/ajaxrequest/identified/buyleads/bl/fetchchSubCatBls": {
      var options = {
        method: "GET",
        url:
          Service.BL_TENDERS_SUBCAT_URL +
          "?token=imobile1@15061981&modid=IMOB&cat_id=1",
        headers: {
          "content-type": "application/json",
        },
      };
      var bls = [];
      let cbService = Service.BL_TENDERS_SUBCAT_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          if (res.statusCode == 200) {
            let list = JSON.parse(data).DATA;
            if (list.hasOwnProperty("TenderList") && list.TenderList.length) {
              let bls = [];
              list.TenderList.map((item, i) => {
                bls[i] = {};
                bls[i]["ETO_OFR_ID"] = item.tdr_subind_subtdr_id;
                bls[i]["ETO_OFR_TITLE"] = item.tdr_subind_subtdr_short;
                bls[i]["ETO_OFR_DESC"] = item.tdr_subind_details_new;
                bls[i]["OFFER_DATE"] = item.tdr_subind_im_arrival_date;
                bls[i]["GLUSR_CITY"] = item.tdr_subind_loc_city;
                bls[i]["GLUSR_STATE"] = item.tdr_subind_loc_state;
                bls[i]["GLUSR_COUNTRY"] = item.tdr_subind_loc_country;
                // bls[i]['ENRICHMENTINFO'] = list[i]['ENRICHMENTINFO'];
                // bls[i]['ADDITIONALINFO'] = list[i].ADDITIONALINFO;
                bls[i]["BLDATETIME"] = item.tdr_subind_im_arrival_date;
                bls[i]["DATE_TIME"] = item.tdr_subind_appl_beforedate;
                bls[i]["GL_COUNTRY_FLAG"] = item.GL_COUNTRY_FLAG_SMALL;
                bls[i]["BY_LEAD_TYPE"] = item.ETOOFRVERFIED;
                //bls[i]['ENRICHMENTINFO'] = list[i].ENRICHMENTINFO; // new ENRICHMENTINFO parameter
                bls[i]["OFFER_FLAG"] = "T";
                //bls[i]['ETO_ENQ_TYP'] = list[i].ETO_ENQ_TYP; //ETO_ENQ_TYP for search
              });

              res.send(bls);
            }
          } else {
            res.status(res.statusCode).send(data);
          }
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }

    case "/ajaxrequest/identified/buyleads/bl/industryTenders": {
      try {
        let list;
        //let industryGrpId = { "gems-jewellery": 18, "handicrafts-gifts": 19, "leather": 22, "hand-tools": 25, "stones-marble": 26, "medical-pharma": 27, "furniture": 93, "commercial-office": 9, "computer-hardware": 10, "cosmetics-toiletries": 11, "electronic-goods": 13, "industrial-supplies": 14, "agro-farm": 16, "ores-metals": 29, "packaging-material": 30, "printing-publishing": 32, "plant-machinery": 34, "sports-goods": 36, "telecom-products": 37, "embassies-consulates": 66, "human-resource": 68, "hotels-resorts": 72, "travel-agents": 73, "home-supplies": 74, "merchant-exporters": 75, "musical-instruments": 76, "paper": 77, "packers-movers": 80, "fabrication": 81, "miscellaneous": 82, "astrology-service": 83, "facility-management": 85, "media-advertising": 49, "travel-tourism": 50, "research-development": 53, "business-facilitation": 55, "architectural-designing": 56, "property-real": 58, "education-training": 61, "medical-services": 94, "it-services": 95, "callcenter-bpo": 96, "rental-services": 97, "small-businesses": 98, "finance-law": 99, "fashion-accessories": 100, "home-garden": 101, "mechanical-components": 102, "apparel-garments": 3, "automobiles-spares": 5, "bicycles-rickshaws": 6, "builders-hardware": 7, "chemicals-fertilizers": 8, "ayurvedic-herbal": 84, "trade-promotion": 63, "textiles-yarn": 38, "scientific-instruments": 40, "rubber": 41, "plastic": 42, "transportation": 45, "home-furnishings": 46 };
        //let grpid = industryGrpId[req.query.groupId];
        let grpid = req.query.groupId;
        if (grpid > 0) {
          let options = {
            method: "GET",
            url:
              Service.BL_TENDERS_INDUSTRY_URL +
              "&group_id=" +
              grpid +
              "&start=" +
              req.query.start +
              "&end=" +
              req.query.end,
          };
          let cbService = Service.BL_TENDERS_INDUSTRY_URL;
          let blIndustryData = GblComFunc.makeRequest(
            req,
            res,
            options,
            false,
            true,
            cbService
          );

          blIndustryData.then(
            function (body) {
              list = JSON.parse(body);
              let bls = [];

              if (
                list.DATA.hasOwnProperty("TenderList") &&
                list["DATA"]["TenderList"].length > 0
              ) {
                list["DATA"]["TenderList"].map(function (item, i) {
                  // tenderdetail page
                  if (item) {
                    bls[i] = {};
                    bls[i]["ETO_OFR_ID"] = item["tdr_subind_subtdr_id"];
                    bls[i]["ETO_OFR_TITLE"] = item["tdr_subind_subtdr_short"];
                    bls[i]["ETO_OFR_DESC"] = item["tdr_subind_details_new"];
                    bls[i]["BLDATETIME"] = item["BLDATETIME"];
                    bls[i]["DATE_TIME"] = item["tdr_subind_im_arrival_date"];
                    bls[i]["GLUSR_CITY"] = item["tdr_subind_loc_city"];
                    bls[i]["ETO_OFR_QTY"] = item["tdr_subind_subtdr_qty"];
                    bls[i]["GLUSR_STATE"] = item["tdr_subind_loc_state"];
                    bls[i]["GLUSR_COUNTRY"] = item["tdr_subind_loc_country"];
                    bls[i]["FK_GLCAT_MCAT_ID"] = item["mcatid"]
                      ? item["mcatid"][0]
                      : "";

                    //TENDER SPECIFIC
                    bls[i]["OFFER_FLAG"] = "T";
                    bls[i]["tdrmcatnametext"] = item["tdr_subind_mcat_name"];
                    bls[i]["tendervalue"] =
                      item["tdr_subind_subtdr_tendervalue"];
                    bls[i]["earnestmoney"] = item["tdr_subind_subtdr_earnest"];
                    bls[i]["docfees"] = item["tdr_subind_subtdr_docfees"];
                    bls[i]["salestartdate"] = item["tdr_subind_tdr_lastdate"];
                    bls[i]["saleenddate"] = item["tdr_subind_appl_lastdate"];
                    bls[i]["docsubmitlastdate"] =
                      item["tdr_subind_appl_beforedate"];
                    bls[i]["expirydate"] = item["tdr_subind_subtdr_open_date"];
                    bls[i]["DATE_TIME"] = item["tdr_subind_subtdr_open_date"];
                  }
                });
                res.send(bls);
              } else {
                res.send({ status: "empty" });
              }
            },
            function (error) {
              res.send({ status: "failed" });
            }
          );
        }
      } catch (error) {
        res.send({ status: "failed" });
      }
      break;
    }
    case "/ajaxrequest/identified/niQuestions": {
      var options = {
        method: "POST",
        url: Service.BL_NI_QUESTIONS_URL,
        headers: {
          "content-type": "application/json",
        },
        form: {
          modid: "IMOB",
          token: "imobile1@15061981",
          glid: req.query.glid,
          glusrid: req.query.glid,
          eto_ofr_id: req.query.offerid,
          fk_glcat_mcat_id: req.query.matchmakingMcat,
          prime_mcat_id: req.query.primeMcat,
          fk_gl_city_id: req.query.blcity,
          fk_gl_country_iso: req.query.ciso,
          blpage: req.query.blpage,
        },
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(503).send();
        } else {
          if (response.statusCode == 200) {
            let niQues = JSON.parse(body);
            let ques = [];
            let temp = {};
            let list = niQues.Response.Message;
            for (let i in list) {
              if (list[i].Status == "1") {
                temp = {};
                (temp["type"] = list[i].Type),
                  (temp["detail"] = list[i].Detail),
                  (temp["placeholder"] = list[i].Placeholder),
                  (temp["options"] = list[i].Option),
                  (temp["reasonCode"] = list[i].Reason_Code);
                ques.push(temp);
              }
            }
            let blsList = {};
            blsList["qlist"] = ques;
            blsList["status"] = "success";
            res.send(blsList);
          } else {
            res.status(response.statusCode).send(body);
          }
        }
      });
      break;
    }
    case "/ajaxrequest/identified/niQuestionsUnit": {
      var options = {
        method: "GET", //token/immenu@7851/mcatid/3/modid/MY/req_datafield/UNIT/
        url:
          Service.USER_NI_UNIT_URL +
          "mcatid/" +
          req.query.mcatid +
          "/token/immenu@7851/modid/IMOB/req_datafield/UNIT/",
        headers: {
          "content-type": "application/json",
        },
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(503).send();
        } else {
          let res1 = JSON.parse(body);
          if (res1 && res1.Response.Code == "200") {
            res.send(res1.Response.Data);
          } else {
            res.status(response.statusCode).send(body);
          }
        }
      });
      break;
    }
    //saloni
    case "/ajaxrequest/identified/buyleads/bl/defaultDisplay": {
      var options = {
        method: "GET",
        url: Service.BL_DEFAULT_DISPLAY_URL + req.query.offerType,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };

      if (process.env.NODE_ENV_M == "dev" || process.env.NODE_ENV_M == "stg") {
        options.headers["Authorization"] =
          "Basic " + new Buffer("admin" + ":" + "admin").toString("base64");
      }
      let cbService = Service.BL_DEFAULT_DISPLAY_URL
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          if (data) {
            var res1 = JSON.parse(data);
            if (res.statusCode == 200 && res1 && res1.CODE == 200) {
              var list = JSON.parse(data).DATA;

              var bls = [];

              for (var i in list) {
                bls[i] = {};
                bls[i]["ETO_OFR_ID"] = list[i].ETO_OFR_ID;
                bls[i]["ETO_OFR_TITLE"] = list[i].ETO_OFR_TITLE;
                bls[i]["OFFER_DATE"] = list[i].ETO_OFR_DATE;
                // bls[i]['DATE_TIME'] = list[i].ETO_OFR_DATE + 'T' + list[i].LASTACTIONDATET;
                bls[i]["BLDATETIME"] = list[i]["BLDATETIME"];
                bls[i]["GLUSR_CITY"] = list[i].GLUSR_CITY;
                bls[i]["GLUSR_STATE"] = list[i].GLUSR_STATE;
                bls[i]["GLUSR_COUNTRY"] = list[i].GLUSR_COUNTRY;
                bls[i]["ENRICHMENTINFO"] = list[i]["ENRICHMENTINFO"];
                bls[i]["GL_COUNTRY_FLAG"] = list[i].GL_COUNTRY_FLAG_SMALL;
                bls[i]["ENRICHMENTINFO"] = list[i].ENRICHMENTINFO;
                bls[i]["FK_GLCAT_MCAT_ID"] = list[i].FK_GLCAT_MCAT_ID;
                if (req.query.offerType == "T") {
                  bls[i]["ETO_OFR_DESC"] = list[i].ETO_OFR_DESC;
                  bls[i]["ADDITIONALINFO"] = list[i].ADDITIONALINFO;
                  bls[i]["DATE_TIME"] =
                    list[i].ETO_OFR_DATE + "T" + list[i].LASTACTIONDATET;
                  bls[i]["GL_COUNTRY_FLAG"] = list[i].GL_COUNTRY_FLAG_SMALL;
                  bls[i]["BY_LEAD_TYPE"] = list[i].BY_LEAD_TYPE;
                  bls[i]["OFFER_FLAG"] = list[i].OFFER_FLAG;
                  bls[i]["ETO_ENQ_TYP"] = list[i].ETO_ENQ_TYP; //ETO_ENQ_TYP for search
                  bls[i]["SHORTLISTED"] = list[i].SHORTLISTED;
                  bls[i]["SHORTLIST_STATUS"] = list[i].SHORTLIST_STATUS;
                  bls[i]["ETO_TDR_NOTICE_TYPE"] = list[i].ETO_TDR_NOTICE_TYPE;
                  bls[i]["ETO_OFR_GLCAT_MCAT_NAME"] =
                    list[i].ETO_OFR_GLCAT_MCAT_NAME;
                  bls[i]["ETO_TDR_PERIOD"] = list[i].ETO_TDR_PERIOD;
                  bls[i]["ETO_TENDER_VALUE"] = list[i].ETO_TENDER_VALUE;
                  bls[i]["ETO_TDR_EARNEST"] = list[i].ETO_TDR_EARNEST;
                  bls[i]["ETO_TDR_DOCFEE"] = list[i].ETO_TDR_DOCFEE;
                  bls[i]["ETO_TDR_PUBLISH_DATE"] = list[i].ETO_TDR_PUBLISH_DATE;
                  bls[i]["ETO_TDR_DOC_SALE_STARTDATE"] =
                    list[i].ETO_TDR_DOC_SALE_STARTDATE;
                  bls[i]["ETO_TDR_DOC_SALE_LASTDATE"] =
                    list[i].ETO_TDR_DOC_SALE_LASTDATE;
                  bls[i]["ETO_TDR_DOC_SUBMIT_BEFOREDATE"] =
                    list[i].ETO_TDR_DOC_SUBMIT_BEFOREDATE;
                  bls[i]["ETO_TDR_OPEN_DATE"] = list[i].ETO_TDR_OPEN_DATE;
                  bls[i]["ETO_TDR_COMP_WEBSITE"] = list[i].ETO_TDR_COMP_WEBSITE;
                }
              }
              var blsList = {};
              blsList["DisplayList"] = bls;
              blsList["status"] = "success";
              res.send(blsList);
            } else {
              res.status(res.statusCode).send(data);
            }
          }
        },
        (error) => {
          res.status(503).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/buyleads/bl/notinterested": {
      var options = {
        method: "POST",
        url: Service.BL_NOT_INTERESTED_URL,
        headers: {
          "content-type": "application/json",
        },
        form: {
          glusrid: req.query.glid,
          token: "imobile1@15061981",
          offerid: req.query.offer,
          modid: "IMOB",
          status: req.query.status ? req.query.status : 0,
          updatescreen: "BL_Listing",
          TYPE: req.query.ni_type,
          eto_ofr_reject_reason: req.query.reject_reason_offer,
          eto_ofr_reject_comment: req.query.reject_comment,
          fk_rej_mcat: req.query.mcatid,
          CITY_ID: req.query.CITY_ID,
        },
      };
      if (req.query.serial) {
        options["form"]["DISPLAY_POSITION"] = req.query.serial;
      }
      if (req.query.grid_val) {
        options["form"]["grid_val"] = req.query.grid_val;
        let gv = req.query.grid_val
        if (gv.includes('#')) {
          let emailCounterVal = req.query.grid_val.split("#");
          emailCounterVal = emailCounterVal[0];
          options["form"]["EMAIL_COUNTER"] = emailCounterVal;
        }
      }
      if (req.query.QTY_UNIT) {
        options.form.eto_ofr_reject_comment = "";
        options.form.QTY = req.query.QTY;
        options.form.QTY_UNIT = req.query.QTY_UNIT;
      }
      let blpageloc = req.query.blPageLoc;
      blpageloc = blpageloc.replace(/5/g, "=");
      blpageloc = blpageloc.replace(/6/g, "#");
      if (blpageloc != "") {
        options["form"]["bl_page_location"] = blpageloc;
      }
      if (req.query.searchTxt) {
        options["form"]["eto_srch_text"] = req.query.searchTxt;
      }
      let cbService = Service.BL_NOT_INTERESTED_URL;
      GblComFunc.makeRequest(req, res, options, false, false, cbService);
      break;
    }
    case "/ajaxrequest/identified/buyleads/bl/search": {
      try {
        const parsed = queryString.parse(req.query.q);
        const stringified_query = queryString.stringify(parsed);
        req.query.q = stringified_query;
      } catch (error) { }
      let url;
      let data = "lead|expiredlead";
      if (
        (req.get("referer") && req.get("referer").includes("/bl/tenders")) ||
        (req.get("referrer") && req.get("referrer").includes("/bl/tenders")) ||
        (req && req.query && req.query.istender == "Similar Tenders")
      ) {
        data = "tender";
      }
      if (req.query.src == "DirectSearch" || (req.query.src == "similar" && data != "tender")) {
        //Search on BL-SearchPage

        url =
          Service.BL_SEARCH_URL +
          "?token=imobile@15061981&q=" +
          req.query.q +
          "&source=imob.search.lead&options.start=" +
          req.query.start +
          "&options.rows=" +
          req.query.rows +
          "&options.filters.type.data=" +
          data +
          "&visitorid=" +
          req.cookies._ga;
      } else if (req.query.src != "tenderSearch") {
        //search for offer Page

        url =
          Service.BL_SEARCH_URL +
          "?token=imobile@15061981&q=" +
          req.query.q +
          "&source=imob.search.widget.lead&options.start=" +
          req.query.start +
          "&options.rows=" +
          req.query.rows +
          "&options.filters.type.data=" +
          data +
          "&visitorid=" +
          req.cookies._ga;
      } else {
        //Search for Bl Tender

        url =
          Service.BL_SEARCH_URL +
          "?source=eto.search.recommendtender&options.filters.glusrid.data-" +
          req.query.glid +
          "&options.filters.glusrid.type=value&q=" +
          req.query.q +
          "&options.start=" +
          req.query.start +
          "&options.results=" +
          req.query.rows +
          "&visitorid=" +
          req.cookies._ga;
      }
      if (req.query.glid && req.query.glid != "undefined") {
        url =
          url +
          "&glusr_id=" +
          req.query.glid +
          "&options.filters.glusrid.data=-" +
          req.query.glid;
      }
      //blfilter for country
      if (!(data == "tender")) {
        if ((req.query.blCountry && req.query.blCountry != "" && req.query.blCountry != 'null') || req.query.LocPref == 3) {
          let countryParams = "&options.filters.countryname.type=value";
          if (req.query.blCountry == "F" || req.query.LocPref == 3) {
            countryParams += "&options.filters.countryname.data=-India";
          } else {
            countryParams +=
              "&options.filters.countryname.data=" + req.query.blCountry;
          }
          url = url + countryParams;
        }

        //blfilter for state
        if (!(req.query.src == "tenderSearch")) {
          if (req.query.blState && req.query.blState != "" && req.query.blState != 'null') {
            url +=
              "&options.filters.state.type=value&options.filters.state.data=" +
              req.query.blState;
          }

          //blfilter for city
          if (req.query.blCity && req.query.blCity != "" && req.query.blState != 'null') {
            url +=
              "&options.filters.city.type=value&options.filters.city.data=" +
              req.query.blCity;
          }

          //blfilter for near a City
          if (req.query.blNearCity && req.query.blNearCity != "" && req.query.blNearCity != 'null') {
            url +=
              "&options.filters.reg_city.type=value&options.filters.reg_city.data=" +
              req.query.blNearCity;
          }
        }
        //blfilter for categorie(s)
        if (req.query.blCategory && req.query.blCategory != "" && req.query.blCategory != 'null') {
          url +=
            "&options.filters.mcatname.type=value&options.filters.mcatname.data=" +
            req.query.blCategory;
        }
        //Location Preference
        if (req.query.LocPref && req.query.LocPref != '' && req.query.LocPref != 'null') {
          url += "&LocPref=" + req.query.LocPref
        }
        url += "&expleadflg=true";
      }
      if (req && req.query && req.query.pref == "All") {
        url += '&options.filters.loc.data=global' + '&options.filters.loc.type=value'
      }
      if (data === 'tender') {
        url = Service.BL_SEARCH_URL +
          "?source=tender.search&options.filters.glusrid.data-" +
          req.query.glid +
          "&options.filters.glusrid.type=value&q=" +
          req.query.q +
          "&options.start=" +
          req.query.start +
          "&options.results=" +
          req.query.rows +
          "&sort_by_recency=false"
      }
      var options = {
        method: "GET",
        url: url,
        gzip: true,
      };

      GblComFunc.makeRequest(req, res, options, false, true).then(
        (data) => {
          try {
            var list = JSON.parse(data);

            if (res.statusCode == 200 && list.res_code == 200 && !list.error) {
              var bls = [];
              if (list.hasOwnProperty("results") && list.results.length) {
                list["results"].map(function (item, i) {
                  if (item.fields) {
                    bls[i] = {};
                    bls[i]['MSG1'] = item && item.fields && item.fields.MESSAGE_LIST_1;
                    bls[i]['MSG2'] = item && item.fields && item.fields.MESSAGE_LIST_2;
                    bls[i]['blSearch_IS_NI_AVAIL'] = item && item.fields && item.fields.IS_NI_AVAIL;
                    bls[i]["ETO_OFR_GLCAT_MCAT_NAME"] =
                      item["fields"]["primarymcatname"];
                    bls[i]["ETO_OFR_ID"] = item["fields"]["displayid"];
                    bls[i]["mcatconf"] = item["fields"] && item["fields"]["mcatconf"] ? item["fields"]["mcatconf"] : '';
                    bls[i]["ETO_OFR_PROD_SERV"] = item["fields"]["bl_prod_serv_type"];
                    bls[i]["ETO_OFR_TITLE"] = item["fields"]["title"];
                    bls[i]["ETO_OFR_DESC"] = item["fields"]["description"];
                    bls[i]["DATE_TIME"] = item["fields"]["lastactiondate"];
                    bls[i]["GLUSR_CITY"] = item["fields"]["city"];
                    bls[i]["ETO_OFR_QTY"] = item["fields"]["quantity"];
                    bls[i]["GLUSR_STATE"] = item["fields"]["state"];
                    bls[i]["GLUSR_COUNTRY"] = item["fields"]["countryname"];
                    bls[i]["ISQDETAILS"] = item["fields"]["isqdetails"];
                    bls[i]["GL_COUNTRY_FLAG"] = item["fields"]["countryflag"];
                    bls[i]["BY_LEAD_TYPE"] = item["fields"]["buyleadtype"];
                    bls[i]["TYPE"] = item["fields"]["datatype"];
                    bls[i]["ETO_ENQ_TYP"] = item["fields"]["inquirytype"]; //ETO_ENQ_TYP for search
                    bls[i]["SHORTLISTED"] = item["fields"]["SHORTLISTED"];
                    bls[i]["SHORTLIST_STATUS"] =
                      item["fields"]["SHORTLIST_STATUS"];
                    bls[i]["ETO_TDR_PUBLISH_DATE"] = item["fields"]["postdate"];
                    bls[i]["ENRICHMENTINFO"] = "";
                    bls[i]["FK_GLCAT_MCAT_ID"] = item["fields"]["mcatid"]
                      ? item["fields"]["mcatid"][0]
                      : "";
                    bls[i]["isqdetails"] = item["fields"]["isqdetails"];
                    bls[i]["ETO_OFR_BUYER_IS_MOB_VERF"] = item["fields"][
                      "mobileverificationstatus"
                    ]
                      ? item["fields"]["mobileverificationstatus"]
                      : "";
                    bls[i]["ETO_OFR_EMAIL_VERIFIED"] = item["fields"][
                      "emailverificationstatus"
                    ]
                      ? item["fields"]["emailverificationstatus"]
                      : "";
                    bls[i]["GLUSR_COMPANY"] = item["fields"][
                      "companynameavailable"
                    ]
                      ? item["fields"]["companynameavailable"]
                      : "";
                    bls[i]["GLUSR_ADDRESS"] = item["fields"]["address"]
                      ? item["fields"]["address"]
                      : "";
                    bls[i]["GLUSR_ADDRESS"] = item["fields"]["address"]
                      ? item["fields"]["address"]
                      : "";
                    bls[i]["GLUSR_USR_MEMBERSINCE"] = item["fields"][
                      "membersince"
                    ]
                      ? item["fields"]["membersince"]
                      : "";
                    bls[i]["Sells"] = item["fields"]["buyerproductsold"]
                      ? item["fields"]["buyerproductsold"]
                      : "";
                    bls[i]["POI"] = item["fields"]["buyerpastrequirementmcats"]
                      ? item["fields"]["buyerpastrequirementmcats"]
                      : "";
                    bls[i]["ETO_OFR_BUYER_IS_GST_VERF"] =
                      item["fields"]["gstverificationstatus"];
                    bls[i]["ETO_OFR_MODREF_TYPE"] =
                      item["fields"]["std_product_modref_type"];
                    bls[i]["ETO_OFR_LARGE_IMAGE"] =
                      item["fields"]["std_product_large_img"];
                    bls[i]["ETO_OFR_MEDIUM_IMAGE"] =
                      item["fields"]["std_product_medium_img"];
                    bls[i]["ETO_OFR_SMALL_IMAGE"] =
                      item["fields"]["std_product_small_img"];
                    bls[i]["ETO_OFR_ORIGINAL_IMAGE"] =
                      item["fields"]["std_product_original_img"];
                    bls[i]["ETO_OFR_MODREFID"] =
                      item["fields"]["std_product_modref_id"];
                    bls[i]['GRID_PARAMETERS'] = item['fields']['GRID_PARAMETER'];


                    if (bls[i]["TYPE"] == "lead" || bls[i]["TYPE"] == "expiredlead") {
                      bls[i]["OFFER_FLAG"] = "B";
                      bls[i]["ordervalue"] = item["fields"]["ordervalue"];
                      bls[i]["appusage"] = item["fields"]["appusage"];
                      bls[i]["requirementtype"] =
                        item["fields"]["requirementtype"];
                      bls[i]["purchaseperiod"] =
                        item["fields"]["purchaseperiod"];
                      bls[i]["requirementfreq"] =
                        item["fields"]["requirementfreq"];
                      bls[i]["geographyid"] = item["fields"]["geographyid"];
                      bls[i]["preferredcity"] = item["fields"]["preferredcity"];
                    } else {
                      bls[i]["OFFER_FLAG"] = "T";
                      bls[i]["tdrmcatnametext"] =
                        item["fields"]["tdrmcatnametext"];
                      bls[i]["tendervalue"] = item["fields"]["tendervalue"];
                      bls[i]["earnestmoney"] = item["fields"]["earnestmoney"];
                      bls[i]["docfees"] = item["fields"]["docfees"];
                      bls[i]["salestartdate"] = item["fields"]["salestartdate"];
                      bls[i]["saleenddate"] = item["fields"]["saleenddate"];
                      bls[i]["docsubmitlastdate"] =
                        item["fields"]["docsubmitlastdate"];
                      bls[i]["expirydate"] = item["fields"]["expirydate"];
                      bls[i]["DATE_TIME"] = item["fields"]["releasedate"];
                    }
                  }
                });
                //search response manipulation due to different index
                var renderFilterOptions = (arr) => {
                  if (arr) {
                    let options = {};
                    for (let i = 1; i < arr.length; i += 2) {
                      if (
                        arr[i] != 1 &&
                        !arr[i - 1].includes("not available")
                      ) {
                        options[arr[i - 1]] = arr[i] - 1;
                      }
                    }
                    return options;
                  }
                  return "";
                };

                var blsList = {
                  DisplayList: bls,
                  cities: list["facet_fields"]
                    ? renderFilterOptions(list["facet_fields"]["city"])
                    : "",
                  countries: list["facet_fields"]
                    ? renderFilterOptions(list["facet_fields"]["countryname"])
                    : "",
                  categories: list["facet_fields"]
                    ? renderFilterOptions(list["facet_fields"]["mcatname"])
                    : "",
                  states: list["facet_fields"]
                    ? renderFilterOptions(list["facet_fields"]["state"])
                    : "",
                  TotalBuyleads: list["total_results"] - 1,
                };
                res.send(blsList);
              } else {
                res.status(200).send({ status: "empty" });
              }
            } else {
              try {
                var date = new Date().toISOString().slice(0, 10);
                var autosuggest_service_error = fs.createWriteStream(
                  "/tmp/AutoSuggestError-log-" + date + ".txt",
                  { flags: "a" }
                );
                autosuggest_service_error.write(
                  "{ AutoSuggestServiceStatus:" +
                  res.statusCode +
                  ",responseBody:" +
                  data +
                  ",timestamp:" +
                  new Date().toLocaleString() +
                  "}" +
                  "\n"
                );
              } catch (error) { }
              res.status(200).send({ status: "failed" });
            }
          } catch (error) {
            res.status(200).send({ status: "failed" });
          }
        },
        (error) => {
          try {
            var date = new Date().toISOString().slice(0, 10);
            var autosuggest_service_error = fs.createWriteStream(
              "/tmp/AutoSuggestError-log-" + date + ".txt",
              { flags: "a" }
            );
            autosuggest_service_error.write(
              "{ AutoSuggestServiceStatus:" +
              res.statusCode +
              ",responseBody:" +
              data +
              ",timestamp:" +
              new Date().toLocaleString() +
              ",error:" +
              error +
              "}" +
              "\n"
            );
            res.status(200).send({ status: "failed" });
          } catch (error) { }
          res.status(200).send({ status: "failed" });
        }
      );
      break;
    }

    case "/ajaxrequest/getTendersStateIndustryData": {
      let url = "";

      url =
        Service.BL_TENDERS_URL + "industry/?token=imobile1@15061981&modid=IMOB";

      var options = {
        method: "GET",
        url: url,
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(200).send({ status: "failed" });
        } else {
          if (response.statusCode === 200) {
            var list = JSON.parse(body);
            if (list.CODE == 200 && !list.error) {
              if (list.hasOwnProperty("DATA") && list.DATA.length) {
                res.status(200).send(list);
              }
            } else {
              res.status(200).send({ status: "failed" });
            }
          }
        }
      });
      break;
    }
    case "/ajaxrequest/getTendersStateIndustryNoticeData": {
      let stateid = "";
      let grpid = req.query.grpid;
      if (req.query.stateid) {
        stateid = "&state_id=" + req.query.stateid;
      }
      var options = {
        method: "GET",
        url:
          Service.BL_TENDERS_URL +
          "group/?token=imobile1@15061981&modid=IMOB&group_id=" +
          req.query.grpid +
          stateid,
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(503).send();
        } else {
          var list = JSON.parse(body);
          if (response.statusCode == 200 && list.CODE == 200 && !list.error) {
            var bls = [];
            var blsList = {};
            var stateList = {};
            var categories = {};
            if (list["DATA"]["TenderList"].length) {
              list["DATA"]["StateList"].map(function (item, i) {
                if (item && i < 11) {
                  var stnm = item["tdr_subind_loc_state"];
                  var stid = item["tdr_subind_loc_state_id"];
                  stnm = stnm.replace(/ /gi, "-");
                  stateList[stnm] = stid;
                }
              });
              list["DATA"]["TenderList"].map(function (item, i) {
                if (item) {
                  bls[i] = {};
                  bls[i]["ETO_OFR_ID"] = item["tdr_subind_subtdr_id"];
                  bls[i]["ETO_OFR_TITLE"] = item["tdr_subind_subtdr_short"];
                  bls[i]["ETO_OFR_DESC"] = item["tdr_subind_details_new"];
                  // bls[i]['ETO_OFR_TITLE'] =item['glcat_grp_meta_title'];
                  // bls[i]['ETO_OFR_DESC'] = item['glcat_grp_meta_desc'];
                  bls[i]["BLDATETIME"] = item["BLDATETIME"];
                  bls[i]["DATE_TIME"] = item["tdr_subind_im_arrival_date"];
                  bls[i]["GLUSR_CITY"] = item["tdr_subind_loc_city"];
                  bls[i]["ETO_OFR_QTY"] = item["tdr_subind_subtdr_qty"]; // tdr_subind_subtdr_unit //tdr_subind_subtdr_unit
                  bls[i]["GLUSR_STATE"] = item["tdr_subind_loc_state"];
                  bls[i]["GLUSR_COUNTRY"] = item["tdr_subind_loc_country"];
                  //  bls[i]['ISQDETAILS'] = item['isqdetails'];
                  // bls[i]['GL_COUNTRY_FLAG'] = item['countryflag'];
                  // bls[i]['BY_LEAD_TYPE'] = item['buyleadtype'];
                  // bls[i]['TYPE'] = 'tender'; //item['datatype'];
                  // bls[i]['ETO_ENQ_TYP'] = item['inquirytype'] //ETO_ENQ_TYP for search
                  //  bls[i]['SHORTLISTED'] = item['SHORTLISTED'];
                  //  bls[i]['SHORTLIST_STATUS'] = item['SHORTLIST_STATUS'];BLDATETIME
                  bls[i]["ETO_TDR_PUBLISH_DApensTE"] =
                    item["tdr_subind_im_arrival_date"];
                  if (item["BLDATETIME"])
                    bls[i]["BLDATETIME"] = item["BLDATETIME"];
                  //   bls[i]['ENRICHMENTINFO'] = '';
                  bls[i]["FK_GLCAT_MCAT_ID"] = item["mcatid"]
                    ? item["mcatid"][0]
                    : "";

                  //TENDER SPECIFIC
                  bls[i]["OFFER_FLAG"] = "T";
                  bls[i]["tdrmcatnametext"] = item["tdr_subind_mcat_name"];
                  bls[i]["tendervalue"] = item["tdr_subind_subtdr_tendervalue"];
                  bls[i]["earnestmoney"] = item["tdr_subind_subtdr_earnest"];
                  bls[i]["docfees"] = item["tdr_subind_subtdr_docfees"];
                  bls[i]["salestartdate"] = item["tdr_subind_tdr_lastdate"];
                  bls[i]["saleenddate"] = item["tdr_subind_appl_lastdate"];
                  bls[i]["docsubmitlastdate"] =
                    item["tdr_subind_appl_beforedate"];
                  bls[i]["expirydate"] = item["tdr_subind_subtdr_open_date"];
                  bls[i]["DATE_TIME"] = item["tdr_subind_subtdr_open_date"];
                }
              });

              if (
                list.DATA.hasOwnProperty("CatList") &&
                list["DATA"]["CatList"].length > 0
              ) {
                list["DATA"]["CatList"].map(function (item, i) {
                  if (item) {
                    categories[i] = {};
                    categories[i]["CAT_ID"] = item["fk_tdr_cat_id"];
                    categories[i]["FULL_NAME"] = item["tdr_subind_name"];
                    categories[i]["NAME"] = item["tdr_subind_flname"];
                  }
                });
              }
              //search response manipulation due to different filters like mcat and city

              blsList = {
                DisplayList: bls,
                categories: categories,
                states: stateList,
                grpid: grpid,
                status: 200,
              };
              res.status(200).send(blsList);
            }
          }
          // res.status(200).send(body);
        }
      });
      break;
    }

    case "/ajaxrequest/identified/buyleads/bl/tender": {
      let url = "";
      let showCityFilter = false; //true-show city filter
      let blsList = ""; //filters object
      let qArr = [];
      let queryParam = "";
      try {
        const parsed = queryString.parse(req.query.q);
        const stringified_query = queryString.stringify(parsed);
        req.query.q = stringified_query;
      } catch (error) { }

      qArr = req.query.q.split("%3A");

      if (qArr[0] === "state") {
        if (qArr[1] == "jammu-kashmir") qArr[1] = "jammu-and-kashmir";
        if (!(qArr[1].indexOf("-") > -1)) {
          qArr[1] = qArr[1].charAt(0).toUpperCase() + qArr[1].substring(1);
        } else {
          if (qArr[1] !== "dadra-and-nagar-haveli") {
            qArr[1] = qArr[1].replace(/\band\b/gi, "%26");
          }
          qArr[1] = qArr[1]
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join("%20");
        }
      }
      queryParam = qArr[0] + ":" + qArr[1];
      url =
        Service.BL_SEARCH_URL +
        "?source=" +
        req.query.source +
        "&q=" +
        queryParam +
        "&options.start=" +
        req.query.start +
        "&options.rows=" +
        req.query.rows;
      if (req.query.source === "imob.tender.search.state") {
        showCityFilter = true;
      } else {
        showCityFilter = false;
      }
      if (qArr[0] === "state") {
        url +=
          "&options.filters.state.type=value&options.filters.state.data=" +
          qArr[1];
      } else {
        url += "&options.filters.companyname.data=" + qArr[1];
      }
      //blfilter for city
      if (req.query.blCity && req.query.blCity != "") {
        url +=
          "&options.filters.city.type=value&options.filters.city.data=" +
          req.query.blCity;
      } else {
        //blfilter for state
        if (req.query.blState && req.query.blState != "") {
          url +=
            "&options.filters.state.type=value&options.filters.state.data=" +
            req.query.blState;
        }
      }
      //blfilter for categorie(s)
      if (req.query.blCategory && req.query.blCategory != "") {
        url +=
          "&options.filters.mcatname.type=value&options.filters.mcatname.data=" +
          req.query.blCategory;
      }
      url += "&searchq=true";

      var options = {
        method: "GET",
        url: url,
      };

      GblComFunc.makeRequest(req, res, options, false, true).then(
        (data) => {
          var list = JSON.parse(data);
          if (res.statusCode == 200 && list.res_code == 200 && !list.error) {
            var bls = [];
            if (list.hasOwnProperty("results") && list.results.length) {
              list["results"].map(function (item, i) {
                if (item.fields) {
                  bls[i] = {};
                  bls[i]["ETO_OFR_ID"] = item["fields"]["displayid"];
                  bls[i]["ETO_OFR_TITLE"] = item["fields"]["title"];
                  bls[i]["ETO_OFR_DESC"] = item["fields"]["description"];
                  bls[i]["DATE_TIME"] = item["fields"]["lastactiondate"];
                  bls[i]["GLUSR_CITY"] = item["fields"]["city"];
                  bls[i]["ETO_OFR_QTY"] = item["fields"]["quantity"];
                  bls[i]["GLUSR_STATE"] = item["fields"]["state"];
                  bls[i]["GLUSR_COUNTRY"] = item["fields"]["countryname"];
                  bls[i]["ISQDETAILS"] = item["fields"]["isqdetails"];
                  bls[i]["GL_COUNTRY_FLAG"] = item["fields"]["countryflag"];
                  bls[i]["BY_LEAD_TYPE"] = item["fields"]["buyleadtype"];
                  bls[i]["TYPE"] = item["fields"]["datatype"];
                  bls[i]["ETO_ENQ_TYP"] = item["fields"]["inquirytype"]; //ETO_ENQ_TYP for search
                  bls[i]["SHORTLISTED"] = item["fields"]["SHORTLISTED"];
                  bls[i]["SHORTLIST_STATUS"] =
                    item["fields"]["SHORTLIST_STATUS"];
                  bls[i]["ETO_TDR_PUBLISH_DApensTE"] =
                    item["fields"]["postdate"];
                  bls[i]["ENRICHMENTINFO"] = "";
                  bls[i]["FK_GLCAT_MCAT_ID"] = item["fields"]["mcatid"]
                    ? item["fields"]["mcatid"][0]
                    : "";

                  //TENDER SPECIFIC
                  bls[i]["OFFER_FLAG"] = "T";
                  bls[i]["tdrmcatnametext"] = item["fields"]["tdrmcatnametext"];
                  bls[i]["tendervalue"] = item["fields"]["tendervalue"];
                  bls[i]["earnestmoney"] = item["fields"]["earnestmoney"];
                  bls[i]["docfees"] = item["fields"]["docfees"];
                  bls[i]["salestartdate"] = item["fields"]["salestartdate"];
                  bls[i]["saleenddate"] = item["fields"]["saleenddate"];
                  bls[i]["docsubmitlastdate"] =
                    item["fields"]["docsubmitlastdate"];
                  bls[i]["expirydate"] = item["fields"]["expirydate"];
                  bls[i]["DATE_TIME"] = item["fields"]["releasedate"];
                }
              });
              //search response manipulation due to different filters like mcat and city

              var renderFilterOptions = (arr) => {
                let options = {};
                try {
                  for (let i = 1; i < arr.length; i += 2) {
                    options[arr[i - 1]] = arr[i];
                  }
                  return options;
                } catch (e) {
                  return "";
                }
              };
              if (showCityFilter === true) {
                blsList = {
                  DisplayList: bls,
                  status: list["res_code"],
                  cities: renderFilterOptions(list["facet_fields"]["city"]),
                  categories: renderFilterOptions(
                    list["facet_fields"]["mcatname"]
                  ),
                  TotalBuyleads: list["total_results"] - 1,
                };
              } else {
                //authority filter has no city filter
                blsList = {
                  DisplayList: bls,
                  status: list["res_code"],
                  categories: renderFilterOptions(
                    list["facet_fields"]["mcatname"]
                  ),
                  states: renderFilterOptions(list["facet_fields"]["state"]),
                  TotalBuyleads: list["total_results"] - 1,
                };
              }
              res.send(blsList);
            } else {
              res.status(404).send({ status: "empty" });
            }
          } else {
            res.status(200).send({ status: "failed" });
          }
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/buyleads/bl/purchase": {
      let type = req.query.tdr ? "T" : "B";
      var options = {
        method: "POST",
        url: Service.BL_PURCHASE_URL,
        form: {
          token: "imobile1@15061981",
          send_email_sms: 0,
          glid: req.query.glid,
          modid: "IMOB",
          source: "IMOB",
          eto_lead_pur_pos: req.query.bl_pos,
          eto_lead_pur_pos_url: req.query.bl_pos_url + "|PWA",
          offerdisplayid: req.query.offer_id,
          pur_mode: req.query.pur_mode || "MOB",
          TYPE: req.query.type,
          clientIP: GblComFunc.cookieValExtracter(req.cookies.iploc, "gip"),
        },
      };
      if (req.query.orderValueFlag) {
        options["form"]["order_value_flag"] = parseInt(req.query.orderValueFlag);
      }
      if (req.query.mapped_mcat_id) {
        options["form"]["mapped_mcat_id"] = req.query.mapped_mcat_id;
        options["form"]["matched_mcat_id"] = parseInt(req.query.mapped_mcat_id);

      }

      if (req.query.blPageLoc) {
        let blpageloc = req.query.blPageLoc;
        blpageloc = blpageloc.replace(/5/g, "=");
        blpageloc = blpageloc.replace(/6/g, "#");
        options["form"]["bl_page_location"] = blpageloc;
      }

      if (req.query.primayMcatId)
        options["form"]["prime_mcat_id"] = parseInt(req.query.primayMcatId);

      if (req.query.grid_val && req.query.grid_val != "") {
        options["form"]["grid_val"] = req.query.grid_val;
      }
      if (req.query.lt) {
        //location avail..
        options["form"]["lat"] = req.query.lt;
        options["form"]["lg"] = req.query.lg;
        options["form"]["acc"] = req.query.acc;
      }
      if (req && req.query && req.query.in_search_keyword) {
        options["form"]["in_search_keyword"] = req.query.in_search_keyword;
      }
      req && req.query && req.query.search_top_mcat_id ? options["form"]["search_top_mcat_id"] : ''
      req && req.query && req.query.search_mcat_priority_level ? options["form"]["search_mcat_priority_level"] : ''
      let cbService = Service.BL_PURCHASE_URL;
      GblComFunc.makeRequest(req, res, options, false, false, cbService);
      break;
    }
    case "/ajaxrequest/unidentified/cityIndex": {
      let cityId = "";
      try {
        if (req.query.cityFlName) {
          let citiesJSON = require("../citiesJSON/cityflname.json");
          if (citiesJSON.hasOwnProperty(req.query.cityFlName))
            cityId = citiesJSON[req.query.cityFlName]["GL_CITY_ID"];
        }
      } catch (error) {
        let obj = { Code: "404", message: "Page not found" };
        res.status(404).send(JSON.stringify(obj));
      }
      if (cityId) {
        let options = {
          method: "POST",
          url: Service.MAPI_CITY_URL,
          form: {
            city_id: cityId,
            latest_suppliers: "1",
            token: "imobile@15061981",
            modid: "IMOB",
          },
        };
        let cbService = Service.MAPI_CITY_URL;
        GblComFunc.makeRequest(req, res, options, false, true, cbService)
          .then((dataString) => {
            res.status(200).send(dataString);
          })
          .catch((error) => {
            let obj = { Code: "503", message: error };
            res.status(503).send(JSON.stringify(obj));
          });
      } else {
        let obj = { Code: "404", message: "Page not found" };
        res.status(404).send(JSON.stringify(obj));
      }
      break;
    }
    case "/ajaxrequest/unidentified/mcat" || "/ajaxrequest/identified/mcat": {
      const userIp = requestIp.getClientIp(req);
      let actualIP = '';
      userIp != undefined ? actualIP = userIp : actualIP = '';
      const flName = req.query.flName;
      const url = Service.IMPCAT_URL;
      let cityFlName = req.query.cityFlName ? req.query.cityFlName.toLowerCase() : '';
      cityFlName = cityFlName && !cityFlName.endsWith("%20") && cityFlName.includes(' ') ? cityFlName.replace(' ', '-') : cityFlName;
      while (cityFlName && cityFlName.includes(' ')) {
        cityFlName = cityFlName.replace(' ', '')
      }
      let cityId = req.query.cityId || '';
      if (cityFlName) {
        if (cityId == '') {
          let citiesJSON = require("../citiesJSON/cityflname.json");
          if (citiesJSON.hasOwnProperty(cityFlName))
            cityId = citiesJSON[cityFlName]["GL_CITY_ID"];
        }
        if (cityId == "") {
          let errorObj = {
            header_status: 404,
            msg: start == 1 ? "Page not found" : "Data not found",
          };
          res.status(404).send(JSON.stringify(errorObj));
        }
      }

      const start = req.query.start;
      const end = req.query.end;
      const language = req.query.language || "en";
      // const glusrid = req.query.glusrid || "";
      const bizValue = req.query.bizValue || "";
      const ecomValue = req.query.ecomValue || "";
      let isqFilter = req.query.isqFilter || "";
      let glidVal = "";
      if (req.cookies && req.cookies.ImeshVisitor)
        glidVal = req.cookies.ImeshVisitor.split("|glid=")[1] ? req.cookies.ImeshVisitor.split("|glid=")[1].split("|")[0] : "";
      let randomValue = Math.floor(Math.random() * (900)) + 100;
      let price_flag = req.query && req.query.price ? req.query.price : 0;
      const options = {
        method: "POST",
        url: url,
        page: 'MCAT',
        cityFlName: cityFlName,
        form: {
          rltdprod: 30,
          flname: flName,
          cityid: cityId,
          start: start,
          end: end,
          token: "imobile@15061981",
          modid: "IMOB",
          pck_name_param: "pck_sellers_mcat_listing",
          supplier_listing_generic: 1,
          language: language,
          biz_filter: bizValue,
          ecom_filter: ecomValue,
          price_filter: price_flag,
          user_request_ip: actualIP,
          in_isq_option: isqFilter && !isNaN(isqFilter) ? isqFilter : "",
          glusrid: glidVal,
          in_country_iso: (typeof (in_country_iso) == "number") && (in_country_iso === 0 || in_country_iso === 1) && req.query.in_country_iso ? req.query.in_country_iso : 0,
          randomizer: randomValue,
          mode: start > 56 ? 1 : 0,
        },
        timeout: 8000,
      };
      if (start == 1) {
        let headerKey = require('../constants/serverConstants.json').PAGE_TYPE_HEADER;
        let headerVal = '';
        if (cityId == "") headerVal = 'AJAX_IMPCAT';
        else headerVal = 'AJAX_IMPCAT_CITY';
        headerKey && headerVal ? res.set(headerKey, headerVal) : '';//if key and val exist set header
      }
      let cbService = Service.IMPCAT_URL;
      if (start > 56) {
        GblComFunc.makeRequest(req, res, options, false, false, cbService);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true, cbService)
          .then((dataString) => {
            try {
              const data = JSON.parse(dataString);
              if (data.header_status == 200) {
                const parser = require('../SSRSections/Mcat/parser');
                let mcatObj = { flName: flName, language: language, cityName: cityFlName, cityId: cityId };
                if (start == 1) {
                  parser.firstData(data, mcatObj, req).then(response => {
                    res.status(200).send(JSON.stringify(response));
                  })
                    .catch(error => {
                      let errorObj = {
                        header_status: 503,
                        msg: error,
                      };
                      res.status(503).send(JSON.stringify(errorObj));
                    })
                }
                else {
                  parser.autofetchData(data, mcatObj, req).then(response => {
                    res.status(200).send(JSON.stringify(response));
                  })
                    .catch(error => {
                      let errorObj = {
                        header_status: 503,
                        msg: error,
                      };
                      res.status(503).send(JSON.stringify(errorObj));
                    })
                }
              }
              //301 redirection
              else if (
                data["header_status"] === "301" &&
                data["alternate_mcat_name"]
              ) {
                let errorObj = data;
                errorObj["msg"] = "301Redirection";
                res.status(200).send(JSON.stringify(data));
              }
              else if ((data["header_status"] && data["header_status"] === "301" && data["Reason"] == "BANNED_CITY")) {
                let errorObj = data;
                errorObj["msg"] = "301Redirection";
                res.status(200).send(JSON.stringify(data));
              }
              else if (data["header_status"] && data["header_status"] === "301" && data["Reason"] == "NO DATA FOR FILTER") {
                let errorObj = data;
                errorObj["msg"] = "301Redirection";
                res.status(200).send(JSON.stringify(data));
              }
              else if (
                data["header_status"] === "404" ||
                (data["mcatname"] && data["data"].length == 0)
              ) {
                //Rehit for city with no data
                if (req.query.cityFlName && start == 1) {
                  let errorObj = {
                    header_status: 404,
                    msg: "rehit",
                  };
                  res.status(200).send(JSON.stringify(errorObj));
                }
                let errorObj = {
                  header_status: 404,
                  msg: start == 1 ? "Page not found" : "Data not found",
                };
                res.status(404).send(JSON.stringify(errorObj));
              } else {
                throw data;
              }
            } catch (error) {
              let errorObj = {
                header_status: 503,
                msg: error,
              };

              res.status(503).send(JSON.stringify(errorObj));
            }
          })
          .catch((error) => {
            let errorObj = {
              header_status: 503,
              msg: error,
            };

            res.status(503).send(JSON.stringify(errorObj));
          });
      }

      break;
    }

    case "/ajaxrequest/faq/getToken": {
      const params = {
        grant_type: "password",
        username: "indiamart.answerbase.com",
      };
      const FaqHelper = require("../FaqManager/helper");
      FaqHelper.getToken(params.grant_type, params.username, req, res).then((response) => res.status(200).send(JSON.stringify(response)));
      break;
    };

    case "/ajaxrequest/faq/getFaq" || "faqAjax/mcat/getFaq": {
      const mcatid = req.query.mcatid || req.query.mcat_id;
      const FaqHelper = require("../FaqManager/helper");
      FaqHelper.getFaqData(mcatid, req, res, req.query.startPoint).then(
        (response) => {
          res.status(200).send(JSON.stringify(response))
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }

    case "/ajaxrequest/faq/postAnswer": {
      const params = {
        userName: req.query.userName,
        quesId: req.query.quesId,
        text: decodeURI(req.query.text),
        token: decodeURI(req.query.token)
      };
      const FaqHelper = require("../FaqManager/helper");
      FaqHelper.postResponse(
        "ANSWER",
        params.userName,
        params.text,
        params.quesId,
        '',
        '',
        req,
        res,
        params.token
      ).then((response) => {
        response = { data: "no", header_status: 200 };
        res.status(200).send(JSON.stringify(response));
      });

      break;
    }
    case "/ajaxrequest/faq/postQuestion": {
      const params = {
        userName: req.query.userName,
        text: decodeURI(req.query.text),
        cityName: decodeURI(req.query.cityName),
        mcatId: req.query.mcatid,
        mcatName: decodeURI(req.query.mcatName),
        token: decodeURI(req.query.token)
      };
      const location = params.cityName ? params.cityName : "All India";
      const details = `${params.mcatName},${params.mcatId},${location},IMOB`;
      const FaqHelper = require("../FaqManager/helper");
      FaqHelper.postResponse(
        "QUESTION",
        params.userName,
        params.text,
        "",
        params.mcatId,
        details,
        req,
        res,
        params.token
      ).then((response) => res.status(200).send(JSON.stringify(response)));

      break;
    }
    case "/ajaxrequest/widgets/products": {
      let mcats = req.query.mcats;
      let mcatstr = "";
      let mcats_arr = mcats.split(",");
      let mcatlength = mcats_arr.length;
      if (mcatlength > 0) {
        for (var i = 0; i < mcatlength; i++) {
          if (mcats_arr[i] != "") {
            mcatstr += "MCAT_ID" + (i + 1) + "=" + mcats_arr[i] + "&";
          }
        }
      }

      var options = {
        method: "GET",
        // url: Service.RECOMMENDED_GETRELATED_URL + req.query.mcats + '/type/2/modid/' + req.query.modid + '/count/' + req.query.count,
        url:
          Service.RECOMM_PROD_URL +
          "?token=imobile@15061981&" +
          mcatstr +
          "modid=IMOB&TYPE=M&count=" +
          req.query.count,
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.RECOMM_PROD_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    /////////////////?
    case "/ajaxrequest/widgets/relatedMcat": {
      var MCAT_ID1 = "",
        MCAT_ID2 = "",
        MCAT_ID4 = "",
        MCAT_ID3 = "";
      if (req.query.MCAT_ID && req.query.MCAT_ID[0] != undefined) {
        MCAT_ID1 = req.query.MCAT_ID[0].mcatid;
      }
      if (req.query.MCAT_ID && req.query.MCAT_ID[1] != undefined) {
        MCAT_ID2 = req.query.MCAT_ID[1].mcatid;
      }
      if (req.query.MCAT_ID && req.query.MCAT_ID[2] != undefined) {
        MCAT_ID3 = req.query.MCAT_ID[2].mcatid;
      }
      if (req.query.MCAT_ID && req.query.MCAT_ID[3] != undefined) {
        MCAT_ID4 = req.query.MCAT_ID[3].mcatid;
      }
      let urls = "";
      urls =
        Service.RECOMM_PROD_URL +
        "token/imobile@15061981/MCAT_ID1/" +
        req.query.MCAT_ID +
        "/MCAT_ID2/" +
        MCAT_ID2 +
        "/MCAT_ID3/" +
        MCAT_ID3 +
        "/MCAT_ID4/" +
        MCAT_ID4 +
        "/CITY_ID//modid/IMOB/source//TYPE/M/count/6/";
      var options = {
        method: "GET",
        url: urls, //todo replace (mapi.indiamart.com) to (related.imutils.com) when going to dev also add dynamic city id
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.RECOMM_PROD_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }

    case "/ajaxrequest/widgets/relatedData": {
      let options = {
        method: "GET",
        url:
          Service.RECOMM_PROD_URL +
          `?token=imobile@15061981&modid=IMOB&TYPE=M${req.query.MCAT_ID1 ? "&MCAT_ID1=" + req.query.MCAT_ID1 : ""
          }${req.query.MCAT_ID2 ? "&MCAT_ID2=" + req.query.MCAT_ID2 : ""}${req.query.MCAT_ID3 ? "&MCAT_ID3=" + req.query.MCAT_ID3 : ""
          }${req.query.MCAT_ID4 ? "&MCAT_ID4=" + req.query.MCAT_ID4 : ""}${req.query.CITY_ID ? "&CITY_ID=" + req.query.CITY_ID : ""
          }${req.query.displayid ? "&displayid=" + req.query.displayid : ""}${req.query.count ? "&count=" + req.query.count : ""
          }${req.query.count_mcat ? "&count_mcat=" + req.query.count_mcat : ""
          }${req.query.relProdFlag ? "&relProdFlag=" + req.query.relProdFlag : ""
          }${req.query.ecomFlag && req.query.ecomFlag != '' ? "&ecomflag=" + req.query.ecomFlag : ""}`,
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.RECOMM_PROD_URL;
      let flag = false;
      if (req.query.MCAT_ID1 && isNaN(req.query.MCAT_ID1)) flag = true;
      if (req.query.MCAT_ID2 && isNaN(req.query.MCAT_ID2)) flag = true;
      if (req.query.MCAT_ID3 && isNaN(req.query.MCAT_ID3)) flag = true;
      if (req.query.MCAT_ID4 && isNaN(req.query.MCAT_ID4)) flag = true;
      if (req.query.CITY_ID && isNaN(req.query.CITY_ID)) flag = true;
      if (req.query.displayid && isNaN(req.query.displayid)) flag = true;
      if (req.query.count && isNaN(req.query.count)) flag = true;
      if (req.query.count_mcat && isNaN(req.query.count_mcat)) flag = true;
      if (req.query.relProdFlag && isNaN(req.query.relProdFlag)) flag = true;

      if (!flag) {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            res.status(200).send(data);
          },
          (error) => {
            res.status(200).send({ message: "No data found" });
          }
        );
      }
      else {
        return new Promise(function (resolve, reject) { reject("No data found") })
          .then((data) => { res.status(200).send({ message: "No data found" }) },
            (error) => { res.status(200).send({ message: "No data found" }) })
      }
      break;
    }

    /////////////////caps service
    case "/ajaxrequest/widgets/CAPService/": {
      let options = {
        method: "GET",
        url:
          Service.CAPS_PROD_SERVICES_URL +
          "token=imobile@15061981" +
          `${req.query.caps_prd_flag ? "&caps_prd_flag=" + req.query.caps_prd_flag : ""
          }${req.query.recom_displayid ? "&recom_displayid=" + req.query.recom_displayid : ""
          }${req.query.count ? "&count=" + req.query.count : ""
          }${req.query.modid ? "&modid=" + req.query.modid : ""
          }`,
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,

      };
      let cbService = Service.CAPS_PROD_SERVICES_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },

        (error) => {
          res.status(200).send({ message: `{"No data found"+${error}+${options.url}}` });
        }
      );
      break;

    }
    ////////////////////////?
    case "/ajaxrequest/widgets/relatedproducts": {
      var options = {
        method: "GET",
        url:
          Service.RECOMM_PROD_URL +
          "token/imobile@15061981/MCAT_ID1/" +
          req.query.MCAT_ID +
          "/CITY_ID/" +
          req.query.city +
          "/modid/IMOB/buyerid//count/" +
          req.query.prod_count +
          "/ecomflag/" +
          req.query.ecomflag +
          "/source/",
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.RECOMM_PROD_URL;
      if (req.query.MCAT_ID && !isNaN(req.query.MCAT_ID)) {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            res.status(200).send(data);
          },
          (error) => {
            res.status(200).send({ message: "No data found" });
          }
        );
      }
      else {
        return new Promise(function (resolve, reject) { reject("No data found") })
          .then((data) => { res.status(200).send({ message: "No data found" }) },
            (error) => { res.status(200).send({ message: "No data found" }) })
      }
      break;
    }
    case "/ajaxrequest/advSrch/advSearchIsq": {
      let options = {
        method: "GET",
        url:
          Service.ADV_ISQ_URL + `${req.query.search_param ? ('search_param=' + req.query.search_param) : ''}${req.query.iso ? '&iso=' + req.query.iso : ''}`,
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.ADV_ISQ_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    //////////////?
    case "/ajaxrequest/widgets/recentrelatedmcat": {
      var options = {
        method: "GET",
        url:
          Service.RECOMMENDED_GET_PRODUCTDATA_URL +
          req.query.mcats +
          "token/imobile@15061981/TYPE//count/10/count_mcat/10/rel_prd_flag/modid/IMOB/",
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.RECOMMENDED_GET_PRODUCTDATA_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/messagecenter/lastseen": {
      let url = "";
      if (
        process.env.NODE_ENV_M == "dev" ||
        process.env.NODE_ENV_M == "stg" ||
        typeof process.env.NODE_ENV_M == "undefined"
      ) {
        url =
          "https://dev-mapi2.indiamart.com/MY/MyActivity/Getactivitystatus/";
      } else {
        url = "https://bizfeed.imutils.com/MyActivity/Getactivitystatus/";
      }

      var options = {
        method: "GET",
        url: url + "?gluser_id=" + req.query.rglid + "&modid=IMOB",
        headers: {
          "content-type": "application/json",
        },
      };

      if (
        process.env.NODE_ENV_M == "dev" ||
        process.env.NODE_ENV_M == "stg" ||
        typeof (process.env.NODE_ENV_M == "undefined")
      ) {
        options.headers["Authorization"] =
          "Basic " + new Buffer("admin" + ":" + "admin").toString("base64");
      }

      request(options, function (error, response, body) {
        if (error) {
          throw new Error(error);
        } else {
          res.send(body);
        }
      });
      break;
    }
    case "/ajaxrequest/miniproddetail.php": {
      var options = {
        method: "GET",
        url:
          Service.PDP_PROD_DETAIL_URL +
          "token/imobile@15061981/displayid/" +
          req.query.displayId +
          "/modid/imob/product_page/PRD_DETAIL/flag/1/",
      };
      let cbService = Service.PDP_PROD_DETAIL_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        function (body) {
          res.status(200).send(body);
        },
        function (error) {
          res.status(200).send();
        }
      );
      break;
    }
    case "/ajaxrequest/getTendersStateData": {
      var options = {
        method: "GET",
        url:
          Service.BL_TENDERS_URL + "state/?token=imobile1@15061981&modid=IMOB",
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(503).send();
        } else {
          res.status(200).send(body);
        }
      });
      break;
    }
    case "/ajaxrequest/getTendersStateAuthorityData": {
      var options = {
        method: "GET",
        url:
          Service.BL_TENDERS_URL +
          "authorities/?token=imobile1@15061981&modid=IMOB",
      };
      request(options, function (error, response, body) {
        if (error) {
          res.status(503).send();
        } else {
          res.status(200).send(body);
        }
      });
      break;
    }
    case "/ajaxrequest/identified/soi/seller/user/address": {
      var options = {
        method: "GET",
        url:
          Service.USER_IMUTILS_SELLER_ADDRESS_URL +
          "modid/IMOB/token/imobile@15061981/latitude/" +
          req.query.lt +
          "/longitude/" +
          req.query.lg +
          "/screen_name/Sell_On_Indiamart_Address/type/2/",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
      if (
        process.env.NODE_ENV_M == "dev" ||
        process.env.NODE_ENV_M == "stg" ||
        typeof process.env.NODE_ENV_M == "undefined"
      ) {
        options.headers["Authorization"] =
          "Basic " + new Buffer("admin" + ":" + "admin").toString("base64");
      }
      let cbService = Service.USER_IMUTILS_SELLER_ADDRESS_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    // NTB?
    case "/ajaxrequest/widgets/moreproductsrelated": {
      var options = {
        method: "GET",
        url:
          Service.RECOMM_PROD_URL +
          "token/imobile@15061981/MCAT_ID1/" +
          req.query.MCAT_ID +
          "/CITY_ID/" +
          req.query.city +
          "/modid/IMOB/buyerid//count/" +
          req.query.prod_count +
          "/source/" +
          "product_detail_page" +
          "/rel_prd_flag/1/displayid/" +
          req.query.edisplayID +
          "/",
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.RECOMM_PROD_URL;
      if (req.query.MCAT_ID && !isNaN(req.query.MCAT_ID)) {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            res.status(200).send(data);
          },
          (error) => {
            res.status(200).send({ message: "No data found" });
          }
        );
      }
      else {
        return new Promise(function (resolve, reject) { reject("No data found") })
          .then((data) => { res.status(200).send({ message: "No data found" }) },
            (error) => { res.status(200).send({ message: "No data found" }) })
      }
      break;
    }

    case "/ajaxrequest/identified/messages/moreproductsrelated": {
      var options = {
        method: "GET",
        url:
          Service.RECOMM_PROD_URL +
          "token/imobile@15061981" +
          "/modid/" + req.query.modid + "/buyerid//count/" +
          req.query.prod_count +
          "/source/" +
          "product_detail_page" +
          "/rel_prd_flag/1/displayid/" +
          req.query.edisplayID +
          "/",
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.RECOMM_PROD_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    //NTB?
    case "/ajaxrequest/widgets/sellernearme": {
      var options = {
        method: "GET",
        url:
          Service.RECOMM_PROD_URL +
          "token/imobile@15061981/MCAT_ID1/" +
          req.query.MCAT_ID +
          "/CITY_ID/" +
          req.query.city +
          "/modid/IMOB/buyerid//count/" +
          req.query.prod_count +
          "/source/" +
          "product_detail_page" +
          "/rel_prd_flag/1/displayid/" +
          req.query.edisplayID +
          "/",
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.RECOMM_PROD_URL;
      if (req.query.MCAT_ID && !isNaN(req.query.MCAT_ID)) {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            res.status(200).send(data);
          },
          (error) => {
            res.status(200).send({ message: "No data found" });
          }
        );
      }
      else {
        return new Promise(function (resolve, reject) { reject("No data found") })
          .then((data) => { res.status(200).send({ message: "No data found" }) },
            (error) => { res.status(200).send({ message: "No data found" }) })
      }
      break;
    }
    case "/ajaxrequest/identified/mbr/fetchRatings":
    case "/ajaxrequest/identified/messages/fetchRatings":
    case "/ajaxrequest/identified/messages/fetchAvgRating": {
      let formdata = {
        modid: "IMOB",
        token: "imobile@15061981",
        input_supplier_id: req.query.input_supplier_id,
      };
      if (req.query.input_buyer_id) {
        formdata.input_buyer_id = req.query.input_buyer_id;
      }
      var options = {
        method: "POST",
        url: Service.GET_RATINGS_URL,
        form: formdata,
      };
      let cbService = Service.GET_RATINGS_URL;
      GblComFunc.makeRequest(req, res, options, false, false, cbService);
      break;
    }
    case "/ajaxrequest/company/rating": {
      let formdata = {
        modid: "IMOB",
        token: "imobile@15061981",
        input_supplier_id: req.query.input_supplier_id,
        sort_type: 1,
        limit: req.query.limit ? req.query.limit : '',
        AK: "eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJDUk9OIiwiYXVkIjoiMTAuMC4xMC42OCwzLjIxOS4yMC44LDEwLjAuMTAuOTMsMy4yMTkuMTQzLjE4LDEwLjAuMTAuOSwxOC4yMzIuMjM2LjIyNiwxMC4wLjEwLjEyLDMuMjE5LjIwNS4yNDUsMTAuMC45LjQ1LDE4LjIxMS4xNzAuMTU2LDEwLjAuOS40MCwzNC4yMjUuMTY3LjM3LDEwLjEzOC4wLjU0LDM1LjIwMC4yMzEuMTIsMTAuMTM4LjAuNTMsMzQuOTMuMjQ5LjE4MCwxMC4xMzguMC41MywzNC45My4yNDkuMTgwLDEwLjEzOC4wLjUyLDM0LjkzLjc3LjE3NSwxMC4xMzguMC41MSwzNC45My4xMTguMTIsMTAuMTI4LjAuNTEsMzUuMjAwLjIyNC43MiwxMC4xMjguNS4xMSwzNS4yMDAuMjMwLjEyMSwxMC4xMjguMC4xMSwzNS4yMjYuMjA0LjY2LDEwLjEyOC4wLjE2LDM1LjIwMi4xNTIuMjIwLDEwLjEyOC4wLjksMzUuMjI2LjIwNS4xMzcsMTAuMTI4LjAuNywzNS4xODguMjkuMTcxLDEwLjEyOC4wLjQsMzUuMTg0LjY5LjIzMSwxMC4xMjguMC4xMCwzNS4xOTMuNjQuMTA1IiwiZXhwIjoxODIxNTE5Mzk0LCJpYXQiOjE2NjM4MTkzOTQsInN1YiI6Ik1PQklMRSJ9.1qsTa98O-o11FYHqa71UsY-hpsv8GliX07EW3WzDo9A"
      };
      if (req.query.input_buyer_id) {
        formdata.input_buyer_id = req.query.input_buyer_id;
      }
      var options = {
        method: "POST",
        url: "http://users.imutils.com/wservce/users/supplierrating/",
        form: formdata,
      };
      let cbService = "http://users.imutils.com/wservce/users/supplierrating/";
      GblComFunc.makeRequest(req, res, options, false, false, cbService, 0, true);
      break;
    }
    case "/ajaxrequest/identified/mbr/getTransactiondetails":
    case "/ajaxrequest/identified/messages/getTransactiondetails": {
      var options = {
        method: "POST",
        url: Service.LATEST_TRANSACTION_DETAILS_URL,
        form: JSON.stringify(
          {
            "user_glid": req.query.user_glid,
            "contact_glid": req.query.contact_glid,
            "modid": req.query.modid,
            "rating_info": "1",
            "latest_txn_info": "0",
          }
        )

      };
      let cbService = Service.LATEST_TRANSACTION_DETAILS_URL;
      GblComFunc.makeRequest(req, res, options, true, false, cbService);
      break;
    }
    case '/ajaxrequest/identified/messages/influParam':
      {
        var options = {
          method: 'GET',
          url: Service.GET_INFLU_PARAM_URL + '?token=imobile@15061981&modid=IMOB',
        }
        let cbService = Service.GET_INFLU_PARAM_URL;
        GblComFunc.makeRequest(req, res, options, false, false, cbService);
        break;
      }
    case "/ajaxrequest/identified/messages/userlastseen": {
      var options = {
        method: "GET",
        url:
          Service.USER_LAST_SEEN_URL +
          "?modid=IMOB&gluser_id=" +
          req.query.glid,
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.USER_LAST_SEEN_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    case "/ajaxrequest/proddetail/userlastseen": {
      let options = {
        method: "GET",
        url:
          Service.USER_LAST_SEEN_URL +
          "?modid=IMOB&gluser_id=" +
          req.query.glid,
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.USER_LAST_SEEN_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    case "/ajaxrequest/company/userlastseen": {
      let options = {
        method: "GET",
        url:
          Service.USER_LAST_SEEN_URL +
          "?modid=IMOB&gluser_id=" +
          req.query.glid,
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.USER_LAST_SEEN_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    //Dir
    case "/ajaxrequest/dir/": {
      var options = {
        method: "GET",
        url:
          Service.MAPI_IM_CAT_URL +
          "?modid=imob&token=immenu@7851&mtype=group_v3",
        form: {},
      };
      let cbService = Service.MAPI_IM_CAT_URL;
      let lookup = Cache.getCache(options.url);
      if (lookup != undefined) {
        var data = lookup;
        res.send(data);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            Cache.setCache(options.url, data, 86400);
            res.status(200).send(data);
          },
          (error) => {
            if (error == ERROR) {
              res.status(503).send();
            } else {
              res.status(error).send();
            }
          }
        );
      }

      break;
    }
    //sid
    case "/ajaxrequest/sid": {
      var options = {
        method: "GET",
        url:
          "http://impcat.imutils.com/wservce/Products/StandardProductHomePage/token/imobile@15061981/modid/IMOB/",
        form: {},
      };
      let lookup = Cache.getCache(options.url);
      if (lookup != undefined) {
        var data = lookup;
        res.send(data);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true).then(
          (data) => {
            Cache.setCache(options.url, data, 86400);
            res.status(200).send(data);
          },
          (error) => {
            if (error == ERROR) {
              res.status(503).send();
            } else {
              res.status(error).send();
            }
          }
        );
      }

      break;
    }
    //sid_details
    case "/ajaxrequest/sid/details": {
      // console.log("we are here "+req.query.std_prod_id);
      var options = {
        method: "GET",
        url:
          "http://impcat.imutils.com/wservce/Products/standardproduct/modid/IMOB/token/imobile@15061981/std_prod_id/" + req.query.std_prod_id + "/version/1/",
        form: {},
      };
      let lookup = Cache.getCache(options.url);
      if (lookup != undefined) {
        var data = lookup;
        res.send(data);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true).then(
          (data) => {
            //Cache.setCache(options.url, data, 86400);
            res.status(200).send(data);
          },
          (error) => {
            if (error == ERROR) {
              res.status(503).send();
            } else {
              res.status(error).send();
            }
          }
        );
      }

      break;
    }
    //sid/seller_listing
    case "/ajaxrequest/sid/sellerlisting": {
      var options = {
        method: "GET",
        url:
          "http://imsearch.indiamart.com:8983/search/ims?q=" + req.query.search_parameter + "&source=sid.search&search.server=imsearch.indiamart.com&options.start=0&options.results=20",
        form: {},
      };
      let lookup = Cache.getCache(options.url);
      if (lookup != undefined) {
        var data = lookup;
        res.send(data);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true).then(
          (data) => {
            //Cache.setCache(options.url, data, 86400);
            res.status(200).send(data);
          },
          (error) => {
            if (error == ERROR) {
              res.status(503).send();
            } else {
              res.status(error).send();
            }
          }
        );
      }

      break;
    }

    case "/ajaxrequest/widgets/recommendedmcat": {
      let options = {
        method: "GET",
        url:
          Service.RECOMM_PROD_URL +
          `token/imobile@15061981/modid/STDPRD/RELATED_MCATS/1/MCAT_ID1/` + req.query.mcatid + '/count/10/',
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.RECOMM_PROD_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    //Grp
    case "/ajaxrequest/grp/": {
      var options = {
        method: "GET",
        url:
          Service.MAPI_IM_CAT_URL +
          "?token=immenu@7851&mtype=grp&flname=" +
          req.query.flname,
        form: {},
      };
      let cbService = Service.MAPI_IM_CAT_URL;
      let lookup = Cache.getCache(options.url);
      if (lookup != undefined) {
        var data = lookup;
        res.send(data);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            Cache.setCache(options.url, data, 86400);
            res.status(200).send(data);
          },
          (error) => {
            if (error == ERROR) {
              res.status(503).send();
            } else {
              res.status(error).send();
            }
          }
        );
      }

      // GblComFunc.makeRequest(req, res, options, true);
      break;
    }

    //SUBCAT 
    case "/ajaxrequest/subcat/": {
      var options = {
        method: "GET",
        url:
          Service.MAPI_IM_CAT_URL +
          "?token=immenu@7851&mtype=scat&flname=" +
          req.query.flname +
          "&from=" +
          req.query.from +
          "&to=" +
          req.query.to +
          "&allmcat=1",
        form: {},
      };
      let cbService = Service.MAPI_IM_CAT_URL;
      let lookup = Cache.getCache(options.url);
      if (lookup != undefined) {
        var data = lookup;
        res.send(data);
      } else {
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            Cache.setCache(options.url, data, 86400);
            res.status(200).send(data);
          },
          (error) => {
            if (error == ERROR) {
              res.status(503).send();
            } else {
              res.status(error).send();
            }
          }
        );
      }

      // GblComFunc.makeRequest(req, res, options, true);
      break;
    }
    case "/ajaxrequest/identified/allVersions": {
      let versions = require("../JSVersionManager/handler").getVersions();
      res.set("Content-Type", "application/json");
      res.status(200).send(versions);
      break;
    }

    case "/ajaxrequest/identified/products/unitSugg": {
      var options = {
        method: "GET",
        url:
          Service.GET_SUGGESTION_URL +
          "?q=" +
          req.query.val +
          "&tag=suggestions&limit=20&type=unit",
        headers: {
          "content-type": "application/json",
        },
      };
      GblComFunc.makeRequest(req, res, options, false, true).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    //Not Used Anymore
    case "/ajaxrequest/identified/products/mcat": {
      var options = {
        method: "GET",
        url:
          Service.PROD_MCAT_INFO_URL +
          "?q=" +
          req.query.val +
          "&source=imob.related.info",
        headers: {},
      };
      GblComFunc.makeRequest(req, res, options, false, true).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    case "/ajaxrequest/identified/products/negmcat": {
      var options = {
        method: "GET",
        url:
          Service.NEG_MCAT_URL +
          "?token=imobile@15061981&glusrid=" +
          req.query.glid +
          "&modid=SELLERMY",
        headers: {},
      };
      GblComFunc.makeRequest(req, res, options, false, true).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }
    case "/ajaxrequest/identified/messages/proddetail.php":
    case "/ajaxrequest/identified/MBR/proddetail.php":
    case "/ajaxrequest/proddetail.php": {
      require("../SSRSections/PDP/serviceManager")(req.query.displayId, req, res).then(
        (data) => {
          if (data === "Page Not Found") {
            res.status(404).send({ status: "404" });
          }
          else {
            var gRPCRes = data.toObject();
            // console.log("Type: ", typeof (gRPCRes));
            // console.log("New Grpc Res: ", gRPCRes);
            res.status(200).send(gRPCRes);
            // res.status(200).send((data));
          }
        },
        (error) => {
          if (error === "Page Not Found") {
            res.status(404).send({ status: "404" });
          } else {
            res.status(503).send({ status: "503" });
          }
        }
      );
      break;
    }
    case "/ajaxrequest/widgets/stdproducts": {
      var options = {
        method: "GET",
        url:
          Service.REL_STDPROC_URL +
          "modid/IMOB/token/imobile@15061981/mcat_id/" +
          req.query.MCAT_ID +
          (req.query.std_prod_id ? '/std_prod_id/' + req.query.std_prod_id : "") +
          "/counter/" +
          req.query.Counter +
          "/",
        headers: {
          "content-type": "application/json",
        },
        timeout: 1000,
      };
      let cbService = Service.REL_STDPROC_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/getCityName": {
      if (req.query.cityId) {
        let data = require("../citiesJSON/getCityName")(req.query.cityId);
        if (data === "NOT_FOUND" || data === "PARSING_FAILED") {
          res.status(200).send({ data: "Not Found" });
        } else {
          res.status(200).send(data);
        }
      } else {
        res.status(200).send({ status: "Not Found" });
      }
      break;
    }
    case "/ajaxrequest/getCompanyData": {
      let companyConsts = require("../SSRSections/Company/utilities/constants");
      let compServiceData;
      if (req.query.catlink) {
        //to catlink Parser
        compServiceData = require("../SSRSections/Company/serviceManager/serviceHandler")(
          req,
          res,
          "companyCatlink",
          req.query.glid,
          req.query.alias,
          req.query.catlink,
          true,
          false,
          req.query.start_idx,
          req.query.end_idx
        );
      } else if (req.query.glid || req.query.alias) {
        //to companyHome Parser
        compServiceData = require("../SSRSections/Company/serviceManager/serviceHandler")(
          req,
          res,
          "companyHome",
          req.query.glid,
          req.query.alias,
          "",
          true
        );
      } else {
        res.status(200).send({ Error: true });
      }
      if (compServiceData) {
        compServiceData.then(
          (response) => {
            if (response.status == "2XX") {
              res.status(200).send(response.companyData);
            } else if (response.status == "3XX") {
              res.status(200).send(response.data);
            } else if (response.status == "4XX") {
              res.status(200).send({ Error: "4XX" });
            } // error page
            else {
              res.status(200).send({ Error: "5XX", CircuitBreak: response.CircuitBreak });
            }
          },
          (error) => {
            res.status(200).send({ Error: true });
          }
        );
      }
      break;
    }

    case "/ajaxrequest/getCompanyCatlinkData": {
      var companyConsts = require("../SSRSections/Company/utilities/constants");
      require("../SSRSections/Company/serviceManager/serviceHandler")(
        req,
        res,
        "companyCatlink",
        req.query.glid,
        req.query.alias,
        req.query.catlink,
        true
      ).then(
        (response) => {
          if (response.status == "2XX") {
            res.status(200).send(response.companyData);
          } else if (response.status == "3XX") {
            res.status(200).send(response.data);
          } // error page
          else {
            res.status(200).send({ Error: true });
          }
        },
        (error) => {
          res.status(200).send({ Error: true });
        }
      );
      break;
    }
    case "/ajaxrequest/getCatlinkWidgetData": {
      var companyConsts = require("../SSRSections/Company/utilities/constants");
      require("../SSRSections/Company/serviceManager/serviceHandler")(
        req,
        res,
        companyConsts.companyCatlinkWidget,
        req.query.glid,
        req.query.alias,
        req.query.catlink,
        true
      ).then(
        (response) => {
          if (response.status == "2XX") {
            res.status(200).send(response.widgetData);
          } else if (response.status == "3XX") {
            res.status(200).send(response.data);
          } // error page
          else {
            res.status(200).send({ Error: true });
          }
        },
        (error) => {
          res.status(200).send({ Error: true });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/standardProductDetails": {
      if (req.query.displayId) {
        var options = {
          method: "GET",
          url:
            Service.BL_STANDARD_PROD_URL +
            "?token=imobile@15061981&modid=IMOB&std_prod_id=" +
            req.query.displayId +
            "&version=1.0",
          headers: {
            "content-type": "application/json",
          },
          timeout: 8000,
        };
        let cbService = Service.BL_STANDARD_PROD_URL;
        GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
          (data) => {
            res.status(200).send(data);
          },
          (error) => {
            res.status(200).send({ message: "No data found" });
          }
        );
      }
      break;
    }

    /*************************************************************************************************/
    /*                                  ENQUIRY BL            
            /*************************************************************************************************/
    case "/ajaxrequest/enquirybl/getISQ": {
      var options = {
        method: "POST",
        url: Service.GET_ISQ,
        headers: {
          "content-type": "application/json",
        },
        timeout: 3000,
        form: {
          modid: req.query.modid,
          token: req.query.token,
          cat_type: req.query.cat_type,
          isq_format: req.query.isq_format,
          fixed_attr: req.query.fixed_attr,
          encode: req.query.encode,
          generic_flag: req.query.generic_flag,
          mcatid: req.query.mcatid,
          prod_name: req.query.prod_name,
          country_iso: req.query.country_iso,
        },
      };
      let cbService = Service.GET_ISQ;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          ServiceParser.forEnquiryBlGetISQ(req, res, data, false);
        },
        (error) => {
          res.status(503).send();
        }
      );
      break;
    }

    case "/ajaxrequest/identified/truecaller/polling": {
      var options = {
        method: "GET",
        url:
          Service.TRUECALLER_POLLING +
          "?modid=IMOB&Request_ID=" +
          req.query.Request_ID +
          "&ip=" +
          req.query.ip +
          "&screen_name=" +
          req.query.screen_name,
      };
      let cbService = Service.TRUECALLER_POLLING;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(503).send(error);
        }
      );
      break;
    }

    case "/ajaxrequest/videos/mcatVideos": {
      var options = {
        method: "GET",
        url:
          Service.IMPCAT_VIDEOS_URL +
          "/?mcat_id=" +
          req.query.mcatid +
          "&modid=IMOB&token=imobile@15061981",
      };
      let cbService = Service.IMPCAT_VIDEOS_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/myTicket/getTicketDetails": {
      let options = {
        method: "GET",
        url: Service.VIEW_TICKET_URL + "?glid=" + req.query.glid + "&AK=" + req.query.AK + "&modid=" + req.query.modid + '&check=' + req.query.check + '&ticketid=' + req.query.ticketid + '&start=' + req.query.start,
        headers: {
          "content-type": "application/json",
        },
      };
      let cbService = Service.VIEW_TICKET_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/myTicket/ticketIssue": {

      let options = {
        method: "GET",
        url: Service.TICKET_ISSUE_URL + "?glid=" + req.query.glid + "&AK=" + req.query.AK + "&is_self_ticket=" + req.query.is_self_ticket + "&mailcc=" + req.query.mailcc + "&ticket_type_id=" + req.query.ticket_type_id + "&flagtype=" + req.query.flagtype + "&comments=" + req.query.comments + "&sourceid=" + req.query.sourceid + "&attachment=" + req.query.attachment + "&ticket_id=" + req.query.ticket_id + "&modid=IMOB",
        headers: {
          "content-type": "application/json",
        },
      };

      let cbService = Service.TICKET_ISSUE_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/identified/Buylead/isEnterprize": {

      let options = {
        method: "GET",
        url: Service.ENTERPRIZE_URL + "?glid=" + req.query.glid + "&AK=" + req.query.AK + "&vertical_check=1&other=yes&modid=IMOB",
        headers: {
          "content-type": "application/json",
        },
      };

      let cbService = Service.ENTERPRIZE_URL;
      GblComFunc.makeRequest(req, res, options, false, true, cbService).then(
        (data) => {
          res.status(200).send(data);
        },
        (error) => {
          res.status(200).send({ message: "No data found" });
        }
      );
      break;
    }
    case "/ajaxrequest/hotlead/viewInApp": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/addProduct": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/pushToTop": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/addPrice": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/editProduct": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/deleteProduct": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/premiumServiceBanner": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/singleBLPurchase": {
      res.status(200).send({ response: "hotlead generated" });
    }
    case "/ajaxrequest/hotlead/knowMoreSoi": {
      res.status(200).send({ response: "hotlead generated" });
    }
    default: {
      res.status(404).send({ DATA: "NOT FOUND" });
    }
  }
};