import {reactive as $jJ3qj$reactive} from "vue";


const $27dfdb36fbecc914$export$6f57813fe9f31bf9 = {
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
                    get: this.get.bind($27dfdb36fbecc914$export$6f57813fe9f31bf9),
                    set: this.set.bind($27dfdb36fbecc914$export$6f57813fe9f31bf9)
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
var $27dfdb36fbecc914$export$2e2bcd8739ae039 = {
    install: function(app, options) {
        if ($jJ3qj$reactive) {
            // vue 3
            $27dfdb36fbecc914$export$6f57813fe9f31bf9.state = $jJ3qj$reactive(Object.assign({
            }, this.state, options.state || {
            }));
            $27dfdb36fbecc914$export$6f57813fe9f31bf9.actions = $jJ3qj$reactive(Object.assign({
            }, this.actions, options.actions || {
            }));
            app.config.globalProperties.$store = $27dfdb36fbecc914$export$6f57813fe9f31bf9;
        } else {
            // vue 2
            Object.assign($27dfdb36fbecc914$export$6f57813fe9f31bf9.state, options.state || {
            });
            Object.assign($27dfdb36fbecc914$export$6f57813fe9f31bf9.actions, options.actions || {
            });
            app.$store = app.prototype.$store = $27dfdb36fbecc914$export$6f57813fe9f31bf9;
        }
    }
};


export {$27dfdb36fbecc914$export$6f57813fe9f31bf9 as store, $27dfdb36fbecc914$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
