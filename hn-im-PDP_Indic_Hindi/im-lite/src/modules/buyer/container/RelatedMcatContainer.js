import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import Relatedmcat from '../components/relatedMcat';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
get_relatedmcat: state.get_relatedmcat,
// searches_loading : state.searches_loading,
// updatecats : state.updatecats	 
});


const mapDispatchToProps = (dispatch) => ({
	getrelatedmcat: (MCAT_ID) => dispatch(imActionCreatorBuyer.getrelatedmcat(MCAT_ID))
})

export default connect(mapStateToProps,mapDispatchToProps)(Relatedmcat);
