import React, {Component} from 'react';
import MenuLayout from '../../Menu/Components/Menu';
import styles from "../../../Globals/imageCss";
import {eventTracking, gaTrack} from '../../../Globals/GaTracking';
//import Error404 from '../../PDP/utility/Error404/Error404';



class Error5xx extends Component {
    constructor(props){
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state={leftDrawer:false};
        if (this.props.pageName && this.props.pageName ==="BL404ErrorPage"){
            gaTrack.trackPageView(`/nf${window.location.pathname}`, 'Indiamart Mobile Site - BL404ErrorPage');
        }
       else{
        if (this.props.error) gaTrack.trackPageView("/pwa/" + this.props.error, 'Indiamart Mobile Site - ' + this.props.error);
        else  gaTrack.trackPageView("/pwa/404", 'Indiamart Mobile Site - 404');
    }
    }
    toggleMenu(){
       this.setState({leftDrawer : !this.state.leftDrawer});
       document.body.className = document.body.className.replace("oh","");
    }
    render() {
        let str= window.location.href;
        // if (/(^\/proddetail\/.*$)/.test(str)) {
        //     // Successful match
        // } else {
        //     // Match attempt failed
        // }
        let the_component="";
        document.getElementById("gblLoader")?document.getElementById("gblLoader").style.display = "none":'';
        if(this.props.pageType && (this.props.pageType==='state' || this.props.pageType==='authority')){
            the_component=(<React.Fragment>
                <div className="pd10">
                <p className="pd10 fs20 fw">This Tender doesn't exist.</p>
            </div>
            <a href="/bl/tenders/"><div class="noimgform clrw bgmim bxrd20">View Latest Tenders</div></a>
            </React.Fragment>);
        }else  if(this.props.pageType && this.props.pageType=="404"){
            the_component=(<React.Fragment>
                <div className="pd10">
                <p className="pd10 fs20 fw">Page Not Found.</p>
            </div>
            <a href="/dir/"><div class="noimgform clrw bgmim bxrd20">Browse All Industries</div></a>
            </React.Fragment>);
        }
        // else if((window.location.href).includes("proddetail") && !(/(^\/proddetail\/.*$)/.test(window.location.href))) {
    
        //     the_component=(
                
        //            <Error404/>
        //          );


        // }
        else if(!this.props.pageType){
            the_component=(<React.Fragment>
                <div className="pd10">
                <p className="pd10 fs20 fw">No Buy Leads found in this category</p>
            </div>
            <a href="/bl/"><div class="noimgform clrw bgmim bxrd20">View Latest Buyleads</div></a>
            </React.Fragment>);
        }
        else{
            the_component=(<React.Fragment>
            <div className="pd10">
            <p className="pd10 fs20 fw">This Buy Lead doesn't exist.</p>
        </div>
        <a href="/bl/"><div class="noimgform clrw bgmim bxrd20">View Latest Buyleads</div></a>
        </React.Fragment>);
        }
        return (<div>
            {this.props.error && this.props.error >= 500
            
            ?
            <i className="Menu_icon tbSp" onClick={() => {eventTracking('Menu','PWA-Error-5xx','Hamburger-click-1');this.toggleMenu(); var bodyclass=document.createAttribute("class"); bodyclass.value="oh";document.getElementsByTagName("body")[0].setAttributeNode(bodyclass);}}>
            </i> 
            :
            ''
        }
                     
                    {this.props.error && this.props.error >= 500 && this.state.leftDrawer &&  <MenuLayout toggleMenu={this.toggleMenu}/>}

               {
                this.props.error && this.props.error >= 500
                ?
                <div className="tc pd10 fw m10 bxrd4" key="page_5xx" id="page_5xx">
                    <img className="m10 pd10 bdrBed" src="https://m.imimg.com/gifs/im_logo.gif"/>
                    {this.props.CircuitBreak && this.props.CircuitBreak==true?
                    <div className="fs16 clr33 fwn">
                        Some technical problem has occured, please try again later.
                    </div>
                :
                    this.props.error != 503 ? <div className="fs16 clr33 fwn">
                    There seems to be a temporary server issue. 
                        <p className="pd10 clrmim">
                        Please try again.
                        </p>
                        {/* <p className="pd10">
                            If you think something is broken, report a problem to 
                            <span className="clrmim"> webmaster@indiamart.com</span>
                        </p> */}
                    </div> :
                    <div className="fs16 clr33 fwn">
                        Site is under maintenance, please check after sometime.
                    </div> 
                    }
                </div>
            :
           
            <div id="bl5xx" className="tc clr8B fs15 lh20 mh400 pd20 mt88">
            
                    <i style={styles.imageCss().spM} class="dib prodImgM" style="background-position:-11px -726px;"></i>
                {the_component}
                </div>
            }
            </div>
            )
    }
}
export default Error5xx;