/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/box-shadow.js"
/*!**************************************!*\
  !*** ./src/components/box-shadow.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoxShadowComponent: () => (/* binding */ BoxShadowComponent)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
const {
    useState
  } = wp.element,
  {
    ToggleControl,
    RangeControl,
    ColorPicker,
    Dropdown
  } = wp.components,
  {
    __
  } = wp.i18n,
  {
    escapeHTML
  } = wp.escapeHtml;


const BoxShadowComponent = props => {
  const {
      label,
      description,
      setting
    } = props,
    [value, setValue] = useState(setting.get()),
    {
      offsetx,
      offsety,
      inset,
      color,
      blur,
      spread
    } = value;

  /**
   * Handle Change
   * 
   * @since 1.0.0
   * @param string    id  The id of the field
   * @param string|int|bool   newValue    The new value of the field
   * @return void 
   */
  const handleChange = (id, newValue) => {
    let updatedValue = {
      ...value,
      [id]: newValue
    };
    setting.set(updatedValue);
    setValue(updatedValue);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Dropdown, {
        className: "box-shadow-container",
        contentClassName: "box-shadow-popover",
        popoverProps: {
          placement: 'bottom-start',
          shift: true
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "highlight",
            onClick: onToggle,
            "aria-expanded": isOpen,
            children: `x: ${offsetx}, y: ${offsety}, blue: ${blur}`
          });
        },
        renderContent: () => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToggleControl, {
              label: __(escapeHTML('Enable'), 'i-am-news'),
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RangeControl, {
              label: __(escapeHTML('Horizontal Offset (X)'), 'i-am-news'),
              value: offsetx,
              onChange: newValue => handleChange('offsetx', newValue),
              min: -50,
              max: 50,
              __next40pxDefaultSize: true,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RangeControl, {
              label: __(escapeHTML('Vertical Offset (Y)'), 'i-am-news'),
              value: offsety,
              onChange: newValue => handleChange('offsety', newValue),
              min: -50,
              max: 50,
              __next40pxDefaultSize: true,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RangeControl, {
              label: __(escapeHTML('Blur Radius'), 'i-am-news'),
              value: blur,
              onChange: newValue => handleChange('blur', newValue),
              min: 0,
              max: 100,
              __next40pxDefaultSize: true,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RangeControl, {
              label: __(escapeHTML('Spread Radius'), 'i-am-news'),
              value: spread,
              onChange: newValue => handleChange('spread', newValue),
              min: -50,
              max: 50,
              __next40pxDefaultSize: true,
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ColorPicker, {
              color: color,
              onChangeComplete: newValue => handleChange('color', newValue),
              disableAlpha: false
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToggleControl, {
              label: __(escapeHTML('Inset Shadow'), 'i-am-news'),
              checked: inset,
              onChange: newValue => handleChange('inset', newValue),
              __nextHasNoMarginBottom: true
            })]
          });
        }
      })
    })]
  });
};

/***/ },

/***/ "./src/components/components.js"
/*!**************************************!*\
  !*** ./src/components/components.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IanControlHead: () => (/* binding */ IanControlHead)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
    useState,
    useEffect
  } = wp.element,
  {
    Dashicon,
    Tooltip
  } = wp.components,
  {
    __
  } = wp.i18n,
  {
    escapeHTML
  } = wp.escapeHtml;

/**
 * Control Head
 * 
 * @since 1.0.0
 */
const IanControlHead = props => {
  const {
    label,
    description
  } = props;
  return (label || description) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "control-head",
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
      className: "title",
      children: label
    }), description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Tooltip, {
      className: "description",
      text: description,
      delay: 300,
      placement: "top",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
        icon: "editor-help",
        className: "desc-icon"
      })
    })]
  });
};

/***/ },

/***/ "./src/components/radio-image.js"
/*!***************************************!*\
  !*** ./src/components/radio-image.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RadioImageComponent: () => (/* binding */ RadioImageComponent)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
const {
    useState
  } = wp.element,
  {
    RadioControl,
    Tooltip
  } = wp.components;


const RadioImageComponent = props => {
  const {
      label,
      description,
      setting,
      fields
    } = props,
    [value, setValue] = useState(setting.get());

  /**
   * Handle Change
   * 
   * @since 1.0.0
   */
  const handleChange = newValue => {
    setting.set(newValue);
    setValue(newValue);
  };

  /**
   * Filter options
   * 
   * @since 1.0.0
   */
  const filterOptions = () => {
    return fields.reduce((_thisVal, item) => {
      let {
        value: itemValue,
        label: itemLabel,
        url
      } = item;
      _thisVal = [..._thisVal, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Tooltip, {
          text: itemLabel,
          delay: 300,
          placement: "top",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: url,
            alt: itemLabel
          })
        }),
        value: itemValue
      }];
      return _thisVal;
    }, []);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RadioControl, {
        selected: value,
        onChange: newValue => handleChange(newValue),
        options: filterOptions()
      })
    })]
  });
};

/***/ },

/***/ "./src/components/section-tab.js"
/*!***************************************!*\
  !*** ./src/components/section-tab.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SectionTabComponent: () => (/* binding */ SectionTabComponent)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
const {
    useState,
    useEffect
  } = wp.element,
  {
    RadioControl
  } = wp.components;


const SectionTabComponent = props => {
  const {
      label,
      description,
      setting,
      fields,
      controls,
      id
    } = props,
    [value, setValue] = useState(setting.get());
  useEffect(() => {
    controls.forEach(control => {
      if (id === control.id) return;
      let {
          params,
          container
        } = control,
        {
          tab = 'general'
        } = params;
      if (tab === value) {
        container.addClass('ian-show').removeClass('ian-hide');
      } else {
        container.addClass('ian-hide').removeClass('ian-show');
      }
    });
  }, [value]);

  /**
   * Handle Change
   * 
   * @since 1.0.0
   */
  const handleChange = newValue => {
    setting.set(newValue);
    setValue(newValue);
  };

  /**
   * Filter options
   * 
   * @since 1.0.0
   */
  const filterOptions = () => {
    return fields.reduce((_thisVal, item) => {
      let {
        value: itemValue,
        label: itemLabel
      } = item;
      _thisVal = [..._thisVal, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: `tab${value === itemValue ? ' active' : ''}`,
          children: itemLabel
        }),
        value: itemValue
      }];
      return _thisVal;
    }, []);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RadioControl, {
        selected: value,
        onChange: newValue => handleChange(newValue),
        options: filterOptions()
      })
    })]
  });
};

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_box_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/box-shadow */ "./src/components/box-shadow.js");
/* harmony import */ var _components_radio_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/radio-image */ "./src/components/radio-image.js");
/* harmony import */ var _components_section_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/section-tab */ "./src/components/section-tab.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
const {
    controlConstructor,
    Control,
    section
  } = wp.customize,
  {
    createElement,
    createRoot,
    useState,
    useEffect,
    unmountComponentAtNode
  } = wp.element,
  {
    ToggleControl
  } = wp.components,
  {
    __
  } = wp.i18n,
  {
    escapeHTML
  } = wp.escapeHtml;




/**
 * MARK: Box Shadow
 * 
 * @package I am News
 * @since 1.0.0
 */

controlConstructor['box-shadow'] = Control.extend({
  ready: function () {
    const control = this,
      {
        params,
        container,
        section: _thisSection,
        setting
      } = control,
      root = container.find('.root')[0],
      reactRoot = createRoot(root),
      props = {
        ...params,
        setting
      };
    let rendered = false; // ensure we render only once

    /**
     * Function to render your React toggle
     */
    const renderBoxShadow = () => {
      if (rendered) return;
      rendered = true;
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_box_shadow__WEBPACK_IMPORTED_MODULE_0__.BoxShadowComponent, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    if (_thisSection) {
      section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
        if (isExpanded) renderBoxShadow();
      });
    } else {
      renderBoxShadow();
    }

    /**
     * Unbind if the controls container <li> tag is remoed
     */
    container.on('remove', () => reactRoot.unmount());
  }
});

/**
 * MARK: Radio Image
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor['radio-image'] = Control.extend({
  ready: function () {
    const control = this,
      {
        params,
        container,
        section: _thisSection,
        setting
      } = control,
      root = container.find('.root')[0],
      reactRoot = createRoot(root),
      props = {
        ...params,
        setting
      };
    let rendered = false; // ensure we render only once

    /**
     * Function to render your React toggle
     */
    const renderRadioImage = () => {
      if (rendered) return;
      rendered = true;
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_radio_image__WEBPACK_IMPORTED_MODULE_1__.RadioImageComponent, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    if (_thisSection) {
      section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
        if (isExpanded) renderRadioImage();
      });
    } else {
      renderRadioImage();
    }

    /**
     * Unbind if the controls container <li> tag is remoed
     */
    container.on('remove', () => reactRoot.unmount());
  }
});

/**
 * MARK: Section Tab
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor['section-tab'] = Control.extend({
  ready: function () {
    const control = this,
      {
        params,
        container,
        section: _thisSection,
        setting
      } = control,
      root = container.find('.root')[0],
      reactRoot = createRoot(root);
    let rendered = false; // ensure we render only once

    /**
     * Function to render your React toggle
     */
    const renderSectionTab = instance => {
      if (rendered) return;
      rendered = true;
      const props = {
        ...params,
        setting,
        id: control.id,
        controls: instance.controls()
      };
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_section_tab__WEBPACK_IMPORTED_MODULE_2__.SectionTabComponent, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    section(_thisSection(), function (instance) {
      if (_thisSection) {
        section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
          if (isExpanded) renderSectionTab(instance);
        });
      } else {
        renderSectionTab(instance);
      }
    });

    /**
     * Unbind if the controls container <li> tag is remoed
     */
    container.on('remove', () => reactRoot.unmount());
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map