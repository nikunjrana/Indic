import React, { PureComponent } from 'react';
import InlineEnquiry from '../../NewUtility/InlineEnquiry/InlineEnquiry';
import RecommendedWidgets from '../../utility/RecommendedWidgets';
import PhotosGrid from '../../NewUtility/PhotosGrid';
import AlsoDealsIn from '../../NewUtility/AlsoDealsIn';
import { getCookie,getCookieValByKey } from '../../../../Globals/CookieManager';
// import { checkUserConverted } from '../../../CentralizePopUp/utility/helper';
class BelowFoldContent extends PureComponent {
    constructor(props){
        super(props);
        this.country_value = '';
        this.state={RevampSoiBanner:''};
        this.loadRevampSoiBanner = this.loadRevampSoiBanner.bind(this);
    }
    loadRevampSoiBanner(){
        if (!this.state.RevampSoiBanner) {
            {
                // import(
                // /* webpackChunkName:"RevampSoiBanner" */ "../../../SellOnIm/components/RevampSoiBanner"
                // ).then((module) => {
                //     this.setState({ RevampSoiBanner: module.default });
                // });
            }
        }
        window.removeEventListener("scroll", this.loadRevampSoiBanner);
        window.removeEventListener(this.eventType, this.loadRevampSoiBanner);
    }
    componentDidMount(){
        this.eventType = 'pointerdown';
        if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
            this.eventType = 'click';
        }
         let multipurpose = localStorage && localStorage.multi_purpose ? JSON.parse(localStorage.multi_purpose) : '';
        this.isUserConverted ='';
        if(this.isUserConverted){
            window.addEventListener(this.eventType, this.loadRevampSoiBanner, {passive: true});
            window.addEventListener("scroll", this.loadRevampSoiBanner, {passive: true});
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.isUserConverted&&this.state!=prevState){
            if (getCookie('iploc') && getCookie('gstate')) { this.country_value = getCookieValByKey('iploc', 'gcniso');} 
            else {
              this.country_value = this.props.country_iso;
            }
            if ((this.country_value == '' || this.country_value == 'IN') && getCookieValByKey('ImeshVisitor', 'iso') && getCookieValByKey('ImeshVisitor', 'iso') != 'IN') 
            {
              this.country_value = getCookieValByKey('ImeshVisitor', 'iso') ? getCookieValByKey('ImeshVisitor', 'iso') : '';
            }
        }
    }
    render() {
        let dataForWidgetAlsoDealsIn = this.props.relatedMCATData && this.props.relatedMCATData.Data && this.props.relatedMCATData.Data[0] && this.props.relatedMCATData.Data[0].RELATED_PRODUCTS;
        let isEcom =  this.props.data && this.props.data.ECOM_ITEM_LANDING_URL && this.props.data.PC_ITEM_IS_ECOM && this.props.data.ECOM_STORE_ENABLE_FLAG && this.props.data.ECOM_STORE_ENABLE_FLAG==1 ? true : false
        let isOutOfStock = this.props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
        return (
            <div>

               <div id="relatedWidgets"><RecommendedWidgets data={this.props.data} showModal={this.props.showModal}  relatedMCATData={this.props.relatedMCATData} pdpCity={this.props.pdpCity} pdpCityId={this.props.data.CITY_ID} callNowClick={this.props.callNowClick} cookie={this.props.cookie} mcat_id={this.props.mcat_id} firstimage={this.props.firstimage} pageLang={this.props.pageLang} isCSR={this.props.isCSR} linkTag = {this.props.linkTag} callProps={this.props.callProps} transformedNo={this.props.transformedNo} isEcom={isEcom}/></div>
               <div><PhotosGrid data={this.props.data} modal={this.props.modal} enqCtaDisabled={this.props.enqCtaDisabled} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} track={this.props.track} pageLang={this.props.pageLang} translatedTxt={this.props.translatedTxt} callNowClick={this.props.callNowClick} showModal={this.props.showModal} callProps={this.props.callProps} firstimage={this.props.firstimage}ProductImage={this.props.ProductImage} transformedNo={this.props.transformedNo} isEcom={isEcom} isOutOfStock={isOutOfStock}/></div>
            </div>
        )}
}
export default BelowFoldContent;