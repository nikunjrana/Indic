import { connect } from 'react-redux';
import imActionFilter from './imActionFilter';
import Filter from './Filter';

const mapStateToProps = (state) => ({
    selectedCityInFilter: state.selectedCityInFilter,
    cityListInFilter: state.cityListInFilter,
    handleCitySelect: state.handleCitySelect,
    toggleState: state.toggleState
});


const mapDispatchToProps = (dispatch) => ({
    updateCityList: (cityList, selCity) => dispatch(imActionFilter.updateCityList(cityList, selCity)),
    updateToggleState: (detectMyLocClicked) => dispatch(imActionFilter.updateToggleState(detectMyLocClicked)),
    updateHandleCitySelect: (handleCitySel) => dispatch(imActionFilter.updateHandleCitySelect(handleCitySel))
})


export default connect(mapStateToProps, mapDispatchToProps)(Filter);
