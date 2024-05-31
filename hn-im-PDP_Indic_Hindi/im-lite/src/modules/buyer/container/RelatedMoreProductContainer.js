// @Author ~~~Harkanwal Singh~~~ moreproduct hsingh

import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import  RelatedMoreProducts from '../components/relatedMoreProduct';


const mapStateToProps = (state) => ({
get_more_relatedproducts: state.get_more_relatedproducts,
});


const mapDispatchToProps = (dispatch) => ({
	
	getmorerelatedproducts: (mcatid, city, prods, displayID) => dispatch(imActionCreatorBuyer.getmorerelatedproducts(mcatid, city, prods,displayID)),
	updatestate: () => dispatch(imActionCreatorBuyer.updatestate()),

})

export default connect(mapStateToProps,mapDispatchToProps)(RelatedMoreProducts);
