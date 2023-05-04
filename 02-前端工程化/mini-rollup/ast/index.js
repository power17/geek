const fs = require("fs");
const acorn = require("acorn");
const MagicString = require("magic-string");
const code = fs.readFileSync("./source.js").toString();
const ast = acorn.parse(code, {
  sourceType: "module",
  ecmaVersion: 7,
});
// 遍历查找变量
let declarations = {};
ast.body
  .filter((v) => v.type === "VariableDeclaration")
  .map((v) => {
    console.log("声明：" + v.declarations[0].id.name);
    declarations[v.declarations[0].id.name] = v;
  });
// console.log("declarations:", declarations);

//遍历 =》 将声明放在变量前

const statements = [];
const m = new MagicString(code);
ast.body
  .filter((v) => v.type !== "VariableDeclaration")
  .map((node) => {
    statements.push(declarations[node.expression.callee.name]);
    statements.push(node);
  });
// 导出
console.log("---------------");
statements.map((node) => {
  console.log(m.snip(node.start, node.end).toString());
});
console.log("---------------");
