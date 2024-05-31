import React from 'react';

function Gallery(props) {
    const galleryImg = props.scimg.slice(0, 4).map((idx, index) =>
        <div key={index} id={`gridImg${index}`} className="gridimg">
            <img alt={props.pgitemname} src={idx.image250x250 ? idx.image250x250 : ''} loading="lazy" />
        </div>
    );
    return (
        <div id='gallery'>
            <div>
                <div className="pd10 fw fs17 mxht1000 btmtop mt20 pdt20">प्रोडक्ट की फोटो गैलरी</div>
                <div className="gridcontainer promptHandlingclassName" id="sticky">
                    <>
                        {galleryImg}
                    </>
                </div>
            </div>
            {/* <div class="por fs13 clrBl mt10 bgw bxrd10"><span class="db pdb10 pdt15 pdl5 pr10 lh20 wsnw oa bxrd10"><a class="clrBl dib" href="https://m.indiamart.com/"><i class="ico-nav homeIco mr3 fl" ></i>HindiIndiaMART</a><span><span> &gt; </span><a class="clrBl" href=""><span>{props.gdata.brdGrpName}</span></a></span><span><span> &gt; </span><a class="clrBl" href=""><span>{props.gdata.brdGrpFlname}</span></a></span><span><span> &gt; </span><a class="clrBl" href=""><span>{props.gdata.brdMcatFlname}</span></a></span></span></div> */}
        </div>


    )
}

export default Gallery;