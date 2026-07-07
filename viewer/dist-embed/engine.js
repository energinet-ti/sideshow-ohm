//#region node_modules/solid-js/dist/solid.js
var e = {
	context: void 0,
	registry: void 0,
	effects: void 0,
	done: !1,
	getContextId() {
		return t(this.context.count);
	},
	getNextContextId() {
		return t(this.context.count++);
	}
};
function t(t) {
	let n = String(t), r = n.length - 1;
	return e.context.id + (r ? String.fromCharCode(96 + r) : "") + n;
}
function n(t) {
	e.context = t;
}
function r() {
	return {
		...e.context,
		id: e.getNextContextId(),
		count: 0
	};
}
var i = (e, t) => e === t, a = Symbol("solid-proxy"), o = Symbol("solid-track"), s = { equals: i }, c = null, l = be, u = 1, d = 2, f = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, p = null, m = null, h = null, g = null, _ = null, v = null, y = null, ee = 0;
function te(e, t) {
	let n = _, r = p, i = e.length === 0, a = t === void 0 ? r : t, o = i ? f : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => C(() => E(o)));
	p = o, _ = null;
	try {
		return T(s, !0);
	} finally {
		_ = n, p = r;
	}
}
function b(e, t) {
	t = t ? Object.assign({}, s, t) : s;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [pe.bind(n), (e) => (typeof e == "function" && (e = m && m.running && m.sources.has(n) ? e(n.tValue) : e(n.value)), me(n, e))];
}
function x(e, t, n) {
	let r = _e(e, t, !1, u);
	h && m && m.running ? v.push(r) : he(r);
}
function ne(e, t, n) {
	l = Se;
	let r = _e(e, t, !1, u), i = fe && ue(fe);
	i && (r.suspense = i), (!n || !n.render) && (r.user = !0), y ? y.push(r) : he(r);
}
function S(e, t, n) {
	n = n ? Object.assign({}, s, n) : s;
	let r = _e(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, h && m && m.running ? (r.tState = u, v.push(r)) : he(r), pe.bind(r);
}
function re(e) {
	return T(e, !1);
}
function C(e) {
	if (!g && _ === null) return e();
	let t = _;
	_ = null;
	try {
		return g ? g.untrack(e) : e();
	} finally {
		_ = t;
	}
}
function ie(e) {
	ne(() => C(e));
}
function w(e) {
	return p === null || (p.cleanups === null ? p.cleanups = [e] : p.cleanups.push(e)), e;
}
function ae() {
	return _;
}
function oe() {
	return p;
}
function se(e) {
	if (m && m.running) return e(), m.done;
	let t = _, n = p;
	return Promise.resolve().then(() => {
		_ = t, p = n;
		let r;
		return (h || fe) && (r = m ||= {
			sources: /* @__PURE__ */ new Set(),
			effects: [],
			promises: /* @__PURE__ */ new Set(),
			disposed: /* @__PURE__ */ new Set(),
			queue: /* @__PURE__ */ new Set(),
			running: !0
		}, r.done ||= new Promise((e) => r.resolve = e), r.running = !0), T(e, !1), _ = p = null, r ? r.done : void 0;
	});
}
var [ce, le] = /*@__PURE__*/ b(!1);
function ue(e) {
	let t;
	return p && p.context && (t = p.context[e.id]) !== void 0 ? t : e.defaultValue;
}
function de(e) {
	let t = S(e), n = S(() => ke(t()));
	return n.toArray = () => {
		let e = n();
		return Array.isArray(e) ? e : e == null ? [] : [e];
	}, n;
}
var fe;
function pe() {
	let e = m && m.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === u) he(this);
	else {
		let e = v;
		v = null, T(() => Ce(this), !1), v = e;
	}
	if (_) {
		let e = this.observers;
		if (!e || e[e.length - 1] !== _) {
			let t = e ? e.length : 0;
			_.sources ? (_.sources.push(this), _.sourceSlots.push(t)) : (_.sources = [this], _.sourceSlots = [t]), e ? (e.push(_), this.observerSlots.push(_.sources.length - 1)) : (this.observers = [_], this.observerSlots = [_.sources.length - 1]);
		}
	}
	return e && m.sources.has(this) ? this.tValue : this.value;
}
function me(e, t, n) {
	let r = m && m.running && m.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (m) {
			let r = m.running;
			(r || !n && m.sources.has(e)) && (m.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && T(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = m && m.running;
				r && m.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? v.push(n) : y.push(n), n.observers && we(n)), r ? n.tState = u : n.state = u);
			}
			if (v.length > 1e6) throw v = [], Error();
		}, !1);
	}
	return t;
}
function he(e) {
	if (!e.fn) return;
	E(e);
	let t = ee;
	ge(e, m && m.running && m.sources.has(e) ? e.tValue : e.value, t), m && !m.running && m.sources.has(e) && queueMicrotask(() => {
		T(() => {
			m && (m.running = !0), _ = p = e, ge(e, e.tValue, t), _ = p = null;
		}, !1);
	});
}
function ge(e, t, n) {
	let r, i = p, a = _;
	_ = p = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (m && m.running ? (e.tState = u, e.tOwned && e.tOwned.forEach(E), e.tOwned = void 0) : (e.state = u, e.owned && e.owned.forEach(E), e.owned = null)), e.updatedAt = n + 1, Oe(t);
	} finally {
		_ = a, p = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? me(e, r, !0) : m && m.running && e.pure ? (m.sources.has(e) || (e.value = r), m.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function _e(e, t, n, r = u, i) {
	let a = {
		fn: e,
		state: r,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: t,
		owner: p,
		context: p ? p.context : null,
		pure: n
	};
	if (m && m.running && (a.state = 0, a.tState = r), p === null || p !== f && (m && m.running && p.pure ? p.tOwned ? p.tOwned.push(a) : p.tOwned = [a] : p.owned ? p.owned.push(a) : p.owned = [a]), g && a.fn) {
		let e = a.fn, [t, n] = b(void 0, { equals: !1 }), r = g.factory(e, n);
		w(() => r.dispose());
		let i, o = () => se(n).then(() => {
			i &&= (i.dispose(), void 0);
		});
		a.fn = (n) => (t(), m && m.running ? (i ||= g.factory(e, o), i.track(n)) : r.track(n));
	}
	return a;
}
function ve(e) {
	let t = m && m.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === d) return Ce(e);
	if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ee);) {
		if (t && m.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (m.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === u) he(e);
		else if ((t ? e.tState : e.state) === d) {
			let t = v;
			v = null, T(() => Ce(e, n[0]), !1), v = t;
		}
	}
}
function T(e, t) {
	if (v) return e();
	let n = !1;
	t || (v = []), y ? n = !0 : y = [], ee++;
	try {
		let t = e();
		return ye(n), t;
	} catch (e) {
		n || (y = null), v = null, Oe(e);
	}
}
function ye(e) {
	if (v &&= (h && m && m.running ? xe(v) : be(v), null), e) return;
	let t;
	if (m) {
		if (!m.promises.size && !m.queue.size) {
			let e = m.sources, n = m.disposed;
			y.push.apply(y, m.effects), t = m.resolve;
			for (let e of y) "tState" in e && (e.state = e.tState), delete e.tState;
			m = null, T(() => {
				for (let e of n) E(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) E(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				le(!1);
			}, !1);
		} else if (m.running) {
			m.running = !1, m.effects.push.apply(m.effects, y), y = null, le(!0);
			return;
		}
	}
	let n = y;
	y = null, n.length && T(() => l(n), !1), t && t();
}
function be(e) {
	for (let t = 0; t < e.length; t++) ve(e[t]);
}
function xe(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = m.queue;
		r.has(n) || (r.add(n), h(() => {
			r.delete(n), T(() => {
				m.running = !0, ve(n);
			}, !1), m && (m.running = !1);
		}));
	}
}
function Se(t) {
	let r, i = 0;
	for (r = 0; r < t.length; r++) {
		let e = t[r];
		e.user ? t[i++] = e : ve(e);
	}
	if (e.context) {
		if (e.count) {
			e.effects ||= [], e.effects.push(...t.slice(0, i));
			return;
		}
		n();
	}
	for (e.effects && (e.done || !e.count) && (t = [...e.effects, ...t], i += e.effects.length, delete e.effects), r = 0; r < i; r++) ve(t[r]);
}
function Ce(e, t) {
	let n = m && m.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === u ? i !== t && (!i.updatedAt || i.updatedAt < ee) && ve(i) : e === d && Ce(i, t);
		}
	}
}
function we(e) {
	let t = m && m.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = d : r.state = d, r.pure ? v.push(r) : y.push(r), r.observers && we(r));
	}
}
function E(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) E(e.tOwned[t]);
		delete e.tOwned;
	}
	if (m && m.running && e.pure) Te(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) E(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	m && m.running ? e.tState = 0 : e.state = 0;
}
function Te(e, t) {
	if (t || (e.tState = 0, m.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) Te(e.owned[t]);
}
function Ee(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function De(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		Oe(e, n && n.owner || null);
	}
}
function Oe(e, t = p) {
	let n = c && t && t.context && t.context[c], r = Ee(e);
	if (!n) throw r;
	y ? y.push({
		fn() {
			De(r, n, t);
		},
		state: u
	}) : De(r, n, t);
}
function ke(e) {
	if (typeof e == "function" && !e.length) return ke(e());
	if (Array.isArray(e)) {
		let t = [];
		for (let n = 0; n < e.length; n++) {
			let r = ke(e[n]);
			if (Array.isArray(r)) if (r.length < 32768) t.push.apply(t, r);
			else for (let e = 0; e < r.length; e++) t.push(r[e]);
			else t.push(r);
		}
		return t;
	}
	return e;
}
var Ae = Symbol("fallback");
function je(e) {
	for (let t = 0; t < e.length; t++) e[t]();
}
function Me(e, t, n = {}) {
	let r = [], i = [], a = [], s = 0, c = t.length > 1 ? [] : null;
	return w(() => je(a)), () => {
		let l = e() || [], u = l.length, d, f;
		return l[o], C(() => {
			let e, t, o, m, h, g, _, v, y;
			if (u === 0) s !== 0 && (je(a), a = [], r = [], i = [], s = 0, c &&= []), n.fallback && (r = [Ae], i[0] = te((e) => (a[0] = e, n.fallback())), s = 1);
			else if (s === 0) {
				for (i = Array(u), f = 0; f < u; f++) r[f] = l[f], i[f] = te(p);
				s = u;
			} else {
				for (o = Array(u), m = Array(u), c && (h = Array(u)), g = 0, _ = Math.min(s, u); g < _ && r[g] === l[g]; g++);
				for (_ = s - 1, v = u - 1; _ >= g && v >= g && r[_] === l[v]; _--, v--) o[v] = i[_], m[v] = a[_], c && (h[v] = c[_]);
				for (e = /* @__PURE__ */ new Map(), t = Array(v + 1), f = v; f >= g; f--) y = l[f], d = e.get(y), t[f] = d === void 0 ? -1 : d, e.set(y, f);
				for (d = g; d <= _; d++) y = r[d], f = e.get(y), f !== void 0 && f !== -1 ? (o[f] = i[d], m[f] = a[d], c && (h[f] = c[d]), f = t[f], e.set(y, f)) : a[d]();
				for (f = g; f < u; f++) f in o ? (i[f] = o[f], a[f] = m[f], c && (c[f] = h[f], c[f](f))) : i[f] = te(p);
				i = i.slice(0, s = u), r = l.slice(0);
			}
			return i;
		});
		function p(e) {
			if (a[f] = e, c) {
				let [e, n] = b(f);
				return c[f] = n, t(l[f], e);
			}
			return t(l[f]);
		}
	};
}
var Ne = !1;
function D(t, i) {
	if (Ne && e.context) {
		let a = e.context;
		n(r());
		let o = C(() => t(i || {}));
		return n(a), o;
	}
	return C(() => t(i || {}));
}
var Pe = (e) => `Stale read from <${e}>.`;
function O(e) {
	let t = "fallback" in e && { fallback: () => e.fallback };
	return S(Me(() => e.each, e.children, t || void 0));
}
function k(e) {
	let t = e.keyed, n = S(() => e.when, void 0, void 0), r = t ? n : S(n, void 0, { equals: (e, t) => !e == !t });
	return S(() => {
		let i = r();
		if (i) {
			let a = e.children;
			return typeof a == "function" && a.length > 0 ? C(() => a(t ? i : () => {
				if (!C(r)) throw Pe("Show");
				return n();
			})) : a;
		}
		return e.fallback;
	}, void 0, void 0);
}
function Fe(e) {
	let t = de(() => e.children), n = S(() => {
		let e = t(), n = Array.isArray(e) ? e : [e], r = () => void 0;
		for (let e = 0; e < n.length; e++) {
			let t = e, i = n[e], a = r, o = S(() => a() ? void 0 : i.when, void 0, void 0), s = i.keyed ? o : S(o, void 0, { equals: (e, t) => !e == !t });
			r = () => a() || (s() ? [
				t,
				o,
				i
			] : void 0);
		}
		return r;
	});
	return S(() => {
		let t = n()();
		if (!t) return e.fallback;
		let [r, i, a] = t, o = a.children;
		return typeof o == "function" && o.length > 0 ? C(() => o(a.keyed ? i() : () => {
			if (C(n)()?.[0] !== r) throw Pe("Match");
			return i();
		})) : o;
	}, void 0, void 0);
}
function A(e) {
	return e;
}
//#endregion
//#region node_modules/solid-js/web/dist/web.js
var j = (e) => S(() => e());
function Ie(e, t, n) {
	let r = n.length, i = t.length, a = r, o = 0, s = 0, c = t[i - 1].nextSibling, l = null;
	for (; o < i || s < a;) {
		if (t[o] === n[s]) {
			o++, s++;
			continue;
		}
		for (; t[i - 1] === n[a - 1];) i--, a--;
		if (i === o) {
			let t = a < r ? s ? n[s - 1].nextSibling : n[a - s] : c;
			for (; s < a;) e.insertBefore(n[s++], t);
		} else if (a === s) for (; o < i;) (!l || !l.has(t[o])) && t[o].remove(), o++;
		else if (t[o] === n[a - 1] && n[s] === t[i - 1]) {
			let r = t[--i].nextSibling;
			e.insertBefore(n[s++], t[o++].nextSibling), e.insertBefore(n[--a], r), t[i] = n[a];
		} else {
			if (!l) {
				l = /* @__PURE__ */ new Map();
				let e = s;
				for (; e < a;) l.set(n[e], e++);
			}
			let r = l.get(t[o]);
			if (r != null) if (s < r && r < a) {
				let c = o, u = 1, d;
				for (; ++c < i && c < a && !((d = l.get(t[c])) == null || d !== r + u);) u++;
				if (u > r - s) {
					let i = t[o];
					for (; s < r;) e.insertBefore(n[s++], i);
				} else e.replaceChild(n[s++], t[o++]);
			} else o++;
			else t[o++].remove();
		}
	}
}
var Le = "_$DX_DELEGATE";
function Re(e, t, n, r = {}) {
	let i;
	return te((r) => {
		i = r, t === document ? e() : P(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function M(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => C(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function ze(e, t = window.document) {
	let n = t[Le] || (t[Le] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, Ge));
	}
}
function N(e, t, n) {
	We(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Be(e, t) {
	We(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function Ve(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function He(e, t, n) {
	n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n);
}
function Ue(e, t, n) {
	return C(() => e(t, n));
}
function P(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return Ke(e, t, r, n);
	x((r) => Ke(e, t(), r, n), r);
}
function We(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function Ge(t) {
	if (e.registry && e.events && e.events.find(([e, n]) => n === t)) return;
	let n = t.target, r = `$$${t.type}`, i = t.target, a = t.currentTarget, o = (e) => Object.defineProperty(t, "target", {
		configurable: !0,
		value: e
	}), s = () => {
		let e = n[r];
		if (e && !n.disabled) {
			let i = n[`${r}Data`];
			if (i === void 0 ? e.call(n, t) : e.call(n, i, t), t.cancelBubble) return;
		}
		return n.host && typeof n.host != "string" && !n.host._$host && n.contains(t.target) && o(n.host), !0;
	}, c = () => {
		for (; s() && (n = n._$host || n.parentNode || n.host););
	};
	if (Object.defineProperty(t, "currentTarget", {
		configurable: !0,
		get() {
			return n || document;
		}
	}), e.registry && !e.done && (e.done = _$HY.done = !0), t.composedPath) {
		let e = t.composedPath();
		o(e[0]);
		for (let t = 0; t < e.length - 2 && (n = e[t], s()); t++) {
			if (n._$host) {
				n = n._$host, c();
				break;
			}
			if (n.parentNode === a) break;
		}
	} else c();
	o(i);
}
function Ke(e, t, n, r, i) {
	let a = We(e);
	if (a) {
		!n && (n = [...e.childNodes]);
		let t = [];
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			r.nodeType === 8 && r.data.slice(0, 2) === "!$" ? r.remove() : t.push(r);
		}
		n = t;
	}
	for (; typeof n == "function";) n = n();
	if (t === n) return n;
	let o = typeof t, s = r !== void 0;
	if (e = s && n[0] && n[0].parentNode || e, o === "string" || o === "number") {
		if (a || o === "number" && (t = t.toString(), t === n)) return n;
		if (s) {
			let i = n[0];
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = Ye(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = Ye(e, n, r);
	} else if (o === "function") return x(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = Ke(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (qe(o, t, n, i)) return x(() => n = Ke(e, o, n, r, !0)), () => n;
		if (a) {
			if (!o.length) return n;
			if (r === void 0) return n = [...e.childNodes];
			let t = o[0];
			if (t.parentNode !== e) return n;
			let i = [t];
			for (; (t = t.nextSibling) !== r;) i.push(t);
			return n = i;
		}
		if (o.length === 0) {
			if (n = Ye(e, n, r), s) return n;
		} else c ? n.length === 0 ? Je(e, o, r) : Ie(e, n, o) : (n && Ye(e), Je(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = Ye(e, n, r, t);
			Ye(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function qe(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = qe(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = qe(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function Je(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function Ye(e, t, n, r) {
	if (n === void 0) return e.textContent = "";
	let i = r || document.createTextNode("");
	if (t.length) {
		let r = !1;
		for (let a = t.length - 1; a >= 0; a--) {
			let o = t[a];
			if (i !== o) {
				let t = o.parentNode === e;
				!r && !a ? t ? e.replaceChild(i, o) : e.insertBefore(i, n) : t && o.remove();
			} else r = !0;
		}
	} else e.insertBefore(i, n);
	return [i];
}
//#endregion
//#region viewer/src/agentMarks.tsx
var Xe = /*#__PURE__*/ M("<svg class=agent-mark viewBox=\"0 0 24 24\"width=13 height=13 stroke-linecap=round stroke-linejoin=round aria-hidden=true>"), Ze = /*#__PURE__*/ M("<svg><rect width=18 height=18 x=3 y=3 rx=2></svg>", !1, !0, !1), Qe = /*#__PURE__*/ M("<svg><path d=\"m7 11 2-2-2-2\"></svg>", !1, !0, !1), $e = /*#__PURE__*/ M("<svg><path d=\"M11 13h4\"></svg>", !1, !0, !1), et = /*#__PURE__*/ M("<svg><path d=\"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z\"></svg>", !1, !0, !1), tt = /*#__PURE__*/ M("<svg><path d=\"M22 24H2V0h20zM17 4.8H7v14.4h10z\"></svg>", !1, !0, !1), nt = /*#__PURE__*/ M("<svg><path d=\"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23\"></svg>", !1, !0, !1), rt = /*#__PURE__*/ M("<svg><path d=\"M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z\"></svg>", !1, !0, !1), it = /*#__PURE__*/ M("<svg><path d=\"M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z\"></svg>", !1, !0, !1);
function at(e) {
	return (() => {
		var t = Xe();
		return P(t, () => e.children), x((n) => {
			var r = e.stroke ? "none" : "currentColor", i = e.stroke ? "currentColor" : void 0, a = e.stroke ? "2" : void 0;
			return r !== n.e && N(t, "fill", n.e = r), i !== n.t && N(t, "stroke", n.t = i), a !== n.a && N(t, "stroke-width", n.a = a), n;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		}), t;
	})();
}
function ot() {
	return D(at, {
		stroke: !0,
		get children() {
			return [
				Ze(),
				Qe(),
				$e()
			];
		}
	});
}
function st() {
	return D(at, { get children() {
		return et();
	} });
}
function ct() {
	return D(at, { get children() {
		return tt();
	} });
}
function lt() {
	return D(at, { get children() {
		return nt();
	} });
}
function ut() {
	return D(at, { get children() {
		return rt();
	} });
}
function dt() {
	return D(at, { get children() {
		return it();
	} });
}
function ft(e) {
	let t = e.agent.trim().toLowerCase(), n = (...e) => e.some((e) => t.includes(e));
	return D(Fe, {
		get fallback() {
			return D(ot, {});
		},
		get children() {
			return [
				D(A, {
					get when() {
						return n("claude");
					},
					get children() {
						return D(st, {});
					}
				}),
				D(A, {
					get when() {
						return n("opencode");
					},
					get children() {
						return D(ct, {});
					}
				}),
				D(A, {
					get when() {
						return n("cursor");
					},
					get children() {
						return D(lt, {});
					}
				}),
				D(A, {
					get when() {
						return n("copilot");
					},
					get children() {
						return D(ut, {});
					}
				}),
				D(A, {
					get when() {
						return n("gemini", "google");
					},
					get children() {
						return D(dt, {});
					}
				})
			];
		}
	});
}
//#endregion
//#region viewer/src/host.ts
var F = {
	asideHead: "ss:aside-head",
	asideFoot: "ss:aside-foot",
	asideEmpty: "ss:aside-empty",
	empty: "ss:empty",
	sessionActions: "ss:session-actions",
	main: "ss:main"
}, I = document, pt = null, mt = null;
function ht(e, t) {
	I = e, pt = t;
}
function gt() {
	return I;
}
function _t() {
	return I !== document;
}
function vt() {
	return I instanceof Document ? I.head : I;
}
function yt() {
	return I instanceof Document ? I.body : I.host;
}
function L() {
	return pt || (mt ??= bt());
}
function bt() {
	let e = window.__SIDESHOW_BASE_PATH__ ?? "", t = /* @__PURE__ */ new Set(), n = () => {
		let t = location.pathname.startsWith(e) ? location.pathname.slice(e.length) : location.pathname, n = new URLSearchParams(location.search).get("surface") ?? void 0, r = t.match(/^\/session\/([^/]+)(?:\/[sp]\/([^/]+))?/);
		if (r) return {
			sessionId: r[1],
			surfaceId: r[2] ?? n
		};
		let i = t.match(/^\/[sp]\/([^/]+)/);
		return i ? { surfaceId: i[1] } : { surfaceId: n };
	}, r = (t) => t.sessionId ? t.surfaceId ? `${e}/session/${t.sessionId}/p/${t.surfaceId}` : `${e}/session/${t.sessionId}` : t.surfaceId ? `${e}/p/${t.surfaceId}` : e || "/";
	return window.addEventListener("popstate", () => {
		let e = n();
		for (let n of t) n(e);
	}), {
		basePath: e,
		router: {
			get: n,
			navigate: (e, t) => {
				let n = r(e);
				t?.replace ? history.replaceState(null, "", n) : location.pathname !== n && history.pushState(null, "", n);
			},
			subscribe: (e) => (t.add(e), () => t.delete(e))
		}
	};
}
//#endregion
//#region viewer/src/api.ts
function xt() {
	return L().basePath;
}
function R(e) {
	return `${xt()}${e}`;
}
function z() {
	return L().readonly ?? !!window.__SIDESHOW_READONLY__;
}
function St() {
	return window.__SIDESHOW_PUBLIC_READ__;
}
function Ct() {
	return window.__SIDESHOW_PAGE_TITLE__;
}
function wt() {
	return L().layout ?? (St() === "session" ? "stream" : "full");
}
function Tt(e) {
	return `${location.origin}${R(`/p/${encodeURIComponent(e)}`)}`;
}
function Et(e) {
	return `${location.origin}${R(`/p/${encodeURIComponent(e)}.png`)}`;
}
function Dt() {
	return L().screenshots ?? !!window.__SIDESHOW_SCREENSHOTS__;
}
function Ot() {
	let e = window.__SIDESHOW_CHROME__ ?? {};
	return {
		themePicker: e.themePicker !== !1,
		docLinks: e.docLinks !== !1,
		claudeConnect: e.claudeConnect !== !1
	};
}
async function B(e, t) {
	let n = await fetch(R(e), t ? {
		headers: { "content-type": "application/json" },
		...t
	} : void 0);
	if (!n.ok) {
		let e = await n.json().catch(() => ({}));
		throw Error(e.error || String(n.status));
	}
	return n.json();
}
var kt = (e) => e.title || e.agent + " session";
function At(e) {
	let t = (Date.now() - new Date(e).getTime()) / 1e3;
	return t < 60 ? "just now" : t < 3600 ? Math.floor(t / 60) + "m ago" : t < 86400 ? Math.floor(t / 3600) + "h ago" : new Date(e).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
}
//#endregion
//#region server/types.ts
var jt = [
	"html",
	"diff",
	"image",
	"trace",
	"markdown",
	"terminal",
	"mermaid",
	"json",
	"code"
], Mt = {
	html: {
		contentField: "html",
		sandboxed: !0
	},
	diff: {
		contentField: "patch",
		sandboxed: !0,
		frameClass: "diffframe"
	},
	image: { sandboxed: !1 },
	trace: { sandboxed: !1 },
	markdown: {
		contentField: "markdown",
		sandboxed: !0,
		frameClass: "mdframe"
	},
	terminal: {
		contentField: "text",
		sandboxed: !0,
		frameClass: "termframe"
	},
	mermaid: {
		contentField: "mermaid",
		sandboxed: !0,
		frameClass: "mermaidframe"
	},
	json: {
		contentField: "data",
		sandboxed: !1
	},
	code: {
		contentField: "code",
		sandboxed: !0,
		frameClass: "codeframe"
	}
};
jt.join(", "), jt.filter((e) => Mt[e].sandboxed), jt.filter((e) => !Mt[e].sandboxed), Object.fromEntries(jt.flatMap((e) => {
	let t = Mt[e], n = "contentField" in t ? t.contentField : void 0;
	return n ? [[e, n]] : [];
}));
var Nt = Object.fromEntries(jt.flatMap((e) => {
	let t = Mt[e], n = "frameClass" in t ? t.frameClass : void 0;
	return n ? [[e, n]] : [];
}));
function Pt(e) {
	return typeof e == "string" && Object.hasOwn(Mt, e);
}
function Ft(e) {
	return Pt(e) && Mt[e].sandboxed;
}
//#endregion
//#region viewer/src/icons.tsx
var It = /*#__PURE__*/ M("<svg viewBox=\"0 0 24 24\"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round aria-hidden=true>"), Lt = /*#__PURE__*/ M("<svg><path d=\"M15 3h6v6\"></svg>", !1, !0, !1), Rt = /*#__PURE__*/ M("<svg><path d=\"M10 14 21 3\"></svg>", !1, !0, !1), zt = /*#__PURE__*/ M("<svg><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6\"></svg>", !1, !0, !1), Bt = /*#__PURE__*/ M("<svg><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></svg>", !1, !0, !1), Vt = /*#__PURE__*/ M("<svg><path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"></svg>", !1, !0, !1), Ht = /*#__PURE__*/ M("<svg><circle cx=12 cy=10 r=3></svg>", !1, !0, !1), Ut = /*#__PURE__*/ M("<svg><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></svg>", !1, !0, !1), Wt = /*#__PURE__*/ M("<svg><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></svg>", !1, !0, !1), Gt = /*#__PURE__*/ M("<svg><rect width=18 height=18 x=3 y=3 rx=2 ry=2></svg>", !1, !0, !1), Kt = /*#__PURE__*/ M("<svg><circle cx=9 cy=9 r=2></svg>", !1, !0, !1), qt = /*#__PURE__*/ M("<svg><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"></svg>", !1, !0, !1), Jt = /*#__PURE__*/ M("<svg><path d=\"M12 22v-5\"></svg>", !1, !0, !1), Yt = /*#__PURE__*/ M("<svg><path d=\"M9 8V2\"></svg>", !1, !0, !1), Xt = /*#__PURE__*/ M("<svg><path d=\"M15 8V2\"></svg>", !1, !0, !1), Zt = /*#__PURE__*/ M("<svg><path d=\"M18 8v5a4 4 0 0 1-4 5h-4a4 4 0 0 1-4-5V8Z\"></svg>", !1, !0, !1), Qt = /*#__PURE__*/ M("<svg><rect width=20 height=14 x=2 y=3 rx=2></svg>", !1, !0, !1), $t = /*#__PURE__*/ M("<svg><path d=\"M8 21h8\"></svg>", !1, !0, !1), en = /*#__PURE__*/ M("<svg><path d=\"M12 17v4\"></svg>", !1, !0, !1), tn = /*#__PURE__*/ M("<svg><path d=\"m15.2 10.2.6-.3\"></svg>", !1, !0, !1), nn = /*#__PURE__*/ M("<svg><path d=\"m8.2 13.8.6-.3\"></svg>", !1, !0, !1), rn = /*#__PURE__*/ M("<svg><path d=\"m13.5 13.5.3.6\"></svg>", !1, !0, !1), an = /*#__PURE__*/ M("<svg><path d=\"m10.2 6.2.3.6\"></svg>", !1, !0, !1), on = /*#__PURE__*/ M("<svg><circle cx=12 cy=10 r=2></svg>", !1, !0, !1), sn = /*#__PURE__*/ M("<svg><circle cx=12 cy=12 r=4></svg>", !1, !0, !1), cn = /*#__PURE__*/ M("<svg><path d=\"M12 2v2\"></svg>", !1, !0, !1), ln = /*#__PURE__*/ M("<svg><path d=\"M12 20v2\"></svg>", !1, !0, !1), un = /*#__PURE__*/ M("<svg><path d=\"m4.93 4.93 1.41 1.41\"></svg>", !1, !0, !1), dn = /*#__PURE__*/ M("<svg><path d=\"m17.66 17.66 1.41 1.41\"></svg>", !1, !0, !1), fn = /*#__PURE__*/ M("<svg><path d=\"M2 12h2\"></svg>", !1, !0, !1), pn = /*#__PURE__*/ M("<svg><path d=\"M20 12h2\"></svg>", !1, !0, !1), mn = /*#__PURE__*/ M("<svg><path d=\"m6.34 17.66-1.41 1.41\"></svg>", !1, !0, !1), hn = /*#__PURE__*/ M("<svg><path d=\"m19.07 4.93-1.41 1.41\"></svg>", !1, !0, !1), gn = /*#__PURE__*/ M("<svg><path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"></svg>", !1, !0, !1), _n = /*#__PURE__*/ M("<svg><path d=\"M3 6h18\"></svg>", !1, !0, !1), vn = /*#__PURE__*/ M("<svg><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"></svg>", !1, !0, !1), yn = /*#__PURE__*/ M("<svg><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></svg>", !1, !0, !1), bn = /*#__PURE__*/ M("<svg><line x1=10 x2=10 y1=11 y2=17></svg>", !1, !0, !1), xn = /*#__PURE__*/ M("<svg><line x1=14 x2=14 y1=11 y2=17></svg>", !1, !0, !1);
function V(e) {
	return (() => {
		var t = It();
		return P(t, () => e.children), t;
	})();
}
function Sn() {
	return D(V, { get children() {
		return [
			Lt(),
			Rt(),
			zt()
		];
	} });
}
function Cn() {
	return D(V, { get children() {
		return Bt();
	} });
}
function wn() {
	return D(V, { get children() {
		return [Vt(), Ht()];
	} });
}
function Tn() {
	return D(V, { get children() {
		return [Ut(), Wt()];
	} });
}
function En() {
	return D(V, { get children() {
		return [
			Gt(),
			Kt(),
			qt()
		];
	} });
}
function Dn() {
	return D(V, { get children() {
		return [
			Jt(),
			Yt(),
			Xt(),
			Zt()
		];
	} });
}
function On() {
	return D(V, { get children() {
		return [
			Qt(),
			$t(),
			en(),
			tn(),
			nn(),
			rn(),
			an(),
			on()
		];
	} });
}
function kn() {
	return D(V, { get children() {
		return [
			sn(),
			cn(),
			ln(),
			un(),
			dn(),
			fn(),
			pn(),
			mn(),
			hn()
		];
	} });
}
function An() {
	return D(V, { get children() {
		return gn();
	} });
}
function jn() {
	return D(V, { get children() {
		return [
			_n(),
			vn(),
			yn(),
			bn(),
			xn()
		];
	} });
}
//#endregion
//#region viewer/src/ImageSurface.tsx
var Mn = /*#__PURE__*/ M("<a target=_blank rel=noopener><img class=asset-img loading=lazy>", !0, !1, !1), Nn = /*#__PURE__*/ M("<div class=asset-caption>"), Pn = /*#__PURE__*/ M("<div class=image-surface>"), Fn = /*#__PURE__*/ M("<div class=asset-gone>Image unavailable — it may have been evicted.");
function In(e) {
	let [t, n] = b(!1), r = () => R(`/a/${encodeURIComponent(e.surface.assetId)}`);
	return (() => {
		var i = Pn();
		return P(i, D(k, {
			get when() {
				return !t();
			},
			get fallback() {
				return Fn();
			},
			get children() {
				return [(() => {
					var t = Mn(), i = t.firstChild;
					return i.addEventListener("error", () => n(!0)), x((n) => {
						var a = r(), o = r(), s = e.surface.alt ?? e.surface.caption ?? "uploaded image";
						return a !== n.e && N(t, "href", n.e = a), o !== n.t && N(i, "src", n.t = o), s !== n.a && N(i, "alt", n.a = s), n;
					}, {
						e: void 0,
						t: void 0,
						a: void 0
					}), t;
				})(), D(k, {
					get when() {
						return e.surface.caption;
					},
					get children() {
						var t = Nn();
						return P(t, () => e.surface.caption), t;
					}
				})];
			}
		})), i;
	})();
}
//#endregion
//#region viewer/src/JsonSurface.tsx
var Ln = /*#__PURE__*/ M("<div class=json-surface>"), Rn = /*#__PURE__*/ M("<span class=json-toggle> "), zn = /*#__PURE__*/ M("<span class=json-children><span class=json-close>"), Bn = /*#__PURE__*/ M("<span class=json-empty>"), Vn = /*#__PURE__*/ M("<span class=json-summary> <!> "), Hn = /*#__PURE__*/ M("<span class=json-key>\"<!>\""), Un = /*#__PURE__*/ M("<span class=json-colon>: "), Wn = /*#__PURE__*/ M("<span class=json-comma>,"), Gn = /*#__PURE__*/ M("<span class=json-child>"), Kn = /*#__PURE__*/ M("<span>");
function qn(e) {
	return (() => {
		var t = Ln();
		return P(t, D(Jn, {
			get value() {
				return e.surface.data;
			},
			depth: 0
		})), t;
	})();
}
function Jn(e) {
	let t = () => typeof e.value == "object" && e.value !== null;
	return D(k, {
		get when() {
			return t();
		},
		get fallback() {
			return D(Xn, { get value() {
				return e.value;
			} });
		},
		get children() {
			return D(Yn, {
				get value() {
					return e.value;
				},
				get depth() {
					return e.depth;
				}
			});
		}
	});
}
function Yn(e) {
	let [t, n] = b(e.depth === 0), r = () => Array.isArray(e.value), i = () => r() ? e.value.map((e, t) => [String(t), e]) : Object.entries(e.value), a = () => i().length, o = () => r() ? "[" : "{", s = () => r() ? "]" : "}", c = () => r() ? `${a()} item${a() === 1 ? "" : "s"}` : `${a()} key${a() === 1 ? "" : "s"}`;
	return D(k, {
		get when() {
			return a() > 0;
		},
		get fallback() {
			return (() => {
				var e = Bn();
				return P(e, o, null), P(e, s, null), e;
			})();
		},
		get children() {
			return [(() => {
				var e = Rn(), r = e.firstChild;
				return e.$$click = () => n(!t()), P(e, () => t() ? "▾" : "▸", r), P(e, o, null), e;
			})(), D(k, {
				get when() {
					return t();
				},
				get fallback() {
					return (() => {
						var e = Vn(), t = e.firstChild.nextSibling;
						return t.nextSibling, P(e, c, t), P(e, s, null), e;
					})();
				},
				get children() {
					var t = zn(), n = t.firstChild;
					return P(t, D(O, {
						get each() {
							return i();
						},
						children: ([t, n], a) => (() => {
							var o = Gn();
							return P(o, D(k, {
								get when() {
									return !r();
								},
								get children() {
									return [(() => {
										var e = Hn(), n = e.firstChild.nextSibling;
										return n.nextSibling, P(e, t, n), e;
									})(), Un()];
								}
							}), null), P(o, D(Jn, {
								value: n,
								get depth() {
									return e.depth + 1;
								}
							}), null), P(o, D(k, {
								get when() {
									return a() < i().length - 1;
								},
								get children() {
									return Wn();
								}
							}), null), o;
						})()
					}), n), P(n, s), t;
				}
			})];
		}
	});
}
function Xn(e) {
	let t = () => e.value === null ? "null" : typeof e.value == "string" ? "string" : typeof e.value == "number" ? "number" : typeof e.value == "boolean" ? "boolean" : "other", n = () => e.value === null ? "null" : typeof e.value == "string" ? `"${e.value}"` : String(e.value);
	return (() => {
		var e = Kn();
		return P(e, n), x(() => Be(e, `json-value json-${t()}`)), e;
	})();
}
ze(["click"]);
//#endregion
//#region server/themes.ts
function Zn(e) {
	return {
		bg: e.bg,
		panel: e.panel,
		surface: e.surface,
		text: e.text,
		muted: e.muted,
		faint: e.faint,
		border: e.border,
		"border-2": e.border2,
		accent: e.info.text,
		"accent-bg": e.info.bg,
		hover: e.hover,
		danger: e.danger.text
	};
}
function Qn(e) {
	return {
		"term-bg": e.bg,
		"term-bar": e.panel,
		"term-fg": e.text,
		"term-title": e.muted
	};
}
var $n = (e) => Object.entries(e).map(([e, t]) => `--${e}: ${t};`).join("");
function er(e, t, n) {
	return n === "light" ? `:root{${$n(e)}}` : n === "dark" ? `:root{${$n(t)}}` : `:root{${$n(e)}}@media (prefers-color-scheme: dark){:root{${$n(t)}}}`;
}
function tr(e, t) {
	return `${er(Zn(e.light), Zn(e.dark), t)}:root{${$n(Qn(e.dark))}}`;
}
var nr = [
	{
		id: "github",
		label: "GitHub",
		shiki: {
			light: "github-light",
			dark: "github-dark"
		},
		light: {
			bg: "#f6f8fa",
			panel: "#eaeef2",
			surface: "#ffffff",
			text: "#1f2328",
			muted: "#59636e",
			faint: "#818b98",
			border: "#d1d9e0",
			border2: "#afb8c1",
			hover: "#eaeef2",
			info: {
				bg: "#ddf4ff",
				text: "#0969da",
				border: "#54aeff"
			},
			success: {
				bg: "#dafbe1",
				text: "#1a7f37",
				border: "#4ac26b"
			},
			warning: {
				bg: "#fff8c5",
				text: "#9a6700",
				border: "#d4a72c"
			},
			danger: {
				bg: "#ffebe9",
				text: "#cf222e",
				border: "#ff8182"
			}
		},
		dark: {
			bg: "#0d1117",
			panel: "#161b22",
			surface: "#1c2128",
			text: "#e6edf3",
			muted: "#9198a1",
			faint: "#6e7681",
			border: "#30363d",
			border2: "#444c56",
			hover: "rgba(177, 186, 196, 0.12)",
			info: {
				bg: "rgba(56, 139, 253, 0.15)",
				text: "#4493f8",
				border: "#54aeff"
			},
			success: {
				bg: "rgba(63, 185, 80, 0.15)",
				text: "#3fb950",
				border: "#4ac26b"
			},
			warning: {
				bg: "rgba(210, 153, 34, 0.15)",
				text: "#d29922",
				border: "#d4a72c"
			},
			danger: {
				bg: "rgba(248, 81, 73, 0.15)",
				text: "#ff7b72",
				border: "#ff8182"
			}
		}
	},
	{
		id: "energinet",
		label: "Energinet",
		shiki: {
			light: "github-light",
			dark: "github-dark"
		},
		light: {
			bg: "#F5FAF9",
			panel: "#EEF7F5",
			surface: "#FFFFFF",
			text: "#293A4C",
			muted: "#4F7377",
			faint: "#6F9294",
			border: "#A0C1C2",
			border2: "#72A5A5",
			hover: "#E7F5F3",
			info: {
				bg: "#E7F5F3",
				text: "#00847C",
				border: "#008A8B"
			},
			success: {
				bg: "#ECF7E9",
				text: "#00847C",
				border: "#9FCD91"
			},
			warning: {
				bg: "#FFF6C8",
				text: "#8A6500",
				border: "#FFD424"
			},
			danger: {
				bg: "#FBEAE8",
				text: "#CE3E33",
				border: "#CE3E33"
			}
		},
		dark: {
			bg: "#071F26",
			panel: "#102F38",
			surface: "#0B3A43",
			text: "#EAF4F2",
			muted: "#A0C1C2",
			faint: "#72A5A5",
			border: "#2E6B73",
			border2: "#008A8B",
			hover: "#123F48",
			info: {
				bg: "#0B3A43",
				text: "#00A58D",
				border: "#008A8B"
			},
			success: {
				bg: "#113D37",
				text: "#9FCD91",
				border: "#00A58D"
			},
			warning: {
				bg: "#3D3614",
				text: "#FFD424",
				border: "#FFD424"
			},
			danger: {
				bg: "#3A2425",
				text: "#FF8A80",
				border: "#CE3E33"
			}
		}
	},
	{
		id: "gruvbox",
		label: "Gruvbox",
		shiki: {
			light: "gruvbox-light-hard",
			dark: "gruvbox-dark-hard"
		},
		light: {
			bg: "#f9f5d7",
			panel: "#ebdbb2",
			surface: "#fbf1c7",
			text: "#3c3836",
			muted: "#665c54",
			faint: "#928374",
			border: "#d5c4a1",
			border2: "#bdae93",
			hover: "#ebdbb2",
			info: {
				bg: "#d7e5e8",
				text: "#076678",
				border: "#458588"
			},
			success: {
				bg: "#e8ecc8",
				text: "#79740e",
				border: "#98971a"
			},
			warning: {
				bg: "#f5e6c8",
				text: "#b57614",
				border: "#d79921"
			},
			danger: {
				bg: "#fbe3d8",
				text: "#9d0006",
				border: "#cc241d"
			}
		},
		dark: {
			bg: "#1d2021",
			panel: "#282828",
			surface: "#32302f",
			text: "#ebdbb2",
			muted: "#a89984",
			faint: "#928374",
			border: "#504945",
			border2: "#665c54",
			hover: "#3c3836",
			info: {
				bg: "rgba(131, 165, 152, 0.18)",
				text: "#83a598",
				border: "#458588"
			},
			success: {
				bg: "rgba(184, 187, 38, 0.18)",
				text: "#b8bb26",
				border: "#98971a"
			},
			warning: {
				bg: "rgba(250, 189, 47, 0.18)",
				text: "#fabd2f",
				border: "#d79921"
			},
			danger: {
				bg: "rgba(251, 73, 52, 0.18)",
				text: "#fb4934",
				border: "#cc241d"
			}
		}
	},
	{
		id: "one",
		label: "One",
		shiki: {
			light: "one-light",
			dark: "one-dark-pro"
		},
		light: {
			bg: "#fafafa",
			panel: "#f0f0f1",
			surface: "#ffffff",
			text: "#383a42",
			muted: "#696c77",
			faint: "#a0a1a7",
			border: "#d4d4d6",
			border2: "#b9b9bd",
			hover: "#f0f0f1",
			info: {
				bg: "#e6effd",
				text: "#4078f2",
				border: "#88aef8"
			},
			success: {
				bg: "#e8f3e8",
				text: "#50a14f",
				border: "#97c997"
			},
			warning: {
				bg: "#faf0dd",
				text: "#986801",
				border: "#d9a441"
			},
			danger: {
				bg: "#fce8e8",
				text: "#e45649",
				border: "#ef9a92"
			}
		},
		dark: {
			bg: "#282c34",
			panel: "#21252b",
			surface: "#2f343d",
			text: "#abb2bf",
			muted: "#828997",
			faint: "#5c6370",
			border: "#3e4451",
			border2: "#545b66",
			hover: "#2c313a",
			info: {
				bg: "rgba(97, 175, 239, 0.16)",
				text: "#61afef",
				border: "#61afef"
			},
			success: {
				bg: "rgba(152, 195, 121, 0.16)",
				text: "#98c379",
				border: "#98c379"
			},
			warning: {
				bg: "rgba(229, 192, 123, 0.16)",
				text: "#e5c07b",
				border: "#e5c07b"
			},
			danger: {
				bg: "rgba(224, 108, 117, 0.16)",
				text: "#e06c75",
				border: "#e06c75"
			}
		}
	},
	{
		id: "solarized",
		label: "Solarized",
		shiki: {
			light: "solarized-light",
			dark: "solarized-dark"
		},
		light: {
			bg: "#eee8d5",
			panel: "#e3dcc9",
			surface: "#fdf6e3",
			text: "#586e75",
			muted: "#657b83",
			faint: "#93a1a1",
			border: "#d9d2bf",
			border2: "#c4bca6",
			hover: "#e3dcc9",
			info: {
				bg: "#dce9f3",
				text: "#268bd2",
				border: "#6aa9db"
			},
			success: {
				bg: "#ebedcf",
				text: "#859900",
				border: "#a8b520"
			},
			warning: {
				bg: "#f3ead0",
				text: "#b58900",
				border: "#cda632"
			},
			danger: {
				bg: "#f7dcd5",
				text: "#dc322f",
				border: "#e08b86"
			}
		},
		dark: {
			bg: "#002b36",
			panel: "#073642",
			surface: "#0a4250",
			text: "#93a1a1",
			muted: "#839496",
			faint: "#586e75",
			border: "#0f4b59",
			border2: "#1a5b6b",
			hover: "#073642",
			info: {
				bg: "rgba(38, 139, 210, 0.18)",
				text: "#268bd2",
				border: "#268bd2"
			},
			success: {
				bg: "rgba(133, 153, 0, 0.2)",
				text: "#859900",
				border: "#859900"
			},
			warning: {
				bg: "rgba(181, 137, 0, 0.2)",
				text: "#b58900",
				border: "#b58900"
			},
			danger: {
				bg: "rgba(220, 50, 47, 0.2)",
				text: "#dc322f",
				border: "#dc322f"
			}
		}
	},
	{
		id: "catppuccin",
		label: "Catppuccin",
		shiki: {
			light: "catppuccin-latte",
			dark: "catppuccin-mocha"
		},
		light: {
			bg: "#e6e9ef",
			panel: "#dce0e8",
			surface: "#eff1f5",
			text: "#4c4f69",
			muted: "#6c6f85",
			faint: "#8c8fa1",
			border: "#ccd0da",
			border2: "#bcc0cc",
			hover: "#dce0e8",
			info: {
				bg: "#dce4fb",
				text: "#1e66f5",
				border: "#7e9bf7"
			},
			success: {
				bg: "#dcecd6",
				text: "#40a02b",
				border: "#8cc47e"
			},
			warning: {
				bg: "#f7ead2",
				text: "#df8e1d",
				border: "#ebbe6f"
			},
			danger: {
				bg: "#f7d6dd",
				text: "#d20f39",
				border: "#e58a9c"
			}
		},
		dark: {
			bg: "#11111b",
			panel: "#181825",
			surface: "#1e1e2e",
			text: "#cdd6f4",
			muted: "#a6adc8",
			faint: "#7f849c",
			border: "#313244",
			border2: "#45475a",
			hover: "#313244",
			info: {
				bg: "rgba(137, 180, 250, 0.16)",
				text: "#89b4fa",
				border: "#89b4fa"
			},
			success: {
				bg: "rgba(166, 227, 161, 0.16)",
				text: "#a6e3a1",
				border: "#a6e3a1"
			},
			warning: {
				bg: "rgba(249, 226, 175, 0.16)",
				text: "#f9e2af",
				border: "#f9e2af"
			},
			danger: {
				bg: "rgba(243, 139, 168, 0.16)",
				text: "#f38ba8",
				border: "#f38ba8"
			}
		}
	},
	{
		id: "rose-pine",
		label: "Rosé Pine",
		shiki: {
			light: "rose-pine-dawn",
			dark: "rose-pine-moon"
		},
		light: {
			bg: "#faf4ed",
			panel: "#f2e9e1",
			surface: "#fffaf3",
			text: "#575279",
			muted: "#797593",
			faint: "#9893a5",
			border: "#dfdad9",
			border2: "#cecacd",
			hover: "#f4ede8",
			info: {
				bg: "#dde9ec",
				text: "#286983",
				border: "#56949f"
			},
			success: {
				bg: "#dcebed",
				text: "#56949f",
				border: "#56949f"
			},
			warning: {
				bg: "#f7ecd3",
				text: "#ea9d34",
				border: "#ea9d34"
			},
			danger: {
				bg: "#f5dfe3",
				text: "#b4637a",
				border: "#b4637a"
			}
		},
		dark: {
			bg: "#232136",
			panel: "#393552",
			surface: "#2a273f",
			text: "#e0def4",
			muted: "#908caa",
			faint: "#6e6a86",
			border: "#44415a",
			border2: "#56526e",
			hover: "#393552",
			info: {
				bg: "rgba(62, 143, 176, 0.18)",
				text: "#3e8fb0",
				border: "#3e8fb0"
			},
			success: {
				bg: "rgba(156, 207, 216, 0.16)",
				text: "#9ccfd8",
				border: "#9ccfd8"
			},
			warning: {
				bg: "rgba(246, 193, 119, 0.16)",
				text: "#f6c177",
				border: "#f6c177"
			},
			danger: {
				bg: "rgba(235, 111, 146, 0.16)",
				text: "#eb6f92",
				border: "#eb6f92"
			}
		}
	},
	{
		id: "everforest",
		label: "Everforest",
		shiki: {
			light: "everforest-light",
			dark: "everforest-dark"
		},
		light: {
			bg: "#f5f1e0",
			panel: "#efebd8",
			surface: "#fffbef",
			text: "#5c6a72",
			muted: "#829181",
			faint: "#939f91",
			border: "#e0dcc7",
			border2: "#cbc8b5",
			hover: "#efebd8",
			info: {
				bg: "#dceaf1",
				text: "#3a94c5",
				border: "#7bb6d6"
			},
			success: {
				bg: "#e8ecc8",
				text: "#8da101",
				border: "#b3bf55"
			},
			warning: {
				bg: "#f5ecca",
				text: "#dfa000",
				border: "#e6bf52"
			},
			danger: {
				bg: "#fadfd9",
				text: "#f85552",
				border: "#f49b97"
			}
		},
		dark: {
			bg: "#232a2e",
			panel: "#343f44",
			surface: "#2d353b",
			text: "#d3c6aa",
			muted: "#9da9a0",
			faint: "#7a8478",
			border: "#3d484d",
			border2: "#475258",
			hover: "#343f44",
			info: {
				bg: "rgba(127, 187, 179, 0.16)",
				text: "#7fbbb3",
				border: "#7fbbb3"
			},
			success: {
				bg: "rgba(167, 192, 128, 0.16)",
				text: "#a7c080",
				border: "#a7c080"
			},
			warning: {
				bg: "rgba(219, 188, 127, 0.16)",
				text: "#dbbc7f",
				border: "#dbbc7f"
			},
			danger: {
				bg: "rgba(230, 126, 128, 0.16)",
				text: "#e67e80",
				border: "#e67e80"
			}
		}
	}
], rr = "github";
function ir(e) {
	return nr.find((t) => t.id === e) ?? nr[0];
}
var ar = () => nr.map((e) => ({
	id: e.id,
	label: e.label
})), or = [
	"--bg",
	"--panel",
	"--surface",
	"--text",
	"--muted",
	"--faint",
	"--border",
	"--border-2",
	"--accent",
	"--accent-bg",
	"--hover",
	"--danger"
];
function sr(e, t) {
	let n = Zn(e[t]), r = {};
	for (let e of or) r[e] = n[e.slice(2)];
	return r;
}
var cr = {
	light: sr(ir(rr), "light"),
	dark: sr(ir(rr), "dark")
}, lr = "sideshow:color-mode", ur = [
	"system",
	"light",
	"dark"
];
function dr() {
	try {
		let e = localStorage.getItem(lr);
		return ur.includes(e) ? e : "system";
	} catch {
		return "system";
	}
}
var [fr, pr] = b(rr), mr = fr, [hr, gr] = b(dr()), _r = hr, vr = typeof matchMedia == "function" ? matchMedia("(prefers-color-scheme: dark)") : null, [yr, br] = b(!!vr?.matches), xr = () => {
	let e = hr();
	return e === "system" ? yr() ? "dark" : "light" : e;
};
function Sr() {
	document.cookie = `sideshow_mode=${xr()};path=/;max-age=31536000;SameSite=Lax`;
}
Sr(), vr?.addEventListener("change", (e) => {
	br(e.matches), Sr(), hr() === "system" && Cr();
});
function Cr() {
	let e = fr(), t = xr();
	L().onThemeChange?.(sr(ir(e), t), {
		theme: e,
		mode: t
	});
}
var wr = "ss-theme-vars";
function Tr(e) {
	let t = vt(), n = t.querySelector(`#${wr}`);
	n || (n = document.createElement("style"), n.id = wr, t.appendChild(n));
	let r = hr(), i = r === "system" ? void 0 : r, a = `:root{color-scheme:${i ?? "light dark"};}`, o = `${tr(ir(e), i)}${a}`;
	n.textContent = _t() ? o.replace(/:root\b/g, ":host") : o;
}
function Er(e) {
	let t = ir(e);
	Tr(t.id), pr(t.id), Sr(), Cr();
}
async function Dr() {
	Er((await B("/api/theme").catch(() => null))?.id ?? "github");
}
async function Or(e) {
	Er(e), await B("/api/theme", {
		method: "PUT",
		body: JSON.stringify({ id: e })
	}).catch(() => null);
}
function kr(e) {
	gr(e);
	try {
		localStorage.setItem(lr, e);
	} catch {}
	Tr(fr()), Sr(), Cr();
}
//#endregion
//#region viewer/src/TraceSurface.tsx
var Ar = /*#__PURE__*/ M("<div class=asset-gone>"), jr = /*#__PURE__*/ M("<div class=trace-surface><div class=trace-head><span class=trace-title></span></div><ol class=trace-steps>"), Mr = /*#__PURE__*/ M("<a class=trace-dl target=_blank rel=noopener>download ↓"), Nr = /*#__PURE__*/ M("<span class=trace-kind>"), Pr = /*#__PURE__*/ M("<span class=trace-ts>"), Fr = /*#__PURE__*/ M("<pre class=trace-detail>"), Ir = /*#__PURE__*/ M("<li class=trace-step><div class=trace-row><span class=trace-label>");
function Lr(e) {
	let [t, n] = b(e.surface.steps ?? []), [r, i] = b(null), a = () => e.surface.assetId ? R(`/a/${encodeURIComponent(e.surface.assetId)}`) : null;
	return ie(() => {
		if ((e.surface.steps?.length ?? 0) > 0) return;
		let t = a();
		t && fetch(t).then((e) => e.ok ? e.text() : Promise.reject(Error(String(e.status)))).then((e) => n(zr(e))).catch(() => i("Trace file unavailable — it may have been evicted."));
	}), (() => {
		var n = jr(), i = n.firstChild, o = i.firstChild, s = i.nextSibling;
		return P(o, () => e.surface.title ?? "Agent trace"), P(i, D(k, {
			get when() {
				return a();
			},
			keyed: !0,
			children: (e) => (() => {
				var t = Mr();
				return N(t, "href", e), t;
			})()
		}), null), P(n, D(k, {
			get when() {
				return r();
			},
			get children() {
				var e = Ar();
				return P(e, r), e;
			}
		}), s), P(s, D(O, {
			get each() {
				return t();
			},
			children: (e) => D(Rr, { step: e })
		})), n;
	})();
}
function Rr(e) {
	let [t, n] = b(!1), r = () => !!e.step.detail;
	return (() => {
		var i = Ir(), a = i.firstChild, o = a.firstChild;
		return a.$$click = () => r() && n(!t()), P(a, D(k, {
			get when() {
				return e.step.kind;
			},
			get children() {
				var t = Nr();
				return P(t, () => e.step.kind), t;
			}
		}), o), P(o, () => e.step.label), P(a, D(k, {
			get when() {
				return e.step.ts;
			},
			get children() {
				var t = Pr();
				return P(t, () => e.step.ts), t;
			}
		}), null), P(i, D(k, {
			get when() {
				return j(() => !!r())() && t();
			},
			get children() {
				var t = Fr();
				return P(t, () => e.step.detail), t;
			}
		}), null), x((e) => {
			var n = !!t(), o = !!r();
			return n !== e.e && i.classList.toggle("open", e.e = n), o !== e.t && a.classList.toggle("clickable", e.t = o), e;
		}, {
			e: void 0,
			t: void 0
		}), i;
	})();
}
function zr(e) {
	let t = e.trim();
	if (!t) return [];
	let n = (e) => {
		if (typeof e == "string") return { label: e };
		if (e && typeof e == "object" && typeof e.label == "string") {
			let t = e;
			return {
				label: t.label,
				...typeof t.kind == "string" && { kind: t.kind },
				...typeof t.detail == "string" && { detail: t.detail },
				...typeof t.ts == "string" && { ts: t.ts }
			};
		}
		return null;
	};
	try {
		let e = JSON.parse(t);
		return (Array.isArray(e) ? e : [e]).map(n).filter((e) => e !== null);
	} catch {
		return t.split("\n").map((e) => e.trim()).filter(Boolean).map((e) => {
			try {
				return n(JSON.parse(e));
			} catch {
				return { label: e };
			}
		}).filter((e) => e !== null);
	}
}
ze(["click"]);
//#endregion
//#region node_modules/solid-js/store/dist/store.js
var Br = Symbol("store-raw"), H = Symbol("store-node"), U = Symbol("store-has"), Vr = Symbol("store-self");
function Hr(e) {
	let t = e[a];
	if (!t && (Object.defineProperty(e, a, { value: t = new Proxy(e, Jr) }), !Array.isArray(e))) {
		let n = Object.keys(e), r = Object.getOwnPropertyDescriptors(e), i = Object.getPrototypeOf(e), a = i !== null && typeof e == "object" && !!e && !Array.isArray(e) && i !== Object.prototype;
		if (a) {
			let e = Object.getOwnPropertyDescriptors(i);
			n.push(...Object.keys(e)), Object.assign(r, e);
		}
		for (let i = 0, o = n.length; i < o; i++) {
			let o = n[i];
			a && o === "constructor" || r[o].get && Object.defineProperty(e, o, {
				configurable: !0,
				enumerable: r[o].enumerable,
				get: r[o].get.bind(t)
			});
		}
	}
	return t;
}
function W(e) {
	let t;
	return typeof e == "object" && !!e && (e[a] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function G(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[Br]) return n;
	if (!W(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = G(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = G(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function Ur(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function Wr(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = b(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function Gr(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === a || t === H ? n : (delete n.value, delete n.writable, n.get = () => e[a][t], n);
}
function Kr(e) {
	ae() && Wr(Ur(e, H), Vr)();
}
function qr(e) {
	return Kr(e), Reflect.ownKeys(e);
}
var Jr = {
	get(e, t, n) {
		if (t === Br) return e;
		if (t === a) return n;
		if (t === o) return Kr(e), n;
		let r = Ur(e, H), i = r[t], s = i ? i() : e[t];
		if (t === H || t === U || t === "__proto__") return s;
		if (!i) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			ae() && (typeof s != "function" || e.hasOwnProperty(t)) && !(n && n.get) && (s = Wr(r, t, s)());
		}
		return W(s) ? Hr(s) : s;
	},
	has(e, t) {
		return t === Br || t === a || t === o || t === H || t === U || t === "__proto__" ? !0 : (ae() && Wr(Ur(e, U), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: qr,
	getOwnPropertyDescriptor: Gr
};
function K(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[U] && e[U][t] && i !== void 0 && e[U][t].$()) : (e[t] = n, e[U] && e[U][t] && i === void 0 && e[U][t].$());
	let o = Ur(e, H), s;
	if ((s = Wr(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = Wr(o, "length", a)) && s.$(e.length);
	}
	(s = o[Vr]) && s.$();
}
function Yr(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Xr(i) || K(e, i, t[i]);
	}
}
function Xr(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function Zr(e, t) {
	if (typeof t == "function" && (t = t(e)), t = G(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && K(e, n, r);
		}
		K(e, "length", r);
	} else Yr(e, t);
}
function Qr(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Xr(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) Qr(e, [r[i]].concat(t), n);
			return;
		} else if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && Qr(e, [i].concat(t), n);
			return;
		} else if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) Qr(e, [r].concat(t), n);
			return;
		} else if (t.length > 1) {
			Qr(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || r === void 0 && a == null || (a = G(a), r === void 0 || W(i) && W(a) && !Array.isArray(a) ? Yr(i, a) : K(e, r, a));
}
function $r(...[e, t]) {
	let n = G(e || {}), r = Array.isArray(n), i = Hr(n);
	function a(...e) {
		re(() => {
			r && e.length === 1 ? Zr(n, e[0]) : Qr(n, e);
		});
	}
	return [i, a];
}
var ei = Symbol("store-root");
function ti(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function ni(e, t, n, r, i) {
	if (ti(n)) return;
	let a = t[n];
	if (e === a) return;
	let o = Array.isArray(e);
	if (n !== ei && (!W(e) || !W(a) || o !== Array.isArray(a) || i && e[i] !== a[i])) {
		K(t, n, e);
		return;
	}
	if (o) {
		if (e.length && a.length && (!r || i && e[0] && e[0][i] != null)) {
			let t, n, o, s, c, l, u, d;
			for (o = 0, s = Math.min(a.length, e.length); o < s && (a[o] === e[o] || i && a[o] && e[o] && a[o][i] && a[o][i] === e[o][i]); o++) ni(e[o], a, o, r, i);
			let f = Array(e.length), p = /* @__PURE__ */ new Map();
			for (s = a.length - 1, c = e.length - 1; s >= o && c >= o && (a[s] === e[c] || i && a[s] && e[c] && a[s][i] && a[s][i] === e[c][i]); s--, c--) f[c] = a[s];
			if (o > c || o > s) {
				for (n = o; n <= c; n++) K(a, n, e[n]);
				for (; n < e.length; n++) K(a, n, f[n]), ni(e[n], a, n, r, i);
				a.length > e.length && K(a, "length", e.length);
				return;
			}
			for (u = Array(c + 1), n = c; n >= o; n--) l = e[n], d = i && l ? l[i] : l, t = p.get(d), u[n] = t === void 0 ? -1 : t, p.set(d, n);
			for (t = o; t <= s; t++) l = a[t], d = i && l ? l[i] : l, n = p.get(d), n !== void 0 && n !== -1 && (f[n] = a[t], n = u[n], p.set(d, n));
			for (n = o; n < e.length; n++) n in f ? (K(a, n, f[n]), ni(e[n], a, n, r, i)) : K(a, n, e[n]);
		} else for (let t = 0, n = e.length; t < n; t++) ni(e[t], a, t, r, i);
		a.length > e.length && K(a, "length", e.length);
		return;
	}
	let s = Object.keys(e);
	for (let t = 0, n = s.length; t < n; t++) ti(s[t]) || ni(e[s[t]], a, s[t], r, i);
	let c = Object.keys(a);
	for (let t = 0, n = c.length; t < n; t++) e[c[t]] === void 0 && K(a, c[t], void 0);
}
function q(e, t = {}) {
	let { merge: n, key: r = "id" } = t, i = G(e);
	return (e) => {
		if (!W(e) || !W(i)) return i;
		let t = ni(i, { [ei]: e }, ei, n, r);
		return t === void 0 ? e : t;
	};
}
var ri = /* @__PURE__ */ new WeakMap(), ii = {
	get(e, t) {
		if (t === Br) return e;
		let n = e[t];
		if (t === a || t === o || t === H || t === U || t === "__proto__") return n;
		let r;
		return W(n) ? ri.get(n) || (ri.set(n, r = new Proxy(n, ii)), r) : n;
	},
	set(e, t, n) {
		return K(e, t, G(n)), !0;
	},
	deleteProperty(e, t) {
		return K(e, t, void 0, !0), !0;
	}
};
function ai(e) {
	return (t) => {
		if (W(t)) {
			let n;
			(n = ri.get(t)) || ri.set(t, n = new Proxy(t, ii)), e(n);
		}
		return t;
	};
}
//#endregion
//#region viewer/src/state.ts
var oi = "sideshow-last-session", [si, ci] = $r([]), J = si;
function li(e, t) {
	let n = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(), r = n - 864e5, i = [
		{
			label: "Today",
			sessions: []
		},
		{
			label: "Yesterday",
			sessions: []
		},
		{
			label: "Earlier",
			sessions: []
		}
	];
	for (let t of e) {
		let e = Date.parse(t.lastActiveAt);
		(e >= n ? i[0] : e >= r ? i[1] : i[2]).sessions.push(t);
	}
	for (let e of i) e.sessions.sort((e, t) => {
		let n = e.surfaceCount === 0;
		return n === (t.surfaceCount === 0) ? t.lastActiveAt.localeCompare(e.lastActiveAt) : n ? 1 : -1;
	});
	return i.filter((e) => e.sessions.length > 0);
}
var [ui, di] = b(null), Y = ui, [fi, pi] = b(null), mi = fi, [hi, gi] = b(/* @__PURE__ */ new Set()), [_i, vi] = $r([]), X = _i, [yi, Z] = b([]), bi = yi, [xi, Si] = b([]), Ci = xi, [wi, Ti] = b(!1), Ei = wi, [Di, Oi] = b(!1), ki = Di, Ai = Oi, [ji, Mi] = b(!1), Ni = ji, [Pi, Fi] = b(!1), [Ii, Li] = b("stream"), [Ri, zi] = b(null), [Bi, Vi] = b(null), [Hi, Ui] = b(""), Wi = Hi, [Gi, Ki] = b(!1), qi = Gi, Ji;
function Q(e) {
	Ui(e), Ki(!0), clearTimeout(Ji), Ji = setTimeout(() => Ki(!1), 4e3);
}
function Yi(e) {
	gi((t) => new Set(t).add(e));
}
var Xi = "sideshow-dismissed-update", [Zi, Qi] = b(null), [$i, ea] = b(localStorage.getItem(Xi));
async function ta() {
	Qi(await B("/api/version").catch(() => null));
}
function na(e) {
	localStorage.setItem(Xi, e), ea(e);
}
function ra() {
	let e = Zi();
	return e?.updateAvailable && e.latest && e.latest !== $i() ? e : null;
}
async function ia() {
	z() && St() === "session" || ci(q(await B("/api/sessions"), { key: "id" }));
}
function aa(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: e,
		agent: "",
		title: null,
		cwd: null,
		createdAt: t,
		lastActiveAt: t,
		agentSeq: 0,
		surfaceCount: 0
	};
}
async function oa() {
	let e = L().router.get();
	e.surfaceId && !e.sessionId && (await sa(e.surfaceId), mi()) || await ca(e.surfaceId);
}
async function sa(e) {
	if (mi()?.id === e) return;
	let t = await B(`/api/posts/${encodeURIComponent(e)}`).catch(() => null);
	t && pi(t);
}
async function ca(e) {
	if (z() && St() === "session") {
		let t = L().router.get();
		if (!t.sessionId && e) {
			let t = await B(`/api/posts/${encodeURIComponent(e)}`).catch(() => null);
			if (!t) return;
			J.some((e) => e.id === t.sessionId) || ci(q([aa(t.sessionId)], { key: "id" })), await $(t.sessionId, {
				replace: !0,
				initialPostId: t.id
			});
			return;
		}
		if (!t.sessionId) return;
		J.some((e) => e.id === t.sessionId) || ci(q([aa(t.sessionId)], { key: "id" })), await $(t.sessionId, {
			replace: !0,
			initialPostId: t.surfaceId ?? void 0
		});
		return;
	}
	if (await ia(), Y() && !J.some((e) => e.id === Y()) && di(null), e) {
		let t = await B(`/api/posts/${encodeURIComponent(e)}`).catch(() => null);
		if (t && J.some((e) => e.id === t.sessionId)) {
			await $(t.sessionId, {
				replace: !0,
				initialPostId: t.id
			});
			return;
		}
	}
	if (!Y() && J.length > 0) {
		let e = L().router.get(), t = localStorage.getItem(oi), n = L().homeView ? null : t && J.some((e) => e.id === t) && t || J[0].id, r = e.sessionId && J.some((t) => t.id === e.sessionId) && e.sessionId || n;
		r && await $(r, {
			replace: !0,
			initialPostId: r === e.sessionId ? e.surfaceId ?? void 0 : void 0
		});
	}
}
function la(e) {
	return !!e && typeof e == "object" && Array.isArray(e.history);
}
async function ua(e) {
	let t = await B(`/api/sessions/${e}/posts?hydrate=1`).catch(() => []), n = [];
	for (let e of t) la(e) && n.push(e);
	return n.length === t.length ? n : (await Promise.all(t.map((e) => e && typeof e == "object" && typeof e.id == "string" ? B(`/api/posts/${encodeURIComponent(e.id)}`).catch(() => null) : null))).filter((e) => e !== null);
}
async function $(e, t) {
	di(e), t?.fromPopState || (t?.replace ? L().router.navigate({
		sessionId: e,
		surfaceId: t.initialPostId
	}, { replace: !0 }) : L().router.navigate({ sessionId: e })), localStorage.setItem(oi, e), gi((t) => {
		let n = new Set(t);
		return n.delete(e), n;
	}), zi(null), Vi(null), Fi(!1), Ti(!0), vi(q([])), Z([]), Si([]), ga(e);
	let n = await ua(e);
	if (Y() !== e) return;
	vi(q(n, { key: "id" })), t?.initialPostId && n.some((e) => e.id === t.initialPostId) && (zi(t.initialPostId), L().router.navigate({
		sessionId: e,
		surfaceId: t.initialPostId
	}, { replace: !0 })), Ti(!1);
	let r = await B(`/api/comments?session=${e}`).catch(() => null);
	!r || Y() !== e || va(r.comments);
}
function da(e) {
	let t = Y();
	t && L().router.navigate({
		sessionId: t,
		surfaceId: e
	}, { replace: !0 });
}
function fa() {
	di(null), Fi(!1), L().router.navigate({
		sessionId: null,
		surfaceId: null
	});
}
function pa(e) {
	if (e.surfaceId && !e.sessionId) {
		sa(e.surfaceId);
		return;
	}
	mi() && pi(null), e.sessionId && e.sessionId !== Y() ? $(e.sessionId, {
		fromPopState: !0,
		initialPostId: e.surfaceId ?? void 0
	}) : !e.sessionId && L().homeView && Y() && di(null);
}
async function ma(e) {
	if (J.length === 0) return;
	let t = J.findIndex((e) => e.id === Y());
	if (t < 0) {
		await $(J[0].id);
		return;
	}
	await $(J[(t + e + J.length) % J.length].id);
}
async function ha(e, { scroll: t = !0 } = {}) {
	let n = await B(`/api/posts/${e}`).catch(() => null);
	if (!n || n.sessionId !== Y()) return;
	let r = X.findIndex((e) => e.id === n.id);
	r >= 0 ? vi(r, q(n, { key: "id" })) : (t && (_a() ? zi(n.id) : Vi(n.id)), vi(X.length, n));
}
async function ga(e) {
	let t = await B(`/api/sessions/${e}/trace`).catch(() => null);
	t && Y() === e && Si(t.steps);
}
function _a() {
	let e = gt().querySelector("main");
	return !!e && e.scrollHeight - e.scrollTop - e.clientHeight < 200;
}
function va(e) {
	Z((t) => {
		let n = new Set(t.map((e) => e.id)), r = e.filter((e) => !n.has(e.id));
		return r.length > 0 ? [...t, ...r] : t;
	});
}
var ya = 0;
async function ba(e) {
	let t = yi();
	Z((t) => t.filter((t) => t.id !== e));
	try {
		return await B(`/api/comments/${encodeURIComponent(e)}`, { method: "DELETE" }), null;
	} catch (e) {
		return Z(t), e instanceof Error && e.message ? e.message : "network error";
	}
}
async function xa(e, t, n) {
	let r = e.anchor, i = {
		id: `local-${++ya}`,
		seq: 0,
		sessionId: Y() ?? "",
		postId: t,
		postTitle: null,
		author: "user",
		text: n,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		...r && { anchor: r },
		pending: !0
	};
	Z((e) => [...e, i]);
	try {
		let t = await B("/api/comments", {
			method: "POST",
			body: JSON.stringify(e)
		});
		return Z((e) => e.some((e) => e.id === t.id) ? e.filter((e) => e.id !== i.id) : e.map((e) => e.id === i.id ? t : e)), null;
	} catch (e) {
		return Z((e) => e.filter((e) => e.id !== i.id)), e instanceof Error && e.message ? e.message : "network error";
	}
}
var Sa = 3e4, Ca = 1e3;
function wa() {
	let e = L().router.get().sessionId ?? Y();
	return z() && St() === "session" && e ? `/api/events?session=${encodeURIComponent(e)}` : "/api/events";
}
function Ta(e) {
	let t = new URL(R(e), window.location.href);
	return t.protocol = t.protocol === "https:" ? "wss:" : "ws:", t.href;
}
async function Ea(e) {
	if (e === "pong") return;
	let t = JSON.parse(e), n = t.sessionId != null && (t.sessionId !== Y() || document.hidden);
	if (t.type === "theme-changed") Er(t.id);
	else if (t.type.startsWith("session-")) await ca();
	else if (t.type === "post-created" || t.type === "post-updated") n && t.sessionId && Yi(t.sessionId), t.sessionId === Y() && await ha(t.id), await ia();
	else if (t.type === "post-deleted") {
		let e = X.findIndex((e) => e.id === t.id);
		e >= 0 && vi(ai((t) => t.splice(e, 1))), await ia();
	} else t.type === "trace-updated" ? t.sessionId === Y() && await ga(t.sessionId) : t.type === "comment-created" ? (n && t.sessionId && Yi(t.sessionId), t.sessionId === Y() && va((await B(`/api/comments?${t.surfaceId ? `surface=${t.surfaceId}` : `session=${t.sessionId}`}`)).comments)) : t.type === "comment-deleted" && Z((e) => e.filter((e) => e.id !== t.id));
}
function Da() {
	return L().liveTransport === "ws" ? ka() : Oa();
}
function Oa() {
	let e = new EventSource(R(wa())), t = !1;
	return e.onopen = async () => {
		Mi(!0), t && await Aa(), t = !0;
	}, e.onerror = () => Mi(!1), e.onmessage = (e) => void Ea(e.data), () => {
		e.close(), Mi(!1);
	};
}
function ka() {
	let e = Ta(wa()), t = !1, n = !1, r, i, a, o = () => {
		clearInterval(i), i = void 0;
	}, s = () => {
		n || (r = new WebSocket(e), r.onopen = async () => {
			Mi(!0), o(), i = setInterval(() => {
				r?.readyState === WebSocket.OPEN && r.send("ping");
			}, Sa), t && await Aa(), t = !0;
		}, r.onmessage = (e) => {
			typeof e.data == "string" && Ea(e.data);
		}, r.onerror = () => Mi(!1), r.onclose = () => {
			Mi(!1), o(), n || (a = setTimeout(s, Ca));
		});
	};
	return s(), () => {
		n = !0, clearTimeout(a), o(), r?.close(), Mi(!1);
	};
}
async function Aa() {
	let e = Y();
	if (await ca(), !e || Y() !== e) return;
	ga(e);
	let t = await ua(e), n = new Set(t.map((e) => e.id));
	vi(ai((e) => {
		for (let t = e.length - 1; t >= 0; t--) n.has(e[t].id) || e.splice(t, 1);
	})), Y() === e && vi(q(t, { key: "id" }));
	let r = await B(`/api/comments?session=${e}`).catch(() => null);
	r && Y() === e && va(r.comments);
}
//#endregion
//#region viewer/src/Card.tsx
var ja = /*#__PURE__*/ M("<span class=avatar-pin aria-hidden=true><span>"), Ma = /*#__PURE__*/ M("<span class=vslot>"), Na = /*#__PURE__*/ M("<span class=sp>"), Pa = /*#__PURE__*/ M("<span class=card-meta>"), Fa = /*#__PURE__*/ M("<div class=card><div class=card-head><span class=card-title>"), Ia = /*#__PURE__*/ M("<span class=vbadge>v1"), La = /*#__PURE__*/ M("<select class=vbadge>"), Ra = /*#__PURE__*/ M("<option>v"), za = /*#__PURE__*/ M("<iframe sandbox=allow-scripts loading=lazy>", !0, !1, !1), Ba = /*#__PURE__*/ M("<button class=surface-capture type=button aria-label=\"Place a comment on this surface\"data-tip=\"Click to place a comment\">"), Va = /*#__PURE__*/ M("<div class=surface-shell><div class=surface-pins>"), Ha = /*#__PURE__*/ M("<div class=surface-unsupported>Can&rsquo;t show this surface — refresh sideshow to update the viewer."), Ua = /*#__PURE__*/ M("<button class=\"act icon comment\"title=Comment aria-label=Comment>"), Wa = /*#__PURE__*/ M("<button class=\"act icon pin-act\"title=\"Comment on a spot in a surface\"aria-label=\"Comment on a spot in a surface\">"), Ga = /*#__PURE__*/ M("<button class=\"act icon copy\"title=\"Copy link to this post\"aria-label=\"Copy link to this post\">"), Ka = /*#__PURE__*/ M("<a class=\"act icon open\"target=_blank title=\"Open in a new tab\"aria-label=\"Open in a new tab\">"), qa = /*#__PURE__*/ M("<a class=\"act icon shot\"target=_blank title=\"Open first surface as an image (PNG)\"aria-label=\"Open first surface as an image (PNG)\">"), Ja = /*#__PURE__*/ M("<span class=divider>"), Ya = /*#__PURE__*/ M("<button class=\"act icon del\"title=\"Delete post\">"), Xa = /*#__PURE__*/ M("<button class=\"act icon shot\"disabled title=\"Saving the first surface as an image needs Cloudflare Browser Rendering, which this server doesn't have. See the README.\"aria-label=\"Screenshots aren't available on this server\">"), Za = /*#__PURE__*/ M("<button class=anchor-del title=\"Delete comment\"aria-label=\"Delete pinned comment\">"), Qa = /*#__PURE__*/ M("<div class=anchored-note><div class=anchor-card><div class=anchor-head><span class=avatar></span><span class=who></span><span class=when></span></div><div class=anchor-text>"), $a = /*#__PURE__*/ M("<div class=\"anchored-note composing\"><div class=anchor-card><div class=anchor-head><span class=avatar></span><span class=who>you</span><span class=anchor-meta></span></div><div class=anchor-compose><input placeholder=\"Comment on this spot…\"><button>Comment</button><button class=ghost>Cancel"), eo = /*#__PURE__*/ M("<div class=cmts>"), to = /*#__PURE__*/ M("<div class=card-actions>"), no = /*#__PURE__*/ M("<div class=thread>"), ro = /*#__PURE__*/ M("<div class=actbar>"), io = /*#__PURE__*/ M("<button class=copy title=\"Copy for pasting to your agent\">⧉"), ao = /*#__PURE__*/ M("<div class=cmt><span class=who></span><div class=cmt-text></div><span class=when>"), oo = /*#__PURE__*/ M("<span class=anchor-chip>"), so = /*#__PURE__*/ M("<button class=ghost>Cancel"), co = /*#__PURE__*/ M("<div class=composer><input><button>Comment"), lo = /* @__PURE__ */ new Map();
function uo(e) {
	for (let [t, { iframes: n }] of lo) for (let r of n) if (r.contentWindow === e) return {
		id: t,
		iframe: r
	};
	return null;
}
var fo = 24, po = 4e3;
function mo(e, t) {
	e.style.height = Math.min(Math.max(Number(t), fo), po) + "px";
}
var ho = !1;
function go(e) {
	return !e || e.kind === "lineRange" ? null : {
		x: e.x,
		y: e.y
	};
}
function _o(e) {
	if (!e) return null;
	let t = `surface ${e.surfaceIndex + 1}`;
	return e.kind === "lineRange" ? `${t} · lines ${e.startLine}-${e.endLine}` : `${t} · v${e.postVersion}`;
}
function vo(e) {
	return e.author === "user" ? "you" : e.author;
}
function yo(e) {
	return (e === "user" ? "you" : e).split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0]?.toUpperCase() ?? "").join("") || "?";
}
function bo(e) {
	return (() => {
		var t = ja(), n = t.firstChild;
		return P(n, () => yo(e.author)), t;
	})();
}
function xo(e, t) {
	let n = e.getBoundingClientRect().top;
	if (n >= -10 && n <= 200) return da(t), () => {};
	ho = !0;
	let r = performance.now(), i = null, a = 0, o = !1, s, c = () => {
		ho = !1, da(t);
	}, l = () => {
		if (o) return;
		e.scrollIntoView({
			behavior: "instant",
			block: "start"
		});
		let t = e.getBoundingClientRect().top;
		if (i !== null && Math.abs(t - i) <= 5 ? a += 1 : a = 0, i = t, a >= 3 || performance.now() - r >= 5e3) {
			c();
			return;
		}
		s = setTimeout(l, 50);
	};
	return l(), () => {
		o = !0, s !== void 0 && clearTimeout(s), ho = !1;
	};
}
function So(e) {
	let t, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), [i, a] = b(!1), [o, s] = b(null), c, l = (t) => bi().filter((n) => n.postId === e.post.id && n.anchor?.surfaceIndex === t), u = async (t) => {
		let n = o();
		if (!n) return "place a pin first";
		let r = await xa({
			surface: e.post.id,
			text: t,
			author: "user",
			anchor: n
		}, e.post.id, t);
		return r === null && s(null), r;
	}, d = () => {
		!t || Ri() !== e.post.id || (zi(null), c?.(), c = xo(t, e.post.id));
	};
	ne(d), w(() => c?.()), ie(() => {
		if (lo.set(e.post.id, {
			card: t,
			iframes: n
		}), w(() => lo.delete(e.post.id)), e.standalone) return;
		d();
		let r = !0, i = new IntersectionObserver((t) => {
			if (!ho) {
				if (r) {
					r = !1;
					return;
				}
				for (let n of t) n.isIntersecting && da(e.post.id);
			}
		}, { threshold: .5 });
		i.observe(t), w(() => i.disconnect());
	});
	let f = (t) => {
		let n = [];
		for (let r = t; r >= Math.max(1, t - e.post.history.length); r--) n.push(r);
		return n;
	};
	return (() => {
		var c = Fa(), d = c.firstChild, p = d.firstChild;
		return Ue((e) => t = e, c), P(p, () => e.post.title), P(d, D(k, {
			get when() {
				return !e.standalone;
			},
			get children() {
				return [
					(() => {
						var t = Ma();
						return P(t, D(k, {
							get when() {
								return j(() => e.post.version > 1)() && e.post.version;
							},
							keyed: !0,
							get fallback() {
								return Ia();
							},
							children: (t) => (() => {
								var n = La();
								return n.addEventListener("change", (t) => {
									let n = t.currentTarget.value, i = Date.now();
									for (let [t, a] of r) a.src = R(`/s/${e.post.id}?part=${t}&ver=${n}&cb=${i}&theme=${mr()}&mode=${xr()}`);
								}), P(n, D(O, {
									get each() {
										return f(t);
									},
									children: (e) => (() => {
										var t = Ra();
										return t.firstChild, t.value = e, P(t, e, null), t;
									})()
								})), n;
							})()
						})), t;
					})(),
					Na(),
					(() => {
						var t = Pa();
						return P(t, () => At(e.post.updatedAt)), t;
					})()
				];
			}
		}), null), P(c, D(O, {
			get each() {
				return e.post.surfaces;
			},
			children: (t, c) => {
				let d = (n) => {
					let r = n.currentTarget.getBoundingClientRect();
					s({
						kind: "point",
						surfaceIndex: c(),
						...t.id && { surfaceId: t.id },
						surfaceKind: t.kind,
						postVersion: e.post.version,
						x: Math.min(Math.max((n.clientX - r.left) / r.width, 0), 1),
						y: Math.min(Math.max((n.clientY - r.top) / r.height, 0), 1)
					}), a(!1);
				};
				return (() => {
					var a = Va(), f = a.firstChild;
					return P(a, D(Fe, {
						get fallback() {
							return Ha();
						},
						get children() {
							return [
								D(A, {
									get when() {
										return Ft(t.kind);
									},
									get children() {
										var i = za();
										return Ue((e) => {
											r.set(c(), e), n.add(e), w(() => {
												r.delete(c()), n.delete(e);
											});
										}, i), x((n) => {
											var r = Nt[t.kind], a = e.post.surfaces.length > 1 ? `${e.post.title} (surface ${c() + 1})` : e.post.title, o = R(`/s/${e.post.id}?part=${c()}&ver=${e.post.version}&cb=${e.post.version}&theme=${mr()}&mode=${xr()}`);
											return r !== n.e && Be(i, n.e = r), a !== n.t && N(i, "title", n.t = a), o !== n.a && N(i, "src", n.a = o), n;
										}, {
											e: void 0,
											t: void 0,
											a: void 0
										}), i;
									}
								}),
								D(A, {
									get when() {
										return t.kind === "image";
									},
									get children() {
										return D(In, { surface: t });
									}
								}),
								D(A, {
									get when() {
										return t.kind === "trace";
									},
									get children() {
										return D(Lr, { surface: t });
									}
								}),
								D(A, {
									get when() {
										return t.kind === "json";
									},
									get children() {
										return D(qn, { surface: t });
									}
								})
							];
						}
					}), f), P(f, D(O, {
						get each() {
							return l(c());
						},
						children: (e) => D(Co, { comment: e })
					}), null), P(f, D(k, {
						get when() {
							return j(() => o()?.surfaceIndex === c())() ? o() : null;
						},
						keyed: !0,
						children: (e) => D(wo, {
							anchor: e,
							send: u,
							onCancel: () => s(null)
						})
					}), null), P(a, D(k, {
						get when() {
							return j(() => !!(i() && !e.standalone))() && !z();
						},
						get children() {
							var e = Ba();
							return e.$$click = d, e;
						}
					}), null), x(() => a.classList.toggle("annotating", !!i())), a;
				})();
			}
		}), null), P(c, D(k, {
			get when() {
				return !e.standalone;
			},
			get children() {
				return D(To, {
					get postId() {
						return e.post.id;
					},
					placeholder: "Leave a comment…",
					collapsible: !0,
					get readonly() {
						return z();
					},
					actions: (t) => [
						D(k, {
							get when() {
								return !z();
							},
							get children() {
								return [(() => {
									var e = Ua();
									return Ve(e, "click", t, !0), P(e, D(Cn, {})), e;
								})(), (() => {
									var e = Wa();
									return e.$$click = () => {
										s(null), a((e) => !e);
									}, P(e, D(wn, {})), x(() => e.classList.toggle("active", !!i())), e;
								})()];
							}
						}),
						Na(),
						(() => {
							var t = Ga();
							return t.$$click = async () => {
								try {
									await navigator.clipboard.writeText(Tt(e.post.id)), Q("Link copied");
								} catch {
									Q("Couldn't copy the link");
								}
							}, P(t, D(Tn, {})), t;
						})(),
						(() => {
							var t = Ka();
							return P(t, D(Sn, {})), x(() => N(t, "href", Tt(e.post.id))), t;
						})(),
						D(k, {
							get when() {
								return Dt();
							},
							get fallback() {
								return (() => {
									var e = Xa();
									return P(e, D(En, {})), e;
								})();
							},
							get children() {
								var t = qa();
								return P(t, D(En, {})), x(() => N(t, "href", Et(e.post.id))), t;
							}
						}),
						D(k, {
							get when() {
								return !z();
							},
							get children() {
								return [Ja(), (() => {
									var t = Ya();
									return t.$$click = async () => {
										confirm(`Delete "${e.post.title}"?`) && await B(`/api/posts/${e.post.id}`, { method: "DELETE" });
									}, P(t, D(jn, {})), x(() => N(t, "aria-label", `Delete "${e.post.title}"`)), t;
								})()];
							}
						})
					],
					send: (t) => xa({
						surface: e.post.id,
						text: t,
						author: "user"
					}, e.post.id, t)
				});
			}
		}), null), x(() => N(c, "data-id", e.post.id)), c;
	})();
}
function Co(e) {
	let t = () => go(e.comment.anchor);
	return D(k, {
		get when() {
			return t();
		},
		keyed: !0,
		children: (t) => (() => {
			var n = Qa(), r = n.firstChild, i = r.firstChild, a = i.firstChild, o = a.nextSibling, s = o.nextSibling, c = i.nextSibling;
			return P(n, D(bo, { get author() {
				return e.comment.author;
			} }), r), P(a, () => yo(e.comment.author)), P(o, () => vo(e.comment)), P(s, () => At(e.comment.createdAt)), P(i, D(k, {
				get when() {
					return !z();
				},
				get children() {
					var t = Za();
					return t.$$click = async () => {
						let t = await ba(e.comment.id);
						t && Q(`Couldn't delete that comment — ${t}`);
					}, P(t, D(jn, {})), t;
				}
			}), null), P(c, () => e.comment.text), x((r) => {
				var i = t.x > .62, a = !!e.comment.pending, o = `${t.x * 100}%`, s = `${t.y * 100}%`;
				return i !== r.e && n.classList.toggle("left", r.e = i), a !== r.t && n.classList.toggle("pending", r.t = a), o !== r.a && He(n, "left", r.a = o), s !== r.o && He(n, "top", r.o = s), r;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0
			}), n;
		})()
	});
}
function wo(e) {
	let t, n = () => go(e.anchor), r = async () => {
		let n = t.value.trim();
		if (!n) return;
		t.value = "";
		let r = await e.send(n);
		r !== null && (t.value ||= n, t.focus(), Q(`Couldn't post that comment — ${r}. It's back in the box.`));
	};
	return ie(() => t.focus()), D(k, {
		get when() {
			return n();
		},
		keyed: !0,
		children: (n) => (() => {
			var i = $a(), a = i.firstChild, o = a.firstChild, s = o.firstChild, c = s.nextSibling.nextSibling, l = o.nextSibling.firstChild, u = l.nextSibling, d = u.nextSibling;
			return P(i, D(bo, { author: "user" }), a), P(s, () => yo("user")), P(c, () => _o(e.anchor)), l.$$keydown = (n) => {
				n.key === "Enter" ? r() : n.key === "Escape" && !t.value && e.onCancel();
			}, Ue((e) => t = e, l), u.$$click = r, Ve(d, "click", e.onCancel, !0), x((e) => {
				var t = n.x > .62, r = `${n.x * 100}%`, a = `${n.y * 100}%`;
				return t !== e.e && i.classList.toggle("left", e.e = t), r !== e.t && He(i, "left", e.t = r), a !== e.a && He(i, "top", e.a = a), e;
			}, {
				e: void 0,
				t: void 0,
				a: void 0
			}), i;
		})()
	});
}
function To(e) {
	let [t, n] = b(!1), r = () => bi().filter((t) => t.postId === e.postId && !t.anchor);
	return (() => {
		var i = no();
		return P(i, D(k, {
			get when() {
				return r().length;
			},
			get children() {
				var e = eo();
				return P(e, D(O, {
					get each() {
						return r();
					},
					children: (e) => D(Do, { comment: e })
				})), e;
			}
		}), null), P(i, D(k, {
			get when() {
				return e.collapsible;
			},
			get fallback() {
				return D(k, {
					get when() {
						return !e.readonly;
					},
					get children() {
						return D(Oo, {
							get placeholder() {
								return e.placeholder;
							},
							get send() {
								return e.send;
							}
						});
					}
				});
			},
			get children() {
				var r = to();
				return P(r, D(k, {
					get when() {
						return j(() => !e.readonly)() && t();
					},
					get fallback() {
						return (() => {
							var t = ro();
							return P(t, () => e.actions?.(() => n(!0))), t;
						})();
					},
					get children() {
						return D(Oo, {
							get placeholder() {
								return e.placeholder;
							},
							get send() {
								return e.send;
							},
							autofocus: !0,
							onCancel: () => n(!1)
						});
					}
				})), r;
			}
		}), null), i;
	})();
}
function Eo(e) {
	if (e.postId) {
		let t = _o(e.anchor), n = t ? ` at ${t}` : "";
		return `sideshow comment on “${e.postTitle ?? "a post"}” (post ${e.postId})${n}:\n“${e.text}”`;
	}
	let t = J.find((t) => t.id === e.sessionId);
	return `sideshow comment, session “${t ? kt(t) : e.sessionId}”:\n“${e.text}”`;
}
function Do(e) {
	let t = async () => {
		try {
			await navigator.clipboard.writeText(Eo(e.comment)), Q("Copied — paste it to your agent");
		} catch {
			Q("Couldn't copy to clipboard");
		}
	}, n = () => e.comment.author === "user" && !e.comment.pending;
	return (() => {
		var r = ao(), i = r.firstChild, a = i.nextSibling, o = a.nextSibling;
		return P(i, (() => {
			var t = j(() => e.comment.author === "user");
			return () => t() ? "you" : e.comment.author;
		})()), P(r, D(k, {
			get when() {
				return _o(e.comment.anchor);
			},
			keyed: !0,
			children: (e) => (() => {
				var t = oo();
				return P(t, e), t;
			})()
		}), a), P(a, () => e.comment.text), P(r, D(k, {
			get when() {
				return n();
			},
			get children() {
				var e = io();
				return e.$$click = t, e;
			}
		}), o), P(o, () => At(e.comment.createdAt)), x((t) => {
			var n = e.comment.author === "user", i = !!e.comment.pending, a = e.comment.id;
			return n !== t.e && r.classList.toggle("user", t.e = n), i !== t.t && r.classList.toggle("pending", t.t = i), a !== t.a && N(r, "data-cid", t.a = a), t;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		}), r;
	})();
}
function Oo(e) {
	let t, n = async () => {
		let n = t.value.trim();
		if (!n) return;
		t.value = "";
		let r = await e.send(n);
		r !== null && (t.value ||= n, t.focus(), Q(`Couldn't post that comment — ${r}. It's back in the box.`));
	};
	return ie(() => e.autofocus && t.focus()), (() => {
		var r = co(), i = r.firstChild, a = i.nextSibling;
		return i.$$keydown = (r) => {
			r.key === "Enter" ? n() : r.key === "Escape" && !t.value && e.onCancel && e.onCancel();
		}, Ue((e) => t = e, i), a.$$click = n, P(r, D(k, {
			get when() {
				return e.onCancel;
			},
			get children() {
				var t = so();
				return Ve(t, "click", e.onCancel, !0), t;
			}
		}), null), x(() => N(i, "placeholder", e.placeholder)), r;
	})();
}
ze(["click", "keydown"]);
//#endregion
//#region viewer/src/notes.ts
var ko = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Ao = (e) => ko(e).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noopener\">$1</a>");
function jo(e) {
	let t = [], n = !1, r = () => {
		n &&= (t.push("</ul>"), !1);
	};
	for (let i of e.split(/\r?\n/)) {
		let e = i.trimEnd(), a = /^#{1,6}\s+(.*)$/.exec(e), o = /^[-*]\s+(.*)$/.exec(e);
		o ? (n ||= (t.push("<ul>"), !0), t.push(`<li>${Ao(o[1])}</li>`)) : n && /^\s+\S/.test(i) ? t[t.length - 1] = t[t.length - 1].replace(/<\/li>$/, ` ${Ao(e.trim())}</li>`) : a ? (r(), t.push(`<h4>${Ao(a[1])}</h4>`)) : e.trim() ? (r(), t.push(`<p>${Ao(e)}</p>`)) : r();
	}
	return r(), t.join("");
}
//#endregion
//#region viewer/src/SessionTimeline.tsx
var Mo = /*#__PURE__*/ M("<div class=empty>No posts in this session yet."), No = /*#__PURE__*/ M("<div class=\"tl-row tl-tail\"><div class=body>waiting for feedback…"), Po = /*#__PURE__*/ M("<div class=timeline>"), Fo = /*#__PURE__*/ M("<div class=tl-post><span class=tl-node>"), Io = /*#__PURE__*/ M("<div class=tl-turn>"), Lo = /*#__PURE__*/ M("<div class=\"tl-row tl-notes-fold\"><button type=button class=\"body tl-clickable tl-fold-button\"><span class=tl-fold-label-desktop></span><span class=tl-fold-label-mobile></span><span class=tl-fold-caret aria-hidden=true>"), Ro = /*#__PURE__*/ M("<span class=\"tl-marker prompt\">"), zo = /*#__PURE__*/ M("<pre class=tl-detail>"), Bo = /*#__PURE__*/ M("<div><div class=body><div>"), Vo = /*#__PURE__*/ M("<span class=knd>"), Ho = /*#__PURE__*/ M("<div class=\"tl-row tl-cmd-row\"><div class=body><div class=tl-cmd-inline><span>");
function Uo(e, t) {
	let n = e.map((e) => ({
		post: e,
		steps: []
	}));
	n.push({
		post: null,
		steps: []
	});
	let r = (e) => Date.parse(e.createdAt);
	for (let i of t) {
		let t = i.ts ? Date.parse(i.ts) : NaN, a = n.length - 1;
		if (!Number.isNaN(t)) {
			let n = e.findIndex((e) => r(e) >= t);
			n >= 0 && (a = n);
		}
		n[a].steps.push(i);
	}
	return n;
}
function Wo(e) {
	let t = [], n = null, r = () => (n || (n = {
		prompt: null,
		events: []
	}, t.push(n)), n);
	for (let i of e) i.kind === "prompt" ? (n = {
		prompt: i,
		events: []
	}, t.push(n)) : r().events.push(i);
	return t;
}
function Go() {
	let e = S(() => Uo(X, Ci())), t = () => !Ei() && X.length === 0 && Ci().length === 0;
	return (() => {
		var n = Po();
		return P(n, D(k, {
			get when() {
				return t();
			},
			get children() {
				return Mo();
			}
		}), null), P(n, D(O, {
			get each() {
				return e();
			},
			children: (e) => [D(O, {
				get each() {
					return Wo(e.steps);
				},
				children: (e) => D(Ko, { turn: e })
			}), D(k, {
				get when() {
					return e.post;
				},
				children: (e) => (() => {
					var t = Fo();
					return t.firstChild, P(t, D(So, { get post() {
						return e();
					} }), null), t;
				})()
			})]
		}), null), P(n, D(k, {
			get when() {
				return X.length > 0 || Ci().length > 0;
			},
			get children() {
				return No();
			}
		}), null), n;
	})();
}
function Ko(e) {
	let t = () => e.turn.events, n = S(() => t().reduce((e, t, n) => (t.kind === "say" && e.push(n), e), [])), r = () => n().length > 0 ? n()[0] : -1, i = () => n().length > 1 ? n()[n().length - 1] : -1, a = S(() => t().filter((e, t) => t !== r() && t !== i()));
	return (() => {
		var n = Io();
		return P(n, D(k, {
			get when() {
				return e.turn.prompt;
			},
			children: (e) => D(Jo, {
				kind: "prompt",
				get step() {
					return e();
				}
			})
		}), null), P(n, D(k, {
			get when() {
				return r() >= 0;
			},
			get children() {
				return D(Jo, {
					kind: "response",
					get step() {
						return t()[r()];
					}
				});
			}
		}), null), P(n, D(k, {
			get when() {
				return a().length > 0;
			},
			get children() {
				return D(qo, { get steps() {
					return a();
				} });
			}
		}), null), P(n, D(k, {
			get when() {
				return i() >= 0;
			},
			get children() {
				return D(Jo, {
					kind: "response",
					get step() {
						return t()[i()];
					}
				});
			}
		}), null), n;
	})();
}
function qo(e) {
	let [t, n] = b(!1), r = () => e.steps.length, i = () => `${t() ? "Hide" : "Show"} ${r()} work ${r() === 1 ? "step" : "steps"}`, a = () => t() ? `··· hide ${r()} steps ···` : `··· ${r()} steps ···`;
	return [(() => {
		var e = Lo(), r = e.firstChild, o = r.firstChild, s = o.nextSibling, c = s.nextSibling;
		return r.$$click = () => n(!t()), P(o, a), P(s, i), P(c, () => t() ? "-" : "+"), x(() => N(r, "aria-expanded", t())), e;
	})(), D(k, {
		get when() {
			return t();
		},
		get children() {
			return D(O, {
				get each() {
					return e.steps;
				},
				children: (e) => e.kind === "say" ? D(Jo, {
					kind: "response",
					step: e
				}) : D(Yo, { step: e })
			});
		}
	})];
}
function Jo(e) {
	let [t, n] = b(!1), r = () => e.step.detail, i = () => !!r() && r() !== e.step.label;
	return (() => {
		var a = Bo(), o = a.firstChild, s = o.firstChild;
		return P(a, D(k, {
			get when() {
				return e.kind === "prompt";
			},
			get children() {
				return Ro();
			}
		}), o), s.$$click = () => i() && n(!t()), P(s, () => e.step.label), P(o, D(k, {
			get when() {
				return j(() => !!t())() && i();
			},
			get children() {
				var e = zo();
				return P(e, r), e;
			}
		}), null), x((t) => {
			var n = `tl-row tl-${e.kind}`, r = !!i();
			return n !== t.e && Be(a, t.e = n), r !== t.t && s.classList.toggle("tl-clickable", t.t = r), t;
		}, {
			e: void 0,
			t: void 0
		}), a;
	})();
}
function Yo(e) {
	let [t, n] = b(!1), r = () => !!e.step.detail;
	return (() => {
		var i = Ho(), a = i.firstChild, o = a.firstChild, s = o.firstChild;
		return o.$$click = () => r() && n(!t()), P(o, D(k, {
			get when() {
				return e.step.kind;
			},
			get children() {
				var t = Vo();
				return P(t, () => e.step.kind), t;
			}
		}), s), P(s, () => e.step.label), P(a, D(k, {
			get when() {
				return j(() => !!t())() && r();
			},
			get children() {
				var t = zo();
				return P(t, () => e.step.detail), t;
			}
		}), null), x(() => o.classList.toggle("tl-clickable", !!r())), i;
	})();
}
ze(["click"]);
//#endregion
//#region viewer/src/App.tsx
var Xo = /*#__PURE__*/ M("<button class=brand type=button aria-label=\"sideshow — home\"><span class=livedot></span>sideshow"), Zo = /*#__PURE__*/ M("<button class=menu id=menuBtn aria-label=\"Show sessions\">☰<span class=dot id=menuDot>"), Qo = /*#__PURE__*/ M("<slot>"), $o = /*#__PURE__*/ M("<a href=/guide target=_blank>design guide"), es = /*#__PURE__*/ M("<a href=/setup target=_blank>agent setup"), ts = /*#__PURE__*/ M("<a href=#>connect Claude Code"), ns = /*#__PURE__*/ M("<aside><slot></slot><div id=sessionList></div><div class=aside-foot><slot>"), rs = /*#__PURE__*/ M("<div id=app><header class=topbar></header><main><slot>"), is = /*#__PURE__*/ M("<div id=scrim>"), as = /*#__PURE__*/ M("<div id=toast role=status aria-live=polite>"), os = /*#__PURE__*/ M("<button id=newPill>new post ↓"), ss = /*#__PURE__*/ M("<div class=sess-group>"), cs = /*#__PURE__*/ M("<div id=standalone><main class=standalone-main><footer class=standalone-foot><a href=https://sideshow.sh target=_blank rel=noopener>made with <strong>sideshow"), ls = /*#__PURE__*/ M("<button class=update-cmd title=\"Copy upgrade command\"><code></code> ⧉"), us = /*#__PURE__*/ M("<div class=update-banner role=status><div class=update-head>New version <strong></strong><button class=x>✕"), ds = /*#__PURE__*/ M("<div class=card id=whatsNew><div class=card-head><span class=card-title>What&rsquo;s new in </span><span class=card-meta>update available</span><span class=sp></span><button class=\"act del\">dismiss</button></div><div class=update-notes>"), fs = /*#__PURE__*/ M("<span class=sess-count> (<!>)"), ps = /*#__PURE__*/ M("<button class=x title=\"Delete session\">✕"), ms = /*#__PURE__*/ M("<div class=sess role=button tabindex=0><div class=sess-title></div><div class=sess-meta> · </div><span class=dot>"), hs = /*#__PURE__*/ M("<div class=\"sess aside-empty\"role=button tabindex=0 aria-label=\"Connect an agent\"><div class=aside-empty-head><span class=aside-empty-icon></span><span class=aside-empty-label>Connect an agent</span></div><div class=aside-empty-help>Your sessions will appear here once an agent connects."), gs = /*#__PURE__*/ M("<div id=sessionView><div class=session-head><span class=meta id=sessMeta></span><span class=head-sp></span><slot></slot></div><div id=stream>"), _s = /*#__PURE__*/ M("<div class=empty id=streamEmpty>No posts in this session yet."), vs = /*#__PURE__*/ M("<div class=view-toggle role=group aria-label=\"View mode\"><button>Stream</button><button>Timeline"), ys = /*#__PURE__*/ M("<span id=sessTitle role=textbox aria-label=\"Session title\">"), bs = /*#__PURE__*/ M("<h1>The show hasn&rsquo;t started yet"), xs = /*#__PURE__*/ M("<p class=sub>sideshow is a live stage where coding agents post HTML — diagrams, sketches, explainers — while they work in your terminal."), Ss = /*#__PURE__*/ M("<h2>teach your agent about it"), Cs = /*#__PURE__*/ M("<h2>or try it yourself"), ws = /*#__PURE__*/ M("<h2>using claude code?"), Ts = /*#__PURE__*/ M("<button class=connect-btn>Connect Claude Code →"), Es = /*#__PURE__*/ M("<div id=onboard><slot>"), Ds = /*#__PURE__*/ M("<h1>Nothing here yet"), Os = /*#__PURE__*/ M("<p class=sub>This sideshow workspace does not have any sessions yet."), ks = /*#__PURE__*/ M("<div class=modal-backdrop><div class=modal role=dialog aria-modal=true aria-label=\"Connect Claude Code\"><div class=modal-head><h2>Connect Claude Code</h2><button class=x aria-label=Close>✕</button></div><p class=sub>Install the sideshow plugin so your comments reach the agent on their own. A background monitor streams each comment to Claude Code as a notification — no copy-pasting, no re-arming a watcher.</p><h3>1 · add the marketplace</h3><h3>2 · install the plugin</h3><p class=note>Run both inside Claude Code. On install it asks for your <strong>Sideshow URL</strong> (default <code>http://localhost:8228</code>, or your deployed instance) and an optional token.</p><h3>what it runs</h3><p class=note>The plugin connects the sideshow MCP server and runs <code>sideshow watch</code> against your workspace as a background process — unsandboxed, the same trust level as hooks, with no per-comment prompt. Comments are delivered to the agent exactly once.</p><p class=caveat>Requires Claude Code ≥ 2.1.105. It&rsquo;s two commands, not a true one-click — Claude Code has no browser-to-terminal handoff yet."), As = /*#__PURE__*/ M("<div class=mode-switcher role=group aria-label=\"Color mode\">"), js = /*#__PURE__*/ M("<button type=button>"), Ms = /*#__PURE__*/ M("<div class=theme-picker><span class=theme-select-wrap><select id=themeSel aria-label=Theme>"), Ns = /*#__PURE__*/ M("<option>"), Ps = /*#__PURE__*/ M("<div class=snip><button class=copy>"), [Fs, Is] = b(!1), Ls = () => wt() === "stream";
function Rs() {
	return (() => {
		var e = Xo(), t = e.firstChild;
		return e.$$click = () => fa(), x(() => t.classList.toggle("on", !!Ni())), e;
	})();
}
function zs(e, t, n, r) {
	if (e) return e.title || "sideshow";
	let i = (t && (t.title || t.agent) ? `${kt(t)} · sideshow` : null) || r || "sideshow";
	return n > 0 ? `(${n}) ${i}` : i;
}
function Bs() {
	ne(() => {
		if (!Fs()) return;
		let e = (e) => {
			e.key === "Escape" && Is(!1);
		};
		document.addEventListener("keydown", e), w(() => document.removeEventListener("keydown", e));
	}), ie(() => {
		oa().catch(() => {}).finally(() => {
			Ai(!0), L().onReady?.();
		}), w(Da()), ta(), Dr();
		let e = setInterval(() => {
			J.length > 0 && ia();
		}, 45e3);
		w(() => clearInterval(e)), window.addEventListener("message", Ws), w(() => window.removeEventListener("message", Ws));
		let t = () => {
			let e = Y();
			!document.hidden && e && gi((t) => {
				let n = new Set(t);
				return n.delete(e), n;
			});
		};
		document.addEventListener("visibilitychange", t), w(() => document.removeEventListener("visibilitychange", t));
		let n = (e) => {
			Ls() || !e.metaKey || !e.altKey || e.ctrlKey || e.shiftKey || (e.key === "ArrowDown" ? (e.preventDefault(), ma(1)) : e.key === "ArrowUp" && (e.preventDefault(), ma(-1)));
		};
		window.addEventListener("keydown", n), w(() => window.removeEventListener("keydown", n)), w(L().router.subscribe(pa));
	}), ne(() => {
		_t() || (document.title = zs(mi(), J.find((e) => e.id === Y()), hi().size, Ct()));
	}), ne(() => yt().classList.toggle("nav-open", Pi()));
	let e = S(() => li(J, /* @__PURE__ */ new Date()));
	return D(k, {
		get when() {
			return mi();
		},
		keyed: !0,
		get fallback() {
			return [
				(() => {
					var t = rs(), n = t.firstChild, r = n.nextSibling, i = r.firstChild;
					return P(n, D(k, {
						get when() {
							return !Ls();
						},
						get children() {
							var e = Zo(), t = e.firstChild.nextSibling;
							return e.$$click = () => Fi(!Pi()), x(() => t.classList.toggle("show", hi().size > 0)), e;
						}
					}), null), P(n, D(k, {
						get when() {
							return !L().hideBrand;
						},
						get children() {
							return D(Rs, {});
						}
					}), null), P(t, D(k, {
						get when() {
							return !Ls();
						},
						get children() {
							var t = ns(), n = t.firstChild, r = n.nextSibling, i = r.nextSibling, a = i.firstChild;
							return P(t, D(k, {
								get when() {
									return !L().hideBrand;
								},
								get children() {
									return D(Rs, {});
								}
							}), n), P(t, D(Hs, {}), n), n._$owner = oe(), P(r, D(O, {
								get each() {
									return e();
								},
								children: (e) => [(() => {
									var t = ss();
									return P(t, () => e.label), t;
								})(), D(O, {
									get each() {
										return e.sessions;
									},
									children: (e) => D(Ks, { session: e })
								})]
							}), null), P(r, D(k, {
								get when() {
									return j(() => !!ki())() && J.length === 0;
								},
								get children() {
									var e = Qo();
									return e._$owner = oe(), P(e, D(k, {
										get when() {
											return !z();
										},
										get children() {
											return D(qs, {});
										}
									})), x(() => N(e, "name", F.asideEmpty)), e;
								}
							}), null), P(i, D(k, {
								get when() {
									return j(() => !z())() && Ot().themePicker;
								},
								get children() {
									return D(sc, {});
								}
							}), a), a._$owner = oe(), P(a, D(k, {
								get when() {
									return Ot().docLinks;
								},
								get children() {
									return [
										$o(),
										" ",
										"\xA0·\xA0",
										" ",
										es(),
										" "
									];
								}
							}), null), P(a, D(k, {
								get when() {
									return j(() => !z())() && Ot().claudeConnect;
								},
								get children() {
									return [D(k, {
										get when() {
											return Ot().docLinks;
										},
										children: "\xA0·\xA0 "
									}), (() => {
										var e = ts();
										return e.$$click = (e) => {
											e.preventDefault(), Is(!0);
										}, e;
									})()];
								}
							}), null), x((e) => {
								var t = F.asideHead, r = F.asideFoot;
								return t !== e.e && N(n, "name", e.e = t), r !== e.t && N(a, "name", e.t = r), e;
							}, {
								e: void 0,
								t: void 0
							}), t;
						}
					}), r), r.addEventListener("scroll", () => {
						_a() && Vi(null);
					}), i._$owner = oe(), P(i, D(k, {
						get when() {
							return !Ls();
						},
						get children() {
							return D($s, {});
						}
					}), null), P(i, D(Js, {}), null), x(() => N(i, "name", F.main)), t;
				})(),
				D(k, {
					get when() {
						return !Ls();
					},
					get children() {
						var e = is();
						return e.$$click = () => Fi(!1), e;
					}
				}),
				D(k, {
					get when() {
						return Fs();
					},
					get children() {
						return D(nc, { onClose: () => Is(!1) });
					}
				}),
				(() => {
					var e = as();
					return P(e, Wi), x(() => e.classList.toggle("show", !!qi())), e;
				})(),
				(() => {
					var e = os();
					return e.$$click = () => {
						let e = Bi();
						e && lo.get(e)?.card.scrollIntoView({
							behavior: "smooth",
							block: "start"
						}), Vi(null);
					}, x(() => e.hidden = Bi() === null), e;
				})()
			];
		},
		children: (e) => D(Vs, { post: e })
	});
}
function Vs(e) {
	return (() => {
		var t = cs(), n = t.firstChild, r = n.firstChild;
		return P(n, D(So, {
			get post() {
				return e.post;
			},
			standalone: !0
		}), r), t;
	})();
}
function Hs() {
	return D(k, {
		get when() {
			return ra();
		},
		keyed: !0,
		children: (e) => (() => {
			var t = us(), n = t.firstChild.firstChild.nextSibling, r = n.nextSibling;
			return P(n, () => e.latest), r.$$click = () => na(e.latest), P(t, D(k, {
				get when() {
					return e.upgradeCommand;
				},
				get children() {
					var t = ls(), n = t.firstChild;
					return t.$$click = () => {
						navigator.clipboard.writeText(e.upgradeCommand), Q("Copied: " + e.upgradeCommand);
					}, P(n, () => e.upgradeCommand), t;
				}
			}), null), x(() => N(r, "aria-label", `Dismiss update notice for ${e.latest}`)), t;
		})()
	});
}
function Us() {
	return D(k, {
		get when() {
			return j(() => !!ra()?.notes)() ? ra() : null;
		},
		keyed: !0,
		children: (e) => (() => {
			var t = ds(), n = t.firstChild, r = n.firstChild;
			r.firstChild;
			var i = r.nextSibling.nextSibling.nextSibling, a = n.nextSibling;
			return P(r, () => e.latest, null), i.$$click = () => na(e.latest), x(() => a.innerHTML = jo(e.notes)), t;
		})()
	});
}
async function Ws(e) {
	let t = e.data;
	if (!t || !t.__sideshow) return;
	if (t.type === "switch-session") {
		if (!Gs(e.source) || Ls()) return;
		ma(t.key === "ArrowUp" ? -1 : 1);
		return;
	}
	let n = uo(e.source);
	if (t.type === "resize" && n) mo(n.iframe, t.height);
	else if (t.type === "send-prompt" && n) {
		if (z()) return;
		await B("/api/comments", {
			method: "POST",
			body: JSON.stringify({
				surface: n.id,
				text: String(t.text),
				author: "surface"
			})
		}), Q("Added to this post’s thread");
	} else if (t.type === "open-link" && Gs(e.source)) {
		let e;
		try {
			e = new URL(String(t.url));
		} catch {
			return;
		}
		if (e.protocol !== "http:" && e.protocol !== "https:") return;
		confirm(`Open external link?\n\n${e.href}`) && window.open(e.href, "_blank", "noopener");
	} else t.type === "copy" && Gs(e.source) && navigator.clipboard?.writeText(String(t.text)).catch(() => {});
}
function Gs(e) {
	for (let t of gt().querySelectorAll("iframe")) if (t.contentWindow === e) return !0;
	return !1;
}
function Ks(e) {
	let t = () => kt(e.session);
	return (() => {
		var n = ms(), r = n.firstChild, i = r.nextSibling, a = i.firstChild;
		return i.nextSibling, n.$$keydown = (t) => {
			t.target === t.currentTarget && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), $(e.session.id));
		}, n.$$click = () => $(e.session.id), P(r, t, null), P(r, D(k, {
			get when() {
				return e.session.surfaceCount > 0;
			},
			get children() {
				var t = fs(), n = t.firstChild.nextSibling;
				return n.nextSibling, P(t, () => e.session.surfaceCount, n), t;
			}
		}), null), P(i, D(ft, { get agent() {
			return e.session.agent;
		} }), a), P(i, () => e.session.agent, a), P(i, () => At(e.session.lastActiveAt), null), P(n, D(k, {
			get when() {
				return !z();
			},
			get children() {
				var n = ps();
				return n.$$click = async (n) => {
					n.stopPropagation(), confirm(`Delete "${t()}" and its posts?`) && await B(`/api/sessions/${e.session.id}`, { method: "DELETE" });
				}, x(() => N(n, "aria-label", `Delete session "${t()}"`)), n;
			}
		}), null), x((t) => {
			var r = e.session.id === Y(), i = !!hi().has(e.session.id), a = e.session.surfaceCount === 0, o = e.session.id, s = e.session.id === Y() ? "true" : void 0;
			return r !== t.e && n.classList.toggle("sel", t.e = r), i !== t.t && n.classList.toggle("unread", t.t = i), a !== t.a && n.classList.toggle("vacant", t.a = a), o !== t.o && N(n, "data-id", t.o = o), s !== t.i && N(n, "aria-current", t.i = s), t;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		}), n;
	})();
}
function qs() {
	let e = () => {
		Fi(!1), gt().querySelector("#onboard")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return (() => {
		var t = hs(), n = t.firstChild.firstChild;
		return t.$$keydown = (t) => {
			t.target === t.currentTarget && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), e());
		}, t.$$click = e, P(n, D(Dn, {})), t;
	})();
}
function Js() {
	let e = S(() => J.find((e) => e.id === Y()));
	return (() => {
		var t = gs(), n = t.firstChild, r = n.firstChild, i = r.nextSibling.nextSibling, a = n.nextSibling;
		return P(n, D(Xs, { get current() {
			return e();
		} }), r), P(r, (() => {
			var t = j(() => !!e());
			return () => t() ? `${e().agent} · started ${At(e().createdAt)}` : "";
		})()), P(n, D(Ys, {}), i), i._$owner = oe(), P(a, D(k, {
			get when() {
				return Ii() === "timeline";
			},
			get fallback() {
				return [
					D(Us, {}),
					D(k, {
						get when() {
							return j(() => !Ei())() && X.length === 0;
						},
						get children() {
							return _s();
						}
					}),
					D(O, {
						each: X,
						children: (e) => D(So, { post: e })
					})
				];
			},
			get children() {
				return D(Go, {});
			}
		})), x((e) => {
			var n = J.length === 0, r = F.sessionActions;
			return n !== e.e && (t.hidden = e.e = n), r !== e.t && N(i, "name", e.t = r), e;
		}, {
			e: void 0,
			t: void 0
		}), t;
	})();
}
function Ys() {
	return (() => {
		var e = vs(), t = e.firstChild, n = t.nextSibling;
		return t.$$click = () => Li("stream"), n.$$click = () => Li("timeline"), x((e) => {
			var r = Ii() === "stream", i = Ii() === "stream", a = Ii() === "timeline", o = Ii() === "timeline";
			return r !== e.e && t.classList.toggle("on", e.e = r), i !== e.t && N(t, "aria-pressed", e.t = i), a !== e.a && n.classList.toggle("on", e.a = a), o !== e.o && N(n, "aria-pressed", e.o = o), e;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		}), e;
	})();
}
function Xs(e) {
	let t;
	ne(() => {
		e.current && gt().activeElement !== t && (t.textContent = kt(e.current));
	});
	let n = async () => {
		if (z() || !e.current) return;
		let n = t.textContent?.trim() ?? "";
		n && n !== kt(e.current) && await B(`/api/sessions/${e.current.id}`, {
			method: "PATCH",
			body: JSON.stringify({ title: n })
		});
	};
	return (() => {
		var r = ys();
		return r.$$keydown = (n) => {
			n.key === "Enter" ? (n.preventDefault(), t.blur()) : n.key === "Escape" && (n.preventDefault(), e.current && (t.textContent = kt(e.current)), t.blur());
		}, r.addEventListener("blur", n), Ue((e) => t = e, r), N(r, "spellcheck", !1), x(() => N(r, "contenteditable", !z())), r;
	})();
}
var Zs = "curl -s http://localhost:8228/setup >> AGENTS.md", Qs = "curl -s -X POST http://localhost:8228/api/snippets -H 'content-type: application/json' -d '{\"agent\": \"me\", \"title\": \"Hello\", \"html\": \"<h2>It works</h2>\"}'";
function $s() {
	return (() => {
		var e = Es(), t = e.firstChild;
		return t._$owner = oe(), P(t, D(k, {
			get when() {
				return !z();
			},
			get fallback() {
				return [Ds(), Os()];
			},
			get children() {
				return [
					bs(),
					xs(),
					Ss(),
					D(cc, { text: Zs }),
					Cs(),
					D(cc, { text: Qs }),
					ws(),
					(() => {
						var e = Ts();
						return e.$$click = () => Is(!0), e;
					})()
				];
			}
		})), x((n) => {
			var r = !ki() || J.length > 0, i = F.empty;
			return r !== n.e && (e.hidden = n.e = r), i !== n.t && N(t, "name", n.t = i), n;
		}, {
			e: void 0,
			t: void 0
		}), e;
	})();
}
var ec = "/plugin marketplace add modem-dev/sideshow", tc = "/plugin install sideshow@sideshow";
function nc(e) {
	return (() => {
		var t = ks(), n = t.firstChild, r = n.firstChild, i = r.firstChild.nextSibling, a = r.nextSibling.nextSibling.nextSibling, o = a.nextSibling;
		return Ve(t, "click", e.onClose, !0), n.$$click = (e) => e.stopPropagation(), Ve(i, "click", e.onClose, !0), P(n, D(cc, { text: ec }), a), P(n, D(cc, { text: tc }), o), t;
	})();
}
function rc(e) {
	return e.mode === "dark" ? D(An, {}) : e.mode === "light" ? D(kn, {}) : D(On, {});
}
var ic = {
	system: "System",
	light: "Light",
	dark: "Dark"
}, ac = [
	"system",
	"light",
	"dark"
];
function oc() {
	return (() => {
		var e = As();
		return P(e, D(O, {
			each: ac,
			children: (e) => (() => {
				var t = js();
				return t.$$click = () => kr(e), P(t, D(rc, { mode: e })), x((n) => {
					var r = _r() === e, i = `${ic[e]} mode`, a = _r() === e, o = `${ic[e]} mode`;
					return r !== n.e && t.classList.toggle("active", n.e = r), i !== n.t && N(t, "aria-label", n.t = i), a !== n.a && N(t, "aria-pressed", n.a = a), o !== n.o && N(t, "title", n.o = o), n;
				}, {
					e: void 0,
					t: void 0,
					a: void 0,
					o: void 0
				}), t;
			})()
		})), e;
	})();
}
function sc() {
	return (() => {
		var e = Ms(), t = e.firstChild.firstChild;
		return t.addEventListener("change", (e) => void Or(e.currentTarget.value)), P(t, D(O, {
			get each() {
				return ar();
			},
			children: (e) => (() => {
				var t = Ns();
				return P(t, () => e.label), x(() => t.value = e.id), t;
			})()
		})), P(e, D(oc, {}), null), x(() => t.value = mr()), e;
	})();
}
function cc(e) {
	let [t, n] = b("copy");
	return (() => {
		var r = Ps(), i = r.firstChild;
		return P(r, () => e.text, i), i.$$click = () => {
			navigator.clipboard.writeText(e.text), n("copied"), setTimeout(() => n("copy"), 1500);
		}, P(i, t), r;
	})();
}
ze(["click", "keydown"]);
//#endregion
//#region viewer/src/styles.css?inline
var lc = ":root{--bg:#f6f8fa;--panel:#eaeef2;--surface:#fff;--text:#1f2328;--muted:#59636e;--faint:#818b98;--border:#d1d9e0;--border-2:#afb8c1;--accent:#0969da;--accent-bg:#ddf4ff;--hover:#eaeef2;--danger:#cf222e;--ease-out-strong:cubic-bezier(.23, 1, .32, 1);--ease-drawer:cubic-bezier(.32, .72, 0, 1);--term-bg:#1e1e1e;--term-bar:#2a2a2a;--term-fg:#e6e6e6;--term-title:#9aa0a6}@media (prefers-color-scheme:dark){:root{--bg:#0d1117;--panel:#161b22;--surface:#1c2128;--text:#e6edf3;--muted:#9198a1;--faint:#6e7681;--border:#30363d;--border-2:#444c56;--accent:#2f81f7;--accent-bg:#388bfd26;--hover:#b1bac41f;--danger:#f85149}}*{box-sizing:border-box}html,body{height:100%}body{background:var(--bg);color:var(--text);-webkit-text-size-adjust:100%;margin:0;font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}#app{height:100%;display:flex}aside{background:var(--panel);border-right:.5px solid var(--border);flex-direction:column;flex:none;width:248px;display:flex}.brand{letter-spacing:.01em;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;align-items:center;gap:8px;padding:16px 16px 12px;font-family:inherit;font-size:15px;font-weight:500;display:flex}aside>.brand{width:100%}.brand:hover{color:var(--accent)}.brand:focus-visible{outline:2px solid var(--accent);outline-offset:-2px;border-radius:6px}.livedot{background:var(--faint);border-radius:50%;width:7px;height:7px;transition:background .3s}.livedot.on{background:#4caf78}#sessionList{flex:1;padding:4px 8px;overflow-y:auto}.sess-group{text-transform:uppercase;letter-spacing:.06em;color:var(--faint);padding:12px 10px 4px;font-size:10.5px;font-weight:500}.sess-group:first-child{padding-top:6px}.sess{cursor:pointer;border-radius:8px;margin-bottom:2px;padding:9px 10px;position:relative}.sess.vacant:not(.sel) .sess-title{color:var(--muted);font-weight:400}.sess.vacant:not(.sel) .sess-meta{opacity:.8}.sess:hover{background:var(--hover)}.sess:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}.sess.sel{background:var(--surface);box-shadow:0 0 0 .5px var(--border)}.sess-title{white-space:nowrap;text-overflow:ellipsis;padding-right:18px;font-size:13px;font-weight:500;overflow:hidden}.sess-count{color:var(--faint);font-weight:400}.sess-meta{color:var(--faint);align-items:center;margin-top:1px;font-size:12px;display:flex}.agent-mark{width:13px;height:13px;color:var(--muted);flex:none;margin-right:5px}.sess .dot{background:var(--accent);border-radius:50%;width:7px;height:7px;display:none;position:absolute;top:12px;right:10px}.sess.unread .dot{display:block}.sess .x{opacity:0;color:var(--faint);cursor:pointer;background:0 0;border:none;border-radius:5px;padding:2px 4px;font-family:inherit;font-size:13px;position:absolute;top:8px;right:6px}.sess:hover .x,.sess:focus-within .x{opacity:1}.sess:hover .dot,.sess:focus-within .dot{display:none}.sess .x:hover{color:var(--text);background:var(--hover)}.aside-empty-head{align-items:center;gap:7px;display:flex}.aside-empty-icon{width:16px;height:16px;color:var(--accent);flex:none}.aside-empty-label{color:var(--text);font-size:13px;font-weight:500}.aside-empty-help{color:var(--faint);margin-top:2px;font-size:12px;line-height:1.5}.aside-foot{border-top:.5px solid var(--border);color:var(--faint);padding:12px 16px;font-size:12px}.aside-foot a{color:var(--muted);text-decoration:none}.aside-foot a:hover{color:var(--text)}.theme-picker{--theme-control-h:30px;align-items:center;gap:8px;margin-bottom:10px;display:flex}.theme-select-wrap{flex:1;min-width:0;position:relative}.theme-select-wrap:after{content:\"\";border-right:1.5px solid var(--muted);border-bottom:1.5px solid var(--muted);pointer-events:none;width:7px;height:7px;position:absolute;top:50%;right:12px;transform:translateY(-62%)rotate(45deg)}.theme-picker select{width:100%;height:var(--theme-control-h);box-sizing:border-box;appearance:none;font:inherit;color:var(--text);background:var(--surface);border:.5px solid var(--border-2);border-radius:7px;padding:0 30px 0 14px}.mode-switcher{height:var(--theme-control-h);box-sizing:border-box;border:.5px solid var(--border-2);background:var(--surface);border-radius:7px;flex:none;display:inline-flex;overflow:hidden}.mode-switcher button{width:var(--theme-control-h);box-sizing:border-box;border:0;border-left:.5px solid var(--border);height:100%;color:var(--muted);cursor:pointer;background:0 0;justify-content:center;align-items:center;padding:0;display:inline-flex}.mode-switcher button:first-child{border-left:0}.mode-switcher button:hover{color:var(--text);background:var(--hover)}.mode-switcher button.active{color:var(--accent);background:var(--accent-bg)}.mode-switcher svg{width:13px;height:13px;display:block}.update-banner{background:var(--accent-bg);border:.5px solid var(--border);border-radius:10px;margin:0 12px 8px;padding:9px 11px;font-size:12.5px}.update-head{align-items:center;gap:4px;display:flex}.update-head .x{color:var(--muted);cursor:pointer;background:0 0;border:none;border-radius:5px;margin-left:auto;padding:2px 4px;font-family:inherit;font-size:12px}.update-head .x:hover{color:var(--text);background:var(--hover)}.update-cmd{border:.5px solid var(--border);background:var(--surface);width:100%;color:var(--muted);text-align:left;cursor:pointer;border-radius:6px;margin-top:6px;padding:4px 7px;font-family:inherit;font-size:11.5px;display:block}.update-cmd:hover{color:var(--text);border-color:var(--border-2)}.update-cmd code{font-family:ui-monospace,monospace}.update-notes{padding:6px 16px 12px;font-size:13.5px;line-height:1.55}.update-notes h4{margin:12px 0 4px;font-size:13px;font-weight:500}.update-notes ul{margin:4px 0;padding-left:20px}.update-notes li{margin:3px 0}.update-notes code{background:var(--hover);border-radius:4px;padding:1px 4px;font-family:ui-monospace,monospace;font-size:12px}.update-notes a{color:var(--accent)}main{flex:1;min-width:0;overflow-y:auto}.session-head{z-index:5;background:var(--bg);border-bottom:.5px solid var(--border);align-items:baseline;gap:10px;padding:14px 28px 10px;display:flex;position:sticky;top:0}#sessTitle{border-radius:6px;outline:none;min-width:40px;padding:0 4px;font-size:16px;font-weight:500}#sessTitle:hover{background:var(--hover)}#sessTitle:focus{background:var(--surface);box-shadow:0 0 0 .5px var(--border-2)}.session-head .meta{color:var(--faint);font-size:12.5px}#stream{max-width:860px;margin:0 auto;padding:22px 28px 120px}#standalone{background:var(--bg);height:100%;overflow-y:auto}.standalone-main{max-width:860px;margin:0 auto;padding:40px 28px 80px}.standalone-main .card{margin-bottom:0}.standalone-foot{text-align:center;color:var(--faint);margin-top:18px;font-size:12px}.standalone-foot a{color:var(--faint);text-decoration:none}.standalone-foot a:hover{color:var(--muted);text-decoration:underline}.standalone-foot strong{color:var(--muted);font-weight:600}.card{background:var(--surface);border:.5px solid var(--border);border-radius:12px;margin-bottom:22px;overflow:hidden}.card-head{align-items:center;gap:10px;padding:10px 14px;display:flex}.card-title{font-size:14px;font-weight:500}.vbadge{color:var(--muted);border:.5px solid var(--border);cursor:default;background:0 0;border-radius:999px;padding:0 7px;font-family:inherit;font-size:11px;line-height:17px}select.vbadge{cursor:pointer;appearance:none}.card-meta{color:var(--faint);font-size:12px}.card-head .sp{flex:1}.card-head .act{color:var(--faint);cursor:pointer;opacity:0;background:0 0;border:none;border-radius:6px;padding:3px 7px;font-family:inherit;font-size:12px;text-decoration:none;transition:opacity .15s}.card:hover .act,.card:focus-within .act{opacity:1}.card-head .act:hover{color:var(--text);background:var(--hover)}.card-head .act.icon{opacity:1;justify-content:center;align-items:center;padding:4px;display:inline-flex}.card-head .act.icon svg{width:13px;height:13px;display:block}.card-head .act.icon.del:hover{color:var(--danger)}.surface-shell{position:relative}.surface-shell.annotating{outline:1px solid var(--accent);outline-offset:-1px}.surface-pins{pointer-events:none;z-index:3;position:absolute;inset:0}.anchored-note{pointer-events:none;z-index:1;width:0;height:0;position:absolute}.anchored-note.pending{opacity:.65}.anchored-note:before{content:\"\";pointer-events:auto;width:288px;height:130px;position:absolute;top:-36px;left:-14px}.anchored-note.left:before{left:auto;right:-14px}.avatar-pin{width:24px;height:30px;color:var(--accent);filter:drop-shadow(0 3px 8px #00000038);pointer-events:auto;place-items:start center;display:grid;position:absolute;top:0;left:0;transform:translate(-50%,-100%)}.avatar-pin:before{content:\"\";background:var(--accent);clip-path:polygon(50% 100%,26% 65%,16% 52%,11% 36%,16% 20%,29% 7%,50% 1%,71% 7%,84% 20%,89% 36%,84% 52%,74% 65%);position:absolute;inset:0}.avatar-pin span{border:1.5px solid var(--surface);color:#fff;background:linear-gradient(135deg, var(--accent), var(--border-2));width:17px;height:17px;font:700 8px/1 var(--font-sans,system-ui, sans-serif);border-radius:999px;place-items:center;margin-top:4px;display:grid;position:relative}.anchor-card{width:250px;color:var(--text);background:var(--surface);border:.5px solid var(--border-2);pointer-events:none;opacity:0;transform-origin:0 12px;transition:opacity .14s var(--ease-out-strong) .28s, transform .16s var(--ease-out-strong) .28s;border-radius:12px;position:absolute;top:-24px;left:14px;overflow:hidden;transform:translateY(5px)scale(.97);box-shadow:0 10px 28px #0000002e}.anchored-note:hover .anchor-card,.anchored-note:focus-within .anchor-card,.anchored-note.composing .anchor-card{pointer-events:auto;opacity:1;transition-delay:0s;transform:translateY(0)scale(1)}.anchored-note.left .anchor-card{transform-origin:100% 12px;left:auto;right:14px}.anchor-head{align-items:center;gap:7px;padding:8px 10px 4px;display:flex}.anchor-head .avatar{color:#fff;background:linear-gradient(135deg, var(--accent), var(--border-2));width:25px;height:25px;font:700 10px/1 var(--font-sans,system-ui, sans-serif);border-radius:999px;flex:none;place-items:center;display:grid}.anchor-head .who{min-width:0;color:var(--text);font-size:12px;font-weight:600}.anchor-head .when,.anchor-meta{white-space:nowrap;color:var(--faint);margin-left:auto;font-size:11px}.anchor-del{width:22px;height:22px;color:var(--faint);cursor:pointer;opacity:0;background:0 0;border:none;border-radius:5px;flex:none;place-items:center;margin-left:-2px;display:inline-grid}.anchor-card:hover .anchor-del,.anchor-card:focus-within .anchor-del{opacity:1}.anchor-del svg{width:13px;height:13px}.anchor-del:hover{color:var(--danger);background:var(--hover)}.anchor-text{white-space:pre-wrap;overflow-wrap:anywhere;padding:0 10px 9px 42px;font-size:12.5px;line-height:1.45}.anchor-compose{grid-template-columns:1fr auto;gap:6px;padding:4px 10px 10px 42px;display:grid}.anchor-compose input{min-width:0;color:var(--text);background:var(--bg);border:.5px solid var(--accent);border-radius:7px;outline:none;grid-column:1/-1;padding:6px 8px;font:12.5px/1.4 inherit}.anchor-compose button{color:var(--muted);border:.5px solid var(--border-2);cursor:pointer;background:0 0;border-radius:7px;padding:0 8px;font:12px inherit}.anchor-compose button:hover{color:var(--text);background:var(--hover)}.anchor-compose .ghost{color:var(--faint);border:none}.surface-capture{z-index:4;color:var(--accent);background:color-mix(in srgb, var(--accent-bg) 12%, transparent);cursor:crosshair;border:none;font:12.5px inherit;position:absolute;inset:0}.surface-capture:after{content:attr(data-tip);color:var(--accent);background:var(--surface);border:.5px solid var(--border-2);opacity:0;pointer-events:none;border-radius:999px;padding:5px 10px;transition:opacity .12s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 6px 18px #00000024}.surface-capture:hover:after,.surface-capture:focus-visible:after{opacity:1}iframe{border:none;border-top:.5px solid var(--border);background:0 0;width:100%;height:120px;display:block}.surface-unsupported{border-top:.5px solid var(--border);color:var(--faint);padding:10px 14px;font-size:12px}.image-surface{border-top:.5px solid var(--border);padding:12px 14px}.asset-img{border:.5px solid var(--border);border-radius:8px;max-width:100%;height:auto;display:block}.asset-caption{color:var(--muted);margin-top:6px;font-size:12px}.asset-gone{color:var(--faint);padding:10px 14px;font-size:12px}.trace-surface{border-top:.5px solid var(--border);padding:10px 14px 12px;font-size:13px}.trace-head{align-items:center;gap:8px;margin-bottom:6px;display:flex}.trace-title{min-width:0;color:var(--muted);font-size:12.5px;font-weight:500}.trace-dl{color:var(--accent);flex:none;margin-left:auto;font-size:12px;text-decoration:none}.trace-dl:hover{text-decoration:underline}.trace-steps{border-left:1.5px solid var(--border-2);margin:0;padding:0;list-style:none}.trace-step{padding:3px 0 3px 14px;position:relative}.trace-step:before{content:\"\";background:var(--faint);border-radius:50%;width:7px;height:7px;position:absolute;top:10px;left:-4.5px}.trace-row{align-items:baseline;gap:8px;display:flex}.trace-row.clickable{cursor:pointer}.trace-kind{font:500 10.5px var(--font-mono,ui-monospace, monospace);text-transform:uppercase;letter-spacing:.04em;color:var(--accent);background:var(--accent-bg);border-radius:4px;flex:none;padding:1px 5px}.trace-label{min-width:0;color:var(--text)}.trace-ts{color:var(--faint);flex:none;margin-left:auto;font-size:11px}.trace-detail{background:var(--panel);white-space:pre-wrap;border-radius:6px;margin:4px 0 2px;padding:8px 10px;font-size:12px;overflow-x:auto}.json-surface{border-top:.5px solid var(--border);font:13px/1.5 var(--font-mono,ui-monospace, monospace);padding:10px 14px 12px;overflow-x:auto}.json-container{white-space:pre-wrap}.json-toggle{cursor:pointer;color:var(--faint);-webkit-user-select:none;user-select:none;white-space:nowrap}.json-toggle:hover{color:var(--muted)}.json-summary,.json-empty{color:var(--faint)}.json-children{padding-left:18px;display:block}.json-child,.json-close{display:block}.json-key{color:var(--text)}.json-colon,.json-comma{color:var(--faint)}.json-value{white-space:pre-wrap;word-break:break-all}.json-string{color:var(--muted)}.json-number,.json-boolean{color:var(--accent)}.json-null{color:var(--faint)}.cmts{border-top:.5px solid var(--border);padding:6px 14px}.cmt{gap:8px;padding:5px 0;font-size:13px;display:flex}.cmt .who{color:var(--muted);flex:none;font-weight:500}.cmt.user .who{color:var(--accent)}.cmt.flash{animation:1.1s ease-out cmt-flash}@keyframes cmt-flash{0%{background:var(--accent-bg)}to{background:0 0}}.anchor-chip{font:11px/1.5 var(--font-mono,ui-monospace, monospace);color:var(--accent);background:var(--accent-bg);border-radius:999px;flex:none;align-self:center;padding:0 7px}.cmt-text{white-space:pre-wrap;word-break:break-word;flex:1;min-width:0}.cmt .when{color:var(--faint);flex:none;align-self:center;margin-left:auto;font-size:11.5px}.cmt .copy{color:var(--faint);cursor:pointer;opacity:0;background:0 0;border:none;border-radius:4px;flex:none;padding:0 4px;font-size:12px;transition:opacity .15s}.cmt:hover .copy,.cmt .copy:focus-visible{opacity:1}.cmt .copy:hover{color:var(--text);background:var(--hover)}.composer{gap:8px;margin-top:4px;display:flex}.composer input{color:var(--text);background:var(--bg);border:.5px solid var(--border);border-radius:8px;outline:none;flex:1;padding:7px 10px;font:13px/1.4 inherit}.composer input:focus{border-color:var(--border-2)}.composer input::placeholder{color:var(--faint)}.composer button{color:var(--muted);border:.5px solid var(--border-2);cursor:pointer;white-space:nowrap;background:0 0;border-radius:8px;padding:0 12px;font:12.5px inherit}.composer button:hover{color:var(--text);background:var(--hover)}.composer .ghost{color:var(--faint);border:none}.composer .ghost:hover{color:var(--text);background:var(--hover)}.card-actions{border-top:.5px solid var(--border);align-items:center;min-height:44px;padding:5px 8px;display:flex}.card-actions>*{flex:1;min-width:0}.actbar{align-items:center;gap:2px;min-height:34px;display:flex}.actbar .sp{flex:1}.actbar .divider{background:var(--border);flex:none;width:1px;height:16px;margin:0 4px}.card-actions .act{color:var(--faint);cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;gap:6px;height:30px;padding:0 9px;font:12.5px inherit;text-decoration:none;display:inline-flex}.card-actions .act:hover{color:var(--text);background:var(--hover)}.card-actions .act.active{color:var(--accent);background:var(--accent-bg)}.card-actions .act.icon{width:30px;padding:0}.card-actions .act svg{width:14px;height:14px;display:block}.card-actions .act.del:hover{color:var(--danger)}.card-actions .act:disabled{opacity:.4;cursor:not-allowed}.card-actions .act:disabled:hover{color:var(--faint);background:0 0}.card-actions .composer{margin-top:0}.card-actions .composer input:focus{border-color:var(--accent)}.cmt.pending{opacity:.55}#newPill{color:var(--accent);background:var(--accent-bg);border:.5px solid var(--accent);cursor:pointer;z-index:40;border-radius:999px;padding:6px 14px;font-family:inherit;font-size:12.5px;position:fixed;bottom:64px;left:50%;transform:translate(-50%);box-shadow:0 4px 14px #0000001f}.empty{text-align:center;color:var(--faint);padding:90px 24px}#onboard{max-width:660px;margin:0 auto;padding:72px 28px}#onboard h1{margin:0 0 6px;font-size:21px;font-weight:500}#onboard .sub{color:var(--muted);margin:0 0 32px;font-size:14.5px}#onboard h2{color:var(--muted);text-transform:lowercase;letter-spacing:.02em;margin:26px 0 8px;font-size:13px;font-weight:500}.snip{background:var(--surface);border:.5px solid var(--border);color:var(--text);white-space:pre-wrap;word-break:break-all;border-radius:10px;padding:12px 44px 12px 14px;font:12.5px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;position:relative}.snip .copy{color:var(--faint);background:var(--bg);border:.5px solid var(--border);cursor:pointer;border-radius:6px;padding:3px 8px;font:11.5px -apple-system,sans-serif;position:absolute;top:8px;right:8px}.snip .copy:hover{color:var(--text)}.connect-btn{color:var(--text);background:var(--surface);border:.5px solid var(--border);cursor:pointer;border-radius:8px;padding:8px 14px;font:13px -apple-system,sans-serif}.connect-btn:hover{border-color:var(--muted)}.modal-backdrop{z-index:60;background:#0000006b;justify-content:center;align-items:flex-start;padding:7vh 20px 20px;display:flex;position:fixed;inset:0;overflow-y:auto}.modal{background:var(--bg);border:.5px solid var(--border);border-radius:14px;width:100%;max-width:560px;padding:22px 24px 26px;box-shadow:0 16px 48px #00000059}.modal-head{align-items:center;margin:0 0 10px;display:flex}.modal-head h2{flex:1;margin:0;font-size:17px;font-weight:600}.modal-head .x{color:var(--faint);cursor:pointer;background:0 0;border:none;padding:2px 6px;font-size:14px}.modal-head .x:hover{color:var(--text)}.modal .sub{color:var(--muted);margin:0 0 18px;font-size:14px;line-height:1.55}.modal h3{color:var(--muted);text-transform:lowercase;letter-spacing:.02em;margin:18px 0 8px;font-size:12px;font-weight:500}.modal .note,.modal .caveat{margin:12px 0 0;font-size:13px;line-height:1.55}.modal .note{color:var(--muted)}.modal .caveat{color:var(--faint);border-top:.5px solid var(--border);margin-top:18px;padding-top:14px}.modal code{background:var(--surface);border-radius:4px;padding:1px 5px;font:12px ui-monospace,SFMono-Regular,Menlo,monospace}.topbar,#scrim{display:none}@media (max-width:700px){#app{flex-direction:column}.topbar{min-height:49px;padding:calc(6px + env(safe-area-inset-top,0px)) 10px 6px;background:var(--panel);border-bottom:.5px solid var(--border);z-index:20;flex:none;align-items:center;gap:4px;display:flex}.topbar .brand{min-width:0;padding:0}.topbar .menu{color:var(--muted);cursor:pointer;transition:background-color .12s ease, color .12s ease, transform .12s var(--ease-out-strong);background:0 0;border:none;border-radius:8px;padding:6px 9px;font-family:inherit;font-size:17px;line-height:1;position:relative}.topbar .menu:hover{color:var(--text);background:var(--hover)}.topbar .menu:active{transform:scale(.96)}.topbar .menu .dot{background:var(--accent);border-radius:50%;width:7px;height:7px;display:none;position:absolute;top:3px;right:4px}.topbar .menu .dot.show{display:block}aside{z-index:30;width:min(280px,84vw);padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);transition:transform .22s var(--ease-drawer);will-change:transform;position:fixed;top:0;bottom:0;left:0;transform:translate(-105%)}aside>.brand{min-height:48px;padding-top:12px;padding-bottom:10px}#sessionList{padding:6px 8px 10px}.sess{min-height:52px;padding:10px 58px 10px 11px}.sess-title{padding-right:0}.sess-meta{white-space:nowrap;text-overflow:ellipsis;min-width:0;font-size:12px;overflow:hidden}.sess .x{min-width:28px;min-height:28px;top:11px;right:8px}.sess .dot{top:15px;right:44px}.aside-foot{padding-bottom:calc(12px + env(safe-area-inset-bottom,0px))}body.nav-open aside,:host(.nav-open) aside{transform:none;box-shadow:0 0 32px #00000040}#scrim{z-index:25;opacity:0;pointer-events:none;transition:opacity .22s var(--ease-drawer);background:#00000059;display:block;position:fixed;inset:0}body.nav-open #scrim,:host(.nav-open) #scrim{opacity:1;pointer-events:auto}main{min-height:0}.session-head{box-shadow:0 1px 0 color-mix(in srgb, var(--border) 70%, transparent);grid-template-columns:minmax(0,1fr);align-items:start;gap:2px;padding:8px 12px 9px;display:grid}#sessTitle{text-overflow:ellipsis;white-space:nowrap;min-width:0;max-width:100%;padding:0;display:block;overflow:hidden}.session-head .meta{text-overflow:ellipsis;white-space:nowrap;min-width:0;display:block;overflow:hidden}.session-head .head-sp{display:none}.view-toggle{width:min(100%,360px);margin-top:4px}.view-toggle button{flex:1;min-height:30px;padding:3px 10px}#stream{padding:12px 8px calc(112px + env(safe-area-inset-bottom,0px))}.standalone-main{padding:12px 8px calc(48px + env(safe-area-inset-bottom,0px))}#onboard{padding:40px 18px}.card{border-radius:10px;margin-bottom:14px}.card-head{grid-template-columns:minmax(0,1fr) auto;gap:4px 8px;padding:9px 10px;display:grid}.card-title{white-space:nowrap;text-overflow:ellipsis;grid-column:1/-1;min-width:0;overflow:hidden}.card-head .sp{display:none}.vslot{min-width:0}.card-meta{justify-self:end}.imagepart,.tracepart,.jsonpart,.part-unsupported,.cmts{padding-left:10px;padding-right:10px}.trace-head{align-items:flex-start}.trace-title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.trace-row{flex-wrap:wrap;align-items:flex-start;gap:4px 7px}.trace-label{overflow-wrap:anywhere;flex:160px}.trace-ts{width:100%;margin-left:0}.trace-detail{overflow-wrap:anywhere;max-width:100%}.json-children{padding-left:14px}.cmt .copy{opacity:1}.card-actions{min-height:48px;padding:7px 8px}.actbar{gap:4px}.card-actions .act{min-width:36px;height:36px}.card-actions .composer{grid-template-columns:minmax(0,1fr);gap:6px;display:grid}.card-actions .composer input{min-height:38px}.card-actions .composer button{width:100%;min-height:34px}#newPill{bottom:calc(22px + env(safe-area-inset-bottom,0px))}}@media (max-width:430px){#stream,.standalone-main{padding-left:0;padding-right:0}.card{border-left:0;border-right:0;border-radius:0}.standalone-foot{padding:0 12px}.view-toggle{width:100%}}@media (max-width:700px),(hover:none){.card-head .act,.sess .x{opacity:1}.sess .dot{right:44px}}@media (hover:none) and (min-width:701px){.sess-title{padding-right:52px}}#toast{background:var(--surface);border:.5px solid var(--border-2);opacity:0;pointer-events:none;z-index:50;border-radius:10px;max-width:600px;padding:9px 14px;font-size:13px;transition:opacity .2s,transform .2s;position:fixed;bottom:26px;left:50%;transform:translate(-50%)translateY(8px);box-shadow:0 6px 20px #00000024}#toast.show{opacity:1;pointer-events:auto;transform:translate(-50%)translateY(0)}@media (max-width:430px){#toast{width:calc(100vw - 24px);max-width:none}}.session-head .head-sp{flex:1}.view-toggle{border:.5px solid var(--border);border-radius:999px;align-self:center;display:inline-flex;overflow:hidden}.view-toggle button{color:var(--muted);cursor:pointer;background:0 0;border:none;padding:4px 13px;font-family:inherit;font-size:12px}.view-toggle button.on{background:var(--accent-bg);color:var(--accent)}@media (prefers-reduced-motion:reduce){.topbar .menu,aside,#scrim,.tl-notes-fold>.body,.tl-cmd-inline{transition:none}.topbar .menu:active,.tl-notes-fold>.body:active,.tl-cmd-inline:active{transform:none}}.timeline{padding-top:6px;position:relative}.timeline:before{content:\"\";background:var(--border);z-index:0;width:2px;position:absolute;top:8px;bottom:8px;left:7px;transform:translate(-50%)}.tl-rail-pad{padding-left:28px}.tl-turn{z-index:1;position:relative}.tl-post{z-index:1;margin:22px 0;padding-left:28px;position:relative}.tl-node{background:var(--faint);border:3px solid var(--bg);z-index:2;border-radius:50%;width:11px;height:11px;position:absolute;top:4px;left:7px;transform:translate(-50%)}.tl-row{z-index:1;padding:3px 0 3px 28px;position:relative}.tl-marker{z-index:2;position:absolute;left:7px;transform:translate(-50%)}.tl-prompt{margin-top:15px}.tl-marker.prompt{background:var(--faint);border:3px solid var(--bg);border-radius:50%;width:11px;height:11px;top:5px}.tl-prompt>.body{color:var(--text);font-size:14px;font-weight:500}.tl-response>.body{color:var(--muted);font-size:13.5px;line-height:1.5}.tl-notes-fold>.body{color:var(--faint);font-size:12px}.tl-fold-button{appearance:none;color:inherit;font:inherit;line-height:inherit;text-align:left;background:0 0;border:0;margin:0;padding:0;display:inline}.tl-fold-caret,.tl-fold-label-mobile{display:none}.tl-cmd-row>.body{color:var(--faint);min-width:0;padding-left:14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}.tl-cmd-inline{align-items:center;gap:8px;min-width:0;display:flex}.tl-cmd-inline>span:last-child{min-width:0}.tl-cmd-row .knd{text-transform:uppercase;letter-spacing:.04em;color:var(--accent);opacity:.8;flex:none;font-size:9.5px}.tl-clickable{cursor:pointer}.tl-detail{color:var(--muted);background:var(--surface);border:.5px solid var(--border);white-space:pre-wrap;border-radius:8px;margin:2px 0 4px;padding:8px 10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;overflow-x:auto}.tl-tail{padding-bottom:80px}.tl-tail>.body{color:var(--faint);font-size:12px}@media (max-width:700px){.timeline{padding:0 10px}.timeline:before{display:none}.tl-turn{background:color-mix(in srgb, var(--surface) 78%, var(--bg));border:.5px solid var(--border);box-shadow:0 1px 0 color-mix(in srgb, var(--border) 70%, transparent);border-radius:8px;margin:10px 0 12px;padding:11px 12px 12px}.tl-turn:before{content:\"\";background:var(--accent);border-radius:999px;width:3px;position:absolute;inset:12px auto 12px 0}.tl-row{padding:0}.tl-marker,.tl-marker.prompt{display:none}.tl-post{margin:12px 0 14px;padding-left:0}.tl-post .tl-node{display:none}.tl-prompt{margin:0 0 8px}.tl-prompt>.body{letter-spacing:0;overflow-wrap:anywhere;font-size:14px;font-weight:650;line-height:1.42}.tl-prompt>.body:before{content:\"Prompt\";text-transform:uppercase;color:var(--accent);margin-bottom:5px;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:10px;font-weight:700;line-height:1;display:block}.tl-response>.body{color:var(--muted);overflow-wrap:anywhere;font-size:13.5px;line-height:1.5}.tl-response+.tl-notes-fold,.tl-notes-fold+.tl-response,.tl-row+.tl-row{margin-top:9px}.tl-notes-fold>.body{width:100%;min-height:36px;color:var(--text);background:var(--bg);border:.5px solid var(--border);transition:transform .14s var(--ease-out-strong), border-color .16s ease, background-color .16s ease;border-radius:8px;justify-content:space-between;align-items:center;padding:0 10px 0 12px;display:flex}.tl-notes-fold>.body:active{transform:scale(.99)}.tl-fold-caret{width:22px;height:22px;color:var(--accent);background:var(--accent-bg);border-radius:999px;place-items:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;line-height:1;display:inline-grid}.tl-fold-label-desktop{display:none}.tl-fold-label-mobile{display:inline}.tl-cmd-row>.body{color:var(--muted);padding-left:0}.tl-cmd-inline{background:var(--bg);border:.5px solid var(--border);transition:transform .14s var(--ease-out-strong), border-color .16s ease, background-color .16s ease;border-radius:8px;grid-template-columns:auto minmax(0,1fr);align-items:start;gap:4px 8px;padding:9px 10px;display:grid}.tl-cmd-inline:active{transform:scale(.99)}.tl-cmd-row .knd{background:var(--accent-bg);opacity:1;border-radius:4px;margin-top:1px;padding:1px 5px}.tl-cmd-inline>span:last-child{color:var(--muted);overflow-wrap:anywhere;line-height:1.45}.tl-detail{background:var(--bg);border-color:var(--border-2);overflow-wrap:anywhere;margin:6px 0 2px;padding:9px 10px;font-size:11.5px;line-height:1.5}.tl-tail{padding:8px 10px 72px}.tl-tail>.body{padding-left:0}}", uc = "\n:host {\n  display: block;\n  position: relative;\n  background: var(--bg);\n  color: var(--text);\n  -webkit-text-size-adjust: 100%;\n  font: 14px/1.5 -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n.ss-engine-root { position: absolute; inset: 0; }\n";
function dc(e, t) {
	let n = e.attachShadow({ mode: "open" }), r = document.createElement("style");
	r.textContent = lc.replace(/:root\b/g, ":host") + uc, n.appendChild(r);
	let i = document.createElement("div");
	return i.className = "ss-engine-root", n.appendChild(i), ht(n, t ?? bt()), { dispose: Re(() => D(Bs, {}), i) };
}
//#endregion
export { F as SLOTS, cr as THEME_DEFAULTS, or as THEME_TOKEN_NAMES, dc as mountViewer };
