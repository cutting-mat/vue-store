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
                console.log('Store update', key, '=>', this.state[key]);
                resolve(true);
            } else reject(`Store set("${key}", value) the key has not registered yet!`);
        });
    },
    get (key) {
        if (key && key.split) {
            if (this.inStore(key)) return this.state[key];
            else throw new Error(`Store get("${key}") the key has not registered yet!`);
        }
    },
    action (key, payoud) {
        return new Promise((resolve, reject)=>{
            if (typeof this.actions[key] === 'function') {
                const actionReturn = this.actions[key]({
                    get: this.get.bind($a5a696647f903c1a$export$6f57813fe9f31bf9),
                    set: this.set.bind($a5a696647f903c1a$export$6f57813fe9f31bf9)
                }, payoud);
                if (actionReturn && typeof actionReturn.then === 'function') actionReturn.then((data)=>{
                    if (this.inStore(key)) // 自动模式
                    this.set(key, data);
                    resolve(data);
                }).catch(reject);
                else resolve(actionReturn);
            } else reject(`Store action("${key}", ${payoud}) the action has not registered yet!`);
        });
    }
};
var $a5a696647f903c1a$export$2e2bcd8739ae039 = {
    install: function(app, options) {
        if ($bfAfX$vue.reactive) {
            // vue 3
            $a5a696647f903c1a$export$6f57813fe9f31bf9.state = $bfAfX$vue.reactive(Object.assign({
            }, this.state, options.state || {
            }));
            $a5a696647f903c1a$export$6f57813fe9f31bf9.actions = $bfAfX$vue.reactive(Object.assign({
            }, this.actions, options.actions || {
            }));
            app.config.globalProperties.$store = $a5a696647f903c1a$export$6f57813fe9f31bf9;
        } else {
            // vue 2
            Object.assign($a5a696647f903c1a$export$6f57813fe9f31bf9.state, options.state || {
            });
            Object.assign($a5a696647f903c1a$export$6f57813fe9f31bf9.actions, options.actions || {
            });
            app.$store = app.prototype.$store = $a5a696647f903c1a$export$6f57813fe9f31bf9;
        }
    }
};


//# sourceMappingURL=main.js.map
