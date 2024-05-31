import React, { useState, useEffect } from "react";

const AutofetchContainer = (props) => {
  const [AutofetchComponent, setAutofetch] = useState("");
  useEffect(() => {
    if (AutofetchComponent == "") {
      window.addEventListener("scroll", temp, {passive : true});
    }
    // console.log("Autofetch component calling");
  }, []);

  function temp() {
    import(/* webpackChunkName:"Autofetch" */ "./Autofetch").then((module) => {
      setAutofetch(() => module.default);
    });
    window.removeEventListener("scroll", temp);
  }

  let autoFetchprops = props.data;

  return (
    <>
      {AutofetchComponent ? (
        <AutofetchComponent
          showEnqPopup = {props.showEnqPopup}
          showModal={props.showModal}
          centralizePbr={props.centralizePbr}
          openMiniPDP={props.openMiniPDP}
          mcatData={autoFetchprops.mcatData}
          setCityLatLong={autoFetchprops.setCityLatLong}
          showNearMe={autoFetchprops.showNearMe}
          batchSize={14}
          firstListLength={autoFetchprops.mcatData.firstListData.length}
          uniqueId={autoFetchprops.mcatData.uniqueId}
          totalProductCount={autoFetchprops.mcatData.totalProductCount}
          vernacularData={autoFetchprops.vernacularData}
          searchBarText = {props.searchBarText}
          Ads = {props.Ads}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AutofetchContainer;
