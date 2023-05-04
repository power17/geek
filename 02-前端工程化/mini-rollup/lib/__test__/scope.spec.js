const Scope = require("./../scope");
describe("测试scope函数", () => {
  it("add", () => {
    const root = new Scope({});
    root.add("a");
    const child = new Scope({
      parent: root,
    });
    child.add("b");
    expect(child.contains("a")).toBe(true);
    expect(child.contains("b")).toBe(true);
    expect(child.findDefiningScope("a")).toBe(root);
    expect(child.findDefiningScope("b")).toBe(child);
  });
});
