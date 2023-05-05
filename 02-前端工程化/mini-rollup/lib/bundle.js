const Module = require("./module");
const path = require("path");
const fs = require("fs");
const MagicString = require("magic-string");
class Bundle {
  constructor({ entry }) {
    this.entryPath = entry.replace(/\.js$/, "") + ".js";
    this.module = [];
  }
  /**
   *  @param {*} importee
   *  @param {*} importer
   *  @description main.js import foo.js  importee foo importer main
   */
  fetchModule(importee, importer) {
    let router;
    if (!importer) {
      router = importee;
    } else {
      if (path.isAbsolute(importee)) {
        router = importee;
      } else {
        router = path.resolve(
          path.dirname(importer),
          importee.replace(/\.js$/, "") + ".js"
        );
      }
    }

    if (router) {
      const code = fs.readFileSync(router, "utf-8");
      const module = new Module({
        code,
        path: router,
        bundle: this,
      });

      return module;
    }
  }
  build(outputFileName) {
    const entryModule = this.fetchModule(this.entryPath);
    this.statements = entryModule.expandAllStatement();
    // 生成代码
    const { code } = this.generate();

    fs.writeFileSync(outputFileName, code, "utf-8");
  }
  generate() {
    const magicString = new MagicString.Bundle();
    this.statements.forEach((statement) => {
      const source = statement._source.clone();
      if (statement.type === "ExportNamedDeclaration") {
        // export const a =1 => const a =1
        source.remove(statement.start, statement.declaration.start);
      }
      magicString.addSource({
        content: source,
        separator: "\n",
      });
    });
    return {
      code: magicString.toString(),
    };
  }
}
module.exports = Bundle;
