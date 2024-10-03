/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/log.js":
/*!********************!*\
  !*** ./src/log.js ***!
  \********************/
/***/ (() => {

eval("const DI_TABLE = document.getElementById(\"di_table\");\r\nconst COIL_TABLE = document.getElementById(\"coil_table\");\r\nconst WDATA_TABLE = document.getElementById(\"wdata_table\");\r\nconst REG_TYPE_DI = \"DI\";\r\nconst REG_TYPE_COIL = \"COIL\";\r\nconst REG_TYPE_WDATA = \"WDATA\";\r\n\r\n// Create WebSocket connection.\r\nconst socket = new WebSocket(\"ws://localhost:8000/ws\");\r\n\r\n// Connection opened\r\nsocket.addEventListener(\"open\", (event) => {\r\n  socket.send(\"FROM CLIENT!\");\r\n});\r\n\r\n// Listen for messages\r\nsocket.addEventListener(\"message\", (event) => {\r\n  let data = JSON.parse(event.data);\r\n  console.log(data.type);\r\n  console.log(data.num);\r\n  console.log(data.val);\r\n\r\n\r\nlet convert_bin_to_state = (bin) => {\r\n  if(bin == 0){\r\n    return 'OFF';\r\n  }\r\n  else{\r\n    return 'ON';\r\n  }\r\n}\r\n\r\n\r\n\r\n  if(data.type === REG_TYPE_DI){\r\n    DI_TABLE.rows[data.num].cells[0].innerHTML = data.num;\r\n    DI_TABLE.rows[data.num].cells[1].innerHTML = convert_bin_to_state(data.val);\r\n    if(data.val == 0){\r\n      DI_TABLE.rows[data.num].style.backgroundColor = 'red';\r\n    }\r\n    else{\r\n      DI_TABLE.rows[data.num].style.backgroundColor = 'green';\r\n    }\r\n  }\r\n\r\n\r\n  if(data.type === REG_TYPE_COIL){\r\n    COIL_TABLE.rows[data.num].cells[0].innerHTML = data.num;\r\n    COIL_TABLE.rows[data.num].cells[1].innerHTML = convert_bin_to_state(data.val);\r\n    if(data.val == 0){\r\n      COIL_TABLE.rows[data.num].style.backgroundColor = 'red';\r\n    }\r\n    else{\r\n      COIL_TABLE.rows[data.num].style.backgroundColor = 'green';\r\n    }\r\n  }\r\n\r\n\r\n  if(data.type === REG_TYPE_WDATA){\r\n    WDATA_TABLE.rows[data.num].cells[0].innerHTML = data.num;\r\n    WDATA_TABLE.rows[data.num].cells[1].innerHTML = data.val;\r\n  }\r\n});\n\n//# sourceURL=webpack://modbus_mqtt/./src/log.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/log.js"]();
/******/ 	
/******/ })()
;