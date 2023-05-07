import { sameVnode } from "./vNode"
// diff 算法 未完成
export const updateChildren = (oldChild, newChild, contianer) =>  {
    let lastIndex = 0
    for(let i = 0; i < newChild.lenght; i++ ) {
        const newVnode = newChild[i]
        for(let j =0; j < oldChild.length; j++) {
            const oldVnode = oldChild[i]
            // 判断是否有相同的节点
            if(sameVnode(newVnode, oldVnode)) {
                patch(oldChild, newChild, contianer)

            }
        }
    }

}