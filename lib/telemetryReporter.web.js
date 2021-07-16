(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK.Enums/EventsDiscardedReason.js
  var EventsDiscardedReason = {
    Unknown: 0,
    NonRetryableStatus: 1,
    InvalidEvent: 2,
    SizeLimitExceeded: 3,
    KillSwitch: 4,
    QueueFull: 5
  };

  // node_modules/@microsoft/applicationinsights-shims/dist-esm/Constants.js
  var strShimFunction = "function";
  var strShimObject = "object";
  var strShimUndefined = "undefined";
  var strShimPrototype = "prototype";
  var strShimHasOwnProperty = "hasOwnProperty";
  var ObjClass = Object;
  var ObjProto = ObjClass[strShimPrototype];
  var ObjAssign = ObjClass["assign"];
  var ObjCreate = ObjClass["create"];
  var ObjDefineProperty = ObjClass["defineProperty"];
  var ObjHasOwnProperty = ObjProto[strShimHasOwnProperty];

  // node_modules/@microsoft/applicationinsights-shims/dist-esm/Helpers.js
  function getGlobal() {
    if (typeof globalThis !== strShimUndefined && globalThis) {
      return globalThis;
    }
    if (typeof self !== strShimUndefined && self) {
      return self;
    }
    if (typeof window !== strShimUndefined && window) {
      return window;
    }
    if (typeof global !== strShimUndefined && global) {
      return global;
    }
    return null;
  }
  function throwTypeError(message) {
    throw new TypeError(message);
  }
  function objCreateFn(obj) {
    var func = ObjCreate;
    if (func) {
      return func(obj);
    }
    if (obj == null) {
      return {};
    }
    var type = typeof obj;
    if (type !== strShimObject && type !== strShimFunction) {
      throwTypeError("Object prototype may only be an Object:" + obj);
    }
    function tmpFunc() {
    }
    tmpFunc[strShimPrototype] = obj;
    return new tmpFunc();
  }

  // node_modules/@microsoft/applicationinsights-shims/dist-esm/TsLibShims.js
  var SymbolObj = (getGlobal() || {})["Symbol"];
  var ReflectObj = (getGlobal() || {})["Reflect"];
  var __objAssignFnImpl = function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (ObjProto[strShimHasOwnProperty].call(s, p)) {
          t[p] = s[p];
        }
      }
    }
    return t;
  };
  var __assignFn = ObjAssign || __objAssignFnImpl;
  var extendStaticsFn = function(d, b) {
    extendStaticsFn = ObjClass["setPrototypeOf"] || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) {
        if (b2[strShimHasOwnProperty](p)) {
          d2[p] = b2[p];
        }
      }
    };
    return extendStaticsFn(d, b);
  };
  function __extendsFn(d, b) {
    if (typeof b !== strShimFunction && b !== null) {
      throwTypeError("Class extends value " + String(b) + " is not a constructor or null");
    }
    extendStaticsFn(d, b);
    function __() {
      this.constructor = d;
    }
    d[strShimPrototype] = b === null ? objCreateFn(b) : (__[strShimPrototype] = b[strShimPrototype], new __());
  }

  // node_modules/@microsoft/dynamicproto-js/lib/dist/esm/dynamicproto-js.js
  var Constructor = "constructor";
  var Prototype = "prototype";
  var strFunction = "function";
  var DynInstFuncTable = "_dynInstFuncs";
  var DynProxyTag = "_isDynProxy";
  var DynClassName = "_dynClass";
  var DynClassNamePrefix = "_dynCls$";
  var DynInstChkTag = "_dynInstChk";
  var DynAllowInstChkTag = DynInstChkTag;
  var DynProtoDefaultOptions = "_dfOpts";
  var UnknownValue = "_unknown_";
  var str__Proto = "__proto__";
  var strUseBaseInst = "useBaseInst";
  var strSetInstFuncs = "setInstFuncs";
  var Obj = Object;
  var _objGetPrototypeOf = Obj["getPrototypeOf"];
  var _dynamicNames = 0;
  function _hasOwnProperty(obj, prop) {
    return obj && Obj[Prototype].hasOwnProperty.call(obj, prop);
  }
  function _isObjectOrArrayPrototype(target) {
    return target && (target === Obj[Prototype] || target === Array[Prototype]);
  }
  function _isObjectArrayOrFunctionPrototype(target) {
    return _isObjectOrArrayPrototype(target) || target === Function[Prototype];
  }
  function _getObjProto(target) {
    if (target) {
      if (_objGetPrototypeOf) {
        return _objGetPrototypeOf(target);
      }
      var newProto = target[str__Proto] || target[Prototype] || (target[Constructor] ? target[Constructor][Prototype] : null);
      if (newProto) {
        return newProto;
      }
    }
    return null;
  }
  function _forEachProp(target, func) {
    var props = [];
    var getOwnProps = Obj["getOwnPropertyNames"];
    if (getOwnProps) {
      props = getOwnProps(target);
    } else {
      for (var name_1 in target) {
        if (typeof name_1 === "string" && _hasOwnProperty(target, name_1)) {
          props.push(name_1);
        }
      }
    }
    if (props && props.length > 0) {
      for (var lp = 0; lp < props.length; lp++) {
        func(props[lp]);
      }
    }
  }
  function _isDynamicCandidate(target, funcName, skipOwn) {
    return funcName !== Constructor && typeof target[funcName] === strFunction && (skipOwn || _hasOwnProperty(target, funcName));
  }
  function _throwTypeError(message) {
    throw new TypeError("DynamicProto: " + message);
  }
  function _getInstanceFuncs(thisTarget) {
    var instFuncs = {};
    _forEachProp(thisTarget, function(name) {
      if (!instFuncs[name] && _isDynamicCandidate(thisTarget, name, false)) {
        instFuncs[name] = thisTarget[name];
      }
    });
    return instFuncs;
  }
  function _hasVisited(values, value) {
    for (var lp = values.length - 1; lp >= 0; lp--) {
      if (values[lp] === value) {
        return true;
      }
    }
    return false;
  }
  function _getBaseFuncs(classProto, thisTarget, instFuncs, useBaseInst) {
    function _instFuncProxy(target, funcHost, funcName) {
      var theFunc = funcHost[funcName];
      if (theFunc[DynProxyTag] && useBaseInst) {
        var instFuncTable = target[DynInstFuncTable] || {};
        if (instFuncTable[DynAllowInstChkTag] !== false) {
          theFunc = (instFuncTable[funcHost[DynClassName]] || {})[funcName] || theFunc;
        }
      }
      return function() {
        return theFunc.apply(target, arguments);
      };
    }
    var baseFuncs = {};
    _forEachProp(instFuncs, function(name) {
      baseFuncs[name] = _instFuncProxy(thisTarget, instFuncs, name);
    });
    var baseProto = _getObjProto(classProto);
    var visited = [];
    while (baseProto && !_isObjectArrayOrFunctionPrototype(baseProto) && !_hasVisited(visited, baseProto)) {
      _forEachProp(baseProto, function(name) {
        if (!baseFuncs[name] && _isDynamicCandidate(baseProto, name, !_objGetPrototypeOf)) {
          baseFuncs[name] = _instFuncProxy(thisTarget, baseProto, name);
        }
      });
      visited.push(baseProto);
      baseProto = _getObjProto(baseProto);
    }
    return baseFuncs;
  }
  function _getInstFunc(target, funcName, proto, currentDynProtoProxy) {
    var instFunc = null;
    if (target && _hasOwnProperty(proto, DynClassName)) {
      var instFuncTable = target[DynInstFuncTable] || {};
      instFunc = (instFuncTable[proto[DynClassName]] || {})[funcName];
      if (!instFunc) {
        _throwTypeError("Missing [" + funcName + "] " + strFunction);
      }
      if (!instFunc[DynInstChkTag] && instFuncTable[DynAllowInstChkTag] !== false) {
        var canAddInst = !_hasOwnProperty(target, funcName);
        var objProto = _getObjProto(target);
        var visited = [];
        while (canAddInst && objProto && !_isObjectArrayOrFunctionPrototype(objProto) && !_hasVisited(visited, objProto)) {
          var protoFunc = objProto[funcName];
          if (protoFunc) {
            canAddInst = protoFunc === currentDynProtoProxy;
            break;
          }
          visited.push(objProto);
          objProto = _getObjProto(objProto);
        }
        try {
          if (canAddInst) {
            target[funcName] = instFunc;
          }
          instFunc[DynInstChkTag] = 1;
        } catch (e) {
          instFuncTable[DynAllowInstChkTag] = false;
        }
      }
    }
    return instFunc;
  }
  function _getProtoFunc(funcName, proto, currentDynProtoProxy) {
    var protoFunc = proto[funcName];
    if (protoFunc === currentDynProtoProxy) {
      protoFunc = _getObjProto(proto)[funcName];
    }
    if (typeof protoFunc !== strFunction) {
      _throwTypeError("[" + funcName + "] is not a " + strFunction);
    }
    return protoFunc;
  }
  function _populatePrototype(proto, className, target, baseInstFuncs, setInstanceFunc) {
    function _createDynamicPrototype(proto2, funcName) {
      var dynProtoProxy = function() {
        var instFunc = _getInstFunc(this, funcName, proto2, dynProtoProxy) || _getProtoFunc(funcName, proto2, dynProtoProxy);
        return instFunc.apply(this, arguments);
      };
      dynProtoProxy[DynProxyTag] = 1;
      return dynProtoProxy;
    }
    if (!_isObjectOrArrayPrototype(proto)) {
      var instFuncTable = target[DynInstFuncTable] = target[DynInstFuncTable] || {};
      var instFuncs_1 = instFuncTable[className] = instFuncTable[className] || {};
      if (instFuncTable[DynAllowInstChkTag] !== false) {
        instFuncTable[DynAllowInstChkTag] = !!setInstanceFunc;
      }
      _forEachProp(target, function(name) {
        if (_isDynamicCandidate(target, name, false) && target[name] !== baseInstFuncs[name]) {
          instFuncs_1[name] = target[name];
          delete target[name];
          if (!_hasOwnProperty(proto, name) || proto[name] && !proto[name][DynProxyTag]) {
            proto[name] = _createDynamicPrototype(proto, name);
          }
        }
      });
    }
  }
  function _checkPrototype(classProto, thisTarget) {
    if (_objGetPrototypeOf) {
      var visited = [];
      var thisProto = _getObjProto(thisTarget);
      while (thisProto && !_isObjectArrayOrFunctionPrototype(thisProto) && !_hasVisited(visited, thisProto)) {
        if (thisProto === classProto) {
          return true;
        }
        visited.push(thisProto);
        thisProto = _getObjProto(thisProto);
      }
    }
    return false;
  }
  function _getObjName(target, unknownValue) {
    if (_hasOwnProperty(target, Prototype)) {
      return target.name || unknownValue || UnknownValue;
    }
    return ((target || {})[Constructor] || {}).name || unknownValue || UnknownValue;
  }
  function dynamicProto(theClass, target, delegateFunc, options) {
    if (!_hasOwnProperty(theClass, Prototype)) {
      _throwTypeError("theClass is an invalid class definition.");
    }
    var classProto = theClass[Prototype];
    if (!_checkPrototype(classProto, target)) {
      _throwTypeError("[" + _getObjName(theClass) + "] is not in class hierarchy of [" + _getObjName(target) + "]");
    }
    var className = null;
    if (_hasOwnProperty(classProto, DynClassName)) {
      className = classProto[DynClassName];
    } else {
      className = DynClassNamePrefix + _getObjName(theClass, "_") + "$" + _dynamicNames;
      _dynamicNames++;
      classProto[DynClassName] = className;
    }
    var perfOptions = dynamicProto[DynProtoDefaultOptions];
    var useBaseInst = !!perfOptions[strUseBaseInst];
    if (useBaseInst && options && options[strUseBaseInst] !== void 0) {
      useBaseInst = !!options[strUseBaseInst];
    }
    var instFuncs = _getInstanceFuncs(target);
    var baseFuncs = _getBaseFuncs(classProto, target, instFuncs, useBaseInst);
    delegateFunc(target, baseFuncs);
    var setInstanceFunc = !!_objGetPrototypeOf && !!perfOptions[strSetInstFuncs];
    if (setInstanceFunc && options) {
      setInstanceFunc = !!options[strSetInstFuncs];
    }
    _populatePrototype(classProto, className, target, instFuncs, setInstanceFunc !== false);
  }
  var perfDefaults = {
    setInstFuncs: true,
    useBaseInst: true
  };
  dynamicProto[DynProtoDefaultOptions] = perfDefaults;
  var dynamicproto_js_default = dynamicProto;

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK.Enums/LoggingEnums.js
  var LoggingSeverity;
  (function(LoggingSeverity2) {
    LoggingSeverity2[LoggingSeverity2["CRITICAL"] = 1] = "CRITICAL";
    LoggingSeverity2[LoggingSeverity2["WARNING"] = 2] = "WARNING";
  })(LoggingSeverity || (LoggingSeverity = {}));
  var _InternalMessageId = {
    BrowserDoesNotSupportLocalStorage: 0,
    BrowserCannotReadLocalStorage: 1,
    BrowserCannotReadSessionStorage: 2,
    BrowserCannotWriteLocalStorage: 3,
    BrowserCannotWriteSessionStorage: 4,
    BrowserFailedRemovalFromLocalStorage: 5,
    BrowserFailedRemovalFromSessionStorage: 6,
    CannotSendEmptyTelemetry: 7,
    ClientPerformanceMathError: 8,
    ErrorParsingAISessionCookie: 9,
    ErrorPVCalc: 10,
    ExceptionWhileLoggingError: 11,
    FailedAddingTelemetryToBuffer: 12,
    FailedMonitorAjaxAbort: 13,
    FailedMonitorAjaxDur: 14,
    FailedMonitorAjaxOpen: 15,
    FailedMonitorAjaxRSC: 16,
    FailedMonitorAjaxSend: 17,
    FailedMonitorAjaxGetCorrelationHeader: 18,
    FailedToAddHandlerForOnBeforeUnload: 19,
    FailedToSendQueuedTelemetry: 20,
    FailedToReportDataLoss: 21,
    FlushFailed: 22,
    MessageLimitPerPVExceeded: 23,
    MissingRequiredFieldSpecification: 24,
    NavigationTimingNotSupported: 25,
    OnError: 26,
    SessionRenewalDateIsZero: 27,
    SenderNotInitialized: 28,
    StartTrackEventFailed: 29,
    StopTrackEventFailed: 30,
    StartTrackFailed: 31,
    StopTrackFailed: 32,
    TelemetrySampledAndNotSent: 33,
    TrackEventFailed: 34,
    TrackExceptionFailed: 35,
    TrackMetricFailed: 36,
    TrackPVFailed: 37,
    TrackPVFailedCalc: 38,
    TrackTraceFailed: 39,
    TransmissionFailed: 40,
    FailedToSetStorageBuffer: 41,
    FailedToRestoreStorageBuffer: 42,
    InvalidBackendResponse: 43,
    FailedToFixDepricatedValues: 44,
    InvalidDurationValue: 45,
    TelemetryEnvelopeInvalid: 46,
    CreateEnvelopeError: 47,
    CannotSerializeObject: 48,
    CannotSerializeObjectNonSerializable: 49,
    CircularReferenceDetected: 50,
    ClearAuthContextFailed: 51,
    ExceptionTruncated: 52,
    IllegalCharsInName: 53,
    ItemNotInArray: 54,
    MaxAjaxPerPVExceeded: 55,
    MessageTruncated: 56,
    NameTooLong: 57,
    SampleRateOutOfRange: 58,
    SetAuthContextFailed: 59,
    SetAuthContextFailedAccountName: 60,
    StringValueTooLong: 61,
    StartCalledMoreThanOnce: 62,
    StopCalledWithoutStart: 63,
    TelemetryInitializerFailed: 64,
    TrackArgumentsNotSpecified: 65,
    UrlTooLong: 66,
    SessionStorageBufferFull: 67,
    CannotAccessCookie: 68,
    IdTooLong: 69,
    InvalidEvent: 70,
    FailedMonitorAjaxSetRequestHeader: 71,
    SendBrowserInfoOnUserInit: 72,
    PluginException: 73,
    NotificationException: 74,
    SnippetScriptLoadFailure: 99,
    InvalidInstrumentationKey: 100,
    CannotParseAiBlobValue: 101,
    InvalidContentBlob: 102,
    TrackPageActionEventFailed: 103
  };

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/HelperFuncs.js
  var strOnPrefix = "on";
  var strAttachEvent = "attachEvent";
  var strAddEventHelper = "addEventListener";
  var strDetachEvent = "detachEvent";
  var strRemoveEventListener = "removeEventListener";
  var _objDefineProperty = ObjDefineProperty;
  var _objFreeze = ObjClass["freeze"];
  var _objSeal = ObjClass["seal"];
  function objToString(obj) {
    return ObjProto.toString.call(obj);
  }
  function isUndefined(value) {
    return value === void 0 || typeof value === strShimUndefined;
  }
  function isNullOrUndefined(value) {
    return value === null || isUndefined(value);
  }
  function isNotNullOrUndefined(value) {
    return !isNullOrUndefined(value);
  }
  function hasOwnProperty(obj, prop) {
    return obj && ObjHasOwnProperty.call(obj, prop);
  }
  function isObject(value) {
    return typeof value === strShimObject;
  }
  function isFunction(value) {
    return typeof value === strShimFunction;
  }
  function attachEvent(obj, eventNameWithoutOn, handlerRef, useCapture) {
    if (useCapture === void 0) {
      useCapture = false;
    }
    var result = false;
    if (!isNullOrUndefined(obj)) {
      try {
        if (!isNullOrUndefined(obj[strAddEventHelper])) {
          obj[strAddEventHelper](eventNameWithoutOn, handlerRef, useCapture);
          result = true;
        } else if (!isNullOrUndefined(obj[strAttachEvent])) {
          obj[strAttachEvent](strOnPrefix + eventNameWithoutOn, handlerRef);
          result = true;
        }
      } catch (e) {
      }
    }
    return result;
  }
  function detachEvent(obj, eventNameWithoutOn, handlerRef, useCapture) {
    if (useCapture === void 0) {
      useCapture = false;
    }
    if (!isNullOrUndefined(obj)) {
      try {
        if (!isNullOrUndefined(obj[strRemoveEventListener])) {
          obj[strRemoveEventListener](eventNameWithoutOn, handlerRef, useCapture);
        } else if (!isNullOrUndefined(obj[strDetachEvent])) {
          obj[strDetachEvent](strOnPrefix + eventNameWithoutOn, handlerRef);
        }
      } catch (e) {
      }
    }
  }
  function normalizeJsName(name) {
    var value = name;
    var match = /([^\w\d_$])/g;
    if (match.test(name)) {
      value = name.replace(match, "_");
    }
    return value;
  }
  function objForEachKey(target, callbackfn) {
    if (target) {
      for (var prop in target) {
        if (ObjHasOwnProperty.call(target, prop)) {
          callbackfn.call(target, prop, target[prop]);
        }
      }
    }
  }
  function strEndsWith(value, search) {
    if (value && search) {
      var searchLen = search.length;
      var valLen = value.length;
      if (value === search) {
        return true;
      } else if (valLen >= searchLen) {
        var pos = valLen - 1;
        for (var lp = searchLen - 1; lp >= 0; lp--) {
          if (value[pos] != search[lp]) {
            return false;
          }
          pos--;
        }
        return true;
      }
    }
    return false;
  }
  function strContains(value, search) {
    if (value && search) {
      return value.indexOf(search) !== -1;
    }
    return false;
  }
  function isDate(obj) {
    return objToString(obj) === "[object Date]";
  }
  function isArray(obj) {
    return objToString(obj) === "[object Array]";
  }
  function isError(obj) {
    return objToString(obj) === "[object Error]";
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function toISOString(date) {
    if (isDate(date)) {
      var pad = function(num) {
        var r = String(num);
        if (r.length === 1) {
          r = "0" + r;
        }
        return r;
      };
      return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + "T" + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + "." + String((date.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z";
    }
  }
  function arrForEach(arr, callbackfn, thisArg) {
    var len = arr.length;
    for (var idx = 0; idx < len; idx++) {
      if (idx in arr) {
        if (callbackfn.call(thisArg || arr, arr[idx], idx, arr) === -1) {
          break;
        }
      }
    }
  }
  function arrIndexOf(arr, searchElement, fromIndex) {
    var len = arr.length;
    var from = fromIndex || 0;
    for (var lp = Math.max(from >= 0 ? from : len - Math.abs(from), 0); lp < len; lp++) {
      if (lp in arr && arr[lp] === searchElement) {
        return lp;
      }
    }
    return -1;
  }
  function arrMap(arr, callbackfn, thisArg) {
    var len = arr.length;
    var _this = thisArg || arr;
    var results = new Array(len);
    for (var lp = 0; lp < len; lp++) {
      if (lp in arr) {
        results[lp] = callbackfn.call(_this, arr[lp], arr);
      }
    }
    return results;
  }
  function arrReduce(arr, callbackfn, initialValue) {
    var len = arr.length;
    var lp = 0;
    var value;
    if (arguments.length >= 3) {
      value = arguments[2];
    } else {
      while (lp < len && !(lp in arr)) {
        lp++;
      }
      value = arr[lp++];
    }
    while (lp < len) {
      if (lp in arr) {
        value = callbackfn(value, arr[lp], lp, arr);
      }
      lp++;
    }
    return value;
  }
  function strTrim(str) {
    if (typeof str !== "string") {
      return str;
    }
    return str.replace(/^\s+|\s+$/g, "");
  }
  var _objKeysHasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
  var _objKeysDontEnums = [
    "toString",
    "toLocaleString",
    "valueOf",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "constructor"
  ];
  function objKeys(obj) {
    var objType = typeof obj;
    if (objType !== strShimFunction && (objType !== strShimObject || obj === null)) {
      throwTypeError("objKeys called on non-object");
    }
    var result = [];
    for (var prop in obj) {
      if (obj && ObjHasOwnProperty.call(obj, prop)) {
        result.push(prop);
      }
    }
    if (_objKeysHasDontEnumBug) {
      var dontEnumsLength = _objKeysDontEnums.length;
      for (var lp = 0; lp < dontEnumsLength; lp++) {
        if (obj && ObjHasOwnProperty.call(obj, _objKeysDontEnums[lp])) {
          result.push(_objKeysDontEnums[lp]);
        }
      }
    }
    return result;
  }
  function objDefineAccessors(target, prop, getProp, setProp) {
    if (_objDefineProperty) {
      try {
        var descriptor = {
          enumerable: true,
          configurable: true
        };
        if (getProp) {
          descriptor.get = getProp;
        }
        if (setProp) {
          descriptor.set = setProp;
        }
        _objDefineProperty(target, prop, descriptor);
        return true;
      } catch (e) {
      }
    }
    return false;
  }
  function dateNow() {
    var dt = Date;
    if (dt.now) {
      return dt.now();
    }
    return new dt().getTime();
  }
  function getExceptionName(object) {
    if (isError(object)) {
      return object.name;
    }
    return "";
  }
  function setValue(target, field, value, valChk, srcChk) {
    var theValue = value;
    if (target) {
      theValue = target[field];
      if (theValue !== value && (!srcChk || srcChk(theValue)) && (!valChk || valChk(value))) {
        theValue = value;
        target[field] = theValue;
      }
    }
    return theValue;
  }
  function getSetValue(target, field, defValue) {
    var theValue;
    if (target) {
      theValue = target[field];
      if (!theValue && isNullOrUndefined(theValue)) {
        theValue = !isUndefined(defValue) ? defValue : {};
        target[field] = theValue;
      }
    } else {
      theValue = !isUndefined(defValue) ? defValue : {};
    }
    return theValue;
  }
  function isNotTruthy(value) {
    return !value;
  }
  function isTruthy(value) {
    return !!value;
  }
  function throwError(message) {
    throw new Error(message);
  }
  function proxyAssign(target, source, chkSet) {
    if (target && source && target !== source && isObject(target) && isObject(source)) {
      var _loop_1 = function(field2) {
        if (isString(field2)) {
          var value = source[field2];
          if (isFunction(value)) {
            if (!chkSet || chkSet(field2, true, source, target)) {
              target[field2] = function(funcName) {
                return function() {
                  var originalArguments = arguments;
                  return source[funcName].apply(source, originalArguments);
                };
              }(field2);
            }
          } else if (!chkSet || chkSet(field2, false, source, target)) {
            if (hasOwnProperty(target, field2)) {
              delete target[field2];
            }
            if (!objDefineAccessors(target, field2, function() {
              return source[field2];
            }, function(theValue) {
              source[field2] = theValue;
            })) {
              target[field2] = value;
            }
          }
        }
      };
      for (var field in source) {
        _loop_1(field);
      }
    }
    return target;
  }
  function createClassFromInterface(defaults) {
    return function() {
      function class_1() {
        var _this = this;
        if (defaults) {
          objForEachKey(defaults, function(field, value) {
            _this[field] = value;
          });
        }
      }
      return class_1;
    }();
  }
  function optimizeObject(theObject) {
    if (theObject) {
      theObject = ObjClass(ObjAssign ? ObjAssign({}, theObject) : theObject);
    }
    return theObject;
  }

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/EnvUtils.js
  "use strict";
  var strWindow = "window";
  var strDocument = "document";
  var strNavigator = "navigator";
  var strHistory = "history";
  var strLocation = "location";
  var strConsole = "console";
  var strPerformance = "performance";
  var strJSON = "JSON";
  var strCrypto = "crypto";
  var strMsCrypto = "msCrypto";
  var strReactNative = "ReactNative";
  var strMsie = "msie";
  var strTrident = "trident/";
  var _isTrident = null;
  var _navUserAgentCheck = null;
  var _enableMocks = false;
  function getGlobalInst(name) {
    var gbl = getGlobal();
    if (gbl && gbl[name]) {
      return gbl[name];
    }
    if (name === strWindow && hasWindow()) {
      return window;
    }
    return null;
  }
  function hasWindow() {
    return Boolean(typeof window === strShimObject && window);
  }
  function getWindow() {
    if (hasWindow()) {
      return window;
    }
    return getGlobalInst(strWindow);
  }
  function hasDocument() {
    return Boolean(typeof document === strShimObject && document);
  }
  function getDocument() {
    if (hasDocument()) {
      return document;
    }
    return getGlobalInst(strDocument);
  }
  function hasNavigator() {
    return Boolean(typeof navigator === strShimObject && navigator);
  }
  function getNavigator() {
    if (hasNavigator()) {
      return navigator;
    }
    return getGlobalInst(strNavigator);
  }
  function hasHistory() {
    return Boolean(typeof history === strShimObject && history);
  }
  function getHistory() {
    if (hasHistory()) {
      return history;
    }
    return getGlobalInst(strHistory);
  }
  function getLocation(checkForMock) {
    if (checkForMock && _enableMocks) {
      var mockLocation = getGlobalInst("__mockLocation");
      if (mockLocation) {
        return mockLocation;
      }
    }
    if (typeof location === strShimObject && location) {
      return location;
    }
    return getGlobalInst(strLocation);
  }
  function getConsole() {
    if (typeof console !== strShimUndefined) {
      return console;
    }
    return getGlobalInst(strConsole);
  }
  function getPerformance() {
    return getGlobalInst(strPerformance);
  }
  function hasJSON() {
    return Boolean(typeof JSON === strShimObject && JSON || getGlobalInst(strJSON) !== null);
  }
  function getJSON() {
    if (hasJSON()) {
      return JSON || getGlobalInst(strJSON);
    }
    return null;
  }
  function getCrypto() {
    return getGlobalInst(strCrypto);
  }
  function getMsCrypto() {
    return getGlobalInst(strMsCrypto);
  }
  function isReactNative() {
    var nav = getNavigator();
    if (nav && nav.product) {
      return nav.product === strReactNative;
    }
    return false;
  }
  function isIE() {
    var nav = getNavigator();
    if (nav && (nav.userAgent !== _navUserAgentCheck || _isTrident === null)) {
      _navUserAgentCheck = nav.userAgent;
      var userAgent = (_navUserAgentCheck || "").toLowerCase();
      _isTrident = strContains(userAgent, strMsie) || strContains(userAgent, strTrident);
    }
    return _isTrident;
  }
  function getIEVersion(userAgentStr) {
    if (userAgentStr === void 0) {
      userAgentStr = null;
    }
    if (!userAgentStr) {
      var navigator_1 = getNavigator() || {};
      userAgentStr = navigator_1 ? (navigator_1.userAgent || "").toLowerCase() : "";
    }
    var ua = (userAgentStr || "").toLowerCase();
    if (strContains(ua, strMsie)) {
      return parseInt(ua.split(strMsie)[1]);
    } else if (strContains(ua, strTrident)) {
      var tridentVer = parseInt(ua.split(strTrident)[1]);
      if (tridentVer) {
        return tridentVer + 4;
      }
    }
    return null;
  }
  function dumpObj(object) {
    var objectTypeDump = Object[strShimPrototype].toString.call(object);
    var propertyValueDump = "";
    if (objectTypeDump === "[object Error]") {
      propertyValueDump = "{ stack: '" + object.stack + "', message: '" + object.message + "', name: '" + object.name + "'";
    } else if (hasJSON()) {
      propertyValueDump = getJSON().stringify(object);
    }
    return objectTypeDump + propertyValueDump;
  }

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/DiagnosticLogger.js
  "use strict";
  var AiNonUserActionablePrefix = "AI (Internal): ";
  var AiUserActionablePrefix = "AI: ";
  var AIInternalMessagePrefix = "AITR_";
  function _sanitizeDiagnosticText(text) {
    if (text) {
      return '"' + text.replace(/\"/g, "") + '"';
    }
    return "";
  }
  var _InternalLogMessage = function() {
    function _InternalLogMessage2(msgId, msg, isUserAct, properties) {
      if (isUserAct === void 0) {
        isUserAct = false;
      }
      var _self = this;
      _self.messageId = msgId;
      _self.message = (isUserAct ? AiUserActionablePrefix : AiNonUserActionablePrefix) + msgId;
      var strProps = "";
      if (hasJSON()) {
        strProps = getJSON().stringify(properties);
      }
      var diagnosticText = (msg ? " message:" + _sanitizeDiagnosticText(msg) : "") + (properties ? " props:" + _sanitizeDiagnosticText(strProps) : "");
      _self.message += diagnosticText;
    }
    _InternalLogMessage2.dataType = "MessageData";
    return _InternalLogMessage2;
  }();
  function safeGetLogger(core, config) {
    return (core || {}).logger || new DiagnosticLogger(config);
  }
  var DiagnosticLogger = function() {
    function DiagnosticLogger2(config) {
      this.identifier = "DiagnosticLogger";
      this.queue = [];
      var _messageCount = 0;
      var _messageLogged = {};
      dynamicproto_js_default(DiagnosticLogger2, this, function(_self) {
        if (isNullOrUndefined(config)) {
          config = {};
        }
        _self.consoleLoggingLevel = function() {
          return _getConfigValue("loggingLevelConsole", 0);
        };
        _self.telemetryLoggingLevel = function() {
          return _getConfigValue("loggingLevelTelemetry", 1);
        };
        _self.maxInternalMessageLimit = function() {
          return _getConfigValue("maxMessageLimit", 25);
        };
        _self.enableDebugExceptions = function() {
          return _getConfigValue("enableDebugExceptions", false);
        };
        _self.throwInternal = function(severity, msgId, msg, properties, isUserAct) {
          if (isUserAct === void 0) {
            isUserAct = false;
          }
          var message = new _InternalLogMessage(msgId, msg, isUserAct, properties);
          if (_self.enableDebugExceptions()) {
            throw message;
          } else {
            if (!isUndefined(message.message)) {
              var logLevel = _self.consoleLoggingLevel();
              if (isUserAct) {
                var messageKey = +message.messageId;
                if (!_messageLogged[messageKey] && logLevel >= LoggingSeverity.WARNING) {
                  _self.warnToConsole(message.message);
                  _messageLogged[messageKey] = true;
                }
              } else {
                if (logLevel >= LoggingSeverity.WARNING) {
                  _self.warnToConsole(message.message);
                }
              }
              _self.logInternalMessage(severity, message);
            }
          }
        };
        _self.warnToConsole = function(message) {
          var theConsole = getConsole();
          if (!!theConsole) {
            var logFunc = "log";
            if (theConsole.warn) {
              logFunc = "warn";
            }
            if (isFunction(theConsole[logFunc])) {
              theConsole[logFunc](message);
            }
          }
        };
        _self.resetInternalMessageCount = function() {
          _messageCount = 0;
          _messageLogged = {};
        };
        _self.logInternalMessage = function(severity, message) {
          if (_areInternalMessagesThrottled()) {
            return;
          }
          var logMessage = true;
          var messageKey = AIInternalMessagePrefix + message.messageId;
          if (_messageLogged[messageKey]) {
            logMessage = false;
          } else {
            _messageLogged[messageKey] = true;
          }
          if (logMessage) {
            if (severity <= _self.telemetryLoggingLevel()) {
              _self.queue.push(message);
              _messageCount++;
            }
            if (_messageCount === _self.maxInternalMessageLimit()) {
              var throttleLimitMessage = "Internal events throttle limit per PageView reached for this app.";
              var throttleMessage = new _InternalLogMessage(_InternalMessageId.MessageLimitPerPVExceeded, throttleLimitMessage, false);
              _self.queue.push(throttleMessage);
              _self.warnToConsole(throttleLimitMessage);
            }
          }
        };
        function _getConfigValue(name, defValue) {
          var value = config[name];
          if (!isNullOrUndefined(value)) {
            return value;
          }
          return defValue;
        }
        function _areInternalMessagesThrottled() {
          return _messageCount >= _self.maxInternalMessageLimit();
        }
      });
    }
    return DiagnosticLogger2;
  }();

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/PerfManager.js
  var strExecutionContextKey = "ctx";
  var PerfEvent = function() {
    function PerfEvent2(name, payloadDetails, isAsync) {
      var _self = this;
      var accessorDefined = false;
      _self.start = dateNow();
      _self.name = name;
      _self.isAsync = isAsync;
      _self.isChildEvt = function() {
        return false;
      };
      if (isFunction(payloadDetails)) {
        var theDetails_1;
        accessorDefined = objDefineAccessors(_self, "payload", function() {
          if (!theDetails_1 && isFunction(payloadDetails)) {
            theDetails_1 = payloadDetails();
            payloadDetails = null;
          }
          return theDetails_1;
        });
      }
      _self.getCtx = function(key) {
        if (key) {
          if (key === PerfEvent2.ParentContextKey || key === PerfEvent2.ChildrenContextKey) {
            return _self[key];
          }
          return (_self[strExecutionContextKey] || {})[key];
        }
        return null;
      };
      _self.setCtx = function(key, value) {
        if (key) {
          if (key === PerfEvent2.ParentContextKey) {
            if (!_self[key]) {
              _self.isChildEvt = function() {
                return true;
              };
            }
            _self[key] = value;
          } else if (key === PerfEvent2.ChildrenContextKey) {
            _self[key] = value;
          } else {
            var ctx = _self[strExecutionContextKey] = _self[strExecutionContextKey] || {};
            ctx[key] = value;
          }
        }
      };
      _self.complete = function() {
        var childTime = 0;
        var childEvts = _self.getCtx(PerfEvent2.ChildrenContextKey);
        if (isArray(childEvts)) {
          for (var lp = 0; lp < childEvts.length; lp++) {
            var childEvt = childEvts[lp];
            if (childEvt) {
              childTime += childEvt.time;
            }
          }
        }
        _self.time = dateNow() - _self.start;
        _self.exTime = _self.time - childTime;
        _self.complete = function() {
        };
        if (!accessorDefined && isFunction(payloadDetails)) {
          _self.payload = payloadDetails();
        }
      };
    }
    PerfEvent2.ParentContextKey = "parent";
    PerfEvent2.ChildrenContextKey = "childEvts";
    return PerfEvent2;
  }();
  var PerfManager = function() {
    function PerfManager2(manager) {
      this.ctx = {};
      dynamicproto_js_default(PerfManager2, this, function(_self) {
        _self.create = function(src, payloadDetails, isAsync) {
          return new PerfEvent(src, payloadDetails, isAsync);
        };
        _self.fire = function(perfEvent) {
          if (perfEvent) {
            perfEvent.complete();
            if (manager) {
              manager.perfEvent(perfEvent);
            }
          }
        };
        _self.setCtx = function(key, value) {
          if (key) {
            var ctx = _self[strExecutionContextKey] = _self[strExecutionContextKey] || {};
            ctx[key] = value;
          }
        };
        _self.getCtx = function(key) {
          return (_self[strExecutionContextKey] || {})[key];
        };
      });
    }
    return PerfManager2;
  }();
  var doPerfActiveKey = "CoreUtils.doPerf";
  function doPerf(mgrSource, getSource, func, details, isAsync) {
    if (mgrSource) {
      var perfMgr = mgrSource;
      if (isFunction(perfMgr["getPerfMgr"])) {
        perfMgr = perfMgr["getPerfMgr"]();
      }
      if (perfMgr) {
        var perfEvt = void 0;
        var currentActive = perfMgr.getCtx(doPerfActiveKey);
        try {
          perfEvt = perfMgr.create(getSource(), details, isAsync);
          if (perfEvt) {
            if (currentActive && perfEvt.setCtx) {
              perfEvt.setCtx(PerfEvent.ParentContextKey, currentActive);
              if (currentActive.getCtx && currentActive.setCtx) {
                var children = currentActive.getCtx(PerfEvent.ChildrenContextKey);
                if (!children) {
                  children = [];
                  currentActive.setCtx(PerfEvent.ChildrenContextKey, children);
                }
                children.push(perfEvt);
              }
            }
            perfMgr.setCtx(doPerfActiveKey, perfEvt);
            return func(perfEvt);
          }
        } catch (ex) {
          if (perfEvt && perfEvt.setCtx) {
            perfEvt.setCtx("exception", ex);
          }
        } finally {
          if (perfEvt) {
            perfMgr.fire(perfEvt);
          }
          perfMgr.setCtx(doPerfActiveKey, currentActive);
        }
      }
    }
    return func();
  }

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryPluginChain.js
  "use strict";
  var TelemetryPluginChain = function() {
    function TelemetryPluginChain2(plugin, defItemCtx) {
      var _self = this;
      var _nextProxy = null;
      var _hasProcessTelemetry = isFunction(plugin.processTelemetry);
      var _hasSetNext = isFunction(plugin.setNextPlugin);
      _self._hasRun = false;
      _self.getPlugin = function() {
        return plugin;
      };
      _self.getNext = function() {
        return _nextProxy;
      };
      _self.setNext = function(nextPlugin) {
        _nextProxy = nextPlugin;
      };
      _self.processTelemetry = function(env, itemCtx) {
        if (!itemCtx) {
          itemCtx = defItemCtx;
        }
        var identifier = plugin ? plugin.identifier : "TelemetryPluginChain";
        doPerf(itemCtx ? itemCtx.core() : null, function() {
          return identifier + ":processTelemetry";
        }, function() {
          if (plugin && _hasProcessTelemetry) {
            _self._hasRun = true;
            try {
              itemCtx.setNext(_nextProxy);
              if (_hasSetNext) {
                plugin.setNextPlugin(_nextProxy);
              }
              _nextProxy && (_nextProxy._hasRun = false);
              plugin.processTelemetry(env, itemCtx);
            } catch (error) {
              var hasRun = _nextProxy && _nextProxy._hasRun;
              if (!_nextProxy || !hasRun) {
                itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.PluginException, "Plugin [" + plugin.identifier + "] failed during processTelemetry - " + error);
              }
              if (_nextProxy && !hasRun) {
                _nextProxy.processTelemetry(env, itemCtx);
              }
            }
          } else if (_nextProxy) {
            _self._hasRun = true;
            _nextProxy.processTelemetry(env, itemCtx);
          }
        }, function() {
          return { item: env };
        }, !env.sync);
      };
    }
    return TelemetryPluginChain2;
  }();

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/ProcessTelemetryContext.js
  "use strict";
  function _createProxyChain(plugins, itemCtx) {
    var proxies = [];
    if (plugins && plugins.length > 0) {
      var lastProxy = null;
      for (var idx = 0; idx < plugins.length; idx++) {
        var thePlugin = plugins[idx];
        if (thePlugin && isFunction(thePlugin.processTelemetry)) {
          var newProxy = new TelemetryPluginChain(thePlugin, itemCtx);
          proxies.push(newProxy);
          if (lastProxy) {
            lastProxy.setNext(newProxy);
          }
          lastProxy = newProxy;
        }
      }
    }
    return proxies.length > 0 ? proxies[0] : null;
  }
  function _copyProxyChain(proxy, itemCtx, startAt) {
    var plugins = [];
    var add = startAt ? false : true;
    if (proxy) {
      while (proxy) {
        var thePlugin = proxy.getPlugin();
        if (add || thePlugin === startAt) {
          add = true;
          plugins.push(thePlugin);
        }
        proxy = proxy.getNext();
      }
    }
    if (!add) {
      plugins.push(startAt);
    }
    return _createProxyChain(plugins, itemCtx);
  }
  function _copyPluginChain(srcPlugins, itemCtx, startAt) {
    var plugins = srcPlugins;
    var add = false;
    if (startAt && srcPlugins) {
      plugins = [];
      arrForEach(srcPlugins, function(thePlugin) {
        if (add || thePlugin === startAt) {
          add = true;
          plugins.push(thePlugin);
        }
      });
    }
    if (startAt && !add) {
      if (!plugins) {
        plugins = [];
      }
      plugins.push(startAt);
    }
    return _createProxyChain(plugins, itemCtx);
  }
  var ProcessTelemetryContext = function() {
    function ProcessTelemetryContext2(plugins, config, core, startAt) {
      var _self = this;
      var _nextProxy = null;
      if (startAt !== null) {
        if (plugins && isFunction(plugins.getPlugin)) {
          _nextProxy = _copyProxyChain(plugins, _self, startAt || plugins.getPlugin());
        } else {
          if (startAt) {
            _nextProxy = _copyPluginChain(plugins, _self, startAt);
          } else if (isUndefined(startAt)) {
            _nextProxy = _createProxyChain(plugins, _self);
          }
        }
      }
      _self.core = function() {
        return core;
      };
      _self.diagLog = function() {
        return safeGetLogger(core, config);
      };
      _self.getCfg = function() {
        return config;
      };
      _self.getExtCfg = function(identifier, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = {};
        }
        var theConfig;
        if (config) {
          var extConfig = config.extensionConfig;
          if (extConfig && identifier) {
            theConfig = extConfig[identifier];
          }
        }
        return theConfig ? theConfig : defaultValue;
      };
      _self.getConfig = function(identifier, field, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = false;
        }
        var theValue;
        var extConfig = _self.getExtCfg(identifier, null);
        if (extConfig && !isNullOrUndefined(extConfig[field])) {
          theValue = extConfig[field];
        } else if (config && !isNullOrUndefined(config[field])) {
          theValue = config[field];
        }
        return !isNullOrUndefined(theValue) ? theValue : defaultValue;
      };
      _self.hasNext = function() {
        return _nextProxy != null;
      };
      _self.getNext = function() {
        return _nextProxy;
      };
      _self.setNext = function(nextPlugin) {
        _nextProxy = nextPlugin;
      };
      _self.processNext = function(env) {
        var nextPlugin = _nextProxy;
        if (nextPlugin) {
          _nextProxy = nextPlugin.getNext();
          nextPlugin.processTelemetry(env, _self);
        }
      };
      _self.createNew = function(plugins2, startAt2) {
        if (plugins2 === void 0) {
          plugins2 = null;
        }
        return new ProcessTelemetryContext2(plugins2 || _nextProxy, config, core, startAt2);
      };
    }
    return ProcessTelemetryContext2;
  }();

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/Constants.js
  var strIKey = "iKey";
  var strExtensionConfig = "extensionConfig";

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/BaseTelemetryPlugin.js
  "use strict";
  var strGetPlugin = "getPlugin";
  var BaseTelemetryPlugin = function() {
    function BaseTelemetryPlugin2() {
      var _self = this;
      var _isinitialized = false;
      var _rootCtx = null;
      var _nextPlugin = null;
      _self.core = null;
      _self.diagLog = function(itemCtx) {
        return _self._getTelCtx(itemCtx).diagLog();
      };
      _self.isInitialized = function() {
        return _isinitialized;
      };
      _self.setInitialized = function(isInitialized2) {
        _isinitialized = isInitialized2;
      };
      _self.setNextPlugin = function(next) {
        _nextPlugin = next;
      };
      _self.processNext = function(env, itemCtx) {
        if (itemCtx) {
          itemCtx.processNext(env);
        } else if (_nextPlugin && isFunction(_nextPlugin.processTelemetry)) {
          _nextPlugin.processTelemetry(env, null);
        }
      };
      _self._getTelCtx = function(currentCtx) {
        if (currentCtx === void 0) {
          currentCtx = null;
        }
        var itemCtx = currentCtx;
        if (!itemCtx) {
          var rootCtx = _rootCtx || new ProcessTelemetryContext(null, {}, _self.core);
          if (_nextPlugin && _nextPlugin[strGetPlugin]) {
            itemCtx = rootCtx.createNew(null, _nextPlugin[strGetPlugin]);
          } else {
            itemCtx = rootCtx.createNew(null, _nextPlugin);
          }
        }
        return itemCtx;
      };
      _self._baseTelInit = function(config, core, extensions, pluginChain) {
        if (config) {
          setValue(config, strExtensionConfig, [], null, isNullOrUndefined);
        }
        if (!pluginChain && core) {
          pluginChain = core.getProcessTelContext().getNext();
        }
        var nextPlugin = _nextPlugin;
        if (_nextPlugin && _nextPlugin[strGetPlugin]) {
          nextPlugin = _nextPlugin[strGetPlugin]();
        }
        _self.core = core;
        _rootCtx = new ProcessTelemetryContext(pluginChain, config, core, nextPlugin);
        _isinitialized = true;
      };
    }
    BaseTelemetryPlugin2.prototype.initialize = function(config, core, extensions, pluginChain) {
      this._baseTelInit(config, core, extensions, pluginChain);
    };
    return BaseTelemetryPlugin2;
  }();

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js
  "use strict";
  var processTelemetry = "processTelemetry";
  var priority = "priority";
  var setNextPlugin = "setNextPlugin";
  var isInitialized = "isInitialized";
  function initializePlugins(processContext, extensions) {
    var initPlugins = [];
    var lastPlugin = null;
    var proxy = processContext.getNext();
    while (proxy) {
      var thePlugin = proxy.getPlugin();
      if (thePlugin) {
        if (lastPlugin && isFunction(lastPlugin[setNextPlugin]) && isFunction(thePlugin[processTelemetry])) {
          lastPlugin[setNextPlugin](thePlugin);
        }
        if (!isFunction(thePlugin[isInitialized]) || !thePlugin[isInitialized]()) {
          initPlugins.push(thePlugin);
        }
        lastPlugin = thePlugin;
        proxy = proxy.getNext();
      }
    }
    arrForEach(initPlugins, function(thePlugin2) {
      thePlugin2.initialize(processContext.getCfg(), processContext.core(), extensions, processContext.getNext());
    });
  }
  function sortPlugins(plugins) {
    return plugins.sort(function(extA, extB) {
      var result = 0;
      var bHasProcess = isFunction(extB[processTelemetry]);
      if (isFunction(extA[processTelemetry])) {
        result = bHasProcess ? extA[priority] - extB[priority] : 1;
      } else if (bHasProcess) {
        result = -1;
      }
      return result;
    });
  }

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/ChannelController.js
  "use strict";
  var ChannelControllerPriority = 500;
  var ChannelValidationMessage = "Channel has invalid priority";
  var ChannelController = function(_super) {
    __extendsFn(ChannelController2, _super);
    function ChannelController2() {
      var _this = _super.call(this) || this;
      _this.identifier = "ChannelControllerPlugin";
      _this.priority = ChannelControllerPriority;
      var _channelQueue;
      dynamicproto_js_default(ChannelController2, _this, function(_self, _base) {
        _self.setNextPlugin = function(next) {
        };
        _self.processTelemetry = function(item, itemCtx) {
          if (_channelQueue) {
            arrForEach(_channelQueue, function(queues) {
              if (queues.length > 0) {
                var chainCtx = _this._getTelCtx(itemCtx).createNew(queues);
                chainCtx.processNext(item);
              }
            });
          }
        };
        _self.getChannelControls = function() {
          return _channelQueue;
        };
        _self.initialize = function(config, core, extensions) {
          if (_self.isInitialized()) {
            return;
          }
          _base.initialize(config, core, extensions);
          _createChannelQueues((config || {}).channels, extensions);
          arrForEach(_channelQueue, function(queue) {
            return initializePlugins(new ProcessTelemetryContext(queue, config, core), extensions);
          });
        };
      });
      function _checkQueuePriority(queue) {
        arrForEach(queue, function(queueItem) {
          if (queueItem.priority < ChannelControllerPriority) {
            throwError(ChannelValidationMessage + queueItem.identifier);
          }
        });
      }
      function _addChannelQueue(queue) {
        if (queue && queue.length > 0) {
          queue = queue.sort(function(a, b) {
            return a.priority - b.priority;
          });
          _checkQueuePriority(queue);
          _channelQueue.push(queue);
        }
      }
      function _createChannelQueues(channels, extensions) {
        _channelQueue = [];
        if (channels) {
          arrForEach(channels, function(queue) {
            return _addChannelQueue(queue);
          });
        }
        if (extensions) {
          var extensionQueue_1 = [];
          arrForEach(extensions, function(plugin) {
            if (plugin.priority > ChannelControllerPriority) {
              extensionQueue_1.push(plugin);
            }
          });
          _addChannelQueue(extensionQueue_1);
        }
      }
      return _this;
    }
    ;
    ChannelController2._staticInit = function() {
      var proto = ChannelController2.prototype;
      objDefineAccessors(proto, "ChannelControls", proto.getChannelControls);
      objDefineAccessors(proto, "channelQueue", proto.getChannelControls);
    }();
    return ChannelController2;
  }(BaseTelemetryPlugin);

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/CookieMgr.js
  var strToGMTString = "toGMTString";
  var strToUTCString = "toUTCString";
  var strCookie = "cookie";
  var strExpires = "expires";
  var strEnabled = "enabled";
  var strIsCookieUseDisabled = "isCookieUseDisabled";
  var strDisableCookiesUsage = "disableCookiesUsage";
  var strConfigCookieMgr = "_ckMgr";
  var strEmpty = "";
  var _supportsCookies = null;
  var _allowUaSameSite = null;
  var _parsedCookieValue = null;
  var _doc = getDocument();
  var _cookieCache = {};
  var _globalCookieConfig = {};
  function _gblCookieMgr(config, logger) {
    var inst = createCookieMgr[strConfigCookieMgr] || _globalCookieConfig[strConfigCookieMgr];
    if (!inst) {
      inst = createCookieMgr[strConfigCookieMgr] = createCookieMgr(config, logger);
      _globalCookieConfig[strConfigCookieMgr] = inst;
    }
    return inst;
  }
  function _isMgrEnabled(cookieMgr) {
    if (cookieMgr) {
      return cookieMgr.isEnabled();
    }
    return true;
  }
  function _createCookieMgrConfig(rootConfig) {
    var cookieMgrCfg = rootConfig.cookieCfg = rootConfig.cookieCfg || {};
    setValue(cookieMgrCfg, "domain", rootConfig.cookieDomain, isNotNullOrUndefined, isNullOrUndefined);
    setValue(cookieMgrCfg, "path", rootConfig.cookiePath || "/", null, isNullOrUndefined);
    if (isNullOrUndefined(cookieMgrCfg[strEnabled])) {
      var cookieEnabled = void 0;
      if (!isUndefined(rootConfig[strIsCookieUseDisabled])) {
        cookieEnabled = !rootConfig[strIsCookieUseDisabled];
      }
      if (!isUndefined(rootConfig[strDisableCookiesUsage])) {
        cookieEnabled = !rootConfig[strDisableCookiesUsage];
      }
      cookieMgrCfg[strEnabled] = cookieEnabled;
    }
    return cookieMgrCfg;
  }
  function safeGetCookieMgr(core, config) {
    var cookieMgr;
    if (core) {
      cookieMgr = core.getCookieMgr();
    } else if (config) {
      var cookieCfg = config.cookieCfg;
      if (cookieCfg[strConfigCookieMgr]) {
        cookieMgr = cookieCfg[strConfigCookieMgr];
      } else {
        cookieMgr = createCookieMgr(config);
      }
    }
    if (!cookieMgr) {
      cookieMgr = _gblCookieMgr(config, (core || {}).logger);
    }
    return cookieMgr;
  }
  function createCookieMgr(rootConfig, logger) {
    var cookieMgrConfig = _createCookieMgrConfig(rootConfig || _globalCookieConfig);
    var _path = cookieMgrConfig.path || "/";
    var _domain = cookieMgrConfig.domain;
    var _enabled = cookieMgrConfig[strEnabled] !== false;
    var cookieMgr = {
      isEnabled: function() {
        var enabled = _enabled && areCookiesSupported(logger);
        var gblManager = _globalCookieConfig[strConfigCookieMgr];
        if (enabled && gblManager && cookieMgr !== gblManager) {
          enabled = _isMgrEnabled(gblManager);
        }
        return enabled;
      },
      setEnabled: function(value) {
        _enabled = value !== false;
      },
      set: function(name, value, maxAgeSec, domain, path) {
        if (_isMgrEnabled(cookieMgr)) {
          var values = {};
          var theValue = strTrim(value || strEmpty);
          var idx = theValue.indexOf(";");
          if (idx !== -1) {
            theValue = strTrim(value.substring(0, idx));
            values = _extractParts(value.substring(idx + 1));
          }
          setValue(values, "domain", domain || _domain, isTruthy, isUndefined);
          if (!isNullOrUndefined(maxAgeSec)) {
            var _isIE = isIE();
            if (isUndefined(values[strExpires])) {
              var nowMs = dateNow();
              var expireMs = nowMs + maxAgeSec * 1e3;
              if (expireMs > 0) {
                var expiry = new Date();
                expiry.setTime(expireMs);
                setValue(values, strExpires, _formatDate(expiry, !_isIE ? strToUTCString : strToGMTString) || _formatDate(expiry, _isIE ? strToGMTString : strToUTCString) || strEmpty, isTruthy);
              }
            }
            if (!_isIE) {
              setValue(values, "max-age", strEmpty + maxAgeSec, null, isUndefined);
            }
          }
          var location_1 = getLocation();
          if (location_1 && location_1.protocol === "https:") {
            setValue(values, "secure", null, null, isUndefined);
            if (_allowUaSameSite === null) {
              _allowUaSameSite = !uaDisallowsSameSiteNone((getNavigator() || {}).userAgent);
            }
            if (_allowUaSameSite) {
              setValue(values, "SameSite", "None", null, isUndefined);
            }
          }
          setValue(values, "path", path || _path, null, isUndefined);
          var setCookieFn = cookieMgrConfig.setCookie || _setCookieValue;
          setCookieFn(name, _formatCookieValue(theValue, values));
        }
      },
      get: function(name) {
        var value = strEmpty;
        if (_isMgrEnabled(cookieMgr)) {
          value = (cookieMgrConfig.getCookie || _getCookieValue)(name);
        }
        return value;
      },
      del: function(name, path) {
        if (_isMgrEnabled(cookieMgr)) {
          cookieMgr.purge(name, path);
        }
      },
      purge: function(name, path) {
        if (areCookiesSupported(logger)) {
          var values = (_a = {}, _a["path"] = path ? path : "/", _a[strExpires] = "Thu, 01 Jan 1970 00:00:01 GMT", _a);
          if (!isIE()) {
            values["max-age"] = "0";
          }
          var delCookie = cookieMgrConfig.delCookie || _setCookieValue;
          delCookie(name, _formatCookieValue(strEmpty, values));
        }
        var _a;
      }
    };
    cookieMgr[strConfigCookieMgr] = cookieMgr;
    return cookieMgr;
  }
  function areCookiesSupported(logger) {
    if (_supportsCookies === null) {
      _supportsCookies = false;
      try {
        var doc = _doc || {};
        _supportsCookies = doc[strCookie] !== void 0;
      } catch (e) {
        logger && logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.CannotAccessCookie, "Cannot access document.cookie - " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return _supportsCookies;
  }
  function _extractParts(theValue) {
    var values = {};
    if (theValue && theValue.length) {
      var parts = strTrim(theValue).split(";");
      arrForEach(parts, function(thePart) {
        thePart = strTrim(thePart || strEmpty);
        if (thePart) {
          var idx = thePart.indexOf("=");
          if (idx === -1) {
            values[thePart] = null;
          } else {
            values[strTrim(thePart.substring(0, idx))] = strTrim(thePart.substring(idx + 1));
          }
        }
      });
    }
    return values;
  }
  function _formatDate(theDate, func) {
    if (isFunction(theDate[func])) {
      return theDate[func]();
    }
    return null;
  }
  function _formatCookieValue(value, values) {
    var cookieValue = value || strEmpty;
    objForEachKey(values, function(name, theValue) {
      cookieValue += "; " + name + (!isNullOrUndefined(theValue) ? "=" + theValue : strEmpty);
    });
    return cookieValue;
  }
  function _getCookieValue(name) {
    var cookieValue = strEmpty;
    if (_doc) {
      var theCookie = _doc[strCookie] || strEmpty;
      if (_parsedCookieValue !== theCookie) {
        _cookieCache = _extractParts(theCookie);
        _parsedCookieValue = theCookie;
      }
      cookieValue = strTrim(_cookieCache[name] || strEmpty);
    }
    return cookieValue;
  }
  function _setCookieValue(name, cookieValue) {
    if (_doc) {
      _doc[strCookie] = name + "=" + cookieValue;
    }
  }
  function uaDisallowsSameSiteNone(userAgent) {
    if (!isString(userAgent)) {
      return false;
    }
    if (strContains(userAgent, "CPU iPhone OS 12") || strContains(userAgent, "iPad; CPU OS 12")) {
      return true;
    }
    if (strContains(userAgent, "Macintosh; Intel Mac OS X 10_14") && strContains(userAgent, "Version/") && strContains(userAgent, "Safari")) {
      return true;
    }
    if (strContains(userAgent, "Macintosh; Intel Mac OS X 10_14") && strEndsWith(userAgent, "AppleWebKit/605.1.15 (KHTML, like Gecko)")) {
      return true;
    }
    if (strContains(userAgent, "Chrome/5") || strContains(userAgent, "Chrome/6")) {
      return true;
    }
    if (strContains(userAgent, "UnrealEngine") && !strContains(userAgent, "Chrome")) {
      return true;
    }
    if (strContains(userAgent, "UCBrowser/12") || strContains(userAgent, "UCBrowser/11")) {
      return true;
    }
    return false;
  }

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/BaseCore.js
  "use strict";
  var validationError = "Extensions must provide callback to initialize";
  var strNotificationManager = "_notificationManager";
  var BaseCore = function() {
    function BaseCore2() {
      var _isInitialized = false;
      var _eventQueue;
      var _channelController;
      var _notificationManager;
      var _perfManager;
      var _cookieManager;
      dynamicproto_js_default(BaseCore2, this, function(_self) {
        _self._extensions = new Array();
        _channelController = new ChannelController();
        _self.logger = objCreateFn({
          throwInternal: function(severity, msgId, msg, properties, isUserAct) {
            if (isUserAct === void 0) {
              isUserAct = false;
            }
          },
          warnToConsole: function(message) {
          },
          resetInternalMessageCount: function() {
          }
        });
        _eventQueue = [];
        _self.isInitialized = function() {
          return _isInitialized;
        };
        _self.initialize = function(config, extensions, logger, notificationManager) {
          if (_self.isInitialized()) {
            throwError("Core should not be initialized more than once");
          }
          if (!config || isNullOrUndefined(config.instrumentationKey)) {
            throwError("Please provide instrumentation key");
          }
          _notificationManager = notificationManager;
          _self[strNotificationManager] = notificationManager;
          _self.config = config || {};
          config.extensions = isNullOrUndefined(config.extensions) ? [] : config.extensions;
          var extConfig = getSetValue(config, strExtensionConfig);
          extConfig.NotificationManager = notificationManager;
          if (logger) {
            _self.logger = logger;
          }
          var allExtensions = [];
          allExtensions.push.apply(allExtensions, extensions.concat(config.extensions));
          allExtensions = sortPlugins(allExtensions);
          var coreExtensions = [];
          var channelExtensions = [];
          var extPriorities = {};
          arrForEach(allExtensions, function(ext) {
            if (isNullOrUndefined(ext) || isNullOrUndefined(ext.initialize)) {
              throwError(validationError);
            }
            var extPriority = ext.priority;
            var identifier = ext.identifier;
            if (ext && extPriority) {
              if (!isNullOrUndefined(extPriorities[extPriority])) {
                logger.warnToConsole("Two extensions have same priority #" + extPriority + " - " + extPriorities[extPriority] + ", " + identifier);
              } else {
                extPriorities[extPriority] = identifier;
              }
            }
            if (!extPriority || extPriority < _channelController.priority) {
              coreExtensions.push(ext);
            } else {
              channelExtensions.push(ext);
            }
          });
          allExtensions.push(_channelController);
          coreExtensions.push(_channelController);
          allExtensions = sortPlugins(allExtensions);
          _self._extensions = allExtensions;
          initializePlugins(new ProcessTelemetryContext([_channelController], config, _self), allExtensions);
          initializePlugins(new ProcessTelemetryContext(coreExtensions, config, _self), allExtensions);
          _self._extensions = coreExtensions;
          if (_self.getTransmissionControls().length === 0) {
            throwError("No channels available");
          }
          _isInitialized = true;
          _self.releaseQueue();
        };
        _self.getTransmissionControls = function() {
          return _channelController.getChannelControls();
        };
        _self.track = function(telemetryItem) {
          setValue(telemetryItem, strIKey, _self.config.instrumentationKey, null, isNotTruthy);
          setValue(telemetryItem, "time", toISOString(new Date()), null, isNotTruthy);
          setValue(telemetryItem, "ver", "4.0", null, isNullOrUndefined);
          if (_self.isInitialized()) {
            _self.getProcessTelContext().processNext(telemetryItem);
          } else {
            _eventQueue.push(telemetryItem);
          }
        };
        _self.getProcessTelContext = function() {
          var extensions = _self._extensions;
          var thePlugins = extensions;
          if (!extensions || extensions.length === 0) {
            thePlugins = [_channelController];
          }
          return new ProcessTelemetryContext(thePlugins, _self.config, _self);
        };
        _self.getNotifyMgr = function() {
          if (!_notificationManager) {
            _notificationManager = objCreateFn({
              addNotificationListener: function(listener) {
              },
              removeNotificationListener: function(listener) {
              },
              eventsSent: function(events) {
              },
              eventsDiscarded: function(events, reason) {
              },
              eventsSendRequest: function(sendReason, isAsync) {
              }
            });
            _self[strNotificationManager] = _notificationManager;
          }
          return _notificationManager;
        };
        _self.getCookieMgr = function() {
          if (!_cookieManager) {
            _cookieManager = createCookieMgr(_self.config, _self.logger);
          }
          return _cookieManager;
        };
        _self.setCookieMgr = function(cookieMgr) {
          _cookieManager = cookieMgr;
        };
        _self.getPerfMgr = function() {
          if (!_perfManager) {
            if (_self.config && _self.config.enablePerfMgr) {
              _perfManager = new PerfManager(_self.getNotifyMgr());
            }
          }
          return _perfManager;
        };
        _self.setPerfMgr = function(perfMgr) {
          _perfManager = perfMgr;
        };
        _self.eventCnt = function() {
          return _eventQueue.length;
        };
        _self.releaseQueue = function() {
          if (_eventQueue.length > 0) {
            arrForEach(_eventQueue, function(event) {
              _self.getProcessTelContext().processNext(event);
            });
            _eventQueue = [];
          }
        };
      });
    }
    return BaseCore2;
  }();

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/NotificationManager.js
  var NotificationManager = function() {
    function NotificationManager2(config) {
      this.listeners = [];
      var perfEvtsSendAll = !!(config || {}).perfEvtsSendAll;
      dynamicproto_js_default(NotificationManager2, this, function(_self) {
        _self.addNotificationListener = function(listener) {
          _self.listeners.push(listener);
        };
        _self.removeNotificationListener = function(listener) {
          var index = arrIndexOf(_self.listeners, listener);
          while (index > -1) {
            _self.listeners.splice(index, 1);
            index = arrIndexOf(_self.listeners, listener);
          }
        };
        _self.eventsSent = function(events) {
          arrForEach(_self.listeners, function(listener) {
            if (listener && listener.eventsSent) {
              setTimeout(function() {
                return listener.eventsSent(events);
              }, 0);
            }
          });
        };
        _self.eventsDiscarded = function(events, reason) {
          arrForEach(_self.listeners, function(listener) {
            if (listener && listener.eventsDiscarded) {
              setTimeout(function() {
                return listener.eventsDiscarded(events, reason);
              }, 0);
            }
          });
        };
        _self.eventsSendRequest = function(sendReason, isAsync) {
          arrForEach(_self.listeners, function(listener) {
            if (listener && listener.eventsSendRequest) {
              if (isAsync) {
                setTimeout(function() {
                  return listener.eventsSendRequest(sendReason, isAsync);
                }, 0);
              } else {
                try {
                  listener.eventsSendRequest(sendReason, isAsync);
                } catch (e) {
                }
              }
            }
          });
        };
        _self.perfEvent = function(perfEvent) {
          if (perfEvent) {
            if (perfEvtsSendAll || !perfEvent.isChildEvt()) {
              arrForEach(_self.listeners, function(listener) {
                if (listener && listener.perfEvent) {
                  if (perfEvent.isAsync) {
                    setTimeout(function() {
                      return listener.perfEvent(perfEvent);
                    }, 0);
                  } else {
                    try {
                      listener.perfEvent(perfEvent);
                    } catch (e) {
                    }
                  }
                }
              });
            }
          }
        };
      });
    }
    return NotificationManager2;
  }();

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/AppInsightsCore.js
  var AppInsightsCore = function(_super) {
    __extendsFn(AppInsightsCore2, _super);
    function AppInsightsCore2() {
      var _this = _super.call(this) || this;
      dynamicproto_js_default(AppInsightsCore2, _this, function(_self, _base) {
        _self.initialize = function(config, extensions, logger, notificationManager) {
          _base.initialize(config, extensions, logger || new DiagnosticLogger(config), notificationManager || new NotificationManager(config));
        };
        _self.track = function(telemetryItem) {
          doPerf(_self.getPerfMgr(), function() {
            return "AppInsightsCore:track";
          }, function() {
            if (telemetryItem === null) {
              _notifyInvalidEvent(telemetryItem);
              throwError("Invalid telemetry item");
            }
            _validateTelemetryItem(telemetryItem);
            _base.track(telemetryItem);
          }, function() {
            return { item: telemetryItem };
          }, !telemetryItem.sync);
        };
        _self.addNotificationListener = function(listener) {
          var manager = _self.getNotifyMgr();
          if (manager) {
            manager.addNotificationListener(listener);
          }
        };
        _self.removeNotificationListener = function(listener) {
          var manager = _self.getNotifyMgr();
          if (manager) {
            manager.removeNotificationListener(listener);
          }
        };
        _self.pollInternalLogs = function(eventName) {
          var interval = _self.config.diagnosticLogInterval;
          if (!interval || !(interval > 0)) {
            interval = 1e4;
          }
          return setInterval(function() {
            var queue = _self.logger ? _self.logger.queue : [];
            arrForEach(queue, function(logMessage) {
              var item = {
                name: eventName ? eventName : "InternalMessageId: " + logMessage.messageId,
                iKey: _self.config.instrumentationKey,
                time: toISOString(new Date()),
                baseType: _InternalLogMessage.dataType,
                baseData: { message: logMessage.message }
              };
              _self.track(item);
            });
            queue.length = 0;
          }, interval);
        };
        function _validateTelemetryItem(telemetryItem) {
          if (isNullOrUndefined(telemetryItem.name)) {
            _notifyInvalidEvent(telemetryItem);
            throw Error("telemetry name required");
          }
        }
        function _notifyInvalidEvent(telemetryItem) {
          var manager = _self.getNotifyMgr();
          if (manager) {
            manager.eventsDiscarded([telemetryItem], EventsDiscardedReason.InvalidEvent);
          }
        }
      });
      return _this;
    }
    return AppInsightsCore2;
  }(BaseCore);

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/RandomHelper.js
  var UInt32Mask = 4294967296;
  var MaxUInt32 = 4294967295;
  var _mwcSeeded = false;
  var _mwcW = 123456789;
  var _mwcZ = 987654321;
  function _mwcSeed(seedValue) {
    if (seedValue < 0) {
      seedValue >>>= 0;
    }
    _mwcW = 123456789 + seedValue & MaxUInt32;
    _mwcZ = 987654321 - seedValue & MaxUInt32;
    _mwcSeeded = true;
  }
  function _autoSeedMwc() {
    try {
      var now = dateNow() & 2147483647;
      _mwcSeed((Math.random() * UInt32Mask ^ now) + now);
    } catch (e) {
    }
  }
  function random32(signed) {
    var value;
    var c = getCrypto() || getMsCrypto();
    if (c && c.getRandomValues) {
      value = c.getRandomValues(new Uint32Array(1))[0] & MaxUInt32;
    } else if (isIE()) {
      if (!_mwcSeeded) {
        _autoSeedMwc();
      }
      value = mwcRandom32() & MaxUInt32;
    } else {
      value = Math.floor(UInt32Mask * Math.random() | 0);
    }
    if (!signed) {
      value >>>= 0;
    }
    return value;
  }
  function mwcRandom32(signed) {
    _mwcZ = 36969 * (_mwcZ & 65535) + (_mwcZ >> 16) & MaxUInt32;
    _mwcW = 18e3 * (_mwcW & 65535) + (_mwcW >> 16) & MaxUInt32;
    var value = (_mwcZ << 16) + (_mwcW & 65535) >>> 0 & MaxUInt32 | 0;
    if (!signed) {
      value >>>= 0;
    }
    return value;
  }

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js
  "use strict";
  function addEventHandler(eventName, callback) {
    var result = false;
    var w = getWindow();
    if (w) {
      result = attachEvent(w, eventName, callback);
      result = attachEvent(w["body"], eventName, callback) || result;
    }
    var doc = getDocument();
    if (doc) {
      result = EventHelper.Attach(doc, eventName, callback) || result;
    }
    return result;
  }
  function newId(maxLength) {
    if (maxLength === void 0) {
      maxLength = 22;
    }
    var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var number = random32() >>> 0;
    var chars = 0;
    var result = "";
    while (result.length < maxLength) {
      chars++;
      result += base64chars.charAt(number & 63);
      number >>>= 6;
      if (chars === 5) {
        number = (random32() << 2 & 4294967295 | number & 3) >>> 0;
        chars = 0;
      }
    }
    return result;
  }
  function generateW3CId() {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var oct = "", tmp;
    for (var a = 0; a < 4; a++) {
      tmp = random32();
      oct += hexValues[tmp & 15] + hexValues[tmp >> 4 & 15] + hexValues[tmp >> 8 & 15] + hexValues[tmp >> 12 & 15] + hexValues[tmp >> 16 & 15] + hexValues[tmp >> 20 & 15] + hexValues[tmp >> 24 & 15] + hexValues[tmp >> 28 & 15];
    }
    var clockSequenceHi = hexValues[8 + (random32() & 3) | 0];
    return oct.substr(0, 8) + oct.substr(9, 4) + "4" + oct.substr(13, 3) + clockSequenceHi + oct.substr(16, 3) + oct.substr(19, 12);
  }
  var EventHelper = {
    Attach: attachEvent,
    AttachEvent: attachEvent,
    Detach: detachEvent,
    DetachEvent: detachEvent
  };

  // node_modules/@microsoft/applicationinsights-core-js/dist-esm/JavaScriptSDK/InstrumentHooks.js
  var aiInstrumentHooks = "_aiHooks";
  var cbNames = [
    "req",
    "rsp",
    "hkErr",
    "fnErr"
  ];
  var str__Proto2 = "__proto__";
  var strConstructor = "constructor";
  function _arrLoop(arr, fn) {
    if (arr) {
      for (var lp = 0; lp < arr.length; lp++) {
        if (fn(arr[lp], lp)) {
          break;
        }
      }
    }
  }
  function _doCallbacks(hooks, callDetails, cbArgs, hookCtx, type) {
    if (type >= 0 && type <= 2) {
      _arrLoop(hooks, function(hook, idx) {
        var cbks = hook.cbks;
        var cb = cbks[cbNames[type]];
        if (cb) {
          callDetails.ctx = function() {
            var ctx = hookCtx[idx] = hookCtx[idx] || {};
            return ctx;
          };
          try {
            cb.apply(callDetails.inst, cbArgs);
          } catch (err) {
            var orgEx = callDetails.err;
            try {
              var hookErrorCb = cbks[cbNames[2]];
              if (hookErrorCb) {
                callDetails.err = err;
                hookErrorCb.apply(callDetails.inst, cbArgs);
              }
            } catch (e) {
            } finally {
              callDetails.err = orgEx;
            }
          }
        }
      });
    }
  }
  function _createFunctionHook(aiHook) {
    return function() {
      var funcThis = this;
      var orgArgs = arguments;
      var hooks = aiHook.h;
      var funcArgs = {
        name: aiHook.n,
        inst: funcThis,
        ctx: null,
        set: _replaceArg
      };
      var hookCtx = [];
      var cbArgs = _createArgs([funcArgs], orgArgs);
      function _createArgs(target, theArgs) {
        _arrLoop(theArgs, function(arg) {
          target.push(arg);
        });
        return target;
      }
      function _replaceArg(idx, value) {
        orgArgs = _createArgs([], orgArgs);
        orgArgs[idx] = value;
        cbArgs = _createArgs([funcArgs], orgArgs);
      }
      _doCallbacks(hooks, funcArgs, cbArgs, hookCtx, 0);
      var theFunc = aiHook.f;
      try {
        funcArgs.rslt = theFunc.apply(funcThis, orgArgs);
      } catch (err) {
        funcArgs.err = err;
        _doCallbacks(hooks, funcArgs, cbArgs, hookCtx, 3);
        throw err;
      }
      _doCallbacks(hooks, funcArgs, cbArgs, hookCtx, 1);
      return funcArgs.rslt;
    };
  }
  var _objGetPrototypeOf2 = Object["getPrototypeOf"];
  function _getObjProto2(target) {
    if (target) {
      if (_objGetPrototypeOf2) {
        return _objGetPrototypeOf2(target);
      }
      var newProto = target[str__Proto2] || target[strShimPrototype] || target[strConstructor];
      if (newProto) {
        return newProto;
      }
    }
    return null;
  }
  function _getOwner(target, name, checkPrototype) {
    var owner = null;
    if (target) {
      if (hasOwnProperty(target, name)) {
        owner = target;
      } else if (checkPrototype) {
        owner = _getOwner(_getObjProto2(target), name, false);
      }
    }
    return owner;
  }
  function InstrumentProto(target, funcName, callbacks) {
    if (target) {
      return InstrumentFunc(target[strShimPrototype], funcName, callbacks, false);
    }
    return null;
  }
  function InstrumentFunc(target, funcName, callbacks, checkPrototype) {
    if (checkPrototype === void 0) {
      checkPrototype = true;
    }
    if (target && funcName && callbacks) {
      var owner = _getOwner(target, funcName, checkPrototype);
      if (owner) {
        var fn = owner[funcName];
        if (typeof fn === strShimFunction) {
          var aiHook_1 = fn[aiInstrumentHooks];
          if (!aiHook_1) {
            aiHook_1 = {
              i: 0,
              n: funcName,
              f: fn,
              h: []
            };
            var newFunc = _createFunctionHook(aiHook_1);
            newFunc[aiInstrumentHooks] = aiHook_1;
            owner[funcName] = newFunc;
          }
          var theHook = {
            id: aiHook_1.i,
            cbks: callbacks,
            rm: function() {
              var id = this.id;
              _arrLoop(aiHook_1.h, function(hook, idx) {
                if (hook.id === id) {
                  aiHook_1.h.splice(idx, 1);
                  return 1;
                }
              });
            }
          };
          aiHook_1.i++;
          aiHook_1.h.push(theHook);
          return theHook;
        }
      }
    }
    return null;
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/RequestResponseHeaders.js
  var RequestHeaders = {
    requestContextHeader: "Request-Context",
    requestContextTargetKey: "appId",
    requestContextAppIdFormat: "appId=cid-v1:",
    requestIdHeader: "Request-Id",
    traceParentHeader: "traceparent",
    traceStateHeader: "tracestate",
    sdkContextHeader: "Sdk-Context",
    sdkContextHeaderAppIdRequest: "appId",
    requestContextHeaderLowerCase: "request-context"
  };

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Common/DataSanitizer.js
  function dataSanitizeKeyAndAddUniqueness(logger, key, map) {
    var origLength = key.length;
    var field = dataSanitizeKey(logger, key);
    if (field.length !== origLength) {
      var i = 0;
      var uniqueField = field;
      while (map[uniqueField] !== void 0) {
        i++;
        uniqueField = field.substring(0, 150 - 3) + dsPadNumber(i);
      }
      field = uniqueField;
    }
    return field;
  }
  function dataSanitizeKey(logger, name) {
    var nameTrunc;
    if (name) {
      name = strTrim(name.toString());
      if (name.length > 150) {
        nameTrunc = name.substring(0, 150);
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.NameTooLong, "name is too long.  It has been truncated to " + 150 + " characters.", { name }, true);
      }
    }
    return nameTrunc || name;
  }
  function dataSanitizeString(logger, value, maxLength) {
    if (maxLength === void 0) {
      maxLength = 1024;
    }
    var valueTrunc;
    if (value) {
      maxLength = maxLength ? maxLength : 1024;
      value = strTrim(value);
      if (value.toString().length > maxLength) {
        valueTrunc = value.toString().substring(0, maxLength);
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StringValueTooLong, "string value is too long. It has been truncated to " + maxLength + " characters.", { value }, true);
      }
    }
    return valueTrunc || value;
  }
  function dataSanitizeUrl(logger, url) {
    return dataSanitizeInput(logger, url, 2048, _InternalMessageId.UrlTooLong);
  }
  function dataSanitizeMessage(logger, message) {
    var messageTrunc;
    if (message) {
      if (message.length > 32768) {
        messageTrunc = message.substring(0, 32768);
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.MessageTruncated, "message is too long, it has been truncated to " + 32768 + " characters.", { message }, true);
      }
    }
    return messageTrunc || message;
  }
  function dataSanitizeException(logger, exception) {
    var exceptionTrunc;
    if (exception) {
      var value = "" + exception;
      if (value.length > 32768) {
        exceptionTrunc = value.substring(0, 32768);
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.ExceptionTruncated, "exception is too long, it has been truncated to " + 32768 + " characters.", { exception }, true);
      }
    }
    return exceptionTrunc || exception;
  }
  function dataSanitizeProperties(logger, properties) {
    if (properties) {
      var tempProps_1 = {};
      objForEachKey(properties, function(prop, value) {
        if (isObject(value) && hasJSON()) {
          try {
            value = getJSON().stringify(value);
          } catch (e) {
            logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.CannotSerializeObjectNonSerializable, "custom property is not valid", { exception: e }, true);
          }
        }
        value = dataSanitizeString(logger, value, 8192);
        prop = dataSanitizeKeyAndAddUniqueness(logger, prop, tempProps_1);
        tempProps_1[prop] = value;
      });
      properties = tempProps_1;
    }
    return properties;
  }
  function dataSanitizeMeasurements(logger, measurements) {
    if (measurements) {
      var tempMeasurements_1 = {};
      objForEachKey(measurements, function(measure, value) {
        measure = dataSanitizeKeyAndAddUniqueness(logger, measure, tempMeasurements_1);
        tempMeasurements_1[measure] = value;
      });
      measurements = tempMeasurements_1;
    }
    return measurements;
  }
  function dataSanitizeId(logger, id) {
    return id ? dataSanitizeInput(logger, id, 128, _InternalMessageId.IdTooLong).toString() : id;
  }
  function dataSanitizeInput(logger, input, maxLength, _msgId) {
    var inputTrunc;
    if (input) {
      input = strTrim(input);
      if (input.length > maxLength) {
        inputTrunc = input.substring(0, maxLength);
        logger.throwInternal(LoggingSeverity.WARNING, _msgId, "input is too long, it has been truncated to " + maxLength + " characters.", { data: input }, true);
      }
    }
    return inputTrunc || input;
  }
  function dsPadNumber(num) {
    var s = "00" + num;
    return s.substr(s.length - 3);
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/DomHelperFuncs.js
  function createDomEvent(eventName) {
    var event = null;
    if (isFunction(Event)) {
      event = new Event(eventName);
    } else {
      var doc = getDocument();
      if (doc && doc.createEvent) {
        event = doc.createEvent("Event");
        event.initEvent(eventName, true, true);
      }
    }
    return event;
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/HelperFuncs.js
  function stringToBoolOrDefault(str, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = false;
    }
    if (str === void 0 || str === null) {
      return defaultValue;
    }
    return str.toString().toLowerCase() === "true";
  }
  function msToTimeSpan(totalms) {
    if (isNaN(totalms) || totalms < 0) {
      totalms = 0;
    }
    totalms = Math.round(totalms);
    var ms = "" + totalms % 1e3;
    var sec = "" + Math.floor(totalms / 1e3) % 60;
    var min = "" + Math.floor(totalms / (1e3 * 60)) % 60;
    var hour = "" + Math.floor(totalms / (1e3 * 60 * 60)) % 24;
    var days = Math.floor(totalms / (1e3 * 60 * 60 * 24));
    ms = ms.length === 1 ? "00" + ms : ms.length === 2 ? "0" + ms : ms;
    sec = sec.length < 2 ? "0" + sec : sec;
    min = min.length < 2 ? "0" + min : min;
    hour = hour.length < 2 ? "0" + hour : hour;
    return (days > 0 ? days + "." : "") + hour + ":" + min + ":" + sec + "." + ms;
  }
  function isBeaconApiSupported() {
    var nav = getNavigator();
    return "sendBeacon" in nav && nav.sendBeacon;
  }
  function getExtensionByName(extensions, identifier) {
    var extension = null;
    arrForEach(extensions, function(value) {
      if (value.identifier === identifier) {
        extension = value;
        return -1;
      }
    });
    return extension;
  }
  function isCrossOriginError(message, url, lineNumber, columnNumber, error) {
    return !error && isString(message) && (message === "Script error." || message === "Script error");
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Constants.js
  var DisabledPropertyName = "Microsoft_ApplicationInsights_BypassAjaxInstrumentation";
  var SampleRate = "sampleRate";
  var ProcessLegacy = "ProcessLegacy";
  var HttpMethod = "http.method";
  var DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
  var strNotSpecified = "not_specified";

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Enums.js
  var StorageType;
  (function(StorageType2) {
    StorageType2[StorageType2["LocalStorage"] = 0] = "LocalStorage";
    StorageType2[StorageType2["SessionStorage"] = 1] = "SessionStorage";
  })(StorageType || (StorageType = {}));
  var DistributedTracingModes;
  (function(DistributedTracingModes2) {
    DistributedTracingModes2[DistributedTracingModes2["AI"] = 0] = "AI";
    DistributedTracingModes2[DistributedTracingModes2["AI_AND_W3C"] = 1] = "AI_AND_W3C";
    DistributedTracingModes2[DistributedTracingModes2["W3C"] = 2] = "W3C";
  })(DistributedTracingModes || (DistributedTracingModes = {}));

  // node_modules/@microsoft/applicationinsights-common/dist-esm/StorageHelperFuncs.js
  var _canUseLocalStorage = void 0;
  var _canUseSessionStorage = void 0;
  function _getLocalStorageObject() {
    if (utlCanUseLocalStorage()) {
      return _getVerifiedStorageObject(StorageType.LocalStorage);
    }
    return null;
  }
  function _getVerifiedStorageObject(storageType) {
    try {
      if (isNullOrUndefined(getGlobal())) {
        return null;
      }
      var uid = new Date();
      var storage = getGlobalInst(storageType === StorageType.LocalStorage ? "localStorage" : "sessionStorage");
      storage.setItem(uid.toString(), uid.toString());
      var fail = storage.getItem(uid.toString()) !== uid.toString();
      storage.removeItem(uid.toString());
      if (!fail) {
        return storage;
      }
    } catch (exception) {
    }
    return null;
  }
  function _getSessionStorageObject() {
    if (utlCanUseSessionStorage()) {
      return _getVerifiedStorageObject(StorageType.SessionStorage);
    }
    return null;
  }
  function utlDisableStorage() {
    _canUseLocalStorage = false;
    _canUseSessionStorage = false;
  }
  function utlCanUseLocalStorage() {
    if (_canUseLocalStorage === void 0) {
      _canUseLocalStorage = !!_getVerifiedStorageObject(StorageType.LocalStorage);
    }
    return _canUseLocalStorage;
  }
  function utlGetLocalStorage(logger, name) {
    var storage = _getLocalStorageObject();
    if (storage !== null) {
      try {
        return storage.getItem(name);
      } catch (e) {
        _canUseLocalStorage = false;
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserCannotReadLocalStorage, "Browser failed read of local storage. " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return null;
  }
  function utlSetLocalStorage(logger, name, data) {
    var storage = _getLocalStorageObject();
    if (storage !== null) {
      try {
        storage.setItem(name, data);
        return true;
      } catch (e) {
        _canUseLocalStorage = false;
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserCannotWriteLocalStorage, "Browser failed write to local storage. " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return false;
  }
  function utlRemoveStorage(logger, name) {
    var storage = _getLocalStorageObject();
    if (storage !== null) {
      try {
        storage.removeItem(name);
        return true;
      } catch (e) {
        _canUseLocalStorage = false;
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserFailedRemovalFromLocalStorage, "Browser failed removal of local storage item. " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return false;
  }
  function utlCanUseSessionStorage() {
    if (_canUseSessionStorage === void 0) {
      _canUseSessionStorage = !!_getVerifiedStorageObject(StorageType.SessionStorage);
    }
    return _canUseSessionStorage;
  }
  function utlGetSessionStorage(logger, name) {
    var storage = _getSessionStorageObject();
    if (storage !== null) {
      try {
        return storage.getItem(name);
      } catch (e) {
        _canUseSessionStorage = false;
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserCannotReadSessionStorage, "Browser failed read of session storage. " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return null;
  }
  function utlSetSessionStorage(logger, name, data) {
    var storage = _getSessionStorageObject();
    if (storage !== null) {
      try {
        storage.setItem(name, data);
        return true;
      } catch (e) {
        _canUseSessionStorage = false;
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserCannotWriteSessionStorage, "Browser failed write to session storage. " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return false;
  }
  function utlRemoveSessionStorage(logger, name) {
    var storage = _getSessionStorageObject();
    if (storage !== null) {
      try {
        storage.removeItem(name);
        return true;
      } catch (e) {
        _canUseSessionStorage = false;
        logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserFailedRemovalFromSessionStorage, "Browser failed removal of session storage item. " + getExceptionName(e), { exception: dumpObj(e) });
      }
    }
    return false;
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/UrlHelperFuncs.js
  var _document = getDocument() || {};
  var _htmlAnchorIdx = 0;
  var _htmlAnchorElement = [null, null, null, null, null];
  function urlParseUrl(url) {
    var anchorIdx = _htmlAnchorIdx;
    var anchorCache = _htmlAnchorElement;
    var tempAnchor = anchorCache[anchorIdx];
    if (!_document.createElement) {
      tempAnchor = { host: urlParseHost(url, true) };
    } else if (!anchorCache[anchorIdx]) {
      tempAnchor = anchorCache[anchorIdx] = _document.createElement("a");
    }
    tempAnchor.href = url;
    anchorIdx++;
    if (anchorIdx >= anchorCache.length) {
      anchorIdx = 0;
    }
    _htmlAnchorIdx = anchorIdx;
    return tempAnchor;
  }
  function urlGetAbsoluteUrl(url) {
    var result;
    var a = urlParseUrl(url);
    if (a) {
      result = a.href;
    }
    return result;
  }
  function urlGetCompleteUrl(method, absoluteUrl) {
    if (method) {
      return method.toUpperCase() + " " + absoluteUrl;
    }
    return absoluteUrl;
  }
  function urlParseHost(url, inclPort) {
    var fullHost = urlParseFullHost(url, inclPort) || "";
    if (fullHost) {
      var match = fullHost.match(/(www[0-9]?\.)?(.[^/:]+)(\:[\d]+)?/i);
      if (match != null && match.length > 3 && isString(match[2]) && match[2].length > 0) {
        return match[2] + (match[3] || "");
      }
    }
    return fullHost;
  }
  function urlParseFullHost(url, inclPort) {
    var result = null;
    if (url) {
      var match = url.match(/(\w*):\/\/(.[^/:]+)(\:[\d]+)?/i);
      if (match != null && match.length > 2 && isString(match[2]) && match[2].length > 0) {
        result = match[2] || "";
        if (inclPort && match.length > 2) {
          var protocol = (match[1] || "").toLowerCase();
          var port = match[3] || "";
          if (protocol === "http" && port === ":80") {
            port = "";
          } else if (protocol === "https" && port === ":443") {
            port = "";
          }
          result += port;
        }
      }
    }
    return result;
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Util.js
  var _internalEndpoints = [
    "https://dc.services.visualstudio.com/v2/track",
    "https://breeze.aimon.applicationinsights.io/v2/track",
    "https://dc-int.services.visualstudio.com/v2/track"
  ];
  function isInternalApplicationInsightsEndpoint(endpointUrl) {
    return _internalEndpoints.indexOf(endpointUrl.toLowerCase()) !== -1;
  }
  var CorrelationIdHelper = {
    correlationIdPrefix: "cid-v1:",
    canIncludeCorrelationHeader: function(config, requestUrl, currentHost) {
      if (!requestUrl || config && config.disableCorrelationHeaders) {
        return false;
      }
      if (config && config.correlationHeaderExcludePatterns) {
        for (var i = 0; i < config.correlationHeaderExcludePatterns.length; i++) {
          if (config.correlationHeaderExcludePatterns[i].test(requestUrl)) {
            return false;
          }
        }
      }
      var requestHost = urlParseUrl(requestUrl).host.toLowerCase();
      if (requestHost && (requestHost.indexOf(":443") !== -1 || requestHost.indexOf(":80") !== -1)) {
        requestHost = (urlParseFullHost(requestUrl, true) || "").toLowerCase();
      }
      if ((!config || !config.enableCorsCorrelation) && (requestHost && requestHost !== currentHost)) {
        return false;
      }
      var includedDomains = config && config.correlationHeaderDomains;
      if (includedDomains) {
        var matchExists_1;
        arrForEach(includedDomains, function(domain) {
          var regex2 = new RegExp(domain.toLowerCase().replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\*/g, ".*"));
          matchExists_1 = matchExists_1 || regex2.test(requestHost);
        });
        if (!matchExists_1) {
          return false;
        }
      }
      var excludedDomains = config && config.correlationHeaderExcludedDomains;
      if (!excludedDomains || excludedDomains.length === 0) {
        return true;
      }
      for (var i = 0; i < excludedDomains.length; i++) {
        var regex = new RegExp(excludedDomains[i].toLowerCase().replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\*/g, ".*"));
        if (regex.test(requestHost)) {
          return false;
        }
      }
      return requestHost && requestHost.length > 0;
    },
    getCorrelationContext: function(responseHeader) {
      if (responseHeader) {
        var correlationId = CorrelationIdHelper.getCorrelationContextValue(responseHeader, RequestHeaders.requestContextTargetKey);
        if (correlationId && correlationId !== CorrelationIdHelper.correlationIdPrefix) {
          return correlationId;
        }
      }
    },
    getCorrelationContextValue: function(responseHeader, key) {
      if (responseHeader) {
        var keyValues = responseHeader.split(",");
        for (var i = 0; i < keyValues.length; ++i) {
          var keyValue = keyValues[i].split("=");
          if (keyValue.length === 2 && keyValue[0] === key) {
            return keyValue[1];
          }
        }
      }
    }
  };
  function AjaxHelperParseDependencyPath(logger, absoluteUrl, method, commandName) {
    var target, name = commandName, data = commandName;
    if (absoluteUrl && absoluteUrl.length > 0) {
      var parsedUrl = urlParseUrl(absoluteUrl);
      target = parsedUrl.host;
      if (!name) {
        if (parsedUrl.pathname != null) {
          var pathName = parsedUrl.pathname.length === 0 ? "/" : parsedUrl.pathname;
          if (pathName.charAt(0) !== "/") {
            pathName = "/" + pathName;
          }
          data = parsedUrl.pathname;
          name = dataSanitizeString(logger, method ? method + " " + pathName : pathName);
        } else {
          name = dataSanitizeString(logger, absoluteUrl);
        }
      }
    } else {
      target = commandName;
      name = commandName;
    }
    return {
      target,
      name,
      data
    };
  }
  function dateTimeUtilsNow() {
    var perf = getPerformance();
    if (perf && perf.now && perf.timing) {
      var now = perf.now() + perf.timing.navigationStart;
      if (now > 0) {
        return now;
      }
    }
    return dateNow();
  }
  function dateTimeUtilsDuration(start, end) {
    var result = null;
    if (start !== 0 && end !== 0 && !isNullOrUndefined(start) && !isNullOrUndefined(end)) {
      result = end - start;
    }
    return result;
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/ConnectionStringParser.js
  var _FIELDS_SEPARATOR = ";";
  var _FIELD_KEY_VALUE_SEPARATOR = "=";
  function parseConnectionString(connectionString) {
    if (!connectionString) {
      return {};
    }
    var kvPairs = connectionString.split(_FIELDS_SEPARATOR);
    var result = arrReduce(kvPairs, function(fields, kv) {
      var kvParts = kv.split(_FIELD_KEY_VALUE_SEPARATOR);
      if (kvParts.length === 2) {
        var key = kvParts[0].toLowerCase();
        var value = kvParts[1];
        fields[key] = value;
      }
      return fields;
    }, {});
    if (objKeys(result).length > 0) {
      if (result.endpointsuffix) {
        var locationPrefix = result.location ? result.location + "." : "";
        result.ingestionendpoint = result.ingestionendpoint || "https://" + locationPrefix + "dc." + result.endpointsuffix;
      }
      result.ingestionendpoint = result.ingestionendpoint || DEFAULT_BREEZE_ENDPOINT;
    }
    return result;
  }

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/Base.js
  var Base = function() {
    function Base2() {
    }
    return Base2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/Data.js
  var Data = function(_super) {
    __extendsFn(Data3, _super);
    function Data3() {
      return _super.call(this) || this;
    }
    return Data3;
  }(Base);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/Envelope.js
  var Envelope = function() {
    function Envelope3() {
      this.ver = 1;
      this.sampleRate = 100;
      this.tags = {};
    }
    return Envelope3;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Common/Envelope.js
  var Envelope2 = function(_super) {
    __extendsFn(Envelope3, _super);
    function Envelope3(logger, data, name) {
      var _this = _super.call(this) || this;
      _this.name = dataSanitizeString(logger, name) || strNotSpecified;
      _this.data = data;
      _this.time = toISOString(new Date());
      _this.aiDataContract = {
        time: 1,
        iKey: 1,
        name: 1,
        sampleRate: function() {
          return _this.sampleRate === 100 ? 4 : 1;
        },
        tags: 1,
        data: 1
      };
      return _this;
    }
    return Envelope3;
  }(Envelope);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/EventData.js
  var EventData = function() {
    function EventData2() {
      this.ver = 2;
      this.properties = {};
      this.measurements = {};
    }
    return EventData2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Event.js
  var Event2 = function(_super) {
    __extendsFn(Event3, _super);
    function Event3(logger, name, properties, measurements) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        ver: 1,
        name: 1,
        properties: 0,
        measurements: 0
      };
      _this.name = dataSanitizeString(logger, name) || strNotSpecified;
      _this.properties = dataSanitizeProperties(logger, properties);
      _this.measurements = dataSanitizeMeasurements(logger, measurements);
      return _this;
    }
    Event3.envelopeType = "Microsoft.ApplicationInsights.{0}.Event";
    Event3.dataType = "EventData";
    return Event3;
  }(EventData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/StackFrame.js
  var StackFrame = function() {
    function StackFrame2() {
    }
    return StackFrame2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/ExceptionData.js
  var ExceptionData = function() {
    function ExceptionData2() {
      this.ver = 2;
      this.exceptions = [];
      this.properties = {};
      this.measurements = {};
    }
    return ExceptionData2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/ExceptionDetails.js
  var ExceptionDetails = function() {
    function ExceptionDetails2() {
      this.hasFullStack = true;
      this.parsedStack = [];
    }
    return ExceptionDetails2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Exception.js
  var NoMethod = "<no_method>";
  var strError = "error";
  var strStack = "stack";
  var strStackDetails = "stackDetails";
  var strErrorSrc = "errorSrc";
  var strMessage = "message";
  var strDescription = "description";
  function _stringify(value, convertToString) {
    var result = value;
    if (result && !isString(result)) {
      if (JSON && JSON.stringify) {
        result = JSON.stringify(value);
        if (convertToString && (!result || result === "{}")) {
          if (isFunction(value.toString)) {
            result = value.toString();
          } else {
            result = "" + value;
          }
        }
      } else {
        result = "" + value + " - (Missing JSON.stringify)";
      }
    }
    return result || "";
  }
  function _formatMessage(theEvent, errorType) {
    var evtMessage = theEvent;
    if (theEvent) {
      evtMessage = theEvent[strMessage] || theEvent[strDescription] || "";
      if (evtMessage && !isString(evtMessage)) {
        evtMessage = _stringify(evtMessage, true);
      }
      if (theEvent["filename"]) {
        evtMessage = evtMessage + " @" + (theEvent["filename"] || "") + ":" + (theEvent["lineno"] || "?") + ":" + (theEvent["colno"] || "?");
      }
    }
    if (errorType && errorType !== "String" && errorType !== "Object" && errorType !== "Error" && (evtMessage || "").indexOf(errorType) === -1) {
      evtMessage = errorType + ": " + evtMessage;
    }
    return evtMessage || "";
  }
  function _isExceptionDetailsInternal(value) {
    if (isObject(value)) {
      return "hasFullStack" in value && "typeName" in value;
    }
    return false;
  }
  function _isExceptionInternal(value) {
    if (isObject(value)) {
      return "ver" in value && "exceptions" in value && "properties" in value;
    }
    return false;
  }
  function _isStackDetails(details) {
    return details && details.src && isString(details.src) && details.obj && isArray(details.obj);
  }
  function _convertStackObj(errorStack) {
    var src = errorStack || "";
    if (!isString(src)) {
      if (isString(src[strStack])) {
        src = src[strStack];
      } else {
        src = "" + src;
      }
    }
    var items = src.split("\n");
    return {
      src,
      obj: items
    };
  }
  function _getOperaStack(errorMessage) {
    var stack = [];
    var lines = errorMessage.split("\n");
    for (var lp = 0; lp < lines.length; lp++) {
      var entry = lines[lp];
      if (lines[lp + 1]) {
        entry += "@" + lines[lp + 1];
        lp++;
      }
      stack.push(entry);
    }
    return {
      src: errorMessage,
      obj: stack
    };
  }
  function _getStackFromErrorObj(errorObj) {
    var details = null;
    if (errorObj) {
      try {
        if (errorObj[strStack]) {
          details = _convertStackObj(errorObj[strStack]);
        } else if (errorObj[strError] && errorObj[strError][strStack]) {
          details = _convertStackObj(errorObj[strError][strStack]);
        } else if (errorObj["exception"] && errorObj.exception[strStack]) {
          details = _convertStackObj(errorObj.exception[strStack]);
        } else if (_isStackDetails(errorObj)) {
          details = errorObj;
        } else if (_isStackDetails(errorObj[strStackDetails])) {
          details = errorObj[strStackDetails];
        } else if (window["opera"] && errorObj[strMessage]) {
          details = _getOperaStack(errorObj.message);
        } else if (isString(errorObj)) {
          details = _convertStackObj(errorObj);
        } else {
          var evtMessage = errorObj[strMessage] || errorObj[strDescription] || "";
          if (isString(errorObj[strErrorSrc])) {
            if (evtMessage) {
              evtMessage += "\n";
            }
            evtMessage += " from " + errorObj[strErrorSrc];
          }
          if (evtMessage) {
            details = _convertStackObj(evtMessage);
          }
        }
      } catch (e) {
        details = _convertStackObj(e);
      }
    }
    return details || {
      src: "",
      obj: null
    };
  }
  function _formatStackTrace(stackDetails) {
    var stack = "";
    if (stackDetails) {
      if (stackDetails.obj) {
        arrForEach(stackDetails.obj, function(entry) {
          stack += entry + "\n";
        });
      } else {
        stack = stackDetails.src || "";
      }
    }
    return stack;
  }
  function _parseStack(stack) {
    var parsedStack;
    var frames = stack.obj;
    if (frames && frames.length > 0) {
      parsedStack = [];
      var level_1 = 0;
      var totalSizeInBytes_1 = 0;
      arrForEach(frames, function(frame) {
        var theFrame = frame.toString();
        if (_StackFrame.regex.test(theFrame)) {
          var parsedFrame = new _StackFrame(theFrame, level_1++);
          totalSizeInBytes_1 += parsedFrame.sizeInBytes;
          parsedStack.push(parsedFrame);
        }
      });
      var exceptionParsedStackThreshold = 32 * 1024;
      if (totalSizeInBytes_1 > exceptionParsedStackThreshold) {
        var left = 0;
        var right = parsedStack.length - 1;
        var size = 0;
        var acceptedLeft = left;
        var acceptedRight = right;
        while (left < right) {
          var lSize = parsedStack[left].sizeInBytes;
          var rSize = parsedStack[right].sizeInBytes;
          size += lSize + rSize;
          if (size > exceptionParsedStackThreshold) {
            var howMany = acceptedRight - acceptedLeft + 1;
            parsedStack.splice(acceptedLeft, howMany);
            break;
          }
          acceptedLeft = left;
          acceptedRight = right;
          left++;
          right--;
        }
      }
    }
    return parsedStack;
  }
  function _getErrorType(errorType) {
    var typeName = "";
    if (errorType) {
      typeName = errorType.typeName || errorType.name || "";
      if (!typeName) {
        try {
          var funcNameRegex = /function (.{1,200})\(/;
          var results = funcNameRegex.exec(errorType.constructor.toString());
          typeName = results && results.length > 1 ? results[1] : "";
        } catch (e) {
        }
      }
    }
    return typeName;
  }
  function _formatErrorCode(errorObj) {
    if (errorObj) {
      try {
        if (!isString(errorObj)) {
          var errorType = _getErrorType(errorObj);
          var result = _stringify(errorObj, false);
          if (!result || result === "{}") {
            if (errorObj[strError]) {
              errorObj = errorObj[strError];
              errorType = _getErrorType(errorObj);
            }
            result = _stringify(errorObj, true);
          }
          if (result.indexOf(errorType) !== 0 && errorType !== "String") {
            return errorType + ":" + result;
          }
          return result;
        }
      } catch (e) {
      }
    }
    return "" + (errorObj || "");
  }
  var Exception = function(_super) {
    __extendsFn(Exception2, _super);
    function Exception2(logger, exception, properties, measurements, severityLevel, id) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        ver: 1,
        exceptions: 1,
        severityLevel: 0,
        properties: 0,
        measurements: 0
      };
      if (!_isExceptionInternal(exception)) {
        if (!properties) {
          properties = {};
        }
        _this.exceptions = [new _ExceptionDetails(logger, exception, properties)];
        _this.properties = dataSanitizeProperties(logger, properties);
        _this.measurements = dataSanitizeMeasurements(logger, measurements);
        if (severityLevel) {
          _this.severityLevel = severityLevel;
        }
        if (id) {
          _this.id = id;
        }
      } else {
        _this.exceptions = exception.exceptions;
        _this.properties = exception.properties;
        _this.measurements = exception.measurements;
        if (exception.severityLevel) {
          _this.severityLevel = exception.severityLevel;
        }
        if (exception.id) {
          _this.id = exception.id;
        }
        if (exception.problemGroup) {
          _this.problemGroup = exception.problemGroup;
        }
        _this.ver = 2;
        if (!isNullOrUndefined(exception.isManual)) {
          _this.isManual = exception.isManual;
        }
      }
      return _this;
    }
    Exception2.CreateAutoException = function(message, url, lineNumber, columnNumber, error, evt, stack, errorSrc) {
      var errorType = _getErrorType(error || evt || message);
      return {
        message: _formatMessage(message, errorType),
        url,
        lineNumber,
        columnNumber,
        error: _formatErrorCode(error || evt || message),
        evt: _formatErrorCode(evt || message),
        typeName: errorType,
        stackDetails: _getStackFromErrorObj(stack || error || evt),
        errorSrc
      };
    };
    Exception2.CreateFromInterface = function(logger, exception, properties, measurements) {
      var exceptions = exception.exceptions && arrMap(exception.exceptions, function(ex) {
        return _ExceptionDetails.CreateFromInterface(logger, ex);
      });
      var exceptionData = new Exception2(logger, __assignFn({}, exception, { exceptions }), properties, measurements);
      return exceptionData;
    };
    Exception2.prototype.toInterface = function() {
      var _a = this, exceptions = _a.exceptions, properties = _a.properties, measurements = _a.measurements, severityLevel = _a.severityLevel, ver = _a.ver, problemGroup = _a.problemGroup, id = _a.id, isManual = _a.isManual;
      var exceptionDetailsInterface = exceptions instanceof Array && arrMap(exceptions, function(exception) {
        return exception.toInterface();
      }) || void 0;
      return {
        ver: "4.0",
        exceptions: exceptionDetailsInterface,
        severityLevel,
        properties,
        measurements,
        problemGroup,
        id,
        isManual
      };
    };
    Exception2.CreateSimpleException = function(message, typeName, assembly, fileName, details, line) {
      return {
        exceptions: [
          {
            hasFullStack: true,
            message,
            stack: details,
            typeName
          }
        ]
      };
    };
    Exception2.envelopeType = "Microsoft.ApplicationInsights.{0}.Exception";
    Exception2.dataType = "ExceptionData";
    Exception2.formatError = _formatErrorCode;
    return Exception2;
  }(ExceptionData);
  var _ExceptionDetails = function(_super) {
    __extendsFn(_ExceptionDetails2, _super);
    function _ExceptionDetails2(logger, exception, properties) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        id: 0,
        outerId: 0,
        typeName: 1,
        message: 1,
        hasFullStack: 0,
        stack: 0,
        parsedStack: 2
      };
      if (!_isExceptionDetailsInternal(exception)) {
        var error = exception;
        var evt = error && error.evt;
        if (!isError(error)) {
          error = error[strError] || evt || error;
        }
        _this.typeName = dataSanitizeString(logger, _getErrorType(error)) || strNotSpecified;
        _this.message = dataSanitizeMessage(logger, _formatMessage(exception || error, _this.typeName)) || strNotSpecified;
        var stack = exception[strStackDetails] || _getStackFromErrorObj(exception);
        _this.parsedStack = _parseStack(stack);
        _this[strStack] = dataSanitizeException(logger, _formatStackTrace(stack));
        _this.hasFullStack = isArray(_this.parsedStack) && _this.parsedStack.length > 0;
        if (properties) {
          properties.typeName = properties.typeName || _this.typeName;
        }
      } else {
        _this.typeName = exception.typeName;
        _this.message = exception.message;
        _this[strStack] = exception[strStack];
        _this.parsedStack = exception.parsedStack;
        _this.hasFullStack = exception.hasFullStack;
      }
      return _this;
    }
    _ExceptionDetails2.prototype.toInterface = function() {
      var parsedStack = this.parsedStack instanceof Array && arrMap(this.parsedStack, function(frame) {
        return frame.toInterface();
      });
      var exceptionDetailsInterface = {
        id: this.id,
        outerId: this.outerId,
        typeName: this.typeName,
        message: this.message,
        hasFullStack: this.hasFullStack,
        stack: this[strStack],
        parsedStack: parsedStack || void 0
      };
      return exceptionDetailsInterface;
    };
    _ExceptionDetails2.CreateFromInterface = function(logger, exception) {
      var parsedStack = exception.parsedStack instanceof Array && arrMap(exception.parsedStack, function(frame) {
        return _StackFrame.CreateFromInterface(frame);
      }) || exception.parsedStack;
      var exceptionDetails = new _ExceptionDetails2(logger, __assignFn({}, exception, { parsedStack }));
      return exceptionDetails;
    };
    return _ExceptionDetails2;
  }(ExceptionDetails);
  var _StackFrame = function(_super) {
    __extendsFn(_StackFrame2, _super);
    function _StackFrame2(sourceFrame, level) {
      var _this = _super.call(this) || this;
      _this.sizeInBytes = 0;
      _this.aiDataContract = {
        level: 1,
        method: 1,
        assembly: 0,
        fileName: 0,
        line: 0
      };
      if (typeof sourceFrame === "string") {
        var frame = sourceFrame;
        _this.level = level;
        _this.method = NoMethod;
        _this.assembly = strTrim(frame);
        _this.fileName = "";
        _this.line = 0;
        var matches = frame.match(_StackFrame2.regex);
        if (matches && matches.length >= 5) {
          _this.method = strTrim(matches[2]) || _this.method;
          _this.fileName = strTrim(matches[4]);
          _this.line = parseInt(matches[5]) || 0;
        }
      } else {
        _this.level = sourceFrame.level;
        _this.method = sourceFrame.method;
        _this.assembly = sourceFrame.assembly;
        _this.fileName = sourceFrame.fileName;
        _this.line = sourceFrame.line;
        _this.sizeInBytes = 0;
      }
      _this.sizeInBytes += _this.method.length;
      _this.sizeInBytes += _this.fileName.length;
      _this.sizeInBytes += _this.assembly.length;
      _this.sizeInBytes += _StackFrame2.baseSize;
      _this.sizeInBytes += _this.level.toString().length;
      _this.sizeInBytes += _this.line.toString().length;
      return _this;
    }
    _StackFrame2.CreateFromInterface = function(frame) {
      return new _StackFrame2(frame, null);
    };
    _StackFrame2.prototype.toInterface = function() {
      return {
        level: this.level,
        method: this.method,
        assembly: this.assembly,
        fileName: this.fileName,
        line: this.line
      };
    };
    _StackFrame2.regex = /^([\s]+at)?[\s]{0,50}([^\@\()]+?)[\s]{0,50}(\@|\()([^\(\n]+):([0-9]+):([0-9]+)(\)?)$/;
    _StackFrame2.baseSize = 58;
    return _StackFrame2;
  }(StackFrame);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/MetricData.js
  var MetricData = function() {
    function MetricData2() {
      this.ver = 2;
      this.metrics = [];
      this.properties = {};
      this.measurements = {};
    }
    return MetricData2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/DataPointType.js
  var DataPointType;
  (function(DataPointType2) {
    DataPointType2[DataPointType2["Measurement"] = 0] = "Measurement";
    DataPointType2[DataPointType2["Aggregation"] = 1] = "Aggregation";
  })(DataPointType || (DataPointType = {}));

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/DataPoint.js
  var DataPoint = function() {
    function DataPoint3() {
      this.kind = DataPointType.Measurement;
    }
    return DataPoint3;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Common/DataPoint.js
  var DataPoint2 = function(_super) {
    __extendsFn(DataPoint3, _super);
    function DataPoint3() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.aiDataContract = {
        name: 1,
        kind: 0,
        value: 1,
        count: 0,
        min: 0,
        max: 0,
        stdDev: 0
      };
      return _this;
    }
    return DataPoint3;
  }(DataPoint);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Metric.js
  var Metric = function(_super) {
    __extendsFn(Metric2, _super);
    function Metric2(logger, name, value, count, min, max, properties, measurements) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        ver: 1,
        metrics: 1,
        properties: 0
      };
      var dataPoint = new DataPoint2();
      dataPoint.count = count > 0 ? count : void 0;
      dataPoint.max = isNaN(max) || max === null ? void 0 : max;
      dataPoint.min = isNaN(min) || min === null ? void 0 : min;
      dataPoint.name = dataSanitizeString(logger, name) || strNotSpecified;
      dataPoint.value = value;
      _this.metrics = [dataPoint];
      _this.properties = dataSanitizeProperties(logger, properties);
      _this.measurements = dataSanitizeMeasurements(logger, measurements);
      return _this;
    }
    Metric2.envelopeType = "Microsoft.ApplicationInsights.{0}.Metric";
    Metric2.dataType = "MetricData";
    return Metric2;
  }(MetricData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/PageViewData.js
  var PageViewData = function(_super) {
    __extendsFn(PageViewData2, _super);
    function PageViewData2() {
      var _this = _super.call(this) || this;
      _this.ver = 2;
      _this.properties = {};
      _this.measurements = {};
      return _this;
    }
    return PageViewData2;
  }(EventData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/PageView.js
  var PageView = function(_super) {
    __extendsFn(PageView2, _super);
    function PageView2(logger, name, url, durationMs, properties, measurements, id) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        ver: 1,
        name: 0,
        url: 0,
        duration: 0,
        properties: 0,
        measurements: 0,
        id: 0
      };
      _this.id = dataSanitizeId(logger, id);
      _this.url = dataSanitizeUrl(logger, url);
      _this.name = dataSanitizeString(logger, name) || strNotSpecified;
      if (!isNaN(durationMs)) {
        _this.duration = msToTimeSpan(durationMs);
      }
      _this.properties = dataSanitizeProperties(logger, properties);
      _this.measurements = dataSanitizeMeasurements(logger, measurements);
      return _this;
    }
    PageView2.envelopeType = "Microsoft.ApplicationInsights.{0}.Pageview";
    PageView2.dataType = "PageviewData";
    return PageView2;
  }(PageViewData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/RemoteDependencyData.js
  var RemoteDependencyData = function() {
    function RemoteDependencyData3() {
      this.ver = 2;
      this.success = true;
      this.properties = {};
      this.measurements = {};
    }
    return RemoteDependencyData3;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/RemoteDependencyData.js
  var RemoteDependencyData2 = function(_super) {
    __extendsFn(RemoteDependencyData3, _super);
    function RemoteDependencyData3(logger, id, absoluteUrl, commandName, value, success, resultCode, method, requestAPI, correlationContext, properties, measurements) {
      if (requestAPI === void 0) {
        requestAPI = "Ajax";
      }
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        id: 1,
        ver: 1,
        name: 0,
        resultCode: 0,
        duration: 0,
        success: 0,
        data: 0,
        target: 0,
        type: 0,
        properties: 0,
        measurements: 0,
        kind: 0,
        value: 0,
        count: 0,
        min: 0,
        max: 0,
        stdDev: 0,
        dependencyKind: 0,
        dependencySource: 0,
        commandName: 0,
        dependencyTypeName: 0
      };
      _this.id = id;
      _this.duration = msToTimeSpan(value);
      _this.success = success;
      _this.resultCode = resultCode + "";
      _this.type = dataSanitizeString(logger, requestAPI);
      var dependencyFields = AjaxHelperParseDependencyPath(logger, absoluteUrl, method, commandName);
      _this.data = dataSanitizeUrl(logger, commandName) || dependencyFields.data;
      _this.target = dataSanitizeString(logger, dependencyFields.target);
      if (correlationContext) {
        _this.target = _this.target + " | " + correlationContext;
      }
      _this.name = dataSanitizeString(logger, dependencyFields.name);
      _this.properties = dataSanitizeProperties(logger, properties);
      _this.measurements = dataSanitizeMeasurements(logger, measurements);
      return _this;
    }
    RemoteDependencyData3.envelopeType = "Microsoft.ApplicationInsights.{0}.RemoteDependency";
    RemoteDependencyData3.dataType = "RemoteDependencyData";
    return RemoteDependencyData3;
  }(RemoteDependencyData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/MessageData.js
  var MessageData = function() {
    function MessageData2() {
      this.ver = 2;
      this.properties = {};
      this.measurements = {};
    }
    return MessageData2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Trace.js
  var Trace = function(_super) {
    __extendsFn(Trace2, _super);
    function Trace2(logger, message, severityLevel, properties, measurements) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        ver: 1,
        message: 1,
        severityLevel: 0,
        properties: 0
      };
      message = message || strNotSpecified;
      _this.message = dataSanitizeMessage(logger, message);
      _this.properties = dataSanitizeProperties(logger, properties);
      _this.measurements = dataSanitizeMeasurements(logger, measurements);
      if (severityLevel) {
        _this.severityLevel = severityLevel;
      }
      return _this;
    }
    Trace2.envelopeType = "Microsoft.ApplicationInsights.{0}.Message";
    Trace2.dataType = "MessageData";
    return Trace2;
  }(MessageData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/PageViewPerfData.js
  var PageViewPerfData = function(_super) {
    __extendsFn(PageViewPerfData2, _super);
    function PageViewPerfData2() {
      var _this = _super.call(this) || this;
      _this.ver = 2;
      _this.properties = {};
      _this.measurements = {};
      return _this;
    }
    return PageViewPerfData2;
  }(PageViewData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/PageViewPerformance.js
  var PageViewPerformance = function(_super) {
    __extendsFn(PageViewPerformance2, _super);
    function PageViewPerformance2(logger, name, url, unused, properties, measurements, cs4BaseData) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        ver: 1,
        name: 0,
        url: 0,
        duration: 0,
        perfTotal: 0,
        networkConnect: 0,
        sentRequest: 0,
        receivedResponse: 0,
        domProcessing: 0,
        properties: 0,
        measurements: 0
      };
      _this.url = dataSanitizeUrl(logger, url);
      _this.name = dataSanitizeString(logger, name) || strNotSpecified;
      _this.properties = dataSanitizeProperties(logger, properties);
      _this.measurements = dataSanitizeMeasurements(logger, measurements);
      if (cs4BaseData) {
        _this.domProcessing = cs4BaseData.domProcessing;
        _this.duration = cs4BaseData.duration;
        _this.networkConnect = cs4BaseData.networkConnect;
        _this.perfTotal = cs4BaseData.perfTotal;
        _this.receivedResponse = cs4BaseData.receivedResponse;
        _this.sentRequest = cs4BaseData.sentRequest;
      }
      return _this;
    }
    PageViewPerformance2.envelopeType = "Microsoft.ApplicationInsights.{0}.PageviewPerformance";
    PageViewPerformance2.dataType = "PageviewPerformanceData";
    return PageViewPerformance2;
  }(PageViewPerfData);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Telemetry/Common/Data.js
  var Data2 = function(_super) {
    __extendsFn(Data3, _super);
    function Data3(baseType, data) {
      var _this = _super.call(this) || this;
      _this.aiDataContract = {
        baseType: 1,
        baseData: 1
      };
      _this.baseType = baseType;
      _this.baseData = data;
      return _this;
    }
    return Data3;
  }(Data);

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/SeverityLevel.js
  var SeverityLevel;
  (function(SeverityLevel2) {
    SeverityLevel2[SeverityLevel2["Verbose"] = 0] = "Verbose";
    SeverityLevel2[SeverityLevel2["Information"] = 1] = "Information";
    SeverityLevel2[SeverityLevel2["Warning"] = 2] = "Warning";
    SeverityLevel2[SeverityLevel2["Error"] = 3] = "Error";
    SeverityLevel2[SeverityLevel2["Critical"] = 4] = "Critical";
  })(SeverityLevel || (SeverityLevel = {}));

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/Contracts/Generated/ContextTagKeys.js
  function _aiNameFunc(baseName) {
    var aiName = "ai." + baseName + ".";
    return function(name) {
      return aiName + name;
    };
  }
  var _aiApplication = _aiNameFunc("application");
  var _aiDevice = _aiNameFunc("device");
  var _aiLocation = _aiNameFunc("location");
  var _aiOperation = _aiNameFunc("operation");
  var _aiSession = _aiNameFunc("session");
  var _aiUser = _aiNameFunc("user");
  var _aiCloud = _aiNameFunc("cloud");
  var _aiInternal = _aiNameFunc("internal");
  var ContextTagKeys = function(_super) {
    __extendsFn(ContextTagKeys2, _super);
    function ContextTagKeys2() {
      return _super.call(this) || this;
    }
    return ContextTagKeys2;
  }(createClassFromInterface({
    applicationVersion: _aiApplication("ver"),
    applicationBuild: _aiApplication("build"),
    applicationTypeId: _aiApplication("typeId"),
    applicationId: _aiApplication("applicationId"),
    applicationLayer: _aiApplication("layer"),
    deviceId: _aiDevice("id"),
    deviceIp: _aiDevice("ip"),
    deviceLanguage: _aiDevice("language"),
    deviceLocale: _aiDevice("locale"),
    deviceModel: _aiDevice("model"),
    deviceFriendlyName: _aiDevice("friendlyName"),
    deviceNetwork: _aiDevice("network"),
    deviceNetworkName: _aiDevice("networkName"),
    deviceOEMName: _aiDevice("oemName"),
    deviceOS: _aiDevice("os"),
    deviceOSVersion: _aiDevice("osVersion"),
    deviceRoleInstance: _aiDevice("roleInstance"),
    deviceRoleName: _aiDevice("roleName"),
    deviceScreenResolution: _aiDevice("screenResolution"),
    deviceType: _aiDevice("type"),
    deviceMachineName: _aiDevice("machineName"),
    deviceVMName: _aiDevice("vmName"),
    deviceBrowser: _aiDevice("browser"),
    deviceBrowserVersion: _aiDevice("browserVersion"),
    locationIp: _aiLocation("ip"),
    locationCountry: _aiLocation("country"),
    locationProvince: _aiLocation("province"),
    locationCity: _aiLocation("city"),
    operationId: _aiOperation("id"),
    operationName: _aiOperation("name"),
    operationParentId: _aiOperation("parentId"),
    operationRootId: _aiOperation("rootId"),
    operationSyntheticSource: _aiOperation("syntheticSource"),
    operationCorrelationVector: _aiOperation("correlationVector"),
    sessionId: _aiSession("id"),
    sessionIsFirst: _aiSession("isFirst"),
    sessionIsNew: _aiSession("isNew"),
    userAccountAcquisitionDate: _aiUser("accountAcquisitionDate"),
    userAccountId: _aiUser("accountId"),
    userAgent: _aiUser("userAgent"),
    userId: _aiUser("id"),
    userStoreRegion: _aiUser("storeRegion"),
    userAuthUserId: _aiUser("authUserId"),
    userAnonymousUserAcquisitionDate: _aiUser("anonUserAcquisitionDate"),
    userAuthenticatedUserAcquisitionDate: _aiUser("authUserAcquisitionDate"),
    cloudName: _aiCloud("name"),
    cloudRole: _aiCloud("role"),
    cloudRoleVer: _aiCloud("roleVer"),
    cloudRoleInstance: _aiCloud("roleInstance"),
    cloudEnvironment: _aiCloud("environment"),
    cloudLocation: _aiCloud("location"),
    cloudDeploymentUnit: _aiCloud("deploymentUnit"),
    internalNodeName: _aiInternal("nodeName"),
    internalSdkVersion: _aiInternal("sdkVersion"),
    internalAgentVersion: _aiInternal("agentVersion"),
    internalSnippet: _aiInternal("snippet"),
    internalSdkSrc: _aiInternal("sdkSrc")
  }));

  // node_modules/@microsoft/applicationinsights-common/dist-esm/TelemetryItemCreator.js
  var TelemetryItemCreator = function() {
    function TelemetryItemCreator2() {
    }
    TelemetryItemCreator2.create = function(item, baseType, envelopeName, logger, customProperties, systemProperties) {
      envelopeName = dataSanitizeString(logger, envelopeName) || strNotSpecified;
      if (isNullOrUndefined(item) || isNullOrUndefined(baseType) || isNullOrUndefined(envelopeName)) {
        throw Error("Input doesn't contain all required fields");
      }
      var telemetryItem = {
        name: envelopeName,
        time: toISOString(new Date()),
        iKey: "",
        ext: systemProperties ? systemProperties : {},
        tags: [],
        data: {},
        baseType,
        baseData: item
      };
      if (!isNullOrUndefined(customProperties)) {
        objForEachKey(customProperties, function(prop, value) {
          telemetryItem.data[prop] = value;
        });
      }
      return telemetryItem;
    };
    return TelemetryItemCreator2;
  }();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/Interfaces/PartAExtensions.js
  var Extensions = {
    UserExt: "user",
    DeviceExt: "device",
    TraceExt: "trace",
    WebExt: "web",
    AppExt: "app",
    OSExt: "os",
    SessionExt: "ses",
    SDKExt: "sdk"
  };
  var CtxTagKeys = new ContextTagKeys();

  // node_modules/@microsoft/applicationinsights-common/dist-esm/applicationinsights-common.js
  var PropertiesPluginIdentifier = "AppInsightsPropertiesPlugin";
  var BreezeChannelIdentifier = "AppInsightsChannelPlugin";
  var AnalyticsPluginIdentifier = "ApplicationInsightsAnalytics";

  // node_modules/@microsoft/applicationinsights-analytics-js/dist-esm/JavaScriptSDK/Telemetry/PageViewManager.js
  var PageViewManager = function() {
    function PageViewManager2(appInsights, overridePageViewDuration, core, pageViewPerformanceManager) {
      dynamicproto_js_default(PageViewManager2, this, function(_self) {
        var intervalHandle = null;
        var itemQueue = [];
        var pageViewPerformanceSent = false;
        var _logger;
        if (core) {
          _logger = core.logger;
        }
        function _flushChannels() {
          if (core) {
            arrForEach(core.getTransmissionControls(), function(queues) {
              arrForEach(queues, function(q) {
                return q.flush(true);
              });
            });
          }
        }
        function _addQueue(cb) {
          itemQueue.push(cb);
          if (!intervalHandle) {
            intervalHandle = setInterval(function() {
              var allItems = itemQueue.slice(0);
              var doFlush = false;
              itemQueue = [];
              arrForEach(allItems, function(item) {
                if (!item()) {
                  itemQueue.push(item);
                } else {
                  doFlush = true;
                }
              });
              if (itemQueue.length === 0) {
                clearInterval(intervalHandle);
                intervalHandle = null;
              }
              if (doFlush) {
                _flushChannels();
              }
            }, 100);
          }
        }
        _self.trackPageView = function(pageView, customProperties) {
          var name = pageView.name;
          if (isNullOrUndefined(name) || typeof name !== "string") {
            var doc = getDocument();
            name = pageView.name = doc && doc.title || "";
          }
          var uri = pageView.uri;
          if (isNullOrUndefined(uri) || typeof uri !== "string") {
            var location_1 = getLocation();
            uri = pageView.uri = location_1 && location_1.href || "";
          }
          if (!pageViewPerformanceManager.isPerformanceTimingSupported()) {
            appInsights.sendPageViewInternal(pageView, customProperties);
            _flushChannels();
            _logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.NavigationTimingNotSupported, "trackPageView: navigation timing API used for calculation of page duration is not supported in this browser. This page view will be collected without duration and timing info.");
            return;
          }
          var pageViewSent = false;
          var customDuration;
          var start = pageViewPerformanceManager.getPerformanceTiming().navigationStart;
          if (start > 0) {
            customDuration = dateTimeUtilsDuration(start, +new Date());
            if (!pageViewPerformanceManager.shouldCollectDuration(customDuration)) {
              customDuration = void 0;
            }
          }
          var duration;
          if (!isNullOrUndefined(customProperties) && !isNullOrUndefined(customProperties.duration)) {
            duration = customProperties.duration;
          }
          if (overridePageViewDuration || !isNaN(duration)) {
            if (isNaN(duration)) {
              if (!customProperties) {
                customProperties = {};
              }
              customProperties["duration"] = customDuration;
            }
            appInsights.sendPageViewInternal(pageView, customProperties);
            _flushChannels();
            pageViewSent = true;
          }
          var maxDurationLimit = 6e4;
          if (!customProperties) {
            customProperties = {};
          }
          _addQueue(function() {
            var processed = false;
            try {
              if (pageViewPerformanceManager.isPerformanceTimingDataReady()) {
                processed = true;
                var pageViewPerformance = {
                  name,
                  uri
                };
                pageViewPerformanceManager.populatePageViewPerformanceEvent(pageViewPerformance);
                if (!pageViewPerformance.isValid && !pageViewSent) {
                  customProperties["duration"] = customDuration;
                  appInsights.sendPageViewInternal(pageView, customProperties);
                } else {
                  if (!pageViewSent) {
                    customProperties["duration"] = pageViewPerformance.durationMs;
                    appInsights.sendPageViewInternal(pageView, customProperties);
                  }
                  if (!pageViewPerformanceSent) {
                    appInsights.sendPageViewPerformanceInternal(pageViewPerformance, customProperties);
                    pageViewPerformanceSent = true;
                  }
                }
              } else if (start > 0 && dateTimeUtilsDuration(start, +new Date()) > maxDurationLimit) {
                processed = true;
                if (!pageViewSent) {
                  customProperties["duration"] = maxDurationLimit;
                  appInsights.sendPageViewInternal(pageView, customProperties);
                }
              }
            } catch (e) {
              _logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailedCalc, "trackPageView failed on page load calculation: " + getExceptionName(e), { exception: dumpObj(e) });
            }
            return processed;
          });
        };
      });
    }
    return PageViewManager2;
  }();

  // node_modules/@microsoft/applicationinsights-analytics-js/dist-esm/JavaScriptSDK/Telemetry/PageVisitTimeManager.js
  var PageVisitTimeManager = function() {
    function PageVisitTimeManager2(logger, pageVisitTimeTrackingHandler) {
      this.prevPageVisitDataKeyName = "prevPageVisitData";
      this.pageVisitTimeTrackingHandler = pageVisitTimeTrackingHandler;
      this._logger = logger;
    }
    PageVisitTimeManager2.prototype.trackPreviousPageVisit = function(currentPageName, currentPageUrl) {
      try {
        var prevPageVisitTimeData = this.restartPageVisitTimer(currentPageName, currentPageUrl);
        if (prevPageVisitTimeData) {
          this.pageVisitTimeTrackingHandler(prevPageVisitTimeData.pageName, prevPageVisitTimeData.pageUrl, prevPageVisitTimeData.pageVisitTime);
        }
      } catch (e) {
        this._logger.warnToConsole("Auto track page visit time failed, metric will not be collected: " + dumpObj(e));
      }
    };
    PageVisitTimeManager2.prototype.restartPageVisitTimer = function(pageName, pageUrl) {
      try {
        var prevPageVisitData = this.stopPageVisitTimer();
        this.startPageVisitTimer(pageName, pageUrl);
        return prevPageVisitData;
      } catch (e) {
        this._logger.warnToConsole("Call to restart failed: " + dumpObj(e));
        return null;
      }
    };
    PageVisitTimeManager2.prototype.startPageVisitTimer = function(pageName, pageUrl) {
      try {
        if (utlCanUseSessionStorage()) {
          if (utlGetSessionStorage(this._logger, this.prevPageVisitDataKeyName) != null) {
            throwError("Cannot call startPageVisit consecutively without first calling stopPageVisit");
          }
          var currPageVisitData = new PageVisitData(pageName, pageUrl);
          var currPageVisitDataStr = getJSON().stringify(currPageVisitData);
          utlSetSessionStorage(this._logger, this.prevPageVisitDataKeyName, currPageVisitDataStr);
        }
      } catch (e) {
        this._logger.warnToConsole("Call to start failed: " + dumpObj(e));
      }
    };
    PageVisitTimeManager2.prototype.stopPageVisitTimer = function() {
      try {
        if (utlCanUseSessionStorage()) {
          var pageVisitEndTime = dateNow();
          var pageVisitDataJsonStr = utlGetSessionStorage(this._logger, this.prevPageVisitDataKeyName);
          if (pageVisitDataJsonStr && hasJSON()) {
            var prevPageVisitData = getJSON().parse(pageVisitDataJsonStr);
            prevPageVisitData.pageVisitTime = pageVisitEndTime - prevPageVisitData.pageVisitStartTime;
            utlRemoveSessionStorage(this._logger, this.prevPageVisitDataKeyName);
            return prevPageVisitData;
          } else {
            return null;
          }
        }
        return null;
      } catch (e) {
        this._logger.warnToConsole("Stop page visit timer failed: " + dumpObj(e));
        return null;
      }
    };
    return PageVisitTimeManager2;
  }();
  var PageVisitData = function() {
    function PageVisitData2(pageName, pageUrl) {
      this.pageVisitStartTime = dateNow();
      this.pageName = pageName;
      this.pageUrl = pageUrl;
    }
    return PageVisitData2;
  }();

  // node_modules/@microsoft/applicationinsights-analytics-js/dist-esm/JavaScriptSDK/Telemetry/PageViewPerformanceManager.js
  var PageViewPerformanceManager = function() {
    function PageViewPerformanceManager2(core) {
      this.MAX_DURATION_ALLOWED = 36e5;
      if (core) {
        this._logger = core.logger;
      }
    }
    PageViewPerformanceManager2.prototype.populatePageViewPerformanceEvent = function(pageViewPerformance) {
      pageViewPerformance.isValid = false;
      var navigationTiming = this.getPerformanceNavigationTiming();
      var timing = this.getPerformanceTiming();
      var total = 0;
      var network = 0;
      var request = 0;
      var response = 0;
      var dom = 0;
      if (navigationTiming || timing) {
        if (navigationTiming) {
          total = navigationTiming.duration;
          network = navigationTiming.startTime === 0 ? navigationTiming.connectEnd : dateTimeUtilsDuration(navigationTiming.startTime, navigationTiming.connectEnd);
          request = dateTimeUtilsDuration(navigationTiming.requestStart, navigationTiming.responseStart);
          response = dateTimeUtilsDuration(navigationTiming.responseStart, navigationTiming.responseEnd);
          dom = dateTimeUtilsDuration(navigationTiming.responseEnd, navigationTiming.loadEventEnd);
        } else {
          total = dateTimeUtilsDuration(timing.navigationStart, timing.loadEventEnd);
          network = dateTimeUtilsDuration(timing.navigationStart, timing.connectEnd);
          request = dateTimeUtilsDuration(timing.requestStart, timing.responseStart);
          response = dateTimeUtilsDuration(timing.responseStart, timing.responseEnd);
          dom = dateTimeUtilsDuration(timing.responseEnd, timing.loadEventEnd);
        }
        if (total === 0) {
          this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.ErrorPVCalc, "error calculating page view performance.", { total, network, request, response, dom });
        } else if (!this.shouldCollectDuration(total, network, request, response, dom)) {
          this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.InvalidDurationValue, "Invalid page load duration value. Browser perf data won't be sent.", { total, network, request, response, dom });
        } else if (total < Math.floor(network) + Math.floor(request) + Math.floor(response) + Math.floor(dom)) {
          this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.ClientPerformanceMathError, "client performance math error.", { total, network, request, response, dom });
        } else {
          pageViewPerformance.durationMs = total;
          pageViewPerformance.perfTotal = pageViewPerformance.duration = msToTimeSpan(total);
          pageViewPerformance.networkConnect = msToTimeSpan(network);
          pageViewPerformance.sentRequest = msToTimeSpan(request);
          pageViewPerformance.receivedResponse = msToTimeSpan(response);
          pageViewPerformance.domProcessing = msToTimeSpan(dom);
          pageViewPerformance.isValid = true;
        }
      }
    };
    PageViewPerformanceManager2.prototype.getPerformanceTiming = function() {
      if (this.isPerformanceTimingSupported()) {
        return getPerformance().timing;
      }
      return null;
    };
    PageViewPerformanceManager2.prototype.getPerformanceNavigationTiming = function() {
      if (this.isPerformanceNavigationTimingSupported()) {
        return getPerformance().getEntriesByType("navigation")[0];
      }
      return null;
    };
    PageViewPerformanceManager2.prototype.isPerformanceNavigationTimingSupported = function() {
      var perf = getPerformance();
      return perf && perf.getEntriesByType && perf.getEntriesByType("navigation").length > 0;
    };
    PageViewPerformanceManager2.prototype.isPerformanceTimingSupported = function() {
      var perf = getPerformance();
      return perf && perf.timing;
    };
    PageViewPerformanceManager2.prototype.isPerformanceTimingDataReady = function() {
      var perf = getPerformance();
      var timing = perf ? perf.timing : 0;
      return timing && timing.domainLookupStart > 0 && timing.navigationStart > 0 && timing.responseStart > 0 && timing.requestStart > 0 && timing.loadEventEnd > 0 && timing.responseEnd > 0 && timing.connectEnd > 0 && timing.domLoading > 0;
    };
    PageViewPerformanceManager2.prototype.shouldCollectDuration = function() {
      var durations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        durations[_i] = arguments[_i];
      }
      var _navigator = getNavigator() || {};
      var botAgentNames = ["googlebot", "adsbot-google", "apis-google", "mediapartners-google"];
      var userAgent = _navigator.userAgent;
      var isGoogleBot = false;
      if (userAgent) {
        for (var i = 0; i < botAgentNames.length; i++) {
          isGoogleBot = isGoogleBot || userAgent.toLowerCase().indexOf(botAgentNames[i]) !== -1;
        }
      }
      if (isGoogleBot) {
        return false;
      } else {
        for (var i = 0; i < durations.length; i++) {
          if (durations[i] < 0 || durations[i] >= this.MAX_DURATION_ALLOWED) {
            return false;
          }
        }
      }
      return true;
    };
    return PageViewPerformanceManager2;
  }();

  // node_modules/@microsoft/applicationinsights-analytics-js/dist-esm/JavaScriptSDK/ApplicationInsights.js
  var durationProperty = "duration";
  var strEvent = "event";
  function _dispatchEvent(target, evnt) {
    if (target && target.dispatchEvent && evnt) {
      target.dispatchEvent(evnt);
    }
  }
  var ApplicationInsights = function(_super) {
    __extendsFn(ApplicationInsights2, _super);
    function ApplicationInsights2() {
      var _this = _super.call(this) || this;
      _this.identifier = AnalyticsPluginIdentifier;
      _this.priority = 180;
      _this.autoRoutePVDelay = 500;
      var _eventTracking;
      var _pageTracking;
      var _properties;
      var _trackAjaxAttempts = 0;
      var _prevUri;
      var _currUri;
      dynamicproto_js_default(ApplicationInsights2, _this, function(_self, _base) {
        var location2 = getLocation(true);
        _prevUri = location2 && location2.href || "";
        _self.getCookieMgr = function() {
          return safeGetCookieMgr(_self.core);
        };
        _self.processTelemetry = function(env, itemCtx) {
          doPerf(_self.core, function() {
            return _self.identifier + ":processTelemetry";
          }, function() {
            var doNotSendItem = false;
            var telemetryInitializersCount = _self._telemetryInitializers.length;
            itemCtx = _self._getTelCtx(itemCtx);
            for (var i = 0; i < telemetryInitializersCount; ++i) {
              var telemetryInitializer = _self._telemetryInitializers[i];
              if (telemetryInitializer) {
                try {
                  if (telemetryInitializer.apply(null, [env]) === false) {
                    doNotSendItem = true;
                    break;
                  }
                } catch (e) {
                  itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "One of telemetry initializers failed, telemetry item will not be sent: " + getExceptionName(e), { exception: dumpObj(e) }, true);
                }
              }
            }
            if (!doNotSendItem) {
              _self.processNext(env, itemCtx);
            }
          }, function() {
            return { item: env };
          }, !env.sync);
        };
        _self.trackEvent = function(event, customProperties) {
          try {
            var telemetryItem = TelemetryItemCreator.create(event, Event2.dataType, Event2.envelopeType, _self.diagLog(), customProperties);
            _self.core.track(telemetryItem);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TrackTraceFailed, "trackTrace failed, trace will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.startTrackEvent = function(name) {
          try {
            _eventTracking.start(name);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StartTrackEventFailed, "startTrackEvent failed, event will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.stopTrackEvent = function(name, properties, measurements) {
          try {
            _eventTracking.stop(name, void 0, properties);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StopTrackEventFailed, "stopTrackEvent failed, event will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.trackTrace = function(trace, customProperties) {
          try {
            var telemetryItem = TelemetryItemCreator.create(trace, Trace.dataType, Trace.envelopeType, _self.diagLog(), customProperties);
            _self.core.track(telemetryItem);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TrackTraceFailed, "trackTrace failed, trace will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.trackMetric = function(metric, customProperties) {
          try {
            var telemetryItem = TelemetryItemCreator.create(metric, Metric.dataType, Metric.envelopeType, _self.diagLog(), customProperties);
            _self.core.track(telemetryItem);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackMetricFailed, "trackMetric failed, metric will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.trackPageView = function(pageView, customProperties) {
          try {
            var inPv = pageView || {};
            _self._pageViewManager.trackPageView(inPv, __assignFn({}, inPv.properties, inPv.measurements, customProperties));
            if (_self.config.autoTrackPageVisitTime) {
              _self._pageVisitTimeManager.trackPreviousPageVisit(inPv.name, inPv.uri);
            }
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailed, "trackPageView failed, page view will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.sendPageViewInternal = function(pageView, properties, systemProperties) {
          var doc = getDocument();
          if (doc) {
            pageView.refUri = pageView.refUri === void 0 ? doc.referrer : pageView.refUri;
          }
          var telemetryItem = TelemetryItemCreator.create(pageView, PageView.dataType, PageView.envelopeType, _self.diagLog(), properties, systemProperties);
          _self.core.track(telemetryItem);
          _trackAjaxAttempts = 0;
        };
        _self.sendPageViewPerformanceInternal = function(pageViewPerformance, properties, systemProperties) {
          var telemetryItem = TelemetryItemCreator.create(pageViewPerformance, PageViewPerformance.dataType, PageViewPerformance.envelopeType, _self.diagLog(), properties, systemProperties);
          _self.core.track(telemetryItem);
        };
        _self.trackPageViewPerformance = function(pageViewPerformance, customProperties) {
          try {
            _self._pageViewPerformanceManager.populatePageViewPerformanceEvent(pageViewPerformance);
            _self.sendPageViewPerformanceInternal(pageViewPerformance, customProperties);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailed, "trackPageViewPerformance failed, page view will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.startTrackPage = function(name) {
          try {
            if (typeof name !== "string") {
              var doc = getDocument();
              name = doc && doc.title || "";
            }
            _pageTracking.start(name);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StartTrackFailed, "startTrackPage failed, page view may not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.stopTrackPage = function(name, url, properties, measurement) {
          try {
            if (typeof name !== "string") {
              var doc = getDocument();
              name = doc && doc.title || "";
            }
            if (typeof url !== "string") {
              var loc = getLocation();
              url = loc && loc.href || "";
            }
            _pageTracking.stop(name, url, properties, measurement);
            if (_self.config.autoTrackPageVisitTime) {
              _self._pageVisitTimeManager.trackPreviousPageVisit(name, url);
            }
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StopTrackFailed, "stopTrackPage failed, page view will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.sendExceptionInternal = function(exception, customProperties, systemProperties) {
          var theError = exception.exception || exception.error || new Error(strNotSpecified);
          var exceptionPartB = new Exception(_self.diagLog(), theError, exception.properties || customProperties, exception.measurements, exception.severityLevel, exception.id).toInterface();
          var telemetryItem = TelemetryItemCreator.create(exceptionPartB, Exception.dataType, Exception.envelopeType, _self.diagLog(), customProperties, systemProperties);
          _self.core.track(telemetryItem);
        };
        _self.trackException = function(exception, customProperties) {
          try {
            _self.sendExceptionInternal(exception, customProperties);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackExceptionFailed, "trackException failed, exception will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self._onerror = function(exception) {
          var error = exception && exception.error;
          var evt = exception && exception.evt;
          try {
            if (!evt) {
              var _window = getWindow();
              if (_window) {
                evt = _window[strEvent];
              }
            }
            var url = exception && exception.url || (getDocument() || {}).URL;
            var errorSrc = exception.errorSrc || "window.onerror@" + url + ":" + (exception.lineNumber || 0) + ":" + (exception.columnNumber || 0);
            var properties = {
              errorSrc,
              url,
              lineNumber: exception.lineNumber || 0,
              columnNumber: exception.columnNumber || 0,
              message: exception.message
            };
            if (isCrossOriginError(exception.message, exception.url, exception.lineNumber, exception.columnNumber, exception.error)) {
              _sendCORSException(Exception.CreateAutoException("Script error: The browser's same-origin policy prevents us from getting the details of this exception. Consider using the 'crossorigin' attribute.", url, exception.lineNumber || 0, exception.columnNumber || 0, error, evt, null, errorSrc), properties);
            } else {
              if (!exception.errorSrc) {
                exception.errorSrc = errorSrc;
              }
              _self.trackException({ exception, severityLevel: SeverityLevel.Error }, properties);
            }
          } catch (e) {
            var errorString = error ? error.name + ", " + error.message : "null";
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.ExceptionWhileLoggingError, "_onError threw exception while logging error, error will not be collected: " + getExceptionName(e), { exception: dumpObj(e), errorString });
          }
        };
        _self.addTelemetryInitializer = function(telemetryInitializer) {
          _self._telemetryInitializers.push(telemetryInitializer);
        };
        _self.initialize = function(config, core, extensions, pluginChain) {
          if (_self.isInitialized()) {
            return;
          }
          if (isNullOrUndefined(core)) {
            throw Error("Error initializing");
          }
          _base.initialize(config, core, extensions, pluginChain);
          _self.setInitialized(false);
          var ctx = _self._getTelCtx();
          var identifier = _self.identifier;
          _self.config = ctx.getExtCfg(identifier);
          var defaults = ApplicationInsights2.getDefaultConfig(config);
          if (defaults !== void 0) {
            objForEachKey(defaults, function(field, value) {
              _self.config[field] = ctx.getConfig(identifier, field, value);
              if (_self.config[field] === void 0) {
                _self.config[field] = value;
              }
            });
          }
          if (_self.config.isStorageUseDisabled) {
            utlDisableStorage();
          }
          var configGetters = {
            instrumentationKey: function() {
              return config.instrumentationKey;
            },
            accountId: function() {
              return _self.config.accountId || config.accountId;
            },
            sessionRenewalMs: function() {
              return _self.config.sessionRenewalMs || config.sessionRenewalMs;
            },
            sessionExpirationMs: function() {
              return _self.config.sessionExpirationMs || config.sessionExpirationMs;
            },
            sampleRate: function() {
              return _self.config.samplingPercentage || config.samplingPercentage;
            },
            sdkExtension: function() {
              return _self.config.sdkExtension || config.sdkExtension;
            },
            isBrowserLinkTrackingEnabled: function() {
              return _self.config.isBrowserLinkTrackingEnabled || config.isBrowserLinkTrackingEnabled;
            },
            appId: function() {
              return _self.config.appId || config.appId;
            }
          };
          _self._pageViewPerformanceManager = new PageViewPerformanceManager(_self.core);
          _self._pageViewManager = new PageViewManager(_this, _self.config.overridePageViewDuration, _self.core, _self._pageViewPerformanceManager);
          _self._pageVisitTimeManager = new PageVisitTimeManager(_self.diagLog(), function(pageName, pageUrl, pageVisitTime) {
            return trackPageVisitTime(pageName, pageUrl, pageVisitTime);
          });
          _self._telemetryInitializers = _self._telemetryInitializers || [];
          _addDefaultTelemetryInitializers(configGetters);
          _eventTracking = new Timing(_self.diagLog(), "trackEvent");
          _eventTracking.action = function(name, url, duration, properties) {
            if (!properties) {
              properties = {};
            }
            properties[durationProperty] = duration.toString();
            _self.trackEvent({ name, properties });
          };
          _pageTracking = new Timing(_self.diagLog(), "trackPageView");
          _pageTracking.action = function(name, url, duration, properties, measurements) {
            if (isNullOrUndefined(properties)) {
              properties = {};
            }
            properties[durationProperty] = duration.toString();
            var pageViewItem = {
              name,
              uri: url,
              properties,
              measurements
            };
            _self.sendPageViewInternal(pageViewItem, properties);
          };
          var _window = getWindow();
          var _history = getHistory();
          var _location = getLocation(true);
          var instance = _this;
          if (_self.config.disableExceptionTracking === false && !_self.config.autoExceptionInstrumented && _window) {
            var onerror_1 = "onerror";
            var originalOnError_1 = _window[onerror_1];
            _window.onerror = function(message, url, lineNumber, columnNumber, error) {
              var evt = _window[strEvent];
              var handled = originalOnError_1 && originalOnError_1(message, url, lineNumber, columnNumber, error);
              if (handled !== true) {
                instance._onerror(Exception.CreateAutoException(message, url, lineNumber, columnNumber, error, evt));
              }
              return handled;
            };
            _self.config.autoExceptionInstrumented = true;
          }
          if (_self.config.disableExceptionTracking === false && _self.config.enableUnhandledPromiseRejectionTracking === true && !_self.config.autoUnhandledPromiseInstrumented && _window) {
            var onunhandledrejection = "onunhandledrejection";
            var originalOnUnhandledRejection_1 = _window[onunhandledrejection];
            _window[onunhandledrejection] = function(error) {
              var evt = _window[strEvent];
              var handled = originalOnUnhandledRejection_1 && originalOnUnhandledRejection_1.call(_window, error);
              if (handled !== true) {
                instance._onerror(Exception.CreateAutoException(error.reason.toString(), _location ? _location.href : "", 0, 0, error, evt));
              }
              return handled;
            };
            _self.config.autoUnhandledPromiseInstrumented = true;
          }
          if (_self.config.enableAutoRouteTracking === true && _history && isFunction(_history.pushState) && isFunction(_history.replaceState) && _window && typeof Event !== "undefined") {
            var _self_1 = _this;
            arrForEach(extensions, function(extension) {
              if (extension.identifier === PropertiesPluginIdentifier) {
                _properties = extension;
              }
            });
            _history.pushState = function(f) {
              return function pushState() {
                var ret = f.apply(this, arguments);
                _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "pushState"));
                _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "locationchange"));
                return ret;
              };
            }(_history.pushState);
            _history.replaceState = function(f) {
              return function replaceState() {
                var ret = f.apply(this, arguments);
                _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "replaceState"));
                _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "locationchange"));
                return ret;
              };
            }(_history.replaceState);
            if (_window.addEventListener) {
              _window.addEventListener(_self_1.config.namePrefix + "popstate", function() {
                _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "locationchange"));
              });
              _window.addEventListener(_self_1.config.namePrefix + "locationchange", function() {
                if (_properties && _properties.context && _properties.context.telemetryTrace) {
                  _properties.context.telemetryTrace.traceID = generateW3CId();
                  var traceLocationName = "_unknown_";
                  if (_location && _location.pathname) {
                    traceLocationName = _location.pathname + (_location.hash || "");
                  }
                  _properties.context.telemetryTrace.name = traceLocationName;
                }
                if (_currUri) {
                  _prevUri = _currUri;
                  _currUri = _location && _location.href || "";
                } else {
                  _currUri = _location && _location.href || "";
                }
                setTimeout(function(uri) {
                  _self_1.trackPageView({ refUri: uri, properties: { duration: 0 } });
                }.bind(_this, _prevUri), _self_1.autoRoutePVDelay);
              });
            }
          }
          _self.setInitialized(true);
        };
        function trackPageVisitTime(pageName, pageUrl, pageVisitTime) {
          var properties = { PageName: pageName, PageUrl: pageUrl };
          _self.trackMetric({
            name: "PageVisitTime",
            average: pageVisitTime,
            max: pageVisitTime,
            min: pageVisitTime,
            sampleCount: 1
          }, properties);
        }
        function _addDefaultTelemetryInitializers(configGetters) {
          if (!configGetters.isBrowserLinkTrackingEnabled()) {
            var browserLinkPaths_1 = ["/browserLinkSignalR/", "/__browserLink/"];
            var dropBrowserLinkRequests = function(envelope) {
              if (envelope.baseType === RemoteDependencyData2.dataType) {
                var remoteData = envelope.baseData;
                if (remoteData) {
                  for (var i = 0; i < browserLinkPaths_1.length; i++) {
                    if (remoteData.target && remoteData.target.indexOf(browserLinkPaths_1[i]) >= 0) {
                      return false;
                    }
                  }
                }
              }
              return true;
            };
            _addTelemetryInitializer(dropBrowserLinkRequests);
          }
        }
        function _addTelemetryInitializer(telemetryInitializer) {
          _self._telemetryInitializers.push(telemetryInitializer);
        }
        function _sendCORSException(exception, properties) {
          var telemetryItem = TelemetryItemCreator.create(exception, Exception.dataType, Exception.envelopeType, _self.diagLog(), properties);
          _self.core.track(telemetryItem);
        }
      });
      return _this;
    }
    ApplicationInsights2.getDefaultConfig = function(config) {
      if (!config) {
        config = {};
      }
      config.sessionRenewalMs = 30 * 60 * 1e3;
      config.sessionExpirationMs = 24 * 60 * 60 * 1e3;
      config.disableExceptionTracking = stringToBoolOrDefault(config.disableExceptionTracking);
      config.autoTrackPageVisitTime = stringToBoolOrDefault(config.autoTrackPageVisitTime);
      config.overridePageViewDuration = stringToBoolOrDefault(config.overridePageViewDuration);
      config.enableUnhandledPromiseRejectionTracking = stringToBoolOrDefault(config.enableUnhandledPromiseRejectionTracking);
      if (isNaN(config.samplingPercentage) || config.samplingPercentage <= 0 || config.samplingPercentage >= 100) {
        config.samplingPercentage = 100;
      }
      config.isStorageUseDisabled = stringToBoolOrDefault(config.isStorageUseDisabled);
      config.isBrowserLinkTrackingEnabled = stringToBoolOrDefault(config.isBrowserLinkTrackingEnabled);
      config.enableAutoRouteTracking = stringToBoolOrDefault(config.enableAutoRouteTracking);
      config.namePrefix = config.namePrefix || "";
      config.enableDebug = stringToBoolOrDefault(config.enableDebug);
      config.disableFlushOnBeforeUnload = stringToBoolOrDefault(config.disableFlushOnBeforeUnload);
      config.disableFlushOnUnload = stringToBoolOrDefault(config.disableFlushOnUnload, config.disableFlushOnBeforeUnload);
      return config;
    };
    ApplicationInsights2.Version = "2.6.4";
    return ApplicationInsights2;
  }(BaseTelemetryPlugin);
  var Timing = function() {
    function Timing2(logger, name) {
      var _self = this;
      var _events = {};
      _self.start = function(name2) {
        if (typeof _events[name2] !== "undefined") {
          logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StartCalledMoreThanOnce, "start was called more than once for this event without calling stop.", { name: name2, key: name2 }, true);
        }
        _events[name2] = +new Date();
      };
      _self.stop = function(name2, url, properties, measurements) {
        var start = _events[name2];
        if (isNaN(start)) {
          logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StopCalledWithoutStart, "stop was called without a corresponding start.", { name: name2, key: name2 }, true);
        } else {
          var end = +new Date();
          var duration = dateTimeUtilsDuration(start, end);
          _self.action(name2, url, duration, properties, measurements);
        }
        delete _events[name2];
        _events[name2] = void 0;
      };
    }
    return Timing2;
  }();

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/SendBuffer.js
  var ArraySendBuffer = function() {
    function ArraySendBuffer2(config) {
      var _buffer = [];
      dynamicproto_js_default(ArraySendBuffer2, this, function(_self) {
        _self.enqueue = function(payload) {
          _buffer.push(payload);
        };
        _self.count = function() {
          return _buffer.length;
        };
        _self.clear = function() {
          _buffer.length = 0;
        };
        _self.getItems = function() {
          return _buffer.slice(0);
        };
        _self.batchPayloads = function(payload) {
          if (payload && payload.length > 0) {
            var batch = config.emitLineDelimitedJson() ? payload.join("\n") : "[" + payload.join(",") + "]";
            return batch;
          }
          return null;
        };
        _self.markAsSent = function(payload) {
          _self.clear();
        };
        _self.clearSent = function(payload) {
        };
      });
    }
    return ArraySendBuffer2;
  }();
  var SessionStorageSendBuffer = function() {
    function SessionStorageSendBuffer2(logger, config) {
      var _bufferFullMessageSent = false;
      var _buffer;
      dynamicproto_js_default(SessionStorageSendBuffer2, this, function(_self) {
        var bufferItems = _getBuffer(SessionStorageSendBuffer2.BUFFER_KEY);
        var notDeliveredItems = _getBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY);
        _buffer = bufferItems.concat(notDeliveredItems);
        if (_buffer.length > SessionStorageSendBuffer2.MAX_BUFFER_SIZE) {
          _buffer.length = SessionStorageSendBuffer2.MAX_BUFFER_SIZE;
        }
        _setBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY, []);
        _setBuffer(SessionStorageSendBuffer2.BUFFER_KEY, _buffer);
        _self.enqueue = function(payload) {
          if (_buffer.length >= SessionStorageSendBuffer2.MAX_BUFFER_SIZE) {
            if (!_bufferFullMessageSent) {
              logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.SessionStorageBufferFull, "Maximum buffer size reached: " + _buffer.length, true);
              _bufferFullMessageSent = true;
            }
            return;
          }
          _buffer.push(payload);
          _setBuffer(SessionStorageSendBuffer2.BUFFER_KEY, _buffer);
        };
        _self.count = function() {
          return _buffer.length;
        };
        _self.clear = function() {
          _buffer = [];
          _setBuffer(SessionStorageSendBuffer2.BUFFER_KEY, []);
          _setBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY, []);
          _bufferFullMessageSent = false;
        };
        _self.getItems = function() {
          return _buffer.slice(0);
        };
        _self.batchPayloads = function(payload) {
          if (payload && payload.length > 0) {
            var batch = config.emitLineDelimitedJson() ? payload.join("\n") : "[" + payload.join(",") + "]";
            return batch;
          }
          return null;
        };
        _self.markAsSent = function(payload) {
          _buffer = _removePayloadsFromBuffer(payload, _buffer);
          _setBuffer(SessionStorageSendBuffer2.BUFFER_KEY, _buffer);
          var sentElements = _getBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY);
          if (sentElements instanceof Array && payload instanceof Array) {
            sentElements = sentElements.concat(payload);
            if (sentElements.length > SessionStorageSendBuffer2.MAX_BUFFER_SIZE) {
              logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.SessionStorageBufferFull, "Sent buffer reached its maximum size: " + sentElements.length, true);
              sentElements.length = SessionStorageSendBuffer2.MAX_BUFFER_SIZE;
            }
            _setBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY, sentElements);
          }
        };
        _self.clearSent = function(payload) {
          var sentElements = _getBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY);
          sentElements = _removePayloadsFromBuffer(payload, sentElements);
          _setBuffer(SessionStorageSendBuffer2.SENT_BUFFER_KEY, sentElements);
        };
        function _removePayloadsFromBuffer(payloads, buffer) {
          var remaining = [];
          arrForEach(buffer, function(value) {
            if (!isFunction(value) && arrIndexOf(payloads, value) === -1) {
              remaining.push(value);
            }
          });
          return remaining;
        }
        function _getBuffer(key) {
          var prefixedKey = key;
          try {
            prefixedKey = config.namePrefix && config.namePrefix() ? config.namePrefix() + "_" + prefixedKey : prefixedKey;
            var bufferJson = utlGetSessionStorage(logger, prefixedKey);
            if (bufferJson) {
              var buffer = getJSON().parse(bufferJson);
              if (isString(buffer)) {
                buffer = getJSON().parse(buffer);
              }
              if (buffer && isArray(buffer)) {
                return buffer;
              }
            }
          } catch (e) {
            logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.FailedToRestoreStorageBuffer, " storage key: " + prefixedKey + ", " + getExceptionName(e), { exception: dumpObj(e) });
          }
          return [];
        }
        function _setBuffer(key, buffer) {
          var prefixedKey = key;
          try {
            prefixedKey = config.namePrefix && config.namePrefix() ? config.namePrefix() + "_" + prefixedKey : prefixedKey;
            var bufferJson = JSON.stringify(buffer);
            utlSetSessionStorage(logger, prefixedKey, bufferJson);
          } catch (e) {
            utlSetSessionStorage(logger, prefixedKey, JSON.stringify([]));
            logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.FailedToSetStorageBuffer, " storage key: " + prefixedKey + ", " + getExceptionName(e) + ". Buffer cleared", { exception: dumpObj(e) });
          }
        }
      });
    }
    SessionStorageSendBuffer2.BUFFER_KEY = "AI_buffer";
    SessionStorageSendBuffer2.SENT_BUFFER_KEY = "AI_sentBuffer";
    SessionStorageSendBuffer2.MAX_BUFFER_SIZE = 2e3;
    return SessionStorageSendBuffer2;
  }();

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/EnvelopeCreator.js
  var strBaseType = "baseType";
  var strBaseData = "baseData";
  var strProperties = "properties";
  var strTrue = "true";
  function _setValueIf(target, field, value) {
    return setValue(target, field, value, isTruthy);
  }
  var EnvelopeCreator = function() {
    function EnvelopeCreator2() {
    }
    EnvelopeCreator2.extractPropsAndMeasurements = function(data, properties, measurements) {
      if (!isNullOrUndefined(data)) {
        objForEachKey(data, function(key, value) {
          if (isNumber(value)) {
            measurements[key] = value;
          } else if (isString(value)) {
            properties[key] = value;
          } else if (hasJSON()) {
            properties[key] = getJSON().stringify(value);
          }
        });
      }
    };
    EnvelopeCreator2.createEnvelope = function(logger, envelopeType, telemetryItem, data) {
      var envelope = new Envelope2(logger, data, envelopeType);
      _setValueIf(envelope, "sampleRate", telemetryItem[SampleRate]);
      if ((telemetryItem[strBaseData] || {}).startTime) {
        envelope.time = toISOString(telemetryItem[strBaseData].startTime);
      }
      envelope.iKey = telemetryItem.iKey;
      var iKeyNoDashes = telemetryItem.iKey.replace(/-/g, "");
      envelope.name = envelope.name.replace("{0}", iKeyNoDashes);
      EnvelopeCreator2.extractPartAExtensions(telemetryItem, envelope);
      telemetryItem.tags = telemetryItem.tags || [];
      return optimizeObject(envelope);
    };
    EnvelopeCreator2.extractPartAExtensions = function(item, env) {
      var envTags = env.tags = env.tags || {};
      var itmExt = item.ext = item.ext || {};
      var itmTags = item.tags = item.tags || [];
      var extUser = itmExt.user;
      if (extUser) {
        _setValueIf(envTags, CtxTagKeys.userAuthUserId, extUser.authId);
        _setValueIf(envTags, CtxTagKeys.userId, extUser.id || extUser.localId);
      }
      var extApp = itmExt.app;
      if (extApp) {
        _setValueIf(envTags, CtxTagKeys.sessionId, extApp.sesId);
      }
      var extDevice = itmExt.device;
      if (extDevice) {
        _setValueIf(envTags, CtxTagKeys.deviceId, extDevice.id || extDevice.localId);
        _setValueIf(envTags, CtxTagKeys.deviceType, extDevice.deviceClass);
        _setValueIf(envTags, CtxTagKeys.deviceIp, extDevice.ip);
        _setValueIf(envTags, CtxTagKeys.deviceModel, extDevice.model);
        _setValueIf(envTags, CtxTagKeys.deviceType, extDevice.deviceType);
      }
      var web = item.ext.web;
      if (web) {
        _setValueIf(envTags, CtxTagKeys.deviceLanguage, web.browserLang);
        _setValueIf(envTags, CtxTagKeys.deviceBrowserVersion, web.browserVer);
        _setValueIf(envTags, CtxTagKeys.deviceBrowser, web.browser);
        var envData = env.data = env.data || {};
        var envBaseData = envData[strBaseData] = envData[strBaseData] || {};
        var envProps = envBaseData[strProperties] = envBaseData[strProperties] || {};
        _setValueIf(envProps, "domain", web.domain);
        _setValueIf(envProps, "isManual", web.isManual ? strTrue : null);
        _setValueIf(envProps, "screenRes", web.screenRes);
        _setValueIf(envProps, "userConsent", web.userConsent ? strTrue : null);
      }
      var extOs = itmExt.os;
      if (extOs) {
        _setValueIf(envTags, CtxTagKeys.deviceOS, extOs.name);
      }
      var extTrace = itmExt.trace;
      if (extTrace) {
        _setValueIf(envTags, CtxTagKeys.operationParentId, extTrace.parentID);
        _setValueIf(envTags, CtxTagKeys.operationName, extTrace.name);
        _setValueIf(envTags, CtxTagKeys.operationId, extTrace.traceID);
      }
      var tgs = {};
      for (var i = itmTags.length - 1; i >= 0; i--) {
        var tg = itmTags[i];
        objForEachKey(tg, function(key, value) {
          tgs[key] = value;
        });
        itmTags.splice(i, 1);
      }
      objForEachKey(itmTags, function(tg2, value) {
        tgs[tg2] = value;
      });
      var theTags = __assignFn({}, envTags, tgs);
      if (!theTags[CtxTagKeys.internalSdkVersion]) {
        theTags[CtxTagKeys.internalSdkVersion] = "javascript:" + EnvelopeCreator2.Version;
      }
      env.tags = optimizeObject(theTags);
    };
    EnvelopeCreator2.prototype.Init = function(logger, telemetryItem) {
      this._logger = logger;
      if (isNullOrUndefined(telemetryItem[strBaseData])) {
        this._logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryEnvelopeInvalid, "telemetryItem.baseData cannot be null.");
      }
    };
    EnvelopeCreator2.Version = "2.6.4";
    return EnvelopeCreator2;
  }();
  var DependencyEnvelopeCreator = function(_super) {
    __extendsFn(DependencyEnvelopeCreator2, _super);
    function DependencyEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    DependencyEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var customMeasurements = telemetryItem[strBaseData].measurements || {};
      var customProperties = telemetryItem[strBaseData][strProperties] || {};
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, customProperties, customMeasurements);
      var bd = telemetryItem[strBaseData];
      if (isNullOrUndefined(bd)) {
        logger.warnToConsole("Invalid input for dependency data");
        return null;
      }
      var method = bd[strProperties] && bd[strProperties][HttpMethod] ? bd[strProperties][HttpMethod] : "GET";
      var remoteDepData = new RemoteDependencyData2(logger, bd.id, bd.target, bd.name, bd.duration, bd.success, bd.responseCode, method, bd.type, bd.correlationContext, customProperties, customMeasurements);
      var data = new Data2(RemoteDependencyData2.dataType, remoteDepData);
      return EnvelopeCreator.createEnvelope(logger, RemoteDependencyData2.envelopeType, telemetryItem, data);
    };
    DependencyEnvelopeCreator2.DependencyEnvelopeCreator = new DependencyEnvelopeCreator2();
    return DependencyEnvelopeCreator2;
  }(EnvelopeCreator);
  var EventEnvelopeCreator = function(_super) {
    __extendsFn(EventEnvelopeCreator2, _super);
    function EventEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    EventEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var customProperties = {};
      var customMeasurements = {};
      if (telemetryItem[strBaseType] !== Event2.dataType) {
        customProperties["baseTypeSource"] = telemetryItem[strBaseType];
      }
      if (telemetryItem[strBaseType] === Event2.dataType) {
        customProperties = telemetryItem[strBaseData][strProperties] || {};
        customMeasurements = telemetryItem[strBaseData].measurements || {};
      } else {
        if (telemetryItem[strBaseData]) {
          EnvelopeCreator.extractPropsAndMeasurements(telemetryItem[strBaseData], customProperties, customMeasurements);
        }
      }
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, customProperties, customMeasurements);
      var eventName = telemetryItem[strBaseData].name;
      var eventData = new Event2(logger, eventName, customProperties, customMeasurements);
      var data = new Data2(Event2.dataType, eventData);
      return EnvelopeCreator.createEnvelope(logger, Event2.envelopeType, telemetryItem, data);
    };
    EventEnvelopeCreator2.EventEnvelopeCreator = new EventEnvelopeCreator2();
    return EventEnvelopeCreator2;
  }(EnvelopeCreator);
  var ExceptionEnvelopeCreator = function(_super) {
    __extendsFn(ExceptionEnvelopeCreator2, _super);
    function ExceptionEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    ExceptionEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var customMeasurements = telemetryItem[strBaseData].measurements || {};
      var customProperties = telemetryItem[strBaseData][strProperties] || {};
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, customProperties, customMeasurements);
      var bd = telemetryItem[strBaseData];
      var exData = Exception.CreateFromInterface(logger, bd, customProperties, customMeasurements);
      var data = new Data2(Exception.dataType, exData);
      return EnvelopeCreator.createEnvelope(logger, Exception.envelopeType, telemetryItem, data);
    };
    ExceptionEnvelopeCreator2.ExceptionEnvelopeCreator = new ExceptionEnvelopeCreator2();
    return ExceptionEnvelopeCreator2;
  }(EnvelopeCreator);
  var MetricEnvelopeCreator = function(_super) {
    __extendsFn(MetricEnvelopeCreator2, _super);
    function MetricEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    MetricEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var baseData = telemetryItem[strBaseData];
      var props = baseData[strProperties] || {};
      var measurements = baseData.measurements || {};
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, props, measurements);
      var baseMetricData = new Metric(logger, baseData.name, baseData.average, baseData.sampleCount, baseData.min, baseData.max, props, measurements);
      var data = new Data2(Metric.dataType, baseMetricData);
      return EnvelopeCreator.createEnvelope(logger, Metric.envelopeType, telemetryItem, data);
    };
    MetricEnvelopeCreator2.MetricEnvelopeCreator = new MetricEnvelopeCreator2();
    return MetricEnvelopeCreator2;
  }(EnvelopeCreator);
  var PageViewEnvelopeCreator = function(_super) {
    __extendsFn(PageViewEnvelopeCreator2, _super);
    function PageViewEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PageViewEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var strDuration = "duration";
      var duration;
      var baseData = telemetryItem[strBaseData];
      if (!isNullOrUndefined(baseData) && !isNullOrUndefined(baseData[strProperties]) && !isNullOrUndefined(baseData[strProperties][strDuration])) {
        duration = baseData[strProperties][strDuration];
        delete baseData[strProperties][strDuration];
      } else if (!isNullOrUndefined(telemetryItem.data) && !isNullOrUndefined(telemetryItem.data[strDuration])) {
        duration = telemetryItem.data[strDuration];
        delete telemetryItem.data[strDuration];
      }
      var bd = telemetryItem[strBaseData];
      var currentContextId;
      if (((telemetryItem.ext || {}).trace || {}).traceID) {
        currentContextId = telemetryItem.ext.trace.traceID;
      }
      var id = bd.id || currentContextId;
      var name = bd.name;
      var url = bd.uri;
      var properties = bd[strProperties] || {};
      var measurements = bd.measurements || {};
      if (!isNullOrUndefined(bd.refUri)) {
        properties["refUri"] = bd.refUri;
      }
      if (!isNullOrUndefined(bd.pageType)) {
        properties["pageType"] = bd.pageType;
      }
      if (!isNullOrUndefined(bd.isLoggedIn)) {
        properties["isLoggedIn"] = bd.isLoggedIn.toString();
      }
      if (!isNullOrUndefined(bd[strProperties])) {
        var pageTags = bd[strProperties];
        objForEachKey(pageTags, function(key, value) {
          properties[key] = value;
        });
      }
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, properties, measurements);
      var pageViewData = new PageView(logger, name, url, duration, properties, measurements, id);
      var data = new Data2(PageView.dataType, pageViewData);
      return EnvelopeCreator.createEnvelope(logger, PageView.envelopeType, telemetryItem, data);
    };
    PageViewEnvelopeCreator2.PageViewEnvelopeCreator = new PageViewEnvelopeCreator2();
    return PageViewEnvelopeCreator2;
  }(EnvelopeCreator);
  var PageViewPerformanceEnvelopeCreator = function(_super) {
    __extendsFn(PageViewPerformanceEnvelopeCreator2, _super);
    function PageViewPerformanceEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PageViewPerformanceEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var bd = telemetryItem[strBaseData];
      var name = bd.name;
      var url = bd.uri || bd.url;
      var properties = bd[strProperties] || {};
      var measurements = bd.measurements || {};
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, properties, measurements);
      var baseData = new PageViewPerformance(logger, name, url, void 0, properties, measurements, bd);
      var data = new Data2(PageViewPerformance.dataType, baseData);
      return EnvelopeCreator.createEnvelope(logger, PageViewPerformance.envelopeType, telemetryItem, data);
    };
    PageViewPerformanceEnvelopeCreator2.PageViewPerformanceEnvelopeCreator = new PageViewPerformanceEnvelopeCreator2();
    return PageViewPerformanceEnvelopeCreator2;
  }(EnvelopeCreator);
  var TraceEnvelopeCreator = function(_super) {
    __extendsFn(TraceEnvelopeCreator2, _super);
    function TraceEnvelopeCreator2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    TraceEnvelopeCreator2.prototype.Create = function(logger, telemetryItem) {
      _super.prototype.Init.call(this, logger, telemetryItem);
      var message = telemetryItem[strBaseData].message;
      var severityLevel = telemetryItem[strBaseData].severityLevel;
      var props = telemetryItem[strBaseData][strProperties] || {};
      var measurements = telemetryItem[strBaseData].measurements || {};
      EnvelopeCreator.extractPropsAndMeasurements(telemetryItem.data, props, measurements);
      var baseData = new Trace(logger, message, severityLevel, props, measurements);
      var data = new Data2(Trace.dataType, baseData);
      return EnvelopeCreator.createEnvelope(logger, Trace.envelopeType, telemetryItem, data);
    };
    TraceEnvelopeCreator2.TraceEnvelopeCreator = new TraceEnvelopeCreator2();
    return TraceEnvelopeCreator2;
  }(EnvelopeCreator);

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/Serializer.js
  var Serializer = function() {
    function Serializer2(logger) {
      dynamicproto_js_default(Serializer2, this, function(_self) {
        _self.serialize = function(input) {
          var output = _serializeObject(input, "root");
          try {
            return getJSON().stringify(output);
          } catch (e) {
            logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.CannotSerializeObject, e && isFunction(e.toString) ? e.toString() : "Error serializing object", null, true);
          }
        };
        function _serializeObject(source, name) {
          var circularReferenceCheck = "__aiCircularRefCheck";
          var output = {};
          if (!source) {
            logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.CannotSerializeObject, "cannot serialize object because it is null or undefined", { name }, true);
            return output;
          }
          if (source[circularReferenceCheck]) {
            logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.CircularReferenceDetected, "Circular reference detected while serializing object", { name }, true);
            return output;
          }
          if (!source.aiDataContract) {
            if (name === "measurements") {
              output = _serializeStringMap(source, "number", name);
            } else if (name === "properties") {
              output = _serializeStringMap(source, "string", name);
            } else if (name === "tags") {
              output = _serializeStringMap(source, "string", name);
            } else if (isArray(source)) {
              output = _serializeArray(source, name);
            } else {
              logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.CannotSerializeObjectNonSerializable, "Attempting to serialize an object which does not implement ISerializable", { name }, true);
              try {
                getJSON().stringify(source);
                output = source;
              } catch (e) {
                logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.CannotSerializeObject, e && isFunction(e.toString) ? e.toString() : "Error serializing object", null, true);
              }
            }
            return output;
          }
          source[circularReferenceCheck] = true;
          objForEachKey(source.aiDataContract, function(field, contract) {
            var isRequired = isFunction(contract) ? contract() & 1 : contract & 1;
            var isHidden = isFunction(contract) ? contract() & 4 : contract & 4;
            var isArray2 = contract & 2;
            var isPresent = source[field] !== void 0;
            var isObj = isObject(source[field]) && source[field] !== null;
            if (isRequired && !isPresent && !isArray2) {
              logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.MissingRequiredFieldSpecification, "Missing required field specification. The field is required but not present on source", { field, name });
            } else if (!isHidden) {
              var value = void 0;
              if (isObj) {
                if (isArray2) {
                  value = _serializeArray(source[field], field);
                } else {
                  value = _serializeObject(source[field], field);
                }
              } else {
                value = source[field];
              }
              if (value !== void 0) {
                output[field] = value;
              }
            }
          });
          delete source[circularReferenceCheck];
          return output;
        }
        function _serializeArray(sources, name) {
          var output;
          if (!!sources) {
            if (!isArray(sources)) {
              logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.ItemNotInArray, "This field was specified as an array in the contract but the item is not an array.\r\n", { name }, true);
            } else {
              output = [];
              for (var i = 0; i < sources.length; i++) {
                var source = sources[i];
                var item = _serializeObject(source, name + "[" + i + "]");
                output.push(item);
              }
            }
          }
          return output;
        }
        function _serializeStringMap(map, expectedType, name) {
          var output;
          if (map) {
            output = {};
            objForEachKey(map, function(field, value) {
              if (expectedType === "string") {
                if (value === void 0) {
                  output[field] = "undefined";
                } else if (value === null) {
                  output[field] = "null";
                } else if (!value.toString) {
                  output[field] = "invalid field: toString() is not defined.";
                } else {
                  output[field] = value.toString();
                }
              } else if (expectedType === "number") {
                if (value === void 0) {
                  output[field] = "undefined";
                } else if (value === null) {
                  output[field] = "null";
                } else {
                  var num = parseFloat(value);
                  if (isNaN(num)) {
                    output[field] = "NaN";
                  } else {
                    output[field] = num;
                  }
                }
              } else {
                output[field] = "invalid field: " + name + " is of unknown type.";
                logger.throwInternal(LoggingSeverity.CRITICAL, output[field], null, true);
              }
            });
          }
          return output;
        }
      });
    }
    return Serializer2;
  }();

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/Offline.js
  var OfflineListener = function() {
    function OfflineListener2() {
      var _window = getWindow();
      var _document2 = getDocument();
      var isListening = false;
      var _onlineStatus = true;
      dynamicproto_js_default(OfflineListener2, this, function(_self) {
        try {
          if (_window) {
            if (EventHelper.Attach(_window, "online", _setOnline)) {
              EventHelper.Attach(_window, "offline", _setOffline);
              isListening = true;
            }
          }
          if (_document2) {
            var target = _document2.body || _document2;
            if (!isUndefined(target.ononline)) {
              target.ononline = _setOnline;
              target.onoffline = _setOffline;
              isListening = true;
            }
          }
          if (isListening) {
            var _navigator = getNavigator();
            if (_navigator && !isNullOrUndefined(_navigator.onLine)) {
              _onlineStatus = _navigator.onLine;
            }
          }
        } catch (e) {
          isListening = false;
        }
        _self.isListening = isListening;
        _self.isOnline = function() {
          var result = true;
          var _navigator2 = getNavigator();
          if (isListening) {
            result = _onlineStatus;
          } else if (_navigator2 && !isNullOrUndefined(_navigator2.onLine)) {
            result = _navigator2.onLine;
          }
          return result;
        };
        _self.isOffline = function() {
          return !_self.isOnline();
        };
        function _setOnline() {
          _onlineStatus = true;
        }
        function _setOffline() {
          _onlineStatus = false;
        }
      });
    }
    OfflineListener2.Offline = new OfflineListener2();
    return OfflineListener2;
  }();
  var Offline = OfflineListener.Offline;

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/TelemetryProcessors/SamplingScoreGenerators/HashCodeScoreGenerator.js
  var HashCodeScoreGenerator = function() {
    function HashCodeScoreGenerator2() {
    }
    HashCodeScoreGenerator2.prototype.getHashCodeScore = function(key) {
      var score = this.getHashCode(key) / HashCodeScoreGenerator2.INT_MAX_VALUE;
      return score * 100;
    };
    HashCodeScoreGenerator2.prototype.getHashCode = function(input) {
      if (input === "") {
        return 0;
      }
      while (input.length < HashCodeScoreGenerator2.MIN_INPUT_LENGTH) {
        input = input.concat(input);
      }
      var hash = 5381;
      for (var i = 0; i < input.length; ++i) {
        hash = (hash << 5) + hash + input.charCodeAt(i);
        hash = hash & hash;
      }
      return Math.abs(hash);
    };
    HashCodeScoreGenerator2.INT_MAX_VALUE = 2147483647;
    HashCodeScoreGenerator2.MIN_INPUT_LENGTH = 8;
    return HashCodeScoreGenerator2;
  }();

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/TelemetryProcessors/SamplingScoreGenerators/SamplingScoreGenerator.js
  var SamplingScoreGenerator = function() {
    function SamplingScoreGenerator2() {
      this.hashCodeGeneragor = new HashCodeScoreGenerator();
      this.keys = new ContextTagKeys();
    }
    SamplingScoreGenerator2.prototype.getSamplingScore = function(item) {
      var score = 0;
      if (item.tags && item.tags[this.keys.userId]) {
        score = this.hashCodeGeneragor.getHashCodeScore(item.tags[this.keys.userId]);
      } else if (item.ext && item.ext.user && item.ext.user.id) {
        score = this.hashCodeGeneragor.getHashCodeScore(item.ext.user.id);
      } else if (item.tags && item.tags[this.keys.operationId]) {
        score = this.hashCodeGeneragor.getHashCodeScore(item.tags[this.keys.operationId]);
      } else if (item.ext && item.ext.telemetryTrace && item.ext.telemetryTrace.traceID) {
        score = this.hashCodeGeneragor.getHashCodeScore(item.ext.telemetryTrace.traceID);
      } else {
        score = Math.random() * 100;
      }
      return score;
    };
    return SamplingScoreGenerator2;
  }();

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/TelemetryProcessors/Sample.js
  var Sample = function() {
    function Sample2(sampleRate, logger) {
      this.INT_MAX_VALUE = 2147483647;
      this._logger = logger || safeGetLogger(null);
      if (sampleRate > 100 || sampleRate < 0) {
        this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.SampleRateOutOfRange, "Sampling rate is out of range (0..100). Sampling will be disabled, you may be sending too much data which may affect your AI service level.", { samplingRate: sampleRate }, true);
        sampleRate = 100;
      }
      this.sampleRate = sampleRate;
      this.samplingScoreGenerator = new SamplingScoreGenerator();
    }
    Sample2.prototype.isSampledIn = function(envelope) {
      var samplingPercentage = this.sampleRate;
      var isSampledIn = false;
      if (samplingPercentage === null || samplingPercentage === void 0 || samplingPercentage >= 100) {
        return true;
      } else if (envelope.baseType === Metric.dataType) {
        return true;
      }
      isSampledIn = this.samplingScoreGenerator.getSamplingScore(envelope) < samplingPercentage;
      return isSampledIn;
    };
    return Sample2;
  }();

  // node_modules/@microsoft/applicationinsights-channel-js/dist-esm/Sender.js
  function _getResponseText(xhr) {
    try {
      return xhr.responseText;
    } catch (e) {
    }
    return null;
  }
  var Sender = function(_super) {
    __extendsFn(Sender2, _super);
    function Sender2() {
      var _this = _super.call(this) || this;
      _this.priority = 1001;
      _this.identifier = BreezeChannelIdentifier;
      _this._XMLHttpRequestSupported = false;
      var _consecutiveErrors;
      var _retryAt;
      var _lastSend;
      var _timeoutHandle;
      var _serializer;
      var _stamp_specific_redirects;
      var _headers = {};
      dynamicproto_js_default(Sender2, _this, function(_self, _base) {
        function _notImplemented() {
          throwError("Method not implemented.");
        }
        _self.pause = _notImplemented;
        _self.resume = _notImplemented;
        _self.flush = function() {
          try {
            _self.triggerSend(true, null, 1);
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.FlushFailed, "flush failed, telemetry will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
          }
        };
        _self.onunloadFlush = function() {
          if ((_self._senderConfig.onunloadDisableBeacon() === false || _self._senderConfig.isBeaconApiDisabled() === false) && isBeaconApiSupported()) {
            try {
              _self.triggerSend(true, _beaconSender, 2);
            } catch (e) {
              _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.FailedToSendQueuedTelemetry, "failed to flush with beacon sender on page unload, telemetry will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
            }
          } else {
            _self.flush();
          }
        };
        _self.teardown = _notImplemented;
        _self.addHeader = function(name, value) {
          _headers[name] = value;
        };
        _self.initialize = function(config, core, extensions, pluginChain) {
          _base.initialize(config, core, extensions, pluginChain);
          var ctx = _self._getTelCtx();
          var identifier = _self.identifier;
          _serializer = new Serializer(core.logger);
          _consecutiveErrors = 0;
          _retryAt = null;
          _lastSend = 0;
          _self._sender = null;
          _stamp_specific_redirects = 0;
          var defaultConfig = Sender2._getDefaultAppInsightsChannelConfig();
          _self._senderConfig = Sender2._getEmptyAppInsightsChannelConfig();
          objForEachKey(defaultConfig, function(field, value) {
            _self._senderConfig[field] = function() {
              return ctx.getConfig(identifier, field, value());
            };
          });
          _self._buffer = _self._senderConfig.enableSessionStorageBuffer() && utlCanUseSessionStorage() ? new SessionStorageSendBuffer(_self.diagLog(), _self._senderConfig) : new ArraySendBuffer(_self._senderConfig);
          _self._sample = new Sample(_self._senderConfig.samplingPercentage(), _self.diagLog());
          if (!_validateInstrumentationKey(config)) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.InvalidInstrumentationKey, "Invalid Instrumentation key " + config.instrumentationKey);
          }
          if (!isInternalApplicationInsightsEndpoint(_self._senderConfig.endpointUrl()) && _self._senderConfig.customHeaders() && _self._senderConfig.customHeaders().length > 0) {
            arrForEach(_self._senderConfig.customHeaders(), function(customHeader) {
              _this.addHeader(customHeader.header, customHeader.value);
            });
          }
          if (!_self._senderConfig.isBeaconApiDisabled() && isBeaconApiSupported()) {
            _self._sender = _beaconSender;
          } else {
            var xhr = getGlobalInst("XMLHttpRequest");
            if (xhr) {
              var testXhr = new xhr();
              if ("withCredentials" in testXhr) {
                _self._sender = _xhrSender;
                _self._XMLHttpRequestSupported = true;
              } else if (typeof XDomainRequest !== strShimUndefined) {
                _self._sender = _xdrSender;
              }
            } else {
              var fetch_1 = getGlobalInst("fetch");
              if (fetch_1) {
                _self._sender = _fetchSender;
              }
            }
          }
        };
        _self.processTelemetry = function(telemetryItem, itemCtx) {
          itemCtx = _self._getTelCtx(itemCtx);
          try {
            if (_self._senderConfig.disableTelemetry()) {
              return;
            }
            if (!telemetryItem) {
              itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.CannotSendEmptyTelemetry, "Cannot send empty telemetry");
              return;
            }
            if (telemetryItem.baseData && !telemetryItem.baseType) {
              itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.InvalidEvent, "Cannot send telemetry without baseData and baseType");
              return;
            }
            if (!telemetryItem.baseType) {
              telemetryItem.baseType = "EventData";
            }
            if (!_self._sender) {
              itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.SenderNotInitialized, "Sender was not initialized");
              return;
            }
            if (!_isSampledIn(telemetryItem)) {
              itemCtx.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TelemetrySampledAndNotSent, "Telemetry item was sampled out and not sent", { SampleRate: _self._sample.sampleRate });
              return;
            } else {
              telemetryItem[SampleRate] = _self._sample.sampleRate;
            }
            var aiEnvelope_1 = Sender2.constructEnvelope(telemetryItem, _self._senderConfig.instrumentationKey(), itemCtx.diagLog());
            if (!aiEnvelope_1) {
              itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.CreateEnvelopeError, "Unable to create an AppInsights envelope");
              return;
            }
            var doNotSendItem_1 = false;
            if (telemetryItem.tags && telemetryItem.tags[ProcessLegacy]) {
              arrForEach(telemetryItem.tags[ProcessLegacy], function(callBack) {
                try {
                  if (callBack && callBack(aiEnvelope_1) === false) {
                    doNotSendItem_1 = true;
                    itemCtx.diagLog().warnToConsole("Telemetry processor check returns false");
                  }
                } catch (e) {
                  itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "One of telemetry initializers failed, telemetry item will not be sent: " + getExceptionName(e), { exception: dumpObj(e) }, true);
                }
              });
              delete telemetryItem.tags[ProcessLegacy];
            }
            if (doNotSendItem_1) {
              return;
            }
            var payload = _serializer.serialize(aiEnvelope_1);
            var bufferPayload = _self._buffer.getItems();
            var batch = _self._buffer.batchPayloads(bufferPayload);
            if (batch && batch.length + payload.length > _self._senderConfig.maxBatchSizeInBytes()) {
              _self.triggerSend(true, null, 10);
            }
            _self._buffer.enqueue(payload);
            _setupTimer();
          } catch (e) {
            itemCtx.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.FailedAddingTelemetryToBuffer, "Failed adding telemetry to the sender's buffer, some telemetry will be lost: " + getExceptionName(e), { exception: dumpObj(e) });
          }
          _self.processNext(telemetryItem, itemCtx);
        };
        _self._xhrReadyStateChange = function(xhr, payload, countOfItemsInPayload) {
          if (xhr.readyState === 4) {
            _checkResponsStatus(xhr.status, payload, xhr.responseURL, countOfItemsInPayload, _formatErrorMessageXhr(xhr), _getResponseText(xhr) || xhr.response);
          }
        };
        _self.triggerSend = function(async, forcedSender, sendReason) {
          if (async === void 0) {
            async = true;
          }
          try {
            if (!_self._senderConfig.disableTelemetry()) {
              if (_self._buffer.count() > 0) {
                var payload = _self._buffer.getItems();
                _notifySendRequest(sendReason || 0, async);
                if (forcedSender) {
                  forcedSender.call(_this, payload, async);
                } else {
                  _self._sender(payload, async);
                }
              }
              _lastSend = +new Date();
            } else {
              _self._buffer.clear();
            }
            clearTimeout(_timeoutHandle);
            _timeoutHandle = null;
            _retryAt = null;
          } catch (e) {
            var ieVer = getIEVersion();
            if (!ieVer || ieVer > 9) {
              _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TransmissionFailed, "Telemetry transmission failed, some telemetry will be lost: " + getExceptionName(e), { exception: dumpObj(e) });
            }
          }
        };
        _self._onError = function(payload, message, event) {
          _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.OnError, "Failed to send telemetry.", { message });
          _self._buffer.clearSent(payload);
        };
        _self._onPartialSuccess = function(payload, results) {
          var failed = [];
          var retry = [];
          var errors = results.errors.reverse();
          for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var error = errors_1[_i];
            var extracted = payload.splice(error.index, 1)[0];
            if (_isRetriable(error.statusCode)) {
              retry.push(extracted);
            } else {
              failed.push(extracted);
            }
          }
          if (payload.length > 0) {
            _self._onSuccess(payload, results.itemsAccepted);
          }
          if (failed.length > 0) {
            _self._onError(failed, _formatErrorMessageXhr(null, ["partial success", results.itemsAccepted, "of", results.itemsReceived].join(" ")));
          }
          if (retry.length > 0) {
            _resendPayload(retry);
            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TransmissionFailed, "Partial success. Delivered: " + payload.length + ", Failed: " + failed.length + ". Will retry to send " + retry.length + " our of " + results.itemsReceived + " items");
          }
        };
        _self._onSuccess = function(payload, countOfItemsInPayload) {
          _self._buffer.clearSent(payload);
        };
        _self._xdrOnLoad = function(xdr, payload) {
          var responseText = _getResponseText(xdr);
          if (xdr && (responseText + "" === "200" || responseText === "")) {
            _consecutiveErrors = 0;
            _self._onSuccess(payload, 0);
          } else {
            var results = _parseResponse(responseText);
            if (results && results.itemsReceived && results.itemsReceived > results.itemsAccepted && !_self._senderConfig.isRetryDisabled()) {
              _self._onPartialSuccess(payload, results);
            } else {
              _self._onError(payload, _formatErrorMessageXdr(xdr));
            }
          }
        };
        function _isSampledIn(envelope) {
          return _self._sample.isSampledIn(envelope);
        }
        function _checkResponsStatus(status, payload, responseUrl, countOfItemsInPayload, errorMessage, res) {
          var response = null;
          if (!_self._appId) {
            response = _parseResponse(res);
            if (response && response.appId) {
              _self._appId = response.appId;
            }
          }
          if ((status < 200 || status >= 300) && status !== 0) {
            if (status === 301 || status === 307 || status === 308) {
              if (!_checkAndUpdateEndPointUrl(responseUrl)) {
                _self._onError(payload, errorMessage);
                return;
              }
            }
            if (!_self._senderConfig.isRetryDisabled() && _isRetriable(status)) {
              _resendPayload(payload);
              _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TransmissionFailed, ". Response code " + status + ". Will retry to send " + payload.length + " items.");
            } else {
              _self._onError(payload, errorMessage);
            }
          } else if (Offline.isOffline()) {
            if (!_self._senderConfig.isRetryDisabled()) {
              var offlineBackOffMultiplier = 10;
              _resendPayload(payload, offlineBackOffMultiplier);
              _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TransmissionFailed, ". Offline - Response Code: " + status + ". Offline status: " + Offline.isOffline() + ". Will retry to send " + payload.length + " items.");
            }
          } else {
            _checkAndUpdateEndPointUrl(responseUrl);
            if (status === 206) {
              if (!response) {
                response = _parseResponse(res);
              }
              if (response && !_self._senderConfig.isRetryDisabled()) {
                _self._onPartialSuccess(payload, response);
              } else {
                _self._onError(payload, errorMessage);
              }
            } else {
              _consecutiveErrors = 0;
              _self._onSuccess(payload, countOfItemsInPayload);
            }
          }
        }
        function _checkAndUpdateEndPointUrl(responseUrl) {
          if (_stamp_specific_redirects >= 10) {
            return false;
          }
          if (!isNullOrUndefined(responseUrl) && responseUrl !== "") {
            if (responseUrl !== _self._senderConfig.endpointUrl()) {
              _self._senderConfig.endpointUrl = function() {
                return responseUrl;
              };
              ++_stamp_specific_redirects;
              return true;
            }
          }
          return false;
        }
        function _beaconSender(payload, isAsync) {
          var url = _self._senderConfig.endpointUrl();
          var batch = _self._buffer.batchPayloads(payload);
          var plainTextBatch = new Blob([batch], { type: "text/plain;charset=UTF-8" });
          var queued = getNavigator().sendBeacon(url, plainTextBatch);
          if (queued) {
            _self._buffer.markAsSent(payload);
            _self._onSuccess(payload, payload.length);
          } else {
            _xhrSender(payload, true);
            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TransmissionFailed, ". Failed to send telemetry with Beacon API, retried with xhrSender.");
          }
        }
        function _xhrSender(payload, isAsync) {
          var xhr = new XMLHttpRequest();
          var endPointUrl = _self._senderConfig.endpointUrl();
          try {
            xhr[DisabledPropertyName] = true;
          } catch (e) {
          }
          xhr.open("POST", endPointUrl, isAsync);
          xhr.setRequestHeader("Content-type", "application/json");
          if (isInternalApplicationInsightsEndpoint(endPointUrl)) {
            xhr.setRequestHeader(RequestHeaders.sdkContextHeader, RequestHeaders.sdkContextHeaderAppIdRequest);
          }
          arrForEach(objKeys(_headers), function(headerName) {
            xhr.setRequestHeader(headerName, _headers[headerName]);
          });
          xhr.onreadystatechange = function() {
            return _self._xhrReadyStateChange(xhr, payload, payload.length);
          };
          xhr.onerror = function(event) {
            return _self._onError(payload, _formatErrorMessageXhr(xhr), event);
          };
          var batch = _self._buffer.batchPayloads(payload);
          xhr.send(batch);
          _self._buffer.markAsSent(payload);
        }
        function _fetchSender(payload, isAsync) {
          var endPointUrl = _self._senderConfig.endpointUrl();
          var batch = _self._buffer.batchPayloads(payload);
          var plainTextBatch = new Blob([batch], { type: "text/plain;charset=UTF-8" });
          var requestHeaders = new Headers();
          if (isInternalApplicationInsightsEndpoint(endPointUrl)) {
            requestHeaders.append(RequestHeaders.sdkContextHeader, RequestHeaders.sdkContextHeaderAppIdRequest);
          }
          arrForEach(objKeys(_headers), function(headerName) {
            requestHeaders.append(headerName, _headers[headerName]);
          });
          var init = {
            method: "POST",
            headers: requestHeaders,
            body: plainTextBatch
          };
          var request = new Request(endPointUrl, init);
          fetch(request).then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            } else {
              response.text().then(function(text) {
                _checkResponsStatus(response.status, payload, response.url, payload.length, response.statusText, text);
              });
              _self._buffer.markAsSent(payload);
            }
          })["catch"](function(error) {
            _self._onError(payload, error.message);
          });
        }
        function _parseResponse(response) {
          try {
            if (response && response !== "") {
              var result = getJSON().parse(response);
              if (result && result.itemsReceived && result.itemsReceived >= result.itemsAccepted && result.itemsReceived - result.itemsAccepted === result.errors.length) {
                return result;
              }
            }
          } catch (e) {
            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.InvalidBackendResponse, "Cannot parse the response. " + getExceptionName(e), {
              response
            });
          }
          return null;
        }
        function _resendPayload(payload, linearFactor) {
          if (linearFactor === void 0) {
            linearFactor = 1;
          }
          if (!payload || payload.length === 0) {
            return;
          }
          _self._buffer.clearSent(payload);
          _consecutiveErrors++;
          for (var _i = 0, payload_1 = payload; _i < payload_1.length; _i++) {
            var item = payload_1[_i];
            _self._buffer.enqueue(item);
          }
          _setRetryTime(linearFactor);
          _setupTimer();
        }
        function _setRetryTime(linearFactor) {
          var SlotDelayInSeconds = 10;
          var delayInSeconds;
          if (_consecutiveErrors <= 1) {
            delayInSeconds = SlotDelayInSeconds;
          } else {
            var backOffSlot = (Math.pow(2, _consecutiveErrors) - 1) / 2;
            var backOffDelay = Math.floor(Math.random() * backOffSlot * SlotDelayInSeconds) + 1;
            backOffDelay = linearFactor * backOffDelay;
            delayInSeconds = Math.max(Math.min(backOffDelay, 3600), SlotDelayInSeconds);
          }
          var retryAfterTimeSpan = dateNow() + delayInSeconds * 1e3;
          _retryAt = retryAfterTimeSpan;
        }
        function _setupTimer() {
          if (!_timeoutHandle) {
            var retryInterval = _retryAt ? Math.max(0, _retryAt - dateNow()) : 0;
            var timerValue = Math.max(_self._senderConfig.maxBatchInterval(), retryInterval);
            _timeoutHandle = setTimeout(function() {
              _self.triggerSend(true, null, 1);
            }, timerValue);
          }
        }
        function _isRetriable(statusCode) {
          return statusCode === 408 || statusCode === 429 || statusCode === 500 || statusCode === 503;
        }
        function _formatErrorMessageXhr(xhr, message) {
          if (xhr) {
            return "XMLHttpRequest,Status:" + xhr.status + ",Response:" + _getResponseText(xhr) || xhr.response || "";
          }
          return message;
        }
        function _xdrSender(payload, isAsync) {
          var _window = getWindow();
          var xdr = new XDomainRequest();
          xdr.onload = function() {
            return _self._xdrOnLoad(xdr, payload);
          };
          xdr.onerror = function(event) {
            return _self._onError(payload, _formatErrorMessageXdr(xdr), event);
          };
          var hostingProtocol = _window && _window.location && _window.location.protocol || "";
          if (_self._senderConfig.endpointUrl().lastIndexOf(hostingProtocol, 0) !== 0) {
            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TransmissionFailed, ". Cannot send XDomain request. The endpoint URL protocol doesn't match the hosting page protocol.");
            _self._buffer.clear();
            return;
          }
          var endpointUrl = _self._senderConfig.endpointUrl().replace(/^(https?:)/, "");
          xdr.open("POST", endpointUrl);
          var batch = _self._buffer.batchPayloads(payload);
          xdr.send(batch);
          _self._buffer.markAsSent(payload);
        }
        function _formatErrorMessageXdr(xdr, message) {
          if (xdr) {
            return "XDomainRequest,Response:" + _getResponseText(xdr) || "";
          }
          return message;
        }
        function _getNotifyMgr() {
          var func = "getNotifyMgr";
          if (_self.core[func]) {
            return _self.core[func]();
          }
          return _self.core["_notificationManager"];
        }
        function _notifySendRequest(sendRequest, isAsync) {
          var manager = _getNotifyMgr();
          if (manager && manager.eventsSendRequest) {
            try {
              manager.eventsSendRequest(sendRequest, isAsync);
            } catch (e) {
              _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.NotificationException, "send request notification failed: " + getExceptionName(e), { exception: dumpObj(e) });
            }
          }
        }
        function _validateInstrumentationKey(config) {
          var disableIKeyValidationFlag = isNullOrUndefined(config.disableInstrumentationKeyValidation) ? false : config.disableInstrumentationKeyValidation;
          if (disableIKeyValidationFlag) {
            return true;
          }
          var UUID_Regex = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
          var regexp = new RegExp(UUID_Regex);
          return regexp.test(config.instrumentationKey);
        }
      });
      return _this;
    }
    Sender2.constructEnvelope = function(orig, iKey, logger) {
      var envelope;
      if (iKey !== orig.iKey && !isNullOrUndefined(iKey)) {
        envelope = __assignFn({}, orig, { iKey });
      } else {
        envelope = orig;
      }
      switch (envelope.baseType) {
        case Event2.dataType:
          return EventEnvelopeCreator.EventEnvelopeCreator.Create(logger, envelope);
        case Trace.dataType:
          return TraceEnvelopeCreator.TraceEnvelopeCreator.Create(logger, envelope);
        case PageView.dataType:
          return PageViewEnvelopeCreator.PageViewEnvelopeCreator.Create(logger, envelope);
        case PageViewPerformance.dataType:
          return PageViewPerformanceEnvelopeCreator.PageViewPerformanceEnvelopeCreator.Create(logger, envelope);
        case Exception.dataType:
          return ExceptionEnvelopeCreator.ExceptionEnvelopeCreator.Create(logger, envelope);
        case Metric.dataType:
          return MetricEnvelopeCreator.MetricEnvelopeCreator.Create(logger, envelope);
        case RemoteDependencyData2.dataType:
          return DependencyEnvelopeCreator.DependencyEnvelopeCreator.Create(logger, envelope);
        default:
          return EventEnvelopeCreator.EventEnvelopeCreator.Create(logger, envelope);
      }
    };
    Sender2._getDefaultAppInsightsChannelConfig = function() {
      return {
        endpointUrl: function() {
          return "https://dc.services.visualstudio.com/v2/track";
        },
        emitLineDelimitedJson: function() {
          return false;
        },
        maxBatchInterval: function() {
          return 15e3;
        },
        maxBatchSizeInBytes: function() {
          return 102400;
        },
        disableTelemetry: function() {
          return false;
        },
        enableSessionStorageBuffer: function() {
          return true;
        },
        isRetryDisabled: function() {
          return false;
        },
        isBeaconApiDisabled: function() {
          return true;
        },
        onunloadDisableBeacon: function() {
          return false;
        },
        instrumentationKey: function() {
          return void 0;
        },
        namePrefix: function() {
          return void 0;
        },
        samplingPercentage: function() {
          return 100;
        },
        customHeaders: function() {
          return void 0;
        }
      };
    };
    Sender2._getEmptyAppInsightsChannelConfig = function() {
      return {
        endpointUrl: void 0,
        emitLineDelimitedJson: void 0,
        maxBatchInterval: void 0,
        maxBatchSizeInBytes: void 0,
        disableTelemetry: void 0,
        enableSessionStorageBuffer: void 0,
        isRetryDisabled: void 0,
        isBeaconApiDisabled: void 0,
        onunloadDisableBeacon: void 0,
        instrumentationKey: void 0,
        namePrefix: void 0,
        samplingPercentage: void 0,
        customHeaders: void 0
      };
    };
    return Sender2;
  }(BaseTelemetryPlugin);

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/Session.js
  var cookieNameConst = "ai_session";
  var Session = function() {
    function Session2() {
    }
    return Session2;
  }();
  var _SessionManager = function() {
    function _SessionManager2(config, core) {
      var self2 = this;
      var _storageNamePrefix;
      var _cookieUpdatedTimestamp;
      var _logger = safeGetLogger(core);
      var _cookieManager = safeGetCookieMgr(core);
      dynamicproto_js_default(_SessionManager2, self2, function(_self) {
        if (!config) {
          config = {};
        }
        if (!isFunction(config.sessionExpirationMs)) {
          config.sessionExpirationMs = function() {
            return _SessionManager2.acquisitionSpan;
          };
        }
        if (!isFunction(config.sessionRenewalMs)) {
          config.sessionRenewalMs = function() {
            return _SessionManager2.renewalSpan;
          };
        }
        _self.config = config;
        var sessionCookiePostfix = _self.config.sessionCookiePostfix && _self.config.sessionCookiePostfix() ? _self.config.sessionCookiePostfix() : _self.config.namePrefix && _self.config.namePrefix() ? _self.config.namePrefix() : "";
        _storageNamePrefix = function() {
          return cookieNameConst + sessionCookiePostfix;
        };
        _self.automaticSession = new Session();
        _self.update = function() {
          var nowMs = dateNow();
          var isExpired = false;
          var session = _self.automaticSession;
          if (!session.id) {
            isExpired = !_initializeAutomaticSession(session, nowMs);
          }
          var sessionExpirationMs = _self.config.sessionExpirationMs();
          if (!isExpired && sessionExpirationMs > 0) {
            var sessionRenewalMs = _self.config.sessionRenewalMs();
            var timeSinceAcqMs = nowMs - session.acquisitionDate;
            var timeSinceRenewalMs = nowMs - session.renewalDate;
            isExpired = timeSinceAcqMs < 0 || timeSinceRenewalMs < 0;
            isExpired = isExpired || timeSinceAcqMs > sessionExpirationMs;
            isExpired = isExpired || timeSinceRenewalMs > sessionRenewalMs;
          }
          if (isExpired) {
            _renew(nowMs);
          } else {
            if (!_cookieUpdatedTimestamp || nowMs - _cookieUpdatedTimestamp > _SessionManager2.cookieUpdateInterval) {
              _setCookie(session, nowMs);
            }
          }
        };
        _self.backup = function() {
          var session = _self.automaticSession;
          _setStorage(session.id, session.acquisitionDate, session.renewalDate);
        };
        function _initializeAutomaticSession(session, now) {
          var isValid = false;
          var cookieValue = _cookieManager.get(_storageNamePrefix());
          if (cookieValue && isFunction(cookieValue.split)) {
            isValid = _initializeAutomaticSessionWithData(session, cookieValue);
          } else {
            var storageValue = utlGetLocalStorage(_logger, _storageNamePrefix());
            if (storageValue) {
              isValid = _initializeAutomaticSessionWithData(session, storageValue);
            }
          }
          return isValid || !!session.id;
        }
        function _initializeAutomaticSessionWithData(session, sessionData) {
          var isValid = false;
          var sessionReset = ", session will be reset";
          var tokens = sessionData.split("|");
          if (tokens.length >= 2) {
            try {
              var acqMs = +tokens[1] || 0;
              var renewalMs = +tokens[2] || 0;
              if (isNaN(acqMs) || acqMs <= 0) {
                _logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.SessionRenewalDateIsZero, "AI session acquisition date is 0" + sessionReset);
              } else if (isNaN(renewalMs) || renewalMs <= 0) {
                _logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.SessionRenewalDateIsZero, "AI session renewal date is 0" + sessionReset);
              } else if (tokens[0]) {
                session.id = tokens[0];
                session.acquisitionDate = acqMs;
                session.renewalDate = renewalMs;
                isValid = true;
              }
            } catch (e) {
              _logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.ErrorParsingAISessionCookie, "Error parsing ai_session value [" + (sessionData || "") + "]" + sessionReset + " - " + getExceptionName(e), { exception: dumpObj(e) });
            }
          }
          return isValid;
        }
        function _renew(nowMs) {
          var theConfig = _self.config || {};
          var getNewId = (theConfig.getNewId ? theConfig.getNewId() : null) || newId;
          _self.automaticSession.id = getNewId(theConfig.idLength ? theConfig.idLength() : 22);
          _self.automaticSession.acquisitionDate = nowMs;
          _setCookie(_self.automaticSession, nowMs);
          if (!utlCanUseLocalStorage()) {
            _logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserDoesNotSupportLocalStorage, "Browser does not support local storage. Session durations will be inaccurate.");
          }
        }
        function _setCookie(session, nowMs) {
          var acq = session.acquisitionDate;
          session.renewalDate = nowMs;
          var config2 = _self.config;
          var renewalPeriodMs = config2.sessionRenewalMs();
          var acqTimeLeftMs = acq + config2.sessionExpirationMs() - nowMs;
          var cookie = [session.id, acq, nowMs];
          var maxAgeSec = 0;
          if (acqTimeLeftMs < renewalPeriodMs) {
            maxAgeSec = acqTimeLeftMs / 1e3;
          } else {
            maxAgeSec = renewalPeriodMs / 1e3;
          }
          var cookieDomain = config2.cookieDomain ? config2.cookieDomain() : null;
          _cookieManager.set(_storageNamePrefix(), cookie.join("|"), config2.sessionExpirationMs() > 0 ? maxAgeSec : null, cookieDomain);
          _cookieUpdatedTimestamp = nowMs;
        }
        function _setStorage(guid, acq, renewal) {
          utlSetLocalStorage(_logger, _storageNamePrefix(), [guid, acq, renewal].join("|"));
        }
      });
    }
    _SessionManager2.acquisitionSpan = 864e5;
    _SessionManager2.renewalSpan = 18e5;
    _SessionManager2.cookieUpdateInterval = 6e4;
    return _SessionManager2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/Application.js
  var Application = function() {
    function Application2() {
    }
    return Application2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/Device.js
  var Device = function() {
    function Device2() {
      this.id = "browser";
      this.deviceClass = "Browser";
    }
    return Device2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/Internal.js
  var Version = "2.6.4";
  var Internal = function() {
    function Internal2(config) {
      this.sdkVersion = (config.sdkExtension && config.sdkExtension() ? config.sdkExtension() + "_" : "") + "javascript:" + Version;
    }
    return Internal2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/User.js
  function _validateUserInput(id) {
    if (typeof id !== "string" || !id || id.match(/,|;|=| |\|/)) {
      return false;
    }
    return true;
  }
  var User = function() {
    function User2(config, core) {
      this.isNewUser = false;
      var _logger = safeGetLogger(core);
      var _cookieManager = safeGetCookieMgr(core);
      var _storageNamePrefix;
      dynamicproto_js_default(User2, this, function(_self) {
        _self.config = config;
        var userCookiePostfix = _self.config.userCookiePostfix && _self.config.userCookiePostfix() ? _self.config.userCookiePostfix() : "";
        _storageNamePrefix = function() {
          return User2.userCookieName + userCookiePostfix;
        };
        var cookie = _cookieManager.get(_storageNamePrefix());
        if (cookie) {
          _self.isNewUser = false;
          var params = cookie.split(User2.cookieSeparator);
          if (params.length > 0) {
            _self.id = params[0];
          }
        }
        if (!_self.id) {
          var theConfig = config || {};
          var getNewId = (theConfig.getNewId ? theConfig.getNewId() : null) || newId;
          _self.id = getNewId(theConfig.idLength ? config.idLength() : 22);
          var oneYear = 31536e3;
          var acqStr = toISOString(new Date());
          _self.accountAcquisitionDate = acqStr;
          _self.isNewUser = true;
          var newCookie = [_self.id, acqStr];
          _cookieManager.set(_storageNamePrefix(), newCookie.join(User2.cookieSeparator), oneYear);
          var name_1 = config.namePrefix && config.namePrefix() ? config.namePrefix() + "ai_session" : "ai_session";
          utlRemoveStorage(_logger, name_1);
        }
        _self.accountId = config.accountId ? config.accountId() : void 0;
        var authCookie = _cookieManager.get(User2.authUserCookieName);
        if (authCookie) {
          authCookie = decodeURI(authCookie);
          var authCookieString = authCookie.split(User2.cookieSeparator);
          if (authCookieString[0]) {
            _self.authenticatedId = authCookieString[0];
          }
          if (authCookieString.length > 1 && authCookieString[1]) {
            _self.accountId = authCookieString[1];
          }
        }
        _self.setAuthenticatedUserContext = function(authenticatedUserId, accountId, storeInCookie) {
          if (storeInCookie === void 0) {
            storeInCookie = false;
          }
          var isInvalidInput = !_validateUserInput(authenticatedUserId) || accountId && !_validateUserInput(accountId);
          if (isInvalidInput) {
            _logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.SetAuthContextFailedAccountName, "Setting auth user context failed. User auth/account id should be of type string, and not contain commas, semi-colons, equal signs, spaces, or vertical-bars.", true);
            return;
          }
          _self.authenticatedId = authenticatedUserId;
          var authCookie2 = _self.authenticatedId;
          if (accountId) {
            _self.accountId = accountId;
            authCookie2 = [_self.authenticatedId, _self.accountId].join(User2.cookieSeparator);
          }
          if (storeInCookie) {
            _cookieManager.set(User2.authUserCookieName, encodeURI(authCookie2));
          }
        };
        _self.clearAuthenticatedUserContext = function() {
          _self.authenticatedId = null;
          _self.accountId = null;
          _cookieManager.del(User2.authUserCookieName);
        };
      });
    }
    User2.cookieSeparator = "|";
    User2.userCookieName = "ai_user";
    User2.authUserCookieName = "ai_authUser";
    return User2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/Location.js
  var Location = function() {
    function Location2() {
    }
    return Location2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/Context/TelemetryTrace.js
  var TelemetryTrace = function() {
    function TelemetryTrace2(id, parentId, name, logger) {
      var _self = this;
      _self.traceID = id || generateW3CId();
      _self.parentID = parentId;
      _self.name = name;
      var location2 = getLocation();
      if (!name && location2 && location2.pathname) {
        _self.name = location2.pathname;
      }
      _self.name = dataSanitizeString(logger, _self.name);
    }
    return TelemetryTrace2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/TelemetryContext.js
  var strExt = "ext";
  var strTags = "tags";
  function _removeEmpty(target, name) {
    if (target && target[name] && objKeys(target[name]).length === 0) {
      delete target[name];
    }
  }
  var TelemetryContext = function() {
    function TelemetryContext2(core, defaultConfig) {
      var _this = this;
      var logger = core.logger;
      this.appId = function() {
        return null;
      };
      dynamicproto_js_default(TelemetryContext2, this, function(_self) {
        _self.application = new Application();
        _self.internal = new Internal(defaultConfig);
        if (hasWindow()) {
          _self.sessionManager = new _SessionManager(defaultConfig, core);
          _self.device = new Device();
          _self.location = new Location();
          _self.user = new User(defaultConfig, core);
          _self.telemetryTrace = new TelemetryTrace(void 0, void 0, void 0, logger);
          _self.session = new Session();
        }
        _self.applySessionContext = function(evt, itemCtx) {
          var session = _self.session;
          var sessionManager = _self.sessionManager;
          if (session && isString(session.id)) {
            setValue(getSetValue(evt.ext, Extensions.AppExt), "sesId", session.id);
          } else if (sessionManager && sessionManager.automaticSession) {
            setValue(getSetValue(evt.ext, Extensions.AppExt), "sesId", sessionManager.automaticSession.id, isString);
          }
        };
        _self.applyOperatingSystemContxt = function(evt, itemCtx) {
          setValue(evt.ext, Extensions.OSExt, _self.os);
        };
        _self.applyApplicationContext = function(evt, itemCtx) {
          var application = _self.application;
          if (application) {
            var tags = getSetValue(evt, strTags);
            setValue(tags, CtxTagKeys.applicationVersion, application.ver, isString);
            setValue(tags, CtxTagKeys.applicationBuild, application.build, isString);
          }
        };
        _self.applyDeviceContext = function(evt, itemCtx) {
          var device = _self.device;
          if (device) {
            var extDevice = getSetValue(getSetValue(evt, strExt), Extensions.DeviceExt);
            setValue(extDevice, "localId", device.id, isString);
            setValue(extDevice, "ip", device.ip, isString);
            setValue(extDevice, "model", device.model, isString);
            setValue(extDevice, "deviceClass", device.deviceClass, isString);
          }
        };
        _self.applyInternalContext = function(evt, itemCtx) {
          var internal = _self.internal;
          if (internal) {
            var tags = getSetValue(evt, strTags);
            setValue(tags, CtxTagKeys.internalAgentVersion, internal.agentVersion, isString);
            setValue(tags, CtxTagKeys.internalSdkVersion, internal.sdkVersion, isString);
            if (evt.baseType === _InternalLogMessage.dataType || evt.baseType === PageView.dataType) {
              setValue(tags, CtxTagKeys.internalSnippet, internal.snippetVer, isString);
              setValue(tags, CtxTagKeys.internalSdkSrc, internal.sdkSrc, isString);
            }
          }
        };
        _self.applyLocationContext = function(evt, itemCtx) {
          var location2 = _this.location;
          if (location2) {
            setValue(getSetValue(evt, strTags, []), CtxTagKeys.locationIp, location2.ip, isString);
          }
        };
        _self.applyOperationContext = function(evt, itemCtx) {
          var telemetryTrace = _self.telemetryTrace;
          if (telemetryTrace) {
            var extTrace = getSetValue(getSetValue(evt, strExt), Extensions.TraceExt, { traceID: void 0, parentID: void 0 });
            setValue(extTrace, "traceID", telemetryTrace.traceID, isString);
            setValue(extTrace, "name", telemetryTrace.name, isString);
            setValue(extTrace, "parentID", telemetryTrace.parentID, isString);
          }
        };
        _self.applyWebContext = function(evt, itemCtx) {
          var web = _this.web;
          if (web) {
            setValue(getSetValue(evt, strExt), Extensions.WebExt, web);
          }
        };
        _self.applyUserContext = function(evt, itemCtx) {
          var user = _self.user;
          if (user) {
            var tags = getSetValue(evt, strTags, []);
            setValue(tags, CtxTagKeys.userAccountId, user.accountId, isString);
            var extUser = getSetValue(getSetValue(evt, strExt), Extensions.UserExt);
            setValue(extUser, "id", user.id, isString);
            setValue(extUser, "authId", user.authenticatedId, isString);
          }
        };
        _self.cleanUp = function(evt, itemCtx) {
          var ext = evt.ext;
          if (ext) {
            _removeEmpty(ext, Extensions.DeviceExt);
            _removeEmpty(ext, Extensions.UserExt);
            _removeEmpty(ext, Extensions.WebExt);
            _removeEmpty(ext, Extensions.OSExt);
            _removeEmpty(ext, Extensions.AppExt);
            _removeEmpty(ext, Extensions.TraceExt);
          }
        };
      });
    }
    return TelemetryContext2;
  }();

  // node_modules/@microsoft/applicationinsights-properties-js/dist-esm/PropertiesPlugin.js
  var PropertiesPlugin = function(_super) {
    __extendsFn(PropertiesPlugin2, _super);
    function PropertiesPlugin2() {
      var _this = _super.call(this) || this;
      _this.priority = 110;
      _this.identifier = PropertiesPluginIdentifier;
      var _breezeChannel;
      var _extensionConfig;
      dynamicproto_js_default(PropertiesPlugin2, _this, function(_self, _base) {
        _self.initialize = function(config, core, extensions, pluginChain) {
          _base.initialize(config, core, extensions, pluginChain);
          var ctx = _self._getTelCtx();
          var identifier = _self.identifier;
          var defaultConfig = PropertiesPlugin2.getDefaultConfig();
          _extensionConfig = _extensionConfig || {};
          objForEachKey(defaultConfig, function(field, value) {
            _extensionConfig[field] = function() {
              return ctx.getConfig(identifier, field, value());
            };
          });
          _self.context = new TelemetryContext(core, _extensionConfig);
          _breezeChannel = getExtensionByName(extensions, BreezeChannelIdentifier);
          _self.context.appId = function() {
            return _breezeChannel ? _breezeChannel["_appId"] : null;
          };
          _self["_extConfig"] = _extensionConfig;
        };
        _self.processTelemetry = function(event, itemCtx) {
          if (isNullOrUndefined(event)) {
          } else {
            itemCtx = _self._getTelCtx(itemCtx);
            if (event.name === PageView.envelopeType) {
              itemCtx.diagLog().resetInternalMessageCount();
            }
            var theContext = _self.context || {};
            if (theContext.session) {
              if (typeof _self.context.session.id !== "string" && theContext.sessionManager) {
                theContext.sessionManager.update();
              }
            }
            _processTelemetryInternal(event, itemCtx);
            if (theContext.user && theContext.user.isNewUser) {
              theContext.user.isNewUser = false;
              var message = new _InternalLogMessage(_InternalMessageId.SendBrowserInfoOnUserInit, (getNavigator() || {}).userAgent || "");
              itemCtx.diagLog().logInternalMessage(LoggingSeverity.CRITICAL, message);
            }
            _self.processNext(event, itemCtx);
          }
        };
        function _processTelemetryInternal(evt, itemCtx) {
          getSetValue(evt, "tags", []);
          getSetValue(evt, "ext", {});
          var ctx = _self.context;
          ctx.applySessionContext(evt, itemCtx);
          ctx.applyApplicationContext(evt, itemCtx);
          ctx.applyDeviceContext(evt, itemCtx);
          ctx.applyOperationContext(evt, itemCtx);
          ctx.applyUserContext(evt, itemCtx);
          ctx.applyOperatingSystemContxt(evt, itemCtx);
          ctx.applyWebContext(evt, itemCtx);
          ctx.applyLocationContext(evt, itemCtx);
          ctx.applyInternalContext(evt, itemCtx);
          ctx.cleanUp(evt, itemCtx);
        }
      });
      return _this;
    }
    PropertiesPlugin2.getDefaultConfig = function() {
      var defaultConfig = {
        instrumentationKey: function() {
          return void 0;
        },
        accountId: function() {
          return null;
        },
        sessionRenewalMs: function() {
          return 30 * 60 * 1e3;
        },
        samplingPercentage: function() {
          return 100;
        },
        sessionExpirationMs: function() {
          return 24 * 60 * 60 * 1e3;
        },
        cookieDomain: function() {
          return null;
        },
        sdkExtension: function() {
          return null;
        },
        isBrowserLinkTrackingEnabled: function() {
          return false;
        },
        appId: function() {
          return null;
        },
        namePrefix: function() {
          return void 0;
        },
        sessionCookiePostfix: function() {
          return void 0;
        },
        userCookiePostfix: function() {
          return void 0;
        },
        idLength: function() {
          return 22;
        },
        getNewId: function() {
          return null;
        }
      };
      return defaultConfig;
    };
    return PropertiesPlugin2;
  }(BaseTelemetryPlugin);
  var PropertiesPlugin_default = PropertiesPlugin;

  // node_modules/@microsoft/applicationinsights-dependencies-js/dist-esm/ajaxRecord.js
  var strProperties2 = "properties";
  function _calcPerfDuration(resourceEntry, start, end) {
    var result = 0;
    var from = resourceEntry[start];
    var to = resourceEntry[end];
    if (from && to) {
      result = dateTimeUtilsDuration(from, to);
    }
    return result;
  }
  function _setPerfDuration(props, name, resourceEntry, start, end) {
    var result = 0;
    var value = _calcPerfDuration(resourceEntry, start, end);
    if (value) {
      result = _setPerfValue(props, name, msToTimeSpan(value));
    }
    return result;
  }
  function _setPerfValue(props, name, value) {
    var strPerf = "ajaxPerf";
    var result = 0;
    if (props && name && value) {
      var perfData = props[strPerf] = props[strPerf] || {};
      perfData[name] = value;
      result = 1;
    }
    return result;
  }
  function _populatePerfData(ajaxData, dependency) {
    var resourceEntry = ajaxData.perfTiming;
    var props = dependency[strProperties2] || {};
    var propsSet = 0;
    var strName = "name";
    var strStart = "Start";
    var strEnd = "End";
    var strDomainLookup = "domainLookup";
    var strConnect = "connect";
    var strRedirect = "redirect";
    var strRequest = "request";
    var strResponse = "response";
    var strDuration = "duration";
    var strStartTime = "startTime";
    var strDomainLookupStart = strDomainLookup + strStart;
    var strDomainLookupEnd = strDomainLookup + strEnd;
    var strConnectStart = strConnect + strStart;
    var strConnectEnd = strConnect + strEnd;
    var strRequestStart = strRequest + strStart;
    var strRequestEnd = strRequest + strEnd;
    var strResponseStart = strResponse + strStart;
    var strResponseEnd = strResponse + strEnd;
    var strRedirectStart = strRedirect + strStart;
    var strRedirectEnd = strRedirect = strEnd;
    var strTransferSize = "transferSize";
    var strEncodedBodySize = "encodedBodySize";
    var strDecodedBodySize = "decodedBodySize";
    var strServerTiming = "serverTiming";
    if (resourceEntry) {
      propsSet |= _setPerfDuration(props, strRedirect, resourceEntry, strRedirectStart, strRedirectEnd);
      propsSet |= _setPerfDuration(props, strDomainLookup, resourceEntry, strDomainLookupStart, strDomainLookupEnd);
      propsSet |= _setPerfDuration(props, strConnect, resourceEntry, strConnectStart, strConnectEnd);
      propsSet |= _setPerfDuration(props, strRequest, resourceEntry, strRequestStart, strRequestEnd);
      propsSet |= _setPerfDuration(props, strResponse, resourceEntry, strResponseStart, strResponseEnd);
      propsSet |= _setPerfDuration(props, "networkConnect", resourceEntry, strStartTime, strConnectEnd);
      propsSet |= _setPerfDuration(props, "sentRequest", resourceEntry, strRequestStart, strResponseEnd);
      var duration = resourceEntry[strDuration];
      if (!duration) {
        duration = _calcPerfDuration(resourceEntry, strStartTime, strResponseEnd) || 0;
      }
      propsSet |= _setPerfValue(props, strDuration, duration);
      propsSet |= _setPerfValue(props, "perfTotal", duration);
      var serverTiming = resourceEntry[strServerTiming];
      if (serverTiming) {
        var server_1 = {};
        arrForEach(serverTiming, function(value, idx) {
          var name = normalizeJsName(value[strName] || "" + idx);
          var newValue = server_1[name] || {};
          objForEachKey(value, function(key, val) {
            if (key !== strName && isString(val) || isNumber(val)) {
              if (newValue[key]) {
                val = newValue[key] + ";" + val;
              }
              if (val || !isString(val)) {
                newValue[key] = val;
              }
            }
          });
          server_1[name] = newValue;
        });
        propsSet |= _setPerfValue(props, strServerTiming, server_1);
      }
      propsSet |= _setPerfValue(props, strTransferSize, resourceEntry[strTransferSize]);
      propsSet |= _setPerfValue(props, strEncodedBodySize, resourceEntry[strEncodedBodySize]);
      propsSet |= _setPerfValue(props, strDecodedBodySize, resourceEntry[strDecodedBodySize]);
    } else {
      if (ajaxData.perfMark) {
        propsSet |= _setPerfValue(props, "missing", ajaxData.perfAttempts);
      }
    }
    if (propsSet) {
      dependency[strProperties2] = props;
    }
  }
  var XHRMonitoringState = function() {
    function XHRMonitoringState2() {
      var self2 = this;
      self2.openDone = false;
      self2.setRequestHeaderDone = false;
      self2.sendDone = false;
      self2.abortDone = false;
      self2.stateChangeAttached = false;
    }
    return XHRMonitoringState2;
  }();
  var ajaxRecord = function() {
    function ajaxRecord2(traceID, spanID, logger) {
      var self2 = this;
      var _logger = logger;
      var strResponseText = "responseText";
      self2.perfMark = null;
      self2.completed = false;
      self2.requestHeadersSize = null;
      self2.requestHeaders = null;
      self2.responseReceivingDuration = null;
      self2.callbackDuration = null;
      self2.ajaxTotalDuration = null;
      self2.aborted = 0;
      self2.pageUrl = null;
      self2.requestUrl = null;
      self2.requestSize = 0;
      self2.method = null;
      self2.status = null;
      self2.requestSentTime = null;
      self2.responseStartedTime = null;
      self2.responseFinishedTime = null;
      self2.callbackFinishedTime = null;
      self2.endTime = null;
      self2.xhrMonitoringState = new XHRMonitoringState();
      self2.clientFailure = 0;
      self2.traceID = traceID;
      self2.spanID = spanID;
      dynamicproto_js_default(ajaxRecord2, self2, function(self3) {
        self3.getAbsoluteUrl = function() {
          return self3.requestUrl ? urlGetAbsoluteUrl(self3.requestUrl) : null;
        };
        self3.getPathName = function() {
          return self3.requestUrl ? dataSanitizeUrl(_logger, urlGetCompleteUrl(self3.method, self3.requestUrl)) : null;
        };
        self3.CreateTrackItem = function(ajaxType, enableRequestHeaderTracking, getResponse) {
          self3.ajaxTotalDuration = Math.round(dateTimeUtilsDuration(self3.requestSentTime, self3.responseFinishedTime) * 1e3) / 1e3;
          if (self3.ajaxTotalDuration < 0) {
            return null;
          }
          var dependency = (_a = {
            id: "|" + self3.traceID + "." + self3.spanID,
            target: self3.getAbsoluteUrl(),
            name: self3.getPathName(),
            type: ajaxType,
            startTime: null,
            duration: self3.ajaxTotalDuration,
            success: +self3.status >= 200 && +self3.status < 400,
            responseCode: +self3.status,
            method: self3.method
          }, _a[strProperties2] = { HttpMethod: self3.method }, _a);
          if (self3.requestSentTime) {
            dependency.startTime = new Date();
            dependency.startTime.setTime(self3.requestSentTime);
          }
          _populatePerfData(self3, dependency);
          if (enableRequestHeaderTracking) {
            if (objKeys(self3.requestHeaders).length > 0) {
              dependency[strProperties2] = dependency[strProperties2] || {};
              dependency[strProperties2].requestHeaders = self3.requestHeaders;
            }
          }
          if (getResponse) {
            var response = getResponse();
            if (response) {
              var correlationContext = response.correlationContext;
              if (correlationContext) {
                dependency.correlationContext = correlationContext;
              }
              if (response.headerMap) {
                if (objKeys(response.headerMap).length > 0) {
                  dependency[strProperties2] = dependency[strProperties2] || {};
                  dependency[strProperties2].responseHeaders = response.headerMap;
                }
              }
              if (self3.status >= 400) {
                var responseType = response.type;
                dependency[strProperties2] = dependency[strProperties2] || {};
                if (responseType === "" || responseType === "text") {
                  dependency[strProperties2][strResponseText] = response[strResponseText] ? response.statusText + " - " + response[strResponseText] : response.statusText;
                }
                if (responseType === "json") {
                  dependency[strProperties2][strResponseText] = response.response ? response.statusText + " - " + JSON.stringify(response.response) : response.statusText;
                }
              }
            }
          }
          return dependency;
          var _a;
        };
      });
    }
    return ajaxRecord2;
  }();

  // node_modules/@microsoft/applicationinsights-dependencies-js/dist-esm/ajaxUtils.js
  var stringUtils = function() {
    function stringUtils2() {
    }
    stringUtils2.GetLength = function(strObject) {
      var res = 0;
      if (!isNullOrUndefined(strObject)) {
        var stringified = "";
        try {
          stringified = strObject.toString();
        } catch (ex) {
        }
        res = stringified.length;
        res = isNaN(res) ? 0 : res;
      }
      return res;
    };
    return stringUtils2;
  }();

  // node_modules/@microsoft/applicationinsights-dependencies-js/dist-esm/TraceParent.js
  var Traceparent = function() {
    function Traceparent2(traceId, spanId) {
      var self2 = this;
      self2.traceFlag = Traceparent2.DEFAULT_TRACE_FLAG;
      self2.version = Traceparent2.DEFAULT_VERSION;
      if (traceId && Traceparent2.isValidTraceId(traceId)) {
        self2.traceId = traceId;
      } else {
        self2.traceId = generateW3CId();
      }
      if (spanId && Traceparent2.isValidSpanId(spanId)) {
        self2.spanId = spanId;
      } else {
        self2.spanId = generateW3CId().substr(0, 16);
      }
    }
    Traceparent2.isValidTraceId = function(id) {
      return id.match(/^[0-9a-f]{32}$/) && id !== "00000000000000000000000000000000";
    };
    Traceparent2.isValidSpanId = function(id) {
      return id.match(/^[0-9a-f]{16}$/) && id !== "0000000000000000";
    };
    Traceparent2.prototype.toString = function() {
      var self2 = this;
      return self2.version + "-" + self2.traceId + "-" + self2.spanId + "-" + self2.traceFlag;
    };
    Traceparent2.DEFAULT_TRACE_FLAG = "01";
    Traceparent2.DEFAULT_VERSION = "00";
    return Traceparent2;
  }();

  // node_modules/@microsoft/applicationinsights-dependencies-js/dist-esm/ajax.js
  var AJAX_MONITOR_PREFIX = "ai.ajxmn.";
  var strDiagLog = "diagLog";
  var strAjaxData = "ajaxData";
  var strThrowInternal = "throwInternal";
  var strFetch = "fetch";
  var _markCount = 0;
  function _supportsFetch() {
    var _global = getGlobal();
    if (!_global || isNullOrUndefined(_global.Request) || isNullOrUndefined(_global.Request[strShimPrototype]) || isNullOrUndefined(_global[strFetch])) {
      return null;
    }
    return _global[strFetch];
  }
  function _supportsAjaxMonitoring(ajaxMonitorInstance) {
    var result = false;
    if (typeof XMLHttpRequest !== strShimUndefined && !isNullOrUndefined(XMLHttpRequest)) {
      var proto = XMLHttpRequest[strShimPrototype];
      result = !isNullOrUndefined(proto) && !isNullOrUndefined(proto.open) && !isNullOrUndefined(proto.send) && !isNullOrUndefined(proto.abort);
    }
    var ieVer = getIEVersion();
    if (ieVer && ieVer < 9) {
      result = false;
    }
    if (result) {
      try {
        var xhr = new XMLHttpRequest();
        xhr[strAjaxData] = {};
        var theOpen = XMLHttpRequest[strShimPrototype].open;
        XMLHttpRequest[strShimPrototype].open = theOpen;
      } catch (e) {
        result = false;
        _throwInternalCritical(ajaxMonitorInstance, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to enable XMLHttpRequest monitoring, extension is not supported", {
          exception: dumpObj(e)
        });
      }
    }
    return result;
  }
  function _getFailedAjaxDiagnosticsMessage(xhr) {
    var result = "";
    try {
      if (!isNullOrUndefined(xhr) && !isNullOrUndefined(xhr[strAjaxData]) && !isNullOrUndefined(xhr[strAjaxData].requestUrl)) {
        result += "(url: '" + xhr[strAjaxData].requestUrl + "')";
      }
    } catch (e) {
    }
    return result;
  }
  function _throwInternalCritical(ajaxMonitorInstance, msgId, message, properties, isUserAct) {
    ajaxMonitorInstance[strDiagLog]()[strThrowInternal](LoggingSeverity.CRITICAL, msgId, message, properties, isUserAct);
  }
  function _throwInternalWarning(ajaxMonitorInstance, msgId, message, properties, isUserAct) {
    ajaxMonitorInstance[strDiagLog]()[strThrowInternal](LoggingSeverity.WARNING, msgId, message, properties, isUserAct);
  }
  function _createErrorCallbackFunc(ajaxMonitorInstance, internalMessage, message) {
    return function(args) {
      _throwInternalCritical(ajaxMonitorInstance, internalMessage, message, {
        ajaxDiagnosticsMessage: _getFailedAjaxDiagnosticsMessage(args.inst),
        exception: dumpObj(args.err)
      });
    };
  }
  function _indexOf(value, match) {
    if (value && match) {
      return value.indexOf(match);
    }
    return -1;
  }
  var AjaxMonitor = function(_super) {
    __extendsFn(AjaxMonitor2, _super);
    function AjaxMonitor2() {
      var _this = _super.call(this) || this;
      _this.identifier = AjaxMonitor2.identifier;
      _this.priority = 120;
      var strTrackDependencyDataInternal = "trackDependencyDataInternal";
      var location2 = getLocation();
      var _fetchInitialized = false;
      var _xhrInitialized = false;
      var _currentWindowHost = location2 && location2.host && location2.host.toLowerCase();
      var _config = AjaxMonitor2.getEmptyConfig();
      var _enableRequestHeaderTracking = false;
      var _trackAjaxAttempts = 0;
      var _context;
      var _isUsingW3CHeaders;
      var _isUsingAIHeaders;
      var _markPrefix;
      var _enableAjaxPerfTracking = false;
      var _maxAjaxCallsPerView = 0;
      var _enableResponseHeaderTracking = false;
      var _hooks = [];
      var _disabledUrls = {};
      var _excludeRequestFromAutoTrackingPatterns;
      dynamicproto_js_default(AjaxMonitor2, _this, function(_self, base) {
        _self.initialize = function(config, core, extensions, pluginChain) {
          if (!_self.isInitialized()) {
            base.initialize(config, core, extensions, pluginChain);
            var ctx_1 = _self._getTelCtx();
            var defaultConfig = AjaxMonitor2.getDefaultConfig();
            objForEachKey(defaultConfig, function(field, value) {
              _config[field] = ctx_1.getConfig(AjaxMonitor2.identifier, field, value);
            });
            var distributedTracingMode = _config.distributedTracingMode;
            _enableRequestHeaderTracking = _config.enableRequestHeaderTracking;
            _enableAjaxPerfTracking = _config.enableAjaxPerfTracking;
            _maxAjaxCallsPerView = _config.maxAjaxCallsPerView;
            _enableResponseHeaderTracking = _config.enableResponseHeaderTracking;
            _excludeRequestFromAutoTrackingPatterns = _config.excludeRequestFromAutoTrackingPatterns;
            _isUsingAIHeaders = distributedTracingMode === DistributedTracingModes.AI || distributedTracingMode === DistributedTracingModes.AI_AND_W3C;
            _isUsingW3CHeaders = distributedTracingMode === DistributedTracingModes.AI_AND_W3C || distributedTracingMode === DistributedTracingModes.W3C;
            if (_enableAjaxPerfTracking) {
              var iKey = config.instrumentationKey || "unkwn";
              if (iKey.length > 5) {
                _markPrefix = AJAX_MONITOR_PREFIX + iKey.substring(iKey.length - 5) + ".";
              } else {
                _markPrefix = AJAX_MONITOR_PREFIX + iKey + ".";
              }
            }
            if (_config.disableAjaxTracking === false) {
              _instrumentXhr();
            }
            _instrumentFetch();
            if (extensions.length > 0 && extensions) {
              var propExt = void 0, extIx = 0;
              while (!propExt && extIx < extensions.length) {
                if (extensions[extIx] && extensions[extIx].identifier === PropertiesPluginIdentifier) {
                  propExt = extensions[extIx];
                }
                extIx++;
              }
              if (propExt) {
                _context = propExt.context;
              }
            }
          }
        };
        _self.teardown = function() {
          arrForEach(_hooks, function(fn) {
            fn.rm();
          });
          _hooks = [];
          _fetchInitialized = false;
          _xhrInitialized = false;
          _self.setInitialized(false);
        };
        _self.trackDependencyData = function(dependency, properties) {
          _self[strTrackDependencyDataInternal](dependency, properties);
        };
        _self.includeCorrelationHeaders = function(ajaxData, input, init, xhr) {
          var currentWindowHost = _self["_currentWindowHost"] || _currentWindowHost;
          if (input) {
            if (CorrelationIdHelper.canIncludeCorrelationHeader(_config, ajaxData.getAbsoluteUrl(), currentWindowHost)) {
              if (!init) {
                init = {};
              }
              init.headers = new Headers(init.headers || (input instanceof Request ? input.headers || {} : {}));
              if (_isUsingAIHeaders) {
                var id = "|" + ajaxData.traceID + "." + ajaxData.spanID;
                init.headers.set(RequestHeaders.requestIdHeader, id);
                if (_enableRequestHeaderTracking) {
                  ajaxData.requestHeaders[RequestHeaders.requestIdHeader] = id;
                }
              }
              var appId = _config.appId || _context && _context.appId();
              if (appId) {
                init.headers.set(RequestHeaders.requestContextHeader, RequestHeaders.requestContextAppIdFormat + appId);
                if (_enableRequestHeaderTracking) {
                  ajaxData.requestHeaders[RequestHeaders.requestContextHeader] = RequestHeaders.requestContextAppIdFormat + appId;
                }
              }
              if (_isUsingW3CHeaders) {
                var traceparent = new Traceparent(ajaxData.traceID, ajaxData.spanID);
                init.headers.set(RequestHeaders.traceParentHeader, traceparent.toString());
                if (_enableRequestHeaderTracking) {
                  ajaxData.requestHeaders[RequestHeaders.traceParentHeader] = traceparent.toString();
                }
              }
            }
            return init;
          } else if (xhr) {
            if (CorrelationIdHelper.canIncludeCorrelationHeader(_config, ajaxData.getAbsoluteUrl(), currentWindowHost)) {
              if (_isUsingAIHeaders) {
                var id = "|" + ajaxData.traceID + "." + ajaxData.spanID;
                xhr.setRequestHeader(RequestHeaders.requestIdHeader, id);
                if (_enableRequestHeaderTracking) {
                  ajaxData.requestHeaders[RequestHeaders.requestIdHeader] = id;
                }
              }
              var appId = _config.appId || _context && _context.appId();
              if (appId) {
                xhr.setRequestHeader(RequestHeaders.requestContextHeader, RequestHeaders.requestContextAppIdFormat + appId);
                if (_enableRequestHeaderTracking) {
                  ajaxData.requestHeaders[RequestHeaders.requestContextHeader] = RequestHeaders.requestContextAppIdFormat + appId;
                }
              }
              if (_isUsingW3CHeaders) {
                var traceparent = new Traceparent(ajaxData.traceID, ajaxData.spanID);
                xhr.setRequestHeader(RequestHeaders.traceParentHeader, traceparent.toString());
                if (_enableRequestHeaderTracking) {
                  ajaxData.requestHeaders[RequestHeaders.traceParentHeader] = traceparent.toString();
                }
              }
            }
            return xhr;
          }
          return void 0;
        };
        _self[strTrackDependencyDataInternal] = function(dependency, properties, systemProperties) {
          if (_maxAjaxCallsPerView === -1 || _trackAjaxAttempts < _maxAjaxCallsPerView) {
            if ((_config.distributedTracingMode === DistributedTracingModes.W3C || _config.distributedTracingMode === DistributedTracingModes.AI_AND_W3C) && typeof dependency.id === "string" && dependency.id[dependency.id.length - 1] !== ".") {
              dependency.id += ".";
            }
            if (isNullOrUndefined(dependency.startTime)) {
              dependency.startTime = new Date();
            }
            var item = TelemetryItemCreator.create(dependency, RemoteDependencyData2.dataType, RemoteDependencyData2.envelopeType, _self[strDiagLog](), properties, systemProperties);
            _self.core.track(item);
          } else if (_trackAjaxAttempts === _maxAjaxCallsPerView) {
            _throwInternalCritical(_self, _InternalMessageId.MaxAjaxPerPVExceeded, "Maximum ajax per page view limit reached, ajax monitoring is paused until the next trackPageView(). In order to increase the limit set the maxAjaxCallsPerView configuration parameter.", true);
          }
          ++_trackAjaxAttempts;
        };
        function _canIncludeHeaders(header) {
          var rlt = true;
          if (header || _config.ignoreHeaders) {
            arrForEach(_config.ignoreHeaders, function(key) {
              if (key.toLowerCase() === header.toLowerCase()) {
                rlt = false;
                return -1;
              }
            });
          }
          return rlt;
        }
        function _instrumentFetch() {
          var fetch2 = _supportsFetch();
          if (!fetch2) {
            return;
          }
          var global2 = getGlobal();
          var isPolyfill = fetch2.polyfill;
          if (_config.disableFetchTracking === false) {
            _hooks.push(InstrumentFunc(global2, strFetch, {
              req: function(callDetails, input, init) {
                var fetchData;
                if (_fetchInitialized && !_isDisabledRequest(null, input, init) && !(isPolyfill && _xhrInitialized)) {
                  var ctx = callDetails.ctx();
                  fetchData = _createFetchRecord(input, init);
                  var newInit = _self.includeCorrelationHeaders(fetchData, input, init);
                  if (newInit !== init) {
                    callDetails.set(1, newInit);
                  }
                  ctx.data = fetchData;
                }
              },
              rsp: function(callDetails, input) {
                var fetchData = callDetails.ctx().data;
                if (fetchData) {
                  callDetails.rslt = callDetails.rslt.then(function(response) {
                    _reportFetchMetrics(callDetails, (response || {}).status, response, fetchData, function() {
                      var ajaxResponse = {
                        statusText: response.statusText,
                        headerMap: null,
                        correlationContext: _getFetchCorrelationContext(response)
                      };
                      if (_enableResponseHeaderTracking) {
                        var responseHeaderMap_1 = {};
                        response.headers.forEach(function(value, name) {
                          if (_canIncludeHeaders(name)) {
                            responseHeaderMap_1[name] = value;
                          }
                        });
                        ajaxResponse.headerMap = responseHeaderMap_1;
                      }
                      return ajaxResponse;
                    });
                    return response;
                  })["catch"](function(reason) {
                    _reportFetchMetrics(callDetails, 0, input, fetchData, null, { error: reason.message });
                    throw reason;
                  });
                }
              },
              hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to monitor Window.fetch, monitoring data for this fetch call may be incorrect.")
            }));
            _fetchInitialized = true;
          } else if (isPolyfill) {
            _hooks.push(InstrumentFunc(global2, strFetch, {
              req: function(callDetails, input, init) {
                _isDisabledRequest(null, input, init);
              }
            }));
          }
          if (isPolyfill) {
            global2[strFetch].polyfill = isPolyfill;
          }
        }
        function _hookProto(target, funcName, callbacks) {
          _hooks.push(InstrumentProto(target, funcName, callbacks));
        }
        function _instrumentXhr() {
          if (_supportsAjaxMonitoring(_self) && !_xhrInitialized) {
            _hookProto(XMLHttpRequest, "open", {
              req: function(args, method, url, async) {
                var xhr = args.inst;
                var ajaxData = xhr[strAjaxData];
                if (!_isDisabledRequest(xhr, url) && _isMonitoredXhrInstance(xhr, true) && (!ajaxData || !ajaxData.xhrMonitoringState.openDone)) {
                  _openHandler(xhr, method, url, async);
                }
              },
              hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to monitor XMLHttpRequest.open, monitoring data for this ajax call may be incorrect.")
            });
            _hookProto(XMLHttpRequest, "send", {
              req: function(args, context) {
                var xhr = args.inst;
                var ajaxData = xhr[strAjaxData];
                if (_isMonitoredXhrInstance(xhr) && !ajaxData.xhrMonitoringState.sendDone) {
                  _createMarkId("xhr", ajaxData);
                  ajaxData.requestSentTime = dateTimeUtilsNow();
                  _self.includeCorrelationHeaders(ajaxData, void 0, void 0, xhr);
                  ajaxData.xhrMonitoringState.sendDone = true;
                }
              },
              hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxSend, "Failed to monitor XMLHttpRequest, monitoring data for this ajax call may be incorrect.")
            });
            _hookProto(XMLHttpRequest, "abort", {
              req: function(args) {
                var xhr = args.inst;
                var ajaxData = xhr[strAjaxData];
                if (_isMonitoredXhrInstance(xhr) && !ajaxData.xhrMonitoringState.abortDone) {
                  ajaxData.aborted = 1;
                  ajaxData.xhrMonitoringState.abortDone = true;
                }
              },
              hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxAbort, "Failed to monitor XMLHttpRequest.abort, monitoring data for this ajax call may be incorrect.")
            });
            if (_enableRequestHeaderTracking) {
              _hookProto(XMLHttpRequest, "setRequestHeader", {
                req: function(args, header, value) {
                  var xhr = args.inst;
                  if (_isMonitoredXhrInstance(xhr) && _canIncludeHeaders(header)) {
                    xhr[strAjaxData].requestHeaders[header] = value;
                  }
                },
                hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxSetRequestHeader, "Failed to monitor XMLHttpRequest.setRequestHeader, monitoring data for this ajax call may be incorrect.")
              });
            }
            _xhrInitialized = true;
          }
        }
        function _isDisabledRequest(xhr, request, init) {
          var isDisabled = false;
          var theUrl = ((!isString(request) ? (request || {}).url || "" : request) || "").toLowerCase();
          arrForEach(_excludeRequestFromAutoTrackingPatterns, function(regex) {
            var theRegex = regex;
            if (isString(regex)) {
              theRegex = new RegExp(regex);
            }
            if (!isDisabled) {
              isDisabled = theRegex.test(theUrl);
            }
          });
          if (isDisabled) {
            return isDisabled;
          }
          var idx = _indexOf(theUrl, "?");
          var idx2 = _indexOf(theUrl, "#");
          if (idx === -1 || idx2 !== -1 && idx2 < idx) {
            idx = idx2;
          }
          if (idx !== -1) {
            theUrl = theUrl.substring(0, idx);
          }
          if (!isNullOrUndefined(xhr)) {
            isDisabled = xhr[DisabledPropertyName] === true || theUrl[DisabledPropertyName] === true;
          } else if (!isNullOrUndefined(request)) {
            isDisabled = (typeof request === "object" ? request[DisabledPropertyName] === true : false) || (init ? init[DisabledPropertyName] === true : false);
          }
          if (isDisabled) {
            if (!_disabledUrls[theUrl]) {
              _disabledUrls[theUrl] = 1;
            }
          } else {
            if (_disabledUrls[theUrl]) {
              isDisabled = true;
            }
          }
          return isDisabled;
        }
        function _isMonitoredXhrInstance(xhr, excludeAjaxDataValidation) {
          var ajaxValidation = true;
          var initialized = _xhrInitialized;
          if (!isNullOrUndefined(xhr)) {
            ajaxValidation = excludeAjaxDataValidation === true || !isNullOrUndefined(xhr[strAjaxData]);
          }
          return initialized && ajaxValidation;
        }
        function _openHandler(xhr, method, url, async) {
          var traceID = _context && _context.telemetryTrace && _context.telemetryTrace.traceID || generateW3CId();
          var spanID = generateW3CId().substr(0, 16);
          var ajaxData = new ajaxRecord(traceID, spanID, _self[strDiagLog]());
          ajaxData.method = method;
          ajaxData.requestUrl = url;
          ajaxData.xhrMonitoringState.openDone = true;
          ajaxData.requestHeaders = {};
          ajaxData.async = async;
          xhr[strAjaxData] = ajaxData;
          _attachToOnReadyStateChange(xhr);
        }
        function _attachToOnReadyStateChange(xhr) {
          xhr[strAjaxData].xhrMonitoringState.stateChangeAttached = EventHelper.Attach(xhr, "readystatechange", function() {
            try {
              if (xhr && xhr.readyState === 4 && _isMonitoredXhrInstance(xhr)) {
                _onAjaxComplete(xhr);
              }
            } catch (e) {
              var exceptionText = dumpObj(e);
              if (!exceptionText || _indexOf(exceptionText.toLowerCase(), "c00c023f") === -1) {
                _throwInternalCritical(_self, _InternalMessageId.FailedMonitorAjaxRSC, "Failed to monitor XMLHttpRequest 'readystatechange' event handler, monitoring data for this ajax call may be incorrect.", {
                  ajaxDiagnosticsMessage: _getFailedAjaxDiagnosticsMessage(xhr),
                  exception: exceptionText
                });
              }
            }
          });
        }
        function _getResponseText2(xhr) {
          try {
            var responseType = xhr.responseType;
            if (responseType === "" || responseType === "text") {
              return xhr.responseText;
            }
          } catch (e) {
          }
          return null;
        }
        function _onAjaxComplete(xhr) {
          var ajaxData = xhr[strAjaxData];
          ajaxData.responseFinishedTime = dateTimeUtilsNow();
          ajaxData.status = xhr.status;
          function _reportXhrError(e, failedProps) {
            var errorProps = failedProps || {};
            errorProps["ajaxDiagnosticsMessage"] = _getFailedAjaxDiagnosticsMessage(xhr);
            if (e) {
              errorProps["exception"] = dumpObj(e);
            }
            _throwInternalWarning(_self, _InternalMessageId.FailedMonitorAjaxDur, "Failed to calculate the duration of the ajax call, monitoring data for this ajax call won't be sent.", errorProps);
          }
          _findPerfResourceEntry("xmlhttprequest", ajaxData, function() {
            try {
              var dependency = ajaxData.CreateTrackItem("Ajax", _enableRequestHeaderTracking, function() {
                var ajaxResponse = {
                  statusText: xhr.statusText,
                  headerMap: null,
                  correlationContext: _getAjaxCorrelationContext(xhr),
                  type: xhr.responseType,
                  responseText: _getResponseText2(xhr),
                  response: xhr.response
                };
                if (_enableResponseHeaderTracking) {
                  var headers = xhr.getAllResponseHeaders();
                  if (headers) {
                    var arr = strTrim(headers).split(/[\r\n]+/);
                    var responseHeaderMap_2 = {};
                    arrForEach(arr, function(line) {
                      var parts = line.split(": ");
                      var header = parts.shift();
                      var value = parts.join(": ");
                      if (_canIncludeHeaders(header)) {
                        responseHeaderMap_2[header] = value;
                      }
                    });
                    ajaxResponse.headerMap = responseHeaderMap_2;
                  }
                }
                return ajaxResponse;
              });
              if (dependency) {
                _self[strTrackDependencyDataInternal](dependency);
              } else {
                _reportXhrError(null, {
                  requestSentTime: ajaxData.requestSentTime,
                  responseFinishedTime: ajaxData.responseFinishedTime
                });
              }
            } finally {
              try {
                xhr[strAjaxData] = null;
              } catch (e) {
              }
            }
          }, function(e) {
            _reportXhrError(e, null);
          });
        }
        function _getAjaxCorrelationContext(xhr) {
          try {
            var responseHeadersString = xhr.getAllResponseHeaders();
            if (responseHeadersString !== null) {
              var index = _indexOf(responseHeadersString.toLowerCase(), RequestHeaders.requestContextHeaderLowerCase);
              if (index !== -1) {
                var responseHeader = xhr.getResponseHeader(RequestHeaders.requestContextHeader);
                return CorrelationIdHelper.getCorrelationContext(responseHeader);
              }
            }
          } catch (e) {
            _throwInternalWarning(_self, _InternalMessageId.FailedMonitorAjaxGetCorrelationHeader, "Failed to get Request-Context correlation header as it may be not included in the response or not accessible.", {
              ajaxDiagnosticsMessage: _getFailedAjaxDiagnosticsMessage(xhr),
              exception: dumpObj(e)
            });
          }
        }
        function _createMarkId(type, ajaxData) {
          if (ajaxData.requestUrl && _markPrefix && _enableAjaxPerfTracking) {
            var performance_1 = getPerformance();
            if (performance_1 && isFunction(performance_1.mark)) {
              _markCount++;
              var markId = _markPrefix + type + "#" + _markCount;
              performance_1.mark(markId);
              var entries = performance_1.getEntriesByName(markId);
              if (entries && entries.length === 1) {
                ajaxData.perfMark = entries[0];
              }
            }
          }
        }
        function _findPerfResourceEntry(initiatorType, ajaxData, trackCallback, reportError) {
          var perfMark = ajaxData.perfMark;
          var performance = getPerformance();
          var maxAttempts = _config.maxAjaxPerfLookupAttempts;
          var retryDelay = _config.ajaxPerfLookupDelay;
          var requestUrl = ajaxData.requestUrl;
          var attempt = 0;
          (function locateResourceTiming() {
            try {
              if (performance && perfMark) {
                attempt++;
                var perfTiming = null;
                var entries = performance.getEntries();
                for (var lp = entries.length - 1; lp >= 0; lp--) {
                  var entry = entries[lp];
                  if (entry) {
                    if (entry.entryType === "resource") {
                      if (entry.initiatorType === initiatorType && (_indexOf(entry.name, requestUrl) !== -1 || _indexOf(requestUrl, entry.name) !== -1)) {
                        perfTiming = entry;
                      }
                    } else if (entry.entryType === "mark" && entry.name === perfMark.name) {
                      ajaxData.perfTiming = perfTiming;
                      break;
                    }
                    if (entry.startTime < perfMark.startTime - 1e3) {
                      break;
                    }
                  }
                }
              }
              if (!perfMark || ajaxData.perfTiming || attempt >= maxAttempts || ajaxData.async === false) {
                if (perfMark && isFunction(performance.clearMarks)) {
                  performance.clearMarks(perfMark.name);
                }
                ajaxData.perfAttempts = attempt;
                trackCallback();
              } else {
                setTimeout(locateResourceTiming, retryDelay);
              }
            } catch (e) {
              reportError(e);
            }
          })();
        }
        function _createFetchRecord(input, init) {
          var traceID = _context && _context.telemetryTrace && _context.telemetryTrace.traceID || generateW3CId();
          var spanID = generateW3CId().substr(0, 16);
          var ajaxData = new ajaxRecord(traceID, spanID, _self[strDiagLog]());
          ajaxData.requestSentTime = dateTimeUtilsNow();
          if (input instanceof Request) {
            ajaxData.requestUrl = input ? input.url : "";
          } else {
            ajaxData.requestUrl = input;
          }
          var method = "GET";
          if (init && init.method) {
            method = init.method;
          } else if (input && input instanceof Request) {
            method = input.method;
          }
          ajaxData.method = method;
          var requestHeaders = {};
          if (_enableRequestHeaderTracking) {
            var headers = new Headers((init ? init.headers : 0) || (input instanceof Request ? input.headers || {} : {}));
            headers.forEach(function(value, key) {
              if (_canIncludeHeaders(key)) {
                requestHeaders[key] = value;
              }
            });
          }
          ajaxData.requestHeaders = requestHeaders;
          _createMarkId("fetch", ajaxData);
          return ajaxData;
        }
        function _getFailedFetchDiagnosticsMessage(input) {
          var result = "";
          try {
            if (!isNullOrUndefined(input)) {
              if (typeof input === "string") {
                result += "(url: '" + input + "')";
              } else {
                result += "(url: '" + input.url + "')";
              }
            }
          } catch (e) {
            _throwInternalCritical(_self, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to grab failed fetch diagnostics message", { exception: dumpObj(e) });
          }
          return result;
        }
        function _reportFetchMetrics(callDetails, status, input, ajaxData, getResponse, properties) {
          if (!ajaxData) {
            return;
          }
          function _reportFetchError(msgId, e, failedProps) {
            var errorProps = failedProps || {};
            errorProps["fetchDiagnosticsMessage"] = _getFailedFetchDiagnosticsMessage(input);
            if (e) {
              errorProps["exception"] = dumpObj(e);
            }
            _throwInternalWarning(_self, msgId, "Failed to calculate the duration of the fetch call, monitoring data for this fetch call won't be sent.", errorProps);
          }
          ajaxData.responseFinishedTime = dateTimeUtilsNow();
          ajaxData.status = status;
          _findPerfResourceEntry("fetch", ajaxData, function() {
            var dependency = ajaxData.CreateTrackItem("Fetch", _enableRequestHeaderTracking, getResponse);
            if (dependency) {
              _self[strTrackDependencyDataInternal](dependency);
            } else {
              _reportFetchError(_InternalMessageId.FailedMonitorAjaxDur, null, {
                requestSentTime: ajaxData.requestSentTime,
                responseFinishedTime: ajaxData.responseFinishedTime
              });
            }
          }, function(e) {
            _reportFetchError(_InternalMessageId.FailedMonitorAjaxGetCorrelationHeader, e, null);
          });
        }
        function _getFetchCorrelationContext(response) {
          if (response && response.headers) {
            try {
              var responseHeader = response.headers.get(RequestHeaders.requestContextHeader);
              return CorrelationIdHelper.getCorrelationContext(responseHeader);
            } catch (e) {
              _throwInternalWarning(_self, _InternalMessageId.FailedMonitorAjaxGetCorrelationHeader, "Failed to get Request-Context correlation header as it may be not included in the response or not accessible.", {
                fetchDiagnosticsMessage: _getFailedFetchDiagnosticsMessage(response),
                exception: dumpObj(e)
              });
            }
          }
        }
      });
      return _this;
    }
    AjaxMonitor2.getDefaultConfig = function() {
      var config = {
        maxAjaxCallsPerView: 500,
        disableAjaxTracking: false,
        disableFetchTracking: true,
        excludeRequestFromAutoTrackingPatterns: void 0,
        disableCorrelationHeaders: false,
        distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
        correlationHeaderExcludedDomains: [
          "*.blob.core.windows.net",
          "*.blob.core.chinacloudapi.cn",
          "*.blob.core.cloudapi.de",
          "*.blob.core.usgovcloudapi.net"
        ],
        correlationHeaderDomains: void 0,
        correlationHeaderExcludePatterns: void 0,
        appId: void 0,
        enableCorsCorrelation: false,
        enableRequestHeaderTracking: false,
        enableResponseHeaderTracking: false,
        enableAjaxErrorStatusText: false,
        enableAjaxPerfTracking: false,
        maxAjaxPerfLookupAttempts: 3,
        ajaxPerfLookupDelay: 25,
        ignoreHeaders: [
          "Authorization",
          "X-API-Key",
          "WWW-Authenticate"
        ]
      };
      return config;
    };
    AjaxMonitor2.getEmptyConfig = function() {
      var emptyConfig = this.getDefaultConfig();
      objForEachKey(emptyConfig, function(value) {
        emptyConfig[value] = void 0;
      });
      return emptyConfig;
    };
    AjaxMonitor2.prototype.processTelemetry = function(item, itemCtx) {
      this.processNext(item, itemCtx);
    };
    AjaxMonitor2.identifier = "AjaxDependencyPlugin";
    return AjaxMonitor2;
  }(BaseTelemetryPlugin);

  // node_modules/@microsoft/applicationinsights-web/dist-esm/Initialization.js
  var _internalSdkSrc;
  var _ignoreUpdateSnippetProperties = [
    "snippet",
    "dependencies",
    "properties",
    "_snippetVersion",
    "appInsightsNew",
    "getSKUDefaults"
  ];
  var Initialization = function() {
    function Initialization2(snippet) {
      var _self = this;
      _self._snippetVersion = "" + (snippet.sv || snippet.version || "");
      snippet.queue = snippet.queue || [];
      snippet.version = snippet.version || 2;
      var config = snippet.config || {};
      if (config.connectionString) {
        var cs = parseConnectionString(config.connectionString);
        var ingest = cs.ingestionendpoint;
        config.endpointUrl = ingest ? ingest + "/v2/track" : config.endpointUrl;
        config.instrumentationKey = cs.instrumentationkey || config.instrumentationKey;
      }
      _self.appInsights = new ApplicationInsights();
      _self.properties = new PropertiesPlugin_default();
      _self.dependencies = new AjaxMonitor();
      _self.core = new AppInsightsCore();
      _self._sender = new Sender();
      _self.snippet = snippet;
      _self.config = config;
      _self.getSKUDefaults();
    }
    Initialization2.prototype.getCookieMgr = function() {
      return this.appInsights.getCookieMgr();
    };
    ;
    Initialization2.prototype.trackEvent = function(event, customProperties) {
      this.appInsights.trackEvent(event, customProperties);
    };
    Initialization2.prototype.trackPageView = function(pageView) {
      var inPv = pageView || {};
      this.appInsights.trackPageView(inPv);
    };
    Initialization2.prototype.trackPageViewPerformance = function(pageViewPerformance) {
      var inPvp = pageViewPerformance || {};
      this.appInsights.trackPageViewPerformance(inPvp);
    };
    Initialization2.prototype.trackException = function(exception) {
      if (exception && !exception.exception && exception.error) {
        exception.exception = exception.error;
      }
      this.appInsights.trackException(exception);
    };
    Initialization2.prototype._onerror = function(exception) {
      this.appInsights._onerror(exception);
    };
    Initialization2.prototype.trackTrace = function(trace, customProperties) {
      this.appInsights.trackTrace(trace, customProperties);
    };
    Initialization2.prototype.trackMetric = function(metric, customProperties) {
      this.appInsights.trackMetric(metric, customProperties);
    };
    Initialization2.prototype.startTrackPage = function(name) {
      this.appInsights.startTrackPage(name);
    };
    Initialization2.prototype.stopTrackPage = function(name, url, customProperties, measurements) {
      this.appInsights.stopTrackPage(name, url, customProperties, measurements);
    };
    Initialization2.prototype.startTrackEvent = function(name) {
      this.appInsights.startTrackEvent(name);
    };
    Initialization2.prototype.stopTrackEvent = function(name, properties, measurements) {
      this.appInsights.stopTrackEvent(name, properties, measurements);
    };
    Initialization2.prototype.addTelemetryInitializer = function(telemetryInitializer) {
      return this.appInsights.addTelemetryInitializer(telemetryInitializer);
    };
    Initialization2.prototype.setAuthenticatedUserContext = function(authenticatedUserId, accountId, storeInCookie) {
      if (storeInCookie === void 0) {
        storeInCookie = false;
      }
      this.properties.context.user.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
    };
    Initialization2.prototype.clearAuthenticatedUserContext = function() {
      this.properties.context.user.clearAuthenticatedUserContext();
    };
    Initialization2.prototype.trackDependencyData = function(dependency) {
      this.dependencies.trackDependencyData(dependency);
    };
    Initialization2.prototype.flush = function(async) {
      var _this = this;
      if (async === void 0) {
        async = true;
      }
      doPerf(this.core, function() {
        return "AISKU.flush";
      }, function() {
        arrForEach(_this.core.getTransmissionControls(), function(channels) {
          arrForEach(channels, function(channel) {
            channel.flush(async);
          });
        });
      }, null, async);
    };
    Initialization2.prototype.onunloadFlush = function(async) {
      if (async === void 0) {
        async = true;
      }
      arrForEach(this.core.getTransmissionControls(), function(channels) {
        arrForEach(channels, function(channel) {
          if (channel.onunloadFlush) {
            channel.onunloadFlush();
          } else {
            channel.flush(async);
          }
        });
      });
    };
    Initialization2.prototype.loadAppInsights = function(legacyMode, logger, notificationManager) {
      var _this = this;
      if (legacyMode === void 0) {
        legacyMode = false;
      }
      var _self = this;
      function _updateSnippetProperties(snippet) {
        if (snippet) {
          var snippetVer = "";
          if (!isNullOrUndefined(_self._snippetVersion)) {
            snippetVer += _self._snippetVersion;
          }
          if (legacyMode) {
            snippetVer += ".lg";
          }
          if (_self.context && _self.context.internal) {
            _self.context.internal.snippetVer = snippetVer || "-";
          }
          objForEachKey(_self, function(field, value) {
            if (isString(field) && !isFunction(value) && field && field[0] !== "_" && _ignoreUpdateSnippetProperties.indexOf(field) === -1) {
              snippet[field] = value;
            }
          });
        }
      }
      if (legacyMode && _self.config.extensions && _self.config.extensions.length > 0) {
        throwError("Extensions not allowed in legacy mode");
      }
      doPerf(_self.core, function() {
        return "AISKU.loadAppInsights";
      }, function() {
        var extensions = [];
        extensions.push(_self._sender);
        extensions.push(_self.properties);
        extensions.push(_self.dependencies);
        extensions.push(_self.appInsights);
        _self.core.initialize(_self.config, extensions, logger, notificationManager);
        _self.context = _self.properties.context;
        if (_internalSdkSrc && _self.context) {
          _self.context.internal.sdkSrc = _internalSdkSrc;
        }
        _updateSnippetProperties(_self.snippet);
        _self.emptyQueue();
        _self.pollInternalLogs();
        _self.addHousekeepingBeforeUnload(_this);
      });
      return _self;
    };
    Initialization2.prototype.updateSnippetDefinitions = function(snippet) {
      proxyAssign(snippet, this, function(name) {
        return name && _ignoreUpdateSnippetProperties.indexOf(name) === -1;
      });
    };
    Initialization2.prototype.emptyQueue = function() {
      var _self = this;
      try {
        if (isArray(_self.snippet.queue)) {
          var length_1 = _self.snippet.queue.length;
          for (var i = 0; i < length_1; i++) {
            var call = _self.snippet.queue[i];
            call();
          }
          _self.snippet.queue = void 0;
          delete _self.snippet.queue;
        }
      } catch (exception) {
        var properties = {};
        if (exception && isFunction(exception.toString)) {
          properties.exception = exception.toString();
        }
      }
    };
    Initialization2.prototype.pollInternalLogs = function() {
      this.core.pollInternalLogs();
    };
    Initialization2.prototype.addHousekeepingBeforeUnload = function(appInsightsInstance) {
      if (hasWindow() || hasDocument()) {
        var performHousekeeping = function() {
          appInsightsInstance.onunloadFlush(false);
          arrForEach(appInsightsInstance.appInsights.core["_extensions"], function(ext) {
            if (ext.identifier === PropertiesPluginIdentifier) {
              if (ext && ext.context && ext.context._sessionManager) {
                ext.context._sessionManager.backup();
              }
              return -1;
            }
          });
        };
        if (!appInsightsInstance.appInsights.config.disableFlushOnBeforeUnload) {
          var added = addEventHandler("beforeunload", performHousekeeping);
          added = addEventHandler("unload", performHousekeeping) || added;
          added = addEventHandler("pagehide", performHousekeeping) || added;
          added = addEventHandler("visibilitychange", performHousekeeping) || added;
          if (!added && !isReactNative()) {
            appInsightsInstance.appInsights.core.logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.FailedToAddHandlerForOnBeforeUnload, "Could not add handler for beforeunload and pagehide");
          }
        }
        if (!appInsightsInstance.appInsights.config.disableFlushOnUnload) {
          addEventHandler("pagehide", performHousekeeping);
          addEventHandler("visibilitychange", performHousekeeping);
        }
      }
    };
    Initialization2.prototype.getSender = function() {
      return this._sender;
    };
    Initialization2.prototype.getSKUDefaults = function() {
      var _self = this;
      _self.config.diagnosticLogInterval = _self.config.diagnosticLogInterval && _self.config.diagnosticLogInterval > 0 ? _self.config.diagnosticLogInterval : 1e4;
    };
    return Initialization2;
  }();
  (function() {
    var sdkSrc = null;
    var isModule = false;
    var cdns = [
      "://js.monitor.azure.com/",
      "://az416426.vo.msecnd.net/"
    ];
    try {
      var scrpt = (document || {}).currentScript;
      if (scrpt) {
        sdkSrc = scrpt.src;
      }
    } catch (e) {
    }
    if (sdkSrc) {
      try {
        var url = sdkSrc.toLowerCase();
        if (url) {
          var src = "";
          for (var idx = 0; idx < cdns.length; idx++) {
            if (url.indexOf(cdns[idx]) !== -1) {
              src = "cdn" + (idx + 1);
              if (url.indexOf("/scripts/") === -1) {
                if (url.indexOf("/next/") !== -1) {
                  src += "-next";
                } else if (url.indexOf("/beta/") !== -1) {
                  src += "-beta";
                }
              }
              _internalSdkSrc = src + (isModule ? ".mod" : "");
              break;
            }
          }
        }
      } catch (e) {
      }
    }
  })();

  // src/common/baseTelemetryReporter.ts
  var vscode = __toModule(__require("vscode"));
  var _BaseTelemtryReporter = class {
    constructor(extensionId, extensionVersion, telemetryAppender, osShim, firstParty) {
      this.extensionId = extensionId;
      this.extensionVersion = extensionVersion;
      this.telemetryAppender = telemetryAppender;
      this.osShim = osShim;
      this.firstParty = false;
      this.userOptIn = false;
      this.firstParty = !!firstParty;
      this.updateUserOptStatus();
      if (vscode.env.onDidChangeTelemetryEnabled !== void 0) {
        this.optOutListener = vscode.env.onDidChangeTelemetryEnabled(() => this.updateUserOptStatus());
      } else {
        this.optOutListener = vscode.workspace.onDidChangeConfiguration(() => this.updateUserOptStatus());
      }
    }
    updateUserOptStatus() {
      const config = vscode.workspace.getConfiguration(_BaseTelemtryReporter.TELEMETRY_CONFIG_ID);
      const newOptInValue = vscode.env.isTelemetryEnabled === void 0 ? config.get(_BaseTelemtryReporter.TELEMETRY_CONFIG_ENABLED_ID, true) : vscode.env.isTelemetryEnabled;
      if (this.userOptIn !== newOptInValue) {
        this.userOptIn = newOptInValue;
      }
    }
    cleanRemoteName(remoteName) {
      if (!remoteName) {
        return "none";
      }
      let ret = "other";
      ["ssh-remote", "dev-container", "attached-container", "wsl"].forEach((res) => {
        if (remoteName.indexOf(`${res}+`) === 0) {
          ret = res;
        }
      });
      return ret;
    }
    get extension() {
      if (this._extension === void 0) {
        this._extension = vscode.extensions.getExtension(this.extensionId);
      }
      return this._extension;
    }
    cloneAndChange(obj, change) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (typeof change !== "function")
        return obj;
      const ret = {};
      for (const key in obj) {
        ret[key] = change(key, obj[key]);
      }
      return ret;
    }
    shouldSendErrorTelemetry() {
      if (this.firstParty) {
        if (this.cleanRemoteName(vscode.env.remoteName) !== "other") {
          return true;
        }
        if (this.extension === void 0 || this.extension.extensionKind === vscode.ExtensionKind.Workspace) {
          return false;
        }
        if (vscode.env.uiKind === vscode.UIKind.Web) {
          return false;
        }
        return true;
      }
      return true;
    }
    getCommonProperties() {
      const commonProperties = Object.create(null);
      commonProperties["common.os"] = this.osShim.platform;
      commonProperties["common.platformversion"] = (this.osShim.release || "").replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, "$1$2$3");
      commonProperties["common.extname"] = this.extensionId;
      commonProperties["common.extversion"] = this.extensionVersion;
      if (vscode && vscode.env) {
        commonProperties["common.vscodemachineid"] = vscode.env.machineId;
        commonProperties["common.vscodesessionid"] = vscode.env.sessionId;
        commonProperties["common.vscodeversion"] = vscode.version;
        commonProperties["common.isnewappinstall"] = vscode.env.isNewAppInstall;
        switch (vscode.env.uiKind) {
          case vscode.UIKind.Web:
            commonProperties["common.uikind"] = "web";
            break;
          case vscode.UIKind.Desktop:
            commonProperties["common.uikind"] = "desktop";
            break;
          default:
            commonProperties["common.uikind"] = "unknown";
        }
        commonProperties["common.remotename"] = this.cleanRemoteName(vscode.env.remoteName);
      }
      return commonProperties;
    }
    anonymizeFilePaths(stack, anonymizeFilePaths) {
      if (stack === void 0 || stack === null) {
        return "";
      }
      const cleanupPatterns = [new RegExp(vscode.env.appRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")];
      if (this.extension) {
        cleanupPatterns.push(new RegExp(this.extension.extensionPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));
      }
      let updatedStack = stack;
      if (anonymizeFilePaths) {
        const cleanUpIndexes = [];
        for (let regexp of cleanupPatterns) {
          while (true) {
            const result = regexp.exec(stack);
            if (!result) {
              break;
            }
            cleanUpIndexes.push([result.index, regexp.lastIndex]);
          }
        }
        const nodeModulesRegex = /^[\\\/]?(node_modules|node_modules\.asar)[\\\/]/;
        const fileRegex = /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-\._]+(\\\\|\\|\/))+[\w-\._]*/g;
        let lastIndex = 0;
        updatedStack = "";
        while (true) {
          const result = fileRegex.exec(stack);
          if (!result) {
            break;
          }
          if (!nodeModulesRegex.test(result[0]) && cleanUpIndexes.every(([x, y]) => result.index < x || result.index >= y)) {
            updatedStack += stack.substring(lastIndex, result.index) + "<REDACTED: user-file-path>";
            lastIndex = fileRegex.lastIndex;
          }
        }
        if (lastIndex < stack.length) {
          updatedStack += stack.substr(lastIndex);
        }
      }
      for (let regexp of cleanupPatterns) {
        updatedStack = updatedStack.replace(regexp, "");
      }
      return updatedStack;
    }
    sendTelemetryEvent(eventName, properties, measurements) {
      if (this.userOptIn && eventName !== "") {
        properties = { ...properties, ...this.getCommonProperties() };
        const cleanProperties = this.cloneAndChange(properties, (_key, prop) => this.anonymizeFilePaths(prop, this.firstParty));
        this.telemetryAppender.logEvent(`${this.extensionId}/${eventName}`, { properties: cleanProperties, measurements });
      }
    }
    sendTelemetryErrorEvent(eventName, properties, measurements, errorProps) {
      if (this.userOptIn && eventName !== "") {
        properties = { ...properties, ...this.getCommonProperties() };
        const cleanProperties = this.cloneAndChange(properties, (key, prop) => {
          if (this.shouldSendErrorTelemetry()) {
            return this.anonymizeFilePaths(prop, this.firstParty);
          }
          if (errorProps === void 0 || errorProps.indexOf(key) !== -1) {
            return "REDACTED";
          }
          return this.anonymizeFilePaths(prop, this.firstParty);
        });
        this.telemetryAppender.logEvent(`${this.extensionId}/${eventName}`, { properties: cleanProperties, measurements });
      }
    }
    sendTelemetryException(error, properties, measurements) {
      if (this.shouldSendErrorTelemetry() && this.userOptIn && error) {
        properties = { ...properties, ...this.getCommonProperties() };
        const cleanProperties = this.cloneAndChange(properties, (_key, prop) => this.anonymizeFilePaths(prop, this.firstParty));
        this.telemetryAppender.logException(error, { properties: cleanProperties, measurements });
      }
    }
    dispose() {
      this.telemetryAppender.flush();
      return this.optOutListener.dispose();
    }
  };
  var BaseTelemtryReporter = _BaseTelemtryReporter;
  BaseTelemtryReporter.TELEMETRY_CONFIG_ID = "telemetry";
  BaseTelemtryReporter.TELEMETRY_CONFIG_ENABLED_ID = "enableTelemetry";

  // src/browser/telemetryReporter.ts
  var WebAppInsightsAppender = class {
    constructor(key) {
      let endpointUrl;
      if (key && key.indexOf("AIF-") === 0) {
        endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
      }
      this._aiClient = new Initialization({
        config: {
          instrumentationKey: key,
          endpointUrl,
          disableAjaxTracking: true,
          disableExceptionTracking: true,
          disableFetchTracking: true,
          disableCorrelationHeaders: true,
          disableCookiesUsage: true,
          autoTrackPageVisitTime: false,
          emitLineDelimitedJson: true
        }
      });
      this._aiClient.loadAppInsights();
      if (endpointUrl) {
        fetch(endpointUrl).catch(() => this._aiClient = void 0);
      }
    }
    logEvent(eventName, data) {
      if (!this._aiClient) {
        return;
      }
      this._aiClient.trackEvent({ name: eventName }, __spreadValues(__spreadValues({}, data.properties), data.measurements));
    }
    logException(exception, data) {
      if (!this._aiClient) {
        return;
      }
      this._aiClient.trackException({ exception, properties: __spreadValues(__spreadValues({}, data.properties), data.measurements) });
    }
    flush() {
      if (this._aiClient) {
        this._aiClient.flush();
        this._aiClient = void 0;
      }
      return Promise.resolve(void 0);
    }
  };
  var TelemetryReporter = class extends BaseTelemtryReporter {
    constructor(extensionId, extensionVersion, key, firstParty) {
      const appender = new WebAppInsightsAppender(key);
      if (key && key.indexOf("AIF-") === 0) {
        firstParty = true;
      }
      super(extensionId, extensionVersion, appender, { release: navigator.appVersion, platform: "web" }, firstParty);
    }
  };
})();
/*!
 * Microsoft Dynamic Proto Utility, 1.1.4
 * Copyright (c) Microsoft and contributors. All rights reserved.
 */
//# sourceMappingURL=telemetryReporter.web.js.map
