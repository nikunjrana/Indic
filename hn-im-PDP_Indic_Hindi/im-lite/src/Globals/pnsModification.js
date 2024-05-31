export const pns_prefix = (mob, type) => {
    if (typeof mob == 'object') {
        mob = mob[0];
    }
    switch (type) {
        case 'MOBILE':
        case 'PNS':
            {
                if(mob){
                    if (mob.length == 10)//requires +91
                    {
                        mob = '+91' + mob;
                    }
                   
                    else if(mob.length > 10 && mob.indexOf(',')>1) {
                         mob = '+91' + mob;
                    }
                     else {
                        if (mob.indexOf('+91') == -1) {
                            mob = '+' + mob;
                        }
                    }
                }
              
                break;
            }
        case 'PHONE':
            {
                if (mob.indexOf('+91') == -1 && mob.indexOf('91') != 0) {
                    mob = '+91' + mob;
                }
                else if (mob.indexOf('91') == 0) {
                    mob = '+' + mob;
                }
                break;

            }
    }
    if (type == 'MOBILE' || type == 'PHONE') {
        let arr = [];
        arr[0] = mob;
        return arr;
    }
    else {
        return mob;
    }
}