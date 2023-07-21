let activeEffect;
export function effect(fn) {
    activeEffect = fn
}
export function reactive(obj) {
    return new Proxy(obj, {
        get(target, key) {
            const value = Reflect.get(target, key)
            track(target, key)
            return value

        },
        set(target, key,value) {
            let result = Reflect.set(target, key, value)
            trigger(target, key)
            return result

        },
        deleteProperty(target, key) {
             return Reflect.deleteProperty(target, key)

        }
    })

}
// 创建一个map保持以来关系， map = {target: {key: [f1, f2]}}
let targetMap = new WeakMap()
function track(target, key) {
    if(activeEffect) {
        // 对象
        let depsMap = targetMap.get(target)
        if(!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        // key的依赖
        let deps = depsMap.get(key)
        if(!deps) {
            depsMap.set(key, (deps = new Set()))
        }
        deps.add(activeEffect)
    }
   

}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if(depsMap) {
        let deps = depsMap.get(key)
        if(deps) {
            deps.forEach(dep => dep())
        }
    }
}