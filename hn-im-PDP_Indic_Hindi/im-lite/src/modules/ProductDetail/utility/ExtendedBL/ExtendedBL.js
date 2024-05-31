import React from 'react';
import { getCookie } from '../../../../Globals/CookieManager';
import "./ExtendedBL.css" 
import { checkUserMode } from '../../../../Globals/MainFunctions';
import { eventTracking } from '../../../../Globals/GaTracking';

export default class ExtendedBL extends React.Component {
    constructor(props) {
        super(props);
        this.callBL = this.callBL.bind(this);
    }

    componentDidMount() {
        window.requireChatBl = true;

    }

    componentWillUnmount() {
        window.requireChatBl = false;

    }

    
    decodeEntityCode(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    getPdpImg(image) {
        if (typeof image != "undefined" && image != 'no_image' && image != '') {
            image = image.replace(/^http:\/\//i, 'https://');
            image = image.replace('imghost.indiamart.com', '1.imimg.com');
            image = image.replace('imghost1.indiamart.com', '2.imimg.com');
            return image;
        }

    }


    callBL(name,prodImg,mcatId) {
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var obj = {};
        obj.prNtFndName = '';
        obj.CEF_form_type = '';
        obj.CefProdType = '';
        obj.R_custtype_weight = "";
        obj.affiliationId  = '-93';
        obj.mcatId  = mcatId;
        obj.productName = name;
        obj.query = '';
        obj.queryText = 'PBR-Inline-Between-Results|' + langSelection+this.props.track;
        obj.modid = 'IMOB';
        obj.productImage=prodImg;
        obj.isEnquiry=false;
        obj.internaltrack=this.props.track;
        obj.ctaName='Get Verified Sellers';
        obj.page= 'PDP';
          this.props.showModal(obj);
    }

   

    render() {
       let prodImg=this.getPdpImg(this.props.data.PC_ITEM_IMG_SMALL);
       let prodDsplName=this.props.data.PC_ITEM_DISPLAY_NAME && this.props.data.PC_ITEM_DISPLAY_NAME != '' ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME;
       let mcatId=this.props.data.BRD_MCAT_ID && this.props.data.BRD_MCAT_ID != '' ? this.props.data.BRD_MCAT_ID :'';

        return (
            <div id="new-inline-pbr" class="bgef tc m10 extendedSctn promptHandlingClass">
            <div class="bgw bxsdw crb pdt15 pdb15 por mnht99 extBG">
            <div className={`${prodImg && prodImg.includes(".png") ? "" : "bgimg"}`}>
                        <img style="width: 60px; height: 60px" src={prodImg} loading="lazy" alt={this.decodeEntityCode(this.props.data.PC_ITEM_NAME)} />
            </div>
                <div class="pdb10 extPd10"><p class="fs18 mxht1000 fw "><span class="fw"><span class="LABEL7_1">{this.props.translatedTxt.LABEL7_1}</span></span>
                    {' ' + this.decodeEntityCode(this.props.data.PC_ITEM_NAME)} <span class="LABEL7_2">{this.props.translatedTxt.LABEL7_2}</span>?</p>
                    <p class="clr7B fs13 lh23">
                        <span class="clr33 fs16 pdt5 dib"><span class="BL_LABEL13">{this.props.translatedTxt.BL_LABEL13}</span>
                        </span>
                    </p></div>

                <input type="hidden" name="i_am_interested" value="1"></input>
                <span style="margin: 0 auto;" className="fillbtn w80 db bgmim clrw pd10 bdrmim bxrd4 bxsdw fs15 mb10 mt10 w80 LABEL28 bxrd20" onClick={(e) => {
                    eventTracking('Product-Page-Clicks', 'Extended-PDP-Clicks','Extended-PBR-Clicks|BuyleadCTA|PDP|'+checkUserMode()+"|"+this.props.extendedId);
                    this.callBL(prodDsplName, prodImg, mcatId)
                }}>{this.props.translatedTxt.LABEL28}</span>

            </div>
        </div>

        );
    }
}