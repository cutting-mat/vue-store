var $bfAfX$vuedemi = require("vue-demi");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $a5a696647f903c1a$export$2e2bcd8739ae039);
$parcel$export(module.exports, "install", () => $a5a696647f903c1a$export$4b3e715f166fdd78);

/**
 * Store Vue状态管理插件
 * Store.set(key, value)
 * Store.get(key)
 * Store.action(key).then().catch()
 * */ // 调试开关
const $a5a696647f903c1a$var$DEBUG = false;
const $a5a696647f903c1a$var$store = {
    state: $bfAfX$vuedemi.reactive({
    }),
    actions: {
    },
    inStore (key) {
        return this.state[key] !== void 0;
    },
    set (key, newValue) {
        return new Promise((resolve, reject)=>{
            if (this.inStore(key)) {
                this.state[key] = newValue;
                console.log('[Store] update:', key, '=>', this.state[key]);
                resolve(newValue);
            } else reject(`[Store] set("${key}", value): the key has not registered yet!`);
        });
    },
    get (key) {
        if (key && key.split) {
            if (this.inStore(key)) return this.state[key];
            else return new Error(`[Store] get("${key}"): the key has not registered yet!`);
        }
    },
    action (key, payoud) {
        return new Promise((resolve, reject)=>{
            if (typeof this.actions[key] === 'function') {
                const actionReturn = this.actions[key]({
                    get: this.get.bind($a5a696647f903c1a$var$store),
                    set: this.set.bind($a5a696647f903c1a$var$store)
                }, payoud);
                if (actionReturn && typeof actionReturn.then === 'function') // action 返回 Promise
                actionReturn.then((data)=>{
                    if (this.inStore(key)) // action 有同名 state ，触发自动模式
                    this.set(key, data);
                    resolve(data);
                }).catch(reject);
                else resolve(actionReturn);
            } else reject(`[Store] action("${key}", ${payoud}): the action has not registered yet!`);
        });
    }
};
function $a5a696647f903c1a$export$2e2bcd8739ae039(app, options) {
    if (app && (app.state || app.actions) && options === void 0) {
        options = app;
        app = null;
    }
    if (options) {
        // 合并 state
        let optionState = options.state || {
        };
        if (typeof optionState === 'function') optionState = optionState() || {
        };
        const mergeState = Object.assign($a5a696647f903c1a$var$store.state, optionState);
        $a5a696647f903c1a$var$store.state = $bfAfX$vuedemi.reactive(mergeState);
        // 合并 action
        Object.assign($a5a696647f903c1a$var$store.actions, options.actions || {
        });
    }
    if (app) {
        if ($bfAfX$vuedemi.isVue3) {
            $a5a696647f903c1a$var$DEBUG && console.log('[Store] isVue3');
            app.config.globalProperties.$store = $a5a696647f903c1a$var$store;
        } else if ($bfAfX$vuedemi.isVue2) {
            $a5a696647f903c1a$var$DEBUG && console.log('[Store] isVue2');
            app.prototype.$store = $a5a696647f903c1a$var$store;
        }
    }
    return $a5a696647f903c1a$var$store;
}
const $a5a696647f903c1a$export$4b3e715f166fdd78 = {
    install: $a5a696647f903c1a$export$2e2bcd8739ae039
};


//# sourceMappingURL=main.js.map
