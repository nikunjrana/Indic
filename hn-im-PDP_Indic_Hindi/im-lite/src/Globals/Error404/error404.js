import React from 'react';
import './Error404.css';
import Footer from '../../../src/modules/App/components/Footer';
//import Header from '../../../src/modules/Header/HeaderContainer';
import RelatedProductsWidget from '../../modules/Widgets/RelatedProducts/RelatedProductsWidget';
import FeaturedCategoriesContainer from '../../modules/Widgets/Personalisation/FeaturedCategories/FeaturedCategoriesContainer';
import { getCookieValByKey } from '../CookieManager';

export default class Error404 extends React.Component {

    constructor(props) {
        super(props);
        document.getElementById("gblLoader") ? document.getElementById("gblLoader").style.display = "none" : '';
    }
    render() {
        let unidentified = getCookieValByKey("ImeshVisitor", "glid") ? false : true;
        if(window.isMcatLcp || window.isMcatLcpNew || window.isHomeLcp || document.getElementById("blLcpDiv") || document.getElementById("compLcpDiv") || document.getElementById("pdpLcpDiv") || document.getElementById("soiLcpDiv") || document.getElementById("SidPagesLCP") || document.getElementById("dirLcp") || document.getElementById("supplierLcp") || document.getElementById("lcpdiv") || document.getElementById("grpDirLcp") || document.getElementById("impcatLcpDiv")) {
            return ""
        }
        else{
        return (
            <div className="pd10">
            {/* <Header/> */}
            <div className="mb10 mptop-10"><div className="fl vam mt5"><p className="err_txt_1">Oops!</p><p className="err_txt_2 fs14 nf_txt">क्षमा करें, आप जिस पेज को खोज रहे हैं, वह अभी उपलब्ध नहीं है।<span className="sp_menu errSmiley" /></p></div><p className="crb" /></div>
            <img class="tc  vam mr10" src="https://m.imimg.com/gifs/notfound.png" alt="Not found" width="125" height="125" style="
    margin: 0 auto;
    /* text-align: center; */
    display: block;
"></img>
            <a href="https://hindi.indiamart.com" class="db fs15 clrBl bdrBlu bxrd4 pd6 mt10 lh18 bxsdw"><strong style="display: block; text-align:center">होम पेज पर जाएं |</strong></a>
            
          
            </div>

        );}
  }
}