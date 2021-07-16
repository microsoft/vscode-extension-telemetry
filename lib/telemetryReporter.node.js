var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/applicationinsights/out/Library/Logging.js
var require_Logging = __commonJS({
  "node_modules/applicationinsights/out/Library/Logging.js"(exports, module2) {
    "use strict";
    var Logging = function() {
      function Logging2() {
      }
      Logging2.info = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          optionalParams[_i - 1] = arguments[_i];
        }
        if (Logging2.enableDebug) {
          console.info(Logging2.TAG + message, optionalParams);
        }
      };
      Logging2.warn = function(message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          optionalParams[_i - 1] = arguments[_i];
        }
        if (!Logging2.disableWarnings) {
          console.warn(Logging2.TAG + message, optionalParams);
        }
      };
      Logging2.enableDebug = false;
      Logging2.disableWarnings = false;
      Logging2.disableErrors = false;
      Logging2.TAG = "ApplicationInsights:";
      return Logging2;
    }();
    module2.exports = Logging;
  }
});

// node_modules/applicationinsights/out/AutoCollection/AsyncHooksScopeManager.js
var require_AsyncHooksScopeManager = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/AsyncHooksScopeManager.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncScopeManager = exports.OpenTelemetryScopeManagerWrapper = void 0;
    var CorrelationContextManager_1 = require_CorrelationContextManager();
    var events_1 = require("events");
    var OpenTelemetryScopeManagerWrapper = function() {
      function OpenTelemetryScopeManagerWrapper2() {
      }
      OpenTelemetryScopeManagerWrapper2.prototype.active = function() {
        var _this = this;
        var context = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        return __assign(__assign({}, context), { getValue: function(key) {
          if (!_this._activeSymbol) {
            _this._activeSymbol = key;
            return context;
          }
          if (key === _this._activeSymbol) {
            return context;
          }
          return false;
        }, setValue: function() {
        } });
      };
      OpenTelemetryScopeManagerWrapper2.prototype.with = function(span, fn) {
        var parentSpanId = span.parentSpanId;
        var name = span.name;
        var correlationContext = OpenTelemetryScopeManagerWrapper2._spanToContext(span, parentSpanId, name);
        return CorrelationContextManager_1.CorrelationContextManager.runWithContext(correlationContext, fn)();
      };
      OpenTelemetryScopeManagerWrapper2.prototype.bind = function(target) {
        if (typeof target === "function") {
          return CorrelationContextManager_1.CorrelationContextManager.wrapCallback(target);
        } else if (target instanceof events_1.EventEmitter) {
          CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(target);
        }
        return target;
      };
      OpenTelemetryScopeManagerWrapper2.prototype.enable = function() {
        CorrelationContextManager_1.CorrelationContextManager.enable();
        return this;
      };
      OpenTelemetryScopeManagerWrapper2.prototype.disable = function() {
        CorrelationContextManager_1.CorrelationContextManager.disable();
        return this;
      };
      OpenTelemetryScopeManagerWrapper2._spanToContext = function(span, parentSpanId, name) {
        var _parentId = parentSpanId ? "|" + span.spanContext().traceId + "." + parentSpanId + "." : span.spanContext().traceId;
        var context = __assign(__assign({}, span.spanContext()), { traceFlags: span.spanContext().traceFlags });
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.spanToContextObject(context, _parentId, name);
        return correlationContext;
      };
      return OpenTelemetryScopeManagerWrapper2;
    }();
    exports.OpenTelemetryScopeManagerWrapper = OpenTelemetryScopeManagerWrapper;
    exports.AsyncScopeManager = new OpenTelemetryScopeManagerWrapper();
  }
});

// node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/semver/semver.js"(exports, module2) {
    exports = module2.exports = SemVer;
    var debug;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (var i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }
    exports.parse = parse;
    function parse(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports.valid = valid;
    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }
    exports.clean = clean;
    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release2, identifier) {
      switch (release2) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release2);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports.inc = inc;
    function inc(version, release2, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release2, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compare(a, b, loose);
      });
    }
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.rcompare(a, b, loose);
      });
    }
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      range = range.trim();
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, re[COMPARATORTRIM]);
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
      range = range.replace(re[CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug("caret", comp, options);
      var r = options.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports.satisfies = satisfies;
    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(re[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// node_modules/diagnostic-channel/dist/src/patchRequire.js
var require_patchRequire = __commonJS({
  "node_modules/diagnostic-channel/dist/src/patchRequire.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makePatchingRequire = void 0;
    var path = require("path");
    var semver = require_semver();
    var moduleModule = require("module");
    var nativeModules = Object.keys(process.binding("natives"));
    var originalRequire = moduleModule.prototype.require;
    function makePatchingRequire(knownPatches) {
      var patchedModules = {};
      return function patchedRequire(moduleId) {
        var originalModule = originalRequire.apply(this, arguments);
        if (knownPatches[moduleId]) {
          var modulePath = moduleModule._resolveFilename(moduleId, this);
          if (patchedModules.hasOwnProperty(modulePath)) {
            return patchedModules[modulePath];
          }
          var moduleVersion = void 0;
          if (nativeModules.indexOf(moduleId) < 0) {
            try {
              moduleVersion = originalRequire.call(this, path.join(moduleId, "package.json")).version;
            } catch (e) {
              return originalModule;
            }
          } else {
            moduleVersion = process.version.substring(1);
          }
          var prereleaseTagIndex = moduleVersion.indexOf("-");
          if (prereleaseTagIndex >= 0) {
            moduleVersion = moduleVersion.substring(0, prereleaseTagIndex);
          }
          var modifiedModule = originalModule;
          for (var _i = 0, _a = knownPatches[moduleId]; _i < _a.length; _i++) {
            var modulePatcher = _a[_i];
            if (semver.satisfies(moduleVersion, modulePatcher.versionSpecifier)) {
              modifiedModule = modulePatcher.patch(modifiedModule, modulePath);
            }
          }
          return patchedModules[modulePath] = modifiedModule;
        }
        return originalModule;
      };
    }
    exports.makePatchingRequire = makePatchingRequire;
  }
});

// node_modules/diagnostic-channel/package.json
var require_package = __commonJS({
  "node_modules/diagnostic-channel/package.json"(exports, module2) {
    module2.exports = {
      name: "diagnostic-channel",
      version: "1.0.0",
      main: "./dist/src/channel.js",
      types: "./dist/src/channel.d.ts",
      scripts: {
        build: "tsc",
        lint: "tslint -c tslint.json -p tsconfig.json",
        clean: "rimraf ./dist",
        test: "mocha ./dist/tests/**/*.js"
      },
      homepage: "https://github.com/Microsoft/node-diagnostic-channel",
      bugs: {
        url: "https://github.com/Microsoft/node-diagnostic-channel/issues"
      },
      repository: {
        type: "git",
        url: "https://github.com/Microsoft/node-diagnostic-channel.git"
      },
      description: "Provides a context-saving pub/sub channel to connect diagnostic event publishers and subscribers",
      dependencies: {
        semver: "^5.3.0"
      },
      devDependencies: {
        "@types/mocha": "^2.2.40",
        "@types/node": "~8.0.0",
        mocha: "^3.2.0",
        rimraf: "^2.6.1",
        tslint: "^5.0.0",
        typescript: "4.1.2"
      },
      files: [
        "dist/src/**/*.d.ts",
        "dist/src/**/*.js",
        "LICENSE",
        "README.md",
        "package.json"
      ],
      license: "MIT"
    };
  }
});

// node_modules/diagnostic-channel/dist/src/channel.js
var require_channel = __commonJS({
  "node_modules/diagnostic-channel/dist/src/channel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.channel = exports.makePatchingRequire = void 0;
    var patchRequire_1 = require_patchRequire();
    var patchRequire_2 = require_patchRequire();
    Object.defineProperty(exports, "makePatchingRequire", { enumerable: true, get: function() {
      return patchRequire_2.makePatchingRequire;
    } });
    var trueFilter = function(publishing) {
      return true;
    };
    var ContextPreservingEventEmitter = function() {
      function ContextPreservingEventEmitter2() {
        this.version = require_package().version;
        this.subscribers = {};
        this.contextPreservationFunction = function(cb) {
          return cb;
        };
        this.knownPatches = {};
        this.currentlyPublishing = false;
      }
      ContextPreservingEventEmitter2.prototype.shouldPublish = function(name) {
        var listeners = this.subscribers[name];
        if (listeners) {
          return listeners.some(function(_a) {
            var filter = _a.filter;
            return !filter || filter(false);
          });
        }
        return false;
      };
      ContextPreservingEventEmitter2.prototype.publish = function(name, event) {
        if (this.currentlyPublishing) {
          return;
        }
        var listeners = this.subscribers[name];
        if (listeners) {
          var standardEvent_1 = {
            timestamp: Date.now(),
            data: event
          };
          this.currentlyPublishing = true;
          listeners.forEach(function(_a) {
            var listener = _a.listener, filter = _a.filter;
            try {
              if (filter && filter(true)) {
                listener(standardEvent_1);
              }
            } catch (e) {
            }
          });
          this.currentlyPublishing = false;
        }
      };
      ContextPreservingEventEmitter2.prototype.subscribe = function(name, listener, filter) {
        if (filter === void 0) {
          filter = trueFilter;
        }
        if (!this.subscribers[name]) {
          this.subscribers[name] = [];
        }
        this.subscribers[name].push({ listener, filter });
      };
      ContextPreservingEventEmitter2.prototype.unsubscribe = function(name, listener, filter) {
        if (filter === void 0) {
          filter = trueFilter;
        }
        var listeners = this.subscribers[name];
        if (listeners) {
          for (var index = 0; index < listeners.length; ++index) {
            if (listeners[index].listener === listener && listeners[index].filter === filter) {
              listeners.splice(index, 1);
              return true;
            }
          }
        }
        return false;
      };
      ContextPreservingEventEmitter2.prototype.reset = function() {
        var _this = this;
        this.subscribers = {};
        this.contextPreservationFunction = function(cb) {
          return cb;
        };
        Object.getOwnPropertyNames(this.knownPatches).forEach(function(prop) {
          return delete _this.knownPatches[prop];
        });
      };
      ContextPreservingEventEmitter2.prototype.bindToContext = function(cb) {
        return this.contextPreservationFunction(cb);
      };
      ContextPreservingEventEmitter2.prototype.addContextPreservation = function(preserver) {
        var previousPreservationStack = this.contextPreservationFunction;
        this.contextPreservationFunction = function(cb) {
          return preserver(previousPreservationStack(cb));
        };
      };
      ContextPreservingEventEmitter2.prototype.registerMonkeyPatch = function(packageName, patcher) {
        if (!this.knownPatches[packageName]) {
          this.knownPatches[packageName] = [];
        }
        this.knownPatches[packageName].push(patcher);
      };
      ContextPreservingEventEmitter2.prototype.getPatchesObject = function() {
        return this.knownPatches;
      };
      return ContextPreservingEventEmitter2;
    }();
    if (!global.diagnosticsSource) {
      global.diagnosticsSource = new ContextPreservingEventEmitter();
      moduleModule = require("module");
      moduleModule.prototype.require = patchRequire_1.makePatchingRequire(global.diagnosticsSource.getPatchesObject());
    }
    var moduleModule;
    exports.channel = global.diagnosticsSource;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/types.js
var require_types = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js
var require_baggage_impl = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaggageImpl = void 0;
    var BaggageImpl = function() {
      function BaggageImpl2(entries) {
        this._entries = entries ? new Map(entries) : new Map();
      }
      BaggageImpl2.prototype.getEntry = function(key) {
        var entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      };
      BaggageImpl2.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(_a) {
          var k = _a[0], v = _a[1];
          return [k, v];
        });
      };
      BaggageImpl2.prototype.setEntry = function(key, entry) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntry = function(key) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntries = function() {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          keys[_i] = arguments[_i];
        }
        var newBaggage = new BaggageImpl2(this._entries);
        for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
          var key = keys_1[_a];
          newBaggage._entries.delete(key);
        }
        return newBaggage;
      };
      BaggageImpl2.prototype.clear = function() {
        return new BaggageImpl2();
      };
      return BaggageImpl2;
    }();
    exports.BaggageImpl = BaggageImpl;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js
var require_symbol = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageEntryMetadataSymbol = void 0;
    exports.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/utils.js
var require_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageEntryMetadataFromString = exports.createBaggage = void 0;
    var __1 = require_src();
    var baggage_impl_1 = require_baggage_impl();
    var symbol_1 = require_symbol();
    function createBaggage(entries) {
      if (entries === void 0) {
        entries = {};
      }
      return new baggage_impl_1.BaggageImpl(new Map(Object.entries(entries)));
    }
    exports.createBaggage = createBaggage;
    function baggageEntryMetadataFromString(str) {
      if (typeof str !== "string") {
        __1.diag.error("Cannot create baggage metadata from unknown type: " + typeof str);
        str = "";
      }
      return {
        __TYPE__: symbol_1.baggageEntryMetadataSymbol,
        toString: function() {
          return str;
        }
      };
    }
    exports.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
  }
});

// node_modules/@opentelemetry/api/build/src/common/Exception.js
var require_Exception = __commonJS({
  "node_modules/@opentelemetry/api/build/src/common/Exception.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/common/Time.js
var require_Time = __commonJS({
  "node_modules/@opentelemetry/api/build/src/common/Time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js
var require_consoleLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagConsoleLogger = void 0;
    var consoleMap = [
      { n: "error", c: "error" },
      { n: "warn", c: "warn" },
      { n: "info", c: "info" },
      { n: "debug", c: "debug" },
      { n: "verbose", c: "trace" }
    ];
    var DiagConsoleLogger = function() {
      function DiagConsoleLogger2() {
        function _consoleFunc(funcName) {
          return function() {
            var orgArguments = arguments;
            if (console) {
              var theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
              if (typeof theFunc === "function") {
                return theFunc.apply(console, orgArguments);
              }
            }
          };
        }
        for (var i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
      return DiagConsoleLogger2;
    }();
    exports.DiagConsoleLogger = DiagConsoleLogger;
  }
});

// node_modules/@opentelemetry/api/build/src/diag/types.js
var require_types2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagLogLevel = void 0;
    var DiagLogLevel;
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel = exports.DiagLogLevel || (exports.DiagLogLevel = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/diag/index.js
var require_diag = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_consoleLogger(), exports);
    __exportStar(require_types2(), exports);
  }
});

// node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js
var require_TextMapPropagator = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultTextMapSetter = exports.defaultTextMapGetter = void 0;
    exports.defaultTextMapGetter = {
      get: function(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys: function(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    exports.defaultTextMapSetter = {
      set: function(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/src/trace/attributes.js
var require_attributes = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/attributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/link.js
var require_link = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/link.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/context/context.js
var require_context = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ROOT_CONTEXT = exports.createContextKey = void 0;
    function createContextKey(description) {
      return Symbol.for(description);
    }
    exports.createContextKey = createContextKey;
    var BaseContext = function() {
      function BaseContext2(parentContext) {
        var self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : new Map();
        self2.getValue = function(key) {
          return self2._currentContext.get(key);
        };
        self2.setValue = function(key, value) {
          var context = new BaseContext2(self2._currentContext);
          context._currentContext.set(key, value);
          return context;
        };
        self2.deleteValue = function(key) {
          var context = new BaseContext2(self2._currentContext);
          context._currentContext.delete(key);
          return context;
        };
      }
      return BaseContext2;
    }();
    exports.ROOT_CONTEXT = new BaseContext();
  }
});

// node_modules/@opentelemetry/api/build/src/trace/trace_flags.js
var require_trace_flags = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/trace_flags.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceFlags = void 0;
    var TraceFlags;
    (function(TraceFlags2) {
      TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
      TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags = exports.TraceFlags || (exports.TraceFlags = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js
var require_spancontext_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapSpanContext = exports.isSpanContextValid = exports.isValidSpanId = exports.isValidTraceId = exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = void 0;
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var trace_flags_1 = require_trace_flags();
    var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
    var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
    exports.INVALID_SPANID = "0000000000000000";
    exports.INVALID_TRACEID = "00000000000000000000000000000000";
    exports.INVALID_SPAN_CONTEXT = {
      traceId: exports.INVALID_TRACEID,
      spanId: exports.INVALID_SPANID,
      traceFlags: trace_flags_1.TraceFlags.NONE
    };
    function isValidTraceId(traceId) {
      return VALID_TRACEID_REGEX.test(traceId) && traceId !== exports.INVALID_TRACEID;
    }
    exports.isValidTraceId = isValidTraceId;
    function isValidSpanId(spanId) {
      return VALID_SPANID_REGEX.test(spanId) && spanId !== exports.INVALID_SPANID;
    }
    exports.isValidSpanId = isValidSpanId;
    function isSpanContextValid(spanContext) {
      return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
    }
    exports.isSpanContextValid = isSpanContextValid;
    function wrapSpanContext(spanContext) {
      return new NonRecordingSpan_1.NonRecordingSpan(spanContext);
    }
    exports.wrapSpanContext = wrapSpanContext;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js
var require_NonRecordingSpan = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NonRecordingSpan = void 0;
    var spancontext_utils_1 = require_spancontext_utils();
    var NonRecordingSpan = function() {
      function NonRecordingSpan2(_spanContext) {
        if (_spanContext === void 0) {
          _spanContext = spancontext_utils_1.INVALID_SPAN_CONTEXT;
        }
        this._spanContext = _spanContext;
      }
      NonRecordingSpan2.prototype.spanContext = function() {
        return this._spanContext;
      };
      NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
        return this;
      };
      NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.setStatus = function(_status) {
        return this;
      };
      NonRecordingSpan2.prototype.updateName = function(_name) {
        return this;
      };
      NonRecordingSpan2.prototype.end = function(_endTime) {
      };
      NonRecordingSpan2.prototype.isRecording = function() {
        return false;
      };
      NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
      };
      return NonRecordingSpan2;
    }();
    exports.NonRecordingSpan = NonRecordingSpan;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/context-utils.js
var require_context_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/context-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSpanContext = exports.setSpanContext = exports.deleteSpan = exports.setSpan = exports.getSpan = void 0;
    var context_1 = require_context();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var SPAN_KEY = context_1.createContextKey("OpenTelemetry Context Key SPAN");
    function getSpan(context) {
      return context.getValue(SPAN_KEY) || void 0;
    }
    exports.getSpan = getSpan;
    function setSpan(context, span) {
      return context.setValue(SPAN_KEY, span);
    }
    exports.setSpan = setSpan;
    function deleteSpan(context) {
      return context.deleteValue(SPAN_KEY);
    }
    exports.deleteSpan = deleteSpan;
    function setSpanContext(context, spanContext) {
      return setSpan(context, new NonRecordingSpan_1.NonRecordingSpan(spanContext));
    }
    exports.setSpanContext = setSpanContext;
    function getSpanContext(context) {
      var _a;
      return (_a = getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
    }
    exports.getSpanContext = getSpanContext;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js
var require_NoopTracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTracer = void 0;
    var __1 = require_src();
    var context_utils_1 = require_context_utils();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var spancontext_utils_1 = require_spancontext_utils();
    var NoopTracer = function() {
      function NoopTracer2() {
      }
      NoopTracer2.prototype.startSpan = function(name, options, context) {
        var root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
        var parentFromContext = context && context_utils_1.getSpanContext(context);
        if (isSpanContext(parentFromContext) && spancontext_utils_1.isSpanContextValid(parentFromContext)) {
          return new NonRecordingSpan_1.NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
      };
      NoopTracer2.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : __1.context.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = context_utils_1.setSpan(parentContext, span);
        return __1.context.with(contextWithSpanSet, fn, void 0, span);
      };
      return NoopTracer2;
    }();
    exports.NoopTracer = NoopTracer;
    function isSpanContext(spanContext) {
      return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
    }
  }
});

// node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js
var require_ProxyTracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyTracer = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var ProxyTracer = function() {
      function ProxyTracer2(_provider, name, version) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
      }
      ProxyTracer2.prototype.startSpan = function(name, options, context) {
        return this._getTracer().startSpan(name, options, context);
      };
      ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
        var tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      };
      ProxyTracer2.prototype._getTracer = function() {
        if (this._delegate) {
          return this._delegate;
        }
        var tracer = this._provider.getDelegateTracer(this.name, this.version);
        if (!tracer) {
          return new NoopTracer_1.NoopTracer();
        }
        this._delegate = tracer;
        return this._delegate;
      };
      return ProxyTracer2;
    }();
    exports.ProxyTracer = ProxyTracer;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js
var require_NoopTracerProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTracerProvider = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NoopTracerProvider = function() {
      function NoopTracerProvider2() {
      }
      NoopTracerProvider2.prototype.getTracer = function(_name, _version) {
        return new NoopTracer_1.NoopTracer();
      };
      return NoopTracerProvider2;
    }();
    exports.NoopTracerProvider = NoopTracerProvider;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js
var require_ProxyTracerProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyTracerProvider = void 0;
    var ProxyTracer_1 = require_ProxyTracer();
    var NoopTracerProvider_1 = require_NoopTracerProvider();
    var NOOP_TRACER_PROVIDER = new NoopTracerProvider_1.NoopTracerProvider();
    var ProxyTracerProvider = function() {
      function ProxyTracerProvider2() {
      }
      ProxyTracerProvider2.prototype.getTracer = function(name, version) {
        var _a;
        return (_a = this.getDelegateTracer(name, version)) !== null && _a !== void 0 ? _a : new ProxyTracer_1.ProxyTracer(this, name, version);
      };
      ProxyTracerProvider2.prototype.getDelegate = function() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      };
      ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
        this._delegate = delegate;
      };
      ProxyTracerProvider2.prototype.getDelegateTracer = function(name, version) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version);
      };
      return ProxyTracerProvider2;
    }();
    exports.ProxyTracerProvider = ProxyTracerProvider;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/Sampler.js
var require_Sampler = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/Sampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js
var require_SamplingResult = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = void 0;
    var SamplingDecision;
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/span_context.js
var require_span_context = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/span_context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/span_kind.js
var require_span_kind = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/span_kind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanKind = void 0;
    var SpanKind;
    (function(SpanKind2) {
      SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
      SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
      SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
      SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
      SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind = exports.SpanKind || (exports.SpanKind = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/span.js
var require_span = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/span.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/SpanOptions.js
var require_SpanOptions = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/SpanOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/status.js
var require_status = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/status.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanStatusCode = void 0;
    var SpanStatusCode;
    (function(SpanStatusCode2) {
      SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
      SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
      SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode = exports.SpanStatusCode || (exports.SpanStatusCode = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/trace_state.js
var require_trace_state = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/trace_state.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/tracer_provider.js
var require_tracer_provider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/tracer_provider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/trace/tracer.js
var require_tracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/tracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/context/types.js
var require_types3 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js
var require_NoopContextManager = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopContextManager = void 0;
    var context_1 = require_context();
    var NoopContextManager = function() {
      function NoopContextManager2() {
      }
      NoopContextManager2.prototype.active = function() {
        return context_1.ROOT_CONTEXT;
      };
      NoopContextManager2.prototype.with = function(_context, fn, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return fn.call.apply(fn, __spreadArray([thisArg], args));
      };
      NoopContextManager2.prototype.bind = function(_context, target) {
        return target;
      };
      NoopContextManager2.prototype.enable = function() {
        return this;
      };
      NoopContextManager2.prototype.disable = function() {
        return this;
      };
      return NoopContextManager2;
    }();
    exports.NoopContextManager = NoopContextManager;
  }
});

// node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/api/build/src/platform/node/index.js
var require_node = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_globalThis(), exports);
  }
});

// node_modules/@opentelemetry/api/build/src/platform/index.js
var require_platform = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node(), exports);
  }
});

// node_modules/@opentelemetry/api/build/src/version.js
var require_version = __commonJS({
  "node_modules/@opentelemetry/api/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "1.0.1";
  }
});

// node_modules/@opentelemetry/api/build/src/internal/semver.js
var require_semver2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/internal/semver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isCompatible = exports._makeCompatibilityCheck = void 0;
    var version_1 = require_version();
    var re = /^(\d+)\.(\d+)\.(\d+)(?:-(.*))?$/;
    function _makeCompatibilityCheck(ownVersion) {
      var acceptedVersions = new Set([ownVersion]);
      var rejectedVersions = new Set();
      var myVersionMatch = ownVersion.match(re);
      if (!myVersionMatch) {
        return function() {
          return false;
        };
      }
      var ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3]
      };
      function _reject(v) {
        rejectedVersions.add(v);
        return false;
      }
      function _accept(v) {
        acceptedVersions.add(v);
        return true;
      }
      return function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) {
          return true;
        }
        if (rejectedVersions.has(globalVersion)) {
          return false;
        }
        var globalVersionMatch = globalVersion.match(re);
        if (!globalVersionMatch) {
          return _reject(globalVersion);
        }
        var globalVersionParsed = {
          major: +globalVersionMatch[1],
          minor: +globalVersionMatch[2],
          patch: +globalVersionMatch[3]
        };
        if (ownVersionParsed.major !== globalVersionParsed.major) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major === 0) {
          if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
            return _accept(globalVersion);
          }
          return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) {
          return _accept(globalVersion);
        }
        return _reject(globalVersion);
      };
    }
    exports._makeCompatibilityCheck = _makeCompatibilityCheck;
    exports.isCompatible = _makeCompatibilityCheck(version_1.VERSION);
  }
});

// node_modules/@opentelemetry/api/build/src/internal/global-utils.js
var require_global_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/internal/global-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unregisterGlobal = exports.getGlobal = exports.registerGlobal = void 0;
    var platform_1 = require_platform();
    var version_1 = require_version();
    var semver_1 = require_semver2();
    var major = version_1.VERSION.split(".")[0];
    var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
    var _global = platform_1._globalThis;
    function registerGlobal(type, instance, diag, allowOverride) {
      var _a;
      if (allowOverride === void 0) {
        allowOverride = false;
      }
      var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: version_1.VERSION
      };
      if (!allowOverride && api[type]) {
        var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
        diag.error(err.stack || err.message);
        return false;
      }
      if (api.version !== version_1.VERSION) {
        var err = new Error("@opentelemetry/api: All API registration versions must match");
        diag.error(err.stack || err.message);
        return false;
      }
      api[type] = instance;
      diag.debug("@opentelemetry/api: Registered a global for " + type + " v" + version_1.VERSION + ".");
      return true;
    }
    exports.registerGlobal = registerGlobal;
    function getGlobal(type) {
      var _a, _b;
      var globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
      if (!globalVersion || !semver_1.isCompatible(globalVersion)) {
        return;
      }
      return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
    }
    exports.getGlobal = getGlobal;
    function unregisterGlobal(type, diag) {
      diag.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + version_1.VERSION + ".");
      var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
      if (api) {
        delete api[type];
      }
    }
    exports.unregisterGlobal = unregisterGlobal;
  }
});

// node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js
var require_ComponentLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagComponentLogger = void 0;
    var global_utils_1 = require_global_utils();
    var DiagComponentLogger = function() {
      function DiagComponentLogger2(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      DiagComponentLogger2.prototype.debug = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("debug", this._namespace, args);
      };
      DiagComponentLogger2.prototype.error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("error", this._namespace, args);
      };
      DiagComponentLogger2.prototype.info = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("info", this._namespace, args);
      };
      DiagComponentLogger2.prototype.warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("warn", this._namespace, args);
      };
      DiagComponentLogger2.prototype.verbose = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("verbose", this._namespace, args);
      };
      return DiagComponentLogger2;
    }();
    exports.DiagComponentLogger = DiagComponentLogger;
    function logProxy(funcName, namespace, args) {
      var logger = global_utils_1.getGlobal("diag");
      if (!logger) {
        return;
      }
      args.unshift(namespace);
      return logger[funcName].apply(logger, args);
    }
  }
});

// node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js
var require_logLevelLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createLogLevelDiagLogger = void 0;
    var types_1 = require_types2();
    function createLogLevelDiagLogger(maxLevel, logger) {
      if (maxLevel < types_1.DiagLogLevel.NONE) {
        maxLevel = types_1.DiagLogLevel.NONE;
      } else if (maxLevel > types_1.DiagLogLevel.ALL) {
        maxLevel = types_1.DiagLogLevel.ALL;
      }
      logger = logger || {};
      function _filterFunc(funcName, theLevel) {
        var theFunc = logger[funcName];
        if (typeof theFunc === "function" && maxLevel >= theLevel) {
          return theFunc.bind(logger);
        }
        return function() {
        };
      }
      return {
        error: _filterFunc("error", types_1.DiagLogLevel.ERROR),
        warn: _filterFunc("warn", types_1.DiagLogLevel.WARN),
        info: _filterFunc("info", types_1.DiagLogLevel.INFO),
        debug: _filterFunc("debug", types_1.DiagLogLevel.DEBUG),
        verbose: _filterFunc("verbose", types_1.DiagLogLevel.VERBOSE)
      };
    }
    exports.createLogLevelDiagLogger = createLogLevelDiagLogger;
  }
});

// node_modules/@opentelemetry/api/build/src/api/diag.js
var require_diag2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/diag.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagAPI = void 0;
    var ComponentLogger_1 = require_ComponentLogger();
    var logLevelLogger_1 = require_logLevelLogger();
    var types_1 = require_types2();
    var global_utils_1 = require_global_utils();
    var API_NAME = "diag";
    var DiagAPI = function() {
      function DiagAPI2() {
        function _logProxy(funcName) {
          return function() {
            var logger = global_utils_1.getGlobal("diag");
            if (!logger)
              return;
            return logger[funcName].apply(logger, arguments);
          };
        }
        var self2 = this;
        self2.setLogger = function(logger, logLevel) {
          var _a, _b;
          if (logLevel === void 0) {
            logLevel = types_1.DiagLogLevel.INFO;
          }
          if (logger === self2) {
            var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          var oldLogger = global_utils_1.getGlobal("diag");
          var newLogger = logLevelLogger_1.createLogLevelDiagLogger(logLevel, logger);
          if (oldLogger) {
            var stack = (_b = new Error().stack) !== null && _b !== void 0 ? _b : "<failed to generate stacktrace>";
            oldLogger.warn("Current logger will be overwritten from " + stack);
            newLogger.warn("Current logger will overwrite one already registered from " + stack);
          }
          return global_utils_1.registerGlobal("diag", newLogger, self2, true);
        };
        self2.disable = function() {
          global_utils_1.unregisterGlobal(API_NAME, self2);
        };
        self2.createComponentLogger = function(options) {
          return new ComponentLogger_1.DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
      DiagAPI2.instance = function() {
        if (!this._instance) {
          this._instance = new DiagAPI2();
        }
        return this._instance;
      };
      return DiagAPI2;
    }();
    exports.DiagAPI = DiagAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/api/context.js
var require_context2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/context.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContextAPI = void 0;
    var NoopContextManager_1 = require_NoopContextManager();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag2();
    var API_NAME = "context";
    var NOOP_CONTEXT_MANAGER = new NoopContextManager_1.NoopContextManager();
    var ContextAPI = function() {
      function ContextAPI2() {
      }
      ContextAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new ContextAPI2();
        }
        return this._instance;
      };
      ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
        return global_utils_1.registerGlobal(API_NAME, contextManager, diag_1.DiagAPI.instance());
      };
      ContextAPI2.prototype.active = function() {
        return this._getContextManager().active();
      };
      ContextAPI2.prototype.with = function(context, fn, thisArg) {
        var _a;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return (_a = this._getContextManager()).with.apply(_a, __spreadArray([context, fn, thisArg], args));
      };
      ContextAPI2.prototype.bind = function(context, target) {
        return this._getContextManager().bind(context, target);
      };
      ContextAPI2.prototype._getContextManager = function() {
        return global_utils_1.getGlobal(API_NAME) || NOOP_CONTEXT_MANAGER;
      };
      ContextAPI2.prototype.disable = function() {
        this._getContextManager().disable();
        global_utils_1.unregisterGlobal(API_NAME, diag_1.DiagAPI.instance());
      };
      return ContextAPI2;
    }();
    exports.ContextAPI = ContextAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/api/trace.js
var require_trace = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/trace.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceAPI = void 0;
    var global_utils_1 = require_global_utils();
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    var spancontext_utils_1 = require_spancontext_utils();
    var context_utils_1 = require_context_utils();
    var diag_1 = require_diag2();
    var API_NAME = "trace";
    var TraceAPI = function() {
      function TraceAPI2() {
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
        this.wrapSpanContext = spancontext_utils_1.wrapSpanContext;
        this.isSpanContextValid = spancontext_utils_1.isSpanContextValid;
        this.deleteSpan = context_utils_1.deleteSpan;
        this.getSpan = context_utils_1.getSpan;
        this.getSpanContext = context_utils_1.getSpanContext;
        this.setSpan = context_utils_1.setSpan;
        this.setSpanContext = context_utils_1.setSpanContext;
      }
      TraceAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new TraceAPI2();
        }
        return this._instance;
      };
      TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
        this._proxyTracerProvider.setDelegate(provider);
        return global_utils_1.registerGlobal(API_NAME, this._proxyTracerProvider, diag_1.DiagAPI.instance());
      };
      TraceAPI2.prototype.getTracerProvider = function() {
        return global_utils_1.getGlobal(API_NAME) || this._proxyTracerProvider;
      };
      TraceAPI2.prototype.getTracer = function(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      };
      TraceAPI2.prototype.disable = function() {
        global_utils_1.unregisterGlobal(API_NAME, diag_1.DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
      };
      return TraceAPI2;
    }();
    exports.TraceAPI = TraceAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js
var require_NoopTextMapPropagator = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTextMapPropagator = void 0;
    var NoopTextMapPropagator = function() {
      function NoopTextMapPropagator2() {
      }
      NoopTextMapPropagator2.prototype.inject = function(_context, _carrier) {
      };
      NoopTextMapPropagator2.prototype.extract = function(context, _carrier) {
        return context;
      };
      NoopTextMapPropagator2.prototype.fields = function() {
        return [];
      };
      return NoopTextMapPropagator2;
    }();
    exports.NoopTextMapPropagator = NoopTextMapPropagator;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js
var require_context_helpers = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteBaggage = exports.setBaggage = exports.getBaggage = void 0;
    var context_1 = require_context();
    var BAGGAGE_KEY = context_1.createContextKey("OpenTelemetry Baggage Key");
    function getBaggage(context) {
      return context.getValue(BAGGAGE_KEY) || void 0;
    }
    exports.getBaggage = getBaggage;
    function setBaggage(context, baggage) {
      return context.setValue(BAGGAGE_KEY, baggage);
    }
    exports.setBaggage = setBaggage;
    function deleteBaggage(context) {
      return context.deleteValue(BAGGAGE_KEY);
    }
    exports.deleteBaggage = deleteBaggage;
  }
});

// node_modules/@opentelemetry/api/build/src/api/propagation.js
var require_propagation = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/propagation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PropagationAPI = void 0;
    var global_utils_1 = require_global_utils();
    var NoopTextMapPropagator_1 = require_NoopTextMapPropagator();
    var TextMapPropagator_1 = require_TextMapPropagator();
    var context_helpers_1 = require_context_helpers();
    var utils_1 = require_utils();
    var diag_1 = require_diag2();
    var API_NAME = "propagation";
    var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator_1.NoopTextMapPropagator();
    var PropagationAPI = function() {
      function PropagationAPI2() {
        this.createBaggage = utils_1.createBaggage;
        this.getBaggage = context_helpers_1.getBaggage;
        this.setBaggage = context_helpers_1.setBaggage;
        this.deleteBaggage = context_helpers_1.deleteBaggage;
      }
      PropagationAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new PropagationAPI2();
        }
        return this._instance;
      };
      PropagationAPI2.prototype.setGlobalPropagator = function(propagator) {
        return global_utils_1.registerGlobal(API_NAME, propagator, diag_1.DiagAPI.instance());
      };
      PropagationAPI2.prototype.inject = function(context, carrier, setter) {
        if (setter === void 0) {
          setter = TextMapPropagator_1.defaultTextMapSetter;
        }
        return this._getGlobalPropagator().inject(context, carrier, setter);
      };
      PropagationAPI2.prototype.extract = function(context, carrier, getter) {
        if (getter === void 0) {
          getter = TextMapPropagator_1.defaultTextMapGetter;
        }
        return this._getGlobalPropagator().extract(context, carrier, getter);
      };
      PropagationAPI2.prototype.fields = function() {
        return this._getGlobalPropagator().fields();
      };
      PropagationAPI2.prototype.disable = function() {
        global_utils_1.unregisterGlobal(API_NAME, diag_1.DiagAPI.instance());
      };
      PropagationAPI2.prototype._getGlobalPropagator = function() {
        return global_utils_1.getGlobal(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
      };
      return PropagationAPI2;
    }();
    exports.PropagationAPI = PropagationAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/index.js
var require_src = __commonJS({
  "node_modules/@opentelemetry/api/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.diag = exports.propagation = exports.trace = exports.context = exports.isValidSpanId = exports.isValidTraceId = exports.isSpanContextValid = exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = exports.baggageEntryMetadataFromString = void 0;
    __exportStar(require_types(), exports);
    var utils_1 = require_utils();
    Object.defineProperty(exports, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
      return utils_1.baggageEntryMetadataFromString;
    } });
    __exportStar(require_Exception(), exports);
    __exportStar(require_Time(), exports);
    __exportStar(require_diag(), exports);
    __exportStar(require_TextMapPropagator(), exports);
    __exportStar(require_attributes(), exports);
    __exportStar(require_link(), exports);
    __exportStar(require_ProxyTracer(), exports);
    __exportStar(require_ProxyTracerProvider(), exports);
    __exportStar(require_Sampler(), exports);
    __exportStar(require_SamplingResult(), exports);
    __exportStar(require_span_context(), exports);
    __exportStar(require_span_kind(), exports);
    __exportStar(require_span(), exports);
    __exportStar(require_SpanOptions(), exports);
    __exportStar(require_status(), exports);
    __exportStar(require_trace_flags(), exports);
    __exportStar(require_trace_state(), exports);
    __exportStar(require_tracer_provider(), exports);
    __exportStar(require_tracer(), exports);
    var spancontext_utils_1 = require_spancontext_utils();
    Object.defineProperty(exports, "INVALID_SPANID", { enumerable: true, get: function() {
      return spancontext_utils_1.INVALID_SPANID;
    } });
    Object.defineProperty(exports, "INVALID_TRACEID", { enumerable: true, get: function() {
      return spancontext_utils_1.INVALID_TRACEID;
    } });
    Object.defineProperty(exports, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
      return spancontext_utils_1.INVALID_SPAN_CONTEXT;
    } });
    Object.defineProperty(exports, "isSpanContextValid", { enumerable: true, get: function() {
      return spancontext_utils_1.isSpanContextValid;
    } });
    Object.defineProperty(exports, "isValidTraceId", { enumerable: true, get: function() {
      return spancontext_utils_1.isValidTraceId;
    } });
    Object.defineProperty(exports, "isValidSpanId", { enumerable: true, get: function() {
      return spancontext_utils_1.isValidSpanId;
    } });
    __exportStar(require_context(), exports);
    __exportStar(require_types3(), exports);
    var context_1 = require_context2();
    exports.context = context_1.ContextAPI.getInstance();
    var trace_1 = require_trace();
    exports.trace = trace_1.TraceAPI.getInstance();
    var propagation_1 = require_propagation();
    exports.propagation = propagation_1.PropagationAPI.getInstance();
    var diag_1 = require_diag2();
    exports.diag = diag_1.DiagAPI.instance();
    exports.default = {
      trace: exports.trace,
      context: exports.context,
      propagation: exports.propagation,
      diag: exports.diag
    };
  }
});

// node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js
var require_suppress_tracing = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTracingSuppressed = exports.unsuppressTracing = exports.suppressTracing = void 0;
    var api_1 = require_src();
    var SUPPRESS_TRACING_KEY = api_1.createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function suppressTracing(context) {
      return context.setValue(SUPPRESS_TRACING_KEY, true);
    }
    exports.suppressTracing = suppressTracing;
    function unsuppressTracing(context) {
      return context.deleteValue(SUPPRESS_TRACING_KEY);
    }
    exports.unsuppressTracing = unsuppressTracing;
    function isTracingSuppressed(context) {
      return context.getValue(SUPPRESS_TRACING_KEY) === true;
    }
    exports.isTracingSuppressed = isTracingSuppressed;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/constants.js
var require_constants = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BAGGAGE_MAX_TOTAL_LENGTH = exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = exports.BAGGAGE_HEADER = exports.BAGGAGE_ITEMS_SEPARATOR = exports.BAGGAGE_PROPERTIES_SEPARATOR = exports.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    exports.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    exports.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    exports.BAGGAGE_ITEMS_SEPARATOR = ",";
    exports.BAGGAGE_HEADER = "baggage";
    exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    exports.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/utils.js
var require_utils2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseKeyPairsIntoRecord = exports.parsePairKeyValue = exports.getKeyPairs = exports.serializeKeyPairs = void 0;
    var api_1 = require_src();
    var constants_1 = require_constants();
    var serializeKeyPairs = (keyPairs) => {
      return keyPairs.reduce((hValue, current) => {
        const value = `${hValue}${hValue !== "" ? constants_1.BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
        return value.length > constants_1.BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
      }, "");
    };
    exports.serializeKeyPairs = serializeKeyPairs;
    var getKeyPairs = (baggage) => {
      return baggage.getAllEntries().map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`);
    };
    exports.getKeyPairs = getKeyPairs;
    var parsePairKeyValue = (entry) => {
      const valueProps = entry.split(constants_1.BAGGAGE_PROPERTIES_SEPARATOR);
      if (valueProps.length <= 0)
        return;
      const keyPairPart = valueProps.shift();
      if (!keyPairPart)
        return;
      const keyPair = keyPairPart.split(constants_1.BAGGAGE_KEY_PAIR_SEPARATOR);
      if (keyPair.length !== 2)
        return;
      const key = decodeURIComponent(keyPair[0].trim());
      const value = decodeURIComponent(keyPair[1].trim());
      let metadata;
      if (valueProps.length > 0) {
        metadata = api_1.baggageEntryMetadataFromString(valueProps.join(constants_1.BAGGAGE_PROPERTIES_SEPARATOR));
      }
      return { key, value, metadata };
    };
    exports.parsePairKeyValue = parsePairKeyValue;
    var parseKeyPairsIntoRecord = (value) => {
      if (typeof value !== "string" || value.length === 0)
        return {};
      return value.split(constants_1.BAGGAGE_ITEMS_SEPARATOR).map((entry) => {
        return exports.parsePairKeyValue(entry);
      }).filter((keyPair) => keyPair !== void 0 && keyPair.value.length > 0).reduce((headers, keyPair) => {
        headers[keyPair.key] = keyPair.value;
        return headers;
      }, {});
    };
    exports.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/propagation/HttpBaggagePropagator.js
var require_HttpBaggagePropagator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/propagation/HttpBaggagePropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpBaggagePropagator = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    var constants_1 = require_constants();
    var utils_1 = require_utils2();
    var HttpBaggagePropagator = class {
      inject(context, carrier, setter) {
        const baggage = api_1.propagation.getBaggage(context);
        if (!baggage || suppress_tracing_1.isTracingSuppressed(context))
          return;
        const keyPairs = utils_1.getKeyPairs(baggage).filter((pair) => {
          return pair.length <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS);
        const headerValue = utils_1.serializeKeyPairs(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, constants_1.BAGGAGE_HEADER, headerValue);
        }
      }
      extract(context, carrier, getter) {
        const headerValue = getter.get(carrier, constants_1.BAGGAGE_HEADER);
        if (!headerValue)
          return context;
        const baggage = {};
        if (headerValue.length === 0) {
          return context;
        }
        const pairs = headerValue.split(constants_1.BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach((entry) => {
          const keyPair = utils_1.parsePairKeyValue(entry);
          if (keyPair) {
            const baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context;
        }
        return api_1.propagation.setBaggage(context, api_1.propagation.createBaggage(baggage));
      }
      fields() {
        return [constants_1.BAGGAGE_HEADER];
      }
    };
    exports.HttpBaggagePropagator = HttpBaggagePropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/common/attributes.js
var require_attributes2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/attributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAttributeValue = exports.sanitizeAttributes = void 0;
    function sanitizeAttributes(attributes) {
      const out = {};
      if (attributes == null || typeof attributes !== "object") {
        return out;
      }
      for (const [k, v] of Object.entries(attributes)) {
        if (isAttributeValue(v)) {
          if (Array.isArray(v)) {
            out[k] = v.slice();
          } else {
            out[k] = v;
          }
        }
      }
      return out;
    }
    exports.sanitizeAttributes = sanitizeAttributes;
    function isAttributeValue(val) {
      if (val == null) {
        return true;
      }
      if (Array.isArray(val)) {
        return isHomogeneousAttributeValueArray(val);
      }
      return isValidPrimitiveAttributeValue(val);
    }
    exports.isAttributeValue = isAttributeValue;
    function isHomogeneousAttributeValueArray(arr) {
      let type;
      for (const element of arr) {
        if (element == null)
          continue;
        if (!type) {
          if (isValidPrimitiveAttributeValue(element)) {
            type = typeof element;
            continue;
          }
          return false;
        }
        if (typeof element === type) {
          continue;
        }
        return false;
      }
      return true;
    }
    function isValidPrimitiveAttributeValue(val) {
      switch (typeof val) {
        case "number":
          return true;
        case "boolean":
          return true;
        case "string":
          return true;
      }
      return false;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js
var require_logging_error_handler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggingErrorHandler = void 0;
    var api_1 = require_src();
    function loggingErrorHandler() {
      return (ex) => {
        api_1.diag.error(stringifyException(ex));
      };
    }
    exports.loggingErrorHandler = loggingErrorHandler;
    function stringifyException(ex) {
      if (typeof ex === "string") {
        return ex;
      } else {
        return JSON.stringify(flattenException(ex));
      }
    }
    function flattenException(ex) {
      const result = {};
      let current = ex;
      while (current !== null) {
        Object.getOwnPropertyNames(current).forEach((propertyName) => {
          if (result[propertyName])
            return;
          const value = current[propertyName];
          if (value) {
            result[propertyName] = String(value);
          }
        });
        current = Object.getPrototypeOf(current);
      }
      return result;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/common/global-error-handler.js
var require_global_error_handler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/global-error-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globalErrorHandler = exports.setGlobalErrorHandler = void 0;
    var logging_error_handler_1 = require_logging_error_handler();
    var delegateHandler = logging_error_handler_1.loggingErrorHandler();
    function setGlobalErrorHandler(handler) {
      delegateHandler = handler;
    }
    exports.setGlobalErrorHandler = setGlobalErrorHandler;
    var globalErrorHandler = (ex) => {
      try {
        delegateHandler(ex);
      } catch (_a) {
      }
    };
    exports.globalErrorHandler = globalErrorHandler;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/sampling.js
var require_sampling = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/sampling.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TracesSamplerValues = void 0;
    var TracesSamplerValues;
    (function(TracesSamplerValues2) {
      TracesSamplerValues2["AlwaysOff"] = "always_off";
      TracesSamplerValues2["AlwaysOn"] = "always_on";
      TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
      TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
      TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
      TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
    })(TracesSamplerValues = exports.TracesSamplerValues || (exports.TracesSamplerValues = {}));
  }
});

// node_modules/@opentelemetry/core/build/src/utils/environment.js
var require_environment = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/environment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseEnvironment = exports.DEFAULT_ENVIRONMENT = void 0;
    var api_1 = require_src();
    var sampling_1 = require_sampling();
    var DEFAULT_LIST_SEPARATOR = ",";
    var ENVIRONMENT_NUMBERS_KEYS = [
      "OTEL_BSP_EXPORT_TIMEOUT",
      "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
      "OTEL_BSP_MAX_QUEUE_SIZE",
      "OTEL_BSP_SCHEDULE_DELAY",
      "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
      "OTEL_SPAN_EVENT_COUNT_LIMIT",
      "OTEL_SPAN_LINK_COUNT_LIMIT"
    ];
    function isEnvVarANumber(key) {
      return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
    }
    var ENVIRONMENT_LISTS_KEYS = [
      "OTEL_NO_PATCH_MODULES",
      "OTEL_PROPAGATORS"
    ];
    function isEnvVarAList(key) {
      return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
    }
    exports.DEFAULT_ENVIRONMENT = {
      CONTAINER_NAME: "",
      ECS_CONTAINER_METADATA_URI_V4: "",
      ECS_CONTAINER_METADATA_URI: "",
      HOSTNAME: "",
      KUBERNETES_SERVICE_HOST: "",
      NAMESPACE: "",
      OTEL_BSP_EXPORT_TIMEOUT: 3e4,
      OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
      OTEL_BSP_MAX_QUEUE_SIZE: 2048,
      OTEL_BSP_SCHEDULE_DELAY: 5e3,
      OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
      OTEL_EXPORTER_JAEGER_ENDPOINT: "",
      OTEL_EXPORTER_JAEGER_PASSWORD: "",
      OTEL_EXPORTER_JAEGER_USER: "",
      OTEL_EXPORTER_OTLP_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_HEADERS: "",
      OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
      OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
      OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
      OTEL_LOG_LEVEL: api_1.DiagLogLevel.INFO,
      OTEL_NO_PATCH_MODULES: [],
      OTEL_PROPAGATORS: ["tracecontext", "baggage"],
      OTEL_RESOURCE_ATTRIBUTES: "",
      OTEL_SERVICE_NAME: "",
      OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: 128,
      OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
      OTEL_SPAN_LINK_COUNT_LIMIT: 128,
      OTEL_TRACES_EXPORTER: "none",
      OTEL_TRACES_SAMPLER: sampling_1.TracesSamplerValues.ParentBasedAlwaysOn,
      OTEL_TRACES_SAMPLER_ARG: ""
    };
    function parseNumber(name, environment, values, min = -Infinity, max = Infinity) {
      if (typeof values[name] !== "undefined") {
        const value = Number(values[name]);
        if (!isNaN(value)) {
          if (value < min) {
            environment[name] = min;
          } else if (value > max) {
            environment[name] = max;
          } else {
            environment[name] = value;
          }
        }
      }
    }
    function parseStringList(name, output, input, separator = DEFAULT_LIST_SEPARATOR) {
      const givenValue = input[name];
      if (typeof givenValue === "string") {
        output[name] = givenValue.split(separator).map((v) => v.trim());
      }
    }
    var logLevelMap = {
      ALL: api_1.DiagLogLevel.ALL,
      VERBOSE: api_1.DiagLogLevel.VERBOSE,
      DEBUG: api_1.DiagLogLevel.DEBUG,
      INFO: api_1.DiagLogLevel.INFO,
      WARN: api_1.DiagLogLevel.WARN,
      ERROR: api_1.DiagLogLevel.ERROR,
      NONE: api_1.DiagLogLevel.NONE
    };
    function setLogLevelFromEnv(key, environment, values) {
      const value = values[key];
      if (typeof value === "string") {
        const theLevel = logLevelMap[value.toUpperCase()];
        if (theLevel != null) {
          environment[key] = theLevel;
        }
      }
    }
    function parseEnvironment(values) {
      const environment = {};
      for (const env in exports.DEFAULT_ENVIRONMENT) {
        const key = env;
        switch (key) {
          case "OTEL_LOG_LEVEL":
            setLogLevelFromEnv(key, environment, values);
            break;
          default:
            if (isEnvVarANumber(key)) {
              parseNumber(key, environment, values);
            } else if (isEnvVarAList(key)) {
              parseStringList(key, environment, values);
            } else {
              const value = values[key];
              if (typeof value !== "undefined" && value !== null) {
                environment[key] = String(value);
              }
            }
        }
      }
      return environment;
    }
    exports.parseEnvironment = parseEnvironment;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/environment.js
var require_environment2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/environment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEnv = void 0;
    var os2 = require("os");
    var environment_1 = require_environment();
    function getEnv() {
      const processEnv = environment_1.parseEnvironment(process.env);
      return Object.assign({
        HOSTNAME: os2.hostname()
      }, environment_1.DEFAULT_ENVIRONMENT, processEnv);
    }
    exports.getEnv = getEnv;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.js
var require_hex_to_base64 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hexToBase64 = void 0;
    function hexToBase64(hexStr) {
      const hexStrLen = hexStr.length;
      let hexAsciiCharsStr = "";
      for (let i = 0; i < hexStrLen; i += 2) {
        const hexPair = hexStr.substring(i, i + 2);
        const hexVal = parseInt(hexPair, 16);
        hexAsciiCharsStr += String.fromCharCode(hexVal);
      }
      return Buffer.from(hexAsciiCharsStr, "ascii").toString("base64");
    }
    exports.hexToBase64 = hexToBase64;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.js
var require_RandomIdGenerator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = void 0;
    var SPAN_ID_BYTES = 8;
    var TRACE_ID_BYTES = 16;
    var RandomIdGenerator = class {
      constructor() {
        this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
        this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
      }
    };
    exports.RandomIdGenerator = RandomIdGenerator;
    var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
    function getIdGenerator(bytes) {
      return function generateId() {
        for (let i = 0; i < bytes / 4; i++) {
          SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
        }
        for (let i = 0; i < bytes; i++) {
          if (SHARED_BUFFER[i] > 0) {
            break;
          } else if (i === bytes - 1) {
            SHARED_BUFFER[bytes - 1] = 1;
          }
        }
        return SHARED_BUFFER.toString("hex", 0, bytes);
      };
    }
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/performance.js
var require_performance = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/performance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.otperformance = void 0;
    var perf_hooks_1 = require("perf_hooks");
    exports.otperformance = perf_hooks_1.performance;
  }
});

// node_modules/@opentelemetry/core/build/src/version.js
var require_version2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "0.23.0";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js
var require_SemanticAttributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RpcGrpcStatusCodeValues = exports.MessagingOperationValues = exports.MessagingDestinationKindValues = exports.HttpFlavorValues = exports.NetTransportValues = exports.FaasInvokedProviderValues = exports.FaasDocumentOperationValues = exports.FaasTriggerValues = exports.DbCassandraConsistencyLevelValues = exports.DbSystemValues = exports.SemanticAttributes = void 0;
    exports.SemanticAttributes = {
      DB_SYSTEM: "db.system",
      DB_CONNECTION_STRING: "db.connection_string",
      DB_USER: "db.user",
      DB_JDBC_DRIVER_CLASSNAME: "db.jdbc.driver_classname",
      DB_NAME: "db.name",
      DB_STATEMENT: "db.statement",
      DB_OPERATION: "db.operation",
      DB_MSSQL_INSTANCE_NAME: "db.mssql.instance_name",
      DB_CASSANDRA_KEYSPACE: "db.cassandra.keyspace",
      DB_CASSANDRA_PAGE_SIZE: "db.cassandra.page_size",
      DB_CASSANDRA_CONSISTENCY_LEVEL: "db.cassandra.consistency_level",
      DB_CASSANDRA_TABLE: "db.cassandra.table",
      DB_CASSANDRA_IDEMPOTENCE: "db.cassandra.idempotence",
      DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT: "db.cassandra.speculative_execution_count",
      DB_CASSANDRA_COORDINATOR_ID: "db.cassandra.coordinator.id",
      DB_CASSANDRA_COORDINATOR_DC: "db.cassandra.coordinator.dc",
      DB_HBASE_NAMESPACE: "db.hbase.namespace",
      DB_REDIS_DATABASE_INDEX: "db.redis.database_index",
      DB_MONGODB_COLLECTION: "db.mongodb.collection",
      DB_SQL_TABLE: "db.sql.table",
      EXCEPTION_TYPE: "exception.type",
      EXCEPTION_MESSAGE: "exception.message",
      EXCEPTION_STACKTRACE: "exception.stacktrace",
      EXCEPTION_ESCAPED: "exception.escaped",
      FAAS_TRIGGER: "faas.trigger",
      FAAS_EXECUTION: "faas.execution",
      FAAS_DOCUMENT_COLLECTION: "faas.document.collection",
      FAAS_DOCUMENT_OPERATION: "faas.document.operation",
      FAAS_DOCUMENT_TIME: "faas.document.time",
      FAAS_DOCUMENT_NAME: "faas.document.name",
      FAAS_TIME: "faas.time",
      FAAS_CRON: "faas.cron",
      FAAS_COLDSTART: "faas.coldstart",
      FAAS_INVOKED_NAME: "faas.invoked_name",
      FAAS_INVOKED_PROVIDER: "faas.invoked_provider",
      FAAS_INVOKED_REGION: "faas.invoked_region",
      NET_TRANSPORT: "net.transport",
      NET_PEER_IP: "net.peer.ip",
      NET_PEER_PORT: "net.peer.port",
      NET_PEER_NAME: "net.peer.name",
      NET_HOST_IP: "net.host.ip",
      NET_HOST_PORT: "net.host.port",
      NET_HOST_NAME: "net.host.name",
      PEER_SERVICE: "peer.service",
      ENDUSER_ID: "enduser.id",
      ENDUSER_ROLE: "enduser.role",
      ENDUSER_SCOPE: "enduser.scope",
      THREAD_ID: "thread.id",
      THREAD_NAME: "thread.name",
      CODE_FUNCTION: "code.function",
      CODE_NAMESPACE: "code.namespace",
      CODE_FILEPATH: "code.filepath",
      CODE_LINENO: "code.lineno",
      HTTP_METHOD: "http.method",
      HTTP_URL: "http.url",
      HTTP_TARGET: "http.target",
      HTTP_HOST: "http.host",
      HTTP_SCHEME: "http.scheme",
      HTTP_STATUS_CODE: "http.status_code",
      HTTP_FLAVOR: "http.flavor",
      HTTP_USER_AGENT: "http.user_agent",
      HTTP_REQUEST_CONTENT_LENGTH: "http.request_content_length",
      HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED: "http.request_content_length_uncompressed",
      HTTP_RESPONSE_CONTENT_LENGTH: "http.response_content_length",
      HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED: "http.response_content_length_uncompressed",
      HTTP_SERVER_NAME: "http.server_name",
      HTTP_ROUTE: "http.route",
      HTTP_CLIENT_IP: "http.client_ip",
      AWS_DYNAMODB_TABLE_NAMES: "aws.dynamodb.table_names",
      AWS_DYNAMODB_CONSUMED_CAPACITY: "aws.dynamodb.consumed_capacity",
      AWS_DYNAMODB_ITEM_COLLECTION_METRICS: "aws.dynamodb.item_collection_metrics",
      AWS_DYNAMODB_PROVISIONED_READ_CAPACITY: "aws.dynamodb.provisioned_read_capacity",
      AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY: "aws.dynamodb.provisioned_write_capacity",
      AWS_DYNAMODB_CONSISTENT_READ: "aws.dynamodb.consistent_read",
      AWS_DYNAMODB_PROJECTION: "aws.dynamodb.projection",
      AWS_DYNAMODB_LIMIT: "aws.dynamodb.limit",
      AWS_DYNAMODB_ATTRIBUTES_TO_GET: "aws.dynamodb.attributes_to_get",
      AWS_DYNAMODB_INDEX_NAME: "aws.dynamodb.index_name",
      AWS_DYNAMODB_SELECT: "aws.dynamodb.select",
      AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES: "aws.dynamodb.global_secondary_indexes",
      AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: "aws.dynamodb.local_secondary_indexes",
      AWS_DYNAMODB_EXCLUSIVE_START_TABLE: "aws.dynamodb.exclusive_start_table",
      AWS_DYNAMODB_TABLE_COUNT: "aws.dynamodb.table_count",
      AWS_DYNAMODB_SCAN_FORWARD: "aws.dynamodb.scan_forward",
      AWS_DYNAMODB_SEGMENT: "aws.dynamodb.segment",
      AWS_DYNAMODB_TOTAL_SEGMENTS: "aws.dynamodb.total_segments",
      AWS_DYNAMODB_COUNT: "aws.dynamodb.count",
      AWS_DYNAMODB_SCANNED_COUNT: "aws.dynamodb.scanned_count",
      AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: "aws.dynamodb.attribute_definitions",
      AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES: "aws.dynamodb.global_secondary_index_updates",
      MESSAGING_SYSTEM: "messaging.system",
      MESSAGING_DESTINATION: "messaging.destination",
      MESSAGING_DESTINATION_KIND: "messaging.destination_kind",
      MESSAGING_TEMP_DESTINATION: "messaging.temp_destination",
      MESSAGING_PROTOCOL: "messaging.protocol",
      MESSAGING_PROTOCOL_VERSION: "messaging.protocol_version",
      MESSAGING_URL: "messaging.url",
      MESSAGING_MESSAGE_ID: "messaging.message_id",
      MESSAGING_CONVERSATION_ID: "messaging.conversation_id",
      MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: "messaging.message_payload_size_bytes",
      MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES: "messaging.message_payload_compressed_size_bytes",
      MESSAGING_OPERATION: "messaging.operation",
      MESSAGING_RABBITMQ_ROUTING_KEY: "messaging.rabbitmq.routing_key",
      MESSAGING_KAFKA_MESSAGE_KEY: "messaging.kafka.message_key",
      MESSAGING_KAFKA_CONSUMER_GROUP: "messaging.kafka.consumer_group",
      MESSAGING_KAFKA_CLIENT_ID: "messaging.kafka.client_id",
      MESSAGING_KAFKA_PARTITION: "messaging.kafka.partition",
      MESSAGING_KAFKA_TOMBSTONE: "messaging.kafka.tombstone",
      RPC_SYSTEM: "rpc.system",
      RPC_SERVICE: "rpc.service",
      RPC_METHOD: "rpc.method",
      RPC_GRPC_STATUS_CODE: "rpc.grpc.status_code",
      RPC_JSONRPC_VERSION: "rpc.jsonrpc.version",
      RPC_JSONRPC_METHOD: "rpc.jsonrpc.method",
      RPC_JSONRPC_REQUEST_ID: "rpc.jsonrpc.request_id",
      RPC_JSONRPC_ERROR_CODE: "rpc.jsonrpc.error_code",
      RPC_JSONRPC_ERROR_MESSAGE: "rpc.jsonrpc.error_message"
    };
    var DbSystemValues;
    (function(DbSystemValues2) {
      DbSystemValues2["OTHER_SQL"] = "other_sql";
      DbSystemValues2["MSSQL"] = "mssql";
      DbSystemValues2["MYSQL"] = "mysql";
      DbSystemValues2["ORACLE"] = "oracle";
      DbSystemValues2["DB2"] = "db2";
      DbSystemValues2["POSTGRESQL"] = "postgresql";
      DbSystemValues2["REDSHIFT"] = "redshift";
      DbSystemValues2["HIVE"] = "hive";
      DbSystemValues2["CLOUDSCAPE"] = "cloudscape";
      DbSystemValues2["HSQLDB"] = "hsqldb";
      DbSystemValues2["PROGRESS"] = "progress";
      DbSystemValues2["MAXDB"] = "maxdb";
      DbSystemValues2["HANADB"] = "hanadb";
      DbSystemValues2["INGRES"] = "ingres";
      DbSystemValues2["FIRSTSQL"] = "firstsql";
      DbSystemValues2["EDB"] = "edb";
      DbSystemValues2["CACHE"] = "cache";
      DbSystemValues2["ADABAS"] = "adabas";
      DbSystemValues2["FIREBIRD"] = "firebird";
      DbSystemValues2["DERBY"] = "derby";
      DbSystemValues2["FILEMAKER"] = "filemaker";
      DbSystemValues2["INFORMIX"] = "informix";
      DbSystemValues2["INSTANTDB"] = "instantdb";
      DbSystemValues2["INTERBASE"] = "interbase";
      DbSystemValues2["MARIADB"] = "mariadb";
      DbSystemValues2["NETEZZA"] = "netezza";
      DbSystemValues2["PERVASIVE"] = "pervasive";
      DbSystemValues2["POINTBASE"] = "pointbase";
      DbSystemValues2["SQLITE"] = "sqlite";
      DbSystemValues2["SYBASE"] = "sybase";
      DbSystemValues2["TERADATA"] = "teradata";
      DbSystemValues2["VERTICA"] = "vertica";
      DbSystemValues2["H2"] = "h2";
      DbSystemValues2["COLDFUSION"] = "coldfusion";
      DbSystemValues2["CASSANDRA"] = "cassandra";
      DbSystemValues2["HBASE"] = "hbase";
      DbSystemValues2["MONGODB"] = "mongodb";
      DbSystemValues2["REDIS"] = "redis";
      DbSystemValues2["COUCHBASE"] = "couchbase";
      DbSystemValues2["COUCHDB"] = "couchdb";
      DbSystemValues2["COSMOSDB"] = "cosmosdb";
      DbSystemValues2["DYNAMODB"] = "dynamodb";
      DbSystemValues2["NEO4J"] = "neo4j";
      DbSystemValues2["GEODE"] = "geode";
      DbSystemValues2["ELASTICSEARCH"] = "elasticsearch";
      DbSystemValues2["MEMCACHED"] = "memcached";
      DbSystemValues2["COCKROACHDB"] = "cockroachdb";
    })(DbSystemValues = exports.DbSystemValues || (exports.DbSystemValues = {}));
    var DbCassandraConsistencyLevelValues;
    (function(DbCassandraConsistencyLevelValues2) {
      DbCassandraConsistencyLevelValues2["ALL"] = "all";
      DbCassandraConsistencyLevelValues2["EACH_QUORUM"] = "each_quorum";
      DbCassandraConsistencyLevelValues2["QUORUM"] = "quorum";
      DbCassandraConsistencyLevelValues2["LOCAL_QUORUM"] = "local_quorum";
      DbCassandraConsistencyLevelValues2["ONE"] = "one";
      DbCassandraConsistencyLevelValues2["TWO"] = "two";
      DbCassandraConsistencyLevelValues2["THREE"] = "three";
      DbCassandraConsistencyLevelValues2["LOCAL_ONE"] = "local_one";
      DbCassandraConsistencyLevelValues2["ANY"] = "any";
      DbCassandraConsistencyLevelValues2["SERIAL"] = "serial";
      DbCassandraConsistencyLevelValues2["LOCAL_SERIAL"] = "local_serial";
    })(DbCassandraConsistencyLevelValues = exports.DbCassandraConsistencyLevelValues || (exports.DbCassandraConsistencyLevelValues = {}));
    var FaasTriggerValues;
    (function(FaasTriggerValues2) {
      FaasTriggerValues2["DATASOURCE"] = "datasource";
      FaasTriggerValues2["HTTP"] = "http";
      FaasTriggerValues2["PUBSUB"] = "pubsub";
      FaasTriggerValues2["TIMER"] = "timer";
      FaasTriggerValues2["OTHER"] = "other";
    })(FaasTriggerValues = exports.FaasTriggerValues || (exports.FaasTriggerValues = {}));
    var FaasDocumentOperationValues;
    (function(FaasDocumentOperationValues2) {
      FaasDocumentOperationValues2["INSERT"] = "insert";
      FaasDocumentOperationValues2["EDIT"] = "edit";
      FaasDocumentOperationValues2["DELETE"] = "delete";
    })(FaasDocumentOperationValues = exports.FaasDocumentOperationValues || (exports.FaasDocumentOperationValues = {}));
    var FaasInvokedProviderValues;
    (function(FaasInvokedProviderValues2) {
      FaasInvokedProviderValues2["AWS"] = "aws";
      FaasInvokedProviderValues2["AZURE"] = "azure";
      FaasInvokedProviderValues2["GCP"] = "gcp";
    })(FaasInvokedProviderValues = exports.FaasInvokedProviderValues || (exports.FaasInvokedProviderValues = {}));
    var NetTransportValues;
    (function(NetTransportValues2) {
      NetTransportValues2["IP_TCP"] = "ip_tcp";
      NetTransportValues2["IP_UDP"] = "ip_udp";
      NetTransportValues2["IP"] = "ip";
      NetTransportValues2["UNIX"] = "unix";
      NetTransportValues2["PIPE"] = "pipe";
      NetTransportValues2["INPROC"] = "inproc";
      NetTransportValues2["OTHER"] = "other";
    })(NetTransportValues = exports.NetTransportValues || (exports.NetTransportValues = {}));
    var HttpFlavorValues;
    (function(HttpFlavorValues2) {
      HttpFlavorValues2["HTTP_1_0"] = "1.0";
      HttpFlavorValues2["HTTP_1_1"] = "1.1";
      HttpFlavorValues2["HTTP_2_0"] = "2.0";
      HttpFlavorValues2["SPDY"] = "SPDY";
      HttpFlavorValues2["QUIC"] = "QUIC";
    })(HttpFlavorValues = exports.HttpFlavorValues || (exports.HttpFlavorValues = {}));
    var MessagingDestinationKindValues;
    (function(MessagingDestinationKindValues2) {
      MessagingDestinationKindValues2["QUEUE"] = "queue";
      MessagingDestinationKindValues2["TOPIC"] = "topic";
    })(MessagingDestinationKindValues = exports.MessagingDestinationKindValues || (exports.MessagingDestinationKindValues = {}));
    var MessagingOperationValues;
    (function(MessagingOperationValues2) {
      MessagingOperationValues2["RECEIVE"] = "receive";
      MessagingOperationValues2["PROCESS"] = "process";
    })(MessagingOperationValues = exports.MessagingOperationValues || (exports.MessagingOperationValues = {}));
    var RpcGrpcStatusCodeValues;
    (function(RpcGrpcStatusCodeValues2) {
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["OK"] = 0] = "OK";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["CANCELLED"] = 1] = "CANCELLED";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["UNKNOWN"] = 2] = "UNKNOWN";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["NOT_FOUND"] = 5] = "NOT_FOUND";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["ABORTED"] = 10] = "ABORTED";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["INTERNAL"] = 13] = "INTERNAL";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["UNAVAILABLE"] = 14] = "UNAVAILABLE";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["DATA_LOSS"] = 15] = "DATA_LOSS";
      RpcGrpcStatusCodeValues2[RpcGrpcStatusCodeValues2["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    })(RpcGrpcStatusCodeValues = exports.RpcGrpcStatusCodeValues || (exports.RpcGrpcStatusCodeValues = {}));
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js
var require_trace2 = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_SemanticAttributes(), exports);
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/resource/ResourceAttributes.js
var require_ResourceAttributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/resource/ResourceAttributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TelemetrySdkLanguageValues = exports.OsTypeValues = exports.HostArchValues = exports.AwsEcsLaunchtypeValues = exports.CloudPlatformValues = exports.CloudProviderValues = exports.ResourceAttributes = void 0;
    exports.ResourceAttributes = {
      CLOUD_PROVIDER: "cloud.provider",
      CLOUD_ACCOUNT_ID: "cloud.account.id",
      CLOUD_REGION: "cloud.region",
      CLOUD_AVAILABILITY_ZONE: "cloud.availability_zone",
      CLOUD_PLATFORM: "cloud.platform",
      AWS_ECS_CONTAINER_ARN: "aws.ecs.container.arn",
      AWS_ECS_CLUSTER_ARN: "aws.ecs.cluster.arn",
      AWS_ECS_LAUNCHTYPE: "aws.ecs.launchtype",
      AWS_ECS_TASK_ARN: "aws.ecs.task.arn",
      AWS_ECS_TASK_FAMILY: "aws.ecs.task.family",
      AWS_ECS_TASK_REVISION: "aws.ecs.task.revision",
      AWS_EKS_CLUSTER_ARN: "aws.eks.cluster.arn",
      AWS_LOG_GROUP_NAMES: "aws.log.group.names",
      AWS_LOG_GROUP_ARNS: "aws.log.group.arns",
      AWS_LOG_STREAM_NAMES: "aws.log.stream.names",
      AWS_LOG_STREAM_ARNS: "aws.log.stream.arns",
      CONTAINER_NAME: "container.name",
      CONTAINER_ID: "container.id",
      CONTAINER_RUNTIME: "container.runtime",
      CONTAINER_IMAGE_NAME: "container.image.name",
      CONTAINER_IMAGE_TAG: "container.image.tag",
      DEPLOYMENT_ENVIRONMENT: "deployment.environment",
      DEVICE_ID: "device.id",
      DEVICE_MODEL_IDENTIFIER: "device.model.identifier",
      DEVICE_MODEL_NAME: "device.model.name",
      FAAS_NAME: "faas.name",
      FAAS_ID: "faas.id",
      FAAS_VERSION: "faas.version",
      FAAS_INSTANCE: "faas.instance",
      FAAS_MAX_MEMORY: "faas.max_memory",
      HOST_ID: "host.id",
      HOST_NAME: "host.name",
      HOST_TYPE: "host.type",
      HOST_ARCH: "host.arch",
      HOST_IMAGE_NAME: "host.image.name",
      HOST_IMAGE_ID: "host.image.id",
      HOST_IMAGE_VERSION: "host.image.version",
      K8S_CLUSTER_NAME: "k8s.cluster.name",
      K8S_NODE_NAME: "k8s.node.name",
      K8S_NODE_UID: "k8s.node.uid",
      K8S_NAMESPACE_NAME: "k8s.namespace.name",
      K8S_POD_UID: "k8s.pod.uid",
      K8S_POD_NAME: "k8s.pod.name",
      K8S_CONTAINER_NAME: "k8s.container.name",
      K8S_REPLICASET_UID: "k8s.replicaset.uid",
      K8S_REPLICASET_NAME: "k8s.replicaset.name",
      K8S_DEPLOYMENT_UID: "k8s.deployment.uid",
      K8S_DEPLOYMENT_NAME: "k8s.deployment.name",
      K8S_STATEFULSET_UID: "k8s.statefulset.uid",
      K8S_STATEFULSET_NAME: "k8s.statefulset.name",
      K8S_DAEMONSET_UID: "k8s.daemonset.uid",
      K8S_DAEMONSET_NAME: "k8s.daemonset.name",
      K8S_JOB_UID: "k8s.job.uid",
      K8S_JOB_NAME: "k8s.job.name",
      K8S_CRONJOB_UID: "k8s.cronjob.uid",
      K8S_CRONJOB_NAME: "k8s.cronjob.name",
      OS_TYPE: "os.type",
      OS_DESCRIPTION: "os.description",
      OS_NAME: "os.name",
      OS_VERSION: "os.version",
      PROCESS_PID: "process.pid",
      PROCESS_EXECUTABLE_NAME: "process.executable.name",
      PROCESS_EXECUTABLE_PATH: "process.executable.path",
      PROCESS_COMMAND: "process.command",
      PROCESS_COMMAND_LINE: "process.command_line",
      PROCESS_COMMAND_ARGS: "process.command_args",
      PROCESS_OWNER: "process.owner",
      PROCESS_RUNTIME_NAME: "process.runtime.name",
      PROCESS_RUNTIME_VERSION: "process.runtime.version",
      PROCESS_RUNTIME_DESCRIPTION: "process.runtime.description",
      SERVICE_NAME: "service.name",
      SERVICE_NAMESPACE: "service.namespace",
      SERVICE_INSTANCE_ID: "service.instance.id",
      SERVICE_VERSION: "service.version",
      TELEMETRY_SDK_NAME: "telemetry.sdk.name",
      TELEMETRY_SDK_LANGUAGE: "telemetry.sdk.language",
      TELEMETRY_SDK_VERSION: "telemetry.sdk.version",
      TELEMETRY_AUTO_VERSION: "telemetry.auto.version",
      WEBENGINE_NAME: "webengine.name",
      WEBENGINE_VERSION: "webengine.version",
      WEBENGINE_DESCRIPTION: "webengine.description"
    };
    var CloudProviderValues;
    (function(CloudProviderValues2) {
      CloudProviderValues2["AWS"] = "aws";
      CloudProviderValues2["AZURE"] = "azure";
      CloudProviderValues2["GCP"] = "gcp";
    })(CloudProviderValues = exports.CloudProviderValues || (exports.CloudProviderValues = {}));
    var CloudPlatformValues;
    (function(CloudPlatformValues2) {
      CloudPlatformValues2["AWS_EC2"] = "aws_ec2";
      CloudPlatformValues2["AWS_ECS"] = "aws_ecs";
      CloudPlatformValues2["AWS_EKS"] = "aws_eks";
      CloudPlatformValues2["AWS_LAMBDA"] = "aws_lambda";
      CloudPlatformValues2["AWS_ELASTIC_BEANSTALK"] = "aws_elastic_beanstalk";
      CloudPlatformValues2["AZURE_VM"] = "azure_vm";
      CloudPlatformValues2["AZURE_CONTAINER_INSTANCES"] = "azure_container_instances";
      CloudPlatformValues2["AZURE_AKS"] = "azure_aks";
      CloudPlatformValues2["AZURE_FUNCTIONS"] = "azure_functions";
      CloudPlatformValues2["AZURE_APP_SERVICE"] = "azure_app_service";
      CloudPlatformValues2["GCP_COMPUTE_ENGINE"] = "gcp_compute_engine";
      CloudPlatformValues2["GCP_CLOUD_RUN"] = "gcp_cloud_run";
      CloudPlatformValues2["GCP_KUBERNETES_ENGINE"] = "gcp_kubernetes_engine";
      CloudPlatformValues2["GCP_CLOUD_FUNCTIONS"] = "gcp_cloud_functions";
      CloudPlatformValues2["GCP_APP_ENGINE"] = "gcp_app_engine";
    })(CloudPlatformValues = exports.CloudPlatformValues || (exports.CloudPlatformValues = {}));
    var AwsEcsLaunchtypeValues;
    (function(AwsEcsLaunchtypeValues2) {
      AwsEcsLaunchtypeValues2["EC2"] = "ec2";
      AwsEcsLaunchtypeValues2["FARGATE"] = "fargate";
    })(AwsEcsLaunchtypeValues = exports.AwsEcsLaunchtypeValues || (exports.AwsEcsLaunchtypeValues = {}));
    var HostArchValues;
    (function(HostArchValues2) {
      HostArchValues2["AMD64"] = "amd64";
      HostArchValues2["ARM32"] = "arm32";
      HostArchValues2["ARM64"] = "arm64";
      HostArchValues2["IA64"] = "ia64";
      HostArchValues2["PPC32"] = "ppc32";
      HostArchValues2["PPC64"] = "ppc64";
      HostArchValues2["X86"] = "x86";
    })(HostArchValues = exports.HostArchValues || (exports.HostArchValues = {}));
    var OsTypeValues;
    (function(OsTypeValues2) {
      OsTypeValues2["WINDOWS"] = "windows";
      OsTypeValues2["LINUX"] = "linux";
      OsTypeValues2["DARWIN"] = "darwin";
      OsTypeValues2["FREEBSD"] = "freebsd";
      OsTypeValues2["NETBSD"] = "netbsd";
      OsTypeValues2["OPENBSD"] = "openbsd";
      OsTypeValues2["DRAGONFLYBSD"] = "dragonflybsd";
      OsTypeValues2["HPUX"] = "hpux";
      OsTypeValues2["AIX"] = "aix";
      OsTypeValues2["SOLARIS"] = "solaris";
      OsTypeValues2["Z_OS"] = "z_os";
    })(OsTypeValues = exports.OsTypeValues || (exports.OsTypeValues = {}));
    var TelemetrySdkLanguageValues;
    (function(TelemetrySdkLanguageValues2) {
      TelemetrySdkLanguageValues2["CPP"] = "cpp";
      TelemetrySdkLanguageValues2["DOTNET"] = "dotnet";
      TelemetrySdkLanguageValues2["ERLANG"] = "erlang";
      TelemetrySdkLanguageValues2["GO"] = "go";
      TelemetrySdkLanguageValues2["JAVA"] = "java";
      TelemetrySdkLanguageValues2["NODEJS"] = "nodejs";
      TelemetrySdkLanguageValues2["PHP"] = "php";
      TelemetrySdkLanguageValues2["PYTHON"] = "python";
      TelemetrySdkLanguageValues2["RUBY"] = "ruby";
      TelemetrySdkLanguageValues2["WEBJS"] = "webjs";
    })(TelemetrySdkLanguageValues = exports.TelemetrySdkLanguageValues || (exports.TelemetrySdkLanguageValues = {}));
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js
var require_resource = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_ResourceAttributes(), exports);
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/index.js
var require_src2 = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_trace2(), exports);
    __exportStar(require_resource(), exports);
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js
var require_sdk_info = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SDK_INFO = void 0;
    var version_1 = require_version2();
    var semantic_conventions_1 = require_src2();
    exports.SDK_INFO = {
      [semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_NAME]: "opentelemetry",
      [semantic_conventions_1.ResourceAttributes.PROCESS_RUNTIME_NAME]: "node",
      [semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_LANGUAGE]: semantic_conventions_1.TelemetrySdkLanguageValues.NODEJS,
      [semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_VERSION]: version_1.VERSION
    };
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/timer-util.js
var require_timer_util = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/timer-util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unrefTimer = void 0;
    function unrefTimer(timer) {
      timer.unref();
    }
    exports.unrefTimer = unrefTimer;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/index.js
var require_node2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_environment2(), exports);
    __exportStar(require_hex_to_base64(), exports);
    __exportStar(require_RandomIdGenerator(), exports);
    __exportStar(require_performance(), exports);
    __exportStar(require_sdk_info(), exports);
    __exportStar(require_timer_util(), exports);
  }
});

// node_modules/@opentelemetry/core/build/src/platform/index.js
var require_platform2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node2(), exports);
  }
});

// node_modules/@opentelemetry/core/build/src/common/time.js
var require_time = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTimeInput = exports.isTimeInputHrTime = exports.hrTimeToMicroseconds = exports.hrTimeToMilliseconds = exports.hrTimeToNanoseconds = exports.hrTimeToTimeStamp = exports.hrTimeDuration = exports.timeInputToHrTime = exports.hrTime = void 0;
    var platform_1 = require_platform2();
    var NANOSECOND_DIGITS = 9;
    var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
    function numberToHrtime(epochMillis) {
      const epochSeconds = epochMillis / 1e3;
      const seconds = Math.trunc(epochSeconds);
      const nanos = Number((epochSeconds - seconds).toFixed(NANOSECOND_DIGITS)) * SECOND_TO_NANOSECONDS;
      return [seconds, nanos];
    }
    function getTimeOrigin() {
      let timeOrigin = platform_1.otperformance.timeOrigin;
      if (typeof timeOrigin !== "number") {
        const perf = platform_1.otperformance;
        timeOrigin = perf.timing && perf.timing.fetchStart;
      }
      return timeOrigin;
    }
    function hrTime(performanceNow) {
      const timeOrigin = numberToHrtime(getTimeOrigin());
      const now = numberToHrtime(typeof performanceNow === "number" ? performanceNow : platform_1.otperformance.now());
      let seconds = timeOrigin[0] + now[0];
      let nanos = timeOrigin[1] + now[1];
      if (nanos > SECOND_TO_NANOSECONDS) {
        nanos -= SECOND_TO_NANOSECONDS;
        seconds += 1;
      }
      return [seconds, nanos];
    }
    exports.hrTime = hrTime;
    function timeInputToHrTime(time) {
      if (isTimeInputHrTime(time)) {
        return time;
      } else if (typeof time === "number") {
        if (time < getTimeOrigin()) {
          return hrTime(time);
        } else {
          return numberToHrtime(time);
        }
      } else if (time instanceof Date) {
        return numberToHrtime(time.getTime());
      } else {
        throw TypeError("Invalid input type");
      }
    }
    exports.timeInputToHrTime = timeInputToHrTime;
    function hrTimeDuration(startTime, endTime) {
      let seconds = endTime[0] - startTime[0];
      let nanos = endTime[1] - startTime[1];
      if (nanos < 0) {
        seconds -= 1;
        nanos += SECOND_TO_NANOSECONDS;
      }
      return [seconds, nanos];
    }
    exports.hrTimeDuration = hrTimeDuration;
    function hrTimeToTimeStamp(hrTime2) {
      const precision = NANOSECOND_DIGITS;
      const tmp = `${"0".repeat(precision)}${hrTime2[1]}Z`;
      const nanoString = tmp.substr(tmp.length - precision - 1);
      const date = new Date(hrTime2[0] * 1e3).toISOString();
      return date.replace("000Z", nanoString);
    }
    exports.hrTimeToTimeStamp = hrTimeToTimeStamp;
    function hrTimeToNanoseconds(hrTime2) {
      return hrTime2[0] * SECOND_TO_NANOSECONDS + hrTime2[1];
    }
    exports.hrTimeToNanoseconds = hrTimeToNanoseconds;
    function hrTimeToMilliseconds(hrTime2) {
      return Math.round(hrTime2[0] * 1e3 + hrTime2[1] / 1e6);
    }
    exports.hrTimeToMilliseconds = hrTimeToMilliseconds;
    function hrTimeToMicroseconds(hrTime2) {
      return Math.round(hrTime2[0] * 1e6 + hrTime2[1] / 1e3);
    }
    exports.hrTimeToMicroseconds = hrTimeToMicroseconds;
    function isTimeInputHrTime(value) {
      return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
    }
    exports.isTimeInputHrTime = isTimeInputHrTime;
    function isTimeInput(value) {
      return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
    }
    exports.isTimeInput = isTimeInput;
  }
});

// node_modules/@opentelemetry/core/build/src/common/types.js
var require_types4 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/core/build/src/ExportResult.js
var require_ExportResult = __commonJS({
  "node_modules/@opentelemetry/core/build/src/ExportResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExportResultCode = void 0;
    var ExportResultCode;
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode = exports.ExportResultCode || (exports.ExportResultCode = {}));
  }
});

// node_modules/@opentelemetry/core/build/src/propagation/composite.js
var require_composite = __commonJS({
  "node_modules/@opentelemetry/core/build/src/propagation/composite.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositePropagator = void 0;
    var api_1 = require_src();
    var CompositePropagator = class {
      constructor(config = {}) {
        var _a;
        this._propagators = (_a = config.propagators) !== null && _a !== void 0 ? _a : [];
        this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
      }
      inject(context, carrier, setter) {
        for (const propagator of this._propagators) {
          try {
            propagator.inject(context, carrier, setter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
        }
      }
      extract(context, carrier, getter) {
        return this._propagators.reduce((ctx, propagator) => {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
          return ctx;
        }, context);
      }
      fields() {
        return this._fields.slice();
      }
    };
    exports.CompositePropagator = CompositePropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/internal/validators.js
var require_validators = __commonJS({
  "node_modules/@opentelemetry/core/build/src/internal/validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateValue = exports.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
    function validateKey(key) {
      return VALID_KEY_REGEX.test(key);
    }
    exports.validateKey = validateKey;
    function validateValue(value) {
      return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
    }
    exports.validateValue = validateValue;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/TraceState.js
var require_TraceState = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/TraceState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceState = void 0;
    var validators_1 = require_validators();
    var MAX_TRACE_STATE_ITEMS = 32;
    var MAX_TRACE_STATE_LEN = 512;
    var LIST_MEMBERS_SEPARATOR = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    var TraceState = class {
      constructor(rawTraceState) {
        this._internalState = new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if (validators_1.validateKey(key) && validators_1.validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports.TraceState = TraceState;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/HttpTraceContextPropagator.js
var require_HttpTraceContextPropagator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/HttpTraceContextPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpTraceContextPropagator = exports.parseTraceParent = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    var TraceState_1 = require_TraceState();
    exports.TRACE_PARENT_HEADER = "traceparent";
    exports.TRACE_STATE_HEADER = "tracestate";
    var VERSION = "00";
    var VERSION_PART = "(?!ff)[\\da-f]{2}";
    var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    var FLAGS_PART = "[\\da-f]{2}";
    var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
    function parseTraceParent(traceParent) {
      const match = TRACE_PARENT_REGEX.exec(traceParent);
      if (!match)
        return null;
      if (match[1] === "00" && match[5])
        return null;
      return {
        traceId: match[2],
        spanId: match[3],
        traceFlags: parseInt(match[4], 16)
      };
    }
    exports.parseTraceParent = parseTraceParent;
    var HttpTraceContextPropagator = class {
      inject(context, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context);
        if (!spanContext || suppress_tracing_1.isTracingSuppressed(context) || !api_1.isSpanContextValid(spanContext))
          return;
        const traceParent = `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
        setter.set(carrier, exports.TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, exports.TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      }
      extract(context, carrier, getter) {
        const traceParentHeader = getter.get(carrier, exports.TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context;
        const spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, exports.TRACE_STATE_HEADER);
        if (traceStateHeader) {
          const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState_1.TraceState(typeof state === "string" ? state : void 0);
        }
        return api_1.trace.setSpanContext(context, spanContext);
      }
      fields() {
        return [exports.TRACE_PARENT_HEADER, exports.TRACE_STATE_HEADER];
      }
    };
    exports.HttpTraceContextPropagator = HttpTraceContextPropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/IdGenerator.js
var require_IdGenerator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/IdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js
var require_rpc_metadata = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRPCMetadata = exports.deleteRPCMetadata = exports.setRPCMetadata = exports.RPCType = void 0;
    var api_1 = require_src();
    var RPC_METADATA_KEY = api_1.createContextKey("OpenTelemetry SDK Context Key RPC_METADATA");
    var RPCType;
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType = exports.RPCType || (exports.RPCType = {}));
    function setRPCMetadata(context, meta) {
      return context.setValue(RPC_METADATA_KEY, meta);
    }
    exports.setRPCMetadata = setRPCMetadata;
    function deleteRPCMetadata(context) {
      return context.deleteValue(RPC_METADATA_KEY);
    }
    exports.deleteRPCMetadata = deleteRPCMetadata;
    function getRPCMetadata(context) {
      return context.getValue(RPC_METADATA_KEY);
    }
    exports.getRPCMetadata = getRPCMetadata;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.js
var require_AlwaysOffSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOffSampler = void 0;
    var api_1 = require_src();
    var AlwaysOffSampler = class {
      shouldSample() {
        return {
          decision: api_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return "AlwaysOffSampler";
      }
    };
    exports.AlwaysOffSampler = AlwaysOffSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.js
var require_AlwaysOnSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOnSampler = void 0;
    var api_1 = require_src();
    var AlwaysOnSampler = class {
      shouldSample() {
        return {
          decision: api_1.SamplingDecision.RECORD_AND_SAMPLED
        };
      }
      toString() {
        return "AlwaysOnSampler";
      }
    };
    exports.AlwaysOnSampler = AlwaysOnSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.js
var require_ParentBasedSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParentBasedSampler = void 0;
    var api_1 = require_src();
    var global_error_handler_1 = require_global_error_handler();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler = class {
      constructor(config) {
        var _a, _b, _c, _d;
        this._root = config.root;
        if (!this._root) {
          global_error_handler_1.globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new AlwaysOnSampler_1.AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler_1.AlwaysOffSampler();
        this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler_1.AlwaysOnSampler();
        this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler_1.AlwaysOffSampler();
      }
      shouldSample(context, traceId, spanName, spanKind, attributes, links) {
        const parentContext = api_1.trace.getSpanContext(context);
        if (!parentContext || !api_1.isSpanContextValid(parentContext)) {
          return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
      }
      toString() {
        return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
      }
    };
    exports.ParentBasedSampler = ParentBasedSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.js
var require_TraceIdRatioBasedSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceIdRatioBasedSampler = void 0;
    var api_1 = require_src();
    var TraceIdRatioBasedSampler = class {
      constructor(_ratio = 0) {
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      shouldSample(context, traceId) {
        return {
          decision: api_1.isValidTraceId(traceId) && this._accumulate(traceId) < this._upperBound ? api_1.SamplingDecision.RECORD_AND_SAMPLED : api_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return `TraceIdRatioBased{${this._ratio}}`;
      }
      _normalize(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      }
      _accumulate(traceId) {
        let accumulation = 0;
        for (let i = 0; i < traceId.length / 8; i++) {
          const pos = i * 8;
          const part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      }
    };
    exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/url.js
var require_url = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isUrlIgnored = exports.urlMatches = void 0;
    function urlMatches(url, urlToMatch) {
      if (typeof urlToMatch === "string") {
        return url === urlToMatch;
      } else {
        return urlToMatch.test(url);
      }
    }
    exports.urlMatches = urlMatches;
    function isUrlIgnored(url, ignoredUrls) {
      if (!ignoredUrls) {
        return false;
      }
      for (const ignoreUrl of ignoredUrls) {
        if (urlMatches(url, ignoreUrl)) {
          return true;
        }
      }
      return false;
    }
    exports.isUrlIgnored = isUrlIgnored;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/wrap.js
var require_wrap = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/wrap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isWrapped = void 0;
    function isWrapped(func) {
      return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
    }
    exports.isWrapped = isWrapped;
  }
});

// node_modules/@opentelemetry/core/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageUtils = void 0;
    __exportStar(require_HttpBaggagePropagator(), exports);
    __exportStar(require_attributes2(), exports);
    __exportStar(require_global_error_handler(), exports);
    __exportStar(require_logging_error_handler(), exports);
    __exportStar(require_time(), exports);
    __exportStar(require_types4(), exports);
    __exportStar(require_ExportResult(), exports);
    __exportStar(require_version2(), exports);
    exports.baggageUtils = require_utils2();
    __exportStar(require_platform2(), exports);
    __exportStar(require_composite(), exports);
    __exportStar(require_HttpTraceContextPropagator(), exports);
    __exportStar(require_IdGenerator(), exports);
    __exportStar(require_rpc_metadata(), exports);
    __exportStar(require_AlwaysOffSampler(), exports);
    __exportStar(require_AlwaysOnSampler(), exports);
    __exportStar(require_ParentBasedSampler(), exports);
    __exportStar(require_TraceIdRatioBasedSampler(), exports);
    __exportStar(require_suppress_tracing(), exports);
    __exportStar(require_TraceState(), exports);
    __exportStar(require_environment(), exports);
    __exportStar(require_sampling(), exports);
    __exportStar(require_url(), exports);
    __exportStar(require_wrap(), exports);
    __exportStar(require_version2(), exports);
  }
});

// node_modules/@opentelemetry/tracing/build/src/enums.js
var require_enums = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/enums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExceptionEventName = void 0;
    exports.ExceptionEventName = "exception";
  }
});

// node_modules/@opentelemetry/tracing/build/src/Span.js
var require_Span = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/Span.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Span = void 0;
    var api = require_src();
    var core_1 = require_src3();
    var semantic_conventions_1 = require_src2();
    var enums_1 = require_enums();
    var Span = class {
      constructor(parentTracer, context, spanName, spanContext, kind, parentSpanId, links = [], startTime = core_1.hrTime()) {
        this.attributes = {};
        this.links = [];
        this.events = [];
        this.status = {
          code: api.SpanStatusCode.UNSET
        };
        this.endTime = [0, 0];
        this._ended = false;
        this._duration = [-1, -1];
        this.name = spanName;
        this._spanContext = spanContext;
        this.parentSpanId = parentSpanId;
        this.kind = kind;
        this.links = links;
        this.startTime = core_1.timeInputToHrTime(startTime);
        this.resource = parentTracer.resource;
        this.instrumentationLibrary = parentTracer.instrumentationLibrary;
        this._spanLimits = parentTracer.getSpanLimits();
        this._spanProcessor = parentTracer.getActiveSpanProcessor();
        this._spanProcessor.onStart(this, context);
      }
      spanContext() {
        return this._spanContext;
      }
      setAttribute(key, value) {
        if (value == null || this._isSpanEnded())
          return this;
        if (key.length === 0) {
          api.diag.warn(`Invalid attribute key: ${key}`);
          return this;
        }
        if (!core_1.isAttributeValue(value)) {
          api.diag.warn(`Invalid attribute value set for key: ${key}`);
          return this;
        }
        if (Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
          return this;
        }
        this.attributes[key] = value;
        return this;
      }
      setAttributes(attributes) {
        for (const [k, v] of Object.entries(attributes)) {
          this.setAttribute(k, v);
        }
        return this;
      }
      addEvent(name, attributesOrStartTime, startTime) {
        if (this._isSpanEnded())
          return this;
        if (this.events.length >= this._spanLimits.eventCountLimit) {
          api.diag.warn("Dropping extra events.");
          this.events.shift();
        }
        if (core_1.isTimeInput(attributesOrStartTime)) {
          if (typeof startTime === "undefined") {
            startTime = attributesOrStartTime;
          }
          attributesOrStartTime = void 0;
        }
        if (typeof startTime === "undefined") {
          startTime = core_1.hrTime();
        }
        this.events.push({
          name,
          attributes: attributesOrStartTime,
          time: core_1.timeInputToHrTime(startTime)
        });
        return this;
      }
      setStatus(status) {
        if (this._isSpanEnded())
          return this;
        this.status = status;
        return this;
      }
      updateName(name) {
        if (this._isSpanEnded())
          return this;
        this.name = name;
        return this;
      }
      end(endTime = core_1.hrTime()) {
        if (this._isSpanEnded()) {
          api.diag.error("You can only call end() on a span once.");
          return;
        }
        this._ended = true;
        this.endTime = core_1.timeInputToHrTime(endTime);
        this._duration = core_1.hrTimeDuration(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
          api.diag.warn("Inconsistent start and end time, startTime > endTime", this.startTime, this.endTime);
        }
        this._spanProcessor.onEnd(this);
      }
      isRecording() {
        return this._ended === false;
      }
      recordException(exception, time = core_1.hrTime()) {
        const attributes = {};
        if (typeof exception === "string") {
          attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE] = exception;
        } else if (exception) {
          if (exception.code) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] = exception.code.toString();
          } else if (exception.name) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] = exception.name;
          }
          if (exception.message) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE] = exception.message;
          }
          if (exception.stack) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_STACKTRACE] = exception.stack;
          }
        }
        if (attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] || attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE]) {
          this.addEvent(enums_1.ExceptionEventName, attributes, time);
        } else {
          api.diag.warn(`Failed to record an exception ${exception}`);
        }
      }
      get duration() {
        return this._duration;
      }
      get ended() {
        return this._ended;
      }
      _isSpanEnded() {
        if (this._ended) {
          api.diag.warn("Can not execute the operation on ended Span {traceId: %s, spanId: %s}", this._spanContext.traceId, this._spanContext.spanId);
        }
        return this._ended;
      }
    };
    exports.Span = Span;
  }
});

// node_modules/@opentelemetry/tracing/build/src/config.js
var require_config = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildSamplerFromEnv = exports.DEFAULT_CONFIG = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var env = core_1.getEnv();
    var FALLBACK_OTEL_TRACES_SAMPLER = core_1.TracesSamplerValues.AlwaysOn;
    exports.DEFAULT_CONFIG = {
      sampler: buildSamplerFromEnv(env),
      forceFlushTimeoutMillis: 3e4,
      spanLimits: {
        attributeCountLimit: core_1.getEnv().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
        linkCountLimit: core_1.getEnv().OTEL_SPAN_LINK_COUNT_LIMIT,
        eventCountLimit: core_1.getEnv().OTEL_SPAN_EVENT_COUNT_LIMIT
      }
    };
    function buildSamplerFromEnv(env2 = core_1.getEnv()) {
      switch (env2.OTEL_TRACES_SAMPLER) {
        case core_1.TracesSamplerValues.AlwaysOn:
          return new core_1.AlwaysOnSampler();
        case core_1.TracesSamplerValues.AlwaysOff:
          return new core_1.AlwaysOffSampler();
        case core_1.TracesSamplerValues.ParentBasedAlwaysOn:
          return new core_1.ParentBasedSampler({
            root: new core_1.AlwaysOnSampler()
          });
        case core_1.TracesSamplerValues.ParentBasedAlwaysOff:
          return new core_1.ParentBasedSampler({
            root: new core_1.AlwaysOffSampler()
          });
        case core_1.TracesSamplerValues.TraceIdRatio:
          return new core_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(env2));
        case core_1.TracesSamplerValues.ParentBasedTraceIdRatio:
          return new core_1.ParentBasedSampler({
            root: new core_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(env2))
          });
        default:
          api_1.diag.error(`OTEL_TRACES_SAMPLER value "${env2.OTEL_TRACES_SAMPLER} invalid, defaulting to ${FALLBACK_OTEL_TRACES_SAMPLER}".`);
          return new core_1.AlwaysOnSampler();
      }
    }
    exports.buildSamplerFromEnv = buildSamplerFromEnv;
    var DEFAULT_RATIO = 1;
    function getSamplerProbabilityFromEnv(env2) {
      if (env2.OTEL_TRACES_SAMPLER_ARG === void 0 || env2.OTEL_TRACES_SAMPLER_ARG === "") {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      const probability = Number(env2.OTEL_TRACES_SAMPLER_ARG);
      if (isNaN(probability)) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${env2.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      if (probability < 0 || probability > 1) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${env2.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      return probability;
    }
  }
});

// node_modules/@opentelemetry/tracing/build/src/utility.js
var require_utility = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/utility.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergeConfig = void 0;
    var config_1 = require_config();
    function mergeConfig(userConfig) {
      const perInstanceDefaults = {
        sampler: config_1.buildSamplerFromEnv()
      };
      const target = Object.assign({}, config_1.DEFAULT_CONFIG, perInstanceDefaults, userConfig);
      target.spanLimits = Object.assign({}, config_1.DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
      return target;
    }
    exports.mergeConfig = mergeConfig;
  }
});

// node_modules/@opentelemetry/tracing/build/src/Tracer.js
var require_Tracer = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/Tracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tracer = void 0;
    var api = require_src();
    var core_1 = require_src3();
    var Span_1 = require_Span();
    var utility_1 = require_utility();
    var Tracer = class {
      constructor(instrumentationLibrary, config, _tracerProvider) {
        this._tracerProvider = _tracerProvider;
        const localConfig = utility_1.mergeConfig(config);
        this._sampler = localConfig.sampler;
        this._spanLimits = localConfig.spanLimits;
        this._idGenerator = config.idGenerator || new core_1.RandomIdGenerator();
        this.resource = _tracerProvider.resource;
        this.instrumentationLibrary = instrumentationLibrary;
      }
      startSpan(name, options = {}, context = api.context.active()) {
        var _a, _b;
        if (core_1.isTracingSuppressed(context)) {
          api.diag.debug("Instrumentation suppressed, returning Noop Span");
          return api.trace.wrapSpanContext(api.INVALID_SPAN_CONTEXT);
        }
        const parentContext = getParent(options, context);
        const spanId = this._idGenerator.generateSpanId();
        let traceId;
        let traceState;
        let parentSpanId;
        if (!parentContext || !api.trace.isSpanContextValid(parentContext)) {
          traceId = this._idGenerator.generateTraceId();
        } else {
          traceId = parentContext.traceId;
          traceState = parentContext.traceState;
          parentSpanId = parentContext.spanId;
        }
        const spanKind = (_a = options.kind) !== null && _a !== void 0 ? _a : api.SpanKind.INTERNAL;
        const links = (_b = options.links) !== null && _b !== void 0 ? _b : [];
        const attributes = core_1.sanitizeAttributes(options.attributes);
        const samplingResult = this._sampler.shouldSample(options.root ? api.trace.setSpanContext(context, api.INVALID_SPAN_CONTEXT) : context, traceId, name, spanKind, attributes, links);
        const traceFlags = samplingResult.decision === api.SamplingDecision.RECORD_AND_SAMPLED ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE;
        const spanContext = { traceId, spanId, traceFlags, traceState };
        if (samplingResult.decision === api.SamplingDecision.NOT_RECORD) {
          api.diag.debug("Recording is off, propagating context in a non-recording span");
          return api.trace.wrapSpanContext(spanContext);
        }
        const span = new Span_1.Span(this, context, name, spanContext, spanKind, parentSpanId, links, options.startTime);
        span.setAttributes(Object.assign(attributes, samplingResult.attributes));
        return span;
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : api.context.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = api.trace.setSpan(parentContext, span);
        return api.context.with(contextWithSpanSet, fn, void 0, span);
      }
      getSpanLimits() {
        return this._spanLimits;
      }
      getActiveSpanProcessor() {
        return this._tracerProvider.getActiveSpanProcessor();
      }
    };
    exports.Tracer = Tracer;
    function getParent(options, context) {
      if (options.root)
        return void 0;
      return api.trace.getSpanContext(context);
    }
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js
var require_default_service_name = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = void 0;
    function defaultServiceName() {
      return `unknown_service:${process.argv0}`;
    }
    exports.defaultServiceName = defaultServiceName;
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/detect-resources.js
var require_detect_resources = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/detect-resources.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detectResources = void 0;
    var Resource_1 = require_Resource();
    var api_1 = require_src();
    var util = require("util");
    var detectResources = async (config = {}) => {
      const internalConfig = Object.assign(config);
      const resources = await Promise.all((internalConfig.detectors || []).map(async (d) => {
        try {
          const resource = await d.detect(internalConfig);
          api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
          return resource;
        } catch (e) {
          api_1.diag.debug(`${d.constructor.name} failed: ${e.message}`);
          return Resource_1.Resource.empty();
        }
      }));
      logResources(resources);
      return resources.reduce((acc, resource) => acc.merge(resource), Resource_1.Resource.empty());
    };
    exports.detectResources = detectResources;
    var logResources = (resources) => {
      resources.forEach((resource) => {
        if (Object.keys(resource.attributes).length > 0) {
          const resourceDebugString = util.inspect(resource.attributes, {
            depth: 2,
            breakLength: Infinity,
            sorted: true,
            compact: false
          });
          api_1.diag.verbose(resourceDebugString);
        }
      });
    };
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/detectors/EnvDetector.js
var require_EnvDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/detectors/EnvDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.envDetector = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var semantic_conventions_1 = require_src2();
    var __1 = require_src4();
    var EnvDetector = class {
      constructor() {
        this._MAX_LENGTH = 255;
        this._COMMA_SEPARATOR = ",";
        this._LABEL_KEY_VALUE_SPLITTER = "=";
        this._ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
        this._ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
      }
      async detect(_config) {
        const attributes = {};
        const env = core_1.getEnv();
        const rawAttributes = env.OTEL_RESOURCE_ATTRIBUTES;
        const serviceName = env.OTEL_SERVICE_NAME;
        if (rawAttributes) {
          try {
            const parsedAttributes = this._parseResourceAttributes(rawAttributes);
            Object.assign(attributes, parsedAttributes);
          } catch (e) {
            api_1.diag.debug(`EnvDetector failed: ${e.message}`);
          }
        }
        if (serviceName) {
          attributes[semantic_conventions_1.ResourceAttributes.SERVICE_NAME] = serviceName;
        }
        return new __1.Resource(attributes);
      }
      _parseResourceAttributes(rawEnvAttributes) {
        if (!rawEnvAttributes)
          return {};
        const attributes = {};
        const rawAttributes = rawEnvAttributes.split(this._COMMA_SEPARATOR, -1);
        for (const rawAttribute of rawAttributes) {
          const keyValuePair = rawAttribute.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
          if (keyValuePair.length !== 2) {
            continue;
          }
          let [key, value] = keyValuePair;
          key = key.trim();
          value = value.trim().split('^"|"$').join("");
          if (!this._isValidAndNotEmpty(key)) {
            throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
          }
          if (!this._isValid(value)) {
            throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
          }
          attributes[key] = value;
        }
        return attributes;
      }
      _isValid(name) {
        return name.length <= this._MAX_LENGTH && this._isPrintableString(name);
      }
      _isPrintableString(str) {
        for (let i = 0; i < str.length; i++) {
          const ch = str.charAt(i);
          if (ch <= " " || ch >= "~") {
            return false;
          }
        }
        return true;
      }
      _isValidAndNotEmpty(str) {
        return str.length > 0 && this._isValid(str);
      }
    };
    exports.envDetector = new EnvDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/detectors/ProcessDetector.js
var require_ProcessDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/detectors/ProcessDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processDetector = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var __1 = require_src4();
    var ProcessDetector = class {
      async detect(config) {
        const processResource = {
          [semantic_conventions_1.ResourceAttributes.PROCESS_PID]: process.pid,
          [semantic_conventions_1.ResourceAttributes.PROCESS_EXECUTABLE_NAME]: process.title || "",
          [semantic_conventions_1.ResourceAttributes.PROCESS_COMMAND]: process.argv[1] || "",
          [semantic_conventions_1.ResourceAttributes.PROCESS_COMMAND_LINE]: process.argv.join(" ") || ""
        };
        return this._getResourceAttributes(processResource, config);
      }
      _getResourceAttributes(processResource, _config) {
        if (processResource[semantic_conventions_1.ResourceAttributes.PROCESS_EXECUTABLE_NAME] === "" || processResource[semantic_conventions_1.ResourceAttributes.PROCESS_EXECUTABLE_PATH] === "" || processResource[semantic_conventions_1.ResourceAttributes.PROCESS_COMMAND] === "" || processResource[semantic_conventions_1.ResourceAttributes.PROCESS_COMMAND_LINE] === "") {
          api_1.diag.debug("ProcessDetector failed: Unable to find required process resources. ");
          return __1.Resource.empty();
        } else {
          return new __1.Resource(Object.assign({}, processResource));
        }
      }
    };
    exports.processDetector = new ProcessDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/detectors/index.js
var require_detectors = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/detectors/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_EnvDetector(), exports);
    __exportStar(require_ProcessDetector(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/index.js
var require_node3 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_default_service_name(), exports);
    __exportStar(require_detect_resources(), exports);
    __exportStar(require_detectors(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/index.js
var require_platform3 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node3(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/Resource.js
var require_Resource = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/Resource.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Resource = void 0;
    var semantic_conventions_1 = require_src2();
    var core_1 = require_src3();
    var platform_1 = require_platform3();
    var Resource = class {
      constructor(attributes) {
        this.attributes = attributes;
      }
      static empty() {
        return Resource.EMPTY;
      }
      static default() {
        return new Resource({
          [semantic_conventions_1.ResourceAttributes.SERVICE_NAME]: platform_1.defaultServiceName(),
          [semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_LANGUAGE]: core_1.SDK_INFO[semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_LANGUAGE],
          [semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_NAME]: core_1.SDK_INFO[semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_NAME],
          [semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_VERSION]: core_1.SDK_INFO[semantic_conventions_1.ResourceAttributes.TELEMETRY_SDK_VERSION]
        });
      }
      merge(other) {
        if (!other || !Object.keys(other.attributes).length)
          return this;
        const mergedAttributes = Object.assign({}, this.attributes, other.attributes);
        return new Resource(mergedAttributes);
      }
    };
    exports.Resource = Resource;
    Resource.EMPTY = new Resource({});
  }
});

// node_modules/@opentelemetry/resources/build/src/types.js
var require_types5 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/resources/build/src/config.js
var require_config2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/resources/build/src/index.js
var require_src4 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Resource(), exports);
    __exportStar(require_platform3(), exports);
    __exportStar(require_types5(), exports);
    __exportStar(require_config2(), exports);
  }
});

// node_modules/@opentelemetry/tracing/build/src/MultiSpanProcessor.js
var require_MultiSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/MultiSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiSpanProcessor = void 0;
    var core_1 = require_src3();
    var MultiSpanProcessor = class {
      constructor(_spanProcessors) {
        this._spanProcessors = _spanProcessors;
      }
      forceFlush() {
        const promises = [];
        for (const spanProcessor of this._spanProcessors) {
          promises.push(spanProcessor.forceFlush());
        }
        return new Promise((resolve) => {
          Promise.all(promises).then(() => {
            resolve();
          }).catch((error) => {
            core_1.globalErrorHandler(error || new Error("MultiSpanProcessor: forceFlush failed"));
            resolve();
          });
        });
      }
      onStart(span, context) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onStart(span, context);
        }
      }
      onEnd(span) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onEnd(span);
        }
      }
      shutdown() {
        const promises = [];
        for (const spanProcessor of this._spanProcessors) {
          promises.push(spanProcessor.shutdown());
        }
        return new Promise((resolve, reject) => {
          Promise.all(promises).then(() => {
            resolve();
          }, reject);
        });
      }
    };
    exports.MultiSpanProcessor = MultiSpanProcessor;
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/NoopSpanProcessor.js
var require_NoopSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/NoopSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopSpanProcessor = void 0;
    var NoopSpanProcessor = class {
      onStart(_span, _context) {
      }
      onEnd(_span) {
      }
      shutdown() {
        return Promise.resolve();
      }
      forceFlush() {
        return Promise.resolve();
      }
    };
    exports.NoopSpanProcessor = NoopSpanProcessor;
  }
});

// node_modules/lodash.merge/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.merge/index.js"(exports, module2) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var objectCtorString = funcToString.call(Object);
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeMax = Math.max;
    var nativeNow = Date.now;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var baseCreate = function() {
      function object() {
      }
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    }();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignMergeValue(object, key, value) {
      if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    var baseFor = createBaseFor();
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + "");
    }
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    function safeGet(object, key) {
      if (key === "constructor" && typeof object[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object[key];
    }
    var setToString = shortOut(baseSetToString);
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    function constant(value) {
      return function() {
        return value;
      };
    }
    function identity(value) {
      return value;
    }
    function stubFalse() {
      return false;
    }
    module2.exports = merge;
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/BatchSpanProcessorBase.js
var require_BatchSpanProcessorBase = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/BatchSpanProcessorBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessorBase = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var BatchSpanProcessorBase = class {
      constructor(_exporter, config) {
        this._exporter = _exporter;
        this._finishedSpans = [];
        this._isShutdown = false;
        this._shuttingDownPromise = Promise.resolve();
        const env = core_1.getEnv();
        this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
        this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env.OTEL_BSP_MAX_QUEUE_SIZE;
        this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env.OTEL_BSP_SCHEDULE_DELAY;
        this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env.OTEL_BSP_EXPORT_TIMEOUT;
      }
      forceFlush() {
        if (this._isShutdown) {
          return this._shuttingDownPromise;
        }
        return this._flushAll();
      }
      onStart(_span) {
      }
      onEnd(span) {
        if (this._isShutdown) {
          return;
        }
        this._addToBuffer(span);
      }
      shutdown() {
        if (this._isShutdown) {
          return this._shuttingDownPromise;
        }
        this._isShutdown = true;
        this._shuttingDownPromise = new Promise((resolve, reject) => {
          Promise.resolve().then(() => {
            return this.onShutdown();
          }).then(() => {
            return this._flushAll();
          }).then(() => {
            return this._exporter.shutdown();
          }).then(resolve).catch((e) => {
            reject(e);
          });
        });
        return this._shuttingDownPromise;
      }
      _addToBuffer(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
          return;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
      }
      _flushAll() {
        return new Promise((resolve, reject) => {
          const promises = [];
          const count = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
          for (let i = 0, j = count; i < j; i++) {
            promises.push(this._flushOneBatch());
          }
          Promise.all(promises).then(() => {
            resolve();
          }).catch(reject);
        });
      }
      _flushOneBatch() {
        this._clearTimer();
        if (this._finishedSpans.length === 0) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("Timeout"));
          }, this._exportTimeoutMillis);
          api_1.context.with(core_1.suppressTracing(api_1.context.active()), () => {
            this._exporter.export(this._finishedSpans.splice(0, this._maxExportBatchSize), (result) => {
              var _a;
              clearTimeout(timer);
              if (result.code === core_1.ExportResultCode.SUCCESS) {
                resolve();
              } else {
                reject((_a = result.error) !== null && _a !== void 0 ? _a : new Error("BatchSpanProcessor: span export failed"));
              }
            });
          });
        });
      }
      _maybeStartTimer() {
        if (this._timer !== void 0)
          return;
        this._timer = setTimeout(() => {
          this._flushOneBatch().then(() => {
            if (this._finishedSpans.length > 0) {
              this._clearTimer();
              this._maybeStartTimer();
            }
          }).catch((e) => {
            core_1.globalErrorHandler(e);
          });
        }, this._scheduledDelayMillis);
        core_1.unrefTimer(this._timer);
      }
      _clearTimer() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      }
    };
    exports.BatchSpanProcessorBase = BatchSpanProcessorBase;
  }
});

// node_modules/@opentelemetry/tracing/build/src/platform/node/export/BatchSpanProcessor.js
var require_BatchSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/platform/node/export/BatchSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessor = void 0;
    var BatchSpanProcessorBase_1 = require_BatchSpanProcessorBase();
    var BatchSpanProcessor = class extends BatchSpanProcessorBase_1.BatchSpanProcessorBase {
      onShutdown() {
      }
    };
    exports.BatchSpanProcessor = BatchSpanProcessor;
  }
});

// node_modules/@opentelemetry/tracing/build/src/platform/node/index.js
var require_node4 = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_BatchSpanProcessor(), exports);
  }
});

// node_modules/@opentelemetry/tracing/build/src/platform/index.js
var require_platform4 = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node4(), exports);
  }
});

// node_modules/@opentelemetry/tracing/build/src/BasicTracerProvider.js
var require_BasicTracerProvider = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/BasicTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BasicTracerProvider = exports.ForceFlushState = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var resources_1 = require_src4();
    var _1 = require_src5();
    var config_1 = require_config();
    var MultiSpanProcessor_1 = require_MultiSpanProcessor();
    var NoopSpanProcessor_1 = require_NoopSpanProcessor();
    var merge = require_lodash();
    var platform_1 = require_platform4();
    var ForceFlushState;
    (function(ForceFlushState2) {
      ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
      ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
      ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
      ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
    })(ForceFlushState = exports.ForceFlushState || (exports.ForceFlushState = {}));
    var BasicTracerProvider = class {
      constructor(config = {}) {
        var _a;
        this._registeredSpanProcessors = [];
        this._tracers = new Map();
        const mergedConfig = merge({}, config_1.DEFAULT_CONFIG, config);
        this.resource = (_a = mergedConfig.resource) !== null && _a !== void 0 ? _a : resources_1.Resource.empty();
        this.resource = resources_1.Resource.default().merge(this.resource);
        this._config = Object.assign({}, mergedConfig, {
          resource: this.resource
        });
        const defaultExporter = this._buildExporterFromEnv();
        if (defaultExporter !== void 0) {
          const batchProcessor = new platform_1.BatchSpanProcessor(defaultExporter);
          this.activeSpanProcessor = batchProcessor;
        } else {
          this.activeSpanProcessor = new NoopSpanProcessor_1.NoopSpanProcessor();
        }
      }
      getTracer(name, version) {
        const key = `${name}@${version || ""}`;
        if (!this._tracers.has(key)) {
          this._tracers.set(key, new _1.Tracer({ name, version }, this._config, this));
        }
        return this._tracers.get(key);
      }
      addSpanProcessor(spanProcessor) {
        if (this._registeredSpanProcessors.length === 0) {
          this.activeSpanProcessor.shutdown().catch((err) => api_1.diag.error("Error while trying to shutdown current span processor", err));
        }
        this._registeredSpanProcessors.push(spanProcessor);
        this.activeSpanProcessor = new MultiSpanProcessor_1.MultiSpanProcessor(this._registeredSpanProcessors);
      }
      getActiveSpanProcessor() {
        return this.activeSpanProcessor;
      }
      register(config = {}) {
        api_1.trace.setGlobalTracerProvider(this);
        if (config.propagator === void 0) {
          config.propagator = this._buildPropagatorFromEnv();
        }
        if (config.contextManager) {
          api_1.context.setGlobalContextManager(config.contextManager);
        }
        if (config.propagator) {
          api_1.propagation.setGlobalPropagator(config.propagator);
        }
      }
      forceFlush() {
        const timeout = this._config.forceFlushTimeoutMillis;
        const promises = this._registeredSpanProcessors.map((spanProcessor) => {
          return new Promise((resolve) => {
            let state;
            const timeoutInterval = setTimeout(() => {
              resolve(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
              state = ForceFlushState.timeout;
            }, timeout);
            spanProcessor.forceFlush().then(() => {
              clearTimeout(timeoutInterval);
              if (state !== ForceFlushState.timeout) {
                state = ForceFlushState.resolved;
                resolve(state);
              }
            }).catch((error) => {
              clearTimeout(timeoutInterval);
              state = ForceFlushState.error;
              resolve(error);
            });
          });
        });
        return new Promise((resolve, reject) => {
          Promise.all(promises).then((results) => {
            const errors = results.filter((result) => result !== ForceFlushState.resolved);
            if (errors.length > 0) {
              reject(errors);
            } else {
              resolve();
            }
          }).catch((error) => reject([error]));
        });
      }
      shutdown() {
        return this.activeSpanProcessor.shutdown();
      }
      _getPropagator(name) {
        var _a;
        return (_a = BasicTracerProvider._registeredPropagators.get(name)) === null || _a === void 0 ? void 0 : _a();
      }
      _getSpanExporter(name) {
        var _a;
        return (_a = BasicTracerProvider._registeredExporters.get(name)) === null || _a === void 0 ? void 0 : _a();
      }
      _buildPropagatorFromEnv() {
        const uniquePropagatorNames = Array.from(new Set(core_1.getEnv().OTEL_PROPAGATORS));
        const propagators = uniquePropagatorNames.map((name) => {
          const propagator = this._getPropagator(name);
          if (!propagator) {
            api_1.diag.warn(`Propagator "${name}" requested through environment variable is unavailable.`);
          }
          return propagator;
        });
        const validPropagators = propagators.reduce((list, item) => {
          if (item) {
            list.push(item);
          }
          return list;
        }, []);
        if (validPropagators.length === 0) {
          return;
        } else if (uniquePropagatorNames.length === 1) {
          return validPropagators[0];
        } else {
          return new core_1.CompositePropagator({
            propagators: validPropagators
          });
        }
      }
      _buildExporterFromEnv() {
        const exporterName = core_1.getEnv().OTEL_TRACES_EXPORTER;
        if (exporterName === "none")
          return;
        const exporter = this._getSpanExporter(exporterName);
        if (!exporter) {
          api_1.diag.error(`Exporter "${exporterName}" requested through environment variable is unavailable.`);
        }
        return exporter;
      }
    };
    exports.BasicTracerProvider = BasicTracerProvider;
    BasicTracerProvider._registeredPropagators = new Map([
      ["tracecontext", () => new core_1.HttpTraceContextPropagator()],
      ["baggage", () => new core_1.HttpBaggagePropagator()]
    ]);
    BasicTracerProvider._registeredExporters = new Map();
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/ConsoleSpanExporter.js
var require_ConsoleSpanExporter = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/ConsoleSpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleSpanExporter = void 0;
    var core_1 = require_src3();
    var ConsoleSpanExporter = class {
      export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
      }
      shutdown() {
        this._sendSpans([]);
        return Promise.resolve();
      }
      _exportInfo(span) {
        return {
          traceId: span.spanContext().traceId,
          parentId: span.parentSpanId,
          name: span.name,
          id: span.spanContext().spanId,
          kind: span.kind,
          timestamp: core_1.hrTimeToMicroseconds(span.startTime),
          duration: core_1.hrTimeToMicroseconds(span.duration),
          attributes: span.attributes,
          status: span.status,
          events: span.events
        };
      }
      _sendSpans(spans, done) {
        for (const span of spans) {
          console.log(this._exportInfo(span));
        }
        if (done) {
          return done({ code: core_1.ExportResultCode.SUCCESS });
        }
      }
    };
    exports.ConsoleSpanExporter = ConsoleSpanExporter;
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/InMemorySpanExporter.js
var require_InMemorySpanExporter = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/InMemorySpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InMemorySpanExporter = void 0;
    var core_1 = require_src3();
    var InMemorySpanExporter = class {
      constructor() {
        this._finishedSpans = [];
        this._stopped = false;
      }
      export(spans, resultCallback) {
        if (this._stopped)
          return resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Exporter has been stopped")
          });
        this._finishedSpans.push(...spans);
        setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
      }
      shutdown() {
        this._stopped = true;
        this._finishedSpans = [];
        return Promise.resolve();
      }
      reset() {
        this._finishedSpans = [];
      }
      getFinishedSpans() {
        return this._finishedSpans;
      }
    };
    exports.InMemorySpanExporter = InMemorySpanExporter;
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/ReadableSpan.js
var require_ReadableSpan = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/ReadableSpan.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/SimpleSpanProcessor.js
var require_SimpleSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/SimpleSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleSpanProcessor = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var SimpleSpanProcessor = class {
      constructor(_exporter) {
        this._exporter = _exporter;
        this._isShutdown = false;
        this._shuttingDownPromise = Promise.resolve();
      }
      forceFlush() {
        return Promise.resolve();
      }
      onStart(_span) {
      }
      onEnd(span) {
        if (this._isShutdown) {
          return;
        }
        api_1.context.with(core_1.suppressTracing(api_1.context.active()), () => {
          this._exporter.export([span], (result) => {
            var _a;
            if (result.code !== core_1.ExportResultCode.SUCCESS) {
              core_1.globalErrorHandler((_a = result.error) !== null && _a !== void 0 ? _a : new Error(`SimpleSpanProcessor: span export failed (status ${result})`));
            }
          });
        });
      }
      shutdown() {
        if (this._isShutdown) {
          return this._shuttingDownPromise;
        }
        this._isShutdown = true;
        this._shuttingDownPromise = new Promise((resolve, reject) => {
          Promise.resolve().then(() => {
            return this._exporter.shutdown();
          }).then(resolve).catch((e) => {
            reject(e);
          });
        });
        return this._shuttingDownPromise;
      }
    };
    exports.SimpleSpanProcessor = SimpleSpanProcessor;
  }
});

// node_modules/@opentelemetry/tracing/build/src/export/SpanExporter.js
var require_SpanExporter = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/export/SpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/tracing/build/src/SpanProcessor.js
var require_SpanProcessor = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/SpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/tracing/build/src/TimedEvent.js
var require_TimedEvent = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/TimedEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/tracing/build/src/types.js
var require_types6 = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/tracing/build/src/index.js
var require_src5 = __commonJS({
  "node_modules/@opentelemetry/tracing/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Tracer(), exports);
    __exportStar(require_BasicTracerProvider(), exports);
    __exportStar(require_platform4(), exports);
    __exportStar(require_ConsoleSpanExporter(), exports);
    __exportStar(require_InMemorySpanExporter(), exports);
    __exportStar(require_ReadableSpan(), exports);
    __exportStar(require_SimpleSpanProcessor(), exports);
    __exportStar(require_SpanExporter(), exports);
    __exportStar(require_NoopSpanProcessor(), exports);
    __exportStar(require_Span(), exports);
    __exportStar(require_SpanProcessor(), exports);
    __exportStar(require_TimedEvent(), exports);
    __exportStar(require_types6(), exports);
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/azure-coretracing.pub.js
var require_azure_coretracing_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/azure-coretracing.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.azureCoreTracing = exports.AzureMonitorSymbol = void 0;
    var diagnostic_channel_1 = require_channel();
    exports.AzureMonitorSymbol = "Azure_Monitor_Tracer";
    var isPatched = false;
    var azureCoreTracingPatchFunction = function(coreTracing) {
      if (isPatched) {
        return coreTracing;
      }
      try {
        var tracing = require_src5();
        var api = require_src();
        var provider = new tracing.BasicTracerProvider();
        var defaultTracer = provider.getTracer("applicationinsights tracer");
        var setTracerOriginal_1 = coreTracing.setTracer;
        coreTracing.setTracer = function(tracer) {
          var startSpanOriginal = tracer.startSpan;
          tracer.startSpan = function(name, options, context) {
            var span = startSpanOriginal.call(this, name, options, context);
            var originalEnd = span.end;
            span.end = function() {
              var result = originalEnd.apply(this, arguments);
              diagnostic_channel_1.channel.publish("azure-coretracing", span);
              return result;
            };
            return span;
          };
          tracer[exports.AzureMonitorSymbol] = true;
          setTracerOriginal_1.call(this, tracer);
        };
        api.trace.getSpan(api.context.active());
        coreTracing.setTracer(defaultTracer);
        isPatched = true;
      } catch (e) {
      }
      return coreTracing;
    };
    exports.azureCoreTracing = {
      versionSpecifier: ">= 1.0.0 < 2.0.0",
      patch: azureCoreTracingPatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("@azure/core-tracing", exports.azureCoreTracing);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/bunyan.pub.js
var require_bunyan_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/bunyan.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.bunyan = void 0;
    var diagnostic_channel_1 = require_channel();
    var bunyanPatchFunction = function(originalBunyan) {
      var originalEmit = originalBunyan.prototype._emit;
      originalBunyan.prototype._emit = function(rec, noemit) {
        var ret = originalEmit.apply(this, arguments);
        if (!noemit) {
          var str = ret;
          if (!str) {
            str = originalEmit.call(this, rec, true);
          }
          diagnostic_channel_1.channel.publish("bunyan", { level: rec.level, result: str });
        }
        return ret;
      };
      return originalBunyan;
    };
    exports.bunyan = {
      versionSpecifier: ">= 1.0.0 < 2.0.0",
      patch: bunyanPatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("bunyan", exports.bunyan);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/console.pub.js
var require_console_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/console.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.console = void 0;
    var diagnostic_channel_1 = require_channel();
    var stream_1 = require("stream");
    var consolePatchFunction = function(originalConsole) {
      var aiLoggingOutStream = new stream_1.Writable();
      var aiLoggingErrStream = new stream_1.Writable();
      aiLoggingOutStream.write = function(chunk) {
        if (!chunk) {
          return true;
        }
        var message = chunk.toString();
        diagnostic_channel_1.channel.publish("console", { message });
        return true;
      };
      aiLoggingErrStream.write = function(chunk) {
        if (!chunk) {
          return true;
        }
        var message = chunk.toString();
        diagnostic_channel_1.channel.publish("console", { message, stderr: true });
        return true;
      };
      var aiLoggingConsole = new originalConsole.Console(aiLoggingOutStream, aiLoggingErrStream);
      var consoleMethods = ["log", "info", "warn", "error", "dir", "time", "timeEnd", "trace", "assert"];
      var _loop_1 = function(method2) {
        var originalMethod = originalConsole[method2];
        if (originalMethod) {
          originalConsole[method2] = function() {
            if (aiLoggingConsole[method2]) {
              try {
                aiLoggingConsole[method2].apply(aiLoggingConsole, arguments);
              } catch (e) {
              }
            }
            return originalMethod.apply(originalConsole, arguments);
          };
        }
      };
      for (var _i = 0, consoleMethods_1 = consoleMethods; _i < consoleMethods_1.length; _i++) {
        var method = consoleMethods_1[_i];
        _loop_1(method);
      }
      return originalConsole;
    };
    exports.console = {
      versionSpecifier: ">= 4.0.0",
      patch: consolePatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("console", exports.console);
      require("console");
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/mongodb-core.pub.js
var require_mongodb_core_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/mongodb-core.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.mongoCore = void 0;
    var diagnostic_channel_1 = require_channel();
    var mongodbcorePatchFunction = function(originalMongoCore) {
      var originalConnect = originalMongoCore.Server.prototype.connect;
      originalMongoCore.Server.prototype.connect = function contextPreservingConnect() {
        var ret = originalConnect.apply(this, arguments);
        var originalWrite = this.s.pool.write;
        this.s.pool.write = function contextPreservingWrite() {
          var cbidx = typeof arguments[1] === "function" ? 1 : 2;
          if (typeof arguments[cbidx] === "function") {
            arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(arguments[cbidx]);
          }
          return originalWrite.apply(this, arguments);
        };
        var originalLogout = this.s.pool.logout;
        this.s.pool.logout = function contextPreservingLogout() {
          if (typeof arguments[1] === "function") {
            arguments[1] = diagnostic_channel_1.channel.bindToContext(arguments[1]);
          }
          return originalLogout.apply(this, arguments);
        };
        return ret;
      };
      return originalMongoCore;
    };
    exports.mongoCore = {
      versionSpecifier: ">= 2.0.0 < 4.0.0",
      patch: mongodbcorePatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("mongodb-core", exports.mongoCore);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/mongodb.pub.js
var require_mongodb_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/mongodb.pub.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.mongo330 = exports.mongo3 = exports.mongo2 = void 0;
    var diagnostic_channel_1 = require_channel();
    var mongodbPatchFunction = function(originalMongo) {
      var listener = originalMongo.instrument({
        operationIdGenerator: {
          next: function() {
            return diagnostic_channel_1.channel.bindToContext(function(cb) {
              return cb();
            });
          }
        }
      });
      var eventMap = {};
      listener.on("started", function(event) {
        if (eventMap[event.requestId]) {
          return;
        }
        eventMap[event.requestId] = __assign(__assign({}, event), { time: new Date() });
      });
      listener.on("succeeded", function(event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
          delete eventMap[event.requestId];
        }
        if (typeof event.operationId === "function") {
          event.operationId(function() {
            return diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: true });
          });
        } else {
          diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: true });
        }
      });
      listener.on("failed", function(event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
          delete eventMap[event.requestId];
        }
        if (typeof event.operationId === "function") {
          event.operationId(function() {
            return diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: false });
          });
        } else {
          diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: false });
        }
      });
      return originalMongo;
    };
    var mongodb3PatchFunction = function(originalMongo) {
      var listener = originalMongo.instrument();
      var eventMap = {};
      var contextMap = {};
      listener.on("started", function(event) {
        if (eventMap[event.requestId]) {
          return;
        }
        contextMap[event.requestId] = diagnostic_channel_1.channel.bindToContext(function(cb) {
          return cb();
        });
        eventMap[event.requestId] = __assign(__assign({}, event), { time: new Date() });
      });
      listener.on("succeeded", function(event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
          delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
          contextMap[event.requestId](function() {
            return diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: true });
          });
          delete contextMap[event.requestId];
        }
      });
      listener.on("failed", function(event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
          delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
          contextMap[event.requestId](function() {
            return diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: false });
          });
          delete contextMap[event.requestId];
        }
      });
      return originalMongo;
    };
    var mongodbcorePatchFunction = function(originalMongo) {
      var originalConnect = originalMongo.Server.prototype.connect;
      originalMongo.Server.prototype.connect = function contextPreservingConnect() {
        var ret = originalConnect.apply(this, arguments);
        var originalWrite = this.s.coreTopology.s.pool.write;
        this.s.coreTopology.s.pool.write = function contextPreservingWrite() {
          var cbidx = typeof arguments[1] === "function" ? 1 : 2;
          if (typeof arguments[cbidx] === "function") {
            arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(arguments[cbidx]);
          }
          return originalWrite.apply(this, arguments);
        };
        var originalLogout = this.s.coreTopology.s.pool.logout;
        this.s.coreTopology.s.pool.logout = function contextPreservingLogout() {
          if (typeof arguments[1] === "function") {
            arguments[1] = diagnostic_channel_1.channel.bindToContext(arguments[1]);
          }
          return originalLogout.apply(this, arguments);
        };
        return ret;
      };
      return originalMongo;
    };
    var mongodb330PatchFunction = function(originalMongo) {
      mongodbcorePatchFunction(originalMongo);
      var listener = originalMongo.instrument();
      var eventMap = {};
      var contextMap = {};
      listener.on("started", function(event) {
        if (eventMap[event.requestId]) {
          return;
        }
        contextMap[event.requestId] = diagnostic_channel_1.channel.bindToContext(function(cb) {
          return cb();
        });
        eventMap[event.requestId] = event;
      });
      listener.on("succeeded", function(event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
          delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
          contextMap[event.requestId](function() {
            return diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: true });
          });
          delete contextMap[event.requestId];
        }
      });
      listener.on("failed", function(event) {
        var startedData = eventMap[event.requestId];
        if (startedData) {
          delete eventMap[event.requestId];
        }
        if (typeof event === "object" && typeof contextMap[event.requestId] === "function") {
          contextMap[event.requestId](function() {
            return diagnostic_channel_1.channel.publish("mongodb", { startedData, event, succeeded: false });
          });
          delete contextMap[event.requestId];
        }
      });
      return originalMongo;
    };
    exports.mongo2 = {
      versionSpecifier: ">= 2.0.0 <= 3.0.5",
      patch: mongodbPatchFunction
    };
    exports.mongo3 = {
      versionSpecifier: "> 3.0.5 < 3.3.0",
      patch: mongodb3PatchFunction
    };
    exports.mongo330 = {
      versionSpecifier: ">= 3.3.0 < 4.0.0",
      patch: mongodb330PatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo2);
      diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo3);
      diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo330);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/mysql.pub.js
var require_mysql_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/mysql.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.mysql = void 0;
    var diagnostic_channel_1 = require_channel();
    var path = require("path");
    var mysqlPatchFunction = function(originalMysql, originalMysqlPath) {
      var patchObjectFunction = function(obj, name) {
        return function(func, cbWrapper) {
          var originalFunc = obj[func];
          if (originalFunc) {
            obj[func] = function mysqlContextPreserver() {
              var cbidx = arguments.length - 1;
              for (var i = arguments.length - 1; i >= 0; --i) {
                if (typeof arguments[i] === "function") {
                  cbidx = i;
                  break;
                } else if (typeof arguments[i] !== "undefined") {
                  break;
                }
              }
              var cb = arguments[cbidx];
              var resultContainer = { result: null, startTime: null, startDate: null };
              if (typeof cb === "function") {
                if (cbWrapper) {
                  resultContainer.startTime = process.hrtime();
                  resultContainer.startDate = new Date();
                  arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(cbWrapper(resultContainer, cb));
                } else {
                  arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(cb);
                }
              }
              var result = originalFunc.apply(this, arguments);
              resultContainer.result = result;
              return result;
            };
          }
        };
      };
      var patchClassMemberFunction = function(classObject, name) {
        return patchObjectFunction(classObject.prototype, name + ".prototype");
      };
      var connectionCallbackFunctions = [
        "connect",
        "changeUser",
        "ping",
        "statistics",
        "end"
      ];
      var connectionClass = require(path.dirname(originalMysqlPath) + "/lib/Connection");
      connectionCallbackFunctions.forEach(function(value) {
        return patchClassMemberFunction(connectionClass, "Connection")(value);
      });
      patchObjectFunction(connectionClass, "Connection")("createQuery", function(resultContainer, cb) {
        return function(err) {
          var hrDuration = process.hrtime(resultContainer.startTime);
          var duration = hrDuration[0] * 1e3 + hrDuration[1] / 1e6 | 0;
          diagnostic_channel_1.channel.publish("mysql", { query: resultContainer.result, callbackArgs: arguments, err, duration, time: resultContainer.startDate });
          cb.apply(this, arguments);
        };
      });
      var poolCallbackFunctions = [
        "_enqueueCallback"
      ];
      var poolClass = require(path.dirname(originalMysqlPath) + "/lib/Pool");
      poolCallbackFunctions.forEach(function(value) {
        return patchClassMemberFunction(poolClass, "Pool")(value);
      });
      return originalMysql;
    };
    exports.mysql = {
      versionSpecifier: ">= 2.0.0 < 3.0.0",
      patch: mysqlPatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("mysql", exports.mysql);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/pg-pool.pub.js
var require_pg_pool_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/pg-pool.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.postgresPool1 = void 0;
    var diagnostic_channel_1 = require_channel();
    function postgresPool1PatchFunction(originalPgPool) {
      var originalConnect = originalPgPool.prototype.connect;
      originalPgPool.prototype.connect = function connect(callback) {
        if (callback) {
          arguments[0] = diagnostic_channel_1.channel.bindToContext(callback);
        }
        return originalConnect.apply(this, arguments);
      };
      return originalPgPool;
    }
    exports.postgresPool1 = {
      versionSpecifier: ">= 1.0.0 < 3.0.0",
      patch: postgresPool1PatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("pg-pool", exports.postgresPool1);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/pg.pub.js
var require_pg_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/pg.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.postgres7 = exports.postgres6 = void 0;
    var diagnostic_channel_1 = require_channel();
    var events_1 = require("events");
    function postgres6PatchFunction(originalPg, originalPgPath) {
      var originalClientQuery = originalPg.Client.prototype.query;
      var diagnosticOriginalFunc = "__diagnosticOriginalFunc";
      originalPg.Client.prototype.query = function query(config, values, callback) {
        var data = {
          query: {},
          database: {
            host: this.connectionParameters.host,
            port: this.connectionParameters.port
          },
          result: null,
          error: null,
          duration: 0,
          time: new Date()
        };
        var start = process.hrtime();
        var queryResult;
        function patchCallback(cb) {
          if (cb && cb[diagnosticOriginalFunc]) {
            cb = cb[diagnosticOriginalFunc];
          }
          var trackingCallback = diagnostic_channel_1.channel.bindToContext(function(err, res) {
            var end = process.hrtime(start);
            data.result = res && { rowCount: res.rowCount, command: res.command };
            data.error = err;
            data.duration = Math.ceil(end[0] * 1e3 + end[1] / 1e6);
            diagnostic_channel_1.channel.publish("postgres", data);
            if (err) {
              if (cb) {
                return cb.apply(this, arguments);
              } else if (queryResult && queryResult instanceof events_1.EventEmitter) {
                queryResult.emit("error", err);
              }
            } else if (cb) {
              cb.apply(this, arguments);
            }
          });
          try {
            Object.defineProperty(trackingCallback, diagnosticOriginalFunc, { value: cb });
            return trackingCallback;
          } catch (e) {
            return cb;
          }
        }
        try {
          if (typeof config === "string") {
            if (values instanceof Array) {
              data.query.preparable = {
                text: config,
                args: values
              };
              callback = patchCallback(callback);
            } else {
              data.query.text = config;
              if (callback) {
                callback = patchCallback(callback);
              } else {
                values = patchCallback(values);
              }
            }
          } else {
            if (typeof config.name === "string") {
              data.query.plan = config.name;
            } else if (config.values instanceof Array) {
              data.query.preparable = {
                text: config.text,
                args: config.values
              };
            } else {
              data.query.text = config.text;
            }
            if (callback) {
              callback = patchCallback(callback);
            } else if (values) {
              values = patchCallback(values);
            } else {
              config.callback = patchCallback(config.callback);
            }
          }
        } catch (e) {
          return originalClientQuery.apply(this, arguments);
        }
        arguments[0] = config;
        arguments[1] = values;
        arguments[2] = callback;
        arguments.length = arguments.length > 3 ? arguments.length : 3;
        queryResult = originalClientQuery.apply(this, arguments);
        return queryResult;
      };
      return originalPg;
    }
    function postgres7PatchFunction(originalPg, originalPgPath) {
      var originalClientQuery = originalPg.Client.prototype.query;
      var diagnosticOriginalFunc = "__diagnosticOriginalFunc";
      originalPg.Client.prototype.query = function query(config, values, callback) {
        var _this = this;
        var callbackProvided = !!callback;
        var data = {
          query: {},
          database: {
            host: this.connectionParameters.host,
            port: this.connectionParameters.port
          },
          result: null,
          error: null,
          duration: 0,
          time: new Date()
        };
        var start = process.hrtime();
        var queryResult;
        function patchCallback(cb) {
          if (cb && cb[diagnosticOriginalFunc]) {
            cb = cb[diagnosticOriginalFunc];
          }
          var trackingCallback = diagnostic_channel_1.channel.bindToContext(function(err, res) {
            var end = process.hrtime(start);
            data.result = res && { rowCount: res.rowCount, command: res.command };
            data.error = err;
            data.duration = Math.ceil(end[0] * 1e3 + end[1] / 1e6);
            diagnostic_channel_1.channel.publish("postgres", data);
            if (err) {
              if (cb) {
                return cb.apply(this, arguments);
              } else if (queryResult && queryResult instanceof events_1.EventEmitter) {
                queryResult.emit("error", err);
              }
            } else if (cb) {
              cb.apply(this, arguments);
            }
          });
          try {
            Object.defineProperty(trackingCallback, diagnosticOriginalFunc, { value: cb });
            return trackingCallback;
          } catch (e) {
            return cb;
          }
        }
        try {
          if (typeof config === "string") {
            if (values instanceof Array) {
              data.query.preparable = {
                text: config,
                args: values
              };
              callbackProvided = typeof callback === "function";
              callback = callbackProvided ? patchCallback(callback) : callback;
            } else {
              data.query.text = config;
              if (callback) {
                callbackProvided = typeof callback === "function";
                callback = callbackProvided ? patchCallback(callback) : callback;
              } else {
                callbackProvided = typeof values === "function";
                values = callbackProvided ? patchCallback(values) : values;
              }
            }
          } else {
            if (typeof config.name === "string") {
              data.query.plan = config.name;
            } else if (config.values instanceof Array) {
              data.query.preparable = {
                text: config.text,
                args: config.values
              };
            } else {
              data.query.text = config.text;
            }
            if (callback) {
              callbackProvided = typeof callback === "function";
              callback = patchCallback(callback);
            } else if (values) {
              callbackProvided = typeof values === "function";
              values = callbackProvided ? patchCallback(values) : values;
            } else {
              callbackProvided = typeof config.callback === "function";
              config.callback = callbackProvided ? patchCallback(config.callback) : config.callback;
            }
          }
        } catch (e) {
          return originalClientQuery.apply(this, arguments);
        }
        arguments[0] = config;
        arguments[1] = values;
        arguments[2] = callback;
        arguments.length = arguments.length > 3 ? arguments.length : 3;
        queryResult = originalClientQuery.apply(this, arguments);
        if (!callbackProvided) {
          return queryResult.then(function(result) {
            patchCallback()(void 0, result);
            return new _this._Promise(function(resolve, reject) {
              resolve(result);
            });
          }).catch(function(error) {
            patchCallback()(error, void 0);
            return new _this._Promise(function(resolve, reject) {
              reject(error);
            });
          });
        }
        return queryResult;
      };
      return originalPg;
    }
    exports.postgres6 = {
      versionSpecifier: "6.*",
      patch: postgres6PatchFunction
    };
    exports.postgres7 = {
      versionSpecifier: ">=7.* <=8.*",
      patch: postgres7PatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("pg", exports.postgres6);
      diagnostic_channel_1.channel.registerMonkeyPatch("pg", exports.postgres7);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/redis.pub.js
var require_redis_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/redis.pub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.redis = void 0;
    var diagnostic_channel_1 = require_channel();
    var redisPatchFunction = function(originalRedis) {
      var originalSend = originalRedis.RedisClient.prototype.internal_send_command;
      originalRedis.RedisClient.prototype.internal_send_command = function(commandObj) {
        if (commandObj) {
          var cb_1 = commandObj.callback;
          if (!cb_1 || !cb_1.pubsubBound) {
            var address_1 = this.address;
            var startTime_1 = process.hrtime();
            var startDate_1 = new Date();
            commandObj.callback = diagnostic_channel_1.channel.bindToContext(function(err, result) {
              var hrDuration = process.hrtime(startTime_1);
              var duration = hrDuration[0] * 1e3 + hrDuration[1] / 1e6 | 0;
              diagnostic_channel_1.channel.publish("redis", { duration, address: address_1, commandObj, err, result, time: startDate_1 });
              if (typeof cb_1 === "function") {
                cb_1.apply(this, arguments);
              }
            });
            commandObj.callback.pubsubBound = true;
          }
        }
        return originalSend.call(this, commandObj);
      };
      return originalRedis;
    };
    exports.redis = {
      versionSpecifier: ">= 2.0.0 < 4.0.0",
      patch: redisPatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("redis", exports.redis);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/tedious.pub.js
var require_tedious_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/tedious.pub.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.tedious = void 0;
    var diagnostic_channel_1 = require_channel();
    var tediousPatchFunction = function(originalTedious) {
      var originalMakeRequest = originalTedious.Connection.prototype.makeRequest;
      originalTedious.Connection.prototype.makeRequest = function makeRequest() {
        function getPatchedCallback(origCallback) {
          var start = process.hrtime();
          var data = {
            query: {},
            database: {
              host: null,
              port: null
            },
            result: null,
            error: null,
            duration: 0
          };
          return diagnostic_channel_1.channel.bindToContext(function(err, rowCount, rows) {
            var end = process.hrtime(start);
            data = __assign(__assign({}, data), { database: {
              host: this.connection.config.server,
              port: this.connection.config.options.port
            }, result: !err && { rowCount, rows }, query: {
              text: this.parametersByName.statement.value
            }, error: err, duration: Math.ceil(end[0] * 1e3 + end[1] / 1e6) });
            diagnostic_channel_1.channel.publish("tedious", data);
            origCallback.call(this, err, rowCount, rows);
          });
        }
        var request = arguments[0];
        arguments[0].callback = getPatchedCallback(request.callback);
        originalMakeRequest.apply(this, arguments);
      };
      return originalTedious;
    };
    exports.tedious = {
      versionSpecifier: ">= 6.0.0 < 9.0.0",
      patch: tediousPatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("tedious", exports.tedious);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/winston.pub.js
var require_winston_pub = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/winston.pub.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.winston2 = exports.winston3 = void 0;
    var diagnostic_channel_1 = require_channel();
    var winston2PatchFunction = function(originalWinston) {
      var originalLog = originalWinston.Logger.prototype.log;
      var curLevels;
      var loggingFilter = function(level, message, meta) {
        var levelKind;
        if (curLevels === originalWinston.config.npm.levels) {
          levelKind = "npm";
        } else if (curLevels === originalWinston.config.syslog.levels) {
          levelKind = "syslog";
        } else {
          levelKind = "unknown";
        }
        diagnostic_channel_1.channel.publish("winston", { level, message, meta, levelKind });
        return message;
      };
      originalWinston.Logger.prototype.log = function log() {
        curLevels = this.levels;
        if (!this.filters || this.filters.length === 0) {
          this.filters = [loggingFilter];
        } else if (this.filters[this.filters.length - 1] !== loggingFilter) {
          this.filters = this.filters.filter(function(f) {
            return f !== loggingFilter;
          });
          this.filters.push(loggingFilter);
        }
        return originalLog.apply(this, arguments);
      };
      return originalWinston;
    };
    var winston3PatchFunction = function(originalWinston) {
      var mapLevelToKind = function(winston, level) {
        var levelKind;
        if (winston.config.npm.levels[level] != null) {
          levelKind = "npm";
        } else if (winston.config.syslog.levels[level] != null) {
          levelKind = "syslog";
        } else {
          levelKind = "unknown";
        }
        return levelKind;
      };
      var AppInsightsTransport = function(_super) {
        __extends(AppInsightsTransport2, _super);
        function AppInsightsTransport2(winston, opts) {
          var _this = _super.call(this, opts) || this;
          _this.winston = winston;
          return _this;
        }
        AppInsightsTransport2.prototype.log = function(info, callback) {
          var message = info.message, level = info.level, meta = info.meta, splat = __rest(info, ["message", "level", "meta"]);
          level = typeof Symbol["for"] === "function" ? info[Symbol["for"]("level")] : level;
          message = info instanceof Error ? info : message;
          var levelKind = mapLevelToKind(this.winston, level);
          meta = meta || {};
          for (var key in splat) {
            if (splat.hasOwnProperty(key)) {
              meta[key] = splat[key];
            }
          }
          diagnostic_channel_1.channel.publish("winston", { message, level, levelKind, meta });
          callback();
        };
        return AppInsightsTransport2;
      }(originalWinston.Transport);
      function patchedConfigure() {
        var levels = arguments[0].levels || originalWinston.config.npm.levels;
        var lastLevel;
        for (var level in levels) {
          if (levels.hasOwnProperty(level)) {
            lastLevel = lastLevel === void 0 || levels[level] > levels[lastLevel] ? level : lastLevel;
          }
        }
        this.add(new AppInsightsTransport(originalWinston, { level: lastLevel }));
      }
      var origCreate = originalWinston.createLogger;
      originalWinston.createLogger = function patchedCreate() {
        var levels = arguments[0].levels || originalWinston.config.npm.levels;
        var lastLevel;
        for (var level in levels) {
          if (levels.hasOwnProperty(level)) {
            lastLevel = lastLevel === void 0 || levels[level] > levels[lastLevel] ? level : lastLevel;
          }
        }
        var result = origCreate.apply(this, arguments);
        result.add(new AppInsightsTransport(originalWinston, { level: lastLevel }));
        var origConfigure = result.configure;
        result.configure = function() {
          origConfigure.apply(this, arguments);
          patchedConfigure.apply(this, arguments);
        };
        return result;
      };
      var origRootConfigure = originalWinston.configure;
      originalWinston.configure = function() {
        origRootConfigure.apply(this, arguments);
        patchedConfigure.apply(this, arguments);
      };
      originalWinston.add(new AppInsightsTransport(originalWinston));
      return originalWinston;
    };
    exports.winston3 = {
      versionSpecifier: "3.x",
      patch: winston3PatchFunction
    };
    exports.winston2 = {
      versionSpecifier: "2.x",
      patch: winston2PatchFunction
    };
    function enable() {
      diagnostic_channel_1.channel.registerMonkeyPatch("winston", exports.winston2);
      diagnostic_channel_1.channel.registerMonkeyPatch("winston", exports.winston3);
    }
    exports.enable = enable;
  }
});

// node_modules/diagnostic-channel-publishers/dist/src/index.js
var require_src6 = __commonJS({
  "node_modules/diagnostic-channel-publishers/dist/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.tedious = exports.pgPool = exports.pg = exports.winston = exports.redis = exports.mysql = exports.mongodb = exports.mongodbCore = exports.console = exports.bunyan = exports.azuresdk = void 0;
    var azuresdk = require_azure_coretracing_pub();
    exports.azuresdk = azuresdk;
    var bunyan = require_bunyan_pub();
    exports.bunyan = bunyan;
    var consolePub = require_console_pub();
    exports.console = consolePub;
    var mongodbCore = require_mongodb_core_pub();
    exports.mongodbCore = mongodbCore;
    var mongodb = require_mongodb_pub();
    exports.mongodb = mongodb;
    var mysql = require_mysql_pub();
    exports.mysql = mysql;
    var pgPool = require_pg_pool_pub();
    exports.pgPool = pgPool;
    var pg = require_pg_pub();
    exports.pg = pg;
    var redis = require_redis_pub();
    exports.redis = redis;
    var tedious = require_tedious_pub();
    exports.tedious = tedious;
    var winston = require_winston_pub();
    exports.winston = winston;
    function enable() {
      bunyan.enable();
      consolePub.enable();
      mongodbCore.enable();
      mongodb.enable();
      mysql.enable();
      pg.enable();
      pgPool.enable();
      redis.enable();
      winston.enable();
      azuresdk.enable();
      tedious.enable();
    }
    exports.enable = enable;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/initialization.js
var require_initialization = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/initialization.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerContextPreservation = exports.IsInitialized = void 0;
    var AsyncHooksScopeManager_1 = require_AsyncHooksScopeManager();
    var Logging = require_Logging();
    exports.IsInitialized = !process.env["APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL"];
    var TAG = "DiagnosticChannel";
    if (exports.IsInitialized) {
      publishers = require_src6();
      individualOptOuts = process.env["APPLICATION_INSIGHTS_NO_PATCH_MODULES"] || "";
      unpatchedModules = individualOptOuts.split(",");
      modules = {
        bunyan: publishers.bunyan,
        console: publishers.console,
        mongodb: publishers.mongodb,
        mongodbCore: publishers.mongodbCore,
        mysql: publishers.mysql,
        redis: publishers.redis,
        pg: publishers.pg,
        pgPool: publishers.pgPool,
        winston: publishers.winston,
        azuresdk: publishers.azuresdk
      };
      for (mod in modules) {
        if (unpatchedModules.indexOf(mod) === -1) {
          modules[mod].enable();
          Logging.info(TAG, "Subscribed to " + mod + " events");
        }
      }
      if (unpatchedModules.length > 0) {
        Logging.info(TAG, "Some modules will not be patched", unpatchedModules);
      }
    } else {
      Logging.info(TAG, "Not subscribing to dependency autocollection because APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL was set");
    }
    var publishers;
    var individualOptOuts;
    var unpatchedModules;
    var modules;
    var mod;
    function registerContextPreservation(cb) {
      if (!exports.IsInitialized) {
        return;
      }
      var diagChannel = require_channel();
      diagChannel.channel.addContextPreservation(cb);
      diagChannel.channel.spanContextPropagator = AsyncHooksScopeManager_1.AsyncScopeManager;
    }
    exports.registerContextPreservation = registerContextPreservation;
  }
});

// node_modules/applicationinsights/out/Library/RequestResponseHeaders.js
var require_RequestResponseHeaders = __commonJS({
  "node_modules/applicationinsights/out/Library/RequestResponseHeaders.js"(exports, module2) {
    "use strict";
    module2.exports = {
      requestContextHeader: "request-context",
      requestContextSourceKey: "appId",
      requestContextTargetKey: "appId",
      requestIdHeader: "request-id",
      parentIdHeader: "x-ms-request-id",
      rootIdHeader: "x-ms-request-root-id",
      correlationContextHeader: "correlation-context",
      traceparentHeader: "traceparent",
      traceStateHeader: "tracestate"
    };
  }
});

// node_modules/applicationinsights/out/Library/Util.js
var require_Util = __commonJS({
  "node_modules/applicationinsights/out/Library/Util.js"(exports, module2) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var http = require("http");
    var https = require("https");
    var url = require("url");
    var constants = require("constants");
    var Logging = require_Logging();
    var RequestResponseHeaders = require_RequestResponseHeaders();
    var Util = function() {
      function Util2() {
      }
      Util2.getCookie = function(name, cookie) {
        var value = "";
        if (name && name.length && typeof cookie === "string") {
          var cookieName = name + "=";
          var cookies = cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            cookie = Util2.trim(cookie);
            if (cookie && cookie.indexOf(cookieName) === 0) {
              value = cookie.substring(cookieName.length, cookies[i].length);
              break;
            }
          }
        }
        return value;
      };
      Util2.trim = function(str) {
        if (typeof str === "string") {
          return str.replace(/^\s+|\s+$/g, "");
        } else {
          return "";
        }
      };
      Util2.int32ArrayToBase64 = function(array) {
        var toChar = function(v, i) {
          return String.fromCharCode(v >> i & 255);
        };
        var int32AsString = function(v) {
          return toChar(v, 24) + toChar(v, 16) + toChar(v, 8) + toChar(v, 0);
        };
        var x = array.map(int32AsString).join("");
        var b = Buffer.from ? Buffer.from(x, "binary") : new Buffer(x, "binary");
        var s = b.toString("base64");
        return s.substr(0, s.indexOf("="));
      };
      Util2.random32 = function() {
        return 4294967296 * Math.random() | 0;
      };
      Util2.randomu32 = function() {
        return Util2.random32() + 2147483648;
      };
      Util2.w3cTraceId = function() {
        var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var oct = "", tmp;
        for (var a = 0; a < 4; a++) {
          tmp = Util2.random32();
          oct += hexValues[tmp & 15] + hexValues[tmp >> 4 & 15] + hexValues[tmp >> 8 & 15] + hexValues[tmp >> 12 & 15] + hexValues[tmp >> 16 & 15] + hexValues[tmp >> 20 & 15] + hexValues[tmp >> 24 & 15] + hexValues[tmp >> 28 & 15];
        }
        var clockSequenceHi = hexValues[8 + Math.random() * 4 | 0];
        return oct.substr(0, 8) + oct.substr(9, 4) + "4" + oct.substr(13, 3) + clockSequenceHi + oct.substr(16, 3) + oct.substr(19, 12);
      };
      Util2.w3cSpanId = function() {
        return Util2.w3cTraceId().substring(16);
      };
      Util2.isValidW3CId = function(id) {
        return id.length === 32 && id !== "00000000000000000000000000000000";
      };
      Util2.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      Util2.isError = function(obj) {
        return obj instanceof Error;
      };
      Util2.isPrimitive = function(input) {
        var propType = typeof input;
        return propType === "string" || propType === "number" || propType === "boolean";
      };
      Util2.isDate = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Date]";
      };
      Util2.msToTimeSpan = function(totalms) {
        if (isNaN(totalms) || totalms < 0) {
          totalms = 0;
        }
        var sec = (totalms / 1e3 % 60).toFixed(7).replace(/0{0,4}$/, "");
        var min = "" + Math.floor(totalms / (1e3 * 60)) % 60;
        var hour = "" + Math.floor(totalms / (1e3 * 60 * 60)) % 24;
        var days = Math.floor(totalms / (1e3 * 60 * 60 * 24));
        sec = sec.indexOf(".") < 2 ? "0" + sec : sec;
        min = min.length < 2 ? "0" + min : min;
        hour = hour.length < 2 ? "0" + hour : hour;
        var daysText = days > 0 ? days + "." : "";
        return daysText + hour + ":" + min + ":" + sec;
      };
      Util2.extractError = function(err) {
        var looseError = err;
        return {
          message: err.message,
          code: looseError.code || looseError.id || ""
        };
      };
      Util2.extractObject = function(origProperty) {
        if (origProperty instanceof Error) {
          return Util2.extractError(origProperty);
        }
        if (typeof origProperty.toJSON === "function") {
          return origProperty.toJSON();
        }
        return origProperty;
      };
      Util2.validateStringMap = function(obj) {
        if (typeof obj !== "object") {
          Logging.info("Invalid properties dropped from payload");
          return;
        }
        var map = {};
        for (var field in obj) {
          var property = "";
          var origProperty = obj[field];
          var propType = typeof origProperty;
          if (Util2.isPrimitive(origProperty)) {
            property = origProperty.toString();
          } else if (origProperty === null || propType === "undefined") {
            property = "";
          } else if (propType === "function") {
            Logging.info("key: " + field + " was function; will not serialize");
            continue;
          } else {
            var stringTarget = Util2.isArray(origProperty) ? origProperty : Util2.extractObject(origProperty);
            try {
              if (Util2.isPrimitive(stringTarget)) {
                property = stringTarget;
              } else {
                property = JSON.stringify(stringTarget);
              }
            } catch (e) {
              property = origProperty.constructor.name.toString() + " (Error: " + e.message + ")";
              Logging.info("key: " + field + ", could not be serialized");
            }
          }
          map[field] = property.substring(0, Util2.MAX_PROPERTY_LENGTH);
        }
        return map;
      };
      Util2.canIncludeCorrelationHeader = function(client, requestUrl) {
        var excludedDomains = client && client.config && client.config.correlationHeaderExcludedDomains;
        if (!excludedDomains || excludedDomains.length == 0 || !requestUrl) {
          return true;
        }
        for (var i = 0; i < excludedDomains.length; i++) {
          var regex = new RegExp(excludedDomains[i].replace(/\./g, ".").replace(/\*/g, ".*"));
          if (regex.test(url.parse(requestUrl).hostname)) {
            return false;
          }
        }
        return true;
      };
      Util2.getCorrelationContextTarget = function(response, key) {
        var contextHeaders = response.headers && response.headers[RequestResponseHeaders.requestContextHeader];
        if (contextHeaders) {
          var keyValues = contextHeaders.split(",");
          for (var i = 0; i < keyValues.length; ++i) {
            var keyValue = keyValues[i].split("=");
            if (keyValue.length == 2 && keyValue[0] == key) {
              return keyValue[1];
            }
          }
        }
      };
      Util2.makeRequest = function(config, requestUrl, requestOptions, requestCallback) {
        if (requestUrl && requestUrl.indexOf("//") === 0) {
          requestUrl = "https:" + requestUrl;
        }
        var requestUrlParsed = url.parse(requestUrl);
        var options = __assign(__assign({}, requestOptions), { host: requestUrlParsed.hostname, port: requestUrlParsed.port, path: requestUrlParsed.pathname });
        var proxyUrl = void 0;
        if (requestUrlParsed.protocol === "https:") {
          proxyUrl = config.proxyHttpsUrl || void 0;
        }
        if (requestUrlParsed.protocol === "http:") {
          proxyUrl = config.proxyHttpUrl || void 0;
        }
        if (proxyUrl) {
          if (proxyUrl.indexOf("//") === 0) {
            proxyUrl = "http:" + proxyUrl;
          }
          var proxyUrlParsed = url.parse(proxyUrl);
          if (proxyUrlParsed.protocol === "https:") {
            Logging.info("Proxies that use HTTPS are not supported");
            proxyUrl = void 0;
          } else {
            options = __assign(__assign({}, options), { host: proxyUrlParsed.hostname, port: proxyUrlParsed.port || "80", path: requestUrl, headers: __assign(__assign({}, options.headers), { Host: requestUrlParsed.hostname }) });
          }
        }
        var isHttps = requestUrlParsed.protocol === "https:" && !proxyUrl;
        if (isHttps && config.httpsAgent !== void 0) {
          options.agent = config.httpsAgent;
        } else if (!isHttps && config.httpAgent !== void 0) {
          options.agent = config.httpAgent;
        } else if (isHttps) {
          options.agent = Util2.tlsRestrictedAgent;
        }
        if (isHttps) {
          return https.request(options, requestCallback);
        } else {
          return http.request(options, requestCallback);
        }
      };
      ;
      Util2.safeIncludeCorrelationHeader = function(client, request, correlationHeader) {
        var header;
        if (typeof correlationHeader === "string") {
          header = correlationHeader;
        } else if (correlationHeader instanceof Array) {
          header = correlationHeader.join(",");
        } else if (correlationHeader && typeof correlationHeader.toString === "function") {
          try {
            header = correlationHeader.toString();
          } catch (err) {
            Logging.warn("Outgoing request-context header could not be read. Correlation of requests may be lost.", err, correlationHeader);
          }
        }
        if (header) {
          Util2.addCorrelationIdHeaderFromString(client, request, header);
        } else {
          request.setHeader(RequestResponseHeaders.requestContextHeader, RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
        }
      };
      Util2.dumpObj = function(object) {
        var objectTypeDump = Object["prototype"].toString.call(object);
        var propertyValueDump = "";
        if (objectTypeDump === "[object Error]") {
          propertyValueDump = "{ stack: '" + object.stack + "', message: '" + object.message + "', name: '" + object.name + "'";
        } else {
          propertyValueDump = JSON.stringify(object);
        }
        return objectTypeDump + propertyValueDump;
      };
      Util2.addCorrelationIdHeaderFromString = function(client, response, correlationHeader) {
        var components = correlationHeader.split(",");
        var key = RequestResponseHeaders.requestContextSourceKey + "=";
        var found = components.some(function(value) {
          return value.substring(0, key.length) === key;
        });
        if (!found) {
          response.setHeader(RequestResponseHeaders.requestContextHeader, correlationHeader + "," + RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
        }
      };
      Util2.MAX_PROPERTY_LENGTH = 8192;
      Util2.tlsRestrictedAgent = new https.Agent({
        keepAlive: true,
        maxSockets: 25,
        secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
      });
      return Util2;
    }();
    module2.exports = Util;
  }
});

// node_modules/applicationinsights/out/Library/CorrelationIdManager.js
var require_CorrelationIdManager = __commonJS({
  "node_modules/applicationinsights/out/Library/CorrelationIdManager.js"(exports, module2) {
    "use strict";
    var Util = require_Util();
    var Logging = require_Logging();
    var CorrelationIdManager = function() {
      function CorrelationIdManager2() {
      }
      CorrelationIdManager2.queryCorrelationId = function(config, callback) {
        var appIdUrlString = config.profileQueryEndpoint + "/api/profiles/" + config.instrumentationKey + "/appId";
        if (CorrelationIdManager2.completedLookups.hasOwnProperty(appIdUrlString)) {
          callback(CorrelationIdManager2.completedLookups[appIdUrlString]);
          return;
        } else if (CorrelationIdManager2.pendingLookups[appIdUrlString]) {
          CorrelationIdManager2.pendingLookups[appIdUrlString].push(callback);
          return;
        }
        CorrelationIdManager2.pendingLookups[appIdUrlString] = [callback];
        var fetchAppId = function() {
          if (!CorrelationIdManager2.pendingLookups[appIdUrlString]) {
            return;
          }
          var requestOptions = {
            method: "GET",
            disableAppInsightsAutoCollection: true
          };
          Logging.info(CorrelationIdManager2.TAG, requestOptions);
          var req = Util.makeRequest(config, appIdUrlString, requestOptions, function(res) {
            if (res.statusCode === 200) {
              var appId_1 = "";
              res.setEncoding("utf-8");
              res.on("data", function(data) {
                appId_1 += data;
              });
              res.on("end", function() {
                Logging.info(CorrelationIdManager2.TAG, appId_1);
                var result = CorrelationIdManager2.correlationIdPrefix + appId_1;
                CorrelationIdManager2.completedLookups[appIdUrlString] = result;
                if (CorrelationIdManager2.pendingLookups[appIdUrlString]) {
                  CorrelationIdManager2.pendingLookups[appIdUrlString].forEach(function(cb) {
                    return cb(result);
                  });
                }
                delete CorrelationIdManager2.pendingLookups[appIdUrlString];
              });
            } else if (res.statusCode >= 400 && res.statusCode < 500) {
              CorrelationIdManager2.completedLookups[appIdUrlString] = void 0;
              delete CorrelationIdManager2.pendingLookups[appIdUrlString];
            } else {
              setTimeout(fetchAppId, config.correlationIdRetryIntervalMs);
            }
          });
          if (req) {
            req.on("error", function(error) {
              Logging.warn(CorrelationIdManager2.TAG, error);
            });
            req.end();
          }
        };
        setTimeout(fetchAppId, 0);
      };
      CorrelationIdManager2.cancelCorrelationIdQuery = function(config, callback) {
        var appIdUrlString = config.profileQueryEndpoint + "/api/profiles/" + config.instrumentationKey + "/appId";
        var pendingLookups = CorrelationIdManager2.pendingLookups[appIdUrlString];
        if (pendingLookups) {
          CorrelationIdManager2.pendingLookups[appIdUrlString] = pendingLookups.filter(function(cb) {
            return cb != callback;
          });
          if (CorrelationIdManager2.pendingLookups[appIdUrlString].length == 0) {
            delete CorrelationIdManager2.pendingLookups[appIdUrlString];
          }
        }
      };
      CorrelationIdManager2.generateRequestId = function(parentId) {
        if (parentId) {
          parentId = parentId[0] == "|" ? parentId : "|" + parentId;
          if (parentId[parentId.length - 1] !== ".") {
            parentId += ".";
          }
          var suffix = (CorrelationIdManager2.currentRootId++).toString(16);
          return CorrelationIdManager2.appendSuffix(parentId, suffix, "_");
        } else {
          return CorrelationIdManager2.generateRootId();
        }
      };
      CorrelationIdManager2.getRootId = function(id) {
        var endIndex = id.indexOf(".");
        if (endIndex < 0) {
          endIndex = id.length;
        }
        var startIndex = id[0] === "|" ? 1 : 0;
        return id.substring(startIndex, endIndex);
      };
      CorrelationIdManager2.generateRootId = function() {
        return "|" + Util.w3cTraceId() + ".";
      };
      CorrelationIdManager2.appendSuffix = function(parentId, suffix, delimiter) {
        if (parentId.length + suffix.length < CorrelationIdManager2.requestIdMaxLength) {
          return parentId + suffix + delimiter;
        }
        var trimPosition = CorrelationIdManager2.requestIdMaxLength - 9;
        if (parentId.length > trimPosition) {
          for (; trimPosition > 1; --trimPosition) {
            var c = parentId[trimPosition - 1];
            if (c === "." || c === "_") {
              break;
            }
          }
        }
        if (trimPosition <= 1) {
          return CorrelationIdManager2.generateRootId();
        }
        suffix = Util.randomu32().toString(16);
        while (suffix.length < 8) {
          suffix = "0" + suffix;
        }
        return parentId.substring(0, trimPosition) + suffix + "#";
      };
      CorrelationIdManager2.TAG = "CorrelationIdManager";
      CorrelationIdManager2.correlationIdPrefix = "cid-v1:";
      CorrelationIdManager2.w3cEnabled = true;
      CorrelationIdManager2.pendingLookups = {};
      CorrelationIdManager2.completedLookups = {};
      CorrelationIdManager2.requestIdMaxLength = 1024;
      CorrelationIdManager2.currentRootId = Util.randomu32();
      return CorrelationIdManager2;
    }();
    module2.exports = CorrelationIdManager;
  }
});

// node_modules/applicationinsights/out/Library/Traceparent.js
var require_Traceparent = __commonJS({
  "node_modules/applicationinsights/out/Library/Traceparent.js"(exports, module2) {
    "use strict";
    var Util = require_Util();
    var CorrelationIdManager = require_CorrelationIdManager();
    var Traceparent = function() {
      function Traceparent2(traceparent, parentId) {
        this.traceFlag = Traceparent2.DEFAULT_TRACE_FLAG;
        this.version = Traceparent2.DEFAULT_VERSION;
        if (traceparent && typeof traceparent === "string") {
          if (traceparent.split(",").length > 1) {
            this.traceId = Util.w3cTraceId();
            this.spanId = Util.w3cTraceId().substr(0, 16);
          } else {
            var traceparentArr = traceparent.trim().split("-");
            var len = traceparentArr.length;
            if (len >= 4) {
              this.version = traceparentArr[0];
              this.traceId = traceparentArr[1];
              this.spanId = traceparentArr[2];
              this.traceFlag = traceparentArr[3];
            } else {
              this.traceId = Util.w3cTraceId();
              this.spanId = Util.w3cTraceId().substr(0, 16);
            }
            if (!this.version.match(/^[0-9a-f]{2}$/g)) {
              this.version = Traceparent2.DEFAULT_VERSION;
              this.traceId = Util.w3cTraceId();
            }
            if (this.version === "00" && len !== 4) {
              this.traceId = Util.w3cTraceId();
              this.spanId = Util.w3cTraceId().substr(0, 16);
            }
            if (this.version === "ff") {
              this.version = Traceparent2.DEFAULT_VERSION;
              this.traceId = Util.w3cTraceId();
              this.spanId = Util.w3cTraceId().substr(0, 16);
            }
            if (!this.version.match(/^0[0-9a-f]$/g)) {
              this.version = Traceparent2.DEFAULT_VERSION;
            }
            if (!this.traceFlag.match(/^[0-9a-f]{2}$/g)) {
              this.traceFlag = Traceparent2.DEFAULT_TRACE_FLAG;
              this.traceId = Util.w3cTraceId();
            }
            if (!Traceparent2.isValidTraceId(this.traceId)) {
              this.traceId = Util.w3cTraceId();
            }
            if (!Traceparent2.isValidSpanId(this.spanId)) {
              this.spanId = Util.w3cTraceId().substr(0, 16);
              this.traceId = Util.w3cTraceId();
            }
            this.parentId = this.getBackCompatRequestId();
          }
        } else if (parentId) {
          this.parentId = parentId.slice();
          var operationId = CorrelationIdManager.getRootId(parentId);
          if (!Traceparent2.isValidTraceId(operationId)) {
            this.legacyRootId = operationId;
            operationId = Util.w3cTraceId();
          }
          if (parentId.indexOf("|") !== -1) {
            parentId = parentId.substring(1 + parentId.substring(0, parentId.length - 1).lastIndexOf("."), parentId.length - 1);
          }
          this.traceId = operationId;
          this.spanId = parentId;
        } else {
          this.traceId = Util.w3cTraceId();
          this.spanId = Util.w3cTraceId().substr(0, 16);
        }
      }
      Traceparent2.isValidTraceId = function(id) {
        return id.match(/^[0-9a-f]{32}$/) && id !== "00000000000000000000000000000000";
      };
      Traceparent2.isValidSpanId = function(id) {
        return id.match(/^[0-9a-f]{16}$/) && id !== "0000000000000000";
      };
      Traceparent2.formatOpenTelemetryTraceFlags = function(traceFlags) {
        var formattedFlags = "0" + traceFlags.toString(16);
        return formattedFlags.substring(formattedFlags.length - 2);
      };
      Traceparent2.prototype.getBackCompatRequestId = function() {
        return "|" + this.traceId + "." + this.spanId + ".";
      };
      Traceparent2.prototype.toString = function() {
        return this.version + "-" + this.traceId + "-" + this.spanId + "-" + this.traceFlag;
      };
      Traceparent2.prototype.updateSpanId = function() {
        this.spanId = Util.w3cTraceId().substr(0, 16);
      };
      Traceparent2.DEFAULT_TRACE_FLAG = "01";
      Traceparent2.DEFAULT_VERSION = "00";
      return Traceparent2;
    }();
    module2.exports = Traceparent;
  }
});

// node_modules/applicationinsights/out/Library/Tracestate.js
var require_Tracestate = __commonJS({
  "node_modules/applicationinsights/out/Library/Tracestate.js"(exports, module2) {
    "use strict";
    var Tracestate = function() {
      function Tracestate2(id) {
        this.fieldmap = [];
        if (!id) {
          return;
        }
        this.fieldmap = this.parseHeader(id);
      }
      Tracestate2.prototype.toString = function() {
        var fieldarr = this.fieldmap;
        if (!fieldarr || fieldarr.length == 0) {
          return null;
        }
        return fieldarr.join(", ");
      };
      Tracestate2.validateKeyChars = function(key) {
        var keyParts = key.split("@");
        if (keyParts.length == 2) {
          var tenant = keyParts[0].trim();
          var vendor = keyParts[1].trim();
          var tenantValid = Boolean(tenant.match(/^[\ ]?[a-z0-9\*\-\_/]{1,241}$/));
          var vendorValid = Boolean(vendor.match(/^[\ ]?[a-z0-9\*\-\_/]{1,14}$/));
          return tenantValid && vendorValid;
        } else if (keyParts.length == 1) {
          return Boolean(key.match(/^[\ ]?[a-z0-9\*\-\_/]{1,256}$/));
        }
        return false;
      };
      Tracestate2.prototype.parseHeader = function(id) {
        var res = [];
        var keydeduper = {};
        var parts = id.split(",");
        if (parts.length > 32)
          return null;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
          var rawPart = parts_1[_i];
          var part = rawPart.trim();
          if (part.length === 0) {
            continue;
          }
          var pair = part.split("=");
          if (pair.length !== 2) {
            return null;
          }
          if (!Tracestate2.validateKeyChars(pair[0])) {
            return null;
          }
          if (keydeduper[pair[0]]) {
            return null;
          } else {
            keydeduper[pair[0]] = true;
          }
          res.push(part);
        }
        return res;
      };
      Tracestate2.strict = true;
      return Tracestate2;
    }();
    module2.exports = Tracestate;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/Domain.js
var require_Domain = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/Domain.js"(exports, module2) {
    "use strict";
    var Domain = function() {
      function Domain2() {
      }
      return Domain2;
    }();
    module2.exports = Domain;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/AvailabilityData.js
var require_AvailabilityData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/AvailabilityData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var AvailabilityData = function(_super) {
      __extends(AvailabilityData2, _super);
      function AvailabilityData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
      }
      return AvailabilityData2;
    }(Domain);
    module2.exports = AvailabilityData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/Base.js
var require_Base = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/Base.js"(exports, module2) {
    "use strict";
    var Base = function() {
      function Base2() {
      }
      return Base2;
    }();
    module2.exports = Base;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/ContextTagKeys.js
var require_ContextTagKeys = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/ContextTagKeys.js"(exports, module2) {
    "use strict";
    var ContextTagKeys = function() {
      function ContextTagKeys2() {
        this.applicationVersion = "ai.application.ver";
        this.deviceId = "ai.device.id";
        this.deviceLocale = "ai.device.locale";
        this.deviceModel = "ai.device.model";
        this.deviceOEMName = "ai.device.oemName";
        this.deviceOSVersion = "ai.device.osVersion";
        this.deviceType = "ai.device.type";
        this.locationIp = "ai.location.ip";
        this.operationId = "ai.operation.id";
        this.operationName = "ai.operation.name";
        this.operationParentId = "ai.operation.parentId";
        this.operationSyntheticSource = "ai.operation.syntheticSource";
        this.operationCorrelationVector = "ai.operation.correlationVector";
        this.sessionId = "ai.session.id";
        this.sessionIsFirst = "ai.session.isFirst";
        this.userAccountId = "ai.user.accountId";
        this.userId = "ai.user.id";
        this.userAuthUserId = "ai.user.authUserId";
        this.cloudRole = "ai.cloud.role";
        this.cloudRoleInstance = "ai.cloud.roleInstance";
        this.internalSdkVersion = "ai.internal.sdkVersion";
        this.internalAgentVersion = "ai.internal.agentVersion";
        this.internalNodeName = "ai.internal.nodeName";
      }
      return ContextTagKeys2;
    }();
    module2.exports = ContextTagKeys;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/Data.js
var require_Data = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/Data.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Base = require_Base();
    var Data = function(_super) {
      __extends(Data2, _super);
      function Data2() {
        return _super.call(this) || this;
      }
      return Data2;
    }(Base);
    module2.exports = Data;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/DataPointType.js
var require_DataPointType = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/DataPointType.js"(exports, module2) {
    "use strict";
    var DataPointType;
    (function(DataPointType2) {
      DataPointType2[DataPointType2["Measurement"] = 0] = "Measurement";
      DataPointType2[DataPointType2["Aggregation"] = 1] = "Aggregation";
    })(DataPointType || (DataPointType = {}));
    module2.exports = DataPointType;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/DataPoint.js
var require_DataPoint = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/DataPoint.js"(exports, module2) {
    "use strict";
    var DataPointType = require_DataPointType();
    var DataPoint = function() {
      function DataPoint2() {
        this.kind = DataPointType.Measurement;
      }
      return DataPoint2;
    }();
    module2.exports = DataPoint;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/Envelope.js
var require_Envelope = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/Envelope.js"(exports, module2) {
    "use strict";
    var Envelope = function() {
      function Envelope2() {
        this.ver = 1;
        this.sampleRate = 100;
        this.tags = {};
      }
      return Envelope2;
    }();
    module2.exports = Envelope;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/EventData.js
var require_EventData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/EventData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var EventData = function(_super) {
      __extends(EventData2, _super);
      function EventData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
      }
      return EventData2;
    }(Domain);
    module2.exports = EventData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/ExceptionData.js
var require_ExceptionData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/ExceptionData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var ExceptionData = function(_super) {
      __extends(ExceptionData2, _super);
      function ExceptionData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.exceptions = [];
        _this.properties = {};
        _this.measurements = {};
        return _this;
      }
      return ExceptionData2;
    }(Domain);
    module2.exports = ExceptionData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/ExceptionDetails.js
var require_ExceptionDetails = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/ExceptionDetails.js"(exports, module2) {
    "use strict";
    var ExceptionDetails = function() {
      function ExceptionDetails2() {
        this.hasFullStack = true;
        this.parsedStack = [];
      }
      return ExceptionDetails2;
    }();
    module2.exports = ExceptionDetails;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/MessageData.js
var require_MessageData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/MessageData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var MessageData = function(_super) {
      __extends(MessageData2, _super);
      function MessageData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        return _this;
      }
      return MessageData2;
    }(Domain);
    module2.exports = MessageData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/MetricData.js
var require_MetricData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/MetricData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var MetricData = function(_super) {
      __extends(MetricData2, _super);
      function MetricData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.metrics = [];
        _this.properties = {};
        return _this;
      }
      return MetricData2;
    }(Domain);
    module2.exports = MetricData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/PageViewData.js
var require_PageViewData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/PageViewData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var EventData = require_EventData();
    var PageViewData = function(_super) {
      __extends(PageViewData2, _super);
      function PageViewData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
      }
      return PageViewData2;
    }(EventData);
    module2.exports = PageViewData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/RemoteDependencyData.js
var require_RemoteDependencyData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/RemoteDependencyData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var RemoteDependencyData = function(_super) {
      __extends(RemoteDependencyData2, _super);
      function RemoteDependencyData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.success = true;
        _this.properties = {};
        _this.measurements = {};
        return _this;
      }
      return RemoteDependencyData2;
    }(Domain);
    module2.exports = RemoteDependencyData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/RequestData.js
var require_RequestData = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/RequestData.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var Domain = require_Domain();
    var RequestData = function(_super) {
      __extends(RequestData2, _super);
      function RequestData2() {
        var _this = _super.call(this) || this;
        _this.ver = 2;
        _this.properties = {};
        _this.measurements = {};
        return _this;
      }
      return RequestData2;
    }(Domain);
    module2.exports = RequestData;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/SeverityLevel.js
var require_SeverityLevel = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/SeverityLevel.js"(exports, module2) {
    "use strict";
    var SeverityLevel;
    (function(SeverityLevel2) {
      SeverityLevel2[SeverityLevel2["Verbose"] = 0] = "Verbose";
      SeverityLevel2[SeverityLevel2["Information"] = 1] = "Information";
      SeverityLevel2[SeverityLevel2["Warning"] = 2] = "Warning";
      SeverityLevel2[SeverityLevel2["Error"] = 3] = "Error";
      SeverityLevel2[SeverityLevel2["Critical"] = 4] = "Critical";
    })(SeverityLevel || (SeverityLevel = {}));
    module2.exports = SeverityLevel;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/StackFrame.js
var require_StackFrame = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/StackFrame.js"(exports, module2) {
    "use strict";
    var StackFrame = function() {
      function StackFrame2() {
      }
      return StackFrame2;
    }();
    module2.exports = StackFrame;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Generated/index.js
var require_Generated = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Generated/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AvailabilityData = require_AvailabilityData();
    exports.Base = require_Base();
    exports.ContextTagKeys = require_ContextTagKeys();
    exports.Data = require_Data();
    exports.DataPoint = require_DataPoint();
    exports.DataPointType = require_DataPointType();
    exports.Domain = require_Domain();
    exports.Envelope = require_Envelope();
    exports.EventData = require_EventData();
    exports.ExceptionData = require_ExceptionData();
    exports.ExceptionDetails = require_ExceptionDetails();
    exports.MessageData = require_MessageData();
    exports.MetricData = require_MetricData();
    exports.PageViewData = require_PageViewData();
    exports.RemoteDependencyData = require_RemoteDependencyData();
    exports.RequestData = require_RequestData();
    exports.SeverityLevel = require_SeverityLevel();
    exports.StackFrame = require_StackFrame();
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/Constants.js
var require_Constants = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/Constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.domainSupportsProperties = exports.RemoteDependencyDataConstants = void 0;
    var Generated_1 = require_Generated();
    var RemoteDependencyDataConstants = function() {
      function RemoteDependencyDataConstants2() {
      }
      RemoteDependencyDataConstants2.TYPE_HTTP = "Http";
      RemoteDependencyDataConstants2.TYPE_AI = "Http (tracked component)";
      return RemoteDependencyDataConstants2;
    }();
    exports.RemoteDependencyDataConstants = RemoteDependencyDataConstants;
    function domainSupportsProperties(domain) {
      return "properties" in domain || domain instanceof Generated_1.EventData || domain instanceof Generated_1.ExceptionData || domain instanceof Generated_1.MessageData || domain instanceof Generated_1.MetricData || domain instanceof Generated_1.PageViewData || domain instanceof Generated_1.RemoteDependencyData || domain instanceof Generated_1.RequestData;
    }
    exports.domainSupportsProperties = domainSupportsProperties;
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/DependencyTelemetry.js
var require_DependencyTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/DependencyTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/EventTelemetry.js
var require_EventTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/EventTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/ExceptionTelemetry.js
var require_ExceptionTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/ExceptionTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/MetricTelemetry.js
var require_MetricTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/MetricTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/RequestTelemetry.js
var require_RequestTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/RequestTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/TraceTelemetry.js
var require_TraceTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/TraceTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/Telemetry.js
var require_Telemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/Telemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/NodeHttpDependencyTelemetry.js
var require_NodeHttpDependencyTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/NodeHttpDependencyTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/NodeHttpRequestTelemetry.js
var require_NodeHttpRequestTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/NodeHttpRequestTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/AvailabilityTelemetry.js
var require_AvailabilityTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/AvailabilityTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/PageViewTelemetry.js
var require_PageViewTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/PageViewTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/EnvelopeTelemetry.js
var require_EnvelopeTelemetry = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/EnvelopeTelemetry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/TelemetryType.js
var require_TelemetryType = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/TelemetryType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TelemetryType = exports.TelemetryTypeString = exports.baseTypeToTelemetryType = exports.telemetryTypeToBaseType = void 0;
    function telemetryTypeToBaseType(type) {
      switch (type) {
        case TelemetryType.Event:
          return "EventData";
        case TelemetryType.Exception:
          return "ExceptionData";
        case TelemetryType.Trace:
          return "MessageData";
        case TelemetryType.Metric:
          return "MetricData";
        case TelemetryType.Request:
          return "RequestData";
        case TelemetryType.Dependency:
          return "RemoteDependencyData";
        case TelemetryType.Availability:
          return "AvailabilityData";
        case TelemetryType.PageView:
          return "PageViewData";
      }
      return void 0;
    }
    exports.telemetryTypeToBaseType = telemetryTypeToBaseType;
    function baseTypeToTelemetryType(baseType) {
      switch (baseType) {
        case "EventData":
          return TelemetryType.Event;
        case "ExceptionData":
          return TelemetryType.Exception;
        case "MessageData":
          return TelemetryType.Trace;
        case "MetricData":
          return TelemetryType.Metric;
        case "RequestData":
          return TelemetryType.Request;
        case "RemoteDependencyData":
          return TelemetryType.Dependency;
        case "AvailabilityData":
          return TelemetryType.Availability;
        case "PageViewData":
          return TelemetryType.PageView;
      }
      return void 0;
    }
    exports.baseTypeToTelemetryType = baseTypeToTelemetryType;
    exports.TelemetryTypeString = {
      Event: "EventData",
      Exception: "ExceptionData",
      Trace: "MessageData",
      Metric: "MetricData",
      Request: "RequestData",
      Dependency: "RemoteDependencyData",
      Availability: "AvailabilityData",
      PageView: "PageViewData"
    };
    var TelemetryType;
    (function(TelemetryType2) {
      TelemetryType2[TelemetryType2["Event"] = 0] = "Event";
      TelemetryType2[TelemetryType2["Exception"] = 1] = "Exception";
      TelemetryType2[TelemetryType2["Trace"] = 2] = "Trace";
      TelemetryType2[TelemetryType2["Metric"] = 3] = "Metric";
      TelemetryType2[TelemetryType2["Request"] = 4] = "Request";
      TelemetryType2[TelemetryType2["Dependency"] = 5] = "Dependency";
      TelemetryType2[TelemetryType2["Availability"] = 6] = "Availability";
      TelemetryType2[TelemetryType2["PageView"] = 7] = "PageView";
    })(TelemetryType = exports.TelemetryType || (exports.TelemetryType = {}));
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/index.js
var require_TelemetryTypes = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/TelemetryTypes/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_DependencyTelemetry(), exports);
    __exportStar(require_EventTelemetry(), exports);
    __exportStar(require_ExceptionTelemetry(), exports);
    __exportStar(require_MetricTelemetry(), exports);
    __exportStar(require_RequestTelemetry(), exports);
    __exportStar(require_TraceTelemetry(), exports);
    __exportStar(require_Telemetry(), exports);
    __exportStar(require_NodeHttpDependencyTelemetry(), exports);
    __exportStar(require_NodeHttpRequestTelemetry(), exports);
    __exportStar(require_AvailabilityTelemetry(), exports);
    __exportStar(require_PageViewTelemetry(), exports);
    __exportStar(require_EnvelopeTelemetry(), exports);
    __exportStar(require_TelemetryType(), exports);
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/MetricQuickPulse.js
var require_MetricQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/MetricQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/EnvelopeQuickPulse.js
var require_EnvelopeQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/EnvelopeQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/DocumentQuickPulse.js
var require_DocumentQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/DocumentQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/ExceptionDocumentQuickPulse.js
var require_ExceptionDocumentQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/ExceptionDocumentQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/MessageDocumentQuickPulse.js
var require_MessageDocumentQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/MessageDocumentQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/DependencyDocumentQuickPulse.js
var require_DependencyDocumentQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/DependencyDocumentQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/RequestDocumentQuickPulse.js
var require_RequestDocumentQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/RequestDocumentQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/EventDocumentQuickPulse.js
var require_EventDocumentQuickPulse = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/EventDocumentQuickPulse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/index.js
var require_QuickPulseTypes = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/QuickPulseTypes/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_MetricQuickPulse(), exports);
    __exportStar(require_EnvelopeQuickPulse(), exports);
    __exportStar(require_DocumentQuickPulse(), exports);
    __exportStar(require_ExceptionDocumentQuickPulse(), exports);
    __exportStar(require_MessageDocumentQuickPulse(), exports);
    __exportStar(require_DependencyDocumentQuickPulse(), exports);
    __exportStar(require_RequestDocumentQuickPulse(), exports);
    __exportStar(require_EventDocumentQuickPulse(), exports);
  }
});

// node_modules/applicationinsights/out/Declarations/Contracts/index.js
var require_Contracts = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Contracts/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Constants(), exports);
    __exportStar(require_Generated(), exports);
    __exportStar(require_TelemetryTypes(), exports);
    __exportStar(require_QuickPulseTypes(), exports);
  }
});

// node_modules/applicationinsights/out/AutoCollection/RequestParser.js
var require_RequestParser = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/RequestParser.js"(exports, module2) {
    "use strict";
    var RequestParser = function() {
      function RequestParser2() {
      }
      RequestParser2.prototype.getUrl = function() {
        return this.url;
      };
      RequestParser2.prototype.RequestParser = function() {
        this.startTime = +new Date();
      };
      RequestParser2.prototype._setStatus = function(status, error) {
        var endTime = +new Date();
        this.duration = endTime - this.startTime;
        this.statusCode = status;
        var properties = this.properties || {};
        if (error) {
          if (typeof error === "string") {
            properties["error"] = error;
          } else if (error instanceof Error) {
            properties["error"] = error.message;
          } else if (typeof error === "object") {
            for (var key in error) {
              properties[key] = error[key] && error[key].toString && error[key].toString();
            }
          }
        }
        this.properties = properties;
      };
      RequestParser2.prototype._isSuccess = function() {
        return 0 < this.statusCode && this.statusCode < 400;
      };
      return RequestParser2;
    }();
    module2.exports = RequestParser;
  }
});

// node_modules/applicationinsights/out/AutoCollection/HttpRequestParser.js
var require_HttpRequestParser = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/HttpRequestParser.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var url = require("url");
    var Contracts = require_Contracts();
    var Util = require_Util();
    var RequestResponseHeaders = require_RequestResponseHeaders();
    var RequestParser = require_RequestParser();
    var CorrelationIdManager = require_CorrelationIdManager();
    var Tracestate = require_Tracestate();
    var Traceparent = require_Traceparent();
    var HttpRequestParser = function(_super) {
      __extends(HttpRequestParser2, _super);
      function HttpRequestParser2(request, requestId) {
        var _this = _super.call(this) || this;
        if (request) {
          _this.method = request.method;
          _this.url = _this._getAbsoluteUrl(request);
          _this.startTime = +new Date();
          _this.socketRemoteAddress = request.socket && request.socket.remoteAddress;
          _this.parseHeaders(request, requestId);
          if (request.connection) {
            _this.connectionRemoteAddress = request.connection.remoteAddress;
            _this.legacySocketRemoteAddress = request.connection["socket"] && request.connection["socket"].remoteAddress;
          }
        }
        return _this;
      }
      HttpRequestParser2.prototype.onError = function(error, ellapsedMilliseconds) {
        this._setStatus(void 0, error);
        if (ellapsedMilliseconds) {
          this.duration = ellapsedMilliseconds;
        }
      };
      HttpRequestParser2.prototype.onResponse = function(response, ellapsedMilliseconds) {
        this._setStatus(response.statusCode, void 0);
        if (ellapsedMilliseconds) {
          this.duration = ellapsedMilliseconds;
        }
      };
      HttpRequestParser2.prototype.getRequestTelemetry = function(baseTelemetry) {
        var requestTelemetry = {
          id: this.requestId,
          name: this.method + " " + url.parse(this.url).pathname,
          url: this.url,
          source: this.sourceCorrelationId,
          duration: this.duration,
          resultCode: this.statusCode ? this.statusCode.toString() : null,
          success: this._isSuccess(),
          properties: this.properties
        };
        if (baseTelemetry && baseTelemetry.time) {
          requestTelemetry.time = baseTelemetry.time;
        } else if (this.startTime) {
          requestTelemetry.time = new Date(this.startTime);
        }
        if (baseTelemetry) {
          for (var key in baseTelemetry) {
            if (!requestTelemetry[key]) {
              requestTelemetry[key] = baseTelemetry[key];
            }
          }
          if (baseTelemetry.properties) {
            for (var key in baseTelemetry.properties) {
              requestTelemetry.properties[key] = baseTelemetry.properties[key];
            }
          }
        }
        return requestTelemetry;
      };
      HttpRequestParser2.prototype.getRequestTags = function(tags) {
        var newTags = {};
        for (var key in tags) {
          newTags[key] = tags[key];
        }
        newTags[HttpRequestParser2.keys.locationIp] = tags[HttpRequestParser2.keys.locationIp] || this._getIp();
        newTags[HttpRequestParser2.keys.sessionId] = tags[HttpRequestParser2.keys.sessionId] || this._getId("ai_session");
        newTags[HttpRequestParser2.keys.userId] = tags[HttpRequestParser2.keys.userId] || this._getId("ai_user");
        newTags[HttpRequestParser2.keys.userAuthUserId] = tags[HttpRequestParser2.keys.userAuthUserId] || this._getId("ai_authUser");
        newTags[HttpRequestParser2.keys.operationName] = this.getOperationName(tags);
        newTags[HttpRequestParser2.keys.operationParentId] = this.getOperationParentId(tags);
        newTags[HttpRequestParser2.keys.operationId] = this.getOperationId(tags);
        return newTags;
      };
      HttpRequestParser2.prototype.getOperationId = function(tags) {
        return tags[HttpRequestParser2.keys.operationId] || this.operationId;
      };
      HttpRequestParser2.prototype.getOperationParentId = function(tags) {
        return tags[HttpRequestParser2.keys.operationParentId] || this.parentId || this.getOperationId(tags);
      };
      HttpRequestParser2.prototype.getOperationName = function(tags) {
        return tags[HttpRequestParser2.keys.operationName] || this.method + " " + url.parse(this.url).pathname;
      };
      HttpRequestParser2.prototype.getRequestId = function() {
        return this.requestId;
      };
      HttpRequestParser2.prototype.getCorrelationContextHeader = function() {
        return this.correlationContextHeader;
      };
      HttpRequestParser2.prototype.getTraceparent = function() {
        return this.traceparent;
      };
      HttpRequestParser2.prototype.getTracestate = function() {
        return this.tracestate;
      };
      HttpRequestParser2.prototype.getLegacyRootId = function() {
        return this.legacyRootId;
      };
      HttpRequestParser2.prototype._getAbsoluteUrl = function(request) {
        if (!request.headers) {
          return request.url;
        }
        var encrypted = request.connection ? request.connection.encrypted : null;
        var requestUrl = url.parse(request.url);
        var pathName = requestUrl.pathname;
        var search = requestUrl.search;
        var protocol = encrypted || request.headers["x-forwarded-proto"] == "https" ? "https" : "http";
        var absoluteUrl = url.format({
          protocol,
          host: request.headers.host,
          pathname: pathName,
          search
        });
        return absoluteUrl;
      };
      HttpRequestParser2.prototype._getIp = function() {
        var ipMatch = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
        var check = function(str) {
          var results = ipMatch.exec(str);
          if (results) {
            return results[0];
          }
        };
        var ip = check(this.rawHeaders["x-forwarded-for"]) || check(this.rawHeaders["x-client-ip"]) || check(this.rawHeaders["x-real-ip"]) || check(this.connectionRemoteAddress) || check(this.socketRemoteAddress) || check(this.legacySocketRemoteAddress);
        if (!ip && this.connectionRemoteAddress && this.connectionRemoteAddress.substr && this.connectionRemoteAddress.substr(0, 2) === "::") {
          ip = "127.0.0.1";
        }
        return ip;
      };
      HttpRequestParser2.prototype._getId = function(name) {
        var cookie = this.rawHeaders && this.rawHeaders["cookie"] && typeof this.rawHeaders["cookie"] === "string" && this.rawHeaders["cookie"] || "";
        var value = HttpRequestParser2.parseId(Util.getCookie(name, cookie));
        return value;
      };
      HttpRequestParser2.prototype.setBackCompatFromThisTraceContext = function() {
        this.operationId = this.traceparent.traceId;
        if (this.traceparent.legacyRootId) {
          this.legacyRootId = this.traceparent.legacyRootId;
        }
        this.parentId = this.traceparent.parentId;
        this.traceparent.updateSpanId();
        this.requestId = this.traceparent.getBackCompatRequestId();
      };
      HttpRequestParser2.prototype.parseHeaders = function(request, requestId) {
        this.rawHeaders = request.headers || request.rawHeaders;
        this.userAgent = request.headers && request.headers["user-agent"];
        this.sourceCorrelationId = Util.getCorrelationContextTarget(request, RequestResponseHeaders.requestContextSourceKey);
        if (request.headers) {
          var tracestateHeader = request.headers[RequestResponseHeaders.traceStateHeader] ? request.headers[RequestResponseHeaders.traceStateHeader].toString() : null;
          var traceparentHeader = request.headers[RequestResponseHeaders.traceparentHeader] ? request.headers[RequestResponseHeaders.traceparentHeader].toString() : null;
          var requestIdHeader = request.headers[RequestResponseHeaders.requestIdHeader] ? request.headers[RequestResponseHeaders.requestIdHeader].toString() : null;
          var legacy_parentId = request.headers[RequestResponseHeaders.parentIdHeader] ? request.headers[RequestResponseHeaders.parentIdHeader].toString() : null;
          var legacy_rootId = request.headers[RequestResponseHeaders.rootIdHeader] ? request.headers[RequestResponseHeaders.rootIdHeader].toString() : null;
          this.correlationContextHeader = request.headers[RequestResponseHeaders.correlationContextHeader] ? request.headers[RequestResponseHeaders.correlationContextHeader].toString() : null;
          if (CorrelationIdManager.w3cEnabled && (traceparentHeader || tracestateHeader)) {
            this.traceparent = new Traceparent(traceparentHeader ? traceparentHeader.toString() : null);
            this.tracestate = traceparentHeader && tracestateHeader && new Tracestate(tracestateHeader ? tracestateHeader.toString() : null);
            this.setBackCompatFromThisTraceContext();
          } else if (requestIdHeader) {
            if (CorrelationIdManager.w3cEnabled) {
              this.traceparent = new Traceparent(null, requestIdHeader);
              this.setBackCompatFromThisTraceContext();
            } else {
              this.parentId = requestIdHeader;
              this.requestId = CorrelationIdManager.generateRequestId(this.parentId);
              this.operationId = CorrelationIdManager.getRootId(this.requestId);
            }
          } else {
            if (CorrelationIdManager.w3cEnabled) {
              this.traceparent = new Traceparent();
              this.traceparent.parentId = legacy_parentId;
              this.traceparent.legacyRootId = legacy_rootId || legacy_parentId;
              this.setBackCompatFromThisTraceContext();
            } else {
              this.parentId = legacy_parentId;
              this.requestId = CorrelationIdManager.generateRequestId(legacy_rootId || this.parentId);
              this.correlationContextHeader = null;
              this.operationId = CorrelationIdManager.getRootId(this.requestId);
            }
          }
          if (requestId) {
            this.requestId = requestId;
            this.operationId = CorrelationIdManager.getRootId(this.requestId);
          }
        }
      };
      HttpRequestParser2.parseId = function(cookieValue) {
        var cookieParts = cookieValue.split("|");
        if (cookieParts.length > 0) {
          return cookieParts[0];
        }
        return "";
      };
      HttpRequestParser2.keys = new Contracts.ContextTagKeys();
      return HttpRequestParser2;
    }(RequestParser);
    module2.exports = HttpRequestParser;
  }
});

// node_modules/shimmer/index.js
var require_shimmer = __commonJS({
  "node_modules/shimmer/index.js"(exports, module2) {
    "use strict";
    function isFunction(funktion) {
      return typeof funktion === "function";
    }
    var logger = console.error.bind(console);
    function defineProperty(obj, name, value) {
      var enumerable = !!obj[name] && obj.propertyIsEnumerable(name);
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable,
        writable: true,
        value
      });
    }
    function shimmer(options) {
      if (options && options.logger) {
        if (!isFunction(options.logger))
          logger("new logger isn't a function, not replacing");
        else
          logger = options.logger;
      }
    }
    function wrap(nodule, name, wrapper) {
      if (!nodule || !nodule[name]) {
        logger("no original function " + name + " to wrap");
        return;
      }
      if (!wrapper) {
        logger("no wrapper function");
        logger(new Error().stack);
        return;
      }
      if (!isFunction(nodule[name]) || !isFunction(wrapper)) {
        logger("original object and wrapper must be functions");
        return;
      }
      var original = nodule[name];
      var wrapped = wrapper(original, name);
      defineProperty(wrapped, "__original", original);
      defineProperty(wrapped, "__unwrap", function() {
        if (nodule[name] === wrapped)
          defineProperty(nodule, name, original);
      });
      defineProperty(wrapped, "__wrapped", true);
      defineProperty(nodule, name, wrapped);
      return wrapped;
    }
    function massWrap(nodules, names, wrapper) {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to wrap on modules");
        return;
      }
      nodules.forEach(function(nodule) {
        names.forEach(function(name) {
          wrap(nodule, name, wrapper);
        });
      });
    }
    function unwrap(nodule, name) {
      if (!nodule || !nodule[name]) {
        logger("no function to unwrap.");
        logger(new Error().stack);
        return;
      }
      if (!nodule[name].__unwrap) {
        logger("no original to unwrap to -- has " + name + " already been unwrapped?");
      } else {
        return nodule[name].__unwrap();
      }
    }
    function massUnwrap(nodules, names) {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to unwrap on modules");
        return;
      }
      nodules.forEach(function(nodule) {
        names.forEach(function(name) {
          unwrap(nodule, name);
        });
      });
    }
    shimmer.wrap = wrap;
    shimmer.massWrap = massWrap;
    shimmer.unwrap = unwrap;
    shimmer.massUnwrap = massUnwrap;
    module2.exports = shimmer;
  }
});

// node_modules/emitter-listener/listener.js
var require_listener = __commonJS({
  "node_modules/emitter-listener/listener.js"(exports, module2) {
    "use strict";
    var shimmer = require_shimmer();
    var wrap = shimmer.wrap;
    var unwrap = shimmer.unwrap;
    var SYMBOL = "wrap@before";
    function defineProperty(obj, name, value) {
      var enumerable = !!obj[name] && obj.propertyIsEnumerable(name);
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable,
        writable: true,
        value
      });
    }
    function _process(self2, listeners) {
      var l = listeners.length;
      for (var p = 0; p < l; p++) {
        var listener = listeners[p];
        var before = self2[SYMBOL];
        if (typeof before === "function") {
          before(listener);
        } else if (Array.isArray(before)) {
          var length = before.length;
          for (var i = 0; i < length; i++)
            before[i](listener);
        }
      }
    }
    function _listeners(self2, event) {
      var listeners;
      listeners = self2._events && self2._events[event];
      if (!Array.isArray(listeners)) {
        if (listeners) {
          listeners = [listeners];
        } else {
          listeners = [];
        }
      }
      return listeners;
    }
    function _findAndProcess(self2, event, before) {
      var after = _listeners(self2, event);
      var unprocessed = after.filter(function(fn) {
        return before.indexOf(fn) === -1;
      });
      if (unprocessed.length > 0)
        _process(self2, unprocessed);
    }
    function _wrap(unwrapped, visit) {
      if (!unwrapped)
        return;
      var wrapped = unwrapped;
      if (typeof unwrapped === "function") {
        wrapped = visit(unwrapped);
      } else if (Array.isArray(unwrapped)) {
        wrapped = [];
        for (var i = 0; i < unwrapped.length; i++) {
          wrapped[i] = visit(unwrapped[i]);
        }
      }
      return wrapped;
    }
    module2.exports = function wrapEmitter(emitter, onAddListener, onEmit) {
      if (!emitter || !emitter.on || !emitter.addListener || !emitter.removeListener || !emitter.emit) {
        throw new Error("can only wrap real EEs");
      }
      if (!onAddListener)
        throw new Error("must have function to run on listener addition");
      if (!onEmit)
        throw new Error("must have function to wrap listeners when emitting");
      function adding(on) {
        return function added(event, listener) {
          var existing = _listeners(this, event).slice();
          try {
            var returned = on.call(this, event, listener);
            _findAndProcess(this, event, existing);
            return returned;
          } finally {
            if (!this.on.__wrapped)
              wrap(this, "on", adding);
            if (!this.addListener.__wrapped)
              wrap(this, "addListener", adding);
          }
        };
      }
      function emitting(emit) {
        return function emitted(event) {
          if (!this._events || !this._events[event])
            return emit.apply(this, arguments);
          var unwrapped = this._events[event];
          function remover(removeListener) {
            return function removed() {
              this._events[event] = unwrapped;
              try {
                return removeListener.apply(this, arguments);
              } finally {
                unwrapped = this._events[event];
                this._events[event] = _wrap(unwrapped, onEmit);
              }
            };
          }
          wrap(this, "removeListener", remover);
          try {
            this._events[event] = _wrap(unwrapped, onEmit);
            return emit.apply(this, arguments);
          } finally {
            unwrap(this, "removeListener");
            this._events[event] = unwrapped;
          }
        };
      }
      if (!emitter[SYMBOL]) {
        defineProperty(emitter, SYMBOL, onAddListener);
      } else if (typeof emitter[SYMBOL] === "function") {
        defineProperty(emitter, SYMBOL, [emitter[SYMBOL], onAddListener]);
      } else if (Array.isArray(emitter[SYMBOL])) {
        emitter[SYMBOL].push(onAddListener);
      }
      if (!emitter.__wrapped) {
        wrap(emitter, "addListener", adding);
        wrap(emitter, "on", adding);
        wrap(emitter, "emit", emitting);
        defineProperty(emitter, "__unwrap", function() {
          unwrap(emitter, "addListener");
          unwrap(emitter, "on");
          unwrap(emitter, "emit");
          delete emitter[SYMBOL];
          delete emitter.__wrapped;
        });
        defineProperty(emitter, "__wrapped", true);
      }
    };
  }
});

// node_modules/cls-hooked/context.js
var require_context3 = __commonJS({
  "node_modules/cls-hooked/context.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var assert = require("assert");
    var wrapEmitter = require_listener();
    var async_hooks = require("async_hooks");
    var CONTEXTS_SYMBOL = "cls@contexts";
    var ERROR_SYMBOL = "error@context";
    var DEBUG_CLS_HOOKED = process.env.DEBUG_CLS_HOOKED;
    var currentUid = -1;
    module2.exports = {
      getNamespace,
      createNamespace,
      destroyNamespace,
      reset,
      ERROR_SYMBOL
    };
    function Namespace(name) {
      this.name = name;
      this.active = null;
      this._set = [];
      this.id = null;
      this._contexts = new Map();
      this._indent = 0;
    }
    Namespace.prototype.set = function set(key, value) {
      if (!this.active) {
        throw new Error("No context available. ns.run() or ns.bind() must be called first.");
      }
      this.active[key] = value;
      if (DEBUG_CLS_HOOKED) {
        const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
        debug2(indentStr + "CONTEXT-SET KEY:" + key + "=" + value + " in ns:" + this.name + " currentUid:" + currentUid + " active:" + util.inspect(this.active, { showHidden: true, depth: 2, colors: true }));
      }
      return value;
    };
    Namespace.prototype.get = function get(key) {
      if (!this.active) {
        if (DEBUG_CLS_HOOKED) {
          const asyncHooksCurrentId = async_hooks.currentId();
          const triggerId = async_hooks.triggerAsyncId();
          const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
          debug2(`${indentStr}CONTEXT-GETTING KEY NO ACTIVE NS: (${this.name}) ${key}=undefined currentUid:${currentUid} asyncHooksCurrentId:${asyncHooksCurrentId} triggerId:${triggerId} len:${this._set.length}`);
        }
        return void 0;
      }
      if (DEBUG_CLS_HOOKED) {
        const asyncHooksCurrentId = async_hooks.executionAsyncId();
        const triggerId = async_hooks.triggerAsyncId();
        const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
        debug2(indentStr + "CONTEXT-GETTING KEY:" + key + "=" + this.active[key] + " (" + this.name + ") currentUid:" + currentUid + " active:" + util.inspect(this.active, { showHidden: true, depth: 2, colors: true }));
        debug2(`${indentStr}CONTEXT-GETTING KEY: (${this.name}) ${key}=${this.active[key]} currentUid:${currentUid} asyncHooksCurrentId:${asyncHooksCurrentId} triggerId:${triggerId} len:${this._set.length} active:${util.inspect(this.active)}`);
      }
      return this.active[key];
    };
    Namespace.prototype.createContext = function createContext() {
      let context = Object.create(this.active ? this.active : Object.prototype);
      context._ns_name = this.name;
      context.id = currentUid;
      if (DEBUG_CLS_HOOKED) {
        const asyncHooksCurrentId = async_hooks.executionAsyncId();
        const triggerId = async_hooks.triggerAsyncId();
        const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
        debug2(`${indentStr}CONTEXT-CREATED Context: (${this.name}) currentUid:${currentUid} asyncHooksCurrentId:${asyncHooksCurrentId} triggerId:${triggerId} len:${this._set.length} context:${util.inspect(context, { showHidden: true, depth: 2, colors: true })}`);
      }
      return context;
    };
    Namespace.prototype.run = function run(fn) {
      let context = this.createContext();
      this.enter(context);
      try {
        if (DEBUG_CLS_HOOKED) {
          const triggerId = async_hooks.triggerAsyncId();
          const asyncHooksCurrentId = async_hooks.executionAsyncId();
          const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
          debug2(`${indentStr}CONTEXT-RUN BEGIN: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} context:${util.inspect(context)}`);
        }
        fn(context);
        return context;
      } catch (exception) {
        if (exception) {
          exception[ERROR_SYMBOL] = context;
        }
        throw exception;
      } finally {
        if (DEBUG_CLS_HOOKED) {
          const triggerId = async_hooks.triggerAsyncId();
          const asyncHooksCurrentId = async_hooks.executionAsyncId();
          const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
          debug2(`${indentStr}CONTEXT-RUN END: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} ${util.inspect(context)}`);
        }
        this.exit(context);
      }
    };
    Namespace.prototype.runAndReturn = function runAndReturn(fn) {
      let value;
      this.run(function(context) {
        value = fn(context);
      });
      return value;
    };
    Namespace.prototype.runPromise = function runPromise(fn) {
      let context = this.createContext();
      this.enter(context);
      let promise = fn(context);
      if (!promise || !promise.then || !promise.catch) {
        throw new Error("fn must return a promise.");
      }
      if (DEBUG_CLS_HOOKED) {
        debug2("CONTEXT-runPromise BEFORE: (" + this.name + ") currentUid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
      }
      return promise.then((result) => {
        if (DEBUG_CLS_HOOKED) {
          debug2("CONTEXT-runPromise AFTER then: (" + this.name + ") currentUid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
        }
        this.exit(context);
        return result;
      }).catch((err) => {
        err[ERROR_SYMBOL] = context;
        if (DEBUG_CLS_HOOKED) {
          debug2("CONTEXT-runPromise AFTER catch: (" + this.name + ") currentUid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
        }
        this.exit(context);
        throw err;
      });
    };
    Namespace.prototype.bind = function bindFactory(fn, context) {
      if (!context) {
        if (!this.active) {
          context = this.createContext();
        } else {
          context = this.active;
        }
      }
      let self2 = this;
      return function clsBind() {
        self2.enter(context);
        try {
          return fn.apply(this, arguments);
        } catch (exception) {
          if (exception) {
            exception[ERROR_SYMBOL] = context;
          }
          throw exception;
        } finally {
          self2.exit(context);
        }
      };
    };
    Namespace.prototype.enter = function enter(context) {
      assert.ok(context, "context must be provided for entering");
      if (DEBUG_CLS_HOOKED) {
        const asyncHooksCurrentId = async_hooks.executionAsyncId();
        const triggerId = async_hooks.triggerAsyncId();
        const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
        debug2(`${indentStr}CONTEXT-ENTER: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} ${util.inspect(context)}`);
      }
      this._set.push(this.active);
      this.active = context;
    };
    Namespace.prototype.exit = function exit(context) {
      assert.ok(context, "context must be provided for exiting");
      if (DEBUG_CLS_HOOKED) {
        const asyncHooksCurrentId = async_hooks.executionAsyncId();
        const triggerId = async_hooks.triggerAsyncId();
        const indentStr = " ".repeat(this._indent < 0 ? 0 : this._indent);
        debug2(`${indentStr}CONTEXT-EXIT: (${this.name}) currentUid:${currentUid} triggerId:${triggerId} asyncHooksCurrentId:${asyncHooksCurrentId} len:${this._set.length} ${util.inspect(context)}`);
      }
      if (this.active === context) {
        assert.ok(this._set.length, "can't remove top context");
        this.active = this._set.pop();
        return;
      }
      let index = this._set.lastIndexOf(context);
      if (index < 0) {
        if (DEBUG_CLS_HOOKED) {
          debug2("??ERROR?? context exiting but not entered - ignoring: " + util.inspect(context));
        }
        assert.ok(index >= 0, "context not currently entered; can't exit. \n" + util.inspect(this) + "\n" + util.inspect(context));
      } else {
        assert.ok(index, "can't remove top context");
        this._set.splice(index, 1);
      }
    };
    Namespace.prototype.bindEmitter = function bindEmitter(emitter) {
      assert.ok(emitter.on && emitter.addListener && emitter.emit, "can only bind real EEs");
      let namespace = this;
      let thisSymbol = "context@" + this.name;
      function attach(listener) {
        if (!listener) {
          return;
        }
        if (!listener[CONTEXTS_SYMBOL]) {
          listener[CONTEXTS_SYMBOL] = Object.create(null);
        }
        listener[CONTEXTS_SYMBOL][thisSymbol] = {
          namespace,
          context: namespace.active
        };
      }
      function bind(unwrapped) {
        if (!(unwrapped && unwrapped[CONTEXTS_SYMBOL])) {
          return unwrapped;
        }
        let wrapped = unwrapped;
        let unwrappedContexts = unwrapped[CONTEXTS_SYMBOL];
        Object.keys(unwrappedContexts).forEach(function(name) {
          let thunk = unwrappedContexts[name];
          wrapped = thunk.namespace.bind(wrapped, thunk.context);
        });
        return wrapped;
      }
      wrapEmitter(emitter, attach, bind);
    };
    Namespace.prototype.fromException = function fromException(exception) {
      return exception[ERROR_SYMBOL];
    };
    function getNamespace(name) {
      return process.namespaces[name];
    }
    function createNamespace(name) {
      assert.ok(name, "namespace must be given a name.");
      if (DEBUG_CLS_HOOKED) {
        debug2(`NS-CREATING NAMESPACE (${name})`);
      }
      let namespace = new Namespace(name);
      namespace.id = currentUid;
      const hook = async_hooks.createHook({
        init(asyncId, type, triggerId, resource) {
          currentUid = async_hooks.executionAsyncId();
          if (namespace.active) {
            namespace._contexts.set(asyncId, namespace.active);
            if (DEBUG_CLS_HOOKED) {
              const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
              debug2(`${indentStr}INIT [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} resource:${resource}`);
            }
          } else if (currentUid === 0) {
            const triggerId2 = async_hooks.triggerAsyncId();
            const triggerIdContext = namespace._contexts.get(triggerId2);
            if (triggerIdContext) {
              namespace._contexts.set(asyncId, triggerIdContext);
              if (DEBUG_CLS_HOOKED) {
                const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
                debug2(`${indentStr}INIT USING CONTEXT FROM TRIGGERID [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId2} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} resource:${resource}`);
              }
            } else if (DEBUG_CLS_HOOKED) {
              const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
              debug2(`${indentStr}INIT MISSING CONTEXT [${type}] (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId2} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} resource:${resource}`);
            }
          }
          if (DEBUG_CLS_HOOKED && type === "PROMISE") {
            debug2(util.inspect(resource, { showHidden: true }));
            const parentId = resource.parentId;
            const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
            debug2(`${indentStr}INIT RESOURCE-PROMISE [${type}] (${name}) parentId:${parentId} asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} resource:${resource}`);
          }
        },
        before(asyncId) {
          currentUid = async_hooks.executionAsyncId();
          let context;
          context = namespace._contexts.get(asyncId) || namespace._contexts.get(currentUid);
          if (context) {
            if (DEBUG_CLS_HOOKED) {
              const triggerId = async_hooks.triggerAsyncId();
              const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
              debug2(`${indentStr}BEFORE (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} context:${util.inspect(context)}`);
              namespace._indent += 2;
            }
            namespace.enter(context);
          } else if (DEBUG_CLS_HOOKED) {
            const triggerId = async_hooks.triggerAsyncId();
            const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
            debug2(`${indentStr}BEFORE MISSING CONTEXT (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} namespace._contexts:${util.inspect(namespace._contexts, { showHidden: true, depth: 2, colors: true })}`);
            namespace._indent += 2;
          }
        },
        after(asyncId) {
          currentUid = async_hooks.executionAsyncId();
          let context;
          context = namespace._contexts.get(asyncId) || namespace._contexts.get(currentUid);
          if (context) {
            if (DEBUG_CLS_HOOKED) {
              const triggerId = async_hooks.triggerAsyncId();
              namespace._indent -= 2;
              const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
              debug2(`${indentStr}AFTER (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} context:${util.inspect(context)}`);
            }
            namespace.exit(context);
          } else if (DEBUG_CLS_HOOKED) {
            const triggerId = async_hooks.triggerAsyncId();
            namespace._indent -= 2;
            const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
            debug2(`${indentStr}AFTER MISSING CONTEXT (${name}) asyncId:${asyncId} currentUid:${currentUid} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} context:${util.inspect(context)}`);
          }
        },
        destroy(asyncId) {
          currentUid = async_hooks.executionAsyncId();
          if (DEBUG_CLS_HOOKED) {
            const triggerId = async_hooks.triggerAsyncId();
            const indentStr = " ".repeat(namespace._indent < 0 ? 0 : namespace._indent);
            debug2(`${indentStr}DESTROY (${name}) currentUid:${currentUid} asyncId:${asyncId} triggerId:${triggerId} active:${util.inspect(namespace.active, { showHidden: true, depth: 2, colors: true })} context:${util.inspect(namespace._contexts.get(currentUid))}`);
          }
          namespace._contexts.delete(asyncId);
        }
      });
      hook.enable();
      process.namespaces[name] = namespace;
      return namespace;
    }
    function destroyNamespace(name) {
      let namespace = getNamespace(name);
      assert.ok(namespace, `can't delete nonexistent namespace! "` + name + '"');
      assert.ok(namespace.id, "don't assign to process.namespaces directly! " + util.inspect(namespace));
      process.namespaces[name] = null;
    }
    function reset() {
      if (process.namespaces) {
        Object.keys(process.namespaces).forEach(function(name) {
          destroyNamespace(name);
        });
      }
      process.namespaces = Object.create(null);
    }
    process.namespaces = {};
    function debug2(...args) {
      if (DEBUG_CLS_HOOKED) {
        process._rawDebug(`${util.format(...args)}`);
      }
    }
  }
});

// node_modules/async-hook-jl/patches/next-tick.js
var require_next_tick = __commonJS({
  "node_modules/async-hook-jl/patches/next-tick.js"(exports, module2) {
    "use strict";
    function NextTickWrap() {
    }
    module2.exports = function patch() {
      const hooks = this._hooks;
      const state = this._state;
      const oldNextTick = process.nextTick;
      process.nextTick = function() {
        if (!state.enabled)
          return oldNextTick.apply(process, arguments);
        const args = new Array(arguments.length);
        for (let i = 0; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        const callback = args[0];
        if (typeof callback !== "function") {
          throw new TypeError("callback is not a function");
        }
        const handle = new NextTickWrap();
        const uid = --state.counter;
        hooks.init.call(handle, uid, 0, null, null);
        args[0] = function() {
          hooks.pre.call(handle, uid);
          let didThrow = true;
          try {
            callback.apply(this, arguments);
            didThrow = false;
          } finally {
            if (didThrow && process.listenerCount("uncaughtException") > 0) {
              process.once("uncaughtException", function() {
                hooks.post.call(handle, uid, true);
                hooks.destroy.call(null, uid);
              });
            }
          }
          hooks.post.call(handle, uid, false);
          hooks.destroy.call(null, uid);
        };
        return oldNextTick.apply(process, args);
      };
    };
  }
});

// node_modules/async-hook-jl/patches/promise.js
var require_promise = __commonJS({
  "node_modules/async-hook-jl/patches/promise.js"(exports, module2) {
    "use strict";
    function PromiseWrap() {
    }
    module2.exports = function patchPromise() {
      const hooks = this._hooks;
      const state = this._state;
      const Promise2 = global.Promise;
      const oldThen = Promise2.prototype.then;
      Promise2.prototype.then = wrappedThen;
      function makeWrappedHandler(fn, handle, uid, isOnFulfilled) {
        if (typeof fn !== "function") {
          return isOnFulfilled ? makeUnhandledResolutionHandler(uid) : makeUnhandledRejectionHandler(uid);
        }
        return function wrappedHandler() {
          hooks.pre.call(handle, uid);
          try {
            return fn.apply(this, arguments);
          } finally {
            hooks.post.call(handle, uid, false);
            hooks.destroy.call(null, uid);
          }
        };
      }
      function makeUnhandledResolutionHandler(uid) {
        return function unhandledResolutionHandler(val) {
          hooks.destroy.call(null, uid);
          return val;
        };
      }
      function makeUnhandledRejectionHandler(uid) {
        return function unhandledRejectedHandler(val) {
          hooks.destroy.call(null, uid);
          throw val;
        };
      }
      function wrappedThen(onFulfilled, onRejected) {
        if (!state.enabled)
          return oldThen.call(this, onFulfilled, onRejected);
        const handle = new PromiseWrap();
        const uid = --state.counter;
        hooks.init.call(handle, uid, 0, null, null);
        return oldThen.call(this, makeWrappedHandler(onFulfilled, handle, uid, true), makeWrappedHandler(onRejected, handle, uid, false));
      }
    };
  }
});

// node_modules/async-hook-jl/patches/timers.js
var require_timers = __commonJS({
  "node_modules/async-hook-jl/patches/timers.js"(exports, module2) {
    "use strict";
    var timers = require("timers");
    function TimeoutWrap() {
    }
    function IntervalWrap() {
    }
    function ImmediateWrap() {
    }
    var timeoutMap = new Map();
    var intervalMap = new Map();
    var ImmediateMap = new Map();
    var activeCallback = null;
    var clearedInCallback = false;
    module2.exports = function patch() {
      patchTimer(this._hooks, this._state, "setTimeout", "clearTimeout", TimeoutWrap, timeoutMap, true);
      patchTimer(this._hooks, this._state, "setInterval", "clearInterval", IntervalWrap, intervalMap, false);
      patchTimer(this._hooks, this._state, "setImmediate", "clearImmediate", ImmediateWrap, ImmediateMap, true);
      global.setTimeout = timers.setTimeout;
      global.setInterval = timers.setInterval;
      global.setImmediate = timers.setImmediate;
      global.clearTimeout = timers.clearTimeout;
      global.clearInterval = timers.clearInterval;
      global.clearImmediate = timers.clearImmediate;
    };
    function patchTimer(hooks, state, setFn, clearFn, Handle, timerMap, singleCall) {
      const oldSetFn = timers[setFn];
      const oldClearFn = timers[clearFn];
      timers[setFn] = function() {
        if (!state.enabled)
          return oldSetFn.apply(timers, arguments);
        const args = new Array(arguments.length);
        for (let i = 0; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        const callback = args[0];
        if (typeof callback !== "function") {
          throw new TypeError('"callback" argument must be a function');
        }
        const handle = new Handle();
        const uid = --state.counter;
        let timerId = void 0;
        hooks.init.call(handle, uid, 0, null, null);
        args[0] = function() {
          activeCallback = timerId;
          hooks.pre.call(handle, uid);
          let didThrow = true;
          try {
            callback.apply(this, arguments);
            didThrow = false;
          } finally {
            if (didThrow && process.listenerCount("uncaughtException") > 0) {
              process.once("uncaughtException", function() {
                hooks.post.call(handle, uid, true);
                timerMap.delete(timerId);
                hooks.destroy.call(null, uid);
              });
            }
          }
          hooks.post.call(handle, uid, false);
          activeCallback = null;
          if (singleCall || clearedInCallback) {
            clearedInCallback = false;
            timerMap.delete(timerId);
            hooks.destroy.call(null, uid);
          }
        };
        timerId = oldSetFn.apply(timers, args);
        timerMap.set(timerId, uid);
        return timerId;
      };
      timers[clearFn] = function(timerId) {
        if (activeCallback === timerId && timerId !== null) {
          clearedInCallback = true;
        } else if (timerMap.has(timerId)) {
          const uid = timerMap.get(timerId);
          timerMap.delete(timerId);
          hooks.destroy.call(null, uid);
        }
        oldClearFn.apply(timers, arguments);
      };
    }
  }
});

// node_modules/async-hook-jl/package.json
var require_package2 = __commonJS({
  "node_modules/async-hook-jl/package.json"(exports, module2) {
    module2.exports = {
      name: "async-hook-jl",
      description: "Inspect the life of handle objects in node",
      version: "1.7.6",
      author: "Andreas Madsen <amwebdk@gmail.com>",
      main: "./index.js",
      scripts: {
        test: "node ./test/runner.js && eslint ."
      },
      repository: {
        type: "git",
        url: "git://github.com/jeff-lewis/async-hook-jl.git"
      },
      keywords: [
        "async",
        "async hooks",
        "inspect",
        "async wrap"
      ],
      license: "MIT",
      dependencies: {
        "stack-chain": "^1.3.7"
      },
      devDependencies: {
        async: "1.5.x",
        "cli-color": "1.1.x",
        eslint: "^3.4.0",
        endpoint: "0.4.x"
      },
      engines: {
        node: "^4.7 || >=6.9 || >=7.3"
      }
    };
  }
});

// node_modules/async-hook-jl/async-hook.js
var require_async_hook = __commonJS({
  "node_modules/async-hook-jl/async-hook.js"(exports, module2) {
    "use strict";
    var asyncWrap = process.binding("async_wrap");
    var TIMERWRAP = asyncWrap.Providers.TIMERWRAP;
    var patchs = {
      "nextTick": require_next_tick(),
      "promise": require_promise(),
      "timers": require_timers()
    };
    var ignoreUIDs = new Set();
    function State() {
      this.enabled = false;
      this.counter = 0;
    }
    function Hooks() {
      const initFns = this.initFns = [];
      const preFns = this.preFns = [];
      const postFns = this.postFns = [];
      const destroyFns = this.destroyFns = [];
      this.init = function(uid, provider, parentUid, parentHandle) {
        if (provider === TIMERWRAP) {
          ignoreUIDs.add(uid);
          return;
        }
        for (const hook of initFns) {
          hook(uid, this, provider, parentUid, parentHandle);
        }
      };
      this.pre = function(uid) {
        if (ignoreUIDs.has(uid))
          return;
        for (const hook of preFns) {
          hook(uid, this);
        }
      };
      this.post = function(uid, didThrow) {
        if (ignoreUIDs.has(uid))
          return;
        for (const hook of postFns) {
          hook(uid, this, didThrow);
        }
      };
      this.destroy = function(uid) {
        if (ignoreUIDs.has(uid)) {
          ignoreUIDs.delete(uid);
          return;
        }
        for (const hook of destroyFns) {
          hook(uid);
        }
      };
    }
    Hooks.prototype.add = function(hooks) {
      if (hooks.init)
        this.initFns.push(hooks.init);
      if (hooks.pre)
        this.preFns.push(hooks.pre);
      if (hooks.post)
        this.postFns.push(hooks.post);
      if (hooks.destroy)
        this.destroyFns.push(hooks.destroy);
    };
    function removeElement(array, item) {
      const index = array.indexOf(item);
      if (index === -1)
        return;
      array.splice(index, 1);
    }
    Hooks.prototype.remove = function(hooks) {
      if (hooks.init)
        removeElement(this.initFns, hooks.init);
      if (hooks.pre)
        removeElement(this.preFns, hooks.pre);
      if (hooks.post)
        removeElement(this.postFns, hooks.post);
      if (hooks.destroy)
        removeElement(this.destroyFns, hooks.destroy);
    };
    function AsyncHook() {
      this._state = new State();
      this._hooks = new Hooks();
      this.version = require_package2().version;
      this.providers = asyncWrap.Providers;
      for (const key of Object.keys(patchs)) {
        patchs[key].call(this);
      }
      if (process.env.hasOwnProperty("NODE_ASYNC_HOOK_WARNING")) {
        console.warn("warning: you are using async-hook-jl which is unstable.");
      }
      asyncWrap.setupHooks({
        init: this._hooks.init,
        pre: this._hooks.pre,
        post: this._hooks.post,
        destroy: this._hooks.destroy
      });
    }
    module2.exports = AsyncHook;
    AsyncHook.prototype.addHooks = function(hooks) {
      this._hooks.add(hooks);
    };
    AsyncHook.prototype.removeHooks = function(hooks) {
      this._hooks.remove(hooks);
    };
    AsyncHook.prototype.enable = function() {
      this._state.enabled = true;
      asyncWrap.enable();
    };
    AsyncHook.prototype.disable = function() {
      this._state.enabled = false;
      asyncWrap.disable();
    };
  }
});

// node_modules/stack-chain/package.json
var require_package3 = __commonJS({
  "node_modules/stack-chain/package.json"(exports, module2) {
    module2.exports = {
      name: "stack-chain",
      description: "API for combining call site modifiers",
      version: "1.3.7",
      author: "Andreas Madsen <amwebdk@gmail.com>",
      scripts: {
        test: "tap ./test/simple"
      },
      repository: {
        type: "git",
        url: "git://github.com/AndreasMadsen/stack-chain.git"
      },
      keywords: [
        "stack",
        "chain",
        "trace",
        "call site",
        "concat",
        "format"
      ],
      devDependencies: {
        tap: "2.x.x",
        "uglify-js": "2.5.x"
      },
      license: "MIT"
    };
  }
});

// node_modules/stack-chain/format.js
var require_format = __commonJS({
  "node_modules/stack-chain/format.js"(exports, module2) {
    function FormatErrorString(error) {
      try {
        return Error.prototype.toString.call(error);
      } catch (e) {
        try {
          return "<error: " + e + ">";
        } catch (ee) {
          return "<error>";
        }
      }
    }
    module2.exports = function FormatStackTrace(error, frames) {
      var lines = [];
      lines.push(FormatErrorString(error));
      for (var i = 0; i < frames.length; i++) {
        var frame = frames[i];
        var line;
        try {
          line = frame.toString();
        } catch (e) {
          try {
            line = "<error: " + e + ">";
          } catch (ee) {
            line = "<error>";
          }
        }
        lines.push("    at " + line);
      }
      return lines.join("\n");
    };
  }
});

// node_modules/stack-chain/stack-chain.js
var require_stack_chain = __commonJS({
  "node_modules/stack-chain/stack-chain.js"(exports, module2) {
    var defaultFormater = require_format();
    function stackChain() {
      this.extend = new TraceModifier();
      this.filter = new TraceModifier();
      this.format = new StackFormater();
      this.version = require_package3().version;
    }
    var SHORTCIRCUIT_CALLSITE = false;
    stackChain.prototype.callSite = function collectCallSites(options) {
      if (!options)
        options = {};
      SHORTCIRCUIT_CALLSITE = true;
      var obj = {};
      Error.captureStackTrace(obj, collectCallSites);
      var callSites = obj.stack;
      SHORTCIRCUIT_CALLSITE = false;
      callSites = callSites.slice(options.slice || 0);
      if (options.extend)
        callSites = this.extend._modify(obj, callSites);
      if (options.filter)
        callSites = this.filter._modify(obj, callSites);
      return callSites;
    };
    var chain = new stackChain();
    function TraceModifier() {
      this._modifiers = [];
    }
    TraceModifier.prototype._modify = function(error, frames) {
      for (var i = 0, l = this._modifiers.length; i < l; i++) {
        frames = this._modifiers[i](error, frames);
      }
      return frames;
    };
    TraceModifier.prototype.attach = function(modifier) {
      this._modifiers.push(modifier);
    };
    TraceModifier.prototype.deattach = function(modifier) {
      var index = this._modifiers.indexOf(modifier);
      if (index === -1)
        return false;
      this._modifiers.splice(index, 1);
      return true;
    };
    function StackFormater() {
      this._formater = defaultFormater;
      this._previous = void 0;
    }
    StackFormater.prototype.replace = function(formater) {
      if (formater) {
        this._formater = formater;
      } else {
        this.restore();
      }
    };
    StackFormater.prototype.restore = function() {
      this._formater = defaultFormater;
      this._previous = void 0;
    };
    StackFormater.prototype._backup = function() {
      this._previous = this._formater;
    };
    StackFormater.prototype._roolback = function() {
      if (this._previous === defaultFormater) {
        this.replace(void 0);
      } else {
        this.replace(this._previous);
      }
      this._previous = void 0;
    };
    if (Error.prepareStackTrace) {
      chain.format.replace(Error.prepareStackTrace);
    }
    var SHORTCIRCUIT_FORMATER = false;
    function prepareStackTrace(error, originalFrames) {
      if (SHORTCIRCUIT_CALLSITE)
        return originalFrames;
      if (SHORTCIRCUIT_FORMATER)
        return defaultFormater(error, originalFrames);
      var frames = originalFrames.concat();
      frames = chain.extend._modify(error, frames);
      frames = chain.filter._modify(error, frames);
      frames = frames.slice(0, Error.stackTraceLimit);
      if (Object.isExtensible(error) && Object.getOwnPropertyDescriptor(error, "callSite") === void 0) {
        error.callSite = {
          original: originalFrames,
          mutated: frames
        };
      }
      SHORTCIRCUIT_FORMATER = true;
      var format = chain.format._formater(error, frames);
      SHORTCIRCUIT_FORMATER = false;
      return format;
    }
    Object.defineProperty(Error, "prepareStackTrace", {
      "get": function() {
        return prepareStackTrace;
      },
      "set": function(formater) {
        if (formater === prepareStackTrace) {
          chain.format._roolback();
        } else {
          chain.format._backup();
          chain.format.replace(formater);
        }
      }
    });
    function callSiteGetter() {
      this.stack;
      return this.callSite;
    }
    Object.defineProperty(Error.prototype, "callSite", {
      "get": callSiteGetter,
      "set": function(frames) {
        Object.defineProperty(this, "callSite", {
          value: frames,
          writable: true,
          configurable: true
        });
      },
      configurable: true
    });
    module2.exports = chain;
  }
});

// node_modules/stack-chain/index.js
var require_stack_chain2 = __commonJS({
  "node_modules/stack-chain/index.js"(exports, module2) {
    if (global._stackChain) {
      if (global._stackChain.version === require_package3().version) {
        module2.exports = global._stackChain;
      } else {
        throw new Error("Conflicting version of stack-chain found");
      }
    } else {
      module2.exports = global._stackChain = require_stack_chain();
    }
  }
});

// node_modules/async-hook-jl/index.js
var require_async_hook_jl = __commonJS({
  "node_modules/async-hook-jl/index.js"(exports, module2) {
    "use strict";
    var AsyncHook = require_async_hook();
    if (global._asyncHook) {
      if (global._asyncHook.version === require_package2().version) {
        module2.exports = global._asyncHook;
      } else {
        throw new Error("Conflicting version of async-hook-jl found");
      }
    } else {
      const stackChain = require_stack_chain2();
      stackChain.filter.attach(function(error, frames) {
        return frames.filter(function(callSite) {
          const filename = callSite.getFileName();
          return !(filename && filename.slice(0, __dirname.length) === __dirname);
        });
      });
      module2.exports = global._asyncHook = new AsyncHook();
    }
  }
});

// node_modules/cls-hooked/context-legacy.js
var require_context_legacy = __commonJS({
  "node_modules/cls-hooked/context-legacy.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var assert = require("assert");
    var wrapEmitter = require_listener();
    var asyncHook = require_async_hook_jl();
    var CONTEXTS_SYMBOL = "cls@contexts";
    var ERROR_SYMBOL = "error@context";
    var invertedProviders = [];
    for (let key in asyncHook.providers) {
      invertedProviders[asyncHook.providers[key]] = key;
    }
    var DEBUG_CLS_HOOKED = process.env.DEBUG_CLS_HOOKED;
    var currentUid = -1;
    module2.exports = {
      getNamespace,
      createNamespace,
      destroyNamespace,
      reset,
      ERROR_SYMBOL
    };
    function Namespace(name) {
      this.name = name;
      this.active = null;
      this._set = [];
      this.id = null;
      this._contexts = new Map();
    }
    Namespace.prototype.set = function set(key, value) {
      if (!this.active) {
        throw new Error("No context available. ns.run() or ns.bind() must be called first.");
      }
      if (DEBUG_CLS_HOOKED) {
        debug2("    SETTING KEY:" + key + "=" + value + " in ns:" + this.name + " uid:" + currentUid + " active:" + util.inspect(this.active, true));
      }
      this.active[key] = value;
      return value;
    };
    Namespace.prototype.get = function get(key) {
      if (!this.active) {
        if (DEBUG_CLS_HOOKED) {
          debug2("    GETTING KEY:" + key + "=undefined " + this.name + " uid:" + currentUid + " active:" + util.inspect(this.active, true));
        }
        return void 0;
      }
      if (DEBUG_CLS_HOOKED) {
        debug2("    GETTING KEY:" + key + "=" + this.active[key] + " " + this.name + " uid:" + currentUid + " active:" + util.inspect(this.active, true));
      }
      return this.active[key];
    };
    Namespace.prototype.createContext = function createContext() {
      if (DEBUG_CLS_HOOKED) {
        debug2("   CREATING Context: " + this.name + " uid:" + currentUid + " len:" + this._set.length + "  active:" + util.inspect(this.active, true, 2, true));
      }
      let context = Object.create(this.active ? this.active : Object.prototype);
      context._ns_name = this.name;
      context.id = currentUid;
      if (DEBUG_CLS_HOOKED) {
        debug2("   CREATED Context: " + this.name + " uid:" + currentUid + " len:" + this._set.length + "  context:" + util.inspect(context, true, 2, true));
      }
      return context;
    };
    Namespace.prototype.run = function run(fn) {
      let context = this.createContext();
      this.enter(context);
      try {
        if (DEBUG_CLS_HOOKED) {
          debug2(" BEFORE RUN: " + this.name + " uid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
        }
        fn(context);
        return context;
      } catch (exception) {
        if (exception) {
          exception[ERROR_SYMBOL] = context;
        }
        throw exception;
      } finally {
        if (DEBUG_CLS_HOOKED) {
          debug2(" AFTER RUN: " + this.name + " uid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
        }
        this.exit(context);
      }
    };
    Namespace.prototype.runAndReturn = function runAndReturn(fn) {
      var value;
      this.run(function(context) {
        value = fn(context);
      });
      return value;
    };
    Namespace.prototype.runPromise = function runPromise(fn) {
      let context = this.createContext();
      this.enter(context);
      let promise = fn(context);
      if (!promise || !promise.then || !promise.catch) {
        throw new Error("fn must return a promise.");
      }
      if (DEBUG_CLS_HOOKED) {
        debug2(" BEFORE runPromise: " + this.name + " uid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
      }
      return promise.then((result) => {
        if (DEBUG_CLS_HOOKED) {
          debug2(" AFTER runPromise: " + this.name + " uid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
        }
        this.exit(context);
        return result;
      }).catch((err) => {
        err[ERROR_SYMBOL] = context;
        if (DEBUG_CLS_HOOKED) {
          debug2(" AFTER runPromise: " + this.name + " uid:" + currentUid + " len:" + this._set.length + " " + util.inspect(context));
        }
        this.exit(context);
        throw err;
      });
    };
    Namespace.prototype.bind = function bindFactory(fn, context) {
      if (!context) {
        if (!this.active) {
          context = this.createContext();
        } else {
          context = this.active;
        }
      }
      let self2 = this;
      return function clsBind() {
        self2.enter(context);
        try {
          return fn.apply(this, arguments);
        } catch (exception) {
          if (exception) {
            exception[ERROR_SYMBOL] = context;
          }
          throw exception;
        } finally {
          self2.exit(context);
        }
      };
    };
    Namespace.prototype.enter = function enter(context) {
      assert.ok(context, "context must be provided for entering");
      if (DEBUG_CLS_HOOKED) {
        debug2("  ENTER " + this.name + " uid:" + currentUid + " len:" + this._set.length + " context: " + util.inspect(context));
      }
      this._set.push(this.active);
      this.active = context;
    };
    Namespace.prototype.exit = function exit(context) {
      assert.ok(context, "context must be provided for exiting");
      if (DEBUG_CLS_HOOKED) {
        debug2("  EXIT " + this.name + " uid:" + currentUid + " len:" + this._set.length + " context: " + util.inspect(context));
      }
      if (this.active === context) {
        assert.ok(this._set.length, "can't remove top context");
        this.active = this._set.pop();
        return;
      }
      let index = this._set.lastIndexOf(context);
      if (index < 0) {
        if (DEBUG_CLS_HOOKED) {
          debug2("??ERROR?? context exiting but not entered - ignoring: " + util.inspect(context));
        }
        assert.ok(index >= 0, "context not currently entered; can't exit. \n" + util.inspect(this) + "\n" + util.inspect(context));
      } else {
        assert.ok(index, "can't remove top context");
        this._set.splice(index, 1);
      }
    };
    Namespace.prototype.bindEmitter = function bindEmitter(emitter) {
      assert.ok(emitter.on && emitter.addListener && emitter.emit, "can only bind real EEs");
      let namespace = this;
      let thisSymbol = "context@" + this.name;
      function attach(listener) {
        if (!listener) {
          return;
        }
        if (!listener[CONTEXTS_SYMBOL]) {
          listener[CONTEXTS_SYMBOL] = Object.create(null);
        }
        listener[CONTEXTS_SYMBOL][thisSymbol] = {
          namespace,
          context: namespace.active
        };
      }
      function bind(unwrapped) {
        if (!(unwrapped && unwrapped[CONTEXTS_SYMBOL])) {
          return unwrapped;
        }
        let wrapped = unwrapped;
        let unwrappedContexts = unwrapped[CONTEXTS_SYMBOL];
        Object.keys(unwrappedContexts).forEach(function(name) {
          let thunk = unwrappedContexts[name];
          wrapped = thunk.namespace.bind(wrapped, thunk.context);
        });
        return wrapped;
      }
      wrapEmitter(emitter, attach, bind);
    };
    Namespace.prototype.fromException = function fromException(exception) {
      return exception[ERROR_SYMBOL];
    };
    function getNamespace(name) {
      return process.namespaces[name];
    }
    function createNamespace(name) {
      assert.ok(name, "namespace must be given a name.");
      if (DEBUG_CLS_HOOKED) {
        debug2("CREATING NAMESPACE " + name);
      }
      let namespace = new Namespace(name);
      namespace.id = currentUid;
      asyncHook.addHooks({
        init(uid, handle, provider, parentUid, parentHandle) {
          currentUid = uid;
          if (parentUid) {
            namespace._contexts.set(uid, namespace._contexts.get(parentUid));
            if (DEBUG_CLS_HOOKED) {
              debug2("PARENTID: " + name + " uid:" + uid + " parent:" + parentUid + " provider:" + provider);
            }
          } else {
            namespace._contexts.set(currentUid, namespace.active);
          }
          if (DEBUG_CLS_HOOKED) {
            debug2("INIT " + name + " uid:" + uid + " parent:" + parentUid + " provider:" + invertedProviders[provider] + " active:" + util.inspect(namespace.active, true));
          }
        },
        pre(uid, handle) {
          currentUid = uid;
          let context = namespace._contexts.get(uid);
          if (context) {
            if (DEBUG_CLS_HOOKED) {
              debug2(" PRE " + name + " uid:" + uid + " handle:" + getFunctionName(handle) + " context:" + util.inspect(context));
            }
            namespace.enter(context);
          } else {
            if (DEBUG_CLS_HOOKED) {
              debug2(" PRE MISSING CONTEXT " + name + " uid:" + uid + " handle:" + getFunctionName(handle));
            }
          }
        },
        post(uid, handle) {
          currentUid = uid;
          let context = namespace._contexts.get(uid);
          if (context) {
            if (DEBUG_CLS_HOOKED) {
              debug2(" POST " + name + " uid:" + uid + " handle:" + getFunctionName(handle) + " context:" + util.inspect(context));
            }
            namespace.exit(context);
          } else {
            if (DEBUG_CLS_HOOKED) {
              debug2(" POST MISSING CONTEXT " + name + " uid:" + uid + " handle:" + getFunctionName(handle));
            }
          }
        },
        destroy(uid) {
          currentUid = uid;
          if (DEBUG_CLS_HOOKED) {
            debug2("DESTROY " + name + " uid:" + uid + " context:" + util.inspect(namespace._contexts.get(currentUid)) + " active:" + util.inspect(namespace.active, true));
          }
          namespace._contexts.delete(uid);
        }
      });
      process.namespaces[name] = namespace;
      return namespace;
    }
    function destroyNamespace(name) {
      let namespace = getNamespace(name);
      assert.ok(namespace, `can't delete nonexistent namespace! "` + name + '"');
      assert.ok(namespace.id, "don't assign to process.namespaces directly! " + util.inspect(namespace));
      process.namespaces[name] = null;
    }
    function reset() {
      if (process.namespaces) {
        Object.keys(process.namespaces).forEach(function(name) {
          destroyNamespace(name);
        });
      }
      process.namespaces = Object.create(null);
    }
    process.namespaces = {};
    if (asyncHook._state && !asyncHook._state.enabled) {
      asyncHook.enable();
    }
    function debug2(msg) {
      if (process.env.DEBUG) {
        process._rawDebug(msg);
      }
    }
    function getFunctionName(fn) {
      if (!fn) {
        return fn;
      }
      if (typeof fn === "function") {
        if (fn.name) {
          return fn.name;
        }
        return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
      } else if (fn.constructor && fn.constructor.name) {
        return fn.constructor.name;
      }
    }
    if (DEBUG_CLS_HOOKED) {
      stackChain = require_stack_chain2();
      for (modifier in stackChain.filter._modifiers) {
        stackChain.filter.deattach(modifier);
      }
    }
    var stackChain;
    var modifier;
  }
});

// node_modules/cls-hooked/index.js
var require_cls_hooked = __commonJS({
  "node_modules/cls-hooked/index.js"(exports, module2) {
    "use strict";
    var semver = require_semver();
    if (process && semver.gte(process.versions.node, "8.0.0")) {
      module2.exports = require_context3();
    } else {
      module2.exports = require_context_legacy();
    }
  }
});

// node_modules/async-listener/glue.js
var require_glue = __commonJS({
  "node_modules/async-listener/glue.js"(exports, module2) {
    var wrap = require_shimmer().wrap;
    var HAS_CREATE_AL = 1 << 0;
    var HAS_BEFORE_AL = 1 << 1;
    var HAS_AFTER_AL = 1 << 2;
    var HAS_ERROR_AL = 1 << 3;
    var listeners = [];
    var uid = 0;
    var inAsyncTick = false;
    var listenerStack = [];
    var asyncCatcher;
    var asyncWrap;
    function union(dest, added) {
      var destLength = dest.length;
      var addedLength = added.length;
      var returned = [];
      if (destLength === 0 && addedLength === 0)
        return returned;
      for (var j = 0; j < destLength; j++)
        returned[j] = dest[j];
      if (addedLength === 0)
        return returned;
      for (var i = 0; i < addedLength; i++) {
        var missing = true;
        for (j = 0; j < destLength; j++) {
          if (dest[j].uid === added[i].uid) {
            missing = false;
            break;
          }
        }
        if (missing)
          returned.push(added[i]);
      }
      return returned;
    }
    if (process._fatalException) {
      inErrorTick = false;
      asyncCatcher = function asyncCatcher2(er) {
        var length = listeners.length;
        if (inErrorTick || length === 0)
          return false;
        var handled = false;
        inErrorTick = true;
        for (var i = 0; i < length; ++i) {
          var listener = listeners[i];
          if ((listener.flags & HAS_ERROR_AL) === 0)
            continue;
          var value = errorValues && errorValues[listener.uid];
          handled = listener.error(value, er) || handled;
        }
        inErrorTick = false;
        if (listenerStack.length > 0)
          listeners = listenerStack.pop();
        errorValues = void 0;
        return handled && !inAsyncTick;
      };
      asyncWrap = function asyncWrap2(original, list, length) {
        var values = [];
        inAsyncTick = true;
        for (var i = 0; i < length; ++i) {
          var listener = list[i];
          values[listener.uid] = listener.data;
          if ((listener.flags & HAS_CREATE_AL) === 0)
            continue;
          var value = listener.create(listener.data);
          if (value !== void 0)
            values[listener.uid] = value;
        }
        inAsyncTick = false;
        return function() {
          errorValues = values;
          listenerStack.push(listeners);
          listeners = union(list, listeners);
          inAsyncTick = true;
          for (var i2 = 0; i2 < length; ++i2) {
            if ((list[i2].flags & HAS_BEFORE_AL) > 0) {
              list[i2].before(this, values[list[i2].uid]);
            }
          }
          inAsyncTick = false;
          var returned = original.apply(this, arguments);
          inAsyncTick = true;
          for (i2 = 0; i2 < length; ++i2) {
            if ((list[i2].flags & HAS_AFTER_AL) > 0) {
              list[i2].after(this, values[list[i2].uid]);
            }
          }
          inAsyncTick = false;
          listeners = listenerStack.pop();
          errorValues = void 0;
          return returned;
        };
      };
      wrap(process, "_fatalException", function(_fatalException) {
        return function _asyncFatalException(er) {
          return asyncCatcher(er) || _fatalException(er);
        };
      });
    } else {
      errorThrew = false;
      asyncCatcher = function uncaughtCatcher(er) {
        if (errorThrew)
          throw er;
        var handled = false;
        var length = listeners.length;
        for (var i = 0; i < length; ++i) {
          var listener = listeners[i];
          if ((listener.flags & HAS_ERROR_AL) === 0)
            continue;
          handled = listener.error(null, er) || handled;
        }
        if (!handled && inAsyncTick)
          throw er;
      };
      asyncWrap = function asyncWrap2(original, list, length) {
        var values = [];
        inAsyncTick = true;
        for (var i = 0; i < length; ++i) {
          var listener = list[i];
          values[listener.uid] = listener.data;
          if ((listener.flags & HAS_CREATE_AL) === 0)
            continue;
          var value = listener.create(listener.data);
          if (value !== void 0)
            values[listener.uid] = value;
        }
        inAsyncTick = false;
        return function() {
          var threw = false;
          var handled = false;
          listenerStack.push(listeners);
          listeners = union(list, listeners);
          inAsyncTick = true;
          for (var i2 = 0; i2 < length; ++i2) {
            if ((list[i2].flags & HAS_BEFORE_AL) > 0) {
              list[i2].before(this, values[list[i2].uid]);
            }
          }
          inAsyncTick = false;
          var returned;
          try {
            returned = original.apply(this, arguments);
          } catch (er) {
            threw = true;
            for (var i2 = 0; i2 < length; ++i2) {
              if ((listeners[i2].flags & HAS_ERROR_AL) == 0)
                continue;
              try {
                handled = listeners[i2].error(values[list[i2].uid], er) || handled;
              } catch (x) {
                errorThrew = true;
                throw x;
              }
            }
            if (!handled) {
              process.removeListener("uncaughtException", asyncCatcher);
              process._originalNextTick(function() {
                process.addListener("uncaughtException", asyncCatcher);
              });
              throw er;
            }
          } finally {
            if (!threw || handled) {
              inAsyncTick = true;
              for (i2 = 0; i2 < length; ++i2) {
                if ((list[i2].flags & HAS_AFTER_AL) > 0) {
                  list[i2].after(this, values[list[i2].uid]);
                }
              }
              inAsyncTick = false;
            }
            listeners = listenerStack.pop();
          }
          return returned;
        };
      };
      process.addListener("uncaughtException", asyncCatcher);
    }
    var inErrorTick;
    var errorValues;
    var errorThrew;
    function simpleWrap(original, list, length) {
      inAsyncTick = true;
      for (var i = 0; i < length; ++i) {
        var listener = list[i];
        if (listener.create)
          listener.create(listener.data);
      }
      inAsyncTick = false;
      return function() {
        listenerStack.push(listeners);
        listeners = union(list, listeners);
        var returned = original.apply(this, arguments);
        listeners = listenerStack.pop();
        return returned;
      };
    }
    function wrapCallback(original) {
      var length = listeners.length;
      if (length === 0)
        return original;
      var list = listeners.slice();
      for (var i = 0; i < length; ++i) {
        if (list[i].flags > 0)
          return asyncWrap(original, list, length);
      }
      return simpleWrap(original, list, length);
    }
    function AsyncListener(callbacks, data) {
      if (typeof callbacks.create === "function") {
        this.create = callbacks.create;
        this.flags |= HAS_CREATE_AL;
      }
      if (typeof callbacks.before === "function") {
        this.before = callbacks.before;
        this.flags |= HAS_BEFORE_AL;
      }
      if (typeof callbacks.after === "function") {
        this.after = callbacks.after;
        this.flags |= HAS_AFTER_AL;
      }
      if (typeof callbacks.error === "function") {
        this.error = callbacks.error;
        this.flags |= HAS_ERROR_AL;
      }
      this.uid = ++uid;
      this.data = data === void 0 ? null : data;
    }
    AsyncListener.prototype.create = void 0;
    AsyncListener.prototype.before = void 0;
    AsyncListener.prototype.after = void 0;
    AsyncListener.prototype.error = void 0;
    AsyncListener.prototype.data = void 0;
    AsyncListener.prototype.uid = 0;
    AsyncListener.prototype.flags = 0;
    function createAsyncListener(callbacks, data) {
      if (typeof callbacks !== "object" || !callbacks) {
        throw new TypeError("callbacks argument must be an object");
      }
      if (callbacks instanceof AsyncListener) {
        return callbacks;
      } else {
        return new AsyncListener(callbacks, data);
      }
    }
    function addAsyncListener(callbacks, data) {
      var listener;
      if (!(callbacks instanceof AsyncListener)) {
        listener = createAsyncListener(callbacks, data);
      } else {
        listener = callbacks;
      }
      var registered = false;
      for (var i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          registered = true;
          break;
        }
      }
      if (!registered)
        listeners.push(listener);
      return listener;
    }
    function removeAsyncListener(listener) {
      for (var i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
    process.createAsyncListener = createAsyncListener;
    process.addAsyncListener = addAsyncListener;
    process.removeAsyncListener = removeAsyncListener;
    module2.exports = wrapCallback;
  }
});

// node_modules/async-listener/es6-wrapped-promise.js
var require_es6_wrapped_promise = __commonJS({
  "node_modules/async-listener/es6-wrapped-promise.js"(exports, module2) {
    "use strict";
    module2.exports = (Promise2, ensureAslWrapper) => {
      return class WrappedPromise extends Promise2 {
        constructor(executor) {
          var context, args;
          super(wrappedExecutor);
          var promise = this;
          try {
            executor.apply(context, args);
          } catch (err) {
            args[1](err);
          }
          return promise;
          function wrappedExecutor(resolve, reject) {
            context = this;
            args = [wrappedResolve, wrappedReject];
            function wrappedResolve(val) {
              ensureAslWrapper(promise, false);
              return resolve(val);
            }
            function wrappedReject(val) {
              ensureAslWrapper(promise, false);
              return reject(val);
            }
          }
        }
      };
    };
  }
});

// node_modules/async-listener/index.js
var require_async_listener = __commonJS({
  "node_modules/async-listener/index.js"() {
    "use strict";
    if (process.addAsyncListener)
      throw new Error("Don't require polyfill unless needed");
    var shimmer = require_shimmer();
    var semver = require_semver();
    var wrap = shimmer.wrap;
    var massWrap = shimmer.massWrap;
    var wrapCallback = require_glue();
    var util = require("util");
    var v6plus = semver.gte(process.version, "6.0.0");
    var v7plus = semver.gte(process.version, "7.0.0");
    var v8plus = semver.gte(process.version, "8.0.0");
    var v11plus = semver.gte(process.version, "11.0.0");
    var net = require("net");
    if (v7plus && !net._normalizeArgs) {
      net._normalizeArgs = function(args) {
        if (args.length === 0) {
          return [{}, null];
        }
        var arg0 = args[0];
        var options = {};
        if (typeof arg0 === "object" && arg0 !== null) {
          options = arg0;
        } else if (isPipeName(arg0)) {
          options.path = arg0;
        } else {
          options.port = arg0;
          if (args.length > 1 && typeof args[1] === "string") {
            options.host = args[1];
          }
        }
        var cb = args[args.length - 1];
        if (typeof cb !== "function")
          return [options, null];
        else
          return [options, cb];
      };
    } else if (!v7plus && !net._normalizeConnectArgs) {
      net._normalizeConnectArgs = function(args) {
        var options = {};
        function toNumber2(x) {
          return (x = Number(x)) >= 0 ? x : false;
        }
        if (typeof args[0] === "object" && args[0] !== null) {
          options = args[0];
        } else if (typeof args[0] === "string" && toNumber2(args[0]) === false) {
          options.path = args[0];
        } else {
          options.port = args[0];
          if (typeof args[1] === "string") {
            options.host = args[1];
          }
        }
        var cb = args[args.length - 1];
        return typeof cb === "function" ? [options, cb] : [options];
      };
    }
    if ("_setUpListenHandle" in net.Server.prototype) {
      wrap(net.Server.prototype, "_setUpListenHandle", wrapSetUpListenHandle);
    } else {
      wrap(net.Server.prototype, "_listen2", wrapSetUpListenHandle);
    }
    function wrapSetUpListenHandle(original) {
      return function() {
        this.on("connection", function(socket) {
          if (socket._handle) {
            socket._handle.onread = wrapCallback(socket._handle.onread);
          }
        });
        try {
          return original.apply(this, arguments);
        } finally {
          if (this._handle && this._handle.onconnection) {
            this._handle.onconnection = wrapCallback(this._handle.onconnection);
          }
        }
      };
    }
    function patchOnRead(ctx) {
      if (ctx && ctx._handle) {
        var handle = ctx._handle;
        if (!handle._originalOnread) {
          handle._originalOnread = handle.onread;
        }
        handle.onread = wrapCallback(handle._originalOnread);
      }
    }
    wrap(net.Socket.prototype, "connect", function(original) {
      return function() {
        var args;
        if (v8plus && Array.isArray(arguments[0]) && Object.getOwnPropertySymbols(arguments[0]).length > 0) {
          args = arguments[0];
        } else {
          args = v7plus ? net._normalizeArgs(arguments) : net._normalizeConnectArgs(arguments);
        }
        if (args[1])
          args[1] = wrapCallback(args[1]);
        var result = original.apply(this, args);
        patchOnRead(this);
        return result;
      };
    });
    var http = require("http");
    wrap(http.Agent.prototype, "addRequest", function(original) {
      return function(req) {
        var onSocket = req.onSocket;
        req.onSocket = wrapCallback(function(socket) {
          patchOnRead(socket);
          return onSocket.apply(this, arguments);
        });
        return original.apply(this, arguments);
      };
    });
    var childProcess = require("child_process");
    function wrapChildProcess(child) {
      if (Array.isArray(child.stdio)) {
        child.stdio.forEach(function(socket) {
          if (socket && socket._handle) {
            socket._handle.onread = wrapCallback(socket._handle.onread);
            wrap(socket._handle, "close", activatorFirst);
          }
        });
      }
      if (child._handle) {
        child._handle.onexit = wrapCallback(child._handle.onexit);
      }
    }
    if (childProcess.ChildProcess) {
      wrap(childProcess.ChildProcess.prototype, "spawn", function(original) {
        return function() {
          var result = original.apply(this, arguments);
          wrapChildProcess(this);
          return result;
        };
      });
    } else {
      massWrap(childProcess, [
        "execFile",
        "fork",
        "spawn"
      ], function(original) {
        return function() {
          var result = original.apply(this, arguments);
          wrapChildProcess(result);
          return result;
        };
      });
    }
    if (!process._fatalException) {
      process._originalNextTick = process.nextTick;
    }
    var processors = [];
    if (process._nextDomainTick)
      processors.push("_nextDomainTick");
    if (process._tickDomainCallback)
      processors.push("_tickDomainCallback");
    massWrap(process, processors, activator);
    wrap(process, "nextTick", activatorFirst);
    var asynchronizers = [
      "setTimeout",
      "setInterval"
    ];
    if (global.setImmediate)
      asynchronizers.push("setImmediate");
    var timers = require("timers");
    var patchGlobalTimers = global.setTimeout === timers.setTimeout;
    massWrap(timers, asynchronizers, activatorFirst);
    if (patchGlobalTimers) {
      massWrap(global, asynchronizers, activatorFirst);
    }
    var dns = require("dns");
    massWrap(dns, [
      "lookup",
      "resolve",
      "resolve4",
      "resolve6",
      "resolveCname",
      "resolveMx",
      "resolveNs",
      "resolveTxt",
      "resolveSrv",
      "reverse"
    ], activator);
    if (dns.resolveNaptr)
      wrap(dns, "resolveNaptr", activator);
    var fs = require("fs");
    massWrap(fs, [
      "watch",
      "rename",
      "truncate",
      "chown",
      "fchown",
      "chmod",
      "fchmod",
      "stat",
      "lstat",
      "fstat",
      "link",
      "symlink",
      "readlink",
      "realpath",
      "unlink",
      "rmdir",
      "mkdir",
      "readdir",
      "close",
      "open",
      "utimes",
      "futimes",
      "fsync",
      "write",
      "read",
      "readFile",
      "writeFile",
      "appendFile",
      "watchFile",
      "unwatchFile",
      "exists"
    ], activator);
    if (fs.lchown)
      wrap(fs, "lchown", activator);
    if (fs.lchmod)
      wrap(fs, "lchmod", activator);
    if (fs.ftruncate)
      wrap(fs, "ftruncate", activator);
    var zlib;
    try {
      zlib = require("zlib");
    } catch (err) {
    }
    if (zlib && zlib.Deflate && zlib.Deflate.prototype) {
      proto = Object.getPrototypeOf(zlib.Deflate.prototype);
      if (proto._transform) {
        wrap(proto, "_transform", activator);
      } else if (proto.write && proto.flush && proto.end) {
        massWrap(proto, [
          "write",
          "flush",
          "end"
        ], activator);
      }
    }
    var proto;
    var crypto;
    try {
      crypto = require("crypto");
    } catch (err) {
    }
    if (crypto) {
      toWrap = [
        "pbkdf2",
        "randomBytes"
      ];
      if (!v11plus) {
        toWrap.push("pseudoRandomBytes");
      }
      massWrap(crypto, toWrap, activator);
    }
    var toWrap;
    var instrumentPromise = !!global.Promise && Promise.toString() === "function Promise() { [native code] }" && Promise.toString.toString() === "function toString() { [native code] }";
    if (instrumentPromise) {
      promiseListener = process.addAsyncListener({
        create: function create() {
          instrumentPromise = false;
        }
      });
      global.Promise.resolve(true).then(function notSync() {
        instrumentPromise = false;
      });
      process.removeAsyncListener(promiseListener);
    }
    var promiseListener;
    if (instrumentPromise) {
      wrapPromise();
    }
    function wrapPromise() {
      var Promise2 = global.Promise;
      function wrappedPromise(executor) {
        if (!(this instanceof wrappedPromise)) {
          return Promise2(executor);
        }
        if (typeof executor !== "function") {
          return new Promise2(executor);
        }
        var context, args;
        var promise = new Promise2(wrappedExecutor);
        promise.__proto__ = wrappedPromise.prototype;
        try {
          executor.apply(context, args);
        } catch (err) {
          args[1](err);
        }
        return promise;
        function wrappedExecutor(resolve, reject) {
          context = this;
          args = [wrappedResolve, wrappedReject];
          function wrappedResolve(val) {
            ensureAslWrapper(promise, false);
            return resolve(val);
          }
          function wrappedReject(val) {
            ensureAslWrapper(promise, false);
            return reject(val);
          }
        }
      }
      util.inherits(wrappedPromise, Promise2);
      wrap(Promise2.prototype, "then", wrapThen);
      if (Promise2.prototype.chain) {
        wrap(Promise2.prototype, "chain", wrapThen);
      }
      if (v6plus) {
        global.Promise = require_es6_wrapped_promise()(Promise2, ensureAslWrapper);
      } else {
        var PromiseFunctions = [
          "all",
          "race",
          "reject",
          "resolve",
          "accept",
          "defer"
        ];
        PromiseFunctions.forEach(function(key) {
          if (typeof Promise2[key] === "function") {
            wrappedPromise[key] = Promise2[key];
          }
        });
        global.Promise = wrappedPromise;
      }
      function ensureAslWrapper(promise, overwrite) {
        if (!promise.__asl_wrapper || overwrite) {
          promise.__asl_wrapper = wrapCallback(propagateAslWrapper);
        }
      }
      function propagateAslWrapper(ctx, fn, result, next) {
        var nextResult;
        try {
          nextResult = fn.call(ctx, result);
          return { returnVal: nextResult, error: false };
        } catch (err) {
          return { errorVal: err, error: true };
        } finally {
          if (nextResult instanceof Promise2) {
            next.__asl_wrapper = function proxyWrapper() {
              var aslWrapper = nextResult.__asl_wrapper || propagateAslWrapper;
              return aslWrapper.apply(this, arguments);
            };
          } else {
            ensureAslWrapper(next, true);
          }
        }
      }
      function wrapThen(original) {
        return function wrappedThen() {
          var promise = this;
          var next = original.apply(promise, Array.prototype.map.call(arguments, bind));
          next.__asl_wrapper = function proxyWrapper(ctx, fn, val, last) {
            if (promise.__asl_wrapper) {
              promise.__asl_wrapper(ctx, function() {
              }, null, next);
              return next.__asl_wrapper(ctx, fn, val, last);
            }
            return propagateAslWrapper(ctx, fn, val, last);
          };
          return next;
          function bind(fn) {
            if (typeof fn !== "function")
              return fn;
            return wrapCallback(function(val) {
              var result = (promise.__asl_wrapper || propagateAslWrapper)(this, fn, val, next);
              if (result.error) {
                throw result.errorVal;
              } else {
                return result.returnVal;
              }
            });
          }
        };
      }
    }
    function activator(fn) {
      var fallback = function() {
        var args;
        var cbIdx = arguments.length - 1;
        if (typeof arguments[cbIdx] === "function") {
          args = Array(arguments.length);
          for (var i = 0; i < arguments.length - 1; i++) {
            args[i] = arguments[i];
          }
          args[cbIdx] = wrapCallback(arguments[cbIdx]);
        }
        return fn.apply(this, args || arguments);
      };
      switch (fn.length) {
        case 1:
          return function(cb) {
            if (arguments.length !== 1)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb);
          };
        case 2:
          return function(a, cb) {
            if (arguments.length !== 2)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, a, cb);
          };
        case 3:
          return function(a, b, cb) {
            if (arguments.length !== 3)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, a, b, cb);
          };
        case 4:
          return function(a, b, c, cb) {
            if (arguments.length !== 4)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, a, b, c, cb);
          };
        case 5:
          return function(a, b, c, d, cb) {
            if (arguments.length !== 5)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, a, b, c, d, cb);
          };
        case 6:
          return function(a, b, c, d, e, cb) {
            if (arguments.length !== 6)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, a, b, c, d, e, cb);
          };
        default:
          return fallback;
      }
    }
    function activatorFirst(fn) {
      var fallback = function() {
        var args;
        if (typeof arguments[0] === "function") {
          args = Array(arguments.length);
          args[0] = wrapCallback(arguments[0]);
          for (var i = 1; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
        }
        return fn.apply(this, args || arguments);
      };
      switch (fn.length) {
        case 1:
          return function(cb) {
            if (arguments.length !== 1)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb);
          };
        case 2:
          return function(cb, a) {
            if (arguments.length !== 2)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb, a);
          };
        case 3:
          return function(cb, a, b) {
            if (arguments.length !== 3)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb, a, b);
          };
        case 4:
          return function(cb, a, b, c) {
            if (arguments.length !== 4)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb, a, b, c);
          };
        case 5:
          return function(cb, a, b, c, d) {
            if (arguments.length !== 5)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb, a, b, c, d);
          };
        case 6:
          return function(cb, a, b, c, d, e) {
            if (arguments.length !== 6)
              return fallback.apply(this, arguments);
            if (typeof cb === "function")
              cb = wrapCallback(cb);
            return fn.call(this, cb, a, b, c, d, e);
          };
        default:
          return fallback;
      }
    }
    function toNumber(x) {
      return (x = Number(x)) >= 0 ? x : false;
    }
    function isPipeName(s) {
      return typeof s === "string" && toNumber(s) === false;
    }
  }
});

// node_modules/continuation-local-storage/context.js
var require_context4 = __commonJS({
  "node_modules/continuation-local-storage/context.js"(exports, module2) {
    "use strict";
    var assert = require("assert");
    var wrapEmitter = require_listener();
    var CONTEXTS_SYMBOL = "cls@contexts";
    var ERROR_SYMBOL = "error@context";
    if (!process.addAsyncListener)
      require_async_listener();
    function Namespace(name) {
      this.name = name;
      this.active = null;
      this._set = [];
      this.id = null;
    }
    Namespace.prototype.set = function(key, value) {
      if (!this.active) {
        throw new Error("No context available. ns.run() or ns.bind() must be called first.");
      }
      this.active[key] = value;
      return value;
    };
    Namespace.prototype.get = function(key) {
      if (!this.active)
        return void 0;
      return this.active[key];
    };
    Namespace.prototype.createContext = function() {
      return Object.create(this.active);
    };
    Namespace.prototype.run = function(fn) {
      var context = this.createContext();
      this.enter(context);
      try {
        fn(context);
        return context;
      } catch (exception) {
        if (exception) {
          exception[ERROR_SYMBOL] = context;
        }
        throw exception;
      } finally {
        this.exit(context);
      }
    };
    Namespace.prototype.runAndReturn = function(fn) {
      var value;
      this.run(function(context) {
        value = fn(context);
      });
      return value;
    };
    Namespace.prototype.bind = function(fn, context) {
      if (!context) {
        if (!this.active) {
          context = this.createContext();
        } else {
          context = this.active;
        }
      }
      var self2 = this;
      return function() {
        self2.enter(context);
        try {
          return fn.apply(this, arguments);
        } catch (exception) {
          if (exception) {
            exception[ERROR_SYMBOL] = context;
          }
          throw exception;
        } finally {
          self2.exit(context);
        }
      };
    };
    Namespace.prototype.enter = function(context) {
      assert.ok(context, "context must be provided for entering");
      this._set.push(this.active);
      this.active = context;
    };
    Namespace.prototype.exit = function(context) {
      assert.ok(context, "context must be provided for exiting");
      if (this.active === context) {
        assert.ok(this._set.length, "can't remove top context");
        this.active = this._set.pop();
        return;
      }
      var index = this._set.lastIndexOf(context);
      assert.ok(index >= 0, "context not currently entered; can't exit");
      assert.ok(index, "can't remove top context");
      this._set.splice(index, 1);
    };
    Namespace.prototype.bindEmitter = function(emitter) {
      assert.ok(emitter.on && emitter.addListener && emitter.emit, "can only bind real EEs");
      var namespace = this;
      var thisSymbol = "context@" + this.name;
      function attach(listener) {
        if (!listener)
          return;
        if (!listener[CONTEXTS_SYMBOL])
          listener[CONTEXTS_SYMBOL] = Object.create(null);
        listener[CONTEXTS_SYMBOL][thisSymbol] = {
          namespace,
          context: namespace.active
        };
      }
      function bind(unwrapped) {
        if (!(unwrapped && unwrapped[CONTEXTS_SYMBOL]))
          return unwrapped;
        var wrapped = unwrapped;
        var contexts = unwrapped[CONTEXTS_SYMBOL];
        Object.keys(contexts).forEach(function(name) {
          var thunk = contexts[name];
          wrapped = thunk.namespace.bind(wrapped, thunk.context);
        });
        return wrapped;
      }
      wrapEmitter(emitter, attach, bind);
    };
    Namespace.prototype.fromException = function(exception) {
      return exception[ERROR_SYMBOL];
    };
    function get(name) {
      return process.namespaces[name];
    }
    function create(name) {
      assert.ok(name, "namespace must be given a name!");
      var namespace = new Namespace(name);
      namespace.id = process.addAsyncListener({
        create: function() {
          return namespace.active;
        },
        before: function(context, storage) {
          if (storage)
            namespace.enter(storage);
        },
        after: function(context, storage) {
          if (storage)
            namespace.exit(storage);
        },
        error: function(storage) {
          if (storage)
            namespace.exit(storage);
        }
      });
      process.namespaces[name] = namespace;
      return namespace;
    }
    function destroy(name) {
      var namespace = get(name);
      assert.ok(namespace, "can't delete nonexistent namespace!");
      assert.ok(namespace.id, "don't assign to process.namespaces directly!");
      process.removeAsyncListener(namespace.id);
      process.namespaces[name] = null;
    }
    function reset() {
      if (process.namespaces) {
        Object.keys(process.namespaces).forEach(function(name) {
          destroy(name);
        });
      }
      process.namespaces = Object.create(null);
    }
    if (!process.namespaces)
      reset();
    module2.exports = {
      getNamespace: get,
      createNamespace: create,
      destroyNamespace: destroy,
      reset
    };
  }
});

// node_modules/applicationinsights/out/AutoCollection/CorrelationContextManager.js
var require_CorrelationContextManager = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/CorrelationContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CorrelationContextManager = void 0;
    var Logging = require_Logging();
    var DiagChannel = require_initialization();
    var Traceparent = require_Traceparent();
    var Tracestate = require_Tracestate();
    var HttpRequestParser = require_HttpRequestParser();
    var CorrelationContextManager = function() {
      function CorrelationContextManager2() {
      }
      CorrelationContextManager2.getCurrentContext = function() {
        if (!CorrelationContextManager2.enabled) {
          return null;
        }
        var context = CorrelationContextManager2.session.get(CorrelationContextManager2.CONTEXT_NAME);
        if (context === void 0) {
          return null;
        }
        return context;
      };
      CorrelationContextManager2.generateContextObject = function(operationId, parentId, operationName, correlationContextHeader, traceparent, tracestate) {
        parentId = parentId || operationId;
        if (this.enabled) {
          return {
            operation: {
              name: operationName,
              id: operationId,
              parentId,
              traceparent,
              tracestate
            },
            customProperties: new CustomPropertiesImpl(correlationContextHeader)
          };
        }
        return null;
      };
      CorrelationContextManager2.spanToContextObject = function(spanContext, parentId, name) {
        var traceContext = new Traceparent();
        traceContext.traceId = spanContext.traceId;
        traceContext.spanId = spanContext.spanId;
        traceContext.traceFlag = Traceparent.formatOpenTelemetryTraceFlags(spanContext.traceFlags) || Traceparent.DEFAULT_TRACE_FLAG;
        traceContext.parentId = parentId;
        return CorrelationContextManager2.generateContextObject(traceContext.traceId, traceContext.parentId, name, null, traceContext);
      };
      CorrelationContextManager2.runWithContext = function(context, fn) {
        var _a;
        if (CorrelationContextManager2.enabled) {
          return CorrelationContextManager2.session.bind(fn, (_a = {}, _a[CorrelationContextManager2.CONTEXT_NAME] = context, _a))();
        } else {
          return fn();
        }
      };
      CorrelationContextManager2.wrapEmitter = function(emitter) {
        if (CorrelationContextManager2.enabled) {
          CorrelationContextManager2.session.bindEmitter(emitter);
        }
      };
      CorrelationContextManager2.wrapCallback = function(fn, context) {
        var _a;
        if (CorrelationContextManager2.enabled) {
          return CorrelationContextManager2.session.bind(fn, context ? (_a = {}, _a[CorrelationContextManager2.CONTEXT_NAME] = context, _a) : void 0);
        }
        return fn;
      };
      CorrelationContextManager2.enable = function(forceClsHooked) {
        if (this.enabled) {
          return;
        }
        if (!this.isNodeVersionCompatible()) {
          this.enabled = false;
          return;
        }
        if (!CorrelationContextManager2.hasEverEnabled) {
          this.forceClsHooked = forceClsHooked;
          this.hasEverEnabled = true;
          if (typeof this.cls === "undefined") {
            if (CorrelationContextManager2.forceClsHooked === true || CorrelationContextManager2.forceClsHooked === void 0 && CorrelationContextManager2.shouldUseClsHooked()) {
              this.cls = require_cls_hooked();
            } else {
              this.cls = require_context4();
            }
          }
          CorrelationContextManager2.session = this.cls.createNamespace("AI-CLS-Session");
          DiagChannel.registerContextPreservation(function(cb) {
            return CorrelationContextManager2.session.bind(cb);
          });
        }
        this.enabled = true;
      };
      CorrelationContextManager2.startOperation = function(context, request) {
        var traceContext = context && context.traceContext || null;
        var spanContext = context && context.traceId ? context : null;
        var headers = context && context.headers;
        if (spanContext) {
          var traceparent = new Traceparent("00-" + spanContext.traceId + "-" + spanContext.spanId + "-01");
          var tracestate = new Tracestate(spanContext.traceState ? spanContext.traceState.serialize() : null);
          var correlationContext = CorrelationContextManager2.generateContextObject(spanContext.traceId, "|" + spanContext.traceId + "." + spanContext.spanId + ".", typeof request === "string" ? request : "", void 0, traceparent, tracestate);
          return correlationContext;
        }
        if (traceContext) {
          var traceparent = new Traceparent(traceContext.traceparent);
          var tracestate = new Tracestate(traceContext.tracestate);
          var parser = typeof request === "object" ? new HttpRequestParser(request) : null;
          var correlationContext = CorrelationContextManager2.generateContextObject(traceparent.traceId, traceparent.parentId, typeof request === "string" ? request : parser.getOperationName({}), parser && parser.getCorrelationContextHeader() || void 0, traceparent, tracestate);
          return correlationContext;
        }
        if (headers) {
          var traceparent = new Traceparent(headers.traceparent ? headers.traceparent.toString() : null);
          var tracestate = new Tracestate(headers.tracestate ? headers.tracestate.toString() : null);
          var parser = new HttpRequestParser(context);
          var correlationContext = CorrelationContextManager2.generateContextObject(traceparent.traceId, traceparent.parentId, parser.getOperationName({}), parser.getCorrelationContextHeader(), traceparent, tracestate);
          return correlationContext;
        }
        Logging.warn("startOperation was called with invalid arguments", arguments);
        return null;
      };
      CorrelationContextManager2.disable = function() {
        this.enabled = false;
      };
      CorrelationContextManager2.reset = function() {
        if (CorrelationContextManager2.hasEverEnabled) {
          CorrelationContextManager2.session = null;
          CorrelationContextManager2.session = this.cls.createNamespace("AI-CLS-Session");
        }
      };
      CorrelationContextManager2.isNodeVersionCompatible = function() {
        var nodeVer = process.versions.node.split(".");
        return parseInt(nodeVer[0]) > 3 || parseInt(nodeVer[0]) > 2 && parseInt(nodeVer[1]) > 2;
      };
      CorrelationContextManager2.shouldUseClsHooked = function() {
        var nodeVer = process.versions.node.split(".");
        return parseInt(nodeVer[0]) > 8 || parseInt(nodeVer[0]) >= 8 && parseInt(nodeVer[1]) >= 2;
      };
      CorrelationContextManager2.canUseClsHooked = function() {
        var nodeVer = process.versions.node.split(".");
        var greater800 = parseInt(nodeVer[0]) > 8 || parseInt(nodeVer[0]) >= 8 && parseInt(nodeVer[1]) >= 0;
        var less820 = parseInt(nodeVer[0]) < 8 || parseInt(nodeVer[0]) <= 8 && parseInt(nodeVer[1]) < 2;
        var greater470 = parseInt(nodeVer[0]) > 4 || parseInt(nodeVer[0]) >= 4 && parseInt(nodeVer[1]) >= 7;
        return !(greater800 && less820) && greater470;
      };
      CorrelationContextManager2.enabled = false;
      CorrelationContextManager2.hasEverEnabled = false;
      CorrelationContextManager2.forceClsHooked = void 0;
      CorrelationContextManager2.CONTEXT_NAME = "ApplicationInsights-Context";
      return CorrelationContextManager2;
    }();
    exports.CorrelationContextManager = CorrelationContextManager;
    var CustomPropertiesImpl = function() {
      function CustomPropertiesImpl2(header) {
        this.props = [];
        this.addHeaderData(header);
      }
      CustomPropertiesImpl2.prototype.addHeaderData = function(header) {
        var keyvals = header ? header.split(", ") : [];
        this.props = keyvals.map(function(keyval) {
          var parts = keyval.split("=");
          return { key: parts[0], value: parts[1] };
        }).concat(this.props);
      };
      CustomPropertiesImpl2.prototype.serializeToHeader = function() {
        return this.props.map(function(keyval) {
          return keyval.key + "=" + keyval.value;
        }).join(", ");
      };
      CustomPropertiesImpl2.prototype.getProperty = function(prop) {
        for (var i = 0; i < this.props.length; ++i) {
          var keyval = this.props[i];
          if (keyval.key === prop) {
            return keyval.value;
          }
        }
        return;
      };
      CustomPropertiesImpl2.prototype.setProperty = function(prop, val) {
        if (CustomPropertiesImpl2.bannedCharacters.test(prop) || CustomPropertiesImpl2.bannedCharacters.test(val)) {
          Logging.warn("Correlation context property keys and values must not contain ',' or '='. setProperty was called with key: " + prop + " and value: " + val);
          return;
        }
        for (var i = 0; i < this.props.length; ++i) {
          var keyval = this.props[i];
          if (keyval.key === prop) {
            keyval.value = val;
            return;
          }
        }
        this.props.push({ key: prop, value: val });
      };
      CustomPropertiesImpl2.bannedCharacters = /[,=]/;
      return CustomPropertiesImpl2;
    }();
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/console.sub.js
var require_console_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/console.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dispose = exports.enable = void 0;
    var Contracts_1 = require_Contracts();
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var subscriber = function(event) {
      var message = event.data.message;
      clients.forEach(function(client) {
        if (message instanceof Error) {
          client.trackException({ exception: message });
        } else {
          if (message.lastIndexOf("\n") == message.length - 1) {
            message = message.substring(0, message.length - 1);
          }
          client.trackTrace({ message, severity: event.data.stderr ? Contracts_1.SeverityLevel.Warning : Contracts_1.SeverityLevel.Information });
        }
      });
    };
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("console", subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("console", subscriber);
        }
      }
    }
    exports.enable = enable;
    function dispose() {
      diagnostic_channel_1.channel.unsubscribe("console", subscriber);
      clients = [];
    }
    exports.dispose = dispose;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/bunyan.sub.js
var require_bunyan_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/bunyan.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dispose = exports.enable = void 0;
    var Contracts_1 = require_Contracts();
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var bunyanToAILevelMap = {
      10: Contracts_1.SeverityLevel.Verbose,
      20: Contracts_1.SeverityLevel.Verbose,
      30: Contracts_1.SeverityLevel.Information,
      40: Contracts_1.SeverityLevel.Warning,
      50: Contracts_1.SeverityLevel.Error,
      60: Contracts_1.SeverityLevel.Critical
    };
    var subscriber = function(event) {
      var message = event.data.result;
      clients.forEach(function(client) {
        var AIlevel = bunyanToAILevelMap[event.data.level];
        if (message instanceof Error) {
          client.trackException({ exception: message });
        } else {
          client.trackTrace({ message, severity: AIlevel });
        }
      });
    };
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("bunyan", subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("bunyan", subscriber);
        }
      }
    }
    exports.enable = enable;
    function dispose() {
      diagnostic_channel_1.channel.unsubscribe("bunyan", subscriber);
      clients = [];
    }
    exports.dispose = dispose;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/winston.sub.js
var require_winston_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/winston.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dispose = exports.enable = void 0;
    var Contracts_1 = require_Contracts();
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var winstonToAILevelMap = {
      syslog: function(og) {
        var map = {
          emerg: Contracts_1.SeverityLevel.Critical,
          alert: Contracts_1.SeverityLevel.Critical,
          crit: Contracts_1.SeverityLevel.Critical,
          error: Contracts_1.SeverityLevel.Error,
          warning: Contracts_1.SeverityLevel.Warning,
          notice: Contracts_1.SeverityLevel.Information,
          info: Contracts_1.SeverityLevel.Information,
          debug: Contracts_1.SeverityLevel.Verbose
        };
        return map[og] === void 0 ? Contracts_1.SeverityLevel.Information : map[og];
      },
      npm: function(og) {
        var map = {
          error: Contracts_1.SeverityLevel.Error,
          warn: Contracts_1.SeverityLevel.Warning,
          info: Contracts_1.SeverityLevel.Information,
          verbose: Contracts_1.SeverityLevel.Verbose,
          debug: Contracts_1.SeverityLevel.Verbose,
          silly: Contracts_1.SeverityLevel.Verbose
        };
        return map[og] === void 0 ? Contracts_1.SeverityLevel.Information : map[og];
      },
      unknown: function(og) {
        return Contracts_1.SeverityLevel.Information;
      }
    };
    var subscriber = function(event) {
      var message = event.data.message;
      clients.forEach(function(client) {
        if (message instanceof Error) {
          client.trackException({
            exception: message,
            properties: event.data.meta
          });
        } else {
          var AIlevel = winstonToAILevelMap[event.data.levelKind](event.data.level);
          client.trackTrace({
            message,
            severity: AIlevel,
            properties: event.data.meta
          });
        }
      });
    };
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("winston", subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("winston", subscriber);
        }
      }
    }
    exports.enable = enable;
    function dispose() {
      diagnostic_channel_1.channel.unsubscribe("winston", subscriber);
      clients = [];
    }
    exports.dispose = dispose;
  }
});

// node_modules/applicationinsights/out/AutoCollection/Console.js
var require_Console = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/Console.js"(exports, module2) {
    "use strict";
    var DiagChannel = require_initialization();
    var AutoCollectConsole = function() {
      function AutoCollectConsole2(client) {
        if (!!AutoCollectConsole2.INSTANCE) {
          throw new Error("Console logging adapter tracking should be configured from the applicationInsights object");
        }
        this._client = client;
        AutoCollectConsole2.INSTANCE = this;
      }
      AutoCollectConsole2.prototype.enable = function(isEnabled, collectConsoleLog) {
        if (DiagChannel.IsInitialized) {
          require_console_sub().enable(isEnabled && collectConsoleLog, this._client);
          require_bunyan_sub().enable(isEnabled, this._client);
          require_winston_sub().enable(isEnabled, this._client);
        }
      };
      AutoCollectConsole2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      AutoCollectConsole2.prototype.dispose = function() {
        AutoCollectConsole2.INSTANCE = null;
        this.enable(false, false);
      };
      AutoCollectConsole2._methodNames = ["debug", "info", "log", "warn", "error"];
      return AutoCollectConsole2;
    }();
    module2.exports = AutoCollectConsole;
  }
});

// node_modules/applicationinsights/out/AutoCollection/Exceptions.js
var require_Exceptions = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/Exceptions.js"(exports, module2) {
    "use strict";
    var AutoCollectExceptions = function() {
      function AutoCollectExceptions2(client) {
        if (!!AutoCollectExceptions2.INSTANCE) {
          throw new Error("Exception tracking should be configured from the applicationInsights object");
        }
        AutoCollectExceptions2.INSTANCE = this;
        this._client = client;
        var nodeVer = process.versions.node.split(".");
        AutoCollectExceptions2._canUseUncaughtExceptionMonitor = parseInt(nodeVer[0]) > 13 || parseInt(nodeVer[0]) === 13 && parseInt(nodeVer[1]) >= 7;
      }
      AutoCollectExceptions2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      AutoCollectExceptions2.prototype.enable = function(isEnabled) {
        var _this = this;
        if (isEnabled) {
          this._isInitialized = true;
          var self2 = this;
          if (!this._exceptionListenerHandle) {
            var handle = function(reThrow, name, error) {
              if (error === void 0) {
                error = new Error(AutoCollectExceptions2._FALLBACK_ERROR_MESSAGE);
              }
              _this._client.trackException({ exception: error });
              _this._client.flush({ isAppCrashing: true });
              if (reThrow && name && process.listeners(name).length === 1) {
                console.error(error);
                process.exit(1);
              }
            };
            if (AutoCollectExceptions2._canUseUncaughtExceptionMonitor) {
              this._exceptionListenerHandle = handle.bind(this, false, void 0);
              process.on(AutoCollectExceptions2.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME, this._exceptionListenerHandle);
            } else {
              this._exceptionListenerHandle = handle.bind(this, true, AutoCollectExceptions2.UNCAUGHT_EXCEPTION_HANDLER_NAME);
              this._rejectionListenerHandle = handle.bind(this, false, void 0);
              process.on(AutoCollectExceptions2.UNCAUGHT_EXCEPTION_HANDLER_NAME, this._exceptionListenerHandle);
              process.on(AutoCollectExceptions2.UNHANDLED_REJECTION_HANDLER_NAME, this._rejectionListenerHandle);
            }
          }
        } else {
          if (this._exceptionListenerHandle) {
            if (AutoCollectExceptions2._canUseUncaughtExceptionMonitor) {
              process.removeListener(AutoCollectExceptions2.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME, this._exceptionListenerHandle);
            } else {
              process.removeListener(AutoCollectExceptions2.UNCAUGHT_EXCEPTION_HANDLER_NAME, this._exceptionListenerHandle);
              process.removeListener(AutoCollectExceptions2.UNHANDLED_REJECTION_HANDLER_NAME, this._rejectionListenerHandle);
            }
            this._exceptionListenerHandle = void 0;
            this._rejectionListenerHandle = void 0;
            delete this._exceptionListenerHandle;
            delete this._rejectionListenerHandle;
          }
        }
      };
      AutoCollectExceptions2.prototype.dispose = function() {
        AutoCollectExceptions2.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
      };
      AutoCollectExceptions2.INSTANCE = null;
      AutoCollectExceptions2.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME = "uncaughtExceptionMonitor";
      AutoCollectExceptions2.UNCAUGHT_EXCEPTION_HANDLER_NAME = "uncaughtException";
      AutoCollectExceptions2.UNHANDLED_REJECTION_HANDLER_NAME = "unhandledRejection";
      AutoCollectExceptions2._RETHROW_EXIT_MESSAGE = "Application Insights Rethrow Exception Handler";
      AutoCollectExceptions2._FALLBACK_ERROR_MESSAGE = "A promise was rejected without providing an error. Application Insights generated this error stack for you.";
      AutoCollectExceptions2._canUseUncaughtExceptionMonitor = false;
      return AutoCollectExceptions2;
    }();
    module2.exports = AutoCollectExceptions;
  }
});

// node_modules/applicationinsights/out/Declarations/Constants.js
var require_Constants2 = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Constants.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeartBeatMetricName = exports.DependencyTypeName = exports.SpanAttribute = exports.TelemetryTypeStringToQuickPulseDocumentType = exports.TelemetryTypeStringToQuickPulseType = exports.QuickPulseType = exports.QuickPulseDocumentType = exports.PerformanceToQuickPulseCounter = exports.MetricId = exports.PerformanceCounter = exports.QuickPulseCounter = exports.DEFAULT_LIVEMETRICS_HOST = exports.DEFAULT_LIVEMETRICS_ENDPOINT = exports.DEFAULT_BREEZE_ENDPOINT = void 0;
    exports.DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
    exports.DEFAULT_LIVEMETRICS_ENDPOINT = "https://rt.services.visualstudio.com";
    exports.DEFAULT_LIVEMETRICS_HOST = "rt.services.visualstudio.com";
    var QuickPulseCounter;
    (function(QuickPulseCounter2) {
      QuickPulseCounter2["COMMITTED_BYTES"] = "\\Memory\\Committed Bytes";
      QuickPulseCounter2["PROCESSOR_TIME"] = "\\Processor(_Total)\\% Processor Time";
      QuickPulseCounter2["REQUEST_RATE"] = "\\ApplicationInsights\\Requests/Sec";
      QuickPulseCounter2["REQUEST_FAILURE_RATE"] = "\\ApplicationInsights\\Requests Failed/Sec";
      QuickPulseCounter2["REQUEST_DURATION"] = "\\ApplicationInsights\\Request Duration";
      QuickPulseCounter2["DEPENDENCY_RATE"] = "\\ApplicationInsights\\Dependency Calls/Sec";
      QuickPulseCounter2["DEPENDENCY_FAILURE_RATE"] = "\\ApplicationInsights\\Dependency Calls Failed/Sec";
      QuickPulseCounter2["DEPENDENCY_DURATION"] = "\\ApplicationInsights\\Dependency Call Duration";
      QuickPulseCounter2["EXCEPTION_RATE"] = "\\ApplicationInsights\\Exceptions/Sec";
    })(QuickPulseCounter = exports.QuickPulseCounter || (exports.QuickPulseCounter = {}));
    var PerformanceCounter;
    (function(PerformanceCounter2) {
      PerformanceCounter2["PRIVATE_BYTES"] = "\\Process(??APP_WIN32_PROC??)\\Private Bytes";
      PerformanceCounter2["AVAILABLE_BYTES"] = "\\Memory\\Available Bytes";
      PerformanceCounter2["PROCESSOR_TIME"] = "\\Processor(_Total)\\% Processor Time";
      PerformanceCounter2["PROCESS_TIME"] = "\\Process(??APP_WIN32_PROC??)\\% Processor Time";
      PerformanceCounter2["REQUEST_RATE"] = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec";
      PerformanceCounter2["REQUEST_DURATION"] = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time";
    })(PerformanceCounter = exports.PerformanceCounter || (exports.PerformanceCounter = {}));
    var MetricId;
    (function(MetricId2) {
      MetricId2["REQUESTS_DURATION"] = "requests/duration";
      MetricId2["DEPENDENCIES_DURATION"] = "dependencies/duration";
      MetricId2["EXCEPTIONS_COUNT"] = "exceptions/count";
      MetricId2["TRACES_COUNT"] = "traces/count";
    })(MetricId = exports.MetricId || (exports.MetricId = {}));
    exports.PerformanceToQuickPulseCounter = (_a = {}, _a[PerformanceCounter.PROCESSOR_TIME] = QuickPulseCounter.PROCESSOR_TIME, _a[PerformanceCounter.REQUEST_RATE] = QuickPulseCounter.REQUEST_RATE, _a[PerformanceCounter.REQUEST_DURATION] = QuickPulseCounter.REQUEST_DURATION, _a[QuickPulseCounter.COMMITTED_BYTES] = QuickPulseCounter.COMMITTED_BYTES, _a[QuickPulseCounter.REQUEST_FAILURE_RATE] = QuickPulseCounter.REQUEST_FAILURE_RATE, _a[QuickPulseCounter.DEPENDENCY_RATE] = QuickPulseCounter.DEPENDENCY_RATE, _a[QuickPulseCounter.DEPENDENCY_FAILURE_RATE] = QuickPulseCounter.DEPENDENCY_FAILURE_RATE, _a[QuickPulseCounter.DEPENDENCY_DURATION] = QuickPulseCounter.DEPENDENCY_DURATION, _a[QuickPulseCounter.EXCEPTION_RATE] = QuickPulseCounter.EXCEPTION_RATE, _a);
    exports.QuickPulseDocumentType = {
      Event: "Event",
      Exception: "Exception",
      Trace: "Trace",
      Metric: "Metric",
      Request: "Request",
      Dependency: "RemoteDependency",
      Availability: "Availability",
      PageView: "PageView"
    };
    exports.QuickPulseType = {
      Event: "EventTelemetryDocument",
      Exception: "ExceptionTelemetryDocument",
      Trace: "TraceTelemetryDocument",
      Metric: "MetricTelemetryDocument",
      Request: "RequestTelemetryDocument",
      Dependency: "DependencyTelemetryDocument",
      Availability: "AvailabilityTelemetryDocument",
      PageView: "PageViewTelemetryDocument"
    };
    exports.TelemetryTypeStringToQuickPulseType = {
      EventData: exports.QuickPulseType.Event,
      ExceptionData: exports.QuickPulseType.Exception,
      MessageData: exports.QuickPulseType.Trace,
      MetricData: exports.QuickPulseType.Metric,
      RequestData: exports.QuickPulseType.Request,
      RemoteDependencyData: exports.QuickPulseType.Dependency,
      AvailabilityData: exports.QuickPulseType.Availability,
      PageViewData: exports.QuickPulseType.PageView
    };
    exports.TelemetryTypeStringToQuickPulseDocumentType = {
      EventData: exports.QuickPulseDocumentType.Event,
      ExceptionData: exports.QuickPulseDocumentType.Exception,
      MessageData: exports.QuickPulseDocumentType.Trace,
      MetricData: exports.QuickPulseDocumentType.Metric,
      RequestData: exports.QuickPulseDocumentType.Request,
      RemoteDependencyData: exports.QuickPulseDocumentType.Dependency,
      AvailabilityData: exports.QuickPulseDocumentType.Availability,
      PageViewData: exports.QuickPulseDocumentType.PageView
    };
    exports.SpanAttribute = {
      HttpHost: "http.host",
      HttpMethod: "http.method",
      HttpPort: "http.port",
      HttpStatusCode: "http.status_code",
      HttpUrl: "http.url",
      HttpUserAgent: "http.user_agent",
      GrpcMethod: "grpc.method",
      GrpcService: "rpc.service"
    };
    exports.DependencyTypeName = {
      Grpc: "GRPC",
      Http: "HTTP",
      InProc: "InProc"
    };
    exports.HeartBeatMetricName = "HeartBeat";
  }
});

// node_modules/applicationinsights/out/AutoCollection/Performance.js
var require_Performance = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/Performance.js"(exports, module2) {
    "use strict";
    var os2 = require("os");
    var Constants = require_Constants2();
    var AutoCollectPerformance = function() {
      function AutoCollectPerformance2(client, collectionInterval, enableLiveMetricsCounters) {
        if (collectionInterval === void 0) {
          collectionInterval = 6e4;
        }
        if (enableLiveMetricsCounters === void 0) {
          enableLiveMetricsCounters = false;
        }
        this._lastIntervalRequestExecutionTime = 0;
        this._lastIntervalDependencyExecutionTime = 0;
        if (!AutoCollectPerformance2.INSTANCE) {
          AutoCollectPerformance2.INSTANCE = this;
        }
        this._isInitialized = false;
        this._client = client;
        this._collectionInterval = collectionInterval;
        this._enableLiveMetricsCounters = enableLiveMetricsCounters;
      }
      AutoCollectPerformance2.prototype.enable = function(isEnabled, collectionInterval) {
        var _this = this;
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
          this._isInitialized = true;
        }
        if (isEnabled) {
          if (!this._handle) {
            this._lastCpus = os2.cpus();
            this._lastRequests = {
              totalRequestCount: AutoCollectPerformance2._totalRequestCount,
              totalFailedRequestCount: AutoCollectPerformance2._totalFailedRequestCount,
              time: +new Date()
            };
            this._lastDependencies = {
              totalDependencyCount: AutoCollectPerformance2._totalDependencyCount,
              totalFailedDependencyCount: AutoCollectPerformance2._totalFailedDependencyCount,
              time: +new Date()
            };
            this._lastExceptions = {
              totalExceptionCount: AutoCollectPerformance2._totalExceptionCount,
              time: +new Date()
            };
            if (typeof process.cpuUsage === "function") {
              this._lastAppCpuUsage = process.cpuUsage();
            }
            this._lastHrtime = process.hrtime();
            this._collectionInterval = collectionInterval || this._collectionInterval;
            this._handle = setInterval(function() {
              return _this.trackPerformance();
            }, this._collectionInterval);
            this._handle.unref();
          }
        } else {
          if (this._handle) {
            clearInterval(this._handle);
            this._handle = void 0;
          }
        }
      };
      AutoCollectPerformance2.countRequest = function(duration, success) {
        var durationMs;
        if (!AutoCollectPerformance2.isEnabled()) {
          return;
        }
        if (typeof duration === "string") {
          durationMs = +new Date("1970-01-01T" + duration + "Z");
        } else if (typeof duration === "number") {
          durationMs = duration;
        } else {
          return;
        }
        AutoCollectPerformance2._intervalRequestExecutionTime += durationMs;
        if (success === false) {
          AutoCollectPerformance2._totalFailedRequestCount++;
        }
        AutoCollectPerformance2._totalRequestCount++;
      };
      AutoCollectPerformance2.countException = function() {
        AutoCollectPerformance2._totalExceptionCount++;
      };
      AutoCollectPerformance2.countDependency = function(duration, success) {
        var durationMs;
        if (!AutoCollectPerformance2.isEnabled()) {
          return;
        }
        if (typeof duration === "string") {
          durationMs = +new Date("1970-01-01T" + duration + "Z");
        } else if (typeof duration === "number") {
          durationMs = duration;
        } else {
          return;
        }
        AutoCollectPerformance2._intervalDependencyExecutionTime += durationMs;
        if (success === false) {
          AutoCollectPerformance2._totalFailedDependencyCount++;
        }
        AutoCollectPerformance2._totalDependencyCount++;
      };
      AutoCollectPerformance2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      AutoCollectPerformance2.isEnabled = function() {
        return AutoCollectPerformance2.INSTANCE && AutoCollectPerformance2.INSTANCE._isEnabled;
      };
      AutoCollectPerformance2.prototype.trackPerformance = function() {
        this._trackCpu();
        this._trackMemory();
        this._trackNetwork();
        this._trackDependencyRate();
        this._trackExceptionRate();
      };
      AutoCollectPerformance2.prototype._trackCpu = function() {
        var cpus = os2.cpus();
        if (cpus && cpus.length && this._lastCpus && cpus.length === this._lastCpus.length) {
          var totalUser = 0;
          var totalSys = 0;
          var totalNice = 0;
          var totalIdle = 0;
          var totalIrq = 0;
          for (var i = 0; !!cpus && i < cpus.length; i++) {
            var cpu = cpus[i];
            var lastCpu = this._lastCpus[i];
            var name = "% cpu(" + i + ") ";
            var model = cpu.model;
            var speed = cpu.speed;
            var times = cpu.times;
            var lastTimes = lastCpu.times;
            var user = times.user - lastTimes.user || 0;
            totalUser += user;
            var sys = times.sys - lastTimes.sys || 0;
            totalSys += sys;
            var nice = times.nice - lastTimes.nice || 0;
            totalNice += nice;
            var idle = times.idle - lastTimes.idle || 0;
            totalIdle += idle;
            var irq = times.irq - lastTimes.irq || 0;
            totalIrq += irq;
          }
          var appCpuPercent = void 0;
          if (typeof process.cpuUsage === "function") {
            var appCpuUsage = process.cpuUsage();
            var hrtime = process.hrtime();
            var totalApp = appCpuUsage.user - this._lastAppCpuUsage.user + (appCpuUsage.system - this._lastAppCpuUsage.system) || 0;
            if (typeof this._lastHrtime !== "undefined" && this._lastHrtime.length === 2) {
              var elapsedTime = (hrtime[0] - this._lastHrtime[0]) * 1e6 + (hrtime[1] - this._lastHrtime[1]) / 1e3 || 0;
              appCpuPercent = 100 * totalApp / (elapsedTime * cpus.length);
            }
            this._lastAppCpuUsage = appCpuUsage;
            this._lastHrtime = hrtime;
          }
          var combinedTotal = totalUser + totalSys + totalNice + totalIdle + totalIrq || 1;
          this._client.trackMetric({ name: Constants.PerformanceCounter.PROCESSOR_TIME, value: (combinedTotal - totalIdle) / combinedTotal * 100 });
          this._client.trackMetric({ name: Constants.PerformanceCounter.PROCESS_TIME, value: appCpuPercent || totalUser / combinedTotal * 100 });
        }
        this._lastCpus = cpus;
      };
      AutoCollectPerformance2.prototype._trackMemory = function() {
        var freeMem = os2.freemem();
        var usedMem = process.memoryUsage().rss;
        var committedMemory = os2.totalmem() - freeMem;
        this._client.trackMetric({ name: Constants.PerformanceCounter.PRIVATE_BYTES, value: usedMem });
        this._client.trackMetric({ name: Constants.PerformanceCounter.AVAILABLE_BYTES, value: freeMem });
        if (this._enableLiveMetricsCounters) {
          this._client.trackMetric({ name: Constants.QuickPulseCounter.COMMITTED_BYTES, value: committedMemory });
        }
      };
      AutoCollectPerformance2.prototype._trackNetwork = function() {
        var lastRequests = this._lastRequests;
        var requests = {
          totalRequestCount: AutoCollectPerformance2._totalRequestCount,
          totalFailedRequestCount: AutoCollectPerformance2._totalFailedRequestCount,
          time: +new Date()
        };
        var intervalRequests = requests.totalRequestCount - lastRequests.totalRequestCount || 0;
        var intervalFailedRequests = requests.totalFailedRequestCount - lastRequests.totalFailedRequestCount || 0;
        var elapsedMs = requests.time - lastRequests.time;
        var elapsedSeconds = elapsedMs / 1e3;
        var averageRequestExecutionTime = (AutoCollectPerformance2._intervalRequestExecutionTime - this._lastIntervalRequestExecutionTime) / intervalRequests || 0;
        this._lastIntervalRequestExecutionTime = AutoCollectPerformance2._intervalRequestExecutionTime;
        if (elapsedMs > 0) {
          var requestsPerSec = intervalRequests / elapsedSeconds;
          var failedRequestsPerSec = intervalFailedRequests / elapsedSeconds;
          this._client.trackMetric({ name: Constants.PerformanceCounter.REQUEST_RATE, value: requestsPerSec });
          if (!this._enableLiveMetricsCounters || intervalRequests > 0) {
            this._client.trackMetric({ name: Constants.PerformanceCounter.REQUEST_DURATION, value: averageRequestExecutionTime });
          }
          if (this._enableLiveMetricsCounters) {
            this._client.trackMetric({ name: Constants.QuickPulseCounter.REQUEST_FAILURE_RATE, value: failedRequestsPerSec });
          }
        }
        this._lastRequests = requests;
      };
      AutoCollectPerformance2.prototype._trackDependencyRate = function() {
        if (this._enableLiveMetricsCounters) {
          var lastDependencies = this._lastDependencies;
          var dependencies = {
            totalDependencyCount: AutoCollectPerformance2._totalDependencyCount,
            totalFailedDependencyCount: AutoCollectPerformance2._totalFailedDependencyCount,
            time: +new Date()
          };
          var intervalDependencies = dependencies.totalDependencyCount - lastDependencies.totalDependencyCount || 0;
          var intervalFailedDependencies = dependencies.totalFailedDependencyCount - lastDependencies.totalFailedDependencyCount || 0;
          var elapsedMs = dependencies.time - lastDependencies.time;
          var elapsedSeconds = elapsedMs / 1e3;
          var averageDependencyExecutionTime = (AutoCollectPerformance2._intervalDependencyExecutionTime - this._lastIntervalDependencyExecutionTime) / intervalDependencies || 0;
          this._lastIntervalDependencyExecutionTime = AutoCollectPerformance2._intervalDependencyExecutionTime;
          if (elapsedMs > 0) {
            var dependenciesPerSec = intervalDependencies / elapsedSeconds;
            var failedDependenciesPerSec = intervalFailedDependencies / elapsedSeconds;
            this._client.trackMetric({ name: Constants.QuickPulseCounter.DEPENDENCY_RATE, value: dependenciesPerSec });
            this._client.trackMetric({ name: Constants.QuickPulseCounter.DEPENDENCY_FAILURE_RATE, value: failedDependenciesPerSec });
            if (!this._enableLiveMetricsCounters || intervalDependencies > 0) {
              this._client.trackMetric({ name: Constants.QuickPulseCounter.DEPENDENCY_DURATION, value: averageDependencyExecutionTime });
            }
          }
          this._lastDependencies = dependencies;
        }
      };
      AutoCollectPerformance2.prototype._trackExceptionRate = function() {
        if (this._enableLiveMetricsCounters) {
          var lastExceptions = this._lastExceptions;
          var exceptions = {
            totalExceptionCount: AutoCollectPerformance2._totalExceptionCount,
            time: +new Date()
          };
          var intervalExceptions = exceptions.totalExceptionCount - lastExceptions.totalExceptionCount || 0;
          var elapsedMs = exceptions.time - lastExceptions.time;
          var elapsedSeconds = elapsedMs / 1e3;
          if (elapsedMs > 0) {
            var exceptionsPerSec = intervalExceptions / elapsedSeconds;
            this._client.trackMetric({ name: Constants.QuickPulseCounter.EXCEPTION_RATE, value: exceptionsPerSec });
          }
          this._lastExceptions = exceptions;
        }
      };
      AutoCollectPerformance2.prototype.dispose = function() {
        AutoCollectPerformance2.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
      };
      AutoCollectPerformance2._totalRequestCount = 0;
      AutoCollectPerformance2._totalFailedRequestCount = 0;
      AutoCollectPerformance2._totalDependencyCount = 0;
      AutoCollectPerformance2._totalFailedDependencyCount = 0;
      AutoCollectPerformance2._totalExceptionCount = 0;
      AutoCollectPerformance2._intervalDependencyExecutionTime = 0;
      AutoCollectPerformance2._intervalRequestExecutionTime = 0;
      return AutoCollectPerformance2;
    }();
    module2.exports = AutoCollectPerformance;
  }
});

// node_modules/applicationinsights/out/Declarations/Metrics/AggregatedMetricCounters.js
var require_AggregatedMetricCounters = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Metrics/AggregatedMetricCounters.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregatedMetricCounter = void 0;
    var AggregatedMetricCounter = function() {
      function AggregatedMetricCounter2(dimensions) {
        this.dimensions = dimensions;
        this.totalCount = 0;
        this.lastTotalCount = 0;
        this.intervalExecutionTime = 0;
        this.lastTime = +new Date();
        this.lastIntervalExecutionTime = 0;
      }
      return AggregatedMetricCounter2;
    }();
    exports.AggregatedMetricCounter = AggregatedMetricCounter;
  }
});

// node_modules/applicationinsights/out/Declarations/Metrics/AggregatedMetricDimensions.js
var require_AggregatedMetricDimensions = __commonJS({
  "node_modules/applicationinsights/out/Declarations/Metrics/AggregatedMetricDimensions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PreaggregatedMetricPropertyNames = void 0;
    exports.PreaggregatedMetricPropertyNames = {
      cloudRoleInstance: "cloud/roleInstance",
      cloudRoleName: "cloud/roleName",
      operationSynthetic: "operation/synthetic",
      requestSuccess: "Request.Success",
      requestResultCode: "request/resultCode",
      dependencyType: "Dependency.Type",
      dependencyTarget: "dependency/target",
      dependencySuccess: "Dependency.Success",
      dependencyResultCode: "dependency/resultCode",
      traceSeverityLevel: "trace/severityLevel"
    };
  }
});

// node_modules/applicationinsights/out/AutoCollection/PreAggregatedMetrics.js
var require_PreAggregatedMetrics = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/PreAggregatedMetrics.js"(exports, module2) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var Constants = require_Constants2();
    var AggregatedMetricCounters_1 = require_AggregatedMetricCounters();
    var AggregatedMetricDimensions_1 = require_AggregatedMetricDimensions();
    var AutoCollectPreAggregatedMetrics = function() {
      function AutoCollectPreAggregatedMetrics2(client, collectionInterval) {
        if (collectionInterval === void 0) {
          collectionInterval = 6e4;
        }
        if (!AutoCollectPreAggregatedMetrics2.INSTANCE) {
          AutoCollectPreAggregatedMetrics2.INSTANCE = this;
        }
        this._isInitialized = false;
        AutoCollectPreAggregatedMetrics2._dependencyCountersCollection = [];
        AutoCollectPreAggregatedMetrics2._requestCountersCollection = [];
        AutoCollectPreAggregatedMetrics2._exceptionCountersCollection = [];
        AutoCollectPreAggregatedMetrics2._traceCountersCollection = [];
        this._client = client;
        this._collectionInterval = collectionInterval;
      }
      AutoCollectPreAggregatedMetrics2.prototype.enable = function(isEnabled, collectionInterval) {
        var _this = this;
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
          this._isInitialized = true;
        }
        if (isEnabled) {
          if (!this._handle) {
            this._collectionInterval = collectionInterval || this._collectionInterval;
            this._handle = setInterval(function() {
              return _this.trackPreAggregatedMetrics();
            }, this._collectionInterval);
            this._handle.unref();
          }
        } else {
          if (this._handle) {
            clearInterval(this._handle);
            this._handle = void 0;
          }
        }
      };
      AutoCollectPreAggregatedMetrics2.countException = function(dimensions) {
        if (!AutoCollectPreAggregatedMetrics2.isEnabled()) {
          return;
        }
        var counter = AutoCollectPreAggregatedMetrics2._getAggregatedCounter(dimensions, this._exceptionCountersCollection);
        counter.totalCount++;
      };
      AutoCollectPreAggregatedMetrics2.countTrace = function(dimensions) {
        if (!AutoCollectPreAggregatedMetrics2.isEnabled()) {
          return;
        }
        var counter = AutoCollectPreAggregatedMetrics2._getAggregatedCounter(dimensions, this._traceCountersCollection);
        counter.totalCount++;
      };
      AutoCollectPreAggregatedMetrics2.countRequest = function(duration, dimensions) {
        if (!AutoCollectPreAggregatedMetrics2.isEnabled()) {
          return;
        }
        var durationMs;
        var counter = AutoCollectPreAggregatedMetrics2._getAggregatedCounter(dimensions, this._requestCountersCollection);
        if (typeof duration === "string") {
          durationMs = +new Date("1970-01-01T" + duration + "Z");
        } else if (typeof duration === "number") {
          durationMs = duration;
        } else {
          return;
        }
        counter.intervalExecutionTime += durationMs;
        counter.totalCount++;
      };
      AutoCollectPreAggregatedMetrics2.countDependency = function(duration, dimensions) {
        if (!AutoCollectPreAggregatedMetrics2.isEnabled()) {
          return;
        }
        var counter = AutoCollectPreAggregatedMetrics2._getAggregatedCounter(dimensions, this._dependencyCountersCollection);
        var durationMs;
        if (typeof duration === "string") {
          durationMs = +new Date("1970-01-01T" + duration + "Z");
        } else if (typeof duration === "number") {
          durationMs = duration;
        } else {
          return;
        }
        counter.intervalExecutionTime += durationMs;
        counter.totalCount++;
      };
      AutoCollectPreAggregatedMetrics2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      AutoCollectPreAggregatedMetrics2.isEnabled = function() {
        return AutoCollectPreAggregatedMetrics2.INSTANCE && AutoCollectPreAggregatedMetrics2.INSTANCE._isEnabled;
      };
      AutoCollectPreAggregatedMetrics2.prototype.trackPreAggregatedMetrics = function() {
        this._trackRequestMetrics();
        this._trackDependencyMetrics();
        this._trackExceptionMetrics();
        this._trackTraceMetrics();
      };
      AutoCollectPreAggregatedMetrics2._getAggregatedCounter = function(dimensions, counterCollection) {
        var notMatch = false;
        for (var i = 0; i < counterCollection.length; i++) {
          if (dimensions === counterCollection[i].dimensions) {
            return counterCollection[i];
          }
          if (Object.keys(dimensions).length !== Object.keys(counterCollection[i].dimensions).length) {
            continue;
          }
          for (var dim in dimensions) {
            if (dimensions[dim] != counterCollection[i].dimensions[dim]) {
              notMatch = true;
              break;
            }
          }
          if (!notMatch) {
            return counterCollection[i];
          }
          notMatch = false;
        }
        var newCounter = new AggregatedMetricCounters_1.AggregatedMetricCounter(dimensions);
        counterCollection.push(newCounter);
        return newCounter;
      };
      AutoCollectPreAggregatedMetrics2.prototype._trackRequestMetrics = function() {
        for (var i = 0; i < AutoCollectPreAggregatedMetrics2._requestCountersCollection.length; i++) {
          var currentCounter = AutoCollectPreAggregatedMetrics2._requestCountersCollection[i];
          currentCounter.time = +new Date();
          var intervalRequests = currentCounter.totalCount - currentCounter.lastTotalCount || 0;
          var elapsedMs = currentCounter.time - currentCounter.lastTime;
          var averageRequestExecutionTime = (currentCounter.intervalExecutionTime - currentCounter.lastIntervalExecutionTime) / intervalRequests || 0;
          currentCounter.lastIntervalExecutionTime = currentCounter.intervalExecutionTime;
          if (elapsedMs > 0) {
            if (intervalRequests > 0) {
              this._trackPreAggregatedMetric({
                name: "Server response time",
                dimensions: currentCounter.dimensions,
                value: averageRequestExecutionTime,
                count: intervalRequests,
                aggregationInterval: elapsedMs,
                metricType: Constants.MetricId.REQUESTS_DURATION
              });
            }
          }
          currentCounter.lastTotalCount = currentCounter.totalCount;
          currentCounter.lastTime = currentCounter.time;
        }
      };
      AutoCollectPreAggregatedMetrics2.prototype._trackDependencyMetrics = function() {
        for (var i = 0; i < AutoCollectPreAggregatedMetrics2._dependencyCountersCollection.length; i++) {
          var currentCounter = AutoCollectPreAggregatedMetrics2._dependencyCountersCollection[i];
          currentCounter.time = +new Date();
          var intervalDependencies = currentCounter.totalCount - currentCounter.lastTotalCount || 0;
          var elapsedMs = currentCounter.time - currentCounter.lastTime;
          var averageDependencyExecutionTime = (currentCounter.intervalExecutionTime - currentCounter.lastIntervalExecutionTime) / intervalDependencies || 0;
          currentCounter.lastIntervalExecutionTime = currentCounter.intervalExecutionTime;
          if (elapsedMs > 0) {
            if (intervalDependencies > 0) {
              this._trackPreAggregatedMetric({
                name: "Dependency duration",
                dimensions: currentCounter.dimensions,
                value: averageDependencyExecutionTime,
                count: intervalDependencies,
                aggregationInterval: elapsedMs,
                metricType: Constants.MetricId.DEPENDENCIES_DURATION
              });
            }
          }
          currentCounter.lastTotalCount = currentCounter.totalCount;
          currentCounter.lastTime = currentCounter.time;
        }
      };
      AutoCollectPreAggregatedMetrics2.prototype._trackExceptionMetrics = function() {
        for (var i = 0; i < AutoCollectPreAggregatedMetrics2._exceptionCountersCollection.length; i++) {
          var currentCounter = AutoCollectPreAggregatedMetrics2._exceptionCountersCollection[i];
          var intervalExceptions = currentCounter.totalCount - currentCounter.lastTotalCount || 0;
          var elapsedMs = currentCounter.time - currentCounter.lastTime;
          this._trackPreAggregatedMetric({
            name: "Exceptions",
            dimensions: currentCounter.dimensions,
            value: intervalExceptions,
            count: intervalExceptions,
            aggregationInterval: elapsedMs,
            metricType: Constants.MetricId.EXCEPTIONS_COUNT
          });
          currentCounter.lastTotalCount = currentCounter.totalCount;
          currentCounter.lastTime = currentCounter.time;
        }
      };
      AutoCollectPreAggregatedMetrics2.prototype._trackTraceMetrics = function() {
        for (var i = 0; i < AutoCollectPreAggregatedMetrics2._traceCountersCollection.length; i++) {
          var currentCounter = AutoCollectPreAggregatedMetrics2._traceCountersCollection[i];
          var intervalTraces = currentCounter.totalCount - currentCounter.lastTotalCount || 0;
          var elapsedMs = currentCounter.time - currentCounter.lastTime;
          this._trackPreAggregatedMetric({
            name: "Traces",
            dimensions: currentCounter.dimensions,
            value: intervalTraces,
            count: intervalTraces,
            aggregationInterval: elapsedMs,
            metricType: Constants.MetricId.TRACES_COUNT
          });
          currentCounter.lastTotalCount = currentCounter.totalCount;
          currentCounter.lastTime = currentCounter.time;
        }
      };
      AutoCollectPreAggregatedMetrics2.prototype._trackPreAggregatedMetric = function(metric) {
        var metricProperties = {};
        for (var dim in metric.dimensions) {
          metricProperties[AggregatedMetricDimensions_1.PreaggregatedMetricPropertyNames[dim]] = metric.dimensions[dim];
        }
        metricProperties = __assign(__assign({}, metricProperties), { "_MS.MetricId": metric.metricType, "_MS.AggregationIntervalMs": String(metric.aggregationInterval), "_MS.IsAutocollected": "True" });
        var telemetry = {
          name: metric.name,
          value: metric.value,
          count: metric.count,
          properties: metricProperties,
          kind: "Aggregation"
        };
        this._client.trackMetric(telemetry);
      };
      AutoCollectPreAggregatedMetrics2.prototype.dispose = function() {
        AutoCollectPreAggregatedMetrics2.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
      };
      return AutoCollectPreAggregatedMetrics2;
    }();
    module2.exports = AutoCollectPreAggregatedMetrics;
  }
});

// node_modules/applicationinsights/out/Library/Context.js
var require_Context = __commonJS({
  "node_modules/applicationinsights/out/Library/Context.js"(exports, module2) {
    "use strict";
    var os2 = require("os");
    var fs = require("fs");
    var path = require("path");
    var Contracts = require_Contracts();
    var Logging = require_Logging();
    var Context = function() {
      function Context2(packageJsonPath) {
        this.keys = new Contracts.ContextTagKeys();
        this.tags = {};
        this._loadApplicationContext(packageJsonPath);
        this._loadDeviceContext();
        this._loadInternalContext();
      }
      Context2.prototype._loadApplicationContext = function(packageJsonPath) {
        packageJsonPath = packageJsonPath || path.resolve(__dirname, "../../../../package.json");
        if (!Context2.appVersion[packageJsonPath]) {
          Context2.appVersion[packageJsonPath] = "unknown";
          try {
            var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
            if (packageJson && typeof packageJson.version === "string") {
              Context2.appVersion[packageJsonPath] = packageJson.version;
            }
          } catch (exception) {
            Logging.info("unable to read app version: ", exception);
          }
        }
        this.tags[this.keys.applicationVersion] = Context2.appVersion[packageJsonPath];
      };
      Context2.prototype._loadDeviceContext = function() {
        this.tags[this.keys.deviceId] = "";
        this.tags[this.keys.cloudRoleInstance] = os2 && os2.hostname();
        this.tags[this.keys.deviceOSVersion] = os2 && os2.type() + " " + os2.release();
        this.tags[this.keys.cloudRole] = Context2.DefaultRoleName;
        this.tags["ai.device.osArchitecture"] = os2 && os2.arch();
        this.tags["ai.device.osPlatform"] = os2 && os2.platform();
      };
      Context2.prototype._loadInternalContext = function() {
        var packageJsonPath = path.resolve(__dirname, "../../package.json");
        if (!Context2.sdkVersion) {
          Context2.sdkVersion = "unknown";
          try {
            var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
            if (packageJson && typeof packageJson.version === "string") {
              Context2.sdkVersion = packageJson.version;
            }
          } catch (exception) {
            Logging.info("unable to read app version: ", exception);
          }
        }
        this.tags[this.keys.internalSdkVersion] = "node:" + Context2.sdkVersion;
      };
      Context2.DefaultRoleName = "Web";
      Context2.appVersion = {};
      Context2.sdkVersion = null;
      return Context2;
    }();
    module2.exports = Context;
  }
});

// node_modules/applicationinsights/out/AutoCollection/HttpDependencyParser.js
var require_HttpDependencyParser = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/HttpDependencyParser.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var url = require("url");
    var Contracts = require_Contracts();
    var Util = require_Util();
    var RequestResponseHeaders = require_RequestResponseHeaders();
    var RequestParser = require_RequestParser();
    var CorrelationIdManager = require_CorrelationIdManager();
    var HttpDependencyParser = function(_super) {
      __extends(HttpDependencyParser2, _super);
      function HttpDependencyParser2(requestOptions, request) {
        var _this = _super.call(this) || this;
        if (request && request.method && requestOptions) {
          _this.method = request.method;
          _this.url = HttpDependencyParser2._getUrlFromRequestOptions(requestOptions, request);
          _this.startTime = +new Date();
        }
        return _this;
      }
      HttpDependencyParser2.prototype.onError = function(error) {
        this._setStatus(void 0, error);
      };
      HttpDependencyParser2.prototype.onResponse = function(response) {
        this._setStatus(response.statusCode, void 0);
        this.correlationId = Util.getCorrelationContextTarget(response, RequestResponseHeaders.requestContextTargetKey);
      };
      HttpDependencyParser2.prototype.getDependencyTelemetry = function(baseTelemetry, dependencyId) {
        var urlObject = url.parse(this.url);
        urlObject.search = void 0;
        urlObject.hash = void 0;
        var dependencyName = this.method.toUpperCase() + " " + urlObject.pathname;
        var remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_HTTP;
        var remoteDependencyTarget = urlObject.hostname;
        if (urlObject.port) {
          remoteDependencyTarget += ":" + urlObject.port;
        }
        if (this.correlationId) {
          remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_AI;
          if (this.correlationId !== CorrelationIdManager.correlationIdPrefix) {
            remoteDependencyTarget += " | " + this.correlationId;
          }
        } else {
          remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_HTTP;
        }
        var dependencyTelemetry = {
          id: dependencyId,
          name: dependencyName,
          data: this.url,
          duration: this.duration,
          success: this._isSuccess(),
          resultCode: this.statusCode ? this.statusCode.toString() : null,
          properties: this.properties || {},
          dependencyTypeName: remoteDependencyType,
          target: remoteDependencyTarget
        };
        if (baseTelemetry && baseTelemetry.time) {
          dependencyTelemetry.time = baseTelemetry.time;
        } else if (this.startTime) {
          dependencyTelemetry.time = new Date(this.startTime);
        }
        if (baseTelemetry) {
          for (var key in baseTelemetry) {
            if (!dependencyTelemetry[key]) {
              dependencyTelemetry[key] = baseTelemetry[key];
            }
          }
          if (baseTelemetry.properties) {
            for (var key in baseTelemetry.properties) {
              dependencyTelemetry.properties[key] = baseTelemetry.properties[key];
            }
          }
        }
        return dependencyTelemetry;
      };
      HttpDependencyParser2._getUrlFromRequestOptions = function(options, request) {
        if (typeof options === "string") {
          if (options.indexOf("http://") === 0 || options.indexOf("https://") === 0) {
            options = url.parse(options);
          } else {
            var parsed = url.parse(options);
            if (parsed.host === "443") {
              options = url.parse("https://" + options);
            } else {
              options = url.parse("http://" + options);
            }
          }
        } else if (options && typeof url.URL === "function" && options instanceof url.URL) {
          return url.format(options);
        } else {
          var originalOptions_1 = options;
          options = {};
          if (originalOptions_1) {
            Object.keys(originalOptions_1).forEach(function(key) {
              options[key] = originalOptions_1[key];
            });
          }
        }
        if (options.path) {
          var parsedQuery = url.parse(options.path);
          options.pathname = parsedQuery.pathname;
          options.search = parsedQuery.search;
        }
        if (options.host && options.port) {
          var parsedHost = url.parse("http://" + options.host);
          if (!parsedHost.port && options.port) {
            options.hostname = options.host;
            delete options.host;
          }
        }
        options.protocol = options.protocol || request.agent && request.agent.protocol || request.protocol || void 0;
        options.hostname = options.hostname || "localhost";
        return url.format(options);
      };
      return HttpDependencyParser2;
    }(RequestParser);
    module2.exports = HttpDependencyParser;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/SpanParser.js
var require_SpanParser = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/SpanParser.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.spanToTelemetryContract = void 0;
    var api_1 = require_src();
    var Constants = require_Constants2();
    function filterSpanAttributes(attributes) {
      var newAttributes = __assign({}, attributes);
      Object.keys(Constants.SpanAttribute).forEach(function(key) {
        delete newAttributes[key];
      });
      return newAttributes;
    }
    function spanToTelemetryContract(span) {
      var id = "|" + span.spanContext().traceId + "." + span.spanContext().spanId + ".";
      var duration = Math.round(span["_duration"][0] * 1e3 + span["_duration"][1] / 1e6);
      var peerAddress = span.attributes["peer.address"] ? span.attributes["peer.address"].toString() : "";
      var component = span.attributes["component"] ? span.attributes["component"].toString() : "";
      var isHttp = component.toUpperCase() === Constants.DependencyTypeName.Http || !!span.attributes[Constants.SpanAttribute.HttpUrl];
      var isGrpc = component.toLowerCase() === Constants.DependencyTypeName.Grpc;
      if (isHttp) {
        var method = span.attributes[Constants.SpanAttribute.HttpMethod] || "GET";
        var url = new URL(span.attributes[Constants.SpanAttribute.HttpUrl].toString());
        var host = span.attributes[Constants.SpanAttribute.HttpHost] || url.host;
        var port = span.attributes[Constants.SpanAttribute.HttpPort] || url.port || null;
        var pathname = url.pathname || "/";
        var name_1 = method + " " + pathname;
        var dependencyTypeName = Constants.DependencyTypeName.Http;
        var target = port ? (host + ":" + port).toString() : host.toString();
        var data = url.toString();
        var resultCode = span.attributes[Constants.SpanAttribute.HttpStatusCode] || span.status.code || 0;
        var success = resultCode < 400;
        return {
          id,
          name: name_1,
          dependencyTypeName,
          target,
          data,
          success,
          duration,
          url: data,
          resultCode: String(resultCode),
          properties: filterSpanAttributes(span.attributes)
        };
      } else if (isGrpc) {
        var method = span.attributes[Constants.SpanAttribute.GrpcMethod] || "rpc";
        var service = span.attributes[Constants.SpanAttribute.GrpcService];
        var name_2 = service ? method + " " + service : span.name;
        return {
          id,
          duration,
          name: name_2,
          target: service.toString(),
          data: service.toString() || name_2,
          url: service.toString() || name_2,
          dependencyTypeName: Constants.DependencyTypeName.Grpc,
          resultCode: String(span.status.code || 0),
          success: span.status.code === 0,
          properties: filterSpanAttributes(span.attributes)
        };
      } else {
        var name_3 = span.name;
        var links = span.links && span.links.map(function(link) {
          return {
            operation_Id: link.context.traceId,
            id: link.context.spanId
          };
        });
        return {
          id,
          duration,
          name: name_3,
          target: peerAddress,
          data: peerAddress || name_3,
          url: peerAddress || name_3,
          dependencyTypeName: span.kind === api_1.SpanKind.INTERNAL ? Constants.DependencyTypeName.InProc : component || span.name,
          resultCode: String(span.status.code || 0),
          success: span.status.code === 0,
          properties: __assign(__assign({}, filterSpanAttributes(span.attributes)), { "_MS.links": links || void 0 })
        };
      }
    }
    exports.spanToTelemetryContract = spanToTelemetryContract;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/azure-coretracing.sub.js
var require_azure_coretracing_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/azure-coretracing.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.subscriber = void 0;
    var api_1 = require_src();
    var diagnostic_channel_1 = require_channel();
    var Traceparent = require_Traceparent();
    var SpanParser = require_SpanParser();
    var AsyncHooksScopeManager_1 = require_AsyncHooksScopeManager();
    var clients = [];
    var subscriber = function(event) {
      var span = event.data;
      var telemetry = SpanParser.spanToTelemetryContract(span);
      var spanContext = span.spanContext();
      var traceparent = new Traceparent();
      traceparent.traceId = spanContext.traceId;
      traceparent.spanId = spanContext.spanId;
      traceparent.traceFlag = Traceparent.formatOpenTelemetryTraceFlags(spanContext.traceFlags);
      traceparent.parentId = span.parentSpanId ? "|" + spanContext.traceId + "." + span.parentSpanId + "." : null;
      AsyncHooksScopeManager_1.AsyncScopeManager.with(span, function() {
        clients.forEach(function(client) {
          if (span.kind === api_1.SpanKind.SERVER) {
            client.trackRequest(telemetry);
          } else if (span.kind === api_1.SpanKind.CLIENT || span.kind === api_1.SpanKind.INTERNAL) {
            client.trackDependency(telemetry);
          }
        });
      });
    };
    exports.subscriber = subscriber;
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("azure-coretracing", exports.subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("azure-coretracing", exports.subscriber);
        }
      }
    }
    exports.enable = enable;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/mongodb.sub.js
var require_mongodb_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/mongodb.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.subscriber = void 0;
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var subscriber = function(event) {
      if (event.data.event.commandName === "ismaster") {
        return;
      }
      clients.forEach(function(client) {
        var dbName = event.data.startedData && event.data.startedData.databaseName || "Unknown database";
        client.trackDependency({
          target: dbName,
          data: event.data.event.commandName,
          name: event.data.event.commandName,
          duration: event.data.event.duration,
          success: event.data.succeeded,
          resultCode: event.data.succeeded ? "0" : "1",
          time: event.data.startedData.time,
          dependencyTypeName: "mongodb"
        });
      });
    };
    exports.subscriber = subscriber;
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("mongodb", exports.subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("mongodb", exports.subscriber);
        }
      }
    }
    exports.enable = enable;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/mysql.sub.js
var require_mysql_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/mysql.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.subscriber = void 0;
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var subscriber = function(event) {
      clients.forEach(function(client) {
        var queryObj = event.data.query || {};
        var sqlString = queryObj.sql || "Unknown query";
        var success = !event.data.err;
        var connection = queryObj._connection || {};
        var connectionConfig = connection.config || {};
        var dbName = connectionConfig.socketPath ? connectionConfig.socketPath : (connectionConfig.host || "localhost") + ":" + connectionConfig.port;
        client.trackDependency({
          target: dbName,
          data: sqlString,
          name: sqlString,
          duration: event.data.duration,
          success,
          resultCode: success ? "0" : "1",
          time: event.data.time,
          dependencyTypeName: "mysql"
        });
      });
    };
    exports.subscriber = subscriber;
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("mysql", exports.subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("mysql", exports.subscriber);
        }
      }
    }
    exports.enable = enable;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/redis.sub.js
var require_redis_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/redis.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.subscriber = void 0;
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var subscriber = function(event) {
      clients.forEach(function(client) {
        if (event.data.commandObj.command === "info") {
          return;
        }
        client.trackDependency({
          target: event.data.address,
          name: event.data.commandObj.command,
          data: event.data.commandObj.command,
          duration: event.data.duration,
          success: !event.data.err,
          resultCode: event.data.err ? "1" : "0",
          time: event.data.time,
          dependencyTypeName: "redis"
        });
      });
    };
    exports.subscriber = subscriber;
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("redis", exports.subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("redis", exports.subscriber);
        }
      }
    }
    exports.enable = enable;
  }
});

// node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/postgres.sub.js
var require_postgres_sub = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/diagnostic-channel/postgres.sub.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enable = exports.subscriber = void 0;
    var diagnostic_channel_1 = require_channel();
    var clients = [];
    var subscriber = function(event) {
      clients.forEach(function(client) {
        var q = event.data.query;
        var sql = q.preparable && q.preparable.text || q.plan || q.text || "unknown query";
        var success = !event.data.error;
        var conn = event.data.database.host + ":" + event.data.database.port;
        client.trackDependency({
          target: conn,
          data: sql,
          name: sql,
          duration: event.data.duration,
          success,
          resultCode: success ? "0" : "1",
          time: event.data.time,
          dependencyTypeName: "postgres"
        });
      });
    };
    exports.subscriber = subscriber;
    function enable(enabled, client) {
      if (enabled) {
        if (clients.length === 0) {
          diagnostic_channel_1.channel.subscribe("postgres", exports.subscriber);
        }
        ;
        clients.push(client);
      } else {
        clients = clients.filter(function(c) {
          return c != client;
        });
        if (clients.length === 0) {
          diagnostic_channel_1.channel.unsubscribe("postgres", exports.subscriber);
        }
      }
    }
    exports.enable = enable;
  }
});

// node_modules/applicationinsights/out/AutoCollection/HttpDependencies.js
var require_HttpDependencies = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/HttpDependencies.js"(exports, module2) {
    "use strict";
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    var http = require("http");
    var https = require("https");
    var Logging = require_Logging();
    var Util = require_Util();
    var RequestResponseHeaders = require_RequestResponseHeaders();
    var HttpDependencyParser = require_HttpDependencyParser();
    var CorrelationContextManager_1 = require_CorrelationContextManager();
    var CorrelationIdManager = require_CorrelationIdManager();
    var Traceparent = require_Traceparent();
    var DiagChannel = require_initialization();
    var AutoCollectHttpDependencies = function() {
      function AutoCollectHttpDependencies2(client) {
        if (!!AutoCollectHttpDependencies2.INSTANCE) {
          throw new Error("Client request tracking should be configured from the applicationInsights object");
        }
        AutoCollectHttpDependencies2.INSTANCE = this;
        this._client = client;
      }
      AutoCollectHttpDependencies2.prototype.enable = function(isEnabled) {
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
          this._initialize();
        }
        if (DiagChannel.IsInitialized) {
          require_azure_coretracing_sub().enable(true, this._client);
          require_mongodb_sub().enable(isEnabled, this._client);
          require_mysql_sub().enable(isEnabled, this._client);
          require_redis_sub().enable(isEnabled, this._client);
          require_postgres_sub().enable(isEnabled, this._client);
        }
      };
      AutoCollectHttpDependencies2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      AutoCollectHttpDependencies2.prototype._initialize = function() {
        var _this = this;
        this._isInitialized = true;
        var originalRequest = http.request;
        var originalHttpsRequest = https.request;
        var clientRequestPatch = function(request, options) {
          var shouldCollect = !options[AutoCollectHttpDependencies2.disableCollectionRequestOption] && !request[AutoCollectHttpDependencies2.alreadyAutoCollectedFlag];
          if (options.headers && options.headers["user-agent"] && options.headers["user-agent"].toString().indexOf("azsdk-js") !== -1) {
            shouldCollect = false;
          }
          request[AutoCollectHttpDependencies2.alreadyAutoCollectedFlag] = true;
          if (request && options && shouldCollect) {
            CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(request);
            AutoCollectHttpDependencies2.trackRequest(_this._client, { options, request });
          }
        };
        http.request = function(options) {
          var requestArgs = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            requestArgs[_i - 1] = arguments[_i];
          }
          var request = originalRequest.call.apply(originalRequest, __spreadArrays([http, options], requestArgs));
          clientRequestPatch(request, options);
          return request;
        };
        https.request = function(options) {
          var requestArgs = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            requestArgs[_i - 1] = arguments[_i];
          }
          var request = originalHttpsRequest.call.apply(originalHttpsRequest, __spreadArrays([https, options], requestArgs));
          clientRequestPatch(request, options);
          return request;
        };
        http.get = function(options) {
          var _a;
          var requestArgs = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            requestArgs[_i - 1] = arguments[_i];
          }
          var request = (_a = http.request).call.apply(_a, __spreadArrays([http, options], requestArgs));
          request.end();
          return request;
        };
        https.get = function(options) {
          var _a;
          var requestArgs = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            requestArgs[_i - 1] = arguments[_i];
          }
          var request = (_a = https.request).call.apply(_a, __spreadArrays([https, options], requestArgs));
          request.end();
          return request;
        };
      };
      AutoCollectHttpDependencies2.trackRequest = function(client, telemetry) {
        if (!telemetry.options || !telemetry.request || !client) {
          Logging.info("AutoCollectHttpDependencies.trackRequest was called with invalid parameters: ", !telemetry.options, !telemetry.request, !client);
          return;
        }
        var requestParser = new HttpDependencyParser(telemetry.options, telemetry.request);
        var currentContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var uniqueRequestId;
        var uniqueTraceparent;
        if (currentContext && currentContext.operation && currentContext.operation.traceparent && Traceparent.isValidTraceId(currentContext.operation.traceparent.traceId)) {
          currentContext.operation.traceparent.updateSpanId();
          uniqueRequestId = currentContext.operation.traceparent.getBackCompatRequestId();
        } else if (CorrelationIdManager.w3cEnabled) {
          var traceparent = new Traceparent();
          uniqueTraceparent = traceparent.toString();
          uniqueRequestId = traceparent.getBackCompatRequestId();
        } else {
          uniqueRequestId = currentContext && currentContext.operation && currentContext.operation.parentId + AutoCollectHttpDependencies2.requestNumber++ + ".";
        }
        if (Util.canIncludeCorrelationHeader(client, requestParser.getUrl()) && telemetry.request.getHeader && telemetry.request.setHeader) {
          if (client.config && client.config.correlationId) {
            var correlationHeader = telemetry.request.getHeader(RequestResponseHeaders.requestContextHeader);
            try {
              Util.safeIncludeCorrelationHeader(client, telemetry.request, correlationHeader);
            } catch (err) {
              Logging.warn("Request-Context header could not be set. Correlation of requests may be lost", err);
            }
            if (currentContext && currentContext.operation) {
              try {
                telemetry.request.setHeader(RequestResponseHeaders.requestIdHeader, uniqueRequestId);
                if (!client.config.ignoreLegacyHeaders) {
                  telemetry.request.setHeader(RequestResponseHeaders.parentIdHeader, currentContext.operation.id);
                  telemetry.request.setHeader(RequestResponseHeaders.rootIdHeader, uniqueRequestId);
                }
                if (uniqueTraceparent || currentContext.operation.traceparent) {
                  telemetry.request.setHeader(RequestResponseHeaders.traceparentHeader, uniqueTraceparent || currentContext.operation.traceparent.toString());
                } else if (CorrelationIdManager.w3cEnabled) {
                  var traceparent = new Traceparent().toString();
                  telemetry.request.setHeader(RequestResponseHeaders.traceparentHeader, traceparent);
                }
                if (currentContext.operation.tracestate) {
                  var tracestate = currentContext.operation.tracestate.toString();
                  if (tracestate) {
                    telemetry.request.setHeader(RequestResponseHeaders.traceStateHeader, tracestate);
                  }
                }
                var correlationContextHeader = currentContext.customProperties.serializeToHeader();
                if (correlationContextHeader) {
                  telemetry.request.setHeader(RequestResponseHeaders.correlationContextHeader, correlationContextHeader);
                }
              } catch (err) {
                Logging.warn("Correlation headers could not be set. Correlation of requests may be lost.", err);
              }
            }
          }
        }
        if (telemetry.request.on) {
          telemetry.request.on("response", function(response) {
            requestParser.onResponse(response);
            var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
            dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
            dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
            dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
            dependencyTelemetry.contextObjects["http.ClientResponse"] = response;
            client.trackDependency(dependencyTelemetry);
          });
          telemetry.request.on("error", function(e) {
            requestParser.onError(e);
            var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
            dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
            dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
            dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
            dependencyTelemetry.contextObjects["Error"] = e;
            client.trackDependency(dependencyTelemetry);
          });
          telemetry.request.on("abort", function() {
            requestParser.onError(new Error());
            var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
            dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
            dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
            dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
            client.trackDependency(dependencyTelemetry);
          });
        }
      };
      AutoCollectHttpDependencies2.prototype.dispose = function() {
        AutoCollectHttpDependencies2.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
      };
      AutoCollectHttpDependencies2.disableCollectionRequestOption = "disableAppInsightsAutoCollection";
      AutoCollectHttpDependencies2.requestNumber = 1;
      AutoCollectHttpDependencies2.alreadyAutoCollectedFlag = "_appInsightsAutoCollected";
      return AutoCollectHttpDependencies2;
    }();
    module2.exports = AutoCollectHttpDependencies;
  }
});

// node_modules/applicationinsights/out/AutoCollection/HeartBeat.js
var require_HeartBeat = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/HeartBeat.js"(exports, module2) {
    "use strict";
    var os2 = require("os");
    var Constants = require_Constants2();
    var Util = require_Util();
    var Context = require_Context();
    var AutoCollectHttpDependencies = require_HttpDependencies();
    var AIMS_URI = "http://169.254.169.254/metadata/instance/compute";
    var AIMS_API_VERSION = "api-version=2017-12-01";
    var AIMS_FORMAT = "format=json";
    var ConnectionErrorMessage = "ENETUNREACH";
    var HeartBeat = function() {
      function HeartBeat2(client) {
        this._collectionInterval = 9e5;
        this._vmData = {};
        this._azInst_vmId = "";
        this._azInst_subscriptionId = "";
        this._azInst_osType = "";
        if (!HeartBeat2.INSTANCE) {
          HeartBeat2.INSTANCE = this;
        }
        this._isInitialized = false;
        this._client = client;
      }
      HeartBeat2.prototype.enable = function(isEnabled, config) {
        var _this = this;
        this._isEnabled = isEnabled;
        if (this._isEnabled && !this._isInitialized) {
          this._isInitialized = true;
        }
        if (isEnabled) {
          if (!this._handle) {
            this._handle = setInterval(function() {
              return _this.trackHeartBeat(config, function() {
              });
            }, this._collectionInterval);
            this._handle.unref();
          }
        } else {
          if (this._handle) {
            clearInterval(this._handle);
            this._handle = null;
          }
        }
      };
      HeartBeat2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      HeartBeat2.isEnabled = function() {
        return HeartBeat2.INSTANCE && HeartBeat2.INSTANCE._isEnabled;
      };
      HeartBeat2.prototype.trackHeartBeat = function(config, callback) {
        var _this = this;
        var waiting = false;
        var properties = {};
        var sdkVersion = Context.sdkVersion;
        properties["sdk"] = sdkVersion;
        properties["osType"] = os2.type();
        if (process.env.WEBSITE_SITE_NAME) {
          properties["appSrv_SiteName"] = process.env.WEBSITE_SITE_NAME || "";
          properties["appSrv_wsStamp"] = process.env.WEBSITE_HOME_STAMPNAME || "";
          properties["appSrv_wsHost"] = process.env.WEBSITE_HOSTNAME || "";
        } else if (process.env.FUNCTIONS_WORKER_RUNTIME) {
          properties["azfunction_appId"] = process.env.WEBSITE_HOSTNAME;
        } else if (config) {
          if (this._isVM === void 0) {
            waiting = true;
            this._getAzureComputeMetadata(config, function() {
              if (_this._isVM && Object.keys(_this._vmData).length > 0) {
                properties["azInst_vmId"] = _this._vmData["vmId"] || "";
                properties["azInst_subscriptionId"] = _this._vmData["subscriptionId"] || "";
                properties["azInst_osType"] = _this._vmData["osType"] || "";
                _this._azInst_vmId = _this._vmData["vmId"] || "";
                _this._azInst_subscriptionId = _this._vmData["subscriptionId"] || "";
                _this._azInst_osType = _this._vmData["osType"] || "";
              }
              _this._client.trackMetric({ name: Constants.HeartBeatMetricName, value: 0, properties });
              callback();
            });
          } else if (this._isVM) {
            properties["azInst_vmId"] = this._azInst_vmId;
            properties["azInst_subscriptionId"] = this._azInst_subscriptionId;
            properties["azInst_osType"] = this._azInst_osType;
          }
        }
        if (!waiting) {
          this._client.trackMetric({ name: Constants.HeartBeatMetricName, value: 0, properties });
          callback();
        }
      };
      HeartBeat2.prototype.dispose = function() {
        HeartBeat2.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
      };
      HeartBeat2.prototype._getAzureComputeMetadata = function(config, callback) {
        var _a;
        var _this = this;
        var metadataRequestUrl = AIMS_URI + "?" + AIMS_API_VERSION + "&" + AIMS_FORMAT;
        var requestOptions = (_a = {
          method: "GET"
        }, _a[AutoCollectHttpDependencies.disableCollectionRequestOption] = true, _a.headers = {
          "Metadata": "True"
        }, _a);
        var req = Util.makeRequest(config, metadataRequestUrl, requestOptions, function(res) {
          if (res.statusCode === 200) {
            _this._isVM = true;
            var virtualMachineData_1 = "";
            res.on("data", function(data) {
              virtualMachineData_1 += data;
            });
            res.on("end", function() {
              _this._vmData = _this._isJSON(virtualMachineData_1) ? JSON.parse(virtualMachineData_1) : {};
              callback();
            });
          } else {
            callback();
          }
        });
        if (req) {
          req.on("error", function(error) {
            if (error && error.message && error.message.indexOf(ConnectionErrorMessage) > -1) {
              _this._isVM = false;
            }
            callback();
          });
          req.end();
        }
      };
      HeartBeat2.prototype._isJSON = function(str) {
        try {
          return JSON.parse(str) && !!str;
        } catch (e) {
          return false;
        }
      };
      return HeartBeat2;
    }();
    module2.exports = HeartBeat;
  }
});

// node_modules/applicationinsights/out/AutoCollection/HttpRequests.js
var require_HttpRequests = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/HttpRequests.js"(exports, module2) {
    "use strict";
    var http = require("http");
    var https = require("https");
    var Logging = require_Logging();
    var Util = require_Util();
    var RequestResponseHeaders = require_RequestResponseHeaders();
    var HttpRequestParser = require_HttpRequestParser();
    var CorrelationContextManager_1 = require_CorrelationContextManager();
    var AutoCollectPerformance = require_Performance();
    var AutoCollectHttpRequests = function() {
      function AutoCollectHttpRequests2(client) {
        if (!!AutoCollectHttpRequests2.INSTANCE) {
          throw new Error("Server request tracking should be configured from the applicationInsights object");
        }
        AutoCollectHttpRequests2.INSTANCE = this;
        this._client = client;
      }
      AutoCollectHttpRequests2.prototype.enable = function(isEnabled) {
        this._isEnabled = isEnabled;
        if ((this._isAutoCorrelating || this._isEnabled || AutoCollectPerformance.isEnabled()) && !this._isInitialized) {
          this.useAutoCorrelation(this._isAutoCorrelating);
          this._initialize();
        }
      };
      AutoCollectHttpRequests2.prototype.useAutoCorrelation = function(isEnabled, forceClsHooked) {
        if (isEnabled && !this._isAutoCorrelating) {
          CorrelationContextManager_1.CorrelationContextManager.enable(forceClsHooked);
        } else if (!isEnabled && this._isAutoCorrelating) {
          CorrelationContextManager_1.CorrelationContextManager.disable();
        }
        this._isAutoCorrelating = isEnabled;
      };
      AutoCollectHttpRequests2.prototype.isInitialized = function() {
        return this._isInitialized;
      };
      AutoCollectHttpRequests2.prototype.isAutoCorrelating = function() {
        return this._isAutoCorrelating;
      };
      AutoCollectHttpRequests2.prototype._generateCorrelationContext = function(requestParser) {
        if (!this._isAutoCorrelating) {
          return;
        }
        return CorrelationContextManager_1.CorrelationContextManager.generateContextObject(requestParser.getOperationId(this._client.context.tags), requestParser.getRequestId(), requestParser.getOperationName(this._client.context.tags), requestParser.getCorrelationContextHeader(), requestParser.getTraceparent(), requestParser.getTracestate());
      };
      AutoCollectHttpRequests2.prototype._initialize = function() {
        var _this = this;
        this._isInitialized = true;
        var wrapOnRequestHandler = function(onRequest) {
          if (!onRequest) {
            return void 0;
          }
          if (typeof onRequest !== "function") {
            throw new Error("onRequest handler must be a function");
          }
          return function(request, response) {
            CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(request);
            CorrelationContextManager_1.CorrelationContextManager.wrapEmitter(response);
            var shouldCollect = request && !request[AutoCollectHttpRequests2.alreadyAutoCollectedFlag];
            if (request && shouldCollect) {
              var requestParser_1 = new HttpRequestParser(request);
              var correlationContext = _this._generateCorrelationContext(requestParser_1);
              CorrelationContextManager_1.CorrelationContextManager.runWithContext(correlationContext, function() {
                if (_this._isEnabled) {
                  request[AutoCollectHttpRequests2.alreadyAutoCollectedFlag] = true;
                  AutoCollectHttpRequests2.trackRequest(_this._client, { request, response }, requestParser_1);
                }
                if (typeof onRequest === "function") {
                  onRequest(request, response);
                }
              });
            } else {
              if (typeof onRequest === "function") {
                onRequest(request, response);
              }
            }
          };
        };
        var wrapServerEventHandler = function(server) {
          var originalAddListener = server.addListener.bind(server);
          server.addListener = function(eventType, eventHandler) {
            switch (eventType) {
              case "request":
              case "checkContinue":
                return originalAddListener(eventType, wrapOnRequestHandler(eventHandler));
              default:
                return originalAddListener(eventType, eventHandler);
            }
          };
          server.on = server.addListener;
        };
        var originalHttpServer = http.createServer;
        http.createServer = function(param1, param2) {
          if (param2 && typeof param2 === "function") {
            var server = originalHttpServer(param1, wrapOnRequestHandler(param2));
            wrapServerEventHandler(server);
            return server;
          } else {
            var server = originalHttpServer(wrapOnRequestHandler(param1));
            wrapServerEventHandler(server);
            return server;
          }
        };
        var originalHttpsServer = https.createServer;
        https.createServer = function(options, onRequest) {
          var server = originalHttpsServer(options, wrapOnRequestHandler(onRequest));
          wrapServerEventHandler(server);
          return server;
        };
      };
      AutoCollectHttpRequests2.trackRequestSync = function(client, telemetry) {
        if (!telemetry.request || !telemetry.response || !client) {
          Logging.info("AutoCollectHttpRequests.trackRequestSync was called with invalid parameters: ", !telemetry.request, !telemetry.response, !client);
          return;
        }
        AutoCollectHttpRequests2.addResponseCorrelationIdHeader(client, telemetry.response);
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var requestParser = new HttpRequestParser(telemetry.request, correlationContext && correlationContext.operation.parentId);
        if (correlationContext) {
          correlationContext.operation.id = requestParser.getOperationId(client.context.tags) || correlationContext.operation.id;
          correlationContext.operation.name = requestParser.getOperationName(client.context.tags) || correlationContext.operation.name;
          correlationContext.operation.parentId = requestParser.getRequestId() || correlationContext.operation.parentId;
          correlationContext.customProperties.addHeaderData(requestParser.getCorrelationContextHeader());
        }
        AutoCollectHttpRequests2.endRequest(client, requestParser, telemetry, telemetry.duration, telemetry.error);
      };
      AutoCollectHttpRequests2.trackRequest = function(client, telemetry, _requestParser) {
        if (!telemetry.request || !telemetry.response || !client) {
          Logging.info("AutoCollectHttpRequests.trackRequest was called with invalid parameters: ", !telemetry.request, !telemetry.response, !client);
          return;
        }
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var requestParser = _requestParser || new HttpRequestParser(telemetry.request, correlationContext && correlationContext.operation.parentId);
        if (Util.canIncludeCorrelationHeader(client, requestParser.getUrl())) {
          AutoCollectHttpRequests2.addResponseCorrelationIdHeader(client, telemetry.response);
        }
        if (correlationContext && !_requestParser) {
          correlationContext.operation.id = requestParser.getOperationId(client.context.tags) || correlationContext.operation.id;
          correlationContext.operation.name = requestParser.getOperationName(client.context.tags) || correlationContext.operation.name;
          correlationContext.operation.parentId = requestParser.getOperationParentId(client.context.tags) || correlationContext.operation.parentId;
          correlationContext.customProperties.addHeaderData(requestParser.getCorrelationContextHeader());
        }
        if (telemetry.response.once) {
          telemetry.response.once("finish", function() {
            AutoCollectHttpRequests2.endRequest(client, requestParser, telemetry, null, null);
          });
        }
        if (telemetry.request.on) {
          telemetry.request.on("error", function(error) {
            AutoCollectHttpRequests2.endRequest(client, requestParser, telemetry, null, error);
          });
        }
        if (telemetry.request.on) {
          telemetry.request.on("aborted", function() {
            var errorMessage = "The request has been aborted and the network socket has closed.";
            AutoCollectHttpRequests2.endRequest(client, requestParser, telemetry, null, errorMessage);
          });
        }
      };
      AutoCollectHttpRequests2.addResponseCorrelationIdHeader = function(client, response) {
        if (client.config && client.config.correlationId && response.getHeader && response.setHeader && !response.headersSent) {
          var correlationHeader = response.getHeader(RequestResponseHeaders.requestContextHeader);
          Util.safeIncludeCorrelationHeader(client, response, correlationHeader);
        }
      };
      AutoCollectHttpRequests2.endRequest = function(client, requestParser, telemetry, ellapsedMilliseconds, error) {
        if (error) {
          requestParser.onError(error, ellapsedMilliseconds);
        } else {
          requestParser.onResponse(telemetry.response, ellapsedMilliseconds);
        }
        var requestTelemetry = requestParser.getRequestTelemetry(telemetry);
        requestTelemetry.tagOverrides = requestParser.getRequestTags(client.context.tags);
        if (telemetry.tagOverrides) {
          for (var key in telemetry.tagOverrides) {
            requestTelemetry.tagOverrides[key] = telemetry.tagOverrides[key];
          }
        }
        var legacyRootId = requestParser.getLegacyRootId();
        if (legacyRootId) {
          requestTelemetry.properties["ai_legacyRootId"] = legacyRootId;
        }
        requestTelemetry.contextObjects = requestTelemetry.contextObjects || {};
        requestTelemetry.contextObjects["http.ServerRequest"] = telemetry.request;
        requestTelemetry.contextObjects["http.ServerResponse"] = telemetry.response;
        client.trackRequest(requestTelemetry);
      };
      AutoCollectHttpRequests2.prototype.dispose = function() {
        AutoCollectHttpRequests2.INSTANCE = null;
        this.enable(false);
        this._isInitialized = false;
        CorrelationContextManager_1.CorrelationContextManager.disable();
        this._isAutoCorrelating = false;
      };
      AutoCollectHttpRequests2.alreadyAutoCollectedFlag = "_appInsightsAutoCollected";
      return AutoCollectHttpRequests2;
    }();
    module2.exports = AutoCollectHttpRequests;
  }
});

// node_modules/applicationinsights/out/Library/QuickPulseEnvelopeFactory.js
var require_QuickPulseEnvelopeFactory = __commonJS({
  "node_modules/applicationinsights/out/Library/QuickPulseEnvelopeFactory.js"(exports, module2) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var os2 = require("os");
    var Contracts = require_Contracts();
    var Constants = require_Constants2();
    var Util = require_Util();
    var Logging = require_Logging();
    var StreamId = Util.w3cTraceId();
    var QuickPulseEnvelopeFactory = function() {
      function QuickPulseEnvelopeFactory2() {
      }
      QuickPulseEnvelopeFactory2.createQuickPulseEnvelope = function(metrics, documents, config, context) {
        var machineName = os2 && typeof os2.hostname === "function" && os2.hostname() || "Unknown";
        var instance = context.tags && context.keys && context.keys.cloudRoleInstance && context.tags[context.keys.cloudRoleInstance] || machineName;
        var roleName = context.tags && context.keys && context.keys.cloudRole && context.tags[context.keys.cloudRole] || null;
        var envelope = {
          Documents: documents.length > 0 ? documents : null,
          InstrumentationKey: config.instrumentationKey || "",
          Metrics: metrics.length > 0 ? metrics : null,
          InvariantVersion: 1,
          Timestamp: "/Date(" + Date.now() + ")/",
          Version: context.tags[context.keys.internalSdkVersion],
          StreamId,
          MachineName: machineName,
          Instance: instance,
          RoleName: roleName
        };
        return envelope;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseMetric = function(telemetry) {
        var data;
        data = {
          Name: telemetry.name,
          Value: telemetry.value,
          Weight: telemetry.count || 1
        };
        return data;
      };
      QuickPulseEnvelopeFactory2.telemetryEnvelopeToQuickPulseDocument = function(envelope) {
        switch (envelope.data.baseType) {
          case Contracts.TelemetryTypeString.Event:
            return QuickPulseEnvelopeFactory2.createQuickPulseEventDocument(envelope);
          case Contracts.TelemetryTypeString.Exception:
            return QuickPulseEnvelopeFactory2.createQuickPulseExceptionDocument(envelope);
          case Contracts.TelemetryTypeString.Trace:
            return QuickPulseEnvelopeFactory2.createQuickPulseTraceDocument(envelope);
          case Contracts.TelemetryTypeString.Dependency:
            return QuickPulseEnvelopeFactory2.createQuickPulseDependencyDocument(envelope);
          case Contracts.TelemetryTypeString.Request:
            return QuickPulseEnvelopeFactory2.createQuickPulseRequestDocument(envelope);
        }
        return null;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseEventDocument = function(envelope) {
        var document = QuickPulseEnvelopeFactory2.createQuickPulseDocument(envelope);
        var name = envelope.data.baseData.name;
        var eventDocument = __assign(__assign({}, document), { Name: name });
        return eventDocument;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseTraceDocument = function(envelope) {
        var document = QuickPulseEnvelopeFactory2.createQuickPulseDocument(envelope);
        var severityLevel = envelope.data.baseData.severityLevel || 0;
        var traceDocument = __assign(__assign({}, document), { Message: envelope.data.baseData.message, SeverityLevel: Contracts.SeverityLevel[severityLevel] });
        return traceDocument;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseExceptionDocument = function(envelope) {
        var document = QuickPulseEnvelopeFactory2.createQuickPulseDocument(envelope);
        var exceptionDetails = envelope.data.baseData.exceptions;
        var exception = "";
        var exceptionMessage = "";
        var exceptionType = "";
        if (exceptionDetails && exceptionDetails.length > 0) {
          if (exceptionDetails[0].parsedStack && exceptionDetails[0].parsedStack.length > 0) {
            exceptionDetails[0].parsedStack.forEach(function(err) {
              exception += err.assembly + "\n";
            });
          } else if (exceptionDetails[0].stack && exceptionDetails[0].stack.length > 0) {
            exception = exceptionDetails[0].stack;
          }
          exceptionMessage = exceptionDetails[0].message;
          exceptionType = exceptionDetails[0].typeName;
        }
        var exceptionDocument = __assign(__assign({}, document), { Exception: exception, ExceptionMessage: exceptionMessage, ExceptionType: exceptionType });
        return exceptionDocument;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseRequestDocument = function(envelope) {
        var document = QuickPulseEnvelopeFactory2.createQuickPulseDocument(envelope);
        var baseData = envelope.data.baseData;
        var requestDocument = __assign(__assign({}, document), {
          Name: baseData.name,
          Success: baseData.success,
          Duration: baseData.duration,
          ResponseCode: baseData.responseCode,
          OperationName: baseData.name
        });
        return requestDocument;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseDependencyDocument = function(envelope) {
        var document = QuickPulseEnvelopeFactory2.createQuickPulseDocument(envelope);
        var baseData = envelope.data.baseData;
        var dependencyDocument = __assign(__assign({}, document), { Name: baseData.name, Target: baseData.target, Success: baseData.success, Duration: baseData.duration, ResultCode: baseData.resultCode, CommandName: baseData.data, OperationName: document.OperationId, DependencyTypeName: baseData.type });
        return dependencyDocument;
      };
      QuickPulseEnvelopeFactory2.createQuickPulseDocument = function(envelope) {
        var documentType;
        var __type;
        var operationId, properties;
        if (envelope.data.baseType) {
          __type = Constants.TelemetryTypeStringToQuickPulseType[envelope.data.baseType];
          documentType = Constants.TelemetryTypeStringToQuickPulseDocumentType[envelope.data.baseType];
        } else {
          Logging.warn("Document type invalid; not sending live metric document", envelope.data.baseType);
        }
        operationId = envelope.tags[QuickPulseEnvelopeFactory2.keys.operationId];
        properties = QuickPulseEnvelopeFactory2.aggregateProperties(envelope);
        var document = {
          DocumentType: documentType,
          __type,
          OperationId: operationId,
          Version: "1.0",
          Properties: properties
        };
        return document;
      };
      QuickPulseEnvelopeFactory2.aggregateProperties = function(envelope) {
        var properties = [];
        var meas = envelope.data.baseData.measurements || {};
        for (var key in meas) {
          if (meas.hasOwnProperty(key)) {
            var value = meas[key];
            var property = { key, value };
            properties.push(property);
          }
        }
        var props = envelope.data.baseData.properties || {};
        for (var key in props) {
          if (props.hasOwnProperty(key)) {
            var value = props[key];
            var property = { key, value };
            properties.push(property);
          }
        }
        return properties;
      };
      QuickPulseEnvelopeFactory2.keys = new Contracts.ContextTagKeys();
      return QuickPulseEnvelopeFactory2;
    }();
    module2.exports = QuickPulseEnvelopeFactory;
  }
});

// node_modules/applicationinsights/out/Library/QuickPulseUtil.js
var require_QuickPulseUtil = __commonJS({
  "node_modules/applicationinsights/out/Library/QuickPulseUtil.js"(exports, module2) {
    "use strict";
    var getTransmissionTime = function() {
      return (Date.now() + 621355968e5) * 1e4;
    };
    module2.exports = { getTransmissionTime };
  }
});

// node_modules/applicationinsights/out/Library/QuickPulseSender.js
var require_QuickPulseSender = __commonJS({
  "node_modules/applicationinsights/out/Library/QuickPulseSender.js"(exports, module2) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var https = require("https");
    var AutoCollectHttpDependencies = require_HttpDependencies();
    var Logging = require_Logging();
    var QuickPulseUtil = require_QuickPulseUtil();
    var Util = require_Util();
    var QuickPulseConfig = {
      method: "POST",
      time: "x-ms-qps-transmission-time",
      pollingIntervalHint: "x-ms-qps-service-polling-interval-hint",
      endpointRedirect: "x-ms-qps-service-endpoint-redirect",
      instanceName: "x-ms-qps-instance-name",
      streamId: "x-ms-qps-stream-id",
      machineName: "x-ms-qps-machine-name",
      roleName: "x-ms-qps-role-name",
      streamid: "x-ms-qps-stream-id",
      invariantVersion: "x-ms-qps-invariant-version",
      subscribed: "x-ms-qps-subscribed"
    };
    var QuickPulseSender = function() {
      function QuickPulseSender2(config) {
        this._config = config;
        this._consecutiveErrors = 0;
      }
      QuickPulseSender2.prototype.ping = function(envelope, redirectedHostEndpoint, done) {
        var pingHeaders = [
          { name: QuickPulseConfig.streamId, value: envelope.StreamId },
          { name: QuickPulseConfig.machineName, value: envelope.MachineName },
          { name: QuickPulseConfig.roleName, value: envelope.RoleName },
          { name: QuickPulseConfig.instanceName, value: envelope.Instance },
          { name: QuickPulseConfig.invariantVersion, value: envelope.InvariantVersion.toString() }
        ];
        this._submitData(envelope, redirectedHostEndpoint, done, "ping", pingHeaders);
      };
      QuickPulseSender2.prototype.post = function(envelope, redirectedHostEndpoint, done) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this._submitData([envelope], redirectedHostEndpoint, done, "post")];
              case 1:
                _a.sent();
                return [2];
            }
          });
        });
      };
      QuickPulseSender2.prototype._submitData = function(envelope, redirectedHostEndpoint, done, postOrPing, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function() {
          var payload, options, req;
          var _a, _b;
          var _this = this;
          return __generator(this, function(_c) {
            payload = JSON.stringify(envelope);
            options = (_a = {}, _a[AutoCollectHttpDependencies.disableCollectionRequestOption] = true, _a.host = redirectedHostEndpoint && redirectedHostEndpoint.length > 0 ? redirectedHostEndpoint : this._config.quickPulseHost, _a.method = QuickPulseConfig.method, _a.path = "/QuickPulseService.svc/" + postOrPing + "?ikey=" + this._config.instrumentationKey, _a.headers = (_b = {
              "Expect": "100-continue"
            }, _b[QuickPulseConfig.time] = QuickPulseUtil.getTransmissionTime(), _b["Content-Type"] = "application/json", _b["Content-Length"] = Buffer.byteLength(payload), _b), _a);
            if (additionalHeaders && additionalHeaders.length > 0) {
              additionalHeaders.forEach(function(header) {
                return options.headers[header.name] = header.value;
              });
            }
            if (this._config.httpsAgent) {
              options.agent = this._config.httpsAgent;
            } else {
              options.agent = Util.tlsRestrictedAgent;
            }
            req = https.request(options, function(res) {
              if (res.statusCode == 200) {
                var shouldPOSTData = res.headers[QuickPulseConfig.subscribed] === "true";
                var redirectHeader = res.headers[QuickPulseConfig.endpointRedirect] ? res.headers[QuickPulseConfig.endpointRedirect].toString() : null;
                var pollingIntervalHint = res.headers[QuickPulseConfig.pollingIntervalHint] ? parseInt(res.headers[QuickPulseConfig.pollingIntervalHint].toString()) : null;
                _this._consecutiveErrors = 0;
                done(shouldPOSTData, res, redirectHeader, pollingIntervalHint);
              } else {
                _this._onError("StatusCode:" + res.statusCode + " StatusMessage:" + res.statusMessage);
                done();
              }
            });
            req.on("error", function(error) {
              _this._onError(error);
              done();
            });
            req.write(payload);
            req.end();
            return [2];
          });
        });
      };
      QuickPulseSender2.prototype._onError = function(error) {
        this._consecutiveErrors++;
        var notice = "Transient error connecting to the Live Metrics endpoint. This packet will not appear in your Live Metrics Stream. Error:";
        if (this._consecutiveErrors % QuickPulseSender2.MAX_QPS_FAILURES_BEFORE_WARN === 0) {
          notice = "Live Metrics endpoint could not be reached " + this._consecutiveErrors + " consecutive times. Most recent error:";
          Logging.warn(QuickPulseSender2.TAG, notice, error);
        } else {
          Logging.info(QuickPulseSender2.TAG, notice, error);
        }
      };
      QuickPulseSender2.TAG = "QuickPulseSender";
      QuickPulseSender2.MAX_QPS_FAILURES_BEFORE_WARN = 25;
      return QuickPulseSender2;
    }();
    module2.exports = QuickPulseSender;
  }
});

// node_modules/applicationinsights/out/Library/QuickPulseStateManager.js
var require_QuickPulseStateManager = __commonJS({
  "node_modules/applicationinsights/out/Library/QuickPulseStateManager.js"(exports, module2) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var Logging = require_Logging();
    var QuickPulseEnvelopeFactory = require_QuickPulseEnvelopeFactory();
    var QuickPulseSender = require_QuickPulseSender();
    var Constants = require_Constants2();
    var Context = require_Context();
    var QuickPulseStateManager = function() {
      function QuickPulseStateManager2(config, context) {
        this._isCollectingData = false;
        this._lastSuccessTime = Date.now();
        this._lastSendSucceeded = true;
        this._metrics = {};
        this._documents = [];
        this._collectors = [];
        this._redirectedHost = null;
        this._pollingIntervalHint = -1;
        this.config = config;
        this.context = context || new Context();
        this._sender = new QuickPulseSender(this.config);
        this._isEnabled = false;
      }
      QuickPulseStateManager2.prototype.addCollector = function(collector) {
        this._collectors.push(collector);
      };
      QuickPulseStateManager2.prototype.trackMetric = function(telemetry) {
        this._addMetric(telemetry);
      };
      QuickPulseStateManager2.prototype.addDocument = function(envelope) {
        var document = QuickPulseEnvelopeFactory.telemetryEnvelopeToQuickPulseDocument(envelope);
        if (document) {
          this._documents.push(document);
        }
      };
      QuickPulseStateManager2.prototype.enable = function(isEnabled) {
        if (isEnabled && !this._isEnabled) {
          this._isEnabled = true;
          this._goQuickPulse();
        } else if (!isEnabled && this._isEnabled) {
          this._isEnabled = false;
          clearTimeout(this._handle);
          this._handle = void 0;
        }
      };
      QuickPulseStateManager2.prototype.enableCollectors = function(enable) {
        this._collectors.forEach(function(collector) {
          collector.enable(enable);
        });
      };
      QuickPulseStateManager2.prototype._addMetric = function(telemetry) {
        var value = telemetry.value;
        var count = telemetry.count || 1;
        var name = Constants.PerformanceToQuickPulseCounter[telemetry.name];
        if (name) {
          if (this._metrics[name]) {
            this._metrics[name].Value = (this._metrics[name].Value * this._metrics[name].Weight + value * count) / (this._metrics[name].Weight + count);
            this._metrics[name].Weight += count;
          } else {
            this._metrics[name] = QuickPulseEnvelopeFactory.createQuickPulseMetric(telemetry);
            this._metrics[name].Name = name;
            this._metrics[name].Weight = 1;
          }
        }
      };
      QuickPulseStateManager2.prototype._resetQuickPulseBuffer = function() {
        delete this._metrics;
        this._metrics = {};
        this._documents.length = 0;
      };
      QuickPulseStateManager2.prototype._goQuickPulse = function() {
        return __awaiter(this, void 0, void 0, function() {
          var metrics, envelope, pingInterval, currentTimeout;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                metrics = Object.keys(this._metrics).map(function(k) {
                  return _this._metrics[k];
                });
                envelope = QuickPulseEnvelopeFactory.createQuickPulseEnvelope(metrics, this._documents.slice(), this.config, this.context);
                this._resetQuickPulseBuffer();
                if (!this._isCollectingData)
                  return [3, 2];
                return [4, this._post(envelope)];
              case 1:
                _a.sent();
                return [3, 3];
              case 2:
                this._ping(envelope);
                _a.label = 3;
              case 3:
                pingInterval = this._pollingIntervalHint > 0 ? this._pollingIntervalHint : QuickPulseStateManager2.PING_INTERVAL;
                currentTimeout = this._isCollectingData ? QuickPulseStateManager2.POST_INTERVAL : pingInterval;
                if (this._isCollectingData && Date.now() - this._lastSuccessTime >= QuickPulseStateManager2.MAX_POST_WAIT_TIME && !this._lastSendSucceeded) {
                  this._isCollectingData = false;
                  currentTimeout = QuickPulseStateManager2.FALLBACK_INTERVAL;
                } else if (!this._isCollectingData && Date.now() - this._lastSuccessTime >= QuickPulseStateManager2.MAX_PING_WAIT_TIME && !this._lastSendSucceeded) {
                  currentTimeout = QuickPulseStateManager2.FALLBACK_INTERVAL;
                }
                this._lastSendSucceeded = null;
                this._handle = setTimeout(this._goQuickPulse.bind(this), currentTimeout);
                this._handle.unref();
                return [2];
            }
          });
        });
      };
      QuickPulseStateManager2.prototype._ping = function(envelope) {
        this._sender.ping(envelope, this._redirectedHost, this._quickPulseDone.bind(this));
      };
      QuickPulseStateManager2.prototype._post = function(envelope) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this._sender.post(envelope, this._redirectedHost, this._quickPulseDone.bind(this))];
              case 1:
                _a.sent();
                return [2];
            }
          });
        });
      };
      QuickPulseStateManager2.prototype._quickPulseDone = function(shouldPOST, res, redirectedHost, pollingIntervalHint) {
        if (shouldPOST != void 0) {
          if (this._isCollectingData !== shouldPOST) {
            Logging.info("Live Metrics sending data", shouldPOST);
            this.enableCollectors(shouldPOST);
          }
          this._isCollectingData = shouldPOST;
          if (redirectedHost && redirectedHost.length > 0) {
            this._redirectedHost = redirectedHost;
            Logging.info("Redirecting endpoint to: ", redirectedHost);
          }
          if (pollingIntervalHint && pollingIntervalHint > 0) {
            this._pollingIntervalHint = pollingIntervalHint;
          }
          if (res && res.statusCode < 300 && res.statusCode >= 200) {
            this._lastSuccessTime = Date.now();
            this._lastSendSucceeded = true;
          } else {
            this._lastSendSucceeded = false;
          }
        } else {
          this._lastSendSucceeded = false;
        }
      };
      QuickPulseStateManager2.MAX_POST_WAIT_TIME = 2e4;
      QuickPulseStateManager2.MAX_PING_WAIT_TIME = 6e4;
      QuickPulseStateManager2.FALLBACK_INTERVAL = 6e4;
      QuickPulseStateManager2.PING_INTERVAL = 5e3;
      QuickPulseStateManager2.POST_INTERVAL = 1e3;
      return QuickPulseStateManager2;
    }();
    module2.exports = QuickPulseStateManager;
  }
});

// node_modules/applicationinsights/out/Library/ConnectionStringParser.js
var require_ConnectionStringParser = __commonJS({
  "node_modules/applicationinsights/out/Library/ConnectionStringParser.js"(exports, module2) {
    "use strict";
    var Constants = require_Constants2();
    var ConnectionStringParser = function() {
      function ConnectionStringParser2() {
      }
      ConnectionStringParser2.parse = function(connectionString) {
        if (!connectionString) {
          return {};
        }
        var kvPairs = connectionString.split(ConnectionStringParser2._FIELDS_SEPARATOR);
        var result = kvPairs.reduce(function(fields, kv) {
          var kvParts = kv.split(ConnectionStringParser2._FIELD_KEY_VALUE_SEPARATOR);
          if (kvParts.length === 2) {
            var key = kvParts[0].toLowerCase();
            var value = kvParts[1];
            fields[key] = value;
          }
          return fields;
        }, {});
        if (Object.keys(result).length > 0) {
          if (result.endpointsuffix) {
            var locationPrefix = result.location ? result.location + "." : "";
            result.ingestionendpoint = result.ingestionendpoint || "https://" + locationPrefix + "dc." + result.endpointsuffix;
            result.liveendpoint = result.liveendpoint || "https://" + locationPrefix + "live." + result.endpointsuffix;
          }
          result.ingestionendpoint = result.ingestionendpoint || Constants.DEFAULT_BREEZE_ENDPOINT;
          result.liveendpoint = result.liveendpoint || Constants.DEFAULT_LIVEMETRICS_ENDPOINT;
        }
        return result;
      };
      ConnectionStringParser2._FIELDS_SEPARATOR = ";";
      ConnectionStringParser2._FIELD_KEY_VALUE_SEPARATOR = "=";
      return ConnectionStringParser2;
    }();
    module2.exports = ConnectionStringParser;
  }
});

// node_modules/applicationinsights/out/Library/Config.js
var require_Config = __commonJS({
  "node_modules/applicationinsights/out/Library/Config.js"(exports, module2) {
    "use strict";
    var CorrelationIdManager = require_CorrelationIdManager();
    var ConnectionStringParser = require_ConnectionStringParser();
    var Logging = require_Logging();
    var Constants = require_Constants2();
    var url = require("url");
    var Config = function() {
      function Config2(setupString) {
        var _this = this;
        this.endpointBase = Constants.DEFAULT_BREEZE_ENDPOINT;
        var connectionStringEnv = process.env[Config2.ENV_connectionString];
        var csCode = ConnectionStringParser.parse(setupString);
        var csEnv = ConnectionStringParser.parse(connectionStringEnv);
        var iKeyCode = !csCode.instrumentationkey && Object.keys(csCode).length > 0 ? null : setupString;
        this.instrumentationKey = csCode.instrumentationkey || iKeyCode || csEnv.instrumentationkey || Config2._getInstrumentationKey();
        if (!Config2._validateInstrumentationKey(this.instrumentationKey)) {
          Logging.warn("An invalid instrumentation key was provided. There may be resulting telemetry loss", this.instrumentationKey);
        }
        this.endpointUrl = (csCode.ingestionendpoint || csEnv.ingestionendpoint || this.endpointBase) + "/v2.1/track";
        this.maxBatchSize = 250;
        this.maxBatchIntervalMs = 15e3;
        this.disableAppInsights = false;
        this.samplingPercentage = 100;
        this.correlationIdRetryIntervalMs = 30 * 1e3;
        this.correlationHeaderExcludedDomains = [
          "*.core.windows.net",
          "*.core.chinacloudapi.cn",
          "*.core.cloudapi.de",
          "*.core.usgovcloudapi.net",
          "*.core.microsoft.scloud",
          "*.core.eaglex.ic.gov"
        ];
        this.setCorrelationId = function(correlationId) {
          return _this.correlationId = correlationId;
        };
        this.proxyHttpUrl = process.env[Config2.ENV_http_proxy] || void 0;
        this.proxyHttpsUrl = process.env[Config2.ENV_https_proxy] || void 0;
        this.httpAgent = void 0;
        this.httpsAgent = void 0;
        this.profileQueryEndpoint = csCode.ingestionendpoint || csEnv.ingestionendpoint || process.env[Config2.ENV_profileQueryEndpoint] || this.endpointBase;
        this._quickPulseHost = csCode.liveendpoint || csEnv.liveendpoint || process.env[Config2.ENV_quickPulseHost] || Constants.DEFAULT_LIVEMETRICS_HOST;
        if (this._quickPulseHost.match(/^https?:\/\//)) {
          this._quickPulseHost = url.parse(this._quickPulseHost).host;
        }
      }
      Object.defineProperty(Config2.prototype, "profileQueryEndpoint", {
        get: function() {
          return this._profileQueryEndpoint;
        },
        set: function(endpoint) {
          CorrelationIdManager.cancelCorrelationIdQuery(this, this.setCorrelationId);
          this._profileQueryEndpoint = endpoint;
          this.correlationId = CorrelationIdManager.correlationIdPrefix;
          CorrelationIdManager.queryCorrelationId(this, this.setCorrelationId);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Config2.prototype, "quickPulseHost", {
        get: function() {
          return this._quickPulseHost;
        },
        set: function(host) {
          this._quickPulseHost = host;
        },
        enumerable: false,
        configurable: true
      });
      Config2._getInstrumentationKey = function() {
        var iKey = process.env[Config2.ENV_iKey] || process.env[Config2.ENV_azurePrefix + Config2.ENV_iKey] || process.env[Config2.legacy_ENV_iKey] || process.env[Config2.ENV_azurePrefix + Config2.legacy_ENV_iKey];
        if (!iKey || iKey == "") {
          throw new Error("Instrumentation key not found, pass the key in the config to this method or set the key in the environment variable APPINSIGHTS_INSTRUMENTATIONKEY before starting the server");
        }
        return iKey;
      };
      Config2._validateInstrumentationKey = function(iKey) {
        var UUID_Regex = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
        var regexp = new RegExp(UUID_Regex);
        return regexp.test(iKey);
      };
      Config2.ENV_azurePrefix = "APPSETTING_";
      Config2.ENV_iKey = "APPINSIGHTS_INSTRUMENTATIONKEY";
      Config2.legacy_ENV_iKey = "APPINSIGHTS_INSTRUMENTATION_KEY";
      Config2.ENV_profileQueryEndpoint = "APPINSIGHTS_PROFILE_QUERY_ENDPOINT";
      Config2.ENV_quickPulseHost = "APPINSIGHTS_QUICKPULSE_HOST";
      Config2.ENV_connectionString = "APPLICATIONINSIGHTS_CONNECTION_STRING";
      Config2.ENV_nativeMetricsDisablers = "APPLICATION_INSIGHTS_DISABLE_EXTENDED_METRIC";
      Config2.ENV_nativeMetricsDisableAll = "APPLICATION_INSIGHTS_DISABLE_ALL_EXTENDED_METRICS";
      Config2.ENV_http_proxy = "http_proxy";
      Config2.ENV_https_proxy = "https_proxy";
      return Config2;
    }();
    module2.exports = Config;
  }
});

// node_modules/applicationinsights/out/AutoCollection/NativePerformance.js
var require_NativePerformance = __commonJS({
  "node_modules/applicationinsights/out/AutoCollection/NativePerformance.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AutoCollectNativePerformance = void 0;
    var Config = require_Config();
    var Context = require_Context();
    var Logging = require_Logging();
    var AutoCollectNativePerformance = function() {
      function AutoCollectNativePerformance2(client) {
        this._disabledMetrics = {};
        if (AutoCollectNativePerformance2.INSTANCE) {
          AutoCollectNativePerformance2.INSTANCE.dispose();
        }
        AutoCollectNativePerformance2.INSTANCE = this;
        this._client = client;
      }
      AutoCollectNativePerformance2.isNodeVersionCompatible = function() {
        var nodeVer = process.versions.node.split(".");
        return parseInt(nodeVer[0]) >= 6;
      };
      AutoCollectNativePerformance2.prototype.enable = function(isEnabled, disabledMetrics, collectionInterval) {
        var _this = this;
        if (disabledMetrics === void 0) {
          disabledMetrics = {};
        }
        if (collectionInterval === void 0) {
          collectionInterval = 6e4;
        }
        if (!AutoCollectNativePerformance2.isNodeVersionCompatible()) {
          return;
        }
        if (AutoCollectNativePerformance2._metricsAvailable == void 0 && isEnabled && !this._isInitialized) {
          try {
            var NativeMetricsEmitters = require("applicationinsights-native-metrics");
            AutoCollectNativePerformance2._emitter = new NativeMetricsEmitters();
            AutoCollectNativePerformance2._metricsAvailable = true;
            Logging.info("Native metrics module successfully loaded!");
          } catch (err) {
            AutoCollectNativePerformance2._metricsAvailable = false;
            return;
          }
        }
        this._isEnabled = isEnabled;
        this._disabledMetrics = disabledMetrics;
        if (this._isEnabled && !this._isInitialized) {
          this._isInitialized = true;
        }
        if (this._isEnabled && AutoCollectNativePerformance2._emitter) {
          AutoCollectNativePerformance2._emitter.enable(true, collectionInterval);
          if (!this._handle) {
            this._handle = setInterval(function() {
              return _this._trackNativeMetrics();
            }, collectionInterval);
            this._handle.unref();
          }
        } else if (AutoCollectNativePerformance2._emitter) {
          AutoCollectNativePerformance2._emitter.enable(false);
          if (this._handle) {
            clearInterval(this._handle);
            this._handle = void 0;
          }
        }
      };
      AutoCollectNativePerformance2.prototype.dispose = function() {
        this.enable(false);
      };
      AutoCollectNativePerformance2.parseEnabled = function(collectExtendedMetrics) {
        var disableAll = process.env[Config.ENV_nativeMetricsDisableAll];
        var individualOptOuts = process.env[Config.ENV_nativeMetricsDisablers];
        if (disableAll) {
          return { isEnabled: false, disabledMetrics: {} };
        }
        if (individualOptOuts) {
          var optOutsArr = individualOptOuts.split(",");
          var disabledMetrics = {};
          if (optOutsArr.length > 0) {
            for (var _i = 0, optOutsArr_1 = optOutsArr; _i < optOutsArr_1.length; _i++) {
              var opt = optOutsArr_1[_i];
              disabledMetrics[opt] = true;
            }
          }
          if (typeof collectExtendedMetrics === "object") {
            return { isEnabled: true, disabledMetrics: __assign(__assign({}, collectExtendedMetrics), disabledMetrics) };
          }
          return { isEnabled: collectExtendedMetrics, disabledMetrics };
        }
        if (typeof collectExtendedMetrics === "boolean") {
          return { isEnabled: collectExtendedMetrics, disabledMetrics: {} };
        } else {
          return { isEnabled: true, disabledMetrics: collectExtendedMetrics };
        }
      };
      AutoCollectNativePerformance2.prototype._trackNativeMetrics = function() {
        var shouldSendAll = true;
        if (typeof this._isEnabled !== "object") {
          shouldSendAll = this._isEnabled;
        }
        if (shouldSendAll) {
          this._trackGarbageCollection();
          this._trackEventLoop();
          this._trackHeapUsage();
        }
      };
      AutoCollectNativePerformance2.prototype._trackGarbageCollection = function() {
        var _a;
        if (this._disabledMetrics.gc) {
          return;
        }
        var gcData = AutoCollectNativePerformance2._emitter.getGCData();
        for (var gc in gcData) {
          var metrics = gcData[gc].metrics;
          var name_1 = gc + " Garbage Collection Duration";
          var stdDev = Math.sqrt(metrics.sumSquares / metrics.count - Math.pow(metrics.total / metrics.count, 2)) || 0;
          this._client.trackMetric({
            name: name_1,
            value: metrics.total,
            count: metrics.count,
            max: metrics.max,
            min: metrics.min,
            stdDev,
            tagOverrides: (_a = {}, _a[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion, _a)
          });
        }
      };
      AutoCollectNativePerformance2.prototype._trackEventLoop = function() {
        var _a;
        if (this._disabledMetrics.loop) {
          return;
        }
        var loopData = AutoCollectNativePerformance2._emitter.getLoopData();
        var metrics = loopData.loopUsage;
        if (metrics.count == 0) {
          return;
        }
        var name = "Event Loop CPU Time";
        var stdDev = Math.sqrt(metrics.sumSquares / metrics.count - Math.pow(metrics.total / metrics.count, 2)) || 0;
        this._client.trackMetric({
          name,
          value: metrics.total,
          count: metrics.count,
          min: metrics.min,
          max: metrics.max,
          stdDev,
          tagOverrides: (_a = {}, _a[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion, _a)
        });
      };
      AutoCollectNativePerformance2.prototype._trackHeapUsage = function() {
        var _a, _b, _c;
        if (this._disabledMetrics.heap) {
          return;
        }
        var memoryUsage = process.memoryUsage();
        var heapUsed = memoryUsage.heapUsed, heapTotal = memoryUsage.heapTotal, rss = memoryUsage.rss;
        this._client.trackMetric({
          name: "Memory Usage (Heap)",
          value: heapUsed,
          count: 1,
          tagOverrides: (_a = {}, _a[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion, _a)
        });
        this._client.trackMetric({
          name: "Memory Total (Heap)",
          value: heapTotal,
          count: 1,
          tagOverrides: (_b = {}, _b[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion, _b)
        });
        this._client.trackMetric({
          name: "Memory Usage (Non-Heap)",
          value: rss - heapTotal,
          count: 1,
          tagOverrides: (_c = {}, _c[this._client.context.keys.internalSdkVersion] = "node-nativeperf:" + Context.sdkVersion, _c)
        });
      };
      return AutoCollectNativePerformance2;
    }();
    exports.AutoCollectNativePerformance = AutoCollectNativePerformance;
  }
});

// node_modules/applicationinsights/out/Library/Channel.js
var require_Channel = __commonJS({
  "node_modules/applicationinsights/out/Library/Channel.js"(exports, module2) {
    "use strict";
    var Logging = require_Logging();
    var Channel = function() {
      function Channel2(isDisabled, getBatchSize, getBatchIntervalMs, sender) {
        this._buffer = [];
        this._lastSend = 0;
        this._isDisabled = isDisabled;
        this._getBatchSize = getBatchSize;
        this._getBatchIntervalMs = getBatchIntervalMs;
        this._sender = sender;
      }
      Channel2.prototype.setUseDiskRetryCaching = function(value, resendInterval, maxBytesOnDisk) {
        this._sender.setDiskRetryMode(value, resendInterval, maxBytesOnDisk);
      };
      Channel2.prototype.send = function(envelope) {
        var _this = this;
        if (this._isDisabled()) {
          return;
        }
        if (!envelope) {
          Logging.warn("Cannot send null/undefined telemetry");
          return;
        }
        this._buffer.push(envelope);
        if (this._buffer.length >= this._getBatchSize()) {
          this.triggerSend(false);
          return;
        }
        if (!this._timeoutHandle && this._buffer.length > 0) {
          this._timeoutHandle = setTimeout(function() {
            _this._timeoutHandle = null;
            _this.triggerSend(false);
          }, this._getBatchIntervalMs());
        }
      };
      Channel2.prototype.triggerSend = function(isNodeCrashing, callback) {
        var bufferIsEmpty = this._buffer.length < 1;
        if (!bufferIsEmpty) {
          if (isNodeCrashing) {
            this._sender.saveOnCrash(this._buffer);
            if (typeof callback === "function") {
              callback("data saved on crash");
            }
          } else {
            this._sender.send(this._buffer, callback);
          }
        }
        this._lastSend = +new Date();
        this._buffer = [];
        clearTimeout(this._timeoutHandle);
        this._timeoutHandle = null;
        if (bufferIsEmpty && typeof callback === "function") {
          callback("no data to send");
        }
      };
      return Channel2;
    }();
    module2.exports = Channel;
  }
});

// node_modules/applicationinsights/out/TelemetryProcessors/AzureRoleEnvironmentTelemetryInitializer.js
var require_AzureRoleEnvironmentTelemetryInitializer = __commonJS({
  "node_modules/applicationinsights/out/TelemetryProcessors/AzureRoleEnvironmentTelemetryInitializer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.azureRoleEnvironmentTelemetryProcessor = void 0;
    function azureRoleEnvironmentTelemetryProcessor(envelope, context) {
      if (process.env.WEBSITE_SITE_NAME) {
        envelope.tags[context.keys.cloudRole] = process.env.WEBSITE_SITE_NAME;
      }
    }
    exports.azureRoleEnvironmentTelemetryProcessor = azureRoleEnvironmentTelemetryProcessor;
  }
});

// node_modules/applicationinsights/out/TelemetryProcessors/SamplingTelemetryProcessor.js
var require_SamplingTelemetryProcessor = __commonJS({
  "node_modules/applicationinsights/out/TelemetryProcessors/SamplingTelemetryProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSamplingHashCode = exports.samplingTelemetryProcessor = void 0;
    var Contracts = require_Contracts();
    function samplingTelemetryProcessor(envelope, contextObjects) {
      var samplingPercentage = envelope.sampleRate;
      var isSampledIn = false;
      if (samplingPercentage === null || samplingPercentage === void 0 || samplingPercentage >= 100) {
        return true;
      } else if (envelope.data && Contracts.TelemetryType.Metric === Contracts.baseTypeToTelemetryType(envelope.data.baseType)) {
        return true;
      } else if (contextObjects.correlationContext && contextObjects.correlationContext.operation) {
        isSampledIn = getSamplingHashCode(contextObjects.correlationContext.operation.id) < samplingPercentage;
      } else {
        isSampledIn = Math.random() * 100 < samplingPercentage;
      }
      return isSampledIn;
    }
    exports.samplingTelemetryProcessor = samplingTelemetryProcessor;
    function getSamplingHashCode(input) {
      var csharpMin = -2147483648;
      var csharpMax = 2147483647;
      var hash = 5381;
      if (!input) {
        return 0;
      }
      while (input.length < 8) {
        input = input + input;
      }
      for (var i = 0; i < input.length; i++) {
        hash = ((hash << 5) + hash | 0) + input.charCodeAt(i) | 0;
      }
      hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
      return hash / csharpMax * 100;
    }
    exports.getSamplingHashCode = getSamplingHashCode;
  }
});

// node_modules/applicationinsights/out/TelemetryProcessors/PerformanceMetricsTelemetryProcessor.js
var require_PerformanceMetricsTelemetryProcessor = __commonJS({
  "node_modules/applicationinsights/out/TelemetryProcessors/PerformanceMetricsTelemetryProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.performanceMetricsTelemetryProcessor = void 0;
    var AutoCollectPerformance = require_Performance();
    var TelemetryType = require_Contracts();
    function performanceMetricsTelemetryProcessor(envelope, client) {
      if (client) {
        client.addDocument(envelope);
      }
      switch (envelope.data.baseType) {
        case TelemetryType.TelemetryTypeString.Exception:
          AutoCollectPerformance.countException();
          break;
        case TelemetryType.TelemetryTypeString.Request:
          var requestData = envelope.data.baseData;
          AutoCollectPerformance.countRequest(requestData.duration, requestData.success);
          break;
        case TelemetryType.TelemetryTypeString.Dependency:
          var remoteDependencyData = envelope.data.baseData;
          AutoCollectPerformance.countDependency(remoteDependencyData.duration, remoteDependencyData.success);
          break;
      }
      return true;
    }
    exports.performanceMetricsTelemetryProcessor = performanceMetricsTelemetryProcessor;
  }
});

// node_modules/applicationinsights/out/TelemetryProcessors/PreAggregatedMetricsTelemetryProcessor.js
var require_PreAggregatedMetricsTelemetryProcessor = __commonJS({
  "node_modules/applicationinsights/out/TelemetryProcessors/PreAggregatedMetricsTelemetryProcessor.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.preAggregatedMetricsTelemetryProcessor = void 0;
    var Contracts = require_Contracts();
    var AutoCollecPreAggregatedMetrics = require_PreAggregatedMetrics();
    var TelemetryType = require_Contracts();
    function preAggregatedMetricsTelemetryProcessor(envelope, context) {
      if (AutoCollecPreAggregatedMetrics.isEnabled()) {
        switch (envelope.data.baseType) {
          case TelemetryType.TelemetryTypeString.Exception:
            var exceptionData = envelope.data.baseData;
            exceptionData.properties = __assign(__assign({}, exceptionData.properties), { "_MS.ProcessedByMetricExtractors": "(Name:'Exceptions', Ver:'1.1')" });
            var exceptionDimensions = {
              cloudRoleInstance: envelope.tags[context.keys.cloudRoleInstance],
              cloudRoleName: envelope.tags[context.keys.cloudRole]
            };
            AutoCollecPreAggregatedMetrics.countException(exceptionDimensions);
            break;
          case TelemetryType.TelemetryTypeString.Trace:
            var traceData = envelope.data.baseData;
            traceData.properties = __assign(__assign({}, traceData.properties), { "_MS.ProcessedByMetricExtractors": "(Name:'Traces', Ver:'1.1')" });
            var traceDimensions = {
              cloudRoleInstance: envelope.tags[context.keys.cloudRoleInstance],
              cloudRoleName: envelope.tags[context.keys.cloudRole],
              traceSeverityLevel: Contracts.SeverityLevel[traceData.severity]
            };
            AutoCollecPreAggregatedMetrics.countTrace(traceDimensions);
            break;
          case TelemetryType.TelemetryTypeString.Request:
            var requestData = envelope.data.baseData;
            requestData.properties = __assign(__assign({}, requestData.properties), { "_MS.ProcessedByMetricExtractors": "(Name:'Requests', Ver:'1.1')" });
            var requestDimensions = {
              cloudRoleInstance: envelope.tags[context.keys.cloudRoleInstance],
              cloudRoleName: envelope.tags[context.keys.cloudRole],
              operationSynthetic: envelope.tags[context.keys.operationSyntheticSource],
              requestSuccess: requestData.success,
              requestResultCode: requestData.responseCode
            };
            AutoCollecPreAggregatedMetrics.countRequest(requestData.duration, requestDimensions);
            break;
          case TelemetryType.TelemetryTypeString.Dependency:
            var remoteDependencyData = envelope.data.baseData;
            remoteDependencyData.properties = __assign(__assign({}, remoteDependencyData.properties), { "_MS.ProcessedByMetricExtractors": "(Name:'Dependencies', Ver:'1.1')" });
            var dependencyDimensions = {
              cloudRoleInstance: envelope.tags[context.keys.cloudRoleInstance],
              cloudRoleName: envelope.tags[context.keys.cloudRole],
              operationSynthetic: envelope.tags[context.keys.operationSyntheticSource],
              dependencySuccess: remoteDependencyData.success,
              dependencyType: remoteDependencyData.type,
              dependencyTarget: remoteDependencyData.target,
              dependencyResultCode: remoteDependencyData.resultCode
            };
            AutoCollecPreAggregatedMetrics.countDependency(remoteDependencyData.duration, dependencyDimensions);
            break;
        }
      }
      return true;
    }
    exports.preAggregatedMetricsTelemetryProcessor = preAggregatedMetricsTelemetryProcessor;
  }
});

// node_modules/applicationinsights/out/TelemetryProcessors/index.js
var require_TelemetryProcessors = __commonJS({
  "node_modules/applicationinsights/out/TelemetryProcessors/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_AzureRoleEnvironmentTelemetryInitializer(), exports);
    __exportStar(require_SamplingTelemetryProcessor(), exports);
    __exportStar(require_PerformanceMetricsTelemetryProcessor(), exports);
    __exportStar(require_PreAggregatedMetricsTelemetryProcessor(), exports);
  }
});

// node_modules/applicationinsights/out/Library/Sender.js
var require_Sender = __commonJS({
  "node_modules/applicationinsights/out/Library/Sender.js"(exports, module2) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var fs = require("fs");
    var os2 = require("os");
    var path = require("path");
    var zlib = require("zlib");
    var child_process = require("child_process");
    var Logging = require_Logging();
    var AutoCollectHttpDependencies = require_HttpDependencies();
    var Util = require_Util();
    var Sender = function() {
      function Sender2(config, onSuccess, onError) {
        this._redirectedHost = null;
        this._config = config;
        this._onSuccess = onSuccess;
        this._onError = onError;
        this._enableDiskRetryMode = false;
        this._resendInterval = Sender2.WAIT_BETWEEN_RESEND;
        this._maxBytesOnDisk = Sender2.MAX_BYTES_ON_DISK;
        this._numConsecutiveFailures = 0;
        this._numConsecutiveRedirects = 0;
        this._resendTimer = null;
        this._fileCleanupTimer = null;
        this._tempDir = path.join(os2.tmpdir(), Sender2.TEMPDIR_PREFIX + this._config.instrumentationKey);
        if (!Sender2.OS_PROVIDES_FILE_PROTECTION) {
          if (Sender2.USE_ICACLS) {
            try {
              Sender2.OS_PROVIDES_FILE_PROTECTION = fs.existsSync(Sender2.ICACLS_PATH);
            } catch (e) {
            }
            if (!Sender2.OS_PROVIDES_FILE_PROTECTION) {
              Logging.warn(Sender2.TAG, "Could not find ICACLS in expected location! This is necessary to use disk retry mode on Windows.");
            }
          } else {
            Sender2.OS_PROVIDES_FILE_PROTECTION = true;
          }
        }
      }
      Sender2.prototype.setDiskRetryMode = function(value, resendInterval, maxBytesOnDisk) {
        var _this = this;
        this._enableDiskRetryMode = Sender2.OS_PROVIDES_FILE_PROTECTION && value;
        if (typeof resendInterval === "number" && resendInterval >= 0) {
          this._resendInterval = Math.floor(resendInterval);
        }
        if (typeof maxBytesOnDisk === "number" && maxBytesOnDisk >= 0) {
          this._maxBytesOnDisk = Math.floor(maxBytesOnDisk);
        }
        if (value && !Sender2.OS_PROVIDES_FILE_PROTECTION) {
          this._enableDiskRetryMode = false;
          Logging.warn(Sender2.TAG, "Ignoring request to enable disk retry mode. Sufficient file protection capabilities were not detected.");
        }
        if (this._enableDiskRetryMode) {
          if (!this._fileCleanupTimer) {
            this._fileCleanupTimer = setTimeout(function() {
              _this._fileCleanupTask();
            }, Sender2.CLEANUP_TIMEOUT);
            this._fileCleanupTimer.unref();
          }
        } else {
          if (this._fileCleanupTimer) {
            clearTimeout(this._fileCleanupTimer);
          }
        }
      };
      Sender2.prototype.send = function(envelopes, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var endpointUrl, options, batch_1, payload_1;
          var _this = this;
          return __generator(this, function(_a) {
            if (envelopes) {
              endpointUrl = this._redirectedHost || this._config.endpointUrl;
              options = {
                method: "POST",
                withCredentials: false,
                headers: {
                  "Content-Type": "application/x-json-stream"
                }
              };
              batch_1 = "";
              envelopes.forEach(function(envelope) {
                var payload = _this._stringify(envelope);
                if (typeof payload !== "string") {
                  return;
                }
                batch_1 += payload + "\n";
              });
              if (batch_1.length > 0) {
                batch_1 = batch_1.substring(0, batch_1.length - 1);
              }
              payload_1 = Buffer.from ? Buffer.from(batch_1) : new Buffer(batch_1);
              zlib.gzip(payload_1, function(err, buffer) {
                var dataToSend = buffer;
                if (err) {
                  Logging.warn(err);
                  dataToSend = payload_1;
                  options.headers["Content-Length"] = payload_1.length.toString();
                } else {
                  options.headers["Content-Encoding"] = "gzip";
                  options.headers["Content-Length"] = buffer.length.toString();
                }
                Logging.info(Sender2.TAG, options);
                options[AutoCollectHttpDependencies.disableCollectionRequestOption] = true;
                var requestCallback = function(res) {
                  res.setEncoding("utf-8");
                  var responseString = "";
                  res.on("data", function(data) {
                    responseString += data;
                  });
                  res.on("end", function() {
                    _this._numConsecutiveFailures = 0;
                    if (_this._enableDiskRetryMode) {
                      if (res.statusCode === 200) {
                        if (!_this._resendTimer) {
                          _this._resendTimer = setTimeout(function() {
                            _this._resendTimer = null;
                            _this._sendFirstFileOnDisk();
                          }, _this._resendInterval);
                          _this._resendTimer.unref();
                        }
                      } else if (_this._isRetriable(res.statusCode)) {
                        try {
                          var breezeResponse = JSON.parse(responseString);
                          var filteredEnvelopes_1 = [];
                          breezeResponse.errors.forEach(function(error) {
                            if (_this._isRetriable(error.statusCode)) {
                              filteredEnvelopes_1.push(envelopes[error.index]);
                            }
                          });
                          if (filteredEnvelopes_1.length > 0) {
                            _this._storeToDisk(filteredEnvelopes_1);
                          }
                        } catch (ex) {
                          _this._storeToDisk(envelopes);
                        }
                      }
                    }
                    if (res.statusCode === 307 || res.statusCode === 308) {
                      _this._numConsecutiveRedirects++;
                      if (_this._numConsecutiveRedirects < 10) {
                        var locationHeader = res.headers["location"] ? res.headers["location"].toString() : null;
                        if (locationHeader) {
                          _this._redirectedHost = locationHeader;
                          _this.send(envelopes, callback);
                        }
                      } else {
                        if (typeof callback === "function") {
                          callback("Error sending telemetry because of circular redirects.");
                        }
                      }
                    } else {
                      _this._numConsecutiveRedirects = 0;
                      if (typeof callback === "function") {
                        callback(responseString);
                      }
                      Logging.info(Sender2.TAG, responseString);
                      if (typeof _this._onSuccess === "function") {
                        _this._onSuccess(responseString);
                      }
                    }
                  });
                };
                var req = Util.makeRequest(_this._config, endpointUrl, options, requestCallback);
                req.on("error", function(error) {
                  _this._numConsecutiveFailures++;
                  if (!_this._enableDiskRetryMode || _this._numConsecutiveFailures > 0 && _this._numConsecutiveFailures % Sender2.MAX_CONNECTION_FAILURES_BEFORE_WARN === 0) {
                    var notice = "Ingestion endpoint could not be reached. This batch of telemetry items has been lost. Use Disk Retry Caching to enable resending of failed telemetry. Error:";
                    if (_this._enableDiskRetryMode) {
                      notice = "Ingestion endpoint could not be reached " + _this._numConsecutiveFailures + " consecutive times. There may be resulting telemetry loss. Most recent error:";
                    }
                    Logging.warn(Sender2.TAG, notice, Util.dumpObj(error));
                  } else {
                    var notice = "Transient failure to reach ingestion endpoint. This batch of telemetry items will be retried. Error:";
                    Logging.info(Sender2.TAG, notice, Util.dumpObj(error));
                  }
                  _this._onErrorHelper(error);
                  if (typeof callback === "function") {
                    if (error) {
                      callback(Util.dumpObj(error));
                    }
                    callback("Error sending telemetry");
                  }
                  if (_this._enableDiskRetryMode) {
                    _this._storeToDisk(envelopes);
                  }
                });
                req.write(dataToSend);
                req.end();
              });
            }
            return [2];
          });
        });
      };
      Sender2.prototype.saveOnCrash = function(envelopes) {
        if (this._enableDiskRetryMode) {
          this._storeToDiskSync(this._stringify(envelopes));
        }
      };
      Sender2.prototype._isRetriable = function(statusCode) {
        return statusCode === 206 || statusCode === 408 || statusCode === 429 || statusCode === 439 || statusCode === 500 || statusCode === 503;
      };
      Sender2.prototype._runICACLS = function(args, callback) {
        var aclProc = child_process.spawn(Sender2.ICACLS_PATH, args, { windowsHide: true });
        aclProc.on("error", function(e) {
          return callback(e);
        });
        aclProc.on("close", function(code, signal) {
          return callback(code === 0 ? null : new Error("Setting ACL restrictions did not succeed (ICACLS returned code " + code + ")"));
        });
      };
      Sender2.prototype._runICACLSSync = function(args) {
        if (child_process.spawnSync) {
          var aclProc = child_process.spawnSync(Sender2.ICACLS_PATH, args, { windowsHide: true });
          if (aclProc.error) {
            throw aclProc.error;
          } else if (aclProc.status !== 0) {
            throw new Error("Setting ACL restrictions did not succeed (ICACLS returned code " + aclProc.status + ")");
          }
        } else {
          throw new Error("Could not synchronously call ICACLS under current version of Node.js");
        }
      };
      Sender2.prototype._getACLIdentity = function(callback) {
        if (Sender2.ACL_IDENTITY) {
          return callback(null, Sender2.ACL_IDENTITY);
        }
        var psProc = child_process.spawn(Sender2.POWERSHELL_PATH, ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"], {
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"]
        });
        var data = "";
        psProc.stdout.on("data", function(d) {
          return data += d;
        });
        psProc.on("error", function(e) {
          return callback(e, null);
        });
        psProc.on("close", function(code, signal) {
          Sender2.ACL_IDENTITY = data && data.trim();
          return callback(code === 0 ? null : new Error("Getting ACL identity did not succeed (PS returned code " + code + ")"), Sender2.ACL_IDENTITY);
        });
      };
      Sender2.prototype._getACLIdentitySync = function() {
        if (Sender2.ACL_IDENTITY) {
          return Sender2.ACL_IDENTITY;
        }
        if (child_process.spawnSync) {
          var psProc = child_process.spawnSync(Sender2.POWERSHELL_PATH, ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"], {
            windowsHide: true,
            stdio: ["ignore", "pipe", "pipe"]
          });
          if (psProc.error) {
            throw psProc.error;
          } else if (psProc.status !== 0) {
            throw new Error("Getting ACL identity did not succeed (PS returned code " + psProc.status + ")");
          }
          Sender2.ACL_IDENTITY = psProc.stdout && psProc.stdout.toString().trim();
          return Sender2.ACL_IDENTITY;
        } else {
          throw new Error("Could not synchronously get ACL identity under current version of Node.js");
        }
      };
      Sender2.prototype._getACLArguments = function(directory, identity) {
        return [
          directory,
          "/grant",
          "*S-1-5-32-544:(OI)(CI)F",
          "/grant",
          identity + ":(OI)(CI)F",
          "/inheritance:r"
        ];
      };
      Sender2.prototype._applyACLRules = function(directory, callback) {
        var _this = this;
        if (!Sender2.USE_ICACLS) {
          return callback(null);
        }
        if (Sender2.ACLED_DIRECTORIES[directory] === void 0) {
          Sender2.ACLED_DIRECTORIES[directory] = false;
          this._getACLIdentity(function(err, identity) {
            if (err) {
              Sender2.ACLED_DIRECTORIES[directory] = false;
              return callback(err);
            } else {
              _this._runICACLS(_this._getACLArguments(directory, identity), function(err2) {
                Sender2.ACLED_DIRECTORIES[directory] = !err2;
                return callback(err2);
              });
            }
          });
        } else {
          return callback(Sender2.ACLED_DIRECTORIES[directory] ? null : new Error("Setting ACL restrictions did not succeed (cached result)"));
        }
      };
      Sender2.prototype._applyACLRulesSync = function(directory) {
        if (Sender2.USE_ICACLS) {
          if (Sender2.ACLED_DIRECTORIES[directory] === void 0) {
            this._runICACLSSync(this._getACLArguments(directory, this._getACLIdentitySync()));
            Sender2.ACLED_DIRECTORIES[directory] = true;
            return;
          } else if (!Sender2.ACLED_DIRECTORIES[directory]) {
            throw new Error("Setting ACL restrictions did not succeed (cached result)");
          }
        }
      };
      Sender2.prototype._confirmDirExists = function(directory, callback) {
        var _this = this;
        fs.lstat(directory, function(err, stats) {
          if (err && err.code === "ENOENT") {
            fs.mkdir(directory, function(err2) {
              if (err2 && err2.code !== "EEXIST") {
                callback(err2);
              } else {
                _this._applyACLRules(directory, callback);
              }
            });
          } else if (!err && stats.isDirectory()) {
            _this._applyACLRules(directory, callback);
          } else {
            callback(err || new Error("Path existed but was not a directory"));
          }
        });
      };
      Sender2.prototype._getShallowDirectorySize = function(directory, callback) {
        fs.readdir(directory, function(err, files) {
          if (err) {
            return callback(err, -1);
          }
          var error = null;
          var totalSize = 0;
          var count = 0;
          if (files.length === 0) {
            callback(null, 0);
            return;
          }
          for (var i = 0; i < files.length; i++) {
            fs.stat(path.join(directory, files[i]), function(err2, fileStats) {
              count++;
              if (err2) {
                error = err2;
              } else {
                if (fileStats.isFile()) {
                  totalSize += fileStats.size;
                }
              }
              if (count === files.length) {
                if (error) {
                  callback(error, -1);
                } else {
                  callback(error, totalSize);
                }
              }
            });
          }
        });
      };
      Sender2.prototype._getShallowDirectorySizeSync = function(directory) {
        var files = fs.readdirSync(directory);
        var totalSize = 0;
        for (var i = 0; i < files.length; i++) {
          totalSize += fs.statSync(path.join(directory, files[i])).size;
        }
        return totalSize;
      };
      Sender2.prototype._storeToDisk = function(envelopes) {
        var _this = this;
        Logging.info(Sender2.TAG, "Checking existence of data storage directory: " + this._tempDir);
        this._confirmDirExists(this._tempDir, function(error) {
          if (error) {
            Logging.warn(Sender2.TAG, "Error while checking/creating directory: " + (error && error.message));
            _this._onErrorHelper(error);
            return;
          }
          _this._getShallowDirectorySize(_this._tempDir, function(err, size) {
            if (err || size < 0) {
              Logging.warn(Sender2.TAG, "Error while checking directory size: " + (err && err.message));
              _this._onErrorHelper(err);
              return;
            } else if (size > _this._maxBytesOnDisk) {
              Logging.warn(Sender2.TAG, "Not saving data due to max size limit being met. Directory size in bytes is: " + size);
              return;
            }
            var fileName = new Date().getTime() + ".ai.json";
            var fileFullPath = path.join(_this._tempDir, fileName);
            Logging.info(Sender2.TAG, "saving data to disk at: " + fileFullPath);
            fs.writeFile(fileFullPath, _this._stringify(envelopes), { mode: 384 }, function(error2) {
              return _this._onErrorHelper(error2);
            });
          });
        });
      };
      Sender2.prototype._storeToDiskSync = function(payload) {
        try {
          Logging.info(Sender2.TAG, "Checking existence of data storage directory: " + this._tempDir);
          if (!fs.existsSync(this._tempDir)) {
            fs.mkdirSync(this._tempDir);
          }
          this._applyACLRulesSync(this._tempDir);
          var dirSize = this._getShallowDirectorySizeSync(this._tempDir);
          if (dirSize > this._maxBytesOnDisk) {
            Logging.info(Sender2.TAG, "Not saving data due to max size limit being met. Directory size in bytes is: " + dirSize);
            return;
          }
          var fileName = new Date().getTime() + ".ai.json";
          var fileFullPath = path.join(this._tempDir, fileName);
          Logging.info(Sender2.TAG, "saving data before crash to disk at: " + fileFullPath);
          fs.writeFileSync(fileFullPath, payload, { mode: 384 });
        } catch (error) {
          Logging.warn(Sender2.TAG, "Error while saving data to disk: " + (error && error.message));
          this._onErrorHelper(error);
        }
      };
      Sender2.prototype._sendFirstFileOnDisk = function() {
        var _this = this;
        fs.exists(this._tempDir, function(exists) {
          if (exists) {
            fs.readdir(_this._tempDir, function(error, files) {
              if (!error) {
                files = files.filter(function(f) {
                  return path.basename(f).indexOf(".ai.json") > -1;
                });
                if (files.length > 0) {
                  var firstFile = files[0];
                  var filePath = path.join(_this._tempDir, firstFile);
                  fs.readFile(filePath, function(error2, buffer) {
                    if (!error2) {
                      fs.unlink(filePath, function(error3) {
                        if (!error3) {
                          try {
                            var envelopes = JSON.parse(buffer.toString());
                            _this.send(envelopes);
                          } catch (error4) {
                            Logging.warn("Failed to read persisted file", error4);
                          }
                        } else {
                          _this._onErrorHelper(error3);
                        }
                      });
                    } else {
                      _this._onErrorHelper(error2);
                    }
                  });
                }
              } else {
                _this._onErrorHelper(error);
              }
            });
          }
        });
      };
      Sender2.prototype._onErrorHelper = function(error) {
        if (typeof this._onError === "function") {
          this._onError(error);
        }
      };
      Sender2.prototype._stringify = function(payload) {
        try {
          return JSON.stringify(payload);
        } catch (error) {
          Logging.warn("Failed to serialize payload", error, payload);
        }
      };
      Sender2.prototype._fileCleanupTask = function() {
        var _this = this;
        fs.exists(this._tempDir, function(exists) {
          if (exists) {
            fs.readdir(_this._tempDir, function(error, files) {
              if (!error) {
                files = files.filter(function(f) {
                  return path.basename(f).indexOf(".ai.json") > -1;
                });
                if (files.length > 0) {
                  files.forEach(function(file) {
                    var fileCreationDate = new Date(parseInt(file.split(".ai.json")[0]));
                    var expired = new Date(+new Date() - Sender2.FILE_RETEMPTION_PERIOD) > fileCreationDate;
                    if (expired) {
                      var filePath = path.join(_this._tempDir, file);
                      fs.unlink(filePath, function(error2) {
                        if (error2) {
                          _this._onErrorHelper(error2);
                        }
                      });
                    }
                  });
                }
              } else {
                _this._onErrorHelper(error);
              }
            });
          }
        });
      };
      Sender2.TAG = "Sender";
      Sender2.ICACLS_PATH = process.env.systemdrive + "/windows/system32/icacls.exe";
      Sender2.POWERSHELL_PATH = process.env.systemdrive + "/windows/system32/windowspowershell/v1.0/powershell.exe";
      Sender2.ACLED_DIRECTORIES = {};
      Sender2.ACL_IDENTITY = null;
      Sender2.WAIT_BETWEEN_RESEND = 60 * 1e3;
      Sender2.MAX_BYTES_ON_DISK = 50 * 1024 * 1024;
      Sender2.MAX_CONNECTION_FAILURES_BEFORE_WARN = 5;
      Sender2.CLEANUP_TIMEOUT = 60 * 60 * 1e3;
      Sender2.FILE_RETEMPTION_PERIOD = 7 * 24 * 60 * 60 * 1e3;
      Sender2.TEMPDIR_PREFIX = "appInsights-node";
      Sender2.OS_PROVIDES_FILE_PROTECTION = false;
      Sender2.USE_ICACLS = os2.type() === "Windows_NT";
      return Sender2;
    }();
    module2.exports = Sender;
  }
});

// node_modules/applicationinsights/out/Library/EnvelopeFactory.js
var require_EnvelopeFactory = __commonJS({
  "node_modules/applicationinsights/out/Library/EnvelopeFactory.js"(exports, module2) {
    "use strict";
    var Contracts = require_Contracts();
    var Util = require_Util();
    var CorrelationContextManager_1 = require_CorrelationContextManager();
    var EnvelopeFactory = function() {
      function EnvelopeFactory2() {
      }
      EnvelopeFactory2.createEnvelope = function(telemetry, telemetryType, commonProperties, context, config) {
        var data = null;
        switch (telemetryType) {
          case Contracts.TelemetryType.Trace:
            data = EnvelopeFactory2.createTraceData(telemetry);
            break;
          case Contracts.TelemetryType.Dependency:
            data = EnvelopeFactory2.createDependencyData(telemetry);
            break;
          case Contracts.TelemetryType.Event:
            data = EnvelopeFactory2.createEventData(telemetry);
            break;
          case Contracts.TelemetryType.Exception:
            data = EnvelopeFactory2.createExceptionData(telemetry);
            break;
          case Contracts.TelemetryType.Request:
            data = EnvelopeFactory2.createRequestData(telemetry);
            break;
          case Contracts.TelemetryType.Metric:
            data = EnvelopeFactory2.createMetricData(telemetry);
            break;
          case Contracts.TelemetryType.Availability:
            data = EnvelopeFactory2.createAvailabilityData(telemetry);
            break;
          case Contracts.TelemetryType.PageView:
            data = EnvelopeFactory2.createPageViewData(telemetry);
            break;
        }
        if (commonProperties && Contracts.domainSupportsProperties(data.baseData)) {
          if (data && data.baseData) {
            if (!data.baseData.properties) {
              data.baseData.properties = commonProperties;
            } else {
              for (var name in commonProperties) {
                if (!data.baseData.properties[name]) {
                  data.baseData.properties[name] = commonProperties[name];
                }
              }
            }
          }
          data.baseData.properties = Util.validateStringMap(data.baseData.properties);
        }
        var iKey = config ? config.instrumentationKey || "" : "";
        var envelope = new Contracts.Envelope();
        envelope.data = data;
        envelope.iKey = iKey;
        envelope.name = "Microsoft.ApplicationInsights." + iKey.replace(/-/g, "") + "." + data.baseType.substr(0, data.baseType.length - 4);
        envelope.tags = this.getTags(context, telemetry.tagOverrides);
        envelope.time = new Date().toISOString();
        envelope.ver = 1;
        envelope.sampleRate = config ? config.samplingPercentage : 100;
        if (telemetryType === Contracts.TelemetryType.Metric) {
          envelope.sampleRate = 100;
        }
        return envelope;
      };
      EnvelopeFactory2.createTraceData = function(telemetry) {
        var trace = new Contracts.MessageData();
        trace.message = telemetry.message;
        trace.properties = telemetry.properties;
        if (!isNaN(telemetry.severity)) {
          trace.severityLevel = telemetry.severity;
        } else {
          trace.severityLevel = Contracts.SeverityLevel.Information;
        }
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Trace);
        data.baseData = trace;
        return data;
      };
      EnvelopeFactory2.createDependencyData = function(telemetry) {
        var remoteDependency = new Contracts.RemoteDependencyData();
        if (typeof telemetry.name === "string") {
          remoteDependency.name = telemetry.name.length > 1024 ? telemetry.name.slice(0, 1021) + "..." : telemetry.name;
        }
        remoteDependency.data = telemetry.data;
        remoteDependency.target = telemetry.target;
        remoteDependency.duration = Util.msToTimeSpan(telemetry.duration);
        remoteDependency.success = telemetry.success;
        remoteDependency.type = telemetry.dependencyTypeName;
        remoteDependency.properties = telemetry.properties;
        remoteDependency.resultCode = telemetry.resultCode ? telemetry.resultCode + "" : "";
        if (telemetry.id) {
          remoteDependency.id = telemetry.id;
        } else {
          remoteDependency.id = Util.w3cTraceId();
        }
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Dependency);
        data.baseData = remoteDependency;
        return data;
      };
      EnvelopeFactory2.createEventData = function(telemetry) {
        var event = new Contracts.EventData();
        event.name = telemetry.name;
        event.properties = telemetry.properties;
        event.measurements = telemetry.measurements;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Event);
        data.baseData = event;
        return data;
      };
      EnvelopeFactory2.createExceptionData = function(telemetry) {
        var exception = new Contracts.ExceptionData();
        exception.properties = telemetry.properties;
        if (!isNaN(telemetry.severity)) {
          exception.severityLevel = telemetry.severity;
        } else {
          exception.severityLevel = Contracts.SeverityLevel.Error;
        }
        exception.measurements = telemetry.measurements;
        exception.exceptions = [];
        var stack = telemetry.exception["stack"];
        var exceptionDetails = new Contracts.ExceptionDetails();
        exceptionDetails.message = telemetry.exception.message;
        exceptionDetails.typeName = telemetry.exception.name;
        exceptionDetails.parsedStack = this.parseStack(stack);
        exceptionDetails.hasFullStack = Util.isArray(exceptionDetails.parsedStack) && exceptionDetails.parsedStack.length > 0;
        exception.exceptions.push(exceptionDetails);
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Exception);
        data.baseData = exception;
        return data;
      };
      EnvelopeFactory2.createRequestData = function(telemetry) {
        var requestData = new Contracts.RequestData();
        if (telemetry.id) {
          requestData.id = telemetry.id;
        } else {
          requestData.id = Util.w3cTraceId();
        }
        requestData.name = telemetry.name;
        requestData.url = telemetry.url;
        requestData.source = telemetry.source;
        requestData.duration = Util.msToTimeSpan(telemetry.duration);
        requestData.responseCode = telemetry.resultCode ? telemetry.resultCode + "" : "";
        requestData.success = telemetry.success;
        requestData.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Request);
        data.baseData = requestData;
        return data;
      };
      EnvelopeFactory2.createMetricData = function(telemetry) {
        var metrics = new Contracts.MetricData();
        metrics.metrics = [];
        var metric = new Contracts.DataPoint();
        metric.count = !isNaN(telemetry.count) ? telemetry.count : 1;
        metric.kind = Contracts.DataPointType.Aggregation;
        metric.max = !isNaN(telemetry.max) ? telemetry.max : telemetry.value;
        metric.min = !isNaN(telemetry.min) ? telemetry.min : telemetry.value;
        metric.name = telemetry.name;
        metric.stdDev = !isNaN(telemetry.stdDev) ? telemetry.stdDev : 0;
        metric.value = telemetry.value;
        metrics.metrics.push(metric);
        metrics.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Metric);
        data.baseData = metrics;
        return data;
      };
      EnvelopeFactory2.createAvailabilityData = function(telemetry) {
        var availabilityData = new Contracts.AvailabilityData();
        if (telemetry.id) {
          availabilityData.id = telemetry.id;
        } else {
          availabilityData.id = Util.w3cTraceId();
        }
        availabilityData.name = telemetry.name;
        availabilityData.duration = Util.msToTimeSpan(telemetry.duration);
        availabilityData.success = telemetry.success;
        availabilityData.runLocation = telemetry.runLocation;
        availabilityData.message = telemetry.message;
        availabilityData.measurements = telemetry.measurements;
        availabilityData.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Availability);
        data.baseData = availabilityData;
        return data;
      };
      EnvelopeFactory2.createPageViewData = function(telemetry) {
        var pageViewData = new Contracts.PageViewData();
        pageViewData.name = telemetry.name;
        pageViewData.duration = Util.msToTimeSpan(telemetry.duration);
        pageViewData.url = telemetry.url;
        pageViewData.measurements = telemetry.measurements;
        pageViewData.properties = telemetry.properties;
        var data = new Contracts.Data();
        data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.PageView);
        data.baseData = pageViewData;
        return data;
      };
      EnvelopeFactory2.getTags = function(context, tagOverrides) {
        var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        var newTags = {};
        if (context && context.tags) {
          for (var key in context.tags) {
            newTags[key] = context.tags[key];
          }
        }
        if (tagOverrides) {
          for (var key in tagOverrides) {
            newTags[key] = tagOverrides[key];
          }
        }
        if (correlationContext) {
          newTags[context.keys.operationId] = newTags[context.keys.operationId] || correlationContext.operation.id;
          newTags[context.keys.operationName] = newTags[context.keys.operationName] || correlationContext.operation.name;
          newTags[context.keys.operationParentId] = newTags[context.keys.operationParentId] || correlationContext.operation.parentId;
        }
        return newTags;
      };
      EnvelopeFactory2.parseStack = function(stack) {
        var parsedStack = void 0;
        if (typeof stack === "string") {
          var frames = stack.split("\n");
          parsedStack = [];
          var level = 0;
          var totalSizeInBytes = 0;
          for (var i = 0; i <= frames.length; i++) {
            var frame = frames[i];
            if (_StackFrame.regex.test(frame)) {
              var parsedFrame = new _StackFrame(frames[i], level++);
              totalSizeInBytes += parsedFrame.sizeInBytes;
              parsedStack.push(parsedFrame);
            }
          }
          var exceptionParsedStackThreshold = 32 * 1024;
          if (totalSizeInBytes > exceptionParsedStackThreshold) {
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
      };
      return EnvelopeFactory2;
    }();
    var _StackFrame = function() {
      function _StackFrame2(frame, level) {
        this.sizeInBytes = 0;
        this.level = level;
        this.method = "<no_method>";
        this.assembly = Util.trim(frame);
        var matches = frame.match(_StackFrame2.regex);
        if (matches && matches.length >= 5) {
          this.method = Util.trim(matches[2]) || this.method;
          this.fileName = Util.trim(matches[4]) || "<no_filename>";
          this.line = parseInt(matches[5]) || 0;
        }
        this.sizeInBytes += this.method.length;
        this.sizeInBytes += this.fileName.length;
        this.sizeInBytes += this.assembly.length;
        this.sizeInBytes += _StackFrame2.baseSize;
        this.sizeInBytes += this.level.toString().length;
        this.sizeInBytes += this.line.toString().length;
      }
      _StackFrame2.regex = /^(\s+at)?(.*?)(\@|\s\(|\s)([^\(\n]+):(\d+):(\d+)(\)?)$/;
      _StackFrame2.baseSize = 58;
      return _StackFrame2;
    }();
    module2.exports = EnvelopeFactory;
  }
});

// node_modules/applicationinsights/out/Library/TelemetryClient.js
var require_TelemetryClient = __commonJS({
  "node_modules/applicationinsights/out/Library/TelemetryClient.js"(exports, module2) {
    "use strict";
    var url = require("url");
    var Config = require_Config();
    var Context = require_Context();
    var Contracts = require_Contracts();
    var Channel = require_Channel();
    var TelemetryProcessors = require_TelemetryProcessors();
    var CorrelationContextManager_1 = require_CorrelationContextManager();
    var Sender = require_Sender();
    var Util = require_Util();
    var Logging = require_Logging();
    var EnvelopeFactory = require_EnvelopeFactory();
    var TelemetryClient2 = function() {
      function TelemetryClient3(setupString) {
        this._telemetryProcessors = [];
        this._enableAzureProperties = false;
        var config = new Config(setupString);
        this.config = config;
        this.context = new Context();
        this.commonProperties = {};
        var sender = new Sender(this.config);
        this.channel = new Channel(function() {
          return config.disableAppInsights;
        }, function() {
          return config.maxBatchSize;
        }, function() {
          return config.maxBatchIntervalMs;
        }, sender);
      }
      TelemetryClient3.prototype.trackAvailability = function(telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Availability);
      };
      TelemetryClient3.prototype.trackPageView = function(telemetry) {
        this.track(telemetry, Contracts.TelemetryType.PageView);
      };
      TelemetryClient3.prototype.trackTrace = function(telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Trace);
      };
      TelemetryClient3.prototype.trackMetric = function(telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Metric);
      };
      TelemetryClient3.prototype.trackException = function(telemetry) {
        if (telemetry && telemetry.exception && !Util.isError(telemetry.exception)) {
          telemetry.exception = new Error(telemetry.exception.toString());
        }
        this.track(telemetry, Contracts.TelemetryType.Exception);
      };
      TelemetryClient3.prototype.trackEvent = function(telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Event);
      };
      TelemetryClient3.prototype.trackRequest = function(telemetry) {
        this.track(telemetry, Contracts.TelemetryType.Request);
      };
      TelemetryClient3.prototype.trackDependency = function(telemetry) {
        if (telemetry && !telemetry.target && telemetry.data) {
          telemetry.target = url.parse(telemetry.data).host;
        }
        this.track(telemetry, Contracts.TelemetryType.Dependency);
      };
      TelemetryClient3.prototype.flush = function(options) {
        this.channel.triggerSend(options ? !!options.isAppCrashing : false, options ? options.callback : void 0);
      };
      TelemetryClient3.prototype.track = function(telemetry, telemetryType) {
        if (telemetry && Contracts.telemetryTypeToBaseType(telemetryType)) {
          var envelope = EnvelopeFactory.createEnvelope(telemetry, telemetryType, this.commonProperties, this.context, this.config);
          if (telemetry.time) {
            envelope.time = telemetry.time.toISOString();
          }
          if (this._enableAzureProperties) {
            TelemetryProcessors.azureRoleEnvironmentTelemetryProcessor(envelope, this.context);
          }
          var accepted = this.runTelemetryProcessors(envelope, telemetry.contextObjects);
          accepted = accepted && TelemetryProcessors.samplingTelemetryProcessor(envelope, { correlationContext: CorrelationContextManager_1.CorrelationContextManager.getCurrentContext() });
          TelemetryProcessors.preAggregatedMetricsTelemetryProcessor(envelope, this.context);
          if (accepted) {
            TelemetryProcessors.performanceMetricsTelemetryProcessor(envelope, this.quickPulseClient);
            this.channel.send(envelope);
          }
        } else {
          Logging.warn("track() requires telemetry object and telemetryType to be specified.");
        }
      };
      TelemetryClient3.prototype.setAutoPopulateAzureProperties = function(value) {
        this._enableAzureProperties = value;
      };
      TelemetryClient3.prototype.addTelemetryProcessor = function(telemetryProcessor) {
        this._telemetryProcessors.push(telemetryProcessor);
      };
      TelemetryClient3.prototype.clearTelemetryProcessors = function() {
        this._telemetryProcessors = [];
      };
      TelemetryClient3.prototype.runTelemetryProcessors = function(envelope, contextObjects) {
        var accepted = true;
        var telemetryProcessorsCount = this._telemetryProcessors.length;
        if (telemetryProcessorsCount === 0) {
          return accepted;
        }
        contextObjects = contextObjects || {};
        contextObjects["correlationContext"] = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
        for (var i = 0; i < telemetryProcessorsCount; ++i) {
          try {
            var processor = this._telemetryProcessors[i];
            if (processor) {
              if (processor.apply(null, [envelope, contextObjects]) === false) {
                accepted = false;
                break;
              }
            }
          } catch (error) {
            accepted = true;
            Logging.warn("One of telemetry processors failed, telemetry item will be sent.", error, envelope);
          }
        }
        if (accepted) {
          if (envelope && envelope.tags) {
            envelope.tags = Util.validateStringMap(envelope.tags);
          }
          if (envelope && envelope.data && envelope.data.baseData && envelope.data.baseData.properties) {
            envelope.data.baseData.properties = Util.validateStringMap(envelope.data.baseData.properties);
          }
        }
        return accepted;
      };
      return TelemetryClient3;
    }();
    module2.exports = TelemetryClient2;
  }
});

// node_modules/applicationinsights/out/Library/NodeClient.js
var require_NodeClient = __commonJS({
  "node_modules/applicationinsights/out/Library/NodeClient.js"(exports, module2) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var TelemetryClient2 = require_TelemetryClient();
    var ServerRequestTracking = require_HttpRequests();
    var ClientRequestTracking = require_HttpDependencies();
    var Logging = require_Logging();
    var NodeClient = function(_super) {
      __extends(NodeClient2, _super);
      function NodeClient2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NodeClient2.prototype.trackNodeHttpRequestSync = function(telemetry) {
        if (telemetry && telemetry.request && telemetry.response && telemetry.duration) {
          ServerRequestTracking.trackRequestSync(this, telemetry);
        } else {
          Logging.warn("trackNodeHttpRequestSync requires NodeHttpRequestTelemetry object with request, response and duration specified.");
        }
      };
      NodeClient2.prototype.trackNodeHttpRequest = function(telemetry) {
        if (telemetry.duration || telemetry.error) {
          Logging.warn("trackNodeHttpRequest will ignore supplied duration and error parameters. These values are collected from the request and response objects.");
        }
        if (telemetry && telemetry.request && telemetry.response) {
          ServerRequestTracking.trackRequest(this, telemetry);
        } else {
          Logging.warn("trackNodeHttpRequest requires NodeHttpRequestTelemetry object with request and response specified.");
        }
      };
      NodeClient2.prototype.trackNodeHttpDependency = function(telemetry) {
        if (telemetry && telemetry.request) {
          ClientRequestTracking.trackRequest(this, telemetry);
        } else {
          Logging.warn("trackNodeHttpDependency requires NodeHttpDependencyTelemetry object with request specified.");
        }
      };
      return NodeClient2;
    }(TelemetryClient2);
    module2.exports = NodeClient;
  }
});

// node_modules/applicationinsights/out/Library/Functions.js
var require_Functions = __commonJS({
  "node_modules/applicationinsights/out/Library/Functions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/applicationinsights/out/applicationinsights.js
var require_applicationinsights = __commonJS({
  "node_modules/applicationinsights/out/applicationinsights.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dispose = exports.Configuration = exports.wrapWithCorrelationContext = exports.startOperation = exports.getCorrelationContext = exports.start = exports.setup = exports.liveMetricsClient = exports.defaultClient = exports.DistributedTracingModes = void 0;
    var CorrelationContextManager = require_CorrelationContextManager();
    var AutoCollectConsole = require_Console();
    var AutoCollectExceptions = require_Exceptions();
    var AutoCollectPerformance = require_Performance();
    var AutoCollecPreAggregatedMetrics = require_PreAggregatedMetrics();
    var HeartBeat = require_HeartBeat();
    var AutoCollectHttpDependencies = require_HttpDependencies();
    var AutoCollectHttpRequests = require_HttpRequests();
    var CorrelationIdManager = require_CorrelationIdManager();
    var Logging = require_Logging();
    var QuickPulseClient = require_QuickPulseStateManager();
    var NativePerformance_1 = require_NativePerformance();
    exports.TelemetryClient = require_NodeClient();
    exports.Contracts = require_Contracts();
    exports.azureFunctionsTypes = require_Functions();
    var DistributedTracingModes;
    (function(DistributedTracingModes2) {
      DistributedTracingModes2[DistributedTracingModes2["AI"] = 0] = "AI";
      DistributedTracingModes2[DistributedTracingModes2["AI_AND_W3C"] = 1] = "AI_AND_W3C";
    })(DistributedTracingModes = exports.DistributedTracingModes || (exports.DistributedTracingModes = {}));
    var _isConsole = true;
    var _isConsoleLog = false;
    var _isExceptions = true;
    var _isPerformance = true;
    var _isPreAggregatedMetrics = true;
    var _isHeartBeat = false;
    var _isRequests = true;
    var _isDependencies = true;
    var _isDiskRetry = true;
    var _isCorrelating = true;
    var _forceClsHooked;
    var _isSendingLiveMetrics = false;
    var _isNativePerformance = true;
    var _disabledExtendedMetrics;
    var _diskRetryInterval = void 0;
    var _diskRetryMaxBytes = void 0;
    var _console;
    var _exceptions;
    var _performance;
    var _preAggregatedMetrics;
    var _heartbeat;
    var _nativePerformance;
    var _serverRequests;
    var _clientRequests;
    var _isStarted = false;
    var _performanceLiveMetrics;
    function setup2(setupString) {
      if (!exports.defaultClient) {
        exports.defaultClient = new exports.TelemetryClient(setupString);
        _console = new AutoCollectConsole(exports.defaultClient);
        _exceptions = new AutoCollectExceptions(exports.defaultClient);
        _performance = new AutoCollectPerformance(exports.defaultClient);
        _preAggregatedMetrics = new AutoCollecPreAggregatedMetrics(exports.defaultClient);
        _heartbeat = new HeartBeat(exports.defaultClient);
        _serverRequests = new AutoCollectHttpRequests(exports.defaultClient);
        _clientRequests = new AutoCollectHttpDependencies(exports.defaultClient);
        if (!_nativePerformance) {
          _nativePerformance = new NativePerformance_1.AutoCollectNativePerformance(exports.defaultClient);
        }
      } else {
        Logging.info("The default client is already setup");
      }
      if (exports.defaultClient && exports.defaultClient.channel) {
        exports.defaultClient.channel.setUseDiskRetryCaching(_isDiskRetry, _diskRetryInterval, _diskRetryMaxBytes);
      }
      return Configuration;
    }
    exports.setup = setup2;
    function start() {
      if (!!exports.defaultClient) {
        _isStarted = true;
        _console.enable(_isConsole, _isConsoleLog);
        _exceptions.enable(_isExceptions);
        _performance.enable(_isPerformance);
        _preAggregatedMetrics.enable(_isPreAggregatedMetrics);
        _heartbeat.enable(_isHeartBeat, exports.defaultClient.config);
        _nativePerformance.enable(_isNativePerformance, _disabledExtendedMetrics);
        _serverRequests.useAutoCorrelation(_isCorrelating, _forceClsHooked);
        _serverRequests.enable(_isRequests);
        _clientRequests.enable(_isDependencies);
        if (exports.liveMetricsClient && _isSendingLiveMetrics) {
          exports.liveMetricsClient.enable(_isSendingLiveMetrics);
        }
      } else {
        Logging.warn("Start cannot be called before setup");
      }
      return Configuration;
    }
    exports.start = start;
    function getCorrelationContext() {
      if (_isCorrelating) {
        return CorrelationContextManager.CorrelationContextManager.getCurrentContext();
      }
      return null;
    }
    exports.getCorrelationContext = getCorrelationContext;
    function startOperation(context, request) {
      return CorrelationContextManager.CorrelationContextManager.startOperation(context, request);
    }
    exports.startOperation = startOperation;
    function wrapWithCorrelationContext(fn, context) {
      return CorrelationContextManager.CorrelationContextManager.wrapCallback(fn, context);
    }
    exports.wrapWithCorrelationContext = wrapWithCorrelationContext;
    var Configuration = function() {
      function Configuration2() {
      }
      Configuration2.setDistributedTracingMode = function(value) {
        CorrelationIdManager.w3cEnabled = value === DistributedTracingModes.AI_AND_W3C;
        return Configuration2;
      };
      Configuration2.setAutoCollectConsole = function(value, collectConsoleLog) {
        if (collectConsoleLog === void 0) {
          collectConsoleLog = false;
        }
        _isConsole = value;
        _isConsoleLog = collectConsoleLog;
        if (_isStarted) {
          _console.enable(value, collectConsoleLog);
        }
        return Configuration2;
      };
      Configuration2.setAutoCollectExceptions = function(value) {
        _isExceptions = value;
        if (_isStarted) {
          _exceptions.enable(value);
        }
        return Configuration2;
      };
      Configuration2.setAutoCollectPerformance = function(value, collectExtendedMetrics) {
        if (collectExtendedMetrics === void 0) {
          collectExtendedMetrics = true;
        }
        _isPerformance = value;
        var extendedMetricsConfig = NativePerformance_1.AutoCollectNativePerformance.parseEnabled(collectExtendedMetrics);
        _isNativePerformance = extendedMetricsConfig.isEnabled;
        _disabledExtendedMetrics = extendedMetricsConfig.disabledMetrics;
        if (_isStarted) {
          _performance.enable(value);
          _nativePerformance.enable(extendedMetricsConfig.isEnabled, extendedMetricsConfig.disabledMetrics);
        }
        return Configuration2;
      };
      Configuration2.setAutoCollectPreAggregatedMetrics = function(value) {
        _isPreAggregatedMetrics = value;
        if (_isStarted) {
          _preAggregatedMetrics.enable(value);
        }
        return Configuration2;
      };
      Configuration2.setAutoCollectHeartbeat = function(value) {
        _isHeartBeat = value;
        if (_isStarted) {
          _heartbeat.enable(value, exports.defaultClient.config);
        }
        return Configuration2;
      };
      Configuration2.setAutoCollectRequests = function(value) {
        _isRequests = value;
        if (_isStarted) {
          _serverRequests.enable(value);
        }
        return Configuration2;
      };
      Configuration2.setAutoCollectDependencies = function(value) {
        _isDependencies = value;
        if (_isStarted) {
          _clientRequests.enable(value);
        }
        return Configuration2;
      };
      Configuration2.setAutoDependencyCorrelation = function(value, useAsyncHooks) {
        _isCorrelating = value;
        _forceClsHooked = useAsyncHooks;
        if (_isStarted) {
          _serverRequests.useAutoCorrelation(value, useAsyncHooks);
        }
        return Configuration2;
      };
      Configuration2.setUseDiskRetryCaching = function(value, resendInterval, maxBytesOnDisk) {
        _isDiskRetry = value;
        _diskRetryInterval = resendInterval;
        _diskRetryMaxBytes = maxBytesOnDisk;
        if (exports.defaultClient && exports.defaultClient.channel) {
          exports.defaultClient.channel.setUseDiskRetryCaching(value, resendInterval, maxBytesOnDisk);
        }
        return Configuration2;
      };
      Configuration2.setInternalLogging = function(enableDebugLogging, enableWarningLogging) {
        if (enableDebugLogging === void 0) {
          enableDebugLogging = false;
        }
        if (enableWarningLogging === void 0) {
          enableWarningLogging = true;
        }
        Logging.enableDebug = enableDebugLogging;
        Logging.disableWarnings = !enableWarningLogging;
        return Configuration2;
      };
      Configuration2.setSendLiveMetrics = function(enable) {
        if (enable === void 0) {
          enable = false;
        }
        if (!exports.defaultClient) {
          Logging.warn("Live metrics client cannot be setup without the default client");
          return Configuration2;
        }
        if (!exports.liveMetricsClient && enable) {
          exports.liveMetricsClient = new QuickPulseClient(exports.defaultClient.config, null);
          _performanceLiveMetrics = new AutoCollectPerformance(exports.liveMetricsClient, 1e3, true);
          exports.liveMetricsClient.addCollector(_performanceLiveMetrics);
          exports.defaultClient.quickPulseClient = exports.liveMetricsClient;
        } else if (exports.liveMetricsClient) {
          exports.liveMetricsClient.enable(enable);
        }
        _isSendingLiveMetrics = enable;
        return Configuration2;
      };
      Configuration2.start = start;
      return Configuration2;
    }();
    exports.Configuration = Configuration;
    function dispose() {
      CorrelationIdManager.w3cEnabled = true;
      exports.defaultClient = null;
      _isStarted = false;
      if (_console) {
        _console.dispose();
      }
      if (_exceptions) {
        _exceptions.dispose();
      }
      if (_performance) {
        _performance.dispose();
      }
      if (_preAggregatedMetrics) {
        _preAggregatedMetrics.dispose();
      }
      if (_heartbeat) {
        _heartbeat.dispose();
      }
      if (_nativePerformance) {
        _nativePerformance.dispose();
      }
      if (_serverRequests) {
        _serverRequests.dispose();
      }
      if (_clientRequests) {
        _clientRequests.dispose();
      }
      if (exports.liveMetricsClient) {
        exports.liveMetricsClient.enable(false);
        _isSendingLiveMetrics = false;
        exports.liveMetricsClient = void 0;
      }
    }
    exports.dispose = dispose;
  }
});

// src/node/telemetryReporter.ts
__export(exports, {
  default: () => TelemetryReporter
});
var os = __toModule(require("os"));
var vscode2 = __toModule(require("vscode"));
var appInsights = __toModule(require_applicationinsights());

// src/common/baseTelemetryReporter.ts
var vscode = __toModule(require("vscode"));
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

// src/node/telemetryReporter.ts
var AppInsightsAppender = class {
  constructor(key) {
    if (appInsights.defaultClient) {
      this._appInsightsClient = new appInsights.TelemetryClient(key);
      this._appInsightsClient.channel.setUseDiskRetryCaching(true);
    } else {
      appInsights.setup(key).setAutoCollectRequests(false).setAutoCollectPerformance(false).setAutoCollectExceptions(false).setAutoCollectDependencies(false).setAutoDependencyCorrelation(false).setAutoCollectConsole(false).setUseDiskRetryCaching(true).start();
      this._appInsightsClient = appInsights.defaultClient;
    }
    if (vscode2 && vscode2.env) {
      this._appInsightsClient.context.tags[this._appInsightsClient.context.keys.userId] = vscode2.env.machineId;
      this._appInsightsClient.context.tags[this._appInsightsClient.context.keys.sessionId] = vscode2.env.sessionId;
    }
    if (key && key.indexOf("AIF-") === 0) {
      this._appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
    }
  }
  logEvent(eventName, data) {
    if (!this._appInsightsClient) {
      return;
    }
    this._appInsightsClient.trackEvent({
      name: eventName,
      properties: data.properties,
      measurements: data.measurements
    });
  }
  logException(exception, data) {
    if (!this._appInsightsClient) {
      return;
    }
    this._appInsightsClient.trackException({
      exception,
      properties: data.properties,
      measurements: data.measurements
    });
  }
  flush() {
    if (this._appInsightsClient) {
      this._appInsightsClient.flush();
      this._appInsightsClient = void 0;
    }
    return Promise.resolve(void 0);
  }
};
var TelemetryReporter = class extends BaseTelemtryReporter {
  constructor(extensionId, extensionVersion, key, firstParty) {
    const appender = new AppInsightsAppender(key);
    if (key && key.indexOf("AIF-") === 0) {
      firstParty = true;
    }
    super(extensionId, extensionVersion, appender, { release: os.release(), platform: os.platform() }, firstParty);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=telemetryReporter.node.js.map
