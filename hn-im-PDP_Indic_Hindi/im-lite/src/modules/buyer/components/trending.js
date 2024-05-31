import React, { Component } from 'react';
import {getCookieValByKey, deleteCookie} from '../../../Globals/CookieManager';
import {eventTracking} from '../../../Globals/GaTracking';
import LazyLoad from 'react-lazy-load';
import '../../home/css/AppBlForm.css';
import { Link } from 'react-router';

class Trending extends Component {
    constructor(props) {
        super(props);
        this.state={
            enqBlComp:'',
            show:false,   
        }
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.callBl = this.callBl.bind(this);
        this.UniqueRandomNumbersWithinRange = this.UniqueRandomNumbersWithinRange.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.range = this.range.bind(this);
        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.showModal=this.showModal.bind(this);
        this.prop={};
        // this.lastgadigit=''
        deleteCookie('random');
    }
    // componentDidMount(){
    //     window.addEventListener("touchstart",this.loadEnquiryContainer);
    // }
    componentWillMount(){
        // let gaid=getCookie("_ga")?getCookie('_ga'):'';
        // this.lastgadigit= gaid[gaid.length-1]?(gaid[gaid.length-1])%2:'';
        this.loadEnquiryContainer();
    }

    loadEnquiryContainer(){
        // if(!this.state.enqBlComp){
        //     import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module)=>{
        //         this.setState({enqBlComp:module.default});
        //         // window.removeEventListener("touchstart",this.loadEnquiryContainer);
        //     });
        // }
        // window.removeEventListener("touchstart",this.loadEnquiryContainer);
    }
    showModal(prop){
        this.prop=prop;
        this.setState({show:!this.state.show});
      }
    
    callBl(name, imgurl) {
        let obj = {};
        obj.productName = name;
        obj.R_custtype_weight = "";
        obj.affiliationId  = '-43';
        obj.query = '';
        obj.queryText = 'home-page|PWA';
        obj.modid = 'IMOB';
        obj.enqconv = 'on';
        obj.int_rec = '1';
        obj.productImage=imgurl;
        obj.ctaName='कोटेशन प्राप्त करें';
        obj.EnqBlForm=this.state.show;
        obj.isEnquiry=false;
        obj.page='home';

        this.showModal(obj);
        }

        UniqueRandomNumbersWithinRange(min, max, quantity) {
            let numbers = this.range(min, max);
                this.shuffle(numbers);
                return numbers.slice(0, quantity);
            }
        shuffle(arra1) {
                var ctr = arra1.length, temp, index;
                while (ctr > 0) {
                    index = Math.floor(Math.random() * ctr);
                    ctr--;
                    temp = arra1[ctr];
                    arra1[ctr] = arra1[index];
                    arra1[index] = temp;
                }
                return arra1;
            }
        range(start, edge, step) {
                if (arguments.length == 1) {
                    edge = start;
                    start = 0;
                }
                edge = edge || 0;
                step = step || 1;
                for (var ret = []; (edge - start) * step > 0; start += step) {
                    ret.push(start);
                }
                return ret;
            }

    render() {
        var listitems = '';
        var userButtons = {
            
            trending_data: [
                {
                    GLCAT_MCAT_NAME: "Auto Rickshaw",
                    MCAT_URL: "https://m.indiamart.com/impcat/auto-rickshaw.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://4.imimg.com/data4/BY/KH/GLADMIN-179837/auto-rickshaw-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "Floor Tiles",
                    MCAT_URL: "https://m.indiamart.com/impcat/floor-tiles.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://3.imimg.com/data3/LY/VY/MY-2/floor-tiles-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "UltraTech Cement",
                    MCAT_URL: "https://m.indiamart.com/impcat/ultratech-cement.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://4.imimg.com/data4/FA/EJ/GLADMIN-181717/ultratech-cement-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "TMT Bars",
                    MCAT_URL: "https://m.indiamart.com/impcat/tmt-bars.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://3.imimg.com/data3/KS/JQ/GLADMIN-2475/tmt-bars-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "Rice Cutting Machine",
                    MCAT_URL: "https://m.indiamart.com/impcat/rice-cutting-machine.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://4.imimg.com/data4/BP/VY/GLADMIN-180396/rice-cutting-machine-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "POP False Ceiling",
                    MCAT_URL: "https://m.indiamart.com/impcat/pop-false-ceiling.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://3.imimg.com/data3/VM/WL/GLADMIN-170652/pop-false-ceiling-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "Steel Almirah",
                    MCAT_URL: "https://m.indiamart.com/impcat/steel-almirah.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://3.imimg.com/data3/TD/NP/GLADMIN-123996/steel-almirah-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "Footwear Machinery",
                    MCAT_URL: "https://m.indiamart.com/impcat/footwear-machinery.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://3.imimg.com/data3/LC/XC/MY-2/footwear-machinery-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "Sewing Machines",
                    MCAT_URL: "https://m.indiamart.com/impcat/sewing-machines.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://3.imimg.com/data3/DT/GU/GLADMIN-2127/sewing-machines-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "JCB Machine",
                    MCAT_URL: "https://m.indiamart.com/impcat/jcb-machine.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://5.imimg.com/data5/XH/YP/GLADMIN-2/jcb-machine-125x125.jpg"
                },
                {
                    GLCAT_MCAT_NAME: "Submersible Pump",
                    MCAT_URL: "https://m.indiamart.com/impcat/submersible-pumps.html",
                    MCAT_TYPE: "DEFAULT_MCAT",
                    image: "https://5.imimg.com/data5/SU/UA/GLADMIN-2/submersible-pump-125x125.jpg"
                }
            ]
        };
        var recommended2 = [];
        var c = document.cookie; var imeshArr = '';
        if (-1 == c.indexOf('random')) {
            var cookie_string = '';
            var uniquenmb = this.UniqueRandomNumbersWithinRange(1, 11, 8);
            for (var key in uniquenmb) {
                cookie_string += key + '=' + uniquenmb[key] + '|';
            }
            cookie_string = cookie_string.substr(0, cookie_string.length-1);
            var date = new Date();
            date.setTime(date.getTime()+(2*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
            document.cookie = "random="+cookie_string+expires+";path=/";

            for (let i = 0; i < 8; i++) {
                let j = uniquenmb[i];
                recommended2[i] = userButtons['trending_data'][j];
            }
        } else {
            let sArr = c.split(';');
            for (var k = 0; k < sArr.length; k++) {
                var temp = sArr[k];
                if (temp.replace(/^\s+|\s+$/g, "").split("=")[0] == 'random') {
                    temp = decodeURIComponent(temp);
                    imeshArr = temp.trim().substring(7);
                    break;
                }
            }
            imeshArr.split('|').map((imeshObj) => {
                let imeshKey = imeshObj.split("=");
                let j = imeshKey[1];
                recommended2[imeshKey[0]] = userButtons['trending_data'][j];
            });
        }
        listitems = recommended2.map((items, index) => {
            const url = items.MCAT_URL;
            const imgurl = items.image;
            let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
           return (<li className={this.props.istrend?"w172 pdl10 fl":"w50 fl"} key={index}>
                <div className={ this.props.istrend?"pd10 bxdw2 brd5 bdr bgw mr10 mb10":"pd10 bxdw2 brd5 bgw mr10 mb10"}>
                    <div className="ht125px dib oh">
                       {((SSR && (SSR["userViewCount"] == 5)) || this.glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (this.glid==undefined))) ? <Link className="dtc vam ht125px" to={url} onClick={() => { (window.pageName && window.pageName == 'home' ? eventTracking('Home-Page-Clicks-PWA', 'Trending-Categories', 'Product-Image-' + (index + 1) + '|PrevPageName-Direct|NextPageName-MCAT', true) : eventTracking(this.props.page + '-Page-Clicks-PWA', 'Trending_Img', 'MCAT-Image-' + (index + 1), true)) }}>
                           <LazyLoad throttle={10} offsetVertical={400}>
                               <img className="favImg lazy" alt={items.GLCAT_MCAT_NAME} src={imgurl} ></img>
                           </LazyLoad>
                       </Link> :
                           <a className="dtc vam ht125px" href={url} onClick={(event) => { window.location.href=(url); (window.pageName && window.pageName == 'home' ? eventTracking('Home-Page-Clicks-PWA', 'Trending-Categories', 'Product-Image-' + (index + 1) + '|PrevPageName-Direct|NextPageName-MCAT', true) : eventTracking(this.props.page + '-Page-Clicks-PWA', 'Trending_Img', 'MCAT-Image-' + (index + 1), true)); event.preventDefault() }}>
                               <LazyLoad throttle={10} offsetVertical={400}>
                                   <img className="favImg lazy" alt={items.GLCAT_MCAT_NAME} src={imgurl} ></img>
                               </LazyLoad>
                           </a>}


                    </div>

                   {((SSR && (SSR["userViewCount"] == 5)) || this.glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (this.glid==undefined))) ? <Link to={url} onClick={() => { (window.pageName && window.pageName == 'home' ? eventTracking('Home-Page-Clicks-PWA', 'Trending-Categories', 'Product-Name-' + (index + 1) + '|PrevPageName-Direct|NextPageName-MCAT', true) : eventTracking(this.props.page + '-Page-Clicks-PWA', 'Trending_Prdname', 'MCAT-Name-' + (index + 1), true)) }}><h2 className={this.props.istrend?"clrb db fs15 pdl24 pdt10 mb10 txtElip fwn":"clrb db fs15 pdt10 mb10 txtElip fwn" }>{items.GLCAT_MCAT_NAME}</h2></Link>
                       : <a href={url} onClick={(event) => {window.location.href=(url); (window.pageName && window.pageName == 'home' ? eventTracking('Home-Page-Clicks-PWA', 'Trending-Categories', 'Product-Name-' + (index + 1) + '|PrevPageName-Direct|NextPageName-MCAT', true) : eventTracking(this.props.page + '-Page-Clicks-PWA', 'Trending_Prdname', 'MCAT-Name-' + (index + 1), true)); event.preventDefault() }}><h2 className={this.props.istrend?"clrb db fs15 pdl24 pdt10 mb10 txtElip fwn":"clrb db fs15 pdt10 mb10 txtElip fwn" } >{items.GLCAT_MCAT_NAME}</h2></a>}
                    
                    <a className={window.pageName.toLowerCase().includes('home')?this.props.istrend?"flex aljc tc bxsdw clrw pdbl102 fs14 wd128 bxrd20 applikectahome fw whwp ":'dib bxsdw clrw pdtb105 fs14 w70 bxrd20 applikectahome fw':"dib bxsdw clrw pdtb105 fs14 w70 bxrd20 compCl fw"} onClick={() => { this.callBl(items.GLCAT_MCAT_NAME,imgurl); (window.pageName&&window.pageName=='home'?eventTracking('Home-Page-Clicks-PWA','Trending-Categories','Get-Quotes-'+(index+1)+'|PrevPageName-Direct|NextPageName-BuyLead|BuyLeadCTA|Homepage|Unidentified',true): eventTracking(this.props.page+'-Page-Clicks-PWA', 'Trending_BL', 'BL_' + (index+1), true)) }} >कोटेशन प्राप्त करें</a>
                    
                </div>
            </li>)
        });
        return (<div id="trendingCategories">
            {this.state.show && this.state.enqBlComp!=''?<this.state.enqBlComp closePopup={this.showModal} prop={this.prop}/>:''}
            {this.props.istrend? <div  className="mnH240 bgw ">
            <p className="fs18 clrb pdt10 fw mb10 pdl10">Trending Categories</p>
            <ul className="relatedMoreCat df">{listitems}</ul>
                </div>:<ul>
                <section id="captioned-gallery" className="pdb10 mt10 pl10">
                <div><span className="fs18 fw db clrb pdb10 pdt10" >Trending Categories</span></div>
                    <div className="crx tc">
                        {listitems}
                    </div>
                </section>
            </ul>}  </div>)
    }
    
    }

        export default Trending;

