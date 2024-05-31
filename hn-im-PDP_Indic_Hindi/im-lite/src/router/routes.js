import React from "react";
import { browserHistory } from "react-router";
import { Router } from "react-router";
import { trackpv } from "../Globals/GaTrackHindi";

const componentRoutes = {
  childRoutes: [
    {
      path: "/",
      getComponent(location, cb) {
        import(
          /* webpackChunkName:"Home" */ "../modules/home/NewUserHindi"
        ).then((module) => cb(null, module.default));
        trackpv('HindiHomepage');
    }
   
  },
  {
    path: "/impcat/(:cityindORcatlink).html",
    getComponent(location, cb) {
      if(window.MCATdiv){
        cb(null,window.MCATdiv);
      }
      else{
         import(
        /* webpackChunkName: "mcatPageNew" */ "../modules/MCATNEW/Page"
      ).then((module) => cb(null, module.default));
      }
    },
  },
  {
    path: "/impcat/",
    getComponent(location, cb) {
      import(
        /* webpackChunkName:"index" */ "../modules/impcatIndex/components/Controller"
      ).then((module) => cb(null, module.default));
    },
  },
    {
      path: "/proddetail*5.html",
      getComponent(location, cb) {
        if(window.PDPdiv){
          cb(null,window.PDPdiv);
        }
        else{
          import(
            /* webpackChunkName: "productDetailPage2" */ "../modules/ProductDetail/components/Views"
          ).then((module) => cb(null, module.default));
        }

      },
    },
    {
      path: "/proddetail*6.html",
        getComponent(location, cb) {
        if(window.PDPdiv){
          cb(null,window.PDPdiv);
        }
        else{
          import(
            /* webpackChunkName: "productDetailPage2" */ "../modules/ProductDetail/components/Views"
          ).then((module) => cb(null, module.default));
        }
      },
    },
    {
      path: "/proddetail*7.html",
      getComponent(location, cb) {
        if(window.PDPdiv){
          cb(null,window.PDPdiv);
        }
        else{
          import(
            /* webpackChunkName: "productDetailPage2" */ "../modules/ProductDetail/components/Views"
          ).then((module) => cb(null, module.default));
        }
      },
    },
    {
      path: "/proddetail*8.html",
        getComponent(location, cb) {
        if(window.PDPdiv){
          cb(null,window.PDPdiv);
        }
        else{
          import(
            /* webpackChunkName: "productDetailPage2" */ "../modules/ProductDetail/components/Views"
          ).then((module) => cb(null, module.default));
        }

      },
    },
    {
      path: "/proddetail*9.html",
      getComponent(location, cb) {
        if(window.PDPdiv){
          cb(null,window.PDPdiv);
        }
        else{
          import(
            /* webpackChunkName: "productDetailPage2" */ "../modules/ProductDetail/components/Views"
          ).then((module) => cb(null, module.default));
        }
      },
    },
    
    {
      path: "//*",
      getComponent(location, cb) {
        browserHistory.push("/");
      },
    },
    {
      path: "*",
      getComponent(location, cb) {
        import(
          /* webpackChunkName:"Index" */ "../modules/App/styles/index.css"
        )
          .then((data) => {
            import("../Globals/Error404/error404").then((module) => cb(null, module.default));
          });
        // .then((data) => {
        //   import(
        //     /* webpackChunkName: "error" */ "../modules/App/components/Error5xx"
        //   ).then((module) => cb(null, module.default));
        // });
      },
    },
  ],
};


export const getRoutes = () => {
  browserHistory.listen((location) => {
    document.body.classList.remove("oh");});

  return (
    <Router history={browserHistory} routes={componentRoutes}></Router>
  );
  }
export default getRoutes;
