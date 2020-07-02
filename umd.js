(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.voca = {}));
}(this, (function (exports) { 'use strict';

  /**
   * @method vocaCreate
   * @desc This is create request for the fetch service.
   *       Create a HTTP instance from that and pass the required options
   *       ================== BASE METHOD ==================
   */
  const vocaCreate = (
      fetch,
      {
        onError = (reason) => Promise.reject(reason),
        onRequest = (options) => options,
        onRequestError = onError,
        onResponse = (response) => Promise.resolve(response),
        onResponseError = onError,
      } = {},
    ) => {
      return (...args) => {
        try {
          const options = onRequest(...args);
          return fetch(options.url, options).then(onResponse).catch(onResponseError);
        } catch (reason) {
          return onRequestError(reason);
        }
      };
  };


  class HttpBase{
      constructor() {
          this.httpMethods = [ 'GET', 'POST', 'PUT', 'DELETE'];
      }

      getEnv() {
          if (typeof window !== 'undefined') {
              return window;
          }
          if (typeof global !== 'undefined') {
              return global;
          }
      }

      getHttpMethods(){
          return this.httpMethods;
      }
  }


  class Call{
      constructor(args) {
          this.base = new HttpBase();
          this.uri = args[1];
          this.vocaInstance = this._vocaItem();

          if(args.includes('GET')){
              return this.vocaInstance('GET', this.uri);
          }

          if(args.includes('POST')){
              return this.vocaInstance('POST', this.uri, args[2]);
          }
      }

      _vocaItem() {
          return vocaCreate(this.base.getEnv().fetch, {
              onRequest: (method, route, data = undefined) => ({
                url: `${route}`,
                body: JSON.stringify(data),
                method,
              }),
              onResponse: (response) => {
                if (response.status === 403) throw new Error('Authorization error.');
                return response.json();
              },
              onError: () => {
                return Promise.reject();
              },
          });
      }
  }


  const voca = {
      get: (...args) => new Call(['GET', ...args]),
      post: (...args) => new Call(['POST', ...args]),
      create: vocaCreate
  };

  exports.voca = voca;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
