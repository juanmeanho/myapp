var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
    var b = 0;
    return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
};
$jscomp.arrayIterator = function (a) {
    return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.makeIterator = function (a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function (a) {
    for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
    return c;
};
$jscomp.arrayFromIterable = function (a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.getGlobal = function (a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy = function () {
    try {
        var a = {},
            b = Object.create(
                new $jscomp.global.Proxy(a, {
                    get: function (c, d, f) {
                        return c == a && "q" == d && f == b;
                    },
                })
            );
        return !0 === b.q;
    } catch (c) {
        return !1;
    }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
              if (a == Array.prototype || a == Object.prototype) return a;
              a[b] = c.value;
              return a;
          };
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, b) {
    var c = $jscomp.propertyToPolyfillSymbol[b];
    if (null == c) return a[b];
    c = a[c];
    return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function (a, b, c, d) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function (a, b, c, d) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
        var f = a[d];
        if (!(f in c)) return;
        c = c[f];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b });
};
$jscomp.polyfillIsolated = function (a, b, c, d) {
    var f = a.split(".");
    a = 1 === f.length;
    d = f[0];
    d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var l = 0; l < f.length - 1; l++) {
        var h = f[l];
        if (!(h in d)) return;
        d = d[h];
    }
    f = f[f.length - 1];
    c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[f] : null;
    b = b(c);
    null != b &&
        (a
            ? $jscomp.defineProperty($jscomp.polyfills, f, { configurable: !0, writable: !0, value: b })
            : b !== c &&
              (($jscomp.propertyToPolyfillSymbol[f] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(f) : $jscomp.POLYFILL_PREFIX + f),
              (f = $jscomp.propertyToPolyfillSymbol[f]),
              $jscomp.defineProperty(d, f, { configurable: !0, writable: !0, value: b })));
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill(
    "Symbol",
    function (a) {
        if (a) return a;
        var b = function (f, l) {
            this.$jscomp$symbol$id_ = f;
            $jscomp.defineProperty(this, "description", { configurable: !0, writable: !0, value: l });
        };
        b.prototype.toString = function () {
            return this.$jscomp$symbol$id_;
        };
        var c = 0,
            d = function (f) {
                if (this instanceof d) throw new TypeError("Symbol is not a constructor");
                return new b("jscomp_symbol_" + (f || "") + "_" + c++, f);
            };
        return d;
    },
    "es6",
    "es3"
);
$jscomp.initSymbolIterator = function () {};
$jscomp.polyfill(
    "Symbol.iterator",
    function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = $jscomp.global[b[c]];
            "function" === typeof d &&
                "function" != typeof d.prototype[a] &&
                $jscomp.defineProperty(d.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
                    },
                });
        }
        return a;
    },
    "es6",
    "es3"
);
$jscomp.initSymbolAsyncIterator = function () {};
$jscomp.iteratorPrototype = function (a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
        return this;
    };
    return a;
};
$jscomp.owns = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
};
$jscomp.polyfill(
    "WeakMap",
    function (a) {
        function b() {
            if (!a || !Object.seal) return !1;
            try {
                var g = Object.seal({}),
                    k = Object.seal({}),
                    n = new a([
                        [g, 2],
                        [k, 3],
                    ]);
                if (2 != n.get(g) || 3 != n.get(k)) return !1;
                n.delete(g);
                n.set(k, 4);
                return !n.has(g) && 4 == n.get(k);
            } catch (q) {
                return !1;
            }
        }
        function c() {}
        function d(g) {
            var k = typeof g;
            return ("object" === k && null !== g) || "function" === k;
        }
        function f(g) {
            if (!$jscomp.owns(g, h)) {
                var k = new c();
                $jscomp.defineProperty(g, h, { value: k });
            }
        }
        function l(g) {
            if (!$jscomp.ISOLATE_POLYFILLS) {
                var k = Object[g];
                k &&
                    (Object[g] = function (n) {
                        if (n instanceof c) return n;
                        Object.isExtensible(n) && f(n);
                        return k(n);
                    });
            }
        }
        if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
            if (a && $jscomp.ES6_CONFORMANCE) return a;
        } else if (b()) return a;
        var h = "$jscomp_hidden_" + Math.random();
        l("freeze");
        l("preventExtensions");
        l("seal");
        var m = 0,
            e = function (g) {
                this.id_ = (m += Math.random() + 1).toString();
                if (g) {
                    g = $jscomp.makeIterator(g);
                    for (var k; !(k = g.next()).done; ) (k = k.value), this.set(k[0], k[1]);
                }
            };
        e.prototype.set = function (g, k) {
            if (!d(g)) throw Error("Invalid WeakMap key");
            f(g);
            if (!$jscomp.owns(g, h)) throw Error("WeakMap key fail: " + g);
            g[h][this.id_] = k;
            return this;
        };
        e.prototype.get = function (g) {
            return d(g) && $jscomp.owns(g, h) ? g[h][this.id_] : void 0;
        };
        e.prototype.has = function (g) {
            return d(g) && $jscomp.owns(g, h) && $jscomp.owns(g[h], this.id_);
        };
        e.prototype.delete = function (g) {
            return d(g) && $jscomp.owns(g, h) && $jscomp.owns(g[h], this.id_) ? delete g[h][this.id_] : !1;
        };
        return e;
    },
    "es6",
    "es3"
);
$jscomp.MapEntry = function () {};
$jscomp.polyfill(
    "Map",
    function (a) {
        function b() {
            if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var e = Object.seal({ x: 4 }),
                    g = new a($jscomp.makeIterator([[e, "s"]]));
                if ("s" != g.get(e) || 1 != g.size || g.get({ x: 4 }) || g.set({ x: 4 }, "t") != g || 2 != g.size) return !1;
                var k = g.entries(),
                    n = k.next();
                if (n.done || n.value[0] != e || "s" != n.value[1]) return !1;
                n = k.next();
                return n.done || 4 != n.value[0].x || "t" != n.value[1] || !k.next().done ? !1 : !0;
            } catch (q) {
                return !1;
            }
        }
        if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
            if (a && $jscomp.ES6_CONFORMANCE) return a;
        } else if (b()) return a;
        var c = new WeakMap(),
            d = function (e) {
                this.data_ = {};
                this.head_ = h();
                this.size = 0;
                if (e) {
                    e = $jscomp.makeIterator(e);
                    for (var g; !(g = e.next()).done; ) (g = g.value), this.set(g[0], g[1]);
                }
            };
        d.prototype.set = function (e, g) {
            e = 0 === e ? 0 : e;
            var k = f(this, e);
            k.list || (k.list = this.data_[k.id] = []);
            k.entry
                ? (k.entry.value = g)
                : ((k.entry = { next: this.head_, previous: this.head_.previous, head: this.head_, key: e, value: g }), k.list.push(k.entry), (this.head_.previous.next = k.entry), (this.head_.previous = k.entry), this.size++);
            return this;
        };
        d.prototype.delete = function (e) {
            e = f(this, e);
            return e.entry && e.list ? (e.list.splice(e.index, 1), e.list.length || delete this.data_[e.id], (e.entry.previous.next = e.entry.next), (e.entry.next.previous = e.entry.previous), (e.entry.head = null), this.size--, !0) : !1;
        };
        d.prototype.clear = function () {
            this.data_ = {};
            this.head_ = this.head_.previous = h();
            this.size = 0;
        };
        d.prototype.has = function (e) {
            return !!f(this, e).entry;
        };
        d.prototype.get = function (e) {
            return (e = f(this, e).entry) && e.value;
        };
        d.prototype.entries = function () {
            return l(this, function (e) {
                return [e.key, e.value];
            });
        };
        d.prototype.keys = function () {
            return l(this, function (e) {
                return e.key;
            });
        };
        d.prototype.values = function () {
            return l(this, function (e) {
                return e.value;
            });
        };
        d.prototype.forEach = function (e, g) {
            for (var k = this.entries(), n; !(n = k.next()).done; ) (n = n.value), e.call(g, n[1], n[0], this);
        };
        d.prototype[Symbol.iterator] = d.prototype.entries;
        var f = function (e, g) {
                var k = g && typeof g;
                "object" == k || "function" == k ? (c.has(g) ? (k = c.get(g)) : ((k = "" + ++m), c.set(g, k))) : (k = "p_" + g);
                var n = e.data_[k];
                if (n && $jscomp.owns(e.data_, k))
                    for (e = 0; e < n.length; e++) {
                        var q = n[e];
                        if ((g !== g && q.key !== q.key) || g === q.key) return { id: k, list: n, index: e, entry: q };
                    }
                return { id: k, list: n, index: -1, entry: void 0 };
            },
            l = function (e, g) {
                var k = e.head_;
                return $jscomp.iteratorPrototype(function () {
                    if (k) {
                        for (; k.head != e.head_; ) k = k.previous;
                        for (; k.next != k.head; ) return (k = k.next), { done: !1, value: g(k) };
                        k = null;
                    }
                    return { done: !0, value: void 0 };
                });
            },
            h = function () {
                var e = {};
                return (e.previous = e.next = e.head = e);
            },
            m = 0;
        return d;
    },
    "es6",
    "es3"
);
$jscomp.findInternal = function (a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, f = 0; f < d; f++) {
        var l = a[f];
        if (b.call(c, l, f, a)) return { i: f, v: l };
    }
    return { i: -1, v: void 0 };
};
$jscomp.polyfill(
    "Array.prototype.find",
    function (a) {
        return a
            ? a
            : function (b, c) {
                  return $jscomp.findInternal(this, b, c).v;
              };
    },
    "es6",
    "es3"
);
$jscomp.polyfill(
    "Number.MAX_SAFE_INTEGER",
    function () {
        return 9007199254740991;
    },
    "es6",
    "es3"
);
$jscomp.iteratorFromArray = function (a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = {
            next: function () {
                if (c < a.length) {
                    var f = c++;
                    return { value: b(f, a[f]), done: !1 };
                }
                d.next = function () {
                    return { done: !0, value: void 0 };
                };
                return d.next();
            },
        };
    d[Symbol.iterator] = function () {
        return d;
    };
    return d;
};
$jscomp.polyfill(
    "Array.prototype.values",
    function (a) {
        return a
            ? a
            : function () {
                  return $jscomp.iteratorFromArray(this, function (b, c) {
                      return c;
                  });
              };
    },
    "es8",
    "es3"
);
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill(
    "Promise",
    function (a) {
        function b() {
            this.batch_ = null;
        }
        function c(h) {
            return h instanceof f
                ? h
                : new f(function (m, e) {
                      m(h);
                  });
        }
        if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
        b.prototype.asyncExecute = function (h) {
            if (null == this.batch_) {
                this.batch_ = [];
                var m = this;
                this.asyncExecuteFunction(function () {
                    m.executeBatch_();
                });
            }
            this.batch_.push(h);
        };
        var d = $jscomp.global.setTimeout;
        b.prototype.asyncExecuteFunction = function (h) {
            d(h, 0);
        };
        b.prototype.executeBatch_ = function () {
            for (; this.batch_ && this.batch_.length; ) {
                var h = this.batch_;
                this.batch_ = [];
                for (var m = 0; m < h.length; ++m) {
                    var e = h[m];
                    h[m] = null;
                    try {
                        e();
                    } catch (g) {
                        this.asyncThrow_(g);
                    }
                }
            }
            this.batch_ = null;
        };
        b.prototype.asyncThrow_ = function (h) {
            this.asyncExecuteFunction(function () {
                throw h;
            });
        };
        var f = function (h) {
            this.state_ = 0;
            this.result_ = void 0;
            this.onSettledCallbacks_ = [];
            var m = this.createResolveAndReject_();
            try {
                h(m.resolve, m.reject);
            } catch (e) {
                m.reject(e);
            }
        };
        f.prototype.createResolveAndReject_ = function () {
            function h(g) {
                return function (k) {
                    e || ((e = !0), g.call(m, k));
                };
            }
            var m = this,
                e = !1;
            return { resolve: h(this.resolveTo_), reject: h(this.reject_) };
        };
        f.prototype.resolveTo_ = function (h) {
            if (h === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
            else if (h instanceof f) this.settleSameAsPromise_(h);
            else {
                a: switch (typeof h) {
                    case "object":
                        var m = null != h;
                        break a;
                    case "function":
                        m = !0;
                        break a;
                    default:
                        m = !1;
                }
                m ? this.resolveToNonPromiseObj_(h) : this.fulfill_(h);
            }
        };
        f.prototype.resolveToNonPromiseObj_ = function (h) {
            var m = void 0;
            try {
                m = h.then;
            } catch (e) {
                this.reject_(e);
                return;
            }
            "function" == typeof m ? this.settleSameAsThenable_(m, h) : this.fulfill_(h);
        };
        f.prototype.reject_ = function (h) {
            this.settle_(2, h);
        };
        f.prototype.fulfill_ = function (h) {
            this.settle_(1, h);
        };
        f.prototype.settle_ = function (h, m) {
            if (0 != this.state_) throw Error("Cannot settle(" + h + ", " + m + "): Promise already settled in state" + this.state_);
            this.state_ = h;
            this.result_ = m;
            this.executeOnSettledCallbacks_();
        };
        f.prototype.executeOnSettledCallbacks_ = function () {
            if (null != this.onSettledCallbacks_) {
                for (var h = 0; h < this.onSettledCallbacks_.length; ++h) l.asyncExecute(this.onSettledCallbacks_[h]);
                this.onSettledCallbacks_ = null;
            }
        };
        var l = new b();
        f.prototype.settleSameAsPromise_ = function (h) {
            var m = this.createResolveAndReject_();
            h.callWhenSettled_(m.resolve, m.reject);
        };
        f.prototype.settleSameAsThenable_ = function (h, m) {
            var e = this.createResolveAndReject_();
            try {
                h.call(m, e.resolve, e.reject);
            } catch (g) {
                e.reject(g);
            }
        };
        f.prototype.then = function (h, m) {
            function e(q, p) {
                return "function" == typeof q
                    ? function (r) {
                          try {
                              g(q(r));
                          } catch (t) {
                              k(t);
                          }
                      }
                    : p;
            }
            var g,
                k,
                n = new f(function (q, p) {
                    g = q;
                    k = p;
                });
            this.callWhenSettled_(e(h, g), e(m, k));
            return n;
        };
        f.prototype.catch = function (h) {
            return this.then(void 0, h);
        };
        f.prototype.callWhenSettled_ = function (h, m) {
            function e() {
                switch (g.state_) {
                    case 1:
                        h(g.result_);
                        break;
                    case 2:
                        m(g.result_);
                        break;
                    default:
                        throw Error("Unexpected state: " + g.state_);
                }
            }
            var g = this;
            null == this.onSettledCallbacks_ ? l.asyncExecute(e) : this.onSettledCallbacks_.push(e);
        };
        f.resolve = c;
        f.reject = function (h) {
            return new f(function (m, e) {
                e(h);
            });
        };
        f.race = function (h) {
            return new f(function (m, e) {
                for (var g = $jscomp.makeIterator(h), k = g.next(); !k.done; k = g.next()) c(k.value).callWhenSettled_(m, e);
            });
        };
        f.all = function (h) {
            var m = $jscomp.makeIterator(h),
                e = m.next();
            return e.done
                ? c([])
                : new f(function (g, k) {
                      function n(r) {
                          return function (t) {
                              q[r] = t;
                              p--;
                              0 == p && g(q);
                          };
                      }
                      var q = [],
                          p = 0;
                      do q.push(void 0), p++, c(e.value).callWhenSettled_(n(q.length - 1), k), (e = m.next());
                      while (!e.done);
                  });
        };
        return f;
    },
    "es6",
    "es3"
);
var ABTOPhoneUACounter = 1,
    twoByteHigh = 65535;
function ABTOPhoneUA(a) {
    void 0 === a && (a = "ABTOPhone");
    this.sipUserAgentName = a;
    this.useAudio = !0;
    this.useVideo = !1;
    this.stunServers = [];
    this.turnServer = [];
    this.remoteVideo = [];
    this.doRecord = !1;
    this.WSPort = this.sipProxy = this.sipDomain = null;
    this.secure = !0;
    this.sipPassword = this.sipLogin = this.sipUserName = this.sipDisplayName = null;
    this.isConference = !1;
    this.isConferenceInvited = [];
    this.conferenceId = -1;
    this.peerConnection = [];
    this.token = this.connectionProvider = null;
    this.inited = !1;
    this.remoteUser = [];
    this.reconnectCounter = 0;
    this.reconnectTimer = null;
    this.counter = ABTOPhoneUACounter++;
    this.maxVideoBandwidth = 0;
    this.registerAfterInit = !1;
    this.paused = [];
    this.unInitAfterUnRegister = !1;
    this.CallsMap = new Map();
    this.regExpire = 3600;
    this.invitedState = [];
    this.jainSipInvitedReceivedRequest = [];
    this.jainSipInvitedDialog = [];
    this.jainSipInvitedTransaction = [];
    this.invitingState = [];
    this.callee = [];
    this.jainSipInvitingSentRequest = [];
    this.jainSipInvitingDialog = [];
    this.jainSipInvitingTransaction = [];
    this.localTag = [];
    this.remoteTag = [];
    this.customHeaders = [];
    this.holdState = [];
    this.holdClientTransaction = [];
    this.holdSentRequest = [];
    this.jainSipReferRequest = [];
    this.referToAdressString = [];
    this.referredByUri = [];
    this.referLastOKResponce = [];
    this.peerConnectionState = [];
    this.dtmfSender = [];
    this.remoteAudioVideoMediaStream = [];
    this.mediaRecorder = [];
    this.recordedBlobs = [];
    console.debug("ABTOPhoneUA(" + this.counter + "):ABTOPhoneUA()");
}
ABTOPhoneUA.prototype = new SipListener();
ABTOPhoneUA.prototype.constructor = ABTOPhoneUA;
ABTOPhoneUA.prototype.version = function () {
    return "20.05.2022";
};
ABTOPhoneUA.prototype.UNREGISTERED_STATE = "UNREGISTERED_STATE";
ABTOPhoneUA.prototype.REGISTERING_STATE = "REGISTERING_STATE";
ABTOPhoneUA.prototype.REGISTER_REFRESHING_STATE = "REGISTER_REFRESHING_STATE";
ABTOPhoneUA.prototype.REGISTERING_401_STATE = "REGISTERING_401_STATE";
ABTOPhoneUA.prototype.REGISTERED_STATE = "REGISTERED_STATE";
ABTOPhoneUA.prototype.UNREGISTERING_401_STATE = "UNREGISTERING_401_STATE";
ABTOPhoneUA.prototype.UNREGISTERING_STATE = "UNREGISTERING_STATE";
ABTOPhoneUA.prototype.INVITING_INITIAL_STATE = "INVITING_INITIAL_STATE";
ABTOPhoneUA.prototype.INVITING_STATE = "INVITING_STATE";
ABTOPhoneUA.prototype.INVITING_407_STATE = "INVITING_407_STATE";
ABTOPhoneUA.prototype.INVITING_ACCEPTED_STATE = "INVITING_ACCEPTED_STATE";
ABTOPhoneUA.prototype.INVITING_LOCAL_HANGINGUP_STATE = "INVITING_LOCAL_HANGINGUP_STATE";
ABTOPhoneUA.prototype.INVITING_LOCAL_HANGINGUP_407_STATE = "INVITING_LOCAL_HANGINGUP_407_STATE";
ABTOPhoneUA.prototype.INVITED_INITIAL_STATE = "INVITED_INITIAL_STATE";
ABTOPhoneUA.prototype.INVITED_RINGING_STATE = "INVITED_RINGING_STATE";
ABTOPhoneUA.prototype.INVITED_ACCEPTED_STATE = "INVITED_ACCEPTED_STATE";
ABTOPhoneUA.prototype.INVITED_LOCAL_HANGINGUP_STATE = "INVITED_LOCAL_HANGINGUP_STATE";
ABTOPhoneUA.prototype.INVITED_LOCAL_HANGINGUP_407_STATE = "INVITED_LOCAL_HANGINGUP_407_STATE";
ABTOPhoneUA.prototype.INVITED_HANGUP_STATE = "INVITED_HANGUP_STATE";
ABTOPhoneUA.prototype.INVITING_FAILED_STATE = "INVITING_FAILED_STATE";
ABTOPhoneUA.prototype.HOLD_OFF = "NO_HOLD_STATE";
ABTOPhoneUA.prototype.HOLD_BY_ME = "HOLD_BY_ME";
ABTOPhoneUA.prototype.HOLD_BY_INTERLOCUTOR = "HOLD_BY_INTERLOCUTOR";
ABTOPhoneUA.prototype.clearStunServers = function () {
    this.stunServers = [];
};
ABTOPhoneUA.prototype.addStunServer = function (a) {
    this.stunServers.push({ urls: a });
};
ABTOPhoneUA.prototype.clearTurnServer = function () {
    this.turnServer = [];
};
ABTOPhoneUA.prototype.setTurnServer = function (a, b, c) {
    this.turnServer = [{ urls: a, username: b, credential: c }];
};
ABTOPhoneUA.prototype.setRemoteMedia = function (a, b) {
    this.stopRemoteMedia(a);
    this.remoteVideo[a] = b;
    null != this.remoteVideo[a] && null != this.remoteAudioVideoMediaStream[a] && this.playVideoStream(this.remoteVideo[a], this.remoteAudioVideoMediaStream[a]);
};
ABTOPhoneUA.prototype.setRecord = function (a) {
    this.doRecord = a;
};
ABTOPhoneUA.prototype.setSipDomain = function (a) {
    this.sipDomain = a;
};
ABTOPhoneUA.prototype.setSipProxy = function (a) {
    this.sipProxy = a;
};
ABTOPhoneUA.prototype.setWSPort = function (a) {
    this.WSPort = a;
};
ABTOPhoneUA.prototype.setSecure = function (a) {
    this.secure = a;
};
ABTOPhoneUA.prototype.setSipDisplayName = function (a) {
    this.sipDisplayName = a;
};
ABTOPhoneUA.prototype.setSipUserName = function (a) {
    this.sipUserName = a;
};
ABTOPhoneUA.prototype.setSipLogin = function (a) {
    this.sipLogin = a;
};
ABTOPhoneUA.prototype.setSipPassword = function (a) {
    this.sipPassword = a;
};
ABTOPhoneUA.prototype.setMaxVideoBandwidth = function (a) {
    this.maxVideoBandwidth = a;
};
ABTOPhoneUA.prototype.setRegisterExpire = function (a) {
    this.regExpire = a;
};
ABTOPhoneUA.prototype.getIsConference = function () {
    return this.isConference;
};
ABTOPhoneUA.prototype.getToken = function () {
    return this.token;
};
ABTOPhoneUA.prototype.getIsRegistered = function () {
    return this.registeredFlag;
};
ABTOPhoneUA.prototype.getIsLocalMediaStarted = function () {
    return null != this.localAudioVideoMediaStream;
};
ABTOPhoneUA.prototype.onConnected = null;
ABTOPhoneUA.prototype.onDisconnected = null;
ABTOPhoneUA.prototype.onConnectionError = null;
ABTOPhoneUA.prototype.onRegistered = null;
ABTOPhoneUA.prototype.onUnregistered = null;
ABTOPhoneUA.prototype.onRegisterError = null;
ABTOPhoneUA.prototype.onUnregisterError = null;
ABTOPhoneUA.prototype.onReconnected = null;
ABTOPhoneUA.prototype.onRemoteMediaStarted = null;
ABTOPhoneUA.prototype.onRemoteMediaStopped = null;
ABTOPhoneUA.prototype.onLocalMediaStarted = null;
ABTOPhoneUA.prototype.onLocalMediaStartFailed = null;
ABTOPhoneUA.prototype.onLocalMediaStopped = null;
ABTOPhoneUA.prototype.onMessage = null;
ABTOPhoneUA.prototype.onInvited = null;
ABTOPhoneUA.prototype.onRinging = null;
ABTOPhoneUA.prototype.onRingingTransfer = null;
ABTOPhoneUA.prototype.onEstablished = null;
ABTOPhoneUA.prototype.onEstablishError = null;
ABTOPhoneUA.prototype.onHangUp = null;
ABTOPhoneUA.prototype.onCallCleared = null;
ABTOPhoneUA.prototype.onHold = null;
ABTOPhoneUA.prototype.onRecordReady = null;
ABTOPhoneUA.prototype.getCallIndex = function (a) {
    if (!this.CallsMap.has(a)) {
        var b = this.findFreeIndex();
        this.CallsMap.set(a, b);
        this.initSipInvitedStateMachine(b);
        this.initSipInvitingStateMachine(b);
        this.initSIPFunctionsStateMachine(b);
        this.peerConnectionState[b] = "new";
    }
    return this.CallsMap.get(a);
};
ABTOPhoneUA.prototype.callsMapGetKey = function (a) {
    var b = [].concat($jscomp.arrayFromIterable(this.CallsMap)).find(function (c) {
        c = $jscomp.makeIterator(c);
        c.next();
        c = c.next().value;
        return a === c;
    });
    return b ? b[0] : null;
};
ABTOPhoneUA.prototype.findFreeIndex = function () {
    for (var a = 0; a < Number.MAX_SAFE_INTEGER; a++) if (!this.callsMapGetKey(a)) return a;
};
ABTOPhoneUA.prototype.removeCallIndex = function (a) {
    (a = this.callsMapGetKey(a)) && this.CallsMap.delete(a);
};
ABTOPhoneUA.prototype.getActiveCallsCount = function () {
    return this.CallsMap.size;
};
ABTOPhoneUA.prototype.init = function () {
    if (this.inited) throw "ABTOPhoneUA already inited";
    var a = this.sipProxy ? this.sipProxy : this.sipDomain;
    this.secure ? ((this.sipWsUrl = "wss://" + a + ":" + this.WSPort + "/ws"), (this.transport = "WSS")) : ((this.sipWsUrl = "ws://" + a + ":" + this.WSPort + "/ws"), (this.transport = "WS"));
    this.initSipRegisterStateMachine();
    this.initSipInvitingStateMachine();
    this.initSipInvitedStateMachine();
    this.initPeerConnectionStateMachine();
    this.initSIPFunctionsStateMachine();
    this.initJainSipStack();
    this.initConferenceStateMachine();
    this.inited = !0;
};
ABTOPhoneUA.prototype.reset = function () {
    this.initSipRegisterStateMachine();
    this.initPeerConnectionStateMachine();
    this.initSIPFunctionsStateMachine();
    this.initSipInvitingStateMachine();
    this.initSipInvitedStateMachine();
    this.initConferenceStateMachine();
};
ABTOPhoneUA.prototype.reconnect = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):reconnect() timer=" + this.reconnectTimer);
    var a = this;
    null != this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(function () {
        a.reconnectCounter++;
        a.initSipRegisterStateMachine();
        a.initJainSipStack();
        clearTimeout(a.reconnectTimer);
    }, Math.floor(2e3 * Math.random()));
};
ABTOPhoneUA.prototype.recover = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):recover() invitingState:" + this.invitingState[a] + " invitedState:" + this.invitedState[a]);
    this.reconnectCounter = 0;
    if (this.invitingState[a] != this.INVITING_INITIAL_STATE || this.invitedState[a] != this.INVITED_INITIAL_STATE)
        if (this.invitingState[a] == this.INVITING_ACCEPTED_STATE || this.invitedState[a] == this.INVITED_ACCEPTED_STATE) {
            var b = this.remoteUser[a].toString();
            this.initSIPFunctionsStateMachine(a);
            this.initSipInvitingStateMachine(a);
            this.initSipInvitedStateMachine(a);
            this.callee[a] = b;
            this.sendInviteSipRequest(a, null);
        } else {
            if ((this.invitingState[a] == this.INVITING_STATE || this.invitingState[a] == this.INVITING_407_STATE) && this.inited && this.onEstablishError)
                try {
                    this.onEstablishError(a, 500, "Disconnected");
                } catch (c) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onEstablishError(): caught exception:" + c);
                }
            this.initPeerConnectionStateMachine(a);
            this.initSIPFunctionsStateMachine(a);
            this.initSipInvitingStateMachine(a);
            this.initSipInvitedStateMachine(a);
        }
};
ABTOPhoneUA.prototype.hangupAll = function () {
    for (var a = $jscomp.makeIterator(this.CallsMap.values()), b = a.next(); !b.done; b = a.next()) {
        b = b.value;
        try {
            if (!this.bye(b)) break;
        } catch (c) {}
    }
};
ABTOPhoneUA.prototype.close = function () {
    this.hangupAll();
    try {
        this.unRegister();
    } catch (a) {}
    clearTimeout(this.reconnectTimer);
    this.reconnectCounter = 0;
    this.registeredFlag ? (this.unInitAfterUnRegister = !0) : this.uninit();
};
ABTOPhoneUA.prototype.uninit = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):uninit()");
    try {
        this.reset();
    } catch (a) {}
    try {
        this.closeJainSipStack();
    } catch (a) {}
    this.inited = !1;
};
ABTOPhoneUA.prototype.initSipRegisterStateMachine = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):initSipRegisterStateMachine()");
    this.refreshRegisterTimer && (console.debug("ABTOPhoneUA(" + this.counter + "):initSipRegisterStateMachine() clearing refreshRegisterTimer timeout"), clearTimeout(this.refreshRegisterTimer));
    this.registerState = this.UNREGISTERED_STATE;
    this.refreshRegisterTimer = null;
    this.refreshRegisterFlag = this.registerAuthenticatedFlag = !1;
    this.jainSipRegisterSentRequest = null;
    this.unregisterPendingFlag = this.registeredFlag = !1;
};
ABTOPhoneUA.prototype.initConferenceStateMachine = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):initConferenceStateMachine()");
    this.isConference = !1;
    this.conferenceId = -1;
    this.isConferenceInvited = [];
};
ABTOPhoneUA.prototype.startLocalMedia = function (a, b, c) {
    var d = this;
    return new Promise(function (f, l) {
        function h(e) {
            console.log("User has granted access to local media.");
            d.localAudioVideoMediaStream = e;
            null != d.localVideo && (d.localVideo.srcObject = d.localAudioVideoMediaStream);
            if (null != d.localAudioVideoMediaStream && d.onLocalMediaStarted) d.onLocalMediaStarted(e);
            f();
        }
        function m(e) {
            console.error("Failed to get access to local media. Error code == " + e.code + ", name == " + e.name + ", message == " + e.message + ".");
            if ("NotAllowedError" !== e.name && "SecurityError" !== e.name && d.useVideo)
                console.log("Trying to get access to local media once more. This time to a microphone only."),
                    (d.useVideo = !1),
                    navigator.mediaDevices
                        .getUserMedia({ audio: d.useAudio, video: d.useVideo })
                        .then(function (g) {
                            h(g);
                        })
                        .catch(function (g) {
                            m(g);
                        });
            else {
                if (d.onLocalMediaStartFailed) d.onLocalMediaStartFailed(e);
                l();
            }
        }
        d.stopLocalMedia();
        d.localVideo = a;
        b ? ((d.useAudio = !(null === b.audio || !1 === b.audio)), (d.useVideo = !(null === b.video || !1 === b.video))) : ((d.useAudio = !0), (d.useVideo = null !== d.localVideo), (b = { audio: d.useAudio, video: d.useVideo }));
        c
            ? h(c)
            : navigator.mediaDevices
                  .getUserMedia(b)
                  .then(function (e) {
                      h(e);
                  })
                  .catch(function (e) {
                      m(e);
                  });
    });
};
ABTOPhoneUA.prototype.stopLocalMedia = function () {
    this.localVideo && (this.localVideo.pause(), (this.localVideo = this.localVideo.srcObject = null));
    if (this.localAudioVideoMediaStream) {
        this.localAudioVideoMediaStream.getTracks().forEach(function (a) {
            a.stop();
        });
        if (this.onLocalMediaStopped) this.onLocalMediaStopped();
        this.localAudioVideoMediaStream = null;
    }
};
ABTOPhoneUA.prototype.stopRemoteMedia = function (a) {
    null != this.remoteVideo[a] && (this.remoteVideo[a].pause(), (this.remoteVideo[a].srcObject = null), (this.remoteVideo[a] = null));
};
ABTOPhoneUA.prototype.initSipInvitingStateMachine = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):initSipInvitingStateMachine()");
    if (1 <= arguments.length) {
        var a = arguments[0];
        this.invitingState[a] = this.INVITING_INITIAL_STATE;
        this.callee[a] = null;
        this.jainSipInvitingSentRequest[a] = null;
        this.jainSipInvitingDialog[a] = null;
        this.jainSipInvitingTransaction[a] = null;
        this.localTag[a] = null;
        this.remoteTag[a] = null;
        this.customHeaders[a] = null;
    } else
        (this.invitingState = []),
            (this.callee = []),
            (this.jainSipInvitingSentRequest = []),
            (this.jainSipInvitingDialog = []),
            (this.jainSipInvitingTransaction = []),
            (this.localTag = []),
            (this.remoteTag = []),
            (this.customHeaders = []);
};
ABTOPhoneUA.prototype.initSipInvitedStateMachine = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):initSipInvitedStateMachine()");
    if (1 <= arguments.length) {
        var a = arguments[0];
        this.invitedState[a] = this.INVITED_INITIAL_STATE;
        this.jainSipInvitedReceivedRequest[a] = null;
        this.jainSipInvitedDialog[a] = null;
        this.jainSipInvitedTransaction[a] = null;
    } else (this.invitedState = []), (this.jainSipInvitedReceivedRequest = []), (this.jainSipInvitedDialog = []), (this.jainSipInvitedTransaction = []);
};
ABTOPhoneUA.prototype.initJainSipStack = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):initJainSipStack()");
    this.sipFactory = new SipFactory();
    this.sipStack = this.sipFactory.createSipStack(this.sipUserAgentName, this.WSPort, this.transport);
    this.listeningPoint = this.sipStack.createListeningPoint(this.sipWsUrl);
    this.sipProvider = this.sipStack.createSipProvider(this.listeningPoint);
    this.sipProvider.addSipListener(this);
    this.headerFactory = this.sipFactory.createHeaderFactory();
    this.addressFactory = this.sipFactory.createAddressFactory();
    this.messageFactory = this.sipFactory.createMessageFactory(this.listeningPoint);
    this.sipStack.start();
};
ABTOPhoneUA.prototype.closeJainSipStack = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):closeJainSipStack()");
    this.sipStack.stop();
    this.messageFactory = this.addressFactory = this.headerFactory = this.sipProvider = this.listeningPoint = this.sipStack = this.sipFactory = null;
};
ABTOPhoneUA.prototype.initPeerConnectionStateMachine = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):initPeerConnectionStateMachine()");
    if (1 <= arguments.length) {
        var a = arguments[0];
        this.closePeerConnection(a);
        this.recordedBlobs[a] = null;
    } else {
        var b = $jscomp.makeIterator(this.CallsMap.values());
        for (a = b.next(); !a.done; a = b.next()) {
            a = a.value;
            try {
                this.closePeerConnection(a);
            } catch (c) {}
        }
        this.CallsMap.clear();
        this.remoteUser = [];
        this.peerConnection = [];
        this.peerConnectionState = [];
        this.dtmfSender = [];
        this.remoteAudioVideoMediaStream = [];
        this.mediaRecorder = [];
        this.recordedBlobs = [];
    }
};
ABTOPhoneUA.prototype.initSIPFunctionsStateMachine = function () {
    if (1 <= arguments.length) {
        var a = arguments[0];
        this.holdState[a] = this.HOLD_OFF;
        this.holdClientTransaction[a] = null;
        this.holdSentRequest[a] = null;
        this.paused[a] = !1;
        this.jainSipReferRequest[a] = null;
        this.referToAdressString[a] = null;
        this.referredByUri[a] = null;
        this.referLastOKResponce[a] = null;
    } else
        (this.holdState = []), (this.holdClientTransaction = []), (this.holdSentRequest = []), (this.paused = []), (this.jainSipReferRequest = []), (this.referToAdressString = []), (this.referredByUri = []), (this.referLastOKResponce = []);
};
ABTOPhoneUA.prototype.fireOnHoldListener = function (a) {
    if (this.onHold)
        try {
            this.onHold(a, this.holdState[a] != this.HOLD_OFF, this.holdState[a] == this.HOLD_BY_ME);
        } catch (b) {
            console.error("ABTOPhoneUA(" + this.counter + "):onHold(): caught exception:" + b);
        }
};
ABTOPhoneUA.prototype.inviteReferToAddress = function (a) {
    if (null != this.referToAdressString[a]) {
        var b = this.referToAdressString[a];
        this.referToAdressString[a] = null;
        a = this.invite(b);
        if (0 <= a && this.onRingingTransfer) this.onRingingTransfer(a, b);
    }
};
ABTOPhoneUA.prototype.processDialogTerminated = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):processDialogTerminated()");
};
ABTOPhoneUA.prototype.processIOException = function (a) {
    console.error("ABTOPhoneUA(" + this.counter + "):processIOException()");
};
ABTOPhoneUA.prototype.processTimeout = function (a) {
    1 < arguments.length && this.hangupAll();
};
ABTOPhoneUA.prototype.processTransactionTerminated = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):processTransactionTerminated()");
};
ABTOPhoneUA.prototype.processDisconnected = function () {
    console.error("ABTOPhoneUA(" + this.counter + "):processDisconnected():inited=" + this.inited);
    if (this.inited)
        if (3 > this.reconnectCounter) this.reconnect();
        else {
            if (this.onDisconnected)
                try {
                    this.onDisconnected();
                } catch (a) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onDisconnected(): caught exception:" + a);
                }
            this.reset();
        }
};
ABTOPhoneUA.prototype.processConnectionError = function (a) {
    console.error("ABTOPhoneUA(" + this.counter + "):processConnectionError():error=" + a);
    if (3 > this.reconnectCounter) this.reconnect();
    else if (this.inited && this.onConnectionError)
        try {
            this.onConnectionError(a);
        } catch (b) {
            console.error("ABTOPhoneUA(" + this.counter + "):onConnectionError(): caught exception:" + b);
        }
};
ABTOPhoneUA.prototype.processConnected = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):processConnected()");
    if (0 < this.reconnectCounter) this.register();
    else {
        if (this.inited && this.onConnected)
            try {
                this.onConnected();
            } catch (a) {
                console.error("ABTOPhoneUA(" + this.counter + "):onConnected(): caught exception:" + a);
            }
        this.registerAfterInit && (this.register(), (this.registerAfterInit = !1));
    }
};
ABTOPhoneUA.prototype.determineInterlocuterFromMessage = function (a) {
    var b = a.getHeader("From").getAddress().getURI().encodeWithoutScheme();
    a = a.getHeader("To").getAddress().getURI().encodeWithoutScheme();
    for (var c = 0; c < this.remoteUser.length; c++) {
        var d = this.getInterlocutorsAddress(c);
        if (d == b || d == a) return this.getCallIndex(d);
    }
    return this.getCallIndex(b);
};
ABTOPhoneUA.prototype.processResponse = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):processResponse()");
    var b = a.getResponse();
    if ("REGISTER" == b.getCSeq().getMethod()) this.handleStateMachineRegisterResponseEvent(a);
    else if ("MESSAGE" == b.getCSeq().getMethod()) this.handleStateMachineMessageResponseEvent(a);
    else {
        var c = this.determineInterlocuterFromMessage(b);
        "REFER" == b.getCSeq().getMethod()
            ? this.handleStateMachineReferResponseEvent(c, a)
            : "NOTIFY" == b.getCSeq().getMethod()
            ? this.handleStateMachineNotifyResponseEvent(c, a)
            : "INFO" == b.getCSeq().getMethod()
            ? this.handleStateMachineInfoResponseEvent(c, a)
            : this.invitingState[c] != this.INVITING_INITIAL_STATE
            ? this.handleStateMachineInvitingResponseEvent(c, a)
            : this.invitedState[c] != this.INVITED_INITIAL_STATE
            ? this.handleStateMachineInvitedResponseEvent(c, a)
            : console.debug("ABTOPhoneUA(" + this.counter + "):processResponse(): response ignored");
    }
};
ABTOPhoneUA.prototype.isHoldRequest = function (a) {
    return 0 <= a.indexOf("a=sendonly") || 0 <= a.indexOf("c=IN IP4 0.0.0.0") || 0 <= a.indexOf("c=IN IP6 ::");
};
ABTOPhoneUA.prototype.processRequest = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):processRequest()");
    var b = a.getRequest(),
        c = b.getMethod();
    console.log(b, c);
    if ("INVITE" == c) {
        var d = this.determineInterlocuterFromMessage(b);
        this.invitedState[d] == this.INVITED_ACCEPTED_STATE || this.invitingState[d] == this.INVITING_ACCEPTED_STATE
            ? (b = b.getContent()) && this.isHoldRequest(b)
                ? this.processHoldRequest(d, a)
                : this.holdState[d] === this.HOLD_BY_INTERLOCUTOR
                ? this.processHoldRequest(d, a)
                : this.processUpdateInviteRequest(d, a)
            : (console.log("LOG: handle incoming call"), this.handleStateMachineInvitedRequestEvent(d, a));
    } else if ("BYE" == c || "ACK" == c)
        (d = this.determineInterlocuterFromMessage(b)),
            "BYE" == c && 1 >= this.getActiveCallsCount() && this.initConferenceStateMachine(),
            this.invitingState[d] != this.INVITING_INITIAL_STATE
                ? this.handleStateMachineInvitingRequestEvent(d, a)
                : this.invitedState[d] != this.INVITED_INITIAL_STATE
                ? this.handleStateMachineInvitedRequestEvent(d, a)
                : console.warn("SimpleWebRtcSipPhone:processRequest(): request ignored");
    else if ("CANCEL" == c) (d = this.determineInterlocuterFromMessage(b)), 1 >= this.getActiveCallsCount() && this.initConferenceStateMachine(), this.handleStateMachineInvitedRequestEvent(d, a);
    else if ("UPDATE" == c) (d = this.determineInterlocuterFromMessage(b)), this.handleStateMachineUpdateRequestEvent(d, a);
    else if ("INFO" == c) (d = this.determineInterlocuterFromMessage(b)), this.handleStateMachineInfoRequestEvent(d, a);
    else if ("REFER" == c) {
        d = this.determineInterlocuterFromMessage(b);
        try {
            var f = b.createResponse(202, "Accepted");
            f.addHeader(this.jainSipContactHeader);
            a.getServerTransaction().sendResponse(f);
        } catch (h) {
            console.error("ABTOPhoneUA(" + this.counter + "):sending 202 refer : caught exception:" + exception);
        }
        this.jainSipReferRequest[d] = b;
        this.sendNotifyReferRequest(d, a);
    } else if ("NOTIFY" == c) {
        d = this.determineInterlocuterFromMessage(b);
        try {
            var l = b.createResponse(200, "OK");
            l.addHeader(this.jainSipContactHeader);
            a.getServerTransaction().sendResponse(l);
        } catch (h) {
            console.error("ABTOPhoneUA(" + this.counter + "):send 200 OK Notify : caught exception:" + exception);
        }
        this.processNotifyRequest(d, b);
    } else if ("MESSAGE" == c) {
        try {
            (l = b.createResponse(200, "OK")), a.getServerTransaction().sendResponse(l);
        } catch (h) {
            console.error("ABTOPhoneUA(" + this.counter + "):send 200 OK Message : caught exception:" + exception);
        }
        if (this.onMessage)
            try {
                this.onMessage(b.getFromHeader().getAddress().encodeWithoutScheme(), b.getContent());
            } catch (h) {
                console.error("ABTOPhoneUA(" + this.counter + "):onMessage(): caught exception:" + h);
            }
    } else if ("OPTIONS" == c)
        try {
            (l = b.createResponse(200, "OK")), l.addHeader(this.jainSipContactHeader), l.addHeader(this.jainSipUserAgentHeader), a.getServerTransaction().sendResponse(l);
        } catch (h) {
            console.error("ABTOPhoneUA(" + this.counter + "):sending 200 OK OPTIONS: caught exception:" + exception);
        }
    else console.warn("SimpleWebRtcSipPhone:processResponse(): request ignored");
};
ABTOPhoneUA.prototype.processHoldRequest = function (a, b) {
    console.log("hold request");
    var c = this.peerConnection[a].localDescription.sdp;
    this.maxVideoBandwidth && (c = c.replace(/(m=video.*\r\nc=IN.*\r\n)/m, "$1b=AS:" + this.maxVideoBandwidth + "\r\n"));
    this.paused[a] || (c = c.replace(/a=sendrecv\r\n/g, "a=recvonly\r\n"));
    var d = b.getRequest().createResponse(200, "OK");
    d.addHeader(this.jainSipContactHeader);
    d.addHeader(this.jainSipRegisterSentRequest.getHeader("User-Agent"));
    d.setMessageContent("application", "sdp", c);
    b.getServerTransaction().sendResponse(d);
    this.toggleMediaStream(a);
    this.holdState[a] = this.paused[a] ? this.HOLD_BY_INTERLOCUTOR : this.HOLD_OFF;
    this.fireOnHoldListener(a);
};
ABTOPhoneUA.prototype.processUpdateInviteRequest = function (a, b) {
    var c = b.getRequest().createResponse(200, "OK");
    c.addHeader(this.jainSipContactHeader);
    c.addHeader(this.jainSipRegisterSentRequest.getHeader("User-Agent"));
    c.setMessageContent("application", "sdp", this.peerConnection[a].localDescription.sdp);
    b.getServerTransaction().sendResponse(c);
};
ABTOPhoneUA.prototype.processNotifyRequest = function (a, b) {
    "refer" == b.getHeader(SIPRequest.prototype.EventHeader).getEventType().toLowerCase() && (b = b.getHeader("Subscription-State")) && b.value && "active" == b.value.toLowerCase().substr(0, 6) && this.bye(a);
};
ABTOPhoneUA.prototype.sendNotifyReferRequest = function (a, b) {
    try {
        var c = b.getRequest().getFromHeader(),
            d = b.getRequest().getToHeader(),
            f = this.getInterlocutorsAddress(a),
            l = this.addressFactory.createSipURI_user_host(null, f),
            h = this.headerFactory.createCSeqHeader(2, "NOTIFY"),
            m = b.getRequest().getCallIdHeader(),
            e = this.headerFactory.createMaxForwardsHeader(70),
            g = this.headerFactory.createToHeader(c.getAddress(), c.getTag()),
            k = this.headerFactory.createFromHeader(d.getAddress(), d.getTag()),
            n = this.listeningPoint.getViaHeader(),
            q = this.headerFactory.createContentTypeHeader("message", "sipfrag"),
            p = this.messageFactory.createRequest(l, "NOTIFY", m, h, k, g, n, e, q, "SIP/2.0 100 Trying"),
            r = this.headerFactory.createEventHeader("refer");
        this.messageFactory.addHeader(p, r);
        this.messageFactory.addHeader(p, this.jainSipContactHeader);
        this.messageFactory.addHeader(p, this.jainSipUserAgentHeader);
        p.addHeader("Subscription-State: active;expires=60");
        var t = this.sipProvider.getNewClientTransaction(p);
        p.setTransaction(t);
        b.getServerTransaction().getDialog().sendRequest(t);
    } catch (u) {
        console.error("ABTOPhoneUA(" + this.counter + "): send NOTIFY on REFER: caught exception:" + u);
    }
};
ABTOPhoneUA.prototype.sendNotifyReferDoneRequest = function (a, b) {
    try {
        var c = this.referredByUri[a].encodeWithoutScheme(),
            d = this.addressFactory.createSipURI_user_host(null, c),
            f = this.addressFactory.createAddress_name_uri(null, d),
            l = this.headerFactory.createToHeader(f, null),
            h = this.addressFactory.createSipURI_user_host(null, this.sipUserName + "@" + this.sipDomain),
            m = this.addressFactory.createAddress_name_uri(this.sipDisplayName, h),
            e = new Date().getTime(),
            g = this.headerFactory.createFromHeader(m, e),
            k = this.headerFactory.createCSeqHeader(3, "NOTIFY"),
            n = this.referLastOKResponce[a].getCallIdHeader(),
            q = this.headerFactory.createMaxForwardsHeader(70),
            p = this.listeningPoint.getViaHeader(),
            r = this.headerFactory.createContentTypeHeader("message", "sipfrag"),
            t = b.encode(),
            u = this.messageFactory.createRequest(this.referredByUri[a], "NOTIFY", n, k, g, l, p, q, r, t),
            w = this.headerFactory.createEventHeader("refer");
        this.messageFactory.addHeader(u, w);
        this.messageFactory.addHeader(u, this.jainSipContactHeader);
        this.messageFactory.addHeader(u, this.jainSipUserAgentHeader);
        u.addHeader("Subscription-State: terminated;reason=noresource");
        var x = this.sipProvider.getNewClientTransaction(u);
        u.setTransaction(x);
        x.sendRequest();
    } catch (v) {
        console.error("ABTOPhoneUA(" + this.counter + "): send NOTIFY on call transfer done: caught exception:" + v);
    }
};
ABTOPhoneUA.prototype.initAndRegister = function () {
    this.inited ? this.register() : ((this.registerAfterInit = !0), this.init());
};
ABTOPhoneUA.prototype.register = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): sipDomain=" + this.sipDomain);
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): sipProxy=" + this.sipProxy);
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): WSPort=" + this.WSPort);
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): sipDisplayName=" + this.sipDisplayName);
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): sipUserName=" + this.sipUserName);
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): sipLogin=" + this.sipLogin);
    console.debug("ABTOPhoneUA(" + this.counter + "):register(): sipPassword=" + this.sipPassword);
    if (this.registerState == this.UNREGISTERED_STATE)
        try {
            this.jainSipContactHeader = this.listeningPoint.createContactHeader(this.sipUserName);
            0 < this.reconnectCounter && this.jainSipContactHeader.setQuotedParameter("reconnect", this.token);
            this.jainSipUserAgentHeader = this.headerFactory.createUserAgentHeader(this.sipStack.getUserAgent());
            var a = this.sipUserName + "@" + this.sipDomain,
                b = this.headerFactory.createCSeqHeader(0, "REGISTER"),
                c = this.headerFactory.createCallIdHeader(),
                d = this.headerFactory.createExpiresHeader(this.regExpire),
                f = this.headerFactory.createMaxForwardsHeader(70),
                l = this.addressFactory.createSipURI_user_host(null, this.sipDomain),
                h = this.headerFactory.createHeaders("Allow: INVITE,UPDATE,ACK,CANCEL,BYE,NOTIFY,OPTIONS,MESSAGE,REFER"),
                m = this.addressFactory.createSipURI_user_host(null, a),
                e = this.addressFactory.createAddress_name_uri(null, m),
                g = new Date().getTime(),
                k = this.headerFactory.createFromHeader(e, g),
                n = this.headerFactory.createToHeader(e, null),
                q = this.listeningPoint.getViaHeader(),
                p = this.messageFactory.createRequest(l, "REGISTER", c, b, k, n, q, f);
            this.messageFactory.addHeader(p, d);
            this.messageFactory.addHeader(p, this.jainSipUserAgentHeader);
            this.messageFactory.addHeader(p, h);
            this.messageFactory.addHeader(p, this.jainSipContactHeader);
            this.jainSipRegisterSentRequest = p;
            var r = this.sipProvider.getNewClientTransaction(p);
            p.setTransaction(r);
            r.sendRequest();
            this.registerState = this.REGISTERING_STATE;
        } catch (t) {
            return this.initSipRegisterStateMachine(), console.error("ABTOPhoneUA(" + this.counter + "):register(): caught exception:" + t), !1;
        }
    else return console.error("ABTOPhoneUA(" + this.counter + "):register(): bad state, action register unauthorized"), !1;
    return !0;
};
ABTOPhoneUA.prototype.keepAliveRegister = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):keepAliveRegister() token:" + this.token);
    if (this.registerState == this.REGISTERED_STATE) {
        this.refreshRegisterTimer = null;
        this.registerState = this.REGISTER_REFRESHING_STATE;
        null != this.token && this.jainSipRegisterSentRequest.getContactHeader().setQuotedParameter("token", this.token);
        this.jainSipRegisterSentRequest = this.setNewViaHeader(this.jainSipRegisterSentRequest);
        var a = this.sipProvider.getNewClientTransaction(this.jainSipRegisterSentRequest);
        this.jainSipRegisterSentRequest.setTransaction(a);
        a.sendRequest();
    } else throw "ABTOPhoneUA(" + this.counter + "):keepAliveRegister(): bad state, action keep alive register unauthorized";
};
ABTOPhoneUA.prototype.unRegister = function () {
    console.debug("ABTOPhoneUA(" + this.counter + "):unRegister()");
    if (this.registerState == this.REGISTERED_STATE) {
        this.registerState = this.UNREGISTERING_STATE;
        null != this.refreshRegisterTimer && (console.debug("ABTOPhoneUA(" + this.counter + "):unRegister() clearing refreshRegisterTimer timeout"), clearTimeout(this.refreshRegisterTimer));
        this.jainSipRegisterSentRequest.getExpires().setExpires(0);
        this.jainSipRegisterSentRequest = this.setNewViaHeader(this.jainSipRegisterSentRequest);
        var a = this.sipProvider.getNewClientTransaction(this.jainSipRegisterSentRequest);
        this.jainSipRegisterSentRequest.setTransaction(a);
        a.sendRequest();
    } else this.registerState == this.UNREGISTERED_STATE ? console.warn("ABTOPhoneUA(" + this.counter + "):unRegister(): bad state, action keep alive register unauthorized") : (this.unregisterPendingFlag = !0);
};
ABTOPhoneUA.prototype.setNewViaHeader = function (a) {
    if (a instanceof SIPRequest) {
        var b = new SIPRequest();
        b.setMethod(a.getMethod());
        b.setRequestURI(a.getRequestURI());
    } else b = new SIPResponse();
    for (var c = a.getHeaders(), d = 0; d < c.length; d++) b.addHeader(c[d]);
    b.setCallId(a.getCallId());
    b.setVia(this.listeningPoint.getViaHeader());
    b.setFrom(a.getFrom());
    b.setTo(a.getTo());
    b.setMaxForwards(a.getMaxForwards());
    null != a.getContent() && b.setContent(a.getContent(), a.getContentTypeHeader());
    return b;
};
ABTOPhoneUA.prototype.addAuthHeader = function (a, b) {
    a.removeHeader(Authorization.prototype.NAME);
    a.removeHeader(ProxyAuthorization.prototype.PROXY_AUTHORIZATION);
    b = this.headerFactory.createAuthorizationHeader(b, a, this.sipPassword, this.sipLogin);
    a = this.setNewViaHeader(a);
    return this.messageFactory.addHeader(a, b);
};
ABTOPhoneUA.prototype.authenticateResponseEvent = function (a) {
    var b = a.getOriginalTransaction(),
        c = b.getDialog();
    b = b.getRequest();
    b = this.addAuthHeader(b, a.getResponse());
    a = this.sipProvider.getNewClientTransaction(b);
    b.setTransaction(a);
    c ? c.sendRequest(a) : a.sendRequest();
};
ABTOPhoneUA.prototype.handleStateMachineInfoResponseEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInfoResponseEvent()");
    a = b.getResponse();
    a = parseInt(a.getStatusCode());
    (401 != a && 407 != a) || this.authenticateResponseEvent(b);
};
ABTOPhoneUA.prototype.handleStateMachineReferResponseEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineReferResponseEvent()");
    a = b.getResponse();
    a = parseInt(a.getStatusCode());
    (401 != a && 407 != a) || this.authenticateResponseEvent(b);
};
ABTOPhoneUA.prototype.handleStateMachineNotifyResponseEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineNotifyResponseEvent()");
    var c = b.getResponse(),
        d = parseInt(c.getStatusCode());
    401 == d || 407 == d
        ? this.authenticateResponseEvent(b)
        : 200 == d &&
          "refer" == b.getOriginalTransaction().getRequest().getHeader(EventHeader.prototype.NAME).getEventType() &&
          ((b = this.jainSipReferRequest[a].getHeader(ReferTo.prototype.NAME).getAddress()), (this.referToAdressString[a] = b.encodeWithoutScheme()), (this.referredByUri[a] = this.remoteUser[a]), (this.referLastOKResponce[a] = c));
};
ABTOPhoneUA.prototype.handleStateMachineMessageResponseEvent = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineMessageResponseEvent()");
    var b = a.getResponse();
    b = parseInt(b.getStatusCode());
    (401 != b && 407 != b) || this.authenticateResponseEvent(a);
};
ABTOPhoneUA.prototype.handleStateMachineRegisterResponseEvent = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): this.registerState=" + this.registerState);
    a = a.getResponse();
    var b = parseInt(a.getStatusCode());
    if (this.registerState == this.UNREGISTERED_STATE) console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): bad state, SIP response ignored");
    else if (this.registerState == this.REGISTERING_STATE || this.registerState == this.REGISTER_REFRESHING_STATE || this.registerState == this.REGISTERING_401_STATE)
        if (200 > b) console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): 1XX response ignored");
        else if ((401 != b && 407 != b) || this.registerState == this.REGISTERING_401_STATE)
            if (200 == b) {
                this.registerState = this.REGISTERED_STATE;
                if (!this.registeredFlag) {
                    this.registeredFlag = !0;
                    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): this.registeredFlag=true");
                    if ((a = a.getContactHeader())) (this.token = a.getParameterValue("token")), console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): got token:" + this.token);
                    if (0 < this.reconnectCounter) {
                        if (this.onReconnected)
                            try {
                                this.onReconnected();
                            } catch (d) {
                                console.error("ABTOPhoneUA(" + this.counter + "):onReconnected(): caught exception:" + d);
                            }
                        this.recover();
                    } else if (this.inited && this.onRegistered)
                        try {
                            this.onRegistered();
                        } catch (d) {
                            console.error("ABTOPhoneUA(" + this.counter + "):onRegistered(): caught exception:" + d);
                        }
                }
                var c = this;
                console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent() schedule keepAliveRegister to trigger in half of registration expiration timeout");
                this.refreshRegisterTimer = setTimeout(function () {
                    c.keepAliveRegister();
                }, (1e3 * this.regExpire) / 2);
                this.unregisterPendingFlag && ((this.unregisterPendingFlag = !1), this.unRegister());
            } else {
                console.error("Registration Failed:" + a.getStatusCode() + "  " + a.getStatusLine().getReasonPhrase());
                if (this.inited && this.onRegisterError)
                    try {
                        this.onRegisterError(a.getStatusCode(), a.getStatusLine().getReasonPhrase());
                    } catch (d) {
                        console.error("ABTOPhoneUA(" + this.counter + "):onRegisterError(): caught exception:" + d);
                    }
                this.initSipRegisterStateMachine();
            }
        else
            (this.registerState = this.REGISTERING_401_STATE),
                (this.jainSipRegisterSentRequest = this.addAuthHeader(this.jainSipRegisterSentRequest, a)),
                (a = this.sipProvider.getNewClientTransaction(this.jainSipRegisterSentRequest)),
                this.jainSipRegisterSentRequest.setTransaction(a),
                a.sendRequest();
    else if (this.registerState == this.REGISTERED_STATE) console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): bad state, SIP response ignored");
    else if (this.registerState == this.UNREGISTERING_STATE)
        if (200 > b) console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): 1XX response ignored");
        else if (401 == b)
            (this.registerState = this.UNREGISTERING_401_STATE),
                (this.jainSipRegisterSentRequest = this.addAuthHeader(this.jainSipRegisterSentRequest, a)),
                (a = this.sipProvider.getNewClientTransaction(this.jainSipRegisterSentRequest)),
                this.jainSipRegisterSentRequest.setTransaction(a),
                a.sendRequest();
        else if (200 == b) {
            if (((this.registerState = this.UNREGISTERED_STATE), this.registeredFlag)) {
                console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): this.registeredFlag=false");
                this.registeredFlag = !1;
                if (this.inited && this.onUnregistered)
                    try {
                        this.onUnregistered();
                    } catch (d) {
                        console.error("ABTOPhoneUA(" + this.counter + "):onUnregistered(): caught exception:" + d);
                    }
                this.unInitAfterUnRegister && (this.uninit(), (this.unInitAfterUnRegister = !1));
            }
        } else {
            console.error("UnRegistration Failed:" + a.getStatusCode() + "  " + a.getStatusLine().getReasonPhrase());
            if (this.inited && this.onUnregisterError)
                try {
                    this.onUnregisterError(a.getStatusCode(), a.getStatusLine().getReasonPhrase());
                } catch (d) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onUnregisterError(): caught exception:" + d);
                }
            this.initSipRegisterStateMachine();
        }
    else if (this.registerState == this.UNREGISTERING_401_STATE)
        if (200 > b) console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): 1XX response ignored");
        else if (200 == b) {
            if (((this.registerState = this.UNREGISTERED_STATE), this.registeredFlag)) {
                console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): this.registeredFlag=false");
                this.registeredFlag = !1;
                if (this.inited && this.onUnregistered)
                    try {
                        this.onUnregistered();
                    } catch (d) {
                        console.error("ABTOPhoneUA(" + this.counter + "):onUnregistered(): caught exception:" + d);
                    }
                this.unInitAfterUnRegister && (this.uninit(), (this.unInitAfterUnRegister = !1));
            }
        } else {
            console.error("UnRegistration Failed:" + a.getStatusCode() + "  " + a.getStatusLine().getReasonPhrase());
            if (this.inited && this.onUnregisterError)
                try {
                    this.onUnregisterError(a.getStatusCode(), a.getStatusLine().getReasonPhrase());
                } catch (d) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onUnregisterError(): caught exception:" + d);
                }
            this.initSipRegisterStateMachine();
        }
    else console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineRegisterResponseEvent(): bad state, SIP response ignored");
};
ABTOPhoneUA.prototype.call = function (a, b, c) {
    return a ? (b && ((this.isConference = !0), 0 > this.conferenceId && (this.conferenceId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))), (a = this.invite(a, c)), this.isConference && (this.isConferenceInvited[a] = !0), a) : -1;
};
ABTOPhoneUA.prototype.conference_sendContacts = function (a) {
    if (!(2 > this.getActiveCallsCount())) {
        for (var b = "", c = 0; c < this.remoteUser.length; c++)
            if (c !== a) {
                var d = this.getInterlocutorsAddress(c);
                d && (b += '{"uri": "' + d + '" },');
            }
        c = '{"resource_lists": {"list": [' + b.slice(0, -1) + "]}}";
        b = this.jainSipInvitingDialog[a].createRequest("INFO");
        this.messageFactory.addHeader(b, this.jainSipUserAgentHeader);
        d = this.headerFactory.createHeader("X-Conference-ID", this.conferenceId);
        this.messageFactory.addHeader(b, d);
        this.messageFactory.addHeader(b, this.jainSipContactHeader);
        d = this.headerFactory.createContentTypeHeader("application", "resource-lists+json");
        b.setContent(c, d);
        c = this.sipProvider.getNewClientTransaction(b);
        b.setTransaction(c);
        this.jainSipInvitingDialog[a].sendRequest(c);
    }
};
ABTOPhoneUA.prototype.conference_processContacts = function (a) {
    a = JSON.parse(a).resource_lists.list;
    for (var b in a) a.hasOwnProperty(b) && this.invite(a[b].uri, null, !1);
};
ABTOPhoneUA.prototype.invite = function (a, b) {
    var c = this.getCallIndex(a);
    console.debug("ABTOPhoneUA(" + this.counter + "):invite():to: " + a);
    if (this.invitingState[c] && this.invitingState[c] != this.INVITING_INITIAL_STATE) return console.error("ABTOPhoneUA(" + this.counter + "):call(): bad state, action call unauthorized"), -1;
    try {
        var d = { offerToReceiveAudio: this.useAudio, offerToReceiveVideo: this.useVideo };
        this.callee[c] = a;
        this.customHeaders[c] = b;
        console.log("this.callee: ", this.callee[c]);
        this.createPeerConnection(c);
        null != this.localAudioVideoMediaStream && (this.peerConnection[c].addStream(this.localAudioVideoMediaStream, null), this.getDTMFSender(c));
        var f = this;
        this.peerConnection[c].createOffer(
            function (l) {
                f.onPeerConnectionCreateOfferSuccessCallback(c, l);
            },
            function (l) {
                f.onPeerConnectionCreateOfferErrorCallback(c, l);
            },
            d
        );
    } catch (l) {
        return console.error("ABTOPhoneUA(" + this.counter + "):call(): caught exception:" + l), -1;
    }
    return c;
};
ABTOPhoneUA.prototype.sendInviteSipRequest = function (a, b, c) {
    console.debug("ABTOPhoneUA(" + this.counter + "):sendInviteSipRequest()");
    try {
        var d = this.sipUserName + "@" + this.sipDomain,
            f = this.callee[a];
        console.debug("ABTOPhoneUA(" + this.counter + "):sendInviteSipRequest(from:" + d + ",to:" + f + ")");
        var l = new Date(),
            h = this.headerFactory.createCSeqHeader(0, "INVITE"),
            m = this.headerFactory.createCallIdHeader(),
            e = this.headerFactory.createMaxForwardsHeader(70),
            g = this.addressFactory.createSipURI_user_host(null, f),
            k = this.headerFactory.createHeaders("Allow: INVITE,ACK,CANCEL,BYE,REFER"),
            n = this.addressFactory.createSipURI_user_host(null, d),
            q = this.addressFactory.createAddress_name_uri(this.sipDisplayName, n);
        this.localTag[a] = l.getTime();
        var p = this.headerFactory.createFromHeader(q, this.localTag[a]),
            r = this.addressFactory.createSipURI_user_host(null, f),
            t = this.addressFactory.createAddress_name_uri(null, r),
            u = this.headerFactory.createToHeader(t, null),
            w = this.listeningPoint.getViaHeader();
        this.remoteUser[a] = r;
        if (null != b) {
            var x = this.headerFactory.createContentTypeHeader("application", "sdp");
            this.jainSipInvitingSentRequest[a] = this.messageFactory.createRequest(g, "INVITE", m, h, p, u, w, e, x, b);
        } else this.jainSipInvitingSentRequest[a] = this.messageFactory.createRequest(g, "INVITE", m, h, p, u, w, e);
        if (null != this.referredByUri[a]) {
            var v = this.addressFactory.createAddress_name_uri(null, this.referredByUri[a]),
                y = this.headerFactory.createReferredByHeader(v);
            this.messageFactory.addHeader(this.jainSipInvitingSentRequest[a], y);
        }
        null == this.jainSipUserAgentHeader && (this.jainSipUserAgentHeader = this.headerFactory.createUserAgentHeader(this.sipStack.getUserAgent()));
        null == this.jainSipContactHeader && (this.jainSipContactHeader = this.listeningPoint.createContactHeader(this.sipUserName));
        this.messageFactory.addHeader(this.jainSipInvitingSentRequest[a], this.jainSipUserAgentHeader);
        this.messageFactory.addHeader(this.jainSipInvitingSentRequest[a], k);
        this.messageFactory.addHeader(this.jainSipInvitingSentRequest[a], this.jainSipContactHeader);
        if (this.isConference) {
            var z = this.headerFactory.createHeader("X-Conference-ID", this.conferenceId);
            this.messageFactory.addHeader(this.jainSipInvitingSentRequest[a], z);
        }
        for (var A in c) {
            var C = this.headerFactory.createHeader(A, c[A]);
            this.messageFactory.addHeader(this.jainSipInvitingSentRequest[a], C);
        }
        this.jainSipInvitingTransaction[a] = this.sipProvider.getNewClientTransaction(this.jainSipInvitingSentRequest[a]);
        this.jainSipInvitingSentRequest[a].setTransaction(this.jainSipInvitingTransaction[a]);
        this.jainSipInvitingTransaction[a].sendRequest();
        this.invitingState[a] = this.INVITING_STATE;
    } catch (B) {
        if ((console.error("ABTOPhoneUA(" + this.counter + "):sendInviteSipRequest(): caught exception:" + B), this.closePeerConnection(a), this.inited && this.onEstablishError)) this.onEstablishError(a, 500, "caught exception:" + B);
    }
};
ABTOPhoneUA.prototype.send200OKSipResponse = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):send200OKSipResponse()");
    try {
        var c = this.jainSipInvitedReceivedRequest[a].createResponse(200, "OK");
        this.localTag[a] = c.getToHeader().getTag();
        this.remoteTag[a] = c.getFromHeader().getTag();
        c.addHeader(this.jainSipContactHeader);
        c.addHeader(this.jainSipUserAgentHeader);
        c.setMessageContent("application", "sdp", b);
        this.jainSipInvitedTransaction[a].sendResponse(c);
        this.invitedState[a] = this.INVITED_ACCEPTED_STATE;
        if (this.inited && "preparing-update" != this.peerConnectionState[a] && this.checkConnection(twoByteHigh) && this.onEstablished)
            try {
                this.onEstablished(a, this.remoteUser[a].toString());
            } catch (d) {
                console.error("ABTOPhoneUA(" + this.counter + "):onEstablished() caught exception:" + d);
            }
    } catch (d) {
        throw (this.closePeerConnection(a), console.error("ABTOPhoneUA(" + this.counter + "):send200OKSipResponse(): caught exception:" + d), "ABTOPhoneUA(" + this.counter + "):send200OKSipResponse(): caught exception:" + d);
    }
};
ABTOPhoneUA.prototype.hold = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):hold()");
    try {
        var b = this.peerConnection[a].localDescription.sdp;
        this.maxVideoBandwidth && (b = b.replace(/(m=video.*\r\nc=IN.*\r\n)/m, "$1b=AS:" + this.maxVideoBandwidth + "\r\n"));
        this.paused[a] || (b = b.replace(/a=sendrecv\r\n/g, "a=sendonly\r\n"));
        var c = b.indexOf(" IN IP4");
        b = [b.slice(0, c), Date.now().toString(), b.slice(c)].join("");
        this.holdSentRequest[a] = this.invitingState[a] == this.INVITING_ACCEPTED_STATE ? this.jainSipInvitingDialog[a].createRequest("INVITE") : this.jainSipInvitedDialog[a].createRequest("INVITE");
        var d = this.headerFactory.createHeaders("Allow: INVITE,ACK,CANCEL,BYE,REFER"),
            f = this.headerFactory.createContentTypeHeader("application", "sdp");
        this.messageFactory.addHeader(this.holdSentRequest[a], this.jainSipUserAgentHeader);
        this.messageFactory.addHeader(this.holdSentRequest[a], d);
        this.messageFactory.addHeader(this.holdSentRequest[a], this.jainSipContactHeader);
        this.holdSentRequest[a].setContent(b, f);
        this.holdClientTransaction[a] = this.sipProvider.getNewClientTransaction(this.holdSentRequest[a]);
        this.holdSentRequest[a].setTransaction(this.holdClientTransaction[a]);
        this.invitingState[a] == this.INVITING_ACCEPTED_STATE ? this.jainSipInvitingDialog[a].sendRequest(this.holdClientTransaction[a]) : this.jainSipInvitedDialog[a].sendRequest(this.holdClientTransaction[a]);
    } catch (l) {
        console.debug("ABTOPhoneUA(" + this.counter + "):hold(): caught exception:" + l);
    }
};
ABTOPhoneUA.prototype.getInterlocutorsAddress = function (a) {
    return (a = this.remoteUser[a]) ? a.encodeWithoutScheme() : null;
};
ABTOPhoneUA.prototype.holdAuthenticateRequest = function (a, b) {
    try {
        (this.holdSentRequest[a] = this.addAuthHeader(this.holdSentRequest[a], b)),
            (this.holdClientTransaction[a] = this.sipProvider.getNewClientTransaction(this.holdSentRequest[a])),
            this.holdSentRequest[a].setTransaction(this.holdClientTransaction[a]),
            this.holdClientTransaction[a].sendRequest();
    } catch (c) {
        console.error("ABTOPhoneUA(" + this.counter + "):holdAuthenticateRequest(): caught exception:" + c);
    }
};
ABTOPhoneUA.prototype.sendACK = function (a) {
    try {
        var b = a.getOriginalTransaction().getDialog();
        b.setRemoteTarget(a.getResponse().getHeader("Contact"));
        var c = a.getOriginalTransaction().createAck();
        if (!c.getRecordRouteHeaders()) {
            var d = b.getRouteList();
            d.isEmpty() || c.setHeader(d);
        }
        b.incrementLocalSequenceNumber();
        b.sendAck(c);
    } catch (f) {
        console.error("ABTOPhoneUA(" + this.counter + "):sendACK(): caught exception:" + f);
    }
};
ABTOPhoneUA.prototype.mute = function () {
    this.localAudioVideoMediaStream &&
        this.localAudioVideoMediaStream.getAudioTracks().forEach(function (a) {
            a.enabled = !1;
        });
};
ABTOPhoneUA.prototype.unmute = function () {
    this.localAudioVideoMediaStream &&
        this.localAudioVideoMediaStream.getAudioTracks().forEach(function (a) {
            a.enabled = !0;
        });
};
ABTOPhoneUA.prototype.toggleMediaStream = function (a) {
    try {
        this.paused[a]
            ? (this.localAudioVideoMediaStream.getAudioTracks().forEach(function (b) {}),
              this.localAudioVideoMediaStream.getVideoTracks().forEach(function (b) {}),
              this.remoteAudioVideoMediaStream[a].getAudioTracks().forEach(function (b) {
                  b.enabled = !0;
              }),
              this.remoteAudioVideoMediaStream[a].getVideoTracks().forEach(function (b) {
                  b.enabled = !0;
              }))
            : (this.localAudioVideoMediaStream.getAudioTracks().forEach(function (b) {}),
              this.localAudioVideoMediaStream.getVideoTracks().forEach(function (b) {}),
              this.remoteAudioVideoMediaStream[a].getAudioTracks().forEach(function (b) {
                  b.enabled = !1;
              }),
              this.remoteAudioVideoMediaStream[a].getVideoTracks().forEach(function (b) {
                  b.enabled = !1;
              })),
            (this.paused[a] = !this.paused[a]);
    } catch (b) {
        console.error(b);
    }
};
ABTOPhoneUA.prototype.transfer = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):transfer()");
    try {
        if (this.invitedState[a] != this.INVITED_ACCEPTED_STATE && this.invitingState[a] != this.INVITING_ACCEPTED_STATE) console.debug("ABTOPhoneUA(" + this.counter + "):transfer attempt when call not established");
        else {
            var c = this.sipUserName + "@" + this.sipDomain,
                d = this.getInterlocutorsAddress(a);
            console.debug("ABTOPhoneUA(" + this.counter + "):sendReferSipRequest(from:" + c + ",to:" + d + ", refer-to:" + b + ")");
            var f = this.addressFactory.createSipURI_user_host(null, d),
                l = this.listeningPoint.getViaHeader(),
                h = this.headerFactory.createMaxForwardsHeader(70),
                m = this.addressFactory.createSipURI_user_host(null, c),
                e = this.addressFactory.createAddress_name_uri(this.sipDisplayName, m),
                g = this.headerFactory.createFromHeader(e, this.localTag[a]),
                k = this.addressFactory.createSipURI_user_host(null, d),
                n = this.addressFactory.createAddress_name_uri(null, k),
                q = this.headerFactory.createToHeader(n, this.remoteTag[a]);
            var p = this.invitingState[a] == this.INVITING_ACCEPTED_STATE ? this.jainSipInvitingSentRequest[a].getCallId() : this.jainSipInvitedReceivedRequest[a].getCallId();
            var r = this.headerFactory.createCSeqHeader(101, SIPRequest.prototype.REFER),
                t = this.addressFactory.createSipURI_user_host(null, b),
                u = this.addressFactory.createAddress_name_uri(null, t),
                w = this.headerFactory.createReferToHeader(u, null),
                x = this.headerFactory.createReferredByHeader(e),
                v = this.messageFactory.createRequest(f, SIPRequest.prototype.REFER, p, r, g, q, l, h);
            this.messageFactory.addHeader(v, w);
            this.messageFactory.addHeader(v, x);
            this.messageFactory.addHeader(v, this.jainSipContactHeader);
            this.messageFactory.addHeader(v, this.jainSipUserAgentHeader);
            var y = this.sipProvider.getNewClientTransaction(v);
            v.setTransaction(y);
            y.sendRequest();
        }
    } catch (z) {
        throw (console.error("ABTOPhoneUA(" + this.counter + "):transfer(): caught exception:" + z), "ABTOPhoneUA(" + this.counter + "):transfer(): caught exception:" + z);
    }
};
ABTOPhoneUA.prototype.sendDTMF = function (a, b) {
    this.dtmfSender[a].insertDTMF(b);
};
ABTOPhoneUA.prototype.sendMessage = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):sendMessage()");
    try {
        var c = this.sipUserName + "@" + this.sipDomain,
            d = this.headerFactory.createCSeqHeader(0, "MESSAGE"),
            f = this.headerFactory.createCallIdHeader(),
            l = this.headerFactory.createMaxForwardsHeader(70),
            h = this.addressFactory.createSipURI_user_host(null, a),
            m = this.addressFactory.createSipURI_user_host(null, c),
            e = this.addressFactory.createAddress_name_uri(this.sipDisplayName, m),
            g = this.headerFactory.createFromHeader(e, new Date().getTime()),
            k = this.addressFactory.createSipURI_user_host(null, a),
            n = this.addressFactory.createAddress_name_uri(null, k),
            q = this.headerFactory.createToHeader(n, null),
            p = this.listeningPoint.getViaHeader(),
            r = this.headerFactory.createContentTypeHeader("text", "plain");
        this.lastMessageRequest = this.messageFactory.createRequest(h, "MESSAGE", f, d, g, q, p, l, r, b);
        this.messageFactory.addHeader(this.lastMessageRequest, this.jainSipUserAgentHeader);
        this.messageTransaction = this.sipProvider.getNewClientTransaction(this.lastMessageRequest);
        this.lastMessageRequest.setTransaction(this.messageTransaction);
        this.messageTransaction.sendRequest();
    } catch (t) {
        console.debug("ABTOPhoneUA(" + this.counter + "):sendMessage(): caught exception:" + t);
    }
};
ABTOPhoneUA.prototype.bye = function (a) {
    if (this.isConference) return this.initConferenceStateMachine(), this.hangupAll(), !1;
    console.debug("ABTOPhoneUA(" + this.counter + "):bye()");
    if (this.invitingState[a] == this.INVITING_ACCEPTED_STATE)
        try {
            var b = this.jainSipInvitingDialog[a].createRequest("BYE");
            b.addHeader(this.jainSipContactHeader);
            b.addHeader(this.jainSipUserAgentHeader);
            var c = this.sipProvider.getNewClientTransaction(b);
            this.jainSipInvitingDialog[a].sendRequest(c);
            this.invitingState[a] = this.INVITING_LOCAL_HANGINGUP_STATE;
        } catch (d) {
            console.error("ABTOPhoneUA(" + this.counter + "):bye(): caught exception:" + d), console.log("ABTOPhoneUA(" + this.counter + "):bye(): caught exception:" + d), this.closePeerConnection(a);
        }
    else if (this.invitedState[a] == this.INVITED_ACCEPTED_STATE)
        try {
            (b = this.jainSipInvitedDialog[a].createRequest("BYE")),
                b.addHeader(this.jainSipContactHeader),
                b.addHeader(this.jainSipUserAgentHeader),
                (c = this.sipProvider.getNewClientTransaction(b)),
                b.setTransaction(c),
                this.jainSipInvitedDialog[a].sendRequest(c),
                (this.invitedState[a] = this.INVITED_LOCAL_HANGINGUP_STATE);
        } catch (d) {
            console.error("ABTOPhoneUA(" + this.counter + "):bye(): caught exception:" + d), this.closePeerConnection(a);
        }
    else if (this.invitingState[a] == this.INVITING_STATE || this.invitingState[a] == this.INVITING_407_STATE)
        try {
            (this.jainSipCancelRequest = this.jainSipInvitingTransaction[a].createCancel()),
                this.jainSipCancelRequest.addHeader(this.jainSipContactHeader),
                this.jainSipCancelRequest.addHeader(this.jainSipUserAgentHeader),
                (this.jainSipCancelTransaction = this.sipProvider.getNewClientTransaction(this.jainSipCancelRequest)),
                this.jainSipCancelTransaction.sendRequest(),
                (this.invitingState[a] = this.INVITING_LOCAL_HANGINGUP_STATE);
        } catch (d) {
            console.error("ABTOPhoneUA(" + this.counter + "):cancel(): caught exception:" + d), this.closePeerConnection(a);
        }
    else console.log("ABTOPhoneUA(" + this.counter + "):bye(): bad state, action call unauthorized");
    return !0;
};
ABTOPhoneUA.prototype.handleStateMachineInvitingResponseEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingResponseEvent(): this.invitingState[index]=" + this.invitingState[a]);
    var c = b.getResponse(),
        d = parseInt(c.getStatusCode());
    if (this.invitingState[a] == this.INVITING_STATE)
        if (200 > d) {
            if (this.inited && this.onRinging)
                try {
                    this.onRinging(a, d);
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onRinging(): caught exception:" + l);
                }
            console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingResponseEvent(): 1XX response ignored");
        } else if (407 == d || 401 == d)
            (this.jainSipInvitingSentRequest[a] = this.addAuthHeader(this.jainSipInvitingSentRequest[a], c)),
                (this.jainSipInvitingTransaction[a] = this.sipProvider.getNewClientTransaction(this.jainSipInvitingSentRequest[a])),
                this.jainSipInvitingSentRequest[a].setTransaction(this.jainSipInvitingTransaction[a]),
                this.jainSipInvitingTransaction[a].sendRequest(),
                (this.invitingState[a] = this.INVITING_407_STATE);
        else if (200 == d) {
            this.remoteTag[a] = c.getToHeader().getTag();
            this.jainSipInvitingDialog[a] = b.getOriginalTransaction().getDialog();
            this.jainSipInvitingDialog[a].setRemoteTarget(c.getHeader("Contact"));
            b = b.getOriginalTransaction().createAck();
            this.jainSipInvitingDialog[a].sendAck(b);
            null != this.referredByUri[a] && (this.sendNotifyReferDoneRequest(a, c), (this.referredByUri[a] = null));
            b = c.getContent();
            d = new RTCSessionDescription({ type: "answer", sdp: b });
            var f = this;
            this.peerConnectionState[a] = "answer-received";
            null != b &&
                this.peerConnection[a].setRemoteDescription(
                    d,
                    function () {
                        f.onPeerConnectionSetRemoteDescriptionSuccessCallback(a);
                    },
                    function (l) {
                        f.onPeerConnectionSetRemoteDescriptionErrorCallback(l);
                    }
                );
            this.jainSipInvitingSentRespond = c;
            this.invitingState[a] = this.INVITING_ACCEPTED_STATE;
        } else {
            console.log("Call Rejected :" + c.getStatusLine().getReasonPhrase());
            if (this.inited && this.onEstablishError)
                try {
                    this.onEstablishError(a, d, c.getStatusLine().getReasonPhrase());
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onEstablishError: caught exception:" + l);
                }
            this.closePeerConnection(a);
        }
    else if (this.invitingState[a] == this.INVITING_407_STATE)
        if (200 > d) console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingResponseEvent(): 1XX response ignored");
        else if (200 == d)
            (this.remoteTag[a] = c.getToHeader().getTag()),
                (this.jainSipInvitingDialog[a] = b.getOriginalTransaction().getDialog()),
                this.jainSipInvitingDialog[a].setRemoteTarget(c.getHeader("Contact")),
                (b = b.getOriginalTransaction().createAck()),
                this.jainSipInvitingDialog[a].sendAck(b),
                null != this.referredByUri[a] && (this.sendNotifyReferDoneRequest(a, c), (this.referredByUri[a] = null)),
                (b = c.getContent()),
                (d = new RTCSessionDescription({ type: "answer", sdp: b })),
                (f = this),
                (this.peerConnectionState[a] = "answer-received"),
                this.peerConnection[a].setRemoteDescription(
                    d,
                    function () {
                        f.onPeerConnectionSetRemoteDescriptionSuccessCallback(a);
                    },
                    function (l) {
                        f.onPeerConnectionSetRemoteDescriptionErrorCallback(l);
                    }
                ),
                (this.jainSipInvitingSentRespond = c),
                (this.invitingState[a] = this.INVITING_ACCEPTED_STATE);
        else {
            console.log("Call Failed:" + c.getStatusCode() + "  " + c.getStatusLine().getReasonPhrase());
            if (this.inited && this.onEstablishError)
                try {
                    this.onEstablishError(a, d, c.getStatusLine().getReasonPhrase());
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onEstablishError: caught exception:" + l);
                }
            this.closePeerConnection(a);
        }
    else
        this.invitingState[a] == this.INVITING_FAILED_STATE
            ? console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingResponseEvent(): bad state, SIP response ignored")
            : this.invitingState[a] == this.INVITING_ACCEPTED_STATE
            ? 407 == d || 401 == d
                ? this.holdAuthenticateRequest(a, c)
                : 200 == d
                ? (this.sendACK(b), this.toggleMediaStream(a), (this.holdState[a] = this.paused[a] ? this.HOLD_BY_ME : this.HOLD_OFF), this.fireOnHoldListener(a))
                : console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingResponseEvent(): bad state, SIP response ignored")
            : this.invitingState[a] == this.INVITING_LOCAL_HANGINGUP_STATE
            ? 401 == d
                ? "CANCEL" == b.getOriginalTransaction().getMethod()
                    ? ((c = this.headerFactory.createAuthorizationHeader(c, this.jainSipCancelRequest, this.sipPassword, this.sipLogin)),
                      this.messageFactory.addHeader(this.jainSipCancelRequest, c),
                      (this.jainSipCancelRequest = this.setNewViaHeader(this.jainSipCancelRequest)),
                      (this.jainSipCancelTransaction.currentState = null),
                      this.jainSipCancelTransaction.sendRequest())
                    : ((b = this.jainSipInvitingDialog[a].createRequest("BYE", this.jainSipInvitingSentRespond)),
                      (d = this.sipProvider.getNewClientTransaction(b)),
                      (c = this.headerFactory.createAuthorizationHeader(c, b, this.sipPassword, this.sipLogin)),
                      this.messageFactory.addHeader(b, c),
                      this.jainSipInvitingDialog[a].sendRequest(d),
                      this.closePeerConnection(a),
                      (this.invitedState[a] = this.INVITED_LOCAL_HANGINGUP_407_STATE))
                : 407 == d
                ? ((b = this.jainSipInvitingDialog[a].createRequest("BYE")),
                  (d = this.sipProvider.getNewClientTransaction(b)),
                  (c = this.headerFactory.createAuthorizationHeader(c, b, this.sipPassword, this.sipLogin)),
                  this.messageFactory.addHeader(b, c),
                  this.jainSipInvitingDialog[a].sendRequest(d),
                  (this.invitingState[a] = this.INVITING_LOCAL_HANGINGUP_407_STATE))
                : (200 != d && console.log("Call HangUp Failed:" + c.getStatusCode() + "  " + c.getStatusLine().getReasonPhrase()), this.closePeerConnection(a))
            : this.invitingState[a] == this.INVITING_LOCAL_HANGINGUP_407_STATE && console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingResponseEvent(): bad state, SIP response ignored");
};
ABTOPhoneUA.prototype.handleStateMachineInvitingRequestEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): this.invitingState[index]=" + this.invitingState[a]);
    var c = b.getRequest(),
        d = c.getMethod();
    if (this.invitingState[a] == this.INVITING_STATE) {
        if ("CANCEL" == d) {
            c = c.createResponse(200, "OK");
            c.addHeader(this.jainSipContactHeader);
            b.getServerTransaction().sendResponse(c);
            if (this.inited && this.onHangUp)
                try {
                    this.onHangUp(a);
                } catch (f) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onHangUp(): caught exception:" + f);
                }
            this.closePeerConnection(a);
        } else console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored");
        console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored");
    } else if (this.invitingState[a] == this.INVITING_407_STATE) console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored");
    else if (this.invitingState[a] == this.INVITING_FAILED_STATE) console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored");
    else if (this.invitingState[a] == this.INVITING_ACCEPTED_STATE)
        if ("BYE" == d) {
            c = c.createResponse(200, "OK");
            c.addHeader(this.jainSipContactHeader);
            c.addHeader(this.jainSipUserAgentHeader);
            b.getServerTransaction().sendResponse(c);
            if (this.inited && this.onHangUp)
                try {
                    this.onHangUp(a);
                } catch (f) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onHangUp(): caught exception:" + f);
                }
            this.closePeerConnection(a);
            this.inviteReferToAddress(a);
        } else console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored");
    else
        this.invitingState[a] == this.INVITING_LOCAL_HANGINGUP_STATE
            ? "BYE" == d
                ? ((c = c.createResponse(200, "OK")),
                  c.addHeader(this.jainSipContactHeader),
                  b.getServerTransaction().sendResponse(c),
                  this.closePeerConnection(a),
                  console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, already hanging up 200 Ok anyway"))
                : console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored")
            : this.invitingState[a] == this.INVITING_LOCAL_HANGINGUP_407_STATE && console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored");
};
ABTOPhoneUA.prototype.handleStateMachineInvitedResponseEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedResponseEvent(): this.invitingState[index]=" + this.invitingState[a]);
    var c = b.getResponse(),
        d = parseInt(c.getStatusCode());
    this.invitedState[a] == this.INVITED_RINGING_STATE
        ? console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedResponseEvent(): bad state, SIP response ignored")
        : this.invitedState[a] == this.INVITED_ACCEPTED_STATE
        ? 407 == d || 401 == d
            ? this.holdAuthenticateRequest(a, c)
            : 200 == d
            ? (this.sendACK(b), this.toggleMediaStream(a), (this.holdState[a] = this.paused[a] ? this.HOLD_BY_ME : this.HOLD_OFF), this.fireOnHoldListener(a))
            : console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedResponseEvent(): bad state, SIP response ignored")
        : this.invitedState[a] == this.INVITED_LOCAL_HANGINGUP_STATE
        ? 407 == d || 401 == d
            ? ((b = this.jainSipInvitedDialog[a].createRequest("BYE")),
              (d = this.sipProvider.getNewClientTransaction(b)),
              (c = this.headerFactory.createAuthorizationHeader(c, b, this.sipPassword, this.sipLogin)),
              this.messageFactory.addHeader(b, c),
              this.jainSipInvitedDialog[a].sendRequest(d),
              this.closePeerConnection(a),
              (this.invitedState[a] = this.INVITED_LOCAL_HANGINGUP_407_STATE))
            : (200 != d && console.log("Call HangUp Failed:" + c.getStatusCode() + "  " + c.getStatusLine().getReasonPhrase()), this.closePeerConnection(a))
        : this.invitedState[a] == this.INVITED_LOCAL_HANGINGUP_407_STATE && (200 != d && console.log("Call HangUp Failed:" + c.getStatusCode() + "  " + c.getStatusLine().getReasonPhrase()), this.closePeerConnection(a));
};
ABTOPhoneUA.prototype.getInviteRequestHeaderValue = function (a, b) {
    return this.jainSipInvitedReceivedRequest[a] ? ((a = this.jainSipInvitedReceivedRequest[a].getHeader(b)) ? a.getHeaderValue() : "") : "";
};
ABTOPhoneUA.prototype.handleStateMachineInvitedRequestEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedRequestEvent(): this.invitedState=" + this.invitedState[a]);
    var c = b.getRequest(),
        d = c.getMethod(),
        f = c.getHeader("From").getAddress().getURI();
    if (this.invitedState[a] == this.INVITED_INITIAL_STATE)
        if ("INVITE" == d) {
            this.remoteUser[a] = f;
            this.jainSipInvitedReceivedRequest[a] = c;
            this.jainSipInvitedTransaction[a] = b.getServerTransaction();
            this.jainSipInvitedDialog[a] = b.getServerTransaction().getDialog();
            if ((d = c.hasHeader("X-Conference-ID"))) {
                f = parseInt(c.getHeader("X-Conference-ID").value);
                if (this.isConference) {
                    f == this.conferenceId ? this.accept(a) : this.reject(a);
                    return;
                }
                this.conferenceId = f;
                this.isConferenceInvited[a] = !1;
            }
            this.customHeaders[a] = {};
            this.isConference = d;
            if (this.inited && this.onNewCall)
                try {
                    this.onNewCall(a);
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onNewCall(): caught exception:" + l);
                }
            c = c.createResponse(180, "Ringing");
            c.addHeader(this.jainSipContactHeader);
            c.addHeader(this.jainSipUserAgentHeader);
            b.getServerTransaction().sendResponse(c);
            this.invitedState[a] = this.INVITED_RINGING_STATE;
            console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedRequestEvent(): sipUri.getUser()=" + this.remoteUser[a].getUser());
            if (this.inited && this.onInvited)
                try {
                    this.onInvited(a, this.remoteUser[a].toString());
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onInvited(): caught exception:" + l);
                }
        } else {
            if ("CANCEL" == d) {
                c = c.createResponse(200, "OK");
                c.addHeader(this.jainSipContactHeader);
                c.addHeader(this.jainSipUserAgentHeader);
                b.getServerTransaction().sendResponse(c);
                b = this.jainSipInvitedReceivedRequest[a].createResponse(487, "(Request Cancelled)");
                c.addHeader(this.jainSipContactHeader);
                b.addHeader(this.jainSipUserAgentHeader);
                this.jainSipInvitedTransaction[a].sendMessage(b);
                this.invitedState[a] = this.INVITED_INITIAL_STATE;
                this.jainSipInvitedReceivedRequest[a] = null;
                this.jainSipInvitedDialog[a] = null;
                if (this.inited && this.onHangUp)
                    try {
                        this.onHangUp(a);
                    } catch (l) {
                        console.error("ABTOPhoneUA(" + this.counter + "):onHangUp(): caught exception:" + l);
                    }
                this.closePeerConnection(a);
            }
        }
    else if (this.invitedState[a] == this.INVITED_RINGING_STATE)
        if ("CANCEL" == d) {
            c = c.createResponse(200, "OK");
            c.addHeader(this.jainSipContactHeader);
            c.addHeader(this.jainSipUserAgentHeader);
            b.getServerTransaction().sendResponse(c);
            b = this.jainSipInvitedReceivedRequest[a].createResponse(487, "(Request Cancelled)");
            c.addHeader(this.jainSipContactHeader);
            b.addHeader(this.jainSipUserAgentHeader);
            this.jainSipInvitedTransaction[a].sendMessage(b);
            this.invitedState[a] = this.INVITED_INITIAL_STATE;
            this.jainSipInvitedReceivedRequest[a] = null;
            this.jainSipInvitedDialog[a] = null;
            if (this.inited && this.onHangUp)
                try {
                    this.onHangUp(a);
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onHangUp(): caught exception:" + l);
                }
            this.closePeerConnection(a);
        } else console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedRequestEvent(): bad state, SIP request ignored");
    else if (this.invitedState[a] == this.INVITED_ACCEPTED_STATE)
        if ("BYE" == d) {
            c = c.createResponse(200, "OK");
            c.addHeader(this.jainSipContactHeader);
            c.addHeader(this.jainSipUserAgentHeader);
            b.getServerTransaction().sendResponse(c);
            this.invitedState[a] = this.INVITED_INITIAL_STATE;
            this.jainSipInvitedReceivedRequest[a] = null;
            this.jainSipInvitedDialog[a] = null;
            this.stopRemoteMedia(a);
            if (this.inited && this.onHangUp)
                try {
                    this.onHangUp(a);
                } catch (l) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onHangUp(): caught exception:" + l);
                }
            this.closePeerConnection(a);
            this.inviteReferToAddress(a);
        } else "ACK" == d ? (this.jainSipInvitedDialog[a] = b.getServerTransaction().getDialog()) : console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedRequestEvent(): bad state, SIP request ignored");
    else
        this.invitedState[a] == this.INVITED_LOCAL_HANGINGUP_STATE
            ? "BYE" == d
                ? ((c = c.createResponse(200, "OK")),
                  c.addHeader(this.jainSipContactHeader),
                  b.getServerTransaction().sendResponse(c),
                  this.closePeerConnection(a),
                  console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, already hanging up 200 Ok anyway"))
                : console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitingRequestEvent(): bad state, SIP request ignored")
            : this.invitedState[a] == this.INVITED_LOCAL_HANGINGUP_407_STATE && console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineInvitedRequestEvent(): bad state, SIP request ignored");
};
ABTOPhoneUA.prototype.handleStateMachineInfoRequestEvent = function (a, b) {
    a = b.getRequest();
    var c = a.createResponse(200, "OK");
    c.addHeader(this.jainSipContactHeader);
    c.addHeader(this.jainSipUserAgentHeader);
    b.getServerTransaction().sendResponse(c);
    a.hasHeader("X-Conference-ID") && this.isConference && this.conferenceId == a.getHeader("X-Conference-ID").value && ((b = a.getContent()), this.conference_processContacts(b));
};
ABTOPhoneUA.prototype.handleStateMachineUpdateRequestEvent = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):handleStateMachineUpdateRequestEvent(): this.invitedState[index]=" + this.invitedState[a]);
    var c = b.getRequest();
    if (this.invitedState[a] == this.INVITED_ACCEPTED_STATE || this.invitingState[a] == this.INVITING_ACCEPTED_STATE) {
        this.jainSipInvitedReceivedRequest[a] = c;
        this.jainSipInvitedTransaction[a] = b.getServerTransaction();
        this.jainSipInvitedDialog[a] = b.getServerTransaction().getDialog();
        try {
            var d = this.jainSipInvitedReceivedRequest[a].getContent(),
                f = new RTCSessionDescription({ type: "offer", sdp: d }),
                l = this;
            this.peerConnectionState[a] = "update-received";
            this.createPeerConnection(a);
            this.peerConnection[a].addStream(this.localAudioVideoMediaStream, null);
            this.getDTMFSender(a);
            this.peerConnection[a].setRemoteDescription(
                f,
                function () {
                    l.onPeerConnectionSetRemoteDescriptionSuccessCallback(a);
                },
                function (h) {
                    l.onPeerConnectionSetRemoteDescriptionErrorCallback(h);
                }
            );
        } catch (h) {
            return (
                (b = this.jainSipInvitedReceivedRequest[a].createResponse(480, "Temporarily Unavailable")),
                b.addHeader(this.jainSipContactHeader),
                b.addHeader(this.jainSipUserAgentHeader),
                this.jainSipInvitedTransaction[a].sendResponse(b),
                this.closePeerConnection(a),
                console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineUpdateRequestEvent(): caught exception:" + h),
                !1
            );
        }
    } else
        return (
            (b = this.jainSipInvitedReceivedRequest[a].createResponse(480, "Temporarily Unavailable")),
            b.addHeader(this.jainSipContactHeader),
            b.addHeader(this.jainSipUserAgentHeader),
            this.jainSipInvitedTransaction[a].sendResponse(b),
            this.closePeerConnection(a),
            console.error("ABTOPhoneUA(" + this.counter + "):handleStateMachineUpdateRequestEvent(): Update received while not in inited state"),
            !1
        );
};
ABTOPhoneUA.prototype.createPeerConnection = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):createPeerConnection()");
    var b = this,
        c = { iceServers: this.stunServers.concat(this.turnServer) };
    if (this.peerConnection[a])
        try {
            this.peerConnection[a].close();
        } catch (d) {}
    this.peerConnection[a] = new RTCPeerConnection(c, { optional: [{ DtlsSrtpKeyAgreement: !0 }] });
    this.peerConnection[a].onaddstream = function (d) {
        b.onPeerConnectionOnAddStreamCallback(a, d);
    };
    this.peerConnection[a].onremovestream = function (d) {
        b.onPeerConnectionOnRemoveStreamCallback(a, d);
    };
    this.peerConnection[a].onstatechange = function (d) {
        b.onPeerConnectionStateChangeCallback(a, d);
    };
    this.peerConnection[a].onicecandidate = function (d) {
        b.onPeerConnectionIceCandidateCallback(a, d);
    };
    this.peerConnection[a].ongatheringchange = function (d) {
        b.onPeerConnectionGatheringChangeCallback(a, d);
    };
    this.peerConnection[a].onicechange = function (d) {
        b.onPeerConnectionIceChangeCallback(a, d);
    };
    this.peerConnection[a].onopen = function (d) {
        b.onPeerConnectionOnOpenCallback(a, d);
    };
};
ABTOPhoneUA.prototype.closePeerConnection = function (a) {
    console.log("00 closePeerConnection")

    console.debug("ABTOPhoneUA(" + this.counter + "):closePeerConnection()");
    if (this.peerConnection[a]) {
        console.debug("ABTOPhoneUA(" + this.counter + "):closePeerConnection(): force peerConnection close");
        this.stopRecord(a);
        this.paused[a] && (this.toggleMediaStream(a), (this.holdState[a] = this.HOLD_OFF));
        this.stopRemoteMedia(a);
        this.remoteAudioVideoMediaStream[a] = null;
        try {
            this.peerConnection[a].close(), (this.peerConnection[a] = null);
        } catch (b) {}
        this.dtmfSender[a] = null;
        if (this.inited && this.onCallCleared)
            try {
                this.onCallCleared(a);
                console.log("11")
            } catch (b) {
                console.log("22")

                console.error("ABTOPhoneUA(" + this.counter + "):onCallCleared(): caught exception:" + b);
            }
    }
    this.peerConnectionState[a] = "new";
    this.removeCallIndex(a);
    this.remoteUser[a] = null;
};
ABTOPhoneUA.prototype.startRecord = function (a, b) {
    this.recordedBlobs[a] = [];
    var c = { mimeType: "video/webm;codecs=vp9,opus" };
    MediaRecorder.isTypeSupported(c.mimeType) ||
        ((c = { mimeType: "video/webm;codecs=vp8,opus" }), MediaRecorder.isTypeSupported(c.mimeType) || ((c = { mimeType: "video/webm" }), MediaRecorder.isTypeSupported(c.mimeType) || (c = { mimeType: "" })));
    try {
        this.mediaRecorder[a] = new MediaRecorder(b, c);
    } catch (f) {
        console.error("Exception while creating MediaRecorder:", f);
        return;
    }
    var d = this;
    console.log("Created MediaRecorder", this.mediaRecorder[a], "with options", c);
    this.mediaRecorder[a].ondataavailable = function (f) {
        f.data && 0 < f.data.size && (d.recordedBlobs[a].push(f.data), console.log("channel ", a, ": added chunk of ", f.data.size, " bytes"), d.fireOnRecordReady(a));
    };
    this.mediaRecorder[a].start();
};
ABTOPhoneUA.prototype.stopRecord = function (a) {
    null != this.mediaRecorder[a] && (this.mediaRecorder[a].stop(), (this.mediaRecorder[a] = null));
};
ABTOPhoneUA.prototype.fireOnRecordReady = function (a) {
    if (null != this.recordedBlobs[a]) {
        var b = new Blob(this.recordedBlobs[a], { type: "video/webm" });
        b = window.URL.createObjectURL(b);
        if (this.onRecordReady) this.onRecordReady(a, b);
    }
};
ABTOPhoneUA.prototype.playVideoStream = function (a, b) {
    a.srcObject = b;
    a.play();
};
ABTOPhoneUA.prototype.onPeerConnectionOnAddStreamCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionOnAddStreamCallback(): event=" + b);
    if (null != this.peerConnection[a]) {
        if (((b = b.stream), (this.remoteAudioVideoMediaStream[a] = b), null != this.remoteVideo[a] && this.playVideoStream(this.remoteVideo[a], b), this.doRecord && this.startRecord(a, b), this.inited && this.onRemoteMediaStarted))
            try {
                this.onRemoteMediaStarted(a, b);
            } catch (c) {
                console.error("ABTOPhoneUA(" + this.counter + "):onRemoteMediaStarted(): caught exception:" + c);
            }
    } else console.error("SimpleWebRtcSipPhone:onPeerConnectionOnAddStreamCallback(): this.peerConnection is null, bug in state machine!, bug in state machine!");
};
ABTOPhoneUA.prototype.onPeerConnectionOnRemoveStreamCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionOnRemoveStreamCallback(): event=" + b);
    if (null != this.peerConnection[a]) {
        if ((this.stopRecord(a), (this.remoteAudioVideoMediaStream[a] = null), this.stopRemoteMedia(a), this.inited && this.onRemoteMediaStopped))
            try {
                this.onRemoteMediaStopped(a);
            } catch (c) {
                console.error("ABTOPhoneUA(" + this.counter + "):onRemoteMediaStopped(): caught exception:" + c);
            }
    } else console.warn("SimpleWebRtcSipPhone:onPeerConnectionOnRemoveStreamCallback(): this.peerConnection is null, bug in state machine!");
};
ABTOPhoneUA.prototype.onPeerConnectionOnOpenCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionOnOpenCallback(): event=" + b);
};
ABTOPhoneUA.prototype.onPeerConnectionStateChangeCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionStateChangeCallback(): event=" + b);
};
ABTOPhoneUA.prototype.onPeerConnectionIceCandidateCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback(): rtcIceCandidateEvent=" + b);
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback(): rtcIceCandidateEvent.candidate=" + b.candidate);
    if (null != this.peerConnection[a])
        if (
            (console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback(): this.peerConnection.readyState=" + this.peerConnection[a].readyState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback(): this.peerConnection.iceGatheringState=" + this.peerConnection[a].iceGatheringState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback(): this.peerConnection.iceState=" + this.peerConnection[a].iceState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback: this.peerConnectionState[index]=" + this.peerConnectionState[a]),
            null != b.candidate)
        ) {
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback: RTCIceCandidateEvent.candidate.candidate=" + b.candidate.candidate);
            try {
                window.clearTimeout(this.timer);
            } catch (c) {}
            this.timer = window.setTimeout(
                function (c) {
                    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceTimeout fired, ending ICE gathering");
                    c.onPeerConnectionIceCandidateCallback(a, { candidate: null });
                },
                1e3,
                this
            );
        } else {
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback: no anymore ICE candidate");
            try {
                window.clearTimeout(this.timer);
            } catch (c) {}
            if ("preparing-offer" == this.peerConnectionState[a]) {
                if (
                    ((b = this.peerConnection[a].localDescription.sdp),
                    this.maxVideoBandwidth && (b = b.replace(/(m=video.*\r\nc=IN.*\r\n)/m, "$1b=AS:" + this.maxVideoBandwidth + "\r\n")),
                    this.sendInviteSipRequest(a, b, this.customHeaders[a]),
                    (this.peerConnectionState[a] = "offer-sent"),
                    this.inited && this.onNewCall)
                )
                    try {
                        this.onNewCall(a);
                    } catch (c) {
                        console.error("ABTOPhoneUA(" + this.counter + "):onNewCall(): caught exception:" + c);
                    }
            } else
                "preparing-answer" == this.peerConnectionState[a] || "preparing-update" == this.peerConnectionState[a]
                    ? ((b = this.peerConnection[a].localDescription.sdp),
                      this.maxVideoBandwidth && (b = b.replace(/(m=video.*\r\nc=IN.*\r\n)/m, "$1b=AS:" + this.maxVideoBandwidth + "\r\n")),
                      this.send200OKSipResponse(a, b),
                      (this.peerConnectionState[a] = "established"))
                    : "established" != this.peerConnectionState[a] && console.log("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceCandidateCallback(): RTCPeerConnection bad state!");
        }
    else console.warn("SimpleWebRtcSipPhone:onPeerConnectionIceCandidateCallback(): this.peerConnection is null, bug in state machine!");
};
ABTOPhoneUA.prototype.onPeerConnectionCreateOfferSuccessCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionCreateOfferSuccessCallback(): newOffer=" + b);
    if (null != this.peerConnection[a])
        if ("new" == this.peerConnectionState[a]) {
            var c = this;
            this.peerConnectionState[a] = "preparing-offer";
            this.peerConnection[a].setLocalDescription(
                b,
                function () {
                    c.onPeerConnectionSetLocalDescriptionSuccessCallback(a);
                },
                function (d) {
                    c.onPeerConnectionSetLocalDescriptionErrorCallback(a, d);
                }
            );
        } else console.error("ABTOPhoneUA(" + this.counter + "):onPeerConnectionCreateOfferSuccessCallback(): RTCPeerConnection bad state!");
    else console.warn("SimpleWebRtcSipPhone:onPeerConnectionCreateOfferSuccessCallback(): this.peerConnection is null, bug in state machine!");
};
ABTOPhoneUA.prototype.onPeerConnectionCreateOfferErrorCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionCreateOfferErrorCallback():error=" + b);
};
ABTOPhoneUA.prototype.onPeerConnectionSetLocalDescriptionSuccessCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetLocalDescriptionSuccessCallback()");
};
ABTOPhoneUA.prototype.onPeerConnectionSetLocalDescriptionErrorCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetLocalDescriptionErrorCallback():error=" + b);
    if ("preparing-update" == this.peerConnectionState[a][a])
        try {
            this.peerConnectionState[a] = "failed";
            var c = this.jainSipInvitedReceivedRequest[a].createResponse(480, b);
            c.addHeader(this.jainSipContactHeader);
            c.addHeader(this.jainSipUserAgentHeader);
            this.jainSipInvitedTransaction[a].sendResponse(c);
        } catch (d) {
            throw (
                (console.error("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetLocalDescriptionErrorCallback(): caught exception:" + d),
                "ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetLocalDescriptionErrorCallback(): caught exception:" + d)
            );
        }
    else console.log("onPeerConnectionSetLocalDescriptionErrorCallback error:" + b);
};
ABTOPhoneUA.prototype.onPeerConnectionCreateAnswerSuccessCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionCreateAnswerSuccessCallback():answer=" + b);
    if (null != this.peerConnection[a])
        if ("offer-received" == this.peerConnectionState[a]) {
            var c = this;
            this.peerConnectionState[a] = "preparing-answer";
            this.peerConnection[a].setLocalDescription(
                b,
                function () {
                    c.onPeerConnectionSetLocalDescriptionSuccessCallback();
                },
                function (d) {
                    c.onPeerConnectionSetLocalDescriptionErrorCallback(d);
                }
            );
        } else
            "update-received" == this.peerConnectionState[a]
                ? ((c = this),
                  (this.peerConnectionState[a] = "preparing-update"),
                  this.peerConnection[a].setLocalDescription(
                      b,
                      function () {
                          c.onPeerConnectionSetLocalDescriptionSuccessCallback();
                      },
                      function (d) {
                          c.onPeerConnectionSetLocalDescriptionErrorCallback(d);
                      }
                  ))
                : console.log("ABTOPhoneUA(" + this.counter + "):onPeerConnectionCreateAnswerSuccessCallback(): RTCPeerConnection bad state!");
    else console.warn("SimpleWebRtcSipPhone:onPeerConnectionCreateAnswerSuccessCallback(): this.peerConnection is null, bug in state machine!");
};
ABTOPhoneUA.prototype.onPeerConnectionCreateAnswerErrorCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionCreateAnswerErrorCallback():error=" + a);
};
ABTOPhoneUA.prototype.onPeerConnectionSetRemoteDescriptionSuccessCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionSuccessCallback()");
    if (null != this.peerConnection[a])
        if (
            (console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionSuccessCallback(): this.peerConnection[index].readyState=" + this.peerConnection[a].readyState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionSuccessCallback(): this.peerConnection[index].iceGatheringState=" + this.peerConnection[a].iceGatheringState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionSuccessCallback(): this.peerConnection[index].iceState=" + this.peerConnection[a].iceState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionSuccessCallback: this.peerConnectionState[index]=" + this.peerConnectionState[a]),
            "answer-received" == this.peerConnectionState[a])
        ) {
            if (((this.peerConnectionState[a] = "established"), this.inited)) {
                if (this.checkConnection(twoByteHigh) && this.onEstablished)
                    try {
                        this.onEstablished(a, this.remoteUser[a].toString());
                    } catch (c) {
                        console.error("ABTOPhoneUA(" + this.counter + "):onEstablished(): caught exception:" + c);
                    }
                this.isConference && this.isConferenceInvited[a] && this.conference_sendContacts(a);
            }
        } else if ("offer-received" == this.peerConnectionState[a] || "update-received" == this.peerConnectionState[a]) {
            var b = this;
            this.peerConnection[a].createAnswer(
                function (c) {
                    b.onPeerConnectionCreateAnswerSuccessCallback(a, c);
                },
                function (c) {
                    b.onPeerConnectionCreateAnswerErrorCallback(c);
                }
            );
        } else console.log("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionSuccessCallback(): RTCPeerConnection bad state!");
    else console.warn("SimpleWebRtcSipPhone:onPeerConnectionSetRemoteDescriptionSuccessCallback(): this.peerConnection is null, bug in state machine!");
};
ABTOPhoneUA.prototype.onPeerConnectionSetRemoteDescriptionErrorCallback = function (a, b) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionErrorCallback():error=" + b);
    if (null != this.peerConnection[a])
        if (
            (console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionErrorCallback(): this.peerConnection.readyState=" + this.peerConnection[a].readyState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionErrorCallback(): this.peerConnection.iceGatheringState=" + this.peerConnection[a].iceGatheringState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionErrorCallback(): this.peerConnection.iceState=" + this.peerConnection[a].iceState),
            console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionSetRemoteDescriptionErrorCallback: this.peerConnectionState[index]=" + this.peerConnectionState[a]),
            "answer-received" == this.peerConnectionState[a])
        ) {
            if (this.inited && this.onEstablishError)
                try {
                    this.onEstablishError(a, 500, b);
                } catch (c) {
                    console.error("ABTOPhoneUA(" + this.counter + "):onEstablishError(): caught exception:" + c);
                }
            this.bye(a);
        } else ("offer-received" != this.peerConnectionState[a] && "update-received" != this.peerConnectionState[a]) || this.error(a);
    else console.warn("SimpleWebRtcSipPhone:onPeerConnectionSetRemoteDescriptionErrorCallback(): this.peerConnection is null, bug in state machine!");
    console.log("onPeerConnectionSetRemoteDescriptionErrorCallback error:" + b);
};
ABTOPhoneUA.prototype.onPeerConnectionIceNegotationNeededCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceNegotationNeededCallback():event=" + a);
};
ABTOPhoneUA.prototype.onPeerConnectionGatheringChangeCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionGatheringChangeCallback():event=" + a);
};
ABTOPhoneUA.prototype.onPeerConnectionIceChangeCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIceChangeCallback():event=" + a);
};
ABTOPhoneUA.prototype.onPeerConnectionIdentityResultCallback = function (a) {
    console.debug("ABTOPhoneUA(" + this.counter + "):onPeerConnectionIdentityResultCallback():event=" + a);
};
ABTOPhoneUA.prototype.checkConnection = function (a) {
    if (16777215 > a) {
        this.connectionProvider && clearTimeout(this.connectionProvider);
        var b = this;
        b.connectionProvider = setTimeout(function () {
            b.processTimeout(a, b.connectionProvider);
            clearTimeout(b.connectionProvider);
            b.connectionProvider = null;
        }, a);
    }
    return a;
};
ABTOPhoneUA.prototype.getDTMFSender = function (a) {
    this.dtmfSender[a] = this.peerConnection[a].getSenders ? this.peerConnection[a].getSenders()[0].dtmf : this.peerConnection[a].createDTMFSender(this.localAudioVideoMediaStream.getAudioTracks[0]);
};
ABTOPhoneUA.prototype.accept = function (a) {
    try {
        this.createPeerConnection(a);
        this.peerConnection[a].addStream(this.localAudioVideoMediaStream, null);
        this.getDTMFSender(a);
        var b = this.jainSipInvitedReceivedRequest[a].getContent();
        this.maxVideoBandwidth && -1 == b.indexOf("b=AS:") && (b = b.replace(/(m=video.*\r\nc=IN.*\r\n)/m, "$1b=AS:" + this.maxVideoBandwidth + "\r\n"));
        var c = new RTCSessionDescription({ type: "offer", sdp: b }),
            d = this;
        this.peerConnectionState[a] = "offer-received";
        this.peerConnection[a].setRemoteDescription(
            c,
            function () {
                d.onPeerConnectionSetRemoteDescriptionSuccessCallback(a);
            },
            function (f) {
                d.onPeerConnectionSetRemoteDescriptionErrorCallback(a, f);
            }
        );
    } catch (f) {
        return (
            (b = this.jainSipInvitedReceivedRequest[a].createResponse(480, "Temporarily Unavailable")),
            b.addHeader(this.jainSipContactHeader),
            b.addHeader(this.jainSipUserAgentHeader),
            this.jainSipInvitedTransaction[a].sendResponse(b),
            this.closePeerConnection(a),
            console.error("ABTOPhoneUA(" + this.counter + "):accept(): caught exception:" + f),
            !1
        );
    }
    return !0;
};
ABTOPhoneUA.prototype.reject = function (a) {
    var b = this.jainSipInvitedReceivedRequest[a].createResponse(486, "Busy Here");
    b.addHeader(this.jainSipUserAgentHeader);
    this.jainSipInvitedTransaction[a].sendResponse(b);
    this.closePeerConnection(a);
};
ABTOPhoneUA.prototype.error = function (a) {
    var b = this.jainSipInvitedReceivedRequest[a].createResponse(500, "Error");
    b.addHeader(this.jainSipContactHeader);
    b.addHeader(this.jainSipUserAgentHeader);
    this.jainSipInvitedTransaction[a].sendResponse(b);
    this.closePeerConnection(a);
};
ABTOPhoneUA.prototype.respond480 = function (a) {
    var b = a.getRequest().createResponse(480, "Temporarily Unavailable");
    b.addHeader(this.jainSipRegisterSentRequest.getHeader("User-Agent"));
    a.getServerTransaction().sendMessage(b);
};
