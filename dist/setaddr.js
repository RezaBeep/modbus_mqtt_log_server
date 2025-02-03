/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n\n// ref: https://github.com/tc39/proposal-global\nvar getGlobal = function () {\n\t// the only reliable means to get the global object is\n\t// `Function('return this')()`\n\t// However, this causes CSP violations in Chrome apps.\n\tif (typeof self !== 'undefined') { return self; }\n\tif (typeof window !== 'undefined') { return window; }\n\tif (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }\n\tthrow new Error('unable to locate global object');\n}\n\nvar globalObject = getGlobal();\n\nmodule.exports = exports = globalObject.fetch;\n\n// Needed for TypeScript and Webpack.\nif (globalObject.fetch) {\n\texports[\"default\"] = globalObject.fetch.bind(globalObject);\n}\n\nexports.Headers = globalObject.Headers;\nexports.Request = globalObject.Request;\nexports.Response = globalObject.Response;\n\n\n//# sourceURL=webpack://modbus_mqtt/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./src/addr.js":
/*!*********************!*\
  !*** ./src/addr.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n\r\nconst REG_TYPE_DI = \"di\";\r\nconst REG_TYPE_COIL = \"coil\";\r\nconst REG_TYPE_WDATA = \"WDATA\";\r\n\r\n\r\nfunction set_addr(reg_type){\r\n    let reg_num = \"\";\r\n    let reg_addr = \"\";\r\n    if(reg_type === REG_TYPE_DI){\r\n        reg_addr = document.forms[\"diaddr_form\"][\"addr\"].value;\r\n        reg_num = document.forms[\"diaddr_form\"][\"num\"].value;\r\n    }\r\n    if(reg_type === REG_TYPE_COIL){\r\n        reg_addr = document.forms[\"coiladdr_form\"][\"addr\"].value;\r\n        reg_num = document.forms[\"coiladdr_form\"][\"num\"].value;\r\n    }\r\n    if(reg_type === REG_TYPE_WDATA){\r\n        reg_addr = document.forms[\"wdataaddr_form\"][\"addr\"].value;\r\n        reg_num = document.forms[\"wdataaddr_form\"][\"num\"].value;\r\n    }\r\n    node_fetch__WEBPACK_IMPORTED_MODULE_0___default()('http://84.47.235.178:8000/setaddr', {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify({\r\n            type:reg_type,\r\n            num:reg_num,\r\n            addr:reg_addr\r\n        })\r\n    })\r\n    .then(resp => {\r\n\t\tresp.json()\r\n\t\talert(\"sent!\");\r\n\t}) // or, resp.text(), etc\r\n    .then(data => {\r\n        console.log(data); // handle response data\r\n    })\r\n    .catch(error => {\r\n        console.error(error);\r\n    });\r\n\r\n}\r\n\r\n\r\nconst disetaddr = () => set_addr(REG_TYPE_DI);\r\nconst coilsetaddr = () => set_addr(REG_TYPE_COIL);\r\nconst wdatasetaddr = () => set_addr(REG_TYPE_WDATA);\r\n\r\n\r\ndocument.getElementById(\"di_setaddr_butt\").addEventListener(\"click\", disetaddr, false);\r\ndocument.getElementById(\"coil_setaddr_butt\").addEventListener(\"click\", coilsetaddr, false);\r\ndocument.getElementById(\"wdata_setaddr_butt\").addEventListener(\"click\", wdatasetaddr, false);\r\n\r\n\r\n\n\n//# sourceURL=webpack://modbus_mqtt/./src/addr.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/addr.js");
/******/ 	
/******/ })()
;