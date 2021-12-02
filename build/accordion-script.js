/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/accordion-script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/accordion-script.js":
/*!*********************************!*\
  !*** ./src/accordion-script.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.mrw-accordion'),
        accordionsTotal = accordions.length,
        target = window.location.hash.substring(1);
  let i, accordion;

  for (i = 0; i < accordionsTotal; i = i + 1) {
    // A new instance of the accordion object is stored in the accordion variable on each iteration of the loop
    accordion = new AccordionMaker(accordions[i], i);
    accordion.init(accordions[i].id === target);
    console.log(accordions[i].id, target);
  }
});

const AccordionMaker = function (accordionContainer, i) {
  const accordionHeading = accordionContainer.querySelector('.mrw-accordion__heading'),
        accordionBody = accordionContainer.querySelector('.mrw-accordion__content'),
        // This function both creates the button and returns it
  accordionButton = addButtonToHeading(accordionHeading),
        accordionID = accordionContainer.id;

  this.init = function (isOpen) {
    accordionBody.id = accordionID + '-content';
    accordionButton.setAttribute('aria-controls', accordionBody.id); // ARIA and Event for Button

    accordionButton.setAttribute('aria-expanded', isOpen);
    accordionButton.addEventListener('click', accordionClick, false); // ARIA for body

    accordionBody.setAttribute('aria-hidden', !isOpen);
  };

  function addButtonToHeading(heading) {
    const headingHTML = heading.innerHTML,
          button = document.createElement('button');
    button.innerHTML = headingHTML.trim();
    heading.innerHTML = '';
    heading.appendChild(button);
    return button;
  }

  function accordionClick(e) {
    if ('false' === accordionButton.getAttribute('aria-expanded')) {
      accordionContainer.classList.toggle('is-open');
      accordionButton.setAttribute('aria-expanded', 'true');
      accordionBody.setAttribute('aria-hidden', 'false');
    } else {
      accordionContainer.classList.toggle('is-open');
      accordionButton.setAttribute('aria-expanded', 'false');
      accordionBody.setAttribute('aria-hidden', 'true');
    }
  }
};

/***/ })

/******/ });
//# sourceMappingURL=accordion-script.js.map