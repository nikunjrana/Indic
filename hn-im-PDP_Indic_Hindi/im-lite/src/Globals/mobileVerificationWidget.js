import React from 'react';
import { getCookieValByKey } from '../Globals/CookieManager';
import { gaTrack } from '../Globals/GaTracking';
export const mobileVerificationStrip = () => {

    var divData = <div id="verStripEnq" class="bgef mb15"><div class="pd5 verStrips mt5" style="margin-bottom: -5px;"><p class="fs14 mt5 mb5"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAABHNCSVQICAgIfAhkiAAAATtJREFUKJGdkD0vQ2EUgJ9zeq+rBBHpx0CiEYPJZJMYiESlsZNokNhIZxa/wo/o2qb8CoPNYrUJ2lL9uMdw06a9/VDO9J6v57x5hBFRKSVyAitTNK4l/foxbE6HNb6LC2vAtsFyhUh21LGBELtB6+petnNBd98LsdU/QcobiYxgi901x9GLsSFvxbl5EY6CL1kel6vgSap6l0yPBXHUOxOIAqjfevJrny/tnm92bCVmR0ICmbLVzsVVz2HC6+QwXbXYyVCI5Yl0ywyW1FNpej0bojthyR1IZSZ+EJbZajEpOL0Q+iUrBDIxPQwP+8heQyOZcN2MVPU+ud8DUY2eC9Z3UdU3w57DdQDft2xbslYK8XXFNgcNgjy6fv1hYAeiVRKnAFIuJW8FWxoM+T0cr5ZTsOZ/AQZfrYY79wMQcGE3PbIf2wAAAABJRU5ErkJggg==" />
        Your mobile number <b> {getCookieValByKey('ImeshVisitor', 'mb1')} </b>is not verified with IndiaMART. To verify <span class="clrBl fw" onclick={() => { gaTrack.trackEvent(["OTPcentralform", "identified", "click_Mobile_verification strip_Home-PWA", 0, 0]); openFeedback1('im_popup', '', '', '', 'mbgn_askpopup', '', 'PERMANENT_VERIFICATION_verStripEnq', ''); }} id="verStripEnqBt" style=" text-decoration: underline;"> Click here</span></p></div></div>;

    return divData;
}	