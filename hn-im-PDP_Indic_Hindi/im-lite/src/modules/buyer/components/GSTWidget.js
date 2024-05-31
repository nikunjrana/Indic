import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import "../css/fcpWidget.css";

import {getCookieValByKey} from '../../../Globals/CookieManager';
import {gaTrack} from '../../../Globals/GaTracking';
import {doxssHandling} from '../../../Globals/xssHandling';
import {checkGSTDispositionDisplay} from '../../../Globals/GstDispositionFunctions';
// import {gstRegexChecks} from '../../SellOnIm/utility/SoiUtility';

class GSTWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                'gstValue': '',
                'radioValue': 'yes',
                'gstErr': '',
                'otherErr': '',
                'errFlag': false,
                'rejectReason': {
                    "gl_master_id": "",
                    "GL_DISPOSITION": "",
                    "GL_ATTRIBUTE_NAME": ""
                },
                'rejectGstErr': '',
                'submitClick': false,
                'dispositionshow': false,
                'gstBoxShow': true,
                'gstthankshow': false,
                'gstdispositionthankshow': false,
                'gstButtonsShow':true
            },
            'gstDisplayImpression':false,
            'gst_page':'GST_Home'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.trackImpGst = this.trackImpGst.bind(this);
        this.showUpdateLater = this.showUpdateLater.bind(this);
        this.rejectReasonSelection = this.rejectReasonSelection.bind(this);
        this.impressTracking = this.impressTracking.bind(this);
        this.trackGSTTypeImpression = this.trackGSTTypeImpression.bind(this);
    }

    showUpdateLater(e, type) {
        let valueObj = this.state.value;
        if (type == "later") {
            valueObj['dispositionshow'] = true;
            valueObj['gstBoxShow'] = true;
            valueObj['gstButtonsShow']= false;
            valueObj["gstErr"] = ""
            valueObj["errFlag"] = false;
        }
        else{
            valueObj['dispositionshow'] = false;
            valueObj['gstBoxShow'] = true;
            valueObj['gstButtonsShow']= true;
        }
       
        this.setState({ value: valueObj });
    }

    componentDidMount() {
        this.props.getGSTDispositions();
        this.props.getGSTIN(getCookieValByKey('ImeshVisitor', 'glid'));
        this.props.getGSTDispositionsList();
        if(window.location.pathname.indexOf('/bl/')>-1){
            this.setState({gst_page:'GST_BL' }, ()=>{this.trackGSTTypeImpression();});
        }
        else if(window.location.pathname.indexOf('/messages/')>-1){
            this.setState({gst_page:'GST_Message' }, ()=>{this.trackGSTTypeImpression();});
        }
    }

    trackGSTTypeImpression(){
        if(getCookieValByKey('ImeshVisitor', 'cmid')=="32" || getCookieValByKey('ImeshVisitor', 'cmid')=="14"){
            gaTrack.trackEvent(['GST', this.state.gst_page, 'display_impression_vfcp', 0, true]);
        }
        else if(getCookieValByKey('ImeshVisitor', 'cmid')=="17"){
            gaTrack.trackEvent(['GST', this.state.gst_page, 'display_impression_qfcp', 0, true]);
        }
        else{
            gaTrack.trackEvent(['GST', this.state.gst_page, 'display_impression', 0, true]);
        }
    }


    trackImpGst() {
        var int = document.getElementById("gstWidget");
        if (int &&(int.offsetTop==0 || (window.scrollY + window.innerHeight > (int.offsetTop) && int.offsetTop != 0))) {
            this.trackGSTTypeImpression();
            window.removeEventListener('scroll', this.trackImpGst, false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.trackImpGst, false);
    }


    componentWillReceiveProps(nextProps) {
        let valueObj = this.state.value;
        if (nextProps.addgstErr) {
            if (document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display = "none";
        }
        if ((nextProps.addgst || nextProps.gstDispUpdate) && this.state.value.submitClick) {
            if (document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display = "none";
            let valueObj = this.state.value;
            valueObj['dispositionshow'] = false;
            valueObj['gstBoxShow'] = false;
            valueObj['gstButtonsShow']= false;

            if (nextProps.addgst) {
                gaTrack.trackEvent(["GST", this.state.gst_page, "gst-success", 0, false]);
            }
            if (nextProps.gstDispUpdate) {
                let data=[{
                    Disp_name:this.state.value.rejectReason.GL_DISPOSITION,
                    time:new Date().getTime()
                }];
                localStorage.setItem('GST_Dispositions',JSON.stringify(data));
                gaTrack.trackEvent(["GST", this.state.gst_page, "gst_dispositions_success_" + this.state.value.rejectReason.GL_DISPOSITION, 0, false]);
            }
            this.setState({ value: valueObj });
            setTimeout(function () {
                if(document.getElementById("gstWidget")){
                    document.getElementById("gstWidget").style.display = "none";
                }
            }, 2000)

        }


    }
    handleChange(event) {

        let valueObj = this.state.value;

        valueObj['gstValue'] = event.target.value.toUpperCase();
        valueObj['dispositionshow'] = false;
        let name = event.target.name;
        let value = event.target.value.toUpperCase();
        let err = "";

        if (name == "gst") {
            if (value == "") {
                err = "GST cannot be empty"
            }
            else if (value.length > 15) {
                err = "Invalid input.GST should have 15 characters."
            }
            else if (!value.match(/^[0-9a-zA-Z]+$/)) {
                err = "Only numbers and alphabets are allowed.";
            }
            else {
                valueObj["gstErr"] = "";
                valueObj["errFlag"] = false;
            }
        }

        if (err) {
            valueObj["gstErr"] = err;
            valueObj["errFlag"] = true;
        }
        this.setState({ value: valueObj });
    }

    handleSubmit(event, type) {

        let valueObj = this.state.value;
        valueObj["submitClick"] = true;
        if (type != "reason") {
            if (this.state.value.gstValue.trim()) {
                let gstcode = doxssHandling([this.state.value.gstValue]);
                let gstRegexCheck = '';
                if (this.state.value.gstValue.length != 15) {
                    valueObj["gstErr"] = "GSTIN must have 15 characters"
                    valueObj["errFlag"] = true;
                }
                else if (!this.state.value.gstValue.match(/^[0-9a-zA-Z]+$/)) {
                    valueObj["gstErr"] = "Please enter valid GSTIN ";
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


            this.setState({ value: valueObj });
            if (!this.state.value.errFlag) {
                gaTrack.trackEvent(["GST", this.state.gst_page, "submit-with-gst", 0, true]);
                if (document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display = "block";
                this.props.addGST(this.state.value.gstValue);
            }
        }
        else {
            valueObj["gstErr"] = "";
            if (this.state.value.rejectReason.GL_DISPOSITION.trim() == '') {
                valueObj["rejectGstErr"] = "Please choose a reason";
                valueObj["errFlag"] = true;
                this.setState({ value: valueObj });
            }
            else {
                valueObj["gstErr"] = "";
                valueObj["errFlag"] = false;
            }
            if (!this.state.value.errFlag) {
                let data = {};
                if (this.state.value.rejectReason) {
                    data = {
                        "gl_master_id": this.state.value.rejectReason.gl_master_id.toString(),
                        "GL_DISPOSITION": this.state.value.rejectReason.GL_DISPOSITION,
                        "GL_ATTRIBUTE_NAME": "GST"
                    }
                }
                if (document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display = "block";
                this.props.addGSTDispositions(data);
            }
        }

    }


    rejectReasonSelection(event, reasonname,masterid,attributeName) {
        let valueObj = this.state.value;
        valueObj["gstValue"] = "";
        valueObj["otherErr"] = '';
        valueObj["rejectGstErr"] = '';
        valueObj['rejectReason'] = {
                "gl_master_id": masterid,
                "GL_DISPOSITION": reasonname,
                "GL_ATTRIBUTE_NAME": attributeName
        };
        this.setState({ value: valueObj });
        this.handleSubmit(event, "reason");
    }

    impressTracking(){
        if(!this.state.gstDisplayImpression){
            window.addEventListener("scroll", this.trackImpGst, {passive:true});
            this.setState({gstDisplayImpression:true});
        }
        
    }

    render() {
        let disposition_List =[];
        if(this.props.soiDispositonList && this.props.soiDispositonList.GL_DISPOSITIONS_MASTER && this.props.soiDispositonList.GL_DISPOSITIONS_MASTER.length>0){
            let  disposition_length = this.props.soiDispositonList.GL_DISPOSITIONS_MASTER.length;
            let data = this.props.soiDispositonList.GL_DISPOSITIONS_MASTER;
            for(let i=0;i<disposition_length;i++){
                disposition_List.push( <li className="dib">
                <label className="gstcontainer db por clrw "> <span className="dib  ">{data[i].GL_DISPOSITION}</span>
                    <input type="radio" id="reject23"  name="reason" value={data[i].GL_DISPOSITION} checked={this.state.value.rejectReason.GL_DISPOSITION === data[i].GL_DISPOSITION} onClick={(e)=>this.rejectReasonSelection(e,data[i].GL_DISPOSITION,data[i].gl_master_id,data[i].GL_ATTRIBUTE_NAME)} />
                    <span className="checkmark poa bxrd100"></span>
                </label>   
            </li>)
            }
        }

        return (
            <div>
                {this.props.gstdata && this.props.gstdata.GST == '' && this.props.gstDispositionRead && this.props.gstDispositionRead.Data && checkGSTDispositionDisplay() ?
                    <div className="pdt10 pdb10">
                    <div className="crx pdt15 pdb15 pd10 bgmim clrw por brd5 ma012" id="gstWidget" >

                    {window.location.pathname=="/"?this.impressTracking():''}
                        <div id="fullLoader" className="poa dn fullsoiloader" >
                            <div className="loader  poa ">
                            </div>
                        </div>
                        {this.state.value.gstBoxShow &&
                            <div id="gstCont">
                                <div className=" crx">
                                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMSIgaGVpZ2h0PSIzNC4xNjYiIHZpZXdCb3g9IjAgMCAzMSAzNC4xNjYiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTF7ZmlsbDojZWVkMzdifS5jbHMtMntmaWxsOiNmZmZ9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJHcm91cF8yMzUiIGRhdGEtbmFtZT0iR3JvdXAgMjM1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjkwNCAtMTEwMSkiPgogICAgICAgIDxnIGlkPSJzaGllbGRfMV8iIGRhdGEtbmFtZT0ic2hpZWxkICgxKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjkwNCAxMTAxKSI+CiAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzk4IiBkPSJNMzkuMjI0IDM0LjE2NmEyMy44NiAyMy44NiAwIDAgMCAxNS41LTIyLjM0N1Y1Ljc4N0E1Ljc4NyA1Ljc4NyAwIDAgMSA0OC45MzcgMEgyOS41MTFhNS43ODcgNS43ODcgMCAwIDEtNS43ODcgNS43ODd2Ni4wMzJhMjMuODYgMjMuODYgMCAwIDAgMTUuNSAyMi4zNDd6IiBjbGFzcz0iY2xzLTEiIGRhdGEtbmFtZT0iUGF0aCA5OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzLjcyNCkiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgaWQ9Indhcm5pbmdfMV8iIGRhdGEtbmFtZT0id2FybmluZyAoMSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY5MTcuMTk0IDExMDcuMTU5KSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cF8yMzQiIGRhdGEtbmFtZT0iR3JvdXAgMjM0Ij4KICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzk5IiBkPSJNMjIwLjUzMiAzMzMuMzgyYTIuMzA3IDIuMzA3IDAgMSAwIDAgNC42MTQgMi4zMDggMi4zMDggMCAwIDAgMC00LjYxNHoiIGNsYXNzPSJjbHMtMiIgZGF0YS1uYW1lPSJQYXRoIDk5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE4LjE3OSAtMzE3LjEyKSIvPgogICAgICAgICAgICAgICAgPHBhdGggaWQ9IlBhdGhfMTAxIiBkPSJNMjE5LjUwNiAxNTcuMjQxYTIuNTA5IDIuNTA5IDAgMCAwLTEuNzgxIDIuNTJjLjA1NS43MjkuMSAxLjQ2Ny4xNTcgMi4yLjE1NyAyLjc3OC4zMTQgNS41LjQ3MSA4LjI3OGExLjY5MSAxLjY5MSAwIDAgMCAxLjcyNiAxLjYyNCAxLjcyNiAxLjcyNiAwIDAgMCAxLjcyNi0xLjY4YzAtLjU3MiAwLTEuMS4wNTUtMS42OC4xLTEuNzgxLjIxMi0zLjU2Mi4zMTQtNS4zNDQuMDU1LTEuMTU0LjE1Ny0yLjMwNy4yMTItMy40NjFhMi44NSAyLjg1IDAgMCAwLS4yMTItMS4xNTQgMi4zMTMgMi4zMTMgMCAwIDAtMi42NjgtMS4zMDN6IiBjbGFzcz0iY2xzLTIiIGRhdGEtbmFtZT0iUGF0aCAxMDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTcuNzI1IC0xNTcuMTc2KSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K" height="32" className="fl  shieldGst"></img>
                                <p class="fs16 fw pdl40">Customers trust sellers with a valid GSTIN</p>
                                </div>
                                <div className="mt10 crx">
                                    <div className="w100">
                                        <input type="text" maxlength="15" placeholder="Enter GSTIN" autocomplete="off" className="tuc ht40p w100 bxrd4 lh20 fs18 pd10 brdw1 gstInput" value={this.state.value.gstValue} onChange={this.handleChange} onFocus={(e)=>this.showUpdateLater(e,"show")}/>
                                    </div>
                                </div>
                                {(this.state.value.gstErr != '' || this.props.addgstErr) && <div className="error_msg mt10 pdl0 fs13 fw crx clrffa"> {this.state.value.gstErr || this.props.addgstErr} </div>}
                               
                            </div>

                        }
                        {this.state.value.gstButtonsShow &&
                            <div className="crx">
                             <div className="fl mt20 brdbw fs15" onClick={(e) => {this.showUpdateLater(e, "later");gaTrack.trackEvent(["GST", this.state.gst_page, "update-later-click", 0, true]) }}>
                             <i>I will update later</i>
                          </div>
                          <div className="fr mt10">
                              <button class="clrmim fs16 ht31p pdl20 pdr20 w100 ripple bxsdw bgw bxrd20 " type="button" onClick={(e) => { this.handleSubmit(e, "gst"); gaTrack.trackEvent(["GST", this.state.gst_page, "add-gst-click", 0, true]) }}>Add Now</button>
                          </div>
                          </div>
                        }
                         {this.state.value.dispositionshow &&   
                            <div className="por">
                            <ul className="rejectGst scWrap  mt10">
                                {disposition_List}
                            </ul>
                            </div>
                         }

                        {(this.props.addgst ||
                            this.props.gstDispUpdate) && <div className=" por fw pdl32 fs16 clrw lh18">
                                <i class="dib mr5 vam gstTick poa"></i>
                                {this.props.addgst && ' GSTN Successfully Added!'}
                                {this.props.gstDispUpdate && 'Thank you for the response!'}
                            </div>}


                    </div> 
                    </div>
                    : ''} 
                    

            </div>
        )
    }
}

export default GSTWidget;