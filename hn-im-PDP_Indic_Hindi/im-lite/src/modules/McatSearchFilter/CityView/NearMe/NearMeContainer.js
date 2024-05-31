import {connect } from 'react-redux'; 
import NearMe from './NearMe';

const mapStateToProps = (state) => (
    {
        countryIso : state.country_name

    }
);
const mapDispatchToProps = (dispatch) => (
 {}
);
export default connect(mapStateToProps, mapDispatchToProps)(NearMe);