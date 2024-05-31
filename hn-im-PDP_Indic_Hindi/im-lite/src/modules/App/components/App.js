/* File Header*/
/*
* Author - Pushpendra -33501
* File content  - Preparing app shell
* Deps : React, router app.css
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './Menu';
import 'babel-polyfill';
//import './App.css';
/*import EnqListing from './Enqlisting.js'*/

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {leftDrawer : false};
        this.toggleMenu = this.toggleMenu.bind(this);
    }
  
    toggleMenu()
    {
        this.setState({leftDrawer : !this.state.leftDrawer});
        document.body.className = document.body.className.replace("oh","");
    }

    render(){
          return (
    	<div>
        <i id="MenuIconPwa" className="Menu_icon tbSp" onClick={() => {this.toggleMenu(); var bodyclass=document.createAttribute("class"); bodyclass.value="oh";document.getElementsByTagName("body")[0].setAttributeNode(bodyclass);}}></i>
        <div className="tc">
        <p className="wtxt">Welcome to IndiaMART LITEEEE</p>
    	<Link to="/enq" className="enqbtn">Sent Enquiries Listing</Link>
    	<p className="senqtxt">Tap here to see your sent enquiries.</p>
    	<Link to="/products" className="enqbtn">My Products Listing</Link>
        <p className="senqtxt">Tap here to see My Products</p>	
        <Link to="/bl" className="enqbtn">Buylead listing</Link>
        </div>
        {this.state.leftDrawer &&  <Menu toggleMenu={this.toggleMenu}/>}
        </div>
    );
    }

 
}



export default App;


