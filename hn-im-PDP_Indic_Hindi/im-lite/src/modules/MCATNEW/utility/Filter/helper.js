import {VERNACULAR_ARR} from '../../../../constants/constants';
let filterHelper = {
    // getCategoriesData: (language,categoriesData, cityName) => {
    //     let data = [];
    //     if (categoriesData) {
    //         data = categoriesData.filter(
    //             (item, index) => {

    //                 if (item.REL_TYPE_FLAG !== 4 && index < 30) {
    //                     return item;
    //                 }
    //             }
    //         ).map(
    //             (item) => {
    //                 let url = cityName == item.GL_CITY_FLNAME ? '/city/' + cityName + '/' + item.GLCAT_MCAT_FLNAME + '.html'
    //                     : '/impcat/' + item.GLCAT_MCAT_FLNAME + '.html';
    //                 let city = cityName == item.GL_CITY_FLNAME ? item.GL_CITY_NAME : '';
    //                 //Vernacular check
    //                 let name = language === VERNACULAR_ARR['hi']? item.GLCAT_MCAT_NAME_SECONDARY : item.GLCAT_MCAT_NAME
    //                 let finalItem = {
    //                     FLNAME : item.GLCAT_MCAT_FLNAME,
    //                     NAME: name,
    //                     LINK: url,
    //                     IMAGE: filterHelper.modifyImgSrc(item['GLCAT_MCAT_IMG1_125X125']),
    //                     CITY: city,
    //                     MCATID :item.GLCAT_MCAT_ID
    //                 };


    //                 return finalItem;
    //             }
    //         )
    //     }


    //     // console.log('[CATEGORIES DATA]',data);
    //     return data;

    // },

    // getBrandsData: (language,brandsData, cityName) => {
    //     let data = [];
    //     if (brandsData) {
    //         data = brandsData.map(
    //             (item) => {
    //                 const url = cityName ? '/city/' + cityName + '/' + item['GLCAT_MCAT_FLNAME'] + '.html'
    //                     : '/impcat/' + item['GLCAT_MCAT_FLNAME'] + '.html';
    //                 const name = language === VERNACULAR_ARR['hi']? item['CHILDNAME_SECONDARY']: item['CHILDNAME']
    //                 const finalItem = {
    //                     NAME: name,
    //                     LINK: url,
    //                     IMAGE: filterHelper.modifyImgSrc(item['GLCAT_MCAT_IMG1_125X125']),
    //                     CITY: ''
    //                 };


    //                 return finalItem;
    //             }
    //         )
    //     }
    //     return data;

    // },

    // getExploreCategories: (language,exploreData, cityName) => {
    //     let data = [];
    //     if (exploreData) {
    //         data = exploreData.map(
    //             (item) => {
    //                 let url = '/impcat/' + item.GLCAT_MCAT_FLNAME + '.html';
    //                 const name = language === VERNACULAR_ARR['hi']? item['CHILDNAME_SECONDARY']: item['CHILDNAME']
    //                 let finalItem = {
    //                     NAME: name,//vernacular check left
    //                     LINK: url,
    //                     IMAGE: filterHelper.modifyImgSrc(item.GLCAT_MCAT_IMG1_125X125),
    //                     CITY: ''
    //                 };


    //                 return finalItem;
    //             }
    //         )
    //     }
    //     return data;

    // },

    // getCityData : (language,cityData,cityName,flname,mcatname) =>{
    //     let data = {
    //         cities : [],
    //         allIndiaLINK : '/impcat/' + flname + '.html'

    //     };
    //         if(cityData){
    //             //if cityname present then remove the city selected from the array
    //             if(cityName){
    //                 cityData = cityData.filter(
    //                 (item) =>  item['GL_CITY_FLNAME'] !== cityName
    //             )
    //             }
        
    //         data.cities = cityData.map(
    //         (item) =>{
    //             let url = '/city/' + item['GL_CITY_FLNAME'] + '/'+ flname + '.html'
    //             const name = language === VERNACULAR_ARR['hi'] ? item['PRD_SEARCH_CITY_SECONDARY'] : item['PRD_SEARCH_CITY']
    //             let finalItem = {
    //                 NAME :name,
    //                 LINK :url,
    //                 TITLE : mcatname + ' in ' + name
    //             };
                    
                    
    //             return finalItem;
    //         }
    //     )
    // }
    
    //     return data;
    // },

    // // getPriceData: (priceCount, flname, cityName, queryParams) => {
    // //     let data = {};

    // //     if (priceCount > 0) {
    // //         let url = '';
    // //         if (cityName) {
    // //             url = '/city/' + cityName + '/' + flname + '.html';

    // //         }
    // //         else {
    // //             url = '/impcat/' + flname + '.html';
    // //         }
    // //         let query = '?pr=2';

    // //         if (queryParams.biz) query = query + '&biz=' + queryParams.biz;

    // //         data = {
    // //             LINK: url,
    // //             QUERY: query

    // //         };
    // //     }

    // //     return data;
    // // },

    // setBizName: (value) => {
    //     if (value == 0)
    //         return 'All';
    //     if (value == 10)
    //         return 'Manufacturer';
    //     if (value == 20)
    //         return 'Exporter';
    //     if (value == 30)
    //         return 'Wholesaler';
    //     if (value == 40)
    //         return 'Retailer';

    // },
    // getBizData: (bizData, cityName, flname, queryParams, mcatprod) => {

    //     let data = [];
    //     if (bizData && mcatprod !== 'S') {
    //         let url = cityName ? '/city/' + cityName + '/' + flname + '.html'
    //             : '/impcat/' + flname + '.html';

    //         let urlAppend = '';
    //         if (queryParams.pr) urlAppend = '&pr=2';

    //         const bizAllowedValues = [10, 20, 30, 40];
    //         data = bizData.filter(
    //             (item, index) => bizAllowedValues.includes(item.PRD_SEARCH_PRIMARY_BIZ_ID)
    //         )
    //             .map(
    //                 (item, index) => {
    //                     let bizId = item.PRD_SEARCH_PRIMARY_BIZ_ID;
    //                     let finalItem = {
    //                         NAME: filterHelper.setBizName(bizId),
    //                         LINK: url,
    //                         QUERY: '?biz=' + bizId + urlAppend
    //                     };

    //                     return finalItem;



    //                 }
    //             );

    //     }


    //     return data;


        
        
    // }
    // ,
    // modifyImgSrc : (image)=> {
    //     if (typeof image != "undefined" && image != 'no_image' && image != '') {
    //         image = image.replace(/^http:\/\//i, 'https://');
    //         image = image.replace('imghost.indiamart.com', '1.imimg.com');
    //         image = image.replace('imghost1.indiamart.com', '2.imimg.com');
    //         return  image;
    //     }
    
    // }
    // ,
    // getModifiedCityName(cityFlName){
    //     const cityFlNameArr = cityFlName.split('-');

    //     const cityNameArr = cityFlNameArr.map((ele) => {
    //         return ele[0].toUpperCase() + ele.substr(1)
    //     });

    //     const cityName = cityNameArr.join(' ');

    //     return cityName;
    // }
}

export default filterHelper;