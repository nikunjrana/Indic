import React, {Component} from 'react';
import gblFunc from "../../../Globals/GlobalFunctions";
import Menu from './Menu';


class TestDemo extends Component  {
    constructor(props){
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state={leftDrawer:false};
    }
    toggleMenu(){
       this.setState({leftDrawer : !this.state.leftDrawer});
       document.body.className = document.body.className.replace("oh","");
    }
    render() {
        document.getElementById("gblLoader").style.display = "none";
        return (

                 <div>
                      <i className="Menu_icon tbSp" onClick={() => {this.toggleMenu(); var bodyclass=document.createAttribute("class"); bodyclass.value="oh";document.getElementsByTagName("body")[0].setAttributeNode(bodyclass);}}>
                    </i>  
                    {this.state.leftDrawer &&  <Menu toggleMenu={this.toggleMenu}/>}
                        <h1> Testing Demo Here </h1>
                        <ul>
                        <li>
                            <a href ="https://m.indiamart.com/proddetail.php?i=8299493273">Click here for Sticky notes</a>
                        </li>
                            <li>
                                <a href ="https://m.indiamart.com/proddetail.php?i=11590169573">Click here for Notebooks</a>
                            </li>
                           <li>
                                <a href ="https://m.indiamart.com/proddetail.php?i=8299493273">Click here for Sticky notes</a>
                            </li>
                        </ul>
            </div>
            );
    }
}
export default TestDemo;