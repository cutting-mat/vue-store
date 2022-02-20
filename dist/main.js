var $bfAfX$vue = require("vue");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "store", () => $a5a696647f903c1a$export$6f57813fe9f31bf9);
$parcel$export(module.exports, "default", () => $a5a696647f903c1a$export$2e2bcd8739ae039);

const $a5a696647f903c1a$export$6f57813fe9f31bf9 = {
    state: {
    },
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
                    get: this.get.bind($a5a696647f903c1a$export$6f57813fe9f31bf9),
                    set: this.set.bind($a5a696647f903c1a$export$6f57813fe9f31bf9)
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
var $a5a696647f903c1a$export$2e2bcd8739ae039 = {
    install: function(app, options) {
        // 合并 state
        let optionState = options.state || {
        };
        if (typeof optionState === 'function') optionState = optionState() || {
        };
        const mergeState = Object.assign($a5a696647f903c1a$export$6f57813fe9f31bf9.state, optionState);
        // 合并 action
        Object.assign($a5a696647f903c1a$export$6f57813fe9f31bf9.actions, options.actions || {
        });
        if ($bfAfX$vue.reactive) {
            // vue 3
            $a5a696647f903c1a$export$6f57813fe9f31bf9.state = $bfAfX$vue.reactive(mergeState);
            app.config.globalProperties.$store = $a5a696647f903c1a$export$6f57813fe9f31bf9;
        } else if (app.observable) {
            // vue 2
            $a5a696647f903c1a$export$6f57813fe9f31bf9.state = app.observable(mergeState);
            app.$store = app.prototype.$store = $a5a696647f903c1a$export$6f57813fe9f31bf9;
        }
    }
};


//# sourceMappingURL=main.js.map
