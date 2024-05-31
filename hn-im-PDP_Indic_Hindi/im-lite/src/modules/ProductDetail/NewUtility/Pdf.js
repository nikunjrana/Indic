import React, { Component } from 'react';

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state={pdfviewer:"",Loader:''};
        this.close=this.close.bind(this);
    }
    close(){
        this.setState({pdfviewer:''});
        history.state=="pdf"?history.back():'';
        document.body.classList.remove("oh");
    }
    componentDidUpdate(){
    }

    render() {
        return (
            <>
        {this.state.pdfviewer?<div className='ht100 pof t0 z1000 w100 l0 os bgw'><this.state.pdfviewer data={this.props.data} close={this.close} callProps={this.props.callProps} showModal={this.props.showModal} callNowClick={this.props.callNowClick}enqCtaDisabled={this.props.enqCtaDisabled} transformedNo={this.props.transformedNo}/>
</div>:this.state.Loader?<div className='ht100 pof pdt50 t0 z1000 w100 l0 os bgw'><div className='bgW t50p h100vh w100 tc'><i className='por t40p dib loader '></i><p className='por t40p'>Please wait Pdf is loading..</p></div></div>:<span id="Pdf" onClick={() => {this.setState({Loader:true});import(/*webpackChunkName:"Pdfviewer"*/'../utility/ProdDescription/Pdfviewer').then((module) => {
            this.setState({ pdfviewer: module.default });window.refUrl ? window.refUrl.push("somePopUp") : "";history.pushState("pdf",null);document.body.classList.add("oh");this.setState({Loader:false})
        })}} className="cl56  dflex fs15 lh22" target="_blank"><img className="vam" border="0" width="20" height="20" alt="download pdf" src="https://m.imimg.com/gifs/pdf.png"/><span className="dib vam pdl5 fcb">  View Now </span></span>}
            </>
        );
    }
}

export default Pdf;