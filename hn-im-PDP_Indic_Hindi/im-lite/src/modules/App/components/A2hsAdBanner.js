import React, {Component} from 'react';
import '../styles/A2hsAdBanner.css';

class A2hsAdBanner extends Component {

    constructor(props){
        super(props);
        this.showPrompt = this.showPrompt.bind(this);
        this.state = {
            close: false
        }
        this.impressionTrking=this.impressionTrking.bind(this);
        this.fireTracking=this.fireTracking.bind(this);
    }

    componentDidMount(){
        window.addEventListener("scroll",this.impressionTrking,{passive:true});
        try{
            ym(idYandex, "params", {
                'Imlite': {
                    'A2HS_before_install_prompt': {
                        [this.props.slotName.split('/')[2]]: this.props.page
                    }
                }
            });            
        } catch(e){
            console.log('Yandex tracking failed', e);
        }
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.impressionTrking,false);
    }
    fireTracking(){
        try{
            ym(idYandex, "params", {
                'Banner Impressions': {
                    'IM-Lite': {
                        [this.props.slotName.split('/')[2]]: this.props.page
                    }
                }
            });            
        } catch(e){
            console.log('Yandex tracking failed', e);
        }
         window.removeEventListener('scroll',this.impressionTrking,false);
    }
    impressionTrking(){
        if(document.getElementsByClassName("a2banner")[1]){
            if(window.scrollY+window.innerHeight>(document.getElementsByClassName("a2banner")[1].getBoundingClientRect().top+window.scrollY)){
                this.fireTracking();
            }
        }
        if(document.getElementsByClassName("a2banner")[0] && !document.getElementsByClassName("a2banner")[1]){
            if(window.scrollY+window.innerHeight>(document.getElementsByClassName("a2banner")[0].getBoundingClientRect().top+window.scrollY)){
                this.fireTracking()
            }
        }   
    }

    showPrompt() {
        window.a2hsAddTouchPoint = this.props.slotName.split('/')[2] + ' | ' + this.props.page;
        try{
            ym(idYandex, "params", {
                'Imlite': {
                    'A2HS_clicked': {
                        [this.props.slotName.split('/')[2]] : this.props.page
                    }
                }
            });            
        } catch(e){
            console.log('Yandex tracking failed', e);
        }
        deferredPromptA2hs.prompt();
        deferredPromptA2hs
        .userChoice
        .then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                try{
                    ym(idYandex, "params", {
                        'Imlite': {
                            'A2HS_add': {
                                [this.props.slotName.split('/')[2]] : this.props.page
                            }
                        }
                    });            
                } catch(e){
                    console.log('Yandex tracking failed', e);
                }
                this.setState({
                    close: true
                })
            } else {
                try{
                    ym(idYandex, "params", {
                        'Imlite': {
                            'A2HS_cancel': {
                                [this.props.slotName.split('/')[2]] : this.props.page
                            }
                        }
                    });            
                } catch(e){
                    console.log('Yandex tracking failed', e);
                }
            }
        })
    }

    render(){

        return (
            <div className='w80 ma  bxrd6 bgrdImg1 shdw pdt5 pdb5 por clrw oh a2banner' style={this.state.close ? {display: 'none'} : null}>
                <div className='w70 ma fw mt10 fs16'>
                    Enjoy app-like experience on IndiaMART Lite 
                </div>
                <div className='dflx'>
                    <img src='https://m.imimg.com/gifs/a2hs_shake.gif' className="w50 dib trf"/> 
                    <ul className="w50 mt30 dib">
                        <li className="mb15">
                            <svg className="fl" width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>running</title>
                                <desc>Created with Sketch.</desc>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="a2hs-inline-banner" transform="translate(-179.000000, -385.000000)" fill="#FFF" fill-rule="nonzero">
                                        <g id="running" transform="translate(179.000000, 385.000000)">
                                            <path d="M3.58939802,1.61904762 L1.26774483,1.61904762 C1.0144708,1.61904762 0.80952381,1.80008413 0.80952381,2.02380952 C0.80952381,2.24753492 1.0144708,2.42857143 1.26774483,2.42857143 L3.58939802,2.42857143 C3.84267206,2.42857143 4.04761905,2.24753492 4.04761905,2.02380952 C4.04761905,1.80008413 3.84267206,1.61904762 3.58939802,1.61904762 Z" id="Path"></path>
                                            <path d="M3.58939802,5.66666667 L1.26774483,5.66666667 C1.0144708,5.66666667 0.80952381,5.84770317 0.80952381,6.07142857 C0.80952381,6.29515397 1.0144708,6.47619048 1.26774483,6.47619048 L3.58939802,6.47619048 C3.84267206,6.47619048 4.04761905,6.29515397 4.04761905,6.07142857 C4.04761905,5.84770317 3.84267206,5.66666667 3.58939802,5.66666667 Z" id="Path"></path>
                                            <path d="M2.77987421,3.23809524 L0.458221024,3.23809524 C0.20494699,3.23809524 0,3.41913175 0,3.64285714 C0,3.86658254 0.20494699,4.04761905 0.458221024,4.04761905 L2.77987421,4.04761905 C3.03314825,4.04761905 3.23809524,3.86658254 3.23809524,3.64285714 C3.23809524,3.41913175 3.03314825,3.23809524 2.77987421,3.23809524 Z" id="Path"></path>
                                            <path d="M16.0009049,6.15295254 L12.9703166,6.15295254 L12.9703166,4.21021488 C12.9703166,3.35715878 11.8969888,2.90799783 11.2645283,3.52371615 L7.26844787,7.40890006 C6.87816804,7.78834911 6.87816804,8.4030313 7.26844787,8.78248034 L9.55933952,11.0097967 L6.76890035,13.7227975 C6.37862052,14.1022465 6.37862052,14.7169287 6.76890035,15.0963777 C7.15914688,15.4757944 7.79140753,15.4758268 8.18168736,15.0963777 L11.67852,11.6965868 C12.0687999,11.3171378 12.0687999,10.7024556 11.67852,10.3230066 L9.38762839,8.0956902 L10.9721265,6.555164 L10.9721265,7.12432137 C10.9721265,7.66074362 11.419488,8.0956902 11.9712216,8.0956902 L16.0009049,8.0956902 C16.5526385,8.0956902 17,7.66074362 17,7.12432137 C17,6.58789913 16.5526385,6.15295254 16.0009049,6.15295254 Z" id="Path"></path>
                                            <path d="M9.63153344,0.981103781 C9.26544537,0.710967864 8.77974314,0.764415576 8.46940951,1.10892835 L5.93651232,3.92106882 C5.57671811,4.32052911 5.57671811,4.9676282 5.93651232,5.36708849 C6.29630653,5.76654878 6.8791799,5.7665147 7.23897411,5.3670544 L9.23802867,3.14761089 L9.91144161,3.68617839 L10.8111881,2.68723793 C10.9616882,2.52014565 11.139206,2.39044632 11.3333333,2.28917518 L9.63153344,0.981103781 Z" id="Path"></path>
                                            <path d="M6.61165284,9.03603931 C6.37010171,8.77189074 6.20885576,8.44678749 6.12384731,8.0952381 L1.08883617,13.6012814 C0.716419688,14.0085379 0.716419688,14.6682664 1.08883617,15.075523 C1.46122088,15.4827448 2.06454258,15.4827796 2.43695906,15.075523 L7.28571429,9.77316012 L6.61165284,9.03603931 Z" id="Path"></path>
                                            <circle id="Oval" cx="13.7619048" cy="1.61904762" r="1.61904762"></circle>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="pdl10">Super fast</span>
                        </li>
                        <li className="mb15">
                            <svg className="fl" width="14px" height="12px" viewBox="0 0 14 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>hard-drive</title>
                                <desc>Created with Sketch.</desc>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="a2hs-inline-banner" transform="translate(-179.000000, -419.000000)" fill="#FFF" fill-rule="nonzero">
                                        <g id="hard-drive" transform="translate(179.000000, 419.000000)">
                                            <path d="M13.9308824,6.85012684 C13.928126,6.84444444 11.6596028,0.659157788 11.6513336,0.644951801 C11.4501158,0.24718417 11.0531932,0 10.6176808,0 L3.38486814,0 C2.94935579,0 2.55243314,0.24718417 2.35121541,0.644951801 C2.34294619,0.659157788 0.0716665893,6.84444444 0.0716665893,6.85012684 C0.0275640728,6.97798072 0,7.11719939 0,7.25925926 L0,9.99817352 C0,10.6601725 0.523717383,11.2 1.16596028,11.2 L12.8338323,11.2 C13.4760752,11.2 13.9997926,10.6601725 13.9997926,9.99817352 L13.9997926,7.25925926 C14.002549,7.11435819 13.9777413,6.97798072 13.9308824,6.85012684 Z M12.8365887,10.3987823 L1.16596028,10.3987823 C0.950960512,10.3987823 0.777306853,10.2197869 0.777306853,9.99817352 L0.777306853,7.25925926 C0.777306853,7.03764587 0.950960512,6.85865043 1.16596028,6.85865043 L12.8338323,6.85865043 C13.0488321,6.85865043 13.2224857,7.03764587 13.2224857,7.25925926 L13.2224857,9.99817352 L13.2252421,9.99817352 C13.2252421,10.2197869 13.0515885,10.3987823 12.8365887,10.3987823 Z" id="Shape"></path>
                                            <path d="M7.95746112,8.4 L1.37587222,8.4 C1.13106347,8.4 0.933333333,8.60851064 0.933333333,8.86666667 C0.933333333,9.1248227 1.13106347,9.33333333 1.37587222,9.33333333 L7.95746112,9.33333333 C8.20226986,9.33333333 8.4,9.1248227 8.4,8.86666667 C8.4,8.60851064 8.20226986,8.4 7.95746112,8.4 Z" id="Path"></path>
                                            <path d="M12.5381526,8.4 L11.7285141,8.4 C11.4361446,8.4 11.2,8.60851064 11.2,8.86666667 C11.2,9.1248227 11.4361446,9.33333333 11.7285141,9.33333333 L12.5381526,9.33333333 C12.8305221,9.33333333 13.0666667,9.1248227 13.0666667,8.86666667 C13.0666667,8.60851064 12.8305221,8.4 12.5381526,8.4 Z" id="Path"></path>
                                            <path d="M9.73815261,8.4 L8.92851406,8.4 C8.63614458,8.4 8.4,8.60851064 8.4,8.86666667 C8.4,9.1248227 8.63614458,9.33333333 8.92851406,9.33333333 L9.73815261,9.33333333 C10.0305221,9.33333333 10.2666667,9.1248227 10.2666667,8.86666667 C10.2666667,8.60851064 10.0305221,8.4 9.73815261,8.4 Z" id="Path"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="pdl10">Save space</span>
                        </li>
                        <li className="mb15">
                            <svg className="fl" width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>Group</title>
                                <desc>Created with Sketch.</desc>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="a2hs-inline-banner" transform="translate(-180.000000, -446.000000)">
                                        <g id="Group" transform="translate(180.000000, 446.000000)">
                                            <path d="M9.1652,1.3335999e-12 C9.09736667,1.3335999e-12 1.83333333,1.3335999e-12 1.83333333,1.3335999e-12 C1.83333333,1.3335999e-12 1.83333333,1.3335999e-12 1.83296667,1.3335999e-12 C1.34346667,1.3335999e-12 0.8833,0.196884058 0.537166667,0.554304348 C0.191033333,0.911724638 0,1.38765399 0,1.89311594 L0,2.64960507 C0,2.6499837 0,2.6499837 0,2.65036232 C0,2.65074094 0,2.65074094 0,2.65111957 L0,15.5235507 C0,16.5674149 0.822433333,17.4166667 1.83333333,17.4166667 L9.16666667,17.4166667 C10.1775667,17.4166667 11,16.5674149 11,15.5235507 L11,1.89311594 C11,0.849251812 10.1775667,1.3335999e-12 9.1652,1.3335999e-12 Z" id="Path" fill="#5A5A5B" fill-rule="nonzero"></path>
                                            <path d="M0.6875,1.86216679 C0.6875,1.54533184 0.803004442,1.2470877 1.01291155,1.02320682 C1.22244846,0.799325939 1.50121399,0.675519021 1.79774943,0.675519021 L5.4998149,0.675519021 C7.96316926,0.675519021 8.85277559,0.675519021 9.20188036,0.645061728 L9.20188036,0.675519021 C9.81420199,0.675519021 10.3125,1.20792832 10.3125,1.86216679 L10.3125,2.25771605 L0.6875,2.25771605 L0.6875,1.86216679 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path>
                                            <path d="M0.785714286,16.3620326 C0.785714286,16.0451976 0.901218728,15.7469535 1.11112584,15.5230726 C1.32066275,15.2991917 1.59942827,15.1753848 1.89596372,15.1753848 L5.59802918,15.1753848 C8.06138354,15.1753848 8.95098987,15.1753848 9.30009465,15.1449275 L9.30009465,15.1753848 C9.91241627,15.1753848 10.4107143,15.7077941 10.4107143,16.3620326 L10.4107143,16.7575819 L0.785714286,16.7575819 L0.785714286,16.3620326 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero" transform="translate(5.598214, 15.951255) scale(1, -1) translate(-5.598214, -15.951255) "></path>
                                            <line x1="5.05847222" y1="4.58333333" x2="5.05847222" y2="11.2226284" id="Path-3" stroke="#FFFFFF" stroke-width="0.7" stroke-linecap="round" fill-rule="nonzero"></line>
                                            <polyline id="srchFtrLine" stroke="#FFFFFF" stroke-width="0.7" stroke-linecap="round" points="2.75 9.42448599 5.04166667 11.6375843 7.33333333 9.42448599"></polyline>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="pdl10">Installs quickly</span>
                        </li>
                    </ul>                
                </div> 
                
                <button className="db ma bgw clrB pd1250 mb15  bxrd4 bxsdw poa bt0 lt20 w70 fw" onClick={this.showPrompt}>ADD SHORTCUT  <div className="dib poa  t0 r0  w100px"> <div className="arrow arrow-first"></div> <div className="arrow arrow-second"></div></div></button>
            </div>
        )

    }

}

export default A2hsAdBanner;