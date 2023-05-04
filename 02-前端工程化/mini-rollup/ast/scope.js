const fs = require("fs");
const acorn = require("acorn");
const code = fs.readFileSync("./source1.js").toString();
const walk = require("./../lib/walk");
const ast = acorn.parse(code, {
  locations: true,
  ranges: true,
  ecmaVersion: 7,
  sourceType: "module",
});
let indent = 0;
walk(ast, {
  enter(node) {
    if (node.type === "VariableDeclarator") {
      //   console.log(node, "node");
      console.log("%svar: %s", " ".repeat(indent * 4), node.id.name);
    }
    if (node.type === "FunctionDeclaration") {
      console.log("%sfun: %s", " ".repeat(indent * 4), node.id.name);
      indent++;
    }
  },
  leave(node) {
    if (node.type === "FunctionDeclaration") {
      // console.log("%svar: %s", " ".repeat(indent * 4), node.id.name);
      indent--;
    }
  },
});
