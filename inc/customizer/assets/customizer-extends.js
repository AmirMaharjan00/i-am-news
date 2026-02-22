/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js"
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createCache)
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_4__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_4__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_4__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_4__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_4__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_4__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_2__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_4__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_4__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = !!element.parent; // in nested rules comments become children of the "auto-inserted" rule and that's always the `element.parent`
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? element.parent.children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.hash)(value, length)) {
    // color-adjust
    case 5103:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + value + value;
    // order

    case 6165:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(\w+).+(:[^]+)/, stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, '-grow', '') + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /([^-])(transform)/g, '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(zoom-|grab)/, stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(image-set\([^]*)/, stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(.+:)(flex-)?(.*)/, stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(.+)-inline(.+)/, stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.strlen)(value) - 1 - length > 6) switch ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~(0,stylis__WEBPACK_IMPORTED_MODULE_2__.indexof)(value, 'stretch') ? prefix((0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, (0,stylis__WEBPACK_IMPORTED_MODULE_2__.strlen)(value) - 3 - (~(0,stylis__WEBPACK_IMPORTED_MODULE_2__.indexof)(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, ':', ':' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.charat)(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_1__.MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case stylis__WEBPACK_IMPORTED_MODULE_1__.DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case stylis__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_5__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {
        value: (0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(element.value, '@', '@' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)
      })], callback);

    case stylis__WEBPACK_IMPORTED_MODULE_1__.RULESET:
      if (element.length) return (0,stylis__WEBPACK_IMPORTED_MODULE_2__.combine)(element.props, function (value) {
        switch ((0,stylis__WEBPACK_IMPORTED_MODULE_2__.match)(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return (0,stylis__WEBPACK_IMPORTED_MODULE_5__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /:(read-\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return (0,stylis__WEBPACK_IMPORTED_MODULE_5__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]
            }), (0,stylis__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]
            }), (0,stylis__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_2__.replace)(value, /:(plac\w+)/, stylis__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var defaultStylisPlugins = [prefixer];
var getSourceMap;

{
  var sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;

  getSourceMap = function getSourceMap(styles) {
    var matches = styles.match(sourceMapPattern);
    if (!matches) return;
    return matches[matches.length - 1];
  };
}

var createCache = function createCache(options) {
  var key = options.key;

  if (!key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  {
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_5__.stringify, function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_1__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } ];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_6__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_5__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_3__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if (getSourceMap) {
        var sourceMap = getSourceMap(serialized.styles);

        if (sourceMap) {
          currentSheet = {
            insert: function insert(rule) {
              sheet.insert(rule + sourceMap);
            }
          };
        }
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};




/***/ },

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js"
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ murmur2)
/* harmony export */ });
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}




/***/ },

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memoize)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}




/***/ },

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js"
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js ***!
  \*****************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hoistNonReactStatics)
/* harmony export */ });
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});




/***/ },

/***/ "./node_modules/@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ CacheProvider),
/* harmony export */   E: () => (/* binding */ Emotion$1),
/* harmony export */   T: () => (/* binding */ ThemeContext),
/* harmony export */   _: () => (/* binding */ __unsafe_useEmotionCache),
/* harmony export */   a: () => (/* binding */ ThemeProvider),
/* harmony export */   b: () => (/* binding */ withTheme),
/* harmony export */   c: () => (/* binding */ createEmotionProps),
/* harmony export */   h: () => (/* binding */ hasOwn),
/* harmony export */   u: () => (/* binding */ useTheme),
/* harmony export */   w: () => (/* binding */ withEmotionCache)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");










var EmotionCacheContext = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0__.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css'
}) : null);

{
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */react__WEBPACK_IMPORTED_MODULE_0__.createContext({});

{
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ((mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ((theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';
  var WithTheme = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function render(props, ref) {
    var theme = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ThemeContext);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      theme: theme,
      ref: ref
    }, props));
  });
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_4__["default"])(WithTheme, Component);
}

var hasOwn = {}.hasOwnProperty;

var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if (typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var _key in props) {
    if (hasOwn.call(props, _key)) {
      newProps[_key] = props[_key];
    }
  }

  newProps[typePropName] = type; // Runtime labeling is an opt-in feature because:
  // - It causes hydration warnings when using Safari and SSR
  // - It can degrade performance if there are a huge number of elements
  //
  // Even if the flag is set, we still don't compute the label if it has already
  // been determined by the Babel plugin.

  if (typeof globalThis !== 'undefined' && !!globalThis.EMOTION_RUNTIME_AUTO_LABEL && !!props.css && (typeof props.css !== 'object' || !('name' in props.css) || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_5__.registerStyles)(cache, serialized, isStringTag);
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_7__.useInsertionEffectAlwaysWithSyncFallback)(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_5__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_5__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_6__.serializeStyles)(registeredStyles, undefined, react__WEBPACK_IMPORTED_MODULE_0__.useContext(ThemeContext));

  if (serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_6__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var _key2 in props) {
    if (hasOwn.call(props, _key2) && _key2 !== 'css' && _key2 !== typePropName && (_key2 !== labelPropName)) {
      newProps[_key2] = props[_key2];
    }
  }

  newProps.className = className;

  if (ref) {
    newProps.ref = ref;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedComponent, newProps));
});

{
  Emotion.displayName = 'EmotionCssPropInternal';
}

var Emotion$1 = Emotion;




/***/ },

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.development.esm.js"
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.development.esm.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CacheProvider: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.C),
/* harmony export */   ClassNames: () => (/* binding */ ClassNames),
/* harmony export */   Global: () => (/* binding */ Global),
/* harmony export */   ThemeContext: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.T),
/* harmony export */   ThemeProvider: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.a),
/* harmony export */   __unsafe_useEmotionCache: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__._),
/* harmony export */   createElement: () => (/* binding */ jsx),
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   jsx: () => (/* binding */ jsx),
/* harmony export */   keyframes: () => (/* binding */ keyframes),
/* harmony export */   useTheme: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.u),
/* harmony export */   withEmotionCache: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.w),
/* harmony export */   withTheme: () => (/* reexport safe */ _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.b)
/* harmony export */ });
/* harmony import */ var _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emotion-element-489459f2.browser.development.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_8__);












var isDevelopment = true;

var pkg = {
  name: "@emotion/react",
  version: "11.14.0",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  types: "dist/emotion-react.cjs.d.ts",
  exports: {
    ".": {
      types: {
        "import": "./dist/emotion-react.cjs.mjs",
        "default": "./dist/emotion-react.cjs.js"
      },
      development: {
        "edge-light": {
          module: "./dist/emotion-react.development.edge-light.esm.js",
          "import": "./dist/emotion-react.development.edge-light.cjs.mjs",
          "default": "./dist/emotion-react.development.edge-light.cjs.js"
        },
        worker: {
          module: "./dist/emotion-react.development.edge-light.esm.js",
          "import": "./dist/emotion-react.development.edge-light.cjs.mjs",
          "default": "./dist/emotion-react.development.edge-light.cjs.js"
        },
        workerd: {
          module: "./dist/emotion-react.development.edge-light.esm.js",
          "import": "./dist/emotion-react.development.edge-light.cjs.mjs",
          "default": "./dist/emotion-react.development.edge-light.cjs.js"
        },
        browser: {
          module: "./dist/emotion-react.browser.development.esm.js",
          "import": "./dist/emotion-react.browser.development.cjs.mjs",
          "default": "./dist/emotion-react.browser.development.cjs.js"
        },
        module: "./dist/emotion-react.development.esm.js",
        "import": "./dist/emotion-react.development.cjs.mjs",
        "default": "./dist/emotion-react.development.cjs.js"
      },
      "edge-light": {
        module: "./dist/emotion-react.edge-light.esm.js",
        "import": "./dist/emotion-react.edge-light.cjs.mjs",
        "default": "./dist/emotion-react.edge-light.cjs.js"
      },
      worker: {
        module: "./dist/emotion-react.edge-light.esm.js",
        "import": "./dist/emotion-react.edge-light.cjs.mjs",
        "default": "./dist/emotion-react.edge-light.cjs.js"
      },
      workerd: {
        module: "./dist/emotion-react.edge-light.esm.js",
        "import": "./dist/emotion-react.edge-light.cjs.mjs",
        "default": "./dist/emotion-react.edge-light.cjs.js"
      },
      browser: {
        module: "./dist/emotion-react.browser.esm.js",
        "import": "./dist/emotion-react.browser.cjs.mjs",
        "default": "./dist/emotion-react.browser.cjs.js"
      },
      module: "./dist/emotion-react.esm.js",
      "import": "./dist/emotion-react.cjs.mjs",
      "default": "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      types: {
        "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
      },
      development: {
        "edge-light": {
          module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
          "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
          "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
        },
        worker: {
          module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
          "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
          "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
        },
        workerd: {
          module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.esm.js",
          "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.mjs",
          "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.edge-light.cjs.js"
        },
        browser: {
          module: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.esm.js",
          "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.cjs.mjs",
          "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.development.cjs.js"
        },
        module: "./jsx-runtime/dist/emotion-react-jsx-runtime.development.esm.js",
        "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.cjs.mjs",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.development.cjs.js"
      },
      "edge-light": {
        module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
        "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
      },
      worker: {
        module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
        "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
      },
      workerd: {
        module: "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.esm.js",
        "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.mjs",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.edge-light.cjs.js"
      },
      browser: {
        module: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.cjs.mjs",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.cjs.js"
      },
      module: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js",
      "import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
      "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      types: {
        "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
      },
      development: {
        "edge-light": {
          module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
          "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
          "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
        },
        worker: {
          module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
          "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
          "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
        },
        workerd: {
          module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.esm.js",
          "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.mjs",
          "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.edge-light.cjs.js"
        },
        browser: {
          module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.esm.js",
          "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.cjs.mjs",
          "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.development.cjs.js"
        },
        module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.esm.js",
        "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.cjs.mjs",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.development.cjs.js"
      },
      "edge-light": {
        module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
        "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
      },
      worker: {
        module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
        "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
      },
      workerd: {
        module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.esm.js",
        "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.mjs",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.edge-light.cjs.js"
      },
      browser: {
        module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.cjs.mjs",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.cjs.js"
      },
      module: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js",
      "import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
      "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      types: {
        "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
      },
      development: {
        "edge-light": {
          module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
          "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
          "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
        },
        worker: {
          module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
          "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
          "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
        },
        workerd: {
          module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.esm.js",
          "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.mjs",
          "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.edge-light.cjs.js"
        },
        browser: {
          module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.esm.js",
          "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.cjs.mjs",
          "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.development.cjs.js"
        },
        module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.esm.js",
        "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.cjs.mjs",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.development.cjs.js"
      },
      "edge-light": {
        module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
        "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
      },
      worker: {
        module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
        "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
      },
      workerd: {
        module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.esm.js",
        "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.mjs",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.edge-light.cjs.js"
      },
      browser: {
        module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.cjs.mjs",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.cjs.js"
      },
      module: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js",
      "import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
      "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": {
      types: {
        "import": "./macro.d.mts",
        "default": "./macro.d.ts"
      },
      "default": "./macro.js"
    }
  },
  imports: {
    "#is-development": {
      development: "./src/conditions/true.ts",
      "default": "./src/conditions/false.ts"
    },
    "#is-browser": {
      "edge-light": "./src/conditions/false.ts",
      workerd: "./src/conditions/false.ts",
      worker: "./src/conditions/false.ts",
      browser: "./src/conditions/true.ts",
      "default": "./src/conditions/is-browser.ts"
    }
  },
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/css-prop.d.ts",
    "macro.*"
  ],
  sideEffects: false,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.13.5",
    "@emotion/cache": "^11.14.0",
    "@emotion/serialize": "^1.3.3",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.2.0",
    "@emotion/utils": "^1.4.2",
    "@emotion/weak-memoize": "^0.4.0",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.13.5",
    "@emotion/css-prettifier": "1.2.0",
    "@emotion/server": "11.11.0",
    "@emotion/styled": "11.14.0",
    "@types/hoist-non-react-statics": "^3.3.5",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^5.4.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.ts",
      "./jsx-runtime.ts",
      "./jsx-dev-runtime.ts",
      "./_isolated-hnrs.ts"
    ],
    umdName: "emotionReact",
    exports: {
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": {
          types: {
            "import": "./macro.d.mts",
            "default": "./macro.d.ts"
          },
          "default": "./macro.js"
        }
      }
    }
  }
};

var jsx = function jsx(type, props) {
  // eslint-disable-next-line prefer-rest-params
  var args = arguments;

  if (props == null || !_emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.h.call(props, 'css')) {
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.E;
  createElementArgArray[1] = (0,_emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }

  return react__WEBPACK_IMPORTED_MODULE_1__.createElement.apply(null, createElementArgArray);
};

(function (_jsx) {
  var JSX;

  (function (_JSX) {})(JSX || (JSX = _jsx.JSX || (_jsx.JSX = {})));
})(jsx || (jsx = {}));

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.w)(function (props, cache) {
  if (!warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // I don't really want to add it to the type since it shouldn't be used
  'className' in props && props.className || 'css' in props && props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)([styles], undefined, react__WEBPACK_IMPORTED_MODULE_1__.useContext(_emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.T));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef();
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_3__.useInsertionEffectWithLayoutFallback)(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_3__.useInsertionEffectWithLayoutFallback)(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.insertStyles)(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

{
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)(args);
}

function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if (arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_3__.useInsertionEffectAlwaysWithSyncFallback)(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.insertStyles)(cache, serializedArr[i], false);
    }
  });

  return null;
};

var ClassNames = /* #__PURE__ */(0,_emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.w)(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && isDevelopment) {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__.serializeStyles)(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.registerStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && isDevelopment) {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: react__WEBPACK_IMPORTED_MODULE_1__.useContext(_emotion_element_489459f2_browser_development_esm_js__WEBPACK_IMPORTED_MODULE_0__.T)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

{
  ClassNames.displayName = 'EmotionClassNames';
}

{
  var isBrowser = typeof document !== 'undefined'; // #1727, #2905 for some reason Jest and Vitest evaluate modules twice if some consuming module gets mocked

  var isTestEnv = typeof jest !== 'undefined' || typeof vi !== 'undefined';

  if (isBrowser && !isTestEnv) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext = typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : globalThis;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ },

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js"
/*!***********************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializeStyles: () => (/* binding */ serializeStyles)
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var isDevelopment = true;

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

{
  var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  var componentSelector = interpolation;

  if (componentSelector.__emotion_styles !== undefined) {
    if (String(componentSelector) === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return componentSelector;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        var keyframes = interpolation;

        if (keyframes.anim === 1) {
          cursor = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor
          };
          return keyframes.name;
        }

        var serializedStyles = interpolation;

        if (serializedStyles.styles !== undefined) {
          var next = serializedStyles.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = serializedStyles.styles + ";";
          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (_match, _p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join('\n') + "\n\nYou should wrap it with `css` like this:\n\ncss`" + replaced + "`");
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  var asString = interpolation;

  if (registered == null) {
    return asString;
  }

  var cached = registered[asString];
  return cached !== undefined ? cached : asString;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value !== 'object') {
        var asString = value;

        if (registered != null && registered[asString] !== undefined) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === 'NO_COMPONENT_SELECTOR' && isDevelopment) {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g; // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list

var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;

    if (asTemplateStringsArr[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += asTemplateStringsArr[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      var templateStringsArr = strings;

      if (templateStringsArr[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += templateStringsArr[i];
    }
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  {
    var devStyles = {
      name: name,
      styles: styles,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
    return devStyles;
  }
}




/***/ },

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js"
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StyleSheet: () => (/* binding */ StyleSheet)
/* harmony export */ });
var isDevelopment = true;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  } // this function should always return with a value
  // TS can't understand it though so we make it stop complaining here


  return undefined;
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }

      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;

      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ },

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unitlessKeys)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};




/***/ },

/***/ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js"
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js ***!
  \***********************************************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useInsertionEffectAlwaysWithSyncFallback: () => (/* binding */ useInsertionEffectAlwaysWithSyncFallback),
/* harmony export */   useInsertionEffectWithLayoutFallback: () => (/* binding */ useInsertionEffectWithLayoutFallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;




/***/ },

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRegisteredStyles: () => (/* binding */ getRegisteredStyles),
/* harmony export */   insertStyles: () => (/* binding */ insertStyles),
/* harmony export */   registerStyles: () => (/* binding */ registerStyles)
/* harmony export */ });
var isBrowser = true;

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ },

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ weakMemoize)
/* harmony export */ });
var weakMemoize = function weakMemoize(func) {
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // Use non-null assertion because we just checked that the cache `has` it
      // This allows us to remove `undefined` from the return value
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};




/***/ },

/***/ "./src/components/alignment.js"
/*!*************************************!*\
  !*** ./src/components/alignment.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Example: () => (/* binding */ Example)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
const {
    useState
  } = wp.element,
  {
    AlignmentMatrixControl
  } = wp.components;


const Example = () => {
  const [alignment, setAlignment] = useState('center center');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AlignmentMatrixControl, {
        value: alignment,
        onChange: setAlignment
      })
    })]
  });
};

/***/ },

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
      enable,
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
            children: `${enable ? 'Enabled' : 'Disabled'}, x: ${offsetx}, y: ${offsety}, blur: ${blur}`
          });
        },
        renderContent: () => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToggleControl, {
              label: __(escapeHTML('Enable'), 'i-am-news'),
              onChange: newValue => handleChange('enable', newValue),
              checked: enable,
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
/* harmony export */   IanControlHead: () => (/* binding */ IanControlHead),
/* harmony export */   IanResponsiveIcons: () => (/* binding */ IanResponsiveIcons)
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
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
      className: "customizer-control-title",
      children: label
    }), description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Tooltip, {
      className: "description customize-control-description",
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

/**
 * Responsive Icons
 * 
 * @since 1.0.0
 */
const IanResponsiveIcons = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    classname: "responsive-icons",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
      icon: "desktop"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
      icon: "tablet"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
      icon: "smartphone"
    })]
  });
};

/***/ },

/***/ "./src/components/icon-picker.js"
/*!***************************************!*\
  !*** ./src/components/icon-picker.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconPickerComponent: () => (/* binding */ IconPickerComponent)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var _font_awesome_classes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../font-awesome-classes.json */ "./src/font-awesome-classes.json");
/* harmony import */ var react_virtuoso__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-virtuoso */ "./node_modules/react-virtuoso/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
const {
    useState,
    useRef,
    useEffect
  } = wp.element,
  {
    Button,
    SearchControl
  } = wp.components,
  {
    __
  } = wp.i18n,
  {
    escapeHTML
  } = wp.escapeHtml,
  {
    attachment: mediaAttachment
  } = wp.media;




const IconPickerComponent = props => {
  const {
      label,
      description,
      setting,
      exclude,
      display_block: displayBlock
    } = props,
    [value, setValue] = useState(setting.get()),
    {
      type,
      value: currentValue
    } = value,
    mediaFrame = useRef(null),
    [imageUrl, setImageUrl] = useState(''),
    [imageId, setImageId] = useState(0),
    [icon, setIcon] = useState(''),
    [filteredIcons, setFilteredIcons] = useState(_font_awesome_classes_json__WEBPACK_IMPORTED_MODULE_1__);
  useEffect(() => {
    let {
      type,
      value: _thisVal
    } = value;
    if (type === 'image' && _thisVal) {
      const attachment = mediaAttachment(_thisVal);
      attachment.fetch().then(() => {
        const data = attachment.toJSON();
        setImageUrl(data.url);
      });
      setImageId(_thisVal);
    }
    if (type === 'icon') {
      setIcon(value.value);
    }
    setting.set(value);
  }, [value]);

  /**
   * Handle Change
   * 
   * @since 1.0.0
   * @param string clickedIcon icon class
   * @return void 
   */
  const handleIconClick = clickedIcon => {
    setIcon(clickedIcon);
    setValue({
      type: 'icon',
      value: clickedIcon
    });
  };

  /**
   * Handle Button click
   * 
   * @since 1.0.0
   */
  const handleButtonClick = newType => {
    let newValue = {
      type: newType
    };
    switch (newType) {
      case 'icon':
        newValue.value = icon;
        break;
      case 'image':
        newValue.value = imageId;
        break;
      default:
        newValue.value = '';
    }
    setValue(newValue);
  };

  /**
   * Open media library
   * 
   * @since 1.0.0
   */
  const openMediaLibrary = () => {
    if (mediaFrame.current) {
      mediaFrame.current.open();
      return;
    }
    mediaFrame.current = wp.media({
      title: 'Select or Upload Image',
      button: {
        text: 'Use this image'
      },
      library: {
        type: 'image'
      },
      multiple: false
    });
    mediaFrame.current.on('select', () => {
      const attachment = mediaFrame.current.state().get('selection').first().toJSON();
      setImageUrl(attachment.url);
      setImageId(attachment.id);
      setValue({
        type: 'image',
        value: attachment.id
      });
    });
    mediaFrame.current.open();
  };

  /**
   * Handle remove image
   * 
   * @since 1.0.0
   */
  const handleRemoveImage = () => {
    setValue({
      type: 'image',
      value: 0
    });
    setImageUrl('');
  };

  /**
   * handle search change
   * 
   * @since 1.0.0
   * @param object event object
   */
  const handleSearch = searched => {
    if (searched === '') setFilteredIcons(_font_awesome_classes_json__WEBPACK_IMPORTED_MODULE_1__);
    let filtered = _font_awesome_classes_json__WEBPACK_IMPORTED_MODULE_1__.filter(icon => icon.includes(searched.toLowerCase()));
    setFilteredIcons(filtered);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "content-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "buttons-wrapper",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
          onClick: () => handleButtonClick('none'),
          variant: type === 'none' ? 'primary' : 'secondary',
          className: "button-item",
          children: __(escapeHTML('None'), 'i-am-news')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
          onClick: () => handleButtonClick('image'),
          variant: type === 'image' ? 'primary' : 'secondary',
          className: "button-item",
          children: __(escapeHTML('Image'), 'i-am-news')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
          onClick: () => handleButtonClick('icon'),
          variant: type === 'icon' ? 'primary' : 'secondary',
          className: "button-item",
          children: __(escapeHTML('Icon'), 'i-am-news')
        })]
      }), type === 'image' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "image-dropdown",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "preview-area",
          onClick: openMediaLibrary,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "overlay"
          }), imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            src: imageUrl,
            className: "image-preview"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "label",
            children: __('Add Image', 'i-am-news')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "buttons-area",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
            className: "remove button-item",
            variant: "secondary",
            onClick: handleRemoveImage,
            children: __(escapeHTML('Remove'), 'i-am-news')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
            className: "replace button-item",
            variant: "secondary",
            onClick: openMediaLibrary,
            children: __(escapeHTML('Replace'), 'i-am-news')
          })]
        })]
      }), type === 'icon' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "icon-dropdown",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SearchControl, {
          placeholder: __('Search...', 'i-am-news'),
          onChange: handleSearch
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(IconCollection, {
          filteredIcons: filteredIcons,
          icon: value.value,
          handleIconClick: handleIconClick
        })]
      })]
    })]
  });
};

/**
 * Icon Collection
 * 
 * @since 1.0.0
 */
const IconCollection = props => {
  const {
    icon,
    handleIconClick,
    filteredIcons
  } = props;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_virtuoso__WEBPACK_IMPORTED_MODULE_2__.VirtuosoGrid, {
    totalCount: filteredIcons.length,
    className: "icon-collection",
    components: {
      List: React.forwardRef(({
        style,
        children
      }, ref) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        ref: ref,
        className: "container",
        style: {
          ...style
        },
        children: children
      })),
      Item: ({
        children
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: children
      })
    },
    itemContent: index => {
      const variant = icon === filteredIcons[index] ? 'primary' : 'secondary';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
        variant: variant,
        className: "icon-btn",
        onClick: () => handleIconClick(filteredIcons[index]),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
          className: filteredIcons[index]
        })
      });
    }
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

/***/ "./src/components/range.js"
/*!*********************************!*\
  !*** ./src/components/range.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IanRangeControl: () => (/* binding */ IanRangeControl),
/* harmony export */   RangeComponent: () => (/* binding */ RangeComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
    RangeControl,
    SelectControl,
    Button,
    Dashicon
  } = wp.components,
  {
    __
  } = wp.i18n,
  {
    escapeHTML
  } = wp.escapeHtml;

/**
 * Range Control
 * 
 * @since 1.0.0
 */
const RangeComponent = () => {};
const IanRangeControl = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RangeControl, {
      __next40pxDefaultSize: true,
      value: 3,
      afterIcon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
        variant: "secondary",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
          icon: "image-rotate"
        })
      })
      // onChange = { ( value ) => setColumns( value ) }
      ,
      min: 2,
      max: 10
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
      value: 'px',
      options: [{
        label: 'Px',
        value: 'px'
      }, {
        label: 'Em',
        value: 'em'
      }, {
        label: 'Rem',
        value: 'rem'
      }, {
        label: '%',
        value: '%'
      }],
      variant: "minimal"
      // onChange = { ( newSize ) => setSize( newSize ) }
      ,
      __next40pxDefaultSize: true
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
   * Handle change
   * 
   * @since 1.0.0
   */
  const handleChange = newValue => {
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

/***/ "./src/components/toggle-button.js"
/*!*****************************************!*\
  !*** ./src/components/toggle-button.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToggleButtonComponent: () => (/* binding */ ToggleButtonComponent)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
const {
    useState
  } = wp.element,
  {
    RadioControl,
    Tooltip,
    FormToggle
  } = wp.components;


const ToggleButtonComponent = props => {
  const {
      label,
      description,
      setting
    } = props,
    [value, setValue] = useState(setting.get());

  /**
   * Handle change
   * 
   * @since 1.0.0
   */
  const handleChange = () => {
    setValue(!value); // this only change the currently state doesn't save the new value in database
    setting.set(!value);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FormToggle, {
        checked: value,
        onChange: handleChange // if possible create a seperate function
      })
    })]
  });
};

/**
 * TOD0: change file name to just toggle-button.js
 * TODO: used wp.components twice, use de-constructing (i already explained this to you, it's easy) 
 * TODO: Component name should be ToggleButtonComponent
 * TODO: Maintain spacing before and after "=" yo milauna paryo, ali uniform hunxa yesari
 * TODO: IanControlHead adds label and description passed from php file
 * 
 * setting.get() gets the currently save database value
 * setting.set( newValue ) updates the value in database
 */

/***/ },

/***/ "./src/components/typography.js"
/*!**************************************!*\
  !*** ./src/components/typography.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypographComponent: () => (/* binding */ TypographComponent)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components/components.js");
/* harmony import */ var _google_fonts_min_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../google-fonts.min.json */ "./src/google-fonts.min.json");
/* harmony import */ var react_virtuoso__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-virtuoso */ "./node_modules/react-virtuoso/dist/index.mjs");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./range */ "./src/components/range.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
const {
    Dropdown
  } = wp.components,
  {
    useState,
    useEffect,
    useContext,
    createContext
  } = wp.element,
  {
    __
  } = wp.i18n,
  {
    escapeHTML
  } = wp.escapeHtml;






const TypographyContext = createContext(null);

/**
 * MARK: Get font label
 * 
 * @since 1.0.0
 */
const getWeightLabel = weight => {
  let isItalic = weight.includes('italic'),
    weightOnly = weight;
  if (weight.includes('italic') && weight.length > 6) {
    weightOnly = weight.replace('italic', '');
  }
  switch (weightOnly) {
    case '100':
      return `Thin 100${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '200':
      return `Extralight 200${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '300':
      return `Light 300${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '500':
      return `Medium 500${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '600':
      return `SemiBold 600${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '700':
      return `Bold 700${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '800':
      return `ExtraBold 800${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    case '900':
      return `Black 900${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

    default:
      return `Regular 400${isItalic ? ' italic' : ''}`;
      // removed by dead control flow

  }
};

/**
 * MARK: Font Weights
 * 
 * @since 1.0.0
 */
const fontWeights = _google_fonts_min_json__WEBPACK_IMPORTED_MODULE_1__.reduce((_thisVal, item) => {
  const {
    family,
    variants
  } = item;
  _thisVal[family] = {
    normal: variants.filter(variant => !variant.includes('italic')).map(variant => ({
      label: getWeightLabel(variant),
      value: variant
    })),
    italic: variants.filter(variant => variant.includes('italic')).map(variant => ({
      label: getWeightLabel(variant),
      value: variant
    }))
  };
  return _thisVal;
}, {});

/**
 * MARK: Font Familes
 * 
 * @since 1.0.0
 */
const fontFamilies = _google_fonts_min_json__WEBPACK_IMPORTED_MODULE_1__.reduce((_thisVal, _thisFamily) => {
  let {
    family
  } = _thisFamily;
  return [..._thisVal, {
    label: family,
    value: family
  }];
}, []);

/**
 * MARK: Load Google Fonts
 * 
 * @since 1.0.0
 */
const loadGoogleFonts = (group, range, extras = []) => {
  const {
      startIndex = 0,
      endIndex = 8
    } = range,
    fonts = group.filter((_, index) => index >= startIndex && index <= endIndex).map(font => `family=${font.replaceAll(' ', '+')}`).join('&');
  if (extras.length > 0) fonts.concat('&' + extras.map(font => `family=${font.replaceAll(' ', '+')}`).join('&'));
  let link = null;
  if (document.getElementById('ian-google-fonts')) {
    link = document.getElementById('ian-google-fonts');
  } else {
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.id = "ian-google-fonts";
  }
  link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`;
  document.head.appendChild(link);
};

// total of 1932 fonts

/**
 * MARK: Typography Component
 * 
 * @since 1.0.0
 */
const TypographComponent = props => {
  const {
      label,
      description,
      setting
    } = props,
    [value, setValue] = useState(setting.get()),
    {
      font_family,
      font_weight,
      font_size,
      line_height,
      letter_spacing,
      text_transform,
      text_decoration,
      preset
    } = value,
    [range, setRange] = useState({
      startIndex: 0,
      endIndex: 8
    });
  useEffect(() => {
    let families = fontFamilies.map(font => font.value);
    loadGoogleFonts(families, range, [font_family.value]);
  }, [range]);

  /**
   * Update Value
   * 
   * @since 1.0.0
   */
  const updateValue = (id, newValue) => {
    let newTypoValue = {
      ...value,
      [id]: newValue
    };
    setValue(newTypoValue);
    setting.set(newTypoValue);
  };
  const contextObject = {
    updateValue,
    fontFamily: font_family,
    fontWeight: font_weight,
    fontSize: font_size,
    lineHeight: line_height,
    letterSpacing: letter_spacing,
    textTransform: text_transform,
    textDecoration: text_decoration,
    preset,
    range,
    setRange
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "control-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanControlHead, {
      label: label,
      description: description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(TypographyContext.Provider, {
        value: contextObject,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(FontFamily, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(FontWeight, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(FontSize, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(LineHeight, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(LetterSpacing, {})]
      })
    })]
  });
};

/**
 * MARK: Font Family
 * 
 * @since 1.0.0
 */
const FontFamily = () => {
  const {
    fontFamily,
    updateValue
  } = useContext(TypographyContext);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "font-family-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
      className: "label",
      children: __('Font Family', 'i-am-news')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      defaultValue: fontFamily,
      onChange: newValue => updateValue('font_family', newValue),
      options: fontFamilies,
      components: {
        MenuList: FontFamilyList
      },
      placeholder: __(escapeHTML("Select an option"), 'i-am-news'),
      classNamePrefix: "ian-select-wrapper",
      menuPortalTarget: document.body,
      menuPosition: "fixed",
      styles: {
        menuPortal: base => ({
          ...base,
          zIndex: 999999
        })
      }
    })]
  });
};

/**
 * Font Family List
 * 
 * @since 1.0.0
 */
const FontFamilyList = props => {
  const {
      children,
      maxHeight,
      selectProps
    } = props,
    calculatedHeight = Math.min(maxHeight, children.length * 38),
    {
      setRange,
      range
    } = useContext(TypographyContext);
  useEffect(() => {
    if (!children.length) return;
    let fontFamiles = children.map(child => child.props.value);
    loadGoogleFonts(fontFamiles, range, [selectProps.value.value]);
  }, [children]);

  // If children.length === 0, search returned nothing
  if (!children.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      style: {
        height: 38,
        padding: 10,
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center'
      },
      className: "ian-menu-list no-results",
      children: __('No fonts found', 'i-am-news')
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    style: {
      height: calculatedHeight
    },
    className: "ian-menu-list",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_virtuoso__WEBPACK_IMPORTED_MODULE_2__.Virtuoso, {
      totalCount: children.length,
      itemContent: index => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            fontFamily: children[index].props.children
          },
          children: [children[index], " "]
        });
      },
      className: "family-collection",
      rangeChanged: range => {
        setRange(range);
      }
    })
  });
};

/**
 * MARK: Font Weight
 * 
 * @since 1.0.0
 */
const FontWeight = () => {
  const {
      fontWeight,
      fontFamily
    } = useContext(TypographyContext),
    activeFontWeights = fontWeights[fontFamily.label],
    {
      normal = [],
      italic = []
    } = activeFontWeights,
    options = [{
      label: __('Normal', 'i-am-news'),
      options: normal
    }, {
      label: __('Italic', 'i-am-news'),
      options: italic
    }];

  /**
   * Format option label
   * 
   * @since 1.0.0
   */
  const formatOptionLabel = weight => {
    let label = getWeightLabel(weight.value),
      style = {
        fontWeight: label.split(' ')[1],
        fontStyle: label.includes('italic') ? 'italic' : 'normal',
        fontFamily: fontFamily.value
      };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
      className: `weight-label ${weight.value}`,
      style: style,
      children: label
    });
  };

  /**
   * Handle weight change
   * 
   * @since 1.0.0
   */
  const handleWeightChange = newValue => {
    updateValue('font_weight', newValue.value);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "font-weight-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
      className: "label",
      children: __('Font Weight', 'i-am-news')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      defaultValue: {
        label: fontWeight,
        value: fontWeight
      },
      options: options,
      formatOptionLabel: formatOptionLabel,
      onChange: handleWeightChange,
      menuPortalTarget: document.body,
      menuPosition: "fixed",
      styles: {
        menuPortal: base => ({
          ...base,
          zIndex: 999999
        })
      }
    })]
  });
};

/**
 * MARK: Font Size
 * 
 * @since 1.0.0
 */
const FontSize = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "font-size-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "block-head",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "label",
        children: __('Font Size', 'i-am-news')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanResponsiveIcons, {})]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "range-control",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_range__WEBPACK_IMPORTED_MODULE_4__.IanRangeControl, {})
    })]
  });
};

/**
 * MARK: Line Height
 * 
 * @since 1.0.0
 */
const LineHeight = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "line-height-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "block-head",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "label",
        children: __('Line Height', 'i-am-news')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanResponsiveIcons, {})]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "range-control",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_range__WEBPACK_IMPORTED_MODULE_4__.IanRangeControl, {})
    })]
  });
};

/**
 * MARK: Letter Spacing
 * 
 * @since 1.0.0
 */
const LetterSpacing = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "line-height-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "block-head",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "label",
        children: __('Letter Spacing', 'i-am-news')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components__WEBPACK_IMPORTED_MODULE_0__.IanResponsiveIcons, {})]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "range-control",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_range__WEBPACK_IMPORTED_MODULE_4__.IanRangeControl, {})
    })]
  });
};

/***/ },

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {



var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ },

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js"
/*!************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************************************************/
(__unused_webpack_module, exports) {

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ },

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {



if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
}


/***/ },

/***/ "./node_modules/memoize-one/dist/memoize-one.esm.js"
/*!**********************************************************!*\
  !*** ./node_modules/memoize-one/dist/memoize-one.esm.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memoizeOne)
/* harmony export */ });
var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}




/***/ },

/***/ "./node_modules/react-select/dist/Select-ef7c0426.esm.js"
/*!***************************************************************!*\
  !*** ./node_modules/react-select/dist/Select-ef7c0426.esm.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Select),
/* harmony export */   a: () => (/* binding */ defaultProps),
/* harmony export */   b: () => (/* binding */ getOptionLabel$1),
/* harmony export */   c: () => (/* binding */ createFilter),
/* harmony export */   d: () => (/* binding */ defaultTheme),
/* harmony export */   g: () => (/* binding */ getOptionValue$1),
/* harmony export */   m: () => (/* binding */ mergeStyles)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index-641ee5b8.esm.js */ "./node_modules/react-select/dist/index-641ee5b8.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.development.esm.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");














function _EMOTION_STRINGIFIED_CSS_ERROR__$2() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// Assistive text to describe visual elements. Hidden for sighted users.
var _ref =  false ? 0 : {
  name: "1f43avz-a11yText-A11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IEpTWCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var A11yText = function A11yText(props) {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    css: _ref
  }, props));
};
var A11yText$1 = A11yText;

var defaultAriaLiveMessages = {
  guidance: function guidance(props) {
    var isSearchable = props.isSearchable,
      isMulti = props.isMulti,
      tabSelectsValue = props.tabSelectsValue,
      context = props.context,
      isInitialFocus = props.isInitialFocus;
    switch (context) {
      case 'menu':
        return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(tabSelectsValue ? ', press Tab to select the option and exit the menu' : '', ".");
      case 'input':
        return isInitialFocus ? "".concat(props['aria-label'] || 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '') : '';
      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
      default:
        return '';
    }
  },
  onChange: function onChange(props) {
    var action = props.action,
      _props$label = props.label,
      label = _props$label === void 0 ? '' : _props$label,
      labels = props.labels,
      isDisabled = props.isDisabled;
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return "option ".concat(label, ", deselected.");
      case 'clear':
        return 'All selected options have been cleared.';
      case 'initial-input-focus':
        return "option".concat(labels.length > 1 ? 's' : '', " ").concat(labels.join(','), ", selected.");
      case 'select-option':
        return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
      default:
        return '';
    }
  },
  onFocus: function onFocus(props) {
    var context = props.context,
      focused = props.focused,
      options = props.options,
      _props$label2 = props.label,
      label = _props$label2 === void 0 ? '' : _props$label2,
      selectValue = props.selectValue,
      isDisabled = props.isDisabled,
      isSelected = props.isSelected,
      isAppleDevice = props.isAppleDevice;
    var getArrayIndex = function getArrayIndex(arr, item) {
      return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : '';
    };
    if (context === 'value' && selectValue) {
      return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
    }
    if (context === 'menu' && isAppleDevice) {
      var disabled = isDisabled ? ' disabled' : '';
      var status = "".concat(isSelected ? ' selected' : '').concat(disabled);
      return "".concat(label).concat(status, ", ").concat(getArrayIndex(options, focused), ".");
    }
    return '';
  },
  onFilter: function onFilter(props) {
    var inputValue = props.inputValue,
      resultsMessage = props.resultsMessage;
    return "".concat(resultsMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
  }
};

var LiveRegion = function LiveRegion(props) {
  var ariaSelection = props.ariaSelection,
    focusedOption = props.focusedOption,
    focusedValue = props.focusedValue,
    focusableOptions = props.focusableOptions,
    isFocused = props.isFocused,
    selectValue = props.selectValue,
    selectProps = props.selectProps,
    id = props.id,
    isAppleDevice = props.isAppleDevice;
  var ariaLiveMessages = selectProps.ariaLiveMessages,
    getOptionLabel = selectProps.getOptionLabel,
    inputValue = selectProps.inputValue,
    isMulti = selectProps.isMulti,
    isOptionDisabled = selectProps.isOptionDisabled,
    isSearchable = selectProps.isSearchable,
    menuIsOpen = selectProps.menuIsOpen,
    options = selectProps.options,
    screenReaderStatus = selectProps.screenReaderStatus,
    tabSelectsValue = selectProps.tabSelectsValue,
    isLoading = selectProps.isLoading;
  var ariaLabel = selectProps['aria-label'];
  var ariaLive = selectProps['aria-live'];

  // Update aria live message configuration when prop changes
  var messages = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
    return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defaultAriaLiveMessages), ariaLiveMessages || {});
  }, [ariaLiveMessages]);

  // Update aria live selected option when prop changes
  var ariaSelected = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
    var message = '';
    if (ariaSelection && messages.onChange) {
      var option = ariaSelection.option,
        selectedOptions = ariaSelection.options,
        removedValue = ariaSelection.removedValue,
        removedValues = ariaSelection.removedValues,
        value = ariaSelection.value;
      // select-option when !isMulti does not return option so we assume selected option is value
      var asOption = function asOption(val) {
        return !Array.isArray(val) ? val : null;
      };

      // If there is just one item from the action then get its label
      var selected = removedValue || option || asOption(value);
      var label = selected ? getOptionLabel(selected) : '';

      // If there are multiple items from the action then return an array of labels
      var multiSelected = selectedOptions || removedValues || undefined;
      var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];
      var onChangeProps = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label: label,
        labels: labels
      }, ariaSelection);
      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);
  var ariaFocused = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
    var focusMsg = '';
    var focused = focusedOption || focusedValue;
    var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
    if (focused && messages.onFocus) {
      var onFocusProps = {
        focused: focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected: isSelected,
        options: focusableOptions,
        context: focused === focusedOption ? 'menu' : 'value',
        selectValue: selectValue,
        isAppleDevice: isAppleDevice
      };
      focusMsg = messages.onFocus(onFocusProps);
    }
    return focusMsg;
  }, [focusedOption, focusedValue, getOptionLabel, isOptionDisabled, messages, focusableOptions, selectValue, isAppleDevice]);
  var ariaResults = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
    var resultsMsg = '';
    if (menuIsOpen && options.length && !isLoading && messages.onFilter) {
      var resultsMessage = screenReaderStatus({
        count: focusableOptions.length
      });
      resultsMsg = messages.onFilter({
        inputValue: inputValue,
        resultsMessage: resultsMessage
      });
    }
    return resultsMsg;
  }, [focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus, isLoading]);
  var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus';
  var ariaGuidance = (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(function () {
    var guidanceMsg = '';
    if (messages.guidance) {
      var context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance({
        'aria-label': ariaLabel,
        context: context,
        isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
        isMulti: isMulti,
        isSearchable: isSearchable,
        tabSelectsValue: tabSelectsValue,
        isInitialFocus: isInitialFocus
      });
    }
    return guidanceMsg;
  }, [ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue, isInitialFocus]);
  var ScreenReaderText = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
    id: "aria-selection"
  }, ariaSelected), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
    id: "aria-focused"
  }, ariaFocused), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
    id: "aria-results"
  }, ariaResults), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
    id: "aria-guidance"
  }, ariaGuidance));
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(A11yText$1, {
    id: id
  }, isInitialFocus && ScreenReaderText), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(A11yText$1, {
    "aria-live": ariaLive,
    "aria-atomic": "false",
    "aria-relevant": "additions text",
    role: "log"
  }, isFocused && !isInitialFocus && ScreenReaderText));
};
var LiveRegion$1 = LiveRegion;

var diacritics = [{
  base: 'A',
  letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
}, {
  base: 'AA',
  letters: "\uA732"
}, {
  base: 'AE',
  letters: "\xC6\u01FC\u01E2"
}, {
  base: 'AO',
  letters: "\uA734"
}, {
  base: 'AU',
  letters: "\uA736"
}, {
  base: 'AV',
  letters: "\uA738\uA73A"
}, {
  base: 'AY',
  letters: "\uA73C"
}, {
  base: 'B',
  letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
}, {
  base: 'C',
  letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
}, {
  base: 'D',
  letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"
}, {
  base: 'DZ',
  letters: "\u01F1\u01C4"
}, {
  base: 'Dz',
  letters: "\u01F2\u01C5"
}, {
  base: 'E',
  letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
}, {
  base: 'F',
  letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
}, {
  base: 'G',
  letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
}, {
  base: 'H',
  letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
}, {
  base: 'I',
  letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
}, {
  base: 'J',
  letters: "J\u24BF\uFF2A\u0134\u0248"
}, {
  base: 'K',
  letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
}, {
  base: 'L',
  letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
}, {
  base: 'LJ',
  letters: "\u01C7"
}, {
  base: 'Lj',
  letters: "\u01C8"
}, {
  base: 'M',
  letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
}, {
  base: 'N',
  letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
}, {
  base: 'NJ',
  letters: "\u01CA"
}, {
  base: 'Nj',
  letters: "\u01CB"
}, {
  base: 'O',
  letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
}, {
  base: 'OI',
  letters: "\u01A2"
}, {
  base: 'OO',
  letters: "\uA74E"
}, {
  base: 'OU',
  letters: "\u0222"
}, {
  base: 'P',
  letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
}, {
  base: 'Q',
  letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
}, {
  base: 'R',
  letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
}, {
  base: 'S',
  letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
}, {
  base: 'T',
  letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
}, {
  base: 'TZ',
  letters: "\uA728"
}, {
  base: 'U',
  letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
}, {
  base: 'V',
  letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
}, {
  base: 'VY',
  letters: "\uA760"
}, {
  base: 'W',
  letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
}, {
  base: 'X',
  letters: "X\u24CD\uFF38\u1E8A\u1E8C"
}, {
  base: 'Y',
  letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
}, {
  base: 'Z',
  letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
}, {
  base: 'a',
  letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
}, {
  base: 'aa',
  letters: "\uA733"
}, {
  base: 'ae',
  letters: "\xE6\u01FD\u01E3"
}, {
  base: 'ao',
  letters: "\uA735"
}, {
  base: 'au',
  letters: "\uA737"
}, {
  base: 'av',
  letters: "\uA739\uA73B"
}, {
  base: 'ay',
  letters: "\uA73D"
}, {
  base: 'b',
  letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
}, {
  base: 'c',
  letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
}, {
  base: 'd',
  letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
}, {
  base: 'dz',
  letters: "\u01F3\u01C6"
}, {
  base: 'e',
  letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
}, {
  base: 'f',
  letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
}, {
  base: 'g',
  letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
}, {
  base: 'h',
  letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
}, {
  base: 'hv',
  letters: "\u0195"
}, {
  base: 'i',
  letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
}, {
  base: 'j',
  letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
}, {
  base: 'k',
  letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
}, {
  base: 'l',
  letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
}, {
  base: 'lj',
  letters: "\u01C9"
}, {
  base: 'm',
  letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
}, {
  base: 'n',
  letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
}, {
  base: 'nj',
  letters: "\u01CC"
}, {
  base: 'o',
  letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
}, {
  base: 'oi',
  letters: "\u01A3"
}, {
  base: 'ou',
  letters: "\u0223"
}, {
  base: 'oo',
  letters: "\uA74F"
}, {
  base: 'p',
  letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
}, {
  base: 'q',
  letters: "q\u24E0\uFF51\u024B\uA757\uA759"
}, {
  base: 'r',
  letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
}, {
  base: 's',
  letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
}, {
  base: 't',
  letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
}, {
  base: 'tz',
  letters: "\uA729"
}, {
  base: 'u',
  letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
}, {
  base: 'v',
  letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
}, {
  base: 'vy',
  letters: "\uA761"
}, {
  base: 'w',
  letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
}, {
  base: 'x',
  letters: "x\u24E7\uFF58\u1E8B\u1E8D"
}, {
  base: 'y',
  letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
}, {
  base: 'z',
  letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
}];
var anyDiacritic = new RegExp('[' + diacritics.map(function (d) {
  return d.letters;
}).join('') + ']', 'g');
var diacriticToBase = {};
for (var i = 0; i < diacritics.length; i++) {
  var diacritic = diacritics[i];
  for (var j = 0; j < diacritic.letters.length; j++) {
    diacriticToBase[diacritic.letters[j]] = diacritic.base;
  }
}
var stripDiacritics = function stripDiacritics(str) {
  return str.replace(anyDiacritic, function (match) {
    return diacriticToBase[match];
  });
};

var memoizedStripDiacriticsForInput = (0,memoize_one__WEBPACK_IMPORTED_MODULE_10__["default"])(stripDiacritics);
var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};
var defaultStringify = function defaultStringify(option) {
  return "".concat(option.label, " ").concat(option.value);
};
var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    // eslint-disable-next-line no-underscore-dangle
    if (option.data.__isNew__) return true;
    var _ignoreCase$ignoreAcc = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
        ignoreCase: true,
        ignoreAccents: true,
        stringify: defaultStringify,
        trim: true,
        matchFrom: 'any'
      }, config),
      ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
      ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
      stringify = _ignoreCase$ignoreAcc.stringify,
      trim = _ignoreCase$ignoreAcc.trim,
      matchFrom = _ignoreCase$ignoreAcc.matchFrom;
    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);
    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }
    if (ignoreAccents) {
      input = memoizedStripDiacriticsForInput(input);
      candidate = stripDiacritics(candidate);
    }
    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

var _excluded = ["innerRef"];
function DummyInput(_ref) {
  var innerRef = _ref.innerRef,
    props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_11__["default"])(_ref, _excluded);
  // Remove animation props not meant for HTML elements
  var filteredProps = (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.r)(props, 'onExited', 'in', 'enter', 'exit', 'appear');
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: innerRef
  }, filteredProps, {
    css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.css)({
      label: 'dummyInput',
      // get rid of any default styles
      background: 0,
      border: 0,
      // important! this hides the flashing cursor
      caretColor: 'transparent',
      fontSize: 'inherit',
      gridArea: '1 / 1 / 2 / 3',
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: 'transparent',
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: 'relative',
      transform: 'scale(.01)'
    },  false ? 0 : ";label:DummyInput;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyByZW1vdmVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHVtbXlJbnB1dCh7XG4gIGlubmVyUmVmLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydpbnB1dCddICYge1xuICByZWFkb25seSBpbm5lclJlZjogUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xufSkge1xuICAvLyBSZW1vdmUgYW5pbWF0aW9uIHByb3BzIG5vdCBtZWFudCBmb3IgSFRNTCBlbGVtZW50c1xuICBjb25zdCBmaWx0ZXJlZFByb3BzID0gcmVtb3ZlUHJvcHMoXG4gICAgcHJvcHMsXG4gICAgJ29uRXhpdGVkJyxcbiAgICAnaW4nLFxuICAgICdlbnRlcicsXG4gICAgJ2V4aXQnLFxuICAgICdhcHBlYXInXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8aW5wdXRcbiAgICAgIHJlZj17aW5uZXJSZWZ9XG4gICAgICB7Li4uZmlsdGVyZWRQcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBsYWJlbDogJ2R1bW15SW5wdXQnLFxuICAgICAgICAvLyBnZXQgcmlkIG9mIGFueSBkZWZhdWx0IHN0eWxlc1xuICAgICAgICBiYWNrZ3JvdW5kOiAwLFxuICAgICAgICBib3JkZXI6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgdGhpcyBoaWRlcyB0aGUgZmxhc2hpbmcgY3Vyc29yXG4gICAgICAgIGNhcmV0Q29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgICAgIGdyaWRBcmVhOiAnMSAvIDEgLyAyIC8gMycsXG4gICAgICAgIG91dGxpbmU6IDAsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgd2l0aG91dCBgd2lkdGhgIGJyb3dzZXJzIHdvbid0IGFsbG93IGZvY3VzXG4gICAgICAgIHdpZHRoOiAxLFxuXG4gICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gZGVza3RvcFxuICAgICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JyxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIG1vYmlsZSB3aGlsc3QgbWFpbnRhaW5pbmcgXCJzY3JvbGwgaW50byB2aWV3XCIgYmVoYXZpb3VyXG4gICAgICAgIGxlZnQ6IC0xMDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSguMDEpJyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cbiJdfQ== */")
  }));
}

var cancelScroll = function cancelScroll(event) {
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();
};
function useScrollCapture(_ref) {
  var isEnabled = _ref.isEnabled,
    onBottomArrive = _ref.onBottomArrive,
    onBottomLeave = _ref.onBottomLeave,
    onTopArrive = _ref.onTopArrive,
    onTopLeave = _ref.onTopLeave;
  var isBottom = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(false);
  var isTop = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(false);
  var touchStart = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(0);
  var scrollTarget = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
  var handleEventDelta = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event, delta) {
    if (scrollTarget.current === null) return;
    var _scrollTarget$current = scrollTarget.current,
      scrollTop = _scrollTarget$current.scrollTop,
      scrollHeight = _scrollTarget$current.scrollHeight,
      clientHeight = _scrollTarget$current.clientHeight;
    var target = scrollTarget.current;
    var isDeltaPositive = delta > 0;
    var availableScroll = scrollHeight - clientHeight - scrollTop;
    var shouldCancelScroll = false;

    // reset bottom/top flags
    if (availableScroll > delta && isBottom.current) {
      if (onBottomLeave) onBottomLeave(event);
      isBottom.current = false;
    }
    if (isDeltaPositive && isTop.current) {
      if (onTopLeave) onTopLeave(event);
      isTop.current = false;
    }

    // bottom limit
    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !isBottom.current) {
        onBottomArrive(event);
      }
      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      isBottom.current = true;

      // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !isTop.current) {
        onTopArrive(event);
      }
      target.scrollTop = 0;
      shouldCancelScroll = true;
      isTop.current = true;
    }

    // cancel scroll
    if (shouldCancelScroll) {
      cancelScroll(event);
    }
  }, [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]);
  var onWheel = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event) {
    handleEventDelta(event, event.deltaY);
  }, [handleEventDelta]);
  var onTouchStart = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event) {
    // set touch start so we can calculate touchmove delta
    touchStart.current = event.changedTouches[0].clientY;
  }, []);
  var onTouchMove = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (event) {
    var deltaY = touchStart.current - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  }, [handleEventDelta]);
  var startListening = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (el) {
    // bail early if no element is available to attach to
    if (!el) return;
    var notPassive = _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.s ? {
      passive: false
    } : false;
    el.addEventListener('wheel', onWheel, notPassive);
    el.addEventListener('touchstart', onTouchStart, notPassive);
    el.addEventListener('touchmove', onTouchMove, notPassive);
  }, [onTouchMove, onTouchStart, onWheel]);
  var stopListening = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (el) {
    // bail early if no element is available to detach from
    if (!el) return;
    el.removeEventListener('wheel', onWheel, false);
    el.removeEventListener('touchstart', onTouchStart, false);
    el.removeEventListener('touchmove', onTouchMove, false);
  }, [onTouchMove, onTouchStart, onWheel]);
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    startListening(element);
    return function () {
      stopListening(element);
    };
  }, [isEnabled, startListening, stopListening]);
  return function (element) {
    scrollTarget.current = element;
  };
}

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
  boxSizing: 'border-box',
  // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};
function preventTouchMove(e) {
  if (e.cancelable) e.preventDefault();
}
function allowTouchMove(e) {
  e.stopPropagation();
}
function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;
  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
  capture: false,
  passive: false
};
function useScrollLock(_ref) {
  var isEnabled = _ref.isEnabled,
    _ref$accountForScroll = _ref.accountForScrollbars,
    accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
  var originalStyles = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)({});
  var scrollTarget = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
  var addScrollLock = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;
    if (accountForScrollbars) {
      // store any styles already applied to the body
      STYLE_KEYS.forEach(function (key) {
        var val = targetStyle && targetStyle[key];
        originalStyles.current[key] = val;
      });
    }

    // apply the lock styles and padding if this is the first scroll lock
    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function (key) {
        var val = LOCK_STYLES[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
      if (targetStyle) {
        targetStyle.paddingRight = "".concat(adjustedPadding, "px");
      }
    }

    // account for touch devices
    if (target && isTouchDevice()) {
      // Mobile Safari ignores { overflow: hidden } declaration on the body.
      target.addEventListener('touchmove', preventTouchMove, listenerOptions);

      // Allow scroll on provided target
      if (touchScrollTarget) {
        touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.addEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }

    // increment active scroll locks
    activeScrollLocks += 1;
  }, [accountForScrollbars]);
  var removeScrollLock = (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;

    // safely decrement active scroll locks
    activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

    // reapply original body styles, if any
    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function (key) {
        var val = originalStyles.current[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    }

    // remove touch listeners
    if (target && isTouchDevice()) {
      target.removeEventListener('touchmove', preventTouchMove, listenerOptions);
      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.removeEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }
  }, [accountForScrollbars]);
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    addScrollLock(element);
    return function () {
      removeScrollLock(element);
    };
  }, [isEnabled, addScrollLock, removeScrollLock]);
  return function (element) {
    scrollTarget.current = element;
  };
}

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var blurSelectInput = function blurSelectInput(event) {
  var element = event.target;
  return element.ownerDocument.activeElement && element.ownerDocument.activeElement.blur();
};
var _ref2$1 =  false ? 0 : {
  name: "bp8cua-ScrollManager",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9EVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2ssIE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9IChldmVudDogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgcmV0dXJuIChcbiAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgIChlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYmx1cigpXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY3JvbGxNYW5hZ2VyKHtcbiAgY2hpbGRyZW4sXG4gIGxvY2tFbmFibGVkLFxuICBjYXB0dXJlRW5hYmxlZCA9IHRydWUsXG4gIG9uQm90dG9tQXJyaXZlLFxuICBvbkJvdHRvbUxlYXZlLFxuICBvblRvcEFycml2ZSxcbiAgb25Ub3BMZWF2ZSxcbn06IFByb3BzKSB7XG4gIGNvbnN0IHNldFNjcm9sbENhcHR1cmVUYXJnZXQgPSB1c2VTY3JvbGxDYXB0dXJlKHtcbiAgICBpc0VuYWJsZWQ6IGNhcHR1cmVFbmFibGVkLFxuICAgIG9uQm90dG9tQXJyaXZlLFxuICAgIG9uQm90dG9tTGVhdmUsXG4gICAgb25Ub3BBcnJpdmUsXG4gICAgb25Ub3BMZWF2ZSxcbiAgfSk7XG4gIGNvbnN0IHNldFNjcm9sbExvY2tUYXJnZXQgPSB1c2VTY3JvbGxMb2NrKHsgaXNFbmFibGVkOiBsb2NrRW5hYmxlZCB9KTtcblxuICBjb25zdCB0YXJnZXRSZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PiA9IChlbGVtZW50KSA9PiB7XG4gICAgc2V0U2Nyb2xsQ2FwdHVyZVRhcmdldChlbGVtZW50KTtcbiAgICBzZXRTY3JvbGxMb2NrVGFyZ2V0KGVsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAge2xvY2tFbmFibGVkICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9e2JsdXJTZWxlY3RJbnB1dH1cbiAgICAgICAgICBjc3M9e3sgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtjaGlsZHJlbih0YXJnZXRSZWYpfVxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};
function ScrollManager(_ref) {
  var children = _ref.children,
    lockEnabled = _ref.lockEnabled,
    _ref$captureEnabled = _ref.captureEnabled,
    captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled,
    onBottomArrive = _ref.onBottomArrive,
    onBottomLeave = _ref.onBottomLeave,
    onTopArrive = _ref.onTopArrive,
    onTopLeave = _ref.onTopLeave;
  var setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive: onBottomArrive,
    onBottomLeave: onBottomLeave,
    onTopArrive: onTopArrive,
    onTopLeave: onTopLeave
  });
  var setScrollLockTarget = useScrollLock({
    isEnabled: lockEnabled
  });
  var targetRef = function targetRef(element) {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, lockEnabled && (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
    onClick: blurSelectInput,
    css: _ref2$1
  }), children(targetRef));
}

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref2 =  false ? 0 : {
  name: "5kkxb2-requiredInput-RequiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var RequiredInput = function RequiredInput(_ref) {
  var name = _ref.name,
    onFocus = _ref.onFocus;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
    required: true,
    name: name,
    tabIndex: -1,
    "aria-hidden": "true",
    onFocus: onFocus,
    css: _ref2
    // Prevent `Switching from uncontrolled to controlled` error
    ,
    value: "",
    onChange: function onChange() {}
  });
};
var RequiredInput$1 = RequiredInput;

/// <reference types="user-agent-data-types" />

function testPlatform(re) {
  var _window$navigator$use;
  return typeof window !== 'undefined' && window.navigator != null ? re.test(((_window$navigator$use = window.navigator['userAgentData']) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.platform) || window.navigator.platform) : false;
}
function isIPhone() {
  return testPlatform(/^iPhone/i);
}
function isMac() {
  return testPlatform(/^Mac/i);
}
function isIPad() {
  return testPlatform(/^iPad/i) ||
  // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAppleDevice() {
  return isMac() || isIOS();
}

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

var defaultStyles = {
  clearIndicator: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.a,
  container: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.b,
  control: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.d,
  dropdownIndicator: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.e,
  group: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.g,
  groupHeading: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.f,
  indicatorsContainer: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.i,
  indicatorSeparator: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.h,
  input: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.j,
  loadingIndicator: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.l,
  loadingMessage: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.k,
  menu: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.m,
  menuList: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.n,
  menuPortal: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.o,
  multiValue: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.p,
  multiValueLabel: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.q,
  multiValueRemove: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.t,
  noOptionsMessage: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.u,
  option: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.v,
  placeholder: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.w,
  singleValue: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.x,
  valueContainer: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.y
};
// Merge Utility
// Allows consumers to extend a base Select with additional styles

function mergeStyles(source) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // initialize with source styles
  var styles = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, source);

  // massage in target styles
  Object.keys(target).forEach(function (keyAsString) {
    var key = keyAsString;
    if (source[key]) {
      styles[key] = function (rsCss, props) {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });
  return styles;
}

var colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};
var borderRadius = 4;
// Used to calculate consistent margin/padding on elements
var baseUnit = 4;
// The minimum height of the control
var controlHeight = 38;
// The amount of space between the control and menu */
var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};
var defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

var defaultProps = {
  'aria-live': 'polite',
  backspaceRemovesValue: true,
  blurInputOnSelect: (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.z)(),
  captureMenuScroll: !(0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.z)(),
  classNames: {},
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel$1,
  getOptionValue: getOptionValue$1,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !(0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.A)(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true,
  unstyled: false
};
function toCategorizedOption(props, option, selectValue, index) {
  var isDisabled = _isOptionDisabled(props, option, selectValue);
  var isSelected = _isOptionSelected(props, option, selectValue);
  var label = getOptionLabel(props, option);
  var value = getOptionValue(props, option);
  return {
    type: 'option',
    data: option,
    isDisabled: isDisabled,
    isSelected: isSelected,
    label: label,
    value: value,
    index: index
  };
}
function buildCategorizedOptions(props, selectValue) {
  return props.options.map(function (groupOrOption, groupOrOptionIndex) {
    if ('options' in groupOrOption) {
      var categorizedOptions = groupOrOption.options.map(function (option, optionIndex) {
        return toCategorizedOption(props, option, selectValue, optionIndex);
      }).filter(function (categorizedOption) {
        return isFocusable(props, categorizedOption);
      });
      return categorizedOptions.length > 0 ? {
        type: 'group',
        data: groupOrOption,
        options: categorizedOptions,
        index: groupOrOptionIndex
      } : undefined;
    }
    var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
    return isFocusable(props, categorizedOption) ? categorizedOption : undefined;
  }).filter(_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.K);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
  return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === 'group') {
      optionsAccumulator.push.apply(optionsAccumulator, (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__["default"])(categorizedOption.options.map(function (option) {
        return option.data;
      })));
    } else {
      optionsAccumulator.push(categorizedOption.data);
    }
    return optionsAccumulator;
  }, []);
}
function buildFocusableOptionsWithIds(categorizedOptions, optionId) {
  return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === 'group') {
      optionsAccumulator.push.apply(optionsAccumulator, (0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__["default"])(categorizedOption.options.map(function (option) {
        return {
          data: option.data,
          id: "".concat(optionId, "-").concat(categorizedOption.index, "-").concat(option.index)
        };
      })));
    } else {
      optionsAccumulator.push({
        data: categorizedOption.data,
        id: "".concat(optionId, "-").concat(categorizedOption.index)
      });
    }
    return optionsAccumulator;
  }, []);
}
function buildFocusableOptions(props, selectValue) {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
  var _props$inputValue = props.inputValue,
    inputValue = _props$inputValue === void 0 ? '' : _props$inputValue;
  var data = categorizedOption.data,
    isSelected = categorizedOption.isSelected,
    label = categorizedOption.label,
    value = categorizedOption.value;
  return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
    label: label,
    value: value,
    data: data
  }, inputValue);
}
function getNextFocusedValue(state, nextSelectValue) {
  var focusedValue = state.focusedValue,
    lastSelectValue = state.selectValue;
  var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
  if (lastFocusedIndex > -1) {
    var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
    if (nextFocusedIndex > -1) {
      // the focused value is still in the selectValue, return it
      return focusedValue;
    } else if (lastFocusedIndex < nextSelectValue.length) {
      // the focusedValue is not present in the next selectValue array by
      // reference, so return the new value at the same index
      return nextSelectValue[lastFocusedIndex];
    }
  }
  return null;
}
function getNextFocusedOption(state, options) {
  var lastFocusedOption = state.focusedOption;
  return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}
var getFocusedOptionId = function getFocusedOptionId(focusableOptionsWithIds, focusedOption) {
  var _focusableOptionsWith;
  var focusedOptionId = (_focusableOptionsWith = focusableOptionsWithIds.find(function (option) {
    return option.data === focusedOption;
  })) === null || _focusableOptionsWith === void 0 ? void 0 : _focusableOptionsWith.id;
  return focusedOptionId || null;
};
var getOptionLabel = function getOptionLabel(props, data) {
  return props.getOptionLabel(data);
};
var getOptionValue = function getOptionValue(props, data) {
  return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
  return typeof props.isOptionDisabled === 'function' ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
  if (selectValue.indexOf(option) > -1) return true;
  if (typeof props.isOptionSelected === 'function') {
    return props.isOptionSelected(option, selectValue);
  }
  var candidate = getOptionValue(props, option);
  return selectValue.some(function (i) {
    return getOptionValue(props, i) === candidate;
  });
}
function _filterOption(props, option, inputValue) {
  return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
  var hideSelectedOptions = props.hideSelectedOptions,
    isMulti = props.isMulti;
  if (hideSelectedOptions === undefined) return isMulti;
  return hideSelectedOptions;
};
var instanceId = 1;
var Select = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Select, _Component);
  var _super = (0,_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(Select);
  // Misc. Instance Properties
  // ------------------------------

  // TODO

  // Refs
  // ------------------------------

  // Lifecycle
  // ------------------------------

  function Select(_props) {
    var _this;
    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Select);
    _this = _super.call(this, _props);
    _this.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedOptionId: null,
      focusableOptionsWithIds: [],
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      selectValue: [],
      clearFocusValueOnUpdate: false,
      prevWasFocused: false,
      inputIsHiddenAfterUpdate: undefined,
      prevProps: undefined,
      instancePrefix: '',
      isAppleDevice: false
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.commonProps = void 0;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.controlRef = null;
    _this.getControlRef = function (ref) {
      _this.controlRef = ref;
    };
    _this.focusedOptionRef = null;
    _this.getFocusedOptionRef = function (ref) {
      _this.focusedOptionRef = ref;
    };
    _this.menuListRef = null;
    _this.getMenuListRef = function (ref) {
      _this.menuListRef = ref;
    };
    _this.inputRef = null;
    _this.getInputRef = function (ref) {
      _this.inputRef = ref;
    };
    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;
    _this.onChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        name = _this$props.name;
      actionMeta.name = name;
      _this.ariaOnChange(newValue, actionMeta);
      onChange(newValue, actionMeta);
    };
    _this.setValue = function (newValue, action, option) {
      var _this$props2 = _this.props,
        closeMenuOnSelect = _this$props2.closeMenuOnSelect,
        isMulti = _this$props2.isMulti,
        inputValue = _this$props2.inputValue;
      _this.onInputChange('', {
        action: 'set-value',
        prevInputValue: inputValue
      });
      if (closeMenuOnSelect) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      }
      // when the select value should change, we should reset focusedValue
      _this.setState({
        clearFocusValueOnUpdate: true
      });
      _this.onChange(newValue, {
        action: action,
        option: option
      });
    };
    _this.selectOption = function (newValue) {
      var _this$props3 = _this.props,
        blurInputOnSelect = _this$props3.blurInputOnSelect,
        isMulti = _this$props3.isMulti,
        name = _this$props3.name;
      var selectValue = _this.state.selectValue;
      var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
      var isDisabled = _this.isOptionDisabled(newValue, selectValue);
      if (deselected) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue((0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.B)(selectValue.filter(function (i) {
          return _this.getOptionValue(i) !== candidate;
        })), 'deselect-option', newValue);
      } else if (!isDisabled) {
        // Select option if option is not disabled
        if (isMulti) {
          _this.setValue((0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.B)([].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_6__["default"])(selectValue), [newValue])), 'select-option', newValue);
        } else {
          _this.setValue((0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.C)(newValue), 'select-option');
        }
      } else {
        _this.ariaOnChange((0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.C)(newValue), {
          action: 'select-option',
          option: newValue,
          name: name
        });
        return;
      }
      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };
    _this.removeValue = function (removedValue) {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var candidate = _this.getOptionValue(removedValue);
      var newValueArray = selectValue.filter(function (i) {
        return _this.getOptionValue(i) !== candidate;
      });
      var newValue = (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.D)(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: 'remove-value',
        removedValue: removedValue
      });
      _this.focusInput();
    };
    _this.clearValue = function () {
      var selectValue = _this.state.selectValue;
      _this.onChange((0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.D)(_this.props.isMulti, [], null), {
        action: 'clear',
        removedValues: selectValue
      });
    };
    _this.popValue = function () {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValueArray = selectValue.slice(0, selectValue.length - 1);
      var newValue = (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.D)(isMulti, newValueArray, newValueArray[0] || null);
      if (lastSelectedValue) {
        _this.onChange(newValue, {
          action: 'pop-value',
          removedValue: lastSelectedValue
        });
      }
    };
    _this.getFocusedOptionId = function (focusedOption) {
      return getFocusedOptionId(_this.state.focusableOptionsWithIds, focusedOption);
    };
    _this.getFocusableOptionsWithIds = function () {
      return buildFocusableOptionsWithIds(buildCategorizedOptions(_this.props, _this.state.selectValue), _this.getElementId('option'));
    };
    _this.getValue = function () {
      return _this.state.selectValue;
    };
    _this.cx = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.E.apply(void 0, [_this.props.classNamePrefix].concat(args));
    };
    _this.getOptionLabel = function (data) {
      return getOptionLabel(_this.props, data);
    };
    _this.getOptionValue = function (data) {
      return getOptionValue(_this.props, data);
    };
    _this.getStyles = function (key, props) {
      var unstyled = _this.props.unstyled;
      var base = defaultStyles[key](props, unstyled);
      base.boxSizing = 'border-box';
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };
    _this.getClassNames = function (key, props) {
      var _this$props$className, _this$props$className2;
      return (_this$props$className = (_this$props$className2 = _this.props.classNames)[key]) === null || _this$props$className === void 0 ? void 0 : _this$props$className.call(_this$props$className2, props);
    };
    _this.getElementId = function (element) {
      return "".concat(_this.state.instancePrefix, "-").concat(element);
    };
    _this.getComponents = function () {
      return (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.F)(_this.props);
    };
    _this.buildCategorizedOptions = function () {
      return buildCategorizedOptions(_this.props, _this.state.selectValue);
    };
    _this.getCategorizedOptions = function () {
      return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
    };
    _this.buildFocusableOptions = function () {
      return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
    };
    _this.getFocusableOptions = function () {
      return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
    };
    _this.ariaOnChange = function (value, actionMeta) {
      _this.setState({
        ariaSelection: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
          value: value
        }, actionMeta)
      });
    };
    _this.onMenuMouseDown = function (event) {
      if (event.button !== 0) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      _this.focusInput();
    };
    _this.onMenuMouseMove = function (event) {
      _this.blockOptionHover = false;
    };
    _this.onControlMouseDown = function (event) {
      // Event captured by dropdown indicator
      if (event.defaultPrevented) {
        return;
      }
      var openMenuOnClick = _this.props.openMenuOnClick;
      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }
        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu('first');
        }
      } else {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          _this.onMenuClose();
        }
      }
      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
      }
    };
    _this.onDropdownIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      if (_this.props.isDisabled) return;
      var _this$props4 = _this.props,
        isMulti = _this$props4.isMulti,
        menuIsOpen = _this$props4.menuIsOpen;
      _this.focusInput();
      if (menuIsOpen) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      } else {
        _this.openMenu('first');
      }
      event.preventDefault();
    };
    _this.onClearIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      _this.clearValue();
      event.preventDefault();
      _this.openAfterFocus = false;
      if (event.type === 'touchend') {
        _this.focusInput();
      } else {
        setTimeout(function () {
          return _this.focusInput();
        });
      }
    };
    _this.onScroll = function (event) {
      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
        if (event.target instanceof HTMLElement && (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.G)(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };
    _this.onCompositionStart = function () {
      _this.isComposing = true;
    };
    _this.onCompositionEnd = function () {
      _this.isComposing = false;
    };
    _this.onTouchStart = function (_ref2) {
      var touches = _ref2.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };
    _this.onTouchMove = function (_ref3) {
      var touches = _ref3.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };
    _this.onTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      // close the menu if the user taps outside
      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
      // on events on child elements, not the document (which we've attached this handler to).
      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      }

      // reset move vars
      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };
    _this.onControlTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onControlMouseDown(event);
    };
    _this.onClearIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onClearIndicatorMouseDown(event);
    };
    _this.onDropdownIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onDropdownIndicatorMouseDown(event);
    };
    _this.handleInputChange = function (event) {
      var prevInputValue = _this.props.inputValue;
      var inputValue = event.currentTarget.value;
      _this.setState({
        inputIsHiddenAfterUpdate: false
      });
      _this.onInputChange(inputValue, {
        action: 'input-change',
        prevInputValue: prevInputValue
      });
      if (!_this.props.menuIsOpen) {
        _this.onMenuOpen();
      }
    };
    _this.onInputFocus = function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
      _this.setState({
        inputIsHiddenAfterUpdate: false,
        isFocused: true
      });
      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu('first');
      }
      _this.openAfterFocus = false;
    };
    _this.onInputBlur = function (event) {
      var prevInputValue = _this.props.inputValue;
      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();
        return;
      }
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
      _this.onInputChange('', {
        action: 'input-blur',
        prevInputValue: prevInputValue
      });
      _this.onMenuClose();
      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };
    _this.onOptionHover = function (focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }
      var options = _this.getFocusableOptions();
      var focusedOptionIndex = options.indexOf(focusedOption);
      _this.setState({
        focusedOption: focusedOption,
        focusedOptionId: focusedOptionIndex > -1 ? _this.getFocusedOptionId(focusedOption) : null
      });
    };
    _this.shouldHideSelectedOptions = function () {
      return shouldHideSelectedOptions(_this.props);
    };
    _this.onValueInputFocus = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.focus();
    };
    _this.onKeyDown = function (event) {
      var _this$props5 = _this.props,
        isMulti = _this$props5.isMulti,
        backspaceRemovesValue = _this$props5.backspaceRemovesValue,
        escapeClearsValue = _this$props5.escapeClearsValue,
        inputValue = _this$props5.inputValue,
        isClearable = _this$props5.isClearable,
        isDisabled = _this$props5.isDisabled,
        menuIsOpen = _this$props5.menuIsOpen,
        onKeyDown = _this$props5.onKeyDown,
        tabSelectsValue = _this$props5.tabSelectsValue,
        openMenuOnFocus = _this$props5.openMenuOnFocus;
      var _this$state = _this.state,
        focusedOption = _this$state.focusedOption,
        focusedValue = _this$state.focusedValue,
        selectValue = _this$state.selectValue;
      if (isDisabled) return;
      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
        if (event.defaultPrevented) {
          return;
        }
      }

      // Block option hover events when the user has just pressed a key
      _this.blockOptionHover = true;
      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;
          _this.focusValue('previous');
          break;
        case 'ArrowRight':
          if (!isMulti || inputValue) return;
          _this.focusValue('next');
          break;
        case 'Delete':
        case 'Backspace':
          if (inputValue) return;
          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue) return;
            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }
          break;
        case 'Tab':
          if (_this.isComposing) return;
          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption ||
          // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }
          _this.selectOption(focusedOption);
          break;
        case 'Enter':
          if (event.keyCode === 229) {
            // ignore the keydown event from an Input Method Editor(IME)
            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
            break;
          }
          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;
            _this.selectOption(focusedOption);
            break;
          }
          return;
        case 'Escape':
          if (menuIsOpen) {
            _this.setState({
              inputIsHiddenAfterUpdate: false
            });
            _this.onInputChange('', {
              action: 'menu-close',
              prevInputValue: inputValue
            });
            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }
          break;
        case ' ':
          // space
          if (inputValue) {
            return;
          }
          if (!menuIsOpen) {
            _this.openMenu('first');
            break;
          }
          if (!focusedOption) return;
          _this.selectOption(focusedOption);
          break;
        case 'ArrowUp':
          if (menuIsOpen) {
            _this.focusOption('up');
          } else {
            _this.openMenu('last');
          }
          break;
        case 'ArrowDown':
          if (menuIsOpen) {
            _this.focusOption('down');
          } else {
            _this.openMenu('first');
          }
          break;
        case 'PageUp':
          if (!menuIsOpen) return;
          _this.focusOption('pageup');
          break;
        case 'PageDown':
          if (!menuIsOpen) return;
          _this.focusOption('pagedown');
          break;
        case 'Home':
          if (!menuIsOpen) return;
          _this.focusOption('first');
          break;
        case 'End':
          if (!menuIsOpen) return;
          _this.focusOption('last');
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    _this.state.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);
    _this.state.selectValue = (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.H)(_props.value);
    // Set focusedOption if menuIsOpen is set on init (e.g. defaultMenuIsOpen)
    if (_props.menuIsOpen && _this.state.selectValue.length) {
      var focusableOptionsWithIds = _this.getFocusableOptionsWithIds();
      var focusableOptions = _this.buildFocusableOptions();
      var optionIndex = focusableOptions.indexOf(_this.state.selectValue[0]);
      _this.state.focusableOptionsWithIds = focusableOptionsWithIds;
      _this.state.focusedOption = focusableOptions[optionIndex];
      _this.state.focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusableOptions[optionIndex]);
    }
    return _this;
  }
  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startListeningComposition();
      this.startListeningToTouch();
      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
        // Listen to all scroll events, and filter them out inside of 'onScroll'
        document.addEventListener('scroll', this.onScroll, true);
      }
      if (this.props.autoFocus) {
        this.focusInput();
      }

      // Scroll focusedOption into view if menuIsOpen is set on mount (e.g. defaultMenuIsOpen)
      if (this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef) {
        (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.I)(this.menuListRef, this.focusedOptionRef);
      }
      if (isAppleDevice()) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          isAppleDevice: true
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
        isDisabled = _this$props6.isDisabled,
        menuIsOpen = _this$props6.menuIsOpen;
      var isFocused = this.state.isFocused;
      if (
      // ensure focus is restored correctly when the control becomes enabled
      isFocused && !isDisabled && prevProps.isDisabled ||
      // ensure focus is on the Input when the menu opens
      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
        this.focusInput();
      }
      if (isFocused && isDisabled && !prevProps.isDisabled) {
        // ensure select state gets blurred in case Select is programmatically disabled while focused
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: false
        }, this.onMenuClose);
      } else if (!isFocused && !isDisabled && prevProps.isDisabled && this.inputRef === document.activeElement) {
        // ensure select state gets focused in case Select is programatically re-enabled while focused (Firefox)
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: true
        });
      }

      // scroll the focused option into view if necessary
      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.I)(this.menuListRef, this.focusedOptionRef);
        this.scrollToFocusedOptionOnUpdate = false;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopListeningComposition();
      this.stopListeningToTouch();
      document.removeEventListener('scroll', this.onScroll, true);
    }

    // ==============================
    // Consumer Handlers
    // ==============================
  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      this.onInputChange('', {
        action: 'menu-close',
        prevInputValue: this.props.inputValue
      });
      this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }

    // ==============================
    // Methods
    // ==============================
  }, {
    key: "focusInput",
    value: function focusInput() {
      if (!this.inputRef) return;
      this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function blurInput() {
      if (!this.inputRef) return;
      this.inputRef.blur();
    }

    // aliased for consumers
  }, {
    key: "openMenu",
    value: function openMenu(focusOption) {
      var _this2 = this;
      var _this$state2 = this.state,
        selectValue = _this$state2.selectValue,
        isFocused = _this$state2.isFocused;
      var focusableOptions = this.buildFocusableOptions();
      var openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;
      if (!this.props.isMulti) {
        var selectedIndex = focusableOptions.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      // only scroll if the menu isn't already open
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
      this.setState({
        inputIsHiddenAfterUpdate: false,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex],
        focusedOptionId: this.getFocusedOptionId(focusableOptions[openAtIndex])
      }, function () {
        return _this2.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function focusValue(direction) {
      var _this$state3 = this.state,
        selectValue = _this$state3.selectValue,
        focusedValue = _this$state3.focusedValue;

      // Only multiselects support value focusing
      if (!this.props.isMulti) return;
      this.setState({
        focusedOption: null
      });
      var focusedIndex = selectValue.indexOf(focusedValue);
      if (!focusedValue) {
        focusedIndex = -1;
      }
      var lastIndex = selectValue.length - 1;
      var nextFocus = -1;
      if (!selectValue.length) return;
      switch (direction) {
        case 'previous':
          if (focusedIndex === 0) {
            // don't cycle from the start to the end
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            // if nothing is focused, focus the last value first
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }
          break;
        case 'next':
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }
          break;
      }
      this.setState({
        inputIsHidden: nextFocus !== -1,
        focusedValue: selectValue[nextFocus]
      });
    }
  }, {
    key: "focusOption",
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var pageSize = this.props.pageSize;
      var focusedOption = this.state.focusedOption;
      var options = this.getFocusableOptions();
      if (!options.length) return;
      var nextFocus = 0; // handles 'first'
      var focusedIndex = options.indexOf(focusedOption);
      if (!focusedOption) {
        focusedIndex = -1;
      }
      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus],
        focusedValue: null,
        focusedOptionId: this.getFocusedOptionId(options[nextFocus])
      });
    }
  }, {
    key: "getTheme",
    value:
    // ==============================
    // Getters
    // ==============================

    function getTheme() {
      // Use the default theme if there are no customisations.
      if (!this.props.theme) {
        return defaultTheme;
      }
      // If the theme prop is a function, assume the function
      // knows how to merge the passed-in default theme with
      // its own modifications.
      if (typeof this.props.theme === 'function') {
        return this.props.theme(defaultTheme);
      }
      // Otherwise, if a plain theme object was passed in,
      // overlay it with the default theme.
      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defaultTheme), this.props.theme);
    }
  }, {
    key: "getCommonProps",
    value: function getCommonProps() {
      var clearValue = this.clearValue,
        cx = this.cx,
        getStyles = this.getStyles,
        getClassNames = this.getClassNames,
        getValue = this.getValue,
        selectOption = this.selectOption,
        setValue = this.setValue,
        props = this.props;
      var isMulti = props.isMulti,
        isRtl = props.isRtl,
        options = props.options;
      var hasValue = this.hasValue();
      return {
        clearValue: clearValue,
        cx: cx,
        getStyles: getStyles,
        getClassNames: getClassNames,
        getValue: getValue,
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        selectProps: props,
        setValue: setValue,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      var selectValue = this.state.selectValue;
      return selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function hasOptions() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function isClearable() {
      var _this$props7 = this.props,
        isClearable = _this$props7.isClearable,
        isMulti = _this$props7.isMulti;

      // single select, by default, IS NOT clearable
      // multi select, by default, IS clearable
      if (isClearable === undefined) return isMulti;
      return isClearable;
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option, selectValue) {
      return _isOptionDisabled(this.props, option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function isOptionSelected(option, selectValue) {
      return _isOptionSelected(this.props, option, selectValue);
    }
  }, {
    key: "filterOption",
    value: function filterOption(option, inputValue) {
      return _filterOption(this.props, option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === 'function') {
        var _inputValue = this.props.inputValue;
        var _selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: "formatGroupLabel",
    value: function formatGroupLabel(data) {
      return this.props.formatGroupLabel(data);
    }

    // ==============================
    // Mouse Handlers
    // ==============================
  }, {
    key: "startListeningComposition",
    value:
    // ==============================
    // Composition Handlers
    // ==============================

    function startListeningComposition() {
      if (document && document.addEventListener) {
        document.addEventListener('compositionstart', this.onCompositionStart, false);
        document.addEventListener('compositionend', this.onCompositionEnd, false);
      }
    }
  }, {
    key: "stopListeningComposition",
    value: function stopListeningComposition() {
      if (document && document.removeEventListener) {
        document.removeEventListener('compositionstart', this.onCompositionStart);
        document.removeEventListener('compositionend', this.onCompositionEnd);
      }
    }
  }, {
    key: "startListeningToTouch",
    value:
    // ==============================
    // Touch Handlers
    // ==============================

    function startListeningToTouch() {
      if (document && document.addEventListener) {
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
      }
    }
  }, {
    key: "stopListeningToTouch",
    value: function stopListeningToTouch() {
      if (document && document.removeEventListener) {
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
      }
    }
  }, {
    key: "renderInput",
    value:
    // ==============================
    // Renderers
    // ==============================
    function renderInput() {
      var _this$props8 = this.props,
        isDisabled = _this$props8.isDisabled,
        isSearchable = _this$props8.isSearchable,
        inputId = _this$props8.inputId,
        inputValue = _this$props8.inputValue,
        tabIndex = _this$props8.tabIndex,
        form = _this$props8.form,
        menuIsOpen = _this$props8.menuIsOpen,
        required = _this$props8.required;
      var _this$getComponents = this.getComponents(),
        Input = _this$getComponents.Input;
      var _this$state4 = this.state,
        inputIsHidden = _this$state4.inputIsHidden,
        ariaSelection = _this$state4.ariaSelection;
      var commonProps = this.commonProps;
      var id = inputId || this.getElementId('input');

      // aria attributes makes the JSX "noisy", separated for clarity
      var ariaAttributes = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
        'aria-autocomplete': 'list',
        'aria-expanded': menuIsOpen,
        'aria-haspopup': true,
        'aria-errormessage': this.props['aria-errormessage'],
        'aria-invalid': this.props['aria-invalid'],
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        'aria-required': required,
        role: 'combobox',
        'aria-activedescendant': this.state.isAppleDevice ? undefined : this.state.focusedOptionId || ''
      }, menuIsOpen && {
        'aria-controls': this.getElementId('listbox')
      }), !isSearchable && {
        'aria-readonly': true
      }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus' && {
        'aria-describedby': this.getElementId('live-region')
      } : {
        'aria-describedby': this.getElementId('placeholder')
      });
      if (!isSearchable) {
        // use a dummy input to maintain focus/blur functionality
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(DummyInput, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          id: id,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.J,
          onFocus: this.onInputFocus,
          disabled: isDisabled,
          tabIndex: tabIndex,
          inputMode: "none",
          form: form,
          value: ""
        }, ariaAttributes));
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Input, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        id: id,
        innerRef: this.getInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: "false",
        tabIndex: tabIndex,
        form: form,
        type: "text",
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function renderPlaceholderOrValue() {
      var _this3 = this;
      var _this$getComponents2 = this.getComponents(),
        MultiValue = _this$getComponents2.MultiValue,
        MultiValueContainer = _this$getComponents2.MultiValueContainer,
        MultiValueLabel = _this$getComponents2.MultiValueLabel,
        MultiValueRemove = _this$getComponents2.MultiValueRemove,
        SingleValue = _this$getComponents2.SingleValue,
        Placeholder = _this$getComponents2.Placeholder;
      var commonProps = this.commonProps;
      var _this$props9 = this.props,
        controlShouldRenderValue = _this$props9.controlShouldRenderValue,
        isDisabled = _this$props9.isDisabled,
        isMulti = _this$props9.isMulti,
        inputValue = _this$props9.inputValue,
        placeholder = _this$props9.placeholder;
      var _this$state5 = this.state,
        selectValue = _this$state5.selectValue,
        focusedValue = _this$state5.focusedValue,
        isFocused = _this$state5.isFocused;
      if (!this.hasValue() || !controlShouldRenderValue) {
        return inputValue ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Placeholder, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          key: "placeholder",
          isDisabled: isDisabled,
          isFocused: isFocused,
          innerProps: {
            id: this.getElementId('placeholder')
          }
        }), placeholder);
      }
      if (isMulti) {
        return selectValue.map(function (opt, index) {
          var isOptionFocused = opt === focusedValue;
          var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(MultiValue, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
            components: {
              Container: MultiValueContainer,
              Label: MultiValueLabel,
              Remove: MultiValueRemove
            },
            isFocused: isOptionFocused,
            isDisabled: isDisabled,
            key: key,
            index: index,
            removeProps: {
              onClick: function onClick() {
                return _this3.removeValue(opt);
              },
              onTouchEnd: function onTouchEnd() {
                return _this3.removeValue(opt);
              },
              onMouseDown: function onMouseDown(e) {
                e.preventDefault();
              }
            },
            data: opt
          }), _this3.formatOptionLabel(opt, 'value'));
        });
      }
      if (inputValue) {
        return null;
      }
      var singleValue = selectValue[0];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(SingleValue, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        data: singleValue,
        isDisabled: isDisabled
      }), this.formatOptionLabel(singleValue, 'value'));
    }
  }, {
    key: "renderClearIndicator",
    value: function renderClearIndicator() {
      var _this$getComponents3 = this.getComponents(),
        ClearIndicator = _this$getComponents3.ClearIndicator;
      var commonProps = this.commonProps;
      var _this$props10 = this.props,
        isDisabled = _this$props10.isDisabled,
        isLoading = _this$props10.isLoading;
      var isFocused = this.state.isFocused;
      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }
      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(ClearIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function renderLoadingIndicator() {
      var _this$getComponents4 = this.getComponents(),
        LoadingIndicator = _this$getComponents4.LoadingIndicator;
      var commonProps = this.commonProps;
      var _this$props11 = this.props,
        isDisabled = _this$props11.isDisabled,
        isLoading = _this$props11.isLoading;
      var isFocused = this.state.isFocused;
      if (!LoadingIndicator || !isLoading) return null;
      var innerProps = {
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(LoadingIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function renderIndicatorSeparator() {
      var _this$getComponents5 = this.getComponents(),
        DropdownIndicator = _this$getComponents5.DropdownIndicator,
        IndicatorSeparator = _this$getComponents5.IndicatorSeparator;

      // separator doesn't make sense without the dropdown indicator
      if (!DropdownIndicator || !IndicatorSeparator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(IndicatorSeparator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function renderDropdownIndicator() {
      var _this$getComponents6 = this.getComponents(),
        DropdownIndicator = _this$getComponents6.DropdownIndicator;
      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(DropdownIndicator, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this4 = this;
      var _this$getComponents7 = this.getComponents(),
        Group = _this$getComponents7.Group,
        GroupHeading = _this$getComponents7.GroupHeading,
        Menu = _this$getComponents7.Menu,
        MenuList = _this$getComponents7.MenuList,
        MenuPortal = _this$getComponents7.MenuPortal,
        LoadingMessage = _this$getComponents7.LoadingMessage,
        NoOptionsMessage = _this$getComponents7.NoOptionsMessage,
        Option = _this$getComponents7.Option;
      var commonProps = this.commonProps;
      var focusedOption = this.state.focusedOption;
      var _this$props12 = this.props,
        captureMenuScroll = _this$props12.captureMenuScroll,
        inputValue = _this$props12.inputValue,
        isLoading = _this$props12.isLoading,
        loadingMessage = _this$props12.loadingMessage,
        minMenuHeight = _this$props12.minMenuHeight,
        maxMenuHeight = _this$props12.maxMenuHeight,
        menuIsOpen = _this$props12.menuIsOpen,
        menuPlacement = _this$props12.menuPlacement,
        menuPosition = _this$props12.menuPosition,
        menuPortalTarget = _this$props12.menuPortalTarget,
        menuShouldBlockScroll = _this$props12.menuShouldBlockScroll,
        menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView,
        noOptionsMessage = _this$props12.noOptionsMessage,
        onMenuScrollToTop = _this$props12.onMenuScrollToTop,
        onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
      if (!menuIsOpen) return null;

      // TODO: Internal Option Type here
      var render = function render(props, id) {
        var type = props.type,
          data = props.data,
          isDisabled = props.isDisabled,
          isSelected = props.isSelected,
          label = props.label,
          value = props.value;
        var isFocused = focusedOption === data;
        var onHover = isDisabled ? undefined : function () {
          return _this4.onOptionHover(data);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this4.selectOption(data);
        };
        var optionId = "".concat(_this4.getElementId('option'), "-").concat(id);
        var innerProps = {
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          tabIndex: -1,
          role: 'option',
          'aria-selected': _this4.state.isAppleDevice ? undefined : isSelected // is not supported on Apple devices
        };

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Option, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
          innerProps: innerProps,
          data: data,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: type,
          value: value,
          isFocused: isFocused,
          innerRef: isFocused ? _this4.getFocusedOptionRef : undefined
        }), _this4.formatOptionLabel(props.data, 'menu'));
      };
      var menuUI;
      if (this.hasOptions()) {
        menuUI = this.getCategorizedOptions().map(function (item) {
          if (item.type === 'group') {
            var _data = item.data,
              options = item.options,
              groupIndex = item.index;
            var groupId = "".concat(_this4.getElementId('group'), "-").concat(groupIndex);
            var headingId = "".concat(groupId, "-heading");
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Group, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
              key: groupId,
              data: _data,
              options: options,
              Heading: GroupHeading,
              headingProps: {
                id: headingId,
                data: item.data
              },
              label: _this4.formatGroupLabel(item.data)
            }), item.options.map(function (option) {
              return render(option, "".concat(groupIndex, "-").concat(option.index));
            }));
          } else if (item.type === 'option') {
            return render(item, "".concat(item.index));
          }
        });
      } else if (isLoading) {
        var message = loadingMessage({
          inputValue: inputValue
        });
        if (message === null) return null;
        menuUI = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(LoadingMessage, commonProps, message);
      } else {
        var _message = noOptionsMessage({
          inputValue: inputValue
        });
        if (_message === null) return null;
        menuUI = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(NoOptionsMessage, commonProps, _message);
      }
      var menuPlacementProps = {
        minMenuHeight: minMenuHeight,
        maxMenuHeight: maxMenuHeight,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: menuShouldScrollIntoView
      };
      var menuElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.M, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, menuPlacementProps), function (_ref4) {
        var ref = _ref4.ref,
          _ref4$placerProps = _ref4.placerProps,
          placement = _ref4$placerProps.placement,
          maxHeight = _ref4$placerProps.maxHeight;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Menu, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this4.onMenuMouseDown,
            onMouseMove: _this4.onMenuMouseMove
          },
          isLoading: isLoading,
          placement: placement
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(ScrollManager, {
          captureEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom,
          lockEnabled: menuShouldBlockScroll
        }, function (scrollTargetRef) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(MenuList, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
            innerRef: function innerRef(instance) {
              _this4.getMenuListRef(instance);
              scrollTargetRef(instance);
            },
            innerProps: {
              role: 'listbox',
              'aria-multiselectable': commonProps.isMulti,
              id: _this4.getElementId('listbox')
            },
            isLoading: isLoading,
            maxHeight: maxHeight,
            focusedOption: focusedOption
          }), menuUI);
        }));
      });

      // positioning behaviour is almost identical for portalled and fixed,
      // so we use the same component. the actual portalling logic is forked
      // within the component based on `menuPosition`
      return menuPortalTarget || menuPosition === 'fixed' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(MenuPortal, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function renderFormField() {
      var _this5 = this;
      var _this$props13 = this.props,
        delimiter = _this$props13.delimiter,
        isDisabled = _this$props13.isDisabled,
        isMulti = _this$props13.isMulti,
        name = _this$props13.name,
        required = _this$props13.required;
      var selectValue = this.state.selectValue;
      if (required && !this.hasValue() && !isDisabled) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(RequiredInput$1, {
          name: name,
          onFocus: this.onValueInputFocus
        });
      }
      if (!name || isDisabled) return;
      if (isMulti) {
        if (delimiter) {
          var value = selectValue.map(function (opt) {
            return _this5.getOptionValue(opt);
          }).join(delimiter);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
            name: name,
            type: "hidden",
            value: value
          });
        } else {
          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this5.getOptionValue(opt)
            });
          }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
            name: name,
            type: "hidden",
            value: ""
          });
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", null, input);
        }
      } else {
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("input", {
          name: name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function renderLiveRegion() {
      var commonProps = this.commonProps;
      var _this$state6 = this.state,
        ariaSelection = _this$state6.ariaSelection,
        focusedOption = _this$state6.focusedOption,
        focusedValue = _this$state6.focusedValue,
        isFocused = _this$state6.isFocused,
        selectValue = _this$state6.selectValue;
      var focusableOptions = this.getFocusableOptions();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(LiveRegion$1, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        id: this.getElementId('live-region'),
        ariaSelection: ariaSelection,
        focusedOption: focusedOption,
        focusedValue: focusedValue,
        isFocused: isFocused,
        selectValue: selectValue,
        focusableOptions: focusableOptions,
        isAppleDevice: this.state.isAppleDevice
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getComponents8 = this.getComponents(),
        Control = _this$getComponents8.Control,
        IndicatorsContainer = _this$getComponents8.IndicatorsContainer,
        SelectContainer = _this$getComponents8.SelectContainer,
        ValueContainer = _this$getComponents8.ValueContainer;
      var _this$props14 = this.props,
        className = _this$props14.className,
        id = _this$props14.id,
        isDisabled = _this$props14.isDisabled,
        menuIsOpen = _this$props14.menuIsOpen;
      var isFocused = this.state.isFocused;
      var commonProps = this.commonProps = this.getCommonProps();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(SelectContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        className: className,
        innerProps: {
          id: id,
          onKeyDown: this.onKeyDown
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }), this.renderLiveRegion(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Control, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: isDisabled,
        isFocused: isFocused,
        menuIsOpen: menuIsOpen
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(ValueContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(IndicatorsContainer, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevProps = state.prevProps,
        clearFocusValueOnUpdate = state.clearFocusValueOnUpdate,
        inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate,
        ariaSelection = state.ariaSelection,
        isFocused = state.isFocused,
        prevWasFocused = state.prevWasFocused,
        instancePrefix = state.instancePrefix;
      var options = props.options,
        value = props.value,
        menuIsOpen = props.menuIsOpen,
        inputValue = props.inputValue,
        isMulti = props.isMulti;
      var selectValue = (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.H)(value);
      var newMenuOptionsState = {};
      if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
        var focusableOptionsWithIds = menuIsOpen ? buildFocusableOptionsWithIds(buildCategorizedOptions(props, selectValue), "".concat(instancePrefix, "-option")) : [];
        var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
        var focusedOption = getNextFocusedOption(state, focusableOptions);
        var focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusedOption);
        newMenuOptionsState = {
          selectValue: selectValue,
          focusedOption: focusedOption,
          focusedOptionId: focusedOptionId,
          focusableOptionsWithIds: focusableOptionsWithIds,
          focusedValue: focusedValue,
          clearFocusValueOnUpdate: false
        };
      }
      // some updates should toggle the state of the input visibility
      var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
        inputIsHidden: inputIsHiddenAfterUpdate,
        inputIsHiddenAfterUpdate: undefined
      } : {};
      var newAriaSelection = ariaSelection;
      var hasKeptFocus = isFocused && prevWasFocused;
      if (isFocused && !hasKeptFocus) {
        // If `value` or `defaultValue` props are not empty then announce them
        // when the Select is initially focused
        newAriaSelection = {
          value: (0,_index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_8__.D)(isMulti, selectValue, selectValue[0] || null),
          options: selectValue,
          action: 'initial-input-focus'
        };
        hasKeptFocus = !prevWasFocused;
      }

      // If the 'initial-input-focus' action has been set already
      // then reset the ariaSelection to null
      if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus') {
        newAriaSelection = null;
      }
      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, newMenuOptionsState), newInputIsHiddenState), {}, {
        prevProps: props,
        ariaSelection: newAriaSelection,
        prevWasFocused: hasKeptFocus
      });
    }
  }]);
  return Select;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);
Select.defaultProps = defaultProps;




/***/ },

/***/ "./node_modules/react-select/dist/index-641ee5b8.esm.js"
/*!**************************************************************!*\
  !*** ./node_modules/react-select/dist/index-641ee5b8.esm.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ isMobileDevice),
/* harmony export */   B: () => (/* binding */ multiValueAsValue),
/* harmony export */   C: () => (/* binding */ singleValueAsValue),
/* harmony export */   D: () => (/* binding */ valueTernary),
/* harmony export */   E: () => (/* binding */ classNames),
/* harmony export */   F: () => (/* binding */ defaultComponents),
/* harmony export */   G: () => (/* binding */ isDocumentElement),
/* harmony export */   H: () => (/* binding */ cleanValue),
/* harmony export */   I: () => (/* binding */ scrollIntoView),
/* harmony export */   J: () => (/* binding */ noop),
/* harmony export */   K: () => (/* binding */ notNullish),
/* harmony export */   L: () => (/* binding */ handleInputChange),
/* harmony export */   M: () => (/* binding */ MenuPlacer),
/* harmony export */   a: () => (/* binding */ clearIndicatorCSS),
/* harmony export */   b: () => (/* binding */ containerCSS),
/* harmony export */   c: () => (/* binding */ components),
/* harmony export */   d: () => (/* binding */ css$1),
/* harmony export */   e: () => (/* binding */ dropdownIndicatorCSS),
/* harmony export */   f: () => (/* binding */ groupHeadingCSS),
/* harmony export */   g: () => (/* binding */ groupCSS),
/* harmony export */   h: () => (/* binding */ indicatorSeparatorCSS),
/* harmony export */   i: () => (/* binding */ indicatorsContainerCSS),
/* harmony export */   j: () => (/* binding */ inputCSS),
/* harmony export */   k: () => (/* binding */ loadingMessageCSS),
/* harmony export */   l: () => (/* binding */ loadingIndicatorCSS),
/* harmony export */   m: () => (/* binding */ menuCSS),
/* harmony export */   n: () => (/* binding */ menuListCSS),
/* harmony export */   o: () => (/* binding */ menuPortalCSS),
/* harmony export */   p: () => (/* binding */ multiValueCSS),
/* harmony export */   q: () => (/* binding */ multiValueLabelCSS),
/* harmony export */   r: () => (/* binding */ removeProps),
/* harmony export */   s: () => (/* binding */ supportsPassiveEvents),
/* harmony export */   t: () => (/* binding */ multiValueRemoveCSS),
/* harmony export */   u: () => (/* binding */ noOptionsMessageCSS),
/* harmony export */   v: () => (/* binding */ optionCSS),
/* harmony export */   w: () => (/* binding */ placeholderCSS),
/* harmony export */   x: () => (/* binding */ css),
/* harmony export */   y: () => (/* binding */ valueContainerCSS),
/* harmony export */   z: () => (/* binding */ isTouchCapable)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.development.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @floating-ui/dom */ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! use-isomorphic-layout-effect */ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js");













var _excluded$4 = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
// ==============================
// NO OP
// ==============================

var noop = function noop() {};

// ==============================
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}
function classNames(prefix, state) {
  for (var _len = arguments.length, classNameList = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classNameList[_key - 2] = arguments[_key];
  }
  var arr = [].concat(classNameList);
  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("".concat(applyPrefixToName(prefix, key)));
      }
    }
  }
  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
}
// ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (isArray(value)) return value.filter(Boolean);
  if ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__["default"])(value) === 'object' && value !== null) return [value];
  return [];
};

// ==============================
// Clean Common Props
// ==============================

var cleanCommonProps = function cleanCommonProps(props) {
  //className
  props.className;
    props.clearValue;
    props.cx;
    props.getStyles;
    props.getClassNames;
    props.getValue;
    props.hasValue;
    props.isMulti;
    props.isRtl;
    props.options;
    props.selectOption;
    props.selectProps;
    props.setValue;
    props.theme;
    var innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(props, _excluded$4);
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps);
};

// ==============================
// Get Style Props
// ==============================

var getStyleProps = function getStyleProps(props, name, classNamesState) {
  var cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    className = props.className;
  return {
    css: getStyles(name, props),
    className: cx(classNamesState !== null && classNamesState !== void 0 ? classNamesState : {}, getClassNames(name, props), className)
  };
};

// ==============================
// Handle Input Change
// ==============================

function handleInputChange(inputValue, actionMeta, onInputChange) {
  if (onInputChange) {
    var _newValue = onInputChange(inputValue, actionMeta);
    if (typeof _newValue === 'string') return _newValue;
  }
  return inputValue;
}

// ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
}

// Normalized Scroll Top
// ------------------------------

function normalizedHeight(el) {
  if (isDocumentElement(el)) {
    return window.innerHeight;
  }
  return el.clientHeight;
}

// Normalized scrollTo & scrollTop
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }
  return el.scrollTop;
}
function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }
  el.scrollTop = top;
}

// Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  if (style.position === 'fixed') return document.documentElement;
  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }
  return document.documentElement;
}

// Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/
function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;
  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }
  animateScroll();
}

// Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

// ==============================
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}

// ==============================
// Passive Event Detector
// ==============================

// https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36
var passiveOptionAccessed = false;
var options = {
  get passive() {
    return passiveOptionAccessed = true;
  }
};
// check for SSR
var w = typeof window !== 'undefined' ? window : {};
if (w.addEventListener && w.removeEventListener) {
  w.addEventListener('p', noop, options);
  w.removeEventListener('p', noop, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
  return item != null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
  return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
  return singleValue;
}
function multiValueAsValue(multiValue) {
  return multiValue;
}
var removeProps = function removeProps(propsObj) {
  for (var _len2 = arguments.length, properties = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    properties[_key2 - 1] = arguments[_key2];
  }
  var propsMap = Object.entries(propsObj).filter(function (_ref) {
    var _ref2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref, 1),
      key = _ref2[0];
    return !properties.includes(key);
  });
  return propsMap.reduce(function (newProps, _ref3) {
    var _ref4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref3, 2),
      key = _ref4[0],
      val = _ref4[1];
    newProps[key] = val;
    return newProps;
  }, {});
};

var _excluded$3 = ["children", "innerProps"],
  _excluded2$1 = ["children", "innerProps"];
function getMenuPlacement(_ref) {
  var preferredMaxHeight = _ref.maxHeight,
    menuEl = _ref.menuEl,
    minHeight = _ref.minHeight,
    preferredPlacement = _ref.placement,
    shouldScroll = _ref.shouldScroll,
    isFixedPosition = _ref.isFixedPosition,
    controlHeight = _ref.controlHeight;
  var scrollParent = getScrollParent(menuEl);
  var defaultState = {
    placement: 'bottom',
    maxHeight: preferredMaxHeight
  };

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState;

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered
  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
    scrollHeight = _scrollParent$getBoun.height;
  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
    menuBottom = _menuEl$getBoundingCl.bottom,
    menuHeight = _menuEl$getBoundingCl.height,
    menuTop = _menuEl$getBoundingCl.top;
  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
    containerTop = _menuEl$offsetParent$.top;
  var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
  var scrollTop = getScrollTop(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;
  switch (preferredPlacement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (preferredPlacement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = preferredMaxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - controlHeight, preferredMaxHeight);
        }
        return {
          placement: 'top',
          maxHeight: _constrainedHeight
        };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (preferredPlacement === 'bottom') {
        if (shouldScroll) {
          scrollTo(scrollParent, scrollDown);
        }
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: 'top',
          maxHeight: preferredMaxHeight
        };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: 'top',
          maxHeight: preferredMaxHeight
        };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = preferredMaxHeight;

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return {
        placement: 'bottom',
        maxHeight: preferredMaxHeight
      };
    default:
      throw new Error("Invalid placement provided \"".concat(preferredPlacement, "\"."));
  }
  return defaultState;
}

// Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: 'top',
    top: 'bottom'
  };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};
var menuCSS = function menuCSS(_ref2, unstyled) {
  var _objectSpread2;
  var placement = _ref2.placement,
    _ref2$theme = _ref2.theme,
    borderRadius = _ref2$theme.borderRadius,
    spacing = _ref2$theme.spacing,
    colors = _ref2$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((_objectSpread2 = {
    label: 'menu'
  }, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(_objectSpread2, alignToControl(placement), '100%'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(_objectSpread2, "position", 'absolute'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(_objectSpread2, "width", '100%'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(_objectSpread2, "zIndex", 1), _objectSpread2), unstyled ? {} : {
    backgroundColor: colors.neutral0,
    borderRadius: borderRadius,
    boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
    marginBottom: spacing.menuGutter,
    marginTop: spacing.menuGutter
  });
};
var PortalPlacementContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_8__.createContext)(null);

// NOTE: internal only
var MenuPlacer = function MenuPlacer(props) {
  var children = props.children,
    minMenuHeight = props.minMenuHeight,
    maxMenuHeight = props.maxMenuHeight,
    menuPlacement = props.menuPlacement,
    menuPosition = props.menuPosition,
    menuShouldScrollIntoView = props.menuShouldScrollIntoView,
    theme = props.theme;
  var _ref3 = (0,react__WEBPACK_IMPORTED_MODULE_8__.useContext)(PortalPlacementContext) || {},
    setPortalPlacement = _ref3.setPortalPlacement;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_8__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(maxMenuHeight),
    _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
    maxHeight = _useState2[0],
    setMaxHeight = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(null),
    _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
    placement = _useState4[0],
    setPlacement = _useState4[1];
  var controlHeight = theme.spacing.controlHeight;
  (0,use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_11__["default"])(function () {
    var menuEl = ref.current;
    if (!menuEl) return;

    // DO NOT scroll if position is fixed
    var isFixedPosition = menuPosition === 'fixed';
    var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
    var state = getMenuPlacement({
      maxHeight: maxMenuHeight,
      menuEl: menuEl,
      minHeight: minMenuHeight,
      placement: menuPlacement,
      shouldScroll: shouldScroll,
      isFixedPosition: isFixedPosition,
      controlHeight: controlHeight
    });
    setMaxHeight(state.maxHeight);
    setPlacement(state.placement);
    setPortalPlacement === null || setPortalPlacement === void 0 ? void 0 : setPortalPlacement(state.placement);
  }, [maxMenuHeight, menuPlacement, menuPosition, menuShouldScrollIntoView, minMenuHeight, setPortalPlacement, controlHeight]);
  return children({
    ref: ref,
    placerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props), {}, {
      placement: placement || coercePlacement(menuPlacement),
      maxHeight: maxHeight
    })
  });
};
var Menu = function Menu(props) {
  var children = props.children,
    innerRef = props.innerRef,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'menu', {
    menu: true
  }), {
    ref: innerRef
  }, innerProps), children);
};
var Menu$1 = Menu;

// ==============================
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4, unstyled) {
  var maxHeight = _ref4.maxHeight,
    baseUnit = _ref4.theme.spacing.baseUnit;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    maxHeight: maxHeight,
    overflowY: 'auto',
    position: 'relative',
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  }, unstyled ? {} : {
    paddingBottom: baseUnit,
    paddingTop: baseUnit
  });
};
var MenuList = function MenuList(props) {
  var children = props.children,
    innerProps = props.innerProps,
    innerRef = props.innerRef,
    isMulti = props.isMulti;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'menuList', {
    'menu-list': true,
    'menu-list--is-multi': isMulti
  }), {
    ref: innerRef
  }, innerProps), children);
};

// ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS(_ref5, unstyled) {
  var _ref5$theme = _ref5.theme,
    baseUnit = _ref5$theme.spacing.baseUnit,
    colors = _ref5$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    textAlign: 'center'
  }, unstyled ? {} : {
    color: colors.neutral40,
    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px")
  });
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(_ref6) {
  var _ref6$children = _ref6.children,
    children = _ref6$children === void 0 ? 'No options' : _ref6$children,
    innerProps = _ref6.innerProps,
    restProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref6, _excluded$3);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restProps), {}, {
    children: children,
    innerProps: innerProps
  }), 'noOptionsMessage', {
    'menu-notice': true,
    'menu-notice--no-options': true
  }), innerProps), children);
};
var LoadingMessage = function LoadingMessage(_ref7) {
  var _ref7$children = _ref7.children,
    children = _ref7$children === void 0 ? 'Loading...' : _ref7$children,
    innerProps = _ref7.innerProps,
    restProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref7, _excluded2$1);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restProps), {}, {
    children: children,
    innerProps: innerProps
  }), 'loadingMessage', {
    'menu-notice': true,
    'menu-notice--loading': true
  }), innerProps), children);
};

// ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref8) {
  var rect = _ref8.rect,
    offset = _ref8.offset,
    position = _ref8.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal = function MenuPortal(props) {
  var appendTo = props.appendTo,
    children = props.children,
    controlElement = props.controlElement,
    innerProps = props.innerProps,
    menuPlacement = props.menuPlacement,
    menuPosition = props.menuPosition;
  var menuPortalRef = (0,react__WEBPACK_IMPORTED_MODULE_8__.useRef)(null);
  var cleanupRef = (0,react__WEBPACK_IMPORTED_MODULE_8__.useRef)(null);
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(coercePlacement(menuPlacement)),
    _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
    placement = _useState6[0],
    setPortalPlacement = _useState6[1];
  var portalPlacementContext = (0,react__WEBPACK_IMPORTED_MODULE_8__.useMemo)(function () {
    return {
      setPortalPlacement: setPortalPlacement
    };
  }, []);
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(null),
    _useState8 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState7, 2),
    computedPosition = _useState8[0],
    setComputedPosition = _useState8[1];
  var updateComputedPosition = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(function () {
    if (!controlElement) return;
    var rect = getBoundingClientObj(controlElement);
    var scrollDistance = menuPosition === 'fixed' ? 0 : window.pageYOffset;
    var offset = rect[placement] + scrollDistance;
    if (offset !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) || rect.left !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) || rect.width !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)) {
      setComputedPosition({
        offset: offset,
        rect: rect
      });
    }
  }, [controlElement, menuPosition, placement, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width]);
  (0,use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_11__["default"])(function () {
    updateComputedPosition();
  }, [updateComputedPosition]);
  var runAutoUpdate = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(function () {
    if (typeof cleanupRef.current === 'function') {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (controlElement && menuPortalRef.current) {
      cleanupRef.current = (0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_10__.autoUpdate)(controlElement, menuPortalRef.current, updateComputedPosition, {
        elementResize: 'ResizeObserver' in window
      });
    }
  }, [controlElement, updateComputedPosition]);
  (0,use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_11__["default"])(function () {
    runAutoUpdate();
  }, [runAutoUpdate]);
  var setMenuPortalElement = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(function (menuPortalElement) {
    menuPortalRef.current = menuPortalElement;
    runAutoUpdate();
  }, [runAutoUpdate]);

  // bail early if required elements aren't present
  if (!appendTo && menuPosition !== 'fixed' || !computedPosition) return null;

  // same wrapper element whether fixed or portalled
  var menuWrapper = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: setMenuPortalElement
  }, getStyleProps((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props), {}, {
    offset: computedPosition.offset,
    position: menuPosition,
    rect: computedPosition.rect
  }), 'menuPortal', {
    'menu-portal': true
  }), innerProps), children);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(PortalPlacementContext.Provider, {
    value: portalPlacementContext
  }, appendTo ? /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_9__.createPortal)(menuWrapper, appendTo) : menuWrapper);
};

// ==============================
// Root Container
// ==============================

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
    isRtl = _ref.isRtl;
  return {
    label: 'container',
    direction: isRtl ? 'rtl' : undefined,
    pointerEvents: isDisabled ? 'none' : undefined,
    // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    isRtl = props.isRtl;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'container', {
    '--is-disabled': isDisabled,
    '--is-rtl': isRtl
  }), innerProps), children);
};

// ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2, unstyled) {
  var spacing = _ref2.theme.spacing,
    isMulti = _ref2.isMulti,
    hasValue = _ref2.hasValue,
    controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    alignItems: 'center',
    display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
    flex: 1,
    flexWrap: 'wrap',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden'
  }, unstyled ? {} : {
    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px")
  });
};
var ValueContainer = function ValueContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isMulti = props.isMulti,
    hasValue = props.hasValue;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'valueContainer', {
    'value-container': true,
    'value-container--is-multi': isMulti,
    'value-container--has-value': hasValue
  }), innerProps), children);
};

// ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'indicatorsContainer', {
    indicators: true
  }), innerProps), children);
};

var _templateObject;
var _excluded$2 = ["size"],
  _excluded2 = ["innerProps", "isRtl", "size"];
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// ==============================
// Dropdown & Clear Icons
// ==============================
var _ref2 =  false ? 0 : {
  name: "tj5bde-Svg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var Svg = function Svg(_ref) {
  var size = _ref.size,
    props = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, _excluded$2);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2
  }, props));
};
var CrossIcon = function CrossIcon(props) {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(Svg, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    size: 20
  }, props), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron(props) {
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(Svg, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    size: 20
  }, props), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref3, unstyled) {
  var isFocused = _ref3.isFocused,
    _ref3$theme = _ref3.theme,
    baseUnit = _ref3$theme.spacing.baseUnit,
    colors = _ref3$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'indicatorContainer',
    display: 'flex',
    transition: 'color 150ms'
  }, unstyled ? {} : {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    padding: baseUnit * 2,
    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  });
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'dropdownIndicator', {
    indicator: true,
    'dropdown-indicator': true
  }), innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'clearIndicator', {
    indicator: true,
    'clear-indicator': true
  }), innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(CrossIcon, null));
};

// ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4, unstyled) {
  var isDisabled = _ref4.isDisabled,
    _ref4$theme = _ref4.theme,
    baseUnit = _ref4$theme.spacing.baseUnit,
    colors = _ref4$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    width: 1
  }, unstyled ? {} : {
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2
  });
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, innerProps, getStyleProps(props, 'indicatorSeparator', {
    'indicator-separator': true
  })));
};

// ==============================
// Loading
// ==============================

var loadingDotAnimations = (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.keyframes)(_templateObject || (_templateObject = (0,_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_6__["default"])(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5, unstyled) {
  var isFocused = _ref5.isFocused,
    size = _ref5.size,
    _ref5$theme = _ref5.theme,
    colors = _ref5$theme.colors,
    baseUnit = _ref5$theme.spacing.baseUnit;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'loadingIndicator',
    display: 'flex',
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  }, unstyled ? {} : {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    padding: baseUnit * 2
  });
};
var LoadingDot = function LoadingDot(_ref6) {
  var delay = _ref6.delay,
    offset = _ref6.offset;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
    css: /*#__PURE__*/(0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.css)({
      animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : undefined,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    },  false ? 0 : ";label:LoadingDot;",  false ? 0 : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */")
  });
};
var LoadingIndicator = function LoadingIndicator(_ref7) {
  var innerProps = _ref7.innerProps,
    isRtl = _ref7.isRtl,
    _ref7$size = _ref7.size,
    size = _ref7$size === void 0 ? 4 : _ref7$size,
    restProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref7, _excluded2);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restProps), {}, {
    innerProps: innerProps,
    isRtl: isRtl,
    size: size
  }), 'loadingIndicator', {
    indicator: true,
    'loading-indicator': true
  }), innerProps), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(LoadingDot, {
    delay: 160,
    offset: true
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};

var css$1 = function css(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    isFocused = _ref.isFocused,
    _ref$theme = _ref.theme,
    colors = _ref$theme.colors,
    borderRadius = _ref$theme.borderRadius,
    spacing = _ref$theme.spacing;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'control',
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms'
  }, unstyled ? {} : {
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : undefined,
    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  });
};
var Control = function Control(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    innerRef = props.innerRef,
    innerProps = props.innerProps,
    menuIsOpen = props.menuIsOpen;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: innerRef
  }, getStyleProps(props, 'control', {
    control: true,
    'control--is-disabled': isDisabled,
    'control--is-focused': isFocused,
    'control--menu-is-open': menuIsOpen
  }), innerProps, {
    "aria-disabled": isDisabled || undefined
  }), children);
};
var Control$1 = Control;

var _excluded$1 = ["data"];
var groupCSS = function groupCSS(_ref, unstyled) {
  var spacing = _ref.theme.spacing;
  return unstyled ? {} : {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};
var Group = function Group(props) {
  var children = props.children,
    cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    Heading = props.Heading,
    headingProps = props.headingProps,
    innerProps = props.innerProps,
    label = props.label,
    theme = props.theme,
    selectProps = props.selectProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'group', {
    group: true
  }), innerProps), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(Heading, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    getClassNames: getClassNames,
    cx: cx
  }), label), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", null, children));
};
var groupHeadingCSS = function groupHeadingCSS(_ref2, unstyled) {
  var _ref2$theme = _ref2.theme,
    colors = _ref2$theme.colors,
    spacing = _ref2$theme.spacing;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'group',
    cursor: 'default',
    display: 'block'
  }, unstyled ? {} : {
    color: colors.neutral40,
    fontSize: '75%',
    fontWeight: 500,
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  });
};
var GroupHeading = function GroupHeading(props) {
  var _cleanCommonProps = cleanCommonProps(props);
    _cleanCommonProps.data;
    var innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_cleanCommonProps, _excluded$1);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'groupHeading', {
    'group-heading': true
  }), innerProps));
};
var Group$1 = Group;

var _excluded = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
var inputCSS = function inputCSS(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    value = _ref.value,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    visibility: isDisabled ? 'hidden' : 'visible',
    // force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: value ? 'translateZ(0)' : ''
  }, containerStyle), unstyled ? {} : {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    color: colors.neutral80
  });
};
var spacingStyle = {
  gridArea: '1 / 2',
  font: 'inherit',
  minWidth: '2px',
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
};
var containerStyle = {
  flex: '1 1 auto',
  display: 'inline-grid',
  gridArea: '1 / 1 / 2 / 3',
  gridTemplateColumns: '0 min-content',
  '&:after': (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    content: 'attr(data-value) " "',
    visibility: 'hidden',
    whiteSpace: 'pre'
  }, spacingStyle)
};
var inputStyle = function inputStyle(isHidden) {
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'input',
    color: 'inherit',
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: '100%'
  }, spacingStyle);
};
var Input = function Input(props) {
  var cx = props.cx,
    value = props.value;
  var _cleanCommonProps = cleanCommonProps(props),
    innerRef = _cleanCommonProps.innerRef,
    isDisabled = _cleanCommonProps.isDisabled,
    isHidden = _cleanCommonProps.isHidden,
    inputClassName = _cleanCommonProps.inputClassName,
    innerProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__["default"])(_cleanCommonProps, _excluded);
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'input', {
    'input-container': true
  }), {
    "data-value": value || ''
  }), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    className: cx({
      input: true
    }, inputClassName),
    ref: innerRef,
    style: inputStyle(isHidden),
    disabled: isDisabled
  }, innerProps)));
};
var Input$1 = Input;

var multiValueCSS = function multiValueCSS(_ref, unstyled) {
  var _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    borderRadius = _ref$theme.borderRadius,
    colors = _ref$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'multiValue',
    display: 'flex',
    minWidth: 0
  }, unstyled ? {} : {
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    margin: spacing.baseUnit / 2
  });
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2, unstyled) {
  var _ref2$theme = _ref2.theme,
    borderRadius = _ref2$theme.borderRadius,
    colors = _ref2$theme.colors,
    cropWithEllipsis = _ref2.cropWithEllipsis;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    overflow: 'hidden',
    textOverflow: cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
    whiteSpace: 'nowrap'
  }, unstyled ? {} : {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: '85%',
    padding: 3,
    paddingLeft: 6
  });
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3, unstyled) {
  var _ref3$theme = _ref3.theme,
    spacing = _ref3$theme.spacing,
    borderRadius = _ref3$theme.borderRadius,
    colors = _ref3$theme.colors,
    isFocused = _ref3.isFocused;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    alignItems: 'center',
    display: 'flex'
  }, unstyled ? {} : {
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused ? colors.dangerLight : undefined,
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  });
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
  var children = _ref4.children,
    innerProps = _ref4.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children,
    innerProps = _ref5.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    role: "button"
  }, innerProps), children || (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(CrossIcon, {
    size: 14
  }));
}
var MultiValue = function MultiValue(props) {
  var children = props.children,
    components = props.components,
    data = props.data,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    removeProps = props.removeProps,
    selectProps = props.selectProps;
  var Container = components.Container,
    Label = components.Label,
    Remove = components.Remove;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(Container, {
    data: data,
    innerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, getStyleProps(props, 'multiValue', {
      'multi-value': true,
      'multi-value--is-disabled': isDisabled
    })), innerProps),
    selectProps: selectProps
  }, (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(Label, {
    data: data,
    innerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, getStyleProps(props, 'multiValueLabel', {
      'multi-value__label': true
    })),
    selectProps: selectProps
  }, children), (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)(Remove, {
    data: data,
    innerProps: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, getStyleProps(props, 'multiValueRemove', {
      'multi-value__remove': true
    })), {}, {
      'aria-label': "Remove ".concat(children || 'option')
    }, removeProps),
    selectProps: selectProps
  }));
};
var MultiValue$1 = MultiValue;

var optionCSS = function optionCSS(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    isFocused = _ref.isFocused,
    isSelected = _ref.isSelected,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'option',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
  }, unstyled ? {} : {
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
    // provide some affordance on touch devices
    ':active': {
      backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : undefined
    }
  });
};
var Option = function Option(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    isSelected = props.isSelected,
    innerRef = props.innerRef,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'option', {
    option: true,
    'option--is-disabled': isDisabled,
    'option--is-focused': isFocused,
    'option--is-selected': isSelected
  }), {
    ref: innerRef,
    "aria-disabled": isDisabled
  }, innerProps), children);
};
var Option$1 = Option;

var placeholderCSS = function placeholderCSS(_ref, unstyled) {
  var _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'placeholder',
    gridArea: '1 / 1 / 2 / 3'
  }, unstyled ? {} : {
    color: colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  });
};
var Placeholder = function Placeholder(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'placeholder', {
    placeholder: true
  }), innerProps), children);
};
var Placeholder$1 = Placeholder;

var css = function css(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    label: 'singleValue',
    gridArea: '1 / 1 / 2 / 3',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }, unstyled ? {} : {
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  });
};
var SingleValue = function SingleValue(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    innerProps = props.innerProps;
  return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, getStyleProps(props, 'singleValue', {
    'single-value': true,
    'single-value--is-disabled': isDisabled
  }), innerProps), children);
};
var SingleValue$1 = SingleValue;

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control$1,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group$1,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input$1,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu$1,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue$1,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option$1,
  Placeholder: Placeholder$1,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue$1,
  ValueContainer: ValueContainer
};
var defaultComponents = function defaultComponents(props) {
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, components), props.components);
};




/***/ },

/***/ "./node_modules/react-select/dist/react-select.esm.js"
/*!************************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.esm.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonceProvider: () => (/* binding */ NonceProvider),
/* harmony export */   components: () => (/* reexport safe */ _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_6__.c),
/* harmony export */   createFilter: () => (/* reexport safe */ _Select_ef7c0426_esm_js__WEBPACK_IMPORTED_MODULE_3__.c),
/* harmony export */   "default": () => (/* binding */ StateManagedSelect$1),
/* harmony export */   defaultTheme: () => (/* reexport safe */ _Select_ef7c0426_esm_js__WEBPACK_IMPORTED_MODULE_3__.d),
/* harmony export */   mergeStyles: () => (/* reexport safe */ _Select_ef7c0426_esm_js__WEBPACK_IMPORTED_MODULE_3__.m),
/* harmony export */   useStateManager: () => (/* reexport safe */ _useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)
/* harmony export */ });
/* harmony import */ var _useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useStateManager-7e1e8489.esm.js */ "./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Select_ef7c0426_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Select-ef7c0426.esm.js */ "./node_modules/react-select/dist/Select-ef7c0426.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-489459f2.browser.development.esm.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js");
/* harmony import */ var _index_641ee5b8_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index-641ee5b8.esm.js */ "./node_modules/react-select/dist/index-641ee5b8.esm.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_createSuper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime/helpers/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! use-isomorphic-layout-effect */ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js");


























var StateManagedSelect = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function (props, ref) {
  var baseSelectProps = (0,_useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_Select_ef7c0426_esm_js__WEBPACK_IMPORTED_MODULE_3__.S, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: ref
  }, baseSelectProps));
});
var StateManagedSelect$1 = StateManagedSelect;

var NonceProvider = (function (_ref) {
  var nonce = _ref.nonce,
    children = _ref.children,
    cacheKey = _ref.cacheKey;
  var emotionCache = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(function () {
    return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_5__["default"])({
      key: cacheKey,
      nonce: nonce
    });
  }, [cacheKey, nonce]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_4__.C, {
    value: emotionCache
  }, children);
});




/***/ },

/***/ "./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js"
/*!************************************************************************!*\
  !*** ./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useStateManager)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);





var _excluded = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function useStateManager(_ref) {
  var _ref$defaultInputValu = _ref.defaultInputValue,
    defaultInputValue = _ref$defaultInputValu === void 0 ? '' : _ref$defaultInputValu,
    _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen,
    defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
    propsInputValue = _ref.inputValue,
    propsMenuIsOpen = _ref.menuIsOpen,
    propsOnChange = _ref.onChange,
    propsOnInputChange = _ref.onInputChange,
    propsOnMenuClose = _ref.onMenuClose,
    propsOnMenuOpen = _ref.onMenuOpen,
    propsValue = _ref.value,
    restSelectProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(propsInputValue !== undefined ? propsInputValue : defaultInputValue),
    _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    stateInputValue = _useState2[0],
    setStateInputValue = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen),
    _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    stateMenuIsOpen = _useState4[0],
    setStateMenuIsOpen = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(propsValue !== undefined ? propsValue : defaultValue),
    _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
    stateValue = _useState6[0],
    setStateValue = _useState6[1];
  var onChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function (value, actionMeta) {
    if (typeof propsOnChange === 'function') {
      propsOnChange(value, actionMeta);
    }
    setStateValue(value);
  }, [propsOnChange]);
  var onInputChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function (value, actionMeta) {
    var newValue;
    if (typeof propsOnInputChange === 'function') {
      newValue = propsOnInputChange(value, actionMeta);
    }
    setStateInputValue(newValue !== undefined ? newValue : value);
  }, [propsOnInputChange]);
  var onMenuOpen = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function () {
    if (typeof propsOnMenuOpen === 'function') {
      propsOnMenuOpen();
    }
    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);
  var onMenuClose = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function () {
    if (typeof propsOnMenuClose === 'function') {
      propsOnMenuClose();
    }
    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);
  var inputValue = propsInputValue !== undefined ? propsInputValue : stateInputValue;
  var menuIsOpen = propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
  var value = propsValue !== undefined ? propsValue : stateValue;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restSelectProps), {}, {
    inputValue: inputValue,
    menuIsOpen: menuIsOpen,
    onChange: onChange,
    onInputChange: onInputChange,
    onMenuClose: onMenuClose,
    onMenuOpen: onMenuOpen,
    value: value
  });
}




/***/ },

/***/ "./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js"
/*!****************************************************************************************************!*\
  !*** ./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js ***!
  \****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ index)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var index = react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect ;




/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/createSuper.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createSuper.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createSuper)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");
/* harmony import */ var _possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./possibleConstructorReturn.js */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");



function _createSuper(t) {
  var r = (0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return function () {
    var e,
      o = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t);
    if (r) {
      var s = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor;
      e = Reflect.construct(o, arguments, s);
    } else e = o.apply(this, arguments);
    return (0,_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this, e);
  };
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js"
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js"
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, e);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js"
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js"
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutProperties)
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(t, e) {
  if (e && ("object" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(r, e) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r, e) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r, e) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _taggedTemplateLiteral)
/* harmony export */ });
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
    raw: {
      value: Object.freeze(t)
    }
  }));
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(r) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js"
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a) : void 0;
  }
}


/***/ },

/***/ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/@floating-ui/core/dist/floating-ui.core.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* binding */ detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   rectToClientRect: () => (/* reexport safe */ _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");



function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
  const alignmentAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentAxis)(placement);
  const alignLength = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAxisLength)(alignmentAxis);
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch ((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
  const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    var _platform$detectOverf;
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: {
        ...platform,
        detectOverflow: (_platform$detectOverf = platform.detectOverflow) != null ? _platform$detectOverf : detectOverflow
      },
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
    const coords = {
      x,
      y
    };
    const axis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentAxis)(placement);
    const length = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAxisLength)(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) === alignment), ...allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) !== alignment)] : allowedPlacements.filter(placement => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement) === alignment || (autoAlignment ? (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAlignmentPlacement)(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentSides)(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
      const initialSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(initialPlacement);
      const isBasePlacement = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositePlacement)(initialPlacement)] : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getExpandedPlacements)(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...(0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxisPlacements)(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignmentSides)(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return _floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects,
        platform
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await platform.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...rects.map(rect => rect.left));
  const minY = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...rects.map(rect => rect.top));
  const maxX = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...rects.map(rect => rect.right));
  const maxY = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.rectToClientRect)(getBoundingRect(nativeClientRects));
      const paddingObject = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getPaddingObject)(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if ((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          const isLeftSide = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement) === 'left';
          const maxRight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(...clientRects.map(rect => rect.right));
          const minLeft = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
  const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
  const isVertical = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement));
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxis)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement);
      const mainAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getOppositeAxis)(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = originSides.has((0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.evaluate)(options, state);
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const side = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSide)(placement);
      const alignment = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getAlignment)(placement);
      const isYAxis = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.getSideAxis)(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.min)(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.left, 0);
        const xMax = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.right, 0);
        const yMin = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.top, 0);
        const yMax = (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : (0,_floating_ui_utils__WEBPACK_IMPORTED_MODULE_0__.max)(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};




/***/ },

/***/ "./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"
/*!****************************************************************!*\
  !*** ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrow: () => (/* binding */ arrow),
/* harmony export */   autoPlacement: () => (/* binding */ autoPlacement),
/* harmony export */   autoUpdate: () => (/* binding */ autoUpdate),
/* harmony export */   computePosition: () => (/* binding */ computePosition),
/* harmony export */   detectOverflow: () => (/* binding */ detectOverflow),
/* harmony export */   flip: () => (/* binding */ flip),
/* harmony export */   getOverflowAncestors: () => (/* reexport safe */ _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   inline: () => (/* binding */ inline),
/* harmony export */   limitShift: () => (/* binding */ limitShift),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   platform: () => (/* binding */ platform),
/* harmony export */   shift: () => (/* binding */ shift),
/* harmony export */   size: () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @floating-ui/core */ "./node_modules/@floating-ui/core/dist/floating-ui.core.mjs");
/* harmony import */ var _floating_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/utils */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs");
/* harmony import */ var _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @floating-ui/utils/dom */ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs");





function getCssDimensions(element) {
  const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(width) !== offsetWidth || (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(domElement)) {
    return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(rect.width) : rect.width) / width;
  let y = ($ ? (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.round)(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
function getVisualOffsets(element) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isWebKit)() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  if (includeScale) {
    if (offsetParent) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(domElement);
    const offsetWin = offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(offsetParent) ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getFrameElement)(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(currentIFrame);
      currentIFrame = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getFrameElement)(currentWin);
    }
  }
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.rectToClientRect)({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(offsetParent);
  const topLayer = elements ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTopLayer)(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  const offsets = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(offsetParent);
    }
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element);
  const scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(element);
  const body = element.ownerDocument.body;
  const width = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(body).direction === 'rtl') {
    x += (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Safety check: ensure the scrollbar space is reasonable in case this
// calculation is affected by unusual styles.
// Most scrollbars leave 15-18px of space.
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  const html = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isWebKit)();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  // <html> `overflow: hidden` + `scrollbar-gutter: stable` reduces the
  // visual width of the <html> but this is not considered in the size
  // of `html.clientWidth`.
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    // If the <body> scrollbar is on the left, the width needs to be extended
    // by the scrollbar amount so there isn't extra space on the right.
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}

const absoluteOrFixed = /*#__PURE__*/new Set(['absolute', 'fixed']);
// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element) ? getScale(element) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element));
  } else if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.rectToClientRect)(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(element);
  if (parentNode === stopNode || !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(parentNode) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(parentNode)) {
    return false;
  }
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(element, [], false).filter(el => (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(el) && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeName)(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).position === 'fixed';
  let currentNode = elementIsFixed ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(currentNode) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(currentNode)) {
    const computedStyle = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(currentNode);
    const currentNodeIsContaining = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isContainingBlock)(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isOverflowElement)(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTopLayer)(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(rect.top, accRect.top);
    accRect.right = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  const documentElement = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeName)(offsetParent) !== 'body' || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isOverflowElement)(documentElement)) {
      scroll = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getNodeScroll)(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.createCoords)(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element) || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element);
  if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTopLayer)(element)) {
    return win;
  }
  if (!(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element)) {
    let svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(element);
    while (svgOffsetParent && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(svgOffsetParent)) {
      if ((0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement)(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getParentNode)(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTableElement)(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isLastTraversableNode)(offsetParent) && isStaticPositioned(offsetParent) && !(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isContainingBlock)(offsetParent)) {
    return win;
  }
  return offsetParent || (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getContainingBlock)(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getComputedStyle)(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: _floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isElement,
  isRTL
};

function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getDocumentElement)(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(top);
    const insetRight = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(root.clientWidth - (left + width));
    const insetBottom = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(root.clientHeight - (top + height));
    const insetLeft = (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.floor)(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.max)(0, (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_1__.min)(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        // It's possible that even though the ratio is reported as 1, the
        // element is not actually fully within the IntersectionObserver's root
        // area anymore. This can happen under performance constraints. This may
        // be a bug in the browser's IntersectionObserver implementation. To
        // work around this, we compare the element's bounding rect now with
        // what it was at the time we created the IntersectionObserver. If they
        // are not equal then the element moved, so we refresh.
        refresh();
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? (0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(referenceEl) : []), ...(0,_floating_ui_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getOverflowAncestors)(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
const detectOverflow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.detectOverflow;

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.offset;

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.autoPlacement;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.shift;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.flip;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.size;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.hide;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.arrow;

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.inline;

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.limitShift;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return (0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.computePosition)(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};




/***/ },

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle),
/* harmony export */   getContainingBlock: () => (/* binding */ getContainingBlock),
/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),
/* harmony export */   getFrameElement: () => (/* binding */ getFrameElement),
/* harmony export */   getNearestOverflowAncestor: () => (/* binding */ getNearestOverflowAncestor),
/* harmony export */   getNodeName: () => (/* binding */ getNodeName),
/* harmony export */   getNodeScroll: () => (/* binding */ getNodeScroll),
/* harmony export */   getOverflowAncestors: () => (/* binding */ getOverflowAncestors),
/* harmony export */   getParentNode: () => (/* binding */ getParentNode),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isContainingBlock: () => (/* binding */ isContainingBlock),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isLastTraversableNode: () => (/* binding */ isLastTraversableNode),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isOverflowElement: () => (/* binding */ isOverflowElement),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),
/* harmony export */   isTableElement: () => (/* binding */ isTableElement),
/* harmony export */   isTopLayer: () => (/* binding */ isTopLayer),
/* harmony export */   isWebKit: () => (/* binding */ isWebKit)
/* harmony export */ });
function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
const invalidOverflowDisplayValues = /*#__PURE__*/new Set(['inline', 'contents']);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
const tableElements = /*#__PURE__*/new Set(['table', 'td', 'th']);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(element) {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
const transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective'];
const willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'];
const containValues = ['paint', 'layout', 'strict', 'content'];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return transformProperties.some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || willChangeValues.some(value => (css.willChange || '').includes(value)) || containValues.some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
const lastTraversableNodeNames = /*#__PURE__*/new Set(['html', 'body', '#document']);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}




/***/ },

/***/ "./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignments: () => (/* binding */ alignments),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   createCoords: () => (/* binding */ createCoords),
/* harmony export */   evaluate: () => (/* binding */ evaluate),
/* harmony export */   expandPaddingObject: () => (/* binding */ expandPaddingObject),
/* harmony export */   floor: () => (/* binding */ floor),
/* harmony export */   getAlignment: () => (/* binding */ getAlignment),
/* harmony export */   getAlignmentAxis: () => (/* binding */ getAlignmentAxis),
/* harmony export */   getAlignmentSides: () => (/* binding */ getAlignmentSides),
/* harmony export */   getAxisLength: () => (/* binding */ getAxisLength),
/* harmony export */   getExpandedPlacements: () => (/* binding */ getExpandedPlacements),
/* harmony export */   getOppositeAlignmentPlacement: () => (/* binding */ getOppositeAlignmentPlacement),
/* harmony export */   getOppositeAxis: () => (/* binding */ getOppositeAxis),
/* harmony export */   getOppositeAxisPlacements: () => (/* binding */ getOppositeAxisPlacements),
/* harmony export */   getOppositePlacement: () => (/* binding */ getOppositePlacement),
/* harmony export */   getPaddingObject: () => (/* binding */ getPaddingObject),
/* harmony export */   getSide: () => (/* binding */ getSide),
/* harmony export */   getSideAxis: () => (/* binding */ getSideAxis),
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min),
/* harmony export */   placements: () => (/* binding */ placements),
/* harmony export */   rectToClientRect: () => (/* binding */ rectToClientRect),
/* harmony export */   round: () => (/* binding */ round),
/* harmony export */   sides: () => (/* binding */ sides)
/* harmony export */ });
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = ['top', 'right', 'bottom', 'left'];
const alignments = ['start', 'end'];
const placements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
const yAxisSides = /*#__PURE__*/new Set(['top', 'bottom']);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}




/***/ },

/***/ "./node_modules/react-virtuoso/dist/index.mjs"
/*!****************************************************!*\
  !*** ./node_modules/react-virtuoso/dist/index.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupedTableVirtuoso: () => (/* binding */ Jr),
/* harmony export */   GroupedVirtuoso: () => (/* binding */ Zr),
/* harmony export */   LogLevel: () => (/* binding */ Ct),
/* harmony export */   TableVirtuoso: () => (/* binding */ Xr),
/* harmony export */   Virtuoso: () => (/* binding */ Yr),
/* harmony export */   VirtuosoGrid: () => (/* binding */ Qr),
/* harmony export */   VirtuosoGridMockContext: () => (/* binding */ Qn),
/* harmony export */   VirtuosoMockContext: () => (/* binding */ Re)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");



const ve = 0, At = 1, Jt = 2, zn = 4;
function un(t) {
  return () => t;
}
function mo(t) {
  t();
}
function se(t, e) {
  return (n) => t(e(n));
}
function an(t, e) {
  return () => t(e);
}
function po(t, e) {
  return (n) => t(e, n);
}
function Ae(t) {
  return t !== void 0;
}
function ho(...t) {
  return () => {
    t.map(mo);
  };
}
function Qt() {
}
function ye(t, e) {
  return e(t), t;
}
function go(t, e) {
  return e(t);
}
function tt(...t) {
  return t;
}
function Y(t, e) {
  return t(At, e);
}
function D(t, e) {
  t(ve, e);
}
function We(t) {
  t(Jt);
}
function rt(t) {
  return t(zn);
}
function F(t, e) {
  return Y(t, po(e, ve));
}
function Et(t, e) {
  const n = t(At, (o) => {
    n(), e(o);
  });
  return n;
}
function dn(t) {
  let e, n;
  return (o) => (r) => {
    e = r, n && clearTimeout(n), n = setTimeout(() => {
      o(e);
    }, t);
  };
}
function On(t, e) {
  return t === e;
}
function J(t = On) {
  let e;
  return (n) => (o) => {
    t(e, o) || (e = o, n(o));
  };
}
function P(t) {
  return (e) => (n) => {
    t(n) && e(n);
  };
}
function k(t) {
  return (e) => se(e, t);
}
function Ft(t) {
  return (e) => () => {
    e(t);
  };
}
function x(t, ...e) {
  const n = Io(...e);
  return ((o, r) => {
    switch (o) {
      case Jt:
        We(t);
        return;
      case At:
        return Y(t, n(r));
    }
  });
}
function Lt(t, e) {
  return (n) => (o) => {
    n(e = t(e, o));
  };
}
function Kt(t) {
  return (e) => (n) => {
    t > 0 ? t-- : e(n);
  };
}
function Gt(t) {
  let e = null, n;
  return (o) => (r) => {
    e = r, !n && (n = setTimeout(() => {
      n = void 0, o(e);
    }, t));
  };
}
function $(...t) {
  const e = new Array(t.length);
  let n = 0, o = null;
  const r = Math.pow(2, t.length) - 1;
  return t.forEach((s, i) => {
    const l = Math.pow(2, i);
    Y(s, (u) => {
      const d = n;
      n = n | l, e[i] = u, d !== r && n === r && o && (o(), o = null);
    });
  }), (s) => (i) => {
    const l = () => {
      s([i].concat(e));
    };
    n === r ? l() : o = l;
  };
}
function Io(...t) {
  return (e) => t.reduceRight(go, e);
}
function xo(t) {
  let e, n;
  const o = () => e == null ? void 0 : e();
  return function(r, s) {
    switch (r) {
      case At:
        return s ? n === s ? void 0 : (o(), n = s, e = Y(t, s), e) : (o(), Qt);
      case Jt:
        o(), n = null;
        return;
    }
  };
}
function C(t) {
  let e = t;
  const n = U();
  return ((o, r) => {
    switch (o) {
      case ve:
        e = r;
        break;
      case At: {
        r(e);
        break;
      }
      case zn:
        return e;
    }
    return n(o, r);
  });
}
function ht(t, e) {
  return ye(C(e), (n) => F(t, n));
}
function U() {
  const t = [];
  return ((e, n) => {
    switch (e) {
      case ve:
        t.slice().forEach((o) => {
          o(n);
        });
        return;
      case Jt:
        t.splice(0, t.length);
        return;
      case At:
        return t.push(n), () => {
          const o = t.indexOf(n);
          o > -1 && t.splice(o, 1);
        };
    }
  });
}
function bt(t) {
  return ye(U(), (e) => F(t, e));
}
function K(t, e = [], { singleton: n } = { singleton: !0 }) {
  return {
    constructor: t,
    dependencies: e,
    id: So(),
    singleton: n
  };
}
const So = () => Symbol();
function To(t) {
  const e = /* @__PURE__ */ new Map(), n = ({ constructor: o, dependencies: r, id: s, singleton: i }) => {
    if (i && e.has(s))
      return e.get(s);
    const l = o(r.map((u) => n(u)));
    return i && e.set(s, l), l;
  };
  return n(t);
}
function ut(...t) {
  const e = U(), n = new Array(t.length);
  let o = 0;
  const r = Math.pow(2, t.length) - 1;
  return t.forEach((s, i) => {
    const l = Math.pow(2, i);
    Y(s, (u) => {
      n[i] = u, o = o | l, o === r && D(e, n);
    });
  }), function(s, i) {
    switch (s) {
      case Jt: {
        We(e);
        return;
      }
      case At:
        return o === r && i(n), Y(e, i);
    }
  };
}
function V(t, e = On) {
  return x(t, J(e));
}
function Fe(...t) {
  return function(e, n) {
    switch (e) {
      case Jt:
        return;
      case At:
        return ho(...t.map((o) => Y(o, n)));
    }
  };
}
var Ct = /* @__PURE__ */ ((t) => (t[t.DEBUG = 0] = "DEBUG", t[t.INFO = 1] = "INFO", t[t.WARN = 2] = "WARN", t[t.ERROR = 3] = "ERROR", t))(Ct || {});
const Co = {
  0: "debug",
  3: "error",
  1: "log",
  2: "warn"
}, wo = () => typeof globalThis > "u" ? window : globalThis, Wt = K(
  () => {
    const t = C(
      3
      /* ERROR */
    );
    return {
      log: C((n, o, r = 1) => {
        var i;
        const s = (i = wo().VIRTUOSO_LOG_LEVEL) != null ? i : rt(t);
        r >= s && console[Co[r]](
          "%creact-virtuoso: %c%s %o",
          "color: #0253b3; font-weight: bold",
          "color: initial",
          n,
          o
        );
      }),
      logLevel: t
    };
  },
  [],
  { singleton: !0 }
);
function Vt(t, e, n) {
  return _e(t, e, n).callbackRef;
}
function _e(t, e, n) {
  const o = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
  let r = (i) => {
  };
  const s = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => typeof ResizeObserver < "u" ? new ResizeObserver((i) => {
    const l = () => {
      const u = i[0].target;
      u.offsetParent !== null && t(u);
    };
    n ? l() : requestAnimationFrame(l);
  }) : null, [t, n]);
  return r = (i) => {
    i && e ? (s == null || s.observe(i), o.current = i) : (o.current && (s == null || s.unobserve(o.current)), o.current = null);
  }, { callbackRef: r, ref: o };
}
function Fn(t, e, n, o, r, s, i, l, u) {
  const d = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (m) => {
      const S = vo(m.children, e, l ? "offsetWidth" : "offsetHeight", r);
      let h = m.parentElement;
      for (; !h.dataset.virtuosoScroller; )
        h = h.parentElement;
      const T = h.lastElementChild.dataset.viewportType === "window";
      let w;
      T && (w = h.ownerDocument.defaultView);
      const R = i ? l ? i.scrollLeft : i.scrollTop : T ? l ? w.scrollX || w.document.documentElement.scrollLeft : w.scrollY || w.document.documentElement.scrollTop : l ? h.scrollLeft : h.scrollTop, g = i ? l ? i.scrollWidth : i.scrollHeight : T ? l ? w.document.documentElement.scrollWidth : w.document.documentElement.scrollHeight : l ? h.scrollWidth : h.scrollHeight, f = i ? l ? i.offsetWidth : i.offsetHeight : T ? l ? w.innerWidth : w.innerHeight : l ? h.offsetWidth : h.offsetHeight;
      o({
        scrollHeight: g,
        scrollTop: Math.max(R, 0),
        viewportHeight: f
      }), s == null || s(
        l ? fn("column-gap", getComputedStyle(m).columnGap, r) : fn("row-gap", getComputedStyle(m).rowGap, r)
      ), S !== null && t(S);
    },
    [t, e, r, s, i, o, l]
  );
  return _e(d, n, u);
}
function vo(t, e, n, o) {
  const r = t.length;
  if (r === 0)
    return null;
  const s = [];
  for (let i = 0; i < r; i++) {
    const l = t.item(i);
    if (l.dataset.index === void 0)
      continue;
    const u = parseInt(l.dataset.index), d = parseFloat(l.dataset.knownSize), m = e(l, n);
    if (m === 0 && o("Zero-sized element, this should not happen", { child: l }, Ct.ERROR), m === d)
      continue;
    const S = s[s.length - 1];
    s.length === 0 || S.size !== m || S.endIndex !== u - 1 ? s.push({ endIndex: u, size: m, startIndex: u }) : s[s.length - 1].endIndex++;
  }
  return s;
}
function fn(t, e, n) {
  return e !== "normal" && !(e != null && e.endsWith("px")) && n(`${t} was not resolved to pixel value correctly`, e, Ct.WARN), e === "normal" ? 0 : parseInt(e != null ? e : "0", 10);
}
function Ne(t, e, n) {
  const o = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null), r = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (u) => {
      if (!(u != null && u.offsetParent))
        return;
      const d = u.getBoundingClientRect(), m = d.width;
      let S, h;
      if (e) {
        const T = e.getBoundingClientRect(), w = d.top - T.top;
        h = T.height - Math.max(0, w), S = w + e.scrollTop;
      } else {
        const T = i.current.ownerDocument.defaultView;
        h = T.innerHeight - Math.max(0, d.top), S = d.top + T.scrollY;
      }
      o.current = {
        offsetTop: S,
        visibleHeight: h,
        visibleWidth: m
      }, t(o.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, e]
  ), { callbackRef: s, ref: i } = _e(r, !0, n), l = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(() => {
    r(i.current);
  }, [r, i]);
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    var u;
    if (e) {
      e.addEventListener("scroll", l);
      const d = new ResizeObserver(() => {
        requestAnimationFrame(l);
      });
      return d.observe(e), () => {
        e.removeEventListener("scroll", l), d.unobserve(e);
      };
    } else {
      const d = (u = i.current) == null ? void 0 : u.ownerDocument.defaultView;
      return d == null || d.addEventListener("scroll", l), d == null || d.addEventListener("resize", l), () => {
        d == null || d.removeEventListener("scroll", l), d == null || d.removeEventListener("resize", l);
      };
    }
  }, [l, e, i]), s;
}
const It = K(
  () => {
    const t = U(), e = U(), n = C(0), o = U(), r = C(0), s = U(), i = U(), l = C(0), u = C(0), d = C(0), m = C(0), S = U(), h = U(), T = C(!1), w = C(!1), R = C(!1);
    return F(
      x(
        t,
        k(({ scrollTop: g }) => g)
      ),
      e
    ), F(
      x(
        t,
        k(({ scrollHeight: g }) => g)
      ),
      i
    ), F(e, r), {
      deviation: n,
      fixedFooterHeight: d,
      fixedHeaderHeight: u,
      footerHeight: m,
      headerHeight: l,
      horizontalDirection: w,
      scrollBy: h,
      // input
      scrollContainerState: t,
      scrollHeight: i,
      scrollingInProgress: T,
      // signals
      scrollTo: S,
      scrollTop: e,
      skipAnimationFrameInResizeObserver: R,
      smoothScrollTargetReached: o,
      // state
      statefulScrollTop: r,
      viewportHeight: s
    };
  },
  [],
  { singleton: !0 }
), ie = { lvl: 0 };
function Ln(t, e) {
  const n = t.length;
  if (n === 0)
    return [];
  let { index: o, value: r } = e(t[0]);
  const s = [];
  for (let i = 1; i < n; i++) {
    const { index: l, value: u } = e(t[i]);
    s.push({ end: l - 1, start: o, value: r }), o = l, r = u;
  }
  return s.push({ end: 1 / 0, start: o, value: r }), s;
}
function X(t) {
  return t === ie;
}
function le(t, e) {
  if (!X(t))
    return e === t.k ? t.v : e < t.k ? le(t.l, e) : le(t.r, e);
}
function kt(t, e, n = "k") {
  if (X(t))
    return [-1 / 0, void 0];
  if (Number(t[n]) === e)
    return [t.k, t.v];
  if (Number(t[n]) < e) {
    const o = kt(t.r, e, n);
    return o[0] === -1 / 0 ? [t.k, t.v] : o;
  }
  return kt(t.l, e, n);
}
function yt(t, e, n) {
  return X(t) ? Gn(e, n, 1) : e === t.k ? dt(t, { k: e, v: n }) : e < t.k ? mn(dt(t, { l: yt(t.l, e, n) })) : mn(dt(t, { r: yt(t.r, e, n) }));
}
function Zt() {
  return ie;
}
function Xt(t, e, n) {
  if (X(t))
    return [];
  const o = kt(t, e)[0];
  return yo(Ve(t, o, n));
}
function Le(t, e) {
  if (X(t)) return ie;
  const { k: n, l: o, r } = t;
  if (e === n) {
    if (X(o))
      return r;
    if (X(r))
      return o;
    {
      const [s, i] = Pn(o);
      return Se(dt(t, { k: s, l: Vn(o), v: i }));
    }
  } else return e < n ? Se(dt(t, { l: Le(o, e) })) : Se(dt(t, { r: Le(r, e) }));
}
function Dt(t) {
  return X(t) ? [] : [...Dt(t.l), { k: t.k, v: t.v }, ...Dt(t.r)];
}
function Ve(t, e, n) {
  if (X(t))
    return [];
  const { k: o, l: r, r: s, v: i } = t;
  let l = [];
  return o > e && (l = l.concat(Ve(r, e, n))), o >= e && o <= n && l.push({ k: o, v: i }), o <= n && (l = l.concat(Ve(s, e, n))), l;
}
function Se(t) {
  const { l: e, lvl: n, r: o } = t;
  if (o.lvl >= n - 1 && e.lvl >= n - 1)
    return t;
  if (n > o.lvl + 1) {
    if (Ee(e))
      return Mn(dt(t, { lvl: n - 1 }));
    if (!X(e) && !X(e.r))
      return dt(e.r, {
        l: dt(e, { r: e.r.l }),
        lvl: n,
        r: dt(t, {
          l: e.r.r,
          lvl: n - 1
        })
      });
    throw new Error("Unexpected empty nodes");
  } else {
    if (Ee(t))
      return Pe(dt(t, { lvl: n - 1 }));
    if (!X(o) && !X(o.l)) {
      const r = o.l, s = Ee(r) ? o.lvl - 1 : o.lvl;
      return dt(r, {
        l: dt(t, {
          lvl: n - 1,
          r: r.l
        }),
        lvl: r.lvl + 1,
        r: Pe(dt(o, { l: r.r, lvl: s }))
      });
    } else
      throw new Error("Unexpected empty nodes");
  }
}
function dt(t, e) {
  return Gn(
    e.k !== void 0 ? e.k : t.k,
    e.v !== void 0 ? e.v : t.v,
    e.lvl !== void 0 ? e.lvl : t.lvl,
    e.l !== void 0 ? e.l : t.l,
    e.r !== void 0 ? e.r : t.r
  );
}
function Vn(t) {
  return X(t.r) ? t.l : Se(dt(t, { r: Vn(t.r) }));
}
function Ee(t) {
  return X(t) || t.lvl > t.r.lvl;
}
function Pn(t) {
  return X(t.r) ? [t.k, t.v] : Pn(t.r);
}
function Gn(t, e, n, o = ie, r = ie) {
  return { k: t, l: o, lvl: n, r, v: e };
}
function mn(t) {
  return Pe(Mn(t));
}
function Mn(t) {
  const { l: e } = t;
  return !X(e) && e.lvl === t.lvl ? dt(e, { r: dt(t, { l: e.r }) }) : t;
}
function Pe(t) {
  const { lvl: e, r: n } = t;
  return !X(n) && !X(n.r) && n.lvl === e && n.r.lvl === e ? dt(n, { l: dt(t, { r: n.l }), lvl: e + 1 }) : t;
}
function yo(t) {
  return Ln(t, ({ k: e, v: n }) => ({ index: e, value: n }));
}
function An(t, e) {
  return !!(t && t.startIndex === e.startIndex && t.endIndex === e.endIndex);
}
function ce(t, e) {
  return !!(t && t[0] === e[0] && t[1] === e[1]);
}
const De = K(
  () => ({ recalcInProgress: C(!1) }),
  [],
  { singleton: !0 }
);
function Wn(t, e, n) {
  return t[Ce(t, e, n)];
}
function Ce(t, e, n, o = 0) {
  let r = t.length - 1;
  for (; o <= r; ) {
    const s = Math.floor((o + r) / 2), i = t[s], l = n(i, e);
    if (l === 0)
      return s;
    if (l === -1) {
      if (r - o < 2)
        return s - 1;
      r = s - 1;
    } else {
      if (r === o)
        return s;
      o = s + 1;
    }
  }
  throw new Error(`Failed binary finding record in array - ${t.join(",")}, searched for ${e}`);
}
function bo(t, e, n, o) {
  const r = Ce(t, e, o), s = Ce(t, n, o, r);
  return t.slice(r, s + 1);
}
function zt(t, e) {
  return Math.round(t.getBoundingClientRect()[e]);
}
function be(t) {
  return !X(t.groupOffsetTree);
}
function $e({ index: t }, e) {
  return e === t ? 0 : e < t ? -1 : 1;
}
function Ro() {
  return {
    groupIndices: [],
    groupOffsetTree: Zt(),
    lastIndex: 0,
    lastOffset: 0,
    lastSize: 0,
    offsetTree: [],
    sizeTree: Zt()
  };
}
function Ho(t, e) {
  let n = X(t) ? 0 : 1 / 0;
  for (const o of e) {
    const { endIndex: r, size: s, startIndex: i } = o;
    if (n = Math.min(n, i), X(t)) {
      t = yt(t, 0, s);
      continue;
    }
    const l = Xt(t, i - 1, r + 1);
    if (l.some(Lo(o)))
      continue;
    let u = !1, d = !1;
    for (const { end: m, start: S, value: h } of l)
      u ? (r >= S || s === h) && (t = Le(t, S)) : (d = h !== s, u = !0), m > r && r >= S && h !== s && (t = yt(t, r + 1, h));
    d && (t = yt(t, i, s));
  }
  return [t, n];
}
function Eo(t) {
  return typeof t.groupIndex < "u";
}
function Bo({ offset: t }, e) {
  return e === t ? 0 : e < t ? -1 : 1;
}
function ue(t, e, n) {
  if (e.length === 0)
    return 0;
  const { index: o, offset: r, size: s } = Wn(e, t, $e), i = t - o, l = s * i + (i - 1) * n + r;
  return l > 0 ? l + n : l;
}
function _n(t, e) {
  if (!be(e))
    return t;
  let n = 0;
  for (; e.groupIndices[n] <= t + n; )
    n++;
  return t + n;
}
function Nn(t, e, n) {
  if (Eo(t))
    return e.groupIndices[t.groupIndex] + 1;
  {
    const o = t.index === "LAST" ? n : t.index;
    let r = _n(o, e);
    return r = Math.max(0, r, Math.min(n, r)), r;
  }
}
function ko(t, e, n, o = 0) {
  return o > 0 && (e = Math.max(e, Wn(t, o, $e).offset)), Ln(bo(t, e, n, Bo), Fo);
}
function zo(t, [e, n, o, r]) {
  e.length > 0 && o("received item sizes", e, Ct.DEBUG);
  const s = t.sizeTree;
  let i = s, l = 0;
  if (n.length > 0 && X(s) && e.length === 2) {
    const h = e[0].size, T = e[1].size;
    i = n.reduce((w, R) => yt(yt(w, R, h), R + 1, T), i);
  } else
    [i, l] = Ho(i, e);
  if (i === s)
    return t;
  const { lastIndex: u, lastOffset: d, lastSize: m, offsetTree: S } = Ge(t.offsetTree, l, i, r);
  return {
    groupIndices: n,
    groupOffsetTree: n.reduce((h, T) => yt(h, T, ue(T, S, r)), Zt()),
    lastIndex: u,
    lastOffset: d,
    lastSize: m,
    offsetTree: S,
    sizeTree: i
  };
}
function Oo(t) {
  return Dt(t).map(({ k: e, v: n }, o, r) => {
    const s = r[o + 1];
    return { endIndex: s ? s.k - 1 : 1 / 0, size: n, startIndex: e };
  });
}
function pn(t, e) {
  let n = 0, o = 0;
  for (; n < t; )
    n += e[o + 1] - e[o] - 1, o++;
  return o - (n === t ? 0 : 1);
}
function Ge(t, e, n, o) {
  let r = t, s = 0, i = 0, l = 0, u = 0;
  if (e !== 0) {
    u = Ce(r, e - 1, $e), l = r[u].offset;
    const m = kt(n, e - 1);
    s = m[0], i = m[1], r.length && r[u].size === kt(n, e)[1] && (u -= 1), r = r.slice(0, u + 1);
  } else
    r = [];
  for (const { start: d, value: m } of Xt(n, e, 1 / 0)) {
    const S = d - s, h = S * i + l + S * o;
    r.push({
      index: d,
      offset: h,
      size: m
    }), s = d, l = h, i = m;
  }
  return {
    lastIndex: s,
    lastOffset: l,
    lastSize: i,
    offsetTree: r
  };
}
function Fo(t) {
  return { index: t.index, value: t };
}
function Lo(t) {
  const { endIndex: e, size: n, startIndex: o } = t;
  return (r) => r.start === o && (r.end === e || r.end === 1 / 0) && r.value === n;
}
const Vo = {
  offsetHeight: "height",
  offsetWidth: "width"
}, Pt = K(
  ([{ log: t }, { recalcInProgress: e }]) => {
    const n = U(), o = U(), r = ht(o, 0), s = U(), i = U(), l = C(0), u = C([]), d = C(void 0), m = C(void 0), S = C(void 0), h = C(void 0), T = C((c, p) => zt(c, Vo[p])), w = C(void 0), R = C(0), g = Ro(), f = ht(
      x(n, $(u, t, R), Lt(zo, g), J()),
      g
    ), a = ht(
      x(
        u,
        J(),
        Lt((c, p) => ({ current: p, prev: c.current }), {
          current: [],
          prev: []
        }),
        k(({ prev: c }) => c)
      ),
      []
    );
    F(
      x(
        u,
        P((c) => c.length > 0),
        $(f, R),
        k(([c, p, v]) => {
          const O = c.reduce((B, W, _) => yt(B, W, ue(W, p.offsetTree, v) || _), Zt());
          return {
            ...p,
            groupIndices: c,
            groupOffsetTree: O
          };
        })
      ),
      f
    ), F(
      x(
        o,
        $(f),
        P(([c, { lastIndex: p }]) => c < p),
        k(([c, { lastIndex: p, lastSize: v }]) => [
          {
            endIndex: p,
            size: v,
            startIndex: c
          }
        ])
      ),
      n
    ), F(d, m);
    const I = ht(
      x(
        d,
        k((c) => c === void 0)
      ),
      !0
    );
    F(
      x(
        m,
        P((c) => c !== void 0 && X(rt(f).sizeTree)),
        k((c) => {
          const p = rt(S), v = rt(u).length > 0;
          return p ? v ? [
            { endIndex: 0, size: p, startIndex: 0 },
            { endIndex: 1, size: c, startIndex: 1 }
          ] : [] : [{ endIndex: 0, size: c, startIndex: 0 }];
        })
      ),
      n
    ), F(
      x(
        h,
        P((c) => c !== void 0 && c.length > 0 && X(rt(f).sizeTree)),
        k((c) => {
          const p = [];
          let v = c[0], O = 0;
          for (let B = 1; B < c.length; B++) {
            const W = c[B];
            W !== v && (p.push({
              endIndex: B - 1,
              size: v,
              startIndex: O
            }), v = W, O = B);
          }
          return p.push({
            endIndex: c.length - 1,
            size: v,
            startIndex: O
          }), p;
        })
      ),
      n
    ), F(
      x(
        u,
        $(S, m),
        P(([, c, p]) => c !== void 0 && p !== void 0),
        k(([c, p, v]) => {
          const O = [];
          for (let B = 0; B < c.length; B++) {
            const W = c[B], _ = c[B + 1];
            O.push({
              startIndex: W,
              endIndex: W,
              size: p
            }), _ !== void 0 && O.push({
              startIndex: W + 1,
              endIndex: _ - 1,
              size: v
            });
          }
          return O;
        })
      ),
      n
    );
    const b = bt(
      x(
        n,
        $(f),
        Lt(
          ({ sizes: c }, [p, v]) => ({
            changed: v !== c,
            sizes: v
          }),
          { changed: !1, sizes: g }
        ),
        k((c) => c.changed)
      )
    );
    Y(
      x(
        l,
        Lt(
          (c, p) => ({ diff: c.prev - p, prev: p }),
          { diff: 0, prev: 0 }
        ),
        k((c) => c.diff)
      ),
      (c) => {
        const { groupIndices: p } = rt(f);
        if (c > 0)
          D(e, !0), D(s, c + pn(c, p));
        else if (c < 0) {
          const v = rt(a);
          v.length > 0 && (c -= pn(-c, v)), D(i, c);
        }
      }
    ), Y(x(l, $(t)), ([c, p]) => {
      c < 0 && p(
        "`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value",
        { firstItemIndex: l },
        Ct.ERROR
      );
    });
    const y = bt(s);
    F(
      x(
        s,
        $(f),
        k(([c, p]) => {
          const v = p.groupIndices.length > 0, O = [], B = p.lastSize;
          if (v) {
            const W = le(p.sizeTree, 0);
            let _ = 0, j = 0;
            for (; _ < c; ) {
              const M = p.groupIndices[j], et = p.groupIndices.length === j + 1 ? 1 / 0 : p.groupIndices[j + 1] - M - 1;
              O.push({
                endIndex: M,
                size: W,
                startIndex: M
              }), O.push({
                endIndex: M + 1 + et - 1,
                size: B,
                startIndex: M + 1
              }), j++, _ += et + 1;
            }
            const L = Dt(p.sizeTree);
            return _ !== c && L.shift(), L.reduce(
              (M, { k: et, v: wt }) => {
                let ft = M.ranges;
                return M.prevSize !== 0 && (ft = [
                  ...M.ranges,
                  {
                    endIndex: et + c - 1,
                    size: M.prevSize,
                    startIndex: M.prevIndex
                  }
                ]), {
                  prevIndex: et + c,
                  prevSize: wt,
                  ranges: ft
                };
              },
              {
                prevIndex: c,
                prevSize: 0,
                ranges: O
              }
            ).ranges;
          }
          return Dt(p.sizeTree).reduce(
            (W, { k: _, v: j }) => ({
              prevIndex: _ + c,
              prevSize: j,
              ranges: [...W.ranges, { endIndex: _ + c - 1, size: W.prevSize, startIndex: W.prevIndex }]
            }),
            {
              prevIndex: 0,
              prevSize: B,
              ranges: []
            }
          ).ranges;
        })
      ),
      n
    );
    const z = bt(
      x(
        i,
        $(f, R),
        k(([c, { offsetTree: p }, v]) => {
          const O = -c;
          return ue(O, p, v);
        })
      )
    );
    return F(
      x(
        i,
        $(f, R),
        k(([c, p, v]) => {
          if (p.groupIndices.length > 0) {
            if (X(p.sizeTree))
              return p;
            let B = Zt();
            const W = rt(a);
            let _ = 0, j = 0, L = 0;
            for (; _ < -c; ) {
              L = W[j];
              const M = W[j + 1] - L - 1;
              j++, _ += M + 1;
            }
            if (B = Dt(p.sizeTree).reduce((M, { k: et, v: wt }) => yt(M, Math.max(0, et + c), wt), B), _ !== -c) {
              const M = le(p.sizeTree, L);
              B = yt(B, 0, M);
              const et = kt(p.sizeTree, -c + 1)[1];
              B = yt(B, 1, et);
            }
            return {
              ...p,
              sizeTree: B,
              ...Ge(p.offsetTree, 0, B, v)
            };
          } else {
            const B = Dt(p.sizeTree).reduce((W, { k: _, v: j }) => yt(W, Math.max(0, _ + c), j), Zt());
            return {
              ...p,
              sizeTree: B,
              ...Ge(p.offsetTree, 0, B, v)
            };
          }
        })
      ),
      f
    ), {
      beforeUnshiftWith: y,
      // input
      data: w,
      defaultItemSize: m,
      firstItemIndex: l,
      fixedItemSize: d,
      fixedGroupSize: S,
      gap: R,
      groupIndices: u,
      heightEstimates: h,
      itemSize: T,
      listRefresh: b,
      shiftWith: i,
      shiftWithOffset: z,
      sizeRanges: n,
      // output
      sizes: f,
      statefulTotalCount: r,
      totalCount: o,
      trackItemSizes: I,
      unshiftWith: s
    };
  },
  tt(Wt, De),
  { singleton: !0 }
);
function Po(t) {
  return t.reduce(
    (e, n) => (e.groupIndices.push(e.totalCount), e.totalCount += n + 1, e),
    {
      groupIndices: [],
      totalCount: 0
    }
  );
}
const Dn = K(
  ([{ groupIndices: t, sizes: e, totalCount: n }, { headerHeight: o, scrollTop: r }]) => {
    const s = U(), i = U(), l = bt(x(s, k(Po)));
    return F(
      x(
        l,
        k((u) => u.totalCount)
      ),
      n
    ), F(
      x(
        l,
        k((u) => u.groupIndices)
      ),
      t
    ), F(
      x(
        ut(r, e, o),
        P(([u, d]) => be(d)),
        k(([u, d, m]) => kt(d.groupOffsetTree, Math.max(u - m, 0), "v")[0]),
        J(),
        k((u) => [u])
      ),
      i
    ), { groupCounts: s, topItemsIndexes: i };
  },
  tt(Pt, It)
), _t = K(
  ([{ log: t }]) => {
    const e = C(!1), n = bt(
      x(
        e,
        P((o) => o),
        J()
      )
    );
    return Y(e, (o) => {
      o && rt(t)("props updated", {}, Ct.DEBUG);
    }), { didMount: n, propsReady: e };
  },
  tt(Wt),
  { singleton: !0 }
), Go = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function $n(t) {
  const e = typeof t == "number" ? { index: t } : t;
  return e.align || (e.align = "start"), (!e.behavior || !Go) && (e.behavior = "auto"), e.offset || (e.offset = 0), e;
}
const me = K(
  ([
    { gap: t, listRefresh: e, sizes: n, totalCount: o },
    {
      fixedFooterHeight: r,
      fixedHeaderHeight: s,
      footerHeight: i,
      headerHeight: l,
      scrollingInProgress: u,
      scrollTo: d,
      smoothScrollTargetReached: m,
      viewportHeight: S
    },
    { log: h }
  ]) => {
    const T = U(), w = U(), R = C(0);
    let g = null, f = null, a = null;
    function I() {
      g && (g(), g = null), a && (a(), a = null), f && (clearTimeout(f), f = null), D(u, !1);
    }
    return F(
      x(
        T,
        $(n, S, o, R, l, i, h),
        $(t, s, r),
        k(
          ([
            [b, y, z, c, p, v, O, B],
            W,
            _,
            j
          ]) => {
            const L = $n(b), { align: xt, behavior: M, offset: et } = L, wt = c - 1, ft = Nn(L, y, wt);
            let St = ue(ft, y.offsetTree, W) + v;
            xt === "end" ? (St += _ + kt(y.sizeTree, ft)[1] - z + j, ft === wt && (St += O)) : xt === "center" ? St += (_ + kt(y.sizeTree, ft)[1] - z + j) / 2 : St -= p, et && (St += et);
            const Mt = (pt) => {
              I(), pt ? (B("retrying to scroll to", { location: b }, Ct.DEBUG), D(T, b)) : (D(w, !0), B("list did not change, scroll successful", {}, Ct.DEBUG));
            };
            if (I(), M === "smooth") {
              let pt = !1;
              a = Y(e, (qt) => {
                pt = pt || qt;
              }), g = Et(m, () => {
                Mt(pt);
              });
            } else
              g = Et(x(e, Mo(150)), Mt);
            return f = setTimeout(() => {
              I();
            }, 1200), D(u, !0), B("scrolling from index to", { behavior: M, index: ft, top: St }, Ct.DEBUG), { behavior: M, top: St };
          }
        )
      ),
      d
    ), {
      scrollTargetReached: w,
      scrollToIndex: T,
      topListHeight: R
    };
  },
  tt(Pt, It, Wt),
  { singleton: !0 }
);
function Mo(t) {
  return (e) => {
    const n = setTimeout(() => {
      e(!1);
    }, t);
    return (o) => {
      o && (e(!0), clearTimeout(n));
    };
  };
}
function Ue(t, e) {
  t == 0 ? e() : requestAnimationFrame(() => {
    Ue(t - 1, e);
  });
}
function Ke(t, e) {
  const n = e - 1;
  return typeof t == "number" ? t : t.index === "LAST" ? n : t.index;
}
const pe = K(
  ([{ defaultItemSize: t, listRefresh: e, sizes: n }, { scrollTop: o }, { scrollTargetReached: r, scrollToIndex: s }, { didMount: i }]) => {
    const l = C(!0), u = C(0), d = C(!0);
    return F(
      x(
        i,
        $(u),
        P(([m, S]) => !!S),
        Ft(!1)
      ),
      l
    ), F(
      x(
        i,
        $(u),
        P(([m, S]) => !!S),
        Ft(!1)
      ),
      d
    ), Y(
      x(
        ut(e, i),
        $(l, n, t, d),
        P(([[, m], S, { sizeTree: h }, T, w]) => m && (!X(h) || Ae(T)) && !S && !w),
        $(u)
      ),
      ([, m]) => {
        Et(r, () => {
          D(d, !0);
        }), Ue(4, () => {
          Et(o, () => {
            D(l, !0);
          }), D(s, m);
        });
      }
    ), {
      initialItemFinalLocationReached: d,
      initialTopMostItemIndex: u,
      scrolledToInitialItem: l
    };
  },
  tt(Pt, It, me, _t),
  { singleton: !0 }
);
function Un(t, e) {
  return Math.abs(t - e) < 1.01;
}
const ae = "up", oe = "down", Ao = "none", Wo = {
  atBottom: !1,
  notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
  state: {
    offsetBottom: 0,
    scrollHeight: 0,
    scrollTop: 0,
    viewportHeight: 0
  }
}, _o = 0, he = K(([{ footerHeight: t, headerHeight: e, scrollBy: n, scrollContainerState: o, scrollTop: r, viewportHeight: s }]) => {
  const i = C(!1), l = C(!0), u = U(), d = U(), m = C(4), S = C(_o), h = ht(
    x(
      Fe(x(V(r), Kt(1), Ft(!0)), x(V(r), Kt(1), Ft(!1), dn(100))),
      J()
    ),
    !1
  ), T = ht(
    x(Fe(x(n, Ft(!0)), x(n, Ft(!1), dn(200))), J()),
    !1
  );
  F(
    x(
      ut(V(r), V(S)),
      k(([a, I]) => a <= I),
      J()
    ),
    l
  ), F(x(l, Gt(50)), d);
  const w = bt(
    x(
      ut(o, V(s), V(e), V(t), V(m)),
      Lt((a, [{ scrollHeight: I, scrollTop: b }, y, z, c, p]) => {
        const v = b + y - I > -p, O = {
          scrollHeight: I,
          scrollTop: b,
          viewportHeight: y
        };
        if (v) {
          let W, _;
          return b > a.state.scrollTop ? (W = "SCROLLED_DOWN", _ = a.state.scrollTop - b) : (W = "SIZE_DECREASED", _ = a.state.scrollTop - b || a.scrollTopDelta), {
            atBottom: !0,
            atBottomBecause: W,
            scrollTopDelta: _,
            state: O
          };
        }
        let B;
        return O.scrollHeight > a.state.scrollHeight ? B = "SIZE_INCREASED" : y < a.state.viewportHeight ? B = "VIEWPORT_HEIGHT_DECREASING" : b < a.state.scrollTop ? B = "SCROLLING_UPWARDS" : B = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM", {
          atBottom: !1,
          notAtBottomBecause: B,
          state: O
        };
      }, Wo),
      J((a, I) => a && a.atBottom === I.atBottom)
    )
  ), R = ht(
    x(
      o,
      Lt(
        (a, { scrollHeight: I, scrollTop: b, viewportHeight: y }) => {
          if (Un(a.scrollHeight, I))
            return {
              changed: !1,
              jump: 0,
              scrollHeight: I,
              scrollTop: b
            };
          {
            const z = I - (b + y) < 1;
            return a.scrollTop !== b && z ? {
              changed: !0,
              jump: a.scrollTop - b,
              scrollHeight: I,
              scrollTop: b
            } : {
              changed: !0,
              jump: 0,
              scrollHeight: I,
              scrollTop: b
            };
          }
        },
        { changed: !1, jump: 0, scrollHeight: 0, scrollTop: 0 }
      ),
      P((a) => a.changed),
      k((a) => a.jump)
    ),
    0
  );
  F(
    x(
      w,
      k((a) => a.atBottom)
    ),
    i
  ), F(x(i, Gt(50)), u);
  const g = C(oe);
  F(
    x(
      o,
      k(({ scrollTop: a }) => a),
      J(),
      Lt(
        (a, I) => rt(T) ? { direction: a.direction, prevScrollTop: I } : { direction: I < a.prevScrollTop ? ae : oe, prevScrollTop: I },
        { direction: oe, prevScrollTop: 0 }
      ),
      k((a) => a.direction)
    ),
    g
  ), F(x(o, Gt(50), Ft(Ao)), g);
  const f = C(0);
  return F(
    x(
      h,
      P((a) => !a),
      Ft(0)
    ),
    f
  ), F(
    x(
      r,
      Gt(100),
      $(h),
      P(([a, I]) => I),
      Lt(([a, I], [b]) => [I, b], [0, 0]),
      k(([a, I]) => I - a)
    ),
    f
  ), {
    atBottomState: w,
    atBottomStateChange: u,
    atBottomThreshold: m,
    atTopStateChange: d,
    atTopThreshold: S,
    isAtBottom: i,
    isAtTop: l,
    isScrolling: h,
    lastJumpDueToItemResize: R,
    scrollDirection: g,
    scrollVelocity: f
  };
}, tt(It)), de = "top", fe = "bottom", hn = "none";
function gn(t, e, n) {
  return typeof t == "number" ? n === ae && e === de || n === oe && e === fe ? t : 0 : n === ae ? e === de ? t.main : t.reverse : e === fe ? t.main : t.reverse;
}
function In(t, e) {
  var n;
  return typeof t == "number" ? t : (n = t[e]) != null ? n : 0;
}
const je = K(
  ([{ deviation: t, fixedHeaderHeight: e, headerHeight: n, scrollTop: o, viewportHeight: r }]) => {
    const s = U(), i = C(0), l = C(0), u = C(0), d = ht(
      x(
        ut(
          V(o),
          V(r),
          V(n),
          V(s, ce),
          V(u),
          V(i),
          V(e),
          V(t),
          V(l)
        ),
        k(
          ([
            m,
            S,
            h,
            [T, w],
            R,
            g,
            f,
            a,
            I
          ]) => {
            const b = m - a, y = g + f, z = Math.max(h - b, 0);
            let c = hn;
            const p = In(I, de), v = In(I, fe);
            return T -= a, T += h + f, w += h + f, w -= a, T > m + y - p && (c = ae), w < m - z + S + v && (c = oe), c !== hn ? [
              Math.max(b - h - gn(R, de, c) - p, 0),
              b - z - f + S + gn(R, fe, c) + v
            ] : null;
          }
        ),
        P((m) => m != null),
        J(ce)
      ),
      [0, 0]
    );
    return {
      increaseViewportBy: l,
      // input
      listBoundary: s,
      overscan: u,
      topListHeight: i,
      // output
      visibleRange: d
    };
  },
  tt(It),
  { singleton: !0 }
);
function No(t, e, n) {
  if (be(e)) {
    const o = _n(t, e);
    return [
      { index: kt(e.groupOffsetTree, o)[0], offset: 0, size: 0 },
      { data: n == null ? void 0 : n[0], index: o, offset: 0, size: 0 }
    ];
  }
  return [{ data: n == null ? void 0 : n[0], index: t, offset: 0, size: 0 }];
}
const Be = {
  bottom: 0,
  firstItemIndex: 0,
  items: [],
  offsetBottom: 0,
  offsetTop: 0,
  top: 0,
  topItems: [],
  topListHeight: 0,
  totalCount: 0
};
function Te(t, e, n, o, r, s) {
  const { lastIndex: i, lastOffset: l, lastSize: u } = r;
  let d = 0, m = 0;
  if (t.length > 0) {
    d = t[0].offset;
    const R = t[t.length - 1];
    m = R.offset + R.size;
  }
  const S = n - i, h = l + S * u + (S - 1) * o, T = d, w = h - m;
  return {
    bottom: m,
    firstItemIndex: s,
    items: xn(t, r, s),
    offsetBottom: w,
    offsetTop: d,
    top: T,
    topItems: xn(e, r, s),
    topListHeight: e.reduce((R, g) => g.size + R, 0),
    totalCount: n
  };
}
function Kn(t, e, n, o, r, s) {
  let i = 0;
  if (n.groupIndices.length > 0)
    for (const m of n.groupIndices) {
      if (m - i >= t)
        break;
      i++;
    }
  const l = t + i, u = Ke(e, l), d = Array.from({ length: l }).map((m, S) => ({
    data: s[S + u],
    index: S + u,
    offset: 0,
    size: 0
  }));
  return Te(d, [], l, r, n, o);
}
function xn(t, e, n) {
  if (t.length === 0)
    return [];
  if (!be(e))
    return t.map((d) => ({ ...d, index: d.index + n, originalIndex: d.index }));
  const o = t[0].index, r = t[t.length - 1].index, s = [], i = Xt(e.groupOffsetTree, o, r);
  let l, u = 0;
  for (const d of t) {
    (!l || l.end < d.index) && (l = i.shift(), u = e.groupIndices.indexOf(l.start));
    let m;
    d.index === l.start ? m = {
      index: u,
      type: "group"
    } : m = {
      groupIndex: u,
      index: d.index - (u + 1) + n
    }, s.push({
      ...m,
      data: d.data,
      offset: d.offset,
      originalIndex: d.index,
      size: d.size
    });
  }
  return s;
}
function Sn(t, e) {
  var n;
  return t === void 0 ? 0 : typeof t == "number" ? t : (n = t[e]) != null ? n : 0;
}
const jt = K(
  ([
    { data: t, firstItemIndex: e, gap: n, sizes: o, totalCount: r },
    s,
    { listBoundary: i, topListHeight: l, visibleRange: u },
    { initialTopMostItemIndex: d, scrolledToInitialItem: m },
    { topListHeight: S },
    h,
    { didMount: T },
    { recalcInProgress: w }
  ]) => {
    const R = C([]), g = C(0), f = U(), a = C(0);
    F(s.topItemsIndexes, R);
    const I = ht(
      x(
        ut(
          T,
          w,
          V(u, ce),
          V(r),
          V(o),
          V(d),
          m,
          V(R),
          V(e),
          V(n),
          V(a),
          t
        ),
        P(([c, p, , v, , , , , , , , O]) => {
          const B = O && O.length !== v;
          return c && !p && !B;
        }),
        k(
          ([
            ,
            ,
            [c, p],
            v,
            O,
            B,
            W,
            _,
            j,
            L,
            xt,
            M
          ]) => {
            var q, at, gt, Tt;
            const et = O, { offsetTree: wt, sizeTree: ft } = et, St = rt(g);
            if (v === 0)
              return { ...Be, totalCount: v };
            if (c === 0 && p === 0)
              return St === 0 ? { ...Be, totalCount: v } : Kn(St, B, O, j, L, M || []);
            if (X(ft))
              return St > 0 ? null : Te(
                No(Ke(B, v), et, M),
                [],
                v,
                L,
                et,
                j
              );
            const Mt = [];
            if (_.length > 0) {
              const st = _[0], it = _[_.length - 1];
              let mt = 0;
              for (const lt of Xt(ft, st, it)) {
                const Z = lt.value, nt = Math.max(lt.start, st), vt = Math.min(lt.end, it);
                for (let ct = nt; ct <= vt; ct++)
                  Mt.push({ data: M == null ? void 0 : M[ct], index: ct, offset: mt, size: Z }), mt += Z;
              }
            }
            if (!W)
              return Te([], Mt, v, L, et, j);
            const pt = _.length > 0 ? _[_.length - 1] + 1 : 0, qt = ko(wt, c, p, pt);
            if (qt.length === 0)
              return null;
            const ee = v - 1, Ot = ye([], (st) => {
              for (const it of qt) {
                const mt = it.value;
                let lt = mt.offset, Z = it.start;
                const nt = mt.size;
                if (mt.offset < c) {
                  Z += Math.floor((c - mt.offset + L) / (nt + L));
                  const ct = Z - it.start;
                  lt += ct * nt + ct * L;
                }
                Z < pt && (lt += (pt - Z) * nt, Z = pt);
                const vt = Math.min(it.end, ee);
                for (let ct = Z; ct <= vt && !(lt >= p); ct++)
                  st.push({ data: M == null ? void 0 : M[ct], index: ct, offset: lt, size: nt }), lt += nt + L;
              }
            }), ne = Sn(xt, de), H = Sn(xt, fe);
            if (Ot.length > 0 && (ne > 0 || H > 0)) {
              const st = Ot[0], it = Ot[Ot.length - 1];
              if (ne > 0 && st.index > pt) {
                const mt = Math.min(ne, st.index - pt), lt = [];
                let Z = st.offset;
                for (let nt = st.index - 1; nt >= st.index - mt; nt--) {
                  const ct = (at = (q = Xt(ft, nt, nt)[0]) == null ? void 0 : q.value) != null ? at : st.size;
                  Z -= ct + L, lt.unshift({ data: M == null ? void 0 : M[nt], index: nt, offset: Z, size: ct });
                }
                Ot.unshift(...lt);
              }
              if (H > 0 && it.index < ee) {
                const mt = Math.min(H, ee - it.index);
                let lt = it.offset + it.size + L;
                for (let Z = it.index + 1; Z <= it.index + mt; Z++) {
                  const vt = (Tt = (gt = Xt(ft, Z, Z)[0]) == null ? void 0 : gt.value) != null ? Tt : it.size;
                  Ot.push({ data: M == null ? void 0 : M[Z], index: Z, offset: lt, size: vt }), lt += vt + L;
                }
              }
            }
            return Te(Ot, Mt, v, L, et, j);
          }
        ),
        //@ts-expect-error filter needs to be fixed
        P((c) => c !== null),
        J()
      ),
      Be
    );
    F(
      x(
        t,
        P(Ae),
        k((c) => c == null ? void 0 : c.length)
      ),
      r
    ), F(
      x(
        I,
        k((c) => c.topListHeight)
      ),
      S
    ), F(S, l), F(
      x(
        I,
        k((c) => [c.top, c.bottom])
      ),
      i
    ), F(
      x(
        I,
        k((c) => c.items)
      ),
      f
    );
    const b = bt(
      x(
        I,
        P(({ items: c }) => c.length > 0),
        $(r, t),
        P(([{ items: c }, p]) => c[c.length - 1].originalIndex === p - 1),
        k(([, c, p]) => [c - 1, p]),
        J(ce),
        k(([c]) => c)
      )
    ), y = bt(
      x(
        I,
        Gt(200),
        P(({ items: c, topItems: p }) => c.length > 0 && c[0].originalIndex === p.length),
        k(({ items: c }) => c[0].index),
        J()
      )
    ), z = bt(
      x(
        I,
        P(({ items: c }) => c.length > 0),
        k(({ items: c }) => {
          let p = 0, v = c.length - 1;
          for (; c[p].type === "group" && p < v; )
            p++;
          for (; c[v].type === "group" && v > p; )
            v--;
          return {
            endIndex: c[v].index,
            startIndex: c[p].index
          };
        }),
        J(An)
      )
    );
    return {
      endReached: b,
      initialItemCount: g,
      itemsRendered: f,
      listState: I,
      minOverscanItemCount: a,
      rangeChanged: z,
      startReached: y,
      topItemsIndexes: R,
      ...h
    };
  },
  tt(
    Pt,
    Dn,
    je,
    pe,
    me,
    he,
    _t,
    De
  ),
  { singleton: !0 }
), jn = K(
  ([{ fixedFooterHeight: t, fixedHeaderHeight: e, footerHeight: n, headerHeight: o }, { listState: r }]) => {
    const s = U(), i = ht(
      x(
        ut(n, t, o, e, r),
        k(([l, u, d, m, S]) => l + u + d + m + S.offsetBottom + S.bottom)
      ),
      0
    );
    return F(V(i), s), { totalListHeight: i, totalListHeightChanged: s };
  },
  tt(It, jt),
  { singleton: !0 }
), Do = K(
  ([{ viewportHeight: t }, { totalListHeight: e }]) => {
    const n = C(!1), o = ht(
      x(
        ut(n, t, e),
        P(([r]) => r),
        k(([, r, s]) => Math.max(0, r - s)),
        Gt(0),
        J()
      ),
      0
    );
    return { alignToBottom: n, paddingTopAddition: o };
  },
  tt(It, jn),
  { singleton: !0 }
), qn = K(() => ({
  context: C(null)
})), $o = ({
  itemBottom: t,
  itemTop: e,
  locationParams: { align: n, behavior: o, ...r },
  viewportBottom: s,
  viewportTop: i
}) => e < i ? { ...r, align: n != null ? n : "start", behavior: o } : t > s ? { ...r, align: n != null ? n : "end", behavior: o } : null, Yn = K(
  ([
    { gap: t, sizes: e, totalCount: n },
    { fixedFooterHeight: o, fixedHeaderHeight: r, headerHeight: s, scrollingInProgress: i, scrollTop: l, viewportHeight: u },
    { scrollToIndex: d }
  ]) => {
    const m = U();
    return F(
      x(
        m,
        $(e, u, n, s, r, o, l),
        $(t),
        k(([[S, h, T, w, R, g, f, a], I]) => {
          const { align: b, behavior: y, calculateViewLocation: z = $o, done: c, ...p } = S, v = Nn(S, h, w - 1), O = ue(v, h.offsetTree, I) + R + g, B = O + kt(h.sizeTree, v)[1], W = a + g, _ = a + T - f, j = z({
            itemBottom: B,
            itemTop: O,
            locationParams: { align: b, behavior: y, ...p },
            viewportBottom: _,
            viewportTop: W
          });
          return j ? c && Et(
            x(
              i,
              P((L) => !L),
              // skips the initial publish of false, and the cleanup call.
              // but if scrollingInProgress is true, we skip the initial publish.
              Kt(rt(i) ? 1 : 2)
            ),
            c
          ) : c == null || c(), j;
        }),
        P((S) => S !== null)
      ),
      d
    ), {
      scrollIntoView: m
    };
  },
  tt(Pt, It, me, jt, Wt),
  { singleton: !0 }
);
function Tn(t) {
  return t ? t === "smooth" ? "smooth" : "auto" : !1;
}
const Uo = (t, e) => typeof t == "function" ? Tn(t(e)) : e && Tn(t), Ko = K(
  ([
    { listRefresh: t, totalCount: e, fixedItemSize: n, data: o },
    { atBottomState: r, isAtBottom: s },
    { scrollToIndex: i },
    { scrolledToInitialItem: l },
    { didMount: u, propsReady: d },
    { log: m },
    { scrollingInProgress: S },
    { context: h },
    { scrollIntoView: T }
  ]) => {
    const w = C(!1), R = U();
    let g = null;
    function f(y) {
      D(i, {
        align: "end",
        behavior: y,
        index: "LAST"
      });
    }
    Y(
      x(
        ut(x(V(e), Kt(1)), u),
        $(V(w), s, l, S),
        k(([[y, z], c, p, v, O]) => {
          let B = z && v, W = "auto";
          return B && (W = Uo(c, p || O), B = B && !!W), { followOutputBehavior: W, shouldFollow: B, totalCount: y };
        }),
        P(({ shouldFollow: y }) => y)
      ),
      ({ followOutputBehavior: y, totalCount: z }) => {
        g && (g(), g = null), rt(n) ? requestAnimationFrame(() => {
          rt(m)("following output to ", { totalCount: z }, Ct.DEBUG), f(y);
        }) : g = Et(t, () => {
          rt(m)("following output to ", { totalCount: z }, Ct.DEBUG), f(y), g = null;
        });
      }
    );
    function a(y) {
      const z = Et(r, (c) => {
        y && !c.atBottom && c.notAtBottomBecause === "SIZE_INCREASED" && !g && (rt(m)("scrolling to bottom due to increased size", {}, Ct.DEBUG), f("auto"));
      });
      setTimeout(z, 100);
    }
    Y(
      x(
        ut(V(w), e, d),
        P(([y, , z]) => y && z),
        Lt(
          ({ value: y }, [, z]) => ({ refreshed: y === z, value: z }),
          { refreshed: !1, value: 0 }
        ),
        P(({ refreshed: y }) => y),
        $(w, e)
      ),
      ([, y]) => {
        rt(l) && a(y !== !1);
      }
    ), Y(R, () => {
      a(rt(w) !== !1);
    }), Y(ut(V(w), r), ([y, z]) => {
      y && !z.atBottom && z.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && f("auto");
    });
    const I = C(null), b = U();
    return F(
      Fe(
        x(
          V(o),
          k((y) => {
            var z;
            return (z = y == null ? void 0 : y.length) != null ? z : 0;
          })
        ),
        x(V(e))
      ),
      b
    ), Y(
      x(
        ut(x(b, Kt(1)), u),
        $(V(I), l, S, h),
        k(([[y, z], c, p, v, O]) => z && p && (c == null ? void 0 : c({ context: O, totalCount: y, scrollingInProgress: v }))),
        P((y) => !!y),
        Gt(0)
      ),
      (y) => {
        g && (g(), g = null), rt(n) ? requestAnimationFrame(() => {
          rt(m)("scrolling into view", {}), D(T, y);
        }) : g = Et(t, () => {
          rt(m)("scrolling into view", {}), D(T, y), g = null;
        });
      }
    ), { autoscrollToBottom: R, followOutput: w, scrollIntoViewOnChange: I };
  },
  tt(
    Pt,
    he,
    me,
    pe,
    _t,
    Wt,
    It,
    qn,
    Yn
  )
), jo = K(
  ([{ data: t, firstItemIndex: e, gap: n, sizes: o }, { initialTopMostItemIndex: r }, { initialItemCount: s, listState: i }, { didMount: l }]) => (F(
    x(
      l,
      $(s),
      P(([, u]) => u !== 0),
      $(r, o, e, n, t),
      k(([[, u], d, m, S, h, T = []]) => Kn(u, d, m, S, h, T))
    ),
    i
  ), {}),
  tt(Pt, pe, jt, _t),
  { singleton: !0 }
), qo = K(
  ([{ didMount: t }, { scrollTo: e }, { listState: n }]) => {
    const o = C(0);
    return Y(
      x(
        t,
        $(o),
        P(([, r]) => r !== 0),
        k(([, r]) => ({ top: r }))
      ),
      (r) => {
        Et(
          x(
            n,
            Kt(1),
            P((s) => s.items.length > 1)
          ),
          () => {
            requestAnimationFrame(() => {
              D(e, r);
            });
          }
        );
      }
    ), {
      initialScrollTop: o
    };
  },
  tt(_t, It, jt),
  { singleton: !0 }
), Zn = K(
  ([{ scrollVelocity: t }]) => {
    const e = C(!1), n = U(), o = C(!1);
    return F(
      x(
        t,
        $(o, e, n),
        P(([r, s]) => !!s),
        k(([r, s, i, l]) => {
          const { enter: u, exit: d } = s;
          if (i) {
            if (d(r, l))
              return !1;
          } else if (u(r, l))
            return !0;
          return i;
        }),
        J()
      ),
      e
    ), Y(
      x(ut(e, t, n), $(o)),
      ([[r, s, i], l]) => {
        r && l && l.change && l.change(s, i);
      }
    ), { isSeeking: e, scrollSeekConfiguration: o, scrollSeekRangeChanged: n, scrollVelocity: t };
  },
  tt(he),
  { singleton: !0 }
), qe = K(([{ scrollContainerState: t, scrollTo: e }]) => {
  const n = U(), o = U(), r = U(), s = C(!1), i = C(void 0);
  return F(
    x(
      ut(n, o),
      k(([{ scrollHeight: l, scrollTop: u, viewportHeight: d }, { offsetTop: m }]) => ({
        scrollHeight: l,
        scrollTop: Math.max(0, u - m),
        viewportHeight: d
      }))
    ),
    t
  ), F(
    x(
      e,
      $(o),
      k(([l, { offsetTop: u }]) => ({
        ...l,
        top: l.top + u
      }))
    ),
    r
  ), {
    customScrollParent: i,
    // config
    useWindowScroll: s,
    // input
    windowScrollContainerState: n,
    // signals
    windowScrollTo: r,
    windowViewportRect: o
  };
}, tt(It)), Yo = K(
  ([
    { sizeRanges: t, sizes: e },
    { headerHeight: n, scrollTop: o },
    { initialTopMostItemIndex: r },
    { didMount: s },
    { useWindowScroll: i, windowScrollContainerState: l, windowViewportRect: u }
  ]) => {
    const d = U(), m = C(void 0), S = C(null), h = C(null);
    return F(l, S), F(u, h), Y(
      x(
        d,
        $(e, o, i, S, h, n)
      ),
      ([T, w, R, g, f, a, I]) => {
        const b = Oo(w.sizeTree);
        g && f !== null && a !== null && (R = f.scrollTop - a.offsetTop), R -= I, T({ ranges: b, scrollTop: R });
      }
    ), F(x(m, P(Ae), k(Zo)), r), F(
      x(
        s,
        $(m),
        P(([, T]) => T !== void 0),
        J(),
        k(([, T]) => T.ranges)
      ),
      t
    ), {
      getState: d,
      restoreStateFrom: m
    };
  },
  tt(Pt, It, pe, _t, qe)
);
function Zo(t) {
  return { align: "start", index: 0, offset: t.scrollTop };
}
const Xo = K(([{ topItemsIndexes: t }]) => {
  const e = C(0);
  return F(
    x(
      e,
      P((n) => n >= 0),
      k((n) => Array.from({ length: n }).map((o, r) => r))
    ),
    t
  ), { topItemCount: e };
}, tt(jt));
function Xn(t) {
  let e = !1, n;
  return (() => (e || (e = !0, n = t()), n));
}
const Jo = Xn(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), Qo = K(
  ([
    { deviation: t, scrollBy: e, scrollingInProgress: n, scrollTop: o },
    { isAtBottom: r, isScrolling: s, lastJumpDueToItemResize: i, scrollDirection: l },
    { listState: u },
    { beforeUnshiftWith: d, gap: m, shiftWithOffset: S, sizes: h },
    { log: T },
    { recalcInProgress: w }
  ]) => {
    const R = bt(
      x(
        u,
        $(i),
        Lt(
          ([, f, a, I], [{ bottom: b, items: y, offsetBottom: z, totalCount: c }, p]) => {
            const v = b + z;
            let O = 0;
            return a === c && f.length > 0 && y.length > 0 && (y[0].originalIndex === 0 && f[0].originalIndex === 0 || (O = v - I, O !== 0 && (O += p))), [O, y, c, v];
          },
          [0, [], 0, 0]
        ),
        P(([f]) => f !== 0),
        $(o, l, n, r, T, w),
        P(([, f, a, I, , , b]) => !b && !I && f !== 0 && a === ae),
        k(([[f], , , , , a]) => (a("Upward scrolling compensation", { amount: f }, Ct.DEBUG), f))
      )
    );
    function g(f) {
      f > 0 ? (D(e, { behavior: "auto", top: -f }), D(t, 0)) : (D(t, 0), D(e, { behavior: "auto", top: -f }));
    }
    return Y(x(R, $(t, s)), ([f, a, I]) => {
      I && Jo() ? D(t, a - f) : g(-f);
    }), Y(
      x(
        ut(ht(s, !1), t, w),
        P(([f, a, I]) => !f && !I && a !== 0),
        k(([f, a]) => a),
        Gt(1)
      ),
      g
    ), F(
      x(
        S,
        k((f) => ({ top: -f }))
      ),
      e
    ), Y(
      x(
        d,
        $(h, m),
        k(([f, { groupIndices: a, lastSize: I, sizeTree: b }, y]) => {
          function z(c) {
            return c * (I + y);
          }
          if (a.length === 0)
            return z(f);
          {
            let c = 0;
            const p = le(b, 0);
            let v = 0, O = 0;
            for (; v < f; ) {
              v++, c += p;
              let B = a.length === O + 1 ? 1 / 0 : a[O + 1] - a[O] - 1;
              v + B > f && (c -= p, B = f - v + 1), v += B, c += z(B), O++;
            }
            return c;
          }
        })
      ),
      (f) => {
        D(t, f), requestAnimationFrame(() => {
          D(e, { top: f }), requestAnimationFrame(() => {
            D(t, 0), D(w, !1);
          });
        });
      }
    ), { deviation: t };
  },
  tt(It, he, jt, Pt, Wt, De)
), tr = K(
  ([
    t,
    e,
    n,
    o,
    r,
    s,
    i,
    l,
    u,
    d,
    m
  ]) => ({
    ...t,
    ...e,
    ...n,
    ...o,
    ...r,
    ...s,
    ...i,
    ...l,
    ...u,
    ...d,
    ...m
  }),
  tt(
    je,
    jo,
    _t,
    Zn,
    jn,
    qo,
    Do,
    qe,
    Yn,
    Wt,
    qn
  )
), Jn = K(
  ([
    {
      data: t,
      defaultItemSize: e,
      firstItemIndex: n,
      fixedItemSize: o,
      fixedGroupSize: r,
      gap: s,
      groupIndices: i,
      heightEstimates: l,
      itemSize: u,
      sizeRanges: d,
      sizes: m,
      statefulTotalCount: S,
      totalCount: h,
      trackItemSizes: T
    },
    { initialItemFinalLocationReached: w, initialTopMostItemIndex: R, scrolledToInitialItem: g },
    f,
    a,
    I,
    b,
    { scrollToIndex: y },
    z,
    { topItemCount: c },
    { groupCounts: p },
    v
  ]) => {
    const { listState: O, minOverscanItemCount: B, topItemsIndexes: W, rangeChanged: _, ...j } = b;
    return F(_, v.scrollSeekRangeChanged), F(
      x(
        v.windowViewportRect,
        k((L) => L.visibleHeight)
      ),
      f.viewportHeight
    ), {
      data: t,
      defaultItemHeight: e,
      firstItemIndex: n,
      fixedItemHeight: o,
      fixedGroupHeight: r,
      gap: s,
      groupCounts: p,
      heightEstimates: l,
      initialItemFinalLocationReached: w,
      initialTopMostItemIndex: R,
      scrolledToInitialItem: g,
      sizeRanges: d,
      topItemCount: c,
      topItemsIndexes: W,
      // input
      totalCount: h,
      ...I,
      groupIndices: i,
      itemSize: u,
      listState: O,
      minOverscanItemCount: B,
      scrollToIndex: y,
      // output
      statefulTotalCount: S,
      trackItemSizes: T,
      // exported from stateFlagsSystem
      rangeChanged: _,
      ...j,
      // the bag of IO from featureGroup1System
      ...v,
      ...f,
      sizes: m,
      ...a
    };
  },
  tt(
    Pt,
    pe,
    It,
    Yo,
    Ko,
    jt,
    me,
    Qo,
    Xo,
    Dn,
    tr
  )
);
function er(t, e) {
  const n = {}, o = {};
  let r = 0;
  const s = t.length;
  for (; r < s; )
    o[t[r]] = 1, r += 1;
  for (const i in e)
    Object.hasOwn(o, i) || (n[i] = e[i]);
  return n;
}
const Ie = typeof document < "u" ? react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_1__.useEffect;
function Ye(t, e, n) {
  const o = Object.keys(e.required || {}), r = Object.keys(e.optional || {}), s = Object.keys(e.methods || {}), i = Object.keys(e.events || {}), l = react__WEBPACK_IMPORTED_MODULE_1__.createContext({});
  function u(f, a) {
    f.propsReady && D(f.propsReady, !1);
    for (const I of o) {
      const b = f[e.required[I]];
      D(b, a[I]);
    }
    for (const I of r)
      if (I in a) {
        const b = f[e.optional[I]];
        D(b, a[I]);
      }
    f.propsReady && D(f.propsReady, !0);
  }
  function d(f) {
    return s.reduce((a, I) => (a[I] = (b) => {
      const y = f[e.methods[I]];
      D(y, b);
    }, a), {});
  }
  function m(f) {
    return i.reduce((a, I) => (a[I] = xo(f[e.events[I]]), a), {});
  }
  const S = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((f, a) => {
    const { children: I, ...b } = f, [y] = react__WEBPACK_IMPORTED_MODULE_1__.useState(() => ye(To(t), (p) => {
      u(p, b);
    })), [z] = react__WEBPACK_IMPORTED_MODULE_1__.useState(an(m, y));
    Ie(() => {
      for (const p of i)
        p in b && Y(z[p], b[p]);
      return () => {
        Object.values(z).map(We);
      };
    }, [b, z, y]), Ie(() => {
      u(y, b);
    }), react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle(a, un(d(y)));
    const c = n;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(l.Provider, { value: y, children: n ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(c, { ...er([...o, ...r, ...i], b), children: I }) : I });
  }), h = (f) => {
    const a = react__WEBPACK_IMPORTED_MODULE_1__.useContext(l);
    return react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
      (I) => {
        D(a[f], I);
      },
      [a, f]
    );
  }, T = (f) => {
    const I = react__WEBPACK_IMPORTED_MODULE_1__.useContext(l)[f], b = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
      (y) => Y(I, y),
      [I]
    );
    return react__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore(
      b,
      () => rt(I),
      () => rt(I)
    );
  }, w = (f) => {
    const I = react__WEBPACK_IMPORTED_MODULE_1__.useContext(l)[f], [b, y] = react__WEBPACK_IMPORTED_MODULE_1__.useState(an(rt, I));
    return Ie(
      () => Y(I, (z) => {
        z !== b && y(un(z));
      }),
      [I, b]
    ), b;
  }, R = react__WEBPACK_IMPORTED_MODULE_1__.version.startsWith("18") ? T : w;
  return {
    Component: S,
    useEmitter: (f, a) => {
      const b = react__WEBPACK_IMPORTED_MODULE_1__.useContext(l)[f];
      Ie(() => Y(b, a), [a, b]);
    },
    useEmitterValue: R,
    usePublisher: h
  };
}
const Re = react__WEBPACK_IMPORTED_MODULE_1__.createContext(void 0), Qn = react__WEBPACK_IMPORTED_MODULE_1__.createContext(void 0), to = typeof document < "u" ? react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_1__.useEffect;
function ke(t) {
  return "self" in t;
}
function nr(t) {
  return "body" in t;
}
function eo(t, e, n, o = Qt, r, s) {
  const i = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null), l = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null), u = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null), d = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (h) => {
      let T, w, R;
      const g = h.target;
      if (nr(g) || ke(g)) {
        const a = ke(g) ? g : g.defaultView;
        R = s ? a.scrollX : a.scrollY, T = s ? a.document.documentElement.scrollWidth : a.document.documentElement.scrollHeight, w = s ? a.innerWidth : a.innerHeight;
      } else
        R = s ? g.scrollLeft : g.scrollTop, T = s ? g.scrollWidth : g.scrollHeight, w = s ? g.offsetWidth : g.offsetHeight;
      const f = () => {
        t({
          scrollHeight: T,
          scrollTop: Math.max(R, 0),
          viewportHeight: w
        });
      };
      h.suppressFlushSync ? f() : react_dom__WEBPACK_IMPORTED_MODULE_2__.flushSync(f), l.current !== null && (R === l.current || R <= 0 || R === T - w) && (l.current = null, e(!0), u.current && (clearTimeout(u.current), u.current = null));
    },
    [t, e, s]
  );
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    const h = r || i.current;
    return o(r || i.current), d({ suppressFlushSync: !0, target: h }), h.addEventListener("scroll", d, { passive: !0 }), () => {
      o(null), h.removeEventListener("scroll", d);
    };
  }, [i, d, n, o, r]);
  function m(h) {
    const T = i.current;
    if (!T || (s ? "offsetWidth" in T && T.offsetWidth === 0 : "offsetHeight" in T && T.offsetHeight === 0))
      return;
    const w = h.behavior === "smooth";
    let R, g, f;
    ke(T) ? (g = Math.max(
      zt(T.document.documentElement, s ? "width" : "height"),
      s ? T.document.documentElement.scrollWidth : T.document.documentElement.scrollHeight
    ), R = s ? T.innerWidth : T.innerHeight, f = s ? window.scrollX : window.scrollY) : (g = T[s ? "scrollWidth" : "scrollHeight"], R = zt(T, s ? "width" : "height"), f = T[s ? "scrollLeft" : "scrollTop"]);
    const a = g - R;
    if (h.top = Math.ceil(Math.max(Math.min(a, h.top), 0)), Un(R, g) || h.top === f) {
      t({ scrollHeight: g, scrollTop: f, viewportHeight: R }), w && e(!0);
      return;
    }
    w ? (l.current = h.top, u.current && clearTimeout(u.current), u.current = setTimeout(() => {
      u.current = null, l.current = null, e(!0);
    }, 1e3)) : l.current = null, s && (h = { behavior: h.behavior, left: h.top }), T.scrollTo(h);
  }
  function S(h) {
    s && (h = { behavior: h.behavior, left: h.top }), i.current.scrollBy(h);
  }
  return { scrollByCallback: S, scrollerRef: i, scrollToCallback: m };
}
const ze = "-webkit-sticky", Cn = "sticky", Ze = Xn(() => {
  if (typeof document > "u")
    return Cn;
  const t = document.createElement("div");
  return t.style.position = ze, t.style.position === ze ? ze : Cn;
});
function Xe(t) {
  return t;
}
const or = /* @__PURE__ */ K(() => {
  const t = C((l) => `Item ${l}`), e = C((l) => `Group ${l}`), n = C({}), o = C(Xe), r = C("div"), s = C(Qt), i = (l, u = null) => ht(
    x(
      n,
      k((d) => d[l]),
      J()
    ),
    u
  );
  return {
    components: n,
    computeItemKey: o,
    EmptyPlaceholder: i("EmptyPlaceholder"),
    FooterComponent: i("Footer"),
    GroupComponent: i("Group", "div"),
    groupContent: e,
    HeaderComponent: i("Header"),
    HeaderFooterTag: r,
    ItemComponent: i("Item", "div"),
    itemContent: t,
    ListComponent: i("List", "div"),
    ScrollerComponent: i("Scroller", "div"),
    scrollerRef: s,
    ScrollSeekPlaceholder: i("ScrollSeekPlaceholder"),
    TopItemListComponent: i("TopItemList")
  };
}), rr = /* @__PURE__ */ K(
  ([t, e]) => ({ ...t, ...e }),
  tt(Jn, or)
), sr = ({ height: t }) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { height: t } }), ir = { overflowAnchor: "none", position: Ze(), zIndex: 1 }, no = { overflowAnchor: "none" }, lr = { ...no, display: "inline-block", height: "100%" }, wn = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function({ showTopList: e = !1 }) {
  const n = A("listState"), o = Rt("sizeRanges"), r = A("useWindowScroll"), s = A("customScrollParent"), i = Rt("windowScrollContainerState"), l = Rt("scrollContainerState"), u = s || r ? i : l, d = A("itemContent"), m = A("context"), S = A("groupContent"), h = A("trackItemSizes"), T = A("itemSize"), w = A("log"), R = Rt("gap"), g = A("horizontalDirection"), { callbackRef: f } = Fn(
    o,
    T,
    h,
    e ? Qt : u,
    w,
    R,
    s,
    g,
    A("skipAnimationFrameInResizeObserver")
  ), [a, I] = react__WEBPACK_IMPORTED_MODULE_1__.useState(0);
  tn("deviation", (L) => {
    a !== L && I(L);
  });
  const b = A("EmptyPlaceholder"), y = A("ScrollSeekPlaceholder") || sr, z = A("ListComponent"), c = A("ItemComponent"), p = A("GroupComponent"), v = A("computeItemKey"), O = A("isSeeking"), B = A("groupIndices").length > 0, W = A("alignToBottom"), _ = A("initialItemFinalLocationReached"), j = e ? {} : {
    boxSizing: "border-box",
    ...g ? {
      display: "inline-block",
      height: "100%",
      marginLeft: a !== 0 ? a : W ? "auto" : 0,
      paddingLeft: n.offsetTop,
      paddingRight: n.offsetBottom,
      whiteSpace: "nowrap"
    } : {
      marginTop: a !== 0 ? a : W ? "auto" : 0,
      paddingBottom: n.offsetBottom,
      paddingTop: n.offsetTop
    },
    ..._ ? {} : { visibility: "hidden" }
  };
  return !e && n.totalCount === 0 && b ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(b, { ...Q(b, m) }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    z,
    {
      ...Q(z, m),
      "data-testid": e ? "virtuoso-top-item-list" : "virtuoso-item-list",
      ref: f,
      style: j,
      children: (e ? n.topItems : n.items).map((L) => {
        const xt = L.originalIndex, M = v(xt + n.firstItemIndex, L.data, m);
        return O ? /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
          y,
          {
            ...Q(y, m),
            height: L.size,
            index: L.index,
            key: M,
            type: L.type || "item",
            ...L.type === "group" ? {} : { groupIndex: L.groupIndex }
          }
        ) : L.type === "group" ? /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
          p,
          {
            ...Q(p, m),
            "data-index": xt,
            "data-item-index": L.index,
            "data-known-size": L.size,
            key: M,
            style: ir
          },
          S(L.index, m)
        ) : /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
          c,
          {
            ...Q(c, m),
            ...oo(c, L.data),
            "data-index": xt,
            "data-item-group-index": L.groupIndex,
            "data-item-index": L.index,
            "data-known-size": L.size,
            key: M,
            style: g ? lr : no
          },
          B ? d(L.index, L.groupIndex, L.data, m) : d(L.index, L.data, m)
        );
      })
    }
  );
}), cr = {
  height: "100%",
  outline: "none",
  overflowY: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch"
}, ur = {
  outline: "none",
  overflowX: "auto",
  position: "relative"
}, te = (t) => ({
  height: "100%",
  position: "absolute",
  top: 0,
  width: "100%",
  ...t ? { display: "flex", flexDirection: "column" } : {}
}), ar = {
  position: Ze(),
  top: 0,
  width: "100%",
  zIndex: 1
};
function Q(t, e) {
  if (typeof t != "string")
    return { context: e };
}
function oo(t, e) {
  return { item: typeof t == "string" ? void 0 : e };
}
const dr = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function() {
  const e = A("HeaderComponent"), n = Rt("headerHeight"), o = A("HeaderFooterTag"), r = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
      () => (i) => {
        n(zt(i, "height"));
      },
      [n]
    ),
    !0,
    A("skipAnimationFrameInResizeObserver")
  ), s = A("context");
  return e ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(o, { ref: r, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(e, { ...Q(e, s) }) }) : null;
}), fr = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function() {
  const e = A("FooterComponent"), n = Rt("footerHeight"), o = A("HeaderFooterTag"), r = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
      () => (i) => {
        n(zt(i, "height"));
      },
      [n]
    ),
    !0,
    A("skipAnimationFrameInResizeObserver")
  ), s = A("context");
  return e ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(o, { ref: r, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(e, { ...Q(e, s) }) }) : null;
});
function Je({ useEmitter: t, useEmitterValue: e, usePublisher: n }) {
  return react__WEBPACK_IMPORTED_MODULE_1__.memo(function({ children: s, style: i, context: l, ...u }) {
    const d = n("scrollContainerState"), m = e("ScrollerComponent"), S = n("smoothScrollTargetReached"), h = e("scrollerRef"), T = e("horizontalDirection") || !1, { scrollByCallback: w, scrollerRef: R, scrollToCallback: g } = eo(
      d,
      S,
      m,
      h,
      void 0,
      T
    );
    return t("scrollTo", g), t("scrollBy", w), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      m,
      {
        "data-testid": "virtuoso-scroller",
        "data-virtuoso-scroller": !0,
        ref: R,
        style: { ...T ? ur : cr, ...i },
        tabIndex: 0,
        ...u,
        ...Q(m, l),
        children: s
      }
    );
  });
}
function Qe({ useEmitter: t, useEmitterValue: e, usePublisher: n }) {
  return react__WEBPACK_IMPORTED_MODULE_1__.memo(function({ children: s, style: i, context: l, ...u }) {
    const d = n("windowScrollContainerState"), m = e("ScrollerComponent"), S = n("smoothScrollTargetReached"), h = e("totalListHeight"), T = e("deviation"), w = e("customScrollParent"), R = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null), g = e("scrollerRef"), { scrollByCallback: f, scrollerRef: a, scrollToCallback: I } = eo(
      d,
      S,
      m,
      g,
      w
    );
    return to(() => {
      var b;
      return a.current = w || ((b = R.current) == null ? void 0 : b.ownerDocument.defaultView), () => {
        a.current = null;
      };
    }, [a, w]), t("windowScrollTo", I), t("scrollBy", f), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      m,
      {
        ref: R,
        "data-virtuoso-scroller": !0,
        style: { position: "relative", ...i, ...h !== 0 ? { height: h + T } : {} },
        ...u,
        ...Q(m, l),
        children: s
      }
    );
  });
}
const mr = ({ children: t }) => {
  const e = react__WEBPACK_IMPORTED_MODULE_1__.useContext(Re), n = Rt("viewportHeight"), o = Rt("fixedItemHeight"), r = A("alignToBottom"), s = A("horizontalDirection"), i = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
    () => se(n, (u) => zt(u, s ? "width" : "height")),
    [n, s]
  ), l = Vt(i, !0, A("skipAnimationFrameInResizeObserver"));
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    e && (n(e.viewportHeight), o(e.itemHeight));
  }, [e, n, o]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { "data-viewport-type": "element", ref: l, style: te(r), children: t });
}, pr = ({ children: t }) => {
  const e = react__WEBPACK_IMPORTED_MODULE_1__.useContext(Re), n = Rt("windowViewportRect"), o = Rt("fixedItemHeight"), r = A("customScrollParent"), s = Ne(
    n,
    r,
    A("skipAnimationFrameInResizeObserver")
  ), i = A("alignToBottom");
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    e && (o(e.itemHeight), n({ offsetTop: 0, visibleHeight: e.viewportHeight, visibleWidth: 100 }));
  }, [e, n, o]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { "data-viewport-type": "window", ref: s, style: te(i), children: t });
}, hr = ({ children: t }) => {
  const e = A("TopItemListComponent") || "div", n = A("headerHeight"), o = { ...ar, marginTop: `${n}px` }, r = A("context");
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(e, { style: o, ...Q(e, r), children: t });
}, gr = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function(e) {
  const n = A("useWindowScroll"), o = A("topItemsIndexes").length > 0, r = A("customScrollParent"), s = A("context");
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(r || n ? xr : Ir, { ...e, context: s, children: [
    o && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(hr, { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(wn, { showTopList: !0 }) }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(r || n ? pr : mr, { children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(dr, {}),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(wn, {}),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(fr, {})
    ] })
  ] });
}), {
  Component: ro,
  useEmitter: tn,
  useEmitterValue: A,
  usePublisher: Rt
} = /* @__PURE__ */ Ye(
  rr,
  {
    required: {},
    optional: {
      restoreStateFrom: "restoreStateFrom",
      context: "context",
      followOutput: "followOutput",
      scrollIntoViewOnChange: "scrollIntoViewOnChange",
      itemContent: "itemContent",
      groupContent: "groupContent",
      overscan: "overscan",
      increaseViewportBy: "increaseViewportBy",
      minOverscanItemCount: "minOverscanItemCount",
      totalCount: "totalCount",
      groupCounts: "groupCounts",
      topItemCount: "topItemCount",
      firstItemIndex: "firstItemIndex",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      components: "components",
      atBottomThreshold: "atBottomThreshold",
      atTopThreshold: "atTopThreshold",
      computeItemKey: "computeItemKey",
      defaultItemHeight: "defaultItemHeight",
      fixedGroupHeight: "fixedGroupHeight",
      // Must be set above 'fixedItemHeight'
      fixedItemHeight: "fixedItemHeight",
      heightEstimates: "heightEstimates",
      itemSize: "itemSize",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "HeaderFooterTag",
      data: "data",
      initialItemCount: "initialItemCount",
      initialScrollTop: "initialScrollTop",
      alignToBottom: "alignToBottom",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      horizontalDirection: "horizontalDirection",
      skipAnimationFrameInResizeObserver: "skipAnimationFrameInResizeObserver"
    },
    methods: {
      scrollToIndex: "scrollToIndex",
      scrollIntoView: "scrollIntoView",
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      autoscrollToBottom: "autoscrollToBottom",
      getState: "getState"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      totalListHeightChanged: "totalListHeightChanged",
      itemsRendered: "itemsRendered",
      groupIndices: "groupIndices"
    }
  },
  gr
), Ir = /* @__PURE__ */ Je({ useEmitter: tn, useEmitterValue: A, usePublisher: Rt }), xr = /* @__PURE__ */ Qe({ useEmitter: tn, useEmitterValue: A, usePublisher: Rt }), Yr = ro, Zr = ro, Sr = /* @__PURE__ */ K(() => {
  const t = C((d) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", { children: [
    "Item $",
    d
  ] })), e = C(null), n = C((d) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", { colSpan: 1e3, children: [
    "Group ",
    d
  ] })), o = C(null), r = C(null), s = C({}), i = C(Xe), l = C(Qt), u = (d, m = null) => ht(
    x(
      s,
      k((S) => S[d]),
      J()
    ),
    m
  );
  return {
    components: s,
    computeItemKey: i,
    context: e,
    EmptyPlaceholder: u("EmptyPlaceholder"),
    FillerRow: u("FillerRow"),
    fixedFooterContent: r,
    fixedHeaderContent: o,
    itemContent: t,
    groupContent: n,
    ScrollerComponent: u("Scroller", "div"),
    scrollerRef: l,
    ScrollSeekPlaceholder: u("ScrollSeekPlaceholder"),
    TableBodyComponent: u("TableBody", "tbody"),
    TableComponent: u("Table", "table"),
    TableFooterComponent: u("TableFoot", "tfoot"),
    TableHeadComponent: u("TableHead", "thead"),
    TableRowComponent: u("TableRow", "tr"),
    GroupComponent: u("Group", "tr")
  };
}), Tr = /* @__PURE__ */ K(
  ([t, e]) => ({ ...t, ...e }),
  tt(Jn, Sr)
), Cr = ({ height: t }) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", { style: { height: t } }) }), wr = ({ height: t }) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", { style: { border: 0, height: t, padding: 0 } }) }), vr = { overflowAnchor: "none" }, vn = { position: Ze(), zIndex: 2, overflowAnchor: "none" }, yn = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function({ showTopList: e = !1 }) {
  const n = N("listState"), o = N("computeItemKey"), r = N("firstItemIndex"), s = N("context"), i = N("isSeeking"), l = N("fixedHeaderHeight"), u = N("groupIndices").length > 0, d = N("itemContent"), m = N("groupContent"), S = N("ScrollSeekPlaceholder") || Cr, h = N("GroupComponent"), T = N("TableRowComponent"), w = (e ? n.topItems : []).reduce((g, f, a) => (a === 0 ? g.push(f.size) : g.push(g[a - 1] + f.size), g), []), R = (e ? n.topItems : n.items).map((g) => {
    const f = g.originalIndex, a = o(f + r, g.data, s), I = e ? f === 0 ? 0 : w[f - 1] : 0;
    return i ? /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
      S,
      {
        ...Q(S, s),
        height: g.size,
        index: g.index,
        key: a,
        type: g.type || "item"
      }
    ) : g.type === "group" ? /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
      h,
      {
        ...Q(h, s),
        "data-index": f,
        "data-item-index": g.index,
        "data-known-size": g.size,
        key: a,
        style: {
          ...vn,
          top: l
        }
      },
      m(g.index, s)
    ) : /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
      T,
      {
        ...Q(T, s),
        ...oo(T, g.data),
        "data-index": f,
        "data-item-index": g.index,
        "data-known-size": g.size,
        "data-item-group-index": g.groupIndex,
        key: a,
        style: e ? { ...vn, top: l + I } : vr
      },
      u ? d(g.index, g.groupIndex, g.data, s) : d(g.index, g.data, s)
    );
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: R });
}), yr = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function() {
  const e = N("listState"), n = N("topItemsIndexes").length > 0, o = Bt("sizeRanges"), r = N("useWindowScroll"), s = N("customScrollParent"), i = Bt("windowScrollContainerState"), l = Bt("scrollContainerState"), u = s || r ? i : l, d = N("trackItemSizes"), m = N("itemSize"), S = N("log"), { callbackRef: h, ref: T } = Fn(
    o,
    m,
    d,
    u,
    S,
    void 0,
    s,
    !1,
    N("skipAnimationFrameInResizeObserver")
  ), [w, R] = react__WEBPACK_IMPORTED_MODULE_1__.useState(0);
  en("deviation", (B) => {
    w !== B && (T.current.style.marginTop = `${B}px`, R(B));
  });
  const g = N("EmptyPlaceholder"), f = N("FillerRow") || wr, a = N("TableBodyComponent"), I = N("paddingTopAddition"), b = N("statefulTotalCount"), y = N("context");
  if (b === 0 && g)
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(g, { ...Q(g, y) });
  const z = (n ? e.topItems : []).reduce((B, W) => B + W.size, 0), c = e.offsetTop + I + w - z, p = e.offsetBottom, v = c > 0 ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(f, { context: y, height: c }, "padding-top") : null, O = p > 0 ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(f, { context: y, height: p }, "padding-bottom") : null;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(a, { "data-testid": "virtuoso-item-list", ref: h, ...Q(a, y), children: [
    v,
    n && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(yn, { showTopList: !0 }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(yn, {}),
    O
  ] });
}), br = ({ children: t }) => {
  const e = react__WEBPACK_IMPORTED_MODULE_1__.useContext(Re), n = Bt("viewportHeight"), o = Bt("fixedItemHeight"), r = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => se(n, (s) => zt(s, "height")), [n]),
    !0,
    N("skipAnimationFrameInResizeObserver")
  );
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    e && (n(e.viewportHeight), o(e.itemHeight));
  }, [e, n, o]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { "data-viewport-type": "element", ref: r, style: te(!1), children: t });
}, Rr = ({ children: t }) => {
  const e = react__WEBPACK_IMPORTED_MODULE_1__.useContext(Re), n = Bt("windowViewportRect"), o = Bt("fixedItemHeight"), r = N("customScrollParent"), s = Ne(
    n,
    r,
    N("skipAnimationFrameInResizeObserver")
  );
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    e && (o(e.itemHeight), n({ offsetTop: 0, visibleHeight: e.viewportHeight, visibleWidth: 100 }));
  }, [e, n, o]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { "data-viewport-type": "window", ref: s, style: te(!1), children: t });
}, Hr = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function(e) {
  const n = N("useWindowScroll"), o = N("customScrollParent"), r = Bt("fixedHeaderHeight"), s = Bt("fixedFooterHeight"), i = N("fixedHeaderContent"), l = N("fixedFooterContent"), u = N("context"), d = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => se(r, (a) => zt(a, "height")), [r]),
    !0,
    N("skipAnimationFrameInResizeObserver")
  ), m = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => se(s, (a) => zt(a, "height")), [s]),
    !0,
    N("skipAnimationFrameInResizeObserver")
  ), S = o || n ? Br : Er, h = o || n ? Rr : br, T = N("TableComponent"), w = N("TableHeadComponent"), R = N("TableFooterComponent"), g = i ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    w,
    {
      ref: d,
      style: { position: "sticky", top: 0, zIndex: 2 },
      ...Q(w, u),
      children: i()
    },
    "TableHead"
  ) : null, f = l ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    R,
    {
      ref: m,
      style: { bottom: 0, position: "sticky", zIndex: 1 },
      ...Q(R, u),
      children: l()
    },
    "TableFoot"
  ) : null;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(S, { ...e, ...Q(S, u), children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(h, { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(T, { style: { borderSpacing: 0, overflowAnchor: "none" }, ...Q(T, u), children: [
    g,
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(yr, {}, "TableBody"),
    f
  ] }) }) });
}), {
  Component: so,
  useEmitter: en,
  useEmitterValue: N,
  usePublisher: Bt
} = /* @__PURE__ */ Ye(
  Tr,
  {
    required: {},
    optional: {
      restoreStateFrom: "restoreStateFrom",
      context: "context",
      followOutput: "followOutput",
      firstItemIndex: "firstItemIndex",
      itemContent: "itemContent",
      groupContent: "groupContent",
      fixedHeaderContent: "fixedHeaderContent",
      fixedFooterContent: "fixedFooterContent",
      overscan: "overscan",
      increaseViewportBy: "increaseViewportBy",
      minOverscanItemCount: "minOverscanItemCount",
      totalCount: "totalCount",
      topItemCount: "topItemCount",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      components: "components",
      groupCounts: "groupCounts",
      atBottomThreshold: "atBottomThreshold",
      atTopThreshold: "atTopThreshold",
      computeItemKey: "computeItemKey",
      defaultItemHeight: "defaultItemHeight",
      fixedGroupHeight: "fixedGroupHeight",
      // Must be set above 'fixedItemHeight'
      fixedItemHeight: "fixedItemHeight",
      itemSize: "itemSize",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      data: "data",
      initialItemCount: "initialItemCount",
      initialScrollTop: "initialScrollTop",
      alignToBottom: "alignToBottom",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel"
    },
    methods: {
      scrollToIndex: "scrollToIndex",
      scrollIntoView: "scrollIntoView",
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      getState: "getState"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      totalListHeightChanged: "totalListHeightChanged",
      itemsRendered: "itemsRendered",
      groupIndices: "groupIndices"
    }
  },
  Hr
), Er = /* @__PURE__ */ Je({ useEmitter: en, useEmitterValue: N, usePublisher: Bt }), Br = /* @__PURE__ */ Qe({ useEmitter: en, useEmitterValue: N, usePublisher: Bt }), Xr = so, Jr = so, bn = {
  bottom: 0,
  itemHeight: 0,
  items: [],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, kr = {
  bottom: 0,
  itemHeight: 0,
  items: [{ index: 0 }],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, { ceil: Rn, floor: we, max: re, min: Oe, round: Hn } = Math;
function En(t, e, n) {
  return Array.from({ length: e - t + 1 }).map((o, r) => ({ data: n === null ? null : n[r + t], index: r + t }));
}
function zr(t) {
  return {
    ...kr,
    items: t
  };
}
function xe(t, e) {
  return t && t.width === e.width && t.height === e.height;
}
function Or(t, e) {
  return t && t.column === e.column && t.row === e.row;
}
const Fr = /* @__PURE__ */ K(
  ([
    { increaseViewportBy: t, listBoundary: e, overscan: n, visibleRange: o },
    { footerHeight: r, headerHeight: s, scrollBy: i, scrollContainerState: l, scrollTo: u, scrollTop: d, smoothScrollTargetReached: m, viewportHeight: S },
    h,
    T,
    { didMount: w, propsReady: R },
    { customScrollParent: g, useWindowScroll: f, windowScrollContainerState: a, windowScrollTo: I, windowViewportRect: b },
    y
  ]) => {
    const z = C(0), c = C(0), p = C(bn), v = C({ height: 0, width: 0 }), O = C({ height: 0, width: 0 }), B = U(), W = U(), _ = C(0), j = C(null), L = C({ column: 0, row: 0 }), xt = U(), M = U(), et = C(!1), wt = C(0), ft = C(!0), St = C(!1), Mt = C(!1);
    Y(
      x(
        w,
        $(wt),
        P(([H, q]) => !!q)
      ),
      () => {
        D(ft, !1);
      }
    ), Y(
      x(
        ut(w, ft, O, v, wt, St),
        P(([H, q, at, gt, , Tt]) => H && !q && at.height !== 0 && gt.height !== 0 && !Tt)
      ),
      ([, , , , H]) => {
        D(St, !0), Ue(1, () => {
          D(B, H);
        }), Et(x(d), () => {
          D(e, [0, 0]), D(ft, !0);
        });
      }
    ), F(
      x(
        M,
        P((H) => H != null && H.scrollTop > 0),
        Ft(0)
      ),
      c
    ), Y(
      x(
        w,
        $(M),
        P(([, H]) => H != null)
      ),
      ([, H]) => {
        H && (D(v, H.viewport), D(O, H.item), D(L, H.gap), H.scrollTop > 0 && (D(et, !0), Et(x(d, Kt(1)), (q) => {
          D(et, !1);
        }), D(u, { top: H.scrollTop })));
      }
    ), F(
      x(
        v,
        k(({ height: H }) => H)
      ),
      S
    ), F(
      x(
        ut(
          V(v, xe),
          V(O, xe),
          V(L, (H, q) => H && H.column === q.column && H.row === q.row),
          V(d)
        ),
        k(([H, q, at, gt]) => ({
          gap: at,
          item: q,
          scrollTop: gt,
          viewport: H
        }))
      ),
      xt
    ), F(
      x(
        ut(
          V(z),
          o,
          V(L, Or),
          V(O, xe),
          V(v, xe),
          V(j),
          V(c),
          V(et),
          V(ft),
          V(wt)
        ),
        P(([, , , , , , , H]) => !H),
        k(
          ([
            H,
            [q, at],
            gt,
            Tt,
            st,
            it,
            mt,
            ,
            lt,
            Z
          ]) => {
            const { column: nt, row: vt } = gt, { height: ct, width: He } = Tt, { width: nn } = st;
            if (mt === 0 && (H === 0 || nn === 0))
              return bn;
            if (He === 0) {
              const cn = Ke(Z, H), uo = cn + Math.max(mt - 1, 0);
              return zr(En(cn, uo, it));
            }
            const ge = io(nn, He, nt);
            let Yt, Nt;
            lt ? q === 0 && at === 0 && mt > 0 ? (Yt = 0, Nt = mt - 1) : (Yt = ge * we((q + vt) / (ct + vt)), Nt = ge * Rn((at + vt) / (ct + vt)) - 1, Nt = Oe(H - 1, re(Nt, ge - 1)), Yt = Oe(Nt, re(0, Yt))) : (Yt = 0, Nt = -1);
            const on = En(Yt, Nt, it), { bottom: rn, top: sn } = Bn(st, gt, Tt, on), ln = Rn(H / ge), co = ln * ct + (ln - 1) * vt - rn;
            return { bottom: rn, itemHeight: ct, items: on, itemWidth: He, offsetBottom: co, offsetTop: sn, top: sn };
          }
        )
      ),
      p
    ), F(
      x(
        j,
        P((H) => H !== null),
        k((H) => H.length)
      ),
      z
    ), F(
      x(
        ut(v, O, p, L),
        P(([H, q, { items: at }]) => at.length > 0 && q.height !== 0 && H.height !== 0),
        k(([H, q, { items: at }, gt]) => {
          const { bottom: Tt, top: st } = Bn(H, gt, q, at);
          return [st, Tt];
        }),
        J(ce)
      ),
      e
    );
    const pt = C(!1);
    F(
      x(
        d,
        $(pt),
        k(([H, q]) => q || H !== 0)
      ),
      pt
    );
    const qt = bt(
      x(
        ut(p, z),
        P(([{ items: H }]) => H.length > 0),
        $(pt),
        P(([[H, q], at]) => {
          const Tt = H.items[H.items.length - 1].index === q - 1;
          return (at || H.bottom > 0 && H.itemHeight > 0 && H.offsetBottom === 0 && H.items.length === q) && Tt;
        }),
        k(([[, H]]) => H - 1),
        J()
      )
    ), ee = bt(
      x(
        V(p),
        P(({ items: H }) => H.length > 0 && H[0].index === 0),
        Ft(0),
        J()
      )
    ), Ot = bt(
      x(
        V(p),
        $(et),
        P(([{ items: H }, q]) => H.length > 0 && !q),
        k(([{ items: H }]) => ({
          endIndex: H[H.length - 1].index,
          startIndex: H[0].index
        })),
        J(An),
        Gt(0)
      )
    );
    F(Ot, T.scrollSeekRangeChanged), F(
      x(
        B,
        $(v, O, z, L),
        k(([H, q, at, gt, Tt]) => {
          const st = $n(H), { align: it, behavior: mt, offset: lt } = st;
          let Z = st.index;
          Z === "LAST" && (Z = gt - 1), Z = re(0, Z, Oe(gt - 1, Z));
          let nt = Me(q, Tt, at, Z);
          return it === "end" ? nt = Hn(nt - q.height + at.height) : it === "center" && (nt = Hn(nt - q.height / 2 + at.height / 2)), lt && (nt += lt), { behavior: mt, top: nt };
        })
      ),
      u
    );
    const ne = ht(
      x(
        p,
        k((H) => H.offsetBottom + H.bottom)
      ),
      0
    );
    return F(
      x(
        b,
        k((H) => ({ height: H.visibleHeight, width: H.visibleWidth }))
      ),
      v
    ), {
      customScrollParent: g,
      // input
      data: j,
      deviation: _,
      footerHeight: r,
      gap: L,
      headerHeight: s,
      increaseViewportBy: t,
      initialItemCount: c,
      itemDimensions: O,
      overscan: n,
      restoreStateFrom: M,
      scrollBy: i,
      scrollContainerState: l,
      scrollHeight: W,
      scrollTo: u,
      scrollToIndex: B,
      scrollTop: d,
      smoothScrollTargetReached: m,
      totalCount: z,
      useWindowScroll: f,
      viewportDimensions: v,
      windowScrollContainerState: a,
      windowScrollTo: I,
      windowViewportRect: b,
      ...T,
      // output
      gridState: p,
      horizontalDirection: Mt,
      initialTopMostItemIndex: wt,
      totalListHeight: ne,
      ...h,
      endReached: qt,
      propsReady: R,
      rangeChanged: Ot,
      startReached: ee,
      stateChanged: xt,
      stateRestoreInProgress: et,
      ...y
    };
  },
  tt(je, It, he, Zn, _t, qe, Wt)
);
function io(t, e, n) {
  return re(1, we((t + n) / (we(e) + n)));
}
function Bn(t, e, n, o) {
  const { height: r } = n;
  if (r === void 0 || o.length === 0)
    return { bottom: 0, top: 0 };
  const s = Me(t, e, n, o[0].index);
  return { bottom: Me(t, e, n, o[o.length - 1].index) + r, top: s };
}
function Me(t, e, n, o) {
  const r = io(t.width, n.width, e.column), s = we(o / r), i = s * n.height + re(0, s - 1) * e.row;
  return i > 0 ? i + e.row : i;
}
const Lr = /* @__PURE__ */ K(() => {
  const t = C((S) => `Item ${S}`), e = C({}), n = C(null), o = C("virtuoso-grid-item"), r = C("virtuoso-grid-list"), s = C(Xe), i = C("div"), l = C(Qt), u = (S, h = null) => ht(
    x(
      e,
      k((T) => T[S]),
      J()
    ),
    h
  ), d = C(!1), m = C(!1);
  return F(V(m), d), {
    components: e,
    computeItemKey: s,
    context: n,
    FooterComponent: u("Footer"),
    HeaderComponent: u("Header"),
    headerFooterTag: i,
    itemClassName: o,
    ItemComponent: u("Item", "div"),
    itemContent: t,
    listClassName: r,
    ListComponent: u("List", "div"),
    readyStateChanged: d,
    reportReadyState: m,
    ScrollerComponent: u("Scroller", "div"),
    scrollerRef: l,
    ScrollSeekPlaceholder: u("ScrollSeekPlaceholder", "div")
  };
}), Vr = /* @__PURE__ */ K(
  ([t, e]) => ({ ...t, ...e }),
  tt(Fr, Lr)
), Pr = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function() {
  const e = ot("gridState"), n = ot("listClassName"), o = ot("itemClassName"), r = ot("itemContent"), s = ot("computeItemKey"), i = ot("isSeeking"), l = Ht("scrollHeight"), u = ot("ItemComponent"), d = ot("ListComponent"), m = ot("ScrollSeekPlaceholder"), S = ot("context"), h = Ht("itemDimensions"), T = Ht("gap"), w = ot("log"), R = ot("stateRestoreInProgress"), g = Ht("reportReadyState"), f = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
      () => (a) => {
        const I = a.parentElement.parentElement.scrollHeight;
        l(I);
        const b = a.firstChild;
        if (b) {
          const { height: y, width: z } = b.getBoundingClientRect();
          h({ height: y, width: z });
        }
        T({
          column: kn("column-gap", getComputedStyle(a).columnGap, w),
          row: kn("row-gap", getComputedStyle(a).rowGap, w)
        });
      },
      [l, h, T, w]
    ),
    !0,
    !1
  );
  return to(() => {
    e.itemHeight > 0 && e.itemWidth > 0 && g(!0);
  }, [e]), R ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    d,
    {
      className: n,
      ref: f,
      ...Q(d, S),
      "data-testid": "virtuoso-item-list",
      style: { paddingBottom: e.offsetBottom, paddingTop: e.offsetTop },
      children: e.items.map((a) => {
        const I = s(a.index, a.data, S);
        return i ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          m,
          {
            ...Q(m, S),
            height: e.itemHeight,
            index: a.index,
            width: e.itemWidth
          },
          I
        ) : /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
          u,
          {
            ...Q(u, S),
            className: o,
            "data-index": a.index,
            key: I
          },
          r(a.index, a.data, S)
        );
      })
    }
  );
}), Gr = react__WEBPACK_IMPORTED_MODULE_1__.memo(function() {
  const e = ot("HeaderComponent"), n = Ht("headerHeight"), o = ot("headerFooterTag"), r = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
      () => (i) => {
        n(zt(i, "height"));
      },
      [n]
    ),
    !0,
    !1
  ), s = ot("context");
  return e ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(o, { ref: r, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(e, { ...Q(e, s) }) }) : null;
}), Mr = react__WEBPACK_IMPORTED_MODULE_1__.memo(function() {
  const e = ot("FooterComponent"), n = Ht("footerHeight"), o = ot("headerFooterTag"), r = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
      () => (i) => {
        n(zt(i, "height"));
      },
      [n]
    ),
    !0,
    !1
  ), s = ot("context");
  return e ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(o, { ref: r, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(e, { ...Q(e, s) }) }) : null;
}), Ar = ({ children: t }) => {
  const e = react__WEBPACK_IMPORTED_MODULE_1__.useContext(Qn), n = Ht("itemDimensions"), o = Ht("viewportDimensions"), r = Vt(
    react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
      () => (s) => {
        o(s.getBoundingClientRect());
      },
      [o]
    ),
    !0,
    !1
  );
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    e && (o({ height: e.viewportHeight, width: e.viewportWidth }), n({ height: e.itemHeight, width: e.itemWidth }));
  }, [e, o, n]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { ref: r, style: te(!1), children: t });
}, Wr = ({ children: t }) => {
  const e = react__WEBPACK_IMPORTED_MODULE_1__.useContext(Qn), n = Ht("windowViewportRect"), o = Ht("itemDimensions"), r = ot("customScrollParent"), s = Ne(n, r, !1);
  return react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    e && (o({ height: e.itemHeight, width: e.itemWidth }), n({ offsetTop: 0, visibleHeight: e.viewportHeight, visibleWidth: e.viewportWidth }));
  }, [e, n, o]), /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { ref: s, style: te(!1), children: t });
}, _r = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_1__.memo(function({ ...e }) {
  const n = ot("useWindowScroll"), o = ot("customScrollParent"), r = o || n ? $r : Dr, s = o || n ? Wr : Ar, i = ot("context");
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(r, { ...e, ...Q(r, i), children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(s, { children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Gr, {}),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Pr, {}),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Mr, {})
  ] }) });
}), {
  Component: Nr,
  useEmitter: lo,
  useEmitterValue: ot,
  usePublisher: Ht
} = /* @__PURE__ */ Ye(
  Vr,
  {
    optional: {
      context: "context",
      totalCount: "totalCount",
      overscan: "overscan",
      itemContent: "itemContent",
      components: "components",
      computeItemKey: "computeItemKey",
      data: "data",
      initialItemCount: "initialItemCount",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "headerFooterTag",
      listClassName: "listClassName",
      itemClassName: "itemClassName",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      restoreStateFrom: "restoreStateFrom",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      increaseViewportBy: "increaseViewportBy"
    },
    methods: {
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      scrollToIndex: "scrollToIndex"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      stateChanged: "stateChanged",
      readyStateChanged: "readyStateChanged"
    }
  },
  _r
), Dr = /* @__PURE__ */ Je({ useEmitter: lo, useEmitterValue: ot, usePublisher: Ht }), $r = /* @__PURE__ */ Qe({ useEmitter: lo, useEmitterValue: ot, usePublisher: Ht });
function kn(t, e, n) {
  return e !== "normal" && !(e != null && e.endsWith("px")) && n(`${t} was not resolved to pixel value correctly`, e, Ct.WARN), e === "normal" ? 0 : parseInt(e != null ? e : "0", 10);
}
const Qr = Nr;



/***/ },

/***/ "./node_modules/stylis/src/Enum.js"
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHARSET: () => (/* binding */ CHARSET),
/* harmony export */   COMMENT: () => (/* binding */ COMMENT),
/* harmony export */   COUNTER_STYLE: () => (/* binding */ COUNTER_STYLE),
/* harmony export */   DECLARATION: () => (/* binding */ DECLARATION),
/* harmony export */   DOCUMENT: () => (/* binding */ DOCUMENT),
/* harmony export */   FONT_FACE: () => (/* binding */ FONT_FACE),
/* harmony export */   FONT_FEATURE_VALUES: () => (/* binding */ FONT_FEATURE_VALUES),
/* harmony export */   IMPORT: () => (/* binding */ IMPORT),
/* harmony export */   KEYFRAMES: () => (/* binding */ KEYFRAMES),
/* harmony export */   LAYER: () => (/* binding */ LAYER),
/* harmony export */   MEDIA: () => (/* binding */ MEDIA),
/* harmony export */   MOZ: () => (/* binding */ MOZ),
/* harmony export */   MS: () => (/* binding */ MS),
/* harmony export */   NAMESPACE: () => (/* binding */ NAMESPACE),
/* harmony export */   PAGE: () => (/* binding */ PAGE),
/* harmony export */   RULESET: () => (/* binding */ RULESET),
/* harmony export */   SUPPORTS: () => (/* binding */ SUPPORTS),
/* harmony export */   VIEWPORT: () => (/* binding */ VIEWPORT),
/* harmony export */   WEBKIT: () => (/* binding */ WEBKIT)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'
var LAYER = '@layer'


/***/ },

/***/ "./node_modules/stylis/src/Middleware.js"
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   middleware: () => (/* binding */ middleware),
/* harmony export */   namespace: () => (/* binding */ namespace),
/* harmony export */   prefixer: () => (/* binding */ prefixer),
/* harmony export */   rulesheet: () => (/* binding */ rulesheet)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
  var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(collection)

  return function (element, index, children, callback) {
    var output = ''

    for (var i = 0; i < length; i++)
      output += collection[i](element, index, children, callback) || ''

    return output
  }
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
  return function (element) {
    if (!element.root)
      if (element = element.return)
        callback(element)
  }
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
  if (element.length > -1)
    if (!element.return)
      switch (element.type) {
        case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_4__.prefix)(element.value, element.length, children)
          return
        case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.KEYFRAMES:
          return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT)})], callback)
        case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.RULESET:
          if (element.length)
            return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.combine)(element.props, function (value) {
              switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(value, /(::plac\w+|:read-\w+)/)) {
                // :read-(only|write)
                case ':read-only': case ':read-write':
                  return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MOZ + '$1')]})], callback)
                // :placeholder
                case '::placeholder':
                  return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
                    (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + 'input-$1')]}),
                    (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MOZ + '$1')]}),
                    (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'input-$1')]})
                  ], callback)
              }

              return ''
            })
      }
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
  switch (element.type) {
    case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.RULESET:
      element.props = element.props.map(function (value) {
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.tokenize)(value), function (value, index, children) {
          switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, 0)) {
            // \f
            case 12:
              return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(value))
            // \0 ( + > ~
            case 0: case 40: case 43: case 62: case 126:
              return value
            // :
            case 58:
              if (children[++index] === 'global')
                children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(children[index], index = 1, -1)
            // \s
            case 32:
              return index === 1 ? '' : value
            default:
              switch (index) {
                case 0: element = value
                  return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(children) > 1 ? '' : value
                case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(children) - 1: case 2:
                  return index === 2 ? value + element + element : value + element
                default:
                  return value
              }
          }
        })
      })
  }
}


/***/ },

/***/ "./node_modules/stylis/src/Parser.js"
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   comment: () => (/* binding */ comment),
/* harmony export */   compile: () => (/* binding */ compile),
/* harmony export */   declaration: () => (/* binding */ declaration),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   ruleset: () => (/* binding */ ruleset)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
  return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0
  var offset = 0
  var length = pseudo
  var atrule = 0
  var property = 0
  var previous = 0
  var variable = 1
  var scanning = 1
  var ampersand = 1
  var character = 0
  var type = ''
  var props = rules
  var children = rulesets
  var reference = rule
  var characters = type

  while (scanning)
    switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.next)()) {
      // (
      case 40:
        if (previous != 108 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, length - 1) == 58) {
          if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.delimit)(character), '&', '&\f'), '&\f') != -1)
            ampersand = -1
          break
        }
      // " ' [
      case 34: case 39: case 91:
        characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.delimit)(character)
        break
      // \t \n \r \s
      case 9: case 10: case 13: case 32:
        characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.whitespace)(previous)
        break
      // \
      case 92:
        characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.caret)() - 1, 7)
        continue
      // /
      case 47:
        switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.peek)()) {
          case 42: case 47:
            ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.caret)()), root, parent), declarations)
            break
          default:
            characters += '/'
        }
        break
      // {
      case 123 * variable:
        points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
      // } ; \0
      case 125 * variable: case 59: case 0:
        switch (character) {
          // \0 }
          case 0: case 125: scanning = 0
          // ;
          case 59 + offset: if (ampersand == -1) characters = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, /\f/g, '')
            if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
              (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
            break
          // @ ;
          case 59: characters += ';'
          // { rule/at-rule
          default:
            ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

            if (character === 123)
              if (offset === 0)
                parse(characters, root, reference, reference, props, rulesets, length, points, children)
              else
                switch (atrule === 99 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, 3) === 110 ? 100 : atrule) {
                  // d l m s
                  case 100: case 108: case 109: case 115:
                    parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
                    break
                  default:
                    parse(characters, reference, reference, reference, [''], children, 0, points, children)
                }
        }

        index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
        break
      // :
      case 58:
        length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
      default:
        if (variable < 1)
          if (character == 123)
            --variable
          else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.prev)() == 125)
            continue

        switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters += '\f', -1)
            break
          // ,
          case 44:
            points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
            break
          // @
          case 64:
            // -
            if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.peek)() === 45)
              characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.next)())

            atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.caret)())), character++
            break
          // -
          case 45:
            if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
              variable = 0
        }
    }

  return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
  var post = offset - 1
  var rule = offset === 0 ? rules : ['']
  var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
      if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
        props[k++] = z

  return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_0__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
  return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
  return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ },

/***/ "./node_modules/stylis/src/Prefixer.js"
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prefix: () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
  switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.hash)(value, length)) {
    // color-adjust
    case 5103:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + 'print-' + value + value
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + value
    // tab-size
    case 4789:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MOZ + value + value
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349: case 4246: case 4810: case 6968: case 2756:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + value + value
    // writing-mode
    case 5936:
      switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
        // vertical-r(l)
        case 108:
          return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
        // horizontal(-)tb
        case 45:
          return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
        // default: fallthrough to below
      }
    // flex, flex-direction, scroll-snap-type, writing-mode
    case 6828: case 4268: case 2903:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + value + value
    // order
    case 6165:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'flex-' + value + value
    // align-items
    case 5187:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'flex-$1$2') + value
    // align-self
    case 5443:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /flex-|-self/g, '') + (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(value, /flex-|baseline/) ? _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'grid-row-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /flex-|-self/g, '') : '') + value
    // align-content
    case 4675:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /align-content|flex-|-self/g, '') + value
    // flex-shrink
    case 5548:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, 'shrink', 'negative') + value
    // flex-basis
    case 5292:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, 'basis', 'preferred-size') + value
    // flex-grow
    case 6060:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, 'grow', 'positive') + value
    // transition
    case 4554:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$2') + value
    // cursor
    case 6187:
      return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$1'), value, '') + value
    // background, background-image
    case 5495: case 3959:
      return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$1' + '$`$1')
    // justify-content
    case 4968:
      return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + value + value
    // justify-self
    case 4200:
      if (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(value, /flex-|baseline/)) return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'grid-column-align' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length) + value
      break
    // grid-template-(columns|rows)
    case 2592: case 3360:
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, 'template-', '') + value
    // grid-(row|column)-start
    case 4384: case 3616:
      if (children && children.some(function (element, index) { return length = index, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(element.props, /grid-\w+-end/) })) {
        return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(value + (children = children[length].value), 'span') ? value : (_Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, '-start', '') + value + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + 'grid-row-span:' + (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(children, 'span') ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(children, /\d+/) : +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(children, /\d+/) - +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(value, /\d+/)) + ';')
      }
      return _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, '-start', '') + value
    // grid-(row|column)-end
    case 4896: case 4128:
      return (children && children.some(function (element) { return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.match)(element.props, /grid-\w+-start/) })) ? value : _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, '-end', '-span'), 'span ', '') + value
    // (margin|padding)-inline-(start|end)
    case 4095: case 3583: case 4068: case 2532:
      return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$1$2') + value
    // (min|max)?(width|height|inline-size|block-size)
    case 8116: case 7059: case 5753: case 5535:
    case 5445: case 5701: case 4933: case 4677:
    case 5533: case 5789: case 5021: case 4765:
      // stretch, max-content, min-content, fill-available
      if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(value) - 1 - length > 6)
        switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, length + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            // -
            if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, length + 4) !== 45)
              break
          // (f)ill-available, (f)it-content
          case 102:
            return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
          // (s)tretch
          case 115:
            return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, 'stretch', 'fill-available'), length, children) + value : value
        }
      break
    // grid-(column|row)
    case 5152: case 5920:
      return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (_Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + a + ':' + b + f) + (c ? (_Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
    // position: sticky
    case 4949:
      // stick(y)?
      if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, length + 6) === 121)
        return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT) + value
      break
    // display: (flex|inline-flex|grid|inline-grid)
    case 6444:
      switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, 14) === 45 ? 18 : 11)) {
        // (inline-)?fle(x)
        case 120:
          return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS + '$2box$3') + value
        // (inline-)?gri(d)
        case 100:
          return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_0__.MS) + value
      }
      break
    // scroll-margin, scroll-margin-(top|right|bottom|left)
    case 5719: case 2647: case 2135: case 3927: case 2391:
      return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(value, 'scroll-', 'scroll-snap-') + value
  }

  return value
}


/***/ },

/***/ "./node_modules/stylis/src/Serializer.js"
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serialize: () => (/* binding */ serialize),
/* harmony export */   stringify: () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
  var output = ''
  var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(children)

  for (var i = 0; i < length; i++)
    output += callback(children[i], i, children, callback) || ''

  return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
  switch (element.type) {
    case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.LAYER: if (element.children.length) break
    case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.DECLARATION: return element.return = element.return || element.value
    case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.COMMENT: return ''
    case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
    case _Enum_js__WEBPACK_IMPORTED_MODULE_0__.RULESET: element.value = element.props.join(',')
  }

  return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ },

/***/ "./node_modules/stylis/src/Tokenizer.js"
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alloc: () => (/* binding */ alloc),
/* harmony export */   caret: () => (/* binding */ caret),
/* harmony export */   char: () => (/* binding */ char),
/* harmony export */   character: () => (/* binding */ character),
/* harmony export */   characters: () => (/* binding */ characters),
/* harmony export */   column: () => (/* binding */ column),
/* harmony export */   commenter: () => (/* binding */ commenter),
/* harmony export */   copy: () => (/* binding */ copy),
/* harmony export */   dealloc: () => (/* binding */ dealloc),
/* harmony export */   delimit: () => (/* binding */ delimit),
/* harmony export */   delimiter: () => (/* binding */ delimiter),
/* harmony export */   escaping: () => (/* binding */ escaping),
/* harmony export */   identifier: () => (/* binding */ identifier),
/* harmony export */   length: () => (/* binding */ length),
/* harmony export */   line: () => (/* binding */ line),
/* harmony export */   next: () => (/* binding */ next),
/* harmony export */   node: () => (/* binding */ node),
/* harmony export */   peek: () => (/* binding */ peek),
/* harmony export */   position: () => (/* binding */ position),
/* harmony export */   prev: () => (/* binding */ prev),
/* harmony export */   slice: () => (/* binding */ slice),
/* harmony export */   token: () => (/* binding */ token),
/* harmony export */   tokenize: () => (/* binding */ tokenize),
/* harmony export */   tokenizer: () => (/* binding */ tokenizer),
/* harmony export */   whitespace: () => (/* binding */ whitespace)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
  return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
  return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
  return character
}

/**
 * @return {number}
 */
function prev () {
  character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

  if (column--, character === 10)
    column = 1, line--

  return character
}

/**
 * @return {number}
 */
function next () {
  character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

  if (column++, character === 10)
    column = 1, line++

  return character
}

/**
 * @return {number}
 */
function peek () {
  return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
  return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
  return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0: case 9: case 10: case 13: case 32:
      return 5
    // ! + , / > @ ~ isolate token
    case 33: case 43: case 44: case 47: case 62: case 64: case 126:
    // ; { } breakpoint token
    case 59: case 123: case 125:
      return 4
    // : accompanied token
    case 58:
      return 3
    // " ' ( [ opening delimit token
    case 34: case 39: case 40: case 91:
      return 2
    // ) ] closing delimit token
    case 41: case 93:
      return 1
  }

  return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
  return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
  return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
  return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
  return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
  while (character = peek())
    if (character < 33)
      next()
    else
      break

  return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
  while (next())
    switch (token(character)) {
      case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
        break
      case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
        break
      default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
    }

  return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
  while (--count && next())
    // not 0-9 A-F a-f
    if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
      break

  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position
      // " '
      case 34: case 39:
        if (type !== 34 && type !== 39)
          delimiter(character)
        break
      // (
      case 40:
        if (type === 41)
          delimiter(type)
        break
      // \
      case 92:
        next()
        break
    }

  return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
  while (next())
    // //
    if (type + character === 47 + 10)
      break
    // /*
    else if (type + character === 42 + 42 && peek() === 47)
      break

  return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
  while (!token(peek()))
    next()

  return slice(index, position)
}


/***/ },

/***/ "./node_modules/stylis/src/Utility.js"
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abs: () => (/* binding */ abs),
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   charat: () => (/* binding */ charat),
/* harmony export */   combine: () => (/* binding */ combine),
/* harmony export */   from: () => (/* binding */ from),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   indexof: () => (/* binding */ indexof),
/* harmony export */   match: () => (/* binding */ match),
/* harmony export */   replace: () => (/* binding */ replace),
/* harmony export */   sizeof: () => (/* binding */ sizeof),
/* harmony export */   strlen: () => (/* binding */ strlen),
/* harmony export */   substr: () => (/* binding */ substr),
/* harmony export */   trim: () => (/* binding */ trim)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
  return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
  return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
  return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
  return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
  return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
  return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
  return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
  return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
  return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
  return array.map(callback).join('')
}


/***/ },

/***/ "./src/font-awesome-classes.json"
/*!***************************************!*\
  !*** ./src/font-awesome-classes.json ***!
  \***************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('["fa-brands fa-adn","fa-brands fa-adversal","fa-brands fa-affiliatetheme","fa-brands fa-airbnb","fa-brands fa-algolia","fa-brands fa-alipay","fa-brands fa-amazon","fa-brands fa-amazon-pay","fa-brands fa-amilia","fa-brands fa-android","fa-brands fa-angellist","fa-brands fa-angrycreative","fa-brands fa-angular","fa-brands fa-apper","fa-brands fa-apple","fa-brands fa-apple-pay","fa-brands fa-app-store","fa-brands fa-app-store-ios","fa-brands fa-artstation","fa-brands fa-asymmetrik","fa-brands fa-atlassian","fa-brands fa-weibo","fa-brands fa-weixin","fa-brands fa-whatsapp","fa-brands fa-whmcs","fa-brands fa-wikipedia-w","fa-brands fa-windows","fa-brands fa-wirsindhandwerk","fa-brands fa-wix","fa-brands fa-wizards-of-the-coast","fa-brands fa-wodu","fa-brands fa-wolf-pack-battalion","fa-brands fa-wordpress","fa-brands fa-wordpress-simple","fa-brands fa-wpbeginner","fa-brands fa-wpexplorer","fa-brands fa-wpforms","fa-brands fa-wpressr","fa-brands fa-xbox","fa-brands fa-xing","fa-brands fa-x-twitter","fa-brands fa-yahoo","fa-brands fa-yammer","fa-brands fa-yandex","fa-brands fa-yandex-international","fa-brands fa-yarn","fa-brands fa-y-combinator","fa-brands fa-yelp","fa-brands fa-yoast","fa-brands fa-youtube","fa-brands fa-zhihu","fa-brands fa-themeisle","fa-brands fa-think-peaks","fa-brands fa-threads","fa-brands fa-tiktok","fa-brands fa-trade-federation","fa-brands fa-trello","fa-brands fa-tumblr","fa-brands fa-twitch","fa-brands fa-twitter","fa-brands fa-typo3","fa-brands fa-uber","fa-brands fa-ubuntu","fa-brands fa-uikit","fa-brands fa-umbraco","fa-brands fa-uncharted","fa-brands fa-uniregistry","fa-brands fa-unity","fa-brands fa-unsplash","fa-brands fa-untappd","fa-brands fa-ups","fa-brands fa-upwork","fa-brands fa-usb","fa-brands fa-usps","fa-brands fa-ussunnah","fa-brands fa-vaadin","fa-brands fa-viacoin","fa-brands fa-viadeo","fa-brands fa-viber","fa-brands fa-vimeo","fa-brands fa-vimeo-v","fa-brands fa-vine","fa-brands fa-vk","fa-brands fa-vnv","fa-brands fa-vuejs","fa-brands fa-watchman-monitoring","fa-brands fa-waze","fa-brands fa-webflow","fa-brands fa-weebly","fa-brands fa-square-odnoklassniki","fa-brands fa-square-pied-piper","fa-brands fa-square-pinterest","fa-brands fa-square-reddit","fa-brands fa-square-snapchat","fa-brands fa-squarespace","fa-brands fa-square-steam","fa-brands fa-square-threads","fa-brands fa-square-tumblr","fa-brands fa-square-twitter","fa-brands fa-square-viadeo","fa-brands fa-square-vimeo","fa-brands fa-square-whatsapp","fa-brands fa-square-xing","fa-brands fa-square-x-twitter","fa-brands fa-square-youtube","fa-brands fa-stack-exchange","fa-brands fa-stack-overflow","fa-brands fa-stackpath","fa-brands fa-staylinked","fa-brands fa-steam","fa-brands fa-steam-symbol","fa-brands fa-sticker-mule","fa-brands fa-strava","fa-brands fa-stripe","fa-brands fa-stripe-s","fa-brands fa-stubber","fa-brands fa-studiovinari","fa-brands fa-stumbleupon","fa-brands fa-stumbleupon-circle","fa-brands fa-superpowers","fa-brands fa-supple","fa-brands fa-suse","fa-brands fa-swift","fa-brands fa-symfony","fa-brands fa-teamspeak","fa-brands fa-telegram","fa-brands fa-tencent-weibo","fa-brands fa-themeco","fa-brands fa-the-red-yeti","fa-brands fa-sellcast","fa-brands fa-sellsy","fa-brands fa-servicestack","fa-brands fa-shirtsinbulk","fa-brands fa-shoelace","fa-brands fa-shopify","fa-brands fa-shopware","fa-brands fa-signal-messenger","fa-brands fa-simplybuilt","fa-brands fa-sistrix","fa-brands fa-sith","fa-brands fa-sitrox","fa-brands fa-sketch","fa-brands fa-skyatlas","fa-brands fa-skype","fa-brands fa-slack","fa-brands fa-slideshare","fa-brands fa-snapchat","fa-brands fa-soundcloud","fa-brands fa-sourcetree","fa-brands fa-space-awesome","fa-brands fa-speakap","fa-brands fa-speaker-deck","fa-brands fa-spotify","fa-brands fa-square-behance","fa-brands fa-square-dribbble","fa-brands fa-square-facebook","fa-brands fa-square-font-awesome","fa-brands fa-square-font-awesome-stroke","fa-brands fa-square-git","fa-brands fa-square-github","fa-brands fa-square-gitlab","fa-brands fa-square-google-plus","fa-brands fa-square-hacker-news","fa-brands fa-square-instagram","fa-brands fa-square-js","fa-brands fa-square-lastfm","fa-brands fa-square-letterboxd","fa-brands fa-pied-piper","fa-brands fa-pied-piper-hat","fa-brands fa-pied-piper-pp","fa-brands fa-pinterest","fa-brands fa-pinterest-p","fa-brands fa-pix","fa-brands fa-pixiv","fa-brands fa-playstation","fa-brands fa-product-hunt","fa-brands fa-pushed","fa-brands fa-python","fa-brands fa-qq","fa-brands fa-quinscape","fa-brands fa-quora","fa-brands fa-raspberry-pi","fa-brands fa-ravelry","fa-brands fa-react","fa-brands fa-reacteurope","fa-brands fa-readme","fa-brands fa-rebel","fa-brands fa-reddit","fa-brands fa-reddit-alien","fa-brands fa-redhat","fa-brands fa-red-river","fa-brands fa-renren","fa-brands fa-replyd","fa-brands fa-researchgate","fa-brands fa-resolving","fa-brands fa-rev","fa-brands fa-rocketchat","fa-brands fa-rockrms","fa-brands fa-r-project","fa-brands fa-rust","fa-brands fa-safari","fa-brands fa-salesforce","fa-brands fa-sass","fa-brands fa-schlix","fa-brands fa-screenpal","fa-brands fa-scribd","fa-brands fa-searchengin","fa-brands fa-mix","fa-brands fa-mixcloud","fa-brands fa-mixer","fa-brands fa-mizuni","fa-brands fa-modx","fa-brands fa-monero","fa-brands fa-napster","fa-brands fa-neos","fa-brands fa-nfc-directional","fa-brands fa-nfc-symbol","fa-brands fa-nimblr","fa-brands fa-node","fa-brands fa-node-js","fa-brands fa-npm","fa-brands fa-ns8","fa-brands fa-nutritionix","fa-brands fa-octopus-deploy","fa-brands fa-odnoklassniki","fa-brands fa-odysee","fa-brands fa-old-republic","fa-brands fa-opencart","fa-brands fa-openid","fa-brands fa-opensuse","fa-brands fa-opera","fa-brands fa-optin-monster","fa-brands fa-orcid","fa-brands fa-osi","fa-brands fa-padlet","fa-brands fa-page4","fa-brands fa-pagelines","fa-brands fa-palfed","fa-brands fa-patreon","fa-brands fa-paypal","fa-brands fa-perbyte","fa-brands fa-periscope","fa-brands fa-phabricator","fa-brands fa-phoenix-framework","fa-brands fa-phoenix-squadron","fa-brands fa-php","fa-brands fa-pied-piper-alt","fa-brands fa-joget","fa-brands fa-joomla","fa-brands fa-js","fa-brands fa-jsfiddle","fa-brands fa-kaggle","fa-brands fa-keybase","fa-brands fa-keycdn","fa-brands fa-kickstarter","fa-brands fa-kickstarter-k","fa-brands fa-korvue","fa-brands fa-laravel","fa-brands fa-lastfm","fa-brands fa-leanpub","fa-brands fa-less","fa-brands fa-letterboxd","fa-brands fa-line","fa-brands fa-linkedin","fa-brands fa-linkedin-in","fa-brands fa-linode","fa-brands fa-linux","fa-brands fa-lyft","fa-brands fa-magento","fa-brands fa-mailchimp","fa-brands fa-mandalorian","fa-brands fa-markdown","fa-brands fa-mastodon","fa-brands fa-maxcdn","fa-brands fa-mdb","fa-brands fa-medapps","fa-brands fa-medium","fa-brands fa-medrt","fa-brands fa-meetup","fa-brands fa-megaport","fa-brands fa-mendeley","fa-brands fa-meta","fa-brands fa-microblog","fa-brands fa-microsoft","fa-brands fa-mintbit","fa-brands fa-google","fa-brands fa-google-plus","fa-brands fa-google-scholar","fa-brands fa-google-wallet","fa-brands fa-gratipay","fa-brands fa-grav","fa-brands fa-gripfire","fa-brands fa-grunt","fa-brands fa-guilded","fa-brands fa-gulp","fa-brands fa-hacker-news","fa-brands fa-hackerrank","fa-brands fa-hashnode","fa-brands fa-hips","fa-brands fa-hire-a-helper","fa-brands fa-hive","fa-brands fa-hooli","fa-brands fa-hornbill","fa-brands fa-hotjar","fa-brands fa-houzz","fa-brands fa-html5","fa-brands fa-hubspot","fa-brands fa-ideal","fa-brands fa-imdb","fa-brands fa-instagram","fa-brands fa-instalod","fa-brands fa-intercom","fa-brands fa-internet-explorer","fa-brands fa-invision","fa-brands fa-ioxhost","fa-brands fa-itch-io","fa-brands fa-itunes","fa-brands fa-itunes-note","fa-brands fa-java","fa-brands fa-jedi-order","fa-brands fa-jenkins","fa-brands fa-jira","fa-brands fa-fedora","fa-brands fa-figma","fa-brands fa-firefox","fa-brands fa-firefox-browser","fa-brands fa-firstdraft","fa-brands fa-first-order","fa-brands fa-first-order-alt","fa-brands fa-flickr","fa-brands fa-flipboard","fa-brands fa-fly","fa-brands fa-font-awesome","fa-brands fa-fonticons","fa-brands fa-fonticons-fi","fa-brands fa-fort-awesome","fa-brands fa-fort-awesome-alt","fa-brands fa-forumbee","fa-brands fa-foursquare","fa-brands fa-freebsd","fa-brands fa-free-code-camp","fa-brands fa-fulcrum","fa-brands fa-galactic-republic","fa-brands fa-galactic-senate","fa-brands fa-get-pocket","fa-brands fa-gg","fa-brands fa-gg-circle","fa-brands fa-git","fa-brands fa-git-alt","fa-brands fa-github","fa-brands fa-github-alt","fa-brands fa-gitkraken","fa-brands fa-gitlab","fa-brands fa-gitter","fa-brands fa-glide","fa-brands fa-glide-g","fa-brands fa-gofore","fa-brands fa-golang","fa-brands fa-goodreads","fa-brands fa-goodreads-g","fa-brands fa-google-drive","fa-brands fa-google-pay","fa-brands fa-google-play","fa-brands fa-google-plus-g","fa-brands fa-dailymotion","fa-brands fa-dashcube","fa-brands fa-debian","fa-brands fa-deezer","fa-brands fa-delicious","fa-brands fa-deploydog","fa-brands fa-deskpro","fa-brands fa-dev","fa-brands fa-deviantart","fa-brands fa-dhl","fa-brands fa-diaspora","fa-brands fa-digg","fa-brands fa-digital-ocean","fa-brands fa-discord","fa-brands fa-discourse","fa-brands fa-dochub","fa-brands fa-docker","fa-brands fa-draft2digital","fa-brands fa-dribbble","fa-brands fa-dropbox","fa-brands fa-drupal","fa-brands fa-dyalog","fa-brands fa-earlybirds","fa-brands fa-ebay","fa-brands fa-edge","fa-brands fa-edge-legacy","fa-brands fa-elementor","fa-brands fa-ello","fa-brands fa-ember","fa-brands fa-empire","fa-brands fa-envira","fa-brands fa-erlang","fa-brands fa-ethereum","fa-brands fa-etsy","fa-brands fa-evernote","fa-brands fa-expeditedssl","fa-brands fa-facebook","fa-brands fa-facebook-f","fa-brands fa-facebook-messenger","fa-brands fa-fantasy-flight-games","fa-brands fa-fedex","fa-brands fa-cc-stripe","fa-brands fa-cc-visa","fa-brands fa-centercode","fa-brands fa-centos","fa-brands fa-chrome","fa-brands fa-chromecast","fa-brands fa-cloudflare","fa-brands fa-cloudscale","fa-brands fa-cloudsmith","fa-brands fa-cloudversify","fa-brands fa-cmplid","fa-brands fa-codepen","fa-brands fa-codiepie","fa-brands fa-confluence","fa-brands fa-connectdevelop","fa-brands fa-contao","fa-brands fa-cotton-bureau","fa-brands fa-cpanel","fa-brands fa-creative-commons","fa-brands fa-creative-commons-by","fa-brands fa-creative-commons-nc","fa-brands fa-creative-commons-nc-eu","fa-brands fa-creative-commons-nc-jp","fa-brands fa-creative-commons-nd","fa-brands fa-creative-commons-pd","fa-brands fa-creative-commons-pd-alt","fa-brands fa-creative-commons-remix","fa-brands fa-creative-commons-sa","fa-brands fa-creative-commons-sampling","fa-brands fa-creative-commons-sampling-plus","fa-brands fa-creative-commons-share","fa-brands fa-creative-commons-zero","fa-brands fa-critical-role","fa-brands fa-css3","fa-brands fa-css3-alt","fa-brands fa-cuttlefish","fa-brands fa-d-and-d","fa-brands fa-d-and-d-beyond","fa-brands fa-audible","fa-brands fa-autoprefixer","fa-brands fa-avianex","fa-brands fa-aviato","fa-brands fa-aws","fa-brands fa-bandcamp","fa-brands fa-battle-net","fa-brands fa-behance","fa-brands fa-bilibili","fa-brands fa-bimobject","fa-brands fa-bitbucket","fa-brands fa-bitcoin","fa-brands fa-bity","fa-brands fa-blackberry","fa-brands fa-black-tie","fa-brands fa-blogger","fa-brands fa-blogger-b","fa-brands fa-bluetooth","fa-brands fa-bluetooth-b","fa-brands fa-bootstrap","fa-brands fa-bots","fa-brands fa-brave","fa-brands fa-brave-reverse","fa-brands fa-btc","fa-brands fa-buffer","fa-brands fa-buromobelexperte","fa-brands fa-buy-n-large","fa-brands fa-buysellads","fa-brands fa-canadian-maple-leaf","fa-brands fa-cc-amazon-pay","fa-brands fa-cc-amex","fa-brands fa-cc-apple-pay","fa-brands fa-cc-diners-club","fa-brands fa-cc-discover","fa-brands fa-cc-jcb","fa-brands fa-cc-mastercard","fa-brands fa-cc-paypal","fa-brands fa-42-group","fa-brands fa-500px","fa-brands fa-accessible-icon","fa-brands fa-accusoft","fa-regular fa-circle-left","fa-regular fa-circle-pause","fa-regular fa-circle-play","fa-regular fa-circle-question","fa-regular fa-circle-right","fa-regular fa-circle-stop","fa-regular fa-circle-up","fa-regular fa-circle-user","fa-regular fa-circle-xmark","fa-regular fa-clipboard","fa-regular fa-clock","fa-regular fa-clone","fa-regular fa-closed-captioning","fa-regular fa-comment","fa-regular fa-comment-dots","fa-regular fa-comments","fa-regular fa-address-book","fa-regular fa-address-card","fa-regular fa-bell","fa-regular fa-bell-slash","fa-regular fa-bookmark","fa-regular fa-building","fa-regular fa-share-from-square","fa-regular fa-snowflake","fa-regular fa-square","fa-regular fa-square-caret-down","fa-regular fa-square-caret-left","fa-regular fa-square-caret-right","fa-regular fa-square-caret-up","fa-regular fa-square-check","fa-regular fa-square-full","fa-regular fa-square-minus","fa-regular fa-square-plus","fa-regular fa-star","fa-regular fa-star-half","fa-regular fa-star-half-stroke","fa-regular fa-sun","fa-regular fa-thumbs-down","fa-regular fa-thumbs-up","fa-regular fa-trash-can","fa-regular fa-user","fa-regular fa-window-maximize","fa-regular fa-window-minimize","fa-regular fa-window-restore","fa-regular fa-hand","fa-regular fa-hand-pointer","fa-regular fa-hand-point-right","fa-regular fa-hand-point-up","fa-regular fa-hand-scissors","fa-regular fa-handshake","fa-regular fa-hand-spock","fa-regular fa-hard-drive","fa-regular fa-heart","fa-regular fa-hospital","fa-regular fa-hourglass","fa-regular fa-hourglass-half","fa-regular fa-id-badge","fa-regular fa-id-card","fa-regular fa-image","fa-regular fa-images","fa-regular fa-keyboard","fa-regular fa-lemon","fa-regular fa-life-ring","fa-regular fa-lightbulb","fa-regular fa-map","fa-regular fa-message","fa-regular fa-money-bill-1","fa-regular fa-moon","fa-regular fa-newspaper","fa-regular fa-note-sticky","fa-regular fa-object-group","fa-regular fa-object-ungroup","fa-regular fa-paper-plane","fa-regular fa-paste","fa-regular fa-pen-to-square","fa-regular fa-rectangle-list","fa-regular fa-rectangle-xmark","fa-regular fa-registered","fa-regular fa-face-meh","fa-regular fa-face-meh-blank","fa-regular fa-face-rolling-eyes","fa-regular fa-face-sad-cry","fa-regular fa-face-sad-tear","fa-regular fa-face-smile","fa-regular fa-face-smile-beam","fa-regular fa-face-smile-wink","fa-regular fa-face-surprise","fa-regular fa-face-tired","fa-regular fa-file","fa-regular fa-file-audio","fa-regular fa-file-code","fa-regular fa-file-excel","fa-regular fa-file-image","fa-regular fa-file-lines","fa-regular fa-file-pdf","fa-regular fa-file-powerpoint","fa-regular fa-file-video","fa-regular fa-file-word","fa-regular fa-file-zipper","fa-regular fa-flag","fa-regular fa-floppy-disk","fa-regular fa-folder","fa-regular fa-folder-closed","fa-regular fa-folder-open","fa-regular fa-font-awesome","fa-regular fa-futbol","fa-regular fa-gem","fa-regular fa-hand-back-fist","fa-regular fa-hand-lizard","fa-regular fa-hand-peace","fa-regular fa-hand-point-down","fa-regular fa-hand-point-left","fa-regular fa-compass","fa-regular fa-copy","fa-regular fa-copyright","fa-regular fa-credit-card","fa-regular fa-envelope","fa-regular fa-envelope-open","fa-regular fa-eye","fa-regular fa-eye-slash","fa-regular fa-face-angry","fa-regular fa-face-dizzy","fa-regular fa-face-flushed","fa-regular fa-face-frown","fa-regular fa-face-frown-open","fa-regular fa-face-grimace","fa-regular fa-face-grin","fa-regular fa-face-grin-beam","fa-regular fa-face-grin-beam-sweat","fa-regular fa-face-grin-hearts","fa-regular fa-face-grin-squint","fa-regular fa-face-grin-squint-tears","fa-regular fa-face-grin-stars","fa-regular fa-face-grin-tears","fa-regular fa-face-grin-tongue","fa-regular fa-face-grin-tongue-squint","fa-regular fa-face-grin-tongue-wink","fa-regular fa-face-grin-wide","fa-regular fa-face-grin-wink","fa-regular fa-face-kiss","fa-regular fa-face-kiss-beam","fa-regular fa-face-kiss-wink-heart","fa-regular fa-face-laugh","fa-regular fa-face-laugh-beam","fa-regular fa-face-laugh-squint","fa-regular fa-face-laugh-wink","fa-regular fa-calendar","fa-regular fa-calendar-check","fa-regular fa-calendar-days","fa-regular fa-calendar-minus","fa-regular fa-calendar-plus","fa-regular fa-calendar-xmark","fa-regular fa-chart-bar","fa-regular fa-chess-bishop","fa-regular fa-chess-king","fa-regular fa-chess-knight","fa-regular fa-chess-pawn","fa-regular fa-chess-queen","fa-regular fa-chess-rook","fa-regular fa-circle","fa-regular fa-circle-check","fa-regular fa-circle-dot","fa-regular fa-circle-down","fa-solid fa-worm","fa-solid fa-wrench","fa-solid fa-x","fa-solid fa-xmark","fa-solid fa-xmarks-lines","fa-solid fa-x-ray","fa-solid fa-y","fa-solid fa-yen-sign","fa-solid fa-yin-yang","fa-solid fa-z","fa-solid fa-voicemail","fa-solid fa-volcano","fa-solid fa-volleyball","fa-solid fa-volume-high","fa-solid fa-volume-low","fa-solid fa-volume-off","fa-solid fa-volume-xmark","fa-solid fa-vr-cardboard","fa-solid fa-w","fa-solid fa-walkie-talkie","fa-solid fa-wallet","fa-solid fa-wand-magic","fa-solid fa-wand-magic-sparkles","fa-solid fa-wand-sparkles","fa-solid fa-warehouse","fa-solid fa-water","fa-solid fa-water-ladder","fa-solid fa-wave-square","fa-solid fa-weight-hanging","fa-solid fa-weight-scale","fa-solid fa-wheat-awn","fa-solid fa-wheat-awn-circle-exclamation","fa-solid fa-wheelchair","fa-solid fa-wheelchair-move","fa-solid fa-whiskey-glass","fa-solid fa-wifi","fa-solid fa-wind","fa-solid fa-window-maximize","fa-solid fa-window-minimize","fa-solid fa-window-restore","fa-solid fa-wine-bottle","fa-solid fa-users","fa-solid fa-users-gear","fa-solid fa-users-line","fa-solid fa-users-rays","fa-solid fa-users-rectangle","fa-solid fa-users-slash","fa-solid fa-users-viewfinder","fa-solid fa-utensils","fa-solid fa-v","fa-solid fa-van-shuttle","fa-solid fa-vault","fa-solid fa-vector-square","fa-solid fa-venus","fa-solid fa-venus-double","fa-solid fa-venus-mars","fa-solid fa-vest","fa-solid fa-vest-patches","fa-solid fa-vial","fa-solid fa-vial-circle-check","fa-solid fa-vials","fa-solid fa-vial-virus","fa-solid fa-video","fa-solid fa-video-slash","fa-solid fa-vihara","fa-solid fa-virus","fa-solid fa-virus-covid","fa-solid fa-virus-covid-slash","fa-solid fa-viruses","fa-solid fa-virus-slash","fa-solid fa-underline","fa-solid fa-universal-access","fa-solid fa-unlock","fa-solid fa-unlock-keyhole","fa-solid fa-up-down","fa-solid fa-up-down-left-right","fa-solid fa-upload","fa-solid fa-up-long","fa-solid fa-up-right-and-down-left-from-center","fa-solid fa-up-right-from-square","fa-solid fa-user","fa-solid fa-user-astronaut","fa-solid fa-user-check","fa-solid fa-user-clock","fa-solid fa-user-doctor","fa-solid fa-user-gear","fa-solid fa-user-graduate","fa-solid fa-user-group","fa-solid fa-user-injured","fa-solid fa-user-large","fa-solid fa-user-large-slash","fa-solid fa-user-lock","fa-solid fa-user-minus","fa-solid fa-user-ninja","fa-solid fa-user-nurse","fa-solid fa-user-pen","fa-solid fa-user-plus","fa-solid fa-users-between-lines","fa-solid fa-user-secret","fa-solid fa-user-shield","fa-solid fa-user-slash","fa-solid fa-user-tag","fa-solid fa-user-tie","fa-solid fa-user-xmark","fa-solid fa-tree","fa-solid fa-tree-city","fa-solid fa-triangle-exclamation","fa-solid fa-trophy","fa-solid fa-trowel","fa-solid fa-trowel-bricks","fa-solid fa-truck","fa-solid fa-truck-arrow-right","fa-solid fa-truck-droplet","fa-solid fa-truck-fast","fa-solid fa-truck-field","fa-solid fa-truck-field-un","fa-solid fa-truck-front","fa-solid fa-truck-medical","fa-solid fa-truck-monster","fa-solid fa-truck-moving","fa-solid fa-truck-pickup","fa-solid fa-truck-plane","fa-solid fa-truck-ramp-box","fa-solid fa-tty","fa-solid fa-turkish-lira-sign","fa-solid fa-turn-down","fa-solid fa-turn-up","fa-solid fa-tv","fa-solid fa-u","fa-solid fa-umbrella","fa-solid fa-umbrella-beach","fa-solid fa-ticket","fa-solid fa-ticket-simple","fa-solid fa-timeline","fa-solid fa-toggle-off","fa-solid fa-toggle-on","fa-solid fa-toilet","fa-solid fa-toilet-paper","fa-solid fa-toilet-paper-slash","fa-solid fa-toilet-portable","fa-solid fa-toilets-portable","fa-solid fa-toolbox","fa-solid fa-tooth","fa-solid fa-torii-gate","fa-solid fa-tornado","fa-solid fa-tower-broadcast","fa-solid fa-tower-cell","fa-solid fa-tower-observation","fa-solid fa-tractor","fa-solid fa-trademark","fa-solid fa-traffic-light","fa-solid fa-trailer","fa-solid fa-train","fa-solid fa-train-subway","fa-solid fa-train-tram","fa-solid fa-transgender","fa-solid fa-trash","fa-solid fa-trash-arrow-up","fa-solid fa-trash-can","fa-solid fa-trash-can-arrow-up","fa-solid fa-tablets","fa-solid fa-tachograph-digital","fa-solid fa-tag","fa-solid fa-tags","fa-solid fa-tape","fa-solid fa-tarp","fa-solid fa-tarp-droplet","fa-solid fa-taxi","fa-solid fa-teeth","fa-solid fa-teeth-open","fa-solid fa-temperature-arrow-down","fa-solid fa-temperature-arrow-up","fa-solid fa-temperature-empty","fa-solid fa-temperature-full","fa-solid fa-temperature-half","fa-solid fa-temperature-high","fa-solid fa-temperature-low","fa-solid fa-temperature-quarter","fa-solid fa-temperature-three-quarters","fa-solid fa-tenge-sign","fa-solid fa-tent","fa-solid fa-tent-arrow-down-to-line","fa-solid fa-tent-arrow-left-right","fa-solid fa-tent-arrows-down","fa-solid fa-tent-arrow-turn-left","fa-solid fa-tents","fa-solid fa-terminal","fa-solid fa-text-height","fa-solid fa-text-slash","fa-solid fa-text-width","fa-solid fa-thermometer","fa-solid fa-thumbs-down","fa-solid fa-thumbs-up","fa-solid fa-thumbtack","fa-solid fa-star","fa-solid fa-star-half","fa-solid fa-star-of-david","fa-solid fa-star-of-life","fa-solid fa-sterling-sign","fa-solid fa-stethoscope","fa-solid fa-stop","fa-solid fa-stopwatch","fa-solid fa-stopwatch-20","fa-solid fa-store","fa-solid fa-store-slash","fa-solid fa-street-view","fa-solid fa-strikethrough","fa-solid fa-stroopwafel","fa-solid fa-subscript","fa-solid fa-suitcase","fa-solid fa-suitcase-medical","fa-solid fa-suitcase-rolling","fa-solid fa-sun","fa-solid fa-sun-plant-wilt","fa-solid fa-superscript","fa-solid fa-swatchbook","fa-solid fa-synagogue","fa-solid fa-syringe","fa-solid fa-t","fa-solid fa-table","fa-solid fa-table-cells","fa-solid fa-table-cells-large","fa-solid fa-table-columns","fa-solid fa-table-list","fa-solid fa-tablet","fa-solid fa-tablet-button","fa-solid fa-table-tennis-paddle-ball","fa-solid fa-tablet-screen-button","fa-solid fa-spray-can","fa-solid fa-spray-can-sparkles","fa-solid fa-square","fa-solid fa-square-arrow-up-right","fa-solid fa-square-caret-down","fa-solid fa-square-caret-left","fa-solid fa-square-caret-right","fa-solid fa-square-caret-up","fa-solid fa-square-check","fa-solid fa-square-envelope","fa-solid fa-square-full","fa-solid fa-square-h","fa-solid fa-square-minus","fa-solid fa-square-nfi","fa-solid fa-square-parking","fa-solid fa-square-pen","fa-solid fa-square-person-confined","fa-solid fa-square-phone","fa-solid fa-square-phone-flip","fa-solid fa-square-plus","fa-solid fa-square-poll-horizontal","fa-solid fa-square-poll-vertical","fa-solid fa-square-root-variable","fa-solid fa-square-rss","fa-solid fa-square-share-nodes","fa-solid fa-square-up-right","fa-solid fa-square-virus","fa-solid fa-square-xmark","fa-solid fa-staff-snake","fa-solid fa-stairs","fa-solid fa-stamp","fa-solid fa-stapler","fa-solid fa-star-and-crescent","fa-solid fa-star-half-stroke","fa-solid fa-shower","fa-solid fa-shrimp","fa-solid fa-shuffle","fa-solid fa-shuttle-space","fa-solid fa-signal","fa-solid fa-signature","fa-solid fa-sign-hanging","fa-solid fa-signs-post","fa-solid fa-sim-card","fa-solid fa-sink","fa-solid fa-sitemap","fa-solid fa-skull","fa-solid fa-skull-crossbones","fa-solid fa-slash","fa-solid fa-sleigh","fa-solid fa-sliders","fa-solid fa-smog","fa-solid fa-smoking","fa-solid fa-snowflake","fa-solid fa-snowman","fa-solid fa-snowplow","fa-solid fa-soap","fa-solid fa-socks","fa-solid fa-solar-panel","fa-solid fa-sort","fa-solid fa-sort-down","fa-solid fa-sort-up","fa-solid fa-spa","fa-solid fa-spaghetti-monster-flying","fa-solid fa-spell-check","fa-solid fa-spider","fa-solid fa-spinner","fa-solid fa-splotch","fa-solid fa-spoon","fa-solid fa-scale-unbalanced","fa-solid fa-school","fa-solid fa-school-circle-check","fa-solid fa-school-circle-exclamation","fa-solid fa-school-circle-xmark","fa-solid fa-school-flag","fa-solid fa-school-lock","fa-solid fa-scissors","fa-solid fa-screwdriver","fa-solid fa-screwdriver-wrench","fa-solid fa-scroll","fa-solid fa-scroll-torah","fa-solid fa-sd-card","fa-solid fa-section","fa-solid fa-seedling","fa-solid fa-server","fa-solid fa-shapes","fa-solid fa-share","fa-solid fa-share-from-square","fa-solid fa-share-nodes","fa-solid fa-sheet-plastic","fa-solid fa-shekel-sign","fa-solid fa-shield","fa-solid fa-shield-cat","fa-solid fa-shield-dog","fa-solid fa-shield-halved","fa-solid fa-shield-heart","fa-solid fa-shield-virus","fa-solid fa-ship","fa-solid fa-shirt","fa-solid fa-shoe-prints","fa-solid fa-shop","fa-solid fa-shop-lock","fa-solid fa-shop-slash","fa-solid fa-right-long","fa-solid fa-right-to-bracket","fa-solid fa-ring","fa-solid fa-road","fa-solid fa-road-barrier","fa-solid fa-road-bridge","fa-solid fa-road-circle-check","fa-solid fa-road-circle-exclamation","fa-solid fa-road-circle-xmark","fa-solid fa-road-lock","fa-solid fa-road-spikes","fa-solid fa-robot","fa-solid fa-rocket","fa-solid fa-rotate","fa-solid fa-rotate-left","fa-solid fa-rotate-right","fa-solid fa-route","fa-solid fa-rss","fa-solid fa-ruble-sign","fa-solid fa-rug","fa-solid fa-ruler","fa-solid fa-ruler-combined","fa-solid fa-ruler-horizontal","fa-solid fa-ruler-vertical","fa-solid fa-rupee-sign","fa-solid fa-rupiah-sign","fa-solid fa-s","fa-solid fa-sack-dollar","fa-solid fa-sack-xmark","fa-solid fa-sailboat","fa-solid fa-satellite","fa-solid fa-satellite-dish","fa-solid fa-scale-balanced","fa-solid fa-scale-unbalanced-flip","fa-solid fa-prescription","fa-solid fa-prescription-bottle","fa-solid fa-prescription-bottle-medical","fa-solid fa-print","fa-solid fa-pump-medical","fa-solid fa-pump-soap","fa-solid fa-puzzle-piece","fa-solid fa-q","fa-solid fa-qrcode","fa-solid fa-question","fa-solid fa-quote-left","fa-solid fa-quote-right","fa-solid fa-r","fa-solid fa-radiation","fa-solid fa-radio","fa-solid fa-rainbow","fa-solid fa-ranking-star","fa-solid fa-receipt","fa-solid fa-record-vinyl","fa-solid fa-rectangle-ad","fa-solid fa-rectangle-list","fa-solid fa-rectangle-xmark","fa-solid fa-recycle","fa-solid fa-registered","fa-solid fa-repeat","fa-solid fa-reply","fa-solid fa-reply-all","fa-solid fa-republican","fa-solid fa-restroom","fa-solid fa-retweet","fa-solid fa-ribbon","fa-solid fa-right-from-bracket","fa-solid fa-right-left","fa-solid fa-phone","fa-solid fa-phone-flip","fa-solid fa-phone-slash","fa-solid fa-phone-volume","fa-solid fa-photo-film","fa-solid fa-piggy-bank","fa-solid fa-pills","fa-solid fa-pizza-slice","fa-solid fa-place-of-worship","fa-solid fa-plane","fa-solid fa-plane-arrival","fa-solid fa-plane-circle-check","fa-solid fa-plane-circle-exclamation","fa-solid fa-plane-circle-xmark","fa-solid fa-plane-departure","fa-solid fa-plane-lock","fa-solid fa-plane-slash","fa-solid fa-plane-up","fa-solid fa-plant-wilt","fa-solid fa-plate-wheat","fa-solid fa-play","fa-solid fa-plug","fa-solid fa-plug-circle-bolt","fa-solid fa-plug-circle-check","fa-solid fa-plug-circle-exclamation","fa-solid fa-plug-circle-minus","fa-solid fa-plug-circle-plus","fa-solid fa-plug-circle-xmark","fa-solid fa-plus","fa-solid fa-plus-minus","fa-solid fa-podcast","fa-solid fa-poo","fa-solid fa-poop","fa-solid fa-poo-storm","fa-solid fa-power-off","fa-solid fa-person","fa-solid fa-person-dots-from-line","fa-solid fa-person-dress","fa-solid fa-person-dress-burst","fa-solid fa-person-drowning","fa-solid fa-person-falling","fa-solid fa-person-falling-burst","fa-solid fa-person-half-dress","fa-solid fa-person-harassing","fa-solid fa-person-hiking","fa-solid fa-person-military-pointing","fa-solid fa-person-military-rifle","fa-solid fa-person-military-to-person","fa-solid fa-person-praying","fa-solid fa-person-pregnant","fa-solid fa-person-rays","fa-solid fa-person-rifle","fa-solid fa-person-running","fa-solid fa-person-shelter","fa-solid fa-person-skating","fa-solid fa-person-skiing","fa-solid fa-person-skiing-nordic","fa-solid fa-person-snowboarding","fa-solid fa-person-swimming","fa-solid fa-person-through-window","fa-solid fa-person-walking","fa-solid fa-person-walking-arrow-loop-left","fa-solid fa-person-walking-arrow-right","fa-solid fa-person-walking-dashed-line-arrow-right","fa-solid fa-person-walking-luggage","fa-solid fa-person-walking-with-cane","fa-solid fa-peseta-sign","fa-solid fa-peso-sign","fa-solid fa-pause","fa-solid fa-paw","fa-solid fa-peace","fa-solid fa-pen","fa-solid fa-pencil","fa-solid fa-pen-clip","fa-solid fa-pen-fancy","fa-solid fa-pen-nib","fa-solid fa-pen-ruler","fa-solid fa-pen-to-square","fa-solid fa-people-arrows","fa-solid fa-people-carry-box","fa-solid fa-people-group","fa-solid fa-people-line","fa-solid fa-people-pulling","fa-solid fa-people-robbery","fa-solid fa-people-roof","fa-solid fa-pepper-hot","fa-solid fa-percent","fa-solid fa-person-arrow-down-to-line","fa-solid fa-person-arrow-up-from-line","fa-solid fa-person-biking","fa-solid fa-person-booth","fa-solid fa-person-breastfeeding","fa-solid fa-person-burst","fa-solid fa-person-cane","fa-solid fa-person-chalkboard","fa-solid fa-person-circle-check","fa-solid fa-person-circle-exclamation","fa-solid fa-person-circle-minus","fa-solid fa-person-circle-plus","fa-solid fa-person-circle-question","fa-solid fa-person-circle-xmark","fa-solid fa-person-digging","fa-solid fa-mountain","fa-solid fa-mug-hot","fa-solid fa-mug-saucer","fa-solid fa-music","fa-solid fa-n","fa-solid fa-naira-sign","fa-solid fa-network-wired","fa-solid fa-neuter","fa-solid fa-newspaper","fa-solid fa-notdef","fa-solid fa-not-equal","fa-solid fa-notes-medical","fa-solid fa-note-sticky","fa-solid fa-o","fa-solid fa-object-group","fa-solid fa-object-ungroup","fa-solid fa-oil-can","fa-solid fa-oil-well","fa-solid fa-om","fa-solid fa-otter","fa-solid fa-outdent","fa-solid fa-p","fa-solid fa-pager","fa-solid fa-paintbrush","fa-solid fa-paint-roller","fa-solid fa-palette","fa-solid fa-pallet","fa-solid fa-panorama","fa-solid fa-paperclip","fa-solid fa-paper-plane","fa-solid fa-parachute-box","fa-solid fa-paragraph","fa-solid fa-passport","fa-solid fa-paste","fa-solid fa-microphone","fa-solid fa-microphone-lines","fa-solid fa-microphone-lines-slash","fa-solid fa-microphone-slash","fa-solid fa-microscope","fa-solid fa-mill-sign","fa-solid fa-minimize","fa-solid fa-minus","fa-solid fa-mitten","fa-solid fa-mobile","fa-solid fa-mobile-button","fa-solid fa-mobile-retro","fa-solid fa-mobile-screen","fa-solid fa-mobile-screen-button","fa-solid fa-money-bill","fa-solid fa-money-bill-1","fa-solid fa-money-bill-1-wave","fa-solid fa-money-bills","fa-solid fa-money-bill-transfer","fa-solid fa-money-bill-trend-up","fa-solid fa-money-bill-wave","fa-solid fa-money-bill-wheat","fa-solid fa-money-check","fa-solid fa-money-check-dollar","fa-solid fa-monument","fa-solid fa-moon","fa-solid fa-mortar-pestle","fa-solid fa-mosque","fa-solid fa-mosquito","fa-solid fa-mosquito-net","fa-solid fa-motorcycle","fa-solid fa-mound","fa-solid fa-mountain-city","fa-solid fa-mountain-sun","fa-solid fa-magnifying-glass","fa-solid fa-magnifying-glass-location","fa-solid fa-magnifying-glass-minus","fa-solid fa-magnifying-glass-plus","fa-solid fa-manat-sign","fa-solid fa-map","fa-solid fa-map-location","fa-solid fa-map-location-dot","fa-solid fa-map-pin","fa-solid fa-marker","fa-solid fa-mars","fa-solid fa-mars-and-venus","fa-solid fa-mars-and-venus-burst","fa-solid fa-mars-double","fa-solid fa-mars-stroke","fa-solid fa-mars-stroke-right","fa-solid fa-mars-stroke-up","fa-solid fa-martini-glass","fa-solid fa-martini-glass-citrus","fa-solid fa-martini-glass-empty","fa-solid fa-mask","fa-solid fa-mask-face","fa-solid fa-masks-theater","fa-solid fa-mask-ventilator","fa-solid fa-mattress-pillow","fa-solid fa-maximize","fa-solid fa-medal","fa-solid fa-memory","fa-solid fa-menorah","fa-solid fa-mercury","fa-solid fa-message","fa-solid fa-meteor","fa-solid fa-microchip","fa-solid fa-laptop","fa-solid fa-lari-sign","fa-solid fa-layer-group","fa-solid fa-leaf","fa-solid fa-left-long","fa-solid fa-left-right","fa-solid fa-lemon","fa-solid fa-less-than","fa-solid fa-less-than-equal","fa-solid fa-life-ring","fa-solid fa-lightbulb","fa-solid fa-lines-leaning","fa-solid fa-link","fa-solid fa-link-slash","fa-solid fa-lira-sign","fa-solid fa-list","fa-solid fa-list-check","fa-solid fa-list-ol","fa-solid fa-list-ul","fa-solid fa-litecoin-sign","fa-solid fa-location-arrow","fa-solid fa-location-crosshairs","fa-solid fa-location-dot","fa-solid fa-location-pin","fa-solid fa-location-pin-lock","fa-solid fa-lock","fa-solid fa-lock-open","fa-solid fa-locust","fa-solid fa-lungs","fa-solid fa-lungs-virus","fa-solid fa-m","fa-solid fa-magnet","fa-solid fa-magnifying-glass-arrow-right","fa-solid fa-magnifying-glass-chart","fa-solid fa-magnifying-glass-dollar","fa-solid fa-indent","fa-solid fa-indian-rupee-sign","fa-solid fa-industry","fa-solid fa-infinity","fa-solid fa-info","fa-solid fa-italic","fa-solid fa-j","fa-solid fa-jar","fa-solid fa-jar-wheat","fa-solid fa-jedi","fa-solid fa-jet-fighter","fa-solid fa-jet-fighter-up","fa-solid fa-joint","fa-solid fa-jug-detergent","fa-solid fa-k","fa-solid fa-kaaba","fa-solid fa-key","fa-solid fa-keyboard","fa-solid fa-khanda","fa-solid fa-kip-sign","fa-solid fa-kitchen-set","fa-solid fa-kit-medical","fa-solid fa-kiwi-bird","fa-solid fa-l","fa-solid fa-landmark","fa-solid fa-landmark-dome","fa-solid fa-landmark-flag","fa-solid fa-land-mine-on","fa-solid fa-language","fa-solid fa-laptop-code","fa-solid fa-laptop-file","fa-solid fa-laptop-medical","fa-solid fa-house","fa-solid fa-house-chimney","fa-solid fa-house-circle-check","fa-solid fa-house-circle-exclamation","fa-solid fa-house-circle-xmark","fa-solid fa-house-crack","fa-solid fa-house-fire","fa-solid fa-house-flag","fa-solid fa-house-flood-water","fa-solid fa-house-flood-water-circle-arrow-right","fa-solid fa-house-laptop","fa-solid fa-house-lock","fa-solid fa-house-medical","fa-solid fa-house-medical-circle-check","fa-solid fa-house-medical-circle-exclamation","fa-solid fa-house-medical-circle-xmark","fa-solid fa-house-medical-flag","fa-solid fa-house-signal","fa-solid fa-house-tsunami","fa-solid fa-house-user","fa-solid fa-hryvnia-sign","fa-solid fa-hurricane","fa-solid fa-i","fa-solid fa-ice-cream","fa-solid fa-icicles","fa-solid fa-icons","fa-solid fa-i-cursor","fa-solid fa-id-badge","fa-solid fa-id-card","fa-solid fa-id-card-clip","fa-solid fa-igloo","fa-solid fa-image","fa-solid fa-image-portrait","fa-solid fa-images","fa-solid fa-inbox","fa-solid fa-heart","fa-solid fa-heart-circle-bolt","fa-solid fa-heart-circle-check","fa-solid fa-heart-circle-exclamation","fa-solid fa-heart-circle-minus","fa-solid fa-heart-circle-plus","fa-solid fa-heart-circle-xmark","fa-solid fa-heart-crack","fa-solid fa-heart-pulse","fa-solid fa-helicopter","fa-solid fa-helicopter-symbol","fa-solid fa-helmet-safety","fa-solid fa-helmet-un","fa-solid fa-highlighter","fa-solid fa-hill-avalanche","fa-solid fa-hill-rockslide","fa-solid fa-hippo","fa-solid fa-hockey-puck","fa-solid fa-holly-berry","fa-solid fa-horse","fa-solid fa-horse-head","fa-solid fa-hospital","fa-solid fa-hospital-user","fa-solid fa-hotdog","fa-solid fa-hotel","fa-solid fa-hot-tub-person","fa-solid fa-hourglass","fa-solid fa-hourglass-end","fa-solid fa-hourglass-half","fa-solid fa-hourglass-start","fa-solid fa-house-chimney-crack","fa-solid fa-house-chimney-medical","fa-solid fa-house-chimney-user","fa-solid fa-house-chimney-window","fa-solid fa-hand","fa-solid fa-handcuffs","fa-solid fa-hand-pointer","fa-solid fa-hands","fa-solid fa-hands-asl-interpreting","fa-solid fa-hands-bound","fa-solid fa-hands-bubbles","fa-solid fa-hand-scissors","fa-solid fa-hands-clapping","fa-solid fa-handshake","fa-solid fa-handshake-angle","fa-solid fa-handshake-simple","fa-solid fa-handshake-simple-slash","fa-solid fa-handshake-slash","fa-solid fa-hands-holding","fa-solid fa-hands-holding-child","fa-solid fa-hands-holding-circle","fa-solid fa-hand-sparkles","fa-solid fa-hand-spock","fa-solid fa-hands-praying","fa-solid fa-hanukiah","fa-solid fa-hard-drive","fa-solid fa-hashtag","fa-solid fa-hat-cowboy","fa-solid fa-hat-cowboy-side","fa-solid fa-hat-wizard","fa-solid fa-heading","fa-solid fa-headphones","fa-solid fa-headphones-simple","fa-solid fa-headset","fa-solid fa-head-side-cough","fa-solid fa-head-side-cough-slash","fa-solid fa-head-side-mask","fa-solid fa-head-side-virus","fa-solid fa-globe","fa-solid fa-golf-ball-tee","fa-solid fa-gopuram","fa-solid fa-graduation-cap","fa-solid fa-greater-than","fa-solid fa-greater-than-equal","fa-solid fa-grip","fa-solid fa-grip-lines","fa-solid fa-grip-lines-vertical","fa-solid fa-grip-vertical","fa-solid fa-group-arrows-rotate","fa-solid fa-guarani-sign","fa-solid fa-guitar","fa-solid fa-gun","fa-solid fa-h","fa-solid fa-hammer","fa-solid fa-hamsa","fa-solid fa-hand-back-fist","fa-solid fa-hand-dots","fa-solid fa-hand-fist","fa-solid fa-hand-holding","fa-solid fa-hand-holding-dollar","fa-solid fa-hand-holding-droplet","fa-solid fa-hand-holding-hand","fa-solid fa-hand-holding-heart","fa-solid fa-hand-holding-medical","fa-solid fa-hand-lizard","fa-solid fa-hand-middle-finger","fa-solid fa-hand-peace","fa-solid fa-hand-point-down","fa-solid fa-hand-point-left","fa-solid fa-hand-point-right","fa-solid fa-hand-point-up","fa-solid fa-florin-sign","fa-solid fa-folder","fa-solid fa-folder-closed","fa-solid fa-folder-minus","fa-solid fa-folder-open","fa-solid fa-folder-plus","fa-solid fa-folder-tree","fa-solid fa-font","fa-solid fa-font-awesome","fa-solid fa-football","fa-solid fa-forward","fa-solid fa-forward-fast","fa-solid fa-forward-step","fa-solid fa-franc-sign","fa-solid fa-frog","fa-solid fa-futbol","fa-solid fa-g","fa-solid fa-gamepad","fa-solid fa-gas-pump","fa-solid fa-gauge","fa-solid fa-gauge-high","fa-solid fa-gauge-simple","fa-solid fa-gauge-simple-high","fa-solid fa-gavel","fa-solid fa-gear","fa-solid fa-gears","fa-solid fa-gem","fa-solid fa-genderless","fa-solid fa-ghost","fa-solid fa-gift","fa-solid fa-gifts","fa-solid fa-glasses","fa-solid fa-glass-water","fa-solid fa-glass-water-droplet","fa-solid fa-file","fa-solid fa-file-lines","fa-solid fa-file-medical","fa-solid fa-file-pdf","fa-solid fa-file-pen","fa-solid fa-file-powerpoint","fa-solid fa-file-prescription","fa-solid fa-file-shield","fa-solid fa-file-signature","fa-solid fa-file-video","fa-solid fa-file-waveform","fa-solid fa-file-word","fa-solid fa-file-zipper","fa-solid fa-fill","fa-solid fa-fill-drip","fa-solid fa-film","fa-solid fa-filter","fa-solid fa-filter-circle-dollar","fa-solid fa-filter-circle-xmark","fa-solid fa-fingerprint","fa-solid fa-fire","fa-solid fa-fire-burner","fa-solid fa-fire-extinguisher","fa-solid fa-fire-flame-curved","fa-solid fa-fire-flame-simple","fa-solid fa-fish","fa-solid fa-fish-fins","fa-solid fa-flag","fa-solid fa-flag-checkered","fa-solid fa-flag-usa","fa-solid fa-flask","fa-solid fa-flask-vial","fa-solid fa-floppy-disk","fa-solid fa-face-laugh","fa-solid fa-face-meh","fa-solid fa-face-meh-blank","fa-solid fa-face-rolling-eyes","fa-solid fa-face-sad-cry","fa-solid fa-face-sad-tear","fa-solid fa-face-smile","fa-solid fa-face-smile-beam","fa-solid fa-face-smile-wink","fa-solid fa-face-surprise","fa-solid fa-face-tired","fa-solid fa-fan","fa-solid fa-faucet","fa-solid fa-faucet-drip","fa-solid fa-fax","fa-solid fa-feather","fa-solid fa-feather-pointed","fa-solid fa-ferry","fa-solid fa-file-arrow-down","fa-solid fa-file-arrow-up","fa-solid fa-file-audio","fa-solid fa-file-circle-check","fa-solid fa-file-circle-exclamation","fa-solid fa-file-circle-minus","fa-solid fa-file-circle-plus","fa-solid fa-file-circle-question","fa-solid fa-file-circle-xmark","fa-solid fa-file-code","fa-solid fa-file-contract","fa-solid fa-file-csv","fa-solid fa-file-excel","fa-solid fa-file-export","fa-solid fa-file-image","fa-solid fa-file-import","fa-solid fa-file-invoice","fa-solid fa-file-invoice-dollar","fa-solid fa-exclamation","fa-solid fa-expand","fa-solid fa-explosion","fa-solid fa-eye","fa-solid fa-eye-dropper","fa-solid fa-eye-low-vision","fa-solid fa-eye-slash","fa-solid fa-f","fa-solid fa-face-angry","fa-solid fa-face-dizzy","fa-solid fa-face-flushed","fa-solid fa-face-frown","fa-solid fa-face-frown-open","fa-solid fa-face-grimace","fa-solid fa-face-grin","fa-solid fa-face-grin-beam","fa-solid fa-face-grin-beam-sweat","fa-solid fa-face-grin-hearts","fa-solid fa-face-grin-squint","fa-solid fa-face-grin-squint-tears","fa-solid fa-face-grin-stars","fa-solid fa-face-grin-tears","fa-solid fa-face-grin-tongue","fa-solid fa-face-grin-tongue-squint","fa-solid fa-face-grin-tongue-wink","fa-solid fa-face-grin-wide","fa-solid fa-face-grin-wink","fa-solid fa-face-kiss","fa-solid fa-face-kiss-beam","fa-solid fa-face-kiss-wink-heart","fa-solid fa-face-laugh-beam","fa-solid fa-face-laugh-squint","fa-solid fa-face-laugh-wink","fa-solid fa-download","fa-solid fa-dragon","fa-solid fa-draw-polygon","fa-solid fa-droplet","fa-solid fa-droplet-slash","fa-solid fa-drum","fa-solid fa-drum-steelpan","fa-solid fa-drumstick-bite","fa-solid fa-dumbbell","fa-solid fa-dumpster","fa-solid fa-dumpster-fire","fa-solid fa-dungeon","fa-solid fa-e","fa-solid fa-ear-deaf","fa-solid fa-ear-listen","fa-solid fa-earth-africa","fa-solid fa-earth-americas","fa-solid fa-earth-asia","fa-solid fa-earth-europe","fa-solid fa-earth-oceania","fa-solid fa-egg","fa-solid fa-eject","fa-solid fa-elevator","fa-solid fa-ellipsis","fa-solid fa-ellipsis-vertical","fa-solid fa-envelope","fa-solid fa-envelope-circle-check","fa-solid fa-envelope-open","fa-solid fa-envelope-open-text","fa-solid fa-envelopes-bulk","fa-solid fa-equals","fa-solid fa-eraser","fa-solid fa-ethernet","fa-solid fa-euro-sign","fa-solid fa-d","fa-solid fa-database","fa-solid fa-delete-left","fa-solid fa-democrat","fa-solid fa-desktop","fa-solid fa-dharmachakra","fa-solid fa-diagram-next","fa-solid fa-diagram-predecessor","fa-solid fa-diagram-project","fa-solid fa-diagram-successor","fa-solid fa-diamond","fa-solid fa-diamond-turn-right","fa-solid fa-dice","fa-solid fa-dice-d6","fa-solid fa-dice-d20","fa-solid fa-dice-five","fa-solid fa-dice-four","fa-solid fa-dice-one","fa-solid fa-dice-six","fa-solid fa-dice-three","fa-solid fa-dice-two","fa-solid fa-disease","fa-solid fa-display","fa-solid fa-divide","fa-solid fa-dna","fa-solid fa-dog","fa-solid fa-dollar-sign","fa-solid fa-dolly","fa-solid fa-dong-sign","fa-solid fa-door-closed","fa-solid fa-door-open","fa-solid fa-dove","fa-solid fa-down-left-and-up-right-to-center","fa-solid fa-down-long","fa-solid fa-coins","fa-solid fa-colon-sign","fa-solid fa-comment","fa-solid fa-comment-dollar","fa-solid fa-comment-dots","fa-solid fa-comment-medical","fa-solid fa-comments","fa-solid fa-comments-dollar","fa-solid fa-comment-slash","fa-solid fa-comment-sms","fa-solid fa-compact-disc","fa-solid fa-compass","fa-solid fa-compass-drafting","fa-solid fa-compress","fa-solid fa-computer","fa-solid fa-computer-mouse","fa-solid fa-cookie","fa-solid fa-cookie-bite","fa-solid fa-copy","fa-solid fa-copyright","fa-solid fa-couch","fa-solid fa-cow","fa-solid fa-credit-card","fa-solid fa-crop","fa-solid fa-crop-simple","fa-solid fa-cross","fa-solid fa-crosshairs","fa-solid fa-crow","fa-solid fa-crown","fa-solid fa-crutch","fa-solid fa-cruzeiro-sign","fa-solid fa-cube","fa-solid fa-cubes","fa-solid fa-cubes-stacked","fa-solid fa-circle","fa-solid fa-circle-user","fa-solid fa-circle-xmark","fa-solid fa-city","fa-solid fa-clapperboard","fa-solid fa-clipboard","fa-solid fa-clipboard-check","fa-solid fa-clipboard-list","fa-solid fa-clipboard-question","fa-solid fa-clipboard-user","fa-solid fa-clock","fa-solid fa-clock-rotate-left","fa-solid fa-clone","fa-solid fa-closed-captioning","fa-solid fa-cloud","fa-solid fa-cloud-arrow-down","fa-solid fa-cloud-arrow-up","fa-solid fa-cloud-bolt","fa-solid fa-cloud-meatball","fa-solid fa-cloud-moon","fa-solid fa-cloud-moon-rain","fa-solid fa-cloud-rain","fa-solid fa-cloud-showers-heavy","fa-solid fa-cloud-showers-water","fa-solid fa-cloud-sun","fa-solid fa-cloud-sun-rain","fa-solid fa-clover","fa-solid fa-code","fa-solid fa-code-branch","fa-solid fa-code-commit","fa-solid fa-code-compare","fa-solid fa-code-fork","fa-solid fa-code-merge","fa-solid fa-code-pull-request","fa-solid fa-child","fa-solid fa-child-reaching","fa-solid fa-children","fa-solid fa-church","fa-solid fa-circle-arrow-down","fa-solid fa-circle-arrow-left","fa-solid fa-circle-arrow-right","fa-solid fa-circle-arrow-up","fa-solid fa-circle-check","fa-solid fa-circle-chevron-down","fa-solid fa-circle-chevron-left","fa-solid fa-circle-chevron-right","fa-solid fa-circle-chevron-up","fa-solid fa-circle-dollar-to-slot","fa-solid fa-circle-dot","fa-solid fa-circle-down","fa-solid fa-circle-exclamation","fa-solid fa-circle-h","fa-solid fa-circle-half-stroke","fa-solid fa-circle-info","fa-solid fa-circle-left","fa-solid fa-circle-minus","fa-solid fa-circle-nodes","fa-solid fa-circle-notch","fa-solid fa-circle-pause","fa-solid fa-circle-play","fa-solid fa-circle-plus","fa-solid fa-circle-question","fa-solid fa-circle-radiation","fa-solid fa-circle-right","fa-solid fa-circle-stop","fa-solid fa-circle-up","fa-solid fa-cedi-sign","fa-solid fa-cent-sign","fa-solid fa-certificate","fa-solid fa-chair","fa-solid fa-chalkboard","fa-solid fa-chalkboard-user","fa-solid fa-champagne-glasses","fa-solid fa-charging-station","fa-solid fa-chart-area","fa-solid fa-chart-bar","fa-solid fa-chart-column","fa-solid fa-chart-gantt","fa-solid fa-chart-line","fa-solid fa-chart-pie","fa-solid fa-chart-simple","fa-solid fa-check","fa-solid fa-check-double","fa-solid fa-check-to-slot","fa-solid fa-cheese","fa-solid fa-chess","fa-solid fa-chess-bishop","fa-solid fa-chess-board","fa-solid fa-chess-king","fa-solid fa-chess-knight","fa-solid fa-chess-pawn","fa-solid fa-chess-queen","fa-solid fa-chess-rook","fa-solid fa-chevron-down","fa-solid fa-chevron-left","fa-solid fa-chevron-right","fa-solid fa-chevron-up","fa-solid fa-child-combatant","fa-solid fa-child-dress","fa-solid fa-calendar","fa-solid fa-calendar-day","fa-solid fa-calendar-days","fa-solid fa-calendar-minus","fa-solid fa-calendar-plus","fa-solid fa-calendar-week","fa-solid fa-calendar-xmark","fa-solid fa-camera","fa-solid fa-camera-retro","fa-solid fa-camera-rotate","fa-solid fa-campground","fa-solid fa-candy-cane","fa-solid fa-cannabis","fa-solid fa-capsules","fa-solid fa-car","fa-solid fa-caravan","fa-solid fa-car-battery","fa-solid fa-car-burst","fa-solid fa-caret-down","fa-solid fa-caret-left","fa-solid fa-caret-right","fa-solid fa-caret-up","fa-solid fa-car-on","fa-solid fa-car-rear","fa-solid fa-carrot","fa-solid fa-car-side","fa-solid fa-cart-arrow-down","fa-solid fa-cart-flatbed","fa-solid fa-cart-flatbed-suitcase","fa-solid fa-cart-plus","fa-solid fa-cart-shopping","fa-solid fa-car-tunnel","fa-solid fa-cash-register","fa-solid fa-cat","fa-solid fa-briefcase","fa-solid fa-broom","fa-solid fa-broom-ball","fa-solid fa-brush","fa-solid fa-bucket","fa-solid fa-bug","fa-solid fa-bugs","fa-solid fa-bug-slash","fa-solid fa-building","fa-solid fa-building-circle-arrow-right","fa-solid fa-building-circle-check","fa-solid fa-building-circle-exclamation","fa-solid fa-building-circle-xmark","fa-solid fa-building-columns","fa-solid fa-building-flag","fa-solid fa-building-lock","fa-solid fa-building-ngo","fa-solid fa-building-shield","fa-solid fa-building-un","fa-solid fa-building-user","fa-solid fa-building-wheat","fa-solid fa-bullhorn","fa-solid fa-bullseye","fa-solid fa-burger","fa-solid fa-burst","fa-solid fa-bus","fa-solid fa-business-time","fa-solid fa-bus-simple","fa-solid fa-c","fa-solid fa-cable-car","fa-solid fa-cake-candles","fa-solid fa-calculator","fa-solid fa-calendar-check","fa-solid fa-book","fa-solid fa-bookmark","fa-solid fa-book-medical","fa-solid fa-book-open","fa-solid fa-book-open-reader","fa-solid fa-book-quran","fa-solid fa-book-skull","fa-solid fa-book-tanakh","fa-solid fa-border-all","fa-solid fa-border-none","fa-solid fa-border-top-left","fa-solid fa-bore-hole","fa-solid fa-bottle-droplet","fa-solid fa-bottle-water","fa-solid fa-bowl-food","fa-solid fa-bowling-ball","fa-solid fa-bowl-rice","fa-solid fa-box","fa-solid fa-box-archive","fa-solid fa-boxes-packing","fa-solid fa-boxes-stacked","fa-solid fa-box-open","fa-solid fa-box-tissue","fa-solid fa-braille","fa-solid fa-brain","fa-solid fa-brazilian-real-sign","fa-solid fa-bread-slice","fa-solid fa-bridge","fa-solid fa-bridge-circle-check","fa-solid fa-bridge-circle-exclamation","fa-solid fa-bridge-circle-xmark","fa-solid fa-bridge-lock","fa-solid fa-bridge-water","fa-solid fa-briefcase-medical","fa-solid fa-baseball","fa-solid fa-baseball-bat-ball","fa-solid fa-basketball","fa-solid fa-basket-shopping","fa-solid fa-bath","fa-solid fa-battery-empty","fa-solid fa-battery-full","fa-solid fa-battery-half","fa-solid fa-battery-quarter","fa-solid fa-battery-three-quarters","fa-solid fa-bed","fa-solid fa-bed-pulse","fa-solid fa-beer-mug-empty","fa-solid fa-bell","fa-solid fa-bell-concierge","fa-solid fa-bell-slash","fa-solid fa-bezier-curve","fa-solid fa-bicycle","fa-solid fa-binoculars","fa-solid fa-biohazard","fa-solid fa-bitcoin-sign","fa-solid fa-blender","fa-solid fa-blender-phone","fa-solid fa-blog","fa-solid fa-bold","fa-solid fa-bolt","fa-solid fa-bolt-lightning","fa-solid fa-bomb","fa-solid fa-bone","fa-solid fa-bong","fa-solid fa-book-atlas","fa-solid fa-book-bible","fa-solid fa-book-bookmark","fa-solid fa-book-journal-whills","fa-solid fa-arrows-to-circle","fa-solid fa-arrows-to-dot","fa-solid fa-arrows-to-eye","fa-solid fa-arrows-turn-right","fa-solid fa-arrows-turn-to-dots","fa-solid fa-arrows-up-down","fa-solid fa-arrows-up-down-left-right","fa-solid fa-arrows-up-to-line","fa-solid fa-asterisk","fa-solid fa-at","fa-solid fa-atom","fa-solid fa-audio-description","fa-solid fa-austral-sign","fa-solid fa-award","fa-solid fa-b","fa-solid fa-baby","fa-solid fa-baby-carriage","fa-solid fa-backward","fa-solid fa-backward-fast","fa-solid fa-backward-step","fa-solid fa-bacon","fa-solid fa-bacteria","fa-solid fa-bacterium","fa-solid fa-bag-shopping","fa-solid fa-bahai","fa-solid fa-baht-sign","fa-solid fa-ban","fa-solid fa-bandage","fa-solid fa-bangladeshi-taka-sign","fa-solid fa-ban-smoking","fa-solid fa-barcode","fa-solid fa-bars","fa-solid fa-bars-progress","fa-solid fa-bars-staggered","fa-solid fa-arrow-pointer","fa-solid fa-arrow-right","fa-solid fa-arrow-right-arrow-left","fa-solid fa-arrow-right-from-bracket","fa-solid fa-arrow-right-long","fa-solid fa-arrow-right-to-bracket","fa-solid fa-arrow-right-to-city","fa-solid fa-arrow-rotate-left","fa-solid fa-arrow-rotate-right","fa-solid fa-arrows-down-to-line","fa-solid fa-arrows-down-to-people","fa-solid fa-arrows-left-right","fa-solid fa-arrows-left-right-to-line","fa-solid fa-arrows-rotate","fa-solid fa-arrows-spin","fa-solid fa-arrows-split-up-and-left","fa-solid fa-arrow-trend-down","fa-solid fa-arrow-trend-up","fa-solid fa-arrow-turn-down","fa-solid fa-arrow-turn-up","fa-solid fa-arrow-up","fa-solid fa-arrow-up-1-9","fa-solid fa-arrow-up-9-1","fa-solid fa-arrow-up-a-z","fa-solid fa-arrow-up-from-bracket","fa-solid fa-arrow-up-from-ground-water","fa-solid fa-arrow-up-from-water-pump","fa-solid fa-arrow-up-long","fa-solid fa-arrow-up-right-dots","fa-solid fa-arrow-up-right-from-square","fa-solid fa-arrow-up-short-wide","fa-solid fa-arrow-up-wide-short","fa-solid fa-arrow-up-z-a","fa-solid fa-address-book","fa-solid fa-address-card","fa-solid fa-align-center","fa-solid fa-align-justify","fa-solid fa-align-left","fa-solid fa-align-right","fa-solid fa-anchor","fa-solid fa-anchor-circle-check","fa-solid fa-anchor-circle-exclamation","fa-solid fa-anchor-circle-xmark","fa-solid fa-anchor-lock","fa-solid fa-angle-down","fa-solid fa-angle-left","fa-solid fa-angle-right","fa-solid fa-angles-down","fa-solid fa-angles-left","fa-solid fa-angles-right","fa-solid fa-angles-up","fa-solid fa-angle-up","fa-solid fa-ankh","fa-solid fa-apple-whole","fa-solid fa-archway","fa-solid fa-arrow-down","fa-solid fa-arrow-down-1-9","fa-solid fa-arrow-down-9-1","fa-solid fa-arrow-down-a-z","fa-solid fa-arrow-down-long","fa-solid fa-arrow-down-short-wide","fa-solid fa-arrow-down-up-across-line","fa-solid fa-arrow-down-up-lock","fa-solid fa-arrow-down-wide-short","fa-solid fa-arrow-down-z-a","fa-solid fa-arrow-left","fa-solid fa-arrow-left-long","fa-solid fa-0","fa-solid fa-1","fa-solid fa-2","fa-solid fa-3","fa-solid fa-4","fa-solid fa-5","fa-solid fa-6","fa-solid fa-7","fa-solid fa-8","fa-solid fa-9","fa-solid fa-a","fa-solid fa-wine-glass","fa-solid fa-wine-glass-empty","fa-solid fa-won-sign"]');

/***/ },

/***/ "./src/google-fonts.min.json"
/*!***********************************!*\
  !*** ./src/google-fonts.min.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('[{"family":"ABeeZee","variants":["regular","italic"],"category":"sans-serif"},{"family":"ADLaM Display","variants":["regular"],"category":"display"},{"family":"AR One Sans","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Abel","variants":["regular"],"category":"sans-serif"},{"family":"Abhaya Libre","variants":["regular","500","600","700","800"],"category":"serif"},{"family":"Aboreto","variants":["regular"],"category":"display"},{"family":"Abril Fatface","variants":["regular"],"category":"display"},{"family":"Abyssinica SIL","variants":["regular"],"category":"serif"},{"family":"Aclonica","variants":["regular"],"category":"sans-serif"},{"family":"Acme","variants":["regular"],"category":"sans-serif"},{"family":"Actor","variants":["regular"],"category":"sans-serif"},{"family":"Adamina","variants":["regular"],"category":"serif"},{"family":"Advent Pro","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Afacad","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Afacad Flux","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Agbalumo","variants":["regular"],"category":"display"},{"family":"Agdasima","variants":["regular","700"],"category":"sans-serif"},{"family":"Agu Display","variants":["regular"],"category":"display"},{"family":"Aguafina Script","variants":["regular"],"category":"handwriting"},{"family":"Akatab","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Akaya Kanadaka","variants":["regular"],"category":"display"},{"family":"Akaya Telivigala","variants":["regular"],"category":"display"},{"family":"Akronim","variants":["regular"],"category":"display"},{"family":"Akshar","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Aladin","variants":["regular"],"category":"display"},{"family":"Alan Sans","variants":["300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Alata","variants":["regular"],"category":"sans-serif"},{"family":"Alatsi","variants":["regular"],"category":"sans-serif"},{"family":"Albert Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Aldrich","variants":["regular"],"category":"sans-serif"},{"family":"Alef","variants":["regular","700"],"category":"sans-serif"},{"family":"Alegreya","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Alegreya SC","variants":["regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"],"category":"serif"},{"family":"Alegreya Sans","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Alegreya Sans SC","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Aleo","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Alex Brush","variants":["regular"],"category":"handwriting"},{"family":"Alexandria","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Alfa Slab One","variants":["regular"],"category":"display"},{"family":"Alice","variants":["regular"],"category":"serif"},{"family":"Alike","variants":["regular"],"category":"serif"},{"family":"Alike Angular","variants":["regular"],"category":"serif"},{"family":"Alkalami","variants":["regular"],"category":"serif"},{"family":"Alkatra","variants":["regular","500","600","700"],"category":"display"},{"family":"Allan","variants":["regular","700"],"category":"display"},{"family":"Allerta","variants":["regular"],"category":"sans-serif"},{"family":"Allerta Stencil","variants":["regular"],"category":"sans-serif"},{"family":"Allison","variants":["regular"],"category":"handwriting"},{"family":"Allkin","variants":["regular"],"category":"display"},{"family":"Allura","variants":["regular"],"category":"handwriting"},{"family":"Almarai","variants":["300","regular","700","800"],"category":"sans-serif"},{"family":"Almendra","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Almendra Display","variants":["regular"],"category":"display"},{"family":"Almendra SC","variants":["regular"],"category":"serif"},{"family":"Alumni Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Alumni Sans Collegiate One","variants":["regular","italic"],"category":"sans-serif"},{"family":"Alumni Sans Inline One","variants":["regular","italic"],"category":"display"},{"family":"Alumni Sans Pinstripe","variants":["regular","italic"],"category":"sans-serif"},{"family":"Alumni Sans SC","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Alyamama","variants":["300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Amarante","variants":["regular"],"category":"display"},{"family":"Amaranth","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Amarna","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Amatic SC","variants":["regular","700"],"category":"handwriting"},{"family":"Amethysta","variants":["regular"],"category":"serif"},{"family":"Amiko","variants":["regular","600","700"],"category":"sans-serif"},{"family":"Amiri","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Amiri Quran","variants":["regular"],"category":"serif"},{"family":"Amita","variants":["regular","700"],"category":"handwriting"},{"family":"Anaheim","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"Ancizar Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Ancizar Serif","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Andada Pro","variants":["regular","500","600","700","800","italic","500italic","600italic","700italic","800italic"],"category":"serif"},{"family":"Andika","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Anek Bangla","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Devanagari","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Gujarati","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Gurmukhi","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Kannada","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Latin","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Malayalam","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Odia","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Tamil","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Anek Telugu","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Angkor","variants":["regular"],"category":"display"},{"family":"Annapurna SIL","variants":["regular","700"],"category":"serif"},{"family":"Annie Use Your Telescope","variants":["regular"],"category":"handwriting"},{"family":"Anonymous Pro","variants":["regular","italic","700","700italic"],"category":"monospace"},{"family":"Anta","variants":["regular"],"category":"sans-serif"},{"family":"Antic","variants":["regular"],"category":"sans-serif"},{"family":"Antic Didone","variants":["regular"],"category":"serif"},{"family":"Antic Slab","variants":["regular"],"category":"serif"},{"family":"Anton","variants":["regular"],"category":"sans-serif"},{"family":"Anton SC","variants":["regular"],"category":"sans-serif"},{"family":"Antonio","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Anuphan","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Anybody","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"display"},{"family":"Aoboshi One","variants":["regular"],"category":"serif"},{"family":"Arapey","variants":["regular","italic"],"category":"serif"},{"family":"Arbutus","variants":["regular"],"category":"serif"},{"family":"Arbutus Slab","variants":["regular"],"category":"serif"},{"family":"Architects Daughter","variants":["regular"],"category":"handwriting"},{"family":"Archivo","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Archivo Black","variants":["regular"],"category":"sans-serif"},{"family":"Archivo Narrow","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Are You Serious","variants":["regular"],"category":"handwriting"},{"family":"Aref Ruqaa","variants":["regular","700"],"category":"serif"},{"family":"Aref Ruqaa Ink","variants":["regular","700"],"category":"serif"},{"family":"Arima","variants":["100","200","300","regular","500","600","700"],"category":"display"},{"family":"Arimo","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Arizonia","variants":["regular"],"category":"handwriting"},{"family":"Armata","variants":["regular"],"category":"sans-serif"},{"family":"Arsenal","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Arsenal SC","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Artifika","variants":["regular"],"category":"serif"},{"family":"Arvo","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Arya","variants":["regular","700"],"category":"sans-serif"},{"family":"Asap","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Asap Condensed","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Asar","variants":["regular"],"category":"serif"},{"family":"Asimovian","variants":["regular"],"category":"sans-serif"},{"family":"Asset","variants":["regular"],"category":"display"},{"family":"Assistant","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Asta Sans","variants":["300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Astloch","variants":["regular","700"],"category":"display"},{"family":"Asul","variants":["regular","700"],"category":"serif"},{"family":"Athiti","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Atkinson Hyperlegible","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Atkinson Hyperlegible Mono","variants":["200","300","regular","500","600","700","800","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Atkinson Hyperlegible Next","variants":["200","300","regular","500","600","700","800","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Atma","variants":["300","regular","500","600","700"],"category":"display"},{"family":"Atomic Age","variants":["regular"],"category":"display"},{"family":"Aubrey","variants":["regular"],"category":"display"},{"family":"Audiowide","variants":["regular"],"category":"display"},{"family":"Autour One","variants":["regular"],"category":"display"},{"family":"Average","variants":["regular"],"category":"serif"},{"family":"Average Sans","variants":["regular"],"category":"sans-serif"},{"family":"Averia Gruesa Libre","variants":["regular"],"category":"display"},{"family":"Averia Libre","variants":["300","300italic","regular","italic","700","700italic"],"category":"display"},{"family":"Averia Sans Libre","variants":["300","300italic","regular","italic","700","700italic"],"category":"display"},{"family":"Averia Serif Libre","variants":["300","300italic","regular","italic","700","700italic"],"category":"display"},{"family":"Azeret Mono","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"monospace"},{"family":"B612","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"B612 Mono","variants":["regular","italic","700","700italic"],"category":"monospace"},{"family":"BBH Bartle","variants":["regular"],"category":"sans-serif"},{"family":"BBH Bogle","variants":["regular"],"category":"sans-serif"},{"family":"BBH Hegarty","variants":["regular"],"category":"sans-serif"},{"family":"BIZ UDGothic","variants":["regular","700"],"category":"sans-serif"},{"family":"BIZ UDMincho","variants":["regular","700"],"category":"serif"},{"family":"BIZ UDPGothic","variants":["regular","700"],"category":"sans-serif"},{"family":"BIZ UDPMincho","variants":["regular","700"],"category":"serif"},{"family":"Babylonica","variants":["regular"],"category":"handwriting"},{"family":"Bacasime Antique","variants":["regular"],"category":"serif"},{"family":"Bad Script","variants":["regular"],"category":"handwriting"},{"family":"Badeen Display","variants":["regular"],"category":"display"},{"family":"Bagel Fat One","variants":["regular"],"category":"display"},{"family":"Bahiana","variants":["regular"],"category":"display"},{"family":"Bahianita","variants":["regular"],"category":"display"},{"family":"Bai Jamjuree","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Bakbak One","variants":["regular"],"category":"display"},{"family":"Ballet","variants":["regular"],"category":"handwriting"},{"family":"Baloo 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Bhai 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Bhaijaan 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Bhaina 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Chettan 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Da 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Paaji 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Tamma 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Tammudu 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Baloo Thambi 2","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Balsamiq Sans","variants":["regular","italic","700","700italic"],"category":"display"},{"family":"Balthazar","variants":["regular"],"category":"serif"},{"family":"Bangers","variants":["regular"],"category":"display"},{"family":"Barlow","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Barlow Condensed","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Barlow Semi Condensed","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Barriecito","variants":["regular"],"category":"display"},{"family":"Barrio","variants":["regular"],"category":"display"},{"family":"Basic","variants":["regular"],"category":"sans-serif"},{"family":"Baskervville","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Baskervville SC","variants":["regular","500","600","700"],"category":"serif"},{"family":"Battambang","variants":["100","300","regular","700","900"],"category":"display"},{"family":"Baumans","variants":["regular"],"category":"display"},{"family":"Bayon","variants":["regular"],"category":"sans-serif"},{"family":"Be Vietnam Pro","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Beau Rivage","variants":["regular"],"category":"handwriting"},{"family":"Bebas Neue","variants":["regular"],"category":"sans-serif"},{"family":"Beiruti","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Belanosima","variants":["regular","600","700"],"category":"sans-serif"},{"family":"Belgrano","variants":["regular"],"category":"serif"},{"family":"Bellefair","variants":["regular"],"category":"serif"},{"family":"Belleza","variants":["regular"],"category":"sans-serif"},{"family":"Bellota","variants":["300","300italic","regular","italic","700","700italic"],"category":"display"},{"family":"Bellota Text","variants":["300","300italic","regular","italic","700","700italic"],"category":"display"},{"family":"BenchNine","variants":["300","regular","700"],"category":"sans-serif"},{"family":"Benne","variants":["regular"],"category":"serif"},{"family":"Bentham","variants":["regular"],"category":"serif"},{"family":"Berkshire Swash","variants":["regular"],"category":"handwriting"},{"family":"Besley","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Betania Patmos","variants":["regular"],"category":"handwriting"},{"family":"Betania Patmos GDL","variants":["regular"],"category":"handwriting"},{"family":"Betania Patmos In","variants":["regular"],"category":"handwriting"},{"family":"Betania Patmos In GDL","variants":["regular"],"category":"handwriting"},{"family":"Beth Ellen","variants":["regular"],"category":"handwriting"},{"family":"Bevan","variants":["regular","italic"],"category":"serif"},{"family":"BhuTuka Expanded One","variants":["regular"],"category":"serif"},{"family":"Big Shoulders","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Big Shoulders Inline","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Big Shoulders Stencil","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bigelow Rules","variants":["regular"],"category":"display"},{"family":"Bigshot One","variants":["regular"],"category":"display"},{"family":"Bilbo","variants":["regular"],"category":"handwriting"},{"family":"Bilbo Swash Caps","variants":["regular"],"category":"handwriting"},{"family":"BioRhyme","variants":["200","300","regular","500","600","700","800"],"category":"serif"},{"family":"BioRhyme Expanded","variants":["200","300","regular","700","800"],"category":"serif"},{"family":"Birthstone","variants":["regular"],"category":"handwriting"},{"family":"Birthstone Bounce","variants":["regular","500"],"category":"handwriting"},{"family":"Biryani","variants":["200","300","regular","600","700","800","900"],"category":"sans-serif"},{"family":"Bitcount","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Grid Double","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Grid Double Ink","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Grid Single","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Grid Single Ink","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Ink","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Prop Double","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Prop Double Ink","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Prop Single","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Prop Single Ink","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Single","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitcount Single Ink","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Bitter","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Black And White Picture","variants":["regular"],"category":"display"},{"family":"Black Han Sans","variants":["regular"],"category":"sans-serif"},{"family":"Black Ops One","variants":["regular"],"category":"display"},{"family":"Blaka","variants":["regular"],"category":"display"},{"family":"Blaka Hollow","variants":["regular"],"category":"display"},{"family":"Blaka Ink","variants":["regular"],"category":"display"},{"family":"Blinker","variants":["100","200","300","regular","600","700","800","900"],"category":"sans-serif"},{"family":"Bodoni Moda","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Bodoni Moda SC","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Bokor","variants":["regular"],"category":"display"},{"family":"Boldonse","variants":["regular"],"category":"display"},{"family":"Bona Nova","variants":["regular","italic","700"],"category":"serif"},{"family":"Bona Nova SC","variants":["regular","italic","700"],"category":"serif"},{"family":"Bonbon","variants":["regular"],"category":"handwriting"},{"family":"Bonheur Royale","variants":["regular"],"category":"handwriting"},{"family":"Boogaloo","variants":["regular"],"category":"display"},{"family":"Borel","variants":["regular"],"category":"handwriting"},{"family":"Bowlby One","variants":["regular"],"category":"display"},{"family":"Bowlby One SC","variants":["regular"],"category":"display"},{"family":"Bpmf Huninn","variants":["regular"],"category":"sans-serif"},{"family":"Bpmf Iansui","variants":["regular"],"category":"handwriting"},{"family":"Bpmf Zihi Kai Std","variants":["regular"],"category":"sans-serif"},{"family":"Braah One","variants":["regular"],"category":"sans-serif"},{"family":"Brawler","variants":["regular","700"],"category":"serif"},{"family":"Bree Serif","variants":["regular"],"category":"serif"},{"family":"Bricolage Grotesque","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Bruno Ace","variants":["regular"],"category":"display"},{"family":"Bruno Ace SC","variants":["regular"],"category":"display"},{"family":"Brygada 1918","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Bubblegum Sans","variants":["regular"],"category":"display"},{"family":"Bubbler One","variants":["regular"],"category":"sans-serif"},{"family":"Buda","variants":["300"],"category":"display"},{"family":"Buenard","variants":["regular","500","600","700"],"category":"serif"},{"family":"Bungee","variants":["regular"],"category":"display"},{"family":"Bungee Hairline","variants":["regular"],"category":"display"},{"family":"Bungee Inline","variants":["regular"],"category":"display"},{"family":"Bungee Outline","variants":["regular"],"category":"display"},{"family":"Bungee Shade","variants":["regular"],"category":"display"},{"family":"Bungee Spice","variants":["regular"],"category":"display"},{"family":"Bungee Tint","variants":["regular"],"category":"display"},{"family":"Butcherman","variants":["regular"],"category":"display"},{"family":"Butterfly Kids","variants":["regular"],"category":"handwriting"},{"family":"Bytesized","variants":["regular"],"category":"sans-serif"},{"family":"Cabin","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Cabin Condensed","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Cabin Sketch","variants":["regular","700"],"category":"display"},{"family":"Cactus Classical Serif","variants":["regular"],"category":"serif"},{"family":"Caesar Dressing","variants":["regular"],"category":"display"},{"family":"Cagliostro","variants":["regular"],"category":"sans-serif"},{"family":"Cairo","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Cairo Play","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Cal Sans","variants":["regular"],"category":"sans-serif"},{"family":"Caladea","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Calistoga","variants":["regular"],"category":"display"},{"family":"Calligraffitti","variants":["regular"],"category":"handwriting"},{"family":"Cambay","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Cambo","variants":["regular"],"category":"serif"},{"family":"Candal","variants":["regular"],"category":"sans-serif"},{"family":"Cantarell","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Cantata One","variants":["regular"],"category":"serif"},{"family":"Cantora One","variants":["regular"],"category":"sans-serif"},{"family":"Caprasimo","variants":["regular"],"category":"display"},{"family":"Capriola","variants":["regular"],"category":"sans-serif"},{"family":"Caramel","variants":["regular"],"category":"handwriting"},{"family":"Carattere","variants":["regular"],"category":"handwriting"},{"family":"Cardo","variants":["regular","italic","700"],"category":"serif"},{"family":"Carlito","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Carme","variants":["regular"],"category":"sans-serif"},{"family":"Carrois Gothic","variants":["regular"],"category":"sans-serif"},{"family":"Carrois Gothic SC","variants":["regular"],"category":"sans-serif"},{"family":"Carter One","variants":["regular"],"category":"display"},{"family":"Cascadia Code","variants":["200","300","regular","500","600","700","200italic","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Cascadia Mono","variants":["200","300","regular","500","600","700","200italic","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Castoro","variants":["regular","italic"],"category":"serif"},{"family":"Castoro Titling","variants":["regular"],"category":"display"},{"family":"Catamaran","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Caudex","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Cause","variants":["100","200","300","regular","500","600","700","800","900"],"category":"handwriting"},{"family":"Caveat","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Caveat Brush","variants":["regular"],"category":"handwriting"},{"family":"Cedarville Cursive","variants":["regular"],"category":"handwriting"},{"family":"Ceviche One","variants":["regular"],"category":"display"},{"family":"Chakra Petch","variants":["300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Changa","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Changa One","variants":["regular","italic"],"category":"display"},{"family":"Chango","variants":["regular"],"category":"display"},{"family":"Charis SIL","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Charm","variants":["regular","700"],"category":"handwriting"},{"family":"Charmonman","variants":["regular","700"],"category":"handwriting"},{"family":"Chathura","variants":["100","300","regular","700","800"],"category":"sans-serif"},{"family":"Chau Philomene One","variants":["regular","italic"],"category":"sans-serif"},{"family":"Chela One","variants":["regular"],"category":"display"},{"family":"Chelsea Market","variants":["regular"],"category":"display"},{"family":"Chenla","variants":["regular"],"category":"display"},{"family":"Cherish","variants":["regular"],"category":"handwriting"},{"family":"Cherry Bomb One","variants":["regular"],"category":"display"},{"family":"Cherry Cream Soda","variants":["regular"],"category":"display"},{"family":"Cherry Swash","variants":["regular","700"],"category":"display"},{"family":"Chewy","variants":["regular"],"category":"display"},{"family":"Chicle","variants":["regular"],"category":"display"},{"family":"Chilanka","variants":["regular"],"category":"handwriting"},{"family":"Chiron GoRound TC","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Chiron Hei HK","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Chiron Sung HK","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Chivo","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Chivo Mono","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"monospace"},{"family":"Chocolate Classical Sans","variants":["regular"],"category":"sans-serif"},{"family":"Chokokutai","variants":["regular"],"category":"display"},{"family":"Chonburi","variants":["regular"],"category":"display"},{"family":"Cinzel","variants":["regular","500","600","700","800","900"],"category":"serif"},{"family":"Cinzel Decorative","variants":["regular","700","900"],"category":"display"},{"family":"Clicker Script","variants":["regular"],"category":"handwriting"},{"family":"Climate Crisis","variants":["regular"],"category":"display"},{"family":"Coda","variants":["regular","800"],"category":"display"},{"family":"Codystar","variants":["300","regular"],"category":"display"},{"family":"Coiny","variants":["regular"],"category":"display"},{"family":"Combo","variants":["regular"],"category":"display"},{"family":"Comfortaa","variants":["300","regular","500","600","700"],"category":"display"},{"family":"Comforter","variants":["regular"],"category":"handwriting"},{"family":"Comforter Brush","variants":["regular"],"category":"handwriting"},{"family":"Comic Neue","variants":["300","300italic","regular","italic","700","700italic"],"category":"handwriting"},{"family":"Comic Relief","variants":["regular","700"],"category":"display"},{"family":"Coming Soon","variants":["regular"],"category":"handwriting"},{"family":"Comme","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Commissioner","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Concert One","variants":["regular"],"category":"display"},{"family":"Condiment","variants":["regular"],"category":"handwriting"},{"family":"Content","variants":["regular","700"],"category":"display"},{"family":"Contrail One","variants":["regular"],"category":"display"},{"family":"Convergence","variants":["regular"],"category":"sans-serif"},{"family":"Cookie","variants":["regular"],"category":"handwriting"},{"family":"Copse","variants":["regular"],"category":"serif"},{"family":"Coral Pixels","variants":["regular"],"category":"display"},{"family":"Corben","variants":["regular","700"],"category":"display"},{"family":"Corinthia","variants":["regular","700"],"category":"handwriting"},{"family":"Cormorant","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Cormorant Garamond","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Cormorant Infant","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Cormorant SC","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Cormorant Unicase","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Cormorant Upright","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Cossette Texte","variants":["regular","700"],"category":"sans-serif"},{"family":"Cossette Titre","variants":["regular","700"],"category":"sans-serif"},{"family":"Courgette","variants":["regular"],"category":"handwriting"},{"family":"Courier Prime","variants":["regular","italic","700","700italic"],"category":"monospace"},{"family":"Cousine","variants":["regular","italic","700","700italic"],"category":"monospace"},{"family":"Coustard","variants":["regular","900"],"category":"serif"},{"family":"Covered By Your Grace","variants":["regular"],"category":"handwriting"},{"family":"Crafty Girls","variants":["regular"],"category":"handwriting"},{"family":"Creepster","variants":["regular"],"category":"display"},{"family":"Crete Round","variants":["regular","italic"],"category":"serif"},{"family":"Crimson Pro","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Crimson Text","variants":["regular","italic","600","600italic","700","700italic"],"category":"serif"},{"family":"Croissant One","variants":["regular"],"category":"display"},{"family":"Crushed","variants":["regular"],"category":"display"},{"family":"Cuprum","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Cute Font","variants":["regular"],"category":"display"},{"family":"Cutive","variants":["regular"],"category":"serif"},{"family":"Cutive Mono","variants":["regular"],"category":"monospace"},{"family":"DM Mono","variants":["300","300italic","regular","italic","500","500italic"],"category":"monospace"},{"family":"DM Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"DM Serif Display","variants":["regular","italic"],"category":"serif"},{"family":"DM Serif Text","variants":["regular","italic"],"category":"serif"},{"family":"Dai Banna SIL","variants":["300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"serif"},{"family":"Damion","variants":["regular"],"category":"handwriting"},{"family":"Dancing Script","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Danfo","variants":["regular"],"category":"serif"},{"family":"Dangrek","variants":["regular"],"category":"display"},{"family":"Darker Grotesque","variants":["300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Darumadrop One","variants":["regular"],"category":"display"},{"family":"David Libre","variants":["regular","500","700"],"category":"serif"},{"family":"Dawning of a New Day","variants":["regular"],"category":"handwriting"},{"family":"Days One","variants":["regular"],"category":"sans-serif"},{"family":"Dekko","variants":["regular"],"category":"handwriting"},{"family":"Dela Gothic One","variants":["regular"],"category":"display"},{"family":"Delicious Handrawn","variants":["regular"],"category":"handwriting"},{"family":"Delius","variants":["regular"],"category":"handwriting"},{"family":"Delius Swash Caps","variants":["regular"],"category":"handwriting"},{"family":"Delius Unicase","variants":["regular","700"],"category":"handwriting"},{"family":"Della Respira","variants":["regular"],"category":"serif"},{"family":"Denk One","variants":["regular"],"category":"sans-serif"},{"family":"Devonshire","variants":["regular"],"category":"handwriting"},{"family":"Dhurjati","variants":["regular"],"category":"sans-serif"},{"family":"Didact Gothic","variants":["regular"],"category":"sans-serif"},{"family":"Diphylleia","variants":["regular"],"category":"serif"},{"family":"Diplomata","variants":["regular"],"category":"display"},{"family":"Diplomata SC","variants":["regular"],"category":"display"},{"family":"Do Hyeon","variants":["regular"],"category":"sans-serif"},{"family":"Dokdo","variants":["regular"],"category":"display"},{"family":"Domine","variants":["regular","500","600","700"],"category":"serif"},{"family":"Donegal One","variants":["regular"],"category":"serif"},{"family":"Dongle","variants":["300","regular","700"],"category":"sans-serif"},{"family":"Doppio One","variants":["regular"],"category":"sans-serif"},{"family":"Dorsa","variants":["regular"],"category":"sans-serif"},{"family":"Dosis","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"DotGothic16","variants":["regular"],"category":"sans-serif"},{"family":"Doto","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Dr Sugiyama","variants":["regular"],"category":"handwriting"},{"family":"Duru Sans","variants":["regular"],"category":"sans-serif"},{"family":"DynaPuff","variants":["regular","500","600","700"],"category":"display"},{"family":"Dynalight","variants":["regular"],"category":"display"},{"family":"EB Garamond","variants":["regular","500","600","700","800","italic","500italic","600italic","700italic","800italic"],"category":"serif"},{"family":"Eagle Lake","variants":["regular"],"category":"handwriting"},{"family":"East Sea Dokdo","variants":["regular"],"category":"handwriting"},{"family":"Eater","variants":["regular"],"category":"display"},{"family":"Economica","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Eczar","variants":["regular","500","600","700","800"],"category":"serif"},{"family":"Edu AU VIC WA NT Arrows","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu AU VIC WA NT Dots","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu AU VIC WA NT Guides","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu AU VIC WA NT Hand","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu AU VIC WA NT Pre","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu NSW ACT Cursive","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu NSW ACT Foundation","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu NSW ACT Hand Pre","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu QLD Beginner","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu QLD Hand","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu SA Beginner","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu SA Hand","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu TAS Beginner","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu VIC WA NT Beginner","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu VIC WA NT Hand","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"Edu VIC WA NT Hand Pre","variants":["regular","500","600","700"],"category":"handwriting"},{"family":"El Messiri","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Electrolize","variants":["regular"],"category":"sans-serif"},{"family":"Elms Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Elsie","variants":["regular","900"],"category":"display"},{"family":"Elsie Swash Caps","variants":["regular","900"],"category":"display"},{"family":"Emblema One","variants":["regular"],"category":"display"},{"family":"Emilys Candy","variants":["regular"],"category":"display"},{"family":"Encode Sans","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Encode Sans Condensed","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Encode Sans Expanded","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Encode Sans SC","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Encode Sans Semi Condensed","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Encode Sans Semi Expanded","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Engagement","variants":["regular"],"category":"handwriting"},{"family":"Englebert","variants":["regular"],"category":"sans-serif"},{"family":"Enriqueta","variants":["regular","500","600","700"],"category":"serif"},{"family":"Ephesis","variants":["regular"],"category":"handwriting"},{"family":"Epilogue","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Epunda Sans","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Epunda Slab","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Erica One","variants":["regular"],"category":"display"},{"family":"Esteban","variants":["regular"],"category":"serif"},{"family":"Estonia","variants":["regular"],"category":"handwriting"},{"family":"Euphoria Script","variants":["regular"],"category":"handwriting"},{"family":"Ewert","variants":["regular"],"category":"display"},{"family":"Exile","variants":["regular"],"category":"display"},{"family":"Exo","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Exo 2","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Expletus Sans","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"display"},{"family":"Explora","variants":["regular"],"category":"handwriting"},{"family":"Faculty Glyphic","variants":["regular"],"category":"sans-serif"},{"family":"Fahkwang","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Familjen Grotesk","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Fanwood Text","variants":["regular","italic"],"category":"serif"},{"family":"Farro","variants":["300","regular","500","700"],"category":"sans-serif"},{"family":"Farsan","variants":["regular"],"category":"display"},{"family":"Fascinate","variants":["regular"],"category":"display"},{"family":"Fascinate Inline","variants":["regular"],"category":"display"},{"family":"Faster One","variants":["regular"],"category":"display"},{"family":"Fasthand","variants":["regular"],"category":"display"},{"family":"Fauna One","variants":["regular"],"category":"serif"},{"family":"Faustina","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"serif"},{"family":"Federant","variants":["regular"],"category":"display"},{"family":"Federo","variants":["regular"],"category":"sans-serif"},{"family":"Felipa","variants":["regular"],"category":"handwriting"},{"family":"Fenix","variants":["regular"],"category":"serif"},{"family":"Festive","variants":["regular"],"category":"handwriting"},{"family":"Figtree","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Finger Paint","variants":["regular"],"category":"display"},{"family":"Finlandica","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Fira Code","variants":["300","regular","500","600","700"],"category":"monospace"},{"family":"Fira Mono","variants":["regular","500","700"],"category":"monospace"},{"family":"Fira Sans","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Fira Sans Condensed","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Fira Sans Extra Condensed","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Fjalla One","variants":["regular"],"category":"sans-serif"},{"family":"Fjord One","variants":["regular"],"category":"serif"},{"family":"Flamenco","variants":["300","regular"],"category":"display"},{"family":"Flavors","variants":["regular"],"category":"display"},{"family":"Fleur De Leah","variants":["regular"],"category":"handwriting"},{"family":"Flow Block","variants":["regular"],"category":"display"},{"family":"Flow Circular","variants":["regular"],"category":"display"},{"family":"Flow Rounded","variants":["regular"],"category":"display"},{"family":"Foldit","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Fondamento","variants":["regular","italic"],"category":"handwriting"},{"family":"Fontdiner Swanky","variants":["regular"],"category":"display"},{"family":"Forum","variants":["regular"],"category":"display"},{"family":"Fragment Mono","variants":["regular","italic"],"category":"monospace"},{"family":"Francois One","variants":["regular"],"category":"sans-serif"},{"family":"Frank Ruhl Libre","variants":["300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Fraunces","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Freckle Face","variants":["regular"],"category":"display"},{"family":"Fredericka the Great","variants":["regular"],"category":"display"},{"family":"Fredoka","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Freehand","variants":["regular"],"category":"display"},{"family":"Freeman","variants":["regular"],"category":"display"},{"family":"Fresca","variants":["regular"],"category":"sans-serif"},{"family":"Frijole","variants":["regular"],"category":"display"},{"family":"Fruktur","variants":["regular","italic"],"category":"display"},{"family":"Fugaz One","variants":["regular"],"category":"display"},{"family":"Fuggles","variants":["regular"],"category":"handwriting"},{"family":"Funnel Display","variants":["300","regular","500","600","700","800"],"category":"display"},{"family":"Funnel Sans","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Fustat","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Fuzzy Bubbles","variants":["regular","700"],"category":"handwriting"},{"family":"GFS Didot","variants":["regular"],"category":"serif"},{"family":"GFS Neohellenic","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Ga Maamli","variants":["regular"],"category":"display"},{"family":"Gabarito","variants":["regular","500","600","700","800","900"],"category":"display"},{"family":"Gabriela","variants":["regular"],"category":"serif"},{"family":"Gaegu","variants":["300","regular","700"],"category":"handwriting"},{"family":"Gafata","variants":["regular"],"category":"sans-serif"},{"family":"Gajraj One","variants":["regular"],"category":"display"},{"family":"Galada","variants":["regular"],"category":"display"},{"family":"Galdeano","variants":["regular"],"category":"sans-serif"},{"family":"Galindo","variants":["regular"],"category":"display"},{"family":"Gamja Flower","variants":["regular"],"category":"handwriting"},{"family":"Gantari","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Gasoek One","variants":["regular"],"category":"sans-serif"},{"family":"Gayathri","variants":["100","regular","700"],"category":"sans-serif"},{"family":"Geist","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Geist Mono","variants":["100","200","300","regular","500","600","700","800","900"],"category":"monospace"},{"family":"Gelasio","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Gemunu Libre","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Genos","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Gentium Book Plus","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Gentium Plus","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Geo","variants":["regular","italic"],"category":"sans-serif"},{"family":"Geologica","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Geom","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Georama","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Geostar","variants":["regular"],"category":"display"},{"family":"Geostar Fill","variants":["regular"],"category":"display"},{"family":"Germania One","variants":["regular"],"category":"display"},{"family":"Gideon Roman","variants":["regular"],"category":"display"},{"family":"Gidole","variants":["regular"],"category":"sans-serif"},{"family":"Gidugu","variants":["regular"],"category":"sans-serif"},{"family":"Gilda Display","variants":["regular"],"category":"serif"},{"family":"Girassol","variants":["regular"],"category":"display"},{"family":"Give You Glory","variants":["regular"],"category":"handwriting"},{"family":"Glass Antiqua","variants":["regular"],"category":"display"},{"family":"Glegoo","variants":["regular","700"],"category":"serif"},{"family":"Gloock","variants":["regular"],"category":"serif"},{"family":"Gloria Hallelujah","variants":["regular"],"category":"handwriting"},{"family":"Glory","variants":["100","200","300","regular","500","600","700","800","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Gluten","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Goblin One","variants":["regular"],"category":"display"},{"family":"Gochi Hand","variants":["regular"],"category":"handwriting"},{"family":"Goldman","variants":["regular","700"],"category":"display"},{"family":"Golos Text","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Google Sans","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Google Sans Code","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"monospace"},{"family":"Google Sans Flex","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Gorditas","variants":["regular","700"],"category":"display"},{"family":"Gothic A1","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Gotu","variants":["regular"],"category":"sans-serif"},{"family":"Goudy Bookletter 1911","variants":["regular"],"category":"serif"},{"family":"Gowun Batang","variants":["regular","700"],"category":"serif"},{"family":"Gowun Dodum","variants":["regular"],"category":"sans-serif"},{"family":"Graduate","variants":["regular"],"category":"serif"},{"family":"Grand Hotel","variants":["regular"],"category":"handwriting"},{"family":"Grandiflora One","variants":["regular"],"category":"serif"},{"family":"Grandstander","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"display"},{"family":"Grape Nuts","variants":["regular"],"category":"handwriting"},{"family":"Gravitas One","variants":["regular"],"category":"display"},{"family":"Great Vibes","variants":["regular"],"category":"handwriting"},{"family":"Grechen Fuemen","variants":["regular"],"category":"handwriting"},{"family":"Grenze","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"serif"},{"family":"Grenze Gotisch","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Grey Qo","variants":["regular"],"category":"handwriting"},{"family":"Griffy","variants":["regular"],"category":"display"},{"family":"Gruppo","variants":["regular"],"category":"sans-serif"},{"family":"Gudea","variants":["regular","italic","700"],"category":"sans-serif"},{"family":"Gugi","variants":["regular"],"category":"display"},{"family":"Gulzar","variants":["regular"],"category":"serif"},{"family":"Gupter","variants":["regular","500","700"],"category":"serif"},{"family":"Gurajada","variants":["regular"],"category":"sans-serif"},{"family":"Gveret Levin","variants":["regular"],"category":"handwriting"},{"family":"Gwendolyn","variants":["regular","700"],"category":"handwriting"},{"family":"Habibi","variants":["regular"],"category":"serif"},{"family":"Hachi Maru Pop","variants":["regular"],"category":"handwriting"},{"family":"Hahmlet","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Halant","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Hammersmith One","variants":["regular"],"category":"sans-serif"},{"family":"Hanalei","variants":["regular"],"category":"display"},{"family":"Hanalei Fill","variants":["regular"],"category":"display"},{"family":"Handjet","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Handlee","variants":["regular"],"category":"handwriting"},{"family":"Hanken Grotesk","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Hanuman","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Happy Monkey","variants":["regular"],"category":"display"},{"family":"Harmattan","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Headland One","variants":["regular"],"category":"serif"},{"family":"Hedvig Letters Sans","variants":["regular"],"category":"sans-serif"},{"family":"Hedvig Letters Serif","variants":["regular"],"category":"serif"},{"family":"Heebo","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Henny Penny","variants":["regular"],"category":"display"},{"family":"Hepta Slab","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Herr Von Muellerhoff","variants":["regular"],"category":"handwriting"},{"family":"Hi Melody","variants":["regular"],"category":"handwriting"},{"family":"Hina Mincho","variants":["regular"],"category":"serif"},{"family":"Hind","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Hind Guntur","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Hind Madurai","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Hind Mysuru","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Hind Siliguri","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Hind Vadodara","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Holtwood One SC","variants":["regular"],"category":"serif"},{"family":"Homemade Apple","variants":["regular"],"category":"handwriting"},{"family":"Homenaje","variants":["regular"],"category":"sans-serif"},{"family":"Honk","variants":["regular"],"category":"display"},{"family":"Host Grotesk","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Hubballi","variants":["regular"],"category":"sans-serif"},{"family":"Hubot Sans","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Huninn","variants":["regular"],"category":"sans-serif"},{"family":"Hurricane","variants":["regular"],"category":"handwriting"},{"family":"IBM Plex Mono","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"monospace"},{"family":"IBM Plex Sans","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"IBM Plex Sans Arabic","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Sans Condensed","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"IBM Plex Sans Devanagari","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Sans Hebrew","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Sans JP","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Sans KR","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Sans Thai","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Sans Thai Looped","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"IBM Plex Serif","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"serif"},{"family":"IM Fell DW Pica","variants":["regular","italic"],"category":"serif"},{"family":"IM Fell DW Pica SC","variants":["regular"],"category":"serif"},{"family":"IM Fell Double Pica","variants":["regular","italic"],"category":"serif"},{"family":"IM Fell Double Pica SC","variants":["regular"],"category":"serif"},{"family":"IM Fell English","variants":["regular","italic"],"category":"serif"},{"family":"IM Fell English SC","variants":["regular"],"category":"serif"},{"family":"IM Fell French Canon","variants":["regular","italic"],"category":"serif"},{"family":"IM Fell French Canon SC","variants":["regular"],"category":"serif"},{"family":"IM Fell Great Primer","variants":["regular","italic"],"category":"serif"},{"family":"IM Fell Great Primer SC","variants":["regular"],"category":"serif"},{"family":"Iansui","variants":["regular"],"category":"handwriting"},{"family":"Ibarra Real Nova","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Iceberg","variants":["regular"],"category":"display"},{"family":"Iceland","variants":["regular"],"category":"display"},{"family":"Idiqlat","variants":["200","300","regular"],"category":"serif"},{"family":"Imbue","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Imperial Script","variants":["regular"],"category":"handwriting"},{"family":"Imprima","variants":["regular"],"category":"sans-serif"},{"family":"Inclusive Sans","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Inconsolata","variants":["200","300","regular","500","600","700","800","900"],"category":"monospace"},{"family":"Inder","variants":["regular"],"category":"sans-serif"},{"family":"Indie Flower","variants":["regular"],"category":"handwriting"},{"family":"Ingrid Darling","variants":["regular"],"category":"handwriting"},{"family":"Inika","variants":["regular","700"],"category":"serif"},{"family":"Inknut Antiqua","variants":["300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Inria Sans","variants":["300","300italic","regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Inria Serif","variants":["300","300italic","regular","italic","700","700italic"],"category":"serif"},{"family":"Inspiration","variants":["regular"],"category":"handwriting"},{"family":"Instrument Sans","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Instrument Serif","variants":["regular","italic"],"category":"serif"},{"family":"Intel One Mono","variants":["300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"monospace"},{"family":"Inter","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Inter Tight","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Irish Grover","variants":["regular"],"category":"display"},{"family":"Island Moments","variants":["regular"],"category":"handwriting"},{"family":"Istok Web","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Italiana","variants":["regular"],"category":"sans-serif"},{"family":"Italianno","variants":["regular"],"category":"handwriting"},{"family":"Itim","variants":["regular"],"category":"handwriting"},{"family":"Jacquard 12","variants":["regular"],"category":"display"},{"family":"Jacquard 12 Charted","variants":["regular"],"category":"display"},{"family":"Jacquard 24","variants":["regular"],"category":"display"},{"family":"Jacquard 24 Charted","variants":["regular"],"category":"display"},{"family":"Jacquarda Bastarda 9","variants":["regular"],"category":"display"},{"family":"Jacquarda Bastarda 9 Charted","variants":["regular"],"category":"display"},{"family":"Jacques Francois","variants":["regular"],"category":"serif"},{"family":"Jacques Francois Shadow","variants":["regular"],"category":"display"},{"family":"Jaini","variants":["regular"],"category":"display"},{"family":"Jaini Purva","variants":["regular"],"category":"display"},{"family":"Jaldi","variants":["regular","700"],"category":"sans-serif"},{"family":"Jaro","variants":["regular"],"category":"sans-serif"},{"family":"Jersey 10","variants":["regular"],"category":"display"},{"family":"Jersey 10 Charted","variants":["regular"],"category":"display"},{"family":"Jersey 15","variants":["regular"],"category":"display"},{"family":"Jersey 15 Charted","variants":["regular"],"category":"display"},{"family":"Jersey 20","variants":["regular"],"category":"display"},{"family":"Jersey 20 Charted","variants":["regular"],"category":"display"},{"family":"Jersey 25","variants":["regular"],"category":"display"},{"family":"Jersey 25 Charted","variants":["regular"],"category":"display"},{"family":"JetBrains Mono","variants":["100","200","300","regular","500","600","700","800","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"monospace"},{"family":"Jim Nightshade","variants":["regular"],"category":"handwriting"},{"family":"Joan","variants":["regular"],"category":"serif"},{"family":"Jockey One","variants":["regular"],"category":"sans-serif"},{"family":"Jolly Lodger","variants":["regular"],"category":"display"},{"family":"Jomhuria","variants":["regular"],"category":"display"},{"family":"Jomolhari","variants":["regular"],"category":"serif"},{"family":"Josefin Sans","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Josefin Slab","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Jost","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Joti One","variants":["regular"],"category":"display"},{"family":"Jua","variants":["regular"],"category":"sans-serif"},{"family":"Judson","variants":["regular","italic","700"],"category":"serif"},{"family":"Julee","variants":["regular"],"category":"handwriting"},{"family":"Julius Sans One","variants":["regular"],"category":"sans-serif"},{"family":"Junge","variants":["regular"],"category":"serif"},{"family":"Jura","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Just Another Hand","variants":["regular"],"category":"handwriting"},{"family":"Just Me Again Down Here","variants":["regular"],"category":"handwriting"},{"family":"K2D","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic"],"category":"sans-serif"},{"family":"Kablammo","variants":["regular"],"category":"display"},{"family":"Kadwa","variants":["regular","700"],"category":"serif"},{"family":"Kaisei Decol","variants":["regular","500","700"],"category":"serif"},{"family":"Kaisei HarunoUmi","variants":["regular","500","700"],"category":"serif"},{"family":"Kaisei Opti","variants":["regular","500","700"],"category":"serif"},{"family":"Kaisei Tokumin","variants":["regular","500","700","800"],"category":"serif"},{"family":"Kalam","variants":["300","regular","700"],"category":"handwriting"},{"family":"Kalnia","variants":["100","200","300","regular","500","600","700"],"category":"serif"},{"family":"Kalnia Glaze","variants":["100","200","300","regular","500","600","700"],"category":"display"},{"family":"Kameron","variants":["regular","500","600","700"],"category":"serif"},{"family":"Kanchenjunga","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Kanit","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Kantumruy Pro","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Kapakana","variants":["300","regular"],"category":"handwriting"},{"family":"Karantina","variants":["300","regular","700"],"category":"display"},{"family":"Karla","variants":["200","300","regular","500","600","700","800","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Karla Tamil Inclined","variants":["regular","700"],"category":"sans-serif"},{"family":"Karla Tamil Upright","variants":["regular","700"],"category":"sans-serif"},{"family":"Karma","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Katibeh","variants":["regular"],"category":"display"},{"family":"Kaushan Script","variants":["regular"],"category":"handwriting"},{"family":"Kavivanar","variants":["regular"],"category":"handwriting"},{"family":"Kavoon","variants":["regular"],"category":"display"},{"family":"Kay Pho Du","variants":["regular","500","600","700"],"category":"serif"},{"family":"Kdam Thmor Pro","variants":["regular"],"category":"sans-serif"},{"family":"Keania One","variants":["regular"],"category":"display"},{"family":"Kedebideri","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Kelly Slab","variants":["regular"],"category":"display"},{"family":"Kenia","variants":["regular"],"category":"display"},{"family":"Khand","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Khmer","variants":["regular"],"category":"sans-serif"},{"family":"Khula","variants":["300","regular","600","700","800"],"category":"sans-serif"},{"family":"Kings","variants":["regular"],"category":"handwriting"},{"family":"Kirang Haerang","variants":["regular"],"category":"display"},{"family":"Kite One","variants":["regular"],"category":"sans-serif"},{"family":"Kiwi Maru","variants":["300","regular","500"],"category":"serif"},{"family":"Klee One","variants":["regular","600"],"category":"handwriting"},{"family":"Knewave","variants":["regular"],"category":"display"},{"family":"KoHo","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Kodchasan","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Kode Mono","variants":["regular","500","600","700"],"category":"monospace"},{"family":"Koh Santepheap","variants":["100","300","regular","700","900"],"category":"serif"},{"family":"Kolker Brush","variants":["regular"],"category":"handwriting"},{"family":"Konkhmer Sleokchher","variants":["regular"],"category":"display"},{"family":"Kosugi","variants":["regular"],"category":"sans-serif"},{"family":"Kosugi Maru","variants":["regular"],"category":"sans-serif"},{"family":"Kotta One","variants":["regular"],"category":"serif"},{"family":"Koulen","variants":["regular"],"category":"display"},{"family":"Kranky","variants":["regular"],"category":"display"},{"family":"Kreon","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Kristi","variants":["regular"],"category":"handwriting"},{"family":"Krona One","variants":["regular"],"category":"sans-serif"},{"family":"Krub","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Kufam","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Kulim Park","variants":["200","200italic","300","300italic","regular","italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Kumar One","variants":["regular"],"category":"display"},{"family":"Kumar One Outline","variants":["regular"],"category":"display"},{"family":"Kumbh Sans","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Kurale","variants":["regular"],"category":"serif"},{"family":"LINE Seed JP","variants":["100","regular","700","800"],"category":"sans-serif"},{"family":"LXGW Marker Gothic","variants":["regular"],"category":"sans-serif"},{"family":"LXGW WenKai Mono TC","variants":["300","regular","700"],"category":"monospace"},{"family":"LXGW WenKai TC","variants":["300","regular","700"],"category":"handwriting"},{"family":"La Belle Aurore","variants":["regular"],"category":"handwriting"},{"family":"Labrada","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Lacquer","variants":["regular"],"category":"display"},{"family":"Laila","variants":["300","regular","500","600","700"],"category":"serif"},{"family":"Lakki Reddy","variants":["regular"],"category":"handwriting"},{"family":"Lalezar","variants":["regular"],"category":"sans-serif"},{"family":"Lancelot","variants":["regular"],"category":"display"},{"family":"Langar","variants":["regular"],"category":"display"},{"family":"Lateef","variants":["200","300","regular","500","600","700","800"],"category":"serif"},{"family":"Lato","variants":["100","100italic","300","300italic","regular","italic","700","700italic","900","900italic"],"category":"sans-serif"},{"family":"Lavishly Yours","variants":["regular"],"category":"handwriting"},{"family":"League Gothic","variants":["regular"],"category":"sans-serif"},{"family":"League Script","variants":["regular"],"category":"handwriting"},{"family":"League Spartan","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Leckerli One","variants":["regular"],"category":"handwriting"},{"family":"Ledger","variants":["regular"],"category":"serif"},{"family":"Lekton","variants":["regular","italic","700"],"category":"monospace"},{"family":"Lemon","variants":["regular"],"category":"display"},{"family":"Lemonada","variants":["300","regular","500","600","700"],"category":"display"},{"family":"Lexend","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Deca","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Exa","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Giga","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Mega","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Peta","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Tera","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Lexend Zetta","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Libertinus Keyboard","variants":["regular"],"category":"display"},{"family":"Libertinus Math","variants":["regular"],"category":"display"},{"family":"Libertinus Mono","variants":["regular"],"category":"monospace"},{"family":"Libertinus Sans","variants":["regular","italic","700"],"category":"sans-serif"},{"family":"Libertinus Serif","variants":["regular","italic","600","600italic","700","700italic"],"category":"serif"},{"family":"Libertinus Serif Display","variants":["regular"],"category":"display"},{"family":"Libre Barcode 128","variants":["regular"],"category":"display"},{"family":"Libre Barcode 128 Text","variants":["regular"],"category":"display"},{"family":"Libre Barcode 39","variants":["regular"],"category":"display"},{"family":"Libre Barcode 39 Extended","variants":["regular"],"category":"display"},{"family":"Libre Barcode 39 Extended Text","variants":["regular"],"category":"display"},{"family":"Libre Barcode 39 Text","variants":["regular"],"category":"display"},{"family":"Libre Barcode EAN13 Text","variants":["regular"],"category":"display"},{"family":"Libre Baskerville","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Libre Bodoni","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Libre Caslon Display","variants":["regular"],"category":"serif"},{"family":"Libre Caslon Text","variants":["regular","italic","700"],"category":"serif"},{"family":"Libre Franklin","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Licorice","variants":["regular"],"category":"handwriting"},{"family":"Life Savers","variants":["regular","700","800"],"category":"display"},{"family":"Lilex","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Lilita One","variants":["regular"],"category":"display"},{"family":"Lily Script One","variants":["regular"],"category":"display"},{"family":"Limelight","variants":["regular"],"category":"display"},{"family":"Linden Hill","variants":["regular","italic"],"category":"serif"},{"family":"Linefont","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Lisu Bosa","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"serif"},{"family":"Liter","variants":["regular"],"category":"sans-serif"},{"family":"Literata","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Liu Jian Mao Cao","variants":["regular"],"category":"handwriting"},{"family":"Livvic","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","900","900italic"],"category":"sans-serif"},{"family":"Lobster","variants":["regular"],"category":"display"},{"family":"Lobster Two","variants":["regular","italic","700","700italic"],"category":"display"},{"family":"Londrina Outline","variants":["regular"],"category":"display"},{"family":"Londrina Shadow","variants":["regular"],"category":"display"},{"family":"Londrina Sketch","variants":["regular"],"category":"display"},{"family":"Londrina Solid","variants":["100","300","regular","900"],"category":"display"},{"family":"Long Cang","variants":["regular"],"category":"handwriting"},{"family":"Lora","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Love Light","variants":["regular"],"category":"handwriting"},{"family":"Love Ya Like A Sister","variants":["regular"],"category":"display"},{"family":"Loved by the King","variants":["regular"],"category":"handwriting"},{"family":"Lovers Quarrel","variants":["regular"],"category":"handwriting"},{"family":"Luckiest Guy","variants":["regular"],"category":"display"},{"family":"Lugrasimo","variants":["regular"],"category":"handwriting"},{"family":"Lumanosimo","variants":["regular"],"category":"handwriting"},{"family":"Lunasima","variants":["regular","700"],"category":"sans-serif"},{"family":"Lusitana","variants":["regular","700"],"category":"serif"},{"family":"Lustria","variants":["regular"],"category":"serif"},{"family":"Luxurious Roman","variants":["regular"],"category":"display"},{"family":"Luxurious Script","variants":["regular"],"category":"handwriting"},{"family":"M PLUS 1","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"M PLUS 1 Code","variants":["100","200","300","regular","500","600","700"],"category":"monospace"},{"family":"M PLUS 1p","variants":["100","300","regular","500","700","800","900"],"category":"sans-serif"},{"family":"M PLUS 2","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"M PLUS Code Latin","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"M PLUS Rounded 1c","variants":["100","300","regular","500","700","800","900"],"category":"sans-serif"},{"family":"Ma Shan Zheng","variants":["regular"],"category":"handwriting"},{"family":"Macondo","variants":["regular"],"category":"display"},{"family":"Macondo Swash Caps","variants":["regular"],"category":"display"},{"family":"Mada","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Madimi One","variants":["regular"],"category":"sans-serif"},{"family":"Magra","variants":["regular","700"],"category":"sans-serif"},{"family":"Maiden Orange","variants":["regular"],"category":"serif"},{"family":"Maitree","variants":["200","300","regular","500","600","700"],"category":"serif"},{"family":"Major Mono Display","variants":["regular"],"category":"monospace"},{"family":"Mako","variants":["regular"],"category":"sans-serif"},{"family":"Mali","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"handwriting"},{"family":"Mallanna","variants":["regular"],"category":"sans-serif"},{"family":"Maname","variants":["regular"],"category":"serif"},{"family":"Mandali","variants":["regular"],"category":"sans-serif"},{"family":"Manjari","variants":["100","regular","700"],"category":"sans-serif"},{"family":"Manrope","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mansalva","variants":["regular"],"category":"handwriting"},{"family":"Manuale","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"serif"},{"family":"Manufacturing Consent","variants":["regular"],"category":"display"},{"family":"Marcellus","variants":["regular"],"category":"serif"},{"family":"Marcellus SC","variants":["regular"],"category":"serif"},{"family":"Marck Script","variants":["regular"],"category":"handwriting"},{"family":"Margarine","variants":["regular"],"category":"display"},{"family":"Marhey","variants":["300","regular","500","600","700"],"category":"display"},{"family":"Markazi Text","variants":["regular","500","600","700"],"category":"serif"},{"family":"Marko One","variants":["regular"],"category":"serif"},{"family":"Marmelad","variants":["regular"],"category":"sans-serif"},{"family":"Martel","variants":["200","300","regular","600","700","800","900"],"category":"serif"},{"family":"Martel Sans","variants":["200","300","regular","600","700","800","900"],"category":"sans-serif"},{"family":"Martian Mono","variants":["100","200","300","regular","500","600","700","800"],"category":"monospace"},{"family":"Marvel","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Matangi","variants":["300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Mate","variants":["regular","italic"],"category":"serif"},{"family":"Mate SC","variants":["regular"],"category":"serif"},{"family":"Matemasie","variants":["regular"],"category":"sans-serif"},{"family":"Material Icons","variants":["regular"],"category":"monospace"},{"family":"Material Icons Outlined","variants":["regular"],"category":"monospace"},{"family":"Material Icons Round","variants":["regular"],"category":"monospace"},{"family":"Material Icons Sharp","variants":["regular"],"category":"monospace"},{"family":"Material Icons Two Tone","variants":["regular"],"category":"monospace"},{"family":"Material Symbols","variants":["100","200","300","regular","500","600","700"],"category":"monospace"},{"family":"Material Symbols Outlined","variants":["100","200","300","regular","500","600","700"],"category":"monospace"},{"family":"Material Symbols Rounded","variants":["100","200","300","regular","500","600","700"],"category":"monospace"},{"family":"Material Symbols Sharp","variants":["100","200","300","regular","500","600","700"],"category":"monospace"},{"family":"Maven Pro","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"McLaren","variants":["regular"],"category":"display"},{"family":"Mea Culpa","variants":["regular"],"category":"handwriting"},{"family":"Meddon","variants":["regular"],"category":"handwriting"},{"family":"MedievalSharp","variants":["regular"],"category":"display"},{"family":"Medula One","variants":["regular"],"category":"display"},{"family":"Meera Inimai","variants":["regular"],"category":"sans-serif"},{"family":"Megrim","variants":["regular"],"category":"display"},{"family":"Meie Script","variants":["regular"],"category":"handwriting"},{"family":"Menbere","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Meow Script","variants":["regular"],"category":"handwriting"},{"family":"Merienda","variants":["300","regular","500","600","700","800","900"],"category":"handwriting"},{"family":"Merriweather","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Merriweather Sans","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Metal","variants":["regular"],"category":"display"},{"family":"Metal Mania","variants":["regular"],"category":"display"},{"family":"Metamorphous","variants":["regular"],"category":"display"},{"family":"Metrophobic","variants":["regular"],"category":"sans-serif"},{"family":"Michroma","variants":["regular"],"category":"sans-serif"},{"family":"Micro 5","variants":["regular"],"category":"display"},{"family":"Micro 5 Charted","variants":["regular"],"category":"display"},{"family":"Milonga","variants":["regular"],"category":"display"},{"family":"Miltonian","variants":["regular"],"category":"display"},{"family":"Miltonian Tattoo","variants":["regular"],"category":"display"},{"family":"Mina","variants":["regular","700"],"category":"sans-serif"},{"family":"Mingzat","variants":["regular"],"category":"sans-serif"},{"family":"Miniver","variants":["regular"],"category":"display"},{"family":"Miriam Libre","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Mirza","variants":["regular","500","600","700"],"category":"serif"},{"family":"Miss Fajardose","variants":["regular"],"category":"handwriting"},{"family":"Mitr","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Mochiy Pop One","variants":["regular"],"category":"sans-serif"},{"family":"Mochiy Pop P One","variants":["regular"],"category":"sans-serif"},{"family":"Modak","variants":["regular"],"category":"display"},{"family":"Modern Antiqua","variants":["regular"],"category":"display"},{"family":"Moderustic","variants":["300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mogra","variants":["regular"],"category":"display"},{"family":"Mohave","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Moirai One","variants":["regular"],"category":"display"},{"family":"Molengo","variants":["regular"],"category":"sans-serif"},{"family":"Molle","variants":["italic"],"category":"handwriting"},{"family":"Momo Signature","variants":["regular"],"category":"sans-serif"},{"family":"Momo Trust Display","variants":["regular"],"category":"sans-serif"},{"family":"Momo Trust Sans","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mona Sans","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Monda","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Monofett","variants":["regular"],"category":"monospace"},{"family":"Monomakh","variants":["regular"],"category":"display"},{"family":"Monomaniac One","variants":["regular"],"category":"sans-serif"},{"family":"Monoton","variants":["regular"],"category":"display"},{"family":"Monsieur La Doulaise","variants":["regular"],"category":"handwriting"},{"family":"Montaga","variants":["regular"],"category":"serif"},{"family":"Montagu Slab","variants":["100","200","300","regular","500","600","700"],"category":"serif"},{"family":"MonteCarlo","variants":["regular"],"category":"handwriting"},{"family":"Montez","variants":["regular"],"category":"handwriting"},{"family":"Montserrat","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Montserrat Alternates","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Montserrat Underline","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Moo Lah Lah","variants":["regular"],"category":"display"},{"family":"Mooli","variants":["regular"],"category":"sans-serif"},{"family":"Moon Dance","variants":["regular"],"category":"handwriting"},{"family":"Moul","variants":["regular"],"category":"display"},{"family":"Moulpali","variants":["regular"],"category":"sans-serif"},{"family":"Mountains of Christmas","variants":["regular","700"],"category":"display"},{"family":"Mouse Memoirs","variants":["regular"],"category":"sans-serif"},{"family":"Mozilla Headline","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Mozilla Text","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Mr Bedfort","variants":["regular"],"category":"handwriting"},{"family":"Mr Dafoe","variants":["regular"],"category":"handwriting"},{"family":"Mr De Haviland","variants":["regular"],"category":"handwriting"},{"family":"Mrs Saint Delafield","variants":["regular"],"category":"handwriting"},{"family":"Mrs Sheppards","variants":["regular"],"category":"handwriting"},{"family":"Ms Madi","variants":["regular"],"category":"handwriting"},{"family":"Mukta","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mukta Mahee","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mukta Malar","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mukta Vaani","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Mulish","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Murecho","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"MuseoModerno","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"display"},{"family":"My Soul","variants":["regular"],"category":"handwriting"},{"family":"Mynerve","variants":["regular"],"category":"handwriting"},{"family":"Mystery Quest","variants":["regular"],"category":"display"},{"family":"NTR","variants":["regular"],"category":"sans-serif"},{"family":"Nabla","variants":["regular"],"category":"display"},{"family":"Namdhinggo","variants":["regular","500","600","700","800"],"category":"serif"},{"family":"Nanum Brush Script","variants":["regular"],"category":"handwriting"},{"family":"Nanum Gothic","variants":["regular","700","800"],"category":"sans-serif"},{"family":"Nanum Gothic Coding","variants":["regular","700"],"category":"handwriting"},{"family":"Nanum Myeongjo","variants":["regular","700","800"],"category":"serif"},{"family":"Nanum Pen Script","variants":["regular"],"category":"handwriting"},{"family":"Narnoor","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"Nata Sans","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"National Park","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Neonderthaw","variants":["regular"],"category":"handwriting"},{"family":"Nerko One","variants":["regular"],"category":"handwriting"},{"family":"Neucha","variants":["regular"],"category":"handwriting"},{"family":"Neuton","variants":["200","300","regular","italic","700","800"],"category":"serif"},{"family":"New Amsterdam","variants":["regular"],"category":"sans-serif"},{"family":"New Rocker","variants":["regular"],"category":"display"},{"family":"New Tegomin","variants":["regular"],"category":"serif"},{"family":"News Cycle","variants":["regular","700"],"category":"sans-serif"},{"family":"Newsreader","variants":["200","300","regular","500","600","700","800","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"serif"},{"family":"Niconne","variants":["regular"],"category":"handwriting"},{"family":"Niramit","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"sans-serif"},{"family":"Nixie One","variants":["regular"],"category":"display"},{"family":"Nobile","variants":["regular","italic","500","500italic","700","700italic"],"category":"sans-serif"},{"family":"Nokora","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Norican","variants":["regular"],"category":"handwriting"},{"family":"Nosifer","variants":["regular"],"category":"display"},{"family":"Notable","variants":["regular"],"category":"sans-serif"},{"family":"Nothing You Could Do","variants":["regular"],"category":"handwriting"},{"family":"Noticia Text","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Noto Color Emoji","variants":["regular"],"category":"sans-serif"},{"family":"Noto Emoji","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Kufi Arabic","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Music","variants":["regular"],"category":"sans-serif"},{"family":"Noto Naskh Arabic","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Nastaliq Urdu","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Rashi Hebrew","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Noto Sans Adlam","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Adlam Unjoined","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Anatolian Hieroglyphs","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Arabic","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Armenian","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Avestan","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Balinese","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Bamum","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Bassa Vah","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Batak","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Bengali","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Bhaiksuki","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Brahmi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Buginese","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Buhid","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Canadian Aboriginal","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Carian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Caucasian Albanian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Chakma","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Cham","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Cherokee","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Chorasmian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Coptic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Cuneiform","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Cypriot","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Cypro Minoan","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Deseret","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Devanagari","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Display","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Noto Sans Duployan","variants":["regular","700"],"category":"sans-serif"},{"family":"Noto Sans Egyptian Hieroglyphs","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Elbasan","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Elymaic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Ethiopic","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Georgian","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Glagolitic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Gothic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Grantha","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Gujarati","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Gunjala Gondi","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Gurmukhi","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans HK","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Hanifi Rohingya","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Hanunoo","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Hatran","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Hebrew","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Imperial Aramaic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Indic Siyaq Numbers","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Inscriptional Pahlavi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Inscriptional Parthian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans JP","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Javanese","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans KR","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Kaithi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Kannada","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Kawi","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Kayah Li","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Kharoshthi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Khmer","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Khojki","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Khudawadi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Lao","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Lao Looped","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Lepcha","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Limbu","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Linear A","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Linear B","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Lisu","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Lycian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Lydian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Mahajani","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Malayalam","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Mandaic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Manichaean","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Marchen","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Masaram Gondi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Math","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Mayan Numerals","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Medefaidrin","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Meetei Mayek","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Mende Kikakui","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Meroitic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Miao","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Modi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Mongolian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Mono","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Mro","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Multani","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Myanmar","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans NKo","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans NKo Unjoined","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Nabataean","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Nag Mundari","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Nandinagari","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans New Tai Lue","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Newa","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Nushu","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Ogham","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Ol Chiki","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Old Hungarian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old Italic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old North Arabian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old Permic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old Persian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old Sogdian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old South Arabian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Old Turkic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Oriya","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Osage","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Osmanya","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Pahawh Hmong","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Palmyrene","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Pau Cin Hau","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans PhagsPa","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Phoenician","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Psalter Pahlavi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Rejang","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Runic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans SC","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Samaritan","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Saurashtra","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Sharada","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Shavian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Siddham","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans SignWriting","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Sinhala","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Sogdian","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Sora Sompeng","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Soyombo","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Sundanese","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Sunuwar","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Syloti Nagri","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Symbols","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Symbols 2","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Syriac","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Syriac Eastern","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Syriac Western","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans TC","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Tagalog","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Tagbanwa","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Tai Le","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Tai Tham","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Tai Viet","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Takri","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Tamil","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Tamil Supplement","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Tangsa","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Telugu","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Thaana","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Thai","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Thai Looped","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Noto Sans Tifinagh","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Tirhuta","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Ugaritic","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Vai","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Vithkuqi","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Sans Wancho","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Warang Citi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Yi","variants":["regular"],"category":"sans-serif"},{"family":"Noto Sans Zanabazar Square","variants":["regular"],"category":"sans-serif"},{"family":"Noto Serif","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Noto Serif Ahom","variants":["regular"],"category":"serif"},{"family":"Noto Serif Armenian","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Balinese","variants":["regular"],"category":"serif"},{"family":"Noto Serif Bengali","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Devanagari","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Display","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Noto Serif Dives Akuru","variants":["regular"],"category":"serif"},{"family":"Noto Serif Dogra","variants":["regular"],"category":"serif"},{"family":"Noto Serif Ethiopic","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Georgian","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Grantha","variants":["regular"],"category":"serif"},{"family":"Noto Serif Gujarati","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Gurmukhi","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif HK","variants":["200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Hebrew","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Hentaigana","variants":["200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif JP","variants":["200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif KR","variants":["200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Kannada","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Khitan Small Script","variants":["regular"],"category":"serif"},{"family":"Noto Serif Khmer","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Khojki","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Serif Lao","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Makasar","variants":["regular"],"category":"serif"},{"family":"Noto Serif Malayalam","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Myanmar","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif NP Hmong","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Serif Old Uyghur","variants":["regular"],"category":"serif"},{"family":"Noto Serif Oriya","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Serif Ottoman Siyaq","variants":["regular"],"category":"serif"},{"family":"Noto Serif SC","variants":["200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Sinhala","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif TC","variants":["200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Tamil","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Noto Serif Tangut","variants":["regular"],"category":"serif"},{"family":"Noto Serif Telugu","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Thai","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Tibetan","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Noto Serif Todhri","variants":["regular"],"category":"serif"},{"family":"Noto Serif Toto","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Serif Vithkuqi","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Serif Yezidi","variants":["regular","500","600","700"],"category":"serif"},{"family":"Noto Traditional Nushu","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Noto Znamenny Musical Notation","variants":["regular"],"category":"sans-serif"},{"family":"Nova Cut","variants":["regular"],"category":"display"},{"family":"Nova Flat","variants":["regular"],"category":"display"},{"family":"Nova Mono","variants":["regular"],"category":"monospace"},{"family":"Nova Oval","variants":["regular"],"category":"display"},{"family":"Nova Round","variants":["regular"],"category":"display"},{"family":"Nova Script","variants":["regular"],"category":"display"},{"family":"Nova Slim","variants":["regular"],"category":"display"},{"family":"Nova Square","variants":["regular"],"category":"display"},{"family":"Numans","variants":["regular"],"category":"sans-serif"},{"family":"Nunito","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Nunito Sans","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Nuosu SIL","variants":["regular"],"category":"sans-serif"},{"family":"Odibee Sans","variants":["regular"],"category":"display"},{"family":"Odor Mean Chey","variants":["regular"],"category":"serif"},{"family":"Offside","variants":["regular"],"category":"display"},{"family":"Oi","variants":["regular"],"category":"display"},{"family":"Ojuju","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Old Standard TT","variants":["regular","italic","700"],"category":"serif"},{"family":"Oldenburg","variants":["regular"],"category":"display"},{"family":"Ole","variants":["regular"],"category":"handwriting"},{"family":"Oleo Script","variants":["regular","700"],"category":"display"},{"family":"Oleo Script Swash Caps","variants":["regular","700"],"category":"display"},{"family":"Onest","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Oooh Baby","variants":["regular"],"category":"handwriting"},{"family":"Open Sans","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Oranienbaum","variants":["regular"],"category":"serif"},{"family":"Orbit","variants":["regular"],"category":"sans-serif"},{"family":"Orbitron","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Oregano","variants":["regular","italic"],"category":"display"},{"family":"Orelega One","variants":["regular"],"category":"display"},{"family":"Orienta","variants":["regular"],"category":"sans-serif"},{"family":"Original Surfer","variants":["regular"],"category":"display"},{"family":"Oswald","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Outfit","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Over the Rainbow","variants":["regular"],"category":"handwriting"},{"family":"Overlock","variants":["regular","italic","700","700italic","900","900italic"],"category":"display"},{"family":"Overlock SC","variants":["regular"],"category":"display"},{"family":"Overpass","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Overpass Mono","variants":["300","regular","500","600","700"],"category":"monospace"},{"family":"Ovo","variants":["regular"],"category":"serif"},{"family":"Oxanium","variants":["200","300","regular","500","600","700","800"],"category":"display"},{"family":"Oxygen","variants":["300","regular","700"],"category":"sans-serif"},{"family":"Oxygen Mono","variants":["regular"],"category":"monospace"},{"family":"PT Mono","variants":["regular"],"category":"monospace"},{"family":"PT Sans","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"PT Sans Caption","variants":["regular","700"],"category":"sans-serif"},{"family":"PT Sans Narrow","variants":["regular","700"],"category":"sans-serif"},{"family":"PT Serif","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"PT Serif Caption","variants":["regular","italic"],"category":"serif"},{"family":"Pacifico","variants":["regular"],"category":"handwriting"},{"family":"Padauk","variants":["regular","700"],"category":"sans-serif"},{"family":"Padyakke Expanded One","variants":["regular"],"category":"serif"},{"family":"Palanquin","variants":["100","200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Palanquin Dark","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Palette Mosaic","variants":["regular"],"category":"display"},{"family":"Pangolin","variants":["regular"],"category":"handwriting"},{"family":"Paprika","variants":["regular"],"category":"display"},{"family":"Parastoo","variants":["regular","500","600","700"],"category":"serif"},{"family":"Parisienne","variants":["regular"],"category":"handwriting"},{"family":"Parkinsans","variants":["300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Passero One","variants":["regular"],"category":"display"},{"family":"Passion One","variants":["regular","700","900"],"category":"display"},{"family":"Passions Conflict","variants":["regular"],"category":"handwriting"},{"family":"Pathway Extreme","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Pathway Gothic One","variants":["regular"],"category":"sans-serif"},{"family":"Patrick Hand","variants":["regular"],"category":"handwriting"},{"family":"Patrick Hand SC","variants":["regular"],"category":"handwriting"},{"family":"Pattaya","variants":["regular"],"category":"sans-serif"},{"family":"Patua One","variants":["regular"],"category":"display"},{"family":"Pavanam","variants":["regular"],"category":"sans-serif"},{"family":"Paytone One","variants":["regular"],"category":"sans-serif"},{"family":"Peddana","variants":["regular"],"category":"serif"},{"family":"Peralta","variants":["regular"],"category":"serif"},{"family":"Permanent Marker","variants":["regular"],"category":"handwriting"},{"family":"Petemoss","variants":["regular"],"category":"handwriting"},{"family":"Petit Formal Script","variants":["regular"],"category":"handwriting"},{"family":"Petrona","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Phetsarath","variants":["regular","700"],"category":"sans-serif"},{"family":"Philosopher","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Phudu","variants":["300","regular","500","600","700","800","900"],"category":"display"},{"family":"Piazzolla","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Piedra","variants":["regular"],"category":"display"},{"family":"Pinyon Script","variants":["regular"],"category":"handwriting"},{"family":"Pirata One","variants":["regular"],"category":"display"},{"family":"Pixelify Sans","variants":["regular","500","600","700"],"category":"display"},{"family":"Plaster","variants":["regular"],"category":"display"},{"family":"Platypi","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"serif"},{"family":"Play","variants":["regular","700"],"category":"sans-serif"},{"family":"Playball","variants":["regular"],"category":"display"},{"family":"Playfair","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Playfair Display","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Playfair Display SC","variants":["regular","italic","700","700italic","900","900italic"],"category":"serif"},{"family":"Playpen Sans","variants":["100","200","300","regular","500","600","700","800"],"category":"handwriting"},{"family":"Playpen Sans Arabic","variants":["100","200","300","regular","500","600","700","800"],"category":"handwriting"},{"family":"Playpen Sans Deva","variants":["100","200","300","regular","500","600","700","800"],"category":"handwriting"},{"family":"Playpen Sans Hebrew","variants":["100","200","300","regular","500","600","700","800"],"category":"handwriting"},{"family":"Playpen Sans Thai","variants":["100","200","300","regular","500","600","700","800"],"category":"handwriting"},{"family":"Playwrite AR","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite AR Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite AT","variants":["100","200","300","regular","100italic","200italic","300italic","italic"],"category":"handwriting"},{"family":"Playwrite AT Guides","variants":["regular","italic"],"category":"handwriting"},{"family":"Playwrite AU NSW","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite AU NSW Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite AU QLD","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite AU QLD Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite AU SA","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite AU SA Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite AU TAS","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite AU TAS Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite AU VIC","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite AU VIC Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite BE VLG","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite BE VLG Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite BE WAL","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite BE WAL Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite BR","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite BR Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite CA","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite CA Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite CL","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite CL Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite CO","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite CO Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite CU","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite CU Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite CZ","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite CZ Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite DE Grund","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite DE Grund Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite DE LA","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite DE LA Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite DE SAS","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite DE SAS Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite DE VA","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite DE VA Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite DK Loopet","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite DK Loopet Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite DK Uloopet","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite DK Uloopet Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite ES","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite ES Deco","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite ES Deco Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite ES Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite FR Moderne","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite FR Moderne Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite FR Trad","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite FR Trad Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite GB J","variants":["100","200","300","regular","100italic","200italic","300italic","italic"],"category":"handwriting"},{"family":"Playwrite GB J Guides","variants":["regular","italic"],"category":"handwriting"},{"family":"Playwrite GB S","variants":["100","200","300","regular","100italic","200italic","300italic","italic"],"category":"handwriting"},{"family":"Playwrite GB S Guides","variants":["regular","italic"],"category":"handwriting"},{"family":"Playwrite HR","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite HR Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite HR Lijeva","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite HR Lijeva Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite HU","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite HU Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite ID","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite ID Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite IE","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite IE Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite IN","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite IN Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite IS","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite IS Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite IT Moderna","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite IT Moderna Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite IT Trad","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite IT Trad Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite MX","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite MX Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite NG Modern","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite NG Modern Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite NL","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite NL Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite NO","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite NO Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite NZ","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite NZ Basic","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite NZ Basic Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite NZ Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite PE","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite PE Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite PL","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite PL Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite PT","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite PT Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite RO","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite RO Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite SK","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite SK Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite TZ","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite TZ Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite US Modern","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite US Modern Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite US Trad","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite US Trad Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite VN","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite VN Guides","variants":["regular"],"category":"handwriting"},{"family":"Playwrite ZA","variants":["100","200","300","regular"],"category":"handwriting"},{"family":"Playwrite ZA Guides","variants":["regular"],"category":"handwriting"},{"family":"Plus Jakarta Sans","variants":["200","300","regular","500","600","700","800","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Pochaevsk","variants":["regular"],"category":"display"},{"family":"Podkova","variants":["regular","500","600","700","800"],"category":"serif"},{"family":"Poetsen One","variants":["regular"],"category":"display"},{"family":"Poiret One","variants":["regular"],"category":"display"},{"family":"Poller One","variants":["regular"],"category":"display"},{"family":"Poltawski Nowy","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Poly","variants":["regular","italic"],"category":"serif"},{"family":"Pompiere","variants":["regular"],"category":"display"},{"family":"Ponnala","variants":["regular"],"category":"display"},{"family":"Ponomar","variants":["regular"],"category":"display"},{"family":"Pontano Sans","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Poor Story","variants":["regular"],"category":"display"},{"family":"Poppins","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Port Lligat Sans","variants":["regular"],"category":"sans-serif"},{"family":"Port Lligat Slab","variants":["regular"],"category":"serif"},{"family":"Potta One","variants":["regular"],"category":"display"},{"family":"Pragati Narrow","variants":["regular","700"],"category":"sans-serif"},{"family":"Praise","variants":["regular"],"category":"handwriting"},{"family":"Prata","variants":["regular"],"category":"serif"},{"family":"Preahvihear","variants":["regular"],"category":"sans-serif"},{"family":"Press Start 2P","variants":["regular"],"category":"display"},{"family":"Pridi","variants":["200","300","regular","500","600","700"],"category":"serif"},{"family":"Princess Sofia","variants":["regular"],"category":"handwriting"},{"family":"Prociono","variants":["regular"],"category":"serif"},{"family":"Prompt","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Prosto One","variants":["regular"],"category":"display"},{"family":"Protest Guerrilla","variants":["regular"],"category":"display"},{"family":"Protest Revolution","variants":["regular"],"category":"display"},{"family":"Protest Riot","variants":["regular"],"category":"display"},{"family":"Protest Strike","variants":["regular"],"category":"display"},{"family":"Proza Libre","variants":["regular","italic","500","500italic","600","600italic","700","700italic","800","800italic"],"category":"sans-serif"},{"family":"Public Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Puppies Play","variants":["regular"],"category":"handwriting"},{"family":"Puritan","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Purple Purse","variants":["regular"],"category":"display"},{"family":"Qahiri","variants":["regular"],"category":"sans-serif"},{"family":"Quando","variants":["regular"],"category":"serif"},{"family":"Quantico","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Quattrocento","variants":["regular","700"],"category":"serif"},{"family":"Quattrocento Sans","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Questrial","variants":["regular"],"category":"sans-serif"},{"family":"Quicksand","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Quintessential","variants":["regular"],"category":"handwriting"},{"family":"Qwigley","variants":["regular"],"category":"handwriting"},{"family":"Qwitcher Grypen","variants":["regular","700"],"category":"handwriting"},{"family":"REM","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Racing Sans One","variants":["regular"],"category":"display"},{"family":"Radio Canada","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Radio Canada Big","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Radley","variants":["regular","italic"],"category":"serif"},{"family":"Rajdhani","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Rakkas","variants":["regular"],"category":"display"},{"family":"Raleway","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Raleway Dots","variants":["regular"],"category":"display"},{"family":"Ramabhadra","variants":["regular"],"category":"sans-serif"},{"family":"Ramaraja","variants":["regular"],"category":"serif"},{"family":"Rambla","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Rammetto One","variants":["regular"],"category":"display"},{"family":"Rampart One","variants":["regular"],"category":"display"},{"family":"Ramsina","variants":["regular"],"category":"serif"},{"family":"Ranchers","variants":["regular"],"category":"display"},{"family":"Rancho","variants":["regular"],"category":"handwriting"},{"family":"Ranga","variants":["regular","700"],"category":"display"},{"family":"Rasa","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Rationale","variants":["regular"],"category":"sans-serif"},{"family":"Ravi Prakash","variants":["regular"],"category":"display"},{"family":"Readex Pro","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Recursive","variants":["300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Red Hat Display","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Red Hat Mono","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Red Hat Text","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Red Rose","variants":["300","regular","500","600","700"],"category":"display"},{"family":"Redacted","variants":["regular"],"category":"display"},{"family":"Redacted Script","variants":["300","regular","700"],"category":"display"},{"family":"Reddit Mono","variants":["200","300","regular","500","600","700","800","900"],"category":"monospace"},{"family":"Reddit Sans","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Reddit Sans Condensed","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Redressed","variants":["regular"],"category":"handwriting"},{"family":"Reem Kufi","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Reem Kufi Fun","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Reem Kufi Ink","variants":["regular"],"category":"sans-serif"},{"family":"Reenie Beanie","variants":["regular"],"category":"handwriting"},{"family":"Reggae One","variants":["regular"],"category":"display"},{"family":"Rethink Sans","variants":["regular","500","600","700","800","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Revalia","variants":["regular"],"category":"display"},{"family":"Rhodium Libre","variants":["regular"],"category":"serif"},{"family":"Ribeye","variants":["regular"],"category":"display"},{"family":"Ribeye Marrow","variants":["regular"],"category":"display"},{"family":"Righteous","variants":["regular"],"category":"display"},{"family":"Risque","variants":["regular"],"category":"display"},{"family":"Road Rage","variants":["regular"],"category":"display"},{"family":"Roboto","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Roboto Condensed","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Roboto Flex","variants":["regular"],"category":"sans-serif"},{"family":"Roboto Mono","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Roboto Serif","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Roboto Slab","variants":["100","200","300","regular","500","600","700","800","900"],"category":"serif"},{"family":"Rochester","variants":["regular"],"category":"handwriting"},{"family":"Rock 3D","variants":["regular"],"category":"display"},{"family":"Rock Salt","variants":["regular"],"category":"handwriting"},{"family":"RocknRoll One","variants":["regular"],"category":"sans-serif"},{"family":"Rokkitt","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Romanesco","variants":["regular"],"category":"handwriting"},{"family":"Ropa Sans","variants":["regular","italic"],"category":"sans-serif"},{"family":"Rosario","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Rosarivo","variants":["regular","italic"],"category":"serif"},{"family":"Rouge Script","variants":["regular"],"category":"handwriting"},{"family":"Rowdies","variants":["300","regular","700"],"category":"display"},{"family":"Rozha One","variants":["regular"],"category":"serif"},{"family":"Rubik","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Rubik 80s Fade","variants":["regular"],"category":"display"},{"family":"Rubik Beastly","variants":["regular"],"category":"display"},{"family":"Rubik Broken Fax","variants":["regular"],"category":"display"},{"family":"Rubik Bubbles","variants":["regular"],"category":"display"},{"family":"Rubik Burned","variants":["regular"],"category":"display"},{"family":"Rubik Dirt","variants":["regular"],"category":"display"},{"family":"Rubik Distressed","variants":["regular"],"category":"display"},{"family":"Rubik Doodle Shadow","variants":["regular"],"category":"display"},{"family":"Rubik Doodle Triangles","variants":["regular"],"category":"display"},{"family":"Rubik Gemstones","variants":["regular"],"category":"display"},{"family":"Rubik Glitch","variants":["regular"],"category":"display"},{"family":"Rubik Glitch Pop","variants":["regular"],"category":"display"},{"family":"Rubik Iso","variants":["regular"],"category":"display"},{"family":"Rubik Lines","variants":["regular"],"category":"display"},{"family":"Rubik Maps","variants":["regular"],"category":"display"},{"family":"Rubik Marker Hatch","variants":["regular"],"category":"display"},{"family":"Rubik Maze","variants":["regular"],"category":"display"},{"family":"Rubik Microbe","variants":["regular"],"category":"display"},{"family":"Rubik Mono One","variants":["regular"],"category":"sans-serif"},{"family":"Rubik Moonrocks","variants":["regular"],"category":"display"},{"family":"Rubik Pixels","variants":["regular"],"category":"display"},{"family":"Rubik Puddles","variants":["regular"],"category":"display"},{"family":"Rubik Scribble","variants":["regular"],"category":"display"},{"family":"Rubik Spray Paint","variants":["regular"],"category":"display"},{"family":"Rubik Storm","variants":["regular"],"category":"display"},{"family":"Rubik Vinyl","variants":["regular"],"category":"display"},{"family":"Rubik Wet Paint","variants":["regular"],"category":"display"},{"family":"Ruda","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Rufina","variants":["regular","700"],"category":"serif"},{"family":"Ruge Boogie","variants":["regular"],"category":"handwriting"},{"family":"Ruluko","variants":["regular"],"category":"sans-serif"},{"family":"Rum Raisin","variants":["regular"],"category":"sans-serif"},{"family":"Ruslan Display","variants":["regular"],"category":"display"},{"family":"Russo One","variants":["regular"],"category":"sans-serif"},{"family":"Ruthie","variants":["regular"],"category":"handwriting"},{"family":"Ruwudu","variants":["regular","500","600","700"],"category":"serif"},{"family":"Rye","variants":["regular"],"category":"display"},{"family":"SN Pro","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"STIX Two Text","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"SUSE","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"SUSE Mono","variants":["100","200","300","regular","500","600","700","800","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Sacramento","variants":["regular"],"category":"handwriting"},{"family":"Sahitya","variants":["regular","700"],"category":"serif"},{"family":"Sail","variants":["regular"],"category":"display"},{"family":"Saira","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Saira Condensed","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Saira Extra Condensed","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Saira Semi Condensed","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Saira Stencil One","variants":["regular"],"category":"display"},{"family":"Salsa","variants":["regular"],"category":"display"},{"family":"Sanchez","variants":["regular","italic"],"category":"serif"},{"family":"Sancreek","variants":["regular"],"category":"display"},{"family":"Sankofa Display","variants":["regular"],"category":"sans-serif"},{"family":"Sansation","variants":["300","300italic","regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Sansita","variants":["regular","italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Sansita Swashed","variants":["300","regular","500","600","700","800","900"],"category":"display"},{"family":"Sarabun","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic"],"category":"sans-serif"},{"family":"Sarala","variants":["regular","700"],"category":"sans-serif"},{"family":"Sarina","variants":["regular"],"category":"display"},{"family":"Sarpanch","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Sassy Frass","variants":["regular"],"category":"handwriting"},{"family":"Satisfy","variants":["regular"],"category":"handwriting"},{"family":"Savate","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Sawarabi Gothic","variants":["regular"],"category":"sans-serif"},{"family":"Sawarabi Mincho","variants":["regular"],"category":"serif"},{"family":"Scada","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Scheherazade New","variants":["regular","500","600","700"],"category":"serif"},{"family":"Schibsted Grotesk","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Schoolbell","variants":["regular"],"category":"handwriting"},{"family":"Science Gothic","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Scope One","variants":["regular"],"category":"serif"},{"family":"Seaweed Script","variants":["regular"],"category":"display"},{"family":"Secular One","variants":["regular"],"category":"sans-serif"},{"family":"Sedan","variants":["regular","italic"],"category":"serif"},{"family":"Sedan SC","variants":["regular"],"category":"serif"},{"family":"Sedgwick Ave","variants":["regular"],"category":"handwriting"},{"family":"Sedgwick Ave Display","variants":["regular"],"category":"handwriting"},{"family":"Sekuya","variants":["regular"],"category":"display"},{"family":"Sen","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"Send Flowers","variants":["regular"],"category":"handwriting"},{"family":"Sevillana","variants":["regular"],"category":"display"},{"family":"Seymour One","variants":["regular"],"category":"sans-serif"},{"family":"Shadows Into Light","variants":["regular"],"category":"handwriting"},{"family":"Shadows Into Light Two","variants":["regular"],"category":"handwriting"},{"family":"Shafarik","variants":["regular"],"category":"display"},{"family":"Shalimar","variants":["regular"],"category":"handwriting"},{"family":"Shantell Sans","variants":["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"],"category":"display"},{"family":"Shanti","variants":["regular"],"category":"sans-serif"},{"family":"Share","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Share Tech","variants":["regular"],"category":"sans-serif"},{"family":"Share Tech Mono","variants":["regular"],"category":"monospace"},{"family":"Shippori Antique","variants":["regular"],"category":"sans-serif"},{"family":"Shippori Antique B1","variants":["regular"],"category":"sans-serif"},{"family":"Shippori Mincho","variants":["regular","500","600","700","800"],"category":"serif"},{"family":"Shippori Mincho B1","variants":["regular","500","600","700","800"],"category":"serif"},{"family":"Shizuru","variants":["regular"],"category":"display"},{"family":"Shojumaru","variants":["regular"],"category":"display"},{"family":"Short Stack","variants":["regular"],"category":"handwriting"},{"family":"Shrikhand","variants":["regular"],"category":"display"},{"family":"Siemreap","variants":["regular"],"category":"sans-serif"},{"family":"Sigmar","variants":["regular"],"category":"display"},{"family":"Sigmar One","variants":["regular"],"category":"display"},{"family":"Signika","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Signika Negative","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Silkscreen","variants":["regular","700"],"category":"display"},{"family":"Simonetta","variants":["regular","italic","900","900italic"],"category":"display"},{"family":"Single Day","variants":["regular"],"category":"display"},{"family":"Sintony","variants":["regular","700"],"category":"sans-serif"},{"family":"Sirin Stencil","variants":["regular"],"category":"display"},{"family":"Sirivennela","variants":["regular"],"category":"sans-serif"},{"family":"Six Caps","variants":["regular"],"category":"sans-serif"},{"family":"Sixtyfour","variants":["regular"],"category":"monospace"},{"family":"Sixtyfour Convergence","variants":["regular"],"category":"monospace"},{"family":"Skranji","variants":["regular","700"],"category":"display"},{"family":"Slabo 13px","variants":["regular"],"category":"serif"},{"family":"Slabo 27px","variants":["regular"],"category":"serif"},{"family":"Slackey","variants":["regular"],"category":"display"},{"family":"Slackside One","variants":["regular"],"category":"handwriting"},{"family":"Smokum","variants":["regular"],"category":"display"},{"family":"Smooch","variants":["regular"],"category":"handwriting"},{"family":"Smooch Sans","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Smythe","variants":["regular"],"category":"display"},{"family":"Sniglet","variants":["regular","800"],"category":"display"},{"family":"Snippet","variants":["regular"],"category":"sans-serif"},{"family":"Snowburst One","variants":["regular"],"category":"display"},{"family":"Sofadi One","variants":["regular"],"category":"display"},{"family":"Sofia","variants":["regular"],"category":"handwriting"},{"family":"Sofia Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Sofia Sans Condensed","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Sofia Sans Extra Condensed","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Sofia Sans Semi Condensed","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Solitreo","variants":["regular"],"category":"handwriting"},{"family":"Solway","variants":["300","regular","500","700","800"],"category":"serif"},{"family":"Sometype Mono","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Song Myung","variants":["regular"],"category":"serif"},{"family":"Sono","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Sonsie One","variants":["regular"],"category":"display"},{"family":"Sora","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Sorts Mill Goudy","variants":["regular","italic"],"category":"serif"},{"family":"Sour Gummy","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Source Code Pro","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"monospace"},{"family":"Source Sans 3","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Source Serif 4","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Space Grotesk","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Space Mono","variants":["regular","italic","700","700italic"],"category":"monospace"},{"family":"Special Elite","variants":["regular"],"category":"display"},{"family":"Special Gothic","variants":["regular","500","600","700"],"category":"sans-serif"},{"family":"Special Gothic Condensed One","variants":["regular"],"category":"sans-serif"},{"family":"Special Gothic Expanded One","variants":["regular"],"category":"sans-serif"},{"family":"Spectral","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic"],"category":"serif"},{"family":"Spectral SC","variants":["200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic"],"category":"serif"},{"family":"Spicy Rice","variants":["regular"],"category":"display"},{"family":"Spinnaker","variants":["regular"],"category":"sans-serif"},{"family":"Spirax","variants":["regular"],"category":"display"},{"family":"Splash","variants":["regular"],"category":"handwriting"},{"family":"Spline Sans","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Spline Sans Mono","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Squada One","variants":["regular"],"category":"display"},{"family":"Square Peg","variants":["regular"],"category":"handwriting"},{"family":"Sree Krushnadevaraya","variants":["regular"],"category":"serif"},{"family":"Sriracha","variants":["regular"],"category":"handwriting"},{"family":"Srisakdi","variants":["regular","700"],"category":"display"},{"family":"Staatliches","variants":["regular"],"category":"display"},{"family":"Stack Sans Headline","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Stack Sans Notch","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Stack Sans Text","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Stalemate","variants":["regular"],"category":"handwriting"},{"family":"Stalinist One","variants":["regular"],"category":"display"},{"family":"Stardos Stencil","variants":["regular","700"],"category":"display"},{"family":"Stick","variants":["regular"],"category":"sans-serif"},{"family":"Stick No Bills","variants":["200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Stint Ultra Condensed","variants":["regular"],"category":"serif"},{"family":"Stint Ultra Expanded","variants":["regular"],"category":"serif"},{"family":"Stoke","variants":["300","regular"],"category":"serif"},{"family":"Story Script","variants":["regular"],"category":"sans-serif"},{"family":"Strait","variants":["regular"],"category":"sans-serif"},{"family":"Style Script","variants":["regular"],"category":"handwriting"},{"family":"Stylish","variants":["regular"],"category":"sans-serif"},{"family":"Sue Ellen Francisco","variants":["regular"],"category":"handwriting"},{"family":"Suez One","variants":["regular"],"category":"serif"},{"family":"Sulphur Point","variants":["300","regular","700"],"category":"sans-serif"},{"family":"Sumana","variants":["regular","700"],"category":"serif"},{"family":"Sunflower","variants":["300","500","700"],"category":"sans-serif"},{"family":"Sunshiney","variants":["regular"],"category":"handwriting"},{"family":"Supermercado One","variants":["regular"],"category":"display"},{"family":"Sura","variants":["regular","700"],"category":"serif"},{"family":"Suranna","variants":["regular"],"category":"serif"},{"family":"Suravaram","variants":["regular"],"category":"serif"},{"family":"Suwannaphum","variants":["100","300","regular","700","900"],"category":"serif"},{"family":"Swanky and Moo Moo","variants":["regular"],"category":"handwriting"},{"family":"Syncopate","variants":["regular","700"],"category":"sans-serif"},{"family":"Syne","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"Syne Mono","variants":["regular"],"category":"monospace"},{"family":"Syne Tactile","variants":["regular"],"category":"display"},{"family":"TASA Explorer","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"TASA Orbiter","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"Tac One","variants":["regular"],"category":"sans-serif"},{"family":"Tagesschrift","variants":["regular"],"category":"display"},{"family":"Tai Heritage Pro","variants":["regular","700"],"category":"serif"},{"family":"Tajawal","variants":["200","300","regular","500","700","800","900"],"category":"sans-serif"},{"family":"Tangerine","variants":["regular","700"],"category":"handwriting"},{"family":"Tapestry","variants":["regular"],"category":"handwriting"},{"family":"Taprom","variants":["regular"],"category":"display"},{"family":"Tauri","variants":["regular"],"category":"sans-serif"},{"family":"Taviraj","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"serif"},{"family":"Teachers","variants":["regular","500","600","700","800","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Teko","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Tektur","variants":["regular","500","600","700","800","900"],"category":"display"},{"family":"Telex","variants":["regular"],"category":"sans-serif"},{"family":"Tenali Ramakrishna","variants":["regular"],"category":"sans-serif"},{"family":"Tenor Sans","variants":["regular"],"category":"sans-serif"},{"family":"Text Me One","variants":["regular"],"category":"sans-serif"},{"family":"Texturina","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Thasadith","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"The Girl Next Door","variants":["regular"],"category":"handwriting"},{"family":"The Nautigal","variants":["regular","700"],"category":"handwriting"},{"family":"Tienne","variants":["regular","700","900"],"category":"serif"},{"family":"TikTok Sans","variants":["300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Tillana","variants":["regular","500","600","700","800"],"category":"display"},{"family":"Tilt Neon","variants":["regular"],"category":"display"},{"family":"Tilt Prism","variants":["regular"],"category":"display"},{"family":"Tilt Warp","variants":["regular"],"category":"display"},{"family":"Timmana","variants":["regular"],"category":"sans-serif"},{"family":"Tinos","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Tiny5","variants":["regular"],"category":"sans-serif"},{"family":"Tiro Bangla","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Devanagari Hindi","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Devanagari Marathi","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Devanagari Sanskrit","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Gurmukhi","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Kannada","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Tamil","variants":["regular","italic"],"category":"serif"},{"family":"Tiro Telugu","variants":["regular","italic"],"category":"serif"},{"family":"Tirra","variants":["regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Titan One","variants":["regular"],"category":"display"},{"family":"Titillium Web","variants":["200","200italic","300","300italic","regular","italic","600","600italic","700","700italic","900"],"category":"sans-serif"},{"family":"Tomorrow","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"sans-serif"},{"family":"Tourney","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"display"},{"family":"Trade Winds","variants":["regular"],"category":"display"},{"family":"Train One","variants":["regular"],"category":"display"},{"family":"Triodion","variants":["regular"],"category":"display"},{"family":"Trirong","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"category":"serif"},{"family":"Trispace","variants":["100","200","300","regular","500","600","700","800"],"category":"sans-serif"},{"family":"Trocchi","variants":["regular"],"category":"serif"},{"family":"Trochut","variants":["regular","italic","700"],"category":"display"},{"family":"Truculenta","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Trykker","variants":["regular"],"category":"serif"},{"family":"Tsukimi Rounded","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Tuffy","variants":["regular","italic","700","700italic"],"category":"sans-serif"},{"family":"Tulpen One","variants":["regular"],"category":"display"},{"family":"Turret Road","variants":["200","300","regular","500","700","800"],"category":"display"},{"family":"Twinkle Star","variants":["regular"],"category":"handwriting"},{"family":"Ubuntu","variants":["300","300italic","regular","italic","500","500italic","700","700italic"],"category":"sans-serif"},{"family":"Ubuntu Condensed","variants":["regular"],"category":"sans-serif"},{"family":"Ubuntu Mono","variants":["regular","italic","700","700italic"],"category":"monospace"},{"family":"Ubuntu Sans","variants":["100","200","300","regular","500","600","700","800","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic"],"category":"sans-serif"},{"family":"Ubuntu Sans Mono","variants":["regular","500","600","700","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Uchen","variants":["regular"],"category":"serif"},{"family":"Ultra","variants":["regular"],"category":"serif"},{"family":"Unbounded","variants":["200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Uncial Antiqua","variants":["regular"],"category":"display"},{"family":"Underdog","variants":["regular"],"category":"display"},{"family":"Unica One","variants":["regular"],"category":"display"},{"family":"UnifrakturCook","variants":["700"],"category":"display"},{"family":"UnifrakturMaguntia","variants":["regular"],"category":"display"},{"family":"Unkempt","variants":["regular","700"],"category":"display"},{"family":"Unlock","variants":["regular"],"category":"display"},{"family":"Unna","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"UoqMunThenKhung","variants":["regular"],"category":"serif"},{"family":"Updock","variants":["regular"],"category":"handwriting"},{"family":"Urbanist","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"VT323","variants":["regular"],"category":"monospace"},{"family":"Vampiro One","variants":["regular"],"category":"display"},{"family":"Varela","variants":["regular"],"category":"sans-serif"},{"family":"Varela Round","variants":["regular"],"category":"sans-serif"},{"family":"Varta","variants":["300","regular","500","600","700"],"category":"sans-serif"},{"family":"Vast Shadow","variants":["regular"],"category":"serif"},{"family":"Vazirmatn","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Vend Sans","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"sans-serif"},{"family":"Vesper Libre","variants":["regular","500","700","900"],"category":"serif"},{"family":"Viaoda Libre","variants":["regular"],"category":"display"},{"family":"Vibes","variants":["regular"],"category":"display"},{"family":"Vibur","variants":["regular"],"category":"handwriting"},{"family":"Victor Mono","variants":["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"],"category":"monospace"},{"family":"Vidaloka","variants":["regular"],"category":"serif"},{"family":"Viga","variants":["regular"],"category":"sans-serif"},{"family":"Vina Sans","variants":["regular"],"category":"display"},{"family":"Voces","variants":["regular"],"category":"sans-serif"},{"family":"Volkhov","variants":["regular","italic","700","700italic"],"category":"serif"},{"family":"Vollkorn","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Vollkorn SC","variants":["regular","600","700","900"],"category":"serif"},{"family":"Voltaire","variants":["regular"],"category":"sans-serif"},{"family":"Vujahday Script","variants":["regular"],"category":"handwriting"},{"family":"WDXL Lubrifont JP N","variants":["regular"],"category":"sans-serif"},{"family":"WDXL Lubrifont SC","variants":["regular"],"category":"sans-serif"},{"family":"WDXL Lubrifont TC","variants":["regular"],"category":"sans-serif"},{"family":"Waiting for the Sunrise","variants":["regular"],"category":"handwriting"},{"family":"Wallpoet","variants":["regular"],"category":"display"},{"family":"Walter Turncoat","variants":["regular"],"category":"handwriting"},{"family":"Warnes","variants":["regular"],"category":"display"},{"family":"Water Brush","variants":["regular"],"category":"handwriting"},{"family":"Waterfall","variants":["regular"],"category":"handwriting"},{"family":"Wavefont","variants":["100","200","300","regular","500","600","700","800","900"],"category":"display"},{"family":"Wellfleet","variants":["regular"],"category":"serif"},{"family":"Wendy One","variants":["regular"],"category":"sans-serif"},{"family":"Whisper","variants":["regular"],"category":"handwriting"},{"family":"WindSong","variants":["regular","500"],"category":"handwriting"},{"family":"Winky Rough","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Winky Sans","variants":["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Wire One","variants":["regular"],"category":"sans-serif"},{"family":"Wittgenstein","variants":["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"],"category":"serif"},{"family":"Wix Madefor Display","variants":["regular","500","600","700","800"],"category":"sans-serif"},{"family":"Wix Madefor Text","variants":["regular","italic","500","500italic","600","600italic","700","700italic","800","800italic"],"category":"sans-serif"},{"family":"Work Sans","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Workbench","variants":["regular"],"category":"monospace"},{"family":"Xanh Mono","variants":["regular","italic"],"category":"monospace"},{"family":"Yaldevi","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Yanone Kaffeesatz","variants":["200","300","regular","500","600","700"],"category":"sans-serif"},{"family":"Yantramanav","variants":["100","300","regular","500","700","900"],"category":"sans-serif"},{"family":"Yarndings 12","variants":["regular"],"category":"display"},{"family":"Yarndings 12 Charted","variants":["regular"],"category":"display"},{"family":"Yarndings 20","variants":["regular"],"category":"display"},{"family":"Yarndings 20 Charted","variants":["regular"],"category":"display"},{"family":"Yatra One","variants":["regular"],"category":"display"},{"family":"Yellowtail","variants":["regular"],"category":"handwriting"},{"family":"Yeon Sung","variants":["regular"],"category":"display"},{"family":"Yeseva One","variants":["regular"],"category":"display"},{"family":"Yesteryear","variants":["regular"],"category":"handwriting"},{"family":"Yomogi","variants":["regular"],"category":"handwriting"},{"family":"Young Serif","variants":["regular"],"category":"serif"},{"family":"Yrsa","variants":["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"],"category":"serif"},{"family":"Ysabeau","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Ysabeau Infant","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Ysabeau Office","variants":["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Ysabeau SC","variants":["100","200","300","regular","500","600","700","800","900"],"category":"sans-serif"},{"family":"Yuji Boku","variants":["regular"],"category":"serif"},{"family":"Yuji Hentaigana Akari","variants":["regular"],"category":"handwriting"},{"family":"Yuji Hentaigana Akebono","variants":["regular"],"category":"handwriting"},{"family":"Yuji Mai","variants":["regular"],"category":"serif"},{"family":"Yuji Syuku","variants":["regular"],"category":"serif"},{"family":"Yusei Magic","variants":["regular"],"category":"sans-serif"},{"family":"ZCOOL KuaiLe","variants":["regular"],"category":"sans-serif"},{"family":"ZCOOL QingKe HuangYou","variants":["regular"],"category":"sans-serif"},{"family":"ZCOOL XiaoWei","variants":["regular"],"category":"sans-serif"},{"family":"Zain","variants":["200","300","300italic","regular","italic","700","800","900"],"category":"sans-serif"},{"family":"Zalando Sans","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Zalando Sans Expanded","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Zalando Sans SemiExpanded","variants":["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"],"category":"sans-serif"},{"family":"Zen Antique","variants":["regular"],"category":"serif"},{"family":"Zen Antique Soft","variants":["regular"],"category":"serif"},{"family":"Zen Dots","variants":["regular"],"category":"display"},{"family":"Zen Kaku Gothic Antique","variants":["300","regular","500","700","900"],"category":"sans-serif"},{"family":"Zen Kaku Gothic New","variants":["300","regular","500","700","900"],"category":"sans-serif"},{"family":"Zen Kurenaido","variants":["regular"],"category":"sans-serif"},{"family":"Zen Loop","variants":["regular","italic"],"category":"display"},{"family":"Zen Maru Gothic","variants":["300","regular","500","700","900"],"category":"sans-serif"},{"family":"Zen Old Mincho","variants":["regular","500","600","700","900"],"category":"serif"},{"family":"Zen Tokyo Zoo","variants":["regular"],"category":"display"},{"family":"Zeyada","variants":["regular"],"category":"handwriting"},{"family":"Zhi Mang Xing","variants":["regular"],"category":"handwriting"},{"family":"Zilla Slab","variants":["300","300italic","regular","italic","500","500italic","600","600italic","700","700italic"],"category":"serif"},{"family":"Zilla Slab Highlight","variants":["regular","700"],"category":"serif"}]');

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
/* harmony import */ var _components_icon_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/icon-picker */ "./src/components/icon-picker.js");
/* harmony import */ var _components_toggle_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/toggle-button */ "./src/components/toggle-button.js");
/* harmony import */ var _components_alignment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/alignment */ "./src/components/alignment.js");
/* harmony import */ var _components_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/typography */ "./src/components/typography.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
const {
    controlConstructor,
    Control,
    section
  } = wp.customize,
  {
    createRoot
  } = wp.element;








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
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_box_shadow__WEBPACK_IMPORTED_MODULE_0__.BoxShadowComponent, {
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
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_radio_image__WEBPACK_IMPORTED_MODULE_1__.RadioImageComponent, {
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
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_section_tab__WEBPACK_IMPORTED_MODULE_2__.SectionTabComponent, {
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

/**
 * MARK: Icon Picker
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor['icon-picker'] = Control.extend({
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
    const renderIconPicker = () => {
      if (rendered) return;
      rendered = true;
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_icon_picker__WEBPACK_IMPORTED_MODULE_3__.IconPickerComponent, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    if (_thisSection) {
      section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
        if (isExpanded) renderIconPicker();
      });
    } else {
      renderIconPicker();
    }

    /**
     * Unbind if the controls container <li> tag is remoed
     */
    container.on('remove', () => reactRoot.unmount());
  }
});

/**
 * MARK: Toggle Button
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor['toggle-button'] = Control.extend({
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
    const renderToggleButton = () => {
      if (rendered) return;
      rendered = true;
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_toggle_button__WEBPACK_IMPORTED_MODULE_4__.ToggleButtonComponent, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    if (_thisSection) {
      section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
        if (isExpanded) renderToggleButton();
      });
    } else {
      renderToggleButton();
    }

    /**
     * Unbind if the controls container <li> tag is remoed
     */
    container.on('remove', () => reactRoot.unmount());
  }
});

/**
 * MARK: Radio Tab
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor['radio-tab'] = Control.extend({
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
    const renderRadioTab = () => {
      if (rendered) return;
      rendered = true;
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_alignment__WEBPACK_IMPORTED_MODULE_5__.Example, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    if (_thisSection) {
      section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
        if (isExpanded) renderRadioTab();
      });
    } else {
      renderRadioTab();
    }

    /**
     * Unbind if the controls container <li> tag is remoed
     */
    container.on('remove', () => reactRoot.unmount());
  }
});

/**
 * MARK: Typography
 * 
 * @package I am News
 * @since 1.0.0
 */
controlConstructor['typography'] = Control.extend({
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
    const renderTypography = () => {
      if (rendered) return;
      rendered = true;
      reactRoot.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_typography__WEBPACK_IMPORTED_MODULE_6__.TypographComponent, {
        ...props
      }));
    };

    /**
     * Lazy load when the section expands
     * Component will mount only when section is mounted
     */
    if (_thisSection) {
      section(_thisSection()).expanded.bind('expanded', function (isExpanded) {
        if (isExpanded) renderTypography();
      });
    } else {
      renderTypography();
    }

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