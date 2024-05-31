import React, {Component} from 'react';
import {Link} from 'react-router';
import {eventTracking} from '../../../Globals/GaTracking';
import '../css/topInd.css';
import {tinsImg, tinsImgWebP, tinsImg2, tinsImg2WebP} from  '../webPcss/TopIndustriesCss';

class Topindustries extends Component{
	constructor(props){
		super(props);
		this.handleScrollCarousal = this.handleScrollCarousal.bind(this);
		this.webP = JSON.parse(localStorage.getItem("webPSupport"));
		if(!this.webP)
		{   this.webP={}
		}
	}
	componentWillMount(){
		if(this.webP['val'] == true)
			this.setState({ tinsImg: tinsImgWebP });
		else			
			this.setState({ tinsImg: tinsImg });		
	}
	componentDidMount(){	
		if(window.screen && (window.screen.width < 414 )){
			var nodes = document.getElementsByClassName('scWrap');
			for(var i=0; i<nodes.length; i++) {
					nodes[i].addEventListener('scroll', this.handleScrollCarousal);			
			}
		}
		else{
			if(this.webP['val'] == 'true')
				this.setState({ tinsImg2: tinsImg2WebP });
			else			
				this.setState({ tinsImg2: tinsImg2 });			
		}

	}
	handleScrollCarousal(){
		if(this.webP['val'] == 'true')
			this.setState({ tinsImg2: tinsImg2WebP });
		else			
			this.setState({ tinsImg2: tinsImg2 });	
		
		var nodes = document.getElementsByClassName('scWrap');
		for(var i=0; i<nodes.length; i++) {
				nodes[i].removeEventListener('scroll', this.handleScrollCarousal);			
		}			
	}
	render(){
		const industries = [


			['apparel-garments','apparel-garments','Apparel & Garments','Apparel',
			'Men-Shirts-Jeans-Clothing','mens-clothing-apparel','Men Shirts, Jeans & Clothing',
			'Sarees-Lehenga-Salwar-Suits','sari-salwar-kameez-suits','Sarees, Lehenga & Salwar Suits',
			'Ladies-Dresses-Apparels-Clothings','womens-clothing-apparel','Ladies Dresses, Apparels & Clothings',
			'Apparel-Fabrics-Dress-Materials','textile-fabric-manufacturers','Apparel Fabrics & Dress Materials',
			'Winter-Wear-Accessories','wool-woolen-textiles-clothings','Winter Wear & Accessories'
		],
		['electronic-goods','electronic-goods','Electronics & Electricals','Electronics-Electrical',
			'Domestic-Fans-AC-Coolers','industrial-fans-manufacturers','Domestic Fans, AC & Coolers',
			'Home-Appliances-Machines','home-appliances','Home Appliances & Machines',
			'Mobile-Phone-Accesssories','phone-mobile-accessories','Mobile Phone & Accessories',
			'Indoor-Lights-Lighting-Accessories','led-light-bulbs','Indoor Lights & Lighting Accessories',
			'Solar-Renewable-Energy-Products','solar-energy','Solar & Renewable Energy Products'
		],
			['plant-machinery','plant-machinery','Industrial Plant & Machine','Industrial-Plant-Machines',
			'Machines-Equipments','plants-machinery','Machines & Equipments',
			'Printing-Machinery','printing-equipment-machines','Printing Machinery & Equipment',
			'Food-Processing-Plants','food-processing-equipment','Food Processing Plants & Machinery',
			'Water-Treatment-Purification-Plant','water-treatment-equipment','Water Treatment & Purification Plant',
			'Plastic-Work-Processing-Machines','plastic-extrusion-molding-equipment','Plastic Work & Processing Machines'
		],
			
			['builders-hardware','builders-hardware','Building & Construction','Building-Construction',
			'Doors-Windows','frameworks','Doors & Windows',
			'Bricks-Concrete-Building-Material','asphalt-concrete','Bricks, Concrete & Building Material',
			'Building-Construction-Machines','construction-equipment','Building & Construction Machines',
			'Paints-Wall-Putty-Varnishes','paints-varnishes-distempers-enamels','Paints, Wall Putty & Varnishes',
			'Ceramic-Glass-Vitrified-Tiles','floorings-ceramic','Ceramic, Glass & Vitrified Tiles'
	]];
		const cats = [2,3,1,6];
		let listitems = '';
		let c = 0, cn = 0;
		let TrackPage = this.props.page + '-Page-Clicks-PWA';
		listitems = industries.map((category,index)=>{
			let class0 = 'dib clrb pd5 w100 mt5'
			if(c!=0)
				class0 = 'dib clrb pd5 w100 mt5'
			let class1 = 'htopInd ml5 cat'+cats[index]+' fl';
			let class2 = (c==0)?'imgC w100 bgRp bgSz ht125px w125p':'imgC'+c+' w100 bgRp bgSz ht125px w125p';
			let class3 = 'imgC'+(c+1)+' w100 bgRp bgSz ht125px w125p';
			let class4 = 'imgC'+(c+2)+' w100 bgRp bgSz ht125px w125p';
			let class5 = (cn==0)?'imgC w100 bgRp bgSz2 ht125px w125p':'imgCn'+(cn)+' w100 bgRp bgSz2 ht125px w125p';
			let class6 = 'imgCn'+(cn+1)+' w100 bgRp bgSz2 ht125px w125p';
			let href1 = '/dir/'+category[0]+'/';
			let href2 = '/suppliers/'+category[5]+'/';
			let href3 = '/suppliers/'+category[8]+'/';
			let href4 = '/suppliers/'+category[11]+'/';
			let href5 = '/suppliers/'+category[14]+'/';
			let href6 = '/suppliers/'+category[17]+'/';
			c+=3;
			cn+=2;
			return(
			<div class="bgw mb10 pdb5">
				
                	<Link class={class0} to={href1} onClick={()=>eventTracking(TrackPage,'Category-Button',category[3],true)}>
                    	<span style="background-image: url('https://m.imimg.com/gifs/img/industry-icon.png');" class={class1}></span>
                    	<span class="db fl catname fs16 pl10 pr10 fw clrBl">{category[2]}</span>
                    	
                	</Link>
                	<ul class= "scWrap tc pl10 bgw scWrap hmCarsel ht225p pdt5 pdb5" style="align-items:center;padding-left: 10px!important;">
                    	<li class="dib mr10 bxrd4 bxsdw3 bgw vat" onClick={()=>eventTracking(TrackPage,'Category-Button-'+category[3],category[4],true)}>
                        	<a href={href2}  >
                            	<div style={this.state.tinsImg} class={class2}></div>
                            	<div class="tc wr oh ht60p mt5 lh20">
                                	<span><span class="clrb vam dtc fs14 ht60p">{category[6]}</span></span>
                            	</div>
                        	</a>
                    	</li>
                    	<li class="dib mr10 bxrd4 bxsdw3 bgw vat" onClick={()=>eventTracking(TrackPage,'Category-Button-'+category[3],category[7],true)}>
                        	<a href={href3}  >
                            	<div style={this.state.tinsImg} class={class3}></div>
                            	<div class="tc wr oh ht60p mt5 lh20">
                                    <span><span class="clrb vam dtc fs14 ht60p">{category[9]}</span></span>
                            	</div>
                        	</a>
                    	</li>
                    	<li class="dib mr10 bxrd4 bxsdw3 bgw vat" onClick={()=>eventTracking(TrackPage,'Category-Button-'+category[3],category[10],true)}>
                        	<a href={href4}  >
                            	<div style={this.state.tinsImg} class={class4}></div>
                            	<div class="tc wr oh ht60p mt5 lh20">
                                    <span><span class="clrb vam dtc fs14 ht60p">{category[12]}</span></span>
                            	</div>
                        	</a>
                    	</li>
						<li class="dib mr10 bxrd4 bxsdw3 bgw vat" onClick={()=>eventTracking(TrackPage,'Category-Button-'+category[3],category[13],true)}>
                        	<a href={href5}  >
                            	<div style={this.state.tinsImg2} class={class5}></div>
                            	<div class="tc wr oh ht60p mt5 lh20">
                                	<span><span class="clrb vam dtc fs14 ht60p">{category[15]}</span></span>
                            	</div>
                        	</a>
                    	</li>
                    	<li class="dib mr10 bxrd4 bxsdw3 bgw vat" onClick={()=>eventTracking(TrackPage,'Category-Button-'+category[3],category[16],true)}>
                        	<a href={href6}  >
                            	<div style={this.state.tinsImg2} class={class6}></div>
                            	<div class="tc wr oh ht60p mt5 lh20">
                                    <span><span class="clrb vam dtc fs14 ht60p">{category[18]}</span></span>
                            	</div>
                        	</a>
                    	</li>
						<li>
        <Link to={href1} onClick={()=>eventTracking(TrackPage,'Category-Button-'+category[3],'View-All',true)} className="dib vam mt60">
                <div className="bgw bxrd100 por bxsh15 vam" style="width:56px;height:56px;margin:0 auto;">
                    <span className="poa cntr" style="width:24px;height:24px;">
                        <svg fill="#4285f4" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                        </svg>
                    </span>                 
                </div>
                    <div className="mt10 clr5a">View All</div>
                </Link>
        </li>
                	</ul>
            	
			</div>
				)
		})
		return(
			<div>
				<section class="pdt10" id="Home"> 
        			<h2 class="pdb10 fs18 ml10 mr10 fw">Top Industries</h2>
        				<ul>
        					{listitems}
        				</ul>
        		</section>
        		<div class="crb"></div>
				<Link to="/dir/" class="bxsdw bxrd20 clrw pdtb105 fs14 ma db w70 tc mt10 mb10 compCl fw" onClick={()=>eventTracking(TrackPage, 'Category-Button', 'View-All',true)}>Browse All Industries</Link>	
			</div>
			)
	}
}


export default Topindustries;