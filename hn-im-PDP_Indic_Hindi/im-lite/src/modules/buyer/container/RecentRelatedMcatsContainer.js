import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import recentRelatedMcats from '../components/recentRelatedMcats';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
	get_recentrelatedmcats: state.get_recentrelatedmcats,
	results_loading : state.results_loading,	

	 
});


const mapDispatchToProps = (dispatch) => ({
	getrecentrelatedmcats: (mcats) => dispatch(imActionCreatorBuyer.getrecentrelatedmcats(mcats))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(recentRelatedMcats);
