import React, {PureComponent} from "react";

class McatTitle extends PureComponent {
   constructor(props){
    super(props);
   }
render(){
  let mcatNewName = this.props.path.includes('impcat') ? this.props.isqText ? this.props.isqText + " " + this.props.mcatDisplayName : this.props.mcatDisplayName : this.props.path.includes('/city/') ? `${this.props.mcatName} in ${this.props.cityNameSelected} ${this.props.searchBarText}` : '';
  let countTerm = this.props.path.includes("/city/")?"":<span className='fs12'>{this.props.countText}</span>
    return(
      <div id="Title" className="pd8 titleclr">
        <h1 className="fs17 fw500">{mcatNewName}</h1>
          {countTerm}
      </div>)
}
}
export default McatTitle
