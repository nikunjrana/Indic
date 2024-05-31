import React, { Component } from 'react';
// import { Link } from 'react-router';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
// import './messenger.css'
import { eventTracking } from '../../../../Globals/GaTracking';
import { CallToConnect } from "../CallToConnect"
import { getMobileNum } from '../../utility/helper';
class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      Error:'',
      CustomMsg:'',
    };
    this.mobNum = getMobileNum(this.props.data);
    this.PleaseProvideOffers=this.PleaseProvideOffers.bind(this);
    this.Canigetsample=this.Canigetsample.bind(this);
  }
  componentDidUpdate(){
  }
  PleaseProvideOffers(){
    return(
      <button className='algnCenter custbtn bgw bdrmim bxrd20 fw dflex flex1 jstyfyCenter w50' onClick={()=>{this.handleButtonClick('Hey Please Provide us with some latest offers !!')}}><p>Please Provide Offers!!</p></button>
    )

  }
  Canigetsample(){
    return(
      <button className='algnCenter custbtn bgw bdrmim bxrd20 fw dflex flex1 jstyfyCenter w50' onClick={()=>{this.handleButtonClick(this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Can you please book this service for me?":'Can i get some samples of this?' )}}><p>{this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Book This Service":"Can I Get Samples?"}</p></button>
    )

  }
  handleInputChange = (event) => {
    this.setState({CustomMsg:event.target.value});
    this.setState({Error:""})
  }
  handleButtonClick = (text) => {
    this.setState({ message: text });
  }

  handleSend = () => {
    let servTrack=this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"|Services":"";
    let sendTrack=this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?"|Send_After_Enquiry":"|SendIcon";
    if(!this.state.message&&!this.state.CustomMsg&&this.props.enqCtaDisabled!=this.props.data.PC_ITEM_DISPLAY_ID){
      this.setState({message:this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Is it availble in my location?":"Hi, I need more details on this Product."})
      let eventLabel=this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Location_Availability|":"Need_More_Details";
      eventTracking('Product-Page-Clicks',"Message_Widget|PDP",eventLabel+servTrack+sendTrack+"|EnquiryCTA|PDP"+"|"+`${this.props.pageLang}`+`${this.props.track}`, true)
    }
    if(!this.state.CustomMsg&&this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID){
      this.setState({Error:"* Please fill your message"})
    }
    if(this.state.message&&this.props.enqCtaDisabled!==this.props.data.PC_ITEM_DISPLAY_ID){
      eventTracking('Product-Page-Clicks',"Message_Widget|PDP",servTrack+sendTrack+"|EnquiryCTA|PDP"+"|"+`${this.props.pageLang}`+`${this.props.track}`, true)
    }
    if(this.state.message&&this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID){
      eventTracking('Product-Page-Clicks',"Message_Widget|PDP",servTrack+sendTrack+"|EnquiryCTA|PDP"+"|"+`${this.props.pageLang}`+`${this.props.track}`, true)
    }

  }
componentWillUnmount(){
}

  render() {
    return (
      <div id='MessengerPDP' className={`message-widget tc mt10 ${this.props.IsSSR?"dn":""}`}>
        <div className='dflex  ma  mb10 algnCenter jcstart'>
        <i className='MessengerMsgicon mr10 mt2 '></i>
        <p className='fs14 tl'>Send a message to <span className='fw'>{`${this.props.data.COMPANYNAME}`}</span></p>
        </div>
        <div className="jstyfyCenter algnCenter dflex ma mt10 por ">
          <input id="Inpfeild" className='MsgInp fs14'
            type="text"
            value={this.state.CustomMsg}
            onChange={this.handleInputChange}
            placeholder={this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?"Type your message...":`${this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Is it available in my location?":"Need More Product Details"}`}
          />
          {this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID&&!this.state.CustomMsg?<div class="algnCenter dflex poa r0 w50p ht40p"><button id='DummySend' className="send-button jstyfyCenter poa r0 algnCenter dflex bgmim mr5 wh35" onClick={this.handleSend}>
            <i className="sendIcon ml4"></i> 
          </button></div>:
          
          this.props.linkTag?<this.props.linkTag className="dflex algnCenter" id={"link"} name="FirstFoldEnq" to={{
                pathname: '/messages/conversation/?sup_glid=' + btoa(this.props.data.GLUSR_USR_ID) + '&ref=' +`${this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?"OneTapEnqSent": "OneTapPDP"}`, state: {
                    contactglid: this.props.data.GLUSR_USR_ID,
                    pdpUrl: location.pathname,
                    data: this.props.data, pageLang:this.props.pageLang, queryRef:`${this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?"PDP_Messenge_Widget|Send_After_Enquiry":"PDP_Messenger_Widget|"+`${this.state.message&&this.props.data?this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Location_Availability":"Need_More_Details":""}`}`+`${this.props.track}`,
                    pageName: this.props.pageName, isExtended:false, cta_name: '', btnName: '', A2HS: false,
                    qDesc:this.state.message,
                    CustomqDesc:this.state.CustomMsg,
                    companyName:this.props.data.COMPANYNAME,
                    rcv_num: this.mobNum ? this.mobNum['num'] ? this.mobNum['num'] : '' : ''
                }
            }}
                onClick={() => {
                    let sellerIntent = (localStorage.getItem("sellerIntent")) ? JSON.parse(localStorage.getItem("sellerIntent")) : "";
                    (sellerIntent && sellerIntent.Intent && checkUserStatus() == 2) ? eventTracking('Product-Page-Clicks', 'Get-Best-Price', "PAGE-SOI-Button", true) : "";
                }}>
              <div class="algnCenter dflex poa r0 ht40p w50p">
                <button id='SubmitMessenger' className="send-button jstyfyCenter poa r0 algnCenter dflex bgmim mr5 wh35" onClick={this.handleSend}>
                  <i className="sendIcon ml4"></i>
                </button>
              </div>
            </this.props.linkTag>:<button id='DummySend' className="send-button jstyfyCenter poa r0 algnCenter dflex bgmim mr5 wh35" onClick={this.handleSend}>
            <i className="sendIcon ml4"></i> 
          </button>
  }

        </div>
        {this.state.Error?<p className='ma ml20 mt10 tl  clrr'>{this.state.Error}</p>:''}
        {/* Dummy ui for SSR started */}
        {this.props.IsSSR?
        <><div id='PreEnqUi' className="mt10 dflex jcsb  ma cgap7px alignStretch">
          {this.PleaseProvideOffers()}{this.Canigetsample()}</div>
        <div id='PostEnqUI' className="dn algnCenter jcsb  pdl10 ma mt10"><span className="por mr10 w50 tl fs14 fw">You can also Connect with seller instantly</span><div className="por w50"><span className="algnCenter tl pd10 bgw bdrmim bxrd20 fs14 dflex jstyfyCenter clrmim fw"><i className="callIcnBig1 mr5"></i><p>Call to Connect</p></span></div></div></>
        :""} 
        {/* Dummy ui for SSR ended*/}
        {this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?<CallToConnect data={this.props.data} callNowClick={this.props.callNowClick} track={this.props.track}/>:this.props.linkTag?<div className="mt10 dflex jcsb  ma cgap7px alignStretch">
        {this.props.linkTag?<this.props.linkTag className="algnCenter  dflex  w50" id={"link"} name="FirstFoldEnq" to={{
                pathname: '/messages/conversation/?sup_glid=' + btoa(this.props.data.GLUSR_USR_ID) + '&ref=' + "OneTapPDP", state: {
                    contactglid: this.props.data.GLUSR_USR_ID,
                    pdpUrl: location.pathname,
                    data: this.props.data, pageLang:this.props.pageLang, queryRef: 'PDP_Messenge_Widget|Provide_Offers|',
                    pageName: this.props.pageName, isExtended:false, cta_name: '', btnName: '', A2HS: false,
                    qDesc:this.state.message
                }
            }}
                onClick={() => {
                    let sellerIntent = (localStorage.getItem("sellerIntent")) ? JSON.parse(localStorage.getItem("sellerIntent")) : "";
                    (sellerIntent && sellerIntent.Intent && checkUserStatus() == 2) ? eventTracking('Product-Page-Clicks', 'Get-Best-Price', "PAGE-SOI-Button", true) : "";
                    eventTracking('Product-Page-Clicks',"Message_Widget|PDP", "Provide_Offers|"+`${this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Services|":""}`+"EnquiryCTA|PDP"+"|"+`${this.props.pageLang}`+`${this.props.track}`, true)
                }}>
          {this.PleaseProvideOffers()}
          </this.props.linkTag>:""}
          {this.props.linkTag?<this.props.linkTag className="dflex algnCenter w50" id={"link"} name="FirstFoldEnq" to={{
                pathname: '/messages/conversation/?sup_glid=' + btoa(this.props.data.GLUSR_USR_ID) + '&ref=' + "OneTapPDP", state: {
                    contactglid: this.props.data.GLUSR_USR_ID,
                    pdpUrl: location.pathname,
                    data: this.props.data, pageLang:this.props.pageLang, queryRef: 'PDP_Messenge_Widget|'+`${this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Book_Service|":"Get_Sample|"}`,
                    pageName: this.props.pageName, isExtended:false, cta_name: '', btnName: '', A2HS: false,
                    qDesc:this.state.message
                }
            }}
                onClick={() => {
                  
                    let sellerIntent = (localStorage.getItem("sellerIntent")) ? JSON.parse(localStorage.getItem("sellerIntent")) : "";
                    (sellerIntent && sellerIntent.Intent && checkUserStatus() == 2) ? eventTracking('Product-Page-Clicks', 'Get-Best-Price', "PAGE-SOI-Button", true) : "";
                    eventTracking('Product-Page-Clicks',"Message_Widget|PDP", `${this.props.data.IS_PROD_SERV&&this.props.data.IS_PROD_SERV=="S"?"Book_Service|Services":"Get_Samples"}`+"|EnquiryCTA|PDP"+"|"+`${this.props.pageLang}`+`${this.props.track}`, true)
                }}>
          {this.Canigetsample()}
          </this.props.linkTag>:""}
        </div>:""}

      </div>
    );
  }
}

export default Messenger;