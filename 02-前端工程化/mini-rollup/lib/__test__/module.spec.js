const Module = require("./../module");
describe("test module", () => {
  describe("构造方法", () => {
    describe("imports", () => {
      it("单个module", () => {
        const module = new Module({
          code: `import {a as aa} from '../m'`,
        });
        expect(module.imports).toEqual({
          aa: {
            name: "a",
            localName: "aa",
            source: "../m",
          },
        });
      });
      it("多个module", () => {
        const module = new Module({
          code: `import {a as aa, b} from '../m'`,
        });
        expect(module.imports).toEqual({
          aa: {
            name: "a",
            localName: "aa",
            source: "../m",
          },
          b: {
            name: "b",
            localName: "b",
            source: "../m",
          },
        });
      });
    });
    describe("exports", () => {
      it("single export", () => {
        const code = `export const a =1`;
        const module = new Module({ code });
        expect(module.exports["a"].localName).toBe("a");
        expect(module.exports["a"].node).toBe(module.ast.body[0]);
        expect(module.exports["a"].expression).toBe(
          module.ast.body[0].declaration
        );
      });
    });
    describe("definitions", () => {
      it("single definitions", () => {
        const code = `export const a =1`;
        const module = new Module({ code });
        expect(module.definitions).toEqual({
          a: module.ast.body[0],
        });
      });
    });
  });
  describe("ExpandAllStatement", () => {
    it("base", () => {
      const code = `
        const a = () => 1
        const b = () => 2
        a()
        `;
      const module = new Module({ code });
      const statements = module.expandAllStatement();
      expect(statements.length).toBe(2);
      expect(
        module.code.snip(statements[0].start, statements[0].end).toString()
      ).toBe(`const a = () => 1`);
      expect(
        module.code.snip(statements[1].start, statements[1].end).toString()
      ).toBe(`a()`);
    });
  });
});
