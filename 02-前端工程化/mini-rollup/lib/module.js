const { parse } = require("acorn");
const MagicString = require("magic-string");
const analyse = require("./analyse");
function has(obj, name) {
  return Object.prototype.hasOwnProperty.call(obj, name);
}
const SYSTEM_VARIABLES = ["console", "log"];
class Module {
  constructor({ code, path, bundle }) {
    // this.bundle = new Bundle()
    this.code = new MagicString(code, { filename: path });
    this.path = path;
    this.bundle = bundle;
    this.ast = parse(code, {
      ecmaVersion: 7,
      sourceType: "module",
    });
    this.analyse();
  }
  analyse() {
   
    this.imports = {};
    this.exports = {};
    this.ast.body.forEach((node) => {
      console.log(node.type)
      if (node.type === "ImportDeclaration") {
        const source = node.source.value;
        const { specifiers } = node;
        specifiers.forEach((v) => {
          const name = v.imported ? v.imported.name : "";
          const localName = v.local ? v.local.name : "";
          this.imports[localName] = {
            name,
            localName,
            source,
          };
        });
      } else if (/^Export/.test(node.type)) {
       
        const declaration = node.declaration;
        // ?
        if (declaration.type === "VariableDeclaration") {
          if (!declaration.declarations) return;
          const localName = declaration.declarations[0].id.name;
          console.log(localName)
          this.exports[localName] = {
            localName,
            node,
            expression: declaration,
          };
        }
      }
    });
    analyse(this.ast, this.code, this);
    this.definitions = {};
    this.ast.body.forEach((statement) => {
      Object.keys(statement._defines).forEach((key) => {
        this.definitions[key] = statement;
      });
    });
  }
  // tree shaking
  expandAllStatement() {
    const allStatement = [];
    this.ast.body.forEach((statement) => {
      // ignore  import and declarations
      if (statement.type === "ImportDeclaration") return;
      if (statement.type === "VariableDeclaration") return;
      // 找到表达式ExpressionStatement a()
      const statements = this.expandStatement(statement);
      allStatement.push(...statements);
    });
    return allStatement;
  }
  expandStatement(statement) {
    statement._include = true;
    const result = [];
    // 找依赖
    const depencies = Object.keys(statement._dependsOn);
    depencies.forEach((name) => {
      const definition = this.define(name);
      result.push(...definition);
    });
    result.push(statement);
    return result;
  }
  define(name) {
    // 模块import
    if (has(this.imports, name)) {
      // 加载模块
      const importDeclaration = this.imports[name];
      const source = importDeclaration.source;
      const module = this.bundle.fetchModule(source, this.path);
      
      const exportData = module.exports[importDeclaration.name];

     
      return module.define(exportData.localName);
    } else {
      let statement = this.definitions[name];

      if (statement) {
        if (!statement._include) {
          return this.expandStatement(statement);
        } else {
          return [];
        }
      } else if (SYSTEM_VARIABLES.includes(name)) {
        // 系统变量
        return [];
      } else {
        throw new Error(`变量${name}既没有从外部导入，也没有在当前的模块内`);
      }
    }
  }
}
module.exports = Module;
