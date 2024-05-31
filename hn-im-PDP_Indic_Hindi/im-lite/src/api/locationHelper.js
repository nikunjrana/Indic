export const getLocationPageName = () => {
    const pagename =window.location? window.location.href:'';
  
    if (pagename&&pagename.includes('proddetail')) {
      return "PDP";
    } else if (pagename&&(pagename.includes('city')||pagename.includes('impcat'))) {
      return "MCAT";
    } else if (pagename&&pagename.includes("search")) {
      return "Search";
    } else if (pagename&&pagename.split('/')[3]=='') {
      return "HOME";
    }
    else
    {
    return "Miscellaneous"
    }
  };
  
