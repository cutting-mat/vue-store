/**
 * Store Vue状态管理插件
 * Store.set(key, value)
 * Store.get(key)
 * Store.action(key).then().catch()
 * */

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
                console.log('Store update', key, '=>', this.state[key])
                resolve(true)
            } else {
                reject(`Store set("${key}", value) the key has not registered yet!`)
            }
        })
    },
    get(key) {
        if (key && key.split) {
            return this.state[key]
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
                    actionReturn.then(data => {
                        if (this.inStore(key)) {
                            // 自动模式
                            this.set(key, data)
                        }
                        resolve(data)
                    }).catch(reject)
                } else {
                    resolve(actionReturn)
                }
            } else {
                reject(`Store action("${key}", ${payoud}) the action has not registered yet!`)
            }
        })
    }
}

export default {
    install: function (Vue, options) {
        store.state = options.state || {}
        store.actions = options.actions || {}
        Vue.prototype.$store = store
    }
}