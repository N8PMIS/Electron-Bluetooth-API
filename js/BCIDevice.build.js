window.Blue = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = "/packed/"; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 32));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var root_1 = __webpack_require__(2);
      var toSubscriber_1 = __webpack_require__(35);
      var observable_1 = __webpack_require__(8);
      var pipe_1 = __webpack_require__(37);
      /**
       * A representation of any set of values over any amount of time. This is the most basic building block
       * of RxJS.
       *
       * @class Observable<T>
       */
      var Observable = (function() {
        /**
         * @constructor
         * @param {Function} subscribe the function that is called when the Observable is
         * initially subscribed to. This function is given a Subscriber, to which new values
         * can be `next`ed, or an `error` method can be called to raise an error, or
         * `complete` can be called to notify of a successful completion.
         */
        function Observable(subscribe) {
          this._isScalar = false;
          if (subscribe) {
            this._subscribe = subscribe;
          }
        }
        /**
         * Creates a new Observable, with this Observable as the source, and the passed
         * operator defined as the new observable's operator.
         * @method lift
         * @param {Operator} operator the operator defining the operation to take on the observable
         * @return {Observable} a new observable with the Operator applied
         */
        Observable.prototype.lift = function(operator) {
          var observable = new Observable();
          observable.source = this;
          observable.operator = operator;
          return observable;
        };
        /**
         * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
         *
         * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
         *
         * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
         * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
         * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
         * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
         * thought.
         *
         * Apart from starting the execution of an Observable, this method allows you to listen for values
         * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
         * following ways.
         *
         * The first way is creating an object that implements {@link Observer} interface. It should have methods
         * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
         * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
         * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
         * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
         * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
         * be left uncaught.
         *
         * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
         * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
         * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
         * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
         * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
         * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
         *
         * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
         * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
         * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
         * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
         *
         * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
         * It is an Observable itself that decides when these functions will be called. For example {@link of}
         * by default emits all its values synchronously. Always check documentation for how given Observable
         * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
         *
         * @example <caption>Subscribe with an Observer</caption>
         * const sumObserver = {
         *   sum: 0,
         *   next(value) {
         *     console.log('Adding: ' + value);
         *     this.sum = this.sum + value;
         *   },
         *   error() { // We actually could just remove this method,
         *   },        // since we do not really care about errors right now.
         *   complete() {
         *     console.log('Sum equals: ' + this.sum);
         *   }
         * };
         *
         * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
         * .subscribe(sumObserver);
         *
         * // Logs:
         * // "Adding: 1"
         * // "Adding: 2"
         * // "Adding: 3"
         * // "Sum equals: 6"
         *
         *
         * @example <caption>Subscribe with functions</caption>
         * let sum = 0;
         *
         * Rx.Observable.of(1, 2, 3)
         * .subscribe(
         *   function(value) {
         *     console.log('Adding: ' + value);
         *     sum = sum + value;
         *   },
         *   undefined,
         *   function() {
         *     console.log('Sum equals: ' + sum);
         *   }
         * );
         *
         * // Logs:
         * // "Adding: 1"
         * // "Adding: 2"
         * // "Adding: 3"
         * // "Sum equals: 6"
         *
         *
         * @example <caption>Cancel a subscription</caption>
         * const subscription = Rx.Observable.interval(1000).subscribe(
         *   num => console.log(num),
         *   undefined,
         *   () => console.log('completed!') // Will not be called, even
         * );                                // when cancelling subscription
         *
         *
         * setTimeout(() => {
         *   subscription.unsubscribe();
         *   console.log('unsubscribed!');
         * }, 2500);
         *
         * // Logs:
         * // 0 after 1s
         * // 1 after 2s
         * // "unsubscribed!" after 2.5s
         *
         *
         * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
         *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
         *  Observable.
         * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
         *  the error will be thrown as unhandled.
         * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
         * @return {ISubscription} a subscription reference to the registered handlers
         * @method subscribe
         */
        Observable.prototype.subscribe = function(
          observerOrNext,
          error,
          complete
        ) {
          var operator = this.operator;
          var sink = toSubscriber_1.toSubscriber(
            observerOrNext,
            error,
            complete
          );
          if (operator) {
            operator.call(sink, this.source);
          } else {
            sink.add(
              this.source || !sink.syncErrorThrowable
                ? this._subscribe(sink)
                : this._trySubscribe(sink)
            );
          }
          if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
              throw sink.syncErrorValue;
            }
          }
          return sink;
        };
        Observable.prototype._trySubscribe = function(sink) {
          try {
            return this._subscribe(sink);
          } catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
          }
        };
        /**
         * @method forEach
         * @param {Function} next a handler for each value emitted by the observable
         * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
         * @return {Promise} a promise that either resolves on observable completion or
         *  rejects with the handled error
         */
        Observable.prototype.forEach = function(next, PromiseCtor) {
          var _this = this;
          if (!PromiseCtor) {
            if (
              root_1.root.Rx &&
              root_1.root.Rx.config &&
              root_1.root.Rx.config.Promise
            ) {
              PromiseCtor = root_1.root.Rx.config.Promise;
            } else if (root_1.root.Promise) {
              PromiseCtor = root_1.root.Promise;
            }
          }
          if (!PromiseCtor) {
            throw new Error("no Promise impl found");
          }
          return new PromiseCtor(function(resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(
              function(value) {
                if (subscription) {
                  // if there is a subscription, then we can surmise
                  // the next handling is asynchronous. Any errors thrown
                  // need to be rejected explicitly and unsubscribe must be
                  // called manually
                  try {
                    next(value);
                  } catch (err) {
                    reject(err);
                    subscription.unsubscribe();
                  }
                } else {
                  // if there is NO subscription, then we're getting a nexted
                  // value synchronously during subscription. We can just call it.
                  // If it errors, Observable's `subscribe` will ensure the
                  // unsubscription logic is called, then synchronously rethrow the error.
                  // After that, Promise will trap the error and send it
                  // down the rejection path.
                  next(value);
                }
              },
              reject,
              resolve
            );
          });
        };
        Observable.prototype._subscribe = function(subscriber) {
          return this.source.subscribe(subscriber);
        };
        /**
         * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
         * @method Symbol.observable
         * @return {Observable} this instance of the observable
         */
        Observable.prototype[observable_1.observable] = function() {
          return this;
        };
        /* tslint:enable:max-line-length */
        /**
         * Used to stitch together functional operators into a chain.
         * @method pipe
         * @return {Observable} the Observable result of all of the operators having
         * been called in the order they were passed in.
         *
         * @example
         *
         * import { map, filter, scan } from 'rxjs/operators';
         *
         * Rx.Observable.interval(1000)
         *   .pipe(
         *     filter(x => x % 2 === 0),
         *     map(x => x + x),
         *     scan((acc, x) => acc + x)
         *   )
         *   .subscribe(x => console.log(x))
         */
        Observable.prototype.pipe = function() {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
          }
          if (operations.length === 0) {
            return this;
          }
          return pipe_1.pipeFromArray(operations)(this);
        };
        /* tslint:enable:max-line-length */
        Observable.prototype.toPromise = function(PromiseCtor) {
          var _this = this;
          if (!PromiseCtor) {
            if (
              root_1.root.Rx &&
              root_1.root.Rx.config &&
              root_1.root.Rx.config.Promise
            ) {
              PromiseCtor = root_1.root.Rx.config.Promise;
            } else if (root_1.root.Promise) {
              PromiseCtor = root_1.root.Promise;
            }
          }
          if (!PromiseCtor) {
            throw new Error("no Promise impl found");
          }
          return new PromiseCtor(function(resolve, reject) {
            var value;
            _this.subscribe(
              function(x) {
                return (value = x);
              },
              function(err) {
                return reject(err);
              },
              function() {
                return resolve(value);
              }
            );
          });
        };
        // HACK: Since TypeScript inherits static properties too, we have to
        // fight against TypeScript here so Subject can have a different static create signature
        /**
         * Creates a new cold Observable by calling the Observable constructor
         * @static true
         * @owner Observable
         * @method create
         * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
         * @return {Observable} a new cold observable
         */
        Observable.create = function(subscribe) {
          return new Observable(subscribe);
        };
        return Observable;
      })();
      exports.Observable = Observable;
      //# sourceMappingURL=Observable.js.map

      /***/
    },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var isFunction_1 = __webpack_require__(5);
      var Subscription_1 = __webpack_require__(3);
      var Observer_1 = __webpack_require__(19);
      var rxSubscriber_1 = __webpack_require__(7);
      /**
       * Implements the {@link Observer} interface and extends the
       * {@link Subscription} class. While the {@link Observer} is the public API for
       * consuming the values of an {@link Observable}, all Observers get converted to
       * a Subscriber, in order to provide Subscription-like capabilities such as
       * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
       * implementing operators, but it is rarely used as a public API.
       *
       * @class Subscriber<T>
       */
      var Subscriber = (function(_super) {
        __extends(Subscriber, _super);
        /**
         * @param {Observer|function(value: T): void} [destinationOrNext] A partially
         * defined Observer or a `next` callback function.
         * @param {function(e: ?any): void} [error] The `error` callback of an
         * Observer.
         * @param {function(): void} [complete] The `complete` callback of an
         * Observer.
         */
        function Subscriber(destinationOrNext, error, complete) {
          _super.call(this);
          this.syncErrorValue = null;
          this.syncErrorThrown = false;
          this.syncErrorThrowable = false;
          this.isStopped = false;
          switch (arguments.length) {
            case 0:
              this.destination = Observer_1.empty;
              break;
            case 1:
              if (!destinationOrNext) {
                this.destination = Observer_1.empty;
                break;
              }
              if (typeof destinationOrNext === "object") {
                if (destinationOrNext instanceof Subscriber) {
                  this.syncErrorThrowable =
                    destinationOrNext.syncErrorThrowable;
                  this.destination = destinationOrNext;
                  this.destination.add(this);
                } else {
                  this.syncErrorThrowable = true;
                  this.destination = new SafeSubscriber(
                    this,
                    destinationOrNext
                  );
                }
                break;
              }
            default:
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(
                this,
                destinationOrNext,
                error,
                complete
              );
              break;
          }
        }
        Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function() {
          return this;
        };
        /**
         * A static factory for a Subscriber, given a (potentially partial) definition
         * of an Observer.
         * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
         * @param {function(e: ?any): void} [error] The `error` callback of an
         * Observer.
         * @param {function(): void} [complete] The `complete` callback of an
         * Observer.
         * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
         * Observer represented by the given arguments.
         */
        Subscriber.create = function(next, error, complete) {
          var subscriber = new Subscriber(next, error, complete);
          subscriber.syncErrorThrowable = false;
          return subscriber;
        };
        /**
         * The {@link Observer} callback to receive notifications of type `next` from
         * the Observable, with a value. The Observable may call this method 0 or more
         * times.
         * @param {T} [value] The `next` value.
         * @return {void}
         */
        Subscriber.prototype.next = function(value) {
          if (!this.isStopped) {
            this._next(value);
          }
        };
        /**
         * The {@link Observer} callback to receive notifications of type `error` from
         * the Observable, with an attached {@link Error}. Notifies the Observer that
         * the Observable has experienced an error condition.
         * @param {any} [err] The `error` exception.
         * @return {void}
         */
        Subscriber.prototype.error = function(err) {
          if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
          }
        };
        /**
         * The {@link Observer} callback to receive a valueless notification of type
         * `complete` from the Observable. Notifies the Observer that the Observable
         * has finished sending push-based notifications.
         * @return {void}
         */
        Subscriber.prototype.complete = function() {
          if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
          }
        };
        Subscriber.prototype.unsubscribe = function() {
          if (this.closed) {
            return;
          }
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
        };
        Subscriber.prototype._next = function(value) {
          this.destination.next(value);
        };
        Subscriber.prototype._error = function(err) {
          this.destination.error(err);
          this.unsubscribe();
        };
        Subscriber.prototype._complete = function() {
          this.destination.complete();
          this.unsubscribe();
        };
        Subscriber.prototype._unsubscribeAndRecycle = function() {
          var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
          this._parent = null;
          this._parents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parent = _parent;
          this._parents = _parents;
          return this;
        };
        return Subscriber;
      })(Subscription_1.Subscription);
      exports.Subscriber = Subscriber;
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var SafeSubscriber = (function(_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(
          _parentSubscriber,
          observerOrNext,
          error,
          complete
        ) {
          _super.call(this);
          this._parentSubscriber = _parentSubscriber;
          var next;
          var context = this;
          if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
          } else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
              context = Object.create(observerOrNext);
              if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
              }
              context.unsubscribe = this.unsubscribe.bind(this);
            }
          }
          this._context = context;
          this._next = next;
          this._error = error;
          this._complete = complete;
        }
        SafeSubscriber.prototype.next = function(value) {
          if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._next, value);
            } else if (
              this.__tryOrSetError(_parentSubscriber, this._next, value)
            ) {
              this.unsubscribe();
            }
          }
        };
        SafeSubscriber.prototype.error = function(err) {
          if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
              if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._error, err);
                this.unsubscribe();
              } else {
                this.__tryOrSetError(_parentSubscriber, this._error, err);
                this.unsubscribe();
              }
            } else if (!_parentSubscriber.syncErrorThrowable) {
              this.unsubscribe();
              throw err;
            } else {
              _parentSubscriber.syncErrorValue = err;
              _parentSubscriber.syncErrorThrown = true;
              this.unsubscribe();
            }
          }
        };
        SafeSubscriber.prototype.complete = function() {
          var _this = this;
          if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
              var wrappedComplete = function() {
                return _this._complete.call(_this._context);
              };
              if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(wrappedComplete);
                this.unsubscribe();
              } else {
                this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                this.unsubscribe();
              }
            } else {
              this.unsubscribe();
            }
          }
        };
        SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
          try {
            fn.call(this._context, value);
          } catch (err) {
            this.unsubscribe();
            throw err;
          }
        };
        SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
          try {
            fn.call(this._context, value);
          } catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
          }
          return false;
        };
        SafeSubscriber.prototype._unsubscribe = function() {
          var _parentSubscriber = this._parentSubscriber;
          this._context = null;
          this._parentSubscriber = null;
          _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber;
      })(Subscriber);
      //# sourceMappingURL=Subscriber.js.map

      /***/
    },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(global) {
        // CommonJS / Node have global context exposed as "global" variable.
        // We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
        // the global "global" var for now.
        var __window = typeof window !== "undefined" && window;
        var __self =
          typeof self !== "undefined" &&
          typeof WorkerGlobalScope !== "undefined" &&
          self instanceof WorkerGlobalScope &&
          self;
        var __global = typeof global !== "undefined" && global;
        var _root = __window || __global || __self;
        exports.root = _root;
        // Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
        // This is needed when used with angular/tsickle which inserts a goog.module statement.
        // Wrap in IIFE
        (function() {
          if (!_root) {
            throw new Error(
              "RxJS could not find any global context (window, self, global)"
            );
          }
        })();
        //# sourceMappingURL=root.js.map
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(34)));

      /***/
    },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var isArray_1 = __webpack_require__(16);
      var isObject_1 = __webpack_require__(17);
      var isFunction_1 = __webpack_require__(5);
      var tryCatch_1 = __webpack_require__(18);
      var errorObject_1 = __webpack_require__(6);
      var UnsubscriptionError_1 = __webpack_require__(36);
      /**
       * Represents a disposable resource, such as the execution of an Observable. A
       * Subscription has one important method, `unsubscribe`, that takes no argument
       * and just disposes the resource held by the subscription.
       *
       * Additionally, subscriptions may be grouped together through the `add()`
       * method, which will attach a child Subscription to the current Subscription.
       * When a Subscription is unsubscribed, all its children (and its grandchildren)
       * will be unsubscribed as well.
       *
       * @class Subscription
       */
      var Subscription = (function() {
        /**
         * @param {function(): void} [unsubscribe] A function describing how to
         * perform the disposal of resources when the `unsubscribe` method is called.
         */
        function Subscription(unsubscribe) {
          /**
           * A flag to indicate whether this Subscription has already been unsubscribed.
           * @type {boolean}
           */
          this.closed = false;
          this._parent = null;
          this._parents = null;
          this._subscriptions = null;
          if (unsubscribe) {
            this._unsubscribe = unsubscribe;
          }
        }
        /**
         * Disposes the resources held by the subscription. May, for instance, cancel
         * an ongoing Observable execution or cancel any other type of work that
         * started when the Subscription was created.
         * @return {void}
         */
        Subscription.prototype.unsubscribe = function() {
          var hasErrors = false;
          var errors;
          if (this.closed) {
            return;
          }
          var _a = this,
            _parent = _a._parent,
            _parents = _a._parents,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;
          this.closed = true;
          this._parent = null;
          this._parents = null;
          // null out _subscriptions first so any child subscriptions that attempt
          // to remove themselves from this subscription will noop
          this._subscriptions = null;
          var index = -1;
          var len = _parents ? _parents.length : 0;
          // if this._parent is null, then so is this._parents, and we
          // don't have to remove ourselves from any parent subscriptions.
          while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = (++index < len && _parents[index]) || null;
          }
          if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
              hasErrors = true;
              errors =
                errors ||
                (errorObject_1.errorObject.e instanceof
                UnsubscriptionError_1.UnsubscriptionError
                  ? flattenUnsubscriptionErrors(
                      errorObject_1.errorObject.e.errors
                    )
                  : [errorObject_1.errorObject.e]);
            }
          }
          if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
              var sub = _subscriptions[index];
              if (isObject_1.isObject(sub)) {
                var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                if (trial === errorObject_1.errorObject) {
                  hasErrors = true;
                  errors = errors || [];
                  var err = errorObject_1.errorObject.e;
                  if (
                    err instanceof UnsubscriptionError_1.UnsubscriptionError
                  ) {
                    errors = errors.concat(
                      flattenUnsubscriptionErrors(err.errors)
                    );
                  } else {
                    errors.push(err);
                  }
                }
              }
            }
          }
          if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
          }
        };
        /**
         * Adds a tear down to be called during the unsubscribe() of this
         * Subscription.
         *
         * If the tear down being added is a subscription that is already
         * unsubscribed, is the same reference `add` is being called on, or is
         * `Subscription.EMPTY`, it will not be added.
         *
         * If this subscription is already in an `closed` state, the passed
         * tear down logic will be executed immediately.
         *
         * @param {TeardownLogic} teardown The additional logic to execute on
         * teardown.
         * @return {Subscription} Returns the Subscription used or created to be
         * added to the inner subscriptions list. This Subscription can be used with
         * `remove()` to remove the passed teardown logic from the inner subscriptions
         * list.
         */
        Subscription.prototype.add = function(teardown) {
          if (!teardown || teardown === Subscription.EMPTY) {
            return Subscription.EMPTY;
          }
          if (teardown === this) {
            return this;
          }
          var subscription = teardown;
          switch (typeof teardown) {
            case "function":
              subscription = new Subscription(teardown);
            case "object":
              if (
                subscription.closed ||
                typeof subscription.unsubscribe !== "function"
              ) {
                return subscription;
              } else if (this.closed) {
                subscription.unsubscribe();
                return subscription;
              } else if (
                typeof subscription._addParent !== "function" /* quack quack */
              ) {
                var tmp = subscription;
                subscription = new Subscription();
                subscription._subscriptions = [tmp];
              }
              break;
            default:
              throw new Error(
                "unrecognized teardown " + teardown + " added to Subscription."
              );
          }
          var subscriptions = this._subscriptions || (this._subscriptions = []);
          subscriptions.push(subscription);
          subscription._addParent(this);
          return subscription;
        };
        /**
         * Removes a Subscription from the internal list of subscriptions that will
         * unsubscribe during the unsubscribe process of this Subscription.
         * @param {Subscription} subscription The subscription to remove.
         * @return {void}
         */
        Subscription.prototype.remove = function(subscription) {
          var subscriptions = this._subscriptions;
          if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
              subscriptions.splice(subscriptionIndex, 1);
            }
          }
        };
        Subscription.prototype._addParent = function(parent) {
          var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
          if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
          } else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
          } else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
          }
        };
        Subscription.EMPTY = (function(empty) {
          empty.closed = true;
          return empty;
        })(new Subscription());
        return Subscription;
      })();
      exports.Subscription = Subscription;
      function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function(errs, err) {
          return errs.concat(
            err instanceof UnsubscriptionError_1.UnsubscriptionError
              ? err.errors
              : err
          );
        }, []);
      }
      //# sourceMappingURL=Subscription.js.map

      /***/
    },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Observable_1 = __webpack_require__(0);
      var Subscriber_1 = __webpack_require__(1);
      var Subscription_1 = __webpack_require__(3);
      var ObjectUnsubscribedError_1 = __webpack_require__(20);
      var SubjectSubscription_1 = __webpack_require__(39);
      var rxSubscriber_1 = __webpack_require__(7);
      /**
       * @class SubjectSubscriber<T>
       */
      var SubjectSubscriber = (function(_super) {
        __extends(SubjectSubscriber, _super);
        function SubjectSubscriber(destination) {
          _super.call(this, destination);
          this.destination = destination;
        }
        return SubjectSubscriber;
      })(Subscriber_1.Subscriber);
      exports.SubjectSubscriber = SubjectSubscriber;
      /**
       * @class Subject<T>
       */
      var Subject = (function(_super) {
        __extends(Subject, _super);
        function Subject() {
          _super.call(this);
          this.observers = [];
          this.closed = false;
          this.isStopped = false;
          this.hasError = false;
          this.thrownError = null;
        }
        Subject.prototype[rxSubscriber_1.rxSubscriber] = function() {
          return new SubjectSubscriber(this);
        };
        Subject.prototype.lift = function(operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
        };
        Subject.prototype.next = function(value) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
              copy[i].next(value);
            }
          }
        };
        Subject.prototype.error = function(err) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          this.hasError = true;
          this.thrownError = err;
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
            copy[i].error(err);
          }
          this.observers.length = 0;
        };
        Subject.prototype.complete = function() {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
            copy[i].complete();
          }
          this.observers.length = 0;
        };
        Subject.prototype.unsubscribe = function() {
          this.isStopped = true;
          this.closed = true;
          this.observers = null;
        };
        Subject.prototype._trySubscribe = function(subscriber) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else {
            return _super.prototype._trySubscribe.call(this, subscriber);
          }
        };
        Subject.prototype._subscribe = function(subscriber) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
          } else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
          } else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(
              this,
              subscriber
            );
          }
        };
        Subject.prototype.asObservable = function() {
          var observable = new Observable_1.Observable();
          observable.source = this;
          return observable;
        };
        Subject.create = function(destination, source) {
          return new AnonymousSubject(destination, source);
        };
        return Subject;
      })(Observable_1.Observable);
      exports.Subject = Subject;
      /**
       * @class AnonymousSubject<T>
       */
      var AnonymousSubject = (function(_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
          _super.call(this);
          this.destination = destination;
          this.source = source;
        }
        AnonymousSubject.prototype.next = function(value) {
          var destination = this.destination;
          if (destination && destination.next) {
            destination.next(value);
          }
        };
        AnonymousSubject.prototype.error = function(err) {
          var destination = this.destination;
          if (destination && destination.error) {
            this.destination.error(err);
          }
        };
        AnonymousSubject.prototype.complete = function() {
          var destination = this.destination;
          if (destination && destination.complete) {
            this.destination.complete();
          }
        };
        AnonymousSubject.prototype._subscribe = function(subscriber) {
          var source = this.source;
          if (source) {
            return this.source.subscribe(subscriber);
          } else {
            return Subscription_1.Subscription.EMPTY;
          }
        };
        return AnonymousSubject;
      })(Subject);
      exports.AnonymousSubject = AnonymousSubject;
      //# sourceMappingURL=Subject.js.map

      /***/
    },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      function isFunction(x) {
        return typeof x === "function";
      }
      exports.isFunction = isFunction;
      //# sourceMappingURL=isFunction.js.map

      /***/
    },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      // typeof any so that it we don't have to cast when comparing a result to the error object
      exports.errorObject = { e: {} };
      //# sourceMappingURL=errorObject.js.map

      /***/
    },
    /* 7 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var root_1 = __webpack_require__(2);
      var Symbol = root_1.root.Symbol;
      exports.rxSubscriber =
        typeof Symbol === "function" && typeof Symbol.for === "function"
          ? Symbol.for("rxSubscriber")
          : "@@rxSubscriber";
      /**
       * @deprecated use rxSubscriber instead
       */
      exports.$$rxSubscriber = exports.rxSubscriber;
      //# sourceMappingURL=rxSubscriber.js.map

      /***/
    },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var root_1 = __webpack_require__(2);
      function getSymbolObservable(context) {
        var $$observable;
        var Symbol = context.Symbol;
        if (typeof Symbol === "function") {
          if (Symbol.observable) {
            $$observable = Symbol.observable;
          } else {
            $$observable = Symbol("observable");
            Symbol.observable = $$observable;
          }
        } else {
          $$observable = "@@observable";
        }
        return $$observable;
      }
      exports.getSymbolObservable = getSymbolObservable;
      exports.observable = getSymbolObservable(root_1.root);
      /**
       * @deprecated use observable instead
       */
      exports.$$observable = exports.observable;
      //# sourceMappingURL=observable.js.map

      /***/
    },
    /* 9 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Observable_1 = __webpack_require__(0);
      var ScalarObservable_1 = __webpack_require__(22);
      var EmptyObservable_1 = __webpack_require__(10);
      var isScheduler_1 = __webpack_require__(11);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var ArrayObservable = (function(_super) {
        __extends(ArrayObservable, _super);
        function ArrayObservable(array, scheduler) {
          _super.call(this);
          this.array = array;
          this.scheduler = scheduler;
          if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
          }
        }
        ArrayObservable.create = function(array, scheduler) {
          return new ArrayObservable(array, scheduler);
        };
        /**
         * Creates an Observable that emits some values you specify as arguments,
         * immediately one after the other, and then emits a complete notification.
         *
         * <span class="informal">Emits the arguments you provide, then completes.
         * </span>
         *
         * <img src="./img/of.png" width="100%">
         *
         * This static operator is useful for creating a simple Observable that only
         * emits the arguments given, and the complete notification thereafter. It can
         * be used for composing with other Observables, such as with {@link concat}.
         * By default, it uses a `null` IScheduler, which means the `next`
         * notifications are sent synchronously, although with a different IScheduler
         * it is possible to determine when those notifications will be delivered.
         *
         * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
         * var numbers = Rx.Observable.of(10, 20, 30);
         * var letters = Rx.Observable.of('a', 'b', 'c');
         * var interval = Rx.Observable.interval(1000);
         * var result = numbers.concat(letters).concat(interval);
         * result.subscribe(x => console.log(x));
         *
         * @see {@link create}
         * @see {@link empty}
         * @see {@link never}
         * @see {@link throw}
         *
         * @param {...T} values Arguments that represent `next` values to be emitted.
         * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
         * the emissions of the `next` notifications.
         * @return {Observable<T>} An Observable that emits each given input value.
         * @static true
         * @name of
         * @owner Observable
         */
        ArrayObservable.of = function() {
          var array = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
          }
          var scheduler = array[array.length - 1];
          if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
          } else {
            scheduler = null;
          }
          var len = array.length;
          if (len > 1) {
            return new ArrayObservable(array, scheduler);
          } else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
          } else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
          }
        };
        ArrayObservable.dispatch = function(state) {
          var array = state.array,
            index = state.index,
            count = state.count,
            subscriber = state.subscriber;
          if (index >= count) {
            subscriber.complete();
            return;
          }
          subscriber.next(array[index]);
          if (subscriber.closed) {
            return;
          }
          state.index = index + 1;
          this.schedule(state);
        };
        ArrayObservable.prototype._subscribe = function(subscriber) {
          var index = 0;
          var array = this.array;
          var count = array.length;
          var scheduler = this.scheduler;
          if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
              array: array,
              index: index,
              count: count,
              subscriber: subscriber
            });
          } else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
              subscriber.next(array[i]);
            }
            subscriber.complete();
          }
        };
        return ArrayObservable;
      })(Observable_1.Observable);
      exports.ArrayObservable = ArrayObservable;
      //# sourceMappingURL=ArrayObservable.js.map

      /***/
    },
    /* 10 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Observable_1 = __webpack_require__(0);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var EmptyObservable = (function(_super) {
        __extends(EmptyObservable, _super);
        function EmptyObservable(scheduler) {
          _super.call(this);
          this.scheduler = scheduler;
        }
        /**
         * Creates an Observable that emits no items to the Observer and immediately
         * emits a complete notification.
         *
         * <span class="informal">Just emits 'complete', and nothing else.
         * </span>
         *
         * <img src="./img/empty.png" width="100%">
         *
         * This static operator is useful for creating a simple Observable that only
         * emits the complete notification. It can be used for composing with other
         * Observables, such as in a {@link mergeMap}.
         *
         * @example <caption>Emit the number 7, then complete.</caption>
         * var result = Rx.Observable.empty().startWith(7);
         * result.subscribe(x => console.log(x));
         *
         * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
         * var interval = Rx.Observable.interval(1000);
         * var result = interval.mergeMap(x =>
         *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
         * );
         * result.subscribe(x => console.log(x));
         *
         * // Results in the following to the console:
         * // x is equal to the count on the interval eg(0,1,2,3,...)
         * // x will occur every 1000ms
         * // if x % 2 is equal to 1 print abc
         * // if x % 2 is not equal to 1 nothing will be output
         *
         * @see {@link create}
         * @see {@link never}
         * @see {@link of}
         * @see {@link throw}
         *
         * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
         * the emission of the complete notification.
         * @return {Observable} An "empty" Observable: emits only the complete
         * notification.
         * @static true
         * @name empty
         * @owner Observable
         */
        EmptyObservable.create = function(scheduler) {
          return new EmptyObservable(scheduler);
        };
        EmptyObservable.dispatch = function(arg) {
          var subscriber = arg.subscriber;
          subscriber.complete();
        };
        EmptyObservable.prototype._subscribe = function(subscriber) {
          var scheduler = this.scheduler;
          if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, {
              subscriber: subscriber
            });
          } else {
            subscriber.complete();
          }
        };
        return EmptyObservable;
      })(Observable_1.Observable);
      exports.EmptyObservable = EmptyObservable;
      //# sourceMappingURL=EmptyObservable.js.map

      /***/
    },
    /* 11 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      function isScheduler(value) {
        return value && typeof value.schedule === "function";
      }
      exports.isScheduler = isScheduler;
      //# sourceMappingURL=isScheduler.js.map

      /***/
    },
    /* 12 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var subscribeToResult_1 = __webpack_require__(24);
      var OuterSubscriber_1 = __webpack_require__(27);
      /* tslint:enable:max-line-length */
      /**
       * Projects each source value to an Observable which is merged in the output
       * Observable.
       *
       * <span class="informal">Maps each value to an Observable, then flattens all of
       * these inner Observables using {@link mergeAll}.</span>
       *
       * <img src="./img/mergeMap.png" width="100%">
       *
       * Returns an Observable that emits items based on applying a function that you
       * supply to each item emitted by the source Observable, where that function
       * returns an Observable, and then merging those resulting Observables and
       * emitting the results of this merger.
       *
       * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
       * var letters = Rx.Observable.of('a', 'b', 'c');
       * var result = letters.mergeMap(x =>
       *   Rx.Observable.interval(1000).map(i => x+i)
       * );
       * result.subscribe(x => console.log(x));
       *
       * // Results in the following:
       * // a0
       * // b0
       * // c0
       * // a1
       * // b1
       * // c1
       * // continues to list a,b,c with respective ascending integers
       *
       * @see {@link concatMap}
       * @see {@link exhaustMap}
       * @see {@link merge}
       * @see {@link mergeAll}
       * @see {@link mergeMapTo}
       * @see {@link mergeScan}
       * @see {@link switchMap}
       *
       * @param {function(value: T, ?index: number): ObservableInput} project A function
       * that, when applied to an item emitted by the source Observable, returns an
       * Observable.
       * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
       * A function to produce the value on the output Observable based on the values
       * and the indices of the source (outer) emission and the inner Observable
       * emission. The arguments passed to this function are:
       * - `outerValue`: the value that came from the source
       * - `innerValue`: the value that came from the projected Observable
       * - `outerIndex`: the "index" of the value that came from the source
       * - `innerIndex`: the "index" of the value from the projected Observable
       * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
       * Observables being subscribed to concurrently.
       * @return {Observable} An Observable that emits the result of applying the
       * projection function (and the optional `resultSelector`) to each item emitted
       * by the source Observable and merging the results of the Observables obtained
       * from this transformation.
       * @method mergeMap
       * @owner Observable
       */
      function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        return function mergeMapOperatorFunction(source) {
          if (typeof resultSelector === "number") {
            concurrent = resultSelector;
            resultSelector = null;
          }
          return source.lift(
            new MergeMapOperator(project, resultSelector, concurrent)
          );
        };
      }
      exports.mergeMap = mergeMap;
      var MergeMapOperator = (function() {
        function MergeMapOperator(project, resultSelector, concurrent) {
          if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
          }
          this.project = project;
          this.resultSelector = resultSelector;
          this.concurrent = concurrent;
        }
        MergeMapOperator.prototype.call = function(observer, source) {
          return source.subscribe(
            new MergeMapSubscriber(
              observer,
              this.project,
              this.resultSelector,
              this.concurrent
            )
          );
        };
        return MergeMapOperator;
      })();
      exports.MergeMapOperator = MergeMapOperator;
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var MergeMapSubscriber = (function(_super) {
        __extends(MergeMapSubscriber, _super);
        function MergeMapSubscriber(
          destination,
          project,
          resultSelector,
          concurrent
        ) {
          if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
          }
          _super.call(this, destination);
          this.project = project;
          this.resultSelector = resultSelector;
          this.concurrent = concurrent;
          this.hasCompleted = false;
          this.buffer = [];
          this.active = 0;
          this.index = 0;
        }
        MergeMapSubscriber.prototype._next = function(value) {
          if (this.active < this.concurrent) {
            this._tryNext(value);
          } else {
            this.buffer.push(value);
          }
        };
        MergeMapSubscriber.prototype._tryNext = function(value) {
          var result;
          var index = this.index++;
          try {
            result = this.project(value, index);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.active++;
          this._innerSub(result, value, index);
        };
        MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
          this.add(
            subscribeToResult_1.subscribeToResult(this, ish, value, index)
          );
        };
        MergeMapSubscriber.prototype._complete = function() {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
          }
        };
        MergeMapSubscriber.prototype.notifyNext = function(
          outerValue,
          innerValue,
          outerIndex,
          innerIndex,
          innerSub
        ) {
          if (this.resultSelector) {
            this._notifyResultSelector(
              outerValue,
              innerValue,
              outerIndex,
              innerIndex
            );
          } else {
            this.destination.next(innerValue);
          }
        };
        MergeMapSubscriber.prototype._notifyResultSelector = function(
          outerValue,
          innerValue,
          outerIndex,
          innerIndex
        ) {
          var result;
          try {
            result = this.resultSelector(
              outerValue,
              innerValue,
              outerIndex,
              innerIndex
            );
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(result);
        };
        MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
          var buffer = this.buffer;
          this.remove(innerSub);
          this.active--;
          if (buffer.length > 0) {
            this._next(buffer.shift());
          } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
          }
        };
        return MergeMapSubscriber;
      })(OuterSubscriber_1.OuterSubscriber);
      exports.MergeMapSubscriber = MergeMapSubscriber;
      //# sourceMappingURL=mergeMap.js.map

      /***/
    },
    /* 13 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var root_1 = __webpack_require__(2);
      function symbolIteratorPonyfill(root) {
        var Symbol = root.Symbol;
        if (typeof Symbol === "function") {
          if (!Symbol.iterator) {
            Symbol.iterator = Symbol("iterator polyfill");
          }
          return Symbol.iterator;
        } else {
          // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
          var Set_1 = root.Set;
          if (Set_1 && typeof new Set_1()["@@iterator"] === "function") {
            return "@@iterator";
          }
          var Map_1 = root.Map;
          // required for compatability with es6-shim
          if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
              if (
                key !== "entries" &&
                key !== "size" &&
                Map_1.prototype[key] === Map_1.prototype["entries"]
              ) {
                return key;
              }
            }
          }
          return "@@iterator";
        }
      }
      exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
      exports.iterator = symbolIteratorPonyfill(root_1.root);
      /**
       * @deprecated use iterator instead
       */
      exports.$$iterator = exports.iterator;
      //# sourceMappingURL=iterator.js.map

      /***/
    },
    /* 14 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      /**
       * Applies a given `project` function to each value emitted by the source
       * Observable, and emits the resulting values as an Observable.
       *
       * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
       * it passes each source value through a transformation function to get
       * corresponding output values.</span>
       *
       * <img src="./img/map.png" width="100%">
       *
       * Similar to the well known `Array.prototype.map` function, this operator
       * applies a projection to each value and emits that projection in the output
       * Observable.
       *
       * @example <caption>Map every click to the clientX position of that click</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var positions = clicks.map(ev => ev.clientX);
       * positions.subscribe(x => console.log(x));
       *
       * @see {@link mapTo}
       * @see {@link pluck}
       *
       * @param {function(value: T, index: number): R} project The function to apply
       * to each `value` emitted by the source Observable. The `index` parameter is
       * the number `i` for the i-th emission that has happened since the
       * subscription, starting from the number `0`.
       * @param {any} [thisArg] An optional argument to define what `this` is in the
       * `project` function.
       * @return {Observable<R>} An Observable that emits the values from the source
       * Observable transformed by the given `project` function.
       * @method map
       * @owner Observable
       */
      function map(project, thisArg) {
        return function mapOperation(source) {
          if (typeof project !== "function") {
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          }
          return source.lift(new MapOperator(project, thisArg));
        };
      }
      exports.map = map;
      var MapOperator = (function() {
        function MapOperator(project, thisArg) {
          this.project = project;
          this.thisArg = thisArg;
        }
        MapOperator.prototype.call = function(subscriber, source) {
          return source.subscribe(
            new MapSubscriber(subscriber, this.project, this.thisArg)
          );
        };
        return MapOperator;
      })();
      exports.MapOperator = MapOperator;
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var MapSubscriber = (function(_super) {
        __extends(MapSubscriber, _super);
        function MapSubscriber(destination, project, thisArg) {
          _super.call(this, destination);
          this.project = project;
          this.count = 0;
          this.thisArg = thisArg || this;
        }
        // NOTE: This looks unoptimized, but it's actually purposefully NOT
        // using try/catch optimizations.
        MapSubscriber.prototype._next = function(value) {
          var result;
          try {
            result = this.project.call(this.thisArg, value, this.count++);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(result);
        };
        return MapSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=map.js.map

      /***/
    },
    /* 15 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __awaiter =
        (this && this.__awaiter) ||
        function(thisArg, _arguments, P, generator) {
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
              result.done
                ? resolve(result.value)
                : new P(function(resolve) {
                    resolve(result.value);
                  }).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __generator =
        (this && this.__generator) ||
        function(thisArg, body) {
          var _ = {
              label: 0,
              sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
              (g[Symbol.iterator] = function() {
                return this;
              }),
            g
          );
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [0, t.value];
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
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
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
                    if (t[2]) _.ops.pop();
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
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
      Object.defineProperty(exports, "__esModule", { value: true });
      var BehaviorSubject_1 = __webpack_require__(33);
      var fromEvent_1 = __webpack_require__(21);
      var merge_1 = __webpack_require__(41);
      var filter_1 = __webpack_require__(28);
      var first_1 = __webpack_require__(44);
      var map_1 = __webpack_require__(14);
      var share_1 = __webpack_require__(46);
      var take_1 = __webpack_require__(49);
      var muse_parse_1 = __webpack_require__(51);
      var muse_utils_1 = __webpack_require__(54);
      var zip_samples_1 = __webpack_require__(56);
      exports.zipSamples = zip_samples_1.zipSamples;
      exports.MUSE_SERVICE = 0xfe8d;
      var CONTROL_CHARACTERISTIC = "273e0001-4c4d-454d-96be-f03bac821358";
      var TELEMETRY_CHARACTERISTIC = "273e000b-4c4d-454d-96be-f03bac821358";
      var GYROSCOPE_CHARACTERISTIC = "273e0009-4c4d-454d-96be-f03bac821358";
      var ACCELEROMETER_CHARACTERISTIC = "273e000a-4c4d-454d-96be-f03bac821358";
      var EEG_CHARACTERISTICS = [
        "273e0003-4c4d-454d-96be-f03bac821358",
        "273e0004-4c4d-454d-96be-f03bac821358",
        "273e0005-4c4d-454d-96be-f03bac821358",
        "273e0006-4c4d-454d-96be-f03bac821358",
        "273e0007-4c4d-454d-96be-f03bac821358"
      ];
      exports.EEG_FREQUENCY = 256;
      // These names match the characteristics defined in EEG_CHARACTERISTICS above
      exports.channelNames = ["TP9", "AF7", "AF8", "TP10", "AUX"];
      var MuseClient = /** @class */ (function() {
        function MuseClient() {
          this.enableAux = false;
          this.deviceName = "";
          this.connectionStatus = new BehaviorSubject_1.BehaviorSubject(false);
          this.gatt = null;
          this.lastIndex = null;
          this.lastTimestamp = null;
        }
        MuseClient.prototype.connect = function(gatt) {
          return __awaiter(this, void 0, void 0, function() {
            var _this = this;
            var device,
              _a,
              service,
              _b,
              _c,
              telemetryCharacteristic,
              _d,
              gyroscopeCharacteristic,
              _e,
              accelerometerCharacteristic,
              _f,
              eegObservables,
              channelCount,
              _loop_1,
              this_1,
              channelIndex;
            return __generator(this, function(_g) {
              switch (_g.label) {
                case 0:
                  if (!gatt) return [3 /*break*/, 1];
                  this.gatt = gatt;
                  return [3 /*break*/, 4];
                case 1:
                  return [
                    4 /*yield*/,
                    navigator.bluetooth.requestDevice({
                      filters: [{ services: [exports.MUSE_SERVICE] }]
                    })
                  ];
                case 2:
                  device = _g.sent();
                  _a = this;
                  return [4 /*yield*/, device.gatt.connect()];
                case 3:
                  _a.gatt = _g.sent();
                  _g.label = 4;
                case 4:
                  this.deviceName = this.gatt.device.name || null;
                  return [
                    4 /*yield*/,
                    this.gatt.getPrimaryService(exports.MUSE_SERVICE)
                  ];
                case 5:
                  service = _g.sent();
                  fromEvent_1
                    .fromEvent(this.gatt.device, "gattserverdisconnected")
                    .pipe(first_1.first())
                    .subscribe(function() {
                      _this.gatt = null;
                      _this.connectionStatus.next(false);
                    });
                  // Control
                  _b = this;
                  return [
                    4 /*yield*/,
                    service.getCharacteristic(CONTROL_CHARACTERISTIC)
                  ];
                case 6:
                  // Control
                  _b.controlChar = _g.sent();
                  _c = this;
                  return [
                    4 /*yield*/,
                    muse_utils_1.observableCharacteristic(this.controlChar)
                  ];
                case 7:
                  _c.rawControlData = _g.sent().pipe(
                    map_1.map(function(data) {
                      return muse_utils_1.decodeResponse(
                        new Uint8Array(data.buffer)
                      );
                    }),
                    share_1.share()
                  );
                  this.controlResponses = muse_parse_1.parseControl(
                    this.rawControlData
                  );
                  return [
                    4 /*yield*/,
                    service.getCharacteristic(TELEMETRY_CHARACTERISTIC)
                  ];
                case 8:
                  telemetryCharacteristic = _g.sent();
                  _d = this;
                  return [
                    4 /*yield*/,
                    muse_utils_1.observableCharacteristic(
                      telemetryCharacteristic
                    )
                  ];
                case 9:
                  _d.telemetryData = _g
                    .sent()
                    .pipe(map_1.map(muse_parse_1.parseTelemetry));
                  return [
                    4 /*yield*/,
                    service.getCharacteristic(GYROSCOPE_CHARACTERISTIC)
                  ];
                case 10:
                  gyroscopeCharacteristic = _g.sent();
                  _e = this;
                  return [
                    4 /*yield*/,
                    muse_utils_1.observableCharacteristic(
                      gyroscopeCharacteristic
                    )
                  ];
                case 11:
                  _e.gyroscopeData = _g
                    .sent()
                    .pipe(map_1.map(muse_parse_1.parseGyroscope));
                  return [
                    4 /*yield*/,
                    service.getCharacteristic(ACCELEROMETER_CHARACTERISTIC)
                  ];
                case 12:
                  accelerometerCharacteristic = _g.sent();
                  _f = this;
                  return [
                    4 /*yield*/,
                    muse_utils_1.observableCharacteristic(
                      accelerometerCharacteristic
                    )
                  ];
                case 13:
                  _f.accelerometerData = _g
                    .sent()
                    .pipe(map_1.map(muse_parse_1.parseAccelerometer));
                  // EEG
                  this.eegCharacteristics = [];
                  eegObservables = [];
                  channelCount = this.enableAux
                    ? EEG_CHARACTERISTICS.length
                    : 4;
                  _loop_1 = function(channelIndex) {
                    var characteristicId, eegChar, _a, _b;
                    return __generator(this, function(_c) {
                      switch (_c.label) {
                        case 0:
                          characteristicId = EEG_CHARACTERISTICS[channelIndex];
                          return [
                            4 /*yield*/,
                            service.getCharacteristic(characteristicId)
                          ];
                        case 1:
                          eegChar = _c.sent();
                          _b = (_a = eegObservables).push;
                          return [
                            4 /*yield*/,
                            muse_utils_1.observableCharacteristic(eegChar)
                          ];
                        case 2:
                          _b.apply(_a, [
                            _c.sent().pipe(
                              map_1.map(function(data) {
                                var eventIndex = data.getUint16(0);
                                return {
                                  electrode: channelIndex,
                                  index: eventIndex,
                                  samples: muse_parse_1.decodeEEGSamples(
                                    new Uint8Array(data.buffer).subarray(2)
                                  ),
                                  timestamp: _this.getTimestamp(eventIndex)
                                };
                              })
                            )
                          ]);
                          this_1.eegCharacteristics.push(eegChar);
                          return [2 /*return*/];
                      }
                    });
                  };
                  this_1 = this;
                  channelIndex = 0;
                  _g.label = 14;
                case 14:
                  if (!(channelIndex < channelCount)) return [3 /*break*/, 17];
                  return [5 /*yield**/, _loop_1(channelIndex)];
                case 15:
                  _g.sent();
                  _g.label = 16;
                case 16:
                  channelIndex++;
                  return [3 /*break*/, 14];
                case 17:
                  this.eegReadings = merge_1.merge.apply(
                    void 0,
                    eegObservables
                  );
                  this.connectionStatus.next(true);
                  return [2 /*return*/];
              }
            });
          });
        };
        MuseClient.prototype.sendCommand = function(cmd) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.controlChar.writeValue(muse_utils_1.encodeCommand(cmd))
                  ];
                case 1:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        MuseClient.prototype.start = function() {
          return __awaiter(this, void 0, void 0, function() {
            var preset;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4 /*yield*/, this.pause()];
                case 1:
                  _a.sent();
                  preset = this.enableAux ? "p20" : "p21";
                  return [
                    4 /*yield*/,
                    this.controlChar.writeValue(
                      muse_utils_1.encodeCommand(preset)
                    )
                  ];
                case 2:
                  _a.sent();
                  return [
                    4 /*yield*/,
                    this.controlChar.writeValue(muse_utils_1.encodeCommand("s"))
                  ];
                case 3:
                  _a.sent();
                  return [4 /*yield*/, this.resume()];
                case 4:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        MuseClient.prototype.pause = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4 /*yield*/, this.sendCommand("h")];
                case 1:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        MuseClient.prototype.resume = function() {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4 /*yield*/, this.sendCommand("d")];
                case 1:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        MuseClient.prototype.deviceInfo = function() {
          return __awaiter(this, void 0, void 0, function() {
            var resultListener;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  resultListener = this.controlResponses
                    .pipe(
                      filter_1.filter(function(r) {
                        return !!r.fw;
                      }),
                      take_1.take(1)
                    )
                    .toPromise();
                  return [4 /*yield*/, this.sendCommand("v1")];
                case 1:
                  _a.sent();
                  return [2 /*return*/, resultListener];
              }
            });
          });
        };
        MuseClient.prototype.disconnect = function() {
          if (this.gatt) {
            this.lastIndex = null;
            this.lastTimestamp = null;
            this.gatt.disconnect();
            this.connectionStatus.next(false);
          }
        };
        MuseClient.prototype.getTimestamp = function(eventIndex) {
          var SAMPLES_PER_READING = 12;
          var READING_DELTA =
            1000 * (1.0 / exports.EEG_FREQUENCY) * SAMPLES_PER_READING;
          if (this.lastIndex === null || this.lastTimestamp === null) {
            this.lastIndex = eventIndex;
            this.lastTimestamp = new Date().getTime() - READING_DELTA;
          }
          // Handle wrap around
          while (this.lastIndex - eventIndex > 0x1000) {
            eventIndex += 0x10000;
          }
          if (eventIndex === this.lastIndex) {
            return this.lastTimestamp;
          }
          if (eventIndex > this.lastIndex) {
            this.lastTimestamp += READING_DELTA * (eventIndex - this.lastIndex);
            this.lastIndex = eventIndex;
            return this.lastTimestamp;
          } else {
            return (
              this.lastTimestamp - READING_DELTA * (this.lastIndex - eventIndex)
            );
          }
        };
        return MuseClient;
      })();
      exports.MuseClient = MuseClient;
      //# sourceMappingURL=muse.js.map

      /***/
    },
    /* 16 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      exports.isArray =
        Array.isArray ||
        function(x) {
          return x && typeof x.length === "number";
        };
      //# sourceMappingURL=isArray.js.map

      /***/
    },
    /* 17 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      function isObject(x) {
        return x != null && typeof x === "object";
      }
      exports.isObject = isObject;
      //# sourceMappingURL=isObject.js.map

      /***/
    },
    /* 18 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var errorObject_1 = __webpack_require__(6);
      var tryCatchTarget;
      function tryCatcher() {
        try {
          return tryCatchTarget.apply(this, arguments);
        } catch (e) {
          errorObject_1.errorObject.e = e;
          return errorObject_1.errorObject;
        }
      }
      function tryCatch(fn) {
        tryCatchTarget = fn;
        return tryCatcher;
      }
      exports.tryCatch = tryCatch;
      //# sourceMappingURL=tryCatch.js.map

      /***/
    },
    /* 19 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      exports.empty = {
        closed: true,
        next: function(value) {},
        error: function(err) {
          throw err;
        },
        complete: function() {}
      };
      //# sourceMappingURL=Observer.js.map

      /***/
    },
    /* 20 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      /**
       * An error thrown when an action is invalid because the object has been
       * unsubscribed.
       *
       * @see {@link Subject}
       * @see {@link BehaviorSubject}
       *
       * @class ObjectUnsubscribedError
       */
      var ObjectUnsubscribedError = (function(_super) {
        __extends(ObjectUnsubscribedError, _super);
        function ObjectUnsubscribedError() {
          var err = _super.call(this, "object unsubscribed");
          this.name = err.name = "ObjectUnsubscribedError";
          this.stack = err.stack;
          this.message = err.message;
        }
        return ObjectUnsubscribedError;
      })(Error);
      exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
      //# sourceMappingURL=ObjectUnsubscribedError.js.map

      /***/
    },
    /* 21 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var FromEventObservable_1 = __webpack_require__(40);
      exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
      //# sourceMappingURL=fromEvent.js.map

      /***/
    },
    /* 22 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Observable_1 = __webpack_require__(0);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var ScalarObservable = (function(_super) {
        __extends(ScalarObservable, _super);
        function ScalarObservable(value, scheduler) {
          _super.call(this);
          this.value = value;
          this.scheduler = scheduler;
          this._isScalar = true;
          if (scheduler) {
            this._isScalar = false;
          }
        }
        ScalarObservable.create = function(value, scheduler) {
          return new ScalarObservable(value, scheduler);
        };
        ScalarObservable.dispatch = function(state) {
          var done = state.done,
            value = state.value,
            subscriber = state.subscriber;
          if (done) {
            subscriber.complete();
            return;
          }
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
          state.done = true;
          this.schedule(state);
        };
        ScalarObservable.prototype._subscribe = function(subscriber) {
          var value = this.value;
          var scheduler = this.scheduler;
          if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
              done: false,
              value: value,
              subscriber: subscriber
            });
          } else {
            subscriber.next(value);
            if (!subscriber.closed) {
              subscriber.complete();
            }
          }
        };
        return ScalarObservable;
      })(Observable_1.Observable);
      exports.ScalarObservable = ScalarObservable;
      //# sourceMappingURL=ScalarObservable.js.map

      /***/
    },
    /* 23 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var mergeMap_1 = __webpack_require__(12);
      var identity_1 = __webpack_require__(43);
      /**
       * Converts a higher-order Observable into a first-order Observable which
       * concurrently delivers all values that are emitted on the inner Observables.
       *
       * <span class="informal">Flattens an Observable-of-Observables.</span>
       *
       * <img src="./img/mergeAll.png" width="100%">
       *
       * `mergeAll` subscribes to an Observable that emits Observables, also known as
       * a higher-order Observable. Each time it observes one of these emitted inner
       * Observables, it subscribes to that and delivers all the values from the
       * inner Observable on the output Observable. The output Observable only
       * completes once all inner Observables have completed. Any error delivered by
       * a inner Observable will be immediately emitted on the output Observable.
       *
       * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
       * var firstOrder = higherOrder.mergeAll();
       * firstOrder.subscribe(x => console.log(x));
       *
       * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
       * var firstOrder = higherOrder.mergeAll(2);
       * firstOrder.subscribe(x => console.log(x));
       *
       * @see {@link combineAll}
       * @see {@link concatAll}
       * @see {@link exhaust}
       * @see {@link merge}
       * @see {@link mergeMap}
       * @see {@link mergeMapTo}
       * @see {@link mergeScan}
       * @see {@link switch}
       * @see {@link zipAll}
       *
       * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
       * Observables being subscribed to concurrently.
       * @return {Observable} An Observable that emits values coming from all the
       * inner Observables emitted by the source Observable.
       * @method mergeAll
       * @owner Observable
       */
      function mergeAll(concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
      }
      exports.mergeAll = mergeAll;
      //# sourceMappingURL=mergeAll.js.map

      /***/
    },
    /* 24 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var root_1 = __webpack_require__(2);
      var isArrayLike_1 = __webpack_require__(25);
      var isPromise_1 = __webpack_require__(26);
      var isObject_1 = __webpack_require__(17);
      var Observable_1 = __webpack_require__(0);
      var iterator_1 = __webpack_require__(13);
      var InnerSubscriber_1 = __webpack_require__(42);
      var observable_1 = __webpack_require__(8);
      function subscribeToResult(
        outerSubscriber,
        result,
        outerValue,
        outerIndex
      ) {
        var destination = new InnerSubscriber_1.InnerSubscriber(
          outerSubscriber,
          outerValue,
          outerIndex
        );
        if (destination.closed) {
          return null;
        }
        if (result instanceof Observable_1.Observable) {
          if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
          } else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
          }
        } else if (isArrayLike_1.isArrayLike(result)) {
          for (
            var i = 0, len = result.length;
            i < len && !destination.closed;
            i++
          ) {
            destination.next(result[i]);
          }
          if (!destination.closed) {
            destination.complete();
          }
        } else if (isPromise_1.isPromise(result)) {
          result
            .then(
              function(value) {
                if (!destination.closed) {
                  destination.next(value);
                  destination.complete();
                }
              },
              function(err) {
                return destination.error(err);
              }
            )
            .then(null, function(err) {
              // Escaping the Promise trap: globally throw unhandled errors
              root_1.root.setTimeout(function() {
                throw err;
              });
            });
          return destination;
        } else if (
          result &&
          typeof result[iterator_1.iterator] === "function"
        ) {
          var iterator = result[iterator_1.iterator]();
          do {
            var item = iterator.next();
            if (item.done) {
              destination.complete();
              break;
            }
            destination.next(item.value);
            if (destination.closed) {
              break;
            }
          } while (true);
        } else if (
          result &&
          typeof result[observable_1.observable] === "function"
        ) {
          var obs = result[observable_1.observable]();
          if (typeof obs.subscribe !== "function") {
            destination.error(
              new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              )
            );
          } else {
            return obs.subscribe(
              new InnerSubscriber_1.InnerSubscriber(
                outerSubscriber,
                outerValue,
                outerIndex
              )
            );
          }
        } else {
          var value = isObject_1.isObject(result)
            ? "an invalid object"
            : "'" + result + "'";
          var msg =
            "You provided " +
            value +
            " where a stream was expected." +
            " You can provide an Observable, Promise, Array, or Iterable.";
          destination.error(new TypeError(msg));
        }
        return null;
      }
      exports.subscribeToResult = subscribeToResult;
      //# sourceMappingURL=subscribeToResult.js.map

      /***/
    },
    /* 25 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      exports.isArrayLike = function(x) {
        return x && typeof x.length === "number";
      };
      //# sourceMappingURL=isArrayLike.js.map

      /***/
    },
    /* 26 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      function isPromise(value) {
        return (
          value &&
          typeof value.subscribe !== "function" &&
          typeof value.then === "function"
        );
      }
      exports.isPromise = isPromise;
      //# sourceMappingURL=isPromise.js.map

      /***/
    },
    /* 27 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var OuterSubscriber = (function(_super) {
        __extends(OuterSubscriber, _super);
        function OuterSubscriber() {
          _super.apply(this, arguments);
        }
        OuterSubscriber.prototype.notifyNext = function(
          outerValue,
          innerValue,
          outerIndex,
          innerIndex,
          innerSub
        ) {
          this.destination.next(innerValue);
        };
        OuterSubscriber.prototype.notifyError = function(error, innerSub) {
          this.destination.error(error);
        };
        OuterSubscriber.prototype.notifyComplete = function(innerSub) {
          this.destination.complete();
        };
        return OuterSubscriber;
      })(Subscriber_1.Subscriber);
      exports.OuterSubscriber = OuterSubscriber;
      //# sourceMappingURL=OuterSubscriber.js.map

      /***/
    },
    /* 28 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      /* tslint:enable:max-line-length */
      /**
       * Filter items emitted by the source Observable by only emitting those that
       * satisfy a specified predicate.
       *
       * <span class="informal">Like
       * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
       * it only emits a value from the source if it passes a criterion function.</span>
       *
       * <img src="./img/filter.png" width="100%">
       *
       * Similar to the well-known `Array.prototype.filter` method, this operator
       * takes values from the source Observable, passes them through a `predicate`
       * function and only emits those values that yielded `true`.
       *
       * @example <caption>Emit only click events whose target was a DIV element</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
       * clicksOnDivs.subscribe(x => console.log(x));
       *
       * @see {@link distinct}
       * @see {@link distinctUntilChanged}
       * @see {@link distinctUntilKeyChanged}
       * @see {@link ignoreElements}
       * @see {@link partition}
       * @see {@link skip}
       *
       * @param {function(value: T, index: number): boolean} predicate A function that
       * evaluates each value emitted by the source Observable. If it returns `true`,
       * the value is emitted, if `false` the value is not passed to the output
       * Observable. The `index` parameter is the number `i` for the i-th source
       * emission that has happened since the subscription, starting from the number
       * `0`.
       * @param {any} [thisArg] An optional argument to determine the value of `this`
       * in the `predicate` function.
       * @return {Observable} An Observable of values from the source that were
       * allowed by the `predicate` function.
       * @method filter
       * @owner Observable
       */
      function filter(predicate, thisArg) {
        return function filterOperatorFunction(source) {
          return source.lift(new FilterOperator(predicate, thisArg));
        };
      }
      exports.filter = filter;
      var FilterOperator = (function() {
        function FilterOperator(predicate, thisArg) {
          this.predicate = predicate;
          this.thisArg = thisArg;
        }
        FilterOperator.prototype.call = function(subscriber, source) {
          return source.subscribe(
            new FilterSubscriber(subscriber, this.predicate, this.thisArg)
          );
        };
        return FilterOperator;
      })();
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var FilterSubscriber = (function(_super) {
        __extends(FilterSubscriber, _super);
        function FilterSubscriber(destination, predicate, thisArg) {
          _super.call(this, destination);
          this.predicate = predicate;
          this.thisArg = thisArg;
          this.count = 0;
        }
        // the try catch block below is left specifically for
        // optimization and perf reasons. a tryCatcher is not necessary here.
        FilterSubscriber.prototype._next = function(value) {
          var result;
          try {
            result = this.predicate.call(this.thisArg, value, this.count++);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          if (result) {
            this.destination.next(value);
          }
        };
        return FilterSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=filter.js.map

      /***/
    },
    /* 29 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      function refCount() {
        return function refCountOperatorFunction(source) {
          return source.lift(new RefCountOperator(source));
        };
      }
      exports.refCount = refCount;
      var RefCountOperator = (function() {
        function RefCountOperator(connectable) {
          this.connectable = connectable;
        }
        RefCountOperator.prototype.call = function(subscriber, source) {
          var connectable = this.connectable;
          connectable._refCount++;
          var refCounter = new RefCountSubscriber(subscriber, connectable);
          var subscription = source.subscribe(refCounter);
          if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
          }
          return subscription;
        };
        return RefCountOperator;
      })();
      var RefCountSubscriber = (function(_super) {
        __extends(RefCountSubscriber, _super);
        function RefCountSubscriber(destination, connectable) {
          _super.call(this, destination);
          this.connectable = connectable;
        }
        RefCountSubscriber.prototype._unsubscribe = function() {
          var connectable = this.connectable;
          if (!connectable) {
            this.connection = null;
            return;
          }
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) {
            this.connection = null;
            return;
          }
          connectable._refCount = refCount - 1;
          if (refCount > 1) {
            this.connection = null;
            return;
          }
          ///
          // Compare the local RefCountSubscriber's connection Subscription to the
          // connection Subscription on the shared ConnectableObservable. In cases
          // where the ConnectableObservable source synchronously emits values, and
          // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
          // execution continues to here before the RefCountOperator has a chance to
          // supply the RefCountSubscriber with the shared connection Subscription.
          // For example:
          // ```
          // Observable.range(0, 10)
          //   .publish()
          //   .refCount()
          //   .take(5)
          //   .subscribe();
          // ```
          // In order to account for this case, RefCountSubscriber should only dispose
          // the ConnectableObservable's shared connection Subscription if the
          // connection Subscription exists, *and* either:
          //   a. RefCountSubscriber doesn't have a reference to the shared connection
          //      Subscription yet, or,
          //   b. RefCountSubscriber's connection Subscription reference is identical
          //      to the shared connection Subscription
          ///
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (
            sharedConnection &&
            (!connection || sharedConnection === connection)
          ) {
            sharedConnection.unsubscribe();
          }
        };
        return RefCountSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=refCount.js.map

      /***/
    },
    /* 30 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var FromObservable_1 = __webpack_require__(57);
      exports.from = FromObservable_1.FromObservable.create;
      //# sourceMappingURL=from.js.map

      /***/
    },
    /* 31 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var isScheduler_1 = __webpack_require__(11);
      var of_1 = __webpack_require__(64);
      var from_1 = __webpack_require__(30);
      var concatAll_1 = __webpack_require__(65);
      /* tslint:enable:max-line-length */
      /**
       * Creates an output Observable which sequentially emits all values from given
       * Observable and then moves on to the next.
       *
       * <span class="informal">Concatenates multiple Observables together by
       * sequentially emitting their values, one Observable after the other.</span>
       *
       * <img src="./img/concat.png" width="100%">
       *
       * `concat` joins multiple Observables together, by subscribing to them one at a time and
       * merging their results into the output Observable. You can pass either an array of
       * Observables, or put them directly as arguments. Passing an empty array will result
       * in Observable that completes immediately.
       *
       * `concat` will subscribe to first input Observable and emit all its values, without
       * changing or affecting them in any way. When that Observable completes, it will
       * subscribe to then next Observable passed and, again, emit its values. This will be
       * repeated, until the operator runs out of Observables. When last input Observable completes,
       * `concat` will complete as well. At any given moment only one Observable passed to operator
       * emits values. If you would like to emit values from passed Observables concurrently, check out
       * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
       * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
       *
       * Note that if some input Observable never completes, `concat` will also never complete
       * and Observables following the one that did not complete will never be subscribed. On the other
       * hand, if some Observable simply completes immediately after it is subscribed, it will be
       * invisible for `concat`, which will just move on to the next Observable.
       *
       * If any Observable in chain errors, instead of passing control to the next Observable,
       * `concat` will error immediately as well. Observables that would be subscribed after
       * the one that emitted error, never will.
       *
       * If you pass to `concat` the same Observable many times, its stream of values
       * will be "replayed" on every subscription, which means you can repeat given Observable
       * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
       * you can always use {@link repeat}.
       *
       * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
       * var timer = Rx.Observable.interval(1000).take(4);
       * var sequence = Rx.Observable.range(1, 10);
       * var result = Rx.Observable.concat(timer, sequence);
       * result.subscribe(x => console.log(x));
       *
       * // results in:
       * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
       *
       *
       * @example <caption>Concatenate an array of 3 Observables</caption>
       * var timer1 = Rx.Observable.interval(1000).take(10);
       * var timer2 = Rx.Observable.interval(2000).take(6);
       * var timer3 = Rx.Observable.interval(500).take(10);
       * var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
       * result.subscribe(x => console.log(x));
       *
       * // results in the following:
       * // (Prints to console sequentially)
       * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
       * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
       * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
       *
       *
       * @example <caption>Concatenate the same Observable to repeat it</caption>
       * const timer = Rx.Observable.interval(1000).take(2);
       *
       * Rx.Observable.concat(timer, timer) // concating the same Observable!
       * .subscribe(
       *   value => console.log(value),
       *   err => {},
       *   () => console.log('...and it is done!')
       * );
       *
       * // Logs:
       * // 0 after 1s
       * // 1 after 2s
       * // 0 after 3s
       * // 1 after 4s
       * // "...and it is done!" also after 4s
       *
       * @see {@link concatAll}
       * @see {@link concatMap}
       * @see {@link concatMapTo}
       *
       * @param {ObservableInput} input1 An input Observable to concatenate with others.
       * @param {ObservableInput} input2 An input Observable to concatenate with others.
       * More than one input Observables may be given as argument.
       * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
       * Observable subscription on.
       * @return {Observable} All values of each passed Observable merged into a
       * single Observable, in order, in serial fashion.
       * @static true
       * @name concat
       * @owner Observable
       */
      function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i - 0] = arguments[_i];
        }
        if (
          observables.length === 1 ||
          (observables.length === 2 &&
            isScheduler_1.isScheduler(observables[1]))
        ) {
          return from_1.from(observables[0]);
        }
        return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
      }
      exports.concat = concat;
      //# sourceMappingURL=concat.js.map

      /***/
    },
    /* 32 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __awaiter =
        (this && this.__awaiter) ||
        function(thisArg, _arguments, P, generator) {
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
              result.done
                ? resolve(result.value)
                : new P(function(resolve) {
                    resolve(result.value);
                  }).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __generator =
        (this && this.__generator) ||
        function(thisArg, body) {
          var _ = {
              label: 0,
              sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
              (g[Symbol.iterator] = function() {
                return this;
              }),
            g
          );
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [0, t.value];
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
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
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
                    if (t[2]) _.ops.pop();
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
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
      Object.defineProperty(exports, "__esModule", { value: true });
      var muse_js_1 = __webpack_require__(15);
      var ganglion_ble_umd_js_1 = __webpack_require__(66);
      // Since Ganglion refuses to export their dervice id, it is copied here
      var GANGLION_SERVICE = 0xfe84;
      // Helper methods for functional style matching.
      //   From -> https://codeburst.io/alternative-to-javascripts-switch-statement-with-a-functional-twist-3f572787ba1c
      var matched = function(x) {
        return {
          on: function() {
            return matched(x);
          },
          otherwise: function() {
            return x;
          }
        };
      };
      var match = function(x) {
        return {
          on: function(pred, fn) {
            return pred(x) ? matched(fn(x)) : match(x);
          },
          otherwise: function(fn) {
            return fn(x);
          }
        };
      };
      // Device enums for supported types and States
      var DeviceType;
      (function(DeviceType) {
        DeviceType[(DeviceType["NONE"] = 0)] = "NONE";
        DeviceType[(DeviceType["MUSE"] = 1)] = "MUSE";
        DeviceType[(DeviceType["GANGLION"] = 2)] = "GANGLION";
      })((DeviceType = exports.DeviceType || (exports.DeviceType = {})));
      var DeviceState;
      (function(DeviceState) {
        DeviceState[(DeviceState["CONNECTED"] = 0)] = "CONNECTED";
        DeviceState[(DeviceState["DISCONNECTED"] = 1)] = "DISCONNECTED";
      })((DeviceState = exports.DeviceState || (exports.DeviceState = {})));
      // Scalp Electrode locations based on the International 10-20 System
      //   https://en.wikipedia.org/wiki/10%E2%80%9320_system_(EEG)
      var ScalpElectrodes;
      (function(ScalpElectrodes) {
        ScalpElectrodes[(ScalpElectrodes["FP1"] = 0)] = "FP1";
        ScalpElectrodes[(ScalpElectrodes["FP2"] = 1)] = "FP2";
        ScalpElectrodes[(ScalpElectrodes["AF7"] = 2)] = "AF7";
        ScalpElectrodes[(ScalpElectrodes["AF8"] = 3)] = "AF8";
        ScalpElectrodes[(ScalpElectrodes["F7"] = 4)] = "F7";
        ScalpElectrodes[(ScalpElectrodes["F3"] = 5)] = "F3";
        ScalpElectrodes[(ScalpElectrodes["FZ"] = 6)] = "FZ";
        ScalpElectrodes[(ScalpElectrodes["F4"] = 7)] = "F4";
        ScalpElectrodes[(ScalpElectrodes["F8"] = 8)] = "F8";
        ScalpElectrodes[(ScalpElectrodes["A1"] = 9)] = "A1";
        ScalpElectrodes[(ScalpElectrodes["T3"] = 10)] = "T3";
        ScalpElectrodes[(ScalpElectrodes["C3"] = 11)] = "C3";
        ScalpElectrodes[(ScalpElectrodes["CZ"] = 12)] = "CZ";
        ScalpElectrodes[(ScalpElectrodes["C4"] = 13)] = "C4";
        ScalpElectrodes[(ScalpElectrodes["T4"] = 14)] = "T4";
        ScalpElectrodes[(ScalpElectrodes["A2"] = 15)] = "A2";
        ScalpElectrodes[(ScalpElectrodes["TP9"] = 16)] = "TP9";
        ScalpElectrodes[(ScalpElectrodes["TP10"] = 17)] = "TP10";
        ScalpElectrodes[(ScalpElectrodes["T5"] = 18)] = "T5";
        ScalpElectrodes[(ScalpElectrodes["P3"] = 19)] = "P3";
        ScalpElectrodes[(ScalpElectrodes["PZ"] = 20)] = "PZ";
        ScalpElectrodes[(ScalpElectrodes["P4"] = 21)] = "P4";
        ScalpElectrodes[(ScalpElectrodes["T6"] = 22)] = "T6";
        ScalpElectrodes[(ScalpElectrodes["O1"] = 23)] = "O1";
        ScalpElectrodes[(ScalpElectrodes["O2"] = 24)] = "O2";
      })(
        (ScalpElectrodes =
          exports.ScalpElectrodes || (exports.ScalpElectrodes = {}))
      );
      /** @class BCIDevice
       * A bluetooth device wrapper for botht the Muse headset and the OpenBCI Ganglion
       */
      var BCIDevice = /** @class */ (function() {
        // Initialize the device with supplied defaults
        function BCIDevice(dataHandler, statusHandler) {
          var _this = this;
          this.subscription = function() {};
          this.dataHandler = function() {};
          this.statusHandler = function() {};
          // Sync Timer
          this.sync = {};
          this.device = null;
          this.type = DeviceType.NONE;
          this.state = DeviceState.DISCONNECTED;
          if (dataHandler) this.dataHandler = dataHandler;
          if (statusHandler) this.statusHandler = statusHandler;
          // Initialize the sync map
          var keys = Object.keys(ScalpElectrodes).filter(function(k) {
            return typeof ScalpElectrodes[k] === "number";
          });
          var values = keys.map(function(k) {
            return ScalpElectrodes[k];
          });
          values.forEach(function(val) {
            _this.sync[val] = 0;
          });
        }
        BCIDevice.prototype.connect = function() {
          return __awaiter(this, void 0, void 0, function() {
            var _this = this;
            var dev, gatt, self;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  // Make sure there is not an attached, connected device
                  if (
                    this.device !== null &&
                    this.state === DeviceState.CONNECTED
                  )
                    this.disconnect();
                  return [
                    4 /*yield*/,
                    navigator.bluetooth.requestDevice({
                      filters: [
                        {
                          namePrefix: "Ganglion-"
                        },
                        {
                          namePrefix: "Muse-"
                        }
                      ],
                      optionalServices: [
                        muse_js_1.MUSE_SERVICE,
                        GANGLION_SERVICE
                      ]
                    })
                  ];
                case 1:
                  dev = _a.sent();
                  // Quit out if any of the fields are false
                  if (!dev || !dev.gatt || !dev.name) return [2 /*return*/];
                  return [4 /*yield*/, dev.gatt.connect()];
                case 2:
                  gatt = _a.sent();
                  this.state = DeviceState.CONNECTED;
                  self = this;
                  return [
                    4 /*yield*/,
                    match(dev)
                      .on(
                        function(d) {
                          return d.name.match(/^Muse-/);
                        },
                        function() {
                          self.type = DeviceType.MUSE;
                          self.device = new muse_js_1.MuseClient();
                          // Map the sensors to their equivalent electrodes
                          var sensors = {};
                          sensors[muse_js_1.channelNames.indexOf("TP9")] =
                            ScalpElectrodes.TP9;
                          sensors[muse_js_1.channelNames.indexOf("TP10")] =
                            ScalpElectrodes.TP10;
                          sensors[muse_js_1.channelNames.indexOf("AF7")] =
                            ScalpElectrodes.AF7;
                          sensors[muse_js_1.channelNames.indexOf("AF8")] =
                            ScalpElectrodes.AF8;
                          // Create the subscription container
                          self.subscription = function() {
                            self.device.eegReadings.subscribe(function(sample) {
                              var electrode = sensors[sample.electrode];
                              var delta =
                                sample.timestamp - self.sync[electrode];
                              _this.dataHandler({
                                data: sample.samples,
                                electrode: electrode,
                                sampleRate:
                                  (1000 / delta) * sample.samples.length
                              });
                              self.sync[electrode] = sample.timestamp;
                            });
                            self.device.telemetryData.subscribe(function(
                              status
                            ) {
                              _this.statusHandler(status);
                            });
                          };
                        }
                      )
                      .on(
                        function(d) {
                          return d.name.match(/^Ganglion-/);
                        },
                        function() {
                          return __awaiter(_this, void 0, void 0, function() {
                            var _this = this;
                            var sensors;
                            return __generator(this, function(_a) {
                              self.type = DeviceType.GANGLION;
                              self.device = new ganglion_ble_umd_js_1.default();
                              sensors = {};
                              sensors[0] = ScalpElectrodes.FP1;
                              sensors[1] = ScalpElectrodes.FP2;
                              sensors[2] = ScalpElectrodes.O1;
                              sensors[3] = ScalpElectrodes.O2;
                              self.subscription = function() {
                                self.device.stream.subscribe(function(sample) {
                                  sample.data.forEach(function(val, ind) {
                                    var electrode = sensors[ind];
                                    //console.log("E:", electrode);
                                    var delta =
                                      sample.timestamp - self.sync[electrode];
                                    _this.dataHandler({
                                      data: [val],
                                      electrode: electrode,
                                      sampleRate: 1000 / delta
                                    });
                                    self.sync[electrode] = sample.timestamp;
                                  });
                                });
                              };
                              return [2 /*return*/];
                            });
                          });
                        }
                      )
                      .otherwise(function(d) {
                        throw new Error("Unknown device! " + d.name);
                      })
                  ];
                case 3:
                  _a.sent();
                  // Connect the physical device to this device
                  return [4 /*yield*/, this.device.connect(gatt)];
                case 4:
                  // Connect the physical device to this device
                  _a.sent();
                  return [4 /*yield*/, this.device.start()];
                case 5:
                  _a.sent();
                  // Subscribe to the data
                  this.subscription();
                  return [2 /*return*/];
              }
            });
          });
        };
        // Disconnect the device
        BCIDevice.prototype.disconnect = function() {
          if (this.state === DeviceState.DISCONNECTED) return;
          this.device.disconnect();
          this.state = DeviceState.DISCONNECTED;
        };
        // TODO: Allow for multiple susbscriptions
        BCIDevice.prototype.subscribe = function(callback) {
          this.dataHandler = callback;
        };
        BCIDevice.electrodeIndex = function(str) {
          return ScalpElectrodes[str];
        };
        return BCIDevice;
      })();
      exports.BCIDevice = BCIDevice;

      /***/
    },
    /* 33 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subject_1 = __webpack_require__(4);
      var ObjectUnsubscribedError_1 = __webpack_require__(20);
      /**
       * @class BehaviorSubject<T>
       */
      var BehaviorSubject = (function(_super) {
        __extends(BehaviorSubject, _super);
        function BehaviorSubject(_value) {
          _super.call(this);
          this._value = _value;
        }
        Object.defineProperty(BehaviorSubject.prototype, "value", {
          get: function() {
            return this.getValue();
          },
          enumerable: true,
          configurable: true
        });
        BehaviorSubject.prototype._subscribe = function(subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          if (subscription && !subscription.closed) {
            subscriber.next(this._value);
          }
          return subscription;
        };
        BehaviorSubject.prototype.getValue = function() {
          if (this.hasError) {
            throw this.thrownError;
          } else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else {
            return this._value;
          }
        };
        BehaviorSubject.prototype.next = function(value) {
          _super.prototype.next.call(this, (this._value = value));
        };
        return BehaviorSubject;
      })(Subject_1.Subject);
      exports.BehaviorSubject = BehaviorSubject;
      //# sourceMappingURL=BehaviorSubject.js.map

      /***/
    },
    /* 34 */
    /***/ function(module, exports) {
      var g;

      // This works in non-strict mode
      g = (function() {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 35 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var Subscriber_1 = __webpack_require__(1);
      var rxSubscriber_1 = __webpack_require__(7);
      var Observer_1 = __webpack_require__(19);
      function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
          if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
          }
          if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
          }
        }
        if (!nextOrObserver && !error && !complete) {
          return new Subscriber_1.Subscriber(Observer_1.empty);
        }
        return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
      }
      exports.toSubscriber = toSubscriber;
      //# sourceMappingURL=toSubscriber.js.map

      /***/
    },
    /* 36 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      /**
       * An error thrown when one or more errors have occurred during the
       * `unsubscribe` of a {@link Subscription}.
       */
      var UnsubscriptionError = (function(_super) {
        __extends(UnsubscriptionError, _super);
        function UnsubscriptionError(errors) {
          _super.call(this);
          this.errors = errors;
          var err = Error.call(
            this,
            errors
              ? errors.length +
                  " errors occurred during unsubscription:\n  " +
                  errors
                    .map(function(err, i) {
                      return i + 1 + ") " + err.toString();
                    })
                    .join("\n  ")
              : ""
          );
          this.name = err.name = "UnsubscriptionError";
          this.stack = err.stack;
          this.message = err.message;
        }
        return UnsubscriptionError;
      })(Error);
      exports.UnsubscriptionError = UnsubscriptionError;
      //# sourceMappingURL=UnsubscriptionError.js.map

      /***/
    },
    /* 37 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var noop_1 = __webpack_require__(38);
      /* tslint:enable:max-line-length */
      function pipe() {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i - 0] = arguments[_i];
        }
        return pipeFromArray(fns);
      }
      exports.pipe = pipe;
      /* @internal */
      function pipeFromArray(fns) {
        if (!fns) {
          return noop_1.noop;
        }
        if (fns.length === 1) {
          return fns[0];
        }
        return function piped(input) {
          return fns.reduce(function(prev, fn) {
            return fn(prev);
          }, input);
        };
      }
      exports.pipeFromArray = pipeFromArray;
      //# sourceMappingURL=pipe.js.map

      /***/
    },
    /* 38 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      /* tslint:disable:no-empty */
      function noop() {}
      exports.noop = noop;
      //# sourceMappingURL=noop.js.map

      /***/
    },
    /* 39 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscription_1 = __webpack_require__(3);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var SubjectSubscription = (function(_super) {
        __extends(SubjectSubscription, _super);
        function SubjectSubscription(subject, subscriber) {
          _super.call(this);
          this.subject = subject;
          this.subscriber = subscriber;
          this.closed = false;
        }
        SubjectSubscription.prototype.unsubscribe = function() {
          if (this.closed) {
            return;
          }
          this.closed = true;
          var subject = this.subject;
          var observers = subject.observers;
          this.subject = null;
          if (
            !observers ||
            observers.length === 0 ||
            subject.isStopped ||
            subject.closed
          ) {
            return;
          }
          var subscriberIndex = observers.indexOf(this.subscriber);
          if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
          }
        };
        return SubjectSubscription;
      })(Subscription_1.Subscription);
      exports.SubjectSubscription = SubjectSubscription;
      //# sourceMappingURL=SubjectSubscription.js.map

      /***/
    },
    /* 40 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Observable_1 = __webpack_require__(0);
      var tryCatch_1 = __webpack_require__(18);
      var isFunction_1 = __webpack_require__(5);
      var errorObject_1 = __webpack_require__(6);
      var Subscription_1 = __webpack_require__(3);
      var toString = Object.prototype.toString;
      function isNodeStyleEventEmitter(sourceObj) {
        return (
          !!sourceObj &&
          typeof sourceObj.addListener === "function" &&
          typeof sourceObj.removeListener === "function"
        );
      }
      function isJQueryStyleEventEmitter(sourceObj) {
        return (
          !!sourceObj &&
          typeof sourceObj.on === "function" &&
          typeof sourceObj.off === "function"
        );
      }
      function isNodeList(sourceObj) {
        return !!sourceObj && toString.call(sourceObj) === "[object NodeList]";
      }
      function isHTMLCollection(sourceObj) {
        return (
          !!sourceObj && toString.call(sourceObj) === "[object HTMLCollection]"
        );
      }
      function isEventTarget(sourceObj) {
        return (
          !!sourceObj &&
          typeof sourceObj.addEventListener === "function" &&
          typeof sourceObj.removeEventListener === "function"
        );
      }
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var FromEventObservable = (function(_super) {
        __extends(FromEventObservable, _super);
        function FromEventObservable(sourceObj, eventName, selector, options) {
          _super.call(this);
          this.sourceObj = sourceObj;
          this.eventName = eventName;
          this.selector = selector;
          this.options = options;
        }
        /* tslint:enable:max-line-length */
        /**
         * Creates an Observable that emits events of a specific type coming from the
         * given event target.
         *
         * <span class="informal">Creates an Observable from DOM events, or Node.js
         * EventEmitter events or others.</span>
         *
         * <img src="./img/fromEvent.png" width="100%">
         *
         * `fromEvent` accepts as a first argument event target, which is an object with methods
         * for registering event handler functions. As a second argument it takes string that indicates
         * type of event we want to listen for. `fromEvent` supports selected types of event targets,
         * which are described in detail below. If your event target does not match any of the ones listed,
         * you should use {@link fromEventPattern}, which can be used on arbitrary APIs.
         * When it comes to APIs supported by `fromEvent`, their methods for adding and removing event
         * handler functions have different names, but they all accept a string describing event type
         * and function itself, which will be called whenever said event happens.
         *
         * Every time resulting Observable is subscribed, event handler function will be registered
         * to event target on given event type. When that event fires, value
         * passed as a first argument to registered function will be emitted by output Observable.
         * When Observable is unsubscribed, function will be unregistered from event target.
         *
         * Note that if event target calls registered function with more than one argument, second
         * and following arguments will not appear in resulting stream. In order to get access to them,
         * you can pass to `fromEvent` optional project function, which will be called with all arguments
         * passed to event handler. Output Observable will then emit value returned by project function,
         * instead of the usual value.
         *
         * Remember that event targets listed below are checked via duck typing. It means that
         * no matter what kind of object you have and no matter what environment you work in,
         * you can safely use `fromEvent` on that object if it exposes described methods (provided
         * of course they behave as was described above). So for example if Node.js library exposes
         * event target which has the same method names as DOM EventTarget, `fromEvent` is still
         * a good choice.
         *
         * If the API you use is more callback then event handler oriented (subscribed
         * callback function fires only once and thus there is no need to manually
         * unregister it), you should use {@link bindCallback} or {@link bindNodeCallback}
         * instead.
         *
         * `fromEvent` supports following types of event targets:
         *
         * **DOM EventTarget**
         *
         * This is an object with `addEventListener` and `removeEventListener` methods.
         *
         * In the browser, `addEventListener` accepts - apart from event type string and event
         * handler function arguments - optional third parameter, which is either an object or boolean,
         * both used for additional configuration how and when passed function will be called. When
         * `fromEvent` is used with event target of that type, you can provide this values
         * as third parameter as well.
         *
         * **Node.js EventEmitter**
         *
         * An object with `addListener` and `removeListener` methods.
         *
         * **JQuery-style event target**
         *
         * An object with `on` and `off` methods
         *
         * **DOM NodeList**
         *
         * List of DOM Nodes, returned for example by `document.querySelectorAll` or `Node.childNodes`.
         *
         * Although this collection is not event target in itself, `fromEvent` will iterate over all Nodes
         * it contains and install event handler function in every of them. When returned Observable
         * is unsubscribed, function will be removed from all Nodes.
         *
         * **DOM HtmlCollection**
         *
         * Just as in case of NodeList it is a collection of DOM nodes. Here as well event handler function is
         * installed and removed in each of elements.
         *
         *
         * @example <caption>Emits clicks happening on the DOM document</caption>
         * var clicks = Rx.Observable.fromEvent(document, 'click');
         * clicks.subscribe(x => console.log(x));
         *
         * // Results in:
         * // MouseEvent object logged to console every time a click
         * // occurs on the document.
         *
         *
         * @example <caption>Use addEventListener with capture option</caption>
         * var clicksInDocument = Rx.Observable.fromEvent(document, 'click', true); // note optional configuration parameter
         *                                                                          // which will be passed to addEventListener
         * var clicksInDiv = Rx.Observable.fromEvent(someDivInDocument, 'click');
         *
         * clicksInDocument.subscribe(() => console.log('document'));
         * clicksInDiv.subscribe(() => console.log('div'));
         *
         * // By default events bubble UP in DOM tree, so normally
         * // when we would click on div in document
         * // "div" would be logged first and then "document".
         * // Since we specified optional `capture` option, document
         * // will catch event when it goes DOWN DOM tree, so console
         * // will log "document" and then "div".
         *
         * @see {@link bindCallback}
         * @see {@link bindNodeCallback}
         * @see {@link fromEventPattern}
         *
         * @param {EventTargetLike} target The DOM EventTarget, Node.js
         * EventEmitter, JQuery-like event target, NodeList or HTMLCollection to attach the event handler to.
         * @param {string} eventName The event name of interest, being emitted by the
         * `target`.
         * @param {EventListenerOptions} [options] Options to pass through to addEventListener
         * @param {SelectorMethodSignature<T>} [selector] An optional function to
         * post-process results. It takes the arguments from the event handler and
         * should return a single value.
         * @return {Observable<T>}
         * @static true
         * @name fromEvent
         * @owner Observable
         */
        FromEventObservable.create = function(
          target,
          eventName,
          options,
          selector
        ) {
          if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
          }
          return new FromEventObservable(target, eventName, selector, options);
        };
        FromEventObservable.setupSubscription = function(
          sourceObj,
          eventName,
          handler,
          subscriber,
          options
        ) {
          var unsubscribe;
          if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
              FromEventObservable.setupSubscription(
                sourceObj[i],
                eventName,
                handler,
                subscriber,
                options
              );
            }
          } else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function() {
              return source_1.removeEventListener(eventName, handler);
            };
          } else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function() {
              return source_2.off(eventName, handler);
            };
          } else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function() {
              return source_3.removeListener(eventName, handler);
            };
          } else {
            throw new TypeError("Invalid event target");
          }
          subscriber.add(new Subscription_1.Subscription(unsubscribe));
        };
        FromEventObservable.prototype._subscribe = function(subscriber) {
          var sourceObj = this.sourceObj;
          var eventName = this.eventName;
          var options = this.options;
          var selector = this.selector;
          var handler = selector
            ? function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i - 0] = arguments[_i];
                }
                var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
                if (result === errorObject_1.errorObject) {
                  subscriber.error(errorObject_1.errorObject.e);
                } else {
                  subscriber.next(result);
                }
              }
            : function(e) {
                return subscriber.next(e);
              };
          FromEventObservable.setupSubscription(
            sourceObj,
            eventName,
            handler,
            subscriber,
            options
          );
        };
        return FromEventObservable;
      })(Observable_1.Observable);
      exports.FromEventObservable = FromEventObservable;
      //# sourceMappingURL=FromEventObservable.js.map

      /***/
    },
    /* 41 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var Observable_1 = __webpack_require__(0);
      var ArrayObservable_1 = __webpack_require__(9);
      var isScheduler_1 = __webpack_require__(11);
      var mergeAll_1 = __webpack_require__(23);
      /* tslint:enable:max-line-length */
      /**
       * Creates an output Observable which concurrently emits all values from every
       * given input Observable.
       *
       * <span class="informal">Flattens multiple Observables together by blending
       * their values into one Observable.</span>
       *
       * <img src="./img/merge.png" width="100%">
       *
       * `merge` subscribes to each given input Observable (as arguments), and simply
       * forwards (without doing any transformation) all the values from all the input
       * Observables to the output Observable. The output Observable only completes
       * once all input Observables have completed. Any error delivered by an input
       * Observable will be immediately emitted on the output Observable.
       *
       * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var timer = Rx.Observable.interval(1000);
       * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
       * clicksOrTimer.subscribe(x => console.log(x));
       *
       * // Results in the following:
       * // timer will emit ascending values, one every second(1000ms) to console
       * // clicks logs MouseEvents to console everytime the "document" is clicked
       * // Since the two streams are merged you see these happening
       * // as they occur.
       *
       * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
       * var timer1 = Rx.Observable.interval(1000).take(10);
       * var timer2 = Rx.Observable.interval(2000).take(6);
       * var timer3 = Rx.Observable.interval(500).take(10);
       * var concurrent = 2; // the argument
       * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
       * merged.subscribe(x => console.log(x));
       *
       * // Results in the following:
       * // - First timer1 and timer2 will run concurrently
       * // - timer1 will emit a value every 1000ms for 10 iterations
       * // - timer2 will emit a value every 2000ms for 6 iterations
       * // - after timer1 hits it's max iteration, timer2 will
       * //   continue, and timer3 will start to run concurrently with timer2
       * // - when timer2 hits it's max iteration it terminates, and
       * //   timer3 will continue to emit a value every 500ms until it is complete
       *
       * @see {@link mergeAll}
       * @see {@link mergeMap}
       * @see {@link mergeMapTo}
       * @see {@link mergeScan}
       *
       * @param {...ObservableInput} observables Input Observables to merge together.
       * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
       * Observables being subscribed to concurrently.
       * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
       * concurrency of input Observables.
       * @return {Observable} an Observable that emits items that are the result of
       * every input Observable.
       * @static true
       * @name merge
       * @owner Observable
       */
      function merge() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i - 0] = arguments[_i];
        }
        var concurrent = Number.POSITIVE_INFINITY;
        var scheduler = null;
        var last = observables[observables.length - 1];
        if (isScheduler_1.isScheduler(last)) {
          scheduler = observables.pop();
          if (
            observables.length > 1 &&
            typeof observables[observables.length - 1] === "number"
          ) {
            concurrent = observables.pop();
          }
        } else if (typeof last === "number") {
          concurrent = observables.pop();
        }
        if (
          scheduler === null &&
          observables.length === 1 &&
          observables[0] instanceof Observable_1.Observable
        ) {
          return observables[0];
        }
        return mergeAll_1.mergeAll(concurrent)(
          new ArrayObservable_1.ArrayObservable(observables, scheduler)
        );
      }
      exports.merge = merge;
      //# sourceMappingURL=merge.js.map

      /***/
    },
    /* 42 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var InnerSubscriber = (function(_super) {
        __extends(InnerSubscriber, _super);
        function InnerSubscriber(parent, outerValue, outerIndex) {
          _super.call(this);
          this.parent = parent;
          this.outerValue = outerValue;
          this.outerIndex = outerIndex;
          this.index = 0;
        }
        InnerSubscriber.prototype._next = function(value) {
          this.parent.notifyNext(
            this.outerValue,
            value,
            this.outerIndex,
            this.index++,
            this
          );
        };
        InnerSubscriber.prototype._error = function(error) {
          this.parent.notifyError(error, this);
          this.unsubscribe();
        };
        InnerSubscriber.prototype._complete = function() {
          this.parent.notifyComplete(this);
          this.unsubscribe();
        };
        return InnerSubscriber;
      })(Subscriber_1.Subscriber);
      exports.InnerSubscriber = InnerSubscriber;
      //# sourceMappingURL=InnerSubscriber.js.map

      /***/
    },
    /* 43 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      function identity(x) {
        return x;
      }
      exports.identity = identity;
      //# sourceMappingURL=identity.js.map

      /***/
    },
    /* 44 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      var EmptyError_1 = __webpack_require__(45);
      /**
       * Emits only the first value (or the first value that meets some condition)
       * emitted by the source Observable.
       *
       * <span class="informal">Emits only the first value. Or emits only the first
       * value that passes some test.</span>
       *
       * <img src="./img/first.png" width="100%">
       *
       * If called with no arguments, `first` emits the first value of the source
       * Observable, then completes. If called with a `predicate` function, `first`
       * emits the first value of the source that matches the specified condition. It
       * may also take a `resultSelector` function to produce the output value from
       * the input value, and a `defaultValue` to emit in case the source completes
       * before it is able to emit a valid value. Throws an error if `defaultValue`
       * was not provided and a matching element is not found.
       *
       * @example <caption>Emit only the first click that happens on the DOM</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var result = clicks.first();
       * result.subscribe(x => console.log(x));
       *
       * @example <caption>Emits the first click that happens on a DIV</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var result = clicks.first(ev => ev.target.tagName === 'DIV');
       * result.subscribe(x => console.log(x));
       *
       * @see {@link filter}
       * @see {@link find}
       * @see {@link take}
       *
       * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
       * callback if the Observable completes before any `next` notification was sent.
       *
       * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
       * An optional function called with each item to test for condition matching.
       * @param {function(value: T, index: number): R} [resultSelector] A function to
       * produce the value on the output Observable based on the values
       * and the indices of the source Observable. The arguments passed to this
       * function are:
       * - `value`: the value that was emitted on the source.
       * - `index`: the "index" of the value from the source.
       * @param {R} [defaultValue] The default value emitted in case no valid value
       * was found on the source.
       * @return {Observable<T|R>} An Observable of the first item that matches the
       * condition.
       * @method first
       * @owner Observable
       */
      function first(predicate, resultSelector, defaultValue) {
        return function(source) {
          return source.lift(
            new FirstOperator(predicate, resultSelector, defaultValue, source)
          );
        };
      }
      exports.first = first;
      var FirstOperator = (function() {
        function FirstOperator(
          predicate,
          resultSelector,
          defaultValue,
          source
        ) {
          this.predicate = predicate;
          this.resultSelector = resultSelector;
          this.defaultValue = defaultValue;
          this.source = source;
        }
        FirstOperator.prototype.call = function(observer, source) {
          return source.subscribe(
            new FirstSubscriber(
              observer,
              this.predicate,
              this.resultSelector,
              this.defaultValue,
              this.source
            )
          );
        };
        return FirstOperator;
      })();
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var FirstSubscriber = (function(_super) {
        __extends(FirstSubscriber, _super);
        function FirstSubscriber(
          destination,
          predicate,
          resultSelector,
          defaultValue,
          source
        ) {
          _super.call(this, destination);
          this.predicate = predicate;
          this.resultSelector = resultSelector;
          this.defaultValue = defaultValue;
          this.source = source;
          this.index = 0;
          this.hasCompleted = false;
          this._emitted = false;
        }
        FirstSubscriber.prototype._next = function(value) {
          var index = this.index++;
          if (this.predicate) {
            this._tryPredicate(value, index);
          } else {
            this._emit(value, index);
          }
        };
        FirstSubscriber.prototype._tryPredicate = function(value, index) {
          var result;
          try {
            result = this.predicate(value, index, this.source);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          if (result) {
            this._emit(value, index);
          }
        };
        FirstSubscriber.prototype._emit = function(value, index) {
          if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
          }
          this._emitFinal(value);
        };
        FirstSubscriber.prototype._tryResultSelector = function(value, index) {
          var result;
          try {
            result = this.resultSelector(value, index);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this._emitFinal(result);
        };
        FirstSubscriber.prototype._emitFinal = function(value) {
          var destination = this.destination;
          if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
          }
        };
        FirstSubscriber.prototype._complete = function() {
          var destination = this.destination;
          if (!this.hasCompleted && typeof this.defaultValue !== "undefined") {
            destination.next(this.defaultValue);
            destination.complete();
          } else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError());
          }
        };
        return FirstSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=first.js.map

      /***/
    },
    /* 45 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      /**
       * An error thrown when an Observable or a sequence was queried but has no
       * elements.
       *
       * @see {@link first}
       * @see {@link last}
       * @see {@link single}
       *
       * @class EmptyError
       */
      var EmptyError = (function(_super) {
        __extends(EmptyError, _super);
        function EmptyError() {
          var err = _super.call(this, "no elements in sequence");
          this.name = err.name = "EmptyError";
          this.stack = err.stack;
          this.message = err.message;
        }
        return EmptyError;
      })(Error);
      exports.EmptyError = EmptyError;
      //# sourceMappingURL=EmptyError.js.map

      /***/
    },
    /* 46 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var multicast_1 = __webpack_require__(47);
      var refCount_1 = __webpack_require__(29);
      var Subject_1 = __webpack_require__(4);
      function shareSubjectFactory() {
        return new Subject_1.Subject();
      }
      /**
       * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
       * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
       * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
       * This is an alias for .multicast(() => new Subject()).refCount().
       *
       * <img src="./img/share.png" width="100%">
       *
       * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
       * @method share
       * @owner Observable
       */
      function share() {
        return function(source) {
          return refCount_1.refCount()(
            multicast_1.multicast(shareSubjectFactory)(source)
          );
        };
      }
      exports.share = share;
      //# sourceMappingURL=share.js.map

      /***/
    },
    /* 47 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var ConnectableObservable_1 = __webpack_require__(48);
      /* tslint:enable:max-line-length */
      /**
       * Returns an Observable that emits the results of invoking a specified selector on items
       * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
       *
       * <img src="./img/multicast.png" width="100%">
       *
       * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
       * which the source sequence's elements will be multicast to the selector function
       * or Subject to push source elements into.
       * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
       * as many times as needed, without causing multiple subscriptions to the source stream.
       * Subscribers to the given source will receive all notifications of the source from the
       * time of the subscription forward.
       * @return {Observable} An Observable that emits the results of invoking the selector
       * on the items emitted by a `ConnectableObservable` that shares a single subscription to
       * the underlying stream.
       * @method multicast
       * @owner Observable
       */
      function multicast(subjectOrSubjectFactory, selector) {
        return function multicastOperatorFunction(source) {
          var subjectFactory;
          if (typeof subjectOrSubjectFactory === "function") {
            subjectFactory = subjectOrSubjectFactory;
          } else {
            subjectFactory = function subjectFactory() {
              return subjectOrSubjectFactory;
            };
          }
          if (typeof selector === "function") {
            return source.lift(new MulticastOperator(subjectFactory, selector));
          }
          var connectable = Object.create(
            source,
            ConnectableObservable_1.connectableObservableDescriptor
          );
          connectable.source = source;
          connectable.subjectFactory = subjectFactory;
          return connectable;
        };
      }
      exports.multicast = multicast;
      var MulticastOperator = (function() {
        function MulticastOperator(subjectFactory, selector) {
          this.subjectFactory = subjectFactory;
          this.selector = selector;
        }
        MulticastOperator.prototype.call = function(subscriber, source) {
          var selector = this.selector;
          var subject = this.subjectFactory();
          var subscription = selector(subject).subscribe(subscriber);
          subscription.add(source.subscribe(subject));
          return subscription;
        };
        return MulticastOperator;
      })();
      exports.MulticastOperator = MulticastOperator;
      //# sourceMappingURL=multicast.js.map

      /***/
    },
    /* 48 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subject_1 = __webpack_require__(4);
      var Observable_1 = __webpack_require__(0);
      var Subscriber_1 = __webpack_require__(1);
      var Subscription_1 = __webpack_require__(3);
      var refCount_1 = __webpack_require__(29);
      /**
       * @class ConnectableObservable<T>
       */
      var ConnectableObservable = (function(_super) {
        __extends(ConnectableObservable, _super);
        function ConnectableObservable(source, subjectFactory) {
          _super.call(this);
          this.source = source;
          this.subjectFactory = subjectFactory;
          this._refCount = 0;
          this._isComplete = false;
        }
        ConnectableObservable.prototype._subscribe = function(subscriber) {
          return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable.prototype.getSubject = function() {
          var subject = this._subject;
          if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
          }
          return this._subject;
        };
        ConnectableObservable.prototype.connect = function() {
          var connection = this._connection;
          if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(
              this.source.subscribe(
                new ConnectableSubscriber(this.getSubject(), this)
              )
            );
            if (connection.closed) {
              this._connection = null;
              connection = Subscription_1.Subscription.EMPTY;
            } else {
              this._connection = connection;
            }
          }
          return connection;
        };
        ConnectableObservable.prototype.refCount = function() {
          return refCount_1.refCount()(this);
        };
        return ConnectableObservable;
      })(Observable_1.Observable);
      exports.ConnectableObservable = ConnectableObservable;
      var connectableProto = ConnectableObservable.prototype;
      exports.connectableObservableDescriptor = {
        operator: { value: null },
        _refCount: { value: 0, writable: true },
        _subject: { value: null, writable: true },
        _connection: { value: null, writable: true },
        _subscribe: { value: connectableProto._subscribe },
        _isComplete: { value: connectableProto._isComplete, writable: true },
        getSubject: { value: connectableProto.getSubject },
        connect: { value: connectableProto.connect },
        refCount: { value: connectableProto.refCount }
      };
      var ConnectableSubscriber = (function(_super) {
        __extends(ConnectableSubscriber, _super);
        function ConnectableSubscriber(destination, connectable) {
          _super.call(this, destination);
          this.connectable = connectable;
        }
        ConnectableSubscriber.prototype._error = function(err) {
          this._unsubscribe();
          _super.prototype._error.call(this, err);
        };
        ConnectableSubscriber.prototype._complete = function() {
          this.connectable._isComplete = true;
          this._unsubscribe();
          _super.prototype._complete.call(this);
        };
        ConnectableSubscriber.prototype._unsubscribe = function() {
          var connectable = this.connectable;
          if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
              connection.unsubscribe();
            }
          }
        };
        return ConnectableSubscriber;
      })(Subject_1.SubjectSubscriber);
      var RefCountOperator = (function() {
        function RefCountOperator(connectable) {
          this.connectable = connectable;
        }
        RefCountOperator.prototype.call = function(subscriber, source) {
          var connectable = this.connectable;
          connectable._refCount++;
          var refCounter = new RefCountSubscriber(subscriber, connectable);
          var subscription = source.subscribe(refCounter);
          if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
          }
          return subscription;
        };
        return RefCountOperator;
      })();
      var RefCountSubscriber = (function(_super) {
        __extends(RefCountSubscriber, _super);
        function RefCountSubscriber(destination, connectable) {
          _super.call(this, destination);
          this.connectable = connectable;
        }
        RefCountSubscriber.prototype._unsubscribe = function() {
          var connectable = this.connectable;
          if (!connectable) {
            this.connection = null;
            return;
          }
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) {
            this.connection = null;
            return;
          }
          connectable._refCount = refCount - 1;
          if (refCount > 1) {
            this.connection = null;
            return;
          }
          ///
          // Compare the local RefCountSubscriber's connection Subscription to the
          // connection Subscription on the shared ConnectableObservable. In cases
          // where the ConnectableObservable source synchronously emits values, and
          // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
          // execution continues to here before the RefCountOperator has a chance to
          // supply the RefCountSubscriber with the shared connection Subscription.
          // For example:
          // ```
          // Observable.range(0, 10)
          //   .publish()
          //   .refCount()
          //   .take(5)
          //   .subscribe();
          // ```
          // In order to account for this case, RefCountSubscriber should only dispose
          // the ConnectableObservable's shared connection Subscription if the
          // connection Subscription exists, *and* either:
          //   a. RefCountSubscriber doesn't have a reference to the shared connection
          //      Subscription yet, or,
          //   b. RefCountSubscriber's connection Subscription reference is identical
          //      to the shared connection Subscription
          ///
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (
            sharedConnection &&
            (!connection || sharedConnection === connection)
          ) {
            sharedConnection.unsubscribe();
          }
        };
        return RefCountSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=ConnectableObservable.js.map

      /***/
    },
    /* 49 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      var ArgumentOutOfRangeError_1 = __webpack_require__(50);
      var EmptyObservable_1 = __webpack_require__(10);
      /**
       * Emits only the first `count` values emitted by the source Observable.
       *
       * <span class="informal">Takes the first `count` values from the source, then
       * completes.</span>
       *
       * <img src="./img/take.png" width="100%">
       *
       * `take` returns an Observable that emits only the first `count` values emitted
       * by the source Observable. If the source emits fewer than `count` values then
       * all of its values are emitted. After that, it completes, regardless if the
       * source completes.
       *
       * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
       * var interval = Rx.Observable.interval(1000);
       * var five = interval.take(5);
       * five.subscribe(x => console.log(x));
       *
       * @see {@link takeLast}
       * @see {@link takeUntil}
       * @see {@link takeWhile}
       * @see {@link skip}
       *
       * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
       * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
       *
       * @param {number} count The maximum number of `next` values to emit.
       * @return {Observable<T>} An Observable that emits only the first `count`
       * values emitted by the source Observable, or all of the values from the source
       * if the source emits fewer than `count` values.
       * @method take
       * @owner Observable
       */
      function take(count) {
        return function(source) {
          if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
          } else {
            return source.lift(new TakeOperator(count));
          }
        };
      }
      exports.take = take;
      var TakeOperator = (function() {
        function TakeOperator(total) {
          this.total = total;
          if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
          }
        }
        TakeOperator.prototype.call = function(subscriber, source) {
          return source.subscribe(new TakeSubscriber(subscriber, this.total));
        };
        return TakeOperator;
      })();
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var TakeSubscriber = (function(_super) {
        __extends(TakeSubscriber, _super);
        function TakeSubscriber(destination, total) {
          _super.call(this, destination);
          this.total = total;
          this.count = 0;
        }
        TakeSubscriber.prototype._next = function(value) {
          var total = this.total;
          var count = ++this.count;
          if (count <= total) {
            this.destination.next(value);
            if (count === total) {
              this.destination.complete();
              this.unsubscribe();
            }
          }
        };
        return TakeSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=take.js.map

      /***/
    },
    /* 50 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      /**
       * An error thrown when an element was queried at a certain index of an
       * Observable, but no such index or position exists in that sequence.
       *
       * @see {@link elementAt}
       * @see {@link take}
       * @see {@link takeLast}
       *
       * @class ArgumentOutOfRangeError
       */
      var ArgumentOutOfRangeError = (function(_super) {
        __extends(ArgumentOutOfRangeError, _super);
        function ArgumentOutOfRangeError() {
          var err = _super.call(this, "argument out of range");
          this.name = err.name = "ArgumentOutOfRangeError";
          this.stack = err.stack;
          this.message = err.message;
        }
        return ArgumentOutOfRangeError;
      })(Error);
      exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
      //# sourceMappingURL=ArgumentOutOfRangeError.js.map

      /***/
    },
    /* 51 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var concatMap_1 = __webpack_require__(52);
      var filter_1 = __webpack_require__(28);
      var map_1 = __webpack_require__(14);
      var scan_1 = __webpack_require__(53);
      function parseControl(controlData) {
        return controlData.pipe(
          concatMap_1.concatMap(function(data) {
            return data.split("");
          }),
          scan_1.scan(function(acc, value) {
            if (acc.indexOf("}") >= 0) {
              return value;
            } else {
              return acc + value;
            }
          }, ""),
          filter_1.filter(function(value) {
            return value.indexOf("}") >= 0;
          }),
          map_1.map(function(value) {
            return JSON.parse(value);
          })
        );
      }
      exports.parseControl = parseControl;
      function decodeUnsigned12BitData(samples) {
        var samples12Bit = [];
        // tslint:disable:no-bitwise
        for (var i = 0; i < samples.length; i++) {
          if (i % 3 === 0) {
            samples12Bit.push((samples[i] << 4) | (samples[i + 1] >> 4));
          } else {
            samples12Bit.push(((samples[i] & 0xf) << 8) | samples[i + 1]);
            i++;
          }
        }
        // tslint:enable:no-bitwise
        return samples12Bit;
      }
      exports.decodeUnsigned12BitData = decodeUnsigned12BitData;
      function decodeEEGSamples(samples) {
        return decodeUnsigned12BitData(samples).map(function(n) {
          return 0.48828125 * (n - 0x800);
        });
      }
      exports.decodeEEGSamples = decodeEEGSamples;
      function parseTelemetry(data) {
        // tslint:disable:object-literal-sort-keys
        return {
          sequenceId: data.getUint16(0),
          batteryLevel: data.getUint16(2) / 512,
          fuelGaugeVoltage: data.getUint16(4) * 2.2,
          // Next 2 bytes are probably ADC millivolt level, not sure
          temperature: data.getUint16(8)
        };
        // tslint:enable:object-literal-sort-keys
      }
      exports.parseTelemetry = parseTelemetry;
      function parseImuReading(data, scale) {
        function sample(startIndex) {
          return {
            x: scale * data.getInt16(startIndex),
            y: scale * data.getInt16(startIndex + 2),
            z: scale * data.getInt16(startIndex + 4)
          };
        }
        // tslint:disable:object-literal-sort-keys
        return {
          sequenceId: data.getUint16(0),
          samples: [sample(2), sample(8), sample(14)]
        };
        // tslint:enable:object-literal-sort-keys
      }
      function parseAccelerometer(data) {
        return parseImuReading(data, 0.0000610352);
      }
      exports.parseAccelerometer = parseAccelerometer;
      function parseGyroscope(data) {
        return parseImuReading(data, 0.0074768);
      }
      exports.parseGyroscope = parseGyroscope;
      //# sourceMappingURL=muse-parse.js.map

      /***/
    },
    /* 52 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var mergeMap_1 = __webpack_require__(12);
      /* tslint:enable:max-line-length */
      /**
       * Projects each source value to an Observable which is merged in the output
       * Observable, in a serialized fashion waiting for each one to complete before
       * merging the next.
       *
       * <span class="informal">Maps each value to an Observable, then flattens all of
       * these inner Observables using {@link concatAll}.</span>
       *
       * <img src="./img/concatMap.png" width="100%">
       *
       * Returns an Observable that emits items based on applying a function that you
       * supply to each item emitted by the source Observable, where that function
       * returns an (so-called "inner") Observable. Each new inner Observable is
       * concatenated with the previous inner Observable.
       *
       * __Warning:__ if source values arrive endlessly and faster than their
       * corresponding inner Observables can complete, it will result in memory issues
       * as inner Observables amass in an unbounded buffer waiting for their turn to
       * be subscribed to.
       *
       * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
       * to `1`.
       *
       * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
       * result.subscribe(x => console.log(x));
       *
       * // Results in the following:
       * // (results are not concurrent)
       * // For every click on the "document" it will emit values 0 to 3 spaced
       * // on a 1000ms interval
       * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
       *
       * @see {@link concat}
       * @see {@link concatAll}
       * @see {@link concatMapTo}
       * @see {@link exhaustMap}
       * @see {@link mergeMap}
       * @see {@link switchMap}
       *
       * @param {function(value: T, ?index: number): ObservableInput} project A function
       * that, when applied to an item emitted by the source Observable, returns an
       * Observable.
       * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
       * A function to produce the value on the output Observable based on the values
       * and the indices of the source (outer) emission and the inner Observable
       * emission. The arguments passed to this function are:
       * - `outerValue`: the value that came from the source
       * - `innerValue`: the value that came from the projected Observable
       * - `outerIndex`: the "index" of the value that came from the source
       * - `innerIndex`: the "index" of the value from the projected Observable
       * @return {Observable} An Observable that emits the result of applying the
       * projection function (and the optional `resultSelector`) to each item emitted
       * by the source Observable and taking values from each projected inner
       * Observable sequentially.
       * @method concatMap
       * @owner Observable
       */
      function concatMap(project, resultSelector) {
        return mergeMap_1.mergeMap(project, resultSelector, 1);
      }
      exports.concatMap = concatMap;
      //# sourceMappingURL=concatMap.js.map

      /***/
    },
    /* 53 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      /* tslint:enable:max-line-length */
      /**
       * Applies an accumulator function over the source Observable, and returns each
       * intermediate result, with an optional seed value.
       *
       * <span class="informal">It's like {@link reduce}, but emits the current
       * accumulation whenever the source emits a value.</span>
       *
       * <img src="./img/scan.png" width="100%">
       *
       * Combines together all values emitted on the source, using an accumulator
       * function that knows how to join a new source value into the accumulation from
       * the past. Is similar to {@link reduce}, but emits the intermediate
       * accumulations.
       *
       * Returns an Observable that applies a specified `accumulator` function to each
       * item emitted by the source Observable. If a `seed` value is specified, then
       * that value will be used as the initial value for the accumulator. If no seed
       * value is specified, the first item of the source is used as the seed.
       *
       * @example <caption>Count the number of click events</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var ones = clicks.mapTo(1);
       * var seed = 0;
       * var count = ones.scan((acc, one) => acc + one, seed);
       * count.subscribe(x => console.log(x));
       *
       * @see {@link expand}
       * @see {@link mergeScan}
       * @see {@link reduce}
       *
       * @param {function(acc: R, value: T, index: number): R} accumulator
       * The accumulator function called on each source value.
       * @param {T|R} [seed] The initial accumulation value.
       * @return {Observable<R>} An observable of the accumulated values.
       * @method scan
       * @owner Observable
       */
      function scan(accumulator, seed) {
        var hasSeed = false;
        // providing a seed of `undefined` *should* be valid and trigger
        // hasSeed! so don't use `seed !== undefined` checks!
        // For this reason, we have to check it here at the original call site
        // otherwise inside Operator/Subscriber we won't know if `undefined`
        // means they didn't provide anything or if they literally provided `undefined`
        if (arguments.length >= 2) {
          hasSeed = true;
        }
        return function scanOperatorFunction(source) {
          return source.lift(new ScanOperator(accumulator, seed, hasSeed));
        };
      }
      exports.scan = scan;
      var ScanOperator = (function() {
        function ScanOperator(accumulator, seed, hasSeed) {
          if (hasSeed === void 0) {
            hasSeed = false;
          }
          this.accumulator = accumulator;
          this.seed = seed;
          this.hasSeed = hasSeed;
        }
        ScanOperator.prototype.call = function(subscriber, source) {
          return source.subscribe(
            new ScanSubscriber(
              subscriber,
              this.accumulator,
              this.seed,
              this.hasSeed
            )
          );
        };
        return ScanOperator;
      })();
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var ScanSubscriber = (function(_super) {
        __extends(ScanSubscriber, _super);
        function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
          _super.call(this, destination);
          this.accumulator = accumulator;
          this._seed = _seed;
          this.hasSeed = hasSeed;
          this.index = 0;
        }
        Object.defineProperty(ScanSubscriber.prototype, "seed", {
          get: function() {
            return this._seed;
          },
          set: function(value) {
            this.hasSeed = true;
            this._seed = value;
          },
          enumerable: true,
          configurable: true
        });
        ScanSubscriber.prototype._next = function(value) {
          if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
          } else {
            return this._tryNext(value);
          }
        };
        ScanSubscriber.prototype._tryNext = function(value) {
          var index = this.index++;
          var result;
          try {
            result = this.accumulator(this.seed, value, index);
          } catch (err) {
            this.destination.error(err);
          }
          this.seed = result;
          this.destination.next(result);
        };
        return ScanSubscriber;
      })(Subscriber_1.Subscriber);
      //# sourceMappingURL=scan.js.map

      /***/
    },
    /* 54 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __awaiter =
        (this && this.__awaiter) ||
        function(thisArg, _arguments, P, generator) {
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
              result.done
                ? resolve(result.value)
                : new P(function(resolve) {
                    resolve(result.value);
                  }).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var __generator =
        (this && this.__generator) ||
        function(thisArg, body) {
          var _ = {
              label: 0,
              sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: []
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
              (g[Symbol.iterator] = function() {
                return this;
              }),
            g
          );
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [0, t.value];
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
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
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
                    if (t[2]) _.ops.pop();
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
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
      Object.defineProperty(exports, "__esModule", { value: true });
      var fromEvent_1 = __webpack_require__(21);
      var map_1 = __webpack_require__(14);
      var takeUntil_1 = __webpack_require__(55);
      function decodeResponse(bytes) {
        return new TextDecoder().decode(bytes.subarray(1, 1 + bytes[0]));
      }
      exports.decodeResponse = decodeResponse;
      function encodeCommand(cmd) {
        var encoded = new TextEncoder("utf-8").encode("X" + cmd + "\n");
        encoded[0] = encoded.length - 1;
        return encoded;
      }
      exports.encodeCommand = encodeCommand;
      function observableCharacteristic(characteristic) {
        return __awaiter(this, void 0, void 0, function() {
          var disconnected;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, characteristic.startNotifications()];
              case 1:
                _a.sent();
                disconnected = fromEvent_1.fromEvent(
                  characteristic.service.device,
                  "gattserverdisconnected"
                );
                return [
                  2 /*return*/,
                  fromEvent_1
                    .fromEvent(characteristic, "characteristicvaluechanged")
                    .pipe(
                      takeUntil_1.takeUntil(disconnected),
                      map_1.map(function(event) {
                        return event.target.value;
                      })
                    )
                ];
            }
          });
        });
      }
      exports.observableCharacteristic = observableCharacteristic;
      //# sourceMappingURL=muse-utils.js.map

      /***/
    },
    /* 55 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var OuterSubscriber_1 = __webpack_require__(27);
      var subscribeToResult_1 = __webpack_require__(24);
      /**
       * Emits the values emitted by the source Observable until a `notifier`
       * Observable emits a value.
       *
       * <span class="informal">Lets values pass until a second Observable,
       * `notifier`, emits something. Then, it completes.</span>
       *
       * <img src="./img/takeUntil.png" width="100%">
       *
       * `takeUntil` subscribes and begins mirroring the source Observable. It also
       * monitors a second Observable, `notifier` that you provide. If the `notifier`
       * emits a value or a complete notification, the output Observable stops
       * mirroring the source Observable and completes.
       *
       * @example <caption>Tick every second until the first click happens</caption>
       * var interval = Rx.Observable.interval(1000);
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var result = interval.takeUntil(clicks);
       * result.subscribe(x => console.log(x));
       *
       * @see {@link take}
       * @see {@link takeLast}
       * @see {@link takeWhile}
       * @see {@link skip}
       *
       * @param {Observable} notifier The Observable whose first emitted value will
       * cause the output Observable of `takeUntil` to stop emitting values from the
       * source Observable.
       * @return {Observable<T>} An Observable that emits the values from the source
       * Observable until such time as `notifier` emits its first value.
       * @method takeUntil
       * @owner Observable
       */
      function takeUntil(notifier) {
        return function(source) {
          return source.lift(new TakeUntilOperator(notifier));
        };
      }
      exports.takeUntil = takeUntil;
      var TakeUntilOperator = (function() {
        function TakeUntilOperator(notifier) {
          this.notifier = notifier;
        }
        TakeUntilOperator.prototype.call = function(subscriber, source) {
          return source.subscribe(
            new TakeUntilSubscriber(subscriber, this.notifier)
          );
        };
        return TakeUntilOperator;
      })();
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var TakeUntilSubscriber = (function(_super) {
        __extends(TakeUntilSubscriber, _super);
        function TakeUntilSubscriber(destination, notifier) {
          _super.call(this, destination);
          this.notifier = notifier;
          this.add(subscribeToResult_1.subscribeToResult(this, notifier));
        }
        TakeUntilSubscriber.prototype.notifyNext = function(
          outerValue,
          innerValue,
          outerIndex,
          innerIndex,
          innerSub
        ) {
          this.complete();
        };
        TakeUntilSubscriber.prototype.notifyComplete = function() {
          // noop
        };
        return TakeUntilSubscriber;
      })(OuterSubscriber_1.OuterSubscriber);
      //# sourceMappingURL=takeUntil.js.map

      /***/
    },
    /* 56 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var muse_1 = __webpack_require__(15);
      var from_1 = __webpack_require__(30);
      var concat_1 = __webpack_require__(63);
      var mergeMap_1 = __webpack_require__(12);
      function zipSamples(eegReadings) {
        var buffer = [];
        var lastTimestamp = null;
        return eegReadings.pipe(
          mergeMap_1.mergeMap(function(reading) {
            if (reading.timestamp !== lastTimestamp) {
              lastTimestamp = reading.timestamp;
              if (buffer.length) {
                var result = from_1.from([buffer.slice()]);
                buffer.splice(0, buffer.length, reading);
                return result;
              }
            }
            buffer.push(reading);
            return from_1.from([]);
          }),
          concat_1.concat(from_1.from([buffer])),
          mergeMap_1.mergeMap(function(readings) {
            var result = readings[0].samples.map(function(x, index) {
              var data = [NaN, NaN, NaN, NaN, NaN];
              for (
                var _i = 0, readings_1 = readings;
                _i < readings_1.length;
                _i++
              ) {
                var reading = readings_1[_i];
                data[reading.electrode] = reading.samples[index];
              }
              return {
                data: data,
                index: readings[0].index,
                timestamp:
                  readings[0].timestamp + (index * 1000) / muse_1.EEG_FREQUENCY
              };
            });
            return from_1.from(result);
          })
        );
      }
      exports.zipSamples = zipSamples;
      //# sourceMappingURL=zip-samples.js.map

      /***/
    },
    /* 57 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var isArray_1 = __webpack_require__(16);
      var isArrayLike_1 = __webpack_require__(25);
      var isPromise_1 = __webpack_require__(26);
      var PromiseObservable_1 = __webpack_require__(58);
      var IteratorObservable_1 = __webpack_require__(59);
      var ArrayObservable_1 = __webpack_require__(9);
      var ArrayLikeObservable_1 = __webpack_require__(60);
      var iterator_1 = __webpack_require__(13);
      var Observable_1 = __webpack_require__(0);
      var observeOn_1 = __webpack_require__(61);
      var observable_1 = __webpack_require__(8);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var FromObservable = (function(_super) {
        __extends(FromObservable, _super);
        function FromObservable(ish, scheduler) {
          _super.call(this, null);
          this.ish = ish;
          this.scheduler = scheduler;
        }
        /**
         * Creates an Observable from an Array, an array-like object, a Promise, an
         * iterable object, or an Observable-like object.
         *
         * <span class="informal">Converts almost anything to an Observable.</span>
         *
         * <img src="./img/from.png" width="100%">
         *
         * Convert various other objects and data types into Observables. `from`
         * converts a Promise or an array-like or an
         * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
         * object into an Observable that emits the items in that promise or array or
         * iterable. A String, in this context, is treated as an array of characters.
         * Observable-like objects (contains a function named with the ES2015 Symbol
         * for Observable) can also be converted through this operator.
         *
         * @example <caption>Converts an array to an Observable</caption>
         * var array = [10, 20, 30];
         * var result = Rx.Observable.from(array);
         * result.subscribe(x => console.log(x));
         *
         * // Results in the following:
         * // 10 20 30
         *
         * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
         * function* generateDoubles(seed) {
         *   var i = seed;
         *   while (true) {
         *     yield i;
         *     i = 2 * i; // double it
         *   }
         * }
         *
         * var iterator = generateDoubles(3);
         * var result = Rx.Observable.from(iterator).take(10);
         * result.subscribe(x => console.log(x));
         *
         * // Results in the following:
         * // 3 6 12 24 48 96 192 384 768 1536
         *
         * @see {@link create}
         * @see {@link fromEvent}
         * @see {@link fromEventPattern}
         * @see {@link fromPromise}
         *
         * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
         * Observable-like, an Array, an iterable or an array-like object to be
         * converted.
         * @param {Scheduler} [scheduler] The scheduler on which to schedule the
         * emissions of values.
         * @return {Observable<T>} The Observable whose values are originally from the
         * input object that was converted.
         * @static true
         * @name from
         * @owner Observable
         */
        FromObservable.create = function(ish, scheduler) {
          if (ish != null) {
            if (typeof ish[observable_1.observable] === "function") {
              if (ish instanceof Observable_1.Observable && !scheduler) {
                return ish;
              }
              return new FromObservable(ish, scheduler);
            } else if (isArray_1.isArray(ish)) {
              return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            } else if (isPromise_1.isPromise(ish)) {
              return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            } else if (
              typeof ish[iterator_1.iterator] === "function" ||
              typeof ish === "string"
            ) {
              return new IteratorObservable_1.IteratorObservable(
                ish,
                scheduler
              );
            } else if (isArrayLike_1.isArrayLike(ish)) {
              return new ArrayLikeObservable_1.ArrayLikeObservable(
                ish,
                scheduler
              );
            }
          }
          throw new TypeError(
            ((ish !== null && typeof ish) || ish) + " is not observable"
          );
        };
        FromObservable.prototype._subscribe = function(subscriber) {
          var ish = this.ish;
          var scheduler = this.scheduler;
          if (scheduler == null) {
            return ish[observable_1.observable]().subscribe(subscriber);
          } else {
            return ish[observable_1.observable]().subscribe(
              new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0)
            );
          }
        };
        return FromObservable;
      })(Observable_1.Observable);
      exports.FromObservable = FromObservable;
      //# sourceMappingURL=FromObservable.js.map

      /***/
    },
    /* 58 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var root_1 = __webpack_require__(2);
      var Observable_1 = __webpack_require__(0);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var PromiseObservable = (function(_super) {
        __extends(PromiseObservable, _super);
        function PromiseObservable(promise, scheduler) {
          _super.call(this);
          this.promise = promise;
          this.scheduler = scheduler;
        }
        /**
         * Converts a Promise to an Observable.
         *
         * <span class="informal">Returns an Observable that just emits the Promise's
         * resolved value, then completes.</span>
         *
         * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
         * Observable. If the Promise resolves with a value, the output Observable
         * emits that resolved value as a `next`, and then completes. If the Promise
         * is rejected, then the output Observable emits the corresponding Error.
         *
         * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
         * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
         * result.subscribe(x => console.log(x), e => console.error(e));
         *
         * @see {@link bindCallback}
         * @see {@link from}
         *
         * @param {PromiseLike<T>} promise The promise to be converted.
         * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
         * the delivery of the resolved value (or the rejection).
         * @return {Observable<T>} An Observable which wraps the Promise.
         * @static true
         * @name fromPromise
         * @owner Observable
         */
        PromiseObservable.create = function(promise, scheduler) {
          return new PromiseObservable(promise, scheduler);
        };
        PromiseObservable.prototype._subscribe = function(subscriber) {
          var _this = this;
          var promise = this.promise;
          var scheduler = this.scheduler;
          if (scheduler == null) {
            if (this._isScalar) {
              if (!subscriber.closed) {
                subscriber.next(this.value);
                subscriber.complete();
              }
            } else {
              promise
                .then(
                  function(value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                      subscriber.next(value);
                      subscriber.complete();
                    }
                  },
                  function(err) {
                    if (!subscriber.closed) {
                      subscriber.error(err);
                    }
                  }
                )
                .then(null, function(err) {
                  // escape the promise trap, throw unhandled errors
                  root_1.root.setTimeout(function() {
                    throw err;
                  });
                });
            }
          } else {
            if (this._isScalar) {
              if (!subscriber.closed) {
                return scheduler.schedule(dispatchNext, 0, {
                  value: this.value,
                  subscriber: subscriber
                });
              }
            } else {
              promise
                .then(
                  function(value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                      subscriber.add(
                        scheduler.schedule(dispatchNext, 0, {
                          value: value,
                          subscriber: subscriber
                        })
                      );
                    }
                  },
                  function(err) {
                    if (!subscriber.closed) {
                      subscriber.add(
                        scheduler.schedule(dispatchError, 0, {
                          err: err,
                          subscriber: subscriber
                        })
                      );
                    }
                  }
                )
                .then(null, function(err) {
                  // escape the promise trap, throw unhandled errors
                  root_1.root.setTimeout(function() {
                    throw err;
                  });
                });
            }
          }
        };
        return PromiseObservable;
      })(Observable_1.Observable);
      exports.PromiseObservable = PromiseObservable;
      function dispatchNext(arg) {
        var value = arg.value,
          subscriber = arg.subscriber;
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }
      function dispatchError(arg) {
        var err = arg.err,
          subscriber = arg.subscriber;
        if (!subscriber.closed) {
          subscriber.error(err);
        }
      }
      //# sourceMappingURL=PromiseObservable.js.map

      /***/
    },
    /* 59 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var root_1 = __webpack_require__(2);
      var Observable_1 = __webpack_require__(0);
      var iterator_1 = __webpack_require__(13);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var IteratorObservable = (function(_super) {
        __extends(IteratorObservable, _super);
        function IteratorObservable(iterator, scheduler) {
          _super.call(this);
          this.scheduler = scheduler;
          if (iterator == null) {
            throw new Error("iterator cannot be null.");
          }
          this.iterator = getIterator(iterator);
        }
        IteratorObservable.create = function(iterator, scheduler) {
          return new IteratorObservable(iterator, scheduler);
        };
        IteratorObservable.dispatch = function(state) {
          var index = state.index,
            hasError = state.hasError,
            iterator = state.iterator,
            subscriber = state.subscriber;
          if (hasError) {
            subscriber.error(state.error);
            return;
          }
          var result = iterator.next();
          if (result.done) {
            subscriber.complete();
            return;
          }
          subscriber.next(result.value);
          state.index = index + 1;
          if (subscriber.closed) {
            if (typeof iterator.return === "function") {
              iterator.return();
            }
            return;
          }
          this.schedule(state);
        };
        IteratorObservable.prototype._subscribe = function(subscriber) {
          var index = 0;
          var _a = this,
            iterator = _a.iterator,
            scheduler = _a.scheduler;
          if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
              index: index,
              iterator: iterator,
              subscriber: subscriber
            });
          } else {
            do {
              var result = iterator.next();
              if (result.done) {
                subscriber.complete();
                break;
              } else {
                subscriber.next(result.value);
              }
              if (subscriber.closed) {
                if (typeof iterator.return === "function") {
                  iterator.return();
                }
                break;
              }
            } while (true);
          }
        };
        return IteratorObservable;
      })(Observable_1.Observable);
      exports.IteratorObservable = IteratorObservable;
      var StringIterator = (function() {
        function StringIterator(str, idx, len) {
          if (idx === void 0) {
            idx = 0;
          }
          if (len === void 0) {
            len = str.length;
          }
          this.str = str;
          this.idx = idx;
          this.len = len;
        }
        StringIterator.prototype[iterator_1.iterator] = function() {
          return this;
        };
        StringIterator.prototype.next = function() {
          return this.idx < this.len
            ? {
                done: false,
                value: this.str.charAt(this.idx++)
              }
            : {
                done: true,
                value: undefined
              };
        };
        return StringIterator;
      })();
      var ArrayIterator = (function() {
        function ArrayIterator(arr, idx, len) {
          if (idx === void 0) {
            idx = 0;
          }
          if (len === void 0) {
            len = toLength(arr);
          }
          this.arr = arr;
          this.idx = idx;
          this.len = len;
        }
        ArrayIterator.prototype[iterator_1.iterator] = function() {
          return this;
        };
        ArrayIterator.prototype.next = function() {
          return this.idx < this.len
            ? {
                done: false,
                value: this.arr[this.idx++]
              }
            : {
                done: true,
                value: undefined
              };
        };
        return ArrayIterator;
      })();
      function getIterator(obj) {
        var i = obj[iterator_1.iterator];
        if (!i && typeof obj === "string") {
          return new StringIterator(obj);
        }
        if (!i && obj.length !== undefined) {
          return new ArrayIterator(obj);
        }
        if (!i) {
          throw new TypeError("object is not iterable");
        }
        return obj[iterator_1.iterator]();
      }
      var maxSafeInteger = Math.pow(2, 53) - 1;
      function toLength(o) {
        var len = +o.length;
        if (isNaN(len)) {
          return 0;
        }
        if (len === 0 || !numberIsFinite(len)) {
          return len;
        }
        len = sign(len) * Math.floor(Math.abs(len));
        if (len <= 0) {
          return 0;
        }
        if (len > maxSafeInteger) {
          return maxSafeInteger;
        }
        return len;
      }
      function numberIsFinite(value) {
        return typeof value === "number" && root_1.root.isFinite(value);
      }
      function sign(value) {
        var valueAsNumber = +value;
        if (valueAsNumber === 0) {
          return valueAsNumber;
        }
        if (isNaN(valueAsNumber)) {
          return valueAsNumber;
        }
        return valueAsNumber < 0 ? -1 : 1;
      }
      //# sourceMappingURL=IteratorObservable.js.map

      /***/
    },
    /* 60 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Observable_1 = __webpack_require__(0);
      var ScalarObservable_1 = __webpack_require__(22);
      var EmptyObservable_1 = __webpack_require__(10);
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @extends {Ignored}
       * @hide true
       */
      var ArrayLikeObservable = (function(_super) {
        __extends(ArrayLikeObservable, _super);
        function ArrayLikeObservable(arrayLike, scheduler) {
          _super.call(this);
          this.arrayLike = arrayLike;
          this.scheduler = scheduler;
          if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
          }
        }
        ArrayLikeObservable.create = function(arrayLike, scheduler) {
          var length = arrayLike.length;
          if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
          } else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(
              arrayLike[0],
              scheduler
            );
          } else {
            return new ArrayLikeObservable(arrayLike, scheduler);
          }
        };
        ArrayLikeObservable.dispatch = function(state) {
          var arrayLike = state.arrayLike,
            index = state.index,
            length = state.length,
            subscriber = state.subscriber;
          if (subscriber.closed) {
            return;
          }
          if (index >= length) {
            subscriber.complete();
            return;
          }
          subscriber.next(arrayLike[index]);
          state.index = index + 1;
          this.schedule(state);
        };
        ArrayLikeObservable.prototype._subscribe = function(subscriber) {
          var index = 0;
          var _a = this,
            arrayLike = _a.arrayLike,
            scheduler = _a.scheduler;
          var length = arrayLike.length;
          if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
              arrayLike: arrayLike,
              index: index,
              length: length,
              subscriber: subscriber
            });
          } else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
              subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
          }
        };
        return ArrayLikeObservable;
      })(Observable_1.Observable);
      exports.ArrayLikeObservable = ArrayLikeObservable;
      //# sourceMappingURL=ArrayLikeObservable.js.map

      /***/
    },
    /* 61 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var __extends =
        (this && this.__extends) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        };
      var Subscriber_1 = __webpack_require__(1);
      var Notification_1 = __webpack_require__(62);
      /**
       *
       * Re-emits all notifications from source Observable with specified scheduler.
       *
       * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
       *
       * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
       * notifications emitted by the source Observable. It might be useful, if you do not have control over
       * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
       *
       * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
       * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
       * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
       * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
       * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
       * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
       * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
       * little bit more, to ensure that they are emitted at expected moments.
       *
       * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
       * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
       * will delay all notifications - including error notifications - while `delay` will pass through error
       * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
       * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
       * for notification emissions in general.
       *
       * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
       * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
       *                                               // with async scheduler by default...
       *
       * intervals
       * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
       * .subscribe(val => {                           // scheduler to ensure smooth animation.
       *   someDiv.style.height = val + 'px';
       * });
       *
       * @see {@link delay}
       *
       * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
       * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
       * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
       * but with provided scheduler.
       *
       * @method observeOn
       * @owner Observable
       */
      function observeOn(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return function observeOnOperatorFunction(source) {
          return source.lift(new ObserveOnOperator(scheduler, delay));
        };
      }
      exports.observeOn = observeOn;
      var ObserveOnOperator = (function() {
        function ObserveOnOperator(scheduler, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          this.scheduler = scheduler;
          this.delay = delay;
        }
        ObserveOnOperator.prototype.call = function(subscriber, source) {
          return source.subscribe(
            new ObserveOnSubscriber(subscriber, this.scheduler, this.delay)
          );
        };
        return ObserveOnOperator;
      })();
      exports.ObserveOnOperator = ObserveOnOperator;
      /**
       * We need this JSDoc comment for affecting ESDoc.
       * @ignore
       * @extends {Ignored}
       */
      var ObserveOnSubscriber = (function(_super) {
        __extends(ObserveOnSubscriber, _super);
        function ObserveOnSubscriber(destination, scheduler, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          _super.call(this, destination);
          this.scheduler = scheduler;
          this.delay = delay;
        }
        ObserveOnSubscriber.dispatch = function(arg) {
          var notification = arg.notification,
            destination = arg.destination;
          notification.observe(destination);
          this.unsubscribe();
        };
        ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
          this.add(
            this.scheduler.schedule(
              ObserveOnSubscriber.dispatch,
              this.delay,
              new ObserveOnMessage(notification, this.destination)
            )
          );
        };
        ObserveOnSubscriber.prototype._next = function(value) {
          this.scheduleMessage(Notification_1.Notification.createNext(value));
        };
        ObserveOnSubscriber.prototype._error = function(err) {
          this.scheduleMessage(Notification_1.Notification.createError(err));
        };
        ObserveOnSubscriber.prototype._complete = function() {
          this.scheduleMessage(Notification_1.Notification.createComplete());
        };
        return ObserveOnSubscriber;
      })(Subscriber_1.Subscriber);
      exports.ObserveOnSubscriber = ObserveOnSubscriber;
      var ObserveOnMessage = (function() {
        function ObserveOnMessage(notification, destination) {
          this.notification = notification;
          this.destination = destination;
        }
        return ObserveOnMessage;
      })();
      exports.ObserveOnMessage = ObserveOnMessage;
      //# sourceMappingURL=observeOn.js.map

      /***/
    },
    /* 62 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var Observable_1 = __webpack_require__(0);
      /**
       * Represents a push-based event or value that an {@link Observable} can emit.
       * This class is particularly useful for operators that manage notifications,
       * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
       * others. Besides wrapping the actual delivered value, it also annotates it
       * with metadata of, for instance, what type of push message it is (`next`,
       * `error`, or `complete`).
       *
       * @see {@link materialize}
       * @see {@link dematerialize}
       * @see {@link observeOn}
       *
       * @class Notification<T>
       */
      var Notification = (function() {
        function Notification(kind, value, error) {
          this.kind = kind;
          this.value = value;
          this.error = error;
          this.hasValue = kind === "N";
        }
        /**
         * Delivers to the given `observer` the value wrapped by this Notification.
         * @param {Observer} observer
         * @return
         */
        Notification.prototype.observe = function(observer) {
          switch (this.kind) {
            case "N":
              return observer.next && observer.next(this.value);
            case "E":
              return observer.error && observer.error(this.error);
            case "C":
              return observer.complete && observer.complete();
          }
        };
        /**
         * Given some {@link Observer} callbacks, deliver the value represented by the
         * current Notification to the correctly corresponding callback.
         * @param {function(value: T): void} next An Observer `next` callback.
         * @param {function(err: any): void} [error] An Observer `error` callback.
         * @param {function(): void} [complete] An Observer `complete` callback.
         * @return {any}
         */
        Notification.prototype.do = function(next, error, complete) {
          var kind = this.kind;
          switch (kind) {
            case "N":
              return next && next(this.value);
            case "E":
              return error && error(this.error);
            case "C":
              return complete && complete();
          }
        };
        /**
         * Takes an Observer or its individual callback functions, and calls `observe`
         * or `do` methods accordingly.
         * @param {Observer|function(value: T): void} nextOrObserver An Observer or
         * the `next` callback.
         * @param {function(err: any): void} [error] An Observer `error` callback.
         * @param {function(): void} [complete] An Observer `complete` callback.
         * @return {any}
         */
        Notification.prototype.accept = function(
          nextOrObserver,
          error,
          complete
        ) {
          if (nextOrObserver && typeof nextOrObserver.next === "function") {
            return this.observe(nextOrObserver);
          } else {
            return this.do(nextOrObserver, error, complete);
          }
        };
        /**
         * Returns a simple Observable that just delivers the notification represented
         * by this Notification instance.
         * @return {any}
         */
        Notification.prototype.toObservable = function() {
          var kind = this.kind;
          switch (kind) {
            case "N":
              return Observable_1.Observable.of(this.value);
            case "E":
              return Observable_1.Observable.throw(this.error);
            case "C":
              return Observable_1.Observable.empty();
          }
          throw new Error("unexpected notification kind value");
        };
        /**
         * A shortcut to create a Notification instance of the type `next` from a
         * given value.
         * @param {T} value The `next` value.
         * @return {Notification<T>} The "next" Notification representing the
         * argument.
         */
        Notification.createNext = function(value) {
          if (typeof value !== "undefined") {
            return new Notification("N", value);
          }
          return Notification.undefinedValueNotification;
        };
        /**
         * A shortcut to create a Notification instance of the type `error` from a
         * given error.
         * @param {any} [err] The `error` error.
         * @return {Notification<T>} The "error" Notification representing the
         * argument.
         */
        Notification.createError = function(err) {
          return new Notification("E", undefined, err);
        };
        /**
         * A shortcut to create a Notification instance of the type `complete`.
         * @return {Notification<any>} The valueless "complete" Notification.
         */
        Notification.createComplete = function() {
          return Notification.completeNotification;
        };
        Notification.completeNotification = new Notification("C");
        Notification.undefinedValueNotification = new Notification(
          "N",
          undefined
        );
        return Notification;
      })();
      exports.Notification = Notification;
      //# sourceMappingURL=Notification.js.map

      /***/
    },
    /* 63 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var concat_1 = __webpack_require__(31);
      var concat_2 = __webpack_require__(31);
      exports.concatStatic = concat_2.concat;
      /* tslint:enable:max-line-length */
      /**
       * Creates an output Observable which sequentially emits all values from every
       * given input Observable after the current Observable.
       *
       * <span class="informal">Concatenates multiple Observables together by
       * sequentially emitting their values, one Observable after the other.</span>
       *
       * <img src="./img/concat.png" width="100%">
       *
       * Joins this Observable with multiple other Observables by subscribing to them
       * one at a time, starting with the source, and merging their results into the
       * output Observable. Will wait for each Observable to complete before moving
       * on to the next.
       *
       * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
       * var timer = Rx.Observable.interval(1000).take(4);
       * var sequence = Rx.Observable.range(1, 10);
       * var result = timer.concat(sequence);
       * result.subscribe(x => console.log(x));
       *
       * // results in:
       * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
       *
       * @example <caption>Concatenate 3 Observables</caption>
       * var timer1 = Rx.Observable.interval(1000).take(10);
       * var timer2 = Rx.Observable.interval(2000).take(6);
       * var timer3 = Rx.Observable.interval(500).take(10);
       * var result = timer1.concat(timer2, timer3);
       * result.subscribe(x => console.log(x));
       *
       * // results in the following:
       * // (Prints to console sequentially)
       * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
       * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
       * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
       *
       * @see {@link concatAll}
       * @see {@link concatMap}
       * @see {@link concatMapTo}
       *
       * @param {ObservableInput} other An input Observable to concatenate after the source
       * Observable. More than one input Observables may be given as argument.
       * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
       * Observable subscription on.
       * @return {Observable} All values of each passed Observable merged into a
       * single Observable, in order, in serial fashion.
       * @method concat
       * @owner Observable
       */
      function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i - 0] = arguments[_i];
        }
        return function(source) {
          return source.lift.call(
            concat_1.concat.apply(void 0, [source].concat(observables))
          );
        };
      }
      exports.concat = concat;
      //# sourceMappingURL=concat.js.map

      /***/
    },
    /* 64 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var ArrayObservable_1 = __webpack_require__(9);
      exports.of = ArrayObservable_1.ArrayObservable.of;
      //# sourceMappingURL=of.js.map

      /***/
    },
    /* 65 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var mergeAll_1 = __webpack_require__(23);
      /**
       * Converts a higher-order Observable into a first-order Observable by
       * concatenating the inner Observables in order.
       *
       * <span class="informal">Flattens an Observable-of-Observables by putting one
       * inner Observable after the other.</span>
       *
       * <img src="./img/concatAll.png" width="100%">
       *
       * Joins every Observable emitted by the source (a higher-order Observable), in
       * a serial fashion. It subscribes to each inner Observable only after the
       * previous inner Observable has completed, and merges all of their values into
       * the returned observable.
       *
       * __Warning:__ If the source Observable emits Observables quickly and
       * endlessly, and the inner Observables it emits generally complete slower than
       * the source emits, you can run into memory issues as the incoming Observables
       * collect in an unbounded buffer.
       *
       * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
       * to `1`.
       *
       * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
       * var clicks = Rx.Observable.fromEvent(document, 'click');
       * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
       * var firstOrder = higherOrder.concatAll();
       * firstOrder.subscribe(x => console.log(x));
       *
       * // Results in the following:
       * // (results are not concurrent)
       * // For every click on the "document" it will emit values 0 to 3 spaced
       * // on a 1000ms interval
       * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
       *
       * @see {@link combineAll}
       * @see {@link concat}
       * @see {@link concatMap}
       * @see {@link concatMapTo}
       * @see {@link exhaust}
       * @see {@link mergeAll}
       * @see {@link switch}
       * @see {@link zipAll}
       *
       * @return {Observable} An Observable emitting values from all the inner
       * Observables concatenated.
       * @method concatAll
       * @owner Observable
       */
      function concatAll() {
        return mergeAll_1.mergeAll(1);
      }
      exports.concatAll = concatAll;
      //# sourceMappingURL=concatAll.js.map

      /***/
    },
    /* 66 */
    /***/ function(module, exports, __webpack_require__) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (true) module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object") exports["Ganglion"] = factory();
        else root["Ganglion"] = factory();
      })(typeof self !== "undefined" ? self : this, function() {
        return /******/ (function(modules) {
          // webpackBootstrap
          /******/ // The module cache
          /******/ var installedModules = {}; // The require function
          /******/
          /******/ /******/ function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) {
              /******/ return installedModules[moduleId].exports;
              /******/
            } // Create a new module (and put it into the cache)
            /******/ /******/ var module = (installedModules[moduleId] = {
              /******/ i: moduleId,
              /******/ l: false,
              /******/ exports: {}
              /******/
            }); // Execute the module function
            /******/
            /******/ /******/ modules[moduleId].call(
              module.exports,
              module,
              module.exports,
              __webpack_require__
            ); // Flag the module as loaded
            /******/
            /******/ /******/ module.l = true; // Return the exports of the module
            /******/
            /******/ /******/ return module.exports;
            /******/
          } // expose the modules object (__webpack_modules__)
          /******/
          /******/
          /******/ /******/ __webpack_require__.m = modules; // expose the module cache
          /******/
          /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
          /******/
          /******/ /******/ __webpack_require__.d = function(
            exports,
            name,
            getter
          ) {
            /******/ if (!__webpack_require__.o(exports, name)) {
              /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
                /******/
              });
              /******/
            }
            /******/
          }; // getDefaultExport function for compatibility with non-harmony modules
          /******/
          /******/ /******/ __webpack_require__.n = function(module) {
            /******/ var getter =
              module && module.__esModule
                ? /******/ function getDefault() {
                    return module["default"];
                  }
                : /******/ function getModuleExports() {
                    return module;
                  };
            /******/ __webpack_require__.d(getter, "a", getter);
            /******/ return getter;
            /******/
          }; // Object.prototype.hasOwnProperty.call
          /******/
          /******/ /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          }; // __webpack_public_path__
          /******/
          /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
          /******/
          /******/ /******/ return __webpack_require__(
            (__webpack_require__.s = 15)
          );
          /******/
        })(
          /************************************************************************/
          /******/ [
            /* 0 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar isFunction_1 = __webpack_require__(4);\nvar Subscription_1 = __webpack_require__(2);\nvar Observer_1 = __webpack_require__(10);\nvar rxSubscriber_1 = __webpack_require__(6);\n/**\n * Implements the {@link Observer} interface and extends the\n * {@link Subscription} class. While the {@link Observer} is the public API for\n * consuming the values of an {@link Observable}, all Observers get converted to\n * a Subscriber, in order to provide Subscription-like capabilities such as\n * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for\n * implementing operators, but it is rarely used as a public API.\n *\n * @class Subscriber<T>\n */\nvar Subscriber = (function (_super) {\n    __extends(Subscriber, _super);\n    /**\n     * @param {Observer|function(value: T): void} [destinationOrNext] A partially\n     * defined Observer or a `next` callback function.\n     * @param {function(e: ?any): void} [error] The `error` callback of an\n     * Observer.\n     * @param {function(): void} [complete] The `complete` callback of an\n     * Observer.\n     */\n    function Subscriber(destinationOrNext, error, complete) {\n        _super.call(this);\n        this.syncErrorValue = null;\n        this.syncErrorThrown = false;\n        this.syncErrorThrowable = false;\n        this.isStopped = false;\n        switch (arguments.length) {\n            case 0:\n                this.destination = Observer_1.empty;\n                break;\n            case 1:\n                if (!destinationOrNext) {\n                    this.destination = Observer_1.empty;\n                    break;\n                }\n                if (typeof destinationOrNext === 'object') {\n                    if (destinationOrNext instanceof Subscriber) {\n                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;\n                        this.destination = destinationOrNext;\n                        this.destination.add(this);\n                    }\n                    else {\n                        this.syncErrorThrowable = true;\n                        this.destination = new SafeSubscriber(this, destinationOrNext);\n                    }\n                    break;\n                }\n            default:\n                this.syncErrorThrowable = true;\n                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);\n                break;\n        }\n    }\n    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };\n    /**\n     * A static factory for a Subscriber, given a (potentially partial) definition\n     * of an Observer.\n     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.\n     * @param {function(e: ?any): void} [error] The `error` callback of an\n     * Observer.\n     * @param {function(): void} [complete] The `complete` callback of an\n     * Observer.\n     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)\n     * Observer represented by the given arguments.\n     */\n    Subscriber.create = function (next, error, complete) {\n        var subscriber = new Subscriber(next, error, complete);\n        subscriber.syncErrorThrowable = false;\n        return subscriber;\n    };\n    /**\n     * The {@link Observer} callback to receive notifications of type `next` from\n     * the Observable, with a value. The Observable may call this method 0 or more\n     * times.\n     * @param {T} [value] The `next` value.\n     * @return {void}\n     */\n    Subscriber.prototype.next = function (value) {\n        if (!this.isStopped) {\n            this._next(value);\n        }\n    };\n    /**\n     * The {@link Observer} callback to receive notifications of type `error` from\n     * the Observable, with an attached {@link Error}. Notifies the Observer that\n     * the Observable has experienced an error condition.\n     * @param {any} [err] The `error` exception.\n     * @return {void}\n     */\n    Subscriber.prototype.error = function (err) {\n        if (!this.isStopped) {\n            this.isStopped = true;\n            this._error(err);\n        }\n    };\n    /**\n     * The {@link Observer} callback to receive a valueless notification of type\n     * `complete` from the Observable. Notifies the Observer that the Observable\n     * has finished sending push-based notifications.\n     * @return {void}\n     */\n    Subscriber.prototype.complete = function () {\n        if (!this.isStopped) {\n            this.isStopped = true;\n            this._complete();\n        }\n    };\n    Subscriber.prototype.unsubscribe = function () {\n        if (this.closed) {\n            return;\n        }\n        this.isStopped = true;\n        _super.prototype.unsubscribe.call(this);\n    };\n    Subscriber.prototype._next = function (value) {\n        this.destination.next(value);\n    };\n    Subscriber.prototype._error = function (err) {\n        this.destination.error(err);\n        this.unsubscribe();\n    };\n    Subscriber.prototype._complete = function () {\n        this.destination.complete();\n        this.unsubscribe();\n    };\n    Subscriber.prototype._unsubscribeAndRecycle = function () {\n        var _a = this, _parent = _a._parent, _parents = _a._parents;\n        this._parent = null;\n        this._parents = null;\n        this.unsubscribe();\n        this.closed = false;\n        this.isStopped = false;\n        this._parent = _parent;\n        this._parents = _parents;\n        return this;\n    };\n    return Subscriber;\n}(Subscription_1.Subscription));\nexports.Subscriber = Subscriber;\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar SafeSubscriber = (function (_super) {\n    __extends(SafeSubscriber, _super);\n    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {\n        _super.call(this);\n        this._parentSubscriber = _parentSubscriber;\n        var next;\n        var context = this;\n        if (isFunction_1.isFunction(observerOrNext)) {\n            next = observerOrNext;\n        }\n        else if (observerOrNext) {\n            next = observerOrNext.next;\n            error = observerOrNext.error;\n            complete = observerOrNext.complete;\n            if (observerOrNext !== Observer_1.empty) {\n                context = Object.create(observerOrNext);\n                if (isFunction_1.isFunction(context.unsubscribe)) {\n                    this.add(context.unsubscribe.bind(context));\n                }\n                context.unsubscribe = this.unsubscribe.bind(this);\n            }\n        }\n        this._context = context;\n        this._next = next;\n        this._error = error;\n        this._complete = complete;\n    }\n    SafeSubscriber.prototype.next = function (value) {\n        if (!this.isStopped && this._next) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (!_parentSubscriber.syncErrorThrowable) {\n                this.__tryOrUnsub(this._next, value);\n            }\n            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.error = function (err) {\n        if (!this.isStopped) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (this._error) {\n                if (!_parentSubscriber.syncErrorThrowable) {\n                    this.__tryOrUnsub(this._error, err);\n                    this.unsubscribe();\n                }\n                else {\n                    this.__tryOrSetError(_parentSubscriber, this._error, err);\n                    this.unsubscribe();\n                }\n            }\n            else if (!_parentSubscriber.syncErrorThrowable) {\n                this.unsubscribe();\n                throw err;\n            }\n            else {\n                _parentSubscriber.syncErrorValue = err;\n                _parentSubscriber.syncErrorThrown = true;\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.complete = function () {\n        var _this = this;\n        if (!this.isStopped) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (this._complete) {\n                var wrappedComplete = function () { return _this._complete.call(_this._context); };\n                if (!_parentSubscriber.syncErrorThrowable) {\n                    this.__tryOrUnsub(wrappedComplete);\n                    this.unsubscribe();\n                }\n                else {\n                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);\n                    this.unsubscribe();\n                }\n            }\n            else {\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {\n        try {\n            fn.call(this._context, value);\n        }\n        catch (err) {\n            this.unsubscribe();\n            throw err;\n        }\n    };\n    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {\n        try {\n            fn.call(this._context, value);\n        }\n        catch (err) {\n            parent.syncErrorValue = err;\n            parent.syncErrorThrown = true;\n            return true;\n        }\n        return false;\n    };\n    SafeSubscriber.prototype._unsubscribe = function () {\n        var _parentSubscriber = this._parentSubscriber;\n        this._context = null;\n        this._parentSubscriber = null;\n        _parentSubscriber.unsubscribe();\n    };\n    return SafeSubscriber;\n}(Subscriber));\n//# sourceMappingURL=Subscriber.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/Subscriber.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/Subscriber.js?"
              );

              /***/
            },
            /* 1 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "/* WEBPACK VAR INJECTION */(function(global) {\n// CommonJS / Node have global context exposed as \"global\" variable.\n// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake\n// the global \"global\" var for now.\nvar __window = typeof window !== 'undefined' && window;\nvar __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&\n    self instanceof WorkerGlobalScope && self;\nvar __global = typeof global !== 'undefined' && global;\nvar _root = __window || __global || __self;\nexports.root = _root;\n// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.\n// This is needed when used with angular/tsickle which inserts a goog.module statement.\n// Wrap in IIFE\n(function () {\n    if (!_root) {\n        throw new Error('RxJS could not find any global context (window, self, global)');\n    }\n})();\n//# sourceMappingURL=root.js.map\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/root.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/root.js?"
              );

              /***/
            },
            /* 2 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar isArray_1 = __webpack_require__(19);\nvar isObject_1 = __webpack_require__(8);\nvar isFunction_1 = __webpack_require__(4);\nvar tryCatch_1 = __webpack_require__(9);\nvar errorObject_1 = __webpack_require__(5);\nvar UnsubscriptionError_1 = __webpack_require__(20);\n/**\n * Represents a disposable resource, such as the execution of an Observable. A\n * Subscription has one important method, `unsubscribe`, that takes no argument\n * and just disposes the resource held by the subscription.\n *\n * Additionally, subscriptions may be grouped together through the `add()`\n * method, which will attach a child Subscription to the current Subscription.\n * When a Subscription is unsubscribed, all its children (and its grandchildren)\n * will be unsubscribed as well.\n *\n * @class Subscription\n */\nvar Subscription = (function () {\n    /**\n     * @param {function(): void} [unsubscribe] A function describing how to\n     * perform the disposal of resources when the `unsubscribe` method is called.\n     */\n    function Subscription(unsubscribe) {\n        /**\n         * A flag to indicate whether this Subscription has already been unsubscribed.\n         * @type {boolean}\n         */\n        this.closed = false;\n        this._parent = null;\n        this._parents = null;\n        this._subscriptions = null;\n        if (unsubscribe) {\n            this._unsubscribe = unsubscribe;\n        }\n    }\n    /**\n     * Disposes the resources held by the subscription. May, for instance, cancel\n     * an ongoing Observable execution or cancel any other type of work that\n     * started when the Subscription was created.\n     * @return {void}\n     */\n    Subscription.prototype.unsubscribe = function () {\n        var hasErrors = false;\n        var errors;\n        if (this.closed) {\n            return;\n        }\n        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;\n        this.closed = true;\n        this._parent = null;\n        this._parents = null;\n        // null out _subscriptions first so any child subscriptions that attempt\n        // to remove themselves from this subscription will noop\n        this._subscriptions = null;\n        var index = -1;\n        var len = _parents ? _parents.length : 0;\n        // if this._parent is null, then so is this._parents, and we\n        // don't have to remove ourselves from any parent subscriptions.\n        while (_parent) {\n            _parent.remove(this);\n            // if this._parents is null or index >= len,\n            // then _parent is set to null, and the loop exits\n            _parent = ++index < len && _parents[index] || null;\n        }\n        if (isFunction_1.isFunction(_unsubscribe)) {\n            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);\n            if (trial === errorObject_1.errorObject) {\n                hasErrors = true;\n                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?\n                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);\n            }\n        }\n        if (isArray_1.isArray(_subscriptions)) {\n            index = -1;\n            len = _subscriptions.length;\n            while (++index < len) {\n                var sub = _subscriptions[index];\n                if (isObject_1.isObject(sub)) {\n                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);\n                    if (trial === errorObject_1.errorObject) {\n                        hasErrors = true;\n                        errors = errors || [];\n                        var err = errorObject_1.errorObject.e;\n                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {\n                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));\n                        }\n                        else {\n                            errors.push(err);\n                        }\n                    }\n                }\n            }\n        }\n        if (hasErrors) {\n            throw new UnsubscriptionError_1.UnsubscriptionError(errors);\n        }\n    };\n    /**\n     * Adds a tear down to be called during the unsubscribe() of this\n     * Subscription.\n     *\n     * If the tear down being added is a subscription that is already\n     * unsubscribed, is the same reference `add` is being called on, or is\n     * `Subscription.EMPTY`, it will not be added.\n     *\n     * If this subscription is already in an `closed` state, the passed\n     * tear down logic will be executed immediately.\n     *\n     * @param {TeardownLogic} teardown The additional logic to execute on\n     * teardown.\n     * @return {Subscription} Returns the Subscription used or created to be\n     * added to the inner subscriptions list. This Subscription can be used with\n     * `remove()` to remove the passed teardown logic from the inner subscriptions\n     * list.\n     */\n    Subscription.prototype.add = function (teardown) {\n        if (!teardown || (teardown === Subscription.EMPTY)) {\n            return Subscription.EMPTY;\n        }\n        if (teardown === this) {\n            return this;\n        }\n        var subscription = teardown;\n        switch (typeof teardown) {\n            case 'function':\n                subscription = new Subscription(teardown);\n            case 'object':\n                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {\n                    return subscription;\n                }\n                else if (this.closed) {\n                    subscription.unsubscribe();\n                    return subscription;\n                }\n                else if (typeof subscription._addParent !== 'function' /* quack quack */) {\n                    var tmp = subscription;\n                    subscription = new Subscription();\n                    subscription._subscriptions = [tmp];\n                }\n                break;\n            default:\n                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');\n        }\n        var subscriptions = this._subscriptions || (this._subscriptions = []);\n        subscriptions.push(subscription);\n        subscription._addParent(this);\n        return subscription;\n    };\n    /**\n     * Removes a Subscription from the internal list of subscriptions that will\n     * unsubscribe during the unsubscribe process of this Subscription.\n     * @param {Subscription} subscription The subscription to remove.\n     * @return {void}\n     */\n    Subscription.prototype.remove = function (subscription) {\n        var subscriptions = this._subscriptions;\n        if (subscriptions) {\n            var subscriptionIndex = subscriptions.indexOf(subscription);\n            if (subscriptionIndex !== -1) {\n                subscriptions.splice(subscriptionIndex, 1);\n            }\n        }\n    };\n    Subscription.prototype._addParent = function (parent) {\n        var _a = this, _parent = _a._parent, _parents = _a._parents;\n        if (!_parent || _parent === parent) {\n            // If we don't have a parent, or the new parent is the same as the\n            // current parent, then set this._parent to the new parent.\n            this._parent = parent;\n        }\n        else if (!_parents) {\n            // If there's already one parent, but not multiple, allocate an Array to\n            // store the rest of the parent Subscriptions.\n            this._parents = [parent];\n        }\n        else if (_parents.indexOf(parent) === -1) {\n            // Only add the new parent to the _parents list if it's not already there.\n            _parents.push(parent);\n        }\n    };\n    Subscription.EMPTY = (function (empty) {\n        empty.closed = true;\n        return empty;\n    }(new Subscription()));\n    return Subscription;\n}());\nexports.Subscription = Subscription;\nfunction flattenUnsubscriptionErrors(errors) {\n    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);\n}\n//# sourceMappingURL=Subscription.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/Subscription.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/Subscription.js?"
              );

              /***/
            },
            /* 3 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar root_1 = __webpack_require__(1);\nvar toSubscriber_1 = __webpack_require__(18);\nvar observable_1 = __webpack_require__(11);\nvar pipe_1 = __webpack_require__(21);\n/**\n * A representation of any set of values over any amount of time. This is the most basic building block\n * of RxJS.\n *\n * @class Observable<T>\n */\nvar Observable = (function () {\n    /**\n     * @constructor\n     * @param {Function} subscribe the function that is called when the Observable is\n     * initially subscribed to. This function is given a Subscriber, to which new values\n     * can be `next`ed, or an `error` method can be called to raise an error, or\n     * `complete` can be called to notify of a successful completion.\n     */\n    function Observable(subscribe) {\n        this._isScalar = false;\n        if (subscribe) {\n            this._subscribe = subscribe;\n        }\n    }\n    /**\n     * Creates a new Observable, with this Observable as the source, and the passed\n     * operator defined as the new observable's operator.\n     * @method lift\n     * @param {Operator} operator the operator defining the operation to take on the observable\n     * @return {Observable} a new observable with the Operator applied\n     */\n    Observable.prototype.lift = function (operator) {\n        var observable = new Observable();\n        observable.source = this;\n        observable.operator = operator;\n        return observable;\n    };\n    /**\n     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.\n     *\n     * <span class=\"informal\">Use it when you have all these Observables, but still nothing is happening.</span>\n     *\n     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It\n     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is\n     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling\n     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often\n     * thought.\n     *\n     * Apart from starting the execution of an Observable, this method allows you to listen for values\n     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two\n     * following ways.\n     *\n     * The first way is creating an object that implements {@link Observer} interface. It should have methods\n     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create\n     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do\n     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also\n     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't\n     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will\n     * be left uncaught.\n     *\n     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.\n     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent\n     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,\n     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,\n     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes\n     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.\n     *\n     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.\n     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean\n     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback\n     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.\n     *\n     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.\n     * It is an Observable itself that decides when these functions will be called. For example {@link of}\n     * by default emits all its values synchronously. Always check documentation for how given Observable\n     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.\n     *\n     * @example <caption>Subscribe with an Observer</caption>\n     * const sumObserver = {\n     *   sum: 0,\n     *   next(value) {\n     *     console.log('Adding: ' + value);\n     *     this.sum = this.sum + value;\n     *   },\n     *   error() { // We actually could just remove this method,\n     *   },        // since we do not really care about errors right now.\n     *   complete() {\n     *     console.log('Sum equals: ' + this.sum);\n     *   }\n     * };\n     *\n     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.\n     * .subscribe(sumObserver);\n     *\n     * // Logs:\n     * // \"Adding: 1\"\n     * // \"Adding: 2\"\n     * // \"Adding: 3\"\n     * // \"Sum equals: 6\"\n     *\n     *\n     * @example <caption>Subscribe with functions</caption>\n     * let sum = 0;\n     *\n     * Rx.Observable.of(1, 2, 3)\n     * .subscribe(\n     *   function(value) {\n     *     console.log('Adding: ' + value);\n     *     sum = sum + value;\n     *   },\n     *   undefined,\n     *   function() {\n     *     console.log('Sum equals: ' + sum);\n     *   }\n     * );\n     *\n     * // Logs:\n     * // \"Adding: 1\"\n     * // \"Adding: 2\"\n     * // \"Adding: 3\"\n     * // \"Sum equals: 6\"\n     *\n     *\n     * @example <caption>Cancel a subscription</caption>\n     * const subscription = Rx.Observable.interval(1000).subscribe(\n     *   num => console.log(num),\n     *   undefined,\n     *   () => console.log('completed!') // Will not be called, even\n     * );                                // when cancelling subscription\n     *\n     *\n     * setTimeout(() => {\n     *   subscription.unsubscribe();\n     *   console.log('unsubscribed!');\n     * }, 2500);\n     *\n     * // Logs:\n     * // 0 after 1s\n     * // 1 after 2s\n     * // \"unsubscribed!\" after 2.5s\n     *\n     *\n     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,\n     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed\n     *  Observable.\n     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,\n     *  the error will be thrown as unhandled.\n     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.\n     * @return {ISubscription} a subscription reference to the registered handlers\n     * @method subscribe\n     */\n    Observable.prototype.subscribe = function (observerOrNext, error, complete) {\n        var operator = this.operator;\n        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);\n        if (operator) {\n            operator.call(sink, this.source);\n        }\n        else {\n            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));\n        }\n        if (sink.syncErrorThrowable) {\n            sink.syncErrorThrowable = false;\n            if (sink.syncErrorThrown) {\n                throw sink.syncErrorValue;\n            }\n        }\n        return sink;\n    };\n    Observable.prototype._trySubscribe = function (sink) {\n        try {\n            return this._subscribe(sink);\n        }\n        catch (err) {\n            sink.syncErrorThrown = true;\n            sink.syncErrorValue = err;\n            sink.error(err);\n        }\n    };\n    /**\n     * @method forEach\n     * @param {Function} next a handler for each value emitted by the observable\n     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise\n     * @return {Promise} a promise that either resolves on observable completion or\n     *  rejects with the handled error\n     */\n    Observable.prototype.forEach = function (next, PromiseCtor) {\n        var _this = this;\n        if (!PromiseCtor) {\n            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {\n                PromiseCtor = root_1.root.Rx.config.Promise;\n            }\n            else if (root_1.root.Promise) {\n                PromiseCtor = root_1.root.Promise;\n            }\n        }\n        if (!PromiseCtor) {\n            throw new Error('no Promise impl found');\n        }\n        return new PromiseCtor(function (resolve, reject) {\n            // Must be declared in a separate statement to avoid a RefernceError when\n            // accessing subscription below in the closure due to Temporal Dead Zone.\n            var subscription;\n            subscription = _this.subscribe(function (value) {\n                if (subscription) {\n                    // if there is a subscription, then we can surmise\n                    // the next handling is asynchronous. Any errors thrown\n                    // need to be rejected explicitly and unsubscribe must be\n                    // called manually\n                    try {\n                        next(value);\n                    }\n                    catch (err) {\n                        reject(err);\n                        subscription.unsubscribe();\n                    }\n                }\n                else {\n                    // if there is NO subscription, then we're getting a nexted\n                    // value synchronously during subscription. We can just call it.\n                    // If it errors, Observable's `subscribe` will ensure the\n                    // unsubscription logic is called, then synchronously rethrow the error.\n                    // After that, Promise will trap the error and send it\n                    // down the rejection path.\n                    next(value);\n                }\n            }, reject, resolve);\n        });\n    };\n    Observable.prototype._subscribe = function (subscriber) {\n        return this.source.subscribe(subscriber);\n    };\n    /**\n     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable\n     * @method Symbol.observable\n     * @return {Observable} this instance of the observable\n     */\n    Observable.prototype[observable_1.observable] = function () {\n        return this;\n    };\n    /* tslint:enable:max-line-length */\n    /**\n     * Used to stitch together functional operators into a chain.\n     * @method pipe\n     * @return {Observable} the Observable result of all of the operators having\n     * been called in the order they were passed in.\n     *\n     * @example\n     *\n     * import { map, filter, scan } from 'rxjs/operators';\n     *\n     * Rx.Observable.interval(1000)\n     *   .pipe(\n     *     filter(x => x % 2 === 0),\n     *     map(x => x + x),\n     *     scan((acc, x) => acc + x)\n     *   )\n     *   .subscribe(x => console.log(x))\n     */\n    Observable.prototype.pipe = function () {\n        var operations = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            operations[_i - 0] = arguments[_i];\n        }\n        if (operations.length === 0) {\n            return this;\n        }\n        return pipe_1.pipeFromArray(operations)(this);\n    };\n    /* tslint:enable:max-line-length */\n    Observable.prototype.toPromise = function (PromiseCtor) {\n        var _this = this;\n        if (!PromiseCtor) {\n            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {\n                PromiseCtor = root_1.root.Rx.config.Promise;\n            }\n            else if (root_1.root.Promise) {\n                PromiseCtor = root_1.root.Promise;\n            }\n        }\n        if (!PromiseCtor) {\n            throw new Error('no Promise impl found');\n        }\n        return new PromiseCtor(function (resolve, reject) {\n            var value;\n            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });\n        });\n    };\n    // HACK: Since TypeScript inherits static properties too, we have to\n    // fight against TypeScript here so Subject can have a different static create signature\n    /**\n     * Creates a new cold Observable by calling the Observable constructor\n     * @static true\n     * @owner Observable\n     * @method create\n     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor\n     * @return {Observable} a new cold observable\n     */\n    Observable.create = function (subscribe) {\n        return new Observable(subscribe);\n    };\n    return Observable;\n}());\nexports.Observable = Observable;\n//# sourceMappingURL=Observable.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/Observable.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/Observable.js?"
              );

              /***/
            },
            /* 4 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nfunction isFunction(x) {\n    return typeof x === 'function';\n}\nexports.isFunction = isFunction;\n//# sourceMappingURL=isFunction.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/isFunction.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isFunction.js?"
              );

              /***/
            },
            /* 5 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\n// typeof any so that it we don't have to cast when comparing a result to the error object\nexports.errorObject = { e: {} };\n//# sourceMappingURL=errorObject.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/errorObject.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/errorObject.js?"
              );

              /***/
            },
            /* 6 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar root_1 = __webpack_require__(1);\nvar Symbol = root_1.root.Symbol;\nexports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?\n    Symbol.for('rxSubscriber') : '@@rxSubscriber';\n/**\n * @deprecated use rxSubscriber instead\n */\nexports.$$rxSubscriber = exports.rxSubscriber;\n//# sourceMappingURL=rxSubscriber.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/symbol/rxSubscriber.js\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/symbol/rxSubscriber.js?"
              );

              /***/
            },
            /* 7 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Observable_1 = __webpack_require__(3);\nvar Subscriber_1 = __webpack_require__(0);\nvar Subscription_1 = __webpack_require__(2);\nvar ObjectUnsubscribedError_1 = __webpack_require__(12);\nvar SubjectSubscription_1 = __webpack_require__(23);\nvar rxSubscriber_1 = __webpack_require__(6);\n/**\n * @class SubjectSubscriber<T>\n */\nvar SubjectSubscriber = (function (_super) {\n    __extends(SubjectSubscriber, _super);\n    function SubjectSubscriber(destination) {\n        _super.call(this, destination);\n        this.destination = destination;\n    }\n    return SubjectSubscriber;\n}(Subscriber_1.Subscriber));\nexports.SubjectSubscriber = SubjectSubscriber;\n/**\n * @class Subject<T>\n */\nvar Subject = (function (_super) {\n    __extends(Subject, _super);\n    function Subject() {\n        _super.call(this);\n        this.observers = [];\n        this.closed = false;\n        this.isStopped = false;\n        this.hasError = false;\n        this.thrownError = null;\n    }\n    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {\n        return new SubjectSubscriber(this);\n    };\n    Subject.prototype.lift = function (operator) {\n        var subject = new AnonymousSubject(this, this);\n        subject.operator = operator;\n        return subject;\n    };\n    Subject.prototype.next = function (value) {\n        if (this.closed) {\n            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();\n        }\n        if (!this.isStopped) {\n            var observers = this.observers;\n            var len = observers.length;\n            var copy = observers.slice();\n            for (var i = 0; i < len; i++) {\n                copy[i].next(value);\n            }\n        }\n    };\n    Subject.prototype.error = function (err) {\n        if (this.closed) {\n            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();\n        }\n        this.hasError = true;\n        this.thrownError = err;\n        this.isStopped = true;\n        var observers = this.observers;\n        var len = observers.length;\n        var copy = observers.slice();\n        for (var i = 0; i < len; i++) {\n            copy[i].error(err);\n        }\n        this.observers.length = 0;\n    };\n    Subject.prototype.complete = function () {\n        if (this.closed) {\n            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();\n        }\n        this.isStopped = true;\n        var observers = this.observers;\n        var len = observers.length;\n        var copy = observers.slice();\n        for (var i = 0; i < len; i++) {\n            copy[i].complete();\n        }\n        this.observers.length = 0;\n    };\n    Subject.prototype.unsubscribe = function () {\n        this.isStopped = true;\n        this.closed = true;\n        this.observers = null;\n    };\n    Subject.prototype._trySubscribe = function (subscriber) {\n        if (this.closed) {\n            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();\n        }\n        else {\n            return _super.prototype._trySubscribe.call(this, subscriber);\n        }\n    };\n    Subject.prototype._subscribe = function (subscriber) {\n        if (this.closed) {\n            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();\n        }\n        else if (this.hasError) {\n            subscriber.error(this.thrownError);\n            return Subscription_1.Subscription.EMPTY;\n        }\n        else if (this.isStopped) {\n            subscriber.complete();\n            return Subscription_1.Subscription.EMPTY;\n        }\n        else {\n            this.observers.push(subscriber);\n            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);\n        }\n    };\n    Subject.prototype.asObservable = function () {\n        var observable = new Observable_1.Observable();\n        observable.source = this;\n        return observable;\n    };\n    Subject.create = function (destination, source) {\n        return new AnonymousSubject(destination, source);\n    };\n    return Subject;\n}(Observable_1.Observable));\nexports.Subject = Subject;\n/**\n * @class AnonymousSubject<T>\n */\nvar AnonymousSubject = (function (_super) {\n    __extends(AnonymousSubject, _super);\n    function AnonymousSubject(destination, source) {\n        _super.call(this);\n        this.destination = destination;\n        this.source = source;\n    }\n    AnonymousSubject.prototype.next = function (value) {\n        var destination = this.destination;\n        if (destination && destination.next) {\n            destination.next(value);\n        }\n    };\n    AnonymousSubject.prototype.error = function (err) {\n        var destination = this.destination;\n        if (destination && destination.error) {\n            this.destination.error(err);\n        }\n    };\n    AnonymousSubject.prototype.complete = function () {\n        var destination = this.destination;\n        if (destination && destination.complete) {\n            this.destination.complete();\n        }\n    };\n    AnonymousSubject.prototype._subscribe = function (subscriber) {\n        var source = this.source;\n        if (source) {\n            return this.source.subscribe(subscriber);\n        }\n        else {\n            return Subscription_1.Subscription.EMPTY;\n        }\n    };\n    return AnonymousSubject;\n}(Subject));\nexports.AnonymousSubject = AnonymousSubject;\n//# sourceMappingURL=Subject.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/Subject.js\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/Subject.js?"
              );

              /***/
            },
            /* 8 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nfunction isObject(x) {\n    return x != null && typeof x === 'object';\n}\nexports.isObject = isObject;\n//# sourceMappingURL=isObject.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/isObject.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isObject.js?"
              );

              /***/
            },
            /* 9 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar errorObject_1 = __webpack_require__(5);\nvar tryCatchTarget;\nfunction tryCatcher() {\n    try {\n        return tryCatchTarget.apply(this, arguments);\n    }\n    catch (e) {\n        errorObject_1.errorObject.e = e;\n        return errorObject_1.errorObject;\n    }\n}\nfunction tryCatch(fn) {\n    tryCatchTarget = fn;\n    return tryCatcher;\n}\nexports.tryCatch = tryCatch;\n;\n//# sourceMappingURL=tryCatch.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/tryCatch.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/tryCatch.js?"
              );

              /***/
            },
            /* 10 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nexports.empty = {\n    closed: true,\n    next: function (value) { },\n    error: function (err) { throw err; },\n    complete: function () { }\n};\n//# sourceMappingURL=Observer.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/Observer.js\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/Observer.js?"
              );

              /***/
            },
            /* 11 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar root_1 = __webpack_require__(1);\nfunction getSymbolObservable(context) {\n    var $$observable;\n    var Symbol = context.Symbol;\n    if (typeof Symbol === 'function') {\n        if (Symbol.observable) {\n            $$observable = Symbol.observable;\n        }\n        else {\n            $$observable = Symbol('observable');\n            Symbol.observable = $$observable;\n        }\n    }\n    else {\n        $$observable = '@@observable';\n    }\n    return $$observable;\n}\nexports.getSymbolObservable = getSymbolObservable;\nexports.observable = getSymbolObservable(root_1.root);\n/**\n * @deprecated use observable instead\n */\nexports.$$observable = exports.observable;\n//# sourceMappingURL=observable.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/symbol/observable.js\n// module id = 11\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/symbol/observable.js?"
              );

              /***/
            },
            /* 12 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\n/**\n * An error thrown when an action is invalid because the object has been\n * unsubscribed.\n *\n * @see {@link Subject}\n * @see {@link BehaviorSubject}\n *\n * @class ObjectUnsubscribedError\n */\nvar ObjectUnsubscribedError = (function (_super) {\n    __extends(ObjectUnsubscribedError, _super);\n    function ObjectUnsubscribedError() {\n        var err = _super.call(this, 'object unsubscribed');\n        this.name = err.name = 'ObjectUnsubscribedError';\n        this.stack = err.stack;\n        this.message = err.message;\n    }\n    return ObjectUnsubscribedError;\n}(Error));\nexports.ObjectUnsubscribedError = ObjectUnsubscribedError;\n//# sourceMappingURL=ObjectUnsubscribedError.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/ObjectUnsubscribedError.js\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/ObjectUnsubscribedError.js?"
              );

              /***/
            },
            /* 13 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(0);\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar OuterSubscriber = (function (_super) {\n    __extends(OuterSubscriber, _super);\n    function OuterSubscriber() {\n        _super.apply(this, arguments);\n    }\n    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {\n        this.destination.next(innerValue);\n    };\n    OuterSubscriber.prototype.notifyError = function (error, innerSub) {\n        this.destination.error(error);\n    };\n    OuterSubscriber.prototype.notifyComplete = function (innerSub) {\n        this.destination.complete();\n    };\n    return OuterSubscriber;\n}(Subscriber_1.Subscriber));\nexports.OuterSubscriber = OuterSubscriber;\n//# sourceMappingURL=OuterSubscriber.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/OuterSubscriber.js\n// module id = 13\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/OuterSubscriber.js?"
              );

              /***/
            },
            /* 14 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar root_1 = __webpack_require__(1);\nvar isArrayLike_1 = __webpack_require__(32);\nvar isPromise_1 = __webpack_require__(33);\nvar isObject_1 = __webpack_require__(8);\nvar Observable_1 = __webpack_require__(3);\nvar iterator_1 = __webpack_require__(34);\nvar InnerSubscriber_1 = __webpack_require__(35);\nvar observable_1 = __webpack_require__(11);\nfunction subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {\n    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);\n    if (destination.closed) {\n        return null;\n    }\n    if (result instanceof Observable_1.Observable) {\n        if (result._isScalar) {\n            destination.next(result.value);\n            destination.complete();\n            return null;\n        }\n        else {\n            destination.syncErrorThrowable = true;\n            return result.subscribe(destination);\n        }\n    }\n    else if (isArrayLike_1.isArrayLike(result)) {\n        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {\n            destination.next(result[i]);\n        }\n        if (!destination.closed) {\n            destination.complete();\n        }\n    }\n    else if (isPromise_1.isPromise(result)) {\n        result.then(function (value) {\n            if (!destination.closed) {\n                destination.next(value);\n                destination.complete();\n            }\n        }, function (err) { return destination.error(err); })\n            .then(null, function (err) {\n            // Escaping the Promise trap: globally throw unhandled errors\n            root_1.root.setTimeout(function () { throw err; });\n        });\n        return destination;\n    }\n    else if (result && typeof result[iterator_1.iterator] === 'function') {\n        var iterator = result[iterator_1.iterator]();\n        do {\n            var item = iterator.next();\n            if (item.done) {\n                destination.complete();\n                break;\n            }\n            destination.next(item.value);\n            if (destination.closed) {\n                break;\n            }\n        } while (true);\n    }\n    else if (result && typeof result[observable_1.observable] === 'function') {\n        var obs = result[observable_1.observable]();\n        if (typeof obs.subscribe !== 'function') {\n            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));\n        }\n        else {\n            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));\n        }\n    }\n    else {\n        var value = isObject_1.isObject(result) ? 'an invalid object' : \"'\" + result + \"'\";\n        var msg = (\"You provided \" + value + \" where a stream was expected.\")\n            + ' You can provide an Observable, Promise, Array, or Iterable.';\n        destination.error(new TypeError(msg));\n    }\n    return null;\n}\nexports.subscribeToResult = subscribeToResult;\n//# sourceMappingURL=subscribeToResult.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/subscribeToResult.js\n// module id = 14\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/subscribeToResult.js?"
              );

              /***/
            },
            /* 15 */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
              "use strict";
              eval(
                'Object.defineProperty(__webpack_exports__, "__esModule", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_openbci_utilities_dist_utilities__ = __webpack_require__(16);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_openbci_utilities_dist_utilities___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_openbci_utilities_dist_utilities__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(7);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(24);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_openbci_utilities_dist_constants__ = __webpack_require__(25);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_openbci_utilities_dist_constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_openbci_utilities_dist_constants__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_tap__ = __webpack_require__(26);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_tap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_tap__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_map__ = __webpack_require__(27);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_map__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators_first__ = __webpack_require__(28);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators_first__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators_filter__ = __webpack_require__(30);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators_filter__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators_takeUntil__ = __webpack_require__(31);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_takeUntil__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators_mergeMap__ = __webpack_require__(36);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operators_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators_mergeMap__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_observable_fromEvent__ = __webpack_require__(37);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_observable_fromEvent__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(39);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__constants__ = __webpack_require__(40);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass Ganglion {\n\n    constructor(options = {}) {\n        this.options = options;\n        this.gatt = null;\n        this.device = null;\n        this.deviceName = null;\n        this.service = null;\n        this.characteristics = null;\n        this.onDisconnect$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();\n        this.boardName = __WEBPACK_IMPORTED_MODULE_12__constants__["a" /* BOARD_NAME */];\n        this.channelSize = Object(__WEBPACK_IMPORTED_MODULE_3_openbci_utilities_dist_constants__["numberOfChannelsForBoardType"])(__WEBPACK_IMPORTED_MODULE_12__constants__["a" /* BOARD_NAME */]);\n        this.rawDataPacketToSample = Object(__WEBPACK_IMPORTED_MODULE_3_openbci_utilities_dist_constants__["rawDataToSampleObjectDefault"])(this.channelSize);\n        this.connectionStatus = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);\n        this.stream = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]().pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_map__["map"])(event => this.eventToBufferMapper(event)), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_tap__["tap"])(buffer => this.setRawDataPacket(buffer)), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_map__["map"])(() => Object(__WEBPACK_IMPORTED_MODULE_0_openbci_utilities_dist_utilities__["parseGanglion"])(this.rawDataPacketToSample)), Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_operators_mergeMap__["mergeMap"])(x => x), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_map__["map"])(__WEBPACK_IMPORTED_MODULE_11__utils__["a" /* renameDataProp */]), Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_takeUntil__["takeUntil"])(this.onDisconnect$));\n        this.accelData = this.stream.pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators_filter__["filter"])(sample => sample.accelData.length));\n    }\n\n    eventToBufferMapper(event) {\n        return new Uint8Array(event.target.value.buffer);\n    }\n\n    setRawDataPacket(buffer) {\n        this.rawDataPacketToSample.rawDataPacket = buffer;\n    }\n\n    async connect(gatt) {\n        this.device = gatt && gatt.device ? gatt.device : await navigator.bluetooth.requestDevice(__WEBPACK_IMPORTED_MODULE_12__constants__["e" /* DEVICE_OPTIONS */]);\n        this.addDisconnectedEvent();\n        this.gatt = gatt ? gatt : await this.device.gatt.connect();\n        this.deviceName = this.gatt.device.name;\n        this.service = await this.gatt.getPrimaryService(__WEBPACK_IMPORTED_MODULE_12__constants__["g" /* GANGLION_SERVICE_ID */]);\n        this.setCharacteristics((await this.service.getCharacteristics()));\n        this.connectionStatus.next(true);\n    }\n\n    setCharacteristics(characteristics) {\n        this.characteristics = Object.entries(__WEBPACK_IMPORTED_MODULE_12__constants__["b" /* CHARACTERISTICS */]).reduce((map, [name, uuid]) => _extends({}, map, {\n            [name]: characteristics.find(c => c.uuid === uuid)\n        }), {});\n    }\n\n    async start() {\n        const { reader, writer } = this.characteristics;\n        const commands = Object.entries(__WEBPACK_IMPORTED_MODULE_12__constants__["d" /* COMMAND_STRINGS */]).reduce((acc, [key, command]) => _extends({}, acc, {\n            [key]: new TextEncoder().encode(command)\n        }), {});\n\n        reader.startNotifications();\n        reader.addEventListener(__WEBPACK_IMPORTED_MODULE_12__constants__["c" /* CHARACTERISTIC_EVENT */], event => {\n            this.stream.next(event);\n        });\n\n        if (this.options.accelData) {\n            await writer.writeValue(commands.accelData);\n            reader.readValue();\n        }\n        await writer.writeValue(commands.start);\n        reader.readValue();\n    }\n\n    addDisconnectedEvent() {\n        Object(__WEBPACK_IMPORTED_MODULE_10_rxjs_observable_fromEvent__["fromEvent"])(this.device, __WEBPACK_IMPORTED_MODULE_12__constants__["f" /* DISCONNECTED_EVENT */]).pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators_first__["first"])()).subscribe(() => {\n            this.gatt = null;\n            this.device = null;\n            this.deviceName = null;\n            this.service = null;\n            this.characteristics = null;\n            this.connectionStatus.next(false);\n        });\n    }\n\n    disconnect() {\n        if (!this.gatt) {\n            return;\n        };\n        this.onDisconnect$.next();\n        this.gatt.disconnect();\n    }\n}\n/* harmony export (immutable) */ __webpack_exports__["Ganglion"] = Ganglion;\n\n\n/* harmony default export */ __webpack_exports__["default"] = (Ganglion);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 15\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/index.js?'
              );

              /***/
            },
            /* 16 */
            /***/ function(module, exports, __webpack_require__) {
              eval(
                "(function webpackUniversalModuleDefinition(root, factory) {\n\tif(true)\n\t\tmodule.exports = factory();\n\telse if(typeof define === 'function' && define.amd)\n\t\tdefine([], factory);\n\telse if(typeof exports === 'object')\n\t\texports[\"OpenBCIUtilities\"] = factory();\n\telse\n\t\troot[\"OpenBCIUtilities\"] = factory();\n})(this, function() {\nreturn /******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 7);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"/* WEBPACK VAR INJECTION */(function(global) {/*!\\n * The buffer module from node.js, for the browser.\\n *\\n * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>\\n * @license  MIT\\n */\\n/* eslint-disable no-proto */\\n\\n\\n\\nvar base64 = __webpack_require__(2)\\nvar ieee754 = __webpack_require__(3)\\nvar isArray = __webpack_require__(4)\\n\\nexports.Buffer = Buffer\\nexports.SlowBuffer = SlowBuffer\\nexports.INSPECT_MAX_BYTES = 50\\n\\n/**\\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\\n *   === true    Use Uint8Array implementation (fastest)\\n *   === false   Use Object implementation (most compatible, even IE6)\\n *\\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\\n * Opera 11.6+, iOS 4.2+.\\n *\\n * Due to various browser bugs, sometimes the Object implementation will be used even\\n * when the browser supports typed arrays.\\n *\\n * Note:\\n *\\n *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,\\n *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.\\n *\\n *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.\\n *\\n *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of\\n *     incorrect length in some situations.\\n\\n * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they\\n * get the Object implementation, which is slower but behaves correctly.\\n */\\nBuffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined\\n  ? global.TYPED_ARRAY_SUPPORT\\n  : typedArraySupport()\\n\\n/*\\n * Export kMaxLength after typed array support is determined.\\n */\\nexports.kMaxLength = kMaxLength()\\n\\nfunction typedArraySupport () {\\n  try {\\n    var arr = new Uint8Array(1)\\n    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}\\n    return arr.foo() === 42 && // typed array instances can be augmented\\n        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`\\n        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`\\n  } catch (e) {\\n    return false\\n  }\\n}\\n\\nfunction kMaxLength () {\\n  return Buffer.TYPED_ARRAY_SUPPORT\\n    ? 0x7fffffff\\n    : 0x3fffffff\\n}\\n\\nfunction createBuffer (that, length) {\\n  if (kMaxLength() < length) {\\n    throw new RangeError('Invalid typed array length')\\n  }\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    // Return an augmented `Uint8Array` instance, for best performance\\n    that = new Uint8Array(length)\\n    that.__proto__ = Buffer.prototype\\n  } else {\\n    // Fallback: Return an object instance of the Buffer class\\n    if (that === null) {\\n      that = new Buffer(length)\\n    }\\n    that.length = length\\n  }\\n\\n  return that\\n}\\n\\n/**\\n * The Buffer constructor returns instances of `Uint8Array` that have their\\n * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of\\n * `Uint8Array`, so the returned instances will have all the node `Buffer` methods\\n * and the `Uint8Array` methods. Square bracket notation works as expected -- it\\n * returns a single octet.\\n *\\n * The `Uint8Array` prototype remains unmodified.\\n */\\n\\nfunction Buffer (arg, encodingOrOffset, length) {\\n  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {\\n    return new Buffer(arg, encodingOrOffset, length)\\n  }\\n\\n  // Common case.\\n  if (typeof arg === 'number') {\\n    if (typeof encodingOrOffset === 'string') {\\n      throw new Error(\\n        'If encoding is specified then the first argument must be a string'\\n      )\\n    }\\n    return allocUnsafe(this, arg)\\n  }\\n  return from(this, arg, encodingOrOffset, length)\\n}\\n\\nBuffer.poolSize = 8192 // not used by this implementation\\n\\n// TODO: Legacy, not needed anymore. Remove in next major version.\\nBuffer._augment = function (arr) {\\n  arr.__proto__ = Buffer.prototype\\n  return arr\\n}\\n\\nfunction from (that, value, encodingOrOffset, length) {\\n  if (typeof value === 'number') {\\n    throw new TypeError('\\\"value\\\" argument must not be a number')\\n  }\\n\\n  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {\\n    return fromArrayBuffer(that, value, encodingOrOffset, length)\\n  }\\n\\n  if (typeof value === 'string') {\\n    return fromString(that, value, encodingOrOffset)\\n  }\\n\\n  return fromObject(that, value)\\n}\\n\\n/**\\n * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError\\n * if value is a number.\\n * Buffer.from(str[, encoding])\\n * Buffer.from(array)\\n * Buffer.from(buffer)\\n * Buffer.from(arrayBuffer[, byteOffset[, length]])\\n **/\\nBuffer.from = function (value, encodingOrOffset, length) {\\n  return from(null, value, encodingOrOffset, length)\\n}\\n\\nif (Buffer.TYPED_ARRAY_SUPPORT) {\\n  Buffer.prototype.__proto__ = Uint8Array.prototype\\n  Buffer.__proto__ = Uint8Array\\n  if (typeof Symbol !== 'undefined' && Symbol.species &&\\n      Buffer[Symbol.species] === Buffer) {\\n    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97\\n    Object.defineProperty(Buffer, Symbol.species, {\\n      value: null,\\n      configurable: true\\n    })\\n  }\\n}\\n\\nfunction assertSize (size) {\\n  if (typeof size !== 'number') {\\n    throw new TypeError('\\\"size\\\" argument must be a number')\\n  } else if (size < 0) {\\n    throw new RangeError('\\\"size\\\" argument must not be negative')\\n  }\\n}\\n\\nfunction alloc (that, size, fill, encoding) {\\n  assertSize(size)\\n  if (size <= 0) {\\n    return createBuffer(that, size)\\n  }\\n  if (fill !== undefined) {\\n    // Only pay attention to encoding if it's a string. This\\n    // prevents accidentally sending in a number that would\\n    // be interpretted as a start offset.\\n    return typeof encoding === 'string'\\n      ? createBuffer(that, size).fill(fill, encoding)\\n      : createBuffer(that, size).fill(fill)\\n  }\\n  return createBuffer(that, size)\\n}\\n\\n/**\\n * Creates a new filled Buffer instance.\\n * alloc(size[, fill[, encoding]])\\n **/\\nBuffer.alloc = function (size, fill, encoding) {\\n  return alloc(null, size, fill, encoding)\\n}\\n\\nfunction allocUnsafe (that, size) {\\n  assertSize(size)\\n  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)\\n  if (!Buffer.TYPED_ARRAY_SUPPORT) {\\n    for (var i = 0; i < size; ++i) {\\n      that[i] = 0\\n    }\\n  }\\n  return that\\n}\\n\\n/**\\n * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.\\n * */\\nBuffer.allocUnsafe = function (size) {\\n  return allocUnsafe(null, size)\\n}\\n/**\\n * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.\\n */\\nBuffer.allocUnsafeSlow = function (size) {\\n  return allocUnsafe(null, size)\\n}\\n\\nfunction fromString (that, string, encoding) {\\n  if (typeof encoding !== 'string' || encoding === '') {\\n    encoding = 'utf8'\\n  }\\n\\n  if (!Buffer.isEncoding(encoding)) {\\n    throw new TypeError('\\\"encoding\\\" must be a valid string encoding')\\n  }\\n\\n  var length = byteLength(string, encoding) | 0\\n  that = createBuffer(that, length)\\n\\n  var actual = that.write(string, encoding)\\n\\n  if (actual !== length) {\\n    // Writing a hex string, for example, that contains invalid characters will\\n    // cause everything after the first invalid character to be ignored. (e.g.\\n    // 'abxxcd' will be treated as 'ab')\\n    that = that.slice(0, actual)\\n  }\\n\\n  return that\\n}\\n\\nfunction fromArrayLike (that, array) {\\n  var length = array.length < 0 ? 0 : checked(array.length) | 0\\n  that = createBuffer(that, length)\\n  for (var i = 0; i < length; i += 1) {\\n    that[i] = array[i] & 255\\n  }\\n  return that\\n}\\n\\nfunction fromArrayBuffer (that, array, byteOffset, length) {\\n  array.byteLength // this throws if `array` is not a valid ArrayBuffer\\n\\n  if (byteOffset < 0 || array.byteLength < byteOffset) {\\n    throw new RangeError('\\\\'offset\\\\' is out of bounds')\\n  }\\n\\n  if (array.byteLength < byteOffset + (length || 0)) {\\n    throw new RangeError('\\\\'length\\\\' is out of bounds')\\n  }\\n\\n  if (byteOffset === undefined && length === undefined) {\\n    array = new Uint8Array(array)\\n  } else if (length === undefined) {\\n    array = new Uint8Array(array, byteOffset)\\n  } else {\\n    array = new Uint8Array(array, byteOffset, length)\\n  }\\n\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    // Return an augmented `Uint8Array` instance, for best performance\\n    that = array\\n    that.__proto__ = Buffer.prototype\\n  } else {\\n    // Fallback: Return an object instance of the Buffer class\\n    that = fromArrayLike(that, array)\\n  }\\n  return that\\n}\\n\\nfunction fromObject (that, obj) {\\n  if (Buffer.isBuffer(obj)) {\\n    var len = checked(obj.length) | 0\\n    that = createBuffer(that, len)\\n\\n    if (that.length === 0) {\\n      return that\\n    }\\n\\n    obj.copy(that, 0, 0, len)\\n    return that\\n  }\\n\\n  if (obj) {\\n    if ((typeof ArrayBuffer !== 'undefined' &&\\n        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {\\n      if (typeof obj.length !== 'number' || isnan(obj.length)) {\\n        return createBuffer(that, 0)\\n      }\\n      return fromArrayLike(that, obj)\\n    }\\n\\n    if (obj.type === 'Buffer' && isArray(obj.data)) {\\n      return fromArrayLike(that, obj.data)\\n    }\\n  }\\n\\n  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')\\n}\\n\\nfunction checked (length) {\\n  // Note: cannot use `length < kMaxLength()` here because that fails when\\n  // length is NaN (which is otherwise coerced to zero.)\\n  if (length >= kMaxLength()) {\\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\\n                         'size: 0x' + kMaxLength().toString(16) + ' bytes')\\n  }\\n  return length | 0\\n}\\n\\nfunction SlowBuffer (length) {\\n  if (+length != length) { // eslint-disable-line eqeqeq\\n    length = 0\\n  }\\n  return Buffer.alloc(+length)\\n}\\n\\nBuffer.isBuffer = function isBuffer (b) {\\n  return !!(b != null && b._isBuffer)\\n}\\n\\nBuffer.compare = function compare (a, b) {\\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\\n    throw new TypeError('Arguments must be Buffers')\\n  }\\n\\n  if (a === b) return 0\\n\\n  var x = a.length\\n  var y = b.length\\n\\n  for (var i = 0, len = Math.min(x, y); i < len; ++i) {\\n    if (a[i] !== b[i]) {\\n      x = a[i]\\n      y = b[i]\\n      break\\n    }\\n  }\\n\\n  if (x < y) return -1\\n  if (y < x) return 1\\n  return 0\\n}\\n\\nBuffer.isEncoding = function isEncoding (encoding) {\\n  switch (String(encoding).toLowerCase()) {\\n    case 'hex':\\n    case 'utf8':\\n    case 'utf-8':\\n    case 'ascii':\\n    case 'latin1':\\n    case 'binary':\\n    case 'base64':\\n    case 'ucs2':\\n    case 'ucs-2':\\n    case 'utf16le':\\n    case 'utf-16le':\\n      return true\\n    default:\\n      return false\\n  }\\n}\\n\\nBuffer.concat = function concat (list, length) {\\n  if (!isArray(list)) {\\n    throw new TypeError('\\\"list\\\" argument must be an Array of Buffers')\\n  }\\n\\n  if (list.length === 0) {\\n    return Buffer.alloc(0)\\n  }\\n\\n  var i\\n  if (length === undefined) {\\n    length = 0\\n    for (i = 0; i < list.length; ++i) {\\n      length += list[i].length\\n    }\\n  }\\n\\n  var buffer = Buffer.allocUnsafe(length)\\n  var pos = 0\\n  for (i = 0; i < list.length; ++i) {\\n    var buf = list[i]\\n    if (!Buffer.isBuffer(buf)) {\\n      throw new TypeError('\\\"list\\\" argument must be an Array of Buffers')\\n    }\\n    buf.copy(buffer, pos)\\n    pos += buf.length\\n  }\\n  return buffer\\n}\\n\\nfunction byteLength (string, encoding) {\\n  if (Buffer.isBuffer(string)) {\\n    return string.length\\n  }\\n  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&\\n      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {\\n    return string.byteLength\\n  }\\n  if (typeof string !== 'string') {\\n    string = '' + string\\n  }\\n\\n  var len = string.length\\n  if (len === 0) return 0\\n\\n  // Use a for loop to avoid recursion\\n  var loweredCase = false\\n  for (;;) {\\n    switch (encoding) {\\n      case 'ascii':\\n      case 'latin1':\\n      case 'binary':\\n        return len\\n      case 'utf8':\\n      case 'utf-8':\\n      case undefined:\\n        return utf8ToBytes(string).length\\n      case 'ucs2':\\n      case 'ucs-2':\\n      case 'utf16le':\\n      case 'utf-16le':\\n        return len * 2\\n      case 'hex':\\n        return len >>> 1\\n      case 'base64':\\n        return base64ToBytes(string).length\\n      default:\\n        if (loweredCase) return utf8ToBytes(string).length // assume utf8\\n        encoding = ('' + encoding).toLowerCase()\\n        loweredCase = true\\n    }\\n  }\\n}\\nBuffer.byteLength = byteLength\\n\\nfunction slowToString (encoding, start, end) {\\n  var loweredCase = false\\n\\n  // No need to verify that \\\"this.length <= MAX_UINT32\\\" since it's a read-only\\n  // property of a typed array.\\n\\n  // This behaves neither like String nor Uint8Array in that we set start/end\\n  // to their upper/lower bounds if the value passed is out of range.\\n  // undefined is handled specially as per ECMA-262 6th Edition,\\n  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.\\n  if (start === undefined || start < 0) {\\n    start = 0\\n  }\\n  // Return early if start > this.length. Done here to prevent potential uint32\\n  // coercion fail below.\\n  if (start > this.length) {\\n    return ''\\n  }\\n\\n  if (end === undefined || end > this.length) {\\n    end = this.length\\n  }\\n\\n  if (end <= 0) {\\n    return ''\\n  }\\n\\n  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.\\n  end >>>= 0\\n  start >>>= 0\\n\\n  if (end <= start) {\\n    return ''\\n  }\\n\\n  if (!encoding) encoding = 'utf8'\\n\\n  while (true) {\\n    switch (encoding) {\\n      case 'hex':\\n        return hexSlice(this, start, end)\\n\\n      case 'utf8':\\n      case 'utf-8':\\n        return utf8Slice(this, start, end)\\n\\n      case 'ascii':\\n        return asciiSlice(this, start, end)\\n\\n      case 'latin1':\\n      case 'binary':\\n        return latin1Slice(this, start, end)\\n\\n      case 'base64':\\n        return base64Slice(this, start, end)\\n\\n      case 'ucs2':\\n      case 'ucs-2':\\n      case 'utf16le':\\n      case 'utf-16le':\\n        return utf16leSlice(this, start, end)\\n\\n      default:\\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\\n        encoding = (encoding + '').toLowerCase()\\n        loweredCase = true\\n    }\\n  }\\n}\\n\\n// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect\\n// Buffer instances.\\nBuffer.prototype._isBuffer = true\\n\\nfunction swap (b, n, m) {\\n  var i = b[n]\\n  b[n] = b[m]\\n  b[m] = i\\n}\\n\\nBuffer.prototype.swap16 = function swap16 () {\\n  var len = this.length\\n  if (len % 2 !== 0) {\\n    throw new RangeError('Buffer size must be a multiple of 16-bits')\\n  }\\n  for (var i = 0; i < len; i += 2) {\\n    swap(this, i, i + 1)\\n  }\\n  return this\\n}\\n\\nBuffer.prototype.swap32 = function swap32 () {\\n  var len = this.length\\n  if (len % 4 !== 0) {\\n    throw new RangeError('Buffer size must be a multiple of 32-bits')\\n  }\\n  for (var i = 0; i < len; i += 4) {\\n    swap(this, i, i + 3)\\n    swap(this, i + 1, i + 2)\\n  }\\n  return this\\n}\\n\\nBuffer.prototype.swap64 = function swap64 () {\\n  var len = this.length\\n  if (len % 8 !== 0) {\\n    throw new RangeError('Buffer size must be a multiple of 64-bits')\\n  }\\n  for (var i = 0; i < len; i += 8) {\\n    swap(this, i, i + 7)\\n    swap(this, i + 1, i + 6)\\n    swap(this, i + 2, i + 5)\\n    swap(this, i + 3, i + 4)\\n  }\\n  return this\\n}\\n\\nBuffer.prototype.toString = function toString () {\\n  var length = this.length | 0\\n  if (length === 0) return ''\\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\\n  return slowToString.apply(this, arguments)\\n}\\n\\nBuffer.prototype.equals = function equals (b) {\\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\\n  if (this === b) return true\\n  return Buffer.compare(this, b) === 0\\n}\\n\\nBuffer.prototype.inspect = function inspect () {\\n  var str = ''\\n  var max = exports.INSPECT_MAX_BYTES\\n  if (this.length > 0) {\\n    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')\\n    if (this.length > max) str += ' ... '\\n  }\\n  return '<Buffer ' + str + '>'\\n}\\n\\nBuffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {\\n  if (!Buffer.isBuffer(target)) {\\n    throw new TypeError('Argument must be a Buffer')\\n  }\\n\\n  if (start === undefined) {\\n    start = 0\\n  }\\n  if (end === undefined) {\\n    end = target ? target.length : 0\\n  }\\n  if (thisStart === undefined) {\\n    thisStart = 0\\n  }\\n  if (thisEnd === undefined) {\\n    thisEnd = this.length\\n  }\\n\\n  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {\\n    throw new RangeError('out of range index')\\n  }\\n\\n  if (thisStart >= thisEnd && start >= end) {\\n    return 0\\n  }\\n  if (thisStart >= thisEnd) {\\n    return -1\\n  }\\n  if (start >= end) {\\n    return 1\\n  }\\n\\n  start >>>= 0\\n  end >>>= 0\\n  thisStart >>>= 0\\n  thisEnd >>>= 0\\n\\n  if (this === target) return 0\\n\\n  var x = thisEnd - thisStart\\n  var y = end - start\\n  var len = Math.min(x, y)\\n\\n  var thisCopy = this.slice(thisStart, thisEnd)\\n  var targetCopy = target.slice(start, end)\\n\\n  for (var i = 0; i < len; ++i) {\\n    if (thisCopy[i] !== targetCopy[i]) {\\n      x = thisCopy[i]\\n      y = targetCopy[i]\\n      break\\n    }\\n  }\\n\\n  if (x < y) return -1\\n  if (y < x) return 1\\n  return 0\\n}\\n\\n// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,\\n// OR the last index of `val` in `buffer` at offset <= `byteOffset`.\\n//\\n// Arguments:\\n// - buffer - a Buffer to search\\n// - val - a string, Buffer, or number\\n// - byteOffset - an index into `buffer`; will be clamped to an int32\\n// - encoding - an optional encoding, relevant is val is a string\\n// - dir - true for indexOf, false for lastIndexOf\\nfunction bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {\\n  // Empty buffer means no match\\n  if (buffer.length === 0) return -1\\n\\n  // Normalize byteOffset\\n  if (typeof byteOffset === 'string') {\\n    encoding = byteOffset\\n    byteOffset = 0\\n  } else if (byteOffset > 0x7fffffff) {\\n    byteOffset = 0x7fffffff\\n  } else if (byteOffset < -0x80000000) {\\n    byteOffset = -0x80000000\\n  }\\n  byteOffset = +byteOffset  // Coerce to Number.\\n  if (isNaN(byteOffset)) {\\n    // byteOffset: it it's undefined, null, NaN, \\\"foo\\\", etc, search whole buffer\\n    byteOffset = dir ? 0 : (buffer.length - 1)\\n  }\\n\\n  // Normalize byteOffset: negative offsets start from the end of the buffer\\n  if (byteOffset < 0) byteOffset = buffer.length + byteOffset\\n  if (byteOffset >= buffer.length) {\\n    if (dir) return -1\\n    else byteOffset = buffer.length - 1\\n  } else if (byteOffset < 0) {\\n    if (dir) byteOffset = 0\\n    else return -1\\n  }\\n\\n  // Normalize val\\n  if (typeof val === 'string') {\\n    val = Buffer.from(val, encoding)\\n  }\\n\\n  // Finally, search either indexOf (if dir is true) or lastIndexOf\\n  if (Buffer.isBuffer(val)) {\\n    // Special case: looking for empty string/buffer always fails\\n    if (val.length === 0) {\\n      return -1\\n    }\\n    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)\\n  } else if (typeof val === 'number') {\\n    val = val & 0xFF // Search for a byte value [0-255]\\n    if (Buffer.TYPED_ARRAY_SUPPORT &&\\n        typeof Uint8Array.prototype.indexOf === 'function') {\\n      if (dir) {\\n        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)\\n      } else {\\n        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)\\n      }\\n    }\\n    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)\\n  }\\n\\n  throw new TypeError('val must be string, number or Buffer')\\n}\\n\\nfunction arrayIndexOf (arr, val, byteOffset, encoding, dir) {\\n  var indexSize = 1\\n  var arrLength = arr.length\\n  var valLength = val.length\\n\\n  if (encoding !== undefined) {\\n    encoding = String(encoding).toLowerCase()\\n    if (encoding === 'ucs2' || encoding === 'ucs-2' ||\\n        encoding === 'utf16le' || encoding === 'utf-16le') {\\n      if (arr.length < 2 || val.length < 2) {\\n        return -1\\n      }\\n      indexSize = 2\\n      arrLength /= 2\\n      valLength /= 2\\n      byteOffset /= 2\\n    }\\n  }\\n\\n  function read (buf, i) {\\n    if (indexSize === 1) {\\n      return buf[i]\\n    } else {\\n      return buf.readUInt16BE(i * indexSize)\\n    }\\n  }\\n\\n  var i\\n  if (dir) {\\n    var foundIndex = -1\\n    for (i = byteOffset; i < arrLength; i++) {\\n      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {\\n        if (foundIndex === -1) foundIndex = i\\n        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize\\n      } else {\\n        if (foundIndex !== -1) i -= i - foundIndex\\n        foundIndex = -1\\n      }\\n    }\\n  } else {\\n    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength\\n    for (i = byteOffset; i >= 0; i--) {\\n      var found = true\\n      for (var j = 0; j < valLength; j++) {\\n        if (read(arr, i + j) !== read(val, j)) {\\n          found = false\\n          break\\n        }\\n      }\\n      if (found) return i\\n    }\\n  }\\n\\n  return -1\\n}\\n\\nBuffer.prototype.includes = function includes (val, byteOffset, encoding) {\\n  return this.indexOf(val, byteOffset, encoding) !== -1\\n}\\n\\nBuffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {\\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)\\n}\\n\\nBuffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {\\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)\\n}\\n\\nfunction hexWrite (buf, string, offset, length) {\\n  offset = Number(offset) || 0\\n  var remaining = buf.length - offset\\n  if (!length) {\\n    length = remaining\\n  } else {\\n    length = Number(length)\\n    if (length > remaining) {\\n      length = remaining\\n    }\\n  }\\n\\n  // must be an even number of digits\\n  var strLen = string.length\\n  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')\\n\\n  if (length > strLen / 2) {\\n    length = strLen / 2\\n  }\\n  for (var i = 0; i < length; ++i) {\\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\\n    if (isNaN(parsed)) return i\\n    buf[offset + i] = parsed\\n  }\\n  return i\\n}\\n\\nfunction utf8Write (buf, string, offset, length) {\\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\\n}\\n\\nfunction asciiWrite (buf, string, offset, length) {\\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\\n}\\n\\nfunction latin1Write (buf, string, offset, length) {\\n  return asciiWrite(buf, string, offset, length)\\n}\\n\\nfunction base64Write (buf, string, offset, length) {\\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\\n}\\n\\nfunction ucs2Write (buf, string, offset, length) {\\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\\n}\\n\\nBuffer.prototype.write = function write (string, offset, length, encoding) {\\n  // Buffer#write(string)\\n  if (offset === undefined) {\\n    encoding = 'utf8'\\n    length = this.length\\n    offset = 0\\n  // Buffer#write(string, encoding)\\n  } else if (length === undefined && typeof offset === 'string') {\\n    encoding = offset\\n    length = this.length\\n    offset = 0\\n  // Buffer#write(string, offset[, length][, encoding])\\n  } else if (isFinite(offset)) {\\n    offset = offset | 0\\n    if (isFinite(length)) {\\n      length = length | 0\\n      if (encoding === undefined) encoding = 'utf8'\\n    } else {\\n      encoding = length\\n      length = undefined\\n    }\\n  // legacy write(string, encoding, offset, length) - remove in v0.13\\n  } else {\\n    throw new Error(\\n      'Buffer.write(string, encoding, offset[, length]) is no longer supported'\\n    )\\n  }\\n\\n  var remaining = this.length - offset\\n  if (length === undefined || length > remaining) length = remaining\\n\\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\\n    throw new RangeError('Attempt to write outside buffer bounds')\\n  }\\n\\n  if (!encoding) encoding = 'utf8'\\n\\n  var loweredCase = false\\n  for (;;) {\\n    switch (encoding) {\\n      case 'hex':\\n        return hexWrite(this, string, offset, length)\\n\\n      case 'utf8':\\n      case 'utf-8':\\n        return utf8Write(this, string, offset, length)\\n\\n      case 'ascii':\\n        return asciiWrite(this, string, offset, length)\\n\\n      case 'latin1':\\n      case 'binary':\\n        return latin1Write(this, string, offset, length)\\n\\n      case 'base64':\\n        // Warning: maxLength not taken into account in base64Write\\n        return base64Write(this, string, offset, length)\\n\\n      case 'ucs2':\\n      case 'ucs-2':\\n      case 'utf16le':\\n      case 'utf-16le':\\n        return ucs2Write(this, string, offset, length)\\n\\n      default:\\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\\n        encoding = ('' + encoding).toLowerCase()\\n        loweredCase = true\\n    }\\n  }\\n}\\n\\nBuffer.prototype.toJSON = function toJSON () {\\n  return {\\n    type: 'Buffer',\\n    data: Array.prototype.slice.call(this._arr || this, 0)\\n  }\\n}\\n\\nfunction base64Slice (buf, start, end) {\\n  if (start === 0 && end === buf.length) {\\n    return base64.fromByteArray(buf)\\n  } else {\\n    return base64.fromByteArray(buf.slice(start, end))\\n  }\\n}\\n\\nfunction utf8Slice (buf, start, end) {\\n  end = Math.min(buf.length, end)\\n  var res = []\\n\\n  var i = start\\n  while (i < end) {\\n    var firstByte = buf[i]\\n    var codePoint = null\\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\\n      : (firstByte > 0xDF) ? 3\\n      : (firstByte > 0xBF) ? 2\\n      : 1\\n\\n    if (i + bytesPerSequence <= end) {\\n      var secondByte, thirdByte, fourthByte, tempCodePoint\\n\\n      switch (bytesPerSequence) {\\n        case 1:\\n          if (firstByte < 0x80) {\\n            codePoint = firstByte\\n          }\\n          break\\n        case 2:\\n          secondByte = buf[i + 1]\\n          if ((secondByte & 0xC0) === 0x80) {\\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\\n            if (tempCodePoint > 0x7F) {\\n              codePoint = tempCodePoint\\n            }\\n          }\\n          break\\n        case 3:\\n          secondByte = buf[i + 1]\\n          thirdByte = buf[i + 2]\\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\\n              codePoint = tempCodePoint\\n            }\\n          }\\n          break\\n        case 4:\\n          secondByte = buf[i + 1]\\n          thirdByte = buf[i + 2]\\n          fourthByte = buf[i + 3]\\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\\n              codePoint = tempCodePoint\\n            }\\n          }\\n      }\\n    }\\n\\n    if (codePoint === null) {\\n      // we did not generate a valid codePoint so insert a\\n      // replacement char (U+FFFD) and advance only 1 byte\\n      codePoint = 0xFFFD\\n      bytesPerSequence = 1\\n    } else if (codePoint > 0xFFFF) {\\n      // encode to utf16 (surrogate pair dance)\\n      codePoint -= 0x10000\\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\\n      codePoint = 0xDC00 | codePoint & 0x3FF\\n    }\\n\\n    res.push(codePoint)\\n    i += bytesPerSequence\\n  }\\n\\n  return decodeCodePointsArray(res)\\n}\\n\\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\\n// the lowest limit is Chrome, with 0x10000 args.\\n// We go 1 magnitude less, for safety\\nvar MAX_ARGUMENTS_LENGTH = 0x1000\\n\\nfunction decodeCodePointsArray (codePoints) {\\n  var len = codePoints.length\\n  if (len <= MAX_ARGUMENTS_LENGTH) {\\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\\n  }\\n\\n  // Decode in chunks to avoid \\\"call stack size exceeded\\\".\\n  var res = ''\\n  var i = 0\\n  while (i < len) {\\n    res += String.fromCharCode.apply(\\n      String,\\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\\n    )\\n  }\\n  return res\\n}\\n\\nfunction asciiSlice (buf, start, end) {\\n  var ret = ''\\n  end = Math.min(buf.length, end)\\n\\n  for (var i = start; i < end; ++i) {\\n    ret += String.fromCharCode(buf[i] & 0x7F)\\n  }\\n  return ret\\n}\\n\\nfunction latin1Slice (buf, start, end) {\\n  var ret = ''\\n  end = Math.min(buf.length, end)\\n\\n  for (var i = start; i < end; ++i) {\\n    ret += String.fromCharCode(buf[i])\\n  }\\n  return ret\\n}\\n\\nfunction hexSlice (buf, start, end) {\\n  var len = buf.length\\n\\n  if (!start || start < 0) start = 0\\n  if (!end || end < 0 || end > len) end = len\\n\\n  var out = ''\\n  for (var i = start; i < end; ++i) {\\n    out += toHex(buf[i])\\n  }\\n  return out\\n}\\n\\nfunction utf16leSlice (buf, start, end) {\\n  var bytes = buf.slice(start, end)\\n  var res = ''\\n  for (var i = 0; i < bytes.length; i += 2) {\\n    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)\\n  }\\n  return res\\n}\\n\\nBuffer.prototype.slice = function slice (start, end) {\\n  var len = this.length\\n  start = ~~start\\n  end = end === undefined ? len : ~~end\\n\\n  if (start < 0) {\\n    start += len\\n    if (start < 0) start = 0\\n  } else if (start > len) {\\n    start = len\\n  }\\n\\n  if (end < 0) {\\n    end += len\\n    if (end < 0) end = 0\\n  } else if (end > len) {\\n    end = len\\n  }\\n\\n  if (end < start) end = start\\n\\n  var newBuf\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    newBuf = this.subarray(start, end)\\n    newBuf.__proto__ = Buffer.prototype\\n  } else {\\n    var sliceLen = end - start\\n    newBuf = new Buffer(sliceLen, undefined)\\n    for (var i = 0; i < sliceLen; ++i) {\\n      newBuf[i] = this[i + start]\\n    }\\n  }\\n\\n  return newBuf\\n}\\n\\n/*\\n * Need to make sure that buffer isn't trying to write out of bounds.\\n */\\nfunction checkOffset (offset, ext, length) {\\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\\n}\\n\\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\\n\\n  var val = this[offset]\\n  var mul = 1\\n  var i = 0\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    val += this[offset + i] * mul\\n  }\\n\\n  return val\\n}\\n\\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) {\\n    checkOffset(offset, byteLength, this.length)\\n  }\\n\\n  var val = this[offset + --byteLength]\\n  var mul = 1\\n  while (byteLength > 0 && (mul *= 0x100)) {\\n    val += this[offset + --byteLength] * mul\\n  }\\n\\n  return val\\n}\\n\\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 1, this.length)\\n  return this[offset]\\n}\\n\\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  return this[offset] | (this[offset + 1] << 8)\\n}\\n\\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  return (this[offset] << 8) | this[offset + 1]\\n}\\n\\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return ((this[offset]) |\\n      (this[offset + 1] << 8) |\\n      (this[offset + 2] << 16)) +\\n      (this[offset + 3] * 0x1000000)\\n}\\n\\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return (this[offset] * 0x1000000) +\\n    ((this[offset + 1] << 16) |\\n    (this[offset + 2] << 8) |\\n    this[offset + 3])\\n}\\n\\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\\n\\n  var val = this[offset]\\n  var mul = 1\\n  var i = 0\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    val += this[offset + i] * mul\\n  }\\n  mul *= 0x80\\n\\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\\n\\n  return val\\n}\\n\\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\\n\\n  var i = byteLength\\n  var mul = 1\\n  var val = this[offset + --i]\\n  while (i > 0 && (mul *= 0x100)) {\\n    val += this[offset + --i] * mul\\n  }\\n  mul *= 0x80\\n\\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\\n\\n  return val\\n}\\n\\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 1, this.length)\\n  if (!(this[offset] & 0x80)) return (this[offset])\\n  return ((0xff - this[offset] + 1) * -1)\\n}\\n\\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  var val = this[offset] | (this[offset + 1] << 8)\\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\\n}\\n\\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  var val = this[offset + 1] | (this[offset] << 8)\\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\\n}\\n\\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return (this[offset]) |\\n    (this[offset + 1] << 8) |\\n    (this[offset + 2] << 16) |\\n    (this[offset + 3] << 24)\\n}\\n\\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return (this[offset] << 24) |\\n    (this[offset + 1] << 16) |\\n    (this[offset + 2] << 8) |\\n    (this[offset + 3])\\n}\\n\\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n  return ieee754.read(this, offset, true, 23, 4)\\n}\\n\\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n  return ieee754.read(this, offset, false, 23, 4)\\n}\\n\\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 8, this.length)\\n  return ieee754.read(this, offset, true, 52, 8)\\n}\\n\\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 8, this.length)\\n  return ieee754.read(this, offset, false, 52, 8)\\n}\\n\\nfunction checkInt (buf, value, offset, ext, max, min) {\\n  if (!Buffer.isBuffer(buf)) throw new TypeError('\\\"buffer\\\" argument must be a Buffer instance')\\n  if (value > max || value < min) throw new RangeError('\\\"value\\\" argument is out of bounds')\\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\\n}\\n\\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) {\\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\\n  }\\n\\n  var mul = 1\\n  var i = 0\\n  this[offset] = value & 0xFF\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    this[offset + i] = (value / mul) & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) {\\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\\n  }\\n\\n  var i = byteLength - 1\\n  var mul = 1\\n  this[offset + i] = value & 0xFF\\n  while (--i >= 0 && (mul *= 0x100)) {\\n    this[offset + i] = (value / mul) & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\\n  this[offset] = (value & 0xff)\\n  return offset + 1\\n}\\n\\nfunction objectWriteUInt16 (buf, value, offset, littleEndian) {\\n  if (value < 0) value = 0xffff + value + 1\\n  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {\\n    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>\\n      (littleEndian ? i : 1 - i) * 8\\n  }\\n}\\n\\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value & 0xff)\\n    this[offset + 1] = (value >>> 8)\\n  } else {\\n    objectWriteUInt16(this, value, offset, true)\\n  }\\n  return offset + 2\\n}\\n\\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 8)\\n    this[offset + 1] = (value & 0xff)\\n  } else {\\n    objectWriteUInt16(this, value, offset, false)\\n  }\\n  return offset + 2\\n}\\n\\nfunction objectWriteUInt32 (buf, value, offset, littleEndian) {\\n  if (value < 0) value = 0xffffffff + value + 1\\n  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {\\n    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff\\n  }\\n}\\n\\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset + 3] = (value >>> 24)\\n    this[offset + 2] = (value >>> 16)\\n    this[offset + 1] = (value >>> 8)\\n    this[offset] = (value & 0xff)\\n  } else {\\n    objectWriteUInt32(this, value, offset, true)\\n  }\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 24)\\n    this[offset + 1] = (value >>> 16)\\n    this[offset + 2] = (value >>> 8)\\n    this[offset + 3] = (value & 0xff)\\n  } else {\\n    objectWriteUInt32(this, value, offset, false)\\n  }\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) {\\n    var limit = Math.pow(2, 8 * byteLength - 1)\\n\\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\\n  }\\n\\n  var i = 0\\n  var mul = 1\\n  var sub = 0\\n  this[offset] = value & 0xFF\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {\\n      sub = 1\\n    }\\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) {\\n    var limit = Math.pow(2, 8 * byteLength - 1)\\n\\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\\n  }\\n\\n  var i = byteLength - 1\\n  var mul = 1\\n  var sub = 0\\n  this[offset + i] = value & 0xFF\\n  while (--i >= 0 && (mul *= 0x100)) {\\n    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {\\n      sub = 1\\n    }\\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\\n  if (value < 0) value = 0xff + value + 1\\n  this[offset] = (value & 0xff)\\n  return offset + 1\\n}\\n\\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value & 0xff)\\n    this[offset + 1] = (value >>> 8)\\n  } else {\\n    objectWriteUInt16(this, value, offset, true)\\n  }\\n  return offset + 2\\n}\\n\\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 8)\\n    this[offset + 1] = (value & 0xff)\\n  } else {\\n    objectWriteUInt16(this, value, offset, false)\\n  }\\n  return offset + 2\\n}\\n\\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value & 0xff)\\n    this[offset + 1] = (value >>> 8)\\n    this[offset + 2] = (value >>> 16)\\n    this[offset + 3] = (value >>> 24)\\n  } else {\\n    objectWriteUInt32(this, value, offset, true)\\n  }\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\\n  if (value < 0) value = 0xffffffff + value + 1\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 24)\\n    this[offset + 1] = (value >>> 16)\\n    this[offset + 2] = (value >>> 8)\\n    this[offset + 3] = (value & 0xff)\\n  } else {\\n    objectWriteUInt32(this, value, offset, false)\\n  }\\n  return offset + 4\\n}\\n\\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\\n  if (offset < 0) throw new RangeError('Index out of range')\\n}\\n\\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\\n  if (!noAssert) {\\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\\n  }\\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\\n  return writeFloat(this, value, offset, true, noAssert)\\n}\\n\\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\\n  return writeFloat(this, value, offset, false, noAssert)\\n}\\n\\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\\n  if (!noAssert) {\\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\\n  }\\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\\n  return offset + 8\\n}\\n\\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\\n  return writeDouble(this, value, offset, true, noAssert)\\n}\\n\\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\\n  return writeDouble(this, value, offset, false, noAssert)\\n}\\n\\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\\n  if (!start) start = 0\\n  if (!end && end !== 0) end = this.length\\n  if (targetStart >= target.length) targetStart = target.length\\n  if (!targetStart) targetStart = 0\\n  if (end > 0 && end < start) end = start\\n\\n  // Copy 0 bytes; we're done\\n  if (end === start) return 0\\n  if (target.length === 0 || this.length === 0) return 0\\n\\n  // Fatal error conditions\\n  if (targetStart < 0) {\\n    throw new RangeError('targetStart out of bounds')\\n  }\\n  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')\\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\\n\\n  // Are we oob?\\n  if (end > this.length) end = this.length\\n  if (target.length - targetStart < end - start) {\\n    end = target.length - targetStart + start\\n  }\\n\\n  var len = end - start\\n  var i\\n\\n  if (this === target && start < targetStart && targetStart < end) {\\n    // descending copy from end\\n    for (i = len - 1; i >= 0; --i) {\\n      target[i + targetStart] = this[i + start]\\n    }\\n  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {\\n    // ascending copy from start\\n    for (i = 0; i < len; ++i) {\\n      target[i + targetStart] = this[i + start]\\n    }\\n  } else {\\n    Uint8Array.prototype.set.call(\\n      target,\\n      this.subarray(start, start + len),\\n      targetStart\\n    )\\n  }\\n\\n  return len\\n}\\n\\n// Usage:\\n//    buffer.fill(number[, offset[, end]])\\n//    buffer.fill(buffer[, offset[, end]])\\n//    buffer.fill(string[, offset[, end]][, encoding])\\nBuffer.prototype.fill = function fill (val, start, end, encoding) {\\n  // Handle string cases:\\n  if (typeof val === 'string') {\\n    if (typeof start === 'string') {\\n      encoding = start\\n      start = 0\\n      end = this.length\\n    } else if (typeof end === 'string') {\\n      encoding = end\\n      end = this.length\\n    }\\n    if (val.length === 1) {\\n      var code = val.charCodeAt(0)\\n      if (code < 256) {\\n        val = code\\n      }\\n    }\\n    if (encoding !== undefined && typeof encoding !== 'string') {\\n      throw new TypeError('encoding must be a string')\\n    }\\n    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {\\n      throw new TypeError('Unknown encoding: ' + encoding)\\n    }\\n  } else if (typeof val === 'number') {\\n    val = val & 255\\n  }\\n\\n  // Invalid ranges are not set to a default, so can range check early.\\n  if (start < 0 || this.length < start || this.length < end) {\\n    throw new RangeError('Out of range index')\\n  }\\n\\n  if (end <= start) {\\n    return this\\n  }\\n\\n  start = start >>> 0\\n  end = end === undefined ? this.length : end >>> 0\\n\\n  if (!val) val = 0\\n\\n  var i\\n  if (typeof val === 'number') {\\n    for (i = start; i < end; ++i) {\\n      this[i] = val\\n    }\\n  } else {\\n    var bytes = Buffer.isBuffer(val)\\n      ? val\\n      : utf8ToBytes(new Buffer(val, encoding).toString())\\n    var len = bytes.length\\n    for (i = 0; i < end - start; ++i) {\\n      this[i + start] = bytes[i % len]\\n    }\\n  }\\n\\n  return this\\n}\\n\\n// HELPER FUNCTIONS\\n// ================\\n\\nvar INVALID_BASE64_RE = /[^+\\\\/0-9A-Za-z-_]/g\\n\\nfunction base64clean (str) {\\n  // Node strips out invalid characters like \\\\n and \\\\t from the string, base64-js does not\\n  str = stringtrim(str).replace(INVALID_BASE64_RE, '')\\n  // Node converts strings with length < 2 to ''\\n  if (str.length < 2) return ''\\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\\n  while (str.length % 4 !== 0) {\\n    str = str + '='\\n  }\\n  return str\\n}\\n\\nfunction stringtrim (str) {\\n  if (str.trim) return str.trim()\\n  return str.replace(/^\\\\s+|\\\\s+$/g, '')\\n}\\n\\nfunction toHex (n) {\\n  if (n < 16) return '0' + n.toString(16)\\n  return n.toString(16)\\n}\\n\\nfunction utf8ToBytes (string, units) {\\n  units = units || Infinity\\n  var codePoint\\n  var length = string.length\\n  var leadSurrogate = null\\n  var bytes = []\\n\\n  for (var i = 0; i < length; ++i) {\\n    codePoint = string.charCodeAt(i)\\n\\n    // is surrogate component\\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\\n      // last char was a lead\\n      if (!leadSurrogate) {\\n        // no lead yet\\n        if (codePoint > 0xDBFF) {\\n          // unexpected trail\\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n          continue\\n        } else if (i + 1 === length) {\\n          // unpaired lead\\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n          continue\\n        }\\n\\n        // valid lead\\n        leadSurrogate = codePoint\\n\\n        continue\\n      }\\n\\n      // 2 leads in a row\\n      if (codePoint < 0xDC00) {\\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n        leadSurrogate = codePoint\\n        continue\\n      }\\n\\n      // valid surrogate pair\\n      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000\\n    } else if (leadSurrogate) {\\n      // valid bmp char, but last char was a lead\\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n    }\\n\\n    leadSurrogate = null\\n\\n    // encode utf8\\n    if (codePoint < 0x80) {\\n      if ((units -= 1) < 0) break\\n      bytes.push(codePoint)\\n    } else if (codePoint < 0x800) {\\n      if ((units -= 2) < 0) break\\n      bytes.push(\\n        codePoint >> 0x6 | 0xC0,\\n        codePoint & 0x3F | 0x80\\n      )\\n    } else if (codePoint < 0x10000) {\\n      if ((units -= 3) < 0) break\\n      bytes.push(\\n        codePoint >> 0xC | 0xE0,\\n        codePoint >> 0x6 & 0x3F | 0x80,\\n        codePoint & 0x3F | 0x80\\n      )\\n    } else if (codePoint < 0x110000) {\\n      if ((units -= 4) < 0) break\\n      bytes.push(\\n        codePoint >> 0x12 | 0xF0,\\n        codePoint >> 0xC & 0x3F | 0x80,\\n        codePoint >> 0x6 & 0x3F | 0x80,\\n        codePoint & 0x3F | 0x80\\n      )\\n    } else {\\n      throw new Error('Invalid code point')\\n    }\\n  }\\n\\n  return bytes\\n}\\n\\nfunction asciiToBytes (str) {\\n  var byteArray = []\\n  for (var i = 0; i < str.length; ++i) {\\n    // Node's code seems to be doing this and not & 0x7F..\\n    byteArray.push(str.charCodeAt(i) & 0xFF)\\n  }\\n  return byteArray\\n}\\n\\nfunction utf16leToBytes (str, units) {\\n  var c, hi, lo\\n  var byteArray = []\\n  for (var i = 0; i < str.length; ++i) {\\n    if ((units -= 2) < 0) break\\n\\n    c = str.charCodeAt(i)\\n    hi = c >> 8\\n    lo = c % 256\\n    byteArray.push(lo)\\n    byteArray.push(hi)\\n  }\\n\\n  return byteArray\\n}\\n\\nfunction base64ToBytes (str) {\\n  return base64.toByteArray(base64clean(str))\\n}\\n\\nfunction blitBuffer (src, dst, offset, length) {\\n  for (var i = 0; i < length; ++i) {\\n    if ((i + offset >= dst.length) || (i >= src.length)) break\\n    dst[i + offset] = src[i]\\n  }\\n  return i\\n}\\n\\nfunction isnan (val) {\\n  return val !== val // eslint-disable-line no-self-compare\\n}\\n\\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/node-libs-browser/node_modules/buffer/index.js\\n// module id = 0\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/buffer/index.js?\");\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports) {\n\neval(\"var g;\\n\\n// This works in non-strict mode\\ng = (function() {\\n\\treturn this;\\n})();\\n\\ntry {\\n\\t// This works if eval is allowed (see CSP)\\n\\tg = g || Function(\\\"return this\\\")() || (1,eval)(\\\"this\\\");\\n} catch(e) {\\n\\t// This works if the window reference is available\\n\\tif(typeof window === \\\"object\\\")\\n\\t\\tg = window;\\n}\\n\\n// g can still be undefined, but nothing to do about it...\\n// We return undefined, instead of nothing here, so it's\\n// easier to handle this case. if(!global) { ...}\\n\\nmodule.exports = g;\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// (webpack)/buildin/global.js\\n// module id = 1\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///(webpack)/buildin/global.js?\");\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"\\n\\nexports.byteLength = byteLength\\nexports.toByteArray = toByteArray\\nexports.fromByteArray = fromByteArray\\n\\nvar lookup = []\\nvar revLookup = []\\nvar Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array\\n\\nvar code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\\nfor (var i = 0, len = code.length; i < len; ++i) {\\n  lookup[i] = code[i]\\n  revLookup[code.charCodeAt(i)] = i\\n}\\n\\nrevLookup['-'.charCodeAt(0)] = 62\\nrevLookup['_'.charCodeAt(0)] = 63\\n\\nfunction placeHoldersCount (b64) {\\n  var len = b64.length\\n  if (len % 4 > 0) {\\n    throw new Error('Invalid string. Length must be a multiple of 4')\\n  }\\n\\n  // the number of equal signs (place holders)\\n  // if there are two placeholders, than the two characters before it\\n  // represent one byte\\n  // if there is only one, then the three characters before it represent 2 bytes\\n  // this is just a cheap hack to not do indexOf twice\\n  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0\\n}\\n\\nfunction byteLength (b64) {\\n  // base64 is 4/3 + up to two characters of the original data\\n  return (b64.length * 3 / 4) - placeHoldersCount(b64)\\n}\\n\\nfunction toByteArray (b64) {\\n  var i, l, tmp, placeHolders, arr\\n  var len = b64.length\\n  placeHolders = placeHoldersCount(b64)\\n\\n  arr = new Arr((len * 3 / 4) - placeHolders)\\n\\n  // if there are placeholders, only get up to the last complete 4 chars\\n  l = placeHolders > 0 ? len - 4 : len\\n\\n  var L = 0\\n\\n  for (i = 0; i < l; i += 4) {\\n    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]\\n    arr[L++] = (tmp >> 16) & 0xFF\\n    arr[L++] = (tmp >> 8) & 0xFF\\n    arr[L++] = tmp & 0xFF\\n  }\\n\\n  if (placeHolders === 2) {\\n    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)\\n    arr[L++] = tmp & 0xFF\\n  } else if (placeHolders === 1) {\\n    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)\\n    arr[L++] = (tmp >> 8) & 0xFF\\n    arr[L++] = tmp & 0xFF\\n  }\\n\\n  return arr\\n}\\n\\nfunction tripletToBase64 (num) {\\n  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]\\n}\\n\\nfunction encodeChunk (uint8, start, end) {\\n  var tmp\\n  var output = []\\n  for (var i = start; i < end; i += 3) {\\n    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])\\n    output.push(tripletToBase64(tmp))\\n  }\\n  return output.join('')\\n}\\n\\nfunction fromByteArray (uint8) {\\n  var tmp\\n  var len = uint8.length\\n  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes\\n  var output = ''\\n  var parts = []\\n  var maxChunkLength = 16383 // must be multiple of 3\\n\\n  // go through the array every three bytes, we'll deal with trailing stuff later\\n  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {\\n    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))\\n  }\\n\\n  // pad the end with zeros, but make sure to not forget the extra bytes\\n  if (extraBytes === 1) {\\n    tmp = uint8[len - 1]\\n    output += lookup[tmp >> 2]\\n    output += lookup[(tmp << 4) & 0x3F]\\n    output += '=='\\n  } else if (extraBytes === 2) {\\n    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])\\n    output += lookup[tmp >> 10]\\n    output += lookup[(tmp >> 4) & 0x3F]\\n    output += lookup[(tmp << 2) & 0x3F]\\n    output += '='\\n  }\\n\\n  parts.push(output)\\n\\n  return parts.join('')\\n}\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/base64-js/index.js\\n// module id = 2\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/base64-js/index.js?\");\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports) {\n\neval(\"exports.read = function (buffer, offset, isLE, mLen, nBytes) {\\n  var e, m\\n  var eLen = nBytes * 8 - mLen - 1\\n  var eMax = (1 << eLen) - 1\\n  var eBias = eMax >> 1\\n  var nBits = -7\\n  var i = isLE ? (nBytes - 1) : 0\\n  var d = isLE ? -1 : 1\\n  var s = buffer[offset + i]\\n\\n  i += d\\n\\n  e = s & ((1 << (-nBits)) - 1)\\n  s >>= (-nBits)\\n  nBits += eLen\\n  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}\\n\\n  m = e & ((1 << (-nBits)) - 1)\\n  e >>= (-nBits)\\n  nBits += mLen\\n  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}\\n\\n  if (e === 0) {\\n    e = 1 - eBias\\n  } else if (e === eMax) {\\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\\n  } else {\\n    m = m + Math.pow(2, mLen)\\n    e = e - eBias\\n  }\\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\\n}\\n\\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\\n  var e, m, c\\n  var eLen = nBytes * 8 - mLen - 1\\n  var eMax = (1 << eLen) - 1\\n  var eBias = eMax >> 1\\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\\n  var i = isLE ? 0 : (nBytes - 1)\\n  var d = isLE ? 1 : -1\\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\\n\\n  value = Math.abs(value)\\n\\n  if (isNaN(value) || value === Infinity) {\\n    m = isNaN(value) ? 1 : 0\\n    e = eMax\\n  } else {\\n    e = Math.floor(Math.log(value) / Math.LN2)\\n    if (value * (c = Math.pow(2, -e)) < 1) {\\n      e--\\n      c *= 2\\n    }\\n    if (e + eBias >= 1) {\\n      value += rt / c\\n    } else {\\n      value += rt * Math.pow(2, 1 - eBias)\\n    }\\n    if (value * c >= 2) {\\n      e++\\n      c /= 2\\n    }\\n\\n    if (e + eBias >= eMax) {\\n      m = 0\\n      e = eMax\\n    } else if (e + eBias >= 1) {\\n      m = (value * c - 1) * Math.pow(2, mLen)\\n      e = e + eBias\\n    } else {\\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\\n      e = 0\\n    }\\n  }\\n\\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\\n\\n  e = (e << mLen) | m\\n  eLen += mLen\\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\\n\\n  buffer[offset + i - d] |= s * 128\\n}\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/ieee754/index.js\\n// module id = 3\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/ieee754/index.js?\");\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports) {\n\neval(\"var toString = {}.toString;\\n\\nmodule.exports = Array.isArray || function (arr) {\\n  return toString.call(arr) == '[object Array]';\\n};\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/isarray/index.js\\n// module id = 4\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/isarray/index.js?\");\n\n/***/ }),\n/* 5 */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\neval(\"Object.defineProperty(__webpack_exports__, \\\"__esModule\\\", { value: true });\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_buffer___ = __webpack_require__(0);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_buffer____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_buffer___);\\n/**\\n* Created by ajk on 12/16/15.\\n* Purpose: This file folds all the constants for the\\n*     OpenBCI Board\\n*/\\n\\n\\n\\n\\n/** Turning channels off */\\nconst obciChannelOff1 = '1';\\nconst obciChannelOff2 = '2';\\nconst obciChannelOff3 = '3';\\nconst obciChannelOff4 = '4';\\nconst obciChannelOff5 = '5';\\nconst obciChannelOff6 = '6';\\nconst obciChannelOff7 = '7';\\nconst obciChannelOff8 = '8';\\nconst obciChannelOff9 = 'q';\\nconst obciChannelOff10 = 'w';\\nconst obciChannelOff11 = 'e';\\nconst obciChannelOff12 = 'r';\\nconst obciChannelOff13 = 't';\\nconst obciChannelOff14 = 'y';\\nconst obciChannelOff15 = 'u';\\nconst obciChannelOff16 = 'i';\\n\\n/** Turn channels on */\\nconst obciChannelOn1 = '!';\\nconst obciChannelOn2 = '@';\\nconst obciChannelOn3 = '#';\\nconst obciChannelOn4 = '$';\\nconst obciChannelOn5 = '%';\\nconst obciChannelOn6 = '^';\\nconst obciChannelOn7 = '&';\\nconst obciChannelOn8 = '*';\\nconst obciChannelOn9 = 'Q';\\nconst obciChannelOn10 = 'W';\\nconst obciChannelOn11 = 'E';\\nconst obciChannelOn12 = 'R';\\nconst obciChannelOn13 = 'T';\\nconst obciChannelOn14 = 'Y';\\nconst obciChannelOn15 = 'U';\\nconst obciChannelOn16 = 'I';\\n\\n/** Test Signal Control Commands\\n* 1x - Voltage will be 1 * (VREFP - VREFN) / 2.4 mV\\n* 2x - Voltage will be 2 * (VREFP - VREFN) / 2.4 mV\\n*/\\nconst obciTestSignalConnectToDC = 'p';\\nconst obciTestSignalConnectToGround = '0';\\nconst obciTestSignalConnectToPulse1xFast = '=';\\nconst obciTestSignalConnectToPulse1xSlow = '-';\\nconst obciTestSignalConnectToPulse2xFast = ']';\\nconst obciTestSignalConnectToPulse2xSlow = '[';\\n\\n/** Channel Setting Commands */\\nconst obciChannelCmdADCNormal = '0';\\nconst obciChannelCmdADCShorted = '1';\\nconst obciChannelCmdADCBiasDRP = '6';\\nconst obciChannelCmdADCBiasDRN = '7';\\nconst obciChannelCmdADCBiasMethod = '2';\\nconst obciChannelCmdADCMVDD = '3';\\nconst obciChannelCmdADCTemp = '4';\\nconst obciChannelCmdADCTestSig = '5';\\nconst obciChannelCmdBiasInclude = '1';\\nconst obciChannelCmdBiasRemove = '0';\\nconst obciChannelCmdChannel1 = '1';\\nconst obciChannelCmdChannel2 = '2';\\nconst obciChannelCmdChannel3 = '3';\\nconst obciChannelCmdChannel4 = '4';\\nconst obciChannelCmdChannel5 = '5';\\nconst obciChannelCmdChannel6 = '6';\\nconst obciChannelCmdChannel7 = '7';\\nconst obciChannelCmdChannel8 = '8';\\nconst obciChannelCmdChannel9 = 'Q';\\nconst obciChannelCmdChannel10 = 'W';\\nconst obciChannelCmdChannel11 = 'E';\\nconst obciChannelCmdChannel12 = 'R';\\nconst obciChannelCmdChannel13 = 'T';\\nconst obciChannelCmdChannel14 = 'Y';\\nconst obciChannelCmdChannel15 = 'U';\\nconst obciChannelCmdChannel16 = 'I';\\nconst obciChannelCmdGain1 = '0';\\nconst obciChannelCmdGain2 = '1';\\nconst obciChannelCmdGain4 = '2';\\nconst obciChannelCmdGain6 = '3';\\nconst obciChannelCmdGain8 = '4';\\nconst obciChannelCmdGain12 = '5';\\nconst obciChannelCmdGain24 = '6';\\nconst obciChannelCmdLatch = 'X';\\nconst obciChannelCmdPowerOff = '1';\\nconst obciChannelCmdPowerOn = '0';\\nconst obciChannelCmdSet = 'x';\\nconst obciChannelCmdSRB1Connect = '1';\\nconst obciChannelCmdSRB1Diconnect = '0';\\nconst obciChannelCmdSRB2Connect = '1';\\nconst obciChannelCmdSRB2Diconnect = '0';\\n\\n/** Channel Setting Helper Strings */\\nconst obciStringADCNormal = 'normal';\\nconst obciStringADCShorted = 'shorted';\\nconst obciStringADCBiasMethod = 'biasMethod';\\nconst obciStringADCMvdd = 'mvdd';\\nconst obciStringADCTemp = 'temp';\\nconst obciStringADCTestSig = 'testSig';\\nconst obciStringADCBiasDrp = 'biasDrp';\\nconst obciStringADCBiasDrn = 'biasDrn';\\n\\n/** Default Channel Settings */\\nconst obciChannelDefaultAllSet = 'd';\\nconst obciChannelDefaultAllGet = 'D';\\n\\n/** LeadOff Impedance Commands */\\nconst obciChannelImpedanceLatch = 'Z';\\nconst obciChannelImpedanceSet = 'z';\\nconst obciChannelImpedanceTestSignalApplied = '1';\\nconst obciChannelImpedanceTestSignalAppliedNot = '0';\\n\\n/** SD card Commands */\\nconst obciSDLogForHour1 = 'G';\\nconst obciSDLogForHour2 = 'H';\\nconst obciSDLogForHour4 = 'J';\\nconst obciSDLogForHour12 = 'K';\\nconst obciSDLogForHour24 = 'L';\\nconst obciSDLogForMin5 = 'A';\\nconst obciSDLogForMin15 = 'S';\\nconst obciSDLogForMin30 = 'F';\\nconst obciSDLogForSec14 = 'a';\\nconst obciSDLogStop = 'j';\\n\\n/** SD Card String Commands */\\nconst obciStringSDHour1 = '1hour';\\nconst obciStringSDHour2 = '2hour';\\nconst obciStringSDHour4 = '4hour';\\nconst obciStringSDHour12 = '12hour';\\nconst obciStringSDHour24 = '24hour';\\nconst obciStringSDMin5 = '5min';\\nconst obciStringSDMin15 = '15min';\\nconst obciStringSDMin30 = '30min';\\nconst obciStringSDSec14 = '14sec';\\n\\n/** Stream Data Commands */\\nconst obciStreamStart = 'b';\\nconst obciStreamStop = 's';\\n\\n/** Miscellaneous */\\nconst obciMiscQueryRegisterSettings = '?';\\nconst obciMiscQueryRegisterSettingsChannel1 = 'CH1SET';\\nconst obciMiscQueryRegisterSettingsChannel2 = 'CH2SET';\\nconst obciMiscQueryRegisterSettingsChannel3 = 'CH3SET';\\nconst obciMiscQueryRegisterSettingsChannel4 = 'CH4SET';\\nconst obciMiscQueryRegisterSettingsChannel5 = 'CH5SET';\\nconst obciMiscQueryRegisterSettingsChannel6 = 'CH6SET';\\nconst obciMiscQueryRegisterSettingsChannel7 = 'CH7SET';\\nconst obciMiscQueryRegisterSettingsChannel8 = 'CH8SET';\\nconst obciMiscSoftReset = 'v';\\n\\n/** 16 Channel Commands */\\nconst obciChannelMaxNumber8 = 'c';\\nconst obciChannelMaxNumber16 = 'C';\\nconst obciChannelMaxNumber8NoDaisyToRemove = '';\\nconst obciChannelMaxNumber8SuccessDaisyRemoved = 'daisy removed';\\nconst obciChannelMaxNumber16DaisyAlreadyAttached = '16';\\nconst obciChannelMaxNumber16DaisyAttached = 'daisy attached16';\\nconst obciChannelMaxNumber16NoDaisyAttached = 'no daisy to attach!8';\\n\\n/** 60Hz line filter */\\nconst obciFilterDisable = 'g';\\nconst obciFilterEnable = 'f';\\n\\n/** Triggers */\\nconst obciTrigger = '`';\\n\\n/** Sync Clocks */\\nconst obciSyncTimeSet = '<';\\nconst obciSyncTimeSent = ',';\\n\\n/** Set board mode */\\nconst obciBoardModeSet = '/';\\nconst obciBoardModeCmdDefault = '0';\\nconst obciBoardModeCmdDebug = '1';\\nconst obciBoardModeCmdAnalog = '2';\\nconst obciBoardModeCmdDigital = '3';\\nconst obciBoardModeCmdGetCur = '/';\\nconst obciBoardModeAnalog = 'analog';\\nconst obciBoardModeDefault = 'default';\\nconst obciBoardModeDebug = 'debug';\\nconst obciBoardModeDigital = 'digital';\\n\\n/** Set sample rate */\\nconst obciSampleRateSet = '~';\\nconst obciSampleRateCmdCyton16000 = '0';\\nconst obciSampleRateCmdCyton8000 = '1';\\nconst obciSampleRateCmdCyton4000 = '2';\\nconst obciSampleRateCmdCyton2000 = '3';\\nconst obciSampleRateCmdCyton1000 = '4';\\nconst obciSampleRateCmdCyton500 = '5';\\nconst obciSampleRateCmdCyton250 = '6';\\nconst obciSampleRateCmdGang25600 = '0';\\nconst obciSampleRateCmdGang12800 = '1';\\nconst obciSampleRateCmdGang6400 = '2';\\nconst obciSampleRateCmdGang3200 = '3';\\nconst obciSampleRateCmdGang1600 = '4';\\nconst obciSampleRateCmdGang800 = '5';\\nconst obciSampleRateCmdGang400 = '6';\\nconst obciSampleRateCmdGang200 = '7';\\nconst obciSampleRateCmdaGetCur = '~';\\n\\n/** Accel enable/disable commands */\\nconst obciAccelStart = 'n';\\nconst obciAccelStop = 'N';\\n\\n/** Wifi Stuff */\\nconst obciWifiAttach = '{';\\nconst obciWifiRemove = '}';\\nconst obciWifiReset = ';';\\nconst obciWifiStatus = ':';\\n\\n/** Radio Key */\\nconst obciRadioKey = 0xF0;\\n/** Radio Commands */\\nconst obciRadioCmdChannelGet = 0x00;\\nconst obciRadioCmdChannelSet = 0x01;\\nconst obciRadioCmdChannelSetOverride = 0x02;\\nconst obciRadioCmdPollTimeGet = 0x03;\\nconst obciRadioCmdPollTimeSet = 0x04;\\nconst obciRadioCmdBaudRateSetDefault = 0x05;\\nconst obciRadioCmdBaudRateSetFast = 0x06;\\nconst obciRadioCmdSystemStatus = 0x07;\\n\\n/** Possible number of channels */\\nconst obciNumberOfChannelsCyton = 8;\\nconst obciNumberOfChannelsCytonBLE = 2;\\nconst obciNumberOfChannelsDaisy = 16;\\nconst obciNumberOfChannelsDefault = obciNumberOfChannelsCyton;\\nconst obciNumberOfChannelsGanglion = 4;\\n\\n/** Possible OpenBCI board types */\\nconst obciBoardCyton = 'cyton';\\nconst obciBoardCytonBLE = 'cytonBLE';\\nconst obciBoardDaisy = 'daisy';\\nconst obciBoardDefault = 'default';\\nconst obciBoardGanglion = 'ganglion';\\nconst obciBoardNone = 'none';\\n\\n/** Possible Simulator Line Noise injections */\\nconst obciSimulatorLineNoiseHz60 = '60Hz';\\nconst obciSimulatorLineNoiseHz50 = '50Hz';\\nconst obciSimulatorLineNoiseNone = 'none';\\n\\n/** Possible Simulator Fragmentation modes */\\nconst obciSimulatorFragmentationRandom = 'random';\\nconst obciSimulatorFragmentationFullBuffers = 'fullBuffers';\\nconst obciSimulatorFragmentationOneByOne = 'oneByOne';\\nconst obciSimulatorFragmentationNone = 'none';\\n\\n/** Possible Sample Rates */\\nconst obciSampleRate1000 = 1000;\\nconst obciSampleRate125 = 125;\\nconst obciSampleRate12800 = 12800;\\nconst obciSampleRate1600 = 1600;\\nconst obciSampleRate16000 = 16000;\\nconst obciSampleRate200 = 200;\\nconst obciSampleRate2000 = 2000;\\nconst obciSampleRate250 = 250;\\nconst obciSampleRate25600 = 25600;\\nconst obciSampleRate3200 = 3200;\\nconst obciSampleRate400 = 400;\\nconst obciSampleRate4000 = 4000;\\nconst obciSampleRate500 = 500;\\nconst obciSampleRate6400 = 6400;\\nconst obciSampleRate800 = 800;\\nconst obciSampleRate8000 = 8000;\\n\\n/** Max sample number */\\nconst obciSampleNumberMax = 255;\\n\\n/** Packet Size */\\nconst obciPacketSize = 33;\\nconst obciPacketSizeBLECyton = 20;\\nconst obciPacketSizeBLERaw = 12;\\n\\n/** OpenBCI V3 Standard Packet Positions */\\n/**\\n* 0:[startByte] | 1:[sampleNumber] | 2:[Channel-1.1] | 3:[Channel-1.2] | 4:[Channel-1.3] | 5:[Channel-2.1] | 6:[Channel-2.2] | 7:[Channel-2.3] | 8:[Channel-3.1] | 9:[Channel-3.2] | 10:[Channel-3.3] | 11:[Channel-4.1] | 12:[Channel-4.2] | 13:[Channel-4.3] | 14:[Channel-5.1] | 15:[Channel-5.2] | 16:[Channel-5.3] | 17:[Channel-6.1] | 18:[Channel-6.2] | 19:[Channel-6.3] | 20:[Channel-7.1] | 21:[Channel-7.2] | 22:[Channel-7.3] | 23:[Channel-8.1] | 24:[Channel-8.2] | 25:[Channel-8.3] | 26:[Aux-1.1] | 27:[Aux-1.2] | 28:[Aux-2.1] | 29:[Aux-2.2] | 30:[Aux-3.1] | 31:[Aux-3.2] | 32:StopByte\\n*/\\nconst obciPacketPositionChannelDataStart = 2; // 0:startByte | 1:sampleNumber | [2:4] | [5:7] | [8:10] | [11:13] | [14:16] | [17:19] | [21:23] | [24:26]\\nconst obciPacketPositionChannelDataStop = 25; // 24 bytes for channel data\\nconst obciPacketPositionSampleNumber = 1;\\nconst obciPacketPositionStartByte = 0; // first byte\\nconst obciPacketPositionStopByte = 32; // [32]\\nconst obciPacketPositionStartAux = 26; // [26,27]:Aux 1 | [28,29]:Aux 2 | [30,31]:Aux 3\\nconst obciPacketPositionStopAux = 31; // - - - [30,31]:Aux 3 | 32: Stop byte\\nconst obciPacketPositionTimeSyncAuxStart = 26;\\nconst obciPacketPositionTimeSyncAuxStop = 28;\\nconst obciPacketPositionTimeSyncTimeStart = 28;\\nconst obciPacketPositionTimeSyncTimeStop = 32;\\n\\n/** Notable Bytes */\\nconst obciByteStart = 0xA0;\\nconst obciByteStop = 0xC0;\\n\\n/** Errors */\\nconst errorInvalidByteLength = 'Invalid Packet Byte Length';\\nconst errorInvalidByteStart = 'Invalid Start Byte';\\nconst errorInvalidByteStop = 'Invalid Stop Byte';\\nconst errorInvalidData = 'Invalid data - try again';\\nconst errorInvalidType = 'Invalid type - check comments for input type';\\nconst errorMissingRegisterSetting = 'Missing register setting';\\nconst errorMissingRequiredProperty = 'Missing property in JSON';\\nconst errorNobleAlreadyScanning = 'Scan already under way';\\nconst errorNobleNotAlreadyScanning = 'No scan started';\\nconst errorNobleNotInPoweredOnState = 'Please turn blue tooth on.';\\nconst errorTimeSyncIsNull = \\\"'this.sync.curSyncObj' must not be null\\\";\\nconst errorTimeSyncNoComma = 'Missed the time sync sent confirmation. Try sync again';\\nconst errorUndefinedOrNullInput = 'Undefined or Null Input';\\n\\n/** Max Master Buffer Size */\\nconst obciMasterBufferSize = 4096;\\n\\n/** Impedance Calculation Variables */\\nconst obciLeadOffDriveInAmps = 0.000000006;\\nconst obciLeadOffFrequencyHz = 31.5;\\n\\n/** Command send delay */\\nconst obciWriteIntervalDelayMSLong = 50;\\nconst obciWriteIntervalDelayMSNone = 0;\\nconst obciWriteIntervalDelayMSShort = 10;\\n\\n/** Impedance */\\nconst obciImpedanceTextBad = 'bad';\\nconst obciImpedanceTextNone = 'none';\\nconst obciImpedanceTextGood = 'good';\\nconst obciImpedanceTextInit = 'init';\\nconst obciImpedanceTextOk = 'ok';\\n\\nconst obciImpedanceThresholdGoodMin = 0;\\nconst obciImpedanceThresholdGoodMax = 5000;\\nconst obciImpedanceThresholdOkMin = 5001;\\nconst obciImpedanceThresholdOkMax = 10000;\\nconst obciImpedanceThresholdBadMin = 10001;\\nconst obciImpedanceThresholdBadMax = 1000000;\\n\\nconst obciImpedanceSeriesResistor = 2200; // There is a 2.2 k Ohm series resistor that must be subtracted\\n\\n/** Simulator */\\nconst obciSimulatorPortName = 'OpenBCISimulator';\\n\\n/**\\n* Stream packet types/codes\\n*/\\nconst obciStreamPacketStandardAccel = 0; // 0000\\nconst obciStreamPacketStandardRawAux = 1; // 0001\\nconst obciStreamPacketUserDefinedType = 2; // 0010\\nconst obciStreamPacketAccelTimeSyncSet = 3; // 0011\\nconst obciStreamPacketAccelTimeSynced = 4; // 0100\\nconst obciStreamPacketRawAuxTimeSyncSet = 5; // 0101\\nconst obciStreamPacketRawAuxTimeSynced = 6; // 0110\\nconst obciStreamPacketImpedance = 7; // 0111\\n\\n/** Time from board */\\nconst obciStreamPacketTimeByteSize = 4;\\n\\n/** Time synced with accel packet */\\nconst obciAccelAxisX = 7;\\nconst obciAccelAxisY = 8;\\nconst obciAccelAxisZ = 9;\\n\\n/** Firmware version indicator */\\nconst obciFirmwareV1 = 'v1';\\nconst obciFirmwareV2 = 'v2';\\nconst obciFirmwareV3 = 'v3';\\n\\n/** Parse */\\nconst obciParseDaisy = 'Daisy';\\nconst obciParseFirmware = 'v2';\\nconst obciParseFailure = 'Failure';\\nconst obciParseEOT = '$$$';\\nconst obciParseSuccess = 'Success';\\n\\n/** Used in parsing incoming serial data */\\nconst obciParsingChannelSettings = 2;\\nconst obciParsingEOT = 4;\\nconst obciParsingNormal = 3;\\nconst obciParsingReset = 0;\\nconst obciParsingTimeSyncSent = 1;\\n\\n/** Timeouts */\\nconst obciTimeoutProcessBytes = 500; // 0.5 seconds\\n\\n/** Simulator Board Configurations */\\nconst obciSimulatorRawAux = 'rawAux';\\nconst obciSimulatorStandard = 'standard';\\n\\n/** OpenBCI Radio Limits */\\nconst obciRadioChannelMax = 25;\\nconst obciRadioChannelMin = 1;\\nconst obciRadioPollTimeMax = 255;\\nconst obciRadioPollTimeMin = 0;\\n\\n/** Time sync stuff */\\nconst obciTimeSyncArraySize = 10;\\nconst obciTimeSyncMultiplierWithSyncConf = 0.9;\\nconst obciTimeSyncMultiplierWithoutSyncConf = 0.75;\\nconst obciTimeSyncThresholdTransFailureMS = 10; // ms\\n\\n/** Baud Rates */\\nconst obciRadioBaudRateDefault = 115200;\\nconst obciRadioBaudRateDefaultStr = 'default';\\nconst obciRadioBaudRateFast = 230400;\\nconst obciRadioBaudRateFastStr = 'fast';\\n\\n/** Emitters */\\nconst obciEmitterAccelerometer = 'accelerometer';\\nconst obciEmitterBlePoweredUp = 'blePoweredOn';\\nconst obciEmitterClose = 'close';\\nconst obciEmitterDroppedPacket = 'droppedPacket';\\nconst obciEmitterEot = 'eot';\\nconst obciEmitterError = 'error';\\nconst obciEmitterGanglionFound = 'ganglionFound';\\nconst obciEmitterHardSet = 'hardSet';\\nconst obciEmitterImpedance = 'impedance';\\nconst obciEmitterImpedanceArray = 'impedanceArray';\\nconst obciEmitterMessage = 'message';\\nconst obciEmitterQuery = 'query';\\nconst obciEmitterRawDataPacket = 'rawDataPacket';\\nconst obciEmitterReady = 'ready';\\nconst obciEmitterRFduino = 'rfduino';\\nconst obciEmitterSample = 'sample';\\nconst obciEmitterScanStopped = 'scanStopped';\\nconst obciEmitterSynced = 'synced';\\nconst obciEmitterWifiShield = 'wifiShield';\\n\\n/** Accel packets */\\nconst obciGanglionAccelAxisX = 1;\\nconst obciGanglionAccelAxisY = 2;\\nconst obciGanglionAccelAxisZ = 3;\\n\\n/** Accel scale factor */\\nconst obciGanglionAccelScaleFactor = 0.016; // mG per count\\n\\n/** Ganglion */\\nconst obciGanglionBleSearchTime = 20000; // ms\\nconst obciGanglionByteIdUncompressed = 0;\\nconst obciGanglionByteId18Bit = {\\n  max: 100,\\n  min: 1\\n};\\nconst obciGanglionByteId19Bit = {\\n  max: 200,\\n  min: 101\\n};\\nconst obciGanglionByteIdImpedanceChannel1 = 201;\\nconst obciGanglionByteIdImpedanceChannel2 = 202;\\nconst obciGanglionByteIdImpedanceChannel3 = 203;\\nconst obciGanglionByteIdImpedanceChannel4 = 204;\\nconst obciGanglionByteIdImpedanceChannelReference = 205;\\nconst obciGanglionByteIdMultiPacket = 206;\\nconst obciGanglionByteIdMultiPacketStop = 207;\\nconst obciGanglionPacketSize = 20;\\nconst obciGanglionSamplesPerPacket = 2;\\nconst obciGanglionPacket18Bit = {\\n  auxByte: 20,\\n  byteId: 0,\\n  dataStart: 1,\\n  dataStop: 19\\n};\\nconst obciGanglionPacket19Bit = {\\n  byteId: 0,\\n  dataStart: 1,\\n  dataStop: 20\\n};\\nconst obciGanglionMCP3912Gain = 51.0; // assumed gain setting for MCP3912.  NEEDS TO BE ADJUSTABLE JM\\nconst obciGanglionMCP3912Vref = 1.2; // reference voltage for ADC in MCP3912 set in hardware\\nconst obciGanglionPrefix = 'Ganglion';\\nconst obciGanglionSyntheticDataEnable = 't';\\nconst obciGanglionSyntheticDataDisable = 'T';\\nconst obciGanglionImpedanceStart = 'z';\\nconst obciGanglionImpedanceStop = 'Z';\\nconst obciGanglionScaleFactorPerCountVolts = obciGanglionMCP3912Vref / (8388607.0 * obciGanglionMCP3912Gain * 1.5);\\n\\n/** Simblee */\\nconst simbleeUuidService = 'fe84';\\nconst simbleeUuidReceive = '2d30c082f39f4ce6923f3484ea480596';\\nconst simbleeUuidSend = '2d30c083f39f4ce6923f3484ea480596';\\nconst simbleeUuidDisconnect = '2d30c084f39f4ce6923f3484ea480596';\\n\\n/** RFduino BLE UUID */\\nconst rfduinoUuidService = '2220';\\nconst rfduinoUuidReceive = '2221';\\nconst rfduinoUuidSend = '2222';\\nconst rfduinoUuidSendTwo = '2223';\\n\\n/** Cyton BLE */\\nconst obciCytonBLESamplesPerPacket = 3;\\n\\n/** Noble */\\nconst obciNobleEmitterPeripheralConnect = 'connect';\\nconst obciNobleEmitterPeripheralDisconnect = 'disconnect';\\nconst obciNobleEmitterPeripheralDiscover = 'discover';\\nconst obciNobleEmitterPeripheralServicesDiscover = 'servicesDiscover';\\nconst obciNobleEmitterServiceCharacteristicsDiscover = 'characteristicsDiscover';\\nconst obciNobleEmitterServiceRead = 'read';\\nconst obciNobleEmitterDiscover = 'discover';\\nconst obciNobleEmitterScanStart = 'scanStart';\\nconst obciNobleEmitterScanStop = 'scanStop';\\nconst obciNobleEmitterStateChange = 'stateChange';\\nconst obciNobleStatePoweredOn = 'poweredOn';\\n\\n/** Protocols */\\nconst obciProtocolBLE = 'ble';\\nconst obciProtocolSerial = 'serial';\\nconst obciProtocolWifi = 'wifi';\\n\\n/** Register Query on Cyton */\\nconst obciRegisterQueryAccelerometerFirmwareV1 = '\\\\nLIS3DH Registers\\\\n0x07.0\\\\n0x08.0\\\\n0x09.0\\\\n0x0A.0\\\\n0x0B.0\\\\n0x0C.0\\\\n0x0D.0\\\\n0x0E.0\\\\n0x0F.33\\\\n\\\\n0x1F.0\\\\n0x20.8\\\\n0x21.0\\\\n0x22.0\\\\n0x23.18\\\\n0x24.0\\\\n0x25.0\\\\n0x26.0\\\\n0x27.0\\\\n0x28.0\\\\n0x29.0\\\\n0x2A.0\\\\n0x2B.0\\\\n0x2C.0\\\\n0x2D.0\\\\n0x2E.0\\\\n0x2F.20\\\\n0x30.0\\\\n0x31.0\\\\n0x32.0\\\\n0x33.0\\\\n\\\\n0x38.0\\\\n0x39.0\\\\n0x3A.0\\\\n0x3B.0\\\\n0x3C.0\\\\n0x3D.0\\\\n';\\nconst obciRegisterQueryAccelerometerFirmwareV3 = '\\\\nLIS3DH Registers\\\\n0x07 00\\\\n0x08 00\\\\n0x09 00\\\\n0x0A 00\\\\n0x0B 00\\\\n0x0C 00\\\\n0x0D 00\\\\n0x0E 00\\\\n0x0F 33\\\\n\\\\n0x1F 00\\\\n0x20 08\\\\n0x21 00\\\\n0x22 00\\\\n0x23 18\\\\n0x24 00\\\\n0x25 00\\\\n0x26 00\\\\n0x27 00\\\\n0x28 00\\\\n0x29 00\\\\n0x2A 00\\\\n0x2B 00\\\\n0x2C 00\\\\n0x2D 00\\\\n0x2E 00\\\\n0x2F 20\\\\n0x30 00\\\\n0x31 00\\\\n0x32 00\\\\n0x33 00\\\\n\\\\n0x38 00\\\\n0x39 00\\\\n0x3A 00\\\\n0x3B 00\\\\n0x3C 00\\\\n0x3D 00\\\\n';\\nconst obciRegisterQueryCyton = '\\\\nBoard ADS Registers\\\\nADS_ID, 00, 3E, 0, 0, 1, 1, 1, 1, 1, 0\\\\nCONFIG1, 01, 96, 1, 0, 0, 1, 0, 1, 1, 0\\\\nCONFIG2, 02, C0, 1, 1, 0, 0, 0, 0, 0, 0\\\\nCONFIG3, 03, EC, 1, 1, 1, 0, 1, 1, 0, 0\\\\nLOFF, 04, 02, 0, 0, 0, 0, 0, 0, 1, 0\\\\nCH1SET, 05, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH2SET, 06, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH3SET, 07, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH4SET, 08, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH5SET, 09, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH6SET, 0A, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH7SET, 0B, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH8SET, 0C, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nBIAS_SENSP, 0D, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nBIAS_SENSN, 0E, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nLOFF_SENSP, 0F, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_SENSN, 10, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_FLIP, 11, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATP, 12, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATN, 13, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nGPIO, 14, 0F, 0, 0, 0, 0, 1, 1, 1, 1\\\\nMISC1, 15, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nMISC2, 16, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nCONFIG4, 17, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\n';\\nconst obciRegisterQueryCytonDaisy = '\\\\nDaisy ADS Registers\\\\nADS_ID, 00, 3E, 0, 0, 1, 1, 1, 1, 1, 0\\\\nCONFIG1, 01, 96, 1, 0, 0, 1, 0, 1, 1, 0\\\\nCONFIG2, 02, C0, 1, 1, 0, 0, 0, 0, 0, 0\\\\nCONFIG3, 03, EC, 1, 1, 1, 0, 1, 1, 0, 0\\\\nLOFF, 04, 02, 0, 0, 0, 0, 0, 0, 1, 0\\\\nCH1SET, 05, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH2SET, 06, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH3SET, 07, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH4SET, 08, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH5SET, 09, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH6SET, 0A, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH7SET, 0B, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH8SET, 0C, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nBIAS_SENSP, 0D, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nBIAS_SENSN, 0E, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nLOFF_SENSP, 0F, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_SENSN, 10, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_FLIP, 11, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATP, 12, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATN, 13, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nGPIO, 14, 0F, 0, 0, 0, 0, 1, 1, 1, 1\\\\nMISC1, 15, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nMISC2, 16, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nCONFIG4, 17, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\n';\\nconst obciRegisterQueryNameMISC1 = 'MISC1';\\nconst obciRegisterQueryNameBIASSENSP = 'BIAS_SENSP';\\nconst obciRegisterQueryNameCHnSET = ['CH1SET', 'CH2SET', 'CH3SET', 'CH4SET', 'CH5SET', 'CH6SET', 'CH7SET', 'CH8SET'];\\nconst obciRegisterQuerySizeCytonFirmwareV1 = obciRegisterQueryCyton.length + obciRegisterQueryAccelerometerFirmwareV1.length;\\nconst obciRegisterQuerySizeCytonDaisyFirmwareV1 = obciRegisterQueryCyton.length + obciRegisterQueryCytonDaisy.length + obciRegisterQueryAccelerometerFirmwareV1.length;\\nconst obciRegisterQuerySizeCytonFirmwareV3 = obciRegisterQueryCyton.length + obciRegisterQueryAccelerometerFirmwareV3.length;\\nconst obciRegisterQuerySizeCytonDaisyFirmwareV3 = obciRegisterQueryCyton.length + obciRegisterQueryCytonDaisy.length + obciRegisterQueryAccelerometerFirmwareV3.length;\\n\\nconst constantsModule = {\\n  /** Turning channels off */\\n  OBCIChannelOff1: obciChannelOff1,\\n  OBCIChannelOff2: obciChannelOff2,\\n  OBCIChannelOff3: obciChannelOff3,\\n  OBCIChannelOff4: obciChannelOff4,\\n  OBCIChannelOff5: obciChannelOff5,\\n  OBCIChannelOff6: obciChannelOff6,\\n  OBCIChannelOff7: obciChannelOff7,\\n  OBCIChannelOff8: obciChannelOff8,\\n  OBCIChannelOff9: obciChannelOff9,\\n  OBCIChannelOff10: obciChannelOff10,\\n  OBCIChannelOff11: obciChannelOff11,\\n  OBCIChannelOff12: obciChannelOff12,\\n  OBCIChannelOff13: obciChannelOff13,\\n  OBCIChannelOff14: obciChannelOff14,\\n  OBCIChannelOff15: obciChannelOff15,\\n  OBCIChannelOff16: obciChannelOff16,\\n  /**\\n  * Purpose: To get the proper command to turn a channel off\\n  * @param channelNumber - A number (1-16) of the desired channel\\n  * @returns {Promise}\\n  */\\n  commandChannelOff: function (channelNumber) {\\n    return new Promise(function (resolve, reject) {\\n      switch (channelNumber) {\\n        case 1:\\n          resolve(obciChannelOff1);\\n          break;\\n        case 2:\\n          resolve(obciChannelOff2);\\n          break;\\n        case 3:\\n          resolve(obciChannelOff3);\\n          break;\\n        case 4:\\n          resolve(obciChannelOff4);\\n          break;\\n        case 5:\\n          resolve(obciChannelOff5);\\n          break;\\n        case 6:\\n          resolve(obciChannelOff6);\\n          break;\\n        case 7:\\n          resolve(obciChannelOff7);\\n          break;\\n        case 8:\\n          resolve(obciChannelOff8);\\n          break;\\n        case 9:\\n          resolve(obciChannelOff9);\\n          break;\\n        case 10:\\n          resolve(obciChannelOff10);\\n          break;\\n        case 11:\\n          resolve(obciChannelOff11);\\n          break;\\n        case 12:\\n          resolve(obciChannelOff12);\\n          break;\\n        case 13:\\n          resolve(obciChannelOff13);\\n          break;\\n        case 14:\\n          resolve(obciChannelOff14);\\n          break;\\n        case 15:\\n          resolve(obciChannelOff15);\\n          break;\\n        case 16:\\n          resolve(obciChannelOff16);\\n          break;\\n        default:\\n          reject(Error('Error [commandChannelOff]: Invalid Channel Number'));\\n          break;\\n      }\\n    });\\n  },\\n  /** Turning channels on */\\n  OBCIChannelOn1: obciChannelOn1,\\n  OBCIChannelOn2: obciChannelOn2,\\n  OBCIChannelOn3: obciChannelOn3,\\n  OBCIChannelOn4: obciChannelOn4,\\n  OBCIChannelOn5: obciChannelOn5,\\n  OBCIChannelOn6: obciChannelOn6,\\n  OBCIChannelOn7: obciChannelOn7,\\n  OBCIChannelOn8: obciChannelOn8,\\n  OBCIChannelOn9: obciChannelOn9,\\n  OBCIChannelOn10: obciChannelOn10,\\n  OBCIChannelOn11: obciChannelOn11,\\n  OBCIChannelOn12: obciChannelOn12,\\n  OBCIChannelOn13: obciChannelOn13,\\n  OBCIChannelOn14: obciChannelOn14,\\n  OBCIChannelOn15: obciChannelOn15,\\n  OBCIChannelOn16: obciChannelOn16,\\n  commandChannelOn: function (channelNumber) {\\n    return new Promise(function (resolve, reject) {\\n      switch (channelNumber) {\\n        case 1:\\n          resolve(obciChannelOn1);\\n          break;\\n        case 2:\\n          resolve(obciChannelOn2);\\n          break;\\n        case 3:\\n          resolve(obciChannelOn3);\\n          break;\\n        case 4:\\n          resolve(obciChannelOn4);\\n          break;\\n        case 5:\\n          resolve(obciChannelOn5);\\n          break;\\n        case 6:\\n          resolve(obciChannelOn6);\\n          break;\\n        case 7:\\n          resolve(obciChannelOn7);\\n          break;\\n        case 8:\\n          resolve(obciChannelOn8);\\n          break;\\n        case 9:\\n          resolve(obciChannelOn9);\\n          break;\\n        case 10:\\n          resolve(obciChannelOn10);\\n          break;\\n        case 11:\\n          resolve(obciChannelOn11);\\n          break;\\n        case 12:\\n          resolve(obciChannelOn12);\\n          break;\\n        case 13:\\n          resolve(obciChannelOn13);\\n          break;\\n        case 14:\\n          resolve(obciChannelOn14);\\n          break;\\n        case 15:\\n          resolve(obciChannelOn15);\\n          break;\\n        case 16:\\n          resolve(obciChannelOn16);\\n          break;\\n        default:\\n          reject(Error('Error [commandChannelOn]: Invalid Channel Number'));\\n          break;\\n      }\\n    });\\n  },\\n  /** Test Signal Control Commands */\\n  OBCITestSignalConnectToDC: obciTestSignalConnectToDC,\\n  OBCITestSignalConnectToGround: obciTestSignalConnectToGround,\\n  OBCITestSignalConnectToPulse1xFast: obciTestSignalConnectToPulse1xFast,\\n  OBCITestSignalConnectToPulse1xSlow: obciTestSignalConnectToPulse1xSlow,\\n  OBCITestSignalConnectToPulse2xFast: obciTestSignalConnectToPulse2xFast,\\n  OBCITestSignalConnectToPulse2xSlow: obciTestSignalConnectToPulse2xSlow,\\n  getTestSignalCommand: signal => {\\n    return new Promise((resolve, reject) => {\\n      switch (signal) {\\n        case 'dc':\\n          resolve(obciTestSignalConnectToDC);\\n          break;\\n        case 'ground':\\n          resolve(obciTestSignalConnectToGround);\\n          break;\\n        case 'pulse1xFast':\\n          resolve(obciTestSignalConnectToPulse1xFast);\\n          break;\\n        case 'pulse1xSlow':\\n          resolve(obciTestSignalConnectToPulse1xSlow);\\n          break;\\n        case 'pulse2xFast':\\n          resolve(obciTestSignalConnectToPulse2xFast);\\n          break;\\n        case 'pulse2xSlow':\\n          resolve(obciTestSignalConnectToPulse2xSlow);\\n          break;\\n        case 'none':\\n          resolve(obciChannelDefaultAllSet);\\n          break;\\n        default:\\n          reject(Error('Invalid selection! Check your spelling.'));\\n          break;\\n      }\\n    });\\n  },\\n  /** Channel Setting Commands */\\n  OBCIChannelCmdADCNormal: obciChannelCmdADCNormal,\\n  OBCIChannelCmdADCShorted: obciChannelCmdADCShorted,\\n  OBCIChannelCmdADCBiasDRP: obciChannelCmdADCBiasDRP,\\n  OBCIChannelCmdADCBiasDRN: obciChannelCmdADCBiasDRN,\\n  OBCIChannelCmdADCBiasMethod: obciChannelCmdADCBiasMethod,\\n  OBCIChannelCmdADCMVDD: obciChannelCmdADCMVDD,\\n  OBCIChannelCmdADCTemp: obciChannelCmdADCTemp,\\n  OBCIChannelCmdADCTestSig: obciChannelCmdADCTestSig,\\n  OBCIChannelCmdBiasInclude: obciChannelCmdBiasInclude,\\n  OBCIChannelCmdBiasRemove: obciChannelCmdBiasRemove,\\n  OBCIChannelCmdChannel1: obciChannelCmdChannel1,\\n  OBCIChannelCmdChannel2: obciChannelCmdChannel2,\\n  OBCIChannelCmdChannel3: obciChannelCmdChannel3,\\n  OBCIChannelCmdChannel4: obciChannelCmdChannel4,\\n  OBCIChannelCmdChannel5: obciChannelCmdChannel5,\\n  OBCIChannelCmdChannel6: obciChannelCmdChannel6,\\n  OBCIChannelCmdChannel7: obciChannelCmdChannel7,\\n  OBCIChannelCmdChannel8: obciChannelCmdChannel8,\\n  OBCIChannelCmdChannel9: obciChannelCmdChannel9,\\n  OBCIChannelCmdChannel10: obciChannelCmdChannel10,\\n  OBCIChannelCmdChannel11: obciChannelCmdChannel11,\\n  OBCIChannelCmdChannel12: obciChannelCmdChannel12,\\n  OBCIChannelCmdChannel13: obciChannelCmdChannel13,\\n  OBCIChannelCmdChannel14: obciChannelCmdChannel14,\\n  OBCIChannelCmdChannel15: obciChannelCmdChannel15,\\n  OBCIChannelCmdChannel16: obciChannelCmdChannel16,\\n  commandChannelForCmd,\\n  OBCIChannelCmdGain1: obciChannelCmdGain1,\\n  OBCIChannelCmdGain2: obciChannelCmdGain2,\\n  OBCIChannelCmdGain4: obciChannelCmdGain4,\\n  OBCIChannelCmdGain6: obciChannelCmdGain6,\\n  OBCIChannelCmdGain8: obciChannelCmdGain8,\\n  OBCIChannelCmdGain12: obciChannelCmdGain12,\\n  OBCIChannelCmdGain24: obciChannelCmdGain24,\\n  commandForGain,\\n  gainForCommand,\\n  OBCIChannelCmdLatch: obciChannelCmdLatch,\\n  OBCIChannelCmdPowerOff: obciChannelCmdPowerOff,\\n  OBCIChannelCmdPowerOn: obciChannelCmdPowerOn,\\n  OBCIChannelCmdSet: obciChannelCmdSet,\\n  OBCIChannelCmdSRB1Connect: obciChannelCmdSRB1Connect,\\n  OBCIChannelCmdSRB1Diconnect: obciChannelCmdSRB1Diconnect,\\n  OBCIChannelCmdSRB2Connect: obciChannelCmdSRB2Connect,\\n  OBCIChannelCmdSRB2Diconnect: obciChannelCmdSRB2Diconnect,\\n  /** Channel Settings Object */\\n  channelSettingsObjectDefault,\\n  /**\\n   * @param numberOfChannels {Number}\\n   * @returns {Array}\\n   */\\n  channelSettingsArrayInit: numberOfChannels => {\\n    var newChannelSettingsArray = [];\\n    for (var i = 0; i < numberOfChannels; i++) {\\n      newChannelSettingsArray.push(channelSettingsObjectDefault(i));\\n    }\\n    return newChannelSettingsArray;\\n  },\\n  /** Channel Setting Helper Strings */\\n  OBCIStringADCNormal: obciStringADCNormal,\\n  OBCIStringADCShorted: obciStringADCShorted,\\n  OBCIStringADCBiasMethod: obciStringADCBiasMethod,\\n  OBCIStringADCMvdd: obciStringADCMvdd,\\n  OBCIStringADCTemp: obciStringADCTemp,\\n  OBCIStringADCTestSig: obciStringADCTestSig,\\n  OBCIStringADCBiasDrp: obciStringADCBiasDrp,\\n  OBCIStringADCBiasDrn: obciStringADCBiasDrn,\\n  /**\\n  * @description To convert a string like 'normal' to the correct command (i.e. '1')\\n  * @param adcString\\n  * @returns {Promise}\\n  * @author AJ Keller (@pushtheworldllc)\\n  */\\n  commandForADCString,\\n  inputTypeForCommand,\\n  /** Default Channel Settings */\\n  OBCIChannelDefaultAllSet: obciChannelDefaultAllSet,\\n  OBCIChannelDefaultAllGet: obciChannelDefaultAllGet,\\n  /** LeadOff Impedance Commands */\\n  OBCIChannelImpedanceLatch: obciChannelImpedanceLatch,\\n  OBCIChannelImpedanceSet: obciChannelImpedanceSet,\\n  OBCIChannelImpedanceTestSignalApplied: obciChannelImpedanceTestSignalApplied,\\n  OBCIChannelImpedanceTestSignalAppliedNot: obciChannelImpedanceTestSignalAppliedNot,\\n  /** SD card Commands */\\n  OBCISDLogForHour1: obciSDLogForHour1,\\n  OBCISDLogForHour2: obciSDLogForHour2,\\n  OBCISDLogForHour4: obciSDLogForHour4,\\n  OBCISDLogForHour12: obciSDLogForHour12,\\n  OBCISDLogForHour24: obciSDLogForHour24,\\n  OBCISDLogForMin5: obciSDLogForMin5,\\n  OBCISDLogForMin15: obciSDLogForMin15,\\n  OBCISDLogForMin30: obciSDLogForMin30,\\n  OBCISDLogForSec14: obciSDLogForSec14,\\n  OBCISDLogStop: obciSDLogStop,\\n  /** SD Card String Commands */\\n  OBCIStringSDHour1: obciStringSDHour1,\\n  OBCIStringSDHour2: obciStringSDHour2,\\n  OBCIStringSDHour4: obciStringSDHour4,\\n  OBCIStringSDHour12: obciStringSDHour12,\\n  OBCIStringSDHour24: obciStringSDHour24,\\n  OBCIStringSDMin5: obciStringSDMin5,\\n  OBCIStringSDMin15: obciStringSDMin15,\\n  OBCIStringSDMin30: obciStringSDMin30,\\n  OBCIStringSDSec14: obciStringSDSec14,\\n  /**\\n  * @description Converts a sd string into the proper setting.\\n  * @param stringCommand {String} - The length of time you want to record to the SD for.\\n  * @returns {Promise} The command to send to the Board, returns an error on improper `stringCommand`\\n  */\\n  sdSettingForString: stringCommand => {\\n    return new Promise((resolve, reject) => {\\n      switch (stringCommand) {\\n        case obciStringSDHour1:\\n          resolve(obciSDLogForHour1);\\n          break;\\n        case obciStringSDHour2:\\n          resolve(obciSDLogForHour2);\\n          break;\\n        case obciStringSDHour4:\\n          resolve(obciSDLogForHour4);\\n          break;\\n        case obciStringSDHour12:\\n          resolve(obciSDLogForHour12);\\n          break;\\n        case obciStringSDHour24:\\n          resolve(obciSDLogForHour24);\\n          break;\\n        case obciStringSDMin5:\\n          resolve(obciSDLogForMin5);\\n          break;\\n        case obciStringSDMin15:\\n          resolve(obciSDLogForMin15);\\n          break;\\n        case obciStringSDMin30:\\n          resolve(obciSDLogForMin30);\\n          break;\\n        case obciStringSDSec14:\\n          resolve(obciSDLogForSec14);\\n          break;\\n        default:\\n          reject(Error(TypeError));\\n          break;\\n      }\\n    });\\n  },\\n  /** Stream Data Commands */\\n  OBCIStreamStart: obciStreamStart,\\n  OBCIStreamStop: obciStreamStop,\\n  /** Accel enable/disable commands */\\n  OBCIAccelStart: obciAccelStart,\\n  OBCIAccelStop: obciAccelStop,\\n  /** Miscellaneous */\\n  OBCIMiscQueryRegisterSettings: obciMiscQueryRegisterSettings,\\n  OBCIMiscQueryRegisterSettingsChannel1: obciMiscQueryRegisterSettingsChannel1,\\n  OBCIMiscQueryRegisterSettingsChannel2: obciMiscQueryRegisterSettingsChannel2,\\n  OBCIMiscQueryRegisterSettingsChannel3: obciMiscQueryRegisterSettingsChannel3,\\n  OBCIMiscQueryRegisterSettingsChannel4: obciMiscQueryRegisterSettingsChannel4,\\n  OBCIMiscQueryRegisterSettingsChannel5: obciMiscQueryRegisterSettingsChannel5,\\n  OBCIMiscQueryRegisterSettingsChannel6: obciMiscQueryRegisterSettingsChannel6,\\n  OBCIMiscQueryRegisterSettingsChannel7: obciMiscQueryRegisterSettingsChannel7,\\n  OBCIMiscQueryRegisterSettingsChannel8: obciMiscQueryRegisterSettingsChannel8,\\n  channelSettingsKeyForChannel: channelNumber => {\\n    return new Promise((resolve, reject) => {\\n      switch (channelNumber) {\\n        case 1:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel1));\\n          break;\\n        case 2:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel2));\\n          break;\\n        case 3:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel3));\\n          break;\\n        case 4:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel4));\\n          break;\\n        case 5:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel5));\\n          break;\\n        case 6:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel6));\\n          break;\\n        case 7:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel7));\\n          break;\\n        case 8:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel8));\\n          break;\\n        default:\\n          reject(Error('Invalid channel number'));\\n          break;\\n      }\\n    });\\n  },\\n  OBCIMiscSoftReset: obciMiscSoftReset,\\n  /** 16 Channel Commands */\\n  OBCIChannelMaxNumber8: obciChannelMaxNumber8,\\n  OBCIChannelMaxNumber16: obciChannelMaxNumber16,\\n  OBCIChannelMaxNumber8NoDaisyToRemove: obciChannelMaxNumber8NoDaisyToRemove,\\n  OBCIChannelMaxNumber8SuccessDaisyRemoved: obciChannelMaxNumber8SuccessDaisyRemoved,\\n  OBCIChannelMaxNumber16DaisyAlreadyAttached: obciChannelMaxNumber16DaisyAlreadyAttached,\\n  OBCIChannelMaxNumber16DaisyAttached: obciChannelMaxNumber16DaisyAttached,\\n  OBCIChannelMaxNumber16NoDaisyAttached: obciChannelMaxNumber16NoDaisyAttached,\\n  /** Filters */\\n  OBCIFilterDisable: obciFilterDisable,\\n  OBCIFilterEnable: obciFilterEnable,\\n  /** Triggers */\\n  OBCITrigger: obciTrigger,\\n  /** Possible number of channels */\\n  OBCINumberOfChannelsCyton: obciNumberOfChannelsCyton,\\n  OBCINumberOfChannelsCytonBLE: obciNumberOfChannelsCytonBLE,\\n  OBCINumberOfChannelsDaisy: obciNumberOfChannelsDaisy,\\n  OBCINumberOfChannelsDefault: obciNumberOfChannelsDefault,\\n  OBCINumberOfChannelsGanglion: obciNumberOfChannelsGanglion,\\n  /** Possible OpenBCI board types */\\n  OBCIBoardCyton: obciBoardCyton,\\n  OBCIBoardCytonBLE: obciBoardCytonBLE,\\n  OBCIBoardDaisy: obciBoardDaisy,\\n  OBCIBoardDefault: obciBoardDefault,\\n  OBCIBoardGanglion: obciBoardGanglion,\\n  OBCIBoardNone: obciBoardNone,\\n  numberOfChannelsForBoardType: boardType => {\\n    switch (boardType) {\\n      case obciBoardDaisy:\\n        return obciNumberOfChannelsDaisy;\\n      case obciBoardGanglion:\\n        return obciNumberOfChannelsGanglion;\\n      case obciBoardNone:\\n        return 0;\\n      case obciBoardCytonBLE:\\n        return obciNumberOfChannelsCytonBLE;\\n      case obciBoardCyton:\\n      default:\\n        return obciNumberOfChannelsDefault;\\n    }\\n  },\\n  boardTypeForNumberOfChannels: numberOfChannels => {\\n    switch (numberOfChannels) {\\n      case obciNumberOfChannelsDaisy:\\n        return obciBoardDaisy;\\n      case obciNumberOfChannelsGanglion:\\n        return obciBoardGanglion;\\n      case 0:\\n        return obciBoardNone;\\n      case obciNumberOfChannelsCytonBLE:\\n        return obciBoardCytonBLE;\\n      case obciNumberOfChannelsDefault:\\n      default:\\n        return obciBoardCyton;\\n    }\\n  },\\n  /** Possible Sample Rates */\\n  OBCISampleRate1000: obciSampleRate1000,\\n  OBCISampleRate125: obciSampleRate125,\\n  OBCISampleRate12800: obciSampleRate12800,\\n  OBCISampleRate1600: obciSampleRate1600,\\n  OBCISampleRate16000: obciSampleRate16000,\\n  OBCISampleRate200: obciSampleRate200,\\n  OBCISampleRate2000: obciSampleRate2000,\\n  OBCISampleRate250: obciSampleRate250,\\n  OBCISampleRate25600: obciSampleRate25600,\\n  OBCISampleRate3200: obciSampleRate3200,\\n  OBCISampleRate400: obciSampleRate400,\\n  OBCISampleRate4000: obciSampleRate4000,\\n  OBCISampleRate500: obciSampleRate500,\\n  OBCISampleRate6400: obciSampleRate6400,\\n  OBCISampleRate800: obciSampleRate800,\\n  OBCISampleRate8000: obciSampleRate8000,\\n  /** Max sample number */\\n  OBCISampleNumberMax: obciSampleNumberMax,\\n  /** Packet Size */\\n  OBCIPacketSize: obciPacketSize,\\n  OBCIPacketSizeBLECyton: obciPacketSizeBLECyton,\\n  OBCIPacketSizeBLERaw: obciPacketSizeBLERaw,\\n  /** Notable Bytes */\\n  OBCIByteStart: obciByteStart,\\n  OBCIByteStop: obciByteStop,\\n  /** Errors */\\n  OBCIErrorInvalidByteLength: errorInvalidByteLength,\\n  OBCIErrorInvalidByteStart: errorInvalidByteStart,\\n  OBCIErrorInvalidByteStop: errorInvalidByteStop,\\n  OBCIErrorInvalidData: errorInvalidData,\\n  OBCIErrorInvalidType: errorInvalidType,\\n  OBCIErrorMissingRegisterSetting: errorMissingRegisterSetting,\\n  OBCIErrorMissingRequiredProperty: errorMissingRequiredProperty,\\n  OBCIErrorNobleAlreadyScanning: errorNobleAlreadyScanning,\\n  OBCIErrorNobleNotAlreadyScanning: errorNobleNotAlreadyScanning,\\n  OBCIErrorNobleNotInPoweredOnState: errorNobleNotInPoweredOnState,\\n  OBCIErrorTimeSyncIsNull: errorTimeSyncIsNull,\\n  OBCIErrorTimeSyncNoComma: errorTimeSyncNoComma,\\n  OBCIErrorUndefinedOrNullInput: errorUndefinedOrNullInput,\\n  /** Max Master Buffer Size */\\n  OBCIMasterBufferSize: obciMasterBufferSize,\\n  /** Impedance Calculation Variables */\\n  OBCILeadOffDriveInAmps: obciLeadOffDriveInAmps,\\n  OBCILeadOffFrequencyHz: obciLeadOffFrequencyHz,\\n  /** Channel Setter Maker */\\n  getChannelSetter: channelSetter,\\n  /** Impedance Setter Maker */\\n  getImpedanceSetter: impedanceSetter,\\n  /** Sample Rate Setter Maker */\\n  getSampleRateSetter: sampleRateSetter,\\n  /** Board Mode Setter Maker */\\n  getBoardModeSetter: boardModeSetter,\\n  /** Command send delay */\\n  OBCIWriteIntervalDelayMSLong: obciWriteIntervalDelayMSLong,\\n  OBCIWriteIntervalDelayMSNone: obciWriteIntervalDelayMSNone,\\n  OBCIWriteIntervalDelayMSShort: obciWriteIntervalDelayMSShort,\\n  /** Sync Clocks */\\n  OBCISyncTimeSent: obciSyncTimeSent,\\n  OBCISyncTimeSet: obciSyncTimeSet,\\n  /** Radio Key */\\n  OBCIRadioKey: obciRadioKey,\\n  /** Radio Commands */\\n  OBCIRadioCmdChannelGet: obciRadioCmdChannelGet,\\n  OBCIRadioCmdChannelSet: obciRadioCmdChannelSet,\\n  OBCIRadioCmdChannelSetOverride: obciRadioCmdChannelSetOverride,\\n  OBCIRadioCmdPollTimeGet: obciRadioCmdPollTimeGet,\\n  OBCIRadioCmdPollTimeSet: obciRadioCmdPollTimeSet,\\n  OBCIRadioCmdBaudRateSetDefault: obciRadioCmdBaudRateSetDefault,\\n  OBCIRadioCmdBaudRateSetFast: obciRadioCmdBaudRateSetFast,\\n  OBCIRadioCmdSystemStatus: obciRadioCmdSystemStatus,\\n  /** Impedance */\\n  OBCIImpedanceTextBad: obciImpedanceTextBad,\\n  OBCIImpedanceTextGood: obciImpedanceTextGood,\\n  OBCIImpedanceTextInit: obciImpedanceTextInit,\\n  OBCIImpedanceTextOk: obciImpedanceTextOk,\\n  OBCIImpedanceTextNone: obciImpedanceTextNone,\\n  OBCIImpedanceThresholdBadMax: obciImpedanceThresholdBadMax,\\n  OBCIImpedanceSeriesResistor: obciImpedanceSeriesResistor,\\n  getTextForRawImpedance: value => {\\n    if (value > obciImpedanceThresholdGoodMin && value < obciImpedanceThresholdGoodMax) {\\n      return obciImpedanceTextGood;\\n    } else if (value > obciImpedanceThresholdOkMin && value < obciImpedanceThresholdOkMax) {\\n      return obciImpedanceTextOk;\\n    } else if (value > obciImpedanceThresholdBadMin && value < obciImpedanceThresholdBadMax) {\\n      return obciImpedanceTextBad;\\n    } else {\\n      return obciImpedanceTextNone;\\n    }\\n  },\\n  /** Simulator */\\n  OBCISimulatorPortName: obciSimulatorPortName,\\n  /**\\n  * Stream packet types/codes\\n  */\\n  OBCIStreamPacketStandardAccel: obciStreamPacketStandardAccel,\\n  OBCIStreamPacketStandardRawAux: obciStreamPacketStandardRawAux,\\n  OBCIStreamPacketUserDefinedType: obciStreamPacketUserDefinedType,\\n  OBCIStreamPacketAccelTimeSyncSet: obciStreamPacketAccelTimeSyncSet,\\n  OBCIStreamPacketAccelTimeSynced: obciStreamPacketAccelTimeSynced,\\n  OBCIStreamPacketRawAuxTimeSyncSet: obciStreamPacketRawAuxTimeSyncSet,\\n  OBCIStreamPacketRawAuxTimeSynced: obciStreamPacketRawAuxTimeSynced,\\n  OBCIStreamPacketImpedance: obciStreamPacketImpedance,\\n  /** fun funcs */\\n  isNumber,\\n  isBoolean,\\n  isString,\\n  isUndefined,\\n  isNull,\\n  /** OpenBCI V3 Standard Packet Positions */\\n  OBCIPacketPositionStartByte: obciPacketPositionStartByte,\\n  OBCIPacketPositionStopByte: obciPacketPositionStopByte,\\n  OBCIPacketPositionStartAux: obciPacketPositionStartAux,\\n  OBCIPacketPositionStopAux: obciPacketPositionStopAux,\\n  OBCIPacketPositionChannelDataStart: obciPacketPositionChannelDataStart,\\n  OBCIPacketPositionChannelDataStop: obciPacketPositionChannelDataStop,\\n  OBCIPacketPositionSampleNumber: obciPacketPositionSampleNumber,\\n  OBCIPacketPositionTimeSyncAuxStart: obciPacketPositionTimeSyncAuxStart,\\n  OBCIPacketPositionTimeSyncAuxStop: obciPacketPositionTimeSyncAuxStop,\\n  OBCIPacketPositionTimeSyncTimeStart: obciPacketPositionTimeSyncTimeStart,\\n  OBCIPacketPositionTimeSyncTimeStop: obciPacketPositionTimeSyncTimeStop,\\n  /** Possible Simulator Line Noise injections */\\n  OBCISimulatorLineNoiseHz60: obciSimulatorLineNoiseHz60,\\n  OBCISimulatorLineNoiseHz50: obciSimulatorLineNoiseHz50,\\n  OBCISimulatorLineNoiseNone: obciSimulatorLineNoiseNone,\\n  /** Possible Simulator Fragmentation modes */\\n  OBCISimulatorFragmentationRandom: obciSimulatorFragmentationRandom,\\n  OBCISimulatorFragmentationFullBuffers: obciSimulatorFragmentationFullBuffers,\\n  OBCISimulatorFragmentationOneByOne: obciSimulatorFragmentationOneByOne,\\n  OBCISimulatorFragmentationNone: obciSimulatorFragmentationNone,\\n  /** Firmware version indicator */\\n  OBCIFirmwareV1: obciFirmwareV1,\\n  OBCIFirmwareV2: obciFirmwareV2,\\n  OBCIFirmwareV3: obciFirmwareV3,\\n  /** Time synced accel packet */\\n  OBCIAccelAxisX: obciAccelAxisX,\\n  OBCIAccelAxisY: obciAccelAxisY,\\n  OBCIAccelAxisZ: obciAccelAxisZ,\\n  /** Time from board */\\n  OBCIStreamPacketTimeByteSize: obciStreamPacketTimeByteSize,\\n  /** Parse */\\n  OBCIParseDaisy: obciParseDaisy,\\n  OBCIParseFailure: obciParseFailure,\\n  OBCIParseFirmware: obciParseFirmware,\\n  OBCIParseEOT: obciParseEOT,\\n  OBCIParseSuccess: obciParseSuccess,\\n  /** Used in parsing incoming serial data */\\n  OBCIParsingChannelSettings: obciParsingChannelSettings,\\n  OBCIParsingEOT: obciParsingEOT,\\n  OBCIParsingNormal: obciParsingNormal,\\n  OBCIParsingReset: obciParsingReset,\\n  OBCIParsingTimeSyncSent: obciParsingTimeSyncSent,\\n  /** Timeouts */\\n  OBCITimeoutProcessBytes: obciTimeoutProcessBytes,\\n  /** Simulator Board Configurations */\\n  OBCISimulatorRawAux: obciSimulatorRawAux,\\n  OBCISimulatorStandard: obciSimulatorStandard,\\n  /** Radio Channel Limits */\\n  OBCIRadioChannelMax: obciRadioChannelMax,\\n  OBCIRadioChannelMin: obciRadioChannelMin,\\n  OBCIRadioPollTimeMax: obciRadioPollTimeMax,\\n  OBCIRadioPollTimeMin: obciRadioPollTimeMin,\\n  /** Time sync stuff */\\n  OBCITimeSyncArraySize: obciTimeSyncArraySize,\\n  OBCITimeSyncMultiplierWithSyncConf: obciTimeSyncMultiplierWithSyncConf,\\n  OBCITimeSyncMultiplierWithoutSyncConf: obciTimeSyncMultiplierWithoutSyncConf,\\n  OBCITimeSyncThresholdTransFailureMS: obciTimeSyncThresholdTransFailureMS,\\n  /** Set board mode */\\n  OBCIBoardModeSet: obciBoardModeSet,\\n  OBCIBoardModeCmdDefault: obciBoardModeCmdDefault,\\n  OBCIBoardModeCmdDebug: obciBoardModeCmdDebug,\\n  OBCIBoardModeCmdAnalog: obciBoardModeCmdAnalog,\\n  OBCIBoardModeCmdDigital: obciBoardModeCmdDigital,\\n  OBCIBoardModeCmdGetCur: obciBoardModeCmdGetCur,\\n  OBCIBoardModeAnalog: obciBoardModeAnalog,\\n  OBCIBoardModeDefault: obciBoardModeDefault,\\n  OBCIBoardModeDebug: obciBoardModeDebug,\\n  OBCIBoardModeDigital: obciBoardModeDigital,\\n\\n  /** Set sample rate */\\n  OBCISampleRateSet: obciSampleRateSet,\\n  OBCISampleRateCmdCyton16000: obciSampleRateCmdCyton16000,\\n  OBCISampleRateCmdCyton8000: obciSampleRateCmdCyton8000,\\n  OBCISampleRateCmdCyton4000: obciSampleRateCmdCyton4000,\\n  OBCISampleRateCmdCyton2000: obciSampleRateCmdCyton2000,\\n  OBCISampleRateCmdCyton1000: obciSampleRateCmdCyton1000,\\n  OBCISampleRateCmdCyton500: obciSampleRateCmdCyton500,\\n  OBCISampleRateCmdCyton250: obciSampleRateCmdCyton250,\\n  OBCISampleRateCmdGang25600: obciSampleRateCmdGang25600,\\n  OBCISampleRateCmdGang12800: obciSampleRateCmdGang12800,\\n  OBCISampleRateCmdGang6400: obciSampleRateCmdGang6400,\\n  OBCISampleRateCmdGang3200: obciSampleRateCmdGang3200,\\n  OBCISampleRateCmdGang1600: obciSampleRateCmdGang1600,\\n  OBCISampleRateCmdGang800: obciSampleRateCmdGang800,\\n  OBCISampleRateCmdGang400: obciSampleRateCmdGang400,\\n  OBCISampleRateCmdGang200: obciSampleRateCmdGang200,\\n  OBCISampleRateCmdGetCur: obciSampleRateCmdaGetCur,\\n\\n  /** Wifi Stuff */\\n  OBCIWifiAttach: obciWifiAttach,\\n  OBCIWifiRemove: obciWifiRemove,\\n  OBCIWifiReset: obciWifiReset,\\n  OBCIWifiStatus: obciWifiStatus,\\n  /** Baud Rates */\\n  OBCIRadioBaudRateDefault: obciRadioBaudRateDefault,\\n  OBCIRadioBaudRateDefaultStr: obciRadioBaudRateDefaultStr,\\n  OBCIRadioBaudRateFast: obciRadioBaudRateFast,\\n  OBCIRadioBaudRateFastStr: obciRadioBaudRateFastStr,\\n  /** Emitters */\\n  OBCIEmitterAccelerometer: obciEmitterAccelerometer,\\n  OBCIEmitterBlePoweredUp: obciEmitterBlePoweredUp,\\n  OBCIEmitterClose: obciEmitterClose,\\n  OBCIEmitterDroppedPacket: obciEmitterDroppedPacket,\\n  OBCIEmitterEot: obciEmitterEot,\\n  OBCIEmitterError: obciEmitterError,\\n  OBCIEmitterGanglionFound: obciEmitterGanglionFound,\\n  OBCIEmitterHardSet: obciEmitterHardSet,\\n  OBCIEmitterImpedance: obciEmitterImpedance,\\n  OBCIEmitterImpedanceArray: obciEmitterImpedanceArray,\\n  OBCIEmitterMessage: obciEmitterMessage,\\n  OBCIEmitterQuery: obciEmitterQuery,\\n  OBCIEmitterRawDataPacket: obciEmitterRawDataPacket,\\n  OBCIEmitterReady: obciEmitterReady,\\n  OBCIEmitterRFduino: obciEmitterRFduino,\\n  OBCIEmitterSample: obciEmitterSample,\\n  OBCIEmitterScanStopped: obciEmitterScanStopped,\\n  OBCIEmitterSynced: obciEmitterSynced,\\n  OBCIEmitterWifiShield: obciEmitterWifiShield,\\n  /** Emitters */\\n  /** Accel packets */\\n  OBCIGanglionAccelAxisX: obciGanglionAccelAxisX,\\n  OBCIGanglionAccelAxisY: obciGanglionAccelAxisY,\\n  OBCIGanglionAccelAxisZ: obciGanglionAccelAxisZ,\\n  /** Ganglion */\\n  OBCIGanglionBleSearchTime: obciGanglionBleSearchTime,\\n  OBCIGanglionByteIdUncompressed: obciGanglionByteIdUncompressed,\\n  OBCIGanglionByteId18Bit: obciGanglionByteId18Bit,\\n  OBCIGanglionByteId19Bit: obciGanglionByteId19Bit,\\n  OBCIGanglionByteIdImpedanceChannel1: obciGanglionByteIdImpedanceChannel1,\\n  OBCIGanglionByteIdImpedanceChannel2: obciGanglionByteIdImpedanceChannel2,\\n  OBCIGanglionByteIdImpedanceChannel3: obciGanglionByteIdImpedanceChannel3,\\n  OBCIGanglionByteIdImpedanceChannel4: obciGanglionByteIdImpedanceChannel4,\\n  OBCIGanglionByteIdImpedanceChannelReference: obciGanglionByteIdImpedanceChannelReference,\\n  OBCIGanglionByteIdMultiPacket: obciGanglionByteIdMultiPacket,\\n  OBCIGanglionByteIdMultiPacketStop: obciGanglionByteIdMultiPacketStop,\\n  OBCIGanglionMCP3912Gain: obciGanglionMCP3912Gain, // assumed gain setting for MCP3912.  NEEDS TO BE ADJUSTABLE JM\\n  OBCIGanglionMCP3912Vref: obciGanglionMCP3912Vref, // reference voltage for ADC in MCP3912 set in hardware\\n  OBCIGanglionPacketSize: obciGanglionPacketSize,\\n  OBCIGanglionPacket18Bit: obciGanglionPacket18Bit,\\n  OBCIGanglionPacket19Bit: obciGanglionPacket19Bit,\\n  OBCIGanglionPrefix: obciGanglionPrefix,\\n  OBCIGanglionSamplesPerPacket: obciGanglionSamplesPerPacket,\\n  OBCIGanglionSyntheticDataEnable: obciGanglionSyntheticDataEnable,\\n  OBCIGanglionSyntheticDataDisable: obciGanglionSyntheticDataDisable,\\n  OBCIGanglionImpedanceStart: obciGanglionImpedanceStart,\\n  OBCIGanglionImpedanceStop: obciGanglionImpedanceStop,\\n  OBCIGanglionScaleFactorPerCountVolts: obciGanglionScaleFactorPerCountVolts,\\n  /** Simblee */\\n  SimbleeUuidService: simbleeUuidService,\\n  SimbleeUuidReceive: simbleeUuidReceive,\\n  SimbleeUuidSend: simbleeUuidSend,\\n  SimbleeUuidDisconnect: simbleeUuidDisconnect,\\n  /** RFduino BLE UUID */\\n  RFduinoUuidService: rfduinoUuidService,\\n  RFduinoUuidReceive: rfduinoUuidReceive,\\n  RFduinoUuidSend: rfduinoUuidSend,\\n  RFduinoUuidSendTwo: rfduinoUuidSendTwo,\\n  /** Cyton BLE */\\n  OBCICytonBLESamplesPerPacket: obciCytonBLESamplesPerPacket,\\n  /** Accel scale factor */\\n  OBCIGanglionAccelScaleFactor: obciGanglionAccelScaleFactor,\\n  /** Noble */\\n  OBCINobleEmitterPeripheralConnect: obciNobleEmitterPeripheralConnect,\\n  OBCINobleEmitterPeripheralDisconnect: obciNobleEmitterPeripheralDisconnect,\\n  OBCINobleEmitterPeripheralDiscover: obciNobleEmitterPeripheralDiscover,\\n  OBCINobleEmitterPeripheralServicesDiscover: obciNobleEmitterPeripheralServicesDiscover,\\n  OBCINobleEmitterServiceCharacteristicsDiscover: obciNobleEmitterServiceCharacteristicsDiscover,\\n  OBCINobleEmitterServiceRead: obciNobleEmitterServiceRead,\\n  OBCINobleEmitterDiscover: obciNobleEmitterDiscover,\\n  OBCINobleEmitterScanStart: obciNobleEmitterScanStart,\\n  OBCINobleEmitterScanStop: obciNobleEmitterScanStop,\\n  OBCINobleEmitterStateChange: obciNobleEmitterStateChange,\\n  OBCINobleStatePoweredOn: obciNobleStatePoweredOn,\\n  getPeripheralLocalNames,\\n  getPeripheralWithLocalName,\\n  getVersionNumber,\\n  isPeripheralGanglion,\\n  commandSampleRateForCmdCyton,\\n  commandSampleRateForCmdGanglion,\\n  commandBoardModeForMode,\\n  rawDataToSampleObjectDefault,\\n  /** Protocols */\\n  OBCIProtocolBLE: obciProtocolBLE,\\n  OBCIProtocolSerial: obciProtocolSerial,\\n  OBCIProtocolWifi: obciProtocolWifi,\\n  /** Register Query for Cyton */\\n  OBCIRegisterQueryAccelerometerFirmwareV1: obciRegisterQueryAccelerometerFirmwareV1,\\n  OBCIRegisterQueryAccelerometerFirmwareV3: obciRegisterQueryAccelerometerFirmwareV3,\\n  OBCIRegisterQueryCyton: obciRegisterQueryCyton,\\n  OBCIRegisterQueryCytonDaisy: obciRegisterQueryCytonDaisy,\\n  OBCIRegisterQueryNameMISC1: obciRegisterQueryNameMISC1,\\n  OBCIRegisterQueryNameBIASSENSP: obciRegisterQueryNameBIASSENSP,\\n  OBCIRegisterQueryNameCHnSET: obciRegisterQueryNameCHnSET,\\n  OBCIRegisterQuerySizeCytonFirmwareV1: obciRegisterQuerySizeCytonFirmwareV1,\\n  OBCIRegisterQuerySizeCytonDaisyFirmwareV1: obciRegisterQuerySizeCytonDaisyFirmwareV1,\\n  OBCIRegisterQuerySizeCytonFirmwareV3: obciRegisterQuerySizeCytonFirmwareV3,\\n  OBCIRegisterQuerySizeCytonDaisyFirmwareV3: obciRegisterQuerySizeCytonDaisyFirmwareV3\\n};\\n\\n/**\\n* @description To add a usability abstraction layer above channel setting commands. Due to the\\n*          extensive and highly specific nature of the channel setting command chain, this\\n*          will take several different human readable inputs and merge to one array filled\\n*          with the correct commands, prime for sending directly to the write command.\\n* @param channelNumber - Number (1-16)\\n* @param powerDown - Bool (true -> OFF, false -> ON (default))\\n*          turns the channel on or off\\n* @param gain - Number (1,2,4,6,8,12,24(default))\\n*          sets the gain for the channel\\n* @param inputType - String (normal,shorted,biasMethod,mvdd,temp,testsig,biasDrp,biasDrn)\\n*          selects the ADC channel input source\\n* @param bias - Bool (true -> Include in bias (default), false -> remove from bias)\\n*          selects to include the channel input in bias generation\\n* @param srb2 - Bool (true -> Connect this input to SRB2 (default),\\n*                     false -> Disconnect this input from SRB2)\\n*          Select to connect (true) this channel's P input to the SRB2 pin. This closes\\n*              a switch between P input and SRB2 for the given channel, and allows the\\n*              P input to also remain connected to the ADC.\\n* @param srb1 - Bool (true -> connect all N inputs to SRB1,\\n*                     false -> Disconnect all N inputs from SRB1 (default))\\n*          Select to connect (true) all channels' N inputs to SRB1. This effects all pins,\\n*              and disconnects all N inputs from the ADC.\\n* @returns {Promise} resolves {commandArray: array of commands to be sent,\\n                               newChannelSettingsObject: an updated channel settings object\\n                                                         to be stored in openBCIBoard.channelSettingsArray},\\n                     rejects on bad input or no board\\n*/\\nfunction channelSetter(channelNumber, powerDown, gain, inputType, bias, srb2, srb1) {\\n  // Used to store and assemble the commands\\n  var cmdPowerDown, cmdBias, cmdSrb2, cmdSrb1;\\n\\n  return new Promise(function (resolve, reject) {\\n    // Validate the input\\n    if (!isNumber(channelNumber)) reject(Error(\\\"channelNumber must be of type 'number' \\\"));\\n    if (!isBoolean(powerDown)) reject(Error(\\\"powerDown must be of type 'boolean' \\\"));\\n    if (!isNumber(gain)) reject(Error(\\\"gain must be of type 'number' \\\"));\\n    if (!isString(inputType)) reject(Error(\\\"inputType must be of type 'string' \\\"));\\n    if (!isBoolean(bias)) reject(Error(\\\"bias must be of type 'boolean' \\\"));\\n    if (!isBoolean(srb2)) reject(Error(\\\"srb1 must be of type 'boolean' \\\"));\\n    if (!isBoolean(srb1)) reject(Error(\\\"srb2 must be of type 'boolean' \\\"));\\n\\n    // Set Channel Number\\n    var p1 = commandChannelForCmd(channelNumber).catch(err => reject(err));\\n\\n    // Set POWER_DOWN\\n    cmdPowerDown = powerDown ? obciChannelCmdPowerOff : obciChannelCmdPowerOn;\\n\\n    // Set Gain\\n    var p2 = commandForGain(gain).catch(err => reject(err));\\n\\n    // Set ADC string\\n    var p3 = commandForADCString(inputType).catch(err => reject(err));\\n\\n    // Set BIAS\\n    cmdBias = bias ? obciChannelCmdBiasInclude : obciChannelCmdBiasRemove;\\n\\n    // Set SRB2\\n    cmdSrb2 = srb2 ? obciChannelCmdSRB2Connect : obciChannelCmdSRB2Diconnect;\\n\\n    // Set SRB1\\n    cmdSrb1 = srb1 ? obciChannelCmdSRB1Connect : obciChannelCmdSRB1Diconnect;\\n\\n    var newChannelSettingsObject = {\\n      channelNumber: channelNumber,\\n      powerDown: powerDown,\\n      gain: gain,\\n      inputType: inputType,\\n      bias: bias,\\n      srb2: srb2,\\n      srb1: srb1\\n    };\\n\\n    Promise.all([p1, p2, p3]).then(function (values) {\\n      var outputArray = [obciChannelCmdSet, values[0], cmdPowerDown, values[1], values[2], cmdBias, cmdSrb2, cmdSrb1, obciChannelCmdLatch];\\n      resolve({ commandArray: outputArray, newChannelSettingsObject: newChannelSettingsObject });\\n    });\\n  });\\n}\\n\\n/**\\n* @description To build the array of commands to send to the board to measure impedance\\n* @param channelNumber\\n* @param pInputApplied - Bool (true -> Test Signal Applied, false -> Test Signal Not Applied (default))\\n*          applies the test signal to the P input\\n* @param nInputApplied - Bool (true -> Test Signal Applied, false -> Test Signal Not Applied (default))\\n*          applies the test signal to the N input\\n* @returns {Promise} - fulfilled will contain an array of comamnds\\n*/\\nfunction impedanceSetter(channelNumber, pInputApplied, nInputApplied) {\\n  var cmdNInputApplied, cmdPInputApplied;\\n  return new Promise((resolve, reject) => {\\n    // validate inputs\\n    if (!isNumber(channelNumber)) reject(Error(\\\"channelNumber must be of type 'number' \\\"));\\n    if (!isBoolean(pInputApplied)) reject(Error(\\\"pInputApplied must be of type 'boolean' \\\"));\\n    if (!isBoolean(nInputApplied)) reject(Error(\\\"nInputApplied must be of type 'boolean' \\\"));\\n\\n    // Set pInputApplied\\n    cmdPInputApplied = pInputApplied ? obciChannelImpedanceTestSignalApplied : obciChannelImpedanceTestSignalAppliedNot;\\n\\n    // Set nInputApplied\\n    cmdNInputApplied = nInputApplied ? obciChannelImpedanceTestSignalApplied : obciChannelImpedanceTestSignalAppliedNot;\\n\\n    // Set Channel Number\\n    commandChannelForCmd(channelNumber).then(command => {\\n      var outputArray = [obciChannelImpedanceSet, command, cmdPInputApplied, cmdNInputApplied, obciChannelImpedanceLatch];\\n      // console.log(outputArray)\\n      resolve(outputArray);\\n    }).catch(err => reject(err));\\n  });\\n}\\n\\n/**\\n * @description To build the array of commands to send to the board to set the sample rate\\n * @param boardType {String} - The type of board, either cyton or ganglion. Default is Cyton\\n * @param sampleRate {Number} - The sample rate you want to set to. Please see docs for possible sample rates.\\n * @returns {Promise} - fulfilled will contain an array of commands\\n */\\nfunction sampleRateSetter(boardType, sampleRate) {\\n  return new Promise((resolve, reject) => {\\n    // validate inputs\\n    if (!isString(boardType)) return reject(Error(\\\"board type must be of type 'string' \\\"));\\n\\n    if (!isNumber(sampleRate)) return reject(Error(\\\"sampleRate must be of type 'number' \\\"));\\n\\n    sampleRate = Math.floor(sampleRate);\\n\\n    let func;\\n    if (boardType === obciBoardCyton || boardType === obciBoardDaisy) {\\n      func = commandSampleRateForCmdCyton;\\n    } else if (boardType === obciBoardGanglion) {\\n      func = commandSampleRateForCmdGanglion;\\n    } else {\\n      return reject(Error(`boardType must be either ${obciBoardCyton} or ${obciBoardGanglion}`));\\n    }\\n\\n    // Set Channel Number\\n    func(sampleRate).then(command => {\\n      var outputArray = [obciSampleRateSet, command];\\n      // console.log(outputArray)\\n      resolve(outputArray);\\n    }).catch(err => reject(err));\\n  });\\n}\\n\\n/**\\n * @description To build the array of commands to send to the board t\\n * @param boardMode {String} - The type of board mode:\\n *  `default`: Board will use Accel\\n *  `\\n * @returns {Promise} - fulfilled will contain an array of commands\\n */\\nfunction boardModeSetter(boardMode) {\\n  return new Promise((resolve, reject) => {\\n    // validate inputs\\n    if (!isString(boardMode)) return reject(Error(\\\"board mode must be of type 'string' \\\"));\\n    // Set Channel Number\\n    commandBoardModeForMode(boardMode).then(command => {\\n      var outputArray = [obciBoardModeSet, command];\\n      // console.log(outputArray)\\n      resolve(outputArray);\\n    }).catch(err => reject(err));\\n  });\\n}\\n\\nfunction isNumber(input) {\\n  return typeof input === 'number';\\n}\\nfunction isBoolean(input) {\\n  return typeof input === 'boolean';\\n}\\nfunction isString(input) {\\n  return typeof input === 'string';\\n}\\nfunction isUndefined(input) {\\n  return typeof input === 'undefined';\\n}\\nfunction isNull(input) {\\n  return input === null;\\n}\\n\\nfunction commandForADCString(adcString) {\\n  return new Promise(function (resolve, reject) {\\n    switch (adcString) {\\n      case obciStringADCNormal:\\n        resolve(obciChannelCmdADCNormal);\\n        break;\\n      case obciStringADCShorted:\\n        resolve(obciChannelCmdADCShorted);\\n        break;\\n      case obciStringADCBiasMethod:\\n        resolve(obciChannelCmdADCBiasMethod);\\n        break;\\n      case obciStringADCMvdd:\\n        resolve(obciChannelCmdADCMVDD);\\n        break;\\n      case obciStringADCTemp:\\n        resolve(obciChannelCmdADCTemp);\\n        break;\\n      case obciStringADCTestSig:\\n        resolve(obciChannelCmdADCTestSig);\\n        break;\\n      case obciStringADCBiasDrp:\\n        resolve(obciChannelCmdADCBiasDRP);\\n        break;\\n      case obciStringADCBiasDrn:\\n        resolve(obciChannelCmdADCBiasDRN);\\n        break;\\n      default:\\n        reject(Error('Invalid ADC string'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Returns the input type for the given command\\n * @param cmd {Number} The command\\n * @returns {String}\\n */\\nfunction inputTypeForCommand(cmd) {\\n  switch (String(cmd)) {\\n    case obciChannelCmdADCNormal:\\n      return obciStringADCNormal;\\n    case obciChannelCmdADCShorted:\\n      return obciStringADCShorted;\\n    case obciChannelCmdADCBiasMethod:\\n      return obciStringADCBiasMethod;\\n    case obciChannelCmdADCMVDD:\\n      return obciStringADCMvdd;\\n    case obciChannelCmdADCTemp:\\n      return obciStringADCTemp;\\n    case obciChannelCmdADCTestSig:\\n      return obciStringADCTestSig;\\n    case obciChannelCmdADCBiasDRP:\\n      return obciStringADCBiasDrp;\\n    case obciChannelCmdADCBiasDRN:\\n      return obciStringADCBiasDrn;\\n    default:\\n      throw new Error('Invalid input type, must be less than 8');\\n  }\\n}\\n\\nfunction commandForGain(gainSetting) {\\n  return new Promise(function (resolve, reject) {\\n    switch (gainSetting) {\\n      case 1:\\n        resolve(obciChannelCmdGain1);\\n        break;\\n      case 2:\\n        resolve(obciChannelCmdGain2);\\n        break;\\n      case 4:\\n        resolve(obciChannelCmdGain4);\\n        break;\\n      case 6:\\n        resolve(obciChannelCmdGain6);\\n        break;\\n      case 8:\\n        resolve(obciChannelCmdGain8);\\n        break;\\n      case 12:\\n        resolve(obciChannelCmdGain12);\\n        break;\\n      case 24:\\n        resolve(obciChannelCmdGain24);\\n        break;\\n      default:\\n        reject(Error('Invalid gain setting of ' + gainSetting + ' gain must be (1,2,4,6,8,12,24)'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Get the gain\\n * @param cmd {Number}\\n * @returns {Number}\\n */\\nfunction gainForCommand(cmd) {\\n  switch (String(cmd)) {\\n    case obciChannelCmdGain1:\\n      return 1;\\n    case obciChannelCmdGain2:\\n      return 2;\\n    case obciChannelCmdGain4:\\n      return 4;\\n    case obciChannelCmdGain6:\\n      return 6;\\n    case obciChannelCmdGain8:\\n      return 8;\\n    case obciChannelCmdGain12:\\n      return 12;\\n    case obciChannelCmdGain24:\\n      return 24;\\n    default:\\n      throw new Error(`Invalid gain setting of ${cmd} gain must be (0,1,2,3,4,5,6)`);\\n  }\\n}\\n\\nfunction commandChannelForCmd(channelNumber) {\\n  return new Promise(function (resolve, reject) {\\n    switch (channelNumber) {\\n      case 1:\\n        resolve(obciChannelCmdChannel1);\\n        break;\\n      case 2:\\n        resolve(obciChannelCmdChannel2);\\n        break;\\n      case 3:\\n        resolve(obciChannelCmdChannel3);\\n        break;\\n      case 4:\\n        resolve(obciChannelCmdChannel4);\\n        break;\\n      case 5:\\n        resolve(obciChannelCmdChannel5);\\n        break;\\n      case 6:\\n        resolve(obciChannelCmdChannel6);\\n        break;\\n      case 7:\\n        resolve(obciChannelCmdChannel7);\\n        break;\\n      case 8:\\n        resolve(obciChannelCmdChannel8);\\n        break;\\n      case 9:\\n        resolve(obciChannelCmdChannel9);\\n        break;\\n      case 10:\\n        resolve(obciChannelCmdChannel10);\\n        break;\\n      case 11:\\n        resolve(obciChannelCmdChannel11);\\n        break;\\n      case 12:\\n        resolve(obciChannelCmdChannel12);\\n        break;\\n      case 13:\\n        resolve(obciChannelCmdChannel13);\\n        break;\\n      case 14:\\n        resolve(obciChannelCmdChannel14);\\n        break;\\n      case 15:\\n        resolve(obciChannelCmdChannel15);\\n        break;\\n      case 16:\\n        resolve(obciChannelCmdChannel16);\\n        break;\\n      default:\\n        reject(Error('Invalid channel number'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * @typedef {Object} ChannelSettingsObject - See page 50 of the ads1299.pdf\\n * @property {Number} channelNumber - The channel number of this object\\n * @property {Boolean} powerDown - Power-down: - This boolean determines the channel power mode for the\\n *                      corresponding channel. `false` for normal operation, channel is on, and `true` for channel\\n *                      power-down, channel is off. (Default is `false`)\\n * @property {Number} gain - PGA gain: This number determines the PGA gain setting. Can be either 1, 2, 4, 6, 8, 12, 24\\n *                      (Default is 24)\\n * @property {String} inputType - Channel input: This string is used to determine the channel input selection.\\n *                      Can be:\\n *                        'normal' - Normal electrode input (Default)\\n *                        'shorted' - Input shorted (for offset or noise measurements)\\n *                        'biasMethod' - Used in conjunction with BIAS_MEAS bit for BIAS measurements.\\n *                        'mvdd' - MVDD for supply measurement\\n *                        'temp' - Temperature sensor\\n *                        'testsig' - Test signal\\n *                        'biasDrp' - BIAS_DRP (positive electrode is the driver)\\n *                        'biasDrn' - BIAS_DRN (negative electrode is the driver)\\n * @property {Boolean} bias - BIAS: Is the channel included in the bias? If `true` or yes, this channel has both P\\n *                      and N channels connected to the bias. (Default is `true`)\\n * @property {Boolean} srb2 - SRB2 connection: This boolean determines the SRB2 connection for the corresponding\\n *                      channel. `false` for open, not connected to channel, and `true` for closed, connected to the\\n *                      channel. (Default is `true`)\\n * @property {Boolean} srb1 - Stimulus, reference, and bias 1: This boolean connects the SRB2 to all 4, 6, or 8\\n *                      channels inverting inputs. `false` when switches open, disconnected, and `true` when switches\\n *                      closed, or connected. (Default is `false`)\\n */\\n\\n/**\\n * Get an object of default board settings.\\n * @param channelNumber\\n * @returns {ChannelSettingsObject}\\n */\\nfunction channelSettingsObjectDefault(channelNumber) {\\n  return {\\n    channelNumber: channelNumber,\\n    powerDown: false,\\n    gain: 24,\\n    inputType: obciStringADCNormal,\\n    bias: true,\\n    srb2: true,\\n    srb1: false\\n  };\\n}\\n\\n/**\\n * @description RawDataToSample default object creation\\n * @param numChannels {Number} - The number of channels\\n * @returns {RawDataToSample} - A new object\\n */\\nfunction rawDataToSampleObjectDefault(numChannels) {\\n  if (numChannels === undefined) numChannels = obciNumberOfChannelsDefault;\\n  return {\\n    accelArray: [0, 0, 0],\\n    channelSettings: constantsModule.channelSettingsArrayInit(numChannels),\\n    decompressedSamples: decompressedSamplesInit(numChannels),\\n    lastSampleNumber: 0,\\n    rawDataPacket: __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"].alloc(33),\\n    rawDataPackets: [],\\n    scale: true,\\n    sendCounts: false,\\n    timeOffset: 0,\\n    verbose: false\\n  };\\n}\\n\\nfunction decompressedSamplesInit(numChannels) {\\n  let output = [];\\n  for (let i = 0; i < 3; i++) {\\n    output.push(new Array(numChannels));\\n  }\\n  return output;\\n}\\n\\n/**\\n * Get's the command for sample rate Cyton\\n * @param sampleRate {Number} - The desired sample rate\\n * @return {Promise}\\n */\\nfunction commandSampleRateForCmdCyton(sampleRate) {\\n  return new Promise(function (resolve, reject) {\\n    switch (sampleRate) {\\n      case obciSampleRate16000:\\n        resolve(obciSampleRateCmdCyton16000);\\n        break;\\n      case obciSampleRate8000:\\n        resolve(obciSampleRateCmdCyton8000);\\n        break;\\n      case obciSampleRate4000:\\n        resolve(obciSampleRateCmdCyton4000);\\n        break;\\n      case obciSampleRate2000:\\n        resolve(obciSampleRateCmdCyton2000);\\n        break;\\n      case obciSampleRate1000:\\n        resolve(obciSampleRateCmdCyton1000);\\n        break;\\n      case obciSampleRate500:\\n        resolve(obciSampleRateCmdCyton500);\\n        break;\\n      case obciSampleRate250:\\n        resolve(obciSampleRateCmdCyton250);\\n        break;\\n      default:\\n        reject(Error('Invalid sample rate'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Get's the command for sample rate Cyton\\n * @param sampleRate {Number} - The desired sample rate\\n * @return {Promise}\\n */\\nfunction commandSampleRateForCmdGanglion(sampleRate) {\\n  return new Promise(function (resolve, reject) {\\n    switch (sampleRate) {\\n      case obciSampleRate25600:\\n        resolve(obciSampleRateCmdGang25600);\\n        break;\\n      case obciSampleRate12800:\\n        resolve(obciSampleRateCmdGang12800);\\n        break;\\n      case obciSampleRate6400:\\n        resolve(obciSampleRateCmdGang6400);\\n        break;\\n      case obciSampleRate3200:\\n        resolve(obciSampleRateCmdGang3200);\\n        break;\\n      case obciSampleRate1600:\\n        resolve(obciSampleRateCmdGang1600);\\n        break;\\n      case obciSampleRate800:\\n        resolve(obciSampleRateCmdGang800);\\n        break;\\n      case obciSampleRate400:\\n        resolve(obciSampleRateCmdGang400);\\n        break;\\n      case obciSampleRate200:\\n        resolve(obciSampleRateCmdGang200);\\n        break;\\n      default:\\n        reject(Error('Invalid sample rate'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Get's the command for sample rate Cyton\\n * @param boardMode {String} - The desired sample rate\\n * @return {Promise}\\n */\\nfunction commandBoardModeForMode(boardMode) {\\n  return new Promise(function (resolve, reject) {\\n    switch (boardMode) {\\n      case obciBoardModeDefault:\\n        resolve(obciBoardModeCmdDefault);\\n        break;\\n      case obciBoardModeDebug:\\n        resolve(obciBoardModeCmdDebug);\\n        break;\\n      case obciBoardModeAnalog:\\n        resolve(obciBoardModeCmdAnalog);\\n        break;\\n      case obciBoardModeDigital:\\n        resolve(obciBoardModeCmdDigital);\\n        break;\\n      default:\\n        reject(Error('Invalid sample rate'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * @description Get a list of local names from an array of peripherals\\n */\\nfunction getPeripheralLocalNames(pArray) {\\n  return new Promise((resolve, reject) => {\\n    var list = [];\\n    pArray.forEach(perif => {\\n      list.push(perif.advertisement.localName);\\n    });\\n    if (list.length > 0) {\\n      return resolve(list);\\n    } else {\\n      return reject(Error(`No peripherals discovered with prefix equal to ${obciGanglionPrefix}`));\\n    }\\n  });\\n}\\n\\n/**\\n * @description Get a peripheral with a local name\\n * @param `pArray` {Array} - Array of peripherals\\n * @param `localName` {String} - The local name of the BLE device.\\n */\\nfunction getPeripheralWithLocalName(pArray, localName) {\\n  return new Promise((resolve, reject) => {\\n    if (typeof pArray !== 'object') return reject(Error(`pArray must be of type Object`));\\n    pArray.forEach(perif => {\\n      if (perif.advertisement.hasOwnProperty('localName')) {\\n        if (perif.advertisement.localName === localName) {\\n          return resolve(perif);\\n        }\\n      }\\n    });\\n    return reject(Error(`No peripheral found with localName: ${localName}`));\\n  });\\n}\\n\\n/**\\n * @description This function is used to extract the major version from a github\\n *  version string.\\n * @returns {Number} The major version number\\n */\\nfunction getVersionNumber(versionStr) {\\n  return Number(versionStr[1]);\\n}\\n\\n/**\\n * @description Very safely checks to see if the noble peripheral is a\\n *  ganglion by way of checking the local name property.\\n */\\nfunction isPeripheralGanglion(peripheral) {\\n  if (peripheral) {\\n    if (peripheral.hasOwnProperty('advertisement')) {\\n      if (peripheral.advertisement !== null && peripheral.advertisement.hasOwnProperty('localName')) {\\n        if (peripheral.advertisement.localName !== undefined && peripheral.advertisement.localName !== null) {\\n          if (peripheral.advertisement.localName.indexOf(obciGanglionPrefix) > -1) {\\n            return true;\\n          }\\n        }\\n      }\\n    }\\n  }\\n  return false;\\n}\\n\\n/* harmony default export */ __webpack_exports__[\\\"default\\\"] = (constantsModule);\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./src/constants.js\\n// module id = 5\\n// module chunks = 0 1 3\\n\\n//# sourceURL=webpack:///./src/constants.js?\");\n\n/***/ }),\n/* 6 */,\n/* 7 */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\neval(\"Object.defineProperty(__webpack_exports__, \\\"__esModule\\\", { value: true });\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gaussian__ = __webpack_require__(8);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gaussian___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_gaussian__);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(5);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_streamsearch__ = __webpack_require__(9);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_streamsearch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_streamsearch__);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_buffer___ = __webpack_require__(0);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_buffer____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_buffer___);\\n\\n\\n\\n\\n\\n\\n\\n/** Constants for interpreting the EEG data */\\n// Reference voltage for ADC in ADS1299.\\n//   Set by its hardware.\\nconst ADS1299_VREF = 4.5;\\n// Scale factor for aux data\\nconst SCALE_FACTOR_ACCEL = 0.002 / Math.pow(2, 4);\\n// X, Y, Z\\nconst ACCEL_NUMBER_AXIS = 3;\\n// Default ADS1299 gains array\\n\\nlet utilitiesModule = {\\n\\n  /**\\n   * @typedef {Object} ProcessedBuffer\\n   * @property {Buffer|SafeBuffer|Buffer2} buffer The remaining buffer. Can be null.\\n   * @property {Array} rawDataPackets The extracted raw data packets\\n   */\\n  /**\\n   * @typedef {Object} Sample\\n   * @property {Array} accelData of floats of accel data. not always present in object.\\n   * @property {Number} sampleNumber The sample number\\n   * @property {Array} channelData The extracted channel data\\n   * @property {Buffer} rawDataPacket The raw data packet\\n   * @property {Boolean} valid If the sample is valid\\n   */\\n  /**\\n   * @typedef {Object} Impedance\\n   * @property {Number} channelNumber The channel number\\n   * @property {Number} impedanceValue The impedance in ohms\\n   */\\n  /**\\n   * @typedef {Object} RawDataToSample\\n   * @property {Array} rawDataPackets - An array of rawDataPackets\\n   * @property {Buffer} rawDataPacket - A single raw data packet\\n   * @property {Buffer} multiPacketBuffer - This buffer is used to build up multiple messages over ble and emit them at once\\n   * @property {Array} channelSettings - The channel settings array\\n   * @property {Number} timeOffset (optional) for non time stamp use cases i.e. 0xC0 or 0xC1 (default and raw aux)\\n   * @property {Array} accelArray (optional) for non time stamp use cases\\n   * @property {Boolean} verbose (optional) for verbose output\\n   * @property {Number} lastSampleNumber (optional) - The last sample number\\n   * @property {Boolean} scale (optional) Default `true`. A gain of 24 for Cyton will be used and 51 for ganglion by default.\\n   * @property {Array} decompressedSamples - An array to hold delta compression items\\n   * @property {Boolean} sendCounts - True if you want raw A/D counts or scaled counts in samples\\n   */\\n\\n  /**\\n   * @description Used to extract samples out of a buffer of unknown length\\n   * @param dataBuffer {Buffer} - A buffer to parse for samples\\n   * @returns {ProcessedBuffer} - Object with parsed raw packets and remaining buffer. Calling function shall maintain\\n   *  the buffer in it's scope.\\n   * @author AJ Keller (@aj-ptw)\\n   */\\n  extractRawDataPackets: dataBuffer => {\\n    if (!dataBuffer) {\\n      return {\\n        'buffer': dataBuffer,\\n        'rawDataPackets': []\\n      };\\n    }\\n    let bytesToParse = dataBuffer.length;\\n    let rawDataPackets = [];\\n    // Exit if we have a buffer with less data than a packet\\n    if (bytesToParse < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) {\\n      return {\\n        'buffer': dataBuffer,\\n        'rawDataPackets': rawDataPackets\\n      };\\n    }\\n\\n    let parsePosition = 0;\\n    // Begin parseing\\n    while (parsePosition <= bytesToParse - __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) {\\n      // Is the current byte a head byte that looks like 0xA0\\n      if (dataBuffer[parsePosition] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) {\\n        // Now that we know the first is a head byte, let's see if the last one is a\\n        //  tail byte 0xCx where x is the set of numbers from 0-F (hex)\\n        if (isStopByte(dataBuffer[parsePosition + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1])) {\\n          // console.log(dataBuffer[parsePosition+1]);\\n          /** We just qualified a raw packet */\\n          // This could be a time set packet!\\n          // this.timeOfPacketArrival = this.time();\\n          // Grab the raw packet, make a copy of it.\\n          let rawPacket;\\n          rawPacket = __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].from(dataBuffer.slice(parsePosition, parsePosition + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize));\\n\\n          // Emit that buffer\\n          // this.emit('rawDataPacket', rawPacket);\\n          rawDataPackets.push(rawPacket);\\n          // Submit the packet for processing\\n          // this._processQualifiedPacket(rawPacket);\\n          // Overwrite the dataBuffer with a new buffer\\n          let tempBuf;\\n          if (parsePosition > 0) {\\n            tempBuf = __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].concat([dataBuffer.slice(0, parsePosition), dataBuffer.slice(parsePosition + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize)], dataBuffer.byteLength - __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize);\\n          } else {\\n            tempBuf = dataBuffer.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize);\\n          }\\n          if (tempBuf.length === 0) {\\n            dataBuffer = null;\\n          } else {\\n            dataBuffer = __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].from(tempBuf);\\n          }\\n          // Move the parse position up one packet\\n          parsePosition = -1;\\n          bytesToParse -= __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize;\\n        }\\n      }\\n      parsePosition++;\\n    }\\n    return {\\n      'buffer': dataBuffer,\\n      'rawDataPackets': rawDataPackets\\n    };\\n  },\\n  extractRawBLEDataPackets: dataBuffer => {\\n    let rawDataPackets = [];\\n    if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(dataBuffer)) return rawDataPackets;\\n    // Verify the packet is of length 20\\n    if (dataBuffer.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSizeBLECyton) return rawDataPackets;\\n    let sampleNumbers = [0, 0, 0];\\n    sampleNumbers[0] = dataBuffer[1];\\n    sampleNumbers[1] = sampleNumbers[0] + 1;\\n    if (sampleNumbers[1] > 255) sampleNumbers[1] -= 256;\\n    sampleNumbers[2] = sampleNumbers[1] + 1;\\n    if (sampleNumbers[2] > 255) sampleNumbers[2] -= 256;\\n    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCICytonBLESamplesPerPacket; i++) {\\n      let rawDataPacket = utilitiesModule.samplePacketZero(sampleNumbers[i]);\\n      rawDataPacket[0] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart;\\n      rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte] = dataBuffer[0];\\n      dataBuffer.copy(rawDataPacket, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart + i * 6, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart + 6 + i * 6);\\n      rawDataPackets.push(rawDataPacket);\\n    }\\n    return rawDataPackets;\\n  },\\n  transformRawDataPacketToSample,\\n  transformRawDataPacketsToSample,\\n  convertGanglionArrayToBuffer,\\n  getRawPacketType,\\n  getFromTimePacketAccel,\\n  getFromTimePacketTime,\\n  getFromTimePacketRawAux,\\n  ganglionFillRawDataPacket,\\n  parsePacketStandardAccel,\\n  parsePacketStandardRawAux,\\n  parsePacketTimeSyncedAccel,\\n  parsePacketTimeSyncedRawAux,\\n  parsePacketImpedance,\\n  /**\\n  * @description Mainly used by the simulator to convert a randomly generated sample into a std OpenBCI V3 Packet\\n  * @param sample - A sample object\\n  * @returns {Buffer}\\n  */\\n  convertSampleToPacketStandard: sample => {\\n    let packetBuffer = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize);\\n    packetBuffer.fill(0);\\n\\n    // start byte\\n    packetBuffer[0] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart;\\n\\n    // sample number\\n    packetBuffer[1] = sample.sampleNumber;\\n\\n    // channel data\\n    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault; i++) {\\n      let threeByteBuffer = floatTo3ByteBuffer(sample.channelData[i]);\\n\\n      threeByteBuffer.copy(packetBuffer, 2 + i * 3);\\n    }\\n\\n    for (let j = 0; j < 3; j++) {\\n      let twoByteBuffer = floatTo2ByteBuffer(sample.auxData[j]);\\n\\n      twoByteBuffer.copy(packetBuffer, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1 - 6 + j * 2);\\n    }\\n\\n    // stop byte\\n    packetBuffer[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStop;\\n\\n    return packetBuffer;\\n  },\\n  /**\\n  * @description Mainly used by the simulator to convert a randomly generated sample into a std OpenBCI V3 Packet\\n  * @param sample - A sample object\\n  * @param rawAux {Buffer} - A 6 byte long buffer to insert into raw buffer\\n  * @returns {Buffer} - A 33 byte long buffer\\n  */\\n  convertSampleToPacketRawAux: (sample, rawAux) => {\\n    let packetBuffer = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize);\\n    packetBuffer.fill(0);\\n\\n    // start byte\\n    packetBuffer[0] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart;\\n\\n    // sample number\\n    packetBuffer[1] = sample.sampleNumber;\\n\\n    // channel data\\n    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault; i++) {\\n      let threeByteBuffer = floatTo3ByteBuffer(sample.channelData[i]);\\n\\n      threeByteBuffer.copy(packetBuffer, 2 + i * 3);\\n    }\\n\\n    // Write the raw aux bytes\\n    rawAux.copy(packetBuffer, 26);\\n\\n    // stop byte\\n    packetBuffer[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1] = makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardRawAux);\\n\\n    return packetBuffer;\\n  },\\n  /**\\n  * @description Mainly used by the simulator to convert a randomly generated sample into an accel time sync set buffer\\n  * @param sample {Buffer} - A sample object\\n  * @param time {Number} - The time to inject into the sample.\\n  * @returns {Buffer} - A time sync accel packet\\n  */\\n  convertSampleToPacketAccelTimeSyncSet: (sample, time) => {\\n    let buf = convertSampleToPacketAccelTimeSynced(sample, time);\\n    buf[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte] = makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketAccelTimeSyncSet);\\n    return buf;\\n  },\\n  /**\\n  * @description Mainly used by the simulator to convert a randomly generated sample into an accel time synced buffer\\n  * @param sample {Buffer} - A sample object\\n  * @param time {Number} - The time to inject into the sample.\\n  * @returns {Buffer} - A time sync accel packet\\n  */\\n  convertSampleToPacketAccelTimeSynced,\\n  /**\\n  * @description Mainly used by the simulator to convert a randomly generated sample into a raw aux time sync set packet\\n  * @param sample {Buffer} - A sample object\\n  * @param time {Number} - The time to inject into the sample.\\n  * @param rawAux {Buffer} - 2 byte buffer to inject into sample\\n  * @returns {Buffer} - A time sync raw aux packet\\n  */\\n  convertSampleToPacketRawAuxTimeSyncSet: (sample, time, rawAux) => {\\n    let buf = convertSampleToPacketRawAuxTimeSynced(sample, time, rawAux);\\n    buf[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte] = makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketRawAuxTimeSyncSet);\\n    return buf;\\n  },\\n  convertSampleToPacketRawAuxTimeSynced,\\n  debugPrettyPrint: sample => {\\n    if (sample === null || sample === undefined) {\\n      console.log('== Sample is undefined ==');\\n    } else {\\n      console.log('-- Sample --');\\n      console.log('---- Start Byte: ' + sample.startByte);\\n      console.log('---- Sample Number: ' + sample.sampleNumber);\\n      for (let i = 0; i < 8; i++) {\\n        console.log('---- Channel Data ' + (i + 1) + ': ' + sample.channelData[i]);\\n      }\\n      if (sample.accelData) {\\n        for (let j = 0; j < 3; j++) {\\n          console.log('---- Accel Data ' + j + ': ' + sample.accelData[j]);\\n        }\\n      }\\n      if (sample.auxData) {\\n        console.log('---- Aux Data ' + sample.auxData);\\n      }\\n      console.log('---- Stop Byte: ' + sample.stopByte);\\n    }\\n  },\\n  samplePrintHeader: () => {\\n    return 'All voltages in Volts!' + 'sampleNumber, channel1, channel2, channel3, channel4, channel5, channel6, channel7, channel8, aux1, aux2, aux3\\\\n';\\n  },\\n  samplePrintLine: sample => {\\n    return new Promise((resolve, reject) => {\\n      if (sample === null || sample === undefined) reject(Error('undefined sample'));\\n\\n      resolve(sample.sampleNumber + ',' + sample.channelData[0].toFixed(8) + ',' + sample.channelData[1].toFixed(8) + ',' + sample.channelData[2].toFixed(8) + ',' + sample.channelData[3].toFixed(8) + ',' + sample.channelData[4].toFixed(8) + ',' + sample.channelData[5].toFixed(8) + ',' + sample.channelData[6].toFixed(8) + ',' + sample.channelData[7].toFixed(8) + ',' + sample.auxData[0].toFixed(8) + ',' + sample.auxData[1].toFixed(8) + ',' + sample.auxData[2].toFixed(8) + '\\\\n');\\n    });\\n  },\\n  floatTo3ByteBuffer,\\n  floatTo2ByteBuffer,\\n  /**\\n  * @description Calculate the impedance for one channel only.\\n  * @param sampleObject - Standard OpenBCI sample object\\n  * @param channelNumber - Number, the channel you want to calculate impedance for.\\n  * @returns {Promise} - Fulfilled with impedance value for the specified channel.\\n  * @author AJ Keller\\n  */\\n  impedanceCalculationForChannel: (sampleObject, channelNumber) => {\\n    const sqrt2 = Math.sqrt(2);\\n    return new Promise((resolve, reject) => {\\n      if (sampleObject === undefined || sampleObject === null) reject(Error('Sample Object cannot be null or undefined'));\\n      if (sampleObject.channelData === undefined || sampleObject.channelData === null) reject(Error('Channel cannot be null or undefined'));\\n      if (channelNumber < 1 || channelNumber > __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault) reject(Error('Channel number invalid.'));\\n\\n      let index = channelNumber - 1;\\n\\n      if (sampleObject.channelData[index] < 0) {\\n        sampleObject.channelData[index] *= -1;\\n      }\\n      let impedance = sqrt2 * sampleObject.channelData[index] / __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCILeadOffDriveInAmps;\\n      // if (index === 0) console.log(\\\"Voltage: \\\" + (sqrt2*sampleObject.channelData[index]) + \\\" leadoff amps: \\\" + k.OBCILeadOffDriveInAmps + \\\" impedance: \\\" + impedance)\\n      resolve(impedance);\\n    });\\n  },\\n  /**\\n  * @description Calculate the impedance for all channels.\\n  * @param sampleObject - Standard OpenBCI sample object\\n  * @returns {Promise} - Fulfilled with impedances for the sample\\n  * @author AJ Keller\\n  */\\n  impedanceCalculationForAllChannels: sampleObject => {\\n    const sqrt2 = Math.sqrt(2);\\n    return new Promise((resolve, reject) => {\\n      if (sampleObject === undefined || sampleObject === null) reject(Error('Sample Object cannot be null or undefined'));\\n      if (sampleObject.channelData === undefined || sampleObject.channelData === null) reject(Error('Channel cannot be null or undefined'));\\n\\n      let sampleImpedances = [];\\n      let numChannels = sampleObject.channelData.length;\\n      for (let index = 0; index < numChannels; index++) {\\n        if (sampleObject.channelData[index] < 0) {\\n          sampleObject.channelData[index] *= -1;\\n        }\\n        let impedance = sqrt2 * sampleObject.channelData[index] / __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCILeadOffDriveInAmps;\\n        sampleImpedances.push(impedance);\\n\\n        // if (index === 0) console.log(\\\"Voltage: \\\" + (sqrt2*sampleObject.channelData[index]) + \\\" leadoff amps: \\\" + k.OBCILeadOffDriveInAmps + \\\" impedance: \\\" + impedance)\\n      }\\n\\n      sampleObject.impedances = sampleImpedances;\\n\\n      resolve(sampleObject);\\n    });\\n  },\\n  interpret16bitAsInt32: twoByteBuffer => {\\n    let prefix = 0;\\n\\n    if (twoByteBuffer[0] > 127) {\\n      // console.log('\\\\t\\\\tNegative number')\\n      prefix = 65535; // 0xFFFF\\n    }\\n\\n    return prefix << 16 | twoByteBuffer[0] << 8 | twoByteBuffer[1];\\n  },\\n  interpret24bitAsInt32: threeByteBuffer => {\\n    let prefix = 0;\\n\\n    if (threeByteBuffer[0] > 127) {\\n      // console.log('\\\\t\\\\tNegative number')\\n      prefix = 255;\\n    }\\n\\n    return prefix << 24 | threeByteBuffer[0] << 16 | threeByteBuffer[1] << 8 | threeByteBuffer[2];\\n  },\\n  impedanceArray: numberOfChannels => {\\n    let impedanceArray = [];\\n    for (let i = 0; i < numberOfChannels; i++) {\\n      impedanceArray.push(newImpedanceObject(i + 1));\\n    }\\n    return impedanceArray;\\n  },\\n  impedanceObject: newImpedanceObject,\\n  impedanceSummarize: singleInputObject => {\\n    if (singleInputObject.raw > __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIImpedanceThresholdBadMax) {\\n      // The case for no load (super high impedance)\\n      singleInputObject.text = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIImpedanceTextNone;\\n    } else {\\n      singleInputObject.text = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].getTextForRawImpedance(singleInputObject.raw); // Get textual impedance\\n    }\\n  },\\n  newSample,\\n  newSampleNoScale,\\n  /**\\n  * @description Create a configurable function to return samples for a simulator. This implements 1/f filtering injection to create more brain like data.\\n  * @param numberOfChannels {Number} - The number of channels in the sample... either 8 or 16\\n  * @param sampleRateHz {Number} - The sample rate\\n  * @param injectAlpha {Boolean} (optional) - True if you want to inject noise\\n  * @param lineNoise {String} (optional) - A string that can be either:\\n  *              `60Hz` - 60Hz line noise (Default) (ex. __United States__)\\n  *              `50Hz` - 50Hz line noise (ex. __Europe__)\\n  *              `none` - Do not inject line noise.\\n  *\\n  * @returns {Function}\\n  */\\n  randomSample: (numberOfChannels, sampleRateHz, injectAlpha, lineNoise) => {\\n    const distribution = __WEBPACK_IMPORTED_MODULE_0_gaussian___default()(0, 1);\\n    const sineWaveFreqHz10 = 10;\\n    const sineWaveFreqHz50 = 50;\\n    const sineWaveFreqHz60 = 60;\\n    const uVolts = 1000000;\\n\\n    let sinePhaseRad = new Array(numberOfChannels + 1); // prevent index error with '+1'\\n    sinePhaseRad.fill(0);\\n\\n    let auxData = [0, 0, 0];\\n    let accelCounter = 0;\\n    // With 250Hz, every 10 samples, with 125Hz, every 5...\\n    let samplesPerAccelRate = Math.floor(sampleRateHz / 25); // best to make this an integer\\n    if (samplesPerAccelRate < 1) samplesPerAccelRate = 1;\\n\\n    // Init arrays to hold coefficients for each channel and init to 0\\n    //  This gives the 1/f filter memory on each iteration\\n    let b0 = new Array(numberOfChannels).fill(0);\\n    let b1 = new Array(numberOfChannels).fill(0);\\n    let b2 = new Array(numberOfChannels).fill(0);\\n\\n    /**\\n    * @description Use a 1/f filter\\n    * @param previousSampleNumber {Number} - The previous sample number\\n    */\\n    return previousSampleNumber => {\\n      let sample = newSample();\\n      let whiteNoise;\\n      for (let i = 0; i < numberOfChannels; i++) {\\n        // channels are 0 indexed\\n        // This produces white noise\\n        whiteNoise = distribution.ppf(Math.random()) * Math.sqrt(sampleRateHz / 2) / uVolts;\\n\\n        switch (i) {\\n          case 0: // Add 10Hz signal to channel 1... brainy\\n          case 1:\\n            if (injectAlpha) {\\n              sinePhaseRad[i] += 2 * Math.PI * sineWaveFreqHz10 / sampleRateHz;\\n              if (sinePhaseRad[i] > 2 * Math.PI) {\\n                sinePhaseRad[i] -= 2 * Math.PI;\\n              }\\n              whiteNoise += 5 * Math.SQRT2 * Math.sin(sinePhaseRad[i]) / uVolts;\\n            }\\n            break;\\n          default:\\n            if (lineNoise === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISimulatorLineNoiseHz60) {\\n              // If we're in murica we want to add 60Hz line noise\\n              sinePhaseRad[i] += 2 * Math.PI * sineWaveFreqHz60 / sampleRateHz;\\n              if (sinePhaseRad[i] > 2 * Math.PI) {\\n                sinePhaseRad[i] -= 2 * Math.PI;\\n              }\\n              whiteNoise += 8 * Math.SQRT2 * Math.sin(sinePhaseRad[i]) / uVolts;\\n            } else if (lineNoise === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISimulatorLineNoiseHz50) {\\n              // add 50Hz line noise if we are not in america\\n              sinePhaseRad[i] += 2 * Math.PI * sineWaveFreqHz50 / sampleRateHz;\\n              if (sinePhaseRad[i] > 2 * Math.PI) {\\n                sinePhaseRad[i] -= 2 * Math.PI;\\n              }\\n              whiteNoise += 8 * Math.SQRT2 * Math.sin(sinePhaseRad[i]) / uVolts;\\n            }\\n        }\\n        /**\\n        * See http://www.firstpr.com.au/dsp/pink-noise/ section \\\"Filtering white noise to make it pink\\\"\\n        */\\n        b0[i] = 0.99765 * b0[i] + whiteNoise * 0.0990460;\\n        b1[i] = 0.96300 * b1[i] + whiteNoise * 0.2965164;\\n        b2[i] = 0.57000 * b2[i] + whiteNoise * 1.0526913;\\n        sample.channelData[i] = b0[i] + b1[i] + b2[i] + whiteNoise * 0.1848;\\n      }\\n      if (previousSampleNumber === 255) {\\n        sample.sampleNumber = 0;\\n      } else {\\n        sample.sampleNumber = previousSampleNumber + 1;\\n      }\\n\\n      /**\\n      * Sample rate of accelerometer is 25Hz... when the accelCounter hits the relative sample rate of the accel\\n      *  we will output a new accel value. The approach will be to consider that Z should be about 1 and X and Y\\n      *  should be somewhere around 0.\\n      */\\n      if (accelCounter === samplesPerAccelRate) {\\n        // Initialize a new array\\n        let accelArray = [0, 0, 0];\\n        // Calculate X\\n        accelArray[0] = Math.random() * 0.1 * (Math.random() > 0.5 ? -1 : 1);\\n        // Calculate Y\\n        accelArray[1] = Math.random() * 0.1 * (Math.random() > 0.5 ? -1 : 1);\\n        // Calculate Z, this is around 1\\n        accelArray[2] = 1 - Math.random() * 0.4 * (Math.random() > 0.5 ? -1 : 1);\\n        // Store the newly calculated value\\n        sample.auxData = accelArray;\\n        // Reset the counter\\n        accelCounter = 0;\\n      } else {\\n        // Increment counter\\n        accelCounter++;\\n        // Store the default value\\n        sample.auxData = auxData;\\n      }\\n\\n      return sample;\\n    };\\n  },\\n  scaleFactorAux: SCALE_FACTOR_ACCEL,\\n  /**\\n   * Calculate the impedance\\n   * @param sample {Object} - Standard sample\\n   * @param impedanceTest {Object} - Impedance Object from openBCIBoard.js\\n   * @return {null | Object} - Null if not enough samples have passed to calculate an accurate\\n   */\\n  impedanceCalculateArray: (sample, impedanceTest) => {\\n    impedanceTest.buffer.push(sample.channelData);\\n    impedanceTest.count++;\\n\\n    if (impedanceTest.count >= impedanceTest.window) {\\n      let output = [];\\n      for (let i = 0; i < sample.channelData.length; i++) {\\n        let max = 0.0; // sumSquared\\n        for (let j = 0; j < impedanceTest.window; j++) {\\n          if (impedanceTest.buffer[i][j] > max) {\\n            max = impedanceTest.buffer[i][j];\\n          }\\n        }\\n        let min = 0.0;\\n        for (let j = 0; j < impedanceTest.window; j++) {\\n          if (impedanceTest.buffer[i][j] < min) {\\n            min = impedanceTest.buffer[i][j];\\n          }\\n        }\\n        const vP2P = max - min; // peak to peak\\n\\n        output.push(vP2P / 2 / __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCILeadOffDriveInAmps);\\n      }\\n      impedanceTest.count = 0;\\n      return output;\\n    }\\n    return null;\\n  },\\n  impedanceTestObjDefault: impedanceTestObj => {\\n    let newObj = impedanceTestObj || {};\\n    newObj['active'] = false;\\n    newObj['buffer'] = [];\\n    newObj['count'] = 0;\\n    newObj['isTestingPInput'] = false;\\n    newObj['isTestingNInput'] = false;\\n    newObj['onChannel'] = 0;\\n    newObj['sampleNumber'] = 0;\\n    newObj['continuousMode'] = false;\\n    newObj['impedanceForChannel'] = 0;\\n    newObj['window'] = 40;\\n    return newObj;\\n  },\\n  samplePacket: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 0, 0, 1, 0, 2, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardAccel)]);\\n  },\\n  samplePacketZero: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardAccel)]);\\n  },\\n  samplePacketReal: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0x8F, 0xF2, 0x40, 0x8F, 0xDF, 0xF4, 0x90, 0x2B, 0xB6, 0x8F, 0xBF, 0xBF, 0x7F, 0xFF, 0xFF, 0x7F, 0xFF, 0xFF, 0x94, 0x25, 0x34, 0x20, 0xB6, 0x7D, 0, 0xE0, 0, 0xE0, 0x0F, 0x70, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardAccel)]);\\n  },\\n  samplePacketStandardRawAux: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 2, 3, 4, 5, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardRawAux)]);\\n  },\\n  samplePacketAccelTimeSyncSet: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 0, 0, 0, 1, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketAccelTimeSyncSet)]);\\n  },\\n  samplePacketAccelTimeSynced: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0, 1, 0, 0, 0, 1, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketAccelTimeSynced)]);\\n  },\\n  samplePacketRawAuxTimeSyncSet: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0x00, 0x01, 0, 0, 0, 1, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketRawAuxTimeSyncSet)]);\\n  },\\n  samplePacketRawAuxTimeSynced: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4, 0, 0, 5, 0, 0, 6, 0, 0, 7, 0, 0, 8, 0x00, 0x01, 0, 0, 0, 1, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketRawAuxTimeSynced)]);\\n  },\\n  samplePacketImpedance: channelNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, channelNumber, 54, 52, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketImpedance)]);\\n  },\\n  samplePacketUserDefined: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xA0, 0x00, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketUserDefinedType)]);\\n  },\\n  samplePacketCytonBLE: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0xC0, sampleNumberNormalize(sampleNumber), 0, 0, 1, 0, 0, 2, 0, 0, 10, 0, 0, 20, 0, 0, 100, 0, 0, 200]);\\n  },\\n  countADSPresent,\\n  doesBufferHaveEOT,\\n  getBiasSetFromADSRegisterQuery,\\n  getBooleanFromRegisterQuery,\\n  getChannelDataArray,\\n  getChannelDataArrayNoScale,\\n  getDataArrayAccel,\\n  getDataArrayAccelNoScale,\\n  getFirmware,\\n  getSRB1FromADSRegisterQuery,\\n  getNumFromThreeCSVADSRegisterQuery,\\n  isEven,\\n  isFailureInBuffer,\\n  isOdd,\\n  isStopByte,\\n  isSuccessInBuffer,\\n  isTimeSyncSetConfirmationInBuffer,\\n  makeDaisySampleObject,\\n  makeDaisySampleObjectWifi,\\n  makeTailByteFromPacketType,\\n  newSyncObject,\\n  setChSetFromADSRegisterQuery,\\n  stripToEOTBuffer,\\n  syncChannelSettingsWithRawData,\\n  /**\\n  * @description Checks to make sure the previous sample number is one less\\n  *  then the new sample number. Takes into account sample numbers wrapping\\n  *  around at 255.\\n  * @param `previousSampleNumber` {Number} - An integer number of the previous\\n  *  sample number.\\n  * @param `newSampleNumber` {Number} - An integer number of the new sample\\n  *  number.\\n  * @returns {Array} - Returns null if there is no dropped packets, otherwise,\\n  *  or on a missed packet, an array of their packet numbers is returned.\\n  */\\n  droppedPacketCheck: (previousSampleNumber, newSampleNumber) => {\\n    if (previousSampleNumber === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISampleNumberMax && newSampleNumber === 0) {\\n      return null;\\n    }\\n\\n    if (newSampleNumber - previousSampleNumber === 1) {\\n      return null;\\n    }\\n\\n    let missedPacketArray = [];\\n\\n    if (previousSampleNumber > newSampleNumber) {\\n      let numMised = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISampleNumberMax - previousSampleNumber;\\n      for (let i = 0; i < numMised; i++) {\\n        missedPacketArray.push(previousSampleNumber + i + 1);\\n      }\\n      previousSampleNumber = -1;\\n    }\\n\\n    for (let j = 1; j < newSampleNumber - previousSampleNumber; j++) {\\n      missedPacketArray.push(previousSampleNumber + j);\\n    }\\n    return missedPacketArray;\\n  },\\n  convert18bitAsInt32,\\n  convert19bitAsInt32,\\n  decompressDeltas18Bit,\\n  decompressDeltas19Bit,\\n  sampleCompressedData: sampleNumber => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([sampleNumber, // 0\\n    0b00000000, // 0\\n    0b00000000, // 1\\n    0b00000000, // 2\\n    0b00000000, // 3\\n    0b00001000, // 4\\n    0b00000000, // 5\\n    0b00000101, // 6\\n    0b00000000, // 7\\n    0b00000000, // 8\\n    0b01001000, // 9\\n    0b00000000, // 10\\n    0b00001001, // 11\\n    0b11110000, // 12\\n    0b00000001, // 13\\n    0b10110000, // 14\\n    0b00000000, // 15\\n    0b00110000, // 16\\n    0b00000000, // 17\\n    0b00001000 // 18\\n    ]);\\n  },\\n  sampleBLERaw: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 4]);\\n  },\\n  sampleImpedanceChannel1: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel1, 0, 0, 1]);\\n  },\\n  sampleImpedanceChannel2: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel2, 0, 0, 1]);\\n  },\\n  sampleImpedanceChannel3: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel3, 0, 0, 1]);\\n  },\\n  sampleImpedanceChannel4: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel4, 0, 0, 1]);\\n  },\\n  sampleImpedanceChannelReference: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannelReference, 0, 0, 1]);\\n  },\\n  sampleMultiBytePacket: data => {\\n    const bufPre = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdMultiPacket]);\\n    return __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].concat([bufPre, data]);\\n  },\\n  sampleMultiBytePacketStop: data => {\\n    const bufPre = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdMultiPacketStop]);\\n    return __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].concat([bufPre, data]);\\n  },\\n  sampleOtherData: data => {\\n    const bufPre = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([255]);\\n    return __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].concat([bufPre, data]);\\n  },\\n  sampleUncompressedData: () => {\\n    return new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([0b00000000, // 0\\n    0b00000000, // 1\\n    0b00000000, // 2\\n    0b00000001, // 3\\n    0b00000000, // 4\\n    0b00000000, // 5\\n    0b00000010, // 6\\n    0b00000000, // 7\\n    0b00000000, // 8\\n    0b00000011, // 9\\n    0b00000000, // 10\\n    0b00000000, // 11\\n    0b00000100, // 12\\n    0b00000001, // 13\\n    0b00000010, // 14\\n    0b00000011, // 15\\n    0b00000100, // 16\\n    0b00000101, // 17\\n    0b00000110, // 18\\n    0b00000111 // 19\\n    ]);\\n  },\\n  parseGanglion\\n};\\n\\n/**\\n * @description Used transform raw data packets into fully qualified packets\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @return {Array} samples An array of {Sample}\\n * @author AJ Keller (@aj-ptw)\\n */\\nfunction parseGanglion(o) {\\n  const byteId = parseInt(o.rawDataPacket[0]);\\n  if (byteId <= __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteId19Bit.max) {\\n    return processRouteSampleData(o);\\n  } else {\\n    switch (byteId) {\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdMultiPacket:\\n        return processMultiBytePacket(o);\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdMultiPacketStop:\\n        return processMultiBytePacketStop(o);\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel1:\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel2:\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel3:\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel4:\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannelReference:\\n        return processImpedanceData(o);\\n      default:\\n        return null;\\n    }\\n  }\\n}\\n\\n/**\\n * Process an compressed packet of data.\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @private\\n */\\nfunction processCompressedData(o) {\\n  // Save the packet counter\\n  o.lastSampleNumber = parseInt(o.rawDataPacket[0]);\\n\\n  const samples = [];\\n  // Decompress the buffer into array\\n  if (o.lastSampleNumber <= __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteId18Bit.max) {\\n    decompressSamples(o, decompressDeltas18Bit(o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.dataStart, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.dataStop)));\\n    samples.push(buildSample(o.lastSampleNumber * 2 - 1, o.decompressedSamples[1], o.sendCounts));\\n    samples.push(buildSample(o.lastSampleNumber * 2, o.decompressedSamples[2], o.sendCounts));\\n\\n    switch (o.lastSampleNumber % 10) {\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionAccelAxisX:\\n        o.accelArray[0] = o.sendCounts ? o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.auxByte - 1] : o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.auxByte - 1] * __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionAccelScaleFactor;\\n        break;\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionAccelAxisY:\\n        o.accelArray[1] = o.sendCounts ? o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.auxByte - 1] : o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.auxByte - 1] * __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionAccelScaleFactor;\\n        break;\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionAccelAxisZ:\\n        o.accelArray[2] = o.sendCounts ? o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.auxByte - 1] : o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket18Bit.auxByte - 1] * __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionAccelScaleFactor;\\n        if (o.sendCounts) {\\n          samples[0].accelDataCounts = o.accelArray;\\n        } else {\\n          samples[0].accelData = o.accelArray;\\n        }\\n        break;\\n      default:\\n        break;\\n    }\\n  } else {\\n    decompressSamples(o, decompressDeltas19Bit(o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket19Bit.dataStart, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket19Bit.dataStop)));\\n\\n    samples.push(buildSample((o.lastSampleNumber - 100) * 2 - 1, o.decompressedSamples[1], o.sendCounts));\\n    samples.push(buildSample((o.lastSampleNumber - 100) * 2, o.decompressedSamples[2], o.sendCounts));\\n  }\\n\\n  // Rotate the 0 position for next time\\n  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsGanglion; i++) {\\n    o.decompressedSamples[0][i] = o.decompressedSamples[2][i];\\n  }\\n\\n  return samples;\\n}\\n\\n/**\\n * Process and emit an impedance value\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @private\\n */\\nfunction processImpedanceData(o) {\\n  const byteId = parseInt(o.rawDataPacket[0]);\\n  let channelNumber;\\n  switch (byteId) {\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel1:\\n      channelNumber = 1;\\n      break;\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel2:\\n      channelNumber = 2;\\n      break;\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel3:\\n      channelNumber = 3;\\n      break;\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannel4:\\n      channelNumber = 4;\\n      break;\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdImpedanceChannelReference:\\n      channelNumber = 0;\\n      break;\\n  }\\n\\n  let output = {\\n    channelNumber: channelNumber,\\n    impedanceValue: 0\\n  };\\n\\n  let end = o.rawDataPacket.length;\\n\\n  while (Number.isNaN(Number(o.rawDataPacket.slice(1, end))) && end !== 0) {\\n    end--;\\n  }\\n\\n  if (end !== 0) {\\n    output.impedanceValue = Number(o.rawDataPacket.slice(1, end));\\n  }\\n\\n  return output;\\n}\\n\\n/**\\n * Used to stack multi packet buffers into the multi packet buffer. This is finally emitted when a stop packet byte id\\n *  is received.\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @private\\n */\\nfunction processMultiBytePacket(o) {\\n  if (o.multiPacketBuffer) {\\n    o.multiPacketBuffer = __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].concat([o.multiPacketBuffer, o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket19Bit.dataStart, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket19Bit.dataStop)]);\\n  } else {\\n    o.multiPacketBuffer = o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket19Bit.dataStart, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionPacket19Bit.dataStop);\\n  }\\n}\\n\\n/**\\n * Adds the `data` buffer to the multi packet buffer and emits the buffer as 'message'\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @private\\n */\\nfunction processMultiBytePacketStop(o) {\\n  processMultiBytePacket(o);\\n  const str = o.multiPacketBuffer;\\n  o.multiPacketBuffer = null;\\n  return str;\\n}\\n\\n/**\\n * Utilize `receivedDeltas` to get actual count values.\\n * @param receivedDeltas {Array} - An array of deltas\\n *  of shape 2x4 (2 samples per packet and 4 channels per sample.)\\n * @private\\n */\\nfunction decompressSamples(o, receivedDeltas) {\\n  // add the delta to the previous value\\n  for (let i = 1; i < 3; i++) {\\n    for (let j = 0; j < 4; j++) {\\n      o.decompressedSamples[i][j] = o.decompressedSamples[i - 1][j] - receivedDeltas[i - 1][j];\\n    }\\n  }\\n}\\n\\n/**\\n * Builds a sample object from an array and sample number.\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @return {Array}\\n * @private\\n */\\nfunction buildSample(sampleNumber, rawData, sendCounts) {\\n  let sample;\\n  if (sendCounts) {\\n    sample = newSampleNoScale(sampleNumber);\\n    sample.channelDataCounts = rawData;\\n  } else {\\n    sample = newSample(sampleNumber);\\n    for (let j = 0; j < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsGanglion; j++) {\\n      sample.channelData.push(rawData[j] * __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionScaleFactorPerCountVolts);\\n    }\\n  }\\n  sample.timestamp = Date.now();\\n  return sample;\\n}\\n\\n/**\\n * Used to route samples for Ganglion\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @returns {*}\\n */\\nfunction processRouteSampleData(o) {\\n  if (parseInt(o.rawDataPacket[0]) === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdUncompressed) {\\n    return processUncompressedData(o);\\n  } else {\\n    return processCompressedData(o);\\n  }\\n}\\n\\n/**\\n * Process an uncompressed packet of data.\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @private\\n */\\nfunction processUncompressedData(o) {\\n  // Resets the packet counter back to zero\\n  o.lastSampleNumber = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionByteIdUncompressed; // used to find dropped packets\\n\\n  for (let i = 0; i < 4; i++) {\\n    o.decompressedSamples[0][i] = utilitiesModule.interpret24bitAsInt32(o.rawDataPacket.slice(1 + i * 3, 1 + i * 3 + 3)); // seed the decompressor\\n  }\\n\\n  return [buildSample(0, o.decompressedSamples[0], o.sendCounts)];\\n}\\n\\n/**\\n * Converts a special ganglion 18 bit compressed number\\n *  The compressions uses the LSB, bit 1, as the signed bit, instead of using\\n *  the MSB. Therefore you must not look to the MSB for a sign extension, one\\n *  must look to the LSB, and the same rules applies, if it's a 1, then it's a\\n *  negative and if it's 0 then it's a positive number.\\n * @param threeByteBuffer {Buffer}\\n *  A 3-byte buffer with only 18 bits of actual data.\\n * @return {number} A signed integer.\\n */\\nfunction convert18bitAsInt32(threeByteBuffer) {\\n  let prefix = 0;\\n\\n  if (threeByteBuffer[2] & 0x01 > 0) {\\n    // console.log('\\\\t\\\\tNegative number')\\n    prefix = 0b11111111111111;\\n  }\\n\\n  return prefix << 18 | threeByteBuffer[0] << 16 | threeByteBuffer[1] << 8 | threeByteBuffer[2];\\n}\\n\\n/**\\n * Converts a special ganglion 19 bit compressed number\\n *  The compressions uses the LSB, bit 1, as the signed bit, instead of using\\n *  the MSB. Therefore you must not look to the MSB for a sign extension, one\\n *  must look to the LSB, and the same rules applies, if it's a 1, then it's a\\n *  negative and if it's 0 then it's a positive number.\\n * @param threeByteBuffer {Buffer}\\n *  A 3-byte buffer with only 19 bits of actual data.\\n * @return {number} A signed integer.\\n */\\nfunction convert19bitAsInt32(threeByteBuffer) {\\n  let prefix = 0;\\n\\n  if (threeByteBuffer[2] & 0x01 > 0) {\\n    // console.log('\\\\t\\\\tNegative number')\\n    prefix = 0b1111111111111;\\n  }\\n\\n  return prefix << 19 | threeByteBuffer[0] << 16 | threeByteBuffer[1] << 8 | threeByteBuffer[2];\\n}\\n\\n/**\\n * Called to when a compressed packet is received.\\n * @param buffer {Buffer} Just the data portion of the sample. So 18 bytes.\\n * @return {Array} - An array of deltas of shape 2x4 (2 samples per packet\\n *  and 4 channels per sample.)\\n * @private\\n */\\nfunction decompressDeltas18Bit(buffer) {\\n  let D = new Array(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionSamplesPerPacket); // 2\\n  D[0] = [0, 0, 0, 0];\\n  D[1] = [0, 0, 0, 0];\\n\\n  let receivedDeltas = [];\\n  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionSamplesPerPacket; i++) {\\n    receivedDeltas.push([0, 0, 0, 0]);\\n  }\\n\\n  let miniBuf;\\n\\n  // Sample 1 - Channel 1\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([buffer[0] >> 6, (buffer[0] & 0x3F) << 2 | buffer[1] >> 6, (buffer[1] & 0x3F) << 2 | buffer[2] >> 6]);\\n  receivedDeltas[0][0] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 1 - Channel 2\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[2] & 0x3F) >> 4, buffer[2] << 4 | buffer[3] >> 4, buffer[3] << 4 | buffer[4] >> 4]);\\n  // miniBuf = new Buffer([(buffer[2] & 0x1F), buffer[3], buffer[4] >> 2]);\\n  receivedDeltas[0][1] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 1 - Channel 3\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[4] & 0x0F) >> 2, buffer[4] << 6 | buffer[5] >> 2, buffer[5] << 6 | buffer[6] >> 2]);\\n  receivedDeltas[0][2] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 1 - Channel 4\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([buffer[6] & 0x03, buffer[7], buffer[8]]);\\n  receivedDeltas[0][3] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 1\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([buffer[9] >> 6, (buffer[9] & 0x3F) << 2 | buffer[10] >> 6, (buffer[10] & 0x3F) << 2 | buffer[11] >> 6]);\\n  receivedDeltas[1][0] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 2\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[11] & 0x3F) >> 4, buffer[11] << 4 | buffer[12] >> 4, buffer[12] << 4 | buffer[13] >> 4]);\\n  receivedDeltas[1][1] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 3\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[13] & 0x0F) >> 2, buffer[13] << 6 | buffer[14] >> 2, buffer[14] << 6 | buffer[15] >> 2]);\\n  receivedDeltas[1][2] = convert18bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 4\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([buffer[15] & 0x03, buffer[16], buffer[17]]);\\n  receivedDeltas[1][3] = convert18bitAsInt32(miniBuf);\\n\\n  return receivedDeltas;\\n}\\n\\n/**\\n * Called to when a compressed packet is received.\\n * @param buffer {Buffer} Just the data portion of the sample. So 19 bytes.\\n * @return {Array} - An array of deltas of shape 2x4 (2 samples per packet\\n *  and 4 channels per sample.)\\n * @private\\n */\\nfunction decompressDeltas19Bit(buffer) {\\n  let D = new Array(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionSamplesPerPacket); // 2\\n  D[0] = [0, 0, 0, 0];\\n  D[1] = [0, 0, 0, 0];\\n\\n  let receivedDeltas = [];\\n  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionSamplesPerPacket; i++) {\\n    receivedDeltas.push([0, 0, 0, 0]);\\n  }\\n\\n  let miniBuf;\\n\\n  // Sample 1 - Channel 1\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([buffer[0] >> 5, (buffer[0] & 0x1F) << 3 | buffer[1] >> 5, (buffer[1] & 0x1F) << 3 | buffer[2] >> 5]);\\n  receivedDeltas[0][0] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 1 - Channel 2\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[2] & 0x1F) >> 2, buffer[2] << 6 | buffer[3] >> 2, buffer[3] << 6 | buffer[4] >> 2]);\\n  // miniBuf = new Buffer([(buffer[2] & 0x1F), buffer[3], buffer[4] >> 2]);\\n  receivedDeltas[0][1] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 1 - Channel 3\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[4] & 0x03) << 1 | buffer[5] >> 7, (buffer[5] & 0x7F) << 1 | buffer[6] >> 7, (buffer[6] & 0x7F) << 1 | buffer[7] >> 7]);\\n  receivedDeltas[0][2] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 1 - Channel 4\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[7] & 0x7F) >> 4, (buffer[7] & 0x0F) << 4 | buffer[8] >> 4, (buffer[8] & 0x0F) << 4 | buffer[9] >> 4]);\\n  receivedDeltas[0][3] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 1\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[9] & 0x0F) >> 1, buffer[9] << 7 | buffer[10] >> 1, buffer[10] << 7 | buffer[11] >> 1]);\\n  receivedDeltas[1][0] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 2\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[11] & 0x01) << 2 | buffer[12] >> 6, buffer[12] << 2 | buffer[13] >> 6, buffer[13] << 2 | buffer[14] >> 6]);\\n  receivedDeltas[1][1] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 3\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([(buffer[14] & 0x38) >> 3, (buffer[14] & 0x07) << 5 | (buffer[15] & 0xF8) >> 3, (buffer[15] & 0x07) << 5 | (buffer[16] & 0xF8) >> 3]);\\n  receivedDeltas[1][2] = convert19bitAsInt32(miniBuf);\\n\\n  // Sample 2 - Channel 4\\n  miniBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]([buffer[16] & 0x07, buffer[17], buffer[18]]);\\n  receivedDeltas[1][3] = convert19bitAsInt32(miniBuf);\\n\\n  return receivedDeltas;\\n}\\n\\nfunction newImpedanceObject(channelNumber) {\\n  return {\\n    channel: channelNumber,\\n    P: {\\n      raw: -1,\\n      text: __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIImpedanceTextInit\\n    },\\n    N: {\\n      raw: -1,\\n      text: __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIImpedanceTextInit\\n    }\\n  };\\n}\\n\\nfunction newSyncObject() {\\n  return {\\n    boardTime: 0,\\n    correctedTransmissionTime: false,\\n    error: null,\\n    timeSyncSent: 0,\\n    timeSyncSentConfirmation: 0,\\n    timeSyncSetPacket: 0,\\n    timeRoundTrip: 0,\\n    timeTransmission: 0,\\n    timeOffset: 0,\\n    timeOffsetMaster: 0,\\n    valid: false\\n  };\\n}\\n\\n/**\\n * @description Used transform raw data packets into fully qualified packets\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @return {Array} samples An array of {Sample}\\n * @author AJ Keller (@aj-ptw)\\n */\\nfunction transformRawDataPacketsToSample(o) {\\n  let samples = [];\\n  for (let i = 0; i < o.rawDataPackets.length; i++) {\\n    o.rawDataPacket = o.rawDataPackets[i];\\n    const sample = transformRawDataPacketToSample(o);\\n    samples.push(sample);\\n    if (sample.hasOwnProperty('sampleNumber')) {\\n      o['lastSampleNumber'] = sample.sampleNumber;\\n    } else if (!sample.hasOwnProperty('impedanceValue')) {\\n      o['lastSampleNumber'] = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n    }\\n  }\\n  return samples;\\n}\\n\\n/**\\n * @description Used transform raw data packets into fully qualified packets\\n * @param o {RawDataToSample} - Used to hold data and configuration settings\\n * @return {Array} samples An array of {Sample}\\n * @author AJ Keller (@aj-ptw)\\n */\\nfunction transformRawDataPacketToSample(o) {\\n  let sample;\\n  try {\\n    const packetType = getRawPacketType(o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte]);\\n    switch (packetType) {\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardAccel:\\n        sample = utilitiesModule.parsePacketStandardAccel(o);\\n        break;\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardRawAux:\\n        sample = utilitiesModule.parsePacketStandardRawAux(o);\\n        break;\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketAccelTimeSyncSet:\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketAccelTimeSynced:\\n        sample = utilitiesModule.parsePacketTimeSyncedAccel(o);\\n        break;\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketRawAuxTimeSyncSet:\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketRawAuxTimeSynced:\\n        sample = utilitiesModule.parsePacketTimeSyncedRawAux(o);\\n        break;\\n      case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketImpedance:\\n        sample = utilitiesModule.parsePacketImpedance(o);\\n        break;\\n      default:\\n        // Don't do anything if the packet is not defined\\n        sample = {\\n          error: `bad stop byte ${o.rawDataPacket.slice(32, 33).toString('hex')}`,\\n          valid: false,\\n          rawDataPacket: o.rawDataPacket\\n        };\\n        if (o.verbose) console.log(sample.error);\\n        break;\\n    }\\n  } catch (err) {\\n    sample = {\\n      error: err,\\n      valid: false,\\n      rawDataPacket: o.rawDataPacket\\n    };\\n    if (o.verbose) console.log(err);\\n  }\\n  return sample;\\n}\\n\\n/**\\n * Used to convert a ganglions decompressed back into a buffer\\n * @param arr {Array} - An array of four numbers\\n * @param data {Buffer} - A buffer to store into\\n */\\nfunction convertGanglionArrayToBuffer(arr, data) {\\n  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsGanglion; i++) {\\n    data.writeInt16BE(arr[i] >> 8, i * 3);\\n    data.writeInt8(arr[i] & 255, i * 3 + 2);\\n  }\\n}\\n\\n/**\\n * @description This function takes a raw data buffer of 4 3-byte signed integers for ganglion\\n * @param o {Object} - The input object\\n * @param o.data {Buffer} - An allocated and filled buffer of length 12\\n * @param o.rawDataPacket {Buffer} - An allocated buffer of length 33\\n * @param o.sampleNumber {Number} - The sample number to load into the `rawDataPacket`\\n */\\nfunction ganglionFillRawDataPacket(o) {\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.data) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.data)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure sampleNumber is inside object\\n  if (!o.hasOwnProperty('sampleNumber')) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure the rawDataPacket buffer is the right size.\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  // Check to make sure the rawDataPacket buffer is the right size.\\n  if (o.data.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSizeBLERaw) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n\\n  o.data.copy(o.rawDataPacket, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart);\\n  o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber] = o.sampleNumber;\\n  o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStartByte] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart;\\n  o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketStandardRawAux;\\n}\\n\\n/**\\n * @description This method parses a 33 byte OpenBCI V3 packet and converts to a sample object\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw packet\\n * @param o.channelSettings {Array} - An array of channel settings that is an Array that has shape similar to the one\\n *                  calling k.channelSettingsArrayInit(). The most important rule here is that it is\\n *                  Array of objects that have key-value pair {gain:NUMBER}\\n * @param o.scale {Boolean} - Do you want to scale the results? Default true\\n * @param o.lastSampleNumber {Number} - The last sample number\\n * @returns {Sample} - A sample object. NOTE: Only has accelData if this is a Z axis packet.\\n */\\nfunction parsePacketStandardAccel(o) {\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.rawDataPacket)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure the buffer is the right size.\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  // Verify the correct stop byte.\\n  if (o.rawDataPacket[0] !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteStart);\\n\\n  const sampleObject = {};\\n\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.scale) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.scale)) o.scale = true;\\n\\n  if (o.scale) sampleObject.accelData = getDataArrayAccel(o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStartAux, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopAux + 1));else sampleObject.accelDataCounts = getDataArrayAccelNoScale(o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStartAux, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopAux + 1));\\n\\n  if (o.scale) sampleObject.channelData = getChannelDataArray(o);else sampleObject.channelDataCounts = getChannelDataArrayNoScale(o);\\n\\n  sampleObject.auxData = __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].from(o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStartAux, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopAux + 1));\\n\\n  // Get the sample number\\n  sampleObject.sampleNumber = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n  // Get the start byte\\n  sampleObject.startByte = o.rawDataPacket[0];\\n  // Get the stop byte\\n  sampleObject.stopByte = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte];\\n\\n  sampleObject.valid = true;\\n\\n  sampleObject.timestamp = Date.now();\\n  sampleObject.boardTime = 0;\\n\\n  return sampleObject;\\n}\\n\\n/**\\n * @description This method parses a 33 byte OpenBCI V3 packet and converts to a sample object\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw packet\\n * @param o.channelSettings {Array} - An array of channel settings that is an Array that has shape similar to the one\\n *                  calling k.channelSettingsArrayInit(). The most important rule here is that it is\\n *                  Array of objects that have key-value pair {gain:NUMBER}\\n * @param o.scale {Boolean} - Do you want to scale the results? Default is true\\n * @param o.lastSampleNumber {Number} - The last sample number\\n * @returns {Sample} - A sample object. NOTE: Only has accelData if this is a Z axis packet.\\n */\\nfunction parsePacketStandardRawAux(o) {\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.rawDataPacket)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure the buffer is the right size.\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  // Verify the correct stop byte.\\n  if (o.rawDataPacket[0] !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteStart);\\n\\n  const sampleObject = {};\\n\\n  // Store the channel data\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.scale) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.scale)) o.scale = true;\\n  if (o.scale) sampleObject.channelData = getChannelDataArray(o);else sampleObject.channelDataCounts = getChannelDataArrayNoScale(o);\\n\\n  // Slice the buffer for the aux data\\n  sampleObject.auxData = __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].from(o.rawDataPacket.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStartAux, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopAux + 1));\\n\\n  // Get the sample number\\n  sampleObject.sampleNumber = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n  // Get the start byte\\n  sampleObject.startByte = o.rawDataPacket[0];\\n  // Get the stop byte\\n  sampleObject.stopByte = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte];\\n\\n  sampleObject.valid = true;\\n\\n  sampleObject.timestamp = Date.now();\\n  sampleObject.boardTime = 0;\\n\\n  return sampleObject;\\n}\\n\\n/**\\n * @description Grabs an accel value from a raw but time synced packet. Important that this utilizes the fact that:\\n *      X axis data is sent with every sampleNumber % 10 === 0\\n *      Y axis data is sent with every sampleNumber % 10 === 1\\n *      Z axis data is sent with every sampleNumber % 10 === 2\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw time synced accel packet\\n * @param o.channelSettings {Array} - An array of channel settings that is an Array that has shape similar to the one\\n *                  calling OpenBCIConstans.channelSettingsArrayInit(). The most important rule here is that it is\\n *                  Array of objects that have key-value pair {gain:NUMBER}\\n * @param o.timeOffset {Number} - The difference between board time and current time calculated with sync methods.\\n * @param o.accelArray {Array} - A 3 element array that allows us to have inter packet memory of x and y axis data and emit only on the z axis packets.\\n * @param o.scale {Boolean} - Do you want to scale the results? Default is true\\n * @returns {Sample} - A sample object. NOTE: Only has accelData if this is a Z axis packet.\\n */\\nfunction parsePacketTimeSyncedAccel(o) {\\n  // Ths packet has 'A0','00'....,'AA','AA','FF','FF','FF','FF','C4'\\n  //  where the 'AA's form an accel 16bit num and 'FF's form a 32 bit time in ms\\n  // The sample object we are going to build\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.rawDataPacket)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure the buffer is the right size.\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  // Verify the correct stop byte.\\n  if (o.rawDataPacket[0] !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteStart);\\n\\n  let sampleObject = {};\\n\\n  // Get the sample number\\n  sampleObject.sampleNumber = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n  // Get the start byte\\n  sampleObject.startByte = o.rawDataPacket[0];\\n  // Get the stop byte\\n  sampleObject.stopByte = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte];\\n\\n  // Get the board time\\n  sampleObject.boardTime = getFromTimePacketTime(o.rawDataPacket);\\n  if (o.hasOwnProperty('timeOffset')) {\\n    sampleObject.timestamp = sampleObject.boardTime + o.timeOffset;\\n  } else {\\n    sampleObject.timestamp = Date.now();\\n  }\\n\\n  // Extract the aux data\\n  sampleObject.auxData = getFromTimePacketRawAux(o.rawDataPacket);\\n\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.scale) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.scale)) o.scale = true;\\n  if (o.scale) sampleObject.channelData = getChannelDataArray(o);else sampleObject.channelDataCounts = getChannelDataArrayNoScale(o);\\n\\n  // Grab the accelData only if `getFromTimePacketAccel` returns true.\\n  if (getFromTimePacketAccel(o)) {\\n    if (o.scale) sampleObject.accelData = o.accelArray;else sampleObject.accelDataCounts = o.accelArray;\\n  }\\n\\n  sampleObject.valid = true;\\n\\n  return sampleObject;\\n}\\n\\n/**\\n * @description Raw aux\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw time synced accel packet\\n * @param o.channelSettings {Array} - An array of channel settings that is an Array that has shape similar to the one\\n *                  calling k.channelSettingsArrayInit(). The most important rule here is that it is\\n *                  Array of objects that have key-value pair {gain:NUMBER}\\n * @param o.timeOffset {Number} - The difference between board time and current time calculated with sync methods.\\n * @param o.scale {Boolean} - Do you want to scale the results? Default is true\\n * @param o.lastSampleNumber {Number} - The last sample number\\n * @returns {Sample} - A sample object. NOTE: The aux data is placed in a 2 byte buffer\\n */\\nfunction parsePacketTimeSyncedRawAux(o) {\\n  // Ths packet has 'A0','00'....,'AA','AA','FF','FF','FF','FF','C4'\\n  //  where the 'AA's form an accel 16bit num and 'FF's form a 32 bit time in ms\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.rawDataPacket)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure the buffer is the right size.\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  // Verify the correct stop byte.\\n  if (o.rawDataPacket[0] !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteStart);\\n\\n  // The sample object we are going to build\\n  let sampleObject = {};\\n\\n  // Get the sample number\\n  sampleObject.sampleNumber = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n  // Get the start byte\\n  sampleObject.startByte = o.rawDataPacket[0];\\n  // Get the stop byte\\n  sampleObject.stopByte = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionStopByte];\\n\\n  // Get the board time\\n  sampleObject.boardTime = getFromTimePacketTime(o.rawDataPacket);\\n  if (o.hasOwnProperty('timeOffset')) {\\n    sampleObject.timestamp = sampleObject.boardTime + o.timeOffset;\\n  } else {\\n    sampleObject.timestamp = Date.now();\\n  }\\n\\n  // Extract the aux data\\n  sampleObject.auxData = getFromTimePacketRawAux(o.rawDataPacket);\\n\\n  // Grab the channel data.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.scale) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.scale)) o.scale = true;\\n  if (o.scale) sampleObject.channelData = getChannelDataArray(o);else sampleObject.channelDataCounts = getChannelDataArrayNoScale(o);\\n\\n  sampleObject.valid = true;\\n\\n  return sampleObject;\\n}\\n\\n/**\\n * @description Raw aux\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw time synced accel packet\\n * @returns {Impedance} - An impedance object.\\n */\\nfunction parsePacketImpedance(o) {\\n  // Ths packet has 'A0','00'....,'AA','AA','FF','FF','FF','FF','C4'\\n  //  where the 'AA's form an accel 16bit num and 'FF's form a 32 bit time in ms\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.rawDataPacket) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.rawDataPacket)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure the buffer is the right size.\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n\\n  let impedanceObject = {};\\n\\n  impedanceObject.channelNumber = o.rawDataPacket[1];\\n  if (impedanceObject.channelNumber === 5) {\\n    impedanceObject.channelNumber = 0;\\n  }\\n  impedanceObject.impedanceValue = Number(o.rawDataPacket.toString().match(/\\\\d+/)[0]);\\n\\n  return impedanceObject;\\n}\\n\\n/**\\n * Use reg ex to parse a `str` register query for a boolean `offset` from index. Throws errors\\n * @param str {String} - The string to search\\n * @param regEx {RegExp} - The key to match to\\n * @param offset {Number} - The number of bytes to offset from the index of the reg ex hit\\n * @returns {boolean} The converted and parsed value from `str`\\n */\\nfunction getBooleanFromRegisterQuery(str, regEx, offset) {\\n  let regExArr = str.match(regEx);\\n  if (regExArr) {\\n    const num = parseInt(str.charAt(regExArr.index + offset));\\n    if (!Number.isNaN(num)) {\\n      return Boolean(num);\\n    } else {\\n      throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidData);\\n    }\\n  } else {\\n    throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorMissingRegisterSetting);\\n  }\\n}\\n\\n/**\\n * Used to get the truth value fo srb1 within the system\\n * @param str {String} - The raw query data\\n * @returns {boolean}\\n */\\nfunction getSRB1FromADSRegisterQuery(str) {\\n  return getBooleanFromRegisterQuery(str, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIRegisterQueryNameMISC1, 21);\\n}\\n\\n/**\\n * Used to get bias setting from raw query\\n * @param str {String} - The raw query data\\n * @param channelNumber {Number} - Zero indexed, please send `channelNumber` directly to this function.\\n * @returns {boolean}\\n */\\nfunction getBiasSetFromADSRegisterQuery(str, channelNumber) {\\n  return getBooleanFromRegisterQuery(str, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIRegisterQueryNameBIASSENSP, 20 + channelNumber * 3);\\n}\\n\\n/**\\n * Used to get a number from the raw query data\\n * @param str {String} - The raw query data\\n * @param regEx {RegExp} - The regular expression to index off of\\n * @param offset {Number} - The number of bytes offset from index to start\\n */\\nfunction getNumFromThreeCSVADSRegisterQuery(str, regEx, offset) {\\n  let regExArr = str.match(regEx);\\n  if (regExArr) {\\n    const bit2 = parseInt(str.charAt(regExArr.index + offset));\\n    const bit1 = parseInt(str.charAt(regExArr.index + offset + 3));\\n    const bit0 = parseInt(str.charAt(regExArr.index + offset + 6));\\n    if (!Number.isNaN(bit2) && !Number.isNaN(bit1) && !Number.isNaN(bit0)) {\\n      return bit2 << 2 | bit1 << 1 | bit0;\\n    } else {\\n      throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidData);\\n    }\\n  } else {\\n    throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorMissingRegisterSetting);\\n  }\\n}\\n\\n/**\\n * Used to get bias setting from raw query\\n * @param str {String} - The raw query data\\n * @param channelSettings {ChannelSettingsObject} - Just your standard channel setting object\\n * @returns {boolean}\\n */\\nfunction setChSetFromADSRegisterQuery(str, channelSettings) {\\n  let key = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIRegisterQueryNameCHnSET[channelSettings.channelNumber];\\n  if (key === undefined) key = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIRegisterQueryNameCHnSET[channelSettings.channelNumber - __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton];\\n  channelSettings.powerDown = getBooleanFromRegisterQuery(str, key, 16);\\n  channelSettings.gain = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].gainForCommand(getNumFromThreeCSVADSRegisterQuery(str, key, 19));\\n  channelSettings.inputType = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].inputTypeForCommand(getNumFromThreeCSVADSRegisterQuery(str, key, 31));\\n  channelSettings.srb2 = getBooleanFromRegisterQuery(str, key, 28);\\n}\\n\\n/**\\n *\\n * @param o {Object}\\n * @param o.channelSettings {Array} - The standard channel settings object\\n * @param o.data {Buffer} - The buffer of raw query data\\n */\\nfunction syncChannelSettingsWithRawData(o) {\\n  // Check to make sure data is not null.\\n  if (__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.channelSettings) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.channelSettings) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isUndefined(o.data) || __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNull(o.data)) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorUndefinedOrNullInput);\\n  // Check to make sure channel settings is array\\n  if (!Array.isArray(o.channelSettings)) throw new Error(`${__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidType} channelSettings`);\\n  // Check to make sure the rawDataPacket buffer is the right size.\\n\\n  if (o.channelSettings.length === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton) {\\n    if (o.data.toString().match(/Daisy ADS/)) throw new Error('raw data mismatch - expected only cyton register info but also found daisy');\\n    if (o.data.toString().match(/Board ADS/) == null) throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidData);\\n  } else {\\n    if (o.data.toString().match(/Daisy ADS/) == null) throw new Error('raw data mismatch - expected daisy register info but none found');\\n    if (o.data.toString().match(/Board ADS/) == null) throw new Error('no Board ADS info found');\\n  }\\n\\n  o.channelSettings.forEach(cs => {\\n    if (!cs.hasOwnProperty('channelNumber') || !cs.hasOwnProperty('powerDown') || !cs.hasOwnProperty('gain') || !cs.hasOwnProperty('inputType') || !cs.hasOwnProperty('bias') || !cs.hasOwnProperty('srb2') || !cs.hasOwnProperty('srb1')) {\\n      throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorMissingRequiredProperty);\\n    }\\n  });\\n\\n  let adsDaisy = null;\\n  let usingSRB1Cyton = false;\\n  let usingSRB1Daisy = false;\\n  let regExArr = o.data.toString().match(/Board ADS/);\\n  let adsCyton = o.data.toString().slice(regExArr.index, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIRegisterQueryCyton.length);\\n  if (getSRB1FromADSRegisterQuery(adsCyton)) {\\n    usingSRB1Cyton = true;\\n  }\\n  if (o.channelSettings.length > __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton) {\\n    let regExArrDaisy = o.data.toString().match(/Daisy ADS/);\\n    adsDaisy = o.data.toString().slice(regExArrDaisy.index, regExArrDaisy.index + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIRegisterQueryCytonDaisy.length);\\n    if (getSRB1FromADSRegisterQuery(adsCyton)) {\\n      usingSRB1Daisy = true;\\n    }\\n  }\\n  o.channelSettings.forEach(\\n  /**\\n   * Set each channel\\n   * @param cs {ChannelSettingsObject}\\n   */\\n  cs => {\\n    if (cs.channelNumber < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton) {\\n      setChSetFromADSRegisterQuery(adsCyton, cs);\\n      cs.bias = getBiasSetFromADSRegisterQuery(adsCyton, cs.channelNumber);\\n      cs.srb1 = usingSRB1Cyton;\\n    } else {\\n      setChSetFromADSRegisterQuery(adsDaisy, cs);\\n      cs.bias = getBiasSetFromADSRegisterQuery(adsDaisy, cs.channelNumber - __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton);\\n      cs.srb1 = usingSRB1Daisy;\\n    }\\n  });\\n}\\n\\n/**\\n* @description Extract a time from a time packet in ms.\\n* @param dataBuf - A raw packet with 33 bytes of data\\n* @returns {Number} - Board time in milli seconds\\n* @author AJ Keller (@aj-ptw)\\n*/\\nfunction getFromTimePacketTime(dataBuf) {\\n  // Ths packet has 'A0','00'....,'00','00','FF','FF','FF','FF','C3' where the 'FF's are times\\n  const lastBytePosition = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1; // This is 33, but 0 indexed would be 32 minus 1 for the stop byte and another two for the aux channel or the\\n  if (dataBuf.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) {\\n    throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  } else {\\n    // Grab the time from the packet\\n    return dataBuf.readUInt32BE(lastBytePosition - __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketTimeByteSize);\\n  }\\n}\\n\\n/**\\n * @description Grabs an accel value from a raw but time synced packet. Important that this utilizes the fact that:\\n *      X axis data is sent with every sampleNumber % 10 === 7\\n *      Y axis data is sent with every sampleNumber % 10 === 8\\n *      Z axis data is sent with every sampleNumber % 10 === 9\\n * @param o {Object}\\n * @param o.accelArray {Array} - A 3 element array that allows us to have inter packet memory of x and y axis data and emit only on the z axis packets.\\n * @param o.rawDataPacket {Buffer} - The 33byte raw time synced accel packet\\n * @param o.scale {Boolean} - Do you want to scale the results? Default is true\\n * @returns {boolean} - A boolean that is true only when the accel array is ready to be emitted... i.e. when this is a Z axis packet\\n */\\nfunction getFromTimePacketAccel(o) {\\n  const accelNumBytes = 2;\\n  const lastBytePosition = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1 - __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketTimeByteSize - accelNumBytes; // This is 33, but 0 indexed would be 32 minus\\n\\n  if (o.rawDataPacket.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) {\\n    throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  }\\n\\n  let sampleNumber = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n  let accelCountValue = utilitiesModule.interpret16bitAsInt32(o.rawDataPacket.slice(lastBytePosition, lastBytePosition + 2));\\n  switch (sampleNumber % 10) {// The accelerometer is on a 25Hz sample rate, so every ten channel samples, we can get new data\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIAccelAxisX:\\n      o.accelArray[0] = o.scale ? accelCountValue * SCALE_FACTOR_ACCEL : accelCountValue; // slice is not inclusive on the right\\n      return false;\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIAccelAxisY:\\n      o.accelArray[1] = o.scale ? accelCountValue * SCALE_FACTOR_ACCEL : accelCountValue; // slice is not inclusive on the right\\n      return false;\\n    case __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIAccelAxisZ:\\n      o.accelArray[2] = o.scale ? accelCountValue * SCALE_FACTOR_ACCEL : accelCountValue; // slice is not inclusive on the right\\n      return true;\\n    default:\\n      return false;\\n  }\\n}\\n\\n/**\\n* @description Grabs a raw aux value from a raw but time synced packet.\\n* @param dataBuf {Buffer} - The 33byte raw time synced raw aux packet\\n* @returns {Buffer|SafeBuffer|Buffer2} - Fulfills a 2 byte buffer\\n*/\\nfunction getFromTimePacketRawAux(dataBuf) {\\n  if (dataBuf.byteLength !== __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize) {\\n    throw new Error(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIErrorInvalidByteLength);\\n  }\\n  return __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].from(dataBuf.slice(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionTimeSyncAuxStart, __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionTimeSyncAuxStop));\\n}\\n\\n/**\\n* @description Takes a buffer filled with 3 16 bit integers from an OpenBCI device and converts based on settings\\n*                  of the MPU, values are in ?\\n* @param dataBuf - Buffer that is 6 bytes long\\n* @returns {Array} - Array of floats 3 elements long\\n* @author AJ Keller (@aj-ptw)\\n*/\\nfunction getDataArrayAccel(dataBuf) {\\n  let accelData = [];\\n  for (let i = 0; i < ACCEL_NUMBER_AXIS; i++) {\\n    let index = i * 2;\\n    accelData.push(utilitiesModule.interpret16bitAsInt32(dataBuf.slice(index, index + 2)) * SCALE_FACTOR_ACCEL);\\n  }\\n  return accelData;\\n}\\n\\n/**\\n * @description Takes a buffer filled with 3 16 bit integers from an OpenBCI device and converts based on settings\\n *                  to an int\\n * @param dataBuf - Buffer that is 6 bytes long\\n * @returns {Array} - Array of floats 3 elements long\\n * @author AJ Keller (@aj-ptw)\\n */\\nfunction getDataArrayAccelNoScale(dataBuf) {\\n  let accelData = [];\\n  for (let i = 0; i < ACCEL_NUMBER_AXIS; i++) {\\n    let index = i * 2;\\n    accelData.push(utilitiesModule.interpret16bitAsInt32(dataBuf.slice(index, index + 2)));\\n  }\\n  return accelData;\\n}\\n\\n/**\\n * @description Takes a buffer filled with 24 bit signed integers from an OpenBCI device with gain settings in\\n *                  channelSettingsArray[index].gain and converts based on settings of ADS1299... spits out an\\n *                  array of floats in VOLTS\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw time synced accel packet\\n * @param o.channelSettings {Array} - An array of channel settings that is an Array that has shape similar to the one\\n *                  calling k.channelSettingsArrayInit(). The most important rule here is that it is\\n *                  Array of objects that have key-value pair {gain:NUMBER}\\n * @param o.scale {Boolean} - Do you want to scale the results? Default is true\\n * @param o.lastSampleNumber {Number} - The last sample number\\n * @param o.protocol {String} - Either `Serial` or `Wifi` (Default is `Wifi`)\\n * @returns {Array} - Array filled with floats for each channel's voltage in VOLTS\\n * @author AJ Keller (@aj-ptw)\\n */\\nfunction getChannelDataArray(o) {\\n  if (!Array.isArray(o.channelSettings)) {\\n    throw new Error('Error [getChannelDataArray]: Channel Settings must be an array!');\\n  }\\n  if (!o.hasOwnProperty('protocol')) {\\n    o.protocol = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIProtocolSerial;\\n  }\\n  let channelData = [];\\n  // Grab the sample number from the buffer\\n  const numChannels = o.channelSettings.length;\\n  const sampleNumber = o.rawDataPacket[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionSampleNumber];\\n  const daisy = numChannels === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDaisy;\\n  let channelsInPacket = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton;\\n  if (!daisy) channelsInPacket = o.channelSettings.length;\\n  // Channel data arrays are always 8 long\\n  for (let i = 0; i < channelsInPacket; i++) {\\n    if (!o.channelSettings[i].hasOwnProperty('gain')) {\\n      throw new Error(`Error [getChannelDataArray]: Invalid channel settings object at index ${i}`);\\n    }\\n    if (!__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].isNumber(o.channelSettings[i].gain)) {\\n      throw new Error('Error [getChannelDataArray]: Property gain of channelSettingsObject not or type Number');\\n    }\\n\\n    let scaleFactor = 0;\\n\\n    if (o.protocol === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIProtocolSerial) {\\n      if (isEven(sampleNumber) && daisy) {\\n        scaleFactor = ADS1299_VREF / o.channelSettings[i + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault].gain / (Math.pow(2, 23) - 1);\\n      } else {\\n        scaleFactor = ADS1299_VREF / o.channelSettings[i].gain / (Math.pow(2, 23) - 1);\\n      }\\n    } else if (o.protocol === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIProtocolWifi) {\\n      if (daisy) {\\n        if (o.lastSampleNumber === sampleNumber) {\\n          scaleFactor = ADS1299_VREF / o.channelSettings[i + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault].gain / (Math.pow(2, 23) - 1);\\n        } else {\\n          scaleFactor = ADS1299_VREF / o.channelSettings[i].gain / (Math.pow(2, 23) - 1);\\n        }\\n      } else if (o.channelSettings.length === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsCyton) {\\n        scaleFactor = ADS1299_VREF / o.channelSettings[i].gain / (Math.pow(2, 23) - 1);\\n      } else {\\n        scaleFactor = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIGanglionScaleFactorPerCountVolts;\\n      }\\n    } else if (o.protocol === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIProtocolBLE) {\\n      // For cyton ble not ganglion\\n      scaleFactor = ADS1299_VREF / o.channelSettings[i].gain / (Math.pow(2, 23) - 1);\\n    } else {\\n      throw new Error('Error [getChannelDataArray]: Invalid protocol must be wifi or serial');\\n    }\\n\\n    // Convert the three byte signed integer and convert it\\n    channelData.push(scaleFactor * utilitiesModule.interpret24bitAsInt32(o.rawDataPacket.slice(i * 3 + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart, i * 3 + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart + 3)));\\n  }\\n  return channelData;\\n}\\n\\n/**\\n * @description Takes a buffer filled with 24 bit signed integers from an OpenBCI device converts to array of counts\\n * @param o {Object} - The input object\\n * @param o.rawDataPacket {Buffer} - The 33byte raw time synced accel packet\\n * @param o.channelSettings {Array} - An array of channel settings that is an Array that has shape similar to the one\\n *                  calling k.channelSettingsArrayInit(). The most important rule here is that it is\\n *                  Array of objects that have key-value pair {gain:NUMBER}\\n * @returns {Array} - Array filled with floats for each channel's voltage in VOLTS\\n * @author AJ Keller (@aj-ptw)\\n */\\nfunction getChannelDataArrayNoScale(o) {\\n  if (!Array.isArray(o.channelSettings)) {\\n    throw new Error('Error [getChannelDataArrayNoScale]: Channel Settings must be an array!');\\n  }\\n  let channelData = [];\\n  let numChannels = o.channelSettings.length;\\n  if (numChannels > __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault) {\\n    numChannels = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault;\\n  }\\n  // Channel data arrays cannot be more than 8\\n  for (let i = 0; i < numChannels; i++) {\\n    // Convert the three byte signed integer and convert it\\n    channelData.push(utilitiesModule.interpret24bitAsInt32(o.rawDataPacket.slice(i * 3 + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart, i * 3 + __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketPositionChannelDataStart + 3)));\\n  }\\n  return channelData;\\n}\\n\\nfunction getRawPacketType(stopByte) {\\n  return stopByte & 0xF;\\n}\\n\\n/**\\n* @description This method is useful for normalizing sample numbers for fake sample packets. This is intended to be\\n*      useful for the simulator and automated testing.\\n* @param sampleNumber {Number} - The sample number you want to assign to the packet\\n* @returns {Number} - The normalized input `sampleNumber` between 0-255\\n*/\\nfunction sampleNumberNormalize(sampleNumber) {\\n  if (sampleNumber || sampleNumber === 0) {\\n    if (sampleNumber > 255) {\\n      sampleNumber = 255;\\n    }\\n  } else {\\n    sampleNumber = 0x45;\\n  }\\n  return sampleNumber;\\n}\\n\\nfunction newSample(sampleNumber) {\\n  if (sampleNumber || sampleNumber === 0) {\\n    if (sampleNumber > 255) {\\n      sampleNumber = 255;\\n    }\\n  } else {\\n    sampleNumber = 0;\\n  }\\n  return {\\n    startByte: __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart,\\n    sampleNumber: sampleNumber,\\n    channelData: [],\\n    accelData: [],\\n    auxData: null,\\n    stopByte: __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStop,\\n    boardTime: 0,\\n    timestamp: 0,\\n    valid: true\\n  };\\n}\\n\\nfunction newSampleNoScale(sampleNumber) {\\n  if (sampleNumber || sampleNumber === 0) {\\n    if (sampleNumber > 255) {\\n      sampleNumber = 255;\\n    }\\n  } else {\\n    sampleNumber = 0;\\n  }\\n  return {\\n    startByte: __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart,\\n    sampleNumber: sampleNumber,\\n    channelDataCounts: [],\\n    accelDataCounts: [],\\n    auxData: null,\\n    stopByte: __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStop,\\n    boardTime: 0,\\n    timestamp: 0,\\n    valid: true\\n  };\\n}\\n\\n/**\\n* @description Convert float number into three byte buffer. This is the opposite of .interpret24bitAsInt32()\\n* @param float - The number you want to convert\\n* @returns {Buffer} - 3-byte buffer containing the float\\n*/\\nfunction floatTo3ByteBuffer(float) {\\n  let intBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](3); // 3 bytes for 24 bits\\n  intBuf.fill(0); // Fill the buffer with 0s\\n\\n  let temp = float / (ADS1299_VREF / 24 / (Math.pow(2, 23) - 1)); // Convert to counts\\n\\n  temp = Math.floor(temp); // Truncate counts number\\n\\n  // Move into buffer\\n  intBuf[2] = temp & 255;\\n  intBuf[1] = (temp & 255 << 8) >> 8;\\n  intBuf[0] = (temp & 255 << 16) >> 16;\\n\\n  return intBuf;\\n}\\n\\n/**\\n* @description Convert float number into three byte buffer. This is the opposite of .interpret24bitAsInt32()\\n* @param float - The number you want to convert\\n* @returns {buffer} - 3-byte buffer containing the float\\n*/\\nfunction floatTo2ByteBuffer(float) {\\n  let intBuf = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](2); // 2 bytes for 16 bits\\n  intBuf.fill(0); // Fill the buffer with 0s\\n\\n  let temp = float / SCALE_FACTOR_ACCEL; // Convert to counts\\n\\n  temp = Math.floor(temp); // Truncate counts number\\n\\n  // console.log('Num: ' + temp)\\n\\n  // Move into buffer\\n  intBuf[1] = temp & 255;\\n  intBuf[0] = (temp & 255 << 8) >> 8;\\n\\n  return intBuf;\\n}\\n\\n/**\\n* @description Used to make one sample object from two sample objects. The sample number of the new daisy sample will\\n*      be the upperSampleObject's sample number divded by 2. This allows us to preserve consecutive sample numbers that\\n*      flip over at 127 instead of 255 for an 8 channel. The daisySampleObject will also have one `channelData` array\\n*      with 16 elements inside it, with the lowerSampleObject in the lower indices and the upperSampleObject in the\\n*      upper set of indices. The auxData from both channels shall be captured in an object called `auxData` which\\n*      contains two arrays referenced by keys `lower` and `upper` for the `lowerSampleObject` and `upperSampleObject`,\\n*      respectively. The timestamps shall be averaged and moved into an object called `timestamp`. Further, the\\n*      un-averaged timestamps from the `lowerSampleObject` and `upperSampleObject` shall be placed into an object called\\n*      `_timestamps` which shall contain two keys `lower` and `upper` which contain the original timestamps for their\\n*      respective sampleObjects.\\n* @param lowerSampleObject {Object} - Lower 8 channels with odd sample number\\n* @param upperSampleObject {Object} - Upper 8 channels with even sample number\\n* @returns {Object} - The new merged daisy sample object\\n*/\\nfunction makeDaisySampleObject(lowerSampleObject, upperSampleObject) {\\n  let daisySampleObject = {};\\n\\n  if (lowerSampleObject.hasOwnProperty('channelData')) {\\n    daisySampleObject.channelData = lowerSampleObject.channelData.concat(upperSampleObject.channelData);\\n  }\\n\\n  if (lowerSampleObject.hasOwnProperty('channelDataCounts')) {\\n    daisySampleObject.channelDataCounts = lowerSampleObject.channelDataCounts.concat(upperSampleObject.channelDataCounts);\\n  }\\n\\n  daisySampleObject.sampleNumber = Math.floor(upperSampleObject.sampleNumber / 2);\\n\\n  daisySampleObject.auxData = {\\n    'lower': lowerSampleObject.auxData,\\n    'upper': upperSampleObject.auxData\\n  };\\n\\n  daisySampleObject.stopByte = lowerSampleObject.stopByte;\\n\\n  daisySampleObject.timestamp = (lowerSampleObject.timestamp + upperSampleObject.timestamp) / 2;\\n\\n  daisySampleObject['_timestamps'] = {\\n    'lower': lowerSampleObject.timestamp,\\n    'upper': upperSampleObject.timestamp\\n  };\\n\\n  if (lowerSampleObject.hasOwnProperty('accelData')) {\\n    if (lowerSampleObject.accelData[0] > 0 || lowerSampleObject.accelData[1] > 0 || lowerSampleObject.accelData[2] > 0) {\\n      daisySampleObject.accelData = lowerSampleObject.accelData;\\n    } else {\\n      daisySampleObject.accelData = upperSampleObject.accelData;\\n    }\\n  }\\n\\n  if (lowerSampleObject.hasOwnProperty('accelDataCounts')) {\\n    if (lowerSampleObject.accelDataCounts[0] > 0 || lowerSampleObject.accelDataCounts[1] > 0 || lowerSampleObject.accelDataCounts[2] > 0) {\\n      daisySampleObject.accelDataCounts = lowerSampleObject.accelDataCounts;\\n    } else {\\n      daisySampleObject.accelDataCounts = upperSampleObject.accelDataCounts;\\n    }\\n  }\\n\\n  daisySampleObject.valid = true;\\n\\n  return daisySampleObject;\\n}\\n\\n/**\\n * @description Used to make one sample object from two sample objects. The sample number of the new daisy sample will\\n *      be the upperSampleObject's sample number divded by 2. This allows us to preserve consecutive sample numbers that\\n *      flip over at 127 instead of 255 for an 8 channel. The daisySampleObject will also have one `channelData` array\\n *      with 16 elements inside it, with the lowerSampleObject in the lower indices and the upperSampleObject in the\\n *      upper set of indices. The auxData from both channels shall be captured in an object called `auxData` which\\n *      contains two arrays referenced by keys `lower` and `upper` for the `lowerSampleObject` and `upperSampleObject`,\\n *      respectively. The timestamps shall be averaged and moved into an object called `timestamp`. Further, the\\n *      un-averaged timestamps from the `lowerSampleObject` and `upperSampleObject` shall be placed into an object called\\n *      `_timestamps` which shall contain two keys `lower` and `upper` which contain the original timestamps for their\\n *      respective sampleObjects.\\n * @param lowerSampleObject {Object} - Lower 8 channels with odd sample number\\n * @param upperSampleObject {Object} - Upper 8 channels with even sample number\\n * @returns {Object} - The new merged daisy sample object\\n */\\nfunction makeDaisySampleObjectWifi(lowerSampleObject, upperSampleObject) {\\n  let daisySampleObject = {};\\n\\n  if (lowerSampleObject.hasOwnProperty('channelData')) {\\n    daisySampleObject['channelData'] = lowerSampleObject.channelData.concat(upperSampleObject.channelData);\\n  }\\n\\n  if (lowerSampleObject.hasOwnProperty('channelDataCounts')) {\\n    daisySampleObject['channelDataCounts'] = lowerSampleObject.channelDataCounts.concat(upperSampleObject.channelDataCounts);\\n  }\\n\\n  daisySampleObject['sampleNumber'] = upperSampleObject.sampleNumber;\\n\\n  daisySampleObject['auxData'] = {\\n    'lower': lowerSampleObject.auxData,\\n    'upper': upperSampleObject.auxData\\n  };\\n\\n  if (lowerSampleObject.hasOwnProperty('timestamp')) {\\n    daisySampleObject['timestamp'] = lowerSampleObject.timestamp;\\n  }\\n\\n  daisySampleObject.stopByte = lowerSampleObject.stopByte;\\n\\n  daisySampleObject['_timestamps'] = {\\n    'lower': lowerSampleObject.timestamp,\\n    'upper': upperSampleObject.timestamp\\n  };\\n\\n  if (lowerSampleObject.hasOwnProperty('accelData')) {\\n    if (lowerSampleObject.accelData[0] > 0 || lowerSampleObject.accelData[1] > 0 || lowerSampleObject.accelData[2] > 0) {\\n      daisySampleObject.accelData = lowerSampleObject.accelData;\\n    } else {\\n      daisySampleObject.accelData = upperSampleObject.accelData;\\n    }\\n  }\\n\\n  if (lowerSampleObject.hasOwnProperty('accelDataCounts')) {\\n    if (lowerSampleObject.accelDataCounts[0] > 0 || lowerSampleObject.accelDataCounts[1] > 0 || lowerSampleObject.accelDataCounts[2] > 0) {\\n      daisySampleObject.accelDataCounts = lowerSampleObject.accelDataCounts;\\n    } else {\\n      daisySampleObject.accelDataCounts = upperSampleObject.accelDataCounts;\\n    }\\n  }\\n\\n  daisySampleObject['valid'] = true;\\n\\n  return daisySampleObject;\\n}\\n\\n/**\\n* @description Used to test a number to see if it is even\\n* @param a {Number} - The number to test\\n* @returns {boolean} - True if `a` is even\\n*/\\nfunction isEven(a) {\\n  return a % 2 === 0;\\n}\\n/**\\n* @description Used to test a number to see if it is odd\\n* @param a {Number} - The number to test\\n* @returns {boolean} - True if `a` is odd\\n*/\\nfunction isOdd(a) {\\n  return a % 2 === 1;\\n}\\n\\n/**\\n* @description Since we know exactly what this input will look like (See the hardware firmware) we can program this\\n*      function with prior knowledge.\\n* @param dataBuffer {Buffer} - The buffer you want to parse.\\n* @return {Number} - The number of \\\"ADS1299\\\" present in the `dataBuffer`\\n*/\\nfunction countADSPresent(dataBuffer) {\\n  const s = new __WEBPACK_IMPORTED_MODULE_2_streamsearch___default.a(new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"]('ADS1299'));\\n\\n  // Clear the buffer\\n  s.reset();\\n\\n  // Push the new data buffer. This runs the search.\\n  s.push(dataBuffer);\\n\\n  // Check and see if there is a match\\n  return s.matches;\\n}\\n\\n/**\\n* @description Searchs the buffer for a \\\"$$$\\\" or as we call an EOT\\n* @param dataBuffer - The buffer of some length to parse\\n* @returns {boolean} - True if the `$$$` was found.\\n*/\\n// TODO: StreamSearch is optimized to search incoming chunks of data, streaming in,\\n//       but a new search is constructed here with every call.  This is not making use\\n//       of StreamSearch's optimizations; the object should be preserved between chunks,\\n//       and only fed the new data.  TODO: also check other uses of StreamSearch\\nfunction doesBufferHaveEOT(dataBuffer) {\\n  const s = new __WEBPACK_IMPORTED_MODULE_2_streamsearch___default.a(new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIParseEOT));\\n\\n  // Clear the buffer\\n  s.reset();\\n\\n  // Push the new data buffer. This runs the search.\\n  s.push(dataBuffer);\\n\\n  // Check and see if there is a match\\n  return s.matches >= 1;\\n}\\n\\n/**\\n * Used to extract the major version from\\n * @param dataBuffer\\n * @return {*}\\n */\\nfunction getFirmware(dataBuffer) {\\n  const regexPattern = /v\\\\d.\\\\d.\\\\d/;\\n  const ret = dataBuffer.toString().match(regexPattern);\\n  if (ret) {\\n    const elems = ret[0].split('.');\\n    return {\\n      major: Number(elems[0][1]),\\n      minor: Number(elems[1]),\\n      patch: Number(elems[2])\\n    };\\n  } else return ret;\\n}\\n\\n/**\\n* @description Used to parse a buffer for the word `Failure` that is acked back after private radio msg on failure\\n* @param dataBuffer {Buffer} - The buffer of some length to parse\\n* @returns {boolean} - True if `Failure` was found.\\n*/\\nfunction isFailureInBuffer(dataBuffer) {\\n  const s = new __WEBPACK_IMPORTED_MODULE_2_streamsearch___default.a(new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIParseFailure));\\n\\n  // Clear the buffer\\n  s.reset();\\n\\n  // Push the new data buffer. This runs the search.\\n  s.push(dataBuffer);\\n\\n  // Check and see if there is a match\\n  return s.matches >= 1;\\n}\\n\\n/**\\n* @description Used to parse a buffer for the word `Success` that is acked back after private radio msg on success\\n* @param dataBuffer {Buffer} - The buffer of some length to parse\\n* @returns {boolean} - True if `Success` was found.\\n*/\\nfunction isSuccessInBuffer(dataBuffer) {\\n  const s = new __WEBPACK_IMPORTED_MODULE_2_streamsearch___default.a(new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIParseSuccess));\\n\\n  // Clear the buffer\\n  s.reset();\\n\\n  // Push the new data buffer. This runs the search.\\n  s.push(dataBuffer);\\n\\n  // Check and see if there is a match\\n  return s.matches >= 1;\\n}\\n\\n/**\\n * @description Used to slice a buffer for the EOT '$$$'.\\n * @param dataBuffer {Buffer} - The buffer of some length to parse\\n * @returns {Buffer} - The remaining buffer.\\n */\\nfunction stripToEOTBuffer(dataBuffer) {\\n  let indexOfEOT = dataBuffer.indexOf(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIParseEOT);\\n  if (indexOfEOT >= 0) {\\n    indexOfEOT += __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIParseEOT.length;\\n  } else {\\n    return dataBuffer;\\n  }\\n\\n  if (indexOfEOT < dataBuffer.byteLength) {\\n    return __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"].from(dataBuffer.slice(indexOfEOT));\\n  } else {\\n    return null;\\n  }\\n}\\n\\n/**\\n* @description Used to parse a buffer for the `,` character that is acked back after a time sync request is sent\\n* @param dataBuffer {Buffer} - The buffer of some length to parse\\n* @returns {boolean} - True if the `,` was found.\\n*/\\nfunction isTimeSyncSetConfirmationInBuffer(dataBuffer) {\\n  if (dataBuffer) {\\n    let bufferLength = dataBuffer.length;\\n    switch (bufferLength) {\\n      case 0:\\n        return false;\\n      case 1:\\n        return dataBuffer[0] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISyncTimeSent.charCodeAt(0);\\n      case 2:\\n        // HEAD Byte at End\\n        if (dataBuffer[1] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) {\\n          return dataBuffer[0] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISyncTimeSent.charCodeAt(0);\\n          // TAIL byte in front\\n        } else if (isStopByte(dataBuffer[0])) {\\n          return dataBuffer[1] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISyncTimeSent.charCodeAt(0);\\n        } else {\\n          return false;\\n        }\\n      default:\\n        if (dataBuffer[0] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISyncTimeSent.charCodeAt(0) && dataBuffer[1] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) {\\n          return true;\\n        }\\n        for (let i = 1; i < bufferLength; i++) {\\n          // The base case (last one)\\n          // console.log(i)\\n          if (i === bufferLength - 1) {\\n            if (isStopByte(dataBuffer[i - 1])) {\\n              return dataBuffer[i] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISyncTimeSent.charCodeAt(0);\\n            }\\n          } else {\\n            // Wedged\\n            if (isStopByte(dataBuffer[i - 1]) && dataBuffer[i + 1] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart) {\\n              return dataBuffer[i] === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCISyncTimeSent.charCodeAt(0);\\n              // TAIL byte in front\\n            }\\n          }\\n        }\\n        return false;\\n    }\\n  }\\n}\\n\\n/**\\n* @description Mainly used by the simulator to convert a randomly generated sample into a std OpenBCI V3 Packet\\n* @param sample {Object} - A sample object\\n* @param time {Number} - The time to inject into the sample.\\n* @param rawAux {Buffer} - 2 byte buffer to inject into sample\\n* @returns {Buffer} - A time sync raw aux packet\\n*/\\nfunction convertSampleToPacketRawAuxTimeSynced(sample, time, rawAux) {\\n  let packetBuffer = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize);\\n  packetBuffer.fill(0);\\n\\n  // start byte\\n  packetBuffer[0] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart;\\n\\n  // sample number\\n  packetBuffer[1] = sample.sampleNumber;\\n\\n  // channel data\\n  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault; i++) {\\n    let threeByteBuffer = floatTo3ByteBuffer(sample.channelData[i]);\\n\\n    threeByteBuffer.copy(packetBuffer, 2 + i * 3);\\n  }\\n\\n  // Write the raw aux bytes\\n  rawAux.copy(packetBuffer, 26);\\n\\n  // Write the time\\n  packetBuffer.writeInt32BE(time, 28);\\n\\n  // stop byte\\n  packetBuffer[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1] = makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketRawAuxTimeSynced);\\n\\n  return packetBuffer;\\n}\\n\\n/**\\n* @description Mainly used by the simulator to convert a randomly generated sample into a std OpenBCI V3 Packet\\n* @param sample {Object} - A sample object\\n* @param time {Number} - The time to inject into the sample.\\n* @returns {Buffer} - A time sync accel packet\\n*/\\nfunction convertSampleToPacketAccelTimeSynced(sample, time) {\\n  let packetBuffer = new __WEBPACK_IMPORTED_MODULE_3_buffer___[\\\"Buffer\\\"](__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize);\\n  packetBuffer.fill(0);\\n\\n  // start byte\\n  packetBuffer[0] = __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStart;\\n\\n  // sample number\\n  packetBuffer[1] = sample.sampleNumber;\\n\\n  // channel data\\n  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCINumberOfChannelsDefault; i++) {\\n    let threeByteBuffer = floatTo3ByteBuffer(sample.channelData[i]);\\n\\n    threeByteBuffer.copy(packetBuffer, 2 + i * 3);\\n  }\\n\\n  packetBuffer.writeInt32BE(time, 28);\\n\\n  // stop byte\\n  packetBuffer[__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIPacketSize - 1] = makeTailByteFromPacketType(__WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIStreamPacketAccelTimeSynced);\\n\\n  return packetBuffer;\\n}\\n\\n/**\\n* @description Converts a packet type {Number} into a OpenBCI stop byte\\n* @param type {Number} - The number to smash on to the stop byte. Must be 0-15,\\n*          out of bounds input will result in a 0\\n* @return {Number} - A properly formatted OpenBCI stop byte\\n*/\\nfunction makeTailByteFromPacketType(type) {\\n  if (type < 0 || type > 15) {\\n    type = 0;\\n  }\\n  return __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStop | type;\\n}\\n\\n/**\\n* @description Used to check and see if a byte adheres to the stop byte structure of 0xCx where x is the set of\\n*      numbers from 0-F in hex of 0-15 in decimal.\\n* @param byte {Number} - The number to test\\n* @returns {boolean} - True if `byte` follows the correct form\\n* @author AJ Keller (@aj-ptw)\\n*/\\nfunction isStopByte(byte) {\\n  return (byte & 0xF0) === __WEBPACK_IMPORTED_MODULE_1__constants__[\\\"default\\\"].OBCIByteStop;\\n}\\n\\n/* harmony default export */ __webpack_exports__[\\\"default\\\"] = (utilitiesModule);\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./src/utilities.js\\n// module id = 7\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./src/utilities.js?\");\n\n/***/ }),\n/* 8 */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"(function(exports) {\\n\\n  // Complementary error function\\n  // From Numerical Recipes in C 2e p221\\n  var erfc = function(x) {\\n    var z = Math.abs(x);\\n    var t = 1 / (1 + z / 2);\\n    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +\\n            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +\\n            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +\\n            t * (-0.82215223 + t * 0.17087277)))))))))\\n    return x >= 0 ? r : 2 - r;\\n  };\\n\\n  // Inverse complementary error function\\n  // From Numerical Recipes 3e p265\\n  var ierfc = function(x) {\\n    if (x >= 2) { return -100; }\\n    if (x <= 0) { return 100; }\\n\\n    var xx = (x < 1) ? x : 2 - x;\\n    var t = Math.sqrt(-2 * Math.log(xx / 2));\\n\\n    var r = -0.70711 * ((2.30753 + t * 0.27061) /\\n            (1 + t * (0.99229 + t * 0.04481)) - t);\\n\\n    for (var j = 0; j < 2; j++) {\\n      var err = erfc(r) - xx;\\n      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);\\n    }\\n\\n    return (x < 1) ? r : -r;\\n  };\\n\\n  // Models the normal distribution\\n  var Gaussian = function(mean, variance) {\\n    if (variance <= 0) {\\n      throw new Error('Variance must be > 0 (but was ' + variance + ')');\\n    }\\n    this.mean = mean;\\n    this.variance = variance;\\n    this.standardDeviation = Math.sqrt(variance);\\n  }\\n\\n  // Probability density function\\n  Gaussian.prototype.pdf = function(x) {\\n    var m = this.standardDeviation * Math.sqrt(2 * Math.PI);\\n    var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));\\n    return e / m;\\n  };\\n\\n  // Cumulative density function\\n  Gaussian.prototype.cdf = function(x) {\\n    return 0.5 * erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));\\n  };\\n\\n  // Percent point function\\n  Gaussian.prototype.ppf = function(x) {\\n    return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);\\n  };\\n\\n  // Product distribution of this and d (scale for constant)\\n  Gaussian.prototype.mul = function(d) {\\n    if (typeof(d) === \\\"number\\\") {\\n      return this.scale(d);\\n    }\\n    var precision = 1 / this.variance;\\n    var dprecision = 1 / d.variance;\\n    return fromPrecisionMean(\\n        precision + dprecision, \\n        precision * this.mean + dprecision * d.mean);\\n  };\\n\\n  // Quotient distribution of this and d (scale for constant)\\n  Gaussian.prototype.div = function(d) {\\n    if (typeof(d) === \\\"number\\\") {\\n      return this.scale(1 / d);\\n    }\\n    var precision = 1 / this.variance;\\n    var dprecision = 1 / d.variance;\\n    return fromPrecisionMean(\\n        precision - dprecision, \\n        precision * this.mean - dprecision * d.mean);\\n  };\\n\\n  // Addition of this and d\\n  Gaussian.prototype.add = function(d) {\\n    return gaussian(this.mean + d.mean, this.variance + d.variance);\\n  };\\n\\n  // Subtraction of this and d\\n  Gaussian.prototype.sub = function(d) {\\n    return gaussian(this.mean - d.mean, this.variance + d.variance);\\n  };\\n\\n  // Scale this by constant c\\n  Gaussian.prototype.scale = function(c) {\\n    return gaussian(this.mean * c, this.variance * c * c);\\n  };\\n\\n  var gaussian = function(mean, variance) {\\n    return new Gaussian(mean, variance);\\n  };\\n\\n  var fromPrecisionMean = function(precision, precisionmean) {\\n    return gaussian(precisionmean / precision, 1 / precision);\\n  };\\n\\n  exports(gaussian);\\n})\\n( true\\n    ? function(e) { module.exports = e; }\\n    : function(e) { this[\\\"gaussian\\\"] = e; });\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/gaussian/lib/gaussian.js\\n// module id = 8\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/gaussian/lib/gaussian.js?\");\n\n/***/ }),\n/* 9 */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"/* WEBPACK VAR INJECTION */(function(Buffer) {/*\\n  Based heavily on the Streaming Boyer-Moore-Horspool C++ implementation\\n  by Hongli Lai at: https://github.com/FooBarWidget/boyer-moore-horspool\\n*/\\nvar EventEmitter = __webpack_require__(10).EventEmitter,\\n    inherits = __webpack_require__(11).inherits;\\n\\nfunction jsmemcmp(buf1, pos1, buf2, pos2, num) {\\n  for (var i = 0; i < num; ++i, ++pos1, ++pos2)\\n    if (buf1[pos1] !== buf2[pos2])\\n      return false;\\n  return true;\\n}\\n\\nfunction SBMH(needle) {\\n  if (typeof needle === 'string')\\n    needle = new Buffer(needle);\\n  var i, j, needle_len = needle.length;\\n\\n  this.maxMatches = Infinity;\\n  this.matches = 0;\\n\\n  this._occ = new Array(256);\\n  this._lookbehind_size = 0;\\n  this._needle = needle;\\n  this._bufpos = 0;\\n\\n  this._lookbehind = new Buffer(needle_len);\\n\\n  // Initialize occurrence table.\\n  for (j = 0; j < 256; ++j)\\n    this._occ[j] = needle_len;\\n\\n  // Populate occurrence table with analysis of the needle,\\n  // ignoring last letter.\\n  if (needle_len >= 1) {\\n    for (i = 0; i < needle_len - 1; ++i)\\n      this._occ[needle[i]] = needle_len - 1 - i;\\n  }\\n}\\ninherits(SBMH, EventEmitter);\\n\\nSBMH.prototype.reset = function() {\\n  this._lookbehind_size = 0;\\n  this.matches = 0;\\n  this._bufpos = 0;\\n};\\n\\nSBMH.prototype.push = function(chunk, pos) {\\n  var r, chlen;\\n  if (!Buffer.isBuffer(chunk))\\n    chunk = new Buffer(chunk, 'binary');\\n  chlen = chunk.length;\\n  this._bufpos = pos || 0;\\n  while (r !== chlen && this.matches < this.maxMatches)\\n    r = this._sbmh_feed(chunk);\\n  return r;\\n};\\n\\nSBMH.prototype._sbmh_feed = function(data) {\\n  var len = data.length, needle = this._needle, needle_len = needle.length;\\n\\n  // Positive: points to a position in `data`\\n  //           pos == 3 points to data[3]\\n  // Negative: points to a position in the lookbehind buffer\\n  //           pos == -2 points to lookbehind[lookbehind_size - 2]\\n  var pos = -this._lookbehind_size,\\n      last_needle_char = needle[needle_len - 1],\\n      occ = this._occ,\\n      lookbehind = this._lookbehind;\\n\\n  if (pos < 0) {\\n    // Lookbehind buffer is not empty. Perform Boyer-Moore-Horspool\\n    // search with character lookup code that considers both the\\n    // lookbehind buffer and the current round's haystack data.\\n    //\\n    // Loop until\\n    //   there is a match.\\n    // or until\\n    //   we've moved past the position that requires the\\n    //   lookbehind buffer. In this case we switch to the\\n    //   optimized loop.\\n    // or until\\n    //   the character to look at lies outside the haystack.\\n    while (pos < 0 && pos <= len - needle_len) {\\n       var ch = this._sbmh_lookup_char(data, pos + needle_len - 1);\\n\\n      if (ch === last_needle_char\\n          && this._sbmh_memcmp(data, pos, needle_len - 1)) {\\n        this._lookbehind_size = 0;\\n        ++this.matches;\\n        if (pos > -this._lookbehind_size)\\n          this.emit('info', true, lookbehind, 0, this._lookbehind_size + pos);\\n        else\\n          this.emit('info', true);\\n\\n        this._bufpos = pos + needle_len;\\n        return pos + needle_len;\\n      } else\\n        pos += occ[ch];\\n    }\\n\\n    // No match.\\n\\n    if (pos < 0) {\\n      // There's too few data for Boyer-Moore-Horspool to run,\\n      // so let's use a different algorithm to skip as much as\\n      // we can.\\n      // Forward pos until\\n      //   the trailing part of lookbehind + data\\n      //   looks like the beginning of the needle\\n      // or until\\n      //   pos == 0\\n      while (pos < 0 && !this._sbmh_memcmp(data, pos, len - pos))\\n        pos++;\\n    }\\n\\n    if (pos >= 0) {\\n      // Discard lookbehind buffer.\\n      this.emit('info', false, lookbehind, 0, this._lookbehind_size);\\n      this._lookbehind_size = 0;\\n    } else {\\n      // Cut off part of the lookbehind buffer that has\\n      // been processed and append the entire haystack\\n      // into it.\\n      var bytesToCutOff = this._lookbehind_size + pos;\\n\\n      if (bytesToCutOff > 0) {\\n        // The cut off data is guaranteed not to contain the needle.\\n        this.emit('info', false, lookbehind, 0, bytesToCutOff);\\n      }\\n\\n      lookbehind.copy(lookbehind, 0, bytesToCutOff,\\n                      this._lookbehind_size - bytesToCutOff);\\n      this._lookbehind_size -= bytesToCutOff;\\n\\n      data.copy(lookbehind, this._lookbehind_size);\\n      this._lookbehind_size += len;\\n\\n      this._bufpos = len;\\n      return len;\\n    }\\n  }\\n\\n  if (pos >= 0)\\n    pos += this._bufpos;\\n\\n  // Lookbehind buffer is now empty. Perform Boyer-Moore-Horspool\\n  // search with optimized character lookup code that only considers\\n  // the current round's haystack data.\\n  while (pos <= len - needle_len) {\\n    var ch = data[pos + needle_len - 1];\\n\\n    if (ch === last_needle_char\\n        && data[pos] === needle[0]\\n        && jsmemcmp(needle, 0, data, pos, needle_len - 1)) {\\n      ++this.matches;\\n      if (pos > 0)\\n        this.emit('info', true, data, this._bufpos, pos);\\n      else\\n        this.emit('info', true);\\n\\n      this._bufpos = pos + needle_len;\\n      return pos + needle_len;\\n    } else\\n      pos += occ[ch];\\n  }\\n\\n  // There was no match. If there's trailing haystack data that we cannot\\n  // match yet using the Boyer-Moore-Horspool algorithm (because the trailing\\n  // data is less than the needle size) then match using a modified\\n  // algorithm that starts matching from the beginning instead of the end.\\n  // Whatever trailing data is left after running this algorithm is added to\\n  // the lookbehind buffer.\\n  if (pos < len) {\\n    while (pos < len && (data[pos] !== needle[0]\\n                         || !jsmemcmp(data, pos, needle, 0, len - pos))) {\\n      ++pos;\\n    }\\n    if (pos < len) {\\n      data.copy(lookbehind, 0, pos, pos + (len - pos));\\n      this._lookbehind_size = len - pos;\\n    }\\n  }\\n\\n  // Everything until pos is guaranteed not to contain needle data.\\n  if (pos > 0)\\n    this.emit('info', false, data, this._bufpos, pos < len ? pos : len);\\n\\n  this._bufpos = len;\\n  return len;\\n};\\n\\nSBMH.prototype._sbmh_lookup_char = function(data, pos) {\\n  if (pos < 0)\\n    return this._lookbehind[this._lookbehind_size + pos];\\n  else\\n    return data[pos];\\n}\\n\\nSBMH.prototype._sbmh_memcmp = function(data, pos, len) {\\n  var i = 0;\\n\\n  while (i < len) {\\n    if (this._sbmh_lookup_char(data, pos + i) === this._needle[i])\\n      ++i;\\n    else\\n      return false;\\n  }\\n  return true;\\n}\\n\\nmodule.exports = SBMH;\\n\\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).Buffer))\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/streamsearch/lib/sbmh.js\\n// module id = 9\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/streamsearch/lib/sbmh.js?\");\n\n/***/ }),\n/* 10 */\n/***/ (function(module, exports) {\n\neval(\"// Copyright Joyent, Inc. and other Node contributors.\\n//\\n// Permission is hereby granted, free of charge, to any person obtaining a\\n// copy of this software and associated documentation files (the\\n// \\\"Software\\\"), to deal in the Software without restriction, including\\n// without limitation the rights to use, copy, modify, merge, publish,\\n// distribute, sublicense, and/or sell copies of the Software, and to permit\\n// persons to whom the Software is furnished to do so, subject to the\\n// following conditions:\\n//\\n// The above copyright notice and this permission notice shall be included\\n// in all copies or substantial portions of the Software.\\n//\\n// THE SOFTWARE IS PROVIDED \\\"AS IS\\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\\n\\nfunction EventEmitter() {\\n  this._events = this._events || {};\\n  this._maxListeners = this._maxListeners || undefined;\\n}\\nmodule.exports = EventEmitter;\\n\\n// Backwards-compat with node 0.10.x\\nEventEmitter.EventEmitter = EventEmitter;\\n\\nEventEmitter.prototype._events = undefined;\\nEventEmitter.prototype._maxListeners = undefined;\\n\\n// By default EventEmitters will print a warning if more than 10 listeners are\\n// added to it. This is a useful default which helps finding memory leaks.\\nEventEmitter.defaultMaxListeners = 10;\\n\\n// Obviously not all Emitters should be limited to 10. This function allows\\n// that to be increased. Set to zero for unlimited.\\nEventEmitter.prototype.setMaxListeners = function(n) {\\n  if (!isNumber(n) || n < 0 || isNaN(n))\\n    throw TypeError('n must be a positive number');\\n  this._maxListeners = n;\\n  return this;\\n};\\n\\nEventEmitter.prototype.emit = function(type) {\\n  var er, handler, len, args, i, listeners;\\n\\n  if (!this._events)\\n    this._events = {};\\n\\n  // If there is no 'error' event listener then throw.\\n  if (type === 'error') {\\n    if (!this._events.error ||\\n        (isObject(this._events.error) && !this._events.error.length)) {\\n      er = arguments[1];\\n      if (er instanceof Error) {\\n        throw er; // Unhandled 'error' event\\n      } else {\\n        // At least give some kind of context to the user\\n        var err = new Error('Uncaught, unspecified \\\"error\\\" event. (' + er + ')');\\n        err.context = er;\\n        throw err;\\n      }\\n    }\\n  }\\n\\n  handler = this._events[type];\\n\\n  if (isUndefined(handler))\\n    return false;\\n\\n  if (isFunction(handler)) {\\n    switch (arguments.length) {\\n      // fast cases\\n      case 1:\\n        handler.call(this);\\n        break;\\n      case 2:\\n        handler.call(this, arguments[1]);\\n        break;\\n      case 3:\\n        handler.call(this, arguments[1], arguments[2]);\\n        break;\\n      // slower\\n      default:\\n        args = Array.prototype.slice.call(arguments, 1);\\n        handler.apply(this, args);\\n    }\\n  } else if (isObject(handler)) {\\n    args = Array.prototype.slice.call(arguments, 1);\\n    listeners = handler.slice();\\n    len = listeners.length;\\n    for (i = 0; i < len; i++)\\n      listeners[i].apply(this, args);\\n  }\\n\\n  return true;\\n};\\n\\nEventEmitter.prototype.addListener = function(type, listener) {\\n  var m;\\n\\n  if (!isFunction(listener))\\n    throw TypeError('listener must be a function');\\n\\n  if (!this._events)\\n    this._events = {};\\n\\n  // To avoid recursion in the case that type === \\\"newListener\\\"! Before\\n  // adding it to the listeners, first emit \\\"newListener\\\".\\n  if (this._events.newListener)\\n    this.emit('newListener', type,\\n              isFunction(listener.listener) ?\\n              listener.listener : listener);\\n\\n  if (!this._events[type])\\n    // Optimize the case of one listener. Don't need the extra array object.\\n    this._events[type] = listener;\\n  else if (isObject(this._events[type]))\\n    // If we've already got an array, just append.\\n    this._events[type].push(listener);\\n  else\\n    // Adding the second element, need to change to array.\\n    this._events[type] = [this._events[type], listener];\\n\\n  // Check for listener leak\\n  if (isObject(this._events[type]) && !this._events[type].warned) {\\n    if (!isUndefined(this._maxListeners)) {\\n      m = this._maxListeners;\\n    } else {\\n      m = EventEmitter.defaultMaxListeners;\\n    }\\n\\n    if (m && m > 0 && this._events[type].length > m) {\\n      this._events[type].warned = true;\\n      console.error('(node) warning: possible EventEmitter memory ' +\\n                    'leak detected. %d listeners added. ' +\\n                    'Use emitter.setMaxListeners() to increase limit.',\\n                    this._events[type].length);\\n      if (typeof console.trace === 'function') {\\n        // not supported in IE 10\\n        console.trace();\\n      }\\n    }\\n  }\\n\\n  return this;\\n};\\n\\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\\n\\nEventEmitter.prototype.once = function(type, listener) {\\n  if (!isFunction(listener))\\n    throw TypeError('listener must be a function');\\n\\n  var fired = false;\\n\\n  function g() {\\n    this.removeListener(type, g);\\n\\n    if (!fired) {\\n      fired = true;\\n      listener.apply(this, arguments);\\n    }\\n  }\\n\\n  g.listener = listener;\\n  this.on(type, g);\\n\\n  return this;\\n};\\n\\n// emits a 'removeListener' event iff the listener was removed\\nEventEmitter.prototype.removeListener = function(type, listener) {\\n  var list, position, length, i;\\n\\n  if (!isFunction(listener))\\n    throw TypeError('listener must be a function');\\n\\n  if (!this._events || !this._events[type])\\n    return this;\\n\\n  list = this._events[type];\\n  length = list.length;\\n  position = -1;\\n\\n  if (list === listener ||\\n      (isFunction(list.listener) && list.listener === listener)) {\\n    delete this._events[type];\\n    if (this._events.removeListener)\\n      this.emit('removeListener', type, listener);\\n\\n  } else if (isObject(list)) {\\n    for (i = length; i-- > 0;) {\\n      if (list[i] === listener ||\\n          (list[i].listener && list[i].listener === listener)) {\\n        position = i;\\n        break;\\n      }\\n    }\\n\\n    if (position < 0)\\n      return this;\\n\\n    if (list.length === 1) {\\n      list.length = 0;\\n      delete this._events[type];\\n    } else {\\n      list.splice(position, 1);\\n    }\\n\\n    if (this._events.removeListener)\\n      this.emit('removeListener', type, listener);\\n  }\\n\\n  return this;\\n};\\n\\nEventEmitter.prototype.removeAllListeners = function(type) {\\n  var key, listeners;\\n\\n  if (!this._events)\\n    return this;\\n\\n  // not listening for removeListener, no need to emit\\n  if (!this._events.removeListener) {\\n    if (arguments.length === 0)\\n      this._events = {};\\n    else if (this._events[type])\\n      delete this._events[type];\\n    return this;\\n  }\\n\\n  // emit removeListener for all listeners on all events\\n  if (arguments.length === 0) {\\n    for (key in this._events) {\\n      if (key === 'removeListener') continue;\\n      this.removeAllListeners(key);\\n    }\\n    this.removeAllListeners('removeListener');\\n    this._events = {};\\n    return this;\\n  }\\n\\n  listeners = this._events[type];\\n\\n  if (isFunction(listeners)) {\\n    this.removeListener(type, listeners);\\n  } else if (listeners) {\\n    // LIFO order\\n    while (listeners.length)\\n      this.removeListener(type, listeners[listeners.length - 1]);\\n  }\\n  delete this._events[type];\\n\\n  return this;\\n};\\n\\nEventEmitter.prototype.listeners = function(type) {\\n  var ret;\\n  if (!this._events || !this._events[type])\\n    ret = [];\\n  else if (isFunction(this._events[type]))\\n    ret = [this._events[type]];\\n  else\\n    ret = this._events[type].slice();\\n  return ret;\\n};\\n\\nEventEmitter.prototype.listenerCount = function(type) {\\n  if (this._events) {\\n    var evlistener = this._events[type];\\n\\n    if (isFunction(evlistener))\\n      return 1;\\n    else if (evlistener)\\n      return evlistener.length;\\n  }\\n  return 0;\\n};\\n\\nEventEmitter.listenerCount = function(emitter, type) {\\n  return emitter.listenerCount(type);\\n};\\n\\nfunction isFunction(arg) {\\n  return typeof arg === 'function';\\n}\\n\\nfunction isNumber(arg) {\\n  return typeof arg === 'number';\\n}\\n\\nfunction isObject(arg) {\\n  return typeof arg === 'object' && arg !== null;\\n}\\n\\nfunction isUndefined(arg) {\\n  return arg === void 0;\\n}\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/events/events.js\\n// module id = 10\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/events/events.js?\");\n\n/***/ }),\n/* 11 */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.\\n//\\n// Permission is hereby granted, free of charge, to any person obtaining a\\n// copy of this software and associated documentation files (the\\n// \\\"Software\\\"), to deal in the Software without restriction, including\\n// without limitation the rights to use, copy, modify, merge, publish,\\n// distribute, sublicense, and/or sell copies of the Software, and to permit\\n// persons to whom the Software is furnished to do so, subject to the\\n// following conditions:\\n//\\n// The above copyright notice and this permission notice shall be included\\n// in all copies or substantial portions of the Software.\\n//\\n// THE SOFTWARE IS PROVIDED \\\"AS IS\\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\\n\\nvar formatRegExp = /%[sdj%]/g;\\nexports.format = function(f) {\\n  if (!isString(f)) {\\n    var objects = [];\\n    for (var i = 0; i < arguments.length; i++) {\\n      objects.push(inspect(arguments[i]));\\n    }\\n    return objects.join(' ');\\n  }\\n\\n  var i = 1;\\n  var args = arguments;\\n  var len = args.length;\\n  var str = String(f).replace(formatRegExp, function(x) {\\n    if (x === '%%') return '%';\\n    if (i >= len) return x;\\n    switch (x) {\\n      case '%s': return String(args[i++]);\\n      case '%d': return Number(args[i++]);\\n      case '%j':\\n        try {\\n          return JSON.stringify(args[i++]);\\n        } catch (_) {\\n          return '[Circular]';\\n        }\\n      default:\\n        return x;\\n    }\\n  });\\n  for (var x = args[i]; i < len; x = args[++i]) {\\n    if (isNull(x) || !isObject(x)) {\\n      str += ' ' + x;\\n    } else {\\n      str += ' ' + inspect(x);\\n    }\\n  }\\n  return str;\\n};\\n\\n\\n// Mark that a method should not be used.\\n// Returns a modified function which warns once by default.\\n// If --no-deprecation is set, then it is a no-op.\\nexports.deprecate = function(fn, msg) {\\n  // Allow for deprecating things in the process of starting up.\\n  if (isUndefined(global.process)) {\\n    return function() {\\n      return exports.deprecate(fn, msg).apply(this, arguments);\\n    };\\n  }\\n\\n  if (process.noDeprecation === true) {\\n    return fn;\\n  }\\n\\n  var warned = false;\\n  function deprecated() {\\n    if (!warned) {\\n      if (process.throwDeprecation) {\\n        throw new Error(msg);\\n      } else if (process.traceDeprecation) {\\n        console.trace(msg);\\n      } else {\\n        console.error(msg);\\n      }\\n      warned = true;\\n    }\\n    return fn.apply(this, arguments);\\n  }\\n\\n  return deprecated;\\n};\\n\\n\\nvar debugs = {};\\nvar debugEnviron;\\nexports.debuglog = function(set) {\\n  if (isUndefined(debugEnviron))\\n    debugEnviron = process.env.NODE_DEBUG || '';\\n  set = set.toUpperCase();\\n  if (!debugs[set]) {\\n    if (new RegExp('\\\\\\\\b' + set + '\\\\\\\\b', 'i').test(debugEnviron)) {\\n      var pid = process.pid;\\n      debugs[set] = function() {\\n        var msg = exports.format.apply(exports, arguments);\\n        console.error('%s %d: %s', set, pid, msg);\\n      };\\n    } else {\\n      debugs[set] = function() {};\\n    }\\n  }\\n  return debugs[set];\\n};\\n\\n\\n/**\\n * Echos the value of a value. Trys to print the value out\\n * in the best way possible given the different types.\\n *\\n * @param {Object} obj The object to print out.\\n * @param {Object} opts Optional options object that alters the output.\\n */\\n/* legacy: obj, showHidden, depth, colors*/\\nfunction inspect(obj, opts) {\\n  // default options\\n  var ctx = {\\n    seen: [],\\n    stylize: stylizeNoColor\\n  };\\n  // legacy...\\n  if (arguments.length >= 3) ctx.depth = arguments[2];\\n  if (arguments.length >= 4) ctx.colors = arguments[3];\\n  if (isBoolean(opts)) {\\n    // legacy...\\n    ctx.showHidden = opts;\\n  } else if (opts) {\\n    // got an \\\"options\\\" object\\n    exports._extend(ctx, opts);\\n  }\\n  // set default options\\n  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;\\n  if (isUndefined(ctx.depth)) ctx.depth = 2;\\n  if (isUndefined(ctx.colors)) ctx.colors = false;\\n  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;\\n  if (ctx.colors) ctx.stylize = stylizeWithColor;\\n  return formatValue(ctx, obj, ctx.depth);\\n}\\nexports.inspect = inspect;\\n\\n\\n// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics\\ninspect.colors = {\\n  'bold' : [1, 22],\\n  'italic' : [3, 23],\\n  'underline' : [4, 24],\\n  'inverse' : [7, 27],\\n  'white' : [37, 39],\\n  'grey' : [90, 39],\\n  'black' : [30, 39],\\n  'blue' : [34, 39],\\n  'cyan' : [36, 39],\\n  'green' : [32, 39],\\n  'magenta' : [35, 39],\\n  'red' : [31, 39],\\n  'yellow' : [33, 39]\\n};\\n\\n// Don't use 'blue' not visible on cmd.exe\\ninspect.styles = {\\n  'special': 'cyan',\\n  'number': 'yellow',\\n  'boolean': 'yellow',\\n  'undefined': 'grey',\\n  'null': 'bold',\\n  'string': 'green',\\n  'date': 'magenta',\\n  // \\\"name\\\": intentionally not styling\\n  'regexp': 'red'\\n};\\n\\n\\nfunction stylizeWithColor(str, styleType) {\\n  var style = inspect.styles[styleType];\\n\\n  if (style) {\\n    return '\\\\u001b[' + inspect.colors[style][0] + 'm' + str +\\n           '\\\\u001b[' + inspect.colors[style][1] + 'm';\\n  } else {\\n    return str;\\n  }\\n}\\n\\n\\nfunction stylizeNoColor(str, styleType) {\\n  return str;\\n}\\n\\n\\nfunction arrayToHash(array) {\\n  var hash = {};\\n\\n  array.forEach(function(val, idx) {\\n    hash[val] = true;\\n  });\\n\\n  return hash;\\n}\\n\\n\\nfunction formatValue(ctx, value, recurseTimes) {\\n  // Provide a hook for user-specified inspect functions.\\n  // Check that value is an object with an inspect function on it\\n  if (ctx.customInspect &&\\n      value &&\\n      isFunction(value.inspect) &&\\n      // Filter out the util module, it's inspect function is special\\n      value.inspect !== exports.inspect &&\\n      // Also filter out any prototype objects using the circular check.\\n      !(value.constructor && value.constructor.prototype === value)) {\\n    var ret = value.inspect(recurseTimes, ctx);\\n    if (!isString(ret)) {\\n      ret = formatValue(ctx, ret, recurseTimes);\\n    }\\n    return ret;\\n  }\\n\\n  // Primitive types cannot have properties\\n  var primitive = formatPrimitive(ctx, value);\\n  if (primitive) {\\n    return primitive;\\n  }\\n\\n  // Look up the keys of the object.\\n  var keys = Object.keys(value);\\n  var visibleKeys = arrayToHash(keys);\\n\\n  if (ctx.showHidden) {\\n    keys = Object.getOwnPropertyNames(value);\\n  }\\n\\n  // IE doesn't make error fields non-enumerable\\n  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx\\n  if (isError(value)\\n      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {\\n    return formatError(value);\\n  }\\n\\n  // Some type of object without properties can be shortcutted.\\n  if (keys.length === 0) {\\n    if (isFunction(value)) {\\n      var name = value.name ? ': ' + value.name : '';\\n      return ctx.stylize('[Function' + name + ']', 'special');\\n    }\\n    if (isRegExp(value)) {\\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\\n    }\\n    if (isDate(value)) {\\n      return ctx.stylize(Date.prototype.toString.call(value), 'date');\\n    }\\n    if (isError(value)) {\\n      return formatError(value);\\n    }\\n  }\\n\\n  var base = '', array = false, braces = ['{', '}'];\\n\\n  // Make Array say that they are Array\\n  if (isArray(value)) {\\n    array = true;\\n    braces = ['[', ']'];\\n  }\\n\\n  // Make functions say that they are functions\\n  if (isFunction(value)) {\\n    var n = value.name ? ': ' + value.name : '';\\n    base = ' [Function' + n + ']';\\n  }\\n\\n  // Make RegExps say that they are RegExps\\n  if (isRegExp(value)) {\\n    base = ' ' + RegExp.prototype.toString.call(value);\\n  }\\n\\n  // Make dates with properties first say the date\\n  if (isDate(value)) {\\n    base = ' ' + Date.prototype.toUTCString.call(value);\\n  }\\n\\n  // Make error with message first say the error\\n  if (isError(value)) {\\n    base = ' ' + formatError(value);\\n  }\\n\\n  if (keys.length === 0 && (!array || value.length == 0)) {\\n    return braces[0] + base + braces[1];\\n  }\\n\\n  if (recurseTimes < 0) {\\n    if (isRegExp(value)) {\\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\\n    } else {\\n      return ctx.stylize('[Object]', 'special');\\n    }\\n  }\\n\\n  ctx.seen.push(value);\\n\\n  var output;\\n  if (array) {\\n    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);\\n  } else {\\n    output = keys.map(function(key) {\\n      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);\\n    });\\n  }\\n\\n  ctx.seen.pop();\\n\\n  return reduceToSingleString(output, base, braces);\\n}\\n\\n\\nfunction formatPrimitive(ctx, value) {\\n  if (isUndefined(value))\\n    return ctx.stylize('undefined', 'undefined');\\n  if (isString(value)) {\\n    var simple = '\\\\'' + JSON.stringify(value).replace(/^\\\"|\\\"$/g, '')\\n                                             .replace(/'/g, \\\"\\\\\\\\'\\\")\\n                                             .replace(/\\\\\\\\\\\"/g, '\\\"') + '\\\\'';\\n    return ctx.stylize(simple, 'string');\\n  }\\n  if (isNumber(value))\\n    return ctx.stylize('' + value, 'number');\\n  if (isBoolean(value))\\n    return ctx.stylize('' + value, 'boolean');\\n  // For some reason typeof null is \\\"object\\\", so special case here.\\n  if (isNull(value))\\n    return ctx.stylize('null', 'null');\\n}\\n\\n\\nfunction formatError(value) {\\n  return '[' + Error.prototype.toString.call(value) + ']';\\n}\\n\\n\\nfunction formatArray(ctx, value, recurseTimes, visibleKeys, keys) {\\n  var output = [];\\n  for (var i = 0, l = value.length; i < l; ++i) {\\n    if (hasOwnProperty(value, String(i))) {\\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\\n          String(i), true));\\n    } else {\\n      output.push('');\\n    }\\n  }\\n  keys.forEach(function(key) {\\n    if (!key.match(/^\\\\d+$/)) {\\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\\n          key, true));\\n    }\\n  });\\n  return output;\\n}\\n\\n\\nfunction formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {\\n  var name, str, desc;\\n  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };\\n  if (desc.get) {\\n    if (desc.set) {\\n      str = ctx.stylize('[Getter/Setter]', 'special');\\n    } else {\\n      str = ctx.stylize('[Getter]', 'special');\\n    }\\n  } else {\\n    if (desc.set) {\\n      str = ctx.stylize('[Setter]', 'special');\\n    }\\n  }\\n  if (!hasOwnProperty(visibleKeys, key)) {\\n    name = '[' + key + ']';\\n  }\\n  if (!str) {\\n    if (ctx.seen.indexOf(desc.value) < 0) {\\n      if (isNull(recurseTimes)) {\\n        str = formatValue(ctx, desc.value, null);\\n      } else {\\n        str = formatValue(ctx, desc.value, recurseTimes - 1);\\n      }\\n      if (str.indexOf('\\\\n') > -1) {\\n        if (array) {\\n          str = str.split('\\\\n').map(function(line) {\\n            return '  ' + line;\\n          }).join('\\\\n').substr(2);\\n        } else {\\n          str = '\\\\n' + str.split('\\\\n').map(function(line) {\\n            return '   ' + line;\\n          }).join('\\\\n');\\n        }\\n      }\\n    } else {\\n      str = ctx.stylize('[Circular]', 'special');\\n    }\\n  }\\n  if (isUndefined(name)) {\\n    if (array && key.match(/^\\\\d+$/)) {\\n      return str;\\n    }\\n    name = JSON.stringify('' + key);\\n    if (name.match(/^\\\"([a-zA-Z_][a-zA-Z_0-9]*)\\\"$/)) {\\n      name = name.substr(1, name.length - 2);\\n      name = ctx.stylize(name, 'name');\\n    } else {\\n      name = name.replace(/'/g, \\\"\\\\\\\\'\\\")\\n                 .replace(/\\\\\\\\\\\"/g, '\\\"')\\n                 .replace(/(^\\\"|\\\"$)/g, \\\"'\\\");\\n      name = ctx.stylize(name, 'string');\\n    }\\n  }\\n\\n  return name + ': ' + str;\\n}\\n\\n\\nfunction reduceToSingleString(output, base, braces) {\\n  var numLinesEst = 0;\\n  var length = output.reduce(function(prev, cur) {\\n    numLinesEst++;\\n    if (cur.indexOf('\\\\n') >= 0) numLinesEst++;\\n    return prev + cur.replace(/\\\\u001b\\\\[\\\\d\\\\d?m/g, '').length + 1;\\n  }, 0);\\n\\n  if (length > 60) {\\n    return braces[0] +\\n           (base === '' ? '' : base + '\\\\n ') +\\n           ' ' +\\n           output.join(',\\\\n  ') +\\n           ' ' +\\n           braces[1];\\n  }\\n\\n  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];\\n}\\n\\n\\n// NOTE: These type checking functions intentionally don't use `instanceof`\\n// because it is fragile and can be easily faked with `Object.create()`.\\nfunction isArray(ar) {\\n  return Array.isArray(ar);\\n}\\nexports.isArray = isArray;\\n\\nfunction isBoolean(arg) {\\n  return typeof arg === 'boolean';\\n}\\nexports.isBoolean = isBoolean;\\n\\nfunction isNull(arg) {\\n  return arg === null;\\n}\\nexports.isNull = isNull;\\n\\nfunction isNullOrUndefined(arg) {\\n  return arg == null;\\n}\\nexports.isNullOrUndefined = isNullOrUndefined;\\n\\nfunction isNumber(arg) {\\n  return typeof arg === 'number';\\n}\\nexports.isNumber = isNumber;\\n\\nfunction isString(arg) {\\n  return typeof arg === 'string';\\n}\\nexports.isString = isString;\\n\\nfunction isSymbol(arg) {\\n  return typeof arg === 'symbol';\\n}\\nexports.isSymbol = isSymbol;\\n\\nfunction isUndefined(arg) {\\n  return arg === void 0;\\n}\\nexports.isUndefined = isUndefined;\\n\\nfunction isRegExp(re) {\\n  return isObject(re) && objectToString(re) === '[object RegExp]';\\n}\\nexports.isRegExp = isRegExp;\\n\\nfunction isObject(arg) {\\n  return typeof arg === 'object' && arg !== null;\\n}\\nexports.isObject = isObject;\\n\\nfunction isDate(d) {\\n  return isObject(d) && objectToString(d) === '[object Date]';\\n}\\nexports.isDate = isDate;\\n\\nfunction isError(e) {\\n  return isObject(e) &&\\n      (objectToString(e) === '[object Error]' || e instanceof Error);\\n}\\nexports.isError = isError;\\n\\nfunction isFunction(arg) {\\n  return typeof arg === 'function';\\n}\\nexports.isFunction = isFunction;\\n\\nfunction isPrimitive(arg) {\\n  return arg === null ||\\n         typeof arg === 'boolean' ||\\n         typeof arg === 'number' ||\\n         typeof arg === 'string' ||\\n         typeof arg === 'symbol' ||  // ES6 symbol\\n         typeof arg === 'undefined';\\n}\\nexports.isPrimitive = isPrimitive;\\n\\nexports.isBuffer = __webpack_require__(13);\\n\\nfunction objectToString(o) {\\n  return Object.prototype.toString.call(o);\\n}\\n\\n\\nfunction pad(n) {\\n  return n < 10 ? '0' + n.toString(10) : n.toString(10);\\n}\\n\\n\\nvar months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',\\n              'Oct', 'Nov', 'Dec'];\\n\\n// 26 Feb 16:19:34\\nfunction timestamp() {\\n  var d = new Date();\\n  var time = [pad(d.getHours()),\\n              pad(d.getMinutes()),\\n              pad(d.getSeconds())].join(':');\\n  return [d.getDate(), months[d.getMonth()], time].join(' ');\\n}\\n\\n\\n// log is just a thin wrapper to console.log that prepends a timestamp\\nexports.log = function() {\\n  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));\\n};\\n\\n\\n/**\\n * Inherit the prototype methods from one constructor into another.\\n *\\n * The Function.prototype.inherits from lang.js rewritten as a standalone\\n * function (not on Function.prototype). NOTE: If this file is to be loaded\\n * during bootstrapping this function needs to be rewritten using some native\\n * functions as prototype setup using normal JavaScript does not work as\\n * expected during bootstrapping (see mirror.js in r114903).\\n *\\n * @param {function} ctor Constructor function which needs to inherit the\\n *     prototype.\\n * @param {function} superCtor Constructor function to inherit prototype from.\\n */\\nexports.inherits = __webpack_require__(14);\\n\\nexports._extend = function(origin, add) {\\n  // Don't do anything if add isn't an object\\n  if (!add || !isObject(add)) return origin;\\n\\n  var keys = Object.keys(add);\\n  var i = keys.length;\\n  while (i--) {\\n    origin[keys[i]] = add[keys[i]];\\n  }\\n  return origin;\\n};\\n\\nfunction hasOwnProperty(obj, prop) {\\n  return Object.prototype.hasOwnProperty.call(obj, prop);\\n}\\n\\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(12)))\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/util/util.js\\n// module id = 11\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/util/util.js?\");\n\n/***/ }),\n/* 12 */\n/***/ (function(module, exports) {\n\neval(\"// shim for using process in browser\\nvar process = module.exports = {};\\n\\n// cached from whatever global is present so that test runners that stub it\\n// don't break things.  But we need to wrap it in a try catch in case it is\\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\\n// function because try/catches deoptimize in certain engines.\\n\\nvar cachedSetTimeout;\\nvar cachedClearTimeout;\\n\\nfunction defaultSetTimout() {\\n    throw new Error('setTimeout has not been defined');\\n}\\nfunction defaultClearTimeout () {\\n    throw new Error('clearTimeout has not been defined');\\n}\\n(function () {\\n    try {\\n        if (typeof setTimeout === 'function') {\\n            cachedSetTimeout = setTimeout;\\n        } else {\\n            cachedSetTimeout = defaultSetTimout;\\n        }\\n    } catch (e) {\\n        cachedSetTimeout = defaultSetTimout;\\n    }\\n    try {\\n        if (typeof clearTimeout === 'function') {\\n            cachedClearTimeout = clearTimeout;\\n        } else {\\n            cachedClearTimeout = defaultClearTimeout;\\n        }\\n    } catch (e) {\\n        cachedClearTimeout = defaultClearTimeout;\\n    }\\n} ())\\nfunction runTimeout(fun) {\\n    if (cachedSetTimeout === setTimeout) {\\n        //normal enviroments in sane situations\\n        return setTimeout(fun, 0);\\n    }\\n    // if setTimeout wasn't available but was latter defined\\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\\n        cachedSetTimeout = setTimeout;\\n        return setTimeout(fun, 0);\\n    }\\n    try {\\n        // when when somebody has screwed with setTimeout but no I.E. maddness\\n        return cachedSetTimeout(fun, 0);\\n    } catch(e){\\n        try {\\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\\n            return cachedSetTimeout.call(null, fun, 0);\\n        } catch(e){\\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\\n            return cachedSetTimeout.call(this, fun, 0);\\n        }\\n    }\\n\\n\\n}\\nfunction runClearTimeout(marker) {\\n    if (cachedClearTimeout === clearTimeout) {\\n        //normal enviroments in sane situations\\n        return clearTimeout(marker);\\n    }\\n    // if clearTimeout wasn't available but was latter defined\\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\\n        cachedClearTimeout = clearTimeout;\\n        return clearTimeout(marker);\\n    }\\n    try {\\n        // when when somebody has screwed with setTimeout but no I.E. maddness\\n        return cachedClearTimeout(marker);\\n    } catch (e){\\n        try {\\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\\n            return cachedClearTimeout.call(null, marker);\\n        } catch (e){\\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\\n            return cachedClearTimeout.call(this, marker);\\n        }\\n    }\\n\\n\\n\\n}\\nvar queue = [];\\nvar draining = false;\\nvar currentQueue;\\nvar queueIndex = -1;\\n\\nfunction cleanUpNextTick() {\\n    if (!draining || !currentQueue) {\\n        return;\\n    }\\n    draining = false;\\n    if (currentQueue.length) {\\n        queue = currentQueue.concat(queue);\\n    } else {\\n        queueIndex = -1;\\n    }\\n    if (queue.length) {\\n        drainQueue();\\n    }\\n}\\n\\nfunction drainQueue() {\\n    if (draining) {\\n        return;\\n    }\\n    var timeout = runTimeout(cleanUpNextTick);\\n    draining = true;\\n\\n    var len = queue.length;\\n    while(len) {\\n        currentQueue = queue;\\n        queue = [];\\n        while (++queueIndex < len) {\\n            if (currentQueue) {\\n                currentQueue[queueIndex].run();\\n            }\\n        }\\n        queueIndex = -1;\\n        len = queue.length;\\n    }\\n    currentQueue = null;\\n    draining = false;\\n    runClearTimeout(timeout);\\n}\\n\\nprocess.nextTick = function (fun) {\\n    var args = new Array(arguments.length - 1);\\n    if (arguments.length > 1) {\\n        for (var i = 1; i < arguments.length; i++) {\\n            args[i - 1] = arguments[i];\\n        }\\n    }\\n    queue.push(new Item(fun, args));\\n    if (queue.length === 1 && !draining) {\\n        runTimeout(drainQueue);\\n    }\\n};\\n\\n// v8 likes predictible objects\\nfunction Item(fun, array) {\\n    this.fun = fun;\\n    this.array = array;\\n}\\nItem.prototype.run = function () {\\n    this.fun.apply(null, this.array);\\n};\\nprocess.title = 'browser';\\nprocess.browser = true;\\nprocess.env = {};\\nprocess.argv = [];\\nprocess.version = ''; // empty string to avoid regexp issues\\nprocess.versions = {};\\n\\nfunction noop() {}\\n\\nprocess.on = noop;\\nprocess.addListener = noop;\\nprocess.once = noop;\\nprocess.off = noop;\\nprocess.removeListener = noop;\\nprocess.removeAllListeners = noop;\\nprocess.emit = noop;\\nprocess.prependListener = noop;\\nprocess.prependOnceListener = noop;\\n\\nprocess.listeners = function (name) { return [] }\\n\\nprocess.binding = function (name) {\\n    throw new Error('process.binding is not supported');\\n};\\n\\nprocess.cwd = function () { return '/' };\\nprocess.chdir = function (dir) {\\n    throw new Error('process.chdir is not supported');\\n};\\nprocess.umask = function() { return 0; };\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/process/browser.js\\n// module id = 12\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/process/browser.js?\");\n\n/***/ }),\n/* 13 */\n/***/ (function(module, exports) {\n\neval(\"module.exports = function isBuffer(arg) {\\n  return arg && typeof arg === 'object'\\n    && typeof arg.copy === 'function'\\n    && typeof arg.fill === 'function'\\n    && typeof arg.readUInt8 === 'function';\\n}\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/util/support/isBufferBrowser.js\\n// module id = 13\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/util/support/isBufferBrowser.js?\");\n\n/***/ }),\n/* 14 */\n/***/ (function(module, exports) {\n\neval(\"if (typeof Object.create === 'function') {\\n  // implementation from standard node.js 'util' module\\n  module.exports = function inherits(ctor, superCtor) {\\n    ctor.super_ = superCtor\\n    ctor.prototype = Object.create(superCtor.prototype, {\\n      constructor: {\\n        value: ctor,\\n        enumerable: false,\\n        writable: true,\\n        configurable: true\\n      }\\n    });\\n  };\\n} else {\\n  // old school shim for old browsers\\n  module.exports = function inherits(ctor, superCtor) {\\n    ctor.super_ = superCtor\\n    var TempCtor = function () {}\\n    TempCtor.prototype = superCtor.prototype\\n    ctor.prototype = new TempCtor()\\n    ctor.prototype.constructor = ctor\\n  }\\n}\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/util/node_modules/inherits/inherits_browser.js\\n// module id = 14\\n// module chunks = 0 1\\n\\n//# sourceURL=webpack:///./node_modules/util/node_modules/inherits/inherits_browser.js?\");\n\n/***/ })\n/******/ ])[\"default\"];\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/openbci-utilities/dist/utilities.js\n// module id = 16\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/openbci-utilities/dist/utilities.js?"
              );

              /***/
            },
            /* 17 */
            /***/ function(module, exports) {
              eval(
                'var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function("return this")() || (1,eval)("this");\r\n} catch(e) {\r\n\t// This works if the window reference is available\r\n\tif(typeof window === "object")\r\n\t\tg = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it\'s\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// (webpack)/buildin/global.js\n// module id = 17\n// module chunks = 0\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?'
              );

              /***/
            },
            /* 18 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar Subscriber_1 = __webpack_require__(0);\nvar rxSubscriber_1 = __webpack_require__(6);\nvar Observer_1 = __webpack_require__(10);\nfunction toSubscriber(nextOrObserver, error, complete) {\n    if (nextOrObserver) {\n        if (nextOrObserver instanceof Subscriber_1.Subscriber) {\n            return nextOrObserver;\n        }\n        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {\n            return nextOrObserver[rxSubscriber_1.rxSubscriber]();\n        }\n    }\n    if (!nextOrObserver && !error && !complete) {\n        return new Subscriber_1.Subscriber(Observer_1.empty);\n    }\n    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);\n}\nexports.toSubscriber = toSubscriber;\n//# sourceMappingURL=toSubscriber.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/toSubscriber.js\n// module id = 18\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/toSubscriber.js?"
              );

              /***/
            },
            /* 19 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nexports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });\n//# sourceMappingURL=isArray.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/isArray.js\n// module id = 19\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isArray.js?"
              );

              /***/
            },
            /* 20 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\n/**\n * An error thrown when one or more errors have occurred during the\n * `unsubscribe` of a {@link Subscription}.\n */\nvar UnsubscriptionError = (function (_super) {\n    __extends(UnsubscriptionError, _super);\n    function UnsubscriptionError(errors) {\n        _super.call(this);\n        this.errors = errors;\n        var err = Error.call(this, errors ?\n            errors.length + \" errors occurred during unsubscription:\\n  \" + errors.map(function (err, i) { return ((i + 1) + \") \" + err.toString()); }).join('\\n  ') : '');\n        this.name = err.name = 'UnsubscriptionError';\n        this.stack = err.stack;\n        this.message = err.message;\n    }\n    return UnsubscriptionError;\n}(Error));\nexports.UnsubscriptionError = UnsubscriptionError;\n//# sourceMappingURL=UnsubscriptionError.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/UnsubscriptionError.js\n// module id = 20\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/UnsubscriptionError.js?"
              );

              /***/
            },
            /* 21 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar noop_1 = __webpack_require__(22);\n/* tslint:enable:max-line-length */\nfunction pipe() {\n    var fns = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        fns[_i - 0] = arguments[_i];\n    }\n    return pipeFromArray(fns);\n}\nexports.pipe = pipe;\n/* @internal */\nfunction pipeFromArray(fns) {\n    if (!fns) {\n        return noop_1.noop;\n    }\n    if (fns.length === 1) {\n        return fns[0];\n    }\n    return function piped(input) {\n        return fns.reduce(function (prev, fn) { return fn(prev); }, input);\n    };\n}\nexports.pipeFromArray = pipeFromArray;\n//# sourceMappingURL=pipe.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/pipe.js\n// module id = 21\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/pipe.js?"
              );

              /***/
            },
            /* 22 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\n/* tslint:disable:no-empty */\nfunction noop() { }\nexports.noop = noop;\n//# sourceMappingURL=noop.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/noop.js\n// module id = 22\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/noop.js?"
              );

              /***/
            },
            /* 23 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscription_1 = __webpack_require__(2);\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar SubjectSubscription = (function (_super) {\n    __extends(SubjectSubscription, _super);\n    function SubjectSubscription(subject, subscriber) {\n        _super.call(this);\n        this.subject = subject;\n        this.subscriber = subscriber;\n        this.closed = false;\n    }\n    SubjectSubscription.prototype.unsubscribe = function () {\n        if (this.closed) {\n            return;\n        }\n        this.closed = true;\n        var subject = this.subject;\n        var observers = subject.observers;\n        this.subject = null;\n        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {\n            return;\n        }\n        var subscriberIndex = observers.indexOf(this.subscriber);\n        if (subscriberIndex !== -1) {\n            observers.splice(subscriberIndex, 1);\n        }\n    };\n    return SubjectSubscription;\n}(Subscription_1.Subscription));\nexports.SubjectSubscription = SubjectSubscription;\n//# sourceMappingURL=SubjectSubscription.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/SubjectSubscription.js\n// module id = 23\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/SubjectSubscription.js?"
              );

              /***/
            },
            /* 24 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                '\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subject_1 = __webpack_require__(7);\nvar ObjectUnsubscribedError_1 = __webpack_require__(12);\n/**\n * @class BehaviorSubject<T>\n */\nvar BehaviorSubject = (function (_super) {\n    __extends(BehaviorSubject, _super);\n    function BehaviorSubject(_value) {\n        _super.call(this);\n        this._value = _value;\n    }\n    Object.defineProperty(BehaviorSubject.prototype, "value", {\n        get: function () {\n            return this.getValue();\n        },\n        enumerable: true,\n        configurable: true\n    });\n    BehaviorSubject.prototype._subscribe = function (subscriber) {\n        var subscription = _super.prototype._subscribe.call(this, subscriber);\n        if (subscription && !subscription.closed) {\n            subscriber.next(this._value);\n        }\n        return subscription;\n    };\n    BehaviorSubject.prototype.getValue = function () {\n        if (this.hasError) {\n            throw this.thrownError;\n        }\n        else if (this.closed) {\n            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();\n        }\n        else {\n            return this._value;\n        }\n    };\n    BehaviorSubject.prototype.next = function (value) {\n        _super.prototype.next.call(this, this._value = value);\n    };\n    return BehaviorSubject;\n}(Subject_1.Subject));\nexports.BehaviorSubject = BehaviorSubject;\n//# sourceMappingURL=BehaviorSubject.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/BehaviorSubject.js\n// module id = 24\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/BehaviorSubject.js?'
              );

              /***/
            },
            /* 25 */
            /***/ function(module, exports, __webpack_require__) {
              eval(
                "(function webpackUniversalModuleDefinition(root, factory) {\n\tif(true)\n\t\tmodule.exports = factory();\n\telse if(typeof define === 'function' && define.amd)\n\t\tdefine([], factory);\n\telse if(typeof exports === 'object')\n\t\texports[\"OpenBCIUtilities\"] = factory();\n\telse\n\t\troot[\"OpenBCIUtilities\"] = factory();\n})(this, function() {\nreturn /******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 5);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"/* WEBPACK VAR INJECTION */(function(global) {/*!\\n * The buffer module from node.js, for the browser.\\n *\\n * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>\\n * @license  MIT\\n */\\n/* eslint-disable no-proto */\\n\\n\\n\\nvar base64 = __webpack_require__(2)\\nvar ieee754 = __webpack_require__(3)\\nvar isArray = __webpack_require__(4)\\n\\nexports.Buffer = Buffer\\nexports.SlowBuffer = SlowBuffer\\nexports.INSPECT_MAX_BYTES = 50\\n\\n/**\\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\\n *   === true    Use Uint8Array implementation (fastest)\\n *   === false   Use Object implementation (most compatible, even IE6)\\n *\\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\\n * Opera 11.6+, iOS 4.2+.\\n *\\n * Due to various browser bugs, sometimes the Object implementation will be used even\\n * when the browser supports typed arrays.\\n *\\n * Note:\\n *\\n *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,\\n *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.\\n *\\n *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.\\n *\\n *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of\\n *     incorrect length in some situations.\\n\\n * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they\\n * get the Object implementation, which is slower but behaves correctly.\\n */\\nBuffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined\\n  ? global.TYPED_ARRAY_SUPPORT\\n  : typedArraySupport()\\n\\n/*\\n * Export kMaxLength after typed array support is determined.\\n */\\nexports.kMaxLength = kMaxLength()\\n\\nfunction typedArraySupport () {\\n  try {\\n    var arr = new Uint8Array(1)\\n    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}\\n    return arr.foo() === 42 && // typed array instances can be augmented\\n        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`\\n        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`\\n  } catch (e) {\\n    return false\\n  }\\n}\\n\\nfunction kMaxLength () {\\n  return Buffer.TYPED_ARRAY_SUPPORT\\n    ? 0x7fffffff\\n    : 0x3fffffff\\n}\\n\\nfunction createBuffer (that, length) {\\n  if (kMaxLength() < length) {\\n    throw new RangeError('Invalid typed array length')\\n  }\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    // Return an augmented `Uint8Array` instance, for best performance\\n    that = new Uint8Array(length)\\n    that.__proto__ = Buffer.prototype\\n  } else {\\n    // Fallback: Return an object instance of the Buffer class\\n    if (that === null) {\\n      that = new Buffer(length)\\n    }\\n    that.length = length\\n  }\\n\\n  return that\\n}\\n\\n/**\\n * The Buffer constructor returns instances of `Uint8Array` that have their\\n * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of\\n * `Uint8Array`, so the returned instances will have all the node `Buffer` methods\\n * and the `Uint8Array` methods. Square bracket notation works as expected -- it\\n * returns a single octet.\\n *\\n * The `Uint8Array` prototype remains unmodified.\\n */\\n\\nfunction Buffer (arg, encodingOrOffset, length) {\\n  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {\\n    return new Buffer(arg, encodingOrOffset, length)\\n  }\\n\\n  // Common case.\\n  if (typeof arg === 'number') {\\n    if (typeof encodingOrOffset === 'string') {\\n      throw new Error(\\n        'If encoding is specified then the first argument must be a string'\\n      )\\n    }\\n    return allocUnsafe(this, arg)\\n  }\\n  return from(this, arg, encodingOrOffset, length)\\n}\\n\\nBuffer.poolSize = 8192 // not used by this implementation\\n\\n// TODO: Legacy, not needed anymore. Remove in next major version.\\nBuffer._augment = function (arr) {\\n  arr.__proto__ = Buffer.prototype\\n  return arr\\n}\\n\\nfunction from (that, value, encodingOrOffset, length) {\\n  if (typeof value === 'number') {\\n    throw new TypeError('\\\"value\\\" argument must not be a number')\\n  }\\n\\n  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {\\n    return fromArrayBuffer(that, value, encodingOrOffset, length)\\n  }\\n\\n  if (typeof value === 'string') {\\n    return fromString(that, value, encodingOrOffset)\\n  }\\n\\n  return fromObject(that, value)\\n}\\n\\n/**\\n * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError\\n * if value is a number.\\n * Buffer.from(str[, encoding])\\n * Buffer.from(array)\\n * Buffer.from(buffer)\\n * Buffer.from(arrayBuffer[, byteOffset[, length]])\\n **/\\nBuffer.from = function (value, encodingOrOffset, length) {\\n  return from(null, value, encodingOrOffset, length)\\n}\\n\\nif (Buffer.TYPED_ARRAY_SUPPORT) {\\n  Buffer.prototype.__proto__ = Uint8Array.prototype\\n  Buffer.__proto__ = Uint8Array\\n  if (typeof Symbol !== 'undefined' && Symbol.species &&\\n      Buffer[Symbol.species] === Buffer) {\\n    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97\\n    Object.defineProperty(Buffer, Symbol.species, {\\n      value: null,\\n      configurable: true\\n    })\\n  }\\n}\\n\\nfunction assertSize (size) {\\n  if (typeof size !== 'number') {\\n    throw new TypeError('\\\"size\\\" argument must be a number')\\n  } else if (size < 0) {\\n    throw new RangeError('\\\"size\\\" argument must not be negative')\\n  }\\n}\\n\\nfunction alloc (that, size, fill, encoding) {\\n  assertSize(size)\\n  if (size <= 0) {\\n    return createBuffer(that, size)\\n  }\\n  if (fill !== undefined) {\\n    // Only pay attention to encoding if it's a string. This\\n    // prevents accidentally sending in a number that would\\n    // be interpretted as a start offset.\\n    return typeof encoding === 'string'\\n      ? createBuffer(that, size).fill(fill, encoding)\\n      : createBuffer(that, size).fill(fill)\\n  }\\n  return createBuffer(that, size)\\n}\\n\\n/**\\n * Creates a new filled Buffer instance.\\n * alloc(size[, fill[, encoding]])\\n **/\\nBuffer.alloc = function (size, fill, encoding) {\\n  return alloc(null, size, fill, encoding)\\n}\\n\\nfunction allocUnsafe (that, size) {\\n  assertSize(size)\\n  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)\\n  if (!Buffer.TYPED_ARRAY_SUPPORT) {\\n    for (var i = 0; i < size; ++i) {\\n      that[i] = 0\\n    }\\n  }\\n  return that\\n}\\n\\n/**\\n * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.\\n * */\\nBuffer.allocUnsafe = function (size) {\\n  return allocUnsafe(null, size)\\n}\\n/**\\n * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.\\n */\\nBuffer.allocUnsafeSlow = function (size) {\\n  return allocUnsafe(null, size)\\n}\\n\\nfunction fromString (that, string, encoding) {\\n  if (typeof encoding !== 'string' || encoding === '') {\\n    encoding = 'utf8'\\n  }\\n\\n  if (!Buffer.isEncoding(encoding)) {\\n    throw new TypeError('\\\"encoding\\\" must be a valid string encoding')\\n  }\\n\\n  var length = byteLength(string, encoding) | 0\\n  that = createBuffer(that, length)\\n\\n  var actual = that.write(string, encoding)\\n\\n  if (actual !== length) {\\n    // Writing a hex string, for example, that contains invalid characters will\\n    // cause everything after the first invalid character to be ignored. (e.g.\\n    // 'abxxcd' will be treated as 'ab')\\n    that = that.slice(0, actual)\\n  }\\n\\n  return that\\n}\\n\\nfunction fromArrayLike (that, array) {\\n  var length = array.length < 0 ? 0 : checked(array.length) | 0\\n  that = createBuffer(that, length)\\n  for (var i = 0; i < length; i += 1) {\\n    that[i] = array[i] & 255\\n  }\\n  return that\\n}\\n\\nfunction fromArrayBuffer (that, array, byteOffset, length) {\\n  array.byteLength // this throws if `array` is not a valid ArrayBuffer\\n\\n  if (byteOffset < 0 || array.byteLength < byteOffset) {\\n    throw new RangeError('\\\\'offset\\\\' is out of bounds')\\n  }\\n\\n  if (array.byteLength < byteOffset + (length || 0)) {\\n    throw new RangeError('\\\\'length\\\\' is out of bounds')\\n  }\\n\\n  if (byteOffset === undefined && length === undefined) {\\n    array = new Uint8Array(array)\\n  } else if (length === undefined) {\\n    array = new Uint8Array(array, byteOffset)\\n  } else {\\n    array = new Uint8Array(array, byteOffset, length)\\n  }\\n\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    // Return an augmented `Uint8Array` instance, for best performance\\n    that = array\\n    that.__proto__ = Buffer.prototype\\n  } else {\\n    // Fallback: Return an object instance of the Buffer class\\n    that = fromArrayLike(that, array)\\n  }\\n  return that\\n}\\n\\nfunction fromObject (that, obj) {\\n  if (Buffer.isBuffer(obj)) {\\n    var len = checked(obj.length) | 0\\n    that = createBuffer(that, len)\\n\\n    if (that.length === 0) {\\n      return that\\n    }\\n\\n    obj.copy(that, 0, 0, len)\\n    return that\\n  }\\n\\n  if (obj) {\\n    if ((typeof ArrayBuffer !== 'undefined' &&\\n        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {\\n      if (typeof obj.length !== 'number' || isnan(obj.length)) {\\n        return createBuffer(that, 0)\\n      }\\n      return fromArrayLike(that, obj)\\n    }\\n\\n    if (obj.type === 'Buffer' && isArray(obj.data)) {\\n      return fromArrayLike(that, obj.data)\\n    }\\n  }\\n\\n  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')\\n}\\n\\nfunction checked (length) {\\n  // Note: cannot use `length < kMaxLength()` here because that fails when\\n  // length is NaN (which is otherwise coerced to zero.)\\n  if (length >= kMaxLength()) {\\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\\n                         'size: 0x' + kMaxLength().toString(16) + ' bytes')\\n  }\\n  return length | 0\\n}\\n\\nfunction SlowBuffer (length) {\\n  if (+length != length) { // eslint-disable-line eqeqeq\\n    length = 0\\n  }\\n  return Buffer.alloc(+length)\\n}\\n\\nBuffer.isBuffer = function isBuffer (b) {\\n  return !!(b != null && b._isBuffer)\\n}\\n\\nBuffer.compare = function compare (a, b) {\\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\\n    throw new TypeError('Arguments must be Buffers')\\n  }\\n\\n  if (a === b) return 0\\n\\n  var x = a.length\\n  var y = b.length\\n\\n  for (var i = 0, len = Math.min(x, y); i < len; ++i) {\\n    if (a[i] !== b[i]) {\\n      x = a[i]\\n      y = b[i]\\n      break\\n    }\\n  }\\n\\n  if (x < y) return -1\\n  if (y < x) return 1\\n  return 0\\n}\\n\\nBuffer.isEncoding = function isEncoding (encoding) {\\n  switch (String(encoding).toLowerCase()) {\\n    case 'hex':\\n    case 'utf8':\\n    case 'utf-8':\\n    case 'ascii':\\n    case 'latin1':\\n    case 'binary':\\n    case 'base64':\\n    case 'ucs2':\\n    case 'ucs-2':\\n    case 'utf16le':\\n    case 'utf-16le':\\n      return true\\n    default:\\n      return false\\n  }\\n}\\n\\nBuffer.concat = function concat (list, length) {\\n  if (!isArray(list)) {\\n    throw new TypeError('\\\"list\\\" argument must be an Array of Buffers')\\n  }\\n\\n  if (list.length === 0) {\\n    return Buffer.alloc(0)\\n  }\\n\\n  var i\\n  if (length === undefined) {\\n    length = 0\\n    for (i = 0; i < list.length; ++i) {\\n      length += list[i].length\\n    }\\n  }\\n\\n  var buffer = Buffer.allocUnsafe(length)\\n  var pos = 0\\n  for (i = 0; i < list.length; ++i) {\\n    var buf = list[i]\\n    if (!Buffer.isBuffer(buf)) {\\n      throw new TypeError('\\\"list\\\" argument must be an Array of Buffers')\\n    }\\n    buf.copy(buffer, pos)\\n    pos += buf.length\\n  }\\n  return buffer\\n}\\n\\nfunction byteLength (string, encoding) {\\n  if (Buffer.isBuffer(string)) {\\n    return string.length\\n  }\\n  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&\\n      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {\\n    return string.byteLength\\n  }\\n  if (typeof string !== 'string') {\\n    string = '' + string\\n  }\\n\\n  var len = string.length\\n  if (len === 0) return 0\\n\\n  // Use a for loop to avoid recursion\\n  var loweredCase = false\\n  for (;;) {\\n    switch (encoding) {\\n      case 'ascii':\\n      case 'latin1':\\n      case 'binary':\\n        return len\\n      case 'utf8':\\n      case 'utf-8':\\n      case undefined:\\n        return utf8ToBytes(string).length\\n      case 'ucs2':\\n      case 'ucs-2':\\n      case 'utf16le':\\n      case 'utf-16le':\\n        return len * 2\\n      case 'hex':\\n        return len >>> 1\\n      case 'base64':\\n        return base64ToBytes(string).length\\n      default:\\n        if (loweredCase) return utf8ToBytes(string).length // assume utf8\\n        encoding = ('' + encoding).toLowerCase()\\n        loweredCase = true\\n    }\\n  }\\n}\\nBuffer.byteLength = byteLength\\n\\nfunction slowToString (encoding, start, end) {\\n  var loweredCase = false\\n\\n  // No need to verify that \\\"this.length <= MAX_UINT32\\\" since it's a read-only\\n  // property of a typed array.\\n\\n  // This behaves neither like String nor Uint8Array in that we set start/end\\n  // to their upper/lower bounds if the value passed is out of range.\\n  // undefined is handled specially as per ECMA-262 6th Edition,\\n  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.\\n  if (start === undefined || start < 0) {\\n    start = 0\\n  }\\n  // Return early if start > this.length. Done here to prevent potential uint32\\n  // coercion fail below.\\n  if (start > this.length) {\\n    return ''\\n  }\\n\\n  if (end === undefined || end > this.length) {\\n    end = this.length\\n  }\\n\\n  if (end <= 0) {\\n    return ''\\n  }\\n\\n  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.\\n  end >>>= 0\\n  start >>>= 0\\n\\n  if (end <= start) {\\n    return ''\\n  }\\n\\n  if (!encoding) encoding = 'utf8'\\n\\n  while (true) {\\n    switch (encoding) {\\n      case 'hex':\\n        return hexSlice(this, start, end)\\n\\n      case 'utf8':\\n      case 'utf-8':\\n        return utf8Slice(this, start, end)\\n\\n      case 'ascii':\\n        return asciiSlice(this, start, end)\\n\\n      case 'latin1':\\n      case 'binary':\\n        return latin1Slice(this, start, end)\\n\\n      case 'base64':\\n        return base64Slice(this, start, end)\\n\\n      case 'ucs2':\\n      case 'ucs-2':\\n      case 'utf16le':\\n      case 'utf-16le':\\n        return utf16leSlice(this, start, end)\\n\\n      default:\\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\\n        encoding = (encoding + '').toLowerCase()\\n        loweredCase = true\\n    }\\n  }\\n}\\n\\n// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect\\n// Buffer instances.\\nBuffer.prototype._isBuffer = true\\n\\nfunction swap (b, n, m) {\\n  var i = b[n]\\n  b[n] = b[m]\\n  b[m] = i\\n}\\n\\nBuffer.prototype.swap16 = function swap16 () {\\n  var len = this.length\\n  if (len % 2 !== 0) {\\n    throw new RangeError('Buffer size must be a multiple of 16-bits')\\n  }\\n  for (var i = 0; i < len; i += 2) {\\n    swap(this, i, i + 1)\\n  }\\n  return this\\n}\\n\\nBuffer.prototype.swap32 = function swap32 () {\\n  var len = this.length\\n  if (len % 4 !== 0) {\\n    throw new RangeError('Buffer size must be a multiple of 32-bits')\\n  }\\n  for (var i = 0; i < len; i += 4) {\\n    swap(this, i, i + 3)\\n    swap(this, i + 1, i + 2)\\n  }\\n  return this\\n}\\n\\nBuffer.prototype.swap64 = function swap64 () {\\n  var len = this.length\\n  if (len % 8 !== 0) {\\n    throw new RangeError('Buffer size must be a multiple of 64-bits')\\n  }\\n  for (var i = 0; i < len; i += 8) {\\n    swap(this, i, i + 7)\\n    swap(this, i + 1, i + 6)\\n    swap(this, i + 2, i + 5)\\n    swap(this, i + 3, i + 4)\\n  }\\n  return this\\n}\\n\\nBuffer.prototype.toString = function toString () {\\n  var length = this.length | 0\\n  if (length === 0) return ''\\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\\n  return slowToString.apply(this, arguments)\\n}\\n\\nBuffer.prototype.equals = function equals (b) {\\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\\n  if (this === b) return true\\n  return Buffer.compare(this, b) === 0\\n}\\n\\nBuffer.prototype.inspect = function inspect () {\\n  var str = ''\\n  var max = exports.INSPECT_MAX_BYTES\\n  if (this.length > 0) {\\n    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')\\n    if (this.length > max) str += ' ... '\\n  }\\n  return '<Buffer ' + str + '>'\\n}\\n\\nBuffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {\\n  if (!Buffer.isBuffer(target)) {\\n    throw new TypeError('Argument must be a Buffer')\\n  }\\n\\n  if (start === undefined) {\\n    start = 0\\n  }\\n  if (end === undefined) {\\n    end = target ? target.length : 0\\n  }\\n  if (thisStart === undefined) {\\n    thisStart = 0\\n  }\\n  if (thisEnd === undefined) {\\n    thisEnd = this.length\\n  }\\n\\n  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {\\n    throw new RangeError('out of range index')\\n  }\\n\\n  if (thisStart >= thisEnd && start >= end) {\\n    return 0\\n  }\\n  if (thisStart >= thisEnd) {\\n    return -1\\n  }\\n  if (start >= end) {\\n    return 1\\n  }\\n\\n  start >>>= 0\\n  end >>>= 0\\n  thisStart >>>= 0\\n  thisEnd >>>= 0\\n\\n  if (this === target) return 0\\n\\n  var x = thisEnd - thisStart\\n  var y = end - start\\n  var len = Math.min(x, y)\\n\\n  var thisCopy = this.slice(thisStart, thisEnd)\\n  var targetCopy = target.slice(start, end)\\n\\n  for (var i = 0; i < len; ++i) {\\n    if (thisCopy[i] !== targetCopy[i]) {\\n      x = thisCopy[i]\\n      y = targetCopy[i]\\n      break\\n    }\\n  }\\n\\n  if (x < y) return -1\\n  if (y < x) return 1\\n  return 0\\n}\\n\\n// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,\\n// OR the last index of `val` in `buffer` at offset <= `byteOffset`.\\n//\\n// Arguments:\\n// - buffer - a Buffer to search\\n// - val - a string, Buffer, or number\\n// - byteOffset - an index into `buffer`; will be clamped to an int32\\n// - encoding - an optional encoding, relevant is val is a string\\n// - dir - true for indexOf, false for lastIndexOf\\nfunction bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {\\n  // Empty buffer means no match\\n  if (buffer.length === 0) return -1\\n\\n  // Normalize byteOffset\\n  if (typeof byteOffset === 'string') {\\n    encoding = byteOffset\\n    byteOffset = 0\\n  } else if (byteOffset > 0x7fffffff) {\\n    byteOffset = 0x7fffffff\\n  } else if (byteOffset < -0x80000000) {\\n    byteOffset = -0x80000000\\n  }\\n  byteOffset = +byteOffset  // Coerce to Number.\\n  if (isNaN(byteOffset)) {\\n    // byteOffset: it it's undefined, null, NaN, \\\"foo\\\", etc, search whole buffer\\n    byteOffset = dir ? 0 : (buffer.length - 1)\\n  }\\n\\n  // Normalize byteOffset: negative offsets start from the end of the buffer\\n  if (byteOffset < 0) byteOffset = buffer.length + byteOffset\\n  if (byteOffset >= buffer.length) {\\n    if (dir) return -1\\n    else byteOffset = buffer.length - 1\\n  } else if (byteOffset < 0) {\\n    if (dir) byteOffset = 0\\n    else return -1\\n  }\\n\\n  // Normalize val\\n  if (typeof val === 'string') {\\n    val = Buffer.from(val, encoding)\\n  }\\n\\n  // Finally, search either indexOf (if dir is true) or lastIndexOf\\n  if (Buffer.isBuffer(val)) {\\n    // Special case: looking for empty string/buffer always fails\\n    if (val.length === 0) {\\n      return -1\\n    }\\n    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)\\n  } else if (typeof val === 'number') {\\n    val = val & 0xFF // Search for a byte value [0-255]\\n    if (Buffer.TYPED_ARRAY_SUPPORT &&\\n        typeof Uint8Array.prototype.indexOf === 'function') {\\n      if (dir) {\\n        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)\\n      } else {\\n        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)\\n      }\\n    }\\n    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)\\n  }\\n\\n  throw new TypeError('val must be string, number or Buffer')\\n}\\n\\nfunction arrayIndexOf (arr, val, byteOffset, encoding, dir) {\\n  var indexSize = 1\\n  var arrLength = arr.length\\n  var valLength = val.length\\n\\n  if (encoding !== undefined) {\\n    encoding = String(encoding).toLowerCase()\\n    if (encoding === 'ucs2' || encoding === 'ucs-2' ||\\n        encoding === 'utf16le' || encoding === 'utf-16le') {\\n      if (arr.length < 2 || val.length < 2) {\\n        return -1\\n      }\\n      indexSize = 2\\n      arrLength /= 2\\n      valLength /= 2\\n      byteOffset /= 2\\n    }\\n  }\\n\\n  function read (buf, i) {\\n    if (indexSize === 1) {\\n      return buf[i]\\n    } else {\\n      return buf.readUInt16BE(i * indexSize)\\n    }\\n  }\\n\\n  var i\\n  if (dir) {\\n    var foundIndex = -1\\n    for (i = byteOffset; i < arrLength; i++) {\\n      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {\\n        if (foundIndex === -1) foundIndex = i\\n        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize\\n      } else {\\n        if (foundIndex !== -1) i -= i - foundIndex\\n        foundIndex = -1\\n      }\\n    }\\n  } else {\\n    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength\\n    for (i = byteOffset; i >= 0; i--) {\\n      var found = true\\n      for (var j = 0; j < valLength; j++) {\\n        if (read(arr, i + j) !== read(val, j)) {\\n          found = false\\n          break\\n        }\\n      }\\n      if (found) return i\\n    }\\n  }\\n\\n  return -1\\n}\\n\\nBuffer.prototype.includes = function includes (val, byteOffset, encoding) {\\n  return this.indexOf(val, byteOffset, encoding) !== -1\\n}\\n\\nBuffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {\\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)\\n}\\n\\nBuffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {\\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)\\n}\\n\\nfunction hexWrite (buf, string, offset, length) {\\n  offset = Number(offset) || 0\\n  var remaining = buf.length - offset\\n  if (!length) {\\n    length = remaining\\n  } else {\\n    length = Number(length)\\n    if (length > remaining) {\\n      length = remaining\\n    }\\n  }\\n\\n  // must be an even number of digits\\n  var strLen = string.length\\n  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')\\n\\n  if (length > strLen / 2) {\\n    length = strLen / 2\\n  }\\n  for (var i = 0; i < length; ++i) {\\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\\n    if (isNaN(parsed)) return i\\n    buf[offset + i] = parsed\\n  }\\n  return i\\n}\\n\\nfunction utf8Write (buf, string, offset, length) {\\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\\n}\\n\\nfunction asciiWrite (buf, string, offset, length) {\\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\\n}\\n\\nfunction latin1Write (buf, string, offset, length) {\\n  return asciiWrite(buf, string, offset, length)\\n}\\n\\nfunction base64Write (buf, string, offset, length) {\\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\\n}\\n\\nfunction ucs2Write (buf, string, offset, length) {\\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\\n}\\n\\nBuffer.prototype.write = function write (string, offset, length, encoding) {\\n  // Buffer#write(string)\\n  if (offset === undefined) {\\n    encoding = 'utf8'\\n    length = this.length\\n    offset = 0\\n  // Buffer#write(string, encoding)\\n  } else if (length === undefined && typeof offset === 'string') {\\n    encoding = offset\\n    length = this.length\\n    offset = 0\\n  // Buffer#write(string, offset[, length][, encoding])\\n  } else if (isFinite(offset)) {\\n    offset = offset | 0\\n    if (isFinite(length)) {\\n      length = length | 0\\n      if (encoding === undefined) encoding = 'utf8'\\n    } else {\\n      encoding = length\\n      length = undefined\\n    }\\n  // legacy write(string, encoding, offset, length) - remove in v0.13\\n  } else {\\n    throw new Error(\\n      'Buffer.write(string, encoding, offset[, length]) is no longer supported'\\n    )\\n  }\\n\\n  var remaining = this.length - offset\\n  if (length === undefined || length > remaining) length = remaining\\n\\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\\n    throw new RangeError('Attempt to write outside buffer bounds')\\n  }\\n\\n  if (!encoding) encoding = 'utf8'\\n\\n  var loweredCase = false\\n  for (;;) {\\n    switch (encoding) {\\n      case 'hex':\\n        return hexWrite(this, string, offset, length)\\n\\n      case 'utf8':\\n      case 'utf-8':\\n        return utf8Write(this, string, offset, length)\\n\\n      case 'ascii':\\n        return asciiWrite(this, string, offset, length)\\n\\n      case 'latin1':\\n      case 'binary':\\n        return latin1Write(this, string, offset, length)\\n\\n      case 'base64':\\n        // Warning: maxLength not taken into account in base64Write\\n        return base64Write(this, string, offset, length)\\n\\n      case 'ucs2':\\n      case 'ucs-2':\\n      case 'utf16le':\\n      case 'utf-16le':\\n        return ucs2Write(this, string, offset, length)\\n\\n      default:\\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\\n        encoding = ('' + encoding).toLowerCase()\\n        loweredCase = true\\n    }\\n  }\\n}\\n\\nBuffer.prototype.toJSON = function toJSON () {\\n  return {\\n    type: 'Buffer',\\n    data: Array.prototype.slice.call(this._arr || this, 0)\\n  }\\n}\\n\\nfunction base64Slice (buf, start, end) {\\n  if (start === 0 && end === buf.length) {\\n    return base64.fromByteArray(buf)\\n  } else {\\n    return base64.fromByteArray(buf.slice(start, end))\\n  }\\n}\\n\\nfunction utf8Slice (buf, start, end) {\\n  end = Math.min(buf.length, end)\\n  var res = []\\n\\n  var i = start\\n  while (i < end) {\\n    var firstByte = buf[i]\\n    var codePoint = null\\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\\n      : (firstByte > 0xDF) ? 3\\n      : (firstByte > 0xBF) ? 2\\n      : 1\\n\\n    if (i + bytesPerSequence <= end) {\\n      var secondByte, thirdByte, fourthByte, tempCodePoint\\n\\n      switch (bytesPerSequence) {\\n        case 1:\\n          if (firstByte < 0x80) {\\n            codePoint = firstByte\\n          }\\n          break\\n        case 2:\\n          secondByte = buf[i + 1]\\n          if ((secondByte & 0xC0) === 0x80) {\\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\\n            if (tempCodePoint > 0x7F) {\\n              codePoint = tempCodePoint\\n            }\\n          }\\n          break\\n        case 3:\\n          secondByte = buf[i + 1]\\n          thirdByte = buf[i + 2]\\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\\n              codePoint = tempCodePoint\\n            }\\n          }\\n          break\\n        case 4:\\n          secondByte = buf[i + 1]\\n          thirdByte = buf[i + 2]\\n          fourthByte = buf[i + 3]\\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\\n              codePoint = tempCodePoint\\n            }\\n          }\\n      }\\n    }\\n\\n    if (codePoint === null) {\\n      // we did not generate a valid codePoint so insert a\\n      // replacement char (U+FFFD) and advance only 1 byte\\n      codePoint = 0xFFFD\\n      bytesPerSequence = 1\\n    } else if (codePoint > 0xFFFF) {\\n      // encode to utf16 (surrogate pair dance)\\n      codePoint -= 0x10000\\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\\n      codePoint = 0xDC00 | codePoint & 0x3FF\\n    }\\n\\n    res.push(codePoint)\\n    i += bytesPerSequence\\n  }\\n\\n  return decodeCodePointsArray(res)\\n}\\n\\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\\n// the lowest limit is Chrome, with 0x10000 args.\\n// We go 1 magnitude less, for safety\\nvar MAX_ARGUMENTS_LENGTH = 0x1000\\n\\nfunction decodeCodePointsArray (codePoints) {\\n  var len = codePoints.length\\n  if (len <= MAX_ARGUMENTS_LENGTH) {\\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\\n  }\\n\\n  // Decode in chunks to avoid \\\"call stack size exceeded\\\".\\n  var res = ''\\n  var i = 0\\n  while (i < len) {\\n    res += String.fromCharCode.apply(\\n      String,\\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\\n    )\\n  }\\n  return res\\n}\\n\\nfunction asciiSlice (buf, start, end) {\\n  var ret = ''\\n  end = Math.min(buf.length, end)\\n\\n  for (var i = start; i < end; ++i) {\\n    ret += String.fromCharCode(buf[i] & 0x7F)\\n  }\\n  return ret\\n}\\n\\nfunction latin1Slice (buf, start, end) {\\n  var ret = ''\\n  end = Math.min(buf.length, end)\\n\\n  for (var i = start; i < end; ++i) {\\n    ret += String.fromCharCode(buf[i])\\n  }\\n  return ret\\n}\\n\\nfunction hexSlice (buf, start, end) {\\n  var len = buf.length\\n\\n  if (!start || start < 0) start = 0\\n  if (!end || end < 0 || end > len) end = len\\n\\n  var out = ''\\n  for (var i = start; i < end; ++i) {\\n    out += toHex(buf[i])\\n  }\\n  return out\\n}\\n\\nfunction utf16leSlice (buf, start, end) {\\n  var bytes = buf.slice(start, end)\\n  var res = ''\\n  for (var i = 0; i < bytes.length; i += 2) {\\n    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)\\n  }\\n  return res\\n}\\n\\nBuffer.prototype.slice = function slice (start, end) {\\n  var len = this.length\\n  start = ~~start\\n  end = end === undefined ? len : ~~end\\n\\n  if (start < 0) {\\n    start += len\\n    if (start < 0) start = 0\\n  } else if (start > len) {\\n    start = len\\n  }\\n\\n  if (end < 0) {\\n    end += len\\n    if (end < 0) end = 0\\n  } else if (end > len) {\\n    end = len\\n  }\\n\\n  if (end < start) end = start\\n\\n  var newBuf\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    newBuf = this.subarray(start, end)\\n    newBuf.__proto__ = Buffer.prototype\\n  } else {\\n    var sliceLen = end - start\\n    newBuf = new Buffer(sliceLen, undefined)\\n    for (var i = 0; i < sliceLen; ++i) {\\n      newBuf[i] = this[i + start]\\n    }\\n  }\\n\\n  return newBuf\\n}\\n\\n/*\\n * Need to make sure that buffer isn't trying to write out of bounds.\\n */\\nfunction checkOffset (offset, ext, length) {\\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\\n}\\n\\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\\n\\n  var val = this[offset]\\n  var mul = 1\\n  var i = 0\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    val += this[offset + i] * mul\\n  }\\n\\n  return val\\n}\\n\\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) {\\n    checkOffset(offset, byteLength, this.length)\\n  }\\n\\n  var val = this[offset + --byteLength]\\n  var mul = 1\\n  while (byteLength > 0 && (mul *= 0x100)) {\\n    val += this[offset + --byteLength] * mul\\n  }\\n\\n  return val\\n}\\n\\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 1, this.length)\\n  return this[offset]\\n}\\n\\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  return this[offset] | (this[offset + 1] << 8)\\n}\\n\\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  return (this[offset] << 8) | this[offset + 1]\\n}\\n\\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return ((this[offset]) |\\n      (this[offset + 1] << 8) |\\n      (this[offset + 2] << 16)) +\\n      (this[offset + 3] * 0x1000000)\\n}\\n\\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return (this[offset] * 0x1000000) +\\n    ((this[offset + 1] << 16) |\\n    (this[offset + 2] << 8) |\\n    this[offset + 3])\\n}\\n\\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\\n\\n  var val = this[offset]\\n  var mul = 1\\n  var i = 0\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    val += this[offset + i] * mul\\n  }\\n  mul *= 0x80\\n\\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\\n\\n  return val\\n}\\n\\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\\n\\n  var i = byteLength\\n  var mul = 1\\n  var val = this[offset + --i]\\n  while (i > 0 && (mul *= 0x100)) {\\n    val += this[offset + --i] * mul\\n  }\\n  mul *= 0x80\\n\\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\\n\\n  return val\\n}\\n\\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 1, this.length)\\n  if (!(this[offset] & 0x80)) return (this[offset])\\n  return ((0xff - this[offset] + 1) * -1)\\n}\\n\\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  var val = this[offset] | (this[offset + 1] << 8)\\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\\n}\\n\\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 2, this.length)\\n  var val = this[offset + 1] | (this[offset] << 8)\\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\\n}\\n\\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return (this[offset]) |\\n    (this[offset + 1] << 8) |\\n    (this[offset + 2] << 16) |\\n    (this[offset + 3] << 24)\\n}\\n\\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n\\n  return (this[offset] << 24) |\\n    (this[offset + 1] << 16) |\\n    (this[offset + 2] << 8) |\\n    (this[offset + 3])\\n}\\n\\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n  return ieee754.read(this, offset, true, 23, 4)\\n}\\n\\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 4, this.length)\\n  return ieee754.read(this, offset, false, 23, 4)\\n}\\n\\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 8, this.length)\\n  return ieee754.read(this, offset, true, 52, 8)\\n}\\n\\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\\n  if (!noAssert) checkOffset(offset, 8, this.length)\\n  return ieee754.read(this, offset, false, 52, 8)\\n}\\n\\nfunction checkInt (buf, value, offset, ext, max, min) {\\n  if (!Buffer.isBuffer(buf)) throw new TypeError('\\\"buffer\\\" argument must be a Buffer instance')\\n  if (value > max || value < min) throw new RangeError('\\\"value\\\" argument is out of bounds')\\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\\n}\\n\\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) {\\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\\n  }\\n\\n  var mul = 1\\n  var i = 0\\n  this[offset] = value & 0xFF\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    this[offset + i] = (value / mul) & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  byteLength = byteLength | 0\\n  if (!noAssert) {\\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\\n  }\\n\\n  var i = byteLength - 1\\n  var mul = 1\\n  this[offset + i] = value & 0xFF\\n  while (--i >= 0 && (mul *= 0x100)) {\\n    this[offset + i] = (value / mul) & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\\n  this[offset] = (value & 0xff)\\n  return offset + 1\\n}\\n\\nfunction objectWriteUInt16 (buf, value, offset, littleEndian) {\\n  if (value < 0) value = 0xffff + value + 1\\n  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {\\n    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>\\n      (littleEndian ? i : 1 - i) * 8\\n  }\\n}\\n\\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value & 0xff)\\n    this[offset + 1] = (value >>> 8)\\n  } else {\\n    objectWriteUInt16(this, value, offset, true)\\n  }\\n  return offset + 2\\n}\\n\\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 8)\\n    this[offset + 1] = (value & 0xff)\\n  } else {\\n    objectWriteUInt16(this, value, offset, false)\\n  }\\n  return offset + 2\\n}\\n\\nfunction objectWriteUInt32 (buf, value, offset, littleEndian) {\\n  if (value < 0) value = 0xffffffff + value + 1\\n  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {\\n    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff\\n  }\\n}\\n\\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset + 3] = (value >>> 24)\\n    this[offset + 2] = (value >>> 16)\\n    this[offset + 1] = (value >>> 8)\\n    this[offset] = (value & 0xff)\\n  } else {\\n    objectWriteUInt32(this, value, offset, true)\\n  }\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 24)\\n    this[offset + 1] = (value >>> 16)\\n    this[offset + 2] = (value >>> 8)\\n    this[offset + 3] = (value & 0xff)\\n  } else {\\n    objectWriteUInt32(this, value, offset, false)\\n  }\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) {\\n    var limit = Math.pow(2, 8 * byteLength - 1)\\n\\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\\n  }\\n\\n  var i = 0\\n  var mul = 1\\n  var sub = 0\\n  this[offset] = value & 0xFF\\n  while (++i < byteLength && (mul *= 0x100)) {\\n    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {\\n      sub = 1\\n    }\\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) {\\n    var limit = Math.pow(2, 8 * byteLength - 1)\\n\\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\\n  }\\n\\n  var i = byteLength - 1\\n  var mul = 1\\n  var sub = 0\\n  this[offset + i] = value & 0xFF\\n  while (--i >= 0 && (mul *= 0x100)) {\\n    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {\\n      sub = 1\\n    }\\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\\n  }\\n\\n  return offset + byteLength\\n}\\n\\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\\n  if (value < 0) value = 0xff + value + 1\\n  this[offset] = (value & 0xff)\\n  return offset + 1\\n}\\n\\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value & 0xff)\\n    this[offset + 1] = (value >>> 8)\\n  } else {\\n    objectWriteUInt16(this, value, offset, true)\\n  }\\n  return offset + 2\\n}\\n\\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 8)\\n    this[offset + 1] = (value & 0xff)\\n  } else {\\n    objectWriteUInt16(this, value, offset, false)\\n  }\\n  return offset + 2\\n}\\n\\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value & 0xff)\\n    this[offset + 1] = (value >>> 8)\\n    this[offset + 2] = (value >>> 16)\\n    this[offset + 3] = (value >>> 24)\\n  } else {\\n    objectWriteUInt32(this, value, offset, true)\\n  }\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\\n  value = +value\\n  offset = offset | 0\\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\\n  if (value < 0) value = 0xffffffff + value + 1\\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\\n    this[offset] = (value >>> 24)\\n    this[offset + 1] = (value >>> 16)\\n    this[offset + 2] = (value >>> 8)\\n    this[offset + 3] = (value & 0xff)\\n  } else {\\n    objectWriteUInt32(this, value, offset, false)\\n  }\\n  return offset + 4\\n}\\n\\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\\n  if (offset < 0) throw new RangeError('Index out of range')\\n}\\n\\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\\n  if (!noAssert) {\\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\\n  }\\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\\n  return offset + 4\\n}\\n\\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\\n  return writeFloat(this, value, offset, true, noAssert)\\n}\\n\\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\\n  return writeFloat(this, value, offset, false, noAssert)\\n}\\n\\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\\n  if (!noAssert) {\\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\\n  }\\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\\n  return offset + 8\\n}\\n\\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\\n  return writeDouble(this, value, offset, true, noAssert)\\n}\\n\\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\\n  return writeDouble(this, value, offset, false, noAssert)\\n}\\n\\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\\n  if (!start) start = 0\\n  if (!end && end !== 0) end = this.length\\n  if (targetStart >= target.length) targetStart = target.length\\n  if (!targetStart) targetStart = 0\\n  if (end > 0 && end < start) end = start\\n\\n  // Copy 0 bytes; we're done\\n  if (end === start) return 0\\n  if (target.length === 0 || this.length === 0) return 0\\n\\n  // Fatal error conditions\\n  if (targetStart < 0) {\\n    throw new RangeError('targetStart out of bounds')\\n  }\\n  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')\\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\\n\\n  // Are we oob?\\n  if (end > this.length) end = this.length\\n  if (target.length - targetStart < end - start) {\\n    end = target.length - targetStart + start\\n  }\\n\\n  var len = end - start\\n  var i\\n\\n  if (this === target && start < targetStart && targetStart < end) {\\n    // descending copy from end\\n    for (i = len - 1; i >= 0; --i) {\\n      target[i + targetStart] = this[i + start]\\n    }\\n  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {\\n    // ascending copy from start\\n    for (i = 0; i < len; ++i) {\\n      target[i + targetStart] = this[i + start]\\n    }\\n  } else {\\n    Uint8Array.prototype.set.call(\\n      target,\\n      this.subarray(start, start + len),\\n      targetStart\\n    )\\n  }\\n\\n  return len\\n}\\n\\n// Usage:\\n//    buffer.fill(number[, offset[, end]])\\n//    buffer.fill(buffer[, offset[, end]])\\n//    buffer.fill(string[, offset[, end]][, encoding])\\nBuffer.prototype.fill = function fill (val, start, end, encoding) {\\n  // Handle string cases:\\n  if (typeof val === 'string') {\\n    if (typeof start === 'string') {\\n      encoding = start\\n      start = 0\\n      end = this.length\\n    } else if (typeof end === 'string') {\\n      encoding = end\\n      end = this.length\\n    }\\n    if (val.length === 1) {\\n      var code = val.charCodeAt(0)\\n      if (code < 256) {\\n        val = code\\n      }\\n    }\\n    if (encoding !== undefined && typeof encoding !== 'string') {\\n      throw new TypeError('encoding must be a string')\\n    }\\n    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {\\n      throw new TypeError('Unknown encoding: ' + encoding)\\n    }\\n  } else if (typeof val === 'number') {\\n    val = val & 255\\n  }\\n\\n  // Invalid ranges are not set to a default, so can range check early.\\n  if (start < 0 || this.length < start || this.length < end) {\\n    throw new RangeError('Out of range index')\\n  }\\n\\n  if (end <= start) {\\n    return this\\n  }\\n\\n  start = start >>> 0\\n  end = end === undefined ? this.length : end >>> 0\\n\\n  if (!val) val = 0\\n\\n  var i\\n  if (typeof val === 'number') {\\n    for (i = start; i < end; ++i) {\\n      this[i] = val\\n    }\\n  } else {\\n    var bytes = Buffer.isBuffer(val)\\n      ? val\\n      : utf8ToBytes(new Buffer(val, encoding).toString())\\n    var len = bytes.length\\n    for (i = 0; i < end - start; ++i) {\\n      this[i + start] = bytes[i % len]\\n    }\\n  }\\n\\n  return this\\n}\\n\\n// HELPER FUNCTIONS\\n// ================\\n\\nvar INVALID_BASE64_RE = /[^+\\\\/0-9A-Za-z-_]/g\\n\\nfunction base64clean (str) {\\n  // Node strips out invalid characters like \\\\n and \\\\t from the string, base64-js does not\\n  str = stringtrim(str).replace(INVALID_BASE64_RE, '')\\n  // Node converts strings with length < 2 to ''\\n  if (str.length < 2) return ''\\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\\n  while (str.length % 4 !== 0) {\\n    str = str + '='\\n  }\\n  return str\\n}\\n\\nfunction stringtrim (str) {\\n  if (str.trim) return str.trim()\\n  return str.replace(/^\\\\s+|\\\\s+$/g, '')\\n}\\n\\nfunction toHex (n) {\\n  if (n < 16) return '0' + n.toString(16)\\n  return n.toString(16)\\n}\\n\\nfunction utf8ToBytes (string, units) {\\n  units = units || Infinity\\n  var codePoint\\n  var length = string.length\\n  var leadSurrogate = null\\n  var bytes = []\\n\\n  for (var i = 0; i < length; ++i) {\\n    codePoint = string.charCodeAt(i)\\n\\n    // is surrogate component\\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\\n      // last char was a lead\\n      if (!leadSurrogate) {\\n        // no lead yet\\n        if (codePoint > 0xDBFF) {\\n          // unexpected trail\\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n          continue\\n        } else if (i + 1 === length) {\\n          // unpaired lead\\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n          continue\\n        }\\n\\n        // valid lead\\n        leadSurrogate = codePoint\\n\\n        continue\\n      }\\n\\n      // 2 leads in a row\\n      if (codePoint < 0xDC00) {\\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n        leadSurrogate = codePoint\\n        continue\\n      }\\n\\n      // valid surrogate pair\\n      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000\\n    } else if (leadSurrogate) {\\n      // valid bmp char, but last char was a lead\\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\\n    }\\n\\n    leadSurrogate = null\\n\\n    // encode utf8\\n    if (codePoint < 0x80) {\\n      if ((units -= 1) < 0) break\\n      bytes.push(codePoint)\\n    } else if (codePoint < 0x800) {\\n      if ((units -= 2) < 0) break\\n      bytes.push(\\n        codePoint >> 0x6 | 0xC0,\\n        codePoint & 0x3F | 0x80\\n      )\\n    } else if (codePoint < 0x10000) {\\n      if ((units -= 3) < 0) break\\n      bytes.push(\\n        codePoint >> 0xC | 0xE0,\\n        codePoint >> 0x6 & 0x3F | 0x80,\\n        codePoint & 0x3F | 0x80\\n      )\\n    } else if (codePoint < 0x110000) {\\n      if ((units -= 4) < 0) break\\n      bytes.push(\\n        codePoint >> 0x12 | 0xF0,\\n        codePoint >> 0xC & 0x3F | 0x80,\\n        codePoint >> 0x6 & 0x3F | 0x80,\\n        codePoint & 0x3F | 0x80\\n      )\\n    } else {\\n      throw new Error('Invalid code point')\\n    }\\n  }\\n\\n  return bytes\\n}\\n\\nfunction asciiToBytes (str) {\\n  var byteArray = []\\n  for (var i = 0; i < str.length; ++i) {\\n    // Node's code seems to be doing this and not & 0x7F..\\n    byteArray.push(str.charCodeAt(i) & 0xFF)\\n  }\\n  return byteArray\\n}\\n\\nfunction utf16leToBytes (str, units) {\\n  var c, hi, lo\\n  var byteArray = []\\n  for (var i = 0; i < str.length; ++i) {\\n    if ((units -= 2) < 0) break\\n\\n    c = str.charCodeAt(i)\\n    hi = c >> 8\\n    lo = c % 256\\n    byteArray.push(lo)\\n    byteArray.push(hi)\\n  }\\n\\n  return byteArray\\n}\\n\\nfunction base64ToBytes (str) {\\n  return base64.toByteArray(base64clean(str))\\n}\\n\\nfunction blitBuffer (src, dst, offset, length) {\\n  for (var i = 0; i < length; ++i) {\\n    if ((i + offset >= dst.length) || (i >= src.length)) break\\n    dst[i + offset] = src[i]\\n  }\\n  return i\\n}\\n\\nfunction isnan (val) {\\n  return val !== val // eslint-disable-line no-self-compare\\n}\\n\\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/node-libs-browser/node_modules/buffer/index.js\\n// module id = 0\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/buffer/index.js?\");\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports) {\n\neval(\"var g;\\n\\n// This works in non-strict mode\\ng = (function() {\\n\\treturn this;\\n})();\\n\\ntry {\\n\\t// This works if eval is allowed (see CSP)\\n\\tg = g || Function(\\\"return this\\\")() || (1,eval)(\\\"this\\\");\\n} catch(e) {\\n\\t// This works if the window reference is available\\n\\tif(typeof window === \\\"object\\\")\\n\\t\\tg = window;\\n}\\n\\n// g can still be undefined, but nothing to do about it...\\n// We return undefined, instead of nothing here, so it's\\n// easier to handle this case. if(!global) { ...}\\n\\nmodule.exports = g;\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// (webpack)/buildin/global.js\\n// module id = 1\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///(webpack)/buildin/global.js?\");\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"\\n\\nexports.byteLength = byteLength\\nexports.toByteArray = toByteArray\\nexports.fromByteArray = fromByteArray\\n\\nvar lookup = []\\nvar revLookup = []\\nvar Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array\\n\\nvar code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\\nfor (var i = 0, len = code.length; i < len; ++i) {\\n  lookup[i] = code[i]\\n  revLookup[code.charCodeAt(i)] = i\\n}\\n\\nrevLookup['-'.charCodeAt(0)] = 62\\nrevLookup['_'.charCodeAt(0)] = 63\\n\\nfunction placeHoldersCount (b64) {\\n  var len = b64.length\\n  if (len % 4 > 0) {\\n    throw new Error('Invalid string. Length must be a multiple of 4')\\n  }\\n\\n  // the number of equal signs (place holders)\\n  // if there are two placeholders, than the two characters before it\\n  // represent one byte\\n  // if there is only one, then the three characters before it represent 2 bytes\\n  // this is just a cheap hack to not do indexOf twice\\n  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0\\n}\\n\\nfunction byteLength (b64) {\\n  // base64 is 4/3 + up to two characters of the original data\\n  return (b64.length * 3 / 4) - placeHoldersCount(b64)\\n}\\n\\nfunction toByteArray (b64) {\\n  var i, l, tmp, placeHolders, arr\\n  var len = b64.length\\n  placeHolders = placeHoldersCount(b64)\\n\\n  arr = new Arr((len * 3 / 4) - placeHolders)\\n\\n  // if there are placeholders, only get up to the last complete 4 chars\\n  l = placeHolders > 0 ? len - 4 : len\\n\\n  var L = 0\\n\\n  for (i = 0; i < l; i += 4) {\\n    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]\\n    arr[L++] = (tmp >> 16) & 0xFF\\n    arr[L++] = (tmp >> 8) & 0xFF\\n    arr[L++] = tmp & 0xFF\\n  }\\n\\n  if (placeHolders === 2) {\\n    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)\\n    arr[L++] = tmp & 0xFF\\n  } else if (placeHolders === 1) {\\n    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)\\n    arr[L++] = (tmp >> 8) & 0xFF\\n    arr[L++] = tmp & 0xFF\\n  }\\n\\n  return arr\\n}\\n\\nfunction tripletToBase64 (num) {\\n  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]\\n}\\n\\nfunction encodeChunk (uint8, start, end) {\\n  var tmp\\n  var output = []\\n  for (var i = start; i < end; i += 3) {\\n    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])\\n    output.push(tripletToBase64(tmp))\\n  }\\n  return output.join('')\\n}\\n\\nfunction fromByteArray (uint8) {\\n  var tmp\\n  var len = uint8.length\\n  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes\\n  var output = ''\\n  var parts = []\\n  var maxChunkLength = 16383 // must be multiple of 3\\n\\n  // go through the array every three bytes, we'll deal with trailing stuff later\\n  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {\\n    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))\\n  }\\n\\n  // pad the end with zeros, but make sure to not forget the extra bytes\\n  if (extraBytes === 1) {\\n    tmp = uint8[len - 1]\\n    output += lookup[tmp >> 2]\\n    output += lookup[(tmp << 4) & 0x3F]\\n    output += '=='\\n  } else if (extraBytes === 2) {\\n    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])\\n    output += lookup[tmp >> 10]\\n    output += lookup[(tmp >> 4) & 0x3F]\\n    output += lookup[(tmp << 2) & 0x3F]\\n    output += '='\\n  }\\n\\n  parts.push(output)\\n\\n  return parts.join('')\\n}\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/base64-js/index.js\\n// module id = 2\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/base64-js/index.js?\");\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports) {\n\neval(\"exports.read = function (buffer, offset, isLE, mLen, nBytes) {\\n  var e, m\\n  var eLen = nBytes * 8 - mLen - 1\\n  var eMax = (1 << eLen) - 1\\n  var eBias = eMax >> 1\\n  var nBits = -7\\n  var i = isLE ? (nBytes - 1) : 0\\n  var d = isLE ? -1 : 1\\n  var s = buffer[offset + i]\\n\\n  i += d\\n\\n  e = s & ((1 << (-nBits)) - 1)\\n  s >>= (-nBits)\\n  nBits += eLen\\n  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}\\n\\n  m = e & ((1 << (-nBits)) - 1)\\n  e >>= (-nBits)\\n  nBits += mLen\\n  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}\\n\\n  if (e === 0) {\\n    e = 1 - eBias\\n  } else if (e === eMax) {\\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\\n  } else {\\n    m = m + Math.pow(2, mLen)\\n    e = e - eBias\\n  }\\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\\n}\\n\\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\\n  var e, m, c\\n  var eLen = nBytes * 8 - mLen - 1\\n  var eMax = (1 << eLen) - 1\\n  var eBias = eMax >> 1\\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\\n  var i = isLE ? 0 : (nBytes - 1)\\n  var d = isLE ? 1 : -1\\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\\n\\n  value = Math.abs(value)\\n\\n  if (isNaN(value) || value === Infinity) {\\n    m = isNaN(value) ? 1 : 0\\n    e = eMax\\n  } else {\\n    e = Math.floor(Math.log(value) / Math.LN2)\\n    if (value * (c = Math.pow(2, -e)) < 1) {\\n      e--\\n      c *= 2\\n    }\\n    if (e + eBias >= 1) {\\n      value += rt / c\\n    } else {\\n      value += rt * Math.pow(2, 1 - eBias)\\n    }\\n    if (value * c >= 2) {\\n      e++\\n      c /= 2\\n    }\\n\\n    if (e + eBias >= eMax) {\\n      m = 0\\n      e = eMax\\n    } else if (e + eBias >= 1) {\\n      m = (value * c - 1) * Math.pow(2, mLen)\\n      e = e + eBias\\n    } else {\\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\\n      e = 0\\n    }\\n  }\\n\\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\\n\\n  e = (e << mLen) | m\\n  eLen += mLen\\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\\n\\n  buffer[offset + i - d] |= s * 128\\n}\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/ieee754/index.js\\n// module id = 3\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/ieee754/index.js?\");\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports) {\n\neval(\"var toString = {}.toString;\\n\\nmodule.exports = Array.isArray || function (arr) {\\n  return toString.call(arr) == '[object Array]';\\n};\\n\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./node_modules/isarray/index.js\\n// module id = 4\\n// module chunks = 0 1 2 3\\n\\n//# sourceURL=webpack:///./node_modules/isarray/index.js?\");\n\n/***/ }),\n/* 5 */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\neval(\"Object.defineProperty(__webpack_exports__, \\\"__esModule\\\", { value: true });\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_buffer___ = __webpack_require__(0);\\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_buffer____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_buffer___);\\n/**\\n* Created by ajk on 12/16/15.\\n* Purpose: This file folds all the constants for the\\n*     OpenBCI Board\\n*/\\n\\n\\n\\n\\n/** Turning channels off */\\nconst obciChannelOff1 = '1';\\nconst obciChannelOff2 = '2';\\nconst obciChannelOff3 = '3';\\nconst obciChannelOff4 = '4';\\nconst obciChannelOff5 = '5';\\nconst obciChannelOff6 = '6';\\nconst obciChannelOff7 = '7';\\nconst obciChannelOff8 = '8';\\nconst obciChannelOff9 = 'q';\\nconst obciChannelOff10 = 'w';\\nconst obciChannelOff11 = 'e';\\nconst obciChannelOff12 = 'r';\\nconst obciChannelOff13 = 't';\\nconst obciChannelOff14 = 'y';\\nconst obciChannelOff15 = 'u';\\nconst obciChannelOff16 = 'i';\\n\\n/** Turn channels on */\\nconst obciChannelOn1 = '!';\\nconst obciChannelOn2 = '@';\\nconst obciChannelOn3 = '#';\\nconst obciChannelOn4 = '$';\\nconst obciChannelOn5 = '%';\\nconst obciChannelOn6 = '^';\\nconst obciChannelOn7 = '&';\\nconst obciChannelOn8 = '*';\\nconst obciChannelOn9 = 'Q';\\nconst obciChannelOn10 = 'W';\\nconst obciChannelOn11 = 'E';\\nconst obciChannelOn12 = 'R';\\nconst obciChannelOn13 = 'T';\\nconst obciChannelOn14 = 'Y';\\nconst obciChannelOn15 = 'U';\\nconst obciChannelOn16 = 'I';\\n\\n/** Test Signal Control Commands\\n* 1x - Voltage will be 1 * (VREFP - VREFN) / 2.4 mV\\n* 2x - Voltage will be 2 * (VREFP - VREFN) / 2.4 mV\\n*/\\nconst obciTestSignalConnectToDC = 'p';\\nconst obciTestSignalConnectToGround = '0';\\nconst obciTestSignalConnectToPulse1xFast = '=';\\nconst obciTestSignalConnectToPulse1xSlow = '-';\\nconst obciTestSignalConnectToPulse2xFast = ']';\\nconst obciTestSignalConnectToPulse2xSlow = '[';\\n\\n/** Channel Setting Commands */\\nconst obciChannelCmdADCNormal = '0';\\nconst obciChannelCmdADCShorted = '1';\\nconst obciChannelCmdADCBiasDRP = '6';\\nconst obciChannelCmdADCBiasDRN = '7';\\nconst obciChannelCmdADCBiasMethod = '2';\\nconst obciChannelCmdADCMVDD = '3';\\nconst obciChannelCmdADCTemp = '4';\\nconst obciChannelCmdADCTestSig = '5';\\nconst obciChannelCmdBiasInclude = '1';\\nconst obciChannelCmdBiasRemove = '0';\\nconst obciChannelCmdChannel1 = '1';\\nconst obciChannelCmdChannel2 = '2';\\nconst obciChannelCmdChannel3 = '3';\\nconst obciChannelCmdChannel4 = '4';\\nconst obciChannelCmdChannel5 = '5';\\nconst obciChannelCmdChannel6 = '6';\\nconst obciChannelCmdChannel7 = '7';\\nconst obciChannelCmdChannel8 = '8';\\nconst obciChannelCmdChannel9 = 'Q';\\nconst obciChannelCmdChannel10 = 'W';\\nconst obciChannelCmdChannel11 = 'E';\\nconst obciChannelCmdChannel12 = 'R';\\nconst obciChannelCmdChannel13 = 'T';\\nconst obciChannelCmdChannel14 = 'Y';\\nconst obciChannelCmdChannel15 = 'U';\\nconst obciChannelCmdChannel16 = 'I';\\nconst obciChannelCmdGain1 = '0';\\nconst obciChannelCmdGain2 = '1';\\nconst obciChannelCmdGain4 = '2';\\nconst obciChannelCmdGain6 = '3';\\nconst obciChannelCmdGain8 = '4';\\nconst obciChannelCmdGain12 = '5';\\nconst obciChannelCmdGain24 = '6';\\nconst obciChannelCmdLatch = 'X';\\nconst obciChannelCmdPowerOff = '1';\\nconst obciChannelCmdPowerOn = '0';\\nconst obciChannelCmdSet = 'x';\\nconst obciChannelCmdSRB1Connect = '1';\\nconst obciChannelCmdSRB1Diconnect = '0';\\nconst obciChannelCmdSRB2Connect = '1';\\nconst obciChannelCmdSRB2Diconnect = '0';\\n\\n/** Channel Setting Helper Strings */\\nconst obciStringADCNormal = 'normal';\\nconst obciStringADCShorted = 'shorted';\\nconst obciStringADCBiasMethod = 'biasMethod';\\nconst obciStringADCMvdd = 'mvdd';\\nconst obciStringADCTemp = 'temp';\\nconst obciStringADCTestSig = 'testSig';\\nconst obciStringADCBiasDrp = 'biasDrp';\\nconst obciStringADCBiasDrn = 'biasDrn';\\n\\n/** Default Channel Settings */\\nconst obciChannelDefaultAllSet = 'd';\\nconst obciChannelDefaultAllGet = 'D';\\n\\n/** LeadOff Impedance Commands */\\nconst obciChannelImpedanceLatch = 'Z';\\nconst obciChannelImpedanceSet = 'z';\\nconst obciChannelImpedanceTestSignalApplied = '1';\\nconst obciChannelImpedanceTestSignalAppliedNot = '0';\\n\\n/** SD card Commands */\\nconst obciSDLogForHour1 = 'G';\\nconst obciSDLogForHour2 = 'H';\\nconst obciSDLogForHour4 = 'J';\\nconst obciSDLogForHour12 = 'K';\\nconst obciSDLogForHour24 = 'L';\\nconst obciSDLogForMin5 = 'A';\\nconst obciSDLogForMin15 = 'S';\\nconst obciSDLogForMin30 = 'F';\\nconst obciSDLogForSec14 = 'a';\\nconst obciSDLogStop = 'j';\\n\\n/** SD Card String Commands */\\nconst obciStringSDHour1 = '1hour';\\nconst obciStringSDHour2 = '2hour';\\nconst obciStringSDHour4 = '4hour';\\nconst obciStringSDHour12 = '12hour';\\nconst obciStringSDHour24 = '24hour';\\nconst obciStringSDMin5 = '5min';\\nconst obciStringSDMin15 = '15min';\\nconst obciStringSDMin30 = '30min';\\nconst obciStringSDSec14 = '14sec';\\n\\n/** Stream Data Commands */\\nconst obciStreamStart = 'b';\\nconst obciStreamStop = 's';\\n\\n/** Miscellaneous */\\nconst obciMiscQueryRegisterSettings = '?';\\nconst obciMiscQueryRegisterSettingsChannel1 = 'CH1SET';\\nconst obciMiscQueryRegisterSettingsChannel2 = 'CH2SET';\\nconst obciMiscQueryRegisterSettingsChannel3 = 'CH3SET';\\nconst obciMiscQueryRegisterSettingsChannel4 = 'CH4SET';\\nconst obciMiscQueryRegisterSettingsChannel5 = 'CH5SET';\\nconst obciMiscQueryRegisterSettingsChannel6 = 'CH6SET';\\nconst obciMiscQueryRegisterSettingsChannel7 = 'CH7SET';\\nconst obciMiscQueryRegisterSettingsChannel8 = 'CH8SET';\\nconst obciMiscSoftReset = 'v';\\n\\n/** 16 Channel Commands */\\nconst obciChannelMaxNumber8 = 'c';\\nconst obciChannelMaxNumber16 = 'C';\\nconst obciChannelMaxNumber8NoDaisyToRemove = '';\\nconst obciChannelMaxNumber8SuccessDaisyRemoved = 'daisy removed';\\nconst obciChannelMaxNumber16DaisyAlreadyAttached = '16';\\nconst obciChannelMaxNumber16DaisyAttached = 'daisy attached16';\\nconst obciChannelMaxNumber16NoDaisyAttached = 'no daisy to attach!8';\\n\\n/** 60Hz line filter */\\nconst obciFilterDisable = 'g';\\nconst obciFilterEnable = 'f';\\n\\n/** Triggers */\\nconst obciTrigger = '`';\\n\\n/** Sync Clocks */\\nconst obciSyncTimeSet = '<';\\nconst obciSyncTimeSent = ',';\\n\\n/** Set board mode */\\nconst obciBoardModeSet = '/';\\nconst obciBoardModeCmdDefault = '0';\\nconst obciBoardModeCmdDebug = '1';\\nconst obciBoardModeCmdAnalog = '2';\\nconst obciBoardModeCmdDigital = '3';\\nconst obciBoardModeCmdGetCur = '/';\\nconst obciBoardModeAnalog = 'analog';\\nconst obciBoardModeDefault = 'default';\\nconst obciBoardModeDebug = 'debug';\\nconst obciBoardModeDigital = 'digital';\\n\\n/** Set sample rate */\\nconst obciSampleRateSet = '~';\\nconst obciSampleRateCmdCyton16000 = '0';\\nconst obciSampleRateCmdCyton8000 = '1';\\nconst obciSampleRateCmdCyton4000 = '2';\\nconst obciSampleRateCmdCyton2000 = '3';\\nconst obciSampleRateCmdCyton1000 = '4';\\nconst obciSampleRateCmdCyton500 = '5';\\nconst obciSampleRateCmdCyton250 = '6';\\nconst obciSampleRateCmdGang25600 = '0';\\nconst obciSampleRateCmdGang12800 = '1';\\nconst obciSampleRateCmdGang6400 = '2';\\nconst obciSampleRateCmdGang3200 = '3';\\nconst obciSampleRateCmdGang1600 = '4';\\nconst obciSampleRateCmdGang800 = '5';\\nconst obciSampleRateCmdGang400 = '6';\\nconst obciSampleRateCmdGang200 = '7';\\nconst obciSampleRateCmdaGetCur = '~';\\n\\n/** Accel enable/disable commands */\\nconst obciAccelStart = 'n';\\nconst obciAccelStop = 'N';\\n\\n/** Wifi Stuff */\\nconst obciWifiAttach = '{';\\nconst obciWifiRemove = '}';\\nconst obciWifiReset = ';';\\nconst obciWifiStatus = ':';\\n\\n/** Radio Key */\\nconst obciRadioKey = 0xF0;\\n/** Radio Commands */\\nconst obciRadioCmdChannelGet = 0x00;\\nconst obciRadioCmdChannelSet = 0x01;\\nconst obciRadioCmdChannelSetOverride = 0x02;\\nconst obciRadioCmdPollTimeGet = 0x03;\\nconst obciRadioCmdPollTimeSet = 0x04;\\nconst obciRadioCmdBaudRateSetDefault = 0x05;\\nconst obciRadioCmdBaudRateSetFast = 0x06;\\nconst obciRadioCmdSystemStatus = 0x07;\\n\\n/** Possible number of channels */\\nconst obciNumberOfChannelsCyton = 8;\\nconst obciNumberOfChannelsCytonBLE = 2;\\nconst obciNumberOfChannelsDaisy = 16;\\nconst obciNumberOfChannelsDefault = obciNumberOfChannelsCyton;\\nconst obciNumberOfChannelsGanglion = 4;\\n\\n/** Possible OpenBCI board types */\\nconst obciBoardCyton = 'cyton';\\nconst obciBoardCytonBLE = 'cytonBLE';\\nconst obciBoardDaisy = 'daisy';\\nconst obciBoardDefault = 'default';\\nconst obciBoardGanglion = 'ganglion';\\nconst obciBoardNone = 'none';\\n\\n/** Possible Simulator Line Noise injections */\\nconst obciSimulatorLineNoiseHz60 = '60Hz';\\nconst obciSimulatorLineNoiseHz50 = '50Hz';\\nconst obciSimulatorLineNoiseNone = 'none';\\n\\n/** Possible Simulator Fragmentation modes */\\nconst obciSimulatorFragmentationRandom = 'random';\\nconst obciSimulatorFragmentationFullBuffers = 'fullBuffers';\\nconst obciSimulatorFragmentationOneByOne = 'oneByOne';\\nconst obciSimulatorFragmentationNone = 'none';\\n\\n/** Possible Sample Rates */\\nconst obciSampleRate1000 = 1000;\\nconst obciSampleRate125 = 125;\\nconst obciSampleRate12800 = 12800;\\nconst obciSampleRate1600 = 1600;\\nconst obciSampleRate16000 = 16000;\\nconst obciSampleRate200 = 200;\\nconst obciSampleRate2000 = 2000;\\nconst obciSampleRate250 = 250;\\nconst obciSampleRate25600 = 25600;\\nconst obciSampleRate3200 = 3200;\\nconst obciSampleRate400 = 400;\\nconst obciSampleRate4000 = 4000;\\nconst obciSampleRate500 = 500;\\nconst obciSampleRate6400 = 6400;\\nconst obciSampleRate800 = 800;\\nconst obciSampleRate8000 = 8000;\\n\\n/** Max sample number */\\nconst obciSampleNumberMax = 255;\\n\\n/** Packet Size */\\nconst obciPacketSize = 33;\\nconst obciPacketSizeBLECyton = 20;\\nconst obciPacketSizeBLERaw = 12;\\n\\n/** OpenBCI V3 Standard Packet Positions */\\n/**\\n* 0:[startByte] | 1:[sampleNumber] | 2:[Channel-1.1] | 3:[Channel-1.2] | 4:[Channel-1.3] | 5:[Channel-2.1] | 6:[Channel-2.2] | 7:[Channel-2.3] | 8:[Channel-3.1] | 9:[Channel-3.2] | 10:[Channel-3.3] | 11:[Channel-4.1] | 12:[Channel-4.2] | 13:[Channel-4.3] | 14:[Channel-5.1] | 15:[Channel-5.2] | 16:[Channel-5.3] | 17:[Channel-6.1] | 18:[Channel-6.2] | 19:[Channel-6.3] | 20:[Channel-7.1] | 21:[Channel-7.2] | 22:[Channel-7.3] | 23:[Channel-8.1] | 24:[Channel-8.2] | 25:[Channel-8.3] | 26:[Aux-1.1] | 27:[Aux-1.2] | 28:[Aux-2.1] | 29:[Aux-2.2] | 30:[Aux-3.1] | 31:[Aux-3.2] | 32:StopByte\\n*/\\nconst obciPacketPositionChannelDataStart = 2; // 0:startByte | 1:sampleNumber | [2:4] | [5:7] | [8:10] | [11:13] | [14:16] | [17:19] | [21:23] | [24:26]\\nconst obciPacketPositionChannelDataStop = 25; // 24 bytes for channel data\\nconst obciPacketPositionSampleNumber = 1;\\nconst obciPacketPositionStartByte = 0; // first byte\\nconst obciPacketPositionStopByte = 32; // [32]\\nconst obciPacketPositionStartAux = 26; // [26,27]:Aux 1 | [28,29]:Aux 2 | [30,31]:Aux 3\\nconst obciPacketPositionStopAux = 31; // - - - [30,31]:Aux 3 | 32: Stop byte\\nconst obciPacketPositionTimeSyncAuxStart = 26;\\nconst obciPacketPositionTimeSyncAuxStop = 28;\\nconst obciPacketPositionTimeSyncTimeStart = 28;\\nconst obciPacketPositionTimeSyncTimeStop = 32;\\n\\n/** Notable Bytes */\\nconst obciByteStart = 0xA0;\\nconst obciByteStop = 0xC0;\\n\\n/** Errors */\\nconst errorInvalidByteLength = 'Invalid Packet Byte Length';\\nconst errorInvalidByteStart = 'Invalid Start Byte';\\nconst errorInvalidByteStop = 'Invalid Stop Byte';\\nconst errorInvalidData = 'Invalid data - try again';\\nconst errorInvalidType = 'Invalid type - check comments for input type';\\nconst errorMissingRegisterSetting = 'Missing register setting';\\nconst errorMissingRequiredProperty = 'Missing property in JSON';\\nconst errorNobleAlreadyScanning = 'Scan already under way';\\nconst errorNobleNotAlreadyScanning = 'No scan started';\\nconst errorNobleNotInPoweredOnState = 'Please turn blue tooth on.';\\nconst errorTimeSyncIsNull = \\\"'this.sync.curSyncObj' must not be null\\\";\\nconst errorTimeSyncNoComma = 'Missed the time sync sent confirmation. Try sync again';\\nconst errorUndefinedOrNullInput = 'Undefined or Null Input';\\n\\n/** Max Master Buffer Size */\\nconst obciMasterBufferSize = 4096;\\n\\n/** Impedance Calculation Variables */\\nconst obciLeadOffDriveInAmps = 0.000000006;\\nconst obciLeadOffFrequencyHz = 31.5;\\n\\n/** Command send delay */\\nconst obciWriteIntervalDelayMSLong = 50;\\nconst obciWriteIntervalDelayMSNone = 0;\\nconst obciWriteIntervalDelayMSShort = 10;\\n\\n/** Impedance */\\nconst obciImpedanceTextBad = 'bad';\\nconst obciImpedanceTextNone = 'none';\\nconst obciImpedanceTextGood = 'good';\\nconst obciImpedanceTextInit = 'init';\\nconst obciImpedanceTextOk = 'ok';\\n\\nconst obciImpedanceThresholdGoodMin = 0;\\nconst obciImpedanceThresholdGoodMax = 5000;\\nconst obciImpedanceThresholdOkMin = 5001;\\nconst obciImpedanceThresholdOkMax = 10000;\\nconst obciImpedanceThresholdBadMin = 10001;\\nconst obciImpedanceThresholdBadMax = 1000000;\\n\\nconst obciImpedanceSeriesResistor = 2200; // There is a 2.2 k Ohm series resistor that must be subtracted\\n\\n/** Simulator */\\nconst obciSimulatorPortName = 'OpenBCISimulator';\\n\\n/**\\n* Stream packet types/codes\\n*/\\nconst obciStreamPacketStandardAccel = 0; // 0000\\nconst obciStreamPacketStandardRawAux = 1; // 0001\\nconst obciStreamPacketUserDefinedType = 2; // 0010\\nconst obciStreamPacketAccelTimeSyncSet = 3; // 0011\\nconst obciStreamPacketAccelTimeSynced = 4; // 0100\\nconst obciStreamPacketRawAuxTimeSyncSet = 5; // 0101\\nconst obciStreamPacketRawAuxTimeSynced = 6; // 0110\\nconst obciStreamPacketImpedance = 7; // 0111\\n\\n/** Time from board */\\nconst obciStreamPacketTimeByteSize = 4;\\n\\n/** Time synced with accel packet */\\nconst obciAccelAxisX = 7;\\nconst obciAccelAxisY = 8;\\nconst obciAccelAxisZ = 9;\\n\\n/** Firmware version indicator */\\nconst obciFirmwareV1 = 'v1';\\nconst obciFirmwareV2 = 'v2';\\nconst obciFirmwareV3 = 'v3';\\n\\n/** Parse */\\nconst obciParseDaisy = 'Daisy';\\nconst obciParseFirmware = 'v2';\\nconst obciParseFailure = 'Failure';\\nconst obciParseEOT = '$$$';\\nconst obciParseSuccess = 'Success';\\n\\n/** Used in parsing incoming serial data */\\nconst obciParsingChannelSettings = 2;\\nconst obciParsingEOT = 4;\\nconst obciParsingNormal = 3;\\nconst obciParsingReset = 0;\\nconst obciParsingTimeSyncSent = 1;\\n\\n/** Timeouts */\\nconst obciTimeoutProcessBytes = 500; // 0.5 seconds\\n\\n/** Simulator Board Configurations */\\nconst obciSimulatorRawAux = 'rawAux';\\nconst obciSimulatorStandard = 'standard';\\n\\n/** OpenBCI Radio Limits */\\nconst obciRadioChannelMax = 25;\\nconst obciRadioChannelMin = 1;\\nconst obciRadioPollTimeMax = 255;\\nconst obciRadioPollTimeMin = 0;\\n\\n/** Time sync stuff */\\nconst obciTimeSyncArraySize = 10;\\nconst obciTimeSyncMultiplierWithSyncConf = 0.9;\\nconst obciTimeSyncMultiplierWithoutSyncConf = 0.75;\\nconst obciTimeSyncThresholdTransFailureMS = 10; // ms\\n\\n/** Baud Rates */\\nconst obciRadioBaudRateDefault = 115200;\\nconst obciRadioBaudRateDefaultStr = 'default';\\nconst obciRadioBaudRateFast = 230400;\\nconst obciRadioBaudRateFastStr = 'fast';\\n\\n/** Emitters */\\nconst obciEmitterAccelerometer = 'accelerometer';\\nconst obciEmitterBlePoweredUp = 'blePoweredOn';\\nconst obciEmitterClose = 'close';\\nconst obciEmitterDroppedPacket = 'droppedPacket';\\nconst obciEmitterEot = 'eot';\\nconst obciEmitterError = 'error';\\nconst obciEmitterGanglionFound = 'ganglionFound';\\nconst obciEmitterHardSet = 'hardSet';\\nconst obciEmitterImpedance = 'impedance';\\nconst obciEmitterImpedanceArray = 'impedanceArray';\\nconst obciEmitterMessage = 'message';\\nconst obciEmitterQuery = 'query';\\nconst obciEmitterRawDataPacket = 'rawDataPacket';\\nconst obciEmitterReady = 'ready';\\nconst obciEmitterRFduino = 'rfduino';\\nconst obciEmitterSample = 'sample';\\nconst obciEmitterScanStopped = 'scanStopped';\\nconst obciEmitterSynced = 'synced';\\nconst obciEmitterWifiShield = 'wifiShield';\\n\\n/** Accel packets */\\nconst obciGanglionAccelAxisX = 1;\\nconst obciGanglionAccelAxisY = 2;\\nconst obciGanglionAccelAxisZ = 3;\\n\\n/** Accel scale factor */\\nconst obciGanglionAccelScaleFactor = 0.016; // mG per count\\n\\n/** Ganglion */\\nconst obciGanglionBleSearchTime = 20000; // ms\\nconst obciGanglionByteIdUncompressed = 0;\\nconst obciGanglionByteId18Bit = {\\n  max: 100,\\n  min: 1\\n};\\nconst obciGanglionByteId19Bit = {\\n  max: 200,\\n  min: 101\\n};\\nconst obciGanglionByteIdImpedanceChannel1 = 201;\\nconst obciGanglionByteIdImpedanceChannel2 = 202;\\nconst obciGanglionByteIdImpedanceChannel3 = 203;\\nconst obciGanglionByteIdImpedanceChannel4 = 204;\\nconst obciGanglionByteIdImpedanceChannelReference = 205;\\nconst obciGanglionByteIdMultiPacket = 206;\\nconst obciGanglionByteIdMultiPacketStop = 207;\\nconst obciGanglionPacketSize = 20;\\nconst obciGanglionSamplesPerPacket = 2;\\nconst obciGanglionPacket18Bit = {\\n  auxByte: 20,\\n  byteId: 0,\\n  dataStart: 1,\\n  dataStop: 19\\n};\\nconst obciGanglionPacket19Bit = {\\n  byteId: 0,\\n  dataStart: 1,\\n  dataStop: 20\\n};\\nconst obciGanglionMCP3912Gain = 51.0; // assumed gain setting for MCP3912.  NEEDS TO BE ADJUSTABLE JM\\nconst obciGanglionMCP3912Vref = 1.2; // reference voltage for ADC in MCP3912 set in hardware\\nconst obciGanglionPrefix = 'Ganglion';\\nconst obciGanglionSyntheticDataEnable = 't';\\nconst obciGanglionSyntheticDataDisable = 'T';\\nconst obciGanglionImpedanceStart = 'z';\\nconst obciGanglionImpedanceStop = 'Z';\\nconst obciGanglionScaleFactorPerCountVolts = obciGanglionMCP3912Vref / (8388607.0 * obciGanglionMCP3912Gain * 1.5);\\n\\n/** Simblee */\\nconst simbleeUuidService = 'fe84';\\nconst simbleeUuidReceive = '2d30c082f39f4ce6923f3484ea480596';\\nconst simbleeUuidSend = '2d30c083f39f4ce6923f3484ea480596';\\nconst simbleeUuidDisconnect = '2d30c084f39f4ce6923f3484ea480596';\\n\\n/** RFduino BLE UUID */\\nconst rfduinoUuidService = '2220';\\nconst rfduinoUuidReceive = '2221';\\nconst rfduinoUuidSend = '2222';\\nconst rfduinoUuidSendTwo = '2223';\\n\\n/** Cyton BLE */\\nconst obciCytonBLESamplesPerPacket = 3;\\n\\n/** Noble */\\nconst obciNobleEmitterPeripheralConnect = 'connect';\\nconst obciNobleEmitterPeripheralDisconnect = 'disconnect';\\nconst obciNobleEmitterPeripheralDiscover = 'discover';\\nconst obciNobleEmitterPeripheralServicesDiscover = 'servicesDiscover';\\nconst obciNobleEmitterServiceCharacteristicsDiscover = 'characteristicsDiscover';\\nconst obciNobleEmitterServiceRead = 'read';\\nconst obciNobleEmitterDiscover = 'discover';\\nconst obciNobleEmitterScanStart = 'scanStart';\\nconst obciNobleEmitterScanStop = 'scanStop';\\nconst obciNobleEmitterStateChange = 'stateChange';\\nconst obciNobleStatePoweredOn = 'poweredOn';\\n\\n/** Protocols */\\nconst obciProtocolBLE = 'ble';\\nconst obciProtocolSerial = 'serial';\\nconst obciProtocolWifi = 'wifi';\\n\\n/** Register Query on Cyton */\\nconst obciRegisterQueryAccelerometerFirmwareV1 = '\\\\nLIS3DH Registers\\\\n0x07.0\\\\n0x08.0\\\\n0x09.0\\\\n0x0A.0\\\\n0x0B.0\\\\n0x0C.0\\\\n0x0D.0\\\\n0x0E.0\\\\n0x0F.33\\\\n\\\\n0x1F.0\\\\n0x20.8\\\\n0x21.0\\\\n0x22.0\\\\n0x23.18\\\\n0x24.0\\\\n0x25.0\\\\n0x26.0\\\\n0x27.0\\\\n0x28.0\\\\n0x29.0\\\\n0x2A.0\\\\n0x2B.0\\\\n0x2C.0\\\\n0x2D.0\\\\n0x2E.0\\\\n0x2F.20\\\\n0x30.0\\\\n0x31.0\\\\n0x32.0\\\\n0x33.0\\\\n\\\\n0x38.0\\\\n0x39.0\\\\n0x3A.0\\\\n0x3B.0\\\\n0x3C.0\\\\n0x3D.0\\\\n';\\nconst obciRegisterQueryAccelerometerFirmwareV3 = '\\\\nLIS3DH Registers\\\\n0x07 00\\\\n0x08 00\\\\n0x09 00\\\\n0x0A 00\\\\n0x0B 00\\\\n0x0C 00\\\\n0x0D 00\\\\n0x0E 00\\\\n0x0F 33\\\\n\\\\n0x1F 00\\\\n0x20 08\\\\n0x21 00\\\\n0x22 00\\\\n0x23 18\\\\n0x24 00\\\\n0x25 00\\\\n0x26 00\\\\n0x27 00\\\\n0x28 00\\\\n0x29 00\\\\n0x2A 00\\\\n0x2B 00\\\\n0x2C 00\\\\n0x2D 00\\\\n0x2E 00\\\\n0x2F 20\\\\n0x30 00\\\\n0x31 00\\\\n0x32 00\\\\n0x33 00\\\\n\\\\n0x38 00\\\\n0x39 00\\\\n0x3A 00\\\\n0x3B 00\\\\n0x3C 00\\\\n0x3D 00\\\\n';\\nconst obciRegisterQueryCyton = '\\\\nBoard ADS Registers\\\\nADS_ID, 00, 3E, 0, 0, 1, 1, 1, 1, 1, 0\\\\nCONFIG1, 01, 96, 1, 0, 0, 1, 0, 1, 1, 0\\\\nCONFIG2, 02, C0, 1, 1, 0, 0, 0, 0, 0, 0\\\\nCONFIG3, 03, EC, 1, 1, 1, 0, 1, 1, 0, 0\\\\nLOFF, 04, 02, 0, 0, 0, 0, 0, 0, 1, 0\\\\nCH1SET, 05, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH2SET, 06, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH3SET, 07, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH4SET, 08, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH5SET, 09, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH6SET, 0A, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH7SET, 0B, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH8SET, 0C, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nBIAS_SENSP, 0D, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nBIAS_SENSN, 0E, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nLOFF_SENSP, 0F, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_SENSN, 10, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_FLIP, 11, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATP, 12, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATN, 13, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nGPIO, 14, 0F, 0, 0, 0, 0, 1, 1, 1, 1\\\\nMISC1, 15, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nMISC2, 16, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nCONFIG4, 17, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\n';\\nconst obciRegisterQueryCytonDaisy = '\\\\nDaisy ADS Registers\\\\nADS_ID, 00, 3E, 0, 0, 1, 1, 1, 1, 1, 0\\\\nCONFIG1, 01, 96, 1, 0, 0, 1, 0, 1, 1, 0\\\\nCONFIG2, 02, C0, 1, 1, 0, 0, 0, 0, 0, 0\\\\nCONFIG3, 03, EC, 1, 1, 1, 0, 1, 1, 0, 0\\\\nLOFF, 04, 02, 0, 0, 0, 0, 0, 0, 1, 0\\\\nCH1SET, 05, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH2SET, 06, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH3SET, 07, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH4SET, 08, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH5SET, 09, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH6SET, 0A, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH7SET, 0B, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nCH8SET, 0C, 68, 0, 1, 1, 0, 1, 0, 0, 0\\\\nBIAS_SENSP, 0D, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nBIAS_SENSN, 0E, FF, 1, 1, 1, 1, 1, 1, 1, 1\\\\nLOFF_SENSP, 0F, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_SENSN, 10, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_FLIP, 11, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATP, 12, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nLOFF_STATN, 13, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nGPIO, 14, 0F, 0, 0, 0, 0, 1, 1, 1, 1\\\\nMISC1, 15, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nMISC2, 16, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\nCONFIG4, 17, 00, 0, 0, 0, 0, 0, 0, 0, 0\\\\n';\\nconst obciRegisterQueryNameMISC1 = 'MISC1';\\nconst obciRegisterQueryNameBIASSENSP = 'BIAS_SENSP';\\nconst obciRegisterQueryNameCHnSET = ['CH1SET', 'CH2SET', 'CH3SET', 'CH4SET', 'CH5SET', 'CH6SET', 'CH7SET', 'CH8SET'];\\nconst obciRegisterQuerySizeCytonFirmwareV1 = obciRegisterQueryCyton.length + obciRegisterQueryAccelerometerFirmwareV1.length;\\nconst obciRegisterQuerySizeCytonDaisyFirmwareV1 = obciRegisterQueryCyton.length + obciRegisterQueryCytonDaisy.length + obciRegisterQueryAccelerometerFirmwareV1.length;\\nconst obciRegisterQuerySizeCytonFirmwareV3 = obciRegisterQueryCyton.length + obciRegisterQueryAccelerometerFirmwareV3.length;\\nconst obciRegisterQuerySizeCytonDaisyFirmwareV3 = obciRegisterQueryCyton.length + obciRegisterQueryCytonDaisy.length + obciRegisterQueryAccelerometerFirmwareV3.length;\\n\\nconst constantsModule = {\\n  /** Turning channels off */\\n  OBCIChannelOff1: obciChannelOff1,\\n  OBCIChannelOff2: obciChannelOff2,\\n  OBCIChannelOff3: obciChannelOff3,\\n  OBCIChannelOff4: obciChannelOff4,\\n  OBCIChannelOff5: obciChannelOff5,\\n  OBCIChannelOff6: obciChannelOff6,\\n  OBCIChannelOff7: obciChannelOff7,\\n  OBCIChannelOff8: obciChannelOff8,\\n  OBCIChannelOff9: obciChannelOff9,\\n  OBCIChannelOff10: obciChannelOff10,\\n  OBCIChannelOff11: obciChannelOff11,\\n  OBCIChannelOff12: obciChannelOff12,\\n  OBCIChannelOff13: obciChannelOff13,\\n  OBCIChannelOff14: obciChannelOff14,\\n  OBCIChannelOff15: obciChannelOff15,\\n  OBCIChannelOff16: obciChannelOff16,\\n  /**\\n  * Purpose: To get the proper command to turn a channel off\\n  * @param channelNumber - A number (1-16) of the desired channel\\n  * @returns {Promise}\\n  */\\n  commandChannelOff: function (channelNumber) {\\n    return new Promise(function (resolve, reject) {\\n      switch (channelNumber) {\\n        case 1:\\n          resolve(obciChannelOff1);\\n          break;\\n        case 2:\\n          resolve(obciChannelOff2);\\n          break;\\n        case 3:\\n          resolve(obciChannelOff3);\\n          break;\\n        case 4:\\n          resolve(obciChannelOff4);\\n          break;\\n        case 5:\\n          resolve(obciChannelOff5);\\n          break;\\n        case 6:\\n          resolve(obciChannelOff6);\\n          break;\\n        case 7:\\n          resolve(obciChannelOff7);\\n          break;\\n        case 8:\\n          resolve(obciChannelOff8);\\n          break;\\n        case 9:\\n          resolve(obciChannelOff9);\\n          break;\\n        case 10:\\n          resolve(obciChannelOff10);\\n          break;\\n        case 11:\\n          resolve(obciChannelOff11);\\n          break;\\n        case 12:\\n          resolve(obciChannelOff12);\\n          break;\\n        case 13:\\n          resolve(obciChannelOff13);\\n          break;\\n        case 14:\\n          resolve(obciChannelOff14);\\n          break;\\n        case 15:\\n          resolve(obciChannelOff15);\\n          break;\\n        case 16:\\n          resolve(obciChannelOff16);\\n          break;\\n        default:\\n          reject(Error('Error [commandChannelOff]: Invalid Channel Number'));\\n          break;\\n      }\\n    });\\n  },\\n  /** Turning channels on */\\n  OBCIChannelOn1: obciChannelOn1,\\n  OBCIChannelOn2: obciChannelOn2,\\n  OBCIChannelOn3: obciChannelOn3,\\n  OBCIChannelOn4: obciChannelOn4,\\n  OBCIChannelOn5: obciChannelOn5,\\n  OBCIChannelOn6: obciChannelOn6,\\n  OBCIChannelOn7: obciChannelOn7,\\n  OBCIChannelOn8: obciChannelOn8,\\n  OBCIChannelOn9: obciChannelOn9,\\n  OBCIChannelOn10: obciChannelOn10,\\n  OBCIChannelOn11: obciChannelOn11,\\n  OBCIChannelOn12: obciChannelOn12,\\n  OBCIChannelOn13: obciChannelOn13,\\n  OBCIChannelOn14: obciChannelOn14,\\n  OBCIChannelOn15: obciChannelOn15,\\n  OBCIChannelOn16: obciChannelOn16,\\n  commandChannelOn: function (channelNumber) {\\n    return new Promise(function (resolve, reject) {\\n      switch (channelNumber) {\\n        case 1:\\n          resolve(obciChannelOn1);\\n          break;\\n        case 2:\\n          resolve(obciChannelOn2);\\n          break;\\n        case 3:\\n          resolve(obciChannelOn3);\\n          break;\\n        case 4:\\n          resolve(obciChannelOn4);\\n          break;\\n        case 5:\\n          resolve(obciChannelOn5);\\n          break;\\n        case 6:\\n          resolve(obciChannelOn6);\\n          break;\\n        case 7:\\n          resolve(obciChannelOn7);\\n          break;\\n        case 8:\\n          resolve(obciChannelOn8);\\n          break;\\n        case 9:\\n          resolve(obciChannelOn9);\\n          break;\\n        case 10:\\n          resolve(obciChannelOn10);\\n          break;\\n        case 11:\\n          resolve(obciChannelOn11);\\n          break;\\n        case 12:\\n          resolve(obciChannelOn12);\\n          break;\\n        case 13:\\n          resolve(obciChannelOn13);\\n          break;\\n        case 14:\\n          resolve(obciChannelOn14);\\n          break;\\n        case 15:\\n          resolve(obciChannelOn15);\\n          break;\\n        case 16:\\n          resolve(obciChannelOn16);\\n          break;\\n        default:\\n          reject(Error('Error [commandChannelOn]: Invalid Channel Number'));\\n          break;\\n      }\\n    });\\n  },\\n  /** Test Signal Control Commands */\\n  OBCITestSignalConnectToDC: obciTestSignalConnectToDC,\\n  OBCITestSignalConnectToGround: obciTestSignalConnectToGround,\\n  OBCITestSignalConnectToPulse1xFast: obciTestSignalConnectToPulse1xFast,\\n  OBCITestSignalConnectToPulse1xSlow: obciTestSignalConnectToPulse1xSlow,\\n  OBCITestSignalConnectToPulse2xFast: obciTestSignalConnectToPulse2xFast,\\n  OBCITestSignalConnectToPulse2xSlow: obciTestSignalConnectToPulse2xSlow,\\n  getTestSignalCommand: signal => {\\n    return new Promise((resolve, reject) => {\\n      switch (signal) {\\n        case 'dc':\\n          resolve(obciTestSignalConnectToDC);\\n          break;\\n        case 'ground':\\n          resolve(obciTestSignalConnectToGround);\\n          break;\\n        case 'pulse1xFast':\\n          resolve(obciTestSignalConnectToPulse1xFast);\\n          break;\\n        case 'pulse1xSlow':\\n          resolve(obciTestSignalConnectToPulse1xSlow);\\n          break;\\n        case 'pulse2xFast':\\n          resolve(obciTestSignalConnectToPulse2xFast);\\n          break;\\n        case 'pulse2xSlow':\\n          resolve(obciTestSignalConnectToPulse2xSlow);\\n          break;\\n        case 'none':\\n          resolve(obciChannelDefaultAllSet);\\n          break;\\n        default:\\n          reject(Error('Invalid selection! Check your spelling.'));\\n          break;\\n      }\\n    });\\n  },\\n  /** Channel Setting Commands */\\n  OBCIChannelCmdADCNormal: obciChannelCmdADCNormal,\\n  OBCIChannelCmdADCShorted: obciChannelCmdADCShorted,\\n  OBCIChannelCmdADCBiasDRP: obciChannelCmdADCBiasDRP,\\n  OBCIChannelCmdADCBiasDRN: obciChannelCmdADCBiasDRN,\\n  OBCIChannelCmdADCBiasMethod: obciChannelCmdADCBiasMethod,\\n  OBCIChannelCmdADCMVDD: obciChannelCmdADCMVDD,\\n  OBCIChannelCmdADCTemp: obciChannelCmdADCTemp,\\n  OBCIChannelCmdADCTestSig: obciChannelCmdADCTestSig,\\n  OBCIChannelCmdBiasInclude: obciChannelCmdBiasInclude,\\n  OBCIChannelCmdBiasRemove: obciChannelCmdBiasRemove,\\n  OBCIChannelCmdChannel1: obciChannelCmdChannel1,\\n  OBCIChannelCmdChannel2: obciChannelCmdChannel2,\\n  OBCIChannelCmdChannel3: obciChannelCmdChannel3,\\n  OBCIChannelCmdChannel4: obciChannelCmdChannel4,\\n  OBCIChannelCmdChannel5: obciChannelCmdChannel5,\\n  OBCIChannelCmdChannel6: obciChannelCmdChannel6,\\n  OBCIChannelCmdChannel7: obciChannelCmdChannel7,\\n  OBCIChannelCmdChannel8: obciChannelCmdChannel8,\\n  OBCIChannelCmdChannel9: obciChannelCmdChannel9,\\n  OBCIChannelCmdChannel10: obciChannelCmdChannel10,\\n  OBCIChannelCmdChannel11: obciChannelCmdChannel11,\\n  OBCIChannelCmdChannel12: obciChannelCmdChannel12,\\n  OBCIChannelCmdChannel13: obciChannelCmdChannel13,\\n  OBCIChannelCmdChannel14: obciChannelCmdChannel14,\\n  OBCIChannelCmdChannel15: obciChannelCmdChannel15,\\n  OBCIChannelCmdChannel16: obciChannelCmdChannel16,\\n  commandChannelForCmd,\\n  OBCIChannelCmdGain1: obciChannelCmdGain1,\\n  OBCIChannelCmdGain2: obciChannelCmdGain2,\\n  OBCIChannelCmdGain4: obciChannelCmdGain4,\\n  OBCIChannelCmdGain6: obciChannelCmdGain6,\\n  OBCIChannelCmdGain8: obciChannelCmdGain8,\\n  OBCIChannelCmdGain12: obciChannelCmdGain12,\\n  OBCIChannelCmdGain24: obciChannelCmdGain24,\\n  commandForGain,\\n  gainForCommand,\\n  OBCIChannelCmdLatch: obciChannelCmdLatch,\\n  OBCIChannelCmdPowerOff: obciChannelCmdPowerOff,\\n  OBCIChannelCmdPowerOn: obciChannelCmdPowerOn,\\n  OBCIChannelCmdSet: obciChannelCmdSet,\\n  OBCIChannelCmdSRB1Connect: obciChannelCmdSRB1Connect,\\n  OBCIChannelCmdSRB1Diconnect: obciChannelCmdSRB1Diconnect,\\n  OBCIChannelCmdSRB2Connect: obciChannelCmdSRB2Connect,\\n  OBCIChannelCmdSRB2Diconnect: obciChannelCmdSRB2Diconnect,\\n  /** Channel Settings Object */\\n  channelSettingsObjectDefault,\\n  /**\\n   * @param numberOfChannels {Number}\\n   * @returns {Array}\\n   */\\n  channelSettingsArrayInit: numberOfChannels => {\\n    var newChannelSettingsArray = [];\\n    for (var i = 0; i < numberOfChannels; i++) {\\n      newChannelSettingsArray.push(channelSettingsObjectDefault(i));\\n    }\\n    return newChannelSettingsArray;\\n  },\\n  /** Channel Setting Helper Strings */\\n  OBCIStringADCNormal: obciStringADCNormal,\\n  OBCIStringADCShorted: obciStringADCShorted,\\n  OBCIStringADCBiasMethod: obciStringADCBiasMethod,\\n  OBCIStringADCMvdd: obciStringADCMvdd,\\n  OBCIStringADCTemp: obciStringADCTemp,\\n  OBCIStringADCTestSig: obciStringADCTestSig,\\n  OBCIStringADCBiasDrp: obciStringADCBiasDrp,\\n  OBCIStringADCBiasDrn: obciStringADCBiasDrn,\\n  /**\\n  * @description To convert a string like 'normal' to the correct command (i.e. '1')\\n  * @param adcString\\n  * @returns {Promise}\\n  * @author AJ Keller (@pushtheworldllc)\\n  */\\n  commandForADCString,\\n  inputTypeForCommand,\\n  /** Default Channel Settings */\\n  OBCIChannelDefaultAllSet: obciChannelDefaultAllSet,\\n  OBCIChannelDefaultAllGet: obciChannelDefaultAllGet,\\n  /** LeadOff Impedance Commands */\\n  OBCIChannelImpedanceLatch: obciChannelImpedanceLatch,\\n  OBCIChannelImpedanceSet: obciChannelImpedanceSet,\\n  OBCIChannelImpedanceTestSignalApplied: obciChannelImpedanceTestSignalApplied,\\n  OBCIChannelImpedanceTestSignalAppliedNot: obciChannelImpedanceTestSignalAppliedNot,\\n  /** SD card Commands */\\n  OBCISDLogForHour1: obciSDLogForHour1,\\n  OBCISDLogForHour2: obciSDLogForHour2,\\n  OBCISDLogForHour4: obciSDLogForHour4,\\n  OBCISDLogForHour12: obciSDLogForHour12,\\n  OBCISDLogForHour24: obciSDLogForHour24,\\n  OBCISDLogForMin5: obciSDLogForMin5,\\n  OBCISDLogForMin15: obciSDLogForMin15,\\n  OBCISDLogForMin30: obciSDLogForMin30,\\n  OBCISDLogForSec14: obciSDLogForSec14,\\n  OBCISDLogStop: obciSDLogStop,\\n  /** SD Card String Commands */\\n  OBCIStringSDHour1: obciStringSDHour1,\\n  OBCIStringSDHour2: obciStringSDHour2,\\n  OBCIStringSDHour4: obciStringSDHour4,\\n  OBCIStringSDHour12: obciStringSDHour12,\\n  OBCIStringSDHour24: obciStringSDHour24,\\n  OBCIStringSDMin5: obciStringSDMin5,\\n  OBCIStringSDMin15: obciStringSDMin15,\\n  OBCIStringSDMin30: obciStringSDMin30,\\n  OBCIStringSDSec14: obciStringSDSec14,\\n  /**\\n  * @description Converts a sd string into the proper setting.\\n  * @param stringCommand {String} - The length of time you want to record to the SD for.\\n  * @returns {Promise} The command to send to the Board, returns an error on improper `stringCommand`\\n  */\\n  sdSettingForString: stringCommand => {\\n    return new Promise((resolve, reject) => {\\n      switch (stringCommand) {\\n        case obciStringSDHour1:\\n          resolve(obciSDLogForHour1);\\n          break;\\n        case obciStringSDHour2:\\n          resolve(obciSDLogForHour2);\\n          break;\\n        case obciStringSDHour4:\\n          resolve(obciSDLogForHour4);\\n          break;\\n        case obciStringSDHour12:\\n          resolve(obciSDLogForHour12);\\n          break;\\n        case obciStringSDHour24:\\n          resolve(obciSDLogForHour24);\\n          break;\\n        case obciStringSDMin5:\\n          resolve(obciSDLogForMin5);\\n          break;\\n        case obciStringSDMin15:\\n          resolve(obciSDLogForMin15);\\n          break;\\n        case obciStringSDMin30:\\n          resolve(obciSDLogForMin30);\\n          break;\\n        case obciStringSDSec14:\\n          resolve(obciSDLogForSec14);\\n          break;\\n        default:\\n          reject(Error(TypeError));\\n          break;\\n      }\\n    });\\n  },\\n  /** Stream Data Commands */\\n  OBCIStreamStart: obciStreamStart,\\n  OBCIStreamStop: obciStreamStop,\\n  /** Accel enable/disable commands */\\n  OBCIAccelStart: obciAccelStart,\\n  OBCIAccelStop: obciAccelStop,\\n  /** Miscellaneous */\\n  OBCIMiscQueryRegisterSettings: obciMiscQueryRegisterSettings,\\n  OBCIMiscQueryRegisterSettingsChannel1: obciMiscQueryRegisterSettingsChannel1,\\n  OBCIMiscQueryRegisterSettingsChannel2: obciMiscQueryRegisterSettingsChannel2,\\n  OBCIMiscQueryRegisterSettingsChannel3: obciMiscQueryRegisterSettingsChannel3,\\n  OBCIMiscQueryRegisterSettingsChannel4: obciMiscQueryRegisterSettingsChannel4,\\n  OBCIMiscQueryRegisterSettingsChannel5: obciMiscQueryRegisterSettingsChannel5,\\n  OBCIMiscQueryRegisterSettingsChannel6: obciMiscQueryRegisterSettingsChannel6,\\n  OBCIMiscQueryRegisterSettingsChannel7: obciMiscQueryRegisterSettingsChannel7,\\n  OBCIMiscQueryRegisterSettingsChannel8: obciMiscQueryRegisterSettingsChannel8,\\n  channelSettingsKeyForChannel: channelNumber => {\\n    return new Promise((resolve, reject) => {\\n      switch (channelNumber) {\\n        case 1:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel1));\\n          break;\\n        case 2:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel2));\\n          break;\\n        case 3:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel3));\\n          break;\\n        case 4:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel4));\\n          break;\\n        case 5:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel5));\\n          break;\\n        case 6:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel6));\\n          break;\\n        case 7:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel7));\\n          break;\\n        case 8:\\n          resolve(new __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"](obciMiscQueryRegisterSettingsChannel8));\\n          break;\\n        default:\\n          reject(Error('Invalid channel number'));\\n          break;\\n      }\\n    });\\n  },\\n  OBCIMiscSoftReset: obciMiscSoftReset,\\n  /** 16 Channel Commands */\\n  OBCIChannelMaxNumber8: obciChannelMaxNumber8,\\n  OBCIChannelMaxNumber16: obciChannelMaxNumber16,\\n  OBCIChannelMaxNumber8NoDaisyToRemove: obciChannelMaxNumber8NoDaisyToRemove,\\n  OBCIChannelMaxNumber8SuccessDaisyRemoved: obciChannelMaxNumber8SuccessDaisyRemoved,\\n  OBCIChannelMaxNumber16DaisyAlreadyAttached: obciChannelMaxNumber16DaisyAlreadyAttached,\\n  OBCIChannelMaxNumber16DaisyAttached: obciChannelMaxNumber16DaisyAttached,\\n  OBCIChannelMaxNumber16NoDaisyAttached: obciChannelMaxNumber16NoDaisyAttached,\\n  /** Filters */\\n  OBCIFilterDisable: obciFilterDisable,\\n  OBCIFilterEnable: obciFilterEnable,\\n  /** Triggers */\\n  OBCITrigger: obciTrigger,\\n  /** Possible number of channels */\\n  OBCINumberOfChannelsCyton: obciNumberOfChannelsCyton,\\n  OBCINumberOfChannelsCytonBLE: obciNumberOfChannelsCytonBLE,\\n  OBCINumberOfChannelsDaisy: obciNumberOfChannelsDaisy,\\n  OBCINumberOfChannelsDefault: obciNumberOfChannelsDefault,\\n  OBCINumberOfChannelsGanglion: obciNumberOfChannelsGanglion,\\n  /** Possible OpenBCI board types */\\n  OBCIBoardCyton: obciBoardCyton,\\n  OBCIBoardCytonBLE: obciBoardCytonBLE,\\n  OBCIBoardDaisy: obciBoardDaisy,\\n  OBCIBoardDefault: obciBoardDefault,\\n  OBCIBoardGanglion: obciBoardGanglion,\\n  OBCIBoardNone: obciBoardNone,\\n  numberOfChannelsForBoardType: boardType => {\\n    switch (boardType) {\\n      case obciBoardDaisy:\\n        return obciNumberOfChannelsDaisy;\\n      case obciBoardGanglion:\\n        return obciNumberOfChannelsGanglion;\\n      case obciBoardNone:\\n        return 0;\\n      case obciBoardCytonBLE:\\n        return obciNumberOfChannelsCytonBLE;\\n      case obciBoardCyton:\\n      default:\\n        return obciNumberOfChannelsDefault;\\n    }\\n  },\\n  boardTypeForNumberOfChannels: numberOfChannels => {\\n    switch (numberOfChannels) {\\n      case obciNumberOfChannelsDaisy:\\n        return obciBoardDaisy;\\n      case obciNumberOfChannelsGanglion:\\n        return obciBoardGanglion;\\n      case 0:\\n        return obciBoardNone;\\n      case obciNumberOfChannelsCytonBLE:\\n        return obciBoardCytonBLE;\\n      case obciNumberOfChannelsDefault:\\n      default:\\n        return obciBoardCyton;\\n    }\\n  },\\n  /** Possible Sample Rates */\\n  OBCISampleRate1000: obciSampleRate1000,\\n  OBCISampleRate125: obciSampleRate125,\\n  OBCISampleRate12800: obciSampleRate12800,\\n  OBCISampleRate1600: obciSampleRate1600,\\n  OBCISampleRate16000: obciSampleRate16000,\\n  OBCISampleRate200: obciSampleRate200,\\n  OBCISampleRate2000: obciSampleRate2000,\\n  OBCISampleRate250: obciSampleRate250,\\n  OBCISampleRate25600: obciSampleRate25600,\\n  OBCISampleRate3200: obciSampleRate3200,\\n  OBCISampleRate400: obciSampleRate400,\\n  OBCISampleRate4000: obciSampleRate4000,\\n  OBCISampleRate500: obciSampleRate500,\\n  OBCISampleRate6400: obciSampleRate6400,\\n  OBCISampleRate800: obciSampleRate800,\\n  OBCISampleRate8000: obciSampleRate8000,\\n  /** Max sample number */\\n  OBCISampleNumberMax: obciSampleNumberMax,\\n  /** Packet Size */\\n  OBCIPacketSize: obciPacketSize,\\n  OBCIPacketSizeBLECyton: obciPacketSizeBLECyton,\\n  OBCIPacketSizeBLERaw: obciPacketSizeBLERaw,\\n  /** Notable Bytes */\\n  OBCIByteStart: obciByteStart,\\n  OBCIByteStop: obciByteStop,\\n  /** Errors */\\n  OBCIErrorInvalidByteLength: errorInvalidByteLength,\\n  OBCIErrorInvalidByteStart: errorInvalidByteStart,\\n  OBCIErrorInvalidByteStop: errorInvalidByteStop,\\n  OBCIErrorInvalidData: errorInvalidData,\\n  OBCIErrorInvalidType: errorInvalidType,\\n  OBCIErrorMissingRegisterSetting: errorMissingRegisterSetting,\\n  OBCIErrorMissingRequiredProperty: errorMissingRequiredProperty,\\n  OBCIErrorNobleAlreadyScanning: errorNobleAlreadyScanning,\\n  OBCIErrorNobleNotAlreadyScanning: errorNobleNotAlreadyScanning,\\n  OBCIErrorNobleNotInPoweredOnState: errorNobleNotInPoweredOnState,\\n  OBCIErrorTimeSyncIsNull: errorTimeSyncIsNull,\\n  OBCIErrorTimeSyncNoComma: errorTimeSyncNoComma,\\n  OBCIErrorUndefinedOrNullInput: errorUndefinedOrNullInput,\\n  /** Max Master Buffer Size */\\n  OBCIMasterBufferSize: obciMasterBufferSize,\\n  /** Impedance Calculation Variables */\\n  OBCILeadOffDriveInAmps: obciLeadOffDriveInAmps,\\n  OBCILeadOffFrequencyHz: obciLeadOffFrequencyHz,\\n  /** Channel Setter Maker */\\n  getChannelSetter: channelSetter,\\n  /** Impedance Setter Maker */\\n  getImpedanceSetter: impedanceSetter,\\n  /** Sample Rate Setter Maker */\\n  getSampleRateSetter: sampleRateSetter,\\n  /** Board Mode Setter Maker */\\n  getBoardModeSetter: boardModeSetter,\\n  /** Command send delay */\\n  OBCIWriteIntervalDelayMSLong: obciWriteIntervalDelayMSLong,\\n  OBCIWriteIntervalDelayMSNone: obciWriteIntervalDelayMSNone,\\n  OBCIWriteIntervalDelayMSShort: obciWriteIntervalDelayMSShort,\\n  /** Sync Clocks */\\n  OBCISyncTimeSent: obciSyncTimeSent,\\n  OBCISyncTimeSet: obciSyncTimeSet,\\n  /** Radio Key */\\n  OBCIRadioKey: obciRadioKey,\\n  /** Radio Commands */\\n  OBCIRadioCmdChannelGet: obciRadioCmdChannelGet,\\n  OBCIRadioCmdChannelSet: obciRadioCmdChannelSet,\\n  OBCIRadioCmdChannelSetOverride: obciRadioCmdChannelSetOverride,\\n  OBCIRadioCmdPollTimeGet: obciRadioCmdPollTimeGet,\\n  OBCIRadioCmdPollTimeSet: obciRadioCmdPollTimeSet,\\n  OBCIRadioCmdBaudRateSetDefault: obciRadioCmdBaudRateSetDefault,\\n  OBCIRadioCmdBaudRateSetFast: obciRadioCmdBaudRateSetFast,\\n  OBCIRadioCmdSystemStatus: obciRadioCmdSystemStatus,\\n  /** Impedance */\\n  OBCIImpedanceTextBad: obciImpedanceTextBad,\\n  OBCIImpedanceTextGood: obciImpedanceTextGood,\\n  OBCIImpedanceTextInit: obciImpedanceTextInit,\\n  OBCIImpedanceTextOk: obciImpedanceTextOk,\\n  OBCIImpedanceTextNone: obciImpedanceTextNone,\\n  OBCIImpedanceThresholdBadMax: obciImpedanceThresholdBadMax,\\n  OBCIImpedanceSeriesResistor: obciImpedanceSeriesResistor,\\n  getTextForRawImpedance: value => {\\n    if (value > obciImpedanceThresholdGoodMin && value < obciImpedanceThresholdGoodMax) {\\n      return obciImpedanceTextGood;\\n    } else if (value > obciImpedanceThresholdOkMin && value < obciImpedanceThresholdOkMax) {\\n      return obciImpedanceTextOk;\\n    } else if (value > obciImpedanceThresholdBadMin && value < obciImpedanceThresholdBadMax) {\\n      return obciImpedanceTextBad;\\n    } else {\\n      return obciImpedanceTextNone;\\n    }\\n  },\\n  /** Simulator */\\n  OBCISimulatorPortName: obciSimulatorPortName,\\n  /**\\n  * Stream packet types/codes\\n  */\\n  OBCIStreamPacketStandardAccel: obciStreamPacketStandardAccel,\\n  OBCIStreamPacketStandardRawAux: obciStreamPacketStandardRawAux,\\n  OBCIStreamPacketUserDefinedType: obciStreamPacketUserDefinedType,\\n  OBCIStreamPacketAccelTimeSyncSet: obciStreamPacketAccelTimeSyncSet,\\n  OBCIStreamPacketAccelTimeSynced: obciStreamPacketAccelTimeSynced,\\n  OBCIStreamPacketRawAuxTimeSyncSet: obciStreamPacketRawAuxTimeSyncSet,\\n  OBCIStreamPacketRawAuxTimeSynced: obciStreamPacketRawAuxTimeSynced,\\n  OBCIStreamPacketImpedance: obciStreamPacketImpedance,\\n  /** fun funcs */\\n  isNumber,\\n  isBoolean,\\n  isString,\\n  isUndefined,\\n  isNull,\\n  /** OpenBCI V3 Standard Packet Positions */\\n  OBCIPacketPositionStartByte: obciPacketPositionStartByte,\\n  OBCIPacketPositionStopByte: obciPacketPositionStopByte,\\n  OBCIPacketPositionStartAux: obciPacketPositionStartAux,\\n  OBCIPacketPositionStopAux: obciPacketPositionStopAux,\\n  OBCIPacketPositionChannelDataStart: obciPacketPositionChannelDataStart,\\n  OBCIPacketPositionChannelDataStop: obciPacketPositionChannelDataStop,\\n  OBCIPacketPositionSampleNumber: obciPacketPositionSampleNumber,\\n  OBCIPacketPositionTimeSyncAuxStart: obciPacketPositionTimeSyncAuxStart,\\n  OBCIPacketPositionTimeSyncAuxStop: obciPacketPositionTimeSyncAuxStop,\\n  OBCIPacketPositionTimeSyncTimeStart: obciPacketPositionTimeSyncTimeStart,\\n  OBCIPacketPositionTimeSyncTimeStop: obciPacketPositionTimeSyncTimeStop,\\n  /** Possible Simulator Line Noise injections */\\n  OBCISimulatorLineNoiseHz60: obciSimulatorLineNoiseHz60,\\n  OBCISimulatorLineNoiseHz50: obciSimulatorLineNoiseHz50,\\n  OBCISimulatorLineNoiseNone: obciSimulatorLineNoiseNone,\\n  /** Possible Simulator Fragmentation modes */\\n  OBCISimulatorFragmentationRandom: obciSimulatorFragmentationRandom,\\n  OBCISimulatorFragmentationFullBuffers: obciSimulatorFragmentationFullBuffers,\\n  OBCISimulatorFragmentationOneByOne: obciSimulatorFragmentationOneByOne,\\n  OBCISimulatorFragmentationNone: obciSimulatorFragmentationNone,\\n  /** Firmware version indicator */\\n  OBCIFirmwareV1: obciFirmwareV1,\\n  OBCIFirmwareV2: obciFirmwareV2,\\n  OBCIFirmwareV3: obciFirmwareV3,\\n  /** Time synced accel packet */\\n  OBCIAccelAxisX: obciAccelAxisX,\\n  OBCIAccelAxisY: obciAccelAxisY,\\n  OBCIAccelAxisZ: obciAccelAxisZ,\\n  /** Time from board */\\n  OBCIStreamPacketTimeByteSize: obciStreamPacketTimeByteSize,\\n  /** Parse */\\n  OBCIParseDaisy: obciParseDaisy,\\n  OBCIParseFailure: obciParseFailure,\\n  OBCIParseFirmware: obciParseFirmware,\\n  OBCIParseEOT: obciParseEOT,\\n  OBCIParseSuccess: obciParseSuccess,\\n  /** Used in parsing incoming serial data */\\n  OBCIParsingChannelSettings: obciParsingChannelSettings,\\n  OBCIParsingEOT: obciParsingEOT,\\n  OBCIParsingNormal: obciParsingNormal,\\n  OBCIParsingReset: obciParsingReset,\\n  OBCIParsingTimeSyncSent: obciParsingTimeSyncSent,\\n  /** Timeouts */\\n  OBCITimeoutProcessBytes: obciTimeoutProcessBytes,\\n  /** Simulator Board Configurations */\\n  OBCISimulatorRawAux: obciSimulatorRawAux,\\n  OBCISimulatorStandard: obciSimulatorStandard,\\n  /** Radio Channel Limits */\\n  OBCIRadioChannelMax: obciRadioChannelMax,\\n  OBCIRadioChannelMin: obciRadioChannelMin,\\n  OBCIRadioPollTimeMax: obciRadioPollTimeMax,\\n  OBCIRadioPollTimeMin: obciRadioPollTimeMin,\\n  /** Time sync stuff */\\n  OBCITimeSyncArraySize: obciTimeSyncArraySize,\\n  OBCITimeSyncMultiplierWithSyncConf: obciTimeSyncMultiplierWithSyncConf,\\n  OBCITimeSyncMultiplierWithoutSyncConf: obciTimeSyncMultiplierWithoutSyncConf,\\n  OBCITimeSyncThresholdTransFailureMS: obciTimeSyncThresholdTransFailureMS,\\n  /** Set board mode */\\n  OBCIBoardModeSet: obciBoardModeSet,\\n  OBCIBoardModeCmdDefault: obciBoardModeCmdDefault,\\n  OBCIBoardModeCmdDebug: obciBoardModeCmdDebug,\\n  OBCIBoardModeCmdAnalog: obciBoardModeCmdAnalog,\\n  OBCIBoardModeCmdDigital: obciBoardModeCmdDigital,\\n  OBCIBoardModeCmdGetCur: obciBoardModeCmdGetCur,\\n  OBCIBoardModeAnalog: obciBoardModeAnalog,\\n  OBCIBoardModeDefault: obciBoardModeDefault,\\n  OBCIBoardModeDebug: obciBoardModeDebug,\\n  OBCIBoardModeDigital: obciBoardModeDigital,\\n\\n  /** Set sample rate */\\n  OBCISampleRateSet: obciSampleRateSet,\\n  OBCISampleRateCmdCyton16000: obciSampleRateCmdCyton16000,\\n  OBCISampleRateCmdCyton8000: obciSampleRateCmdCyton8000,\\n  OBCISampleRateCmdCyton4000: obciSampleRateCmdCyton4000,\\n  OBCISampleRateCmdCyton2000: obciSampleRateCmdCyton2000,\\n  OBCISampleRateCmdCyton1000: obciSampleRateCmdCyton1000,\\n  OBCISampleRateCmdCyton500: obciSampleRateCmdCyton500,\\n  OBCISampleRateCmdCyton250: obciSampleRateCmdCyton250,\\n  OBCISampleRateCmdGang25600: obciSampleRateCmdGang25600,\\n  OBCISampleRateCmdGang12800: obciSampleRateCmdGang12800,\\n  OBCISampleRateCmdGang6400: obciSampleRateCmdGang6400,\\n  OBCISampleRateCmdGang3200: obciSampleRateCmdGang3200,\\n  OBCISampleRateCmdGang1600: obciSampleRateCmdGang1600,\\n  OBCISampleRateCmdGang800: obciSampleRateCmdGang800,\\n  OBCISampleRateCmdGang400: obciSampleRateCmdGang400,\\n  OBCISampleRateCmdGang200: obciSampleRateCmdGang200,\\n  OBCISampleRateCmdGetCur: obciSampleRateCmdaGetCur,\\n\\n  /** Wifi Stuff */\\n  OBCIWifiAttach: obciWifiAttach,\\n  OBCIWifiRemove: obciWifiRemove,\\n  OBCIWifiReset: obciWifiReset,\\n  OBCIWifiStatus: obciWifiStatus,\\n  /** Baud Rates */\\n  OBCIRadioBaudRateDefault: obciRadioBaudRateDefault,\\n  OBCIRadioBaudRateDefaultStr: obciRadioBaudRateDefaultStr,\\n  OBCIRadioBaudRateFast: obciRadioBaudRateFast,\\n  OBCIRadioBaudRateFastStr: obciRadioBaudRateFastStr,\\n  /** Emitters */\\n  OBCIEmitterAccelerometer: obciEmitterAccelerometer,\\n  OBCIEmitterBlePoweredUp: obciEmitterBlePoweredUp,\\n  OBCIEmitterClose: obciEmitterClose,\\n  OBCIEmitterDroppedPacket: obciEmitterDroppedPacket,\\n  OBCIEmitterEot: obciEmitterEot,\\n  OBCIEmitterError: obciEmitterError,\\n  OBCIEmitterGanglionFound: obciEmitterGanglionFound,\\n  OBCIEmitterHardSet: obciEmitterHardSet,\\n  OBCIEmitterImpedance: obciEmitterImpedance,\\n  OBCIEmitterImpedanceArray: obciEmitterImpedanceArray,\\n  OBCIEmitterMessage: obciEmitterMessage,\\n  OBCIEmitterQuery: obciEmitterQuery,\\n  OBCIEmitterRawDataPacket: obciEmitterRawDataPacket,\\n  OBCIEmitterReady: obciEmitterReady,\\n  OBCIEmitterRFduino: obciEmitterRFduino,\\n  OBCIEmitterSample: obciEmitterSample,\\n  OBCIEmitterScanStopped: obciEmitterScanStopped,\\n  OBCIEmitterSynced: obciEmitterSynced,\\n  OBCIEmitterWifiShield: obciEmitterWifiShield,\\n  /** Emitters */\\n  /** Accel packets */\\n  OBCIGanglionAccelAxisX: obciGanglionAccelAxisX,\\n  OBCIGanglionAccelAxisY: obciGanglionAccelAxisY,\\n  OBCIGanglionAccelAxisZ: obciGanglionAccelAxisZ,\\n  /** Ganglion */\\n  OBCIGanglionBleSearchTime: obciGanglionBleSearchTime,\\n  OBCIGanglionByteIdUncompressed: obciGanglionByteIdUncompressed,\\n  OBCIGanglionByteId18Bit: obciGanglionByteId18Bit,\\n  OBCIGanglionByteId19Bit: obciGanglionByteId19Bit,\\n  OBCIGanglionByteIdImpedanceChannel1: obciGanglionByteIdImpedanceChannel1,\\n  OBCIGanglionByteIdImpedanceChannel2: obciGanglionByteIdImpedanceChannel2,\\n  OBCIGanglionByteIdImpedanceChannel3: obciGanglionByteIdImpedanceChannel3,\\n  OBCIGanglionByteIdImpedanceChannel4: obciGanglionByteIdImpedanceChannel4,\\n  OBCIGanglionByteIdImpedanceChannelReference: obciGanglionByteIdImpedanceChannelReference,\\n  OBCIGanglionByteIdMultiPacket: obciGanglionByteIdMultiPacket,\\n  OBCIGanglionByteIdMultiPacketStop: obciGanglionByteIdMultiPacketStop,\\n  OBCIGanglionMCP3912Gain: obciGanglionMCP3912Gain, // assumed gain setting for MCP3912.  NEEDS TO BE ADJUSTABLE JM\\n  OBCIGanglionMCP3912Vref: obciGanglionMCP3912Vref, // reference voltage for ADC in MCP3912 set in hardware\\n  OBCIGanglionPacketSize: obciGanglionPacketSize,\\n  OBCIGanglionPacket18Bit: obciGanglionPacket18Bit,\\n  OBCIGanglionPacket19Bit: obciGanglionPacket19Bit,\\n  OBCIGanglionPrefix: obciGanglionPrefix,\\n  OBCIGanglionSamplesPerPacket: obciGanglionSamplesPerPacket,\\n  OBCIGanglionSyntheticDataEnable: obciGanglionSyntheticDataEnable,\\n  OBCIGanglionSyntheticDataDisable: obciGanglionSyntheticDataDisable,\\n  OBCIGanglionImpedanceStart: obciGanglionImpedanceStart,\\n  OBCIGanglionImpedanceStop: obciGanglionImpedanceStop,\\n  OBCIGanglionScaleFactorPerCountVolts: obciGanglionScaleFactorPerCountVolts,\\n  /** Simblee */\\n  SimbleeUuidService: simbleeUuidService,\\n  SimbleeUuidReceive: simbleeUuidReceive,\\n  SimbleeUuidSend: simbleeUuidSend,\\n  SimbleeUuidDisconnect: simbleeUuidDisconnect,\\n  /** RFduino BLE UUID */\\n  RFduinoUuidService: rfduinoUuidService,\\n  RFduinoUuidReceive: rfduinoUuidReceive,\\n  RFduinoUuidSend: rfduinoUuidSend,\\n  RFduinoUuidSendTwo: rfduinoUuidSendTwo,\\n  /** Cyton BLE */\\n  OBCICytonBLESamplesPerPacket: obciCytonBLESamplesPerPacket,\\n  /** Accel scale factor */\\n  OBCIGanglionAccelScaleFactor: obciGanglionAccelScaleFactor,\\n  /** Noble */\\n  OBCINobleEmitterPeripheralConnect: obciNobleEmitterPeripheralConnect,\\n  OBCINobleEmitterPeripheralDisconnect: obciNobleEmitterPeripheralDisconnect,\\n  OBCINobleEmitterPeripheralDiscover: obciNobleEmitterPeripheralDiscover,\\n  OBCINobleEmitterPeripheralServicesDiscover: obciNobleEmitterPeripheralServicesDiscover,\\n  OBCINobleEmitterServiceCharacteristicsDiscover: obciNobleEmitterServiceCharacteristicsDiscover,\\n  OBCINobleEmitterServiceRead: obciNobleEmitterServiceRead,\\n  OBCINobleEmitterDiscover: obciNobleEmitterDiscover,\\n  OBCINobleEmitterScanStart: obciNobleEmitterScanStart,\\n  OBCINobleEmitterScanStop: obciNobleEmitterScanStop,\\n  OBCINobleEmitterStateChange: obciNobleEmitterStateChange,\\n  OBCINobleStatePoweredOn: obciNobleStatePoweredOn,\\n  getPeripheralLocalNames,\\n  getPeripheralWithLocalName,\\n  getVersionNumber,\\n  isPeripheralGanglion,\\n  commandSampleRateForCmdCyton,\\n  commandSampleRateForCmdGanglion,\\n  commandBoardModeForMode,\\n  rawDataToSampleObjectDefault,\\n  /** Protocols */\\n  OBCIProtocolBLE: obciProtocolBLE,\\n  OBCIProtocolSerial: obciProtocolSerial,\\n  OBCIProtocolWifi: obciProtocolWifi,\\n  /** Register Query for Cyton */\\n  OBCIRegisterQueryAccelerometerFirmwareV1: obciRegisterQueryAccelerometerFirmwareV1,\\n  OBCIRegisterQueryAccelerometerFirmwareV3: obciRegisterQueryAccelerometerFirmwareV3,\\n  OBCIRegisterQueryCyton: obciRegisterQueryCyton,\\n  OBCIRegisterQueryCytonDaisy: obciRegisterQueryCytonDaisy,\\n  OBCIRegisterQueryNameMISC1: obciRegisterQueryNameMISC1,\\n  OBCIRegisterQueryNameBIASSENSP: obciRegisterQueryNameBIASSENSP,\\n  OBCIRegisterQueryNameCHnSET: obciRegisterQueryNameCHnSET,\\n  OBCIRegisterQuerySizeCytonFirmwareV1: obciRegisterQuerySizeCytonFirmwareV1,\\n  OBCIRegisterQuerySizeCytonDaisyFirmwareV1: obciRegisterQuerySizeCytonDaisyFirmwareV1,\\n  OBCIRegisterQuerySizeCytonFirmwareV3: obciRegisterQuerySizeCytonFirmwareV3,\\n  OBCIRegisterQuerySizeCytonDaisyFirmwareV3: obciRegisterQuerySizeCytonDaisyFirmwareV3\\n};\\n\\n/**\\n* @description To add a usability abstraction layer above channel setting commands. Due to the\\n*          extensive and highly specific nature of the channel setting command chain, this\\n*          will take several different human readable inputs and merge to one array filled\\n*          with the correct commands, prime for sending directly to the write command.\\n* @param channelNumber - Number (1-16)\\n* @param powerDown - Bool (true -> OFF, false -> ON (default))\\n*          turns the channel on or off\\n* @param gain - Number (1,2,4,6,8,12,24(default))\\n*          sets the gain for the channel\\n* @param inputType - String (normal,shorted,biasMethod,mvdd,temp,testsig,biasDrp,biasDrn)\\n*          selects the ADC channel input source\\n* @param bias - Bool (true -> Include in bias (default), false -> remove from bias)\\n*          selects to include the channel input in bias generation\\n* @param srb2 - Bool (true -> Connect this input to SRB2 (default),\\n*                     false -> Disconnect this input from SRB2)\\n*          Select to connect (true) this channel's P input to the SRB2 pin. This closes\\n*              a switch between P input and SRB2 for the given channel, and allows the\\n*              P input to also remain connected to the ADC.\\n* @param srb1 - Bool (true -> connect all N inputs to SRB1,\\n*                     false -> Disconnect all N inputs from SRB1 (default))\\n*          Select to connect (true) all channels' N inputs to SRB1. This effects all pins,\\n*              and disconnects all N inputs from the ADC.\\n* @returns {Promise} resolves {commandArray: array of commands to be sent,\\n                               newChannelSettingsObject: an updated channel settings object\\n                                                         to be stored in openBCIBoard.channelSettingsArray},\\n                     rejects on bad input or no board\\n*/\\nfunction channelSetter(channelNumber, powerDown, gain, inputType, bias, srb2, srb1) {\\n  // Used to store and assemble the commands\\n  var cmdPowerDown, cmdBias, cmdSrb2, cmdSrb1;\\n\\n  return new Promise(function (resolve, reject) {\\n    // Validate the input\\n    if (!isNumber(channelNumber)) reject(Error(\\\"channelNumber must be of type 'number' \\\"));\\n    if (!isBoolean(powerDown)) reject(Error(\\\"powerDown must be of type 'boolean' \\\"));\\n    if (!isNumber(gain)) reject(Error(\\\"gain must be of type 'number' \\\"));\\n    if (!isString(inputType)) reject(Error(\\\"inputType must be of type 'string' \\\"));\\n    if (!isBoolean(bias)) reject(Error(\\\"bias must be of type 'boolean' \\\"));\\n    if (!isBoolean(srb2)) reject(Error(\\\"srb1 must be of type 'boolean' \\\"));\\n    if (!isBoolean(srb1)) reject(Error(\\\"srb2 must be of type 'boolean' \\\"));\\n\\n    // Set Channel Number\\n    var p1 = commandChannelForCmd(channelNumber).catch(err => reject(err));\\n\\n    // Set POWER_DOWN\\n    cmdPowerDown = powerDown ? obciChannelCmdPowerOff : obciChannelCmdPowerOn;\\n\\n    // Set Gain\\n    var p2 = commandForGain(gain).catch(err => reject(err));\\n\\n    // Set ADC string\\n    var p3 = commandForADCString(inputType).catch(err => reject(err));\\n\\n    // Set BIAS\\n    cmdBias = bias ? obciChannelCmdBiasInclude : obciChannelCmdBiasRemove;\\n\\n    // Set SRB2\\n    cmdSrb2 = srb2 ? obciChannelCmdSRB2Connect : obciChannelCmdSRB2Diconnect;\\n\\n    // Set SRB1\\n    cmdSrb1 = srb1 ? obciChannelCmdSRB1Connect : obciChannelCmdSRB1Diconnect;\\n\\n    var newChannelSettingsObject = {\\n      channelNumber: channelNumber,\\n      powerDown: powerDown,\\n      gain: gain,\\n      inputType: inputType,\\n      bias: bias,\\n      srb2: srb2,\\n      srb1: srb1\\n    };\\n\\n    Promise.all([p1, p2, p3]).then(function (values) {\\n      var outputArray = [obciChannelCmdSet, values[0], cmdPowerDown, values[1], values[2], cmdBias, cmdSrb2, cmdSrb1, obciChannelCmdLatch];\\n      resolve({ commandArray: outputArray, newChannelSettingsObject: newChannelSettingsObject });\\n    });\\n  });\\n}\\n\\n/**\\n* @description To build the array of commands to send to the board to measure impedance\\n* @param channelNumber\\n* @param pInputApplied - Bool (true -> Test Signal Applied, false -> Test Signal Not Applied (default))\\n*          applies the test signal to the P input\\n* @param nInputApplied - Bool (true -> Test Signal Applied, false -> Test Signal Not Applied (default))\\n*          applies the test signal to the N input\\n* @returns {Promise} - fulfilled will contain an array of comamnds\\n*/\\nfunction impedanceSetter(channelNumber, pInputApplied, nInputApplied) {\\n  var cmdNInputApplied, cmdPInputApplied;\\n  return new Promise((resolve, reject) => {\\n    // validate inputs\\n    if (!isNumber(channelNumber)) reject(Error(\\\"channelNumber must be of type 'number' \\\"));\\n    if (!isBoolean(pInputApplied)) reject(Error(\\\"pInputApplied must be of type 'boolean' \\\"));\\n    if (!isBoolean(nInputApplied)) reject(Error(\\\"nInputApplied must be of type 'boolean' \\\"));\\n\\n    // Set pInputApplied\\n    cmdPInputApplied = pInputApplied ? obciChannelImpedanceTestSignalApplied : obciChannelImpedanceTestSignalAppliedNot;\\n\\n    // Set nInputApplied\\n    cmdNInputApplied = nInputApplied ? obciChannelImpedanceTestSignalApplied : obciChannelImpedanceTestSignalAppliedNot;\\n\\n    // Set Channel Number\\n    commandChannelForCmd(channelNumber).then(command => {\\n      var outputArray = [obciChannelImpedanceSet, command, cmdPInputApplied, cmdNInputApplied, obciChannelImpedanceLatch];\\n      // console.log(outputArray)\\n      resolve(outputArray);\\n    }).catch(err => reject(err));\\n  });\\n}\\n\\n/**\\n * @description To build the array of commands to send to the board to set the sample rate\\n * @param boardType {String} - The type of board, either cyton or ganglion. Default is Cyton\\n * @param sampleRate {Number} - The sample rate you want to set to. Please see docs for possible sample rates.\\n * @returns {Promise} - fulfilled will contain an array of commands\\n */\\nfunction sampleRateSetter(boardType, sampleRate) {\\n  return new Promise((resolve, reject) => {\\n    // validate inputs\\n    if (!isString(boardType)) return reject(Error(\\\"board type must be of type 'string' \\\"));\\n\\n    if (!isNumber(sampleRate)) return reject(Error(\\\"sampleRate must be of type 'number' \\\"));\\n\\n    sampleRate = Math.floor(sampleRate);\\n\\n    let func;\\n    if (boardType === obciBoardCyton || boardType === obciBoardDaisy) {\\n      func = commandSampleRateForCmdCyton;\\n    } else if (boardType === obciBoardGanglion) {\\n      func = commandSampleRateForCmdGanglion;\\n    } else {\\n      return reject(Error(`boardType must be either ${obciBoardCyton} or ${obciBoardGanglion}`));\\n    }\\n\\n    // Set Channel Number\\n    func(sampleRate).then(command => {\\n      var outputArray = [obciSampleRateSet, command];\\n      // console.log(outputArray)\\n      resolve(outputArray);\\n    }).catch(err => reject(err));\\n  });\\n}\\n\\n/**\\n * @description To build the array of commands to send to the board t\\n * @param boardMode {String} - The type of board mode:\\n *  `default`: Board will use Accel\\n *  `\\n * @returns {Promise} - fulfilled will contain an array of commands\\n */\\nfunction boardModeSetter(boardMode) {\\n  return new Promise((resolve, reject) => {\\n    // validate inputs\\n    if (!isString(boardMode)) return reject(Error(\\\"board mode must be of type 'string' \\\"));\\n    // Set Channel Number\\n    commandBoardModeForMode(boardMode).then(command => {\\n      var outputArray = [obciBoardModeSet, command];\\n      // console.log(outputArray)\\n      resolve(outputArray);\\n    }).catch(err => reject(err));\\n  });\\n}\\n\\nfunction isNumber(input) {\\n  return typeof input === 'number';\\n}\\nfunction isBoolean(input) {\\n  return typeof input === 'boolean';\\n}\\nfunction isString(input) {\\n  return typeof input === 'string';\\n}\\nfunction isUndefined(input) {\\n  return typeof input === 'undefined';\\n}\\nfunction isNull(input) {\\n  return input === null;\\n}\\n\\nfunction commandForADCString(adcString) {\\n  return new Promise(function (resolve, reject) {\\n    switch (adcString) {\\n      case obciStringADCNormal:\\n        resolve(obciChannelCmdADCNormal);\\n        break;\\n      case obciStringADCShorted:\\n        resolve(obciChannelCmdADCShorted);\\n        break;\\n      case obciStringADCBiasMethod:\\n        resolve(obciChannelCmdADCBiasMethod);\\n        break;\\n      case obciStringADCMvdd:\\n        resolve(obciChannelCmdADCMVDD);\\n        break;\\n      case obciStringADCTemp:\\n        resolve(obciChannelCmdADCTemp);\\n        break;\\n      case obciStringADCTestSig:\\n        resolve(obciChannelCmdADCTestSig);\\n        break;\\n      case obciStringADCBiasDrp:\\n        resolve(obciChannelCmdADCBiasDRP);\\n        break;\\n      case obciStringADCBiasDrn:\\n        resolve(obciChannelCmdADCBiasDRN);\\n        break;\\n      default:\\n        reject(Error('Invalid ADC string'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Returns the input type for the given command\\n * @param cmd {Number} The command\\n * @returns {String}\\n */\\nfunction inputTypeForCommand(cmd) {\\n  switch (String(cmd)) {\\n    case obciChannelCmdADCNormal:\\n      return obciStringADCNormal;\\n    case obciChannelCmdADCShorted:\\n      return obciStringADCShorted;\\n    case obciChannelCmdADCBiasMethod:\\n      return obciStringADCBiasMethod;\\n    case obciChannelCmdADCMVDD:\\n      return obciStringADCMvdd;\\n    case obciChannelCmdADCTemp:\\n      return obciStringADCTemp;\\n    case obciChannelCmdADCTestSig:\\n      return obciStringADCTestSig;\\n    case obciChannelCmdADCBiasDRP:\\n      return obciStringADCBiasDrp;\\n    case obciChannelCmdADCBiasDRN:\\n      return obciStringADCBiasDrn;\\n    default:\\n      throw new Error('Invalid input type, must be less than 8');\\n  }\\n}\\n\\nfunction commandForGain(gainSetting) {\\n  return new Promise(function (resolve, reject) {\\n    switch (gainSetting) {\\n      case 1:\\n        resolve(obciChannelCmdGain1);\\n        break;\\n      case 2:\\n        resolve(obciChannelCmdGain2);\\n        break;\\n      case 4:\\n        resolve(obciChannelCmdGain4);\\n        break;\\n      case 6:\\n        resolve(obciChannelCmdGain6);\\n        break;\\n      case 8:\\n        resolve(obciChannelCmdGain8);\\n        break;\\n      case 12:\\n        resolve(obciChannelCmdGain12);\\n        break;\\n      case 24:\\n        resolve(obciChannelCmdGain24);\\n        break;\\n      default:\\n        reject(Error('Invalid gain setting of ' + gainSetting + ' gain must be (1,2,4,6,8,12,24)'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Get the gain\\n * @param cmd {Number}\\n * @returns {Number}\\n */\\nfunction gainForCommand(cmd) {\\n  switch (String(cmd)) {\\n    case obciChannelCmdGain1:\\n      return 1;\\n    case obciChannelCmdGain2:\\n      return 2;\\n    case obciChannelCmdGain4:\\n      return 4;\\n    case obciChannelCmdGain6:\\n      return 6;\\n    case obciChannelCmdGain8:\\n      return 8;\\n    case obciChannelCmdGain12:\\n      return 12;\\n    case obciChannelCmdGain24:\\n      return 24;\\n    default:\\n      throw new Error(`Invalid gain setting of ${cmd} gain must be (0,1,2,3,4,5,6)`);\\n  }\\n}\\n\\nfunction commandChannelForCmd(channelNumber) {\\n  return new Promise(function (resolve, reject) {\\n    switch (channelNumber) {\\n      case 1:\\n        resolve(obciChannelCmdChannel1);\\n        break;\\n      case 2:\\n        resolve(obciChannelCmdChannel2);\\n        break;\\n      case 3:\\n        resolve(obciChannelCmdChannel3);\\n        break;\\n      case 4:\\n        resolve(obciChannelCmdChannel4);\\n        break;\\n      case 5:\\n        resolve(obciChannelCmdChannel5);\\n        break;\\n      case 6:\\n        resolve(obciChannelCmdChannel6);\\n        break;\\n      case 7:\\n        resolve(obciChannelCmdChannel7);\\n        break;\\n      case 8:\\n        resolve(obciChannelCmdChannel8);\\n        break;\\n      case 9:\\n        resolve(obciChannelCmdChannel9);\\n        break;\\n      case 10:\\n        resolve(obciChannelCmdChannel10);\\n        break;\\n      case 11:\\n        resolve(obciChannelCmdChannel11);\\n        break;\\n      case 12:\\n        resolve(obciChannelCmdChannel12);\\n        break;\\n      case 13:\\n        resolve(obciChannelCmdChannel13);\\n        break;\\n      case 14:\\n        resolve(obciChannelCmdChannel14);\\n        break;\\n      case 15:\\n        resolve(obciChannelCmdChannel15);\\n        break;\\n      case 16:\\n        resolve(obciChannelCmdChannel16);\\n        break;\\n      default:\\n        reject(Error('Invalid channel number'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * @typedef {Object} ChannelSettingsObject - See page 50 of the ads1299.pdf\\n * @property {Number} channelNumber - The channel number of this object\\n * @property {Boolean} powerDown - Power-down: - This boolean determines the channel power mode for the\\n *                      corresponding channel. `false` for normal operation, channel is on, and `true` for channel\\n *                      power-down, channel is off. (Default is `false`)\\n * @property {Number} gain - PGA gain: This number determines the PGA gain setting. Can be either 1, 2, 4, 6, 8, 12, 24\\n *                      (Default is 24)\\n * @property {String} inputType - Channel input: This string is used to determine the channel input selection.\\n *                      Can be:\\n *                        'normal' - Normal electrode input (Default)\\n *                        'shorted' - Input shorted (for offset or noise measurements)\\n *                        'biasMethod' - Used in conjunction with BIAS_MEAS bit for BIAS measurements.\\n *                        'mvdd' - MVDD for supply measurement\\n *                        'temp' - Temperature sensor\\n *                        'testsig' - Test signal\\n *                        'biasDrp' - BIAS_DRP (positive electrode is the driver)\\n *                        'biasDrn' - BIAS_DRN (negative electrode is the driver)\\n * @property {Boolean} bias - BIAS: Is the channel included in the bias? If `true` or yes, this channel has both P\\n *                      and N channels connected to the bias. (Default is `true`)\\n * @property {Boolean} srb2 - SRB2 connection: This boolean determines the SRB2 connection for the corresponding\\n *                      channel. `false` for open, not connected to channel, and `true` for closed, connected to the\\n *                      channel. (Default is `true`)\\n * @property {Boolean} srb1 - Stimulus, reference, and bias 1: This boolean connects the SRB2 to all 4, 6, or 8\\n *                      channels inverting inputs. `false` when switches open, disconnected, and `true` when switches\\n *                      closed, or connected. (Default is `false`)\\n */\\n\\n/**\\n * Get an object of default board settings.\\n * @param channelNumber\\n * @returns {ChannelSettingsObject}\\n */\\nfunction channelSettingsObjectDefault(channelNumber) {\\n  return {\\n    channelNumber: channelNumber,\\n    powerDown: false,\\n    gain: 24,\\n    inputType: obciStringADCNormal,\\n    bias: true,\\n    srb2: true,\\n    srb1: false\\n  };\\n}\\n\\n/**\\n * @description RawDataToSample default object creation\\n * @param numChannels {Number} - The number of channels\\n * @returns {RawDataToSample} - A new object\\n */\\nfunction rawDataToSampleObjectDefault(numChannels) {\\n  if (numChannels === undefined) numChannels = obciNumberOfChannelsDefault;\\n  return {\\n    accelArray: [0, 0, 0],\\n    channelSettings: constantsModule.channelSettingsArrayInit(numChannels),\\n    decompressedSamples: decompressedSamplesInit(numChannels),\\n    lastSampleNumber: 0,\\n    rawDataPacket: __WEBPACK_IMPORTED_MODULE_0_buffer___[\\\"Buffer\\\"].alloc(33),\\n    rawDataPackets: [],\\n    scale: true,\\n    sendCounts: false,\\n    timeOffset: 0,\\n    verbose: false\\n  };\\n}\\n\\nfunction decompressedSamplesInit(numChannels) {\\n  let output = [];\\n  for (let i = 0; i < 3; i++) {\\n    output.push(new Array(numChannels));\\n  }\\n  return output;\\n}\\n\\n/**\\n * Get's the command for sample rate Cyton\\n * @param sampleRate {Number} - The desired sample rate\\n * @return {Promise}\\n */\\nfunction commandSampleRateForCmdCyton(sampleRate) {\\n  return new Promise(function (resolve, reject) {\\n    switch (sampleRate) {\\n      case obciSampleRate16000:\\n        resolve(obciSampleRateCmdCyton16000);\\n        break;\\n      case obciSampleRate8000:\\n        resolve(obciSampleRateCmdCyton8000);\\n        break;\\n      case obciSampleRate4000:\\n        resolve(obciSampleRateCmdCyton4000);\\n        break;\\n      case obciSampleRate2000:\\n        resolve(obciSampleRateCmdCyton2000);\\n        break;\\n      case obciSampleRate1000:\\n        resolve(obciSampleRateCmdCyton1000);\\n        break;\\n      case obciSampleRate500:\\n        resolve(obciSampleRateCmdCyton500);\\n        break;\\n      case obciSampleRate250:\\n        resolve(obciSampleRateCmdCyton250);\\n        break;\\n      default:\\n        reject(Error('Invalid sample rate'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Get's the command for sample rate Cyton\\n * @param sampleRate {Number} - The desired sample rate\\n * @return {Promise}\\n */\\nfunction commandSampleRateForCmdGanglion(sampleRate) {\\n  return new Promise(function (resolve, reject) {\\n    switch (sampleRate) {\\n      case obciSampleRate25600:\\n        resolve(obciSampleRateCmdGang25600);\\n        break;\\n      case obciSampleRate12800:\\n        resolve(obciSampleRateCmdGang12800);\\n        break;\\n      case obciSampleRate6400:\\n        resolve(obciSampleRateCmdGang6400);\\n        break;\\n      case obciSampleRate3200:\\n        resolve(obciSampleRateCmdGang3200);\\n        break;\\n      case obciSampleRate1600:\\n        resolve(obciSampleRateCmdGang1600);\\n        break;\\n      case obciSampleRate800:\\n        resolve(obciSampleRateCmdGang800);\\n        break;\\n      case obciSampleRate400:\\n        resolve(obciSampleRateCmdGang400);\\n        break;\\n      case obciSampleRate200:\\n        resolve(obciSampleRateCmdGang200);\\n        break;\\n      default:\\n        reject(Error('Invalid sample rate'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * Get's the command for sample rate Cyton\\n * @param boardMode {String} - The desired sample rate\\n * @return {Promise}\\n */\\nfunction commandBoardModeForMode(boardMode) {\\n  return new Promise(function (resolve, reject) {\\n    switch (boardMode) {\\n      case obciBoardModeDefault:\\n        resolve(obciBoardModeCmdDefault);\\n        break;\\n      case obciBoardModeDebug:\\n        resolve(obciBoardModeCmdDebug);\\n        break;\\n      case obciBoardModeAnalog:\\n        resolve(obciBoardModeCmdAnalog);\\n        break;\\n      case obciBoardModeDigital:\\n        resolve(obciBoardModeCmdDigital);\\n        break;\\n      default:\\n        reject(Error('Invalid sample rate'));\\n        break;\\n    }\\n  });\\n}\\n\\n/**\\n * @description Get a list of local names from an array of peripherals\\n */\\nfunction getPeripheralLocalNames(pArray) {\\n  return new Promise((resolve, reject) => {\\n    var list = [];\\n    pArray.forEach(perif => {\\n      list.push(perif.advertisement.localName);\\n    });\\n    if (list.length > 0) {\\n      return resolve(list);\\n    } else {\\n      return reject(Error(`No peripherals discovered with prefix equal to ${obciGanglionPrefix}`));\\n    }\\n  });\\n}\\n\\n/**\\n * @description Get a peripheral with a local name\\n * @param `pArray` {Array} - Array of peripherals\\n * @param `localName` {String} - The local name of the BLE device.\\n */\\nfunction getPeripheralWithLocalName(pArray, localName) {\\n  return new Promise((resolve, reject) => {\\n    if (typeof pArray !== 'object') return reject(Error(`pArray must be of type Object`));\\n    pArray.forEach(perif => {\\n      if (perif.advertisement.hasOwnProperty('localName')) {\\n        if (perif.advertisement.localName === localName) {\\n          return resolve(perif);\\n        }\\n      }\\n    });\\n    return reject(Error(`No peripheral found with localName: ${localName}`));\\n  });\\n}\\n\\n/**\\n * @description This function is used to extract the major version from a github\\n *  version string.\\n * @returns {Number} The major version number\\n */\\nfunction getVersionNumber(versionStr) {\\n  return Number(versionStr[1]);\\n}\\n\\n/**\\n * @description Very safely checks to see if the noble peripheral is a\\n *  ganglion by way of checking the local name property.\\n */\\nfunction isPeripheralGanglion(peripheral) {\\n  if (peripheral) {\\n    if (peripheral.hasOwnProperty('advertisement')) {\\n      if (peripheral.advertisement !== null && peripheral.advertisement.hasOwnProperty('localName')) {\\n        if (peripheral.advertisement.localName !== undefined && peripheral.advertisement.localName !== null) {\\n          if (peripheral.advertisement.localName.indexOf(obciGanglionPrefix) > -1) {\\n            return true;\\n          }\\n        }\\n      }\\n    }\\n  }\\n  return false;\\n}\\n\\n/* harmony default export */ __webpack_exports__[\\\"default\\\"] = (constantsModule);\\n\\n//////////////////\\n// WEBPACK FOOTER\\n// ./src/constants.js\\n// module id = 5\\n// module chunks = 0 1 3\\n\\n//# sourceURL=webpack:///./src/constants.js?\");\n\n/***/ })\n/******/ ])[\"default\"];\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/openbci-utilities/dist/constants.js\n// module id = 25\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/openbci-utilities/dist/constants.js?"
              );

              /***/
            },
            /* 26 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                '\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(0);\n/* tslint:enable:max-line-length */\n/**\n * Perform a side effect for every emission on the source Observable, but return\n * an Observable that is identical to the source.\n *\n * <span class="informal">Intercepts each emission on the source and runs a\n * function, but returns an output which is identical to the source as long as errors don\'t occur.</span>\n *\n * <img src="./img/do.png" width="100%">\n *\n * Returns a mirrored Observable of the source Observable, but modified so that\n * the provided Observer is called to perform a side effect for every value,\n * error, and completion emitted by the source. Any errors that are thrown in\n * the aforementioned Observer or handlers are safely sent down the error path\n * of the output Observable.\n *\n * This operator is useful for debugging your Observables for the correct values\n * or performing other side effects.\n *\n * Note: this is different to a `subscribe` on the Observable. If the Observable\n * returned by `do` is not subscribed, the side effects specified by the\n * Observer will never happen. `do` therefore simply spies on existing\n * execution, it does not trigger an execution to happen like `subscribe` does.\n *\n * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>\n * var clicks = Rx.Observable.fromEvent(document, \'click\');\n * var positions = clicks\n *   .do(ev => console.log(ev))\n *   .map(ev => ev.clientX);\n * positions.subscribe(x => console.log(x));\n *\n * @see {@link map}\n * @see {@link subscribe}\n *\n * @param {Observer|function} [nextOrObserver] A normal Observer object or a\n * callback for `next`.\n * @param {function} [error] Callback for errors in the source.\n * @param {function} [complete] Callback for the completion of the source.\n * @return {Observable} An Observable identical to the source, but runs the\n * specified Observer or callback(s) for each item.\n * @name tap\n */\nfunction tap(nextOrObserver, error, complete) {\n    return function tapOperatorFunction(source) {\n        return source.lift(new DoOperator(nextOrObserver, error, complete));\n    };\n}\nexports.tap = tap;\nvar DoOperator = (function () {\n    function DoOperator(nextOrObserver, error, complete) {\n        this.nextOrObserver = nextOrObserver;\n        this.error = error;\n        this.complete = complete;\n    }\n    DoOperator.prototype.call = function (subscriber, source) {\n        return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));\n    };\n    return DoOperator;\n}());\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar DoSubscriber = (function (_super) {\n    __extends(DoSubscriber, _super);\n    function DoSubscriber(destination, nextOrObserver, error, complete) {\n        _super.call(this, destination);\n        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);\n        safeSubscriber.syncErrorThrowable = true;\n        this.add(safeSubscriber);\n        this.safeSubscriber = safeSubscriber;\n    }\n    DoSubscriber.prototype._next = function (value) {\n        var safeSubscriber = this.safeSubscriber;\n        safeSubscriber.next(value);\n        if (safeSubscriber.syncErrorThrown) {\n            this.destination.error(safeSubscriber.syncErrorValue);\n        }\n        else {\n            this.destination.next(value);\n        }\n    };\n    DoSubscriber.prototype._error = function (err) {\n        var safeSubscriber = this.safeSubscriber;\n        safeSubscriber.error(err);\n        if (safeSubscriber.syncErrorThrown) {\n            this.destination.error(safeSubscriber.syncErrorValue);\n        }\n        else {\n            this.destination.error(err);\n        }\n    };\n    DoSubscriber.prototype._complete = function () {\n        var safeSubscriber = this.safeSubscriber;\n        safeSubscriber.complete();\n        if (safeSubscriber.syncErrorThrown) {\n            this.destination.error(safeSubscriber.syncErrorValue);\n        }\n        else {\n            this.destination.complete();\n        }\n    };\n    return DoSubscriber;\n}(Subscriber_1.Subscriber));\n//# sourceMappingURL=tap.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/operators/tap.js\n// module id = 26\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/tap.js?'
              );

              /***/
            },
            /* 27 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(0);\n/**\n * Applies a given `project` function to each value emitted by the source\n * Observable, and emits the resulting values as an Observable.\n *\n * <span class=\"informal\">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),\n * it passes each source value through a transformation function to get\n * corresponding output values.</span>\n *\n * <img src=\"./img/map.png\" width=\"100%\">\n *\n * Similar to the well known `Array.prototype.map` function, this operator\n * applies a projection to each value and emits that projection in the output\n * Observable.\n *\n * @example <caption>Map every click to the clientX position of that click</caption>\n * var clicks = Rx.Observable.fromEvent(document, 'click');\n * var positions = clicks.map(ev => ev.clientX);\n * positions.subscribe(x => console.log(x));\n *\n * @see {@link mapTo}\n * @see {@link pluck}\n *\n * @param {function(value: T, index: number): R} project The function to apply\n * to each `value` emitted by the source Observable. The `index` parameter is\n * the number `i` for the i-th emission that has happened since the\n * subscription, starting from the number `0`.\n * @param {any} [thisArg] An optional argument to define what `this` is in the\n * `project` function.\n * @return {Observable<R>} An Observable that emits the values from the source\n * Observable transformed by the given `project` function.\n * @method map\n * @owner Observable\n */\nfunction map(project, thisArg) {\n    return function mapOperation(source) {\n        if (typeof project !== 'function') {\n            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');\n        }\n        return source.lift(new MapOperator(project, thisArg));\n    };\n}\nexports.map = map;\nvar MapOperator = (function () {\n    function MapOperator(project, thisArg) {\n        this.project = project;\n        this.thisArg = thisArg;\n    }\n    MapOperator.prototype.call = function (subscriber, source) {\n        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));\n    };\n    return MapOperator;\n}());\nexports.MapOperator = MapOperator;\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar MapSubscriber = (function (_super) {\n    __extends(MapSubscriber, _super);\n    function MapSubscriber(destination, project, thisArg) {\n        _super.call(this, destination);\n        this.project = project;\n        this.count = 0;\n        this.thisArg = thisArg || this;\n    }\n    // NOTE: This looks unoptimized, but it's actually purposefully NOT\n    // using try/catch optimizations.\n    MapSubscriber.prototype._next = function (value) {\n        var result;\n        try {\n            result = this.project.call(this.thisArg, value, this.count++);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        this.destination.next(result);\n    };\n    return MapSubscriber;\n}(Subscriber_1.Subscriber));\n//# sourceMappingURL=map.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/operators/map.js\n// module id = 27\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/map.js?"
              );

              /***/
            },
            /* 28 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(0);\nvar EmptyError_1 = __webpack_require__(29);\n/**\n * Emits only the first value (or the first value that meets some condition)\n * emitted by the source Observable.\n *\n * <span class=\"informal\">Emits only the first value. Or emits only the first\n * value that passes some test.</span>\n *\n * <img src=\"./img/first.png\" width=\"100%\">\n *\n * If called with no arguments, `first` emits the first value of the source\n * Observable, then completes. If called with a `predicate` function, `first`\n * emits the first value of the source that matches the specified condition. It\n * may also take a `resultSelector` function to produce the output value from\n * the input value, and a `defaultValue` to emit in case the source completes\n * before it is able to emit a valid value. Throws an error if `defaultValue`\n * was not provided and a matching element is not found.\n *\n * @example <caption>Emit only the first click that happens on the DOM</caption>\n * var clicks = Rx.Observable.fromEvent(document, 'click');\n * var result = clicks.first();\n * result.subscribe(x => console.log(x));\n *\n * @example <caption>Emits the first click that happens on a DIV</caption>\n * var clicks = Rx.Observable.fromEvent(document, 'click');\n * var result = clicks.first(ev => ev.target.tagName === 'DIV');\n * result.subscribe(x => console.log(x));\n *\n * @see {@link filter}\n * @see {@link find}\n * @see {@link take}\n *\n * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`\n * callback if the Observable completes before any `next` notification was sent.\n *\n * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]\n * An optional function called with each item to test for condition matching.\n * @param {function(value: T, index: number): R} [resultSelector] A function to\n * produce the value on the output Observable based on the values\n * and the indices of the source Observable. The arguments passed to this\n * function are:\n * - `value`: the value that was emitted on the source.\n * - `index`: the \"index\" of the value from the source.\n * @param {R} [defaultValue] The default value emitted in case no valid value\n * was found on the source.\n * @return {Observable<T|R>} An Observable of the first item that matches the\n * condition.\n * @method first\n * @owner Observable\n */\nfunction first(predicate, resultSelector, defaultValue) {\n    return function (source) { return source.lift(new FirstOperator(predicate, resultSelector, defaultValue, source)); };\n}\nexports.first = first;\nvar FirstOperator = (function () {\n    function FirstOperator(predicate, resultSelector, defaultValue, source) {\n        this.predicate = predicate;\n        this.resultSelector = resultSelector;\n        this.defaultValue = defaultValue;\n        this.source = source;\n    }\n    FirstOperator.prototype.call = function (observer, source) {\n        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));\n    };\n    return FirstOperator;\n}());\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar FirstSubscriber = (function (_super) {\n    __extends(FirstSubscriber, _super);\n    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {\n        _super.call(this, destination);\n        this.predicate = predicate;\n        this.resultSelector = resultSelector;\n        this.defaultValue = defaultValue;\n        this.source = source;\n        this.index = 0;\n        this.hasCompleted = false;\n        this._emitted = false;\n    }\n    FirstSubscriber.prototype._next = function (value) {\n        var index = this.index++;\n        if (this.predicate) {\n            this._tryPredicate(value, index);\n        }\n        else {\n            this._emit(value, index);\n        }\n    };\n    FirstSubscriber.prototype._tryPredicate = function (value, index) {\n        var result;\n        try {\n            result = this.predicate(value, index, this.source);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        if (result) {\n            this._emit(value, index);\n        }\n    };\n    FirstSubscriber.prototype._emit = function (value, index) {\n        if (this.resultSelector) {\n            this._tryResultSelector(value, index);\n            return;\n        }\n        this._emitFinal(value);\n    };\n    FirstSubscriber.prototype._tryResultSelector = function (value, index) {\n        var result;\n        try {\n            result = this.resultSelector(value, index);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        this._emitFinal(result);\n    };\n    FirstSubscriber.prototype._emitFinal = function (value) {\n        var destination = this.destination;\n        if (!this._emitted) {\n            this._emitted = true;\n            destination.next(value);\n            destination.complete();\n            this.hasCompleted = true;\n        }\n    };\n    FirstSubscriber.prototype._complete = function () {\n        var destination = this.destination;\n        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {\n            destination.next(this.defaultValue);\n            destination.complete();\n        }\n        else if (!this.hasCompleted) {\n            destination.error(new EmptyError_1.EmptyError);\n        }\n    };\n    return FirstSubscriber;\n}(Subscriber_1.Subscriber));\n//# sourceMappingURL=first.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/operators/first.js\n// module id = 28\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/first.js?"
              );

              /***/
            },
            /* 29 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\n/**\n * An error thrown when an Observable or a sequence was queried but has no\n * elements.\n *\n * @see {@link first}\n * @see {@link last}\n * @see {@link single}\n *\n * @class EmptyError\n */\nvar EmptyError = (function (_super) {\n    __extends(EmptyError, _super);\n    function EmptyError() {\n        var err = _super.call(this, 'no elements in sequence');\n        this.name = err.name = 'EmptyError';\n        this.stack = err.stack;\n        this.message = err.message;\n    }\n    return EmptyError;\n}(Error));\nexports.EmptyError = EmptyError;\n//# sourceMappingURL=EmptyError.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/EmptyError.js\n// module id = 29\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/EmptyError.js?"
              );

              /***/
            },
            /* 30 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                '\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(0);\n/* tslint:enable:max-line-length */\n/**\n * Filter items emitted by the source Observable by only emitting those that\n * satisfy a specified predicate.\n *\n * <span class="informal">Like\n * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),\n * it only emits a value from the source if it passes a criterion function.</span>\n *\n * <img src="./img/filter.png" width="100%">\n *\n * Similar to the well-known `Array.prototype.filter` method, this operator\n * takes values from the source Observable, passes them through a `predicate`\n * function and only emits those values that yielded `true`.\n *\n * @example <caption>Emit only click events whose target was a DIV element</caption>\n * var clicks = Rx.Observable.fromEvent(document, \'click\');\n * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === \'DIV\');\n * clicksOnDivs.subscribe(x => console.log(x));\n *\n * @see {@link distinct}\n * @see {@link distinctUntilChanged}\n * @see {@link distinctUntilKeyChanged}\n * @see {@link ignoreElements}\n * @see {@link partition}\n * @see {@link skip}\n *\n * @param {function(value: T, index: number): boolean} predicate A function that\n * evaluates each value emitted by the source Observable. If it returns `true`,\n * the value is emitted, if `false` the value is not passed to the output\n * Observable. The `index` parameter is the number `i` for the i-th source\n * emission that has happened since the subscription, starting from the number\n * `0`.\n * @param {any} [thisArg] An optional argument to determine the value of `this`\n * in the `predicate` function.\n * @return {Observable} An Observable of values from the source that were\n * allowed by the `predicate` function.\n * @method filter\n * @owner Observable\n */\nfunction filter(predicate, thisArg) {\n    return function filterOperatorFunction(source) {\n        return source.lift(new FilterOperator(predicate, thisArg));\n    };\n}\nexports.filter = filter;\nvar FilterOperator = (function () {\n    function FilterOperator(predicate, thisArg) {\n        this.predicate = predicate;\n        this.thisArg = thisArg;\n    }\n    FilterOperator.prototype.call = function (subscriber, source) {\n        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));\n    };\n    return FilterOperator;\n}());\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar FilterSubscriber = (function (_super) {\n    __extends(FilterSubscriber, _super);\n    function FilterSubscriber(destination, predicate, thisArg) {\n        _super.call(this, destination);\n        this.predicate = predicate;\n        this.thisArg = thisArg;\n        this.count = 0;\n    }\n    // the try catch block below is left specifically for\n    // optimization and perf reasons. a tryCatcher is not necessary here.\n    FilterSubscriber.prototype._next = function (value) {\n        var result;\n        try {\n            result = this.predicate.call(this.thisArg, value, this.count++);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        if (result) {\n            this.destination.next(value);\n        }\n    };\n    return FilterSubscriber;\n}(Subscriber_1.Subscriber));\n//# sourceMappingURL=filter.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/operators/filter.js\n// module id = 30\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/filter.js?'
              );

              /***/
            },
            /* 31 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                '\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar OuterSubscriber_1 = __webpack_require__(13);\nvar subscribeToResult_1 = __webpack_require__(14);\n/**\n * Emits the values emitted by the source Observable until a `notifier`\n * Observable emits a value.\n *\n * <span class="informal">Lets values pass until a second Observable,\n * `notifier`, emits something. Then, it completes.</span>\n *\n * <img src="./img/takeUntil.png" width="100%">\n *\n * `takeUntil` subscribes and begins mirroring the source Observable. It also\n * monitors a second Observable, `notifier` that you provide. If the `notifier`\n * emits a value or a complete notification, the output Observable stops\n * mirroring the source Observable and completes.\n *\n * @example <caption>Tick every second until the first click happens</caption>\n * var interval = Rx.Observable.interval(1000);\n * var clicks = Rx.Observable.fromEvent(document, \'click\');\n * var result = interval.takeUntil(clicks);\n * result.subscribe(x => console.log(x));\n *\n * @see {@link take}\n * @see {@link takeLast}\n * @see {@link takeWhile}\n * @see {@link skip}\n *\n * @param {Observable} notifier The Observable whose first emitted value will\n * cause the output Observable of `takeUntil` to stop emitting values from the\n * source Observable.\n * @return {Observable<T>} An Observable that emits the values from the source\n * Observable until such time as `notifier` emits its first value.\n * @method takeUntil\n * @owner Observable\n */\nfunction takeUntil(notifier) {\n    return function (source) { return source.lift(new TakeUntilOperator(notifier)); };\n}\nexports.takeUntil = takeUntil;\nvar TakeUntilOperator = (function () {\n    function TakeUntilOperator(notifier) {\n        this.notifier = notifier;\n    }\n    TakeUntilOperator.prototype.call = function (subscriber, source) {\n        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));\n    };\n    return TakeUntilOperator;\n}());\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar TakeUntilSubscriber = (function (_super) {\n    __extends(TakeUntilSubscriber, _super);\n    function TakeUntilSubscriber(destination, notifier) {\n        _super.call(this, destination);\n        this.notifier = notifier;\n        this.add(subscribeToResult_1.subscribeToResult(this, notifier));\n    }\n    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {\n        this.complete();\n    };\n    TakeUntilSubscriber.prototype.notifyComplete = function () {\n        // noop\n    };\n    return TakeUntilSubscriber;\n}(OuterSubscriber_1.OuterSubscriber));\n//# sourceMappingURL=takeUntil.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/operators/takeUntil.js\n// module id = 31\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/takeUntil.js?'
              );

              /***/
            },
            /* 32 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nexports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });\n//# sourceMappingURL=isArrayLike.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/isArrayLike.js\n// module id = 32\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isArrayLike.js?"
              );

              /***/
            },
            /* 33 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nfunction isPromise(value) {\n    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';\n}\nexports.isPromise = isPromise;\n//# sourceMappingURL=isPromise.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/util/isPromise.js\n// module id = 33\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isPromise.js?"
              );

              /***/
            },
            /* 34 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar root_1 = __webpack_require__(1);\nfunction symbolIteratorPonyfill(root) {\n    var Symbol = root.Symbol;\n    if (typeof Symbol === 'function') {\n        if (!Symbol.iterator) {\n            Symbol.iterator = Symbol('iterator polyfill');\n        }\n        return Symbol.iterator;\n    }\n    else {\n        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)\n        var Set_1 = root.Set;\n        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {\n            return '@@iterator';\n        }\n        var Map_1 = root.Map;\n        // required for compatability with es6-shim\n        if (Map_1) {\n            var keys = Object.getOwnPropertyNames(Map_1.prototype);\n            for (var i = 0; i < keys.length; ++i) {\n                var key = keys[i];\n                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.\n                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {\n                    return key;\n                }\n            }\n        }\n        return '@@iterator';\n    }\n}\nexports.symbolIteratorPonyfill = symbolIteratorPonyfill;\nexports.iterator = symbolIteratorPonyfill(root_1.root);\n/**\n * @deprecated use iterator instead\n */\nexports.$$iterator = exports.iterator;\n//# sourceMappingURL=iterator.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/symbol/iterator.js\n// module id = 34\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/symbol/iterator.js?"
              );

              /***/
            },
            /* 35 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(0);\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar InnerSubscriber = (function (_super) {\n    __extends(InnerSubscriber, _super);\n    function InnerSubscriber(parent, outerValue, outerIndex) {\n        _super.call(this);\n        this.parent = parent;\n        this.outerValue = outerValue;\n        this.outerIndex = outerIndex;\n        this.index = 0;\n    }\n    InnerSubscriber.prototype._next = function (value) {\n        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);\n    };\n    InnerSubscriber.prototype._error = function (error) {\n        this.parent.notifyError(error, this);\n        this.unsubscribe();\n    };\n    InnerSubscriber.prototype._complete = function () {\n        this.parent.notifyComplete(this);\n        this.unsubscribe();\n    };\n    return InnerSubscriber;\n}(Subscriber_1.Subscriber));\nexports.InnerSubscriber = InnerSubscriber;\n//# sourceMappingURL=InnerSubscriber.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/InnerSubscriber.js\n// module id = 35\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/InnerSubscriber.js?"
              );

              /***/
            },
            /* 36 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                '\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar subscribeToResult_1 = __webpack_require__(14);\nvar OuterSubscriber_1 = __webpack_require__(13);\n/* tslint:enable:max-line-length */\n/**\n * Projects each source value to an Observable which is merged in the output\n * Observable.\n *\n * <span class="informal">Maps each value to an Observable, then flattens all of\n * these inner Observables using {@link mergeAll}.</span>\n *\n * <img src="./img/mergeMap.png" width="100%">\n *\n * Returns an Observable that emits items based on applying a function that you\n * supply to each item emitted by the source Observable, where that function\n * returns an Observable, and then merging those resulting Observables and\n * emitting the results of this merger.\n *\n * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>\n * var letters = Rx.Observable.of(\'a\', \'b\', \'c\');\n * var result = letters.mergeMap(x =>\n *   Rx.Observable.interval(1000).map(i => x+i)\n * );\n * result.subscribe(x => console.log(x));\n *\n * // Results in the following:\n * // a0\n * // b0\n * // c0\n * // a1\n * // b1\n * // c1\n * // continues to list a,b,c with respective ascending integers\n *\n * @see {@link concatMap}\n * @see {@link exhaustMap}\n * @see {@link merge}\n * @see {@link mergeAll}\n * @see {@link mergeMapTo}\n * @see {@link mergeScan}\n * @see {@link switchMap}\n *\n * @param {function(value: T, ?index: number): ObservableInput} project A function\n * that, when applied to an item emitted by the source Observable, returns an\n * Observable.\n * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]\n * A function to produce the value on the output Observable based on the values\n * and the indices of the source (outer) emission and the inner Observable\n * emission. The arguments passed to this function are:\n * - `outerValue`: the value that came from the source\n * - `innerValue`: the value that came from the projected Observable\n * - `outerIndex`: the "index" of the value that came from the source\n * - `innerIndex`: the "index" of the value from the projected Observable\n * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input\n * Observables being subscribed to concurrently.\n * @return {Observable} An Observable that emits the result of applying the\n * projection function (and the optional `resultSelector`) to each item emitted\n * by the source Observable and merging the results of the Observables obtained\n * from this transformation.\n * @method mergeMap\n * @owner Observable\n */\nfunction mergeMap(project, resultSelector, concurrent) {\n    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }\n    return function mergeMapOperatorFunction(source) {\n        if (typeof resultSelector === \'number\') {\n            concurrent = resultSelector;\n            resultSelector = null;\n        }\n        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));\n    };\n}\nexports.mergeMap = mergeMap;\nvar MergeMapOperator = (function () {\n    function MergeMapOperator(project, resultSelector, concurrent) {\n        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }\n        this.project = project;\n        this.resultSelector = resultSelector;\n        this.concurrent = concurrent;\n    }\n    MergeMapOperator.prototype.call = function (observer, source) {\n        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));\n    };\n    return MergeMapOperator;\n}());\nexports.MergeMapOperator = MergeMapOperator;\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar MergeMapSubscriber = (function (_super) {\n    __extends(MergeMapSubscriber, _super);\n    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {\n        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }\n        _super.call(this, destination);\n        this.project = project;\n        this.resultSelector = resultSelector;\n        this.concurrent = concurrent;\n        this.hasCompleted = false;\n        this.buffer = [];\n        this.active = 0;\n        this.index = 0;\n    }\n    MergeMapSubscriber.prototype._next = function (value) {\n        if (this.active < this.concurrent) {\n            this._tryNext(value);\n        }\n        else {\n            this.buffer.push(value);\n        }\n    };\n    MergeMapSubscriber.prototype._tryNext = function (value) {\n        var result;\n        var index = this.index++;\n        try {\n            result = this.project(value, index);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        this.active++;\n        this._innerSub(result, value, index);\n    };\n    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {\n        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));\n    };\n    MergeMapSubscriber.prototype._complete = function () {\n        this.hasCompleted = true;\n        if (this.active === 0 && this.buffer.length === 0) {\n            this.destination.complete();\n        }\n    };\n    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {\n        if (this.resultSelector) {\n            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);\n        }\n        else {\n            this.destination.next(innerValue);\n        }\n    };\n    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {\n        var result;\n        try {\n            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        this.destination.next(result);\n    };\n    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {\n        var buffer = this.buffer;\n        this.remove(innerSub);\n        this.active--;\n        if (buffer.length > 0) {\n            this._next(buffer.shift());\n        }\n        else if (this.active === 0 && this.hasCompleted) {\n            this.destination.complete();\n        }\n    };\n    return MergeMapSubscriber;\n}(OuterSubscriber_1.OuterSubscriber));\nexports.MergeMapSubscriber = MergeMapSubscriber;\n//# sourceMappingURL=mergeMap.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/operators/mergeMap.js\n// module id = 36\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/mergeMap.js?'
              );

              /***/
            },
            /* 37 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar FromEventObservable_1 = __webpack_require__(38);\nexports.fromEvent = FromEventObservable_1.FromEventObservable.create;\n//# sourceMappingURL=fromEvent.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/observable/fromEvent.js\n// module id = 37\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/observable/fromEvent.js?"
              );

              /***/
            },
            /* 38 */
            /***/ function(module, exports, __webpack_require__) {
              "use strict";
              eval(
                "\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Observable_1 = __webpack_require__(3);\nvar tryCatch_1 = __webpack_require__(9);\nvar isFunction_1 = __webpack_require__(4);\nvar errorObject_1 = __webpack_require__(5);\nvar Subscription_1 = __webpack_require__(2);\nvar toString = Object.prototype.toString;\nfunction isNodeStyleEventEmitter(sourceObj) {\n    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';\n}\nfunction isJQueryStyleEventEmitter(sourceObj) {\n    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';\n}\nfunction isNodeList(sourceObj) {\n    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';\n}\nfunction isHTMLCollection(sourceObj) {\n    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';\n}\nfunction isEventTarget(sourceObj) {\n    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';\n}\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @extends {Ignored}\n * @hide true\n */\nvar FromEventObservable = (function (_super) {\n    __extends(FromEventObservable, _super);\n    function FromEventObservable(sourceObj, eventName, selector, options) {\n        _super.call(this);\n        this.sourceObj = sourceObj;\n        this.eventName = eventName;\n        this.selector = selector;\n        this.options = options;\n    }\n    /* tslint:enable:max-line-length */\n    /**\n     * Creates an Observable that emits events of a specific type coming from the\n     * given event target.\n     *\n     * <span class=\"informal\">Creates an Observable from DOM events, or Node.js\n     * EventEmitter events or others.</span>\n     *\n     * <img src=\"./img/fromEvent.png\" width=\"100%\">\n     *\n     * `fromEvent` accepts as a first argument event target, which is an object with methods\n     * for registering event handler functions. As a second argument it takes string that indicates\n     * type of event we want to listen for. `fromEvent` supports selected types of event targets,\n     * which are described in detail below. If your event target does not match any of the ones listed,\n     * you should use {@link fromEventPattern}, which can be used on arbitrary APIs.\n     * When it comes to APIs supported by `fromEvent`, their methods for adding and removing event\n     * handler functions have different names, but they all accept a string describing event type\n     * and function itself, which will be called whenever said event happens.\n     *\n     * Every time resulting Observable is subscribed, event handler function will be registered\n     * to event target on given event type. When that event fires, value\n     * passed as a first argument to registered function will be emitted by output Observable.\n     * When Observable is unsubscribed, function will be unregistered from event target.\n     *\n     * Note that if event target calls registered function with more than one argument, second\n     * and following arguments will not appear in resulting stream. In order to get access to them,\n     * you can pass to `fromEvent` optional project function, which will be called with all arguments\n     * passed to event handler. Output Observable will then emit value returned by project function,\n     * instead of the usual value.\n     *\n     * Remember that event targets listed below are checked via duck typing. It means that\n     * no matter what kind of object you have and no matter what environment you work in,\n     * you can safely use `fromEvent` on that object if it exposes described methods (provided\n     * of course they behave as was described above). So for example if Node.js library exposes\n     * event target which has the same method names as DOM EventTarget, `fromEvent` is still\n     * a good choice.\n     *\n     * If the API you use is more callback then event handler oriented (subscribed\n     * callback function fires only once and thus there is no need to manually\n     * unregister it), you should use {@link bindCallback} or {@link bindNodeCallback}\n     * instead.\n     *\n     * `fromEvent` supports following types of event targets:\n     *\n     * **DOM EventTarget**\n     *\n     * This is an object with `addEventListener` and `removeEventListener` methods.\n     *\n     * In the browser, `addEventListener` accepts - apart from event type string and event\n     * handler function arguments - optional third parameter, which is either an object or boolean,\n     * both used for additional configuration how and when passed function will be called. When\n     * `fromEvent` is used with event target of that type, you can provide this values\n     * as third parameter as well.\n     *\n     * **Node.js EventEmitter**\n     *\n     * An object with `addListener` and `removeListener` methods.\n     *\n     * **JQuery-style event target**\n     *\n     * An object with `on` and `off` methods\n     *\n     * **DOM NodeList**\n     *\n     * List of DOM Nodes, returned for example by `document.querySelectorAll` or `Node.childNodes`.\n     *\n     * Although this collection is not event target in itself, `fromEvent` will iterate over all Nodes\n     * it contains and install event handler function in every of them. When returned Observable\n     * is unsubscribed, function will be removed from all Nodes.\n     *\n     * **DOM HtmlCollection**\n     *\n     * Just as in case of NodeList it is a collection of DOM nodes. Here as well event handler function is\n     * installed and removed in each of elements.\n     *\n     *\n     * @example <caption>Emits clicks happening on the DOM document</caption>\n     * var clicks = Rx.Observable.fromEvent(document, 'click');\n     * clicks.subscribe(x => console.log(x));\n     *\n     * // Results in:\n     * // MouseEvent object logged to console every time a click\n     * // occurs on the document.\n     *\n     *\n     * @example <caption>Use addEventListener with capture option</caption>\n     * var clicksInDocument = Rx.Observable.fromEvent(document, 'click', true); // note optional configuration parameter\n     *                                                                          // which will be passed to addEventListener\n     * var clicksInDiv = Rx.Observable.fromEvent(someDivInDocument, 'click');\n     *\n     * clicksInDocument.subscribe(() => console.log('document'));\n     * clicksInDiv.subscribe(() => console.log('div'));\n     *\n     * // By default events bubble UP in DOM tree, so normally\n     * // when we would click on div in document\n     * // \"div\" would be logged first and then \"document\".\n     * // Since we specified optional `capture` option, document\n     * // will catch event when it goes DOWN DOM tree, so console\n     * // will log \"document\" and then \"div\".\n     *\n     * @see {@link bindCallback}\n     * @see {@link bindNodeCallback}\n     * @see {@link fromEventPattern}\n     *\n     * @param {EventTargetLike} target The DOM EventTarget, Node.js\n     * EventEmitter, JQuery-like event target, NodeList or HTMLCollection to attach the event handler to.\n     * @param {string} eventName The event name of interest, being emitted by the\n     * `target`.\n     * @param {EventListenerOptions} [options] Options to pass through to addEventListener\n     * @param {SelectorMethodSignature<T>} [selector] An optional function to\n     * post-process results. It takes the arguments from the event handler and\n     * should return a single value.\n     * @return {Observable<T>}\n     * @static true\n     * @name fromEvent\n     * @owner Observable\n     */\n    FromEventObservable.create = function (target, eventName, options, selector) {\n        if (isFunction_1.isFunction(options)) {\n            selector = options;\n            options = undefined;\n        }\n        return new FromEventObservable(target, eventName, selector, options);\n    };\n    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {\n        var unsubscribe;\n        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {\n            for (var i = 0, len = sourceObj.length; i < len; i++) {\n                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);\n            }\n        }\n        else if (isEventTarget(sourceObj)) {\n            var source_1 = sourceObj;\n            sourceObj.addEventListener(eventName, handler, options);\n            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };\n        }\n        else if (isJQueryStyleEventEmitter(sourceObj)) {\n            var source_2 = sourceObj;\n            sourceObj.on(eventName, handler);\n            unsubscribe = function () { return source_2.off(eventName, handler); };\n        }\n        else if (isNodeStyleEventEmitter(sourceObj)) {\n            var source_3 = sourceObj;\n            sourceObj.addListener(eventName, handler);\n            unsubscribe = function () { return source_3.removeListener(eventName, handler); };\n        }\n        else {\n            throw new TypeError('Invalid event target');\n        }\n        subscriber.add(new Subscription_1.Subscription(unsubscribe));\n    };\n    FromEventObservable.prototype._subscribe = function (subscriber) {\n        var sourceObj = this.sourceObj;\n        var eventName = this.eventName;\n        var options = this.options;\n        var selector = this.selector;\n        var handler = selector ? function () {\n            var args = [];\n            for (var _i = 0; _i < arguments.length; _i++) {\n                args[_i - 0] = arguments[_i];\n            }\n            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);\n            if (result === errorObject_1.errorObject) {\n                subscriber.error(errorObject_1.errorObject.e);\n            }\n            else {\n                subscriber.next(result);\n            }\n        } : function (e) { return subscriber.next(e); };\n        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);\n    };\n    return FromEventObservable;\n}(Observable_1.Observable));\nexports.FromEventObservable = FromEventObservable;\n//# sourceMappingURL=FromEventObservable.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/rxjs/observable/FromEventObservable.js\n// module id = 38\n// module chunks = 0\n\n//# sourceURL=webpack:///./node_modules/rxjs/observable/FromEventObservable.js?"
              );

              /***/
            },
            /* 39 */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
              "use strict";
              eval(
                '/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renameDataProp; });\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nconst renameDataProp = (_ref) => {\n    let { channelData } = _ref,\n        sample = _objectWithoutProperties(_ref, ["channelData"]);\n\n    return _extends({}, sample, {\n        data: channelData\n    });\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/index.js\n// module id = 39\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/utils/index.js?'
              );

              /***/
            },
            /* 40 */
            /***/ function(module, __webpack_exports__, __webpack_require__) {
              "use strict";
              eval(
                "\nconst GANGLION_SERVICE_ID = 0xfe84;\n/* harmony export (immutable) */ __webpack_exports__[\"g\"] = GANGLION_SERVICE_ID;\n\nconst BOARD_NAME = 'ganglion';\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = BOARD_NAME;\n\nconst CHARACTERISTICS = {\n    reader: '2d30c082-f39f-4ce6-923f-3484ea480596',\n    writer: '2d30c083-f39f-4ce6-923f-3484ea480596',\n    connection: '2d30c084-f39f-4ce6-923f-3484ea480596'\n};\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = CHARACTERISTICS;\n\nconst CHARACTERISTIC_EVENT = 'characteristicvaluechanged';\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = CHARACTERISTIC_EVENT;\n\nconst DISCONNECTED_EVENT = 'gattserverdisconnected';\n/* harmony export (immutable) */ __webpack_exports__[\"f\"] = DISCONNECTED_EVENT;\n\nconst DEVICE_OPTIONS = {\n    filters: [{ namePrefix: 'Ganglion-' }],\n    optionalServices: [GANGLION_SERVICE_ID]\n};\n/* harmony export (immutable) */ __webpack_exports__[\"e\"] = DEVICE_OPTIONS;\n\nconst COMMAND_STRINGS = {\n    start: 'b',\n    accelData: 'n'\n};\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = COMMAND_STRINGS;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/constants/index.js\n// module id = 40\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/constants/index.js?"
              );

              /***/
            }
            /******/
          ]
        );
      });

      /***/
    }
    /******/
  ]
);
