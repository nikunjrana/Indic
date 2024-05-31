import React, { Component } from 'react';
import '../css/Menu.css';
import '../../../modules/App/styles/basic.css';
import { eventTracking, prevname } from '../../../Globals/GaTracking';
import MenuLayout from "../../Menu/Components/Menu";
//import { getCookie } from '../../../Globals/CookieManager';

class HamburgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { leftDrawer: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.menuAnimation = this.menuAnimation.bind(this);
        this.state = {
            leftDrawer: false
        }
    }

    toggleMenu(type) {
        if (type === "open" || type === "close") {
            this.menuAnimation(type);
            if(type === 'open'){document.body.style.overflow='hidden'}else{document.body.style=''}
        }
        if(type === "close"){  
            let ele = document.getElementById('google_translate_element')
            ele? ele.style.display='none':'' ;
            if(!window.IsIndicTrack){
                    let elementGoogSel = document.getElementsByClassName("goog-te-combo");
                    let SelLang = elementGoogSel && elementGoogSel.length>0?elementGoogSel[0].value:'';
                    localStorage.setItem("IndicLang",SelLang);
                    let eventAction = 'Manual Language Selected';
                    eventTracking('Indic',eventAction ,SelLang,true)
            }
        }
    }

    menuAnimation(type) {
        let that = this;
        if (type === "open") {
            that.setState({ leftDrawer: true });
            document.body.className = document.body.className.replace("oh", "");    
            setTimeout(function () {
               
                if (document.getElementsByClassName("poa menuCross").length > 0) document.querySelectorAll(".poa.menuCross")[0].style.display = 'block';
            }, 100);

        }
        else {
            document.getElementById("MenuLayout") && document.getElementById("MenuLayout").classList.remove("txL");
            document.getElementById("MenuLayout") && document.getElementById("MenuLayout").classList.add("RtxL");
            document.getElementById("cross") && document.getElementById("cross").classList.add("dn");
            setTimeout(() => {
                that.setState({ leftDrawer: false });   
            }, 50);
            setTimeout(function () {
                document.body.className = document.body.className.replace("oh", "");
                document.getElementById('autosug_div') && document.getElementById('autosug_div').style.display == "block" ? '' : document.body.className.replace("oh", "");

            }, 200);

        }


    }
    componentDidMount() {
        if (this.props.act && this.props.act === 'autoOpen') {
            document.getElementById('menuIcon').click();
        }
    }
    render() {
        let self = this;
        let home=self.props.ga?self.props.ga=='Home':''
        document.getElementById("menuIcon").onclick = function () {
            requestAnimationFrame(()=>setTimeout(()=>{self.props.ga&&self.props.ga=='HindiPDP'?eventTracking('Menu_HindiPDP_Page_Clicks_PWA','click_Menu','Hamburger-click_IMOB_HindiPDP',true) :eventTracking((home?'Home-Page-Clicks-PWA':'Menu'), (home?'Menu-Clicks':self.props.ga), 'Hamburger-click'+(home?'|'+prevname():''));
            self.toggleMenu("open");
            var bodyclass = document.createAttribute("class");
            bodyclass.value = "oh";
            document.getElementsByTagName("body")[0].setAttributeNode(bodyclass);
        },0));
        }
        return (
           
            <>
                {this.state.leftDrawer && <MenuLayout toggleMenu={this.toggleMenu.bind(this)} setTranslatedTxt={this.props.setTranslatedTxt} ga={this.props.ga}></MenuLayout>}
                </>
           
        )
    }
}
export default HamburgerMenu;