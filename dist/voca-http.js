(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.voca = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * @method vocaCreate
   * @desc This is create request for the fetch service.
   *       Create a HTTP instance from that and pass the required options
   *       ================== BASE METHOD ==================
   */
  var vocaCreate = function vocaCreate(fetch) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$onError = _ref.onError,
        onError = _ref$onError === void 0 ? function (reason) {
      return Promise.reject(reason);
    } : _ref$onError,
        _ref$onRequest = _ref.onRequest,
        onRequest = _ref$onRequest === void 0 ? function (options) {
      return options;
    } : _ref$onRequest,
        _ref$onRequestError = _ref.onRequestError,
        onRequestError = _ref$onRequestError === void 0 ? onError : _ref$onRequestError,
        _ref$onResponse = _ref.onResponse,
        onResponse = _ref$onResponse === void 0 ? function (response) {
      return Promise.resolve(response);
    } : _ref$onResponse,
        _ref$onResponseError = _ref.onResponseError,
        onResponseError = _ref$onResponseError === void 0 ? onError : _ref$onResponseError;

    return function () {
      try {
        var options = onRequest.apply(void 0, arguments);
        return fetch(options.url, options).then(onResponse)["catch"](onResponseError);
      } catch (reason) {
        return onRequestError(reason);
      }
    };
  };

  var HttpBase = /*#__PURE__*/function () {
    function HttpBase() {
      _classCallCheck(this, HttpBase);

      this.httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    }

    _createClass(HttpBase, [{
      key: "getEnv",
      value: function getEnv() {
        if (typeof window !== 'undefined') {
          return window;
        }

        if (typeof global !== 'undefined') {
          return global;
        }
      }
    }, {
      key: "getHttpMethods",
      value: function getHttpMethods() {
        return this.httpMethods;
      }
    }]);

    return HttpBase;
  }();

  var Call = /*#__PURE__*/function () {
    function Call(args) {
      _classCallCheck(this, Call);

      this.base = new HttpBase();
      this.uri = args[1];
      this.vocaInstance = this._vocaItem();

      if (args.includes('GET')) {
        return this.vocaInstance('GET', this.uri);
      }

      if (args.includes('POST')) {
        return this.vocaInstance('POST', this.uri, args[2]);
      }
    }

    _createClass(Call, [{
      key: "_vocaItem",
      value: function _vocaItem() {
        return vocaCreate(this.base.getEnv().fetch, {
          onRequest: function onRequest(method, route) {
            var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
            return {
              url: "".concat(route),
              body: JSON.stringify(data),
              method: method
            };
          },
          onResponse: function onResponse(response) {
            if (response.status === 403) throw new Error('Authorization error.');
            return response.json();
          },
          onError: function onError() {
            return Promise.reject();
          }
        });
      }
    }]);

    return Call;
  }();

  var voca = {
    get: function get() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Call(['GET'].concat(args));
    },
    post: function post() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new Call(['POST'].concat(args));
    },
    create: vocaCreate
  };

  exports.voca = voca;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
