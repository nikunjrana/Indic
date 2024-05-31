import { getCookie, getCookieValByKey } from './CookieManager';
export const userType = () => {
    let ls = localStorage, 
        userType = '',
        imesh = getCookie('ImeshVisitor'),
        im_iss = getCookie('im_iss');
    
    if (!imesh) {
        userType = 'UN';
    }else{
        let imeshUtype = getCookieValByKey('ImeshVisitor', 'utyp');
        if (!im_iss) {
            userType = 'I';
        }else{
            userType = 'FL';
        }  

        if (imeshUtype == "P") {
            userType += '-S';
        }else{
            userType += '-B';
        }

    }

    if (ls && (ls.recentMcats || ls.relCats || ls.relProds2 || ls.prodsViewed)) {
        userType += '-WB';
    }else{
        userType += '-WTB';
    }

return userType;
}
/*
Returns userType on the basis of users' identification status and local storage data

UN-WTB     ( Unidentified-WithoutBrowsingHistory )
UN-WB      ( Unidentified-WithBrowsingHistory )
I-B-WTB    ( Identified-Buyer-WithoutBrowsingHistory )
I-B-WB     ( Identified-Buyer-WithBrowsingHistory )
I-S-WTB    ( Identified-Seller-WithoutBrowsingHistory )
I-S-WB     ( Identified-Seller-WithBrowsingHistory )
FL-B-WTB   ( FullLogin-Buyer-WithoutBrowsingHistory )
FL-B-WB    ( FullLogin-Buyer-WithBrowsingHistory )
FL-S-WTB   ( FullLogin-Seller-WithoutBrowsingHistory )
FL-S-WB    ( FullLogin-Seller-WithBrowsingHistory )
*/