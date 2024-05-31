import React from 'react';

class ProductISQs extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
        <>
         {this.props.ProductISQs.map((isq, index)=>{
            return ( index <4 ? <p id={`ISQ_${index}`} className="pd1_0 clr5e fwn fs13 lineClamp2" onClick={()=>{this.props.eventTracking(this.props.tracking.click,"Product-Listing-Clicks-Product-ISQ",this.props.eventLabel,1)}}>
               <a href={`/${this.props.url}`} className="clr5e"><b>{isq.MASTER_DESC}</b>: {isq.OPTIONS_DESC}</a>
            </p> : "")
        })}
        </>
    )}
}

export default ProductISQs;