export const validate_mobile = (mobNo) => {
    var error = '',
        mobrRegex = /^[0-9-+()./ ]*$/,
        filter = /^(?:(?:\+|0{0,2})(91|910)(\s*[\-]\s*)?|[0]?)?[16789]\d{9}$/;
    if (mobNo == '' || mobNo.length == 0) {
        error = "Please enter mobile number";
        return error;
    } else if(isNaN(mobNo)) {
        error = "Please enter correct mobile number";
        return error;
    }
    else if (mobrRegex.test(mobNo)) {
        if (mobNo.length > 10 || mobNo.length < 10) {
            mobNo = mobNo.replace(/^((91){0,1}0{0,})/g, '');
            if (mobNo.length != 10) {
                error = "Please enter 10 digit mobile number";
                return error;
            }
            else {
                return error;
            }
        }
        if (!filter.test(mobNo)) {
            error = "Please enter correct mobile number";
            return error;
        }
        else {
            return error;
        }
    }
    else {
        return error;
    }

}
export const validate_email = (email) => {
    var error = '',
        emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (email == '' || email.length == 0) {
        error = "Email cannot be blank";
        return error;
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email))) {
        error = "Please enter a valid email";
        return error;
    }
    else {
        return error
    }
}