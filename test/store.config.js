/**
 * store 配置文件
 * state: {key, value} 定义store里的所有数据，需要设置与期望数据类型一致的初始值，否则缓存功能可能异常
 * actions: {key, action} 定义异步操作方法，支持自动和手动两种数据操作模式
 * action: function(context, payload) 1. 自动模式， action 的 key 在 state 中已定义且 action 函数返回 Promise 对象，则 Promise 的返回值将自动存入 state[key]；2. 手动模式，action 函数的 context 参数支持 get()/set() 方法，可以自行操作 state 更新数据 
 * */

export default {
    state: {
        testValue: null,            // 仅用于测试
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
}