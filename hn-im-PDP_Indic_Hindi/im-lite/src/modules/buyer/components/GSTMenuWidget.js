import React, { Component } from 'react';
import '../../Menu/css/Menu.css';
import '../css/gstWidget.css';
// import { gstRegexChecks } from '../../SellOnIm/utility/SoiUtility';
import { doxssHandling } from '../../../Globals/xssHandling';
import { gaTrack } from '../../../Globals/GaTracking';
import {getCookieValByKey} from '../../../Globals/CookieManager';

class GSTMenuWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {value:{gstValue: '', gstErr: '', errFlag: false, gstBox:'' },submit:false}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getGSTIN(getCookieValByKey('ImeshVisitor','glid'));
    }

    handleSubmit() {
        let valueObj = this.state.value;
        let gstValue = this.state.value.gstValue.replace(/ +/g, "");
        if (gstValue) {
            let gstcode = doxssHandling([gstValue]);
            let gstRegexCheck = '';
            if (gstValue=='') {
                valueObj["gstErr"] = "GST cannot be empty"
                valueObj["errFlag"] = true;
            }
            else if (gstValue.length != 15) {
                valueObj["gstErr"] = "Invalid input.GST should have 15 characters."
                valueObj["errFlag"] = true;
            }
            else if (!gstValue.match(/^[0-9a-zA-Z]+$/)) {
                valueObj["gstErr"] = "Please enter valid GSTIN";
                valueObj["errFlag"] = true;
            }
            else if (gstcode.code == "206") {
                valueObj["gstErr"] = gstcode.message;
                valueObj["errFlag"] = true;
            }
            else if (!gstRegexCheck) {
                valueObj["gstErr"] = "Please enter valid GSTIN"
                valueObj["errFlag"] = true;
            }
            else {
                valueObj["gstErr"] = "";
                valueObj["errFlag"] = false;
            }
        }
        else {
            valueObj["gstErr"] = "Please enter your GSTIN";
            valueObj["errFlag"] = true;
        }


        this.setState({ value:valueObj });
        if (!this.state.value.errFlag) {
            this.setState({ value:valueObj ,submit:true});
            if (document.getElementById("gstLoader")) document.getElementById("gstLoader").style.display = "block";
            gaTrack.trackEvent(['GST', 'GST_Menu', "submit-with-gst", 0, true]);
            this.props.addGST(gstValue);
        }
    }


    handleChange(event) {
        let valueObj = this.state.value;
        valueObj['gstValue'] = event.target.value.length <=15 ? event.target.value.toUpperCase() : event.target.value.substring(0, 15).toUpperCase();
        let value = valueObj['gstValue'];
        let err = "";
        let gstRegexCheck = '';

        if (value == "") {
            err = "GST cannot be empty"
        }
        else if (!value.match(/^[0-9a-zA-Z]+$/)) {
            err = "Only numbers and alphabets are allowed.";
        }
        else if (!gstRegexCheck) {
            err = "Please enter valid GSTIN"
        }
        else {
            valueObj["gstErr"] = "";
            valueObj["errFlag"] = false;
        }
        if (err) {
            valueObj["gstErr"] = err;
            valueObj["errFlag"] = true;
        }
        this.setState({ value:valueObj });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.addgstMenu && this.state.submit){
            gaTrack.trackEvent(["GST", "GST_Menu", 'gst_success', 0, false]);
            if (document.getElementById("gstLoader")) document.getElementById("gstLoader").style.display = "none";
            this.setState({submit:false});
        }
        if(!this.state.submit && nextProps.gstdata && (nextProps.gstdata.GST!='' || nextProps.gstdata.GST == undefined  || nextProps.gstdata.GST=='' )){
            if (document.getElementById("gstLoader")) document.getElementById("gstLoader").style.display = "none";
        }
        
    }

    render() {
        if (document.getElementById("gstLoader") && this.props.addgstMenu) { document.getElementById("gstLoader").style.display = "none"; }
        return (

            <div className="bxrd4 clrb pf w90 bxrd5_b ma bgw tc langPopUpMenu " id="gstMenuBox" >
                <div id="gstLoader" className="poa db fullsoiloader" >
                    <div className="loader  poa ">
                    </div>
                </div>
                {this.props.addgstMenu ||  (this.props.gstdata && this.props.gstdata.GST !=''  && this.props.gstdata.GST!=undefined  )? 
                <div id="blockScrngstcompwidget" className="blanketNI pf w100 h100vh">    
                    <div id="gstmenucompwidget" className="pd15 popNIDiv bgw pf tc">
                        <img src="https://m.imimg.com/gifs/img/Thankyou.png" height="60"/>
                        <div className="fs16 fw mt10">Thank you!</div>
                        <div className="fs14 mt5"> We have received your GST </div>
                        <button  className="bgBlu clrw fw fs16 w60 pdl20 pdr20  bxrd20 mt15 db ma lh25 ht40"><a href="/" className="clrw ">Go to Home</a></button>
                    </div>
                </div> :
               (this.props.gstdata && this.props.gstdata.GST==''  && this.props.gstdata.GST!=undefined  ) ?  
               <div id="blockScrngstwidget" className="blanketNI pf w100 h100vh">
                    <div id="gstmenuwidget" className='popNIDiv bgw pf tc '>
                        <div className="fs16 fw pd15 pdb10">Enter Company GST Number
                            <span className="fr fs22 poa cross" onClick={()=>{this.props.gstBox("close");gaTrack.trackEvent(['GST', 'GST_Menu', "Cross", 0, true]);}}>&times;</span>
                        </div>
                        <div className="bdrB"></div>
                        <form className="pd15 pdt10">
                            <label htmlFor="gstMenuTxt" className="tl db fw fs14 fs_c">GST<sup className="clrred">*</sup></label>
                            <div className="por">
                                <input type="text" id="gstMenuTxt" className="db ht40 w100 fw fs18 brd97 pd10 mt5 bxrd4 clr33" onChange={(e) => this.handleChange(e)} value={this.state.value.gstValue} placeholder="Enter 15 Digit GST Number" />
                                {this.state.value.gstValue.replace(/ +/g, "").length==15 && this.state.value.gstErr=='' ? <i class="m-img dib mr5 vam tickTick poa"></i>:''}
                            </div>
                            {(this.state.value.gstErr != '' || this.props.addgstErrMenu) && <div className="mt10 pdl0 fs13  crx clrred tl"> {this.state.value.gstErr || this.props.addgstErrMenu} </div>}
                            <input type="button" value="Submit" className="bgBlu clrw fw fs16 w60 pdl20 pdr20 bxrd20 mt15 lh25 ht40" onClick={() => {this.handleSubmit(); gaTrack.trackEvent(["GST", "GST_Menu", "add-gst-click", 0, true])}}></input>
                        </form>
                    </div>
                </div>
                    :'' 

                }
            </div>



        )
    }
}

export default GSTMenuWidget;