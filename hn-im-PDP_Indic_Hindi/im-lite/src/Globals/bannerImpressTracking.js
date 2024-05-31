export const bannerImpressTracking = (name, value, type) => {
    let element_track = '';
    let offsettopvalue = "";
    if (type == "class") {
        element_track = document.getElementsByClassName(value);
    }
    else {
        element_track = document.getElementById(value);
    }
    if (element_track) {
      
        if(type=="class" &&  element_track.length>1){
            offsettopvalue = document.getElementsByClassName(value)[0]?document.getElementsByClassName(value)[0].offsetTop:'';
        }
        else if(type=="id"){
            offsettopvalue = document.getElementById(value).offsetTop;
        }
        if (window.scrollY + window.innerHeight == offsettopvalue) {
            bannerImpressionGA(name + "_");
        }
        else {
            bannerImpressTrackAdd(name, value, type);
        }
    }
}