English | [中文](README_CN.md)

# @cutting-mat/vue-store

[![npm](https://img.shields.io/npm/v/@cutting-mat/vue-store.svg)](https://www.npmjs.com/package/@cutting-mat/vue-store) [![license](https://img.shields.io/github/license/cutting-mat/vue-store.svg)]()

A simpler Vue state management plug-in. If you also think vuex is a little complicated, you need this.

Only 'get() / set() / action()' is enough, and it is compatible with vue2 X and vue3 x。

## Quick start

1. Install:

``` bash
npm i @cutting-mat/vue-store --save
```

2. Configure

``` js
import store from '@cutting-mat/vue-store';

Vue.use(store, {
    state: {
        testValue: null,
    },
    actions: {
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

It is recommended to save the configuration in a separate file:

``` js
// recommend
import store from '@cutting-mat/vue-store';
import storeConfig from "@/store.config";
Vue.use(store, storeConfig);

```

``` js
/**
 * store configuration file
 * state: {key, value} Define all data in the store
 * actions: {key, action} Define asynchronous operation method
 * action function(context, payload) Support automatic and manual data operation modes
 * 1. Automatic mode: if the key is defined in state and the promise object is returned by the method, the return value of promise will be automatically stored in state[key]
 * 2. Manual mode: the context parameter received by the method supports the get () / set () method, and they can operate the state by themselves
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

3. Use

``` js
// Global method
Vue.$store.set('testValue', parseInt(Math.random() * 1e8))

// instance method
this.$store.set('testValue', parseInt(Math.random() * 1e8))

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