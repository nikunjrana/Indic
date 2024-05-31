import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import premium from '../components/premium';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
premium_brands: state.premium_brands,
getbrands : state.getbrands,
updatebrands : state.updatebrands
});


const mapDispatchToProps = (dispatch) => ({
	getpremium: (glid,ga,mode) => dispatch(imActionCreatorBuyer.getpremium(glid,ga,mode))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(premium);
