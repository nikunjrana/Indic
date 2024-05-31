 
export const modifyImgSrc = (image) => {
    if (typeof image != "undefined" && image != 'no_image' && image != '') {
        image = image.replace(/^http:\/\//i, 'https://');
        image = image.replace('imghost.indiamart.com', '1.imimg.com');
        image = image.replace('imghost1.indiamart.com', '2.imimg.com');
        return  image;
    }

}

export function getFirstImg(data) {
    let firstImg = '';
    let wh = data.PC_ITEM_IMG_ORIGINAL_WH? data.PC_ITEM_IMG_ORIGINAL_WH: "0,0";
    wh=wh.split(",");
    let w = wh[0];
    let h = wh[1];
    
    let isDspId =['7918789097','23012172955','15228016748','19979334512','22220741748','1711895588','21757746133','14550598233','23564494133','9912011997','10461764388','23363520055','22890031748','20340597273','2632899573','22083791333','22859392273','13675493930','20202771473','20006283230','22883344397','20895606588','15879905962','9201820697','17096442630','21924819812','20308464230','23548736248','20566380862','19101170148','15042019233','21420449297'];
    if (data && data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') {
        if(isDspId.includes(data.PC_ITEM_DISPLAY_ID)){
            let splitImgURL = data.PC_IMG_SMALL_600X600.split('/');
            let checkImag = splitImgURL[3] && splitImgURL[3].startsWith('data');
            checkImag? splitImgURL.splice(3,0,'webp-convert'):'';
            let joinImgURL= splitImgURL.join('/');
            firstImg= joinImgURL;
        }else {
            firstImg = data.PC_IMG_SMALL_600X600
        }
    }
    else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { firstImg = data.PC_ITEM_IMG_SMALL }
    else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { firstImg = data.PC_IMG_SMALL_100X100 }
    else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { firstImg = data.GLUSR_USR_LOGO_IMG }
    else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';

    return { 
        firstImg : firstImg,
        w:w,
        h:h 
    }
}
