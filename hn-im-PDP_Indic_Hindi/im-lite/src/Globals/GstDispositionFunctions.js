export const checkGSTDispositionDisplay = () => {
    // Check for localstorage for GST Dispositions
    if (localStorage.getItem('GST_Dispositions') && localStorage.getItem('GST_Dispositions') != "undefined") {
        let gst_disposition = JSON.parse(localStorage.getItem('GST_Dispositions'));
        let gst_disposition_value = gst_disposition[0].Disp_name;
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var diffDays = Math.round(Math.abs((new Date().getTime() - new Date(parseInt(gst_disposition[0].time)).getTime()) / (oneDay)));
        if (diffDays >= 14 && gst_disposition_value.includes("have")) {
            return true;
        }
        else if (diffDays >= 5 && gst_disposition_value.includes("remember")) {
            return true;
        }
        else {
            return false;
        }

    }
    else {
        return true;
    }
}