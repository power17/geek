/*
 * @param {*} ast 要遍历的语法树
 * @param {*} param1 配置对象
 */
function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}
/**
 * 访问此node节点
 * @param {*} node 遍历的节点
 * @param {*} parent 父节点
 * @param {*} enter 进入的方法
 * @param {*} leave 离开的方法
 */
function visit(node, parent, enter, leave) {
  if (!node) return;
  if (enter) {
    enter.call(null, node, parent);
  }
  let childKey = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );
  childKey.forEach((key) => {
    let val = node[key];
    visit(val, node, enter, leave);
  });
  if (leave) {
    leave(node, parent);
  }
}

module.exports = walk;
