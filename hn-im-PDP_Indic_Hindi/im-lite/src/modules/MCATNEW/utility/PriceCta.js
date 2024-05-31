import React, { PureComponent } from 'react';
import { eventTracking } from '../../../Globals/GaTracking';
import {enqform,checkEnquirySent} from '../utility/helpercta';

class PriceCta extends PureComponent {
    constructor(props) {
        super(props);
        this.eventLabel = `Pg-${this.props.listNumber}-${this.props.productIndex}|Display:${this.props.product.dispId}`
        this.priceCta = "लेटेस्ट रेट पाएं",
        this.checkEnquiryStatus = this.checkEnquiryStatus.bind(this);
        this.state = {enqsent:false};

    }
    checkEnquiryStatus() {
        this.setState({enqsent:checkEnquirySent(this.props.product.dispId)});
    }
    componentDidMount(){
        document.addEventListener("enquirySent",this.checkEnquiryStatus);
    }
    componentDidUpdate(){
        this.checkEnquiryStatus();
    }
    
    render() {
        let enqLabel = `|EnquiryCTA|IMPCAT|${this.props.usermode}`
        let ecom_cart_url = this.props.product && this.props.product.ecom_cart_url  ? this.props.product.ecom_cart_url : this.props.product.ecom_landing_url ? this.props.product.ecom_landing_url : '';
        return (
        <div id="PriceClient">
        {this.props.product.standardprice ? <span className="clr33 fs16 fw dib por pdt4 pdb4">{this.props.product.standardprice}</span> 
            : this.state.enqsent ? <span className="c77 fs14 fw dib">Price Requested</span>
             : (ecom_cart_url) ? "" : <span className="clrBl fs14 fw dib por pd6_0" onClick={()=>requestAnimationFrame(()=>setTimeout(()=>{
              eventTracking(this.props.tracking.click,`Price-On-Request${enqLabel}`,this.eventLabel,1);
              enqform(this.props.product,this.props.mcatId,this.props.catId, this.props.mcatName, this.props.tracking, this.props.isqTracking, this.props.lastgadigit, this.props.productIndex, this.props.utmText,this.props.showModal, this.priceCta)
            },0))}>लेटेस्ट रेट पाएं</span>}
        </div>  );
    }
}

export default PriceCta;