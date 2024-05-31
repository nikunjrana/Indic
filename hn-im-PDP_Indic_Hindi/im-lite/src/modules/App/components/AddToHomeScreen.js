import React from 'react';
import {eventTracking, prevname} from '../../../Globals/GaTracking';
import "../styles/A2hs.css";

export default class AddToHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showA2hsIcon: false,showA2hsPop:false};
        this.checkInstallEvnt = '';
        this.closeA2hsAssist = this.closeA2hsAssist.bind(this);
        this.a2hsButton = this.a2hsButton.bind(this);
    }

    checkAppleDevice(){
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        return iOS;
    }

    a2hsButton() {
        if (this.state.showA2hsIcon) {
            let that = this;
            window.a2hsAddTouchPoint = 'header' + ' | ' + this.props.page;
            let homeTrack = () => {
               eventTracking('Home-Page-Clicks-PWA', 'Header-Clicks','A2HS-icon-clicked|'+prevname(),'IMEvent');
            }

            this.props.page&&this.props.page=='Home'?homeTrack():eventTracking('Custom_A2HS', 'A2HS_clicked',  window.a2hsAddTouchPoint,'IMEvent');
            deferredPromptA2hs.prompt();
            deferredPromptA2hs.userChoice
                .then(function (choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                        this.props.page&&this.props.page=='Home'?homeTrack():eventTracking('Custom_A2HS','A2HS_add', window.a2hsAddTouchPoint ,'IMEvent');
                    } else {
                        this.props.page&&this.props.page=='Home'?homeTrack():eventTracking('Custom_A2HS','A2HS_cancel', window.a2hsAddTouchPoint ,'IMEvent');
                        setTimeout(()=>{document.getElementById("a2hsbt").style.display="inline-block"},50);
                    }
                })
        }
        else {
            this.setState({showA2hsPop:true});
        }
    }

    mountA2HSIcon() {
            clearInterval(this.checkInstallEvnt);

            document.getElementById('vernacularContainer') ? document.getElementById('vernacularContainer').style.right = "48px" : '';
            document.getElementById('hindiNotify') ? document.getElementById('hindiNotify').style.right = "41px" : '';
            return (
                <div id="a2hsbt" className={this.props.checkBothIcons ? "shake_container dib mr15 r40 shakeBtn"  :"shake_container shakeBtn"} key="search" onClick={() => { this.a2hsButton() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="21px" viewBox="0 0 18 18" version="1.1">
                    <g xmlns="http://www.w3.org/2000/svg" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="f-page-not-found-pwa" transform="translate(-286.000000, -99.000000)">
                            <g id="Group-3" transform="translate(286.000000, 99.000000)">
                                <g id="Group-2">
                                    <path d="M1.73962235,0 L11.2643996,0 C11.7395327,-4.97759388e-05 12.1490715,0.334262354 12.2442003,0.799774988 C12.7480668,3.2654445 13,5.79372463 13,8.38461538 C13,10.9869964 12.7458272,13.5893774 12.2374817,16.1917584 C12.1457328,16.6612246 11.7343787,17 11.2560311,17 L1.74770628,17 C1.26796872,16.9999843 0.855826127,16.6592925 0.765576273,16.1881204 C0.255192091,13.5235316 0,10.9223632 0,8.38461538 C0,5.85763856 0.253030455,3.33066174 0.759091366,0.803684919 C0.852632093,0.336344994 1.263013,8.75517169e-17 1.73962235,0 Z" id="Rectangle-Copy" fill="#FFFFFF"/>
                                    <text id="+" font-family="ArialMT, Arial" font-size="15" font-weight="normal" fill="#00A699">
                                        <tspan x="2" y="14">+</tspan>
                                    </text>
                                </g>
                            </g>
                        </g>
                    </g>
                    </svg>
                </div>
            );
    }
    closeA2hsAssist()
    {
        this.setState({showA2hsPop:false});
    }

    a2hsAsistPopup()
    {
        return(
        <div id="a2hs-popup-container" className="mbga2hs" onClick={()=>{this.closeA2hsAssist()}}>
		<div className="box">
			<div className="popup-container">
				<div className="overlay active">
					<div className="popup-content top">
						<div className="a2hs-text">
							<p className="a2hs-instruction">How to add IndiaMART to homescreen ?</p>
							<p className="a2hs-content">1. Tap &nbsp;<i className="dots"> </i>&nbsp;&nbsp; icon on the top right of the screen.</p>
							<p className="a2hs-content">2. Select "Add to Home screen" from the menu.</p>
							<div className="ripple-container ">
								<button className="btn primary flex a2hs-button" onClick={()=>{this.closeA2hsAssist()}}>OKAY, GOT IT</button>
								<div className="ripple "></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>)
    }
    removeUnecesLS()
    {
        if (typeof (Storage) !== "undefined") {
            if(localStorage.getItem('A2HS_success'))
            {
                localStorage.removeItem('A2HS_success');
            }
        }
    }


    componentDidMount() {
        this.removeUnecesLS();
        let is_chrome = ((window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) &&(window.navigator.vendor.toLowerCase().indexOf("google") > -1));
        if(is_chrome && !this.checkAppleDevice())
        {
        let that = this;
        this.checkInstallEvnt = setInterval(function () {
            if (deferredPromptA2hs&&!( window&&window.location&&window.location.pathname&&window.location.pathname.includes('/my/'))) {
                try{
                    ym(idYandex, "params", {
                        'Imlite': {
                            'A2HS_before_install_prompt': {
                                'header' : that.props.page
                            }
                        }
                    });            
                } catch(e){
                    console.log('Yandex tracking failed', e);
                }
                that.setState({ showA2hsIcon: true });
                clearInterval(this.checkInstallEvnt);
                import(/* webpackChunkName:"A2hsCSS" */'../../App/styles/A2hs.css');
            }
        }, 100);
        }
    }
    componentWillUnmount() {
        clearInterval(this.checkInstallEvnt);
    }
    render() {
    if(this.state.showA2hsIcon && !(window&&window.location&&window.location.pathname&&window.location.pathname.includes('/my/'))){
        return (
            <>
                {this.mountA2HSIcon()}
                {this.state.showA2hsPop?this.a2hsAsistPopup():''}
            </>)
        }
        else
        {
            document.getElementById('hindiNotify') ? document.getElementById('hindiNotify').style.right = "8px" : '';
            document.getElementById('vernacularContainer') ? document.getElementById('vernacularContainer').style.right = "10px" : '';
            return;
        }
    }
}