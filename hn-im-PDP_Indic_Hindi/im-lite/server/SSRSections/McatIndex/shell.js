var GblComFunc = require('../../GblComFunc'),
    appShell = GblComFunc.APP_SHELL_STRUCTURE();

    function getHeaderCSS() {
        return `
        <style>
        
        .headImpcat{background-color:#00a699;color:#fff;height:45px;}.logoImpcat{width:118px;height:22px;background-size:100%;background-position:0 -16px;margin:11px 0 0 0; position: absolute;left:44px} .tbSp{background-image:url(https://m.imimg.com/gifs/img/pwa-HS2.png);background-repeat:no-repeat}.pd10{padding:10px;}.dib{display: inline-block;}.fr{float:right;}.pa{position:absolute;}.profileIcon{float:right;display:inline-block;padding:10px 15px 0 1px}.tc{text-align:center;}.ml5{margin-left:5px;}.pl10{padding-left:10px}.dn{display:none;}
        </style>
        `
    }
    

function getHeader() {
    return `
  <input type="hidden" id="page_name" value="postbuy">
  <div id="impcatPwaHeader" class="headImpcat">
  <a id="impcatMIcon" class="dib pd10 pa"><svg xmlns="https://www.w3.org/2000/svg" width="23px" height="23px" viewBox="0 0 459 459"><path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z" fill="#fff"></path></svg></a>

  <a id="homeImpcatBanner"  class="tbSp logoImpcat"></a>

  <div id="smlSrchIcon" class="pd10 dib fr smlSrchIcon"><svg height="21px" width="21px" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 65.06 64.41"><rect x="59.35" y="40.79" width="7.59" height="32.8" rx="1.91" ry="1.91" transform="translate(-33.52 55.13) rotate(-45)" style="fill: rgb(255, 255, 255);"></rect><circle cx="35.65" cy="30.34" r="23.08" transform="translate(-22.59 27.83) rotate(-45)" style="fill: none; stroke: rgb(255, 255, 255); stroke-miterlimit: 10; stroke-width: 2px;"></circle></svg></div>

  <span id="svg" class="profileIcon"><a href="https://m.indiamart.com/my/?ref=/" class="fr tc dib"> <div class="ml5 dib pl10 dn" ><svg width="21px" height="21px" viewBox="0 0 47.2 43.1"><path fill="#fff" d="M23.6,3c4.9,0,8.8,4,8.8,8.8s-4,8.8-8.8,8.8s-8.8-4-8.8-8.8S18.8,3,23.6,3C23.6,3,23.6,3,23.6,3 M23.6,0c-6.5,0-11.8,5.3-11.8,11.8s5.3,11.8,11.8,11.8c6.5,0,11.8-5.3,11.8-11.8C35.5,5.3,30.2,0,23.6,0C23.6,0,23.6,0,23.6,0z"/><path fill="#fff" d="M23.6,28.4c5.2,0.2,19.4,2.2,20.5,9v2.7H3v-3l0,0C3.1,36.4,5,29.6,23.6,28.4 M23.6,25.5C0.3,26.9,0,36.9,0,36.9v6.2h47.2v-5.9C45.8,26.1,23.6,25.4,23.6,25.5L23.6,25.5z"/><circle fill="#fff" cx="23.6" cy="11.8" r="9.9"/><path fill="#fff" d="M41.9,42.1c2.4-1.4,3.8-3.2,3.8-5c0-5-9.8-9-22-9s-22,4-22,9c0,1.9,1.4,3.6,3.8,5"/></svg></div></a></span>

  </div>`
}


function indexShellStruct() {
    appShell.TITLE = '<title>Product Category Listings, Product Suppliers & Manufacturers, Business Services</title>';
    appShell.META = '<meta name="description" content="Search popular product suppliers and service providers from various product and service industries of your interest. Browse  popular product suppliers & exporters, global service providers in India and abroad."><meta name="keywords" content="product suppliers, product manufacturers, popular products, products directory, business services, service providers, global product suppliers, global service providers, business services, latest products, industrial products, industrial products, industrial services">';
    appShell.PRE_CONNECTS = '<link rel="manifest" href="/manifest.json" crossorigin="use-credentials">';
    appShell.ROOT_MT = 'mcatindex';
    appShell.STATE = '';
    appShell.CANONICAL_LINKS = '<link rel="canonical" href="https://dir.indiamart.com/impcat/"><link rel="alternate" media="only screen and (max-width:640px)" href="https://m.indiamart.com/impcat/"><link rel="manifest" href="/manifest.json" crossorigin="use-credentials"/><link rel="icon" sizes="192x192" href="https://m.imimg.com/gifs/im2-192.png"><link rel="apple-touch-icon" href="https://m.imimg.com/apple-touch-icon.png"/><link rel="apple-touch-icon-precomposed" href="https://m.imimg.com/apple-touch-icon-precomposed.png"/>';
    appShell.BODY_SCRIPTS = '';
    appShell.HEAD_SCRIPTS = '';
    appShell.STATUS = 200;
    appShell.FOOTER = 'NFP';
    appShell.IMPCAT_LCP = true;
    appShell.displayLcpDiv = impcatLcpDiv();
}
function impcatLcpDiv() {
    return `
    <style>* {margin: 0;padding: 0;box-sizing: border-box;outline: 0;border: none}.Menu_icon {background-position: 0 2px; cursor: pointer; height: 21px; left: 15px; top: 12px; width: 23px; z-index: 100;}.poa{position: absolute;}.w100{width:100%;} .por{position: relative;}.ht35{height: 35px}.poa{position: absolute;}.inp-head::before{content:" "; height: 16px; width: 100%; top: 3px; position: absolute; z-index: 1;background-color: #00a699}.inp-bx{background: #ffff; height: 35px; border-radius: 18px;  box-shadow: 0 1px 5px 0 #a1a1a1;  border: solid 1.2px #0aa69a; outline-width: thick; background-color: #fff; padding: 0 10px; width: 90%; z-index: 2}.l0{left: 0;} .r0{right: 0;}.mauto{margin:auto;}.srchIcn{margin-top: 8px; position: absolute;left: 11px}.srchIp{font-size: 15px !important; font-weight: 400 !important; width: 85%; padding: 9px 0 0 25px; background: 0 0}.srchIcn::placeholder{color: #a0a0a0}.voiceIcon{top: 0; right: 0; height: 36px; width: 44px; text-align: center; line-height: 48px}.lstyle{list-style: none;}.bgw{background-color: #fff; }.w33{width: 33.33%;}.tc{text-align: center;}.fl{float: left;}.bDirLst1{border-width: 0 1px 1px 0; border-style: solid; border-color: hsl(0, 0%, 88%);}.db{display: block; } .pd10{padding: 10px;}.h240{height:240px; text-decoration: none;}.mt10 {margin-top: 10px;}.ht50p{height: 50px;}.mxhw50{max-height: 50px; max-width: 50px;}.fw{font-weight: 700;}.oh{overflow: hidden;}.clr33{color: #333;}.pdt20{padding-top: 20px;}.h87 { height: 87px;}.fs12{font-size: 12px;}.tp-12{top:-12px;} .wrapper{background-color: #efefef;}.test { padding-left: 15px; padding-top: 10px; background-color: #fff; margin-top: 10px; padding-bottom: 10px; } * { margin: 0; padding: 0; box-sizing: border-box; outline: 0; border: none; } li { display: list-item; text-align: -webkit-match-parent; margin-top: 2px; margin-bottom: 2px; list-style-type: disc;} a, a:active, a:focus, a:hover { text-decoration: none; }.mtm22{    margin-top: -22px;} h2 { padding-bottom: 7px; margin-right: 15px; }</style>
<div id="belowHeader">


    <div id="impcatLcpDiv" class="wrapper mtm22">
    ${hotProducts()}
    ${PopularProd()}
    ${PopularService()}
    </div>
    `
}
function hotProducts(){
    return `<div class="test"><h2>Hot Product Categories</h2><li><a href="/impcat/greenhouse.html"><span>Greenhouse</span></a></li><li><a href="/impcat/chapati-maker.html"><span>Chapati Making Machine</span></a></li><li><a href="/impcat/pu-foam.html"><span>PU Foam</span></a></li><li><a href="/impcat/ladies-kurtis.html"><span>Ladies Kurtis</span></a></li><li><a href="/impcat/ladies-dress-material.html"><span>Ladies Dress Material</span></a></li><li><a href="/impcat/rice-mill.html"><span>Rice Mill</span></a></li><li><a href="/impcat/solar-panels.html"><span>Solar Panels</span></a></li><li><a href="/impcat/cfl-lamps.html"><span>CFL Lamps</span></a></li><li><a href="/impcat/hdpe-pipes.html"><span>HDPE Pipes</span></a></li><li><a href="/impcat/mobile-signal-booster.html"><span>Mobile Signal Booster</span></a></li><li><a href="/impcat/biogas-plant.html"><span>Biogas Plant</span></a></li><li><a href="/impcat/ceiling-fans.html"><span>Ceiling Fans</span></a></li><li><a href="/impcat/electric-rickshaw.html"><span>Electric Rickshaw</span></a></li><li><a href="/impcat/potato-chips.html"><span>Potato Chips</span></a></li><li><a href="/impcat/pvc-doors.html"><span>PVC Doors</span></a></li><li><a href="/impcat/sarees.html"><span>Sarees</span></a></li><li><a href="/impcat/imitation-jewelry.html"><span>Imitation Jewelry</span></a></li><li><a href="/impcat/agarbatti.html"><span>Agarbatti</span></a></li></div>
`
}
function PopularProd(){
    return `<div class="test"><h2>Popular Product Categories</h2><li><a href="/impcat/a4-size-copier-paper.html"><span>A4 Size Copier Paper</span></a></li><li><a href="/impcat/biscuit.html"><span>Biscuit</span></a></li><li><a href="/impcat/a4-paper.html"><span>A4 Paper</span></a></li><li><a href="/impcat/dc-motors.html"><span>DC Motors</span></a></li><li><a href="/impcat/cotton-t-shirts.html"><span>Cotton T-shirts</span></a></li><li><a href="/impcat/led-lights.html"><span>LED Light</span></a></li><li><a href="/impcat/id-card.html"><span>ID Card</span></a></li><li><a href="/impcat/mineral-water-plants.html"><span>Mineral Water Plants</span></a></li><li><a href="/impcat/cctv-camera.html"><span>CCTV Camera</span></a></li><li><a href="/impcat/mobile-phone-accessories.html"><span>Mobile Phone Accessories</span></a></li><li><a href="/impcat/t-shirt-printing-machine.html"><span>Digital T-shirt Printing Machine</span></a></li><li><a href="/impcat/battery-operated-rickshaw.html"><span>Battery Operated Rickshaw</span></a></li><li><a href="/impcat/cotton-waste.html"><span>Cotton Waste</span></a></li><li><a href="/impcat/car-wash-equipment.html"><span>Car Wash Equipment</span></a></li><li><a href="/impcat/readymade-garments.html"><span>Readymade Garments</span></a></li><li><a href="/impcat/men-shirts.html"><span>Men Shirts</span></a></li><li><a href="/impcat/tmt-bars.html"><span>TMT Bars</span></a></li><li><a href="/impcat/gi-sheets.html"><span>GI Sheets</span></a></li><li><a href="/impcat/corrugated-boxes.html"><span>Corrugated Boxes</span></a></li><li><a href="/impcat/ms-pipe.html"><span>MS Pipe</span></a></li><li><a href="/impcat/mineral-water.html"><span>Mineral Water</span></a></li><li><a href="/impcat/conveyor-belt.html"><span>Conveyor Belt</span></a></li><li><a href="/impcat/pet-bottles.html"><span>Pet Bottles</span></a></li><li><a href="/impcat/plastic-crates.html"><span>Plastic Crates</span></a></li><li><a href="/impcat/kundan-jewelry.html"><span>Kundan Jewelry</span></a></li></div>`
}
function PopularService(){
    return `<div class="test"><h2>Popular Service Categories</h2><li><a href="/impcat/data-entry-projects.html"><span>Data Entry Projects</span></a></li><li><a href="/impcat/helicopter-rental-services.html"><span>Helicopter Rental Services</span></a></li><li><a href="/impcat/third-party-inspection-service.html"><span>Third Party Inspection Service</span></a></li><li><a href="/impcat/road-transport.html"><span>Road Transport Services</span></a></li><li><a href="/impcat/garment-job-work.html"><span>Garment Job Work</span></a></li><li><a href="/impcat/mobile-recharge-services.html"><span>Mobile Recharge Services</span></a></li><li><a href="/impcat/pharma-franchise-opportunity.html"><span>Pharma Franchise Opportunity</span></a></li><li><a href="/impcat/truck-rentals.html"><span>Truck Rentals</span></a></li><li><a href="/impcat/pharmaceutical-consultants.html"><span>Pharmaceutical Consultants</span></a></li><li><a href="/impcat/tower-installation-services.html"><span>Tower Installation Services</span></a></li><li><a href="/impcat/franchise-opportunities.html"><span>Franchise Opportunities</span></a></li><li><a href="/impcat/project-finance-consultants.html"><span>Project Finance Consultants</span></a></li><li><a href="/impcat/pharmaceutical-distributors.html"><span>Pharmaceutical Distributors</span></a></li><li><a href="/impcat/testlab.html"><span>Testing Laboratories</span></a></li><li><a href="/impcat/machining-job-work.html"><span>Machining Job Work</span></a></li><li><a href="/impcat/labour-contractors.html"><span>Labour Contractors</span></a></li>
    <li><a href="/impcat/electrical-contractor.html"><span>Electrical Contractor</span></a></li><li><a href="/impcat/civil-construction-contractors.html"><span>Civil Construction Contractors</span></a></li><li><a href="/impcat/import-export-license.html"><span>Import Export License</span></a></li><li><a href="/impcat/embroidery-job-work.html"><span>Embroidery Job Work</span></a></li><li><a href="/impcat/cnc-job-work.html"><span>CNC Job Work</span></a></li><li><a href="/impcat/data-entry-work.html"><span>Data Entry Work</span></a></li><li><a href="/impcat/isi-mark-consultant.html"><span>ISI Mark Consultant</span></a></li><li><a href="/impcat/goods-transport-services.html"><span>Goods Transport Services</span></a></li><li><a href="/impcat/stage-decoration.html"><span>Stage Decoration</span></a></li><li><a href="/impcat/roof-gardening-services.html"><span>Roof Gardening Services</span></a></li><li><a href="/impcat/digital-signature-services.html"><span>Digital Signature Services</span></a></li><li><a href="/impcat/food-testing-laboratory.html"><span>Food Testing Laboratory</span></a></li><li><a href="/impcat/construction-equipment-rental.html"><span>Construction Equipment Rental</span></a></li><li><a href="/impcat/material-testing-laboratories.html"><span>Material Testing Laboratories</span></a></li><li><a href="/impcat/lic-agent.html"><span>LIC Agent</span></a></li><li><a href="/impcat/air-conditioning-contractors.html"><span>Air Conditioning Contractors</span></a></li><li><a href="/impcat/earthmoving-equipment-rental.html"><span>Earthmoving Equipment Rental</span></a></li></div>`
}
function getIndexPage(req, res, shellCallBck) {
    indexShellStruct();
    shellCallBck(res, appShell)
}

module.exports = getIndexPage;