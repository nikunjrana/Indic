import { imStore } from '../../../store/imStore';
import fetchRelatedData from '../ServiceHandler/fetchRelatedData';
import fetchCapsData from '../ServiceHandler/fetchCapsData';
import { getCookie} from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';


export const personalisationActionDispatcher = (isCompany=false) => {
    
    let ls = localStorage;
    let prodsData=[];
    if(ls.prodsViewed)
        prodsData=JSON.parse(ls.prodsViewed);
    if(ls.prodsViewed && !getCookie('im_iss') && !(/iPad|iPhone|iPod/.test(navigator.userAgent))){
        prodsData=prodsData.filter(function(data) {
            let dt1=""+data.DT.slice(0,4)+'-'+data.DT.slice(4,6)+'-'+data.DT.slice(6,8)+' '+data.DT.slice(8,10)+':'+data.DT.slice(10,12)+':'+data.DT.slice(12,14);
            let date1 = new Date(dt1);
            let date2 = new Date();
            let diff = date2.getTime() - date1.getTime();
            let Hrs = diff / (1000 * 60 * 60);
            return Hrs<48;
        }); 
    }
    
    let gaid=getCookie("_ga")?getCookie('_ga'):'';
    let gaLastDigit= gaid[gaid.length-1]?gaid[gaid.length-1]:'';
    ls.prodsViewed && isPdp && (window.pageName=='home')?sessionStorage.setItem('ADVproducts',true):'';
    let recom_displayid='';
    let dispid='';
    let isPdp;
    let currentPage;
    let ecomFlag = '';
    if(ls && ls.prodsViewed && JSON.parse(ls.prodsViewed).length > 0 && JSON.parse(ls.prodsViewed)[0].ecom_flag==1 && window.pageName && (window.pageName.includes('product-detail') || window.pageName.includes('PDP'))){
            ecomFlag = '&ecomFlag=0'
        }
   
    if(ls && ls.PDP404URL)
  {
   let pdp=JSON.parse( ls.PDP404URL);
   let pdpprev=pdp && pdp.previousPageURL?pdp.previousPageURL:'';
   currentPage=pdp && pdp.currentPageURL ?pdp.currentPageURL:'';
   isPdp= pdpprev? pdpprev.includes('proddetail'):'';
  }

let extractIdFromUrl = (url) => {
    let parts = url && url.includes('-') ? url.split('-'):'';
    let idWithExtension = parts && (parts.length>1) ?parts[parts.length - 1].includes('.')? parts[parts.length - 1].split('.')[0]:'':'';
    let id = idWithExtension.replace(/[^\d]/g, '');
    return id;
  };

  let filteredId = extractIdFromUrl(currentPage);
   recom_displayid +="&recom_displayid="+ filteredId;
   
     if (ls.recentMcats ) {
        let recentMcats = JSON.parse(ls.recentMcats);
        let len = (recentMcats.length > 4) ? (4) : (recentMcats.length);
        let mcats = '';        
        for (let i = 0; i < len; i++) {
            if (recentMcats[i].mcatid != '') {
                mcats += "&MCAT_ID" + (i + 1) + "=" + recentMcats[i].mcatid;
            }
        }

      
        
           
         //caps   
       if(window.pageName && (window.pageName.includes('product-detail') || window.pageName.includes('PDP'))){
        fetchCapsData({recom_displayid:recom_displayid},true).then((data) => {
            sessionStorage.setItem('ADVproduct',true)
            if (data && data.status == 200) {
                        imStore.dispatch({ type: "CAPS_PROD_SERVICES_HIT",data})
            }
        });
    }  
        
         
          fetchRelatedData({ mcats: mcats,dispid : dispid,ecomFlag : ecomFlag}).then((data) => {
            if (data.response && data.response.Status == 200) {
               if(isCompany &&  data.response['RECOMMENDED MCAT DATA'] &&  data.response['RECOMMENDED DATA']){
                let rel_prods_data = [];
                data.response['RECOMMENDED DATA'].map(function (query, key) {
                    
                  query['mcatid']  = query['MCAT_ID'] ? query['MCAT_ID']:'';
                  query['COMPANY'] = '';
                  query['pagekey']='|COMPANY';
                query['PDP_URL'] =query['PDP_URL'] ?query['PDP_URL']:'';
                query['ECOM_ITEM_LANDING_URL'] =query['ECOM_ITEM_LANDING_URL'] ?query['ECOM_ITEM_LANDING_URL']:'';
                query['ECOM_CART_URL'] =query['ECOM_CART_URL'] ?query['ECOM_CART_URL']:'';
                query['FK_ECOM_STORE_MASTER_ID'] =query['FK_ECOM_STORE_MASTER_ID_URL'] ||(query['ECOM_CART_URL'] && query['ECOM_ITEM_LANDING_URL'] ) ?1:0;
             
                   if(query && query.IIL_DISPLAY_FLAG=="1")  {
                        rel_prods_data.push(query);
                   }
                });
                localStorage.setItem('relProds2', JSON.stringify(JSON.stringify(rel_prods_data)));

                let rel_cats_data = [];
                data.response['RECOMMENDED MCAT DATA'].map(function (query, key) {
                    let p = {
                        "GLCAT_MCAT_ID": query.GLCAT_MCAT_ID ? query.GLCAT_MCAT_ID : '',
                        "GLCAT_MCAT_NAME": query.GLCAT_MCAT_NAME ,
                        "GLCAT_MCAT_FL_NAME": query.GLCAT_MCAT_FLNAME,
                        "GLCAT_MCAT_IMG1_125X125": query.GLCAT_MCAT_IMG1_125X125 ? query.GLCAT_MCAT_IMG1_125X125 :'',
                        'Pagekey':'|COMPANY'
                    }
                    rel_cats_data.push(p);
        
                });
                localStorage.setItem('relCats', JSON.stringify(JSON.stringify(rel_cats_data)));
            }
                imStore.dispatch({ type: "RELATED_SERVICE_HIT", data })
            }
        });
    

    }
    
    
    if((prodsData.length< 1 && /iPad|iPhone|iPod/.test(navigator.userAgent)) && ls.prodsViewed != JSON.stringify(prodsData)){
        ls.removeItem('prodsViewed');
        ls.setItem('prodsViewed',JSON.stringify(prodsData));
    }  
}