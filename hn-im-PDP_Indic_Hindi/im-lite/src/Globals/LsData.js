export const checkAndSetLS = (LSName, LSDataObject) => {
    
    let LS_data = localStorage ? JSON.parse(localStorage.getItem(LSName)):'';
    let all_data=[];
    if (!LS_data) {
        all_data = all_data.concat(LSDataObject);
    
    } else {
        all_data = Array.isArray(LS_data) ? LS_data.concat(LSDataObject):all_data.concat(LSDataObject);
    
        all_data = dateBasedSort(all_data);

        let filterKeys = {
            "prodsViewed" : "display_id",
            "recentMcats" : "mcatid",
            "recentSearches" : "searchkeyword",
            "prefLoc" : "cityName"
        }
        let filterKey = filterKeys[LSName];
    
        all_data = all_data.reduce(function (item, e1) {
            let matches = item.filter(function (e2) {
                return e1[filterKey] == e2[filterKey]
            });
            if (matches.length == 0) {
                item.push(e1);
            }
            return item;
        }, []);
    
        all_data = all_data.splice(0, 20);
    
    }
    localStorage.setItem(LSName, JSON.stringify(all_data))

}

const dateBasedSort = (arrayInput) => {
    return arrayInput.sort(function (a, b) {
        let keyA = a.DT,
            keyB = b.DT;
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });
}

export const relatedServiceLS = (data) => {
    localStorage.setItem("RECOMMENDED_MCAT_DATA",JSON.stringify(data['RECOMMENDED MCAT DATA']));
    localStorage.setItem("RECOMMENDED_DATA",JSON.stringify(data['RECOMMENDED DATA']));
}