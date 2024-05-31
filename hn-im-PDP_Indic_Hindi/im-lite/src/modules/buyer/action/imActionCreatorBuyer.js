import imApi from "../../../api/imApi";
//import {getPadding} from '../../../Globals/BuyerUtility';

var date = new Date();

const getPadding = (n) => {
    return ((n < 10) ? ('0' + n) : n.toString());
}
const logdate = getPadding(date.getFullYear()) + getPadding((date.getMonth() + 1)) + getPadding(date.getDate()) + getPadding(date.getHours()) + getPadding(date.getMinutes()) + getPadding(date.getSeconds());



let imActionCreatorBuyer = {
    getproducts(modid, mcats, count) {
        return (dispatch) => {
            imApi.getproducts(modid, mcats, count).then(
                (result) => dispatch({ type: 'GET_PRODUCTS', success: true, result }),
                (error) => dispatch({ type: 'GET_PRODUCTS_FAIL' })
            );
        };
    },
    getrecentsearches(glid) {
        return (dispatch) => {
            imApi.getrecentsearches(glid, logdate).then(
                (result) => dispatch({ type: 'GET_RECENTSEARCHES', success: true, result }),
                (error) => dispatch({ type: 'GET_RECENTSEARCHES_FAIL' })
            );

        };


    },
    blankMessages(){
        return (dispatch) => {           
            dispatch({ type: 'BLANK_MESSAGES', success: true })                        
        };
    },
    //abhishek call above GET_RELATEDMCAT & GET_RELATEDMCAT_FAIL
    getrelatedmcat(MCAT_ID) {
        return (dispatch) => {
            imApi.getrelatedmcat(MCAT_ID).then(
                (result) => dispatch({ type: 'GET_RELATEDMCAT', success: true, result }),
                (error) => dispatch({ type: 'GET_RELATEDMCAT_FAIL' })
            );
        };
    },


    getrelatedproducts(mcatid, CITY_ID, prod,ecomflag="", pageType="") {
        return (dispatch) => {
          //check if available on window var
          //window._Related_STORE
          if(window._Related_STORE && Object.keys(window._Related_STORE).length && pageType=="PDP")
          {
            let result = window._Related_STORE.relatedData;
            dispatch({ type: 'GET_RELATEDPRODUCTS', success: true, result })
            dispatch({ type: 'GET_SELLERNEARME', success: true, result })
          }
          else
          {  imApi.getrelatedproducts(mcatid, CITY_ID, prod,ecomflag).then(
                (result) => {
                    dispatch({ type: 'GET_RELATEDPRODUCTS', success: true, result })
                    if(pageType=="PDP")
                    {
                        dispatch({ type: 'GET_SELLERNEARME', success: true, result })
                    }
                    
                },
                (error) => { dispatch({ type: 'GET_RELATEDPRODUCTS_FAIL', error })
                if(pageType="PDP")
                {
                 dispatch({ type: 'GET_SELLERNEARME_FAIL', error })
                }
                }
            );

          }

        };


    },



    //hsingh moreproduct
    getmorerelatedproducts(mcatid, CITY_ID, prod, edisplayID) {
        return (dispatch) => {
            if(window._Related_STORE && Object.keys(window._Related_STORE).length)
          {
            let result = window._Related_STORE.relatedData;
            dispatch({ type: 'GET_MORE_RELATEDPRODUCTS', success: true, result })
          }
          else
          {
            imApi.getmorerelatedproducts(mcatid, CITY_ID, prod, edisplayID).then(
                (result) => dispatch({ type: 'GET_MORE_RELATEDPRODUCTS', success: true, result }),
                (error) => dispatch({ type: 'GET_MORE_RELATEDPRODUCTS_FAIL', error })
            );

          }
        };


    },

    getsellernearme(mcatid, CITY_ID, prod, edisplayID) {
        return (dispatch) => {
            imApi.getsellernearme(mcatid, CITY_ID, prod, edisplayID).then(
                (result) => dispatch({ type: 'GET_SELLERNEARME', success: true, result }),
                (error) => dispatch({ type: 'GET_SELLERNEARME_FAIL', error })
            );

        };


    },

    getpremium(glid) {

        return (dispatch) => {
            imApi.getpremium(glid).then(
                (result) => dispatch({ type: 'GET_PREMIUM_BRANDS', success: true, result }),
                (error) => dispatch({ type: 'GET_PREMIUM_BRANDS_FAIL' })
            );
        };
    },
    getUserEnqAndBl(modid, glid, mobile, email, ccode) {
        return (dispatch) => {
            imApi.getUserEnqAndBl(modid, glid, mobile, email, ccode).then(
                (result) => dispatch({ type: 'GET_LATESTBUYLEADS', success: true, result }),
                (error) => dispatch({ type: 'GET_LATESTBUYLEADS_FAIL' })
            );

        };


    },
    getDisplayInvoiceBanner(glid) {
        return (dispatch) => {
            imApi.getDisplayInvoiceBanner(glid).then(
                (result) => dispatch({ type: 'GET_INVOICEBANNER', success: true, result }),
                (error) => dispatch({ type: 'GET_INVOICEBANNER_FAIL' })
            );

        };
    },
    getSearchData(q) {
        return (dispatch) => {
            dispatch({ type: 'REQUEST_SEARCH_SUGGESTER' });
            imApi.getSearchData(encodeURIComponent(q)).then(
                (response) => dispatch({ type: 'RECEIVE_SEARCH_SUGGESTER', response }),
                (error) => dispatch({ type: 'RECEIVE_SEARCH_SUGGESTER' })
            );
        };
    },
    getRecentSearchData(vid) {
        return (dispatch) => {
            dispatch({ type: 'REQUEST_RECENT_SEARCH_SUGGESTER' });
            imApi.getRecentSearchData(vid).then(
                (response) => dispatch({ type: 'RECEIVE_RECENT_SEARCH_SUGGESTER', response }),
                (error) => dispatch({ type: 'RECEIVE_RECENT_SEARCH_SUGGESTER' })
            );
        };
    },
    saveSearchData(q, vid) {
        return (dispatch) => {
            dispatch({ type: 'REQUEST_SAVE_SEARCH_SUGGESTER' });
            imApi.saveSearchData(encodeURIComponent(q), vid).then(
                (response) => dispatch({ type: 'RECEIVE_SAVE_SEARCH_SUGGESTER', response }),
                (error) => dispatch({ type: 'RECEIVE_SAVE_SEARCH_SUGGESTER' })
            );
        };
    },

    getrecentrelatedmcats(mcats) {
        return (dispatch) => {
            imApi.getrecentrelatedmcats(mcats).then(
                (result) => dispatch({ type: 'GET_RECENTRELATEDMCATS', success: true, result }),
                (error) => dispatch({ type: 'GET_RECENTRELATEDMCATS_FAIL' })
            );

        };


    },
    getrecommendedidentified(glid) {
        return (dispatch) => {
            imApi.getrecommendedidentified(glid, logdate).then(
                (result) => dispatch({ type: 'GET_RECOMMENDED_CAT', success: true, result }),
                (error) => dispatch({ type: 'GET_RECOMMENDED_CAT_FAIL' }),
            );
        };
    },
    getcitymcats(glid, count) {
        return (dispatch) => {
            imApi.getcitymcats(glid, count).then(
                (result) => dispatch({ type: 'GET_CITY_RECOMMENDED_MCAT', success: true, result }),
                (error) => dispatch({ type: 'GET_CITY_RECOMMENDED_MCAT_FAIL' }),
            );
        };
    },
    fetchMessages(glusrid, start, end, count, chkuser) {
        return (dispatch) => {
            dispatch({ type: 'REQUEST_MESSAGES', isFetchingMessages: true, hasMoreMessages: true });
            imApi.fetchMessages(glusrid, start, end, count, chkuser).then(
                (response) => dispatch({ type: 'RECEIVE_MESSAGES_HOME', response, start: start, end: end}),
                (error) => dispatch({ type: 'RECEIVE_MESSAGES_HOME' })
            );
        };
    },
    fetchBuyleads(start, shortlist, inbox, offer_flag, iso, city, locpref, source, mcatid = '') {
        return (dispatch) => {
            imApi.fetchBuyleads(start, shortlist, inbox, offer_flag, iso, city, locpref, mcatid).then(
                function (buyleads) {
                    if (buyleads.status != 'failed') {
                        dispatch({ type: 'RECEIVE_BUYLEADS', success: true, buyleads, source: source, expiredOrActive: shortlist })
                        if (source == "wishlist" && buyleads['DisplayList'].length < 9) {
                            imApi.fetchBuyleads(0, 'E', inbox, offer_flag, city, locpref, mcatid).then(
                                (buyleads) => dispatch({ type: 'RECEIVE_BUYLEADS', success: true, buyleads, source: "wishlistE", expiredOrActive: 'E', })
                            );
                        }
                    }
                    else {
                        dispatch({ type: 'BL_PAGE_ERROR', success: false, source })
                    }
                }
                ,
                (error) => dispatch({ type: 'BL_PAGE_ERROR', success: false, source })
            );
        };

    },
    updatestate() {
        return (dispatch) => { dispatch({ type: 'REL_PRODS_UPDATE' }) }
    },
    getMiniPdpData(q) {
        if (q == '') {
            let response = "";
            return (dispatch) => dispatch({ type: 'RECEIVE_MINIPDP', response });
        }
        else {
            return (dispatch) => {
                imApi.getMiniPdpData(encodeURIComponent(q)).then(
                    (response) => dispatch({ type: 'RECEIVE_MINIPDP', response }),
                    (error) => dispatch({ type: 'RECEIVE_MINIPDP' })
                );
            };
        }
    },
    getstdproducts(mcatid,counter) {
     
         return (dispatch) => {
             imApi.getstdproducts(mcatid,counter).then(
                 (result) => dispatch({ type: 'GET_STD_PRODUCTS', success: true, result }),
                 (error) => dispatch({ type: 'GET_STD_PRODUCTS_FAIL'})
             );
         };
    },
    addC2Ctrack(inpdata){
		return (dispatch) => {
            dispatch({ type: 'C2C_TRACKING'});
			imApi.addC2Ctrack(inpdata).then(
				(response) =>{
					dispatch({ type: 'REQUEST_C2C_TRACKING', success: true, response})
				},
				(error) => dispatch({ type: 'REQUEST_C2C_TRACKING_ERROR'})
			);
	   };
	},
};


export default imActionCreatorBuyer;
