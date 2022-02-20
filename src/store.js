/**
 * Store Vue状态管理插件
 * Store.set(key, value)
 * Store.get(key)
 * Store.action(key).then().catch()
 * */
import { reactive } from "vue";

export const store = {
    state: {},
    actions: {},
    inStore(key) {
        return this.state[key] !== void (0)
    },
    set(key, newValue) {
        return new Promise((resolve, reject) => {
            if (this.inStore(key)) {
                this.state[key] = newValue;
                console.log('[Store] update:', key, '=>', this.state[key])
                resolve(newValue)
            } else {
                reject(`[Store] set("${key}", value): the key has not registered yet!`)
            }
        })
    },
    get(key) {
        if (key && key.split) {
            if (this.inStore(key)) {
                return this.state[key]
            } else {
                console.error(`[Store] get("${key}"): the key has not registered yet!`)
            }
        }
    },
    action(key, payoud) {
        return new Promise((resolve, reject) => {
            if (typeof this.actions[key] === 'function') {
                const actionReturn = this.actions[key]({
                    get: this.get.bind(store),
                    set: this.set.bind(store)
                }, payoud);

                if (actionReturn && (typeof actionReturn.then === 'function')) {
                    // action 返回 Promise
                    actionReturn.then(data => {
                        if (this.inStore(key)) {
                            // action 有同名 state ，触发自动模式
                            this.set(key, data)
                        }
                        resolve(data)
                    }).catch(reject)
                } else {
                    resolve(actionReturn)
                }
            } else {
                reject(`[Store] action("${key}", ${payoud}): the action has not registered yet!`)
            }
        })
    }
}

export default {
    install: function (app, options) {
        // 合并 state
        let optionState = options.state || {}
        if(typeof optionState === 'function'){
            optionState = optionState() || {}
        }
        const mergeState = Object.assign(store.state, optionState)
        // 合并 action
        Object.assign(store.actions, options.actions || {})

        if (reactive) {
            // vue 3
            store.state = reactive(mergeState)

            app.config.globalProperties.$store = store
        } else if(app.observable) {
            // vue 2
            store.state = app.observable(mergeState)
            
            app.$store = app.prototype.$store = store
        }

    }
}