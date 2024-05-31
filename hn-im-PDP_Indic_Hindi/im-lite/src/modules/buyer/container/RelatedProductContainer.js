// @Author ~~~Harkanwal Singh~~~

import { connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import '../css/buyerIndex.css';
import RelatedProducts from '../components/relatedproduct';

const mapStateToProps = (state) => ({
	get_relatedproducts: state.get_relatedproducts,
	searches_loading: state.searches_loading,
	updateprods: state.updateprods,
	hitCount: state.hitCount,

	selectedCityInFilter: state.selectedCityInFilter

});


const mapDispatchToProps = (dispatch) => ({
	getrelatedproducts: (mcatid, city, prods,ecomflag,pageType) => dispatch(imActionCreatorBuyer.getrelatedproducts(mcatid, city, prods, ecomflag,pageType)),
	updatestate: () => dispatch(imActionCreatorBuyer.updatestate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelatedProducts);
