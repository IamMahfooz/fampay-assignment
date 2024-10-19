"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/youtube/page",{

/***/ "(app-pages-browser)/./app/youtube/page.tsx":
/*!******************************!*\
  !*** ./app/youtube/page.tsx ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SubmissionForm; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction YouTubePage() {\n    _s();\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const keyword = searchParams.get(\"keyword\");\n    const modifyKeyword = searchParams.get(\"modifyKeyword\") === \"true\";\n    const maxResults = parseInt(searchParams.get(\"maxResults\") || \"10\");\n    const startDate = parseInt(searchParams.get(\"startDate\") || \"20\");\n    const [videos, setVideos] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Explicitly define the type\n    const [displayedVideos, setDisplayedVideos] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Explicitly define the type\n    const [nextToken, setNextToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Track errors\n    const [emptyResponse, setEmptyResponse] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Track empty responses\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchVideos(nextToken);\n    }, [\n        keyword,\n        modifyKeyword,\n        maxResults\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (loading) {\n            const interval = setInterval(()=>{\n                setProgress((prevProgress)=>{\n                    if (prevProgress >= 100) {\n                        clearInterval(interval);\n                        return 100;\n                    }\n                    return prevProgress + 1.67;\n                });\n            }, 1000);\n            return ()=>clearInterval(interval);\n        }\n    }, [\n        loading\n    ]);\n    const fetchVideos = async (newToken)=>{\n        setLoading(true);\n        setProgress(0);\n        setError(null); // Reset error\n        setEmptyResponse(false); // Reset empty response state\n        try {\n            const response = await fetch(\"http://localhost:5004/youtube\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    keyword,\n                    modify: modifyKeyword,\n                    maxResults: maxResults,\n                    startDate: startD\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Error fetching videos: \".concat(response.statusText));\n            }\n            const data = await response.json(); // Make sure the response matches the `Video` type\n            if (!data || data.length === 0) {\n                // If data is empty, show \"no videos found\" message\n                setEmptyResponse(true);\n                setVideos([]);\n                setDisplayedVideos([]);\n                return;\n            }\n            setVideos((prevVideos)=>[\n                    ...prevVideos,\n                    ...data\n                ]); // This will now work correctly\n            // setNextToken(data.nextPageToken);\n            setDisplayedVideos(data.slice(0, 10));\n            setCurrentIndex(0);\n        } catch (error) {\n            console.error(\"Error fetching videos:\", error.message);\n            setError(\"An error occurred while fetching videos. Please try again.\");\n        } finally{\n            setLoading(false);\n        }\n    };\n    const handleNext = ()=>{\n        const newIndex = currentIndex + 10;\n        if (newIndex < videos.length) {\n            setCurrentIndex(newIndex);\n            setDisplayedVideos(videos.slice(newIndex, newIndex + 10));\n        } else if (nextToken) {\n            fetchVideos(nextToken);\n        }\n    };\n    const handlePrevious = ()=>{\n        const newIndex = currentIndex - 10;\n        if (newIndex >= 0) {\n            setCurrentIndex(newIndex);\n            setDisplayedVideos(videos.slice(newIndex, newIndex + 10));\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto p-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-xl font-semibold mb-4\",\n                children: [\n                    'Results for \"',\n                    keyword,\n                    '\"'\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                lineNumber: 115,\n                columnNumber: 13\n            }, this),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-gray-600 mb-2\",\n                        children: \"Fetching results...\"\n                    }, void 0, false, {\n                        fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                        lineNumber: 118,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"w-full bg-gray-300 rounded-full h-2\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"bg-blue-500 h-2 rounded-full\",\n                            style: {\n                                width: \"\".concat(progress, \"%\")\n                            }\n                        }, void 0, false, {\n                            fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                            lineNumber: 120,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                        lineNumber: 119,\n                        columnNumber: 21\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                lineNumber: 117,\n                columnNumber: 17\n            }, this) : error ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-red-600 text-center\",\n                children: error\n            }, void 0, false, {\n                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                lineNumber: 127,\n                columnNumber: 17\n            }, this) // Display error message\n             : emptyResponse ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-center text-gray-500\",\n                children: \"No videos found for your search.\"\n            }, void 0, false, {\n                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                lineNumber: 129,\n                columnNumber: 17\n            }, this) // Display \"no videos found\"\n             : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                        className: \"min-w-full table-auto\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                            children: displayedVideos.map((video, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                    className: \"border-b\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"px-4 py-2\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                href: video.videoUrl,\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                                    src: video.thumbnailUrl,\n                                                    alt: \"Thumbnail\",\n                                                    className: \"w-40 h-24 object-cover\"\n                                                }, void 0, false, {\n                                                    fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                                    lineNumber: 138,\n                                                    columnNumber: 45\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                                lineNumber: 137,\n                                                columnNumber: 41\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                            lineNumber: 136,\n                                            columnNumber: 37\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                            className: \"px-4 py-2\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                    href: video.videoUrl,\n                                                    className: \"text-blue-600 font-medium hover:underline\",\n                                                    children: video.title\n                                                }, void 0, false, {\n                                                    fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                                    lineNumber: 146,\n                                                    columnNumber: 41\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    className: \"text-gray-600 text-sm\",\n                                                    children: [\n                                                        video.description.slice(0, 100),\n                                                        \"...\"\n                                                    ]\n                                                }, void 0, true, {\n                                                    fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                                    lineNumber: 149,\n                                                    columnNumber: 41\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    className: \"text-gray-500 text-xs\",\n                                                    children: video.publishedAt\n                                                }, void 0, false, {\n                                                    fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                                    lineNumber: 150,\n                                                    columnNumber: 41\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                            lineNumber: 145,\n                                            columnNumber: 37\n                                        }, this)\n                                    ]\n                                }, video.videoId || index, true, {\n                                    fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                    lineNumber: 135,\n                                    columnNumber: 33\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                            lineNumber: 133,\n                            columnNumber: 25\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                        lineNumber: 132,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-between mt-6\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: handlePrevious,\n                                className: \"px-4 py-2 bg-gray-300 text-black rounded-md\",\n                                disabled: currentIndex === 0,\n                                children: \"Previous\"\n                            }, void 0, false, {\n                                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                lineNumber: 157,\n                                columnNumber: 25\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: handleNext,\n                                className: \"px-4 py-2 bg-red-600 text-white rounded-md\",\n                                disabled: currentIndex + maxResults >= videos.length && !nextToken,\n                                children: \"Next\"\n                            }, void 0, false, {\n                                fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                                lineNumber: 164,\n                                columnNumber: 25\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n                        lineNumber: 156,\n                        columnNumber: 21\n                    }, this)\n                ]\n            }, void 0, true)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n        lineNumber: 114,\n        columnNumber: 9\n    }, this);\n}\n_s(YouTubePage, \"lHWFMrrEYjruD+pif5wZi4byYH8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams\n    ];\n});\n_c = YouTubePage;\nfunction SubmissionForm() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {\n        fallback: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n            children: \"Loading...\"\n        }, void 0, false),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(YouTubePage, {}, void 0, false, {\n            fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n            lineNumber: 181,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/mahfooz/GolandProjects/famAssignment/frontend/app/youtube/page.tsx\",\n        lineNumber: 180,\n        columnNumber: 9\n    }, this);\n}\n_c1 = SubmissionForm;\nvar _c, _c1;\n$RefreshReg$(_c, \"YouTubePage\");\n$RefreshReg$(_c1, \"SubmissionForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0MsS0FBS1IsTUFBTVMsWUFBWTtvREFDdkJDLEtBQUk7b0RBQ0psQixXQUFVOzs7Ozs7Ozs7Ozs7Ozs7O3NEQUl0Qiw4REFBQ1c7NENBQUdYLFdBQVU7OzhEQUNWLDhEQUFDWTtvREFBRUMsTUFBTUwsTUFBTU0sUUFBUTtvREFBRWQsV0FBVTs4REFDOUJRLE1BQU1XLEtBQUs7Ozs7Ozs4REFFaEIsOERBQUNqQjtvREFBRUYsV0FBVTs7d0RBQXlCUSxNQUFNWSxXQUFXLENBQUMzQixLQUFLLENBQUMsR0FBRzt3REFBSzs7Ozs7Ozs4REFDdEUsOERBQUNTO29EQUFFRixXQUFVOzhEQUF5QlEsTUFBTWEsV0FBVzs7Ozs7Ozs7Ozs7OzttQ0FmdERiLE1BQU1jLE9BQU8sSUFBSWI7Ozs7Ozs7Ozs7Ozs7OztrQ0FxQnRDLDhEQUFDVjt3QkFBSUMsV0FBVTs7MENBQ1gsOERBQUN1QjtnQ0FDR0MsU0FBUzFCO2dDQUNURSxXQUFVO2dDQUNWeUIsVUFBVWhFLGlCQUFpQjswQ0FDOUI7Ozs7OzswQ0FHRCw4REFBQzhEO2dDQUNHQyxTQUFTNUI7Z0NBQ1RJLFdBQVU7Z0NBQ1Z5QixVQUFVaEUsZUFBZVQsY0FBY0csT0FBT29DLE1BQU0sSUFBSSxDQUFDaEM7MENBQzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVF6QjtHQWhLU1o7O1FBQ2dCRiw0REFBZUE7OztLQUQvQkU7QUFrS00sU0FBUytFO0lBQ3BCLHFCQUNJLDhEQUFDaEYsMkNBQVFBO1FBQUNpRix3QkFBVTtzQkFBRTs7a0JBQ2xCLDRFQUFDaEY7Ozs7Ozs7Ozs7QUFHYjtNQU53QitFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC95b3V0dWJlL3BhZ2UudHN4PzMyM2IiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyBTdXNwZW5zZSB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBEZWZpbmUgdGhlIHZpZGVvIG9iamVjdCB0eXBlXG5pbnRlcmZhY2UgVmlkZW8ge1xuICAgIHZpZGVvSWQ6IHN0cmluZztcbiAgICB2aWRlb1VybDogc3RyaW5nO1xuICAgIHRodW1ibmFpbFVybDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwdWJsaXNoZWRBdDogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBZb3VUdWJlUGFnZSgpIHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgICBjb25zdCBrZXl3b3JkID0gc2VhcmNoUGFyYW1zLmdldChcImtleXdvcmRcIik7XG4gICAgY29uc3QgbW9kaWZ5S2V5d29yZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJtb2RpZnlLZXl3b3JkXCIpID09PSBcInRydWVcIjtcbiAgICBjb25zdCBtYXhSZXN1bHRzID0gcGFyc2VJbnQoc2VhcmNoUGFyYW1zLmdldChcIm1heFJlc3VsdHNcIikgfHwgXCIxMFwiKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuZ2V0KFwic3RhcnREYXRlXCIpIHx8IFwiMjBcIik7XG5cbiAgICBjb25zdCBbdmlkZW9zLCBzZXRWaWRlb3NdID0gdXNlU3RhdGU8VmlkZW9bXT4oW10pOyAvLyBFeHBsaWNpdGx5IGRlZmluZSB0aGUgdHlwZVxuICAgIGNvbnN0IFtkaXNwbGF5ZWRWaWRlb3MsIHNldERpc3BsYXllZFZpZGVvc10gPSB1c2VTdGF0ZTxWaWRlb1tdPihbXSk7IC8vIEV4cGxpY2l0bHkgZGVmaW5lIHRoZSB0eXBlXG4gICAgY29uc3QgW25leHRUb2tlbiwgc2V0TmV4dFRva2VuXSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFtjdXJyZW50SW5kZXgsIHNldEN1cnJlbnRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3Byb2dyZXNzLCBzZXRQcm9ncmVzc10gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpOyAvLyBUcmFjayBlcnJvcnNcbiAgICBjb25zdCBbZW1wdHlSZXNwb25zZSwgc2V0RW1wdHlSZXNwb25zZV0gPSB1c2VTdGF0ZShmYWxzZSk7IC8vIFRyYWNrIGVtcHR5IHJlc3BvbnNlc1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hWaWRlb3MobmV4dFRva2VuKTtcbiAgICB9LCBba2V5d29yZCwgbW9kaWZ5S2V5d29yZCwgbWF4UmVzdWx0c10pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFByb2dyZXNzKChwcmV2UHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZQcm9ncmVzcyA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldlByb2dyZXNzICsgMS42NztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfSwgW2xvYWRpbmddKTtcblxuICAgIGNvbnN0IGZldGNoVmlkZW9zID0gYXN5bmMgKG5ld1Rva2VuOiBzdHJpbmcgKSA9PiB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHNldFByb2dyZXNzKDApO1xuICAgICAgICBzZXRFcnJvcihudWxsKTsgLy8gUmVzZXQgZXJyb3JcbiAgICAgICAgc2V0RW1wdHlSZXNwb25zZShmYWxzZSk7IC8vIFJlc2V0IGVtcHR5IHJlc3BvbnNlIHN0YXRlXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwNC95b3V0dWJlYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAga2V5d29yZCxcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZ5OiBtb2RpZnlLZXl3b3JkLFxuICAgICAgICAgICAgICAgICAgICBtYXhSZXN1bHRzOiBtYXhSZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGZldGNoaW5nIHZpZGVvczogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkYXRhOiBWaWRlb1tdID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBNYWtlIHN1cmUgdGhlIHJlc3BvbnNlIG1hdGNoZXMgdGhlIGBWaWRlb2AgdHlwZVxuXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBkYXRhIGlzIGVtcHR5LCBzaG93IFwibm8gdmlkZW9zIGZvdW5kXCIgbWVzc2FnZVxuICAgICAgICAgICAgICAgIHNldEVtcHR5UmVzcG9uc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2V0VmlkZW9zKFtdKTtcbiAgICAgICAgICAgICAgICBzZXREaXNwbGF5ZWRWaWRlb3MoW10pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VmlkZW9zKChwcmV2VmlkZW9zKSA9PiBbLi4ucHJldlZpZGVvcywgLi4uZGF0YV0pOyAvLyBUaGlzIHdpbGwgbm93IHdvcmsgY29ycmVjdGx5XG4gICAgICAgICAgIC8vIHNldE5leHRUb2tlbihkYXRhLm5leHRQYWdlVG9rZW4pO1xuICAgICAgICAgICAgc2V0RGlzcGxheWVkVmlkZW9zKGRhdGEuc2xpY2UoMCwgMTApKTtcbiAgICAgICAgICAgIHNldEN1cnJlbnRJbmRleCgwKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB2aWRlb3M6XCIsIChlcnJvciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICBzZXRFcnJvcihcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIHZpZGVvcy4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCArIDEwO1xuICAgICAgICBpZiAobmV3SW5kZXggPCB2aWRlb3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZXRDdXJyZW50SW5kZXgobmV3SW5kZXgpO1xuICAgICAgICAgICAgc2V0RGlzcGxheWVkVmlkZW9zKHZpZGVvcy5zbGljZShuZXdJbmRleCwgbmV3SW5kZXggKyAxMCkpO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHRUb2tlbikge1xuICAgICAgICAgICAgZmV0Y2hWaWRlb3MobmV4dFRva2VuKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVQcmV2aW91cyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3SW5kZXggPSBjdXJyZW50SW5kZXggLSAxMDtcbiAgICAgICAgaWYgKG5ld0luZGV4ID49IDApIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRJbmRleChuZXdJbmRleCk7XG4gICAgICAgICAgICBzZXREaXNwbGF5ZWRWaWRlb3ModmlkZW9zLnNsaWNlKG5ld0luZGV4LCBuZXdJbmRleCArIDEwKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBwLTRcIj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgbWItNFwiPlJlc3VsdHMgZm9yIFwie2tleXdvcmR9XCI8L2gxPlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTJcIj5GZXRjaGluZyByZXN1bHRzLi4uPC9wPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1ncmF5LTMwMCByb3VuZGVkLWZ1bGwgaC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctYmx1ZS01MDAgaC0yIHJvdW5kZWQtZnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke3Byb2dyZXNzfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IGVycm9yID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yZWQtNjAwIHRleHQtY2VudGVyXCI+e2Vycm9yfTwvZGl2PiAvLyBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgICkgOiBlbXB0eVJlc3BvbnNlID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMFwiPk5vIHZpZGVvcyBmb3VuZCBmb3IgeW91ciBzZWFyY2guPC9kaXY+IC8vIERpc3BsYXkgXCJubyB2aWRlb3MgZm91bmRcIlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWluLXctZnVsbCB0YWJsZS1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXllZFZpZGVvcy5tYXAoKHZpZGVvLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXt2aWRlby52aWRlb0lkIHx8IGluZGV4fSBjbGFzc05hbWU9XCJib3JkZXItYlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTQgcHktMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e3ZpZGVvLnZpZGVvVXJsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXt2aWRlby50aHVtYm5haWxVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJUaHVtYm5haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00MCBoLTI0IG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC00IHB5LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXt2aWRlby52aWRlb1VybH0gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTYwMCBmb250LW1lZGl1bSBob3Zlcjp1bmRlcmxpbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ZpZGVvLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtc21cIj57dmlkZW8uZGVzY3JpcHRpb24uc2xpY2UoMCwgMTAwKX0uLi48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LXhzXCI+e3ZpZGVvLnB1Ymxpc2hlZEF0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIG10LTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQcmV2aW91c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctZ3JheS0zMDAgdGV4dC1ibGFjayByb3VuZGVkLW1kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17Y3VycmVudEluZGV4ID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVOZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1yZWQtNjAwIHRleHQtd2hpdGUgcm91bmRlZC1tZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2N1cnJlbnRJbmRleCArIG1heFJlc3VsdHMgPj0gdmlkZW9zLmxlbmd0aCAmJiAhbmV4dFRva2VufVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN1Ym1pc3Npb25Gb3JtKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxTdXNwZW5zZSBmYWxsYmFjaz17PD5Mb2FkaW5nLi4uPC8+fT5cbiAgICAgICAgICAgIDxZb3VUdWJlUGFnZSAvPlxuICAgICAgICA8L1N1c3BlbnNlPlxuICAgICk7XG59XG5cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlU2VhcmNoUGFyYW1zIiwiU3VzcGVuc2UiLCJZb3VUdWJlUGFnZSIsInNlYXJjaFBhcmFtcyIsImtleXdvcmQiLCJnZXQiLCJtb2RpZnlLZXl3b3JkIiwibWF4UmVzdWx0cyIsInBhcnNlSW50Iiwic3RhcnREYXRlIiwidmlkZW9zIiwic2V0VmlkZW9zIiwiZGlzcGxheWVkVmlkZW9zIiwic2V0RGlzcGxheWVkVmlkZW9zIiwibmV4dFRva2VuIiwic2V0TmV4dFRva2VuIiwiY3VycmVudEluZGV4Iiwic2V0Q3VycmVudEluZGV4IiwibG9hZGluZyIsInNldExvYWRpbmciLCJwcm9ncmVzcyIsInNldFByb2dyZXNzIiwiZXJyb3IiLCJzZXRFcnJvciIsImVtcHR5UmVzcG9uc2UiLCJzZXRFbXB0eVJlc3BvbnNlIiwiZmV0Y2hWaWRlb3MiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwicHJldlByb2dyZXNzIiwiY2xlYXJJbnRlcnZhbCIsIm5ld1Rva2VuIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm1vZGlmeSIsInN0YXJ0RCIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiZGF0YSIsImpzb24iLCJsZW5ndGgiLCJwcmV2VmlkZW9zIiwic2xpY2UiLCJjb25zb2xlIiwibWVzc2FnZSIsImhhbmRsZU5leHQiLCJuZXdJbmRleCIsImhhbmRsZVByZXZpb3VzIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJwIiwic3R5bGUiLCJ3aWR0aCIsInRhYmxlIiwidGJvZHkiLCJtYXAiLCJ2aWRlbyIsImluZGV4IiwidHIiLCJ0ZCIsImEiLCJocmVmIiwidmlkZW9VcmwiLCJpbWciLCJzcmMiLCJ0aHVtYm5haWxVcmwiLCJhbHQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicHVibGlzaGVkQXQiLCJ2aWRlb0lkIiwiYnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIiwiU3VibWlzc2lvbkZvcm0iLCJmYWxsYmFjayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/youtube/page.tsx\n"));

/***/ })

});