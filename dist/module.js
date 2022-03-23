import {reactive as $jJ3qj$reactive, isVue3 as $jJ3qj$isVue3, isVue2 as $jJ3qj$isVue2} from "vue-demi";


/**
 * Store Vue状态管理插件
 * Store.set(key, value)
 * Store.get(key)
 * Store.action(key).then().catch()
 * */ // 调试开关
const $27dfdb36fbecc914$var$DEBUG = false;
const $27dfdb36fbecc914$var$store = {
    state: $jJ3qj$reactive({
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
                    get: this.get.bind($27dfdb36fbecc914$var$store),
                    set: this.set.bind($27dfdb36fbecc914$var$store)
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
function $27dfdb36fbecc914$export$2e2bcd8739ae039(app, options) {
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
        const mergeState = Object.assign($27dfdb36fbecc914$var$store.state, optionState);
        $27dfdb36fbecc914$var$store.state = $jJ3qj$reactive(mergeState);
        // 合并 action
        Object.assign($27dfdb36fbecc914$var$store.actions, options.actions || {
        });
    }
    if (app) {
        if ($jJ3qj$isVue3) {
            $27dfdb36fbecc914$var$DEBUG && console.log('[Store] isVue3');
            app.config.globalProperties.$store = $27dfdb36fbecc914$var$store;
        } else if ($jJ3qj$isVue2) {
            $27dfdb36fbecc914$var$DEBUG && console.log('[Store] isVue2');
            app.prototype.$store = $27dfdb36fbecc914$var$store;
        }
    }
    return $27dfdb36fbecc914$var$store;
}
const $27dfdb36fbecc914$export$4b3e715f166fdd78 = {
    install: $27dfdb36fbecc914$export$2e2bcd8739ae039
};


export {$27dfdb36fbecc914$export$2e2bcd8739ae039 as default, $27dfdb36fbecc914$export$4b3e715f166fdd78 as install};
//# sourceMappingURL=module.js.map
