import { formatINRPrice } from '../../../src/Globals/priceModification';
const VERNACULAR_ARR = ['en','hi']
const utility = {
    getFlname(path) {
        let index = 2;
        if (path.split("/")[1] !== "impcat") {
            index = 3;
        }
        return path.split("/")[index].split(".")[0];
    },
    getCityFlname(path) {
        let cityName = path && path.split("/") && path.split("/")[2] ? path.split("/")[2] : '';
        return cityName;
    },
    isBrandBillboardExists(mcatid="", catid="") {
        try {
            const mcatidsJSON = require('./brandBillboardMcatIds.json');
            if (mcatidsJSON.catidsNewBB.includes(catid)) {
                return "new";
            }
            else if (mcatidsJSON.mcatidsNewBB.includes(mcatid)) {
                return "old";
            }
            else if (mcatidsJSON.mcatidsSWIM.includes(mcatid)) {
                return "newMcat";
            }
            else if(mcatidsJSON.catIdEkta.includes(catid) || (mcatidsJSON.mcatIdEkta.includes(mcatid))){
                return "bbbEkta";
            }
            else {
                return false;
            }
        }
        catch (err) {
            return err;
        }
    },
    // ismcatExists(mcatid="", catid="") {
    //     try {
    //         const mcatidsJSON = require('./brandBillboardMcatIds.json');
    //         if(mcatidsJSON.searchMcatidsAFS.includes(mcatid) || mcatidsJSON.searchCatidsAFS.includes(catid) ){
    //             return "noafs";
    //         }
    //         else {
    //             return false;
    //         } 
    //     }
    //     catch (err) {
    //         return err;
    //     }
    // },
  getCityId(cityFlName) {
    let cityId = "";
    if (cityFlName) {
      let citiesJSON = require("../../citiesJSON/cityflname.json");
      if (citiesJSON.hasOwnProperty(cityFlName))
        cityId = citiesJSON[cityFlName]["GL_CITY_ID"];
    }
    return cityId;
  },

  getCityNameFromFlName(flName) {
    const cityFlNameArr = flName.split("-");

    const cityNameArr = cityFlNameArr.map((ele) => {
      return ele[0].toUpperCase() + ele.substr(1);
    });

    const cityName = cityNameArr.join(" ");

    return cityName;
  },
  getH1Text(mcatName,cityName,vernacularNames,vernacularCity,lang) {
    const engName = mcatName;
    const engCityName = cityName ? utility.getCityNameFromFlName(cityName) : '';

    let vernacularName = '';
    try {
        vernacularName = vernacularNames[0]['glcat_mcat_altmcat_name'];
    } catch (e) {
        vernacularName = '';
    }

    let vernacularCityName = '';
    try {
        vernacularCityName = vernacularCity;
    } catch (e) {
        vernacularCityName = '';
    }

    return utility.generateHeaderString(engName, engCityName, vernacularName, vernacularCityName,lang);


},
generateHeaderString(engName, engCityName, vernacularName, vernacularCityName, language) {

  let headerString = '';

  if (language == 'hi') {
      headerString = `${vernacularName}`;
      headerString += vernacularCityName ? `, ${vernacularCityName}` : ``;

      if (vernacularName) {
          headerString += engName ? ` (${engName}` : ''
          headerString += engCityName ? ` in ${engCityName})` : `)`;
      }

  } else {

      headerString = `${engName}`;
      headerString += engCityName ? ` in ${engCityName}` : ``;

      if (vernacularName) {
          headerString += vernacularName ? ` (${vernacularName}` : ''
          headerString += vernacularCityName ? `, ${vernacularCityName})` : `)`;
      }        

  }

  return headerString;

}
,
modifyImgSrc(image){
  if (typeof image != "undefined" && image != 'no_image' && image != '' && image) {
      image = image.replace(/^http:\/\//i, 'https://');
      image = image.replace('imghost.indiamart.com', '1.imimg.com');
      image = image.replace('imghost1.indiamart.com', '2.imimg.com');
  }
  return  image;
},
UserCityPriority(citiesData,IplocCity,ImeshUserCity){
    if((IplocCity || ImeshUserCity) && citiesData){
        let nearestCityData = [];
        let CityData = citiesData;
        let namecity = ImeshUserCity ? ImeshUserCity : IplocCity ? IplocCity : "";
        if(namecity){
            let city = CityData.filter((item)=>{
                item.NAME && item.NAME.toLowerCase() == namecity.toLowerCase() ? nearestCityData.push(item) : "";
                     return item.NAME && item.NAME.toLowerCase() != namecity
            })
            CityData = [...nearestCityData,...city];
        }else{
            let city = CityData.filter((item) => {
                item.NAME == namecity ? nearestCityData.push(item) : "";
                return item.NAME != namecity
              })
            CityData = [...nearestCityData,...city];
        }
        let uniqueArray = CityData.filter((item, index, self) =>
            index === self.findIndex(obj =>obj.LINK === item.LINK && obj.NAME === item.NAME));
        return uniqueArray
    }
    else 
        return citiesData
},
isqfilter(data,path,flname){
    let isq = {
        data: [],
        allIndiaLINK :  '/impcat/' + flname + '.html',
        CurrentID : "",
        CurrentArray : {},
        CurrentHeadData : []
    }
    isq.CurrentID = path.includes("/ajaxrequest/") ?Number(path.split("isqFilter=")?path.split("isqFilter=")[1]:""):Number(path.split("/") && path.split("/")[3] && path.split("/")[3].split("-q") && path.split("/")[3].split("-q")[1] ? path.split("/")[3].split("-q")[1] : "")
    
    if(data){
        isq.data = data.map((item)=>{
            if(item.FK_ISQ_OPTION_ID===isq.CurrentID){
                isq.CurrentArray = {
                    Head : item.FK_ISQ_QUESTION_TEXT,
                    Text : item.FK_ISQ_OPTION_TEXT,
                    Path: item.ISQ_URL.IMOB_NEW.includes("https://m.indiamart.com") ? item.ISQ_URL.IMOB_NEW.replace("https://m.indiamart.com",''):item.ISQ_URL.IMOB_NEW
                } 
            } 
            let obj = {}
            obj = {
                FK_ISQ_QUESTION_TEXT: item.FK_ISQ_QUESTION_TEXT,
                FK_ISQ_OPTION_ID: item.FK_ISQ_OPTION_ID,
                FK_ISQ_OPTION_TEXT: item.FK_ISQ_OPTION_TEXT,
                ISQ_URL: item.ISQ_URL.IMOB_NEW.includes("https://m.indiamart.com") ? item.ISQ_URL.IMOB_NEW.replace("https://m.indiamart.com",''):item.ISQ_URL.IMOB_NEW
        }
            return obj;
        })
    }
    if(isq.CurrentArray && isq.CurrentArray.Head){
        isq.CurrentHeadData = isq.data.filter((item)=>{
            if(item.FK_ISQ_QUESTION_TEXT==isq.CurrentArray.Head && item.FK_ISQ_OPTION_TEXT !=isq.CurrentArray.Text ){
                return item
            }
        })
    }
    return isq;
}
,getCategoriesData(language,categoriesData, cityName,path){
  let data = [];
  if (categoriesData) {
      data = categoriesData.filter(
          (item, index) => {

              if (item.REL_TYPE_FLAG !== 4 && index < 30) {
                  return item;
              }
          }
      ).map(
          (item) => {
              let url = cityName == item.GL_CITY_FLNAME ? '/city/' + cityName + '/' + item.GLCAT_MCAT_FLNAME + '.html'
                  : '/impcat/' + item.GLCAT_MCAT_FLNAME + '.html' + (path.includes("shopnow")?'?shopnow=1':'');
              let city = cityName == item.GL_CITY_FLNAME ? item.GL_CITY_NAME : '';
              //Vernacular check
              let name = language === VERNACULAR_ARR[1]? item.GLCAT_MCAT_NAME_SECONDARY : item.GLCAT_MCAT_NAME
              let finalItem = {
                  FLNAME : item.GLCAT_MCAT_FLNAME,
                  NAME: name,
                  LINK: url,
                  IMAGE: item['GLCAT_MCAT_IMG1_125X125'] ? utility.modifyImgSrc(item['GLCAT_MCAT_IMG1_125X125']):'',
                  CITY: city,
                  MCATID :item.GLCAT_MCAT_ID
              };


              return finalItem;
          }
      )
  }


  return data;

},
getCityData(language,cityData,cityName,flname,mcatname,cookies){
  let data = {
      cities : [],
      allIndiaLINK : '/impcat/' + flname + '.html'

  };
      if(cityData){
        //remove new-delhi as delhi will be already present
         cityData = cityData.filter(
              (item) =>  item['PRD_SEARCH_CITY'] !== "New Delhi" )
        //if cityname present then remove the city selected from the array
          if(cityName){
              cityData = cityData.filter(
              (item) =>  item['GL_CITY_FLNAME'] !== cityName
          )
          }
  
      data.cities = cityData.map(
      (item) =>{
          let url = '/city/' + item['GL_CITY_FLNAME'] + '/'+ flname + '.html'
          const name = language === VERNACULAR_ARR[1] ? item['PRD_SEARCH_CITY_SECONDARY'] : item['PRD_SEARCH_CITY']
          let finalItem = {
              NAME :name,
              LINK :url,
              TITLE : mcatname + ' in ' + name
          };
              
              
          return finalItem;
      }
  )
  let ImeshUserId = cookies && cookies.ImeshVisitor && cookies.ImeshVisitor.split("ctid=") && cookies.ImeshVisitor.split("ctid=")[1] ? cookies.ImeshVisitor.split("ctid=")[1].split("|") ? cookies.ImeshVisitor.split("ctid=")[1].split("|")[0] : "" :""
  let IplocCity = cookies && cookies.iploc && cookies.iploc.split("gctnm=") && cookies.iploc.split("gctnm=")[1] ? cookies.iploc.split("gctnm=")[1].split("|") ? cookies.iploc.split("gctnm=")[1].split("|")[0]:"":""
  const IdsData = require('./../../citiesJSON/cityIDtoflname.json')
  let ImeshUserCity = ImeshUserId ? IdsData[ImeshUserId] && IdsData[ImeshUserId].GL_CITY_NAME ? IdsData[ImeshUserId].GL_CITY_NAME : "":""
  data.cities = utility.UserCityPriority(data.cities,IplocCity,ImeshUserCity)
}

  return data;
},
getBrandsData: (language,brandsData,mcatdata, cityName) => {
  let data = [],combinedData = [],data2 = [];
  if (brandsData) {
      data = brandsData.map(
          (item) => {
              const url = cityName ? '/city/' + cityName + '/' + item['GLCAT_MCAT_FLNAME'] + '.html'
                  : '/impcat/' + item['GLCAT_MCAT_FLNAME'] + '.html';
              const name = language === VERNACULAR_ARR[1]? item['CHILDNAME_SECONDARY']: item['CHILDNAME']
              const finalItem = {
                  NAME: name,
                  LINK: url,
                  IMAGE: item['GLCAT_MCAT_IMG1_125X125'] ? utility.modifyImgSrc(item['GLCAT_MCAT_IMG1_125X125']):'',
              };


              return finalItem;
          }
      )
  }
  if(mcatdata){
    data2 = mcatdata.filter((item) => {
            if (item.REL_TYPE_FLAG == 4) {
                return item;
            }}
    ).map(
        (item) => {
            let url = cityName ? '/city/' + cityName + '/' + item.GLCAT_MCAT_FLNAME + '.html'
                : '/impcat/' + item.GLCAT_MCAT_FLNAME + '.html';
            //Vernacular check
            let name = language === VERNACULAR_ARR[1]? item.GLCAT_MCAT_NAME_SECONDARY : item.GLCAT_MCAT_NAME
            let finalItem = {
                NAME: name,
                LINK: url,
                IMAGE: item['GLCAT_MCAT_IMG1_125X125'] ? utility.modifyImgSrc(item['GLCAT_MCAT_IMG1_125X125']):'',
            };
            return finalItem;
        }
    )
  }
  combinedData = [...data, ...data2]
  let uniqueArray = combinedData.filter((item, index, self) =>
    index === self.findIndex(obj =>
        obj.LINK === item.LINK && obj.NAME === item.NAME
    )
  );
  return uniqueArray;
},

setBizName(value){
  if (value == 0)
      return 'All';
  if (value == 10)
      return 'Manufacturer';
  if (value == 20)
      return 'Exporter';
  if (value == 30)
      return 'Wholesaler';
  if (value == 40)
      return 'Retailer';

},
getBizData(bizData, cityName, flname,mcatprod,ecomData,ecomvalue){
  let data = [];
  if (bizData && mcatprod !== 'S') {
      let url = cityName ? '/city/' + cityName + '/' + flname + '.html'
          : '/impcat/' + flname + '.html';

    //  let urlAppend = '';
    //  if (queryParams.pr) urlAppend = '&pr=2';

      const bizAllowedValues = [10, 20, 30, 40];
      data = bizData.filter(
          (item, index) => bizAllowedValues.includes(item.PRD_SEARCH_PRIMARY_BIZ_ID)
      )
          .map(
              (item, index) => {
                  let bizId = item.PRD_SEARCH_PRIMARY_BIZ_ID;
                  let finalItem = {
                      NAME: utility.setBizName(bizId),
                      LINK: url,
                      QUERY: '?biz=' + bizId
                  };

                  return finalItem;



              }
          );

  }
    if(ecomData && ecomvalue){data.unshift(ecomData)}
    data.unshift({ NAME: 'All',LINK: cityName ? '/city/' + cityName + '/' + flname + '.html': '/impcat/' + flname + '.html'})
  return data;
  
  
},
getEcomData(ecom,cityName,flname){
    let url = '/impcat/' + flname + '.html';
    let finalItem = {
        NAME : 'Ecom Retailer',
        LINK : url,
        QUERY : '?shopnow=' + ecom
    }
    return finalItem;
}
,
getPrice(price,unit){
    let formattedPrice = formatINRPrice(price);
    return (formattedPrice + (unit ? "/"+unit : ''));
},
sellerlocation(locality,city, cityOrigin,district,path,is_district){
    let loc = '';
    if(city === cityOrigin || (path.includes("?shopnow=1")||path.includes("ecomValue=1"))) {
      if(locality.length===0) loc = city;
      else if(city.length + locality.length > 30) loc = city;
      else loc = locality + ', ' +  city;
      if(district){loc += ", " + district}} 
    else if(city !== cityOrigin && is_district=="N") {
        loc = "Deals in " + city;}
    else if(city !== cityOrigin && is_district=="Y"){
        if(city === district)
          loc = cityOrigin + ", Dist. " + district;
        else if(city !== district)
          loc = "Deals in " + city;
    }
  return loc
},
createCard(data,path) {

  let list = [];
  let target = data.data;
  let is_district = data.is_district ? data.is_district : ""; 
  for (let i in target) {
      let cards = [];

      let productInfo = target[i];
      let productMcatId = productInfo['prd_search_glcat_mcat_id_list']?productInfo['prd_search_glcat_mcat_id_list'].split(','):'';
          productMcatId = productMcatId?productMcatId[0]:'';

      let modifiedProduct = {

          productName: productInfo['pc_item_display_name'] ? productInfo['pc_item_display_name'] : productInfo['prd_name'],
          extraPrdName: productInfo['prd_name']?productInfo['prd_name']:'',
          productSecondaryName: productInfo['pc_item_secondary_name'] ? productInfo['pc_item_secondary_name'] : '',
          productUrl: productInfo['pc_item_url_name'] ? productInfo['pc_item_url_name'] : '',
          companyName: productInfo['COMPANY'] ? productInfo['COMPANY'] : '',
          companyUrl: productInfo['companylink'] ? productInfo['companylink'] : productInfo['search_url'] ? productInfo['search_url']:'',
          companySearchUrl: productInfo['search_url'] ? productInfo['search_url'] : '',
          companyContactNo: productInfo['comp_contct'] ? productInfo['comp_contct'] : '',
          companyContactVal: productInfo['comp_contct_val']?productInfo['comp_contct_val']:'',
          catFlname : productInfo['cat_flname']?productInfo['cat_flname']:'',
          productMcatId : productMcatId?productMcatId:'',
          custTypeWeight: productInfo['CUSTTYPE_WEIGHT1'] ? productInfo['CUSTTYPE_WEIGHT1'] : '',
          tsCode: productInfo['tscode'] ? productInfo['tscode'] : '',
          imgUrl: (productInfo['photo_125'] && !productInfo['photo_125'].includes('add-image.gif')) ? utility.modifyImgSrc(productInfo['photo_125']) : '',
          imgUrl_250: (productInfo['photo_250'] && !productInfo['photo_250'].includes('add-image.gif')) ? utility.modifyImgSrc(productInfo['photo_250']) : '',
          locality: productInfo['SDA_GLUSR_USR_LOCALITY'] ? productInfo['SDA_GLUSR_USR_LOCALITY'] : '',
          city: productInfo['city'] ? productInfo['city'] : '',
          sellerlocation: utility.sellerlocation(productInfo['SDA_GLUSR_USR_LOCALITY']?productInfo['SDA_GLUSR_USR_LOCALITY']:"",productInfo['city']?productInfo['city']:'', productInfo['city_orig']?productInfo['city_orig']:'',productInfo['district']?productInfo['district']:'',path, is_district),
          standardPrice: productInfo['prd_price'] ? utility.getPrice(productInfo['prd_price'],productInfo['unit']):productInfo['standardPrice'] ? productInfo['standardPrice']:"" ,
          displayId: productInfo['disp_id'],
          glid: productInfo['gl_id'] ? productInfo['gl_id'] : '',
          iilDisplayFlag : productInfo['iil_display_flag']?productInfo['iil_display_flag']:'',
          enqViews : productInfo['disp_id'] == '1' || productInfo['enq_count_new']=='0' ? null : productInfo['enq_count_new'],
          pageViews : productInfo['disp_id'] == '1' || productInfo['page_views_new']=='0' ? null : productInfo['page_views_new'],
          prd_isq : productInfo['prd_isq'] ? productInfo['prd_isq'] : '',
          ecom_store_name : productInfo['ecom_store_name']?productInfo['ecom_store_name']:'',
          ecom_landing_url : productInfo['ecom_landing_url']?productInfo['ecom_landing_url']:'',
          ecom_cart_url : productInfo['ecom_cart_url']?productInfo['ecom_cart_url']:'',
          small_desc : productInfo['small_desc'] && !productInfo['small_desc'].includes('iframe') && !productInfo['small_desc'].includes('<script') ? productInfo['small_desc'] :'',
          company_logo : productInfo['company_logo'] ? productInfo['company_logo'] : ''
      };

      //MiniPDP Handling
      if(modifiedProduct["iilDisplayFlag"] == 0 && modifiedProduct["imgUrl"]){
          modifiedProduct["urlType"] = "MINIPDP";
          modifiedProduct["url"] = null;
      }
      else if(modifiedProduct["iilDisplayFlag"] == 0 && !modifiedProduct["imgUrl"]){
          modifiedProduct["urlType"] = "COMPANY";
          modifiedProduct["url"] = utility.CompanyUrl(modifiedProduct["companyUrl"]);
      }
      else {
          modifiedProduct["urlType"] = "PDP";
          modifiedProduct["url"] = utility.pdp_url(
            modifiedProduct["extraPrdName"] ? modifiedProduct["extraPrdName"] 
            : modifiedProduct["productName"] ? modifiedProduct["productName"] : '' , 
            modifiedProduct["displayId"]);
      }


      cards.push(modifiedProduct);
    list.push(cards);
  }

  return [...list];

},
youTubeVideosDataMcat(data){
  let listData = [];
  let youtubeVideodata = [];
  let youtubeData = data.McatVideos;
 for (let m in youtubeData){
    let productInf = youtubeData[m];
    let mcatIdYoutube = productInf && productInf['fk_glcat_mcat_id:'] ? productInf['fk_glcat_mcat_id:'].split(',') : '';
        mcatIdYoutube = mcatIdYoutube && mcatIdYoutube[0] ? mcatIdYoutube[0] : ''; 
    let modifiedYouTubeProduct = {
       youTubeLink : productInf['glcat_mcat_doc_path'] ? productInf['glcat_mcat_doc_path'] : '',
       youTubeTitle : productInf['glcat_mcat_doc_title'] ? productInf['glcat_mcat_doc_title'] : '',
    }
    youtubeVideodata.push(modifiedYouTubeProduct);
    }
 listData.push(youtubeVideodata);
 return [...listData];
},
CompanyUrl(url) {
  let companyUrl = url;
  let res = [];
  if(url.includes("indiamart.com")){
    res = url.split("/");
    res.pop();
    companyUrl = res && res.includes('company') ? res.slice(-2).join('/') : res && res.length && res[res.length-1]+'/';
}
  if (url.match(/\.html/)) {
    res = url.split("/");
    res.pop();
    companyUrl = res.join("/") + "/";
  }
  return companyUrl;
},
service_link(title, id){
  let name = title;
  name = name.replace(/^\s+/, '');
  name = name.replace(/\s+$/, '');
  name = name.replace(/\s+/g, "-");
  name = name.toLowerCase();
  name = name.replace(/\&amp;/g, "&");
  name = name.replace(/\&lt;/g, "<");
  name = name.replace(/\&gt;/g, ">");
  name = name.replace(/\&nbsp;/g, " ");
  name = name.replace(/[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g, "-");
  name = name.replace(/^(-)+/, "");
  name = name.replace(/-+$/, "");
 // if (hostname !== "localhost") {
      return "/proddetail/" + name + '-' + id + '.html';
 // }
 // return hostname + ":8083/proddetail/" + name + '-' + id + '.html';
},
pdp_url(title, id){
  let url = utility.service_link(title, id)
  let posn = url.indexOf('proddetail')
  url = url.substring(posn)
  return url;
}
,
convertToTitleCase(str) {
    let words = str.split('-');
    let titleCaseWords = words.map((word)=> {
      let firstChar = word.charAt(0).toUpperCase();
      let restChars = word.slice(1).toLowerCase();
      return firstChar + restChars;
    });
    let result = titleCaseWords.join(' ');
    return result;
  },
getBreadcrumb(breadcrumbInfo,catName,mcatName,flName,cityName,isqData) {
    let breadcrumb = utility.generateSchema(breadcrumbInfo,catName,mcatName,flName,cityName,isqData);
   let breadcrumbArr =  breadcrumb.map(ele => {
        return {
            url: ele['item']['@id'],
            display: ele['item']['name']
        }
    })

    return breadcrumbArr;

},
generateSchema(breadcrumbInfo, category, mcatname, mcatFlName, cityFlName,isqData){
    let breadcrumbList = [];

    let count = 1;
    
    breadcrumbList.push({
        '@type': "ListItem",
        'position': count,
        'item': {
            '@id': "https://m.indiamart.com",
            'name': "IndiaMART"
        }
    });
    
    count++;
    
    breadcrumbList.push({
        '@type': "ListItem",
        'position': count,
        'item': {
            '@id': `https://m.indiamart.com/suppliers/${breadcrumbInfo.ctl_flname}`,
            'name': category
        }
    });
    
    count++;
    
    
    if(breadcrumbInfo.PARENT_MCAT[0]) {
        breadcrumbList.push({
            '@type': "ListItem",
            'position': count,
            'item': {
                '@id': `https://m.indiamart.com/impcat/${breadcrumbInfo.PARENT_MCAT[0].glcat_mcat_flname}.html`,
                'name': breadcrumbInfo.PARENT_MCAT[0].glcat_mcat_name
            }
        });
    
        count++;
    }
    
    if(cityFlName) {
        breadcrumbList.push({
            '@type': "ListItem",
            'position': count,
            'item': {
                '@id': `https://m.indiamart.com/impcat/${mcatFlName}.html`,
                'name': mcatname
            }
        });    
    
        count++;
    
        breadcrumbList.push({
            '@type': "ListItem",
            'position': count,
            'item': {
                '@id': `https://m.indiamart.com/city/${cityFlName}/${mcatFlName}.html`,
                'name': utility.getCityNameFromFlName(cityFlName)
            }
        })
        count++;
    } 
    else {
        breadcrumbList.push({
            '@type': "ListItem",
            'position': count,
            'item': {
                '@id': `https://m.indiamart.com/impcat/${mcatFlName}.html`,
                'name': mcatname
            }
        })
        count++;
    }
    if(isqData && isqData.CurrentID){
        let isq = isqData.CurrentArray && isqData.CurrentArray.Text?isqData.CurrentArray.Text:'';
        let path = isqData.CurrentArray && isqData.CurrentArray.Path?isqData.CurrentArray.Path:'';
        breadcrumbList.push({
            '@type': "ListItem",
            'position': count,
            'item': {
                '@id': `https://m.indiamart.com${path}`,
                'name': utility.convertToTitleCase(isq)
            }
        })
        count++;
    }
    return [...breadcrumbList];

},
};

module.exports = utility;
