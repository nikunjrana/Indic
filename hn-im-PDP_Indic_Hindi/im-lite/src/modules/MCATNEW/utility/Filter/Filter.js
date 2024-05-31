import React, {Component} from 'react';
import mcatHelper from '../helper';
import FilterView from './FilterView';
import BizPriceView from './BizPriceView';
import CityFilterView from './CityFilterView';
import FilterOptionsView from './FilterOptionsView';
import {detectLocation} from '../../../../Globals/detectLocation';
import {goToRoute} from '../../../../Globals/routingFunction';
import { eventTracking } from '../../../../Globals/GaTracking';
import {setCityLatLong} from '../NearMe/helper';
import "./Filter.css"

export default class Filter extends Component {

    constructor(props){
        super(props);
        this.state = {
        
            openCategoriesFilterView : false,
            openBrandFilterView : false,
            openCityFilterView : false,
            openBizPriceFilterView : false,

          //  nearMe : { cta : 'Near Me', show : props.showNearMe , errorMsg : '' },
            nearMe : { cta : 'Near Me',errorMsg : '' },

            openLocationPopUp : false,

           // isPriceSelected : false,
            bizNameSelected : '',
            isCatSelected : false,

            isLoadingCity : { flag : false, id: '' ,text : ''},
            isLoadingCategories : { flag : false, id: '' ,text : ''},
            isLoadingBrands : {flag : false, id: '' ,text : ''},
            isLoadingBizPrice : {flag : false, id: '' ,text : ''},

            locationPopUpComponent : ''

            
        }

        this.toggleFilter =  this.toggleFilter.bind(this);
        this.onNearMeClick  = this.onNearMeClick.bind(this);
        this.geoLocState = this.geoLocState.bind(this);
      //  this.onDeSelectPrice = this.onDeSelectPrice.bind(this);
        this.onDeSelectBiz = this.onDeSelectBiz.bind(this);
        this.onSelectCityClick = this.onSelectCityClick.bind(this);
        this.onBubbleClick = this.onBubbleClick.bind(this);
        this.loadLocationPopUp = this.loadLocationPopUp.bind(this);
        this.locationPopUpBackHandling = this.locationPopUpBackHandling.bind(this);
     
    }

    loadLocationPopUp(){
        import( /* webpackChunkName:"locationPopUp" */'./LocationPopUpView' ).then(module=>{
            this.setState({locationPopUpComponent : module.default})
        })
    }
    
    
    onBubbleClick(e,type,deselect){

        let text = deselect ? 'Just a sec...' : 'Loading...';
        let id = e.target.dataset.index;
        switch(type){
            case 'CITY':
                this.setState({
                    isLoadingCity : { flag : true, id: id , text :text}
                })
                
                break;
            case 'CATEGORIES':
                this.setState({
                    isLoadingCategories : { flag : true, id: id , text :text},
                })
                break;
            case 'BRANDS':
                this.setState({
                    isLoadingBrands : { flag : true, id: id , text :text},
                })
                break;
            case 'BIZPRICE':
                this.setState({
                    isLoadingBizPrice : { flag : true, id: id , text :text}
                })
                break;
            
            default:

        }
    }

  


    toggleFilter(type){
        switch(type){
            case 'CATEGORIES':
                if(!this.state.openCategoriesFilterView)
                this.setState({
                    openCategoriesFilterView : true,
                    openBrandFilterView : false,
                    openCityFilterView : false,
                    openBizPriceFilterView : false,
                })
                break;
            case 'BRANDS':
                if(!this.state.openBrandFilterView)
                this.setState({
                    openCategoriesFilterView : false,
                    openBrandFilterView : true,
                    openCityFilterView : false,
                    openBizPriceFilterView : false,
                })
                break;
            case 'BIZPRICE':
                if(!this.state.openBizPriceFilterView)
                this.setState({
                    openCategoriesFilterView : false,
                    openBrandFilterView : false,
                    openCityFilterView : false,
                    openBizPriceFilterView : true,
                })
                break;
            //Location PopUp
            case 'LOCATION' :
                this.setState({
                    openLocationPopUp : !this.state.openLocationPopUp,                      
                })
                if(this.state.locationPopUpComponent == ''){
                    this.loadLocationPopUp();
                }
                break;
            //CITY
            default:
                if(!this.state.openCityFilterView){
                    this.setState({
                        openCategoriesFilterView : false,
                        openBrandFilterView : false,
                        openCityFilterView : true,
                        openBizPriceFilterView : false,
                    })
                }

        }
    }

    createCategoriesFilter(){    
        let categories='';
        if((this.props.categoriesData && this.props.categoriesData.length > 0) || this.state.isCatSelected){
             categories =  <FilterView 
                                tracking = {this.props.tracking} 
                                searchParam = {this.props.location.search} 
                                type ='CATEGORIES' 
                                isCatSelected = {this.state.isCatSelected} 
                                mcatName = {this.props.mcatName} 
                                isLoadingCategories = {this.state.isLoadingCategories} 
                                onBubbleClick = {this.onBubbleClick} 
                                showView={this.state.openCategoriesFilterView} 
                                data = {this.props.categoriesData}>
                            </FilterView>           
        }
       
        return categories;
    }

    createBizPriceFilter(){
       
        let bizPriceFilter='';
        if(this.props.bizData.length > 0 || (this.props.bizName &&this.props.bizName != "All")){       
            bizPriceFilter =  <BizPriceView  
                                        tracking = {this.props.tracking}
                                        searchParam = {this.props.location.search}
                                      //  isPriceSelected = {this.state.isPriceSelected} 
                                        bizNameSelected = {this.state.bizNameSelected}  
                                        showView = {this.state.openBizPriceFilterView} 
                                      //  priceData = {this.props.priceData} 
                                        bizData = {this.props.bizData}
                                       // onDeSelectPrice = {this.onDeSelectPrice}
                                        onDeSelectBiz = {this.onDeSelectBiz}
                                        isLoadingBizPrice = {this.state.isLoadingBizPrice}
                                        onBubbleClick = {this.onBubbleClick}
                                        >

                                        </BizPriceView>
        }
        return bizPriceFilter;
    }

    createBrandFilter(){
        let brandsFilter='';
        if(this.props.brandsData.length > 0){
            brandsFilter =  <FilterView 
                                tracking = {this.props.tracking} 
                                type ='BRANDS' 
                                searchParam = {this.props.location.search} 
                                isLoadingBrands = {this.state.isLoadingBrands} 
                                onBubbleClick = {this.onBubbleClick} 
                                showView = {this.state.openBrandFilterView} 
                                data = {this.props.brandsData}>
                            </FilterView>
        }
        return brandsFilter;
    }

    createCityFilter(){

        let cityName = this.props.cityName ? mcatHelper.getModifiedCityName(this.props.cityName) : '';

        let  cityFilter =  <CityFilterView eventTracking={eventTracking} tracking = {this.props.tracking} searchParam = {this.props.location.search} isLoadingCity = {this.state.isLoadingCity} onBubbleClick = {this.onBubbleClick} nearMeData = {this.state.nearMe} onNearMeClick = {this.onNearMeClick} flName = {this.props.flName} bizNameSelected = {this.state.bizNameSelected}
             cityData = {this.props.cityData} showView = {this.state.openCityFilterView} cityName = {cityName}></CityFilterView>
        return cityFilter;
    }

    createLocationPopUpView(){
        let locationPopUpView = '';
        if(this.state.locationPopUpComponent){
            let cityName = this.props.cityName?this.props.cityName.charAt(0).toUpperCase() + this.props.cityName.slice(1):'';
            if(this.state.openLocationPopUp){
                locationPopUpView = <this.state.locationPopUpComponent vernacularData = {this.props.vernacularData} tracking = {this.props.tracking} searchParam = {this.props.location.search} toggleFilter= {this.toggleFilter } nearMeData = {this.state.nearMe} onNearMeClick = {this.onNearMeClick} flName = {this.props.flName} cityData = {this.props.cityData}  cityName = {cityName} mcatName = {this.props.mcatName} ></this.state.locationPopUpComponent>;
            }
        }
        return locationPopUpView;
    }

    locationPopUpBackHandling(){

          window.removeEventListener("popstate",this.locationPopUpBackHandling);
          this.toggleFilter('LOCATION')
      }
    
    onSelectCityClick(){
        if(this.state.openCityFilterView){
            if(!this.state.locationPopUpView && window.history.state != "selectCityPop"){
                window.history.pushState("selectCityPop", "", "")
                window.refUrl.push("somePopUp");
                window.addEventListener("popstate",this.locationPopUpBackHandling,{passive:true});
            }
            this.toggleFilter('LOCATION');
        }
        else{
            this.toggleFilter('CITY');
        }
    }
    geoLocState(result, lat, long, acc) {
        let nearMeData = this.state.nearMe;
        if (result == 'granted' || result == 'prompt-granted') {   
            nearMeData['cta'] = 'Detecting..'; 
            //direct to detected city page
            setCityLatLong(lat,long,this.props.flName,this.props.location).then(res=>{
                eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Detected', 1);
                goToRoute(res);
            })
            .catch(error =>{
               // let nearMeData = { cta : 'Near Me',show : true};
                let nearMeData = { cta : 'Near Me'};
                nearMeData['errorMsg'] = 'Some error occured';
                eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Not-Detected', 1);
                this.setState({
                    nearMe : nearMeData
                }); 
            })

        }
        else if (result == 'denied' || result == 'prompt-denied') {
            nearMeData['errorMsg'] = 'Unable to detect your location. Select City.';
            eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Not-Detected', 1);

        }
        else if (result == 'denied-phone') {
            nearMeData['errorMsg'] = 'Phone location settings disabled. Please allow.';
            eventTracking(this.props.tracking.click, 'Location-Filter','Near-Me-City-Not-Detected', 1);

        }  
        this.setState({
            nearMe : nearMeData
        });     
        
    }
    onNearMeClick(){
        //change the source
        detectLocation(this.geoLocState,this.props.tracking.pageType,0);
      
       
    }

    // onDeSelectPrice(e){
    //     let urlAppend = '';
    //     if(this.state.bizNameSelected){
    //         urlAppend = '?biz=' + this.props.location.query.biz; 
    //     }
    //     this.onBubbleClick(e,'BIZPRICE');
    //   //  let url = this.props.location.pathname + urlAppend;
    //   let url = this.props.location.pathname;
    //   goToRoute({pathname : url ,search : urlAppend, state : {isMcat : true} })
    //   //  goToRoute(url);
      
        
    // }
    
    onDeSelectBiz(e){
    
      this.onBubbleClick(e,'BIZPRICE');
      let url = this.props.location.pathname;
      goToRoute({pathname : url})
        
    }

    setDefaultFilter(){

        if(this.state.openLocationPopUp) this.toggleFilter('LOCATION');
        if(this.props.bizName && this.props.bizName != "All"){
            //this.toggleFilter('BIZPRICE');
            // if(this.props.location.query.pr && this.props.location.query.pr === '2'){              
            //     this.setState({isPriceSelected : true})
            // }
            // else {
            //     if(this.state.isPriceSelected) this.setState({isPriceSelected : false})
            // }           
            //if biz selected
            // if(this.props.bizName != "All"){
                // let bizPossibleValues = ['10','20','30','40'];
                // if(bizPossibleValues.includes(this.props.location.query.biz)){
                //     let bizName = mcatHelper.setBizName(this.props.location.query.biz);

            //If Biz filter selected and then city filter filter selected - Priority to City
            this.props.location.state && this.props.location.state.ref && this.props.location.state.ref === 'CITY' ?this.toggleFilter('CITY') : this.toggleFilter('BIZPRICE');
            this.setState({bizNameSelected : this.props.bizName})
               // }
            //}
            // else{
            //     if(this.state.bizNameSelected) this.setState({bizNameSelected : ''})
            // }
            if(this.state.isCatSelected) this.setState({isCatSelected : false});
        }
       //if clicked categories from search or mcat
       else if(document.referrer.indexOf('isearch.php') > 0 || this.props.location.state && this.props.location.state.ref && this.props.location.state.ref === 'MCAT'){
            this.toggleFilter('CATEGORIES');     
            this.setState({
                bizNameSelected : '',
               // isPriceSelected : false,
                isCatSelected : true           
            })
       }
       
       else {          
            this.toggleFilter('CITY');
            this.setState({
                bizNameSelected : '',
              //  isPriceSelected : false,
                isCatSelected : false
            })
       }
      
    }


    componentDidUpdate(prevProps){
       
        if(prevProps.uniqueId !== this.props.uniqueId){
            this.setDefaultFilter();
            this.setState({ 
                nearMe : { cta : 'Near Me', errorMsg : ''},
                isLoadingCity : { flag : false, id: '' ,text : ''},
                isLoadingCategories : { flag : false, id: '' , text :''},
                isLoadingBrands : { flag : false, id: '' , text :''},
                isLoadingBizPrice : {flag : false, id: '' ,text : ''}
            
            })
        }
    }

    componentDidMount(){     

        this.setDefaultFilter();     
        
    }


    
    render(){
        let cityView = this.createCityFilter();
        let categoriesView = this.createCategoriesFilter();
        let bizPriceView = this.createBizPriceFilter();
        let brandsView = this.createBrandFilter();
        let locationPopUpView = this.createLocationPopUpView();
    
        let rehitError = this.props.rehit ? <div className="pd5 bgw tc err"><span>{this.props.vernacularData? this.props.vernacularData["LOC_LABEL18_1"]:'No results present for'} </span>{mcatHelper.getModifiedCityName(this.props.rehitCityName)}<span className="LOC_LABEL18_3">{this.props.vernacularData? this.props.vernacularData["LOC_LABEL18_3"]:'&#8203'}</span><span>{this.props.vernacularData? this.props.vernacularData["LOC_LABEL18_2"]:', showing results for All India'}</span></div> :'';
       
        return(
            <div className = "bxsdw mt25">
                {locationPopUpView}
                <FilterOptionsView 
                    tracking = {this.props.tracking}
                    categoriesData ={this.props.categoriesData} 
                    brandsData = {this.props.brandsData} 
                    cityData = {this.props.cityData}
                    bizData = {this.props.bizData}
                    bizNameSelected = {this.state.bizNameSelected}
                   // priceData = {this.props.priceData}
                    toggleFilter = {this.toggleFilter}
                    onSelectCityClick = {this.onSelectCityClick}
                    openCategoriesFilterView = {this.state.openCategoriesFilterView}
                    openBrandFilterView = {this.state.openBrandFilterView}
                    openCityFilterView = {this.state.openCityFilterView}
                    openBizPriceFilterView = {this.state.openBizPriceFilterView}
                    location = {this.props.location}
                    >
                </FilterOptionsView>
               
                {cityView}
                {categoriesView}
                {brandsView}
                {bizPriceView}
                {rehitError}
             
                
            </div>
            

        );
    }

}