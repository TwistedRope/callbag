!function(n,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var t=r();for(var e in t)("object"==typeof exports?exports:n)[e]=t[e]}}("undefined"!=typeof self?self:this,function(){return function(n){function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e})},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},r.p="",r(r.s=0)}([function(n,r){function t(n){if(Array.isArray(n)){for(var r=0,t=Array(n.length);r<n.length;r++)t[r]=n[r];return t}return Array.from(n)}var e=function(){var n=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()},o=function(n){return null!=n&&"function"==typeof n[Symbol.iterator]};r.createCallbag=function(){var n=[],r=[],u=function(n){var t=e();return r.push({uuid:t,fn:n}),t},i=function(n){var t=r.findIndex(function(r){return r.uuid===n});return t>-1&&(r.splice(t,1),!0)},f=function(){for(var n=arguments.length,t=Array(n),e=0;e<n;e++)t[e]=arguments[e];r.forEach(function(n){n.fn.apply(n,t)})};return{speakTo:u,stopSpeakingTo:i,hearNow:f,hearFrom:function(r){var u=e();return n.push({uuid:u,fn:r}),{uuid:u,speak:function(){if(n.findIndex(function(n){return n.uuid===u})>-1){var e=r.apply(void 0,arguments);"string"!=typeof e&&o(e)?f.apply(void 0,t(e)):f(e)}}}},stopHearingFrom:function(r){var t=n.findIndex(function(n){return n.uuid===r});return t>-1&&(n.splice(t,1),!0)}}}}])});