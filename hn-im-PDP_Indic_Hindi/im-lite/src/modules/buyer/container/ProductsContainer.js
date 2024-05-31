import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import products from '../components/products';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
get_products: state.get_products,
products_loading : state.products_loading,
});


const mapDispatchToProps = (dispatch) => ({
	getproducts: (modid, mcats, count) => dispatch(imActionCreatorBuyer.getproducts(modid, mcats, count))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(products);
