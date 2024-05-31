import React from 'react';

const Breadcrumb = React.memo((props)=>{
    return (
        <div className="por fs13 clrBl mt10 bgw" style="white-space:nowrap; overflow-y:hidden">
            <span className='db pdb5 pdt5 pdl5 wsnw oAuto bredcrm'>
                {
                    props.links.map((link, index)=>(
                        <span>
                            {index===0 ? (<i class="ico-nav homeIco mr3 fl" style="background-image: url(&quot;https://m.imimg.com/gifs/img/mcat_sprite_v5.png&quot;); width: 20px; height: 17px; background-size: 63px; background-position: 2px -11px; margin-top: -1px;"></i>) : ''}
                            {(props.links.length-1 > index) ?  (<a href={link.url+((window.location && window.location.href && window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?"?utm_source=Adwords":"")} className='clrBl'>{link.display}</a>) : (<span className="clr7B">{link.display}</span>)}
                            {(props.links.length-1 > index) ? (<span> &#x0203A; </span>) : ''}
                        </span>
                    ))
                }
            </span>
        </div>
    )
})

export default Breadcrumb;