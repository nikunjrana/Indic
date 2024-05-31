module.exports = {
    forSearch: function (srchResp) {
        function getDisplayIds(srchData) {
            let displayIdArray = [];
            srchData.forEach(list => {
                if (list.more_results) {
                    list.more_results.forEach(sublist => {
                        if (sublist.displayid && sublist.iildisplayflag != false) {
                            displayIdArray.push(parseInt(sublist.displayid));
                        }
                    })
                }
                if (list.fields && list.fields.displayid && list.fields.iildisplayflag != false) {
                    displayIdArray.push(parseInt(list.fields.displayid));
                }

            })
            return displayIdArray;
        }
        function getBrandsAndCategries(srchData,cityName){
            let brandsAndCategories ={
                brands:[],
                categories:[]
            };
            let city = cityName ? cityName.replace(/\s+/g,'-') : "";
            let catlength = 0;
            let childInfoCat = [];
            srchData.forEach(list => {
                if (list.isbrand && list.isbrand == 1) {
                    let brandNameObject = {
                        NAME: '',
                        LINK: ''
                    };
                    brandNameObject.NAME = list.name;
                    brandNameObject.LINK = '/impcat/'+list.filename+'.html';
                    if(!brandsAndCategories.brands.some(el => el.NAME ===brandNameObject.NAME)) brandsAndCategories.brands.push(brandNameObject);
                }
                else{
                    let categoryObject = {
                        id:'',
                        name: '',
                        filename: '',
                        cityname: '',
                        smallimg: '',
                        type: '',
                        isgeneric: '',
                        NAME: '',
                        LINK: ''
                    };
                    categoryObject.id = list.id;
                    categoryObject.name = list.name;
                    categoryObject.filename = list.filename;
                    categoryObject.cityname = list.cityname ? list.cityname : '';
                    categoryObject.smallimg = list.smallimg ? list.smallimg : '';
                    categoryObject.type = list.type ? list.type : '';
                    categoryObject.isgeneric = list.isgeneric ? list.isgeneric : '';
                    categoryObject.NAME = list.name ;
                    categoryObject.LINK = (list.cityname ? '/city/'+city +'/' : '/impcat/')+list.filename+'.html'
                    if(!brandsAndCategories.categories.some(el => el.NAME ===categoryObject.NAME))brandsAndCategories.categories.push(categoryObject);      
                    catlength = catlength + 1;
                }
                if (list.child_info) {
                    list.child_info.forEach(childList => {
                        if (childList) {
                            if (childList.child_isbrand && childList.child_isbrand == 1) {
                                let brandNameObject = {
                                    NAME: '',
                                    LINK: ''
                                };
                                brandNameObject.NAME = childList.child_name;
                                brandNameObject.LINK = '/impcat/'+childList.child_filename+'.html';
                                if(!brandsAndCategories.brands.some(el => el.NAME ===brandNameObject.NAME)) brandsAndCategories.brands.push(brandNameObject);
                            }
                            else{
                                let categoryObject = {
                                    id:'',
                                    name: '',
                                    filename: '',
                                    cityname: '',
                                    smallimg: '',
                                    type: '',
                                    isgeneric: '',
                                    NAME: '',
                                    LINK: ''
                                };
                                categoryObject.id = childList.child_id;
                                categoryObject.name = childList.child_name;
                                categoryObject.filename = childList.child_filename;
                                categoryObject.cityname = list.cityname ? list.cityname : "";
                                categoryObject.smallimg = childList.child_smallimg ? childList.child_smallimg : '';
                                categoryObject.type = childList.child_type ? childList.child_type : '';
                                categoryObject.isgeneric = childList.child_isgeneric ? childList.child_isgeneric:'';
                                categoryObject.NAME = childList.child_name ;
                                categoryObject.LINK = (list.cityname? '/city/'+city +'/' : '/impcat/')+childList.child_filename+'.html'                               
                                if(!brandsAndCategories.categories.some(el => el.NAME ===categoryObject.NAME)) childInfoCat.push(categoryObject)
                            }
                        }
                    })
                }
            })
            if(catlength < 20 ){
                let getChildCatLength = 20 - catlength;
                let catChildLength = childInfoCat.length;
                getChildCatLength = (catChildLength <= getChildCatLength) ? catChildLength : getChildCatLength;
                brandsAndCategories.categories = brandsAndCategories.categories.concat(childInfoCat.slice(0,getChildCatLength))
            }
            return brandsAndCategories;
        }

        function fieldsRemover(data, removalList, keyDel = false) {
            if (!keyDel) {
                let parsedData = []; let i = 0;
                try {
                    for (let obj of data) {
                        parsedData[i] = {};
                        for (let key in obj) {
                            if (!removalList.includes(key)) {
                                parsedData[i][key] = {};
                                if(key == 'matched_attributes_msg'){
                                    parsedData[i][key] = obj[key];
                                }
                                for (let k in obj[key]) {
                                    if (!removalList.includes(k) || (key == 'more_results' && (!isNaN(k) && k >= 0))) {

                                        //contact_type handling...

                                        if (k == 'contact_no_type') {
                                            parsedData[i][key]['pns'] = '';
                                            parsedData[i][key]['mobile'] = [""];
                                            parsedData[i][key]['phone'] = [""];
                                            switch (obj[key][k]) {
                                                case 'pns':
                                                    {
                                                        obj[key]['pns'] = obj[key]['contact_no'];
                                                        parsedData[i][key]['pns'] = obj[key]['contact_no'];
                                                        break;
                                                    }
                                                case 'mobile':
                                                    {
                                                        obj[key]['mobile'] = [obj[key]['contact_no']];
                                                        parsedData[i][key]['mobile'] = [obj[key]['contact_no']];
                                                        break;
                                                    }
                                                case 'phone':
                                                    {
                                                        obj[key]['phone'] = [obj[key]['contact_no']];
                                                        parsedData[i][key]['phone'] = [obj[key]['contact_no']];
                                                        break;
                                                    }
                                            }
                                        }

                                        if ((key == 'more_results' && (!isNaN(k) && k >= 0))) {
                                            //Additional parsing required for results['more_results'] {due to index based nested structure}
                                            parsedData[i][key][k] = {};
                                            for (let item in obj[key][k]) {
                                                if (!removalList.includes(item)) {
                                                    if (item == 'mobile') {
                                                        //Sending mobile number only when pns number of the user does not exist
                                                        if (!(parsedData[i][key][k]['pns'] && parsedData[i][key][k]['pns'][0] && !isNaN(parsedData[i][key][k]['pns'][0]))) {
                                                            parsedData[i][key][k][item] = obj[key][k][item];
                                                        }
                                                    }
                                                    else {
                                                        parsedData[i][key][k][item] = obj[key][k][item];
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            //PNS & Mobile handling for results['fields']
                                            if (k == 'mobile') {
                                                //Sending mobile number only when pns number of the user does not exist
                                                if (!(parsedData[i][key]['pns'] && parsedData[i][key]['pns'][0] && !isNaN(parsedData[i][key]['pns'][0]))) {
                                                    parsedData[i][key][k] = obj[key][k];
                                                }
                                            }
                                            else {
                                                if(key != 'matched_attributes_msg'){
                                                    parsedData[i][key][k] = obj[key][k];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                        i++;
                    }
                }
                catch (e) {
                    return '';
                }
                return parsedData;
            }
            else {
                try {
                    let parsedData = {};
                    for (let k in data) {
                        if (!removalList.includes(k)) {
                            parsedData[k] = data[k];
                        }
                    }
                    return parsedData;
                }
                catch (e) {
                    return '';
                }
            }
        }
        function cdMisAppend(srchResp){
            let cdmisappend = '';
            if(srchResp && srchResp.guess && srchResp.guess.intent_info){
                if(srchResp.guess.intent_info.language_detection && srchResp.guess.intent_info.language_detection.models && srchResp.guess.intent_info.language_detection.models.selected_models && srchResp.guess.intent_info.language_detection.models.selected_models[0]){
                    cdmisappend += srchResp.guess.intent_info.language_detection.models.selected_models[0]['detected_language'] ? "|DetectLang:" + srchResp.guess.intent_info.language_detection.models.selected_models[0]['detected_language'] : '';
                }
                if(srchResp.guess.intent_info.language_translation && srchResp.guess.intent_info.language_translation.models && srchResp.guess.intent_info.language_translation.models.selected_models && srchResp.guess.intent_info.language_translation.models.selected_models[0]){
                    cdmisappend += srchResp.guess.intent_info.language_translation.models.selected_models[0]['translated_query'] ? "|Translated:" + srchResp.guess.intent_info.language_translation.models.selected_models[0]['translated_query'] : '';
                }
            }
            if(srchResp && srchResp.guess && srchResp.guess.logic_info){
                if(srchResp.guess.logic_info[0].includes("default|imob.search")){
                    cdmisappend += srchResp.guess.logic_info[0].split('default|imob.search')[1] + srchResp.guess.q;
                }
            }
            return cdmisappend;

        }
        function urlLangSpell(srchResp){
            let urllangspell = '';
            if(srchResp && srchResp.guess && srchResp.guess.intent_info){
                
                if(srchResp.guess.intent_info.language_translation && srchResp.guess.intent_info.language_translation.models && srchResp.guess.intent_info.language_translation.models.selected_models && srchResp.guess.intent_info.language_translation.models.selected_models.length>0){
                   urllangspell = "&qu-tr=1"
                }
                else if(srchResp.guess.intent_info.spell_suggestion && srchResp.guess.intent_info.spell_suggestion.models && srchResp.guess.intent_info.spell_suggestion.models.selected_models && srchResp.guess.intent_info.spell_suggestion.models.selected_models.length>0){
                    urllangspell = "&qu-cx=1"
                 }
            }
            return urllangspell;
        }
        function getCityData(srchResp,cityName){
            let cityData = srchResp['facet_fields'] && srchResp['facet_fields']['city'] ? srchResp['facet_fields']['city'] : [];
            let flname = srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['final_query_string'] ? srchResp['guess']['guess']['final_query_string'] : '';
            let data = {
                cities : [],
                allIndiaLINK :'/isearch.php'
            }
            //if cityname present then remove the city selected from the array
            if(cityData.length){
                cityData = cityData.filter((item,index) => index % 2 == 0)
                if(cityName)
                {
                    if(cityName=="new delhi" && cityData.find((item) => item=="delhi"))
                    cityData.splice(cityData.indexOf("delhi"),1,"new delhi")
                    else if(cityName=="delhi" && cityData.find((item) => item=="new delhi"))
                    cityData.splice(cityData.indexOf("new delhi"),1,"delhi")
                    cityData = cityData.filter((item,index) => item !== cityName)
                }

                data.cities = cityData.map(
                    (item) =>{
                        let finalItem = {
                            NAME :item,
                            LINK :'/isearch.php',
                            QUERY :'?s=' + flname + '&cq='+item ,
                        };   
                        return finalItem;
                    })
            }
            return data;
        }

        function getBizData(srchResp,cityName){
            let data = [];
            let bizData = srchResp['facet_fields']['biztype'];
            let  queryDataType = srchResp['guess'] && srchResp['guess']['guess']&& srchResp['guess']['guess']['queryDataType'] ? srchResp['guess']['guess']['queryDataType'] : '';
            let flname = srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['final_query_string'] ? srchResp['guess']['guess']['final_query_string'] : '';
            if (bizData && queryDataType !== 'S') {
                const bizAllowedValues = ['10', '20', '30', '40'];
                let  bizName = (value) =>{
                    if (value == '0')
                        return 'All';
                    if (value == '10')
                        return 'Manufacturer';
                    if (value == '20')
                        return 'Exporter';
                    if (value == '30')
                        return 'Wholesaler';
                    if (value == '40')
                        return 'Retailer';
                    }
                data = bizData.filter(
                    (item,index) => bizAllowedValues.includes(item) && index % 2 ==0 
                )
                data = data.map(
                    (item) => {
                                let bizId = item;
                                let finalItem = {
                                    NAME: bizName(item),
                                    LINK: '/isearch.php',
                                    QUERY: '?s='+flname+(cityName?'&cq='+cityName:'')+'&biz=' + bizId
                                };
                  return finalItem;
                    }
                );
            }
            data.unshift({NAME: 'All',LINK: '/isearch.php',QUERY: '?s='+flname+(cityName?'&cq='+cityName:'')})
            return data;
        }

        function brandBillboardAdShow(){

            let mcatIdsJson = require('./SSRSections/Mcat/brandBillboardMcatIds.json')

            let catid = srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['topmost_mcat'] && srchResp['guess']['guess']['topmost_mcat']["catid"] ? srchResp['guess']['guess']['topmost_mcat']["catid"] : "";
            let mcatid = srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['topmost_mcat'] && srchResp['guess']['guess']['topmost_mcat']["id"] ? srchResp['guess']['guess']['topmost_mcat']["id"] : "";
            if (mcatIdsJson.searchCatIdsBB.includes(catid))
              return "new"
            else if (mcatIdsJson.searchMcatIdsBB.includes(mcatid))
              return "old"
            else if (mcatIdsJson.catIdForeignUser.includes(catid))
                return "bbbForeignUser"
            else
              return false
        }

        
        try {
            let Qtype = srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['query_type'] ? srchResp['guess']['guess']['query_type'] : '';
            let cdMiscAppend = cdMisAppend(srchResp);
            let cityName =  srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['city'] && srchResp['guess']['guess']['city'][0] !=="all" ? srchResp['guess']['guess']['city'][0] : '';        
            let brandsAndCategories = srchResp && srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['live_mcats']  ? getBrandsAndCategries(srchResp['guess']['guess']['live_mcats'],cityName) : "";
            let brandBillBoardAds = brandBillboardAdShow();
            
            let sResponse = {
                urlLangSpell:urlLangSpell(srchResp),
                cdMiscAppend:cdMiscAppend,
                results: srchResp['results'] && srchResp['results'].length > 0 ? fieldsRemover(srchResp['results'], ['prod_multiple_photos', 'photo', 'debug_info', 'bllocpref', 'fcpurl', 'lastactiondatet', 'itemcurrency', 'zoomed_image', 'phone',
                    'score', 'productqualityscore', 'product_accuracy_level', 'mcatidWithRank', 'hotnew', 'button_url', 'smalldescorg', 'categoryinfo', 'freq', 'prefcity', 'prefprod', 'zipcode', 'sdesclen', 'paidurl', 'countryname', 'parentglusrid', 'datarefid', 'd_in_range']) : '',
                total_results: srchResp['total_results'] ? srchResp['total_results'] : [],
                cdMiscellaneous: srchResp['Cd-Miscellaneous'] ? srchResp['Cd-Miscellaneous'] : '',
                displayIdArray: srchResp['results'] && srchResp['results'].length > 0 ? getDisplayIds(srchResp['results']) : '',
                adultDetected: srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['adultDetected'] ? srchResp['guess']['guess']['adultDetected'] : '',
                query_type: Qtype,
                live_mcats: brandsAndCategories.categories ? brandsAndCategories.categories : '',
                catid_of_topmost_mcat: srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['catid_of_topmost_mcat'] ? srchResp['guess']['guess']['catid_of_topmost_mcat'] : '',
                topmost_mcat: srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['topmost_mcat'] ? fieldsRemover(srchResp['guess']['guess']['topmost_mcat'], ['breadcrumb', 'duplicate_mcat_info', 'catid', 'catname', 'frequency', 'groupid', 'groupname', 'isgeneric', 'islive', 'mcat_accuracy_level', 'source'], true) : '',
                queryDataType: srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['queryDataType'] ? srchResp['guess']['guess']['queryDataType'] : '',
                final_query_string: srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['final_query_string'] ? srchResp['guess']['guess']['final_query_string'] : '',
                extended_type: srchResp['extended_type'] ? srchResp['extended_type'] : '',
                showPriceFilter: srchResp['facet_fields'] ? srchResp['facet_fields']['itemprice2'] ? srchResp['facet_fields']['itemprice2'].length == 0 ? false : true : true : true,
                city: Qtype == 'BannedKeyword' || (srchResp['error'] && srchResp['error'] == 'OnlyLocationInQuery') ? srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['city'] && srchResp['guess']['guess']['city'].length ? srchResp['guess']['guess']['city'] : '' : srchResp['facet_fields']['city'] ? srchResp['facet_fields']['city'] : '',
                cityData:getCityData(srchResp,cityName),
                bizData:srchResp['facet_fields'] && srchResp['facet_fields']['biztype'] ? getBizData(srchResp,cityName): '',
                gcity: srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']['city'] ?srchResp['guess']['guess']['city'] : '',
                biztype: Qtype != 'BannedKeyword' && srchResp['facet_fields'] && srchResp['facet_fields']['biztype'] ? srchResp['facet_fields']['biztype'] : '',
                q:srchResp['guess']&& srchResp['guess']['q'] ? srchResp['guess']['q'] : '',
                top_results: srchResp['top_results'] ? fieldsRemover(srchResp['top_results'], ['cats', 'related_mcats', 'top_mcats'], true) : '',
                only_price_products: srchResp['only_price_products'],
                search_result_language: srchResp['search_result_language'] ? srchResp['search_result_language'] : '',
                ecomProductsAvailable: srchResp['ecomProductsAvailable'] ? srchResp['ecomProductsAvailable'] : '',
                preferred_cities: srchResp['preferred_cities'],
                location_info: srchResp['location_info'],
                selectedBizType: srchResp && srchResp['guess'] && srchResp['guess']['guess'] && srchResp['guess']['guess']["biztype"] ? srchResp['guess']['guess']["biztype"] : '',
                brandNames: brandsAndCategories.brands ? brandsAndCategories.brands : '',
                categoryNames: brandsAndCategories.categories ? brandsAndCategories.categories : '',
                contextInfo: srchResp['guess']&&srchResp['guess']['intent_info'] && srchResp['guess']['intent_info']['contextSearch'] ? srchResp['guess']['intent_info']['contextSearch'] : '' ,
                googleResults: srchResp['googleResults']? srchResp['googleResults'] : '',
                search_from: srchResp['search_from']?srchResp['search_from']:'',
                bannedStatus:  srchResp["bannedStatus"],
                urlTrackingInfo: srchResp["urlTrackingInfo"] ? srchResp["urlTrackingInfo"] : {},
                brandBillboardAdShow: brandBillBoardAds
            }
            if (srchResp['error']) {
                sResponse['error'] = srchResp['error'];
            }
            let lm = sResponse['live_mcats'];
            if (lm != '') {
                let i = 0;
                try {

                    for (let val of lm) {
                        lm[i] = fieldsRemover(val, ['breadcrumb', 'mcat_accuracy_level', 'source', 'type', 'frequency', 'isgeneric', 'islive'], true);
                        i++;
                    }
                }
                catch (e) {
                    lm = '';
                }
            }
            sResponse['live_mcats'] = lm;
            if (sResponse.results == "") {
                if (sResponse['error'] === 'OnlyLocationInQuery') {
                    return sResponse;

                }
                else if((sResponse.total_results && sResponse.total_results == 0 && sResponse.googleResults && sResponse.googleResults.results && sResponse.googleResults.results.length>0) || (sResponse.query_type && (sResponse.query_type == 'BannedKeyword' || sResponse.query_type == 'PartialBannedKeyword'))){
                    return sResponse;
                }
                else {

                    return { ...sResponse, status: 'No-Data'};
                }
            }
            else {
                return sResponse;
            }
        }
        catch (e) {
            return 'Bad-Response';
        }
    },
    forBuyleadList: function (req, res, body, error = false, mlSeller = false) {
        if (error) { res.status(503).send({ status: 'failed' }); }
        else {
            var responseData = JSON.parse(body);
            if (responseData && (responseData.CODE == 200 ||responseData.DisplayList) ) {
                var bls = [];
                var list = responseData.DisplayList;
                if (list && list.length) {
                    var blsList = {};
                    if (list.length > 0) {
                        for (var i in list) {
                            bls[i] = {};
                            bls[i]['ETO_OFR_GLCAT_MCAT_NAME']=list[i].ETO_OFR_GLCAT_MCAT_NAME;
                            bls[i]['ETO_OFR_ID'] = list[i].ETO_OFR_ID;
                            bls[i]['ETO_OFR_TITLE'] = list[i].ETO_OFR_TITLE;
                            bls[i]['ETO_OFR_DESC'] = list[i].ETO_OFR_DESC;
                            bls[i]['OFFER_DATE'] = list[i].ETO_OFR_DATE;
                            bls[i]['GLUSR_CITY'] = list[i].GLUSR_CITY;
                            bls[i]['GLUSR_STATE'] = list[i].GLUSR_STATE;
                            bls[i]['GLUSR_COUNTRY'] = list[i].GLUSR_COUNTRY;
                            bls[i]['ENRICHMENTINFO'] = list[i]['ENRICHMENTINFO'];
                            bls[i]['ADDITIONALINFO'] = list[i].ADDITIONALINFO;
                            bls[i]['DATE_TIME'] = list[i].ETO_OFR_DATE + 'T' + list[i].LASTACTIONDATET;
                            bls[i]['GL_COUNTRY_FLAG'] = list[i].GL_COUNTRY_FLAG_SMALL;
                            bls[i]['BY_LEAD_TYPE'] = list[i].BY_LEAD_TYPE;
                            bls[i]['OFFER_FLAG'] = list[i].OFFER_FLAG;
                            bls[i]['ETO_ENQ_TYP'] = list[i].ETO_ENQ_TYP; //ETO_ENQ_TYP for search
                            bls[i]['SHORTLISTED'] = list[i].SHORTLISTED;
                            bls[i]['SHORTLIST_STATUS'] = list[i].SHORTLIST_STATUS;
                            bls[i]['FK_GLCAT_MCAT_ID'] = list[i].FK_GLCAT_MCAT_ID;
                            bls[i]['PRIME_MCAT_ID'] = list[i].PRIME_MCAT_ID;
                            bls[i]['ETO_OFR_QTY'] = list[i].ETO_OFR_QTY;
                            bls[i]['DATATYPE'] = list[i].DATATYPE ? list[i].DATATYPE : 'lead';
                            bls[i]['STATUS_FLAG'] = list[i].STATUS_FLAG ? list[i].STATUS_FLAG : 'A';
                            bls[i]['MSG1'] = list[i].MESSAGE_LIST1;
                            bls[i]['MSG2'] = list[i].MESSAGE_LIST2;
                            bls[i]['IS_NI_AVAIL'] = list[i].IS_NI_AVAIL;
                            bls[i]['IS_PROFORMA_BLNI'] = list[i].IS_PROFORMA_BLNI;
                            bls[i]['BL_LISTING'] = 1;
                            bls[i]['DIST_HQ_NAME'] = list[i].DIST_HQ_NAME;
                            bls[i]['GRID_PARAMETERS'] = list[i].GRID_PARAMETERS;
                            bls[i]['BLDATETIME'] = list[i]['BLDATETIME'];
                            bls[i]['ETO_OFR_BUYER_IS_MOB_VERF'] = list[i].ETO_OFR_BUYER_IS_MOB_VERF;
                            bls[i]['ETO_OFR_EMAIL_VERIFIED'] = list[i].ETO_OFR_EMAIL_VERIFIED;
                            bls[i]['GLUSR_USR_MEMBERSINCE'] = list[i].GLUSR_USR_MEMBERSINCE;
                            bls[i]['ETO_OFR_BUYER_LEADS_CNT'] = list[i].ETO_OFR_BUYER_LEADS_CNT;
                            bls[i]['ETO_OFR_BUYER_SELL_MCATS'] = list[i].ETO_OFR_BUYER_SELL_MCATS;
                            bls[i]['ETO_OFR_BUYER_PRIME_MCATS'] = list[i].ETO_OFR_BUYER_PRIME_MCATS;
                            bls[i]['ETO_OFR_BUYER_PAST_SEARCH_MCAT'] = list[i].ETO_OFR_BUYER_PAST_SEARCH_MCAT;
                            bls[i]['GLUSR_NAME'] = list[i].GLUSR_NAME;
                            bls[i]['GLUSR_ADDRESS'] = list[i].GLUSR_ADDRESS;
                            bls[i]['GLUSR_COMPANY']=list[i].GLUSR_COMPANY;
                            bls[i]['ETO_OFR_BUYER_IS_GST_VERF']=list[i].ETO_OFR_BUYER_IS_GST_VERF;
                            bls[i]['ETO_OFR_MODREF_TYPE']=list[i].ETO_OFR_MODREF_TYPE;
                            bls[i]['ETO_OFR_LARGE_IMAGE'] = list[i].ETO_OFR_LARGE_IMAGE;
                            bls[i]['ETO_OFR_MEDIUM_IMAGE'] = list[i].ETO_OFR_MEDIUM_IMAGE;
                            bls[i]['ETO_OFR_SMALL_IMAGE'] = list[i].ETO_OFR_SMALL_IMAGE;
                            bls[i]['ETO_OFR_ORIGINAL_IMAGE'] = list[i].ETO_OFR_ORIGINAL_IMAGE;
                            bls[i]['ETO_OFR_MODREFID']=list[i].ETO_OFR_MODREFID;
                            bls[i]['ETO_OFR_PROD_SERV']=list[i].ETO_OFR_PROD_SERV;
                            if (req.query.glid && req.query.offer_type == 'T') {
                                bls[i]['ETO_TDR_NOTICE_TYPE'] = list[i].ETO_TDR_NOTICE_TYPE;
                                bls[i]['ETO_OFR_GLCAT_MCAT_NAME'] = list[i].ETO_OFR_GLCAT_MCAT_NAME;
                                bls[i]['ETO_TDR_PERIOD'] = list[i].ETO_TDR_PERIOD;
                                bls[i]['ETO_TENDER_VALUE'] = list[i].ETO_TENDER_VALUE;
                                bls[i]['ETO_TDR_EARNEST'] = list[i].ETO_TDR_EARNEST;
                                bls[i]['ETO_TDR_DOCFEE'] = list[i].ETO_TDR_DOCFEE;
                                bls[i]['ETO_TDR_PUBLISH_DATE'] = list[i].ETO_TDR_PUBLISH_DATE;
                                bls[i]['ETO_TDR_DOC_SALE_STARTDATE'] = list[i].ETO_TDR_DOC_SALE_STARTDATE;
                                bls[i]['ETO_TDR_DOC_SALE_LASTDATE'] = list[i].ETO_TDR_DOC_SALE_LASTDATE;
                                bls[i]['ETO_TDR_DOC_SUBMIT_BEFOREDATE'] = list[i].ETO_TDR_DOC_SUBMIT_BEFOREDATE;
                                bls[i]['ETO_TDR_OPEN_DATE'] = list[i].ETO_TDR_OPEN_DATE;
                                bls[i]['ETO_TDR_COMP_WEBSITE'] = list[i].ETO_TDR_COMP_WEBSITE;
                            }
                        }
                        blsList['DisplayList'] = bls;
                    }
                    blsList['blPageLoc'] = responseData['bl_page_location'] ? responseData['bl_page_location'] : '';
                    blsList['cities'] = responseData.cities;
                    blsList['Categories'] = responseData.Categories;
                    blsList['countries'] = responseData.countries;
                    blsList['TotalBuylead'] = parseInt(responseData.Allcount);
                    blsList['TotalBuyleadShortlisted'] = responseData.Lead_Count;
                    blsList['OrderValue'] = responseData.Approx_Order_Val;
                    res.send(blsList);
                } else {
                    res.status(200).send({ status: 'empty' });
                }
            }
            else {
                if (responseData.DisplayList && responseData.CODE == 204) {
                    res.status(200).send({ status: 'empty' });
                }
                else {
                    
                    res.status(200).send({ status: 'failed' });
                }

            }
        }
    },
    forEnquiryBlGetISQ:function(req, res, body, error = false){
        
        if (error) {
            res.status(503).send({status:'failed'});
        }
        else{
            var responseData = JSON.parse(body);
            if (responseData && responseData.CODE==200) {
                
                let resData={
                    status:'success',
                }
                if(responseData.MCAT_ID){
                    resData.mcatName=responseData.MCAT_NAME;
                    resData.mcatId=responseData.MCAT_ID;
                }
                resData.totalQuestions= responseData.DATA.length;
                
                var qData=[];
                for(let i=0;i<responseData.DATA.length;i++){
                    let noOfSubQuestions=responseData.DATA[i].length;
                    switch (noOfSubQuestions) {
                            case 1:
                            
                                   qData.push(getISQQuestionForm(responseData.DATA[i][0]));
                                   break;  

                            case 2:
                                   let qDetail={};
                                   qDetail[0]=getISQQuestionForm(responseData.DATA[i][0]);
                                   qDetail[1]=getISQQuestionForm(responseData.DATA[i][1]);
                                   qData.push(qDetail);
                                   break;

                            default:
                                    qData.push(getISQQuestionForm(responseData.DATA[i]));
                                    break; 
                    }
                }
                
                resData.data=qData;
                res.send(resData);
            }
            else if (responseData &&responseData.RESPONSE && responseData.RESPONSE.CODE==204){
                
                res.status(200).send({
                    status:'empty',
                    message:responseData.RESPONSE.MESSAGE,
                    data:''
                });
            } 
            else{
                res.status(200).send({status:'failed'});
            }
            
        }

        function getISQQuestionForm(quesDetail){
            var qDetails={
                qId:quesDetail.IM_SPEC_MASTER_ID,
                qDesc:quesDetail.IM_SPEC_MASTER_DESC,
                priority:quesDetail.IM_CAT_SPEC_PRIORITY,                      
                
            }

            var qOptions=[];
            var optionIds=quesDetail.IM_SPEC_OPTIONS_ID ? quesDetail.IM_SPEC_OPTIONS_ID.split("##") : '';
            var optionsDesc=quesDetail.IM_SPEC_OPTIONS_DESC ? quesDetail.IM_SPEC_OPTIONS_DESC.split("##"): '';
            var isqPriority=quesDetail.IM_SPEC_OPT_PRIORITY ? quesDetail.IM_SPEC_OPT_PRIORITY.split("##"): '';                           
            
            for(var j=0;j<optionIds.length;j++){
                qOptions.push({
                    optionsId:optionIds[j],
                    optionsDesc:optionsDesc[j],
                    isqPriority:isqPriority[j]
                });                                
            }
            qDetails.qOptions=qOptions;                           
            
            switch (quesDetail.IM_SPEC_MASTER_TYPE) {
                case '1':
                    qDetails.qType='text';
                    break;
                case '2':
                    qDetails.qType='radio';
                    break;
                case '3':
                    qDetails.qType='select';
                    break;
                case '4':
                    qDetails.qType='checkbox';
                    break;
            }
           
            return qDetails;
        }
    }
    
    

    
}


//=================Removed in search result key========================
// debug_info,distance,lastactiondatet,itemcurrency,zoomed_image,usrpcatflname,score,productqualityscore,product_accuracy_level,mcatidWithRank,hotnew,more_results,button_url,countryname,paidurl,sdesclen,zipcode,prefprod,prefcity,mcatname,freq,categoryinfo,smalldescorg,bllocpref,isq,prod_multiple_photos,photo

//topmost_mcat->catname,'catid','catname','frequency','groupid','groupname','isgeneric','islive','mcat_accuracy_level','mediumimg','source'

//==========Removed in search live_mcats =================
// catid,catname,child_info,filename,frequency,groupid,groupname,id,isgeneric,islive,mcat_accuracy_level,mediumimg,name,smallimg,source,type

