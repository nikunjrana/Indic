import React from 'react';

function PdpDetails(props) {
  // console.log(props, "Props.disp_name");
  return (
    <div class="compdetail">
      <section class="por z1">
        <div class="db pdt10 pl10 pdr10 bgw">
          <section class=" bgw db crx t_tc ">
            <h1 class="fw mxht1000 fs15 pdb5 wr">{props.disp_name != '' ? props.disp_name : props.itemname}</h1>
          </section>
          <div class="por">
            <div class="por dflex">
              <p id="Price" class="clrBl  tl fs16 pdr10 mxht1000 fw pdt5 pdb12  ">
                {props.price ? props.price : 'लेटेस्ट रेट पाएं'}
              </p>
            </div>
          </div>
          <p id="empty" class="crx1"></p>
        </div>
        <div class="mt0 pd10"><div id="newcta"><div>
          <a href={'tel:' + props.mobilePns}>
            <span id={`pdpcallnow${props.pcItemDisplayId}`} buttontype="Call|PNS|" data-compname="" data-contact="" class="bdrmim clrmim bxrdNR fl tc fs14 tst pdt12 pdb12  fw w49 bgw"><i id="callicn" buttontype="Call|PNS|" data-image="" data-compname="" data-contact="" class="mr5 dib vam bkgImgPstnRpt callIcnN "></i><span buttontype="Call|PNS|" data-image="" data-compname="" data-contact="" id="calltxt" class="">कॉल करें</span><span id="pns1" class="dn notranslate"></span></span>
          </a>

          <div class="tc"><a id="whatsappCTAdetails" class="bdrmim clrw bgmim   bdrmim fs14 fw pdb10 pdt12  fr bxrdNL w49" href={`https://api.whatsapp.com/send/?phone=+919696969696&text=नमस्ते ${props.company}, क्या मैं ${props.itemname} के लिए बेस्ट प्राइज पा सकता हूँ? ${props.pdp_url}&type=phone_number&app_absent=0`}><div class="whatsAppIcn dib vam mr5"><img src="https://m.imimg.com/gifs/img/whatsapp-icon.svg" class="poa whatsAppIcnpos" alt="WhatsApp Icon" /></div><span class="pdl5">WhatsApp करें</span></a></div>
        </div><p class="crx"></p></div></div>
      </section>

      <section id="Companyinfo" class="w100 mt3 por">
        <div class="bgw">
          <div>
            <p class="db fs15 clrb pd10 fw  ">कंपनी की जानकारी</p>
            <div class="db">
              <div>
                <div class="fs15">
                  <section class="w100">
                    <div class="pdl10 pdr10 pdt5 ">
                      <div class="por mt5 mb5">
                        <div class="poa ml10 mt53 dib"></div>
                        <div class="bdrC poa oh hw50 bxrd10">
                          <img
                            src={props.complogo}
                            alt={props.company}
                            class="mxhw imgCnt poa"
                          />
                        </div>
                        <div class="pdp">
                          <div>
                            <a
                              class="fs15 por vam fw di"
                            >
                              {props.company}
                            </a>
                          </div>
                          <div class="clr33 mt5 mb5 fs13 mlm2">
                            <i class="wh13 dib mr2 fl bgNorepeat locationSvg"></i>
                            {props.city},{props.glusrUsrState}

                          </div>
                          {
                            props.gstNo ?
                              <div class="fs13 mb5  mt5 clr33">
                                <i class="wh13 dib mr2 fl bgNorepeat gstIcon"></i>
                                {props.gstNo}
                              </div> : ''
                          }

                        </div>
                        <div id="companyCardCall">
                        <a href={'tel:' + props.mobilePns} aria-label="Companycall">
                        <span class="bdrmim  oh hw50  bxrd10  poa mr3  bgmim tp0 rt0">
                          <span class="mxhw imgCnt poa wCallIcon"></span>
                          <span id="pns1" class="dn notranslate">
                          </span>
                        </span>
                        </a>
                      </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  )
}
export default PdpDetails;
