const utilities = require("./utilities");
const parser = {
    firstData :(data,mcatObj,req) =>{
    return new Promise(function (resolve, reject) {
        let mcatData = {}
        try{
        mcatData["header_status"] = data.header_status;
        mcatData["uniqueId"] = data.unique_id;
        mcatData["mcatImg125"] = utilities.modifyImgSrc(data.mcat_img_125);
        mcatData["mcatImg250"] = utilities.modifyImgSrc(data.mcat_img_250);
        mcatData["flName"] = mcatObj.flName;
        mcatData["mcatName"] = data.mcatname
        mcatData["mcat_display_name"] = data.mcat_display_name;
        mcatData["cityName"] = data.gl_city_eng_names;
        mcatData["catName"] = data.catname
        mcatData["mcatId"] = data.mcatid;
        mcatData['grpName'] = data.grpname;
        mcatData["catId"] = data.catid;
        mcatData["cityid"] = mcatObj.cityId? mcatObj.cityId: '';
        mcatData["path"] = req.originalUrl;
        mcatData["mcatProd"] = data.mcatprod;
        mcatData["isBrand"] = data.is_brand;
        mcatData["isq_filter"]= data.isq_filter ? utilities.isqfilter(data.isq_filter,req.originalUrl, mcatObj.flName):"";
        mcatData["bus_type"] = data.is_business_type;
        mcatData["firstListData"] = utilities.createCard(data,req.originalUrl);
        mcatData["youTubedata"] = utilities.youTubeVideosDataMcat(data);
        mcatData['categoriesData'] = utilities.getCategoriesData(mcatObj.language,data.mcatdata,mcatObj.cityName,req.originalUrl)
      mcatData["cityData"] = utilities.getCityData(
        mcatObj.language,
            data.city_bar,
            mcatObj.cityName,
            mcatObj.flName,
            data.mcatname,
            req.cookies
          );
      mcatData["brandsData"] = utilities.getBrandsData(
        mcatObj.language,
            data.generic_brands,
            data.mcatdata,
            mcatObj.cityName,
      );
      mcatData["ecom"] = data.ecom_filter;
      mcatData["ecomData"] = utilities.getEcomData(mcatData["ecom"],mcatObj.cityName,mcatObj.flName);
      mcatData["bizData"] = utilities.getBizData(
        data.biz_wise_count,
        mcatObj.cityName,
        mcatObj.flName,
        data.mcatprod,
        mcatData["ecomData"],
        mcatData["ecom"]
      );
      mcatData["biz"] = req.query.bizValue || "";
        let bizName = mcatData["biz"]
          ? utilities.setBizName(mcatData["biz"])
          : mcatData["ecomData"] && mcatData["ecom"] && mcatData["path"].includes("ecomValue=1") ?"Ecom Retailer":"";
      mcatData["bizName"] = bizName;
      mcatData["showAds"] = data.adult_flag == "2" ? false :true;
      mcatData['title'] = data.McatMetaData.title
      mcatData["mcatgenric_flag"] = data.mcatgenric_flag;
    mcatData["districtFlag"] = data.is_district;
    mcatData["brandBillboardAdShow"] = (mcatData["catId"] || mcatData["mcatId"]) ? utilities.isBrandBillboardExists(mcatData["mcatId"], mcatData["catId"]) : "";
    mcatData["totalProductCount"] = data.out_total_unq_count;
    mcatData["vernacularCityName"] = data.gl_city_hindi_names? data.gl_city_hindi_names: "";
    mcatData["vernacularNames"] = data.vernacular_names;
    mcatData["groupFlName"] = data.grp_link;
    mcatData["subcatFlName"] = data.subcat_flanme;
    mcatData["breadcrumb"] = utilities.getBreadcrumb(
        data.breadcrumb_info,
        data.catname,
        data.mcatname,
        mcatObj.flName,
        mcatObj.cityName,
        mcatData["isq_filter"]
      );
    mcatData["Itemdata"] = data.data;
    mcatData["MetaData"] = data.McatMetaData;
    mcatData["foreignCampaignMiniBl"] = req.query && req.query.utm_source && req.query.utm_source.toLowerCase().includes("adwords") ? true : false;
    
      resolve(mcatData);
    }
    catch(e){
        reject({e})
    }
    });
},
    autofetchData:(data,mcatObj,req)=>{
        return new Promise(function (resolve, reject) {
            let response = {}
            try{
                response["data"] = utilities.createCard(data,req.originalUrl);
                response["header_status"] = data.header_status;
                response['uniqueId'] = data.unique_id;
                resolve(response);
            }
            catch(e){
                reject({})
            }
            });
    }
    ,
    authAutofetchData:(res,req,body,error,options)=>{
            if(body){
                const data = JSON.parse(body);
                if(data.header_status == 200)
                {   
                    const form = options.form;
                    const mcatObj = {flName:form.flName,language:form.language,cityName:options.cityFlName,cityId:form.cityId};
                    parser.autofetchData(data,mcatObj,req).then(response=>{
                        res.status(200).send(JSON.stringify(response));
                    })
                    .catch(e=>{
                        res.status(503).send({ header_status: 503,msg:e});
                    })
                }
                else
                res.send(body);
            }
            else{
                res.status(503).send({header_status: 503,msg:error});
            }
    }
}

module.exports = parser;