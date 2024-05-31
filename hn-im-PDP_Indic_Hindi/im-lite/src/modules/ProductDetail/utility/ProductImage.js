import React,{useState,Component} from 'react';
import CreateCarousel from './Carousel/CreateCarousel';
import ProductName from '../NewUtility/ProductName';
import ProductPrice from '../NewUtility/ProductPrice';
// import ProductName from '../utility/ProductName/ProductName';
// import ProductPrice from '../utility/ProductPrice/ProductPrice';

export default function ProductImage(props) {
    
    const [transImg, setTransImg] = useState('');
    const [isZoom, setZoom] = useState('');
    const isImageZoomed=(isZmd)=>{setZoom(isZmd)};

    const productImgcallback=(imgSrc)=>{
        setTransImg(imgSrc)};

    let pdpImage = '', productName='', productPrice='';
    productName= <ProductName data={props.data} prdNameOnZoom={'prdNameOnZoom'} isZoom={props.photoGallery?true:isZoom}/>
    productPrice= <ProductPrice data={props.data} showModal={props.showModal} enqSent={props.enqCtaDisabled==props.data.PC_ITEM_DISPLAY_ID} isZoom={props.photoGallery?true:isZoom} photoGallery={props.photoGallery}/>

    pdpImage = !props.photoGallery?<CreateCarousel  category={props.category}  enqCtaDisabled = {props.enqCtaDisabled} toggleEnqCTADisabled={props.toggleEnqCTADisabled} action={props.action} label={props.label}  location={props.location} translatedTxt={props.translatedTxt} pageLang={props.pageLang} data={props.data} isExtended={props.isExtended} isExtendedIndex={props.isExtendedIndex} productName={productName} productPrice={productPrice} showModal={props.showModal} pdpModrefType={props.pdpModrefType} isIntermediateScreenVisible={props.isIntermediateScreenVisible} isImageEdgeToEdge={props.isImageEdgeToEdge} productImgcallback={productImgcallback} imageslen={props.data.ITEM_IMG.length}  widgetName={props.widgetName}  transImg={transImg} track={props.track} checkEnqInitiator={props.checkEnqInitiator} YouTubePlayer={props.YouTubePlayer} showRatingFeedback={props.showRatingFeedback} isImageZoomed={isImageZoomed} callProps={props.callProps} callNowClick={props.callNowClick} pdpServiceType={props.pdpServiceType}/>:
    <CreateCarousel data={props.data} imgs={props.imgs} index={props.index} iszoom={props.iszoom} imageslen={props.imageslen} productName={productName} productPrice={productPrice} productImgcallback={props.productImgcallback} transImg={props.transImg} showModal={props.showModal} setZoomfalse={props.setZoomfalse} enqCtaDisabled={props.enqCtaDisabled} toggleEnqCTADisabled={props.toggleEnqCTADisabled} track={props.track} pageLang={props.pageLang} translatedTxt={props.translatedTxt} isExtended={props.isExtended} isExtendedIndex={props.isExtendedIndex} pdpModrefType={'3'} photoGallery={true} pdpServiceType={props.pdpServiceType}/>


    return pdpImage;
}