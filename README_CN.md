中文 | [English](README.md)

# @cutting-mat/vue-store

[![npm](https://img.shields.io/npm/v/@cutting-mat/vue-store.svg)](https://www.npmjs.com/package/@cutting-mat/vue-store) [![license](https://img.shields.io/github/license/cutting-mat/vue-store.svg)]()

更简单的vue状态管理插件，如果你也觉得vuex有点复杂，那么你需要这个。

只有`get()/set()/action()`几个方法就足够了，而且同时兼容Vue2.x和Vue3.x。

## 快速开始

1. 安装:

``` bash
npm i @cutting-mat/vue-store --save
```

2. 配置

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

建议将Store配置放在独立文件中：

``` js
// 推荐
import store from '@cutting-mat/vue-store';
import storeConfig from "@/store.config";
Vue.use(store, storeConfig);

```

``` js
/**
 * store 配置文件
 * state: {key, value} 定义store里的所有数据
 * actions: {key, action} 定义异步操作方法
 * action function(context, payload) 支持自动和手动两种数据操作模式
 * 1. 自动模式：key 在 state 中已定义，且方法返回 Promise 对象，则 Promise 的返回值将自动存入 state[key]
 * 2. 手动模式：方法接收的 context 参数支持 get()/set() 方法，用他们可以自行操作 state 数据 
 * */
import * as userApi from "@/user/api/user";

export default {
    state: {
        testValue: null,            // 仅用于测试
        permission: []              // 用户权限
    },
    actions: {
        testAction: function(context){
            // testAction未在state中注册，触发手动模式
            return new Promise(resolve => {
                setTimeout(() => {
                    context.set('testValue', parseInt(context.get('testValue')+1))
                    resolve()
                }, 500)
            })
        },
        permission: function (context, payload) {
            // permission 已经在state中注册，并且返回Promise对象，触发自动模式
            // 调用$store.action('permission')会将返回值将自动存入$store.state.permission
            return userApi.permission(payload).then(res => {
                // 这里可以对返回数据做格式化操作
                return {
                    menus: res.data.data.filter((e) => e.type === 0),
                    resources: res.data.data.filter((e) => e.type === 1),
                };
            })
        },
    }
}
```

3. 使用

``` js
// 全局方法
Vue.$store.set('testValue', parseInt(Math.random() * 1e8))

// 实例方法
this.$store.set('testValue', parseInt(Math.random() * 1e8))

```

## 属性

- **$store.state**

数据集合，注意不要直接对数据集合赋值！以下语句等效

``` js
Vue.$store.state.testValue
Vue.$store.state.get('testValue')

this.$store.state.testValue
this.$store.state.get('testValue')

```

## 方法

- **$store.config(options[Object])**

运行时配置store(仓库)，与`Vue.use(store, config)`等效，你可能需要，但不建议使用。

- **$store.set(key[String], value[Any])**

存储数据，为避免不可追踪的操作错误，对未注册的key赋值将抛出错误。

注意，不要直接对数据集合赋值！<s>$store.state.testValue = 123</s>

- **$store.get(key[String])**

获取数据，与$store.state[key]等效

- **$store.action(key[String], payload[Any])**

异步操作数据，操作方法需要预先在config.actions中配置。

payload是向操作方法传递的参数。

返回Promise。

## 响应式应用

$store.state中的数据是响应式的

``` html
<template>
    <div>
        <div>
            store里的数据都是响应式的：testValue = {{ testValue }}
        </div>
        <button @click.native="$store.action('testAction')">改变数据</button>
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
