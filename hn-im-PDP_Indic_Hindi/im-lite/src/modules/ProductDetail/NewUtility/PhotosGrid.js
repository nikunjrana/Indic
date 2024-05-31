import React, { Component, useState, useEffect} from 'react';
import { generateUniqueKey, modifyImgSrc } from '../utility/helper';
import EnquiryCTA from './EnquiryCTA';
import Buynow from './Buynow';
// import CreateCarousel from '../utility/Carousel/CreateCarousel';


function PhotosGrid(props){
    function Imagesgrid(props) {
        const [transImg, setTransImg] = useState('');
        const [isZoom, setZoom] = useState('');
        const [imgIndexPg, setindex] = useState('');
        const productImgcallback=(imgSrc)=>{setTransImg(imgSrc)};
        function setZoomfalse(){
          history.state=="Zoom" && window.refUrl && window.refUrl.length>1 ?history.back():'';
          let elementToScroll = document.getElementById('gridImg'+imgIndexPg);
          if (elementToScroll) {
            elementToScroll.scrollIntoView();
          }
          setZoom(false);
          window.removeEventListener('popstate', setZoomfalse);
          document.body.classList.remove("ohi");
        }
        // let productName= <ProductName prdNameOnZoom={'prdNameOnZoom'} pageLang={props.data.pageLang} data={props.data} translatedTxt={props.data.translatedTxt}/>
        // let productPrice= <ProductPrice data={props.data} isZoom={isZoom} showModal={props.showModal} enqCtaDisabled={props.enqCtaDisabled} track={props.track} pageLang={props.pageLang} isExtended={false} photoGallery={true}/>
        
        let images = props.data.ITEM_IMG;
        let imgs = [];
        let firstImg = '';
      
        if (props.data.PC_ITEM_IMG_SMALL && props.data.PC_ITEM_IMG_SMALL !== '') {
          firstImg = props.data.PC_ITEM_IMG_SMALL;
        } else if (props.data.PC_IMG_SMALL_600X600 && props.data.PC_IMG_SMALL_600X600 !== '') {
          firstImg = props.data.PC_IMG_SMALL_600X600;
        } else if (props.data.PC_IMG_SMALL_100X100 && props.data.PC_IMG_SMALL_100X100 !== '') {
          firstImg = props.data.PC_IMG_SMALL_100X100;
        } else if (props.data.PC_ITEM_IMG_ORIGINAL && props.data.PC_ITEM_IMG_ORIGINAL !== '') {
          firstImg = props.data.PC_ITEM_IMG_ORIGINAL;
        } else if (props.data.GLUSR_USR_LOGO_IMG && props.data.GLUSR_USR_LOGO_IMG !== '') {
          firstImg = props.data.GLUSR_USR_LOGO_IMG;
        } else {
          firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
        }
      
        firstImg ? (firstImg = modifyImgSrc(firstImg)) : '';
      
        imgs.push(firstImg);
      
        for (let index in images) {
          if (images.hasOwnProperty(index)) {
            let im = images[index],
              imageFinal = '';
      
            if (im.IMAGE_250x250 && im.IMAGE_250x250 !== '') {
              imageFinal = im.IMAGE_250x250;
            } else if (im.IMAGE_125x125 && im.IMAGE_125x125 !== '') {
              imageFinal = im.IMAGE_125x125;
            } else if (im.IMAGE_500X500 && im.IMAGE_500X500 !== '') {
              imageFinal = im.IMAGE_500X500;
            } else if (im.IMAGE_ORIGINAL && im.IMAGE_ORIGINAL !== '') {
              imageFinal = im.IMAGE_ORIGINAL;
            }
      
            imageFinal ? (imageFinal = modifyImgSrc(imageFinal)) : '';
      
            imgs.push(imageFinal);
          }
        }
        return (<>
         {isZoom&&props.ProductImage?(<props.ProductImage data={props.data} imgs={imgs} index={imgIndexPg} iszoom={isZoom} imageslen={imgs.length-1}  productImgcallback={productImgcallback}transImg={transImg} showModal={props.showModal} setZoomfalse={setZoomfalse} enqCtaDisabled={props.enqCtaDisabled} toggleEnqCTADisabled={props.toggleEnqCTADisabled} track={props.track} pageLang={props.pageLang} translatedTxt={props.translatedTxt} isExtended={props.isExtended} isExtendedIndex={props.isExtendedIndex} pdpModrefType={'3'} photoGallery={true}/>):
         ''}
        {imgs.map((img, index) => {
          return (
              
            <div id={'gridImg'+index} className='gridimg' key={index}>
              <img onClick={()=>{
                  setindex(index);
                  setZoom(true);
                  window.refUrl ? window.refUrl.push("somePopUp") : "";
                  history.pushState('Zoom','','')
              }}
                alt={
                  props.data.PC_ITEM_DISPLAY_NAME
                    ? props.data.PC_ITEM_DISPLAY_NAME
                    : props.data.PC_ITEM_NAME
                    ? props.data.PC_ITEM_NAME
                    : ''
                }
                src={img}
                loading='lazy'
              />
            </div>
            
          );
          })
        
          }
        </>)
      }
    
    const imagesgrid=(data)=>{
        let images=data.ITEM_IMG;
        let imgs=[];
        let firstImg='';
        if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { firstImg = data.PC_ITEM_IMG_SMALL }
        else if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') { firstImg = data.PC_IMG_SMALL_600X600 }
        else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { firstImg = data.PC_IMG_SMALL_100X100 }
        else if (data.PC_ITEM_IMG_ORIGINAL && data.PC_ITEM_IMG_ORIGINAL != '') { firstImg = data.PC_ITEM_IMG_ORIGINAL }
        else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { firstImg = data.GLUSR_USR_LOGO_IMG }
        else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
        firstImg? firstImg = modifyImgSrc(firstImg):'';
        imgs.push(firstImg)
        for (let index in images) {
            if (images.hasOwnProperty(index)) {
                let im = images[index],
                    imageFinal = '';
                    if (im.IMAGE_250x250 && im.IMAGE_250x250 != '') { imageFinal = im.IMAGE_250x250 }
                    else if (im.IMAGE_125x125 && im.IMAGE_125x125 != '') { imageFinal = im.IMAGE_125x125 }
                    else if (im.IMAGE_500X500 && im.IMAGE_500X500 != '') { imageFinal = im.IMAGE_500X500 }
                    else if (im.IMAGE_ORIGINAL && im.IMAGE_ORIGINAL != '') { imageFinal = im.IMAGE_ORIGINAL }
                imageFinal?imageFinal = modifyImgSrc(imageFinal):'';
                imgs.push(imageFinal)
            }
        }
        return imgs.map((imgs) => {
            return(
                <div key={generateUniqueKey()} className='gridimg'>
                <img alt={data.PC_ITEM_DISPLAY_NAME?data.PC_ITEM_DISPLAY_NAME:data.PC_ITEM_NAME?data.PC_ITEM_NAME:''} src={imgs} loading='lazy'/>
                </div>)})
    }

    return(
    <React.Fragment>
        <h3 className='pd10 fw fs17 mxht1000 btmtop mt10 pdt20'>फोटो गैलरी {props.data.PC_ITEM_NAME?props.data.PC_ITEM_NAME:'this product'}</h3>
        <div className='gridcontainer promptHandlingClass' id='sticky' ><Imagesgrid data={props.data} showModal={props.showModal} enqCtaDisabled={props.enqCtaDisabled} toggleEnqCTADisabled={props.toggleEnqCTADisabled} track={props.track} pageLang={props.pageLang} translatedTxt={props.translatedTxt} isExtended={props.isExtended} ProductImage={props.ProductImage}/></div>
        {props.isEcom && !props.isOutOfStock? <Buynow data={props.data}/> : <div className="mt5"><EnquiryCTA pdpData={props.data} data={props.data} callNowClick={props.callNowClick} showModal={props.showModal} callProps={props.callProps} imgSrc={props.firstimage} cat_ID={props.data.CAT_ID} isEnquirySent={props.enqCtaDisabled && props.data.PC_ITEM_DISPLAY_ID==props.enqCtaDisabled} eventAction={"PhotoGallery|EnquiryCTA|PDP"} queryText={"IMOB_PDP_PhotoGallery|"} linkTag={props.linkTag}/></div>}
    </React.Fragment>
    )
}
export default PhotosGrid;