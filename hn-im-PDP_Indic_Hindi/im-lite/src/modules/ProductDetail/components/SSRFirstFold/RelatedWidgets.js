import React from 'react';

function RelatedWidgets(props) {

  const popularSeller = props.sellerdata.map((idx,index) =>

    <div class="por bgw mb16 crx pd10 w100" id="259512775">
      <div class="tl w100 por crb">
        <div class="fl tc ht150px w150p oh">
          <a
            class="dtc ht150px w150p vam" href={idx.pdpUrl}
          >
            <div class="tc">
              <div class="bgimg">
                <img
                  class="lazy2 objctFitSclDown mnW150"
                  loading="lazy"
                  src={idx.image250x250}
                  alt={idx.itemName}
                  width="150"
                  height="150"
                />
              </div>
            </div>
          </a>
        </div>
        <div class="pdl155 crx">
          <div class="db mnht99 tl pdl5">
            <p class="fs17 por pTitle oh lh18 mr20">
              <a
                class="wr pTitle lineclamp2 dib lh20"
                href={idx.pdpUrl}
              >
                {idx.pcItemDisplayName != '' ? idx.pcItemDisplayName : idx.itemName}
              </a>
            </p>
            <p class="pdt5 pdb5 fs16 fw notranslate">
              <a
                class="clr33"
              >
                {idx.price}
              </a>
            </p>
            <div>
              <p class="por oh fs14 pdt5 pdb5">
                <a
                  class="clr33 fls14 elipsis dib notranslate"
                >
                  {idx.companyname}
                </a>
              </p>
              <p class="por oh fs14 pdb5">
                <span class="clr5a ellipsis fl">
                  <i class="fl mml5 locationIcn"></i>{idx.cityName}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="por w100 btm0 tc mt10 dib">
        <div id="newcta">
          <div>
            <a href={'tel:'+idx.contactNumber}>
              <span
              // id="pdpcallnow"
              buttontype="CallBtn"
              data-image={idx.image250x250}
              data-compname={idx.companyname}
              data-contact={idx.mobileNumber}
              class="bdrmim clrmim bxrdNR fl tc fs14 tst pdt12 pdb12  fw w49 bgw"
            >
              <i
                // id="callicn"
                buttontype="CallBtn"
                data-image=""
                data-compname={idx.companyname}
                data-contact={idx.mobileNumber}
                class="mr5 dib vam bkgImgPstnRpt callIcnN "
              ></i>
              <span
                buttontype="CallBtn"
                data-image={idx.image250x250}
                data-compname={idx.companyname}
                data-contact={idx.mobileNumber}
                // id="calltxt"
                class=""
              >
                कॉल करें
              </span>
              <span id="pns1" class="dn notranslate">
                {idx.mobileNumber}
              </span>
            </span>
            </a>
        <div class="tc"><a id={"whatsappCTA"+index} class="bdrmim clrw bgmim   bdrmim fs14 fw pdb10 pdt12  fr bxrdNL w49"  href={`https://api.whatsapp.com/send/?phone=+919696969696&text=नमस्ते ${idx.companyname}, क्या मैं ${idx.itemName} के लिए बेस्ट प्राइज पा सकता हूँ? ${idx.pdpUrl}&type=phone_number&app_absent=0`}><div class="whatsAppIcn dib vam mr5"><img src="https://m.imimg.com/gifs/img/whatsapp-icon.svg" class="poa whatsAppIcnpos" alt="WhatsApp Icon"  /></div><span class="pdl5">WhatsApp करें</span></a></div>
          </div>
          <p class="crx"></p>
        </div>
      </div>
    </div>

  )
  const similarProducts = props.expdata.map((indx,index) =>
    <li class="w50 bdrBA">
      <div class="bgw  pd10">
        <a class="db" href={"https://hindi.indiamart.com/impcat/" + indx.glcatMcatFlname +".html"}>
          <div class="hw115  flx jstyfyCenter algnCenter ma oh vam bgimg">
            <img class="mxhw115 objctFitSclDown" src={indx.glcatMcatImg1500x500} alt="Long Grain Rice" width="115" height="115" loading="lazy" />
          </div>
        </a>
        <a class="db clrb pdl5 pdr5 mt10 wr ht20 truncate lh20" href={"https://hindi.indiamart.com/impcat/" + indx.glcatMcatFlname +".html"}>{indx.glcatMcatName}</a>
        <a class="db">
          <span class="db fs13 clr33 pdt5 pdb10 t_tc">
            <i class="locationIcn mrr3 dib"></i>
            {indx.glCityName}
          </span>
        </a>
          <a class="dib clrw bgmim fs15 fw bxrd20 w100 pd810" id={"Get_Quotes"+index} buttontype="enquiry|Get Quotes|Get_Quotes0" data-image="" data-name="Long Grain Rice" data-display-id="13293682091"
          href={`https://api.whatsapp.com/send/?phone=+919696969696&text=नमस्ते, क्या मैं ${indx.glcatMcatName} के लिए बेस्ट प्राइज पा सकता हूँ? ${props.pdp_url}&type=phone_number&app_absent=0`}><div class="whatsAppIcn dib vam mr5"><img src="https://m.imimg.com/gifs/img/whatsapp-icon.svg" class="poa whatsAppIcnpos" alt="WhatsApp Icon"/></div><span class="pdl5">WhatsApp करें</span>
        </a>
      </div>
    </li>
  )
  return (

    <div id="relatedWidgets">
     {props.expdata.length>0? <div id="relatedWidgets">
        <section id="SlrNearMe" class="w100">
          <p class="fs17 bgw fw pdt5 mxht1000">
            <span class="pd5 pdl10 pdt10 db t_tc">
            कैटेगरीज़ देखें
            </span>
          </p>
          <div class="bgw oh">
            <div>
              <ul id="listUL" class=" flx flxwrp tc">
                {similarProducts ? <>
                  {similarProducts}
                </> : ''}
              </ul>
            </div>
          </div>
        </section>
      </div>:''}
      {props.sellerdata.length>0?<div id="recentMcat" class="rlprod bgw btmtop db oh">
        <div class=" pdb5">
          <div class="fs18">
            <p
              class="db pdt10 ml10 mr10 mxht1000 clrb fs17 fw mt5 t_tc"
              id="pdpRelatedWidget"
            >
              <span class="ttc"> प्रोडक्ट के पॉपुलर सेलर्स देखें</span>
            </p>
            <ul class="filtr cityFilterRecomMcat scrbrH"></ul>
          </div>
        </div>
        
         <div class="popseller"> {popularSeller}</div>
       
        <div>
        </div>
      </div>:''}



      {/* <div><a class="df algnCenter clr33 pdt15 pdlr15 pdb15 fs16 m10 bxrd20 fw bdrmim mb16 mxht1000" href=""><span class="dib w87 vat">{props.pgitemname} में सभी उत्पाद देखें <span class="fr">&gt;</span></span></a></div> */}



    </div>


  )

}
export default RelatedWidgets;