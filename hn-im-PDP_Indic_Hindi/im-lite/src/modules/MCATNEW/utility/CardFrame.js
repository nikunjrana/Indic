import React from "react";
import Card from "./Card";

const CardFrame =React.memo((props) => {
  let listItem;
    listItem = props.productsArr.map((product) => {
      return (
        <Card
          showModal={props.showModal}
          openMiniPDP={props.openMiniPDP}
          id={`prod_${props.id}`}
          usermode = {props.usermode}
          callNowClick={props.callNowClick}
          isqTracking = {props.isqTracking}
          utmText = {props.utmText}
          tracking={props.tracking}
          listNumber={props.listNumber}
          productIndex={props.productIndex}
          product={product}
          vernacularData={props.vernacularData}
          mcatId={props.mcatId}
          mcatName={props.mcatName}
          catId={props.catId}
          prodType={props.prodType}
          checkUserStatus = {props.checkUserStatus}
          glLastDigit = {props.glLastDigit}
          loginModes={props.loginModes}
          lastgadigit={props.lastgadigit}
        />
      ); });
  return (
    <li id={`prod_${props.id}`} name={`list_${props.listNumber}_${props.id}`} className="lsnone pdr5 pdt10 bgw mb1 bxsdw mcatUnique pdl5 pdb7">
      {listItem}
    </li> );
})

export default CardFrame;
