import React, { Component } from 'react'
import { getCookieValByKey } from '../../Globals/CookieManager';
import { eventTracking } from '../../Globals/GaTracking';
import { Link } from 'react-router';
import CityView from './CityView';
import { removalTextNodes } from '../../Globals/translatorPreact/translatorPatch';

export default class CatPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          brands: false,
          bizdata: this.props.bizName?true:false,
          categories: true,
          city:false,
          ISQ : true,
          CatCount : 4,
          boolean: []
        };
    this.isq_data = this.isq_data.bind(this);
    this.droplist = this.droplist.bind(this);
    this.boolean = [];
        }
    
    droplist(filter,index){
        switch(filter){
            case 'spec' : this.boolean[index] == true ? this.boolean[index]=false : this.boolean[index]=true;
                        this.state.boolean[index] == true ? this.setState({boolean:this.boolean}) : this.setState({boolean:this.boolean});
                        break;
            case 'biz' : this.state.bizdata ? this.setState({bizdata:false}) : this.setState({bizdata:true})
                        break;
            case 'city' : this.state.city ? this.setState({city:false}) : this.setState({city:true})
                        break;
            case 'SelectIsq' : this.state.ISQ ? this.setState({ISQ:false}) : this.setState({ISQ:true})
                        break;           
            case 'brands' : this.state.brands ? this.setState({brands:false}) : this.setState({brands:true})
                        break;
            case 'cat' : this.state.categories ? this.setState({categories:false}) : this.setState({categories:true})
                        break;
            case 'CatCount' : this.state.CatCount == 4 ? this.setState({CatCount:index}) : this.setState({CatCount:4})
                        break;
            default :
        }
    }
    isq_data(data,onBubbleClick,tracking,selected,selectedHead,Noisomorph,allIndiaLink,head){
            let sorted = {};
            data = data.filter((item)=>{
                if(item.FK_ISQ_QUESTION_TEXT != head)
                    return item
            })
            if(data && data.length>0){
            for( let i = 0; i < data.length ; i++ ){
                if( sorted[data[i].FK_ISQ_QUESTION_TEXT] == undefined){
                 sorted[data[i].FK_ISQ_QUESTION_TEXT] = [];
                }
                sorted[data[i].FK_ISQ_QUESTION_TEXT].push(data[i]);
            }}
            let Finaldata = []
               if(Object.keys(sorted) && Object.keys(sorted).length>0){
                for(let i=0;i<Object.keys(sorted).length;i++){
                    if(this.state.boolean.length <Object.keys(sorted).length ){this.state.boolean.push(false);this.boolean.push(false)}
                    let Heading =  <div className='por headsugg fw' onClick={e=>{this.droplist('spec',i);this.state.boolean[i]==true?eventTracking(this.props.tracking.click, `Isq-PopUp`, `Isq-PopUp-Closed`, 1):eventTracking(this.props.tracking.click, `Isq-PopUp`, `Isq-PopUp-Open`, 1)}}>{Object.keys(sorted)[i]}<i className={this.state.boolean[i]==true?"dropdown-arrow":"dropCat"}></i></div>
                    let OptionsList = this.state.boolean[i]==true?Object.values(sorted)[i].map((item,index)=>{
                        let link = { pathname: item.ISQ_URL };
                        let name = item.FK_ISQ_OPTION_TEXT;
                        return <div className={Object.keys(sorted)[i] === selectedHead && selected === name?`Slcted` :`Unsel`} onClick={(e) => {
                            eventTracking(tracking, `Isq-PopUp`, `Isq-${i+1}-${index + 1}-Clicked`, 1)
                        }}>{Noisomorph?<Link data-index={index} to={selected === name?allIndiaLink:link.pathname} onClick={onBubbleClick}>{name}</Link> :<a data-index={index} href={selected === name?allIndiaLink:link.pathname} onClick={(event) => { window.location.href = (link.pathname); onBubbleClick; event.preventDefault(); }}>{name}</a>}</div>
                    }):""
                    Finaldata.push(<div >
                                {Heading}
                                {OptionsList}
                            </div>)
                }}
                return Finaldata    }

    componentDidUpdate(){
        removalTextNodes();
    }
  render() {
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    let screen = window.screen && window.screen.width && window.screen.width<300 ? 'w90': 'w300'
    let Noisomorph = (SSR && ((SSR["userViewCount"] == 5 && (glid == undefined))))
    ?true : false
    let isq = this.props.isqData && this.props.isqData.data? this.isq_data(this.props.isqData.data,this.props.onBubbleClick,this.props.tracking.click,this.props.selectedISQ,this.props.selectedHead,Noisomorph,this.props.isqData.allIndiaLINK,this.props.isqData.CurrentArray && this.props.isqData.CurrentArray.Head?this.props.isqData.CurrentArray.Head:'' ):""
    let dataArr =this.props.brandsData?this.props.brandsData.map(item=>{ return [item.NAME,item] }):""; 
    let maparr = this.props.brandsData?new Map(dataArr):"";
    let filteredData =this.props.brandsData?[...maparr.values()]:"";
    let view =this.state.brands ? this.props.brandsData? filteredData.map(
        (item, index) => {
            let linkParams = (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?{ pathname: item.LINK, query:{"utm_source":"Adwords"}}:{ pathname: item.LINK };
            let name = item.NAME;
            return <div className={`Unsel`} onClick={(e) => {
                eventTracking(this.props.tracking.click,  'Brand-PopUp', `Brand-${index + 1}-Clicked`, 1)
            }}>{Noisomorph ? <Link data-index={index} to={linkParams} onClick={this.props.onBubbleClick}>{name}</Link> : <a data-index={index} href={linkParams.pathname} onClick={(event) => { window.location.href = (linkParams.pathname); this.props.onBubbleClick; event.preventDefault(); }}>{name}</a> }</div>
        }
    ):"" :""
    let CatView =this.state.categories ? this.props.data? this.props.data.map(
        (item, index) => {
            if(index<this.state.CatCount){
            let linkParams = (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?{ pathname: item.LINK, query:{"utm_source":"Adwords"}}:{ pathname: item.LINK };
            let name = item.NAME;
            return <div className={`Unsel`} onClick={(e) => {
                eventTracking(this.props.tracking.click,  'Category-PopUp', `Category-${index + 1}-Clicked`, 1)
            }}>{Noisomorph ? <Link data-index={index} to={linkParams} onClick={this.props.onBubbleClick}>{name}</Link> : <a data-index={index} href={linkParams.pathname} onClick={(event) => { window.location.href = (linkParams.pathname); this.props.onBubbleClick; event.preventDefault(); }}>{name}</a> }</div>}
        }
    ):"" :""
    let selectedCat = this.state.categories ? <div className="Slcted"><a href= {this.props.categoryPath} onClick={(e) => {eventTracking(this.props.tracking.click,  'Category-PopUp', `Selected-Category-Clicked`, 1)}}>{this.props.mcatName}</a></div>:""
    let sellerview = this.state.bizdata ? this.props.bizData ? this.props.bizData.map((item,index)=>{
        let selected = this.props.bizName ? this.props.bizName : "All"
        let bizclass = selected == item.NAME ?`Slcted` :`Unsel` 
        
        return <div className={bizclass} onClick={(e) => {
            eventTracking(this.props.tracking.click, `Biz-PopUp`, `Biz-${index + 1}-Clicked`, 1)
        }}>{Noisomorph?item.NAME == selected?item.NAME:<Link data-index={index} to={item.LINK +(item.QUERY ?item.QUERY : "")}  onClick={this.props.onBubbleClick}>{item.NAME}</Link> :item.NAME == selected?item.NAME:<a  data-index={index} href={item.LINK +(item.QUERY ?item.QUERY : "")}  onClick={(event) => { window.location.href = (item.LINK +(item.QUERY ?item.QUERY : "")); this.props.onBubbleClick; event.preventDefault(); }}>{item.NAME}</a>}</div>}):"":""

    let cityView = this.state.city?<CityView cityData = {this.props.cityData} cityName={this.props.cityName} prefData = {this.props.prefData} tracking = {this.props.tracking} SSR = {SSR} glid = {glid} onBubbleClick = {this.props.onBubbleClick} searchParam = {this.props.searchParam} catFilter={true}/>:""

    return (
        <div>
        <div className="mbg1" style={{display:"block"}} onClick={this.props.closePopup}></div>
            <div className={`bgw Overlaypopup ${screen}`}>
                <h2 className='filterTitle'>{screen=='w90'?"More Products":"Explore More Products"}<i className='closeMcat' onClick={e=>{eventTracking(this.props.tracking.click,'Filter-PopUp','PopUp-Cross-Button',1); this.props.closePopup()}}></i></h2>
                <div className="pd10 InnerList h90">
                    {this.props.isqData && this.props.isqData.CurrentArray && this.props.isqData.CurrentHeadData
                        && this.props.isqData.CurrentHeadData.length>0?<div><div className='por headsugg fw' onClick={e=>{this.droplist('SelectIsq');this.state.ISQ?eventTracking(this.props.tracking.click, `Selected-ISQ-PopUp`, `Selected-ISQ-Closed`, 1):eventTracking(this.props.tracking.click, `Selected-ISQ-PopUp`, `Selected-ISQ-Open`, 1)}}>{this.props.isqData.CurrentArray.Head}<i className={this.state.ISQ?"dropdown-arrow":"dropCat"}></i></div>
                        {this.state.ISQ?<div className={`Slcted`} onClick={(e) => {eventTracking(this.props.tracking.click, `SelectedISQ-PopUp`, `SelectedISQ-Deselect`, 1)}}>{<a href={this.props.isqData.allIndiaLINK}  onClick={(event) => { window.location.href = (this.props.isqData.allIndiaLINK); this.props.onBubbleClick; event.preventDefault(); }}>{this.props.isqData.CurrentArray.Text}</a>}</div>:""} 
                        {this.state.ISQ?this.props.isqData.CurrentHeadData.map((item,index)=>{return <div className={`Unsel`} onClick={(e) => {eventTracking(this.props.tracking.click, `SelectedISQ-PopUp`, `SelectedISQ-${index + 1}-Clicked`, 1)}}>{Noisomorph?<Link data-index={index} to={item.ISQ_URL}  onClick={this.props.onBubbleClick}>{item.FK_ISQ_OPTION_TEXT}</Link> :<a data-index={index} href={item.ISQ_URL}  onClick={(event) => { window.location.href = (item.ISQ_URL); this.props.onBubbleClick; event.preventDefault(); }}>{item.FK_ISQ_OPTION_TEXT}</a>}</div>}):""}</div>:""}

                    {this.props.data && this.props.data.length>0 ? 
                            <div><div className='por headsugg fw' onClick={e=>{this.droplist('cat'); this.state.categories?eventTracking(this.props.tracking.click, `Category-PopUp`, `Category-PopUp-Closed`, 1):eventTracking(this.props.tracking.click, `Category-PopUp`, `Category-PopUp-Open`, 1)}}>Categories <i className={this.state.categories?"dropdown-arrow":"dropCat"}></i></div>{selectedCat}{CatView}{this.state.categories && this.props.data.length>4?<span className="ViewMore" onClick={e=>{this.droplist('CatCount',this.props.data.length)}}>{this.state.CatCount == 4?"View More":"View Less"}</span>:""}</div>:""}
                    {!this.props.ecomCheck && this.props.cityData && this.props.cityData.cities && this.props.cityData.cities.length>0 ?<div>
                            <div className='por headsugg fw' onClick={e=>{this.droplist('city');this.state.city?eventTracking(this.props.tracking.click, `City-AllFilter-PopUp`, `City-AllFilter-PopUp-Closed`, 1):eventTracking(this.props.tracking.click, `City-AllFilter-PopUp`, `City-AllFilter-PopUp-Open`, 1)}}>Cities<i className={this.state.city?"dropdown-arrow":"dropCat"}></i></div>
                            {cityView}
                            </div>:""}
                    
                    {this.props.isqData && this.props.isqData.data && this.props.isqData.data.length>0?
                            <div>{isq.map((item,index)=>{
                                return item})}</div>
                        : ""}
                    {this.props.brandsData && this.props.brandsData.length>0 ?<div>
                            <div className='por headsugg fw' onClick={e=>{this.droplist('brands');this.state.brands?eventTracking(this.props.tracking.click, `Brands-PopUp`, `Brands-PopUp-Closed`, 1):eventTracking(this.props.tracking.click, `Brands-PopUp`, `Brands-PopUp-Open`, 1)}}>Brands<i className={this.state.brands?"dropdown-arrow":"dropCat"}></i></div>
                            {view}
                            </div>:""}
                    {this.props.bizData && this.props.bizData.length>1 ? 
                        <div><div className='por headsugg fw' onClick={e=>{this.droplist('biz');this.state.bizdata?eventTracking(this.props.tracking.click, `Biz-PopUp`, `Biz-PopUp-Closed`, 1):eventTracking(this.props.tracking.click, `Biz-PopUp`, `Biz-PopUp-Open`, 1)}}>Seller Type<i className={this.state.bizdata?"dropdown-arrow":"dropCat"}></i></div>{sellerview}</div>:""}
            </div>
            </div>
        </div> 
    )
  }
}
