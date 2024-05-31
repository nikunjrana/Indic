import React from 'react';
import { eventTracking, gaTrack } from '../../../../Globals/GaTracking';
import {pdfjs,Document,Page} from 'react-pdf'
import EnquiryCTA from '../../NewUtility/EnquiryCTA';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Pdfviewer extends React.Component {
  constructor(props) {
      super(props);
      this.state={numPages:null}
      this.onDocumentLoadSuccess=this.onDocumentLoadSuccess.bind(this)
  }

  componentDidMount(){
    window.addEventListener('popstate', this.props.close);
    let pathname=window.location.pathname.replace("/proddetail","/proddetail-Pdf")
    gaTrack.trackPageView(pathname)
  }
  onDocumentLoadSuccess({ numPages: nextNumPages }) {
    this.setState({numPages:nextNumPages});
  }
  render(){
    let isIphone= navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0;
    let file=this.props.data.DOC_PATH.replace("http:","https:");
  return (
    <div>
      <div className='t0 w100 ht50 z1000 bgmim pof'>
                    <i onClick={()=>this.props.close()} className="Wh32 dib bgNorepeat closeArrowSvg poa l0 t10 z1000"></i>
                   <i className='IMlogo z1000 tbSp l15 poa t10'></i> 
                   <button className='bgmim r0 poa'>
                   <EnquiryCTA type="Pdfenquiry" isEnquirySent={this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID} data={this.props.data} callProps={this.props.callProps} callNowClick={this.props.callNowClick} showModal={this.props.showModal} imgSrc={this.props.callProps?this.props.callProps.itemImage.replace(/^http:\/\//i, 'https://'):"https://m.imimg.com/gifs/background_image.jpg"} cat_ID={this.props.data.CAT_ID}
                    transformedNo = {this.props.transformedNo}/>
                   </button>
      </div>
        <Document file={file} className='pdt50'  onLoadSuccess={this.onDocumentLoadSuccess} width={window.innerWidth} loading={<div className='bgW t50p h100vh w100 tc'><i className='por t40p dib loader '></i><p className='por t40p'>Please wait Pdf is loading..</p></div>} >
          {Array.from(new Array(this.state.numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1}  width={window.innerWidth} loading={''}/>
          ))}
        </Document>
        <a href={file} download={file} target="_blank" ><i className='b25 bxsd bgNorepeat l20px wh40 fs18 pof DownloadIcon z1000'   ></i></a>
    </div>
      

  );
}
}