import { connect } from 'react-redux';
import Header from './components/Header';

const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
    xmppAlert:state.xmppAlert,
    sellerRes:state.sellerRes,
    xmppDetail:state.xmppDetail,
    unreadCount:state.unreadCount
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps,mapDispatchToProps)(Header);
