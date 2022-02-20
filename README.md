English | [中文](README_CN.md)

# @cutting-mat/vue-store

[![npm](https://img.shields.io/npm/v/@cutting-mat/vue-store.svg)](https://www.npmjs.com/package/@cutting-mat/vue-store) [![license](https://img.shields.io/github/license/cutting-mat/vue-store.svg)]()

A simpler Vue state management plug-in. If you also think Vuex is a little complicated, you need `vue-store`.

Only 'get() / set() / action()' is enough, and it is compatible with vue2 and vue3。

## Quick start

1. Install:

``` bash
npm i @cutting-mat/vue-store --save
```

2. Configure Store

``` js
import store from '@cutting-mat/vue-store';

Vue.use(store, {
    state: {
        // Data in store
        testValue: null,
    },
    actions: {
        // Asynchronous operation
        testAction: function(context){
            return new Promise(resolve => {
                setTimeout(() => {
                    context.set('testValue', parseInt(context.get('testValue')+1))
                    resolve()
                }, 500)
            })
        }
    }
});
```

There may be many data items in the actual project. You can put the configuration in a separate file:

``` js
// recommend
import store from '@cutting-mat/vue-store';
import storeConfig from "@/store.config";
Vue.use(store, storeConfig);

```

3. Use

The plug-in will automatically register the global `$store` object. Now, you can use  `$store.state` or `$store.get()` to get the status object.

The following statements are equivalent:

``` js
this.$store.state.testValue
this.$store.get('testValue')

Vue.$store.state.testValue
Vue.$store.get('testValue')

```

## 配置


``` js
/**
 * store configuration file
 * state: {key, value} Define all data in the store
 * state.key[String]: Data item name, undefined key cannot be saved / retrieved
 * state.value[Any]: Initial value of data item
 * actions: {key, action} Define custom actions for store
 * actions.key[String]: Operation name, if `actions.key` is defined in state and `actions.action` return a Promise , the return value of promise will be automatically stored in `state[key]`
 * actions.action[Function]: The operation method accepts two parameters (context, payload)
 *    @param context[Object]: Include `context.get()` and `context.set()` method, you can operate any data in state by yourself
 *    @param payload[Any]: The parameters passed by `store.action(key, payload)` can be used for Internal logic of `actions.action()`
 *    return [Any]: The return promise object is a necessary condition for triggering the automatic mode (refer to the description of actions.key). In other cases, there is no need to return a value
 * */
import * as userApi from "@/user/api/user";

export default {
    state: {
        testValue: null,            // For testing only
        permission: []              // User rights
    },
    actions: {
        testAction: function(context){
            // 'testAction' is not registered in state, triggering manual mode
            return new Promise(resolve => {
                setTimeout(() => {
                    context.set('testValue', parseInt(context.get('testValue')+1))
                    resolve()
                }, 500)
            })
        },
        permission: function (context, payload) {
            // 'permission' has been registered in state, and promise object is returned to trigger automatic mode
            // Call `$store.action('permission')` will automatically save the returned value into `$store.state.permission`
            return userApi.permission(payload).then(res => {
                // Here you can format the returned data
                return {
                    menus: res.data.data.filter((e) => e.type === 0),
                    resources: res.data.data.filter((e) => e.type === 1),
                };
            })
        },
    }
}
```

## Attribute

- **$store.state**

For all data in the warehouse, be careful not to directly assign values to the data set! The following statements are equivalent

``` js
Vue.$store.state.testValue
Vue.$store.state.get('testValue')

this.$store.state.testValue
this.$store.state.get('testValue')

```

## Method

- **$store.config(options[Object])**

Run time configuration store, and ` Vue.use(store, config) ` equivalent. You may need it, but it is not recommended.

- **$store.set(key[String], value[Any])**

Store data. In order to avoid untraceable operation errors, assigning an unregistered key will throw an error.

Note: do not directly assign values to store!<s>$store.state.testValue = 123</s>

- **$store.get(key[String])**

Get data, and `$store.state[key]` equivalent

- **$store.action(key[String], payload[Any])**

For asynchronous operation of data, the operation method needs to be set in `config.actions`.

'Payload' is the parameter passed to the operation method.

Return Promise Object.

## Responsive application

The data in `$store.state` is responsive

``` html
<template>
    <div>
        <div>
            testValue = {{ testValue }}
        </div>
        <button @click.native="$store.action('testAction')">Change data</button>
    </div>
</template>>
```

``` js
export default {
    computed: {
        testValue(){
            return this.$store.state.testValue
        }
    }
}

```

## License

MIT