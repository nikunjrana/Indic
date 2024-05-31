import React, { PureComponent } from 'react';
import { handleChange, handleQntChange, hitGetISQ } from './helper';

class InlineDNC extends PureComponent {
    constructor(props) {
        super(props);
        this.state={optionsList:''};
        this.dropdownDiv = this.dropdownDiv.bind(this);
        this.setIsqValue = this.setIsqValue.bind(this);
        window.addEventListener("setIsqHit", this.setIsqValue, {passive:false});
    }

    setIsqValue(event) {
        let result = event && event.detail; 
        // console.log("******", result);     
        if(result && result.status == 'success' && result.data.length>0 && result.data[0] && result.data[0][0] && result.data[0][0].qDesc=="Quantity" && result.data[0][1] && result.data[0][1].qDesc=="Quantity Unit") {
            this.props.setIsqResponse(result.data[0]);
            result.data[0][1].qOptions && this.setState({optionsList:result.data[0][1].qOptions})
        }
        window.removeEventListener("setIsqHit", this.setIsqValue);

    }

    dropdownDiv() {
        let optionsArr = [...this.state.optionsList];
        let optionList = []
        for (let i = 0; i < optionsArr.length; i++) {
            if(i==0) {
                optionList.push(<>
                    <option id="selectedOptInl" selected qid={this.props.isqResponseVal[1].qId} optionsdesc={optionsArr[i].optionsDesc} optionsid={optionsArr[i].optionsId} isqpriority={optionsArr[i].isqPriority} className="ttc" style="display:block;"> {optionsArr[i].optionsDesc}</option></>
                );
            }
            else {
            optionList.push(<>
                <option value={optionsArr[i].optionsDesc} optionsdesc={optionsArr[i].optionsDesc} optionsid={optionsArr[i].optionsId} qid={this.props.isqResponseVal[1].qId} isqpriority={optionsArr[i].isqPriority} className="ttc"> {optionsArr[i].optionsDesc}</option></>
            )}
        }

        return(
            <div className="tl mt5 mb5">
                <p className="mb5 fs14 fw pdt2">Quantity</p>
                <div className="df">
                    <div className="w50 mr5">
                        <input id="qntInpInl" type="tel" maxLength="10" placeholder="Quantity" className="brd008b80P fs16 pd5 tl w100 bxrd4 ht31" qdesc={this.props.isqResponseVal[0].qDesc} qid={this.props.isqResponseVal[0].qId} priority={this.props.isqResponseVal[0].priority} qtype={this.props.isqResponseVal[0].qType} bid={this.props.isqResponseVal[0].qOptions[0].optionsId} onChange={(event) => handleQntChange(event.target.value)} onClick={()=>  {let d = document.getElementById("inlineblssr"); d && d.scrollIntoView()}}/>
                        <div id="errQtyInl" className="eqerrmsg fs12 mt2"></div></div>
                    <div className="w50">
                        <div className="por">
                            <input id="otherPopupInl" className="fs16 pd10 poa entrUnit" placeholder="Unit" type="text" style={{ display: "none" }} onChange={(event) => handleQntChange(event.target.value)}/>
                            <select id="qntUnitInpInl" optionsdesc="" optionsid="" qid="" isqpriority="" bid="" className="bgw brd008b80P bxrd4 fs16 pd5 tl ttc w100 ht31" onChange={(event) => handleChange(event.target.value)}>
                                {optionList}
                            </select>
                        </div><div id="errQtyUnitInl" className="eqerrmsg fs12 mt2"></div>
                    </div></div>
            </div> 
        )
    }
    
    render() {

        return( 
            <React.Fragment> 
              {this.props.isqResponseVal ?          
                this.dropdownDiv()
                :(<div className="tl mt5 mb5" style={{height:"55.67px"}}></div>)}
        </React.Fragment>  
            )
    }
}

export default InlineDNC