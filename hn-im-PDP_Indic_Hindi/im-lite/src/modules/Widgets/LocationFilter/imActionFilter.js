let imActionFilter = {
    updateCityList: (cityList, selCity = { cityname: '', cityid: '' }) => {
        return (dispatch) => {
            dispatch({ type: 'SET_LOCATIONS_FILTER_WIDGET', cityList, selCity})
        }
    },

    updateHandleCitySelect: (handleCitySel) => {
        return (dispatch) => {
            dispatch({ type: 'SET_HANDLE_CITY_SELECT', handleCitySel })
        }
    },

    updateToggleState: (detectMyLocClicked) => {
        return (dispatch) => {
            dispatch({ type: 'UPDATE_LOCATION_TOGGLE_STATE', detectMyLocClicked })
        }
    }

}
export default imActionFilter;