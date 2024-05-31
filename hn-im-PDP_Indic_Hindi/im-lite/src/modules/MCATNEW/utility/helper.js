import { getCookie, getCookieValByKey ,setCookie,deleteCookie} from '../../../Globals/CookieManager';
import { checkAndSetLS } from '../../../Globals/LsData';
import { VERNACULAR_ARR, LANG_COOKIE } from '../../../constants/constants';

const mcatHelper = {

    

    modifyImgSrc : (image)=> {
        if (typeof image != "undefined" && image != 'no_image' && image != '' && image) {
            image = image.replace(/^http:\/\//i, 'https://');
            image = image.replace('imghost.indiamart.com', '1.imimg.com');
            image = image.replace('imghost1.indiamart.com', '2.imimg.com');
        }
        return  image;
    },

    isNewUrl(prevData, currentData) {
        let currentBiz = currentData.location.query && currentData.location.query.biz ? currentData.location.query.biz :'';
        let prevBiz = prevData.location.query && prevData.location.query.biz ? prevData.location.query.biz :'';
        let currentEcom = currentData.location.query && currentData.location.query.shopnow ? currentData.location.query.shopnow : '';
        let prevEcom = prevData.location.query && prevData.location.query.shopnow ? prevData.location.query.shopnow :'';

        if (prevData.location.pathname != currentData.location.pathname) {
            return true;
        }
        else if(currentBiz || prevBiz || currentEcom || prevEcom){
            if(currentBiz != prevBiz){return true;}
            if(currentEcom != prevEcom) return true;
        }
        else {
            return false;
        }
        return false;
    }
    ,
    setMcatCookies(cityFlName,cityId){
        let userLocName = `${cityFlName}||${cityId}`;
        setCookie("userlocName",userLocName);
    
        let xnhist = `city=${cityFlName}`;
        
        setCookie("xnHist",xnhist);
    }
    ,
    deleteMcatCookies(){
        deleteCookie("userlocName")
        deleteCookie("xnHist")
    }
    ,

    CompanyUrl(url) {
        let companyUrl = url;
        let res = [];
        if(url.includes("indiamart.com")){
            res = url.split("/");
            res.pop();
            companyUrl = res.includes('company') ? res.slice(-2).join('/') : res[res.length-1]+'/';
        }
        if (url.match(/\.html/)) {
          res = url.split("/");
          res.pop();
          companyUrl = res.join("/") + "/";
        }
        return companyUrl;
    }
    ,
    getDirUrl(path){
        let dirUrl = path;
        if (dirUrl.split("/")[1] !== "impcat") {
          let dirArr = dirUrl.split('/city');
          dirUrl = dirArr[1];
        }
        dirUrl = `https://dir.indiamart.com${dirUrl}`
        return dirUrl
    },
    CatToBrowseCookie(e) {
        if(e && e.category && e.category!= "new-items.html" && e.category != "other-services.html" && e.category !="other-products.html"){
            setCookie('intCat',e.category , 0.08);
            let catparams = {};
            catparams.conditional_flag = e.conditional_flag,
            catparams.brd_mcat_id = e.brd_mcat_id,
            catparams.category = e.category,
            catparams.displayid = e.displayid,
            catparams.company = (e.company && e.company.includes('/'))? e.company.slice(0, -1) : e.company,
            catparams.cat_name = e.cat_name
            let cookieVal = mcatHelper.separateInPipeFormat(catparams)
      localStorage.setItem("cattoBrowsed", cookieVal);
        }
      }
      ,
      separateInPipeFormat(params) {
        let cookieVal = [];
        for (let a in params)
            cookieVal.push(a + "=" + params[a]);
        return cookieVal.join("|")
      }
      ,
    generateSchema(breadcrumbInfo, category, mcatname, mcatFlName, cityFlName, isGeneric){

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
                    'name': mcatHelper.getModifiedCityName(cityFlName)
                }
            })
            
            count++;
        
        } 
        
        
        if(!isGeneric && !cityFlName) {
        
            breadcrumbList.push({
                '@type': "ListItem",
                'position': count,
                'item': {
                    '@id': `https://m.indiamart.com/impcat/${mcatFlName}.html`,
                    'name': mcatname
                }
            })
        
        
        }
    
    
        return [...breadcrumbList];
    
    
    
    },

    getBreadcrumb(breadcrumbInfo,catName,mcatName,flName,cityName,genericFlag) {
        let breadcrumb = mcatHelper.generateSchema(breadcrumbInfo,catName,mcatName,flName,cityName, genericFlag);
       let breadcrumbArr =  breadcrumb.map(ele => {
            return {
                url: ele['item']['@id'],
                display: ele['item']['name']
            }
        })

        return breadcrumbArr;

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
      
    getModifiedCityName(cityFlName){
        const cityFlNameArr = cityFlName.split('-');

        const cityNameArr = cityFlNameArr.map((ele) => {
            return ele[0].toUpperCase() + ele.substr(1)
        });

        const cityName = cityNameArr.join(' ');

        return cityName;
    }
    ,
    generateHeaderString(engName, engCityName, vernacularName, vernacularCityName, language) {

        let headerString = '';

        if (language == VERNACULAR_ARR['hi']) {
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
    showNearMe(cityName) {
        let iplocVal = getCookieValByKey('iploc', 'gcniso');
        if (iplocVal == 'IN') {
            if (sessionStorage.getItem("CTDC") && cityName && sessionStorage.getItem("CTDC") === cityName) {
                return false;
            }
            return true;
        }
        return false;
    }
    ,


    getTrackingLabels(language, genericFlag, districtFlag, cityName, rehitCityName,poc) {
        let pmcat = genericFlag == 1 ? "PMCAT-" : "MCAT-";
        let city = cityName ? "City-" : "";
    
        let click = poc? pmcat + city + "Page-Clicks" + poc : pmcat + city + "Page-Clicks";
    
        let pageType = "";
        if (genericFlag == 1) {
          if (cityName||rehitCityName) {
            pageType =
              (districtFlag == "Y" || districtFlag == 1)
                ? "generic-impcat-district"
                : "generic-impcat-city";
          } else {
            pageType = "generic-impcat";
          }
        } else {
          if (cityName||rehitCityName) {
            pageType = (districtFlag == "Y" || districtFlag == 1) ? "impcat-district" : "impcat-city";
          } else {
            pageType = "impcat";
          }
        }
        let lang =
        language == VERNACULAR_ARR["hi"] ? "LangHi" : "LangEn";
        return {
          click: click,
          pageType: pageType,
          lang: lang,
          langCookie: language,
        };
      }
    ,
    getMcatCityCombinedName(mcatData,language){
        const engName = mcatData.mcatName;
        const engCityName = mcatData.cityName ? mcatHelper.getModifiedCityName(mcatData.cityName) : '';

        let mcatCityCombinedName = '';

        let vernacularName = '';
        try {
            vernacularName = mcatData.vernacularNames[0]['glcat_mcat_altmcat_name'];
        } catch (e) {
            vernacularName = '';
        }

        let vernacularCityName = '';
        try {
            vernacularCityName = mcatData.vernacularCityName;
        } catch (e) {
            vernacularCityName = '';
        }

        if (language == VERNACULAR_ARR['hi']) {
            mcatCityCombinedName = `${vernacularName}`;
            mcatCityCombinedName += vernacularCityName ? `, ${vernacularCityName}` : ``;

        } else {

            mcatCityCombinedName = `${engName}`;
            mcatCityCombinedName += engCityName ? ` in ${engCityName}` : ``;     

        }

        return mcatCityCombinedName;
    }
    ,
    getSearchBarText(mcatData) {

        const engName = mcatData.mcatName;
        const engCityName = mcatData.cityName ? mcatHelper.getModifiedCityName(mcatData.cityName) : '';

        let vernacularName = '';
        try {
            vernacularName = mcatData.vernacularNames[0]['glcat_mcat_altmcat_name'];
        } catch (e) {
            vernacularName = '';
        }

        let vernacularCityName = '';
        try {
            vernacularCityName = mcatData.vernacularCityName;
        } catch (e) {
            vernacularCityName = '';
        }

        return mcatHelper.generateHeaderString(engName, engCityName, vernacularName, vernacularCityName, getCookie(LANG_COOKIE));


    },
    setLocalStorage(mcatData) {

        let d = new Date();
        let date = "" + d.getFullYear() + (((d.getMonth() + 1).toString().length < 2) ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString()) + ((d.getDate().toString().length < 2) ? '0' + d.getDate().toString() : d.getDate().toString()) + ((d.getHours().toString().length < 2) ? '0' + d.getHours().toString() : d.getHours().toString()) + ((d.getMinutes().toString().length < 2) ? '0' + d.getMinutes().toString() : d.getMinutes().toString()) + ((d.getSeconds().toString().length < 2) ? '0' + d.getSeconds().toString() : d.getSeconds().toString());

        mcatHelper.setRecentMcat(mcatData,date);
        mcatHelper.setRelCats(mcatData);
        mcatHelper.setRelProds2(mcatData);
        mcatHelper.setRecentSearches(mcatData, date)
    }
    ,
    setRecentMcat(mcatData, date) {
        //RecentMcat
        if (mcatData && mcatData.mcatId) {
            let dataObj = {
                DT: date,
                fl_name: mcatData.flName,
                image: mcatData.mcatImg125,
                image250:mcatData.mcatImg250?mcatData.mcatImg250:mcatData.mcatImg125,
                mcatid: mcatData.mcatId,
                catid:mcatData.catId,
                name: mcatData.mcatName,
                city: mcatData.cityName ? mcatData.cityName : ''
            };
            checkAndSetLS('recentMcats', dataObj);
        }
    }
    ,
    setRelCats(mcatData) {
        let relCatsData =localStorage.getItem('relCats')? JSON.parse(JSON.parse(localStorage.getItem('relCats'))):[];
        //RelCats
        let relCats = [];
            let arr = {
                "GLCAT_MCAT_ID": Number(mcatData.mcatId),
                "GLCAT_MCAT_NAME": mcatData.mcatName,
                "GLCAT_MCAT_FL_NAME": mcatData.flName,
                "GLCAT_MCAT_IMG1_125X125": mcatData.mcatImg125,
                'Pagekey':"|IMPCAT-Listing"
            }
            relCats.push(arr)
        if (mcatData.categoriesData) {
            mcatData.categoriesData.map(function (item, key) {
                let p = {
                    "GLCAT_MCAT_ID": item.MCATID,
                    "GLCAT_MCAT_NAME": item.NAME,
                    "GLCAT_MCAT_FL_NAME": item.FLNAME,
                    "GLCAT_MCAT_IMG1_125X125": item.IMAGE,
                    'Pagekey':"|IMPCAT-Listing"
                }
                relCats.push(p)
            });}
            let finalData = [...relCats,...relCatsData];
            let uniqueArray = (Array.from(new Set(finalData.map(obj => obj.GLCAT_MCAT_FL_NAME))).map(GLCAT_MCAT_FL_NAME => finalData.find(obj => obj.GLCAT_MCAT_FL_NAME === GLCAT_MCAT_FL_NAME))).slice(0, 10);
            localStorage.setItem('relCats', JSON.stringify(JSON.stringify(uniqueArray)));
    }
    ,
    setRelProds2(mcatData) {
        let relProds2 = [];
        let relProdLSData =localStorage.getItem('relProds2')? JSON.parse(JSON.parse(localStorage.getItem('relProds2'))):[];
       let firstListData = mcatData.firstListData
        firstListData.map(function (itemArr, key) {
            let item = itemArr[0]
            if (key > 2 && key <= 14 && item.iilDisplayFlag) {
                let companyLink = "https://m.indiamart.com/" + mcatHelper.CompanyUrl(item.companyUrl);
                let p = {
                    "ITEM_NAME": item.extraPrdName ? item.extraPrdName : item.productName ,
                    "CONTACT_TYPE": item.companyContactVal,
                    "COMPANYNAME": item.companyName,
                    "CONTACT_NUMBER": item.companyContactNo,
                    "COMPANY_LINK": companyLink,
                    "COMPANY_URL": item.companySearchUrl,
                    "SDA_GLUSR_USR_LOCALITY": item.locality,
                    "CITY_NAME": item.city,
                    "PRICE": item.price,
                    "PRICE_SEO":item.standardPrice ? '₹ '+item.standardPrice : "",
                    "MOQ_PER_UNIT": '',
                    "price_f":item.standardPrice ? '₹ '+item.standardPrice : "",
                    "ITEM_ID": item.glid,
                    "IMAGE_125X125": item.imgUrl,
                    'IMAGE_250X250':item.imgUrl_250,
                    "DISPLAY_ID": item.displayId,
                    "GLCAT_MCAT_NAME": mcatData.mcatName,
                    "GLCAT_MCAT_FLNAME": mcatData.flName,
                    "PRD_SEARCH_MOQ_UNIT_TYPE": item.unit,
                    "GLUSR_ID": item.glid,
                    "mcatid": mcatData.mcatId,
                    'pagekey':"|MCAT",
                    'PDP_URL':item.productUrl ?item.productUrl:'',
                    'FK_ECOM_STORE_MASTER_ID':mcatData.ecom && (item.ecom_landing_url||item.ecom_cart_url)?1:0,
                    'ECOM_ITEM_LANDING_URL':item.ecom_landing_url,
                    'ECOM_CART_URL':item.ecom_cart_url,

                }
                relProds2.push(p);
            }
        });
        let finalData = [...relProds2,...relProdLSData];
        let uniqueArray = Array.from(new Set(finalData.map(obj => obj.DISPLAY_ID))).map(DISPLAY_ID => finalData.find(obj => obj.DISPLAY_ID === DISPLAY_ID));            
        uniqueArray=uniqueArray?uniqueArray.slice(0,10):'';          
        localStorage.setItem('relProds2', JSON.stringify(JSON.stringify(uniqueArray)));
    }
    ,
    setRecentSearches(mcatData, date) {


        let flag = false;
        let searchLocalST = JSON.parse(localStorage.getItem("recentSearches"));
        let item = {
            "searchkeyword": mcatData.flName,
            "displaykeyword": mcatData.mcatName,
            "searchurl": mcatData.currentUrl,
            "mcatid": mcatData.mcatId,
            "mcat": true,
            "DT": date
        };
        if (searchLocalST !== "undefined" && searchLocalST != null) {
            for (let i = 0; i < searchLocalST.length; i++) {
                if (searchLocalST[i].searchkeyword === item.searchkeyword) {
                    searchLocalST.unshift(item);
                    searchLocalST.splice(i + 1, 1);
                    flag = true; break;
                }
            }
            if (flag === false) {
                searchLocalST.unshift(item);
                if (searchLocalST.length > 25) {
                    searchLocalST.pop();
                    localStorage.setItem("recentSearches", JSON.stringify(searchLocalST));
                }
            }
        }
        else {
            searchLocalST = [];
            searchLocalST.push(item);
        }
        localStorage.setItem("recentSearches", JSON.stringify(searchLocalST));
    }
    ,
    getSeenProduct() {
        if (!localStorage['seenProdList']) {
            return {};
        }

        const seenProdList = JSON.parse(localStorage['seenProdList']);

        if (seenProdList && seenProdList.length >= 0) {

            const dateOfCreation = seenProdList[0];

            let seenProducts = {};

            if (dateOfCreation + 86400000 < Date.now()) {
                localStorage.removeItem('seenProdList');
            } else {
               for(let i=0;i<seenProdList[1].length;i++){
                    seenProducts[seenProdList[1][i]] = true;
               }

            }

            return seenProducts;
        }

    }
    ,
    loadScript(src,callBack){
        let gtagScript = document.createElement('script');
        gtagScript ? gtagScript.setAttribute("src",src): '';
        callBack ? gtagScript.onload = callBack : '';
        gtagScript.type = "text/javascript";
        gtagScript.async = true;
        document.head.appendChild(gtagScript);
      }
      ,
}

export default mcatHelper;