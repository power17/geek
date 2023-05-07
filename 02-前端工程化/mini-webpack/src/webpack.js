const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");
const babel = require("@babel/core");
const traverse = require("@babel/traverse").default;
/**
 * 获取模块信息
 * @param file
 */

function getModuleInfo(file) {
  // 加载文件代码
  const code = fs.readFileSync(path.resolve(__dirname, file), "utf-8");
  // 编译（转换ast语法树）
  const ast = parse(code, {
    sourceType: "module",
  });
  // 收集
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const nodePath = node.source.value;
      const absPath = "./" + path.join(path.dirname(file), nodePath);
      deps[nodePath] = absPath;
    },
  });
  // es6 => es5
  const codeAst = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = {
    file,
    deps,
    code: codeAst.code,
  };
  return moduleInfo;
}
/**
 * 解析模块
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  getDeps(temp, entry);
  temp.forEach((info) => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
  });
  return depsGraph;
}
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}
/**
 * 打包
 */
function bundle(file) {
  console.log(file);
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}
const content = bundle("./../example/index.js");
console.log(content);
!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
