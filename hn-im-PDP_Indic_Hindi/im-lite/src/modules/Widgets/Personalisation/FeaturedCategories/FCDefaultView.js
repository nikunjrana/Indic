import React from "react";
import { Link } from "react-router";
import { eventTracking ,prevname} from '../../../../Globals/GaTracking';
import { goToRoute } from "../../../../Globals/routingFunction";
import { getCookie , getCookieValByKey } from "../../../../Globals/CookieManager";
import { checkUserMode,checkUserStatus } from "../../../../Globals/MainFunctions";
const loginModes = {
    0: "Unidentified",
    1: "Identified",
    2: "Full-Login",
    3: "Unidentified-Existing",
  };
export const FCDefaultView = (props) => {
    let listitems;
    // let abctatrack=props.applikectahome?'|ABCTA_'+props.page:''
    let ga = getCookie('_ga');
    let gaLastDigit = true;
    let page =props.page&&props.page=='product-detail'?'PDP':props.page=='Impcat'?"IMPCAT":props.page;
    let page1=props && props.page?props.page=='product-detail'?'PDP':props.page.toLowerCase().includes("impcat")?"Mcat":props.page.toLowerCase().includes("mini pdp")?"Mini-PDP":props.page:"";
    let cABTest = '';
    let isABtst = '';
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    let glLastDigit= glid && glid[glid.length-1]?glid[glid.length-1]:'';
    if(gaLastDigit){
        isABtst = 1;
        cABTest = '';
    }
    else{
        isABtst = 0;
    }

    listitems = props.data.map((items, index) => { 
        index++;
        let prodPosition = props.appendProdPosition ? '|pos_'+index : '';
                return (
                    <li className="w50  mnH265  bdrBA   ">
                <div className=" bgw mnH265 pd10" onClick={()=>{props&&props.page=='Search'?window.isSearchImpcat=true:'';}}>
    
                            {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link className="dt ht160px  w160px  ma" to={"/impcat/" + items.fl_name + ".html" } onClick={() => { props.page && props.page == 'Home'?eventTracking((props.isfallback?'w3_recently_viewed_mcat_fb':'w3_recently_viewed_mcat')+'|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdimg|Inspired Browsing', 'IMOB_' + props.page + prodPosition + '|Product-Image-' + index + "|" + prevname() + '|NextPageName=Mcat', true):eventTracking('w3_recently_viewed_mcat', props.trck_param + 'cta_click_prdimg', 'IMOB_' + props.page + prodPosition, true); setTimeout(function () { scrollTo(0, 0) }, 0) }} >
                                <span className="dtc ht160px  w160px  vam mt10">
                                    {props.page == 'product-detail'
                                        ? <div className={`${items && items.image250 && (items.image250.includes(".png") || items.image250.includes(".gif")) ? "ht160px w160px" : "bgimg ht160px w160px"}`}>
                                            <img  src={items.image250} loading="lazy" alt={items.name} className=" ht160px  w160px  vam  " /></div>
                                        : <img src={items.image250} alt={items.name} className=" ht160px  w160px  vam  "loading="lazy" />}
                                </span>
                            </Link>
                                : <a className="dt ht160px  w160px  ma" href={"/impcat/" + items.fl_name + ".html" } onClick={(event) => { window.location.href=("/impcat/" + items.fl_name + ".html"); props.page && props.page == 'Home'?eventTracking((props.isfallback?'w3_recently_viewed_mcat_fb':'w3_recently_viewed_mcat')+'|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdimg|Inspired Browsing', 'IMOB_' + props.page + prodPosition + '|Product-Image-' + index + "|" + prevname() + '|NextPageName=Mcat', true):eventTracking('w3_recently_viewed_mcat', props.trck_param + 'cta_click_prdimg', 'IMOB_' + props.page + prodPosition, true); event.preventDefault() }} >
                                    <span className="dtc ht160px  w160px  vam">
                                        {props.page == 'product-detail'
                                            ? <div className={`${items && items.image250 && (items.image250.includes(".png") || items.image250.includes(".gif")) ? "ht160px w160px" : "bgimg ht160px w160px"}`}>
                                                <img src={items.image250} loading="lazy" alt={items.name} className="ht160px  w160px  w160px  " /></div>
                                            : <img src={items.image250} alt={items.name} className=" ht160px  w160px  vam  "loading="lazy" />}
                                    </span>
                                </a>
                            }
                            {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link className="db clrb mb5 pdl10 pdr10" onClick={() => {props.page && props.page == 'Home'?eventTracking('w3_recently_viewed_mcat', props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page + prodPosition, true): eventTracking('w3_recently_viewed_mcat', props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page + prodPosition, true); setTimeout(function () { scrollTo(0, 0) }, 0) }} to={"/impcat/" + items.fl_name + ".html"}>
                                <span className="lineClamp htmn35 oh tc fs15 mt15">{items.name}</span>
                            </Link> : <a className="db clrb mb5 pdl10 pdr10" onClick={(event) => { window.location.href=("/impcat/" + items.fl_name + ".html"); props.page && props.page == 'Home'?eventTracking((props.isfallback?'w3_recently_viewed_mcat_fb':'w3_recently_viewed_mcat')+'|Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdname|Inspired Browsing', 'IMOB_' + props.page + prodPosition + '|Product-Name-' + index + "|" + prevname() + '|NextPageName=Mcat', true):eventTracking('w3_recently_viewed_mcat', props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page + prodPosition, true); event.preventDefault(); }} href={"/impcat/" + items.fl_name + ".html"}>
                                <span className="lineClamp htmn35 oh tc fs15 mt15">{items.name}</span>
                            </a>}
                    <div className={`${isABtst?'':'compCl '}bxrd20 dib bxsdw clrw pdtb105 mb2 bgmim fs15 w88 fw`} onClick={() => {(eventTracking("BLCTA/"+loginModes[checkUserStatus()],page1+"/"+"Featured Categories/","",true)),
                        requestAnimationFrame(()=>setTimeout(()=>props.callBl(items.name, items.mcatid, items.image),0)); props.page && props.page == 'Home'?eventTracking((props.isfallback?'w3_recently_viewed_mcat_fb':'w3_recently_viewed_mcat')+'|Home-Page-Clicks-PWA', props.trck_param + 'cta_button_getquotes|Inspired Browsing', 'IMOB_' + props.page+prodPosition+'|Get-Quotes-'+index+"|"+prevname()+'|NextPageName-BuyLead|BuyLeadCTA|Homepage|'+checkUserMode(), true):eventTracking('w3_recently_viewed_mcat', props.trck_param + `cta_button_getquotes${props.page=="Impcat" && glLastDigit%2==0 ? "|Even":glLastDigit%2!=0?"|Odd":''}` + cABTest, 'IMOB_' + props.page+'|BuyLeadCTA|'+page+'|'+checkUserMode()+prodPosition+`${props.srchAbTest?props.srchAbTest:''}`, true);
                    }}>
                        {props.enqLabel}
                    </div>
                </div>
            </li> 
        )
    }) 

    return (
        <div id="relatedMcats" className={ props.page && props.page=='Home'? (props.isfallback?'oh mt10 mb10 bgw pdl5 pdr5  ':"oh  mb10  ") : "oh mt2 mb10 bgw"} >
            <p id="relatedMcatsTitle" className={ props.page && props.page=='Home'?( props.isfallback?'fs17 clrb pdt10 fw mb10 pdl10':"fs17 fw clr11 pdt15 pdb15 pdl15 por bdrBR    ") : "fs17 mt10 fw clrb pdt10 pdb10 mxht1000 pdl10"} >{ props.page && props.page=='Home' ? (props.isfallback?'Related Categories':'Inspired by Your Browsing'):'आपके लिए कैटेगरीज'}</p>
            <ul  className={props.isfallback?'relatedMoreCat tc df':"tc flx flwr "}>
                {listitems}
            </ul>
        </div>
    )
}
