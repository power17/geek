const Scope = require("./scope");
const walk = require("./walk");

module.exports = function analyse(ast, magicString, module) {
  let scope = new Scope();

  ast.body.forEach((statement) => {
    function addToScope(declaration) {
      const name = declaration.id.name;
      scope.add(name);
      // 全局作用域
      if (!scope.parent) {
        statement._defines[name] = true;
      }
    }
    Object.defineProperties(statement, {
      _defines: {
        value: {},
      },
      _dependsOn: {
        value: {},
      },
      _include: {
        value: false,
        writable: true,
      },
      _source: {
        value: magicString.snip(statement.start, statement.end),
      },
    });
    walk(statement, {
      enter(node) {
        let newScope = null;
        switch (node.type) {
          case "FunctionDeclaration":
            // 加入作用域
            addToScope(node);
            let params = node.params.map((v) => v.name);
            newScope = new Scope({
              parent: scope,
              params,
            });

            break;
          case "VariableDeclaration":
            node.declarations.forEach(addToScope);
            break;
          default:
            break;
        }
        if (newScope) {
          Object.defineProperties(node, {
            _scope: { value: newScope },
          });
          scope = newScope;
        }
      },
      leave(node) {
        if (node._scope) {
          scope = scope.parent;
        }
      },
    });
  });
  // 全局作用域
  ast._scope = scope;
  // dependsOn;
  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node.type === "Identifier") {
          statement._dependsOn[node.name] = true;
        }
      },
    });
  });
};
