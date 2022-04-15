import { isReactive, toRaw, reactive, watch } from "vue";
const store = {
  state: {},
  actions: {},
  inStore(key) {
    return this.state[key] !== void 0;
  },
  set(key, newValue) {
    return new Promise((resolve, reject) => {
      if (this.inStore(key)) {
        this.state[key] = newValue;
        resolve(newValue);
      } else {
        reject(`[Store] set("${key}", value): the key has not registered yet!`);
      }
    });
  },
  get(key) {
    if (key && key.split) {
      if (this.inStore(key)) {
        return this.state[key];
      } else {
        return new Error(`[Store] get("${key}"): the key has not registered yet!`);
      }
    }
  },
  action(key, payoud) {
    return new Promise((resolve, reject) => {
      if (typeof this.actions[key] === "function") {
        const actionReturn = this.actions[key]({
          get: this.get.bind(store),
          set: this.set.bind(store)
        }, payoud);
        if (actionReturn && typeof actionReturn.then === "function") {
          actionReturn.then((data) => {
            if (this.inStore(key)) {
              this.set(key, data);
            }
            resolve(data);
          }).catch(reject);
        } else {
          resolve(actionReturn);
        }
      } else {
        reject(`[Store] action("${key}", ${payoud}): the action has not registered yet!`);
      }
    });
  }
};
let watchQueue = {};
function installer(app, options) {
  if (app && options === void 0) {
    if (app.state || app.actions) {
      options = app;
      app = null;
    } else {
      app = null;
      console.warn("[Store] options format error");
    }
  }
  if (options) {
    let optionState = options.state || {};
    if (typeof optionState === "function") {
      optionState = optionState() || {};
    }
    let baseState = isReactive(store.state) ? toRaw(store.state) : store.state;
    const mergeState = Object.assign(baseState, optionState);
    store.state = reactive(mergeState);
    Object.keys(mergeState).forEach((key) => {
      if (typeof watchQueue[key] === "function") {
        watchQueue[key]();
      }
      watchQueue[key] = watch(() => store.state[key], (value) => {
        console.log("[Store] update:", key, "=>", value);
      });
    });
    Object.assign(store.actions, options.actions || {});
  }
  if (app) {
    app.config.globalProperties.$store = store;
    app.mixin({
      data() {
        return {
          $state: store.state
        };
      }
    });
  }
  return store;
}
const plugin = {
  install: installer
};
export { installer as default, plugin };
