import {connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import recommendedMcatidentified from '../components/recommendedMcatidentified';
import '../css/buyerIndex.css';

const mapStateToProps = (state) => ({
    recommended: state.recommended,
    getmcats : state.getmcats,
updatemcats : state.updatemcats
});


const mapDispatchToProps = (dispatch) => ({
	getrecommendedidentified: (glid) => dispatch(imActionCreatorBuyer.getrecommendedidentified(glid))
}
)


export default connect(mapStateToProps,mapDispatchToProps)(recommendedMcatidentified);

