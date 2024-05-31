import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import stdproduct from '../components/stdproduct';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
stdproducts: state.stdproducts
});


const mapDispatchToProps = (dispatch) => ({
	getstdproducts: (mcatid,counter) => dispatch(imActionCreatorBuyer.getstdproducts(mcatid,counter))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(stdproduct);
