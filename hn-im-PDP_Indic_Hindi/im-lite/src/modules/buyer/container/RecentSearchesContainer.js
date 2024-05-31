import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import recentsearches from '../components/recentsearches';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
get_recentsearches: state.get_recentsearches,
searches_loading : state.searches_loading,	 
});


const mapDispatchToProps = (dispatch) => ({
	
	getrecentsearches: (glid) => dispatch(imActionCreatorBuyer.getrecentsearches(glid))
})

export default connect(mapStateToProps,mapDispatchToProps)(recentsearches);
