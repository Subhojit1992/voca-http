"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 4065:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
var router_default = /*#__PURE__*/__webpack_require__.n(router_namespaceObject);
;// CONCATENATED MODULE: external "react-ga"
const external_react_ga_namespaceObject = require("react-ga");
var external_react_ga_default = /*#__PURE__*/__webpack_require__.n(external_react_ga_namespaceObject);
;// CONCATENATED MODULE: ./pages/_app.tsx
// @ts-nocheck 





const TRACKING_ID = "G-8B0K62HERK";
function MyApp({ Component , pageProps  }) {
    (0,external_react_.useEffect)(()=>{
        // Initialize Google Analytics
        external_react_ga_default().initialize(TRACKING_ID);
        // Track page views
        const handleRouteChange = (url)=>{
            external_react_ga_default().pageview(url);
        };
        router_default().events.on("routeChangeComplete", handleRouteChange);
        // Clean up event listener on unmount
        return ()=>{
            router_default().events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "voca-http - Modern HTTP client for web applications"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "A lightweight, flexible HTTP client for modern web applications"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("script", {
                        async: true,
                        src: `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("script", {
                        dangerouslySetInnerHTML: {
                            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${TRACKING_ID}');
            `
                        }
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4065));
module.exports = __webpack_exports__;

})();