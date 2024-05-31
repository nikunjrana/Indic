import { connect } from 'react-redux';
import Footer from '../components/Footer';
import imActionCreatorCentralLogin from '../../Header/actions/imActionCreatorCentralLogin';

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
  loginUser: (loginData) => dispatch(imActionCreatorCentralLogin.loginUser(loginData))
});

export default connect(mapStateToProps,mapDispatchToProps)(Footer);
