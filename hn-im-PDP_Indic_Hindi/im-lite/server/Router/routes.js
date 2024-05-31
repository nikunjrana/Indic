function serverRouter(app) {
  const shellCallBck = (res, appShellObj) => {
    require("../AppShell")(res, appShellObj);
  };
  const pageRedirect = (res, redirectObj) => {
    res.redirect(redirectObj.status, redirectObj.url);
  };

  const checkRedirectReq = (req) => {
    if (require("../GblComFunc").objIsEmpty(req.query)) {
      if (
        req.url.charAt(req.url.length - 1) != "/" &&
        req.url.indexOf(".") == -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const setPVHeader = (res, pageType, test = "") => {
    let headerKey = require("../constants/serverConstants.json")
      .PAGE_TYPE_HEADER,
      headerVal = require("../constants/pageConstants.json")[pageType];
    headerKey && headerVal ? res.set(headerKey, headerVal) : ""; //if key and val exist set header
    // res.set("Cross-Origin-Embedder-Policy","unsafe-none | require-corp");
    // res.set("Cross-Origin-Opener-Policy","same-origin"); 
    if (test) {
      res.set(headerKey, test)
    }
  };

  //check redirect
  app.use((req, res, next) => {
    if (!/^\/ajaxrequest\/.*$/.test(req.path) && checkRedirectReq(req))
      pageRedirect(res, { status: 301, url: req.url + "/" });
    else next();
  });

  app.use((req, res, next) => {
    let headerKey = require("../constants/serverConstants.json")
      .PAGE_TYPE_HEADER,
      headerVal = "";

    if (req.path.indexOf("/ajaxrequest/") > -1) {
      // API Request...
      headerVal = require("../constants/ajaxConstants.json")[req.path];
    }
    headerKey && headerVal ? res.set(headerKey, headerVal) : ""; //if key and val exist set header
    next();
  });


  app.get("/my/", function (req, res) {
    pageRedirect(res, { status: 301, url: '/login/' })
  });
  app.get(/^\/login(\/)$|\/login\/(\?.*)$/, function (req, res) {
    setPVHeader(res, "MY_LOGIN");
    require("../SSRSections/MYLogin/shell")(req, res, shellCallBck);
  });
  app.get("/my/verify/login/", function (req, res) {
    setPVHeader(res, "MY_LOGIN");
    require("../SSRSections/MYLogin/shell")(req, res, shellCallBck);
  });
  // app.get("/my/changepass/", function (req, res) {
  //   setPVHeader(res, "MY_PROFILE");
  //   require("../SSRSections/ChangePassword/changePasswordShell")(req, res, shellCallBck);
  // });
  // app.get("/my/editprofile/", function (req, res) {
  //   setPVHeader(res, "MY_PROFILE");
  //   require("../SSRSections/EditProfile/shell")(req, res, shellCallBck);
  // });
  // app.get("/my/profile/businessprofile/", function (req, res) {
  //   setPVHeader(res, "MY_PROFILE");
  //   require("../SSRSections/EditProfile/shellBusinessProfile")(req, res, shellCallBck);
  // });
  // app.get("/my/profile/addcin/", function (req, res) {
  //   setPVHeader(res, "MY_PROFILE");
  //   require("../SSRSections/EditProfile/shellCinNum")(req, res, shellCallBck);
  // });
  // app.get("/my/profile/DisableAccountPage/", function (req, res) {
  //   setPVHeader(res, "MY_PROFILE");
  //   require("../SSRSections/EditProfile/shellDisable")(req, res, shellCallBck);
  // });
  // app.get("/my/profile/", function (req, res) {
  //   setPVHeader(res, "MY_PROFILE");
  //   require("../SSRSections/Profile/shell")(req, res, shellCallBck);
  // });


  // app.get('/covid-19-supplies-search', function (req, res) {
  //   setPVHeader(res, "TWITTER");
  //   require('../SSRSections/TwitterSearch/shell')(req, res, shellCallBck);
  // });

  // app.get('/items', function (req, res) {
  //   setPVHeader(res, "SID_PAGES");
  //   require('../SSRSections/SID/sidshell')(req, res, shellCallBck);
  // });

  // app.get(/(^\/items\/.*$)/, function (req, res) {
  //   setPVHeader(res, "STANDARD_PRODUCT_PAGES");
  //   require('../SSRSections/StandardProductPages/standardProductPages').sidPageShell(req, res, shellCallBck, pageRedirect);
  // });
  app.get('/pnssettings', function (req, res) {
    setPVHeader(res, "PNS");
    require('../SSRSections/PNS/shell')(req, res, shellCallBck);
  });

  app.get('/pnssetting', function (req, res) {
    setPVHeader(res, "PNS");
    require('../SSRSections/PNS/shell')(req, res, shellCallBck);
  });

  app.get(/(^\/detail\/.*$)/, function (req, res) {
    setPVHeader(res, "MY_PROFILE");
    require("../SSRSections/MiniPDP/shell")(req, res, shellCallBck);
  });
  app.get('/proddetail/0-05-w-w-clobetasol-propionate-cream-ip-26507068788.html', function (req, res) {
    setPVHeader(res, "PDP");
    require("../SSRSections/PDP/PdpShell").pdpShell(
      req,
      res,
      false,
      shellCallBck,
      pageRedirect
    );
  });
  app.get('/proddetail/-isc-class-xii-mathematics-sample-paper-book-12-1-sample-paper-2849223328933.html', function (req, res) {
    setPVHeader(res, "PDP");
    require("../SSRSections/PDP/PdpShell").pdpShell(
      req,
      res,
      false,
      shellCallBck,
      pageRedirect
    );
  });
  app.get('/proddetail/0-01mg-analytical-balance-dual-range-semi-micro-balance-12492399533.html', function (req, res) {
    setPVHeader(res, "PDP");
    require("../SSRSections/PDP/PdpShell").pdpShell(
      req,
      res,
      false,
      shellCallBck,
      pageRedirect
    );
  });
  app.get(/(^\/proddetail\/.*[5-9]\.html)/, function (req, res) {
    setPVHeader(res, "PDP");
    require("../SSRSections/PDP/newshell").pdpShell(
      req,
      res,
      false,
      shellCallBck,
      pageRedirect
    );
  });
  app.get(/(^\/proddetail\/.*$)/, function (req, res) {
    setPVHeader(res, "PDP");
    require("../SSRSections/PDP/newshell").pdpShell(
      req,
      res,
      false,
      shellCallBck,
      pageRedirect
    );
  });
  app.get("/search.html/", function (req, res) {
    require("../SSRSections/SearchHTML/searchHtmlShell")(req, res, shellCallBck);
  });
  app.get("/proddetail/sharbati-sella-21105429697.html/", function (req, res) {
    require("../SSRSections/PDP/newshell")(req, res, shellCallBck);
  });
  app.get(/^\/impcat\/.*\/.*-q.+$/i, function (req, res) {
    setPVHeader(res, "IMPCAT_ALL_INDIA");
    const regex = /^\/impcat\/.*\/.*-q(.+)$/;
    const match = req.path.match(regex);
    let capturedValue
    if (match) { capturedValue = match[1]; }
    let testingID = capturedValue.replace("/", "")
    if (/^\d+$/.test(testingID) && !capturedValue.endsWith("/")) {
      pageRedirect(res, { status: 301, url: req.path + "/" });
    }
    require("../SSRSections/Mcat/newShell")(req, res, shellCallBck, pageRedirect, "", testingID);
  });
  app.get(/^\/impcat\/.*\.html\/?.*$/i, function (req, res) {
    setPVHeader(res, "IMPCAT_ALL_INDIA");
    let path = req.path.split("/");
    if (/[A-Z]/.test(path[1]) || req.path.includes("html/")) {
      path = `/${path[1].toLowerCase()}/${path[2]}`;
      pageRedirect(res, { status: 301, url: path });
    }
    else
      require("../SSRSections/Mcat/newShell")(req, res, shellCallBck, pageRedirect);
    // res.status(200).send("IMPCAT_ALL_INDIA");
  });
  app.get(/^\/impcat\/$/i, function (req, res) {

    setPVHeader(res, "IMPCAT_HOME");
    if (/[A-Z]/.test(req.path)) {
      let path = req.path.toLowerCase();
      pageRedirect(res, { status: 301, url: path });
    }
    else
      require("../SSRSections/Mcat/newShell")(req, res, shellCallBck);
  });

  // app.get(/^\/((?!\/).)*\/((?!\/).)*\.pdf$/, function (req, res) {
  //   console.log("hiiii");
  //   setPVHeader(res, "PDF");
  //   require("../SSRSections/Company/companyShells/pdfShell")(req, res);
  // });

  app.get(/city/, function (req, res) {
    setPVHeader(res, "IMPCAT_CITY");
    let path = req.path.split("/");
    path && path[2] && path[2].includes("%20") ? path[2] = path[2].replace(/%20/g, "-") : path[2];
    if (/[A-Z]/.test(path[1]) || req.path.includes("html/")) {
      path = `/${path[1].toLowerCase()}/${path[2]}/${path[3]}`;
      pageRedirect(res, { status: 301, url: path });
    }
    else if (path && path.length > 1 && path[2] && path[2] == 'rajkot') {
      require("../SSRSections/Mcat/newShell")(req, res, shellCallBck, pageRedirect);
    }
    else {
      require("../SSRSections/Mcat/newShell")(req, res, shellCallBck, pageRedirect);
    }

    // res.status(200).send("IMPCAT_CITY_INDEX");
  });

  // app.get(/^\/city\/.((?!\/).)*\/$/i, function (req, res) {
  //   setPVHeader(res, "IMPCAT_CITY_INDEX");
  //   let path = req.path.split("/");
  //   if (/[A-Z]/.test(path[1])){
  //     path = `/${path[1].toLowerCase()}/${path[2]}/`;
  //     pageRedirect(res, { status: 301, url: path });
  //   }
  //   else
  //     require("../SSRSections/CityIndex/shell")(req, res, shellCallBck, pageRedirect);
  // });

  // app.get(/^\/company\/.[0-9]*\/$/, function (req, res) {
  //     if(req.cookies.intCat){
  //     let CompanyRedirectionParam=req&&req.url&&req.url.split('?')&&req.url.split('?').length>1?"?"+req.url.split('?')[1]:'';
  //     req.url = "/" + req.url.split('/')[1] + '/' + req.url.split('/')[2]+'/'+req.cookies.intCat;
  //     require("../SSRSections/Company/companyShells/companyCatlinkShell")(
  //       req,
  //       res,
  //       "companyGlidCatlink",
  //       shellCallBck,
  //       pageRedirect,
  //       CompanyRedirectionParam
  //     );
  //     }
  //     else{
  //     setPVHeader(res, "COMPANY_HOME_GLID");
  //     require("../SSRSections/Company/companyShells/companyHomeShell")(
  //       req,
  //       res,
  //       "companyGlid",
  //       shellCallBck,
  //       pageRedirect
  //     );
  //     }
  // });

  // app.get(/^\/company\/.[0-9]*\/.*\.html$/, function (req, res) {
  //   let CompanyRedirectionParam=req&&req.url&&req.url.split('?')&&req.url.split('?').length>1?"?"+req.url.split('?')[1]:'';
  //   require("../SSRSections/Company/companyShells/companyCatlinkShell")(
  //     req,
  //     res,
  //     "companyGlidCatlink",
  //     shellCallBck,
  //     pageRedirect,
  //     CompanyRedirectionParam
  //   );
  // });

  app.get(/^\/proddetail\.php$/, function (req, res) {
    setPVHeader(res, "PDP_REDIRECT");
    require("../SSRSections/PDP/redirectionHandler")(
      req,
      res,
      shellCallBck,
      pageRedirect
    );
  });
  app.get(/^\/proddetail\.php\/$/, function (req, res) {
    setPVHeader(res, "PDP_REDIRECT");
    require("../SSRSections/PDP/redirectionHandler")(
      req,
      res,
      shellCallBck,
      pageRedirect
    );
  });

  app.get(/^\/ajaxrequest\/.*$/, function (req, res) {
    require("../ajaxRequests/getRequests")(req, res);
  });
  app.post(/^\/ajaxrequest\/.*$/, function (req, res) {
    require("../ajaxRequests/postRequests")(req, res);
  });

  app.get("/", function (req, res) {
    setPVHeader(res, "HOME");
    require("../SSRSections/Home/homeShell")(req, res, shellCallBck);
  });

  // app.get(/^\/isearch.php\/?$/, function (req, res) {
  //   let refUrl = req && req.cookies && req.cookies.SearchReferer ? req.cookies.SearchReferer : req && req.url ? req.url : '';
  //   refUrl ? res.set("SearchReferer", refUrl) : "";
  //   if(req&&(req.url=='/isearch.php'||req.url=='/isearch.php?')){pageRedirect(res, { status: 301, url: '/' });} 
  //   else{
  //   setPVHeader(res, "SEARCH");
  //   require("../SSRSections/Search/searchShell")(
  //     req,
  //     res,
  //     shellCallBck,
  //     pageRedirect
  //   );
  //   }
  // });

  // app.get(/^\/messages\/$/, function (req, res) {
  //   setPVHeader(res, "MESSAGES");
  //   require("../SSRSections/Messages/messageShell")(req, res, shellCallBck);
  // });
  // app.get(/^\/messages\/contactdetail\/$/, function (req, res) {
  //   setPVHeader(res, "MESSAGES_CONTACT_DETAIL");
  //   require("../SSRSections/Messages/messageShell")(req, res, shellCallBck);
  // });
  // app.get(/^\/messages\/conversation\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "MESSAGES_CONVERSATION_ID");
  //   require("../SSRSections/Messages/messageShell")(req, res, shellCallBck);
  // });
  // app.get(/^\/messages\/conversation\/$/, function (req, res) {
  //   setPVHeader(res, "MESSAGES_CONVERSATION");
  //   require("../SSRSections/Messages/messageShell")(req, res, shellCallBck);
  // });

  // app.get(/^\/buyer\/managebl\/$/, function (req, res) {
  //   setPVHeader(res, "MBR");
  //   require("../SSRSections/MBR/mbrShell")(req, res, shellCallBck);
  // });
  // app.get(/^\/managebl\/suppliers\/$/, function (req, res) {
  //   setPVHeader(res, "MBR_DETAILS");
  //   require("../SSRSections/MBR/mbrShell")(req, res, shellCallBck);
  // });

  // app.get(/^\/products\/$/, function (req, res) {
  //   setPVHeader(res, "PRODUCTS");
  //   require("../SSRSections/Product/productShell")(req, res, shellCallBck);
  // });

  // app.get(/^\/seller\//, function (req, res) {
  //   setPVHeader(res, "SELLER");
  //   require("../SSRSections/SellOnIM/sellOnIMShell")(req, res, shellCallBck);
  // });
  // //redirect mailer cases without slash after sub-domain
  // app.get(/^\/seller\//, function (req, res) {
  //   if(!req.url.match(/\/seller\//)){
  //     let splitUrl = req.url.split('?');
  //     let correctUrl = "http" + (req.socket.encrypted ? "s" : "") + "://" + 
  //     req.headers.host + (splitUrl.length > 1 ? splitUrl[0] + '/?' + splitUrl[1] : req.url);
  //     pageRedirect(res, { status: 302, url: correctUrl })
  //   }
  //   else next()
  // });

  // app.get("/bl/", function (req, res) {
  //   setPVHeader(res, "BL");
  //   require("../SSRSections/Buyleads/BL")(req, res, shellCallBck,pageRedirect);
  // });
  // app.get("/myTicket/", function (req, res) {
  //   setPVHeader(res, "MyTicket");
  //   require("../SSRSections/MyTicket/myTicketShell")(req, res, shellCallBck,pageRedirect);
  // });
  // app.get("/myTicket/past", function (req, res) {
  //   setPVHeader(res, "MyTicket/past");
  //   require("../SSRSections/MyTicket/myTicketShell")(req, res, shellCallBck,pageRedirect);
  // });
  // app.get(/^\/myTicket\/[0-9].*$/, function (req, res) {
  //   setPVHeader(res, "MyTicket");
  //   require("../SSRSections/MyTicket/myTicketShell")(req, res, shellCallBck);
  // });
  // app.get(/^\/bl\/[0-9].*$/, function (req, res) {
  //   setPVHeader(res, "BL_OFFER");
  //   require("../SSRSections/Buyleads/BLOffer")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/locpref\/$/, function (req, res) {
  //   setPVHeader(res, "BL_LOCATION");
  //   require("../SSRSections/Buyleads/BLLocPref")(req, res, shellCallBck);
  // });

  // app.get(
  //   /^\/bl\/(?!tenders)(?!tender\-notice)(?!dir)(?!blpurchaseresponse)[a-zA-Z][-a-zA-Z]+\/$/,
  //   function (req, res) {
  //     setPVHeader(res, "BL_CATEGORY");
  //     require("../SSRSections/Buyleads/BLCategory")(
  //       req,
  //       res,
  //       shellCallBck,
  //       pageRedirect
  //     );
  //   }
  // );

  // app.get(
  //   /^\/bl\/(?!tenders)(?!tender\-notice)(?!dir)(?!blpurchaseresponse)[a-zA-Z]+[-a-zA-Z]+\/[a-zA-Z]+[-a-zA-Z]+[-a-zA-Z]\/$/,
  //   function (req, res) {
  //     setPVHeader(res, "BL_SUBCATEGORY");
  //     require("../SSRSections/Buyleads/BLSubgroup")(req, res, shellCallBck);
  //   }
  // );

  // app.get(/^\/bl\/search\.php$/, function (req, res) {
  //   setPVHeader(res, "BL_SEARCH");
  //   require("../SSRSections/Buyleads/BLSearch")(req, res, shellCallBck,pageRedirect);
  // });

  // app.get("/bl/tenders/", function (req, res) {
  //   setPVHeader(res, "BL_TENDER");
  //   require("../SSRSections/Buyleads/LatestTenders")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/tenders\/[0-9]+\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_OFFER");
  //   require("../SSRSections/Buyleads/TenderOffer")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/package\.html$/, function (req, res) {
  //   setPVHeader(res, "BL_PACKAGE_PAGE");
  //   require("../SSRSections/Buyleads/BLPackage")(req, res, shellCallBck);
  // });

  // app.get("/bl/dir/", function (req, res) {
  //   setPVHeader(res, "BL_DIR");
  //   require("../SSRSections/Buyleads/BLDir")(req, res, shellCallBck);
  // });

  // app.get("/bl/blpurchaseresponse/", function (req, res) {
  //   setPVHeader(res, "BL_PURCHASE_RESPONSE");
  //   require("../SSRSections/Buyleads/BLDefault")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/tenders\/state\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_STATE");
  //   require("../SSRSections/Buyleads/TenderList")(req, res, shellCallBck);
  // });
  // app.get(/^\/bl\/tenders\/authority\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_AUTHORITY");
  //   require("../SSRSections/Buyleads/TenderList")(req, res, shellCallBck);
  // });
  // app.get(/^\/bl\/tenders\/industry\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_INDUSTRY");
  //   require("../SSRSections/Buyleads/TenderList")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/tenders\/state\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_STATE_ID");
  //   require("../SSRSections/Buyleads/BLStateleads")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/tenders\/authority\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_AUTHORITY_ID");
  //   require("../SSRSections/Buyleads/BLAuthorityleads")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/tender\-notice\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_INDUSTRY_NOTICE");
  //   require("../SSRSections/Buyleads/BLIndustryleads")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/tenders\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "BL_TENDER_SUBCAT_INDUSTRY");
  //   require("../SSRSections/Buyleads/TenderSubcat")(req, res, shellCallBck);
  // });

  // app.get(/^\/bl\/.*\/.*\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "BL_MCAT");
  //   require("../SSRSections/Buyleads/BLMcat")(req, res, shellCallBck);
  // });

  // app.get("/dir/", function (req, res) {
  //   setPVHeader(res, "DIR");
  //   require("../SSRSections/Dir/dirShell")(req, res, shellCallBck);
  // });

  // app.get(/^\/dir\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "GRP");
  //   require("../SSRSections/Dir/grpShell")(req, res, shellCallBck);
  // });

  // app.get(/^\/suppliers\/.*\/$/, function (req, res) {
  //   setPVHeader(res, "SUBCAT");
  //   require("../SSRSections/Dir/subcatShell")(req, res, shellCallBck);
  // });

  app.all("/enq/", function (req, res) {
    require("../requestHandler")(req, res);
  });

  app.get(/^\/((?!\/).)*\/((?!\/).)*\.html$/, function (req, res) {
    let pageType = require("../citiesJSON/cityHandler")(req.path);
    if (pageType === "COMPANY") {
      setPVHeader(res, "COMPANY_CAT_LINK");
      require("../SSRSections/Company/companyShells/companyCatlinkShell")(
        req,
        res,
        "companyAliasCatlink",
        shellCallBck,
        pageRedirect
      );
    } else if (pageType === "IMPCAT") {
      pageRedirect(res, { status: 301, url: "/city" + req.url });
      // setPVHeader(res, "IMPCAT_CITY");
      // require('../SSRSections/Mcat/shell')(req,res,shellCallBck,pageRedirect);
      // res.status(200).send("IMPCAT_CITY_INDEX");
    } //parsing error
    else {
      res.status(200).send("PARSING ERROR");
    }
  });

  app.get(/^\/((?!\/).)*\/$/, function (req, res) {
    let pageType = require("../citiesJSON/cityHandler")(req.path);

    if (pageType === "COMPANY") {
      if (res && res.cookies && res.cookies.intCat) {
        req.url = "/" + req.url.split('/')[1] + '/' + res.cookies.intCat;
        setPVHeader(res, "COMPANY-" + res.cookies.intCat, "COMPANY-" + res.cookies.intCat);
        require("../SSRSections/Company/companyShells/companyCatlinkShell")(
          req,
          res,
          "companyAliasCatlink",
          shellCallBck,
          pageRedirect
        );
      }
      else {
        setPVHeader(res, "COMPANY");
        require("../SSRSections/Company/companyShells/companyHomeShell")(
          req,
          res,
          "companyAlias",
          shellCallBck,
          pageRedirect
        );
      }
    } else if (pageType === "IMPCAT") {
      pageRedirect(res, { status: 301, url: "/city" + req.url });
      setPVHeader(res, "IMPCAT_CITY_INDEX");
      require("../SSRSections/CityIndex/shell")(req, res, shellCallBck);
    } //parsing error
    else {
      res.status(200).send("PARSING ERROR");
    }
  });

  //check redirect
  app.use((req, res, next) => {
    if (!/^\/ajaxrequest\/.*$/.test(req.path) && checkRedirectReq(req))
      pageRedirect(res, { status: 301, url: req.url + '/' });
    else
      next();
  });

  app.use((req, res, next) => {
    let headerKey = require('../constants/serverConstants.json').PAGE_TYPE_HEADER,
      headerVal = '';

    if (req.path.indexOf('/ajaxrequest/') > -1)// API Request...
    {
      headerVal = require('../constants/ajaxConstants.json')[req.path];
    }
    headerKey && headerVal ? res.set(headerKey, headerVal) : '';//if key and val exist set header
    next();
  });

  // app.get('/bl/pintoloc/', function (req, res) {
  //     setPVHeader(res, "LOCALITY");
  //     require('../SSRSections/Locality/localityShell')(req, res, shellCallBck);
  // });

  app.get(/(^\/proddetail\/.*$)/, function (req, res) {
    setPVHeader(res, "PDP");
    require('../SSRSections/PDP/shell').pdpShell(req, res, false, shellCallBck, pageRedirect);
  });;



  app.get(/^\/company\/.[0-9]*\/$/, function (req, res) {
    setPVHeader(res, "COMPANY_HOME_GLID");
    res.status(200).send("COMPANY_HOME_GLID");
  });

  app.get(/^\/company\/.[0-9]*\/.*\.html$/, function (req, res) {
    res.status(200).send("COMPANY_GLID_CAT_LINK");
  });

  app.get(/^\/proddetail\.php$/, function (req, res) {
    setPVHeader(res, "PDP_REDIRECT");
    require('../SSRSections/PDP/redirectionHandler')(req, res, shellCallBck, pageRedirect);
  });
  app.get(/^\/proddetail\.php\/$/, function (req, res) {
    setPVHeader(res, "PDP_REDIRECT");
    require('../SSRSections/PDP/redirectionHandler')(req, res, shellCallBck, pageRedirect);
  });
  app.get(/^\/ajaxrequest\/.*$/, function (req, res) {
    require('../ajaxRequests/getRequests')(req, res);
  });
  app.post(/^\/ajaxrequest\/.*$/, function (req, res) {
    require('../ajaxRequests/postRequests')(req, res);
  });

  // app.get('/', function (req, res) {
  //     setPVHeader(res, "HOME");
  //     require('../SSRSections/Home/homeShell')(req, res, shellCallBck);
  // });

  app.get(/^\/isearch.php\/?$/, function (req, res) {
    let refUrl = req && req.cookies && req.cookies.SearchReferer ? req.cookies.SearchReferer : req && req.url ? req.url : '';
    refUrl ? res.set("SearchReferer", refUrl) : "";
    if (req && (req.url == '/isearch.php' || req.url == '/isearch.php?')) { pageRedirect(res, { status: 301, url: '/' }); }
    else {
      setPVHeader(res, "SEARCH");
      require('../SSRSections/Search/searchShell')(req, res, shellCallBck, pageRedirect);
    }
  });

  app.get(/^\/messages\/$/, function (req, res) {
    setPVHeader(res, "MESSAGES");
    require('../SSRSections/Messages/messageShell')(req, res, shellCallBck);
  });
  app.get(/^\/messages\/contactdetail\/$/, function (req, res) {
    setPVHeader(res, "MESSAGES_CONTACT_DETAIL");
    require('../SSRSections/Messages/messageShell')(req, res, shellCallBck);
  });
  app.get(/^\/messages\/conversation\/.*\/$/, function (req, res) {
    setPVHeader(res, "MESSAGES_CONVERSATION_ID");
    require('../SSRSections/Messages/messageShell')(req, res, shellCallBck);
  });
  app.get(/^\/messages\/conversation\/$/, function (req, res) {
    setPVHeader(res, "MESSAGES_CONVERSATION");
    require('../SSRSections/Messages/messageShell')(req, res, shellCallBck);
  });

  app.get(/^\/buyer\/managebl\/$/, function (req, res) {
    setPVHeader(res, "MBR");
    require('../SSRSections/MBR/mbrShell')(req, res, shellCallBck);
  });
  app.get(/^\/managebl\/suppliers\/$/, function (req, res) {
    setPVHeader(res, "MBR_DETAILS");
    require('../SSRSections/MBR/mbrShell')(req, res, shellCallBck);
  });

  app.get(/^\/products\/$/, function (req, res) {
    setPVHeader(res, "PRODUCTS");
    require('../SSRSections/Product/productShell')(req, res, shellCallBck);
  });

  app.get(/^\/seller\//, function (req, res) {
    setPVHeader(res, "SELLER");
    require('../SSRSections/SellOnIM/sellOnIMShell')(req, res, shellCallBck);
  });

  app.get('/bl/', function (req, res) {
    setPVHeader(res, "BL");
    require('../SSRSections/Buyleads/BL')(req, res, shellCallBck, pageRedirect);
  });

  app.get(/^\/bl\/[0-9].*$/, function (req, res) {
    setPVHeader(res, "BL_OFFER");
    require('../SSRSections/Buyleads/BLOffer')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/locpref\/$/, function (req, res) {
    setPVHeader(res, "BL_LOCATION");
    require('../SSRSections/Buyleads/BLLocPref')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/(?!tenders)(?!tender\-notice)(?!dir)(?!blpurchaseresponse)[a-zA-Z][-a-zA-Z]+\/$/, function (req, res) {
    setPVHeader(res, "BL_CATEGORY");
    require('../SSRSections/Buyleads/BLCategory')(req, res, shellCallBck, pageRedirect);
  });

  app.get(/^\/bl\/(?!tenders)(?!tender\-notice)(?!dir)(?!blpurchaseresponse)[a-zA-Z]+[-a-zA-Z]+\/[a-zA-Z]+[-a-zA-Z]+[-a-zA-Z]\/$/, function (req, res) {
    setPVHeader(res, "BL_SUBCATEGORY");
    require('../SSRSections/Buyleads/BLSubgroup')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/search\.php$/, function (req, res) {
    setPVHeader(res, "BL_SEARCH");
    require('../SSRSections/Buyleads/BLSearch')(req, res, shellCallBck, pageRedirect);
  });

  app.get('/bl/tenders/', function (req, res) {
    setPVHeader(res, "BL_TENDER");
    require('../SSRSections/Buyleads/LatestTenders')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/tenders\/[0-9]+\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_OFFER");
    require('../SSRSections/Buyleads/TenderOffer')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/package\.html$/, function (req, res) {
    setPVHeader(res, "BL_PACKAGE_PAGE");
    require('../SSRSections/Buyleads/BLPackage')(req, res, shellCallBck);
  });

  app.get('/bl/dir/', function (req, res) {
    setPVHeader(res, "BL_DIR");
    require('../SSRSections/Buyleads/BLDir')(req, res, shellCallBck);
  });

  app.get('/bl/blpurchaseresponse/', function (req, res) {
    setPVHeader(res, "BL_PURCHASE_RESPONSE");
    require('../SSRSections/Buyleads/BLDefault')(req, res, shellCallBck);
  });


  app.get(/^\/bl\/tenders\/state\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_STATE");
    require('../SSRSections/Buyleads/TenderList')(req, res, shellCallBck);
  });
  app.get(/^\/bl\/tenders\/authority\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_AUTHORITY");
    require('../SSRSections/Buyleads/TenderList')(req, res, shellCallBck);
  });
  app.get(/^\/bl\/tenders\/industry\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_INDUSTRY");
    require('../SSRSections/Buyleads/TenderList')(req, res, shellCallBck);
  });


  app.get(/^\/bl\/tenders\/state\/.*\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_STATE_ID");
    require('../SSRSections/Buyleads/BLStateleads')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/tenders\/authority\/.*\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_AUTHORITY_ID");
    require('../SSRSections/Buyleads/BLAuthorityleads')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/tender\-notice\/.*\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_INDUSTRY_NOTICE");
    require('../SSRSections/Buyleads/BLIndustryleads')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/tenders\/.*\/$/, function (req, res) {
    setPVHeader(res, "BL_TENDER_SUBCAT_INDUSTRY");
    require('../SSRSections/Buyleads/TenderSubcat')(req, res, shellCallBck);
  });

  app.get(/^\/bl\/.*\/.*\/.*\/$/, function (req, res) {
    setPVHeader(res, "BL_MCAT");
    require('../SSRSections/Buyleads/BLMcat')(req, res, shellCallBck);
  });

  app.get('/dir/', function (req, res) {
    setPVHeader(res, "DIR");
    require('../SSRSections/Dir/dirShell')(req, res, shellCallBck);
  });


  app.get(/^\/dir\/.*\/$/, function (req, res) {
    setPVHeader(res, "GRP");
    require('../SSRSections/Dir/grpShell')(req, res, shellCallBck);
  });

  app.get(/^\/suppliers\/.*\/$/, function (req, res) {
    setPVHeader(res, "SUBCAT");
    require('../SSRSections/Dir/subcatShell')(req, res, shellCallBck);
  });
  app.all('/enq/', function (req, res) {
    require('../requestHandler')(req, res);
  });

  app.get(/^\/((?!\/).)*\/((?!\/).)*\.html$/, function (req, res) {
    let pageType = require('../citiesJSON/cityHandler')(req.path)

    if (pageType === "COMPANY") {
      setPVHeader(res, "COMPANY_CAT_LINK");
      res.status(200).send("COMPANY_CAT_LINK");
    }
    else if (pageType === "IMPCAT") {
      setPVHeader(res, "IMPCAT_CITY_INDEX");
      res.status(200).send("IMPCAT_CITY_INDEX");
    }
    else//parsing error
    {
      res.status(200).send("PARSING ERROR");
    }
  });

  app.get(/^\/((?!\/).)*\/$/, function (req, res) {
    let pageType = require('../citiesJSON/cityHandler')(req.path)

    if (pageType === "COMPANY") {
      setPVHeader(res, "COMPANY");
      res.status(200).send("COMPANY");
    }
    else if (pageType === "IMPCAT") {
      setPVHeader(res, "IMPCAT_CITY");
      res.status(200).send("IMPCAT_CITY");
    }
    else//parsing error
    {
      res.status(200).send("PARSING ERROR");
    }
  });


  //everything failed
  app.all('*', function (req, res) {
    // res.status(404).send({ "Error": "Page Does Not Exist" });
    setPVHeader(res, "ERROR_404");
    require('../SSRSections/Error404/error404shell')(req, res, shellCallBck);
  });

}

module.exports = serverRouter;
