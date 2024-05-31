// @Author ~~~Harkanwal Singh~~~ seller near me

import { connect } from 'react-redux';
import imActionCreatorBuyer from '../action/imActionCreatorBuyer';
import RecommendedMcat from '../components/recommendedMcat';
// import imActionSearch from '../../Search/actions/imActionSearch';

const mapStateToProps = (state) => ({
	get_sellernearme: state.get_sellernearme,
	city_data_mcat: state.city_data_mcat,
	isFetchingLocation_mcat: state.isFetchingLocation_mcat,
	selectedCityInFilter: state.selectedCityInFilter

});


const mapDispatchToProps = (dispatch) => ({

	getsellernearme: (mcatid, city, prods, displayID) => dispatch(imActionCreatorBuyer.getsellernearme(mcatid, city, prods, displayID)),
	updatestate: () => dispatch(imActionCreatorBuyer.updatestate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedMcat);
